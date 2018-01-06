---
title: Traversing the Web
author: petko-d-petkov
date: Tue, 10 Oct 2006 06:48:09 GMT
template: post.jade
---

Every modern browser implements a security sandbox also known as the Same Origin Policy. This sandbox restricts dynamic resources to access others that are from a different context (origin). As such, JavaScript code that is located at `http://www.gnucitizen.org` can access only resources that match the same protocol (`http`), the same domain (`gnucitizen.org`) and the same port (`80`). On the other hand `ftp://ftp.gnucitizen.org`, `https://www.gnucitizen.org` and `http://www.gnucitizen.org:81` are not accessible.

Although quite clever, the same origin policy can be bypassed in a number of ways. AJAX developers are already familiar with most of them. The range of techniques includes dynamic SCRIPT elements, dynamic IFRAME elements and request proxies.

In this article I am going to take the concept of request proxies further by showing how attackers can use them to write JavaScript code that can bypass the same origin restriction (**in a way**).

Request proxies are nothing but simple applications that take the request from the browser and transmit it to another location. The reason for this maneuver is obvious. For example, if the current application is located at `http://www.example.com` and it requires data from `http://api.datastore.com` the call needs to be initiated from the server since the client lacks particular set of functionalities. It is not that JavaScript cannot make HTTP requests (`XMLHttpRequest` object) to `http://api.datastore.com`, it is that the security settings of the browser do not to allow it unless the same origin check is successfully passed.

The workaround in that case is quite simple. Instead of directly accessing `http://api.datastore.com`, the current application can use an instance of `XMLHttpRequest` object to access `http://www.example.com/proxy.php` which will make the request to `http://api.datastore.com` on behalf of `http://www.example.com`. You see, PHP is not restricted and scripts are in the same origin.

> This is a problematic solution if you think about it. AJAX gained popularity mainly because it is lighter than the traditional GET/RENDER cycle still used by many web applications today. Request proxies take the entire load and eat server resources. As such, they are not very AJAX like. That is the reason why many developers switch to JSON with dynamic SCRIPT elements.

How does this affect the security? Surely attackers may need to perform cross-requests in certain situations; exploiting XSS or SQL Injection vulnerability on a different domain, or spidering for targets. They can easily set a proxy request handler with a few lines in PHP and start exploiting. However, as soon as their malicious activities are spotted, their account will be terminated. That is definitely not a long term solution. Moreover, in case a JavaScript worm is about to be realized, relying on private request proxies is just not efficient since the malicious location can be blocked by IP and domain restrictions.

The solution is to use public proxies, especially the ones that are very important; Google Translate for example. Blocking Google Translate or Google is not nice. Imagine how many users will be unhappy when they are not able to access their GMail because a worm is spreading. Google will object as well. Vendors need to find other patterns in the worm structure to write a generic blocking filter. You get the point.

Public proxies are harder to use. The reason for this is because they have never been designed for AJAX development. They are bulky, sometimes slow and the attacker needs to find a way of abusing their functionalities still complying with the Same Origin Restrictions. The second part of this article discusses the solution I came up with when playing with [Google Translate](http://translate.google.com) and [Proxydrop](http://www.proxydrop.com/).

Abusing public proxies is a matter of designing a communication protocol, putting some nested IFRAMEs and a timer. In the example below I make heavy use of fragment identifies (#) as well.

In the first stage, the attacker creates a hidden IFRAME that points to the public proxy URL which is set to proxy `document.location` with added fragment identifier. For example, if the current location is `http://www.example.com/infected.html`, the following IFRAME will be created:

```html
<iframe src='http://proxy.com?url=http%3A%2F%2Fwww.example.com%2Finfected.html%23stage1'></iframe>
```

where `http%3A%2F%2Fwww.example.com%2Finfected.html%23stage1` URL encoded is `http://www.example.com/infected.html#stage1` in plain text

The fragment identifier `#stage1` denotes that when the current location is loaded from the proxy, `#stage1` will take place instead of the normal document flow. This is achieved by performing a check in the document body similar to the following:

```javascript
if (document.location.hash == '#stage1') {
	...
	do stage1
	...
} else {
	...
	do default
	...
}
```

In simple words `#stage1` will execute under `http://proxy.com` domain. This stage is designed to unify or bypass the domain restrictions. At `#stage1` another IFRAME is created that points to the location which the attacker is interested in. In case the attacker is interested in spidering Google the following IFRAME will be created:

```html
<iframe src="http://proxy.com?url=http%3A%2F%2Fwww.google.com%2Fsearch%3Fq%3Dquery"></iframe>
```

where `http%3A%2F%2Fwww.google.com%2Fsearch%3Fq%3Dquery` URL encoded is h`ttp://www.google.com/search?q=query` plain text

This IFRAME is also loaded in the `http://proxy.com` domain. This means that `#stage1` has access to this IFRAME document (the same origin check is bypassed) and can read all the information that is inside.

The next step is to collect the desired information and Base64 encode it. The attacker can encode the entire document if they like. The hardest part is to transmit that Base64 encoded value back to the location where the attack was launched from.

Child IFRAMEs have no access to parent documents. Still, there is a workaround that can be used. What the `#stage1` document needs to do is to set the fragment identifier of the parent page with the desired data. Child IFRAMES cannot access `parent.location` but they can easily alter the hash member variable of the location object.  This can be achieved in the following way:

```javascript
parent.location.hash = '#data:' + base64encoded_content;
```

Upon execution the parent document location will expand with a new fragment identifier. It must be noted that this will not cause a refresh. Now the collected data is in the current page fragment identifier and it can be read by accessing:

```javascript
document.location.hash
```

There is no way to hook a function on `document.location.hash` change so a timer needs to be set that will check for `#data` fragment identifier every defined period of time. As soon as a change in the fragment identifier is spotted the data will be read, decoded and used.

This is how attackers can abuse public proxies and write viruses and worms on their backbone. The larger and more important the proxy is the higher the chances for success are.

The example provided above is not generic. In fact it is a bit bulky and can be definitely improved. The reason why I used this technique is because there is a proof of concept tool that makes use of it. The tool is called JavaScript SPIDER and it can be found [here](/blog/javascript-spider).

Abusing public proxies is only one of the many techniques that can be implemented in the personal toolbox of every client-side hacker. This subject can be definitely expanded with more examples and techniques but I will leave that for some other time.

_If you have any ideas of how to improve this technique or how to prevent it from happening, don't hesitate to leave a comment._
