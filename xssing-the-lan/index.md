---
title: XSSing the Lan
author: petko-d-petkov
date: Thu, 03 Aug 2006 23:14:01 GMT
template: this/views/post.jade
category: fucked
---

![Killer Tomatoes](http://www.gnucitizen.org/static/blog/2006/08/killer-tomatoes.jpg "Killer Tomatoes")

Since there is a growing interest in XSS (Cross-site Scripting) attacks, I will try to put in theory how border routers/gateways can be trivially compromised over the web. For the purpose of this, three prerequisites need to be met: a page that is controlled by the attacker, lets call it `evil.com`; router vulnerable to XSS; user attending `evil.com`.

Once the user visits `evil.com` a malicious JavaScript code executes to find what machines are alive on the LAN and where the router is located. This is usually achieved in a way similar to how the [JavaScript port scanner](/blog/javascript-port-scanner) works.

Once the router is identified, the malicious script needs to figure out the software version. This step can be skipped but it is definitely a good thing to do if the attacker wants to be as stealthy as possible. Keep in mind that modern browsers have cross domain restrictions which means that fancy AJAX techniques such as the [XmlHttpRequest](http://en.wikipedia.org/wiki/XMLHttpRequest) object, simply wont work here. The attack vector explained by [SPI Dynamics](http://www.spidynamics.com/assets/documents/JSportscan.pdf) though, should work on all browsers. As discussed in the SPI Dynamics' paper, the malicious JavaScript code fires several requests against the router looking for common image files. Different types of routers have different images, so it is obvious that this is a way of identifying the server software.

Depending on the results collected by the scanning process, an already disclosed XSS flow is flagged. This XSS flow is used by the malicious JavaScript to propagate its code to the router domain. This step is crucial since, again, as I mentioned before, modern browsers wont allow you to perform cross domain requests unless a forth prerequisite is introduced - a buggy browser. This however is a topic for a different post.

Anyway, the malicious JavaScript creates an invisible `iframe` inside `evil.com` that carries the attack. The `iframe` `src` (source) attribute contains a URL which exploits the XSS flow in the router. Since the code is executed on the router domain, cross domain restrictions are applied. This means that the the rest of the attack can be constructed out of `XMLHttpRequest` objects which provide greater control on the input and the output of each request.

In the final stage, the code transported by the router XSS flow performs a login and retrieves any sensitive information which after that is submitted to a remote collection point which is controlled by the attacker. Furthermore, in corporate environments the attacker may wish to put down the security level of the exploited device so she can go back to it whenever she want.

_It is quite simple and it is less complicated than it sounds._
