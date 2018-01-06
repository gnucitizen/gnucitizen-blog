---
title: Hamster Plus Hotspot Equals Web 2.0 Meltdown NOT
author: petko-d-petkov
date: Wed, 15 Aug 2007 09:28:40 GMT
template: post.jade
---

> Robert Graham (CEO Errata Security) gave his Web 2.0 hijacking presentation to a packed audience at Black Hat 2007 today. The audience erupted with applause and laughter when Graham used his tools to hijack someone's Gmail account during an unscripted demo. The victim in this case was using a typical unprotected Wi-Fi Hotspot and his Gmail account just popped on the large projection screen for 500 or so audience members to see. Of course had the poor chap read my blog about email security last week he might have avoided this embarrassment. But for the vast majority of people using Gmail or any other browser or "Web 2.0â€³ application, they're all just a bunch of sheep waiting to be jacked by Graham's latest exploit. [Hamster plus Hotspot equals Web 2.0 meltdown!](http://blogs.zdnet.com/Ou/?p=651)

I have nothing against [Robert](http://erratasec.blogspot.com/), he is a good guy, but I have to say that his research has nothing to do with Web2.0. Man-in-the-middle attacks have been known for ages and being able to sniff the session identifier from a HTTP connection over unprotected/unencrypted channel is not new. Of course it works. I mean, of course it works. And yes, do not use Telnet because someone will be able to capture your credentials. Of course it works! It is unencrypted channel, therefore it means that everyone will be able to see the traffic.

Cookies are standard mechanism to imitate statefulness for otherwise stateless HTTP connections. If someone sniffs them from the air they will be able to impersonate the connection they support. This is it! Finito! And, btw, you don't need any special tools to do all that. All you need is bash with some very basic utils you can find on any standard Unix/Linux distribution. Here is an example:

1. Start Kismet
2. Read the Kismet dump file
3. Extract Strings
4. Match and extract cookies

i.e:

	> kismet&
    > tail -f kismet.dump | string | grep -iE 'Set-cookie:|Cookie:'

Here you go! So, I don't really understand what is the fuss all about. Again, I repeat, this is not Web2.0 problem and I repeat this is not Web2.0 problem and I repeat.
