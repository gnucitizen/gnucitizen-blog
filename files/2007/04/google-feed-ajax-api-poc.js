(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
function escapeHTML(s) {
	return s.replace(/&/g,'&amp;').replace(/>/g,'&gt;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
}

google.load('feeds', '1');
google.setOnLoadCallback(function () {
	$('form[@name="poc"] input[@type="button"]').click(function () {
		var rest = $(this).siblings('div');
		var feed = new google.feeds.Feed($(this).siblings('[@name="feed"]').val());

		feed.load(function(result) {
			rest.html('');

			if (!result.error) {
				for (var i = 0; i < result.feed.entries.length; i++) {
					var entry = result.feed.entries[i];
					rest.append('<h3>' + escapeHTML(entry.title) + '</h3>');
					rest.append('<div class="box" style="margin-top: 0.5em; margin-bottom: 0.5em; overflow: auto">' + escapeHTML(entry.content) + '</div>');
				}
			}
		});
	});
});

$('form[@name="poc"]').submit(function () {
	$('input[@type="button"]').click();
	return false;
});

},{}]},{},[1]);
