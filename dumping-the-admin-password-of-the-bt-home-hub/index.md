---
title: Dumping The Admin Password Of The BT Home Hub
author: adrian-pastor
date: Wed, 21 May 2008 09:27:21 GMT
template: this/views/post.jade
category: fucked
---

So BT added a new security feature on the [latest version](http://snipurl.com/29w9o) of the BT Home Hub firmware (6.2.6.E at time of writing) which changes the default admin password from admin to the serial number of the router. From [BT Support and Advice](http://snipurl.com/29oo4) site:

> Firmware 6.2.6.E introduces the following improvements: Change default Hub Manager access password from 'admin' to your unique Hub serial number"

When I first noticed this new feature I thought it was quite cool and definitely a good move from BT. This is why:

* It would make CSRF attacks launched by third-party sites much more difficult since the attacker wouldn't be able to predict the admin password of the Home Hub in the exploit code. An exception to this is the attacker combining a CSRF with a authentication bypass bug. In such case, knowing the admin password wouldn't be required. Another exception would be a CSRF attack which originates from the Home Hub itself via persistent XSS on a page on which the admin must be authenticated to view (i.e.: logs page). In such case, the admin password would NOT be required in the CSRF exploit code.
* Performing a password cracking attack would be less likely to be successful

As you can see, changing the default admin password to a value which is specific to each Home Hub would make password guessing/cracking attacks much harder. At least, this is _usually_ the case. Well, it turns out that you can get the serial number of the Home Hub by simply sending a Multi Directory Access Protocol (MDAP) multicast request in the network where BT Home Hub is located. Yes, you must already be part of the LAN where the Home Hub is present, either via ethernet or via Wi-Fi. However, at GNUCITIZEN, we have [demonstrated](/blog/default-key-algorithm-in-thomson-and-bt-home-hub-routers/) trivial ways to predict the WEP encryption key of the Home Hub if you know what you are doing. In summary, there are two ways to break into a BT Home Hub Wi-Fi network:

* arp replays injection plus weak IVs cracking. This attack is typically launched using airodump-ng + aireplay-ng + aircrack-ng (I highly recommend using [Backtrack 2](http://www.remote-exploit.org/backtrack_download.html) plus the Alfa USB AWUS036S Wi-Fi adaptor for this attack)
* [Predict the Home Hub's default WEP key](/blog/default-key-algorithm-in-thomson-and-bt-home-hub-routers/) by bruteforcing a list of potential candidates which are derived from the SSID (the SSID can be obtained by anyone of course)

The following is what a MDAP ANT-SEARCH request looks like. Such request would be sent to the multicast IP address 224.0.0.103 and port 3235 (UDP):

    ANT-SEARCH MDAP/1.1
    46

    Which causes the BT Home Hub to respond with its serial number (`ANT-ID` parameter) among other information. i.e.:

    REPLY-ANT-SEARCH MDAP/1.1
    ANT-ID:0633EHPSL
    ANT-NAME:SpeedTouch BTHH
    ANT-MAC:00-14-7F-AA-BB-CC
    ANT-HOSTSETUP:auto
    TO-HOST:192.168.1.70:2317
    TP-VERSION:2.0.0
    MDAP-VERSION:1.2
    43

    The only difference between the ANT-ID parameter and the serial number of the Home Hub is that the serial number is prefixed with 'CP'. So in this example, the corresponding serial number - which is the default admin password - would be `CP0633EHPSL` (see the screenshot for more information)

    Obviously, this is not a vulnerability within the MDAP protocol, but rather a design flaw introduced by BT with the new unique admin password feature. The assumption behind this insecure implementation is that the serial number can only be obtained by the legitimate owner of the router. As we have seen, this is _not_ the case! Nevertheless, there are some security issues inherited with the MDAP protocol which I will cover in a new post.

    The following Python script dumps MDAP multicast requests:

    [http://www.gnucitizen.org/static/blog/2008/05/mdap-dump.py_.txt](http://www.gnucitizen.org/static/blog/2008/05/mdap-dump.py_.txt)

    And the following one sends the MDAP ANT-SEARCH requests which causes the Home Hub to return its serial number:

    [http://www.gnucitizen.org/static/blog/2008/05/mdap-send-ant-search.py_.txt](http://www.gnucitizen.org/static/blog/2008/05/mdap-send-ant-search.py_.txt)

    You have to run `mdap-send-ant-search.py` while `mdap-dump.py` is still running. i.e.:

    pagvac@gnucitizen$ python mdap-dump.py& python mdap-send-ant-search.py

For some reason the scripts don't work under Python for Windows or even Python for Cygwin. It should work on GNU/Linux (I tried it on Backtrack 2).

<div class="screen">[![](http://www.gnucitizen.org/static/blog/2008/05/change-default-pwd-234x150.png "Change Default Pwd PNG")](http://www.gnucitizen.org/static/blog/2008/05/change-default-pwd.png) [![](http://www.gnucitizen.org/static/blog/2008/05/MDAP-ANT-SEARCH-fu-331x150.png "MDAP-ANT-SEARCH-fu PNG")](http://www.gnucitizen.org/static/blog/2008/05/MDAP-ANT-SEARCH-fu.png)</div>

_Finally, I just wanted to thank Mark Livesey for brainstorming ideas with me which led me to explore the MDAP protocol further._
