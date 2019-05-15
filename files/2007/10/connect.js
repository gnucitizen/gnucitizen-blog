(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var client = WScript.CreateObject('Citrix.ICAClient');

if (WScript.Arguments.length == 0) {
	WScript.Echo('usage: ' + WScript.ScriptName + ' key=value key=value key=value ...');
	WScript.Echo('       ' + WScript.ScriptName + ' TCPBrowserAddress=172.16.3.191 Application=Notepad');
	WScript.Echo('');
	WScript.Echo('CITRIX Client Utility');
	WScript.Echo('by Petko D. Petkov (pdp) GNUCITIZEN (http://www.gnucitizen.org)');
	WScript.Quit(1);
} else {
	for (var i = 0; i < WScript.Arguments.length; i++) {
		var arg = WScript.Arguments(i);
		var tkn = arg.split('=');

		try {
			var name = tkn[0].replace(/^\s+|\s+$/g, '');
			var value = tkn[1].replace(/^\s+|\s+$/g, '');

			client[name] = value;

		} catch (e) {
			WScript.Echo("option '" + arg + "' not recognized");
			WScript.Quit(1);
		}
	}
}

try {
	client.Launch = "TRUE";
	client.Connect();
} catch (e) {
	WScript.Echo(e);
}

},{}]},{},[1]);
