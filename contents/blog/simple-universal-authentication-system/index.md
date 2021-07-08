---
title: Simple Universal Authentication System
author: pdp
date: Wed, 24 Sep 2008 20:29:21 GMT
template: post.pug
---

This idea is perhaps stupid. Nevertheless, I rather document it here for good than not documenting it at all.

Here is the story. I had to reset the credentials of an online account I have. As usual, I went on the vendors' site, clicked the forgotten password feature, typed my email address and clicked "submit". A moment later an email arrived in my inbox with instructions how to reset the password. Additionally, inside the email there was a link with a token which I had to click on in order to perform the necessary actions required to reset my account.

> I am so used to this routine that I no longer think when performing it. It takes me virtually 20 seconds to get my account back.

It is not a secret that once an attacker has access to an inbox, s/he can easily obtain access to other sites/applications the victim has registered with the compromised email. However, what if we turn this well know principle to solve a quite rudimentary and very old problem - authenticating on the Web.

Let me explain. Technically speaking your inbox is an universal authentication system. Mail and HTTP are so tight nowadays that they cannot function normally without each other. We use SMTP to reset forgotten password credentials, which basically works like this: we receive a one-time password (in the form of a link with a token), which we use to create a username/password pair. Alright then. Instead of going through the a middle man (your username/password pair) why don't we use the password reset mechanism to authenticate with the any web enabled system?

It will work like this. First, when you signup you just type your email address, nothing more. You receive an email with a link to login. You login and you do your thing then you log out. At some point in the future you decide to come back to the system. You type your email address again and you receive another link in your inbox to login.

## Limitations and Security Implications

I started this post by saying that this is merely an idea and I wont recommend it to anyone at this stage, although if implemented correctly, the solution may actually work. There are many things that needs to be considered. First, tokens have to be expired once they are used. Second, we need some kind of self-destruct feature in order to prevent authentication spam. 3rd, it wont be obvious when one of your accounts is compromised. Today, if one of your accounts is compromised via password reset you can detect that something wrong is going on due to the fact that you cannot login normally anymore. However, this only have implications in the long term.

## Some Benefits on the Top of my Head

Well, it is trivial to implement very strong authentication systems on the top of this framework. PKI is what comes to mind. Imagine the following. When the application authenticates with you, you receive the message encrypted with your public key. The only way to read it is to have your private key at hand and this is much better way of authenticating then using simplistic and prone to failure username/password-based authentication mechanisms.

## Some Words About Accessibility

Obviously, this approach is not very convenient. However, the process can be abstracted to the extend where the user doesn't have to do or know anything. Of course, security might be an issue.

There you have it.
