---
title: Fex - Enables Firefox Extension Scanner
author: petko-d-petkov
date: Fri, 25 Aug 2006 09:35:18 GMT
template: post.jade
---

Couple of days ago [RSnake](http://ha.ckers.org) presented really nice POC on how to [detect Firefox extensions](http://ha.ckers.org/blog/20060823/detecting-firefox-extentions/) using JavaScript and Image tags. This definitely goes into AttackAPI as soon as I finish working on my other projects. Meanwhile here is a simple (well maybe not that simple) bash script that goes through the newest, updated and popular Firefox extension feeds, and construct appropriate signatures in comma separated format.

> The script can be downloaded from [here](http://www.gnucitizen.org/static/blog/2006/08/fex.sh).

It is also worth mentioning that similar technique can be used to enumerate currently installed applications by using the IE specific `res://` protocol.
