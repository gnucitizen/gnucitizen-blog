---
title: VBScript to Rule IE
author: pdp
date: Fri, 16 Mar 2007 10:36:09 GMT
template: post.jade
---

SANS have published a [report](http://isc.sans.org/diary.html?storyid=2397) on VBScript malware and related things. The report was [mentioned](http://ha.ckers.org/blog/20070315/javascript-xss-is-conduit-for-viruses/)  on ha.ckers.org which was followed by a small [discussion](http://ha.ckers.org/blog/20070315/javascript-xss-is-conduit-for-viruses/#comments) on various ways of injecting VBScript, executing statements, etc.

Most of you probably know what VBScript is. For sure, it is not the most popular option among web application developers because it works on Internet Explorer only. However, it is perhaps the perfect solution for injecting malicious code (XSS) inside dynamically generated web pages via a server side script or DOM. I have used VBScript in the past, and I must say that although some web applications successfully sanitize JavaScript they fail to do the same with VBScript. "Internet Explorer is still the most popular browser in the world."

If you haven't played with VBScript in the past, expect to see a language which is quite similar to Ruby. It is lite and easy to use. One particular difference between VBScript and JavaScript is that the later terminates each statement with semicolon. VBScript cannot do that, which means that in theory you shouldn't be able to make one-liners like in JavaScript. That's not true.

In a few simple steps you can put several lines of VBScript code in a single line. For example, use the following URL in your Internet Explorer two show two `alert` boxes (`MsgBox` in VBScript).

```visualbasic
[vbscript:Execute(chr(77) & chr(115) & chr(103) & chr(66) & chr(111) & chr(120) & chr(40) & chr(34) & chr(66) & chr(108) & chr(97) & chr(34) & chr(41) & chr(13) & chr(10) & chr(77) & chr(115) & chr(103) & chr(66) & chr(111) & chr(120) & chr(40) & chr(34) & chr(66) & chr(108) & chr(97) & chr(34) & chr(41))](vbscript:Execute(chr(77) & chr(115) & chr(103) & chr(66) & chr(111) & chr(120) & chr(40) & chr(34) & chr(66) & chr(108) & chr(97) & chr(34) & chr(41) & chr(13) & chr(10) & chr(77) & chr(115) & chr(103) & chr(66) & chr(111) & chr(120) & chr(40) & chr(34) & chr(66) & chr(108) & chr(97) & chr(34) & chr(41)))
```

This is probably the safest way to do this although with the help of some URL encoding magic you can achieve similar result. Notice that each line is connected with `chr(13) & chr(10)`, which is the familiar LF CR sequence.

> You cannot execute VBScript on **about:blank** in Internet Explorer 7. To test the expression, go to some random page and then place the code in your address bar.

Very often, web applications sanitize URLs that start with the keyword `javascript:` and leaves everything else. If you use the `vbscript:` protocol you can bypass this restriction, which creates a XSS exploitable condition. This is one type of scenario and be sure that you can do a lot more then that. VBScript has access to DOM as well. For example, you can access **Document.cookie** and **Document.location**. You can do XML HTTP requests and do almost everything you can think of.

> Long story short, it is important to know about VBScript and its capabilities because as long Internet Explorer supports it and you are planning to support Internet Explorer, you have to deal with it. Do not implement black listing XSS filters. They can all be bypassed with a few tricks. All I want to say is that VBSript is here to stay and it will be widely used to bypass secure XSS filters. Be aware of it, and be prepared.
