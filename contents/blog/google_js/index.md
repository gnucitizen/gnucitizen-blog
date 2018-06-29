---
title: Google.js
author: petko-d-petkov
date: Sat, 06 Oct 2007 11:39:00 GMT
template: post.jade
---

I am learning to love Windows. Yeh it has its own problems and sometimes could be a bit insecure but in general, it just works well and every single piece of it is reusable and scriptable. Today, I quickly wrote a Google search scraper. It runs straight from the command line.

Pay attention on the size of the script and the level of clarity of the code. Moreover, it is well integrated with the host's setup and connection settings (proxies, socks, etc). You cannot do that even with Python. Thanks Microsoft.

    [/files/2007/10/google.js](/files/2007/10/google.js)

There are two way you can run the script. If your default scripting engine is `cscript`, then you can just type: `google.js **some query here**`. If this is not the case then you either need to be explicit like this: `cscript /nologo google.js **some query here**`, or make cscript default like this: `cscript //H:CScript`. Whatever you do, the code will run and will work flawlessly.

_I enjoy when things are plain and easy or just simply clever._
