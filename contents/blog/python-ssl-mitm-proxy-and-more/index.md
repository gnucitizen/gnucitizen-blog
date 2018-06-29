---
title: Python SSL Mitm Proxy and More
author: petko-d-petkov
date: Sat, 14 Feb 2009 17:54:19 GMT
template: post.jade
category: fucked
---

Lately I've been busy with putting together a python module which allows me to create man-in-the-middle (MITM) HTTP Proxies with a programmer-friendly extension interface and support for SSL. This kind of proxies can be used for many things ranging from creating your own tampering proxies to hijacking network traffic via a transparent proxy connection.

    [/files/2009/02/httpservers.py](/files/2009/02/httpservers.py)

I am quite pleased with the end result! Although my proxy hasn't been heavily tested, I find the code lot better when compared to Dave Aitel's SpikeProxy (sorry Dave :)) and extending/adding functionalities is actually piece of cake.

I need to mention that the code is heavily inspired by various source codes found on the Internet via Google. Actually all SSL MITM Proxy code for python available today are absolute crap. Codez are either broken or you need to be a rocket scientist in order to understand them. Nevertheless, these sources proved to be quite helpful when I was stuck. And I was stuck many times.

My module also contains stubs for creating all kinds of HTTP servers. It follows a simple design pattern introduced by Python's built-in `SocketServer`, therefore the code is very pythonic. I need to mention that I used monkey patching only once and it can be removed as it is unimportant. So overall, the module should be pretty clean although there is a room for improvement.

Have a look at the code and if you can contribute with fixes and improvements that will be great. Just let me know.
