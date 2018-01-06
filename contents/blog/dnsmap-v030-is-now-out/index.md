---
title: Dnsmap v0.30 is now out!
author: adrian-pastor
date: Sat, 20 Feb 2010 21:08:48 GMT
template: post.jade
---

After working on [dnsmap](http://dnsmap.googlecode.com/) for a few months whenever time allowed, I decided there were enough additional goodies to make version 0.30 a new public release. Let me just say that a lot of the bugs that have been fixed, and features that have been added to this version would not be possible without the feedback from great folks such as [Borys Lacki](http://www.bothunters.pl), [Philipp Winter](http://7c0.org) and [meathive](http://kinqpinz.info). Thanks guys, your feedback was highly valuable to me.

## New Features

Anyways, the following are some of the new features included:

```
* IPv6 support
* Makefile included
* Delay option (-d) added. This is useful in cases where dnsmap is killing your bandwidth
* Ignore IPs option (-i) added. Useful for domains which cause dnsmap to produce false positives
* Changes made to make dnsmap compatible with OpenDNS
* Disclosure of internal IP addresses (RFC 1918) are reported
* Updated built-in wordlist
* Included a standalone three-letter acronym (TLA) subdomains wordlist
* Domains susceptible to [same site scripting](http://snipurl.com/etbcv) are reported
* Completion time is now displayed to the user
* Mechanism to attempt to bruteforce wildcard-enabled domains
* Unique filename containing timestamp is now created when no specific output filename is supplied by user
* Various minor bugs fixed
```

For those who have never used dnsmap, dnsmap is a command line tool originally released in 2006 which helps discover target subdomains and IP ranges during the initial stages of an infrastructure pentest. dnsmap is a passive(ish) discovery tool meant to be used before an actual active attack. It's an alternative to other discovery techniques such as whois lookups, scanning large IP ranges, etc. Run dnsmap and you should be able spot netblocks of a target organization in a relatively short period of time.

Dnsmap is open source and is known to work on Linux, FreeBSD and Windows using Cygwin, although it has mostly been tested on Linux. The major drawback is lack of multi-threading support, which I'm hoping will be included in the next public release. Life is busy these days, but I'll try to spend some time on this project when time allows and inspiration is available!
