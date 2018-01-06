---
title: Darknets
author: petko-d-petkov
date: Fri, 04 Apr 2008 08:44:00 GMT
template: post.jade
---

> A darknet is a private virtual network where users connect only to people they trust. In its most general meaning, a darknet can be any type of closed, private group of people communicating, but the name is most often used specifically for file sharing networks. "The darknet" can be used to refer collectively to all covert communication networks". However, in the information security field, this term has a slightly different meaning.

A darknet is any routed network which does not have visible servers/hosts, apart from a transparent machine which acts as a blackhole, i.e any packet sent to that network will be logged by the machine for further analysis. The network is dark because no traffic should have resulted naturally in its segments due to the fact that there is nothing interesting there.

Darknets are extremely easy to setup and yet they are one of the most efficient ways to detect suspicious activities without the overhead of false-positives IDS and IPS solutions currently provide. Think about the busiest network if have ever seen. How many false-positives do you encounter in the course of a single day? Quite a few, I guess. This is what attackers usually rely on. They know that the busier the network is the higher the chances for their activities to remain undetected. However, darknets usually don't receive any traffic at all, therefore any packets that arrive through the perimeter of the network should be treated as a threat. No false, positives whatsoever. Of course, if the attacker knows about the existence of such a network, they can easily bombard it with all sorts of meaningless and useless packets but the point is that someone is messing around which is a good reason to change your defcon level of your infrastructure.

There you go. Simple, but rather effective tactic for all to make use of.
