---
title: Twitter's Security is so Poor
author: petko-d-petkov
date: Thu, 29 Jan 2009 23:17:21 GMT
template: this/views/post.jade
---

...and there are a lot of privacy concerns too.

IMHO, the way the Twitter folks designed their system, is totally wrong. The one and only major concern is that 3rd-part software is allowed to communicate with Twitter's API by using the user's login credentials. This is a bit insane as you can imagine. Why would you want to share your username and password with someone you certainly don't trust? A better approach would have been if users can generate unique API keys which can be given to 3rd party applications. That way, users are not only in full control of their accounts but also, if the Twitter team decides to implement a more granular access control system at later stage, the transition will be smooth and easy.

_Did I mentioned that this way users will be in full control of their accounts?_
