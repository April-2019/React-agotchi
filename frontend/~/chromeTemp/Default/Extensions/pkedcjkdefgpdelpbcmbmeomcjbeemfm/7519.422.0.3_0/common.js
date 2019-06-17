'use strict';var h,aa=function(a){var c=0;return function(){return c<a.length?{done:!1,value:a[c++]}:{done:!0}}},ba="function"==typeof Object.defineProperties?Object.defineProperty:function(a,c,b){a!=Array.prototype&&a!=Object.prototype&&(a[c]=b.value)},ca="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this,ea=function(){ea=function(){};ca.Symbol||(ca.Symbol=fa)},ha=function(a,c){this.b=a;ba(this,"description",{configurable:!0,writable:!0,value:c})};
ha.prototype.toString=function(){return this.b};
var fa=function(){function a(b){if(this instanceof a)throw new TypeError("Symbol is not a constructor");return new ha("jscomp_symbol_"+(b||"")+"_"+c++,b)}var c=0;return a}(),ja=function(){ea();var a=ca.Symbol.iterator;a||(a=ca.Symbol.iterator=ca.Symbol("Symbol.iterator"));"function"!=typeof Array.prototype[a]&&ba(Array.prototype,a,{configurable:!0,writable:!0,value:function(){return ia(aa(this))}});ja=function(){}},ia=function(a){ja();a={next:a};a[ca.Symbol.iterator]=function(){return this};return a},
l=function(a){var c="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return c?c.call(a):{next:aa(a)}},n=function(a){if(!(a instanceof Array)){a=l(a);for(var c,b=[];!(c=a.next()).done;)b.push(c.value);a=b}return a},ka="function"==typeof Object.create?Object.create:function(a){var c=function(){};c.prototype=a;return new c},la;
if("function"==typeof Object.setPrototypeOf)la=Object.setPrototypeOf;else{var ma;a:{var na={Co:!0},oa={};try{oa.__proto__=na;ma=oa.Co;break a}catch(a){}ma=!1}la=ma?function(a,c){a.__proto__=c;if(a.__proto__!==c)throw new TypeError(a+" is not extensible");return a}:null}
var pa=la,q=function(a,c){a.prototype=ka(c.prototype);a.prototype.constructor=a;if(pa)pa(a,c);else for(var b in c)if("prototype"!=b)if(Object.defineProperties){var d=Object.getOwnPropertyDescriptor(c,b);d&&Object.defineProperty(a,b,d)}else a[b]=c[b];a.Ca=c.prototype},qa=function(a,c){if(c){var b=ca;a=a.split(".");for(var d=0;d<a.length-1;d++){var e=a[d];e in b||(b[e]={});b=b[e]}a=a[a.length-1];d=b[a];c=c(d);c!=d&&null!=c&&ba(b,a,{configurable:!0,writable:!0,value:c})}};
qa("Promise",function(a){function c(){this.b=null}function b(g){return g instanceof e?g:new e(function(k){k(g)})}if(a)return a;c.prototype.f=function(g){if(null==this.b){this.b=[];var k=this;this.g(function(){k.j()})}this.b.push(g)};var d=ca.setTimeout;c.prototype.g=function(g){d(g,0)};c.prototype.j=function(){for(;this.b&&this.b.length;){var g=this.b;this.b=[];for(var k=0;k<g.length;++k){var m=g[k];g[k]=null;try{m()}catch(p){this.h(p)}}}this.b=null};c.prototype.h=function(g){this.g(function(){throw g;
})};var e=function(g){this.f=0;this.g=void 0;this.b=[];var k=this.j();try{g(k.resolve,k.reject)}catch(m){k.reject(m)}};e.prototype.j=function(){function g(p){return function(v){m||(m=!0,p.call(k,v))}}var k=this,m=!1;return{resolve:g(this.D),reject:g(this.h)}};e.prototype.D=function(g){if(g===this)this.h(new TypeError("A Promise cannot resolve to itself"));else if(g instanceof e)this.C(g);else{a:switch(typeof g){case "object":var k=null!=g;break a;case "function":k=!0;break a;default:k=!1}k?this.u(g):
this.w(g)}};e.prototype.u=function(g){var k=void 0;try{k=g.then}catch(m){this.h(m);return}"function"==typeof k?this.F(k,g):this.w(g)};e.prototype.h=function(g){this.m(2,g)};e.prototype.w=function(g){this.m(1,g)};e.prototype.m=function(g,k){if(0!=this.f)throw Error("Cannot settle("+g+", "+k+"): Promise already settled in state"+this.f);this.f=g;this.g=k;this.o()};e.prototype.o=function(){if(null!=this.b){for(var g=0;g<this.b.length;++g)f.f(this.b[g]);this.b=null}};var f=new c;e.prototype.C=function(g){var k=
this.j();g.ih(k.resolve,k.reject)};e.prototype.F=function(g,k){var m=this.j();try{g.call(k,m.resolve,m.reject)}catch(p){m.reject(p)}};e.prototype.then=function(g,k){function m(H,E){return"function"==typeof H?function(R){try{p(H(R))}catch(da){v(da)}}:E}var p,v,A=new e(function(H,E){p=H;v=E});this.ih(m(g,p),m(k,v));return A};e.prototype.catch=function(g){return this.then(void 0,g)};e.prototype.ih=function(g,k){function m(){switch(p.f){case 1:g(p.g);break;case 2:k(p.g);break;default:throw Error("Unexpected state: "+
p.f);}}var p=this;null==this.b?f.f(m):this.b.push(m)};e.resolve=b;e.reject=function(g){return new e(function(k,m){m(g)})};e.race=function(g){return new e(function(k,m){for(var p=l(g),v=p.next();!v.done;v=p.next())b(v.value).ih(k,m)})};e.all=function(g){var k=l(g),m=k.next();return m.done?b([]):new e(function(p,v){function A(R){return function(da){H[R]=da;E--;0==E&&p(H)}}var H=[],E=0;do H.push(void 0),E++,b(m.value).ih(A(H.length-1),v),m=k.next();while(!m.done)})};return e});
qa("Promise.prototype.finally",function(a){return a?a:function(c){return this.then(function(b){return Promise.resolve(c()).then(function(){return b})},function(b){return Promise.resolve(c()).then(function(){throw b;})})}});var ra=function(){this.m=!1;this.h=null;this.f=void 0;this.b=1;this.j=this.w=0;this.u=this.g=null},sa=function(a){if(a.m)throw new TypeError("Generator is already running");a.m=!0};ra.prototype.o=function(a){this.f=a};var ta=function(a,c){a.g={zc:c,ql:!0};a.b=a.w||a.j};
ra.prototype.return=function(a){this.g={return:a};this.b=this.j};var ua=function(a,c,b){a.b=b;return{value:c}};ra.prototype.Vb=function(a){this.b=a};
var va=function(a,c,b){a.w=c;void 0!=b&&(a.j=b)},wa=function(a,c){a.b=c;a.w=0},xa=function(a){a.w=0;var c=a.g.zc;a.g=null;return c},ya=function(a){this.b=new ra;this.f=a},Ba=function(a,c){sa(a.b);var b=a.b.h;if(b)return za(a,"return"in b?b["return"]:function(d){return{value:d,done:!0}},c,a.b.return);a.b.return(c);return Aa(a)},za=function(a,c,b,d){try{var e=c.call(a.b.h,b);if(!(e instanceof Object))throw new TypeError("Iterator result "+e+" is not an object");if(!e.done)return a.b.m=!1,e;var f=e.value}catch(g){return a.b.h=
null,ta(a.b,g),Aa(a)}a.b.h=null;d.call(a.b,f);return Aa(a)},Aa=function(a){for(;a.b.b;)try{var c=a.f(a.b);if(c)return a.b.m=!1,{value:c.value,done:!1}}catch(b){a.b.f=void 0,ta(a.b,b)}a.b.m=!1;if(a.b.g){c=a.b.g;a.b.g=null;if(c.ql)throw c.zc;return{value:c.return,done:!0}}return{value:void 0,done:!0}},Ca=function(a){this.next=function(c){sa(a.b);a.b.h?c=za(a,a.b.h.next,c,a.b.o):(a.b.o(c),c=Aa(a));return c};this.throw=function(c){sa(a.b);a.b.h?c=za(a,a.b.h["throw"],c,a.b.o):(ta(a.b,c),c=Aa(a));return c};
this.return=function(c){return Ba(a,c)};ja();this[Symbol.iterator]=function(){return this}},Ea=function(a){function c(d){return a.next(d)}function b(d){return a.throw(d)}return new Promise(function(d,e){function f(g){g.done?d(g.value):Promise.resolve(g.value).then(c,b).then(f,e)}f(a.next())})},Fa=function(a){return Ea(new Ca(new ya(a)))},Ga=Ga||{},Ha=this||self,Ia=function(a){return void 0!==a},Ja=function(a){return"string"==typeof a},Ka=function(a){return"boolean"==typeof a},r=function(a){return"number"==
typeof a},Na=function(a){if(a&&a!=Ha)return La(a.document);null===Ma&&(Ma=La(Ha.document));return Ma},Oa=/^[\w+/_-]+[=]{0,2}$/,Ma=null,La=function(a){return(a=a.querySelector&&a.querySelector("script[nonce]"))&&(a=a.nonce||a.getAttribute("nonce"))&&Oa.test(a)?a:""},Pa=function(a,c){a=a.split(".");c=c||Ha;for(var b=0;b<a.length;b++)if(c=c[a[b]],null==c)return null;return c},Qa=function(){},Ra=function(a){a.Fi=void 0;a.Ia=function(){return a.Fi?a.Fi:a.Fi=new a}},Sa=function(a){var c=typeof a;if("object"==
c)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return c;var b=Object.prototype.toString.call(a);if("[object Window]"==b)return"object";if("[object Array]"==b||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==b||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==
c&&"undefined"==typeof a.call)return"object";return c},Ua=function(a){return null===a},Va=function(a){return"array"==Sa(a)},Wa=function(a){var c=Sa(a);return"array"==c||"object"==c&&"number"==typeof a.length},Xa=function(a){return"function"==Sa(a)},Ya=function(a){var c=typeof a;return"object"==c&&null!=a||"function"==c},$a=function(a){null!==a&&"removeAttribute"in a&&a.removeAttribute(Za);try{delete a[Za]}catch(c){}},Za="closure_uid_"+(1E9*Math.random()>>>0),ab=0,bb=function(a,c,b){return a.call.apply(a.bind,
arguments)},cb=function(a,c,b){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var e=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(e,d);return a.apply(c,e)}}return function(){return a.apply(c,arguments)}},t=function(a,c,b){Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?t=bb:t=cb;return t.apply(null,arguments)},db=function(a,c){var b=Array.prototype.slice.call(arguments,1);return function(){var d=
b.slice();d.push.apply(d,arguments);return a.apply(this,d)}},u=Date.now||function(){return+new Date},w=function(a,c){a=a.split(".");var b=Ha;a[0]in b||"undefined"==typeof b.execScript||b.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)!a.length&&Ia(c)?b[d]=c:b[d]&&b[d]!==Object.prototype[d]?b=b[d]:b=b[d]={}},x=function(a,c){function b(){}b.prototype=c.prototype;a.Ca=c.prototype;a.prototype=new b;a.prototype.constructor=a;a.ez=function(d,e,f){for(var g=Array(arguments.length-2),k=2;k<arguments.length;k++)g[k-
2]=arguments[k];return c.prototype[e].apply(d,g)}};var chrome=chrome||window.chrome||{};chrome.cast=chrome.cast||{};chrome.cast.media=chrome.cast.media||{};var mojo={};var eb=function(){return Promise.reject(Error("Not implemented"))};var fb=function(a){this.b=a},hb=function(a){var c=gb.get(a);c||(c=new fb(a),gb.set(a,c));return c},kb=function(a){a.level>=ib&&jb.forEach(function(c){return c(a)})};fb.prototype.log=function(a,c,b){if(!(a<ib)){"function"==typeof c&&(c=c());c=c.replace(lb,"[Redacted URL]");c=c.replace(mb,"[Redacted domain/email]");c=c.replace(nb,function(e,f,g){return f+":<"+g.substr(-4)+">"});var d={O:this.b,level:a,time:Date.now(),message:c,zc:b};jb.forEach(function(e){return e(d)})}};
fb.prototype.error=function(a,c){this.log(3,a,c)};fb.prototype.G=function(a,c){this.log(2,a,c)};fb.prototype.info=function(a,c){this.log(1,a,c)};var ob=function(a,c,b){a.log(0,c,b)},qb=function(a){a=pb.indexOf(a);return-1==a?0:a},rb=function(a){return 600>=a?0:850>=a?1:950>=a?2:3},jb=[],gb=new Map,pb=["FINE","INFO","WARNING","SEVERE"],mb=/(([\w.+-]+@)|((www|m|mail|ftp)[.]))[\w.-]+[.][\w-]{2,4}/gi,lb=/(data:|https?:\/\/)\S+/gi,nb=/(dial|cast):<([a-zA-Z0-9]+)>/gi,ib=1;var sb=function(a){this.b=a;this.f=Date.now()},tb=function(a,c){null!=c&&(a+="_"+c);return a};sb.prototype.end=function(a){ub(tb(this.b,a),Date.now()-this.f)};var ub=function(a,c){0>c&&(vb.G("Timing analytics event with negative time"),c=0);1E4<c&&(c=1E4);try{chrome.metricsPrivate.recordTime(a,c)}catch(b){vb.G("Failed to record time "+c+" in "+a)}},vb=hb("mr.Timing"),wb=function(a){sb.call(this,a)};q(wb,sb);
wb.prototype.end=function(a){a=tb(this.b,a);var c=Date.now()-this.f;if(0>c)xb.G("Timing analytics event with negative time");else{1E4>c&&(c=1E4);18E4<c&&(c=18E4);try{chrome.metricsPrivate.recordMediumTime(a,c)}catch(b){xb.G("Failed to record time "+c+" in "+a)}}};var xb=hb("mr.MediumTiming"),yb=function(a){sb.call(this,a)};q(yb,sb);
yb.prototype.end=function(a){a=tb(this.b,a);var c=Date.now()-this.f;if(0>c)zb.G("Timing analytics event with negative time");else{18E4>c&&(c=18E4);36E5<c&&(c=36E5);try{chrome.metricsPrivate.recordLongTime(a,c)}catch(b){zb.G("Failed to record time "+c+" in "+a)}}};
var zb=hb("mr.LongTiming"),Ab=hb("mr.Analytics"),Bb=function(a){try{chrome.metricsPrivate.recordUserAction(a)}catch(c){Ab.G("Failed to record event "+a)}},Cb=function(a,c,b){var d,e=0,f;for(f in b)e++,b[f]==c&&(d=f);if(d){b={metricName:a,type:"histogram-linear",min:1,max:e,buckets:e+1};try{chrome.metricsPrivate.recordValue(b,c)}catch(g){Ab.G("Failed to record enum value "+d+" ("+c+") in "+a,g)}}else Ab.error("Unknown analytics value, "+c+" for histogram, "+a,Error())};var Db=function(){var a=this;this.b=new Promise(function(c,b){a.g=c;a.f=b})};Db.prototype.resolve=function(a){this.g(a)};Db.prototype.reject=function(a){this.f(a)};var Eb=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,Eb);else{var c=Error().stack;c&&(this.stack=c)}a&&(this.message=String(a))};x(Eb,Error);Eb.prototype.name="CustomError";var Fb;var Gb=function(a,c){a=a.split("%s");for(var b="",d=a.length-1,e=0;e<d;e++)b+=a[e]+(e<c.length?c[e]:"%s");Eb.call(this,b+a[d])};x(Gb,Eb);Gb.prototype.name="AssertionError";var Hb=function(a,c){throw new Gb("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));};var Ib=function(a){return a[a.length-1]},Jb=Array.prototype.indexOf?function(a,c){return Array.prototype.indexOf.call(a,c,void 0)}:function(a,c){if(Ja(a))return Ja(c)&&1==c.length?a.indexOf(c,0):-1;for(var b=0;b<a.length;b++)if(b in a&&a[b]===c)return b;return-1},Kb=Array.prototype.lastIndexOf?function(a,c){return Array.prototype.lastIndexOf.call(a,c,a.length-1)}:function(a,c){var b=a.length-1;0>b&&(b=Math.max(0,a.length+b));if(Ja(a))return Ja(c)&&1==c.length?a.lastIndexOf(c,b):-1;for(;0<=b;b--)if(b in
a&&a[b]===c)return b;return-1},y=Array.prototype.forEach?function(a,c,b){Array.prototype.forEach.call(a,c,b)}:function(a,c,b){for(var d=a.length,e=Ja(a)?a.split(""):a,f=0;f<d;f++)f in e&&c.call(b,e[f],f,a)},Lb=function(a,c){for(var b=Ja(a)?a.split(""):a,d=a.length-1;0<=d;--d)d in b&&c.call(void 0,b[d],d,a)},Mb=Array.prototype.filter?function(a,c,b){return Array.prototype.filter.call(a,c,b)}:function(a,c,b){for(var d=a.length,e=[],f=0,g=Ja(a)?a.split(""):a,k=0;k<d;k++)if(k in g){var m=g[k];c.call(b,
m,k,a)&&(e[f++]=m)}return e},Nb=Array.prototype.map?function(a,c,b){return Array.prototype.map.call(a,c,b)}:function(a,c,b){for(var d=a.length,e=Array(d),f=Ja(a)?a.split(""):a,g=0;g<d;g++)g in f&&(e[g]=c.call(b,f[g],g,a));return e},Ob=Array.prototype.reduce?function(a,c,b){return Array.prototype.reduce.call(a,c,b)}:function(a,c,b){var d=b;y(a,function(e,f){d=c.call(void 0,d,e,f,a)});return d},Pb=Array.prototype.some?function(a,c){return Array.prototype.some.call(a,c,void 0)}:function(a,c){for(var b=
a.length,d=Ja(a)?a.split(""):a,e=0;e<b;e++)if(e in d&&c.call(void 0,d[e],e,a))return!0;return!1},Qb=Array.prototype.every?function(a,c,b){return Array.prototype.every.call(a,c,b)}:function(a,c,b){for(var d=a.length,e=Ja(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&!c.call(b,e[f],f,a))return!1;return!0},Sb=function(a,c,b){c=Rb(a,c,b);return 0>c?null:Ja(a)?a.charAt(c):a[c]},Rb=function(a,c,b){for(var d=a.length,e=Ja(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&c.call(b,e[f],f,a))return f;return-1},Tb=function(a,
c){a:{for(var b=Ja(a)?a.split(""):a,d=a.length-1;0<=d;d--)if(d in b&&c.call(void 0,b[d],d,a)){c=d;break a}c=-1}return 0>c?null:Ja(a)?a.charAt(c):a[c]},Ub=function(a,c){return 0<=Jb(a,c)},Vb=function(a){return 0==a.length},Wb=function(a){if(!Va(a))for(var c=a.length-1;0<=c;c--)delete a[c];a.length=0},Xb=function(a,c){Ub(a,c)||a.push(c)},Zb=function(a,c,b){var d;2==arguments.length||0>(d=Jb(a,b))?a.push(c):Yb(a,d,0,c)},ac=function(a,c){c=Jb(a,c);var b;(b=0<=c)&&$b(a,c);return b},$b=function(a,c){return 1==
Array.prototype.splice.call(a,c,1).length},bc=function(a,c,b){c=Rb(a,c,b);return 0<=c?($b(a,c),!0):!1},cc=function(a,c){var b=0;Lb(a,function(d,e){c.call(void 0,d,e,a)&&$b(a,e)&&b++})},dc=function(a){return Array.prototype.concat.apply([],arguments)},ec=function(a){return Array.prototype.concat.apply([],arguments)},z=function(a){var c=a.length;if(0<c){for(var b=Array(c),d=0;d<c;d++)b[d]=a[d];return b}return[]},fc=function(a,c){for(var b=1;b<arguments.length;b++){var d=arguments[b];if(Wa(d)){var e=
a.length||0,f=d.length||0;a.length=e+f;for(var g=0;g<f;g++)a[e+g]=d[g]}else a.push(d)}},Yb=function(a,c,b,d){Array.prototype.splice.apply(a,gc(arguments,1))},gc=function(a,c,b){return 2>=arguments.length?Array.prototype.slice.call(a,c):Array.prototype.slice.call(a,c,b)},hc=function(a,c){c=c||a;for(var b={},d=0,e=0;e<a.length;){var f=a[e++];var g=f;g=Ya(g)?"o"+(g[Za]||(g[Za]=++ab)):(typeof g).charAt(0)+g;Object.prototype.hasOwnProperty.call(b,g)||(b[g]=!0,c[d++]=f)}c.length=d},jc=function(a,c){a.sort(c||
ic)},kc=function(a,c){var b=ic;jc(a,function(d,e){return b(c(d),c(e))})},lc=function(a){kc(a,function(c){return c.t})},nc=function(a,c,b){if(!Wa(a)||!Wa(c)||a.length!=c.length)return!1;var d=a.length;b=b||mc;for(var e=0;e<d;e++)if(!b(a[e],c[e]))return!1;return!0},ic=function(a,c){return a>c?1:a<c?-1:0},mc=function(a,c){return a===c},oc=function(a,c){var b={};y(a,function(d,e){b[c.call(void 0,d,e,a)]=d});return b},pc=function(a,c){return dc.apply([],Nb(a,c,void 0))};var qc=function(a,c){var b=(b=a&&a.ownerDocument)&&(b.defaultView||b.parentWindow)||Ha;if("undefined"!=typeof b[c]&&"undefined"!=typeof b.Location&&"undefined"!=typeof b.Element&&(!a||!(a instanceof b[c])&&(a instanceof b.Location||a instanceof b.Element))){if(Ya(a))try{var d=a.constructor.displayName||a.constructor.name||Object.prototype.toString.call(a)}catch(e){d="<object could not be stringified>"}else d=void 0===a?"undefined":null===a?"null":typeof a;Hb("Argument is not a %s (or a non-Element, non-Location mock); got: %s",
c,d)}};var rc=function(a){return function(){return a}},sc=function(){return!0},tc=function(){return null},uc=function(a){return a},vc=function(a){return function(){throw Error(a);}},wc=function(a){var c=c||0;return function(){return a.apply(this,Array.prototype.slice.call(arguments,0,c))}};var xc=function(a,c,b){for(var d in a)c.call(b,a[d],d,a)},yc=function(a,c){var b={},d;for(d in a)b[d]=c.call(void 0,a[d],d,a);return b},Bc=function(a,c){for(var b in a)if(c.call(void 0,a[b],b,a))return!0;return!1},Cc=function(a){var c=0,b;for(b in a)c++;return c},Dc=function(a){for(var c in a)return c},Ec=function(a){var c=[],b=0,d;for(d in a)c[b++]=a[d];return c},Fc=function(a){var c=[],b=0,d;for(d in a)c[b++]=d;return c},Gc=function(a,c){return null!==a&&c in a},Hc=function(a,c){for(var b in a)if(a[b]==
c)return!0;return!1},Ic=function(a){for(var c in a)return!1;return!0},Jc=function(a){for(var c in a)delete a[c]},Kc=function(a){var c={},b;for(b in a)c[b]=a[b];return c},Lc=function(a){var c=Sa(a);if("object"==c||"array"==c){if(Xa(a.clone))return a.clone();c="array"==c?[]:{};for(var b in a)c[b]=Lc(a[b]);return c}return a},Mc=function(a){var c={},b;for(b in a)c[a[b]]=b;return c},Nc="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" "),Oc=function(a,
c){for(var b,d,e=1;e<arguments.length;e++){d=arguments[e];for(b in d)a[b]=d[b];for(var f=0;f<Nc.length;f++)b=Nc[f],Object.prototype.hasOwnProperty.call(d,b)&&(a[b]=d[b])}},Pc=function(a){var c=arguments.length;if(1==c&&Va(arguments[0]))return Pc.apply(null,arguments[0]);for(var b={},d=0;d<c;d++)b[arguments[d]]=!0;return b};var Tc=function(a,c){this.b=a===Qc&&c||"";this.f=Rc};Tc.prototype.wd=!0;Tc.prototype.sd=function(){return this.b};Tc.prototype.toString=function(){return"Const{"+this.b+"}"};var Uc=function(a){if(a instanceof Tc&&a.constructor===Tc&&a.f===Rc)return a.b;Hb("expected object of type Const, got '"+a+"'");return"type_error:Const"},Rc={},Qc={},Vc=new Tc(Qc,"");var Xc=function(){this.b=Wc};Xc.prototype.wd=!0;var Wc={};Xc.prototype.sd=function(){return"".toString()};Xc.prototype.toString=function(){return"SafeScript{}"};var Yc=function(a){if(a instanceof Xc&&a.constructor===Xc&&a.b===Wc)return"";Hb("expected object of type SafeScript, got '"+a+"' of type "+Sa(a));return"type_error:SafeScript"};var Zc=/[A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0900-\u1fff\u200e\u2c00-\ud801\ud804-\ud839\ud83c-\udbff\uf900-\ufb1c\ufe00-\ufe6f\ufefd-\uffff]/,$c=/^[^A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0900-\u1fff\u200e\u2c00-\ud801\ud804-\ud839\ud83c-\udbff\uf900-\ufb1c\ufe00-\ufe6f\ufefd-\uffff]*[\u0591-\u06ef\u06fa-\u08ff\u200f\ud802-\ud803\ud83a-\ud83b\ufb1d-\ufdff\ufe70-\ufefc]/,ad=/^http:\/\/.*/,bd=/\s+/,cd=/[\d\u06f0-\u06f9]/;var ed=function(){this.b="";this.f=dd};ed.prototype.wd=!0;ed.prototype.sd=function(){return this.b.toString()};ed.prototype.toString=function(){return"TrustedResourceUrl{"+this.b+"}"};var fd=function(a){if(a instanceof ed&&a.constructor===ed&&a.f===dd)return a.b;Hb("expected object of type TrustedResourceUrl, got '"+a+"' of type "+Sa(a));return"type_error:TrustedResourceUrl"},dd={},gd=function(a){var c=new ed;c.b=a;return c};var hd=function(a,c){return 0==a.lastIndexOf(c,0)},id=function(a,c){return a.toLowerCase()==c.toLowerCase()},jd=function(a){return/^[\s\xa0]*$/.test(a)},kd=String.prototype.trim?function(a){return a.trim()}:function(a){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]},ld=function(a,c){a=String(a).toLowerCase();c=String(c).toLowerCase();return a<c?-1:a==c?0:1},nd=/&/g,od=/</g,pd=/>/g,qd=/"/g,rd=/'/g,sd=/\x00/g,td=/[\x00&<>"']/,vd=function(a,c){var b=0;a=kd(String(a)).split(".");c=kd(String(c)).split(".");
for(var d=Math.max(a.length,c.length),e=0;0==b&&e<d;e++){var f=a[e]||"",g=c[e]||"";do{f=/(\d*)(\D*)(.*)/.exec(f)||["","","",""];g=/(\d*)(\D*)(.*)/.exec(g)||["","","",""];if(0==f[0].length&&0==g[0].length)break;b=ud(0==f[1].length?0:parseInt(f[1],10),0==g[1].length?0:parseInt(g[1],10))||ud(0==f[2].length,0==g[2].length)||ud(f[2],g[2]);f=f[3];g=g[3]}while(0==b)}return b},ud=function(a,c){return a<c?-1:a>c?1:0};var xd=function(){this.b="";this.f=wd};xd.prototype.wd=!0;xd.prototype.sd=function(){return this.b.toString()};xd.prototype.toString=function(){return"SafeUrl{"+this.b+"}"};
var yd=function(a){if(a instanceof xd&&a.constructor===xd&&a.f===wd)return a.b;Hb("expected object of type SafeUrl, got '"+a+"' of type "+Sa(a));return"type_error:SafeUrl"},zd=/^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i,Bd=function(a){if(a instanceof xd)return a;a="object"==typeof a&&a.wd?a.sd():String(a);zd.test(a)||(a="about:invalid#zClosurez");return Ad(a)},wd={},Ad=function(a){var c=new xd;c.b=a;return c};Ad("about:blank");var Dd=function(){this.b="";this.f=Cd};Dd.prototype.wd=!0;var Cd={};Dd.prototype.sd=function(){return this.b};Dd.prototype.toString=function(){return"SafeStyle{"+this.b+"}"};
var Ed=function(a){if(a instanceof Dd&&a.constructor===Dd&&a.f===Cd)return a.b;Hb("expected object of type SafeStyle, got '"+a+"' of type "+Sa(a));return"type_error:SafeStyle"},Fd=function(a){var c=new Dd;c.b=a;return c},Gd=Fd(""),Id=function(a){if(a instanceof xd)return'url("'+yd(a).toString().replace(/</g,"%3c").replace(/[\\"]/g,"\\$&")+'")';a=a instanceof Tc?Uc(a):Hd(String(a));if(/[{;}]/.test(a))throw new Gb("Value does not allow [{;}], got: %s.",[a]);return a},Hd=function(a){var c=a.replace(Jd,
"$1").replace(Jd,"$1").replace(Kd,"url");if(Ld.test(c)){if(Md.test(a))return Hb("String value disallows comments, got: "+a),"zClosurez";for(var b=c=!0,d=0;d<a.length;d++){var e=a.charAt(d);"'"==e&&b?c=!c:'"'==e&&c&&(b=!b)}if(!c||!b)return Hb("String value requires balanced quotes, got: "+a),"zClosurez";if(!Nd(a))return Hb("String value requires balanced square brackets and one identifier per pair of brackets, got: "+a),"zClosurez"}else return Hb("String value allows only [-,.\"'%_!# a-zA-Z0-9\\[\\]] and simple functions, got: "+
a),"zClosurez";return Od(a)},Nd=function(a){for(var c=!0,b=/^[-_a-zA-Z0-9]$/,d=0;d<a.length;d++){var e=a.charAt(d);if("]"==e){if(c)return!1;c=!0}else if("["==e){if(!c)return!1;c=!1}else if(!c&&!b.test(e))return!1}return c},Ld=/^[-,."'%_!# a-zA-Z0-9\[\]]+$/,Kd=/\b(url\([ \t\n]*)('[ -&(-\[\]-~]*'|"[ !#-\[\]-~]*"|[!#-&*-\[\]-~]*)([ \t\n]*\))/g,Jd=/\b(hsl|hsla|rgb|rgba|matrix|calc|minmax|fit-content|repeat|(rotate|scale|translate)(X|Y|Z|3d)?)\([-+*/0-9a-z.%\[\], ]+\)/g,Md=/\/\*/,Od=function(a){return a.replace(Kd,
function(c,b,d,e){var f="";d=d.replace(/^(['"])(.*)\1$/,function(g,k,m){f=k;return m});c=Bd(d).sd();return b+f+c+f+e})};var Qd=function(){this.b="";this.f=Pd};Qd.prototype.wd=!0;
var Pd={},Sd=function(a,c){if(-1!=a.indexOf("<"))throw Error("Selector does not allow '<', got: "+a);var b=a.replace(/('|")((?!\1)[^\r\n\f\\]|\\[\s\S])*\1/g,"");if(!/^[-_a-zA-Z0-9#.:* ,>+~[\]()=^$|]+$/.test(b))throw Error("Selector allows only [-_a-zA-Z0-9#.:* ,>+~[\\]()=^$|] and strings, got: "+a);a:{for(var d={"(":")","[":"]"},e=[],f=0;f<b.length;f++){var g=b[f];if(d[g])e.push(d[g]);else if(Hc(d,g)&&e.pop()!=g){b=!1;break a}}b=0==e.length}if(!b)throw Error("() and [] in selector must be balanced, got: "+a);
if(!(c instanceof Dd)){b="";for(var k in c){if(!/^[-_a-zA-Z0-9]+$/.test(k))throw Error("Name allows only [-_a-zA-Z0-9], got: "+k);d=c[k];null!=d&&(d=Va(d)?Nb(d,Id).join(" "):Id(d),b+=k+":"+d+";")}c=b?Fd(b):Gd}a=a+"{"+Ed(c).replace(/</g,"\\3C ")+"}";return Rd(a)},Ud=function(a){var c="",b=function(d){Va(d)?y(d,b):c+=Td(d)};y(arguments,b);return Rd(c)};Qd.prototype.sd=function(){return this.b};Qd.prototype.toString=function(){return"SafeStyleSheet{"+this.b+"}"};
var Td=function(a){if(a instanceof Qd&&a.constructor===Qd&&a.f===Pd)return a.b;Hb("expected object of type SafeStyleSheet, got '"+a+"' of type "+Sa(a));return"type_error:SafeStyleSheet"},Rd=function(a){var c=new Qd;c.b=a;return c},Vd=Rd("");var Wd;a:{var Xd=Ha.navigator;if(Xd){var Yd=Xd.userAgent;if(Yd){Wd=Yd;break a}}Wd=""}var Zd=function(a){return-1!=Wd.indexOf(a)};var $d=function(){return Zd("Firefox")||Zd("FxiOS")},ae=function(){return(Zd("Chrome")||Zd("CriOS"))&&!Zd("Edge")};var ce=function(){this.b="";this.f=be;this.kg=null};ce.prototype.wd=!0;ce.prototype.sd=function(){return this.b.toString()};ce.prototype.toString=function(){return"SafeHtml{"+this.b+"}"};var de=function(a){if(a instanceof ce&&a.constructor===ce&&a.f===be)return a.b;Hb("expected object of type SafeHtml, got '"+a+"' of type "+Sa(a));return"type_error:SafeHtml"},be={},ee=function(a,c){var b=new ce;b.b=a;b.kg=c;return b};ee("<!DOCTYPE html>",0);var fe=ee("",0);ee("<br>",0);var ge={MATH:!0,SCRIPT:!0,STYLE:!0,SVG:!0,TEMPLATE:!0},he=function(a){var c=!1,b;return function(){c||(b=a(),c=!0);return b}}(function(){if("undefined"===typeof document)return!1;var a=document.createElement("div"),c=document.createElement("div");c.appendChild(document.createElement("div"));a.appendChild(c);if(!a.firstChild)return!1;c=a.firstChild.firstChild;a.innerHTML=de(fe);return!c.parentElement}),ie=function(a,c){if(he())for(;a.lastChild;)a.removeChild(a.lastChild);a.innerHTML=de(c)},je=function(a,
c){if(ge[a.tagName.toUpperCase()])throw Error("goog.dom.safe.setInnerHtml cannot be used to set content of "+a.tagName+".");ie(a,c)},ke=function(a){var c=gd(Uc(Vc));qc(a,"HTMLIFrameElement");a.src=fd(c).toString()},me=function(a,c){qc(a,"HTMLScriptElement");a.src=fd(c);(c=Na())&&a.setAttribute("nonce",c)};var ne=String.prototype.repeat?function(a,c){return a.repeat(c)}:function(a,c){return Array(c+1).join(a)},oe=function(a,c){a=Ia(void 0)?a.toFixed(void 0):String(a);var b=a.indexOf(".");-1==b&&(b=a.length);return ne("0",Math.max(0,c-b))+a},pe=function(a){return null==a?"":String(a)},qe=function(a){return Array.prototype.join.call(arguments,"")},re=function(){return Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^u()).toString(36)},se=function(a,c,b){a=
a.split(c);for(var d=[];0<b&&a.length;)d.push(a.shift()),b--;a.length&&d.push(a.join(c));return d};var te=function(){return Zd("iPhone")&&!Zd("iPod")&&!Zd("iPad")};var ue=function(a){ue[" "](a);return a};ue[" "]=Qa;var ve=function(a,c){try{return ue(a[c]),!0}catch(b){}return!1},xe=function(a,c){var b=we;return Object.prototype.hasOwnProperty.call(b,a)?b[a]:b[a]=c(a)};var ye=function(){return Ha.navigator||null},ze=Zd("Opera"),Ae=Zd("Trident")||Zd("MSIE"),Be=Zd("Edge"),Ce=Zd("Gecko")&&!(-1!=Wd.toLowerCase().indexOf("webkit")&&!Zd("Edge"))&&!(Zd("Trident")||Zd("MSIE"))&&!Zd("Edge"),De=-1!=Wd.toLowerCase().indexOf("webkit")&&!Zd("Edge"),Ee=De&&Zd("Mobile"),Fe,Ge=ye();Fe=Ge&&Ge.platform||"";
var He=Zd("Macintosh"),Ie=Zd("Windows"),Je=Zd("Linux")||Zd("CrOS"),Ke=Zd("Android"),Le=te(),Me=Zd("iPad"),Ne=Zd("iPod"),Oe=function(){var a=Ha.document;return a?a.documentMode:void 0},Pe;
a:{var Qe="",Re=function(){var a=Wd;if(Ce)return/rv:([^\);]+)(\)|;)/.exec(a);if(Be)return/Edge\/([\d\.]+)/.exec(a);if(Ae)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(De)return/WebKit\/(\S+)/.exec(a);if(ze)return/(?:Version)[ \/]?(\S+)/.exec(a)}();Re&&(Qe=Re?Re[1]:"");if(Ae){var Se=Oe();if(null!=Se&&Se>parseFloat(Qe)){Pe=String(Se);break a}}Pe=Qe}var Te=Pe,we={},Ue=function(a){return xe(a,function(){return 0<=vd(Te,a)})},Ve;var We=Ha.document;
Ve=We&&Ae?Oe()||("CSS1Compat"==We.compatMode?parseInt(Te,10):5):void 0;var Xe=$d(),Ye=te()||Zd("iPod"),Ze=Zd("iPad"),$e=Zd("Android")&&!(ae()||$d()||Zd("Opera")||Zd("Silk")),af=ae(),bf=Zd("Safari")&&!(ae()||Zd("Coast")||Zd("Opera")||Zd("Edge")||$d()||Zd("Silk")||Zd("Android"))&&!(te()||Zd("iPad")||Zd("iPod"));var cf=function(a,c){return a+Math.random()*(c-a)};var df=function(a,c,b){this.o=a;this.g=c;this.m=b;this.j=0;this.h=!1;this.b=this.f=null};df.prototype.start=function(){if(null!=this.b)throw Error("Cannot call Retry.start more than once.");this.b=new Db;this.w();return this.b.b};df.prototype.w=function(){var a=this;this.f=null;this.h||(this.j++,this.o().then(function(c){ef(a);a.b.resolve(c)},function(c){a.j>=a.m?(ef(a),a.b.reject(c)):(a.f=setTimeout(a.w.bind(a),a.g),a.g*=2)}))};
df.prototype.abort=function(a){ef(this);this.b.reject(void 0===a?Error("abort"):a)};var ef=function(a){null!=a.f&&(clearTimeout(a.f),a.f=null);a.h=!0};var ff=function(a,c){this.g=a;this.h=c;this.b=0;this.f=[]};ff.prototype.send=function(a,c,b,d){var e=void 0===d?{}:d;d=void 0===e.timeoutMillis?this.h:e.timeoutMillis;var f=void 0===e.Il?1:e.Il,g=void 0===e.headers?null:e.headers;e=void 0===e.responseType?"":e.responseType;a={vb:new Db,url:a,method:c,headers:g,responseType:e,body:b,timeoutMillis:d,Jl:f};this.b<this.g?gf(this,a):this.f.push(a);return a.vb.b};
var hf=function(a){if(0<a.f.length&&a.b<a.g){var c=a.f.shift();gf(a,c)}},gf=function(a,c){a.b++;c.Jl--;jf(c).then(function(b){c.vb.resolve(b);a.b--;hf(a)},function(b){0==c.Jl?c.vb.reject(b):a.f.push(c);a.b--;hf(a)})},jf=function(a){return new Promise(function(c,b){var d=new XMLHttpRequest;d.onreadystatechange=function(){d.readyState==XMLHttpRequest.DONE&&c(d)};d.timeout=a.timeoutMillis;d.ontimeout=function(){b(Error("Timed out"))};d.open(a.method,a.url,!0);null==a.headers?d.setRequestHeader("Content-Type",
"application/x-www-form-urlencoded;charset=utf-8"):a.headers.forEach(function(e){return d.setRequestHeader(e[0],e[1])});d.responseType=a.responseType;d.send(a.body)})};var lf=function(a,c,b){null==kf&&(kf=new ff(1,3E5));var d="https://crash.corp.google.com/samples?reportid=&q="+encodeURIComponent("UserComments='"+c+"'"),e="http://"+a+":8008/setup/send_log_report";kf.send(e,"POST",JSON.stringify({uuid:c}),{headers:[["Content-Type","application/json"]]}).then(function(f){200==f.status?b("ok",d):b("error","Unable to POST to "+e+", "+("error = "+f.status))},function(f){b("error",String(f))});return d},of=function(a){var c=new mf;if("string"!==typeof a)return Promise.resolve(c);
null==nf&&(nf=new ff(1,3E3));return nf.send("http://"+a+":8008/setup/eureka_info","GET",void 0,{responseType:"text"}).then(function(b){b=JSON.parse(b.responseText);"cast_build_revision"in b?c.b=String(b.cast_build_revision):"build_version"in b&&(c.b=String(b.build_version));"connected"in b&&(c.h="true"==String(b.connected));"ethernet_connected"in b&&(c.f="true"==String(b.ethernet_connected));"has_update"in b&&(c.g="true"==String(b.has_update));"uptime"in b&&(b=Number(b.uptime),Number.isFinite(b)&&
(c.j=b))}).catch(function(b){hb("mr.DongleUtils").G("Unable to fetch/parse setup info.",b)}).then(function(){return c})},mf=function(){this.j=this.g=this.f=this.h=this.b=null},kf=null,nf=null;var pf=function(a,c,b){this.source=a;this.type=c;this.message=b};var qf=function(a){var c=[],b=[],d={},e=function(f,g){var k=g+"  ";try{if(Ia(f))if(null===f)c.push("NULL");else if(Ja(f))c.push('"'+f.replace(/\n/g,"\n"+g)+'"');else if(Xa(f))c.push(String(f).replace(/\n/g,"\n"+g));else if(Ya(f)){f[Za]||b.push(f);var m=f[Za]||(f[Za]=++ab);if(d[m])c.push("*** reference loop detected (id="+m+") ***");else{d[m]=!0;c.push("{");for(var p in f)Xa(f[p])||(c.push("\n"),c.push(k),c.push(p+" = "),e(f[p],k));c.push("\n"+g+"}");delete d[m]}}else c.push(f);else c.push("undefined")}catch(v){c.push("*** "+
v+" ***")}};e(a,"");for(a=0;a<b.length;a++)$a(b[a]);return c.join("")},rf=function(a){var c=rf;var b=Error();if(Error.captureStackTrace)Error.captureStackTrace(b,c),c=String(b.stack);else{try{throw b;}catch(e){b=e}c=(c=b.stack)?String(c):null}if(c)return c;c=[];b=arguments.callee.caller;for(var d=0;b&&(!a||d<a);){c.push(sf(b));c.push("()\n");try{b=b.caller}catch(e){c.push("[exception trying to get caller]\n");break}d++;if(50<=d){c.push("[...long stack...]");break}}a&&d>=a?c.push("[...reached max depth limit...]"):
c.push("[end]");return c.join("")},sf=function(a){if(tf[a])return tf[a];a=String(a);if(!tf[a]){var c=/function\s+([^\(]+)/m.exec(a);tf[a]=c?c[1]:"[Anonymous]"}return tf[a]},tf={},uf=Object.freeze||function(a){return a};var vf=function(a,c,b){this.reset(a,c,b,void 0,void 0)};vf.prototype.b=null;var wf=0;vf.prototype.reset=function(a,c,b,d,e){"number"==typeof e||wf++;this.j=d||u();this.f=a;this.h=c;this.g=b;delete this.b};vf.prototype.getMessage=function(){return this.h};var xf=function(a){this.j=a;this.b=this.h=this.f=this.g=null},yf=function(a,c){this.name=a;this.value=c};yf.prototype.toString=function(){return this.name};var zf=new yf("SEVERE",1E3),Af=new yf("WARNING",900),Bf=new yf("INFO",800),Cf=new yf("CONFIG",700),Df=new yf("FINE",500),Ef=new yf("FINER",400),Ff=new yf("ALL",0);xf.prototype.getName=function(){return this.j};xf.prototype.getChildren=function(){this.h||(this.h={});return this.h};
var Gf=function(a){if(a.f)return a.f;if(a.g)return Gf(a.g);Hb("Root logger has no level set.");return null};h=xf.prototype;h.log=function(a,c,b){a.value>=Gf(this).value&&(Xa(c)&&(c=c()),a=new vf(a,String(c),this.j),b&&(a.b=b),Hf(this,a))};h.G=function(a,c){this.log(Af,a,c)};h.info=function(a,c){this.log(Bf,a,c)};h.config=function(a,c){this.log(Cf,a,c)};h.logRecord=function(a){a.f.value>=Gf(this).value&&Hf(this,a)};
var Hf=function(a,c){for(;a;){var b,d=a,e=c;if(d.b)for(var f=0;b=d.b[f];f++)b(e);a=a.g}},If={},Jf=null,Kf=function(){Jf||(Jf=new xf(""),If[""]=Jf,Jf.f=Cf)},Lf=function(a){Kf();var c;if(!(c=If[a])){c=new xf(a);var b=a.lastIndexOf("."),d=a.substr(b+1);b=Lf(a.substr(0,b));b.getChildren()[d]=c;c.g=b;If[a]=c}return c};var Mf=function(a,c,b,d){a&&a.log(c,b,d)},Nf=function(a,c,b){a&&a.log(zf,c,b)},B=function(a,c,b){a&&a.G(c,b)},C=function(a,c){a&&a.info(c,void 0)},Of=function(a,c){a&&a.log(Df,c,void 0)};var Pf=!Ce&&!Ae||Ae&&9<=Number(Ve)||Ce&&Ue("1.9.1");var Qf=function(a,c){this.width=a;this.height=c};h=Qf.prototype;h.clone=function(){return new Qf(this.width,this.height)};h.toString=function(){return"("+this.width+" x "+this.height+")"};h.aspectRatio=function(){return this.width/this.height};h.Nb=function(){return!(this.width*this.height)};h.ceil=function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};h.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};
h.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};var Rf={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",nonce:"nonce",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"},Sf=function(a){a=a.document;a="CSS1Compat"==a.compatMode?a.documentElement:a.body;return new Qf(a.clientWidth,a.clientHeight)},Tf=function(a){return a?a.parentWindow||a.defaultView:window},Uf=function(a){for(var c;c=a.firstChild;)a.removeChild(c)},Vf=function(a){return a&&
a.parentNode?a.parentNode.removeChild(a):null},Wf=function(a){return 9==a.nodeType?a:a.ownerDocument||a.document},Xf=function(a,c){if("textContent"in a)a.textContent=c;else if(3==a.nodeType)a.data=String(c);else if(a.firstChild&&3==a.firstChild.nodeType){for(;a.lastChild!=a.firstChild;)a.removeChild(a.lastChild);a.firstChild.data=String(c)}else Uf(a),a.appendChild(Wf(a).createTextNode(String(c)))},Yf=function(a){this.b=a||Ha.document||document};h=Yf.prototype;
h.setProperties=function(a,c){xc(c,function(b,d){b&&"object"==typeof b&&b.wd&&(b=b.sd());"style"==d?a.style.cssText=b:"class"==d?a.className=b:"for"==d?a.htmlFor=b:Rf.hasOwnProperty(d)?a.setAttribute(Rf[d],b):hd(d,"aria-")||hd(d,"data-")?a.setAttribute(d,b):a[d]=b})};h.appendChild=function(a,c){a.appendChild(c)};h.pp=Vf;h.getChildren=function(a){return Pf&&void 0!=a.children?a.children:Mb(a.childNodes,function(c){return 1==c.nodeType})};h.isElement=function(a){return Ya(a)&&1==a.nodeType};
h.contains=function(a,c){if(!a||!c)return!1;if(a.contains&&1==c.nodeType)return a==c||a.contains(c);if("undefined"!=typeof a.compareDocumentPosition)return a==c||!!(a.compareDocumentPosition(c)&16);for(;c&&a!=c;)c=c.parentNode;return c==a};var Zf=function(a){this.b="number"==typeof a?0<a?1:0>a?-1:null:null==a?null:a?-1:1};
