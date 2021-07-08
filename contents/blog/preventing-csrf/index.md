---
title: Preventing CSRF
author: pdp
date: Fri, 30 Mar 2007 10:12:43 GMT
template: post.pug
---

During the last couple of months a lot has been said about Cross-site request forgeries and how to prevent them. Before presenting my approach of dealing with this type of attacks, let's have a look on what Cross-site request forgeries are, for one more time.

[As I have discussed in the past](/blog/cross-site-request-forgery/), CSRF vulnerabilities occur on applications which allow every request that has a valid session identifier to be processed by the application business logic. This is bad for a number of reasons. The main reason is related to the way the browser handles requests:

When you authenticate with an application the server provides you with a session identifier in a form of a cookie. The browser remembers the session cookie name, value and the domain it came from for further use. From this point on, every request initiated from browser to the application will contain the session identifier for the particular domain. The browser automatically supplies this information so the developers don't have to do it themselves.

This mechanism can be abused in a number of ways. For example if the user visits a malicious page at the same time when they are authenticated with their email account, for example, attackers will be able to silently send requests to the webmail application forging the user actions. Because the requests go through the browser, a valid session identifier for the attacked URLs will be provided. As a result, the attacker can blindly perform actions on behalf of the user.

This type of attack could be quite worrying. For example most WIFI routers are vulnerable to CSRF attacks, which make them an easy target. A malicious web page can easily forge a POST or GET request to the router address, which as a result enables the router administrative interface on the Internet facing side and resets the access credentials to something the attackers knows. Once the attacker receives confirmation that a router is compromised, she will go to this particular interface, login with the new credentials and at the end completely hijack the victim's entire Internet traffic. From this point on, the attacker will be able to sniff your requests, extract sensitive information and even attack all devises that are inside your network.

How do we prevent CSRF attacks? Well, the most common solution is to add a token for every POST or GET request that is initiated from the browser to the server. When the request arrives the business logic validates the token and allows or disallows further processing. Although it sounds easy, the developers could fall into several traps. First of all, the web application that is developed needs to contain another layer of security that handles the random tokens generation and their validation. Then the developers are most likely to do some sort of system that differentiate between forms, etc. Following all these practices can lead to a lot of trouble in future, possibly spawning new vulnerabilities.

While analysing several anti-CSRF frameworks, I realised that the solution could be a lot simpler. We don't really need tokens. We don't have to validate forms. We need unique identifiers which are provided anyway as part of the whole session management paradigm. We are going to reuse whatever is available to protect against CSRF attacks. The solution is very easy and quite generic so you should be able to apply it to your applications right away. Let's have a look at the theory side first.

So we have an application that provides a form which is vulnerable to CSRF. The form itself contains the fields name and lastname and the button submit. In order to prevent CSRF attacks, we add another field which contains the name of the current session identifier cookie name and the current session identifier cookie value. So the original form:

```html
<form>
<input type="test" name="name" value="John"/>
<input type="test" name="lastname" value="Dawson"/>
<input type="submit"/>
</form>
```

is now:

```html
<form>
<input type="test" name="name" value="John"/>
<input type="test" name="lastname" value="Dawson"/>
<input type="test" name="JSPSESSIONID" value="7af7a55caff365ca594510586"/>
<input type="submit"/>
</form>
```
When the request arrives, the business logic checks for the presence of the JSPSESSIONID field and then compares its value to whatever it has been given to the user as session identifier. In PHP this tricks can be achieved like this:

```php
<?php
	if (!(isset($_POST[session_name()]) && $_POST[session_name()] == session_id()))
		die("I must die here because someone is forging your requests");
?>
```

The session_name function is used to get the current session identifier cookie name which by default is PHPSESSIONID. The session_id function retrieves the session cookie value which is a MD5 hash.

Keep in mind that the information that we provide, in order to validate the form, is unique for the user and cannot be faked. If the attacker has access to this type of information they will go after your session because it will be a lot easier. But unless the attacker has some sort of XSS on the attacked web application, it is not possible to obtain the session cookie name and its value.

The same mechanism applies to GET requests as well, however be conscious with them because there are other traps in there which can lead to all sorts of problems.

To sum up, you can easily implement an anti-CSRF feature in your app. All you need to do is to add one extra check in your validation subroutines and modify your requests to include the necessary information. Keep in mind that the second can be achieved with a bit of JavaScript which is included on the top of every page. In theory every application can be secured using this approach without too much of a hustle. Heck, you can even implement a solution with 5 lines in mod_rewrite or mod_security. So do it. Do it now.
