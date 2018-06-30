---
title: XSSing the Lan 4
author: pdp
date: Wed, 09 Aug 2006 12:41:51 GMT
template: post.jade
category: fucked
---

![Killer Tomatoes](/files/2006/08/killer-tomatoes.jpg "Killer Tomatoes")

Trust is a beautiful concept that rarely finds application in real life. Unfortunately, trust is all we've got when dealing with computers: username, password, master I am here to serve you; neither semantics nor pragmatics. The browser security model is kind of based on trust. The browser trusts websites that you trust. It relies on our judgment which is wrong most of the time.

I will try to explain how someone can launch several attacks against your internal and external networks by using JavaScript and exploiting the browser. The post is related to Cross Site Scripting attacks which just recently started to get some attention from the information security industry.

In [my](/blog/xssing-the-lan) [previous](/blog/xssing-the-lan-2) [posts](/blog/xssing-the-lan-3) I mentioned that in order to perform advance attacks the malicious script needs to implements the `XMLHttpRequest` object. I also mentioned that this can be achieved with Flash and Java as well, however none of the methods are perfect, since the browser implements cross domain scripting restrictions which disallow client scripts to perform operations on resources outside of their domain. One way to bypass this restriction is to exploit a XSS hole on the targeted domain and as such bypass the same origin policy.

This, however, has several limitations which I am not going to cover in details right now. The main problem is how to find a XSS. The attacker needs to have a versatile database of XSS vulnerabilities for different platforms and domains. Instead of wasting time on all this research, attackers can abuse the trust relationship between the browser and the websites you visit.

Here is how the attack works: The visiting user attends a page that contains malicious scriptable content. On page load the malicious script detects the browser type and version. This information is used to locate pages that are trusted by default from the browser: IE6 trusts `update.microsoft.com`, mozilla trusts none, however this may change in the future. Of course the trusted website needs to contain XSS vulnerability. This vulnerability is used to transport code from untrusted domain to a trusted one. Because the domain is trusted, all security checks are bypassed.

_From the attackers prospective, finding XSS hole in extremely popular website such as `update.microsoft.com` could be a challenge, although Cross-site scripting holes are very common. However, keep in mind that the user can flag other websites as trusted as well. In that case, all the attacker needs to do is to have a few XSS vulnerabilities on popular websites. Once an attack is initiated the scriptable content brute forces all of the websites in search for the trusted one. If a trust relationship is found, the security restrictions are silently bypassed for any other request._
