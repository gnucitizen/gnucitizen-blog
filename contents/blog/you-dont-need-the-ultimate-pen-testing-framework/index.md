---
title: You Don't Need the Ultimate Pen-testing Framework!
author: pdp
date: Mon, 23 Feb 2009 12:50:02 GMT
template: post.jade
---

You've already got it! It is laying on your PC and it is called the "shell". The shell was designed to start/strop and control process with ease so why do we need yet another universal pen-testing framework, which does what another tool is already doing for us and it comes by default? In this post we are going to delve in the world of advanced shell programming for penetration testing purposes.

The shell is defacto the interface to your operating system. Over the years it has turned into a very powerful machinery heavily used by programmers, hackers and system designers around the world. It is simply the ultimate environment. There are plenty of tools to support it. It is remotely accessible. It is simple, yet extremely powerful.

Because I am quite aware of the power the shell provides, every time I see another pen-testing framework which implements its own shell (obviously a lot less powerful in nature) or anything else shell incompatible, I am shaking my head in disapproval. Where are my pipes? Should I ignore the plethora of good pen-testing tools sitting on my box just to use your custom shell. Obviously, not!

Penetration testing frameworks today turn into unmaintainable monsters: abstractions, and deep inheritance all over the place; dependency nightmares and monolithic cores which no longer interact with the shell so nicely. They try to be the ultimate framework but fail immensely as they cannot be what the shell and the OS already is  (i.e. a framework) simply because there are a lot less man-hours put into them and they are a lot less diverse in terms of code and originality.

Over the last couple of days I was busy with putting a small set of command line utills in the spirit of some of my previous two experiments in the same sphere of study: [Infocrobes](/blog/infocrobes/) and [Bashitsu](http://code.google.com/p/bashitsu/). The [toolkit (also known as Jeriko)](http://code.google.com/p/gnucitizen/source/browse/#svn/trunk/jeriko) currently resides within our [random source code repository](http://code.google.com/p/gnucitizen/) which contains random codez which hasn't materialized fully yet.

The reason I wrote it is because it was fun but most of all I wanted to showcase that quite many advanced things can be achieved with a few bash scripts wrapping around common pen-testing tools. For the rest of this article we will explore some of the features of this toolkit and discuss how it can be extended upon (as it is no where near complete but it is a good start, imho) and used in various quite basic pen-testing scenarios.

Let's start with the common stuff: automation of port-scanning and vulnerability assessment. We will start by adding some targets:

    $ mkdir pen-test
    $ cd pen-test
    $ targets-add target.com
    $ targets-add << EOF
    more-targets.com
    10.10.10.10
    10.10.20.0/24
    EOF

Now we have a bunch of targets. You can also remove targets by executing the `targets-rem` script which usage is exactly like the `targets-add` script.

Once we have a bunch of targets we might want to expand them into usable IP addresses/ranges. Keep in mind that our targets list is a mixture of domain names, ip addresses and CIDR ranges. We are going to use another tool part of the collection which will convert all of this into something that we can use:

    generate-ip-batch

This tool actually wraps around nmap and outputs everything onto the screen. It is not useful unless we pipe it into something. We are going to use another script for that: `generate-scan-batch`. This script will execute `generate-ip-batch` and pipe out a list of commands for performing the basic penetration tests. The list will look something like this:

    scan-ports-tcp-full [ip]
    scan-ports-udp-full [ip]
    scan-vulnerabilities [ip]

Ok, this can be piped now into our `run-in-parallel` tool which obviously runs things in parallel in order to speed up the process. This is how we do it:

    $ generate-scan-batch | run-in-parallel

We can customize the `run-in-parallel` script by either by modifying `.jerikorc` resource file or by going the bash way like this:

    $ RUN_IN_PARALLEL_MAX_PROCESS=32 generate-scan-batch | run-in-parallel

Luckily for us we can also supply this information as command line arguments like this:

    $ generate-scan-batch | run-in-parallel 32

If you read the source of `run-in-parallel` script you will see that it is no more then 40 lines of code packed with quite a lot of power. This is what the shell gives you - excellent way to manage processes.

Once all tasks are completed, we should have several work files into our directory. We can now parse them with a set of basic command line utilities which are prefixed with `extract-`. In order to extract open services from both gnmap and nbe files we use `extract-services-gnmap` and `extract-services-nbe` respectively, like this:

    $ cat *.nbe | extract-services-nbe

How about exacting all services that has something to do with SSL? This is how we do it:

    $ cat *.nbe | grep -i ssl | extract-services-nbe

That was easy but we might want to correlate all results. It is easy once you know shell scripting. The following script does it for us.

    $ extract-services

Basic indeed! Let's now mirror the front-page of all HTTP servers. We might want to do some analysis on the results. This is how we do it:

    $ cat *.nbe | grep -i http | extract-services-nbe | awk -F, '{ print "http://"$1":"$2 }' | scan-urls

This will mirror only the front-page we can do a lot more. How about making a copy of the first 10 levels? This is how we do it:

    $ cat *.nbe | grep -i http | extract-services-nbe | awk -F, '{ print "http://"$1":"$2 }' | WGET_URL_SCAN_METHOD="-l10" scan-urls

Alright! Now we have mirrored all HTTP servers. Let's analyze them:

    $ find ./ -type f -exec cat '{}' ';' | extract-emails

This will give us all emails that we have encountered. How about retrieving everything that looks like IP address which we can add to our targets list:

    $ find ./ -type f -exec cat '{}' ';' | extract-ips

There are many more utilities which can extract things from files. We can even look for name/title looking strings and feed them to our whois scripts in order to find more about the organization we are pen-testing. This is how we do it:

    $ find ./ -type f -exec cat '{}' ';' | extract-names | scan-whois

Easy! Once we've done the basic analysis and we have identified several issues and other things and we have the permission to go further we can autopwn all targets. This is how we do it:

    $ autopwn-services</pre>`

This tool simply wraps around metasploit's `msfconsole`. However, because `msfconsole` is yet another shell we might want to send the entire process back into session from which we can detach. This is useful for many reasons and this is how we do it:

    $ session-start autopwn-services

If we press `CTRL+AD` we can detach and continue with our normal pentesting tasks until all services are fully exploited. Then we can resume by doing the following:

    $ session-list
    $ session-resume [name]

The output of the autopwn session will be saved, which is great as we might want to do further parsing abd later-stage analysis on the data.

There is a room for a lot more tools to be written. For example we can quite easily put ettercap/tcpdump into use for capturing browser cookies off the air and feeding all the information into a simple command line tool which will switch us to a different browser session depending on our choice. We don't need to write yet another framework for this. Most features already come by default and can be used if you know how.

Keep always in mind the following: don't write something someone else has already written for you unless this other product is complete crap and it needs replacement. Also, think whether your tool integrates nicely with other tools. The more integrated it is, the more it will be used in combination with others. And this is quite important.

So yes! You don't need to write everything from scratch. You don't need to mimic `screen`, `script`, `wget` or any other common tool unless you have no other choice. The ultimate pen-testing framework already exists within the most basic components of your operating system.
