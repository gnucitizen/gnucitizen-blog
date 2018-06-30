---
title: Secure Code Through Frameworks
author: pdp
guest: jeremiah-grossman
date: Fri, 22 Dec 2006 18:32:49 GMT
template: post.jade
---

> This month our guest blogger is [Jeremiah Grossman](http://jeremiahgrossman.blogspot.com), founder and chief technology officer of [WhiteHat Security](http://www.whitehatsec.com). Jeremiah has been a frequent speaker at industry events including the BlackHat Briefings, ISACA's Networks Security Conference, NASA, ISSA and Defcon. In this post Jeremiah is sharing his insights on the problem of secure coding with frameworks.

Thank you to pdp for inviting me to guest blog. This is a first for me.

[105 million sites](http://news.netcraft.com/archives/2006/12/05/) make their home on the Web - 4 million more move in each month. That's a staggering number to think about, and as we well know, the vast majority of websites [(I say 8 in 10)](http://www.whitehatsec.com/home/resources/presentations/files/) have serious security issues. Industry discussions go round and round about what should be done. We talk about secure coding practices, training, compliance, assessment, source-code audits, and the like. What's going to work? Then I read something Robert Auger [posted](http://www.cgisecurity.com/2006/12/10), the lack of security enabled frameworks is why we're vulnerable, touching on an area I've thought a lot about recently.

When you look at safe computing education for end-users we tell them to choose strong passwords, patching regularly, install AV, and to not open attachments. This strategy hasn't seemed to help a whole lot, although the incremental results are good enough to keep doing it. So does anyone really believe bug-free code is coming in the next 1 - 5 years? Or ever? No way. Anyone with enough experience is robbed of that childhood dream. Then it certainly wouldn't make any sense to believe training web application developers to create secure code will result in them actually doing so. Sure there will be improvement in quality, but by how much and when do we see ROI? Developer education is good to do though won't provide the end-game we're looking for.

Here's my point: The only way I see software security improving significantly is if "security" is baked into the modern development frameworks and be virtually transparent. Remember, the primary developers mission is to pump out code to drive business and that's what they'll do not matter what. When developers find that its WAY easier and WAY better to do RIGHT by security, then we'll get somewhere. Not before. I didn't think of this concept, being a web application vulnerability assessment vendor positions you to see this see this happen first hand. Our data makes it quite clear, which websites are more secure than others.

At WhiteHat we assess vulnerabilities in hundreds of websites each month coded in all sorts of programming languages. Its clear to us systems designed with modern development environments like .NET and J2EE are WAY more secure than their predecessor. Session handling issues go away. So does large amount of XSS and SQL Injection. Are they all rock solid and infallible? No, of course not, but the differences are hard to ignore. To improve the security of software, the development framework seems to be making the most difference.
