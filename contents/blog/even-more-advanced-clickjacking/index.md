---
title: Even More Advanced Clickjacking
author: petko-d-petkov
date: Thu, 27 Nov 2008 17:18:27 GMT
template: post.jade
---

Clickjacking is one of these types of attacks which are incredibly simplistic to perform, yet very powerful in today's web-driven world. In this post I would like to draw you attention to one more technique that can be used to perform successful clickjacking.

> Btw, I released a couple of [POCs](http://lab.gnucitizen.org/projects/ui-redress-attacks) that illustrate how the clickjacking attack for Flash works. Soon after that, Adobe released a patch. However, to my surprise my [POCs](http://lab.gnucitizen.org/projects/ui-redress-attacks) still work on the latest Flash player and browser versions. Can someone verify this? I suspect that the patch is not effective when dealing with overlaying iframes, which is exactly what my POCs are about.

Basically the browser slowly becomes a quite powerful graphical environment. This is due to two relatively new features such as the `canvas` and support for SVG (Simply Vector Graphic). Interestingly enough, SVG is not so simple. Actually, with the help of SVG you can do very advanced UI redressing. Check the following article for examples and brief description of how to do SVG effects for HTML content: [SVG Effects For HTML Content](https://developer.mozilla.org/web-tech/2008/09/15/svg-effects-for-html-content/).

Essentially, we can not only obfuscate the page that we want to clickjack but also apply funky effects to it that will totally redress the site's UI and even the browser's chrome. Now if you remember, once upon a time we were able to spawn chromeless windows. Funky! Of course, the side effect was that anybody was able to redress a pop-up to look like a system window, etc. Eventually, we've dropped the support for chromeless windows because of the security implications. However, as usual, every new problem is a well forgotten old problem, so now with the help of SVG we can do practically the same to an extend.

There you go. `SVG + clipPaths | masks | filters` will result into even more advanced UI redress attacks. If we mix them with powerful AJAX interfaces, which are so responsive to interaction that the user no longer needs to click on a submit button in order to make a change to his session, we end up with a total disaster.
