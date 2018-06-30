---
title: XSSing the Lan 2
author: pdp
date: Fri, 04 Aug 2006 09:07:31 GMT
template: post.jade
category: fucked
---

![Killer Tomatoes](/files/2006/08/killer-tomatoes.jpg "Killer Tomatoes")

In order to perform browser based attacks, JavaScript is most definitely required with a number of restrictions of course. Flash 7 has the flexibility to perform cross domain requests without restrictions, however this is sort of fixed in Flash Player 8. Java applets are quite the same in that respect. In certain situations it might be possible to trick the browser into doing what ever you want, but this is a different story. Let's briefly outline how JavaScript and Flash can be used to attack your LAN.

> First of all the attackers may take advantage of a device vulnerable to XSS (Cross-site Scripting). In this case, all they need to do is to make an `iframe` call to the vulnerable URL in order to inject JavaScript code within the attacked device domain. When this is achieved the browser happily allows `XmlHttpRequests` without any restrictions. In the AJAX world, the `XmlHttpRequest` is the most well know technology for performing `POST, GET, TRACE, TRACK, PUT, etc` requests. As a result, attackers can successfully bypass the cross domain restrictions that are in charge of the browser security for this particular domain. Keep in mind that JavaScript code can travel along the same domain but cannot jump on another.

On the other hand, in case the current browser has an outdated Flash plugin, the malicious site can perform the desired attack without the need of an internal device being vulnerable to XSS as I outlined in this post. However this is probably not going to work in most cases because the Flash Plugin updates are enforced on regular basis by Adobe. The attackers can take advantage of several Flash bugs widely discussed in the past.

In case sensitive information needs to be transferred from the local LAN to a remote collection point, a number of techniques can be employed with a various degree of success. For example, a Flash object can store a lot of information by using the [AJAX MAssive Storage System (AMASS)](http://codinginparadise.org/projects/storage/README.html) technique. When the storage reaches a critical mass (99K) the content can be automatically dumped at a remote collection point via a series of POST or GET request. All this can be achieved from Flash (all versions). Of course the remote collection point needs to have a `crossdomain.xml` file served from the document root or some other location in order to allow cross domain requests in case the Flash plugin is in its latest version with maximum security "on".

_All of these stuff are performed at runtime. The attacker can detect what version of Flash is currently used. Based on that, the best attack vector is selected. This can be trivially achieved by using some well known AJAX libraries available for free._
