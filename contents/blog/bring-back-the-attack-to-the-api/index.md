---
title: Bring Back the Attack to the API
author: pdp
date: Mon, 24 Nov 2008 11:56:23 GMT
template: post.jade
---

A couple of years ago I started a project called [AttackAPI](/blog/attackapi). It kind of became a hit at the time because there was no other project that was doing the same thing. Btw, the situation remains the same.

Today the project is kind of dead because I am not actively developing it anymore. Most of my development time go to projects of greater importance such as Netsecurify, Websecurify, Blogsecurify and several others. However, this situation let me have a much clearer view of the main concept/idea/goal of AttackAPI.

Initially, AttackAPI was nothing more but a collection of JavaScript functions to simplify the development of XSS payloads. Than, I thought that it might be a good idea to expand and add more functionalities such as the ability to run within Flash and also the ability to construct XPCOM payloads for hacking via Firefox privilege escalation exploits. After the release of the Renaissance framework,  I barely had the time to work on AttackAPI.

## So what is the idea of AttackAPI now?

The way I see AttackAPI is the following. AttackAPI should become a framework which exclusively runs within host environments. Let me explain. The browser SOP is a host for AttackAPI as well as Adobe Reader, XPCOM, Flex, Air, WScript (JScript), HTA, Java (Rhino), and pretty much everything else that can run JavaScript. Unlike Metasploit, AttackAPI does not have a common executable environment, i.e. ruby and all of its external libraries for example. Instead, AttackAPI takes advantage of the host's functionalities.

This model has several advantages and disadvantages. A key disadvantage is that AttackAPI can never use other features but the ones that the host provides unless it hacks and patches the host while running, which btw is the main purpose of the projects. A key advantage is that AttackAPI is compact and also cross-platformed. This means that payloads can execute without any external dependencies, which is pretty cool.

_The project files are still hosted as a Google Code project. If you are interested, you are welcome to join and add your spin to the project. Just let me know._
