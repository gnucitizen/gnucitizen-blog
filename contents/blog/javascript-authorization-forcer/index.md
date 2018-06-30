---
title: JavaScript Authorization Forcer
author: pdp
date: Tue, 15 Aug 2006 21:32:48 GMT
template: post.jade
category: fucked
---

This is an idea I am still developing. The malicious JavaScript presented here tries to guess URLs that contain credentials. It is sort of Basic Authentication/FTP Authentication bruteforcer.

The source code can be downloaded from [here](/files/2006/08/authorizationforcer.js).

    [/files/2006/08/authorizationforcer.js](/files/2006/08/authorizationforcer.js)

The POC works well in IE6, IE7, Firefox and Opera. I wasn't able to suppress the Basic Authentication dialog when trying to create a real Basic Authentication Bruteforcer. However, I came up with this lazyForce implementation. A typical attack vector will work like this:

1.  The attacker [discovers your internal IP](/blog/javascript-address-info).
2.  Based on your IP, a class C range is enumerated using the [Port Scanning](/blog/javascript-port-scanner) or [Visited Link Scanning](/blog/javascript-visited-link-scanner) techniques.
3.  Once a target is discovered, a large enough dictionary is used to find valid credentials associated with each IP.

_My advice to you is to never, never, never, ever use credentials in URLs. I know it is easier to type `ftp://user:pass@192.168.3.2` but this also puts your privacy at a huge risk._
