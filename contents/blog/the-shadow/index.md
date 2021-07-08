---
title: The Shadow
author: pdp
date: Fri, 02 Feb 2007 14:26:48 GMT
template: post.pug
---

_Let's start this conversation with a quick overview of the browser security model._

We all know that every modern browser has a security sandbox also know as the same origin policy. This sandbox prevents scripts from one site accessing information from a different site. If this restriction was not set on place everyone would be able to hijack your Gmail, Yahoo or Microsoft Live account (if authenticated) by simply reading your session information. The same origin policy also prevents scripts from retrieving content of remote resources that are not part of their origin/domain. This restriction is set for the reason to prevent the remote server leaking sensitive information. The same origin policy is far more complicated then what I have just covered but we had enough material for the purpose of this article.

Obviously attackers are looking for information that is valuable. We said that the browser does a good job to secure this information, but the question is whether this is enough. Because of the same origin restrictions attackers are trying other means of achieving what they want. Like always, the easiest way to do that is to play by the rules. If the browser disallows malicious scripts to access information from a given domain, then change the origin and bypasses the restriction. This is where attacks such as Cross-site scripting come into place.

Once a Cross-site attack is in motion, the attacker can cause quite a lot of trouble by simply hijacking your account. However, if the target happens to be on a location that does not offer that much of a value then I guess most of you will conclude that the XSS vector is completely wasted. Yes? Not if the attacker sends a **shadow** after you.

What you must understand is that attackers have achieved some kind of control over the target and they will try everything that is in their power to preserve it. This is not easy in terms of WEB technologies because we all know that the WEB is stateless and highly dynamic. If the target movies away from the Cross-site scripted resource, the control is lost.

We, as computer security professionals, went a little bit ahead of the attackers and developed ways to hijack the user experience across an entire domain. This is done by employing various XMLHttpRequest and IFRAME techniques. For a demonstration of such kind of attack vector, I enclosed the following snippet extracted from the [Atom Database](/blog/atom).

```javascript
function framejack(url) {
	var ifr = document.createElement('iframe');
	ifr.src= url;

	document.body.scroll = 'no';
	document.body.appendChild(ifr);

	ifr.style.position = 'absolute';
	ifr.style.width = ifr.style.height = '100%';
	ifr.style.top = ifr.style.left = ifr.style.border = 0;
}
```

If you look at the code you will see that when the `framejack` function is called, an absolutely positioned IFRAME is placed on the top of the current window. When the target interacts with the page the session is persisted. This is great, although obviously suspicious.

What might be better is to continue exploiting various Cross-site scripting flows as the target moves. As such, if the target is on `siteA.com` and they click on a link to `siteB.com`, the malicious code picks a vector for siteB.com and although the target goes for real on the specified domain, the control is preserved, i.e. a shadow is spawned.

The real change is to find as many Cross-site scripting vectors as possible. It is insane to thing that such kind of thing can be achieved dynamically, although [I am far from thinking that this is impossible](/blog/automated-xss-detection). However, for practical reasons, attackers may want to know about different Cross-site scripting attack vectors in advance.

A simple scan for the most obvious Cross-site scripting issues could prove to be quite useful. Google is also a valuable resource for discovering various input injection flaws. So it is a matter of constructing of big enough database.

One important think to remember is that the control can be lost as soon as the user access a page from the address bar and you are right that this will most definitely happen but think about web application that you don't usually move away from, like Gmail or Google Reader, or even your critical corporate app. Think about Kiosks and other web technologies that prohibit the user from changing the current location from the browser address bar.

_Be gone with my shadow now!_
