/*
 AngularJS v1.2.16
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(O,U,s){'use strict';function t(b){return function(){var a=arguments[0],c,a="["+(b?b+":":"")+a+"] http://errors.angularjs.org/1.2.16/"+(b?b+"/":"")+a;for(c=1;c<arguments.length;c++)a=a+(1==c?"?":"&")+"p"+(c-1)+"="+encodeURIComponent("function"==typeof arguments[c]?arguments[c].toString().replace(/ \{[\s\S]*$/,""):"undefined"==typeof arguments[c]?"undefined":"string"!=typeof arguments[c]?JSON.stringify(arguments[c]):arguments[c]);return Error(a)}}function ab(b){if(null==b||Ca(b))return!1;
var a=b.length;return 1===b.nodeType&&a?!0:w(b)||M(b)||0===a||"number"===typeof a&&0<a&&a-1 in b}function q(b,a,c){var d;if(b)if(P(b))for(d in b)"prototype"==d||("length"==d||"name"==d||b.hasOwnProperty&&!b.hasOwnProperty(d))||a.call(c,b[d],d);else if(b.forEach&&b.forEach!==q)b.forEach(a,c);else if(ab(b))for(d=0;d<b.length;d++)a.call(c,b[d],d);else for(d in b)b.hasOwnProperty(d)&&a.call(c,b[d],d);return b}function Qb(b){var a=[],c;for(c in b)b.hasOwnProperty(c)&&a.push(c);return a.sort()}function Sc(b,
a,c){for(var d=Qb(b),e=0;e<d.length;e++)a.call(c,b[d[e]],d[e]);return d}function Rb(b){return function(a,c){b(c,a)}}function bb(){for(var b=ka.length,a;b;){b--;a=ka[b].charCodeAt(0);if(57==a)return ka[b]="A",ka.join("");if(90==a)ka[b]="0";else return ka[b]=String.fromCharCode(a+1),ka.join("")}ka.unshift("0");return ka.join("")}function Sb(b,a){a?b.$$hashKey=a:delete b.$$hashKey}function D(b){var a=b.$$hashKey;q(arguments,function(a){a!==b&&q(a,function(a,c){b[c]=a})});Sb(b,a);return b}function Y(b){return parseInt(b,
10)}function Tb(b,a){return D(new (D(function(){},{prototype:b})),a)}function C(){}function Da(b){return b}function aa(b){return function(){return b}}function E(b){return"undefined"===typeof b}function B(b){return"undefined"!==typeof b}function X(b){return null!=b&&"object"===typeof b}function w(b){return"string"===typeof b}function vb(b){return"number"===typeof b}function Na(b){return"[object Date]"===wa.call(b)}function M(b){return"[object Array]"===wa.call(b)}function P(b){return"function"===typeof b}
function cb(b){return"[object RegExp]"===wa.call(b)}function Ca(b){return b&&b.document&&b.location&&b.alert&&b.setInterval}function Tc(b){return!(!b||!(b.nodeName||b.prop&&b.attr&&b.find))}function Uc(b,a,c){var d=[];q(b,function(b,g,f){d.push(a.call(c,b,g,f))});return d}function db(b,a){if(b.indexOf)return b.indexOf(a);for(var c=0;c<b.length;c++)if(a===b[c])return c;return-1}function Oa(b,a){var c=db(b,a);0<=c&&b.splice(c,1);return a}function ba(b,a){if(Ca(b)||b&&b.$evalAsync&&b.$watch)throw Pa("cpws");
if(a){if(b===a)throw Pa("cpi");if(M(b))for(var c=a.length=0;c<b.length;c++)a.push(ba(b[c]));else{c=a.$$hashKey;q(a,function(b,c){delete a[c]});for(var d in b)a[d]=ba(b[d]);Sb(a,c)}}else(a=b)&&(M(b)?a=ba(b,[]):Na(b)?a=new Date(b.getTime()):cb(b)?a=RegExp(b.source):X(b)&&(a=ba(b,{})));return a}function Ub(b,a){a=a||{};for(var c in b)!b.hasOwnProperty(c)||"$"===c.charAt(0)&&"$"===c.charAt(1)||(a[c]=b[c]);return a}function xa(b,a){if(b===a)return!0;if(null===b||null===a)return!1;if(b!==b&&a!==a)return!0;
var c=typeof b,d;if(c==typeof a&&"object"==c)if(M(b)){if(!M(a))return!1;if((c=b.length)==a.length){for(d=0;d<c;d++)if(!xa(b[d],a[d]))return!1;return!0}}else{if(Na(b))return Na(a)&&b.getTime()==a.getTime();if(cb(b)&&cb(a))return b.toString()==a.toString();if(b&&b.$evalAsync&&b.$watch||a&&a.$evalAsync&&a.$watch||Ca(b)||Ca(a)||M(a))return!1;c={};for(d in b)if("$"!==d.charAt(0)&&!P(b[d])){if(!xa(b[d],a[d]))return!1;c[d]=!0}for(d in a)if(!c.hasOwnProperty(d)&&"$"!==d.charAt(0)&&a[d]!==s&&!P(a[d]))return!1;
return!0}return!1}function Vb(){return U.securityPolicy&&U.securityPolicy.isActive||U.querySelector&&!(!U.querySelector("[ng-csp]")&&!U.querySelector("[data-ng-csp]"))}function eb(b,a){var c=2<arguments.length?ya.call(arguments,2):[];return!P(a)||a instanceof RegExp?a:c.length?function(){return arguments.length?a.apply(b,c.concat(ya.call(arguments,0))):a.apply(b,c)}:function(){return arguments.length?a.apply(b,arguments):a.call(b)}}function Vc(b,a){var c=a;"string"===typeof b&&"$"===b.charAt(0)?c=
s:Ca(a)?c="$WINDOW":a&&U===a?c="$DOCUMENT":a&&(a.$evalAsync&&a.$watch)&&(c="$SCOPE");return c}function qa(b,a){return"undefined"===typeof b?s:JSON.stringify(b,Vc,a?"  ":null)}function Wb(b){return w(b)?JSON.parse(b):b}function Qa(b){"function"===typeof b?b=!0:b&&0!==b.length?(b=K(""+b),b=!("f"==b||"0"==b||"false"==b||"no"==b||"n"==b||"[]"==b)):b=!1;return b}function ha(b){b=y(b).clone();try{b.empty()}catch(a){}var c=y("<div>").append(b).html();try{return 3===b[0].nodeType?K(c):c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/,
function(a,b){return"<"+K(b)})}catch(d){return K(c)}}function Xb(b){try{return decodeURIComponent(b)}catch(a){}}function Yb(b){var a={},c,d;q((b||"").split("&"),function(b){b&&(c=b.split("="),d=Xb(c[0]),B(d)&&(b=B(c[1])?Xb(c[1]):!0,a[d]?M(a[d])?a[d].push(b):a[d]=[a[d],b]:a[d]=b))});return a}function Zb(b){var a=[];q(b,function(b,d){M(b)?q(b,function(b){a.push(za(d,!0)+(!0===b?"":"="+za(b,!0)))}):a.push(za(d,!0)+(!0===b?"":"="+za(b,!0)))});return a.length?a.join("&"):""}function wb(b){return za(b,
!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function za(b,a){return encodeURIComponent(b).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,a?"%20":"+")}function Wc(b,a){function c(a){a&&d.push(a)}var d=[b],e,g,f=["ng:app","ng-app","x-ng-app","data-ng-app"],h=/\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;q(f,function(a){f[a]=!0;c(U.getElementById(a));a=a.replace(":","\\:");b.querySelectorAll&&(q(b.querySelectorAll("."+a),c),q(b.querySelectorAll("."+
a+"\\:"),c),q(b.querySelectorAll("["+a+"]"),c))});q(d,function(a){if(!e){var b=h.exec(" "+a.className+" ");b?(e=a,g=(b[2]||"").replace(/\s+/g,",")):q(a.attributes,function(b){!e&&f[b.name]&&(e=a,g=b.value)})}});e&&a(e,g?[g]:[])}function $b(b,a){var c=function(){b=y(b);if(b.injector()){var c=b[0]===U?"document":ha(b);throw Pa("btstrpd",c);}a=a||[];a.unshift(["$provide",function(a){a.value("$rootElement",b)}]);a.unshift("ng");c=ac(a);c.invoke(["$rootScope","$rootElement","$compile","$injector","$animate",
function(a,b,c,d,e){a.$apply(function(){b.data("$injector",d);c(b)(a)})}]);return c},d=/^NG_DEFER_BOOTSTRAP!/;if(O&&!d.test(O.name))return c();O.name=O.name.replace(d,"");Ea.resumeBootstrap=function(b){q(b,function(b){a.push(b)});c()}}function fb(b,a){a=a||"_";return b.replace(Xc,function(b,d){return(d?a:"")+b.toLowerCase()})}function xb(b,a,c){if(!b)throw Pa("areq",a||"?",c||"required");return b}function Ra(b,a,c){c&&M(b)&&(b=b[b.length-1]);xb(P(b),a,"not a function, got "+(b&&"object"==typeof b?
b.constructor.name||"Object":typeof b));return b}function Aa(b,a){if("hasOwnProperty"===b)throw Pa("badname",a);}function bc(b,a,c){if(!a)return b;a=a.split(".");for(var d,e=b,g=a.length,f=0;f<g;f++)d=a[f],b&&(b=(e=b)[d]);return!c&&P(b)?eb(e,b):b}function yb(b){var a=b[0];b=b[b.length-1];if(a===b)return y(a);var c=[a];do{a=a.nextSibling;if(!a)break;c.push(a)}while(a!==b);return y(c)}function Yc(b){var a=t("$injector"),c=t("ng");b=b.angular||(b.angular={});b.$$minErr=b.$$minErr||t;return b.module||
(b.module=function(){var b={};return function(e,g,f){if("hasOwnProperty"===e)throw c("badname","module");g&&b.hasOwnProperty(e)&&(b[e]=null);return b[e]||(b[e]=function(){function b(a,d,e){return function(){c[e||"push"]([a,d,arguments]);return n}}if(!g)throw a("nomod",e);var c=[],d=[],m=b("$injector","invoke"),n={_invokeQueue:c,_runBlocks:d,requires:g,name:e,provider:b("$provide","provider"),factory:b("$provide","factory"),service:b("$provide","service"),value:b("$provide","value"),constant:b("$provide",
"constant","unshift"),animation:b("$animateProvider","register"),filter:b("$filterProvider","register"),controller:b("$controllerProvider","register"),directive:b("$compileProvider","directive"),config:m,run:function(a){d.push(a);return this}};f&&m(f);return n}())}}())}function Zc(b){D(b,{bootstrap:$b,copy:ba,extend:D,equals:xa,element:y,forEach:q,injector:ac,noop:C,bind:eb,toJson:qa,fromJson:Wb,identity:Da,isUndefined:E,isDefined:B,isString:w,isFunction:P,isObject:X,isNumber:vb,isElement:Tc,isArray:M,
version:$c,isDate:Na,lowercase:K,uppercase:Fa,callbacks:{counter:0},$$minErr:t,$$csp:Vb});Sa=Yc(O);try{Sa("ngLocale")}catch(a){Sa("ngLocale",[]).provider("$locale",ad)}Sa("ng",["ngLocale"],["$provide",function(a){a.provider({$$sanitizeUri:bd});a.provider("$compile",cc).directive({a:cd,input:dc,textarea:dc,form:dd,script:ed,select:fd,style:gd,option:hd,ngBind:id,ngBindHtml:jd,ngBindTemplate:kd,ngClass:ld,ngClassEven:md,ngClassOdd:nd,ngCloak:od,ngController:pd,ngForm:qd,ngHide:rd,ngIf:sd,ngInclude:td,
ngInit:ud,ngNonBindable:vd,ngPluralize:wd,ngRepeat:xd,ngShow:yd,ngStyle:zd,ngSwitch:Ad,ngSwitchWhen:Bd,ngSwitchDefault:Cd,ngOptions:Dd,ngTransclude:Ed,ngModel:Fd,ngList:Gd,ngChange:Hd,required:ec,ngRequired:ec,ngValue:Id}).directive({ngInclude:Jd}).directive(zb).directive(fc);a.provider({$anchorScroll:Kd,$animate:Ld,$browser:Md,$cacheFactory:Nd,$controller:Od,$document:Pd,$exceptionHandler:Qd,$filter:gc,$interpolate:Rd,$interval:Sd,$http:Td,$httpBackend:Ud,$location:Vd,$log:Wd,$parse:Xd,$rootScope:Yd,
$q:Zd,$sce:$d,$sceDelegate:ae,$sniffer:be,$templateCache:ce,$timeout:de,$window:ee,$$rAF:fe,$$asyncCallback:ge})}])}function Ta(b){return b.replace(he,function(a,b,d,e){return e?d.toUpperCase():d}).replace(ie,"Moz$1")}function Ab(b,a,c,d){function e(b){var e=c&&b?[this.filter(b)]:[this],l=a,k,m,n,p,r,z;if(!d||null!=b)for(;e.length;)for(k=e.shift(),m=0,n=k.length;m<n;m++)for(p=y(k[m]),l?p.triggerHandler("$destroy"):l=!l,r=0,p=(z=p.children()).length;r<p;r++)e.push(Ga(z[r]));return g.apply(this,arguments)}
var g=Ga.fn[b],g=g.$original||g;e.$original=g;Ga.fn[b]=e}function N(b){if(b instanceof N)return b;w(b)&&(b=ca(b));if(!(this instanceof N)){if(w(b)&&"<"!=b.charAt(0))throw Bb("nosel");return new N(b)}if(w(b)){var a=b;b=U;var c;if(c=je.exec(a))b=[b.createElement(c[1])];else{var d=b,e;b=d.createDocumentFragment();c=[];if(Cb.test(a)){d=b.appendChild(d.createElement("div"));e=(ke.exec(a)||["",""])[1].toLowerCase();e=ea[e]||ea._default;d.innerHTML="<div>&#160;</div>"+e[1]+a.replace(le,"<$1></$2>")+e[2];
d.removeChild(d.firstChild);for(a=e[0];a--;)d=d.lastChild;a=0;for(e=d.childNodes.length;a<e;++a)c.push(d.childNodes[a]);d=b.firstChild;d.textContent=""}else c.push(d.createTextNode(a));b.textContent="";b.innerHTML="";b=c}Db(this,b);y(U.createDocumentFragment()).append(this)}else Db(this,b)}function Eb(b){return b.cloneNode(!0)}function Ha(b){hc(b);var a=0;for(b=b.childNodes||[];a<b.length;a++)Ha(b[a])}function ic(b,a,c,d){if(B(d))throw Bb("offargs");var e=la(b,"events");la(b,"handle")&&(E(a)?q(e,
function(a,c){Fb(b,c,a);delete e[c]}):q(a.split(" "),function(a){E(c)?(Fb(b,a,e[a]),delete e[a]):Oa(e[a]||[],c)}))}function hc(b,a){var c=b[gb],d=Ua[c];d&&(a?delete Ua[c].data[a]:(d.handle&&(d.events.$destroy&&d.handle({},"$destroy"),ic(b)),delete Ua[c],b[gb]=s))}function la(b,a,c){var d=b[gb],d=Ua[d||-1];if(B(c))d||(b[gb]=d=++me,d=Ua[d]={}),d[a]=c;else return d&&d[a]}function jc(b,a,c){var d=la(b,"data"),e=B(c),g=!e&&B(a),f=g&&!X(a);d||f||la(b,"data",d={});if(e)d[a]=c;else if(g){if(f)return d&&d[a];
D(d,a)}else return d}function Gb(b,a){return b.getAttribute?-1<(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").indexOf(" "+a+" "):!1}function hb(b,a){a&&b.setAttribute&&q(a.split(" "),function(a){b.setAttribute("class",ca((" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").replace(" "+ca(a)+" "," ")))})}function ib(b,a){if(a&&b.setAttribute){var c=(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ");q(a.split(" "),function(a){a=ca(a);-1===c.indexOf(" "+a+" ")&&
(c+=a+" ")});b.setAttribute("class",ca(c))}}function Db(b,a){if(a){a=a.nodeName||!B(a.length)||Ca(a)?[a]:a;for(var c=0;c<a.length;c++)b.push(a[c])}}function kc(b,a){return jb(b,"$"+(a||"ngController")+"Controller")}function jb(b,a,c){b=y(b);9==b[0].nodeType&&(b=b.find("html"));for(a=M(a)?a:[a];b.length;){for(var d=b[0],e=0,g=a.length;e<g;e++)if((c=b.data(a[e]))!==s)return c;b=y(d.parentNode||11===d.nodeType&&d.host)}}function lc(b){for(var a=0,c=b.childNodes;a<c.length;a++)Ha(c[a]);for(;b.firstChild;)b.removeChild(b.firstChild)}
function mc(b,a){var c=kb[a.toLowerCase()];return c&&nc[b.nodeName]&&c}function ne(b,a){var c=function(c,e){c.preventDefault||(c.preventDefault=function(){c.returnValue=!1});c.stopPropagation||(c.stopPropagation=function(){c.cancelBubble=!0});c.target||(c.target=c.srcElement||U);if(E(c.defaultPrevented)){var g=c.preventDefault;c.preventDefault=function(){c.defaultPrevented=!0;g.call(c)};c.defaultPrevented=!1}c.isDefaultPrevented=function(){return c.defaultPrevented||!1===c.returnValue};var f=Ub(a[e||
c.type]||[]);q(f,function(a){a.call(b,c)});8>=S?(c.preventDefault=null,c.stopPropagation=null,c.isDefaultPrevented=null):(delete c.preventDefault,delete c.stopPropagation,delete c.isDefaultPrevented)};c.elem=b;return c}function Ia(b){var a=typeof b,c;"object"==a&&null!==b?"function"==typeof(c=b.$$hashKey)?c=b.$$hashKey():c===s&&(c=b.$$hashKey=bb()):c=b;return a+":"+c}function Va(b){q(b,this.put,this)}function oc(b){var a,c;"function"==typeof b?(a=b.$inject)||(a=[],b.length&&(c=b.toString().replace(oe,
""),c=c.match(pe),q(c[1].split(qe),function(b){b.replace(re,function(b,c,d){a.push(d)})})),b.$inject=a):M(b)?(c=b.length-1,Ra(b[c],"fn"),a=b.slice(0,c)):Ra(b,"fn",!0);return a}function ac(b){function a(a){return function(b,c){if(X(b))q(b,Rb(a));else return a(b,c)}}function c(a,b){Aa(a,"service");if(P(b)||M(b))b=n.instantiate(b);if(!b.$get)throw Wa("pget",a);return m[a+h]=b}function d(a,b){return c(a,{$get:b})}function e(a){var b=[],c,d,g,h;q(a,function(a){if(!k.get(a)){k.put(a,!0);try{if(w(a))for(c=
Sa(a),b=b.concat(e(c.requires)).concat(c._runBlocks),d=c._invokeQueue,g=0,h=d.length;g<h;g++){var f=d[g],l=n.get(f[0]);l[f[1]].apply(l,f[2])}else P(a)?b.push(n.invoke(a)):M(a)?b.push(n.invoke(a)):Ra(a,"module")}catch(m){throw M(a)&&(a=a[a.length-1]),m.message&&(m.stack&&-1==m.stack.indexOf(m.message))&&(m=m.message+"\n"+m.stack),Wa("modulerr",a,m.stack||m.message||m);}}});return b}function g(a,b){function c(d){if(a.hasOwnProperty(d)){if(a[d]===f)throw Wa("cdep",l.join(" <- "));return a[d]}try{return l.unshift(d),
a[d]=f,a[d]=b(d)}catch(e){throw a[d]===f&&delete a[d],e;}finally{l.shift()}}function d(a,b,e){var g=[],h=oc(a),f,l,k;l=0;for(f=h.length;l<f;l++){k=h[l];if("string"!==typeof k)throw Wa("itkn",k);g.push(e&&e.hasOwnProperty(k)?e[k]:c(k))}a.$inject||(a=a[f]);return a.apply(b,g)}return{invoke:d,instantiate:function(a,b){var c=function(){},e;c.prototype=(M(a)?a[a.length-1]:a).prototype;c=new c;e=d(a,c,b);return X(e)||P(e)?e:c},get:c,annotate:oc,has:function(b){return m.hasOwnProperty(b+h)||a.hasOwnProperty(b)}}}
var f={},h="Provider",l=[],k=new Va,m={$provide:{provider:a(c),factory:a(d),service:a(function(a,b){return d(a,["$injector",function(a){return a.instantiate(b)}])}),value:a(function(a,b){return d(a,aa(b))}),constant:a(function(a,b){Aa(a,"constant");m[a]=b;p[a]=b}),decorator:function(a,b){var c=n.get(a+h),d=c.$get;c.$get=function(){var a=r.invoke(d,c);return r.invoke(b,null,{$delegate:a})}}}},n=m.$injector=g(m,function(){throw Wa("unpr",l.join(" <- "));}),p={},r=p.$injector=g(p,function(a){a=n.get(a+
h);return r.invoke(a.$get,a)});q(e(b),function(a){r.invoke(a||C)});return r}function Kd(){var b=!0;this.disableAutoScrolling=function(){b=!1};this.$get=["$window","$location","$rootScope",function(a,c,d){function e(a){var b=null;q(a,function(a){b||"a"!==K(a.nodeName)||(b=a)});return b}function g(){var b=c.hash(),d;b?(d=f.getElementById(b))?d.scrollIntoView():(d=e(f.getElementsByName(b)))?d.scrollIntoView():"top"===b&&a.scrollTo(0,0):a.scrollTo(0,0)}var f=a.document;b&&d.$watch(function(){return c.hash()},
function(){d.$evalAsync(g)});return g}]}function ge(){this.$get=["$$rAF","$timeout",function(b,a){return b.supported?function(a){return b(a)}:function(b){return a(b,0,!1)}}]}function se(b,a,c,d){function e(a){try{a.apply(null,ya.call(arguments,1))}finally{if(z--,0===z)for(;u.length;)try{u.pop()()}catch(b){c.error(b)}}}function g(a,b){(function T(){q(F,function(a){a()});v=b(T,a)})()}function f(){x=null;J!=h.url()&&(J=h.url(),q(ma,function(a){a(h.url())}))}var h=this,l=a[0],k=b.location,m=b.history,
n=b.setTimeout,p=b.clearTimeout,r={};h.isMock=!1;var z=0,u=[];h.$$completeOutstandingRequest=e;h.$$incOutstandingRequestCount=function(){z++};h.notifyWhenNoOutstandingRequests=function(a){q(F,function(a){a()});0===z?a():u.push(a)};var F=[],v;h.addPollFn=function(a){E(v)&&g(100,n);F.push(a);return a};var J=k.href,A=a.find("base"),x=null;h.url=function(a,c){k!==b.location&&(k=b.location);m!==b.history&&(m=b.history);if(a){if(J!=a)return J=a,d.history?c?m.replaceState(null,"",a):(m.pushState(null,"",
a),A.attr("href",A.attr("href"))):(x=a,c?k.replace(a):k.href=a),h}else return x||k.href.replace(/%27/g,"'")};var ma=[],L=!1;h.onUrlChange=function(a){if(!L){if(d.history)y(b).on("popstate",f);if(d.hashchange)y(b).on("hashchange",f);else h.addPollFn(f);L=!0}ma.push(a);return a};h.baseHref=function(){var a=A.attr("href");return a?a.replace(/^(https?\:)?\/\/[^\/]*/,""):""};var Q={},da="",H=h.baseHref();h.cookies=function(a,b){var d,e,g,h;if(a)b===s?l.cookie=escape(a)+"=;path="+H+";expires=Thu, 01 Jan 1970 00:00:00 GMT":
w(b)&&(d=(l.cookie=escape(a)+"="+escape(b)+";path="+H).length+1,4096<d&&c.warn("Cookie '"+a+"' possibly not set or overflowed because it was too large ("+d+" > 4096 bytes)!"));else{if(l.cookie!==da)for(da=l.cookie,d=da.split("; "),Q={},g=0;g<d.length;g++)e=d[g],h=e.indexOf("="),0<h&&(a=unescape(e.substring(0,h)),Q[a]===s&&(Q[a]=unescape(e.substring(h+1))));return Q}};h.defer=function(a,b){var c;z++;c=n(function(){delete r[c];e(a)},b||0);r[c]=!0;return c};h.defer.cancel=function(a){return r[a]?(delete r[a],
p(a),e(C),!0):!1}}function Md(){this.$get=["$window","$log","$sniffer","$document",function(b,a,c,d){return new se(b,d,a,c)}]}function Nd(){this.$get=function(){function b(b,d){function e(a){a!=n&&(p?p==a&&(p=a.n):p=a,g(a.n,a.p),g(a,n),n=a,n.n=null)}function g(a,b){a!=b&&(a&&(a.p=b),b&&(b.n=a))}if(b in a)throw t("$cacheFactory")("iid",b);var f=0,h=D({},d,{id:b}),l={},k=d&&d.capacity||Number.MAX_VALUE,m={},n=null,p=null;return a[b]={put:function(a,b){if(k<Number.MAX_VALUE){var c=m[a]||(m[a]={key:a});
e(c)}if(!E(b))return a in l||f++,l[a]=b,f>k&&this.remove(p.key),b},get:function(a){if(k<Number.MAX_VALUE){var b=m[a];if(!b)return;e(b)}return l[a]},remove:function(a){if(k<Number.MAX_VALUE){var b=m[a];if(!b)return;b==n&&(n=b.p);b==p&&(p=b.n);g(b.n,b.p);delete m[a]}delete l[a];f--},removeAll:function(){l={};f=0;m={};n=p=null},destroy:function(){m=h=l=null;delete a[b]},info:function(){return D({},h,{size:f})}}}var a={};b.info=function(){var b={};q(a,function(a,e){b[e]=a.info()});return b};b.get=function(b){return a[b]};
return b}}function ce(){this.$get=["$cacheFactory",function(b){return b("templates")}]}function cc(b,a){var c={},d="Directive",e=/^\s*directive\:\s*([\d\w\-_]+)\s+(.*)$/,g=/(([\d\w\-_]+)(?:\:([^;]+))?;?)/,f=/^(on[a-z]+|formaction)$/;this.directive=function l(a,e){Aa(a,"directive");w(a)?(xb(e,"directiveFactory"),c.hasOwnProperty(a)||(c[a]=[],b.factory(a+d,["$injector","$exceptionHandler",function(b,d){var e=[];q(c[a],function(c,g){try{var f=b.invoke(c);P(f)?f={compile:aa(f)}:!f.compile&&f.link&&(f.compile=
aa(f.link));f.priority=f.priority||0;f.index=g;f.name=f.name||a;f.require=f.require||f.controller&&f.name;f.restrict=f.restrict||"A";e.push(f)}catch(l){d(l)}});return e}])),c[a].push(e)):q(a,Rb(l));return this};this.aHrefSanitizationWhitelist=function(b){return B(b)?(a.aHrefSanitizationWhitelist(b),this):a.aHrefSanitizationWhitelist()};this.imgSrcSanitizationWhitelist=function(b){return B(b)?(a.imgSrcSanitizationWhitelist(b),this):a.imgSrcSanitizationWhitelist()};this.$get=["$injector","$interpolate",
"$exceptionHandler","$http","$templateCache","$parse","$controller","$rootScope","$document","$sce","$animate","$$sanitizeUri",function(a,b,m,n,p,r,z,u,F,v,J,A){function x(a,b,c,d,e){a instanceof y||(a=y(a));q(a,function(b,c){3==b.nodeType&&b.nodeValue.match(/\S+/)&&(a[c]=y(b).wrap("<span></span>").parent()[0])});var g=L(a,b,a,c,d,e);ma(a,"ng-scope");return function(b,c,d){xb(b,"scope");var e=c?Ja.clone.call(a):a;q(d,function(a,b){e.data("$"+b+"Controller",a)});d=0;for(var f=e.length;d<f;d++){var l=
e[d].nodeType;1!==l&&9!==l||e.eq(d).data("$scope",b)}c&&c(e,b);g&&g(b,e,e);return e}}function ma(a,b){try{a.addClass(b)}catch(c){}}function L(a,b,c,d,e,g){function f(a,c,d,e){var g,k,m,r,n,p,z;g=c.length;var I=Array(g);for(n=0;n<g;n++)I[n]=c[n];z=n=0;for(p=l.length;n<p;z++)k=I[z],c=l[n++],g=l[n++],m=y(k),c?(c.scope?(r=a.$new(),m.data("$scope",r)):r=a,(m=c.transclude)||!e&&b?c(g,r,k,d,Q(a,m||b)):c(g,r,k,d,e)):g&&g(a,k.childNodes,s,e)}for(var l=[],k,m,r,n,p=0;p<a.length;p++)k=new Hb,m=da(a[p],[],k,
0===p?d:s,e),(g=m.length?ia(m,a[p],k,b,c,null,[],[],g):null)&&g.scope&&ma(y(a[p]),"ng-scope"),k=g&&g.terminal||!(r=a[p].childNodes)||!r.length?null:L(r,g?g.transclude:b),l.push(g,k),n=n||g||k,g=null;return n?f:null}function Q(a,b){return function(c,d,e){var g=!1;c||(c=a.$new(),g=c.$$transcluded=!0);d=b(c,d,e);if(g)d.on("$destroy",eb(c,c.$destroy));return d}}function da(a,b,c,d,f){var k=c.$attr,l;switch(a.nodeType){case 1:T(b,na(Ka(a).toLowerCase()),"E",d,f);var m,r,n;l=a.attributes;for(var p=0,z=
l&&l.length;p<z;p++){var u=!1,F=!1;m=l[p];if(!S||8<=S||m.specified){r=m.name;n=na(r);W.test(n)&&(r=fb(n.substr(6),"-"));var J=n.replace(/(Start|End)$/,"");n===J+"Start"&&(u=r,F=r.substr(0,r.length-5)+"end",r=r.substr(0,r.length-6));n=na(r.toLowerCase());k[n]=r;c[n]=m=ca(m.value);mc(a,n)&&(c[n]=!0);N(a,b,m,n);T(b,n,"A",d,f,u,F)}}a=a.className;if(w(a)&&""!==a)for(;l=g.exec(a);)n=na(l[2]),T(b,n,"C",d,f)&&(c[n]=ca(l[3])),a=a.substr(l.index+l[0].length);break;case 3:t(b,a.nodeValue);break;case 8:try{if(l=
e.exec(a.nodeValue))n=na(l[1]),T(b,n,"M",d,f)&&(c[n]=ca(l[2]))}catch(x){}}b.sort(E);return b}function H(a,b,c){var d=[],e=0;if(b&&a.hasAttribute&&a.hasAttribute(b)){do{if(!a)throw ja("uterdir",b,c);1==a.nodeType&&(a.hasAttribute(b)&&e++,a.hasAttribute(c)&&e--);d.push(a);a=a.nextSibling}while(0<e)}else d.push(a);return y(d)}function R(a,b,c){return function(d,e,g,f,l){e=H(e[0],b,c);return a(d,e,g,f,l)}}function ia(a,c,d,e,g,f,l,n,p){function u(a,b,c,d){if(a){c&&(a=R(a,c,d));a.require=G.require;if(Q===
G||G.$$isolateScope)a=qc(a,{isolateScope:!0});l.push(a)}if(b){c&&(b=R(b,c,d));b.require=G.require;if(Q===G||G.$$isolateScope)b=qc(b,{isolateScope:!0});n.push(b)}}function F(a,b,c){var d,e="data",g=!1;if(w(a)){for(;"^"==(d=a.charAt(0))||"?"==d;)a=a.substr(1),"^"==d&&(e="inheritedData"),g=g||"?"==d;d=null;c&&"data"===e&&(d=c[a]);d=d||b[e]("$"+a+"Controller");if(!d&&!g)throw ja("ctreq",a,t);}else M(a)&&(d=[],q(a,function(a){d.push(F(a,b,c))}));return d}function J(a,e,g,f,p){function u(a,b){var c;2>arguments.length&&
(b=a,a=s);D&&(c=lb);return p(a,b,c)}var I,x,v,A,R,H,lb={},da;I=c===g?d:Ub(d,new Hb(y(g),d.$attr));x=I.$$element;if(Q){var T=/^\s*([@=&])(\??)\s*(\w*)\s*$/;f=y(g);H=e.$new(!0);ia&&ia===Q.$$originalDirective?f.data("$isolateScope",H):f.data("$isolateScopeNoTemplate",H);ma(f,"ng-isolate-scope");q(Q.scope,function(a,c){var d=a.match(T)||[],g=d[3]||c,f="?"==d[2],d=d[1],l,m,n,p;H.$$isolateBindings[c]=d+g;switch(d){case "@":I.$observe(g,function(a){H[c]=a});I.$$observers[g].$$scope=e;I[g]&&(H[c]=b(I[g])(e));
break;case "=":if(f&&!I[g])break;m=r(I[g]);p=m.literal?xa:function(a,b){return a===b};n=m.assign||function(){l=H[c]=m(e);throw ja("nonassign",I[g],Q.name);};l=H[c]=m(e);H.$watch(function(){var a=m(e);p(a,H[c])||(p(a,l)?n(e,a=H[c]):H[c]=a);return l=a},null,m.literal);break;case "&":m=r(I[g]);H[c]=function(a){return m(e,a)};break;default:throw ja("iscp",Q.name,c,a);}})}da=p&&u;L&&q(L,function(a){var b={$scope:a===Q||a.$$isolateScope?H:e,$element:x,$attrs:I,$transclude:da},c;R=a.controller;"@"==R&&(R=
I[a.name]);c=z(R,b);lb[a.name]=c;D||x.data("$"+a.name+"Controller",c);a.controllerAs&&(b.$scope[a.controllerAs]=c)});f=0;for(v=l.length;f<v;f++)try{A=l[f],A(A.isolateScope?H:e,x,I,A.require&&F(A.require,x,lb),da)}catch(G){m(G,ha(x))}f=e;Q&&(Q.template||null===Q.templateUrl)&&(f=H);a&&a(f,g.childNodes,s,p);for(f=n.length-1;0<=f;f--)try{A=n[f],A(A.isolateScope?H:e,x,I,A.require&&F(A.require,x,lb),da)}catch(B){m(B,ha(x))}}p=p||{};for(var v=-Number.MAX_VALUE,A,L=p.controllerDirectives,Q=p.newIsolateScopeDirective,
ia=p.templateDirective,T=p.nonTlbTranscludeDirective,E=!1,D=p.hasElementTranscludeDirective,Z=d.$$element=y(c),G,t,V,Xa=e,O,N=0,S=a.length;N<S;N++){G=a[N];var ra=G.$$start,W=G.$$end;ra&&(Z=H(c,ra,W));V=s;if(v>G.priority)break;if(V=G.scope)A=A||G,G.templateUrl||(K("new/isolated scope",Q,G,Z),X(V)&&(Q=G));t=G.name;!G.templateUrl&&G.controller&&(V=G.controller,L=L||{},K("'"+t+"' controller",L[t],G,Z),L[t]=G);if(V=G.transclude)E=!0,G.$$tlb||(K("transclusion",T,G,Z),T=G),"element"==V?(D=!0,v=G.priority,
V=H(c,ra,W),Z=d.$$element=y(U.createComment(" "+t+": "+d[t]+" ")),c=Z[0],mb(g,y(ya.call(V,0)),c),Xa=x(V,e,v,f&&f.name,{nonTlbTranscludeDirective:T})):(V=y(Eb(c)).contents(),Z.empty(),Xa=x(V,e));if(G.template)if(K("template",ia,G,Z),ia=G,V=P(G.template)?G.template(Z,d):G.template,V=Y(V),G.replace){f=G;V=Cb.test(V)?y(V):[];c=V[0];if(1!=V.length||1!==c.nodeType)throw ja("tplrt",t,"");mb(g,Z,c);S={$attr:{}};V=da(c,[],S);var $=a.splice(N+1,a.length-(N+1));Q&&pc(V);a=a.concat(V).concat($);B(d,S);S=a.length}else Z.html(V);
if(G.templateUrl)K("template",ia,G,Z),ia=G,G.replace&&(f=G),J=C(a.splice(N,a.length-N),Z,d,g,Xa,l,n,{controllerDirectives:L,newIsolateScopeDirective:Q,templateDirective:ia,nonTlbTranscludeDirective:T}),S=a.length;else if(G.compile)try{O=G.compile(Z,d,Xa),P(O)?u(null,O,ra,W):O&&u(O.pre,O.post,ra,W)}catch(aa){m(aa,ha(Z))}G.terminal&&(J.terminal=!0,v=Math.max(v,G.priority))}J.scope=A&&!0===A.scope;J.transclude=E&&Xa;p.hasElementTranscludeDirective=D;return J}function pc(a){for(var b=0,c=a.length;b<c;b++)a[b]=
Tb(a[b],{$$isolateScope:!0})}function T(b,e,g,f,k,n,r){if(e===k)return null;k=null;if(c.hasOwnProperty(e)){var p;e=a.get(e+d);for(var z=0,u=e.length;z<u;z++)try{p=e[z],(f===s||f>p.priority)&&-1!=p.restrict.indexOf(g)&&(n&&(p=Tb(p,{$$start:n,$$end:r})),b.push(p),k=p)}catch(F){m(F)}}return k}function B(a,b){var c=b.$attr,d=a.$attr,e=a.$$element;q(a,function(d,e){"$"!=e.charAt(0)&&(b[e]&&(d+=("style"===e?";":" ")+b[e]),a.$set(e,d,!0,c[e]))});q(b,function(b,g){"class"==g?(ma(e,b),a["class"]=(a["class"]?
a["class"]+" ":"")+b):"style"==g?(e.attr("style",e.attr("style")+";"+b),a.style=(a.style?a.style+";":"")+b):"$"==g.charAt(0)||a.hasOwnProperty(g)||(a[g]=b,d[g]=c[g])})}function C(a,b,c,d,e,g,f,l){var k=[],m,r,z=b[0],u=a.shift(),F=D({},u,{templateUrl:null,transclude:null,replace:null,$$originalDirective:u}),x=P(u.templateUrl)?u.templateUrl(b,c):u.templateUrl;b.empty();n.get(v.getTrustedResourceUrl(x),{cache:p}).success(function(n){var p,J;n=Y(n);if(u.replace){n=Cb.test(n)?y(n):[];p=n[0];if(1!=n.length||
1!==p.nodeType)throw ja("tplrt",u.name,x);n={$attr:{}};mb(d,b,p);var v=da(p,[],n);X(u.scope)&&pc(v);a=v.concat(a);B(c,n)}else p=z,b.html(n);a.unshift(F);m=ia(a,p,c,e,b,u,g,f,l);q(d,function(a,c){a==p&&(d[c]=b[0])});for(r=L(b[0].childNodes,e);k.length;){n=k.shift();J=k.shift();var A=k.shift(),R=k.shift(),v=b[0];if(J!==z){var H=J.className;l.hasElementTranscludeDirective&&u.replace||(v=Eb(p));mb(A,y(J),v);ma(y(v),H)}J=m.transclude?Q(n,m.transclude):R;m(r,n,v,d,J)}k=null}).error(function(a,b,c,d){throw ja("tpload",
d.url);});return function(a,b,c,d,e){k?(k.push(b),k.push(c),k.push(d),k.push(e)):m(r,b,c,d,e)}}function E(a,b){var c=b.priority-a.priority;return 0!==c?c:a.name!==b.name?a.name<b.name?-1:1:a.index-b.index}function K(a,b,c,d){if(b)throw ja("multidir",b.name,c.name,a,ha(d));}function t(a,c){var d=b(c,!0);d&&a.push({priority:0,compile:aa(function(a,b){var c=b.parent(),e=c.data("$binding")||[];e.push(d);ma(c.data("$binding",e),"ng-binding");a.$watch(d,function(a){b[0].nodeValue=a})})})}function O(a,b){if("srcdoc"==
b)return v.HTML;var c=Ka(a);if("xlinkHref"==b||"FORM"==c&&"action"==b||"IMG"!=c&&("src"==b||"ngSrc"==b))return v.RESOURCE_URL}function N(a,c,d,e){var g=b(d,!0);if(g){if("multiple"===e&&"SELECT"===Ka(a))throw ja("selmulti",ha(a));c.push({priority:100,compile:function(){return{pre:function(c,d,l){d=l.$$observers||(l.$$observers={});if(f.test(e))throw ja("nodomevents");if(g=b(l[e],!0,O(a,e)))l[e]=g(c),(d[e]||(d[e]=[])).$$inter=!0,(l.$$observers&&l.$$observers[e].$$scope||c).$watch(g,function(a,b){"class"===
e&&a!=b?l.$updateClass(a,b):l.$set(e,a)})}}}})}}function mb(a,b,c){var d=b[0],e=b.length,g=d.parentNode,f,l;if(a)for(f=0,l=a.length;f<l;f++)if(a[f]==d){a[f++]=c;l=f+e-1;for(var k=a.length;f<k;f++,l++)l<k?a[f]=a[l]:delete a[f];a.length-=e-1;break}g&&g.replaceChild(c,d);a=U.createDocumentFragment();a.appendChild(d);c[y.expando]=d[y.expando];d=1;for(e=b.length;d<e;d++)g=b[d],y(g).remove(),a.appendChild(g),delete b[d];b[0]=c;b.length=1}function qc(a,b){return D(function(){return a.apply(null,arguments)},
a,b)}var Hb=function(a,b){this.$$element=a;this.$attr=b||{}};Hb.prototype={$normalize:na,$addClass:function(a){a&&0<a.length&&J.addClass(this.$$element,a)},$removeClass:function(a){a&&0<a.length&&J.removeClass(this.$$element,a)},$updateClass:function(a,b){var c=rc(a,b),d=rc(b,a);0===c.length?J.removeClass(this.$$element,d):0===d.length?J.addClass(this.$$element,c):J.setClass(this.$$element,c,d)},$set:function(a,b,c,d){var e=mc(this.$$element[0],a);e&&(this.$$element.prop(a,b),d=e);this[a]=b;d?this.$attr[a]=
d:(d=this.$attr[a])||(this.$attr[a]=d=fb(a,"-"));e=Ka(this.$$element);if("A"===e&&"href"===a||"IMG"===e&&"src"===a)this[a]=b=A(b,"src"===a);!1!==c&&(null===b||b===s?this.$$element.removeAttr(d):this.$$element.attr(d,b));(c=this.$$observers)&&q(c[a],function(a){try{a(b)}catch(c){m(c)}})},$observe:function(a,b){var c=this,d=c.$$observers||(c.$$observers={}),e=d[a]||(d[a]=[]);e.push(b);u.$evalAsync(function(){e.$$inter||b(c[a])});return b}};var Z=b.startSymbol(),ra=b.endSymbol(),Y="{{"==Z||"}}"==ra?
Da:function(a){return a.replace(/\{\{/g,Z).replace(/}}/g,ra)},W=/^ngAttr[A-Z]/;return x}]}function na(b){return Ta(b.replace(te,""))}function rc(b,a){var c="",d=b.split(/\s+/),e=a.split(/\s+/),g=0;a:for(;g<d.length;g++){for(var f=d[g],h=0;h<e.length;h++)if(f==e[h])continue a;c+=(0<c.length?" ":"")+f}return c}function Od(){var b={},a=/^(\S+)(\s+as\s+(\w+))?$/;this.register=function(a,d){Aa(a,"controller");X(a)?D(b,a):b[a]=d};this.$get=["$injector","$window",function(c,d){return function(e,g){var f,
h,l;w(e)&&(f=e.match(a),h=f[1],l=f[3],e=b.hasOwnProperty(h)?b[h]:bc(g.$scope,h,!0)||bc(d,h,!0),Ra(e,h,!0));f=c.instantiate(e,g);if(l){if(!g||"object"!=typeof g.$scope)throw t("$controller")("noscp",h||e.name,l);g.$scope[l]=f}return f}}]}function Pd(){this.$get=["$window",function(b){return y(b.document)}]}function Qd(){this.$get=["$log",function(b){return function(a,c){b.error.apply(b,arguments)}}]}function sc(b){var a={},c,d,e;if(!b)return a;q(b.split("\n"),function(b){e=b.indexOf(":");c=K(ca(b.substr(0,
e)));d=ca(b.substr(e+1));c&&(a[c]=a[c]?a[c]+(", "+d):d)});return a}function tc(b){var a=X(b)?b:s;return function(c){a||(a=sc(b));return c?a[K(c)]||null:a}}function uc(b,a,c){if(P(c))return c(b,a);q(c,function(c){b=c(b,a)});return b}function Td(){var b=/^\s*(\[|\{[^\{])/,a=/[\}\]]\s*$/,c=/^\)\]\}',?\n/,d={"Content-Type":"application/json;charset=utf-8"},e=this.defaults={transformResponse:[function(d){w(d)&&(d=d.replace(c,""),b.test(d)&&a.test(d)&&(d=Wb(d)));return d}],transformRequest:[function(a){return X(a)&&
"[object File]"!==wa.call(a)&&"[object Blob]"!==wa.call(a)?qa(a):a}],headers:{common:{Accept:"application/json, text/plain, */*"},post:ba(d),put:ba(d),patch:ba(d)},xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN"},g=this.interceptors=[],f=this.responseInterceptors=[];this.$get=["$httpBackend","$browser","$cacheFactory","$rootScope","$q","$injector",function(a,b,c,d,n,p){function r(a){function c(a){var b=D({},a,{data:uc(a.data,a.headers,d.transformResponse)});return 200<=a.status&&300>a.status?
b:n.reject(b)}var d={method:"get",transformRequest:e.transformRequest,transformResponse:e.transformResponse},g=function(a){function b(a){var c;q(a,function(b,d){P(b)&&(c=b(),null!=c?a[d]=c:delete a[d])})}var c=e.headers,d=D({},a.headers),g,f,c=D({},c.common,c[K(a.method)]);b(c);b(d);a:for(g in c){a=K(g);for(f in d)if(K(f)===a)continue a;d[g]=c[g]}return d}(a);D(d,a);d.headers=g;d.method=Fa(d.method);(a=Ib(d.url)?b.cookies()[d.xsrfCookieName||e.xsrfCookieName]:s)&&(g[d.xsrfHeaderName||e.xsrfHeaderName]=
a);var f=[function(a){g=a.headers;var b=uc(a.data,tc(g),a.transformRequest);E(a.data)&&q(g,function(a,b){"content-type"===K(b)&&delete g[b]});E(a.withCredentials)&&!E(e.withCredentials)&&(a.withCredentials=e.withCredentials);return z(a,b,g).then(c,c)},s],h=n.when(d);for(q(v,function(a){(a.request||a.requestError)&&f.unshift(a.request,a.requestError);(a.response||a.responseError)&&f.push(a.response,a.responseError)});f.length;){a=f.shift();var k=f.shift(),h=h.then(a,k)}h.success=function(a){h.then(function(b){a(b.data,
b.status,b.headers,d)});return h};h.error=function(a){h.then(null,function(b){a(b.data,b.status,b.headers,d)});return h};return h}function z(b,c,g){function f(a,b,c,e){v&&(200<=a&&300>a?v.put(s,[a,b,sc(c),e]):v.remove(s));l(b,a,c,e);d.$$phase||d.$apply()}function l(a,c,d,e){c=Math.max(c,0);(200<=c&&300>c?p.resolve:p.reject)({data:a,status:c,headers:tc(d),config:b,statusText:e})}function k(){var a=db(r.pendingRequests,b);-1!==a&&r.pendingRequests.splice(a,1)}var p=n.defer(),z=p.promise,v,q,s=u(b.url,
b.params);r.pendingRequests.push(b);z.then(k,k);(b.cache||e.cache)&&(!1!==b.cache&&"GET"==b.method)&&(v=X(b.cache)?b.cache:X(e.cache)?e.cache:F);if(v)if(q=v.get(s),B(q)){if(q.then)return q.then(k,k),q;M(q)?l(q[1],q[0],ba(q[2]),q[3]):l(q,200,{},"OK")}else v.put(s,z);E(q)&&a(b.method,s,c,f,g,b.timeout,b.withCredentials,b.responseType);return z}function u(a,b){if(!b)return a;var c=[];Sc(b,function(a,b){null===a||E(a)||(M(a)||(a=[a]),q(a,function(a){X(a)&&(a=qa(a));c.push(za(b)+"="+za(a))}))});0<c.length&&
(a+=(-1==a.indexOf("?")?"?":"&")+c.join("&"));return a}var F=c("$http"),v=[];q(g,function(a){v.unshift(w(a)?p.get(a):p.invoke(a))});q(f,function(a,b){var c=w(a)?p.get(a):p.invoke(a);v.splice(b,0,{response:function(a){return c(n.when(a))},responseError:function(a){return c(n.reject(a))}})});r.pendingRequests=[];(function(a){q(arguments,function(a){r[a]=function(b,c){return r(D(c||{},{method:a,url:b}))}})})("get","delete","head","jsonp");(function(a){q(arguments,function(a){r[a]=function(b,c,d){return r(D(d||
{},{method:a,url:b,data:c}))}})})("post","put");r.defaults=e;return r}]}function ue(b){if(8>=S&&(!b.match(/^(get|post|head|put|delete|options)$/i)||!O.XMLHttpRequest))return new O.ActiveXObject("Microsoft.XMLHTTP");if(O.XMLHttpRequest)return new O.XMLHttpRequest;throw t("$httpBackend")("noxhr");}function Ud(){this.$get=["$browser","$window","$document",function(b,a,c){return ve(b,ue,b.defer,a.angular.callbacks,c[0])}]}function ve(b,a,c,d,e){function g(a,b){var c=e.createElement("script"),d=function(){c.onreadystatechange=
c.onload=c.onerror=null;e.body.removeChild(c);b&&b()};c.type="text/javascript";c.src=a;S&&8>=S?c.onreadystatechange=function(){/loaded|complete/.test(c.readyState)&&d()}:c.onload=c.onerror=function(){d()};e.body.appendChild(c);return d}var f=-1;return function(e,l,k,m,n,p,r,z){function u(){v=f;A&&A();x&&x.abort()}function F(a,d,e,g,f){L&&c.cancel(L);A=x=null;0===d&&(d=e?200:"file"==sa(l).protocol?404:0);a(1223===d?204:d,e,g,f||"");b.$$completeOutstandingRequest(C)}var v;b.$$incOutstandingRequestCount();
l=l||b.url();if("jsonp"==K(e)){var J="_"+(d.counter++).toString(36);d[J]=function(a){d[J].data=a};var A=g(l.replace("JSON_CALLBACK","angular.callbacks."+J),function(){d[J].data?F(m,200,d[J].data):F(m,v||-2);d[J]=Ea.noop})}else{var x=a(e);x.open(e,l,!0);q(n,function(a,b){B(a)&&x.setRequestHeader(b,a)});x.onreadystatechange=function(){if(x&&4==x.readyState){var a=null,b=null;v!==f&&(a=x.getAllResponseHeaders(),b="response"in x?x.response:x.responseText);F(m,v||x.status,b,a,x.statusText||"")}};r&&(x.withCredentials=
!0);if(z)try{x.responseType=z}catch(s){if("json"!==z)throw s;}x.send(k||null)}if(0<p)var L=c(u,p);else p&&p.then&&p.then(u)}}function Rd(){var b="{{",a="}}";this.startSymbol=function(a){return a?(b=a,this):b};this.endSymbol=function(b){return b?(a=b,this):a};this.$get=["$parse","$exceptionHandler","$sce",function(c,d,e){function g(g,k,m){for(var n,p,r=0,z=[],u=g.length,F=!1,v=[];r<u;)-1!=(n=g.indexOf(b,r))&&-1!=(p=g.indexOf(a,n+f))?(r!=n&&z.push(g.substring(r,n)),z.push(r=c(F=g.substring(n+f,p))),
r.exp=F,r=p+h,F=!0):(r!=u&&z.push(g.substring(r)),r=u);(u=z.length)||(z.push(""),u=1);if(m&&1<z.length)throw vc("noconcat",g);if(!k||F)return v.length=u,r=function(a){try{for(var b=0,c=u,f;b<c;b++)"function"==typeof(f=z[b])&&(f=f(a),f=m?e.getTrusted(m,f):e.valueOf(f),null===f||E(f)?f="":"string"!=typeof f&&(f=qa(f))),v[b]=f;return v.join("")}catch(h){a=vc("interr",g,h.toString()),d(a)}},r.exp=g,r.parts=z,r}var f=b.length,h=a.length;g.startSymbol=function(){return b};g.endSymbol=function(){return a};
return g}]}function Sd(){this.$get=["$rootScope","$window","$q",function(b,a,c){function d(d,f,h,l){var k=a.setInterval,m=a.clearInterval,n=c.defer(),p=n.promise,r=0,z=B(l)&&!l;h=B(h)?h:0;p.then(null,null,d);p.$$intervalId=k(function(){n.notify(r++);0<h&&r>=h&&(n.resolve(r),m(p.$$intervalId),delete e[p.$$intervalId]);z||b.$apply()},f);e[p.$$intervalId]=n;return p}var e={};d.cancel=function(a){return a&&a.$$intervalId in e?(e[a.$$intervalId].reject("canceled"),clearInterval(a.$$intervalId),delete e[a.$$intervalId],
!0):!1};return d}]}function ad(){this.$get=function(){return{id:"en-us",NUMBER_FORMATS:{DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{minInt:1,minFrac:0,maxFrac:3,posPre:"",posSuf:"",negPre:"-",negSuf:"",gSize:3,lgSize:3},{minInt:1,minFrac:2,maxFrac:2,posPre:"\u00a4",posSuf:"",negPre:"(\u00a4",negSuf:")",gSize:3,lgSize:3}],CURRENCY_SYM:"$"},DATETIME_FORMATS:{MONTH:"January February March April May June July August September October November December".split(" "),SHORTMONTH:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
DAY:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),SHORTDAY:"Sun Mon Tue Wed Thu Fri Sat".split(" "),AMPMS:["AM","PM"],medium:"MMM d, y h:mm:ss a","short":"M/d/yy h:mm a",fullDate:"EEEE, MMMM d, y",longDate:"MMMM d, y",mediumDate:"MMM d, y",shortDate:"M/d/yy",mediumTime:"h:mm:ss a",shortTime:"h:mm a"},pluralCat:function(b){return 1===b?"one":"other"}}}}function wc(b){b=b.split("/");for(var a=b.length;a--;)b[a]=wb(b[a]);return b.join("/")}function xc(b,a,c){b=sa(b,c);a.$$protocol=
b.protocol;a.$$host=b.hostname;a.$$port=Y(b.port)||we[b.protocol]||null}function yc(b,a,c){var d="/"!==b.charAt(0);d&&(b="/"+b);b=sa(b,c);a.$$path=decodeURIComponent(d&&"/"===b.pathname.charAt(0)?b.pathname.substring(1):b.pathname);a.$$search=Yb(b.search);a.$$hash=decodeURIComponent(b.hash);a.$$path&&"/"!=a.$$path.charAt(0)&&(a.$$path="/"+a.$$path)}function oa(b,a){if(0===a.indexOf(b))return a.substr(b.length)}function Ya(b){var a=b.indexOf("#");return-1==a?b:b.substr(0,a)}function Jb(b){return b.substr(0,
Ya(b).lastIndexOf("/")+1)}function zc(b,a){this.$$html5=!0;a=a||"";var c=Jb(b);xc(b,this,b);this.$$parse=function(a){var e=oa(c,a);if(!w(e))throw Kb("ipthprfx",a,c);yc(e,this,b);this.$$path||(this.$$path="/");this.$$compose()};this.$$compose=function(){var a=Zb(this.$$search),b=this.$$hash?"#"+wb(this.$$hash):"";this.$$url=wc(this.$$path)+(a?"?"+a:"")+b;this.$$absUrl=c+this.$$url.substr(1)};this.$$rewrite=function(d){var e;if((e=oa(b,d))!==s)return d=e,(e=oa(a,e))!==s?c+(oa("/",e)||e):b+d;if((e=oa(c,
d))!==s)return c+e;if(c==d+"/")return c}}function Lb(b,a){var c=Jb(b);xc(b,this,b);this.$$parse=function(d){var e=oa(b,d)||oa(c,d),e="#"==e.charAt(0)?oa(a,e):this.$$html5?e:"";if(!w(e))throw Kb("ihshprfx",d,a);yc(e,this,b);d=this.$$path;var g=/^\/?.*?:(\/.*)/;0===e.indexOf(b)&&(e=e.replace(b,""));g.exec(e)||(d=(e=g.exec(d))?e[1]:d);this.$$path=d;this.$$compose()};this.$$compose=function(){var c=Zb(this.$$search),e=this.$$hash?"#"+wb(this.$$hash):"";this.$$url=wc(this.$$path)+(c?"?"+c:"")+e;this.$$absUrl=
b+(this.$$url?a+this.$$url:"")};this.$$rewrite=function(a){if(Ya(b)==Ya(a))return a}}function Ac(b,a){this.$$html5=!0;Lb.apply(this,arguments);var c=Jb(b);this.$$rewrite=function(d){var e;if(b==Ya(d))return d;if(e=oa(c,d))return b+a+e;if(c===d+"/")return c}}function nb(b){return function(){return this[b]}}function Bc(b,a){return function(c){if(E(c))return this[b];this[b]=a(c);this.$$compose();return this}}function Vd(){var b="",a=!1;this.hashPrefix=function(a){return B(a)?(b=a,this):b};this.html5Mode=
function(b){return B(b)?(a=b,this):a};this.$get=["$rootScope","$browser","$sniffer","$rootElement",function(c,d,e,g){function f(a){c.$broadcast("$locationChangeSuccess",h.absUrl(),a)}var h,l=d.baseHref(),k=d.url();a?(l=k.substring(0,k.indexOf("/",k.indexOf("//")+2))+(l||"/"),e=e.history?zc:Ac):(l=Ya(k),e=Lb);h=new e(l,"#"+b);h.$$parse(h.$$rewrite(k));g.on("click",function(a){if(!a.ctrlKey&&!a.metaKey&&2!=a.which){for(var b=y(a.target);"a"!==K(b[0].nodeName);)if(b[0]===g[0]||!(b=b.parent())[0])return;
var e=b.prop("href");X(e)&&"[object SVGAnimatedString]"===e.toString()&&(e=sa(e.animVal).href);var f=h.$$rewrite(e);e&&(!b.attr("target")&&f&&!a.isDefaultPrevented())&&(a.preventDefault(),f!=d.url()&&(h.$$parse(f),c.$apply(),O.angular["ff-684208-preventDefault"]=!0))}});h.absUrl()!=k&&d.url(h.absUrl(),!0);d.onUrlChange(function(a){h.absUrl()!=a&&(c.$evalAsync(function(){var b=h.absUrl();h.$$parse(a);c.$broadcast("$locationChangeStart",a,b).defaultPrevented?(h.$$parse(b),d.url(b)):f(b)}),c.$$phase||
c.$digest())});var m=0;c.$watch(function(){var a=d.url(),b=h.$$replace;m&&a==h.absUrl()||(m++,c.$evalAsync(function(){c.$broadcast("$locationChangeStart",h.absUrl(),a).defaultPrevented?h.$$parse(a):(d.url(h.absUrl(),b),f(a))}));h.$$replace=!1;return m});return h}]}function Wd(){var b=!0,a=this;this.debugEnabled=function(a){return B(a)?(b=a,this):b};this.$get=["$window",function(c){function d(a){a instanceof Error&&(a.stack?a=a.message&&-1===a.stack.indexOf(a.message)?"Error: "+a.message+"\n"+a.stack:
a.stack:a.sourceURL&&(a=a.message+"\n"+a.sourceURL+":"+a.line));return a}function e(a){var b=c.console||{},e=b[a]||b.log||C;a=!1;try{a=!!e.apply}catch(l){}return a?function(){var a=[];q(arguments,function(b){a.push(d(b))});return e.apply(b,a)}:function(a,b){e(a,null==b?"":b)}}return{log:e("log"),info:e("info"),warn:e("warn"),error:e("error"),debug:function(){var c=e("debug");return function(){b&&c.apply(a,arguments)}}()}}]}function fa(b,a){if("constructor"===b)throw Ba("isecfld",a);return b}function Za(b,
a){if(b){if(b.constructor===b)throw Ba("isecfn",a);if(b.document&&b.location&&b.alert&&b.setInterval)throw Ba("isecwindow",a);if(b.children&&(b.nodeName||b.prop&&b.attr&&b.find))throw Ba("isecdom",a);}return b}function ob(b,a,c,d,e){e=e||{};a=a.split(".");for(var g,f=0;1<a.length;f++){g=fa(a.shift(),d);var h=b[g];h||(h={},b[g]=h);b=h;b.then&&e.unwrapPromises&&(ta(d),"$$v"in b||function(a){a.then(function(b){a.$$v=b})}(b),b.$$v===s&&(b.$$v={}),b=b.$$v)}g=fa(a.shift(),d);return b[g]=c}function Cc(b,
a,c,d,e,g,f){fa(b,g);fa(a,g);fa(c,g);fa(d,g);fa(e,g);return f.unwrapPromises?function(f,l){var k=l&&l.hasOwnProperty(b)?l:f,m;if(null==k)return k;(k=k[b])&&k.then&&(ta(g),"$$v"in k||(m=k,m.$$v=s,m.then(function(a){m.$$v=a})),k=k.$$v);if(!a)return k;if(null==k)return s;(k=k[a])&&k.then&&(ta(g),"$$v"in k||(m=k,m.$$v=s,m.then(function(a){m.$$v=a})),k=k.$$v);if(!c)return k;if(null==k)return s;(k=k[c])&&k.then&&(ta(g),"$$v"in k||(m=k,m.$$v=s,m.then(function(a){m.$$v=a})),k=k.$$v);if(!d)return k;if(null==
k)return s;(k=k[d])&&k.then&&(ta(g),"$$v"in k||(m=k,m.$$v=s,m.then(function(a){m.$$v=a})),k=k.$$v);if(!e)return k;if(null==k)return s;(k=k[e])&&k.then&&(ta(g),"$$v"in k||(m=k,m.$$v=s,m.then(function(a){m.$$v=a})),k=k.$$v);return k}:function(g,f){var k=f&&f.hasOwnProperty(b)?f:g;if(null==k)return k;k=k[b];if(!a)return k;if(null==k)return s;k=k[a];if(!c)return k;if(null==k)return s;k=k[c];if(!d)return k;if(null==k)return s;k=k[d];return e?null==k?s:k=k[e]:k}}function xe(b,a){fa(b,a);return function(a,
d){return null==a?s:(d&&d.hasOwnProperty(b)?d:a)[b]}}function ye(b,a,c){fa(b,c);fa(a,c);return function(c,e){if(null==c)return s;c=(e&&e.hasOwnProperty(b)?e:c)[b];return null==c?s:c[a]}}function Dc(b,a,c){if(Mb.hasOwnProperty(b))return Mb[b];var d=b.split("."),e=d.length,g;if(a.unwrapPromises||1!==e)if(a.unwrapPromises||2!==e)if(a.csp)g=6>e?Cc(d[0],d[1],d[2],d[3],d[4],c,a):function(b,g){var f=0,h;do h=Cc(d[f++],d[f++],d[f++],d[f++],d[f++],c,a)(b,g),g=s,b=h;while(f<e);return h};else{var f="var p;\n";
q(d,function(b,d){fa(b,c);f+="if(s == null) return undefined;\ns="+(d?"s":'((k&&k.hasOwnProperty("'+b+'"))?k:s)')+'["'+b+'"];\n'+(a.unwrapPromises?'if (s && s.then) {\n pw("'+c.replace(/(["\r\n])/g,"\\$1")+'");\n if (!("$$v" in s)) {\n p=s;\n p.$$v = undefined;\n p.then(function(v) {p.$$v=v;});\n}\n s=s.$$v\n}\n':"")});var f=f+"return s;",h=new Function("s","k","pw",f);h.toString=aa(f);g=a.unwrapPromises?function(a,b){return h(a,b,ta)}:h}else g=ye(d[0],d[1],c);else g=xe(d[0],c);"hasOwnProperty"!==
b&&(Mb[b]=g);return g}function Xd(){var b={},a={csp:!1,unwrapPromises:!1,logPromiseWarnings:!0};this.unwrapPromises=function(b){return B(b)?(a.unwrapPromises=!!b,this):a.unwrapPromises};this.logPromiseWarnings=function(b){return B(b)?(a.logPromiseWarnings=b,this):a.logPromiseWarnings};this.$get=["$filter","$sniffer","$log",function(c,d,e){a.csp=d.csp;ta=function(b){a.logPromiseWarnings&&!Ec.hasOwnProperty(b)&&(Ec[b]=!0,e.warn("[$parse] Promise found in the expression `"+b+"`. Automatic unwrapping of promises in Angular expressions is deprecated."))};
return function(d){var e;switch(typeof d){case "string":if(b.hasOwnProperty(d))return b[d];e=new Nb(a);e=(new $a(e,c,a)).parse(d,!1);"hasOwnProperty"!==d&&(b[d]=e);return e;case "function":return d;default:return C}}}]}function Zd(){this.$get=["$rootScope","$exceptionHandler",function(b,a){return ze(function(a){b.$evalAsync(a)},a)}]}function ze(b,a){function c(a){return a}function d(a){return f(a)}var e=function(){var f=[],k,m;return m={resolve:function(a){if(f){var c=f;f=s;k=g(a);c.length&&b(function(){for(var a,
b=0,d=c.length;b<d;b++)a=c[b],k.then(a[0],a[1],a[2])})}},reject:function(a){m.resolve(h(a))},notify:function(a){if(f){var c=f;f.length&&b(function(){for(var b,d=0,e=c.length;d<e;d++)b=c[d],b[2](a)})}},promise:{then:function(b,g,h){var m=e(),u=function(d){try{m.resolve((P(b)?b:c)(d))}catch(e){m.reject(e),a(e)}},F=function(b){try{m.resolve((P(g)?g:d)(b))}catch(c){m.reject(c),a(c)}},v=function(b){try{m.notify((P(h)?h:c)(b))}catch(d){a(d)}};f?f.push([u,F,v]):k.then(u,F,v);return m.promise},"catch":function(a){return this.then(null,
a)},"finally":function(a){function b(a,c){var d=e();c?d.resolve(a):d.reject(a);return d.promise}function d(e,g){var f=null;try{f=(a||c)()}catch(h){return b(h,!1)}return f&&P(f.then)?f.then(function(){return b(e,g)},function(a){return b(a,!1)}):b(e,g)}return this.then(function(a){return d(a,!0)},function(a){return d(a,!1)})}}}},g=function(a){return a&&P(a.then)?a:{then:function(c){var d=e();b(function(){d.resolve(c(a))});return d.promise}}},f=function(a){var b=e();b.reject(a);return b.promise},h=function(c){return{then:function(g,
f){var h=e();b(function(){try{h.resolve((P(f)?f:d)(c))}catch(b){h.reject(b),a(b)}});return h.promise}}};return{defer:e,reject:f,when:function(h,k,m,n){var p=e(),r,z=function(b){try{return(P(k)?k:c)(b)}catch(d){return a(d),f(d)}},u=function(b){try{return(P(m)?m:d)(b)}catch(c){return a(c),f(c)}},F=function(b){try{return(P(n)?n:c)(b)}catch(d){a(d)}};b(function(){g(h).then(function(a){r||(r=!0,p.resolve(g(a).then(z,u,F)))},function(a){r||(r=!0,p.resolve(u(a)))},function(a){r||p.notify(F(a))})});return p.promise},
all:function(a){var b=e(),c=0,d=M(a)?[]:{};q(a,function(a,e){c++;g(a).then(function(a){d.hasOwnProperty(e)||(d[e]=a,--c||b.resolve(d))},function(a){d.hasOwnProperty(e)||b.reject(a)})});0===c&&b.resolve(d);return b.promise}}}function fe(){this.$get=["$window","$timeout",function(b,a){var c=b.requestAnimationFrame||b.webkitRequestAnimationFrame||b.mozRequestAnimationFrame,d=b.cancelAnimationFrame||b.webkitCancelAnimationFrame||b.mozCancelAnimationFrame||b.webkitCancelRequestAnimationFrame,e=!!c,g=e?
function(a){var b=c(a);return function(){d(b)}}:function(b){var c=a(b,16.66,!1);return function(){a.cancel(c)}};g.supported=e;return g}]}function Yd(){var b=10,a=t("$rootScope"),c=null;this.digestTtl=function(a){arguments.length&&(b=a);return b};this.$get=["$injector","$exceptionHandler","$parse","$browser",function(d,e,g,f){function h(){this.$id=bb();this.$$phase=this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null;this["this"]=this.$root=this;
this.$$destroyed=!1;this.$$asyncQueue=[];this.$$postDigestQueue=[];this.$$listeners={};this.$$listenerCount={};this.$$isolateBindings={}}function l(b){if(p.$$phase)throw a("inprog",p.$$phase);p.$$phase=b}function k(a,b){var c=g(a);Ra(c,b);return c}function m(a,b,c){do a.$$listenerCount[c]-=b,0===a.$$listenerCount[c]&&delete a.$$listenerCount[c];while(a=a.$parent)}function n(){}h.prototype={constructor:h,$new:function(a){a?(a=new h,a.$root=this.$root,a.$$asyncQueue=this.$$asyncQueue,a.$$postDigestQueue=
this.$$postDigestQueue):(a=function(){},a.prototype=this,a=new a,a.$id=bb());a["this"]=a;a.$$listeners={};a.$$listenerCount={};a.$parent=this;a.$$watchers=a.$$nextSibling=a.$$childHead=a.$$childTail=null;a.$$prevSibling=this.$$childTail;this.$$childHead?this.$$childTail=this.$$childTail.$$nextSibling=a:this.$$childHead=this.$$childTail=a;return a},$watch:function(a,b,d){var e=k(a,"watch"),g=this.$$watchers,f={fn:b,last:n,get:e,exp:a,eq:!!d};c=null;if(!P(b)){var h=k(b||C,"listener");f.fn=function(a,
b,c){h(c)}}if("string"==typeof a&&e.constant){var l=f.fn;f.fn=function(a,b,c){l.call(this,a,b,c);Oa(g,f)}}g||(g=this.$$watchers=[]);g.unshift(f);return function(){Oa(g,f);c=null}},$watchCollection:function(a,b){var c=this,d,e,f,h=1<b.length,l=0,k=g(a),m=[],n={},p=!0,q=0;return this.$watch(function(){d=k(c);var a,b;if(X(d))if(ab(d))for(e!==m&&(e=m,q=e.length=0,l++),a=d.length,q!==a&&(l++,e.length=q=a),b=0;b<a;b++)e[b]!==e[b]&&d[b]!==d[b]||e[b]===d[b]||(l++,e[b]=d[b]);else{e!==n&&(e=n={},q=0,l++);a=
0;for(b in d)d.hasOwnProperty(b)&&(a++,e.hasOwnProperty(b)?e[b]!==d[b]&&(l++,e[b]=d[b]):(q++,e[b]=d[b],l++));if(q>a)for(b in l++,e)e.hasOwnProperty(b)&&!d.hasOwnProperty(b)&&(q--,delete e[b])}else e!==d&&(e=d,l++);return l},function(){p?(p=!1,b(d,d,c)):b(d,f,c);if(h)if(X(d))if(ab(d)){f=Array(d.length);for(var a=0;a<d.length;a++)f[a]=d[a]}else for(a in f={},d)Fc.call(d,a)&&(f[a]=d[a]);else f=d})},$digest:function(){var d,g,f,h,k=this.$$asyncQueue,m=this.$$postDigestQueue,q,x,s=b,L,Q=[],y,H,R;l("$digest");
c=null;do{x=!1;for(L=this;k.length;){try{R=k.shift(),R.scope.$eval(R.expression)}catch(B){p.$$phase=null,e(B)}c=null}a:do{if(h=L.$$watchers)for(q=h.length;q--;)try{if(d=h[q])if((g=d.get(L))!==(f=d.last)&&!(d.eq?xa(g,f):"number"==typeof g&&"number"==typeof f&&isNaN(g)&&isNaN(f)))x=!0,c=d,d.last=d.eq?ba(g):g,d.fn(g,f===n?g:f,L),5>s&&(y=4-s,Q[y]||(Q[y]=[]),H=P(d.exp)?"fn: "+(d.exp.name||d.exp.toString()):d.exp,H+="; newVal: "+qa(g)+"; oldVal: "+qa(f),Q[y].push(H));else if(d===c){x=!1;break a}}catch(w){p.$$phase=
null,e(w)}if(!(h=L.$$childHead||L!==this&&L.$$nextSibling))for(;L!==this&&!(h=L.$$nextSibling);)L=L.$parent}while(L=h);if((x||k.length)&&!s--)throw p.$$phase=null,a("infdig",b,qa(Q));}while(x||k.length);for(p.$$phase=null;m.length;)try{m.shift()()}catch(T){e(T)}},$destroy:function(){if(!this.$$destroyed){var a=this.$parent;this.$broadcast("$destroy");this.$$destroyed=!0;this!==p&&(q(this.$$listenerCount,eb(null,m,this)),a.$$childHead==this&&(a.$$childHead=this.$$nextSibling),a.$$childTail==this&&
(a.$$childTail=this.$$prevSibling),this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling),this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling),this.$parent=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=this.$root=null,this.$$listeners={},this.$$watchers=this.$$asyncQueue=this.$$postDigestQueue=[],this.$destroy=this.$digest=this.$apply=C,this.$on=this.$watch=function(){return C})}},$eval:function(a,b){return g(a)(this,b)},$evalAsync:function(a){p.$$phase||
p.$$asyncQueue.length||f.defer(function(){p.$$asyncQueue.length&&p.$digest()});this.$$asyncQueue.push({scope:this,expression:a})},$$postDigest:function(a){this.$$postDigestQueue.push(a)},$apply:function(a){try{return l("$apply"),this.$eval(a)}catch(b){e(b)}finally{p.$$phase=null;try{p.$digest()}catch(c){throw e(c),c;}}},$on:function(a,b){var c=this.$$listeners[a];c||(this.$$listeners[a]=c=[]);c.push(b);var d=this;do d.$$listenerCount[a]||(d.$$listenerCount[a]=0),d.$$listenerCount[a]++;while(d=d.$parent);
var e=this;return function(){c[db(c,b)]=null;m(e,1,a)}},$emit:function(a,b){var c=[],d,g=this,f=!1,h={name:a,targetScope:g,stopPropagation:function(){f=!0},preventDefault:function(){h.defaultPrevented=!0},defaultPrevented:!1},l=[h].concat(ya.call(arguments,1)),k,m;do{d=g.$$listeners[a]||c;h.currentScope=g;k=0;for(m=d.length;k<m;k++)if(d[k])try{d[k].apply(null,l)}catch(n){e(n)}else d.splice(k,1),k--,m--;if(f)break;g=g.$parent}while(g);return h},$broadcast:function(a,b){for(var c=this,d=this,g={name:a,
targetScope:this,preventDefault:function(){g.defaultPrevented=!0},defaultPrevented:!1},f=[g].concat(ya.call(arguments,1)),h,k;c=d;){g.currentScope=c;d=c.$$listeners[a]||[];h=0;for(k=d.length;h<k;h++)if(d[h])try{d[h].apply(null,f)}catch(l){e(l)}else d.splice(h,1),h--,k--;if(!(d=c.$$listenerCount[a]&&c.$$childHead||c!==this&&c.$$nextSibling))for(;c!==this&&!(d=c.$$nextSibling);)c=c.$parent}return g}};var p=new h;return p}]}function bd(){var b=/^\s*(https?|ftp|mailto|tel|file):/,a=/^\s*(https?|ftp|file):|data:image\//;
this.aHrefSanitizationWhitelist=function(a){return B(a)?(b=a,this):b};this.imgSrcSanitizationWhitelist=function(b){return B(b)?(a=b,this):a};this.$get=function(){return function(c,d){var e=d?a:b,g;if(!S||8<=S)if(g=sa(c).href,""!==g&&!g.match(e))return"unsafe:"+g;return c}}}function Ae(b){if("self"===b)return b;if(w(b)){if(-1<b.indexOf("***"))throw ua("iwcard",b);b=b.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08").replace("\\*\\*",".*").replace("\\*","[^:/.?&;]*");return RegExp("^"+
b+"$")}if(cb(b))return RegExp("^"+b.source+"$");throw ua("imatcher");}function Gc(b){var a=[];B(b)&&q(b,function(b){a.push(Ae(b))});return a}function ae(){this.SCE_CONTEXTS=ga;var b=["self"],a=[];this.resourceUrlWhitelist=function(a){arguments.length&&(b=Gc(a));return b};this.resourceUrlBlacklist=function(b){arguments.length&&(a=Gc(b));return a};this.$get=["$injector",function(c){function d(a){var b=function(a){this.$$unwrapTrustedValue=function(){return a}};a&&(b.prototype=new a);b.prototype.valueOf=
function(){return this.$$unwrapTrustedValue()};b.prototype.toString=function(){return this.$$unwrapTrustedValue().toString()};return b}var e=function(a){throw ua("unsafe");};c.has("$sanitize")&&(e=c.get("$sanitize"));var g=d(),f={};f[ga.HTML]=d(g);f[ga.CSS]=d(g);f[ga.URL]=d(g);f[ga.JS]=d(g);f[ga.RESOURCE_URL]=d(f[ga.URL]);return{trustAs:function(a,b){var c=f.hasOwnProperty(a)?f[a]:null;if(!c)throw ua("icontext",a,b);if(null===b||b===s||""===b)return b;if("string"!==typeof b)throw ua("itype",a);return new c(b)},
getTrusted:function(c,d){if(null===d||d===s||""===d)return d;var g=f.hasOwnProperty(c)?f[c]:null;if(g&&d instanceof g)return d.$$unwrapTrustedValue();if(c===ga.RESOURCE_URL){var g=sa(d.toString()),m,n,p=!1;m=0;for(n=b.length;m<n;m++)if("self"===b[m]?Ib(g):b[m].exec(g.href)){p=!0;break}if(p)for(m=0,n=a.length;m<n;m++)if("self"===a[m]?Ib(g):a[m].exec(g.href)){p=!1;break}if(p)return d;throw ua("insecurl",d.toString());}if(c===ga.HTML)return e(d);throw ua("unsafe");},valueOf:function(a){return a instanceof
g?a.$$unwrapTrustedValue():a}}}]}function $d(){var b=!0;this.enabled=function(a){arguments.length&&(b=!!a);return b};this.$get=["$parse","$sniffer","$sceDelegate",function(a,c,d){if(b&&c.msie&&8>c.msieDocumentMode)throw ua("iequirks");var e=ba(ga);e.isEnabled=function(){return b};e.trustAs=d.trustAs;e.getTrusted=d.getTrusted;e.valueOf=d.valueOf;b||(e.trustAs=e.getTrusted=function(a,b){return b},e.valueOf=Da);e.parseAs=function(b,c){var d=a(c);return d.literal&&d.constant?d:function(a,c){return e.getTrusted(b,
d(a,c))}};var g=e.parseAs,f=e.getTrusted,h=e.trustAs;q(ga,function(a,b){var c=K(b);e[Ta("parse_as_"+c)]=function(b){return g(a,b)};e[Ta("get_trusted_"+c)]=function(b){return f(a,b)};e[Ta("trust_as_"+c)]=function(b){return h(a,b)}});return e}]}function be(){this.$get=["$window","$document",function(b,a){var c={},d=Y((/android (\d+)/.exec(K((b.navigator||{}).userAgent))||[])[1]),e=/Boxee/i.test((b.navigator||{}).userAgent),g=a[0]||{},f=g.documentMode,h,l=/^(Moz|webkit|O|ms)(?=[A-Z])/,k=g.body&&g.body.style,
m=!1,n=!1;if(k){for(var p in k)if(m=l.exec(p)){h=m[0];h=h.substr(0,1).toUpperCase()+h.substr(1);break}h||(h="WebkitOpacity"in k&&"webkit");m=!!("transition"in k||h+"Transition"in k);n=!!("animation"in k||h+"Animation"in k);!d||m&&n||(m=w(g.body.style.webkitTransition),n=w(g.body.style.webkitAnimation))}return{history:!(!b.history||!b.history.pushState||4>d||e),hashchange:"onhashchange"in b&&(!f||7<f),hasEvent:function(a){if("input"==a&&9==S)return!1;if(E(c[a])){var b=g.createElement("div");c[a]="on"+
a in b}return c[a]},csp:Vb(),vendorPrefix:h,transitions:m,animations:n,android:d,msie:S,msieDocumentMode:f}}]}function de(){this.$get=["$rootScope","$browser","$q","$exceptionHandler",function(b,a,c,d){function e(e,h,l){var k=c.defer(),m=k.promise,n=B(l)&&!l;h=a.defer(function(){try{k.resolve(e())}catch(a){k.reject(a),d(a)}finally{delete g[m.$$timeoutId]}n||b.$apply()},h);m.$$timeoutId=h;g[h]=k;return m}var g={};e.cancel=function(b){return b&&b.$$timeoutId in g?(g[b.$$timeoutId].reject("canceled"),
delete g[b.$$timeoutId],a.defer.cancel(b.$$timeoutId)):!1};return e}]}function sa(b,a){var c=b;S&&(W.setAttribute("href",c),c=W.href);W.setAttribute("href",c);return{href:W.href,protocol:W.protocol?W.protocol.replace(/:$/,""):"",host:W.host,search:W.search?W.search.replace(/^\?/,""):"",hash:W.hash?W.hash.replace(/^#/,""):"",hostname:W.hostname,port:W.port,pathname:"/"===W.pathname.charAt(0)?W.pathname:"/"+W.pathname}}function Ib(b){b=w(b)?sa(b):b;return b.protocol===Hc.protocol&&b.host===Hc.host}
function ee(){this.$get=aa(O)}function gc(b){function a(d,e){if(X(d)){var g={};q(d,function(b,c){g[c]=a(c,b)});return g}return b.factory(d+c,e)}var c="Filter";this.register=a;this.$get=["$injector",function(a){return function(b){return a.get(b+c)}}];a("currency",Ic);a("date",Jc);a("filter",Be);a("json",Ce);a("limitTo",De);a("lowercase",Ee);a("number",Kc);a("orderBy",Lc);a("uppercase",Fe)}function Be(){return function(b,a,c){if(!M(b))return b;var d=typeof c,e=[];e.check=function(a){for(var b=0;b<e.length;b++)if(!e[b](a))return!1;
return!0};"function"!==d&&(c="boolean"===d&&c?function(a,b){return Ea.equals(a,b)}:function(a,b){if(a&&b&&"object"===typeof a&&"object"===typeof b){for(var d in a)if("$"!==d.charAt(0)&&Fc.call(a,d)&&c(a[d],b[d]))return!0;return!1}b=(""+b).toLowerCase();return-1<(""+a).toLowerCase().indexOf(b)});var g=function(a,b){if("string"==typeof b&&"!"===b.charAt(0))return!g(a,b.substr(1));switch(typeof a){case "boolean":case "number":case "string":return c(a,b);case "object":switch(typeof b){case "object":return c(a,
b);default:for(var d in a)if("$"!==d.charAt(0)&&g(a[d],b))return!0}return!1;case "array":for(d=0;d<a.length;d++)if(g(a[d],b))return!0;return!1;default:return!1}};switch(typeof a){case "boolean":case "number":case "string":a={$:a};case "object":for(var f in a)(function(b){"undefined"!=typeof a[b]&&e.push(function(c){return g("$"==b?c:c&&c[b],a[b])})})(f);break;case "function":e.push(a);break;default:return b}d=[];for(f=0;f<b.length;f++){var h=b[f];e.check(h)&&d.push(h)}return d}}function Ic(b){var a=
b.NUMBER_FORMATS;return function(b,d){E(d)&&(d=a.CURRENCY_SYM);return Mc(b,a.PATTERNS[1],a.GROUP_SEP,a.DECIMAL_SEP,2).replace(/\u00A4/g,d)}}function Kc(b){var a=b.NUMBER_FORMATS;return function(b,d){return Mc(b,a.PATTERNS[0],a.GROUP_SEP,a.DECIMAL_SEP,d)}}function Mc(b,a,c,d,e){if(null==b||!isFinite(b)||X(b))return"";var g=0>b;b=Math.abs(b);var f=b+"",h="",l=[],k=!1;if(-1!==f.indexOf("e")){var m=f.match(/([\d\.]+)e(-?)(\d+)/);m&&"-"==m[2]&&m[3]>e+1?f="0":(h=f,k=!0)}if(k)0<e&&(-1<b&&1>b)&&(h=b.toFixed(e));
else{f=(f.split(Nc)[1]||"").length;E(e)&&(e=Math.min(Math.max(a.minFrac,f),a.maxFrac));f=Math.pow(10,e);b=Math.round(b*f)/f;b=(""+b).split(Nc);f=b[0];b=b[1]||"";var m=0,n=a.lgSize,p=a.gSize;if(f.length>=n+p)for(m=f.length-n,k=0;k<m;k++)0===(m-k)%p&&0!==k&&(h+=c),h+=f.charAt(k);for(k=m;k<f.length;k++)0===(f.length-k)%n&&0!==k&&(h+=c),h+=f.charAt(k);for(;b.length<e;)b+="0";e&&"0"!==e&&(h+=d+b.substr(0,e))}l.push(g?a.negPre:a.posPre);l.push(h);l.push(g?a.negSuf:a.posSuf);return l.join("")}function Ob(b,
a,c){var d="";0>b&&(d="-",b=-b);for(b=""+b;b.length<a;)b="0"+b;c&&(b=b.substr(b.length-a));return d+b}function $(b,a,c,d){c=c||0;return function(e){e=e["get"+b]();if(0<c||e>-c)e+=c;0===e&&-12==c&&(e=12);return Ob(e,a,d)}}function pb(b,a){return function(c,d){var e=c["get"+b](),g=Fa(a?"SHORT"+b:b);return d[g][e]}}function Jc(b){function a(a){var b;if(b=a.match(c)){a=new Date(0);var g=0,f=0,h=b[8]?a.setUTCFullYear:a.setFullYear,l=b[8]?a.setUTCHours:a.setHours;b[9]&&(g=Y(b[9]+b[10]),f=Y(b[9]+b[11]));
h.call(a,Y(b[1]),Y(b[2])-1,Y(b[3]));g=Y(b[4]||0)-g;f=Y(b[5]||0)-f;h=Y(b[6]||0);b=Math.round(1E3*parseFloat("0."+(b[7]||0)));l.call(a,g,f,h,b)}return a}var c=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;return function(c,e){var g="",f=[],h,l;e=e||"mediumDate";e=b.DATETIME_FORMATS[e]||e;w(c)&&(c=Ge.test(c)?Y(c):a(c));vb(c)&&(c=new Date(c));if(!Na(c))return c;for(;e;)(l=He.exec(e))?(f=f.concat(ya.call(l,1)),e=f.pop()):(f.push(e),e=null);q(f,function(a){h=
Ie[a];g+=h?h(c,b.DATETIME_FORMATS):a.replace(/(^'|'$)/g,"").replace(/''/g,"'")});return g}}function Ce(){return function(b){return qa(b,!0)}}function De(){return function(b,a){if(!M(b)&&!w(b))return b;a=Y(a);if(w(b))return a?0<=a?b.slice(0,a):b.slice(a,b.length):"";var c=[],d,e;a>b.length?a=b.length:a<-b.length&&(a=-b.length);0<a?(d=0,e=a):(d=b.length+a,e=b.length);for(;d<e;d++)c.push(b[d]);return c}}function Lc(b){return function(a,c,d){function e(a,b){return Qa(b)?function(b,c){return a(c,b)}:a}
function g(a,b){var c=typeof a,d=typeof b;return c==d?("string"==c&&(a=a.toLowerCase(),b=b.toLowerCase()),a===b?0:a<b?-1:1):c<d?-1:1}if(!M(a)||!c)return a;c=M(c)?c:[c];c=Uc(c,function(a){var c=!1,d=a||Da;if(w(a)){if("+"==a.charAt(0)||"-"==a.charAt(0))c="-"==a.charAt(0),a=a.substring(1);d=b(a);if(d.constant){var f=d();return e(function(a,b){return g(a[f],b[f])},c)}}return e(function(a,b){return g(d(a),d(b))},c)});for(var f=[],h=0;h<a.length;h++)f.push(a[h]);return f.sort(e(function(a,b){for(var d=
0;d<c.length;d++){var e=c[d](a,b);if(0!==e)return e}return 0},d))}}function va(b){P(b)&&(b={link:b});b.restrict=b.restrict||"AC";return aa(b)}function Oc(b,a,c,d){function e(a,c){c=c?"-"+fb(c,"-"):"";d.removeClass(b,(a?qb:rb)+c);d.addClass(b,(a?rb:qb)+c)}var g=this,f=b.parent().controller("form")||sb,h=0,l=g.$error={},k=[];g.$name=a.name||a.ngForm;g.$dirty=!1;g.$pristine=!0;g.$valid=!0;g.$invalid=!1;f.$addControl(g);b.addClass(La);e(!0);g.$addControl=function(a){Aa(a.$name,"input");k.push(a);a.$name&&
(g[a.$name]=a)};g.$removeControl=function(a){a.$name&&g[a.$name]===a&&delete g[a.$name];q(l,function(b,c){g.$setValidity(c,!0,a)});Oa(k,a)};g.$setValidity=function(a,b,c){var d=l[a];if(b)d&&(Oa(d,c),d.length||(h--,h||(e(b),g.$valid=!0,g.$invalid=!1),l[a]=!1,e(!0,a),f.$setValidity(a,!0,g)));else{h||e(b);if(d){if(-1!=db(d,c))return}else l[a]=d=[],h++,e(!1,a),f.$setValidity(a,!1,g);d.push(c);g.$valid=!1;g.$invalid=!0}};g.$setDirty=function(){d.removeClass(b,La);d.addClass(b,tb);g.$dirty=!0;g.$pristine=
!1;f.$setDirty()};g.$setPristine=function(){d.removeClass(b,tb);d.addClass(b,La);g.$dirty=!1;g.$pristine=!0;q(k,function(a){a.$setPristine()})}}function pa(b,a,c,d){b.$setValidity(a,c);return c?d:s}function Je(b,a,c){var d=c.prop("validity");X(d)&&b.$parsers.push(function(c){if(b.$error[a]||!(d.badInput||d.customError||d.typeMismatch)||d.valueMissing)return c;b.$setValidity(a,!1)})}function ub(b,a,c,d,e,g){var f=a.prop("validity");if(!e.android){var h=!1;a.on("compositionstart",function(a){h=!0});
a.on("compositionend",function(){h=!1;l()})}var l=function(){if(!h){var e=a.val();Qa(c.ngTrim||"T")&&(e=ca(e));if(d.$viewValue!==e||f&&""===e&&!f.valueMissing)b.$$phase?d.$setViewValue(e):b.$apply(function(){d.$setViewValue(e)})}};if(e.hasEvent("input"))a.on("input",l);else{var k,m=function(){k||(k=g.defer(function(){l();k=null}))};a.on("keydown",function(a){a=a.keyCode;91===a||(15<a&&19>a||37<=a&&40>=a)||m()});if(e.hasEvent("paste"))a.on("paste cut",m)}a.on("change",l);d.$render=function(){a.val(d.$isEmpty(d.$viewValue)?
"":d.$viewValue)};var n=c.ngPattern;n&&((e=n.match(/^\/(.*)\/([gim]*)$/))?(n=RegExp(e[1],e[2]),e=function(a){return pa(d,"pattern",d.$isEmpty(a)||n.test(a),a)}):e=function(c){var e=b.$eval(n);if(!e||!e.test)throw t("ngPattern")("noregexp",n,e,ha(a));return pa(d,"pattern",d.$isEmpty(c)||e.test(c),c)},d.$formatters.push(e),d.$parsers.push(e));if(c.ngMinlength){var p=Y(c.ngMinlength);e=function(a){return pa(d,"minlength",d.$isEmpty(a)||a.length>=p,a)};d.$parsers.push(e);d.$formatters.push(e)}if(c.ngMaxlength){var r=
Y(c.ngMaxlength);e=function(a){return pa(d,"maxlength",d.$isEmpty(a)||a.length<=r,a)};d.$parsers.push(e);d.$formatters.push(e)}}function Pb(b,a){b="ngClass"+b;return["$animate",function(c){function d(a,b){var c=[],d=0;a:for(;d<a.length;d++){for(var e=a[d],m=0;m<b.length;m++)if(e==b[m])continue a;c.push(e)}return c}function e(a){if(!M(a)){if(w(a))return a.split(" ");if(X(a)){var b=[];q(a,function(a,c){a&&b.push(c)});return b}}return a}return{restrict:"AC",link:function(g,f,h){function l(a,b){var c=
f.data("$classCounts")||{},d=[];q(a,function(a){if(0<b||c[a])c[a]=(c[a]||0)+b,c[a]===+(0<b)&&d.push(a)});f.data("$classCounts",c);return d.join(" ")}function k(b){if(!0===a||g.$index%2===a){var k=e(b||[]);if(!m){var r=l(k,1);h.$addClass(r)}else if(!xa(b,m)){var q=e(m),r=d(k,q),k=d(q,k),k=l(k,-1),r=l(r,1);0===r.length?c.removeClass(f,k):0===k.length?c.addClass(f,r):c.setClass(f,r,k)}}m=ba(b)}var m;g.$watch(h[b],k,!0);h.$observe("class",function(a){k(g.$eval(h[b]))});"ngClass"!==b&&g.$watch("$index",
function(c,d){var f=c&1;if(f!==d&1){var k=e(g.$eval(h[b]));f===a?(f=l(k,1),h.$addClass(f)):(f=l(k,-1),h.$removeClass(f))}})}}}]}var K=function(b){return w(b)?b.toLowerCase():b},Fc=Object.prototype.hasOwnProperty,Fa=function(b){return w(b)?b.toUpperCase():b},S,y,Ga,ya=[].slice,Ke=[].push,wa=Object.prototype.toString,Pa=t("ng"),Ea=O.angular||(O.angular={}),Sa,Ka,ka=["0","0","0"];S=Y((/msie (\d+)/.exec(K(navigator.userAgent))||[])[1]);isNaN(S)&&(S=Y((/trident\/.*; rv:(\d+)/.exec(K(navigator.userAgent))||
[])[1]));C.$inject=[];Da.$inject=[];var ca=function(){return String.prototype.trim?function(b){return w(b)?b.trim():b}:function(b){return w(b)?b.replace(/^\s\s*/,"").replace(/\s\s*$/,""):b}}();Ka=9>S?function(b){b=b.nodeName?b:b[0];return b.scopeName&&"HTML"!=b.scopeName?Fa(b.scopeName+":"+b.nodeName):b.nodeName}:function(b){return b.nodeName?b.nodeName:b[0].nodeName};var Xc=/[A-Z]/g,$c={full:"1.2.16",major:1,minor:2,dot:16,codeName:"badger-enumeration"},Ua=N.cache={},gb=N.expando="ng-"+(new Date).getTime(),
me=1,Pc=O.document.addEventListener?function(b,a,c){b.addEventListener(a,c,!1)}:function(b,a,c){b.attachEvent("on"+a,c)},Fb=O.document.removeEventListener?function(b,a,c){b.removeEventListener(a,c,!1)}:function(b,a,c){b.detachEvent("on"+a,c)};N._data=function(b){return this.cache[b[this.expando]]||{}};var he=/([\:\-\_]+(.))/g,ie=/^moz([A-Z])/,Bb=t("jqLite"),je=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,Cb=/<|&#?\w+;/,ke=/<([\w:]+)/,le=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,ea=
{option:[1,'<select multiple="multiple">',"</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ea.optgroup=ea.option;ea.tbody=ea.tfoot=ea.colgroup=ea.caption=ea.thead;ea.th=ea.td;var Ja=N.prototype={ready:function(b){function a(){c||(c=!0,b())}var c=!1;"complete"===U.readyState?setTimeout(a):(this.on("DOMContentLoaded",a),N(O).on("load",a))},toString:function(){var b=
[];q(this,function(a){b.push(""+a)});return"["+b.join(", ")+"]"},eq:function(b){return 0<=b?y(this[b]):y(this[this.length+b])},length:0,push:Ke,sort:[].sort,splice:[].splice},kb={};q("multiple selected checked disabled readOnly required open".split(" "),function(b){kb[K(b)]=b});var nc={};q("input select option textarea button form details".split(" "),function(b){nc[Fa(b)]=!0});q({data:jc,inheritedData:jb,scope:function(b){return y(b).data("$scope")||jb(b.parentNode||b,["$isolateScope","$scope"])},
isolateScope:function(b){return y(b).data("$isolateScope")||y(b).data("$isolateScopeNoTemplate")},controller:kc,injector:function(b){return jb(b,"$injector")},removeAttr:function(b,a){b.removeAttribute(a)},hasClass:Gb,css:function(b,a,c){a=Ta(a);if(B(c))b.style[a]=c;else{var d;8>=S&&(d=b.currentStyle&&b.currentStyle[a],""===d&&(d="auto"));d=d||b.style[a];8>=S&&(d=""===d?s:d);return d}},attr:function(b,a,c){var d=K(a);if(kb[d])if(B(c))c?(b[a]=!0,b.setAttribute(a,d)):(b[a]=!1,b.removeAttribute(d));
else return b[a]||(b.attributes.getNamedItem(a)||C).specified?d:s;else if(B(c))b.setAttribute(a,c);else if(b.getAttribute)return b=b.getAttribute(a,2),null===b?s:b},prop:function(b,a,c){if(B(c))b[a]=c;else return b[a]},text:function(){function b(b,d){var e=a[b.nodeType];if(E(d))return e?b[e]:"";b[e]=d}var a=[];9>S?(a[1]="innerText",a[3]="nodeValue"):a[1]=a[3]="textContent";b.$dv="";return b}(),val:function(b,a){if(E(a)){if("SELECT"===Ka(b)&&b.multiple){var c=[];q(b.options,function(a){a.selected&&
c.push(a.value||a.text)});return 0===c.length?null:c}return b.value}b.value=a},html:function(b,a){if(E(a))return b.innerHTML;for(var c=0,d=b.childNodes;c<d.length;c++)Ha(d[c]);b.innerHTML=a},empty:lc},function(b,a){N.prototype[a]=function(a,d){var e,g;if(b!==lc&&(2==b.length&&b!==Gb&&b!==kc?a:d)===s){if(X(a)){for(e=0;e<this.length;e++)if(b===jc)b(this[e],a);else for(g in a)b(this[e],g,a[g]);return this}e=b.$dv;g=e===s?Math.min(this.length,1):this.length;for(var f=0;f<g;f++){var h=b(this[f],a,d);e=
e?e+h:h}return e}for(e=0;e<this.length;e++)b(this[e],a,d);return this}});q({removeData:hc,dealoc:Ha,on:function a(c,d,e,g){if(B(g))throw Bb("onargs");var f=la(c,"events"),h=la(c,"handle");f||la(c,"events",f={});h||la(c,"handle",h=ne(c,f));q(d.split(" "),function(d){var g=f[d];if(!g){if("mouseenter"==d||"mouseleave"==d){var m=U.body.contains||U.body.compareDocumentPosition?function(a,c){var d=9===a.nodeType?a.documentElement:a,e=c&&c.parentNode;return a===e||!!(e&&1===e.nodeType&&(d.contains?d.contains(e):
a.compareDocumentPosition&&a.compareDocumentPosition(e)&16))}:function(a,c){if(c)for(;c=c.parentNode;)if(c===a)return!0;return!1};f[d]=[];a(c,{mouseleave:"mouseout",mouseenter:"mouseover"}[d],function(a){var c=a.relatedTarget;c&&(c===this||m(this,c))||h(a,d)})}else Pc(c,d,h),f[d]=[];g=f[d]}g.push(e)})},off:ic,one:function(a,c,d){a=y(a);a.on(c,function g(){a.off(c,d);a.off(c,g)});a.on(c,d)},replaceWith:function(a,c){var d,e=a.parentNode;Ha(a);q(new N(c),function(c){d?e.insertBefore(c,d.nextSibling):
e.replaceChild(c,a);d=c})},children:function(a){var c=[];q(a.childNodes,function(a){1===a.nodeType&&c.push(a)});return c},contents:function(a){return a.contentDocument||a.childNodes||[]},append:function(a,c){q(new N(c),function(c){1!==a.nodeType&&11!==a.nodeType||a.appendChild(c)})},prepend:function(a,c){if(1===a.nodeType){var d=a.firstChild;q(new N(c),function(c){a.insertBefore(c,d)})}},wrap:function(a,c){c=y(c)[0];var d=a.parentNode;d&&d.replaceChild(c,a);c.appendChild(a)},remove:function(a){Ha(a);
var c=a.parentNode;c&&c.removeChild(a)},after:function(a,c){var d=a,e=a.parentNode;q(new N(c),function(a){e.insertBefore(a,d.nextSibling);d=a})},addClass:ib,removeClass:hb,toggleClass:function(a,c,d){c&&q(c.split(" "),function(c){var g=d;E(g)&&(g=!Gb(a,c));(g?ib:hb)(a,c)})},parent:function(a){return(a=a.parentNode)&&11!==a.nodeType?a:null},next:function(a){if(a.nextElementSibling)return a.nextElementSibling;for(a=a.nextSibling;null!=a&&1!==a.nodeType;)a=a.nextSibling;return a},find:function(a,c){return a.getElementsByTagName?
a.getElementsByTagName(c):[]},clone:Eb,triggerHandler:function(a,c,d){c=(la(a,"events")||{})[c];d=d||[];var e=[{preventDefault:C,stopPropagation:C}];q(c,function(c){c.apply(a,e.concat(d))})}},function(a,c){N.prototype[c]=function(c,e,g){for(var f,h=0;h<this.length;h++)E(f)?(f=a(this[h],c,e,g),B(f)&&(f=y(f))):Db(f,a(this[h],c,e,g));return B(f)?f:this};N.prototype.bind=N.prototype.on;N.prototype.unbind=N.prototype.off});Va.prototype={put:function(a,c){this[Ia(a)]=c},get:function(a){return this[Ia(a)]},
remove:function(a){var c=this[a=Ia(a)];delete this[a];return c}};var pe=/^function\s*[^\(]*\(\s*([^\)]*)\)/m,qe=/,/,re=/^\s*(_?)(\S+?)\1\s*$/,oe=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,Wa=t("$injector"),Le=t("$animate"),Ld=["$provide",function(a){this.$$selectors={};this.register=function(c,d){var e=c+"-animation";if(c&&"."!=c.charAt(0))throw Le("notcsel",c);this.$$selectors[c.substr(1)]=e;a.factory(e,d)};this.classNameFilter=function(a){1===arguments.length&&(this.$$classNameFilter=a instanceof RegExp?
a:null);return this.$$classNameFilter};this.$get=["$timeout","$$asyncCallback",function(a,d){return{enter:function(a,c,f,h){f?f.after(a):(c&&c[0]||(c=f.parent()),c.append(a));h&&d(h)},leave:function(a,c){a.remove();c&&d(c)},move:function(a,c,d,h){this.enter(a,c,d,h)},addClass:function(a,c,f){c=w(c)?c:M(c)?c.join(" "):"";q(a,function(a){ib(a,c)});f&&d(f)},removeClass:function(a,c,f){c=w(c)?c:M(c)?c.join(" "):"";q(a,function(a){hb(a,c)});f&&d(f)},setClass:function(a,c,f,h){q(a,function(a){ib(a,c);hb(a,
f)});h&&d(h)},enabled:C}}]}],ja=t("$compile");cc.$inject=["$provide","$$sanitizeUriProvider"];var te=/^(x[\:\-_]|data[\:\-_])/i,vc=t("$interpolate"),Me=/^([^\?#]*)(\?([^#]*))?(#(.*))?$/,we={http:80,https:443,ftp:21},Kb=t("$location");Ac.prototype=Lb.prototype=zc.prototype={$$html5:!1,$$replace:!1,absUrl:nb("$$absUrl"),url:function(a,c){if(E(a))return this.$$url;var d=Me.exec(a);d[1]&&this.path(decodeURIComponent(d[1]));(d[2]||d[1])&&this.search(d[3]||"");this.hash(d[5]||"",c);return this},protocol:nb("$$protocol"),
host:nb("$$host"),port:nb("$$port"),path:Bc("$$path",function(a){return"/"==a.charAt(0)?a:"/"+a}),search:function(a,c){switch(arguments.length){case 0:return this.$$search;case 1:if(w(a))this.$$search=Yb(a);else if(X(a))this.$$search=a;else throw Kb("isrcharg");break;default:E(c)||null===c?delete this.$$search[a]:this.$$search[a]=c}this.$$compose();return this},hash:Bc("$$hash",Da),replace:function(){this.$$replace=!0;return this}};var Ba=t("$parse"),Ec={},ta,Ma={"null":function(){return null},"true":function(){return!0},
"false":function(){return!1},undefined:C,"+":function(a,c,d,e){d=d(a,c);e=e(a,c);return B(d)?B(e)?d+e:d:B(e)?e:s},"-":function(a,c,d,e){d=d(a,c);e=e(a,c);return(B(d)?d:0)-(B(e)?e:0)},"*":function(a,c,d,e){return d(a,c)*e(a,c)},"/":function(a,c,d,e){return d(a,c)/e(a,c)},"%":function(a,c,d,e){return d(a,c)%e(a,c)},"^":function(a,c,d,e){return d(a,c)^e(a,c)},"=":C,"===":function(a,c,d,e){return d(a,c)===e(a,c)},"!==":function(a,c,d,e){return d(a,c)!==e(a,c)},"==":function(a,c,d,e){return d(a,c)==e(a,
c)},"!=":function(a,c,d,e){return d(a,c)!=e(a,c)},"<":function(a,c,d,e){return d(a,c)<e(a,c)},">":function(a,c,d,e){return d(a,c)>e(a,c)},"<=":function(a,c,d,e){return d(a,c)<=e(a,c)},">=":function(a,c,d,e){return d(a,c)>=e(a,c)},"&&":function(a,c,d,e){return d(a,c)&&e(a,c)},"||":function(a,c,d,e){return d(a,c)||e(a,c)},"&":function(a,c,d,e){return d(a,c)&e(a,c)},"|":function(a,c,d,e){return e(a,c)(a,c,d(a,c))},"!":function(a,c,d){return!d(a,c)}},Ne={n:"\n",f:"\f",r:"\r",t:"\t",v:"\v","'":"'",'"':'"'},
Nb=function(a){this.options=a};Nb.prototype={constructor:Nb,lex:function(a){this.text=a;this.index=0;this.ch=s;this.lastCh=":";this.tokens=[];var c;for(a=[];this.index<this.text.length;){this.ch=this.text.charAt(this.index);if(this.is("\"'"))this.readString(this.ch);else if(this.isNumber(this.ch)||this.is(".")&&this.isNumber(this.peek()))this.readNumber();else if(this.isIdent(this.ch))this.readIdent(),this.was("{,")&&("{"===a[0]&&(c=this.tokens[this.tokens.length-1]))&&(c.json=-1===c.text.indexOf("."));
else if(this.is("(){}[].,;:?"))this.tokens.push({index:this.index,text:this.ch,json:this.was(":[,")&&this.is("{[")||this.is("}]:,")}),this.is("{[")&&a.unshift(this.ch),this.is("}]")&&a.shift(),this.index++;else if(this.isWhitespace(this.ch)){this.index++;continue}else{var d=this.ch+this.peek(),e=d+this.peek(2),g=Ma[this.ch],f=Ma[d],h=Ma[e];h?(this.tokens.push({index:this.index,text:e,fn:h}),this.index+=3):f?(this.tokens.push({index:this.index,text:d,fn:f}),this.index+=2):g?(this.tokens.push({index:this.index,
text:this.ch,fn:g,json:this.was("[,:")&&this.is("+-")}),this.index+=1):this.throwError("Unexpected next character ",this.index,this.index+1)}this.lastCh=this.ch}return this.tokens},is:function(a){return-1!==a.indexOf(this.ch)},was:function(a){return-1!==a.indexOf(this.lastCh)},peek:function(a){a=a||1;return this.index+a<this.text.length?this.text.charAt(this.index+a):!1},isNumber:function(a){return"0"<=a&&"9">=a},isWhitespace:function(a){return" "===a||"\r"===a||"\t"===a||"\n"===a||"\v"===a||"\u00a0"===
a},isIdent:function(a){return"a"<=a&&"z">=a||"A"<=a&&"Z">=a||"_"===a||"$"===a},isExpOperator:function(a){return"-"===a||"+"===a||this.isNumber(a)},throwError:function(a,c,d){d=d||this.index;c=B(c)?"s "+c+"-"+this.index+" ["+this.text.substring(c,d)+"]":" "+d;throw Ba("lexerr",a,c,this.text);},readNumber:function(){for(var a="",c=this.index;this.index<this.text.length;){var d=K(this.text.charAt(this.index));if("."==d||this.isNumber(d))a+=d;else{var e=this.peek();if("e"==d&&this.isExpOperator(e))a+=
d;else if(this.isExpOperator(d)&&e&&this.isNumber(e)&&"e"==a.charAt(a.length-1))a+=d;else if(!this.isExpOperator(d)||e&&this.isNumber(e)||"e"!=a.charAt(a.length-1))break;else this.throwError("Invalid exponent")}this.index++}a*=1;this.tokens.push({index:c,text:a,json:!0,fn:function(){return a}})},readIdent:function(){for(var a=this,c="",d=this.index,e,g,f,h;this.index<this.text.length;){h=this.text.charAt(this.index);if("."===h||this.isIdent(h)||this.isNumber(h))"."===h&&(e=this.index),c+=h;else break;
this.index++}if(e)for(g=this.index;g<this.text.length;){h=this.text.charAt(g);if("("===h){f=c.substr(e-d+1);c=c.substr(0,e-d);this.index=g;break}if(this.isWhitespace(h))g++;else break}d={index:d,text:c};if(Ma.hasOwnProperty(c))d.fn=Ma[c],d.json=Ma[c];else{var l=Dc(c,this.options,this.text);d.fn=D(function(a,c){return l(a,c)},{assign:function(d,e){return ob(d,c,e,a.text,a.options)}})}this.tokens.push(d);f&&(this.tokens.push({index:e,text:".",json:!1}),this.tokens.push({index:e+1,text:f,json:!1}))},
readString:function(a){var c=this.index;this.index++;for(var d="",e=a,g=!1;this.index<this.text.length;){var f=this.text.charAt(this.index),e=e+f;if(g)"u"===f?(f=this.text.substring(this.index+1,this.index+5),f.match(/[\da-f]{4}/i)||this.throwError("Invalid unicode escape [\\u"+f+"]"),this.index+=4,d+=String.fromCharCode(parseInt(f,16))):d=(g=Ne[f])?d+g:d+f,g=!1;else if("\\"===f)g=!0;else{if(f===a){this.index++;this.tokens.push({index:c,text:e,string:d,json:!0,fn:function(){return d}});return}d+=
f}this.index++}this.throwError("Unterminated quote",c)}};var $a=function(a,c,d){this.lexer=a;this.$filter=c;this.options=d};$a.ZERO=D(function(){return 0},{constant:!0});$a.prototype={constructor:$a,parse:function(a,c){this.text=a;this.json=c;this.tokens=this.lexer.lex(a);c&&(this.assignment=this.logicalOR,this.functionCall=this.fieldAccess=this.objectIndex=this.filterChain=function(){this.throwError("is not valid json",{text:a,index:0})});var d=c?this.primary():this.statements();0!==this.tokens.length&&
this.throwError("is an unexpected token",this.tokens[0]);d.literal=!!d.literal;d.constant=!!d.constant;return d},primary:function(){var a;if(this.expect("("))a=this.filterChain(),this.consume(")");else if(this.expect("["))a=this.arrayDeclaration();else if(this.expect("{"))a=this.object();else{var c=this.expect();(a=c.fn)||this.throwError("not a primary expression",c);c.json&&(a.constant=!0,a.literal=!0)}for(var d;c=this.expect("(","[",".");)"("===c.text?(a=this.functionCall(a,d),d=null):"["===c.text?
(d=a,a=this.objectIndex(a)):"."===c.text?(d=a,a=this.fieldAccess(a)):this.throwError("IMPOSSIBLE");return a},throwError:function(a,c){throw Ba("syntax",c.text,a,c.index+1,this.text,this.text.substring(c.index));},peekToken:function(){if(0===this.tokens.length)throw Ba("ueoe",this.text);return this.tokens[0]},peek:function(a,c,d,e){if(0<this.tokens.length){var g=this.tokens[0],f=g.text;if(f===a||f===c||f===d||f===e||!(a||c||d||e))return g}return!1},expect:function(a,c,d,e){return(a=this.peek(a,c,d,
e))?(this.json&&!a.json&&this.throwError("is not valid json",a),this.tokens.shift(),a):!1},consume:function(a){this.expect(a)||this.throwError("is unexpected, expecting ["+a+"]",this.peek())},unaryFn:function(a,c){return D(function(d,e){return a(d,e,c)},{constant:c.constant})},ternaryFn:function(a,c,d){return D(function(e,g){return a(e,g)?c(e,g):d(e,g)},{constant:a.constant&&c.constant&&d.constant})},binaryFn:function(a,c,d){return D(function(e,g){return c(e,g,a,d)},{constant:a.constant&&d.constant})},
statements:function(){for(var a=[];;)if(0<this.tokens.length&&!this.peek("}",")",";","]")&&a.push(this.filterChain()),!this.expect(";"))return 1===a.length?a[0]:function(c,d){for(var e,g=0;g<a.length;g++){var f=a[g];f&&(e=f(c,d))}return e}},filterChain:function(){for(var a=this.expression(),c;;)if(c=this.expect("|"))a=this.binaryFn(a,c.fn,this.filter());else return a},filter:function(){for(var a=this.expect(),c=this.$filter(a.text),d=[];;)if(a=this.expect(":"))d.push(this.expression());else{var e=
function(a,e,h){h=[h];for(var l=0;l<d.length;l++)h.push(d[l](a,e));return c.apply(a,h)};return function(){return e}}},expression:function(){return this.assignment()},assignment:function(){var a=this.ternary(),c,d;return(d=this.expect("="))?(a.assign||this.throwError("implies assignment but ["+this.text.substring(0,d.index)+"] can not be assigned to",d),c=this.ternary(),function(d,g){return a.assign(d,c(d,g),g)}):a},ternary:function(){var a=this.logicalOR(),c,d;if(this.expect("?")){c=this.ternary();
if(d=this.expect(":"))return this.ternaryFn(a,c,this.ternary());this.throwError("expected :",d)}else return a},logicalOR:function(){for(var a=this.logicalAND(),c;;)if(c=this.expect("||"))a=this.binaryFn(a,c.fn,this.logicalAND());else return a},logicalAND:function(){var a=this.equality(),c;if(c=this.expect("&&"))a=this.binaryFn(a,c.fn,this.logicalAND());return a},equality:function(){var a=this.relational(),c;if(c=this.expect("==","!=","===","!=="))a=this.binaryFn(a,c.fn,this.equality());return a},
relational:function(){var a=this.additive(),c;if(c=this.expect("<",">","<=",">="))a=this.binaryFn(a,c.fn,this.relational());return a},additive:function(){for(var a=this.multiplicative(),c;c=this.expect("+","-");)a=this.binaryFn(a,c.fn,this.multiplicative());return a},multiplicative:function(){for(var a=this.unary(),c;c=this.expect("*","/","%");)a=this.binaryFn(a,c.fn,this.unary());return a},unary:function(){var a;return this.expect("+")?this.primary():(a=this.expect("-"))?this.binaryFn($a.ZERO,a.fn,
this.unary()):(a=this.expect("!"))?this.unaryFn(a.fn,this.unary()):this.primary()},fieldAccess:function(a){var c=this,d=this.expect().text,e=Dc(d,this.options,this.text);return D(function(c,d,h){return e(h||a(c,d))},{assign:function(e,f,h){return ob(a(e,h),d,f,c.text,c.options)}})},objectIndex:function(a){var c=this,d=this.expression();this.consume("]");return D(function(e,g){var f=a(e,g),h=d(e,g),l;if(!f)return s;(f=Za(f[h],c.text))&&(f.then&&c.options.unwrapPromises)&&(l=f,"$$v"in f||(l.$$v=s,l.then(function(a){l.$$v=
a})),f=f.$$v);return f},{assign:function(e,g,f){var h=d(e,f);return Za(a(e,f),c.text)[h]=g}})},functionCall:function(a,c){var d=[];if(")"!==this.peekToken().text){do d.push(this.expression());while(this.expect(","))}this.consume(")");var e=this;return function(g,f){for(var h=[],l=c?c(g,f):g,k=0;k<d.length;k++)h.push(d[k](g,f));k=a(g,f,l)||C;Za(l,e.text);Za(k,e.text);h=k.apply?k.apply(l,h):k(h[0],h[1],h[2],h[3],h[4]);return Za(h,e.text)}},arrayDeclaration:function(){var a=[],c=!0;if("]"!==this.peekToken().text){do{if(this.peek("]"))break;
var d=this.expression();a.push(d);d.constant||(c=!1)}while(this.expect(","))}this.consume("]");return D(function(c,d){for(var f=[],h=0;h<a.length;h++)f.push(a[h](c,d));return f},{literal:!0,constant:c})},object:function(){var a=[],c=!0;if("}"!==this.peekToken().text){do{if(this.peek("}"))break;var d=this.expect(),d=d.string||d.text;this.consume(":");var e=this.expression();a.push({key:d,value:e});e.constant||(c=!1)}while(this.expect(","))}this.consume("}");return D(function(c,d){for(var e={},l=0;l<
a.length;l++){var k=a[l];e[k.key]=k.value(c,d)}return e},{literal:!0,constant:c})}};var Mb={},ua=t("$sce"),ga={HTML:"html",CSS:"css",URL:"url",RESOURCE_URL:"resourceUrl",JS:"js"},W=U.createElement("a"),Hc=sa(O.location.href,!0);gc.$inject=["$provide"];Ic.$inject=["$locale"];Kc.$inject=["$locale"];var Nc=".",Ie={yyyy:$("FullYear",4),yy:$("FullYear",2,0,!0),y:$("FullYear",1),MMMM:pb("Month"),MMM:pb("Month",!0),MM:$("Month",2,1),M:$("Month",1,1),dd:$("Date",2),d:$("Date",1),HH:$("Hours",2),H:$("Hours",
1),hh:$("Hours",2,-12),h:$("Hours",1,-12),mm:$("Minutes",2),m:$("Minutes",1),ss:$("Seconds",2),s:$("Seconds",1),sss:$("Milliseconds",3),EEEE:pb("Day"),EEE:pb("Day",!0),a:function(a,c){return 12>a.getHours()?c.AMPMS[0]:c.AMPMS[1]},Z:function(a){a=-1*a.getTimezoneOffset();return a=(0<=a?"+":"")+(Ob(Math[0<a?"floor":"ceil"](a/60),2)+Ob(Math.abs(a%60),2))}},He=/((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/,Ge=/^\-?\d+$/;Jc.$inject=["$locale"];var Ee=aa(K),Fe=aa(Fa);Lc.$inject=
["$parse"];var cd=aa({restrict:"E",compile:function(a,c){8>=S&&(c.href||c.name||c.$set("href",""),a.append(U.createComment("IE fix")));if(!c.href&&!c.xlinkHref&&!c.name)return function(a,c){var g="[object SVGAnimatedString]"===wa.call(c.prop("href"))?"xlink:href":"href";c.on("click",function(a){c.attr(g)||a.preventDefault()})}}}),zb={};q(kb,function(a,c){if("multiple"!=a){var d=na("ng-"+c);zb[d]=function(){return{priority:100,link:function(a,g,f){a.$watch(f[d],function(a){f.$set(c,!!a)})}}}}});q(["src",
"srcset","href"],function(a){var c=na("ng-"+a);zb[c]=function(){return{priority:99,link:function(d,e,g){var f=a,h=a;"href"===a&&"[object SVGAnimatedString]"===wa.call(e.prop("href"))&&(h="xlinkHref",g.$attr[h]="xlink:href",f=null);g.$observe(c,function(a){a&&(g.$set(h,a),S&&f&&e.prop(f,g[h]))})}}}});var sb={$addControl:C,$removeControl:C,$setValidity:C,$setDirty:C,$setPristine:C};Oc.$inject=["$element","$attrs","$scope","$animate"];var Qc=function(a){return["$timeout",function(c){return{name:"form",
restrict:a?"EAC":"E",controller:Oc,compile:function(){return{pre:function(a,e,g,f){if(!g.action){var h=function(a){a.preventDefault?a.preventDefault():a.returnValue=!1};Pc(e[0],"submit",h);e.on("$destroy",function(){c(function(){Fb(e[0],"submit",h)},0,!1)})}var l=e.parent().controller("form"),k=g.name||g.ngForm;k&&ob(a,k,f,k);if(l)e.on("$destroy",function(){l.$removeControl(f);k&&ob(a,k,s,k);D(f,sb)})}}}}}]},dd=Qc(),qd=Qc(!0),Oe=/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
Pe=/^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i,Qe=/^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,Rc={text:ub,number:function(a,c,d,e,g,f){ub(a,c,d,e,g,f);e.$parsers.push(function(a){var c=e.$isEmpty(a);if(c||Qe.test(a))return e.$setValidity("number",!0),""===a?null:c?a:parseFloat(a);e.$setValidity("number",!1);return s});Je(e,"number",c);e.$formatters.push(function(a){return e.$isEmpty(a)?"":""+a});d.min&&(a=function(a){var c=parseFloat(d.min);return pa(e,"min",e.$isEmpty(a)||a>=c,a)},e.$parsers.push(a),
e.$formatters.push(a));d.max&&(a=function(a){var c=parseFloat(d.max);return pa(e,"max",e.$isEmpty(a)||a<=c,a)},e.$parsers.push(a),e.$formatters.push(a));e.$formatters.push(function(a){return pa(e,"number",e.$isEmpty(a)||vb(a),a)})},url:function(a,c,d,e,g,f){ub(a,c,d,e,g,f);a=function(a){return pa(e,"url",e.$isEmpty(a)||Oe.test(a),a)};e.$formatters.push(a);e.$parsers.push(a)},email:function(a,c,d,e,g,f){ub(a,c,d,e,g,f);a=function(a){return pa(e,"email",e.$isEmpty(a)||Pe.test(a),a)};e.$formatters.push(a);
e.$parsers.push(a)},radio:function(a,c,d,e){E(d.name)&&c.attr("name",bb());c.on("click",function(){c[0].checked&&a.$apply(function(){e.$setViewValue(d.value)})});e.$render=function(){c[0].checked=d.value==e.$viewValue};d.$observe("value",e.$render)},checkbox:function(a,c,d,e){var g=d.ngTrueValue,f=d.ngFalseValue;w(g)||(g=!0);w(f)||(f=!1);c.on("click",function(){a.$apply(function(){e.$setViewValue(c[0].checked)})});e.$render=function(){c[0].checked=e.$viewValue};e.$isEmpty=function(a){return a!==g};
e.$formatters.push(function(a){return a===g});e.$parsers.push(function(a){return a?g:f})},hidden:C,button:C,submit:C,reset:C,file:C},dc=["$browser","$sniffer",function(a,c){return{restrict:"E",require:"?ngModel",link:function(d,e,g,f){f&&(Rc[K(g.type)]||Rc.text)(d,e,g,f,c,a)}}}],rb="ng-valid",qb="ng-invalid",La="ng-pristine",tb="ng-dirty",Re=["$scope","$exceptionHandler","$attrs","$element","$parse","$animate",function(a,c,d,e,g,f){function h(a,c){c=c?"-"+fb(c,"-"):"";f.removeClass(e,(a?qb:rb)+c);
f.addClass(e,(a?rb:qb)+c)}this.$modelValue=this.$viewValue=Number.NaN;this.$parsers=[];this.$formatters=[];this.$viewChangeListeners=[];this.$pristine=!0;this.$dirty=!1;this.$valid=!0;this.$invalid=!1;this.$name=d.name;var l=g(d.ngModel),k=l.assign;if(!k)throw t("ngModel")("nonassign",d.ngModel,ha(e));this.$render=C;this.$isEmpty=function(a){return E(a)||""===a||null===a||a!==a};var m=e.inheritedData("$formController")||sb,n=0,p=this.$error={};e.addClass(La);h(!0);this.$setValidity=function(a,c){p[a]!==
!c&&(c?(p[a]&&n--,n||(h(!0),this.$valid=!0,this.$invalid=!1)):(h(!1),this.$invalid=!0,this.$valid=!1,n++),p[a]=!c,h(c,a),m.$setValidity(a,c,this))};this.$setPristine=function(){this.$dirty=!1;this.$pristine=!0;f.removeClass(e,tb);f.addClass(e,La)};this.$setViewValue=function(d){this.$viewValue=d;this.$pristine&&(this.$dirty=!0,this.$pristine=!1,f.removeClass(e,La),f.addClass(e,tb),m.$setDirty());q(this.$parsers,function(a){d=a(d)});this.$modelValue!==d&&(this.$modelValue=d,k(a,d),q(this.$viewChangeListeners,
function(a){try{a()}catch(d){c(d)}}))};var r=this;a.$watch(function(){var c=l(a);if(r.$modelValue!==c){var d=r.$formatters,e=d.length;for(r.$modelValue=c;e--;)c=d[e](c);r.$viewValue!==c&&(r.$viewValue=c,r.$render())}return c})}],Fd=function(){return{require:["ngModel","^?form"],controller:Re,link:function(a,c,d,e){var g=e[0],f=e[1]||sb;f.$addControl(g);a.$on("$destroy",function(){f.$removeControl(g)})}}},Hd=aa({require:"ngModel",link:function(a,c,d,e){e.$viewChangeListeners.push(function(){a.$eval(d.ngChange)})}}),
ec=function(){return{require:"?ngModel",link:function(a,c,d,e){if(e){d.required=!0;var g=function(a){if(d.required&&e.$isEmpty(a))e.$setValidity("required",!1);else return e.$setValidity("required",!0),a};e.$formatters.push(g);e.$parsers.unshift(g);d.$observe("required",function(){g(e.$viewValue)})}}}},Gd=function(){return{require:"ngModel",link:function(a,c,d,e){var g=(a=/\/(.*)\//.exec(d.ngList))&&RegExp(a[1])||d.ngList||",";e.$parsers.push(function(a){if(!E(a)){var c=[];a&&q(a.split(g),function(a){a&&
c.push(ca(a))});return c}});e.$formatters.push(function(a){return M(a)?a.join(", "):s});e.$isEmpty=function(a){return!a||!a.length}}}},Se=/^(true|false|\d+)$/,Id=function(){return{priority:100,compile:function(a,c){return Se.test(c.ngValue)?function(a,c,g){g.$set("value",a.$eval(g.ngValue))}:function(a,c,g){a.$watch(g.ngValue,function(a){g.$set("value",a)})}}}},id=va(function(a,c,d){c.addClass("ng-binding").data("$binding",d.ngBind);a.$watch(d.ngBind,function(a){c.text(a==s?"":a)})}),kd=["$interpolate",
function(a){return function(c,d,e){c=a(d.attr(e.$attr.ngBindTemplate));d.addClass("ng-binding").data("$binding",c);e.$observe("ngBindTemplate",function(a){d.text(a)})}}],jd=["$sce","$parse",function(a,c){return function(d,e,g){e.addClass("ng-binding").data("$binding",g.ngBindHtml);var f=c(g.ngBindHtml);d.$watch(function(){return(f(d)||"").toString()},function(c){e.html(a.getTrustedHtml(f(d))||"")})}}],ld=Pb("",!0),nd=Pb("Odd",0),md=Pb("Even",1),od=va({compile:function(a,c){c.$set("ngCloak",s);a.removeClass("ng-cloak")}}),
pd=[function(){return{scope:!0,controller:"@",priority:500}}],fc={};q("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),function(a){var c=na("ng-"+a);fc[c]=["$parse",function(d){return{compile:function(e,g){var f=d(g[c]);return function(c,d,e){d.on(K(a),function(a){c.$apply(function(){f(c,{$event:a})})})}}}}]});var sd=["$animate",function(a){return{transclude:"element",priority:600,terminal:!0,restrict:"A",
$$tlb:!0,link:function(c,d,e,g,f){var h,l,k;c.$watch(e.ngIf,function(g){Qa(g)?l||(l=c.$new(),f(l,function(c){c[c.length++]=U.createComment(" end ngIf: "+e.ngIf+" ");h={clone:c};a.enter(c,d.parent(),d)})):(k&&(k.remove(),k=null),l&&(l.$destroy(),l=null),h&&(k=yb(h.clone),a.leave(k,function(){k=null}),h=null))})}}}],td=["$http","$templateCache","$anchorScroll","$animate","$sce",function(a,c,d,e,g){return{restrict:"ECA",priority:400,terminal:!0,transclude:"element",controller:Ea.noop,compile:function(f,
h){var l=h.ngInclude||h.src,k=h.onload||"",m=h.autoscroll;return function(f,h,q,s,u){var F=0,v,y,A,x=function(){y&&(y.remove(),y=null);v&&(v.$destroy(),v=null);A&&(e.leave(A,function(){y=null}),y=A,A=null)};f.$watch(g.parseAsResourceUrl(l),function(g){var l=function(){!B(m)||m&&!f.$eval(m)||d()},q=++F;g?(a.get(g,{cache:c}).success(function(a){if(q===F){var c=f.$new();s.template=a;a=u(c,function(a){x();e.enter(a,null,h,l)});v=c;A=a;v.$emit("$includeContentLoaded");f.$eval(k)}}).error(function(){q===
F&&x()}),f.$emit("$includeContentRequested")):(x(),s.template=null)})}}}}],Jd=["$compile",function(a){return{restrict:"ECA",priority:-400,require:"ngInclude",link:function(c,d,e,g){d.html(g.template);a(d.contents())(c)}}}],ud=va({priority:450,compile:function(){return{pre:function(a,c,d){a.$eval(d.ngInit)}}}}),vd=va({terminal:!0,priority:1E3}),wd=["$locale","$interpolate",function(a,c){var d=/{}/g;return{restrict:"EA",link:function(e,g,f){var h=f.count,l=f.$attr.when&&g.attr(f.$attr.when),k=f.offset||
0,m=e.$eval(l)||{},n={},p=c.startSymbol(),r=c.endSymbol(),s=/^when(Minus)?(.+)$/;q(f,function(a,c){s.test(c)&&(m[K(c.replace("when","").replace("Minus","-"))]=g.attr(f.$attr[c]))});q(m,function(a,e){n[e]=c(a.replace(d,p+h+"-"+k+r))});e.$watch(function(){var c=parseFloat(e.$eval(h));if(isNaN(c))return"";c in m||(c=a.pluralCat(c-k));return n[c](e,g,!0)},function(a){g.text(a)})}}}],xd=["$parse","$animate",function(a,c){var d=t("ngRepeat");return{transclude:"element",priority:1E3,terminal:!0,$$tlb:!0,
link:function(e,g,f,h,l){var k=f.ngRepeat,m=k.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/),n,p,r,s,u,F,v={$id:Ia};if(!m)throw d("iexp",k);f=m[1];h=m[2];(m=m[3])?(n=a(m),p=function(a,c,d){F&&(v[F]=a);v[u]=c;v.$index=d;return n(e,v)}):(r=function(a,c){return Ia(c)},s=function(a){return a});m=f.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);if(!m)throw d("iidexp",f);u=m[3]||m[1];F=m[2];var B={};e.$watchCollection(h,function(a){var f,h,m=g[0],n,v={},H,R,w,C,T,t,
E=[];if(ab(a))T=a,n=p||r;else{n=p||s;T=[];for(w in a)a.hasOwnProperty(w)&&"$"!=w.charAt(0)&&T.push(w);T.sort()}H=T.length;h=E.length=T.length;for(f=0;f<h;f++)if(w=a===T?f:T[f],C=a[w],C=n(w,C,f),Aa(C,"`track by` id"),B.hasOwnProperty(C))t=B[C],delete B[C],v[C]=t,E[f]=t;else{if(v.hasOwnProperty(C))throw q(E,function(a){a&&a.scope&&(B[a.id]=a)}),d("dupes",k,C);E[f]={id:C};v[C]=!1}for(w in B)B.hasOwnProperty(w)&&(t=B[w],f=yb(t.clone),c.leave(f),q(f,function(a){a.$$NG_REMOVED=!0}),t.scope.$destroy());
f=0;for(h=T.length;f<h;f++){w=a===T?f:T[f];C=a[w];t=E[f];E[f-1]&&(m=E[f-1].clone[E[f-1].clone.length-1]);if(t.scope){R=t.scope;n=m;do n=n.nextSibling;while(n&&n.$$NG_REMOVED);t.clone[0]!=n&&c.move(yb(t.clone),null,y(m));m=t.clone[t.clone.length-1]}else R=e.$new();R[u]=C;F&&(R[F]=w);R.$index=f;R.$first=0===f;R.$last=f===H-1;R.$middle=!(R.$first||R.$last);R.$odd=!(R.$even=0===(f&1));t.scope||l(R,function(a){a[a.length++]=U.createComment(" end ngRepeat: "+k+" ");c.enter(a,null,y(m));m=a;t.scope=R;t.clone=
a;v[t.id]=t})}B=v})}}}],yd=["$animate",function(a){return function(c,d,e){c.$watch(e.ngShow,function(c){a[Qa(c)?"removeClass":"addClass"](d,"ng-hide")})}}],rd=["$animate",function(a){return function(c,d,e){c.$watch(e.ngHide,function(c){a[Qa(c)?"addClass":"removeClass"](d,"ng-hide")})}}],zd=va(function(a,c,d){a.$watch(d.ngStyle,function(a,d){d&&a!==d&&q(d,function(a,d){c.css(d,"")});a&&c.css(a)},!0)}),Ad=["$animate",function(a){return{restrict:"EA",require:"ngSwitch",controller:["$scope",function(){this.cases=
{}}],link:function(c,d,e,g){var f,h,l,k=[];c.$watch(e.ngSwitch||e.on,function(d){var n,p=k.length;if(0<p){if(l){for(n=0;n<p;n++)l[n].remove();l=null}l=[];for(n=0;n<p;n++){var r=h[n];k[n].$destroy();l[n]=r;a.leave(r,function(){l.splice(n,1);0===l.length&&(l=null)})}}h=[];k=[];if(f=g.cases["!"+d]||g.cases["?"])c.$eval(e.change),q(f,function(d){var e=c.$new();k.push(e);d.transclude(e,function(c){var e=d.element;h.push(c);a.enter(c,e.parent(),e)})})})}}}],Bd=va({transclude:"element",priority:800,require:"^ngSwitch",
link:function(a,c,d,e,g){e.cases["!"+d.ngSwitchWhen]=e.cases["!"+d.ngSwitchWhen]||[];e.cases["!"+d.ngSwitchWhen].push({transclude:g,element:c})}}),Cd=va({transclude:"element",priority:800,require:"^ngSwitch",link:function(a,c,d,e,g){e.cases["?"]=e.cases["?"]||[];e.cases["?"].push({transclude:g,element:c})}}),Ed=va({link:function(a,c,d,e,g){if(!g)throw t("ngTransclude")("orphan",ha(c));g(function(a){c.empty();c.append(a)})}}),ed=["$templateCache",function(a){return{restrict:"E",terminal:!0,compile:function(c,
d){"text/ng-template"==d.type&&a.put(d.id,c[0].text)}}}],Te=t("ngOptions"),Dd=aa({terminal:!0}),fd=["$compile","$parse",function(a,c){var d=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,e={$setViewValue:C};return{restrict:"E",require:["select","?ngModel"],controller:["$element","$scope","$attrs",function(a,c,d){var l=this,k={},m=e,n;l.databound=
d.ngModel;l.init=function(a,c,d){m=a;n=d};l.addOption=function(c){Aa(c,'"option value"');k[c]=!0;m.$viewValue==c&&(a.val(c),n.parent()&&n.remove())};l.removeOption=function(a){this.hasOption(a)&&(delete k[a],m.$viewValue==a&&this.renderUnknownOption(a))};l.renderUnknownOption=function(c){c="? "+Ia(c)+" ?";n.val(c);a.prepend(n);a.val(c);n.prop("selected",!0)};l.hasOption=function(a){return k.hasOwnProperty(a)};c.$on("$destroy",function(){l.renderUnknownOption=C})}],link:function(e,f,h,l){function k(a,
c,d,e){d.$render=function(){var a=d.$viewValue;e.hasOption(a)?(A.parent()&&A.remove(),c.val(a),""===a&&w.prop("selected",!0)):E(a)&&w?c.val(""):e.renderUnknownOption(a)};c.on("change",function(){a.$apply(function(){A.parent()&&A.remove();d.$setViewValue(c.val())})})}function m(a,c,d){var e;d.$render=function(){var a=new Va(d.$viewValue);q(c.find("option"),function(c){c.selected=B(a.get(c.value))})};a.$watch(function(){xa(e,d.$viewValue)||(e=ba(d.$viewValue),d.$render())});c.on("change",function(){a.$apply(function(){var a=
[];q(c.find("option"),function(c){c.selected&&a.push(c.value)});d.$setViewValue(a)})})}function n(e,f,g){function h(){var a={"":[]},c=[""],d,k,s,t,z;t=g.$modelValue;z=y(e)||[];var E=n?Qb(z):z,F,I,A;I={};s=!1;var D,H;if(r)if(w&&M(t))for(s=new Va([]),A=0;A<t.length;A++)I[m]=t[A],s.put(w(e,I),t[A]);else s=new Va(t);for(A=0;F=E.length,A<F;A++){k=A;if(n){k=E[A];if("$"===k.charAt(0))continue;I[n]=k}I[m]=z[k];d=p(e,I)||"";(k=a[d])||(k=a[d]=[],c.push(d));r?d=B(s.remove(w?w(e,I):q(e,I))):(w?(d={},d[m]=t,d=
w(e,d)===w(e,I)):d=t===q(e,I),s=s||d);D=l(e,I);D=B(D)?D:"";k.push({id:w?w(e,I):n?E[A]:A,label:D,selected:d})}r||(u||null===t?a[""].unshift({id:"",label:"",selected:!s}):s||a[""].unshift({id:"?",label:"",selected:!0}));I=0;for(E=c.length;I<E;I++){d=c[I];k=a[d];x.length<=I?(t={element:C.clone().attr("label",d),label:k.label},z=[t],x.push(z),f.append(t.element)):(z=x[I],t=z[0],t.label!=d&&t.element.attr("label",t.label=d));D=null;A=0;for(F=k.length;A<F;A++)s=k[A],(d=z[A+1])?(D=d.element,d.label!==s.label&&
D.text(d.label=s.label),d.id!==s.id&&D.val(d.id=s.id),d.selected!==s.selected&&D.prop("selected",d.selected=s.selected)):(""===s.id&&u?H=u:(H=v.clone()).val(s.id).attr("selected",s.selected).text(s.label),z.push({element:H,label:s.label,id:s.id,selected:s.selected}),D?D.after(H):t.element.append(H),D=H);for(A++;z.length>A;)z.pop().element.remove()}for(;x.length>I;)x.pop()[0].element.remove()}var k;if(!(k=t.match(d)))throw Te("iexp",t,ha(f));var l=c(k[2]||k[1]),m=k[4]||k[6],n=k[5],p=c(k[3]||""),q=
c(k[2]?k[1]:m),y=c(k[7]),w=k[8]?c(k[8]):null,x=[[{element:f,label:""}]];u&&(a(u)(e),u.removeClass("ng-scope"),u.remove());f.empty();f.on("change",function(){e.$apply(function(){var a,c=y(e)||[],d={},h,k,l,p,t,v,u;if(r)for(k=[],p=0,v=x.length;p<v;p++)for(a=x[p],l=1,t=a.length;l<t;l++){if((h=a[l].element)[0].selected){h=h.val();n&&(d[n]=h);if(w)for(u=0;u<c.length&&(d[m]=c[u],w(e,d)!=h);u++);else d[m]=c[h];k.push(q(e,d))}}else{h=f.val();if("?"==h)k=s;else if(""===h)k=null;else if(w)for(u=0;u<c.length;u++){if(d[m]=
c[u],w(e,d)==h){k=q(e,d);break}}else d[m]=c[h],n&&(d[n]=h),k=q(e,d);1<x[0].length&&x[0][1].id!==h&&(x[0][1].selected=!1)}g.$setViewValue(k)})});g.$render=h;e.$watch(h)}if(l[1]){var p=l[0];l=l[1];var r=h.multiple,t=h.ngOptions,u=!1,w,v=y(U.createElement("option")),C=y(U.createElement("optgroup")),A=v.clone();h=0;for(var x=f.children(),D=x.length;h<D;h++)if(""===x[h].value){w=u=x.eq(h);break}p.init(l,u,A);r&&(l.$isEmpty=function(a){return!a||0===a.length});t?n(e,f,l):r?m(e,f,l):k(e,f,l,p)}}}}],hd=["$interpolate",
function(a){var c={addOption:C,removeOption:C};return{restrict:"E",priority:100,compile:function(d,e){if(E(e.value)){var g=a(d.text(),!0);g||e.$set("value",d.text())}return function(a,d,e){var k=d.parent(),m=k.data("$selectController")||k.parent().data("$selectController");m&&m.databound?d.prop("selected",!1):m=c;g?a.$watch(g,function(a,c){e.$set("value",a);a!==c&&m.removeOption(c);m.addOption(a)}):m.addOption(e.value);d.on("$destroy",function(){m.removeOption(e.value)})}}}}],gd=aa({restrict:"E",
terminal:!0});O.angular.bootstrap?console.log("WARNING: Tried to load angular more than once."):((Ga=O.jQuery)?(y=Ga,D(Ga.fn,{scope:Ja.scope,isolateScope:Ja.isolateScope,controller:Ja.controller,injector:Ja.injector,inheritedData:Ja.inheritedData}),Ab("remove",!0,!0,!1),Ab("empty",!1,!1,!1),Ab("html",!1,!1,!0)):y=N,Ea.element=y,Zc(Ea),y(U).ready(function(){Wc(U,$b)}))})(window,document);!angular.$$csp()&&angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\\:form{display:block;}.ng-animate-block-transitions{transition:0s all!important;-webkit-transition:0s all!important;}</style>');
//# sourceMappingURL=angular.min.js.map

/**
 * State-based routing for AngularJS
 * @version v0.2.10
 * @link http://angular-ui.github.com/
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */
"undefined"!=typeof module&&"undefined"!=typeof exports&&module.exports===exports&&(module.exports="ui.router"),function(a,b,c){"use strict";function d(a,b){return I(new(I(function(){},{prototype:a})),b)}function e(a){return H(arguments,function(b){b!==a&&H(b,function(b,c){a.hasOwnProperty(c)||(a[c]=b)})}),a}function f(a,b){var c=[];for(var d in a.path){if(a.path[d]!==b.path[d])break;c.push(a.path[d])}return c}function g(a,b){if(Array.prototype.indexOf)return a.indexOf(b,Number(arguments[2])||0);var c=a.length>>>0,d=Number(arguments[2])||0;for(d=0>d?Math.ceil(d):Math.floor(d),0>d&&(d+=c);c>d;d++)if(d in a&&a[d]===b)return d;return-1}function h(a,b,c,d){var e,h=f(c,d),i={},j=[];for(var k in h)if(h[k].params&&h[k].params.length){e=h[k].params;for(var l in e)g(j,e[l])>=0||(j.push(e[l]),i[e[l]]=a[e[l]])}return I({},i,b)}function i(a,b){var c={};return H(a,function(a){var d=b[a];c[a]=null!=d?String(d):null}),c}function j(a,b,c){if(!c){c=[];for(var d in a)c.push(d)}for(var e=0;e<c.length;e++){var f=c[e];if(a[f]!=b[f])return!1}return!0}function k(a,b){var c={};return H(a,function(a){c[a]=b[a]}),c}function l(a,b){var d=1,f=2,g={},h=[],i=g,j=I(a.when(g),{$$promises:g,$$values:g});this.study=function(g){function k(a,c){if(o[c]!==f){if(n.push(c),o[c]===d)throw n.splice(0,n.indexOf(c)),new Error("Cyclic dependency: "+n.join(" -> "));if(o[c]=d,E(a))m.push(c,[function(){return b.get(a)}],h);else{var e=b.annotate(a);H(e,function(a){a!==c&&g.hasOwnProperty(a)&&k(g[a],a)}),m.push(c,a,e)}n.pop(),o[c]=f}}function l(a){return F(a)&&a.then&&a.$$promises}if(!F(g))throw new Error("'invocables' must be an object");var m=[],n=[],o={};return H(g,k),g=n=o=null,function(d,f,g){function h(){--s||(t||e(r,f.$$values),p.$$values=r,p.$$promises=!0,o.resolve(r))}function k(a){p.$$failure=a,o.reject(a)}function n(c,e,f){function i(a){l.reject(a),k(a)}function j(){if(!C(p.$$failure))try{l.resolve(b.invoke(e,g,r)),l.promise.then(function(a){r[c]=a,h()},i)}catch(a){i(a)}}var l=a.defer(),m=0;H(f,function(a){q.hasOwnProperty(a)&&!d.hasOwnProperty(a)&&(m++,q[a].then(function(b){r[a]=b,--m||j()},i))}),m||j(),q[c]=l.promise}if(l(d)&&g===c&&(g=f,f=d,d=null),d){if(!F(d))throw new Error("'locals' must be an object")}else d=i;if(f){if(!l(f))throw new Error("'parent' must be a promise returned by $resolve.resolve()")}else f=j;var o=a.defer(),p=o.promise,q=p.$$promises={},r=I({},d),s=1+m.length/3,t=!1;if(C(f.$$failure))return k(f.$$failure),p;f.$$values?(t=e(r,f.$$values),h()):(I(q,f.$$promises),f.then(h,k));for(var u=0,v=m.length;v>u;u+=3)d.hasOwnProperty(m[u])?h():n(m[u],m[u+1],m[u+2]);return p}},this.resolve=function(a,b,c,d){return this.study(a)(b,c,d)}}function m(a,b,c){this.fromConfig=function(a,b,c){return C(a.template)?this.fromString(a.template,b):C(a.templateUrl)?this.fromUrl(a.templateUrl,b):C(a.templateProvider)?this.fromProvider(a.templateProvider,b,c):null},this.fromString=function(a,b){return D(a)?a(b):a},this.fromUrl=function(c,d){return D(c)&&(c=c(d)),null==c?null:a.get(c,{cache:b}).then(function(a){return a.data})},this.fromProvider=function(a,b,d){return c.invoke(a,null,d||{params:b})}}function n(a){function b(b){if(!/^\w+(-+\w+)*$/.test(b))throw new Error("Invalid parameter name '"+b+"' in pattern '"+a+"'");if(f[b])throw new Error("Duplicate parameter name '"+b+"' in pattern '"+a+"'");f[b]=!0,j.push(b)}function c(a){return a.replace(/[\\\[\]\^$*+?.()|{}]/g,"\\$&")}var d,e=/([:*])(\w+)|\{(\w+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g,f={},g="^",h=0,i=this.segments=[],j=this.params=[];this.source=a;for(var k,l,m;(d=e.exec(a))&&(k=d[2]||d[3],l=d[4]||("*"==d[1]?".*":"[^/]*"),m=a.substring(h,d.index),!(m.indexOf("?")>=0));)g+=c(m)+"("+l+")",b(k),i.push(m),h=e.lastIndex;m=a.substring(h);var n=m.indexOf("?");if(n>=0){var o=this.sourceSearch=m.substring(n);m=m.substring(0,n),this.sourcePath=a.substring(0,h+n),H(o.substring(1).split(/[&?]/),b)}else this.sourcePath=a,this.sourceSearch="";g+=c(m)+"$",i.push(m),this.regexp=new RegExp(g),this.prefix=i[0]}function o(){this.compile=function(a){return new n(a)},this.isMatcher=function(a){return F(a)&&D(a.exec)&&D(a.format)&&D(a.concat)},this.$get=function(){return this}}function p(a){function b(a){var b=/^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(a.source);return null!=b?b[1].replace(/\\(.)/g,"$1"):""}function c(a,b){return a.replace(/\$(\$|\d{1,2})/,function(a,c){return b["$"===c?0:Number(c)]})}function d(a,b,c){if(!c)return!1;var d=a.invoke(b,b,{$match:c});return C(d)?d:!0}var e=[],f=null;this.rule=function(a){if(!D(a))throw new Error("'rule' must be a function");return e.push(a),this},this.otherwise=function(a){if(E(a)){var b=a;a=function(){return b}}else if(!D(a))throw new Error("'rule' must be a function");return f=a,this},this.when=function(e,f){var g,h=E(f);if(E(e)&&(e=a.compile(e)),!h&&!D(f)&&!G(f))throw new Error("invalid 'handler' in when()");var i={matcher:function(b,c){return h&&(g=a.compile(c),c=["$match",function(a){return g.format(a)}]),I(function(a,e){return d(a,c,b.exec(e.path(),e.search()))},{prefix:E(b.prefix)?b.prefix:""})},regex:function(a,e){if(a.global||a.sticky)throw new Error("when() RegExp must not be global or sticky");return h&&(g=e,e=["$match",function(a){return c(g,a)}]),I(function(b,c){return d(b,e,a.exec(c.path()))},{prefix:b(a)})}},j={matcher:a.isMatcher(e),regex:e instanceof RegExp};for(var k in j)if(j[k])return this.rule(i[k](e,f));throw new Error("invalid 'what' in when()")},this.$get=["$location","$rootScope","$injector",function(a,b,c){function d(b){function d(b){var d=b(c,a);return d?(E(d)&&a.replace().url(d),!0):!1}if(!b||!b.defaultPrevented){var g,h=e.length;for(g=0;h>g;g++)if(d(e[g]))return;f&&d(f)}}return b.$on("$locationChangeSuccess",d),{sync:function(){d()}}}]}function q(a,e,f){function g(a){return 0===a.indexOf(".")||0===a.indexOf("^")}function l(a,b){var d=E(a),e=d?a:a.name,f=g(e);if(f){if(!b)throw new Error("No reference point given for path '"+e+"'");for(var h=e.split("."),i=0,j=h.length,k=b;j>i;i++)if(""!==h[i]||0!==i){if("^"!==h[i])break;if(!k.parent)throw new Error("Path '"+e+"' not valid for state '"+b.name+"'");k=k.parent}else k=b;h=h.slice(i).join("."),e=k.name+(k.name&&h?".":"")+h}var l=w[e];return!l||!d&&(d||l!==a&&l.self!==a)?c:l}function m(a,b){x[a]||(x[a]=[]),x[a].push(b)}function n(b){b=d(b,{self:b,resolve:b.resolve||{},toString:function(){return this.name}});var c=b.name;if(!E(c)||c.indexOf("@")>=0)throw new Error("State must have a valid name");if(w.hasOwnProperty(c))throw new Error("State '"+c+"'' is already defined");var e=-1!==c.indexOf(".")?c.substring(0,c.lastIndexOf(".")):E(b.parent)?b.parent:"";if(e&&!w[e])return m(e,b.self);for(var f in z)D(z[f])&&(b[f]=z[f](b,z.$delegates[f]));if(w[c]=b,!b[y]&&b.url&&a.when(b.url,["$match","$stateParams",function(a,c){v.$current.navigable==b&&j(a,c)||v.transitionTo(b,a,{location:!1})}]),x[c])for(var g=0;g<x[c].length;g++)n(x[c][g]);return b}function o(a){return a.indexOf("*")>-1}function p(a){var b=a.split("."),c=v.$current.name.split(".");if("**"===b[0]&&(c=c.slice(c.indexOf(b[1])),c.unshift("**")),"**"===b[b.length-1]&&(c.splice(c.indexOf(b[b.length-2])+1,Number.MAX_VALUE),c.push("**")),b.length!=c.length)return!1;for(var d=0,e=b.length;e>d;d++)"*"===b[d]&&(c[d]="*");return c.join("")===b.join("")}function q(a,b){return E(a)&&!C(b)?z[a]:D(b)&&E(a)?(z[a]&&!z.$delegates[a]&&(z.$delegates[a]=z[a]),z[a]=b,this):this}function r(a,b){return F(a)?b=a:b.name=a,n(b),this}function s(a,e,g,m,n,q,r,s,x){function z(){r.url()!==M&&(r.url(M),r.replace())}function A(a,c,d,f,h){var i=d?c:k(a.params,c),j={$stateParams:i};h.resolve=n.resolve(a.resolve,j,h.resolve,a);var l=[h.resolve.then(function(a){h.globals=a})];return f&&l.push(f),H(a.views,function(c,d){var e=c.resolve&&c.resolve!==a.resolve?c.resolve:{};e.$template=[function(){return g.load(d,{view:c,locals:j,params:i,notify:!1})||""}],l.push(n.resolve(e,j,h.resolve,a).then(function(f){if(D(c.controllerProvider)||G(c.controllerProvider)){var g=b.extend({},e,j);f.$$controller=m.invoke(c.controllerProvider,null,g)}else f.$$controller=c.controller;f.$$state=a,f.$$controllerAs=c.controllerAs,h[d]=f}))}),e.all(l).then(function(){return h})}var B=e.reject(new Error("transition superseded")),F=e.reject(new Error("transition prevented")),K=e.reject(new Error("transition aborted")),L=e.reject(new Error("transition failed")),M=r.url(),N=x.baseHref();return u.locals={resolve:null,globals:{$stateParams:{}}},v={params:{},current:u.self,$current:u,transition:null},v.reload=function(){v.transitionTo(v.current,q,{reload:!0,inherit:!1,notify:!1})},v.go=function(a,b,c){return this.transitionTo(a,b,I({inherit:!0,relative:v.$current},c))},v.transitionTo=function(b,c,f){c=c||{},f=I({location:!0,inherit:!1,relative:null,notify:!0,reload:!1,$retry:!1},f||{});var g,k=v.$current,n=v.params,o=k.path,p=l(b,f.relative);if(!C(p)){var s={to:b,toParams:c,options:f};if(g=a.$broadcast("$stateNotFound",s,k.self,n),g.defaultPrevented)return z(),K;if(g.retry){if(f.$retry)return z(),L;var w=v.transition=e.when(g.retry);return w.then(function(){return w!==v.transition?B:(s.options.$retry=!0,v.transitionTo(s.to,s.toParams,s.options))},function(){return K}),z(),w}if(b=s.to,c=s.toParams,f=s.options,p=l(b,f.relative),!C(p)){if(f.relative)throw new Error("Could not resolve '"+b+"' from state '"+f.relative+"'");throw new Error("No such state '"+b+"'")}}if(p[y])throw new Error("Cannot transition to abstract state '"+b+"'");f.inherit&&(c=h(q,c||{},v.$current,p)),b=p;var x,D,E=b.path,G=u.locals,H=[];for(x=0,D=E[x];D&&D===o[x]&&j(c,n,D.ownParams)&&!f.reload;x++,D=E[x])G=H[x]=D.locals;if(t(b,k,G,f))return b.self.reloadOnSearch!==!1&&z(),v.transition=null,e.when(v.current);if(c=i(b.params,c||{}),f.notify&&(g=a.$broadcast("$stateChangeStart",b.self,c,k.self,n),g.defaultPrevented))return z(),F;for(var N=e.when(G),O=x;O<E.length;O++,D=E[O])G=H[O]=d(G),N=A(D,c,D===b,N,G);var P=v.transition=N.then(function(){var d,e,g;if(v.transition!==P)return B;for(d=o.length-1;d>=x;d--)g=o[d],g.self.onExit&&m.invoke(g.self.onExit,g.self,g.locals.globals),g.locals=null;for(d=x;d<E.length;d++)e=E[d],e.locals=H[d],e.self.onEnter&&m.invoke(e.self.onEnter,e.self,e.locals.globals);if(v.transition!==P)return B;v.$current=b,v.current=b.self,v.params=c,J(v.params,q),v.transition=null;var h=b.navigable;return f.location&&h&&(r.url(h.url.format(h.locals.globals.$stateParams)),"replace"===f.location&&r.replace()),f.notify&&a.$broadcast("$stateChangeSuccess",b.self,c,k.self,n),M=r.url(),v.current},function(d){return v.transition!==P?B:(v.transition=null,a.$broadcast("$stateChangeError",b.self,c,k.self,n,d),z(),e.reject(d))});return P},v.is=function(a,d){var e=l(a);return C(e)?v.$current!==e?!1:C(d)&&null!==d?b.equals(q,d):!0:c},v.includes=function(a,d){if(E(a)&&o(a)){if(!p(a))return!1;a=v.$current.name}var e=l(a);if(!C(e))return c;if(!C(v.$current.includes[e.name]))return!1;var f=!0;return b.forEach(d,function(a,b){C(q[b])&&q[b]===a||(f=!1)}),f},v.href=function(a,b,c){c=I({lossy:!0,inherit:!1,absolute:!1,relative:v.$current},c||{});var d=l(a,c.relative);if(!C(d))return null;b=h(q,b||{},v.$current,d);var e=d&&c.lossy?d.navigable:d,g=e&&e.url?e.url.format(i(d.params,b||{})):null;return!f.html5Mode()&&g&&(g="#"+f.hashPrefix()+g),"/"!==N&&(f.html5Mode()?g=N.slice(0,-1)+g:c.absolute&&(g=N.slice(1)+g)),c.absolute&&g&&(g=r.protocol()+"://"+r.host()+(80==r.port()||443==r.port()?"":":"+r.port())+(!f.html5Mode()&&g?"/":"")+g),g},v.get=function(a,b){if(!C(a)){var c=[];return H(w,function(a){c.push(a.self)}),c}var d=l(a,b);return d&&d.self?d.self:null},v}function t(a,b,c,d){return a!==b||(c!==b.locals||d.reload)&&a.self.reloadOnSearch!==!1?void 0:!0}var u,v,w={},x={},y="abstract",z={parent:function(a){if(C(a.parent)&&a.parent)return l(a.parent);var b=/^(.+)\.[^.]+$/.exec(a.name);return b?l(b[1]):u},data:function(a){return a.parent&&a.parent.data&&(a.data=a.self.data=I({},a.parent.data,a.data)),a.data},url:function(a){var b=a.url;if(E(b))return"^"==b.charAt(0)?e.compile(b.substring(1)):(a.parent.navigable||u).url.concat(b);if(e.isMatcher(b)||null==b)return b;throw new Error("Invalid url '"+b+"' in state '"+a+"'")},navigable:function(a){return a.url?a:a.parent?a.parent.navigable:null},params:function(a){if(!a.params)return a.url?a.url.parameters():a.parent.params;if(!G(a.params))throw new Error("Invalid params in state '"+a+"'");if(a.url)throw new Error("Both params and url specicified in state '"+a+"'");return a.params},views:function(a){var b={};return H(C(a.views)?a.views:{"":a},function(c,d){d.indexOf("@")<0&&(d+="@"+a.parent.name),b[d]=c}),b},ownParams:function(a){if(!a.parent)return a.params;var b={};H(a.params,function(a){b[a]=!0}),H(a.parent.params,function(c){if(!b[c])throw new Error("Missing required parameter '"+c+"' in state '"+a.name+"'");b[c]=!1});var c=[];return H(b,function(a,b){a&&c.push(b)}),c},path:function(a){return a.parent?a.parent.path.concat(a):[]},includes:function(a){var b=a.parent?I({},a.parent.includes):{};return b[a.name]=!0,b},$delegates:{}};u=n({name:"",url:"^",views:null,"abstract":!0}),u.navigable=null,this.decorator=q,this.state=r,this.$get=s,s.$inject=["$rootScope","$q","$view","$injector","$resolve","$stateParams","$location","$urlRouter","$browser"]}function r(){function a(a,b){return{load:function(c,d){var e,f={template:null,controller:null,view:null,locals:null,notify:!0,async:!0,params:{}};return d=I(f,d),d.view&&(e=b.fromConfig(d.view,d.params,d.locals)),e&&d.notify&&a.$broadcast("$viewContentLoading",d),e}}}this.$get=a,a.$inject=["$rootScope","$templateFactory"]}function s(){var a=!1;this.useAnchorScroll=function(){a=!0},this.$get=["$anchorScroll","$timeout",function(b,c){return a?b:function(a){c(function(){a[0].scrollIntoView()},0,!1)}}]}function t(a,c,d){function e(){return c.has?function(a){return c.has(a)?c.get(a):null}:function(a){try{return c.get(a)}catch(b){return null}}}function f(a,b){var c=function(){return{enter:function(a,b,c){b.after(a),c()},leave:function(a,b){a.remove(),b()}}};if(i)return{enter:function(a,b,c){i.enter(a,null,b,c)},leave:function(a,b){i.leave(a,b)}};if(h){var d=h&&h(b,a);return{enter:function(a,b,c){d.enter(a,null,b),c()},leave:function(a,b){d.leave(a),b()}}}return c()}var g=e(),h=g("$animator"),i=g("$animate"),j={restrict:"ECA",terminal:!0,priority:400,transclude:"element",compile:function(c,e,g){return function(c,e,h){function i(){k&&(k.remove(),k=null),m&&(m.$destroy(),m=null),l&&(q.leave(l,function(){k=null}),k=l,l=null)}function j(f){var h=c.$new(),j=l&&l.data("$uiViewName"),k=j&&a.$current&&a.$current.locals[j];if(f||k!==n){var r=g(h,function(a){q.enter(a,e,function(){(b.isDefined(p)&&!p||c.$eval(p))&&d(a)}),i()});n=a.$current.locals[r.data("$uiViewName")],l=r,m=h,m.$emit("$viewContentLoaded"),m.$eval(o)}}var k,l,m,n,o=h.onload||"",p=h.autoscroll,q=f(h,c);c.$on("$stateChangeSuccess",function(){j(!1)}),c.$on("$viewContentLoading",function(){j(!1)}),j(!0)}}};return j}function u(a,b,c){return{restrict:"ECA",priority:-400,compile:function(d){var e=d.html();return function(d,f,g){var h=g.uiView||g.name||"",i=f.inheritedData("$uiView");h.indexOf("@")<0&&(h=h+"@"+(i?i.state.name:"")),f.data("$uiViewName",h);var j=c.$current,k=j&&j.locals[h];if(k){f.data("$uiView",{name:h,state:k.$$state}),f.html(k.$template?k.$template:e);var l=a(f.contents());if(k.$$controller){k.$scope=d;var m=b(k.$$controller,k);k.$$controllerAs&&(d[k.$$controllerAs]=m),f.data("$ngControllerController",m),f.children().data("$ngControllerController",m)}l(d)}}}}}function v(a){var b=a.replace(/\n/g," ").match(/^([^(]+?)\s*(\((.*)\))?$/);if(!b||4!==b.length)throw new Error("Invalid state ref '"+a+"'");return{state:b[1],paramExpr:b[3]||null}}function w(a){var b=a.parent().inheritedData("$uiView");return b&&b.state&&b.state.name?b.state:void 0}function x(a,c){var d=["location","inherit","reload"];return{restrict:"A",require:"?^uiSrefActive",link:function(e,f,g,h){var i=v(g.uiSref),j=null,k=w(f)||a.$current,l="FORM"===f[0].nodeName,m=l?"action":"href",n=!0,o={relative:k},p=e.$eval(g.uiSrefOpts)||{};b.forEach(d,function(a){a in p&&(o[a]=p[a])});var q=function(b){if(b&&(j=b),n){var c=a.href(i.state,j,o);return h&&h.$$setStateInfo(i.state,j),c?void(f[0][m]=c):(n=!1,!1)}};i.paramExpr&&(e.$watch(i.paramExpr,function(a){a!==j&&q(a)},!0),j=e.$eval(i.paramExpr)),q(),l||f.bind("click",function(b){var d=b.which||b.button;d>1||b.ctrlKey||b.metaKey||b.shiftKey||f.attr("target")||(c(function(){a.go(i.state,j,o)}),b.preventDefault())})}}}function y(a,b,c){return{restrict:"A",controller:["$scope","$element","$attrs",function(d,e,f){function g(){a.$current.self===i&&h()?e.addClass(l):e.removeClass(l)}function h(){return!k||j(k,b)}var i,k,l;l=c(f.uiSrefActive||"",!1)(d),this.$$setStateInfo=function(b,c){i=a.get(b,w(e)),k=c,g()},d.$on("$stateChangeSuccess",g)}]}}function z(a){return function(b){return a.is(b)}}function A(a){return function(b){return a.includes(b)}}function B(a,b){function e(a){this.locals=a.locals.globals,this.params=this.locals.$stateParams}function f(){this.locals=null,this.params=null}function g(c,g){if(null!=g.redirectTo){var h,j=g.redirectTo;if(E(j))h=j;else{if(!D(j))throw new Error("Invalid 'redirectTo' in when()");h=function(a,b){return j(a,b.path(),b.search())}}b.when(c,h)}else a.state(d(g,{parent:null,name:"route:"+encodeURIComponent(c),url:c,onEnter:e,onExit:f}));return i.push(g),this}function h(a,b,d){function e(a){return""!==a.name?a:c}var f={routes:i,params:d,current:c};return b.$on("$stateChangeStart",function(a,c,d,f){b.$broadcast("$routeChangeStart",e(c),e(f))}),b.$on("$stateChangeSuccess",function(a,c,d,g){f.current=e(c),b.$broadcast("$routeChangeSuccess",e(c),e(g)),J(d,f.params)}),b.$on("$stateChangeError",function(a,c,d,f,g,h){b.$broadcast("$routeChangeError",e(c),e(f),h)}),f}var i=[];e.$inject=["$$state"],this.when=g,this.$get=h,h.$inject=["$state","$rootScope","$routeParams"]}var C=b.isDefined,D=b.isFunction,E=b.isString,F=b.isObject,G=b.isArray,H=b.forEach,I=b.extend,J=b.copy;b.module("ui.router.util",["ng"]),b.module("ui.router.router",["ui.router.util"]),b.module("ui.router.state",["ui.router.router","ui.router.util"]),b.module("ui.router",["ui.router.state"]),b.module("ui.router.compat",["ui.router"]),l.$inject=["$q","$injector"],b.module("ui.router.util").service("$resolve",l),m.$inject=["$http","$templateCache","$injector"],b.module("ui.router.util").service("$templateFactory",m),n.prototype.concat=function(a){return new n(this.sourcePath+a+this.sourceSearch)},n.prototype.toString=function(){return this.source},n.prototype.exec=function(a,b){var c=this.regexp.exec(a);if(!c)return null;var d,e=this.params,f=e.length,g=this.segments.length-1,h={};if(g!==c.length-1)throw new Error("Unbalanced capture group in route '"+this.source+"'");for(d=0;g>d;d++)h[e[d]]=c[d+1];for(;f>d;d++)h[e[d]]=b[e[d]];return h},n.prototype.parameters=function(){return this.params},n.prototype.format=function(a){var b=this.segments,c=this.params;if(!a)return b.join("");var d,e,f,g=b.length-1,h=c.length,i=b[0];for(d=0;g>d;d++)f=a[c[d]],null!=f&&(i+=encodeURIComponent(f)),i+=b[d+1];for(;h>d;d++)f=a[c[d]],null!=f&&(i+=(e?"&":"?")+c[d]+"="+encodeURIComponent(f),e=!0);return i},b.module("ui.router.util").provider("$urlMatcherFactory",o),p.$inject=["$urlMatcherFactoryProvider"],b.module("ui.router.router").provider("$urlRouter",p),q.$inject=["$urlRouterProvider","$urlMatcherFactoryProvider","$locationProvider"],b.module("ui.router.state").value("$stateParams",{}).provider("$state",q),r.$inject=[],b.module("ui.router.state").provider("$view",r),b.module("ui.router.state").provider("$uiViewScroll",s),t.$inject=["$state","$injector","$uiViewScroll"],u.$inject=["$compile","$controller","$state"],b.module("ui.router.state").directive("uiView",t),b.module("ui.router.state").directive("uiView",u),x.$inject=["$state","$timeout"],y.$inject=["$state","$stateParams","$interpolate"],b.module("ui.router.state").directive("uiSref",x).directive("uiSrefActive",y),z.$inject=["$state"],A.$inject=["$state"],b.module("ui.router.state").filter("isState",z).filter("includedByState",A),B.$inject=["$stateProvider","$urlRouterProvider"],b.module("ui.router.compat").provider("$route",B).directive("ngView",t)}(window,window.angular);
!function () {
    "use strict";
    var e = angular.module("pasvaz.bindonce", []);
    e.directive("bindonce", function () {
        var e = function (e) {
            if (e && 0 !== e.length) {
                var t = angular.lowercase("" + e);
                e = !("f" === t || "0" === t || "false" === t || "no" === t || "n" === t || "[]" === t)
            } else e = !1;
            return e
        }, t = parseInt((/msie (\d+)/.exec(angular.lowercase(navigator.userAgent)) || [])[1], 10);
        isNaN(t) && (t = parseInt((/trident\/.*; rv:(\d+)/.exec(angular.lowercase(navigator.userAgent)) || [])[1], 10));
        var r = {
            restrict: "AM", controller: ["$scope", "$element", "$attrs", "$interpolate", function (r, a, i, n) {
                var c = function (t, r, a) {
                    var i = "show" === r ? "" : "none", n = "hide" === r ? "" : "none";
                    t.css("display", e(a) ? i : n)
                }, o = function (e, t) {
                    if (angular.isObject(t) && !angular.isArray(t)) {
                        var r = [];
                        angular.forEach(t, function (e, t) {
                            e && r.push(t)
                        }), t = r
                    }
                    t && e.addClass(angular.isArray(t) ? t.join(" ") : t)
                }, s = function (e, t) {
                    e.transclude(t, function (t) {
                        var r = e.element.parent(), a = e.element && e.element[e.element.length - 1], i = r && r[0] || a && a.parentNode, n = a && a.nextSibling || null;
                        angular.forEach(t, function (e) {
                            i.insertBefore(e, n)
                        })
                    })
                }, l = {
                    watcherRemover: void 0, binders: [], group: i.boName, element: a, ran: !1, addBinder: function (e) {
                        this.binders.push(e), this.ran && this.runBinders()
                    }, setupWatcher: function (e) {
                        var t = this;
                        this.watcherRemover = r.$watch(e, function (e) {
                            void 0 !== e && (t.removeWatcher(), t.checkBindonce(e))
                        }, !0)
                    }, checkBindonce: function (e) {
                        var t = this, r = e.$promise ? e.$promise.then : e.then;
                        "function" == typeof r ? r(function () {
                            t.runBinders()
                        }) : t.runBinders()
                    }, removeWatcher: function () {
                        void 0 !== this.watcherRemover && (this.watcherRemover(), this.watcherRemover = void 0)
                    }, runBinders: function () {
                        for (; this.binders.length > 0;) {
                            var r = this.binders.shift();
                            if (!this.group || this.group == r.group) {
                                var a = r.scope.$eval(r.interpolate ? n(r.value) : r.value);
                                switch (r.attr) {
                                    case"boIf":
                                        e(a) && s(r, r.scope.$new());
                                        break;
                                    case"boSwitch":
                                        var i, l = r.controller[0];
                                        (i = l.cases["!" + a] || l.cases["?"]) && (r.scope.$eval(r.attrs.change), angular.forEach(i, function (e) {
                                            s(e, r.scope.$new())
                                        }));
                                        break;
                                    case"boSwitchWhen":
                                        var u = r.controller[0];
                                        u.cases["!" + r.attrs.boSwitchWhen] = u.cases["!" + r.attrs.boSwitchWhen] || [], u.cases["!" + r.attrs.boSwitchWhen].push({
                                            transclude: r.transclude,
                                            element: r.element
                                        });
                                        break;
                                    case"boSwitchDefault":
                                        var u = r.controller[0];
                                        u.cases["?"] = u.cases["?"] || [], u.cases["?"].push({
                                            transclude: r.transclude,
                                            element: r.element
                                        });
                                        break;
                                    case"hide":
                                    case"show":
                                        c(r.element, r.attr, a);
                                        break;
                                    case"class":
                                        o(r.element, a);
                                        break;
                                    case"text":
                                        r.element.text(a);
                                        break;
                                    case"html":
                                        r.element.html(a);
                                        break;
                                    case"style":
                                        r.element.css(a);
                                        break;
                                    case"disabled":
                                        r.element.prop("disabled", a);
                                        break;
                                    case"src":
                                        r.element.attr(r.attr, a), t && r.element.prop("src", a);
                                        break;
                                    case"attr":
                                        angular.forEach(r.attrs, function (e, t) {
                                            var a, i;
                                            t.match(/^boAttr./) && r.attrs[t] && (a = t.replace(/^boAttr/, "").replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase(), i = r.scope.$eval(r.attrs[t]), r.element.attr(a, i))
                                        });
                                        break;
                                    case"href":
                                    case"alt":
                                    case"title":
                                    case"id":
                                    case"value":
                                        r.element.attr(r.attr, a)
                                }
                            }
                        }
                        this.ran = !0
                    }
                };
                angular.extend(this, l)
            }], link: function (e, t, r, a) {
                var i = r.bindonce && e.$eval(r.bindonce);
                void 0 !== i ? a.checkBindonce(i) : (a.setupWatcher(r.bindonce), t.bind("$destroy", a.removeWatcher))
            }
        };
        return r
    }), angular.forEach([{directiveName: "boShow", attribute: "show"}, {
        directiveName: "boHide",
        attribute: "hide"
    }, {directiveName: "boClass", attribute: "class"}, {
        directiveName: "boText",
        attribute: "text"
    }, {directiveName: "boBind", attribute: "text"}, {
        directiveName: "boHtml",
        attribute: "html"
    }, {directiveName: "boSrcI", attribute: "src", interpolate: !0}, {
        directiveName: "boSrc",
        attribute: "src"
    }, {directiveName: "boHrefI", attribute: "href", interpolate: !0}, {
        directiveName: "boHref",
        attribute: "href"
    }, {directiveName: "boAlt", attribute: "alt"}, {
        directiveName: "boTitle",
        attribute: "title"
    }, {directiveName: "boId", attribute: "id"}, {
        directiveName: "boStyle",
        attribute: "style"
    }, {directiveName: "boDisabled", attribute: "disabled"}, {
        directiveName: "boValue",
        attribute: "value"
    }, {directiveName: "boAttr", attribute: "attr"}, {
        directiveName: "boIf",
        transclude: "element",
        terminal: !0,
        priority: 1e3
    }, {
        directiveName: "boSwitch", require: "boSwitch", controller: function () {
            this.cases = {}
        }
    }, {
        directiveName: "boSwitchWhen",
        transclude: "element",
        priority: 800,
        require: "^boSwitch"
    }, {directiveName: "boSwitchDefault", transclude: "element", priority: 800, require: "^boSwitch"}], function (t) {
        var r = 200;
        return e.directive(t.directiveName, function () {
            var e = {
                priority: t.priority || r,
                transclude: t.transclude || !1,
                terminal: t.terminal || !1,
                require: ["^bindonce"].concat(t.require || []),
                controller: t.controller,
                compile: function (e, r, a) {
                    return function (e, r, i, n) {
                        var c = n[0], o = i.boParent;
                        if (o && c.group !== o) {
                            var s = c.element.parent();
                            c = void 0;
                            for (var l; 9 !== s[0].nodeType && s.length;) {
                                if ((l = s.data("$bindonceController")) && l.group === o) {
                                    c = l;
                                    break
                                }
                                s = s.parent()
                            }
                            if (!c)throw new Error("No bindonce controller: " + o)
                        }
                        c.addBinder({
                            element: r,
                            attr: t.attribute || t.directiveName,
                            attrs: i,
                            value: i[t.directiveName],
                            interpolate: t.interpolate,
                            group: o,
                            transclude: a,
                            controller: n.slice(1),
                            scope: e
                        })
                    }
                }
            };
            return e
        })
    })
}();
;(function () {
    'use strict';

    /**
     * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
     *
     * @codingstandard ftlabs-jsv2
     * @copyright The Financial Times Limited [All Rights Reserved]
     * @license MIT License (see LICENSE.txt)
     */

    /*jslint browser:true, node:true*/
    /*global define, Event, Node*/


    /**
     * Instantiate fast-clicking listeners on the specified layer.
     *
     * @constructor
     * @param {Element} layer The layer to listen on
     * @param {Object} [options={}] The options to override the defaults
     */
    function FastClick(layer, options) {
        var oldOnClick;

        options = options || {};

        /**
         * Whether a click is currently being tracked.
         *
         * @type boolean
         */
        this.trackingClick = false;


        /**
         * Timestamp for when click tracking started.
         *
         * @type number
         */
        this.trackingClickStart = 0;


        /**
         * The element being tracked for a click.
         *
         * @type EventTarget
         */
        this.targetElement = null;


        /**
         * X-coordinate of touch start event.
         *
         * @type number
         */
        this.touchStartX = 0;


        /**
         * Y-coordinate of touch start event.
         *
         * @type number
         */
        this.touchStartY = 0;


        /**
         * ID of the last touch, retrieved from Touch.identifier.
         *
         * @type number
         */
        this.lastTouchIdentifier = 0;


        /**
         * Touchmove boundary, beyond which a click will be cancelled.
         *
         * @type number
         */
        this.touchBoundary = options.touchBoundary || 10;


        /**
         * The FastClick layer.
         *
         * @type Element
         */
        this.layer = layer;

        /**
         * The minimum time between tap(touchstart and touchend) events
         *
         * @type number
         */
        this.tapDelay = options.tapDelay || 200;

        /**
         * The maximum time for a tap
         *
         * @type number
         */
        this.tapTimeout = options.tapTimeout || 700;

        if (FastClick.notNeeded(layer)) {
            return;
        }

        // Some old versions of Android don't have Function.prototype.bind
        function bind(method, context) {
            return function () {
                return method.apply(context, arguments);
            };
        }


        var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
        var context = this;
        for (var i = 0, l = methods.length; i < l; i++) {
            context[methods[i]] = bind(context[methods[i]], context);
        }

        // Set up event handlers as required
        if (deviceIsAndroid) {
            layer.addEventListener('mouseover', this.onMouse, true);
            layer.addEventListener('mousedown', this.onMouse, true);
            layer.addEventListener('mouseup', this.onMouse, true);
        }

        layer.addEventListener('click', this.onClick, true);
        layer.addEventListener('touchstart', this.onTouchStart, false);
        layer.addEventListener('touchmove', this.onTouchMove, false);
        layer.addEventListener('touchend', this.onTouchEnd, false);
        layer.addEventListener('touchcancel', this.onTouchCancel, false);

        // Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
        // which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
        // layer when they are cancelled.
        if (!Event.prototype.stopImmediatePropagation) {
            layer.removeEventListener = function (type, callback, capture) {
                var rmv = Node.prototype.removeEventListener;
                if (type === 'click') {
                    rmv.call(layer, type, callback.hijacked || callback, capture);
                } else {
                    rmv.call(layer, type, callback, capture);
                }
            };

            layer.addEventListener = function (type, callback, capture) {
                var adv = Node.prototype.addEventListener;
                if (type === 'click') {
                    adv.call(layer, type, callback.hijacked || (callback.hijacked = function (event) {
                            if (!event.propagationStopped) {
                                callback(event);
                            }
                        }), capture);
                } else {
                    adv.call(layer, type, callback, capture);
                }
            };
        }

        // If a handler is already declared in the element's onclick attribute, it will be fired before
        // FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
        // adding it as listener.
        if (typeof layer.onclick === 'function') {

            // Android browser on at least 3.2 requires a new reference to the function in layer.onclick
            // - the old one won't work if passed to addEventListener directly.
            oldOnClick = layer.onclick;
            layer.addEventListener('click', function (event) {
                oldOnClick(event);
            }, false);
            layer.onclick = null;
        }
    }

    /**
     * Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
     *
     * @type boolean
     */
    var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

    /**
     * Android requires exceptions.
     *
     * @type boolean
     */
    var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;


    /**
     * iOS requires exceptions.
     *
     * @type boolean
     */
    var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;


    /**
     * iOS 4 requires an exception for select elements.
     *
     * @type boolean
     */
    var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


    /**
     * iOS 6.0-7.* requires the target element to be manually derived
     *
     * @type boolean
     */
    var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

    /**
     * BlackBerry requires exceptions.
     *
     * @type boolean
     */
    var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

    /**
     * Determine whether a given element requires a native click.
     *
     * @param {EventTarget|Element} target Target DOM element
     * @returns {boolean} Returns true if the element needs a native click
     */
    FastClick.prototype.needsClick = function (target) {
        switch (target.nodeName.toLowerCase()) {

            // Don't send a synthetic click to disabled inputs (issue #62)
            case 'button':
            case 'select':
            case 'textarea':
                if (target.disabled) {
                    return true;
                }

                break;
            case 'input':

                // File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
                if ((deviceIsIOS && target.type === 'file') || target.disabled) {
                    return true;
                }

                break;
            case 'label':
            case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
            case 'video':
                return true;
        }

        return (/\bneedsclick\b/).test(target.className);
    };


    /**
     * Determine whether a given element requires a call to focus to simulate click into element.
     *
     * @param {EventTarget|Element} target Target DOM element
     * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
     */
    FastClick.prototype.needsFocus = function (target) {
        switch (target.nodeName.toLowerCase()) {
            case 'textarea':
                return true;
            case 'select':
                return !deviceIsAndroid;
            case 'input':
                switch (target.type) {
                    case 'button':
                    case 'checkbox':
                    case 'file':
                    case 'image':
                    case 'radio':
                    case 'submit':
                        return false;
                }

                // No point in attempting to focus disabled inputs
                return !target.disabled && !target.readOnly;
            default:
                return (/\bneedsfocus\b/).test(target.className);
        }
    };


    /**
     * Send a click event to the specified element.
     *
     * @param {EventTarget|Element} targetElement
     * @param {Event} event
     */
    FastClick.prototype.sendClick = function (targetElement, event) {
        var clickEvent, touch;

        // On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
        if (document.activeElement && document.activeElement !== targetElement) {
            document.activeElement.blur();
        }

        touch = event.changedTouches[0];

        // Synthesise a click event, with an extra attribute so it can be tracked
        clickEvent = document.createEvent('MouseEvents');
        clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
        clickEvent.forwardedTouchEvent = true;
        targetElement.dispatchEvent(clickEvent);
    };

    FastClick.prototype.determineEventType = function (targetElement) {

        //Issue #159: Android Chrome Select Box does not open with a synthetic click event
        if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
            return 'mousedown';
        }

        return 'click';
    };


    /**
     * @param {EventTarget|Element} targetElement
     */
    FastClick.prototype.focus = function (targetElement) {
        var length;

        // Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
        if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
            length = targetElement.value.length;
            targetElement.setSelectionRange(length, length);
        } else {
            targetElement.focus();
        }
    };


    /**
     * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
     *
     * @param {EventTarget|Element} targetElement
     */
    FastClick.prototype.updateScrollParent = function (targetElement) {
        var scrollParent, parentElement;

        scrollParent = targetElement.fastClickScrollParent;

        // Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
        // target element was moved to another parent.
        if (!scrollParent || !scrollParent.contains(targetElement)) {
            parentElement = targetElement;
            do {
                if (parentElement.scrollHeight > parentElement.offsetHeight) {
                    scrollParent = parentElement;
                    targetElement.fastClickScrollParent = parentElement;
                    break;
                }

                parentElement = parentElement.parentElement;
            } while (parentElement);
        }

        // Always update the scroll top tracker if possible.
        if (scrollParent) {
            scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
        }
    };


    /**
     * @param {EventTarget} targetElement
     * @returns {Element|EventTarget}
     */
    FastClick.prototype.getTargetElementFromEventTarget = function (eventTarget) {

        // On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
        if (eventTarget.nodeType === Node.TEXT_NODE) {
            return eventTarget.parentNode;
        }

        return eventTarget;
    };


    /**
     * On touch start, record the position and scroll offset.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onTouchStart = function (event) {
        var targetElement, touch, selection;

        // Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
        if (event.targetTouches.length > 1) {
            return true;
        }

        targetElement = this.getTargetElementFromEventTarget(event.target);
        touch = event.targetTouches[0];

        if (deviceIsIOS) {

            // Only trusted events will deselect text on iOS (issue #49)
            selection = window.getSelection();
            if (selection.rangeCount && !selection.isCollapsed) {
                return true;
            }

            if (!deviceIsIOS4) {

                // Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
                // when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
                // with the same identifier as the touch event that previously triggered the click that triggered the alert.
                // Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
                // immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
                // Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
                // which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
                // random integers, it's safe to to continue if the identifier is 0 here.
                if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
                    event.preventDefault();
                    return false;
                }

                this.lastTouchIdentifier = touch.identifier;

                // If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
                // 1) the user does a fling scroll on the scrollable layer
                // 2) the user stops the fling scroll with another tap
                // then the event.target of the last 'touchend' event will be the element that was under the user's finger
                // when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
                // is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
                this.updateScrollParent(targetElement);
            }
        }

        this.trackingClick = true;
        this.trackingClickStart = event.timeStamp;
        this.targetElement = targetElement;

        this.touchStartX = touch.pageX;
        this.touchStartY = touch.pageY;

        // Prevent phantom clicks on fast double-tap (issue #36)
        if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
            event.preventDefault();
        }

        return true;
    };


    /**
     * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.touchHasMoved = function (event) {
        var touch = event.changedTouches[0], boundary = this.touchBoundary;

        if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
            return true;
        }

        return false;
    };


    /**
     * Update the last position.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onTouchMove = function (event) {
        if (!this.trackingClick) {
            return true;
        }

        // If the touch has moved, cancel the click tracking
        if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
            this.trackingClick = false;
            this.targetElement = null;
        }

        return true;
    };


    /**
     * Attempt to find the labelled control for the given label element.
     *
     * @param {EventTarget|HTMLLabelElement} labelElement
     * @returns {Element|null}
     */
    FastClick.prototype.findControl = function (labelElement) {

        // Fast path for newer browsers supporting the HTML5 control attribute
        if (labelElement.control !== undefined) {
            return labelElement.control;
        }

        // All browsers under test that support touch events also support the HTML5 htmlFor attribute
        if (labelElement.htmlFor) {
            return document.getElementById(labelElement.htmlFor);
        }

        // If no for attribute exists, attempt to retrieve the first labellable descendant element
        // the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
        return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
    };


    /**
     * On touch end, determine whether to send a click event at once.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onTouchEnd = function (event) {
        var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

        if (!this.trackingClick) {
            return true;
        }

        // Prevent phantom clicks on fast double-tap (issue #36)
        if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
            this.cancelNextClick = true;
            return true;
        }

        if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
            return true;
        }

        // Reset to prevent wrong click cancel on input (issue #156).
        this.cancelNextClick = false;

        this.lastClickTime = event.timeStamp;

        trackingClickStart = this.trackingClickStart;
        this.trackingClick = false;
        this.trackingClickStart = 0;

        // On some iOS devices, the targetElement supplied with the event is invalid if the layer
        // is performing a transition or scroll, and has to be re-detected manually. Note that
        // for this to function correctly, it must be called *after* the event target is checked!
        // See issue #57; also filed as rdar://13048589 .
        if (deviceIsIOSWithBadTarget) {
            touch = event.changedTouches[0];

            // In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
            targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
            targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
        }

        targetTagName = targetElement.tagName.toLowerCase();
        if (targetTagName === 'label') {
            forElement = this.findControl(targetElement);
            if (forElement) {
                this.focus(targetElement);
                if (deviceIsAndroid) {
                    return false;
                }

                targetElement = forElement;
            }
        } else if (this.needsFocus(targetElement)) {

            // Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
            // Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
            if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
                this.targetElement = null;
                return false;
            }

            this.focus(targetElement);
            this.sendClick(targetElement, event);

            // Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
            // Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
            if (!deviceIsIOS || targetTagName !== 'select') {
                this.targetElement = null;
                event.preventDefault();
            }

            return false;
        }

        if (deviceIsIOS && !deviceIsIOS4) {

            // Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
            // and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
            scrollParent = targetElement.fastClickScrollParent;
            if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
                return true;
            }
        }

        // Prevent the actual click from going though - unless the target node is marked as requiring
        // real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
        if (!this.needsClick(targetElement)) {
            event.preventDefault();
            this.sendClick(targetElement, event);
        }

        return false;
    };


    /**
     * On touch cancel, stop tracking the click.
     *
     * @returns {void}
     */
    FastClick.prototype.onTouchCancel = function () {
        this.trackingClick = false;
        this.targetElement = null;
    };


    /**
     * Determine mouse events which should be permitted.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onMouse = function (event) {

        // If a target element was never set (because a touch event was never fired) allow the event
        if (!this.targetElement) {
            return true;
        }

        if (event.forwardedTouchEvent) {
            return true;
        }

        // Programmatically generated events targeting a specific element should be permitted
        if (!event.cancelable) {
            return true;
        }

        // Derive and check the target element to see whether the mouse event needs to be permitted;
        // unless explicitly enabled, prevent non-touch click events from triggering actions,
        // to prevent ghost/doubleclicks.
        if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

            // Prevent any user-added listeners declared on FastClick element from being fired.
            if (event.stopImmediatePropagation) {
                event.stopImmediatePropagation();
            } else {

                // Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
                event.propagationStopped = true;
            }

            // Cancel the event
            event.stopPropagation();
            event.preventDefault();

            return false;
        }

        // If the mouse event is permitted, return true for the action to go through.
        return true;
    };


    /**
     * On actual clicks, determine whether this is a touch-generated click, a click action occurring
     * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
     * an actual click which should be permitted.
     *
     * @param {Event} event
     * @returns {boolean}
     */
    FastClick.prototype.onClick = function (event) {
        var permitted;

        // It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
        if (this.trackingClick) {
            this.targetElement = null;
            this.trackingClick = false;
            return true;
        }

        // Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
        if (event.target.type === 'submit' && event.detail === 0) {
            return true;
        }

        permitted = this.onMouse(event);

        // Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
        if (!permitted) {
            this.targetElement = null;
        }

        // If clicks are permitted, return true for the action to go through.
        return permitted;
    };


    /**
     * Remove all FastClick's event listeners.
     *
     * @returns {void}
     */
    FastClick.prototype.destroy = function () {
        var layer = this.layer;

        if (deviceIsAndroid) {
            layer.removeEventListener('mouseover', this.onMouse, true);
            layer.removeEventListener('mousedown', this.onMouse, true);
            layer.removeEventListener('mouseup', this.onMouse, true);
        }

        layer.removeEventListener('click', this.onClick, true);
        layer.removeEventListener('touchstart', this.onTouchStart, false);
        layer.removeEventListener('touchmove', this.onTouchMove, false);
        layer.removeEventListener('touchend', this.onTouchEnd, false);
        layer.removeEventListener('touchcancel', this.onTouchCancel, false);
    };


    /**
     * Check whether FastClick is needed.
     *
     * @param {Element} layer The layer to listen on
     */
    FastClick.notNeeded = function (layer) {
        var metaViewport;
        var chromeVersion;
        var blackberryVersion;
        var firefoxVersion;

        // Devices that don't support touch don't need FastClick
        if (typeof window.ontouchstart === 'undefined') {
            return true;
        }

        // Chrome version - zero for other browsers
        chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

        if (chromeVersion) {

            if (deviceIsAndroid) {
                metaViewport = document.querySelector('meta[name=viewport]');

                if (metaViewport) {
                    // Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
                    if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
                        return true;
                    }
                    // Chrome 32 and above with width=device-width or less don't need FastClick
                    if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
                        return true;
                    }
                }

                // Chrome desktop doesn't need FastClick (issue #15)
            } else {
                return true;
            }
        }

        if (deviceIsBlackBerry10) {
            blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

            // BlackBerry 10.3+ does not require Fastclick library.
            // https://github.com/ftlabs/fastclick/issues/251
            if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
                metaViewport = document.querySelector('meta[name=viewport]');

                if (metaViewport) {
                    // user-scalable=no eliminates click delay.
                    if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
                        return true;
                    }
                    // width=device-width (or less than device-width) eliminates click delay.
                    if (document.documentElement.scrollWidth <= window.outerWidth) {
                        return true;
                    }
                }
            }
        }

        // IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
        if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
            return true;
        }

        // Firefox version - zero for other browsers
        firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1];

        if (firefoxVersion >= 27) {
            // Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

            metaViewport = document.querySelector('meta[name=viewport]');
            if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
                return true;
            }
        }

        // IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
        // http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
        if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
            return true;
        }

        return false;
    };


    /**
     * Factory method for creating a FastClick object
     *
     * @param {Element} layer The layer to listen on
     * @param {Object} [options={}] The options to override the defaults
     */
    FastClick.attach = function (layer, options) {
        return new FastClick(layer, options);
    };


    if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

        // AMD. Register as an anonymous module.
        define(function () {
            return FastClick;
        });
    } else if (typeof module !== 'undefined' && module.exports) {
        module.exports = FastClick.attach;
        module.exports.FastClick = FastClick;
    } else {
        window.FastClick = FastClick;
    }
}());

/**
 @module mobile-angular-ui.core.activeLinks
 @description

 `mobile-angular-ui.activeLinks` module sets up `.active` class for `a` elements those `href` attribute matches the current angular `$location` url. It takes care of excluding both search part and hash part from comparison.

 `.active` classes are added/removed each time one of `$locationChangeSuccess` or `$includeContentLoaded` is fired.

 ## Usage

 Just declare it as a dependency to your app unless you have already included one of its super-modules.

 ```
 angular.module('myApp', ['mobile-angular-ui.core.activeLinks']);
 ```

 **NOTE:** if you are using it without Bootstrap you may need to add some css to your stylesheets to reflect the activation state of links. I.e.

 ``` css
 a.active {
  color: blue;
}
 ```

 */
(function () {
    'use strict';

    angular.module("mobile-angular-ui.core.activeLinks", [])

        .run([
            '$rootScope',
            '$window',
            '$document',
            '$location',
            function ($rootScope, $window, $document, $location) {

                var setupActiveLinks = function () {
                    // Excludes both search part and hash part from
                    // comparison.
                    var url = $location.url(),
                        firstHash = url.indexOf('#'),
                        firstSearchMark = url.indexOf('?'),
                        locationHref = $window.location.href,
                        plainUrlLength = locationHref.indexOf(url),
                        newPath;

                    if (firstHash === -1 && firstSearchMark === -1) {
                        newPath = locationHref;
                    } else if (firstHash !== -1 && firstHash > firstSearchMark) {
                        newPath = locationHref.slice(0, plainUrlLength + firstHash);
                    } else if (firstSearchMark !== -1 && firstSearchMark > firstHash) {
                        newPath = locationHref.slice(0, plainUrlLength + firstSearchMark);
                    }

                    var domLinks = $document[0].links;
                    for (var i = 0; i < domLinks.length; i++) {
                        var domLink = domLinks[i];
                        var link = angular.element(domLink);
                        if (link.attr('href') && link.attr('href') !== '' && domLink.href === newPath) {
                            link.addClass('active');
                        } else if (link.attr('href') && link.attr('href') !== '' && domLink.href && domLink.href.length) {
                            link.removeClass('active');
                        }
                    }
                };

                $rootScope.$on('$locationChangeSuccess', setupActiveLinks);
                $rootScope.$on('$includeContentLoaded', setupActiveLinks);
            }
        ]);

}());


/**
 * @module mobile-angular-ui.core.capture
 * @description
 *
 * The `capture` module exposes directives to let you extract markup which can be used in other parts of a template using `uiContentFor` and `uiYieldTo` directives.
 *
 * It provides a way to move or clone a block of markup to other parts of the document.
 *
 * This method is particularly useful to setup parts of the layout within an angular view. Since blocks of html are transplanted within their original `$scope` is easy to create layout interactions depending on the context. Some tipical task you can accomplish with these directives are: _setup the navbar title depending on the view_ or _place a submit button for a form inside a navbar_.
 *
 * ## Usage
 *
 * Declare it as a dependency to your app unless you have already included some of its super-modules.
 *
 * ```
 * angular.module('myApp', ['mobile-angular-ui']);
 * ```
 *
 * Or
 *
 * ```
 * angular.module('myApp', ['mobile-angular-ui']);
 * ```
 *
 * Or
 *
 * ```
 * angular.module('myApp', ['mobile-angular-ui.core.capture']);
 * ```
 *
 * Use `ui-yield-to` as a placeholder.
 *
 * ``` html
 * <!-- index.html -->
 *
 * <div class="navbar">
 *   <div ui-yield-to="title" class="navbar-brand">
 *     <span>Default Title</span>
 *   </div>
 * </div>
 *
 * <div class="app-body">
 *   <ng-view class="app-content"></ng-view>
 * </div>
 * ```
 *
 * Use `ui-content-for` inside any view to populate the `ui-yield-to` content.
 *
 * ``` html
 * <!-- myView.html -->
 *
 * <div ui-content-for="title">
 *   <span>My View Title</span>
 * </div>
 * ```
 *
 * Since the original scope is preserved you can use directives inside `ui-content-for` blocks to interact with the current scope. In the following example we will add a navbar button to submit a form inside a nested view.
 *
 *
 * ``` html
 * <!-- index.html -->
 *
 * <div class="navbar">
 *   <div ui-yield-to="navbarAction">
 *   </div>
 * </div>
 *
 * <div class="app-body">
 *   <ng-view class="app-content"></ng-view>
 * </div>
 * ```
 *
 * ``` html
 * <!-- newCustomer.html -->
 *
 * <form ng-controller="newCustomerController">
 *
 *   <div class="inputs">
 *     <input type="text" ng-model="customer.name" />
 *   </div>
 *
 *   <div ui-content-for="navbarAction">
 *     <button ng-click="createCustomer()">
 *       Save
 *     </button>
 *   </div>
 *
 * </form>
 * ```
 *
 * ``` javascript
 * app.controller('newCustomerController', function($scope, Store){
 *   $scope.customer = {};
 *   $scope.createCustomer = function(){
 *     Store.create($scope.customer);
 *     // ...
 *   }
 * });
 * ```
 *
 * If you wish you can also duplicate markup instead of move it. Just add `duplicate` parameter to `uiContentFor` directive to specify this behaviour.
 *
 * ``` html
 * <div ui-content-for="navbarAction" duplicate>
 *   <button ng-click="createCustomer()">
 *     Save
 *   </button>
 * </div>
 * ```
 */
(function () {
    'use strict';

    angular.module('mobile-angular-ui.core.capture', [])

        .run([
            'Capture',
            '$rootScope',
            function (Capture, $rootScope) {
                $rootScope.$on('$routeChangeSuccess', function () {
                    Capture.resetAll();
                });
            }
        ])

        .factory('Capture', [
            '$compile',
            function ($compile) {
                var yielders = {};

                return {
                    resetAll: function () {
                        for (var name in yielders) {
                            if (yielders.hasOwnProperty(name)) {
                                this.resetYielder(name);
                            }
                        }
                    },

                    resetYielder: function (name) {
                        var b = yielders[name];
                        this.setContentFor(name, b.defaultContent, b.defaultScope);
                    },

                    putYielder: function (name, element, defaultScope, defaultContent) {
                        var yielder = {};
                        yielder.name = name;
                        yielder.element = element;
                        yielder.defaultContent = defaultContent || '';
                        yielder.defaultScope = defaultScope;
                        yielders[name] = yielder;
                    },

                    getYielder: function (name) {
                        return yielders[name];
                    },

                    removeYielder: function (name) {
                        delete yielders[name];
                    },

                    setContentFor: function (name, content, scope) {
                        var b = yielders[name];
                        if (!b) {
                            return;
                        }
                        b.element.html(content);
                        $compile(b.element.contents())(scope);
                    }

                };
            }
        ])

        /**
         * @directive uiContentFor
         * @restrict A
         * @description
         *
         * `ui-content-for` makes inner contents to replace the corresponding
         * `ui-yield-to` placeholder contents.
         *
         * `uiContentFor` is intended to be used inside a view in order to populate outer placeholders.
         * Any content you send to placeholders via `ui-content-for` is
         * reverted to placeholder defaults after view changes (ie. on `$routeChangeStart`).
         *
         * @param {string} uiContentFor The id of the placeholder to be replaced
         * @param {boolean} uiDuplicate If present duplicates the content instead of moving it (default to `false`)
         *
         */
        .directive('uiContentFor', [
            'Capture',
            function (Capture) {
                return {
                    compile: function (tElem, tAttrs) {
                        var rawContent = tElem.html();
                        if (tAttrs.uiDuplicate === null || tAttrs.uiDuplicate === undefined) {
                            // no need to compile anything!
                            tElem.html('');
                            tElem.remove();
                        }
                        return function (scope, elem, attrs) {
                            Capture.setContentFor(attrs.uiContentFor, rawContent, scope);
                        };
                    }
                };
            }
        ])

        /**
         * @directive uiYieldTo
         * @restrict A
         * @description
         *
         * `ui-yield-to` defines a placeholder which contents will be further replaced by `ui-content-for` directive.
         *
         * Inner html is considered to be a default. Default is restored any time `$routeChangeStart` happens.
         *
         * @param {string} uiYieldTo The unique id of this placeholder.
         *
         */
        .directive('uiYieldTo', [
            '$compile', 'Capture', function ($compile, Capture) {
                return {
                    link: function (scope, element, attr) {
                        Capture.putYielder(attr.uiYieldTo, element, scope, element.html());

                        element.on('$destroy', function () {
                            Capture.removeYielder(attr.uiYieldTo);
                        });

                        scope.$on('$destroy', function () {
                            Capture.removeYielder(attr.uiYieldTo);
                        });
                    }
                };
            }
        ]);

}());

(function () {
    'use strict';
    var module = angular.module('mobile-angular-ui.core.fastclick', []);

    module.run(['$window', function ($window) {

        //Temporarly bugfix in overthrow/fastclick:
        var orgHandler = FastClick.prototype.onTouchEnd;

        // Some old versions of Android don't have Function.prototype.bind
        function bind(method, context) {
            return function () {
                return method.apply(context, arguments);
            };
        }

        FastClick.prototype.onTouchEnd = function (event) {

            if (!event.changedTouches) {
                event.changedTouches = [{}];
            }

            orgHandler = bind(orgHandler, this);
            orgHandler(event);
        };

        FastClick.attach($window.document.body);

    }]);

    angular.forEach(['select', 'input', 'textarea'], function (directiveName) {

        module.directive(directiveName, function () {
            return {
                restrict: 'E',
                compile: function (elem) {
                    elem.addClass('needsclick');
                }
            };
        });
    });
}());

/**

 @module mobile-angular-ui.core.outerClick
 @description

 Provides a directive to specifiy a behaviour when click/tap events
 happen outside an element. This can be easily used
 to implement eg. __close on outer click__ feature for a dropdown.

 ## Usage

 Declare it as a dependency to your app unless you have already
 included some of its super-modules.

 ```
 angular.module('myApp', ['mobile-angular-ui']);
 ```

 Or

 ```
 angular.module('myApp', ['mobile-angular-ui.core']);
 ```

 Or

 ```
 angular.module('myApp', ['mobile-angular-ui.core.outerClick']);
 ```

 Use `ui-outer-click` to define an expression to evaluate when an _Outer Click_ event happens.
 Use `ui-outer-click-if` parameter to define a condition to enable/disable the listener.

 ``` html
 <div class="btn-group">
 <a ui-turn-on='myDropdown' class='btn'>
 <i class="fa fa-ellipsis-v"></i>
 </a>
 <ul
 class="dropdown-menu"
 ui-outer-click="Ui.turnOff('myDropdown')"
 ui-outer-click-if="Ui.active('myDropdown')"
 role="menu"
 ui-show="myDropdown"
 ui-state="myDropdown"
 ui-turn-off="myDropdown">

 <li><a>Action</a></li>
 <li><a>Another action</a></li>
 <li><a>Something else here</a></li>
 <li class="divider"></li>
 <li><a>Separated link</a></li>
 </ul>
 </div>
 ```

 */
(function () {
    'use strict';

    var isAncestorOrSelf = function (element, target) {
        var parent = element;
        while (parent.length > 0) {
            if (parent[0] === target[0]) {
                parent = null;
                return true;
            }
            parent = parent.parent();
        }
        parent = null;
        return false;
    };

    angular.module('mobile-angular-ui.core.outerClick', [])

        /**
         * @service bindOuterClick
         * @as function
         *
         * @description
         * This is a service function that binds a callback to be conditionally executed
         * when a click event happens outside a specified element.
         *
         * Ie.
         *
         * ``` js
         * app.directive('myDirective', function('bindOuterClick'){
    *   return {
    *     link: function(scope, element) {
    *       bindOuterClick(element, function(scope, extra){
    *         alert('You clicked ouside me!');
    *       }, function(e){
    *         return element.hasClass('disabled') ? true : false;
    *       });
    *     }
    *   };
    * });
         * ```
         * @scope {scope} the scope to eval callbacks
         * @param {DomElement|$element} element The element to bind to.
         * @param {function} callback A `function(scope, options)`, usually the result of `$parse`, that is called when an _outer click_ event happens.
         * @param {string|function} condition Angular `$watch` expression to decide whether to run `callback` or not.
         */
        .factory('bindOuterClick', [
            '$document',
            '$timeout',
            function ($document, $timeout) {

                return function (scope, element, outerClickFn, outerClickIf) {
                    var handleOuterClick = function (event) {
                        if (!isAncestorOrSelf(angular.element(event.target), element)) {
                            scope.$apply(function () {
                                outerClickFn(scope, {$event: event});
                            });
                        }
                    };

                    var stopWatching = angular.noop;
                    var t = null;

                    if (outerClickIf) {
                        stopWatching = scope.$watch(outerClickIf, function (value) {
                            $timeout.cancel(t);

                            if (value) {
                                // prevents race conditions
                                // activating with other click events
                                t = $timeout(function () {
                                    $document.on('click tap', handleOuterClick);
                                }, 0);

                            } else {
                                $document.unbind('click tap', handleOuterClick);
                            }
                        });
                    } else {
                        $timeout.cancel(t);
                        $document.on('click tap', handleOuterClick);
                    }

                    scope.$on('$destroy', function () {
                        stopWatching();
                        $document.unbind('click tap', handleOuterClick);
                    });
                };
            }
        ])


        /**
         * @directive outerClick
         *
         * @description
         * Evaluates an expression when an _Outer Click_ event happens.
         *
         * @param {expression} uiOuterClick Expression to evaluate when an _Outer Click_ event happens.
         * @param {expression} uiOuterClickIf Condition to enable/disable the listener. Defaults to `true`.
         */
        .directive('uiOuterClick', [
            'bindOuterClick',
            '$parse',
            function (bindOuterClick, $parse) {
                return {
                    restrict: 'A',
                    compile: function (elem, attrs) {
                        var outerClickFn = $parse(attrs.uiOuterClick);
                        var outerClickIf = attrs.uiOuterClickIf;
                        return function (scope, elem) {
                            bindOuterClick(scope, elem, outerClickFn, outerClickIf);
                        };
                    }
                };
            }
        ]);
}());
(function () {
    'use strict';
    /**
     * @module mobile-angular-ui.core.sharedState
     *
     * @description
     * `mobile-angular-ui.core.sharedState` is expose the homonymous service
     * `SharedState` and a group of directives to access it.
     *
     * `SharedState` allows to use elementary angular or angularish directives
     * to create interactive components.
     *
     * Ie.
     *
     * ``` html
     * <div class="nav nav-tabs" ui-state='activeTab'>
     *   <a ui-set="{activeTab: 1}">Tab1</a>
     *   <a ui-set="{activeTab: 2}">Tab2</a>
     *   <a ui-set="{activeTab: 3}">Tab3</a>
     * </div>
     * <div class="tabs">
     *   <div ui-if="activeTab == 1">Tab1</div>
     *   <div ui-if="activeTab == 2">Tab2</div>
     *   <div ui-if="activeTab == 3">Tab3</div>
     * </div>
     * ```
     *
     * Using `SharedState` you will be able to:
     *
     * - Create interactive components without having to write javascript code
     * - Have your controller free from UI logic
     * - Separe `ng-click` triggering application logic from those having a visual effect only
     * - Export state of components to urls
     * - Easily make components comunicate each other
     *
     * Also note that:
     *
     * Data structures retaining statuses will stay outside angular scopes
     * thus they are not evaluated against digest cycle until its necessary.
     * Also although statuses are sort of global variables `SharedState` will
     * take care of disposing them when no scopes are requiring them anymore.
     *
     * A set of `ui-*` directives are available to interact with `SharedState`
     * module and will hopefully let you spare your controllers and your time
     * for something that is more meaningful than this:
     *
     * ``` js
     * $scope.activeTab = 1;
     *
     * $scope.setActiveTab = function(n) {
   *   $scope.activeTab = n;
   * };
     * ```
     *
     * ## Usage
     *
     * Declare it as a dependency to your app unless you have already included some
     * of its super-modules.
     *
     * ```
     * angular.module('myApp', ['mobile-angular-ui.core.sharedState']);
     * ```
     *
     * Use `ui-state` directive to require/initialize a state from the target element scope
     *
     * **Example.** Tabs
     *
     * <iframe class='embedded-example' src='/examples/tabs.html'></iframe>
     *
     * **Example.** Custom components
     *
     * <iframe class='embedded-example'  src='/examples/lightbulb.html'></iframe>
     *
     * NOTE: `ui-toggle/set/turnOn/turnOff` responds to `click/tap` without stopping propagation so you can use them along with ng-click too. You can also change events to respond to with `ui-triggers` attribute.
     *
     * Any `SharedState` method is exposed through `Ui` object in `$rootScope`. So you could always do `ng-click="Ui.turnOn('myVar')"`.
     *
     * Since `SharedState` is a service you can initialize/set statuses through controllers too:
     *
     * ``` js
     * app.controller('myController', function($scope, SharedState){
   *   SharedState.initialize($scope, "activeTab", 3);
   * });
     * ```
     *
     * As well as you can use `ui-default` for that:
     *
     * ``` html
     * <div class="tabs" ui-state="activeTab" ui-default="thisIsAnExpression(5 + 1 - 2)"></div>
     * ```
     *
     */
    var module = angular.module('mobile-angular-ui.core.sharedState', []);

    /**
     * @ngdoc service
     * @class SharedState
     *
     * @description
     *
     * A `SharedState` state can be considered as a global variable identified by an `id`.
     *
     * `SharedState` service exposes methods to interact with statuses to create, read and update states.
     *
     * It acts as a BUS between UI elements to share UI related state that is automatically disposed when all scopes requiring it are destroyed.
     *
     * eg.
     *
     * ``` js
     * app.controller('controller1', function($scope, SharedState){
   *   SharedState.initialize($scope, 'myId');
   * });
     *
     * app.controller('controller2', function(SharedState){
   *   SharedState.toggle('myId');
   * });
     * ```
     *
     * Data structures retaining statuses will stay outside angular scopes thus they are not evaluated against digest cycle until its necessary. Also although statuses are sort of global variables `SharedState` will take care of disposing them when no scopes are requiring them anymore.
     *
     * A set of `ui-*` directives are available to interact with `SharedState` module and will hopefully let you spare your controllers and your time for something that is more meaningful than this:
     *
     * ``` js
     * $scope.activeTab = 1;
     *
     * $scope.setActiveTab = function(n) {
   *   $scope.activeTab = n;
   * };
     * ```
     *
     */

    /**
     * @event 'mobile-angular-ui.state.initialized.ID'
     * @shortname initialized
     * @memberOf mobile-angular-ui.core.sharedState~SharedState
     *
     * @description
     * Broadcasted on `$rootScope` when `#initialize` is called for a new state not referenced by any scope currently.
     *
     * @param {any} currentValue The value with which this state has been initialized
     *
     * @memberOf mobile-angular-ui.core.sharedState~SharedState
     */

    /**
     * @event 'mobile-angular-ui.state.destroyed.ID'
     * @shortname destroyed
     * @memberOf mobile-angular-ui.core.sharedState~SharedState
     *
     * @description
     * Broadcasted on `$rootScope` when a state is destroyed.
     *
     */

    /**
     * @event 'mobile-angular-ui.state.changed.ID'
     * @shortname changed
     * @memberOf mobile-angular-ui.core.sharedState~SharedState
     *
     * @description
     * Broadcasted on `$rootScope` the value of a state changes.
     *
     * ``` js
     * $scope.$on('mobile-angular-ui.state.changed.uiSidebarLeft', function(e, newVal, oldVal) {
     *   if (newVal === true) {
     *     console.log('sidebar opened');
     *   } else {
     *     console.log('sidebar closed');
     *   }
     * });
     * ```
     *
     * @param {any} newValue
     * @param {any} oldValue
     *
     */

    module.factory('SharedState', [
        '$rootScope',
        function ($rootScope) {
            var values = {};    // values, context object for evals
            var statusesMeta = {};  // status info
            var scopes = {};    // scopes references
            var exclusionGroups = {}; // support exclusive boolean sets

            return {
                /**
                 * @function initialize
                 * @memberOf mobile-angular-ui.core.sharedState~SharedState
                 * @description
                 *
                 * Initialize, or require if already intialized, a state identified by `id` within the provided `scope`, making it available to the rest of application.
                 *
                 * A `SharedState` is bound to one or more scopes. Each time `initialize` is called for an angular `scope` this will be bound to the `SharedState` and a reference count is incremented to allow garbage collection.
                 *
                 * Reference count is decremented once the scope is destroyed. When the counter reach 0 the state will be disposed.
                 *
                 * @param  {scope} scope The scope to bound this state
                 * @param  {string} id The unique name of this state
                 * @param  {object} [options] Options
                 * @param  {object} [options.defaultValue] the initialization value, it is taken into account only if the state `id` is not already initialized
                 * @param  {object} [options.exclusionGroup] Specifies an exclusion group for the state. This means that for boolean operations (ie. toggle, turnOn, turnOf) when this state is set to `true`, any other state that is in the same `exclusionGroup` will be set to `false`.
                 */
                initialize: function (scope, id, options) {
                    options = options || {};

                    var isNewScope = scopes[scope] === undefined,
                        defaultValue = options.defaultValue,
                        exclusionGroup = options.exclusionGroup;

                    scopes[scope.$id] = scopes[scope.$id] || [];
                    scopes[scope.$id].push(id);

                    if (!statusesMeta[id]) { // is a brand new state
                        // not referenced by any
                        // scope currently

                        statusesMeta[id] = angular.extend({}, options, {references: 1});

                        $rootScope.$broadcast('mobile-angular-ui.state.initialized.' + id, defaultValue);

                        if (defaultValue !== undefined) {
                            this.setOne(id, defaultValue);
                        }

                        if (exclusionGroup) {
                            // Exclusion groups are sets of statuses references
                            exclusionGroups[exclusionGroup] = exclusionGroups[exclusionGroup] || {};
                            exclusionGroups[exclusionGroup][id] = true;
                        }

                    } else if (isNewScope) { // is a new reference from
                        // a different scope
                        statusesMeta[id].references++;
                    }
                    scope.$on('$destroy', function () {
                        var ids = scopes[scope.$id] || [];
                        for (var i = 0; i < ids.length; i++) {
                            var status = statusesMeta[ids[i]];

                            if (status.exclusionGroup) {
                                delete exclusionGroups[status.exclusionGroup][ids[i]];
                                if (Object.keys(exclusionGroups[status.exclusionGroup]).length === 0) {
                                    delete exclusionGroups[status.exclusionGroup];
                                }
                            }

                            status.references--;
                            if (status.references <= 0) {
                                delete statusesMeta[ids[i]];
                                delete values[ids[i]];
                                $rootScope.$broadcast('mobile-angular-ui.state.destroyed.' + id);
                            }
                        }
                        delete scopes[scope.$id];
                    });
                },

                /**
                 * @function setOne
                 * @memberOf mobile-angular-ui.core.sharedState~SharedState
                 * @description
                 *
                 * Set the value of the state identified by `id` to the `value` parameter.
                 *
                 * @param  {string} id Unique identifier for state
                 * @param  {any} value New value for this state
                 */
                setOne: function (id, value) {
                    if (statusesMeta[id] !== undefined) {
                        var prev = values[id];
                        values[id] = value;
                        if (prev !== value) {
                            $rootScope.$broadcast('mobile-angular-ui.state.changed.' + id, value, prev);
                        }
                        return value;
                    } else {
                        /* global console: false */
                        if (console) {
                            console.warn('Warning: Attempt to set uninitialized shared state:', id);
                        }
                    }
                },

                /**
                 * @memberOf mobile-angular-ui.core.sharedState~SharedState
                 *
                 * @function setMany
                 * @description
                 *
                 * Set multiple statuses at once. ie.
                 *
                 * ```
                 * SharedState.setMany({ activeTab: 'firstTab', sidebarIn: false });
                 * ```
                 *
                 * @param {object} object An object of the form `{state1: value1, ..., stateN: valueN}`
                 */
                setMany: function (map) {
                    angular.forEach(map, function (value, id) {
                        this.setOne(id, value);
                    }, this);
                },


                /**
                 * @function set
                 * @memberOf mobile-angular-ui.core.sharedState~SharedState
                 * @description
                 *
                 * A shorthand for both `setOne` and `setMany`.
                 * When called with only one parameter that is an object
                 * it is the same of `setMany`, otherwise is the
                 * same of `setOne`.
                 *
                 * @param {string|object} idOrMap A state id or a `{state: value}` map object.
                 * @param {any} [value] The value to assign in case idOrMap is a string.
                 */
                set: function (idOrMap, value) {
                    if (angular.isObject(idOrMap) && angular.isUndefined(value)) {
                        this.setMany(idOrMap);
                    } else {
                        this.setOne(idOrMap, value);
                    }
                },

                /**
                 * @function turnOn
                 * @memberOf mobile-angular-ui.core.sharedState~SharedState
                 * @description
                 *
                 * Set shared state identified by `id` to `true`. If the
                 * shared state has been initialized with `exclusionGroup`
                 * option it will also turn off (set to `false`) all other
                 * statuses from the same exclusion group.
                 *
                 * @param  {string} id The unique name of this state
                 */
                turnOn: function (id) {
                    // Turns off other statuses belonging to the same exclusion group.
                    var eg = statusesMeta[id] && statusesMeta[id].exclusionGroup;
                    if (eg) {
                        var egStatuses = Object.keys(exclusionGroups[eg]);
                        for (var i = 0; i < egStatuses.length; i++) {
                            var item = egStatuses[i];
                            if (item !== id) {
                                this.turnOff(item);
                            }
                        }
                    }
                    return this.setOne(id, true);
                },

                /**
                 * @function turnOff
                 * @memberOf mobile-angular-ui.core.sharedState~SharedState
                 *
                 * @description
                 * Set shared state identified by `id` to `false`.
                 *
                 * @param  {string} id The unique name of this state
                 */
                turnOff: function (id) {
                    return this.setOne(id, false);
                },

                /**
                 * @function toggle
                 * @memberOf mobile-angular-ui.core.sharedState~SharedState
                 * @description
                 *
                 * If current value for shared state identified by `id` evaluates
                 * to `true` it calls `turnOff` on it otherwise calls `turnOn`.
                 * Be aware that it will take into account `exclusionGroup` option.
                 * See `#turnOn` and `#initialize` for more.
                 *
                 * @param  {string} id The unique name of this state
                 */
                toggle: function (id) {
                    return this.get(id) ? this.turnOff(id) : this.turnOn(id);
                },

                /**
                 * @function get
                 * @memberOf mobile-angular-ui.core.sharedState~SharedState
                 *
                 * @description
                 * Returns the current value of the state identified by `id`.
                 *
                 * @param  {string} id The unique name of this state
                 * @returns {any}
                 */
                get: function (id) {
                    return statusesMeta[id] && values[id];
                },

                /**
                 * @function isActive
                 * @memberOf mobile-angular-ui.core.sharedState~SharedState
                 * @description
                 *
                 * Return `true` if the boolean conversion of `#get(id)` evaluates to `true`.
                 *
                 * @param  {string} id The unique name of this state
                 * @returns {bool}
                 */
                isActive: function (id) {
                    return !!this.get(id);
                },

                /**
                 * @function active
                 * @alias mobile-angular-ui.core.sharedState~SharedState.isActive
                 * @memberOf mobile-angular-ui.core.sharedState~SharedState
                 * @description
                 *
                 * Alias for `#isActive`.
                 *
                 * @param  {string} id The unique name of this state
                 * @returns {bool}
                 */
                active: function (id) {
                    return this.isActive(id);
                },

                /**
                 * @function isUndefined
                 * @memberOf mobile-angular-ui.core.sharedState~SharedState
                 * @description
                 *
                 * Return `true` if state identified by `id` is not defined.
                 *
                 * @param  {string} id The unique name of this state
                 * @returns {bool}
                 */
                isUndefined: function (id) {
                    return statusesMeta[id] === undefined || this.get(id) === undefined;
                },

                /**
                 * Returns `true` if state identified by `id` exsists.
                 *
                 * @param  {string} id The unique name of this state
                 * @returns {bool}
                 *
                 * @function has
                 * @memberOf mobile-angular-ui.core.sharedState~SharedState
                 */
                has: function (id) {
                    return statusesMeta[id] !== undefined;
                },

                /**
                 * Returns the number of references of a status.
                 *
                 * @param  {string} id The unique name of this state
                 * @returns {integer}
                 *
                 * @function referenceCount
                 * @memberOf mobile-angular-ui.core.sharedState~SharedState
                 */
                referenceCount: function (id) {
                    var status = statusesMeta[id];
                    return status === undefined ? 0 : status.references;
                },

                /**
                 * Returns `true` if `#get(id)` is exactly equal (`===`) to `value` param.
                 *
                 * @param  {string} id The unique name of this state
                 * @param  {any} value The value for comparison
                 * @returns {bool}
                 *
                 * @function equals
                 * @memberOf mobile-angular-ui.core.sharedState~SharedState
                 */
                equals: function (id, value) {
                    return this.get(id) === value;
                },


                /**
                 * Alias for `#equals`
                 *
                 * @param  {string} id The unique name of this state
                 * @param  {any} value The value for comparison
                 * @returns {bool}
                 *
                 * @function eq
                 * @memberOf mobile-angular-ui.core.sharedState~SharedState
                 * @alias mobile-angular-ui.core.sharedState~SharedState.equals
                 */
                eq: function (id, value) {
                    return this.equals(id, value);
                },

                /**
                 * Returns an object with all the status values currently stored.
                 * It has the form of `{statusId: statusValue}`.
                 *
                 * Bear in mind that in order to spare resources it currently
                 * returns just the internal object retaining statuses values.
                 * Thus it is not intended to be modified and direct changes to it will be not tracked or notified.
                 *
                 * Just clone before apply any change to it.
                 *
                 * @returns {object}
                 *
                 * @function values
                 * @memberOf mobile-angular-ui.core.sharedState~SharedState
                 */
                values: function () {
                    return values;
                }

            };
        }
    ]);

    var uiBindEvent = function (scope, element, eventNames, fn) {
        eventNames = eventNames || 'click tap';
        element.on(eventNames, function (event) {
            scope.$apply(function () {
                fn(scope, {$event: event});
            });
        });
    };

    /**
     * Calls `SharedState#initialize` on the scope relative to the element using it.
     *
     * @param {string} uiState The shared state id
     * @param {expression} [uiDefault] the default value
     *
     * @directive uiState
     */
    module.directive('uiState', [
        'SharedState',
        function (SharedState) {
            return {
                restrict: 'EA',
                priority: 601, // more than ng-if
                link: function (scope, elem, attrs) {
                    var id = attrs.uiState || attrs.id,
                        defaultValueExpr = attrs.uiDefault || attrs['default'],
                        defaultValue = defaultValueExpr ? scope.$eval(defaultValueExpr) : undefined;

                    SharedState.initialize(scope, id, {
                        defaultValue: defaultValue,
                        exclusionGroup: attrs.uiExclusionGroup
                    });
                }
            };
        }
    ]);

    angular.forEach(['toggle', 'turnOn', 'turnOff', 'set'],
        function (methodName) {
            var directiveName = 'ui' + methodName[0].toUpperCase() + methodName.slice(1);

            /**
             * Calls `SharedState#toggle` when triggering events happens on the element using it.
             *
             * @param {string} uiToggle the target shared state
             * @param {expression} uiDefault the default value
             *
             * @directive uiToggle
             */

            /**
             * @function uiTurnOn
             *
             * @description
             * Calls `SharedState#turnOn` when triggering events happens on the element using it.
             *
             *
             * @ngdoc directive
             *
             * @param {string} uiTurnOn the target shared state
             * @param {expression} uiDefault the default value
             */

            /**
             * @function uiTurnOff
             *
             * @description
             * Calls `SharedState#turnOff` when triggering events happens on the element using it.
             *
             * @ngdoc directive
             *
             * @param {string} uiTurnOff the target shared state
             * @param {string} [uiTriggers='click tap'] the event triggering the call.
             */

            /**
             * @function uiSet
             *
             * @description
             * Calls `SharedState#set` when triggering events happens on the element using it.
             *
             * @ngdoc directive
             *
             * @param {object} uiSet The object to pass to SharedState#set
             * @param {string} [uiTriggers='click tap'] the event triggering the call.
             */

            module.directive(directiveName, [
                '$parse',
                '$interpolate',
                'SharedState',
                function ($parse, $interpolate, SharedState) {
                    var method = SharedState[methodName];
                    return {
                        restrict: 'A',
                        priority: 1, // This would make postLink calls happen after ngClick
                                     // (and similar) ones, thus intercepting events after them.
                                     //
                                     // This will prevent eventual ng-if to detach elements
                                     // before ng-click fires.

                        compile: function (elem, attrs) {
                            var attr = attrs[directiveName];
                            var needsInterpolation = attr.match(/\{\{/);

                            var exprFn = function ($scope) {
                                var res = attr;
                                if (needsInterpolation) {
                                    var interpolateFn = $interpolate(res);
                                    res = interpolateFn($scope);
                                }
                                if (methodName === 'set') {
                                    res = ($parse(res))($scope);
                                }
                                return res;
                            };

                            return function (scope, elem, attrs) {
                                var callback = function () {
                                    var arg = exprFn(scope);
                                    return method.call(SharedState, arg);
                                };
                                uiBindEvent(scope, elem, attrs.uiTriggers, callback);
                            };
                        }
                    };
                }
            ]);
        });

    /**
     * @name uiScopeContext
     * @inner
     * @description
     *
     * `uiScopeContext` is not a directive, but a parameter common to any of the
     * `ui-*` directives in this module.
     *
     * By default all `ui-*` conditions in this module evaluates in the context of
     * `SharedState` only, thus scope variable are not accessible. To use them you have
     * two options:
     *
     * #### 1. pre-interpolation
     *
     * You can use pre-interpolation in expression attribute. For instance the following syntax
     * is ligit:
     *
     * ``` html
     * <div ui-if='state{{idx}}'><!-- ... --></div>
     * ```
     *
     * In this case `idx` value is taken from scope and embedded into
     * conditions before parse them.
     *
     * This works as expected and is fine for the most cases, but it has a little caveat:
     *
     * The condition has to be re-parsed at each digest loop and has to walk scopes
     * in watchers.
     *
     * #### 2. uiScopeContext
     *
     * If you are concerned about performance issues using the first approach
     * `uiScopeContext` is a more verbose but also lightweight alternative
     * to accomplish the same.
     *
     * It allows to use current scope vars inside `ui-*` conditions, leaving
     * other scope vars (or the entire scope if not present) apart from the
     * condition evaluation process.
     *
     * Hopefully this will keep evaluation running against a flat and small data
     * structure instead of taking into account the whole scope.
     *
     * It is a list `scopeVar[ as aliasName] [, ...]` specifing one of more scope
     * variables to take into account when evaluating conditions. ie:
     *
     * ``` html
     * <!-- use item from ng-repeat -->
     * <div ui-if="openPanel == i" ui-scope-context='i' ng-repeat="i in [1,2,3]">
     *   <div class="panel-body">
     *     <!-- ... -->
     *   </div>
     * </div>
     * ```
     *
     * ``` html
     * <div ui-if="sharedState1 == myVar1 && sharedState2 == myVar2"
     *   ui-scope-context="myVar1, myVar2"
     * >
     * </div>
     * ```
     *
     * Be aware that scope vars will take precedence over sharedStates so,
     * in order to avoid name clashes you can use 'as' to refer to scope vars
     * with a different name in conditions:
     *
     * ``` html
     * <div ui-if="x == myVar1 && y == myVar2"
     *   ui-scope-context="x as myVar1, y as myVar2"
     * >
     * </div>
     * ```
     */
    var parseScopeContext = function (attr) {
        if (!attr || attr === '') {
            return [];
        }
        var vars = attr ? attr.trim().split(/ *, */) : [];
        var res = [];
        for (var i = 0; i < vars.length; i++) {
            var item = vars[i].split(/ *as */);
            if (item.length > 2 || item.length < 1) {
                throw new Error('Error parsing uiScopeContext="' + attr + '"');
            }
            res.push(item);
        }
        return res;
    };

    var mixScopeContext = function (context, scopeVars, scope) {
        for (var i = 0; i < scopeVars.length; i++) {
            var key = scopeVars[i][0];
            var alias = scopeVars[i][1] || key;
            context[alias] = key.split('.').reduce(function (scope, nextKey) {
                return scope[nextKey];
            }, scope);
        }
    };

    var parseUiCondition = function (name, attrs, $scope, SharedState, $parse, $interpolate) {
        var expr = attrs[name];
        var needsInterpolation = expr.match(/\{\{/);
        var exprFn;

        if (needsInterpolation) {
            exprFn = function (context) {
                var interpolateFn = $interpolate(expr);
                var parseFn = $parse(interpolateFn($scope));
                return parseFn(context);
            };
        } else {
            exprFn = $parse(expr);
        }

        var uiScopeContext = parseScopeContext(attrs.uiScopeContext);
        return function () {
            var context;
            if (uiScopeContext.length) {
                context = angular.extend({}, SharedState.values());
                mixScopeContext(context, uiScopeContext, $scope);
            } else {
                context = SharedState.values();
            }
            return exprFn(context);
        };
    };


    /**
     * @ngdoc directive
     * @function uiIf
     *
     * @description
     * Same as `ngIf` but evaluates condition against `SharedState` statuses too
     *
     * @param {expression} uiIf A condition to decide wether to attach the element to the dom
     * @param {list} [uiScopeContext] A list `scopeVar[ as aliasName] [, ...]` specifing one of more scope variables to take into account when evaluating condition.
     */
    module.directive('uiIf', ['$animate', 'SharedState', '$parse', '$interpolate', function ($animate, SharedState, $parse, $interpolate) {
        function getBlockNodes(nodes) {
            var node = nodes[0];
            var endNode = nodes[nodes.length - 1];
            var blockNodes = [node];
            do {
                node = node.nextSibling;
                if (!node) {
                    break;
                }
                blockNodes.push(node);
            } while (node !== endNode);

            return angular.element(blockNodes);
        }

        return {
            multiElement: true,
            transclude: 'element',
            priority: 600,
            terminal: true,
            restrict: 'A',
            $$tlb: true,
            link: function ($scope, $element, $attr, ctrl, $transclude) {
                var block, childScope, previousElements,
                    uiIfFn = parseUiCondition('uiIf', $attr, $scope, SharedState, $parse, $interpolate);

                $scope.$watch(uiIfFn, function uiIfWatchAction(value) {
                    if (value) {
                        if (!childScope) {
                            $transclude(function (clone, newScope) {
                                childScope = newScope;
                                clone[clone.length++] = document.createComment(' end uiIf: ' + $attr.uiIf + ' ');
                                // Note: We only need the first/last node of the cloned nodes.
                                // However, we need to keep the reference to the jqlite wrapper as it might be changed later
                                // by a directive with templateUrl when its template arrives.
                                block = {
                                    clone: clone
                                };
                                $animate.enter(clone, $element.parent(), $element);
                            });
                        }
                    } else {
                        if (previousElements) {
                            previousElements.remove();
                            previousElements = null;
                        }
                        if (childScope) {
                            childScope.$destroy();
                            childScope = null;
                        }
                        if (block) {
                            previousElements = getBlockNodes(block.clone);
                            var done = function () {
                                previousElements = null;
                            };
                            var nga = $animate.leave(previousElements, done);
                            if (nga) {
                                nga.then(done);
                            }
                            block = null;
                        }
                    }
                });
            }
        };
    }]);


    /**
     * @ngdoc directive
     * @function uiHide
     *
     * @description
     * Same as `ngHide` but evaluates condition against `SharedState` statuses
     *
     * @param {expression} uiShow A condition to decide wether to hide the element
     * @param {list} [uiScopeContext] A list `scopeVar[ as aliasName] [, ...]` specifing one of more scope variables to take into account when evaluating condition.
     */
    module.directive('uiHide', ['$animate', 'SharedState', '$parse', '$interpolate', function ($animate, SharedState, $parse, $interpolate) {
        var NG_HIDE_CLASS = 'ng-hide';
        var NG_HIDE_IN_PROGRESS_CLASS = 'ng-hide-animate';

        return {
            restrict: 'A',
            multiElement: true,
            link: function (scope, element, attr) {
                var uiHideFn = parseUiCondition('uiHide', attr, scope, SharedState, $parse, $interpolate);
                scope.$watch(uiHideFn, function uiHideWatchAction(value) {
                    $animate[value ? 'addClass' : 'removeClass'](element, NG_HIDE_CLASS, {
                        tempClasses: NG_HIDE_IN_PROGRESS_CLASS
                    });
                });
            }
        };
    }]);

    /**
     * @ngdoc directive
     * @function uiShow
     *
     * @description
     * Same as `ngShow` but evaluates condition against `SharedState` statuses
     *
     * @param {expression} uiShow A condition to decide wether to show the element
     * @param {list} [uiScopeContext] A list `scopeVar[ as aliasName] [, ...]` specifing one of more scope variables to take into account when evaluating condition.
     */
    module.directive('uiShow', ['$animate', 'SharedState', '$parse', '$interpolate', function ($animate, SharedState, $parse) {
        var NG_HIDE_CLASS = 'ng-hide';
        var NG_HIDE_IN_PROGRESS_CLASS = 'ng-hide-animate';

        return {
            restrict: 'A',
            multiElement: true,
            link: function (scope, element, attr) {
                var uiShowFn = parseUiCondition('uiShow', attr, scope, SharedState, $parse);
                scope.$watch(uiShowFn, function uiShowWatchAction(value) {
                    $animate[value ? 'removeClass' : 'addClass'](element, NG_HIDE_CLASS, {
                        tempClasses: NG_HIDE_IN_PROGRESS_CLASS
                    });
                });
            }
        };
    }]);

    /**
     * @ngdoc directive
     * @function uiClass
     *
     * @description
     * A simplified version of `ngClass` that evaluates in context of `SharedState`, it only suppors the `{'className': expr}` syntax.
     *
     * @param {expression} uiClass An expression that has to evaluate to an object of the form `{'className': expr}`, where `expr` decides wether the class should appear to element's class list.
     * @param {list} [uiScopeContext] A list `scopeVar[ as aliasName] [, ...]` specifing one of more scope variables to take into account when evaluating condition.
     */
    module.directive('uiClass', ['SharedState', '$parse', '$interpolate', function (SharedState, $parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                var uiClassFn = parseUiCondition('uiClass', attr, scope, SharedState, $parse);
                scope.$watch(uiClassFn, function uiClassWatchAction(value) {
                    var classesToAdd = '';
                    var classesToRemove = '';
                    angular.forEach(value, function (expr, className) {
                        if (expr) {
                            classesToAdd += ' ' + className;
                        } else {
                            classesToRemove += ' ' + className;
                        }
                        classesToAdd = classesToAdd.trim();
                        classesToRemove = classesToRemove.trim();
                        if (classesToAdd.length) {
                            element.addClass(classesToAdd);
                        }
                        if (classesToRemove.length) {
                            element.removeClass(classesToRemove);
                        }
                    });
                }, true);
            }
        };
    }]);

    module.run([
        '$rootScope',
        'SharedState',
        function ($rootScope, SharedState) {
            $rootScope.Ui = SharedState;
        }
    ]);


}());

/**
 * Provides directives and service to prevent touchmove default behaviour
 * for touch devices (ie. bounce on overscroll in IOS).
 *
 * #### Usage
 *
 * Use `ui-prevent-touchmove-defaults` directive on root element of your app:
 *
 * ``` html
 * <body ng-app='myApp' ui-prevent-touchmove-defaults>
 *   <!-- ... -->
 * </body>
 * ```
 *
 * Doing so `touchmove.preventDefault` logic for inner elements is inverted,
 * so any `touchmove` default behaviour is automatically prevented.
 *
 * If you wish to allow the default behaviour, for example to allow
 * inner elements to scroll, you have to explicitly mark an event to allow
 * touchmove default.
 *
 * Mobile Angular UI already handles this for `scrollable` elements, so you don't have
 * to do anything in order to support scroll.
 *
 * If you wish to allow touchmove defaults for certain element under certain conditions
 * you can use the `allowTouchmoveDefault` service.
 *
 * ie.
 *
 * ``` js
 * // always allow touchmove default for an element
 * allowTouchmoveDefault(myelem);
 * ```
 *
 * ``` js
 * // allow touchmove default for an element only under certain conditions
 * allowTouchmoveDefault(myelem, function(touchmove){
 *   return touchmove.pageY > 100;
 * });
 * ```
 *
 * @module mobile-angular-ui.core.touchmoveDefaults
 */
(function () {
    'use strict';
    var module = angular.module('mobile-angular-ui.core.touchmoveDefaults', []);

    module.directive('uiPreventTouchmoveDefaults', function () {
        var preventTouchmoveDefaultsCb = function (e) {
            if (e.allowTouchmoveDefault !== true) {
                e.preventDefault();
            }
        };

        return {
            compile: function (element) {
                if ('ontouchmove' in document) {
                    element.on('touchmove', preventTouchmoveDefaultsCb);
                }
            }
        };
    });

    /**
     * Bind a listener to an element to allow `touchmove` default behaviour
     * when `touchmove` happens inside the bound element.
     *
     * You can also provide a function to decide when to allow and
     * when to prevent it.
     *
     * ``` js
     * // always allow touchmove default
     * allowTouchmoveDefault(myelem);
     *
     * // allow touchmove default only under certain conditions
     * allowTouchmoveDefault(myelem, function(touchmove){
   *   return touchmove.pageY > 100;
   * });
     * ```
     *
     * @param {Element|$element} element The element to bind.
     * @param {function} condition A `function(touchmove)⟶boolean` to decide
     *                             whether to allow default behavior or not.
     *
     * @service allowTouchmoveDefault
     * @as function
     * @returns function Function to unbind the listener
     */

    module.factory('allowTouchmoveDefault', function () {
        var fnTrue = function () {
            return true;
        };

        if ('ontouchmove' in document) {
            return function ($element, condition) {
                condition = condition || fnTrue;

                var allowTouchmoveDefaultCallback = function (e) {
                    if (condition(e)) {
                        e.allowTouchmoveDefault = true;
                    }
                };

                $element = angular.element($element);
                $element.on('touchmove', allowTouchmoveDefaultCallback);

                $element.on('$destroy', function () {
                    $element.off('touchmove', allowTouchmoveDefaultCallback);
                    $element = null;
                });

                return function () {
                    if ($element) {
                        $element.off('touchmove', allowTouchmoveDefaultCallback);
                    }
                };
            };
        } else {
            return angular.noop;
        }
    });

}());
/**

 @module mobile-angular-ui.core

 @description

 It has all the core functionalities of Mobile Angular UI. It aims to act as a common base
 for an UI framework providing services and directives to create components and implement
 UI interactions with angular.

 <div class="alert alert-success">
 <b>NOTE</b>
 <ul>
 <li>It has no dependency on Bootstrap.</li>
 <li>It is not related to mobile apps only.</li>
 <li>It is not requiring CSS support.</li>
 <li><b>You can use it on any Angular Application and with any CSS framework.</b></li>
 </ul>
 </div>

 ## Standalone Usage

 Although `.core` module is required by `mobile-angular-ui` by default you can use it alone.

 ``` js
 angular.module('myApp', ['mobile-angular-ui.core']);
 ```

 */
(function () {
    'use strict';
    angular.module('mobile-angular-ui.core', [
        'mobile-angular-ui.core.fastclick',
        'mobile-angular-ui.core.activeLinks',
        'mobile-angular-ui.core.capture',
        'mobile-angular-ui.core.outerClick',
        'mobile-angular-ui.core.sharedState',
        'mobile-angular-ui.core.touchmoveDefaults'
    ]);
}());
/*! Overthrow. An overflow:auto polyfill for responsive design. (c) 2012: Scott Jehl, Filament Group, Inc. http://filamentgroup.github.com/Overthrow/license.txt */
(function (w, undefined) {

    var doc = w.document,
        docElem = doc.documentElement,
        enabledClassName = "overthrow-enabled",

    // Touch events are used in the polyfill, and thus are a prerequisite
        canBeFilledWithPoly = "ontouchmove" in doc,

    // The following attempts to determine whether the browser has native overflow support
    // so we can enable it but not polyfill
        nativeOverflow =
            // Features-first. iOS5 overflow scrolling property check - no UA needed here. thanks Apple :)
            "WebkitOverflowScrolling" in docElem.style ||
                // Test the windows scrolling property as well
            "msOverflowStyle" in docElem.style ||
                // Touch events aren't supported and screen width is greater than X
                // ...basically, this is a loose "desktop browser" check.
                // It may wrongly opt-in very large tablets with no touch support.
            ( !canBeFilledWithPoly && w.screen.width > 800 ) ||
                // Hang on to your hats.
                // Whitelist some popular, overflow-supporting mobile browsers for now and the future
                // These browsers are known to get overlow support right, but give us no way of detecting it.
            (function () {
                var ua = w.navigator.userAgent,
                // Webkit crosses platforms, and the browsers on our list run at least version 534
                    webkit = ua.match(/AppleWebKit\/([0-9]+)/),
                    wkversion = webkit && webkit[1],
                    wkLte534 = webkit && wkversion >= 534;

                return (
                    /* Android 3+ with webkit gte 534
                     ~: Mozilla/5.0 (Linux; U; Android 3.0; en-us; Xoom Build/HRI39) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13 */
                    ua.match(/Android ([0-9]+)/) && RegExp.$1 >= 3 && wkLte534 ||
                        /* Blackberry 7+ with webkit gte 534
                         ~: Mozilla/5.0 (BlackBerry; U; BlackBerry 9900; en-US) AppleWebKit/534.11+ (KHTML, like Gecko) Version/7.0.0 Mobile Safari/534.11+ */
                    ua.match(/ Version\/([0-9]+)/) && RegExp.$1 >= 0 && w.blackberry && wkLte534 ||
                        /* Blackberry Playbook with webkit gte 534
                         ~: Mozilla/5.0 (PlayBook; U; RIM Tablet OS 1.0.0; en-US) AppleWebKit/534.8+ (KHTML, like Gecko) Version/0.0.1 Safari/534.8+ */
                    ua.indexOf("PlayBook") > -1 && wkLte534 && !ua.indexOf("Android 2") === -1 ||
                        /* Firefox Mobile (Fennec) 4 and up
                         ~: Mozilla/5.0 (Mobile; rv:15.0) Gecko/15.0 Firefox/15.0 */
                    ua.match(/Firefox\/([0-9]+)/) && RegExp.$1 >= 4 ||
                        /* WebOS 3 and up (TouchPad too)
                         ~: Mozilla/5.0 (hp-tablet; Linux; hpwOS/3.0.0; U; en-US) AppleWebKit/534.6 (KHTML, like Gecko) wOSBrowser/233.48 Safari/534.6 TouchPad/1.0 */
                    ua.match(/wOSBrowser\/([0-9]+)/) && RegExp.$1 >= 233 && wkLte534 ||
                        /* Nokia Browser N8
                         ~: Mozilla/5.0 (Symbian/3; Series60/5.2 NokiaN8-00/012.002; Profile/MIDP-2.1 Configuration/CLDC-1.1 ) AppleWebKit/533.4 (KHTML, like Gecko) NokiaBrowser/7.3.0 Mobile Safari/533.4 3gpp-gba
                         ~: Note: the N9 doesn't have native overflow with one-finger touch. wtf */
                    ua.match(/NokiaBrowser\/([0-9\.]+)/) && parseFloat(RegExp.$1) === 7.3 && webkit && wkversion >= 533
                );
            })();

    // Expose overthrow API
    w.overthrow = {};

    w.overthrow.enabledClassName = enabledClassName;

    w.overthrow.addClass = function () {
        if (docElem.className.indexOf(w.overthrow.enabledClassName) === -1) {
            docElem.className += " " + w.overthrow.enabledClassName;
        }
    };

    w.overthrow.removeClass = function () {
        docElem.className = docElem.className.replace(w.overthrow.enabledClassName, "");
    };

    // Enable and potentially polyfill overflow
    w.overthrow.set = function () {

        // If nativeOverflow or at least the element canBeFilledWithPoly, add a class to cue CSS that assumes overflow scrolling will work (setting height on elements and such)
        if (nativeOverflow) {
            w.overthrow.addClass();
        }

    };

    // expose polyfillable
    w.overthrow.canBeFilledWithPoly = canBeFilledWithPoly;

    // Destroy everything later. If you want to.
    w.overthrow.forget = function () {

        w.overthrow.removeClass();

    };

    // Expose overthrow API
    w.overthrow.support = nativeOverflow ? "native" : "none";

})(this);

/*! Overthrow. An overflow:auto polyfill for responsive design. (c) 2012: Scott Jehl, Filament Group, Inc. http://filamentgroup.github.com/Overthrow/license.txt */
(function (w, undefined) {

    // Auto-init
    w.overthrow.set();

}(this));
/*! Overthrow. An overflow:auto polyfill for responsive design. (c) 2012: Scott Jehl, Filament Group, Inc. http://filamentgroup.github.com/Overthrow/license.txt */
(function (w, o, undefined) {

    // o is overthrow reference from overthrow-polyfill.js
    if (o === undefined) {
        return;
    }

    o.scrollIndicatorClassName = "overthrow";

    var doc = w.document,
        docElem = doc.documentElement,
    // o api
        nativeOverflow = o.support === "native",
        canBeFilledWithPoly = o.canBeFilledWithPoly,
        configure = o.configure,
        set = o.set,
        forget = o.forget,
        scrollIndicatorClassName = o.scrollIndicatorClassName;

    // find closest overthrow (elem or a parent)
    o.closest = function (target, ascend) {
        return !ascend && target.className && target.className.indexOf(scrollIndicatorClassName) > -1 && target || o.closest(target.parentNode);
    };

    // polyfill overflow
    var enabled = false;
    o.set = function () {

        set();

        // If nativeOverflow or it doesn't look like the browser canBeFilledWithPoly, our job is done here. Exit viewport left.
        if (enabled || nativeOverflow || !canBeFilledWithPoly) {
            return;
        }

        w.overthrow.addClass();

        enabled = true;

        o.support = "polyfilled";

        o.forget = function () {
            forget();
            enabled = false;
            // Remove touch binding (check for method support since this part isn't qualified by touch support like the rest)
            if (doc.removeEventListener) {
                doc.removeEventListener("touchstart", start, false);
            }
        };

        // Fill 'er up!
        // From here down, all logic is associated with touch scroll handling
        // elem references the overthrow element in use
        var elem,

        // The last several Y values are kept here
            lastTops = [],

        // The last several X values are kept here
            lastLefts = [],

        // lastDown will be true if the last scroll direction was down, false if it was up
            lastDown,

        // lastRight will be true if the last scroll direction was right, false if it was left
            lastRight,

        // For a new gesture, or change in direction, reset the values from last scroll
            resetVertTracking = function () {
                lastTops = [];
                lastDown = null;
            },

            resetHorTracking = function () {
                lastLefts = [];
                lastRight = null;
            },

        // On webkit, touch events hardly trickle through textareas and inputs
        // Disabling CSS pointer events makes sure they do, but it also makes the controls innaccessible
        // Toggling pointer events at the right moments seems to do the trick
        // Thanks Thomas Bachem http://stackoverflow.com/a/5798681 for the following
            inputs,
            setPointers = function (val) {
                inputs = elem.querySelectorAll("textarea, input");
                for (var i = 0, il = inputs.length; i < il; i++) {
                    inputs[i].style.pointerEvents = val;
                }
            },

        // For nested overthrows, changeScrollTarget restarts a touch event cycle on a parent or child overthrow
            changeScrollTarget = function (startEvent, ascend) {
                if (doc.createEvent) {
                    var newTarget = ( !ascend || ascend === undefined ) && elem.parentNode || elem.touchchild || elem,
                        tEnd;

                    if (newTarget !== elem) {
                        tEnd = doc.createEvent("HTMLEvents");
                        tEnd.initEvent("touchend", true, true);
                        elem.dispatchEvent(tEnd);
                        newTarget.touchchild = elem;
                        elem = newTarget;
                        newTarget.dispatchEvent(startEvent);
                    }
                }
            },

        // Touchstart handler
        // On touchstart, touchmove and touchend are freshly bound, and all three share a bunch of vars set by touchstart
        // Touchend unbinds them again, until next time
            start = function (e) {

                // Stop any throw in progress
                if (o.intercept) {
                    o.intercept();
                }

                // Reset the distance and direction tracking
                resetVertTracking();
                resetHorTracking();

                elem = o.closest(e.target);

                if (!elem || elem === docElem || e.touches.length > 1) {
                    return;
                }

                setPointers("none");
                var touchStartE = e,
                    scrollT = elem.scrollTop,
                    scrollL = elem.scrollLeft,
                    height = elem.offsetHeight,
                    width = elem.offsetWidth,
                    startY = e.touches[0].pageY,
                    startX = e.touches[0].pageX,
                    scrollHeight = elem.scrollHeight,
                    scrollWidth = elem.scrollWidth,

                // Touchmove handler
                    move = function (e) {

                        var ty = scrollT + startY - e.touches[0].pageY,
                            tx = scrollL + startX - e.touches[0].pageX,
                            down = ty >= ( lastTops.length ? lastTops[0] : 0 ),
                            right = tx >= ( lastLefts.length ? lastLefts[0] : 0 );

                        // If there's room to scroll the current container, prevent the default window scroll
                        if (( ty > 0 && ty < scrollHeight - height ) || ( tx > 0 && tx < scrollWidth - width )) {
                            e.preventDefault();
                        }
                        // This bubbling is dumb. Needs a rethink.
                        else {
                            changeScrollTarget(touchStartE);
                        }

                        // If down and lastDown are inequal, the y scroll has changed direction. Reset tracking.
                        if (lastDown && down !== lastDown) {
                            resetVertTracking();
                        }

                        // If right and lastRight are inequal, the x scroll has changed direction. Reset tracking.
                        if (lastRight && right !== lastRight) {
                            resetHorTracking();
                        }

                        // remember the last direction in which we were headed
                        lastDown = down;
                        lastRight = right;

                        // set the container's scroll
                        elem.scrollTop = ty;
                        elem.scrollLeft = tx;

                        lastTops.unshift(ty);
                        lastLefts.unshift(tx);

                        if (lastTops.length > 3) {
                            lastTops.pop();
                        }
                        if (lastLefts.length > 3) {
                            lastLefts.pop();
                        }
                    },

                // Touchend handler
                    end = function (e) {

                        // Bring the pointers back
                        setPointers("auto");
                        setTimeout(function () {
                            setPointers("none");
                        }, 450);
                        elem.removeEventListener("touchmove", move, false);
                        elem.removeEventListener("touchend", end, false);
                    };

                elem.addEventListener("touchmove", move, false);
                elem.addEventListener("touchend", end, false);
            };

        // Bind to touch, handle move and end within
        doc.addEventListener("touchstart", start, false);
    };

})(this, this.overthrow);

/**
 * This module will provide directives to create modals and overlays components.
 *
 * @module mobile-angular-ui.components.modals
 */
(function () {
    'use strict';
    angular.module('mobile-angular-ui.components.modals', [])

        /**
         * A directive to create modals and overlays components.
         *
         * Modals are basically the same of Bootstrap 3 but you have to use uiState
         * with `ngIf/uiIf` or `ngHide/uiHide` to `activate/dismiss` it.
         *
         * By default both modals and overlay are made always showing up by
         * css rule `.modal {display:block}`, so you can use it with
         * `ngAnimate` and other angular directives in a simpler way.
         *
         * Overlay are a style of modal that looks more native in mobile devices providing a blurred
         * overlay as background.
         *
         * You can create an overlay adding `.modal-overlay` class to a modal.
         *
         * ### Note
         *
         * For modals and overlays to cover the entire page you have to attach them
         * as child of `body` element. To achieve this from a view is a common use for
         * `contentFor/yieldTo` directives contained from
         * [capture module](/docs/module:mobile-angular-ui/module:core/module:capture):
         *
         * ``` html
         * <body ng-app="myApp">
         *
         *   <!-- ... -->
         *   <!-- Modals and Overlays -->
         *   <div ui-yield-to="modals"></div>
         *
         * </body>
         * ```
         *
         * Then you can wrap your modals and overlays in `contentFor`:
         *
         * ``` html
         * <div ui-content-for="modals">
         * * <div class="modal"><!-- ... --></div>
         * </div>
         * ```
         *
         * **Example.** Create a Modal.
         *
         * ``` html
         * <div ui-content-for="modals">
         *   <div class="modal" ui-if="modal1" ui-state='modal1'>
         *     <div class="modal-backdrop in"></div>
         *     <div class="modal-dialog">
         *       <div class="modal-content">
         *         <div class="modal-header">
         *           <button class="close"
         *                   ui-turn-off="modal1">&times;</button>
         *           <h4 class="modal-title">Modal title</h4>
         *         </div>
         *         <div class="modal-body">
         *           <p>Lorem ipsum ...</p>
         *         </div>
         *         <div class="modal-footer">
         *           <button ui-turn-off="modal1" class="btn btn-default">Close</button>
         *           <button ui-turn-off="modal1" class="btn btn-primary">Save changes</button>
         *         </div>
         *       </div>
         *     </div>
         *   </div>
         * </div>
         * ```
         *
         * **Example.** Create an Overlay.
         *
         * ``` html
         * <div ui-content-for="modals">
         *   <div class="modal modal-overlay" ui-if='modal2' ui-state='modal2'>
         *     <div class="modal-dialog">
         *       <div class="modal-content">
         *         <div class="modal-header">
         *           <button class="close"
         *                   ui-turn-off="modal2">&times;</button>
         *           <h4 class="modal-title">Modal title</h4>
         *         </div>
         *         <div class="modal-body">
         *           <p>Lorem ipsum ...</p>
         *         </div>
         *         <div class="modal-footer">
         *           <button ui-turn-off="modal2" class="btn btn-default">Close</button>
         *           <button ui-turn-off="modal2" class="btn btn-primary">Save changes</button>
         *         </div>
         *       </div>
         *     </div>
         *   </div>
         * </div>
         * ```
         *
         * @directive modal
         * @restrict C
         */
        .directive('modal', [
            '$rootElement',
            function ($rootElement) {
                return {
                    restrict: 'C',
                    link: function (scope, elem) {
                        $rootElement.addClass('has-modal');
                        elem.on('$destroy', function () {
                            $rootElement.removeClass('has-modal');
                        });
                        scope.$on('$destroy', function () {
                            $rootElement.removeClass('has-modal');
                        });

                        if (elem.hasClass('modal-overlay')) {
                            $rootElement.addClass('has-modal-overlay');
                            elem.on('$destroy', function () {
                                $rootElement.removeClass('has-modal-overlay');
                            });
                            scope.$on('$destroy', function () {
                                $rootElement.removeClass('has-modal-overlay');
                            });
                        }
                    }
                };
            }]);
}());
/**
 * @module mobile-angular-ui.components.navbars
 * @description
 *
 * Bootstrap default navbars are awesome for responsive websites, but are not the
 * best with a small screen. Also fixed positioning is yet not an option to create
 * navbars standing in top or bottom of the screen.
 *
 * Mobile Angular Ui offers an alternative to bootstrap navbars that is more
 * suitable for mobile.
 *
 * It uses scrollable areas to avoid scroll issues. In the following figure you can
 * see the difference between fixed navbars and navbars with absolute positioning.
 *
 * <figure class="full-width-figure">
 *   <img src="/assets/img/figs/fixed-overflow.png" alt=""/>
 * </figure>
 *
 * Here is the basic markup to achieve this.
 *
 * ``` html
 * <div class="app">
 *   <div class="navbar navbar-app navbar-absolute-top">
 *     <!-- ... -->
 *   </div>
 *
 *   <div class="navbar navbar-app navbar-absolute-bottom">
 *     <!-- ... -->
 *   </div>
 *
 *   <div class="app-body">
 *     <ng-view></ng-view>
 *   </div>
 * </div>
 * ```
 *
 * As you can notice the base class is `.navbar-app` while the positioning is
 * obtained adding either `.navbar-absolute-top` or `.navbar-absolute-bottom`
 * class.
 *
 * ### Mobile Navbar Layout
 *
 * Top navbar in mobile design most of the times follows a clear pattern: a
 * centered title surrounded by one or two action buttons, the _back_ or the
 * _menu_ buttons are two common examples.
 *
 * Twitter Bootstrap ships with a different arrangement of components for navbars
 * since they are supposed to host an horizontal navigation menu.
 *
 * `.navbar-app` is specifically designed to support this different type of
 * `.interaction and arrangement.
 *
 * Consider the following example:
 *
 * ``` html
 * <div class="navbar navbar-app navbar-absolute-top">
 *
 *   <div class="navbar-brand navbar-brand-center">
 *     Navbar Brand
 *   </div>
 *
 *   <div class="btn-group pull-left">
 *     <div class="btn btn-navbar">
 *       Left Action
 *     </div>
 *   </div>
 *
 *   <div class="btn-group pull-right">
 *     <div class="btn btn-navbar">
 *       Right Action
 *     </div>
 *   </div>
 * </div>
 *
 * ```
 *
 * `.navbar-brand-center` is a specialization of BS3's `.navbar-brand`.  It will
 * render the title centered and below the two button groups. Note that `.navbar-
 * brand-center` will position the title with absolute positioning ensuring that
 * it will never cover the buttons, which would cause interaction problems.
 *
 */

(function () {
    'use strict';

    var module = angular.module('mobile-angular-ui.components.navbars', []);

    /**
     * @directive navbarAbsoluteTop
     * @restrict C
     * @description
     *
     * Setup absolute positioned top navbar.
     *
     * ``` html
     *  <div class="navbar navbar-app navbar-absolute-top">
     *    <!-- ... -->
     *  </div>
     * ```
     */

    /**
     * @directive navbarAbsoluteBottom
     * @restrict C
     * @description
     *
     * Setup absolute positioned bottom navbar.
     *
     * ``` html
     *  <div class="navbar navbar-app navbar-absolute-bottom">
     *    <!-- ... -->
     *  </div>
     * ```
     */
    angular.forEach(['top', 'bottom'], function (side) {
        var directiveName = 'navbarAbsolute' + side.charAt(0).toUpperCase() + side.slice(1);
        module.directive(directiveName, [
            '$rootElement',
            function ($rootElement) {
                return {
                    restrict: 'C',
                    link: function (scope) {
                        $rootElement.addClass('has-navbar-' + side);
                        scope.$on('$destroy', function () {
                            $rootElement.removeClass('has-navbar-' + side);
                        });
                    }
                };
            }
        ]);
    });

})();
/**
 * @module mobile-angular-ui.components.scrollable
 * @description
 *
 * One thing you'll always have to deal with approaching mobile web app development is scroll and `position:fixed` bugs.
 *
 * Due to the lack of support in some devices fixed positioned elements may bounce or disappear during scroll. Also mobile interaction often leverages horizontal scroll eg. in carousels or sliders.
 *
 * We use `overflow:auto` to create scrollable areas and solve any problems related to scroll.
 *
 * Since `overflow:auto` is not always available in touch devices we use [Overthrow](http://filamentgroup.github.io/Overthrow/) to polyfill that.
 *
 * Markup for any scrollable areas is as simple as:
 *
 * ``` html
 * <div class="scrollable">
 *   <div class="scrollable-content">...</div>
 * </div>
 * ```
 *
 * This piece of code will trigger a directive that properly setup a new `Overthrow` instance for the `.scrollable` node.
 *
 * #### Headers and footers
 *
 * `.scrollable-header/.scrollable-footer` can be used to add fixed header/footer to a scrollable area without having to deal with css height and positioning to avoid breaking scroll.
 *
 * ``` html
 * <div class="scrollable">
 *   <div class="scrollable-header"><!-- ... --></div>
 *   <div class="scrollable-content"><!-- ... --></div>
 *   <div class="scrollable-footer"><!-- ... --></div>
 * </div>
 * ```
 *
 * #### scrollTo
 *
 * `.scrollable-content` controller exposes a `scrollTo` function: `scrollTo(offsetOrElement, margin)`
 *
 * You have to require it in your directives to use it or obtain through `element().controller`:
 *
 * ``` js
 * var elem = element(document.getElementById('myScrollableContent'));
 * var scrollableContentController = elem.controller('scrollableContent');
 *
 * // - Scroll to top of containedElement
 * scrollableContentController.scrollTo(containedElement);
 *
 * // - Scroll to top of containedElement with a margin of 10px;
 * scrollableContentController.scrollTo(containedElement, 10);
 *
 * // - Scroll top by 200px;
 * scrollableContentController.scrollTo(200);
 * ```
 *
 * #### `ui-scroll-bottom/ui-scroll-top`
 *
 * You can use `ui-scroll-bottom/ui-scroll-top` directives handle that events and implement features like _infinite scroll_.
 *
 * ``` html
 * <div class="scrollable">
 *   <div class="scrollable-content section" ui-scroll-bottom="loadMore()">
 *     <ul>
 *       <li ng-repeat="item in items">
 *         {{item.name}}
 *       </li>
 *     </ul>
 *   </div>
 * </div>
 * ```
 */
(function () {
    'use strict';
    var module = angular.module('mobile-angular-ui.components.scrollable',
        ['mobile-angular-ui.core.touchmoveDefaults']);


    var getTouchY = function (event) {
        var touches = event.touches && event.touches.length ? event.touches : [event];
        var e = (event.changedTouches && event.changedTouches[0]) ||
            (event.originalEvent && event.originalEvent.changedTouches &&
            event.originalEvent.changedTouches[0]) ||
            touches[0].originalEvent || touches[0];

        return e.clientY;
    };

    module.directive('scrollableContent', function () {
        return {
            restrict: 'C',
            controller: ['$element', 'allowTouchmoveDefault', function ($element, allowTouchmoveDefault) {
                var scrollableContent = $element[0],
                    scrollable = $element.parent()[0];

                // Handle nobounce behaviour
                if ('ontouchmove' in document) {
                    var allowUp, allowDown, prevTop, prevBot, lastY;
                    var setupTouchstart = function (event) {
                        allowUp = (scrollableContent.scrollTop > 0);

                        allowDown = (scrollableContent.scrollTop < scrollableContent.scrollHeight - scrollableContent.clientHeight);
                        prevTop = null;
                        prevBot = null;
                        lastY = getTouchY(event);
                    };

                    $element.on('touchstart', setupTouchstart);
                    $element.on('$destroy', function () {
                        $element.off('touchstart');
                    });

                    allowTouchmoveDefault($element, function (event) {
                        var currY = getTouchY(event);
                        var up = (currY > lastY), down = !up;
                        lastY = currY;
                        return (up && allowUp) || (down && allowDown);
                    });
                }

                this.scrollableContent = scrollableContent;

                this.scrollTo = function (elementOrNumber, marginTop) {
                    marginTop = marginTop || 0;

                    if (angular.isNumber(elementOrNumber)) {
                        scrollableContent.scrollTop = elementOrNumber - marginTop;
                    } else {
                        var target = angular.element(elementOrNumber)[0];
                        if ((!target.offsetParent) || target.offsetParent === scrollable) {
                            scrollableContent.scrollTop = target.offsetTop - marginTop;
                        } else {
                            // recursively subtract offsetTop from marginTop until it reaches scrollable element.
                            this.scrollTo(target.offsetParent, marginTop - target.offsetTop);
                        }
                    }
                };
            }],
            link: function (scope, element) {
                if (overthrow.support !== 'native') {
                    element.addClass('overthrow');
                    overthrow.forget();
                    overthrow.set();
                }
            }
        };
    });

    angular.forEach(['input', 'textarea'], function (directiveName) {
        module.directive(directiveName, ['$rootScope', '$timeout', function ($rootScope, $timeout) {
            return {
                require: '?^^scrollableContent',
                link: function (scope, elem, attrs, scrollable) {
                    // Workaround to avoid soft keyboard hiding inputs
                    elem.on('focus', function () {
                        if (scrollable && scrollable.scrollableContent) {
                            var h1 = scrollable.scrollableContent.offsetHeight;
                            $timeout(function () {
                                var h2 = scrollable.scrollableContent.offsetHeight;
                                //
                                // if scrollableContent height is reduced in half second
                                // since an input got focus we assume soft keyboard is showing.
                                //
                                if (h1 > h2) {
                                    scrollable.scrollTo(elem, 10);
                                }
                            }, 500);
                        }
                    });
                }
            };
        }]);
    });

    /**
     * @directive uiScrollTop
     * @restrict A
     *
     * @param {expression} uiScrollTop The expression to be evaluated when scroll
     * reaches top of element.
     */

    /**
     * @directive uiScrollBottom
     * @restrict A
     *
     * @param {expression} uiScrollBottom The expression to be evaluated when scroll
     * reaches bottom of element.
     */
    angular.forEach(
        {
            uiScrollTop: function (elem) {
                return elem.scrollTop === 0;
            },
            uiScrollBottom: function (elem) {
                return elem.scrollHeight === elem.scrollTop + elem.clientHeight;
            }
        },
        function (reached, directiveName) {
            module.directive(directiveName, [function () {
                return {
                    restrict: 'A',
                    link: function (scope, elem, attrs) {
                        elem.on('scroll', function () {
                            /* If reached bottom */
                            if (reached(elem[0])) {
                                /* Do what is specified by onScrollBottom */
                                scope.$apply(function () {
                                    scope.$eval(attrs[directiveName]);
                                });
                            }
                        });
                    }
                };
            }]);
        });

    /**
     * @directive uiScrollableHeader
     * @restrict C
     */

    /**
     * @directive uiScrollableFooter
     * @restrict C
     */
    angular.forEach({Top: 'scrollableHeader', Bottom: 'scrollableFooter'},
        function (directiveName, side) {
            module.directive(directiveName, [
                '$window',
                function ($window) {
                    return {
                        restrict: 'C',
                        link: function (scope, element) {
                            var el = element[0],
                                parentStyle = element.parent()[0].style;

                            var adjustParentPadding = function () {
                                var styles = $window.getComputedStyle(el),
                                    margin = parseInt(styles.marginTop, 10) + parseInt(styles.marginBottom, 10);
                                parentStyle['padding' + side] = el.offsetHeight + margin + 'px';
                            };

                            var interval = setInterval(adjustParentPadding, 30);

                            element.on('$destroy', function () {
                                parentStyle['padding' + side] = null;
                                clearInterval(interval);
                                interval = adjustParentPadding = element = null;
                            });
                        }
                    };
                }
            ]);
        });
}());
/**
 @module mobile-angular-ui.components.sidebars

 @description

 Sidebars can be placed either in left side or right side adding respectively `.sidebar-left` and `.sidebar-right` classes.

 ``` html
 <div class="sidebar sidebar-left">
 <div class="scrollable">
 <h1 class="scrollable-header app-name">My App</h1>
 <div class="scrollable-content">
 <div class="list-group" ui-turn-off='uiSidebarLeft'>
 <a class="list-group-item" href="#/link1">Link 1
 <i class="fa fa-chevron-right pull-right"></i></a>
 <a class="list-group-item" href="#/link2">Link 2
 <i class="fa fa-chevron-right pull-right"></i></a>
 </div>
 </div>
 </div>
 </div>

 <div class="sidebar sidebar-rigth">
 <!-- -->
 </div>
 ```

 #### Interacting with sidebars

 Under the hood sidebar uses `SharedState` exposing respective statuses: `uiSidebarLeft` and `uiSidebarRight` unless you define different state name through `id` attribute on sidebar elements.

 ``` html
 <a href ui-toggle='uiSidebarLeft'>Toggle sidebar left</a>

 <a href ui-toggle='uiSidebarRight'>Toggle sidebar right</a>
 ```

 You can put `ui-turn-off='uiSidebarLeft'` or `ui-turn-off='uiSidebarLeft'` inside the sidebar to make it close after clicking links inside them.

 By default sidebar are closed by clicking/tapping outside them.

 */
(function () {
    'use strict';

    var module = angular.module(
        'mobile-angular-ui.components.sidebars', [
            'mobile-angular-ui.core.sharedState',
            'mobile-angular-ui.core.outerClick'
        ]
    );

    angular.forEach(['left', 'right'], function (side) {
        var directiveName = 'sidebar' + side.charAt(0).toUpperCase() + side.slice(1);
        var stateName = 'ui' + directiveName.charAt(0).toUpperCase() + directiveName.slice(1);

        module.directive(directiveName, [
            '$rootElement',
            'SharedState',
            'bindOuterClick',
            '$location',
            function ($rootElement,
                      SharedState,
                      bindOuterClick,
                      $location) {
                return {
                    restrict: 'C',
                    link: function (scope, elem, attrs) {
                        var parentClass = 'has-sidebar-' + side;
                        var visibleClass = 'sidebar-' + side + '-visible';
                        var activeClass = 'sidebar-' + side + '-in';

                        if (attrs.id) {
                            stateName = attrs.id;
                        }

                        var outerClickCb = function () {
                            SharedState.turnOff(stateName);
                        };

                        var outerClickIf = function () {
                            return SharedState.isActive(stateName);
                        };

                        $rootElement.addClass(parentClass);
                        scope.$on('$destroy', function () {
                            $rootElement
                                .removeClass(parentClass);
                            $rootElement
                                .removeClass(visibleClass);
                            $rootElement
                                .removeClass(activeClass);
                        });

                        var defaultActive = attrs.active !== undefined && attrs.active !== 'false';
                        SharedState.initialize(scope, stateName, {defaultValue: defaultActive});

                        scope.$on('mobile-angular-ui.state.changed.' + stateName, function (e, active) {
                            if (attrs.uiTrackAsSearchParam === '' || attrs.uiTrackAsSearchParam) {
                                $location.search(stateName, active || null);
                            }

                            if (active) {
                                $rootElement
                                    .addClass(visibleClass);
                                $rootElement
                                    .addClass(activeClass);
                            } else {
                                $rootElement
                                    .removeClass(activeClass);
                                // Note: .removeClass(visibleClass) is called on 'mobile-angular-ui.app.transitionend'
                            }
                        });

                        scope.$on('$routeChangeSuccess', function () {
                            SharedState.turnOff(stateName);
                        });

                        scope.$on('$routeUpdate', function () {
                            if (attrs.uiTrackAsSearchParam) {
                                if (($location.search())[stateName]) {
                                    SharedState.turnOn(stateName);
                                } else {
                                    SharedState.turnOff(stateName);
                                }
                            }
                        });

                        scope.$on('mobile-angular-ui.app.transitionend', function () {
                            if (!SharedState.isActive(stateName)) {
                                $rootElement.removeClass(visibleClass);
                            }
                        });

                        if (attrs.closeOnOuterClicks !== 'false') {
                            bindOuterClick(scope, elem, outerClickCb, outerClickIf);
                        }
                    }
                };
            }
        ]);
    });

    module.directive('app', ['$rootScope', function ($rootScope) {
        return {
            restrict: 'C',
            link: function (scope, element) {

                element.on('transitionend webkitTransitionEnd oTransitionEnd otransitionend', function () {
                    $rootScope.$broadcast('mobile-angular-ui.app.transitionend');
                });

            }
        };
    }]);
}());
/**
 * A module with just a directive to create a switch input component.
 *
 * @module mobile-angular-ui.components.switch
 */
(function () {
    'use strict';
    angular.module('mobile-angular-ui.components.switch', [])

        /**
         * @directive uiSwitch
         * @restrict EA
         * @requires ngModel
         * @description
         *
         * The `ui-switch` directive (not to be confused with `ng-switch`) lets
         * you create a toggle switch control bound to a boolean `ngModel` value.
         *
         * <figure class="full-width-figure">
         *   <img src="/assets/img/figs/switch.png" alt=""/>
         * </figure>
         *
         * It requires `ngModel`. It supports `ngChange` and `ngDisabled`.
         *
         * ``` html
         * <ui-switch  ng-model="invoice.paid"></ui-switch>
         * ```
         *
         * ``` html
         * <ui-switch  ng-model="invoice.paid" disabled></ui-switch>
         * ```
         *
         * ``` html
         * <ui-switch  ng-model="invoice.paid" ng-disabled='{{...}}'></ui-switch>
         * ```
         *
         * Note that if `$drag` service from `mobile-angular-ui.gestures` is available
         * `ui-switch` will support drag too.
         *
         * @param {expression} ngModel The model bound to this component.
         * @param {boolean} [disabled] Whether this component should be disabled.
         * @param {expression} [ngChange] An expression to be evaluated when model changes.
         */
        .directive('uiSwitch', ['$injector', function ($injector) {
            var $drag = $injector.has('$drag') && $injector.get('$drag');

            return {
                restrict: 'EA',
                scope: {
                    model: '=ngModel',
                    changeExpr: '@ngChange'
                },
                link: function (scope, elem, attrs) {
                    elem.addClass('switch');

                    var disabled = attrs.disabled || elem.attr('disabled');

                    var unwatchDisabled = scope.$watch(
                        function () {
                            return attrs.disabled || elem.attr('disabled');
                        },
                        function (value) {
                            if (!value || value === 'false' || value === '0') {
                                disabled = false;
                            } else {
                                disabled = true;
                            }
                        }
                    );

                    var handle = angular.element('<div class="switch-handle"></div>');
                    elem.append(handle);

                    if (scope.model) {
                        elem.addClass('active');
                    }
                    elem.addClass('switch-transition-enabled');

                    var unwatch = scope.$watch('model', function (value) {
                        if (value) {
                            elem.addClass('active');
                        } else {
                            elem.removeClass('active');
                        }
                    });

                    var isEnabled = function () {
                        return !disabled;
                    };

                    var setModel = function (value) {
                        if (isEnabled() && value !== scope.model) {
                            scope.model = value;
                            scope.$apply();
                            if (scope.changeExpr !== null && scope.changeExpr !== undefined) {
                                scope.$parent.$eval(scope.changeExpr);
                            }
                        }
                    };

                    var clickCb = function () {
                        setModel(!scope.model);
                    };

                    elem.on('click tap', clickCb);

                    var unbind = angular.noop;

                    if ($drag) {
                        unbind = $drag.bind(handle, {
                            transform: $drag.TRANSLATE_INSIDE(elem),
                            start: function () {
                                elem.off('click tap', clickCb);
                            },
                            cancel: function () {
                                handle.removeAttr('style');
                                elem.off('click tap', clickCb);
                                elem.on('click tap', clickCb);
                            },
                            end: function () {
                                var rh = handle[0].getBoundingClientRect();
                                var re = elem[0].getBoundingClientRect();
                                if (rh.left - re.left < rh.width / 3) {
                                    setModel(false);
                                    handle.removeAttr('style');
                                } else if (re.right - rh.right < rh.width / 3) {
                                    setModel(true);
                                    handle.removeAttr('style');
                                } else {
                                    handle.removeAttr('style');
                                }
                                elem.on('click tap', clickCb);
                            }
                        });
                    }

                    elem.on('$destroy', function () {
                        unbind();
                        unwatchDisabled();
                        unwatch();
                        isEnabled = setModel = unbind = unwatch = unwatchDisabled = clickCb = null;
                    });
                }
            };
        }]);
}());
/**
 @module mobile-angular-ui.components

 @description

 It has directives and services providing mobile friendly
 components like navbars and sidebars.
 It requires `mobile-angular-ui.base.css`
 in order to work properly.

 ## Standalone Usage

 Although `.components` module is required by `mobile-angular-ui` by default
 you can use it alone. Some submodules requires `mobile-angular-ui.core` to work,
 so be sure its sources are available.

 ``` js
 angular.module('myApp', ['mobile-angular-ui.components']);
 ```

 */
(function () {
    'use strict';

    angular.module('mobile-angular-ui.components', [
        'mobile-angular-ui.components.modals',
        'mobile-angular-ui.components.navbars',
        'mobile-angular-ui.components.sidebars',
        'mobile-angular-ui.components.scrollable',
        'mobile-angular-ui.components.switch'
    ]);
}());
/**
 @module mobile-angular-ui
 @position 0
 @description

 This is the main angular module of `mobile-angular-ui` framework.

 By requiring this module you will have all `mobile-angular-ui.core`
 and `mobile-angular-ui.components` features required as well.

 ## Usage

 Declare it as a dependency for your application:

 ``` js
 angular.module('myApp', ['mobile-angular-ui']);
 ```

 */
(function () {
    'use strict';

    angular.module('mobile-angular-ui', [
        'mobile-angular-ui.core',
        'mobile-angular-ui.components'
    ]);

}());
/**
 1.启动angular

 2.声明总module，注入子module

 ---- [pasvaz.bindonce', 'ui.router','uiBlock.dipan.uiGroup.module'];

 ---- [单次绑定model,ui路由module,自定义ui碎片组模型]

 3.config 总模型 ：修改post传值为标准格式

 4.config 总模型 ： 使angular兼容ie7

 5.config 总模型 ：配置路由信息*
 * */
(function (window, document) {
    'use strict';

    document.addEventListener('plusready', function () {
        window.config = config();
    });

    /**
     * 声明module
     *
     * 此处是hackpost 到 node 转 对象格式问题, 如果是 请求node ,post的 需要传入 queryType = true; todo 默认不hackpost格式
     * 16/2/1 */
        //angular.module('dipan', ['pasvaz.bindonce', 'ui.router', 'block'], hackPost).config(uiRouter);
    angular.module('dipan', ['pasvaz.bindonce', 'ui.router', 'block']).config(uiRouter);

    /**
     * config 定义 全局变量 ,并且保留到window全局变量
     * window.config
     * 16/3/8 */
    angular.module('dipan').factory('config', function () {
        return config();
    });

    /**
     * 手动注入
     * 16/2/1 */
    hackPost.$inject = ['$httpProvider'];
    uiRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

    /** 路由配置  */
    function uiRouter($stateProvider, $urlRouterProvider) {
        //首页 跳转
        $urlRouterProvider.when('', "/home");

        $stateProvider
        //首页 供
            .state('home', {
                url: '/home',
                templateUrl: window.tplPath + 'route/home.html'
            })

            //需
            .state('need', {
                url: '/need',
                templateUrl: window.tplPath + 'route/home.html'
            })

            //标记
            .state('star', {
                url: '/star',
                templateUrl: window.tplPath + 'route/home.html'
            })

            //block 地区选择页面
            .state('area', {
                url: '/area',
                templateUrl: window.tplPath + 'route/block/area.html'
            })

            //search 页面
            .state('search', {
                url: '/search',
                templateUrl: window.tplPath + 'route/block/search.html'
            })

            //memberIndex 我的 member
            .state('memberIndex', {
                url: '/memberIndex',
                templateUrl: window.tplPath + 'route/member/memberIndex.html'
            })

            //member 资料编辑
            .state('member/memberInfo', {
                url: 'member/memberInfo',
                templateUrl: window.tplPath + 'route/member/memberInfo.html'
            })

            //member 退出登录
            .state('member/loginOut', {
                url: 'member/loginOut',
                templateUrl: window.tplPath + 'route/member/loginOut.html'
            })

            //member 测试snsArt 添加
            .state('member_addArticle', {
                url: '/member_addArticle',
                templateUrl: window.tplPath + 'route/member/addArticle.html'
            })

            //member 登录
            .state('login', {
                url: '/login',
                templateUrl: window.tplPath + 'route/login.html'
            })
        ;
    }

    /**
     * 修改post传值为标准格式
     * */
    function hackPost($httpProvider) {

        /**
         * 如果传入的 queryType 包含 node,就最后 还原 $httpProvider post 格式,否则 被认为是 php请求,格式化 为 php的数组post格式
         * 16/3/14 */
        var _oldHttpProvider = $httpProvider;
        var httpProvider = $httpProvider;

        // Use x-www-form-urlencoded Content-Type
        httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        /**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
        var param = function (obj) {
            var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

            for (name in obj) {
                value = obj[name];
                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value !== undefined && value !== null) {
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                }
            }

            //return query.length ? query.substr(0, query.length - 1) : query;
        };

        // Override $http service's default transformRequest todo 返回的 空对象
        httpProvider.defaults.transformRequest = [function (data) {
            if (data && data.queryNode) {
                return data;
            } else {
                return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
            }
        }];
    }

    /**
     * 定义系统常量config
     * 16/3/8 */

    function config() {
        return {

            //版本号默认设置
            version: {
                default: '1.0',//当前默认版本号,第一次安装,写入local用
            },

            //host 配置
            host: {
                nodeHost: 'http://192.168.1.117:3082',//nodejsApi hostUrl
                phpHost: 'http://dipan.so:8080',//php host
                //appPath: 'http://dipan.so:8080/Public/App/'//app 静态路径
                appPath: 'http://127.0.0.1:8080/Public/App/'//app 静态路径
            },

            //localStroe 存储标示 name
            localSaveName: {
                downLoad: {
                    //下载相关
                    appJsPath: 'appJsPath',//app.js 更新后的下载存储路径
                    appCssPath: 'appCssPath',//app.css 更新后的下载存储路径
                    isFirstJs: 'isFirstJs',//是否第一次下载Js, 默认是 空,第一次 以后就写入localstroe 1 ,第2次以后,就 为 2
                    isFirstCss: 'isFirstCss',//是否第一次下载css, 默认是 空,第一次 以后就写入localstroe 1 ,第2次以后,就 为 2
                },
                system: {
                    //系统配置相关
                    trueUpdata: 'trueUpdata',//(0:自动升级，1.提示升级，2.永不升级)
                },
                user: {
                    //用户数据
                    roundCodeId: 'roundCodeId',//随机id,启动后生成
                    isLogin: 'isLogin',//判断登录
                },
                version: {
                    //版本
                    key: 'version',//localStroe key
                },
            },

            //系统配置
            system: {
                timeoutUpData: 10000,//启动app之后 检查升级的 超时时间 单位:毫秒
            }
        };
    }


})(window, document);

/**
 * block 模块, 注入主模块 dipan ,碎片模块
 * */
(function () {
    'use strict';

    /**
     * 声明module
     * 16/2/1 */
    angular.module('block', []);

})();

(function () {
    'use strict';

    /**
     * body 控制器
     * 16/2/1 */
    angular.module('dipan').controller('body', body);

    /**
     * 手动注入
     * 16/2/1 */
    body.$inject = ['$scope', '$rootScope', '$timeout', 'localData', 'tap', '$state', 'tools', 'getList'];

    /**
     * controllerFun
     * 16/2/1 */
    function body($scope, $rootScope, $timeout, localData, tap, $state, tools, getList) {
        $scope.$on('changeBody', function () {
            $rootScope.$broadcast('openLoading');//载入时候 默认打开loading
            var _url = '/' + $state.current.name;
            $timeout(function () {
                $scope.title = localData.getTitle(_url);//getTitle
                $scope.showTab = localData.showTab(_url);//是否显示 tab
                $scope.tabList = localData.tab(_url);//tablist body 控制器
                $scope.url = _url;//url变量,判断 top 模板 显示图标用

                /**
                 * 变换list 到 滚动记录的位置,判断 不同状态来 确定 是否 请求新的list数据
                 */
                mui.plusReady(function () {
                    function _init() {
                        changeScroll();
                        trueGetNew();
                    }

                    _init();

                    //变换到记录的 滚动位置
                    function changeScroll() {
                        var scrollTopNum = $state.current.name + '_scrollTop';
                        var num = parseInt(localStorage.getItem(scrollTopNum));
                        try {
                            document.body.scrollTop = num;
                        } catch (e) {
                            try {
                                window.pageYOffset = num;
                            } catch (e) {
                                document.documentElement.scrollTop = num;
                            }
                        }
                    }

                    /**
                     * 判断scroll 位置,是需要 请求 url
                     * @param name
                     * @param postUrl
                     */
                    function trueGetNew() {

                        //监听滚动 事件
                        window.onscroll = function () {
                            _trueGetNew();
                        };

                        function _trueGetNew() {

                            //判断当前url 是否需要 newList
                            if (!trueNeedNewList()) {
                                return false;
                            }

                            //var scrollTopName = $state.current.name + '_scrollTop';
                            //if ((localStorage.getItem(scrollTopName) === '0') && localStorage.getItem($state.current.name)) {
                            //    //如果记录的 缓存有位置信息,并且 位置 是0, && 有缓存数据信息就去请求最新数据
                            //}

                            var num = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                            if (num === 0) {//当滚动到0的时候
                                tools.alert({
                                    title: '请求最新数据'
                                });
                            }
                        }
                    }

                    /**
                     * 判断是否需要获取newlist
                     * @returns {布尔} 需要就 是true
                     */
                    function trueNeedNewList() {
                        switch ($state.current.name) {
                            case 'home':
                                return true;
                        }
                    }
                });

                tap.init();//判断手机网页 手机 绑定 tap 事件, 网页绑定 click事件,(点击跳转url)
            }, 0);
        });

    }

})();

/**
 * angularEnd.dipan.angularEnd.directive.js
 * 命名注释：directive简称_angularEnd. 父模块_dipan . 功能_angualr 载入完成后显示modele值. 类型_directive .js
 * 使用 ：class='angular'
 * Created by rockblus on 16-2-5.
 */
(function () {
    'use strict';
    angular.module('dipan').directive('angularEnd', angularEnd);
    /**
     * angular 载入完成后。显示modle值
     * 15-12-26 */
    function angularEnd() {
        return {
            restrict: 'C',
            replace: false,
            link: function (scope, element, attrs) {
                scope.$watch('$viewContentLoaded', function () {
                    element[0].style.display = 'block';
                });
            }
        };
    }
})();

/**
 * 命名注释：directive简称_alert. 父模块_block. 功能_alert 公共ui 类型_directive .js
 * 使用 ：<div alert></div>
 */
(function() {
    'use strict';
    angular.module('block').directive('alert', top);

    function top() {
        return {
            restrict: 'A',
            replace: true,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/block/alert.block.alertUi.html',
            link: function(scope, element, attrs) {}
        };
    }


    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'localData'];

    function thisController($scope, $rootScope, $timeout, localData) {
        $scope.alertUiClass = 'showThis';
        $scope.showAlertUi = false;
        $scope.title = '错误';
        $scope.content = '请重试';
        $scope.$on('alert', show); //监听alet事件 显示

        /*************************
         * 显示alert 并 2秒后 消失
         * 16/8/19 上午9:45 ByRockBlus
         *************************/
        function show(e, obj) {
            $scope.showAlertUi = true;
            $scope.title = obj.title;
            $scope.content = obj.content;
            $timeout(function() {
                $scope.alertUiClass = 'hideThis';
                $timeout(function() {
                    $scope.showAlertUi = false;
                    $scope.alertUiClass = 'showThis';
                }, 800);
            }, 1000);
        }

    }

})();
/**
 * 命名注释：directive简称_area. 父模块_dipan. 功能_选择地区页面 类型_directive .js
 * 使用 ：<div area></div>
 */
(function () {
    'use strict';
    angular.module('block').directive('area', area);

    function area() {
        return {
            restrict: 'A',
            replace: true,
            //scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/block/area.dipan.areaSelect.directive.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'tools'];

    function thisController($scope, $rootScope, $timeout, tools) {
        $scope.$watch('$viewContentLoading', function () {
            $rootScope.$broadcast('changeBody');
        });

    }
})();
/**
 * 命名注释：directive简称_loading. 父模块_block. 功能_顶部导航 类型_directive .js
 * 使用 ：<div loading></div>
 */
(function () {
    'use strict';
    angular.module('block').directive('loading', loading);

    function loading() {
        return {
            restrict: 'A',
            replace: true,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/block/loading.dipan.loanding.directive.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout'];

    function thisController($scope, $rootScope, $timeout) {
        $scope.loading = true;//默认打开loading

        /*************************
         * 监听closeLoading事件,关闭loading动画
         * 16/8/15 下午2:42 ByRockBlus
         *************************/
        $scope.$on('closeLoading', function () {
            $timeout(function () {
                $scope.loading = false;
            }, 0);
        });

        /*************************
         * 监听openLoading事件,打开loading动画
         * 16/8/15 下午2:42 ByRockBlus
         *************************/
        $scope.$on('openLoading', function () {
            $timeout(function () {
                $scope.loading = true;
            }, 0);
        });
    }

})();

/**
 * 命名注释：directive简称_search. 父模块_dipan. 功能_搜索 类型_directive .js
 * 使用 ：<div area></div>
 */
(function () {
    'use strict';
    angular.module('block').directive('search', search);

    function search() {
        return {
            restrict: 'A',
            replace: true,
            //scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/block/search.dipan.search.directive.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'tools'];

    function thisController($scope, $rootScope, $timeout, tools) {
        $scope.$watch('$viewContentLoading', function () {
            $rootScope.$broadcast('changeBody');
        });

    }
})();
/**
 * 命名注释：directive简称_tab. 父模块_block. 功能_顶部tan导航 类型_directive .js
 * 使用 ：<div tab></div>
 */
(function () {
    'use strict';
    angular.module('block').directive('tab', tab);

    function tab() {
        return {
            restrict: 'A',
            replace: true,
            //scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/block/tab.block.tabNav.directive.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'localData'];

    function thisController($scope, $rootScope, $timeout, localData) {
    }

})();

/**
 * 命名注释：directive简称_top. 父模块_block. 功能_顶部导航 类型_directive .js
 * 使用 ：<div my></div>
 */
(function () {
    'use strict';
    angular.module('block').directive('top', top);

    function top() {
        return {
            restrict: 'A',
            replace: true,
            //scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/block/top.block.topNav.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'localData'];

    function thisController($scope, $rootScope, $timeout, localData) {
    }


})();

/**
 * 命名注释：directive简称_home. 父模块_dipan. 功能_首页模块 类型_directive .js
 * 使用 ：<div home></div>
 */
(function () {
    'use strict';
    angular.module('block').directive('home', home);

    function home() {
        return {
            restrict: 'A',
            replace: true,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/home.dipan.home.directive.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'tools', 'update', 'config', 'compile', '$state', 'getList'];

    function thisController($scope, $rootScope, $timeout, tools, update, config, compile, $state, getList) {

        $scope.$watch('$viewContentLoading', function () {
            $rootScope.$broadcast('changeBody');
        });

        $scope.urlName = $state.current.name;//当前url Name
        $scope.list = []; //默认首页 列表 数据,每次刷新请求后 push list变量名称
        var endId;//下拉后 得到 的 最后一条id
        var firstId;//第一条id,上拉时候用
        var type = 'up';//当前请求方式 up down
        var star = [];//标记数组 ,


        /*************************
         * 默认读取上次的缓存 数据, 然后 再异步更新 到 最新数据,
         * bind 点击事件
         * 16/8/19 上午7:45 ByRockBlus
         *************************/
        init();
        function init() {
            _init();//判断缓存,去执行响应逻辑(变换滚动位置,获取最新数据)
            plusInit();//bind plus 滚动到底部事件
            bindLoadMoreClick();//bind 加载 更多点击事件
        }


        /**
         * 判断缓存,去执行响应逻辑(变换滚动位置,获取最新数据)
         */
        function _init() {

            /**
             *
             * @return 当前url 的 缓存 list 数据
             * @private
             */
            function _getThisCatceList() {
                var thisLogName = 'catchList_' + $state.current.name + '-' + tools.getToday();
                return tools.getLocalStorageObj(thisLogName);
            }

            var thisCatchList = _getThisCatceList();
            if (thisCatchList && thisCatchList[0]) {//如果缓存的 数据存在,先读缓存数据 (只取当天浏览的数据,遍历不是今天浏览的 数据,并删除)

                /**
                 * 读缓存 作为list[0] push到 缓存数组 ,绑定点击事件,
                 */
                getList.giveFirstCatchList(_getThisCatceList(), function (reList) {

                    $timeout(function () {
                        $scope.list.push(reList);
                        console.log($scope.list);
                        _bind(reList, 'list[0]');//回调去绑定点击事件
                    }, 0);
                }, 'list[0]', $scope, true);

                //$timeout(function () {
                //    _bind($scope.list[0], 'list[0]');
                //}, 200);

                //var scrollTopName = $state.current.name + '_scrollTop';
                //if (localStorage.getItem(scrollTopName) === '0') {
                //    getList.getList($state.current.name, false, false, $scope, 'list[0]', _bind);
                //    ////如果记录的 缓存有位置信息,并且 位置 是0 ,去addNewList 请求 最新 数据, 放到缓存 之前
                //    tools.alert({
                //        title: '请求NewData'
                //    })
                //}

            } else {
                getList.getList($state.current.name, false, false, $scope, 'list[0]', _bind);
            }

        }

        /**
         * bind 加载 更多点击事件
         */
        function bindLoadMoreClick() {
            try {
                var bindBtn = document.getElementById('isWeb');

                bindBtn.addEventListener('tap', function () {
                    downGetList(true);//请求下拉更多数据,
                });

            } catch (e) {
                console.log('没找到isWebId');
            }
        }

        /**
         * plus App 绑定滚动到底部事件
         */
        function plusInit() {
            mui.plusReady(function () {
                //滚动到底事件
                document.addEventListener('plusscrollbottom', function () {
                    downGetList();
                }, false);
                //_bind();
            });
        }

        //bind 星标 点击事件
        function _bind(doc, listName) {

            if (type == 'down') {
                console.log('down', type);
            }

            if (!firstId) {//如果没有 firstId,就给 firstId
                try {
                    firstId = doc[0]._id;
                } catch (e) {
                    console.log('error');
                }
            }
            try {
                endId = _getLastId(doc);//给最后一条id
            } catch (e) {
                console.log('error');
            }


            _bindTapIcon();


            ///**
            // * 遍历list 取最后一条的 id
            // * @return {String} _id
            // */
            function _getLastId(re) {
                var endNum = re.length - 1;
                return re[endNum]._id;
            }

            //bind 星标 点击事件
            function _bindTapIcon() {
                console.log('listName', listName);
                angular.forEach(eval("$scope." + listName), function (vo) {
                    var idStr = '#' + vo._id;
                    $timeout(function () {
                        mui(idStr).on('tap', '.iconStar', function () {
                            if (vo.iconStar == 'fa-star-o') {
                                $timeout(function () {
                                    vo.iconStar = 'fa-star';
                                    _saveStarArr(vo._id);
                                }, 0);
                            } else if (vo.iconStar == 'fa-star') {
                                $timeout(function () {
                                    vo.iconStar = 'fa-star-o';
                                    _delStarArr(vo._id);
                                }, 0);
                            }
                            //reForList(liId, thisScope);
                        });
                    }, 400);

                    /**************************
                     * 从缓存 读取 star 数组
                     *
                     * star 缓存命名 state.name + '_star'
                     * @param callBack
                     *
                     * 16/9/14 下午9:21 ByRockBlus
                     **************************/
                    function _getStartFromCatch(callBack) {
                        var stateName = 'star';
                        star = tools.getLocalStorageObj(stateName);
                        if (!star) {
                            star = [];
                        }
                        $timeout(function () {
                            callBack();
                        }, 200);
                    }

                    /**************************
                     * 存储标记对象 到 缓存的 标记数组
                     * 16/9/14 下午7:37 ByRockBlus
                     **************************/
                    function _saveStarArr(_id) {
                        var idDom = document.getElementById(_id);
                        idDom = angular.element(idDom);
                        var listName = idDom.attr('listName');
                        var thisScope = eval('$scope.' + listName);
                        angular.forEach(thisScope, function (vo) {
                            if (vo._id == _id) {
                                _getStartFromCatch(function () {
                                    star.push(vo);
                                    //var stateName = $state.current.name + '_star';
                                    var stateName = 'star';
                                    tools.saveLocalStorageObj(stateName, star);
                                });
                            }
                        });

                    }

                    /**************************
                     * 删除存储标记对象 到 缓存的 标记数组
                     * 16/9/14 下午7:37 ByRockBlus
                     **************************/
                    function _delStarArr(_id) {
                        _getStartFromCatch(function () {
                            var tempStar = [];
                            angular.forEach(star, function (vo) {
                                if (vo._id !== _id) {
                                    tempStar.push(vo);
                                }
                            });

                            var stateName = 'star';
                            tools.saveLocalStorageObj(stateName, tempStar);
                        });
                    }
                });
            }


        }

        /**
         *底部下拉,去请求数据,
         * @param {布尔 判断是点击来的} isClickBtn
         */
        function downGetList() {
            if ($state.current.name == 'star') {//如果 是标记分类 底部下拉事件 没有任何 操作
                return false;
            }
            type = 'down';
            getList.getList($state.current.name, false, endId, $scope, 'list[' + $scope.list.length + ']', _bind);
        }

        /**
         * 请求成功后重新给list 赋值
         * 记录list模型名称
         * @param re
         */
        function call(re) {
            $timeout(function () {
                console.log('re', re);
                //$scope.list[listCount] = re.list;
                //listCount++;
                //var name = $state.current.name;
                //var obj = $scope.list;
                //tools.saveLocalStorageObj(name, obj);//存储obj
                plusInit();//绑定点击事件
            }, 0);
        }

        function err() {
            tools.alert({
                title: '网络请求失败',
                content: '请检查网络'
            });
        }

        /**
         * 重新给 list
         * @param id
         */
        function reForList(id, thisScope) {
            angular.forEach(thisScope, function (vo) {
                if (vo._id == id) {
                    if (vo.iconStar == 'fa-star-o') {
                        $timeout(function () {
                            vo.iconStar = 'fa-star';
                        }, 0);
                    } else if (vo.iconStar == 'fa-star') {
                        $timeout(function () {
                            vo.iconStar = 'fa-star-o';
                        }, 0);
                    }

                    //var name = $state.current.name;
                    //tools.saveLocalStorageObj(name, $scope.list);//存储obj
                }
            });
        }

    }
})();
/**
 * 命名注释：directive简称_login. 父模块_dipan . 功能_login 类型_directive .js
 * 使用 ：<div my></div>
 */
(function () {
    'use strict';
    angular.module('dipan').directive('login', login);
    function login() {
        return {
            restrict: 'A',
            replace: false,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/login.dipan.login.directive.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'localData', 'tools', 'config'];

    function thisController($scope, $rootScope, $timeout, localData, tools, config) {
        $scope.$watch('$viewContentLoading', function () {
            $rootScope.$broadcast('changeBody');
        });

        /*************************
         * 判断数据赋值成功 关闭 loading
         * 16/8/15 下午2:57 ByRockBlus
         *************************/
        setTimeout(function () {
            $rootScope.$broadcast('closeLoading');
        }, 0);


        $scope.formSub = _formSub;//表单提交事件
        $scope.getCode = _getCode;//获取验证码
        $scope.codeText = '获取验证码';
        $scope.tel = false;
        $scope.code = false;
        $scope.codeClass = 'btn-danger';//获取验证码 变换背景颜色

        //function hideLeftTop() {
        //    var leftTop = document.getElementById('topLeftBut');
        //    leftTop = angular.element(leftTop);
        //    leftTop[0].style.display = 'none';
        //}
        //
        //hideLeftTop();


        /*************************
         * 获取验证码
         * 16/8/30 下午4:00 ByRockBlus
         *************************/
        var isGetNow;
        var count = 59;
        var setInt;

        function timeGo() {
            count--;
            $timeout(function () {
                $scope.codeText = count + '秒后重发';
            }, 0);
            if (count === 0) {
                clearInterval(setInt);
                isGetNow = false;
                count = 59;
                $timeout(function () {
                    $scope.codeClass = 'btn-danger';//获取验证码 变换背景颜色
                    $scope.codeText = '获取验证码';

                }, 0);
            }
        }

        function _getCode() {
            if (!$scope.tel) {
                tools.alert({
                    title: '手机必填'
                });
                return false;
            }
            else if (!tools.checkMobile($scope.tel)) {
                tools.alert({
                    title: '手机号格式不正确'
                });
                return false;
            }

            if (isGetNow) {
                return;
            } else {
                var roundCodeId = localStorage.getItem(config.localSaveName.user.roundCodeId);

                //'Api/Sem/getCode/roundCodeId/' + roundCodeId + '/mtNum/' + telNum;
                tools.postJsp(config.host.phpHost + '/Api/Sem/getCode/roundCodeId/' + roundCodeId + '/mtNum/' + $scope.tel, {}, true).then(function (re) {
                    tools.alert({
                        title: re
                    });
                    console.log('re', re);
                });
                $timeout(function () {
                    $scope.codeText = 60 + '秒后重发';
                }, 0);
                $scope.codeClass = 'btn-warning';//获取验证码 变换背景颜色
                isGetNow = true;
                setInt = setInterval(timeGo, 1000);
            }

        }


        /*************************
         * 表单提交点击事件
         * 16/8/30 下午3:23 ByRockBlus
         *************************/
        function _formSub() {
            if (!$scope.tel || !$scope.code) {
                tools.alert({
                    title: '手机和验证码都必填'
                });
                return false;
            } else if (!tools.checkMobile($scope.tel)) {
                tools.alert({
                    title: '手机号格式不正确'
                });
            } else {
                tools.alert({
                    title: '提交验证'
                });
            }
        }
    }


})();

/**
 * 命名注释：directive简称_add. 父模块_dipan . 功能_add公共表单 类型_directive .js
 * 使用 ：<div add></div>
 */
(function () {
    'use strict';
    angular.module('dipan').directive('add', add);
    function add() {
        return {
            restrict: 'A',
            replace: false,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/member/add.dipan.addFrom.directive.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'tools'];

    function thisController($scope, $rootScope, $timeout, tools) {
        $scope.$watch('$viewContentLoading', function () {
            $rootScope.$broadcast('changeBody');
            setTimeout(function () {
                $rootScope.$broadcast('closeLoading');
            }, 0);
        });


        $scope.form = {};

        $scope.formSub = function () {
            $scope.form.title += '&|';
            //var url = 'http://dipan.so:3082/sns/addOneArticle';
            var url = 'http://192.168.1.115:3082/sns/addOneArticle';
            tools.postJsp(url, $scope.form).then(function () {
                tools.alert({
                    title: '添加成功'
                });
            }, function (err) {
                tools.alert({
                    title: '添加失败',
                    content: err
                });
            });
        };
    }
})();

/**
 * 命名注释：directive简称_my. 父模块_dipan . 功能_我的功能导航IndexList 类型_directive .js
 * 使用 ：<div my></div>
 */
(function () {
    'use strict';
    angular.module('dipan').directive('loginOut', loginOut);
    function loginOut() {
        return {
            restrict: 'A',
            replace: false,
            controller: thisController,
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = [];

    function thisController($scope, $rootScope, $timeout, localData) {
        document.addEventListener('plusready', function () {
            var ws = plus.webview.currentWebview();
            plus.webview.close(ws);
        });

    }


})();

/**
 * 命名注释：directive简称_my. 父模块_dipan . 功能_我的功能导航IndexList 类型_directive .js
 * 使用 ：<div my></div>
 */
(function () {
    'use strict';
    angular.module('dipan').directive('my', urlParse);
    function urlParse() {
        return {
            restrict: 'A',
            replace: false,
            scope: {},
            controller: thisController,
            templateUrl: window.tplPath + 'directive/member/my.dipan.myIndexNav.html',
            link: function (scope, element, attrs) {
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'localData', 'config'];

    function thisController($scope, $rootScope, $timeout, localData, config) {
        $scope.$watch('$viewContentLoading', function () {
            $rootScope.$broadcast('changeBody');
        });

        //我的 导航list > 本地数据
        $scope.listNav = localData.memberIndexNav;
        //版本
        $scope.version = config.version.default;

        /*************************
         * 判断数据赋值成功 关闭 loading
         * 16/8/15 下午2:57 ByRockBlus
         *************************/
        if ($scope.listNav) {
            $timeout(function () {
                $rootScope.$broadcast('closeLoading');
            }, 0);
        }
    }


})();

/**
 * urlParse.dipan.firstNginx.directive.js
 * 命名注释：directive简称_urlParse. 父模块_dipan . 功能_解析url服务 根据url 取对应地区 分类 关键词 初始数据,并通知改变全局变量 类型_directive .js
 * 使用 ：<div url-parse></div>
 */
(function () {
    'use strict';
    angular.module('dipan').directive('urlParse', urlParse);
    function urlParse() {
        return {
            restrict: 'A',
            replace: false,
            scope: {},
            controller: thisController,
            link: function (scope, element, attrs) {
                scope.data = JSON.parse(attrs.urlParse);
            }
        };
    }

    thisController.$inject = ['$scope', '$rootScope', '$timeout', 'urlParse', 'api'];

    function thisController($scope, $rootScope, $timeout, urlParse, api) {
        $timeout(function () {
            urlParse.data = $scope.data;
            $scope.data.queryNode = true;//是node Api
            api('saveSession', $scope.data, saveSessionCallBack);
            $rootScope.$broadcast('urlParseChange');//通知全局变量更新 urlParse.dipan.firstData.factory.js
            /**
             * 测试findSessionContent
             * 16/3/16 */
            api('findSessionContent', $scope.data.session, function (re) {
                //console.log('reContent', re);
            });
        }, 0);
    }


    function saveSessionCallBack(doc) {
        //console.log('docFront', doc);
    }

})();

/**
 * toHtml.dipan.toHtml.directive.js
 * 命名注释：filter简称_toHtml. 父模块_dipan . 功能_html代码解析成正常html代码输出 . 类型_filter .js
 * 使用：{{testStr | toHtml}}
 * Created by rockblus on 16-2-5.
 */
(function () {
    'use strict';

    /**
     * html filter
     * 15-12-31 */

    angular.module('dipan').filter('toHtml', toHtml);
    toHtml.$inject = ['$sce'];
    function toHtml($sce) {
        return function (text) {
            return $sce.trustAsHtml(text);
        };
    }

})();

/**
 * apiPost.dipan.block.factory.js
 * 命名注释：server简称_apiPost. 父模块 dipan . 功能_post api 接口，加入$q 方法，返回callback. 类型_factory.js
 */

(function () {
    'use strict';

    /** api接口,nodejs,php  */
    var apiUrl = {};

    angular.module('dipan').factory('api', api);
    api.$inject = ['$http', '$q', 'config'];

    function api($http, $q, config) {
        var postApi;

        function _post(url, postData) {
            var defer = $q.defer();
            $http.post(url, postData).success(function (doc) {
                defer.resolve(doc);
            }).error(function (err) {
                defer.reject(err);
            });
            return defer.promise;
        }

        return postApi;
    }

})();

/**
 * compile.uiBlock.compile.factory.js
 * 命名注释：server简称_compile. 父模块 uiBlock . 功能_动态绑定html元素到angular. 类型_factory.js
 * 传入 需要append的id，html内容 ，scope
 * Created by rockblus on 16-2-13.
 */

(function () {
    'use strict';
    angular.module('dipan').factory('compile', compile);

    compile.$inject = ['$compile'];

    function compile($compile) {
        /**
         * 动态绑定html元素到angular
         * @param {需要compile的 外层domid} parentDomId
         * @param {需要compile的domId}domId
         * @param {$scope}scope
         * @param {是否动态增加到外层domid里面,而不是清空 ,可选,此时domId 为 html字符串}scope
         * @private
         */
        function _compile(parentDomId, domId, scope, add) {
            try {
                var parentDom = document.getElementById(parentDomId);
                parentDom = angular.element(parentDom);//外层angualr element

                var reBindContent = document.getElementById(domId);
                reBindContent = angular.element(reBindContent);//需要动态绑定的 angular element

                var htmlStr = reBindContent[0];

                if (add) {//如果是 直接传来的 htmlSTr 而且 是追加的方式
                    htmlStr = domId;
                } else {
                    reBindContent.html('');
                }
                var el = $compile(htmlStr)(scope);
                parentDom.append(el);
            } catch (e) {
                console.error(e);
            }
        }

        return _compile;
    }
})();


/**
 * getList.dipan.listAndAddList.factory.js
 * 命名注释：server简称_getList. 父模块 dipan . 功能_获取不同板块的数据 , && 判断状态,来新加数据到最前面,或者 最后面 . 类型_factory.js
 */

(function () {
    'use strict';
    angular.module('dipan').factory('getList', getList);

    getList.$inject = ['tools', 'config', '$timeout', 'compile', '$state', '$rootScope', '$filter'];

    var thisObj = {};
    var _tools;
    var _config;
    var _timeout;
    var _compile;
    var _state;
    var _rootScope;
    var _filter;


    function getList(tools, config, $timeout, compile, $state, $rootScope, $filter) {
        /**
         * 全局缓存变量对象
         * @type {{home: Array, need: Array}}
         */
        thisObj.globalCatchList = {
            home: [],
            need: []
        };
        thisObj.pushToGoldCatcth = pushToGoldCatcth;//push 到全局变量数组 ,传入 newList
        thisObj.delGoldCatcth = delGoldCatcth;//del 全局变量数组
        thisObj.saveCatecNewList = saveCatecNewList;//存储全局变量数组 到本地localStroe 传入listObj

        /**
         * 遍历不同url,返回 list 数据 ,
         * @param {$state.current.name} name
         * @param {获取最新数据的本地缓存的 最新id} frontId
         * @param {获取最新数据的本地缓存的 最后id} endId
         */
        thisObj.getList = _getList;//swith name  , 去不同接口拿数据 ,&& 判断状态,来新加数据到最前面,或者 最后面,存储到 本地 最新20条缓存数据.(上啦 最新20条,下拉最后20条)
        thisObj.giveFirstCatchList = _addNewListToOldList;//第一次 绑定缓存的情况 供外部调用
        thisObj._init = function () {
            _tools = tools;
            _config = config;
            _timeout = $timeout;
            _compile = compile;
            _state = $state;
            _rootScope = $rootScope;
            _filter = $filter;
        };

        //start
        thisObj._init();
        return thisObj;
    }

    /**
     * 遍历不同url,返回 list 数据 ,
     * @param {$state.current.name} name
     * @param {获取最新数据的本地缓存的 最新id} frontId
     * @param {获取最新数据的本地缓存的 最后id} endId
     * @param {作用域变量} scope.list
     * @param {function 成功后的回调} callBack
     */

    var callSucessCount = 0;

    function _getList(name, frontId, endId, scope, listNam, callBack) {
        var url;
        var type = 1;//1上啦,2下拉
        switch (name) {
            case 'memberIndex':
                url = 'http://192.168.18.13:8080/homeListOne.json?' + _tools.getRoundCode(8);
                break;
            case 'home':
                url = 'http://192.168.0.56:3082/sns/getList?' + _tools.getRoundCode(8);
                break;
            case 'need':
                url = 'http://192.168.0.56:3082/sns/getList?' + _tools.getRoundCode(8);
                break;
            case 'star':
                url = true;
                break;
            case 'login':
                url = 'http://192.168.18.13:8080/homeListOne.json?' + _tools.getRoundCode(8);
                break;
            case 'area':
                url = 'http://192.168.18.13:8080/homeListOne.json?' + _tools.getRoundCode(8);
                break;
            case 'search':
                url = 'http://192.168.18.13:8080/homeListOne.json?' + _tools.getRoundCode(8);
                break;
            default:
                return false;
        }

        if (url) {
            var _frontId = 0;
            if (frontId) {
                _frontId = frontId;
            }

            var _endId = 0;
            if (endId) {
                _endId = endId;
                type = 2;
            }

            var postData = {
                'frontId': _frontId,
                'endId': _endId,
            };

            /**************************
             * @returns {Obj 缓存的list对象} catchObj
             * @returns {getNext 布尔} getNext true 进行下面的 http 请求
             * 16/9/16 上午11:27 ByRockBlus
             **************************/

            _getCatchList(function (catchObj, getNext) {
                if (getNext) {
                    //call(catchObj);
                    _tools.postJsp(url, postData).then(call, err);
                } else {
                    call(catchObj);
                }
            });

        }

        /**************************
         * 先去执行读取缓存逻辑,再回调,网络请求
         * 遍历url 执行不同逻辑,供,需,其他 都执行相同逻辑, 标记 直接 读取缓存数据,
         * 16/9/16 上午8:12 ByRockBlus
         **************************/
        function _getCatchList(__call) {
            switch (_state.current.name) {
                case 'star' :
                    _logicStar(__call);//星标的逻辑
                    break;
                default:
                    _logicHome(__call);//供`需`其他 的逻辑
                    break;
            }
        }

        /**************************
         * 星标的逻辑
         * 读取缓存的 星标 list对象返回,如果 为空  提示alert
         * 16/9/16 上午11:10 ByRockBlus
         **************************/
        function _logicStar(___call) {

            var starCatchList = _tools.getLocalStorageObj('star');
            if (!starCatchList || !starCatchList [0]) {
                _tools.alert({
                    title: '没有标记过的信息'
                });
                _rootScope.$broadcast('closeLoading');
                return;
            } else {
                var re = {
                    doc: starCatchList
                };
                _rootScope.$broadcast('closeLoading');
                ___call(re);
            }
        }

        /**************************
         * home  供`需`其他 的逻辑
         * 16/9/16 上午11:10 ByRockBlus
         **************************/
        function _logicHome(___call) {
            delDataReturnThisData();
            ___call('', true);
        }

        function call(re) {
            //合并新的list 和 缓存的数据,去存储到缓存, 回调 合并后的数据
            _addNewListToOldList(re.doc, function (reList) {
                if (!re.doc[0]) {
                    callSucessCount++;
                    setTimeout(function () {
                        if (callSucessCount > 1) {
                            _tools.alert({
                                title: '没有更多数据啦! ^_^'
                            });
                        }
                    }, 0);
                    return false;
                } else {
                    callSucessCount = 0;
                }
                _timeout(function () {
                    eval("scope." + listNam + "= reList");
                    callBack(reList, listNam);//回调去绑定点击事件
                }, 0);
            }, listNam, scope);
        }

        function err() {
            _tools.alert({
                title: '网络请求失败',
                content: '请检查网络'
            });
        }

        /**
         * save到数据库之前的 编辑 ,只缓存20条数据
         * @param {obj}obj
         * @param {NUmber 1上滑 2下滑}type
         * @returns {obj 过滤后的数据}
         */
        function saveLocalObjEdit(obj) {
            var re = [];
            var tempCount = 0;
            angular.forEach(obj, function (vo) {
                tempCount++;

                if (obj.length < 20) {
                    re.push(vo);
                } else {
                    if (type == 1) {// 上啦条件 小于20
                        if (tempCount < 20) {
                            re.push(vo);
                        }
                    }

                    if (type == 2) {//下拉条件 大于总数量 - 20
                        if (tempCount > (obj.length - 20)) {
                            re.push(vo);
                        }
                    }
                }

            });
            return re;
        }

        /**************************
         * 遍历catchname, 删除 过期的 缓存数据,
         * 16/9/17 下午1:45 ByRockBlus
         **************************/
        function delDataReturnThisData() {
            var allList = _tools.getAllCatchListName();//所有缓存的 key
            _init();
            function _init() {
                _delNoTodyCatchList();//删除不需要缓存的 list 数据
            }

            /**
             * 删除不是 今天的缓存list 数据
             * @private
             */
            function _delNoTodyCatchList() {
                angular.forEach(allList, function (vo) {
                    __delCatchListName(vo);
                });
                /**
                 * 判断是不是需要删除的listName,如果是就删除
                 * @parme {catchName}
                 * @private
                 */
                function __delCatchListName(catchName) {

                    var chaName = catchName.split('_');
                    if (chaName[0] == 'catchList') {//判断 是 list对象
                        var _chaName = catchName.split('-');
                        var thisToday = _tools.getToday();
                        if (_chaName[1] !== thisToday) {
                            localStorage.removeItem(catchName);
                        }
                    }
                }
            }
        }

    }

    /**
     * 复写call成功之后逻辑,
     *
     * 思路:每一次请求回来的数据,独立成为一个 list 模型,不去更新原有list,
     * 存储到缓存,覆盖原有的缓存
     *
     * @param newlist
     * @param _call
     * @param listNam
     * @param scope
     * @param  {布尔}isCatch 判断是缓存调用的
     *
     * */
    function _addNewListToOldList(newlist, _call, listNam, scope, isCatch) {
        var strVar = "";
        strVar += "        <li id=\"repListLi\"  class=\"mui-table-view-cell item\" url=\"content#{{vo.id}}\" bindonce bo-attr ng-repeat=\"\"";
        strVar += "            style=\"background-color: #fff;margin-top: 10px\">";
        strVar += "            <div class=\"clear\">";
        strVar += "                <div class=\"left listHeader\">";
        strVar += "                    <img bo-src=\"vo.listHeader\"/>";
        strVar += "                <\/div>";
        strVar += "                <div class=\"left listTitle\">";
        strVar += "                    <span bo-text=\"vo.title\"><\/span>";
        strVar += "                <\/div>";
        strVar += "            <\/div>";
        strVar += "            <div class=\"mui-navigate-right\" style=\"font-size:14px;color: #777;margin-top: 5px\" bindonce";
        strVar += "                 ng-repeat=\"(key,vo2) in vo.content\">";
        strVar += "                <span style=\"color:#bd0000\" bo-text=\"key + ':'\"><\/span>";
        strVar += "                <span bo-text=\"vo2\"><\/span>";
        strVar += "            <\/div>";
        strVar += "";
        strVar += "            <div class=\"panle\">";
        strVar += "                <div class=\"mui-btn fa fa-weixin fa-1x icon-btn\"><\/div>";
        strVar += "                <div class=\"mui-btn fa  fa-1x icon-btn-noBack iconStar\" ng-class=\"vo.iconStar\" bo-attr";
        strVar += "                     bo-attr-iconId=\"vo._id\"><\/div>";
        strVar += "            <\/div>";
        strVar += "        <\/li>";

        var repListHtml = angular.element(strVar);
        repListHtml.attr('ng-repeat', "vo in " + listNam);
        repListHtml.attr('listName', listNam);
        repListHtml.attr('bo-id', 'vo._id');
        _compile('list', repListHtml[0], scope, true);
        if (!isCatch) {//如果不是 缓存请求
            pushToGoldCatcth(newlist);//push 到全局变量数组
            //saveCatecNewList(newlist);//合并存储到缓存
        }
        _call(newlist);
    }

    /**************************
     *  只去存储 当天 浏览 的 数据 ,加入日期标记
     *  传入 list对象
     * 16/9/17 上午10:23 ByRockBlus
     **************************/
    function saveCatecNewList() {

        var newList;
        var thisUrl = _state.current.name;
        switch (thisUrl) {
            case 'home':
                newList = thisObj.globalCatchList.home;
                break;
            case 'need':
                newList = thisObj.globalCatchList.need;
                break;
        }

        if (!newList) {
            return false;
        }

        var oldArr = [];
        var thisLogName = 'catchList_' + _state.current.name + '-' + _tools.getToday();
        //var oldObj = _tools.getLocalStorageObj(thisLogName);
        //
        ////合并新老数据
        //if (oldObj) {
        //    angular.forEach(oldObj, function (vo) {
        //        oldArr.push(vo);
        //    });
        //}

        angular.forEach(newList, function (voNew) {
            try {
                delete(voNew.$$hashKey);
            } catch (e) {
                console.error('删除hashKey失败');
            }
            oldArr.push(voNew);
        });

        //存储 catch
        _tools.saveLocalStorageObj(thisLogName, oldArr);
        delGoldCatcth();//删除当前url的全局缓存数组
    }

    /**
     * push 到全局缓存变量数组
     */
    function pushToGoldCatcth(newList) {
        var thisUrl = _state.current.name;
        switch (thisUrl) {
            case 'home':
                thisObj.globalCatchList.home.push(newList);
                break;
            case 'need':
                thisObj.globalCatchList.need.push(newList);
                break;
        }
    }


    /**
     * 清空 全局缓存变量数组
     */
    function delGoldCatcth() {
        var thisUrl = _state.current.name;
        switch (thisUrl) {
            case 'home':
                thisObj.globalCatchList.home = [];
                break;
            case 'need':
                thisObj.globalCatchList.need = [];
                break;
        }
    }

})();
/**
 * localData.dipan.localDataNav.factory.js
 * 命名注释：server简称_localData. 父模块 dipan . 功能_本地 & app 默认数据. 类型_factory.js
 */

(function () {
    'use strict';
    angular.module('dipan').factory('localData', localData);

    localData.$inject = ['$location', 'tools', '$rootScope', 'config'];

    var location;
    var thisLocalData = {};
    var thisTools = {};
    var thisRootScope;
    var _config;

    function localData($location, tools, $rootScope, config) {
        console.log('thisTools', tools);
        thisRootScope = $rootScope;
        location = $location;
        thisLocalData.memberIndexNav = _memberIndexNav(); //我的 首页导航list
        thisLocalData.tab = _tab; //根据 url 遍历 给tab数据
        thisLocalData.showTab = _showTab; //遍历url 返回true false ,控制是否显示tab
        thisLocalData.getTitle = _getTitle; //getTitle
        thisLocalData.giveRoundCode = _giveRoundCode;// 给一个8位随机码,验证短信用
        thisLocalData.gps = {
            isHaveGps: false, //判断
        };
        thisLocalData._init = function () {
            thisTools = tools;
            _config = config;
            thisLocalData.giveRoundCode();
            getGps();
        };

        //start
        thisLocalData._init();
        return thisLocalData;
    }

    /**
     * getTitle 获取标题
     * @param {网址}url
     * @returns {*}
     * @private
     */
    function _getTitle(url) {
        switch (url) {
            case '/memberIndex':
                return '我的';
            case '/home':
                return '天津武清河西务唐庄村';
            case '/need':
                return '天津武清河西务唐庄村';
            case '/star':
                return '标记';
            case '/login':
                return '我的';
            case '/area':
                return '地区选择';
            case '/search':
                return '搜索';
            default:
                return '地盘 dipan.so';
        }
    }

    /**
     * 我的 首页 导航 list
     * @returns {*[]}
     * @private
     */
    function _memberIndexNav() {
        return [{
            'name': '资料编辑',
            'url': 'memberInfo',
            'id': 1,
            'hrefId': 'hrefMemberMemberInfo',
            'icon': 'fa fa-pencil-square-o fa-1x'
        },
            {
                'name': '退出登录',
                'url': 'loginOut',
                'id': 2,
                'hrefId': 'hrefMemberLoginOut',
                'icon': 'fa fa-sign-out fa-1x'
            },
            {
                'name': '测试snsArticle添加',
                'url': 'member_addArticle',
                'hrefId': 'hrefMemberAddArticle',
                'id': 3,
                'icon': 'fa fa-sign-out fa-1x'
            }
        ];
    }

    /**
     * 遍历url 返回true false ,控制是否显示tab
     * @param url
     * @returns {boolean}
     * @private
     */
    function _showTab(url) {
        switch (url) {
            case '/home':
                return true;
            case '/need':
                return true;
            case '/star':
                return true;
            case '/memberIndex':
                return true;
            case '/login':
                return true;
            default:
                return false;
        }
    }

    /**
     * 根据 url 遍历 给tab数据
     * @param url
     * @returns {Array}
     * @private
     */
    function _tab(url) {
        var _obj = [];
        var title = _getTitle();
        var _objDefaulOne = {
            colNumCss: 'twoTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
            thisItem: 'thisItem', //高亮 css 名称
            name: title, //名称
            route: url //routeUrl
        };
        switch (url) {
            case '/home':
                _obj = [{
                    colNumCss: 'fourTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
                    thisItem: _objDefaulOne.thisItem, //高亮
                    name: '供', //名称
                    route: 'hrefTabHome', //routeUrl
                    stateName: 'home', //routeUrl
                }, {
                    colNumCss: 'fourTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
                    thisItem: false, //高亮
                    name: '需', //名称
                    route: 'hrefTabNeed', //routeUrl
                    stateName: 'need', //routeUrl
                }, {
                    colNumCss: 'fourTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
                    thisItem: false, //高亮
                    name: '<i class="fa fa-ellipsis-h"></i>', //名称
                    route: 'hrefTabmemberIndex', //routeUrl
                    stateName: 'memberIndex', //routeUrl
                }, {
                    colNumCss: 'fourTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
                    thisItem: false, //高亮
                    //name: '<i class="fa fa-star-o"></i>', //名称
                    name: '标记', //名称
                    route: 'hrefTabStar', //routeUrl
                    stateName: 'star', //routeUrl
                }];
                return _obj;
            case '/need':
                _obj = [{
                    colNumCss: 'fourTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
                    thisItem: false, //高亮
                    name: '供', //名称
                    route: 'hrefTabHome', //routeUrl
                    stateName: 'home', //routeUrl
                }, {
                    colNumCss: 'fourTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
                    thisItem: 'thisItem', //高亮
                    name: '需', //名称
                    route: 'hrefTabNeed', //routeUrl
                    stateName: 'need', //routeUrl
                }, {
                    colNumCss: 'fourTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
                    thisItem: false, //高亮
                    name: '<i class="fa fa-ellipsis-h"></i>', //名称
                    route: 'hrefTabMemberIndex', //routeUrl
                    stateName: 'memberIndex', //routeUrl
                }, {
                    colNumCss: 'fourTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
                    thisItem: false, //高亮
                    name: '<i class="fa fa-star-o"></i>', //名称
                    route: 'hrefTabStar', //routeUrl
                    stateName: 'star', //routeUrl
                }];
                return _obj;
            case '/star':
                _obj = [{
                    colNumCss: 'fourTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
                    thisItem: false, //高亮
                    name: '供', //名称
                    route: 'hrefTabHome', //routeUrl
                    stateName: 'home', //routeUrl
                }, {
                    colNumCss: 'fourTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
                    thisItem: false, //高亮
                    name: '需', //名称
                    route: 'hrefTabNeed', //routeUrl
                    stateName: 'need', //routeUrl
                }, {
                    colNumCss: 'fourTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
                    thisItem: false, //高亮
                    name: '<i class="fa fa-ellipsis-h"></i>', //名称
                    route: 'hrefTabMemberIndex', //routeUrl
                    stateName: 'memberIndex', //routeUrl
                }, {
                    colNumCss: 'fourTab', //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
                    thisItem: 'thisItem', //高亮
                    name: '<i class="fa fa-star-o"></i>', //名称
                    route: 'hrefTabStar',//routeUrl
                    stateName: 'star', //routeUrl
                }];
                return _obj;

            case '/memberIndex':
                _obj = [{
                    colNumCss: _objDefaulOne.colNumCss, //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
                    thisItem: false, //高亮
                    name: '登录', //名称
                    route: 'login' //routeUrl
                }, {
                    colNumCss: _objDefaulOne.colNumCss, //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
                    thisItem: _objDefaulOne.thisItem, //高亮
                    name: '设置', //名称
                    route: 'memberIndex' //routeUrl
                },];
                return _obj;
            case '/login':
                _obj = [{
                    colNumCss: _objDefaulOne.colNumCss, //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
                    thisItem: _objDefaulOne.thisItem, //高亮
                    name: '登录', //名称
                    route: 'login' //routeUrl
                }, {
                    colNumCss: _objDefaulOne.colNumCss, //设置tab的 个数,默认 2 个 , twoTab ,threeTab,fourTab
                    thisItem: false, //高亮
                    name: '设置', //名称
                    route: 'memberIndex' //routeUrl
                },];
                return _obj;
            default:
                return [];
        }
    }

    /**
     * get gps 获取gps 或者 ip定位 拿到 gps(web), 给到 gpsObj
     * 广播全局 gps 事件.
     */
    function getGps() {
        thisTools.trueWeb(_web, _app);//判断手机 或者 app 来判断 定位 ,获取地理位置数据

        /*************************
         * todo
         * //获取 ip地址,去反查地址数据
         * 16/8/19 上午7:43 ByRockBlus
         *************************/
        function _web() {
            var url = _config.host.phpHost + '/Api/Jsonp/getIP/from/web';

            thisTools.getJsp(url, true).then(_s, _f);


            function _s(re) {
                thisTools.alert({title: re.ip});
            }

            function _f() {

            }

            //获取 ip地址,去反查地址数据
        }

        /*************************
         *获取手机导航gps,去soso拿地址数据
         * 16/8/19 上午7:43 ByRockBlus
         *************************/
        function _app() {
            var gpsObj = {};

            // H5 plus事件处理
            function plusReady() {
                if (!window.plus) {
                    return;
                }
                setTimeout(function () {
                    //todo ios 真机调试
                    plus.geolocation.getCurrentPosition(_success, _err, _option);
                }, 0);
            }

            if (window.plus) {
                plusReady();
            } else {
                document.addEventListener("plusready", plusReady, false);
            }


            //定位成功回调
            function _success(p) {
                gpsObj.lat = p.coords.latitude;
                gpsObj.lng = p.coords.longitude;
                thisTools.alert({
                    'title': 'title' + gpsObj.lat,
                    'content': gpsObj.lng
                });
            }

            //失败回调
            function _err(e) {

                console.log(e);
                thisTools.alert({
                    title: '获取位置失败',
                    content: e.message
                });
            }

            //参数配置
            /**************************
             * enableHighAccuracy: (Boolean 类型 )是否高精确度获取位置信息
             高精度获取表示需要使用更多的系统资源，默认值为false。

             timeout: (Number 类型 )获取位置信息的超时时间
             单位为毫秒（ms），默认值为不超时。如果在指定的时间内没有获取到位置信息则触发错误回调函数。

             maximumAge: (Number 类型 )获取位置信息的缓存时间
             单位为毫秒（ms），默认值为0（立即更新获取）。如果设备缓存的位置信息超过指定的缓存时间，将重新更新位置信息后再返回。

             provider: (String 类型 )优先使用的定位模块
             可取以下供应者： "system"：表示系统定位模块，支持wgs84坐标系；
             "baidu"：表示百度定位模块，支持gcj02/bd09/bd09ll坐标系；
             "amap"：表示高德定位模板，支持gcj02坐标系。
             默认值按以下优先顺序获取（amap>baidu>system），若指定的provider不存在或无效则返回错误回调。
             注意：百度/高德定位模块需要配置百度/高德地图相关参数才能正常使用。
             * 16/8/21 上午7:43 ByRockBlus
             **************************/

            function _option() {
                return {
                    enableHightAccuracy: false,
                    timeout: 10000,
                    maximumAge: 600000,
                };
            }
        }

    }

    /*************************
     * 根据 ip 定位城市
     * 16/9/2 上午8:09 ByRockBlus
     *************************/
    function ipToCity() {
        console.log('arg', arguments);

    }

    /*************************
     * 根据gps 定位城市,并返回 具体信息 (app)
     * 16/9/2 上午8:10 ByRockBlus
     *************************/

    /**
     * 第一次后给localStorage一个随机码,验证用户发送短信用
     * @private
     */
    function _giveRoundCode() {
        localStorage.removeItem(_config.localSaveName.user.roundCodeId);
        setTimeout(function () {
            var roundCode = thisTools.getRoundCode(8);
            localStorage.setItem(_config.localSaveName.user.roundCodeId, roundCode);
        }, 200);
    }
})();
/**
 * tap.dipan.clickTapPublic.server.js
 * 命名注释：directive简称_tap. 父模块_dipan . 功能_原生mui点击tap事件 bind id.
 * 取跳转值url  , 事件点击,tap ,写在 单独的页面里面,这里是导航路由跳转 , 带url 属性的 才生效
 * . 类型_directive .js
 * 使用 ：class='angular'
 * Created by rockblus on 16-2-5.
 */
(function () {
    'use strict';
    angular.module('dipan').factory('tap', tap);
    tap.$inject = ['$state', 'tools'];


    /**
     * angular 载入完成后。显示modle值
     * 15-12-26 */
    function tap($state, tools) {
        var re = {
            init: init
        };

        var ids = [
            'goHistory',//返回上一页
            'hrefArea',//地区选择
            'hrefSearch',//搜索
            'hrefHome',//主页 供
            'hrefTabHome',//主页 供
            'hrefTabNeed',//需
            'hrefTabStar',//标记
            'hrefMaster',//地主
            'hrefMember',//我的首页
            'hrefMemberAddArticle',//test添加文章
        ];

        var idsIsBind = [];//已经在服务绑定过的 id,就不去绑定了

        //排除 加入 绑定的 id
        var noIdIsBing = [
            'hrefTabHome',
            'hrefTabNeed',
            'hrefTabStar',
            'hrefMemberAddArticle'
        ];

        function plus(callBack) {
            // H5 plus事件处理
            function plusReady() {
                if (!window.plus) {
                    return;
                }
                setTimeout(function () {
                    callBack();
                }, 0);

            }

            if (window.plus) {
                plusReady();
            } else {
                document.addEventListener("plusready", plusReady, false);
            }

        }

        function init() {

            tools.trueWeb(_call,
                function () {
                    plus(_call);
                });//判断手机网页 手机 绑定 tap 事件, 网页绑定 click事件

            function _call() {
                angular.forEach(ids, function (vo) {
                    var doc = _trueIsSetId(vo);
                    if (doc) {//判断id存在
                        var _doc = angular.element(doc);
                        var url = _doc.attr('url');
                        _goUrl(doc, url);
                    }
                });
            }
        }


        /**
         * 跳转url
         * @param {document}doc
         * @param {String}url
         * @private
         */
        function _goUrl(doc, url) {
            var type = 'tap';
            tools.trueWeb(function () {
                type = 'click';
            }, function () {
            });


            doc.addEventListener(type, function () {
                __saveScrollTop();
                if (url == 'goHistory') {//判断是 返回上页的点击事件
                    history.go(-1);
                } else {
                    $state.go(url);
                }
            });


            /**
             * 记录body滚动位置,对应url 去存储
             * @private
             */
            function __saveScrollTop() {
                var url = $state.current.name;
                var saveStr = url + '_scrollTop';
                var num = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                localStorage.removeItem(saveStr);
                localStorage.setItem(saveStr, num);
            }

        }


        /**
         * 判断id 是否存在,存在的话,返回 true
         * @param {传入id} id
         * @returns {document}
         * @private
         */
        function _trueIsSetId(id) {
            if (id) {
                if (idsIsBind.indexOf(id) == -1) {
                    var doc = document.getElementById(id);
                    if (doc) {
                        if (noIdIsBing.indexOf(id) == -1) {//排除 不绑定的 id
                            idsIsBind.push(id);
                        }
                        return doc;
                    }
                }
            }
        }

        return re;
    }


})();

/**
 *tools.dipan.block.factory.js
 * 命名注释：server简称_tools. 父模块 dipan . 功能_tools 相关服务:otherDiv. 类型_factory.js
 * otherDiv
 * Created by rockblus on 16-2-5.
 */

(function (window) {
    'use strict';
    angular.module('dipan').factory('tools', tools);

    tools.$inject = ['$http', '$rootScope', '$q', 'ui', '$filter'];

    function tools($http, $rootScope, $q, ui, $filter) {

        var re;

        re = {
            /**
             * alertDiv.alertInfo 在模板挂载了一个 点击事件传来的 attr。可以带到 alertInfo 的模板中，
             * 此处是返回这个 otherDiv 的module json串转换的对象
             * 16/2/18 */
            otherData: otherData,

            /********************
             * 验证相关
             * 16/2/18 ************************/
            /** 验证空 15-3-22 */
            isEmpty: isEmpty,

            /** 验证手机号 15-3-22 */
            checkMobile: checkMobile,

            /**
             * 删除数组中的 第几个元素
             * 16/2/18 */
            arrDel: arrDel,

            /**
             * postJsp
             * 16/2/19 */
            getJsp: getJsp,

            /**
             * postJsp
             * 16/2/19 */
            postJsp: postJsp,

            /**
             * 判断是否 function
             * 16/2/19 */
            isFunction: isFunction,

            /*************************
             * alert 判断app 还是 html 显示不同的 弹出框,手机用原生弹窗
             * 16/8/15 下午3:18 ByRockBlus
             *************************/
            alert: toolsAlert,

            /*************************
             * function trueWeb(web,app) 判断手机,还是 wap,回调函数
             * 16/8/19 上午7:32 ByRockBlus
             *************************/
            trueWeb: trueWeb,

            /**
             * 根据名称 存储obj
             * @param localName
             * @param obj
             */
            saveLocalStorageObj: saveLocalStorageObj,

            /**
             * 根据名称 getobj
             * @param localName
             * @param obj
             */
            getLocalStorageObj: getLocalStorageObj,

            /**************************
             *  遍历所有localStorage,返回一个 键名数组对象
             * 16/9/17 上午10:40 ByRockBlus
             **************************/
            getAllCatchListName: getAllCatchListName,

            /**
             * 返回一个 随机数
             * @param {位数}n
             * @returns {string}
             */
            getRoundCode: getRoundCode,

            /**
             * 获取当天 时间字符串 标示 2016_09_18
             */
            getToday: getToday

        };

        /**
         * 具体fun *****************************
         * 16/2/18 */

        /**
         * alertDiv.alertInfo 在模板挂载了一个 点击事件传来的 attr。可以带到 alertInfo 的模板中，
         * 此处是回调这个 otherDiv 的module json串转换的对象
         * 16/2/18 */
        function otherData(fun) {
            var reContent = document.getElementById('otherData');
            if (reContent) {
                reContent = angular.element(reContent);
                setTimeout(function () {
                    reContent = reContent.attr('data');
                    reContent = JSON.parse(reContent);
                    fun(reContent);
                }, 0);
            }
        }

        /********************
         * 验证相关
         * 16/2/18 ************************/
        /** 验证空 15-3-22 */
        function isEmpty(t) {
            return t ? true : false;
        }

        /** 验证手机号 15-3-22 */
        function checkMobile(sMobile) {
            if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(sMobile))) {
                return false;
            } else {
                return true;
            }
        }

        /**
         * 删除数组中的元素,传入数组，和第几个
         * @param {Array} arr
         * @param {Number} num
         */
        function arrDel(arr, num) {
            if (!Array.prototype.remove) {
                Array.prototype.remove = function (from, to) {
                    var rest = this.slice((to || from) + 1 || this.length);
                    this.length = from < 0 ? this.length + from : from;
                    return this.push.apply(this, rest);
                };
            }
            arr.remove(num);
            delete Array.prototype.remove;
        }

        /**
         * angular get
         * 传 url
         * data对象
         * isNoLoading (可选 true:不显示loading动画)
         * 15-3-27 */
        function getJsp(getMoreUrl, isNoLoading) {
            if (!isNoLoading) {
                $rootScope.$broadcast('openLoading'); //http请求前 显示loading
            }


            function _get(url) {
                var defer = $q.defer();
                $http({
                    url: url,
                    method: 'GET',
                    timeout: 10000
                })
                    .success(function (doc) {
                        if (!isNoLoading) {
                            $rootScope.$broadcast('closeLoading'); //http请求成功 关闭loading
                        }
                        defer.resolve(doc);
                    }).error(function (err) {
                    if (!isNoLoading) {
                        $rootScope.$broadcast('closeLoading'); //http请求成功 关闭loading
                    }
                    defer.reject(err);
                    re.alert({
                        title: '网络请求失败',
                        content: '请检查网络设置'
                    });
                });
                return defer.promise;
            }

            return _get(getMoreUrl);

        }

        /**
         * angular post
         * 传 url
         * data对象
         * isNoLoading (可选 true:不显示loading动画)
         * 15-3-27 */
        function postJsp(getMoreUrl, data, isNoLoading) {
            console.log('data', data);
            //data.queryNode = true
            if (!isNoLoading) {
                $rootScope.$broadcast('openLoading'); //http请求前 显示loading
            }
            var endData = {};
            for (var vo in data) {
                endData[vo] = data[vo];
            }
            //$http({
            //    url: getMoreUrl,
            //    method: "POST",
            //    data: endData,
            //    timeout: 10000 //超时设置
            //}).success(function (response) {
            //    $rootScope.$broadcast('closeLoading');//http请求成功 关闭loading
            //    re(response);
            //}).error(function (data, status, headers, config, error) {
            //    if (errRe) {//如果有回调方法,回调错误
            //        $rootScope.$broadcast('closeLoading');//http请求成功 关闭loading
            //        errRe(error);
            //    } else {
            //        $rootScope.$broadcast('closeLoading');//http请求成功 关闭loading
            //        toolsAlert('http错误:' + error);
            //    }
            //    return false;
            //});


            function _post(url, postData) {
                var defer = $q.defer();
                $http({
                    url: url,
                    method: 'POST',
                    data: postData,
                    timeout: 10000
                })
                    .success(function (doc) {
                        if (!isNoLoading) {
                            $rootScope.$broadcast('closeLoading'); //http请求成功 关闭loading
                        }
                        defer.resolve(doc);
                    }).error(function (err) {
                    if (!isNoLoading) {
                        $rootScope.$broadcast('closeLoading'); //http请求成功 关闭loading
                    }
                    defer.reject(err);
                    re.alert({
                        title: '网络请求失败',
                        content: '请检查网络设置'
                    });
                });
                return defer.promise;
            }

            return _post(getMoreUrl, endData);

        }

        /**
         * 判断是 function
         * @param {Function} fn
         * @returns {boolean}
         */
        function isFunction(fn) {
            return Object.prototype.toString.call(fn) === '[object Function]';
        }

        /*************************
         * alert 判断app 还是 html 显示不同的 弹出框,手机用原生弹窗
         * 16/8/15 下午3:18 ByRockBlus
         *************************/
        function toolsAlert(msgObj) {
            ui.alert(msgObj);
        }

        /*************************
         * function trueWeb(web,app) 判断手机,还是 wap,回调函数
         * 16/8/19 上午7:32 ByRockBlus
         *************************/
        function trueWeb(web, app) {
            setTimeout(function () {
                if (window.trueWeb()) {
                    web();
                } else {
                    app();
                }
            }, 0);

        }

        /**
         * 根据名称 存储obj
         * @param localName
         * @param obj
         */
        function saveLocalStorageObj(localName, obj) {
            localStorage.removeItem(localName);
            setTimeout(function () {
                var objStr = JSON.stringify(obj);
                localStorage.setItem(localName, objStr);
            }, 200);
        }

        /**
         * 根据名称 getObj
         * @param localName
         * @return obj
         */
        function getLocalStorageObj(localName) {
            var obj = localStorage.getItem(localName);
            if (obj !== 'undefined') {
                var objStr = JSON.parse(obj);
                return objStr;
            }
        }

        /**************************
         * 遍历所有localStorage,返回一个 键名数组对象
         * 16/9/17 上午10:37 ByRockBlus
         **************************/
        function getAllCatchListName() {
            var nameArr = [];
            angular.forEach(localStorage, function (k, v) {
                nameArr.push(v);
            });
            return nameArr;
        }

        /**
         * 返回一个 随机数
         * @param {位数}n
         * @returns {string}
         */
        function getRoundCode(n) {
            var rnd = "";
            for (var i = 0; i < n; i++) {
                rnd += Math.floor(Math.random() * 10);
            }
            return rnd;
        }

        /**
         * 获取当天 时间字符串 标示 2016_09_18
         * @return {string} 2016_09_18
         */
        function getToday() {
            var today = new Date();
            return $filter('date')(today, 'yyyy_MM_dd');//当天的 日期 2016_09_18
        }

        return re;
    }
})(window);
/**
 * touchScroll.dipan.hackScrollClick.factory.js
 * 命名注释：server简称_touchScroll. 父模块 dipan . 功能_hack scroll 之后的 点击事件. 类型_factory.js
 * 滚动借宿以后,禁止浏览器滚动(touchEnd),这样就可以响应点击事件
 */

(function () {
    'use strict';

    angular.module('dipan').factory('touchScroll', touchScroll);
    touchScroll.$inject = ['$rootScope'];

    function touchScroll($rootScope) {

        /**
         * ji禁止滚动
         * 15/12/22 */
        function preventDefault(e) {
            e.preventDefault();
        }


        /**
         *页面逻辑具体调用方法
         * 15/12/22 */
        var scroll = {
            start: function (e) {
                document.addEventListener('touchmove', preventDefault, false);//禁止浏览器滚动
            },
            stop: function (e) {
                document.removeEventListener('touchmove', preventDefault, false);//恢复浏览器滚动
            }
        };
        //
        //document.addEventListener('touchstart', touch, false);
        //document.addEventListener('touchmove', touch, false);
        //document.addEventListener('touchend', touch, false);
        //document.addEventListener('onclick', function () {
        //    alert(1);
        //}, false);

        //function touch(event) {
        //    var event = event || window.event;
        //
        //
        //    switch (event.type) {
        //        case "touchstart":
        //            //console.log('start', event.touches[0].clientX + "," + event.touches[0].clientY);
        //            break;
        //        case "touchend":
        //            //console.log('end', event.changedTouches[0].clientX + "," + event.changedTouches[0].clientY);
        //            break;
        //        case "touchmove":
        //            //console.log('end', event.changedTouches[0].clientX + "," + event.changedTouches[0].clientY);
        //            //event.preventDefault();
        //            break;
        //    }
        //
        //}


    }

})();

/**
 * ui.dipan.ui.factory.js
 * 命名注释：server简称_ui. 父模块 dipan . 功能_ui相关封装(alert,),rootScope 下的事件触发,. 类型_factory.js
 */

(function () {
    'use strict';

    /** api接口,nodejs,php  */
    var apiUrl = {};


    angular.module('dipan').factory('ui', ui);
    ui.$inject = ['$rootScope'];

    function ui($rootScope) {
        var re = {};
        re.alert = _alert;//标准alertui

        function _alert(obj) {
            //obj 格式 {'title':title,'content':content}
            $rootScope.$broadcast('alert', obj);
        }
        return re;
    }

})();

/**
 * update.block.getJsCss.factory.js
 * 命名注释：server简称_update. 父模块 block.
 * 功能_ plus 方法 , 更新app相关操作.  (下载文件,写入localstroe相关标示),plusReady 之后调用
 * 类型_factory.js
 */

(function () {
    'use strict';
    angular.module('dipan').factory('update', upData);
    upData.$inject = ['config', '$q', 'tools'];

    var _this;
    var _config;
    var _tools;
    var q;

    function upData(config, $q, tools) {

        var re = {};
        re.trueUpdata = trueUpdata; //根据版本号判断是否升级
        re.init = _init; //起始动作,plusReady之后再调用

        _this = re;
        _config = config;
        _tools = tools;
        q = $q;

        // H5 plus事件处理
        function plusReady() {
            if (!window.plus) {
                return;
            }
            setTimeout(function () {
                _init();
            }, config.system.timeoutUpData);
        }

        if (window.plus) {
            plusReady();
        } else {
            document.addEventListener("plusready", plusReady, false);
        }

        // 监听DOMContentLoaded事件
        //document.addEventListener("DOMContentLoaded", function () {
        //    console.log(333333);
        //    domready = true;
        //    plusReady();
        //}, false);


    }


    //升级更新起始动作,plusReady之后再调用,传入 name  str ,单独文件名(app.js,app.css),
    function _init() {
        /**************************
         * 1.检测升级
         * 2.需要升级,就去 启动 升级 打开 webview updata.html
         * 16/8/26 上午10:58 ByRockBlus
         **************************/
        trueUpdata().then(openUdataWebView, function (err) {
            _tools.alert({
                title: '升级失败',
                content: err
            });
        });
    }

    //根据版本号判断是否升级
    function trueUpdata() {

        var defer = q.defer();
        var version = localStorage.getItem(_config.localSaveName.version.key);
        //if没有版本号,就写入config 默认版本号
        if (!version) {
            localStorage.setItem(_config.localSaveName.version.key, _config.version.default);
            defer.reject('第一次运行,写入版本号');
        }

        //if 有version 就去接口拿需最新的 版本号,然后比较
        if (version) {
            _getVersion(function (re) {
                try {
                    if (parseFloat(version) < parseFloat(re.version)) {
                        defer.resolve(re.version);//回调成功执行then的 升级步骤
                    } else {
                        defer.reject('无需升级');
                    }
                } catch (e) {
                    console.error('请求版本失败(callBack方法中)');
                    return defer.reject('写入版本号请求版本失败(callBack方法中)');
                }
            }, function (err) {
                return defer.reject(err);
            });
        }


        //请求接口版本号
        function _getVersion(callBack, callBackErr) {
            //var url = 'http://dipan.so:8081/version.json?' + new Date();//todo
            var url = 'http://127.0.0.1:8081/version.json?' + new Date();//todo
            _tools.postJsp(url, {}, true).then(function (re) {
                    //{code: "S", version: "1.2", msg: "获取版本成功"}
                    callBack(re);
                },
                function (err) {
                    callBackErr(err);
                    console.log('err', '请求version接口失败');
                }
            );
        }

        return defer.promise;
    }


    //启动 升级 打开 webview updata.html
    function openUdataWebView(verison) {
        _tools.alert({
            title: '打开updataWebView',
            content: verison + '号'
        });

        plus.webview.create('updata.html', '', '', {verison: verison});
    }


    //建立下载 传 文件path,成功回调,失败回调
    //function _saveFile(filePath, downItemNetUrl, succesCall, errCall) {
    //
    //    var dtask = plus.downloader.createDownload(downItemNetUrl, {
    //        filename: filePath
    //    }, function(d, status) {
    //        // 下载完成
    //        if (status == 200) {
    //            plus.io.resolveLocalFileSystemURL(d.filename, function(entry) {
    //                succesCall(entry);
    //            });
    //        } else {
    //            //下载失败
    //            errCall();
    //        }
    //    });
    //    dtask.start();
    //}
    //
    //_saveItemLocalStore ,存储localStore
    //function _saveItemLocalStore(name, path) {
    //    if (name && path) {
    //        //先清除
    //        _delItemLocalStore(name);
    //        setTimeout(function() {
    //            // 1秒后存储
    //            localStorage.saveItem(name, path);
    //        }, 1000);
    //    }
    //
    //}

    //_delItemLocalStore ,删除localStore
    //function _delItemLocalStore(name) {
    //    localStorage.removeItem(name);
    //}


})();
/**
 * urlParse.dipan.urlParse.factory.js
 * 命名注释：server简称_urlParse. 父模块 dipan . 功能_全局变量 数据 模型. 类型_factory.js
 * ------------------------------------------------
 * 监听从模板解析来的 php变量对象 赋值改变事件 urlParseChange
 * 同时广播 所有 子域, 变量改变事件 urlParseChange
 */

(function () {
    'use strict';
    angular.module('dipan').factory('urlParse', urlParse);

    urlParse.$inject = ['$rootScope', 'api'];

    var fun = {};//urlParse 相关方法对象
    var data = {};//全局变量对象
    var apiPost;//apiPost server
    function urlParse($rootScope, api) {
        apiPost = api;
        /**
         * 监听从模板解析来的 php变量对象 赋值改变事件 urlParseChange
         * 同时广播 所有 子域, 变量改变事件 urlParseChange
         * 16/3/10 */
        onUrlParseChange();

        /**
         * 返回urlParse变量对象
         * 16/3/10 */
        return {
            data: data,
            fun: fun
        };

        /**
         * 监听从模板解析来的 php变量对象 赋值改变事件
         * 同时广播 所有 子域, 变量改变事件 urlParseChange
         * 16/3/10 */
        function onUrlParseChange() {
            $rootScope.$on('urlParseChange', function () {
                $rootScope.$broadcast('urlParseChangeSub');
            });
        }
    }

    /*************************
     * fun 详情
     * 16/3/10 ***************/

    /**
     * 获取topArea地区 字符串
     * @param {obj} session 对象
     * @returns {String}
     * 16/3/17 */
    fun.getTopArea = function (session) {
        var re;
        try {
            switch (session.place.type) {
                case 1:
                    re = session.place.thisCityInfo.name;//一级天津
                    break;
                case 2:
                    re = session.place.oneCityInfo.name + session.place.thisCityInfo.name;//2级武清
                    break;
                case 3:
                    re = session.place.oneCityInfo.name + session.place.twoCityInfo.name + session.place.thisCityInfo.name;//2级武清
                    break;
                default:
                    re = '地盘网';
                    break;
            }
            return re;
        } catch (e) {
            return '地盘网';
        }
    };

    /**
     * 获取热门城市
     * selectHotCity
     * 16/3/18 */
    fun.selectHotCity = function (callback) {
        apiPost('selectHotCity', {}, function (doc) {
            callback(doc);
        }, function (err) {
            console.error(err);
        });
    };
})();



angular.module('dipan').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('directive/block/alert.block.alertUi.html',
    "<div id=\"alertUi\" ng-if=\"showAlertUi\">\n" +
    "    <div style=\"width: 100%;height: 100%;\" ng-class=\"alertUiClass\">\n" +
    "        <div class=\"left\" style=\"margin-left: 30px;width:50px;overflow: hidden\">\n" +
    "            <i class=\"fa fa-ban fa-3x\" style=\"color: #f4f4f4;margin-top: 7px\"></i>\n" +
    "        </div>\n" +
    "        <div class=\"left\" style=\"width:60%;overflow: hidden\">\n" +
    "            <div class=\"clear\" style=\"margin-left: 20px;font-size: 1.2em;margin-top: 10px \">{{title}}</div>\n" +
    "            <div class=\"clear\" style=\"margin-left: 20px;font-size: 0.9em;margin-top: 3px;color: #777;height: 20px;overflow: hidden \">{{content}}</div> </div>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('directive/block/area.dipan.areaSelect.directive.html',
    "<div class=\"clear viewContent\">\n" +
    "    <div class=\"title\">area</div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n"
  );


  $templateCache.put('directive/block/loading.dipan.loanding.directive.html',
    "<i ng-show=\"loading\"  class=\"fa fa-spinner fa-spin fa-3x fa-fw loading\"></i>"
  );


  $templateCache.put('directive/block/search.dipan.search.directive.html',
    "<div class=\"clear viewContent\">\n" +
    "    <div class=\"title\">search</div>\n" +
    "</div>\n" +
    "\n"
  );


  $templateCache.put('directive/block/tab.block.tabNav.directive.html',
    "<div id=\"tab\" class=\"clear\" style=\"\">\n" +
    "    <div id=\"{{vo.route}}\" url=\"{{vo.stateName}}\" ng-class=\"vo.colNumCss\" class=\"linkMouse\" ng-repeat=\"vo in tabList\">\n" +
    "        <span ng-class=\"vo.thisItem\" class=\"btn\" ng-bind-html=\"vo.name|toHtml\"></span>\n" +
    "    </div>\n" +
    "</div>"
  );


  $templateCache.put('directive/block/top.block.topNav.html',
    "<header class=\"mui-bar mui-bar-nav\">\n" +
    "    <i ng-if=\"url !== '/home'\" onclick=\"history.go(-1);\" id=\"goHistory\" url=\"goHistory\" class=\"fa fa-angle-left linkMouse  mui-pull-left mui-btn icon-btn\"></i>\n" +
    "    <i ng-if=\"url == '/home'\" id=\"hrefArea\" url=\"area\" class=\"fa fa-location-arrow  mui-pull-left mui-btn icon-btn linkMouse\"></i>\n" +
    "    <i id=\"hrefSearch\" url=\"search\" class=\"fa fa-search fa-1  mui-pull-right mui-icon icon-btn\"\n" +
    "       style=\"padding-right: 17px;padding-top: 13px;\"></i>\n" +
    "    <h1 class=\"mui-title\">{{title}}</h1>\n" +
    "</header>\n"
  );


  $templateCache.put('directive/home.dipan.home.directive.html',
    "<div class=\"clear viewContent\" style=\"background-color: #777;margin-top: 44px\">\n" +
    "    <style>\n" +
    "        .mui-navigate-right:after, .mui-push-right:after {\n" +
    "            right: 0px;\n" +
    "            content: '';\n" +
    "        }\n" +
    "\n" +
    "        .mui-table-view-chevron .mui-table-view-cell {\n" +
    "            padding-right: 30px;\n" +
    "        }\n" +
    "\n" +
    "    </style>\n" +
    "    <div class=\"titleInfo clear\" ng-show=\"false\">\n" +
    "        <div id=\"titleInfo\">\n" +
    "            <i class=\"fa fa-user\"></i>\n" +
    "            刚刚有{{peopleNum}}3人访问了你\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <div id=\"list\" class=\"mui-table-view mui-table-view-chevron clear\" style=\"background-color:#777;margin-top: 10px\">\n" +
    "    </div>\n" +
    "    <div class=\"mui-btn\" ng-if=\"urlName != 'star'\" id=\"isWeb\"\n" +
    "         style=\"width:140px;left: 50%;margin-left: -70px;margin-top: 20px;margin-bottom: 20px\">加载更多...\n" +
    "    </div>\n" +
    "    <div class=\"mui-btn\" ng-if=\"urlName == 'star'\" id=\"isStar\"\n" +
    "         style=\"width:140px;left: 50%;margin-left: -70px;margin-top: 20px;margin-bottom: 20px;background-color: #bd0000\">\n" +
    "        清空标记\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n" +
    "\n"
  );


  $templateCache.put('directive/login.dipan.login.directive.html',
    "<div class=\"scrollable-content section viewContent\">\n" +
    "    <style>\n" +
    "        .btn-danger {\n" +
    "            background-color: #bd0000;\n" +
    "            border-color: #bd0000;\n" +
    "        }\n" +
    "\n" +
    "        .has-success .form-control:focus {\n" +
    "            border-color: #000000;\n" +
    "            -ms-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #aeafb1;\n" +
    "            box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #a8a6b1;\n" +
    "        }\n" +
    "\n" +
    "        .has-success .form-control {\n" +
    "            border-color: #000000;\n" +
    "            -ms-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n" +
    "            box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n" +
    "        }\n" +
    "\n" +
    "        fieldset {\n" +
    "            border: 0px;\n" +
    "        }\n" +
    "    </style>\n" +
    "\n" +
    "    <form name=\"myForm\" id=\"myForm\" novalidate>\n" +
    "        <fieldset>\n" +
    "            <div class=\"form-group has-success has-feedback \">\n" +
    "                <input type=\"number\" name=\"tel\" required ng-model=\"tel\"\n" +
    "                       class=\"form-control\"\n" +
    "                       placeholder=\"手机号\">\n" +
    "            </div>\n" +
    "            <div class=\"clearThis\"></div>\n" +
    "            <div class=\"form-group has-success has-feedback left\" style=\"width:60%\">\n" +
    "                <input type=\"number\" ng-model=\"code\" class=\"form-control \" placeholder=\"验证码\">\n" +
    "            </div>\n" +
    "            <div class=\"mui-btn right\" ng-class=\"codeClass\" ng-click=\"getCode()\"\n" +
    "                 style=\"width:38%;background-color: #f4f4f4;border-color:#000;color:#000;font-size: 17px \">\n" +
    "                {{codeText}}\n" +
    "            </div>\n" +
    "            <div class=\"clear\"></div>\n" +
    "            <button style=\"width:100%;color:#fff;font-size: 17px;font-weight: bold\" ng-click=\"formSub()\"\n" +
    "                    class=\"btn btn-danger btn-block btn-lg\">\n" +
    "                登录\n" +
    "            </button>\n" +
    "        </fieldset>\n" +
    "\n" +
    "\n" +
    "    </form>\n" +
    "</div>\n"
  );


  $templateCache.put('directive/member/add.dipan.addFrom.directive.html',
    "<div class=\"clear viewContent\" style=\"margin-top: 44px\">\n" +
    "    <div class=\"mui-table-view mui-table-view-chevron clear\" style=\"margin-top: 10px\">\n" +
    "        <form name=\"addFrom\" id=\"myAddForm\" novalidate>\n" +
    "            <fieldset>\n" +
    "                <div class=\"form-group \">\n" +
    "                    <input type=\"text\" name=\"title\" required ng-model=\"form.title\"\n" +
    "                           class=\"form-control\"\n" +
    "                           placeholder=\"标题\">\n" +
    "                </div>\n" +
    "                <div class=\"form-group \">\n" +
    "                    <textarea type=\"text\" name=\"content\" required ng-model=\"form.content\"\n" +
    "                              class=\"form-control\"\n" +
    "                              placeholder=\"内容\"></textarea>\n" +
    "                </div>\n" +
    "                <div class=\"clearThis\"></div>\n" +
    "                <div class=\"clear\"></div>\n" +
    "                <button style=\"width:100%;font-size: 17px;font-weight: bold\" ng-click=\"formSub()\"\n" +
    "                        class=\"btn btn-danger btn-block btn-lg\">\n" +
    "                    提交\n" +
    "                </button>\n" +
    "            </fieldset>\n" +
    "\n" +
    "        </form>\n" +
    "    </div>\n" +
    "</div>\n"
  );


  $templateCache.put('directive/member/my.dipan.myIndexNav.html',
    "<div class=\"clear viewContent\" style=\"text-align: center ;margin-top: 130px\">\n" +
    "    <ul id=\"{{vo.hrefId}}\" url=\"{{vo.url}}\" class=\"mui-table-view mui-table-view-chevron\" style=\"text-align: left\" bindonce ng-repeat=\"vo in listNav\">\n" +
    "        <div class=\"mui-table-view-cell linkMouse clear\"\n" +
    "             style=\"padding-right: 26px;height: 50px;padding-top: 16px;\">\n" +
    "            <i class=\"{{vo.icon}} pull-left\" style=\"color:#888;margin-top: 3px\"></i>\n" +
    "            <i class=\"fa fa-chevron-right pull-right\"></i>\n" +
    "            <span style=\"font-size: 1.4em;margin-left: 20px\">{{vo.name}}</span>\n" +
    "        </div>\n" +
    "    </ul>\n" +
    "    <div class=\"clear\" style=\"margin-top: 40px\"></div>\n" +
    "    <div class=\"clear\" style=\"font-size: 12px\">当前版本:<span style=\"color: #bd0000\">{{version}}</span></div>\n" +
    "</div>\n"
  );


  $templateCache.put('index.html',
    "<!DOCTYPE html>\n" +
    "<html>\n" +
    "<head>\n" +
    "    <meta charset=\"utf-8\"/>\n" +
    "    <title>地盘 dipan.so</title>\n" +
    "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1,maximum-scale=1,user-scalable=no\">\n" +
    "    <meta name=\"apple-mobile-web-app-capable\" content=\"yes\">\n" +
    "    <meta name=\"apple-mobile-web-app-status-bar-style\" content=\"black\">\n" +
    "\n" +
    "    <script>\n" +
    "\n" +
    "        (function (window) {\n" +
    "            //判断web 还是 app\n" +
    "            window.trueWeb = trueWeb;\n" +
    "            function trueWeb() {\n" +
    "                var url = window.location.href;\n" +
    "                url = url.split(':');\n" +
    "                if (url[0] === 'http') {\n" +
    "                    return true;\n" +
    "                }\n" +
    "            }\n" +
    "\n" +
    "            //web端\n" +
    "            if (trueWeb()) {\n" +
    "                document.write('<script src=\"/Public/app/dist/js/init.js\"><\\/script>');\n" +
    "            } else {\n" +
    "                //app 端\n" +
    "                document.write('<script src=\"../../dist/js/init.js\"><\\/script>');\n" +
    "\n" +
    "            }\n" +
    "        })(window);\n" +
    "\n" +
    "    </script>\n" +
    "</head>\n" +
    "\n" +
    "<body ng-app=\"dipan\" class=\"angularEnd\" ng-controller=\"body\">\n" +
    "\n" +
    "<!--顶部-->\n" +
    "<div top></div>\n" +
    "\n" +
    "<!--<div tab ng-if=\"showTab\"></div>-->\n" +
    "\n" +
    "<!--底部-->\n" +
    "<nav class=\"mui-bar mui-bar-tab\" style=\"padding-top: 0px;\">\n" +
    "    <div id=\"hrefHome\" url=\"home\" class=\"bottomBar mui-btn  icon-btn\">\n" +
    "        <span class=\"mui-icon fa fa-home fa-navbar\"></span>\n" +
    "    </div>\n" +
    "    <div id=\"hrefMaster\" url=\"master\" class=\"bottomBar  mui-btn icon-btn\">\n" +
    "        <span class=\"mui-icon fa fa-map-marker fa-navbar\"></span>\n" +
    "    </div>\n" +
    "    <div id=\"hrefMember\" url=\"memberIndex\" class=\"bottomBar mui-btn icon-btn\">\n" +
    "        <span class=\"mui-icon fa fa-user fa-navbar \">\n" +
    "        </span>\n" +
    "        <i class=\"fa fa-ellipsis-h fa-2x\" style=\"\n" +
    "width: 7px;\n" +
    "overflow-x: hidden;\n" +
    "color: #bd0000;\n" +
    "position: absolute;\n" +
    "bottom:13px;\n" +
    "margin-left: -2px;\n" +
    "\"></i>\n" +
    "    </div>\n" +
    "    <div id=\"beian\"><a href=\"http://www.miitbeian.gov.cn/\">津ICP备14005697号</a></div>\n" +
    "</nav>\n" +
    "\n" +
    "\n" +
    "<!--内容-->\n" +
    "<div class=\"mui-content\">\n" +
    "    <div loading></div>\n" +
    "    <div alert></div>\n" +
    "    <div tab ng-if=\"showTab\"></div>\n" +
    "    <ui-view></ui-view>\n" +
    "</div>\n" +
    "<!--<div class=\"app\">-->\n" +
    "<!--&lt;!&ndash; topNavbars &ndash;&gt;-->\n" +
    "<!--<div top></div>-->\n" +
    "\n" +
    "<!--<div class=\"navbar navbar-app navbar-absolute-bottom\">-->\n" +
    "<!--<div class=\"btn-group justified\">-->\n" +
    "<!--&lt;!&ndash;底部连接&ndash;&gt;-->\n" +
    "<!--<a ui-sref=\"home\" class=\"btn btn-navbar\"><i class=\"fa fa-home fa-navbar fa-lg\"></i> </a>-->\n" +
    "<!--<a href=\"#\" class=\"btn btn-navbar\"><i-->\n" +
    "<!--class=\"fa fa-map-marker fa-navbar fa-lg\"></i> </a>-->\n" +
    "<!--<a ui-sref=\"memberIndex\" class=\"btn btn-navbar\"><i-->\n" +
    "<!--class=\"fa fa-user fa-navbar fa-lg\"></i> </a>-->\n" +
    "<!--</div>-->\n" +
    "<!--</div>-->\n" +
    "\n" +
    "<!--&lt;!&ndash; App Body &ndash;&gt;-->\n" +
    "<!--<div class=\"app-body\">-->\n" +
    "<!--&lt;!&ndash;loading directive&ndash;&gt;-->\n" +
    "<!--<div loading></div>-->\n" +
    "<!--<div alert></div>-->\n" +
    "<!--<ui-view></ui-view>-->\n" +
    "<!--</div>-->\n" +
    "\n" +
    "<!--</div>&lt;!&ndash; ~ .app &ndash;&gt;-->\n" +
    "\n" +
    "<!--数据div-->\n" +
    "<!--<div url-parse={{$indexAllRe}}></div>-->\n" +
    "\n" +
    "<script>\n" +
    "    if (trueWeb()) {\n" +
    "        document.getElementById('beian').style.display = 'block';\n" +
    "    }\n" +
    "</script>\n" +
    "</body>\n" +
    "</html>\n"
  );


  $templateCache.put('indexBak.html',
    "<!DOCTYPE html>\n" +
    "<html>\n" +
    "<head>\n" +
    "    <meta charset=\"utf-8\"/>\n" +
    "    <title>dipan.so</title>\n" +
    "    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge,chrome=1\"/>\n" +
    "    <meta name=\"apple-mobile-web-app-capable\" content=\"yes\"/>\n" +
    "    <meta name=\"viewport\" content=\"user-scalable=no, initial-scale=1.0, maximum-scale=1.0\"/>\n" +
    "    <meta name=\"apple-mobile-web-app-status-bar-style\" content=\"yes\"/>\n" +
    "\n" +
    "    <script>\n" +
    "\n" +
    "        (function (window) {\n" +
    "            //判断web 还是 app\n" +
    "            window.trueWeb = trueWeb;\n" +
    "            function trueWeb() {\n" +
    "                var url = window.location.href;\n" +
    "                url = url.split(':');\n" +
    "                if (url[0] === 'http') {\n" +
    "                    return true;\n" +
    "                }\n" +
    "            }\n" +
    "\n" +
    "            //web端\n" +
    "            if (trueWeb()) {\n" +
    "                document.write('<script src=\"/Public/app/dist/js/init.js\"><\\/script>');\n" +
    "            } else {\n" +
    "\n" +
    "                //app 端\n" +
    "                document.write('<script src=\"../../dist/js/init.js\"><\\/script>');\n" +
    "\n" +
    "            }\n" +
    "        })(window);\n" +
    "\n" +
    "    </script>\n" +
    "</head>\n" +
    "\n" +
    "<body ng-app=\"dipan\" class=\"angularEnd\" ng-controller=\"body\">\n" +
    "<div class=\"app\">\n" +
    "    <!-- topNavbars -->\n" +
    "    <div top></div>\n" +
    "\n" +
    "    <div class=\"navbar navbar-app navbar-absolute-bottom\">\n" +
    "        <div class=\"btn-group justified\">\n" +
    "            <!--底部连接-->\n" +
    "            <a ui-sref=\"home\" class=\"btn btn-navbar\"><i class=\"fa fa-home fa-navbar fa-lg\"></i> </a>\n" +
    "            <a href=\"#\" class=\"btn btn-navbar\"><i\n" +
    "                    class=\"fa fa-map-marker fa-navbar fa-lg\"></i> </a>\n" +
    "            <a ui-sref=\"memberIndex\" class=\"btn btn-navbar\"><i\n" +
    "                    class=\"fa fa-user fa-navbar fa-lg\"></i> </a>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- App Body -->\n" +
    "    <div class=\"app-body\">\n" +
    "        <!--loading directive-->\n" +
    "        <div loading></div>\n" +
    "        <div alert></div>\n" +
    "        <ui-view></ui-view>\n" +
    "    </div>\n" +
    "\n" +
    "</div><!-- ~ .app -->\n" +
    "\n" +
    "<!--数据div-->\n" +
    "<!--<div url-parse={{$indexAllRe}}></div>-->\n" +
    "\n" +
    "</body>\n" +
    "</html>\n"
  );


  $templateCache.put('route/block/area.html',
    "<div area>\n" +
    "\n" +
    "</div>"
  );


  $templateCache.put('route/block/search.html',
    "<div search>\n" +
    "</div>"
  );


  $templateCache.put('route/home.html',
    "\n" +
    "<div home></div>\n" +
    "\n" +
    "\n"
  );


  $templateCache.put('route/login.html',
    "<div login></div>"
  );


  $templateCache.put('route/member/addArticle.html',
    "<div add></div>"
  );


  $templateCache.put('route/member/loginOut.html',
    "<div login-out></div>\n"
  );


  $templateCache.put('route/member/memberIndex.html',
    "<!--我的导航列表-->\n" +
    "<div my></div>\n"
  );


  $templateCache.put('route/member/memberInfo.html',
    "memberINfo"
  );


  $templateCache.put('updata.html',
    "<!DOCTYPE html>\n" +
    "<html lang=\"en\">\n" +
    "<head>\n" +
    "    <meta charset=\"UTF-8\">\n" +
    "    <title>Title</title>\n" +
    "    <script>\n" +
    "        (function (window) {\n" +
    "            //判断web 还是 app\n" +
    "            window.trueWeb = trueWeb;\n" +
    "            function trueWeb() {\n" +
    "                var url = window.location.href;\n" +
    "                url = url.split(':');\n" +
    "                if (url[0] === 'http') {\n" +
    "                    return true;\n" +
    "                }\n" +
    "            }\n" +
    "\n" +
    "        })(window);\n" +
    "    </script>\n" +
    "    <script src=\"../../dist/js/init.js\"></script>\n" +
    "    <script src=\"../../dist/js/updata.js\"></script>\n" +
    "</head>\n" +
    "<body>\n" +
    "<h1>\n" +
    "\n" +
    "    upData\n" +
    "</h1>\n" +
    "</body>\n" +
    "</html>"
  );

}]);
