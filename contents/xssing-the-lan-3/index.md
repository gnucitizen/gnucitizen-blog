---
title: XSSing the Lan 3
author: petko-d-petkov
date: Tue, 08 Aug 2006 13:02:33 GMT
template: this/views/post.jade
category: fucked
---

![Killer Tomatoes](http://www.gnucitizen.org/static/blog/2006/08/killer-tomatoes.jpg "Killer Tomatoes")

In my [previous](/blog/xssing-the-lan) [posts](/blog/xssing-the-lan-2) I mentioned that in order to compromise a LAN device from the Internet the attacker needs to exploit a XSS vulnerability in the device firmware. The limitations of this kind of attack are quite obvious. Let's have a look at the exploitation process again.

First of all the local LAN needs to be explored for live hosts and than each host needs to be scanned with a URL Signature database in order to detect the firmware type and version. Once the firmware is detected an appropriate attack can be mounted against it.

This is a time consuming task as most of you may suggest. Unless the user spends considerable amount of time on the malicious page, the attack will most definitely fail. Fortunately or not, there are a few other possible attack vectors that can be used in order to assure successfully exploitation.

### Web Based Trojan Horses

By definition, a trojan is a program that appears desirable but actually contains something harmful. Web trojans are used to gain some kind of trust relationship with the visiting users. For example, an attacker can incorporate YouTube player inside a malicious container that carries the rest of the attack while the user previews it. Unnoticeable, the malicious flash container can perform security audit of the local network using JavaScript, ActionScript, Java, XML, XSLT and combination of these technologies. The longer the user interacts with the trojan, the more successful the attack will be.

Web trojans can be built pretty much out of anything. The most harmless of all harmful things the attacker can perform is port scanning with JavaScript on behalf of the user. The results of the scan can be send back to a collection point when the scan is completed or when the user leaves the current resource. I find this type of scenario very concerning.

### Trojan Hypes

To investigate the subject further, I've spend some time looking through some popular viral marketing materials of the past because I believe that they will be the first means for distributing web based trojans. For example, the **crazy frog** (apparently quite popular cartoon character) was very popular among the young generation mostly in United Kingdom. The most typical type of transport media for the cartoon character was flash movies. These transport mechanism can be used by web based trojans to mount attacks on a large scale.

[According to Google Trends](http://www.google.com/trends?q=crazy+frog), the **crazy frog** phenomenon was at its peak between May 2005 and Jul 2006. This is exactly 13 months. The highest point was on 29th May 2005. This means that if the attackers were after this type of viral marketing content, they would have had 5 to 6 months distribution time for shipping malicious media containers to pretty much every point on the web. The compromised media could incorporate DDoS attack that activates on certain date, mimicking a typical time bomb. Given the right channels, attackers can also make their own digital peace of art a desirable free product which is exchanged among users participating in social networks, increasing the success rate of the attack.
