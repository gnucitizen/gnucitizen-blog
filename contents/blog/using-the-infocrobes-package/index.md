---
title: Using The Infocrobes Package
author: pdp
date: Tue, 06 Jun 2006 10:00:01 GMT
template: post.jade
---

It is probably about time to explain a little bit about the Infocrobes project. The [infocrobes](/blog/infocrobes) project is a collection of bash scripts that wrap around common UNIX utilities in order to simplify the process of extracting interesting information from various data sources.

So, what exactly you can do with these infocrobes? Well, it entirely depends on your intentions. In simple words, you can use the project to perform information gathering. For example, the following command extracts all Microsoft IP ranges:

	echo microsoft | ./grab_whois | tee microsoft.whois.log | ./grab_ips

It is also possible to generate all IPs in these ranges and feed the result to nmap as it is shown here:

	cat microsoft.whois.log | ./grab_ips | ./generate_ips | nmap

... or you may want to perform in-depth investigation on someone's whois profile. The following command can help you to achieve that:

cat 'name' | ./grab_whois | ./grab_names | sort | uniq | ./grab_whois | ./grab_names | sort | uniq | ./grab_whois

These are quite a lot of whois queries but you will be surprised how much information you can extract with this single command line. It is also worth mentioning that the output will also contain information about other organizations that you may as well be interested in or you may have to filter.
