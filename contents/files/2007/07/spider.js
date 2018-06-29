/**
 * @name spider
 * @desc spiders a URL
 * @param {String} url the url to spider. in case of Yahoo Site Explorer, this * value must be a domain
 * @param {Function} callback the callback function for the spider
 * @param {Object} conf the spider configuration
 */
function spider(url, callback, conf) {
	// setup the conf object
	var conf = (conf != undefined)?conf:{};
	conf.depth = (conf.depth != undefined)?conf.depth:3;

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
	 * @name spider >> querySiteExplorer
	 * @desc load remote script
	 * @param {String} q the query
	 * @param {Function} c the callback
	 * @param {Number} t the start position, by default 0
	 */
	function querySiteExplorer(q, c, t) {
		var t = (t != undefined)?t:1;
		var n = 'json_' + (new Date).getTime();
		var s = document.createElement('script');

		s.type = 'text/javascript';
		s.src = 'http://search.yahooapis.com/SiteExplorerService/V1/pageData?appid=YahooDemo&query=' + escape(q) + '&results=100&output=json&callback=' + escape(n) + '&start=' + escape(t);

		window[n] = function () {
			c.apply(c, arguments);
		};

		document.body.appendChild(s);
	}

	var spidered = {};
	var domain = extractHostname(url);

	for (var i = 0; i < conf.depth; i++) {
		querySiteExplorer(domain, function (d) {
			var items = d.ResultSet.Result;

			for (z = 0; z < items.length; z++) {
				var item = items[z];

				if (spidered[item.Url] != undefined) {
					continue;
				}

				spidered[item.Url] = true;

				callback.call(callback, item.Url, item.ClickUrl, item.Title);
			}
		}, (i * 100) + 1);
	}
}
