---
title: New Version Of Dnsmap Out
author: adrian-pastor
date: Sun, 22 Feb 2009 16:42:19 GMT
template: this/views/post.jade
category: fucked
---

We just released a new version of [dnsmap](http://www.gnucitizen.org/static/blog/2009/03/dnsmap-0222tar.gz). dnsmap is a subdomain bruteforcer for stealth enumeration.

Originally released in 2006, dnsmap is mainly meant to be used by pentesters during the information gathering/enumeration phase of infrastructure security assessments. During the enumeration stage, the security consultant would typically discover the target company's IP netblocks, domain names, phone numbers, etc. dnsmap was [included](http://backtrack.offensive-security.com/index.php?title=Tools "Tools") in Backtrack 2 and 3, although the version included is the now dated version 0.1.

Subdomain brute-forcing is another technique that should be used in the enumeration stage, as it's especially useful when other domain enumeration techniques such as zone transfers don't work (I rarely see zone transfers being publicly allowed these days by the way).

## Original Features of Version 0.1

* obtain all IP addresses (A records) associated to each successfully bruteforced subdomain, rather than just one IP address per subdomain
* abort the bruteforcing process in case the target domain uses wildcards
* ability to be able to run the tool without providing a wordlist by using a built-in list of keywords
* bruteforcing by using a user-supplied wordlist (as opposed to the built-in wordlist)

## New Improvements in Version 0.22

* saving the results in human-readable and CSV format for easy processing
* fixed bug that disallowed reading wordlists with DOS CRLF format
* improved built-in subdomains wordlist
* new bash script (`dnsmap-bulk.sh`) included which allows running dnsmap against a list of domains from a user-supplied file. i.e.: bruteforcing several domains in a bulk fashion
* bypassing of signature-based [dnsmap detection](https://lists.dns-oarc.net/pipermail/dns-operations/2006-September/001047.html) by generating a proper pseudo-random subdomain when checking for wildcards

## Usage

    usage: dnsmap <target-domain> [options]
    options:
    -w <wordlist-file>
    -r <results-path>


## Example on Live Domain

The following is just an example so you get an idea of how dnsmap works. Very simple to use as you can see. If you want to save the results or use your own wordlist, checkout the usage syntax. Question for those who pay attention to detail: can you spot the potential leaks of [internal IP addresses](http://www.faqs.org/rfcs/rfc1918.html)?

```bash
$ dnsmap baidu.com
dnsmap 0.22 - DNS Network Mapper by pagvac (gnucitizen.org)

[+] searching (sub)domains for baidu.com using built-in wordlist

accounts.baidu.com
IP address #1: 10.11.252.74

events.baidu.com
IP address #1: 202.108.23.40

finance.baidu.com
IP address #1: 60.28.250.196
IP address #2: 60.28.251.79
IP address #3: 60.28.251.206
IP address #4: 123.129.240.28
IP address #5: 123.129.240.29
IP address #6: 60.28.250.102
IP address #7: 60.28.250.111

forum.baidu.com
IP address #1: 202.108.250.212

images.baidu.com
IP address #1: 61.135.163.93

mail.baidu.com
IP address #1: 10.23.3.137

mobile.baidu.com
IP address #1: 202.108.23.125

mx.baidu.com
IP address #1: 61.135.163.61

mx1.baidu.com
IP address #1: 61.135.163.61

mx2.baidu.com
IP address #1: 61.135.163.62

mx3.baidu.com
IP address #1: 61.135.162.61

news.baidu.com
IP address #1: 61.135.163.87

ns1.baidu.com
IP address #1: 202.108.22.220

ns2.baidu.com
IP address #1: 61.135.165.235

ns3.baidu.com
IP address #1: 220.181.37.10

oracle.baidu.com
IP address #1: 172.18.0.50

photo.baidu.com
IP address #1: 61.135.163.93

photos.baidu.com
IP address #1: 61.135.163.93

pop.baidu.com
IP address #1: 61.135.166.249

proxy.baidu.com
IP address #1: 202.108.11.30

smtp.baidu.com
IP address #1: 61.135.163.61

vpn.baidu.com
IP address #1: 202.108.250.231

wap.baidu.com
IP address #1: 61.135.163.237

webmail.baidu.com
IP address #1: 61.135.166.249

win.baidu.com
IP address #1: 10.65.19.212

www.baidu.com
IP address #1: 220.181.5.222

www1.baidu.com
IP address #1: 220.181.5.222

www2.baidu.com
IP address #1: 202.108.22.136

www3.baidu.com
IP address #1: 202.108.22.188

[+] 29 (sub)domains and 35 IP address(es) found
```
