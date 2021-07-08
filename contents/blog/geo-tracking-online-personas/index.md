---
title: GEO Tracking Online Personas
author: pdp
date: Fri, 30 Nov 2007 14:37:45 GMT
template: post.pug
---

After I have released the [paper on Web2.0 hacking/security](/blog/for-my-next-trick-hacking-web20), I've been asked, on a numerous occasion, to come up with some tools that can be used to better understand the security implications involved into these new technologies which I had referred to. Today, I would like to show you how easy it is to pin-point someone's geographical position even if they have never shared that information on the Web. Welcome to the world of digital stalking.

The idea is very simple. All attackers need to do is to get as much data about the victim as they can. Live data is the best option in this case. The attacker will simple enumerate various info sources such as blog feeds, twitter and flickr feeds, comments, etc that the victim has generated online. Then, they will feed that information into some of the free APIs that are available online in order to extract the GEO information, which is stored-in anf obscured form inside, and lay out the resulted data on a map.

I could have come up with a GEO data extraction algorithm myself although its quality wouldn't have been as good as the quality provided by Yahoo's GEO Extraction Pipes' service. Therefore, I followed my instincts and basic principles (reduce, reuse, recycle), and went ahead creating a very simple Pipe interface. The pipe simply grabs a feed of data and annotates each item with data about the places which the content refers to. The annotations are in GEO format (lat and alt). The resulted feed is yet again exported into KML and feeded onto a map (Google, Yahoo or Microsoft Live maps).

I've create an application that simplifies the entire process. All you need to do is to place some feeds and render the map. As soon as you enter a significant number of items, you will start seeing the bigger picture. The concentration of dots will help you to triangulate the person and possibly reveal his or her real GEO location.

_File attached! Happy digging!_
