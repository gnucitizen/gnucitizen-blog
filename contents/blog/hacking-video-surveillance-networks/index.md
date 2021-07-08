---
title: Hacking Video Surveillance Networks
author: pdp
date: Wed, 30 Jan 2008 11:05:48 GMT
template: post.pug
---

**The usual suspects:** George Clooney, Brad Pitt and Matt Damon. **The plot:** rob a casino. **The method:** hijack the vault's security camera video stream and replace it with a static image. "Fiction?" I don't think so.

This post is not going to be about how to hack into the video surveillance networks of your local government but rather about my personal opinion about the current state of security implemented by the latest video technologies. I hope that the post is as entertaining as enlightening and helpful in your work. I also hope that it gives you the edge to go ahead and implement better, more secure surveillance systems that will actually protect whatever needs to be protected.

Over the past week, I've been heavily involved with exploring several techniques for attacking IP-based video cameras. Apart from the usual vulnerabilities that you find across these types of embedded devices (XSS, CSRF, Authentication Bypass, Brute force attacks that really work, Overflows, etc.), I've come up with some quite interesting observations, which may come as a no-surprise to some of you, but nevertheless they worth to be mentioned as we are often unable to comprehend the simplicity of the matter). So here you go:

## The concept of TRUST is fundamentally broken!

Simply put, there is no way of knowing whether the camera on the other end is the device that is expected to be. Currently, there is no trust model that is implemented by IP-base video surveillance systems. The attack method is rather simple. Go ahead and disconnect the camera and hook a notebook on its place. Done! The Video surveillance software will never know that the camera has bee replaced by a static video stream produced by another device. "Is that surprising?" I hope not because this is the reality.

The next time you watch a movie where the bad guys replace a video stream from the security surveillance system by hooking a device to the network, count it as a real and very possible hack!

## Installing rogue video cameras is easy!

Many of the IP-based video surveillance solutions are based on simple discovery protocols such as mDNS and UPnP. Both of them work on multicast addresses. Therefore, it is extremely easy to fake as many cameras as we want.

Here is how to do this. The `[register.py](/files/2008/01/register.py)` script will register a brand new AXIS 206 camera, while the `[server.py](/files/2008/01/server.py)` will feed MJPG video stream from an external source. This is how we use them:

	register.py **[your mac address here]** &
	server.py http://152.1.130.216/mjpg/video.mjpg **# MJP video stream**

Keep in mind that we can register as many video cameras as we want and as such cause a panic or a simple misdirection. We can also do funky thinks like making the video surveillance system to believe that the camera at the back of the casino is actually the camera installed at the entrance?

## Barefoot computer networks are flawed, so does IP-based surveillance systems

Computer networks are vulnerable to all sorts of attacks: ARP spoofing/hijacking, rogue DHCP servers, rogue DNS servers, routing issues, subnet hopping, eavesdropping, etc. The list goes on and on. In order to mitigate these problems, we often rely on higher (mostly level 7) encapsulation mechanism that guarantee the integrity of the lower encapsulation levels (think of SSL). IP-based surveillance systems simply does not have these types of security layers yet. They are largely based on the assumption that no one has access to the network where these devices are located. It might be harder to physically access a video network, but it is not impossible. Think about it. Every camera is a potential entry point, no matter how high on wall you will put it. Given the fact that a lot of these video surveillance systems have WiFI these days, the situation becomes even more concerning.

## Administrative functions are handled over ancient security mechanisms

All embedded devices can be accessed via their HTTP server with the need of Basic Authorization credentials. Basic Auth is sniff-able and easily reversible-able. This is why it is called **basic**. Moreover, it can be easily used for stealing access credentials of the video surveillance system. For that to work, the attacker needs a fake "credentials-hijacking" camera. The `[stealing_server.py](/files/2008/01/stealing_server.py)` script part of the PoCs comes into play. This is how we launch the attack:

	register.py **[your mac address here]** &
	stealing_server.py http://152.1.130.216/mjpg/video.mjpg "AXIS 206" 5 **# MJP video stream, realm AXIS 206, 5 consequent tries**

Upon execution, the `register.py` will register a new AXIS 206 camera. Then the `stealing_server.py` will activate. It won't take long until the video surveillance software calls for video initialization. At this stage a Baisc Authentication realm will be provided. Since most video surveillance systems provide facilities to store all your camera credentials so that it is easy to manage them all, these credentials will travel to the rouge camera server, where they will be decoded and displayed to the attacker. The chances that the same credentials are used across all devices are pretty high. So, there you go. Now the bad guys have access to all your video resources.

## Mitigations

I don't know where to start really. I guess that when thinking about embedded devices we should really think of something that is extremely flawed. Therefore, they endangers the surrounding clients and the network to which they are connected.
