---
title: Rethinking The Desktop Model
author: petko-d-petkov
date: Tue, 02 Sep 2008 22:21:28 GMT
template: post.jade
---

_It is time to rethink the way the desktop works. Some of my ideas may seem radical but sometimes evolution is the only solution to all of our problems_.

I have had this idea for quite some time now. Picture the following: a stripped-down Linux kernel with all security mechanisms to the max; levels 2 to 5 configured to run just the most basic set of services such the scheduler, the hardware abstraction and support mechanisms, printing etc., a web server, a browser and the x environment. The low level processes keep the system running while the x, the browser and the web server provide the application layer functionality.

Each application is hosted on the web server. Technically speaking we have an application server. The browser provides the rendering engine, while the x puts everything on the display. No compilation. Everything is interpreted and under the strict control of the browser and the web server.

The browser is not just the typical browser you will find. Each application opens in its own browser process. It renders just like any other application you may have on your desktop. The only difference is that applications in this environment are written on top of standard, widely-adopted technologies. No dependencies and no cross-platform issues. Applications are easy to patch, extend and control.

The web server is just like any other web server. A module for more granular user control will be required, i.e. different applications will be able to run with different privileges and users should be able to identify themselves without the need to login, etc. Of course, this is only needed if such features are required.

I think that this type of environment will provide more granular control over each application. For example, if an application misbehaves then we can either fix the code on the fly or patch it on the web server with a config hack. We've got the technology even to jail the app in a chroot environment. Fixes can be easily implemented at any stage. Because we are using standard technologies, fixes will be easier and more robust. The browser also provides functionality to extend its chrome via extensions. Developers can implement a layer on the top of the application layer to provide even greater control, customization and interactivity.

Obviously, because everything becomes a web application, for security reasons, the browser should differentiate between local and remote applications but at the same time make sure that both types are as transparent to the user as possible.

This model is far from being perfect. In fact, it has many flaws. I know that there are even some failed attempts to do something almost similar. However, this model seems so right. It is 2008 and we are still stuck with technologies designed 20 years ago. No wonder why they often break. Perhaps their time has come to an end? I don't know. Let the crowd decide.

_My philosophy is: whatever works will be employed to complete the given task. But sometimes I think what it would have been if things were otherwise._
