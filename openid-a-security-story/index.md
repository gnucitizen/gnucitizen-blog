---
title: OpenID - A Security Story
author: petko-d-petkov
date: Mon, 20 Aug 2007 10:15:48 GMT
template: this/views/post.jade
---

The other day Eugene Tsyrklevich has pinged me about his talk on OpenID security in regards to my [article](/blog/identity-20-security) on Identity2.0 security issues that we face today. Eugene has presented an co-authored his research with Vlad Tsyrklevich at this year's BlackHat US. You can get the slides from over [here](https://www.blackhat.com/presentations/bh-usa-07/Tsyrklevich/Presentation/bh-usa-07-tsyrklevich.pdf) and read the whitepaper from over [there](https://www.blackhat.com/presentations/bh-usa-07/Tsyrklevich/Whitepaper/bh-usa-07-tsyrklevich-WP.pdf).

To summarize, the following issues are present with the current implementation of OpenID:

* **Phishing Attacks** - this is probably the biggest concern when dealing with OpenID. Users may be tricked into providing their credentials to 3rd-party websites.
* **Man-in-the-middle Attacks** - the connection is negotiated over DH (Diffie-Hellman) which is subjected to interception attacks. Ensure that you are using HTTPS.
* **Replay Attacks** - the URL from the relaying party can be sniffed, unless over HTTPS, and as such being replayed. This is not that critical since if the attacker can sniff the wire(less) they can as easily wait for the authentication to complete and then steal the session identifier.
* **CSRF Attacks** - once the user is logged in, attackers might be able to execute a series of CSRF (Cross-site request forgery) attacks against the identity provider or other sites where the user is logged in. "OpenID makes authentication easer so why don't we login everywhere?"
* **XSS Attacks** - once the user is logged in attackers might be able to execute a series of XSS (Cross-site scripting) attacks against the identity provider, in which case they will be able to hijack the entire on-line use presence, or other sides, in which case the attacker will be able to gain access to the session. "Again, OpenID makes authentication easer so why don't we login everywhere, at the same time? Sounds like a good idea!"
* **Miscellaneous Attacks** - all other types of Web Attacks are applicable to OpenID clients and servers. The only difference is that the result may turn to be quite nasty.

Other then that, OpenID is a great idea. It works and it scales quite well. However, make sure that you are protected against the above mentioned attacks. I would suggest for browser vendors to include builtin security features such as HTTPS should be enforced by default, CSRF against the identity provider domain should not be possible, etc. This can be accomplished with quite simple plugin for Firefox. Any takers?
