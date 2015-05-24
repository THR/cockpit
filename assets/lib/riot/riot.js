/* Riot v2.1.x, @license MIT, (c) 2015 Muut Inc. + contributors */
(function(t){function K(a){var b={val:a};a=a.split(/\s+in\s+/);a[1]&&(b.val=n(0)+a[1],a=a[0].slice(n(0).length).trim().split(/,\s*/),b.key=a[0],b.pos=a[1]);return b}function D(a,b,e){var h={};h[a.key]=b;a.pos&&(h[a.pos]=e);return h}function P(a,b,e){function h(c,d,a){f.splice(c,0,d);l.splice(c,0,a)}a.removeAttribute("each");var c=a.outerHTML,d=a.previousSibling,g=a.parentNode,f=[],l=[],y;e=K(e);b.one("update",function(){g.removeChild(a)}).one("premount",function(){g.stub&&(g=b.root)}).on("update",
function(){var a=v(e.val,b);if(a){if(!Array.isArray(a)){var m=JSON.stringify(a);if(m==y)return;y=m;k(l,function(c){c.unmount()});f=[];l=[];a=Object.keys(a).map(function(c){return D(e,c,a[c])})}k(f,function(c){if(c instanceof Object){if(-1<a.indexOf(c))return}else{var d=z(a,c),g=z(f,c);if(d.length>=g.length)return}c=f.indexOf(c);if(d=l[c])return d.unmount(),f.splice(c,1),l.splice(c,1),!1});var n=[].indexOf.call(g.childNodes,d)+1;k(a,function(d,m){var k=a.indexOf(d,m),r=f.indexOf(d,m);0>k&&(k=a.lastIndexOf(d,
m));0>r&&(r=f.lastIndexOf(d,m));if(!(d instanceof Object)){var p=z(a,d),X=z(f,d);p.length>X.length&&(r=-1)}p=g.childNodes;if(0>r){if(!y&&e.key)var Y=D(e,d,k);r=new F({tmpl:c},{before:p[n+k],parent:b,root:g,item:Y||d});r.mount();h(k,d,r);return!0}e.pos&&l[r][e.pos]!=k&&(l[r].one("update",function(c){c[e.pos]=k}),l[r].update());if(k!=r)return g.insertBefore(p[n+r],p[n+(k>r?k+1:k)]),h(k,f.splice(r,1)[0],l.splice(r,1)[0])});f=a.slice()}}).one("updated",function(){x(g,function(c){k(c.attributes,function(d){/^(name|id)$/.test(d.name)&&
(b[d.value]=c)})})})}function R(a,b,e){x(a,function(a){if(1==a.nodeType){a.isLoop=0;a.parentNode&&a.parentNode.isLoop&&(a.isLoop=1);a.getAttribute("each")&&(a.isLoop=1);var c=G(a);if(c&&!a.isLoop){for(var d=new F(c,{root:a,parent:b},a.innerHTML),g=a.getAttribute("name"),c=g&&0>g.indexOf(n(0))?g:c.name,g=b,f;!G(g.root)&&g.parent;)g=g.parent;d.parent=g;(f=g.tags[c])?(Array.isArray(f)||(g.tags[c]=[f]),g.tags[c].push(d)):g.tags[c]=d;a.innerHTML="";e.push(d)}a.isLoop||k(a.attributes,function(c){/^(name|id)$/.test(c.name)&&
(b[c.value]=a)})}})}function L(a,b,e){function h(c,a,g){0<=a.indexOf(n(0))&&e.push(u({dom:c,expr:a},g))}x(a,function(c){var a=c.nodeType;3==a&&"STYLE"!=c.parentNode.tagName&&h(c,c.nodeValue);if(1==a){if(a=c.getAttribute("each"))return P(c,b,a),!1;k(c.attributes,function(a){var d=a.name,b=d.split("__")[1];h(c,a.value,{attr:b||d,bool:b});if(b)return c.removeAttribute(d),!1});if(G(c))return!1}})}function F(a,b,e){function h(){k(m.attributes,function(a){g[a.name]=v(a.value,l||d)});k(Object.keys(Q),function(a){g[a]=
v(Q[a],l||d)})}function c(a){k(W,function(c){c[a?"mount":"unmount"]()});if(l){var c=a?"on":"off";l[c]("update",d.update)[c]("unmount",d.unmount)}}var d=p.observable(this),g=S(b.opts)||{},f=T(a.tmpl),l=b.parent,y=[],W=[],m=b.root,q=b.item,E=a.fn,w=m.tagName.toLowerCase(),Q={},r,t=/([\w\-]+)\s?=\s?['"]([^'"]+)["']/gim;E&&m._tag&&m._tag.unmount(!0);a.attrs&&(a=a.attrs.match(t),k(a,function(a){a=a.split(/\s?=\s?/);m.setAttribute(a[0],a[1].replace(/['"]/g,""))}));m._tag=this;this._id=H(~~((new Date).getTime()*
Math.random()));u(this,{parent:l,root:m,opts:g,tags:{}},q);k(m.attributes,function(a){var c=a.value;n(/\{.*\}/).test(c)&&(Q[a.name]=c)});!f.innerHTML||/select/.test(w)||/tbody/.test(w)||/tr/.test(w)||(f.innerHTML=f.innerHTML.replace(/<(yield)\/?>(<\/\1>)?/gim,e||""));this.update=function(a,c){u(d,a,q);h();d.trigger("update",q);I(y,d,q);d.trigger("updated")};this.mixin=function(){k(arguments,function(a){a="string"==typeof a?p.mixin(a):a;k(Object.keys(a),function(c){"init"!=c&&(d[c]="function"==typeof a[c]?
a[c].bind(d):a[c])});a.init&&a.init.bind(d)()})};this.mount=function(){h();E&&E.call(d,g);c(!0);L(f,d,y);d.parent||d.update();d.trigger("premount");if(E)for(;f.firstChild;)m.appendChild(f.firstChild);else r=f.firstChild,m.insertBefore(r,b.before||null);m.stub&&(d.root=m=l.root);if(d.parent)d.parent.one("mount",function(){d.trigger("mount")});else d.trigger("mount")};this.unmount=function(a){var f=E?m:r,b=f.parentNode;if(b){if(l)Array.isArray(l.tags[w])?k(l.tags[w],function(a,c){a._id==d._id&&l.tags[w].splice(c,
1)}):l.tags[w]=void 0;else for(;f.firstChild;)f.removeChild(f.firstChild);a||b.removeChild(f)}d.trigger("unmount");c();d.off("*");m._tag=null};R(f,this,W)}function U(a,b,e,h,c){e[a]=function(a){a=a||t.event;a.which=a.which||a.charCode||a.keyCode;a.target=a.target||a.srcElement;a.currentTarget=e;a.item=c;!0===b.call(h,a)||/radio|check/.test(e.type)||(a.preventDefault&&a.preventDefault(),a.returnValue=!1);a.preventUpdate||(c?h.parent:h).update()}}function I(a,b,e){k(a,function(a,c){var d=a.dom,g=a.attr,
f=v(a.expr,b),l=a.dom.parentNode;null==f&&(f="");l&&"TEXTAREA"==l.tagName&&(f=f.replace(/riot-/g,""));if(a.value!==f){a.value=f;if(!g)return d.nodeValue=f.toString();d.removeAttribute(g);if("function"==typeof f)U(g,f,d,b,e);else if("if"==g)if(g=a.stub,f)g&&(f=g.parentNode)&&(f.insertBefore(d,g),f.removeChild(g));else{if(g=a.stub=g||document.createTextNode(""),f=d.parentNode)f.insertBefore(g,d),f.removeChild(d)}else if(/^(show|hide)$/.test(g))"hide"==g&&(f=!f),d.style.display=f?"":"none";else if("value"==
g)d.value=f;else if("riot-"==g.slice(0,5))g=g.slice(5),f?d.setAttribute(g,f):d.removeAttribute(g);else{if(a.bool){d[g]=f;if(!f)return;f=g}"object"!=typeof f&&d.setAttribute(g,f)}}})}function k(a,b){for(var e=0,h=(a||[]).length,c;e<h;e++)c=a[e],null!=c&&!1===b(c,e)&&e--;return a}function H(a){return(a^a>>31)-(a>>31)}function u(a,b,e){b&&k(Object.keys(b),function(e){a[e]=b[e]});return e?u(a,e):a}function M(){if(t){var a=navigator.userAgent,b=a.indexOf("MSIE ");return 0<b?parseInt(a.substring(b+5,a.indexOf(".",
b)),10):0}}function N(a,b){var e=document.createElement("option"),h=b.match(/value=[\"'](.+?)[\"']/),c=b.match(/selected=[\"'](.+?)[\"']/);e.innerHTML=b;h&&(e.value=h[1]);c&&e.setAttribute("riot-selected",c[1]);a.appendChild(e)}function O(a,b,e){var h=document.createElement("div");h.innerHTML="<table>"+b+"</table>";/td|th/.test(e)?a.appendChild(h.firstChild.firstChild.firstChild.firstChild):a.appendChild(h.firstChild.firstChild.firstChild)}function T(a){var b=a.trim().slice(1,3).toLowerCase(),e=/td|th/.test(b)?
"tr":"tr"==b?"tbody":"div",h=document.createElement(e);h.stub=!0;"op"===b&&A&&10>A?N(h,a):("tbody"===e||"tr"===e)&&A&&10>A?O(h,a,b):h.innerHTML=a;return h}function x(a,b){if(a)if(!1===b(a))x(a.nextSibling,b);else for(a=a.firstChild;a;)x(a,b),a=a.nextSibling}function J(a,b){b=b||document;return b.querySelectorAll(a)}function z(a,b){return a.filter(function(a){return a===b})}function S(a){function b(){}b.prototype=a;return new b}function M(){if(t){var a=navigator.userAgent,b=a.indexOf("MSIE ");return 0<
b?parseInt(a.substring(b+5,a.indexOf(".",b)),10):0}}function O(a,b,e){var h=document.createElement("div");e=/td|th/.test(e)?3:2;h.innerHTML="<table>"+b+"</table>";for(b=h.firstChild;e--;)b=b.firstChild;a.appendChild(b)}function N(a,b){var e=document.createElement("option"),h=/value=[\"'](.+?)[\"']/,c=/selected=[\"'](.+?)[\"']/,h=b.match(h),c=b.match(c);e.innerHTML=b;h&&(e.value=h[1]);c&&e.setAttribute("riot-selected",c[1]);a.appendChild(e)}function G(a){return B[a.getAttribute("riot-tag")||a.tagName.toLowerCase()]}
function V(a,b,e){var h=B[b];b=a.innerHTML;a.innerHTML="";h&&a&&(h=new F(h,{root:a,opts:e},b));if(h&&h.mount)return h.mount(),C.push(h),h.on("unmount",function(){C.splice(C.indexOf(h),1)})}var p={version:"WIP",settings:{},observable:function(a){a=a||{};var b={},e=0;a.on=function(h,c){"function"==typeof c&&(c._id="undefined"==typeof c._id?e++:c._id,h.replace(/\S+/g,function(a,g){(b[a]=b[a]||[]).push(c);c.typed=0<g}));return a};a.off=function(e,c){"*"==e?b={}:e.replace(/\S+/g,function(a){if(c){a=b[a];
for(var g=0,f;f=a&&a[g];++g)f._id==c._id&&(a.splice(g,1),g--)}else b[a]=[]});return a};a.one=function(b,c){function d(){a.off(b,d);c.apply(a,arguments)}return a.on(b,d)};a.trigger=function(e){for(var c=[].slice.call(arguments,1),d=b[e]||[],g=0,f;f=d[g];++g)f.busy||(f.busy=1,f.apply(a,f.typed?[e].concat(c):c),d[g]!==f&&g--,f.busy=0);b.all&&"all"!=e&&a.trigger.apply(a,["all",e].concat(c));return a};return a}};p.mixin=function(){var a={};return function(b,e){if(e)a[b]=e;else return a[b]}}();(function(a,
b,e){function h(a){return a.split("/")}function c(a){a.type&&(a=d.href.split("#")[1]||"");a!=l&&(g.trigger.apply(null,["H"].concat(h(a))),l=a)}if(e){var d=e.location,g=a.observable(),f=!1,l;a=a.route=function(a){if(a[0])d.hash=a,c(a);else g.on("H",a)};a.exec=function(a){a.apply(null,h(d.href.split("#")[1]||""))};a.parser=function(a){h=a};a.stop=function(){f&&(e.removeEventListener?e.removeEventListener(b,c,!1):e.detachEvent("on"+b,c),g.off("*"),f=!1)};a.start=function(){f||(e.addEventListener?e.addEventListener(b,
c,!1):e.attachEvent("on"+b,c),f=!0)};a.start()}})(p,"hashchange",t);var n=function(a){var b,e,h,c=/[{}]/g;return function(d){var g=p.settings.brackets||a;b!==g&&(b=g,h=g.split(" "),e=h.map(function(a){return a.replace(/(?=.)/g,"\\")}));return d instanceof RegExp?g===a?d:new RegExp(d.source.replace(c,function(a){return e[~~("}"===a)]}),d.global?"g":""):h[d]}}("{ }"),v=function(){function a(a,d){a=(a||n(0)+n(1)).replace(n(/\\{/g),"\ufff0").replace(n(/\\}/g),"\ufff1");d=h(a,c(a,n(/{/),n(/}/)));return new Function("d",
"return "+(d[0]||d[2]||d[3]?"["+d.map(function(a,c){return c%2?b(a,!0):'"'+a.replace(/\n/g,"\\n").replace(/"/g,'\\"')+'"'}).join(",")+'].join("")':b(d[1])).replace(/\uFFF0/g,n(0)).replace(/\uFFF1/g,n(1))+";")}function b(a,d){a=a.replace(/\n/g," ").replace(n(/^[{ ]+|[ }]+$|\/\*.+?\*\//g),"");return/^\s*[\w- "']+ *:/.test(a)?"["+c(a,/["' ]*[\w- ]+["' ]*:/,/,(?=["' ]*[\w- ]+["' ]*:)|}|$/).map(function(a){return a.replace(/^[ "']*(.+?)[ "']*: *(.+?),? *$/,function(a,c,d){return d.replace(/[^&|=!><]+/g,
e)+'?"'+c+'":"",'})}).join("")+'].join(" ").trim()':e(a,d)}function e(a,c){return(a=a.trim())?"(function(v){try{v="+(a.replace(g,function(a,c,d){return d?"(d."+d+"===undefined?"+("undefined"==typeof t?"global.":"window.")+d+":d."+d+")":a})||"x")+"}catch(e){}finally{return "+(!0===c?'!v&&v!==0?"":v':"v")+"}}).call(d)":""}function h(a,c){var d=[];c.map(function(c,b){b=a.indexOf(c);d.push(a.slice(0,b),c);a=a.slice(b+c.length)});return d.concat(a)}function c(a,c,d){var b,g=0,e=[];a.replace(new RegExp("("+
c.source+")|("+d.source+")","g"),function(c,d,h,l){!g&&d&&(b=l);(g+=d?1:-1)||null==h||e.push(a.slice(b,l+h.length))});return e}var d={},g=/(['"\/]).*?[^\\]\1|\.\w*|\w*:|\b(?:(?:new|typeof|in|instanceof) |(?:this|true|false|null|undefined)\b|function *\()|([a-z_$]\w*)/gi;return function(c,b){return c&&(d[c]=d[c]||a(c))(b)}}(),A=M(),C=[],B={},q;p.tag=function(a,b,e,h,c){"function"==typeof h&&(c=h,/^[\w\-]+\s?=/.test(e)?(h=e,e=""):h="");"function"==typeof e?c=e:e&&(q=q||document.createElement("style"),
document.head&&(q.styleSheet?q.styleSheet.cssText+=e:q.innerHTML+=e,q._rendered||(q.styleSheet?document.body.appendChild(q):document.head.appendChild(q)),q._rendered=!0));B[a]={name:a,tmpl:b,attrs:h,fn:c};return a};p.mount=function(a,b,e){function h(a){b&&!a.getAttribute("riot-tag")&&a.setAttribute("riot-tag",b);var c=b||a.getAttribute("riot-tag")||a.tagName.toLowerCase();(a=V(a,c,e))&&f.push(a)}var c,d=function(){var a=Object.keys(B),c=a.join(", ");k(a,function(a){c+=', *[riot-tag="'+a.trim()+'"]'});
return c},g,f=[];"object"==typeof b&&(e=b,b=0);"string"==typeof a?("*"==a?a=g=d():a.split(",").map(function(c){a+=', *[riot-tag="'+c.trim()+'"]'}),c=J(a)):c=a;if("*"==b){b=g||d();if(c.tagName)c=J(b,c);else{var l=[];k(c,function(a){l=J(b,a)});c=l}b=0}c.tagName?h(a):k(c,h);return f};p.update=function(){return k(C,function(a){a.update()})};p.mountTo=p.mount;p.util={brackets:n,tmpl:v};"object"===typeof exports?module.exports=p:"function"===typeof define&&define.amd?define(function(){return p}):t.riot=
p})("undefined"!=typeof window?window:void 0);
(function(t){function K(a,d,b,f,e){return"riot.tag('"+a+"', '"+d+"'"+(b?", '"+b+"'":"")+(f?", '"+f.replace(/'/g,"\\'")+"'":"")+", function(opts) {"+e+"\n});"}function D(a,d,b){var f=riot.util.brackets;a=a.replace(f(J),'="$1"$2');a=d.whitespace?a.replace(/\n/g,"\\n"):a.replace(/\s+/g," ");a=a.trim().replace(A,"");a=a.replace(z,function(a,c,d,b){0<=b.indexOf(f(0))&&(c=c.toLowerCase(),0<=T.indexOf(c)?c="riot-"+c:0<=N.indexOf(c)&&(c="__"+c));return c+'="'+b+'"'});d.expr&&(a=a.replace(f(S),function(a,
c){var e=L(c,d,b).trim().replace(/\r?\n|\r/g,"").trim();";"==e.slice(-1)&&(e=e.slice(0,-1));return f(0)+e+f(1)}));a=a.replace(C,function(a,c,d){a="<"+c+(d?" "+d.trim():"")+">";-1==O.indexOf(c.toLowerCase())&&(a+="</"+c+">");return a});a=a.replace(/'/g,"\\'");a=a.replace(f(/\\{|\\}/g),"\\$&");d.compact&&(a=a.replace(/> </g,"><"));return a}function P(a){a=a.replace(B,"").replace(q,"");var d=a.split("\n"),b="";d.forEach(function(a,c){var e=a.trim();if("}"!=e[0]&&0<e.indexOf("(")&&-1==e.indexOf("function")){var h=
/[{}]/.exec(e.slice(-1)),m=h&&/(\s+)([\w]+)\s*\(([\w,\s]*)\)\s*\{/.exec(a);m&&!/^(if|while|switch|for|catch)$/.test(m[2])&&(d[c]=m[1]+"this."+m[2]+" = function("+m[3]+") {","}"==h[0]?d[c]+=" "+e.slice(m[0].length-1,-1)+"}.bind(this)":b=m[1])}a.slice(0,b.length+1)==b+"}"&&(d[c]=b+"}.bind(this);",b="")});return d.join("\n")}function R(a,d,b){return d.replace(v,"").replace(n,function(d,b,e){return b+" "+e.split(/\s*,\s*/g).map(function(d){var b=d.replace(/:scope\s*/,"");return"@"==d[0]?d:a+" "+b+', [riot-tag="'+
a+'"] '+b}).join(",")}).trim()}function L(a,d,b){var e=d.parser||(b?riot.parsers.js[b]:P);if(!e)throw Error('Parser not found "'+b+'"');return e(a,d)}function F(a,d){var b=riot.parsers.html[a];if(!b)throw Error('Template parser not found "'+a+'"');return b(d)}function U(a,d,b){"scoped-css"==b?a=R(d,a):riot.parsers.css[b]&&(a=riot.parsers.css[b](d,a));return a.replace(/\s+/g," ").replace(/\\/g,"\\\\").replace(/'/g,"\\'").trim()}function I(a,d){d=d||{};d.brackets&&(riot.settings.brackets=d.brackets);
d.template&&(a=F(d.template,a));a=a.replace(x,function(a,c,b){return K(c,D(b,d),"","","")});return a.replace(G,function(a,c,b,e,h){e=e||"";var k=d.type;h.trim()||(e=e.replace(V,function(a,c,d,b){d&&(k=d.replace("text/",""));h=b;return""}));var n="css",q="";e=e.replace(p,function(a,c,d,b){c&&"scoped"==c.trim()?n="scoped-css":d&&(n=d.replace("text/",""));q=b;return""});return K(c,D(e,d,k),U(q,c,n),b,L(h,d,k))})}function k(a,d){var b=new XMLHttpRequest;b.onreadystatechange=function(){4==b.readyState&&
200==b.status&&d(b.responseText)};b.open("GET",a,!0);b.send("")}function H(a){var b=/[ \t]+/.exec(a);b&&(a=a.replace(new RegExp("^"+b[0],"gm"),""));return a}function u(c){var b=a.createElement("script"),e=a.documentElement;b.text=I(c);e.appendChild(b);e.removeChild(b)}function M(c){function d(){b.trigger("ready");e=!0;c&&c()}var g=a.querySelectorAll('script[type="riot/tag"]'),f=g.length;f?[].map.call(g,function(a){function c(a){u(a);f--;f||d()}var b=a.getAttribute("src");return b?k(b,c):c(H(a.innerHTML))}):
d()}riot.parsers={html:{},css:{},js:{coffee:function(a){return CoffeeScript.compile(a,{bare:!0})},es6:function(a){return babel.transform(a,{blacklist:["useStrict"]}).code},none:function(a){return a}}};var N="allowfullscreen async autofocus autoplay checked compact controls declare default defaultchecked defaultmuted defaultselected defer disabled draggable enabled formnovalidate hidden indeterminate inert ismap itemscope loop multiple muted nohref noresize noshade novalidate nowrap open pauseonexit readonly required reversed scoped seamless selected sortable spellcheck translate truespeed typemustmatch visible".split(" "),
O="area base br col command embed hr img input keygen link meta param source track wbr".split(" "),T=["style","src","d"],x=/^<([\w\-]+)>(.*)<\/\1>/gim,J=/=({[^}]+})([\s\/\>])/g,z=/([\w\-]+)=(["'])([^\2]+?)\2/g,S=/{\s*([^}]+)\s*}/g,G=/^<([\w\-]+)\s?([^>]*)>([^\x00]*[\w\/}"']>$)?([^\x00]*?)^<\/\1>/gim,V=/<script(\s+type=['"]?([^>'"]+)['"]?)?>([^\x00]*?)<\/script>/gm,p=/<style(\s+type=['"]?([^>'"]+)['"]?|\s+scoped)?>([^\x00]*?)<\/style>/gm,n=/(^|\}|\{)\s*([^\{\}]+)\s*(?=\{)/g,v=/\/\*[^\x00]*?\*\//gm,
A=/\x3c!--.*?--\x3e/g,C=/<([\w\-]+)([^>]*)\/\s*>/g,B=/^\s*\/\/.*$/gm,q=/\/\*[^\x00]*?\*\//gm,a=t.document,b,e;riot.compile=function(a,d){if("string"==typeof a){if("<"==a.trim()[0]){var g=H(I(a));d||u(g);return g}return k(a,function(a){var b=H(I(a));u(b);d&&d(b,a)})}"function"!=typeof a&&(a=void 0);if(e)return a&&a();b?a&&b.on("ready",a):(b=riot.observable(),M(a))};var h=riot.mount;riot.mount=function(a,b,e){var f;riot.compile(function(){f=h(a,b,e)});return f};riot.mountTo=riot.mount})(this);