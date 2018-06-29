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
