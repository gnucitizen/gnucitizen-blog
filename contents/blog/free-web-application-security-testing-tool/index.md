---
title: Free Web Application Security Testing Tool
author: pdp
date: Fri, 07 Aug 2009 08:02:38 GMT
template: post.pug
---

Automated Web Application Security Testing tools are in the core of modern penetration testing practices. You cannot rely 100% on the results they produce, without considering seriously their limitations. However, because these tools are so good at picking the low-hanging fruit by employing force and repetition, they still have a place in our arsenal of penetrating testing equipment.

These tools are not unfamiliar to modern day penetration testers. In fact, there are plenty of them to choose from, ranging from low-grade command line utilities to high-end frameworks. There are plenty of commercial tools as well some of which are a lot better, in terms of features and false-positives rate, when compared to open source alternatives. People often choose what they are more familiar with. I prefer to use tools that are right for the job without discriminating a particular operating system, platform, and style.

Without further ado, I would like to introduce to you yet another tool to compete in the market of automated web application security scanners (not only), released as part of our own [Websecurify](http://www.websecurify.com) initiative. The tools is called Websecurify (big surprise) and it is written on the top of common web technologies, which provide significant benefit over other technologies used in open source and commercial alternative products.

Here are some of the key features of Websecurify:

1. It is 100% open source, GPL, CC product, ready to benefit the open source movement
2. The engine employs technologies, such as Web Workers, from the latest HTML5 specs
3. Most of the code is written in JavaScript but many parts can be rewritten or extended with Python, Java and C
4. The core engine can be taken out from the binary bundles and used as part of self-defending web applications. I will talk about this soon.
5. The testing and reporting mechanisms are asynchronous. This means that the report is cooking while the test is performed. It also means that decisions are taken immediately, i.e. they are not scheduled.
6. The tool is cross-platformed thanks to xulrunner
7. Everything is written with extensibility in mind
8. It can be extended in pretty much the same way you can extend Firefox and Thunderbird

There are many other features, which I am going to talk about soon.

At the moment the tool is only available as a MacOS DMG package and source code. The Windows and Linux versions will be released soon. In the future we are planning release all platform specific packages at the same time. Now is just an exception as we are mostly interested to get an early feedback. I am sure that that there will be a lot of bugs to fix and features to add/improve before we reach version 1.0. Version 0.2 can be downloaded from [www.websecurify.com](http://www.websecurify.com) or our [source code repository](http://code.google.com/p/websecurify/).

_If you have any feedback or you would like to contribute to this project, please do let us know. We can use any help possible._
