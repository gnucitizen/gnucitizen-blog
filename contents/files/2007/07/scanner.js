/**
 * @name scan
 * @desc scan url
 * @param {String} u url to scan
 * @param {Function} c callback to use
 */
function scan(u, c) {
	/**
	 * @cat Core
	 * @name AttackAPI
	 * @desc the library head
	 */
	var AttackAPI = {
		version: '3.0.0a',
		author: 'Petko Petkov | pdp (architect)',
		homepage: 'http://www.gnucitizen.org',
		projecthome: 'http://www.gnucitizen.org/projects/attackapi'};
	/**
	 * @cat Core
	 * @name AttackAPI.clone
	 * @desc clone object
	 * @param {Object} o the object to clone
	 * @return {Object} cloned object
	 */
	AttackAPI.clone = function (o) {
		function clone (o) {
			for (var i in o) {
				this[i] = o[i];
			}
		}

		return new clone(o);
	};
	/**
	 * @cat Core
	 * @name AttackAPI.expand
	 * @desc expand obj with properties
	 * @param {Object} o the object to extend
	 * @param {Object} p the properties to use
	 * @return {Object} the expand object (o)
	 */
	AttackAPI.expand = function (o, p) {
		var _o = this.clone(o);

		for (var i in p) {
			_o[i] = p[i];
		}
	
		return _o;

	};
	/**
	 * @cat Base
	 * @name AttackAPI.buildURL
	 * @desc build url from url object
	 * @param {Object} obj the object to be used
	 * @return {String} url string
	 */
	AttackAPI.buildURL = function (obj) {
		var host = obj.host?obj.host:(obj.hostname?obj.hostname:null);

		if (!host) {
			return '';
		}

		var hash = obj.hash?(obj.hash[0] == '#'?obj.hash:'#' + obj.hash):'';
		var password = obj.password?obj.password:'';
		var pathname = obj.pathname?(obj.pathname[0] == '/'?obj.pathname:'/' + obj.pathname):'/';
		var port = obj.port?':' + obj.port:'';
		var protocol = obj.protocol?obj.protocol + '://':'http://';
		var search = obj.search?(obj.search[0] == '?'?obj.search:'?' + obj.search):'';
		var username = obj.username?obj.username:'';
		var creds = (username || password)?username + ':' + password + '@':'';

		return protocol + creds + host + (port != ':80'?port:'') + pathname + (search != '?'?search:'') + (hash != '#'?hash:'');
	};
	/**
	 * @cat Base
	 * @name AttackAPI.parseURL
	 * @desc parse URL into object
	 * @param {String} url the url to parse
	 * @return {Object} parsed url object
	 */
	AttackAPI.parseURL = function (url) {
		var REGEX = /^((\w+):\/\/)?((\w+):?(\w+)?@)?([^\/\?:]+):?(\d+)?(\/?[^\?#]+)?\??([^#]+)?#?(\w*)/;

		var fields = {'href': 0, 'username' : 4, 'password' : 5, 'port' : 7, 'protocol' : 2, 'host' : 6, 'hostname' : 6, 'pathname' : 8, 'search' : 9, 'hash' : 10};
		var result = new Object();
		var r = REGEX.exec(url);

		for (var field in fields) {
			result[field] = r[fields[field]];
		}

		result.hash = result.hash?'#' + result.hash:'#';
		result.search = result.search?'?' + result.search:'?';
		result.username = result.username?result.username:'';
		result.password = result.password?result.password:'';
		result.pathname = result.pathname?result.pathname:'/';

		if (result.port == undefined) {
			switch (result.protocol) {
				case 'http':
					result.port = 80;
					break;
				case 'https':
					result.port = 443;
					break;
				case 'ftp':
					result.port = 21;
					break;
				default:
					result.port = '';
					break;
			}
		}
	
		return result;
	};
	/**
	 * @cat DOM
	 * @name AttackAPI.decodeURL
	 * @desc decode URL
	 * @param {String} url the url to decode
	 * @return {String} URL decoded string
	 */
	AttackAPI.decodeURL = function (url) {
		return unescape(url);
	};
	/**
	 * @cat DOM
	 * @name AttackAPI.encodeURL
	 * @desc URL encode string
	 * @param {String} url the url to encode
	 * @return {String} url encoded string
	 */
	AttackAPI.encodeURL = function (url) {
		return escape(url);
	};
	/**
	 * @cat Base
	 * @name AttackAPI.parseQuery
	 * @desc parse Query into object
	 * @param {String} query the query to parse
	 * @return {Object} parsed string object
	 */
	AttackAPI.parseQuery = function (query) {
		var queryobj = new Object();
		var tokens = query.split('&');

		for (var index = 0; index < tokens.length; index++) {
			var pair = tokens[index].split('=');
			queryobj[this.decodeURL(pair[0])] = this.decodeURL(pair[1]);
		}

		return queryobj;
	};
	/**
	 * @cat Base
	 * @name AttackAPI.buildQuery
	 * @desc build query string from object
	 * @param {Object} obj the object to be used
	 * @return {String} query string
	 */
	AttackAPI.buildQuery = function (obj) {
		var tokens = [];

		for (var item in obj) {
			tokens.push(this.encodeURL(item) + '=' + ((obj[item] != undefined && obj[item] != null)?this.encodeURL(obj[item]):''));
		}

		return tokens.join('&');
	};
	/**
	 * @name scan >> mutate_query
	 * @desc muate query
	 * @param {String} q query to mutate
	 * @return {Array} mutations
	 */
	function mutate_query(q) {
		var ret_query = [];
		var query_parts = AttackAPI.parseQuery(q.substr(1));

		for (var name in query_parts) {
			var tmp = {};
			tmp[name] = 'XSS_SCAN"><script>';
			ret_query.push(AttackAPI.buildQuery(AttackAPI.expand(query_parts, tmp)));
			tmp[name] = 'XSS_SCAN\'><script>';
			ret_query.push(AttackAPI.buildQuery(AttackAPI.expand(query_parts, tmp)));
		}

		return ret_query;
	}
	/**
	 * @name scan >> mutate_url
	 * @desc muate url
	 * @param {String} u url to mutate
	 * @return {Array} mutations
	 */
	function mutate_url(u) {
		var ret_urls = [];
		var url_parts = AttackAPI.parseURL(u);

		ret_urls.push(AttackAPI.buildURL(AttackAPI.expand(url_parts, {pathname: '/XSS_SCAN"><script>'})));
		ret_urls.push(AttackAPI.buildURL(AttackAPI.expand(url_parts, {pathname: '/XSS_SCAN\'><script>'})));
		ret_urls.push(AttackAPI.buildURL(AttackAPI.expand(url_parts, {pathname: url_parts.pathname + '/XSS_SCAN"><script>'})));
		ret_urls.push(AttackAPI.buildURL(AttackAPI.expand(url_parts, {pathname: url_parts.pathname + '/XSS_SCAN\'><script>'})));

		var q_mutations = mutate_query(url_parts.search);

		for (var i = 0; i < q_mutations.length; i++) {
			ret_urls.push(AttackAPI.buildURL(AttackAPI.expand(url_parts, {search: q_mutations[i]})));
		}

		return ret_urls;
	}
	/**
	 * @name scan >> queryPalary
	 * @desc load remote script
	 * @param {String} q the query
	 */
	function queryPalary(q) {
		var s = document.createElement('script');

		s.type = 'text/javascript';

		// Palary is stupid/smart so we need to escape each " and script
		var q = q.replace('"', '\\"');
		var q = q.replace('script', 'scrip t');
		var q = escape(q);

		s.src = 'http://palary.com/main/load_page?sfrurl=' + q;

		document.body.appendChild(s);
	}

	window['page_loaded'] = function (d, e, u) {
		if (d.match(/XSS_SCAN\\*"><scrip\s*t>/) || d.match(/XSS_SCAN\\*'><scrip\s*t>/)) {
			c.call(c, u, d);
		}
	};
	window['Effect'] = {'Highlight': function () {}};

	var scanned = {};
	var url_mutations = mutate_url(u);

	for (var i = 0; i < url_mutations.length; i++) {
		if (scanned[url_mutations[i]] != undefined) {
			continue;
		}

		scanned[url_mutations[i]] = true;
		queryPalary(url_mutations[i]);
	}
}
