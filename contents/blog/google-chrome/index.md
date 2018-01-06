---
title: Google Chrome
author: petko-d-petkov
date: Tue, 02 Sep 2008 10:51:20 GMT
template: post.jade
---

It is true what many of you have heard. Google is releasing their own browser. Google Chrome, as they call it, is based on WebKit rendering engine and introduces some novel approaches to interacting with web technologies. I must say, it is very exciting to see all of this happening.

What makes Google Chrome different is its architecture. The browser is no longer single-threaded process. Each tab is actually a separate process with own memspace. I am not sure if we are talking about threads or actual program instances but what is more important is that when you close a tab, you are virtually terminating the process. At least, this is what Google says.

This seams to have some interesting implications on the security of the browser. If you corrupt the tab's memspace then you will crash only that particular process. The browser and all other tabs should continue working just fine like nothing ever has happened. This approach has its own advantages and disadvantages. The advantages are obvious: the user experience is intact. The disadvantages are that pwning might get easier. It is very early to me to say more on this topic because I haven't seen Google Chrome in action, but I have the slight suspicion that there will be some security consequences as a result of this security model.

Google Chrome also implements a new privacy feature. I think they call it incognito or something. Basically if you browser while being in "incognito" mode, nothing ever gets logged. I think that this is a cool feature and I believe that the IE8 team is working on something similar.

Another interesting feature which I need to mention is that popups are not blocked but they open in a minimized window. If you want to see them you just drag the popup icon and there you go. Again, this is very interesting but I can already see how this may be abused. For example, it will make a huge difference if the rendering engine has already processed the content of the popup even if it is minimized. If this is the case, then this feature could turn into a very handy mechanism of hiding malicious activities. For example, if during the attack, the page flickers or the attacker is rendering too many corrupted media files, then certainly, hiding it behind a minimized popup will be a great way of avoiding detection by casual observation. Of course these are pure speculations.

Google Chrome also provides sandboxing functionalities. Apparently each process is sandboxed but I have no details how was that implemented. So taking over a process may not result into an immediate pwnage but it will certainly give the attackers some advantage. I am very interested to learn how this sandboxing mechanism is implemented for the various operating systems if the browser is cross-platformed of course, which I believe is the case.

If everything is implemented correctly, which I hardly doubt (I am a sceptic by heart), then Google Chrome may turn into a very nice technology I may consider using it in the near future. However, none of these security features interest me as much as those that allow me to prevent poorly coded web applications leaking my details over unencrypted channels. Or even features which will prevent certain types of CSRF and XSS attacks. I've said it before! Most of my data does not reside on my computer any more. Of course this philosophy [had some bad side effects on me](/blog/targeted/), but my point is that the data is on the Web and therefore I am concerned how my browser protects me when it comes down to Web related bugs. I believe that Google Chrome lacks mostly that and if Google decide to [implement any of recommendations](/blog/lets-fix-the-web/) then in my eyes, I will certainly have a winner in the upcoming browser wars.
