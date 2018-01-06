---
title: Ad-Jacking - XSSing for Fun and Profit
author: david-kierznowski
date: Sun, 01 Jul 2007 08:24:28 GMT
template: post.jade
---

How to XSS is often the topic of conversation among security professionals; however, the reason or motivation for why an attacker might want to exploit an XSS vulnerability is often limited to stealing cookies or hijacking credentials. This post takes an almost sensationalist point of you as we take you on a journey to a possible web 2.0 XSS worm armed with an Ad-Jacking payload; an attack I introduced a short time ago.

Ad-Jacking is a term I coined to categorise covert Ad hacking or Ad hijacking schemes. 

The traditional Ad hacking system was called, [click fraud](http://en.wikipedia.org/wiki/Click_fraud). This malicious system would exploit PPC (pay-per-click) advertising in some obvious manners. In my opinion the name itself is almost inviting people to be malicious, especially when the beneficiary realises its not "pay per click" but "get paid per click". Ad providers now have a plethora of techniques and wonderful equations to detect and punish click fraud offenders. I believe Ads are also moving away for PPC schemes and more toward PPA (pay-per-action) schemes.

The current Internet Ad schemes generally fall into one of these categories:

<table>
<thead>
<tr><th>acronym</th><th>name</th><th>description</th></tr>
</thead>
<tbody>
<tr><td>CPC</td><td>cost-per-click</td><td>Money per click</td></tr>
<tr><td>CPM</td><td>cost-per-thousand</td><td>Money per thousand impressions</td></tr>
<tr><td>CPA</td><td>cost-per-action</td><td>Money per action (i.e. a sale, survey etc)</td></tr>
<tr><td>Affiliates</td><td>Affiliate programs</td><td>Custom - can involve any of the above and more.</td></tr>
</tbody>
</table>

So what are our payload ideas here? It is possible to exploit CPC and CPM, but I think this would be fairly noisy and quickly picked up on by the Ad provider and as I mentioned earlier these may be the last days for PPC Ads; however, a suitable malicious algorithm utilising multiple Ad providers might prove effective. CPA on the other hand is more subtle in my opinion, and I can see attackers leaning more toward this approach.

I don't want to repeat myself to much, as I have discussed some proof of concept attacks in the following articles:

* [Ad-Jacking Affiliate Anchor Tags](http://michaeldaw.org/papers/paper-020607/)
* [XSS for Fun and Profit](http://michaeldaw.org/papers/paper-290507/)

The danger with Ad-Jacking is that it requires little or no user intervention from the attackers point of view. It should also be understood that although my ideas are centered around an XSS engine, the reality is that anything from a backdoored browser plugin or greasemonkey script, to a heap spray or buffer overflow payload could be used. Imagine the possibilities of a client-side Ad-Jacking worm! It inserts the attackers Ads onto pages... it rewrites affiliate IDs... the malicious potential here is apparent. Also, because the attack is client-side based, it is much more difficult to detect.
