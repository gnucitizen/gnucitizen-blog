---
title: Hacking Linksys IP Cameras (pt 1)
author: pagvac
date: Mon, 20 Apr 2009 07:40:35 GMT
template: post.jade
category: fucked
---

During the easter break, I was playing with my my wireless Linksys IP camera which, although I bought several months ago, I hadn't taken my time to give the attention this beauty deserves until now! :)

The model in particular is the [WVC54GCA](http://www.linksysbycisco.com/US/en/products/WVC54GCA), which I would say is one of the most affordable Wi-Fi IP cameras out there (about GBP 80 in the UK), making it a great toy to tinker with. I found the camera to be quite good functionalities-wise, although I've experienced availability problems with it. It seems the camera freezes every once in a while. Well, this is true at least when you heavily customized its configuration which is what I've ultimately done after playing so much with it.

I've loved playing with embedded devices for a while, and as a security researcher I find it quite an interesting topic as many "de facto" security principles that are usually (attempted to be) followed when designing other types of systems are _not_ often applied to embedded devices. This, I believe is due to lack of limitations in hardware resources, and lack of awareness on consequences of getting a miscellaneous device compromised. i.e.: "who cares if my IP camera gets owned?"

_During the next days, I'll be posting some vulnerabilities I've found. Some of them are fun and serious, while others you might find kind of boring_.

### Meet the target

You can learn a lot about the specs of a device by simply reading the product's literature. However, sometimes not enough info is provided in these documents. The following are some of the specs I confirmed by interacting with the camera in various ways:

* CPU: `Faraday FA526id(wb) rev 1 (v4l)` according to `/proc/cpuinfo`
* OS: `Linux version 2.4.19-pl1029` according to `/proc/version` plus Busybox (confirmed as the file `/bin/busybox` exists on the filesystem)
* HTTPD: `thttpd 2.25b` (extracted from banner returned on default html error pages and 'Server:' HTTP headers)
* Memory: 30908kB (32 MB?) according to `/proc/meminfo`
* Firmware Version: V1.00R22 and [V1.00R24](http://downloads.linksysbycisco.com/downloads/WVC54GCA_FW_100R24,0.zip) (latest version available as on 16th April 2009)

It also comes with a telnet daemon (`/usr/sbin/telnetd`) but unfortunately for hackers out there, the daemon is disabled as the following line is commented out on `/etc/init.d/rcS`:

    # ---- Start Telnet Server (debug) ---- #

    #/usr/sbin/telnetd &

I have not yet managed to get a remote root shell by enabling the telnet daemon but have found some vulnerabilities which might help accomplishing this goal. I will be releasing these vulnerabilities in the next days. Please let me know if you know how to enable the telnet daemon on Linksys IP cameras! Ideally, I'd like to accomplish this without physically connecting to the camera or flashing the firmware.

### Remote admin compromise by unauthenticated attackers due to wizard design error

I found this vulnerability while investigating [CVE-2008-4390](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2008-4390). I wanted to know if CVE-2008-4390 affected my camera, even though it was reported to affect a different Linksys IP camera firmware and model. The CVE entry states:

> The Cisco Linksys WVC54GC wireless video camera before firmware 1.25 sends cleartext configuration data in response to a Setup Wizard remote-management command, which allows remote attackers to obtain sensitive information such as passwords by sniffing the network.

So I started trying to figure out if the WVC54GCA also discloses sensitive information when communicating with the [wizard](http://downloads.linksysbycisco.com/downloads/WVC54GCA-CD-Content-10-25-2007_SetupWiz.zip). [According to the vendor](http://www.kb.cert.org/vuls/id/MAPG-7HJKSA), the issue has been fixed:

> Solution: 2300 and 210 have encrypted data and have no such issue. To decode the data, an administrator username/password is a MUST.

At first sight, when capturing the traffic between the wizard and the cam, I couldn't see the data traveling in human readable form. While trying to figure out how the data is sent over the network (i.e.: encoded/encrypted), I realized there was something seriously wrong with the handshake mechanism.

The following is a very generic (and possibly inaccurate) description of the handshake

1.  Wizard (`SetupWizard.exe`) sends UDP request to `255.255.255.255:916`
2.  Camera responds back to `255.255.255.255` using the [DCERPC](http://en.wikipedia.org/wiki/DCE/RPC) protocol and presents itself with identity info such as the value of the `defname` variable which looks like `LKXXXXXX`, where `X` is a hex digit. This identity info is picked up by `SetupWizard.exe`. Some of this info such as MAC address, IP address and subnet mask is shown in the wizard.
3.  From now on, `SetupWizard.exe` uses the camera's `defname` variable when talking to it, so that the camera knows what requests submitted to `255.255.255.255:916` it should respond to.

At this point the wizard has discovered the camera and the user can go through the setup procedure. For security reasons, the user needs to enter the admin username and password, before the setup process can start. Otherwise anyone could make changes to the camera without authenticating.

Now, here is the important bit. If you capture the network traffic while running `SetupWizard.exe`, you'll notice that when the user is asked to enter the admin username and password after the camera is discovered, there are NO requests sent from the wizard to the camera in order to verify that the entered username/password combination is correct!

"How is this possible? What the heck is going on?!" I thought. I was terrified to confirm my worst fear: the wizard already knows the camera's admin username and password at this point, thus there is no need to ask the camera again. Indeed, at this point - _before the user enters the admin username and password_ that is - the camera's credentials are already loaded into the memory of the `SetupWizard.exe` process. This is because the camera  has previously transfered the admin credentials along with other configuration data!

In case I didn't explain myself properly I'll summarize the issue by saying that the camera transfers the admin username and password to the wizard before the user enters them. The following steps demonstrate how an unauthenticated attacker can remotely obtain the camera's admin username and password:

1.  Download the [setup wizard](http://downloads.linksysbycisco.com/downloads/WVC54GCA-CD-Content-10-25-2007_SetupWiz.zip). You might need to download a different wizard if you want to test this vulnerability on a different Linksys IP camera model
2.  Run `SetupWizard.exe`
3.  Click on `Click Here to Start / Setup Camera / Next` (after accepting EULA) / `Next` (4 more times in total)
4.  The discovery process is quite flaky, so if the wizard hasn't found your camera yet, click on `Search Again` as many times as required until it works
5.  You should now see your camera's name under the `Camera List` column and also various configuration data under the `Status` column:
<div class="screen">![Wizard Cam Discovery](/files/2009/04/wizard_cam_discovery-300x225.png "Wizard Cam Discovery")</div>
6.  You now need to dump the process memory of `SetupWizard.exe` using your favorite [tool](http://www.ntsecurity.nu/toolbox/pmdump/):
<div class="screen">![setupwizardexe Mem Dump 2](/files/2009/04/setupwizardexe_mem_dump_21-300x166.png "setupwizardexe Mem Dump 2")</div>
7.  Then open the memory dump file using your favorite [hex editor](http://www.chmaas.handshake.de/delphi/freeware/xvi32/xvi32.htm)
8.  Now you can either search for _admin_ and find the admin password after a few null bytes, or tell your hex editor to go to decimal position 75058 (`Address / Goto ...` menu on XVI32). In my case the admin password would always fall within this position:
<div class="screen">![Admin Password Extraction 1](/files/2009/04/admin_password_extraction1-300x217.png "Admin Password Extraction 1")
![Admin Password Extraction 2](/files/2009/04/admin_password_extraction_2-300x216.png "Admin Password Extraction 2")</div>
9.  Have fun! (the most important step really)

It is somehow ironic that a free tool provided by the vendor of a product can be used as a hacker tool against their own product.

_As far as I know, this vulnerability cannot be exploited over the Internet, since the camera only responds to wizards located in the same LAN. Never say never though, so if you find a way to exploit this vulnerability over the Internet, please [contact](https://www.gnucitizen.org/contact/) us._

**UPDATE**: CPU and additional OS info added.
