---
title: Google Search API Worms 3
author: petko-d-petkov
date: Thu, 05 Oct 2006 02:05:51 GMT
template: post.jade
---

I found an interesting [post](http://www.schneier.com/blog/archives/2006/10/sql_injection_v.html) from [Schneier's blog]() about SQL injection vulnerabilities that can be enumerated with Google. Then I read the follow up link of the original [post](http://portal.spidynamics.com/blogs/msutton/archive/2006/09/26/How-Prevalent-Are-SQL-Injection-Vulnerabilities_3F00_.aspx) from [Michael Sutton's blog](http://portal.spidynamics.com/blogs/msutton). In his post titled "How Prevalent Are SQL Injection Vulnerabilities?" Michael goes into details how to enumerate SQL Injection vulnerabilities with Google.

All that reminded me of my discussion about [Google AJAX Search API worms](/blog/google-search-api-worms). So, I decided to try and see how far an attacker can go with Michael's findings and my [AttackAPI](/blog/attackapi).

After 20 minutes in front of VIM I had a working code of a proof of concept tool that can enumerate quite a lot of SQL injection issues and with a little bit of guessing in a bruteforce manner exploit them. I am not 100% sure for the second part of this statement since I haven't really tried to exploit the vulnerable sites although in theory it should work.

_To me it is obvious that new generation of worms will conquer the web sooner than I originally thought. I am blindly guessing!_
