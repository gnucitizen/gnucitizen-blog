---
title: Let's Fix The Web
author: petko-d-petkov
date: Sun, 31 Aug 2008 08:12:25 GMT
template: this/views/post.jade
---

I am heavily frustrated from the way the Web works today. Everything seems to be broken beyond reason. I really want to fix the damn thing but I realize that it is not up to me to do that. It is up to all of us to make sure that code is written in the most secure possible way. Can we do that? Perhaps not! What can we do then?

Before I get to the point, I need to tell you how I fixed my insecure Wordpress blog. Wordpress has many security shortcomings and I was so frustrated that I decided to fix whatever I can once and for all. I believe that we can fix the Web in a similar way, but first these are all the patches that were implemented:

* mark all cookies as `secure` to prevent leakage over unencrypted channels
* mark all cookies as `httpOnly` to prevent session hijacks due to Cross-site Scripting vulnerabilities
* if you try to login, force SSL to prevent leakage of credentials and other sensitive data
* when logged in, make sure that all URLs are HTTPS enabled to prevent leakage of sensitive information
* when over HTTPS make sure that all URLs that point to your domain start with `https://` to prevent leakage of any data
* restrict 443 (HTTPS) to blog users and admins only
* disable error messages everywhere to prevent leakage of sensitive information
* allow upload of only known file types such as jpg, gif and png (I will add a check for the [gifar](/blog/gifars-and-other-issues/) problem soon)
* embed an IDS type of solution ([PHPIDS](http://php-ids.org) in my case) to block known attacks
* integrate with blogsecurify to enable continues security checks and warn the admin if a problem is found

I believe that this makes the blog a lot more secure. There still might be ways to attack it but this is all I can do in the most reasonable possible way, without completely breaking Wordpress. All of these fixes are implemented as a plugin which I will make available for free download soon.

So how can we fix the Web? I have a few ideas in mind and all of them can be implemented. Here they are:

* allow the user to sandbox and unsandbox applications and web resources with a single click
* sandbox by default known applications such as GMail, Yahoo Mail, etc.
* in the sandbox, mark all cookies as `secure` to prevent session leaks
* in the sandbox, mark all session cookies as `httpOnly` to prevent session hijacks due to XSS
* make sure that while on HTTPS, all embedded resources are delivered over HTTPS as well.
* provide the option to turn off JavaScript, JAVA, Flash, SilverLight, etc on per-sandbox basis
* block any external requests to sandboxed applications
* implement the PHPIDS signature matching mechanism in JavaScript
* if the HTML structure is heavily broken, block the page to prevent some types of persistent XSS
* record ssl signatures on trusted network and warn if signature changes while on untrusted network

I think that this type of solution will make the Web a lot more secure. It definitely wont fix it, but it will make the majority of attacks not easy at all. It will block the majority of CSRF and XSS attacks. It will provide certain mitigations against persistent XSS attacks. It will provide some mitigations against Browser exploits which employ Flash or Java technology to exploit the browser. It is not perfect, but it looks good enough to me.

Next stop: actually fixing the browser!
