$(document).ready(function () {
	function startSpider() {
		var target = $('[@name="target"]').val();
		spider(target, function (u, cu, t) {
			$('#spidered-links').append(u + '<br/>');
		});
	}

	$('[@name="spider"]').click(function () {
		startSpider();
	});

	$('form').submit(function () {
		startSpider();

		return false;
	});
});
