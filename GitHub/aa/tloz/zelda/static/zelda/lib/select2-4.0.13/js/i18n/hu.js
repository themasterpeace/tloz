panded","false");d("div.dt-button-background").off("click.dtb-collection");n.background(!1,g.backgroundClassName,g.fade,f);d("body").off(".dtb-collection");
b.off("buttons-action.b-internal")};!1===a&&h();c=d(b.buttons('[aria-haspopup="true"][aria-expanded="true"]').nodes());c.length&&(f=c.eq(0),h());c=d("<div/>").addClass("dt-button-collection").addClass(g.collectionLayout).css("display","none");a=d(a).addClass(g.contentClassName).attr("role","menu").appendTo(c);f.attr("aria-expanded","true");f.parents("body")[0]!==t.body&&(f=t.body.lastChild);g.collectionTitle&&c.prepend('<div class="dt-button-collection-title">'+g.collectionTitle+"</div>");c.insertAfter(f).fadeIn(g.fade);
var k=d(b.table().container());e=c.css("position");"dt-container"===g.align&&(f=f.parent(),c.css("width",k.width()));if("absolute"===e){e=f.positio