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
