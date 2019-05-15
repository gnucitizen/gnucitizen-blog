(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var AttackAPI = {
	version: '0.2',
	author: 'Petko Petkov (architect)',
	homepage: 'http://www.gnucitizen.org',
	contributors: {
		DanielBartlett: {homepage: 'http://f-box.org/~dan/'}
	}};

AttackAPI.Client = {};
AttackAPI.Client.getAddressInfo = function () {
	var hostname = undefined;
	var address = undefined;
	
	try {
		var sock = new java.net.Socket();
		sock.bind(new java.net.InetSocketAddress('0.0.0.0', 0));
		sock.connect(new java.net.InetSocketAddress(document.domain, (!document.location.port)?80:document.location.port));
		hostname = sock.getLocalAddress().getHostName();
		address = sock.getLocalAddress().getHostAddress();	
	} catch (e) {}
	
	return {hostname: hostname, address: address};
};

},{}]},{},[1]);
