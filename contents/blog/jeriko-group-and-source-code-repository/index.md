---
title: Jeriko Group and Source Code Repository
author: pdp
date: Tue, 28 Apr 2009 06:50:39 GMT
template: post.pug
---

Jeriko moved in its own source code repository which you will be able to find [here](http://code.google.com/p/jeriko/). There is also a discussion group [here](http://groups.google.com/group/Jeriko).

The version inside the new code repository is very different from the version you've seen before. The main difference is that while the old version is basically a collection of scripts, the new version implements its own shell (wrapper around bash) which does the heavily lifting and also introduces some funky programming mechanisms. For example, now you can create jeriko scripts like this:

    #/usr/bin/env jeriko
    # do my jeriko commands here
    foreach-input | add-targets
    generate-scan-batch | run-in-parallel

This is perhaps the simplest possible script you can write but you see that the jeriko shell could turn into a quite powerful feature. The shell is also a good starting point for many penetration testing jobs as it does some environment checking and preconfigures some defaults for you. The other good news is that you don't have to learn a new programming language. Your bash skills are good for jeriko too.

Just keep in mind that jeriko is merely an experiment. However, I realize that it has already become quite useful for some people. So, if you enjoy playing with bash scripts, and you you feel adventurous, please join us and make this project happen.
