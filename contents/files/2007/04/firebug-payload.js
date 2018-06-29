function runFile(f) {
	var file = Components.classes["@mozilla.org/file/local;1"]
		.createInstance(Components.interfaces.nsILocalFile);

	file.initWithPath(f);

	var process = Components.classes["@mozilla.org/process/util;1"]
		.createInstance(Components.interfaces.nsIProcess);

	process.init(file);

	var argv = Array.prototype.slice.call(arguments, 1);

	process.run(true, argv, argv.length);
}
