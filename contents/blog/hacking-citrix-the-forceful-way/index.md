---
title: Hacking CITRIX - the forceful way
author: pdp
date: Fri, 05 Oct 2007 15:39:03 GMT
template: post.pug
---

[Yesterday](/blog/citrix-owning-the-legitimate-backdoor) I briefly covered how CITIRX hacking works by performing simple enumeration exercises. Today, I will show you how to drill.

As ways, I prepared a video that demonstrates the attack in more visual way. BTW, 90% of test I've done are subjected this type of attack. It is insane really.

<iframe class="video" src="//www.youtube.com/embed/i_zbObjFnrY" frameborder="0" allowfullscreen></iframe>

In case the video does not work, you can download the high-quality version from over [here](/files/2007/10/hc02.wmv).

I also did some coding as well. The following [script](/files/2007/10/bforce.js) can be used to bruteforce the Windows/Netware logon. With a few mods you can make it work for CITRIX SSLs auth as well.

    [/files/2007/10/bforce.js](/files/2007/10/bforce.js)

    I have [another script](/files/2007/10/connect.js), which I use to fine tune connections - very suitable when you don't want to deal with ICA but you want to tryout different citrix communication mechanisms and connection options.

    [/files/2007/10/connect.js](/files/2007/10/connect.js)

_This is it. I hope that you enjoyed the demo._
