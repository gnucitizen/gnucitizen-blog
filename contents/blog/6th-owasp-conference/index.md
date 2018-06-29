---
title: 6th OWASP Conference
author: petko-d-petkov
date: Thu, 17 May 2007 07:33:14 GMT
template: post.jade
---

Here you will be able find all materials that I used for my [presentation](/files/2007/05/advanced-web-hacking.ppt) at the [6th OWASP Conference](http://www.owasp.org/index.php/6th_OWASP_AppSec_Conference_-_Italy_2007/Agenda). Further discussion and clarification on the subject to be expected very soon.

Be aware that the slides may not be very descriptive. In general, I try not to put too much information into my presentations in order to avoid unnecessary clutter. Feel free to drop a comment if something is unclear. The presentation will be explained in depth in several follow up posts on GNUCITIZEN, so subscribe to the [RSS](http://www.gnucitizen.org/feed/) feed to get it as soon as that happens.

There are two Proof of Concept examples that I used for the presentation. Both of them are theoretical. You can find them [here](/files/2007/05/6th-owasp-spider.htm) and [here](/files/2007/05/tinyfs.htm). Both POCs try to show the depth of the problem without being too malicious. Keep in mind that a lot more is possible.

The first POC, the JavaScript Spider, is a simple tool that uses Yahoo Pipes together with W3C Tidy to spider web pages. As you can see, no server side support is required from our side. Everything is handled by publicly available services.

The second POC, the TinyFS, is a simple tool for storing and retrieving information into/from TinyURL on-line service. Each slot is restricted to 3.9k, however this is more then enough for attackers who need to store malware code and retrieve it when required.

Other types of tools can be constructed in a similar way. It is easy to write port scanners, remote storage services, communication channels, distribution channels, attack libraries and databases, etc. I covered most of this at OWASP. It is also worth mentioning that although attackers can abuse these services to penetrate websites and to easy the distribution of Web malware, whitehats can construct highly distributed testing infrastructures to tackle web security problems a lot quicker. There are several tools that are currently build which will show in a greater extend the purpose of these types of systems.

_I hope that you enjoyed the [slides](/files/2007/05/advanced-web-hacking.ppt) and the presentation._
