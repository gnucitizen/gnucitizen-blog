---
title: Google Search Results Poisoning
author: pdp
date: Tue, 16 Jan 2007 09:31:13 GMT
template: post.pug
category: fucked
---

When GNUCITIZEN was down for almost a week in December last year, I've experienced something that I've remained silent about till now. I wanted to investigate it myself before sharing it with the rest of the world. So, here is the discovery, it is up to you to decide whether it something or absolutely nothing.

<div class="screen">![Search Results Poisoning Screen JPG](/files/2007/01/search-results-poisoning-screen.jpg "Search Results Poisoning Screen JPG")</div>

Because GNUCITIZEN was down for almost a week, I was concerned that Google and other search engines will index Wordpress default error page since that was what it was showing when there was no database connectivity. In the following days, after the site went on-line, I tried to query Google by searching for "GNUCITIZEN". I was expecting to see the GNUCITIZEN front page, [AttackAPI](/blog/attackapi), the [backdooring](/blog/backdooring-mp3-files/) [articles](/blog/backdooring-quicktime-movies) and some Full-Disclosure and Bugtraq posts. To my surprise, the search result was quite different. GNUCITIZEN front page was still there holding on number one, however the rest was all gone. All other links were pointing to some websites I had never seen before.

Usually, I don't care much about Google. GNUCITIZEN is about quality of content not about [SEO (Search Engine Optimization)](http://en.wikipedia.org/wiki/Search_engine_optimization). However, I was quite curious to know what had happened. I opened some of the links presented on the search result page and they all seamed to be fine. I tried [Technorati](http://technorati.com/) and other blog engines to verify that these guys are not using some unknown black SEO techniques but none was found. I examined the search result page and patterns started to emerge. All of the indexed sites were showing parts of the notorious Wordpress default error page that is presented when there is no database connectivity.

Although, I cannot verify what had happened one thing is quite obvious: it seams that Google Search Results can be poisoned. I am sure that other search and aggregation engines that have one or another type of algorithm for sorting and rating content are affected by similar issues.

I believe that Google had indexed the error page from my site and dynamically linked it to other sites that have similar problems. These sites were available on the query result page because the Wordpress error has been indexed for quite sometime. The Google Bot does not understand whether it craws errors or valid pages. It is all content! Here it is a simple scenario how this can be abused.

> Mike, the SEO expert, decides to make a small fortune. Mike sets a small network of splogs. Each splog is equipped with a bunch of PPC (Pay per Click) Ads. Once Google Bot arrives to one of Mike's splogs, a `mod_rewrite` directive matches the user agent and sends the notorious Wordpress error page (other types of error pages are possible too). The Google Bot, will associate Mike's splogs with pages that contain the above mentioned Wordpress failure. This means that, if your website happens to display the Wordpress No Database Connectivity page when Google Bot craws it, users who try to reach you through Google's Search page will get a poisoned result set. Mike has successfully hijacked your keywords.

As I said before, this is not verified. I am just a massager and this article is outlining my experience as a user and my observations as a security researcher. If you believe that I am wrong with my interpretation please leave a comment.

_I cannot think of a prevention mechanism for this attack vector since I am not familiar with Google Bot internal logic. Anyway, don't trust your keywords! They all belong to us!_
