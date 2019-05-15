import os
import re
import sys
import time
import BaseHTTPServer

try:
	url = sys.argv[1]

except:
	print 'usage:', os.path.basename(sys.argv[0]), '<url>'

	sys.exit(1)

params = {
'root.Brand.ProdShortName': 'AXIS 206',
'root.System.RootPwdSet': 'no'
}

class HTTPHandler(BaseHTTPServer.BaseHTTPRequestHandler):
	def do_GET(self):
		self.handle_request()

	def do_POST(self):
		self.handle_request()

	def handle_request(self):
		global url
		global params

		isDone = False

		for key in params:
			if re.search(key.lower().replace('.', '\.'), self.path.lower()):
				self.send_response(200)
				self.send_header('Content-type', 'text/plain')
				self.end_headers()
				self.wfile.write(key + '=' + params[key])

				return

		match = re.search('imagesize\.cgi.*resolution=(\d\d\d)x(\d\d\d)', self.path.lower())

		if match:
			self.send_response(200)
			self.send_header('Content-type', 'text/plain')
			self.end_headers()
			self.wfile.write('image width = ' + match.group(1) + '\n')
			self.wfile.write('image height = ' + match.group(2) + '\n')

			return

		if re.search('mjpg/video\.cgi', self.path.lower()):
			self.send_response(302)
			self.send_header('Location', url)
			self.end_headers()
			self.wfile.write('302')

			return

		self.send_response(200)
		self.send_header('Content-type', 'text/plain')
		self.end_headers()
		self.wfile.write('pdp')

try:
	server = BaseHTTPServer.HTTPServer(('', 80), HTTPHandler)

	print 'started httpserver...'

	server.serve_forever()

except KeyboardInterrupt:
	print '^C received, shutting down server...'

	server.socket.close()
