---
title: GIFARs and Other Issues
author: petko-d-petkov
date: Sun, 03 Aug 2008 15:20:11 GMT
template: post.jade
---

A lot of people have asked me (especially reporters) about the GIFAR attack since it resembles what I have already spoken about [here](/blog/java-jar-attacks-and-features/) and presented at the [last Black Hat in Amsterdam](/blog/black-hat-europe-2008/). So, I decided to shed some light without being too revealing as the talk, which will demonstrate and explains the attack in more details, will give away the awesome stuff.

So yes, the whole notion of combining JAR files with other types of files is not new. It is really old and it is just enough to google about how to hide ZIP (which is basically JAR) behind JPG images. I've discussed the subject on several conferences in the past and I've gave away some pointers why this is dangerous. Now you can read [my paper](/blog/black-hat-europe-2008/) which explains why this is so, but for those of you who don't want to go through 20 pages of material here is the summary:

> The combination is dangerous because it breaks the browser security model in a way. Think about it as an advance form of persistent Cross-site Scripting Attack. It is not just XSS but also a **Socket monster** as the JVM will allow us spawn sockets too.

So maybe yes, the issue is not new but what will be presented at Black Hat, and this is why you should attend this talk, is something different. The XS-Sniper crew (if I can call them that way :)) will present a technique in which they managed to get around certain restrictions/limitations when exploiting the Google platform in particular. This puts the attack into a very different perspective and this is what I am interested to learn about.

John Heasman, a profound Java-ninja master, has also [commented](http://heasman.blogspot.com/2008/08/on-gifars.html) regarding the attack vector and its implementation.
