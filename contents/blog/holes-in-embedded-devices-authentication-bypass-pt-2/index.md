---
title: Holes In Embedded Devices Authentication Bypass (pt 2)
author: pagvac
date: Fri, 15 Feb 2008 17:18:09 GMT
template: post.jade
---

Usually, when accessing a web interface of an appliance, the user is prompted to enter a password if not authenticated already. This could be done via a HTML form on the login page or a basic HTTP authentication prompt (among other methods).

Let's call the **authentication stage: A**. Once, the admin user enters a username/password combination, the device checks the provided combination against credentials stored in its internal configuration. Let's call this **password checking procedure: B**. After authenticating with the correct credentials, the admin user would be presented with a menu which offers all the administrative functionalities available. Let's call any of these **administrative URLs: C**.

## "A-to-C" Attacks a.k.a. Knowledge Of "post-authentication" URLs

The problem is that the authentication mechanism of some embedded devices is so poor, that when an unauthenticated user requests a URL that would usually only be available after logging in, the device won't even ask for a password. This is due to the >logic of the authentication algorithm which assumes that if the requested URL is part of the administrative menu, then the user must have provided a valid username/password combination already. Instead, the device should check if the user is in fact authenticated with every single HTTP request (i.e.: via session IDs).

The result is devastating as the attacker can completely bypass the authentication and perform tasks with full administrative privileges by simply accessing certain URLs.

One could argue that the real problem is that the developers of the vulnerable web interface made the naive assumption that an attacker would never be able to guess the URL path of an administrative page. However, we all know there are several ways an attacker could have knowledge of such URLs. The following are just some examples:

* **By sniffing cleartext HTTP traffic** between the admin user and the target device (the attacker would most likely be located in the same local subnet as the admin user in this attack)
* **By bruteforcing administrative URLs** (admin URLs are sometimes highly-guessable such as `/WAN.html` - for WAN settings)
* **By learning about a A-to-C auth bypass vulnerability** via public or private vulnerability research
* **By looking up support information** on the vendor's site (i.e.: manuals)

The following is the pseudocode of the authentication algorithm of a device that blindly trusts the user when requesting administrative URLs:

1. Prompt user for admin username and password
2. Check if provided credentials match internal configuration
3. If so, then provide access to administrative menu (no more auth checks are performed after this)
4. Else prompt user for admin username and password again

It is recommended that you check devices in your network for this kind of issue. Remember, the [router hacking challenge](/blog/router-hacking-challenge) hasn't finished yet, so keep the bugs coming! For those stuck who don't know what else to check besides XSS and CSRF you might be interested in [reading](/blog/holes-in-embedded-devices-authentication-bypass-pt-1)  [the previous](/blog/holes-in-embedded-devices-ip-based-session-management) "[Holes in Embedded Devices](/blog/holes-in-embedded-devices-binary-state-session-management)" [posts](/blog/holes-in-embedded-devices-desynchronized-service-acting-as-backdoor).

By the way, the "Holes in Embedded Devices" posts is an ongoing series of posts, so stay tuned!
