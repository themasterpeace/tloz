ector("script["+t+"]");if(e)return e.getAttribute(t)}(a))||"false"!==e&&("true"===e||e);null!=i&&(H[r]=i)})}var D=K({},{familyPrefix:b,replacementClass:y,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0},H);D.autoReplaceSvg||(D.observeMutations=!1);var J=K({},D);g.FontAwesomeConfig=J;var U=g||{};U[h]||(U[h]={}),U[h].styles||(U[h].styles={}),U[h].hooks||(U[h].hooks={}),U[h].shims||(U[h].shims=[]);var W=U[h],q=[],X=!1;function B(t){p&&(X?setTimeout(t,0):q.push(t))}p&&((X=(v.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(v.readyState))||v.addEventListener("DOMContentLoaded",function t(){v.removeEventListener("DOMContentLoaded",t),X=1,q.map(function(t){return t()})}));var V,Q="pending",Z="settled",$="fulfilled",tt="rejected",et=function(){},nt="undefined"!=typeof global&&void 0!==global.process&&"function"==typeof global.process.emit,at="undefined"==typeof setImmediate?setTimeout:setImmediate,rt=[];function it(){for(var t=0;t<rt.length;t++)rt[t][0](rt[t][1]);V=!(rt=[])}function ot(t,e){rt.push([t,e]),V||(V=!0,at(it,0))}function ct(t){var e=t.owner,n=e._state,a=e._data,r=t[n],i=t.then;if("function"==typeof r){n=$;try{a=r(a)}catch(t){ut(i,t)}}st(i,a)||(n===$&&lt(i,a),n===tt&&ut(i,a))}function st(e,n){var a;try{if(e===n)throw new TypeError("A promises callback cannot return that same promise.");if(n&&("function"==typeof n||"object"===i(n))){var t=n.then;if("function"==typeof t)return t.call(n,function(t){a||(a=!0,n===t?ft(e,t):lt(e,t))},function(t){a||(a=!0,ut(e,t))}),!0}}catch(t){return a||ut(e,t),!0}return!1}function lt(t,e){t!==e&&st(t,e)||ft(t,e)}function ft(t,e){t._state===Q&&(t._state=Z,t._data=e,ot(mt,t))}function ut(t,e){t._state===Q&&(t._state=Z,t._data=e,ot(pt,t))}function dt(t){t._then=t._then.forEach(ct)}function mt(t){t._state=$,dt(t)}function pt(t){t._state=tt,dt(t),!t._handled&&nt&&global.process.emit("unhandledRejection",t._data,t)}function ht(t){global.process.emit("rejectionHandled",t)}function gt(t){if("function"!=typeof t)throw new TypeError("Promise resolver "+t+" is not a function");if(this instanceof gt==!1)throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");this._then=[],function(t,e){function n(t){ut(e,t)}try{t(function(t){lt(e,t)},n)}catch(t){n(t)}}(t,this)}gt.prototype={constructor:gt,_state:Q,_then:null,_data:void 0,_handled:!1,then:function(t,e){var n={owner:this,then:new this.constructor(et),fulfilled:t,rejected:e};return!e&&!t||this._handled||(this._handled=!0,this._state===tt&&nt&&ot(ht,this)),this._state===$||this._state===tt?ot(ct,n):this._then.push(n),n.then},catch:function(t){return this.then(null,t)}},gt.all=function(c){if(!Array.isArray(c))throw new TypeError("You must pass an array to Promise.all().");return new gt(function(n,t){var a=[],r=0;function e(e){return r++,function(t){a[e]=t,--r||n(a)}}for(var i,o=0;o<c.length;o++)(i=c[o])&&"function"==typeof i.then?i.then(e(o),t):a[o]=i;r||n(a)})},gt.race=function(r){if(!Array.isArray(r))throw new TypeError("You must pass an array to Promise.race().");return new gt(function(t,e){for(var n,a=0;a<r.length;a++)(n=r[a])&&"function"==typeof n.then?n.then(t,e):t(n)})},gt.resolve=function(e){return e&&"object"===i(e)&&e.constructor===gt?e:new gt(function(t){t(e)})},gt.reject=function(n){return new gt(function(t,e){e(n)})};var vt="function"==typeof Promise?Promise:gt,bt=A,yt={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function wt(t){if(t&&p){var e=v.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=t;for(var n=v.head.childNodes,a=null,r=n.length-1;-1<r;r--){var i=n[r],o=(i.tagName||"").toUpperCase();-1<["STYLE","LINK"].indexOf(o)&&(a=i)}return v.head.insertBefore(e,a),t}}var xt="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function kt(){for(var t=12,e="";0<t--;)e+=xt[62*Math.random()|0];return e}function At(t){for(var e=[],n=(t||[]).length>>>0;n--;)e[n]=t[n];return e}function Ct(t){return t.classList?At(t.classList):(t.getAttribute("class")||"").split(" ").filter(function(t){return t})}function Ot(t,e){var n,a=e.split("-"),r=a[0],i=a.slice(1).join("-");return r!==t||""===i||(n=i,~F.indexOf(n))?null:i}function St(t){return"".concat(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Pt(n){return Object.keys(n||{}).reduce(function(t,e){return t+"".concat(e,": ").concat(n[e],";")},"")}function Nt(t){return t.size!==yt.size||t.x!==yt.x||t.y!==yt.y||t.rotate!==yt.rotate||t.flipX||t.flipY}function Mt(t){var e=t.transform,n=t.containerWidth,a=t.iconWidth,r={transform:"translate(".concat(n/2," 256)")},i="translate(".concat(32*e.x,", ").concat(32*e.y,") "),o="scale(".concat(e.size/16*(e.flipX?-1:1),", ").concat(e.size/16*(e.flipY?-1:1),") "),c="rotate(".concat(e.rotate," 0 0)");return{outer:r,inner:{transform:"".concat(i," ").concat(o," ").concat(c)},path:{transform:"translate(".concat(a/2*-1," -256)")}}}var zt={x:0,y:0,width:"100%",height:"100%"};function Et(t){var e=!(1<arguments.length&&void 0!==arguments[1])||arguments[1];return t.attributes&&(t.attributes.fill||e)&&(t.attributes.fill="black"),t}function jt(t){var e=t.icons,n=e.main,a=e.mask,r=t.prefix,i=t.iconName,o=t.transform,c=t.symbol,s=t.title,l=t.extra,f=t.watchable,u=void 0!==f&&f,d=a.found?a:n,m=d.width,p=d.height,h="fa-w-".concat(Math.ceil(m/p*16)),g=[J.replacementClass,i?"".concat(J.familyPrefix,"-").concat(i):"",h].filter(function(t){return-1===l.classes.indexOf(t)}).concat(l.classes).join(" "),v={children:[],attributes:K({},l.attributes,{"data-prefix":r,"data-icon":i,class:g,role:l.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(m," ").concat(p)})};u&&(v.attributes[G]=""),s&&v.children.push({tag:"title",attributes:{id:v.attributes["aria-labelledby"]||"title-".concat(kt())},children:[s]});var b,y,w,x,k,A,C,O,S,P,N,M,z,E,j,L,R,_,T,I,Y,F,H,D,U,W,q=K({},v,{prefix:r,iconName:i,main:n,mask:a,transform:o,symbol:c,styles:l.styles}),X=a.found&&n.found?(w=(b=q).children,x=b.attributes,k=b.main,A=b.mask,C=b.transform,O=k.width,S=k.icon,P=A.width,N=A.icon,M=Mt({transform:C,containerWidth:P,iconWidth:O}),z={tag:"rect",attributes:K({},zt,{fill:"white"})},E=S.children?{children:S.children.map(Et)}:{},j={tag:"g",attributes:K({},M.inner),children:[Et(K({tag:S.tag,attributes:K({},S.attributes,M.path)},E))]},L={tag:"g",attributes:K({},M.outer),children:[j]},R="mask-".concat(kt()),_="clip-".concat(kt()),T={tag:"mask",attributes:K({},zt,{id:R,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"}),children:[z,L]},I={tag:"defs",children:[{tag:"clipPath",attributes:{id:_},children:(y=N,"g"===y.tag?y.children:[y])},T]},w.push(I,{tag:"rect",attributes:K({fill:"currentColor","clip-path":"url(#".concat(_,")"),mask:"url(#".concat(R,")")},zt)}),{children:w,attributes:x}):function(t){var e=t.children,n=t.attributes,a=t.main,r=t.transform,i=Pt(t.styles);if(0<i.length&&(n.style=i),Nt(r)){var o=Mt({transform:r,containerWidth:a.width,iconWidth:a.width});e.push({tag:"g",attributes:K({},o.outer),children:[{tag:"g",attributes:K({},o.inner),children:[{tag:a.icon.tag,children:a.icon.children,attributes:K({},a.icon.attributes,o.path)}]}]})}else e.push(a.icon);return{children:e,attributes:n}}(q),B=X.children,V=X.attributes;return q.children=B,q.attributes=V,c?(F=(Y=q).prefix,H=Y.iconName,D=Y.children,U=Y.attributes,W=Y.symbol,[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:K({},U,{id:!0===W?"".concat(F,"-").concat(J.familyPrefix,"-").concat(H):W}),children:D}]}]):function(t){var e=t.children,n=t.main,a=t.mask,r=t.attributes,i=t.styles,o=t.transform;if(Nt(o)&&n.found&&!a.found){var c=n.width/n.height/2,s=.5;r.style=Pt(K({},i,{"transform-origin":"".concat(c+o.x/16,"em ").concat(s+o.y/16,"em")}))}return[{tag:"svg",attributes:r,children:e}]}(q)}function Lt(t){var e=t.content,n=t.width,a=t.height,r=t.transform,i=t.title,o=t.extra,c=t.watchable,s=void 0!==c&&c,l=K({},o.attributes,i?{title:i}:{},{class:o.classes.join(" ")});s&&(l[G]="");var f,u,d,m,p,h,g,v,b,y=K({},o.styles);Nt(r)&&(y.transform=(u=(f={transform:r,startCentered:!0,width:n,height:a}).transform,d=f.width,m=void 0===d?A:d,p=f.height,h=void 0===p?A:p,g=f.startCentered,b="",b+=(v=void 0!==g&&g)&&k?"translate(".concat(u.x/bt-m/2,"em, ").concat(u.y/bt-h/2,"em) "):v?"translate(calc(-50% + ".concat(u.x/bt,"em), calc(-50% + ").concat(u.y/bt,"em)) "):"translate(".concat(u.x/bt,"em, ").concat(u.y/bt,"em) "),b+="scale(".concat(u.size/bt*(u.flipX?-1:1),", ").concat(u.size/bt*(u.flipY?-1:1),") "),b+="rotate(".concat(u.rotate,"deg) ")),y["-webkit-transform"]=y.transform);var w=Pt(y);0<w.length&&(l.style=w);var x=[];return x.push({tag:"span",attributes:l,children:[e]}),i&&x.push({tag:"span",attributes:{class:"sr-only"},children:[i]}),x}var Rt=function(){},_t=J.measurePerformance&&f&&f.mark&&f.measure?f:{mark:Rt,measure:Rt},Tt='FA "5.11.1"',It=function(t){_t.mark("".concat(Tt," ").concat(t," ends")),_t.measure("".concat(Tt," ").concat(t),"".concat(Tt," ").concat(t," begins"),"".concat(Tt," ").concat(t," ends"))},Yt={begin:function(t){return _t.mark("".concat(Tt," ").concat(t," begins")),function(){return It(t)}},end:It},Ft=function(t,e,n,a){var r,i,o,c,s,l=Object.keys(t),f=l.length,u=void 0!==a?(c=e,s=a,function(t,e,n,a){return c.call(s,t,e,n,a)}):e;for(o=void 0===n?(r=1,t[l[0]]):(r=0,n);r<f;r++)o=u(o,t[i=l[r]],i,t);return o};function Ht(t){for(var e="",n=0;n<t.length;n++){e+=("000"+t.charCodeAt(n).toString(16)).slice(-4)}return e}var Dt=W.styles,Ut=W.shims,Wt={},qt={},Xt={},Bt=function(){var t=function(a){return Ft(Dt,function(t,e,n){return t[n]=Ft(e,a,{}),t},{})};Wt=t(function(t,e,n){return e[3]&&(t[e[3]]=n),t}),qt=t(function(e,t,n){var a=t[2];return e[n]=n,a.forEach(function(t){e[t]=n}),e});var i="far"in Dt;Xt=Ft(Ut,function(t,e){var n=e[0],a=e[1],r=e[2];return"far"!==a||i||(a="fas"),t[n]={prefix:a,iconName:r},t},{})};function Vt(t,e){return(Wt[t]||{})[e]}Bt();var Kt=W.styles,Gt=function(){return{prefix:null,iconName:null,rest:[]}};function Jt(t){return t.reduce(function(t,e){var n=Ot(J.familyPrefix,e);if(Kt[e])t.prefix=e;else if(J.autoFetchSvg&&-1<["fas","far","fal","fad","fab","fa"].indexOf(e))t.prefix=e;else if(n){var a="fa"===t.prefix?Xt[n]||{prefix:null,iconName:null}:{};t.iconName=a.iconName||n,t.prefix=a.prefix||t.prefix}else e!==J.replacementClass&&0!==e.indexOf("fa-w-")&&t.rest.push(e);return t},Gt())}function Qt(t,e,n){if(t&&t[e]&&t[e][n])return{prefix:e,iconName:n,icon:t[e][n]}}function Zt(t){var n,e=t.tag,a=t.attributes,r=void 0===a?{}:a,i=t.children,o=void 0===i?[]:i;return"string"==typeof t?St(t):"<".concat(e," ").concat((n=r,Object.keys(n||{}).reduce(function(t,e){return t+"".concat(e,'="').concat(St(n[e]),'" ')},"").trim()),">").concat(o.map(Zt).join(""),"</").concat(e,">")}var $t=function(){};function te(t){return"string"==typeof(t.getAttribute?t.getAttribute(G):null)}var ee={replace:function(t){var e=t[0],n=t[1].map(function(t){return Zt(t)}).join("\n");if(e.parentNode&&e.outerHTML)e.outerHTML=n+(J.keepOriginalSource&&"svg"!==e.tagName.toLowerCase()?"\x3c!-- ".concat(e.outerHTML," --\x3e"):"");else if(e.parentNode){var a=document.createElement("span");e.parentNode.replaceChild(a,e),a.outerHTML=n}},nest:function(t){var e=t[0],n=t[1];if(~Ct(e).indexOf(J.replacementClass))return ee.replace(t);var a=new RegExp("".concat(J.familyPrefix,"-.*"));delete n[0].attributes.style,delete n[0].attributes.id;var r=n[0].attributes.class.split(" ").reduce(function(t,e){return e===J.replacementClass||e.match(a)?t.toSvg.push(e):t.toNode.push(e),t},{toNode:[],toSvg:[]});n[0].attributes.class=r.toSvg.join(" ");var i=n.map(function(t){return Zt(t)}).join("\n");e.setAttribute("class",r.toNode.join(" ")),e.setAttribute(G,""),e.innerHTML=i}};function ne(t){t()}function ae(n,t){var a="function"==typeof t?t:$t;if(0===n.length)a();else{var e=ne;J.mutateApproach===P&&(e=g.requestAnimationFrame||ne),e(function(){var t=!0===J.autoReplaceSvg?ee.replace:ee[J.autoReplaceSvg]||ee.replace,e=Yt.begin("mutate");n.map(t),e(),a()})}}var re=!1;function ie(){re=!1}var oe=null;function ce(t){if(l&&J.observeMutations){var r=t.treeCallback,i=t.nodeCallback,o=t.pseudoElementsCallback,e=t.observeMutationsRoot,n=void 0===e?v:e;oe=new l(function(t){re||At(t).forEach(function(t){if("childList"===t.type&&0<t.addedNodes.length&&!te(t.addedNodes[0])&&(J.searchPseudoElements&&o(t.target),r(t.target)),"attributes"===t.type&&t.target.parentNode&&J.searchPseudoElements&&o(t.target.parentNode),"attributes"===t.type&&te(t.target)&&~I.indexOf(t.attributeName))if("class"===t.attributeName){var e=Jt(Ct(t.target)),n=e.prefix,a=e.iconName;n&&t.target.setAttribute("data-prefix",n),a&&t.target.setAttribute("data-icon",a)}else i(t.target)})}),p&&oe.observe(n,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}}function se(t){var e,n,a=t.getAttribute("data-prefix"),r=t.getAttribute("data-icon"),i=void 0!==t.innerText?t.innerText.trim():"",o=Jt(Ct(t));return a&&r&&(o.prefix=a,o.iconName=r),o.prefix&&1<i.length?o.iconName=(e=o.prefix,n=t.innerText,(qt[e]||{})[n]):o.prefix&&1===i.length&&(o.iconName=Vt(o.prefix,Ht(t.innerText))),o}var le=function(t){var e={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return t?t.toLowerCase().split(" ").reduce(function(t,e){var n=e.toLowerCase().split("-"),a=n[0],r=n.slice(1).join("-");if(a&&"h"===r)return t.flipX=!0,t;if(a&&"v"===r)return t.flipY=!0,t;if(r=parseFloat(r),isNaN(r))return t;switch(a){case"grow":t.size=t.size+r;break;case"shrink":t.size=t.size-r;break;case"left":t.x=t.x-r;break;case"right":t.x=t.x+r;break;case"up":t.y=t.y-r;break;case"down":t.y=t.y+r;break;case"rotate":t.rotate=t.rotate+r}return t},e):e};function fe(t){var e,n,a,r,i,o,c,s=se(t),l=s.iconName,f=s.prefix,u=s.rest,d=(e=t.getAttribute("style"),n=[],e&&(n=e.split(";").reduce(function(t,e){var n=e.split(":"),a=n[0],r=n.slice(1);return a&&0<r.length&&(t[a]=r.join(":").trim()),t},{})),n),m=le(t.getAttribute("data-fa-transform")),p=null!==(a=t.getAttribute("data-fa-symbol"))&&(""===a||a),h=(i=At((r=t).attributes).reduce(function(t,e){return"class"!==t.name&&"style"!==t.name&&(t[e.name]=e.value),t},{}),o=r.getAttribute("title"),J.autoA11y&&(o?i["aria-labelledby"]="".concat(J.replacementClass,"-title-").concat(kt()):(i["aria-hidden"]="true",i.focusable="false")),i),g=(c=t.getAttribute("data-fa-mask"))?Jt(c.split(" ").map(function(t){return t.trim()})):Gt();return{iconName:l,title:t.getAttribute("title"),prefix:f,transform:m,symbol:p,mask:g,extra:{classes:u,styles:d,attributes:h}}}function ue(t){this.name="MissingIcon",this.message=t||"Icon unavailable",this.stack=(new Error).stack}(ue.prototype=Object.create(Error.prototype)).constructor=ue;var de={fill:"currentColor"},me={attributeType:"XML",repeatCount:"indefinite",dur:"2s"},pe={tag:"path",attributes:K({},de,{d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"})},he=K({},me,{attributeName:"opacity"}),ge={tag:"g",children:[pe,{tag:"circle",attributes:K({},de,{cx:"256",cy:"364",r:"28"}),children:[{tag:"animate",attributes:K({},me,{attributeName:"r",values:"28;14;28;28;14;28;"})},{tag:"animate",attributes:K({},he,{values:"1;0;1;1;0;1;"})}]},{tag:"path",attributes:K({},de,{opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"}),children:[{tag:"animate",attributes:K({},he,{values:"1;0;0;0;0;1;"})}]},{tag:"path",attributes:K({},de,{opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"}),children:[{tag:"animate",attributes:K({},he,{values:"0;0;1;1;0;0;"})}]}]},ve=W.styles;function be(t){var e=t[0],n=t[1],a=d(t.slice(4),1)[0];return{found:!0,width:e,height:n,icon:Array.isArray(a)?{tag:"g",attributes:{class:"".concat(J.familyPrefix,"-").concat(Y.GROUP)},children:[{tag:"path",attributes:{class:"".concat(J.familyPrefix,"-").concat(Y.SECONDARY),fill:"currentColor",d:a[0]}},{tag:"path",attributes:{class:"".concat(J.familyPrefix,"-").concat(Y.PRIMARY),fill:"currentColor",d:a[1]}}]}:{tag:"path",attributes:{fill:"currentColor",d:a}}}}function ye(a,r){return new vt(function(t,e){var n={found:!1,width:512,height:512,icon:ge};if(a&&r&&ve[r]&&ve[r][a])return t(be(ve[r][a]));"object"===i(g.FontAwesomeKitConfig)&&"string"==typeof window.FontAwesomeKitConfig.token&&g.FontAwesomeKitConfig.token,a&&r&&!J.showMissingIcons?e(new ue("Icon is missing for prefix ".concat(r," with icon name ").concat(a))):t(n)})}var we=W.styles;function xe(t){var i,e,o,c,s,l,f,n,u,a=fe(t);return~a.extra.classes.indexOf(j)?function(t,e){var n=e.title,a=e.transform,r=e.extra,i=null,o=null;if(k){var c=parseInt(getComputedStyle(t).fontSize,10),s=t.getBoundingClientRect();i=s.width/c,o=s.height/c}return J.autoA11y&&!n&&(r.attributes["aria-hidden"]="true"),vt.resolve([t,Lt({content:t.innerHTML,width:i,height:o,transform:a,title:n,extra:r,watchable:!0})])}(t,a):(i=t,o=(e=a).iconName,c=e.title,s=e.prefix,l=e.transform,f=e.symbol,n=e.mask,u=e.extra,new vt(function(r,t){vt.all([ye(o,s),ye(n.iconName,n.prefix)]).then(function(t){var e=d(t,2),n=e[0],a=e[1];r([i,jt({icons:{main:n,mask:a},prefix:s,iconName:o,transform:l,symbol:f,mask:a,title:c,extra:u,watchable:!0})])})}))}function ke(t){var n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null;if(p){var e=v.documentElement.classList,a=function(t){return e.add("".concat(S,"-").concat(t))},r=function(t){return e.remove("".concat(S,"-").concat(t))},i=J.autoFetchSvg?Object.keys(z):Object.keys(we),o=[".".concat(j,":not([").concat(G,"])")].concat(i.map(function(t){return".".concat(t,":not([").concat(G,"])")})).join(", ");if(0!==o.length){var c=[];try{c=At(t.querySelectorAll(o))}catch(t){}if(0<c.length){a("pending"),r("complete");var s=Yt.begin("onTree"),l=c.reduce(function(t,e){try{var n=xe(e);n&&t.push(n)}catch(t){M||t instanceof ue&&console.error(t)}return t},[]);return new vt(function(e,t){vt.all(l).then(function(t){ae(t,function(){a("active"),a("complete"),r("pending"),"function"==typeof n&&n(),s(),e()})}).catch(function(){s(),t()})})}}}}function Ae(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:null;xe(t).then(function(t){t&&ae([t],e)})}function Ce(m,p){var h="".concat(x).concat(p.replace(":","-"));return new vt(function(a,t){if(null!==m.getAttribute(h))return a();var e=At(m.children).filter(function(t){return t.getAttribute(w)===p})[0],n=g.getComputedStyle(m,p),r=n.getPropertyValue("font-family").match(L),i=n.getPropertyValue("font-weight");if(e&&!r)return m.removeChild(e),a();if(r){var o=n.getPropertyValue("content"),c=~["Solid","Regular","Light","Duotone","Brands"].indexOf(r[1])?E[r[1].toLowerCase()]:R[i],s=Ht(3===o.length?o.substr(1,1):o),l=Vt(c,s),f=l;if(!l||e&&e.getAttribute(C)===c&&e.getAttribute(O)===f)a();else{m.setAttribute(h,f),e&&m.removeChild(e);var u={iconName:null,title:null,prefix:null,transform:yt,symbol:!1,mask:null,extra:{classes:[],styles:{},attributes:{}}},d=u.extra;d.attributes[w]=p,ye(l,c).then(function(t){var e=jt(K({},u,{icons:{main:t,mask:Gt()},prefix:c,iconName:f,extra:d,watchable:!0})),n=v.createElement("svg");":before"===p?m.insertBefore(n,m.firstChild):m.appendChild(n),n.outerHTML=e.map(function(t){return Zt(t)}).join("\n"),m.removeAttribute(h),a()}).catch(t)}}else a()})}function Oe(t){return vt.all([Ce(t,":before"),Ce(t,":after")])}function Se(t){return!(t.parentNode===document.head||~N.indexOf(t.tagName.toUpperCase())||t.getAttribute(w)||t.parentNode&&"svg"===t.parentNode.tagName)}function Pe(r){if(p)return new vt(function(t,e){var n=At(r.querySelectorAll("*")).filter(Se).map(Oe),a=Yt.begin("searchPseudoElements");re=!0,vt.all(n).then(function(){a(),ie(),t()}).catch(function(){a(),ie(),e()})})}var Ne="svg:not(:root).svg-inline--fa{overflow:visible}.svg-inline--fa{display:inline-block;font-size:inherit;height:1em;overflow:visible;vertical-align:-.125em}.svg-inline--fa.fa-lg{vertical-align:-.225em}.svg-inline--fa.fa-w-1{width:.0625em}.svg-inline--fa.fa-w-2{width:.125em}.svg-inline--fa.fa-w-3{width:.1875em}.svg-inline--fa.fa-w-4{width:.25em}.svg-inline--fa.fa-w-5{width:.3125em}.svg-inline--fa.fa-w-6{width:.375em}.svg-inline--fa.fa-w-7{width:.4375em}.svg-inline--fa.fa-w-8{width:.5em}.svg-inline--fa.fa-w-9{width:.5625em}.svg-inline--fa.fa-w-10{width:.625em}.svg-inline--fa.fa-w-11{width:.6875em}.svg-inline--fa.fa-w-12{width:.75em}.svg-inline--fa.fa-w-13{width:.8125em}.svg-inline--fa.fa-w-14{width:.875em}.svg-inline--fa.fa-w-15{width:.9375em}.svg-inline--fa.fa-w-16{width:1em}.svg-inline--fa.fa-w-17{width:1.0625em}.svg-inline--fa.fa-w-18{width:1.125em}.svg-inline--fa.fa-w-19{width:1.1875em}.svg-inline--fa.fa-w-20{width:1.25em}.svg-inline--fa.fa-pull-left{margin-right:.3em;width:auto}.svg-inline--fa.fa-pull-right{margin-left:.3em;width:auto}.svg-inline--fa.fa-border{height:1.5em}.svg-inline--fa.fa-li{width:2em}.svg-inline--fa.fa-fw{width:1.25em}.fa-layers svg.svg-inline--fa{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0}.fa-layers{display:inline-block;height:1em;position:relative;text-align:center;vertical-align:-.125em;width:1em}.fa-layers svg.svg-inline--fa{-webkit-transform-origin:center center;transform-origin:center center}.fa-layers-counter,.fa-layers-text{display:inline-block;position:absolute;text-align:center}.fa-layers-text{left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);-webkit-transform-origin:center center;transform-origin:center center}.fa-layers-counter{background-color:#ff253a;border-radius:1em;-webkit-box-sizing:border-box;box-sizing:border-box;color:#fff;height:1.5em;line-height:1;max-width:5em;min-width:1.5em;overflow:hidden;padding:.25em;right:0;text-overflow:ellipsis;top:0;-webkit-transform:scale(.25);transform:scale(.25);-webkit-transform-origin:top right;transform-origin:top right}.fa-layers-bottom-right{bottom:0;right:0;top:auto;-webkit-transform:scale(.25);transform:scale(.25);-webkit-transform-origin:bottom right;transform-origin:bottom right}.fa-layers-bottom-left{bottom:0;left:0;right:auto;top:auto;-webkit-transform:scale(.25);transform:scale(.25);-webkit-transform-origin:bottom left;transform-origin:bottom left}.fa-layers-top-right{right:0;top:0;-webkit-transform:scale(.25);transform:scale(.25);-webkit-transform-origin:top right;transform-origin:top right}.fa-layers-top-left{left:0;right:auto;top:0;-webkit-transform:scale(.25);transform:scale(.25);-webkit-transform-origin:top left;transform-origin:top left}.fa-lg{font-size:1.3333333333em;line-height:.75em;vertical-align:-.0667em}.fa-xs{font-size:.75em}.fa-sm{font-size:.875em}.fa-1x{font-size:1em}.fa-2x{font-size:2em}.fa-3x{font-size:3em}.fa-4x{font-size:4em}.fa-5x{font-size:5em}.fa-6x{font-size:6em}.fa-7x{font-size:7em}.fa-8x{font-size:8em}.fa-9x{font-size:9em}.fa-10x{font-size:10em}.fa-fw{text-align:center;width:1.25em}.fa-ul{list-style-type:none;margin-left:2.5em;padding-left:0}.fa-ul>li{position:relative}.fa-li{left:-2em;position:absolute;text-align:center;width:2em;line-height:inherit}.fa-border{border:solid .08em #eee;border-radius:.1em;padding:.2em .25em .15em}.fa-pull-left{float:left}.fa-pull-right{float:right}.fa.fa-pull-left,.fab.fa-pull-left,.fal.fa-pull-left,.far.fa-pull-left,.fas.fa-pull-left{margin-right:.3em}.fa.fa-pull-right,.fab.fa-pull-right,.fal.fa-pull-right,.far.fa-pull-right,.fas.fa-pull-right{margin-left:.3em}.fa-spin{-webkit-animation:fa-spin 2s infinite linear;animation:fa-spin 2s infinite linear}.fa-pulse{-webkit-animation:fa-spin 1s infinite steps(8);animation:fa-spin 1s infinite steps(8)}@-webkit-keyframes fa-spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes fa-spin{0%{-webkit-transform:rotate(0);transform:rotate(0)}100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}.fa-rotate-90{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.fa-rotate-180{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.fa-rotate-270{-webkit-transform:rotate(270deg);transform:rotate(270deg)}.fa-flip-horizontal{-webkit-transform:scale(-1,1);transform:scale(-1,1)}.fa-flip-vertical{-webkit-transform:scale(1,-1);transform:scale(1,-1)}.fa-flip-both,.fa-flip-horizontal.fa-flip-vertical{-webkit-transform:scale(-1,-1);transform:scale(-1,-1)}:root .fa-flip-both,:root .fa-flip-horizontal,:root .fa-flip-vertical,:root .fa-rotate-180,:root .fa-rotate-270,:root .fa-rotate-90{-webkit-filter:none;filter:none}.fa-stack{display:inline-block;height:2em;position:relative;width:2.5em}.fa-stack-1x,.fa-stack-2x{bottom:0;left:0;margin:auto;position:absolute;right:0;top:0}.svg-inline--fa.fa-stack-1x{height:1em;width:1.25em}.svg-inline--fa.fa-stack-2x{height:2em;width:2.5em}.fa-inverse{color:#fff}.sr-only{border:0;clip:rect(0,0,0,0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px}.sr-only-focusable:active,.sr-only-focusable:focus{clip:auto;height:auto;margin:0;overflow:visible;position:static;width:auto}.svg-inline--fa .fa-primary{fill:var(--fa-primary-color,currentColor);opacity:1;opacity:var(--fa-primary-opacity,1)}.svg-inline--fa .fa-secondary{fill:var(--fa-secondary-color,currentColor);opacity:.4;opacity:var(--fa-secondary-opacity,.4)}.svg-inline--fa.fa-swap-opacity .fa-primary{opacity:.4;opacity:var(--fa-secondary-opacity,.4)}.svg-inline--fa.fa-swap-opacity .fa-secondary{opacity:1;opacity:var(--fa-primary-opacity,1)}.svg-inline--fa mask .fa-primary,.svg-inline--fa mask .fa-secondary{fill:#000}.fad.fa-inverse{color:#fff}";function Me(){var t=b,e=y,n=J.familyPrefix,a=J.replacementClass,r=Ne;if(n!==t||a!==e){var i=new RegExp("\\.".concat(t,"\\-"),"g"),o=new RegExp("\\--".concat(t,"\\-"),"g"),c=new RegExp("\\.".concat(e),"g");r=r.replace(i,".".concat(n,"-")).replace(o,"--".concat(n,"-")).replace(c,".".concat(a))}return r}function ze(){J.autoAddCss&&!_e&&(wt(Me()),_e=!0)}function Ee(e,t){return Object.defineProperty(e,"abstract",{get:t}),Object.defineProperty(e,"html",{get:function(){return e.abstract.map(function(t){return Zt(t)})}}),Object.defineProperty(e,"node",{get:function(){if(p){var t=v.createElement("div");return t.innerHTML=e.html,t.children}}}),e}function je(t){var e=t.prefix,n=void 0===e?"fa":e,a=t.iconName;if(a)return Qt(Re.definitions,n,a)||Qt(W.styles,n,a)}var Le,Re=new(function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.definitions={}}var e,n,a;return e=t,(n=[{key:"add",value:function(){for(var e=this,t=arguments.length,n=new Array(t),a=0;a<t;a++)n[a]=arguments[a];var r=n.reduce(this._pullDefinitions,{});Object.keys(r).forEach(function(t){e.definitions[t]=K({},e.definitions[t]||{},r[t]),function t(e,a){var n=(2<arguments.length&&void 0!==arguments[2]?arguments[2]:{}).skipHooks,r=void 0!==n&&n,i=Object.keys(a).reduce(function(t,e){var n=a[e];return n.icon?t[n.iconName]=n.icon:t[e]=n,t},{});"function"!=typeof W.hooks.addPack||r?W.styles[e]=K({},W.styles[e]||{},i):W.hooks.addPack(e,i),"fas"===e&&t("fa",a)}(t,r[t]),Bt()})}},{key:"reset",value:function(){this.definitions={}}},{key:"_pullDefinitions",value:function(i,t){var o=t.prefix&&t.iconName&&t.icon?{0:t}:t;return Object.keys(o).map(function(t){var e=o[t],n=e.prefix,a=e.iconName,r=e.icon;i[n]||(i[n]={}),i[n][a]=r}),i}}])&&r(e.prototype,n),a&&r(e,a),t}()),_e=!1,Te={i2svg:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};if(p){ze();var e=t.node,n=void 0===e?v:e,a=t.callback,r=void 0===a?function(){}:a;return J.searchPseudoElements&&Pe(n),ke(n,r)}return vt.reject("Operation requires a DOM of some kind.")},css:Me,insertCss:function(){_e||(wt(Me()),_e=!0)},watch:function(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{},e=t.autoReplaceSvgRoot,n=t.observeMutationsRoot;!1===J.autoReplaceSvg&&(J.autoReplaceSvg=!0),J.observeMutations=!0,B(function(){Fe({autoReplaceSvgRoot:e}),ce({treeCallback:ke,nodeCallback:Ae,pseudoElementsCallback:Pe,observeMutationsRoot:n})})}},Ie=(Le=function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},n=e.transform,a=void 0===n?yt:n,r=e.symbol,i=void 0!==r&&r,o=e.mask,c=void 0===o?null:o,s=e.title,l=void 0===s?null:s,f=e.classes,u=void 0===f?[]:f,d=e.attributes,m=void 0===d?{}:d,p=e.styles,h=void 0===p?{}:p;if(t){var g=t.prefix,v=t.iconName,b=t.icon;return Ee(K({type:"icon"},t),function(){return ze(),J.autoA11y&&(l?m["aria-labelledby"]="".concat(J.replacementClass,"-title-").concat(kt()):(m["aria-hidden"]="true",m.focusable="false")),jt({icons:{main:be(b),mask:c?be(c.icon):{found:!1,width:null,height:null,icon:{}}},prefix:g,iconName:v,transform:K({},yt,a),symbol:i,title:l,extra:{attributes:m,styles:h,classes:u}})})}},function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},n=(t||{}).icon?t:je(t||{}),a=e.mask;return a&&(a=(a||{}).icon?a:je(a||{})),Le(n,K({},e,{mask:a}))}),Ye={noAuto:function(){J.autoReplaceSvg=!1,J.observeMutations=!1,oe&&oe.disconnect()},config:J,dom:Te,library:Re,parse:{transform:function(t){return le(t)}},findIconDefinition:je,icon:Ie,text:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},n=e.transform,a=void 0===n?yt:n,r=e.title,i=void 0===r?null:r,o=e.classes,c=void 0===o?[]:o,s=e.attributes,l=void 0===s?{}:s,f=e.styles,u=void 0===f?{}:f;return Ee({type:"text",content:t},function(){return ze(),Lt({content:t,transform:K({},yt,a),title:i,extra:{attributes:l,styles:u,classes:["".concat(J.familyPrefix,"-layers-text")].concat(m(c))}})})},counter:function(t){var e=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},n=e.title,a=void 0===n?null:n,r=e.classes,i=void 0===r?[]:r,o=e.attributes,c=void 0===o?{}:o,s=e.styles,l=void 0===s?{}:s;return Ee({type:"counter",content:t},function(){return ze(),function(t){var e=t.content,n=t.title,a=t.extra,r=K({},a.attributes,n?{title:n}:{},{class:a.classes.join(" ")}),i=Pt(a.styles);0<i.length&&(r.style=i);var o=[];return o.push({tag:"span",attributes:r,children:[e]}),n&&o.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),o}({content:t.toString(),title:a,extra:{attributes:c,styles:l,classes:["".concat(J.familyPrefix,"-layers-counter")].concat(m(i))}})})},layer:function(t){var e=(1<arguments.length&&void 0!==arguments[1]?arguments[1]:{}).classes,n=void 0===e?[]:e;return Ee({type:"layer"},function(){ze();var e=[];return t(function(t){Array.isArray(t)?t.map(function(t){e=e.concat(t.abstract)}):e=e.concat(t.abstract)}),[{tag:"span",attributes:{class:["".concat(J.familyPrefix,"-layers")].concat(m(n)).join(" ")},children:e}]})},toHtml:Zt},Fe=function(){var t=(0<arguments.length&&void 0!==arguments[0]?arguments[0]:{}).autoReplaceSvgRoot,e=void 0===t?v:t;(0<Object.keys(W.styles).length||J.autoFetchSvg)&&p&&J.autoReplaceSvg&&Ye.dom.i2svg({node:e})};!function(t){try{t()}catch(t){if(!M)throw t}}(function(){u&&(g.FontAwesome||(g.FontAwesome=Ye),B(function(){Fe(),ce({treeCallback:ke,nodeCallback:Ae,pseudoElementsCallback:Pe})})),W.hooks=K({},W.hooks,{addPack:function(t,e){W.styles[t]=K({},W.styles[t]||{},e),Bt(),Fe()},addShims:function(t){var e;(e=W.shims).push.apply(e,m(t)),Bt(),Fe()}})})}();                         ŒK9œ§ŸæuÇÍQôïÔ™@èRô'bŒ¤Ğ­1JÜ­šÉi,,Ö’èAû®s¦*ñi¼\^Î³—I`õiØ$GÛvšÎ· ÂÒd';Ä9ÙXÈ=ØoRNx%¥Øã>•åJ´¥¿yŸ
TOÜİd=íŒ‹Aºjr/+}3ƒ`Hu~O’0@Ô?jòÒx:®¯ùIrrã*¾2Øš.ƒ§N·€¼ÌÉ_cÄäQ:°²†Hœ™£•À—%!§.µš¸‰ÿDêÎ«(‘’ã	«(â»,ƒŞ»¼OÃJôÜšYSd¬j¸æ6[“~êûHÂD÷xš–Q<ÂwP/´?5©¯*jz80tÚe‘^HL²Ã”ªxĞ<}äa•fğ¯IíÉº};œª¶923ñHv»c*£OPJ%ó#,Nı¶ø6]÷vÚÖıî´„Z5,ƒÆk‘½øENé9ÒçdJgAÚ%(à\dKC¥ù.¿TÅÛ<äIÍï
¢ ¦8ŠºtH¶"hRtVÔo'/EtAÿÍ†`0XTWpd¯J³† 2Ø¶’ôæLk) RÀœó†³âKeFÎ·7„¤üøª·—f#¨y-ƒFQª ‰&˜1•íè¢†ä±‘£¥åFiÔèàkÈA+‰‚~è®¤{+‰…İkÜb°‘à»>ïĞÈ‘)”ÌÄ“7ˆiiîHrĞk`ÌY?W„w”’Á§Â¶ X¤Áñ3))‘àTãZ›Ão3% SJŞgJ	tédA ‚¢¨$ãß>‡B~æ)	BÛ« ßR.S°X@‡ã¦g»$·Úi5¿@MJ2šCÙÍ¾}·jŠa3úh…ºÔT:=Î LÂ4¤Ÿ jınäcª^Ÿ;€±•Àÿ, KLÄ!¬EìE-¸j—JcÑ»óä„<9wHM…Iê?]©°<w0”ô¨óFeØ%¹ Ïşxš9R¸Î ^-â˜Ñ«Sn¶eAzğiµ¬<_fÚ72>O!Í‘ô9iÖAµ©~ÿ—.89„ĞšzrJf1xÜGº¿Jˆç=§¦“ÓëÈ{:<£_†)ÉÚµ3´™j Y‘ñ,):ÂÎÃöókIgWòZ tw	ĞCô8¡šØ«öy]n4ª½Øv©ŒötSôk2ÿÏ×àü+øôH{¦,¯à@²·Ùê¤İŸ¥=ëN’ê§Q7²&ê:Ôäj²Hf²§S£N‰böšŸ %yÁ§tPe—*ÓÈâ=%o2RÎóŒôæ Ó-)9.Òl	Jr4ìÚœ×ÙD³
)–”+§Ï!Re ’’ö"5 l)P’PmL||)==ØCê·N/$…ìòçå¹vÊMŠÆÂ!=<½k@°&~‡ròo Ã#æ'ç„0 I-’bHÍ³Ü`Œ=à“Ğ-'’³Q1Ö)ÕoÏ+ì` T7(öVLÒ¼_"BºxÒq´é×d8FZ¶½0j	á@| TVcmõÛà³Ø–¨$xÂ?«T›¨IŒktìîœÕÓ'Sû@‰3Ôi½!5'*0õY¦^p«Øü‰áÊÂ&4bì°42@ú'¤¢#bO“<”‚v4I¾nÄ¾-^õ¯h™cI/¢×[“·ˆİà-™u­OÓ!K‚ŠÀ Á‚Û·èè>¯zJ‚¶]RAå('ê‚L%œõûhY9İË„š¾¢¤Ú	Ø[~
Ô^:¤ìÛ¡£=¸4ĞØ®ŸFCŠfC4¤ àBØ¯=A£¢ğaJP–9*B;S§§izÅU}—ë³Ì
rÛzêmX·jcú(¿ÍwZºL^PÆ»ßÕ=/È{£D1é=Î¿Û‘ìHzìøH:rI’âèì&]J’¤éN·*(«Æ“× 	,(æi[?mÛlL¡ <v¥‹–ç'WPv­õ®U„	ôíØÔëñäìğtmI)ã´ç×ÔiÜ²!ógœ(cœJ´¹ &ÿ0ãª 5ıÁQâñhKsé~¾Œ•4"½jU8’Ì8¦{º¹:…â3u9Ùw;1©N.6“¥5ÅËA±‹á\*ƒ};0|sĞ/[Ò-<RÈs2û±-°!— fÖ”!toÓ;uí Õ]¾L/İPÎÑeZõ*5„ñA»
%]Ä;Óùbß)É‹q&ÕAsÊ¹ˆ¹ñÛ& c	jnƒ îËÙ’ât	F¼£ê—EZüá®(8/ÙcÇèùâ3…»¢g·!\Ù¤VÙd-if0o‰İ+“8¥Â5âñ¨H©ddü{²¢ÖÂÈœ×˜% DÎ¢;&D)R‰>M\•”'xAìß› Æè8Z{Ñè©½ŸÅõyÛ|"âa'¾ @&^µZ²gCCÿÖ/“ÅpY¾ïf4Õº<n×Ú?‘¦ `(zsJ‚M’S>©Ÿ©RY.Øù©Ö{ Pğ=È«:Iª°LÌŠ²%1HVs5JrVÒm`äèMlI«Ø=ë]¾]ÇVRÑ™é6˜JÉPÓ=Äé¥± Ù9âp	åêÙe.È<İ!’‚¾&ß,Hæ¥&4‰4§GràaÈ€`zää+†ˆF
’¥¨¶¤y"§ğTµJŞDP+”q f5Í¿¢ç¢ o·Üvsí8â²H_¿ ¦?GÊí˜Ï ¾–äjTBc²%	ÍÏîÛà4äÿDˆÓ¤!÷¶4«ÚkBà~w0y;'ÿáí–øÂç?QI¹ÛŸ1ÒQbç‰ÂWmNüù<@B®ğ@ A×ÆŸaT)ïüÜHÙ%\ÎçvòªŸWNĞ¶¯@=ûFj|uç`•×T<%øD™dhx¿ŠòÓ„Srº+ õƒÚ•%!{¾D1
£JÅÜî1FqIcŞ©™ªiå1µœ¾ İù©Öäk’fË`ªRTÔÓÄKTóú#]÷¯é5\c£šªc|Íë·Ù‰9kà¤ÒA6MÊ¸ñ 5Àt¯Hr^‘—Q‹iLU	ŞE¬ó£²FMcz‡<µûüÎĞ’Œ8Û'ååqE%¤'® ª`×îy6Èa@|{ºØé¹VbjØ“RÉ»ULîNx`Jî²9{É`Œ¹Ê"¼h¾Ãïì×¬à%äTO¦#­ z€+Ê›’æÔõ’ŠÄH#¿KêW»J€7œ¢0+ÉüÓÏÔ\éÈL§1ƒÇ@Œ9•™ñJ,êÏé$AÅEàç^’%)PßìHK3¦­
ˆ	Ág}’ªA%w
Ê$ áiĞÒU®`°	 ‡¸fÌôr$/¤9.#p¬'YôÁQ§<M%h3òÆÔ=ç³šıœr
*î‰eË’æ=|RòúÁi¤Xèn'—Tr™ii¯h+—<}ëµÛË%ÅeŞºÙÕ()¼rEÖv"ÓòÜ^Ÿç3x‘¨`æ¦#7åõ'Do):*ª) rv´Rı” PéH´È–£øù	]¯qJŠãy‘!ºC ŸÛYIõï›Èè6ÀRùÑÕd
 ®o-(8‹Vdn¯8ûúÅvb<}5™Ê±ƒjË;1>]R`O:Àw`£J¹ŠP¡­ ˜€Œ6æ¨6oSÄDt(5EÜñŒ½Š.4ã¨ÆDæ‚LCO…Rë[‡HJjB5<dA˜ß”n.mÂÈ!]Ş¶É¢ŸAö_¬¨âÓ­ûŠœêÕ@öO)…:¤}1Ó¼$T‘HKÃÄi”YÀF }€)yìş”}ª;ÜÆña—² ¨æm<w;È‡ÂË·QåjNåeĞš¡¸Sğf’×LhH ·=g€Ú™
D¾·Ä]¨sI™Â@º"3#„Á(† cæŸâKã,â¨Ó7šİØ’Çâ6!›—Ù. å6zÚ^^*§ÛNL®Pªq‡IXš3é¶ƒsŠ¡ø.€ş[Ğ¬!ãV‰±t0I“¨ábîÛÙŒ£+.ÕcR+'SY²(›èoAKFPÈ+IØ¡Õ§öêE¥¨Åmúı´hiIÆjı åŸÈI°(!YñTI¿ÍƒJõ‚â2P¨BXÉÌx«‚‹ÉQ\KRâş5<'^Ğbı`k¾±û+¤G|OMî}Ïj^“õP“çyÖ÷§àÂu ä–¾…tîœ‚P¸rğñdË¸!=ËKÕÂÛUX	Á n3¼‚I‘:2ªn¨Şƒ4h= Áuä‘wÁ¸§š·ç
AK&ïUš›á¨vÆE{‚µ$,Á}´ê"éÕò ×}Á°XÍ)Ueïã3¼¯ Œ¸ÄzöĞDNy›÷év¼¡–òWÅ€î~‰«Á¯qE…i¢fZFš³`f€ÒãÓ¸º8%¶Lrõc½/&5(\uß¾oIèûˆo[6UI·BË&æNAYqFF®E´‡Š*]˜y¸Ï_‚¤¸Ã“í¿^P21ÑSTP{†r†’NşBîzÃô·4ÿSCŠ– Ö¢¢YPùj!…êÕd‚r:¿>"¨¸µñxtŸçÍ\İ$Eç:i	52?‘ªq©Ëaª[Ùö¥wWÚ!pMØæd-	MOëğn-pâ±P\N—W©"Ç£ş–ÚÎHâ1z?”šj¸€l·1= àBEñyÏXaæaNOOísô¯t¤5-ğ$ sí¬x”Vd
IËÆË	SZŒªÔT’B2´mˆ×î “üFÂ}Úôv5æÁ³¡ñüJÂ‘J*×µtà’:7ªûäÛSi]Pª.ªàø‡rrŠ¦%("´ÄHjC¶o¨8QR˜­Qì”
ÒzÕ‰Ú}RË¿¦X¼P \BîvNé] ö¸Ø¶[’cÇˆ+Jµ›²@ï?Y‡"WVD­}›Ç,¥ãpËM=¬¨ŒÌ2JH”A*ÌŠ­ò‹\OÀ(¸VX“¢Të2¥­¤(hÊ!ƒÄ
´ò^.İQ X!×«$µ)˜Ò/ü$à‡"ÔüÇK
‡†>²ÖÈpQNY&tWlOJê©&êjÉ—E©û:rJú—fßR.D×¤ £t¹èå­(ÄŠ&¬M,Š®1ÅMvb<9¹
’!4]QÜ¤Ã¢ŸÏ	!° Óš^°a*»Kt…Wäw†q}”²#$Ò2³*H›ß©ÉEpoıı(Ä.t¤:€?J"ôI²¶`¹4›ÚY¨£ß[d[4KS-HéÈm‡Û%f80_	¨7ÇWÍ)‹Ê)Ï¯Eõ=%­¤ºˆ@„›‘À(î(oYšÓ/9BSxjº®'b³¯¡ª§Œ Ä›onHqB¶íÕ\K*‹ñoï‡Æ‡K«ò ¥ØØ2›½!…OÄô•d‹/R3qGRİˆErYp4ÙÅñÍ^™Ø¶mA³˜âüa“M}dR—†“_(Ì”’Á¹¤´ƒIEÆÖßôŠ÷¶"+dÏ5q¢@å„~púÔ_PDÄá‰º;— õ*¨È’<‹²<{²¦t×eO…(ÉY¼ |	fa—.'àúòó çó.	ı×_¾1'5ù¯´Ø{ê€]…¬h{QN‰7?Œ`ÚnOÎJ@‰(neÒ¦"”Ğ_Ï`W
íP˜¢§7'l»woNAÊ¿ 05õ›öV¥n·{Š“o)Piñ°´˜“ÊbG+†ÒãL«wä¥Enïâ‘(ØS?š–ŠÊúÈSğ‘¥åU„é÷í)x™’_@LæUdP­#²ÙíŒ¤hn”€ñRS13Pb!øœ°]o<Ò?U´e“‡U	XØÉ¼6ñ8#'L3'W%èA®¶ÕA]íàMÒw± ÊN¡ØªYÅÛŞW`N
.R4,M©$¹îÛñ%[\r{šÙ$UB¾‡Ş–’Às ÷ê/çîQJäùúÂ]%•îè o X&Jè¢Z²)
dx®Vô¥&”‹Ôq^fâ*1ÒÖ’OLJƒûóàHMXg0i;])›b€SĞX	È-Â(µÙ„¸Ú/¤”Tå
–¾:e·¯¡ÈÅGĞÊ@%Yıï=ItÁ;'—hşä<òíRO¿„B%ä¯ÔïÀeò[h†“ßĞbù¡?¬–ÂX(c$©dÌ©'uCAÆ>ø·É‰-zëÒdóv¥'¤úàçÓÆ)A+$7âª‰Tt7exàm‡Z
ßFš”±S'UKÙ-ø5…¶Eõ´–dÛ‚ ,ŸN©J%ôŠñåó)lÂTwV´£áâú@zYKâgKÀY-³ôû!8(!¥½¢©FXÿ††¼ÕÖ#qª“kÉÈ»ÚÊ#öŒÿæ -) ¾ã aÿÕŠ¼R„>VS-ÈŠR(,AN0µ2¢ Ü“`T@7øfI(R"ƒSX§§v18å%¾=2ûœÔ×H£ûN:—vI%å­"iõø„x·
b{0}F8û¢·€¼Ñ.*ÈÏ&Í°¿Îğ\˜åV‘¨™P5Bà·Èyº34D°áB6TAö/?Ft*ï²ür_å‚Ğ½±GtF:Êƒ:J5˜³B/ …Ÿ…((’²Á)&¿¢óÏä^K[‘$Í€TÄµ-(Øé©„*Èöt…äñ4AÈ„K.zOHÌÎÔ­¹M·Ù’ôƒ#~‰ÂÖ”|›ò[_kdV©1ˆŸÔD	s&(å†5ïÚk-—ı4/KnÉíkÚŸ †è	@®ğÙû£ĞRänû
¿¾T“/Ğ·C¤ h t»«-Ò¯Ÿ.şÎXA¬íëÇ„œĞË<?ÈÉ›ãÛa/†~TïqV¶¼âWù©V›SŠ‚ƒ?iå±D¥Ğ{ÚÎerÒ­P—7IÃñí	¦‹Te%FĞVÅœófÙÉ-ıÄvCÓÀ…©nªQÄKägV3£2Å¨%Ÿó† UÔ¦
ÔR¶çÜäAæX'u»Ï/onÉ¡!dd»|9…@ŠnED…®:”[rjmP M4ˆ*±ÄciÖšì6€µõV:Ov¿ÂÏ¹Ã‘r²äA0éa@…œTu¥û˜cò
ÊuN»„wPÂ³ïñ*üœ&UøaÓ¤ğEê¿*´¾‡Qxqîìqñœ`w€¸=~)Årù[r"©GÌYÿ³x¨±í¹½§ç„'İà÷ÿ2nWR%TO/iµÎ°BÎD(ÑR•|¯ú\ÎšPà‡5™Œ‚ë¿¨›¿QàŠ1½š¨ä8‚±(!)Ö@•Œ
«lEó7ïÆN~QwA´$`ÒµÚ–®)3ßA~ãîLN0OèY$ÆŠwÈGtRAwü²|~Ğ–·rhÇêûÄÇ
ª</´(ykVç…¿ñĞ¡ŸOC•«ü»A¿Ö©d*/ò”Ô€G+	m`—á˜sÖ0¤4@Â¨ûÇğó›1­¦dUã1.à¹ôË©UŠÇüøxZÀ*­2¼v{ÆQÆŠ/OˆƒCHÉO·$w•'ÿì€ÿ‚-š ˆv,	Ğœ:ğŠ·#
\¸eÃì¿Á[Sß¾o(ıÌT›˜w@¾DÂvÔ”-/$Z|O£òø‚ĞÄ¢*A•Á/8µceôàa$Ä<¸À
öËX˜$x¾_İ)$;QRÑöúYğ© ’j{Àû‹Š&×ñ¹)áËğp ¦klmC6‘÷jû×ç„í -üxpA ¬)Ã0ºôX8Ş'#d›mM€Ûğ9yÆ78
P}J~Á?S°¼*46ãÙğ‹Ê%yÔ¶§Ôl²Öl	‡hrKN¤ÍÀX»®& -à*1É¸f-[(P5€â	>«À?7ÀÑ`ğ ÛÏMCÚzC(
ĞİÃœÍñÈ|iQ6•ªü
V”ÂÏviB¾¾8pì|’¢áÉª£äuVBFIÀJ%Úû(aÔş¸áş#a%¥„,YG˜T´êÛĞGôèSÅÿLs,}t¿ôå¤…	öb^—NJ¸šµÓPÀÃ·ïò†b4ğ)1Ï« “'GIA2X]8ê¾‚Z&Ù®~L-åG¥]‚dm)Û)2{ÓÑòÔÈéº’–œ’Øœb3?sªª.uG‘l#µıåÃyêkl­yNC#ŸŸKÍØFákÿ 	v©~†œ¨¬øÒıŒİÈ†pï ûb‚PÖãÒ(tüö.HÍÛ"”i³RÃYÊ9Ş› py%jú›Á„ñLûÄÒY9Ó.Q)¨.bÚE4³0‚Lã´×ßı†0iˆ‹¤P‰î«ËÕR(U‡nG™‡šTT?Á¨Q±O=A½h¤¼T=†Œ)Âî?¬è(ÜæÛS)æ"ÇƒŠIsÕ¨yÅ#Ô±æ5ÁİÂ#bÇeFTë° ıôØ9®ZòQ*F`€p´äƒÆä^,«¦¬c¡ØÆjÿIİšOÈü&\	bîÓ”Å°MCñ/_f3€¿)J
à–R˜TÊŞ˜Q“+ÕwAÂ€‚l
20@;áëp—ÏhèÀ@)„mG»!È)æû¦õ¾<g((ñ'¡Æ£UP•ô0GMNa+ß¾?C~R¥Iğ*T^:bGôøixÑNÍÉ"Es(-SÀQtÅn@êOHä¦’mP—‹êùĞj8Âa?¤=“z¨ÁR‘¥­ô‘ÙPà$Ğc`¯"tŠ’Üic™Çï2öûUSbÁÃ~;§„`¯±šÍL•C•@†E³–¨BöåcGçäÁBàìG£¤r¼;?Ë\úùT¤ à÷6tÜ…UG 1ôÇoZZ·' ¾Ê²*ÂñãÊÁP†£Hb ‰KÏÜ©5±~¸LP™;$:ò¶fÑh‚gHs<·E«z é 	$F*{„Ü²®GÄD¹TAö²u		ô9å…>ïb+û…Ì)w	¸Ò<Á½?BlNe[¿„ü!®œ”›uTyâiùE-…e›¥n¶‚î®£ª.ÒTQÍ@JÄOE*²vóïŞÙÏÃTT¨ÙwØó*B+1)UH!¥Æu¬HÁV¢9x+Ò==	0y;˜$™=uï€Û×Í®	ŠíÉĞy¥~šš5e$xútÿpI}+-Yä\ó’U¾YŸê™ø§ö€cÍ7ICTúÓü||=1şXÈÔwÿÚ¨,HÑõ´m„J© ŒR}äMyEùè¨ÿ<0Áø©ÿ<fğëbTÂÁpWš
Ò»…¨{åÈÑåÛ	ĞxjMº÷s‹×"u=7XíwË*«xt0&6à’á¼4¡ 
àB7A‘‹ïN¤’rSšÖ7PjøQ’Ä³Y“Bı=Æğ&ËØ·CaMò"S¼’%¿Ñ³ #ˆŸêQB)¤¨€ŠRTÆH	é0ªº†û+*Ï#Í:‚Š8Ò÷´‘4¶×Ävä:ğíÉªˆµOˆJ[±
@~ãÇËUTd‘ùöt29¥Ø+Ùä,Õÿj W>'qômìœ°ßw}CEvÑHf|«ÿK±'ÅLï¶ˆ#¡aÔ[€Ú4¼Mo5zG…KíÑ…à#! ÀûYã– ÂßøA”ûÚKh´¤¢¼„¥)U„@QÊB«	±š”«¬	³+!m_\Hï	í	œU&˜ZR—|>]r{$,_İoİ¯%¤ …u4$YM~ÍÄ‹@ø´Í¾¢ —I+¿íÇ]“6‚¿ìªåä€x^µA’Û-LÃI”ĞŠ°F/TŸEæyø%ìœ.×ërëíÒ‘eùÂjû¯å9yA?“_àè2óSù5ÄMƒKcæÒŒ´}ÿKKº[ø12²¡'¤vê`=Pv(é‘2bë‘š$"µƒÎ4'|(’ÿ‘É-	=OİëgUÜ‰Qİ©É‹ø2Aİ§¸­k·IPn	Hœ +iÉ-ó’úµø½PüR÷šDÑÔL}
/d„B7‹¼ò» ûÏ†æ¤…FBW½"@ø@XÔ­+(2øZ¸ìO¯Ñ‹n;{ùñ¨ÒX’óŒÓÔwG!ë_(¡¯–]E#øœá-pôjå”¼,ÍéÉÉuˆ¢GÆÜ™‚Œ½Ÿ5]`‚%şìÅ5”öƒxœılIE% %…òàØÒ 
	ñÓ­º¡-·”f´K™
ÂIÚ@Š€t?Ã7uEZ×Ÿxì
Bìÿ „~&1'$¡QÒe¬È3öû2]Ôªk<ıÿ[8[‚                                                                                                                                                                                                                                                                              ÷IöğR°‰¹ûx” Y›—
>Æc$S7ã-§íì˜+_Õµ>â>Ë-ÌbA‘R|IsCäGS±Š/êûÉªmÂÌ/‰‹½ªë"‰&xY6ºsÀ¤¹¿k8¿û¬eÜ
Šæm^ŠV›¢CÀãÆçSñò®IÜ5“6íF^’9H:ª÷}—ò›o»Ó ‰$<¯ò)#(!Qã$OäÇ¸yÿB Ë~„£A«¦(/DÙa²»<îQiZÍÄ)’0©}F…s&İ{MºÔ,A¦+¦£mÓJ÷ p’å†ËvìÛìR†µ=²§…ßç@JèĞt¤mz}3ÖÓl²×½”I/		PI²œà¦™æñ[Z2Î¡©!A\c)"@)X3'Z u—ÏDÚúĞmÈğ"æXÑ®Eï5÷=ä’ó¿B-˜^%8 &ñÃ(sâ-[Ùˆ¨Ÿ‹‹hBp?†";Ş
Hêã"Ô(µ–ÚöUÕ4ì)í
k‡šˆk ‚Œ5èL:×[q¡sObºªh¸}Ê™ª´b¥)òBÇÁ%nFê‘FH7ö\©ºÎİÅè˜Ú °¬:SÇÍíQ
ÒÑïî±	¢§6äUD'Ó±à“o«]ÇèE7$ú4éT®Ÿú¼êE Ê»·½ìêÜ´+¨P@IrÆñòP×î—(mr˜ò‚’cÌÚ)ÌG¿Ú®Nƒ±7º2»\È'r¯!K*‹^¤¼âá£É"^t¸”ãÔ(¶ú.Tï“]&óùIì­Zb®ÏUÇ“<cGl!.÷œ.r<î9¹s½ìöaú}AK{z×³Ú;ºGãs0ûİÆé%,L«ÓÇxôpCÇõ¥ÕËí?Å£É9úıB2¬¿ÌIZİ‡÷Ë–ç~v6àı—kÀ{ó€™÷ãrâãŒcHjµföÕ÷Œ]TŞì$‰¶!Öãìl"æëßï`§ğìLvÄDgÜûÌ³7]+Â³­83èM0’ÁÏ–Ú¨şSÓöÙ•Á1Ğ#‚ílIb®h³zäË«¤“Y«3;àı‹æ½ ¾>ü¬™-÷ôŠ8â:Š^„kò=<PŞM±Åg×Õî]s¤>Û‚ËæÂJöm¨›ÍËkÑd."ÑÊì`ä»U;J•xåø«0äï_ÙXT§Å.µ=¦8¢àuFpoÈ+Cn\ó,…†Ìi†Æ¾…O`gÜI?Õ¯wÒ]½”û'/v	]ªë »ñZÑ[ºSÕ/	æûÍK@ÚÛˆ(„­C=ïM²m“ÿëÌsÌ¬Àé
¤!iùğÂJã7/Pàÿü©—O'ÏñnØˆ(°áÓæ:keûæÜ¯Fòßx‚†Ô`¿}ÂWñæ »áËù#Èï\ƒP}éM¢Ì„ô¦ƒ~¥74w2!â¢¾†m_>À[X!½îcçÈ‡†ü†”lh*Mg˜P­ ‡ †¸BË¿X~Õ^À¯÷bËìg'Q>ÛƒRhoì^F0`ùbèÒµÍ›1‡°qö."GÎ¨1m¨L,Dv’ı@²"Fm†Ìq\Ó×„K’ÄF°4¿Ï9~ °E„©Í(ojİ¼¡eÌübŒë”
&Ëøïİ*­Ù'§d€ñÔvt§*áüf4ePOeßaø â•Š1ŒãX24vÛÒrƒrávêvâjKF;ØmäÖ°¸
„ÈeÀÆEŸd'Fâ·ğR$EOô&¯%¡Œ~¼]İ*]»¢üÖÖŒ×mfòÇæ•·T:w©c¶¨}«|
¨µç8fùËöÎÑÇÙŸEø8|‘XGS( )ZÉ¹zŒ~R¦ºŠJ¿]¶šlĞjğEÉæiµs=Æ¹Àèq#ç•†tcë€‹($24‡XÑ}ÛáB7ä!R•·Y^Iµ{}ší™iøÆ™Qé%‘Â’@]E=ÎƒÓA6êOÍÁãûà–şÉMı‘i¾~9±V¨úl”UWMY MD„X‡ï›‰›¡Öšëùøpá¨{i¿â©ÊnQ“ãuûn6 `^Y]•$8ñÓ»ç”ø;%Ñ¿@¨(,uH\F/ô€j³”/9E¨×QÒ1ŠÑ|MïÖ†{–«œwEaŞäáßñÃWî{bÇáîqë4C¯I^éê'f±‘“…x¡¤ñfµ° {í¨;÷îö†÷¸zäU“Ñğ!’â½e%Y+ç}Õ£¾Õ N“§™ÇkÉ¹‚¿%†‹ÚğnV±±½b%ß›{eyÕ şÆò†/s)6v6÷2ølŒh;ò˜¾¾ApÓØ$L·Ú;à›–ÒkaîíòÈg€B‡ÏqÈÀëpõôİïÏ_Ôáí×.Âˆ;§<)]YİXUï'¼ŠÙúåïÏñdáÛØ¡Æºm^&ÀR\Š¨Šï^!­¤××ŸlÒÇBk,ëGq;0áOb\=~b;)GZZÔfK›¾ñq®ê—ù-£ã$ÒÕj¸YeKù5Ñq^®ñá=µâõZ¯L ÛcTº`à2Ç±s	ËâŠ;ÅyÑ.UŠå›|®R¶êäæLí–¬­ì*Åé¨æFÎ®&‡y¨:!â¡Å4[ŞÆln4Ø¶R­›3?»>“7şİdí$½ïìÂ1»à%–Tã¬aL³Ö•`n¾–äÉğ06k¬u[7Zçæû6Y=œ.ò•ÍQ5Â/_-Ø|ïªqYEÅ…®(½E²:?nwÕ6ŸJÔçÏÉbŒ{q¦(Z~›wóÇƒgöu³UåLfg+"ÜFğÊ{³Áì„ùY3=ƒŠ˜Á¸·¤m[<¦ìË€îW£¥Ÿ,oaÏŠÂäpÂÏÂi”.}±;.µNìã¦ZÑ+s¼ì×–ÌIcÊjŞüÊ…Êp²kö¸{·ú~"ª
µD°Oß‘§|.xqsøşP2pmihù±ĞbF¶'~+yte{·('Á»ê£öÔúxÇ30<]÷måQQ×K)¥Aö1ÚšXãê4°®'ô^Rc’scÏÃ¿¬²§ÕIÏNâU¾ËĞPŒ}hWMSg[K.w¦š+\†8âÛæ<c… ÂÑÕ×cK¯Æ$çnŠ¡­B"ŞkX#*wÈâÄ#ä'<µáEé*¯!á]–ğÔªHí¶UÒ=™Û&„ÂÀg¨ç;^Næ ÖW_Äµ”?5¸{¥‚q> 	ÇKáuæ|¯iñ8©Ú¤@D_¤k ™òŒ°Š ûaºä”„¸#^ ‚½Ï1NægSC­ÂËğu^ÑÔŸ	…nÅ"KÎó®Á$•ÄÍ&BoYp'Ÿ¡©¥+uìE°â4#µ’k2¢iÆo$|;;xÏÓûXxkeèF^G<«„§éôÂv~–x¡Ê†¶a×¹ë¡„¬kôÀ5}ÍBQ:7Ëø¦,f§úQ^Å—Ğò¨ãZ—"é“ÚP¦çy`Û «W4¦Nã`§®@¢gYeX0|2FŒT]éIT×„½[†
õJ‘ ˆSüÿØ2CóÔU"$®c	eÜHWPÕĞm¢Ñ="Ş¼ßQ xÚBäm ÀŠ~qW€t/Š.¾Ê b¤ç9â¯úQ Î¹ÚÄocvadG%œÅìâÊ>‹»¦ˆ¦PàšØ¯Cw"æ¥t½¯C¾WdÔFğÜ”Ièp°¨%zP7ãRŒ¾2ãêOYqgŒçp3v}*Ø+3NÉtR9Ñ0i	±’¯y90_n\ÄIÄˆİ¿6H­¤ş›ê¤éÀ2W¥§[îÍ\7ÅD«³c–³ø¾ã9yÅİòTkïÑ²·áÔöDšKi€Âö@ÊA¢ ¸/ŞzPø»;RŠòyöİù«zÙÊ@ºÜ@1”jcÃ!ÛØ¯mV¥-‘m¶ã5t8>!#¼ó ğ©Íz9D6™Ÿö¼ezój<äm8(sU 8²’Ô”é¬m±Ä¬…Ú‚\—]±¹¨^n­cŠ¯ñ­!*kïñÖĞOU÷ĞvšÎUŠ
Ù\+_ˆ_¾™&ª0ËàJï–'^¬ˆ=+§ƒÆ~»åxŸZw„y¼
	kâDõœê>x:úJk-kdßá0zª	úhgT™²ŠÅ<ú˜…âLsQ	«õû{Ò9÷Åüazƒî<xc³kw>àIãnÅB!¥ªqhqUü<®…æUAl¼L7Mâº·¸¨´‹İk, ¡4}&¥?WÃ)êD¼`¦3"eõ¿ëÅÖÌØ8
¡ñE‚ ·KÒPYÎ3N…ƒâk/œ\œæUîˆßÚªDpq“nuûiëkªô0”b‡7Ôê&‚S4QÛÿ¨©U‡¢t«œHª–¹[¸Ü¥cÓ/û\oR²õØrY¨XQƒÂcè]ÕÑ £ı™ÿy”(LìLD0âÕg³-ñØÙˆx0v"!K7£"©—:€äÓK	ÖŒ@aH*=¯pt)îš¼§ôPóW0K¶¬»m-_šÖ&ÓnÓlËšerÜƒKêÆ4é¼wáT	¾ÜY¯ÍEtºUÉ«ª‡D{Õ
…@¢C™ZÅğY-}­J`Ÿİ¸k÷&kdcCöôzÑH—?Mb„#5#7Û—¼O}RÒÕŒp}ì%©‹ŠZİE€©•£æ¦Ö3vÈ<5r½†Ü#Òqn¹´’ÓåJKÁÇ
Ih˜QÊëó’µ†IöæÏG*Ê ¿íiÒù–X,»‘úeW3ÈŞĞ"á&×EÚ -÷ñ¿°¡5İ	‹­ç¹­én×¤1úó\>ît·+n.¥ƒ©ªxôI»oîqı’OÜL¥ŠÆ•qÕƒÍ¼Ğ¢Ø<T	Tß
{µqâë|õ‡*9„e;c^¤›·uRJÿk±èšàdU(€²õv²àÉù2n dËëñkl-ÖN(~ßyœŞ¯XÒô7İk¶ñ¹ğıYó9ı8²®9ş¶~ ¿/H"Ş’§«ÁRœf¢}¤ïïZüÓÍöøxVKáù>İ~Şg÷NOæ¶Ş%~úë'ZfC3fI?;#ü¯°cƒ1¿Ÿõ,Ôö/{ˆl:œß°³'ØßŒùü†İ‚÷ä.÷pÀh6hÑ	ËÈWvzN°KôJ¿’baOrz‰ÒkÁ›3m#PAVBøˆëÔ©§zé-ÜŞ6 õÛï;O¥¡ØdÏ=ªnÉ]ÍïÄÖk‹>ÔÆ5$ş€‰®f¼ÇB‰5¾¯ËPyÒ(Î~†EáQËŠ¥c¶$c^§œê“)lº˜©o‹8ıJ¦]˜@UP0éÕ×4™_ï}’Õsw`’Òª*°;-ç¨ÊÛ_	ÙaèøˆlÆÍ6Ç‘U~ÅÎbáíˆÔ¶e'î~½ö r8€ÄØÂhò£¸lV&Óİ1Jm9Ÿ^¾ñ&‹©r/.‹k;İÙİìå‡§xøB!dôG]¤ËXBæšyÇùuÈÆhh'¢ø~½¬ÛEMâHÔM,‹;ãÚúÌj½¡wU‡Ks4Øx\¬Æ h¸·¶P¬X`f1‚÷3-c#‘¡-ÄúúV®j•Ù»¦ÈLló®äld-pxCJ`½Èµ”J.°â©1Ô7˜tY,„¦hªğ¶³H‰Äµ9•Úñá¨…§ÙÀ&j_!ùÖy–Œ¡²–D½l8Å0R]ÜÉ# T2#ü:¸m@,ct–T†<N¼ùÖ‹·Tx€p|y£­v1Š"¨ÈIYb¯Â`áf‹âWŞÂúõÅaX¿$¦¨ŞIi€|:.àÜh-g40SÛ
Ã„eª"Ô†_Òu¢›p¾ÄBaƒênQşü2ÊKêB!¸’@0ØKîªÎñs„üæÌew^­cu6š^5*7µúTk_%O1Ê:6²¬¬w8,ï”p¡´~x rfº’ÛÙbÆŞãn„e¶a±
âòœ:ì2v0,wS$d MIŠR‡%l•%kîZîRX|¢‡ªE,–"ÕjdégìísêTjØ\s_Z¡t 2Ø#C}U4ÍÄ‚Òt¨ú·ñ6a¾›Ç‘fÒ¾Š»ÓHH[™yÚİ@ˆÆ³d}–Ú“™¤£Íô]àXñÇ\cø˜Ş¸-ze£¦jà]ùÿVŸÏ®`ƒP ã;­¦¬ß%¯õE¤•ğóñ~"º#OEãOS i0şGşb‘¶w»lzp2ÖäZŒóÉ™Øõ®ÁJ‚ë•†¼aëµx/x£&Oßš¬ O/Z^è†ãCl³[Ç½5¸Ü˜Ò‘‹Û¦#´ÅS'½ºkz]-äü¢.J‹snF•”n{ÌDO"ÑééENÓGc)^`ò ö¹á	ÚÜ§3‘ï†Xô‡Ëbó õ¨¦øZP”'ğìGróïü÷ìU†äl¦lÔ<ù%¤B«¶j!&F{òg(“ÎfÃßâ€>ã`¢uOúpàeéÍÍSO#’¹HCŒDìß¬Œ¨IŠ1=óÌ¯èXÑ?,ùKâ‰³D•%}g¡è¶—¸>HEŞSq„ÒKœÈDE¾„Éä©	=@C"ËH¿D&\Ìâ«q¿ÅÂL)Ç7ÉnÛƒN í”8ù:Áº ÔŒNh
¡pjfû_#nbÊÇé…QO¿ôüBÑ"ı‰PvN!n¾û{Xh ü¡`,†ë7›h\ó:G(·&”gcÓˆ!VÉ+S*J9²#lÁÌ¢CÖV)ÚV6P-Œ°‡ÑõÙ‡r½+D´’­Ç¹­eüÆy'so©òIñ<‰3ÁB
Ôßk‘œtT½ô¶Á¹¦$<y‡B¹¨
»§{I£f†h¡œ¾¦„7~¶#È €"Ó!@KÇì@–9w¤Ò4·q¤8â÷İ2ílYµÛÈy­4x”eËJLÌ÷3_â
è‚š¶üÈ\/ }ÌÓ
ékBíé±ÁX[œ_±q¿bã¿Vc±E›B™‘ËfÜøTµwQİ”¡í°º-MÚ
udÈ'iëö´B†Yö şÀIì¨j…£Yß%úÛ""7§éVp¥°ï„¡óv¦¥ÊÙÀ.ú³£&3§œ{w±GEä1˜0Â°ıQ"™ÀÅ)‹±»sï]gßNµ¤:¨Ş`¯š¯Ø¤PÆ&°³(€ÜĞEQ<Yq>|c•İzo€ÎÌn±
hhÅ˜µ0ÄÔåGt+ª¤÷ĞQš6™É}‚b¥)[jÒ&bÉ-÷˜—–NâXÜ *Ò,ıpÛA˜J¦—údÓN9ëŞAUõ¾£kÒwM“{˜gmİÍ©ğ•…bŠˆlùRÕ)©ï„PS¥yèfÇşÑZ5»œjâUö@ë§BC¸’?ª#º8·Râêİ|Ñ«µ­ Ã3J†ŞŠŸ†©·g3í/ó†VH\Yé*BÄ¦ŒœXï½ãß^ DTû5¢Jw %¶æ·9]÷÷Ú^ÉÒìa7Ô’š×ëe[³½’ë" ÷n1îM¡Ê–B?°±÷w´î­ç<Şâ8–Su~‡ç¯ßŞcƒ÷hˆq,BÿW^àÙ\É“Ğd{Êb96ÔƒŒÂî¨±ìxƒJéR‹~é¢ãA­Wş¢Qº?"¡)H‹c^æ£ÚYØ‰Z5<$ôIÃ+Nûƒ5öŒÖ¡¸ªj)­Ï"\º$pä¸FYƒEÊÆŒ› @5+ŞÂ”œU™rDHÊòh­æîÍ^¸Œé%¿›åNÍrßƒæ7Í§êÿ›Ÿø)9‰‚Py¢wé|-	«	.æ¶i…é^ÍìKx–×’ÙGé0
’Ä¦ae­ñÕÚ›‹!Ø/ÿçÊm›îØtÉ<`ì„ùGİX¸‹-œNlVÓõÉ‘p_ót/…f]G¤R1t>ß/"ÄĞÅoÕâ•„ÓW§¥möÍÚKçbå‹Z;İÓ——ú(na‘uÓæ:[ùxFš½{—ëIm­2]£BIÜ—å¨@Y*«lcÍ‡ˆ¼`|§]_O³º¯œ”-^/‚,òâåöbnÅÚË·à÷2‡f›8&ÕkRş')ÙÕ"ÍZ‰+Uì0o VSšÚNTÓ
°¾ _Ş‘‰cII‘lIïs$³:Ğ³Õg:ÄÀu|-è/F…wäñø„h{mıŒw«Ìˆ{ñ#ÅT8,áJûû†¡!bcIfÎ2*g™öõğştßİyi{ùJ’^öÄ  (FÁY3Èµx§á¬7³7°SS$=æïQW<)#uu¨FÁ´ªÛ]Ñ«ÁÕ¡>µPÅJ0 uÈßgX‰î#¦ĞŠ+’pŠİAÜœÖğ«èuº+HÅ=YD¼Ô‹ß3/PãbÒKa£'PTÍÙkç
«Á¸`À]I••enÌddÖyU¦Böfu/‚Óş*·;D®FñŞr¬1ŒƒQ6¸.Ã‘(°ıXDŞ" j.K­U
|¾a½W1,˜éB.ÕÒVŞb_>b¤f¦D¨V) ^¤j>!9î•í³è¦KËÓ‡Q5m¹gÕ×è÷´"‡Z‘ãH1à}-Ğ³XišI”8áÜLğs°ä7ìx¤…-:YÆDš„
ò£ØŠá<©Z0%!0¬j»'rqY[Í#,!"ØØ(¶tsÈ_¶àh!-&+^[[VÅa=gZÒÈêŒĞ*c8²¢\”âNûÜk³#º¼¼¢2v’Ã‘ 7Æ–¾¨UÍØ ‘Ö˜˜-ŒŸ£”ädé+ñŸ.BÁSWú¨ªp/9óV,çvÖu\«xWì(ˆ±{”ÒNİèİ¸æfÿÔfOB}÷‚[Yô8:Nu8AXUÂÓ*³^ô<QÏ‡êùèè±?kõß¹ä+µúb}1ë:Uz²DÌ_°Ğ™áy‚ğùUã:nÍ
nÂÇÔF©¡º•eYç'Š!“—âÎ»Z6¤X„Ø[Î™ašKÑ¦¸£!^/1õ®İƒÄl)@ dÚš‰º¦B[SşæÇäLRÉ†ñWGY\¶Š.	í6ä&¯„¡Ÿe2‘Ÿ2é¼§úhô†®}£]xupßèÀ¨8õÌÏèŒ-±Õ˜ÊDh¥±T¿\¹kån3-mÏf‹HPfÈIc™òÛŸÔÂfÁŠLaò
GÒMÄ,~ı0ÄÊmşë§˜3™éØw#T¸İó¯¦ïQ¾XlÅ‚³w[AÊ¦•IÓ¾Êr~;sûNYy†¯ÂµpÜ ùë‡Ùh0Õ dÁjÎşi(-·št½³ŒWÂs«“’b	>ÇŠùe óvLƒ OÌöÔsgƒE7ifv‹¿^xãÆ/kx=É"ÓE~N>àD¤"M<	·*	}üœ|‰\=2Åg&©ç)J!ÌÏåR_jMÈNšÃóÚ¼hhëÄ‡#ûºÃ$w5ò¨‘]¹êVÕ÷ô>˜’ò¶¥Šº*€üö)àĞª»V°§‚}À)zYâV´W«Á!PŞq¦‚¡-ğ£ì‹âÜYêM7üÕŸ¨£¿iàÓZ/ßÕK_HfMçLÓÔ
ÎU0¬õñC}\äµ*—¾àŠ{Àé&Mè*WÇn)ªà»áªK	+•¡«•Øt—Ÿ¢«Æ.2şH<êSëÁE	qëÈ¤Şò)s?×‹^\ôê¢ö™0DşïõZ®E¦ôlÎË†¥^´ê¢5A›:£±K¨m¸¨šÒ¦§´å²„âÏ>!µP/ZtÑ…©&Íò²Ğ,G.J¯
!öÚE‰”nüÎ[¥İù²q½èŞEõ¢GM\”ºr÷Ï.JØ!˜¥|9¡"Mò­Ğ$ß]”@ı0¨Kõ¾–İ×J½¯U÷µæ¢DJëÅ	‹ËUŸ³î7İıV½è³‹\”F\ôˆÚ]šÍF.ªğÕ0¾\”å&6ºnë-ïÜr\¯vÕ\–öÑºnâ¢„‹'ÀzvQ…1ßTôê¢ì[C+ùî¢4ñ¹ä¢Ä¾Ëœ¯+FšRqÕ#®Õ‹Ö]´á¢4â¦GÜrQ"ÏNÍXpQqÑ#^ÔÅĞeSrhä¢Tëª)^¾vQBâ“‹oëµî\kì"İù‚Äƒ+í<Ôë=ºŞ¤ŞÛSó˜®×zq­WU4æÃzï.JSúhŠO—\”hÙğ¯¸¨b·U‚ó†€¹²u—mÌ•mºlËeiĞÏ4N±'jYŒÃ¾˜/¡è²%\T‰2çk\O¯ï7Ş™¿uQZà»–xì"wmOÜûÌøƒÂ[¢Ú‰‹ÒLŸ¬1ëE/.zuQ5ù·–&ÿî2YwØ(GÙGKÆå’•‹o~”-û¢à•ùš«®¹6_¸îÂ&h6[=ÖpËE	)Ÿ”¸À°"8]XÍ%J½lKšŒ\”~Õ–4¹®+Ã›¶•Ò­ËİµÅBc%¤ß·¥?\”†|lki&.JHjéÏõZ/®õZ¯õæZï.ªèmĞVo¸ì†+õZ«®µV/ZwÑ†‹ÒŠn¶µ¢[õ¾>»¯UÄó¾èH¤²Ë°Fõ²«(»vYÅ¤pë¢ŠÜ:&7a‰+Uû>RC\Vá¬cœÕ‹\ôì¢´L/-Ó«‹RÿoTğî¢Å‡¡XrQZòeŞ6‚T«­ºh­Ş×ºaİ¨mºhËE‰>wD.ªˆÌ ^ØrJE—¥ùÓE	‹W¥)êÚeiF7+ cõ–wn9vQ…±ÒÑ‡zoÑÛÄe	´§R =»(áç¥ş_]”@{ó ïõZ®µT¯µìZ+.ªA)Z_«­»hÃE™•&3% >»û¥‰/ÆÄ·1~É‡Î>S63ÌjşNsv.å±-nö/°’F»ífË©¦Ê~¶¦ÙMÖ4Ù}<Ÿ³¦%uìÖù†·jø£vÃÌ¢S&Ş­Dª‡ÓœÛ¸æz.[wšÊK@‚şÂËæÎ/¯ˆ@àœ)<f¹ ÌØÅ¶u}û6d[Øµ#bÅcâ&Ê]åõ=üjÙ²ÍCîŸ¦ùuœöQµlvG”B5äŞ”øê†¿>¸ÀKdœÏ†–´Fõ·^%­å¹4Ëu~©]Uª¼ÍÙ-7áã;«Z!hâŠD?J\‘Á|î>ÕÅÏk¤ôæğxˆ1p\@êµ1FÎÄf~QÊÕE›½Nô¿äÿñÇ§?&ãçÇÁpòÇ¿ÿ_œÇ“§›<şíjòÇÿıé»şm<øÑ<ß©};>¾òeøv?~|šğí|øct§¢şí9ŸÑÅåà²Ïïâ©üãqx1š<w«>ÆgW”ß÷Ÿ.ÕúñB½ı¸ãã²?Ù½;xßŸ4lÿşşFÿã«¢íŸİ aíÇnÿŸ?ÆÍş@½†·ü9æÿà¦«‡ÃÇÇñ#ïGƒkş´w.ûçC•\ÜğqÙ¿;¿6UI=»¶¾Üï.èÕx$'O£»‹/c ¼xìkJø|z¿2&U§ƒÇaÿi8ã‰g_›‡_šßşqÄ>š‡ünfíİæŞ—YI´>òÒPa0¾½İÌ:¹>E‡}†‚S*û»åNóG_²/ÇGÜ?O„‚iåòîÇxg|AÑóÍxÀMƒ§Çw#v»3ôŸFcÏÍÀÏföBÅ–Âƒòı‡ş?ö/ªß1ÇYışÓè©z3º»=dÄô£ıN¹×>«Sz2œur6º;ÏX‚³Ø÷i&y?™}ÿ1º¹)Æ7ãÇYÑh’?ŸA;³’3ÿ>}¹½é—Å¬ã¬üùbºÖºœ\î¿<öï&7Æâ¬êhRŒõ±F“òNèŠ-&Óà‡8?/}Qâ³şWÓ	>ÇB-ı4››‚O†#³>ÛÍ`×d_ûoÓÇû÷ZdUO¿}Dİ½çÛ3“Ònöí_³ã&µ>vİø|4¹¿é¿ï/˜Ş‹€üørù8œ\o4‹İ`â[×­àñ`Fs±n|¹ã›ç§á×şÍ³:¹İ¼	ëúŞ›~×úRt?e®EPôÆ°pÀĞ#ÍO<˜†²µ"\êxõù:Ìj­%DÀÑO	IZÍ¯&…?núb}¾==?
â§é7ŠıW²½¼Ö<7C1;ŸµÕ>"%ÆÂÇùğÆQt{ç«Hâ-şñÃ‹pŞê0şønxgA{6}â¦ÓŠ"¥àKÏÈ¼Ç>òš¯Óöê²ûÇavƒ @*	Å&Ä·hoDxğÖÎ~ö…§gÏ#¯¯Ú–°6LÇ—ıÇÇ¾&Òº÷ŸVW²ô3Öf
œrú#;<ÌNÿ‘·Z–{1¡F€%±Uÿhf'tÊrÿ‰½‡w÷¥xXù8DÏh¾?Ç¢‚§1ç¬ªFÑW×Ù?ïÑ+E¢Gı„
¾ŠBù#RÒ¼„+M´ÃÿŠ€îûn5šLye4Ù?»´Ô·ÃÇõ€^£ i s‹ÚW3#ßŸoYMê´w´Á¾GïÆO÷æ¬oÅÜì%)ÆÏn4š™Ås)j´ıP„¬½Q¢oQLX"-öå>KÂ@Âë3ø‹Pòßbgÿ0-Ë?òRëŞh|éÌIÄğ©«ÑİD3Qy…3Xz,Â„Áåppıe&,îkü{h&ëY~X-ˆi3(D]ÜŒ'Ã£áEÂŞ$¾©ÕVÅİì‰ 9Œåxå© Æ‚ªµªRÁßş|Ô7Æo×d¸ºÿI¬SòÆF­<FoÃ}}OEƒñlEÁhrØ¿3-xÓ^˜&6¨E&<½5ßMAöµ_o!–‘‘<z9ü^{şÏßÓ“Ô23–ü4|üüà{Up3~:Ûªaò‡}aŒ9Ü¿½çOÍğ´›şäé[ú{ÊßI%L'çAj^¢ÉÓÎğ‡0~bê§Ğxo"Å´ğ¨O)ˆ{ñÛ>ŒšFHWEtı1[ŞMFæeÄ×ËìG„9<‘õhòmZa49~ÿ1zœL—ÿ±(ô·1üQğSM§]ôï“R°­™F)º½6EÏ¦ZîÉØ
\½Ò9zÜZ.ˆÀ’ScÊ áÏhfÜ³aÂUBİ¬ß#!DÙÍğexÓxÇPÉ„›`„óGíµ(ÿO]×¶Ü6Cÿ¨³³ßRÏ&n&r¶íÎìxh‰¶¸–DU—xİ™ı÷= %¦i_"â@à JZø%³#¹4­½SD=mNúp«l¼¢ÈN)¹ê¯Áºó‘¾êÂSDzYâ3/ÑŒ(¾sZ¥—¾ò´¦.‰œÑ|ğ€-#ô£ˆÿhº‹md ‡É}IA	_SBa£áÒ_¡³±®ä%È+¹a¼Àdº {ªàĞÃ(l4—ó%\X®2qÛÇğR?™¢PG*Ò‹Ú…ŸÆ Òw'Å¦sC©š€Yâ0ê‡íğ5l€½ÒàÔ˜8p;…‰è‰ÙÇk(ÉW[ÊûœašWYèÕÙ+Ó02ƒ,.âúÇ¤^ğ-aÖ
/ÁIÊXdÉ)î(íŞ~$Àö]gõi`¦=ĞïNÜ¡1ò´b‹ï0ÓGI³äı­>zšD¡SôîSÊ…e­)”	'æµEí_×‡ßWx¥‰ŞG[Ï{ßù‘æód¼hŠñ/nrÉb—Üpò§ÖäNòN¨oî`6ÀQŞUm)è€ax.ƒ­ 4Åflx1³çåÿJÏGZÕ§İ?åíúÛ“¬ÍËCVd}•í„Ñşkıü	yû¸åe–Í,ğ`hXò€·/Ù!İ(Ÿâ¥™hİ(­g-°ZñÒçÒ6Q®JQ…äY’{lÃLp’ª¥%c?R\J±  ,£ÍlŸ™DÖ¢Àoé[ª„?V€ä?Fy±ñ]†áÆf¬JÜÔis£0,í"—l`Xã7áæ+MÑ±¥•¾VLÀş@'/}ÎEjÿ}[›³Íjï‡ü­€RW{¼¸áWoëşWoÜ/ÖS_m“6Û¨¼ İšù&ÿ˜ ›²Xÿóı‚¦ö²Ë¶÷»õê°øº§ÑaÌ”eÓÄóùùîé°|ÀÿÒpØ:¬W÷œğfÀ>!àÏ ›íÃ^;²uü>júv»›ßRÁğÄ#E­îÅÃzGsG.I$–ÂÌı:ãN…m‡2\Ÿ‡uFîÜ=ÅïÕÓ?(  òjéĞ2è ¥ ë¨#èòşÏ·¦‚f^³Hå’Ç¤¸6®YFÿªFr'¥4ÔË%dTw è`z±ßØ;·sòà'ü´¢ˆD£#€+Ş F¤)%ª,éEHp¾^Ğ}ÜV‰‡+Š%B+ÅŒ&~
TY`¯Ì}xCc‡qÀ9Ì~õU¸ ²x­$yıl™M[qôå™²M¹ÚP)a)W
¹j í(âÁ?.ËQ‹ùbVÊç»år6‰Â¶[¿†T¸F.t·ËøÉe›àœEŒ\;[šaRÀ§lî=ƒBkƒEåÕ›&Fr@ÛºûåüÖK½P¦sm¨Ü)?ğ®Aœ’íQ9¹Êf{Úù÷êFúó·Æw×ß$°˜k¡äjªpWòrl.Á6~vÒË/¬©mÿâ½–¬@ì¯³ßF€ì»6D«ß°„ˆ0ÃÏöˆr¨Ú*(á£%/!nØws]äi”J’È`ö@cUÀ©çöçÆÜ«ÌCV8£¢}Êâ*YÛ%vdî¼¸Ä!§håÕõN½ŒXÏ
ö¦ ƒòË±$¨Î©ôqœä<¸Ibi †S£äÁFâµ“*ó¬ôÖïQø¥ª/f>ƒUó“[]ô}ÄTVÏà 4ŒÂaI_°VÏ*£Méúˆ£aƒá=Jf$â¡¨œÿ±ŠëæÖñŒr‘§4JKMgŠÄ"· Š¬öæ"_=÷£æAZk9BhÌ™Y`2%¯0Éb‡‚lK8ªŸÔ!6ÀñÀ+Ç(—·å¡vÏ®Ë):ˆÎS² öH©µÂµ	» İÆš•Èb‰LíR½pE´
…Ê{ŸıyQ2ræ‚p±çÓ»>–”ÈÊL3ş0©ôÃ¯¼t°„$‰üqæOüÎÂøYTãJ¶ÄÄøNØ–)XŒ,êõKMhjA—ˆ†j€°.¤ÓNÍpê—¦¢b`´p’•´lJq#«Nf2¨p!ë¹˜¥—˜,_cPñÜO®p=£¨Jmœ•„½´¦×`ˆ1&í0n§UlÓ·]Ô¯ı×©_Æ‹w"{3Òa$1pãmÒıû+Miªá¸‰9"Ã(‹ãYÑt`İ®/mÜ¦ÔŞPƒË/·äfTæh«ÅMÁ¤÷%ìv„ûşnØ[9JùŒjÓ„]SÖwsŞß¦@	—ZÃÇ83VÃÇıãÃ’¥p-IA¸¹=j¥Â4ƒCx¸–@ı˜`®„wøÌ÷]•sD9€c®Ç6*ÜE}Bİ¶0UíÅw†µùxuHÏ)ıc§‚?]u»z±“ßá†08'
ê,<ç¥ÇÙ5óÉ}'ù%Í	Âvq½«ÈAŞ¹º—/YùÍH­ùV ™PÏø~a›Nöç+8'&+Ú´Zè ùRšc:éÄğ@o¡ç+àó3²š¸øÓÒÇ"–‚FÙù…I½È&v¬Iç³2ÕÁYÒOØPü6z'‚áûI¤…µm‹Om\Íşr‹Gvuœï‹ó$°“­ŠŞãİ~…P!áh'O‡ù;áZôG?'#Œwtç7*N @IKä6‹Èófå1°DxºV›Cà¡Ä™FåÅö™Û¸WõlQ•ÔºlâÀRï©Ìµ‰Û¢,[ºÓI,¢b•-FÚÑ ´£ö"íé¯Jî,-$¶EïÒ	¼K{R°öfkRvÏ„ 5%ÖV)Ó	KŞ*$×ÓqOiŒ³âîz9|mQ”©y«§ë¬¤°¶v&£Õn;vÈX¸ ÌîçÃBÂ~ ´„‰‘¥¥f«5\UríŠ&QÀÎÀä‹sj­[‡ò?Û>ÏŠh6æÕüã£Õ¡G¥Àèà„8R®e|¢:Ì/9ÓÍÔ†î<¶5bçì¤î5ÛéØOÙoMknÌ0¢´„ë->ÖI»ãgÜ`-€{ş
³"Ÿ¤«ìà ·èñ¡ĞD­÷€vî¨zÍÉ¼z”Ñ¦ñ‰fĞD´ØÕ,6¼²pálLæ—úšÔÏôVoßè5ÖÉq«¾Ö`=GúA,ÕA|y$)qR“ƒJ%v-‘òb`T <ûZ+Î“uk#’ş>
Š<
¦5–ÿıßÿã„™                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    €   $       4                                  ÿ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          xm–iXW†pA1,¶B@AD
4" ‘MEP‰1ÕİEStuU[]M³ˆ‚"è(ˆ,‚²¨€$¢F"‹Ïc mÀ!(8ÁAVvTÖeu
Ó·hŸ™_õç=ç~÷s¾S‰ «¿Û²ÙZaã†–«a‰P6Š¡Tˆ™ˆä˜Š”³YÎ»5ÎëÔå»~\}@eY×]ğ8NP0…¸‚¹A0ÎA¸ ÌC{ë£?û%‚£G:zÏEhoüß0@óÃ[Uæ+·œğ>Öw©©²Vôh’$$(DÀ&0à×ò7×İavÍt™¿ĞĞ’ñl‚QÆƒ`ÿe¥Áı‘57–×İ¸I¦ûx¼d‹~¹)ƒ´Ã~;W(KJ§j,l”Ÿ:(òG|‡à`”Éê™b'+¯Ú›ÑØ¬ükPØ²)@‹1¡@ZüD´{™ŞJ«„K?KË£ô4ZµuRrŒ å“:]>{ÀÜQ=ûÎc–»véåÖq +&I§ .L!ŠsQL$8Ä¦bza£½ÀdìQYU¾`#O†`40hXÂó½Ü+üdĞ°®×{Ï–ëŸd({ø~j*¬RÉ7ˆ:“á”3åˆËa<’Qœğ‹^ïÛª©‡ßf;—¦,9¡[?p„-æñæø©¿9Y8QöÛ±á6næ1eçÔY*Dh­8'’ ²ïºôÒéuàb¤ÅÍÇœ{ğÅà@!%ÄæµYK°—zŠCO–.¾›ª»µjàtÑ)@’0Â8ÂÔ0|:å£^ã˜oúøH¦5›Õ¤}¸{™ÌƒÙ		§˜âÏ´¨£Şà:ËIY#?ÌûZÚÉ„ Æ%$8Pİğ¼¶ÎğI±åû™-*öTıgµ-`Å6Á˜>Õ½´¢[éoöÑ›“›M£U2zªe(,$ÈÏugjãsºÖtäY·àÄCO&÷è„G¾ş‚–+L¾Û…­	÷¹Ò“×ÙÜ²X.cıé>…DÚÉi±ZÜş¦û¡äüwo¥GÍ?rÅ‘¡q|®"¹±Ï³´Õy
£kz+Æ&*Âœ¿ 71f°zŸºn¶Rî©uƒé’5«¸ï‰bÊƒqŠ)]rRSššºkoÕDõ¨Y[k	~¯p$ÊıbúìSğé¦ü÷$Ë´R¡¿İÈ3ô÷šó26 ),E²J)œ´Îe¥—¿>á‘ØÁ$*¢	 ÙRpÄd¢–îhu‰ ì’-4ml§=¿Şáka»E…Rˆ !$:×GRŸj6° Ív£jY.i{O;#’†
	FK™\~;Îª|ß¾©_­§ÖW,õò“¡˜ä#$ÄÁÄ"
!™+,éˆ¶óëí
¬ÎÏ/`ù4/²“Eà%!H>}a P~6ÄTÑO{l„Ü‰í1(ÔÑk481ë0DÑ_T$Ä`Ææ·è5K=:ıTÍ&S¾Ó¨ú»]áİü;² ÂßŸöú«å‹Zyèö†ã§JÓk_ÔXåíXi6
b0.:;8Xˆ?=ÌMÜ+û¼Ü‚ã«…hŞåœse1ÒDæ”Ùp…®ÄËQ&/Â
¯T
6“6±ÿR™IºeĞĞÏkà‚¸'Æ+×H»^Š˜¸rÃŸõae,Àƒƒ…³FõùêLWšÑŒÁS‡+Õâ»Û£l{cl´û0"!LÂ´‰c‡ H.ŠÓ¦Ë„É-K”˜˜Å‡%u{v¦|]%;C(»x¾îLyÌ Ñ£®cıè;'«>'—© ÿ/lyI¥åÛ…ß*h¼+6KhÕ2| ¤\StCàĞìc‚Ü?ã_íïì5ô}æä&·Ä±S3ûAnåüŸú®v;yïxÍÑæòı_ÕÚb¿K@D=(wndo­×ˆÚÔ?n{zm»Rñãzßûİ2Vã|„iœş†Öå7‹RÔ%½ùáÈXÿ6àç>?9P=z¨gç…VİÅ_Ù9ÍÏˆÜd¶óšÀ	Œq,æ1}`Ú­²Œ¯ëœ(Mhp1Ú|Ö›¡qÔvÒ¿ yjĞ j¢uŞ~Ÿ#-Ğ‘é¼-¸ÕI>û£Â¡½Æ˜ìï§ÂUeJb—çªª*‡P3µÀh[àğé1‘ûçX¶ûXšƒCüVÑu<Ödfª}0£|–"";ø?î©´yçkÛ‘<vu¨ÀÌ’¿€A"°à‹a}v¯÷U¸Z’‹Eÿ’ğöNs•ô`‰Ä8[LŠwÔò¾ç—4’£'´,QEZw|l
Å9Ç»¢å®?íşod3yxM—#ññJ„L…
Ùij(S™Íjã.c×Ç÷¶GE(¾W(½x´íÔÃAñ[Ö®:gµf­W*ws0¾BÑ¨ÜùÛ.ØK¯®=İ¯oå’i!9÷0ğ ,iL¢-Õ¹ißYğ÷úilë71-jÆ½í+¼äp	Êeän‚;“+rU¤ºWİ£²Š´Ï¤øä–áÈıMZn_õ:IÙÎ)-F£I‘RÉ¶úPÄ™QÓÏ6«ÑL78ƒÔmƒ$\‹ßòÂd˜„N6L²Áõ¯Jó¢‡¯ï;YânÎ«òz’å®`; ´Cp0BÌ<U|¶â›`ßœµ]m&Eš©IZn_ Ë#˜„ñ¹o3¶×-n‡ïë^³PÈqM½™+zõ_úx›9                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                /* *
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