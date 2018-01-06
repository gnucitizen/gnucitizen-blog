---
title: Introducing Technika Security Framework
author: david-kierznowski
date: Thu, 02 Aug 2007 09:10:58 GMT
template: post.jade
---

[Technika is a Firefox plugin](/blog/technika/) that [myself](http://gnucitizen.org/about/dk) and [pdp](http://gnucitizen.org/about/pdp) was toying with some months back. The original idea behind this project was to provide independent self-contained security tools based on JavaScript which can be loaded and executed from the browser. TS Framework v1.0 is almost ready for release.

The advantages here over traditional security tools is that we utilize the existing browser functionality instead of re-inventing the wheel. In other words, Technika doesn't have to worry about network sockets, SSL libraries, whether its OS independent and so on. Basically, anything the browser can do, we can.

The TS Framework is designed to aid security analysts when testing web applications by providing a degree of automation.

## Core Features:

* `tech.dspider` - DOM link spider; because we utilize the DOM, the results are instant.
* `tech.forms` - GET/POST form parser.
* `tech.mutate` - By specifying a payload and regex, we can mutate our target arrays and build tests.
* `tech.scan` - tech.scan is our actual engine that will handle our GET and POST requests.
* `tech.mNikto` - Mini-Nikto was named after the popular web application tool Nikto if you haven't already guessed. We called it mini-nikto as it currently only contains a very small database.
* `tech.g` - This is one of my favorite tools in the TS framework. It uses the Google AJAX API (JSON) to fetch links and perform other Google hacking queries outside of our current DOM. This is really useful even when it is not security related.
* `tech.store` - Utilizes the Firefox sessionStorage to allow us to persistently store arrays.

There are a lot more features which we'll keep as a surprise for the first release. Bellow you can find some screenshots of TSF in action. We will drastically improve the core functionalities in the following weeks.

FYI, there have been some awesome projects going on at GC. .mario and pdp have done a lot of work around [XSSDB and PHPIDS integration](http://www.gnucitizen.org/xssdb/). If you haven't already checked it out, I strongly recommend that you do. You wont be disappointed. We launched [BlogSecurity](http://blogsecurity.net) a few months back to provide security exclusively for blogs, and we have had some great feedback there as well. [SecURLS](/blog/landing-securlscom) was also launched as a security portal to keep up to date with whats going on.

_This is from me for now. Stay tuned._
