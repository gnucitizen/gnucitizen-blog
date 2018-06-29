$(document).ready(function () {
	$('[@name="spider"]').click(function () {
		function extractHostname(u) {
			var e = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/.exec(u);

			if (e) {
				return e[6];
			} else {
				return '';
			}
		}

		var target = $('[@name="target"]').val();
		spider(target, function (u, d) {
			$('#spidered-links').append(u + '<br/>');
		}, {domain: extractHostname(target), pipe: 'jgpIRDDm2xGpGBpFdbq02Q'});
	});
});
