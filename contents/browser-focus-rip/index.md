---
title: Browser Focus RIP
author: petko-d-petkov
date: Mon, 12 Feb 2007 23:59:32 GMT
template: this/views/post.jade
---

There was a [discussion](http://seclists.org/fulldisclosure/2007/Feb/0226.html) on Full-disclosure and Bugtraq about a very peculiar vulnerability in Internet Explorer and Mozilla Firefox which can be used by attackers to trick victims into uploading local files.

It was [Michal Zalewski](http://lcamtuf.coredump.cx) who brought this subject back on the table. The vulnerability he described is not new. In fact,  it is a variation of an issues discovered back in 2000. The peculiar thing about it is that it was reported to Mozilla's Bugzilla back then but never fixed.

If you read about what [Michal's exploit](http://lcamtuf.coredump.cx/focusbug/) does, you can easily get lost, so I will try to explain the issue as clearly as I can and provide you with some examples of how it can be used in real attacks.

The only component in the DOM (Document Object Model) that allows us to send locally selected files to a remote location is the file input box, usually declared as `<input type="file"/>`. This is not a standard input field because it has a browse button that is attached at the end and also because, once inside a `multipart/form-data` form, it can selected local files. Because of these characteristics, you cannot use JavaScript to set its value to a file path of your desire. If that was possible, everybody would be able to steal and list your file system remotely when you visit a malicious website.

However, by using a clever focus diversion tricks, attackers can make certain characters, that the victim typed, to leak inside the file input field. They can achieve that by using a filter that allows and disallows keyboard events based on the key code order in the file path string that needs to be retrieved.

In simple words, when the user types characters inside some text field, they are actually typing them inside a file input box, which filters out the unnecessary characters in order to compose the desired string. Everything else, is totally emulated, so the user thinks they are typing in the right place not knowing what is actually happening. The following text translates to `/etc/shadow`, which can be used to steal that particular file:

> Bob! Check this out http://www.example.com. this is very cool: http://www.someserver.com. hei man, do you still need that wonderful CD I gave you long time ago?

You probably think that I am mad! Now, have a look at the following text, which shows all key characters that are required to build the file string.

> Bob! Check this out http:`[/]`/www.`[e]`xample.com. `[t]`his is very `[c]`ool: http:`[/]`/www.`[s]`omeserver.com. `[h]`ei m`[a]`n, `[do]` you still need that `[w]`onderful CD I gave you long time ago?

Black magic! The filter removes the parts that are not required and only the characters that are needed are passed into the input field.

Although quite complicated, this attack is very real and probably should be taken seriously. If the attacker places the malicious JavaScript on a critical place where users are heavily using the keyboard, the chances of composing the desired string are quite high. Think about blogs, wiki entries, forums, etc. This issue can be shipped as part of an AJAX worm which propagates on the top of MySpace, for example.

In some situations the user doesn't need to type that much text at all. They can be tricked into typing the desired string in a much clever way. For example, the following sequence of characters composes the `/etc/shadow` string: `b/etlc/shradow`. It is not obvious that this 14 character long string corresponds to the 11 character long `/etc/shadow` path. Still, the question is how the attacker can force the victim to type these characters inside the page. Well, attackers need to be creative in this case. Check this two examples:

<div class="message">

You visit a page requires a CAPTCHA. You type the letters `b/etlc/` but you receive an error which tells you that your input was incorrect. Now you need to repeat the task and type the following sequence of characters: `shradow`.
</div>

_Quite bad! My advice to you is to be careful. If you are using MySpace turn JavaScript off if possible. Don't use your keyboard on untrusted websites._
