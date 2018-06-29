/**
 * @name spider
 * @desc spiders a URL
 * @param {String} url the url to spider
 * @param {Function} callback the callback function for the spider
 * @param {Object} conf the spider configuration
 */
function spider(url, callback, conf) {
	// setup the conf object
	var conf = (conf != undefined)?conf:{};
	conf.pipe = (conf.pipe != undefined)?conf.pipe:'lruY6uXk2xGdxK66l7okhQ';
	conf.depth = (conf.depth != undefined)?conf.depth:3;

	/**
	 * @name spider >> walkJSON
	 * @desc walk JSON tree structure
	 * @param {Object} j the JSON object to walk
	 * @param {Function} c the callback function to call for each item
	 */
	function walkJSON(j, c) {
		if (typeof(c) != 'function') {
			return;
		}

		for (var i in j) {
			c(i, j[i]);

			if (j[i] instanceof Array || typeof(j[i]) == 'object') {
				arguments.callee(j[i], c);
			}
		}
	}

	/**
	 * @name spider >> extractHostname
	 * @desc extract hostname from URL
	 * @param {String} u the url to use for the extraction
	 * @return {String} the extracted hostname
	 */
	function extractHostname(u) {
		var e = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/.exec(u);

		if (e) {
			return e[6];
		} else {
			return '';
		}
	}

	/**
	 * @name spider >> loadPipe
	 * @desc load remote pipe data
	 * @param {String} p the pipe identifier
	 * @param {String} c the callback identifier
	 * @param {String} a additional parameter to the pipe REST interface
	 */
	function loadPipe(p, c, a) {
		var s = document.createElement('script');

		s.type = 'text/javascript';
		s.src = 'http://pipes.yahoo.com/pipes/pipe.run?_render=json&_id=' + p + '&_callback=' + escape(c)  + '&' + a;

		document.body.appendChild(s);
	}

	/**
	 * @name spider >> spider
	 * @desc do recursive spidering
	 */
	function spider(u, cd, sp) {
		var id = new Date().getTime();

		window['__fh' + id] = function (d) {
			if (conf.depth != 0 && cd >= conf.depth) {
				return;
			}

			walkJSON(d, function (k, v) {
				if (k == 'href') {
					var _u = v;

					if (_u.substring(0, 5) != 'http:' && _u.substring(0, 6) != 'https:') {
						if (_u.substring(0, 1) == '/') {
							_u = u + _u;
						} else {
							_u = u + '/' + _u;
						}
					}

					if (conf.domain != undefined && conf.domain != extractHostname(_u)) {
						return;
					}

					for (var i = 0; i < sp.length; i++) {
						if (sp[i] == _u) {
							return;
						}
					}

					sp.push(_u);

					callback(_u, d);

					spider(_u, cd + 1, sp);
				}
			});
		};

		loadPipe(conf.pipe, '__fh' + id, 'url=' + escape(u));
	}

	// run
	spider(url, 1, []);
}
