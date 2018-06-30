---
title: The Attack of the TINY URLs
author: pdp
date: Thu, 16 Nov 2006 02:41:30 GMT
template: post.jade
---

_Just for fun I recently shrank a few URLs with the infamous [tinyurl.com](http://tinyurl.com). Well, it worked. After submitting the URL in question, I had around 26 characters long string which was perfect for the job._

I have been playing with tinyurl before. Since the service started in 2002, on numerous accessions I have been shrinking URLs like crazy. This time was different though. After finishing up all the remaining work on [AttackAPI's new interface](https://www.gnucitizen.org/svn/attackapi/branches/2.x/demos/), which I recommend to check out, I started thinking how tinyurl can be employed for evil.

So, I am there in the corner, holding a can of coke in one hand and scratching my head with the other. The room is dark. It is around 5:30pm ' 6:00pm Asian time. Then it suddenly came to me; **REMOTE STORAGE**.

Yes, I know. This thing has been known for ages. Back in 2002 people knew how to take advantage of tinyurl's service to store different files online by breaking the data into URL like segments that are indexed by a simple text file. This time was different though. I was thinking of something more agile, something that is alive. I was thinking in terms of JavaScript; moreover, malicious JavaScript.

A true self propagating worm is one that does not rely on external resources. Otherwise it will be too easy to kill. But how does a fat worm move its frame while keeping its agility? Since there is no global file system, AJAX worms may use services like tinyurl to hack around this limitation.

For the purpose of this exercise I employ a single technique that I discussed in detail over [here](/blog/traversing-the-web). What this technique shows is that although parent documents cannot read the content of child iframes, child iframes can assign values to their parent's fragment identifier. In conjunction with tinyurl storage capabilities and a simple trick, this technique can be used to make AJAX worms live and bread on the web.

The receipt for making such a worm is quite straight forward. First of all we need some type of data that is about to be stored in tinyurl. We break that into segments and base64 encode each one of them. Shrink each segment with tinyurl while keeping an index of it. Than we base64 the index and shrink again. One thing that you must remember is that we are going use fragment identifiers (#hash) to access the data. So, the actual URL that will be shrunk must have capabilities of sending data back to the parent hash and be formated in something like the following:

	http://<site>#<segment>

When the iframe is loaded, the the underlying logic will send the current hash data back to the parent hash. Of course there is another way of achieving the same result. And I repeat, tinuyrl is **NOT** vulnerable to XSS. And I repeat, tinyurl is **NOT** vulnerable to XSS and I repeat.

So, all the worm needs to remember is a 26 characters long string which eventually will expand to a quite big file. When the file is needed, the following algorithm is applied:

1. **Load** the end URL in an iframe.
2. **Wait** for a change in the hash.
3. **Read** the fragment identifier and base64 decode it.
4. **Read** the content of the data to find each segment.
5. **Load** the segment.
6. **Repeat** the process for each segment.

_Apart from tinyurl there are several other services that offer similar functionalities. One of them is [urlic.com](http://urlic.com) which is top to bottom AJAX. I wonder what else we can do with it._
