---
title: Attack Of The URL Vulnerabilities
author: pdp
date: Wed, 25 Jul 2007 09:51:28 GMT
template: post.pug
---

I think that it is getting worse. [Billy Rios](http://xs-sniper.com/blog/) has discovered another critical Firefox issue related to the infamous bugs that has been recently discussed on multiple blogs including [GC](/blog/firefox-could-also-be-used-as-the-entry-point) (us), [Thor Larholm](http://larholm.com/2007/07/18/firefox-fixes-internet-explorer-flaw/)'s blog, [Mozilla's Security Blog](http://blog.mozilla.com/security/2007/07/23/related-security-issue-in-url-protocol-handling-on-windows/), the [0x000000](http://www.0x000000.com/?i=401) hack zine and [Billy (BK) Rios](http://xs-sniper.com/blog/2007/07/24/remote-command-execution-in-firefox-2005/)' personal blog. This time, the bug is extremely dangerous. Fortunately, the issue was fixed in the 2.0.0.6 release candidate.

Billy (BK) Rios comments:

> These examples were created for WinXP SP2 with no external mail programs installed (outlook, notes, etc). If you have an external mail program installed, these examples may not work on your machine (as the URI handling may have changed).

> Once again, a flaw in the URI handling behavior allows for remote command execution. UNREGISTER ALL UNNECESSARY URIs NOW! This example shows flaws in Firefox, Netscape, and Mozilla browsers - other browsers are affected by related vulnerabilities.

> Developers who intend to (or have already) registered URIs for their applications MUST UNDERSTAND that registering a URI handler exponentially increases the attack surface for that application. Please review your registered URI handling mechanisms and audit the functionality called by those URIs.

The bug is within mailto, nntp, news and snews protocol handlers. Here is a harmless demonstration of the issue: [danger do not click!](mailto:%00%00../../../../../../windows/system32/cmd).

_It seams like there is a huge interest in URL bug hunting. This is good. At least, we are going to get it right this time. Progressive security!_
