---
title: GEO-tracking Mobile Phones
author: petko-d-petkov
date: Thu, 18 Oct 2007 11:11:47 GMT
template: this/views/post.jade
---

For those of you who haven't got the time to catch up with some of the latest developments around all-mighty iPhone, I highly recommend [H. D. Moore](http://www.metasploit.com/)'s [Cracking the iPhone](http://blog.metasploit.com/2007/10/cracking-iphone-part-21.html) series where he explains how to crack open the device with the well known libtiff vulnerability that was affecting the Sony's PSP, but with a twist. In this post I am going to introduce you a technique for GEO-tracking the iPhone, or any other mobile phone, after successful exploitation. Keep in mind that all you are going to see is a general description of an attack scenario. I am still waiting for my iPhone, so I haven't coded anything for it yet.

Before we dive into the subject I would like to clarify what I mean by saying **GEO-tracking**. The prefix _geo_ comes from the Greek word _ge_, meaning Earth, ground or island. Therefore, _Geography_ (_geo_ and _graphia_ "writing") is the study of the features of the Earth. In that respect, _geo-_tracking is nothing more but the science behind tracking/mapping objects in motion on a map. Thus, in this post we are going to discuss a technique for pinpointing mobile phones in motion on a map and as such follow their owner's behavior.

The obvious way of tracking an already exploited phone is by means of GPS (Global Positioning System). Correct! However, given the fact that most mobile phones do not posses this feature, including the iPhone, we need to leave it for now and find something else that will give us to one degree or another a similar result. As you probably know, mobile phones are also known as cellulars, an old name (technology) which refers to circuit-switched voice telephone communication via cellular radio channels. Speaking generally, phones connect to cell phone towers. The density/availability of these towers affect the strength/availability of the signal your mobile phone gets. Keep in mind that I am very general here.

At any given moment your mobile phone has the geographical coordinates of the current cell phone tower it is connected to. These coordinates are represented by four numbers: **cellid** (The identifier of the cellular tower), **lac** (The Location Area Code), **mnc** (The Mobile Network Code) and **mcc** (The Mobile Country Code). You probably see where I am going with this.

When a mobile phone is in motion, it will switch between different cells and such ensuring continuous signal. The cellid, lac, mnc and mcc numbers will also change. If we record these numbers when a change occurs, we will have the history of the areas that phone has visited. These numbers can be translated into geographical coordinates by using any of the available public services. My personal **free** favorite is Yahoo's [ZoneTag](http://developer.yahoo.com/yrb/zonetag/locatecell.html) Cell Location API. A simple request to the service looks like this:

    [http://zonetag.research.yahooapis.com/services/rest/V1/cellLookup.php?apptoken=ZoneTagDemoToken&**cellid**=48627380&**lac**=201&**mnc**=15&**mcc**=234](http://zonetag.research.yahooapis.com/services/rest/V1/cellLookup.php?apptoken=ZoneTagDemoToken&cellid=48627380&lac=201&mnc=15&mcc=234)

    The above request will result into a XML document with information about the location of the cell phone tower. In my case, this is Hammersmith, London:

    <rsp stat="ok">
    	<Location>
    		<Country cell="current" source="user">**United Kingdom**</Country>
    	</Location>
    	<Location>
    		<Country cell="current" source="generic">**United Kingdom**</Country>
    		<City cell="current" source="generic">**Hammersmith**</City>
    	</Location>
    </rsp>

Notice that the information is not very specific. Depending on the quality of the database, you will get more or less information about the cell. But you get the idea.

If the attacker continuously captures the information given from the cell phone towers, she will be able to tell the location of the mobile by guessing the area or doing some crazy computation geometry (triangulation) as described by this [paper](http://www.ncg.knaw.nl/Publicaties/Groen/pdf/44VanOosterom.pdf). This information can be placed on a map which tracks the mobile phone and predicts the direction. For that purpose, the attacker can use something like Google Maps API or preferably Microsoft's Live Maps Birds Eye 3D view as shown on the video bellow:

<div class="screen"><object width="425" height="350"><param name="movie" value="http://www.youtube.com/v/r4L4T1pUZUU"></param><param name="wmode" value="transparent"></param><embed src="http://www.youtube.com/v/r4L4T1pUZUU" type="application/x-shockwave-flash" wmode="transparent" width="425" height="350"></embed></object></div>

In some cases the attacker could combine the information obtained from the cell phone towers and the GPS (if there is any) in order to get even more accurate information about the current position of the mobile phone. This technique can be applied on any other phone and can be trivially automated for Blackberries using their development SDK.

### Detection and Prevention

If you are not technically familiar with your phone, there is not much you can do to protect yourself from these kinds of stuff. However, you might be able to detect their behavior. If your mobile phone is constantly running out of power or it is always worm, this is a good indicator that something malicious is going on in the background. It is recommended that you inform your mobile phone provider about your observations and keep away from the device for a while even if this means that you cannot enjoy your brand new iPhone. Your privacy should be above all other things.

_I hope that the post was interesting. Let me know if you have any other ideas or suggestions._
