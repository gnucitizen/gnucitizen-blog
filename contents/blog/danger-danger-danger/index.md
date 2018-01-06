---
title: DANGER, DANGER, DANGER
author: petko-d-petkov
date: Wed, 03 Jan 2007 01:10:32 GMT
template: post.jade
category: fucked
---

The WEB has gone crazy. I know that this is not news for some of you but you will be surprised to what extend this craziness has just developed. Among the traditional [QuickTime Movie](/blog/backdooring-quicktime-movies/), [QTL](/blog/backdooring-mp3-files/), [Flash](/blog/backdooring-flash-objects-receipt/), [Image](/blog/backdooring-images), [HTML](/blog/backdooring-web-pages) and [PDF](http://michaeldaw.org/md-hacks/backdooring-pdf-files/) vulnerabilities, there is now another one trivially exploitable with somewhat high degree of impact.

> So we have changed a lot of diapers last year. Simple things we do suddenly have become very dangerous and risky. If you think that user supplied Image files are safe, think again. There were [several attacks affecting social networks](/blog/myspace-quicktime-worm-follow-up) and a couple of [very successful AJAX worms](http://www.gnucitizen.org/topics/myspace-worms), again affecting social networks, during the last year. However, it seams that we haven't really scratch the surface yet.

Back in September 2006 David and I had a [small adventure with Adobe's PDF technology](http://michaeldaw.org/md-hacks/backdooring-pdf-files/). David made several issues with JavaScript for PDF publicly available and the findings were quite shocking for many people including us. Today, it seams that PDF documents can execute JavaScript code for no apparent reason by using the following template.

	http://**path/to/pdf/file.pdf**#**whatever_name_you_want**=javascript:**your_code_here**

You must understand that the attacker doesn't need to have write access to the specified PDF document. In order to get an XSS vector working you need to have a PDF file hosted on the target and that's all about it. The rest is just a matter of your abilities and desires.

This [finding was originally mentioned](http://www.disenchant.ch/blog/hacking-with-browser-plugins/34) by [Sven Vetsch](http://www.disenchant.ch/blog), on his blog. The attack vector was [discovered by Stefano Di Paola and Giorgio Fedon](http://events.ccc.de/congress/2006/Fahrplan/events/1602.en.html). This is a very good and quite interesting finding. Good work.

_Just to show you the impact of this issue I prepared the following POC._

    [http://www.google.com/librariancenter/downloads/Tips_Tricks_85x11.pdf#something=javascript:function createXMLHttpRequest(){   try{ return new ActiveXObject('Msxml2.XMLHTTP'); }catch(e){}   try{ return new ActiveXObject('Microsoft.XMLHTTP'); }catch(e){}   try{ return new XMLHttpRequest(); }catch(e){}   return null;}var xhr = createXMLHttpRequest();xhr.onreadystatechange = function(){    if (xhr.readyState == 4)        alert(xhr.responseText);};xhr.open('GET', 'http://www.google.com', true);xhr.send(null);
    ](http://www.google.com/librariancenter/downloads/Tips_Tricks_85x11.pdf#something=javascript:function createXMLHttpRequest(){   try{ return new ActiveXObject()

When you open the PDF document, an XMLHttpRequest will be made to google.com and the front page source code will be displayed inside an alert box. Obviously, attackers can create a lot more dangerous scenario, where highly sensitive information is leaked leaving the user totally blind of what is going on.

This attack vector has several benefits that I must elaborate on. First of all, it is obvious that this is not a server side problem. This is totally client side and Web app owners cannot do much about it. The only solution is to have Adobe release a patch as soon as possible or just not to host PDF files at all. Obviously the second solution is highly unfeasible. This leave us with Adobe fixing the bug, but let's be honest with each other. Things won't get better. It is not that Adobe don't have good guys there or they are irresponsible. It is just the fact that not that many people update their PDF reader mainly because it usually requires a large chunk of data being downloaded and installed. The process is very slow and bulky and puts off even security-minded people.

_Now we have a prove that every site on this planet is vulnerable to XSS (Cross-site scripting). This is definitely not nice. Unwillingly we have become solicitors of a very dangerous craft._
