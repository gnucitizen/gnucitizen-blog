---
title: Universal PDF XSS After Party
author: petko-d-petkov
date: Thu, 04 Jan 2007 12:14:52 GMT
template: post.jade
---

> Everybody [knows](/blog/danger-danger-danger) about it. Everybody [talks](http://www.webappsec.org/lists/websecurity/archive/2007-01/msg00005.html) about it. We had a nice party. It is time for estimating the damages. In this article I will try to show the impact of the Universal PDF XSS vulnerability by explaining how it can be used in real life situations.

For those who has slept over the last two days, here is a short introduction of what this talk is going to be about:

The Universal PDF XSS issue was [discovered](http://events.ccc.de/congress/2006/Fahrplan/events/1602.en.html) by Stefano Di Paola and Giorgio Fedon and it was presented on [23C3 security conference](http://events.ccc.de/congress/2006/Home). This vulnerability obviously affects the Adobe Acrobat Reader which is a widely used software among business, non-business organizations and individuals. By abusing [Acrobat's open parameter features](http://partners.adobe.com/public/developer/en/acrobat/PDFOpenParameters.pdf) well protected sites become vulnerable to Cross-site scripting attacks if they host PDF documents. This is pretty bad and unless you update your reader or change the way your browser handles PDF documents, you may get hacked quite badly. This issue is very serious.

The way attackers use PDF documents to execute JavaScript code is outlined with the following template. The code will be executed on the domain where the PDF files is hosted on:

	http://path/to/pdf/file.pdf#whatever_name_you_want=javascript:**code_here**

Now we know what we are going to talk about, lets have a look on how attackers can use this vulnerability to abuse your WEB presence.

First of all it will be good to mention that PDF is widely used document format. In fact, every major site (I don't want to say every site, although I wont be far from the truth) hosts at least one PDF document. This makes the situation a lot worse because If you happen to be on a malicious site or you click a malicious link, attackers can simultaneously compromise several of your WEB accounts that are currently open/authenticated.

For further clarification lets say that you have accounts in MySpace and Freindster and several other social networks open and then you visit a random page that has a XSS PDF exploit. The attacker that controls this page will be able to get your session ID on all of your social network profile pages and as such successfully hijack your identity. This is just one possible scenario. Attackers are also able to tamper your profile page in order to assure future access to your and your friends' profiles as well. That will happen in a matter of seconds so you can see that from this point on you have to be extra conscious with your WEB activities. Disable JavaScript or update to Acrobat 8.

I mentioned that either you have to click on a link or visit a page in order to get the exploit working. In general you need some type of user interaction. First of all, clicking on a link could be a bit suspicious if you think about it. Unless you really want to open a PDF document, there is no need for doing so. However attackers can make use of sneak techniques to force you somehow, by changing the file extension of the PDF document to .mp3 or .mov or even .html. It looks less suspicious, but still when pulled from the server the content will be served as application/pdf:

	#.htaccess
	RewriteEngine On
	RewriteRule *\.(jpg|png|css|mp3|mov|avi)$ http://www.google.com/librariancenter/downloads/Tips_Tricks_85x11.pdf

If the user clicks on something like the following URL:

	http://currentdomain/whatever.mp3#something=javascript:**malicious_code**

The code will be executed on Google not on currentdomain. The user has fallen into the trap. You can see that you should not trust links and your browser status bar because they could say something that is not really the truth.

It is also worth mentioning that there are many variations of this attack vector. In fact, there are so many variations that its not worth discussing all of them. However, here is another interesting one. I presume you are already familiar with TinyURL. In simple words, attackers can store an entire XSS vector for a specific site and recall it anytime they need it by using the TinyURL service. I shrunk the following URL which contains harmless XSS exploit for Google:

	[http://www.google.com/librariancenter/downloads/Tips_Tricks_85x11.pdf#something=javascript:alert('xss');](http://www.google.com/librariancenter/downloads/Tips_Tricks_85x11.pdf#something=javascript:alert()

TinyURL generated the following shortened URL:

	[http://tinyurl.com/t8h4q](http://tinyurl.com/t8h4q)

If you paste the above URL into your browser address bar you should get an alert message saying XSS. The ability for shrinking and obfuscating URLs with TinyURL and other technologies makes the Universal PDF XSS a pure evil. URLs are easily exchangeable via simple text messages, emails and IM chat sessions. The impact is huge.

The second way for getting the exploit working is by automatically opening it without user interaction, although the user needs to attend a malicious resource first. In order to make the vector working the attacker sets a hidden iframe that contains the malicious URL. Upon visit, the exploit executes.

```html
<iframe src="http://path/to/pdf/file.pdf#whatever_name_you_want=javascript:**code_here**" style="width:0;height:0;border:0"></iframe>
```

I mentioned that TinyURL can contain the entire XSS attack vector. Then you can easily execute it like this:

```html
<iframe src="http://tinyurl.com/t8h4q" style="width:0;height:0;border:0"></iframe>
```

This is very bad because attackers can have multiple iframes in a single page that upon visit will exploit whatever WEB accounts you currently have open. It is totally stealth and extremely malicious.

Probably you are thinking that this can be used quite successfully to create a WEB worm infection. It is true! Obviously it is possible. A WEB worm of such a degree will be the first one that spreads on the top of the WEB without the restrictions introduced by the same origin security policy. The infection process can be very simple if you think about it. First of all the worm needs to have some kind of mechanism for discovering potential target. Google proves to be quite helpful with that. In this case either Google AJAX Search API (restricted) will be used or a hosted PDF document to do real Google searches on the main WEB Search interface (unrestricted). Once the worm finds a target, the infection algorithm is launched. Upon visit of a infected resource propagation process restarts.

It is also possible to have some sort of update mechanism for this type of worm. For example if one of the currently crawled sites contains XML comments with specially declared JavaScript code, the worm can mutate by adding the foreign code into its core. This way older generation worms can leave genetic code/clues for current generations. As you can see, this type of malicious code can be extremely dangerous and agile.

The Universal PDF XSS is probably one of the worst things that has happened to the web. This vulnerability affects almost every website. Here is another news for you: your local file system is subjected to external attacks as well.

The problem is that Adobe Acrobat comes with a couple of demo PDF documents. RSnake was first to report this specific attack vector. If you have Adobe Acrobat 7 you can execute JavaScript on your local filesystem. Because of the same origin policy, this JavaScript code can list your disk and send private files to a remote collection point.

	file:///C:/Program%20Files/Adobe/Acrobat%207.0/Resource/ENUtxt.pdf#something=javascript:**code_here**

You can see that the above URL is accessed with the file protocol. This means that we have access to other resources served by the same protocol. For more information how to access the file system, read the current user history file, dump the registry, download the SAM file or access other sensitive information read [here](/blog/web-pages-from-hell) and [here](/blog/web-pages-from-hell-2).

This is why the situation is very bad not only for Adobe but also for the users and the security community. I did investigation to see what is the situation with most Social Networks that I know about. Almost all of them have PDF files. I wonder what will be next.
