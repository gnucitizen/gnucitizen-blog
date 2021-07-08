---
title: Rain Of -MINUS Transactions
author: pagvac
date: Tue, 11 Sep 2007 11:43:15 GMT
template: post.pug
---

In this post, I will describe a type of attack that I have never tested in real life. Of course, this doesn't mean it can't work against a real environment. In fact, it is my suspicion that many online merchants are susceptible to this type of attack. I once discussed the attack described in this post with one of the main technical contacts from a large UK online retailer who thought that the attack might work against certain setups.

Most of us are familiar with DDoS attacks which are sometimes used by criminal groups as a vehicle to blackmail companies to transfer them considerable amounts of money. Most of these attacks are based on bandwidth consumption and are launched through botnets of compromised home computers

Usually, a criminal group would target a company, say an online casino. Our naughty guys would first study which sites are essential for the business continuity of the target company. Typically, there would be several websites on which customers make online transactions using their debit/credit cards. Once the potential targets to DoS have been located, the criminal group would proceed by contacting the target company and asking for a large amount of money - otherwise the continuity of their business would be interrupted by a DDoS attack.

A second type of DoS attack, would involve finding a DoS vulnerability on any of the software present on the target sites. The vulnerability could exist on the web server, application framework or any of the server-side scripts present on the targets. Ideally the DoS vulnerability would freeze or reboot the target system. However, because the attackers need to have knowledge of a 0day DoS vulnerability, this type of DoS is perhaps less common in typical "give us money or we'll DoS you" type of attacks.

In both types of attacks the idea is that the financial loss that the victim company would suffer in case such attack was launched would scare the company into opting to pay the amount requested by the criminal group.

Let's now get to the core of this post. What if the attacker wanted to also cause an economical loss to the target company while the e-commerce infrastructure is still available to all customers? You might be wondering, what's the point? After all, causing the infrastructure NOT being available is a great way to cause economical harm to a company.

Well, I'm not sure what the answer to that question is. Perhaps, the attacker wants to be polite somehow. Perhaps, you are a pentester and you want to prove how someone could cause economical harm while customers are still able to access all e-commerce sites.

The different type of economical-loss attack that I wanted to share is based on declined credit/debit card transactions. Usually, when we provide credit card details online during the checkout procedure, the target application follows two main stages when validating the credit card details:

* **Offline credit card check**: check if credit card number is a valid CC type (determined by 4 first digits). Also check whether the credit card number follows Luhn's algorithm (aka mod10 checksum)
* **Online credit card check**: contact acquirer/issuer to attempt to make the transaction

Some sites will also perform [AVS](http://www.visaeurope.com/merchant/handlingvisapayments/cardnotpresent/addressverificationservice.jsp) checks. In this case, if the address provided didn't match the [cardholder](http://www.google.com/search?q=define%3Acardholder)'s, most [payment service providers](http://en.wikipedia.org/wiki/Payment_Service_Provider) would also charge a fee to the merchant, regardless of whether the AVS transaction is successful or not. Basically, if we can get through the offline check, we can cause the victim merchant to pay a fee to their [PSP](http://en.wikipedia.org/wiki/Payment_service_provider) or payment gateway. The reasons could be failed AVS or card number/from date/expiry date checks. In short:

<div class="message">By tricking the target's merchant webapp to perform an online credit card check with the PSP, we can force the merchant to pay for a transaction fee regardless of whether or not the transaction was successful. If such action can be repeated in an automated fashion, an attacker can cause the merchant to lose potentially large amounts of money without denying legitimate users access to the e-commerce sites.</div>

Merchants usually pay a small fee to their PSP for each successful or failed transaction. It's worth it mentioning that some PSPs will charge smaller fees for failed transactions, than for successful ones.

For the sake of the argument let's suppose we can make 5 failed transaction per second by using several connections in parallel. That would give us 5 transactions x 60 secs x 60 minutes x 24 hours x 30 days x 0.20 cents per transaction = a loss of $1,2960,000 in a month. Now, that's not peanuts :D Of course we could have more parallel connections and thus increase the number of transactions per second.

However, one would think that a merchant or PSPs would have enabled protections against this type of attack. After all, it is not normal user behavior to submit transaction requests thousands of times in a row.

So the next question is what kind of countermeasures can be enforced on the server-side application? The following are some I could think of. I'm sure you can think of others.

* **Limit** the number of transactions over a given period of time per IP address.i.e.: a max of 50 transactions per hour per unique IP address.
* **Limit** the number of transactions per HTTP session.
* **Use** CAPTCHAs so that requests cannot be programmaticaly submitted. 

The problem with the previous countermeasures is that although they could make the -Minus Transactions Attack more difficult, such countermeasures can be bypassed:

* **Proxy** each transaction request through a different HTTP/SOCKS proxy.i.e.: using TOR or SocksChain.
* **Automate** the process of signing out and signing in between transaction requests.
* **Bypassing** this protection is probably the hardest (but [possible](http://ocr-research.org.ua/)!). The attacker would need to research the CAPTCHA type used by the target and break it or use a [third-party tool](http://www.captchakiller.com/captchakiller.xpi) that has already been tweaked to break the target CAPTCHA. 

_By the way, if you're interested in non-technical ways to break CAPTCHAs, check out the [following](http://www.boingboing.net/2004/01/27/solving-and-creating.html) attack vector which I found quite funny and clever at the same time. I think of it as a creative CAPTCHA MITM attack :-D_
