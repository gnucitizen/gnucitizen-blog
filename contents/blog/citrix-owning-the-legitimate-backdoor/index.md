---
title: CITRIX Owning the Legitimate Backdoor
author: pdp
date: Thu, 04 Oct 2007 16:26:51 GMT
template: post.jade
---

> The Internet is full of wide open CITRIX gateways. This is madness!

The other day I was performing some CITRIX poking, so I had a lot of fun with breaking GUIs, which, as most of you probably know, are trivial to break into. I did play around with .ICA files as well, just to make sure that the client is not affected by some obvious client-side vulnerabilities. This exercise led me to reevaluate many things about ICA (Independent Computing Architecture). For example, when querying Google and Yahoo for public .ICA files, I was presented with tones of wide open services, some of which were located on **.gov** and **.mil** domains.

> This is madness! No, this is the Web. Through, I wasn't expecting what I have found. Hacking like in the movies? You bet!

    Google: [ext:ica](http://www.google.com/search?q=ext:ica), Yahoo: [originurlextension:ica](http://search.yahoo.com/search?p=originurlextension:ica)

    I did not poke any of the services I found, although it is obvious what is insecure and what is not when it comes to citrix. It is enough to look into the ICA file. I am not planning to go into details here but let's say for now that ICA gives you hints about the server, the underlaying transport mechanism and of course the remote application that will be opened.

    With a few lines in bash combined with my Google python script, I was able to dump all the ICA files that Google knows about and do some interesting grepping on them. What I discovered was unbelievable. Shall we start with the Global Logistics systems or the US Government Federal Funding Citrix portals - all of them wide open and susceptible to attacks. Again, no poking on my side, just simple observation exercises on the information provided by Google.

    ### Breaking into Citrix

    When performing a Citrix tests, my goal is very simple: "try to open a command shell". Sometimes, `cmd.exe` and `command.com` are blocked, but I can still execute commands by saving them in `.bat` or `.cmd` files. If you care to read the command output, just pause the window with `pause`. It is simple. Let's not forget about Windows Scripting Host (WSH) which is usually not blocked at all.

    But to get to the command line, you have to escape the GUI first and when it comes to Windows GUIs, escaping them is like a walk in the park. As soon as you open explorer with File Open/Save/Save as/Print or Help features, you can execute commands. Just for demonstration purposes, I composed a [video](/files/2007/10/hc01.wmv) that shows how it is done:

    <iframe class="video" src="//www.youtube.com/embed/1-cXrZIVlTU" frameborder="0" allowfullscreen></iframe>

    Here is more. The following example shows an ICA file which just opens `cmd.exe` right in front of your eyes:

    [WFClient]
    Version=2
    TcpBrowserAddress=_some address_

    [ApplicationServers]
    _PlanVue 03 Tri-City_=

    [_PlanVue 03 Tri-City_]
    Address=_some address_
    InitialProgram=**cmd.exe**
    ClientAudio=On
    Username=_some user_
    Domain=_some domain_
    Password=
    AudioBandwidthLimit=2
    Compress=On
    TWIMode=On
    ScreenPercent=80
    DesiredColor=8
    TransportDriver=TCP/IP
    WinStationDriver=ICA 3.0
    EncryptionLevelSession=EncRC5-128

    [EncRC5-128]
    DriverNameWin32=PDC128N.DLL
    DriverNameWin16=PDC128W.DLL

    [Compress]
    DriverName=PDCOMP.DLL
    DriverNameWin16=PDCOMPW.DLL
    DriverNameWin32=PDCOMPN.DLL

    It is unbelievable but it works.

    Among the ICAs I found, there were a few which do require authentication. For dedicated attackers, this is definitely not the end of the world. Now you probably think that it is time to take out all the bruteforcers and dictionary files and start some heavy drilling. "Hold on! Let's try the backdoors first."

    After you connect to Citrix you will land most likely on the Desktop which is protected by the Windows/Netware logon. However, keep in mind that there might be some applications underneath that does not require authentication, just like those we discussed earlier. So how do we find them? Ian Viteks [coded](/files/2007/10/enum.pl) a perl script to do exactly that:

    [/files/2007/10/enum.pl](/files/2007/10/enum.pl)

    I was intrigued by Ian's script, so I decided to write my own. However, I wasn't very keen on re-reversing citrix so I through I would go the easy way - reusable components. A few minutes on the Citrix' website were enough to get me started. I ended up with the following [script](/files/2007/10/enum.js). Keep in mind that you need to have a copy of the Citrix client in order to get it going:

    [/files/2007/10/enum.js](/files/2007/10/enum.js)

I don't know which script is better.  Ian's implementation seams to be cross-platformed and quite transparent for the user but it works only for UDP, while my approach works only on Windows and it requires a bit of understanding the architecture but it supports all possible ways Citrix can establish connections, and it can enumerate the Citrix servers and farms as well. Here is a demonstration of how you can use it:

<div class="screen">![Hacking CITRIX Screen01](/files/2007/10/screen01.jpg "Hacking CITRIX Screen01")</div>

### Conclusion

Ok, it is lame but with pretty much the same success, attackers can hack into quite sensitive services. It is unbelievable to me to find out that pretty much anyone can tap into huge organization with a few dirty Citrix tricks. And here are some stats:

<div class="message">Just by looking into Google, I was able to find **114** wide open CITRIX instances: **10** .gov, **4** .mil, **20** .edu, **27** .com, etc... The research was conducted offline, therefore there might be some false positives. Among the services discovered, there were several critical applications which looked so interesting that I didn't even dare look at them. With a similar success, attackers can perform just simple port scans for service port 1494. The steps described above apply.</div>
