---
title: Holes In Embedded Devices Authentication Bypass (pt 4)
author: pagvac
date: Tue, 26 Feb 2008 16:37:36 GMT
template: post.pug
category: fucked
---

This kind of authentication bypass bug can go easily undetected during a security assessment if not enough attention is paid. In order to understand this type of vulnerability, we need to be familiar with settings pages available on devices' web interface that allow the admin user to modify settings.

Administrative web interfaces have different sections/menus available to logged-in administrators. Each section is just a HTML page with a form designed to make configuration changes. For instance, web interfaces of Internet gateways usually have pages such as WAN, LAN, WLAN, SNMP, UPnP, change password, firewall settings and so on. In summary, each page allows changing different types of settings. 

Let's assume that such settings pages are password-protected correctly. So if a given settings page can only be accessed with the admin password, does that mean that changing settings cannot be done by attackers who don't know the admin password? Actually, in some cases, it's possible to change such settings after all! Let's see why. As it's been said before, each settings page is nothing else than a HTML form (usually accompanied by some JavaScript). However, if we pay attention to the form's action attribute, we sometimes see that the parameter names and values (located in input tags) within the page form are actually submitted to a URL (usually a CGI script) _different_ to the current one.

So the question to ask ourselves is: is the actual HTTP request that performs a configuration change (usually a POST request) password-protected? If not, that would mean that the attacker can perform administrative changes, even if the settings page is password-protected!

A good example of this type of vulnerability is the authentication bypass [found](http://www.securityfocus.com/archive/1/442452/30/0/threaded) on Linksys WRT54G by Ginsu Rabbit. Although the vulnerable firmware (version 1.00.9) requires a password to view any settings page, it doesn't protect the CGI script that processes the configuration changes.

For instance, requesting the wireless settings page prompts the user to enter the admin username and password (if not authenticated already):

    GET /wireless.htm HTTP/1.1
    Host: 192.168.0.1
    Connection: close

    Unfortunately, changing the wireless settings parameters which are processed by the Security.tri server-side program does not require a password! For instance, the following POST request disables the wireless encryption without requiring the admin password:

    POST /Security.tri HTTP/1.1
    Host: 192.168.0.1
    Content-Length: 24
    Connection: close

    SecurityMode=0&layout=en

    In summary, the problem is that /wireless.htm _is_ password protected while /Security.tri is _not_. Terrible mistake!

    Another good example is the authentication bypass found on Belkin Wireless G router F5D7230-4 by loftgaia during the [Router Hacking Challenge](/blog/router-hacking-challenge/) we organized with the [Hacker Webzine](http://www.0x000000.com/?i=508). History repeats itself again: the setting pages are password-protected but not the server-side program that handles the configuration changes. In the proof of concept provided by loftgaia we can see that the DNS settings page /setup_dns.stm is properly password-protected but changing the DNS settings is possible without a password since the /cgi-bin/setup_dns.exe program is publicly available (not password protected).

    The following example is the POST request that changes the primary and secondary DNS servers to `1.1.1.1` and `2.2.2.2`, thus the attacker can fully own domain resolutions of all the users that are part of the network handled by the vulnerable Belkin device:

    POST /cgi-bin/setup_dns.exe
    Host: 192.168.2.1
    Connection: close
    Referer: http://192.168.2.1/setup_dns.stm
    Content-Length: 94

    page=setup_dns&logout=&dns1_1=1&dns1_2=1&dns1_3=1&dns1_4=1&dns2_1=2&dns2_2=2&dns2_3=2&dns2_4=2
