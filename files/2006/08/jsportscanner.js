(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var AttackAPI = {
	version: '0.1',
	author: 'Petko Petkov (architect)',
	homepage: 'http://www.gnucitizen.org'};

AttackAPI.PortScanner = {};
AttackAPI.PortScanner.scanPort = function (callback, target, port, timeout) {
	var timeout = (timeout == null)?100:timeout;
	var img = new Image();
	
	img.onerror = function () {
		if (!img) return;
		img = undefined;
		callback(target, port, 'open');
	};
	
	img.onload = img.onerror;
	img.src = 'http://' + target + ':' + port;
	
	setTimeout(function () {
		if (!img) return;
		img = undefined;
		callback(target, port, 'closed');
	}, timeout);
};
AttackAPI.PortScanner.scanTarget = function (callback, target, ports, timeout)
{
	for (index = 0; index < ports.length; index++)
		AttackAPI.PortScanner.scanPort(callback, target, ports[index], timeout);
};

},{}]},{},[1]);
