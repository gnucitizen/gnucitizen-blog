---
title: More Penetration Testing Goodness with Jeriko
author: pdp
date: Tue, 07 Apr 2009 21:14:29 GMT
template: post.pug
---

Over the last couple of weeks I've added more features to the [Jeriko](http://code.gnucitizen.org/jeriko) toolkit which I briefly covered in my post over [here](/blog/you-dont-need-the-ultimate-pen-testing-framework/). For those of you who don't know, Jeriko is a compilation of various bash scripts to ease manual penetration testing practices. The idea is to automate only the things which are sort of boring.

Anyway, now you have a few more scripts at your disposal. The most notable changes are the ability to discover service versions via `extract-services`, the ability to discover and generate URLs from services which offer HTTP (courtesy of `generate-url-batch`, `expand-url-credentials` and `expand-url-dirs`) and the ability to grab screenshots of all web servers via `scan-browsers`.

Personally, I find the `scan-browsers` script extremely useful. Let's say that you encounter a bunch of web servers but you don't know what they are for. You can fire the browser and start executing URLs one after another but that will take time and you can easily get confused. Instead of doing that you can do the following:

	$ generate-url-batch | scan-browsers

This command will iterate over each discovered HTTP server and take a screenshot of the front page. The script can be safely executed even in environments which do not have the X server installed. In fact, you do not need it at all, because the script relies on a virtual framebuffer server.

After the command completes, you will have your current working directory populated with the screen grabs. Now you can use your default picture viewer to see all web servers quite rapidly. This script is also handy in pentests when you need to take evidence of particular vulnerable web servers/applications.

_Although Jeriko is already useful, I am planning to totally redesign the platform. Future versions will have more granular control over the pentesting process and the ability to automate large chunks of boring activities._
