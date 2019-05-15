import flash.external.ExternalInterface;

class FlashCookieManager {
	public function FlashCookieManager() {
		ExternalInterface.addCallback("get", this, get);
		ExternalInterface.addCallback("set", this, set);
		ExternalInterface.addCallback("cls", this, cls);
	}

	public function get(name, path, secure) {
		var s = SharedObject.getLocal(name, path, secure);
		var v = s.data.value;

		s.close();

		return v;
	}

	public function set(data, name, path, secure) {
		var s = SharedObject.getLocal(name, path, secure);
		s.data.value = data;

		s.flush();
		s.close();
	}

	public function cls(name, path, secure) {
		var s = SharedObject.getLocal(name, path, secure);

		s.clear();
		s.flush();
		s.close();
	}
}
