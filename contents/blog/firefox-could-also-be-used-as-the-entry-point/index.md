---
title: Firefox Could Also Be Used As The Entry Point
author: pdp
date: Tue, 24 Jul 2007 08:11:45 GMT
template: post.pug
---

From Window Snyder's [blog](http://blog.mozilla.com/security):

> Over the weekend, we learned about a new scenario that identifies ways that Firefox could also be used as the entry point. While browsing with Firefox, a specially crafted URL could potentially be used to send bad data to another application.

> We thought this was just a problem with IE. It turns out, it is a problem with Firefox as well. We should have caught this scenario when we fixed the related problem in 2.0.0.5. We believe that defense in depth is the best way to protect people, so we're investigating it now.

> [Mozilla Security Blog](http://blog.mozilla.com/security/2007/07/23/related-security-issue-in-url-protocol-handling-on-windows/)

More information on the issue can be found at [https://bugzilla.mozilla.org/show_bug.cgi?id=389106](https://bugzilla.mozilla.org/show_bug.cgi?id=389106). For those of you who don't know what this actually means, here is my interpretation:

Every application can register protocol handler to hook on certain types of URLs when executed. Most applications do that just for accessibility purposes. This feature can be abused to launch those applications and send arbitrary commands to them. Depending what type of functionalities the attacked application may have, attackers may or may not be able to gain full access to the underlaying operating system. Here is a simple registry patch that adds a simple protocol handler called **testurl** hooked up to an application located at `c:\test.exe`:

	[HKEY_CLASSES_ROOT\TestURL]
	@=URL:Test Protocol
	"URL Protocol"=""
	[HKEY_CLASSES_ROOT\TestURL\DefaultIcon]
	@="cmd.exe"
	[HKEY_CLASSES_ROOT\TestURL\shell]
	[HKEY_CLASSES_ROOT\TestURL\shell\open]
	[HKEY_CLASSES_ROOT\TestURL\shell\open\command]
	@="\"c:\\test.exe\" \"%1\""

**taken from [Jesper Johansson](http://msinfluentials.com/blogs/jesper/archive/2007/07/20/hey-mozilla-quotes-are-not-legal-in-a-url.aspx)'s blog**

Although the user is warned that an external application is about to be executed, attackers can simply social engineer their way to make the victim approve it. How? For example, use a simple while loop that calls the URL subsequently until the user clicks on the launch button, which obviously will lead to the system being compromised.

Funny enough Firefox can be used to compromise itself. The Firefox application protocol is called `FirefoxURL`. You can call Firefox and pass values to the **`-chrome`** parameter. These values will be evaluated within the context from chrome which has full access to the local system or more precisely the local user. For more information on how to exploit the `FirefoxURL` protocol visit [Thor Larholm](http://larholm.com/2007/07/10/internet-explorer-0day-exploit/)'s blog.
