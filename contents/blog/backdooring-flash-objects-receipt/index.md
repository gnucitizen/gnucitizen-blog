---
title: Backdooring Flash Objects (the receipt)
author: pdp
date: Tue, 05 Sep 2006 22:03:52 GMT
template: post.jade
category: fucked
---

![Death Flash](/files/2006/09/death-flash.jpg "Death Flash")

Just a day ago I released a quite narrative article called [Backdooring Flash Objects (the walkthrough)](/blog/backdooring-flash-objects). Although, I received some quite good responds on the style of writing, I decided to write more narrowed and specific version on how Flash object infection works. The following post outlines one of the many ways and expands further on some of the core concepts.

The truth is that Flash files can be maliciously infected with bad code which in tern can cause havoc in your network. The concept is not new. In fact since the beginning of Macromedia Flash IDE, the developers have been given the flexibility to include or adjust external SWF files and such employ more robust and highly componentized framework. However, with the raise of popularity of Flash based applications, it was discovered that Flash objects can be infected and used as transport mechanism of various types of malware the same way application level executables are.

Infecting Flash objects is straight forward when performed from the Flash IDE. It is a matter of embedding the target file into a newly created Flash project and assigning actions to keyframes that proceed the point where the external file is called. Of course this is the most basic scenario. Other  infection techniques are also possible but they are not going to be discussed here because the subject is quite broad. To narrow it down, I am going to talk about the basic toolkit required for infecting Flash objects.

For the purpose of this exercise I found several free command line tools that can be used for constructing Flash malware and also help analyzing already infected objects. The tools are as follows:

* [Mtasc](http://www.mtasc.org/) - great tool for compiling ActionScript
* [Flare](http://www.nowrap.de/flare.html) - excellent tiny tool for decompiling ActionScript from SWF files
* [Swfmill](http://swfmill.org/) - SWF to XML and XML to SWF converter
* [Swftools](http://www.swftools.org/) - various useful utilities

Mtasc, Swtools and partially Swfmill are used for constructing Flash based backdoors while Flare and again Swfmill is pretty much used for analyzing them. Malware analysis will be covered in future articles, so lets get back to how Flash objection infection works.

There are several important things to understand first. Since SWF files are restricted and by default sandboxed by the Flash player, not that many interesting or dangerous functionalities can be used. Mainly, the infecter is restricted to JavaScript code or Flash ActionScript code. Most of the time it will be combination of both of them. However, JavaScript and ActionScript are highly suitable for performing web based attacks.

The first stage in my methodology is to construct body/framework for the backdoor. This can be something as simple as the following:

    class Backdoor {
      function Backdoor() {
      }

      static function main(mc) {
        getURL("javascript:alert('hello from backdoor')");
      }
    }

    As you can see, the code above outlines a Backdoor class which contain one static main method and of course the class constructor. In this scenario the class is actually not need, however, since we are going to compile it into SWF with Mtasc, the style and syntax is kind of enforced.

    To compile the backdoor into SWF the following command needs to be executed:

    c:\Mtasc\mtasc.exe -swf backdoor.swf -main -header 500:365:24 backdoor.as

    There are several important flags that needs to be discussed a bit here. The first one is the -main option. Basically this tells Mtasc that a static main method is expected. The second one is the -header option, which takes care of the produced SWF movie dimensions and characteristics. The example above produces 24 frames per second 500px by 365px movie. This dimensions can be extracted from the SWF file that will be backdoored with either Swfmill or Swftools utilities.

    The Swftools packages comes quite handy in many ways. In fact the actual injection of malicious content is performed with swfcombine tool which is part of Swftools and here is the example:

    c:\Swftools\swfcombine.exe -o The_Corruptibles_backdoored.swf -T backdoor.swf The_Corruptibles.swf

The command line above creates a new movie called The_Corruptibles_backdoored.swf by binding backdoor.swf with The_Corruptibles.swf. It is quite straight forward as you can see and this is all about it.

Obviously the infection mechanism provided above is very simple but it works quite well. Moreover it is highly robust. So, the question is to what extend attackers can use that to get into your corporate network. Given the fact that newly created JavaScript and ActionScript exploitation techniques are developed on daily basis and the fact that browsers are highly trusted, I must say that attackers have pretty good changes to cause serious damage. So, actions must be taken.

_How can we protect ourselves from Flash based malware? It must be noted that Flash is probably the most popular media format on the web. This means that just turning off Flash is not that simple. Drastic action like this one could cause productivity loses. Unfortunately, there is no straightforward solution that can be easily implemented. I believe that prevention techniques will be discovered in the future and probably temporary signature based solutions will appear quite soon. This means massive attacks can be prevented but that might not be the case when dealing with dedicated attackers._
