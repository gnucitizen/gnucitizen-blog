---
title: WS Discovery
author: petko-d-petkov
date: Tue, 06 Jun 2006 08:45:42 GMT
template: post.jade
---

In the last couple of months I've been playing with Web Service and in the process I found several useful things. There are many discovery techniques but I would like to share the most recent ones (the ones that makes most sense to me today). You can check [Massive Enumeration Toolset (MET)](/blog/met) if you need tools to automate the discovery process.

Web Services are usually described with WSDL (Web Service Description Language) files. This means that the easiest way to find services is to search for these files online. Using Google to do the following queries should result in a fair amount of WSD documents:

* `[wsdl filetype:wsdl](http://www.google.com/search?filter=0&q=wsdl+filetype%3Awsdl)`
* `[inurl:asmx?wsdl](http://www.google.com/search?filter=0&q=inurl%3Aasmx%3Fwsdl)`
* `[inurl:php?wsdl](http://www.google.com/search?filter=0&q=inurl%3Aphp%3Fwsdl)`.

Remember to disable Google's content filtering facility because this will improve your search results.

Of course, there are many other techniques you can employ. It is worth researching on UDDI if you really want to get into this kind of stuff. The last time I queried Google using these dorks, I discovered 1198 Web Services some of which were very interesting.
