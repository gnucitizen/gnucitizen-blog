---
title: Holes In Embedded Devices - Desynchronized Service Accting As Backdoor
author: adrian-pastor
date: Wed, 06 Feb 2008 11:04:08 GMT
template: post.jade
---

Embedded devices usually offer different types of services or interfaces so they can be configured by administrators remotely either from the Internet or over the LAN. Some of the most common examples include Telnet, FTP, SSH, HTTP (web console), HTTPS and SNMP.

Provided that such services are allowed to be accessible from the Internet, the embedded device could be configured by an administrator who could be located anywhere on the planet.

These administrative services usually require administrators to authenticate via a username/password pair. However, what if the credentials for one of these services were not synchronized with the credentials on rest of the daemons/services?

In order to illustrate the idea of a desynchronized service acting as a backdoor, let's consider a hypothetical scenario. Let's say for instance that a vulnerable embedded device runs Telnet and HTTP by default. In order to lock down the device, the admin user decides to change the default admin password to a hard-to-guess value via the web console (HTTP). The admin user simply chooses to do so via HTTP rather than Telnet because he finds it easier to configure the device with a web browser rather than a Telnet terminal.

Once the default admin password has been changed, most people would assume that administrative access is not possible using the default password anymore. However, in this case, the vulnerable device uses two different internal administrative accounts for the HTTP and Telnet interfaces. The consequences are fatal: the admin user believes that it's not possible to gain admin privileges to the device using the default password. Nothing could be further from the truth in our hypothetical scenario as the Telnet daemon still allows users/attackers to login using the default admin password!
