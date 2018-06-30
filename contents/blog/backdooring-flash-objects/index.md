---
title: Backdooring Flash Objects (the walkthrough)
author: pdp
date: Mon, 04 Sep 2006 19:07:37 GMT
template: post.jade
category: fucked
---

> The following article is in narrative format and it is purely experimental. Feedback on whether you like it or not will be highly appreciated.

![The Flash](/files/2006/09/the-flash.jpg "The Flash")

I started my work station. The old DELL Inspiron 8100 laptop switched automatically to Windows XP SP2 after 30 seconds of countdown in Grub. "What is going to be?" [The Prodigy](http://www.prodigy.co.uk/) seamed to be quite alright for the situation. These guys have never let me down. There is something about their music. When I am listening to their stuff my brain switches to state of mind which I usually call hackmode.

People in hackmode loose their perception of real and virtual world. To them all it matters is performing something that is valuable in this very moment. Hackmode requires total concentration and the feeling of it usually starts like this:

The brain dysfunctions 70% of your body. You feel relaxed. It almost seams like you are in a bubble. Now there is another 10% of brain activity gain. You don't need to calculate the distance between you and other objects in your surrounding environment. There is no need to perform unnecessary reflexive calculations too. There is only you and the object of your concentration.

On that day, my area of concentration was Backdooring Flash Objects. By saying backdooring I mean everything... from trojaning to infecting with viral code. It is quite hard to differentiate between viral infection and trojan infection. At the end of the day it is all about enhancing an object with some malicious functionalities. If it is a virus, the malicious code will introduce itself automatically. If it is a trojan, the user help is needed to introduce the code.

Both of these are quite disruptive activities used by biological viruses that have been with us since the day of our creation. We have been exploited by them and that's the reason why we spend a lot of time figuring out how they work. That they I was exercising malicious infection of otherwise harmless Flash files for the same reasons.

My first aim was to download some tools. I used to play with Flash and its IDE in the past, however I needed something more robust. The first tool to download was [Mtasc](http://www.mtasc.org/) from Nicolas Cannasse. I had found it couple of weeks ago but I had never had time to do some serious play with it. To me it looked quite sophisticated little tool, great to hacking around Flash.

For the purpose of my training day I needed to download a SWF file that would be eventually enhanced with my demo backdoor as well. After couple of seconds in Google, I found ["The Corruptibles"](/files/2006/09/the_corruptibles.swf). This is quite interesting and well composed animation that was just perfect for my proof of concept.

I unziped Mtasc project into my `C:/` drive and started to fiddle around with it. The command line of the tool is not as straight forward as you might think. There are several options that could confuse you but it is OK. Good tools are usually like that; too much functionalities to put inside the same shell.

After reading the usage, I realized that I need to have a hello world backdoor before even thinking of executing the compiler. So, I switched to my browser window and started reading [Mtasc project page](http://www.mtasc.org/). A few minutes later I had the following sample script.

    class Backdoor {
      function Backdoor() {
      }

      static function main(mc) {
        getURL("javascript:alert('hello from backdoor')");
      }
    }

    Actually, the code above is kind of direct replicate of one of the examples from Nicolas's tutorial. Mtasc processes only objects, so my understandings are that each .as file needs to have a class that defines it functionalities. There is also a static main method which is a bit like the Java's static main method.

    After I saved the file from gvim, I was ready for compiling. I fired the following command:

    c:\Mtasc\mtasc.exe -swf The_Corruptibles.swf -out The_Corruptibles_backdoored.swf -main backdoor.as

    I though that the command above would produce what I really wanted (trojaned version of the movie clip) but to my surprise I couldn't see any messages popping up on the screen. This was weird! There was no way I could continue without knowing what was going inside. "Was Mtasc doing what it was supposed to do, or I had found a bug?" Obviously, at that point I needed something to decompose the newly created SWF file. I opened another tab in Firefox and started digging around with Google and eventually I stumbled upon [Flare](http://www.nowrap.de/flare.html) from Igor Kogan. This tools seamed to be simple SWF decompiler. This was exactly what I needed. Again, some prep had to done. Several seconds latter, I had the tool installed in my `C:/` drive.

    Flare's syntax was quite obvious. I ran my backdoored SWF object through the tool and a new file called `The_Corruptibles_backdoored.flr` appeared in my Temp folder with the following content:

    movie 'The_Corruptibles_backdoored.swf' {
    // flash 5, total frames: 3180, frame rate: 24 fps, 500x365 px

      movieClip 20480 __Packages.Backdoor {

        #initclip
          if (!Backdoor) {
            _global.Backdoor = function () {};

            var v1 = _global.Backdoor.prototype;
            _global.Backdoor.main = function (mc) {
              getURL('javascript:alert(\'hello from backdoor\')', '_self');
            };

            ASSetPropFlags(v1, null, 1);
          }
        #endinitclip
      }

      frame 1 {
        Backdoor.main(this);
      }
    }

    To me it all looked quite alright. Frame 1 should load my object through the main method, but that wasn't the case. I tried to recompile my backdoor script again with other options from Mtasc but the result was all negative. I compared the size of the backdoored Flash file with the original and everything was as I suspected. After couple of minutes switching back and forward from Mtasc to Flare, I gave up.

    I went back to Mtasc homepage to search for clues. Nicolas has some nice things going on there. To me, he seams to be one of this guys who really enjoy programming. I appreciate guys like him especially when they write beautiful code. "I like beautiful code." This is the reason why I spend unreasonable time optimizing and beautifying mine. It is sort of expressing yourself. It is an art. When people ask me why I code in python I tell them that the language is just beautiful and that's all about it.

    Anyway, Nicolas was apparently working on another project of his, called [Haxe](http://haxe.org/). I spend some time on the project page and from what I saw, Haxe could be used to compile Flash objects as well.

    I didn't download the tool but I had really good go through its documentation. I also read very carefully the examples on the project page. One of them showed how to attach a movie from a Flash library inside freshly created movie clip. I remembered the `attackMovie()` method quite well. This is what usually happens when you are not practicing particular language or environment for too long; you are forgetting all these nifty tricks.

    I went back to Mtasc project page to look for a way to attach a movie. What I found was that I could use the same command I had tried previously with no result. I decided to give it another go but that time I needed to use a SWF file that contains the **The Corruptibles** movie inside its library. I thought that without the Flash IDE I was doomed. I couldn't believe that this was the case so I started digging around the Internet again.

    Another tab and couple of minutes latter I found [Swfmill](http://swfmill.org/). This tools was quite interesting I must say. Swfmill allows you to convert SWF files to XML or XML files to SWF.

    I jumped on the tutorial provided by the developers of the project. Using the tool is quite straight forward. In order to make SWF library, an XML files needs to be created. There is an example in Swfmill docs. I copied and pasted into gvim and replaced the important bits. As a result the following file was created.

    <?xml version="1.0" encoding="UTF-8"?>
    <movie width="500" height="365" framerate="30">
      <background color="#000000"/>
        <frame>
          <library>
            <clip id="cc1" import="The_Corruptibles.swf"/>
          </library>
        </frame>
    </movie></pre>`

    I called the clip in the library cc1. There were no reason to call it this way but when you are in hackmode conventions don't matter. Numbers and names are just expressions and this is what is beautiful about hacks. They make sense out of the insensible. Let's compile this baby.

    c:\swfmill\swfmill.exe simple backdoor_lib.xml backdoor_lib.swf
    c:\Mtasc\mtasc.exe -swf backdoor_lib.swf -out The_Corruptibles_backdoored.swf -main backdoor.as

    It worked. Well, not exactly. Although I was able to display the **hello world** alert box, the **The Corruptibles** movie clip was just not there. I forgot that `attachMovie` method needs to be called, so I quickly modified my **backdoor.as** file:

    class Backdoor {
      function Backdoor() {
      }

      static function main(mc) {
        getURL("javascript:alert('hello from backdoor')");
        mc.attachMovie("cc1", "cccc", 0);
      }
    }

    "Compile! Launch on Firefox from localhost WAMP server! Bingo!" The SWF file was successfully altered and all this from the command line.

    There is something magical about doing things from the command line. Surely you can do the same thing with Flash IDE in seconds but it is just not practical, not to mention that the whole process of starting the complex and highly processor and memory intensive Flash IDE makes me shiver.

    After refreshing my browser couple of times, enjoying my newly born creature, I spotted a huge problem. Because, the **The Corruptibles** movie clip was included into my backdoor library and than latter it was attached to `_root` via `attachMovie()` method, the preloaders that may reside inside would not work. It might not be a problem for really small SWF files but it could be potential problem for 30min video clip.

    It suddenly occurred to me that what I was doing was not very efficient. There was a simpler method which would produce far much better results. I realized that instead of altering the **The Corruptibles** SWF file or including it inside my custom SWF library, I needed to concatenate it  after my backdoor.

    Simple cat doesn't work. It works for .exe files though. This used to be one of the main ways of distributing trojans in Windows environments. You take a popular game. You get its size in bytes. Than you write a simple trojan droplet that will take the current size of the executable and subtract the size of the game in order to locate the droplet end. Than you chop the remaining off storing it in some random file and execute it concurrently with the infection.

    In Flash, you have to use special software in order to do that. I cannot concatenate two objects but rather two separate framesets. I wanted to create single keyframe before the "The Corruptibles" movie clip. "Fair enough!" I was on Internet dig quest again.

    "Google has always been a friend." I found the [Swftools project](http://www.swftools.org/). One of the provided tools allowed me to combine SWF files. There was even more.

    The project contained tools to do other cool stuff with Flash. Some of them can be used to convert WAV to SWF or JPG to SWF. Than you can combine these into a single SWF. This reminded me of the ["Ghost in a Shell"](http://www.manga.com/ghost/) movie.

    I remember that the bad guys in this movie has the ability to hack into your ghost (sole/brain). This is usually achieved by creating some sort of alternate reality which changes your believes. Bad guys write software to create this reality in order to control your ghost. Now imagine the following. With todays technology, attackers are able to modify popular interactive materials programmatically in order to create subliminal message passing to your ghost. It is a piece of cake to hijack someone's wireless access point and alter the content of every SWF file that passes the air. "Scary! The more I think about it the wors I feel."

    Long story short, I had the tool that I needed. I changed my **backdoor.as** file back to the following.

    class Backdoor {
      function Backdoor() {
      }

      static function main(mc) {
        getURL("javascript:alert('hello from backdoor')");
      }
    }

    Yes, this is my initial script. The next stage was to compile it to an one-frame SWF file. Than all I needed to do is to bind both my backdoor and "The Corruptibles" movie clip into a single file.

    c:\Mtasc\mtasc.exe -swf backdoor.swf -main -header 500:365:24 backdoor.as
    c:\Swftools\swfcombine.exe -o The_Corruptibles_backdoored.swf -T backdoor.swf The_Corruptibles.swf

_"Voila! There is my backdoor, trojan or virus. So now what? Hard to say!"_
