ector("script["+t+"]");if(e)return e.getAttribute(t)}(a))||"false"!==e&&("true"===e||e);null!=i&&(H[r]=i)})}var D=K({},{familyPrefix:b,replacementClass:y,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0},H);D.autoReplaceSvg||(D.observeMutations=!1);var J=K({},D);g.FontAwesomeConfig=J;var U=g||{};U[h]||(U[h]={}),U[h].styles||(U[h].styles={}),U[h].hooks||(U[h].hooks={}),U[h].shims||(U[h].shims=[]);var W=U[h],q=[],X=!1;function B(t){p&&(X?setTimeout(t,0):q.push(t))}p&&((X=(v.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(v.readyState))||v.addEventListener("DOMContentLoaded",function t(){v.removeEventListener("DOMContentLoaded",t),X=1,q.map(function(t){return t()})}));var V,Q="pending",Z="settled",$="fulfilled",tt="rejected",et=function(){},nt="undefined"!=typeof global&&void 0!==global.process&&"function"==typeof global.process.emit,at="undefined"==typeof setImmediate?setTimeout:setImmediate,rt=[];function it(){for(var t=0;t<rt.length;t++)rt[t][0](rt[t][1]);V=!(rt=[])}function ot(t,e){rt.push([t,e]),V||(V=!0,at(it,0))}function ct(t){var e=t.owner,n=e._state,a=e._data,r=t[n],i=t.then;if("function"==typeof r){n=$;try{a=r(a)}catch(t){ut(i,t)}}st(i,a)||(n===$&&lt(i,a),n===tt&&ut(i,a))}function st(e,n){var a;try{if(e===n)throw new TypeError("A promises callback cannot return that same promise.");if(n&&("function"==typeof n||"object"===i(n))){var t=n.then;if("function"==typeof t)return t.call(n,function(t){a||(a=!0,n===t?ft(e,t):lt(e,t))},function(t){a||(a=!0,ut(e,t))}),!0}}catch(t){return a||ut(e,t),!0}return!1}function lt(t,e){t!==e&&st(t,e)||ft(t,e)}function ft(t,e){t._state===Q&&(t._state=Z,t._data=e,ot(mt,t))}function ut(t,e){t._state===Q&&(t._state=Z,t._data=e,ot(pt,t))}function dt(t){t._then=t._then.forEach(ct)}function mt(t){t._state=$,dt(t)}function pt(t){t._state=tt,dt(t),!t._handled&&nt&&global.process.emit("unhandledRejection",t._data,t)}function ht(t){global.process.emit("rejectionHandled",t)}function gt(t){if("function"!=typeof t)throw new TypeError("Promise resolver "+t+" is not a function");if(this instanceof gt==!1)throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");this._then=[],function(t,e){function n(t){ut(e,t)}try{t(function(t){lt(e,t)},n)}catch(t){n(t)}}(t,this)}gt.prototype={constructor:gt,_state:Q,_then:null,_data:void 0,_handled:!1,then:function(t,e){var n={owner:this,then:new this.constructor(et),fulfilled:t,rejected:e};return!e&&!t||this._handled||(this._handled=!0,this._state===tt&&nt&&ot(ht,this)),this._state===$||this._state===tt?ot(ct,n):this._then.push(n),n.then},catch:function(t){return this.then(null,t)}},gt.all=function(c){if(!Array.isArray(c))throw new TypeError("You must pass an array to Promise.all().");return new gt(function(n,t){var a=[],r=0;function e(e){return r++,function(t){a[e]=t,--r||n(a)}}for(var i,o=0;o<c.length;o++)(i=c[o])&&"function"==typeof i.then?i.then(e(o),t):a[o]=i;r||n(a)})},gt.race=function(r){if(!Array.isArray(r))throw new TypeError("You must pass an array to Promise.race().");return new gt(function(t,e){for(var n,a=0;a<r.length;a++)(n=r[a])&&"function"==typeof n.then?n.then(t,e):t(n)})},gt.resolve=function(e){return e&&"object"===i(e)&&e.constructor===gt?e:new gt(function(t){t(e)})},gt.reject=function(n){return new gt(function(t,e){e(n)})};var vt="function"==typeof Promise?Promise:gt,bt=A,yt={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function wt(t){if(t&&p){var e=v.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=t;for(var n=v.head.childNodes,a=null,r=n.length-1;-1<r;r--){var i=n[r],o=(i.tagName||"").toUpperCase();-1<["STYLE","LINK"].indexOf(o)&&(a=i)}return v.head.insertBefore(e,a),t}}var xt="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function kt(){for(var t=12,e="";0<t--;)e+=xt[62*Math.random()|0];return e}function At(t){for(var e=[],n=(t||[]).length>>>0;n--;)e[n]=t[n];return e}function Ct(t){return t.classList?At(t.classList):(t.getAttribute("class")||"").split(" ").filter(function(t){return t})}function Ot(t,e){var n,a=e.split("-"),r=a[0],i=a.slice(1).join("-");return r!==t||""===i||(n=i,~F.indexOf(n))?null:i}function St(t){return"".concat(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Pt(n){return Object.keys(n||{}).reduce(function(t,e){return t+"".concat(e,": ").concat(n[e],";")},"")}function Nt(t){return t.size!==yt.size||t.x!==yt.x||t.y!==yt.y||t.rotate!==yt.rotate||t.flipX||t.flipY}function Mt(t){var e=t.transform,n=t.containerWidth,a=t.iconWidth,r={transform:"translate(".concat(n/2," 256)")},i="translate(".concat(32*e.x,", ").concat(32*e.y,") "),o="scale(".concat(e.size/16*(e.flipX?-1:1),", ").concat(e.size/16*(e.flipY?-1:1),") "),c="rotate(".concat(e.rotate," 0 0)");return{outer:r,inner:{transform:"".concat(i," ").concat(o," ").concat(c)},path:{transform:"translate(".concat(a/2*-1," -256)")}}}var zt={x:0,y:0,width:"100%",height:"100%"};function Et(t){var e=!(1<arguments.length&&void 0!==arguments[1])||arguments[1];return t.attributes&&(t.attributes.fill||e)&&(t.attributes.fill="black"),t}function jt(t){var e=t.icons,n=e.main,a=e.mask,r=t.prefix,i=t.iconName,o=t.transform,c=t.symbol,s=t.title,l=t.extra,f=t.watchable,u=void 0!==f&&f,d=a.found?a:n,m=d.width,p=d.height,h="fa-w-".concat(Math.ceil(m/p*16)),g=[J.replacementClass,i?"".concat(J.familyPrefix,"-").concat(i):"",h].filter(function(t){return-1===l.classes.indexOf(t)}).concat(l.classes).join(" "),v={children:[],attributes:K({},l.attributes,{"data-prefix":r,"data-icon":i,class:g,role:l.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(m," ").concat(p)})};u&&(v.attributes[G]=""),s&&v.children.push({tag:"title",attributes:{id:v.attributes["aria-labelledby"]||"title-".concat(kt())},children:[s]});var b,y,w,x,k,A,C,O,S,P,N,M,z,E,j,L,R,_,T,I,Y,F,H,D,U,W,q=K({},v,{prefix:r,iconName:i,main:n,mask:a,transform:o,symbol:c,styles:l.styles}),X=a.found&&n.found?(w=(b=q).children,x=b.attributes,k=b.main,A=b.mask,C=b.transform,O=k.width,S=k.icon,P=A.width,N=A.icon,M=Mt({transform:C,containerWidth:P,iconWidth:O}),z={tag:"rect",attributes:K({},zt,{fill:"white"})},E=S.children?{children:S.children.map(Et)}:{},j={tag:"g",attributes:K({},M.inner),children:[Et(K({tag:S.tag,attributes:K({},S.attributes,M.path)},E))]},L={tag:"g",attributes:K({},M.outer),children:[j]},R="mask-".concat(kt()),_="clip-".concat(kt()),T={tag:"mask",attributes:K({},zt,{id:R,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[z,L]},I={tag:"defs",children:[{tag:"clipPath",attributes:{id:_},children:(y=N,"g"===y.tag?y.children:[y])},T]},w.push(I,{tag:"rect",attributes:K({fill:"currentColor","clip-path":"url(#".concat(_,")"),mask:"url(#".concat(R,")")},zt)}),{children:w,attributes:x}):function(t){var e=t.children,n=t.attributes,a=t.main,r=t.transform,i=Pt(t.styles);if(0<i.length&&(n.style=i),Nt(r)){var o=Mt({transform:r,containerWidth:a.width,iconWidth:a.width});e.push({tag:"g",attributes:K({},o.outer),children:[{tag:"g",attributes:K({},o.inner),children:[{tag:a.icon.tag,children:a.icon.children,attributes:K({},a.icon.attributes,o.path)}]}]})}else e.push(a.icon);return{children:e,attributes:n}}(q),B=X.children,V=X.attributes;return q.children=B,q.attributes=V,c?(F=(Y=q).prefix,H=Y.iconName,D=Y.children,U=Y.attributes,W=Y.symbol,[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:K({},U,{id:!0===W?"".concat(F,"-").concat(J.familyPrefix,"-").concat(H):W}),children:D}]}]):function(t){var e=t.children,n=t.main,a=t.mask,r=t.attributes,i=t.styles,o=t.transform;if(Nt(o)&&n.found&&!a.found){var c=n.width/n.height/2,s=.5;r.style=Pt(K({},i,{"transform-origin":"".concat(c+o.x/16,"em ").concat(s+o.y/16,"em")}))}return[{tag:"svg",attributes:r,children:e}]}(q)}function Lt(t){var e=t.content,n=t.width,a=t.height,r=t.transform,i=t.title,o=t.extra,c=t.watchable,s=void 0!==c&&c,l=K({},o.attributes,i?{title:i}:{},{class:o.classes.join(" ")});s&&(l[G]="");var f,u,d,m,p,h,g,v,b,y=K({},o.styles);Nt(r)&&(y.transform=(u=(f={transform:r,startCentered:!0,width:n,height:a}).transform,d=f.width,m=void 0===d?A:d,p=f.height,h=void 0===p?A:p,g=f.startCentered,b="",b+=(v=void 0!==g&&g)&&k?"translate(".concat(u.x/bt-m/2,"em, ").concat(u.y/bt-h/2,"em) "):v?"translate(calc(-50% + ".concat(u.x/bt,"em), calc(-50% + ").concat(u.y/bt,"em)) "):"translate(".concat(u.x/bt,"em, ").concat(u.y/bt,"em) "),b+="scale(".concat(u.size/bt*(u.flipX?-1:1),", ").concat(u.size/bt*(u.flipY?-1:1),") "),b+="rotate(".concat(u.rotate,"deg) ")),y["-webkit-transform"]=y.transform);var w=Pt(y);0<w.length&&(l.style=w);var x=[];return x.push({tag:"span",attributes:l,children:[e]}),i&&x.push({tag:"span",attributes:{class:"sr-only"},children:[i]}),x}var Rt=function(){},_t=J.measurePerformance&&f&&f.mark&&f.measure?f:{mark:Rt,measure:Rt},Tt='FA "5.11.1"',It=function(t){_t.mark("".concat(Tt," ").concat(t," ends")),_t.measure("".concat(Tt," ").concat(t),"".concat(Tt," ").concat(t," begins"),"".concat(Tt," ").concat(t," ends"))},Yt={begin:function(t){return _t.mark("".concat(Tt," ").concat(t," begins")),function(){return It(t)}},end:It},Ft=function(t,e,n,a){var r,i,o,c,s,l=Object.keys(t),f=l.length,u=void 0!==a?(c=e,s=a,function(t,e,n,a){return c.call(s,t,e,n,a)}):e;for(o=void 0===n?(r=1,t[l[0]]):(r=0,n);r<f;r++)o=u(o,t[i=l[r]],i,t);return o};function Ht(t){for(var e="",n=0;n<t.length;n++){e+=("000"+t.charCodeAt(n).toString(16)).slice(-4)}return e}var Dt=W.styles,Ut=W.shims,Wt={},qt={},Xt={},Bt=function(){var t=function(a){return Ft(Dt,function(t,e,n){return t[n]=Ft(e,a,{}),t},{})};Wt=t(function(t,e,n){return e[3]&&(t[e[3]]=n),t}),qt=t(function(e,t,n){var a=t[2];return e[n]=n,a.forEach(function(t){e[t]=n}),e});var i="far"in Dt;Xt=Ft(Ut,function(t,e){var n=e[0],a=e[1],r=e[2];return"far"!==a||i||(a="fas"),t[n]={prefix:a,iconName:r},t},{})};function Vt(t,e){return(Wt[t]||{})[e]}Bt();var Kt=W.styles,Gt=function(){return{prefix:null,iconName:null,rest:[]}};function Jt(t){return t.reduce(function(t,e){var n=Ot(J.familyPrefix,e);if(Kt[e])t.prefix=e;else if(J.autoFetchSvg&&-1<["fas","far","fal","fad","fab","fa"].indexOf(e))t.prefix=e;else if(n){var a="fa"===t.prefix?Xt[n]||{prefix:null,iconName:null}:{};t.iconName=a.iconName||n,t.prefix=a.prefix||t.prefix}else e!==J.replacementClass&&0!==e.indexOf("fa-w-")&&t.rest.push(e);return t},Gt())}function Qt(t,e,n){if(t&&t[e]&&t[e][n])return{prefix:e,iconName:n,icon:t[e][n]}}function Zt(t){var n,e=t.tag,a=t.attributes,r=void 0===a?{}:a,i=t.children,o=void 0===i?[]:i;return"string"==typeof t?St(t):"<".concat(e," ").concat((n=r,Object.keys(n||{}).reduce(function(t,e){return t+"".concat(e,'="').concat(St(n[e]),'" ')},"").trim()),">").concat(o.map(Zt).join(""),"</").concat(e,">")}var $t=function(){};function te(t){return"string"==typeof(t.getAttribute?t.getAttribute(G):null)}var ee={replace:function(t){var e=t[0],n=t[1].map(function(t){return Zt(t)}).join("\n");if(e.parentNode&&e.outerHTML)e.outerHTML=n+(J.keepOriginalSource&&"svg"!==e.tagName.toLowerCase()?"\x3c!-- ".concat(e.outerHTML," --\x3e"):"");else if(e.parentNode){var a=document.createElement("span");e.parentNode.replaceChild(a,e),a.outerHTML=n}},nest:function(t){var e=t[0],n=t[1];if(~Ct(e).indexOf(J.replacementClass))return ee.replace(t);var a=new RegExp("".concat(J.familyPrefix,"-.*"));delete n[0].attributes.style,delete n[0].attributes.id;var r=n[0].attributes.class.split(" ").reduce(function(t,e){return e===J.replacementClass||e.match(a)?t.toSvg.push(e):t.toNode.push(e),t},{toNode:[],toSvg:[]});n[0].attributes.class=r.toSvg.join(" ");var i=n.map(function(t){return Zt(t)}).join("\n");e.setAttribute("class",r.toNode.join(" ")),e.setAttribute(G,""),e.innerHTML=i}};function ne(t){t()}function ae(n,t){var a="function"==typeof t?t:$t;if(0===n.length)a();else{var e=ne;J.mutateApproach===P&&(e=g.requestAnimationFrame||ne),e(function(){var t=!0===J.autoReplaceSvg?ee.replace:ee[J.autoReplaceSvg]||ee.replace,e=Yt.begin("mutate");n.map(t),e(),a()})}}var re=!1;function ie(){re=!1}var oe=null;function ce(t){if(l&&J.observeMutations){var r=t.treeCallback,i=t.nodeCallback,o=t.pseudoElementsCallback,e=t.observeMutationsRoot,n=void 0===e?v:e;oe=new l(function(t){re||At(t).forEach(function(t){if("childList"===t.type&&0<t.addedNodes.length&&!te(t.addedNodes[0])&&(J.searchPseudoElements&&o(t.target),r(t.target)),"attributes"===t.type&&t.target.parentNode&&J.searchPseudoElements&&o(t.target.parentNode),"attributes"===t.type&&te(t.target)&&~I.indexOf(t.attributeName))if("class"===t.attributeName){var e=Jt(Ct(t.target)),n=e.prefix,a=e.iconName;n&&t.target.setAttribute("data-prefix",n),a&&t.target.setAttribute("data-icon",a)}else i(t.target)})}),p&&oe.observe(n,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function se(t){var e,n,a=t.getAttribute("data-prefix"),r=t.getAttribute("data-icon"),i=void 0!==t.innerText?t.innerText.trim():"",o=Jt(Ct(t));return a&&r&&(o.prefix=a,o.iconName=r),o.prefix&&1<i.length?o.iconName=(e=o.prefix,n=t.innerText,(qt[e]||{})[n]):o.prefix&&1===i.length&&(o.iconName=Vt(o.prefix,Ht(t.innerText))),o}var le=function(t){var e={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return t?t.toLowerCase().split(" ").reduce(function(t,e){var n=e.toLowerCase().split("-"),a=n[0],r=n.slice(1).join("-");if(a&&"h"===r)return t.flipX=!0,t;if(a&&"v"===r)return t.flipY=!0,t;if(r=parseFloat(r),isNaN(r))return t;switch(a){case"grow":t.size=t.size+r;break;case"shrink":t.size=t.size-r;break;case"left":t.x=t.x-r;break;case"right":t.x=t.x+r;break;case"up":t.y=t.y-r;break;case"down":t.y=t.y+r;break;case"rotate":t.rotate=t.rotate+r}return t},e):e};function fe(t){var e,n,a,r,i,o,c,s=se(t),l=s.iconName,f=s.prefix,u=s.rest,d=(e=t.getAttribute("style"),n=[],e&&(n=e.split(";").reduce(function(t,e){var n=e.split(":"),a=n[0],r=n.slice(1);return a&&0<r.length&&(t[a]=r.join(":").trim()),t},{})),n),m=le(t.getAttribute("data-fa-transform")),p=null!==(a=t.getAttribute("data-fa-symbol"))&&(""===a||a),h=(i=At((r=t).attributes).reduce(function(t,e){return"class"!==t.name&&"style"!==t.name&&(t[e.name]=e.value),t},{}),o=r.getAttribute("title"),J.autoA11y&&(o?i["aria-labelledby"]="".concat(J.replacementClass,"-title-").concat(kt()):(i["aria-hidden"]="true",i.focusable="false")),i),g=(c=t.getAttribute("data-fa-mask"))?Jt(c.split(" ").map(function(t){return t.trim()})):Gt();return{iconName:l,title:t.getAttribute("title"),prefix:f,transform:m,symbol:p,mask:g,extra:{classes:u,styles:d,attributes:h}}}function ue(t){this.name="MissingIcon",this.message=t||"Icon unavailable",this.stack=(new Error).stack}(ue.prototype=Object.create(Error.prototype)).constructor=ue;var de={fill:"currentColor"},me={attributeType:"XML",repeatCount:"indefinite",dur:"2s"},pe={tag:"path",attributes:K({},de,{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})},he=K({},me,{attributeName:"opacity"}),ge={tag:"g",children:[pe,{tag:"circle",attributes:K({},de,{cx:"256",cy:"364",r:"28"}),children:[{tag:"animate",attributes:K({},me,{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:K({},he,{values:"1;0;1;1;0;1;"})}]},{tag:"path",attributes:K({},de,{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:[{tag:"animate",attributes:K({},he,{values:"1;0;0;0;0;1;"})}]},{tag:"path",attributes:K({},de,{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:K({},he,{values:"0;0;1;1;0;0;"})}]}]},ve=W.styles;function be(t){var e=t[0],n=t[1],a=d(t.slice(4),1)[0];return{found:!0,width:e,height:n,icon:Array.isArray(a)?{tag:"g",attributes:{class:"".concat(J.familyPrefix,"-").concat(Y.GROUP)},children:[{tag:"path",attributes:{class:"".concat(J.familyPrefix,"-").concat(Y.SECONDARY),fill:"currentColor",d:a[0]}},{tag:"path",attributes:{class:"".concat(J.familyPrefix,"-").concat(Y.PRIMARY),fill:"currentColor",d:a[1]}}]}:{tag:"path",attributes:{fill:"currentColor",d:a}}}}function ye(a,r){return new vt(function(t,e){var n={found:!1,width:512,height:512,icon:ge};if(a&&r&&ve[r]&&ve[r][a])return t(be(ve[r][a]));"object"===i(g.FontAwesomeKitConfig)&&"string"==typeof window.FontAwesomeKitConfig.token&&g.FontAwesomeKitConfig.token,a&&r&&!J.showMissingIcons?e(new ue("Icon is missing for prefix ".concat(r," with icon name ").concat(a))):t(n)})}var we=W.styles;function xe(t){var i,e,o,c,s,l,f,n,u,a=fe(t);return~a.extra.classes.indexOf(j)?function(t,e){var n=e.title,a=e.transform,r=e.extra,i=null,o=null;if(k){var c=parseInt(getComputedStyle(t).fontSize,10),s=t.getBoundingClientRect();i=s.width/c,o=s.height/c}return J.autoA11y&&!n&&(r.attributes["aria-hidden"]="true"),vt.resolve([t,Lt({content:t.innerHTML,width:i,height:o,transform:a,title:n,extra:r,watchable:!0})])}(t,a):(i=t,o=(e=a).iconName,c=e.title,s=e.prefix,l=e.transform,f=e.symbol,n=e.mask,u=e.extra,new vt(function(r,t){vt.all([ye(o,s),ye(n.iconName,n.prefix)]).then(function(t){var e=d(t,2),n=e[0],a=e[1];r([i,jt({icons:{main:n,mask:a},prefix:s,iconName:o,transform:l,symbol:f,mask:a,title:c,extra:u,watchable:!0})])})}))}function ke(t){var n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null;if(p){var e=v.documentElement.classList,a=function(t){return e.add("".concat(S,"-").concat(t))},r=function(t){return e.remove("".concat(S,"-").concat(t))},i=J.autoFetchSvg?Object.keys(z):Object.keys(we),o=[".".concat(j,":not([").concat(G,"])")].concat(i.map(function(t){return".".concat(t,":not([").concat(G,"])")})).join(", ");if(0!==o.length){var c=[];try{c=At(t.querySelectorAll(o))}catch(t){}if(0<c.length){a("pending"),r("complete");var s=Yt.begin("onTree"),l=c.reduce(function(t,e){try{var n=xe(e);n&&t.push(n)}catch(t){M||t instanceof ue&&console.error(t)}return t},[]);return new vt(function(e,t){vt.all(l).then(function(t){ae(t,function(){a("active"),a("complete"),r("pending"),"function"==typeof n&&n(),s(),e()})}).catch(function(){s(),t()})})}}}}function Ae(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null;xe(t).then(function(t){t&&ae([t],e)})}function Ce(m,p){var h="".concat(x).concat(p.replace(":","-"));return new vt(function(a,t){if(null!==m.getAttribute(h))return a();var e=At(m.children).filter(function(t){return t.getAttribute(w)===p})[0],n=g.getComputedStyle(m,p),r=n.getPropertyValue("font-family").match(L),i=n.getPropertyValue("font-weight");if(e&&!r)return m.removeChild(e),a();if(r){var o=n.getPropertyValue("content"),c=~["Solid","Regular","Light","Duotone","Brands"].indexOf(r[1])?E[r[1].toLowerCase()]:R[i],s=Ht(3===o.length?o.substr(1,1):o),l=Vt(c,s),f=l;if(!l||e&&e.getAttribute(C)===c&&e.getAttribute(O)===f)a();else{m.setAttribute(h,f),e&&m.removeChild(e);var u={iconName:null,title:null,prefix:null,transform:yt,symbol:!1,mask:null,extra:{classes:[],styles:{},attributes:{}}},d=u.extra;d.attributes[w]=p,ye(l,c).then(function(t){var e=jt(K({},u,{icons:{main:t,mask:Gt()},prefix:c,iconName:f,extra:d,watchable:!0})),n=v.createElement("svg");":before"===p?m.insertBefore(n,m.firstChild):m.appendChild(n),n.outerHTML=e.map(function(t){return Zt(t)}).join("\n"),m.removeAttribute(h),a()}).catch(t)}}else a()})}function Oe(t){return vt.all([Ce(t,":before"),Ce(t,":after")])}function Se(t){return!(t.parentNode===document.head||~N.indexOf(t.tagName.toUpperCase())||t.getAttribute(w)||t.parentNode&&"svg"===t.parentNode.tagName)}function Pe(r){if(p)return new vt(function(t,e){var n=At(r.querySelectorAll("*")).filter(Se).map(Oe),a=Yt.begin("searchPseudoElements");re=!0,vt.all(n).then(function(){a(),ie(),t()}).catch(function(){a(),ie(),e()})})}var Ne="svg:not(:root).svg-inline--fa{overflow:visible}.svg-inline--fa{display:inline-block;font-size:inherit;height:1em;overflow:visible;vertical-align:-.125em}.svg-inline--fa.fa-lg{vertical-align:-.225em}.svg-inline--fa.fa-w-1{width:.0625em}.svg-inline--fa.fa-w-2{width:.125em}.svg-inline--fa.fa-w-3{width:.1875em}.svg-inline--fa.fa-w-4{width:.25em}.svg-inline--fa.fa-w-5{width:.3125em}.svg-inline--fa.fa-w-6{width:.375em}.svg-inline--fa.fa-w-7{width:.4375em}.svg-inline--fa.fa-w-8{width:.5em}.svg-inline--fa.fa-w-9{width:.5625em}.svg-inline--fa.fa-w-10{width:.625em}.svg-inline--fa.fa-w-11{width:.6875em}.svg-inline--fa.fa-w-12{width:.75em}.svg-inline--fa.fa-w-13{width:.8125em}.svg-inline--fa.fa-w-14{width:.875em}.svg-inline--fa.fa-w-15{width:.9375em}.svg-inline--fa.fa-w-16{width:1em}.svg-inline--fa.fa-w-17{width:1.0625em}.svg-inline--fa.fa-w-18{width:1.125em}.svg-inline--fa.fa-w-19{width:1.1875em}.svg-inline--fa.fa-w-20{width:1.25em}.svg-inline--fa.fa-pull-left{margin-right:.3em;width:auto}.svg-inline--fa.fa-pull-right{margin-left:.3em;width:auto}.svg-inline--fa.fa-border{height:1.5em}.svg-inline--fa.fa-li{width:2em}.svg-inline--fa.fa-fw{width:1.25em}.fa-layers svg.svg-inline--fa{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0}.fa-layers{display:inline-block;height:1em;position:relative;text-align:center;vertical-align:-.125em;width:1em}.fa-layers svg.svg-inline--fa{-webkit-transform-origin:center center;transform-origin:center center}.fa-layers-counter,.fa-layers-text{display:inline-block;position:absolute;text-align:center}.fa-layers-text{left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);-webkit-transform-origin:center center;transform-origin:center center}.fa-layers-counter{background-color:#ff253a;border-radius:1em;-webkit-box-sizing:border-box;box-sizing:border-box;color:#fff;height:1.5em;line-height:1;max-width:5em;min-width:1.5em;overflow:hidden;padding:.25em;right:0;text-overflow:ellipsis;top:0;-webkit-transform:scale(.25);transform:scale(.25);-webkit-transform-origin:top right;transform-origin:top right}.fa-layers-bottom-right{bottom:0;right:0;top:auto;-webkit-transform:scale(.25);transform:scale(.25);-webkit-transform-origin:bottom right;transform-origin:bottom right}.fa-layers-bottom-left{bottom:0;left:0;right:auto;top:auto;-webkit-transform:scale(.25);transform:scale(.25);-webkit-transform-origin:bottom left;transform-origin:bottom left}.fa-layers-top-right{right:0;top:0;-webkit-transform:scale(.25);transform:scale(.25);-webkit-transform-origin:top right;transform-origin:top right}.fa-layers-top-left{left:0;right:auto;top:0;-webkit-transform:scale(.25);transform:scale(.25);-webkit-transform-origin:top left;transform-origin:top left}.fa-lg{font-size:1.3333333333em;line-height:.75em;vertical-align:-.0667em}.fa-xs{font-size:.75em}.fa-sm{font-size:.875em}.fa-1x{font-size:1em}.fa-2x{font-size:2em}.fa-3x{font-size:3em}.fa-4x{font-size:4em}.fa-5x{font-size:5em}.fa-6x{font-size:6em}.fa-7x{font-size:7em}.fa-8x{font-size:8em}.fa-9x{font-size:9em}.fa-10x{font-size:10em}.fa-fw{text-align:center;width:1.25em}.fa-ul{list-style-type:none;margin-left:2.5em;padding-left:0}.fa-ul>li{position:relative}.fa-li{left:-2em;position:absolute;text-align:center;width:2em;line-height:inherit}.fa-border{border:solid .08em #eee;border-radius:.1em;padding:.2em .25em .15em}.fa-pull-left{float:left}.fa-pull-right{float:right}.fa.fa-pull-left,.fab.fa-pull-left,.fal.fa-pull-left,.far.fa-pull-left,.fas.fa-pull-left{margin-right:.3em}.fa.fa-pull-right,.fab.fa-pull-right,.fal.fa-pull-right,.far.fa-pull-right,.fas.fa-pull-right{margin-left:.3em}.fa-spin{-webkit-animation:fa-spin 2s infinite linear;animation:fa-spin 2s infinite linear}.fa-pulse{-webkit-animation:fa-spin 1s infinite steps(8);animation:fa-spin 1s infinite steps(8)}@-webkit-keyframes fa-spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes fa-spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.fa-rotate-90{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.fa-rotate-180{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.fa-rotate-270{-webkit-transform:rotate(270deg);transform:rotate(270deg)}.fa-flip-horizontal{-webkit-transform:scale(-1,1);transform:scale(-1,1)}.fa-flip-vertical{-webkit-transform:scale(1,-1);transform:scale(1,-1)}.fa-flip-both,.fa-flip-horizontal.fa-flip-vertical{-webkit-transform:scale(-1,-1);transform:scale(-1,-1)}:root .fa-flip-both,:root .fa-flip-horizontal,:root .fa-flip-vertical,:root .fa-rotate-180,:root .fa-rotate-270,:root .fa-rotate-90{-webkit-filter:none;filter:none}.fa-stack{display:inline-block;height:2em;position:relative;width:2.5em}.fa-stack-1x,.fa-stack-2x{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0}.svg-inline--fa.fa-stack-1x{height:1em;width:1.25em}.svg-inline--fa.fa-stack-2x{height:2em;width:2.5em}.fa-inverse{color:#fff}.sr-only{border:0;clip:rect(0,0,0,0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.sr-only-focusable:active,.sr-only-focusable:focus{clip:auto;height:auto;margin:0;overflow:visible;position:static;width:auto}.svg-inline--fa .fa-primary{fill:var(--fa-primary-color,currentColor);opacity:1;opacity:var(--fa-primary-opacity,1)}.svg-inline--fa .fa-secondary{fill:var(--fa-secondary-color,currentColor);opacity:.4;opacity:var(--fa-secondary-opacity,.4)}.svg-inline--fa.fa-swap-opacity .fa-primary{opacity:.4;opacity:var(--fa-secondary-opacity,.4)}.svg-inline--fa.fa-swap-opacity .fa-secondary{opacity:1;opacity:var(--fa-primary-opacity,1)}.svg-inline--fa mask .fa-primary,.svg-inline--fa mask .fa-secondary{fill:#000}.fad.fa-inverse{color:#fff}";function Me(){var t=b,e=y,n=J.familyPrefix,a=J.replacementClass,r=Ne;if(n!==t||a!==e){var i=new RegExp("\\.".concat(t,"\\-"),"g"),o=new RegExp("\\--".concat(t,"\\-"),"g"),c=new RegExp("\\.".concat(e),"g");r=r.replace(i,".".concat(n,"-")).replace(o,"--".concat(n,"-")).replace(c,".".concat(a))}return r}function ze(){J.autoAddCss&&!_e&&(wt(Me()),_e=!0)}function Ee(e,t){return Object.defineProperty(e,"abstract",{get:t}),Object.defineProperty(e,"html",{get:function(){return e.abstract.map(function(t){return Zt(t)})}}),Object.defineProperty(e,"node",{get:function(){if(p){var t=v.createElement("div");return t.innerHTML=e.html,t.children}}}),e}function je(t){var e=t.prefix,n=void 0===e?"fa":e,a=t.iconName;if(a)return Qt(Re.definitions,n,a)||Qt(W.styles,n,a)}var Le,Re=new(function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.definitions={}}var e,n,a;return e=t,(n=[{key:"add",value:function(){for(var e=this,t=arguments.length,n=new Array(t),a=0;a<t;a++)n[a]=arguments[a];var r=n.reduce(this._pullDefinitions,{});Object.keys(r).forEach(function(t){e.definitions[t]=K({},e.definitions[t]||{},r[t]),function t(e,a){var n=(2<arguments.length&&void 0!==arguments[2]?arguments[2]:{}).skipHooks,r=void 0!==n&&n,i=Object.keys(a).reduce(function(t,e){var n=a[e];return n.icon?t[n.iconName]=n.icon:t[e]=n,t},{});"function"!=typeof W.hooks.addPack||r?W.styles[e]=K({},W.styles[e]||{},i):W.hooks.addPack(e,i),"fas"===e&&t("fa",a)}(t,r[t]),Bt()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(i,t){var o=t.prefix&&t.iconName&&t.icon?{0:t}:t;return Object.keys(o).map(function(t){var e=o[t],n=e.prefix,a=e.iconName,r=e.icon;i[n]||(i[n]={}),i[n][a]=r}),i}}])&&r(e.prototype,n),a&&r(e,a),t}()),_e=!1,Te={i2svg:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};if(p){ze();var e=t.node,n=void 0===e?v:e,a=t.callback,r=void 0===a?function(){}:a;return J.searchPseudoElements&&Pe(n),ke(n,r)}return vt.reject("Operation requires a DOM of some kind.")},css:Me,insertCss:function(){_e||(wt(Me()),_e=!0)},watch:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=t.autoReplaceSvgRoot,n=t.observeMutationsRoot;!1===J.autoReplaceSvg&&(J.autoReplaceSvg=!0),J.observeMutations=!0,B(function(){Fe({autoReplaceSvgRoot:e}),ce({treeCallback:ke,nodeCallback:Ae,pseudoElementsCallback:Pe,observeMutationsRoot:n})})}},Ie=(Le=function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},n=e.transform,a=void 0===n?yt:n,r=e.symbol,i=void 0!==r&&r,o=e.mask,c=void 0===o?null:o,s=e.title,l=void 0===s?null:s,f=e.classes,u=void 0===f?[]:f,d=e.attributes,m=void 0===d?{}:d,p=e.styles,h=void 0===p?{}:p;if(t){var g=t.prefix,v=t.iconName,b=t.icon;return Ee(K({type:"icon"},t),function(){return ze(),J.autoA11y&&(l?m["aria-labelledby"]="".concat(J.replacementClass,"-title-").concat(kt()):(m["aria-hidden"]="true",m.focusable="false")),jt({icons:{main:be(b),mask:c?be(c.icon):{found:!1,width:null,height:null,icon:{}}},prefix:g,iconName:v,transform:K({},yt,a),symbol:i,title:l,extra:{attributes:m,styles:h,classes:u}})})}},function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},n=(t||{}).icon?t:je(t||{}),a=e.mask;return a&&(a=(a||{}).icon?a:je(a||{})),Le(n,K({},e,{mask:a}))}),Ye={noAuto:function(){J.autoReplaceSvg=!1,J.observeMutations=!1,oe&&oe.disconnect()},config:J,dom:Te,library:Re,parse:{transform:function(t){return le(t)}},findIconDefinition:je,icon:Ie,text:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},n=e.transform,a=void 0===n?yt:n,r=e.title,i=void 0===r?null:r,o=e.classes,c=void 0===o?[]:o,s=e.attributes,l=void 0===s?{}:s,f=e.styles,u=void 0===f?{}:f;return Ee({type:"text",content:t},function(){return ze(),Lt({content:t,transform:K({},yt,a),title:i,extra:{attributes:l,styles:u,classes:["".concat(J.familyPrefix,"-layers-text")].concat(m(c))}})})},counter:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},n=e.title,a=void 0===n?null:n,r=e.classes,i=void 0===r?[]:r,o=e.attributes,c=void 0===o?{}:o,s=e.styles,l=void 0===s?{}:s;return Ee({type:"counter",content:t},function(){return ze(),function(t){var e=t.content,n=t.title,a=t.extra,r=K({},a.attributes,n?{title:n}:{},{class:a.classes.join(" ")}),i=Pt(a.styles);0<i.length&&(r.style=i);var o=[];return o.push({tag:"span",attributes:r,children:[e]}),n&&o.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),o}({content:t.toString(),title:a,extra:{attributes:c,styles:l,classes:["".concat(J.familyPrefix,"-layers-counter")].concat(m(i))}})})},layer:function(t){var e=(1<arguments.length&&void 0!==arguments[1]?arguments[1]:{}).classes,n=void 0===e?[]:e;return Ee({type:"layer"},function(){ze();var e=[];return t(function(t){Array.isArray(t)?t.map(function(t){e=e.concat(t.abstract)}):e=e.concat(t.abstract)}),[{tag:"span",attributes:{class:["".concat(J.familyPrefix,"-layers")].concat(m(n)).join(" ")},children:e}]})},toHtml:Zt},Fe=function(){var t=(0<arguments.length&&void 0!==arguments[0]?arguments[0]:{}).autoReplaceSvgRoot,e=void 0===t?v:t;(0<Object.keys(W.styles).length||J.autoFetchSvg)&&p&&J.autoReplaceSvg&&Ye.dom.i2svg({node:e})};!function(t){try{t()}catch(t){if(!M)throw t}}(function(){u&&(g.FontAwesome||(g.FontAwesome=Ye),B(function(){Fe(),ce({treeCallback:ke,nodeCallback:Ae,pseudoElementsCallback:Pe})})),W.hooks=K({},W.hooks,{addPack:function(t,e){W.styles[t]=K({},W.styles[t]||{},e),Bt(),Fe()},addShims:function(t){var e;(e=W.shims).push.apply(e,m(t)),Bt(),Fe()}})})}();                         �K9����u��Q��ԙ@�R��'b��Э1Jܭ��i,,֒�A��s�*�i�\^γ�I`�i�$G�v�η���d';�9�X�=�oRNx%���>��J���y�
TO��d=���A�jr/+}3�`Hu~O�0@�?j��x:���Irr�*�2ؚ.��N�����_c��Q:���H������%!�.�����D�Ϋ(���	�(�,�޻�O�J�ܚYSd�j��6[�~��H�D�x��Q<�wP/�?5���*jz80t�e�^HL�Ô�x�<}�a�f�I�ɺ};���923�Hv�c*�OPJ%�#,N���6]�v���Z5,��k���EN�9��dJgA�%(�\dKC��.�T��<�I��
���8��tH�"hRtV�o'/EtA�͆`0XTWpd�J����2ض����Lk) R������KeFη7�������f#�y-�FQ���&��1���袆䱑���Fi���k�A+��~认{+���k�b���>��ȑ)��ē7�ii�Hr�k`�Y?W�w�����¶�X���3))��T�Z��o3% SJ�gJ	t��dA����$��>�B~�)	B�� �R.S�X@��g�$��i5�@MJ2�C�;}�j�a3�h���T:=� L�4��� j�n�c�^�;������, KL�!�E�E-�j�Jcѻ��<9wHM�I�?]��<w0����Fe�%� ��x�9R�� ^-�ѫS�n�eAz�i��<_f�72>O!͑�9i�A��~��.89�КzrJf1x��G��J��=������{:<�_�)ɍڵ3��j Y��,):�����kIgW��Z tw	�C�8��ث�y]�n4���v���tS�k2�����+��H{�,��@����ݟ�=�N��Q7�&��:��j�Hf��S�N�b����%y���tPe�*���=%�o2R���� �-)9.�l	Jr4��ڜ��D�
)��+��!Re����"5 l)P�PmL�||)==�C��N/$������v�M���!=<�k@�&~�r�o��#�'�0 I-�bHͳ�`�=���-'���Q1�)�o�+�` T7(�VLҼ_"B�x�q���d8FZ��0j	�@| TVcm���ؖ�$x�?�T���I�kt�����'S�@�3�i�!5�'*0�Y��^p�������&4b�42@�'��#bO�<��v4I�n��-^��h�cI/��[�����-�u�O�!K��� ��۷��>�zJ��]RA�('�L%���hY�9�˄�����	�[~
�^:��ۡ�=�4�خ�FC�fC4� �Bد=A���aJP�9*B;S��iz�U}����
r�z�mX�jc�(��wZ��L^Pƻ��=/�{�D1�=οۑ�Hz��H:rI�����&]J���N�*(�Ɠ� 	,(�i[?m�lL��<v����'WPv���U�	���������t�mI)�����iܲ!�g�(c�J�� &�0� 5��Q��hKs�~���4"�jU8��8�{��:��3u9�w;1�N.6��5��A���\*�};0|s�/[�-<R�s2��-�!��f֔!t�o�;u� �]�L/�P��eZ�*5��A��
%]�;��b�)ɋq&�As������& c	jn� ��ْ�t	F����EZ��(8/�c����3���g�!\٤V��d-if0o��+�8��5���H��dd�{��������%�D���;&D)R�>M\��'xA�ߛ ��8Z{�詽���y�|"��a'� @&^��Z�gCC���/��pY��f4պ<n��?�� `(zsJ�M�S>���RY.����{ P�=ȫ:I��L̊�%�1HVs5JrV�m�`��MlI��=�]�]�VRљ�6��J�P�=���� �9�p	���e.ȁ<�!���&�,H�&4�4�Gr�aȀ`z��+��F
�����y"��T�J�DP+�q f5Ϳ�� o��vs�8�H_����?G��Ϡ���jTBc�%	�����4��D���!��4���kB�~�w0y;'������?�QI�۟1�Qb���WmN��<@B��@ A�Ɲ�aT)���H�%\��v�WNж�@=�Fj�|u�`��T<%�D�dh�x���ӄS�r�+ ��ڕ%!{�D1
�J���1FqIcީ��i�1���������k�f�`�RT���KT��#]���5\c���c|��ى9k��A6Mʸ� 5�t�Hr^��Q�iLU	�E��FMcz�<������В�8�'��qE%�'���`��y6�a@|{���VbjؓRɻUL�Nx�`J�9{�`��ʎ"�h����׬�%�TO�#� z�+ʛ�������H#�K�W�J�7��0+�����\��L�1��@�9���J,���$A�E��^�%)P��HK3��
��	�g}���A%w
�$ �i��U�`�	 ��f��r$/�9.�#p�'Y��Q��<M%h3���=糚��r
*�e˒�=|R���i�X�n'�Tr�ii�h+�<}���%�e޺��()�rE�v"���^��3x��`�#7��'Do):*�) rv�R���P�H�Ȗ���	]��qJ��y�!�C ��YI����6�R���d
���o-(8�Vdn�8���vb<}5�ʱ�jˎ�;1>]R`O:�w`�J��P�� ���6�6oS�Dt(5E�񌽊.�4��D�LCO�R�[�HJjB5<dA�ߔn.m��!]޶�ɢ�A�_���ӭ�����@�O)�:�}1Ӽ$T�HK��i��Y���F }�)y���}�;���a�� ��m<w;ȇ�˷Q�jN�eК��S�f��LhH��=g�ڙ
D���]�sI��@�"3#��(� c��K�,⏨�7��ؒ��6!���. �6z�^^*���NL�P�q�IX�3鶃s���.��[Ь!�V��t0I���b��ٌ�+.�cR+'SY�(��oAKFP�+Iءէ��E���m���hiI�j� ��I�(!Y�TI�̓J���2P�BX��x����Q\K�R��5<'^�b�`k���+�G|OM�}Ϟj^���P��y�����u 䖾�tP�r��d˸!=�K���UX	��n3��I�:2�n�ރ4h= �u�w�������
�AK&�U���v�E{��$,�}��"�Ր� �}��X�)Ue��3�� ���z��DNy���v����W���~����qE�i�fZF��`f����Ӹ�8%�Lr�c�/&5(\u��oI���o�[6UI�B�&�NAYqFF�E���*]�y��_���Ó�^P21�STP{�r��N��B�z���4�SC�� ֢�YP�j!���d�r:�>"����xt���\�$E�:i	52?���q��a��[���wW�!pM��d-	MO��n-p�P\N�W�"ǣ����H�1z?��j��l��1= �BE�y�Xa�aN�OO�s��t�5-�$ s크x�Vd�
�I���	SZ���T�B2�m���F�}��v5�������J��J*׵t��:7����Si]P�.����rr��%�("��HjC�o�8QR��Q��
�z���}R˿�X�P \B�vN�] ����[�cǈ+J����@��?Y�"WVD�}��,��p�M=����2JH�A*����\�O�(�V�X���T�2���(h�!��
���^.�Q X!׫$�)��/�$��"���K
��>���pQNY&tWlOJ�&�jɗE��:rJ��f�R.Dפ �t���(č�&�M,��1�Mvb<9�
�!4]Qܤâ��	!� ��^�a*�Kt�W�w�q}��#$�2�*H�ߩ�Epo���(�.t�:�?J"�I��`�4��Y��ߎ[d[4KS-H��m��%f80_	�7�W�)��)��E��=%����@����(�(oY��/9BSxj��'b������ ěonHqB���\K*��o�ƇK����2��!�O���d�/R3qGR݈ErYp4����^���mA����a�M}dR���_(̔������IE������"+d�5q�@�~p��_PD�ቺ;� �*�Ȓ<��<{��t�eO�(�Y� |	fa�.'���� ��.	��_�1'5����{��]��h{QN�7?�`�nO�J@�(neҦ"��_ϐ`W
�P���7'l�woNAʿ 05���V�n��{��o)Pi����bG+���L�w�En��(�S?������S�����U����)x��_@L�UdP�#��팤hn����RS13Pb!���]o<�?U��e���U	X�ɼ6�8#'L3'W%�A���A]��M�w���N�تY���W`N
.R4,M�$����%[\r{��$UB���ޖ���s ��/��QJ����]%���� o�X&J�Z�)
dx�V��&���q^f�*1�֒OLJ����HMXg0i;])�b��S�X	�-�(�ل��/��T�
��:e�����G��@%Y��=It��;'�h��<��RO��B%����e�[h����b��?���X(c�$�d̩'uCA�>��ɉ-�z��d�v�'������)A+$7���Tt7ex�m�Z
�F���S'UK�-�5��E���dۂ ,�N�J%����)l�TwV������@zYK�gK�Y-����!8(!����FX������#q��k�Ȼ��#���� -) ��� a�Պ�R�>VS-ȊR(,AN0�2� ܓ`T@7�fI(R"�SX���v18�%�=2����H��N:�vI%�"i���x�
b{0}F8������.*��&Ͱ���\��V���P5B��y�34D��B6�TA�/?Ft*���r�_�н�GtF:ʃ:J5���B/ ���((���)&�����^�K[�$̀Tĵ-(�驄*Ȟ�t���4�A��K.zOH��ԭ�M��ْ�#~��֔|��[_kdV�1���D�	s&(�5���k�-��4/Kn��kڟ ��	@������R�n�
��T�/зC��h t��-ү�.��XA���������<?�ɛ��a/�~T�q�V���W��V�S���?i�D��{��erҭP�7I���	��Te%F�VŜ�f��-��vC�����n�Q�K�gV3�2Ũ%�� UԦ
�R����A��X�'u��/�onɡ!dd�|9�@�nED��:�[rjmP M4�*��ci֚�6���V:�Ov��ϹÑr��A0�a@��Tu���c�
�uN��wP³��*����&�U�a���E���*���Qxq��q�`w��=~)�r�[r"�G��Y��x�����'����2nWR%TO�/i���B�D(�R��|��\Κ�P��5��������Q���1����8��(!)�@��
�lE�7��N~Q�wA�$`ҵږ�)3�A~���LN0O�Y$Ɗw�GtRAw��|~Ж�rh�����
�</�(ykV���С��OC����A�֩d*/��ԀG+	m�`��s�0��4@¨����1��dU�1.��ˎ�U����xZ�*�2�v{�QƊ/O��CH�O�$w�'����-� �v,	М:���#
\�e���[S�߾o(��T��w@�D�vԔ-/$Z|O�����Ģ*A��/8�ce��a$ĝ<��
��X�$x�_�)$;QR����Y� �j{����&���)���p��k�lmC6��j���� -�xpA��)�0��X8�'#d�mM���9y�78
P}J~�?S��*4�6�����%yԶ��l���l	�hrKN���X��& -�*1ɸf-[(P5��	>��?7��`�� ��MC�zC(
��Ü���|iQ6���
V����v�iB��8p�|���ɪ��uVBFI�J%��(a�����#a%��,YG�T�����G��S��Ls,}t��夅	�b^��NJ����P�÷��b4�)�1ϫ �'�GIA2X]8꾂Z&ٮ~L-�G�]�dm)�)2{��������������b3?s��.uG�l#�����y�kl�yNC#��K��F�k� 	v�~�����Ґ���Ȇp� �b�P���(t���.H��"�i�R��Y�9ސ� py%j�����L���Y9�.Q)�.b�E4�0��L�����0i����P����R(U�nG����TT?��Q�O=A��h���T=����)��?��(���S)�"ǃ�Isըy�#Ա�5���#b�eFT� ��؝9�Z�Q*F`�p����^,���c��Ɛj�IݚO��&\	b�ӔŰMC�/_f3��)J
��R�T�ޘ�Q�+�wA�l
20@;��p��h��@)�mG�!�)������<g((�'�ƣUP��0GMNa+߾?C~R�I�*T^:�bG���ix�N��"Es(-�S�Qt�n@�OH䦒mP������j8�a?�=�z��R������P�$�c`�"t���ic���2��USb��~;��`����L�C�@�E���B��cG���B����G��r�;?�\��T����6t��U�G 1��oZZ�' �ʲ*�����P��Hb �K�ܩ5�~�LP�;$:�f�h�gHs<�E��z�� 	$F*{�ܲ�G�D�TA��u		�9�>�b+���)w	��<��?BlNe[���!����uTy�i�E-�e����n���.�TQ͞@J�OE*�v������TT��w��*B+1)UH!��u�H�V�9x+�==	0y;�$�=u���ͮ	����y�~��5e$x�t�pI}+-Y�\��U�Y������c�7ICT����||=1�Xȁ�w���,H���m�J� �R}�MyE����<0����<f���bT��pW�
һ��{�����	�xjM��s��"u=7X�w�*�xt0&6���4� 
�B7A���N��rS��7Pj�Q�ĳY�B�=��&�طCaM�"S���%����#���QB)����RT�H	�0����+*�#�:��8����4���v�:��Ɂ���O�J[�
@~���UTd���t29��+��,���j�W>'q�m읜��w}CEv�Hf|��K�'�Lﶈ#�a�[��4�Mo5zG�K����#! ��Y㖠���A���Kh������)U�@Q�B�	�����	�+!m_\H�	�	�U&�ZR�|>]r{$,_�oݯ%� �u4$YM~�ċ@��;���I+���]�6�����x^�A��-L�I���Њ�F/T�E�y�%�.��r��ґe�j���9yA?�_��2�S�5�M�Kc�Ҍ�}�KK�[�12��'�v�`=Pv(�2b둚$"���4'|(����-	=O��gU�܉Qݩɋ�2Aݧ��k�IPn	H� +i�-�����P�R���D��L}
/d�B7��� �φ椅FBW�"@�@X��+(2�Z��O���n;{���X������wG!�_(���]E#���-p��j唼,����u��G�ܙ����5]`�%���5���x��lIE�% %����� 
	��ӭ��-���f�K�
�I�ڏ@��t?�7uEZןx�
B�� �~&1'$�Q�e��3��2]Ԫk<��[8[�                                                                                                                                                                                                                                                                              �I��R�����x� Y��
>�c$S7�-���+_յ>�>�-�bA�R|IsC�GS��/��ɪm��/�����"�&xY6�s����k8���e�
��m�^�V���C����S���I�5�6�F^�9H:��}��o�� �$<��)#(!Q�$O��Ǹy�B �~��A��(/D�a��<�QiZ��)�0�}F���s&�{M��,A�+��m�J��p���v���R��=�����@J��t�mz}3��l�׽�I/		PI�������[Z2Ρ�!A\c)"@)X3'Z�u��D���m��"�XѮE��5�=��B-�^%8�&��(s��-[������hBp?�";�
H��"�(����U�4�)�
k���k ��5��L:�[q�sOb��h�}ʙ��b�)�B��%nF��FH7�\������� ��:S���Q
����	��6�UD'ӱ��o�]��E7$��4�T�����E ʻ����ܴ+��P@�Ir���P��(mr��c��)�G�ڮN��7�2�\�'r�!K*��^������"^t����(��.T�]&��I�Zb��U��<�cGl!.��.r<�9�s���a�}AK{z׳�;��G�s0����%,L���x�pC����˞�?ţ�9��B2���IZ݇�˖�~v6���k�{���r��cHj�f�Ձ��]T��$��!���l"����`����L�v�Dg��̳7]+³�83�M0��ϖڨ��S��ٕ�1�#��lIb�h�z�˫��Y�3;���� �>���-��8�:�^�k�=<P�M��g���]s�>ۂ���J�m����k�d."�����`�U;J�x���0��_�XT��.�=�8��uFpo�+Cn\�,���i�ƾ�O`g܍I?��w�]���'/v	]�렻���Z�[�S�/	���K@�ۈ(��C=�M�m����s����
�!i���J�7/P������O'��n؈(����:ke��ܯF��x����`�}��W�栻���#��\�P}�M�̄����~�74w2!⢾�m_>�[X!��c�ȇ����lh*Mg�P� ����B˿X~�^���b��g'Q>ۃ�Rho�^F0`�b�ҵ��1���q�."GΨ1m�L,Dv��@�"Fm��q\����K��F�4��9~ ��E���(ojݼ�e��b�딝
&����*��'�d���vt�*��f4ePOe�a� �╊1��X24v��r��r�v�v�jKF;�m����
��e��E�d'F��R$EO�&��%��~�]�*]����֌�mf��敷T:w�c��}�|
����8f������ٟE�8|�XG�S(�)Zɹz�~R���J�]��l�j�E��i�s=ƹ��q#畆tc뀋($24�X�}��B7�!R��Y^I�{}��i���Q�%�@]E=΃�A6�O���������M��i��~9�V��l�UWMY MD�X������֚���p��{i���nQ��u�n6 `^Y]�$8�����;%ѿ@�(,uH\F/�j��/9��E��Qҍ1��|M�ֆ{���wEa������W�{b���q�4C�I^��'f����x���f���{�;������z�U���!��e%Y+�}���� N����kɹ��%����nV���b%ߛ{eyՠ���/s)6v�6�2�l�h;��Ap��$L��;����ka����g�B��q���p������_����.;�<)]Y�XU�'���������d�����ƺm�^&�R\�����^!���ןl��Bk,�Gq;0�Ob\=~b;)GZZ�fK���q�����-��$��Րj�YeK�5�q^���=���Z�L��cT�`�2��s	���;Şy�.U��|�R����L햬��*���Fή&�y�:!��4[��ln4ضR��3?�>�7��d�$����1��%�T�aL�֕`n�����06k�u[7Z���6Y=�.��Q5�/_-�|�qYEŅ�(�E�:?nw��6�J����b�{q�(Z~�w�ǃg�u�U�Lfg+"�F��{����Y3=�������m[<��ˀ�W���,oaϊ��p���i�.}�;.�N��Z�+s��ז�Ic�j��ʅ�p�k��{��~"�
�D�Oߑ�|.x�qs��P2pmih���bF�'~+yte{�('������x�30<]�m�QQ�K)�A�1��X���4��'�^Rc�sc�ÿ����I�N�U���P�}hWMSg[K.w��+\�8���<c� ����cK��$�n���B"�kX#*w���#�'<��E�*�!�]��ԪH�U�=��&����g��;^N� �W_ĵ�?5�{��q>�	�K�u�|�i�8�ڤ@�D_��k �򌰊 �a�䔄�#^ ���1N�gSC����u^�ԟ	�n�"K���$���&BoYp'����+u�E��4#��k2�i�o$|;;x���Xxke�F^G<�������v~�x�ʆ�a׹����k��5}�BQ:7���,f��Q^ŗ���Z�"���P��y`� �W4��N�`��@�gYeX0|2F�T]�ITׄ��[�
�J� ���S���2C��U"�$�c	�e�HWP��m��="޼�Q x�B�m ��~qW�t/�.�� b��9␯�Q�ι��ocvadG%�����>�����P��دCw"�t��C�Wd�F�ܔI�p��%zP7�R��2��OYqg��p3v}*�+3�N�tR9�0i	���y90_n\�IĈݿ6H�������2W��[���\7�D��c�����9y���Tk�Ѳ����D�Ki���@�A���/�zP��;R��y����z��@��@1�jc�!�دmV�-�m��5t8>!#����z9D6�����ez�j<�m8(sU 8���Ԕ�m�Ĭ�ڂ\�]����^�n�c���!*k����OU��v��U�
�\+_�_��&�0��J�'^��=+���~���x��Zw�y�
	k�D���>x:�J�k-kd��0z�	�hgT����<����LsQ	���{�9���az���<xc�kw>�I�n�B!��qhqU�<����UAl�L7M⺷�����k, �4}&�?W�)�D�`�3"e�������8
��E� �K�PY�3N���k/�\��U��ڪDpq�nu�i�k��0�b�7��&�S4Q����U��t��H���[�ܥc�/�\oR���rY��XQ��c�]�Ѡ����y��(L�LD0��g�-��وx0v"!K7�"��:���K	��@aH*=�pt)������P�W0K���m-_��&�n�lˍ�e�r܃K��4鍼w�T	��Y��Et�Uɫ��D{�
�@�C�Z��Y-�}�J`�ݸk�&kdcC��z�H�?M�b�#5#7����O}R�Ռp}�%���ZݝE�������3v�<5r���#�qn�����JK��
Ih�Q��󒵆�I���G*� ��iҏ��X,���eW3���"�&�Eڠ-�񿰡5�	�����nפ1��\>�t�+n.����x�I�o�q��O�L���ƕqՃͼТ�<T	T�
{�q��|��*9��e;c^���uRJ�k�蚎�dU(����v�����2n�d���kl-�N(~�y���X��7�k�����Y�9�8��9���~ �/H"������R�f�}���Z�����xVK��>ݝ~�g�NO�ޞ%~��'�ZfC3fI?;#����c�1���,��/{�l:�߰�'�ߌ���݂��.�p�h6h�	��WvzN�K�J��baOrz��k��3m#PAVB����ԩ�z�-��6 ���;O���d�=�n�]����k�>��5$����f��B�5���Py�(�~�E�Qˊ�c�$c^���)l���o�8�J�]�@UP0����4�_�}��sw`�Ҫ*�;-稐��_	�a���l��6ǑU~��b��Զe'�~��� r8����h�lV&�ݎ1Jm9�^��&��r/.�k;����凧x�B!d�G]��XB�y��u��hh'��~���EM�H�M,�;����j��wU�Ks�4�x\�� h����P�X`f1��3-c#��-���V�j�ٻ��Ll��ld-pxCJ`�ȵ�J.�␩1�7�tY,��h�����H��ĵ9���ᨅ���&j_!��y������D�l8�0R]��# T2#��:�m@,ct�T�<N��֋�Tx�p|y��v1�"��IYb��`�f���W�����aX�$���Ii�|:.��h-g40S�
Äe�"Ԇ_�u��p��Ba��nQ��2�K�B!��@0�K���s����ew^�cu6�^5*7��Tk_%O1�:6����w8,��p��~x�rf����b���n�e�a�
��:��2v0,wS$d MI�R�%l�%k�Z�RX|���E,�"�jd�g��s�Tj�\s_Z�t 2�#C}U4�Ă�t����6a����fҾ���HH[�y��@�Ƴd}�ړ�����]�X��\c��޸-ze��j�]��V�Ϯ`�P �;����%��E������~"�#OE�OS i0�G�b��w�lzp2��Z��ə����J�땆�a�x/x�&Oߚ� O/Z^��Cl�[ǽ5���ґ�ۦ#��S'��kz]-���.J��snF��n�{�DO"���EN�Gc)^`�����	���3��X��b�����ZP�'��Gr�����U��l�l�<�%�B��j!&F{�g(��f��”>�`�uO�p�e���SO#��HC�D�ߐ���I�1=�̯�X�?,�K≳D�%}g�趗�>HE�Sq��K���DE����	=@C"�H�D&\��q����L)�7�nۃN ��8�:����ԌNh
�pjf�_#n�b���QO���B�"��PvN!n��{Xh ��`,��7�h\�:G(�&�gcӈ!V�+S*J9�#l�̢C�V)�V6�P-�����هr�+�D���ǹ�e��y'so��I�<�3�B
��k��tT�������$<y�B���
��{I�f�h�����7~�#Ƞ�"�!@K��@�9w��4��q�8���2�lY���y�4x�e�JL��3_�
肚���\/�}��
�kB���X[�_�q�b�Vc�E�B���f��T�wQݔ����-M�
ud�'i���B�Y� ��I쨐j��Y�%��""7��Vp���v������.���&3���{w�GE�1�0���Q"���)����s�]g�N��:��`���ؤP�&��(���EQ<Yq>|c��zo���n�
hhŘ�0���Gt+����Q�6��}�b�)[j�&b�-����N�X� *�,�p�A�J���d�N9��AU���k�wM�{�gm�ͩ�b��l�R�)��PS�y�f���Z5��j�U�@����BC��?�#�8�R���|ѫ�� �3J�ފ����g3�/�VH\�Y�*BĦ��X����^��DT�5�Jw %���9]���^���a7Ԓ���e[����"��n1�M�ʖB�?���w���<��8�Su~����c��h�q,B�W^��\���d{�b96ԃ���x�J�R�~��A�W��Q�?"�)H�c^��Y؉Z�5<$�I�+N��5��֡��j)��"\�$p�FY�E�ƌ� @5+��U�rDH��h����^���%����N�r߃�7��������)9��Py�w�|-	�	.�i���^��Kx�ג�G�0
�Ħae���ڛ�!�/���m���t�<`��G�X��-�NlV��ɑp_�t/�f]G�R1t>�/"���o��╄�W��m���K�b�Z;�ӗ��(na�u��:[�xF��{��Im�2]�BIܗ�@Y*�lc͇��`|�]_O�����-^/�,����bn��˷��2�f�8&�kR�')��"�Z�+U�0o VS��NT�
�� _ޑ�c�II�lI�s$�:���g:��u|-�/F�w����h{m��w�̈{�#�T8,�J����!bcIf�2*g������t��y�i{�J�^��Ġ�(F�Y3ȵx���7�7�SS$=��QW<)#uu�F����]���ա>��P�J0 u��g�X��#�Ў�+�p��Aܜ���u�+H�=Y�D�ԋ�3/P�b��Ka�'PT��k�
���`�]I��en�dd�yU�B�fu/���*�;D�F��r�1���Q6�.��(��XD�" j.K�U�
|�a�W1,��B.��V�b_>b�f�D�V)�^�j>!9����K����Q5m�g�����"�Z��H1�}-гXi�I�8��L�s��7�x��-:��Y�D��
����<�Z0%!0�j�'rqY[�#,!"��(�ts�_��h!-&+^[[V�a=gZ����*c8��\��N��k�#����2v�Ñ 7�����U�ؠ�֘�-�����d�+�.B�SW���p/9�V,�v�u\�xW�(��{��N��ݸ�f��fOB}��[Y�8:Nu8AXU��*�^�<Qχ����?k�߹�+��b}1��:Uz�D�_�Й�y���U�:n�
n���F����eY�'�!���λZ6�X��[Ιa�KѦ��!^/1��݃�l)@ dښ���B[S����LRɆ�WGY\��.	�6��&�����e2��2�鼧�h���}�]xup����8����-�՘�Dh��T�\�k�n3-m�f�HPf�Ic��۟��f��La�
G�M�,~�0��m�맘3���w#T����Q�Xlł�w[A����IӾ�r~;s�NYy���µp� ���h0� d�j��i(-��t���W�s���b	>Ǌ�e���vL��O���sg�E7ifv��^x��/kx=ɞ"�E~N>�D�"M<	�*	}��|�\=2�g&��)J!����R_jM�N���ڼhh�ć#��Á$w5���]��V���>��򶥊�*���)����V���}�)zY�V�W��!P�q���-����Y�M7�������i��Z/��K_HfM�L��
�U0���C}\�*����{��&M�*W�n)���K	+�����t�����.2��H<�S��E	��q�Ȥ��)s?׋^\�ꢁ���0D���Z�E��l�ˆ�^��5A�:���K�m���Ҧ��岄��>!�P/Ztх�&���,G.J�
!��E��n�ΐ[����q���E��GM\��r��.J�!��|9�"M��$�]�@�0�K�����J��U���DJ��	��U���7��V�賋\�F\���]��F.���0�\��&6�n�-��r\�v�\��Ѻn⢄�'�zvQ�1�T���[C+��4���ľ˜�+F�Rq�#�Ջ�]��4�G�rQ"��N�XpQq�#^���eSrh�T�)^�vQB⍓�o��\k�"���ă+�<��=�ޤ��S���zq�WU4��z�.JS�h�O�\�h�𯸨b�U�󆀹�u�m̕m�l�ei��4N�'jY�Á��/��%�\T�2�k\O��7ޙ�uQZ໖x�"wmO������[�ډ��L��1��E/.zuQ5���&��2Yw�(G�GK�����o~�-���������6_���&h6[=�p�E	)������"8]X�%J�lK��\��~Ֆ4��+Û��ҭ�ݵ�Bc%�߷�?\��|lki&.JHj���Z/��Z���Z�.��m�Vo��+�Z���V/Zwц�Ҋn���[��>��U���H��˰F���(�vYŤ�p뢊�:&7a�+U�>RC\V�c�Ջ�\�좴L/-ӫ�R�o�T��Ň�XrQZ�e�6�T���h��׺aݨm�h�E�>wD.��̠^�rJE����E	�W�)��eiF7+ c��wn9vQ���с�zo����e	��R�=�(���_]�@{� ��Z��T���Z+.�A)Z_���h�E��&3% >����/�ķ1~ɇ�>S63�j�Nsv.�-n�/��F��f˩��~���M�4�}<���%u�����j��v�̢S&ޭD��Ӝ۸�z.[w��K@������/��@��)<f� ��Ŷu}�6d[ص#b�c�&�]��=�jٲ�C���u��Q�lvG�B5�ޞ����>��Kd��Ϟ���F��^%��4�u~�]U����-7���;�Z!h⊎D?J\��|�>���k����x�1p\@�1F���f~Q��E��N�����ǧ?&����p�ǿ�_��Ǔ��<��j����鏻�m<��<�ߩ};>��e�v?~|���|�ct����9������Ϟ����qx1�<w�>�gW����.���B�����?��;x��4l���F�㫢��� a��n���?Ə��@������9���������#�G�k��w�.��C�\��qٿ;�6UI=�����.��x$'O����/c��x�kJ�|z�2&U���a�i8�g_��_���q�>���nf���ޗYI�>��Pa0����:�>E�}��S*���N�G_�/�G�?O��i����xg|A���x�M���w#v�3��Fc����f�B������?�/��1�Y�����z3���=d����N�ם�>�Sz2�ur6�;ϞX����i&y?�}�1��)�7��Y�h�?�A;��3�>}���Ŭ���b�ֺ�\��<��&7���hR���F��N��-&���8�?/}Q��W�	>�B-�4����O��#�>��`�d_�o����ZdUO�}Dݽ��3��n��_���&�>v��|4����/�ދ���r�8�\�o4��`�[׭��`Fs�n|������ͳ:���	����~��Rt?e�EP���p�Џ#�O<�����"\�x��:�j�%D��O	IZͯ&�?n�b�}�==?
��7���W����<7C1;���>"%�����ƝQt{�H�-��Ëp��0��nxgA{6}�ӊ"��K�ȼ�>���ꐲ��av� @*	�&ķhoDx���~���g�#��ږ�6LǗ��Ǿ&Һ��VW��3�f
�r�#;<�N���Z�{1�F�%�U�hf't�r����w���xX��8D�h�?Ǣ��1��F�W��?����+E�G��
��B�#RҼ�+M��������n5�Lye4�?��Է����^� i�s��W3#ߟoYM�w���G��O��o���%)��n4���s)j��P���Q�oQLX"-��>�K�@��3��P��bg�0-�?�R��h|��I�����D3Qy�3Xz,�����pp�e&,�k�{h&�Y~X-�i3(D]܌'ã�E��$���V��쉠9��x��Ƃ���R���|�7�o�d���I�S��F��<�Fo�}}OE��lE�hrؿ3-x�^�&6��E&<�5ߞMA��_o!���<z9�^{���ӓ�23��4|���{Up3~:�۪a�}a�9܁���O�������[�{��I%L'�Aj^������0�~b��xo"Ŵ��O)�{�۝>��FHWEt�1[�MF�e����G�9<��h�mZa49�~�1z�L���(��1�Q�SM�]��R����F)��6EϦZ���
\��9z�Z.���Sc� ��hfܳ�a�UBݬ�#!D���ex�x�PɄ�`��G�(�O]׶�6C�����R�&n&r����xh����DU�xݙ��= %�i_"�@� JZ�%�#�4��SD=mN�p�l���N)����󑾏���SDzY�3/ь(�sZ���򴦞.���|��-#����h���m�d ��}IA	_SBa����_������%�+�a��d��{����(l4��%\X�2q����R?��PG*ҋڅ�Ơ�w�'��sC���Y�0���5l����Ԙ8p;�����k(��W[����a�WY���+�02�,.����^�-a֐
/�I�Xd�)�(��~$��]g�i`�=��Nܡ1�b��0�GI����>z�D�S��Sʅe�)�	'浐E�_�ׇ�Wx���G[�{�����d�h��/nr�b��p���N�N�o�`6�Q�Um)�ax.�� �4�flx1����J�GZէ�?��������CVd}�����k��	y���e���,�`hX�/�!�(�⥙�h�(�g-�Z����6Q�JQ��Y�{l�Lp���%c?R\J�  ,��l��D���o�[���?V��?Fy��]����f�J��is�0,�"�l`X�7��+�Mѱ����VL��@'/}�Ej�}[���j����RW{���Wo��Wo�/�S_m�6ۨ� ݚ�&�� ���X�������˶��������a̔e������鐁�|���p�:�W���f�>!�� ���^�;�u�>j�v���R���#E�����zGsG.I$�����:�N�m�2\��uF��=����?(� �j��2� ����#���Ϸ��f^�H�Ǥ�6�YF��Fr'�4��%dTw���`z���;�s��'����D�#�+ޠF�)%�,��EHp�^�}�V��+�%B+Ō&~
TY`��}xCc�q�9�~�U���x�$y�l�M[�q�噲M��P)a)W
�j �(��?.ːQ��bV����r6�¶[��T�F�.t����e���E�\;[�aR��l�=�B��k�E�՛&Fr@������K�P�sm��)?�A���Q9��f{����F���w��$���k��j�pW�rl.�6~v�ˏ/��m�⽖�@쯳�F��6D�߰��0����r��*(��%/�!n�ws�]�i�J��`��@cU������ܫ�CV8��}��*Y�%vd�!�h���N��X�
�����˱$�Ω�q��<�Ibi �S����Fⵓ*�����Q���/f�>�U�[]�}�TV�� 4��aI_�V�*�M����a��=Jf$⡨��������r��4JKMg��"� ����"_=���AZk9Bh̙Y`2�%�0�b��lK8����!6���+ǁ(���vϮ�):���S� �H���	� �ƚ��b�L�R�pE�
��{��y�Q2r��p��ӻ>����L3�0��ï�t��$��q�O����YT�J����N؏��)X�,��KMhjA���j��.��N�pꗦ��b`�p�����lJq#�Nf2�p!빘����,_cP��O�p=��Jm�������`�1&�0n�Ulӷ]ԯ�ש_Ƌw"{3Ґa$1p�m���+Mi����9"�(��Y�t`ݮ/mܦ��P��/��fT�h��M���%�v���n�[9J��jӄ]S�ws�ߦ@	�Z��83V����Ò�p-IA��=j��4�Cx��@��`����w���]�sD9�c���6*�E}Bݶ0U��w���xuH�)�c��?�]u�z����08'
�,<���5��}'�%��	��vq���A޹��/Y��H��V��P��~a�N��+8'&+ڴZ� �R�c:���@o��+��3�������"��Fف��I��&v�I�2��Y�O�P�6z'���I���m�Om\��r�Gvu���$������ݎ�~�P!�h'O��;�Z�G?'#�wt�7*N�@IK�6����f�1�Dx�V�C��ęF����۸W�lQ�Ժl��R�̵���,[��I,�b�-F�Ѡ���"���J�,-$�E��	�K{R��fkR�v�τ 5%�V)�	K�*$�ӁqOi�����z9|mQ��y��묤��v&��n;v�X������B�~�������f�5\Ur�&Q����sj�[��?�>��h6����աG�����8R�e|�:�/9��Ԇ�<�5b����5���O�oMkn�0����->�I��g�`-�{�
�"����࠷���D���v�z�ɼz�Ѧ�f�D���,6��p��lL������Vo��5��q���`=G�A,�A|y$)qR��J%v-��b`T�<�Z+Γuk#��>
�<
�5�����ㄙ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    �   $       4                                  �                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          xm�iXW�pA1,�B@AD
4" �M�EP�1��EStuU[]M���"�(�,����$�F�"��c m�!(8�AVvT�eu
ӷh��_��=�~��s�S� ��۲�Za���a�P6��T�������Yλ5����~\}@eY�]�8NP0����A0�A� �C{�?�%��G:z�Eho��0@��[U�+���>�w���V�h�$$�(D�&0�א��7��av�t���В�l�Qƃ`�e����57��ݸI��x�d�~�)����~;W(KJ�j,l��:(�G|��`����b'+�ڛ�ج�kPز)@�1�@Z�D�{��J��K?Kˣ�4Z�uRr� �:]>{��Q=��c��v���q +&I� .L!�sQL$8Ħbza���d�QYU�`�#O�`4�0hX���+�dа��{ϖ�d(�{�~j*�R�7�:��3��a<�Q���^������f;��,9�[?p�-������9Y8Q�۱�6n�1e��Y*Dh�8'� �����u�b���ǜ{���@�!%��YK��z�CO�.�����j�t�)@�0�8��0|:�^�o��H�5�դ}�{�̃�		���ϴ�����:�IY#?��Z�Ʉ��%$8P����I����-*�T�g�-`�6��>ս��[�o���ћ��M�U2z�e(,$��ugj�s��t�Y���CO&��G����+L���ۅ�	��ғ׎�ܲX.c��>�D��i�Z�������wo�G�?rő�q|�"��ϳ��y
�kz+�&*� 71f�z��n�R�u��5���bʃq�)]rRS����ko�D��Y[k	~�p$��b��S����$˴R����3����26 �),E�J)���e���>���$*�	��Rp�d���hu� �-4ml�=���ka�E�R� !$:�GR�j6���v�jY.i{O;#���
	FK�\~;Ϊ|߁��_���W,����#$���"
!��+,鈶���
���/`�4/��E�%!H>}a P~6�T�O{l�܉�1�(��k481�0D�_T$�`���5K=:�T�&S�Ө��]���;� �ߟ�����Zy����J�k_�X��Xi6
b0.:;8X�?=�M�+��܂㫅h��se1�D��p����Q&/�
�T
6�6��R�I�e���k���'�+��H�^���rß�ae,�����F���LW����S�+���ۣl{cl��0"!L´�c� H.�Ӧ˄��-��K���Ň%u{v�|]%;�C(�x��Ly� ѣ�c��;'�>'�� �/lyI��ۅ�*h�+6�Kh�2|��\StC���c��?�_���5�}��&�ıS3�An�����v;y�x�����_Տ�b�K@D=(wndo�׈��?n{zm�R��z���2V�|�i�����7�R�%����X�6���>?9P=z�g�V��_�9�ψ�d���	��q,�1}`�������(Mhp1�|֛�q�vҿ yjРj�u�~�#-Б�-��I>��¡�Ƙ��UeJb����*�P3��h[���1���X��X��C�V�u<�df��}0�|�"";�?y�kۑ<vu��̒��A"���a}v��U�Z��E����Ns��`��8[L�w���4��'�,QEZw|l
�9ǻ���?���od3yxM�#��J�L�
��ij(S��j�.c����GE(�W(�x����A�[֮�:g�f�W*ws0�BѨ���.�K��=ݯo�i!�9�0�,iL�-չi�Y���il�71-jƽ�+���p	�e�n�;�+rU��Wݣ���Ϥ�����MZn_�:I��)-F�I�Rɶ�Pę�Q��6��L78��m�$\����d��N6L����J󢇯�;Y�nΫ�z��`;��Cp0B�<U|��`ߜ�]m&E��IZn_ �#���o3��-n���^�P�qM��+z�_�x�9                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                /* *
 *
 *  (c) 2010-2020 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import Axis from './Axis.js';
import H from './Globals.js';
var charts = H.charts, doc = H.doc, seriesTypes = H.seriesTypes, win = H.win;
import Legend from './Legend.js';
import MSPointer from './MSPointer.js';
import O from './Options.js';
var defaultOptions = O.defaultOptions;
import Pointer from './Pointer.js';
import Time from './Time.js';
import U from './Utilities.js';
var addEvent = U.addEvent, animate = U.animate, animObject = U.animObject, attr = U.attr, createElement = U.createElement, css = U.css, defined = U.defined, discardElement = U.discardElement, erase = U.erase, error = U.error, extend = U.extend, find = U.find, fireEvent = U.fireEvent, getStyle = U.getStyle, isArray = U.isArray, isFunction = U.isFunction, isNumber = U.isNumber, isObject = U.isObject, isString = U.isString, merge = U.merge, numberFormat = U.numberFormat, objectEach = U.objectEach, pick = U.pick, pInt = U.pInt, relativeLength = U.relativeLength, removeEvent = U.removeEvent, setAnimation = U.setAnimation, splat = U.splat, syncTimeout = U.syncTimeout, uniqueKey = U.uniqueKey;
/**
 * Callback for chart constructors.
 *
 * @callback Highcharts.ChartCallbackFunction
 *
 * @param {Highcharts.Chart} chart
 *        Created chart.
 */
/**
 * Format a number and return a string based on input settings.
 *
 * @callback Highcharts.NumberFormatterCallbackFunction
 *
 * @param {number} number
 *        The input number to format.
 *
 * @param {number} decimals
 *        The amount of decimals. A value of -1 preserves the amount in the
 *        input number.
 *
 * @param {string} [decimalPoint]
 *        The decimal point, defaults to the one given in the lang options, or
 *        a dot.
 *
 * @param {string} [thousandsSep]
 *        The thousands separator, defaults to the one given in the lang
 *        options, or a space character.
 *
 * @return {string} The formatted number.
 */
/**
 * The chart title. The title has an `update` method that allows modifying the
 * options directly or indirectly via `chart.update`.
 *
 * @interface Highcharts.TitleObject
 * @extends Highcharts.SVGElement
 */ /**
* Modify options for the title.
*
* @function Highcharts.TitleObject#update
*
* @param {Highcharts.TitleOptions} titleOptions
*        Options to modify.
*
* @param {boolean} [redraw=true]
*        Whether to redraw the chart after the title is altered. If doing more
*        operations on the chart, it is a good idea to set redraw to false and
*        call {@link Chart#redraw} after.
*/
/**
 * The chart subtitle. The subtitle has an `update` method that
 * allows modifying the options directly or indirectly via
 * `chart.update`.
 *
 * @interface Highcharts.SubtitleObject
 * @extends Highcharts.SVGElement
 */ /**
* Modify options for the subtitle.
*
* @function Highcharts.SubtitleObject#update
*
* @param {Highcharts.SubtitleOptions} subtitleOptions
*        Options to modify.
*
* @param {boolean} [redraw=true]
*        Whether to redraw the chart after the subtitle is altered. If doing
*        more operations on the chart, it is a good idea to set redraw to false
*        and call {@link Chart#redraw} after.
*/
/**
 * The chart caption. The caption has an `update` method that
 * allows modifying the options directly or indirectly via
 * `chart.update`.
 *
 * @interface Highcharts.CaptionObject
 * @extends Highcharts.SVGElement
 */ /**
* Modify options for the caption.
*
* @function Highcharts.CaptionObject#update
*
* @param {Highcharts.CaptionOptions} captionOptions
*        Options to modify.
*
* @param {boolean} [redraw=true]
*        Whether to redraw the chart after the caption is altered. If doing
*        more operations on the chart, it is a good idea to set redraw to false
*        and call {@link Chart#redraw} after.
*/
var marginNames = H.marginNames;
/* eslint-disable no-invalid-this, valid-jsdoc */
/**
 * The Chart class. The recommended constructor is {@link Highcharts#chart}.
 *
 * @example
 * var chart = Highcharts.chart('container', {
 *        title: {
 *               text: 'My chart'
 *        },
 *        series: [{
 *            data: [1, 3, 2, 4]
 *        }]
 * })
 *
 * @class
 * @name Highcharts.Chart
 *
 * @param {string|Highcharts.HTMLDOMElement} [renderTo]
 *        The DOM element to render to, or its id.
 *
 * @param {Highcharts.Options} options
 *        The chart options structure.
 *
 * @param {Highcharts.ChartCallbackFunction} [callback]
 *        Function to run when the chart has loaded and and all external images
 *        are loaded. Defining a
 *        [chart.events.load](https://api.highcharts.com/highcharts/chart.events.load)
 *        handler is equivalent.
 */
var Chart = /** @class */ (function () {
    function Chart(a, b, c) {
        this.axes = void 0;
        this.axisOffset = void 0;
        this.bounds = void 0;
        this.chartHeight = void 0;
        this.chartWidth = void 0;
        this.clipBox = void 0;
        this.colorCounter = void 0;
        this.container = void 0;
        this.index = void 0;
        this.isResizing = void 0;
        this.labelCollectors = void 0;
        this.legend = void 0;
        this.margin = void 0;
        this.numberFormatter = void 0;
        this.options = void 0;
        this.plotBox = void 0;
        this.plotHeight = void 0;
        this.plotLeft = void 0;
        this.plotTop = void 0;
        this.plotWidth = void 0;
        this.pointCount = void 0;
        this.pointer = void 0;
        this.renderer = void 0;
        this.renderTo = void 0;
        this.series = void 0;
        this.spacing = void 0;
        this.spacingBox = void 0;
        this.symbolCounter = void 0;
        this.time = void 0;
        this.titleOffset = void 0;
        this.userOptions = void 0;
        this.xAxis = void 0;
        this.yAxis = void 0;
        this.getArgs(a, b, c);
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Handle the arguments passed to the constructor.
     *
     * @private
     * @function Highcharts.Chart#getArgs
     *
     * @param {...Array<*>} arguments
     * All arguments for the constructor.
     *
     * @fires Highcharts.Chart#event:init
     * @fires Highcharts.Chart#event:afterInit
     */
    Chart.prototype.getArgs = function (a, b, c) {
        // Remove the optional first argument, renderTo, and
        // set it on this.
        if (isString(a) || a.nodeName) {
            this.renderTo = a;
            this.init(b, c);
        }
        else {
            this.init(a, b);
        }
    };
    /**
     * Overridable function that initializes the chart. The constructor's
     * arguments are passed on directly.
     *
     * @function Highcharts.Chart#init
     *
     * @param {Highcharts.Options} userOptions
     *        Custom options.
     *
     * @param {Function} [callback]
     *        Function to run when the chart has loaded and and all external
     *        images are loaded.
     *
     * @return {void}
     *
     * @fires Highcharts.Chart#event:init
     * @fires Highcharts.Chart#event:afterInit
     */
    Chart.prototype.init = function (userOptions, callback) {
        // Handle regular options
        var options, 
        // skip merging data points to increase performance
        seriesOptions = userOptions.series, userPlotOptions = userOptions.plotOptions || {};
        // Fire the event with a default function
        fireEvent(this, 'init', { args: arguments }, function () {
            userOptions.series = null;
            options = merge(defaultOptions, userOptions); // do the merge
            var optionsChart = options.chart || {};
            // Override (by copy of user options) or clear tooltip options
            // in chart.options.plotOptions (#6218)
            objectEach(options.plotOptions, function (typeOptions, type) {
                if (isObject(typeOptions)) { // #8766
                    typeOptions.tooltip = (userPlotOptions[type] && // override by copy:
                        merge(userPlotOptions[type].tooltip)) || void 0; // or clear
                }
            });
            // User options have higher priority than default options
            // (#6218). In case of exporting: path is changed
            options.tooltip.userOptions = (userOptions.chart &&
                userOptions.chart.forExport &&
                userOptions.tooltip.userOptions) || userOptions.tooltip;
            // set back the series data
            options.series = userOptions.series = seriesOptions;
            /**
             * The original options given to the constructor or a chart factory
             * like {@link Highcharts.chart} and {@link Highcharts.stockChart}.
             *
             * @name Highcharts.Chart#userOptions
             * @type {Highcharts.Options}
             */
            this.userOptions = userOptions;
            var chartEvents = optionsChart.events;
            this.margin = [];
            this.spacing = [];
            // Pixel data bounds for touch zoom
            this.bounds = { h: {}, v: {} };
            // An array of functions that returns labels that should be
            // considered for anti-collision
            this.labelCollectors = [];
            this.callback = callback;
            this.isResizing = 0;
            /**
             * The options structure for the chart after merging
             * {@link #defaultOptions} and {@link #userOptions}. It contains
             * members for the sub elements like series, legend, tooltip etc.
             *
             * @name Highcharts.Chart#options
             * @type {Highcharts.Options}
             */
            this.options = options;
            /**
             * All the axes in the chart.
             *
             * @see  Highcharts.Chart.xAxis
             * @see  Highcharts.Chart.yAxis
             *
             * @name Highcharts.Chart#axes
             * @type {Array<Highcharts.Axis>}
             */
            this.axes = [];
            /**
             * All the current series in the chart.
             *
             * @name Highcharts.Chart#series
             * @type {Array<Highcharts.Series>}
             */
            this.series = [];
            /**
             * The `Time` object associated with the chart. Since v6.0.5,
             * time settings can be applied individually for each chart. If
             * no individual settings apply, the `Time` object is shared by
             * all instances.
             *
             * @name Highcharts.Chart#time
             * @type {Highcharts.Time}
             */
            this.time =
                userOptions.time && Object.keys(userOptions.time).length ?
                    new Time(userOptions.time) :
                    H.time;
            /**
             * Callback function to override the default function that formats
             * all the numbers in the chart. Returns a string with the formatted
             * number.
             *
             * @name Highcharts.Chart#numberFormatter
             * @type {Highcharts.NumberFormatterCallbackFunction}
             */
            this.numberFormatter = optionsChart.numberFormatter || numberFormat;
            /**
             * Whether the chart is in styled mode, meaning all presentatinoal
             * attributes are avoided.
             *
             * @name Highcharts.Chart#styledMode
             * @type {boolean}
             */
            this.styledMode = optionsChart.styledMode;
            this.hasCartesianSeries = optionsChart.showAxes;
            var chart = this;
            /**
             * Index position of the chart in the {@link Highcharts#charts}
             * property.
             *
             * @name Highcharts.Chart#index
             * @type {number}
             * @readonly
             */
            chart.index = charts.length; // Add the chart to the global lookup
            charts.push(chart);
            H.chartCount++;
            // Chart event handlers
            if (chartEvents) {
                objectEach(chartEvents, function (event, eventType) {
                    if (isFunction(event)) {
                        addEvent(chart, eventType, event);
                    }
                });
            }
            /**
             * A collection of the X axes in the chart.
             *
             * @name Highcharts.Chart#xAxis
             * @type {Array<Highcharts.Axis>}
             */
            chart.xAxis = [];
            /**
             * A collection of the Y axes in the chart.
             *
             * @name Highcharts.Chart#yAxis
             * @type {Array<Highcharts.Axis>}
             *
             * @todo
             * Make events official: Fire the event `afterInit`.
             */
            chart.yAxis = [];
            chart.pointCount = chart.colorCounter = chart.symbolCounter = 0;
            // Fire after init but before first render, before axes and series
            // have been initialized.
            fireEvent(chart, 'afterInit');
            chart.firstRender();
        });
    };
    /**
     * Internal function to unitialize an individual series.
     *
     * @private
     * @function Highcharts.Chart#initSeries
     */
    Chart.prototype.initSeries = function (options) {
        var chart = this, optionsChart = chart.options.chart, type = (options.type ||
            optionsChart.type ||
            optionsChart.defaultSeriesType), series, Constr = seriesTypes[type];
        // No such series type
        if (!Constr) {
            error(17, true, chart, { missingModuleFor: type });
        }
        series = new Constr();
        series.init(this, options);
        return series;
    };
    /**
     * Internal function to set data for all series with enabled sorting.
     *
     * @private
     * @function Highcharts.Chart#setSeriesData
     */
    Chart.prototype.setSeriesData = function () {
        this.getSeriesOrderByLinks().forEach(function (series) {
            // We need to set data for series with sorting after series init
            if (!series.points && !series.data && series.enabledDataSorting) {
                series.setData(series.options.data, false);
            }
        });
    };
    /**
     * Sort and r