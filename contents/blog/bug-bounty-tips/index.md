---
title: Bug Bounty Tips
author: pdp
date: Sun, 7 Jul 2019 19:01:00 GMT
template: post.jade
---

Perhaps the reason you are not finding vulns/bugs is either because your environment is not setup correctly or your methodology requires improvements. Here are a number of tips to help you with that #bugbountytips

0. Pivot between multiple exit nodes. Some services apply ACL rules so you will never be able to reach them from your home broadband. Use AWS C9 ;)

1. If you use separate profiles for Chrome you are doing it wrong. You will be wrestling the browser and the target application at the same time. Don't do this. Use `pown cdb launch -t` or `pown cdb launch -t -P auto` to launch chrome with a pentest-friendly configuration.

2. Don't stick to the scope. You need to have a bird-eye view to understand how things work. Don't hack but do take out of scope targets for consideration.

3. You will be as good as your tools. If all you do is Burp, ZAP and the likes you will find the same bugs as your peers. You need to understand that all tools have their own intricacies and you will miss things if you stick to one method only. Diversify!

4. Automate as much as you can. Sometimes you are lucky and you get a small window of an opportunity. I will let you know about one such bug once it gets triaged - but let's say that it appears I had only a window of a couple of hours to find it.

5. Either you do surface scans or deep dives. Don't do both at the same time. You will get lost and you will miss things. I've done this mistake myself many times.

6. Read old reports. The older they are the better. Everyone is looking at the most recent hactivity reports and will follow the same trails. Some of the coolest research you will hear about at BH this year is based on papers written in 2006.

7. Have a methodology. When I was pentesting for a boutique consultancy company in London I learned to use a well-developed methodology which I initially hated. I still consider it one of the best methodologies I have ever encountered. Develop your own.

8. Take your time. Tomorrow you will have better ideas. It hurts when you don't find anything but this is part of the creative process. I don't call it a failure, I call it iteration.

9. Don't obsess about making the perfect system. Far too many people, including myself, try to make the perfect recon or the perfect automated scanning infrastructure, etc. If other people have built it, capitalize on their work. Solve the unsolved problems.

This is what I have on the top of my head. I hope it helps.

https://twitter.com/pdp/status/1147928550307258368
