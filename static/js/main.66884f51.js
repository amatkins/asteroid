!function(t){function e(s){if(i[s])return i[s].exports;var n=i[s]={i:s,l:!1,exports:{}};return t[s].call(n.exports,n,n.exports,e),n.l=!0,n.exports}var i={};e.m=t,e.c=i,e.d=function(t,i,s){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:s})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/my-app/",e(e.s=2)}([function(t,e,i){"use strict";function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var n=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}(),r=function(){function t(e,i){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];s(this,t),this.x=n?e:e*Math.cos(i),this.y=n?i:e*Math.sin(i)}return n(t,[{key:"add",value:function(e){return new t(this.x+e.x,this.y+e.y)}},{key:"trm",value:function(t){return this.nrm()>t?this.sca(t/this.nrm()):this}},{key:"cmp",value:function(e,i){return new t((e.y+this.x-2*e.x)%(e.y-e.x)+e.x,(i.y+this.y-2*i.x)%(i.y-i.x)+i.x)}},{key:"dir",value:function(){return Math.atan(this.y/this.x)}},{key:"dot",value:function(t){return this.x*t.x+this.y*t.y}},{key:"neg",value:function(){return new t(-this.x,-this.y)}},{key:"nrm",value:function(){return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2))}},{key:"pow",value:function(e){return new t(Math.pow(this.x,e),Math.pow(this.y,e))}},{key:"rot",value:function(e){return new t(Math.cos(e)*this.x-Math.sin(e)*this.y,Math.sin(e)*this.x+Math.cos(e)*this.y)}},{key:"sca",value:function(e){return new t(this.x*e,this.y*e)}},{key:"sub",value:function(e){return new t(this.x-e.x,this.y-e.y)}},{key:"uni",value:function(){var e=this.nrm();return new t(this.x/e,this.y/e)}}]),t}();e.a=r},function(t,e,i){"use strict";function s(){}function n(t){try{return t.then}catch(t){return v=t,w}}function r(t,e){try{return t(e)}catch(t){return v=t,w}}function a(t,e,i){try{t(e,i)}catch(t){return v=t,w}}function o(t){if("object"!==typeof this)throw new TypeError("Promises must be constructed via new");if("function"!==typeof t)throw new TypeError("Promise constructor's argument is not a function");this._75=0,this._83=0,this._18=null,this._38=null,t!==s&&y(t,this)}function h(t,e,i){return new t.constructor(function(n,r){var a=new o(s);a.then(n,r),u(t,new p(e,i,a))})}function u(t,e){for(;3===t._83;)t=t._18;if(o._47&&o._47(t),0===t._83)return 0===t._75?(t._75=1,void(t._38=e)):1===t._75?(t._75=2,void(t._38=[t._38,e])):void t._38.push(e);c(t,e)}function c(t,e){b(function(){var i=1===t._83?e.onFulfilled:e.onRejected;if(null===i)return void(1===t._83?l(e.promise,t._18):f(e.promise,t._18));var s=r(i,t._18);s===w?f(e.promise,v):l(e.promise,s)})}function l(t,e){if(e===t)return f(t,new TypeError("A promise cannot be resolved with itself."));if(e&&("object"===typeof e||"function"===typeof e)){var i=n(e);if(i===w)return f(t,v);if(i===t.then&&e instanceof o)return t._83=3,t._18=e,void d(t);if("function"===typeof i)return void y(i.bind(e),t)}t._83=1,t._18=e,d(t)}function f(t,e){t._83=2,t._18=e,o._71&&o._71(t,e),d(t)}function d(t){if(1===t._75&&(u(t,t._38),t._38=null),2===t._75){for(var e=0;e<t._38.length;e++)u(t,t._38[e]);t._38=null}}function p(t,e,i){this.onFulfilled="function"===typeof t?t:null,this.onRejected="function"===typeof e?e:null,this.promise=i}function y(t,e){var i=!1,s=a(t,function(t){i||(i=!0,l(e,t))},function(t){i||(i=!0,f(e,t))});i||s!==w||(i=!0,f(e,v))}var b=i(5),v=null,w={};t.exports=o,o._47=null,o._71=null,o._44=s,o.prototype.then=function(t,e){if(this.constructor!==o)return h(this,t,e);var i=new o(s);return u(this,new p(t,e,i)),i}},function(t,e,i){i(3),t.exports=i(10)},function(t,e,i){"use strict";"undefined"===typeof Promise&&(i(4).enable(),window.Promise=i(7)),i(8),Object.assign=i(9)},function(t,e,i){"use strict";function s(){u=!1,o._47=null,o._71=null}function n(t){function e(e){(t.allRejections||a(l[e].error,t.whitelist||h))&&(l[e].displayId=c++,t.onUnhandled?(l[e].logged=!0,t.onUnhandled(l[e].displayId,l[e].error)):(l[e].logged=!0,r(l[e].displayId,l[e].error)))}function i(e){l[e].logged&&(t.onHandled?t.onHandled(l[e].displayId,l[e].error):l[e].onUnhandled||(console.warn("Promise Rejection Handled (id: "+l[e].displayId+"):"),console.warn('  This means you can ignore any previous messages of the form "Possible Unhandled Promise Rejection" with id '+l[e].displayId+".")))}t=t||{},u&&s(),u=!0;var n=0,c=0,l={};o._47=function(t){2===t._83&&l[t._56]&&(l[t._56].logged?i(t._56):clearTimeout(l[t._56].timeout),delete l[t._56])},o._71=function(t,i){0===t._75&&(t._56=n++,l[t._56]={displayId:null,error:i,timeout:setTimeout(e.bind(null,t._56),a(i,h)?100:2e3),logged:!1})}}function r(t,e){console.warn("Possible Unhandled Promise Rejection (id: "+t+"):"),((e&&(e.stack||e))+"").split("\n").forEach(function(t){console.warn("  "+t)})}function a(t,e){return e.some(function(e){return t instanceof e})}var o=i(1),h=[ReferenceError,TypeError,RangeError],u=!1;e.disable=s,e.enable=n},function(t,e,i){"use strict";(function(e){function i(t){a.length||(r(),o=!0),a[a.length]=t}function s(){for(;h<a.length;){var t=h;if(h+=1,a[t].call(),h>u){for(var e=0,i=a.length-h;e<i;e++)a[e]=a[e+h];a.length-=h,h=0}}a.length=0,h=0,o=!1}function n(t){return function(){function e(){clearTimeout(i),clearInterval(s),t()}var i=setTimeout(e,0),s=setInterval(e,50)}}t.exports=i;var r,a=[],o=!1,h=0,u=1024,c="undefined"!==typeof e?e:self,l=c.MutationObserver||c.WebKitMutationObserver;r="function"===typeof l?function(t){var e=1,i=new l(t),s=document.createTextNode("");return i.observe(s,{characterData:!0}),function(){e=-e,s.data=e}}(s):n(s),i.requestFlush=r,i.makeRequestCallFromTimer=n}).call(e,i(6))},function(t,e){var i;i=function(){return this}();try{i=i||Function("return this")()||(0,eval)("this")}catch(t){"object"===typeof window&&(i=window)}t.exports=i},function(t,e,i){"use strict";function s(t){var e=new n(n._44);return e._83=1,e._18=t,e}var n=i(1);t.exports=n;var r=s(!0),a=s(!1),o=s(null),h=s(void 0),u=s(0),c=s("");n.resolve=function(t){if(t instanceof n)return t;if(null===t)return o;if(void 0===t)return h;if(!0===t)return r;if(!1===t)return a;if(0===t)return u;if(""===t)return c;if("object"===typeof t||"function"===typeof t)try{var e=t.then;if("function"===typeof e)return new n(e.bind(t))}catch(t){return new n(function(e,i){i(t)})}return s(t)},n.all=function(t){var e=Array.prototype.slice.call(t);return new n(function(t,i){function s(a,o){if(o&&("object"===typeof o||"function"===typeof o)){if(o instanceof n&&o.then===n.prototype.then){for(;3===o._83;)o=o._18;return 1===o._83?s(a,o._18):(2===o._83&&i(o._18),void o.then(function(t){s(a,t)},i))}var h=o.then;if("function"===typeof h){return void new n(h.bind(o)).then(function(t){s(a,t)},i)}}e[a]=o,0===--r&&t(e)}if(0===e.length)return t([]);for(var r=e.length,a=0;a<e.length;a++)s(a,e[a])})},n.reject=function(t){return new n(function(e,i){i(t)})},n.race=function(t){return new n(function(e,i){t.forEach(function(t){n.resolve(t).then(e,i)})})},n.prototype.catch=function(t){return this.then(null,t)}},function(t,e){!function(t){"use strict";function e(t){if("string"!==typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function i(t){return"string"!==typeof t&&(t=String(t)),t}function s(t){var e={next:function(){var e=t.shift();return{done:void 0===e,value:e}}};return v.iterable&&(e[Symbol.iterator]=function(){return e}),e}function n(t){this.map={},t instanceof n?t.forEach(function(t,e){this.append(e,t)},this):Array.isArray(t)?t.forEach(function(t){this.append(t[0],t[1])},this):t&&Object.getOwnPropertyNames(t).forEach(function(e){this.append(e,t[e])},this)}function r(t){if(t.bodyUsed)return Promise.reject(new TypeError("Already read"));t.bodyUsed=!0}function a(t){return new Promise(function(e,i){t.onload=function(){e(t.result)},t.onerror=function(){i(t.error)}})}function o(t){var e=new FileReader,i=a(e);return e.readAsArrayBuffer(t),i}function h(t){var e=new FileReader,i=a(e);return e.readAsText(t),i}function u(t){for(var e=new Uint8Array(t),i=new Array(e.length),s=0;s<e.length;s++)i[s]=String.fromCharCode(e[s]);return i.join("")}function c(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function l(){return this.bodyUsed=!1,this._initBody=function(t){if(this._bodyInit=t,t)if("string"===typeof t)this._bodyText=t;else if(v.blob&&Blob.prototype.isPrototypeOf(t))this._bodyBlob=t;else if(v.formData&&FormData.prototype.isPrototypeOf(t))this._bodyFormData=t;else if(v.searchParams&&URLSearchParams.prototype.isPrototypeOf(t))this._bodyText=t.toString();else if(v.arrayBuffer&&v.blob&&m(t))this._bodyArrayBuffer=c(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else{if(!v.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(t)&&!g(t))throw new Error("unsupported BodyInit type");this._bodyArrayBuffer=c(t)}else this._bodyText="";this.headers.get("content-type")||("string"===typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):v.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},v.blob&&(this.blob=function(){var t=r(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?r(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(o)}),this.text=function(){var t=r(this);if(t)return t;if(this._bodyBlob)return h(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(u(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},v.formData&&(this.formData=function(){return this.text().then(p)}),this.json=function(){return this.text().then(JSON.parse)},this}function f(t){var e=t.toUpperCase();return k.indexOf(e)>-1?e:t}function d(t,e){e=e||{};var i=e.body;if(t instanceof d){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new n(t.headers)),this.method=t.method,this.mode=t.mode,i||null==t._bodyInit||(i=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=e.credentials||this.credentials||"omit",!e.headers&&this.headers||(this.headers=new n(e.headers)),this.method=f(e.method||this.method||"GET"),this.mode=e.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&i)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(i)}function p(t){var e=new FormData;return t.trim().split("&").forEach(function(t){if(t){var i=t.split("="),s=i.shift().replace(/\+/g," "),n=i.join("=").replace(/\+/g," ");e.append(decodeURIComponent(s),decodeURIComponent(n))}}),e}function y(t){var e=new n;return t.split(/\r?\n/).forEach(function(t){var i=t.split(":"),s=i.shift().trim();if(s){var n=i.join(":").trim();e.append(s,n)}}),e}function b(t,e){e||(e={}),this.type="default",this.status="status"in e?e.status:200,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in e?e.statusText:"OK",this.headers=new n(e.headers),this.url=e.url||"",this._initBody(t)}if(!t.fetch){var v={searchParams:"URLSearchParams"in t,iterable:"Symbol"in t&&"iterator"in Symbol,blob:"FileReader"in t&&"Blob"in t&&function(){try{return new Blob,!0}catch(t){return!1}}(),formData:"FormData"in t,arrayBuffer:"ArrayBuffer"in t};if(v.arrayBuffer)var w=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],m=function(t){return t&&DataView.prototype.isPrototypeOf(t)},g=ArrayBuffer.isView||function(t){return t&&w.indexOf(Object.prototype.toString.call(t))>-1};n.prototype.append=function(t,s){t=e(t),s=i(s);var n=this.map[t];this.map[t]=n?n+","+s:s},n.prototype.delete=function(t){delete this.map[e(t)]},n.prototype.get=function(t){return t=e(t),this.has(t)?this.map[t]:null},n.prototype.has=function(t){return this.map.hasOwnProperty(e(t))},n.prototype.set=function(t,s){this.map[e(t)]=i(s)},n.prototype.forEach=function(t,e){for(var i in this.map)this.map.hasOwnProperty(i)&&t.call(e,this.map[i],i,this)},n.prototype.keys=function(){var t=[];return this.forEach(function(e,i){t.push(i)}),s(t)},n.prototype.values=function(){var t=[];return this.forEach(function(e){t.push(e)}),s(t)},n.prototype.entries=function(){var t=[];return this.forEach(function(e,i){t.push([i,e])}),s(t)},v.iterable&&(n.prototype[Symbol.iterator]=n.prototype.entries);var k=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];d.prototype.clone=function(){return new d(this,{body:this._bodyInit})},l.call(d.prototype),l.call(b.prototype),b.prototype.clone=function(){return new b(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new n(this.headers),url:this.url})},b.error=function(){var t=new b(null,{status:0,statusText:""});return t.type="error",t};var x=[301,302,303,307,308];b.redirect=function(t,e){if(-1===x.indexOf(e))throw new RangeError("Invalid status code");return new b(null,{status:e,headers:{location:t}})},t.Headers=n,t.Request=d,t.Response=b,t.fetch=function(t,e){return new Promise(function(i,s){var n=new d(t,e),r=new XMLHttpRequest;r.onload=function(){var t={status:r.status,statusText:r.statusText,headers:y(r.getAllResponseHeaders()||"")};t.url="responseURL"in r?r.responseURL:t.headers.get("X-Request-URL");var e="response"in r?r.response:r.responseText;i(new b(e,t))},r.onerror=function(){s(new TypeError("Network request failed"))},r.ontimeout=function(){s(new TypeError("Network request failed"))},r.open(n.method,n.url,!0),"include"===n.credentials&&(r.withCredentials=!0),"responseType"in r&&v.blob&&(r.responseType="blob"),n.headers.forEach(function(t,e){r.setRequestHeader(e,t)}),r.send("undefined"===typeof n._bodyInit?null:n._bodyInit)})},t.fetch.polyfill=!0}}("undefined"!==typeof self?self:this)},function(t,e,i){"use strict";function s(t){if(null===t||void 0===t)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}var n=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable;t.exports=function(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de","5"===Object.getOwnPropertyNames(t)[0])return!1;for(var e={},i=0;i<10;i++)e["_"+String.fromCharCode(i)]=i;if("0123456789"!==Object.getOwnPropertyNames(e).map(function(t){return e[t]}).join(""))return!1;var s={};return"abcdefghijklmnopqrst".split("").forEach(function(t){s[t]=t}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},s)).join("")}catch(t){return!1}}()?Object.assign:function(t,e){for(var i,o,h=s(t),u=1;u<arguments.length;u++){i=Object(arguments[u]);for(var c in i)r.call(i,c)&&(h[c]=i[c]);if(n){o=n(i);for(var l=0;l<o.length;l++)a.call(i,o[l])&&(h[o[l]]=i[o[l]])}}return h}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i(11),n=(i.n(s),i(12)),r=Math.min(window.innerWidth,window.innerHeight);new n.a(r/2.5,r/2.5,r/40)},function(t,e){},function(t,e,i){"use strict";function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var n=i(13),r=i(14),a=i(17),o=i(18),h=i(19),u=i(0),c=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}(),l=function(){function t(e,i,n){s(this,t),this.level=0,this.asteroids=[],this.spawn=1,this.aLimit=10,this.explosions=[],this.aDestroyed=0,this.highScore=0,this.ship=new r.a(e,i,n,3),this.twinkles=[],this.cellSize=n,this.height=i,this.width=e,this.wBounds=new u.a(-this.cellSize/4,this.width+this.cellSize/4),this.hBounds=new u.a(-this.cellSize/4,this.height+this.cellSize/4),this.ast_sfx=new h.a,this.shp_sfx=new h.a,this.frontScreen=document.createElement("canvas"),this.frontScreen.width=2.45*e,this.frontScreen.height=2.45*i,this.frontScreen.border="solid",this.frontBuff=this.frontScreen.getContext("2d"),document.body.appendChild(this.frontScreen),this.backScreen=document.createElement("canvas"),this.backScreen.width=e,this.backScreen.height=i,this.backScreen.border="solid",this.backBuff=this.backScreen.getContext("2d"),this.elapseCounter=0,this.lowestTime=0,this.speed=20,this.state="paused";for(var o=0;o<10;o++)this.twinkles.push(new a.a(Math.random()*this.width,Math.random()*this.height,(1+1*Math.random())*this.cellSize/10,40+Math.round(20*Math.random())));this.breakAsteroid=this.breakAsteroid.bind(this),this.createAsteroid=this.createAsteroid.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this),this.handleKeyUp=this.handleKeyUp.bind(this),this.loop=this.loop.bind(this),this.pause=this.pause.bind(this),this.render=this.render.bind(this),this.restart=this.restart.bind(this),this.unpause=this.unpause.bind(this),this.update=this.update.bind(this),window.onkeydown=this.handleKeyDown,window.onkeyup=this.handleKeyUp,this.render("P/Pause: Play/Pause, WASD: Move, Space: Shoot")}return c(t,[{key:"breakAsteroid",value:function(t){var e=this;this.explosions.push(new o.a(this.asteroids[t].pos,2*Math.random()*Math.PI,10)),this.asteroids[t].lvl>1?(this.asteroids[t].degrade(this.ship.pos,this.cellSize).forEach(function(t){e.asteroids.push(t)}),this.ast_sfx.play("crack")):this.ast_sfx.play("break"),this.asteroids.splice(t,1),this.aDestroyed++}},{key:"createAsteroid",value:function(){var t;switch(Math.round(4*Math.random())){case 0:t=new u.a(0,Math.random()*(this.hBounds.y-2));break;case 1:t=new u.a(this.width-1,Math.random()*(this.hBounds.y-2));break;case 2:t=new u.a(Math.random()*(this.wBounds.y-2),0);break;case 3:default:t=new u.a(Math.random()*(this.wBounds.y-2),this.height-1)}var e=new u.a(this.ship.pos.x-2*this.cellSize+Math.random()*this.cellSize*4,this.ship.pos.y-2*this.cellSize+Math.random()*this.cellSize*4).sub(t).uni().sca(this.cellSize/100+Math.random()*this.cellSize/50),i=1+Math.round(3*Math.random());return new n.a(t,i,this.cellSize,e,10*Math.random()-5)}},{key:"handleKeyDown",value:function(t){switch(t.preventDefault(),t.key){case"w":t.repeat||this.ship.pullInput({sig:"acc",str:.08});break;case"a":t.repeat?this.ship.pullInput({sig:"ccw",str:6}):this.ship.pullInput({sig:"ccw",str:2});break;case"s":t.repeat||this.ship.pullInput({sig:"acc",str:-.08});break;case"d":t.repeat?this.ship.pullInput({sig:"cw",str:6}):this.ship.pullInput({sig:"cw",str:2});break;case" ":case"ArrowUp":"running"===this.state&&this.ship.shoot(this.cellSize,.4)&&this.shp_sfx.play("shoot");break;case"p":case"Pause":if(!t.repeat)switch(this.state){case"running":this.pause();break;case"paused":this.unpause();break;case"complete":this.restart(this.level+1);break;case"over":this.restart()}}}},{key:"handleKeyUp",value:function(t){switch(t.preventDefault(),t.key){case"w":this.ship.stopInput("acc");break;case"a":this.ship.stopInput("ccw");break;case"s":this.ship.stopInput("acc");break;case"d":this.ship.stopInput("cw")}}},{key:"loop",value:function(){switch(this.update(),this.state){case"running":this.render("High Score: "+this.highScore+" ast "+this.lowestTime+" tu");break;case"complete":this.render("Level Complete!"),clearInterval(this.loopID);break;case"over":this.render("Game Over!"),clearInterval(this.loopID)}this.elapseCounter++}},{key:"pause",value:function(){this.state="paused",clearInterval(this.loopID),this.render("P/Pause: Play/Pause, WASD: Move, Space: Shoot")}},{key:"render",value:function(){var t,e,i,s,n,r=this,a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";this.backBuff.clearRect(0,0,this.width,this.height),this.twinkles.forEach(function(t){t.render(r.backBuff)}),this.ship.render(this.backBuff),this.asteroids.forEach(function(t){t.render(r.backBuff)}),this.explosions.forEach(function(t){t.render(r.backBuff)}),this.backBuff.save(),this.backBuff.fillStyle="rgba(255, 255, 255, 0.6)",this.backBuff.font=this.cellSize-.5*this.cellSize*(this.elapseCounter%100)/100+"px Arial",i="Score: "+this.aDestroyed+" Time: "+Math.floor(this.elapseCounter/100),s=this.backBuff.measureText(i),this.backBuff.fillText(i,this.width/2-s.width/2,this.cellSize),this.backBuff.font=.6*this.cellSize+"px Arial",t="Lives: "+this.ship.lives,e=this.backBuff.measureText(t),this.backBuff.fillText(t,this.width-e.width-5,.6*this.cellSize),this.backBuff.fillText("Level: "+(this.level+1),5,.6*this.cellSize);var o=1;do{this.backBuff.font=this.cellSize*o+"px Arial",n=this.backBuff.measureText(a),o*=.95}while(n.width>this.width-10);this.backBuff.fillText(a,this.width/2-n.width/2,this.height-10),this.backBuff.restore(),this.frontBuff.save(),this.frontBuff.scale(2.45,2.45),this.frontBuff.clearRect(0,0,this.width,this.height),this.frontBuff.drawImage(this.backScreen,0,0),this.frontBuff.restore()}},{key:"restart",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;this.level=t,this.aDestroyed>this.highScore?(this.highScore=this.aDestroyed,this.lowestTime=Math.floor(this.elapseCounter/100)):this.aDestroyed===this.highScore&&Math.floor(this.elapseCounter/100)<this.lowestTime&&(this.lowestTime=Math.floor(this.elapseCounter/100)),this.asteroids=[],this.spawn=1,this.aLimit=(10+5*t)%50,this.explosions=[],this.aDestroyed=this.level>0?this.aDestroyed:0,this.ship=new r.a(this.width,this.height,this.cellSize,this.level>0?this.ship.lives:3),this.twinkles=[],this.elapseCounter=this.level>0?this.elapseCounter:0,this.speed=20,this.state="paused";for(var e=0;e<10;e++)this.twinkles.push(new a.a(Math.random()*this.width,Math.random()*this.height,(1+1*Math.random())*this.cellSize/10,40+Math.round(20*Math.random())));this.render("P/Pause: Play/Pause, WASD: Move, Space: Shoot")}},{key:"unpause",value:function(){var t=this;this.state="running",this.loopID=setInterval(function(){return t.loop()},this.speed),this.render()}},{key:"update",value:function(){var t=this;this.ship.update(this.wBounds,this.hBounds),this.asteroids.forEach(function(e){e.update(t.wBounds,t.hBounds)});for(var e=0;e<this.asteroids.length;e++)for(var i=e+1;i<this.asteroids.length;i++)this.asteroids[e].pos.sub(this.asteroids[i].pos).nrm()<this.asteroids[e].sze+this.asteroids[i].sze&&(this.asteroids[e].bounce(this.asteroids[i]),this.ast_sfx.play("bounce"));if(this.ship.bullet){var s=this.asteroids.findIndex(function(e){return e.pos.sub(t.ship.bullet.pos).nrm()<e.sze});s>-1&&(this.breakAsteroid(s),this.ship.bullet=null)}if(0===this.ship.inv)for(var n=0;n<this.asteroids.length;n++)this.asteroids[n].pos.sub(this.ship.pos).nrm()<this.asteroids[n].sze+this.ship.atm&&(this.ship.lives>1?this.ship=new r.a(this.width,this.height,this.cellSize,this.ship.lives-1):this.state="over",this.shp_sfx.play("death"));0!==this.elapseCounter&&this.elapseCounter%1e3===0&&this.aLimit<100&&this.aLimit++;for(var o=0;o<this.twinkles.length;o++)this.twinkles[o].update()||(this.twinkles[o]=new a.a(Math.random()*this.width,Math.random()*this.height,(1+1*Math.random())*this.cellSize/10,40+Math.round(20*Math.random())));for(var h=0;h<this.explosions.length;h++)this.explosions[h].update()||(this.explosions.splice(h,1),h--);this.spawn<this.aLimit&&(this.elapseCounter%50!==0&&0!==this.asteroids.length||(this.asteroids.push(this.createAsteroid()),this.spawn++)),0===this.asteroids.length&&(this.state="complete")}}]),t}();e.a=l},function(t,e,i){"use strict";function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var n=i(0),r=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}(),a=function(){function t(e,i,n,r,a){s(this,t),this.pos=e,this.ort=360*Math.random(),this.vel=r,this.spn=a,this.lvl=i,this.sze=i/5*n+n/5,this.sur=[],this.createSurface(),this.bounce=this.bounce.bind(this),this.createSurface=this.createSurface.bind(this),this.degrade=this.degrade.bind(this),this.render=this.render.bind(this),this.update=this.update.bind(this)}return r(t,[{key:"bounce",value:function(t){var e=this.vel,i=t.vel,s=this.pos.sub(t.pos),n=s.neg();this.vel=e.sub(s.sca(2*t.sze/(this.sze+t.sze)*e.sub(i).dot(s)/s.dot(s))),t.vel=i.sub(n.sca(2*this.sze/(this.sze+t.sze)*i.sub(e).dot(n)/n.dot(n))),this.pos=this.pos.add(s.sca((this.sze+t.sze)/s.nrm()).sub(s).sca(.5)),t.pos=t.pos.add(n.sca((this.sze+t.sze)/n.nrm()).sub(n).sca(.5))}},{key:"createSurface",value:function(){for(var t,e=0,i=.5*this.sze+Math.random()*(.5*this.sze);e<360;){do{t=i;var s=Math.random();s<.5?t-=.05*this.sze+Math.random()*(.1*this.sze):s<1&&(t+=.05*this.sze+Math.random()*(.1*this.sze))}while(this.sze<t||t<.5*this.sze);i=t,this.sur.push({x:i*Math.cos(e*Math.PI/180),y:i*Math.sin(e*Math.PI/180)}),e+=Math.min(5+40*Math.random(),360-e)}}},{key:"degrade",value:function(e,i){for(var s,r=[],a=this.lvl;a>0;)s=1+Math.round(Math.random()*(a-1-(0===r.length?1:0))),r.push(s),a-=s;for(var o,h,u,c=[],l=(180*this.pos.sub(e).dir()/Math.PI+90)%360,f=0;f<r.length;f++)s=r[f],o=(l+f/r.length*360)%360,h=i/2+s*i/10,u=new n.a(h,o*Math.PI/180),c.push(new t(this.pos.add(u),s,i,this.vel.sca(.5+s/3*.2).add(u.uni().sca(i/100+Math.random()*i/60)),20*Math.random()-10));return c}},{key:"render",value:function(t){var e=-3+Math.round(6*Math.random()),i=-3+Math.round(6*Math.random());t.save(),t.translate(this.pos.x,this.pos.y),t.rotate(this.ort*Math.PI/180),t.strokeStyle="rgba(128, 0, 255, 0.5)",t.fillStyle="rgba(128, 0, 255, 0.2)",t.beginPath(),t.arc(e,i,this.sze,0,2*Math.PI,!1),t.fill(),t.stroke(),t.strokeStyle="white",t.fillStyle="black",t.beginPath(),t.moveTo(this.sur[0].x,this.sur[0].y);for(var s=1;s<this.sur.length;s++)t.lineTo(this.sur[s].x,this.sur[s].y);t.closePath(),t.fill(),t.stroke(),t.strokeStyle="rgba(0, 255, 0, 0.5)",t.fillStyle="rgba(0, 255, 0, 0.15)",t.beginPath(),t.arc(-e,-i,this.sze,0,2*Math.PI,!1),t.fill(),t.stroke(),t.restore()}},{key:"update",value:function(t,e){this.pos=this.pos.add(this.vel).cmp(t,e),this.ort=(this.ort+this.spn)%360}}]),t}();e.a=a},function(t,e,i){"use strict";function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var n=i(15),r=i(0),a=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}(),o=function(){function t(e,i,n,a){s(this,t),this.pos=new r.a(e/2,i/2),this.ori=270,this.atm=.4*n,this.vel=new r.a(0,0),this.lat="na",this.spd=0,this.maxSpd=.1*n,this.ang="na",this.trq=0,this.lives=a,this.inv=100,this.bullet=null,this.pullInput=this.pullInput.bind(this),this.stopInput=this.stopInput.bind(this),this.render=this.render.bind(this),this.shoot=this.shoot.bind(this),this.update=this.update.bind(this)}return a(t,[{key:"pullInput",value:function(t){switch(t.sig){case"cw":case"ccw":this.ang=t.sig,this.trq=t.str;break;case"acc":this.lat=t.sig,this.spd=t.str}}},{key:"stopInput",value:function(t){t===this.ang?(this.ang="na",this.trq=0):t===this.lat&&(this.lat="na",this.spd=0)}},{key:"render",value:function(t){var e=-1+Math.round(2*Math.random()),i=-1+Math.round(2*Math.random());t.save(),t.translate(this.pos.x,this.pos.y),t.rotate(this.ori*Math.PI/180),t.strokeStyle="rgba(0, 255, 255, 0.5)",t.fillStyle="rgba(0, 255, 255, 0.1)",t.beginPath(),t.arc(e,i,this.atm,0,2*Math.PI,!1),t.fill(),t.stroke(),t.strokeStyle="rgba(255, 255, 255, "+1*(1-this.inv%20/20)+")",t.fillStyle="black",t.beginPath(),t.moveTo(this.atm,0),t.lineTo(-this.atm*Math.cos(Math.PI/4),-this.atm*Math.sin(Math.PI/4)),t.lineTo(-this.atm/3,0),t.lineTo(-this.atm*Math.cos(Math.PI/4),this.atm*Math.sin(Math.PI/4)),t.closePath(),t.fill(),t.stroke(),t.strokeStyle="rgba(0, 255, 255, 0.5)",t.fillStyle="rgba(0, 255, 255, 0.1)",t.beginPath(),t.arc(-e,-i,this.atm,0,2*Math.PI,!1),t.fill(),t.stroke(),t.restore(),this.bullet&&this.bullet.render(t)}},{key:"shoot",value:function(t,e){if(!this.bullet){var i=new r.a(e,this.ori*Math.PI/180,!1);return this.bullet=new n.a(this.pos.add(i.sca(1.5)),i),!0}return!1}},{key:"update",value:function(t,e){switch(this.ang){case"cw":this.ori=(this.ori+this.trq)%360;break;case"ccw":this.ori=(360+this.ori-this.trq)%360}switch(this.lat){case"acc":this.vel=this.vel.add(new r.a(this.spd,this.ori*Math.PI/180,!1)).trm(this.maxSpd);break;default:this.vel=this.vel.sca(.99)}this.pos=this.pos.add(this.vel).cmp(t,e),this.inv>0&&this.inv--,this.bullet&&!this.bullet.update(t,e)&&(this.bullet=null)}}]),t}();e.a=o},function(t,e,i){"use strict";function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var n=i(16),r=(i(0),function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}()),a=function(){function t(e,i){s(this,t),this.pos=e,this.vel=i,this.trails=[],this.render=this.render.bind(this),this.update=this.update.bind(this)}return r(t,[{key:"render",value:function(t){this.trails.forEach(function(e){e.render(t)}),t.save(),t.translate(this.pos.x,this.pos.y),t.rotate(this.vel.dir()),t.strokeStyle="red",t.beginPath(),t.moveTo(-2,-1),t.lineTo(2,-1),t.arc(2,0,1,1.5*Math.PI,.5*Math.PI,!1),t.moveTo(2,1),t.lineTo(-2,1),t.arc(-2,0,1,.5*Math.PI,1.5*Math.PI,!1),t.stroke(),t.restore()}},{key:"update",value:function(t,e){for(var i=0;i<this.trails.length;i++)this.trails[i].update()||this.trails.shift();return this.trails.push(new n.a(this.pos,this.vel.dir(),10)),this.pos=this.pos.add(this.vel),!(this.pos.x<t.x||this.pos.x>t.y||this.pos.y<e.x||this.pos.y>e.y)}}]),t}();e.a=a},function(t,e,i){"use strict";function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var n=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}(),r=function(){function t(e,i,n){s(this,t),this.pos=e,this.ang=i,this.life=n,this.maxLife=n,this.render=this.render.bind(this),this.update=this.update.bind(this)}return n(t,[{key:"render",value:function(t){var e=this.life/this.maxLife;t.save(),t.strokeStyle="red",t.beginPath(),t.translate(this.pos.x,this.pos.y),t.rotate(this.ang),t.moveTo(-2*e,-1*e),t.lineTo(2*e,-1*e),t.arc(2*e,0,1*e,1.5*Math.PI,.5*Math.PI,!1),t.moveTo(2*e,1*e),t.lineTo(-2*e,1*e),t.arc(-2*e,0,1*e,.5*Math.PI,1.5*Math.PI,!1),t.stroke(),t.restore()}},{key:"update",value:function(){return--this.life>0}}]),t}();e.a=r},function(t,e,i){"use strict";function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var n=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}(),r=function(){function t(e,i,n,r){s(this,t),this.x=e,this.y=i,this.life=r,this.maxLife=r,this.size=n,this.render=this.render.bind(this),this.update=this.update.bind(this)}return n(t,[{key:"render",value:function(t){var e=this.life/this.maxLife*this.size;t.save(),t.fillStyle="white",t.fillRect(this.x-e/2,this.y-e/2,e,e),t.restore()}},{key:"update",value:function(){return--this.life>0}}]),t}();e.a=r},function(t,e,i){"use strict";function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var n=(i(0),function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}()),r=function(){function t(e,i,n){s(this,t),this.pos=e,this.ang=i,this.bra=5+Math.round(5*Math.random()),this.life=n,this.maxLife=n,this.render=this.render.bind(this),this.update=this.update.bind(this)}return n(t,[{key:"render",value:function(t){var e;t.save(),t.translate(this.pos.x,this.pos.y),t.rotate(this.ang),t.strokeStyle="rgba(255, 255, 255, 0.75)",t.beginPath();for(var i=0;i<this.bra;i++)e=i/this.bra*2*Math.PI,t.moveTo(3*Math.cos(e),3*Math.sin(e)),t.lineTo((3+(this.maxLife-this.life)/this.maxLife*9)*Math.cos(e),(3+(this.maxLife-this.life)/this.maxLife*9)*Math.sin(e));t.stroke(),t.restore()}},{key:"update",value:function(){return--this.life>0}}]),t}();e.a=r},function(t,e,i){"use strict";function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var n=i(20),r=i.n(n),a=i(21),o=i.n(a),h=i(22),u=i.n(h),c=i(23),l=i.n(c),f=i(24),d=i.n(f),p=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}(),y=function(){function t(){s(this,t),this.player=document.createElement("audio"),document.body.appendChild(this.player),this.tracks=[r.a,o.a,u.a,l.a,d.a]}return p(t,[{key:"play",value:function(t){switch(t){case"bounce":this.player.src=this.tracks[0],this.player.currentTime=0;break;case"shoot":this.player.src=this.tracks[1],this.player.currentTime=0;break;case"crack":this.player.src=this.tracks[2],this.player.currentTime=0;break;case"break":this.player.src=this.tracks[3],this.player.currentTime=0;break;case"death":this.player.src=this.tracks[4],this.player.currentTime=0}this.player.play()}},{key:"pause",value:function(){this.player.pause()}}]),t}();e.a=y},function(t,e,i){t.exports=i.p+"static/media/bounce.c7e1535e.wav"},function(t,e,i){t.exports=i.p+"static/media/shoot.5835a0a3.wav"},function(t,e,i){t.exports=i.p+"static/media/crack.3a06c586.wav"},function(t,e,i){t.exports=i.p+"static/media/break.1c87f0da.wav"},function(t,e,i){t.exports=i.p+"static/media/death.9a287b87.wav"}]);
//# sourceMappingURL=main.66884f51.js.map