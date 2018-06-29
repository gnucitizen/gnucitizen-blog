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
