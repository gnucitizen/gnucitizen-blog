---
title: One Drop on A Spider Web
author: pdp
date: Mon, 25 Jun 2007 14:56:36 GMT
template: post.pug
---

On 6th February 2007, I've published an article titled [Playing in Large](/blog/playing-in-large), which discusses various ways of injecting large JavaScript payloads into tiny XSS holes. The technique that I used as an example is quite simple. In general, all attackers need to do is to place their malicious payload behind the fragment identifier (`# sign`) and evaluate it within the attacked application context. This can be achieved by using something like this: `eval(location.hash.substr(1))`.

This works really well when you are restricted in terms of the vulnerable field length. It was found that we can squeeze XSS payloads into 50 to 60 characters in size. Keep in mind that this is only when we use script elements (`<script/>`), which is by far the longest way of doing it. In some case, we can inject a couple of MBs of JavaScript inside a vulnerable application by composing a XSS string that is around 25 to 30 characters long.

Another interesting point to outline is that the fragment identifier technique is quite stealth. Every information that is behind the hash (`#`) sign is not sent to the server. The fragment identifier is only used on the client. This means that this technique is suitable for circumventing firewalls, intrusion detection and intrusion prevention systems.

It is recommended to check the [Playing in Large](/blog/playing-in-large) article, if you are not familiar with this technique.

In this post, I will show you a technique that I have developed in the last half an hour, which is as stealth compared to what we have discussed before, but a lot smaller in terms of length of characters needed and does not require special characters such as:

* `dots .`
* `square brackets []`
* `spaces`
* `other meta characters that are usually used inside JavaScript`

The character set that is required is composed of lower case letters and the round brackets `()`. In order to explain how the technique works, I am going to lay out a hypothetical scenario which is as follows:

    https://acme.com/vuln.php3?<code>"></script><script>alert(1)</script><!--`</code></pre>

    It is clear that the example above is vulnerable to XSS. However, although we can alert the character 1 on the screen, we are not able to do anything else, mainly because the site converts special characters into underscores (`_`). This means that the payload: `"></script><script>alert(<code>document.cookie`)</script><!--</code> is converted to `"></script><script>alert(<code>document_cookie`)</script><!--</code>, which fails mainly because `document_cookie` does not exists. If we try to inject more complicated JavaScript, we pretty much end with the same problem. What's even worse, single quotes and double quotes are also sanitized.

    One thing is for sure, we might be able to inject remote script files by using various browser quirks such as `<script src=domain/script`. However, these type of payload is unstable and require to host a file in a server in rather strange way. Remember, most meta characters are not allowed, including dots (`.`) and columns (`:`).

    I was toying around this problem for a bit when I realized that the best way to bypass this restriction is to reuse something that is part of the DOM already. I needed something that fits into the following vector:

    https://acme.com/vuln.php3?**"></script><script>eval(something)</script><!--**

    ... where something is a variable part of the DOM global space and can be controlled from outside. There are plenty of such kind of variables but not that many of them are suitable for the job. For example we can inject stuff into the referrer and try to evaluate that. It is possible but very complicated since we need to find a way of spoofing this information.

    After digging into DOM I found a global namespace variable, which seamed that could work.

    `name` is a global namespace variable that defines the name of the current window. Most of the time, `name` contains nothing but a blank string. However, once we call a page within an iframe or an object with the appropriate attributes, the `name` value is changed to reflect that. In order to see how `name` looks like when opened from a browser window and an iframe try the following:

* create a blank html page with the following content: `<script>alert(name)</script>`
* open the page within your browser - you should see a blank alert box
* create a blank html page with the following content: `<iframe name="test" src="path_to_the_first_page.htm"></iframe>`
* open the page within your browser - you should see an alert box with the message test

    <div class="message">All this proves that we can manipulate the value of the global namespace variable `name`. So how this applies to XSS?</div>

    If you haven't realized yet, we can use this technique to circumvent filters in a very clever and quite sneaky way. Let's get back to our hypothetical scenario with the XSS vulnerability in acme.com which cannot be exploited easily. By using the technique I discussed above, we can bypass the restriction and here it is how:

    <iframe src="https://acme.com/vuln.php3?%22%3E%3C/script%3E%3Cscript%3E**eval%28name%29**%3C/script%3E%3C%21--" name="**/* your JavaScript payload here*/ alert('xss')**"></iframe>

If you take the code displayed above and place it inside an innocent HTML page, you will be able to XSS anyone who visits it and is on the acme.com domain, although acme does a good job of sanitizing some of the meta characters.

Some of the sceptical XSSers may not see the point of using this technique for a number of reasons. The first reason is based on the fact that there are other ways to exploit acme.com. This is true, but the example here was provided as a case study only. Very often we can `alert(1)` but nothing else, because the string needs to be short and can only contain standard characters. This is exactly when this technique is most suitable, because the character set is standard and `eval(name)` is a lot like `alert(1)`.

Keep in mind that this attack leaves a very small footprint on the attacked system. The data that is contained in the `name` variable is never submitted to the server. It is worth mentioning that HTML/XML attributes are usually allowed to contain quite a lot of data which allows attackers to include entire XSS frameworks within the boundaries of `name`.

<div class="message">To summarize, the technique presented here allows you to inject JavaScript in places where the supported character set is usually not enough. The attack footprint is very small and the payload can exceed MBs of data. This makes this technique very stealth and extremely hard to detect. The technique is a combination of reflected/dom based XSS and works everywhere where attackers can simple inject `alert(1)`.</div>

_This technique was published in order to raise the security awareness in regards to XSS (Cross-site Scripting) attacks. There are more then one way of doing things, which we usually overlook._
