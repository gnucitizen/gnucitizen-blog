---
title: A Bag Full Of Tricks
author: petko-d-petkov
date: Thu, 19 Oct 2006 03:26:10 GMT
template: post.jade
category: fucked
---

![50ft Woman](/files/2006/08/50ft-woman.jpg "50ft Woman")

Not too long ago I [presented](/blog/self-contained-xss-attacks) a technique that can be used to compose self-contained html pages. Apart from the most obvious use of this technique (XSS and CSRF), attackers can use it to compose malicious binary payloads of PDF, DOC, MP3 types of files. As such, if there is vulnerability in Microsoft Word 2003, JavaScript attack scripts could be able to take advantage of it without pulling remote content (remote DOC file). Everything is self-contained.

I also [mentioned](/blog/self-contained-xss-attacks) that the data: URL schema (the technology that used to transport binary payloads), discussed in this article, is supported by Firefox, Opera and Konqueror. IE6 and IE7 have partial support only through other protocols. That of course reduces the impact of this type of attack. Fortunately or not, there is something else the attackers can use to achieve similar effect. The technique works well in all browsers and some of you might already be familiar with it.

Everybody knows about the `javascript:` URL schema. This type of protocol is used to hook JavaScript code on events, compose bookmarklets and also perform various types of tricks when testing AJAX applications. Simply typing:

    javascript:alert('welcome');

    in your address bar will display a message inside the current context. However, a lot more things can be achieved.

    Many JavaScript developers fell into a not that obvious trap when they first start dealing with the `javascript:` URL schema. Let's say that the developer wants to hook an event on all links available inside the current page. Obviously they can try something like the following:

    javascript:var a=document.getElementsByTagName('a');for(var i=0;i<a.length;i++)a[i].onclick=function(){alert('click')};

    that will not produce the desired result. Most likely they will get the following text:

    function () { alert("click"); }

    An experience developer knows how to deal with this type of situation. What needs to be done is to return a void at the end of the code. This way the URL will not replace the current page with its gibberish. Here is an example:

    javascript:var a=document.getElementsByTagName('a');for(var i=0;i<a.length;i++)a[i].onclick=function(){alert('click')};void 0;

    This should work. All these take us to the idea that JavaScript can be used to generate self-contained pages. Here is a simple example:

    javascript:'<h1>title</h1>'

    That was easy. Similar effect can be achieved with the following example:

    javascript:String.fromCharCode(60,104,49,62,116,105,116,108,101,60,47,104,49,62)

    Unfortunately the `javascript:` URL schema lacks one quite useful feature the `data:` URL schema has. This is the content type definition. The `javascript:` URL schema produces 7bit long ASCII characters with Content-Type equal to `text/html`. On the other hand `data:` can produce everything we can think of.

    There is a theoretical workaround which will work if the W3C specifications are correctly followed. This solution makes use of the <object> element. The following two examples should be possible although that's not the case with any of the currently available browsers:

    <object data="data:application/pdf;base64,..." type="application/pdf"></object>

    <object data="javascript:String.fromCharCode(...)" type="application/pdf"></object>

    this works though:

    <object data="javascript:String.fromCharCode(...)" type="text/html"></object>

Still, attackers can generate HTML pages on the fly. That of course depending on the effect they want to achieve can be low, medium or high security risk. I am quite excited to see how this technology will fit into modern browsers in the future.

_Soon or latter developers will decide to get rid of the server side report generation scripts, etc., and do everything from the client. That will be the perfect time for attackers to start implementing cross document injection techniques where they will be able to plug everything they want in any type of file format they need._
