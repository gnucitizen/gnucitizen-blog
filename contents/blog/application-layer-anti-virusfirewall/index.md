---
title: Application Layer Anti-virus/Firewall
author: petko-d-petkov
date: Wed, 11 Apr 2007 09:05:44 GMT
template: post.jade
---

So, we have servers, and these servers host applications. Each application is composed of server-side and client-side components. Traditionally, the server side components is where most of the business logic resides. Traditionally again, in order to secure your application you have to spend considerable amount of time to make sure that every server-side component works as it is intended to. If you happen to miss something, you can quickly patch it with [mod_security](http://www.modsecurity.org/) for Apache. Traditionally, none cares about the client.

If you ask [Ivan Ristic](http://www.modsecurity.org/blog/), the creator of mod_security, he will tell you all about how good application firewalls are and how everyone should use them. He is sort of application firewall evangelist, although I cannot quite understand why people use this term and why they want to call themselves evangelists, but it is ok.

mod_security is advertised as Application Layer Firewall, but this is quite incorrect. Which side of the application layer we are talking about: server or client? If you play around with it, you will see that it is primarily intended to secure the server although in some situations it may save some trouble for the client. I have been thinking about these type of concepts for quite some time now so I figured that we need to make some clear differentiations.

In this article I will quickly cover some ideas that I've been accumulating about client-side and server-side protection. I put all of these concepts under the common term Application Layer Anti-virus so you don't mistaken them for Application Layer Firewall, as being used by mod_security. In general, I am going to talk about protecting the client and the server all together. If you think that Application Layer Anti-Virus is a bit ambiguous as a name, I apologise. I couldn't think of anything else.

The biggest question is how to protect the client when the server is vulnerable and how to protect the server when the client is vulnerable. This question does not have a simple straightforward answer. Let's examine the following case study:

> Joe visits `site.com`. `site.com` has a cross-site scripting flaw which is used by the attacker to inject malicious JavaScript inside Joe's browser. Because of `site.com`, Joe's personal information is leaked and his system is exposed to all sorts of other attacks.

Let's have the same case study but this time change the roles of the client and the server. It looks like the following:

> Joe visits `site.com`. Joe's browser is vulnerable to the MHTML or Adobe PDF UXSS bug. Because of Joe's insecure browser, `site.com` is at risk of being compromised.

Can you spot the difference? No matter which side is vulnerable, the other is indirectly exposed to an attack too. Therefore we need to secure both sides. However, it is really hard to secure the client from the server since only the user has access in there. So how, can we make some sort of generic solution that is implemented on the server to resolve client and server issues? Well, it ain't going to be easy.

In my mind I picture something like integrated solution which resembles to a great extend mod_security. but with client-side features. The server-side of the application is protected by the typical input validation rules, while the client is protect by injecting JavaScript inside each stage, or at least at the login stage, that verifies for client side vulnerabilities, such as the version of the Adobe Reader plugin, etc.

So again, the server is protect by input validation. While the client is protected by JavaScript injected for each stage. For example, coming back your our case study:

> Joe visits `site.com`. Before login `site.com` verifies the integrity level of Joe's browser (i.e scan for vulnerabilities). Because Joe's browser has some issues, `site.com` informs Joe that unless he patches his system, he won't be allowed to enter.

Most of you probably think that this not really that nice solution because it relies on JavaScript. Probably you are thinking that you can trick the system by disabling JavaScript or maybe even change your DOM in a such a way that it seams that you are not vulnerable, however, all these doesn't make sense. None will go through all the hustle to bypass the system when they can simply patch and use the web safely.

> I won't be surprised if anti-virus vendors such as McAfee, Kaspersky and Symantec get into this type of venture.

Still, there will be some problems with situations where the client-side of the application is vulnerable to issues like DOM-based XSS. To a great extend, this can be handled by our solution by encapsulating the page DOM inside a jailed environment. The solution will be messy but far from being impossible.

To summarize, this is how the proposed system should work:

> The server-side solution verifies the input and makes sure the the request and responses are RFC compliant. The client-side solution embeds itself for each stage and verifies the integrity level of the client. For further protection, the solution wraps the page DOM to protect against common DOM-based XSS issues.

This is what I call Application Layer Anti-virus or Firewall. It is feasible to construct something like this and I believe it is very likely to happen in the near future.
