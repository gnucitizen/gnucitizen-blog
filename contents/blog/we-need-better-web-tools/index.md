---
title: We Need Better Web Tools
author: pdp
date: Fri, 21 Nov 2008 17:33:26 GMT
template: post.jade
---

_Oh yes, we certainly do! And let me tell you something: they ain't going to be quite the same thing as what we are used to._

Back in the days all you needed was a poxy, a dummy scanner/spider just to lift of your back some of the repetitive and boring things, and your brain. You are pretty much settled. Today, you need to do things beyond that. Web technologies are just starting to show their ugly face and we are here to see/experience them for the first time.

Let's see: Workers, Cross-origin Access Control, Persistent Storage and Push Cross Origin Communication, to name a few, are the things that we should learn how to test properly for, because these are all real technologies and be very sure that their adoption will be quite quick and painless, therefore security bugs will most surely start to emerge out of the blue.

Simply put, today's web security tools cannot be even adopted to perform tests related to the technologies point above, simply because they were never designed to test browser/client-side technologies. I mean, how on earth can you check the current state of a Worker unless you hook the browser? And even if do all the hard work to make your tool do that, than the question that you need to ask yourself is whether it was worth at all because most certainly it wont be any useful unless you are trying to fuzz all the possible events and combinations of events in order to make sure that everything behaves as expected, and this is kind of hard to do and not anywhere near being practical.

The thing is that web applications are getting richer nowadays. There are even more complicated. It is no longer all about efficient spidering regardless whether you use AJAX or not. We have to dig into the code. But JS/HTML/CSS/SVG code is painful to read because of the degree of obfuscation these languages are capable of. We do not have a single representative way like ASM code or something. Perhaps at some point we might be able to extract bytecode but even then I doubt that it will be any useful since it will be still be tangled in its own way.

_My point is that there are no tools to help us with analyzing complicated web applications. We need to totally change our methodologies and start thinking of newer ways to achieve our goals._
