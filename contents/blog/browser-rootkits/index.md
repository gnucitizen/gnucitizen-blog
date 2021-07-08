---
title: Browser Rootkits
author: pdp
date: Tue, 16 Oct 2007 10:41:12 GMT
template: post.pug
---

One of the big stories that hit the security field in the last couple of months, was the debate whether virtualization-based malware can be detected or are they 100% invisible to the systems they infect. Joanna Rutkowska, the researcher behind the [Blue Pill rootkit](http://bluepillproject.org/) and the whole **ghost in the system** movement, has done some amazing work on this subject, which is greatly appreciated, although I would have taken the research into a completely different direction - **browser rootkits**.

The **browser rootkit** is a completely different type of malware which many underestimate. Why? Because researchers believe that rootkits in the browsers wont give the same level of control they can otherwise obtain by simply installing an application which hooks to important kernel interfaces. I find this assumption wrong and believe that we will see more browser based malware in the future as Web technologies continue to grow and mature.

## Browser Rootkits advantages

IMHO, one of the strongest points which support my statement is the fact the browser rootkits are in general closer to the data. "The closer to the data the better!" - as I often say. The e-crime economy have been drastically changing since its early days. In the past attackers were after owning the box. Today they are after your data because after all, the data is the ultimate goal of most of the break-ins. The browser is a middleware - a platform between the user, the private and corporate assets. Therefore, it seams to be the best choice for a compromising backdoor.

On the other hand, browser rootkits cannot be easily detected by modern antivirus and antispyware agents. This is mainly due to the way browsers function. Lets take Firefox for example. Firefox is a complex, dynamic project which is subjected to regular updates. A big portion of the browser is written in scripted languages such as JavaScript and Python and supporting formats such as XML, RDF, XUL, XHTML and others. Given the fact that any of these components can be modified to serve the rootkit purpose, the antivirus agents need to be capable of understanding the technologies involved in Firefox in order to prevent or ensure the malware detection. Though, such features can easily get out of scope and therefore may not be implemented.

Some of you may argue that antvirus and antispyware agents could detect potential infections by relying on the same old signature matching techniques. This is also doomed to fail mainly because prototype based languages such as JavaScript can be easily mutated. XML, the key supporting format of Firefox, is also quite dynamic and has some strong polymorphic characteristics which can be easily taken advantage of with something as simple as XSLT (Extensible Stylesheet Language Transformations).

Let's not forget the fact that the browser is a key business software which is usually allowed to get out (surf the Web), directly or via a Web proxy. The browser is configured to communicate by default. This ensures that the rootkit software can always get out and also let the rootkit master in, circumventing any restriction that may exist in between. There is no other technology that matches the same level of interoperability and communication power.

Last but not least, browser rootkits are portable when the browser itself is available to more then one platform. Firefox, again, is one of the most vivid examples. Firefox extensions, which can be easily turned into rookits, are OS independent. A single rootkit can infect Windows, Linux and MacOS at the same time without the need for reorganization of the source code. This feature makes browser rookits the perfect malware.

## Closer look at the Browser Rootkits

Those familiar with the way browsers work may already have ideas how browser rootkits are written and what they can do. I am sure that most of you think about Firefox extensions or Internet Explorer components, but there is a lot more then that.

The rootkit author can take on many different strategies. The following listing shows some of the things that are possible:

* **Obscure browser extensions** - the most common place a rootkit may exploit. The extension will be visible to the system and the user but at the same time will remain hidden by tricking the user into believing that it is an important browser component.
* **Hidden browser extensions** - rootkits masters can hide the presence of malicious extensions from the user. This is the default behavior of Internet Explorer components. Firefox extensions can also be made hidden by suppling a special field with the value of **true** in the Install manifest file.
* **Backdoored install base** - the rootkit can simply infect common browser components that are already in place. Firefox, for example, is shipped with **browser.jar** located in the application folder. This JAR archive contains the default Firefox GUI interface and all basic components, all written in XUL and JavaScript. Rootkit masters can simply smuggle their own JavaScript into **browser.xul** part of **browser.jar** and as such root the default GUI.
* **3rd-party rootkits** - browsers are complicated piece of software which interacts with many 3td-party components such as Adobe PDF and Flash. These technologies can be easily rooted as well. In terms of Adobe Reader and Acrobat, the rootkit master can simply copy a simple JavaScript file inside the PDF script auto run folder. Every time the victim opens a PDF, the rootkit will execute which, as a result, will grant control to the attacker. In terms of Adobe Flash, the rootkit master can weaken the Flash settings to allow certain external sites to perform restricted operations circumventing the plugin security policies. Let's not forget that rootkit masters can simply register additional browser plugins which will hook on important browser hooks.
* **Extension of an extension rootkits** - these types of rootkits take a form of an extension for a browser extension (i.e. userscripts for Greasemonkey). They can be trivially installed and can hook on external XSS proxies from where they can be controlled.

As you can see, browser rootkits are probably the future of malware. In the wrong hands, browser technologies are power tools that can be used to keep unaware puppets on a string. I am planning to follow up this post with a more detailed example of how browser rootkits are developed and show some interesting functionalities which can enable attackers to go so deep, no other has ever been.
