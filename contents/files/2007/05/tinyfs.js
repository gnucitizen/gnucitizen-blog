function TinyFS () {
    this.base = 'http://pipes.yahoo.com/pipes/pipe.run?_id=nvTyLSDv2xGkB7MlJhOy0Q&_run=1&_render=json';
}

TinyFS.prototype.read = function (slot, onload) {
    var callbackName = '__callback' + new Date().getTime();

    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = this.base + '&slot=' + escape(slot) + '&_callback=' + escape(callbackName) + '&__r=' + new Date().getTime();

    window[callbackName] = function (r) {
        if (typeof(onload) == 'function') {
			if (r.value.items.length) {
            	onload.call(r, unescape(r.value.items[0].data.substring(7).replace(/\+/g, ' ')));
			} else {
				onload.call(r, '');
			}
        }
    };

    document.body.appendChild(s);
};

TinyFS.prototype.write = function (data, onload) {
    var callbackName = '__callback' + new Date().getTime();

    var s = document.createElement('script');
    s.type = 'text/javascript'; s.src = this.base + '&data=' + escape(data) + '&_callback=' + escape(callbackName) + '&__r=' + new Date().getTime();

    window[callbackName] = function (r) {
        if (typeof(onload) == 'function') {
			if (r.value.items.length) {
            	onload.call(r, r.value.items[0].slot);
			} else {
            	onload.call(r, '');
			}
        }
    };

    document.body.appendChild(s);
}
