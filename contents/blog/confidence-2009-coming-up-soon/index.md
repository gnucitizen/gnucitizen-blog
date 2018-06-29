---
title: CONFidence 2009 coming up soon!
author: adrian-pastor
date: Sat, 14 Mar 2009 13:47:47 GMT
template: post.jade
---

The new edition of [CONFidence](http://2009.confidence.org.pl/) is coming up soon! CONFidence, which has become one of the biggest technical IT security conferences in Europe, is taking place on 15-16 May in the beautiful city of [Krakow](http://en.wikipedia.org/wiki/Krak%C3%B3w).

<div class="screen">[![](/files/2009/03/confidence.png "CONFidence 2009")](/files/2009/03/confidence.png)</div>

This is the fifth year CONFidence is taking place, and there have been several changes introduced. First of all there will be two simultaneous tracks after lunch time, whereas previous editions only offered one track all day. Also, this year introduced the **Hackers' Squad**, which sounds to me like a great idea for learning and having fun at the same time. The following is mentioned on the CONFidence website regarding the Hackers' Squad:

> During 5th edition of CONFidence you have a unique chance to stay at the coolest spot in the city Hackers' Squad. It is a place where hacking never stops!
> 
> We decided to rent the whole hostel (or even group of hostels if it's necessary) and turn it into the real hacking space a place to sleep, to party and to hack - only for CONFidence attendees.

Last year pdp and I had a blast at the event, which we found to be one of the best organized security cons we've been too. To date, I can say that CONFidence and [HITBSecConf](http://conference.hackinthebox.org/) - aka Hack in the Box - are probably my two favorite hacker events. Unfortunately, pdp won't be speaking at CONFidence this year, but he will be busy presenting at other events such as [AusCERT 2009](http://conference.auscert.org.au/conf2009/).

### My humble talk on credit card theft

I'd like to personally thank Andrzej Targosz for inviting me to speak this year, making it the second time I'll deliver a presentation at CONFidence. I hope my presentation will be interesting and entertaining enough for the audience. This is the abstract for my talk:

> You are a security geek, you specialize in pentesting, but somehow during your career you've had to deal with PCI DSS. Yes, PCI DSS can be very boring, I feel your pain! Pentesters usually don't like standards because they understand that there is only so much they can do to help organizations protect their information assets. On top of that, pentesters usually like to experiment which goes against the principle of boring audit checklists.
> 
> In this presentation, we will cover PCI DSS and credit card security from a (hopefully) fun perspective, with a focus on credit card theft techniques. How are merchants and service providers being compromised? How about us consumers? What loopholes currently exist in the PCI DSS standards which still allow unsophisticated attackers to compromise credit card data?
> 
> This presentation is _not_ brought to you by a PCI DSS expert, but rather a frustrated pentester who will attempt to show you that PCI DSS and credit card security in general can be a fun topic! Knowledge learned from performing pentests and from working with QSAs who have assessed compromised data centers will be shared.

Of course, if you have any thoughts on things you think I should cover in my presentation I'm all ears!

### Talks I'm interested in

I must say that there are quite a few presentations that look interesting, but it was [Rich Smith](http://2009.confidence.org.pl/prelegenci/rich-smith)'s abstract on attacking VNC that caught my eye the most.

The reason why I'm interested in this talk is because Rich is basically answering a question I asked myself a long time ago when the infamous [VNC auth bypass vuln](http://www.securityfocus.com/archive/1/433994/30/0/threaded) was discovered: can we programmatically run commands via the Remote Frame Buffer (RFB) protocol which VNC relies on? It seems that Rich has done a heck of a job at answering this question!

I remember exploiting the VNC auth bypass bug during pentest assessments. Basically, once you gained access to the desktop two things could happen: 1) the screen is locked and you're stuck, 2) the screen is unlocked and you gain access to the currently-logged-in user's session.

In the second case, you can obviously do anything including running commands of course. So if the logged-in user has admin privileges on the box, it's a full compromise pretty much. However, the attack can be very noisy, since the attacker is graphically interacting with the desktop. For instance, imagine if the admin was physically sitting in front of the compromised system while watching someone else opening the command prompt, etc. Another scenario which can arouse suspicion is the admin remotely VNCing into the box. If the attacker also connects via VNC to the same box, that would kill the admin's VNC session. Quite noisy as you can imagine.

So my question back then was, _could someone programmatically compromise a box via VNC and then launch a malicious payload?_ i.e.: adding a new OS account. I must say that I dug a bit back then and it's not as trivial as it sounds, which is what Rich is arguing in his presentation, although he did manage to write a python library and suite of tools for automating tasks like this.

Think of the following automatic task:

1.  scan boxes for blank VNC passwords
2.  if blank pass allowed, then backdoor system
3.  continue scanning

_Fun indeed!_
