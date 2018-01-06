---
title: Snippets Of Defense Pt.I
author: mario-heiderich
date: Sun, 07 Oct 2007 12:17:48 GMT
template: this/views/post.jade
---

This article is the start of a series of posts about small and easy to understand code fragments you can use on your site for protection against certain kinds of attacks. Also this series is targeted to help you understand better what tricks are used by attackers to break your site and how to avert this. If you have a Snippet of defense yourself and want to share it feel free to [contact us](http://www.gnucitizen.org/contact).

## The first snippet - overwrite alert() wit a logger

The JavaScript method [alert()](http://developer.mozilla.org/en/docs/DOM:window.alert) is mostly used for debugging purposes and very rarely found in live applications. Attackers though very often use this method for initial probing for XSS vulnerabilities on websites and web applications. Most PoCs found in [forums](http://sla.ckers.org/forum/read.php?3,44) and newsgroups make use of this method and meanwhile you can even find tons of links including alert()-based PoCs via [Google](http://www.google.com/search?q=inurl%3Aalert%28%22xss%22%29).

So combining those facts puts up the question why not overwrite the `alert()` method with a method that logs the request - which probably was fired by an attacker. First, we know that the attacker managed to inject JavaScript on our page because the modified alert() method has been executed. And second you logger script will tell you all you need to know about the malicious request. So here we go - place this code in between script tags inside your application's header or add it inside your application's JavaScript files:

```javascript
var old_alert = alert;
alert = function(a) {
    var img = new Image();
    img.src = 'http://the/uri/to/your/logger/file';
    img.style.height = 0;
    img.style.width = 0;
    document.body.appendChild(img);
    old_alert(a);    
    return false;
}
```

_Till the next time._
