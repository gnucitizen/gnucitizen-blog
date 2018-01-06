---
title: DHCP/mDNS Injection Issues
author: petko-d-petkov
date: Sun, 27 Jan 2008 09:30:07 GMT
template: post.jade
---

In the [previous](/blog/r00ting-public-wifi-networks-dhcp-name-poisoning-attacks/) post I've talked about how someone can poison local name servers (nasty things like registering a `wpad` name) through DHCP. In this post, I would like to draw your attention on various other injection issues that come into mind when we are dealing with that very same protocol. The reason for all these issues is because people tend to trust certain known protocols far too much than they should.

Again, we have the same situation: attackers can register a name via DHCP (read [R00Ting Public WiFi Networks: DHCP Name Poisoning Attacks](/blog/r00ting-public-wifi-networks-dhcp-name-poisoning-attacks/) for more information on how it is done). However, because the name is just a string, they can supply any value of their likings even things like `<test>`, for example. Once the backend processes the information retrieved over DHCP, certain application hooks are activated, like for example the ones that record that a new client has associated with the access point. These types of lists are available on almost every router and usually display information about each client's MAC address, its NAME (DHCP supplied) and IP address. Because the list is displayed within the router Web administration console, attackers can persistently store XSS vectors and other nasty things within it. This information can even get to the system logs.

Apart from common XSS problems, which are quite nasty imho, another interesting and highly exploitable scenario will be where the developer has used the DHCP supplied strings within unsafe functions like `printf` or `sprintf` or anything equivalent to them even if they are called from some scripting language. Obviously, because the attackers can control the format string they can potentially overwrite sections of the memory or leak such by querying the DNS server or combining them with XSS payloads. Not cool!

Unfortunately, DHCP is not the only protocol that is subjective to trivial but nasty attacks. Apple's mDNS is probably even worse since the attacker does not have to manipulate the request but rather advertise itself as whatever is required for the purpose, as I've [explained](/blog/name-mdns-poisoning-attacks-inside-the-lan) two posts back. mDNS will effect most of the time Apple products although if you are running Bonjour for Windows, you are at risk as well. Most embedded devices also support mDNS by default. Ensure that you shutdown the mDNS nastiness before visiting any untrusted networks.

_This is pretty much it. Just keep these notes in mind the next time you test DHCP/mDNS enabled networks._
