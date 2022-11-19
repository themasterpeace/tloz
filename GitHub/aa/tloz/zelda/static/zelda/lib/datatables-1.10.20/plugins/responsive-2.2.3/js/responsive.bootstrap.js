               d: createPathDGenerator(i, true)
                });
            }
        }, this);
    };
    Fibonacci.prototype.addLabels = function () {
        Fibonacci.levels.forEach(function (level, i) {
            var options = this.options.typeOptions, label = this.initLabel(merge(options.labels[i], {
                point: function (target) {
                    var point = MockPoint.pointToOptions(target.annotation.startRetracements[i]);
                    return point;
                },
                text: level.toString()
            }));
            options.labels[i] = label.options;
        }, this);
    };
    /* *
     *
     * Static properties
     *
     * */
    Fibonacci.levels = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
    return Fibonacci;
}(Tunnel));
Fibonacci.prototype.defaultOptions = merge(Tunnel.prototype.defaultOptions, 
/**
 * A fibonacci annotation.
 *
 * @sample highcharts/annotations-advanced/fibonacci/
 *         Fibonacci
 *
 * @extends      annotations.crookedLine
 * @product      highstock
 * @optionparent annotations.fibonacci
 */
{
    typeOptions: {
        /**
         * The height of the fibonacci in terms of yAxis.
         */
        height: 2,
        /**
         * An array of background colors:
         * Default to:
         * ```
         * [
         * 'rgba(130, 170, 255, 0.4)',
         * 'rgba(139, 191, 216, 0.4)',
         * 'rgba(150, 216, 192, 0.4)',
         * 'rgba(156, 229, 161, 0.4)',
         * 'rgba(162, 241, 130, 0.4)',
         * 'rgba(169, 255, 101, 0.4)'
         * ]
         * ```
         */
        backgroundColors: [
            'rgba(130, 170, 255, 0.4)',
            'rgba(139, 191, 216, 0.4)',
            'rgba(150, 216, 192, 0.4)',
            'rgba(156, 229, 161, 0.4)',
            'rgba(162, 241, 130, 0.4)',
            'rgba(169, 255, 101, 0.4)'
        ],
        /**
         * The color of line.
         */
        lineColor: 'grey',
        /**
         * An array of colors for the lines.
      