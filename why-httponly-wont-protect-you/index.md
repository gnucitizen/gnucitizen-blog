---
title: Why HttpOnly Won't Protect You
author: petko-d-petkov
date: Thu, 12 Apr 2007 08:27:07 GMT
template: this/views/post.jade
---

Before going in depth criticizing the **HttpOnly** session protection mechanism I better explain what it is and why it is useful.

**HttpOnly** is a session protection mechanism, as we established from the previous paragraph, which is used in situations where the session cookie is not required to be available inside the application DOM. Session identifiers are responsible for keeping the state between the browser and the remote server. They are needed only for this reason. In situations where the client or the server is vulnerable to XSS (Cross-site Scripting), attackers can easily retrieve the session identifier by querying the `document.cookie` object. The retrieved information can be sent to a remote collection point which is controlled by the attacker. Once the session identifier is collected, the attacker will be able to hijack the user session.

**HttpOnly** is a an option which specifies that the cookie (session identifiers included) should not be accessed from the application DOM. In that case the attacker cannot hijack the session because `document.cookie` will not return anything useful.

IMHO, **HttpOnly** create a false sense of security. **HttpOnly** does not solve any problem at all. For more information about **HttpOnly**, you can read the MSND [article](http://msdn.microsoft.com/workshop/author/dhtml/httponly_cookies.asp). The article is entitled "Mitigating Cross-site Scripting With HTTP-only Cookies" which I think is quite wrongly put. Here is a typical example of how to declare a HttpOnly session identifier:

	Set-Cookie: SESSIONID=[token]; HttpOnly

The **HttpOnly** protection mechanism is useful only in case where the attacker is not skillful enough to undertake other means for attacking the remote application and subsequently the user. Although, session hijacking is still considered the only thing you can do when having XSS, this is for from what is actually possible. The truth is that session hijacking is probably one of the least things the attacker will do for a number of reasons. The most obvious reason is that XSS attacks, although could be targeted, are not instant, like traditional buffer overflow attacks where the attacker point the exploit to a remote location and gain access right away. For an XSS attack to be successful, sometimes it is required a certain period of time to pass until the victim opens a link or do something else. It is highly unlikely that the attacker will wait all the time just to get a session which could be invalidated a couple of moments later when the user clicks on the **logout** button. Remember, session hijacking is possible because concurrent sessions are possible.

The only and most effective way to attack when having a XSS hole is to launch an attack right on place when the payload is evaluated. If the attacker needs to transfer funds or obtain sensitive information, she most probably will use the `XMLHttpRequest` object in the background, to automate the entire process. Once the operation is completed, the attacker could leave the user to continue with their normal work or maybe even gain full control of the account my resetting the password and destroying the session by performing a logout operation.

**HttpOnly** does not protect against all that and it never will. If you plan to use this technology keep in mind that you are still required to make sure that your site/application is XSS free.

_If implementing the **HttpOnly** protection mechanism introduces other problems, you may safely ignore it for the time being. Concentrate on the user input and make sure that nothing is rendered without being carefully sanitized._
