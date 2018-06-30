---
title: Thoughts on the Certificate Authority Attack presented at CCC
author: pdp
date: Wed, 31 Dec 2008 11:02:05 GMT
template: post.jade
---

It [turns out](http://events.ccc.de/congress/2008/Fahrplan/events/3023.en.html) that the group of international researchers have created their own legitimate CA ([Certificate Authority](http://en.wikipedia.org/wiki/Certificate_Authority)) which can be used to sign any other cert they want and as such increase the likelihood of success when performing SSL man-in-the-middle types of attacks.

It is pointless to explain how the attack works. Go over the presentation slides or get the video/audio. What I would like to do is to present some of my thoughts regarding the attack and its impact. So here they are:

* **The attack is impressive!** Mostly the cryptographic bit. Yes, it has been known that MD5 is weak since 2005 but cracking it with a cluster of 200 PS3s in 2008 still sounds like a lot of fun.
* **The attack targets a single certificate authority!** That is RapidSSL. Although the attack relates to the idea that every CA which uses MD5 is vulnerable, in reality the attack is possible because RapidSSL's signing process is flawed. As such, this is a vendor specific attack.</il>
* **Although MD5 is weak, the CA under attack may not be!** Keep in mind that the team predicts the serial number. In the case of RapidSSL the serial number is sequential and therefore predictable. However, that may not be necessarily true for other CAs. Not to mention that RapidSSL can easily fix their flawed process by just making the serial number unpredictable and therefore breaking this particular attack entirely.
* **The attack is expensive!** It really is. I think that, moneywise,  it might be better to just buy yourself the certificate from an insider that works for a CA. It sounds a lot simpler and realistic. In my experience the bad guys often choose the simplest possible way to achieve their goals.

### How do we Fix the Mess

First of all, CAs should start improving their signing process and also switch to SHA-1. At the moment SHA-1 is considered as one of the best hashing algorithms. The switch may take a few years to complete. Second, the CAs, the security community and the academic researchers should come together to improve PKI in a way that it is easier to migrate to a different hashing algorithm in the future if needed. We might just need a simple change in the standard and in the way we process the chain of trust. Finally, it is important that all software products that make use of SSL keep signatures of the certificates the user encounters. This may not only solve the current problem to an extend but it may also improve the situation with SSL man-in-the-middle types of attacks in general.

In conclusion: yet again, a system is as secure as the weakest link. In the case of PKI, the chain of trust is as secure/trustworthy as the weakest certificate authority.
