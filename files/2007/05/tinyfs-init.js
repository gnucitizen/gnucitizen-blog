(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
$(document).ready(function () {
	var fs = new TinyFS();

	$('[@name="get"]').click(function () {
		$('#status').html('Geting slot...');
		$('[@name="set"]').get(0).disabled = true;
		$('[@name="data"]').get(0).disabled = true;

		var slot = $('[@name="slot"]').val();
		fs.read(slot, function (d) {
			$('[@name="data"]').val(d);
			$('[@name="set"]').get(0).disabled = false;
			$('[@name="data"]').get(0).disabled = false;
			$('#status').html('Slot successfully retrieved!');
		});
	});
	$('[@name="set"]').click(function () {
		$('#status').html('Setting data...');
		$('[@name="get"]').get(0).disabled = true;
		$('[@name="slot"]').get(0).disabled = true;

		var data = $('[@name="data"]').val();
		fs.write(data, function (s) {
			$('[@name="slot"]').val(s);
			$('[@name="get"]').get(0).disabled = false;
			$('[@name="slot"]').get(0).disabled = false;
			$('#status').html('Data successfully saved!');
		});
	});
});

},{}]},{},[1]);
