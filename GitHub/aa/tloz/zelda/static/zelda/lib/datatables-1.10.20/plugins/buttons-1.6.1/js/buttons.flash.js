* @todo Override the refactored sankey translateLink and translateNode
     * functions instead of the whole translate function.
     */
    translate: function () {
        var options = this.options, factor = 2 * Math.PI /
            (this.chart.plotHeight + this.getNodePadding()), center = this.getCenter(), startAngle = (options.startAngle - 90) * H.deg2rad;
        base.translate.call(this);
        this.nodeColumns[0].forEach(function (node) {
            // Don't render the nodes if sum is 0 #12453
            if (node.sum) {
                var shapeArgs = node.shapeArgs, centerX = center[0], centerY = center[1], r = center[2] / 2, innerR = r - options.nodeWidth, start = startAngle + factor * shapeArgs.y, end = startAngle +
                    factor * (shapeArgs.y + shapeArgs.height);
                // Middle angle
                node.angle = start + (end - start) / 2;
                node.shapeType = 'arc';
                node.shapeArgs = {
                    x: centerX,
                    y: centerY,
                    r: r,
                    innerR: innerR,
                    start: start,
                    end: end
                };
                node.dlBox = {
                    x: centerX + Math.cos((start + end) / 2) * (r + innerR) / 2,
                    y: centerY + Math.sin((start + end) / 2) * (r + innerR) / 2,
                    width: 1,
                    height: 1
                };
                // Draw the links from this node
                node.linksFrom.forEach(function (point) {
                    if (point.linkBase) {
                        var distance;
                        var corners = point.linkBase.map(function (top, i) {
                            var angle = factor * top, x = Math.cos(startAngle + angle) * (innerR + 1), y = Math.sin(startAngle + angle) * (innerR + 1), curveFactor = options.curveFactor;
                            // The distance between the from and to node
                            // along the perimeter. This affect how curved
                            // the link is, so that links between neighbours
                            // don't extend too far towards the center.
                            distance = Math.abs(point.linkBase[3 - i] * factor - angle);
                            if (distance > Math.PI) {
                                distance = 2 * Math.PI - distance;
                            }
                            distance = distance * innerR;
                            if (distance < innerR) {
                                curveFactor *= (distance / innerR);
                            }
                            return {
                                x: centerX + x,
                                y: centerY + y,
                                cpX: centerX + (1 - curveFactor) * x,
                                cpY: centerY + (1 - curveFactor) * y
                            };
                        });
                        point.shapeArgs = {
                            d: [[
                                    'M',
                                    corners[0].x, corners[0].y
                                ], [
                                    'A',
                                    innerR, innerR,
                                    0,
                                    0,
                                    1,
                                    corners[1].x, corners[1].y
                                ], [
                                    'C',
                                    corners[1].cpX, corners[1].cpY,
                                    corners[2].cpX, corners[2].cpY,
                                    corners[2].x, corners[2].y
                                ], [
                                    'A',
                                    innerR, innerR,
                                    0,
                                    0,
                                    1,
                                    corners[3].x, corners[3].y
                                ], [
                                    'C',
                                    corners[3].cpX, corners[3].cpY,
                                    corners[0].cpX, corners[0].cpY,
                                    corners[0].x, corners[0].y
                                ]]
                        };
                    }
                });
            }
        });
    },
    animate: function (init) {
        if (!init) {
            var duration = animObject(this.options.animation).duration, step = (duration / 2) / this.nodes.length;
            this.nodes.forEach(function (point, i) {
                var graphic = point.graphic;
                if (graphic) {
                    graphic.attr({ opacity: 0 });
                    setTimeout(function () {
                        graphic.animate({ opacity: 1 }, { duration: step });
                    }, step * i);
                }
            }, this);
            this.points.forEach(function (point) {
                var graphic = point.graphic;
                if (!point.isNode && graphic) {
                    graphic.attr({ opacity: 0 })
                        .animate({
                        opacity: 1
                    }, this.options.animation);
                }
            }, this);
        }
    }
    /* eslint-enable valid-jsdoc */
}, 
// Point class
{
    setState: H.NodesMixin.setNodeState,
    /* eslint-disable valid-jsdoc */
    /**
     * Return a text path that the data label uses.
     * @private
     */
    getDataLabelPath: function (label) {
        var renderer = this.series.chart.renderer, shapeArgs = this.shapeArgs, upperHalf = this.angle < 0 || this.angle > Math.PI, start = shapeArgs.start, end = shapeArgs.end;
        if (!this.dataLabelPath) {
            this.dataLabelPath = renderer
                .arc({ open: true })
                // Add it inside the data label group so it gets destroyed
                // with the label
                .add(label);
        }
        this.dataLabelPath.attr({
            x: shapeArgs.x,
            y: shapeArgs.y,
            r: (shapeArgs.r +
                (this.dataLabel.options.distance || 0)),
            start: (upperHalf ? start : end),
            end: (upperHalf ? end : start),
            clockwise: +upperHalf
        });
        return this.dataLabelPath;
    },
    isValid: function () {
        // No null points here
        return true;
    }
    /* eslint-enable valid-jsdoc */
});
/**
 * A `dependencywheel` series. If the [type](#series.dependencywheel.type)
 * option is not specified, it is inherited from [chart.type](#chart.type).
 *
 * @extends   series,plotOptions.dependencywheel
 * @exclude   dataSorting
 * @product   highcharts
 * @requires  modules/dependencywheel
 * @apioption series.dependencywheel
 */
/**
 * A collection of options for the individual nodes. The nodes in a dependency
 * diagram are auto-generated instances of `Highcharts.Point`, but options can
 * be applied here and linked by the `id`.
 *
 * @extends   series.sankey.nodes
 * @type      {Array<*>}
 * @product   highcharts
 * @excluding offset
 * @apioption series.dependencywheel.nodes
 */
/**
 * An array of data points for the series. For the `dependencywheel` series
 * type, points can be given in the following way:
 *
 * An array of objects with named values. The following snippet shows only a
 * few settings, see the complete options set below. If the total number of data
 * points exceeds the series' [turboThreshold](#series.area.turboThreshold),
 * this option is not available.
 *
 *  ```js
 *     data: [{
 *         from: 'Category1',
 *         to: 'Category2',
 *         weight: 2
 *     }, {
 *         from: 'Category1',
 *         to: 'Category3',
 *         weight: 5
 *     }]
 *  ```
 *
 * @type      {Array<*>}
 * @extends   series.sankey.data
 * @product   highcharts
 * @excluding outgoing, dataLabels
 * @apioption series.dependencywheel.data
 */
/**
 * Individual data label for each node. The options are the same as
 * the ones for [series.dependencywheel.dataLabels](#series.dependencywheel.dataLabels).
 *
 * @apioption series.dependencywheel.nodes.dataLabels
 */
''; // adds doclets above to the transpiled file
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */
        q1: {
            optionName: 'draggableQ1',
            axis: 'y',
            move: true,
            resize: true,
            resizeSide: 'bottom',
            handlePositioner: function (point) {
                return {
                    x: point.shapeArgs.x,
                    y: point.q1Plot
                };
            },
            handleFormatter: columnDragDropProps.y.handleFormatter,
            propValidate: function (val, point) {
                return val <= point.median && val >= point.low;
            }
        },
        median: {
            // Median can not be dragged individually, just move the whole
            // point for this.
            axis: 'y',
            move: true
        },
        /**
         * Allow Q3 value to be dragged individually.
         *
         * @type      {boolean}
         * @default   true
         * @requires  modules/draggable-points
         * @apioption plotOptions.boxplot.dragDrop.draggableQ3
         */
        q3: {
            optionName: 'draggableQ3',
            axis: 'y',
            move: true,
            resize: true,
            resizeSide: 'top',
            handlePositioner: function (point) {
                return {
                    x: point.shapeArgs.x,
                    y: point.q3Plot
                };
            },
            handleFormatter: columnDragDropProps.y.handleFormatter,
            propValidate: function (val, point) {
                return val <= point.high && val >= point.median;
            }
        },
        /**
         * Allow high value to be dragged individually.
         *
         * @type      {boolean}
         * @default   true
         * @requires  modules/draggable-points
         * @apioption plotOptions.boxplot.dragDrop.draggableHigh
         */
        high: {
            optionName: 'draggableHigh',
            axis: 'y',
            move: true,
            resize: true,
            resizeSide: 'top',
            handlePositioner: function (point) {
                return {
                    x: point.shapeArgs.x,
                    y: point.highPlot
                };
            },
            handleFormatter: columnDragDropProps.y.handleFormatter,
            propValidate: function (val, point) {
                return val >= point.q3;
            }
        }
    };
}
// OHLC series - move x, resize or move open/high/low/close
if (seriesTypes.ohlc) {
    seriesTypes.ohlc.prototype.dragDropProps = {
        x: columnDragDropProps.x,
        /**
         * Allow low value to be dragged individually.
         *
         * @type      {boolean}
         * @default   true
         * @requires  modules/draggable-points
         * @apioption plotOptions.ohlc.dragDrop.draggableLow
         */
        low: {
            optionName: 'draggableLow',
            axis: 'y',
            move: true,
            resize: true,
            resizeSide: 'bottom',
            handlePositioner: function (point) {
                return {
                    x: point.shapeArgs.x,
                    y: point.plotLow
                };
            },
            handleFormatter: columnDragDropProps.y.handleFormatter,
            propValidate: function (val, point) {
                return val <= point.open && val <= point.close;
            }
        },
        /**
         * Allow high value to be dragged individually.
         *
         * @type      {boolean}
         * @default   true
         * @requires  modules/draggable-points
         * @apioption plotOptions.ohlc.dragDrop.draggableHigh
         */
        high: {
            optionName: 'draggableHigh',
            axis: 'y',
            move: true,
            resize: true,
            resizeSide: 'top',
            handlePositioner: function (point) {
                return {
                    x: point.shapeArgs.x,
                    y: point.plotHigh
                };
            },
            handleFormatter: columnDragDropProps.y.handleFormatter,
            propValidate: function (val, point) {
                return val >= point.open && val >= point.close;
            }
        },
        /**
         * Allow open value to be dragged individually.
         *
         * @type      {boolean}
         * @default   true
         * @requires  modules/draggable-points
         * @apioption plotOptions.ohlc.dragDrop.draggableOpen
         */
        open: {
            optionName: 'draggableOpen',
            axis: 'y',
            move: true,
            resize: true,
            resizeSide: function (point) {
                return point.open >= point.close ? 'top' : 'bottom';
            },
            handlePositioner: function (point) {
                return {
                    x: point.shapeArgs.x,
                    y: point.plotOpen
                };
            },
            handleFormatter: columnDragDropProps.y.handleFormatter,
            propValidate: function (val, point) {
                return val <= point.high && val >= point.low;
            }
        },
        /**
         * Allow close value to be dragged individually.
         *
         * @type      {boolean}
         * @default   true
         * @requires  modules/draggable-points
         * @apioption plotOptions.ohlc.dragDrop.draggableClose
         */
        close: {
            optionName: 'draggableClose',
            axis: 'y',
            move: true,
            resize: true,
            resizeSide: function (point) {
                return point.open >= point.close ? 'bottom' : 'top';
            },
            handlePositioner: function (point) {
                return {
                    x: point.shapeArgs.x,
                    y: point.plotClose
                };
            },
            handleFormatter: columnDragDropProps.y.handleFormatter,
            propValidate: function (val, point) {
                return val <= point.high && val >= point.low;
            }
        }
    };
}
// Arearange series - move x, resize or move low/high
if (seriesTypes.arearange) {
    var columnrangeDragDropProps = seriesTypes.columnrange.prototype.dragDropProps, 
    // Use a circle covering the marker as drag handle
    arearangeHandleFormatter = function (point) {
        var radius = point.graphic ?
            point.graphic.getBBox().width / 2 + 1 :
            4;
        return [
            ['M', 0 - radius, 0],
            ['a', radius, radius, 0, 1, 0, radius * 2, 0],
            ['a', radius, radius, 0, 1, 0, radius * -2, 0]
        ];
    };
    seriesTypes.arearange.prototype.dragDropProps = {
        x: columnrangeDragDropProps.x,
        /**
         * Allow low value to be dragged individually.
         *
         * @type      {boolean}
         * @default   true
         * @requires  modules/draggable-points
         * @apioption plotOptions.arearange.dragDrop.draggableLow
         */
        low: {
            optionName: 'draggableLow',
            axis: 'y',
            move: true,
            resize: true,
            resizeSide: 'bottom',
            handlePositioner: function (point) {
                var bBox = point.lowerGraphic && point.lowerGraphic.getBBox();
                return bBox ? {
                    x: bBox.x + bBox.width / 2,
                    y: bBox.y + bBox.height / 2
                } : { x: -999, y: -999 };
            },
            handleFormatter: arearangeHandleFormatter,
            propValidate: columnrangeDragDropProps.low.propValidate
        },
        /**
         * Allow high value to be dragged individually.
         *
         * @type      {boolean}
         * @default   true
         * @requires  modules/draggable-points
         * @apioption plotOptions.arearange.dragDrop.draggableHigh
         */
        high: {
            optionName: 'draggableHigh',
            axis: 'y',
            move: true,
            resize: true,
            resizeSide: 'top',
            handlePositioner: function (point) {
                var bBox = point.upperGraphic && point.upperGraphic.getBBox();
                return bBox ? {
                    x: bBox.x + bBox.width / 2,
                    y: bBox.y + bBox.height / 2
                } : { x: -999, y: -999 };
            },
            handleFormatter: arearangeHandleFormatter,
            propValidate: columnrangeDragDropProps.high.propValidate
        }
    };
}
// Waterfall - mostly as column, but don't show drag handles for sum points
if (seriesTypes.waterfall) {
    seriesTypes.waterfall.prototype.dragDropProps = {
        x: columnDragDropProps.x,
        y: merge(columnDragDropProps.y, {
            handleFormatter: function (point) {
                return point.isSum || point.isIntermediateSum ? null :
                    columnDragDropProps.y.handleFormatter(point);
            }
        })
    };
}
// Xrange - resize/move x/x2, and move y
if (seriesTypes.xrange) {
    // Handle positioner logic is the same for x and x2 apart from the
    // x value. shapeArgs does not take yAxis reversed etc into account, so we
    // use axis.toPixels to handle positioning.
    var xrangeHandlePositioner = function (point, xProp) {
        var series = point.series, xAxis = series.xAxis, yAxis = series.yAxis, inverted = series.chart.inverted, 
        // Using toPixels handles axis.reversed, but doesn't take
        // chart.inverted into account.
        newX = xAxis.toPixels(point[xProp], true), newY = yAxis.toPixels(point.y, true), offsetY = series.columnMetrics ? series.columnMetrics.offset :
            -point.shapeArgs.height / 2;
        // Handle chart inverted
        if (inverted) {
            newX = xAxis.len - newX;
            newY = yAxis.len - newY;
        }
        newY += offsetY; // (#12872)
        return {
            x: Math.round(newX),
            y: Math.round(newY)
        };
    }, xrangeDragDropProps = seriesTypes.xrange.prototype.dragDropProps = {
        y: {
            axis: 'y',
            move: true
        },
        /**
         * Allow x value to be dragged individually.
         *
         * @type      {boolean}
         * @default   true
         * @requires  modules/draggable-points
         * @apioption plotOptions.xrange.dragDrop.draggableX1
         */
        x: {
            optionName: 'draggableX1',
            axis: 'x',
            move: true,
            resize: true,
            resizeSide: 'left',
            handlePositioner: function (point) {
                return xrangeHandlePositioner(point, 'x');
            },
            handleFormatter: horizHandleFormatter,
            propValidate: function (val, point) {
                return val <= point.x2;
            }
        },
        /**
         * Allow x2 value to be dragged individually.
         *
         * @type      {boolean}
         * @default   true
         * @requires  modules/draggable-points
         * @apioption plotOptions.xrange.dragDrop.draggableX2
         */
        x2: {
            optionName: 'draggableX2',
            axis: 'x',
            move: true,
            resize: true,
            resizeSide: 'right',
            handlePositioner: function (point) {
                return xrangeHandlePositioner(point, 'x2');
            },
            handleFormatter: horizHandleFormatter,
            propValidate: function (val, point) {
                return val >= point.x;
            }
        }
    };
    // Gantt - same as xrange, but with aliases
    if (seriesTypes.gantt) {
        seriesTypes.gantt.prototype.dragDropProps = {
            y: xrangeDragDropProps.y,
            /**
             * Allow start value to be dragged individually.
             *
             * @type      {boolean}
             * @default   true
             * @requires  modules/draggable-points
             * @apioption plotOptions.gantt.dragDrop.draggableStart
             */
            start: merge(xrangeDragDropProps.x, {
                optionName: 'draggableStart',
                // Do not allow individual drag handles for milestones
                validateIndividualDrag: function (point) {
                    return !point.milestone;
                }
            }),
            /**
             * Allow end value to be dragged individually.
             *
             * @type      {boolean}
             * @default   true
             * @requires  modules/draggable-points
             * @apioption plotOptions.gantt.dragDrop.draggableEnd
             */
            end: merge(xrangeDragDropProps.x2, {
                optionName: 'draggableEnd',
                // Do not allow individual drag handles for milestones
                validateIndividualDrag: function (point) {
                    return !point.milestone;
                }
            })
        };
    }
}
// Don't support certain series types
[
    'gauge',
    'pie',
    'sunburst',
    'wordcloud',
    'sankey',
    'histogram',
    'pareto',
    'vector',
    'windbarb',
    'treemap',
    'bellcurve',
    'sma',
    'map',
    'mapline'
].forEach(
/**
 * @private
 * @param {string} type
 *        Unsupported series type
 * @return {void}
 */
function (type) {
    if (seriesTypes[type]) {
        seriesTypes[type].prototype.dragDropProps = null;
    }
});
/**
 * The draggable-points module allows points to be moved around or modified in
 * the chart. In addition to the options mentioned under the `dragDrop` API
 * structure, the module fires three events,
 * [point.dragStart](plotOptions.series.point.events.dragStart),
 * [point.drag](plotOptions.series.point.events.drag) and
 * [point.drop](plotOptions.series.point.events.drop).
 *
 * @sample highcharts/dragdrop/resize-column
 *         Draggable column and line series
 * @sample highcharts/dragdrop/bar-series
 *         Draggable bar
 * @sample highcharts/dragdrop/drag-bubble
 *         Draggable bubbles
 * @sample highcharts/dragdrop/drag-xrange
 *         Draggable X range series
 *
 * @declare   Highcharts.SeriesDragDropOptionsObject
 * @since     6.2.0
 * @requires  modules/draggable-points
 * @apioption plotOptions.series.dragDrop
 */
/**
 * The amount of pixels to drag the pointer before it counts as a drag
 * operation. This prevents drag/drop to fire when just clicking or selecting
 * points.
 *
 * @type      {number}
 * @default   2
 * @since     6.2.0
 * @apioption plotOptions.series.dragDrop.dragSensitivity
 *
 * @private
 */
var defaultDragSensitivity = 2;
/**
 * Style options for the guide box. The guide box has one state by default, the
 * `default` state.
 *
 * @type         {Highcharts.Dictionary<Highcharts.DragDropGuideBoxOptionsObject>}
 * @since        6.2.0
 * @optionparent plotOptions.series.dragDrop.guideBox
 *
 * @private
 */
var defaultGuideBoxOptions = {
    /**
     * Style options for the guide box default state.
     *
     * @declare Highcharts.DragDropGuideBoxOptionsObject
     * @since   6.2.0
     */
    'default': {
        /**
         * CSS class name of the guide box in this state. Defaults to
         * `highcharts-drag-box-default`.
         *
         * @since 6.2.0
         */
        className: 'highcharts-drag-box-default',
        /**
         * Width of the line around the guide box.
         *
         * @since 6.2.0
         */
        lineWidth: 1,
        /**
         * Color of the border around the guide box.
         *
         * @type  {Highcharts.ColorString}
         * @since 6.2.0
         */
        lineColor: '#888',
        /**
         * Guide box fill color.
         *
         * @type  {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
         * @since 6.2.0
         */
        color: 'rgba(0, 0, 0, 0.1)',
        /**
         * Guide box cursor.
         *
         * @since 6.2.0
         */
        cursor: 'move',
        /**
         * Guide box zIndex.
         *
         * @since 6.2.0
         */
        zIndex: 900
    }
};
/**
 * Options for the drag handles.
 *
 * @declare      Highcharts.DragDropHandleOptionsObject
 * @since        6.2.0
 * @optionparent plotOptions.series.dragDrop.dragHandle
 *
 * @private
 */
var defaultDragHandleOptions = {
    /**
     * Function to define the SVG path to use for the drag handles. Takes the
     * point as argument. Should return an SVG path in array format. The SVG
     * path is automatically positioned on the point.
     *
     * @type      {Function}
     * @since     6.2.0
     * @apioption plotOptions.series.dragDrop.dragHandle.pathFormatter
     */
    // pathFormatter: null,
    /**
     * The mouse cursor to use for the drag handles. By default this is
     * intelligently switching between `ew-resize` and `ns-resize` depending on
     * the direction the point is being dragged.
     *
     * @type      {string}
     * @since     6.2.0
     * @apioption plotOptions.series.dragDrop.dragHandle.cursor
     */
    // cursor: null,
    /**
     * The class name of the drag handles. Defaults to `highcharts-drag-handle`.
     *
     * @since 6.2.0
     */
    className: 'highcharts-drag-handle',
    /**
     * The fill color of the drag handles.
     *
     * @type  {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
     * @since 6.2.0
     */
    color: '#fff',
    /**
     * The line color of the drag handles.
     *
     * @type  {Highcharts.ColorString}
     * @since 6.2.0
     */
    lineColor: 'rgba(0, 0, 0, 0.6)',
    /**
     * The line width for the drag handles.
     *
     * @since 6.2.0
     */
    lineWidth: 1,
    /**
     * The z index for the drag handles.
     *
     * @since 6.2.0
     */
    zIndex: 901
};
/**
 * Set the minimum X value the points can be moved to.
 *
 * @sample {gantt} gantt/dragdrop/drag-gantt
 *         Limit dragging
 * @sample {highcharts} highcharts/dragdrop/drag-xrange
 *         Limit dragging
 *
 * @type      {number}
 * @since     6.2.0
 * @apioption plotOptions.series.dragDrop.dragMinX
 */
/**
 * Set the maximum X value the points can be moved to.
 *
 * @sample {gantt} gantt/dragdrop/drag-gantt
 *         Limit dragging
 * @sample {highcharts} highcharts/dragdrop/drag-xrange
 *         Limit dragging
 *
 * @type      {number}
 * @since     6.2.0
 * @apioption plotOptions.series.dragDrop.dragMaxX
 */
/**
 * Set the minimum Y value the points can be moved to.
 *
 * @sample {gantt} gantt/dragdrop/drag-gantt
 *         Limit dragging
 * @sample {highcharts} highcharts/dragdrop/drag-xrange
 *         Limit dragging
 *
 * @type      {number}
 * @since     6.2.0
 * @apioption plotOptions.series.dragDrop.dragMinY
 */
/**
 * Set the maximum Y value the points can be moved to.
 *
 * @sample {gantt} gantt/dragdrop/drag-gantt
 *         Limit dragging
 * @sample {highcharts} highcharts/dragdrop/drag-xrange
 *         Limit dragging
 *
 * @type      {number}
 * @since     6.2.0
 * @apioption plotOptions.series.dragDrop.dragMaxY
 */
/**
 * The X precision value to drag to for this series. Set to 0 to disable. By
 * default this is disabled, except for category axes, where the default is 1.
 *
 * @type      {number}
 * @default   0
 * @since     6.2.0
 * @apioption plotOptions.series.dragDrop.dragPrecisionX
 */
/**
 * The Y precision value to drag to for this series. Set to 0 to disable. By
 * default this is disabled, except for category axes, where the default is 1.
 *
 * @type      {number}
 * @default   0
 * @since     6.2.0
 * @apioption plotOptions.series.dragDrop.dragPrecisionY
 */
/**
 * Enable dragging in the X dimension.
 *
 * @type      {boolean}
 * @since     6.2.0
 * @apioption plotOptions.series.dragDrop.draggableX
 */
/**
 * Enable dragging in the Y dimension. Note that this is not supported for
 * TreeGrid axes (the default axis type in Gantt charts).
 *
 * @type      {boolean}
 * @since     6.2.0
 * @apioption plotOptions.series.dragDrop.draggableY
 */
/**
 * Group the points by a property. Points with the same property value will be
 * grouped together when moving.
 *
 * @sample {gantt} gantt/dragdrop/drag-gantt
 *         Drag grouped points
 * @sample {highcharts} highcharts/dragdrop/drag-xrange
 *         Drag grouped points
 *
 * @type      {string}
 * @since     6.2.0
 * @apioption plotOptions.series.dragDrop.groupBy
 */
/**
 * Update points as they are dragged. If false, a guide box is drawn to
 * illustrate the new point size.
 *
 * @sample {gantt} gantt/dragdrop/drag-gantt
 *         liveRedraw disabled
 * @sample {highcharts} highcharts/dragdrop/drag-xrange
 *         liveRedraw disabled
 *
 * @type      {boolean}
 * @default   true
 * @since     6.2.0
 * @apioption plotOptions.series.dragDrop.liveRedraw
 */
/**
 * Set a key to hold when dragging to zoom the chart. This is useful to avoid
 * zooming while moving points. Should be set different than
 * [chart.panKey](#chart.panKey).
 *
 * @type       {string}
 * @since      6.2.0
 * @validvalue ["alt", "ctrl", "meta", "shift"]
 * @requires  modules/draggable-points
 * @apioption  chart.zoomKey
 */
/**
 * Callback that fires when starting to drag a point. The mouse event object is
 * passed in as an argument. If a drag handle is used, `e.updateProp` is set to
 * the data property being dragged. The `this` context is the point. See
 * [drag and drop options](plotOptions.series.dragDrop).
 *
 * @sample {highcharts} highcharts/dragdrop/drag-xrange
 *         Drag events
 *
 * @type      {Highcharts.PointDragStartCallbackFunction}
 * @since     6.2.0
 * @requires  modules/draggable-points
 * @apioption plotOptions.series.point.events.dragStart
 */
/**
 * Callback that fires while dragging a point. The mouse event is passed in as
 * parameter. The original data can be accessed from `e.origin`, and the new
 * point values can be accessed from `e.newPoints`. If there is only a single
 * point being updated, it can be accessed from `e.newPoint` for simplicity, and
 * its ID can be accessed from `e.newPointId`. The `this` context is the point
 * being dragged. To stop the default drag action, return false. See
 * [drag and drop options](plotOptions.series.dragDrop).
 *
 * @sample {highcharts} highcharts/dragdrop/drag-xrange
 *         Drag events
 *
 * @type      {Highcharts.PointDragCallbackFunction}
 * @since     6.2.0
 * @requires  modules/draggable-points
 * @apioption plotOptions.series.point.events.drag
 */
/**
 * Callback that fires when the point is dropped. The parameters passed are the
 * same as for [drag](#plotOptions.series.point.events.drag). To stop the
 * default drop action, return false. See
 * [drag and drop options](plotOptions.series.dragDrop).
 *
 * @sample {highcharts} highcharts/dragdrop/drag-xrange
 *         Drag events
 *
 * @type      {Highcharts.PointDropCallbackFunction}
 * @since     6.2.0
 * @requires  modules/draggable-points
 * @apioption plotOptions.series.point.events.drop
 */
/**
 * Point specific options for the draggable-points module. Overrides options on
 * `series.dragDrop`.
 *
 * @declare   Highcharts.SeriesLineDataDragDropOptions
 * @extends   plotOptions.series.dragDrop
 * @since     6.2.0
 * @requires  modules/draggable-points
 * @apioption series.line.data.dragDrop
 */
/**
 * Utility function to test if a series is using drag/drop, looking at its
 * options.
 *
 * @private
 * @function isSeriesDraggable
 * @param {Highcharts.Series} series
 *        The series to test.
 * @return {boolean}
 *         True if the series is using drag/drop.
 */
function isSeriesDraggable(series) {
    var props = ['draggableX', 'draggableY'], i;
    // Add optionNames from dragDropProps to the array of props to check for
    objectEach(series.dragDropProps, function (val) {
        if (val.optionName) {
            props.push(val.optionName);
        }
    });
    // Loop over all options we have that could enable dragDrop for this
    // series. If any of them are truthy, this series is draggable.
    i = props.length;
    while (i--) {
        if (series.options.dragDrop[props[i]]) {
            return true;
        }
    }
}
/**
 * Utility function to test if a chart should have drag/drop enabled, looking at
 * its options.
 *
 * @private
 * @function isChartDraggable
 * @param {Highcharts.Chart} chart
 *        The chart to test.
 * @return {boolean}
 *         True if the chart is drag/droppable.
 */
function isChartDraggable(chart) {
    var i = chart.series ? chart.series.length : 0;
    if (chart.hasCartesianSeries && !chart.polar) {
        while (i--) {
            if (chart.series[i].options.dragDrop &&
                isSeriesDraggable(chart.series[i])) {
                return true;
            }
        }
    }
}
/**
 * Utility function to test if a point is movable (any of its props can be
 * dragged by a move, not just individually).
 *
 * @private
 * @function isPointMovable
 * @param {Highcharts.Point} point
 *        The point to test.
 * @return {boolean}
 *         True if the point is movable.
 */
function isPointMovable(point) {
    var series = point.series, seriesDragDropOptions = series.options.dragDrop || {}, pointDragDropOptions = point.options && point.options.dragDrop, updateProps = series.dragDropProps, hasMovableX, hasMovableY;
    objectEach(updateProps, function (p) {
        if (p.axis === 'x' && p.move) {
            hasMovableX = true;
        }
        else if (p.axis === 'y' && p.move) {
            hasMovableY = true;
        }
    });
    // We can only move the point if draggableX/Y is set, even if all the
    // individual prop options are set.
    return ((seriesDragDropOptions.draggableX && hasMovableX ||
        seriesDragDropOptions.draggableY && hasMovableY) &&
        !(pointDragDropOptions &&
            pointDragDropOptions.draggableX === false &&
            pointDragDropOptions.draggableY === false) &&
        series.yAxis &&
        series.xAxis);
}
/**
 * Take a mouse/touch event and return the event object with chartX/chartY.
 *
 * @private
 * @function getNormalizedEvent
 * @param {global.PointerEvent} e
 *        The event to normalize.
 * @param {Highcharts.Chart} chart
 *        The related chart.
 * @return {Highcharts.PointerEventLObject}
 *         The normalized event.
 */
function getNormalizedEvent(e, chart) {
    return (typeof e.chartX === 'undefined' ||
        typeof e.chartY === 'undefined' ?
        chart.pointer.normalize(e) :
        e);
}
/**
 * Add multiple event listeners with the same handler to the same element.
 *
 * @private
 * @function addEvents
 * @param {T} el
 *        The element or object to add listeners to.
 * @param {Array<string>} types
 *        Array with the event types this handler should apply to.
 * @param {Function|Highcharts.EventCallbackFunction<T>} fn
 *        The function callback to execute when the events are fired.
 * @param {Highcharts.EventOptionsObject} [options]
 *        Event options:
 *        - `order`: The order the event handler should be called. This opens
 *          for having one handler be called before another, independent of in
 *          which order they were added.
 * @return {Function}
 *         A callback function to remove the added events.
 * @template T
 */
function addEvents(el, types, fn, options) {
    var removeFuncs = types.map(function (type) {
        return addEvent(el, type, fn, options);
    });
    return function () {
        removeFuncs.forEach(function (fn) {
            fn();
        });
    };
}
/**
 * In mousemove events, check that we have dragged mouse further than the
 * dragSensitivity before we call mouseMove handler.
 *
 * @private
 * @function hasDraggedPastSensitivity
 *
 * @param {Highcharts.PointerEventObject} e
 *        Mouse move event to test.
 *
 * @param {Highcharts.Chart} chart
 *        Chart that has started dragging.
 *
 * @param {number} sensitivity
 *        Pixel sensitivity to test against.
 *
 * @return {boolean}
 *         True if the event is moved past sensitivity relative to the chart's
 *         drag origin.
 */
function hasDraggedPastSensitivity(e, chart, sensitivity) {
    var orig = chart.dragDropData.origin, oldX = orig.chartX, oldY = orig.chartY, newX = e.chartX, newY = e.chartY, distance = Math.sqrt((newX - oldX) * (newX - oldX) +
        (newY - oldY) * (newY - oldY));
    return distance > sensitivity;
}
/**
 * Get a snapshot of points, mouse position, and guide box dimensions
 *
 * @private
 * @function getPositionSnapshot
 *
 * @param {Highcharts.PointerEventObject} e
 *        Mouse event with mouse position to snapshot.
 *
 * @param {Array<Highcharts.Point>} points
 *        Points to take snapshot of. We store the value of the data properties
 *        defined in each series' dragDropProps.
 *
 * @param {Highcharts.SVGElement} [guideBox]
 *        The guide box to take snapshot of.
 *
 * @return {object}
 *         Snapshot object. Point properties are placed in a hashmap with IDs as
 *         keys.
 */
function getPositionSnapshot(e, points, guideBox) {
    var res = {
        chartX: e.chartX,
        chartY: e.chartY,
        guideBox: guideBox && {
            x: guideBox.attr('x'),
            y: guideBox.attr('y'),
            width: guideBox.attr('width'),
            height: guideBox.attr('height')
        },
        points: {}
    };
    // Loop over the points and add their props
    points.forEach(function (point) {
        var pointProps = {};
        // Add all of the props defined in the series' dragDropProps to the
        // snapshot
        objectEach(point.series.dragDropProps, function (val, key) {
            var axis = point.series[val.axis + 'Axis'];
            pointProps[key] = point[key];
            // Record how far cursor was from the point when drag started.
            // This later will be used to calculate new value according to the
            // current position of the cursor.
            // e.g. `high` value is translated to `highOffset`
            pointProps[key + 'Offset'] =
                // e.g. yAxis.toPixels(point.high), xAxis.toPixels(point.end)
                axis.toPixels(point[key]) -
                    (axis.horiz ? e.chartX : e.chartY);
        });
        pointProps.point = point; // Store reference to point
        res.points[point.id] = pointProps;
    });
    return res;
}
/**
 * Get a list of points that are grouped with this point. If only one point is
 * in the group, that point is returned by itself in an array.
 *
 * @private
 * @function getGroupedPoints
 * @param {Highcharts.Point} point
 *        Point to find group from.
 * @return {Array<Highcharts.Point>}
 *         Array of points in this group.
 */
function getGroupedPoints(point) {
    var series = point.series, points = [], groupKey = series.options.dragDrop.groupBy;
    if (series.isSeriesBoosting) { // #11156
        series.options.data.forEach(function (pointOptions, i) {
            points.push((new series.pointClass()).init(// eslint-disable-line new-cap
            series, pointOptions));
            points[points.length - 1].index = i;
        });
    }
    else {
        points = series.points;
    }
    return point.options[groupKey] ?
        // If we have a grouping option, filter the points by that
        points.filter(function (comparePoint) {
            return comparePoint.options[groupKey] ===
                point.options[groupKey];
        }) :
        // Otherwise return the point by itself only
        [point];
}
/**
 * Resize a rect element on one side. The element is modified.
 *
 * @private
 * @function resizeRect
 * @param {Highcharts.SVGElement} rect
 *        Rect element to resize.
 * @param {string} updateSide
 *        Which side of the rect to update. Can be `left`, `right`, `top` or
 *        `bottom`.
 * @param {Highcharts.PositionObject} update
 *        Object with x and y properties, detailing how much to resize each
 *        dimension.
 * @return {void}
 */
function resizeRect(rect, updateSide, update) {
    var resizeAttrs;
    switch (updateSide) {
        case 'left':
            resizeAttrs = {
                x: rect.attr('x') + update.x,
                width: Math.max(1, rect.attr('width') - update.x)
            };
            break;
        case 'right':
            resizeAttrs = {
                width: Math.max(1, rect.attr('width') + update.x)
            };
            break;
        case 'top':
            resizeAttrs = {
                y: rect.attr('y') + update.y,
                height: Math.max(1, rect.attr('height') - update.y)
            };
            break;
        case 'bottom':
            resizeAttrs = {
                height: Math.max(1, rect.attr('height') + update.y)
            };
            break;
        default:
    }
    rect.attr(resizeAttrs);
}
/**
 * Prepare chart.dragDropData with origin info, and show the guide box.
 *
 * @private
 * @function initDragDrop
 * @param {Highcharts.PointerEventObject} e
 *        Mouse event with original mouse position.
 * @param {Highcharts.Point} point
 *        The point the dragging started on.
 * @return {void}
 */
function initDragDrop(e, point) {
    var groupedPoints = getGroupedPoints(point), series = point.series, chart = series.chart, guideBox;
    // If liveRedraw is disabled, show the guide box with the default state
    if (!pick(series.options.dragDrop && series.options.dragDrop.liveRedraw, true)) {
        chart.dragGuideBox = guideBox = series.getGuideBox(groupedPoints);
        chart
            .setGuideBoxState('default', series.options.dragDrop.guideBox)
            .add(series.group);
    }
    // Store some data on the chart to pick up later
    chart.dragDropData = {
        origin: getPositionSnapshot(e, groupedPoints, guideBox),
        point: point,
        groupedPoints: groupedPoints,
        isDragging: true
    };
}
/**
 * Calculate new point options from points being dragged.
 *
 * @private
 * @function getNewPoints
 *
 * @param {object} dragDropData
 *        A chart's dragDropData with drag/drop origin information, and info on
 *        which points are being dragged.
 *
 * @param {Highcharts.PointerEventObject} newPos
 *        Event with the new position of the mouse (chartX/Y properties).
 *
 * @return {Highchats.Dictionary<object>}
 *         Hashmap with point.id mapped to an object with the original point
 *         reference, as well as the new data values.
 */
functi