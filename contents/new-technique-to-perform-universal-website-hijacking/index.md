---
title: New Technique To Perform Universal Website Hijacking
author: adrian-pastor
date: Sat, 20 Sep 2008 14:56:05 GMT
template: this/views/post.jade
---

I'm really excited that [HITBSecConf2008 Malaysia](http://conference.hackinthebox.org/hitbsecconf2008kl/) is coming up soon: end of October to be precise. I highly recommend our readers to attend such event, as it's organized by one of the finest security event crews I have ever dealt with. There are tons of talks I want to attend, which I will cover in another post. The GNUCITIZEN team would like to thank the Hack in the Box (HITB) staff for inviting us to the Malaysia edition of the conference, making this the second time pdp and I will speak at HITBSecConf. The HITBSecConf crew includes Dhillon, [geek00l](http://geek00l.blogspot.com/), [spoonfork](http://mel.icious.net/), Belinda, Prabu, [ruFI0](http://geeks.serverfreak.biz/rufi0/blog/) and Amy among others. Thank you guys, we're really humbled by your invitation.

I will be delivering the updated version of my [Cracking into Embedded Devices and Beyond!](http://conference.hackinthebox.org/hitbsecconf2008kl/?page_id=186) presentation, which will include a quite special - i.e.: unusual - 0day vulnerability which I have successfully reported via [Zero Day Initiative](http://www.zerodayinitiative.com/).

## The 0day Vuln

Well, I cannot give full details on the vulnerability at this moment, due to ZDI's advisory not being published yet. I'm planning to release the full details for the first time on [30th October](http://conference.hackinthebox.org/hitbsecconf2008kl/agenda.htm) at HITBSecConf2008 Malaysia. However, there are a few things I can tell you for the moment being. First of all, the affected system is an embedded device, which is quite obvious by reading the name of my presentation. More precisely, the vulnerability affects appliances of a well-known firewall vendor.

Usually, web cross-domain vulnerabilities, affect either a server-side service/application, or client-side software. For instance, we might have a cross-domain vulnerability on the target site itself (i.e.: XSS/HTML injection), or on a client-side component present on the victim's user component. i.e.: web browser itself or web browser plugin. In the case of my finding however, the targeted website can still be hijacked even if the site is NOT vulnerable to XSS, and even if the client-side software on the victim's computer is not vulnerable to any cross-domain vulnerability.

In this case, the attacker exploits a vulnerability which doesn't affect the targeted website, nor the software installed on the victim user's computer. Instead, the attacker exploits a vulnerability on the firewall appliance in charge of "protecting" the corporate user. Additionally, the cross-domain vulnerability is of _universal_ nature, which means that any website can be hijacked as long as the victim user's connection is "protected" by a firewall appliance of the affected vendor in question.

In summary, by exploiting this vulnerability the attacker:

* can hijack ANY website. i.e.: steal session IDs, inject non-legitimate HTML content, and other evil goodness
* doesn't need to find any XSS on the website he/she wants to hijack
* doesn't need to find any vulnerability on software present on the victim user's computer

There is virtually nothing the victim user can do to protect against this attack if his/her connection is "protected" by a firewall appliance affected by this vulnerability. There are other factors that make this vulnerability quite special, but as I said, I can't give too many details for now. All in all, this finding is a good reminder that our online security not only depends on end-point systems such as the client and server that have established a connection, but also all the hops/devices in between!
