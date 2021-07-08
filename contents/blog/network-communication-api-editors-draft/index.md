---
title: Network Communication API Editor's Draft
author: pdp
date: Fri, 23 Nov 2007 11:42:56 GMT
template: post.pug
---

> To enable Web applications to communicate using TCP this specification introduces the TCPSocket interface and a corresponding optional security model.

```javascript
var con = null;

try { 
	con = new TCPSocket("www.example.com, "12345");
} catch (ex) { 
	if ("SECURITY_ERR" == ex.message) { 
		alert("unable to connect");
	}
}

con.addEventListener("socketdata", function(ev) {
	if ("pong" == ev.data) {
		alert("Success");
	}
	else {
		alert("Failure");
	}
}

con.write("ping");
con.flush();
```

> The TCPSocket interface enables a TCP connection from the client to the server from which the script was downloaded and executed from. Instances of this object can be made using a constructor on the Window object. [W3C](http://dev.w3.org/2006/webapi/network-api/network-api.html)

_Cool stuff!_
