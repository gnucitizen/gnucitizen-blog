---
title: JavaScript XSS Scanner
author: petko-d-petkov
date: Mon, 16 Jul 2007 19:13:04 GMT
template: post.jade
category: fucked
---

On this page you will find the [POC](http://www.gnucitizen.org/static/blog/2007/07/scanner.htm) of a JavaScript XSS (Cross-site Scripting) Scanner which I promised to release when I publish the [Yahoo Site Explorer Spider](/blog/yahoo-site-explorer-spider).

If you notice, the scanner is a bit restricted. It is not exhaustive and it can be improved in a number of areas. However, all restrictions were introduced on purpose for a number of reasons. The first reason is because this tool is just a Proof of Concept - it is not intended to be part of any XSS/AJAX worm, attack toolkit or other type of software whether it is malicious or not. Second, the tool should only be used for educational purposes only. Last but not least, this tools is written just to prove that AJAX worms can propagate across several domains by scanning and discovering new vulnerabilities on their own. That used to be considered a theoretical attack vector. In this example we put the theory into practice.

The XSS Scanner relys on an external proxy server to locate the XSS holes. The proxy in use is called **Palary** and you can find more information about it over [here](http://palary.org/). Here is what the developers of the Palary have to say about their product:

> The Palary Browser is a cutting-edge, web application that delivers a secure, personalized surfing experience. The main advantages of the Browser over classical technologies are as follows:
> 
> **Security** - The Palary Browser by default disables Javascript in webpages. Javascript is a useful technology in many circumstances, but is also insecure and opens your computer up to innumerable web based attacks. These attacks are impossible when using the Palary Browser.
> 
> **Privacy** - The Palary Browser increases your privacy on multiple fronts. On a wide front, the Browser prevents your ISP, your government, or another body from tapping your web-surfing. All data is routed through the Browser's servers so that is impossible for these bodies to see what information you are accessing or sending. (The above assumes that you have media disabled on webpages.)
> 
> On a more local front, the Browser prevents history files, cache files, and cookie files from being saved to your computer. This means that no one with access to your computer will be able to see where you have been surfing.
> 
> [Palary.org](http://palary.org/)

Funny enough we can use Palary to detect XSS vectors although the authors have designed it to prevent them. I am not sure whether this is a bug or something else. I simply don't know.

Once you open the POC application there are two options that are given to you. The first one is to use the XSS scanner together with the [Yahoo Site Explorer Spider](/blog/yahoo-site-explorer-spider). The spider is restricted in terms of depth and number of results per page. You can spider only the top 50 results. Again, this is done on purpose. Concurrently with the spider, the scanner will test for the XSS issues and deliver the result via a callback mechanism.

The second option scans only one URL. The scanner will grab your input and mutate it into various XSS vectors. Then it will try each one of them. On "success" the scanner returns a callback and displays the results on the screen. If for any reasons there are no results on the page, this means that no XSS was found. Again, keep in mind that the scanner was crippled on purpose and to be honest it is a bit basic. :)

Here is the scanner's source code:

    [http://www.gnucitizen.org/static/blog/2007/07/scanner.js](http://www.gnucitizen.org/static/blog/2007/07/scanner.js)

    and this is how I use it:

    [http://www.gnucitizen.org/static/blog/2007/07/scanner-init.js](http://www.gnucitizen.org/static/blog/2007/07/scanner-init.js)

_This is pretty much it!_
