---
title: Airport Kiosks Security
author: pdp
date: Sat, 24 Nov 2007 22:05:39 GMT
template: post.jade
---

I had to change at Dublin from London for San Francisco and then San Jose when I was going for the [OWASP USA event](/blog/owasp-usa-2007-appsec-conference). My flight was early in the morning so I needed to give myself a slack of a couple of hours so that I feel safe that I wont miss the joy of the long and rather exhausting flight. So, having about 3 hours to waste, I decided to go around and see if there is anything interesting to do inside the terminal. Keep in mind that it was like 4am GMT.

The only thing that worked at that time of the day were the vending machines and the kiosks. I grabbed a bottle of Sprite (free ad here) and started exploring some of the kiosk. I was not looking for security bugs or anything like that. I simply wanted to find something that would allow me to kill a couple of hours. "Games would be perfect! Unfortunately, my profession always hunts me down. As soon as I get to some kind of device, I cannot do anything else but to explore, explore, explore."

I had done tones of Kiosk hacking in the past (all legally of course) so I had a very good idea how these systems work. However, I did not have any permissions to perform any security tests whatsoever on these boxes so the only thing I could legally do is to click on buttons. So this is all I did. Sometimes, clicking on buttons is sufficient enough to get onto some interesting stuff. So, this is what I've found:

1. **I started exploring some of the free services loaded around the chrome of the Kioask.** One of them took me to a PHP script placed inside a directory named "kioskscripts". I simply uped one level in the directory structure and stumbled inside a folder which have some interesting files. This is where I stopped!
2. **Curiosity is a virtue.** Again, I started exploring some of the free services and ups... what do you know... here is the admin interface. This is where I stopped!
3. **How many people will click on the home button?** Apparently not that many. Well, I did! The home button took me to an ASP error page and guess what? Debugging mode is enabled? "No way! Get out of here!"
4. **Yes, debugs are turned on and that gives us all the sources.** This is where I stopped!

Again, all of these is based on exploration and simple observation without doing anything funky. I've got some pictures as well which I cannot share for obvious reasons. I wonder what will happen if someone tries to push the limits of these boxes.
