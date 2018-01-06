---
title: Persistent CSRF and The Hotlink Hell
author: petko-d-petkov
date: Mon, 16 Apr 2007 15:04:34 GMT
template: this/views/post.jade
---

When we talk about CSRF we often assume that there is one kind only. After all, what else is in there when CSRF is all about making GET or POST requests on behalf of the victim? The victim needs to visit a page which launches the CSRF exploit. If the victim happens to have an established session with the exploited application, the attacker can perform the desired action like resetting the login credentials, for example.

However, CSRF can be as persistent as Persistent XSS (Cross-site Scripting) is and you don't need XSS to support it. Before delving into persistent CSRF's issues we need to look at a few other things that brought the idea on first place.

> Hotlinking is the placing of a linked object, often an image, from one site into a web page belonging to a second site. The second site is said to have an inline link to the site where the object is located. Inline linking is also known as hotlinking, leeching, direct linking or bandwidth theft. [Wikipedia](http://en.wikipedia.org/wiki/Hotlink)

Those who have been active on the web for long enough probably know about what hotlinks are and how they have been abused to steal bandwidth. There is more into that however. Every time someone hotlinks, they instantly create a persistent CSRF hole. Here is how, as explained by a case study:

<div class="message">Bob hotlinked `fred.com/image.jpg` from his blog. Fred, who owned `fred.com`, saw the refers from Bob's blog going to that particular resource. Fred didn't like the idea of someone stealing his bandwidth so he decided to have some fun. With a few lines of `mod_rewrite` directives, Fred redirected all requests from `fred.com/image.jpg` to `bob.com/action.php?logout`. Because the resource that contained the hotlink to Fred's website appeared first in Bob's dashboard, Bob couldn't login, because every time he tried to, he got kicked out.</div>

This simple example outlines the entire idea behind persistent CSRF. If you think that many applications are vulnerable to non-persistent CSRF, there are even more vulnerable to the persistent kind given that everyone today hotlinks in one way or another.

Web2.0 Mashups developers, in particular, needs to be very concious with persistent CSRF attacks. The whole idea behind Web2.0/3.0 (Semantic Web) is that people can share the same data while providing different interfaces which use the information in different ways. This is great in theory, but every time someone renders an image element, that is not inspected, a CSRF hole is left wide open. Let's take for example the popular [Google Reader](http://reader.google.com), my favourite online application. Google Reader, allows you to read feeds. These feeds can contain images, podcasts and screencasts. However, if any of these feeds contain an image that points to `https://www.google.com/accounts/Logout?nui=1&service=reader&continue=http%3A%2F%2Fwww.google.com%2Freader%2F` like this:

    <img src="https://www.google.com/accounts/Logout?nui=1&service=reader&continue=http%3A%2F%2Fwww.google.com%2Freader%2F"/>

... upon previewing the feed, the user is automatically de-authenticated before having time to react. Everything will happen in the background. Moreover, the vector is persistent. The next time the user visits the malicious feed, they will be de-authenticated again.

_Keep in mind that all I am demonstrating here is a CSRF that is mostly **annoying** rather then **dangerous**._
