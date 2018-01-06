---
title: More on GIFARS and Other Dangerous Attacks
author: petko-d-petkov
date: Sun, 03 Aug 2008 16:40:39 GMT
template: post.jade
---

This is a continuation from my [previous post](/blog/gifars-and-other-issues/). The reasons why GIFARs, although in my case it was JPGAR (from JPG + JAR), work was explained to me by FX ([Recurity Labs](http://www.recurity-labs.com/)) after my talk during the [last Black Hat in Amsterdam](/blog/black-hat-europe-2008/).

Basically, when you combine GIF/JPG and JAR/ZIP you have a hybrid file which have two heads. The head of GIF/JPG file is at the top. The head of the JAR/ZIP file is at the bottom. This condition satisfies both parsers and as such if you use ImageMagic or any other standard file/image manipulation library to detect whether the user is sending a valid picture you are **vulnerable**. Go fix your code **now**!

What you should do is to first of all validate whether what you receive is a picture and then re-convert it. If it is JPG, convert it again to JPG, That way you force the library to rearrange the bits within the image and as such the junk at the bottom, which is the malicious JAR, will be removed. This is your safest option for now and for the future, unless you are using a very stringent image manipulation library.

## But there is a Bigger Problem

But there is a bigger problem which I've pointed out during the [last Black Hat](/blog/black-hat-europe-2008/), [HITB Dubai](/blog/hitb-dubai-2008/) and [CONFidence](/blog/confidence-2008/). ZIP, which is basically JAR, is a very generic packing technology and it has been reused everywhere. For example, it has been used as the basic format for Microsoft Windows 2007 Documents. OpenOffice documents too. What about AIR applications? There are numerous examples of ZIP reuses. This essentially means that any site which allows you to upload any format based on ZIP is vulnerable to a persistent XSS plus the socket issue I've briefly covered in my [previous post](/blog/gifars-and-other-issues/) and [my initial post](/blog/java-jar-attacks-and-features/) from a year ago. And you don't have to use the combo trick. All the attacker needs to do is to slip a `.class` file into a MS Word Document file among the others MS specific files and you have a problem.

The process will go like this. BTW, this is the lamest possible way of doing all this. You can do the same with a single command:

* Change the extension from `.doc` to `.zip`
* Put the .class file in to the `.zip` file.
* Change the extension from `.zip` to `.doc`
* Upload it to the server which you want to attack.

So, to summarize: "any file format that is based on ZIP, you allow your users to upload on your server, can be used in an attack. Any format that has its headers at the top of the file and it ignores junk at the bottom can be used in an attack. No matter which way you look at it, SUN has to do something about the issue. Perhaps, something like what Firefox did to prevent [this](/blog/0day-quicktime-pwns-firefox/) exploit from working might be a good solution."
