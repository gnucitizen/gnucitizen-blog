---
title: All Your Metadata Are Belong To Us
author: petko-d-petkov
date: Fri, 04 Jan 2008 08:15:22 GMT
template: this/views/post.jade
---

Every penetration test consists of 90% enumeration and discovery and 10% of actual exploitation. Of course, these are the figures unless you are performing a vulnerability research where the situation is very different. I tend to believe that enumeration is essential if not critical for hacking into whatever system you may have in mind. Though, I've seen many testers who rush into the exploitation stage, which is not necessarily a bad thing, but given the fact that there are always better things to do instead of firing metasploit and bombarding the targeted system with crap, it is largely unnecessary.

The Enumeration and Discovery stage is not very simple. Often, it is a case of deciding where to start: port scanning, googling, diving into someone's trash, etc. In the follow up posts, I will go over some tactics I've learned throughout my experience with testing numerous systems, but today I would like to draw your attention on some very simple tricks which often prove to be very, very helpful. "It is all about metadata!"

The metadata is primary located within various file formats. The richer content the file has, the more metadata can be extracted. Often, the metadata is of a critical importance. For example, depending how your Microsoft Office is deployed, it might be the case that you are exposing your current username with every single .doc, .xls, .ppt documents you save. And I've seen this behavior more then I would like to admit. Sometimes it is very easy to get the usernames of the people who are responsible for managing the reputation of a given organization, due to the fact that they are often involved with producing documents and reports that are publicly available, and from there target them personally. As you can see, a dedicated attacker can easily get to the meat by the means provided by the discovered metadata.

Because metadata is located inside some files, the more of them you can get access to, the better. Crawling the ftp and http severs is just a start. Googling the targeted organization site and name with query lookups for particular file extensions (`ext:`, `fileformat:`) is also very useful. However, sometimes the attackers need more then that. In cases like this, they will go straight to the source. For example, by pretending to be a potential customer, an attacker will influence an insider to forward them documents which at first seams to be nothing but a marketing fluff, but underneath they contain a whole plethora of useful things.

Once you have some files, it is time to extract some data. First of all you have to think a little bit outside of the box for a second. Most of you probably think of metadata as something that is part of the file structure, not visible to a naked eye. Yes, this is exactly the case in most situations but metadata can be found within the file's content as well. We are interested in anything that can further assists us in the enumeration and discovery process. For example, anything that looks like a name is in particular very interesting.

As you can see metadata is very, very important. However, without tools, you will end up wasting tones of hours. You are probably thinking of a solution you can code yourself but hold on for a second. There are already available solutions not many people are aware of. First of all it is very important that you start with some basics. Very often, piping a file to `strings` and filtering stuff with `grep` is more then enough. I've developed a toolkit that deals with exactly these kind of stuff. [Infocrobes](/blog/infocrobes/) and [Bashitsu](http://code.google.com/p/bashitsu/) both consists of command line scripts that can be used as filters and extractors. Something like this:

	cat file.pdf | strings | bashitsu-extract-names

... will extract everything that looks like a name. Of course, you can do a lot more then that but I will leave to discover this yourself or I may mention it in some future posts.

Another tool which I find very useful is called [libExtractor](http://gnunet.org/libextractor/).

> `ibextractor` is a library used to extract meta-data from files of arbitrary type. It is designed to use helper-libraries to perform the actual extraction, and to be trivially extendable by linking against external extractors for additional file types.

Just to get an idea how powerful this tool really is, you can try the online interface over [here](http://gnunet.org/libextractor/demo.php3?xlang=English). Though, if you want to go really hardcore you may want to give a shot to the library itself. It is very easy to integrate so of its features into whatever projects you might have in mind.

So we are moving up the food chain of metadata tools. The most GUI like, without no doubt, is [Maltego](http://www.paterva.com/web2/Maltego/maltego.html). Maltego has loads of features that help the enumeration process quite a lot. It also has a powerful metadata extraction tool. There are also mechanisms to write your own trasnformers in python and any other language if you dare to code Maltego's protocol yourself. I will come back with some further developments for this tool in particular since I am busy with some very interesting stuff at the moment.

_There you go. I hope you can get some ideas from this post._
