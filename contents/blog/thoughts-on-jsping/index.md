---
title: Thoughts on JSPing
author: petko-d-petkov
date: Mon, 09 Oct 2006 07:46:42 GMT
template: post.jade
---

Couple of days ago I had a really good discussion with [David K.](http://michaeldaw.org/) on his [JSPing tool](http://michaeldaw.org/projects/jswebping/) just before he released it. David, who is running Michael Daw's blog has been recently working on some cool projects and JSPing seams to be one of them. This project inspired me to do an extension of his tool and include the implementation into [AttackAPI](/blog/attackapi) 0.8 release which will be out very soon.

The technology behind JSPing is not new but the idea, IMHO, is very interesting. What David did is to make use of iframes and timers. Iframe elements are dynamically created and their SRC attributed is assigned to the URL we want to ping. If the resource is there a positive respond is generated, otherwise the call will timeout.

JSPing can be a lot more than that. I was thinking, instead of just checking for presence, why don't we check for the time that is required to load that resource. This will be quite useful in many different ways. First of all, the tool can be used to see if a server or page is up and running. Second, we can perform bandwidth related tests and finally we can check if a resource has been cached (visited). The last one is the most interesting IMHO.

There are two techniques that can be implemented in order to achieve the actions mentioned above. The first one makes use of iframes (David's implementation) and second one makes use of iframes again but this time we try to make the URL different in order to bypass the browser caching mechanism. Both of these techniques solve different problems.

David's implementation is more suitable when we want to check whether a remote resource is present or simply check if the resource is cached. If the page is fetched quite quickly from the remote server than it is likely that no request is made at all but a cache content is provided by the browser. This however is not always true for various reasons.

The second technique bypasses the cache control mechanism implemented by the browser by simply adding query fields to the URL that is about to be pinged. For example:

	http://www.gnucitizen.org

will become:

	http://www.gnucitizen.org?__pingrequest=1,
	http://www.gnucitizen.org?__pingrequest=2,
	http://www.gnucitizen.org?__pingrequest=3

and so on.

Because all of these URLs differentiate, fresh copies of the remote resource will be fetched each time we ping. This technique will be quite suitable when we want to measure the time that is required for the remote resource to download and based on that check how far it is. For example if we try to fetch an Intranet URL but it takes too long to load, it might be the case that a VPN solution is in use. This is a very simple and not quite accurate assumption but it could come handy, I guess.
