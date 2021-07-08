---
title: Hacking without 0days Drive-by Java
author: pdp
date: Thu, 25 Oct 2007 16:13:36 GMT
template: post.pug
---

From [Wikipedia](http://en.wikipedia.org/wiki/Drive-by_download), the free encyclopedia, drive-by download is: "Download of spyware, a computer virus or any kind of malware that happens without knowledge of the user. Drive-by downloads may happen by visiting a website, viewing an e-mail message or by clicking on a deceptive popup window: the user clicks on the window in the mistaken belief that, for instance, it is an error report from his own PC or that it is an innocuous advertisement popup; in such cases, the "supplier" may claim that the user "consented" to the download though he was completely unaware of having initiated a malicious software download". "So what is this then?"

For those of you who have never seen a warning message like the one bellow, this is the default dialog box you get from the Java Runtime when you run cryptographically signed applets. Signed applets are different in comparison to the unsigned ones. Basically they defer in terms of their security sandbox and level of privilege. Signed applets can do anything your desktop applications can do, although they run from within the browser.

<div class="screen">[![](/files/2007/10/warning-supermario-3d-nintendo.jpg "Warning Supermario 3D Nintendo PNG")](/files/2007/10/warning-supermario-3d-nintendo.jpg)</div>

_The one million dollar question is:_

### How is that secure? and Should Sun rethink the security of their platform?

We know that unaware users will approve anything just to get their game running or job done for that matter. This type of attack is by far the simplest to pull and does not rely on any particular kind of vulnerability. The Java Runtime is the only browser embeddable object which gives such a degree of access from simple Web pages. Flash, Adobe Reader, and even Signed JavaScript (**disabled by default**) wont allow you to do all of these, mainly because it is highly insecure!

I know that a lot of angry Java developers and many "military grade" (I certainly not sure what military grade is) exploit hunters may object but let's be honest here for a moment. Most of the hacks occur due to simple human mistakes. In the case of the Java Runtime, there is **50%** chance to make the wrong choice. I think that malware authors and botnet operators like this figure a lot, especially when no vulnerability is required to perform the hack... not to mention that the information displayed inside the security warning box can be easily forged in such a way that the attackers can increase the their chances by making the user believe he or she is doing the right thing.

Over the years, I've been using this type of attack in a number of scenarios and I am not extremely happy to say this (although I had may fare share of fun) but it works so well that it almost feels surreal. The attach tar file contains a tool which I wrote long time ago to compile and sign Applets and JAR files in a few simple steps. I use it every time I can, just to prove that having Java enabled on workstation part of a large enterprise is kind of a bad idea.

_Cannot simply say that Java is insecure and we should avoid it at all cost. In fact, I think Java is awesome platform but it is obvious that although some of its security aspects are spot on, others are seriously lacking any thought._
