---
title: Backdooring QuickTime Movies
author: petko-d-petkov
date: Tue, 05 Sep 2006 22:51:33 GMT
template: post.jade
category: fucked
---

XSS attacks are nothing new, but an evil mind can find ways to use them to bypass border firewalls and highly expensive intrusion prevention systems in order to attack your organization from inside. This post outlines an example of how to use QuickTime Movie files to trick the user into executing malicious JavaScript code. The technique presented here does not rely on a vulnerability bur rather on an insecure feature present in QuickTime player from version 3 up to the latest version 7.

This technique makes use of one of the very well know features in QuickTime called Text Tracks. Movie files are usually constructed of video and audio tracks. They provide the auditory and visual characteristics of the movie. On the top of them Text Tracks are responsible for subtitles, lyrics and other very interesting and highly productive accessibility features.

One layer bellow, Text Tracks can be of different types. There are many of them but the ones that are the most interesting are called `HREF Tracks`. `HREF` Tracks contain links that will be opened automatically or when the user clicks on the movie frame. These links can point to URLs from the `FTP/HTTP/HTTPS` space and also other supported protocols such as the JavaScript protocol (javascript:). Effectively, this feature can be used by attackers to hide malicious code inside a `.mov` file which will be executed automatically on preview.

HREF Tracks can be created with QuickTime Pro and probably other .mov editors and publishers. I wasn't able to find any command line tools although while researching, several good opensource QuickTime editing libraries were encountered. The following post examines the process of creating a backdoored .mov file with QuickTime Pro.

The first stage is to create a Text Track. Text Tracks are simple .txt files that contain special syntax. For the purpose of this proof of concept I composed the following track named (backdoor.txt).

	A<javascript:alert("hello from backdoor")> T<>

Obviously the code above will display an alert box. The prefix A defines that the action will be automatic - no user interaction is required. There is also T flag, which specifies the target for the action. In this case it is kept null.

The next stage is to open both `backdoor.txt` and the movie that will be backdoored with QuickTime Pro. I chose [Sample.mov](http://www.gnucitizen.org/static/blog/2006/09/sample.mov). This is standard movie file that is supplied with every default QuickTime installation.

Once opened, select the tack file and click on Edit -> Select All. This will select the entire track. Than you need to copy it by going to Edit -> Copy.

> ![Backdoor TXT MOV](http://www.gnucitizen.org/static/blog/2006/09/backdoortxtmov.jpg "Backdoor TXT MOV")

The next stage is obviously pasting. Select Sample.mov and click on Edit -> Select All and than Edit -> Add to Selection and Scale. After performing this action you will see that part of Sample.mov frame is covered in black with text inside. This is the Text Track.

> ![Sample TXT MOV](http://www.gnucitizen.org/static/blog/2006/09/sampletxtmov.jpg "Sample TXT MOV")

Once the Text Track is there, it has to be converted to HREF Track. Select Sample.mov window and click on Window -> Show Movie Properties. In the Movie Properties dialog select "Text Track" and untick the check box next to the label. The last stage is to change the name of "Text Track" to "HREFTrack". Figure this out yourself :).

> ![Hreftrack](http://www.gnucitizen.org/static/blog/2006/09/hreftrack.jpg "Hreftrack")

When all this is done, Save as [Sample.mov](http://www.gnucitizen.org/static/blog/2006/09/sample.mov) to [Sample-backdoored.mov](http://www.gnucitizen.org/static/blog/2006/09/sample-backdoored.mov) or whatever you feel comfortable with.

_The produced file will popup an alert box when opened in the browser window. There is no need to discuss again why this is dangerous and in what ways it can be used to bring havoc and destruction. The important bit is to never trust anything from the web. Movie trailers should not be previewed unless they come from apple.com. Don't open audio files or anything that ends with .mov. This is my advice for now :)._
