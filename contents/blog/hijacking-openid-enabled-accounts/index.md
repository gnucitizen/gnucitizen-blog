---
title: Hijacking OpenID Enabled Accounts
author: pdp
date: Sun, 03 Feb 2008 16:08:49 GMT
template: post.jade
---

It has been a long time since I last [spoke](/blog/openid-a-security-story) about OpenID. Today I would like to draw your attention to a tiny problem, which I found among several OpenID solutions. The problem is indeed tiny but the overall outcome is concerning.

CSRF - It comes very handy. It seams that no matter how much you talk about it, very few pay attention on the problem. And it is not a problem that you can afford to have. And among the XSS issues, which most OpenID libraries have, CSRF (Cross-site Request Forgery) seams to be the most pervasive form of attack.

When it comes to OpenID, it seams that developers forget about CSRF, or they just don't want to simply deal with it, mainly because OpenID is not straightforward type of technology. As you probably know, the OpenID authentication stage happens over two channels: one hidden from the user, and one top (visible) channel for authorization purposes mainly. Because the process seems to be kind of obscured, CSRF issues are often taken very lightly and widely ignored.

Instead of showing you examples with real, live systems, rather unethical as you may guess, I would like to show you an example of an account hijack technique which is currently present inside one of the few Wordpress OpenID plugins. However, keep in mind that I am trying to outline a widely-spread issue rather then to disclose a bug. Therefore, you can safely assume that this form of attack is also applicable to many other systems. This is how it goes.

Once you login into the Wordpress OpenID plugin user page, you can add an OpenID url for the current user login. This URL can be used later to login into the Wordpress instance, without typing your username and password, bur rather using a 3rd party server, your OpenID provider, to verify who you are. Unfortunately, the user administration form is vulnerable to CSRF attack. Saying that, attackers can easily, add their own OpenID url and as such authenticate without the need for credentials. Let's examine the form structure:

```html
<form method="post">Add identity:
	<input id="openid_url" name="openid_url"/>
	<input type="submit" value="Add"/>
	<input type="hidden" name="action" value="add_identity"/>
</form>
```

It is obvious that there is nothing there to prevent CSRF attacks. Once the attacker supplies a URL for the openid_url field, the page will redirect to the OpenID provider specified by that URL, authenticate and return back to the original position. Given the fact, that the OpenID provider is controlled by the attacker, btw. everyone can host their own OpenID provider, the attack is very trivial to pull. Once this URL is stored within the plugin database, the attacker will be able to authenticate with the attacked blog without any sort of authorization whatsoever.

I hope that you understand the impact of this issue as it is one of the main things you will see when you deal with OpenID enabled systems. OpenID does make life easier bur if you don't implement the infrastructure properly, you are asking for some serious trouble. BTW, the vulnerability, which I so lightly covered in this post, is not due to a coding mistake within the plugin itself, bur rather then a bug that exists within the main support library, which is one of the most popular OpenID libraries available in the wild.
