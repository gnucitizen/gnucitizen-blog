---
title: Old-school Remote Command Exec Vulnerabilities on Avaya Intuity
author: adrian-pastor
date: Thu, 17 Sep 2009 08:32:47 GMT
template: post.jade
---

Remember those old remote command exec vulns where you had a CGI script such as a perl program which would take input from the client to construct command strings that would then be passed to the shell environment? Well, there were tons of those affecting diagnostic scripts available on the web interface of Avaya Intuity Audix LX.

> I successfully tested them on version 1.1, and according to Avaya this is the latest vulnerable version (version 2.0 is _NOT_ affected apparently).

These vulnerabilities, although cool, are not critical since you need to be logged into the interface in order to exploit them. That being said, it could be handy for bypassing restricting imposed by the web GUI and eventually escalate privileges. Apart from that, there were also the usual client-side bugs such as XSS and CSRF which are usually expected of an appliance with a web interface.

Details can be found [here](http://www.gnucitizen.org/static/blog/2009/09/Avaya_Intuity_Remote_Command_Execution.pdf).
