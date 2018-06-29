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
