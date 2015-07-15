---
title: XSS Shell and Something More
author: petko-d-petkov
date: Sat, 04 Nov 2006 08:15:22 GMT
template: this/views/post.jade
---

[Ferruh Mavituna](http://ferruh.mavituna.com/) has released quite intriguing project called [XSS Shell](http://ferruh.mavituna.com/article/?1338). Conceptually XSS Shell is a persistent bi-directional channel that is controlled by a administrative console and can be hooked on any XSS hole; just like [Backweb](http://www.gnucitizen.org/backweb), [XSS Proxy](http://xss-proxy.sourceforge.net/) and [BEEF](http://www.bindshell.net/tools/beef). with this channel attackers are able to do some quite nasty stuff, like accessing your clipboard (IE only), use your machine to get into your local network, use your network resources to DDoS someone, etc.

Ferruh's XSS Shell differs from the other frameworks in many different ways. First of all it is written in ASP. Also, it provides mechanisms for extending the server as well as the client functionalities. An [online presentation](http://ferruh.mavituna.com/xssshell/demo/) on how to use the framework is also available. Check it out if your are still confused what the fuss is all about.

Although, I quite like the work that has been done on XSS Shell, I have a few remarks. I hope that my message will not be misunderstood.

When I was developing the initial 0.1 release of Backweb, I was thinking about portability issues a lot. Things like multi-channel support, interchangeable backend logic, database connectivity, flexible communication channel protocol, ease of use and ease of development were my main concerns. The web is a very diverse medium and if you want to create a good product that works everywhere you need to handle all technologies accordingly. That's why Backweb employs the separation of concerns model. As such, developers can create as many flavors of the attack channel as they need and all of them can be handled easily from the Frontend API. The top logic is pure JavaScript. The structure is defined by HTML and the presentation is simple CSS. One can manage multiple of channels. One channel can support backend database to lower the load of system resources while other can be self contained to be more portable. The top logic requires zero configuration in order to make it work. That's important. Installing actions is a peace of cake.

[Ferruh's XSS Shell](http://ferruh.mavituna.com/article/?1338) is great but it will be even better if less is required to extend the framework. Anyway, check it out. It is a good project and I am definitely looking forward to see how it will develop in the future.

Meanwhile I am busy with a few other projects that will be available quite soon. As you might already know I need to change Backweb's name to something else. Apparently the name is a registered trademark in US, Europe and Japan. This is quite nasty because I really like this name. I am deciding between the following two options: **BACKEND** Attack Console or **BACKVERSE** Attack Console. I have more ideas but they are not that good. If anyone has a good name for this project please don't hesitate to propose it here on this blog. You will hold the credits for it.
