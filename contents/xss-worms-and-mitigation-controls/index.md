---
title: XSS Worms and Mitigation Controls
author: david-kierznowski
date: Sat, 23 Jun 2007 13:52:13 GMT
template: this/views/post.jade
category: fucked
---

NTPolicy is some of ntp's ideas around mitigating XSS worm potential. He reflected these ideas as a response to our post, "[The Generic XSS Worm](/blog/the-generic-xss-worm)" where we reached out to the community to brainstorm ideas to solve the XSS crisis.  I have summaried his thoughts below in a bullet-list with my comments beneath.

> Implement logical seperation for Internet zones via a browser policy or use different versions of the browser for different network level access.

For clarity, we obviously mean implementing this a layer above the current same-origin-policy or else XSS or future attacks may be used to circumvent these controls. The idea here is to create a logical seperation between RFC1918 (private and reserved IP ranges) and the Internet. There are a few challenges, namely:

* A number of big names such as Google and Adobe are pushing applications that bridge the desktop and browser, so you'd certainly be swimming against the current on this one.
* How will this affect other browser controls such as file uploads and other DOM based controls? Imagine the costs involved.
* is it really feasible to expect users to have a different profile when viewing say an Intranet site and when browsing the Internet

> Vulnerability researchers and developers need to take XSS as a high priority to ensure quick remediation.

This is the human factor, so this will require a reward and penalty system to encourage this or has anyone got any mind-control syrup handy? The XSS risk rating is definately higher since the Samy worm and research conducted by ourselves and others, this has helped awareness, but I think its an optimistic view indeed, if we think corporate bodies will drop everything to resolve an XSS issue, in fact, I was in a meeting of this sort recently. 

> Use whitelists and update services effectively to prevent exposire and to decrease the attack surface

This is an excellent suggestion and one that most companies should already have in place via proxy servers. However, this doesn't really help our home users and looking at [xssed.com](http://xssed.com), I don't think whitelists are going to help a great deal right now, but certainly in the future.

> Developers should use a vul-IDE tool to alert them of poor code decisions;

Yes this would help to a degree, but again the costs and complexity of these tools are not attractive to the general market. 

> Logging and alerting on web applications to detect attacks;

Every company should already be doing this. This would really require human intervention which is costly as XSS attacks can be represented in a variety of ways making it very difficult for alerting systems to detect. Also, some XSS vectors may be DOM or browser based, so the attack materialises on the client-side rather then via the network.

> Security testing is optional

Car manufacturers would NEVER release a car onto the market without sufficient safety and quality assurance tests, why would software be any different? Looking over the above options, security testing is probably one of the most cost-effective and security-effective solutions available.

_Some interesting and well-thought ideas there by ntp. I think these mitigation controls or atleast most of them are to be used in policies later on after we have solved the initial problems. The initial challenge can be summed up in these wise words, "How do you eat an elephant? One peice at a time". I think we are in for the long-haul, a quick solution just wont cut it; carefully thought out procedures, standards and metrics need to be in place first._
