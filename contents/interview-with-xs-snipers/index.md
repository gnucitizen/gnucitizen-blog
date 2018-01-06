---
title: Interview With XS-Snipers
author: mario-heiderich
date: Fri, 27 Jul 2007 14:59:24 GMT
template: this/views/post.jade
---

> Here's some Q&A from some of the researchers of the [exploit issues](/blog/u-r-insecure-how-URI-exploits-are-changing-the-webappsec-landscape) I recently had a phone conference with - thanks for the time and the quality talk, Billy and Nate.

## Q: How did you discover the potential of URI handler research?

Billy was eating a peanut butter and jelly sandwich and a big glob of peanut butter fell on the keyboard and typed res:// and pushed enter into his IE window. No, seriously, Rios discovered some interesting stuff with the res:// URI, shortly there after I discovered some articles around the ms-its:// URI and figured this may be an avenue of attack.  I did some research on IANA registered URI's, then found a way to query the Windows registry to determine all registered URI's and the commands that are run when they are accessed by a browser (this was later turned into the DUH tool  by [Erik Cabetas](http://erik.cabetas.com/?p=stuff). Shortly there after, I discovered the [Trillian AIM stack overflow flaw](http://www.xs-sniper.com/nmcfeters/Cross-App-Scripting-2.html) and Rios discovered the Integer overflow in res:// (MS07-035) and we knew we were on to something hot. Around this time Rios  and Thor discovered the FirefoxURL command injection and Rios and I got busy putting together a string of command injection attacks. We [found one](http://www.xs-sniper.com/nmcfeters/Cross-App-Scripting-2.html) in Trillian exploitable thru the IE browser, the [navigatorurl flaw](http://secunia.com/advisories/26082/) exploitable thru IE, and the list goes on and on (see below).

## Q: what testing methods did you use?

The primary point was the research around what URI's existed... we had some other methods, using regmon and filemon that we'll hopefully detail in full at BH Japan or another conference this year.  Additionally, Rios's use of
filemon to see what files were getting accessed was key to the successful exploitations around this issue.

## Q: where do you see the greatest danger in the discovered issues?

The attack surface really.  I mean, that's what XSS is all about... a persistent one, you post it in one place the attack hits everyone, but now, instead of stealing someone's cookies we're running arbitrary coammnds on
their machine. Additionally, we keep saying this is just the tip of the iceberg.  Right now everyone is focued on preventing these command injections, but the real flaws will be exposed in the functionality that the
applications tied to these URIs expose.

## Q: what's you disclosure ethics regarding issues with impact that high?

Constantly changing... we've had some difficulty with this. We've encountered several headaches when attempting to disclose directly to the Vendors including the recent PR war... additionally, we've encountered
headaches when trying to disclose to vulnerability puchase programs.... which I won't get into at this time.  Finally, when Rios released the MS07-035 we heard a lot of complaints from the community about us sitting on
the vulnerability and not reporting it to people since it had been around so long.  I think it's a lose, lose, lose situation at times.

Full disclosure allows for the fastest reponse time, keeping the exploitation window small. It allows corporations to take measures to protect themselves before the patch is released, especially when released in conjunction with temporary fixes such as noscript sigs, php ids sigs, and user controllable fixes (like modifying the registry in our case).

## Q: what's next on the road map?

Attacking other browsers and other platforms... there's also a few methods of obfuscating these attacks that may be useful, and of course we have the aforementioned attacks against the functionality exposed by these URIs. Rios's presentation on anti-DNS pinning within the Java Virtual Machine (which will hopefully take place at BH Japan,etc.) scares me terribly.  This dangling pointers issue at BH this year is causing a big stir.

Here is our discovered vulnerabilities in several URI's. The first portion is really the main one that is due to browsers not properly sanitizing data, the others result from the backing applications not properly sanitizing data or on the backing applications functionality.

### Command Injection Flaws due to browsers not properly sanitizing data:

* mailto, news, snews, nntp, telnet - [http://xs-sniper.com/blog/remote-command-exec-firefox-2005/](http://xs-sniper.com/blog/remote-command-exec-firefox-2005/)
* aim - [http://secunia.com/advisories/26086/](http://secunia.com/advisories/26086/)
* firefoxurl - [http://secunia.com/advisories/25984/](http://secunia.com/advisories/25984/)
* navigatorurl - [http://secunia.com/advisories/26082/](http://secunia.com/advisories/26082/)

### Overflow Conditions due to applications not properly sanitizing data:

* aim - [http://secunia.com/advisories/26086/](http://secunia.com/advisories/26086/)
* res - [http://www.microsoft.com/technet/security/Bulletin/MS07-035.mspx](http://www.microsoft.com/technet/security/Bulletin/MS07-035.mspx)

### Local Program Enumeration in IE7:

* res - [http://xs-sniper.com/blog/2007/07/20/more-uri-stuff-ies-resouce-uri/](http://xs-sniper.com/blog/2007/07/20/more-uri-stuff-ies-resouce-uri/)

### Local Program Enumeration in Firefox:

* resource - [http://ha.ckers.org/blog/20070516/read-firefox-settings-poc/#comment-35888](http://ha.ckers.org/blog/20070516/read-firefox-settings-poc/#comment-35888)

### Functionality Abuse on Firefox:

* data - [http://www.xs-sniper.com/nmcfeters/Data-Phishing.html](http://www.xs-sniper.com/nmcfeters/Data-Phishing.html)
