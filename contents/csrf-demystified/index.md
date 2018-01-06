---
title: CSRF Demystified
author: mario-heiderich
date: Wed, 21 Nov 2007 10:22:34 GMT
template: post.jade
category: fucked
---

[Cross-Site Request Forgery](http://en.wikipedia.org/wiki/Cross-site_request_forgery) has been all over the press recently since several major sites and web applications were plagued by exploits and uncovered vulnerabilities - including [GMail](http://www.kb.cert.org/vuls/id/571584), [Google AdSense](http://www.thespanner.co.uk/2007/09/27/google-adsense-csrf-hole/) and many others. When talking to developers about CSRF there's mostly not that much knowledge and a lot of misconceptions and [FUD](http://en.wikipedia.org/wiki/Fear%2C_uncertainty_and_doubt). Sometimes the term CSRF hasn't even been heard of before. So, with this article, I will try to provide a basic explanation about the attack pattern itself, come up with several real word examples and finally summarize a list of things developers can do to protect their sites against CSRF attacks.

## What is CSRF

CSRF, in its most basic form, is certainly the most easy to create attack vector paired with almost incalculable impact on the targeted application, it's users and storage mechanisms. Imagine the following case: A User is logged into GMail and checks his mails. After she stays logged in for a while - that's a regular behavior - the user opens a new Tab and navigates to another site. This site contains code that fires a regular HTTP Request to the GMail servers - an image tag is enough to do so. Since the user is still logged in, the request is processed with her privileges - maybe changes some settings or deletes some mails, thanks to the fact that HTTP is stateless - that's it. The attack has been performed successfully and neither the user nor GMail haven't even noticed.

So the longer the session needs to time out and the more the user surfs around untrusted sites, the higher the risk is to pop onto one with a CSRF attack on it. Any tag which fires a request to an external resource can be used to perform a hidden CSRF attack - including images, link tags, some meta tags, embed and object tags and so on. Same goes for attributes which load background images or similar. You can even check if you site has been validated by someone if you replace the [DTD](http://en.wikipedia.org/wiki/Document_Type_Definition) file in the very header of the applications markup with a resource on your servers - [that's CSRF too](http://sla.ckers.org/forum/read.php?4,3528,3528#msg-3528).

So let's wrap it up - the following points are the basic things that characterize CSRF:

* As long as you are logged into Application A any other page can fire requests towards it with your privileges.
* The longer the session lasts the higher is the risk.
* It doesn't matter if the targeted functionality uses GET or POST - using POST just raises the bar a little bit.
* XSS is CSRFs are very best fried - we're going to talk about that later in this post.
* Social bookmarking is CSRFs' second best friend - remember hat the attacker needs the user to visit his prepared site?
* Complex forms or transactions with several steps are no protection against CSRF - just fire more than one request.

## A real world example

To make you understand the term CSRF even better here's a real world example. Keep in mind that we cannot uncover the platform's name and domain. Imagine a very big business platform where you can register and publish your contact details, your skills etc. You can search for colleagues and coworkers and communicate with them via the platform's messaging system. Since the owner of the platform wanted to gild the traffic, they've created the ability to register a pro account with more possibilities for the user. The user can add and edit his account or credit card information via a HTML form. And as a matter of fact this exact form isn't protected against CSRF - so the following request would actually change your account info. Say goodbye to your pro account and hello to lots of annoying trouble.

	https://our.example.com/change_account
	?paytype=debit
	&paytype_id=1234
	&paytype_field_1=123456789 // the account number
	&paytype_field_2=12345678 // the bank code
	&paytype_field_3=Richie+Rich // the account owner
	&paytype_field_4=BankOfHappiness // the bank's name
	&op=editpaytype.save
	&confirmmode=

As mentioned earlier, it doesn't matter if this request is fired from an image tag or somewhere else - as long as you are logged in your account information will be changed. Same can be done when trying to invite new users to the platform via the invitation form:

	https://our.example.com/invite
	?op=send
	&register_mode=0
	&first_name_1=test
	&last_name_1=test
	&email_1=someone@example.inv
	&subject=Buy%20those%pills!
	&salutation=1
	&body=Buy%20mortal!
	&send=submit
	&language=de

```html
<img src="https://our.example.com/change_account?paytype=debit&paytype_id=1234&paytype_field_1=123456789&paytype_field_2=12345678&paytype_field_3=Richie+Rich&paytype_field_4=BankOfHappiness&op=editpaytype.save&confirmmode="/>

<link rel="stylesheet" type="text/css" href="https://our.example.com/invite?op=send&register_mode=0&first_name_1=test&last_name_1=test&email_1=someone@example.inv&subject=Buy%20those%pills!&salutation=1&body=Buy%20mortal!&send=submit&language=de"/>
```

This way CSRF enables the attacker to spam arbitrary users from the account of the currently logged in user. Again annoying consequences for the user himself or the platform owners may follow. The examples show that it is very easy to perform a CSRF attack with very high impact. So now we come to the part of protection against CSRF.

## Countermeasures and protection against CSRF

There haven been many articles and discussions around this topic and this one aims at summing them up and finding an almost bullet-proof and easy to implement solution. Basically most times the following measures are mentioned to protect an application against CSRF attacks and decreasing the size of the attack surface.

* Using tokens for actions that store/update/delete/mail information
* Using referrer checks when dealing with actions that store/update/delete/mail information
* Using captchas or other mechanisms to make sure the request can't be brute-forced

[This page](http://www.businessinfo.co.uk/labs/csrf_defend/csrf_demos.php) provides good examples for the above mentioned mechanisms. In case all of those three measurements were implemented properly the surface for CSRF attacks will become very small but the main problem is that any of them can be circumvented. For example the usage of unguessable tokens makes pretty sure the an attacker can't assume the correct URL without intense brute-forcing. A link with such a token could look like [this](http://www.businessinfo.co.uk/labs/csrf_defend/url_tokens.php). But all protective impact of this measurement is lost immediately when the application is vulnerable to XSS - because that way the token can be easily parsed off the page content and be used in the actual CSRF attack. The only thing an attacker has to do to get the token is to trick the user on the XSSed page and send the resulting response content to an arbitrary page of his. So one can see, XSS and CSRF are very good friends when coming to circumvention of defense mechanisms. Same problem exists for the referrer checks. Several older versions of the flash player were able to [spoof the request headers](http://ha.ckers.org/blog/20060725/forging-http-request-headers-with-flash/) including of course the referrer. So a versatile attacker will have no problems circumventing that mechanism too. And captchas themselves [aren't bulletproof either](http://www.captchakiller.com/) and additionally ship the problem that the application they're used on looses parts of its accessibility.

So the only thing a developer can do to make sure there are as few as possible CSRF vulnerabilities in his applications is the clever combination of the above mentioned mechanisms and to avoid XSS like hell. Most modern frameworks ship form tokens but a built in referrer check is pretty rarely to see. But it's easier to implement such a measurement in new and existing applications than it seems. First all requests which should be protected from CSRF have to be gathered into a list and the URL schemes have to be searched for patterns - most time something like the following:

* `http://example.com/edit/...`
* `http://example.com?action=store`
* `http://example.com?id=123&delete=1`

After having accomplished that. central instance is needed where any request has to go past before being processes by the application - mostly that's some file like index.php, index.asp or similar. If such a file isn't available most webservers feature a way to define such a file in their configuration. The most commonly used [LAMP](http://en.wikipedia.org/wiki/LAMP_%28software_bundle%29) combo for example provides the [auto_prepend_file](http://php.net/ini.core) option. After the critical requests were gathered successfully it's required to craft a regular expression, that matches those and is able to separate them from the rest of the requests the application understands. Now any incoming request that matches the pattern can be examined further by the prepended or index file. If a referrer appears that doesn't match the applications URL the request can be blocked and logged. Same goes for adding URL tokens to an already existing application - the prepended or index file can check for the existence and validity of the incoming token and that way the developer has way less work to do and validate the incoming traffic at a central position of his application. To make sure the generated markup positions the tokens in the critical forms the LAMP developer can use the [auto_append_file](http://php.net/manual/en/ini.core.php) option and avoid customizing any template including those critical forms and links - same goes for the implementation of captchas if the loss of accessibility is acceptable for the platform's users. Of course, there's basic knowledge about regular expressions and some patience needed but the Internet is full of [comprehensive tutorials](http://www.regular-expressions.info/), guides and [tools](http://www.rexv.org/). So we see - defeating CSRF effectively is no black magic - even for existing applications and frameworks.

But also the user can protect themselves against soma variants of CSRF attacks - again with [Giorgio Maone's](http://www.maone.net/) Firefox extension called [NoScript](http://noscript.net/). NoScript detects and oppresses cross-domain form submits. Needless to say that NoScript features a pretty advanced XSS protection too.

## Conclusion

This article explained the basics of CSRF attacks and showed how they work and what impact they can have. Also, we've learned how to read several techniques to mitigate and avert vulnerabilities for applications and the users themselves. Still, there are many other things to point out and hopefully the article will entail a discussion to cover all aspects which haven't found their way in. Also we'd be happy to answers your questions - so feel free to contact us or comment on this post.

_And by the way - the protection method we discussed above isn't even pure theory anymore. You can check out the [PHP5 library CSRFx](http://php-ids.org/category/csrfx/) - which does the exact thing right here. Your opinion on this project is of course welcome too._
