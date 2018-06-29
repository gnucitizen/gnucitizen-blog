---
title: More Advanced Clickjacking - UI Redress Attacks
author: petko-d-petkov
date: Wed, 08 Oct 2008 18:08:24 GMT
template: post.jade
category: fucked
---

This will be a quick post just to share some POCs and more information regarding the recent [Clickjacking](/blog/clickjacking-and-flash/) technique, i.e. UI Redress Attack, a name suggested by Michael Zalewski.

Clickjacking is an oldie but, a goodie. You can track the origin of the attack back at the beginning of this decade. Clickjacking is essentially the anti-CSRF killer. It is also the killer of Flash, AJAX (because AJAX apps are sometimes easier to clickjack, look at Google) and some other technologies. "Clickjacking" is perhaps not the perfect name to depict this class of attacks but it is a cool one.

The picture that you see in this post is basically a UI redress attack against Flash. It works flawlessly on Ubuntu with the latest Firefox, Flash and the latest NoScript with the applied fixes against the clickjacking technique, i.e. ClearClick. I do not know why it works but it works. Btw, the POC that you've probably seen to circulate in the last couple of days does not work on my setup.

The attack depicted here is very, very simple. All I do is UI redressing an evil iframe with preloaded malicious Flash file. In order to do that I use blank, absolute positioned iframes. At the end I color the entire page with the same color the standard Flash security dialog is using for displaying security messages. As you can see the user cannot do anything else but to click the `allow` button, upon which the attacker will start surveying the sound of the room the victim currently occupies.

> The solution for Flash is very simple. Show pop-up dialogs just like the ones used by signed Java applets, but make them more informational. Keep in mind though, that this solution can be abused to create rather annoying situations.

_You can download my POCs from [here](/files/2008/10/clickjacking-pocs.zip) and [here](/files/2008/10/clickjacking-pocs2.zip)._

<div class="screen">![Flash Redress 01](/files/2008/10/flash-redress-01-300x151.png "Flash Redress 01") ![Flash Redress 02](/files/2008/10/flash-redress-02-300x131.png "Flash Redress 02")</div>
