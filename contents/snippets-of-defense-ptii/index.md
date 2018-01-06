---
title: Snippets Of Defense Pt.II
author: mario-heiderich
date: Sat, 13 Oct 2007 07:29:41 GMT
template: post.jade
---

This article is part of a series of posts about small and easy to understand code fragments you can use on your site for protection against certain kinds of attacks. Also this series is targeted to help you understand better what tricks are used by attackers to break into your site and how to avert them. If you have a Snippet of defense yourself and you want to share it, feel free to [contact us](http://www.gnucitizen.org/contact).

## The snippet - reset window.name

The [window.name](http://developer.mozilla.org/en/docs/DOM:window.name) property is often used for complex XSS attacks because you can fill it with payload on one site and read the contents on another site. Sounds weird? It is! Try setting this property on an arbitrary site with Firebug or something similar, navigate to another site and run `alert(name)` - you should see the exact text you entered. Since you can also evaluate the contents of name an attacker can load kilobytes of payload into this property, redirect and execute it with `eval(name)` on the victims site - shortest XSS vector ever.

The more sophisticated the attack method is, the easier it it to protect from. In this case, we just need to overwrite `window.name` in the header of you applications markup like this - don't forget to encapsulate the code in script tags:

```javascript
window.name = false;
```

_I hope that you enjoy the trick. Till the next time._
