---
title: Flash UPnP Attack FAQ
author: pdp
date: Mon, 14 Jan 2008 20:20:02 GMT
template: post.jade
category: fucked
---

There are loads of misconceptions and confusion regarding the Flash UPnP Attack that was discussed over [here](/blog/hacking-the-interwebs). Therefore, it is probably a good idea to shed some light on the matter, since I don't want to leave people with the wrong impression. If the majority of people still don't get it after this post, then that will mean that we have failed and we shouldn't have published the research.

### What does the Flash UPnP hack consist of?

When the victim opens a malicious SWF file, or a page that embeds one (think about ad networks, etc), a 4 (could be less or slightly more) step ATTACK will silently execute in the background, upon which the attacker will have control over the victim's router, pretty much regardless of its model.

### Q: Does the attack rely on any vulnerabilities within Flash?

**No!** The attack is based on the `navigateToURL` function and the `URLRequest` object. Both of them are used as described in the Flash ActionScript specifications.

### Q: Does the Flash UPnP Attack depend on certain browser type and/or version?

**No!** The attack is possible because of Flash not because of the underlaying browser!

### Q: Does the Flash UPnP Attack depend on certain Operating System type and/or version?

**No!** Flash is cross-platformed. The attack will work wherever Flash works.

### Q: The Demo does not work with the most recent version of Flash Player, right?

**No!** It does work!

### Q: Nevertheless, UPnP is useless, right?

**No!** UPnP is quite serious business and hacking it often leads to a catastrophic effect. The following is possible with UPnP:

* portforward internal services (ports) to the router external facing side (a.k.a poking holes into your firewall and/or network)
* portforward the router web administration interface to the external facing side.
* port forwarding to any **external** server located on the Internet, effectively turning your router into a zombie: the attacker can attack an Internet host via your router, thus hiding their IP address (not all routers are affected by this, but most are)
* change the DNS server settings so that next time when the victim visits bank.com, they actually end up on evil.com mascaraed as bank.com
* change the DNS server settings so that the next time when the victim updates theirs favorite Firefox extensions, they will end up downloading evil code from evil.com which will root their system.
* reset/change the administrative credentials
* reset/change the PPP settings
* reset/change the IP settings for all interfaces
* reset/change the WiFi settings
* terminate the connection
* etc.

And these are just a small portion of the things you can do over UPnP.

### Q: Nevertheless, UPnP is secure. The user will be prompted with a Basic Authentication prompt, right?

**No!** UPnP specifications do not provide any standard for authentication. Therefore, everyone can do these changes without any restrictions.

### Q: Is UPnP turned on by default?

**Yes!** UPnP is turned on by default on most, if not all devices. Otherwise, things like MSN and Skype realtime audio and video, P2P (Peer-to-Peer) software like Emule, games of all kinds and bunch of other things wont work unless the user manually makes changes in her router's configuration. Due to the fact that the average user is not a System Administrator, UPnP is enabled by default in order to make the magic working behind the screen.

### Q: Can I turn UPnP off?

**Yes!** Please consult with the manual provided by your router manufacturer. It is a good idea to consider the inconveniences that this change may cause you. **Remember: there are no perfect things! It is all about keeping the balance.**

### Q: Is it just my router that supports UPnP?

**No!** Many types of devices support the UPnP protocol: Cameras, Printers, Mobile Phones (yes my mobile has UPnP capabilities), Digital Entertainment Systems, etc.

### Q: Is it possible to hack into other UPnP enabled devices with the Flash UPnP Attack?

**Yes!** It is possible to hack into any UPnP enabled device as long as the UPnP control point is delivered over HTTP. HTTPU (HTTP over UDP) UPnP implementations are not vulnerable due to the fact that Flash does not support the UDP transport protocol.

### Q: Am I safe if my UPnP device handles only HTTPU?

**No!** You still need to consider the risk that someone can send arbitrary UDP requests to the UPnP control point. Remember, UPnP does not have any authentication or authorization facilities!

### Q: Am I safe if I disable/uninstall Flash?

Although I am not aware of any other method for achieving the same effect, it is very likely that the same attack can be performed by other types of Web technologies.

### Q: Why did you publish the research?

We hope that by exposing this information, we will drastically improve the situation for the better future. I think that this is a lot better than keeping it for ourselves or risking it all by given the criminals the opportunity to have in possession a secret which no one else is aware of.

### Q: Why didn't you contact the vendor?

What vendor? Who? There are so many device manufacturers that it is highly unfeasible to contact each one individually. Regarding Adobe, well..., they haven't done anything wrong either. So, I don't think that you should blame them.

### Q: How would you rate the issue?

**HIGHLY SEVERE**! Turn UPnP off!

<div class="message">_I am planning to keep this post up-to-date as new question/misconceptions/confusions emerge._</div>
