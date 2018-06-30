---
title: R00Ting Public WiFi Networks DHCP Name Poisoning Attacks
author: pdp
date: Fri, 25 Jan 2008 12:19:15 GMT
template: post.jade
category: fucked
---

Hacking is a discipline, which requires a lot of creativity and motivation and less understandings about the technology that is involved. The understanding comes in the process of hacking. All that is needed for a successful attack is the so called **X Factor**: "Do the bad guys have the motivation and commitment to do it?" If yes, then we have a problem.

Today I would like to cover an interesting attack vector, which can be performed once the attacker gains access to a network: beware, open WiFi networks and free WiFi HotSpots are found to be most vulnerable.

Here is a scenario: EvilX visits a public WiFi HotSpot. Once he/she is associated with the WiFI network, a DHCP message dialog is exchanged between the his/her computer and the DHCP server, which is most likely the default gateway. Upon that stage an IP address is reserved for the client and the machine is dropped into the network. From that point on, EvilX can see some of the machines by ARP scanning the network or even performing some pings (ICMP) if the network is not segmented, which is usually the case.

This is not in particular very interesting but what is more interesting is to look how DHCP is handled. If you carefully observe the DHCP **discover-offer-request-ack** dialog, you will notice that each packet initiated by the DHCP client contains several optional fields, one of which represents the name of the client. Many networks/routers will happily take that name and use it as part of their DNS service, so that if your computer is called _EvilX_ and this is the information that you transmit in the DHCP packets, then this is how your computer will be known within that network. Saying that, DNS lookups for _EvilX_ or _EvilX.[network suffix]_ will resolve to his/her IP address. And this is exactly the problem.

> The end result is obvious: attackers can register any name of their likings within the network under attack. And this is the problem.

Many laptops/desktops are configured to use shorter names when they are used within corporate and home environments. Simply put, the proxy server is most likely called `proxy`, the mail server is called `mail`, the WPAD server is called `wpad` (`wpad` hacking made easier), etc. In situations like that, when the client is associated with a HotSpot, it will query for that name but no IPs will be found due to the fact the DNS server cannot resolve the name. This is not the case with some DHCP enabled networks. As we discussed earlier, the name of the DHCP client can be set by us and as such we can create a domain name for `proxy` and `mail` which will resolve to no other but ourselves or the IP that we point in the DHCP chat. This means that by using simple UDP DHCP requests, attackers can poison the name of known services and redirect their traffic to an IP of their linkings. This is what I would like to refer to as a DHCP Name Poisoning Attack.

The situation is even worse then it seems. Due to the fact that we can set the expiry date for the requested IP address, attackers can hold in charge of that domain for long period of time. Lets say 5 days. In some cases, they can even assign domain names to external IP address but I am happy to report that such cases are less likely to occur unless the attacked DHCP service is heavily insecure and flawed by design. Though, I have seen numerous networks that are in particular vulnerable to this type of attack, so attention on this one is required.

It is also worth mentioning that usually there are no restrictions on how many names someone can register for a particular IP address. In fact, I haven't seen any DHCP services that enforces restrictions so far. This means that the attacker can simply register a dictionary, each word of which will point to a single IP, therefore exhausting all combinations and increasing the chances of a successful attack.

> Attackers can also register domains such as `google` so that if the user types the word in their browser, they will be redirected to the attacker's web server.

I have developed a very basic [script](/files/2008/01/dhcpmangle-perl.txt) that you can use for testing whether you network is vulnerable or not. I highly suggest to give it a bash and see what it comes up with. If the result is positive then you should undertake some precocious steps to secure your network.

    [/files/2008/01/dhcpmangle-perl.txt](/files/2008/01/dhcpmangle-perl.txt)
