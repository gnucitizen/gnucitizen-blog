---
title: Call Jacking - Phreaking the BT Home Hub
author: adrian-pastor
date: Mon, 21 Jan 2008 02:46:53 GMT
template: post.jade
category: fucked
---

OK, this is a bit of a funny attack - although it could also be used for criminal purposes! After playing with the BT Home Hub for a while ([again!](http://www.google.com/search?q=site%3Agnucitizen.org+bt+home+hub)), pdp and I discovered that attackers can steal/hijack VoIP calls. Let me explain ...

In summary, if the victim visits our evil proof-of-concept webpage, his/her browser sends a HTTP request to the BT Home Hub's web interface. After this, the Home Hub starts a VoIP/telephone connection to the recipient's phone number specified in the exploit page. This is what the attack looks like: the victim's VoIP telephone starts ringing and shows an external call message on the LCD screen along with the recipient's phone number. However, what's interesting is that from the point of view of the victim, it looks like he/she is receiving a phone call from the number shown on the screen, but in fact he/she is calling that number! "Sweet, simple and effective, just the way we like it at GNUCITIZEN!"

    POST http://api.home/cgi/b/_voip_/stats//?ce=1&be=0&l0=-1&l1=-1&name=

    0=30&1=**00390669893461**

Now, this attack will work even if the default admin password has been changed on the BT Home Hub. Reason for this is that the exploit relies on an authentication bypass vulnerability that we have [reported](/blog/bt-home-flub-pwnin-the-bt-home-hub-4) a while ago and hasn't still been fixed by BT! In our original report, we mentioned that the HTTP authentication mechanism can by bypassed by using double slashes in the target URL. Actually, the authentication can also be bypassed with many other characters, but I'll leave this to the reader to discover.

The following are some attack scenarios in which this vulnerability could be used for:

* annoyance or prank purposes
* advanced phishing attacks in which the victims gets a phone call from "Trusted Bank" after clicking on a link included in the phishing email. The fact that the attacker calls the victim's phone number would help him/her gain the victim's trust. **HINT:** "Phishers usually don't know your phone number!"
* toll fraud attacks in which the victim calls one of those very expensive number that allow the bad guys to make good bucks by simply starting the conversation

I don't want to repeat myself, but please remember that from the victim point of view it _looks_ like he is receiving a phone call but in fact he is making/paying for the phone call!

<div class="screen"><object width="425" height="355"><param name="movie" value="http://www.youtube.com/v/0V0YZQWYCHI&rel=1"></param><param name="wmode" value="transparent"></param><embed src="http://www.youtube.com/v/0V0YZQWYCHI&rel=1" type="application/x-shockwave-flash" wmode="transparent" width="425" height="355"></embed></object></div>

And finally the boring (but needed) testing details: tested on BT Home Hub firmware 6.2.6.B. Only customers using the BT Broadband Talk service are affected by this attack. Other firmware versions are likely to be affected as well, but we have not tested them.
