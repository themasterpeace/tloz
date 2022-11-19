               .add(targetGroup);
                target.ctx = ctx = target.canvas.getContext('2d');
                if (chart.inverted) {
                    ['moveTo', 'lineTo', 'rect', 'arc'].forEach(function (fn) {
                        wrap(ctx, fn, swapXY);
                    });
                }
                target.boostCopy = function () {
                    target.renderTarget.attr({
                        href: target.canvas.toDataURL('image/png')
                    });
                };
                target.boostClear = function () {
                    ctx.clearRect(0, 0, target.canvas.width, target.canvas.height);
                    if (target === this) {
                        target.renderTarget.attr({ href: '' });
                    }
                };
                target.boostClipRect = chart.renderer.clipRect();
                target.renderTarget.clip(target.boostClipRect);
            }
            else if (!(target instanceof H.Chart)) {
                // ctx.clearRect(0, 0, width, height);
            }
            if (target.canvas.width !== width) {
                target.canvas.width = width;
            }
            if (target.canvas.height !== height) {
                target.canvas.height = height;
            }
            target.renderTarget.attr({
                x: 0,
                y: 0,
                width: width,
                height: height,
                style: '