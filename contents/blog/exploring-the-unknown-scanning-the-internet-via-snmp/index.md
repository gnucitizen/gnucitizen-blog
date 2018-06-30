---
title: Exploring The UNKNOWN Scanning The Internet Via SNMP
author: pagvac
date: Mon, 03 Mar 2008 16:51:32 GMT
template: post.jade
category: fucked
---

Hacking is not only about coming up with interesting solutions to problems, but also about exploring the unknown. It was this drive for knowledge philosophy that lead to surveying a significant sample of the Internet which allowed us to make some VERY interesting observations and get an idea of the current state of remote SNMP hacking.

## Why SNMP?

2.5 million random IP addresses were surveyed via SNMP. "Why SNMP you might be asking?" Well, there are several reasons.

First of all SNMP is a UDP-based protocol which allows us to perform scanning at a much shorter time than via TCP-based protocols. Another advantage of UDP-based protocols is that the source IP address can be spoofed easily. In the case of SNMP, it means that an attacker could change configuration settings from a spoofed IP address provided that a valid write community string is identified or cracked. Needless to say changing config settings via SNMP can lead to a full compromise. Finally, we have been [very involved](http://www.google.com/search?num=100&hl=en&q=site%3Agnucitizen.org+%28embedded+devices%29+OR+upnp&btnG=Search) researching embedded devices lately, and since a significant amount of Internet devices are hackable via SNMP, such protocol was an obvious candidate.

## When SNMP read access is all we need for successful pwnage

Gaining SNMP write access is of course usually considered to be a more serious issue than gaining SNMP read access only. However, even if a cracker only gained read access to a device/server via a SNMP community string, sometimes it would possible to extract sensitive information such as usernames and passwords which would eventually lead to a compromise of the targeted systems. In order to accomplish this, all that is needed by the attacker is knowledge of an interesting OID to query. My point is that SNMP read access could be enough to fully own a device!

## Examples of juicy leaks via SNMP read access

For instance, Windows servers return the [full list of usernames](http://insecure.org/sploits/NT.smnp.domain_users.record_deletion.html) by snmwalking the OID `1.3.6.1.4.1.77.1.2.25`. Or how about the BT Voyager 2000 router leaking the [ISP credentials](http://www.securityfocus.com/archive/1/366780) including the password? Oh, wait, I almost forgot to mention HP JetDirect printers [leaking](http://www.phenoelit-us.org/stuff/HP_snmp.txt) the [admin password](http://www.securityfocus.com/bid/7001/exploit) via SNMP read access (using OIDs `.iso.3.6.1.4.1.11.2.3.9.4.2.1.3.9.1.1.0` and `.1.3.6.1.4.1.11.2.3.9.1.1.13.0`). And of course the [recently disclosed](http://www.procheckup.com/Hacking_ZyXEL_Gateways.pdf) Dynamic DNS credentials disclosure on ZyXEL Prestige routers via the OID `1.3.6.1.4.1.890.1.2.1.2.6.0` (see section 2.2 in the paper for more details). You get the point: lots of devices leak way too much information via SNMP read access.

## The juicy survey stats!

From a total number of 2.5 million random IP addresses, 5320 IP addresses responded to the submitted SNMP requests. Although this is only %0.2128 of all the IP addresses, we need to keep in mind that most Internet systems with SNMP support correspond to embedded devices, which only make a small portion of the Internet. One query was sent to each random IP using the community string `public`, which is often used as the default read community string. The OID queried on each request is `1.3.6.1.2.1.1.1.0` which is the system description (usually returns brand and model). The destination port used was 161/UDP. Although some systems used different default port numbers for SNMP daemons, 161 is definitely the most common one.

In order to protect the innocent, we hid the first two octets of the IP addresses included in our results CSV file:

```bash
cat ./2dot5million-random-ips.csv | while read line
do
	echo -en '*.*.'>>./2dot5million-random-ips.hidden.csv;
	echo $line | cut -d "." -f 3- >> ./2dot5million-random-ips.hidden.csv
done
```

The most common systems found were the following:

* [ARRIS Touchstone Telephony Modems](http://www.arrisi.com/products/touchstone/index.asp)
* Cisco routers
* Apple [AirPort](http://www.apple.com/airportexpress/) and Base Station
* ZyXEL Prestige routers
* Netopia routers
* Windows 2000 servers

Obviously, what kind of SNMP-enabled devices are the most popular on the Internet is very interesting information from a research point of view. For instance, if researching remote SNMP vulnerabilities, it would make sense to focus on a type of device that is widely-spread through the Internet.

_I'll leave you guys to make your own observations by reading the [results CSV file](/files/2008/03/snmp-results.csv)._
