---
title: Hacking Linksys IP Cameras (pt 2)
author: adrian-pastor
date: Mon, 20 Apr 2009 22:27:14 GMT
template: this/views/post.jade
category: fucked
---

_This article is a continuation of the following GNUCITIZEN article, which includes an introduction to the topic and also some initial observations: [Hacking Linksys IP Cameras (pt 1)](/blog/hacking-linksys-ip-cameras-pt-1/)._

### Privilege escalation via arbitrary file retrieval

The second vulnerability I'll be releasing is an arbitrary(ish) file retrieval vulnerability. It's not fully arbitrary because you can only retrieve the contents of files located within the same directory where the vulnerable CGI program is located. However, this is enough to allow a neat privilege escalation vector where a restricted user that only has permissions to view the video stream, can gain access to the `admin` account password.

The problem lies within the `next_file` parameter which is submitted to the `main.cgi` program. Although `main.cgi` _does_ filter characters typically used in directory traversal sequences such as dots (`.`) and forward slashes (`/`), it seems that the developer didn't consider that retrieving the contents of files within the current directory could create a security hole. By simply retrieving the contents of `.htpasswd` a restricted user which only has permissions to access the video stream can access the credentials of the `admin` account and also the credentials of other restricted users (if applicable).

The only restriction that needs to be bypassed, is dots (`.`) symbols being filtered. i.e.: the following will _not_ work and will result in a forbidden error:

    /img/main.cgi?next_file=.htpasswd

    But replacing the dot (`.`) symbol with its hexadecimal equivalent:

    /img/main.cgi?next_file=%2ehtpasswd

    Will result in the contents of `.htpasswd` being returned. i.e.:

    admin:adminpassw0rd user1:pass1 user2:pass2

Like most IP cameras, the Linksys WVC54GCA allows administrators to grant access to the video stream to selected users only (rather than anonymous users who don't need to authenticate). In this case, the admin user can click on the `Users` menu and tick the `Only users in database` option (please see screenshot below). After this, all that is needed is to add a username/password pair for the account to grant video-viewing access to:

<div class="screen">![Video User Accounts](http://www.gnucitizen.org/static/blog/2009/04/video_user_accounts.png "Video User Accounts")</div>

Well, the feature discussed above can be rendered useless by exploiting the vulnerability I have described, since it allows restricted users to retrieve the admin password.

### Testing Info

Successfully tested on:

* WVC54GCA
* Firmware V1.00R22 and V1.00R24 (latest available as on 20th April 2009)

_Please note that this vulnerability is different to [BID 10476](http://www.securityfocus.com/bid/10476/exploit) which affected the `/main.cgi` program rather than `/img/main.cgi`._
