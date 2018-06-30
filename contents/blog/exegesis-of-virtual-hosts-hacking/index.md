---
title: Exegesis of Virtual Hosts Hacking
author: pdp
date: Thu, 06 Apr 2006 22:45:00 GMT
template: post.jade
---

This is the first [paper](/files/2006/04/exegesis-of-virtual-hosts-hacking.pdf) (as far as we know) written on the topic of **virtual hosts hacking**. It covers basic skills such as passive discovery techniques and (almost) stealth active discovery techniques. It also presents possible scenarios of exploitation.

**Exegesis of Virtual Hosts Hacking** was an experiment. The topic about hacking virtual hosts has been covered very vaguely in the past. This is the reason why we decided to develop standard techniques which can be implemented into our personal toolkits. Of course this led to a paper which you can read now.

Investigating the virtual hosts of a web server is quite important when performing penetration testing. In order to gain access to a particular site, the attacker may not always go trough the fontdoor but choose to attack a different site fist (going through the backdoor if you like). This is where knowing about various virtual hosts is coming quite handy. The most interesting bit in the paper is the actual investigation we've conducted at the time of writing. I am not completely sure how many readers realise the types of security implications that are behind the shared virtual hosting architecture.

Here is a excerpt from the paper:

> There is a lot that we can say about finding virtual hosts from a given IP address. Sometimes this task is straightforward, other times a bit of thinking is required. However, in general it is not a mission impossible.

> During the last few years, domain name databases have emerged like mushrooms after a rainy day. This has certainly increased the awareness among security professionals about the possibility of using virtual hosts as backdoors when testing the security of a given organization. In reality, a good attacker will try to break into your organization by knocking on the not-so-obvious doors.

> The process of getting all valuable virtual hosts usually falls into the passive, enumeration gathering practices and it is based on querying databases from the public sector. However, we will also look at some active enumeration techniques for finding virtual hosts.
