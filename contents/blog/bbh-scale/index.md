---
title: BBH Scale
author: pdp
date: Tue, 9 Jul 2019 16:38:00 GMT
template: post.pug
---

Here is a short tutorial on how to search when you do BBH. Now, you can do a lot of unix pipes and grep/ripgrep and so on but if you want to get a scale you might want to look into elasticsearch. #bugbountytips Here are a couple of commands to get you started:

First, you need to convert your data to JSON. `jq` is your friend. The following command will curl a request and put it into a document:

```bash
C=$(curl -v https://secapps.com 2>&1) jq -n '{contents: env.C}'
```

Sending a document to elasticsearch can be done like this:

```bash
curl -XPUT 'http://localhost:9200/curl/_doc/abc' -d '{}'
```

Stringing it all together should look like this:

```bash
T=https://secapps.com D=abc C=$(curl -v "$T" 2>&1) jq -n '{contents: env.C}' | curl -XPUT "http://localhost:9200/curl/_doc/$D" -d '@-'
```

In the previous tweet, you control the `T` and `D` variables. The rest is just doing the job. These variables are only available for that specific line. You don't need to export them beforehand. Bash is magic!

Once you have your docs in elasticsearch you can search whichever way you want and with kebana, you can graph them too or set alerts ;) Now you can call yourself a data scientists.

Spinup a $5 DO node and play around.

https://twitter.com/pdp/status/1148617500357222401
