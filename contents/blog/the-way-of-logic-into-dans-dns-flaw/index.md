---
title: The Way of Logic into Dan's DNS Flaw
author: pdp
date: Thu, 17 Jul 2008 10:49:37 GMT
template: post.pug
---

There is a serious flaw in the DNS system and apparently it is a design bug, the types of bugs I like the most. I am very curious to learn what exactly Dan has prepped for us and I get the feeling that we will be deeply shaken by its simplicity.

Although, I have no clue what this bug is, and I am also reluctant to pursue its mystery for my own entertainment, I will try to express what it could be by walking you through a simple process of thinking by elimination. Keep in mind that we could have been fooled and put off track with the information that is currently available - a common showmanship trick - so much like Dan :).

### So, let's start with the information that we have:

> * It is a flaw in the DNS system which allows attackers to poison the cache of your nameservers.
> * The patch has to do with randomizing the source port of the standard query response.
> * Although quite serious, Dan is suggesting that it is not the end of the world just yet (probably irrelevant but good to mention).> 

### Then, I would have to conclude that:

> * It has something to do with sending fake/forged responses to the attacked namerserver due to the fact that the patch is related to randomizing the source port of the standard responses and as such contributes to the increased level of difficulty for a successful forgery.
> * The attacker must know in advance or can predict the transaction ID and given the fact the source port is static, she can then forge a response.
> * It is probably something that can happen but it may not work well for high profile domains such as `google.com`, `microsoft.com`, etc due to being almost persistently cached for quite active namerservers... I don't know, just suggesting.> 

### That leads to the following:

> * The attack is remote so we can eliminate man-in-the-middle attacks. This means that the attacker is blindly sending packets to the attacked server hoping to poison its cache.
> * Predicting the transaction IDs could be possible but probably irrelevant to Dan's advisory otherwise it would have been an old news. Therefore Dan probably knows it in advance and I think that this is where the design bug come into play.
> * ... nothing here.. :) we can disregard this point> 

### Which suggests that:

> * We have a remote blind attack - packet spoofing etc.
> * Dan knows the transaction IDs in advance - of course, the only thing that will save the day is to add a random source port.> 

### Having this in mind:

> * In order to perform the attack we need a simple spoofing/flooding tool.
> * We might need to involve our own DNS server to help us predict or guess the transaction IDs - the design bug, which involves the plethora of DNS magic including CNAMES, A and PTR queries.

And this is where I am pretty much stuck after spending 30 minutes skimming through all news resources and research materials available online. As I said, I will leave the show to Dan and I am looking for some great entertainment this year at Black Hat Las Vegas. If you are interested in learning about some more design bugs, you may want to check out my own poor [presentation](http://www.blackhat.com/html/bh-usa-08/bh-usa-08-speakers.html#Petkov) which I will happily [present](http://www.blackhat.com/html/bh-usa-08/bh-usa-08-speakers.html#Petkov) on the first day of BH.
