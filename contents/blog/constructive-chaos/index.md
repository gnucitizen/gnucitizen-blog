---
title: Constructive Chaos
author: mario-heiderich
date: Tue, 07 Aug 2007 22:09:52 GMT
template: post.pug
---

> Fuzz testing or fuzzing is a software testing technique that provides random data ("fuzz") to the inputs of a program. If the program fails (for example, by crashing, or by failing built-in code assertions), the defects can be noted. [Wikipedia](http://en.wikipedia.org/wiki/Fuzz_testing)

Recently several interesting tools were released to cover one special aspect of fuzz testing in web application security - JavaScript fuzzing. Mozilla has released their fuzzer called [JSFunFuzz](https://bugzilla.mozilla.org/show_bug.cgi?id=jsfunfuzz) and [Gareth Heyes](http://thespanner.co.uk/) has released a tool called [JavaScript Fuzzer 2.1](http://www.businessinfo.co.uk/labs/jsfuzz/fuzz.php). Both of them have more or less similar purpose although, they use different methods for reaching their targets.

## Chaotic fuzzing

The Mozilla fuzzer or JSFunFuzz has been around for some time now. The tool was first announced in a ticket published in late August 2006. It's purpose is to use a large base of JavaScript language constructs concatenated together, no matter if the represent valid code or not. Today, this project is probably the main way for testing how the Rhino and SpiderMonkey JavaScript engines react on weird or even faulty code. The obtained results were used to optimize both script engines stability. JSFunFuzz even helped to [identify several problems](http://my.opera.com/desktopteam/blog/2007/08/03/fun-with-the-fuzzer) in the Opera JS engine. A handful of them were security relevant and the Opera team already have announced that fixes should be expected soon.

The files attached to the JSFunFuzz tickets that announced the project, also provides implementation for in-browser fuzzing although it seams to be neither funny nor very useful. Most of the time, the CPU load is around 100% and the user gets some low frequently updated text output which spits out info about the concatenated strings and the debug output they provoked. Nevertheless some people already implemented solutions similar to this one. Do you remember that CPU load will probably rise sky high if you click this [link](http://download.remcol.ath.cx/jstest.html)?

The question is how to use the JSFunFuzz fuzzer at home. Quite easy, I must say. Just grab a copy of the [Rhino](ftp://ftp.mozilla.org/pub/mozilla.org/js/rhino1_6R6.zip) engine from Mozilla. Install a [JRE](http://java.com/en/) if you do not have one yet, and use your console to instantiate Rhino. Something like the following should do the job: 

	java -jar /path/to/js.jar

After that a JavaScript console should appear replacing the usual command line. If you attach [jsparsefuzz.js](https://bugzilla.mozilla.org/attachment.cgi?id=240710) to the above command you should immediately see dozens to hundreds of JavaScript snippets racing upwards the command line. If you want to make real good usage of the tool you may need have to pipe the output through some regular expressions, save the results in a file and give the script some time to finish. After a while you should have a very large collections of code fragments you can test in your application filters or you may want to use them for other purposes.

	java -jar /path/to/js.jar /path/to/jsparsefuzz.js 

## Structured fuzzing

Gareth Heyes fuzzer has taken a slightly different path. He provides a handy in-browser fuzzer and enables the user to predefine many parameters of the fuzzing process before usage. You can predefine tags and attributes to fuzz as well as quote types, text case and many other useful things. What makes this tool really useful is the obvious but worth to mention fact that you can use it in any browser. This enables you to hunt for special markup related browser peculiarities when coming to interpret JavaScript via event handlers, attributes, etc. The tool has already found some pretty weird combinations of attributes and special chars. According to emails we exchanged with Gareth recently, the tool will soon feature a database which provides already found vectors. That will make the tool more powerful and useful and will exponentially grow if more people start using it. Also there are plans to publish the fuzzer as an open source project - combined with a public database like [DabbleDB](http://dabbledb.com/) which we already use for the almighty [xssDB](http://www.gnucitizen.org/xssdb/application.htm). This, we believe may become a very valuable source for security testers.

## Conclusion

Both fuzzers are potentially quite useful and will definitely increase the security of future web applications and browser technologies. JavaScript fuzzers may also help with preventing certain XSS vectors. They make a huge change when securing a particular project or implementation. Furthermore, By reading posts like [SirDarckCat's astonishing research reports](http://sirdarckcat.blogspot.com/2007/08/javascript-is-just-evil-for-you-part-i.html), it makes clear that many of use haven't had the chance to realize what JavaScript is capable of - what do you think?
