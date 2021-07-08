---
title: Web Mayhem Firefox's JAR Protocol issues
author: pdp
date: Wed, 07 Nov 2007 00:51:46 GMT
template: post.pug
---

One of the things that we enjoy the most, here at GNUCITIZEN, is finding issues in features. Unlike bugs, insecure features tend to be more severe and usually last longer due to uneasy and rather long decision making process on whether the feature should be continued or discontinued once and for all. In my previous post I [outlined](/blog/bugs-in-the-browser-firefoxs-data-url-scheme-vulnerability) some of my concerns about the `data:` protocol. Today, I would like to draw your attention on the insecurities that come with my personal favorite: `jar:`.

For those of you who have never heard of `jar:`, the protocol is nothing more but a mechanism for pulling content from compressed files. In its most basic usage form, the `jar:` protocol looks like this:

    jar:**[url to archive]**!**[path to file]**

    Notice that the protocol embeds another URL in its body. This URL points to the location of the JAR(ZIP) archive from where the **[path to file]** will be read. The secondary URL can be of any kind, including but not only: chrome, file, ftp, https and even data (we will come back to this one latter). The **[path to file]** parameter usually starts with slash (/). This part of the URL specifies the relative path from the JAR root. In case we have a single file called `a.jpg` within the folder `Pictures`, the path will look like this: `/Pictures/a.jpg`. The full URL path may look like the following:

    jar:**https://domain.com/path/to/jar.jar**!**/Pictures/a.jpg**

If you want to learn more about the `jar:` protocol just look it up on the web. One thing that is very important to stress, and which we are going to use as a basis for the rest of this post, is that `jar:` content run within the scope/origin of the secondary URL. Therefore, a URL like this: `jar:https://example.com/test.jar!/t.htm`, will render a page which executes within the origin of `https://example.com`. It is very important to remember that.

"What does this all mean?" In simple terms, it means that any application which allows upload of JAR/ZIP files is potentially vulnerable to a persistent Cross-site Scripting. Potential targets for this attack include applications such as web mail clients, collaboration systems, document sharing systems, almost everything that smells like Web2.0, etc, etc, etc. Document formats are in particular very vulnerable. The OpenOffice file format (`odt`) and the less known Microsoft Office 2007 Open Document Format are both based on ZIP. If you create a simple document via either of these products and then you change the extension to `.zip`, you will be able to read all the files the document is made of. An attacker can simply add a malicious page, with a nasty client-side exploits, inside the archive and change back the extension to `.odt` or `.doc`. Who would have though that?

> Once the malicious `Zip/Doc/Odt/Etc/Etc/Etc` file is uploaded/shared the attacker will be able to cross-script the origins in whatever way he likes. My research led to the discovery of many applications that are affected by this issue including some coming from top software vendors such as Google and Microsoft. Their number is so big that it makes almost no sense to try to list them all here or even be bothered to individually investigate all of the related issues in detail. The root cause is only one: the `jar:` URL protocol handler.

But this is not all! Jar URLs can be used to obfuscate malicious payloads to an extend which no Anti-virus software can recognize. The protocol handler can be nested (jars within jars within jars) and can encapsulate the `data:` protocol as well. Attackers can easily write a self extracting payload which is hidden behind multiple permutations of the both `jar:` and `data:` protocols and as such evade intrusion detection and prevention mechanisms that might be on place to guard the perimeter.

### What shall we do to protect ourselves?

I haven't thought well on this yet but the best way is to very carefully sanitize the types of files you allow your users to upload/share. Unfortunately, sometimes this is impossible, especially when it comes to formats such as `.odt` and `.doc`. You need to open these files and re-save them and as such to guarantee that there are no malicious leftovers. IDS, IPS and Ant-virus vendors should really start looking into how the `jar:` protocol works and come up with dynamic mechanism for uncompressing deeply nested URLs.
