---
title: Bulletproof Rich-content Filters
author: petko-d-petkov
date: Tue, 18 Dec 2007 11:13:28 GMT
template: post.jade
---

It is true that here, at GNUCITIZEN, we try to look more on the offensive side of the things rather then the defensive side. I personally find that perfectly fine and ethical since you need people from both camps. Not, that we are the bad guys, (we are whitehats) but we primarily concentrate on how to break things. As such, we are part of the information security food chain. Some break, others fix. Some of us destroy, others build upon. And there is a lot of value in breaking things. More then you can imagine! It is a simple fact that you don't know how things work without first taking them apart.

Though, once in a while, we try to show how to fix problems by using what we have learned along the way. This is exactly what I am planning to do today. In the this post I will briefly introduce you to some of the concepts that have build up with the time, about how to allow rich user-supplied content such as HTML and still guarantee a bulletproof security. Keep in mind that although the proposed mechanism works perfectly fine, there is always a chance to screw up. In that case you should blame no one but yourself.

> Before I continue I must say that I haven't pioneered the here discussed techniques. I don't know who did but what I know is that there are several tools ([AntiSamy](http://www.owasp.org/index.php/Category:OWASP_AntiSamy_Project)) that already implement them. Though, I will add my own twist to the overall concept.

Let's glance through the problem: "The fast world of Web2.0 moves towards what is known as _User-supplied Rich Content_, _Data in the Cloud_, etc. In this model the user supplies all the data in a rich way. The user is able to define HTML, execute client-side JavaScript and even execute server-side JavaScript. The problem is that in order for the user to do all of that in a secure manner, there must be an excellent understandings of what is malicious so that the bad input can be sanitized. Think about MySpace, for example. The users can define their own HTML and CSS for their home pages. Of course, MySpace needs to guarantee that the user-supplied HTML wont effect the owner or any other visitor arriving on the personal profile. This is a hard task which often involves a lot of sanitization, blacklistings, whitelistings, filters, etc, etc, etc. It is fair to say that the model is insecure by design. But is there something that we can do about it and will that something guarantee good enough security?"

The simple fact is that it is possible to lockdown a special cases like the one discussed above. Not only it is possible but also it can be made bulletproof and extremely reliable. One of the key problems that rich-content applications face today is that it is very hard to detect malicious input. This is due to the enormous amount of differences between client-side technologies. One type of expression may render in Firefox and at the same time fail in IE. Not only that, but the Web Apps' World is changing so drastically that it is not even feasible anymore to perform security checks based on whatever filtering mechanism you might have implemented.

Some security folks suggest a security model which I believe may work if all vendors start working together. We all know that this will never happen. The proposed model consists of several stages where first of all browsers and client-side technologies become compatible with each other and then a common sandboxing mechanism is invented where the data is clearly separated from the logic. It makes sense but as I said it wont work. So, what can we do on the server-side in order to improve the situation?

Your best chances is to find the secure/compromisable common dominator between client-side technologies and use that as a base. How do we do that? Let's take a look at HTML for example.

## Stage1: The Intermediate Format

So in our case we have a scenario where we want to allow the user to upload rich content in a form of HTML but at the same time somehow to sandbox the content in such a way that no malicious activities can be performed. Due to the fact that HTML is based on SGML and both of them allow tags to overlap, i.e it is not XML, it is very hard to make use of regular expressions in order to secure the content. Our best bet is to convert the content to an intermediate format which can be examined.

At the first stage we get junk from the user, which we don't trust, and convert it to something that we can guarantee that is at least machine-readable. The best choice for this machine-readable format is XML, mainly because it is fairly easy to parse and analyse and there are more then enough tools that can deal with this problem. So, we receive the random text from the user and we convert it to XML. How do we convert junk into XML? This is kind of trivial. There are many implementations of the so called [HTML Tidy](http://tidy.sourceforge.net/) engine. HTML Tidy receives a text and cleans it up to an extend where the result is well formatted XML or XHTML if you like.

_Stage1 completed!_

## Stage2: The Compliance Checks

I bet a lot of your already know where this thing is going. But don't jump of your seats yet. You are probably thinking to parse the XML and do your crazy magic but if you go on this read you are already getting into trouble and probably reversing the good effect of the XML potion. Let's keep it simple. Instead of parsing the XML yourself, like the AntiSamy guys did, you should use tools that already does the same and are already been extensively tested for compatibility and security problems. For this type of purpose I would suggest to use XSD (XML Schema Definition).

In XSD we can define/whitelist the syntax that we think is fine for the user to use. For example, we can define that the user can supply a `<p>` tag, which may only contain whitespaces, text and `<img>` tags. On the other hand, each `<img>` tag may only have one attribute known as `src=` which is of a type `URL`. And the `URL` type may only contain strings that start with `http://` or `https://`. There are a plenty of tools that will allow you to engineer the definition in a graphical way. It is really simple especially when you are using tools like Altove XMLSpy.

So, what do we do with XML and XSD? You are right, we match them. If the XSD matches the XML then the user has passed the check and the content is guaranteed to be none-malicious. There you go!

## Things to watch out for

I said that there is always a chance to screw up. And probably you will unless you really know what you are doing. I personally won't allow `<img>` tags at all unless the `src=` attribute points to a real image file on a domain that I control. So for example, if you want your users to upload image files and then reference them from their pages with `<img>`, what you should probably do is to put all the images on a separate domain like `static.yourdomain.com` and make sure that your XSD matches against it for `URL` types. This will reduce the impact of CSRF attacks to an extend. It is also important to check the format of the files users can upload and deny write access if the don't match against any of your safe file formats. Etc!

> So what does all that mean? It simply means that you can make a bulletproof rich-content filter, but this is just 10% from the whole journey. It also means that, there are 100% bulletproof filters, but not 100% bulletproof security models. The highest you can go with security is about 50% and I've been actually generous. The simple fact is there is nothing on this planet that cannot be hacked. If someone can use it, so attackers can. If you start living with this idea for a while, you will start perceiving the truth as it is.
