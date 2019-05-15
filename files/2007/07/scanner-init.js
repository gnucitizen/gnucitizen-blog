(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
$(document).ready(function () {
	function startSpider() {
		var target = $('[@name="domainXSSScanner"] [@name="target"]').val();
		spider(target, function (u, cu, t) {
			scan(u, function (u) {
				$('#spidered-links').append(u + '<br/>');
			});
		});
	}

	function startScanner() {
		var target = $('[@name="targetXSSScanner"] [@name="target"]').val();
		scan(target, function (u) {
			$('#spidered-links').append(u + '<br/>');
		});
	}

	$('form[@name="domainXSSScanner"] input[@name="scan"]').click(function () {
		startSpider();
	});

	$('form[@name="domainXSSScanner"]').submit(function () {
		startSpider();

		return false;
	});

	$('form[@name="targetXSSScanner"] input[@name="scan"]').click(function () {
		startScanner();
	});

	$('form[@name="targetXSSScanner"]').submit(function () {
		startScanner();

		return false;
	});
});

},{}]},{},[1]);
