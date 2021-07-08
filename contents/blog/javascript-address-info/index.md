---
title: JavaScript Address Info
author: pdp
date: Sat, 12 Aug 2006 08:26:47 GMT
template: post.pug
category: fucked
---

The following technique was pointed to me by [DanBUK](http://f-box.org/%7Edan/). Dan managed to find the internal IP address of the visiting client by establishing a socket between local host and the remote web server. Upon success the socket populates its structure with all kinds of useful stuff among some of which are the internal NATed IP address and the hostname.

The source code can be downloaded from [here](/files/2006/08/addressinfo.js).

    [/files/2006/08/addressinfo.js](/files/2006/08/addressinfo.js)

This technique requires Java, however I think that It should be possible to achieve similar result by invoking special ActionScript methods from Flash.

_I managed to generalize Dan's snippet a bit so it works on all platforms that support LiveConnect (firefox, opera). Unfortunately the following POC does not work in IE6 and IE7. However, this problem can be quite easy resolved by compiling a small Java class, which can be embedded inside the page that will carry out the attack._
