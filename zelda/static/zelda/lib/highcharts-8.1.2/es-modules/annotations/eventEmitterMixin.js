e.faces=[];e.destroy=function(){for(var a=0;a<e.faces.length;a++)e.faces[a].destroy();
return c.call(this)};e.attr=function(a,c,k,r){if("object"===typeof a&&m(a.faces)){for(;e.faces.length>a.faces.length;)e.faces.pop().destroy();for(;e.faces.length<a.faces.length;)e.faces.push(f.face3d().add(e));for(var h=0;h<a.faces.length;h++)f.styledMode&&delete a.faces[h].fill,e.faces[h].attr(a.faces[h],null,k,r);delete a.faces}return l.prototype.attr.apply(this,arguments)};e.animate=function(a,c,k){if(a&&a.faces){for(;e.faces.length>a.faces.length;)e.faces.pop().destroy();for(;e.faces.length<a.faces.length;)e.faces.push(f.face3d().add(e));
for(var r=0;r<a.faces.length;r++)e.faces[r].animate(a.faces[r],c,k);delete a.faces}return l.prototype.animate.apply(this,arguments)};return e.attr(a)};b={initArgs:function(a){var f=this,e=f.renderer,c=e[f.pathType+"Path"](a),k=c.zIndexes;f.parts.forEach(function(a){f[a]=e.path(c[a]).attr({"class":"highcharts-3d-"+a,zIndex:k[a]||0}).add(f)});f.attr({"stroke-linejoin":"round",zIndex:k.group});f.originalDestroy=f.destroy;f.destroy=f.destroyParts;f.forcedSides=c.forcedSides},singleSetterForParts:function(a,
c,e,k,h,d){var f={};k=[null,null,k||"attr",h,d];var r=e&&e.zIndexes;e?(r&&r.group&&this.attr({zIndex:r.group}),p(e,function(c,v){f[v]={};f[v][a]=c;r&&(f[v].zIndex=e.zIndexes[v]||0)}),k[1]=f):(f[a]=c,k[0]=f);return this.processParts.apply(this,k)},processParts:function(a,c,e,k,h){var f=this;f.parts.forEach(function(d){c&&(a=E(c[d],!1));if(!1!==a)f[d][e](a,k,h)});return f},destroyParts:function(){this.processParts(null,null,"destroy");return this.originalDestroy()}};var M=g(b,{parts:["front","top",
"side"],pathType:"cuboid",attr:function(a,c,e,k){if("string"===typeof a&&"undefined"!==typeof c){var f=a;a={};a[f]=c}return a.shapeArgs||m(a.x)?this.singleSetterForParts("d",null,this.renderer[this.pathType+"Path"](a.shapeArgs||a)):l.prototype.attr.call(this,a,void 0,e,k)},animate:function(a,c,e){if(m(a.x)&&m(a.y)){a=this.renderer[this.pathType+"Path"](a);var f=a.forcedSides;this.singleSetterForParts("d",null,a,"animate",c,e);this.attr({zIndex:a.zIndexes.group});f!==this.forcedSides&&(this.forcedSides=
f,M.fillSetter.call(this,this.fill))}else l.prototype.animate.call(this,a,c,e);return this},fillSetter:function(a){this.forcedSides=this.forcedSides||[];this.singleSetterForParts("fill",null,{front:a,top:q(a).brighten(0<=this.forcedSides.indexOf("top")?0:.1).get(),side:q(a).brighten(0<=this.forcedSides.indexOf("side")?0:-.1).get()});this.color=this.fill=a;return this}});d.prototype.elements3d={base:b,cuboid:M};d.prototype.element3d=function(a,c){var e=this.g();u(e,this.elements3d[a]);e.initArgs(c);
return e};d.prototype.cuboid=function(a){return this.element3d("cuboid",a)};d.prototype.cuboidPath=function(a){function c(a){return 0===y&&1<a&&6>a?{x:B[a].x,y:B[a].y+10,z:B[a].z}:B[0].x===B[7].x&&4<=a?{x:B[a].x+10,y:B[a].y,z:B[a].z}:0===G&&2>a||5<a?{x:B[a].x,y:B[a].y,z:B[a].z+10}:B[a]}function e(a){return B[a]}var f=a.x,k=a.y,d=a.z||0,y=a.height,r=a.width,G=a.depth,v=x[this.chartIndex],z=v.options.chart.options3d.alpha,H=0,B=[{x:f,y:k,z:d},{x:f+r,y:k,z:d},{x:f+r,y:k+y,z:d},{x:f,y:k+y,z:d},{x:f,y:k+
y,z:d+G},{x:f+r,y:k+y,z:d+G},{x:f+r,y:k,z:d+G},{x:f,y:k,z:d+G}],N=[];B=h(B,v,a.insidePlotArea);var A=function(a,v,f){var k=[[],-1],r=a.map(e),z=v.map(e);a=a.map(c);v=v.map(c);0>t.shapeArea(r)?k=[r,0]:0>t.shapeArea(z)?k=[z,1]:f&&(N.push(f),k=0>t.shapeArea(a)?[r,0]:0>t.shapeArea(v)?[z,1]:[r,0]);return k};var C=A([3,2,1,0],[7,6,5,4],"front");a=C[0];var b=C[1];C=A([1,6,7,0],[4,5,2,3],"top");r=C[0];var n=C[1];C=A([1,2,5,6],[0,7,4,3],"side");A=C[0];C=C[1];1===C?H+=1E6*(v.plotWidth-f):C||(H+=1E6*f);H+=10*
(!n||0<=z&&180>=z||360>z&&357.5<z?v.plotHeight-k:10+k);1===b?H+=100*d:b||(H+=100*(1E3-d));return{front:this.toLinePath(a,!0),top:this.toLinePath(r,!0),side:this.toLinePath(A,!0),zIndexes:{group:Math.round(H)},forcedSides:N,isFront:b,isTop:n}};d.prototype.arc3d=function(a){function k(a){var e=!1,k={},c;a=g(a);for(c in a)-1!==h.indexOf(c)&&(k[c]=a[c],delete a[c],e=!0);return e?[k,a]:!1}var e=this.g(),f=e.renderer,h="x y r innerR start end depth".split(" ");a=g(a);a.alpha=(a.alpha||0)*c;a.beta=(a.beta||
0)*c;e.top=f.path();e.side1=f.path();e.side2=f.path();e.inn=f.path();e.out=f.path();e.onAdd=function(){var a=e.parentGroup,c=e.attr("class");e.top.add(e);["out","inn","side1","side2"].forEach(function(k){e[k].attr({"class":c+" highcharts-3d-side"}).add(a)})};["addClass","removeClass"].forEach(function(a){e[a]=function(){var c=arguments;["top","out","inn","side1","side2"].forEach(function(k){e[k][a].apply(e[k],c)})}});e.setPaths=function(a){var k=e.renderer.arc3dPath(a),c=100*k.zTop;e.attribs=a;e.top.attr({d:k.top,
zIndex:k.zTop});e.inn.attr({d:k.inn,zIndex:k.zInn});e.out.attr({d:k.out,zIndex:k.zOut});e.side1.attr({d:k.side1,zIndex:k.zSide1});e.side2.attr({d:k.side2,zIndex:k.zSide2});e.zIndex=c;e.attr({zIndex:c});a.center&&(e.top.setRadialReference(a.center),delete a.center)};e.setPaths(a);e.fillSetter=function(a){var e=q(a).brighten(-.1).get();this.fill=a;this.side1.attr({fill:e});this.side2.attr({fill:e});this.inn.attr({fill:e});this.out.attr({fill:e});this.top.attr({fill:a});return this};["opacity","translateX",
"translateY","visibility"].forEach(function(a){e[a+"Setter"]=function(a,k){e[k]=a;["out","inn","side1","side2","top"].forEach(function(c){e[c].attr(k,a)})}});e.attr=function(a){var c;if("object"===typeof a&&(c=k(a))){var f=c[0];arguments[0]=c[1];u(e.attribs,f);e.setPaths(e.attribs)}return l.prototype.attr.apply(e,arguments)};e.animate=function(a,c,f){var r=this.attribs,v="data-"+Math.random().toString(26).substring(2,9);delete a.center;delete a.z;delete a.alpha;delete a.beta;var z=D(E(c,this.renderer.globalAnimation));
if(z.duration){c=k(a);e[v]=0;a[v]=1;e[v+"Setter"]=t.noop;if(c){var h=c[0];z.step=function(a,e){function c(a){return r[a]+(E(h[a],r[a])-r[a])*e.pos}e.prop===v&&e.elem.setPaths(g(r,{x:c("x"),y:c("y"),r:c("r"),innerR:c("innerR"),start:c("start"),end:c("end"),depth:c("depth")}))}}c=z}return l.prototype.animate.call(this,a,c,f)};e.destroy=function(){this.top.destroy();this.out.destroy();this.inn.destroy();this.side1.destroy();this.side2.destroy();return l.prototype.destroy.call(this)};e.hide=function(){this.top.hide();
this.out.hide();this.inn.hide();this.side1.hide();this.side2.hide()};e.show=function(a){this.top.show(a);this.out.show(a);this.inn.show(a);this.side1.show(a);this.side2.show(a)};return e};d.prototype.arc3dPath=function(c){function f(a){a%=2*Math.PI;a>Math.PI&&(a=2*Math.PI-a);return a}var e=c.x,h=c.y,d=c.start,x=c.end-.00001,b=c.r,r=c.innerR||0,G=c.depth||0,v=c.alpha,z=c.beta,H=Math.cos(d),B=Math.sin(d);c=Math.cos(x);var q=Math.sin(x),A=b*Math.cos(z);b*=Math.cos(v);var C=r*Math.cos(z),p=r*Math.cos(v);
r=G*Math.sin(z);var m=G*Math.sin(v);G=[["M",e+A*H,h+b*B]];G=G.concat(n(e,h,A,b,d,x,0,0));G.push(["L",e+C*c,h+p*q]);G=G.concat(n(e,h,C,p,x,d,0,0));G.push(["Z"]);var u=0<z?Math.PI/2:0;z=0<v?0:Math.PI/2;u=d>-u?d:x>-u?-u:d;var g=x<a-z?x:d<a-z?a-z:x,l=2*a-z;v=[["M",e+A*y(u),h+b*k(u)]];v=v.concat(n(e,h,A,b,u,g,0,0));x>l&&d<l?(v.push(["L",e+A*y(g)+r,h+b*k(g)+m]),v=v.concat(n(e,h,A,b,g,l,r,m)),v.push(["L",e+A*y(l),h+b*k(l)]),v=v.concat(n(e,h,A,b,l,x,0,0)),v.push(["L",e+A*y(x)+r,h+b*k(x)+m]),v=v.concat(n(e,
h,A,b,x,l,r,m)),v.push(["L",e+A*y(l),h+b*k(l)]),v=v.concat(n(e,h,A,b,l,g,0,0))):x>a-z&&d<a-z&&(v.push(["L",e+A*Math.cos(g)+r,h+b*Math.sin(g)+m]),v=v.concat(n(e,h,A,b,g,x,r,m)),v.push(["L",e+A*Math.cos(x),h+b*Math.sin(x)]),v=v.concat(n(e,h,A,b,x,g,0,0)));v.push(["L",e+A*Math.cos(g)+r