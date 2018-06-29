#
# HTTPSERVERS
# by Petko D. (pdp) Petkov
# GNUCITIZEN(http://www.gnucitizen.org)
# ideas were borrowed from the codez of UZUKI Hisao, Andres Riancho and Dave Aitel
#
__version__ = '0.5.1a'

#
# IMPROVEMENTS TO BE IMPLEMENTED
# * The SSL implementation needs to be abstracted more. It is essential to remove references to OpenSSL exceptions later in the code.
# * The code needs to be simplified. It is already quite simple but it needs to be simplified even further and unnecessary primitives needs to be removed.
# * Fixing bugs! There must be some bugs! The code hasn't been heavily tested.
#

#
# STANDARD IMPORTS
#
import time
import socket
import select
import OpenSSL
import urlparse
import SocketServer
import BaseHTTPServer

#
# WRAP SOCKET IN SSL CONNECTION
#
def wrap_socket_in_ssl_connection(soc, pem_file=None, key_file=None, cert_file=None, state=None):
	"""The following function simply abstracts the way we create SSL enabled sockets. It can
	be replaced with another SSL implementation at any time. The function should return a
	socket-like object."""

	# create context object
	ctx = OpenSSL.SSL.Context(OpenSSL.SSL.SSLv23_METHOD)

	# load key and certificate files if there are any
	if key_file is not None:
		ctx.use_privatekey_file(key_file)

	if cert_file is not None:
		ctx.use_certificate_file(cert_file)
		ctx.load_verify_locations(cert_file)

	if key_file is None and cert_file is None and pem_file is not None:
		ctx.use_privatekey_file(pem_file)
		ctx.use_certificate_file(pem_file)
		ctx.load_verify_locations(pem_file)

	# don't demand a certificate
	ctx.set_verify(OpenSSL.SSL.VERIFY_NONE, lambda *args, **kwargs: True)

	# create connection object from context
	conn = OpenSSL.SSL.Connection(ctx, soc)

	# if state is defined, setup the connection direction
	if state == 'accept':
		conn.set_accept_state()
	elif state == 'connect':
		conn.set_connect_state()

	return conn

#
# HTTP REQUEST HANDLER AND SERVER
# abstraction layers for BaseHTTPServer.BaseHTTPRequestHandler and BaseHTTPServer.HTTPServer
#
class HTTPRequestHandler(BaseHTTPServer.BaseHTTPRequestHandler):
	pass

class HTTPServer(BaseHTTPServer.HTTPServer):
	pass

#
# HTTPS REQUEST HANDLER AND SERVER
# the following classes provide secure implementation of HTTPRequestHandler and HTTPServer
#
class HTTPSRequestHandler(HTTPRequestHandler):
	def setup(self):
		self.connection = self.request
		self.rfile = socket._fileobject(self.request, 'rb', self.rbufsize)
		self.wfile = socket._fileobject(self.request, 'wb', self.wbufsize)

class HTTPSServer(HTTPServer):
	def __init__(self, address, handler, pem_file):
		# all we want from this method is to register a pem file and wrap the HTTPServer socket in SSL
		# $ openssl req -x509 -nodes -days 365 -newkey rsa:1024 -keyout mycert.pem -out mycert.pem

		SocketServer.BaseServer.__init__(self, address, handler)

		self.pem_file = pem_file

		self.socket = wrap_socket_in_ssl_connection(socket.socket(self.address_family, self.socket_type), pem_file=self.pem_file)

		self.server_bind()
		self.server_activate()

#
# PROXY HTTP REQUEST HANDLER AND SERVER
# the following classes provide a simple implementation of a proxy server
#
class ProxyHTTPRequestHandler(HTTPRequestHandler):
	server_version = 'Proxy/' + __version__

	def _sock_connect_to(self, netloc, soc):
		"""Parse netloc string and establish connection on socket."""

		# parse netloc
		i = netloc.find(':')

		if i >= 0:
			host_port = netloc[:i], int(netloc[i+1:])
		else:
			host_port = netloc, 80

		# establish connection or else write 404 and fail the function
		try:
			soc.connect(host_port)
		except socket.error, arg:
			try:
				msg = arg[1]
			except:
				msg = arg

			self.send_error(404, msg)

			return False

		return True

	def _sock_read_write(self, soc, data=None, max_idling=20):
		"""The following function simply outputs into the socket everything
		that it gets from the client connection. This is the fastest way of
		performing proxy-like communication although requests and responses
		cannot be easily observed."""

		if data is not None:
			soc.send(data)

		iw = [self.connection, soc]
		ow = []

		count = 0

		# perform basic input and output operations
		while True:
			count += 1

			(ins, _, exs) = select.select(iw, ow, iw, 3)

			if exs:
				break

			if ins:
				for i in ins:
					if i is soc:
						out = self.connection
					else:
						out = soc

					try: data = i.recv(8192) # if not catched, the statement may fail when SSL! bug?
					except: data = ''

					if data:
						out.send(data)

						count = 0

			if count == max_idling:
				break

	def do_GET(self):
		"""This method universally handles all other methods such as POST, HEAD, PUT, DELETE, etc."""

		(scm, netloc, path, params, query, fragment) = urlparse.urlparse(self.path, 'http')

		# the proxy handles http and https urls only, else die with 400 bad url
		if scm not in ('http', 'https') or fragment or not netloc:
			self.send_error(400, 'bad url %s' % self.path)

			return

		# create socket to proxy to
		soc = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

		# if we are proxying https, make sure that our socket is ssl enabled
		if scm == 'https':
			soc = wrap_socket_in_ssl_connection(soc, state='connect')

		try:
			# proxy data only if connection to remote host can be established
			if self._sock_connect_to(netloc, soc):
				self.log_request(200)

				self.headers['Connection'] = 'close'
				del self.headers['Proxy-Connection']

				data = ''
				data += '%s %s %s\r\n' % (self.command, (urlparse.urlunparse(('', '', path, params, query, '')) or '/'), self.request_version)
				data += str(self.headers)
				data += '\r\n'

				self._sock_read_write(soc, data)
		finally:
			soc.close()
			self.connection.close()

	do_HEAD   = do_GET
	do_POST   = do_GET
	do_PUT    = do_GET
	do_DELETE = do_GET

	def do_CONNECT(self):
		"""The following function handles only CONNECT methods. The proxy cannot handle
		other protocols such as FTP. Therefore, we assume that every CONNECT request is
		in fact a request to a SSL enabled port."""

		# create socket to proxy to
		soc = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

		try:
			# proxy data only if connection to remote host can be established
			if self._sock_connect_to(self.path, soc):
				self.log_request(200)
				self.wfile.write(self.protocol_version + ' 200 Connection established\r\n')
				self.wfile.write('Proxy-agent: %s\r\n' % self.version_string())
				self.wfile.write('\r\n')

				self._sock_read_write(soc, max_idling=300)
		finally:
			soc.close()
			self.connection.close()

class ProxyHTTPServer(HTTPServer):
	pass

#--WRAPPERS-----------------------------------------------------------------------
# these classes are only needed to make our lives easer for the rest of the script
#
# HTTP SERVER WRAPPER
# the class simply creates a pseudo which is not self-sustainable
#
class HTTPServerWrapper(HTTPServer):
	def __init__(self, handler, chainedHandler):
		self.RequestHandlerClass = handler
		self.chainedHandler = chainedHandler

#
# SSL CONNECTION WRAPPER
# this class wraps a SSL connection and a socket into a socket-like object
#
class SSLConnectionWrapper(object):
	def __init__(self, conn, socket):
		self._connection = conn
		self._socket = socket

	def __getattr__(self, name):
		return self._connection.__getattribute__(name)

	def __str__(self):
		return object.__str__(self)

	def __repr__(self):
		return object.__repr__(self)

	def recv(self, amount):
		return self._wrap(self._socket, self._connection.recv, 10, amount)

	def send(self, data):
		return self._wrap(self._socket, self._connection.send, 10, data)

	def makefile(self, perm, buf):
		return SSLConnectionWrapperFile(self, socket)

	def _wrap(self, socket, fun, attempts, *params):
		count = 0

		while True:
			try:
				result = fun(*params)

				break
			except OpenSSL.SSL.WantReadError:
				count += 1

				if count == attempts:
					break

				select.select([socket], [], [], 3)
			except OpenSSL.SSL.WantWriteError:
				count += 1

				if count == attempts:
					break

				select.select([], [socket], [], 3)

		return result

#
# SSL CONNECTION WRAPPER FILE
# this class is used by SSLConnectionWrapper to mimic objects returned by makefile
#
class SSLConnectionWrapperFile(object):
	def __init__(self, sslCon, socket):
		self.closed = False

		self._readBuf = ''
		self._sslCon = sslCon
		self._socket = socket

	def read(self, amount):
		if self._readBuf == '':
			self._readBuf = self._sslCon.recv(4096)

		result, self._readBuf = self._readBuf[0:amount], self._readBuf[amount:]

		return result

	def write( self, data ):
		result =  self._sslCon.send(data)
		return result

	def readline(self):
		result = ''

		while True:
			ch = self.read(1)
			result += ch

			if ch == '\n':
				break

		return result

	def flush(self):
		pass

	def close(self):
		pass
#--WRAPPERS-----------------------------------------------------------------------

#
# MITM PROXY HTTP REQUEST HANDLER AND SERVER
# as the title suggests, the following classes provide man-in-the-middle capabilities to ProxyHTTPRequestHandler and ProxyHTTPServer
#
class MitmProxyHTTPRequestHandler(ProxyHTTPRequestHandler):
	def do_GET(self):
		# chainedHandler is part of HTTPServerWrapper pseudo class and it is used only here to identify if we are about to mitm the ssl connection
		if hasattr(self.server, 'chainedHandler'):
			# if yes, fix the path to include the https protocol and the chainedHandler path
			base_path = 'https://' + self.server.chainedHandler.path
			self.path = base_path + self.path

		# call the normal do_GET
		return ProxyHTTPRequestHandler.do_GET(self)

	def do_CONNECT(self):
		try:
			# we do the same as ProxyHTTPRequestHandler.do_CONNECT
			self.log_request(200)
			self.wfile.write(self.protocol_version + ' 200 Connection established\r\n')
			self.wfile.write('Proxy-agent: %s\r\n' % self.version_string())
			self.wfile.write('\r\n')

			# however, here we reverse the connection and we wrap it in SSLConnectionWrapper
			browser_soc = self.connection
			browser_con = wrap_socket_in_ssl_connection(self.connection, pem_file=self.server.pem_file, state='accept')
			wrapped_connection = SSLConnectionWrapper(browser_con, browser_soc)

			# start a pseudo HTTPServerWrapper object to handle the rest of the communication
			https_server = HTTPServerWrapper(self.__class__, self)
			https_server.process_request(wrapped_connection, self.client_address)
		finally:
			self.connection.close()

class MitmProxyHTTPServer(ProxyHTTPServer):
	def __init__(self, address, handler, pem_file):
		# all we want from this method is to register a pem file
		# $ openssl req -x509 -nodes -days 365 -newkey rsa:1024 -keyout mycert.pem -out mycert.pem
		self.pem_file = pem_file

		# the rest is the same
		ProxyHTTPServer.__init__(self, address, handler)

#
# OBSERVABLE PROXY HTTP REQUEST HANDLER
# the following classes define an observable MitmProxyHTTPRequestHandler and MitmProxyHTTPServer with a monkey patch
#
class ObservableProxyHTTPRequestHandler(MitmProxyHTTPRequestHandler):
	def observe_incoming_data(self, data):
		"""This function handles incoming data. Keep in mind that
		a single request may arrive in multiple chunks. The function
		needs to return the data. Therefore, the function has tampering
		capabilities."""

		return data

	def observe_outgoing_data(self, data):
		"""This function handles outgoing data. Keep in mind that
		a single response may arrive in multiple chunks. The function
		needs to return the data. Therefore, the function has tampering
		capabilities."""

		return data

	def _sock_connect_to(self, netloc, soc):
		"""This function simply monkey patches all of our sockets. And
		calls the original _sock_connect_to."""

		try: # warning! monkey patching
			old_send = soc.send

			def send(data):
				if data == '':
					return 0

				data = self.observe_incoming_data(data)

				if data is None:
					return len(data)
				else:
					return old_send(data)

			soc.send = send

			soc._old_send = old_send
		except: pass

		return MitmProxyHTTPRequestHandler._sock_connect_to(self, netloc, soc)

	def setup(self):
		"""This function simply monkey patches all of our sockets. And
		calls the original setup."""

		MitmProxyHTTPRequestHandler.setup(self)

		try: # warning! monkey patching
			old_recv = self.connection.recv
			old_send = self.connection.send

			def recv(size):
				data = old_recv(size)

				if data != '':
					data = self.observe_incoming_data(data)

				if data is None:
					return ''
				else:
					return data

			def send(data):
				if data == '':
					return 0

				data = self.observe_outgoing_data(data)

				if data is None:
					return len(data)
				else:
					return old_send(data)

			self.connection.recv = recv
			self.connection.send = send

			self.connection._old_recv = old_recv
			self.connection._old_send = old_send
		except: pass

class ObservableProxyHTTPServer(MitmProxyHTTPServer):
	pass

#
# SIMPLE OBSERVABLE PROXY HTTP REQUEST HANDLER
# these classes are 1337, as they define observable/tamperable MitmProxyHTTPRequestHandler and MitmProxyHTTPServer
#
class SimpleObservableProxyHTTPRequestHandler(MitmProxyHTTPRequestHandler):
	def observe_request(self, data):
		"""Observe the incoming request. Keep in mind that you must
		return the request objects. Therefore this function provides
		observable/tamperable capabilities to the class."""

		return data

	def observe_response(self, data):
		"""Observe the incoming responses. Keep in mind that you must
		return the response objects. Therefore this function provides
		observable/tamperable capabilities to the class."""

		return data

	def _soc_send_all(self, soc, data):
		size =len(data)
		sent =0

		while sent < size:
			try:
				sent += soc.send(data[sent:])
			except OpenSSL.SSL.SysCallError, socket.error:
				return sent

		return sent

	def _sock_recv_timeout(self, soc, size=8192, timeout=2):
		"""This function reads a number of characters from the socket
		until all is read or the connection timeouts."""

		soc.setblocking(0)

		total_data = []
		data = ''

		begin = time.time()

		while True:
			#if you got some data, then break after wait sec
			if total_data and time.time() - begin > timeout:
				break

			#if you got no data at all, wait a little longer
			elif time.time() - begin > timeout * 2:
				break

			try:
				data=soc.recv(size)

				if data:
					total_data.append(data)

					begin=time.time()
				else:
					time.sleep(0.1)
			except:
				pass

		soc.setblocking(1)

		return ''.join(total_data)

	def _sock_read_write(self, soc, data=None, max_idling=20):
		"""This function replaces the orignial _sock_read_write to make it
		observable/tamperable. The function is less robust as we need to
		receive all the data from the client connection before we send it
		to the server we are proxing to."""

		#--HACK------------------------------------------------------------------------------------------
		if data is None:
			data = ''

		try: data += self._sock_recv_timeout(self.connection, int(self.headers['content-length']))
		except: pass

		# tamper request data
		data = self.observe_request(data)

		# send data to host proxing to
		self._soc_send_all(soc, data)

		# unfortunately file sockets are not supported by OpenSSL so we need to go arround with a hack 
		try:
			fp = soc.makefile('rb', 8192)
			data = fp.read()
		except:
			data = ''

			while True:
				try: _data = soc.recv(8192) # if not catched, the statement may fail when SSL! bug?
				except: break

				data += _data

		# tamper response data
		data = self.observe_response(data)

		# send data back to browser
		self._soc_send_all(self.connection, data)
		#--HACK------------------------------------------------------------------------------------------

class SimpleObservableProxyHTTPServer(MitmProxyHTTPServer):
	pass

#
# MAIN
#
if __name__ == '__main__':
	import os
	import sys

	if len(sys.argv) != 2 or not os.path.exists(sys.argv[1]):
		sys.exit('Usage: %s <pem>' % os.path.basename(__file__))

	class H(SimpleObservableProxyHTTPRequestHandler):
		def observe_request(self, data):
			print '>>', repr(data)[:100]
			return data

		def observe_response(self, data):
			print '<<', repr(data)[:100]
			return data

	class S(SocketServer.ThreadingMixIn, SimpleObservableProxyHTTPServer):
		pass

	print 'Starting server on localhost:8080...'

	srv = S(('localhost', 8080), H, sys.argv[1])
	srv.serve_forever()
