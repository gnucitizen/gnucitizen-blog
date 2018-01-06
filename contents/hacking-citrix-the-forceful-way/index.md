---
title: Hacking CITRIX - the forceful way
author: petko-d-petkov
date: Fri, 05 Oct 2007 15:39:03 GMT
template: this/views/post.jade
---

[Yesterday](/blog/citrix-owning-the-legitimate-backdoor) I briefly covered how CITIRX hacking works by performing simple enumeration exercises. Today, I will show you how to drill.

As ways, I prepared a video that demonstrates the attack in more visual way. BTW, 90% of test I've done are subjected this type of attack. It is insane really.

<div class="screen"><object width="425" height="350"><param name="movie" value="http://www.youtube.com/v/i_zbObjFnrY"></param><param name="wmode" value="transparent"></param><embed src="http://www.youtube.com/v/i_zbObjFnrY" type="application/x-shockwave-flash" wmode="transparent" width="425" height="350"></embed></object></div>

In case the video does not work, you can download the high-quality version from over [here](http://www.gnucitizen.org/static/blog/2007/10/hc02.wmv).

I also did some coding as well. The following [script](http://www.gnucitizen.org/static/blog/2007/10/bforce.js) can be used to bruteforce the Windows/Netware logon. With a few mods you can make it work for CITRIX SSLs auth as well.

    [http://www.gnucitizen.org/static/blog/2007/10/bforce.js](http://www.gnucitizen.org/static/blog/2007/10/bforce.js)

    I have [another script](http://www.gnucitizen.org/static/blog/2007/10/connect.js), which I use to fine tune connections - very suitable when you don't want to deal with ICA but you want to tryout different citrix communication mechanisms and connection options.

    [http://www.gnucitizen.org/static/blog/2007/10/connect.js](http://www.gnucitizen.org/static/blog/2007/10/connect.js)

_This is it. I hope that you enjoyed the demo._
