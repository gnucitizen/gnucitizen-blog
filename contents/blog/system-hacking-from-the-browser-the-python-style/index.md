---
title: System Hacking from the Browser (the Python Style)
author: petko-d-petkov
date: Wed, 05 Dec 2007 21:39:01 GMT
template: post.jade
---

If you haven't noticed yet, the browser becomes more and more like the desktop. You are still restrained by the same origin policies (SOP) but there are always ways to hack back and get your way though. This post is not about exploits, as some of you may assume based on my introduction. This post is more about how to use the browser as a platform for executing attack scripts, system commands, low level system calls, etc, etc, etc.

Let's start with some introduction first. Back in June 2006 I released a very alpha [POC](/blog/jython-shell/) tool which allows execution of Python scripts from within the browser. The technology which was used to bring this tool to reality was, and still is, Java, or more specifically Java Applets, combined with the Java implementation of [CPython](http://www.python.org) known as Jython or JPython. The project was slacked over the weekend and my biggest hurdle was to get around these deep Java abstraction layers. Though I must say that the amount of effort I've put into this tool is nothing compared to the quality of the product. "Welcome to the Java world."

My motivation for building this tool was to simply enable myself to run all of my attack scripts, which most of them were written in Python, from the browser no matter what computer I am currently using. Of course you still need the JVM, it is not just the browser, but the Java Runtime seams to be installed on the majority of workstations even when it does not come by default with Windows and most Linux distributions. I am not sure what's the situation with Macs. Anyway, the point is that my needs were based around the idea of distributing my infrastructure across the web and use a common client to access it when it is required.

After almost a year and a half later, I find myself embracing these same vision again. Over the last couple of days, I fixed the [project page](/blog/jython-shell/), fixed the online console tool and published the sources, which you can get from [here](http://code.google.com/p/jythonshell/). Today, I would like to show you a few simple tricks how to turn the project into a one-time-stop killer hacking console, completely customizable for your needs. Python knowledge is required!

### Hatching Eggs

I assume that you know how python modules are organized. Here I would like to show you how you can pack them up into eggs or jars. Both eggs and jars are zip-compressed files with all necessary bits and pieces included. The Jython shell tool recognizes both of them when provided as part of the `python.path`. You can do that programatically, or with the `python.path` applet property. Here is an example:

    <applet class="pane" code="AppletConsole" archive="console.jar, enigma-console.jar, jython.jar" alt="problems with executing applet">
    	<param name="**python.path**" value="jython-lib.jar"/>
    	<p>problems with executing applet</p>
    </applet>

    At the moment the `python.path` points to the Python's site package which contains all necessary modules to do XML manipulation, Socket stuff, system stuff, etc. This lib is essential. Do not remove it. However, if you want to supply your own library you simply need to do something like the following:

    <applet class="pane" code="AppletConsole" archive="console.jar, enigma-console.jar, jython.jar" alt="problems with executing applet">
    	<param name="**python.path**" value="jython-lib.jar:**my-lib.jar**"/>
    	<p>problems with executing applet</p>
    </applet>

    `my-lib.jar` is zip-compressed directory which contains all of your modules. For example, I have one zip/jar which contains all my Google tools. I have another library which contains the entire [Massive Enumeration Toolset](/blog/met). And I also have a library with common exploits, like some for WebDav and some 0days shared between me and my mates. All of these are all packed into jars/eggs and supplied to the applet's `python.path` property.

    So, when I go to a different machine, I point the browser's address bar to my applet instance which contains paths to my libraries. The page gets loaded and with that I receive a security message which warns me that I am going to run in unrestricted mode. When I approve that, the shell will download all the libraries that it needs and load them all up. After that I can use them pretty much the usual way I use them from cpython:

    import sploits
    import sploits.DAV

    e = sploits.DAV.Enumerate()
    e.execute('212.212.212.212')

### Extending Upon

Sometimes, I have to extend the shell at runtime. So let's say that I have some security modules located at `http://example.com/site/sec-modules.zip`. The Jython console have a method that allows you to import these straight from the Web and as such dynamically enhance your console functionalities. This is how it is done:

import org.python.util
import java.net

loader = org.python.util.PythonLibLoader()
loader.load(java.net.URL('**http://example.com/site/sec-modules.zip**'))</pre>`

There you go. After you execute these commands you will have access to sec-modules and all the goodies that it may provide. "It cannot go more distributed then that man!"

### In Conclusion

If you are a python coder and you code mostly security/hacking scripts, you might want to consider packing them up and maybe even using them through the browser as described in this post. I personally find this tool immensely powerful since most of my stuff are coded in python anyway. I've also used it in several Kiosk penetration tests where I was able to obtain system level access straight from the browser. If nothing else, it is interesting to try it out.

_The tool is still not as polished as it should be. If it fails for whatever reason, research and find your way around it. Patch it and send me your fixes._
