---
title: Hidden
author: pdp
date: Tue, 08 Apr 2008 08:56:27 GMT
template: post.jade
---

Here is the story. The other day I was messing with some crypto. After going through some pretty interesting stuff, I've suddenly realized something which is very, very obvious when you think about it. Indeed, obvious and simple things are harder to grasp. It is a paradox, I know.

It is again another case of using security technologies for criminal purposes. Let's take HTTPs as an example. When attacking a Web server, HTTPs is the attacker's best friend because it could potentially bypasses whatever security appliances the victim might have in between (IDS, IPS, etc). I am not saying that this is universal but it works very often. In simple words, because the traffic is encrypted, the security appliance wont be able to understand what the encrypted channel holds and as such wont do anything if an attack is launched against the destination server. This is an example of a security technology which is designed to prevent attacks but at the same time turns to be a huge advantage in the wrong hands.

Ok this is boring. Let's think about SPAM and Drive by Download attacks. SPAM - harder but not impossible. Google does an excellent job to remove spam from my mail box. But what if the SPAM is encrypted? There is no way you can tell whether the message inside is worth something. Not to mention that emails and public keys which are required to encrypt the message and send it to the right people, are two types of information which are available online for free. There are many Public Key Servers which attackers/spammers can use.

If I was a malware author I would probably aim to infect key resources which could give me enough power later. I would target Corporations, Businesses, Organizations etc. I could use them for [Black PR](http://www.spinhunters.org), whatever. So I would go, query PKI Servers and download emails addresses plus their associated public keys. Some companies have their own PKIs visible on the Internet. Then I would send the malware but encrypt it with the individual public keys for each email. Add a catchy title and a fake email address. Submit those to the targets and wait until the crops are ready. Then harvest. Sure, such emails will pass through mail filters as they seem to be valuable for the business and at the same time impossible to read. There you go, now you have a mechanism to break into companies in large scale attacks.

The conclusion is: encryption is good, encryption is bad.

> The information security industry has built its reputation and the top of fear. Anyone who has been long enough in this field knows that any network, any appliance is hackable given enough time and a good opportunity. Therefore, buying fragmented, modularized, and very generic security tests is bogus. It wont work. You cannot go to the doctor and ask for a list of every possible decease that can happen to you. Companies who are interested in knowing about their security should specify clear objectives which needs to completed by the tiger team by any means necessary. "How can someone reach that data? How can someone steel money?" These are the types of questions you should ask, not things like: "Find me all security issues affecting my business!" It won't work for you no matter which way you look at it.
