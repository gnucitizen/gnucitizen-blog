---
title: Client-side SQL Injection Attacks
author: petko-d-petkov
date: Tue, 05 Jun 2007 21:33:36 GMT
template: post.jade
---

A couple of days ago, Google unleashed a new product called [Google Gears](http://code.google.com/apis/gears/). At the beginning I was sceptical about the purpose and the actual benefit of this project but I soon realised that indeed it is very powerful and it does save developers from a lot of trouble when dealing with AJAXy applications. The two most useful/interesting Google Gears (GGears) features are the [relational persistent storage](http://code.google.com/apis/gears/api_database.html) and the [worker pool](http://code.google.com/apis/gears/api_workerpool.html). Both of these features are quite interesting. Let's see why?

The relational persistent storage allows developers to mange databases and tables on the client the same way we do it on the server. The backend is SQLite which quite obviously supports SQL queries. Here is the problem: if user provided data is passed as part of any of the queries without being sanitized then we have a SQL Injection. This is not everything though. There are two ways attackers can take advantage of the Gears' persistent storage. The first one is through a XSS attack on the domain that makes use of Gears' persistent storage. This one is very nasty since attackers are able to control the queries that are sent to the backend. They can dump, modify and completely destroy any database or table.

The second problem is a variation of the first one but it is a bit more twisted. Attackers can make use of a client-side SQL Injection hole to inject and echo back a peace of HTML/JavaScript code that loads more malicious code inside the user browser, effectively causing XSS. Depending how the attacked application is written, attackers might be able to persistently infect the client with a virus that will reoccur every time the attacked application is loaded. All in all, there is nothing new in here, although SQL Injection, an attack vector that used to be considered a server-side problem only, has become a client-side problem too.

The worker pool is also quite interesting and can be used for malicious purposes too. This is how Google describes the worker pool:

> In web browsers a single time-intensive operation, such as I/O or heavy computation, can make the UI unresponsive. The WorkerPool module runs operations in the background, without blocking the UI. Scripts executing in the WorkerPool will not trigger the browser's **unresponsive script** dialog.

This means that attackers can put memory/resource intensive processes in the background without affecting your browser. I wonder what these process will do... hmmm... like scanning your Intranet maybe or maybe even performing crypto calculations. Who knows? All I know is that making something clever in JavaScript without making the browser hang is hard. Well, not any more. Browsers will get better and that will increase the surface of client-side attacks.

Google Gears is actually very useful. However, I am thinking to disable it for now. The project is still in beta, so I hope that by the time it reaches a first release some of the security problems will be resolved, although I cannot really see how that will happen since we are not talking about bugs in Gears, but fundamental insecurities that can occur by using features in unintended way by taking advantage of insecure codding practices.
