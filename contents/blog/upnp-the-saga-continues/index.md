---
title: UPnP The Saga Continues
author: pdp
date: Sun, 20 Jan 2008 20:35:27 GMT
template: post.pug
---

This post is a quick introduction to some other UPnP related issues. Yes, we have been targeting UPnP in the last couple of weeks mainly because is a big problem many people have forgotten or don't know about.

We've already [covered](/blog/hacking-with-upnp-universal-plug-and-play) what UPnP is and how it works in most basic form. We've also [showed](/blog/bt-home-flub-pwnin-the-bt-home-hub-5) how it can be exploited with nothing more but a simple XSS on your home router. Then we've [improved](/blog/hacking-the-interwebs) upon our techniques with the so-called [Flash UPnP hack](/blog/flash-upnp-attack-faq). But what we have deliberately left out from the picture is that, in many cases, UPnP is remotely exploitable without interaction required from the victim and all the attackers need to know is the IP address of the exploitable device. DUH!

In the course of the past several weeks we've been exploring Google through the [Google Hacking Database](http://johnny.ihackstuff.com/ghdb.php) and the [Johnny.Ihackstuff.Com Forums](http://johnny.ihackstuff.com/forums/). With their help we manged to discover hundreds of devices that are visible on the Web and can be accessed to from the browser. After countless of hours in research, we manged to find the locations of the UPnP description files and from there the UPnP control points which can be exploited with one-shot attack from the comfort of the attacker's chair. "Is that good?" Not good at all.

Why on first place these devices are indexed by Google? And why on earth someone would allow UPnP across the Web? We have some ideas why the situation is so. First of all, we believe that some IP addresses have been used for hosting legitimate sites which Google and other Search Engines have indexed successfully. Then these IP addresses has been put back into rotation for DSL users. Due to the fact that the devices hooked on these IP addresses listen on any HTTP port, Google and friends have continued spidering their services. And this is pretty much the reason why they are there. However, it is more interesting to know why they allow communication on HTTP ports which are UPnP enabled. This unfortunately can be explained with the following: **Bad Administration and lack of understandings!**

So there you go! Try it yourself and you will see that the number of devices that export UPnP services across the Web is pretty high. It is a matter of visiting the Google Hacking Database or the Forums in order to get lists, and also to find out the locations of the UPnP descriptions. And form that point on the possibilities are endless.

_It shouldn't be that simple! This is another reason to verify that UPnP is switched off!_
