---
title: Owning Outlook Web Access (OWA) users
author: adrian-pastor
date: Sat, 08 Dec 2007 18:56:01 GMT
template: this/views/post.jade
---

What is this post about? Well, this is something that [pdp](http://www.gnucitizen.org/about/pdp) and I were playing with a few years ago. As you might already know, although we also do a vulnerability research at GNUCITIZEN, what we like the best is _insecurity by design_. There is nothing better than finding an attack vector that won't be resolved by the vendor simply because the product is designed to follow certain behavior. Personally, from a security research point of view, I think that these attacks are the best.

In this case, we forwarded our ideas along with an attack walk-through to Microsoft but they didn't consider it an issue. "Even better!" I thought, as it's one of those things that will always work on Outlook Web Access 2003 which means that you could always flag it when doing an authenticated pentest on a [OWA](http://en.wikipedia.org/wiki/Outlook_Web_Access) site. The following describes how to perform advanced phishing attacks on OWA 2K3 (might also work on older versions) _without_ relying on any bugs.

The following is the recipe for our attack. Needless to say, if any other webmail product meets the following conditions, its users can be owned in the same manner:

* Same-domain post authentication redirects are allowed
* URLs that display email attachments can be predicted

Let me explain with more detail. When a user checks an email and clicks on the attachment, a URL such as the following is visited:

    https://victim-domain.foo/exchange/pgriffin/Inbox/HELLO%20THERE.EML/1_multipart_xF8FF_2_cool-file.html/C58EA28C-18C0-4a97-9AF2-036E93DDAFB3/cool-file.html?attach=1

    At first look, the URL looks non-predictable, especially when it comes to the unique long hexadecimal string. Surprisingly though, we can get rid of the hex string and the attach parameter, and still be able to access the file sent as an attachment:

    https://victim-domain.foo/exchange/pgriffin/Inbox/HELLO%20THERE.EML/1_multipart_xF8FF_2_cool-file.html

    > I think that the hex string is the UID value which is unique to each user, however, I have not confirmed this yet.

    A more careful look at the URL reveals that all the variables can actually be predicted by the attacker:

    https://victim-domain.foo/exchange/<username>/Inbox/<email-subject>.EML/1_multipart_xF8FF_2_<attachment-filename.extension>

    Let's review these variables for a second:

* **username** - can be extracted from the victim's email address (everything before the at `@` sign)
* **email subject** - chosen by the attacker who sends the email to the victim
* **attachment filename** - also chosen by the attacker who sends the email to the victim

    Now we have all components for a successful attack. The idea is the following. The attacker sends an email with a HTML attachment to the victim. After that, he performs a phishing attempt against the victim via an exploit URL such as the following:

    https://victim-domain.foo/exchweb/bin/auth/owalogon.asp?url=https://victim-domain.foo/exchange/pgriffin/Inbox/MY%20SUBJECT.EML/1_multipart_xF8FF_2_attachment-filename.html

    After logging in successfully, the victim is redirected to the URL specified within the same domain (the url parameter) which actually opens the HTML attachment sent by the attacker. Such attachment is a HTML file that looks exactly like the original OWA login page. The spoofed login page displays an error such as "An error has occurred, please try logging in again". The spoof login page has been manipulated by the attacker so that the  action attribute points to a third-party site, where the username and password are captured by the attacker.

    > It might also be possible to use a relative path for the url parameter but I haven't tested it.

    If you ever try to probe for XSS  via HTML attachments on OWA, you'll notice that the script tags are being filtered. However, plain HTML is allowed. This means that all the tags used by the spoof login form will be rendered properly by the browser, and the username and password will be sent to the attacker's site correctly. The only one thing that OWA does change in plain HTML attachments, is that forms' method attributes are changed from POST to GET. However, the form fields are still allowed to be of type password which means that the spoofed login page will look 100% legitimate. I still don't quite get why OWA doesn't filter action attributes within HTML attachments in order to stop these type of phishing attacks.

    The beauty of this attack is that the spoof login page is actually located within the legitimate site hosting the OWA application. No bugs are exploited whatsoever, but rather, the attacker has worked out a way to host the malicious login page in the OWA site where the victim checks his email remotely.

    Now, there are a few tips that can be taken into account in order to increase the chances of the attack to be successful. First of all, the victim might notice the malicious attachment and delete it before falling for the phishing attack via the exploit URL. In order to solve this problem, one could create the email to send in such a way that it's picked up by the spammer filter and moved to the "junk" folder. Another trick to avoid the victim seeing the attachment is to send the phishing email with a `Date` header equal to a very old date, that way the email won't appear after logging in. Also, it's beneficial to choose a unique subject in the evil email. Provided that the email sent by the attacker has a subject equals to any of the previous emails, the email subject part of the exploit URL will have a dash and a digit after it. i.e.:

    MY%20TEST%20SUBJECT-2.EML

    My final tip is regarding discovering if the target company' uses OWA for webmail access. Discovering such sites is trivial via [subdomain bruteforcing](http://unknown.pentester.googlepages.com/dnsmap-latest.tar). Checking headers like the following within emails from the target domain might also help:

    X-MimeOLE: Produced By Microsoft Exchange V6.5

_Please find the POC attached to this post._
