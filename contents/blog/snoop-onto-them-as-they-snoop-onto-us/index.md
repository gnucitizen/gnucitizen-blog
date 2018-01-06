---
title: Snoop Onto Them As They Snoop Onto Us
author: petko-d-petkov
date: Sat, 21 Jul 2007 08:47:37 GMT
template: post.jade
---

This is not that of a news since the service is available since January this year, however I cannot see that many people discussing it. Anyway, Google allows consummation of [SearchHistory](http://www.google.com/searchhistory) profiles as simple RSS/ATOM feeds. IMHO, this will impact the security and privacy of the users (us) quite significantly. Let's see how. But first, for those who don't know what the search history is, here is a short excerpt from the service homepage:

> **VIEW AND MANAGE YOUR WEB ACTIVITY** - You know that great web site you saw online and now can't find? From now on, you can. With Web History, you can view and search across the full text of the pages you've visited, including Google searches, web pages, images, videos and news stories. You can also manage your web activity and remove items from your web history at any time.

> **GET THE SEARCH RESULTS MOST RELEVANT TO YOU** - Web History helps deliver more personalized search results based on what you've searched for on Google and which sites you've visited. You might not notice a big impact on your search results early on, but they should steadily improve over time as you use Web History.

> **FOLLOW INTERESTING TRENDS IN YOUR WEB ACTIVITY** - Which sites do you visit frequently? How many searches did you do between 10 a.m. and 2 p.m.? Web History can tell you about these and other interesting trends on your web activity.

> [SearchHistory Homepage](www.google.com/searchhistory)

The search history feed can be access from the following url: [http://www.google.com/history/?output=rss](http://www.google.com/history/?output=rss). The interesting thing is that if your are not authenticated, the Google service will ask you to do so but though HTTP Basic Authentication. Now we all know how weak Basic Authentication is. By default, basic auth does not have any account lockout capabilities. Yes, this feature can be introduced and I haven't really tested it out on the Google's SearchHistory feed interface, yet.

> Apart from that, the real danger is that if someone has your account details, they could potentially become your invisible stalker. In the digital age, compromising someones email just for the sake of it does not make sense. What is more interesting, is to learn as much as possible from the victim and use this knowledge for your own benefit. This is what attackers will be after.

Relevant searches, places that you have been, stats, trends, secrets. If you have the Google Toolbar then you are even more screwed, since every step that you make will be recorded. Given the fact that everything is accessed via RSS, this information can be easily analyzed, aggregated and even exported to the NET for everyone to see. As we all know Basic Auth credentials are part of the URL scheme, almost every RSS/ATOM aggregator supports them: `http://username:password@www.google.com/history/?output=rss`. What is even worse is that we can also perform queries on the history like this: _https://www.google.com/searchhistory/find?q=**[query]**&output=rss_.

_Keep in mind that the SearchHistory is recording your moves no matter whether you want it or not. Your actions will be recorded for as long as you perform queries while being logged into Google or you have the Google Browser Toolbar installed._
