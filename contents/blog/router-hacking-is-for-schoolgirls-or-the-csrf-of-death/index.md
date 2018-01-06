---
title: Router hacking is for schoolgirls - or the CSRF of Death
author: petko-d-petkov
date: Mon, 03 Mar 2008 10:28:34 GMT
template: post.jade
---

Some days ago the very interesting [router hacking challenge](/blog/router-hacking-challenge/) [ended](http://www.0x000000.com/index.php?i=524) and I thought to myself that the impact an attacker can have on an unprotected router is pretty high - sometimes frighteningly high. But all this is still not enough to make sure that developers and system engineers get the very meaning of the danger coming with XSS and CSRF. So I thought to myself what attack scenario could be created that is even more dangerous than all the interesting submissions for the router hacking challenge. After a short while thinking and playing around I found the solution. **Imagine a CSRF that is capable of formatting and stealing the whole remote web server a user own who visits a malicious or prepared site.**

WE HAVE TO PUT THIS IN A MSG DIV PLZ!

Formatting a web server and stealing the login data for the MySQL root user and the SSH rot user - wow. That sounds horrifying and not very realistic. But unfortunately it is sad reality and the next paragraphs will explain why this issue exists and what can be done to protect against it.

A pretty large hosting company located in Europe - I won't disclose their name but believe me they were contacted and I am currently working out a solution with them - provides thousands of users with web space, virtual servers and full stack root servers. All in different shapes and sizes. If you decide to rent web space or a server from them you are provided with an admin panel that allows you to configure the most important settings for the package you ordered. This includes information abut the root passwords for the MySQL database, the SSH login and other administration panels as well as another very interesting feature. 

This feature enables you to **reset the whole server** from the admin panel - which is by the way [.htaccess](http://httpd.apache.org/docs/1.3/howto/htaccess.html) protected, so no fast dying session cookies or such... - **install another OS**, chose another control panel and now breathe: **It also allows you to define an email address where to send the new login data.** So - to round it up: there's a form that can be submitted from remote - at least if the user has been logged into the panel recently - that blows all database and file data on your server to smithereens and sends the new login data to the attacker who crafted the site you stumbled upon. In the worst case scenario you lost all your data on the box, the box itself and there's nothing you can do about it but trying to prove to the companies support that this server once was yours. Total data loss, several days if not weeks of downtime and this all due to one single CSRF. Wow. Furthermore we have weak default passwords which are always created of a sequence of sic characters from the range a-z and two digits - like _mikado12_. You noticed the fact that a vocal is always preceded by a consonant? So - it's also very easy to brute force guess the passwords but that's another story.

It is needless to say that the admin interface also provides several other very important forms that can easily be CSRFed. **None of the forms is protected by tokens or captchas** - a plain remote submit will lead to the exact results you expect. Also the whole panel is festered with XSS which makes it even easier to retrieve the root login data displayed in plain text on one of the subpages via XHR, make the infected user think that nothing happened while the whole server gets trojanized and so on. 

SCREENS GO HERE PLZ!

At the moment it is not possible to provide more specific info on this issue since the vendor has to fix this problems before full disclosure but the screens below should give you an impression on the impact of this kind of attack. I don't really know if other web space and server hosting providers have similar issues in their admin panels and to be drop dead honest I don't wanna know because in my humble opinion this is the most dangerous CSRF issue I have ever seen before. Please check your admin panel if you own web space or a server and inform your provider if you happen to find similar problems. Also make sure to use [NoScript](http://noscript.net/) to avoid having taken away your web server via cross-site form requests. I hope this article showed once again what kind of dangers are related to CSRF attacks - even if they are not combined with XSS. 

**UPDATE:**

I had phone and email contact to the vendor and several vulnerabilities have been patched already. The CSRF will be fixed within the next days. Hats off to the fast response - the first mails and calls between the vendor and me were done Saturday and Sunday, the first fixes were deployed Sunday night.
