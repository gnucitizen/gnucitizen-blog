---
title: Automated XSS Detection
author: petko-d-petkov
date: Mon, 06 Nov 2006 01:42:47 GMT
template: post.jade
---

Automation - it is the power to change the boring repetitive task into something that is more fun. Automation is also what I seek when I do security research or penetration testing. If there is a security vulnerability; we write an exploit for it. If there is a known method of exposing thousands of machines to malicious attacks; we write a worm for it or at least a vulnerability assessment engine.

One thing that nobody bothered to do with the traditional (executable) worms is to add a mechanism for finding new vulnerabilities and exploiting them on the fly. This is because the process will require something that understands what debuggers are, how processes co-exist, how networking works, etc. Putting something like this into an executable is complicated; building the pragmatics and semantics that are required is even more. However, I believe it can be done at at a browser level especially when we are looking for client-side vulnerabilities such as XSS.

The problem with locating XSS vulnerabilities from the browser, which is what I am after, is again, like all other problems in this field of research, hidden inside the same origin policy (a.k.a SOP). Simply put, pages from one origin cannot access content from another. That means that first of all attackers don't know what kind input channels (GET and POST) can be exploited, and second, they don't know how to get the result back when an XSS is detected because they don't have access to the targeted web resource (i.e. no access due to SOP). So, when both of these obstacles are successfully bypassed, we will end up with automated XSS detection engine that works from the browser and exploits vulnerabilities on the fly.

At first glance, solving obstacle one seems to be hard but not impossible. How can we know what input channels an application has? There might be some forms, but we don't know them. We can brute force names but that is slow and kind of not what we are after. The simplest thing I come up with is to proxy the page through Google Translate or another similar proxy and get the content by using the [technique](/blog/traversing-the-web) implemented in the [JavaScript SPIDER](/blog/javascript-spider) proof of concept tool. Although it is slow and far from perfect it is a possible vector that can be employed to one degree or another. Further more, input channels such as GET fields, can be exposed by querying our main web content librarians. We can use the Google AJAX Search API with the following query `site:<targeted site>` and the search engine will give us tons of URLs some of which may have GET fields after the question (?) mark.

So the input channels are identified. Now is time to get to the real thing: detecting a vulnerability. This task of course needs to be divided into two sub-tasks: find a generic way to check for the presence of a vulnerability and build a pragmatic approach to automate the process.

Luckily, task 2.1 is easy to achieve with JavaScript. With XSS we can simply try to inject various forms of JavaScript code into the targeted page's (under the control of an iframe) input channels that will set certain bits on the parent page that can be used to detect the presence of executable code. For example:

```javascript
document.parrent.location.hash = "vulnerable";
```

Meanwhile, the parent is set into an interval loop that will check for any changes like this:

```javascript
setInterval(function () {
	if (document.location.hash == "#vulnerable") {
		alert("got it");
	}
}, 2000); //every two seconds
```

There you have it. Although this example is far from being perfect, it could should work and it is good enough a POC.
