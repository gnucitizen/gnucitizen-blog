---
title: ASX Plus ClickOnce - Dangerous Combination
author: petko-d-petkov
date: Mon, 05 Nov 2007 12:52:02 GMT
template: post.jade
---

Over the last couple of days there was a surge of stories related to the recent drive-by-download malware attacks against Macs and PCs. The attacks are nothing more but social engineering attempts which try to trick the victim into installing the malicious program on the victims' machines. This approach is very simple but, as you can see, quite effective. In this post I would like to draw your attention on a variation of these types of attacks which work for Windows environments with Microsoft Media Player 9 or earlier and .NET 2 or later installed.

Do you remember back in the days when attackers were spreading malware as part of fake Windows IE patches attached to simple emails? These attacks were very successful and they have evolved since then. Today, you are more likely to see them as part of sites which offer you free games, free software, or ask you to upgrade to the latest version of a particular product. Sometimes, they ask you to enhance your default video player with some additional plugins, as it is the case with the recent Mac attacks. If you don't do that, then you cannot see the video. It is a simple as that.

Video formats are very powerful tools in the hands of not that skilled but dedicated attackers. Simply put, people like watching videos. I've talked about video format attacks before (QTL, MOV, MPGs, etc, etc, etc) and in particular covered the [ASX file format](/blog/backdooring-windows-media-files) and the dangerous applications it can be used for. Having my previous posts in mind, I would like to quickly draw your attention on how attackers can combine ASX files with something like .NET ClickOnce and come up with a very believable attack which will work. But first, let's see what ClickOnce is. From [Wikipedia](http://en.wikipedia.org/wiki/ClickOnce):

> ClickOnce is a Microsoft technology for deploying Windows Forms or Windows Presentation Foundation-based software, also called Smart clients. ClickOnce is only available in .NET 2.0 and later. A less advanced technique can be obtained with the Microsoft Updater Application Block. It is similar to Java Web Start for the Java Platform.

I guess most of you already know where I am going with this post. I mentioned before that the ASX file format allows you to embed HTML pages within the video. These pages are known as `HTMLView`. When the victim opens the ASX file, Microsoft Windows Media Player will download the `HTMLView` page and load it within the player's chrome. At that point the victim will be presented with a screen which informs that there was a problem with previewing the video and they must allow Media Player to go and look for the plugin that is required. When the victim approves the action, a Microsoft ClickOnce application is launched. Due to the fact that these applications have very Microsoft-ish installation window and require only one action to get installed, the victim will be tricked into allowing the setup to continue. After all, Windows does prompt you very often when you want to install unsigned drivers or simply allow application to get off your personal Firewall. So, users are used to these kind of messages.

Once the application is installed the attacker will have the desired access on that system. There are some additional steps that needs to be performed in order to make the attack as smooth as possible but I will keep these private for now. Nevertheless, you should be able to get the point. Check out the [POC](http://www.gnucitizen.org/static/blog/2007/11/clickonce-poc.asx) which provides you with a very basic idea of how the attack works. The POC is very rough, I must say, but it is enough to illustrate the problem in its most basic form.

_This type of attacks are by far the simplest. They simply do not require any sort of technical expertise. Nevertheless, you should not take them lightly. Simple things like this do work and it is part of GNUCITIZEN ideology to start open discussion on their potential impact. Just keep them in mind next time._