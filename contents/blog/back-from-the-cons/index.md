---
title: Back From The Cons
author: pagvac
date: Mon, 10 Nov 2008 10:05:21 GMT
template: post.pug
category: fucked
---

It's been a crazy month, so much going on! I had the pleasure of presenting my updated [Cracking into embedded devices](http://sites.google.com/a/gnucitizen.org/lab/presentations) presentation at [Hack.lu](http://wiki.hack.lu/) (Luxembourg) and [Hack in the Box](http://conference.hackinthebox.org/hitbsecconf2008kl/) (Malaysia). I also had to give a talk on PCI DSS in London, which was a challenge as PCI DSS is not the most fun topic for me, trust me!

The best thing about assisting these kind of events is the technical discussions and exchange of ideas with not just other presenters but also attendees. It's amazing the quality of talent you find at hacker/security conferences which always remind us that there is always someone out there who knows more than we do.

### New SonicWALL Vulnerability

At HITB, I released the details of the [universal website hijacking vulnerability](/blog/new-technique-to-perform-universal-website-hijacking/) which affects most (perhaps all?) SonicWall firewalls running firmware `SonicOS Enhanced <4.0.1.1`. In short, if you have a SonicWall appliance running firmware older than `4.0.1.1`, _any website that you're browsing can be hijacked_ by third-party sites while you're browsing the web. Think of the contents of your Gmail inbox or address book being sent somewhere else while you're browsing the web.

It turns out that this technique is not brand new as I thought. Somehow, I couldn't find earlier examples of this technique. So while this type of vulnerability is not that popular, there was a [similar example](http://lists.virus.org/sec-adv-0305/msg00106.html) published five years ago. Funny enough, I used to follow infohacking.com's (site not up anymore) research, but couldn't remember their Microsoft ISA finding. In their original advisory, they referred to the finding as a MiTM XSS. If you go through my [Universal Website Hijacking by Exploiting Firewall Content Filtering Features](http://lab.gnucitizen.org/research-papers) paper, you'll understand why.

From the paper:

> The technique discussed in this paper demonstrates how any website can be hijacked without relying on a cross-domain vulnerability present on the targeted site or client-side software present on the victim's computer. Instead, the attacker exploits a vulnerability on the firewall/proxy appliance in charge of "protecting" the victim user. Furthermore, the cross-domain vulnerability discussed in this paper is of universal nature, which means that any website can be hijacked as long as the victim user's connection is "protected" by a firewall appliance of the affected vendor in question.

### Fave presentations

I must admit I couldn't see all presentations at Hack.lu and Hack in the Box. However, from what I saw, my favorites at Hack.lu were the [SS7 talk](http://wiki.hack.lu/index.php/List#Philippe_Langlois) by Philippe Langlois and [Browser Exploits](http://wiki.hack.lu/index.php/List#Saumil_Shah) by Saumil Shah. While at HITB, the [Pirate Bay](http://conference.hackinthebox.org/hitbsecconf2008kl/?page_id=199) talk by its very founders, and [How to Build Your Own Password Cracker with a Disassembler and a Little VM Magic](http://conference.hackinthebox.org/hitbsecconf2008kl/?page_id=215) by Matthew Geiger were some of the best in my opinion.

Philippe Langlois discussed the evolution of phreaking and argued that manipulating [SS7](http://www.tech-faq.com/ss7.shtml) and SS7 over IP (SIGTRAN) are the closest thing to the blue box we have in modern telephone networks. No matter what telephony technology we use, SS7 is always functioning behind the scenes in the backbone of the PSTN. SS7 is in charge of very-interesting functionalities such as routing, sms and even billing. Therefore, learning how to manipulate the SS7 protocol suite is essential for telephone hackers.

Saumil Shah talked about the current landscape of browser exploitations, and how despite new browser techniques by Sotirov , heap spray exploitation still works like a charm and isn't stopped by protections such as ASLR, DEP, NX, GS, etc ...

As for the Pirate Bay guys, well, awesome and very entertaining presentation. I recommend watching the video which is [online](http://www.idg.se/2.1085/1.188905). It's amazing the number of stories these guys have to tell, regarding media companies trying to stop them. These includes all sorts of dirty tricks including DDoSing their infrastructure.

Matthew Geiger talked about several aspects of the computer forensics field, including restrictions that the law imposes on forensics professionals that make their work even harder. However, it was his demo which I liked the best (I love demos). He showed how to make a homegrown password cracker for the TrueCrypt boot loader password prompt. In short, he virtualized the disk using Live View, and patched the TrueCrypt binary in charge of asking for the boot password using IDA Pro. Finally redirected a wordlist with all passwords to try to the patched binary. The patch is only a change in one byte of the binary which allows us to try as many passwords as we need, rather than a maximum of three. The patch allows us to never increase the counter in charge of tracking how many password have been attempted by inserting a NOP (0x90).

Finally, I was a bit disappointed by Kris Kaspersky's presentation on remote code execution by exploiting CPU bugs. Although to me this was supposed to be one of the hottest talks, there was no details or demo given as part of the presentation. After talking to a few members of the audience, it seems that I'm not the only one who was more confused about the topic after the presentation rather than before. Don't get me wrong, the topic is **super interesting**, but the presentation was somehow confusing, and the material was hard to understand since no details were given. I think that when a topic that is so rare to most people is presented, giving details and a demonstration is crucial for the audience to grasp the core of the research.
