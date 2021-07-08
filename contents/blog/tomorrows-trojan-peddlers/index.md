---
title: Tomorrow's Trojan Peddlers
author: mario-heiderich
date: Sat, 10 Nov 2007 09:11:43 GMT
template: post.pug
---

Some weeks ago I did play a little bit with various [nopaste applications](http://en.wikipedia.org/wiki/Nopaste) - you know, the tools that allow you to paste/host huge amounts of regular text, source code and other non binary stuff. There are dozens of them out there and most of them provide no ACL, whatsoever. So anyone can see the text you've pasted. Pasting new data happens in a matter of seconds due to the very plain interfaces these sites implement. Some of them even support highlighting in dozens of programming and scripting languages. Submit your text and you even get a nice short link for free.

Besides all those benefits, most of those services provide something else too. Normally you see the pasted text embedded inside an HTML page provided by the service. "Mmmh, all these buttons!" But most times there's a download button too which points on another short URL which leads you to the pasted text in a plain format, waiting to be included by a script tag or [file_get_contents](http://php.net/manual/en/function.file-get-contents.php). So again, there's that single feature that turns the whole service into a mutation of it self. This is definitely not the first nor the last time we have the chance to see something like that. Here are some examples I goggled. _It took me about 10 minutes to assemble the list._

* `http://nopaste.php-quake.net/down/9010`
* `http://rafb.net/p/8JzOBa36.txt`
* `http://nopaste.com/p/aCG0kxeyY/txt`
* `http://nopaste.ch/8ad6ca7aa5b766f.txt`
* `http://phpfi.com/274672?download`
* `http://nopaste.debianforum.de/get/6953`
* `http://nopaste.simosnap.com/2812?download`
* `http://www.nopaste.name/save.php?id=88819`
* `http://nopaste.paefchen.net/334/download`
* `http://www.nopaste.pl/Save/1dp.txt`

Surely the nopaste applications are not the only ones who unwillingly provide good opportunities for anonymous and free payload hosting. Remember [pdp's article on the problems with the Firefox jar: protocol issues](/blog/web-mayhem-firefoxs-jar-protocol-issues)? What would you say - what percentage of all those [image hosting services](http://en.wikipedia.org/wiki/Image_host) out there really check if the image you try to upload is valid? I was pretty sure most of them would. But they don't.

On 70-80% of the image hosting platforms you can upload whatever you want. No MIME checks, no dimension check, no transformation of the uploaded images, no checks for suspicious patterns in the image source - nothing. Some of them even disclose more security holes while trying to upload simple bin files. On a several occasions, I've got prompted by messages that look like this: "`Warning: Division by zero in ... - your image was uploaded!`". Here's the list of services I've tested. Since we have real issues here the URLs are a little bit obfuscated.

	jar:http://imagXXXload.biz/files/dadfad6e3ba807aa20712fbe2.png!/test.html
	jar:http://img3.freeimXXXhosting.net/uploads/328d2315c3.png!/test.html
	jar:http://www.imglXXXtr.com/uploads/7accc832a7.png!/test.html
	jar:http://upload.iXXXpot.com/u/07/311/05/test64864.zip.png!/test.html
	jar:http://www.direcXXXload.com/showoriginal-32664.jpg!/test.html
	jar:http://www.uplXXXhouse.com/fileuploads/712/712277d886fa0881092da4936f5ded10e771cd.png!/test.html
	jar:http://www.fotopaXXXd.com/upload/nr/486/test.zip.png!/test.html
	jar:http://www.uploXXXimages.net/imagen/18790b0b47.png!/test.html
	jar:http://www.imaXXX.info/images/06/1194534977_test.zip.png!/test.html
	jar:http://pics.fXXXni.de/save/p_1194532832.png!/test.html
	jar:http://img.nXXXnternetstate.com/1194532968.png!/test.html

The conclusion after this short but rather interesting research is that even services which just provide a single and very basic features, have to watch out for security problems. None of the above mentioned services and tools are full blown applications created by years of invested work, but small helpers that just do what they do. Nevertheless they help making the Internet even more insecure - ah the FUD - and give attackers the chance to store their payload anonymously. "And any of those platforms could be secured by less than ten lines of code." More thorough validation and a more thoughtful bouquet of features would have de-magnified the attack surface effectively.

_Developers have to understand that even small features can have massive impact when used in the wrong context - please think before you implement._
