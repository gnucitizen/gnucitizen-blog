---
title: Unveiling shoulder skimming
author: pagvac
date: Wed, 12 Dec 2007 16:42:58 GMT
template: post.jade
---

So now countries like the UK have converted most of their POS terminals to [Chip and PIN](http://www.chipandspin.co.uk/spin.pdf). The idea is that if somone skimmed your magnetic stripe, they won't be able to make a purchase without your PIN. Of course, in reality most of the skimmed magstripes are simply being shipped to countries where Chip-and-PIN-like systems haven't been rolled out yet, which means that criminals will be able to make purchases without knowing your PIN. Another problem with entering your PIN every time you buy something (i.e.: at a restaurant or supermarket) is shoulder-surfing your PIN. However, this problem is beyond the scope of this post.

Another current issue to deal with is the so called _fallback mechanism_ which applies to both POS terminals and ATM. Even if most ATMs and POS terminals have been upgraded to support PIN and Chip bypassing such restriction is trivial due to the fallback mechanism. By simply removing the chip (or damaging it) will cause the ATM/POS terminal to read the magstripe. So who cares if the chip cannot be cloned when criminals can still use the magstripe?

However, one problem I haven't seen discussed is what I like to call _shoulder skimming_. What if I told you that a _dishonest employee can commit credit card fraud without using skimmers or any electronic device whatsoever!_ Are you familiar with merchant receipts? Unlike customer receipts which usually contain masked CC numbers, merchant receipts contain the customer's full credit card number, issued date and expiry date.

So here is the scenario: you're at your favorite restaurant and are about to to pay the bill using your credit card.  The waiter then brings the fancy bluetooth handheld terminal. In this case, the malicious waiter can commit [CNP](http://www.google.co.uk/search?hl=en&q=define%3Acard+not+present&btnG=Search&meta=) fraud by simply shoulder-surfing your credit card security code (3 digits is easy to memorize) and then making a copy of the merchant receipt and writing down the security code. By having your full credit card number, issued date, expiry date and security code the criminal would be able to make online purchases on most online retailer sites. After that, the items can be shipped to a PO box registered using a fake ID and finally the items are sold in the black market.

_Yes, initiatives based on Visa's 3-D Secure protocol (i.e.: Verified by Visa and MasterCard SecureCode) are now being introduced on some retailer websites to protect against CNP fraud. Problem is, there are still many sites out there that don't implement such measures._
