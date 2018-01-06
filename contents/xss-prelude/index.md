---
title: XSS Prelude
author: petko-d-petkov
date: Sat, 06 Jan 2007 18:01:32 GMT
template: post.jade
---

_Memory corruption bugs are the past, XSS is the future._

> Cross-site scripting (XSS) is a type of computer security vulnerability typically found in web applications which allow code injection by malicious web users into the web pages viewed by other users. Examples of such code include HTML code and client-side scripts. [Wikipedia](http://en.wikipedia.org/wiki/Cross_site_scripting)

> Cross site scripting (XSS) is also a type of computer security exploit where information from one context, where it is not trusted, can be inserted into another context, where it is. From the trusted context, an attack can be launched. Note that although cross site scripting is also sometimes abbreviated "CSS", it has nothing to do with the Cascading Style Sheets technology that is more commonly called CSS. [Wikipedia](http://en.wikipedia.org/wiki/%58%53%53)

Cross-site scripting is also the cause for the appearance of the so called Web worms. These types of worms propagate on the top of web pages vulnerable to XSS.

> In October 2005, a flaw in the MySpace's site design (XSS) was exploited by a user only known as "Samy" to create the world's first self-propagating cross-site scripting worm. MSNBC has also reported that MySpace is a "hotbed" for spyware, and that infection rates are rising because of MySpace. [Wikipedia](http://en.wikipedia.org/wiki/MySpace)

Since then, the Web has changed. MySpace got infected by several other Web worms each one of which exploiting variations of the same type of vulnerability. Other social networks were attacked as well.

When a XSS worm hits a social network, the damage is enormous. Virtually every user that is part of the targeted network becomes subjected to an attack. The time required to code a Cross-site Scripting worm is hundreds of times less then the time that is required to code a worm based on a memory corruption bug. XSS worms are also a lot faster (given the right platoform) and affect wider audience.

In September 2006 [ha.ckers](http://ha.ckers.org) and [sla.ckers](http://sla.ckers.org/forum/read.php?3,44,816) joined forces to build the biggest XSS related discussion topic for the single purpose to enumerate XSS vulnerable Web sites and applications. Almost every site seamed to be vulnerable to one or another variation of the infamous XSS vulnerability.

September was also the month of Web Media Formats related XSS issue. Vulnerabilities in QuickTime [.mov](/blog/backdooring-quicktime-movies/), [.qtl](/blog/backdooring-mp3-files/) and Adobe [.pdf](http://michaeldaw.org/md-hacks/backdooring-pdf-files/) were found. In January 2007 a Universal Cross-site Scripting (UXSS) hole was [discloused](/blog/danger-danger-danger/) in Adobe PDF documents. This vulnerability was considered as one of the worst XSS attacks ever seen.

_..._
