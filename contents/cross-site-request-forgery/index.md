---
title: Cross-site Request Forgery
author: petko-d-petkov
date: Mon, 04 Dec 2006 07:32:39 GMT
template: this/views/post.jade
---

CSRF or Cross-site Request Forgery sounds quite self-explanatory. This is an attack vector that gives malicious sites the ability to send a (forged) request from its context to a different site. The purpose of this attack vector is to act on behalf of the current user in order to gain control of his/her account or perform other types of malicious activities.

This may sound a bit difficult to imagine but in practice it is quite simple. However, before showing the practical side of CSRF I should talk about why CSRF is possible on first place and what are the security implications of this type of attack. In order to explain that, we need to have a base study case on the top of which I will develop the story of Joe and Moe.

Like any other story Joe and Moe used to be friends who eventually become enemies for some unknown reasons. Joe and Moe had been in constant fight since that turning point. One day Joe decided to get back to Moe by dis-faming his status on a mailing list they both participated in. For that purpose Joe used a simple CSRF trick he had learned from a friend. Joe composed a HTML page with a FORM that looked something like the following:

```html
<body onload="document.CSRF.submit()">
	<form name="CSRF" method="POST" action="http://mail.freemail.com/sendmail.php" style="display:none">
		<input name="to" value="list@bestfriends.com"/>
		<textarea name="message">Hi Group, ...</textarea>
	</form>
</body>
```

The purpose of this form, as explained by Joe's friend, is to automatically send a POST request to http://mail.freemail.com/sendmail.php once it is opened inside a browser window. If the user who visits the malicious page is already logged into mail.freemail.com the request will be successful because the browser will supply all the necessary session cookies. On the other hand, if the user is not logged, the request will fail with probably a login page presented the user.

Joe decided to send Moe a message encouraging him to open a link in his browser that points to the malicious page. Exactly how Joe did that is not important, but what is important in this case is that Moe felt into the trap. Since Moe was logged into his account, the malicious page composed a POST request that forced mail.freemail.com to send an email from Moe to list@bestfriends.com containing the dis-faming message. The browser added all necessary cookies to enable the request. Moe have never trusted Joe's emails or links ever since.

Although the are far simpler ways to forge emails it is essential to understand the basic principle behind CSRF,... and it is: the browser will add all necessary cookies to the requests made from the remote accessed pages. This means that if the applications you are using are not written with CSRF in mind, with a little bit of knowledge anyone is able to perform actions on behalf of you. That is concerning!

When Joe sent a request on behalf of Moe, he used a hidden form because it allows not only GET requests but POST as well. In many situations the attacker needs to perform exactly this type of request. However, if you are familiar with Java Servlet Development or other similar technologies you probably know that very often GET and POST are interchangeable. If that was the case with mail.freemail.com then Joe would be able to compose CSRF on behalf of Moe with something as simple as the following:

```html
<img src="http://mail.freemail.com/sendmail.php?to=list@bestfriends.com&message=Hi%2BGroup..."/>
```

or even this:

```html
<script src="http://mail.freemail.com/sendmail.php?to=list@bestfriends.com&message=Hi%2BGroup..." type="text/javascript"></script>
```

or even this:

```html
<iframe src="http://mail.freemail.com/sendmail.php?to=list@bestfriends.com&message=Hi%2BGroup..."></iframe>
```

The list of possible ways of performing GET CSRF is endless. Virtually every type of element that results in getting a remote resource is subjected to abuse from CSRFers.

Going back to POST CSRF, it is obvious that this one is a bit more complicated to perform. POST CSRFs can be composed with HTML FROMS, XHR (XML HTTP Requests), Flash and some other technologies. You must understand though, that these techniques can be applied in different situations. I will not go into details how to use each one of them, I will cover that in a different post I guess, but it is important to understand that there are many possibilities.

I hope that the theory and practice behind CSRF is clear now. You must understand that this is not an attack vector that is present in WEB technologies only. Not really! Apart from having CSRF in web pages, XML documents, PDF documents and other media formats, custom software is subjected to this type of attack as well. CSRF is everywhere and affects everything. I am not quite sure why this attack vector is not flagged as the most widely spread one.

Wat do we need to do? The solution in theory is very simple but in practice could get a little bit complicated. First of all the browser should restrict certain things from happening. You shouldn't be able to initiate forms request from any given page. The same origin policies should be active here, just like they are active for XHR. That of course will break a lot of applications but with a little bit help from W3C, a standard could emerge. Something like Flash's crossdomain.xml file might come very handy.

Second, web applications should make sure that every request made to any of their internal scripts will be satisfied only if a special type of handshake is established. Some applications for example support only POST requests that are linked to FORMS marked with unique identifiers. If an attacker wants to perform CSRF, they need to know that identifier in advance. That is not that easy to get. Moreover if the attacker has already access to it, they must be able to do far more dangerous things than tricking the user into CSRF.

There are several more things that the developer needs to pay attention to but due to their complexity I cannot really generalize and discuss all of them in this article.

_Just be careful the next time you are browsing the web!_
