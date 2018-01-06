---
title: AttackAPI 0.8 is OUT
author: petko-d-petkov
date: Mon, 16 Oct 2006 04:39:05 GMT
template: post.jade
---

I recommend [AttackAPI](http://code.google.com/p/attackapi) 0.8 to everyone who is interested in client-side hacking not because I wrote it but because it provides a good demonstration of what is possible today. That, I hope will take our awareness even further.

AttackAPI slowly moves to its 1.0 release where I am planning to standardize its core, fix discovered bugs and make it even more cross-platformed. Still, there is a long way to go. There are plans for 0.9 but I will keep them undisclosed for now.

So what 0.8 has to offer? There are a couple of things that worth our attention. I will start in chronological order.

## Client

The `Client` interface can be used to enumerate the current client. It has functionalities to fingerprint the current operating system, installed plugins, the browser in use and the local NATed IP address and hostnames. This tool is brilliant for doing the first steps of any targeted attack.

## Server

The `Server`, on the other hand, can be used to fingerprint the current server. It provides information about its domain, IP address, platform, server software and the application architecture. Its purpose is to identify what is currently available. That is important because the Web is very distributed and agile network and [controlling dozens of infected clients](/blog/persistent-bi-directional-communication-channels) is a mission on its own.

## AuthorizationForcer

The `AuthorizationForcer` interface is noting but a technique that can be used when the attacker is interested in discovering Basic Auth credentials. It is not very generic but it can be quite successfully executed on internal networks where the security is more relaxed and administrators make use of shortcut URLs to login to different devices and websites.

## ExtensionScanner

The `ExtensionScanner` interface is all the attacker needs to find currently installed extensions. Why is that important? In general this information can be used to find who is previewing the current resource (you are developer or a user), what services you are currently using (do you have flickr or del.icio.us extensions installed) and also locate vulnerable extensions. If you are developer it is very likely that you have access to source code repositories. This information combined with other techniques can be used to steal your work or identify projects that are yet to be released.

## HistoryDumper

The `HistoryDumper` is every web user nightmare when it comes to privacy. Attackers can abuse Firefox, IE and Opera accessibility functionalities to tell where you have been. The marketing tycoons will use it to sell you even more goods. This is an excellent tool for corporate espionage.

## NetworkSweeper

Than it comes the `NetworkSweeper`. The tool does one thing only: discover live hosts. Currently it supports only one type of sweeping but in 0.9 and 1.0 versions of AttackAPI a lot more other techniques will be implemented.

But what is a sweep without a `port scanner`? Port scanning from JavaScript used to be considered an impossible task. Well, that's not the case anymore. Today attackers can use your browser to scan everybody they want without any fear of being penalized. Distributed scanning is also possible. Imagine how a well spread backdoored media file can scan the entire Internet for well known vulnerabilities (the VNC authentication bypass bug) in a quarter of the time required.

## NetworkCalculator

That won't be possible without help from the `NetworkCalculator`. Generating IPs, cutting subnets, transforming IP address are just a few of the functionalities currently supported.

## JavaScript Shell

The `JavaScript shell` is not what it seams to be. Yes, it is a good tool that you can use to quickly try JavaScript expressions but it is a lot more interesting to see the internal workings behind the fancy black console. In the core you will find functionalities that can be used to easily integrate a shell like interface to any web backdoor. Do you want to bind a fancy SQL console to a SQL Injection attack in order to emulate shell interface to the backend database?

## MasterAPI and RequestBuilder

`MasterAPI` and the `RequestBuilder` from AttackAPI is all the attacker needs to build and manipulates cross-browser requests.

## UsernameScanner

Sometimes attackers want to identify usersnames. If your username is Persi Johnson and you have a del.icio.us extension installed, it is likely that `http://del.icio.us/PersiJohnson` is you. The `UsernameScanner` incorporates a handy trick that can be used in many situations. Enumerating local user names has never been easier.

## URLScanner

The `URLScanner` seams to be simple, yet, a lot more needs to be done to expose its efficiency. Do you want to run [Nikto](http://www.cirt.net/code/nikto.shtml) from your browser or you want to build a JavaScript based vulnerability scanning tool? All you need to do is to provide the database and the rest will be magically handled for you.

## GoogleSearch

`GoogleSearch` scares me when I start thinking about JavaScript [worms that propagate outside their origin](/blog/google-search-api-worms). AttackAPI provides an example of what is possible. I believe that we will see a lot more of these in the future.

## KeyLogger

The `KeyLogger` interface can be used to capture key evens (shortcut keys included) and tamper them. No longer has the attacker need to write something specific in order to get your keyboard input. The generic interface `AttackAPI.KeyLogger` can be used anywhere.

## CookieJar

The `CookieJar` is noting but a helper module that helps with cookie manipulation. Once you get into Web Application security, session identifiers is what matters the most. It must be noted that cookies can be used for many other purposes like installing persistent backdoors when DOM based Cross-site scripting issue is in place.

## Zombie

The `Zombie` (ZombieAPI) is my favorite because it redefines the boundaries of today's computer security. Don't open any [mp3](/blog/backdooring-mp3-files), [QuickTime](/blog/backdooring-quicktime-movies), [PDF](http://michaeldaw.org/md-hacks/backdooring-pdf-files/), or [html](/blog/backdooring-web-pages) file that you don't trust. They may hold surprises for you. Once you are caught in the net, [the attack will persist](/blog/persistent-bi-directional-communication-channels) on other resources where the attacker has access to. So, while you are happily watching the next blockbuster trailer, keep in mind that you may as well provide the infrastructure for launching all sorts of malicious activities; including DDoS, Port Scanning, Network Sweeping, Website defacement, client-side hacking, whatever.

## ZombieMaster

Finally, the `ZombieMaster` demonstrates the other side of browser control. This tool makes use of the `ZombieAPI library` and the **bidirectional channel** to control inventories of infected web resources. The MySpace and Yahoo worms could have been a lot more dangerous if they had similar types of features.

_That is all I've got for now_
