(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
if (WScript.Arguments.length == 0) {
	WScript.Echo('usage: ' + WScript.ScriptName + ' <query>');
	WScript.Echo('       ' + WScript.ScriptName + ' site:gnucitizen.org ext:js');
	WScript.Echo('');
	WScript.Echo('Google Search');
	WScript.Echo('by Petko D. Petkov (pdp) GNUCITIZEN (http://www.gnucitizen.org)');
	WScript.Quit(1);
} else {
	var tmp = [];

	for (var i = 0; i < WScript.Arguments.length; i++) {
		tmp.push(WScript.Arguments(i));
	}

	var query = tmp.join(' ');
}

var pos = 0;
var doc = WScript.CreateObject('MSXML2.DOMDocument');

doc.async = false;
doc.validateOnParse = false;

do {
	var lns = [];

	doc.load('http://www.google.com/xhtml?q=' + escape(query) + (pos != 0 ? '&start=' + pos : ''));
	var as = doc.getElementsByTagName('a');

	for (var i = 0; i < as.length; i++) {
		var href = as[i].getAttribute('href');
		var match = href.match(/^\/gwt\/.*?u=(.*?)$/);

		if (match) {
			var ln = unescape(match[1]);
			lns.push(ln);
		}
	}

	if (pns && pns.sort().join() == lns.sort().join()) {
		break;
	}

	for (var i = 0; i < lns.length; i++) {
		WScript.Echo(lns[i]);
	}	

	var pns = lns;

	pos += 10;
} while (lns);

},{}]},{},[1]);
