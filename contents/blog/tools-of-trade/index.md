---
title: Tools of Trade
author: petko-d-petkov
date: Fri, 10 Apr 2009 20:18:31 GMT
template: post.jade
---

Lately I've been dropping a lot bash scripts on public forums and of course on work related projects. Many people came back to me asking why I chose bash. "Python or perl would have been better!" While I agree that both python and perl are a lot more expressive, I disagree that tools in general should be written just to accommodate the needs of a particular framework. Tools are tools and they have their lifetime just like everything else. So should we bother?

Recently I had to communicate with a MSSQL server on a pentesting job. For that purpose I've downloaded `sqsh`. Unfortunately the tool failed with a linking error. So I decided to go and download the sources and compile. I did that but the build failed because my environment was lacking certain unusual environment variables the tool needed to build successfully. Alright, running out of time, I decided to check whether there are other tools for SQL server. I found `dbishell` which is a tool written in perl. I run the tool for Sybase backend but it complained that I am missing libraries. So I downloaded the dbi sybase perl libraries and installed them. I run the tool again but it failed with an error. It couldn't display the error because I was lacking another perl library.

Ok, that was ridiculous and I desperately needed a solution. So I came up with something I do not normally do. I checked PHP's sybase integration online and I found that it is relatively straightforward to communicate with MSSQL backends from PHP scripts. I wrote a simple script to bruteforce the login with several passwords I had at hand. Once I found the login, lucky me, I wrote another script, again in PHP, just to dump various information from the database such as other database users and their hashes. Lucky me!

> In summary, I spent ridiculous amount of time trying to make established frameworks and tools to work while I could have saved all the hustle and started with PHP from the beginning.

The reason I am telling you this story is because I have an important message convey here: "Tools are just Tools!" If metasploit cannot exploit the vulnerability perhaps you can create something yourself. If nessus fails to detect a problem, perhaps there is another approach you should use to handle the situation. We often start a new framework or tool and suddenly decide that it should handle all situations. Well that is virtually impossible! The situation always change.

So, don't stick to a single tool just because it works 80% of the time. And don't waste time trying to make the tool work in the rest 20%. It is pointless, especially when you are dealing with frameworks. There are a lot more solutions out there you can employ to solve your particular problem. These solutions may not be elegant and perhaps they are written in something as unconventional as [brainfuck](http://en.wikipedia.org/wiki/Brainfuck), but they are solutions nevertheless.

_Remember, tools solve problems! If a tool cannot solve the problem it is no longer a tool. It is a useless blob!_
