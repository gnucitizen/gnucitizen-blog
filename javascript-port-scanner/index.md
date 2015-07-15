---
title: JavaScript Port Scanner
author: petko-d-petkov
date: Tue, 01 Aug 2006 19:37:52 GMT
template: this/views/post.jade
category: fucked
---

SPI Dynamics released a [paper](http://www.spidynamics.com/assets/documents/JSportscan.pdf) on how to port scan and do other cool stuff with JavaScript. I found the paper interesting and as a result I decided to [make my own port scanner in JavaScript](http://www.gnucitizen.org/static/blog/2006/08/jsportscanner.js). My aim was to build a small, fast and reusable javascript portscanning object. After a couple of hours fiddling around with `IMG` tags and other DOM elements I came up with the following solution.

    [http://www.gnucitizen.org/static/blog/2006/08/jsportscanner.js](http://www.gnucitizen.org/static/blog/2006/08/jsportscanner.js)

The code depends on your connection speed and might not be very accurate. Please adjust the timeout value to achieve better results. This tool has been tested on IE and Firefox. Firefox does not allow connections to very low ports such as 7, 21, etc. I haven't tested it on other browsers although it should work more or less the same way.
