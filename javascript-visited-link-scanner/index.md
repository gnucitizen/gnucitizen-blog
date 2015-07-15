---
title: JavaScript Visited Link Scanner
author: petko-d-petkov
date: Tue, 15 Aug 2006 20:50:51 GMT
template: this/views/post.jade
---

This is a technique which I learned from [Jeremiah Grossman](http://jeremiahgrossman.blogspot.com/) and his presentation on JavaScript malware. Please, keep all the credits for this finding to Jeremiah.

The [POC](http://www.gnucitizen.org/static/blog/2006/08/visitedlinkscanner.js) presented here is my improved version of the POC presented in BlackHat. I made it work in IE6, IE7, Firefox and Opera. My main challenge was IE6. IE6 is very nasty when dealing with dynamically generated style sheets. However, these can be easy solved by reusing the current style sheet. If you are interested how it works just read the source code. It is worth mentioning that the IE bug was also fixed in [AttackAPI](/blog/attackapi).
