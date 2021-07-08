---
title: Hacking Linksys IP Cameras (pt 3)
author: pagvac
date: Thu, 23 Apr 2009 00:52:28 GMT
template: post.pug
category: fucked
---

_This article is a continuation of the following GNUCITIZEN articles, which include an introduction to the topic and also some initial observations: [Hacking Linksys IP Cameras (pt 1)](/blog/hacking-linksys-ip-cameras-pt-1/), [Hacking Linksys IP Cameras (pt 2)](/blog/hacking-linksys-ip-cameras-pt-2/)._

Unlike the [previous](/blog/hacking-linksys-ip-cameras-pt-1/) [two](/blog/hacking-linksys-ip-cameras-pt-2/) vulnerabilities I released, the vulnerabilities I'm releasing in this post are perhaps not so useful to break into the device as you need access to the admin account to exploit them. Nevertheless, these vulnerabilities might be useful for users who want to hack their Linksys IP cameras for modding purposes, rather than being used by an attacker aiming to crack into someone else's camera.

### Two directory traversal vulnerabilities

Today, instead of releasing just one vulnerability I'll be releasing two! These two vulnerabilities have helped me understand more about how the WVC54GCA wireless camera internals and I'm hoping they will also work on other Linksys camera models. Please let me know if you successfully test them on other models too!

Both vulnerabilities are of type directory traversal, aka arbitrary file retrieval, and they both affect the same CGI program: `/adm/file.cgi`. Please note that these vulnerabilities are different to [CVE-2004-2507](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2004-2507)/[BID 10476](http://www.securityfocus.com/bid/10476/exploit) which affected `/main.cgi` instead.

#### 1st directory traversal hole

It seems that the `next_file` parameter is not filtered enough when submitted to `/adm/file.cgi`, so that either of the following requests will return the content of any file whose location is known (`/etc/passwd` in this case):

    /adm/file.cgi?next_file=%2fetc%2fpasswd
    /adm/file.cgi?next_file=%2fetc/passwd
    /adm/file.cgi?next_file=%2e.%2f%2e.%2f%2e.%2f%2e.%2fetc%2fpasswd

    #### 2nd directory traversal hole

    In the case of the second directory traversal hole, the vulnerable parameter (`this_file`) is not filtered at all whatsoever. So hex-encoding special symbols is _not_ required:

    /adm/file.cgi?todo=pwnage&this_file=/etc/passwd

    The following is the content of the Linux `passwd` file containing the encrypted root password. Remember that the WVC54GCA comes with BusyBox Linux by default which you can confirm by opening `bin/busybox` with any of the vulnerabilities previously discussed. I'm curious to know if the `passwd` file contains the same password on all cameras of the same model, or even if Linksys is also using the same password on other models:

    root:9szj4G6pgOGeA:0:0:root:/root:/bin/sh

Notice that when exploiting the first vulnerability, we need to convert forward slashes to `%2f` which is its hex-encoding equivalent. This is because the developer (poorly) attempted to filter directory traversal sequences when data is submitted via the `next_file` parameter. In the third example, we also partially hex-encode `../` sequences in order to avoid being blocked by the script which results in a forbidden error.

Needless to say, if the root password is not too strong you should be able to crack it using [john](http://www.openwall.com/john/) or you favorite password cracking tool. I loaded passwd with john for a few hours on an old laptop and nothing was found, so I'm guessing the root password is not extremely weak. If you model comes with the telnet daemon running by default, cracking that password should give you root shell access.

Unfortunately, as I mentioned in the [first post](/blog/hacking-linksys-ip-cameras-pt-1/) of these series, the WVC54GCA camera comes with a telnet daemon included, but it's off by default. I haven't managed to enable the telnet daemon and get a remote root shell yet although I suspect it might be possible by [modifying](http://brooknet.no-ip.com/~lex/public/WVC54G/) the bin firmware image and uploading it again.

#### What can we do with these vulnerabilities?

Well, I tried finding files that contain interesting information that helps you understand the camera better. The following are some examples:

* `/etc/passwd` : traditional-DES-format password file with no salt
* `/usr/local/www/img/.htpasswd` : HTTP credentials stored in cleartext
* `/usr/local/www/adm/.htpasswd` : contains same data as previous file
* `/etc/system.conf` : all camera settings stored in cleartext including admin password, wifi encryption key, etc ...
* `/usr/local/bin/thttpd.conf` : web server config file confirming the daemon runs as root, which is the only system account present anyway
* `/etc/init.d/rcS`  :  here we see the line that starts the telnet daemon (`/usr/sbin/telnetd`) commented out
* `/etc/def_sys.conf` : camera's default settings
* `/etc/system.conf` : camera's current settings
* `/var/nc.log` : network connections logs
* `/etc/group`
* `/etc/inittab`
* `/proc/cpuinfo` : processor details
* `/proc/meminfo`
* `/proc/version` : OS details
* `/proc/uptime`

Finding a file upload vulnerability should allow us to overwrite the `/etc/init.d/rcS` file and eventually manage to start the telnet server after reboot. By overwriting the `/etc/passwd` file with our own we should be able to add our own root password. Unfortunately, I haven't discovered any vulnerability that would allow me to upload files to arbirary locations. If you do discover one, please let me know. I'd love to hear the details.

### Testing Info

Directory traversal vuln #1 successfully tested on:

* WVC54GCA
* Firmware V1.00R22 and V1.00R24 (latest available as on 23rd April 2009)

Directory traversal vuln #2 successfully tested on:

* WVC54GCA
* V1.00R24 (latest available as on 23rd April 2009)

Although I never tested the second traversal vulnerability on Firmware V1.00R22, I definitely suspect it will work on this previous firmware version as well.

_Please note that the aforementioned vulnerabilities are different to [BID 10476](http://www.securityfocus.com/bid/10476/exploit) which affected the `/main.cgi` program rather than `/adm/file.cgi`._
