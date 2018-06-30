---
title: Gmail Security Flaw
author: pdp
date: Mon, 24 Nov 2008 13:03:50 GMT
template: post.jade
---

I woke up today to realize that GNUCITIZEN's web server is bombarded with requests. Good that we are running from a scalable infrastructure. The reason for the storm was a recent disclosure of apparently new Gmail bug similar to the one which I partially and than fully disclosed [here](/blog/google-gmail-e-mail-hijack-technique/), of course after working with the vendor to resolve the problem, which is always the right thing to do.

> ReadWriteWeb has a time line on the history of this attack [here](http://www.readwriteweb.com/archives/gmail_exploit_may_aid_domain_h.php). Very nice summary I must say.

I do not have much details of this exploit although from what I can read from over [here](http://geekcondition.com/2008/11/23/gmail-security-flaw-proof-of-concept/), it seems like it is some kind of Cross-site Scripting (XSS) attack rather than a CSRF (Cross-site Request Forgery), which was what my finding was all about. XSS flaws in Google are not unusual. During the last couple of months there were a few privately disclosed exploits lurking around on various places.

I am sure that whatever the flaw is the Google team will fix it very rapidly and it will all become past. However, this is yet another reminder that XSS or CSRF attacks, no matter how easy sometimes they are, are a huge problem in today's modern, web-driven Internet community.
