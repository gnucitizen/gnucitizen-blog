---
title: Google Search API Worms
author: petko-d-petkov
date: Thu, 14 Sep 2006 10:17:52 GMT
template: this/views/post.jade
---

One of the main disadvantages of AJAX is the lack of cross domain request capabilities. In simple words, a web object from one site cannot access another one from a different site. The reason for this security feature is hidden deeply inside every modern browser security sandbox which is responsible for keeping your personal information private and safe.

Unfortunately, with the rise of AJAX enabled application the need to break out the security sandbox receives a lot of enthusiastic support among AJAX developers.  Even Google, one of the biggest AJAX evangelist today, provides [JavaScript APIs](http://code.google.com) to allow developers to mashup their services with Google's enormous computing capabilities. As a result Google unconsciously enables various types of worms to craw and exploit the web.

The service that concerns me the most is [Google AJAX Search API](http://code.google.com/apis/ajaxsearch/), the new JavaScript powered search widget. In this article I will cover how to mashup with Google's new service in a very simple way and explain why and how it can be used by web malware to propagate. The source code provided in this article will be available in the next [AttackAPI 0.7](/blog/attackapi) release.

First of all it is essential to understand how to use the API. The technique is quite simple actually. It involves the usage of a SCRIPT element which carries a request to Google the [JSON](http://www.json.org/) way. For example:

```html
<script>
  function myCallback(a, b, c, d) {
    alert(b.results[0].title);
  }
</script>
<script src="http://www.google.com/uds/GblogSearch?callback=myCallback&context=0&lstkp=0&rsz=small&hl=en&q=Google&key=internal-documentation&v=0.1" src="text/javascript"></script>
```

Upon execution the code above returns the title of the first section from the result set and displays it in an alert box. The reader may expand on that technique.

Going back to my example, the entire logic is carried by the SCRIPT element. There are several important bits in the SCRIPT URL that need to be understood. The first one is the callback field. This is the name of the function that handles the request. The second important field is the key. Google has flexible system where keys are issued per URL. In this example the key is the generic one that can be found in all examples from Google. The last important bit is the actual query. This holds the terms that will be evaluated by Google. When loaded by the browser the SCRIPT element evaluates the content pointed by the URL in its src attribute. This results in a function call to the callback.

That is all that is required in order to make Google queries via JavaScript. There is a minor restriction introduced by Google though. There is no way to go deeper into the result set. Google will give you only the results that it believes are the most interesting and nothing more. However, this restriction can be easily circumvented by introducing diversity in the query terms. For example "intranet ext:aspx", "admin ext:aspx" and "aspx ext:asxp" produce different results and they all refer to *.aspx files. So by using query fuzzer which randomizes the search phrase more results can be extracted.

Knowing how to use Google AJAX Search API is only one side of the story. The other one and probably the most interesting one is how this can be used by web worms. Let's have a look at a couple of examples.

Web worms can use Google's infrastructure to propagate. If a malicious mind finds a vulnerability in [WordPress](http://www.wordpress.org) for example and this vulnerability allows SQL Injection, a worm may be written to craw blogs in search for this vulnerability and embed itself into everything that is vulnerable. Once a user visits an infected blog the worm starts another cycle.

Another worm might be able to craw random sites and run generic Cross-site Scripting and SQL Injection checks and send the results to their master who will use them to release more advanced worms.

Malicious minds can use Google technology and recently discovered vulnerabilities to create a BotNet that can be used for computational tasks, attacks, information gathering and pretty much everything else that the masters can come up with.

Unfortunately, I am just the messenger. Although I am not aware of any worms available that make use of this technique I won't be surprised if I see some in the near future. Malicious content in [Web Pages](/blog/backdooring-web-pages), [Flash](/blog/backdooring-flash-objects-receipt) and [QuickTime](/blog/backdooring-quicktime-movies) and [PDF](http://michaeldaw.org/md-hacks/backdooring-pdf-files/) has suddenly become one of the most common threats we face today.

_In my mind I picture a protection system similar to what we have with today's AntiVirus agents; a signature scanner that goes through every page we visit. A Firefox extension that can do that can be quite handy._
