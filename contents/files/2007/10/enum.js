var client = WScript.CreateObject('Citrix.ICAClient');

if (WScript.Arguments.length < 2) {
	WScript.Echo('usage: ' + WScript.ScriptName + ' <type> key=value key=value key=value ...');
	WScript.Echo('       ' + WScript.ScriptName + ' apps TCPBrowserAddress=172.16.3.191');
	WScript.Echo('       ' + WScript.ScriptName + ' servers HTTPBrowserAddress=172.16.3.191');
	WScript.Echo('');
	WScript.Echo('types:');
	WScript.Echo('\tapps');
	WScript.Echo('\tfarms');
	WScript.Echo('\tservers');
	WScript.Echo('');
	WScript.Echo('CITRIX Application Enumeration Utility');
	WScript.Echo('by Petko D. Petkov (pdp) GNUCITIZEN (http://www.gnucitizen.org)');
	WScript.Quit(1);
} else {
	for (var i = 1; i < WScript.Arguments.length; i++) {
		var arg = WScript.Arguments(i);
		var tkn = arg.split('=');

		try {
			var name = tkn[0].replace(/^\s+|\s+$/g, '');
			var value = tkn[1].replace(/^\s+|\s+$/g, '');

			client.SetProp(name, value);

		} catch (e) {
			WScript.Echo("option '" + arg + "' not recognized");
			WScript.Quit(1);
		}
	}
}

try {
	var type = WScript.Arguments(0);

	switch(type) {
		case 'apps':
			var handler = client.EnumerateApplications();
			break;
		case 'farms':
			var handler = client.EnumerateFarms();
			break;
		case 'servers':
			var handler = client.EnumerateServers();
			break;
	}

	var count = client.GetEnumNameCount(handler);

	for (var i = 0; i < count; i++) {
		WScript.Echo(client.GetEnumNameByIndex(handler, i));
	}

	client.CloseEnumHandle(handler);
} catch (e) {
	WScript.Echo(e);
}
