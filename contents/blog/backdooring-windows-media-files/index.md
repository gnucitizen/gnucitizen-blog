---
title: Backdooring Windows Media Files
author: pdp
date: Tue, 18 Sep 2007 12:51:31 GMT
template: post.pug
---

I am planning to keep this post short and sweet. So, here is the deal. Meta Files are dangerous! In this post I am planning to cover some security findings that concern files with extensions `.wax`, `.wvx`, `.asx` and `.wmx`.

Before we continue with the fun stuff, you must understand the purpose of the file formats listed above. First of all, they are meta files just like Apple's [QTL](/blog/0day-quicktime-pwns-firefox). Second, they are standard for the Windows operating system and supported by default. Finally, the meta files are often used to stack together various media content into playlists.

if you start researching the Media Player meta files ([this](http://msdn2.microsoft.com/en-us/library/aa393397.aspx) is a good resource to start), you will see that they all have the same structure, which is XML. The XML document (starting with root node `**<ASX>**`) provides the basic characteristics of how the media streams need to be played, what sequence they follow and how the user can interact with them. Digging deeper into the XML, I found several tags which can be abused for malicious purposes. I am going to cover only one of them, which I find the most interesting:

```xml
<param name="HTMLView" value="[url here]"/>
```

From the [documentation](http://msdn2.microsoft.com/en-us/library/aa392319.aspx), the `HTMLView` value specifies:

> a URL that displays in the Now Playing pane of the full mode Player for the duration of the playlist or the current entry depending on whether the parent element is the ASX element or an ENTRY element. HTMLView is not supported for the Windows Media Player control.

In simple words, `HTMLView` will display a page of our choice within the standalone Windows Media Player, i.e. the page will be opened within the Media Player's surroundings, not a standalone browser. This is in particular very interesting behavior, which I experimented with for a bit. I found that a fully patched windows XP SP2 with IE6 or IE7 and Windows Media Player 9 (default) will open any page of your choice in less restrictive Internet Explorer environment even if your default browser is Firefox, Opera or anything else you have for a browser. This means that even if you are running Firefox and you think that you are secure, by simply opening an ASX media file, you expose yourself to all kinds of IE vulnerabilities.

Like always, I prepared some POCs (check the bottom of the post) you can try running, which I supply just to demonstrate the issue without harming your system. Those of your who have Media Player 11 are sort of protected. Upon execution you will see a confirmation box. This is a good news for Vista users. However, given the fact that Media Player is not the most popular choice for the masses and Vista is still not widely adopted, attackers are in very good position to abuse the technology for their own good.
