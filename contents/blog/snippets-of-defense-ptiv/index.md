---
title: Snippets Of Defense Pt.IV
author: mario-heiderich
date: Wed, 31 Oct 2007 10:41:28 GMT
template: post.pug
category: fucked
---

This article is part of a series of posts about small and easy to understand code fragments you can use on your site for protection against certain kinds of attacks. Also this series is targeted to help you understand better what tricks are used by attackers to break into your site and how to avert them. If you have a Snippet of defense yourself and you want to share it, feel free to [contact us](http://www.gnucitizen.org/contact). Self-defense with a walking-stick.

### The snippet - mysterious characters from the Unicode world

Most of our readers know to one degree or another about character sets, UTF and Unicode, but what some of you don't know is the fact that there are several characters that can really harm you online estate and slip through most, if not all, filters. Those are to be categorized into two groups - the numerous variation of [Unicode whitespace](http://www.cs.tut.fi/~jkorpela/chars/spaces.html) characters and the characters that change the direction of the displayed text ([LTR, RTL](http://en.wikipedia.org/wiki/Left_to_right)). While doing some JavaScript research I've created a loop to check what characters can be put in between arbitrary method calls, without stopping the method from executing. Just like that:

	win**[unicode]**dow.ale**[unicode]**rt**[unicode]**(1);

I used several loops to determine the existence and the exact place in the Unicode table of those characters - tested in [Firebug](https://addons.mozilla.org/de/firefox/addon/1843):

```xml
var i =0;
var j = String.fromCharCode
while(i < 65536) {try{eval('con'+j(i)+'sole.log("&#'+i+' '+j(i)+'")');} catch(e) {}i++}
```

The result was surprising - as you can see yourself, there is a whole bunch of characters that can be placed right between method and property names. So, I tried those characters with the [PHPIDS Demo](http://demo.php-ids.org/) and boom - the filter rules were evaded with ease. So I began crafting a solution for this problem and I came up with the following:

```php
$value = rawurldecode(preg_replace('/(?:%E(?:2|3)%8(?:0|1)%(?:A|8|9)\w|%EF%BB%BF)/i', ' ', rawurlencode($value)));
```

You can use this code in your PHP application to make sure any of those pretty dangerous characters will be transformed into a regular space. Feel free to try on your application what characters like **&#8238** and others can do to your site - this is the kind of defense measurement you don't want to miss.

**&#8238;Or just take a look at this line of text ;)**
