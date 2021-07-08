---
title: Virtualizations
author: pdp
date: Thu, 19 Jun 2008 10:14:16 GMT
template: post.pug
---

Please don't take this post as a rant towards all the virtualization hackers out there. You are doing a great job and there is no doubt about that. My sole purpose is to get to the bottom of a problem which I believe is widely ignored when it comes to the purpose of virtualizations.

In [Krakow](/blog/live-mesh-good-or-bad-idea/) I had a very interesting discussion with Joanna Rutkowska, the famous rootkit security researcher (if you don't know her, google her work, it is a good read). My main objection was that virtualization technologies will never be used by the the end-users the way information security researchers are envisioning it today.

According to Joana and several other folks, the basic idea of virtualization as a security solution is:

> Segmenting your laptop into several virtualized machines increases the overall security because hacking into one of the machines wont lead to a complete compromise since, the critical data is spread out into some other segments of the same computer. For example, each user will have several operating systems running simultaneously. Each operating system will be associated with a specific purpose, i.e. a secure linux distro with a default secure browser setup will be used only for banking while a different virtual image running windows xp will be used for random surfing.

This is an interesting idea but it will hardly ever work unless you are a geek, imho. The reasons for this are very simple and straightforward:

## Administrative Overhead

It is needless to say that if your corporate laptop has more then one operating system this will mean that it will be harder for you or your sysadmin to maintain it. It is hard enough to keep up with the latest patches for a single operation system. If you are running 4 of them this would mean that you really have to spend some decent amount of time per day just to maintain some basic level of security.

## User-level Bridges

Keep in mind that that most users are not geeks and their primary goal of the day is to get their work done not to mess around with finding a clever and secure way of moving their recently stored bookmarks from the "random surfing" machine to their "corporate environment" machine. Of course, because none of the machines share disk space, the users will end up using the ingenious Windows sharing features or even some other auto syncing software such as "Live Mesh". Virtualization technologies do not make your life easier and every bridge that is used to enable users to do basic tasks will be used against them when one of the guest machines is compromised.

## Environment Considerations

Although the virtualized OS instances are insulated from each other on a machine level, this is hardly the case on much higher level. Disk space may not be shared but users are still using the same network to access the Internet. What about USBs, Discs and Memsticks? A USB drive will work across all operating systems I presume. Therefore, it is a bridge which completely defeats the purpose of having a virtualized insulation on first place. What about the Web. Some websites will be allowed for access across all virtual machines, therefore the Web is acting as a bridge between different machines.

## Complexity

Introducing unnecessary complexity is always a bad decision!

## Conclusion

In conclusion, virtualization technologies are good for certain things but let's not overestimate them. Hosting gazillions of VPS or installing an invisible rootkit are probably among the things virtualization technology is actually good for. Anything else is probably a call for a disaster.
