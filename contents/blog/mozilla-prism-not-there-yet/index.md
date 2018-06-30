---
title: Mozilla Prism Not There Yet
author: pdp
date: Tue, 30 Oct 2007 16:53:25 GMT
template: post.jade
---

From Mozilla's Lab [blog post](http://labs.mozilla.com/2007/10/prism/): "Prism is an application that lets users split web applications out of their browser and run them directly on their desktop". I was intrigued.

For a moment I thought that my days in pain are over. "Mozilla've got it right this time"! I really liked the concept. I still do. Unfortunately, when I installed the Prism environment and tried to hook some Google apps I am using all the time, I found myself in the exact same situation I was before. Essentially, Prism is nothing more but the Firefox browser with some fancier desktop shortcut features and without the normal chrome.

> I really thought that Prism will allow web applications to run independently, without sharing resources such as cookies, etc. I through that by separating all applications, I care about, as independent Prism apps, I will achieve the level of security I've always needed in my day-to-day work.

The result was different though. Although Google Reader was set as a separate applications from Google GMail, once I authenticated one of them the other one also gets authenticated as well. "Disappointment"! Through, I still like the concept. It just needs a bit polishing.

## Suggestions

Here is a list of things, which make sense in terms of security and which mozilla developers should consider implementing into Prism:

* Prism applications should be placed on their own such as cookies, persistent storage, etc are not accessible by other Prism applications which run from the same origin.
* Prism should implement logical **groups** which allow applications to share cookies between each other, when required. So for example, I should be able to define that the GMail application can share cookies with the Google Reader, i.e they are in the same logical group.
* Requests to URLs outside of the current origin should be prohibited. I guess iframes, XMLHttpRequests and JavaScript remoting can be threated as safe operations since they are defined by the developers.

Keep in mind that you may still suffer from Cross-site scripting and Cross-site request forgery attacks, although the attack surface will be greatly mitigated! I hope that these kind of features are implemented into Prism soon. This will give us the ability to surf the web a little bit safer.
