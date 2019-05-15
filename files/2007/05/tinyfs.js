(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}]},{},[1]);
