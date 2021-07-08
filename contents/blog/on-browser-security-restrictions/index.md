---
title: On Browser Security Restrictions
author: pdp
date: Sat, 11 Aug 2007 09:27:07 GMT
template: post.pug
---

[Anurag Agarwal](http://myappsecurity.blogspot.com/) has brought an interesting discussion on WASC and the Webappsec Security Focus mailing lists. Here is a snippet from his e-mail:

> I am looking to get views from people on the list about a proposed security restriction in the browsers. The browser should check with the webserver which domains it can interact with (load files from or submit post data to, etc) for that website. How the check is implemented is upto the browser.

> For example: If a page from mybank.com is trying to submit data to attacker.com then before submitting the data, the browser should check with the mybank.com if it is allowed to do so.

This is quite interesting problem and soon or later we have to tackle it in one or another way. Now, I am not sure whether Anurag's idea is good but I know for a fact that probably it wont make it, unless we have a miracle. If you haven't noticed yet, the world is moving towards `crossdomain.xml` which is property of Adobe, the biggest Web technology player at the
moment. Firefox is moving towards Tamarin, another Adobe product, and yes, although Tamarin has nothing to do with `crossdomain.xml` security implementation, there is a high chance of being able to influence the way web technologies will go.

IMHO, `crossdomain.xml` is probably the change that we all need. However, unfortunately, It won't solve any problem but only create new ones. Not that long time ago, I had a [discussion](http://ajaxian.com/archives/kevin-lynch-at-the-ajax-experience/) with [Ethan Malasky](http://weblogs.macromedia.com/emalasky) from Macromedia on Ajaxian's blog about the security problems around `crossdomain.xml`. Here is what I've said.

> Due to the Same Origin Policies JavaScript can access only the current origin. Even if you implement the crossdomain.xml file, JavaScript again will be able to access the current origin. Why? Compatibly issues. We cannot move to the new technology over the night. With or without crossdomain.xml JSON or JavaScript remoting, if you like, will still work. The only thing that will change is increased attack surface due to the trust relationship between apps. Let me explain.

> Let's say that we have app on A.com and another one on B.com. B.com says that A.com can access its data. Effectively, this means that If I can get XSS on A.com, I will be able to read the data on that domain including the data on B.com due to the trust relationship. Today this is not possible. I need two XSS vulns rather the one.

Let's get back to the question about CSRF. **You can't stop CSRF**. This is it! The technology does what it is
supposed to do. I see how some policies can be used for good, for example in situations where attackers are after your router through some sort of CSRF attack, but again, I seriously doubt that something like what Anurag has proposed will ever work. For sure it will improve the situation security wise in certain areas but at the same time will make Web technologies rather inflexible which is something that developers hate. I don't think that people like `crossdomain.xml` either, and this is the reason why most sites allow everyone to connect to their stuff, although they probably don't know about the dangers of doing that.

Also keep in mind that Anurag's proposed solution will stop only POST based CSRF attacks. Those based on GET cannot be stopped. Someone may say that developers should make critical requests to go over POST only, but this is not the case that I see in the real world. Today, GET and POST are substitutable. PHP doesn't do it by default but I see developers enforce it anyway. I won't be surprised if we start using `$_PARAMS` instead of `$_GET` and `$_POST` in the future. Furthermore, most Java applications do not differentiate between GET or POST so they are practically excluded from any CSRF prevention policies we would like to introduce have.

> So yes, we can setup a policy but it will never take off. First of all standardization bodies needs to except it. Then browsers have to implement it and we have a browser war going on at the moment. No developer will implement a standard that is not widely adopted.

IMHO we need to look at security personalization options within the browsers rather then inventing new standards that may crash and burn like they've done so far. For example, browsers should not allow external pages to connect to sites with private IP addresses. But I would like to have the option to disable this policy if I want to.
