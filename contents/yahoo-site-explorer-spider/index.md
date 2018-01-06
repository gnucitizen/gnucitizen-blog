---
title: Yahoo Site Explorer Spider
author: petko-d-petkov
date: Sun, 15 Jul 2007 21:47:10 GMT
template: post.jade
category: fucked
---

Here you go. On this page you will find a [POC](http://www.gnucitizen.org/static/blog/2007/07/spider.htm) of a client-side spider that is based on the top of Yahoo Site Explorer `PageData` service which you can read more about from [this](http://developer.yahoo.com/search/siteexplorer/V1/pageData.html) page.

I've being talking about client-side spiders for quite some time now over [here](/blog/traversing-the-web) and [here](/blog/javascript-spider/) and I even came up with POC based on Yahoo Pipes for my OWASP presentation on "Advanced Web Hacking Reveled", which you can find over [there](/blog/6th-owasp-conference/).

Web spiders in particular are nothing interesting. They have been with us for quite some time now and there is no point of discussing what they can do. Though, spiders are the first step towards a successful web attack. Obviously, in order to find the weaknesses within a web application, first of all we have to enumerate all entry points. This is where we launch spiders. Sometimes spiders are semi-automatic or completely automatic and may contain attack payloads.

There are plenty of wormish spiders around over the Web, but most of them require server-side support. Fortunately for us or perhaps not, this is no longer the case when it comes to AJAX technologies and the fast developing world of Web2.0. Today, it is possible to write spiders that are completely client-side based, i.e. written entirely in JavaScript.

"But how is that possible? I though JavaScript cannot access pages outside of the current origin. Is that a browser bug?" Nope! This is not a browser bug. It is a feature of the Web. In my case, I am using Yahoo to provide me with an index of resources crowed by theirs and Google's spiders. This index is provided as a JSON service. Here is a description of what the service does:

> The Page Data service allows you to retrieve information about the subpages in a domain or beneath a path that exist within the Yahoo! index. [Yahoo Developer](http://developer.yahoo.com/search/siteexplorer/V1/pageData.html)

"This is great but how can attackers use this service?" Well the most obvious way to make use of Yahoo Site Explorer service is in the situations where attackers want to find bugs in other sites in real time. Billy Hoffman and I have presented several real life scenarios how XSS vulnerabilities can be found almost automatically from withing the client without the support from a server side technology. This is somewhat dangerous because worms can be written entirely with client-side languages such as JavaScript or ActionScrpt, which way cooler than using boring general purpose languages.

You see, worms are often quite stupid in nature. They propagate either too fast or too slow. Very often, they are static and attack from specific IP ranges. During the first stage, we are able see a raise of particular type of traffic that originates from a particular geographical region. In order to stop further propagation, we can simply block the malicious traffic based on the worm signature. Game Over for the worm. The good guys win!

The spider that I wrote is anything by malicious. It just spiders. However, keep in mind that it will take no time to make it equipped with the latest client-side and server-side exploits. So, here is the spider's source code:

    [http://www.gnucitizen.org/static/blog/2007/07/spider.js](http://www.gnucitizen.org/static/blog/2007/07/spider.js)

    _and this is how I use it:_

    [http://www.gnucitizen.org/static/blog/2007/07/spider-init.js](http://www.gnucitizen.org/static/blog/2007/07/spider-init.js)

_Keep in mind that this spider is ultra fast. It does only several connects in order to obtain the entire directory structure of the targeted website. You can launch the POC from [here](http://www.gnucitizen.org/static/blog/2007/07/spider.htm)._
