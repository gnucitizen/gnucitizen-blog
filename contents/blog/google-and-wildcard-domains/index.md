---
title: Google and Wildcard Domains
author: pdp
date: Mon, 23 Jun 2008 09:38:59 GMT
template: post.jade
---

Basically, Google allows you to use custom domains for your Google for Applications, Blogspot, Mashup Editor and of course App Engine accounts. I think this is an excellent feature and I use it for several of my domains. Although, some of the Google applications ask you to verify the ownership of the domain you are about to use by instructing you to place a special CNAME record on your nameserver, others don't. They simply assume that if a domain points back to them it must have been authorized by the owner and this is exactly the case with Blogspot.

This is a very interesting situation and I must say it can be used for some very nasty phishing and defamation attacks, smear campaigns among other things especially today when [most of the businesses move to SaaS](/blog/most-attractive-targets-saas/). It is interesting, because many companies/organizations, from what I can see when doing some basic queries, are using wildcards to point back to Google. The wildcard domain instructs the nameserver to resolve any random domain to whatever details you specify. In case of Google, nameserver admins simply wildcard to `ghs.google.com`.

This might seam a good decision from administrative point of view but it is a horrible misconfiguration problem if you think about it. The problem is that as soon as you wildcard to Google's SaaS, you allow attacker to register subdomains under your domain. For example if we have `*.acme.com` pointing to `ghs.google.com` attacker will be able to register `blog.acme.com` and use that to confuse the crap out of everybody.

This is somewhat a big problem people and you better start taking into consideration the entire system (not just the individual components) more seriously.
