---
title: Vulnerabilities in Skype
author: petko-d-petkov
date: Thu, 17 Jan 2008 21:03:04 GMT
template: post.jade
---

[Aviv](http://aviv.raffon.net/2008/01/17/SkypeCrosszoneScriptingVulnerability.aspx) has already done most of the work but I would like to add a few more notes on the recently reported [Skype Cross-site Scripting](http://seclists.org/fulldisclosure/2008/Jan/0328.html) issue. In general, the issue is pretty much underestimated. The vulnerability is not of a type Cross-site Scripting bug, but mostly a Cross-site Scripting bug on [DailyMotion](http://dailymotion.com), which results into a Cross-zone Scripting issue within Skype due to the unlocked IE controller Skype makes use of. When a given resource executes within the Local Zone context, all sorts of things are possible like, including but not only, reading/writing files from the local disc and launching executables through the WSH primitives. Which in simple words means a complete 0wnage.

The attack vector is a bit convoluted, but very much possible and quite practical. The user simply needs to visit DailyMotion via Skype's _Add video to chat_ button and stumble upon a movie which contains the Cross-site Scripting vector. This type of scenario can be achieved in several ways but I believe that the most obvious approaches would be to either social engineer the user or spam DailyMotion with hundreds of infected movies that correspond to popular keywords. Aviv pointed out Paris Hilton as an example and I believe that this is a pretty good one.

Both, Aviv and I knew about Skype's Local Zone sandbox for several months now. Yet, this is the first major vulnerability that clearly shows the dangers of Skype's model. However, there is also another attack vector, which needs to be kept in mind, although it works only in networks where the attacker can influence the communication (mitm attacks, packet injection on wifi networks, network spoofing attacks, etc.).

I noticed that parts of the Skype traffic go over unencrypted channel. After further investigation, I found out that the unencrypted packets are part of Skype's ads which are pulled on several places, some of which end up within the unrestricted IE controller. With the help of tools like [Airpwn](http://airpwn.sourceforge.net/Airpwn.html) or [Karma](http://theta44.org/karma/index.html), attackers can easily hijack ads and replace them with malicious ones. Upon rendering, a malicious code will execute within unrestricted IE controller and as such will allow the bad guys in. This type of attack is very easy to pull and it requires almost zero preparation.

_The solution: **lock the Local Zone**. I would recommend not to use Skype on any public HotSpots. Also do not use the **Add video to chat** feature until a patch is released. Keep in mind that Skype is not the only one affected by these kinds of issues._
