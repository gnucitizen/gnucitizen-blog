---
title: Attacking Password Recovery Facilities
author: pagvac
date: Fri, 06 Jul 2007 08:54:44 GMT
template: post.pug
---

Today, most public websites offer the following 3 functionalities: account login facility (login page), account signup facility (account registration / create new account page) and password recovery facility (forgot password page). This is especially true on e-commerce sites with a large user base.

The nature of password recovery facilities can vary but we usually stumble across the following types: secret answer, email containing the original password, email containing a password reset link, email containing a new password. Again, these are the types of things typical web applications would have. In general, they are essential to the overall security of the web applications we are testing, so it is important to have them in mind. In this post, I am going to talk about attacking password recovery facilities briefly. I am also going to show you a simple trick that I've learned along the way, but before that, let's have look on the various types of password recovery facilities and see what's the most convenient way to attack them.

So, let's take on the first type. In secret-answer password recovery facilities, the user is asked something only he is supposed to know. This is a functionality that can be attacked via social engineering attacks by learning personal information about the victim (date of birth, mom's maiden name, mascot's name, etc...) . This is one of the two options provided by [Hotmail](http://www.hotmail.com/) ("Forgot your password?" link) to recover passwords, for example. This type is quite common for most of the applications.

In the second type of password recovery facilities (email containing the original password), the user is emailed his/her original password. As a security analyst you're supposed to flag this to your customer because it means that passwords are being stored in the backend DB servers either in the clear or in a reversible form. This is obviously a lack of security for users' sensitive data. Passwords should always be hashed whenever possible, and salted in order to make the process of breaking the hashes (i.e. rainbow tables lookup) unfeasible. Simple!

In the third type of password recovery facilities (email containing a password reset link), the user is emailed a link so that when they click on it, he/she can set a new password for their account. This link is of course supposed to be non-predictable. However, if you can crack how the link is constructed that would mean you could hijack any user account as well.

Finally, the last type of password recovery facilities (email containing a new password) the user is emailed a newly-generated password. Again, these passwords are meant to be non-predictable. However, if you can predict them then you could also hijack any other user account. For example, what if the newly generated password for your account was today's date plus a 4-digit number. i.e.: _02072008-1337_, where '`02072008`' is today's date, and '`1337`' is a random 4-digits number. In this case, it is obvious that the attacker could crack the newly generated password by sending around 10,000 requests to the server. If we tried one password per second it would take less than 3 hours to crack the password.

Usually, whenever we want to attempt to break the reset-password link or the newly-generated passwords we need to do sampling, and this is what I would like to bring your attention to. So, basically, we want to collect a relatively big number of strings to crack. Ideally, we want them to be requested one after the other, without waiting too much time between responses, just in case the strings are based on time. The closer they are to each other in time, the more likely it is to notice a pattern.

The problem with sampling such strings is that you need to programmatically check the inbox of the email address that you used to register your account on the target site. If you administrate your own mail server, it can ease the task of reading the emails through your attack script (the attack script would make X number of "forgot my password" requests). A different option would be to programmatically log into your webmail service and parse the strings sent by the target site. However, this is extremely non-practical and annoying. Imagine writing a script that authenticates to your gmail account and parses the content of emails? This is crazy!

Here is the magic. For me, the best way to perform sampling on strings from an email inbox is to use my favourite disposable email service: [mailinator.com](http://mailinator.com/)

Mailinator is one the coolest ideas I've seen on the web. It's meant to be used for junk emails and things you don't care about. You don't have to register to have an account. Just choose any username without even visiting www.mailinator.com. i.e.: myrandomusername. That means that your disposable email address would become: `myrandomusername@mailinator.com`. The beauty is that all usernames are pre-created and you don't need to login to check your inbox. Just visit `http://mailinator.com/maildir.jsp?email=**myrandomusername**`

Reading emails programmatically from your scripts is easy, as the URLs follow a simple syntax and you don't even need cookies to access them. Here is an example:

* `http://mailinator.com/showmail.jsp?email=myrandomusername&msgnum=0`
* `http://mailinator.com/showmail.jsp?email=myrandomusername&msgnum=1`
* `http://mailinator.com/showmail.jsp?email=myrandomusername&msgnum=2`
* `http://mailinator.com/showmail.jsp?email=myrandomusername&msgnum=[\d+]`

So, in order to collect our sampling we will do it in 2 steps:

1.  Make X number of requests to receive a new password or password link
2.  Programmatically access http://mailinator.com/showmail.jsp?email=myrandomusername&msgnum=[\d+]

How do we do that? Bash to rescue. Here is the code:

    #!/bin/bash
    # request 100 new passwords / password links

    for ((i=0;i<100;++i))
    do
    curl -s -d "email=myrandomusername@mailinator.com" --url "http://target-domain.com/forgotpassword.php"
    done

    The script above performs subsequent password-recovery request, while the script above programmatically checks our inbox. Neato!

    #!/bin/bash
    # access first 100 emails programmatically

    for((i=0;i<100;++i))
    do
    # change grep and cut commands to suit your needs
    curl --url "http://mailinator.com/showmail.jsp?email=myrandomusername&msgnum=$i" | grep '<br><table width=600><tr><td class=bodytext>' | cut -d '>' -f 5 | cut -d '<' -f 1
    done

Additionally you could use public HTML-parsing services to facilitate the process of extracting information even more. I recommend checking out [pdp's research](/blog/6th-owasp-conference/) on this subject.

So, this is it; very simple and effective method you can use in your pen-testing toolbox. I hope that it was useful.
