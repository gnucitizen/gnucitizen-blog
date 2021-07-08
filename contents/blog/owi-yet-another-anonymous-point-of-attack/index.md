---
title: OWI - Yet Another Anonymous Point Of Attack
author: pagvac
date: Fri, 04 Jul 2008 09:35:41 GMT
template: post.pug
---

About a month ago I traveled by train for a pre-sales meeting with a prospective customer. The trip was about two hours long, which would usually mean that it'd be boring. In this case it was different though: I was surprised with free OWI (Onboard Wireless Internet) on the train!

Simply connect to the available open (no encryption) wireless access point and you will be redirected to a [login portal](http://www.icomera.com/files/portal.jpg), aka captive portal. Just like any hotspot you find at coffee shops such as Starbucks. However, I was very pleased to find out that users could login as a guest which means that all passengers could go online without paying any additional fee!

Just to make things clear, going online as a guest was a legitimate form of access provided, as opposed to bypassing the security of the captive portal. _NO_ illegal cracking (i.e.: SQL injection without permission) was done whatsoever!

Kudos to the train company that provides the service! The connection wasn't super fast, but fast enough to be able to check my email, read the news, update my RSS feeds, chat with my buddies, etc ... It was quite reliable though, which is a big plus as I hate being disconnected while I'm on-line (it reminds me of the old days of dial-up Internet access).

A bit of enumeration 101 led me to [learn](http://www.icomera.com/products/ims) that:

* I was connected to to Sweden via a VPN link (mentioned in the whois records of the NATed IP address which you can obtain on [many](http://www.ipchicken.com) [sites](http://www.whatismyip.org))
* The service provider is a Swedish company called Icomera AB
* The data is transferred wirelessly via 3G and satellite connections
* All the train coaches are connected to each other in a Onboard Wireless Network (OWN) which is based on Wi-Fi

From a security point of view, this technology adds another "anonymous" point of attack to the already-large list. I say "anonymous" (within quotation marks) because there is no such thing as truly anonymous connectivity. However, one thing is true: if the bad guy knows what he is doing, it becomes unfeasible to track the point of attack and the attacker's identity. i.e.: it's not worth starting an investigation if the committed crime didn't lead to a serious profit loss.

From the top of my head, these are some anonymous points of attack that come to mind:

* **unprotected** (i.e.: no encryption) or crackable (i.e.: WEP) wireless access points: these could belong either to a home internet user, or a company
* **public hotspots** where guest access is allowed on purpose. i..e: hotspots at airports which do not require to purchase time when going online. So there is no need to provide personal details and credit card details for registering a user account
* **prepaid SIM cards**: in many places like Europe it's possible to buy pre-paid SIM cards without providing any personal identification. When combined with buying a mobile/cellphone from a [second-hand items shop](http://www.cex.co.uk) it becomes even harder to trace the identity of the attacker (but NOT the location as it can be triangulated in the cells architecture)
* **misconfigured proxies** (HTTP and SOCKS): they would allow anyone to connect via them without username or password. Although some proxies give away the attacker's IP address within HTTP headers (i.e.: `X-Forwarded-For`), there are plenty of [sites](http://www.freeproxy.ru/en/free_proxy/info_about_you.htm) that check for proxy-added headers that give away the original source IP address
* **compromised hosts**: we all are familiar with crackers bouncing their connections via compromised hosts (commonly owned via drive-by downloads attacks and browser exploits)
* **backdoor**/exposed dial-in **modems**: yes, this is very old school (i.e.: wardialing), but there is still some room for exploitation out there. By the way, Wargames 2 (the Dead Code) sucks really bad! (no joke)

Although there are tons of ways for attackers to hide their location and identity, somehow I find OWI more scary than most of them. It's scary because the attacker is always on the move, which might make tracking his location more difficult due to time correlation issues when comparing logs.

I know what you're thinking: how is this different to the attacker using a stolen 3G Internet card? After all, using a 3G card would also allow the attacker to be constantly changing his geographical location (i.e.: by being inside a moving vehicle). Well, that's a good point. However, in the case of using OWI the attacker doesn't need to steal any equipment.

If you think that being on a fast train won't make tracking the location of the bad guy when a break-in occurs hard enough, how about doing it on a plane at 800 kmph? Yes, that's right: free Onboard Wireless Internet aka In-flight wireless internet access, will most likely become very common in the future, which adds another anonymous point of attack to our list. Oh dear, remote Internet break-ins from planes, that's gonna be fun!
