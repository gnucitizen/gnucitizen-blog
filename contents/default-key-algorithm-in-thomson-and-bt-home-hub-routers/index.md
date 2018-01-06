---
title: Default Key Algorithm In Thomson And BT Home Hub Routers
author: adrian-pastor
date: Mon, 14 Apr 2008 08:00:33 GMT
template: this/views/post.jade
category: fucked
---

Yes, we're back with more embedded devices vulnerability research! And yes, we're also back with more security attacks against the BT Home Hub (most popular DSL router in the UK)!

As you know, we encourage folks in the community to team up with us in different projects as we've had very successful experiences doing so. This time it was Kevin Devine's turn. Kevin, who is an independent senior security researcher, did an awesome job at reverse engineering the **default WEP/WPA key algorithm** used by some Thomson Speedtouch routers including the BT Home Hub. Kevin noticed that all the public vulnerability research conducted in the past for the BT Home Hub had been [released](http://www.google.co.uk/search?q=site:gnucitizen.org+bt+home+hub&num=100&hl=en&filter=0) by GNUCITIZEN, so he decided to share his findings and work with us in this fascinating project.

### Confirmed suspicions

Many of us involved researching the security of wireless home routers have always suspected that routers that come with default WEP/WPA keys follow predictable algorithms for practical reasons. Yes, I'm talking about routers that come with [those stickers](http://www.belkin.com/support/dl/assets/uk-labels/bthomehub2.jpg) that include info such as S/N, default SSID, and default WEP/WPA key. Chances are that if you own a wireless router which uses a default WEP or WPA key, such key can be predicted based on publicly-available information such as the router's MAC address or SSID. In other words: it's quite likely that the bad guys can break into your network if you're using the default encryption key. Thanks to Kevin, our suspicion that such issue exists on the BT Home Hub has been confirmed (keep reading for more details!). Our advice is: **use WPA rather than WEP and change the default encryption key now!**

### Brief history of default WEP/WPA key algorithms research

As far as I know, Kevin and james67 were the first researchers to publicly crack a default encryption key algorithm of a Wi-FI home router. Kevin [cracked](http://h1.ripway.com/kevindevine/wep_key.html) the algorithm used by Netopia routers which are shipped Eircom in Ireland and AT&T in the US (the second ISP was never reported, 0day!). On the other hand [james67](http://www.skyuser.co.uk/forum/blogs/james67/) [targeted](http://www.skyuser.co.uk/forum/sky-broadband-help/20295-breaking-terms-conditions-your-views-welcome-2.html#post128738) the Netgear DG834GT router shipped by SKY in the UK. Unfortunately, james67 did [not](http://www.theregister.co.uk/2008/02/21/sky_broadband_wi_fi_keys_unpicked/) publish the details of the algorithm he cracked which is a shame as it means that we cannot learn from his research.

### The Thomson Speedtouch default WEP/WPA algorithm

Unlike james67, Kevin's strategy to crack default WEP/WPA algorithms involve debugging setup wizards shipped by some ISPs, as opposed to debugging the router which uses the default key algorithm. Kevin obtained a copy of such wizard ("stInstall.exe") provided by Orange in Spain - which can be found on broadband customers' installation CDs. Such setup utility allowed him to figure out the default key algorithm.

In short we have: `S/N -> hash -> default SSID and encryption key` which can be read as: a hashed version of the router's serial number is generated which is then used to derive both, the default SSID and the default encryption key. This is just a high-level overview of the algorithm. More specifically we have (quoted from Kevin's stkeys tool source code comments):

> Take as example: "CP0615JT109 (53)"
> 
> Remove the CC and PP values: CP0615109
> 
> Convert the "XXX" values to hexadecimal: CP0615313039
> 
> Process with SHA-1: 742da831d2b657fa53d347301ec610e1ebf8a3d0
> 
> The last 3 bytes are converted to 6 byte string, and appended to the word "SpeedTouch" which becomes the default SSID: SpeedTouchF8A3D0
> 
> The first 5 bytes are converted to a 10 byte string which becomes the default WEP/WPA key: 742DA831D2

In the case of the BT Home Hub, the only difference that is we only take the last two bytes (rather than 3 bytes) from the SHA1 hash to derive the SSID:

S/N: CP0647EH6DM(BF)
Remove CC and PP values: CP06476DM
"XXX" values hex-encoded: CP064736444D
SHA1-ed: 06f48a28eba1ab896a396077d772fd65503b8df3
Default SSID: BTHomeHub-8DF3
Default encryption key: 06f48a28eb</pre>`

By brute-forcing possible serial numbers and deriving the default SSID and encryption key, we can find possible keys for a given default SSID, which is exactly what Kevin's [stkeys](http://weiss.u40.hosting.digiweb.ie/stech/stkeys.zip) tool does.

The bigger the number of hexadecimal digits the target SSID has, the smaller the number of generated possible keys is. For instance, if the target SSID is "SpeedTouchF8A3D0", we can narrow down the number of possible keys to only two. On the other side, a target SSID with only 4 hex digits (2 bytes) such as "BTHomeHub-20E3" would give us 80 possible keys _on average_.

We've tested ST585v6 which is shipped by Orange in Spain. Thomson Speedtouch routers provided by Orange in Spain come with WPA enabled by default. Being able to **narrow down the number of possible default WPA keys to only two** using Kevin's tool is quite remarkable.

In the case of the BT Home Hub in the UK (which only comes with 40 bits WEP encryption by default by the way), we can narrow down the number of possible keys to about 80. In order to avoid the brute-forcing computation time required by the stkeys tool, I created "BTHHkeygen" which looks up the possible keys for a given SSID from a pre-generated `SSID->keys` table. Think of it as a rainbow table for cracking the BT Home Hub's default WEP encryption key. Once the list of around 80 keys is obtained, the second step in the attack is to try each of them automatically, until the valid key is identified. For this purpose I created "BTHHkeybf" which is a fancy wrapper around the "iwconfig" Linux tool. Unfortunately, in order to prevent abuse, we're not publishing such tools. We tested three different BT Home Hubs, and the the attack seems to work fine.

There is one thing that I want to mention regarding this attack when launched against a BT Home Hub: breaking into a BT Home Hub Wi-Fi network which uses default settings (40 bits WEP) has always been possible in a matter of minutes (if packet injection attacks are used) since the Home Hub was released into the market. Therefore, this predictable-default-key attack doesn't change the current state of the BT Home Hub's Wi-Fi insecurity. It's always been known that BT Home Hub Wi-Fi networks can be easily broken into by [cracking the WEP key](http://www.hackernotcracker.com/2007-06/using-aircrack-ngaireplay-ng-under-injection-monitor-mode-in-windows.html)!

**UPDATE**: we decided not to publish BTHHkeygen and BTHHkeybf for now, although they might be released at a certain upcoming conference.
