---
title: Maluc on JavaScript Worms
author: pdp
date: Tue, 10 Oct 2006 01:51:16 GMT
template: post.pug
---

> This is the story so far: A couple of days ago I published the JavaScript SPIDER [here](/blog/javascript-spider). Than [John Resig](http://ejohn.org), a developer with some cool AJAX projects, notably jQuery, on his belt [claimed](/blog/javascript-spider#comment-209) that this is not a problem at all, misunderstanding the subject. Than maluc (I don't think I know him personally), backed me up with [this comment](/blog/javascript-spider#comment-224). Today I followed John's blog and I found [maluc's personal respond](http://ejohn.org/blog/javascript-spider#comment-15904) on the matter. I really like the summary that he made, so I decided to put it here. To remove the personal bit from his respond I replaced each "you" with "developers".

Developers seem to know how to program in javascript.. but clearly do not understand the sandbox security known as the Same Origin Policy for javascript, and the security implications of working around it.

So allow me to shed some light into the largely unexplored field of javascript worms. These are worms which propagate by using client side javascript, executed anytime someone visits the infected page. The biggest hurdle in propagation is finding new targets.. which can be accomplished in one of four ways:

1. Random IP dialing
2. Browser Exploit
3. Control Server
4. Public Services

As I said, this field is largely unexplored, but these are the most common. Method 1 is very inefficient, unless it's some global webserver exploit like one affecting Apache servers. Javascript worms, however, are mostly useful for propagating via exploits in web applications - like an SQL/XSS vulnerability in phpBB for example. Browser Exploits are uncommon, browser and version dependant, and if they let you bypass the same origin sandbox, they usually also allow remote code. In which case, you might as well infect the computer and run an executable that propagates. That requires both a browser and a webserver exploit, which is ideal but hard to come by.

And then there's Methods 3 and 4. Three is the usual way: Set up a Control Server to act as the worms head, locate potential vulnerable servers with it, pass their location to the client, client exploits it for you. The problem is this gives the worm a head, and when the heads chopped off the worm dies. Also for a large worm, you need a server that can handle such a huge load.

This is where pdp's work with public services shows destructive potential. It's still not a headless worm, but utilizing a server like google to search for vulnerable services .. [http://www.gnucitizen.org/blog/google-search-api-worms](/blog/google-search-api-worms) .. allows a worm of any size/load. Google has been used for years to do this - in PHP, Perl, asp, c++, java, flash, etc - but until recently it's been thought impossible to use javascript for it. That gives XSS and SQL vulnerabilities a very dangerous weapon. The javascript spider expands this to other common services like proxies.

_It adds a extra level of danger to persistent XSS and SQL injections. Hopefully this isn't all too difficult for developers to grasp._
