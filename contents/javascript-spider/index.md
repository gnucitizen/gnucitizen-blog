---
title: Javascript Spider
author: petko-d-petkov
date: Fri, 06 Oct 2006 09:36:13 GMT
template: this/views/post.jade
---

During the last couple of days I have been testing several attack vectors to circumvent the browser security sandbox also known as "the same origin policy". There is a lot involved into this subject and I will present my notes very soon.

[The JavaScript Spider](http://www.gnucitizen.org/static/blog/2006/10/spider.htm) is the first implementation of a proof of concept tool which shows that Javascript can be in fact quite malicious. This implementation depends on [proxydrop.com](http://proxydrop.com) but other proxies can be used too: [Google Translate](http://translate.google.com/) is one of them. Keep in mind that the tool spiders only one page.

As you can see, publicly available anonymizing proxies can be used to fetch remote pages. This technique will work quite successfully on Internet resources but not on Intranet. The reason for this is obvious.

_The requests made are anonymous since they are proxied. This may amplify or reduce the risk depending on the situation. However an anonymous self-propagating worm can be in theory - **possible**._
