---
title: Messing With Web Filtering Gateways
author: pagvac
date: Wed, 14 Jan 2009 17:49:26 GMT
template: post.jade
category: fucked
---

Most of us are familiar with several techniques that allow us to bypass web filtering gateways like [CS MIMESweeper](http://www.clearswift.com/products/msw/web_appliance/default.aspx).

The following are some of them:

1.  access the desired site via IP address rather than domain name
2.  access cached content rather than live data. i.e.: using Google's `[cache:](http://216.239.59.132/search?hl=en&q=cache%3Awww.gnucitizen.org%2Fabout%2F&btnG=Google+Search&meta=)` command
3.  using proxies. i.e.: anonymouse, Google translator, etc
4.  using alternative connections. i.e.: connecting your laptop online via your mobile/cell phone's [HSDPA](http://en.wikipedia.org/wiki/High-Speed_Downlink_Packet_Access) interface

Each method has different advantages and disadvantages. For instance, method #1 only works on servers that do NOT use domain-based virtual hosts, i.e.: shared hosting. The exception to this rule is that the site served by default when requesting the IP-based URL (rather than domain-based), is the one you're after. You'll have to use your judgment when deciding which technique is the right one for you.

Whatever the reason may be, there are many legitimate reasons for accessing websites that are blocked by the gateway in question. Personally, when I'm doing on-site pentests, I sometimes need to access useful online resources, which unfortunately are often flagged under the "hacking" category.

### Another nifty trick

There is perhaps a lesser known technique which although does not work against all appliances, it does work even in cases where the web server you want to connect to uses domain-based virtual hosts. I've personally seen work on a Clearswift MIMEsweeper environment. _Note that it might not work against the latest versions, so please keep this in mind if you can't replicate this technique!_

The idea is to sneak the domain name matching the server's virtual host, while being able to bypass the content filter. As you know, filtering gateways block bad websites based on domain names. For instance, an HTTP request would be inspected to make sure that the requested URL doesn't contain a black-listed domain name.

Not too long ago I tested a MIMEsweeper appliance and noticed that HTTP requests were only inspected for bad domain names within the URL data, but not within the `Host:` header, i.e.:

    GET http://1.2.3.4/ HTTP/1.1
    Host: www.blockedsite.foo
    [some headers removed for clarity purposes]

The previous HTTP request would bypass MIMEsweeper's filter (not sure if it works on all versions) even if www.blockedsite.foo was a black-listed domain. Reason for that is because only the `http://` URL is being inspected. The remote server would still happily return the website we're interested in as we have successfully established a TCP connection, and the desired virtual host has been requested.

I put the following steps together to test this technique using Firefox's [Modify Headers](https://addons.mozilla.org/en-US/firefox/addon/967) extension. Please see the attached screenshots for more details:

1.  Get the target site's IP address by using a command line tool such as ping or host, or public websites such as domaintools.com
2.  Fire up Modify Headers
3.  Add a new modify rule (top-left drop-down menu) and enter `Host` as a name, and the domain name of the site you want to visit as value
4.  Double-click on the new rule so that the red light becomes green (rule is now active)
5.  If the technique worked against your appliance, you should now be able to freely browse the blocked site by entering its corresponding IP address in your browser's address bar

_And this is one of the many techniques to bypass web filtering gateways._
