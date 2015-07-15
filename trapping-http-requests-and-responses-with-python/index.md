---
title: Trapping HTTP Requests and Responses with Python
author: petko-d-petkov
date: Wed, 18 Feb 2009 11:52:34 GMT
template: this/views/post.jade
---

In my [last post](/blog/python-ssl-mitm-proxy-and-more/) I showed my own implementation of n HTTPS Man-in-the-middle proxy written from scratch in Python. I've spent great deal of time to make the proxy as programmer-friendly as possible. In this post I am planning to show how you can use the code to write your own proxies in the spirit of Burp, Paros, WebScarab, RatProxy, etc.

Why is this interesting? Well, it is interesting to Python developers/hackers only. The fact is that there are a few HTTPS-enabled proxies with tamperable capabilities for Python. However, none of them are actually easy to use or even reliable enough for my likings. Not to mention that none of them were designed to be extended upon. While it is true that my code hasn't bee fully tested, and there were some tiny issues already reported (to be fixed soon), I find the code a lot easier to work with as you will see later in this post.

So, let's make a proxy. First, you need to get the `httpservers.py` file from [here](/blog/python-ssl-mitm-proxy-and-more/). Make sure that you get the latest version from the SVN. Let's start with a simple example:

```python
import httpservers
import SocketServer

class Handler(httpservers.SimpleObservableProxyHTTPRequestHandler):
	def observe_request(self, data):
		print '>>', repr(data)[:100] # observe browser requests
		return data

	def observe_response(self, data):
		print '<<', repr(data)[:100] # observer server responses
		return data

class Server(SocketServer.ThreadingMixIn, httpservers.SimpleObservableProxyHTTPServer):
	pass

print 'Starting server on localhost:8080...'
srv = Server(('localhost', 8080), Handler, '/path/to/cert/file')
srv.serve_forever()
```

In order to make this work you need to generate a self-signed certificate like this:

	openssl req -x509 -nodes -days 365 -newkey rsa:1024 -keyout mycert.pem -out mycert.pem

...and replace `'/path/to/cert/file'` with the path to the certificate.

If you execute the above snippet, you should be able to get the proxy running on port 8080. Every request that you send will be outputted on the screen with the prefix `>>`, while every server response will be prefixed with `<<`. Keep in mind that I am not displaying the complete request/response (`repr(data)[:100]`, only the first 100 characters) because I don't want to clog my screen with too much data.

So far, so good. Notice that `observe_request` and `observe_response` methods return the received data like that: `return data`. This is very important! These methods not only can sniff the data but they can modify it on the fly. For example, we can inject additional JavaScript for each server response by doing something similar to this:

```python
def observe_response(self, data):
	return data + '<script>/* javascript here */</script>'
```

The example above is not complete because we don't want to append the string to each response but only to those that have mime type of `text/html`. Nevertheless you get the picture.

The good thing about `observe_request` and `observe_response` methods is that they both operate on raw data, i.e. they use the actual data that is sent through the server and client sockets. There is no intermediate layer in between. This is very powerful as we can guarantee that our modifications are not modified by code which tries to be RFC compliant for example. In that respect we can completely screw up the requests and responses. This is important if we want to write some kind of a fuzzer or even a tool that deal with data at socket level. This feature actually lacks from most proxies and this is the reason why I tried to implement it in mine.

Because we deal with raw data, we need to parse it in order to get the useful bits and pieces out of it (of course only if we need to). This is quite simple. Future versions of my code will contain a helper method to do this but for now you can use something like this:

```python
import StringIO
...
...
	fp = StringIO.StringIO(data)

	request_line = fp.readline()
	headers = self.MessageClass(fp)
	data = fp.read()
	...
	print self.headers['host'] # will print the host
```

...and we print the `Host` header. I told you that this is going to be easy.

This is pretty much it. There is no point of explaining further because the implementation is self-explanatory.

Due to high-load of projects and other internal developments we are looking to expand our team with 1-2 new editors. If you feel that you can contribute to this blog and our community, do not hesitate to get in touch with us.
