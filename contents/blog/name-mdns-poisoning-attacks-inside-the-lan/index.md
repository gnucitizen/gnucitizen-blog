---
title: Name (mDNS) Poisoning Attacks Inside The LAN
author: pdp
date: Wed, 23 Jan 2008 16:15:29 GMT
template: post.jade
---

"How easy is for attackers to compromise the LAN?" Answer: **Very easy!** With a few simple tricks, attackers can easily poison the local name resolution system for the machines inside a given LAN. Network Devices and Apple products are most vulnerable among others of course.

It is all due to mDNS. From [Wikipedia's article](http://en.wikipedia.org/wiki/Zeroconf#Apple.27s_protocol:_Multicast_DNS.2FDNS-SD):

> Multicast DNS (mDNS) is a protocol that uses similar APIs to the unicast DNS system but implemented differently. Each computer on the LAN stores its own list of DNS records (e.g. A, MX, PTR, SRV, etc) and when an mDNS client wants to know the IP address of a PC given its name, the PC with the corresponding A record replies with its IP address. [Wikipedia](http://en.wikipedia.org/wiki/Zeroconf#Apple.27s_protocol:_Multicast_DNS.2FDNS-SD)

The problem with mDNS is that it is spoof-able. Here is how it works. A mDNS enabled client will perform a mDNS query on a multicast address. All clients that listen on that address will respond back with their names. Now if we have two clients with the same name, who ever is the first, wins. So for example, if your word processing application decides to print a document by looking for **printer.local**, attackers can easily send a respond to that DNS query with a forged answer which instructs to look for the printer on a different IP address. Therefore, successfully hijacking/poisoning the local name for a duration of time.

On WiFi networks this type of attack might not be as useful because just picking up the DNS packets from the air and injecting forged DNS responses is easy, but there are many cases where mDNS attacks prove to be very, very useful. One such case is when performing enumeration. Due to the fact that most devices support mDNS to one degree or another, with a single multicast packet, attackers can learn plethora of useful things such as the available devices' versions and types, administrative URLs, email addresses of the owners, support information, etc, etc, etc.

In a situation where the attack is taken over a network where DNS requests cannot be sniffed and subsequently forged by the attackers, a mDNS spoofing attack is most likely to occur due to the fact that it works no matter what is the type of the transport medium. Many products are affected by mDNS spoofing attacks, including but not only **iTunes**, **Safari**, **XBox 360**, various **Routers**, most **Printers**, etc.

I found out that not that many people know about mDNS or even if they have heard of it they have never played with it to realize how insecure it could really be. Therefore, I've developed a simple [mDNS testing tool](/files/2008/01/mdns.py) written in Python. In order to run the tool, you need to install [pyBonjour](http://o2s.csail.mit.edu/o2s-wiki/pybonjour) and [Bonjour](http://www.apple.com/macosx/technology/bonjour.html). The tool has a discovery mode which can locate devices in a matter of seconds and also very good spoofing capabilities which can be used for testing how mDNS spoofing attacks work. This tool can also be used for debugging and administrating mDNS as well.

_Enjoy!_
