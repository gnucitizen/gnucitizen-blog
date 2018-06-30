---
title: Target Profiling with Windows
author: pdp
date: Mon, 07 Apr 2008 16:28:40 GMT
template: post.jade
---

This Agile Hacking Cookbook recipe was inspired by Nicolasfr and Slaw who contributed some initial tips on Target Profiling. I have modified and simplified some of their content and code for a more compact solution.

Traditional target profiling typically used two techniques, DNS and WHOIS. With DNS an attacker could query for valid domains, sub domains, IP blocks and virtual hosts. With WHOIS, an attacker could learn about the company, employees and ISP information.

This recipe uses MS Windows and a bare bones install for both DNS and WHOIS queries. 

The following code is from a simple batch file I wrote (inspired by slaw) to automate domain queries. You can copy paste this into a filename of your choice (i.e. dns.bat).

```batch
@echo off
setlocal
set inputFile=%1
set nstype=%2

if {%1}=={} @echo usage: %0% domains.txt nstype (optional)
if {%2}=={} set nstype=any

for /F "Tokens=*" %%a in ('type %inputFile%') do (
        @echo Searching: %%a %nstype%
        nslookup -querytype=%nstype% %%a
)
endlocal
```

When run by itself (dns.bat), we get the following output:

```batch
C:\Users\David>dns
usage: dns domains.txt nstype (optional)
The syntax of the command is incorrect.
```

You can see that the script accepts two arguments, domains.txt and nstype. nstype could be any DNS query (i.e. A, CNAME, MX, NS etc). I created a file called "a.txt" with my inserted target domains.

```batch
C:\Users\David>type a.txt
blogsecurity.net
gnucitizen.org
withdk.com
```

Lets run our batch file with our domains (in a.txt):

```batch
C:\Users\David>dns a.txt
Searching: blogsecurity.net any
Server:  UnKnown
Address:  192.168.0.1:53

Non-authoritative answer:
blogsecurity.net        MX preference = 0, mail exchanger = blogsecurity.net
blogsecurity.net        internet address = 212.241.213.73
blogsecurity.net        nameserver = lvps212-241-213-73.vps.webfusion.co.uk
blogsecurity.net        nameserver = ns2.us.editdns.net

blogsecurity.net        nameserver = ns2.us.editdns.net
blogsecurity.net        nameserver = lvps212-241-213-73.vps.webfusion.co.uk
blogsecurity.net        internet address = 212.241.213.73
ns2.us.editdns.net      internet address = 72.249.105.234
lvps212-241-213-73.vps.webfusion.co.uk  internet address = 212.241.213.73
Searching: gnucitizen.org any
Server:  UnKnown
Address:  192.168.0.1:53

Non-authoritative answer:
gnucitizen.org  MX preference = 10, mail exchanger = ASPMX5.GOOGLEMAIL.COM
gnucitizen.org  MX preference = 1, mail exchanger = ASPMX.L.GOOGLE.COM
gnucitizen.org  MX preference = 5, mail exchanger = ALT1.ASPMX.L.GOOGLE.COM
gnucitizen.org  MX preference = 5, mail exchanger = ALT2.ASPMX.L.GOOGLE.COM
gnucitizen.org  MX preference = 10, mail exchanger = ASPMX2.GOOGLEMAIL.COM
gnucitizen.org  MX preference = 10, mail exchanger = ASPMX3.GOOGLEMAIL.COM
gnucitizen.org  MX preference = 10, mail exchanger = ASPMX4.GOOGLEMAIL.COM
gnucitizen.org  internet address = 212.241.193.208
gnucitizen.org  nameserver = ns2.hosteurope.COM
gnucitizen.org  nameserver = ns.hosteurope.COM

gnucitizen.org  nameserver = ns.hosteurope.COM
gnucitizen.org  nameserver = ns2.hosteurope.COM
ASPMX.L.GOOGLE.COM      internet address = 66.249.93.27
ASPMX.L.GOOGLE.COM      internet address = 66.249.93.114
ASPMX2.GOOGLEMAIL.COM   internet address = 209.85.135.27
ASPMX3.GOOGLEMAIL.COM   internet address = 64.233.167.27
ASPMX4.GOOGLEMAIL.COM   internet address = 66.249.93.27
ASPMX5.GOOGLEMAIL.COM   internet address = 66.249.83.27
ns.hosteurope.COM       internet address = 212.67.202.2
ns2.hosteurope.COM      internet address = 212.67.203.246
Searching: withdk.com any
Server:  UnKnown
Address:  192.168.0.1:53

Non-authoritative answer:
withdk.com      internet address = 212.241.213.73
withdk.com      MX preference = 0, mail exchanger = withdk.com
withdk.com      nameserver = lvps212-241-213-73.vps.webfusion.co.uk
withdk.com      nameserver = ns2.us.editdns.net

withdk.com      nameserver = ns2.us.editdns.net
withdk.com      nameserver = lvps212-241-213-73.vps.webfusion.co.uk
ns2.us.editdns.net      internet address = 72.249.105.234
lvps212-241-213-73.vps.webfusion.co.uk  internet address = 212.241.213.73
C:\Users\David>
```

You will notice that the tool defaults to nstype=any. 

Unfortunately, MS Windows Telnet does not support STDIN. This means we cannot pass requests outside of the telnet client, however, we can do manual requests to WHOIS servers. The WHOIS protocol is ASCII and fairly straight forward. Lets telnet to Internic and request GNUCITIZEN.COM domain information. We are using the "-f" flag to capture our output to a file:

```batch
C:\Users\David>telnet -f gc.txt rs.internic.net 43
gnucitizen.com[CRLF]
```

Next we parse the results with "findstr":

```batch
C:\Users\David>type gc.txt | findstr :

Domain Name: GNUCITIZEN.COM
Registrar: TUCOWS INC.
Whois Server: whois.tucows.com
Referral URL: http://domainhelp.opensrs.net
Name Server: NS2.123-REG.CO.UK
Name Server: NS.123-REG.CO.UK
Status: clientTStatus: clientUpdateProhibited
Creation Date: 03-feb-2005
Expiration Date: 03-feb-2009
```

Depending on the level of access one has, it is possible to upload tools such as netcat. The downside of these tools is that some proxies and Antivirus applications do not permit these files. Hence, why we try use existing operating-system functions in a clever way. Sometimes you'll find group policies may restrict access to these tools... but this is for another recipe.

By default Linux or other Unix flavours are much better suited for target profiling of this nature. This is mainly due to the fact that WHOIS, host and a variety of other great tools come by default with some flavours of Linux. These tools make it easy to automate and parse simple and complex work loads.
