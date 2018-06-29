---
title: Cross Context Scripting with Sage
author: petko-d-petkov
guest: david-kierznowski
date: Fri, 08 Sep 2006 16:39:36 GMT
template: post.jade
category: fucked
---

> This month we have a guest blogger and his name is David Kierznowski, the founder of [Operation n - the adventures of Michaels Daw](http://michaeldaw.org/). David and I have been working together on various security related projects. He currently works as a security analyst and researcher. David contacted me after he found interesting anomaly with Sage Firefox Extension. These are his words:

I would often keep abreast of new vulnerabilities and exploits via my RSS feeds. Visiting page after page was just never fun. RSS allowed me to categorise, organise and track the security mayhem on the Internet. What was the point of employing a security analyst who was outdated and outgunned?

I decided to play with [Sage](http://sage.mozdev.org), which is a popular RSS extension for Mozilla Firefox. It had a friendly interface and a nice option to turn HTML tags on and off. This was a feature I was certainly interested in. It meant I could prevent a number of attacks outlined by SPI Dynamic's recent [RSS Injection whitepaper](http://www.spidynamics.com/assets/documents/HackingFeeds.pdf). The recommendation given in this paper was the typical recommendation given to XSS attacks. Escape `<>` to `&lt;&gt;`.

I turned off HTML tags and continued on as normal. However, something odd happened. When rendering my whitepaper [Awakening the Sleeping Giant](http://michaeldaw.org/projects/awakening-the-sleeping-giant-v10/) an insert of JavaScript was executed in my browser. How bazaar I thought. The security enabled feature makes me vulnerable. Sage was vulnerable to XSS! I immediately contacted pdp. We worked on it for 30 minutes and for those 30 minutes all you could hear were sinister laughs.

* **First**: Sage rendered `&lt;&gt;` as `<>`. This means JavaScript can be executed when HTML tags are turned off (not the default).
* **Second**: Logical mental progression put forward the question, what if we reversed it? `&lt;`, `&gt;` became `<>` when HTML tags were turned on (THE DEFAULT). This means we can effectively hack the latest version of Sage via RSS Injection regardless of which mode is set.
* **Thirdly**: Sage converts the feed into an HTML file and stores it on the local system. This means we were now in the browser's local zone policy. From here we could read any file from the local system.

The proof of concept feed can be downloaded from the following [URL](/files/2006/09/sage-feed-poc.xml).
