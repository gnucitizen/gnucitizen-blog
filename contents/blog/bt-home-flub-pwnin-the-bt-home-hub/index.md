---
title: BT Home Flub - Pwnin the BT Home Hub
author: pagvac
date: Mon, 08 Oct 2007 16:41:42 GMT
template: post.pug
---

OK, let me get to the point. The [BT Home Hub](http://en.wikipedia.org/wiki/BT_Home_Hub), which is probably the most popular home router in the UK, is susceptible to critical vulnerabilities.

BT's plan is to sneak one of these boxes into every UK home. Not only does the BT Home Hub support broadband but also VoIP (BT Broadband Talk), [UMA](http://en.wikipedia.org/wiki/Generic_Access_Network) mobile telephony ([BT Fusion](http://en.wikipedia.org/wiki/BT_Fusion)), and digital TV ([BT Vision](http://www.btvision.bt.com/vision/index.htm)). Additionally BT will give users the option to use their BT Home Hub to join [FON](http://blog.wired.com/gadgets/2007/10/fon-and-bt-in-i.html), a community-shared Wi-Fi. An unofficial source has reported us that there are _2+ million BT Home Hub users_ in the UK.

If you're thinking: "well I'm not based in the UK so this research doesn't concern me", then think again! The BT Home Hub is just a Thomson/Alcatel [Speedtouch 7G](http://ugolini.com.au/speedtouch/routers/7G/GENERIC%20DOCUMENTATION/Picture/7G.jpg) router. Furthermore, the vulnerabilities we found are most likely present in other Speedtouch models due to code reuse (more on that later).

So what can we do? Well, we can fully own the router remotely. At the moment we have three demo exploits which do the following:

* enable backdoor in order to control the router remotely
* disable wireless completely (can only be re-enabled if the user is technically capable)
* steal the WEP/WPA key

Of course there other other attacks you could launch! We can hijack any action with full admin privileges or steal any info returned by a router's page. This means evilness of the exploits are only limited by the attacker's imagination. Other examples of evil attacks include evesdropping VoIP conversations (change 'sip config primproxyaddr' statement in config file), stealing VoIP credentials, exposing internal hosts on the DMZ, change the DNS settings for stealing online banking credentials, disable auto updates (change `cwmp.ini` section in config file), etc ...

The only requirement for the router to be owned is that a victim user visits a (malicious) website. The good news is that our exploits do NOT require knowledge of the admin password! How can that be? Well, we rely on a authentication bypass bug we discovered!

Even though I've been the owner of a BT Home Hub for quite a while, I never bothered to try to find vulnerabilities in it. However, on the last [dc4420](http://dc4420.org/) meeting, after I gave a talk on [breaking into Axis cameras](http://www.procheckup.com/Vulnerability_Axis_2100_research.pdf), some of the guys there inspired me to research the BT Home Hub. After poking with it for a while, pdp and I couldn't believe how vulnerable the web interface of the device was! I remember pdp sarcastically saying: "wow, it's really locked down man!", We discovered issues such as:

* authentication bypass (any admin action can be made without username/password!)
* system-wide CSRF
* several persistent XSS
* several non-persistent XSS
* privilege escalation

We're now in the process of contacting BT and Thomson. However, I don't have high hopes for BT. Last year, I [found](http://unknown.pentester.googlepages.com/bt-voyager-unauth-access.txt) a way to dump the BT Voyager 2091's config file without credentials. Even though I forwarded them my findings they never responded at all.

<iframe class="video" src="//www.youtube.com/embed/i4tkM3UtF1Y" frameborder="0" allowfullscreen></iframe>

_Enjoy the demo video which was kindly prepared by pdp. We misspelled some words on the chat conversation, so please forgive us! In the video, the attacker social-engineers the victim to visit a malicious website. The malicious website in turn enables remote assistance on the victim's router with a password chosen by the attacker. After that, the attacker gains full privileges to the router remotely, and steals the config file and WEP key._
