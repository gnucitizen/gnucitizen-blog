---
title: Flash Cookie Object Tracking
author: petko-d-petkov
date: Thu, 06 Dec 2007 14:44:26 GMT
template: this/views/post.jade
category: fucked
---

Thom Shannon has released an [interesting example](http://www.ts0.com/crosscookie/example.html) how to use the flash `SharedObject` storage mechanism in order to track users across any browser. Nothing new, but kudos for the effort and for bringing this subject to light again. I wouldn't have done it myself. However, Thom has forgot to release the actual sources of the SWF object. So, I set down and coded it myself just so that you can see what is happening behind the scenes.

The SWF source can be found bellow. Pay attention on how simple it actually is.

    [http://www.gnucitizen.org/static/blog/2007/12/flashcookiemanager.as](http://www.gnucitizen.org/static/blog/2007/12/flashcookiemanager.as)

    In order to compile the file, you need the [Motion Tween ActionScript compiler](http://www.mtasc.org/). Just put the file within your **mtasc** directory and run the command like this:

    mtasc.exe -cp std8 -swf FlashCookieManager.swf -header 0:0:0 FlashCookieManager.as

"Why is this of any good to anyone?" Well, it does give you some power if you think about it. First of all, flash cookies are not cleared unless you manually delete them which happens never. So they are actually an excellent way for storing all sorts of goodies, like tracking codes, hiding malware for whatever reasons you might want to do that, etc.
