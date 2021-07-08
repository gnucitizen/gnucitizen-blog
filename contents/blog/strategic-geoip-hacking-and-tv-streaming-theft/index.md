---
title: Strategic GeoIP Hacking and TV Streaming Theft
author: pagvac
date: Fri, 16 Nov 2007 14:22:00 GMT
template: post.pug
---

A couple of weeks ago, my wife pointed out to me this really [cool appliance](http://www.cnettv.com/9742-1_53-27769.html) she saw on a magazine. Since she knows I like spending my free time hacking/researching embedded devices, she thought I'd be interested.

In summary, you hookup [Slingbox](http://www.slingmedia.com/go/slingbox) to your TV box, be it digital TV, or cable. Then you can do streaming to your laptop, desktop computer or even mobile/cell phone. The best thing is that not only you can stream within your home (LAN) network, but also from the Internet, anywhere any time! Of course you would need to setup port-forwarding on your border router to accomplish this first. Don't be fooled and think that only geeks would enable such setups because of its difficulty. Truth is, SlingPlayer (the client), will help you automatically enable port-forwarding on your router through a easy-to-use wizard (which uses UPnP in the background to talk to your router, in case you are interested). Never the less there are also instructions to [setup remote viewing manually](http://support.slingmedia.com/page/remote-viewing-tutorials).

After researching the device a bit, I learned that all you need is install the client called SlingPlayer. In order to receive the video stream, a connection is established to port 5001 on the appliance, and then you just authenticate with a username/password combination. As you can see it's a very standard client-to-server setup!

Most people that setup port-forwarding on their router to their Slingbox would forward port 5001 from their router to port 5001 on the Slingbox, simply because this is how the documentation available shows users how to manually setup [remote viewing](http://support.slingmedia.com/go/remote-viewing) to their Slingboxes' video stream. SlingPlayer's can also be used to enable port-forwarding on such port by following an automatic wizard which is perfect for non-technical users. Cutting the story short, the target port to find Slingboxes on the Internet would be 5001.

Imagine someone found an authentication bypass bug. Or maybe, most users leave default credentials on. There is potential for stealing TV services. This of course doesn't only apply to this device but many others that are in charge of services such as TV streaming, VoIP telephony, etc ... How would a cracker come about finding these boxes on the Internet? Well, from a GeoIP hacking point of view, step number one would be to find the countries with Slingbox users. By browsing slingmedia.com, you learn that the device is available for the USA, UK, Canada and the Netherlands.

pdp [wrote](/blog/strategic-hacking-geoip) a script (do.sh) that downloads Maxmind's [free GeoIP database](http://www.maxmind.com/download/geoip/database/http://www.maxmind.com/download/geoip/database/) and parses the IP ranges of all countries - sweet! The end result is a file with IP ranges using the following format which separates the start IP and end IP with a coma ( , ) : `X.X.X.X,X.X.X.X`. The problem is that this notation is not compatible with nmap. Since what we want is scan countries with Slingboxes for port 5001, we need to convert the IP ranges to a notation that can be understood by nmap, which can be done with the following script.

```bash
#!/bin/bash
# iprange2nmaprange.sh

# just change the following line to match the country csv file you want to convert
for i in `cat country-XX.csv`
do
        startIP=`echo $i | cut -d ',' -f 1`
        endIP=`echo $i | cut -d ',' -f 2`

        startA=`echo $startIP | cut -d '.' -f 1`
        startB=`echo $startIP | cut -d '.' -f 2`
        startC=`echo $startIP | cut -d '.' -f 3`
        startD=`echo $startIP | cut -d '.' -f 4`
        #echo $startA $startB $startC $startD

        endA=`echo $endIP | cut -d '.' -f 1`
        endB=`echo $endIP | cut -d '.' -f 2`
        endC=`echo $endIP | cut -d '.' -f 3`
        endD=`echo $endIP | cut -d '.' -f 4`
        #echo $endA $endB $endC $endD

        if [ $startA -eq $endA ]
        then
                nmapA=$startA
        else
                nmapA="$startA-$endA"
        fi

        if [ $startB -eq $endB ]
        then
                nmapB=$startB
        else
                nmapB="$startB-$endB"
        fi

        if [ $startC -eq $endC ]
        then
                nmapC=$startC
        else
                nmapC="$startC-$endC"
        fi

        if [ $startD -eq $endD ]
        then
                nmapD=$startD
        else
                nmapD="$startD-$endD"
        fi

        echo "$nmapA.$nmapB.$nmapC.$nmapD"
done
```

	./test.sh > targets

In this case we're interested in the files `country-US.csv`, `country-GB.csv`, `country-CA.csv` and `country-NL.csv`. Once converted to nmap IP range notation with the previous script we're ready to go:

	nmap -P0 -n -iL targets -p5001 -oG results

Everything is turning to TCP/IP these days. Not only consumer devices, but also corporate and governmental appliances. Although this approach makes it cheaper to build products by reusing existing implementations/frameworks/APIs, there is a price to pay: it makes it easier for people (including bad guys) to perform vulnerability research, since TCP/IP is widely understood.
