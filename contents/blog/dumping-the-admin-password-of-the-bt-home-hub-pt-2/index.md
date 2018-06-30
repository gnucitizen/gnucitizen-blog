---
title: Dumping The Admin Password Of The BT Home Hub (pt 2)
author: pagvac
date: Tue, 27 May 2008 09:11:51 GMT
template: post.jade
category: fucked
---

This is just a quick update regarding our [previous post](/blog/dumping-the-admin-password-of-the-bt-home-hub) which details how to extract the default admin password for the latest firmware of the BT Home Hub (6.2.6.E at time of writing). I recommend you to read the previous post if you have not done so yet.

The BT Home Hub's serial number - which is the default admin password - can also be found on UPnP description XML files. If you own a BT Home Hub, just notice the serialNumber tags on `http://api.home/upnp/IGD.xml` and `http://api.home/dslf/IGD.xml`

> Note that no password is required to access such files, as they're used for UPnP (authentication-less) operations. Note: UPnP is enabled by default on the BTHH.

The attack needs to take place either via the Ethernet or the WLAN (Wi-Fi) interface, just like the MDAP attack described in our previous post. Unless of course you use a cross-domain vulnerability such as XSS which allows you to remotely scrape the contents of the description XML files and send them to a third-party site. Remember that the default admin password is simply the serial number with the string 'CP' prefixed to it. In other words, if the serial number was `0633EHPSL`, the default admin password for the Home Hub would be `CP0633EHPSL`. Enjoy!

**UPDATE:** the serial number disclosure reported in this post was originally tested on a BT Home Hub running firmware version 6.2.2.6 (please see screenshots for more information). However, it appears that BT has replaced such information with the Hub's MAC address in the latest firmware (6.2.6.E at time of writing).

<div class="screen">[![](/files/2008/05/bthh_sn_a-162x150.png "BTHH SN A PNG")](/files/2008/05/bthh_sn_a.png) [![](/files/2008/05/bthh_sn_b-188x150.png "BTHH SN B")](/files/2008/05/bthh_sn_b.png)</div>

_Since only the latest firmware uses the Hub's serial number as the default admin password, the reported serial number disclosure via UPnP XML description files is NOT exploitable. Nevertheless, the [MDAP attack](/blog/dumping-the-admin-password-of-the-bt-home-hub/) has been verified on the latest firmware and has been confirmed by several users both on the BT Home Hub v1 and v1.5._
