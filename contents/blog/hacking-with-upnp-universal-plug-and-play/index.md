---
title: Hacking with UPnP (Universal Plug and Play)
author: pdp
date: Thu, 10 Jan 2008 11:45:44 GMT
template: post.jade
---

During last month, just around the holiday festivals, Adrian and I did some investigation about potential uses and abuses of the so called UPnP (Universal Plug and Play). The reason why we started playing with this particular technology was mainly due to an urge to discover other creative ways to break into embedded devices. What we have discovered was not necessarily new but rather interesting and very, very intriguing. Soon we realized that very few people in the security/hacker circles are aware of what UPnP is for and how to make use of it. We thought that this is a huge gap which needs to be filled since during our investigations we stumbled upon many networks and devices vulnerable to various types of UPnP related attacks. The number of UPnP related vulnerabilities is quite concerning and we believe that we should pay more attention on this technology in the future.

Keep in mind that this article is not referring to any bugs discovered within the UPnP protocol itself or the devices that support it. We simply expose how UPnP works and how it can be attacked. Though, Adrian has a very interesting [research](/blog/bt-home-flub-pwnin-the-bt-home-hub-5) coming up which I think will make you flip out. HE SHOWS HOW TO EXPLOIT UPNP REMOTELY EVEN WHEN NO SERVICES ARE INTERNET FACING ON THE IGD (Internet Gateway Device).

> We will be glad if we can present our findings in detail on some of the upcoming security/hacker conferences around the world. So, ping us if your are interested.

So what is UPnP? From the [Wikipedia's article](http://en.wikipedia.org/wiki/Universal_Plug_and_Play) we learn the following:

> Universal Plug and Play (UPnP) is a set of computer network protocols promulgated by the UPnP Forum. The goals of UPnP are to allow devices to connect seamlessly and to simplify the implementation of networks in the home (data sharing, communications, and entertainment) and corporate environments. UPnP achieves this by defining and publishing UPnP device control protocols built upon open, Internet-based communication standards. [Wikipedia](http://en.wikipedia.org/wiki/Universal_Plug_and_Play)

To sum up, UPnP is a set of protocols that deals with the discovery and use of devices that are hot-plugged in a network. The types of devices which usually support UPnP are Home Wirless/ADSL Routers, Printers, Mobile Phones, Cameras, TV boxes, in the future maybe even toasters, fridges, washing machines, etc. Because it is a burden to configure each device separately, we use UPnP to manage them all. Not only that, but we can also use UPnP so that devices can manage themselves. How is that possible?

We mentioned earlier that UPnP is based on several technologies, which are: SSDP (Simple Service Discovery Protocol), GENA (Generic Event Notification Architecture), SOAP (Simple Object Access Protocol) and free format XML (Extensible Markup Language). Each of these technologies is responsible for dealing with particular parts of the UPnP stack. Here are a few things that you need to know about UPnP:

* **Addressing** - First of all, due to the fact that each device needs to be hot-plugged in a network, the device should have DHCP client, which will automatically assign an IP address for further communication. This is not very interesting but it is worth mentioning it. For example, in cases where the device is not DHCP enabled, there is a great chance that it is not UPnP enabled either.
* **Discovery** - This is where SSDP comes into place. Each UPnP enabled device advertises its services on a particular URL. In order to collect all UPnP device, we need to send several (mostly one) packets that comply with SSDP. I won't go into details how this is done but it is very much trivial and very close to how HTTP works with a few exceptions.
* **Description** - Once the devices are discovered, it is time for reading the device description. This information is located within XML formatted files which can be pulled from the URL obtained from the discovery process. Once we read the files, we know what kinds of methods are supported and what parameters each method has.
* **Control** - Once the description processing is completed, we can control the device by submitting the right types of requests as SOAP messages. In the SOAP message body we supply the method name and information about the parameters and their value. Then we submit it to the control point which processes the request and returns some kind of output, which is again encapsulated as a SOAP message.

And this is how UPnP works in general. I suggest to read some of the documentation available on the net to get better understandings off UPnP because it is something worth knowing about, as you will see next.

## Hacking with UPnP

I will leave the interesting and NEW stuff to Adrian but in general every device that supports UPnP is probably hackable. Let's say that you connect to an open WIFI network and you can see the gateway which is some home hub or whatever type of wireless router it might be. As an attacker/pen-tester, you will probably try to guess the administrative credentials which you can use for the WEB admin interface. If the the device happens to be left with default configuration, you are a lucky man and you can proceed after several attempts of things such as admin, adm, password, pass, guest, etc for the BasicAuth credentials. What happens if someone has actually made the effort to change the default password? Pick up the bruteforcers? Hold on!

In situations like that, I would rather go with UPnP. First of all, UPnP does not support any means for authenticating with the device. Second, most wireless routers provide UPnP functionalities which can change the entire device configuration and as such expose it to further attacks. I've seen numerous networks where we can very easily change the DNS server of the UPnP enabled wireless router. **This is pretty much equal to rooting your machine but mainly applicable to networks.** In cases like this, the attackers will be able to control your network traffic from the moment they send the "Change of DNS Server" UPnP request. Many wireless devices also allow to change the admin password, add port forwarding rules (a.k.a poking holes into your firewall and exposing Intranet services on the Internet), configure dynamic DNS, reboot the router, disconnect PPP, steal PPP credentials, reset PPP credentials, configure wireless settings, retrieve wireless settings, etc, etc, etc. Yes, you do not need any authentication whatsoever.

> The future promises that even more device will become UPnP enabled and that will increase the attack surface of UPnP related hacks. Imagine a future where attackers can order food for your fridge on behalf of you or switch of your electricity with nothing more but a single SOAP request.

There are a few good tools that I use for UPnP penetration testing although most of them have huge limitations. This is the reason why I am developing my own UPnP testing toolkit which will be available for download soon.

## Speculations on Viral-like UPnP Attacks

Over the last couple of days there was loads of FUD regarding viral-like attack for WiFi networks. I've read the proposed paper and I couldn't find anything practical about it, though I have related the viral concept to the UPnP research that we have been doing at GNUCITIZEN.

> The truth is that it is trivial to root open WiFi networks. All attackers need to do is to drive by the access point, send SSDP discovery request, read the access point description, check whether there is a method for changing the DNS server, execute the SOAP request to change the DNS of the router to an external DNS server that is controlled by the attacker and move on the next target.

If this is not scary I don't know what is. UPnP is a serious risk and it is a surprising that very few people pay attention or even know how to make use of it. Stay tuned. A very interesting post comes [next](/blog/bt-home-flub-pwnin-the-bt-home-hub-5).
