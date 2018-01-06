---
title: OpenID Provides A Better Security Model
author: petko-d-petkov
date: Mon, 24 Mar 2008 11:23:20 GMT
template: post.jade
---

I couple of posts back I've started a conversation on what OpenID is and why it could turn a bit insecure. You can read more about this over [here](/blog/hijacking-openid-enabled-accounts/), [here](/blog/openid-a-security-story/) and [here](/blog/identity-20-security/). Today, I would like to draw your attention on why I believe that OpenID based authentication is a lot more more secure then the dispersed, decentralized, authentication model we use today.

This post is inspired by a recent discussion on [Full-Disclosure](http://seclists.org/fulldisclosure/2008/Mar/0385.html) which I vividly took part in, supporting OpenID. My sole purpose is to summarize what I have said for future reference and for the convenience of everybody who is interested. Therefore, let me start with a bit of introduction and then follow up with some of the main points of my argument.

First of all, OpenID is a very simple but rather useful technology. With OpenID you have only one account, your ID, which you can use everywhere where the OpenID technology is supported. It may not be clear whether this setup is more secure from what we have at the moment (every site forces you to register an unique username/password pair), because it all depends on on the user's intentions and how he plans to use his OpenID account, but undoubtfully it is more convenient.

Let's see how convenience works well with security when it comes to OpenID:

## Yes, and convenience is often the enemy of security.

Not always. I think complexity is the enemy of security. The simpler the system is, the less chance to screw up, the more secure it is. It is much easier to secure a single port then a class B network, don't you think?

OpenID proves to be quite simplistic by nature. The actual OpenID authentication process is not simple at all but once properly implemented it provides a very simple mechanism to identify users without the need to worry about password recovery mechanisms, account lockout, account lockout as a denial of service attack, user management, password complexity policies, secure authentication and authorization, etc. All this is handled by OpenID. Indeed, with a few lines of PHP or any other language, anyone can now implement a secure login without the hustle.

## The more you share the higher the chances for a leak to occur.

Here is an interesting and quite valid comment:

> However, with OpenID, all I have to do is figure out how to capture your credentials (which does not require that I compromise OpenID), and I can own everything that you own.  At least with the disparate systems we have now you only get those things where I've been foolish enough to use the same credentials.  Even then you have to figure out what those systems are.  With OpenID I simply try every site that uses OpenID, trivial to do programmatically.

The more you share your secrets - credit card information, usernames, passwords - the higher the chances this information to be leaked or get stolen. We've proved times and times again that people do reuse passwords. Password reuse is a huge problem and it is due to our inefficiency of memorizing partial information which is not associated with anything substantial. In psychology this is known as the process of anchoring and if you master how to anchor then you can master memorizing large sets of useless data without getting corrupted sectors in your brain. :) A good start to learn how to do that is to start reading Darren Brown's book [Trick of the Mind](http://www.amazon.com/Tricks-Mind-Derren-Brown/dp/1905026358/ref=sr_1_4?ie=UTF8&s=books&qid=1206359973&sr=1-4).

On another note, capturing OpenID credentials may be not as easy as it seems. First of all if the OpenID provider has a valid, authorized SSL certificate attackers won't be able to see when credentials are flaying around. One-time passwords in terms of keyfobs, rsa tokens, whatever, are good mechanism to prevent sniffing attacks. Even if the attacker captures these credentials he/she wont be able to use them again. It is also worth mentioning that carrying one keyfob just for your OpenID provider is a lot easer then having what they call "keyfob necklace" in order to ensure a good security for every single site/system you visit.

Second, lets say that the attacker has access to the machine or the network and he/she can sniff the cookies and as such get access to the OpenID account. Well, some OpenID providers have features where you can configure the account to automatically destroy the session cookie once an OpenID authentication is authorized. The attacker best chance is to
sniff or attack the sites where the user is logging into with OpenID but any problems associated with external systems are not problems within OpenID and they will work independently from the authorization/identification mechanism that is supported.

Think about OpenID as the equivalent of PayPal for authentication. In theory, it is more secure to pay through PayPal as you are not sharing your credit card information with everyone else but a single provider. Do you feel comfortable giving away your credit card details to every single merchant from which you want to purchase some goods? I don't!

## Trusting the OpenID provider.

If you are not happy or you don't trust any of the available OpenID providers, roll your own OpenID service. It takes 5 minutes and a couple of lines with PHP and you can make it as secure as you want. Isn't that much better then trusting every single login prompt you see?

## If your OpenID account is hacked, the attacker will be able to login as you anywhere they want.

That is a huge disadvantage! However, you can spend good time securing your OpenID to the extend it is not feasible for someone to attack it. We know that all encryption mechanisms are vulnerable to brute force attacks but is it feasible to crack them? No, not at all. Not now! Maybe when we get to personal quantum computing we might have a chance but by that time we will switch to quantum based cryptography.

_There you go! These arguments may not be enough to entirely cover the security considerations when it comes to OpenID, but I think that they are more then enough to make you try the system and come up with your own conclusions._
