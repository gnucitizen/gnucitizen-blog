---
title: BT Home Flub Pwnin The BT Home Hub (3)
author: adrian-pastor
date: Tue, 23 Oct 2007 10:39:35 GMT
template: this/views/post.jade
---

Here are the news: it seems that BT is [restricting/crippling the remote assistance feature](http://bt.custhelp.com/cgi-bin/bt.cfg/php/enduser/cci/bt_adp.php?p_sid=B612fPOi&cat_lvl1=346&cat_lvl2=401&cat_lvl3=407&cat_lvl4=751&p_cv=4.751&p_cats=346,401,407,751&p_faqid=10492) as a result of the vulnerabilities we [reported](/blog/bt-home-flub-pwnin-the-bt-home-hub). I personally found the following [statement](http://www.theregister.co.uk/2007/10/22/home_hub_vuln_plugged/) interesting:

> A BT spokesman said service will be unaffected by disabling the feature, since support can still access the Home Hub using the separate Remote Access feature.

Something tells me that this "separate Remote Access feature" will also be open to abuse if not locked down properly. Furthermore, some of the vulnerabilities we found (which we forwarded to BT) can still be exploited even if the Remote Assistance featured is removed.

For those who missed it, Dave Hughes, BT's director of wireless broadband, labeled the Home Hub vulnerabilities we discovered as **theoretical** last Wednesday on a [BBC Radio 4 show](http://www.bbc.co.uk/radio/aod/radio4_aod.shtml?radio4/youandyours_wed). Nothing could be further from the truth. I can only hope that Mr Hughes, simply wasn't informed correctly by BT, as opposed to spreading missinformation for the sole purpose of protecting BT's public image. Instead, it would have been more appropriate (in my humble opinion) to admit there are **SERIOUS** security issues with the BT Home Hub, and explain that BT is working on fixing the **PRACTICAL** issues. I hope that BT appreciates that we are not providing exploit code until we confirm that the issues have been fixed, for the purpose of **protecting** BT customers. If the issues were really **theoretical** we would have published the full details already.

Hopefully, this is not a half-baked fix. Our test BT Home Hub should be upgraded to the [new firmware 6.2.6.B](http://bt.custhelp.com/cgi-bin/bt.cfg/php/enduser/cci/bt_adp.php?p_sid=cRR8WROi&cat_lvl1=346&cat_lvl2=401&cat_lvl3=407&cat_lvl4=751&p_cv=4.751&p_cats=346,401,407,751&p_faqid=9377) soon which we will test with the new FON service. The question is: will the new firmware be  still affected by some of the vulnerabilities we found? If not, have new vulnerabilities been introduced with the new firmware? Look out for new information coming up on GNUCITIZEN regarding our results after testing the new firmware!
