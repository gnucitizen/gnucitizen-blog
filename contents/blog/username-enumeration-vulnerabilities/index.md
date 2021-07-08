---
title: Username Enumeration Vulnerabilities
author: pagvac
date: Wed, 04 Apr 2007 09:34:18 GMT
template: post.pug
---

We all know what username enumeration vulnerabilities are about. In this post, I will talk about them within the context of web application pentesting and will discuss some of the common issues I've come across during my experience while working at [ProCheckUp](http://www.procheckup.com/).

So basically we have an application that will reveal to us when a username already exists on the system. If you do a bit of [research](http://www.google.com/search?q=username+enumeration+vulnerability&num=100) on this type of vulnerability, you usually find the example of a login page which, when submitting wrong credentials, will specifically inform the user (and attackers) whether the entered username is already present on the system or not. This is what I like to call a username enumeration vulnerability of _bruteforcable_ type, because we usually run a dictionary attack to exploit the responses of the application. There is another type of username enumeration vulnerability which I would like to call _dumpable_. In dumpable username enumeration vulnerabilities, the target application coughs up a list of existing usernames. You might wonder how this could happen. I've seen it work by accessing exposed config files (i.e. `users.conf.xml`). Another example that comes to my mind is portal applications which sometimes allow you to do advanced searches and obtain lists of usernames existing on the system without requiring you to be logged in. In this post, we will focus on _bruteforcable_ username enumeration vulns.

Although nothing stops you from blindly trying common set of credentials such as `admin/admin`, `admin/password`, `test/test` and so on, enumerating usernames does definitely increase the chance of an account being cracked. Think of username enumeration as the first stage in the process of cracking a set of credentials. The problem is that not all web applications are vulnerable to this type of flaw. However, there are ways we can push the limits.

Let's say that you access `https://acme-site.com/logon.aspx`, and you try to authenticate with the credentials `madeupusername/password`. The application, if vulnerable, will respond with a message similar to the following one:

> Authentication failure: entered username does not exist.

However, if we enter an existing username, the application will then give a different message such as:

> Authentication failure: incorrect password entered.

Username enumeration vulnerabilities can be found in several other ways besides probing changes of responses in login authentication errors. I've seen four different ways to find bruteforcable username enumeration issues:

* analyzing changes in error messages on login facilities (as discussed above)
* analyzing changes in error messages on password recovery facilities
* analyzing changes in error messages on account signup facilities
* probing existing URIs

Each of these types have pros and cons. If I could choose out of all of them I would definitely pick the last two (I'll explain why later).

Login facilities (login pages) are the most popular way to find username enumeration on web apps. However, for this very reason , its popularity, security-aware developers might have already considered the issues related to having a login error reveal existing usernames. In other words, you're less likely to enumerate usernames through a login page. Please note that I'm _not_ saying it's rare to find username enumeration vulns on login pages, but rather that they are simply less likely to be found than other types.

The second problem with enumerating usernames through a login failure is that you are at risk of locking out accounts if a lockout account policy is enabled. Although only one authentication error should not lock out an account, you're playing with fire. Say that you're writing a script to enumerate usernames using a dictionary attack. While tweaking the script you may probe some usernames more than once, therefore taking the risk of locking out the target accounts.

For the second method, analyzing changes in error messages password recovery facilities, again, as an attacker/pentester you're exploiting differences in the application response. Typically we find a **Forgot password** feature that allows you to receive an email with a new password (or a link that allows you to set a new password). All the user usually needs to do is enter his username or email address.  Now, sometimes the email address is used as the username to log into the application. In fact, this is the case on most e-cart sites. Designing the application to use the user's email address as the username is common because it's less likely for someone to forget his email address than a login name.

<div class="message">Remember: there many web applications that allow users to set their username to something different to their email address. Thus, making automated username enumeration more feasible.</div>

A password recovery facility that is vulnerable to username enumeration (most of them out there are) might return an error message like the following when entering an email address that does _not_ exist:

> Sorry, the email address entered does not exist.

On the other hand, entering a _valid_ email address would look like similar to this:

> A new password has been sent to your email address.

In short, this method for enumerating usernames is good as a last resort, because _most_ web applications allow usernames to be enumerated through the password recovery facility. However, from the stealth point of view, this is the worst way to enumerate usernames. Think about it, if you _do_ successfully enumerate a valid username, the target account's owner will get an email with a new password. This is pretty noisy, since you're telling the victim user: "Hey, I'm probing your account!". Even worse, sometimes these reset password emails will include your browser's User-agent header value plus the source IP address that was used to request a new password! Not that I am saying that it is not possible to hide your POP.

Let's now talk about the third method for enumerating usernames: analyzing changes in error messages on account signup facilities. This method is great for three reasons:

* it always works! (provided that an account signup facility exists)
* the victim user won't know his/her account is being probed (no emails sent to the victim user for instance)
* account lockout policies won't disable the target account no matter how many times we probe a given username

Again, this is the same old story. We send a request, in this case typically through a form to register a new account. If the account signup facility is vulnerable to username enumeration, we will get an error message similar to the following when entering an existing username (login name/email address):

> Sorry, there is already an account registered with the same email address.

Otherwise, if the entered username does _not_ exist, the account signup process will proceed to the next step (if any), or simply finish successfully.

<div class="message">I recently came across an interesting example while performing a [PCI DSS](https://www.pcisecuritystandards.org/tech/) test at [work](http://www.procheckup.com/). In this case, we were testing an online retailer, and performed a proof-of-concept username enumeration attack against the account signup facility. The result was quite successful since we enumerated more than 600 usernames. Eventually we cracked about 40 accounts by simply bruteforcing a few common passwords against each of the usernames we had enumerated previously. This case was particularly interesting because the site allowed users to change their login name from their email address to any value of their choice. Since many users chose dictionary words, digits, three-letter long and other predictable strings as their usernames, the results were more effective than expected.</div>

If you are a developer you might be wondering how you can protect your site against this kind of attack. Well, although it's virtually impossible to make an account signup facility immune to username enumeration, it is however possible to avoid _automated_ username enumeration attacks against it by implementing a [CAPTCHA](http://en.wikipedia.org/wiki/Captcha) mechanism.

Finally, the last method to enumerate usernames is probing existing URIs. I haven't seen this work on high-profile web applications, but it should be mentioned nevertheless. Let's say that the there is a portal hosted on `https://acme-site.com/` that is used by employees of _acme_. In this portal, a different directory is assigned to each user's home page. For instance, for the username _victimuser_ there will be a directory called `/webhome/victimuser/`.

If the web server responds differently when requesting existing directories, then we can enumerate usernames. For instance, it is very common to see web servers return `403 Forbidden` error codes when trying to access a directory that exists, but the user is not allowed to access. Otherwise the server would usually return a `404 Not Found` error code.

Think of [del.icio.us](http://del.icio.us/) for instance. Every user is allocated an URI equals to his/her username. For instance, if your username is hacker, then the URL `http://del.icio.us/hacker/` will exist. On the other hand, if the username probed does _not_ exist (i.e.: `http://del.icio.us/madeupusername/`), the server might respond with a `404 Not Found` error code. Of course, because of the nature of del.icio.us, this is not a big deal. After all, the site only provides a public bookmarking service, so no sensitive data is at risk.

As a final note, let me say something about webapps that use email addresses as login names/usernames. In this cases you might think that it's pretty pointless to find a username (email) enumeration vulnerability. After all, how likely is it that you will find a valid email address since, not only you need to guess the username (i.e.: targetuser), but also the domain name (i.e.: `targetuser@acme-shopping.com`). Well, the truth is that some sites do actually have test accounts and sometimes even administrative accounts that authenticate through the _same_ login page as regular users. In these cases I always try common usernames with a domain equals to the site that I'm pentesting. In other words, if you are testing a site called `www.acme-shopping.com`, you should try to enumerate usernames such as `test@acme-shopping.com`, `support@acme-shopping.com`, `admin@acme-shopping.com`, `acmeadmin@acme-shopping.com` and so on.

You should also search on public websites, maillists and groups for email addresses that use the target domain. An email harvesting tool might come handy in this case. Even if you know that regular users login using email addresses as usernames, you should also try common usernames _without_ appending `@acme-shopping.com`, as you never know what could work.

_I hope you found this post useful. I might do a second part that deals with exploiting username enumeration vulnerabilities as opposed to probing/identifying them._
