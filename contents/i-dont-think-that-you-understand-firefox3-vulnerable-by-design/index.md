---
title: I don't think that you understand! - Firefox3 Vulnerable by Design
author: petko-d-petkov
date: Sat, 25 Aug 2007 19:35:40 GMT
template: this/views/post.jade
---

I was going to through the latest entries in my feed reader, when I stumbled upon [Mozilla Aims At Cross-Site Scripting With FF3](http://www.internetnews.com/security/article.php/3695731). "Wow, this is interesting." So I clicked on the link and started reading. The more I read the more I knew it was a big screw up from the start.

> Mozilla is aiming to put an end to XSS attacks in its upcoming Firefox 3 browser. The Alpha 7 development release includes support for a new W3C working draft specification that is intended is secure XML over HTTP requests (often referred to as XHR) which are often the culprit when it comes to XSS attacks. XHR is the backbone of Web 2.0 enabling a more dynamic web experience with remote data.

"Uh? What is that? How is that going to prevent XSS." But wait, it is getting even more interesting.

> "Cross site XMLHttpRequest will enable web authors to more easily and safely create Web mashups," Mike Schroepfer, Mozilla's vice president of engineering, told internetnews.com.

> A typical XSS attack vector is one in which a malicious Web site reads the credentials from another that a user has visited. The new specification could well serve to limit that type of attack though it is still incumbent upon Web developers to be careful with their trusted data.

First of all, this technology is not going to prevent XSS. This is guaranteed. Second, it may only increase the attack surface since developers will abuse this technology as it is the case with Adobe Flash `crossdomain.xml`. And finally, the proposed W3C [specifications](http://www.w3.org/TR/access-control/) are insecure from start. Let's see why this is the case.

The specification describes a mechanism where browsers can provide cross-domain communication (something that is currently restricted by the same domain policies) via the all mighty JavaScript XMLHttpRequest object. In order to grant access to external scripts you can do that by using either of the following ways:

## Content-Access-Control header

The idea is that the developer provides an additional header in the response. Here is an example:

	Content-Access-Control: allow <*.example.org> exclude <*.public.example.org>
	Content-Access-Control: allow <webmaster.public.example.org>

So, as long as the response contains a header that specifies that the requesting site, which hosts the script, can access the content, no domain access restrictions will be applied. The bad news for this approach is that there is an attack vector known as **CRLF Injection**. If any part of the user supplied input is used as part of the response headers, attackers can inject additional header to grant access. Here is a scenario where this attack can be applied:

Case study 1: MySpace implements a new AJAX interface for the user contact list section. The list is delivered as XML. This REST service contains a couple of parameters. One of them is used as part of the headers. Although by default attackers cannot read the XML file due to the same origin policies, now they can trick the browser into letting them do so via CRLF injection. The attack looks like the following:

```javascript
var q = new XMLHttpRequest();
q.open('GET', 'http://myspace.com/path/to/contact/rest/service.xml?someparam=blab%0D%0AContent-Access-Control: allow <*>');
q.onreadystatechange = function () {
	// read the document here
};
q.send()
```

Ups!. This is how we tricked the browser into believing that the above site grants us with full access to the user private contact list. But wait, this is not all. I think that W3C forgot about the infamous TRACE and TRACK methods and the vulnerabilities that are associated with them. Cross-site Tracing attacks are considered sort of theoretical because there is no real scenario in which attackers can take advantage of them. On way to exploit XST, is to have access to the target content via XSS, but if you have XSS then what's the point. However, if the new spec is implemented, now we have a whole new attack vector we need to worry about. So, we are not really fixing the XSS problem, we are in fact contributing to it. Here is a demonstration Cross-site tracing attack against MySpace again.

```javascript
var q = new XMLHttpRequest();
q.open('**TRACE**', 'http://myspace.com/path/to/contact/rest/service.xml');
q.setRequestHeader('Content-Access-Control', 'allow <*>'); // we say to the server to echo back this header
q.onreadystatechange = function () {
	// read the document here
};
q.send();
```

That was too easy. I hope that FF3 restricts the XMLHttpRequest object to set "Content-Access-Control" header, but then I guess we can use Flash or Java to do the same or at least somehow circumvent FF header restrictions. I don't know.

And finally I would like you to pay attention on the fact that the browser verifies about the script access control after the request is delivered. "Uh?". Haven't you learned? CSRF!!! This means that now we can make arbitrary requests to any resource with surgical precision. Port scanning from JavaScript will become as stable as it can get. "Why?" you may ask. Here is a demo:

```javascript
try {
  var q = new XMLHttpRequest();
  q.open('GET', 'http://**<some host>**:**<port of interest>**');
  q.onreadystatechange = function () {
    if (q.readyState == 3) {
      // port is open
    }
  };
  q.send();
} catch(e) {}
```

This port scanning method does not work today, but it will if you implement the W3C standard. With the current browser specifications, the above code will crash and burn at `q.send();` step. It won't fire a request unless the origin matches with the current one. However, with the new spec on place, the `q.send();` step will fire. Then, while loading the document, the **onreadystatechange** event callback will be called several times for states 0 (uninitialized), 1 (open), 2 (sent), 3 (receiving). At stage 4 (loaded), the request will fail with a security exception. However, we've successfully passed stage 3 (receiving) which has acknowledged that the remote resource is present. Here is a simple script that can be used to port scan with the new W3C spec. It should be super accurate:

```javascript
function checkPort(host, port, callback) {
  try {
    var q = new XMLHttpRequest();
    q.open('GET', host + ':' + port);
    q.onreadystatechange = function () {
      if (q.readyState == 3) {
        callback(host, port, 'open');
      }
    };
    q.send();
  } catch(e) {
    // check the exception type... {
    callback(host, port, 'closed');
    // }
  }
}

for (var i = 0; i < 1024: i++) {
  scanPort('target.com', i, function (host, port, status) {
    console.log(host, port, status); // do something with the result
  });
}
```

## <?access-control?> processing instruction

Ok. Bad news. But check this out. W3C standard suggests that we can embed the access control mechanism into the XML document itself. Here is an example:

```xml
<?access-control allow="*"?>
<list>
	<email>joe@avarage.com</email>
</list>
```

This cross domain access control mechanism is also subjective to TRACK/TRACE and CSRF (PortScanning and State detection) vulnerabilities. Luckily, it is not vulnerable to CRLF Injection. However, in case the internal FF or IE XML parsing engine is vulnerable to some buffer overflow, we will be screwed big time. But this is another story and I guess it requires more research and of course the presence of a software vulnerability. Keep in mind that I am just elaborating here.

## In conclusion

For God's sake, do not implement the standard. Can't you see? It will open a can of worms (literally). And please, don't say that this specification will prevent XSS. It doesn't? I see how the W3C spec will enable developers to go further and do even more exciting on-line stuff but is it really worthed? You tell me, cuz I don't know what the heck your have been thinking.

**WARNING:** None of the above attacks have been verified. The conclusion about possible vulnerabilities withing the specifications have been drawn by simply looking at the W3C working draft. However, given the fact that Firefox follows specifications to the extend no other browser vendor does, there is a high chance that the vulnerabilities mentioned above may work very soon. Thank you.
