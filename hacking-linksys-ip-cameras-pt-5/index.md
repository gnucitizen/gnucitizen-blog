---
title: Hacking Linksys IP Cameras (pt 5)
author: adrian-pastor
date: Fri, 05 Jun 2009 08:04:55 GMT
template: this/views/post.jade
category: fucked
---

This article is a continuation of the following GNUCITIZEN articles: [pt 1](/blog/hacking-linksys-ip-cameras-pt-1/), [pt 2](/blog/hacking-linksys-ip-cameras-pt-2/), [pt 3](/blog/hacking-linksys-ip-cameras-pt-3/), [pt 4](/blog/hacking-linksys-ip-cameras-pt-4/).

## Mounting the filesystem on your workstation

There are many ways to mount the camera's filesystem using the firmware binary. In this post, we'll explain one way to mount firmware version v1.00R24 which is the latest available for the WVC54GCA model.

If you were to only use the firmware binary, things could be a bit difficult, as you don't know the format of the binary at all. However, having the GPL firmware helps a lot as we'll see next. I emailed Linksys back on Apr 23, 2009 informing them that although the GPL firmware was available on their site for other Linksys products, they hadn't uploaded the one for the WVC54GCA camera. A few days later, on Apr 27, 2009, Linksys kindly made it available and [has been available](http://www.linksysbycisco.com/US/en/supportgplcode) ever since (the file to download is `wvc54gca_v1.00R24.tgz`).

Thanks to [Lex Landa](http://brooknet.no-ip.com/~lex/)'s tips I was able to figure out the parameters required to mount the firmware binary, by analysing the data contained in the `./scripts/wvc54gc_usa_english/combine.cfg` file which is included with the [GPL firmware](http://downloads.linksysbycisco.com/downloads/wvc54gca_v1.00R24,5.tgz):

```ini
size = 00400000
file = WVC54GCA.bin
f1_name = loader
f1_start = 00000000
f2_name=loader.ver
f2_start=00007FFE
f3_name=**kernel**
f3_start=**00020000**
f4_name=**filesystem**
f4_start=**000E0000**
f5_name=PID
f5_start=003FFFB2
```

I simply focused on the `kernel` and `filesystem` parameters. The previous settings show that then kernel starts at `0x20000` (131072 bytes / 128 KB), and the filesystem starts at `0xE0000` (917504 bytes / 896 KB). In order to start [dd](http://en.wikipedia.org/wiki/Dd_(Unix)) reading at `0xE0000`, we need to keep 7 chunks of 131072 bytes. i.e.:`7*131072=917504 bytes=0xE0000` (the position we want)

```bash
$ dd if=DYFF08-402-1024.bin bs=**131072** of=fs.img skip=**7**
25+0 records in
25+0 records out
3276800 bytes (3.3 MB) copied, 0.019424 s, 169 MB/s
```

We then verify that our image file is a valid `squashfs` filesystem:

````bash
$ file fs.img 
fs.img: Squashfs filesystem, little endian, version 3.0, 2216311 bytes, 475 inodes, blocksize: 65536 bytes, created: Fri Nov  9 03:58:52 2007
```

A finally mount it on our hardrive:

```bash
$ sudo mkdir /mnt/test
$ sudo mount -t squashfs fs.img /mnt/test -o ro,loop
$ ls /mnt/test/
bin  dev  etc  lib  mnt  proc  root  sbin  tmp  usr  var
```
