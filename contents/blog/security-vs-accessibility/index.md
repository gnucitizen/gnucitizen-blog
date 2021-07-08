---
title: Security vs. Accessibility
author: pdp
date: Sat, 26 Aug 2006 01:19:27 GMT
template: post.pug
---

A lot of [noise](http://digg.com/security/A_CSS_Hack_to_steal_your_browser_history_in_Firefox) has been generated around the [CSS History Hack](/blog/javascript-visited-link-scanner). Some people are skeptical about it and think that it can be fixed by installing the latest Firefox version. Others believe that IE is not effected. Unfortunately both groups are wrong.

The problem with the CSS History Hack is that malicious JavaScript code that silently dumps your history is not malicious at all. The code makes use of a feature which has never been designed with security in mind and it effects everything that supports CSS and DOM. Removing this feature will cause a lot of accessibility problems. The same applies to many other techniques that recently have been [dev](/blog/javascript-port-scanner)-[elo](/blog/javascript-address-info)-[ped](/blog/javascript-authorization-forcer).

Internet and mainly World Wide Web is designed to be accessible. Many different technologies need to work with each other in a transparent way. The user is the center of the universe and providing better environment for this center makes in theory more money for the service provider. All this leads to less security. A truly secure browser will ask you to approve everything it does, from launching popup window to executing a tiny chunk of code. However, this never will happen. Clicking on thousands of alert boxes is far from what most of the users call fun. If you enforce it you better be prepared to loose a lot of users.

_Security vs. accessibility - one of the very well known dilemmas we encounter every day._
