---
title: HScan Redux
author: petko-d-petkov
date: Fri, 23 Feb 2007 12:28:43 GMT
template: this/views/post.jade
---

Inspired by [Michal Zalewski](http://lcamtuf.coredump.cx/)'s recent Firefox bug hunt, I decided to give it a go and see what I can come up with. We all know how vulnerable Firefox and other browsers are. This is the reason why I am not particularly interested in finding specific browser bugs.

This vulnerability is not a reworked version of [Jeremiah Grossman history hack](http://jeremiahgrossman.blogspot.com/2006/08/i-know-where-youve-been.html). It is completely different and it should be treated as a new issue. The peculiar thing about this vulnerability is that it tells you which URLs you have attended during the current browser session (the last time you opened your browser). I am not sure how useful this really is.

Keep in mind that attackers can abuse this vulnerability to extract valuable information about your browsing habits. Attackers can also use this hack to precisely detect whether you are logged into your router management interface, for example. This hack can also be used to detect your router type and version as well. Based on this information, attackers might be able to compromise the integrity of your network.

_The POC is located [here](http://www.gnucitizen.org/static/blog/2007/02/hscan-redux-poc.htm). If all checks show up as **NOT visited**, then visit one of the listed URLs and retest again._
