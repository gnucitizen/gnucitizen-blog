---
title: Extreme Search Engine Hacking
author: petko-d-petkov
date: Fri, 22 Feb 2008 11:45:12 GMT
template: this/views/post.jade
---

If you are a beginner Google Hacker then I would recommend to have a look at the [Google Hacking for Penetration Testers Second Edition](/blog/google-hacking-for-penetration-testers-second-edition/) book or check the [cDc](http://www.cultdeadcow.com/)'s [GoolagScanner](http://goolag.org/). If you want to learn some new tricks follow me:

We know what Google Hacking is but have we explored the edges of the craft? I don't thing so. This post is all about going to the possible limit. So, let's have a look on some tricks and techniques that attackers may use in order to take full advantage of the available technologies. **WARNING!** you may need to spend some money but the overall result is enlightening. So, it is worthed.

## Forceful Spidering

I started this discussion long time ago in my [paper on Web2.0 hacking](/blog/for-my-next-trick-hacking-web20), but let me summarize the idea here for you. Simply put, it is possible to force a spider to craw pages of your likings. This is not a big news but it has some interesting side-effects, like uncovering the hidden web. For those of you who don't know what the hidden web is, here is a snippet:

> The sum of the Web pages that is not accessible to Web crawlers.[ University of Melbourne Metadata Glossary](http://www.infodiv.unimelb.edu.au/metadata/glossary.html)

So here is the scenario. If the attackers want to monitor a large corporation they could rely on queering the Google database, which is very limited because of various reasons, or they can force the search engine spiders to go and visit all resources of interest and as such expose their hidden features. The process is usually very simple and it is represented by the following steps:

1. Collect the target IP ranges
2. Construct a list of known ports such as `80, 443, 8080, 80801, 8443, etc`
3. Generate a new list which combines both lists described above, i.e. `http://[ip]:[port]`
4. Navigate search engines to visit these URLs:
	* by generating random pages (splogs, etc) which contain these links
	* by pinging URLs using well known and documented services such as [Yahoo's Site Explorer API](http://developer.yahoo.com/search/siteexplorer/), [Technorati](http://technorati.com/), [Ping-o-Matic](http://pingomatic.com/), etc...
5. Wait for a couple of days until the spiders collect, process and index the information
6. Construct a custom search engine by using [MyYahoo](http://my.yahoo.com/)'s or [Google's Co-op](http://google.com/coop) web interfaces. Specify the URLs that were generated in step 3 as the custom search engine base.
7. Query it!

The potential benefits are quite obvious. For example, if attackers go ahead and start crawling manually, looking for interesting URLs, they will endup in very time consuming operation which is dependent on hardware and line-speed limitations. On the other hand Google and Yahoo will keep a good index of the crawled resources even when they get update. Not to mention that there is already a good infrastructure of various Google dorks which can be re-used and tools such as [Maltego](http://www.paterva.com/web2/Maltego/maltego.html) may come immensely useful.

## Batch Processing Search Engine Results

This primary involves the Alexa's Web Search Platform and [Amazon's Services](http://aws.amazon.com/). The Alexa's Web Search Platform allows you to write a tool in whatever language you like, as long as it supports SOAP, and use that to process millions of results. No fuzzy logic applied. You receive the content as it is plus information about the response headers, etc. This is quite powerful and it is the preferred way for searching for embedded devices and weird server headers as you get the whole thing not just the body text like when using just Google.

The service costs **$1 per CPU hour** - not much for the power you get out of it. Allow me to mention that your tool can run on Amazon's infrastructure which allows you to start as many servers as you want in order to process the results faster then you can afford with your personal computational network.

## Elastic Cloud Computing

By using [Amazon's Services](http://aws.amazon.com/) and more specifically their [Elastic Cloud](http://aws.amazon.com/ec2) infrastructure, attackers can gain immense scalability which they can use for their own evil good. The cloud allows developers to spawn ritualized instances of any type of operating system which can be instructed to go through any kind of heavy machine processing task, such as crawling web sites, port-scanning, etc. The information can be stored on [Amazon's Simple Storage](http://aws.amazon.com/s3) service. The whole package is quite cheep and very affordable.

_My personal experience with these techniques led me to a lot of revelations which I haven't decided what to do with, yet._
