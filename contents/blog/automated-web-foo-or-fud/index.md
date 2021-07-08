---
title: Automated Web Foo or Fud!
author: david-kierznowski
date: Fri, 03 Aug 2007 22:00:04 GMT
template: post.pug
---

Jeremiah is the most outspoken that I have seen regarding the effectives of automated web application tools. His recent post, [Are web application scanners ***ing useless?](http://jeremiahgrossman.blogspot.com/2007/07/are-web-application-scanners-ing.html), almost sounds frustrated. While developing the initial version of the [Technika Security Framework](/blog/introducing-technika-security-framework), I have really had a chance to think about this, which I haven't done since an OWASP presentation I attended 2-3 years ago, anyone have the link for this?

Firstly, as always I love offering life experiences instead of just shooting air. Some time ago, a friend of mine decided to try out an automated web application tool against a client site... it turned into one of those, "unwise in hindsight" experiences! Whilst the tool ran over night, what he would soon find out, is that the tool would submit over 10000 requests to the application, and that this data was being stored on the customers backend database, which was then being replicated and used in other applications. What is worse, the company being tested were a group of corporate lawyers, ouch! In short, it was a painful lesson, and luckily the company got away without a lawsuit!

My second experience was with another good friend of mine. The project was for a large bank, which had already used a popular automated web application tool, and wanted a manual test for benchmarking and future planning. Again, the experience was negative, the automated scanner found some issues, but missed a critical business logic risk which made this particular bank say yes, to us, and limit the tools usage.

The challenges I see with automated web app tools are these:

* **AJAX** - JavaScript can be a nightmare to parse, and actually next to impossible in some cases. If you have an AJAX application, you don't want an automated tool.
* **Business and application logic** - A knowledge of how the application fits together and quirky behaviour often uncovers the most interesting of findings. Creativity is not a strong point for the automated tool
* **Pattern recognition** - Massive potential for false-positives, depending how the application is setup.
* **Non-RFC applications** - When playing the TSF, I found the form parse tool giving me back some odd results. When I look into it further, I realised that the developer had used the "target" instead of "action", the browser still processed this, as it was using the form BaseURI. Oddities, occur all the time with web apps.
* **Denial of Service and business risks** - As I shared in my story, although backups are great, I don't think I would want some automated tool throwing thousands of requests an hour at my live server without really strict monitoring.
* **State** - I could only think of Captchas as its getting late now, but I am sure there are some other examples where human intervention is required in order to move forward.  If the application is tracking state, and using this for access controls, this may completely screw up an automated engine.
* **Cost** - Some of these tools cost an absolute blinkin' fortune!

This list is by know means comprehensive but just some initial thoughts I've had over the past few weeks. I do see alot of limitations with these tools. However, I really think well-thought and developed tools can really aid a tester and make the job a little easier, if you have the money and time. So what's left in my opinion? Two things. Of course, I love the [Technika Sec Framework](/blog/introducing-technika-security-framework) concept, as it utilises the browser, and therefore allows us to focus our code and time on the important stuff rather then worrying whether the tool is RFC, and whether it supports A,B & C. Also, because its JavaScript and open, developers far better than I, can have a platform to design some kick ass tools. Second, I really love the HTTP proxy concept, in the form of tamper data or paros type tools.

_We hope to use TSF in the future hijack the DOM to provide these features for us. To me, this is the way forward, but of course I am bias :-)_
