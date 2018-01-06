---
title: How To Make Money With XSS
author: petko-d-petkov
date: Mon, 10 Sep 2007 15:27:59 GMT
template: post.jade
---

Finding XSS is dead easy task. Everybody is vulnerable to this type of issue and even if there are protection mechanisms on place such as application firewalls and sanitization filters, very often attackers can get a stable exploit working in a matter of a couple of minutes. In fact, I don't think that there are unstable XSS exploits. It is not like the attacker have to manipulate the stack or a corrupted heap in order to get some sort of execution control. No! It is a simple injection issue.

In this post I am going to summarize one of the attack strategies, which I discussed in detail in my paper [For my next trick - hacking Web2.0](/blog/for-my-next-trick-hacking-web20), and talked about it over [here](/blog/owasp-day-2007). We are going to look at a very basic scenario which outlines a possible technique attackers can use in order to make money out of XSS vulnerabilities.

The strategy is quite simple. First of all attackers need is a bunch of XSS issues for various sites. The higher ranking these sites have, the more money they will make. A good starting point is [XSSED.com](http://www.xssed.com). The attacker can simply grab the high ranking sites from known lists and use them for the strategy that follows. On the other hand, a simple python script in combination with Google.com could serves the same purpose.

So, at this stage the attackers have XSS attacks ready to be deployed. The next stage is to come up with a generic payload for all of them. This step is quite simple as well. In regards to the initial idea, there are two ways to make money: direct and indirect. I am going to cover the Ad-jacking one :). The idea is that the attackers plug an XSS payload into the page to hijack the ads revenue. This is a dead easy task. In most cases, all the attackers need to do is to change a simple number. From this point on, everyone who stumbles across the Ad-jacked page and clicks on the any ad, some profit will be made not to the page owner but the attacker. **Not cool.**

The final stage is to get the XSSed URLs and their payloads out for general consummation. Attackers can use the power of Web2.0 technologies in this case. Social bookmarking sites fit very well here. The more the attackers bookmark the Ad-jacked URLs, the more money they will make out of them. There are even services like [OnlyWire](http://onlywire.com/), which allows attackers to distribute the URLs to 20 more different social bookmarking websites in a single go. Of course, attackers will keep websites with very, very, very high ranking for services such as DIGG and Reddit for manual submission, since both of them have CAPTCHAs. But, heh, CAPTCHAs can be easy broken as well.

Now search engines, aggregators, and other robotic things will start exploring and crawling the Ad-jacked webistes. People will start visiting them and looking for info inside them and every once in a while someone will click on the ads. The only problem is that site owners will share their profit with the crooks.

_So, this is it! More information about this issue is outlined in the paper. Have a look through it if you have time._
