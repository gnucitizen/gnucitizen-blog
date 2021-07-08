---
title: The Generic XSS Worm
author: david-kierznowski
date: Wed, 20 Jun 2007 22:52:15 GMT
template: post.pug
---

When we think of computer worms, we generally think about operating-system based worms such as the famous Code Red, which replicated itself 250,000 times in approximately nine hours on July 19, 2001. Its replication was made possible by a vulnerability within MS Windows platform. Firewalls and defense in depth help mitigate the spread of worms by providing layers of protection between public and private networks; however, a new age worm is upon us, the XSS Worm aka the Web 2.0 worm.

The Samy XSS Worm - the first of its kind to make headlines carried a payload that would display the string "but most of all, Samy is my hero" on a victim's profile. When a user viewed that profile, the worm would infect the visitor's profile via a Cross-Site Scripting payload. Within just 20 hours, of its October 4, 2005 release, over one million user profiles were infected, making Samy one of the fastest spreading viruses of all time. In this post, I am going to summarize several publicly discussed JavaScript Malware techniques and depict how future worms may look like, based on what we have today.

XSS is a powerful engine on which to build a platform independent virus and whether we are ready or not, attackers are definitely going to be utilising these techniques in the future and the ground work and education factors must be put into place now. Think about this, an XSS engine has the potential to propagate much faster than an operating-system based worm, requires less effort in many cases (not all), requires little or no authentication and is client-side which means the XSS engine can propagate across network boundaries utilising the user's circle of trust. This is almost the antithesis of traditional worms, which are server-side meaning it struggles to propagate over network boundaries and they usually require high operating-system level access.

XSS engines will require these fundamentals:

* ability to identify targets (the XSS vulnerability)
* an XSS payload (the purpose or exploit); and* continuity (the propagation technique)

This article will introduce Scrape, Specific and Generic XSS engines.

## Scrape

Scrape XSS Worms utilise external resources to identify targets (i.e. Google, xssed.com) - pdp recently released an article titled, [The Next Super Worm](/blog/the-next-super-worm) which basically uses [xssed.com](http://xssed.com) to identify vulnerable targets.  Note that this example "scrapes" the targets from a third party resource.

## Specific

Specific XSS Worms usually have an individual target - the Samy XSS worm is a perfect example here. It exploited a specific vulnerability in a specific target. Its focus is not to spread across network(s) but rather to remain in once place infecting a particular aspect of a website or service.

## Generic

Generic XSS Worms which make assumptions - an example here would be a worm which exploits environment variables in application frameworks like PHP's `$_SERVER['PHP_SELF']`. This method is ideal for blind XSS worms, where you do not know what the web server is running ( i.e. my [wp-scanner](http://michaeldaw.org/news/news-100607/) tool uses generic XSS tests to find vulnerabilities in WordPress themes; it doesn't care what theme the user is running). Another really good example is Solarius's recently found XSS [vulnerability](http://www.securityfocus.com/bid/23832) in ASP.NET's `PATH_INFO` variable which affects the latest version of SharePoint and possibly many other ASP.NET applications. The Generic XSS engine category could also extend to include web server or application flaws (i.e. XST, Universal PDF XSS etc).

> I hope I have given you some fruit for thought, and to encourage the Internet community to move forward in coming up with new techniques, methods and strategies to combat the rise of client-side flaws. Web 2.0 security will require us to lengthen our strides if we are to come up with effective solutions; a number of excellent contributions and ideas have already begun and we encourage these individuals and organizations to continue on.
