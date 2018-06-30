---
title: Big Fish
author: pdp
date: Tue, 03 Apr 2007 13:01:10 GMT
template: post.jade
---

We are nearly finished with the long awaited [XSS book](/blog/author-of-the-xss-book) and I am really happy with the way it builds up. Everyone who is interesting in learning about the so called "WEB2.0 hacking" that raises the concerns of the masses today should definitely get a copy of the book.

I have a few more things to say. First of all Billy's [Jikto](http://news.com.com/2100-1002-6170223.html?tag=tb) code was leaked. Well that shouldn't come as a surprise to anyone. I've got my copy latter on the same day when Jikto was presented on the annual East coast hacker convention [Shmoocon](http://www.shmoocon.org/). Although the details of how Jikto was leaked are a bit vague and unclear, the truth is that it is assembled from components already available in the wild.

Billy announced the code leak on [SPI portal](http://portal.spidynamics.com/blogs/spilabs/archive/2007/04/02/Jikto-in-the-wild.aspx) on also on [Webappsec](http://www.webappsec.org/lists/websecurity/archive/2007-04/msg00005.html) mailing list. In response to his announcement I wrote the following email:

> I saw Jikto's code probably on the same day when you did your presentation. The truth is that, although it is possible for someone to use Jikto to vuln assess a server, at the moment this is very unlikely. Probably I am making too big statement here but this is what I think. :)

> Today, it is a lot easier to scan someone through TOR then using browser issues. Why? Well, it will take some time for the bad guys to pick the new ideas, which efficiency is not proved, and not only that,... but also to create a big enough infrastructure to support Jikto's mobility.

> This is why I believe that Jikto should be made free for everyone to see. As you mentioned, the code is largely constructed from various snippets which are available anyway. It took you 24h to assemble the code from scratch...

> So my suggestion is to make it free. I am working myself on something similar. It is up to the vendors and the community to decide what to do with it...

I feel strong about my statements. After being commercially involved in the security industry for the last 4 years, I realize that there is a lot bullshitting going on. Often, security vendors sell fears. Why? For a number of reasons. The first one is that the more afraid you are the higher the chances to buy the vendor's product or service. The second reason is that security experts spend enormous time researching about issues which are not very piratical in reality. In order to justify their wasted time they often exaggerate. **I am guilty too!**

In this industry everybody exaggerates. Have you been on a hacker con? No? Well pick one and give it a try. Most hacker conferences are usually places where security experts, but not only, show who has the biggest...hum...aaaa...gun, of course.

Security companies are also like that but they play for much bigger stakes. There is nothing wrong with their business model. However, keep in mind that behind these companies there are marketing engines which know very well how propaganda works. So, yes... they do sell fears very often.

The most recent example of how fears are sold to the masses is the [paper](http://www.fortifysoftware.com/news-events/releases/2007/2007-04-02.jsp) presented by Fortify Software. I don't have anything personal about these guys and I don't usually criticize but I don't know for what reasons I decided to [share my thoughts](http://www.schneier.com/blog/archives/2007/04/javascript_hija.html) on Schneier's blog and I've got into trouble. This is what I said:

> IMHO, this paper does not show anything that is new. In order to get any of the examples running you need to have access to the page DOM via XSS or some sort of browser bug. If the attacker has access to the page and the page DOM, of course they can hijack whatever they want.

> So the title "JavaScript Hijaking" does not make sense at all, at least not to me. It is almost like saying Python hijacking or Perl hijacking. If someone has access to Python or Perl's dynamic environment they will be able to hijack all of the objects.

> This paper is primarily based on using JavaScript capabilities as programming language to show fictitious problems. Every AJAX programmer knows how to overwrite prototype methods and properties but this does not make the programming feature a security problem, **unless you allow 3rd party code to run inside your trusted code**.

> It is time to look at JavaScript the same way you look at other programming languages. There is nothing different about.

I admit that I hadn't read the paper at the time when I posted this. I just skimmed over it. Latter, I found that that I did make a huge mistake. I tried to correct myself with the following message:

> Again, IMHO, this paper is more like marketing/PR campaign rather then actual security research because the vulnerabilities and issues are already disclosed and widely discussed in many blogs, mailing lists, etc.

> The authors of the paper assume that every framework that supports JSON is directly vulnerable to the attack they describe but that is not true. Most AJAX applications use JSON but a lot of them use `{}` instead of `[]` and therefore are protected.

> Moreover, the paper provides a protection mechanism that is flawed from top to bottom. I don't want to get too much into JavaScript programming internals in this comment but the general truth is the following... if the attacker load code before yours and they properly overwrite the prototype of several objects they can as well put the rest of the application in totally transparent sandbox, which means... no matter what kind of protection mechanisms you have there... they wont work.

> To sum up: I cannot see the purpose of this paper. I cannot understand why it is called JavaScript hijacking? JSON Hijacking is much better. I disagree completely that all the frameworks they mention are vulnerable. Again, if the framework exports results as `[]` or provide a callback without some sort of CSRF protection mechanism, then yes... this is a problem.

I admit that till this point I hadn't actually read the paper. Why? Well because I skimmed over it and saw the code snippets which were quite self explanatory. The paper is about how attackers can perform CSRF on JSON services to get sensitive data out by overriding the Array or Object class prototype. I tried to correct myself one more time with the following comment:

> I am still confused with the way the paper turns JSON a vulnerability. JSON is not perfect, for reasons you've mentioned, but it is not that bad. If properly used, JSON could be quite powerful and very fast because, in its most purest form, the code evaluates directly into the JavaScript interpreter (**not that this is a good idea in general**). This way the developer does not need to care about parsing the data structure.

> The only reason JSON Hijacking works is because by default the interpreter handles anonymous Arrays which I don't think that have any purpose at all. Maybe I am wrong.

> So yes ['John', 'Fred'] evaluates properly and can be hijacked via CSRF but {names:['John', 'Fred']} will trigger an error.

> Why don't u call the paper JSON Hijacking. JavaScript hijacking is too vague and usually refers to a technique that describes how to create a sandbox around the application for monitoring purposes.

However, I wanted to make a valid point which was related to the way Fortify presented their research. First of all, I think that their entire research was highly exaggerated. Why? Check this out: [New vulnerability strikes heart of Web 2.0](http://www.regdeveloper.co.uk/2007/04/03/javascript-hijacking/). What about this: [Web 2.0 is vulnerable to attack](http://www.cbronline.com/article_news.asp?guid=484BC88B-630F-4E74-94E9-8D89DD0E6606) or even [Web 2.0 Ajax Attack](http://digg.com/tech_news/Web_2_0_Ajax_Attack), [Your Ajax Applications is Under Attack If You Are Using Any Ajax Framework](http://digg.com/programming/Your_Ajax_Applications_is_Under_Attack_If_You_Are_Using_Any_Ajax_Framework), [New Javascript Hijacking Vulnerability affects ALL major Ajax toolkits](http://digg.com/security/New_Javascript_Hijacking_Vulnerability_affects_ALL_major_Ajax_toolkits), [AJAX Under Siege!!](http://digg.com/security/AJAX_Under_Siege) and [Javascript Hijacking Discovered in Google, Yahoo, and Microsoft AJAX APIs!](http://digg.com/security/Javascript_Hijacking_Discovered_in_Google_Yahoo_and_Microsoft_AJAX_APIs)

After reading all these I get the idea that the web is indeed falling apart. Actually I don't use browsers any more. I ask someone else to use them for me.

Jokes aside, I find all these articles including the entire paper presented from Fortify Software over exaggerated. I don't really care about the noise various companies generate in order to promote their products but this one particularly bugged me because, being deeply involved into this type of research I understand the security problems that are present today. All AJAX frameworks flagged by Fortify as vulnerable are not vulnerable by default at all. This means that applications coded on the top of the these frameworks cannot be attacked unless the developer coded irresponsibly.

_Enough said, let's move on._
