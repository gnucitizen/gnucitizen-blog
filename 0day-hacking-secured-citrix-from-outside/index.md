---
title: 0day Hacking Secured CITRIX From Outside
author: petko-d-petkov
date: Wed, 10 Oct 2007 15:40:34 GMT
template: this/views/post.jade
---

In the true spirit of GNUCITIZEN half(partial)-disclosure movement, we announce that it is possible to gain user access level on CITRIX. The bug/feature does not rely on any client/server vulnerabilities nor client/server misconfiguration issues. All an attacker needs to do to exploit the weakness is to lure a victim to a malicious website or trick him/her into opening specially crafted ICA files. The attack results into remote command execution inside CITRIX with the access level of the current user.

The success of the attack relies on the fact that the victim is part of a CITRIX ring to which he/she can perform pass-through authentication. Once a connection is instantiated, the victim will unwillingly and transparently login into CITIRIX and perform several commands specified by the attacker. The attacker can simply instruct the remote desktop to download files from a remote TFTP server and execute them locally. Once the attack is performed, the local connection is terminated and the CITRIX session is cleared. No user interaction is required!

> If you manage to re-discover the type of vulnerability outlined in this post, I encourage you to keep it private. Give some time for the folks at CITRIX to react. Currently, I am not aware of any remedy against the attack apart from turning off pass-through authentication. Given CITRIX's popularity among corporations and big organizations, it is highly recommended to take this warning with extra caution.
