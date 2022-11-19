", "50%"]
                     * @since   2.3.0
                     * @product highcharts
                     */
                    center: ['50%', '50%'],
                    /**
                     * The size of the pane, either as a number defining pixels, or a
                     * percentage defining a percentage of the available plot area (the
                     * smallest of the plot height or plot width).
                     *
                     * @sample {highcharts} highcharts/demo/gauge-vu-meter/
                     *         Smaller size
                     *
                     * @type    {number|string}
                     * @product highcharts
                     */
                    size: '85%',
                    /**
                     * The inner size of the pane, either as a number defining pixels, or a
                     * percentage defining a percentage of the pane's size.
                     *
                     * @sample {highcharts} highcharts/series-polar/column-inverted-inner
                     *         The inner size set to 20%
                     *
                     * @type    {number|string}
                     * @product highcharts
                     */
                    innerSize: '0%',
                    /**
                     * The start angle of the polar X axis or gauge axis, given in degrees
                     * where 0 is north. Defaults to 0.
                     *
                     * @sample {highcharts} highcharts/demo/gauge-vu-meter/
                     *         VU-meter with custom start and end angle
                     *
                     * @since   2.3.0
                     * @product highcharts
                     */
                    startAngle: 0
                };
                /**
                 * An array of background items for the pane.
                 *
                 * @sample {highcharts} highcharts/demo/gauge-speedometer/
                 *         Speedometer gauge with multiple backgrounds
                 *
                 * @type         {Array<*>}
                 * @optionparent pane.background
                 */
                this.defaultBackgroundOptions = {
                    /**
                     * The class name for this background.
                     *
                     * @sample {highcharts} highcharts/css/pane/
                     *         Panes styled by CSS
                     * @sample {highstock} highcharts/css/pane/
                     *         Panes styled by CSS
                     * @sample {highmaps} highcharts/css/pane/
                     *         Panes styled by CSS
                     *
                     * @type      {string}
                     * @default   highcharts-pane
                     * @since     5.0.0
                     * @apioption pane.background.className
                     */
                    /**
                     * The shape of the pane background. When `solid`, the background
                     * is circular. When `arc`, the background extends only from the min
                     * to the max of the value axis.
                     *
                     * @type    {Highcharts.PaneBackgroundShapeValue}
                     * @since   2.3.0
                     * @product highcharts
                     */
                    shape: 'circle',
                    /**
                     * The pixel border width of the pane background.
                     *
                     * @since 2.3.0
                     * @product highcharts
                     */
                    borderWidth: 1,
                    /**
                     * The pane background border color.
                     *
                     * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                     * @since   2.3.0
                     * @product highcharts
                     */
                    borderColor: '#cccccc',
                    /**
                     * The background color or gradient for the pane.
                     *
                     * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                     * @default { linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }, stops: [[0, #ffffff], [1, #e6e6e6]] }
                     * @since   2.3.0
                     * @product highcharts
                     */
                    backgroundColor: {
                        /** @ignore-option */
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        /** @ignore-option */
                        stops: [
                            [0, '#ffffff'],
                            [1, '#e6e6e6']
                        ]
                    },
                    /** @ignore-option */
                    from: -Number.MAX_VALUE,
                    /**
                     * The inner radius of the pane background. Can be either numeric
                     * (pixels) or a percentage string.
                     *
                     * @type    {number|string}
                     * @since   2.3.0
                     * @product highcharts
                     */
                    innerRadius: 0,
                    /** @ignore-option */
                    to: Number.MAX_VALUE,
                    /**
                     * The outer radius of the circular pane background. Can be either
                     * numeric (pixels) or a percentage string.
                     *
                     * @type     {number|string}
                     * @since    2.3.0
                     * @product  highcharts
                     */
                    outerRadius: '105%'
                };
                this.init(options, chart);
            }
            /**
             * Initialize the Pane object
             *
             * @private
             * @function Highcharts.Pane#init
             *
             * @param {Highcharts.PaneOptions} options
             *
             * @param {Highcharts.Chart} chart
             */
            Pane.prototype.init = function (options, chart) {
                this.chart = chart;
                this.background = [];
                chart.pane.push(this);
                this.setOptions(options);
            };
            /**
             * @private
             * @function Highcharts.Pane#setOptions
             *
             * @param {Highcharts.PaneOptions} options
             */
            Pane.prototype.setOptions = function (options) {
                // Set options. Angular charts have a default background (#3318)
                this.options = options = merge(this.defaultOptions, this.chart.angular ? { background: {} } : void 0, options);
            };
            /**
             * Render the pane with its backgrounds.
             *
             * @private
             * @function Highcharts.Pane#render
             */
            Pane.prototype.render = function () {
                var options = this.options, backgroundOption = this.options.background, renderer = this.chart.renderer, len, i;
                if (!this.group) {
                    this.group = renderer.g('pane-group')
                        .attr({ zIndex: options.zIndex || 0 })
                        .add();
                }
                this.updateCenter();
                // Render the backgrounds
                if (backgroundOption) {
                    backgroundOption = splat(backgroundOption);
                    len = Math.max(backgroundOption.length, this.background.length || 0);
                    for (i = 0; i < len; i++) {
                        // #6641 - if axis exists, chart is circular and apply
                        // background
                        if (backgroundOption[i] && this.axis) {
                            this.renderBackground(merge(this.defaultBackgroundOptions, backgroundOption[i]), i);
                        }
                        else if (this.background[i]) {
                            this.background[i] = this.background[i].destroy();
                            this.background.splice(i, 1);
                        }
                    }
                }
            };
            /**
             * Render an individual pane background.
             *
             * @private
             * @function Highcharts.Pane#renderBackground
             *
             * @param {Highcharts.PaneBackgroundOptions} backgroundOptions
             *        Background options
             *
             * @param {number} i
             *        The index of the background in this.backgrounds
             */
            Pane.prototype.renderBackground = function (backgroundOptions, i) {
                var method = 'animate', attribs = {
                    'class': 'highcharts-pane ' + (backgroundOptions.className || '')
                };
                if (!this.chart.styledMode) {
                    extend(attribs, {
                        'fill': backgroundOptions.backgroundColor,
                        'stroke': backgroundOptions.borderColor,
                        'stroke-width': backgroundOptions.borderWidth
                    });
                }
                if (!this.background[i]) {
                    this.background[i] = this.chart.renderer
                        .path()
                        .add(this.group);
                    method = 'attr';
                }
                this.background[i][method]({
                    'd': this.axis.getPlotBandPath(backgroundOptions.from, backgroundOptions.to, backgroundOptions)
                }).attr(attribs);
            };
            /**
             * Gets the center for the pane and its axis.
             *
             * @private
             * @function Highcharts.Pane#updateCenter
             * @param {Highcharts.Axis} [axis]
             * @return {void}
             */
            Pane.prototype.updateCenter = function (axis) {
                this.center = (axis ||
                    this.axis ||
                    {}).center = CenteredSeriesMixin.getCenter.call(this);
            };
            /**
             * Destroy the pane item
             *
             * @ignore
             * @private
             * @function Highcharts.Pane#destroy
             * /
            destroy: function () {
                erase(this.chart.pane, this);
                this.background.forEach(function (background) {
                    background.destroy();
                });
                this.background.length = 0;
                this.group = this.group.destroy();
            },
            */
            /**
             * Update the pane item with new options
             *
             * @private
             * @function Highcharts.Pane#update
             * @param {Highcharts.PaneOptions} options
             *        New pane options
             * @param {boolean} [redraw]
             * @return {void}
             */
            Pane.prototype.update = function (options, redraw) {
                merge(true, this.options, options);
                merge(true, this.chart.options.pane, options); // #9917
                this.setOptions(this.options);
                this.render();
                this.chart.axes.forEach(function (axis) {
                    if (axis.pane === this) {
                        axis.pane = null;
                        axis.update({}, redraw);
                    }
                }, this);
            };
            return Pane;
        }());
        /**
         * Check whether element is inside or outside pane.
         * @private
         * @param  {number} x Element's x coordinate
         * @param  {number} y Element's y coordinate
         * @param  {Array<number>} center Pane's center (x, y) and diameter
         * @return {boolean}
         */
        function isInsidePane(x, y, center) {
            return Math.sqrt(Math.pow(x - center[0], 2) + Math.pow(y - center[1], 2)) < center[2] / 2;
        }
        H.Chart.prototype.getHoverPane = function (eventArgs) {
            var chart = this;
            var hoverPane;
            if (eventArgs) {
                chart.pane.forEach(function (pane) {
                    var plotX = eventArgs.chartX - chart.plotLeft, plotY = eventArgs.chartY - chart.plotTop, x = chart.inverted ? plotY : plotX, y = chart.inverted ? plotX : plotY;
                    if (isInsidePane(x, y, pane.center)) {
                        hoverPane = pane;
                    }
                });
            }
            return hoverPane;
        };
        addEvent(Chart, 'afterIsInsidePlot', function (e) {
            var chart = this;
            if (chart.polar) {
                e.isInsidePlot = chart.pane.some(function (pane) { return isInsidePane(e.x, e.y, pane.center); });
            }
        });
        addEvent(Pointer, 'beforeGetHoverData', function (eventArgs) {
            var chart = this.chart;
            if (chart.polar) {
                // Find pane we are currently hovering over.
                chart.hoverPane = chart.getHoverPane(eventArgs);
                // Edit filter method to handle polar
                eventArgs.filter = function (s) {
                    return (s.visible &&
                        !(!eventArgs.shared && s.directTouch) && // #3821
                        pick(s.options.enableMouseTracking, true) &&
                        (!chart.hoverPane || s.xAxis.pane === chart.hoverPane));
                };
            }
        });
        addEvent(Pointer, 'afterGetHoverData', function (eventArgs) {
            var chart = this.chart;
            if (eventArgs.hoverPoint &&
                eventArgs.hoverPoint.plotX &&
                eventArgs.hoverPoint.plotY &&
                chart.hoverPane &&
                !isInsidePane(eventArgs.hoverPoint.plotX, eventArgs.hoverPoint.plotY, chart.hoverPane.center)) {
                eventArgs.hoverPoint = void 0;
            }
        });
        H.Pane = Pane;

        return H.Pane;
    });
    _registerModule(_modules, 'parts-more/HiddenAxis.js', [], function () {
        /* *
         *
         *  (c) 2010-2020 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /**
         * @private
         * @class
         */
        var HiddenAxis = /** @class */ (function () {
            function HiddenAxis() {
            }
            /**
             * Augments methods for the x axis in order to hide it completely. Used for
             * the X axis in gauges
             *
             * @private
             *
             * @param {Highcharts.Axis} axis
             * Radial axis to augment.
             */
            HiddenAxis.init = function (axis) {
                axis.getOffset = function () { };
                axis.redraw = function () {
                    this.isDirty = false; // prevent setting Y axis dirty
                };
                axis.render = function () {
                    this.isDirty = false; // prevent setting Y axis dirty
                };
                axis.createLabelCollector = function () {
                    return function () {
                        return;
                    };
                };
                axis.setScale = function () { };
                axis.setCategories = function () { };
                axis.setTitle = function () { };
                axis.isHidden = true;
            };
            return HiddenAxis;
        }());

        return HiddenAxis;
    });
    _registerModule(_modules, 'parts-more/RadialAxis.js', [_modules['parts/Axis.js'], _modules['parts/Tick.js'], _modules['parts-more/HiddenAxis.js'], _modules['parts/Utilities.js']], function (Axis, Tick, HiddenAxis, U) {
        /* *
         *
         *  (c) 2010-2020 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var addEvent = U.addEvent, correctFloat = U.correctFloat, defined = U.defined, extend = U.extend, fireEvent = U.fireEvent, isNumber = U.isNumber, merge = U.merge, pick = U.pick, pInt = U.pInt, relativeLength = U.relativeLength, wrap = U.wrap;
        /**
         * @private
         * @class
         */
        var RadialAxis = /** @class */ (function () {
            function RadialAxis() {
            }
            /* *
             *
             *  Static Functions
             *
             * */
            RadialAxis.init = function (axis) {
                var axisProto = Axis.prototype;
                // Merge and set options.
                axis.setOptions = function (userOptions) {
                    var options = this.options = merge(axis.constructor.defaultOptions, this.defaultPolarOptions, userOptions);
                    // Make sure the plotBands array is instanciated for each Axis
                    // (#2649)
                    if (!options.plotBands) {
                        options.plotBands = [];
                    }
                    fireEvent(this, 'afterSetOptions');
                };
                // Wrap the getOffset method to return zero offset for title or labels
                // in a radial axis.
                axis.getOffset = function () {
                    // Call the Axis prototype method (the method we're in now is on the
                    // instance)
                    axisProto.getOffset.call(this);
                    // Title or label offsets are not counted
                    this.chart.axisOffset[this.side] = 0;
                };
                /**
                 * Get the path for the axis line. This method is also referenced in the
                 * getPlotLinePath method.
                 *
                 * @private
                 *
                 * @param {number} _lineWidth
                 * Line width is not used.
                 *
                 * @param {number} [radius]
                 * Radius of radial path.
                 *
                 * @param {number} [innerRadius]
                 * Inner radius of radial path.
                 *
                 * @return {RadialAxisPath}
                 */
                axis.getLinePath = function (_lineWidth, radius, innerRadius) {
                    var center = this.pane.center, end, chart = this.chart, r = pick(radius, center[2] / 2 - this.offset), path;
                    if (typeof innerRadius === 'undefined') {
                        innerRadius = this.horiz ? 0 : this.center && -this.center[3] / 2;
                    }
                    // In case when innerSize of pane is set, it must be included
                    if (innerRadius) {
                        r += innerRadius;
                    }
                    if (this.isCircular || typeof radius !== 'undefined') {
                        path = this.chart.renderer.symbols.arc(this.left + center[0], this.top + center[1], r, r, {
                            start: this.startAngleRad,
                            end: this.endAngleRad,
                            open: true,
                            innerR: 0
                        });
                        // Bounds used to position the plotLine label next to the line
                        // (#7117)
                        path.xBounds = [this.left + center[0]];
                        path.yBounds = [this.top + center[1] - r];
                    }
                    else {
                        end = this.postTranslate(this.angleRad, r);
                        path = [
                            ['M', this.center[0] + chart.plotLeft, this.center[1] + chart.plotTop],
                            ['L', end.x, end.y]
                        ];
                    }
                    return path;
                };
                /**
                 * Override setAxisTranslation by setting the translation to the
                 * difference in rotation. This allows the translate method to return
                 * angle for any given value.
                 *
                 * @private
                 */
                axis.setAxisTranslation = function () {
                    // Call uber method
                    axisProto.setAxisTranslation.call(this);
                    // Set transA and minPixelPadding
                    if (this.center) { // it's not defined the first time
                        if (this.isCircular) {
                            this.transA = (this.endAngleRad - this.startAngleRad) /
                                ((this.max - this.min) || 1);
                        }
                        else {
                            // The transA here is the length of the axis, so in case
                            // of inner radius, the length must be decreased by it
                            this.transA = ((this.center[2] - this.center[3]) / 2) /
                                ((this.max - this.min) || 1);
                        }
                        if (this.isXAxis) {
                            this.minPixelPadding = this.transA * this.minPointOffset;
                        }
                        else {
                            // This is a workaround for regression #2593, but categories
                            // still don't position correctly.
                            this.minPixelPadding = 0;
                        }
                    }
                };
                /**
                 * In case of auto connect, add one closestPointRange to the max value
                 * right before tickPositions are computed, so that ticks will extend
                 * passed the real max.
                 * @private
                 */
                axis.beforeSetTickPositions = function () {
                    // If autoConnect is true, polygonal grid lines are connected, and
                    // one closestPointRange is added to the X axis to prevent the last
                    // point from overlapping the first.
                    this.autoConnect = (this.isCircular &&
                        typeof pick(this.userMax, this.options.max) === 'undefined' &&
                        correctFloat(this.endAngleRad - this.startAngleRad) ===
                            correctFloat(2 * Math.PI));
                    // This will lead to add an extra tick to xAxis in order to display
                    // a correct range on inverted polar
                    if (!this.isCircular && this.chart.inverted) {
                        this.max++;
                    }
                    if (this.autoConnect) {
                        this.max += ((this.categories && 1) ||
                            this.pointRange ||
                            this.closestPointRange ||
                            0); // #1197, #2260
                    }
                };
                /**
                 * Override the setAxisSize method to use the arc's circumference as
                 * length. This allows tickPixelInterval to apply to pixel lengths along
                 * the perimeter.
                 * @private
                 */
                axis.setAxisSize = function () {
                    var center, start;
                    axisProto.setAxisSize.call(this);
                    if (this.isRadial) {
                        // Set the center array
                        this.pane.updateCenter(this);
                        // In case when the innerSize is set in a polar chart, the axis'
                        // center cannot be a reference to pane's center
                        center = this.center = extend([], this.pane.center);
                        // The sector is used in Axis.translate to compute the
                        // translation of reversed axis points (#2570)
                        if (this.isCircular) {
                            this.sector = this.endAngleRad - this.startAngleRad;
                        }
                        else {
                            // When the pane's startAngle or the axis' angle is set then
                            // new x and y values for vertical axis' center must be
                            // calulated
                            start = this.postTranslate(this.angleRad, center[3] / 2);
                            center[0] = start.x - this.chart.plotLeft;
                            center[1] = start.y - this.chart.plotTop;
                        }
                        // Axis len is used to lay out the ticks
                        this.len = this.width = this.height =
                            (center[2] - center[3]) * pick(this.sector, 1) / 2;
                    }
                };
                /**
                 * Returns the x, y coordinate of a point given by a value and a pixel
                 * distance from center.
                 *
                 * @private
                 *
                 * @param {number} value
                 * Point value.
                 *
                 * @param {number} [length]
                 * Distance from center.
                 *
                 * @return {Highcharts.PositionObject}
                 */
                axis.getPosition = function (value, length) {
                    var translatedVal = this.translate(value);
                    return this.postTranslate(this.isCircular ? translatedVal : this.angleRad, // #2848
                    // In case when translatedVal is negative, the 0 value must be
                    // used instead, in order to deal with lines and labels that
                    // fall out of the visible range near the center of a pane
                    pick(this.isCircular ?
                        length :
                        (translatedVal < 0 ? 0 : translatedVal), this.center[2] / 2) - this.offset);
                };
                /**
                 * Translate from intermediate plotX (angle), plotY (axis.len - radius)
                 * to final chart coordinates.
                 *
                 * @private
                 *
                 * @param {number} angle
                 * Translation angle.
                 *
                 * @param {number} radius
                 * Translation radius.
                 *
                 * @return {Highcharts.PositionObject}
                 */
                axis.postTranslate = function (angle, radius) {
                    var chart = this.chart, center = this.center;
                    angle = this.startAngleRad + angle;
                    return {
                        x: chart.plotLeft + center[0] + Math.cos(angle) * radius,
                        y: chart.plotTop + center[1] + Math.sin(angle) * radius
                    };
                };
                /**
                 * Find the path for plot bands along the radial axis.
                 *
                 * @private
                 *
                 * @param {number} from
                 * From value.
                 *
                 * @param {number} to
                 * To value.
                 *
                 * @param {Highcharts.AxisPlotBandsOptions} options
                 * Band options.
                 *
                 * @return {RadialAxisPath}
                 */
                axis.getPlotBandPath = function (from, to, options) {
                    var radiusToPixels = function (radius) {
                        if (typeof radius === 'string') {
                            var r = parseInt(radius, 10);
                            if (percentRegex.test(radius)) {
                                r = (r * fullRadius) / 100;
                            }
                            return r;
                        }
                        return radius;
                    };
                    var center = this.center, startAngleRad = this.startAngleRad, fullRadius = center[2] / 2, offset = Math.min(this.offset, 0), percentRegex = /%$/, start, end, angle, xOnPerimeter, open, isCircular = this.isCircular, // X axis in a polar chart
                    path, outerRadius = pick(radiusToPixels(options.outerRadius), fullRadius), innerRadius = radiusToPixels(options.innerRadius), thickness = pick(radiusToPixels(options.thickness), 10);
                    // Polygonal plot bands
                    if (this.options.gridLineInterpolation === 'polygon') {
                        path = this.getPlotLinePath({ value: from }).concat(this.getPlotLinePath({ value: to, reverse: true }));
                        // Circular grid bands
                    }
                    else {
                        // Keep within bounds
                        from = Math.max(from, this.min);
                        to = Math.min(to, this.max);
                        var transFrom = this.translate(from);
                        var transTo = this.translate(to);
                        // Plot bands on Y axis (radial axis) - inner and outer
                        // radius depend on to and from
                        if (!isCircular) {
                            outerRadius = transFrom || 0;
                            innerRadius = transTo || 0;
                        }
                        // Handle full circle
                        if (options.shape === 'circle' || !isCircular) {
                            start = -Math.PI / 2;
                            end = Math.PI * 1.5;
                            open = true;
                        }
                        else {
                            start = startAngleRad + (transFrom || 0);
                            end = startAngleRad + (transTo || 0);
                        }
                        outerRadius -= offset; // #5283
                        thickness -= offset; // #5283
                        path = this.chart.renderer.symbols.arc(this.left + center[0], this.top + center[1], outerRadius, outerRadius, {
                            // Math is for reversed yAxis (#3606)
                            start: Math.min(start, end),
                            end: Math.max(start, end),
                            innerR: pick(innerRadius, outerRadius - thickness),
                            open: open
                        });
                        // Provide positioning boxes for the label (#6406)
                        if (isCircular) {
                            angle = (end + start) / 2;
                            xOnPerimeter = (this.left +
                                center[0] +
                                (center[2] / 2) * Math.cos(angle));
                            path.xBounds = angle > -Math.PI / 2 && angle < Math.PI / 2 ?
                                // Right hemisphere
                                [xOnPerimeter, this.chart.plotWidth] :
                                // Left hemisphere
                                [0, xOnPerimeter];
                            path.yBounds = [
                                this.top + center[1] + (center[2] / 2) * Math.sin(angle)
                            ];
                            // Shift up or down to get the label clear of the perimeter
                            path.yBounds[0] += ((angle > -Math.PI && angle < 0) ||
                                (angle > Math.PI)) ? -10 : 10;
                        }
                    }
                    return path;
                };
                // Find the correct end values of crosshair in polar.
                axis.getCrosshairPosition = function (options, x1, y1) {
                    var axis = this, value = options.value, center = axis.pane.center, shapeArgs, end, x2, y2;
                    if (axis.isCircular) {
                        if (!defined(value)) {
                            // When the snap is set to false
                            x2 = options.chartX || 0;
                            y2 = options.chartY || 0;
                            value = axis.translate(Math.atan2(y2 - y1, x2 - x1) - axis.startAngleRad, true);
                        }
                        else if (options.point) {
                            // When the snap is set to true
                            shapeArgs = options.point.shapeArgs || {};
                            if (shapeArgs.start) {
                                // Find a true value of the point based on the
                                // angle
                                value = axis.chart.inverted ?
                                    axis.translate(options.point.rectPlotY, true) :
                                    options.point.x;
                            }
                        }
                        end = axis.getPosition(value);
                        x2 = end.x;
                        y2 = end.y;
                    }
                    else {
                        if (!defined(value)) {
                            x2 = options.chartX;
                            y2 = options.chartY;
                        }
                        if (defined(x2) && defined(y2)) {
                            // Calculate radius of non-circular axis' crosshair
                            y1 = center[1] + axis.chart.plotTop;
                            value = axis.translate(Math.min(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)), center[2] / 2) - center[3] / 2, true);
                        }
                    }
                    return [value, x2 || 0, y2 || 0];
                };
                // Find the path for plot lines perpendicular to the radial axis.
                axis.getPlotLinePath = function (options) {
                    var axis = this, center = axis.pane.center, chart = axis.chart, inverted = chart.inverted, value = options.value, reverse = options.reverse, end = axis.getPosition(value), background = axis.pane.options.background ?
                        (axis.pane.options.background[0] ||
                            axis.pane.options.background) :
                        {}, innerRadius = background.innerRadius || '0%', outerRadius = background.outerRadius || '100%', x1 = center[0] + chart.plotLeft, y1 = center[1] + chart.plotTop, x2 = end.x, y2 = end.y, height = axis.height, isCrosshair = options.isCrosshair, paneInnerR = center[3] / 2, innerRatio, distance, a, b, otherAxis, xy, tickPositions, crossPos, path;
                    // Crosshair logic
                    if (isCrosshair) {
                        // Find crosshair's position and perform destructuring
                        // assignment
                        crossPos = this.getCrosshairPosition(options, x1, y1);
                        value = crossPos[0];
                        x2 = crossPos[1];
                        y2 = crossPos[2];
                    }
                    // Spokes
                    if (axis.isCircular) {
                        distance =
                            Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                        a = (typeof innerRadius === 'string') ?
                            relativeLength(innerRadius, 1) : (innerRadius / distance);
                        b = (typeof outerRadius === 'string') ?
                            relativeLength(outerRadius, 1) : (outerRadius / distance);
                        // To ensure that gridlines won't be displayed in area
                        // defined by innerSize in case of custom radiuses of pane's
                        // background
                        if (center && paneInnerR) {
                            innerRatio = paneInnerR / distance;
                            if (a < innerRatio) {
                                a = innerRatio;
                            }
                            if (b < innerRatio) {
                                b = innerRatio;
                            }
                        }
                        path = [
                            ['M', x1 + a * (x2 - x1), y1 - a * (y1 - y2)],
                            ['L', x2 - (1 - b) * (x2 - x1), y2 + (1 - b) * (y1 - y2)]
                        ];
                        // Concentric circles
                    }
                    else {
                        // Pick the right values depending if it is grid line or
                        // crosshair
                        value = axis.translate(value);
                        // This is required in case when xAxis is non-circular to
                        // prevent grid lines (or crosshairs, if enabled) from
                        // rendering above the center after they supposed to be
                        // displayed below the center point
                        if (value) {
                            if (value < 0 || value > height) {
                                value = 0;
                            }
                        }
                        if (axis.options.gridLineInterpolation === 'circle') {
                            // A value of 0 is in the center, so it won't be
                            // visible, but draw it anyway for update and animation
                            // (#2366)
                            path = axis.getLinePath(0, value, paneInnerR);
                            // Concentric polygons
                        }
                        else {
                            path = [];
                            // Find the other axis (a circular one) in the same pane
                            chart[inverted ? 'yAxis' : 'xAxis'].forEach(function (a) {
                                if (a.pane === axis.pane) {
                                    otherAxis = a;
                                }
                            });
                            if (otherAxis) {
                                tickPositions = otherAxis.tickPositions;
                                if (otherAxis.autoConnect) {
                                    tickPositions =
                                        tickPositions.concat([tickPositions[0]]);
                                }
                                // Reverse the positions for concatenation of polygonal
                                // plot bands
                                if (reverse) {
                                    tickPositions = tickPositions.slice().reverse();
                                }
                                if (value) {
                                    value += paneInnerR;
                                }
                                for (var i = 0; i < tickPositions.length; i++) {
                                    xy = otherAxis.getPosition(tickPositions[i], value);
                                    path.push(i ? ['L', xy.x, xy.y] : ['M', xy.x, xy.y]);
                                }
                            }
                        }
                    }
                    return path;
                };
                // Find the position for the axis title, by default inside the gauge.
                axis.getTitlePosition = function () {
                    var center = this.center, chart = this.chart, titleOptions = this.options.title;
                    return {
                        x: chart.plotLeft + center[0] + (titleOptions.x || 0),
                        y: (chart.plotTop +
                            center[1] -
                            ({
                                high: 0.5,
                                middle: 0.25,
                                low: 0
                            }[titleOptions.align] *
                                center[2]) +
                            (titleOptions.y || 0))
                    };
                };
                /**
                 * Attach and return collecting function for labels in radial axis for
                 * anti-collision.
                 *
                 * @private
                 *
                 * @return {Highcharts.ChartLabelCollectorFunction}
                 */
                axis.createLabelCollector = function () {
                    var axis = this;
                    return function () {
                        if (axis.isRadial &&
                            axis.tickPositions &&
                            // undocumented option for now, but working
                            axis.options.labels.allowOverlap !== true) {
                            return axis.tickPositions
                                .map(function (pos) {
                                return axis.ticks[pos] && axis.ticks[pos].label;
                            })
                                .filter(function (label) {
                                return Boolean(label);
                            });
                        }
                    };
                };
            };
            /**
             * Augments methods for the value axis.
             *
             * @private
             *
             * @param {Highcharts.Axis} AxisClass
             * Axis class to extend.
             *
             * @param {Highcharts.Tick} TickClass
             * Tick class to use.
             */
            RadialAxis.compose = function (AxisClass, TickClass) {
                /* eslint-disable no-invalid-this */
                // Actions before axis init.
                addEvent(AxisClass, 'init', function (e) {
                    var axis = this;
                    var chart = axis.chart;
                    var inverted = chart.inverted, angular = chart.angular, polar = chart.polar, isX = axis.isXAxis, coll = axis.coll, isHidden = angular && isX, isCircular, chartOptions = chart.options, paneIndex = e.userOptions.pane || 0, pane = this.pane =
                        chart.pane && chart.pane[paneIndex];
                    // Prevent changes for colorAxis
                    if (coll === 'colorAxis') {
                        this.isRadial = false;
                        return;
                    }
                    // Before prototype.init
                    if (angular) {
                        if (isHidden) {
                            HiddenAxis.init(axis);
                        }
                        else {
                            RadialAxis.init(axis);
                        }
                        isCircular = !isX;
                        if (isCircular) {
                            axis.defaultPolarOptions = RadialAxis.defaultRadialGaugeOptions;
                        }
                    }
                    else if (polar) {
                        RadialAxis.init(axis);
                        // Check which axis is circular
                        isCircular = axis.horiz;
                        axis.defaultPolarOptions = isCircular ?
                            RadialAxis.defaultCircularOptions :
                            merge(coll === 'xAxis' ?
                                AxisClass.defaultOptions :
                                AxisClass.defaultYAxisOptions, RadialAxis.defaultRadialOptions);
                        // Apply the stack labels for yAxis in case of inverted chart
                        if (inverted && coll === 'yAxis') {
                            axis.defaultPolarOptions.stackLabels = AxisClass.defaultYAxisOptions.stackLabels;
                        }
                    }
                    // Disable certain features on angular and polar axes
                    if (angular || polar) {
                        axis.isRadial = true;
                        chartOptions.chart.zoomType = null;
                        if (!axis.labelCollector) {
                            axis.labelCollector = axis.createLabelCollector();
                        }
                        if (axis.labelCollector) {
                            // Prevent overlapping axis labels (#9761)
                            chart.labelCollectors.push(axis.labelCollector);
                        }
                    }
                    else {
                        this.isRadial = false;
                    }
                    // A pointer back to this axis to borrow geometry
                    if (pane && isCircular) {
                        pane.axis = axis;
                    }
                    axis.isCircular = isCircular;
                });
                addEvent(AxisClass, 'afterInit', function () {
                    var axis = this;
                    var chart = axis.chart, options = axis.options, isHidden = chart.angular && axis.isXAxis, pane = axis.pane, paneOptions = pane && pane.options;
                    if (!isHidden && pane && (chart.angular || chart.polar)) {
                        // Start and end angle options are given in degrees relative to
                        // top, while internal computations are in radians relative to
                        // right (like SVG).
                        // Y axis in polar charts
                        axis.angleRad = (options.angle || 0) * Math.PI / 180;
                        // Gauges
                        axis.startAngleRad =
                            (paneOptions.startAngle - 90) * Math.PI / 180;
                        axis.endAngleRad = (pick(paneOptions.endAngle, paneOptions.startAngle + 360) - 90) * Math.PI / 180; // Gauges
                        axis.offset = options.offset || 0;
                    }
                });
                // Wrap auto label align to avoid setting axis-wide rotation on radial
                // axes. (#4920)
                addEvent(AxisClass, 'autoLabelAlign', function (e) {
                    if (this.isRadial) {
                        e.align = void 0;
                        e.preventDefault();
                    }
                });
                // Remove label collector function on axis remove/update
                addEvent(AxisClass, 'destroy', function () {
                    var axis = this;
                    if (axis.chart &&
                        axis.chart.labelCollectors) {
                        var index = (axis.labelCollector ?
                            axis.chart.labelCollectors.indexOf(axis.labelCollector) :
                            -1);
                        if (index >= 0) {
                            axis.chart.labelCollectors.splice(index, 1);
                        }
                    }
                });
                addEvent(AxisClass, 'initialAxisTranslation', function () {
                    var axis = this;
                    if (axis.isRadial) {
                        axis.beforeSetTickPositions();
                    }
                });
                // Add special cases within the Tick class' methods for radial axes.
                addEvent(TickClass, 'afterGetPosition', function (e) {
                    var tick = this;
                    if (tick.axis.getPosition) {
                        extend(e.pos, tick.axis.getPosition(this.pos));
                    }
                });
                // Find the center position of the label based on the distance option.
                addEvent(TickClass, 'afterGetLabelPosition', function (e) {
                    var tick = this;
                    var axis = tick.axis;
                    var label = tick.label;
                    if (!label) {
                        return;
                    }
                    var labelBBox = label.getBBox(), labelOptions = axis.options.labels, optionsY = labelOptions.y, ret, centerSlot = 20, // 20 degrees to each side at the top and bottom
                    align = labelOptions.align, angle = ((axis.translate(this.pos) + axis.startAngleRad +
                        Math.PI / 2) / Math.PI * 180) % 360, correctAngle = Math.round(angle), labelDir = 'end', // Direction of the label 'start' or 'end'
                    reducedAngle1 = correctAngle < 0 ?
                        correctAngle + 360 : correctAngle, reducedAngle2 = reducedAngle1, translateY = 0, translateX = 0, labelYPosCorrection = labelOptions.y === null ? -labelBBox.height * 0.3 : 0;
                    if (axis.isRadial) { // Both X and Y axes in a polar chart
                        ret = axis.getPosition(this.pos, (axis.center[2] / 2) +
                            relativeLength(pick(labelOptions.distance, -25), axis.center[2] / 2, -axis.center[2] / 2));
                        // Automatically rotated
                        if (labelOptions.rotation === 'auto') {
                            label.attr({
                                rotation: angle
                            });
                            // Vertically centered
                        }
                        else if (optionsY === null) {
                            optionsY = (axis.chart.renderer
                                .fontMetrics(label.styles && label.styles.fontSize).b -
                                labelBBox.height / 2);
                        }
                        // Automatic alignment
                        if (align === null) {
                            if (axis.isCircular) { // Y axis
                                if (labelBBox.width >
                                    axis.len * axis.tickInterval / (axis.max - axis.min)) { // #3506
                                    centerSlot = 0;
                                }
                                if (angle > centerSlot && angle < 180 - centerSlot) {
                                    align = 'left'; // right hemisphere
                                }
                                else if (angle > 180 + centerSlot &&
                                    angle < 360 - centerSlot) {
                                    align = 'right'; // left hemisphere
                                }
                                else {
                                    align = 'center'; // top or bottom
                                }
                            }
                            else {
                                align = 'center';
                            }
                            label.attr({
                                align: align
                            });
                        }
                        // Auto alignment for solid-gauges with two labels (#10635)
                        if (align === 'auto' &&
                            axis.tickPositions.length === 2 &&
                            axis.isCircular) {
                            // Angles reduced to 0 - 90 or 180 - 270
                            if (reducedAngle1 > 90 && reducedAngle1 < 180) {
                                reducedAngle1 = 180 - reducedAngle1;
                            }
                            else if (reducedAngle1 > 270 && reducedAngle1 <= 360) {
                                reducedAngle1 = 540 - reducedAngle1;
                            }
                            // Angles reduced to 0 - 180
                            if (reducedAngle2 > 180 && reducedAngle2 <= 360) {
                                reducedAngle2 = 360 - reducedAngle2;
                            }
                            if ((axis.pane.options.startAngle === correctAngle) ||
                                (axis.pane.options.startAngle === correctAngle + 360) ||
                                (axis.pane.options.startAngle === correctAngle - 360)) {
                                labelDir = 'start';
                            }
                            if ((correctAngle >= -90 && correctAngle <= 90) ||
                                (correctAngle >= -360 && correctAngle <= -270) ||
                                (correctAngle >= 270 && correctAngle <= 360)) {
                                align = (labelDir === 'start') ? 'right' : 'left';
                            }
                            else {
                                align = (labelDir === 'start') ? 'left' : 'right';
                            }
                            // For angles beetwen (90 + n * 180) +- 20
                            if (reducedAngle2 > 70 && reducedAngle2 < 110) {
                                align = 'center';
                            }
                            // auto Y translation
                            if (reducedAngle1 < 15 ||
                                (reducedAngle1 >= 180 && reducedAngle1 < 195)) {
                                translateY = labelBBox.height * 0.3;
                            }
                            else if (reducedAngle1 >= 15 && reducedAngle1 <= 35) {
                                translateY = labelDir === 'start' ?
                                    0 : labelBBox.height * 0.75;
                            }
                            else if (reducedAngle1 >= 195 && reducedAngle1 <= 215) {
                                translateY = labelDir === 'start' ?
                                    labelBBox.height * 0.75 : 0;
                            }
                            else if (reducedAngle1 > 35 && reducedAngle1 <= 90) {
                                translateY = labelDir === 'start' ?
                                    -labelBBox.height * 0.25 : labelBBox.height;
                            }
                            else if (reducedAngle1 > 215 && reducedAngle1 <= 270) {
                                translateY = labelDir === 'start' ?
                                    labelBBox.height : -labelBBox.height * 0.25;
                            }
                            // auto X translation
                            if (reducedAngle2 < 15) {
                                translateX = labelDir === 'start' ?
                                    -labelBBox.height * 0.15 : labelBBox.height * 0.15;
                            }
                            else if (reducedAngle2 > 165 && reducedAngle2 <= 180) {
                                translateX = labelDir === 'start' ?
                                    labelBBox.height * 0.15 : -labelBBox.height * 0.15;
                            }
                            label.attr({ align: align });
                            label.translate(translateX, translateY + labelYPosCorrection);
                        }
                        e.pos.x = ret.x + labelOptions.x;
                        e.pos.y = ret.y + optionsY;
                    }
                });
                // Wrap the getMarkPath function to return the path of the radial marker
                wrap(TickClass.prototype, 'getMarkPath', function (proceed, x, y, tickLength, tickWidth, horiz, renderer) {
                    var tick = this;
                    var axis = tick.axis;
                    var endPoint, ret;
                    if (axis.isRadial) {
                        endPoint = axis.getPosition(this.pos, axis.center[2] / 2 + tickLength);
                        ret = [
                            'M',
                            x,
                            y,
                            'L',
                            endPoint.x,
                            endPoint.y
                        ];
                    }
                    else {
                        ret = proceed.call(this, x, y, tickLength, tickWidth, horiz, renderer);
                    }
                    return ret;
                });
            };
            /* *
             *
             *  Static Properties
             *
             * */
            /**
             * Circular axis around the perimeter of a polar chart.
             * @private
             */
            RadialAxis.defaultCircularOptions = {
                gridLineWidth: 1,
                labels: {
                    align: null,
                    distance: 15,
                    x: 0,
                    y: null,
                    style: {
                        textOverflow: 'none' // wrap lines by default (#7248)
                    }
                },
                maxPadding: 0,
                minPadding: 0,
                showLastLabel: false,
                tickLength: 0
            };
            /**
             * The default options extend defaultYAxisOptions.
             * @private
             */
            RadialAxis.defaultRadialGaugeOptions = {
                labels: {
                    align: 'center',
                    x: 0,
                    y: null // auto
                },
                minorGridLineWidth: 0,
                minorTickInterval: 'auto',
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickWidth: 1,
                tickLength: 10,
                tickPosition: 'inside',
                tickWidth: 2,
                title: {
                    rotation: 0
                },
                zIndex: 2 // behind dials, points in the series group
            };
            /**
             * Radial axis, like a spoke in a polar chart.
             * @private
             */
            RadialAxis.defaultRadialOptions = {
                /**
                 * In a polar chart, this is the angle of the Y axis in degrees, where
                 * 0 is up and 90 is right. The angle determines the position of the
                 * axis line and the labels, though the coordinate system is unaffected.
                 * Since v8.0.0 this option is also applicable for X axis (inverted
                 * polar).
                 *
                 * @sample {highcharts} highcharts/xaxis/angle/
                 *         Custom X axis' angle on inverted polar chart
                 * @sample {highcharts} highcharts/yaxis/angle/
                 *         Dual axis polar chart
                 *
                 * @type      {number}
                 * @default   0
                 * @since     4.2.7
                 * @product   highcharts
                 * @apioption xAxis.angle
                 */
                /**
                 * Polar charts only. Whether the grid lines should draw as a polygon
                 * with straight lines between categories, or as circles. Can be either
                 * `circle` or `polygon`. Since v8.0.0 this option is also applicable
                 * for X axis (inverted polar).
                 *
                 * @sample {highcharts} highcharts/demo/polar-spider/
                 *         Polygon grid lines
                 * @sample {highcharts} highcharts/xaxis/gridlineinterpolation/
                 *         Circle and polygon on inverted polar
                 * @sample {highcharts} highcharts/yaxis/gridlineinterpolation/
                 *         Circle and polygon
                 *
                 * @type       {string}
                 * @product    highcharts
                 * @validvalue ["circle", "polygon"]
                 * @apioption  xAxis.gridLineInterpolation
                 */
                gridLineInterpolation: 'circle',
                gridLineWidth: 1,
                labels: {
                    align: 'right',
                    x: -3,
                    y: -2
                },
                showLastLabel: false,
                title: {
                    x: 4,
                    text: null,
                    rotation: 90
                }
            };
            return RadialAxis;
        }());
        RadialAxis.compose(Axis, Tick); // @todo move outside

        return RadialAxis;
    });
    _registerModule(_modules, 'parts-more/AreaRangeSeries.js', [_modules['parts/Globals.js'], _modules['parts/Point.js'], _modules['parts/Utilities.js']], function (H, Point, U) {
        /* *
         *
         *  (c) 2010-2020 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var defined = U.defined, extend = U.extend, isArray = U.isArray, isNumber = U.isNumber, pick = U.pick, seriesType = U.seriesType;
        var noop = H.noop, Series = H.Series, seriesTypes = H.seriesTypes, seriesProto = Series.prototype, pointProto = Point.prototype;
        /**
         * The area range series is a carteseian series with higher and lower values for
         * each point along an X axis, where the area between the values is shaded.
         *
         * @sample {highcharts} highcharts/demo/arearange/
         *         Area range chart
         * @sample {highstock} stock/demo/arearange/
         *         Area range chart
         *
         * @extends      plotOptions.area
         * @product      highcharts highstock
         * @excluding    stack, stacking
         * @requires     highcharts-more
         * @optionparent plotOptions.arearange
         */
        seriesType('arearange', 'area', {
            /**
             * Whether to apply a drop shadow to the graph line. Since 2.3 the shadow
             * can be an object configuration containing `color`, `offsetX`, `offsetY`,
             * `opacity` and `width`.
             *
             * @type      {boolean|Highcharts.ShadowOptionsObject}
             * @product   highcharts
             * @apioption plotOptions.arearange.shadow
             */
            /**
             * @default   low
             * @apioption plotOptions.arearange.colorKey
             */
            /**
             * Pixel width of the arearange graph line.
             *
             * @since 2.3.0
             *
             * @private
             */
            lineWidth: 1,
            threshold: null,
            tooltip: {
                pointFormat: '<span style="color:{series.color}">\u25CF</span> ' +
                    '{series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'
            },
            /**
             * Whether the whole area or just the line should respond to mouseover
             * tooltips and other mouse or touch events.
             *
             * @since 2.3.0
             *
             * @private
             */
            trackByArea: true,
            /**
             * Extended data labels for range series types. Range series data labels use
             * no `x` and `y` options. Instead, they have `xLow`, `xHigh`, `yLow` and
             * `yHigh` options to allow the higher and lower data label sets
             * individually.
             *
             * @declare Highcharts.SeriesAreaRangeDataLabelsOptionsObject
             * @exclude x, y
             * @since   2.3.0
             * @product highcharts highstock
             *
             * @private
             */
            dataLabels: {
                align: void 0,
                verticalAlign: void 0,
                /**
                 * X offset of the lower data labels relative to the point value.
                 *
                 * @sample highcharts/plotoptions/arearange-datalabels/
                 *         Data labels on range series
                 * @sample highcharts/plotoptions/arearange-datalabels/
                 *         Data labels on range series
                 */
                xLow: 0,
                /**
                 * X offset of the higher data labels relative to the point value.
                 *
                 * @sample highcharts/plotoptions/arearange-datalabels/
                 *         Data labels on range series
                 */
                xHigh: 0,
                /**
                 * Y offset of the lower data labels relative to the point value.
                 *
                 * @sample highcharts/plotoptions/arearange-datalabels/
                 *         Data labels on range series
                 */
                yLow: 0,
                /**
                 * Y offset of the higher data labels relative to the point value.
                 *
                 * @sample highcharts/plotoptions/arearange-datalabels/
                 *         Data labels on range series
                 */
                yHigh: 0
            }
            // Prototype members
        }, {
            pointArrayMap: ['low', 'high'],
            pointValKey: 'low',
            deferTranslatePolar: true,
            /* eslint-disable valid-jsdoc */
            /**
             * @private
             */
            toYData: function (point) {
                return [point.low, point.high];
            },
            /**
             * Translate a point's plotHigh from the internal angle and radius measures
             * to true plotHigh coordinates. This is an addition of the toXY method
             * found in Polar.js, because it runs too early for arearanges to be
             * considered (#3419).
             * @private
             */
            highToXY: function (point) {
                // Find the polar plotX and plotY
                var chart = this.chart, xy = this.xAxis.postTranslate(point.rectPlotX, this.yAxis.len - point.plotHigh);
                point.plotHighX = xy.x - chart.plotLeft;
                point.plotHigh = xy.y - chart.plotTop;
                point.plotLowX = point.plotX;
            },
            /**
             * Translate data points from raw values x and y to plotX and plotY.
             * @private
             */
            translate: function () {
                var series = this, yAxis = series.yAxis, hasModifyValue = !!series.modifyValue;
                seriesTypes.area.prototype.translate.apply(series);
                // Set plotLow and plotHigh
                series.points.forEach(function (point) {
                    var high = point.high, plotY = point.plotY;
                    if (point.isNull) {
                        point.plotY = null;
                    }
                    else {
                        point.plotLow = plotY;
                        point.plotHigh = yAxis.translate(hasModifyValue ?
                            series.modifyValue(high, point) :
                            high, 0, 1, 0, 1);
                        if (hasModifyValue) {
                            point.yBottom = point.plotHigh;
                        }
                    }
                });
                // Postprocess plotHigh
                if (this.chart.polar) {
                    this.points.forEach(function (point) {
                        series.highToXY(point);
                        point.tooltipPos = [
                            (point.plotHighX + point.plotLowX) / 2,
                            (point.plotHigh + point.plotLow) / 2
                        ];
                    });
                }
            },
            /**
             * Extend the line series' getSegmentPath method by applying the segment
             * path to both lower and higher values of the range.
             * @private
             */
            getGraphPath: function (points) {
                var highPoints = [], highAreaPoints = [], i, getGraphPath = seriesTypes.area.prototype.getGraphPath, point, pointShim, linePath, lowerPath, options = this.options, connectEnds = this.chart.polar && options.connectEnds !== false, connectNulls = options.connectNulls, step = options.step, higherPath, higherAreaPath;
                points = points || this.points;
                i = points.length;
                // Create the top line and the top part of the area fill. The area fill
                // compensates for null points by drawing down to the lower graph,
                // moving across the null gap and starting again at the lower graph.
                i = points.length;
                while (i--) {
                    point = points[i];
                    if (!point.isNull &&
                        !connectEnds &&
                        !connectNulls &&
                        (!points[i + 1] || points[i + 1].isNull)) {
                        highAreaPoints.push({
                            plotX: point.plotX,
                            plotY: point.plotY,
                            doCurve: false // #5186, gaps in areasplinerange fill
                        });
                    }
                    pointShim = {
                        polarPlotY: point.polarPlotY,
                        rectPlotX: point.rectPlotX,
                        yBottom: point.yBottom,
                        // plotHighX is for polar charts
                        plotX: pick(point.plotHighX, point.plotX),
                        plotY: point.plotHigh,
                        isNull: point.isNull
                    };
                    highAreaPoints.push(pointShim);
                    highPoints.push(pointShim);
                    if (!point.isNull &&
                        !connectEnds &&
                        !connectNulls &&
                        (!points[i - 1] || points[i - 1].isNull)) {
                        highAreaPoints.push({
                            plotX: point.plotX,
                            plotY: point.plotY,
                            doCurve: false // #5186, gaps in areasplinerange fill
                        });
                    }
                }
                // Get the paths
                lowerPath = getGraphPath.call(this, points);
                if (step) {
                    if (step === true) {
                        step = 'left';
                    }
                    options.step = {
                        left: 'right',
                        center: 'center',
                        right: 'left'
                    }[step]; // swap for reading in getGraphPath
                }
                higherPath = getGraphPath.call(this, highPoints);
                higherAreaPath = getGraphPath.call(this, highAreaPoints);
                options.step = step;
                // Create a line on both top and bottom of the range
                linePath = []
                    .concat(lowerPath, higherPath);
                // For the area path, we need to change the 'move' statement
                // into 'lineTo'
                if (!this.chart.polar && higherAreaPath[0] && higherAreaPath[0][0] === 'M') {
                    // This probably doesn't work for spline
                    higherAreaPath[0] = ['L', higherAreaPath[0][1], higherAreaPath[0][2]];
                }
                this.graphPath = linePath;
                this.areaPath = lowerPath.concat(higherAreaPath);
                // Prepare for sideways animation
                linePath.isArea = true;
                linePath.xMap = lowerPath.xMap;
                this.areaPath.xMap = lowerPath.xMap;
                return linePath;
            },
            /**
             * Extend the basic drawDataLabels method by running it for both lower and
             * higher values.
             * @private
             */
            drawDataLabels: function () {
                var data = this.points, length = data.length, i, originalDataLabels = [], dataLabelOptions = this.options.dataLabels, point, up, inverted = this.chart.inverted, upperDataLabelOptions, lowerDataLabelOptions;
                // Split into upper and lower options. If data labels is an array, the
                // first element is the upper label, the second is the lower.
                //
                // TODO: We want to change this and allow multiple labels for both upper
                // and lower values in the future - introducing some options for which
                // point value to use as Y for the dataLabel, so that this could be
                // handled in Series.drawDataLabels. This would also improve performance
                // since we now have to loop over all the points multiple times to work
                // around the data label logic.
                if (isArray(dataLabelOptions)) {
                    if (dataLabelOptions.length > 1) {
                        upperDataLabelOptions = dataLabelOptions[0];
                        lowerDataLabelOptions = dataLabelOptions[1];
                    }
                    else {
                        upperDataLabelOptions = dataLabelOptions[0];
                        lowerDataLabelOptions = { enabled: false };
                    }
                }
                else {
                    // Make copies
                    upperDataLabelOptions = extend({}, dataLabelOptions);
                    upperDataLabelOptions.x = dataLabelOptions.xHigh;
                    upperDataLabelOptions.y = dataLabelOptions.yHigh;
                    lowerDataLabelOptions = extend({}, dataLabelOptions);
                    lowerDataLabelOptions.x = dataLabelOptions.xLow;
                    lowerDataLabelOptions.y = dataLabelOptions.yLow;
                }
                // Draw upper labels
                if (upperDataLabelOptions.enabled || this._hasPointLabels) {
                    // Set preliminary values for plotY and dataLabel
                    // and draw the upper labels
                    i = length;
                    while (i--) {
                        point = data[i];
                        if (point) {
                            up = upperDataLabelOptions.inside ?
                                point.plotHigh < point.plotLow :
                                point.plotHigh > point.plotLow;
                            point.y = point.high;
                            point._plotY = point.plotY;
                            point.plotY = point.plotHigh;
                            // Store original data labels and set preliminary label
                            // objects to be picked up in the uber method
                            originalDataLabels[i] = point.dataLabel;
                            point.dataLabel = point.dataLabelUpper;
                            // Set the default offset
                            point.below = up;
                            if (inverted) {
                                if (!upperDataLabelOptions.align) {
                                    upperDataLabelOptions.align = up ? 'right' : 'left';
                                }
                            }
                            else {
                                if (!upperDataLabelOptions.verticalAlign) {
                                    upperDataLabelOptions.verticalAlign = up ?
                                        'top' :
                                        'bottom';
                                }
                            }
                        }
                    }
                    this.options.dataLabels = upperDataLabelOptions;
                    if (seriesProto.drawDataLabels) {
                        // #1209:
                        seriesProto.drawDataLabels.apply(this, arguments);
                    }
                    // Reset state after the upper labels were created. Move
                    // it to point.dataLabelUpper and reassign the originals.
                    // We do this here to support not drawing a lower label.
                    i = length;
                    while (i--) {
                        point = data[i];
                        if (point) {
                            point.dataLabelUpper = point.dataLabel;
                            point.dataLabel = originalDataLabels[i];
                            delete point.dataLabels;
                            point.y = point.low;
                            point.plotY = point._plotY;
                        }
                    }
                }
                // Draw lower labels
                if (lowerDataLabelOptions.enabled || this._hasPointLabels) {
                    i = length;
                    while (i--) {
                        point = data[i];
                        if (point) {
                            up = lowerDataLabelOptions.inside ?
                                point.plotHigh < point.plotLow :
                                point.plotHigh > point.plotLow;
                            // Set the default offset
                            point.below = !up;
                            if (inverted) {
                                if (!lowerDataLabelOptions.align) {
                                    lowerDataLabelOptions.align = up ? 'left' : 'right';
                                }
                            }
                            else {
                                if (!lowerDataLabelOptions.verticalAlign) {
                                    lowerDataLabelOptions.verticalAlign = up ?
                                        'bottom' :
                                        'top';
                                }
                            }
                        }
                    }
                    this.options.dataLabels = lowerDataLabelOptions;
                    if (seriesProto.drawDataLabels) {
                        seriesProto.drawDataLabels.apply(this, arguments);
                    }
                }
                // Merge upper and lower into point.dataLabels for later destroying
                if (upperDataLabelOptions.enabled) {
                    i = length;
                    while (i--) {
                        point = data[i];
                        if (point) {
                            point.dataLabels = [
                                point.dataLabelUpper,
                                point.dataLabel
                            ].filter(function (label) {
                                return !!label;
                            });
                        }
                    }
                }
                // Reset options
                this.options.dataLabels = dataLabelOptions;
            },
            alignDataLabel: function () {
                seriesTypes.column.prototype.alignDataLabel
                    .apply(this, arguments);
            },
            drawPoints: function () {
                var series = this, pointLength = series.points.length, point, i;
                // Draw bottom points
                seriesProto.drawPoints
                    .apply(series, arguments);
                // Prepare drawing top points
                i = 0;
                while (i < pointLength) {
                    point = series.points[i];
                    // Save original props to be overridden by temporary props for top
                    // points
                    point.origProps = {
                        plotY: point.plotY,
                        plotX: point.plotX,
                        isInside: point.isInside,
                        negative: point.negative,
                        zone: point.zone,
                        y: point.y
                    };
                    point.lowerGraphic = point.graphic;
                    point.graphic = point.upperGraphic;
                    point.plotY = point.plotHigh;
                    if (defined(point.plotHighX)) {
                        point.plotX = point.plotHighX;
                    }
                    point.y = point.high;
                    point.negative = point.high < (series.options.threshold || 0);
                    point.zone = (series.zones.length && point.getZone());
                    if (!series.chart.polar) {
                        point.isInside = point.isTopInside = (typeof point.plotY !== 'undefined' &&
                            point.plotY >= 0 &&
                            point.plotY <= series.yAxis.len && // #3519
                            point.plotX >= 0 &&
                            point.plotX <= series.xAxis.len);
                    }
                    i++;
                }
                // Draw top points
                seriesProto.drawPoints.apply(series, arguments);
                // Reset top points preliminary modifications
                i = 0;
                while (i < pointLength) {
                    point = series.points[i];
                    point.upperGraphic = point.graphic;
                    point.graphic = point.lowerGraphic;
                    extend(point, point.origProps);
                    delete point.origProps;
                    i++;
                }
            },
            /* eslint-enable valid-jsdoc */
            setStackedPoints: noop
        }, {
            /**
             * Range series only. The high or maximum value for each data point.
             * @name Highcharts.Point#high
             * @type {number|undefined}
             */
            /**
             * Range series only. The low or minimum value for each data point.
             * @name Highcharts.Point#low
             * @type {number|undefined}
             */
            /* eslint-disable valid-jsdoc */
            /**
             * @private
             */
            setState: function () {
                var prevState = this.state, series = this.series, isPolar = series.chart.polar;
                if (!defined(this.plotHigh)) {
                    // Boost doesn't calculate plotHigh
                    this.plotHigh = series.yAxis.toPixels(this.high, true);
                }
                if (!defined(this.plotLow)) {
                    // Boost doesn't calculate plotLow
                    this.plotLow = this.plotY = series.yAxis.toPixels(this.low, true);
                }
                if (series.stateMarkerGraphic) {
                    series.lowerStateMarkerGraphic = series.stateMarkerGraphic;
                    series.stateMarkerGraphic = series.upperStateMarkerGraphic;
                }
                // Change state also for the top marker
                this.graphic = this.upperGraphic;
                this.plotY = this.plotHigh;
                if (isPolar) {
                    this.plotX = this.plotHighX;
                }
                // Top state:
                pointProto.setState.apply(this, arguments);
                this.state = prevState;
                // Now restore defaults
                this.plotY = this.plotLow;
                this.graphic = this.lowerGraphic;
                if (isPolar) {
                    this.plotX = this.plotLowX;
                }
                if (series.stateMarkerGraphic) {
                    series.upperStateMarkerGraphic = series.stateMarkerGraphic;
                    series.stateMarkerGraphic = series.lowerStateMarkerGraphic;
                    // Lower marker is stored at stateMarkerGraphic
                    // to avoid reference duplication (#7021)
                    series.lowerStateMarkerGraphic = void 0;
                }
                pointProto.setState.apply(this, arguments);
            },
            haloPath: function () {
                var isPolar = this.series.chart.polar, path = [];
                // Bottom halo
                this.plotY = this.plotLow;
                if (isPolar) {
                    this.plotX = this.plotLowX;
                }
                if (this.isInside) {
                    path = pointProto.haloPath.apply(this, arguments);
                }
                // Top halo
                this.plotY = this.plotHigh;
                if (isPolar) {
                    this.plotX = this.plotHighX;
                }
                if (this.isTopInside) {
                    path = path.concat(pointProto.haloPath.apply(this, arguments));
                }
                return path;
            },
            destroyElements: function () {
                var graphics = ['lowerGraphic', 'upperGraphic'];
                graphics.forEach(function (graphicName) {
                    if (this[graphicName]) {
                        this[graphicName] =
                            this[graphicName].destroy();
                    }
                }, this);
                // Clear graphic for states, removed in the above each:
                this.graphic = null;
                return pointProto.destroyElements.apply(this, arguments);
            },
            isValid: function () {
                return isNumber(this.low) && isNumber(this.high);
            }
            /* eslint-enable valid-jsdoc */
        });
        /**
         * A `arearange` series. If the [type](#series.arearange.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         *
         * @extends   series,plotOptions.arearange
         * @excluding dataParser, dataURL, stack, stacking
         * @product   highcharts highstock
         * @requires  highcharts-more
         * @apioption series.arearange
         */
        /**
         * An array of data points for the series. For the `arearange` series type,
         * points can be given in the following ways:
         *
         * 1.  An array of arrays with 3 or 2 values. In this case, the values
         *     correspond to `x,low,high`. If the first value is a string, it is
         *     applied as the name of the point, and the `x` value is inferred.
         *     The `x` value can also be omitted, in which case the inner arrays
         *     should be of length 2\. Then the `x` value is automatically calculated,
         *     either starting at 0 and incremented by 1, or from `pointStart`
         *     and `pointInterval` given in the series options.
         *     ```js
         *     data: [
         *         [0, 8, 3],
         *         [1, 1, 1],
         *         [2, 6, 8]
         *     ]
         *     ```
         *
         * 2.  An array of objects with named values. The following snippet shows only a
         *     few settings, see the complete options set below. If the total number of
         *     data points exceeds the series'
         *     [turboThreshold](#series.arearange.turboThreshold),
         *     this option is not available.
         *     ```js
         *     data: [{
         *         x: 1,
         *         low: 9,
         *         high: 0,
         *         name: "Point2",
         *         color: "#00FF00"
         *     }, {
         *         x: 1,
         *         low: 3,
         *         high: 4,
         *         name: "Point1",
         *         color: "#FF00FF"
         *     }]
         *     ```
         *
         * @sample {highcharts} highcharts/series/data-array-of-arrays/
         *         Arrays of numeric x and y
         * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
         *         Arrays of datetime x and y
         * @sample {highcharts} highcharts/series/data-array-of-name-value/
         *         Arrays of point.name and y
         * @sample {highcharts} highcharts/series/data-array-of-objects/
         *         Config objects
         *
         * @type      {Array<Array<(number|string),number>|Array<(number|string),number,number>|*>}
         * @extends   series.line.data
         * @excluding marker, y
         * @product   highcharts highstock
         * @apioption series.arearange.data
         */
        /**
         * @extends   series.arearange.dataLabels
         * @product   highcharts highstock
         * @apioption series.arearange.data.dataLabels
         */
        /**
         * The high or maximum value for each data point.
         *
         * @type      {number}
         * @product   highcharts highstock
         * @apioption series.arearange.data.high
         */
        /**
         * The low or minimum value for each data point.
         *
         * @type      {number}
         * @product   highcharts highstock
         * @apioption series.arearange.data.low
         */
        ''; // adds doclets above to tranpiled file

    });
    _registerModule(_modules, 'parts-more/AreaSplineRangeSeries.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2010-2020 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var seriesType = U.seriesType;
        var seriesTypes = H.seriesTypes;
        /**
         * The area spline range is a cartesian series type with higher and
         * lower Y values along an X axis. The area inside the range is colored, and
         * the graph outlining the area is a smoothed spline.
         *
         * @sample {highstock|highstock} stock/demo/areasplinerange/
         *         Area spline range
         *
         * @extends   plotOptions.arearange
         * @since     2.3.0
         * @excluding step
         * @product   highcharts highstock
         * @requires  highcharts-more
         * @apioption plotOptions.areasplinerange
         */
        seriesType('areasplinerange', 'arearange', null, {
            getPointSpline: seriesTypes.spline.prototype.getPointSpline
        });
        /**
         * A `areasplinerange` series. If the [type](#series.areasplinerange.type)
         * option is not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.areasplinerange
         * @excluding dataParser, dataURL, stack, step
         * @product   highcharts highstock
         * @requires  highcharts-more
         * @apioption series.areasplinerange
         */
        /**
         * An array of data points for the series. For the `areasplinerange`
         * series type, points can be given in the following ways:
         *
         * 1. An array of arrays with 3 or 2 values. In this case, the values correspond
         *    to `x,low,high`. If the first value is a string, it is applied as the name
         *    of the point, and the `x` value is inferred. The `x` value can also be
         *    omitted, in which case the inner arrays should be of length 2\. Then the
         *    `x` value is automatically calculated, either starting at 0 and
         *    incremented by 1, or from `pointStart` and `pointInterval` given in the
         *    series options.
         *    ```js
         *    data: [
         *        [0, 0, 5],
         *        [1, 9, 1],
         *        [2, 5, 2]
         *    ]
         *    ```
         *
         * 2. An array of objects with named values. The following snippet shows only a
         *    few settings, see the complete options set below. If the total number of
         *    data points exceeds the series'
         *    [turboThreshold](#series.areasplinerange.turboThreshold), this option is
         *    not available.
         *    ```js
         *    data: [{
         *        x: 1,
         *        low: 5,
         *        high: 0,
         *        name: "Point2",
         *        color: "#00FF00"
         *    }, {
         *        x: 1,
         *        low: 4,
         *        high: 1,
         *        name: "Point1",
         *        color: "#FF00FF"
         *    }]
         *    ```
         *
         * @sample {highcharts} highcharts/series/data-array-of-arrays/
         *         Arrays of numeric x and y
         * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
         *         Arrays of datetime x and y
         * @sample {highcharts} highcharts/series/data-array-of-name-value/
         *         Arrays of point.name and y
         * @sample {highcharts} highcharts/series/data-array-of-objects/
         *         Config objects
         *
         * @type      {Array<Array<(number|string),number>|Array<(number|string),number,number>|*>}
         * @extends   series.arearange.data
         * @product   highcharts highstock
         * @apioption series.areasplinerange.data
         */
        ''; // adds doclets above to transpiled file

    });
    _registerModule(_modules, 'parts-more/ColumnRangeSeries.js', [_modules['parts/Globals.js'], _modules['parts/Options.js'], _modules['parts/Utilities.js']], function (H, O, U) {
        /* *
         *
         *  (c) 2010-2020 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var defaultOptions = O.defaultOptions;
        var clamp = U.clamp, merge = U.merge, pick = U.pick, seriesType = U.seriesType;
        var noop = H.noop, seriesTypes = H.seriesTypes;
        var colProto = seriesTypes.column.prototype;
        /**
         * The column range is a cartesian series type with higher and lower
         * Y values along an X axis. To display horizontal bars, set
         * [chart.inverted](#chart.inverted) to `true`.
         *
         * @sample {highcharts|highstock} highcharts/demo/columnrange/
         *         Inverted column range
         *
         * @extends      plotOptions.column
         * @since        2.3.0
         * @excluding    negativeColor, stacking, softThreshold, threshold
         * @product      highcharts highstock
         * @requires     highcharts-more
         * @optionparent plotOptions.columnrange
         */
        var columnRangeOptions = {
            /**
             * Extended data labels for range series types. Range series data labels
             * have no `x` and `y` options. Instead, they have `xLow`, `xHigh`,
             * `yLow` and `yHigh` options to allow the higher and lower data label
             * sets individually.
             *
             * @declare   Highcharts.SeriesAreaRangeDataLabelsOptionsObject
             * @extends   plotOptions.arearange.dataLabels
             * @since     2.3.0
             * @product   highcharts highstock
             * @apioption plotOptions.columnrange.dataLabels
             */
            pointRange: null,
            /** @ignore-option */
            marker: null,
            states: {
                hover: {
                    /** @ignore-option */
                    halo: false
                }
            }
        };
        /**
         * The ColumnRangeSeries class
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.columnrange
         *
         * @augments Highcharts.Series
         */
        seriesType('columnrange', 'arearange', merge(defaultOptions.plotOptions.column, defaultOptions.plotOptions.arearange, columnRangeOptions), {
            // eslint-disable-next-line valid-jsdoc
            /**
             * Translate data points from raw values x and y to plotX and plotY
             * @private
             */
            translate: function () {
                var series = this, yAxis = series.yAxis, xAxis = series.xAxis, startAngleRad = xAxis.startAngleRad, start, chart = series.chart, isRadial = series.xAxis.isRadial, safeDistance = Math.max(chart.chartWidth, chart.chartHeight) + 999, plotHigh;
                // eslint-disable-next-line valid-jsdoc
                /**
                 * Don't draw too far outside plot area (#6835)
                 * @private
                 */
                function safeBounds(pixelPos) {
                    return clamp(pixelPos, -safeDistance, safeDistance);
                }
                colProto.translate.apply(series);
                // Set plotLow and plotHigh
                series.points.forEach(function (point) {
                    var shapeArgs = point.shapeArgs, minPointLength = series.options.minPointLength, heightDifference, height, y;
                    point.plotHigh = plotHigh = safeBounds(yAxis.translate(point.high, 0, 1, 0, 1));
                    point.plotLow = safeBounds(point.plotY);
                    // adjust shape
                    y = plotHigh;
                    height = pick(point.rectPlotY, point.plotY) - plotHigh;
                    // Adjust for minPointLength
                    if (Math.abs(height) < minPointLength) {
                        heightDifference = (minPointLength - height);
                        height += heightDifference;
                        y -= heightDifference / 2;
                        // Adjust for negative ranges or reversed Y axis (#1457)
                    }
                    else if (height < 0) {
                        height *= -1;
                        y -= height;
                    }
                    if (isRadial) {
                        start = point.barX + startAngleRad;
                        point.shapeType = 'arc';
                        point.shapeArgs = series.polarArc(y + height, y, start, start + point.pointWidth);
                    }
                    else {
                        shapeArgs.height = height;
                        shapeArgs.y = y;
                        point.tooltipPos = chart.inverted ?
                            [
                                yAxis.len + yAxis.pos - chart.plotLeft - y -
                                    height / 2,
                                xAxis.len + xAxis.pos - chart.plotTop -
                                    shapeArgs.x - shapeArgs.width / 2,
                                height
                            ] : [
                            xAxis.left - chart.plotLeft + shapeArgs.x +
                                shapeArgs.width / 2,
                            yAxis.pos - chart.plotTop + y + height / 2,
                            height
                        ]; // don't inherit from column tooltip position - #3372
                    }
                });
            },
            directTouch: true,
            trackerGroups: ['group', 'dataLabelsGroup'],
            drawGraph: noop,
            getSymbol: noop,
            // Overrides from modules that may be loaded after this module
            crispCol: function () {
                return colProto.crispCol.apply(this, arguments);
            },
            drawPoints: function () {
                return colProto.drawPoints.apply(this, arguments);
            },
            drawTracker: function () {
                return colProto.drawTracker.apply(this, arguments);
            },
            getColumnMetrics: function () {
                return colProto.getColumnMetrics.apply(this, arguments);
            },
            pointAttribs: function () {
                return colProto.pointAttribs.apply(this, arguments);
            },
            animate: function () {
                return colProto.animate.apply(this, arguments);
            },
            polarArc: function () {
                return colProto.polarArc.apply(this, arguments);
            },
            translate3dPoints: function () {
                return colProto.translate3dPoints.apply(this, arguments);
            },
            translate3dShapes: function () {
                return colProto.translate3dShapes.apply(this, arguments);
            }
        }, {
            setState: colProto.pointClass.prototype.setState
        });
        /**
         * A `columnrange` series. If the [type](#series.columnrange.type)
         * option is not specified, it is inherited from
         * [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.columnrange
         * @excluding dataParser, dataURL, stack, stacking
         * @product   highcharts highstock
         * @requires  highcharts-more
         * @apioption series.columnrange
         */
        /**
         * An array of data points for the series. For the `columnrange` series
         * type, points can be given in the following ways:
         *
         * 1. An array of arrays with 3 or 2 values. In this case, the values correspond
         *    to `x,low,high`. If the first value is a string, it is applied as the name
         *    of the point, and the `x` value is inferred. The `x` value can also be
         *    omitted, in which case the inner arrays should be of length 2\. Then the
         *    `x` value is automatically calculated, either starting at 0 and
         *    incremented by 1, or from `pointStart` and `pointInterval` given in the
         *    series options.
         *    ```js
         *    data: [
         *        [0, 4, 2],
         *        [1, 2, 1],
         *        [2, 9, 10]
         *    ]
         *    ```
         *
         * 2. An array of objects with named values. The following snippet shows only a
         *    few settings, see the complete options set below. If the total number of
         *    data points exceeds the series'
         *    [turboThreshold](#series.columnrange.turboThreshold), this option is not
         *    available.
         *    ```js
         *    data: [{
         *        x: 1,
         *        low: 0,
         *        high: 4,
         *        name: "Point2",
         *        color: "#00FF00"
         *    }, {
         *        x: 1,
         *        low: 5,
         *        high: 3,
         *        name: "Point1",
         *        color: "#FF00FF"
         *    }]
         *    ```
         *
         * @sample {highcharts} highcharts/series/data-array-of-arrays/
         *         Arrays of numeric x and y
         * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
         *         Arrays of datetime x and y
         * @sample {highcharts} highcharts/series/data-array-of-name-value/
         *         Arrays of point.name and y
         * @sample {highcharts} highcharts/series/data-array-of-objects/
         *         Config objects
         *
         * @type      {Array<Array<(number|string),number>|Array<(number|string),number,number>|*>}
         * @extends   series.arearange.data
         * @excluding marker
         * @product   highcharts highstock
         * @apioption series.columnrange.data
         */
        /**
         * @extends   series.columnrange.dataLabels
         * @product   highcharts highstock
         * @apioption series.columnrange.data.dataLabels
         */
        /**
         * @excluding halo, lineWidth, lineWidthPlus, marker
         * @product   highcharts highstock
         * @apioption series.columnrange.states.hover
         */
        /**
         * @excluding halo, lineWidth, lineWidthPlus, marker
         * @product   highcharts highstock
         * @apioption series.columnrange.states.select
         */
        ''; // adds doclets above into transpiled

    });
    _registerModule(_modules, 'parts-more/ColumnPyramidSeries.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2010-2020 Sebastian Bochan
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var clamp = U.clamp, pick = U.pick, seriesType = U.seriesType;
        var seriesTypes = H.seriesTypes;
        var colProto = seriesTypes.column.prototype;
        /**
         * The ColumnPyramidSeries class
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.columnpyramid
         *
         * @augments Highcharts.Series
         */
        seriesType('columnpyramid', 'column', 
        /**
         * Column pyramid series display one pyramid per value along an X axis.
         * To display horizontal pyramids, set [chart.inverted](#chart.inverted) to
         * `true`.
         *
         * @sample {highcharts|highstock} highcharts/demo/column-pyramid/
         *         Column pyramid
         * @sample {highcharts|highstock} highcharts/plotoptions/columnpyramid-stacked/
         *         Column pyramid stacked
         * @sample {highcharts|highstock} highcharts/plotoptions/columnpyramid-inverted/
         *         Column pyramid inverted
         *
         * @extends      plotOptions.column
         * @since        7.0.0
         * @product      highcharts highstock
         * @excluding    boostThreshold, borderRadius, crisp, depth, edgeColor,
         *               edgeWidth, groupZPadding, negativeColor, softThreshold,
         *               threshold, zoneAxis, zones
         * @requires     highcharts-more
         * @optionparent plotOptions.columnpyramid
         */
        {
        // no additions
        }, {
            /* eslint-disable-next-line valid-jsdoc */
            /**
             * Overrides the column translate method
             * @private
             */
            translate: function () {
                var series = this, chart = series.chart, options = series.options, dense = series.dense =
                    series.closestPointRange * series.xAxis.transA < 2, borderWidth = series.borderWidth = pick(options.borderWidth, dense ? 0 : 1 // #3635
                ), yAxis = series.yAxis, threshold = options.threshold, translatedThreshold = series.translatedThreshold =
                    yAxis.getThreshold(threshold), minPointLength = pick(options.minPointLength, 5), metrics = series.getColumnMetrics(), pointWidth = metrics.width, 
                // postprocessed for border width
                seriesBarW = series.barW =
                    Math.max(pointWidth, 1 + 2 * borderWidth), pointXOffset = series.pointXOffset = metrics.offset;
                if (chart.inverted) {
                    translatedThreshold -= 0.5; // #3355
                }
                // When the pointPadding is 0,
                // we want the pyramids to be packed tightly,
                // so we allow individual pyramids to have individual sizes.
                // When pointPadding is greater,
                // we strive for equal-width columns (#2694).
                if (options.pointPadding) {
                    seriesBarW = Math.ceil(seriesBarW);
                }
                colProto.translate.apply(series);
                // Record the new values
                series.points.forEach(function (point) {
                    var yBottom = pick(point.yBottom, translatedThreshold), safeDistance = 999 + Math.abs(yBottom), plotY = clamp(point.plotY, -safeDistance, yAxis.len + safeDistance), 
                    // Don't draw too far outside plot area
                    // (#1303, #2241, #4264)
                    barX = point.plotX + pointXOffset, barW = seriesBarW / 2, barY = Math.min(plotY, yBottom), barH = Math.max(plotY, yBottom) - barY, stackTotal, stackHeight, topPointY, topXwidth, bottomXwidth, invBarPos, x1, x2, x3, x4, y1, y2;
                    point.barX = barX;
                    point.pointWidth = pointWidth;
                    // Fix the tooltip on center of grouped pyramids
                    // (#1216, #424, #3648)
                    point.tooltipPos = chart.inverted ?
                        [
                            yAxis.len + yAxis.pos - chart.plotLeft - plotY,
                            series.xAxis.len - barX - barW,
                            barH
                        ] :
                        [
                            barX + barW,
                            plotY + yAxis.pos - chart.plotTop,
                            barH
                        ];
                    stackTotal =
                        threshold + (point.total || point.y);
                    // overwrite stacktotal (always 100 / -100)
                    if (options.stacking === 'percent') {
                        stackTotal =
                            threshold + (point.y < 0) ?
                                -100 :
                                100;
                    }
                    // get the highest point (if stack, extract from total)
                    topPointY = yAxis.toPixels((stackTotal), true);
                    // calculate height of stack (in pixels)
                    stackHeight =
                        chart.plotHeight - topPointY -
                            (chart.plotHeight - translatedThreshold);
                    // topXwidth and bottomXwidth = width of lines from the center
                    // calculated from tanges proportion.
                    // Can not be a NaN #12514
                    topXwidth = stackHeight ? (barW * (barY - topPointY)) / stackHeight : 0;
                    // like topXwidth, but with height of point
                    bottomXwidth = stackHeight ? (barW * (barY + barH - topPointY)) / stackHeight : 0;
                    /*
                            /\
                           /  \
                    x1,y1,------ x2,y1
                         /      \
                        ----------
                    x4,y2        x3,y2
                    */
                    x1 = barX - topXwidth + barW;
                    x2 = barX + topXwidth + barW;
                    x3 = barX + bottomXwidth + barW;
                    x4 = barX - bottomXwidth + barW;
                    y1 = barY - minPointLength;
                    y2 = barY + barH;
                    if (point.y < 0) {
                        y1 = barY;
                        y2 = barY + barH + minPointLength;
                    }
                    // inverted chart
                    if (chart.inverted) {
                        invBarPos = chart.plotWidth - barY;
                        stackHeight = (topPointY -
                            (chart.plotWidth - translatedThreshold));
                        // proportion tanges
                        topXwidth = (barW *
                            (topPointY - invBarPos)) / stackHeight;
                        bottomXwidth = (barW *
                            (topPointY - (invBarPos - barH))) / stackHeight;
                        x1 = barX + barW + topXwidth; // top bottom
                        x2 = x1 - 2 * topXwidth; // top top
                        x3 = barX - bottomXwidth + barW; // bottom top
                        x4 = barX + bottomXwidth + barW; // bottom bottom
                        y1 = barY;
                        y2 = barY + barH - minPointLength;
                        if (point.y < 0) {
                            y2 = barY + barH + minPointLength;
                        }
                    }
                    // Register shape type and arguments to be used in drawPoints
                    point.shapeType = 'path';
                    point.shapeArgs = {
                        // args for datalabels positioning
                        x: x1,
                        y: y1,
                        width: x2 - x1,
                        height: barH,
                        // path of pyramid
                        d: [
                            ['M', x1, y1],
                            ['L', x2, y1],
                            ['L', x3, y2],
                            ['L', x4, y2],
                            ['Z']
                        ]
                    };
                });
            }
        });
        /**
         * A `columnpyramid` series. If the [type](#series.columnpyramid.type) option is
         * not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.columnpyramid
         * @excluding connectEnds, connectNulls, dashStyle, dataParser, dataURL,
         *            gapSize, gapUnit, linecap, lineWidth, marker, step
         * @product   highcharts highstock
         * @requires  highcharts-more
         * @apioption series.columnpyramid
         */
        /**
         * @excluding halo, lineWidth, lineWidthPlus, marker
         * @product   highcharts highstock
         * @apioption series.columnpyramid.states.hover
         */
        /**
         * @excluding halo, lineWidth, lineWidthPlus, marker
         * @product   highcharts highstock
         * @apioption series.columnpyramid.states.select
         */
        /**
         * An array of data points for the series. For the `columnpyramid` series type,
         * points can be given in the following ways:
         *
         * 1. An array of numerical values. In this case, the numerical values will be
         *    interpreted as `y` options. The `x` values will be automatically
         *    calculated, either starting at 0 and incremented by 1, or from
         *    `pointStart` and `pointInterval` given in the series options. If the axis
         *    has categories, these will be used. Example:
         *    ```js
         *    data: [0, 5, 3, 5]
         *    ```
         *
         * 2. An array of arrays with 2 values. In this case, the values correspond to
         *    `x,y`. If the first value is a string, it is applied as the name of the
         *    point, and the `x` value is inferred.
         *    ```js
         *    data: [
         *        [0, 6],
         *        [1, 2],
         *        [2, 6]
         *    ]
         *    ```
         *
         * 3. An array of objects with named values. The objects are point configuration
         *    objects as seen below. If the total number of data points exceeds the
         *    series' [turboThreshold](#series.columnpyramid.turboThreshold), this
         *    option is not available.
         *    ```js
         *    data: [{
         *        x: 1,
         *        y: 9,
         *        name: "Point2",
         *        color: "#00FF00"
         *    }, {
         *        x: 1,
         *        y: 6,
         *        name: "Point1",
         *        color: "#FF00FF"
         *    }]
         *    ```
         *
         * @sample {highcharts} highcharts/chart/reflow-true/
         *         Numerical values
         * @sample {highcharts} highcharts/series/data-array-of-arrays/
         *         Arrays of numeric x and y
         * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
         *         Arrays of datetime x and y
         * @sample {highcharts} highcharts/series/data-array-of-name-value/
         *         Arrays of point.name and y
         * @sample {highcharts} highcharts/series/data-array-of-objects/
         *         Config objects
         *
         * @type      {Array<number|Array<(number|string),(number|null)>|null|*>}
         * @extends   series.line.data
         * @excluding marker
         * @product   highcharts highstock
         * @apioption series.columnpyramid.data
         */
        ''; // adds doclets above to transpiled file;

    });
    _registerModule(_modules, 'parts-more/GaugeSeries.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2010-2020 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var clamp = U.clamp, isNumber = U.isNumber, merge = U.merge, pick = U.pick, pInt = U.pInt, seriesType = U.seriesType;
        var noop = H.noop, Series = H.Series, TrackerMixin = H.TrackerMixin;
        /**
         * Gauges are circular plots displaying one or more values with a dial pointing
         * to values along the perimeter.
         *
         * @sample highcharts/demo/gauge-speedometer/
         *         Gauge chart
         *
         * @extends      plotOptions.line
         * @excluding    animationLimit, boostThreshold, colorAxis, colorKey,
         *               connectEnds, connectNulls, cropThreshold, dashStyle, dragDrop,
         *               findNearestPointBy, getExtremesFromAll, marker, negativeColor,
         *               pointPlacement, shadow, softThreshold, stacking, states, step,
         *               threshold, turboThreshold, xAxis, zoneAxis, zones, dataSorting
         * @product      highcharts
         * @requires     highcharts-more
         * @optionparent plotOptions.gauge
         */
        seriesType('gauge', 'line', {
            /**
             * When this option is `true`, the dial will wrap around the axes. For
             * instance, in a full-range gauge going from 0 to 360, a value of 400
             * will point to 40\. When `wrap` is `false`, the dial stops at 360.
             *
             * @see [overshoot](#plotOptions.gauge.overshoot)
             *
             * @type      {boolean}
             * @default   true
             * @since     3.0
             * @product   highcharts
             * @apioption plotOptions.gauge.wrap
             */
            /**
             * Data labels for the gauge. For gauges, the data labels are enabled
             * by default and shown in a bordered box below the point.
             *
             * @since   2.3.0
             * @product highcharts
             */
            dataLabels: {
                borderColor: '#cccccc',
                borderRadius: 3,
                borderWidth: 1,
                crop: false,
                defer: false,
                enabled: true,
                verticalAlign: 'top',
                y: 15,
                zIndex: 2
            },
            /**
             * Options for the dial or arrow pointer of the gauge.
             *
             * In styled mode, the dial is styled with the
             * `.highcharts-gauge-series .highcharts-dial` rule.
             *
             * @sample {highcharts} highcharts/css/gauge/
             *         Styled mode
             *
             * @type    {*}
             * @since   2.3.0
             * @product highcharts
             */
            dial: {},
            /**
             * The length of the dial's base part, relative to the total radius
             * or length of the dial.
             *
             * @sample {highcharts} highcharts/plotoptions/gauge-dial/
             *         Dial options demonstrated
             *
             * @type      {string}
             * @default   70%
             * @since     2.3.0
             * @product   highcharts
             * @apioption plotOptions.gauge.dial.baseLength
             */
            /**
             * The pixel width of the base of the gauge dial. The base is the part
             * closest to the pivot, defined by baseLength.
             *
             * @sample {highcharts} highcharts/plotoptions/gauge-dial/
             *         Dial options demonstrated
             *
             * @type      {number}
             * @default   3
             * @since     2.3.0
             * @product   highcharts
             * @apioption plotOptions.gauge.dial.baseWidth
             */
            /**
             * The radius or length of the dial, in percentages relative to the
             * radius of the gauge itself.
             *
             * @sample {highcharts} highcharts/plotoptions/gauge-dial/
             *         Dial options demonstrated
             *
             * @type      {string}
             * @default   80%
             * @since     2.3.0
             * @product   highcharts
             * @apioption plotOptions.gauge.dial.radius
             */
            /**
             * The length of the dial's rear end, the part that extends out on the
             * other side of the pivot. Relative to the dial's length.
             *
             * @sample {highcharts} highcharts/plotoptions/gauge-dial/
             *         Dial options demonstrated
             *
             * @type      {string}
             * @default   10%
             * @since     2.3.0
             * @product   highcharts
             * @apioption plotOptions.gauge.dial.rearLength
             */
            /**
             * The width of the top of the dial, closest to the perimeter. The pivot
             * narrows in from the base to the top.
             *
             * @sample {highcharts} highcharts/plotoptions/gauge-dial/
             *         Dial options demonstrated
             *
             * @type      {number}
             * @default   1
             * @since     2.3.0
             * @product   highcharts
             * @apioption plotOptions.gauge.dial.topWidth
             */
            /**
             * The background or fill color of the gauge's dial.
             *
             * @sample {highcharts} highcharts/plotoptions/gauge-dial/
             *         Dial options demonstrated
             *
             * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @default   #000000
             * @since     2.3.0
             * @product   highcharts
             * @apioption plotOptions.gauge.dial.backgroundColor
             */
            /**
             * The border color or stroke of the gauge's dial. By default, the
             * borderWidth is 0, so this must be set in addition to a custom border
             * color.
             *
             * @sample {highcharts} highcharts/plotoptions/gauge-dial/
             *         Dial options demonstrated
             *
             * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @default   #cccccc
             * @since     2.3.0
             * @product   highcharts
             * @apioption plotOptions.gauge.dial.borderColor
             */
            /**
             * The width of the gauge dial border in pixels.
             *
             * @sample {highcharts} highcharts/plotoptions/gauge-dial/
             *         Dial options demonstrated
             *
             * @type      {number}
             * @default   0
             * @since     2.3.0
             * @product   highcharts
             * @apioption plotOptions.gauge.dial.borderWidth
             */
            /**
             * Allow the dial to overshoot the end of the perimeter axis by this
             * many degrees. Say if the gauge axis goes from 0 to 60, a value of
             * 100, or 1000, will show 5 degrees beyond the end of the axis when this
             * option is set to 5.
             *
             * @see [wrap](#plotOptions.gauge.wrap)
             *
             * @sample {highcharts} highcharts/plotoptions/gauge-overshoot/
             *         Allow 5 degrees overshoot
             *
             * @type      {number}
             * @since     3.0.10
             * @product   highcharts
             * @apioption plotOptions.gauge.overshoot
             */
            /**
             * Options for the pivot or the center point of the gauge.
             *
             * In styled mode, the pivot is styled with the
             * `.highcharts-gauge-series .highcharts-pivot` rule.
             *
             * @sample {highcharts} highcharts/css/gauge/
             *         Styled mode
             *
             * @type    {*}
             * @since   2.3.0
             * @product highcharts
             */
            pivot: {},
            /**
             * The pixel radius of the pivot.
             *
             * @sample {highcharts} highcharts/plotoptions/gauge-pivot/
             *         Pivot options demonstrated
             *
             * @type      {number}
             * @default   5
             * @since     2.3.0
             * @product   highcharts
             * @apioption plotOptions.gauge.pivot.radius
             */
            /**
             * The border or stroke width of the pivot.
             *
             * @sample {highcharts} highcharts/plotoptions/gauge-pivot/
             *         Pivot options demonstrated
             *
             * @type      {number}
             * @default   0
             * @since     2.3.0
             * @product   highcharts
             * @apioption plotOptions.gauge.pivot.borderWidth
             */
            /**
             * The border or stroke color of the pivot. In able to change this,
             * the borderWidth must also be set to something other than the default
             * 0.
             *
             * @sample {highcharts} highcharts/plotoptions/gauge-pivot/
             *         Pivot options demonstrated
             *
             * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @default   #cccccc
             * @since     2.3.0
             * @product   highcharts
             * @apioption plotOptions.gauge.pivot.borderColor
             */
            /**
             * The background color or fill of the pivot.
             *
             * @sample {highcharts} highcharts/plotoptions/gauge-pivot/
             *         Pivot options demonstrated
             *
             * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @default   #000000
             * @since     2.3.0
             * @product   highcharts
             * @apioption plotOptions.gauge.pivot.backgroundColor
             */
            tooltip: {
                headerFormat: ''
            },
            /**
             * Whether to display this particular series or series type in the
             * legend. Defaults to false for gauge series.
             *
             * @since   2.3.0
             * @product highcharts
             */
            showInLegend: false
            // Prototype members
        }, {
            // chart.angular will be set to true when a gauge series is present,
            // and this will be used on the axes
            angular: true,
            directTouch: true,
            drawGraph: noop,
            fixedBox: true,
            forceDL: true,
            noSharedTooltip: true,
            trackerGroups: ['group', 'dataLabelsGroup'],
            /* eslint-disable valid-jsdoc */
            /**
             * Calculate paths etc
             * @private
             */
            translate: function () {
                var series = this, yAxis = series.yAxis, options = series.options, center = yAxis.center;
                series.generatePoints();
                series.points.forEach(function (point) {
                    var dialOptions = merge(options.dial, point.dial), radius = ((pInt(pick(dialOptions.radius, '80%')) * center[2]) /
                        200), baseLength = ((pInt(pick(dialOptions.baseLength, '70%')) * radius) /
                        100), rearLength = ((pInt(pick(dialOptions.rearLength, '10%')) * radius) /
                        100), baseWidth = dialOptions.baseWidth || 3, topWidth = dialOptions.topWidth || 1, overshoot = options.overshoot, rotation = yAxis.startAngleRad + yAxis.translate(point.y, null, null, null, true);
                    // Handle the wrap and overshoot options
                    if (isNumber(overshoot) || options.wrap === false) {
                        overshoot = isNumber(overshoot) ?
                            (overshoot / 180 * Math.PI) : 0;
                        rotation = clamp(rotation, yAxis.startAngleRad - overshoot, yAxis.endAngleRad + overshoot);
                    }
                    rotation = rotation * 180 / Math.PI;
                    point.shapeType = 'path';
                    var d = dialOptions.path || [
                        ['M', -rearLength, -baseWidth / 2],
                        ['L', baseLength, -baseWidth / 2],
                        ['L', radius, -topWidth / 2],
                        ['L', radius, topWidth / 2],
                        ['L', baseLength, baseWidth / 2],
                        ['L', -rearLength, baseWidth / 2],
                        ['Z']
                    ];
                    point.shapeArgs = {
                        d: d,
                        translateX: center[0],
                        translateY: center[1],
                        rotation: rotation
                    };
                    // Positions for data label
                    point.plotX = center[0];
                    point.plotY = center[1];
                });
            },
            /**
             * Draw the points where each point is one needle
             * @private
             */
            drawPoints: function () {
                var series = this, chart = series.chart, center = series.yAxis.center, pivot = series.pivot, options = series.options, pivotOptions = options.pivot, renderer = chart.renderer;
                series.points.forEach(function (point) {
                    var graphic = point.graphic, shapeArgs = point.shapeArgs, d = shapeArgs.d, dialOptions = merge(options.dial, point.dial); // #1233
                    if (graphic) {
                        graphic.animate(shapeArgs);
                        shapeArgs.d = d; // animate alters it
                    }
                    else {
                        point.graphic =
                            renderer[point.shapeType](shapeArgs)
                                .attr({
                                // required by VML when animation is false
                                rotation: shapeArgs.rotation,
                                zIndex: 1
                            })
                                .addClass('highcharts-dial')
                                .add(series.group);
                    }
                    // Presentational attributes
                    if (!chart.styledMode) {
                        point.graphic[graphic ? 'animate' : 'attr']({
                            stroke: dialOptions.borderColor || 'none',
                            'stroke-width': dialOptions.borderWidth || 0,
                            fill: dialOptions.backgroundColor ||
                                '#000000'
                        });
                    }
                });
                // Add or move the pivot
                if (pivot) {
                    pivot.animate({
                        translateX: center[0],
                        translateY: center[1]
                    });
                }
                else {
                    series.pivot =
                        renderer.circle(0, 0, pick(pivotOptions.radius, 5))
                            .attr({
                            zIndex: 2
                        })
                            .addClass('highcharts-pivot')
                            .translate(center[0], center[1])
                            .add(series.group);
                    // Presentational attributes
                    if (!chart.styledMode) {
                        series.pivot.attr({
                            'stroke-width': pivotOptions.borderWidth || 0,
                            stroke: pivotOptions.borderColor ||
                                '#cccccc',
                            fill: pivotOptions.backgroundColor ||
                                '#000000'
                        });
                    }
                }
            },
            /**
             * Animate the arrow up from startAngle
             * @private
             */
            animate: function (init) {
                var series = this;
                if (!init) {
                    series.points.forEach(function (point) {
                        var graphic = point.graphic;
                        if (graphic) {
                            // start value
                            graphic.attr({
                                rotation: series.yAxis.startAngleRad * 180 / Math.PI
                            });
                            // animate
                            graphic.animate({
                                rotation: point.shapeArgs.rotation
                            }, series.options.animation);
                        }
                    });
                }
            },
            /**
             * @private
             */
            render: function () {
                this.group = this.plotGroup('group', 'series', this.visible ? 'visible' : 'hidden', this.options.zIndex, this.chart.seriesGroup);
                Series.prototype.render.call(this);
                this.group.clip(this.chart.clipRect);
            },
            /**
             * Extend the basic setData method by running processData and generatePoints
             * immediately, in order to access the points from the legend.
             * @private
             */
            setData: function (data, redraw) {
                Series.prototype.setData.call(this, data, false);
                this.processData();
                this.generatePoints();
                if (pick(redraw, true)) {
                    this.chart.redraw();
                }
            },
            /**
             * Define hasData function for non-cartesian series.
             * Returns true if the series has points at all.
             * @private
             */
            hasData: function () {
                return !!this.points.length; // != 0
            },
            // If the tracking module is loaded, add the point tracker
            drawTracker: TrackerMixin && TrackerMixin.drawTrackerPoint
            /* eslint-enable valid-jsdoc */
        }, {
            // Point members
            /* eslint-disable valid-jsdoc */
            /**
             * Don't do any hover colors or anything
             * @private
             */
            setState: function (state) {
                this.state = state;
            }
            /* eslint-enable valid-jsdoc */
        });
        /**
         * A `gauge` series. If the [type](#series.gauge.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.gauge
         * @excluding animationLimit, boostThreshold, connectEnds, connectNulls,
         *            cropThreshold, dashStyle, dataParser, dataURL, findNearestPointBy,
         *            getExtremesFromAll, marker, negativeColor, pointPlacement, shadow,
         *            softThreshold, stack, stacking, states, step, threshold,
         *            turboThreshold, zoneAxis, zones, dataSorting
         * @product   highcharts
         * @requires  highcharts-more
         * @apioption series.gauge
         */
        /**
         * An array of data points for the series. For the `gauge` series type,
         * points can be given in the following ways:
         *
         * 1. An array of numerical values. In this case, the numerical values will be
         *    interpreted as `y` options. Example:
         *    ```js
         *    data: [0, 5, 3, 5]
         *    ```
         *
         * 2. An array of objects with named values. The following snippet shows only a
         *    few settings, see the complete options set below. If the total number of
         *    data points exceeds the series'
         *    [turboThreshold](#series.gauge.turboThreshold), this option is not
         *    available.
         *    ```js
         *    data: [{
         *        y: 6,
         *        name: "Point2",
         *        color: "#00FF00"
         *    }, {
         *        y: 8,
         *        name: "Point1",
         *       color: "#FF00FF"
         *    }]
         *    ```
         *
         * The typical gauge only contains a single data value.
         *
         * @sample {highcharts} highcharts/chart/reflow-true/
         *         Numerical values
         * @sample {highcharts} highcharts/series/data-array-of-objects/
         *         Config objects
         *
         * @type      {Array<number|null|*>}
         * @extends   series.line.data
         * @excluding drilldown, marker, x
         * @product   highcharts
         * @apioption series.gauge.data
         */
        ''; // adds the doclets above in the transpiled file

    });
    _registerModule(_modules, 'parts-more/BoxPlotSeries.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2010-2020 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var pick = U.pick, seriesType = U.seriesType;
        var noop = H.noop, seriesTypes = H.seriesTypes;
        /**
         * The boxplot series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes#boxplot
         *
         * @augments Highcharts.Series
         */
        /**
         * A box plot is a convenient way of depicting groups of data through their
         * five-number summaries: the smallest observation (sample minimum), lower
         * quartile (Q1), median (Q2), upper quartile (Q3), and largest observation
         * (sample maximum).
         *
         * @sample highcharts/demo/box-plot/
         *         Box plot
         *
         * @extends      plotOptions.column
         * @excluding    borderColor, borderRadius, borderWidth, groupZPadding, states
         * @product      highcharts
         * @requires     highcharts-more
         * @optionparent plotOptions.boxplot
         */
        seriesType('boxplot', 'column', {
            threshold: null,
            tooltip: {
                pointFormat: '<span style="color:{point.color}">\u25CF</span> <b> ' +
                    '{series.name}</b><br/>' +
                    'Maximum: {point.high}<br/>' +
                    'Upper quartile: {point.q3}<br/>' +
                    'Median: {point.median}<br/>' +
                    'Lower quartile: {point.q1}<br/>' +
                    'Minimum: {point.low}<br/>'
            },
            /**
             * The length of the whiskers, the horizontal lines marking low and
             * high values. It can be a numerical pixel value, or a percentage
             * value of the box width. Set `0` to disable whiskers.
             *
             * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
             *         True by default
             *
             * @type    {number|string}
             * @since   3.0
             * @product highcharts
             */
            whiskerLength: '50%',
            /**
             * The fill color of the box.
             *
             * In styled mode, the fill color can be set with the
             * `.highcharts-boxplot-box` class.
             *
             * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
             *         Box plot styling
             *
             * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @default #ffffff
             * @since   3.0
             * @product highcharts
             */
            fillColor: '#ffffff',
            /**
             * The width of the line surrounding the box. If any of
             * [stemWidth](#plotOptions.boxplot.stemWidth),
             * [medianWidth](#plotOptions.boxplot.medianWidth)
             * or [whiskerWidth](#plotOptions.boxplot.whiskerWidth) are `null`,
             * the lineWidth also applies to these lines.
             *
             * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
             *         Box plot styling
             * @sample {highcharts} highcharts/plotoptions/error-bar-styling/
             *         Error bar styling
             *
             * @since   3.0
             * @product highcharts
             */
            lineWidth: 1,
            /**
             * The color of the median line. If `undefined`, the general series color
             * applies.
             *
             * In styled mode, the median stroke width can be set with the
             * `.highcharts-boxplot-median` class.
             *
             * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
             *         Box plot styling
             * @sample {highcharts} highcharts/css/boxplot/
             *         Box plot in styled mode
             * @sample {highcharts} highcharts/plotoptions/error-bar-styling/
             *         Error bar styling
             *
             * @type      {Highcharts.ColorString|Highcharts.GradientColorObject}
             * @since     3.0
             * @product   highcharts
             * @apioption plotOptions.boxplot.medianColor
             */
            /**
             * The pixel width of the median line. If `null`, the
             * [lineWidth](#plotOptions.boxplot.lineWidth) is used.
             *
             * In styled mode, the median stroke width can be set with the
             * `.highcharts-boxplot-median` class.
             *
             * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
             *         Box plot styling
             * @sample {highcharts} highcharts/css/boxplot/
             *         Box plot in styled mode
             *
             * @type    {number|null}
             * @since   3.0
             * @product highcharts
             */
            medianWidth: 2,
            /*
            // States are not working and are removed from docs.
            // Refer to: #2340
            states: {
                hover: {
                    brightness: -0.3
                }
            },

            /**
             * The color of the stem, the vertical line extending from the box to
             * the whiskers. If `undefined`, the series color is used.
             *
             * In styled mode, the stem stroke can be set with the
             * `.highcharts-boxplot-stem` class.
             *
             * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
             *         Box plot styling
             * @sample {highcharts} highcharts/css/boxplot/
             *         Box plot in styled mode
             * @sample {highcharts} highcharts/plotoptions/error-bar-styling/
             *         Error bar styling
             *
             * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @since     3.0
             * @product   highcharts
             * @apioption plotOptions.boxplot.stemColor
             */
            /**
             * The dash style of the box.
             *
             * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
             *         Box plot styling
             * @sample {highcharts} highcharts/css/boxplot/
             *         Box plot in styled mode
             *
             * @type      {Highcharts.DashStyleValue}
             * @default   Solid
             * @since 8.1.0
             * @product   highcharts
             * @apioption plotOptions.boxplot.boxDashStyle
             */
            /**
             * The dash style of the median.
             *
             * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
             *         Box plot styling
             * @sample {highcharts} highcharts/css/boxplot/
             *         Box plot in styled mode
             *
             * @type      {Highcharts.DashStyleValue}
             * @default   Solid
             * @since 8.1.0
             * @product   highcharts
             * @apioption plotOptions.boxplot.medianDashStyle
             */
            /**
             * The dash style of the stem, the vertical line extending from the
             * box to the whiskers.
             *
             * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
             *         Box plot styling
             * @sample {highcharts} highcharts/css/boxplot/
             *         Box plot in styled mode
             * @sample {highcharts} highcharts/plotoptions/error-bar-styling/
             *         Error bar styling
             *
             * @type      {Highcharts.DashStyleValue}
             * @default   Solid
             * @since     3.0
             * @product   highcharts
             * @apioption plotOptions.boxplot.stemDashStyle
             */
            /**
             * The dash style of the whiskers.
             *
             * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
             *         Box plot styling
             * @sample {highcharts} highcharts/css/boxplot/
             *         Box plot in styled mode
             *
             * @type      {Highcharts.DashStyleValue}
             * @default   Solid
             * @since 8.1.0
             * @product   highcharts
             * @apioption plotOptions.boxplot.whiskerDashStyle
             */
            /**
             * The width of the stem, the vertical line extending from the box to
             * the whiskers. If `undefined`, the width is inherited from the
             * [lineWidth](#plotOptions.boxplot.lineWidth) option.
             *
             * In styled mode, the stem stroke width can be set with the
             * `.highcharts-boxplot-stem` class.
             *
             * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
             *         Box plot styling
             * @sample {highcharts} highcharts/css/boxplot/
             *         Box plot in styled mode
             * @sample {highcharts} highcharts/plotoptions/error-bar-styling/
             *         Error bar styling
             *
             * @type      {number}
             * @since     3.0
             * @product   highcharts
             * @apioption plotOptions.boxplot.stemWidth
             */
            /**
             * @default   high
             * @apioption plotOptions.boxplot.colorKey
             */
            /**
             * The color of the whiskers, the horizontal lines marking low and high
             * values. When `undefined`, the general series color is used.
             *
             * In styled mode, the whisker stroke can be set with the
             * `.highcharts-boxplot-whisker` class .
             *
             * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
             *         Box plot styling
             * @sample {highcharts} highcharts/css/boxplot/
             *         Box plot in styled mode
             *
             * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @since     3.0
             * @product   highcharts
             * @apioption plotOptions.boxplot.whiskerColor
             */
            /**
             * The line width of the whiskers, the horizontal lines marking low and
             * high values. When `undefined`, the general
             * [lineWidth](#plotOptions.boxplot.lineWidth) applies.
             *
             * In styled mode, the whisker stroke width can be set with the
             * `.highcharts-boxplot-whisker` class.
             *
             * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
             *         Box plot styling
             * @sample {highcharts} highcharts/css/boxplot/
             *         Box plot in styled mode
             *
             * @since   3.0
             * @product highcharts
             */
            whiskerWidth: 2
        }, /** @lends Highcharts.seriesTypes.boxplot */ {
            // array point configs are mapped to this
            pointArrayMap: ['low', 'q1', 'median', 'q3', 'high'],
            // return a plain array for speedy calculation
            toYData: function (point) {
                return [point.low, point.q1, point.median, point.q3, point.high];
            },
            // defines the top of the tracker
            pointValKey: 'high',
            // Get presentational attributes
            pointAttribs: function () {
                // No attributes should be set on point.graphic which is the group
                return {};
            },
            // Disable data labels for box plot
            drawDataLabels: noop,
            // Translate data points from raw values x and y to plotX and plotY
            translate: function () {
                var series = this, yAxis = series.yAxis, pointArrayMap = series.pointArrayMap;
                seriesTypes.column.prototype.translate.apply(series);
                // do the translation on each point dimension
                series.points.forEach(function (point) {
                    pointArrayMap.forEach(function (key) {
                        if (point[key] !== null) {
                            point[key + 'Plot'] = yAxis.translate(point[key], 0, 1, 0, 1);
                        }
                    });
                    point.plotHigh = point.highPlot; // For data label validation
                });
            },
            // eslint-disable-next-line valid-jsdoc
            /**
             * Draw the data points
             * @private
             */
            drawPoints: function () {
                var series = this, points = series.points, options = series.options, chart = series.chart, renderer = chart.renderer, q1Plot, q3Plot, highPlot, lowPlot, medianPlot, medianPath, crispCorr, crispX = 0, boxPath, width, left, right, halfWidth, 
                // error bar inherits this series type but doesn't do quartiles
                doQuartiles = series.doQuartiles !== false, pointWiskerLength, whiskerLength = series.options.whiskerLength;
                points.forEach(function (point) {
                    var graphic = point.graphic, verb = graphic ? 'animate' : 'attr', shapeArgs = point.shapeArgs, boxAttr = {}, stemAttr = {}, whiskersAttr = {}, medianAttr = {}, color = point.color || series.color;
                    if (typeof point.plotY !== 'undefined') {
                        // crisp vector coordinates
                        width = Math.round(shapeArgs.width);
                        left = Math.floor(shapeArgs.x);
                        right = left + width;
                        halfWidth = Math.round(width / 2);
                        q1Plot = Math.floor(doQuartiles ? point.q1Plot : point.lowPlot);
                        q3Plot = Math.floor(doQuartiles ? point.q3Plot : point.lowPlot);
                        highPlot = Math.floor(point.highPlot);
                        lowPlot = Math.floor(point.lowPlot);
                        if (!graphic) {
                            point.graphic = graphic = renderer.g('point')
                                .add(series.group);
                            point.stem = renderer.path()
                                .addClass('highcharts-boxplot-stem')
                                .add(graphic);
                            if (whiskerLength) {
                                point.whiskers = renderer.path()
                                    .addClass('highcharts-boxplot-whisker')
                                    .add(graphic);
                            }
                            if (doQuartiles) {
                                point.box = renderer.path(boxPath)
                                    .addClass('highcharts-boxplot-box')
                                    .add(graphic);
                            }
                            point.medianShape = renderer.path(medianPath)
                                .addClass('highcharts-boxplot-median')
                                .add(graphic);
                        }
                        if (!chart.styledMode) {
                            // Stem attributes
                            stemAttr.stroke =
                                point.stemColor || options.stemColor || color;
                            stemAttr['stroke-width'] = pick(point.stemWidth, options.stemWidth, options.lineWidth);
                            stemAttr.dashstyle = (point.stemDashStyle ||
                                options.stemDashStyle ||
                                options.dashStyle);
                            point.stem.attr(stemAttr);
                            // Whiskers attributes
                            if (whiskerLength) {
                                whiskersAttr.stroke = (point.whiskerColor ||
                                    options.whiskerColor ||
                                    color);
                                whiskersAttr['stroke-width'] = pick(point.whiskerWidth, options.whiskerWidth, options.lineWidth);
                                whiskersAttr.dashstyle = (point.whiskerDashStyle ||
                                    options.whiskerDashStyle ||
                                    options.dashStyle);
                                point.whiskers.attr(whiskersAttr);
                            }
                            if (doQuartiles) {
                                boxAttr.fill = (point.fillColor ||
                                    options.fillColor ||
                                    color);
                                boxAttr.stroke = options.lineColor || color;
                                boxAttr['stroke-width'] = options.lineWidth || 0;
                                boxAttr.dashstyle = (point.boxDashStyle ||
                                    options.boxDashStyle ||
                                    options.dashStyle);
                                point.box.attr(boxAttr);
                            }
                            // Median attributes
                            medianAttr.stroke = (point.medianColor ||
                                options.medianColor ||
                                color);
                            medianAttr['stroke-width'] = pick(point.medianWidth, options.medianWidth, options.lineWidth);
                            medianAttr.dashstyle = (point.medianDashStyle ||
                                options.medianDashStyle ||
                                options.dashStyle);
                            point.medianShape.attr(medianAttr);
                        }
                        var d = void 0;
                        // The stem
                        crispCorr = (point.stem.strokeWidth() % 2) / 2;
                        crispX = left + halfWidth + crispCorr;
                        d = [
                            // stem up
                            ['M', crispX, q3Plot],
                            ['L', crispX, highPlot],
                            // stem down
                            ['M', crispX, q1Plot],
                            ['L', crispX, lowPlot]
                        ];
                        point.stem[verb]({ d: d });
                        // The box
                        if (doQuartiles) {
                            crispCorr = (point.box.strokeWidth() % 2) / 2;
                            q1Plot = Math.floor(q1Plot) + crispCorr;
                            q3Plot = Math.floor(q3Plot) + crispCorr;
                            left += crispCorr;
                            right += crispCorr;
                            d = [
                                ['M', left, q3Plot],
                                ['L', left, q1Plot],
                                ['L', right, q1Plot],
                                ['L', right, q3Plot],
                                ['L', left, q3Plot],
                                ['Z']
                            ];
                            point.box[verb]({ d: d });
                        }
                        // The whiskers
                        if (whiskerLength) {
                            crispCorr = (point.whiskers.strokeWidth() % 2) / 2;
                            highPlot = highPlot + crispCorr;
                            lowPlot = lowPlot + crispCorr;
                            pointWiskerLength = (/%$/).test(whiskerLength) ?
                                halfWidth * parseFloat(whiskerLength) / 100 :
                                whiskerLength / 2;
                            d = [
                                // High whisker
                                ['M', crispX - pointWiskerLength, highPlot],
                                ['L', crispX + pointWiskerLength, highPlot],
                                // Low whisker
                                ['M', crispX - pointWiskerLength, lowPlot],
                                ['L', crispX + pointWiskerLength, lowPlot]
                            ];
                            point.whiskers[verb]({ d: d });
                        }
                        // The median
                        medianPlot = Math.round(point.medianPlot);
                        crispCorr = (point.medianShape.strokeWidth() % 2) / 2;
                        medianPlot = medianPlot + crispCorr;
                        d = [
                            ['M', left, medianPlot],
                            ['L', right, medianPlot]
                        ];
                        point.medianShape[verb]({ d: d });
                    }
                });
            },
            setStackedPoints: noop // #3890
        });
        /**
         * A `boxplot` series. If the [type](#series.boxplot.type) option is
         * not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.boxplot
         * @excluding dataParser, dataURL, marker, stack, stacking, states
         * @product   highcharts
         * @requires  highcharts-more
         * @apioption series.boxplot
         */
        /**
         * An array of data points for the series. For the `boxplot` series
         * type, points can be given in the following ways:
         *
         * 1. An array of arrays with 6 or 5 values. In this case, the values correspond
         *    to `x,low,q1,median,q3,high`. If the first value is a string, it is
         *    applied as the name of the point, and the `x` value is inferred. The `x`
         *    value can also be omitted, in which case the inner arrays should be of
         *    length 5. Then the `x` value is automatically calculated, either starting
         *    at 0 and incremented by 1, or from `pointStart` and `pointInterval` given
         *    in the series options.
         *    ```js
         *    data: [
         *        [0, 3, 0, 10, 3, 5],
         *        [1, 7, 8, 7, 2, 9],
         *        [2, 6, 9, 5, 1, 3]
         *    ]
         *    ```
         *
         * 2. An array of objects with named values. The following snippet shows only a
         *    few settings, see the complete options set below. If the total number of
         *    data points exceeds the series'
         *    [turboThreshold](#series.boxplot.turboThreshold), this option is not
         *    available.
         *    ```js
         *    data: [{
         *        x: 1,
         *        low: 4,
         *        q1: 9,
         *        median: 9,
         *        q3: 1,
         *        high: 10,
         *        name: "Point2",
         *        color: "#00FF00"
         *    }, {
         *        x: 1,
         *        low: 5,
         *        q1: 7,
         *        median: 3,
         *        q3: 6,
         *        high: 2,
         *        name: "Point1",
         *        color: "#FF00FF"
         *    }]
         *    ```
         *
         * @sample {highcharts} highcharts/series/data-array-of-arrays/
         *         Arrays of numeric x and y
         * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
         *         Arrays of datetime x and y
         * @sample {highcharts} highcharts/series/data-array-of-name-value/
         *         Arrays of point.name and y
         * @sample {highcharts} highcharts/series/data-array-of-objects/
         *         Config objects
         *
         * @type      {Array<Array<(number|string),number,number,number,number>|Array<(number|string),number,number,number,number,number>|*>}
         * @extends   series.line.data
         * @excluding marker
         * @product   highcharts
         * @apioption series.boxplot.data
         */
        /**
         * The `high` value for each data point, signifying the highest value
         * in the sample set. The top whisker is drawn here.
         *
         * @type      {number}
         * @product   highcharts
         * @apioption series.boxplot.data.high
         */
        /**
         * The `low` value for each data point, signifying the lowest value
         * in the sample set. The bottom whisker is drawn here.
         *
         * @type      {number}
         * @product   highcharts
         * @apioption series.boxplot.data.low
         */
        /**
         * The median for each data point. This is drawn as a line through the
         * middle area of the box.
         *
         * @type      {number}
         * @product   highcharts
         * @apioption series.boxplot.data.median
         */
        /**
         * The lower quartile for each data point. This is the bottom of the
         * box.
         *
         * @type      {number}
         * @product   highcharts
         * @apioption series.boxplot.data.q1
         */
        /**
         * The higher quartile for each data point. This is the top of the box.
         *
         * @type      {number}
         * @product   highcharts
         * @apioption series.boxplot.data.q3
         */
        /**
         * The dash style of the box.
         *
         * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
         *         Box plot styling
         * @sample {highcharts} highcharts/css/boxplot/
         *         Box plot in styled mode
         *
         * @type      {Highcharts.DashStyleValue}
         * @default   Solid
         * @since 8.1.0
         * @product   highcharts
         * @apioption series.boxplot.data.boxDashStyle
         */
        /**
         * The dash style of the median.
         *
         * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
         *         Box plot styling
         * @sample {highcharts} highcharts/css/boxplot/
         *         Box plot in styled mode
         *
         * @type      {Highcharts.DashStyleValue}
         * @default   Solid
         * @since 8.1.0
         * @product   highcharts
         * @apioption series.boxplot.data.medianDashStyle
         */
        /**
         * The dash style of the stem.
         *
         * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
         *         Box plot styling
         * @sample {highcharts} highcharts/css/boxplot/
         *         Box plot in styled mode
         *
         * @type      {Highcharts.DashStyleValue}
         * @default   Solid
         * @since 8.1.0
         * @product   highcharts
         * @apioption series.boxplot.data.stemDashStyle
         */
        /**
         * The dash style of the whiskers.
         *
         * @sample {highcharts} highcharts/plotoptions/box-plot-styling/
         *         Box plot styling
         * @sample {highcharts} highcharts/css/boxplot/
         *         Box plot in styled mode
         *
         * @type      {Highcharts.DashStyleValue}
         * @default   Solid
         * @since 8.1.0
         * @product   highcharts
         * @apioption series.boxplot.data.whiskerDashStyle
         */
        ''; // adds doclets above to transpiled file

    });
    _registerModule(_modules, 'parts-more/ErrorBarSeries.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2010-2020 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var seriesType = U.seriesType;
        var noop = H.noop, seriesTypes = H.seriesTypes;
        /**
         * Error bars are a graphical representation of the variability of data and are
         * used on graphs to indicate the error, or uncertainty in a reported
         * measurement.
         *
         * @sample highcharts/demo/error-bar/
         *         Error bars on a column series
         * @sample highcharts/series-errorbar/on-scatter/
         *         Error bars on a scatter series
         *
         * @extends      plotOptions.boxplot
         * @product      highcharts highstock
         * @requires     highcharts-more
         * @optionparent plotOptions.errorbar
         */
        seriesType('errorbar', 'boxplot', {
            /**
             * The main color of the bars. This can be overridden by
             * [stemColor](#plotOptions.errorbar.stemColor) and
             * [whiskerColor](#plotOptions.errorbar.whiskerColor) individually.
             *
             * @sample {highcharts} highcharts/plotoptions/error-bar-styling/
             *         Error bar styling
             *
             * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @default #000000
             * @since   3.0
             * @product highcharts
             */
            color: '#000000',
            grouping: false,
            /**
             * The parent series of the error bar. The default value links it to
             * the previous series. Otherwise, use the id of the parent series.
             *
             * @since   3.0
             * @product highcharts
             */
            linkedTo: ':previous',
            tooltip: {
                pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>'
            },
            /**
             * The line width of the whiskers, the horizontal lines marking low
             * and high values. When `null`, the general
             * [lineWidth](#plotOptions.errorbar.lineWidth) applies.
             *
             * @sample {highcharts} highcharts/plotoptions/error-bar-styling/
             *         Error bar styling
             *
             * @type    {number}
             * @since   3.0
             * @product highcharts
             */
            whiskerWidth: null
            // Prototype members
        }, {
            type: 'errorbar',
            // array point configs are mapped to this
            pointArrayMap: ['low', 'high'],
            // return a plain array for speedy calculation
            toYData: function (point) {
                return [point.low, point.high];
            },
            pointValKey: 'high',
            doQuartiles: false,
            drawDataLabels: seriesTypes.arearange ?
                function () {
                    var valKey = this.pointValKey;
                    seriesTypes.arearange.prototype.drawDataLabels.call(this);
                    // Arearange drawDataLabels does not reset point.y to high,
                    // but to low after drawing (#4133)
                    this.data.forEach(function (point) {
                        point.y = point[valKey];
                    });
                } :
                noop,
            // Get the width and X offset, either on top of the linked series column or
            // standalone
            getColumnMetrics: function () {
                return ((this.linkedParent && this.linkedParent.columnMetrics) ||
                    seriesTypes.column.prototype.getColumnMetrics.call(this));
            }
        });
        /**
         * A `errorbar` series. If the [type](#series.errorbar.type) option
         * is not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.errorbar
         * @excluding dataParser, dataURL, stack, stacking
         * @product   highcharts
         * @requires  highcharts-more
         * @apioption series.errorbar
         */
        /**
         * An array of data points for the series. For the `errorbar` series
         * type, points can be given in the following ways:
         *
         * 1. An array of arrays with 3 or 2 values. In this case, the values correspond
         *    to `x,low,high`. If the first value is a string, it is applied as the name
         *    of the point, and the `x` value is inferred. The `x` value can also be
         *    omitted, in which case the inner arrays should be of length 2\. Then the
         *    `x` value is automatically calculated, either starting at 0 and
         *    incremented by 1, or from `pointStart` and `pointInterval` given in the
         *    series options.
         *    ```js
         *    data: [
         *        [0, 10, 2],
         *        [1, 1, 8],
         *        [2, 4, 5]
         *    ]
         *    ```
         *
         * 2. An array of objects with named values. The following snippet shows only a
         *    few settings, see the complete options set below. If the total number of
         *    data points exceeds the series'
         *    [turboThreshold](#series.errorbar.turboThreshold), this option is not
         *    available.
         *    ```js
         *    data: [{
         *        x: 1,
         *        low: 0,
         *        high: 0,
         *        name: "Point2",
         *        color: "#00FF00"
         *    }, {
         *        x: 1,
         *        low: 5,
         *        high: 5,
         *        name: "Point1",
         *        color: "#FF00FF"
         *    }]
         *    ```
         *
         * @sample {highcharts} highcharts/series/data-array-of-arrays/
         *         Arrays of numeric x and y
         * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
         *         Arrays of datetime x and y
         * @sample {highcharts} highcharts/series/data-array-of-name-value/
         *         Arrays of point.name and y
         * @sample {highcharts} highcharts/series/data-array-of-objects/
         *         Config objects
         *
         * @type      {Array<Array<(number|string),number>|Array<(number|string),number,number>|*>}
         * @extends   series.arearange.data
         * @excluding dataLabels, drilldown, marker, states
         * @product   highcharts
         * @apioption series.errorbar.data
         */
        ''; // adds doclets above to transpiled file

    });
    _registerModule(_modules, 'parts-more/WaterfallSeries.js', [_modules['parts/Axis.js'], _modules['parts/Chart.js'], _modules['parts/Globals.js'], _modules['parts/Point.js'], _modules['parts/Stacking.js'], _modules['parts/Utilities.js']], function (Axis, Chart, H, Point, StackItem, U) {
        /* *
         *
         *  (c) 2010-2020 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var addEvent = U.addEvent, arrayMax = U.arrayMax, arrayMin = U.arrayMin, correctFloat = U.correctFloat, isNumber = U.isNumber, objectEach = U.objectEach, pick = U.pick, seriesType = U.seriesType;
        var Series = H.Series, seriesTypes = H.seriesTypes;
        /**
         * Returns true if the key is a direct property of the object.
         * @private
         * @param {*} obj - Object with property to test
         * @param {string} key - Property key to test
         * @return {boolean} - Whether it is a direct property
         */
        function ownProp(obj, key) {
            return Object.hasOwnProperty.call(obj, key);
        }
        /**
         * @private
         */
        var WaterfallAxis;
        (function (WaterfallAxis) {
            /* *
             *
             *  Interfaces
             *
             * */
            /* *
             *
             *  Classes
             *
             * */
            /**
             * @private
             */
            var Composition = /** @class */ (function () {
                /* *
                 *
                 *  Constructors
                 *
                 * */
                /**
                 * @private
                 */
                function Composition(axis) {
                    this.axis = axis;
                    this.stacks = {
                        changed: false
                    };
                }
                /* *
                 *
                 *  Functions
                 *
                 * */
                /**
                 * Calls StackItem.prototype.render function that creates and renders
                 * stack total label for each waterfall stack item.
                 *
                 * @private
                 * @function Highcharts.Axis#renderWaterfallStackTotals
                 */
                Composition.prototype.renderStackTotals = function () {
                    var yAxis = this.axis, waterfallStacks = yAxis.waterfall.stacks, stackTotalGroup = yAxis.stacking && yAxis.stacking.stackTotalGroup, dummyStackItem = new StackItem(yAxis, yAxis.options.stackLabels, false, 0, void 0);
                    this.dummyStackItem = dummyStackItem;
                    // Render each waterfall stack total
                    objectEach(waterfallStacks, function (type) {
                        objectEach(type, function (stackItem) {
                            dummyStackItem.total = stackItem.stackTotal;
                            if (stackItem.label) {
                                dummyStackItem.label = stackItem.label;
                            }
                            StackItem.prototype.render.call(dummyStackItem, stackTotalGroup);
                            stackItem.label = dummyStackItem.label;
                            delete dummyStackItem.label;
                        });
                    });
                    dummyStackItem.total = null;
                };
                return Composition;
            }());
            WaterfallAxis.Composition = Composition;
            /* *
             *
             *  Functions
             *
             * */
            /**
             * @private
             */
            function compose(AxisClass, ChartClass) {
                addEvent(AxisClass, 'init', onInit);
                addEvent(AxisClass, 'afterBuildStacks', onAfterBuildStacks);
                addEvent(AxisClass, 'afterRender', onAfterRender);
                addEvent(ChartClass, 'beforeRedraw', onBeforeRedraw);
            }
            WaterfallAxis.compose = compose;
            /**
             * @private
             */
            function onAfterBuildStacks() {
                var axis = this;
                var stacks = axis.waterfall.stacks;
                if (stacks) {
                    stacks.changed = false;
                    delete stacks.alreadyChanged;
                }
            }
            /**
             * @private
             */
            function onAfterRender() {
                var axis = this;
                var stackLabelOptions = axis.options.stackLabels;
                if (stackLabelOptions && stackLabelOptions.enabled &&
                    axis.waterfall.stacks) {
                    axis.waterfall.renderStackTotals();
                }
            }
            /**
             * @private
             */
            function onBeforeRedraw() {
                var axes = this.axes, series = this.series, i = series.length;
                while (i--) {
                    if (series[i].options.stacking) {
                        axes.forEach(function (axis) {
                            if (!axis.isXAxis) {
                                axis.waterfall.stacks.changed = true;
                            }
                        });
                        i = 0;
                    }
                }
            }
            /**
             * @private
             */
            function onInit() {
                var axis = this;
                if (!axis.waterfall) {
                    axis.waterfall = new Composition(axis);
                }
            }
        })(WaterfallAxis || (WaterfallAxis = {}));
        // eslint-disable-next-line valid-jsdoc
        /**
         * A waterfall chart displays sequentially introduced positive or negative
         * values in cumulative columns.
         *
         * @sample highcharts/demo/waterfall/
         *         Waterfall chart
         * @sample highcharts/plotoptions/waterfall-inverted/
         *         Horizontal (inverted) waterfall
         * @sample highcharts/plotoptions/waterfall-stacked/
         *         Stacked waterfall chart
         *
         * @extends      plotOptions.column
         * @product      highcharts
         * @requires     highcharts-more
         * @optionparent plotOptions.waterfall
         */
        seriesType('waterfall', 'column', {
            /**
             * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @apioption plotOptions.waterfall.color
             */
            /**
             * The color used specifically for positive point columns. When not
             * specified, the general series color is used.
             *
             * In styled mode, the waterfall colors can be set with the
             * `.highcharts-point-negative`, `.highcharts-sum` and
             * `.highcharts-intermediate-sum` classes.
             *
             * @sample {highcharts} highcharts/demo/waterfall/
             *         Waterfall
             *
             * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @product   highcharts
             * @apioption plotOptions.waterfall.upColor
             */
            dataLabels: {
                inside: true
            },
            /**
             * The width of the line connecting waterfall columns.
             *
             * @product highcharts
             */
            lineWidth: 1,
            /**
             * The color of the line that connects columns in a waterfall series.
             *
             * In styled mode, the stroke can be set with the `.highcharts-graph` class.
             *
             * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @since   3.0
             * @product highcharts
             */
            lineColor: '#333333',
            /**
             * A name for the dash style to use for the line connecting the columns
             * of the waterfall series. Possible values: Dash, DashDot, Dot, LongDash,
             * LongDashDot, LongDashDotDot, ShortDash, ShortDashDot, ShortDashDotDot,
             * ShortDot, Solid
             *
             * In styled mode, the stroke dash-array can be set with the
             * `.highcharts-graph` class.
             *
             * @type    {Highcharts.DashStyleValue}
             * @since   3.0
             * @product highcharts
             */
            dashStyle: 'Dot',
            /**
             * The color of the border of each waterfall column.
             *
             * In styled mode, the border stroke can be set with the
             * `.highcharts-point` class.
             *
             * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @since   3.0
             * @product highcharts
             */
            borderColor: '#333333',
            states: {
                hover: {
                    lineWidthPlus: 0 // #3126
                }
            }
            // Prototype members
        }, {
            pointValKey: 'y',
            // Property needed to prevent lines between the columns from disappearing
            // when negativeColor is used.
            showLine: true,
            // After generating points, set y-values for all sums.
            generatePoints: function () {
                var point, len, i, y;
                // Parent call:
                seriesTypes.column.prototype.generatePoints.apply(this);
                for (i = 0, len = this.points.length; i < len; i++) {
                    point = this.points[i];
                    y = this.processedYData[i];
                    // override point value for sums
                    // #3710 Update point does not propagate to sum
                    if (point.isIntermediateSum || point.isSum) {
                        point.y = correctFloat(y);
                    }
                }
            },
            // Translate data points from raw values
            translate: function () {
                var series = this, options = series.options, yAxis = series.yAxis, len, i, points, point, shapeArgs, y, yValue, previousY, previousIntermediate, range, minPointLength = pick(options.minPointLength, 5), halfMinPointLength = minPointLength / 2, threshold = options.threshold, stacking = options.stacking, tooltipY, actualStack = yAxis.waterfall.stacks[series.stackKey], actualStackX, dummyStackItem, total, pointY, yPos, hPos;
                // run column series translate
                seriesTypes.column.prototype.translate.apply(series);
                previousY = previousIntermediate = threshold;
                points = series.points;
                for (i = 0, len = points.length; i < len; i++) {
                    // cache current point object
                    point = points[i];
                    yValue = series.processedYData[i];
                    shapeArgs = point.shapeArgs;
                    range = [0, yValue];
                    pointY = point.y;
                    // code responsible for correct positions of stacked points
                    // starts here
                    if (stacking) {
                        if (actualStack) {
                            actualStackX = actualStack[i];
                            if (stacking === 'overlap') {
                                total =
                                    actualStackX.stackState[actualStackX.stateIndex--];
                                y = pointY >= 0 ? total : total - pointY;
                                if (ownProp(actualStackX, 'absolutePos')) {
                                    delete actualStackX.absolutePos;
                                }
                                if (ownProp(actualStackX, 'absoluteNeg')) {
                                    delete actualStackX.absoluteNeg;
                                }
                            }
                            else {
                                if (pointY >= 0) {
                                    total = actualStackX.threshold +
                                        actualStackX.posTotal;
                                    actualStackX.posTotal -= pointY;
                                    y = total;
                                }
                                else {
                                    total = actualStackX.threshold +
                                        actualStackX.negTotal;
                                    actualStackX.negTotal -= pointY;
                                    y = total - pointY;
                                }
                                if (!actualStackX.posTotal) {
                                    if (ownProp(actualStackX, 'absolutePos')) {
                                        actualStackX.posTotal =
                                            actualStackX.absolutePos;
                                        delete actualStackX.absolutePos;
                                    }
                                }
                                if (!actualStackX.negTotal) {
                                    if (ownProp(actualStackX, 'absoluteNeg')) {
                                        actualStackX.negTotal =
                                            actualStackX.absoluteNeg;
                                        delete actualStackX.absoluteNeg;
                                    }
                                }
                            }
                            if (!point.isSum) {
                                // the connectorThreshold property is later used in
                                // getCrispPath function to draw a connector line in a
                                // correct place
                                actualStackX.connectorThreshold =
                                    actualStackX.threshold + actualStackX.stackTotal;
                            }
                            if (yAxis.reversed) {
                                yPos = (pointY >= 0) ? (y - pointY) : (y + pointY);
                                hPos = y;
                            }
                            else {
                                yPos = y;
                                hPos = y - pointY;
                            }
                            point.below = yPos <= pick(threshold, 0);
                            shapeArgs.y = yAxis.translate(yPos, 0, 1, 0, 1);
                            shapeArgs.height = Math.abs(shapeArgs.y -
                                yAxis.translate(hPos, 0, 1, 0, 1));
                        }
                        dummyStackItem = yAxis.waterfall.dummyStackItem;
                        if (dummyStackItem) {
                            dummyStackItem.x = i;
                            dummyStackItem.label = actualStack[i].label;
                            dummyStackItem.setOffset(series.pointXOffset || 0, series.barW || 0, series.stackedYNeg[i], series.stackedYPos[i]);
                        }
                    }
                    else {
                        // up points
                        y =
                            Math.max(previousY, previousY + pointY) + range[0];
                        shapeArgs.y =
                            yAxis.translate(y, 0, 1, 0, 1);
                        // sum points
                        if (point.isSum) {
                            shapeArgs.y = yAxis.translate(range[1], 0, 1, 0, 1);
                            shapeArgs.height = Math.min(yAxis.translate(range[0], 0, 1, 0, 1), yAxis.len) - shapeArgs.y; // #4256
                        }
                        else if (point.isIntermediateSum) {
                            if (pointY >= 0) {
                                yPos = range[1] + previousIntermediate;
                                hPos = previousIntermediate;
                            }
                            else {
                                yPos = previousIntermediate;
                                hPos = range[1] + previousIntermediate;
                            }
                            if (yAxis.reversed) {
                                // swapping values
                                yPos ^= hPos;
                                hPos ^= yPos;
                                yPos ^= hPos;
                            }
                            shapeArgs.y = yAxis.translate(yPos, 0, 1, 0, 1);
                            shapeArgs.height = Math.abs(shapeArgs.y -
                                Math.min(yAxis.translate(hPos, 0, 1, 0, 1), yAxis.len));
                            previousIntermediate += range[1];
                            // If it's not the sum point, update previous stack end position
                            // and get shape height (#3886)
                        }
                        else {
                            shapeArgs.height = yValue > 0 ?
                                yAxis.translate(previousY, 0, 1, 0, 1) - shapeArgs.y :
                                yAxis.translate(previousY, 0, 1, 0, 1) - yAxis.translate(previousY - yValue, 0, 1, 0, 1);
                            previousY += yValue;
                            point.below = previousY < pick(threshold, 0);
                        }
                        // #3952 Negative sum or intermediate sum not rendered correctly
                        if (shapeArgs.height < 0) {
                            shapeArgs.y += shapeArgs.height;
                            shapeArgs.height *= -1;
                        }
                    }
                    point.plotY = shapeArgs.y =
                        Math.round(shapeArgs.y) - (series.borderWidth % 2) / 2;
                    // #3151
                    shapeArgs.height =
                        Math.max(Math.round(shapeArgs.height), 0.001);
                    point.yBottom = shapeArgs.y + shapeArgs.height;
                    if (shapeArgs.height <= minPointLength && !point.isNull) {
                        shapeArgs.height = minPointLength;
                        shapeArgs.y -= halfMinPointLength;
                        point.plotY = shapeArgs.y;
                        if (point.y < 0) {
                            point.minPointLengthOffset = -halfMinPointLength;
                        }
                        else {
                            point.minPointLengthOffset = halfMinPointLength;
                        }
                    }
                    else {
                        if (point.isNull) {
                            shapeArgs.width = 0;
                        }
                        point.minPointLengthOffset = 0;
                    }
                    // Correct tooltip placement (#3014)
                    tooltipY =
                        point.plotY + (point.negative ? shapeArgs.height : 0);
                    if (series.chart.inverted) {
                        point.tooltipPos[0] = yAxis.len - tooltipY;
                    }
                    else {
                        point.tooltipPos[1] = tooltipY;
                    }
                }
            },
            // Call default processData then override yData to reflect waterfall's
            // extremes on yAxis
            processData: function (force) {
                var series = this, options = series.options, yData = series.yData, 
                // #3710 Update point does not propagate to sum
                points = options.data, point, dataLength = yData.length, threshold = options.threshold || 0, subSum, sum, dataMin, dataMax, y, i;
                sum = subSum = dataMin = dataMax = 0;
                for (i = 0; i < dataLength; i++) {
                    y = yData[i];
                    point = points && points[i] ? points[i] : {};
                    if (y === 'sum' || point.isSum) {
                        yData[i] = correctFloat(sum);
                    }
                    else if (y === 'intermediateSum' ||
                        point.isIntermediateSum) {
                        yData[i] = correctFloat(subSum);
                        subSum = 0;
                    }
                    else {
                        sum += y;
                        subSum += y;
                    }
                    dataMin = Math.min(sum, dataMin);
                    dataMax = Math.max(sum, dataMax);
                }
                Series.prototype.processData.call(this, force);
                // Record extremes only if stacking was not set:
                if (!options.stacking) {
                    series.dataMin = dataMin + threshold;
                    series.dataMax = dataMax;
                }
                return;
            },
            // Return y value or string if point is sum
            toYData: function (pt) {
                if (pt.isSum) {
                    return 'sum';
                }
                if (pt.isIntermediateSum) {
                    return 'intermediateSum';
                }
                return pt.y;
            },
            updateParallelArrays: function (point, i) {
                Series.prototype.updateParallelArrays.call(this, point, i);
                // Prevent initial sums from triggering an error (#3245, #7559)
                if (this.yData[0] === 'sum' || this.yData[0] === 'intermediateSum') {
                    this.yData[0] = null;
                }
            },
            // Postprocess mapping between options and SVG attributes
            pointAttribs: function (point, state) {
                var upColor = this.options.upColor, attr;
                // Set or reset up color (#3710, update to negative)
                if (upColor && !point.options.color) {
                    point.color = point.y > 0 ? upColor : null;
                }
                attr = seriesTypes.column.prototype.pointAttribs.call(this, point, state);
                // The dashStyle option in waterfall applies to the graph, not
                // the points
                delete attr.dashstyle;
                return attr;
            },
            // Return an empty path initially, because we need to know the stroke-width
            // in order to set the final path.
            getGraphPath: function () {
                return [['M', 0, 0]];
            },
            // Draw columns' connector lines
            getCrispPath: function () {
                var data = this.data, yAxis = this.yAxis, length = data.length, graphNormalizer = Math.round(this.graph.strokeWidth()) % 2 / 2, borderNormalizer = Math.round(this.borderWidth) % 2 / 2, reversedXAxis = this.xAxis.reversed, reversedYAxis = this.yAxis.reversed, stacking = this.options.stacking, path = [], connectorThreshold, prevStack, prevStackX, prevPoint, yPos, isPos, prevArgs, pointArgs, i;
                for (i = 1; i < length; i++) {
                    pointArgs = data[i].shapeArgs;
                    prevPoint = data[i - 1];
                    prevArgs = data[i - 1].shapeArgs;
                    prevStack = yAxis.waterfall.stacks[this.stackKey];
                    isPos = prevPoint.y > 0 ? -prevArgs.height : 0;
                    if (prevStack && prevArgs && pointArgs) {
                        prevStackX = prevStack[i - 1];
                        // y position of the connector is different when series are
                        // stacked, yAxis is reversed and it also depends on point's
                        // value
                        if (stacking) {
                            connectorThreshold = prevStackX.connectorThreshold;
                            yPos = Math.round((yAxis.translate(connectorThreshold, 0, 1, 0, 1) +
                                (reversedYAxis ? isPos : 0))) - graphNormalizer;
                        }
                        else {
                            yPos =
                                prevArgs.y + prevPoint.minPointLengthOffset +
                                    borderNormalizer - graphNormalizer;
                        }
                        path.push([
                            'M',
                            (prevArgs.x || 0) + (reversedXAxis ?
                                0 :
                                (prevArgs.width || 0)),
                            yPos
                        ], [
                            'L',
                            (pointArgs.x || 0) + (reversedXAxis ?
                                (pointArgs.width || 0) :
                                0),
                            yPos
                        ]);
                    }
                    if (!stacking &&
                        path.length &&
                        prevArgs &&
                        ((prevPoint.y < 0 && !reversedYAxis) ||
                            (prevPoint.y > 0 && reversedYAxis))) {
                        path[path.length - 2][2] += prevArgs.height;
                        path[path.length - 1][2] += prevArgs.height;
                    }
                }
                return path;
            },
            // The graph is initially drawn with an empty definition, then updated with
            // crisp rendering.
            drawGraph: function () {
                Series.prototype.drawGraph.call(this);
                this.graph.attr({
                    d: this.getCrispPath()
                });
            },
            // Waterfall has stacking along the x-values too.
            setStackedPoints: function () {
                var series = this, options = series.options, waterfallStacks = series.yAxis.waterfall.stacks, seriesThreshold = options.threshold, stackThreshold = seriesThreshold || 0, interSum = stackThreshold, stackKey = series.stackKey, xData = series.xData, xLength = xData.length, actualStack, actualStackX, totalYVal, actualSum, prevSum, statesLen, posTotal, negTotal, xPoint, yVal, x, alreadyChanged, changed;
                // function responsible for calculating correct values for stackState
                // array of each stack item. The arguments are: firstS - the value for
                // the first state, nextS - the difference between the previous and the
                // newest state, sInx - counter used in the for that updates each state
                // when necessary, sOff - offset that must be added to each state when
                // they need to be updated (if point isn't a total sum)
                // eslint-disable-next-line require-jsdoc
                function calculateStackState(firstS, nextS, sInx, sOff) {
                    if (!statesLen) {
                        actualStackX.stackState[0] = firstS;
                        statesLen = actualStackX.stackState.length;
                    }
                    else {
                        for (sInx; sInx < statesLen; sInx++) {
                            actualStackX.stackState[sInx] += sOff;
                        }
                    }
                    actualStackX.stackState.push(actualStackX.stackState[statesLen - 1] + nextS);
                }
                series.yAxis.stacking.usePercentage = false;
                totalYVal = actualSum = prevSum = stackThreshold;
                // code responsible for creating stacks for waterfall series
                if (series.visible ||
                    !series.chart.options.chart.ignoreHiddenSeries) {
                    changed = waterfallStacks.changed;
                    alreadyChanged = waterfallStacks.alreadyChanged;
                    // in case of a redraw, stack for each x value must be
                    // emptied (only for the first series in a specific stack)
                    // and recalculated once more
                    if (alreadyChanged &&
                        alreadyChanged.indexOf(stackKey) < 0) {
                        changed = true;
                    }
                    if (!waterfallStacks[stackKey]) {
                        waterfallStacks[stackKey] = {};
                    }
                    actualStack = waterfallStacks[stackKey];
                    for (var i = 0; i < xLength; i++) {
                        x = xData[i];
                        if (!actualStack[x] || changed) {
                            actualStack[x] = {
                                negTotal: 0,
                                posTotal: 0,
                                stackTotal: 0,
                                threshold: 0,
                                stateIndex: 0,
                                stackState: [],
                                label: ((changed &&
                                    actualStack[x]) ?
                                    actualStack[x].label :
                                    void 0)
                            };
                        }
                        actualStackX = actualStack[x];
                        yVal = series.yData[i];
                        if (yVal >= 0) {
                            actualStackX.posTotal += yVal;
                        }
                        else {
                            actualStackX.negTotal += yVal;
                        }
                        // points do not exist yet, so raw data is used
                        xPoint = options.data[i];
                        posTotal = actualStackX.absolutePos =
                            actualStackX.posTotal;
                        negTotal = actualStackX.absoluteNeg =
                            actualStackX.negTotal;
                        actualStackX.stackTotal = posTotal + negTotal;
                        statesLen = actualStackX.stackState.length;
                        if (xPoint && xPoint.isIntermediateSum) {
                            calculateStackState(prevSum, actualSum, 0, prevSum);
                            prevSum = actualSum;
                            actualSum = seriesThreshold;
                            // swapping values
                            stackThreshold ^= interSum;
                            interSum ^= stackThreshold;
                            stackThreshold ^= interSum;
                        }
                        else if (xPoint && xPoint.isSum) {
                            calculateStackState(seriesThreshold, totalYVal, statesLen);
                            stackThreshold = seriesThreshold;
                        }
                        else {
                            calculateStackState(stackThreshold, yVal, 0, totalYVal);
                            if (xPoint) {
                                totalYVal += yVal;
                                actualSum += yVal;
                            }
                        }
                        actualStackX.stateIndex++;
                        actualStackX.threshold = stackThreshold;
                        stackThreshold += actualStackX.stackTotal;
                    }
                    waterfallStacks.changed = false;
                    if (!waterfallStacks.alreadyChanged) {
                        waterfallStacks.alreadyChanged = [];
                    }
                    waterfallStacks.alreadyChanged.push(stackKey);
                }
            },
            // Extremes for a non-stacked series are recorded in processData.
            // In case of stacking, use Series.stackedYData to calculate extremes.
            getExtremes: function () {
                var stacking = this.options.stacking, yAxis, waterfallStacks, stackedYNeg, stackedYPos;
                if (stacking) {
                    yAxis = this.yAxis;
                    waterfallStacks = yAxis.waterfall.stacks;
                    stackedYNeg = this.stackedYNeg = [];
                    stackedYPos = this.stackedYPos = [];
                    // the visible y range can be different when stacking is set to
                    // overlap and different when it's set to normal
                    if (stacking === 'overlap') {
                        objectEach(waterfallStacks[this.stackKey], function (stackX) {
                            stackedYNeg.push(arrayMin(stackX.stackState));
                            stackedYPos.push(arrayMax(stackX.stackState));
                        });
                    }
                    else {
                        objectEach(waterfallStacks[this.stackKey], function (stackX) {
                            stackedYNeg.push(stackX.negTotal + stackX.threshold);
                            stackedYPos.push(stackX.posTotal + stackX.threshold);
                        });
                    }
                    return {
                        dataMin: arrayMin(stackedYNeg),
                        dataMax: arrayMax(stackedYPos)
                    };
                }
                // When not stacking, data extremes have already been computed in the
                // processData function.
                return {
                    dataMin: this.dataMin,
                    dataMax: this.dataMax
                };
            }
            // Point members
        }, {
            getClassName: function () {
                var className = Point.prototype.getClassName.call(this);
                if (this.isSum) {
                    className += ' highcharts-sum';
                }
                else if (this.isIntermediateSum) {
                    className += ' highcharts-intermediate-sum';
                }
                return className;
            },
            // Pass the null test in ColumnSeries.translate.
            isValid: function () {
                return (isNumber(this.y) ||
                    this.isSum ||
                    Boolean(this.isIntermediateSum));
            }
        });
        /**
         * A `waterfall` series. If the [type](#series.waterfall.type) option
         * is not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.waterfall
         * @excluding dataParser, dataURL
         * @product   highcharts
         * @requires  highcharts-more
         * @apioption series.waterfall
         */
        /**
         * An array of data points for the series. For the `waterfall` series
         * type, points can be given in the following ways:
         *
         * 1. An array of numerical values. In this case, the numerical values will be
         *    interpreted as `y` options. The `x` values will be automatically
         *    calculated, either starting at 0 and incremented by 1, or from
         *    `pointStart` and `pointInterval` given in the series options. If the axis
         *    has categories, these will be used. Example:
         *    ```js
         *    data: [0, 5, 3, 5]
         *    ```
         *
         * 2. An array of arrays with 2 values. In this case, the values correspond to
         *    `x,y`. If the first value is a string, it is applied as the name of the
         *    point, and the `x` value is inferred.
         *    ```js
         *    data: [
         *        [0, 7],
         *        [1, 8],
         *        [2, 3]
         *    ]
         *    ```
         *
         * 3. An array of objects with named values. The following snippet shows only a
         *    few settings, see the complete options set below. If the total number of
         *    data points exceeds the series'
         *    [turboThreshold](#series.waterfall.turboThreshold), this option is not
         *    available.
         *    ```js
         *    data: [{
         *        x: 1,
         *        y: 8,
         *        name: "Point2",
         *        color: "#00FF00"
         *    }, {
         *        x: 1,
         *        y: 8,
         *        name: "Point1",
         *        color: "#FF00FF"
         *    }]
         *    ```
         *
         * @sample {highcharts} highcharts/chart/reflow-true/
         *         Numerical values
         * @sample {highcharts} highcharts/series/data-array-of-arrays/
         *         Arrays of numeric x and y
         * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
         *         Arrays of datetime x and y
         * @sample {highcharts} highcharts/series/data-array-of-name-value/
         *         Arrays of point.name and y
         * @sample {highcharts} highcharts/series/data-array-of-objects/
         *         Config objects
         *
         * @type      {Array<number|Array<(number|string),(number|null)>|null|*>}
         * @extends   series.line.data
         * @excluding marker
         * @product   highcharts
         * @apioption series.waterfall.data
         */
        /**
         * When this property is true, the points acts as a summary column for
         * the values added or substracted since the last intermediate sum,
         * or since the start of the series. The `y` value is ignored.
         *
         * @sample {highcharts} highcharts/demo/waterfall/
         *         Waterfall
         *
         * @type      {boolean}
         * @default   false
         * @product   highcharts
         * @apioption series.waterfall.data.isIntermediateSum
         */
        /**
         * When this property is true, the point display the total sum across
         * the entire series. The `y` value is ignored.
         *
         * @sample {highcharts} highcharts/demo/waterfall/
         *         Waterfall
         *
         * @type      {boolean}
         * @default   false
         * @product   highcharts
         * @apioption series.waterfall.data.isSum
         */
        ''; // adds doclets above to transpiled file
        WaterfallAxis.compose(Axis, Chart);

        return WaterfallAxis;
    });
    _registerModule(_modules, 'parts-more/PolygonSeries.js', [_modules['parts/Globals.js'], _modules['mixins/legend-symbol.js'], _modules['parts/Utilities.js']], function (H, LegendSymbolMixin, U) {
        /* *
         *
         *  (c) 2010-2020 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var seriesType = U.seriesType;
        var noop = H.noop, Series = H.Series, seriesTypes = H.seriesTypes;
        /**
         * A polygon series can be used to draw any freeform shape in the cartesian
         * coordinate system. A fill is applied with the `color` option, and
         * stroke is applied through `lineWidth` and `lineColor` options.
         *
         * @sample {highcharts} highcharts/demo/polygon/
         *         Polygon
         * @sample {highstock} highcharts/demo/polygon/
         *         Polygon
         *
         * @extends      plotOptions.scatter
         * @since        4.1.0
         * @excluding    jitter, softThreshold, threshold, cluster
         * @product      highcharts highstock
         * @requires     highcharts-more
         * @optionparent plotOptions.polygon
         */
        seriesType('polygon', 'scatter', {
            marker: {
                enabled: false,
                states: {
                    hover: {
                        enabled: false
                    }
                }
            },
            stickyTracking: false,
            tooltip: {
                followPointer: true,
                pointFormat: ''
            },
            trackByArea: true
            // Prototype members
        }, {
            type: 'polygon',
            getGraphPath: function () {
                var graphPath = Series.prototype.getGraphPath.call(this), i = graphPath.length + 1;
                // Close all segments
                while (i--) {
                    if ((i === graphPath.length || graphPath[i][0] === 'M') && i > 0) {
                        graphPath.splice(i, 0, ['Z']);
                    }
                }
                this.areaPath = graphPath;
                return graphPath;
            },
            drawGraph: function () {
                // Hack into the fill logic in area.drawGraph
                this.options.fillColor = this.color;
                seriesTypes.area.prototype.drawGraph.call(this);
            },
            drawLegendSymbol: LegendSymbolMixin.drawRectangle,
            drawTracker: Series.prototype.drawTracker,
            setStackedPoints: noop // No stacking points on polygons (#5310)
        });
        /**
         * A `polygon` series. If the [type](#series.polygon.type) option is
         * not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.polygon
         * @excluding dataParser, dataURL, stack
         * @product   highcharts highstock
         * @requires  highcharts-more
         * @apioption series.polygon
         */
        /**
         * An array of data points for the series. For the `polygon` series
         * type, points can be given in the following ways:
         *
         * 1. An array of numerical values. In this case, the numerical values will be
         *    interpreted as `y` options. The `x` values will be automatically
         *    calculated, either starting at 0 and incremented by 1, or from
         *    `pointStart` and `pointInterval` given in the series options. If the axis
         *    has categories, these will be used. Example:
         *    ```js
         *    data: [0, 5, 3, 5]
         *    ```
         *
         * 2. An array of arrays with 2 values. In this case, the values correspond to
         *    `x,y`. If the first value is a string, it is applied as the name of the
         *    point, and the `x` value is inferred.
         *    ```js
         *    data: [
         *        [0, 10],
         *        [1, 3],
         *        [2, 1]
         *    ]
         *    ```
         *
         * 3. An array of objects with named values. The following snippet shows only a
         *    few settings, see the complete options set below. If the total number of
         *    data points exceeds the series'
         *    [turboThreshold](#series.polygon.turboThreshold), this option is not
         *    available.
         *    ```js
         *    data: [{
         *        x: 1,
         *        y: 1,
         *        name: "Point2",
         *        color: "#00FF00"
         *    }, {
         *        x: 1,
         *        y: 8,
         *        name: "Point1",
         *        color: "#FF00FF"
         *    }]
         *    ```
         *
         * @sample {highcharts} highcharts/chart/reflow-true/
         *         Numerical values
         * @sample {highcharts} highcharts/series/data-array-of-arrays/
         *         Arrays of numeric x and y
         * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
         *         Arrays of datetime x and y
         * @sample {highcharts} highcharts/series/data-array-of-name-value/
         *         Arrays of point.name and y
         * @sample {highcharts} highcharts/series/data-array-of-objects/
         *         Config objects
         *
         * @type      {Array<number|Array<(number|string),(number|null)>|null|*>}
         * @extends   series.line.data
         * @product   highcharts highstock
         * @apioption series.polygon.data
         */
        ''; // adds doclets above to transpiled file

    });
    _registerModule(_modules, 'parts-more/BubbleLegend.js', [_modules['parts/Chart.js'], _modules['parts/Color.js'], _modules['parts/Globals.js'], _modules['parts/Legend.js'], _modules['parts/Utilities.js']], function (Chart, Color, H, Legend, U) {
        /* *
         *
         *  (c) 2010-2020 Highsoft AS
         *
         *  Author: Paweł Potaczek
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var color = Color.parse;
        var addEvent = U.addEvent, arrayMax = U.arrayMax, arrayMin = U.arrayMin, isNumber = U.isNumber, merge = U.merge, objectEach = U.objectEach, pick = U.pick, setOptions = U.setOptions, stableSort = U.stableSort, wrap = U.wrap;
        /**
         * @interface Highcharts.BubbleLegendFormatterContextObject
         */ /**
        * The center y position of the range.
        * @name Highcharts.BubbleLegendFormatterContextObject#center
        * @type {number}
        */ /**
        * The radius of the bubble range.
        * @name Highcharts.BubbleLegendFormatterContextObject#radius
        * @type {number}
        */ /**
        * The bubble value.
        * @name Highcharts.BubbleLegendFormatterContextObject#value
        * @type {number}
        */
        ''; // detach doclets above
        var Series = H.Series, noop = H.noop;
        setOptions({
            legend: {
                /**
                 * The bubble legend is an additional element in legend which
                 * presents the scale of the bubble series. Individual bubble ranges
                 * can be defined by user or calculated from series. In the case of
                 * automatically calculated ranges, a 1px margin of error is
                 * permitted.
                 *
                 * @since        7.0.0
                 * @product      highcharts highstock highmaps
                 * @requires     highcharts-more
                 * @optionparent legend.bubbleLegend
                 */
                bubbleLegend: {
                    /**
                     * The color of the ranges borders, can be also defined for an
                     * individual range.
                     *
                     * @sample highcharts/bubble-legend/similartoseries/
                     *         Similat look to the bubble series
                     * @sample highcharts/bubble-legend/bordercolor/
                     *         Individual bubble border color
                     *
                     * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                     */
                    borderColor: void 0,
                    /**
                     * The width of the ranges borders in pixels, can be also
                     * defined for an individual range.
                     */
                    borderWidth: 2,
                    /**
                     * An additional class name to apply to the bubble legend'
                     * circle graphical elements. This option does not replace
                     * default class names of the graphical element.
                     *
                     * @sample {highcharts} highcharts/css/bubble-legend/
                     *         Styling by CSS
                     *
                     * @type {string}
                     */
                    className: void 0,
                    /**
                     * The main color of the bubble legend. Applies to ranges, if
                     * individual color is not defined.
                     *
                     * @sample highcharts/bubble-legend/similartoseries/
                     *         Similat look to the bubble series
                     * @sample highcharts/bubble-legend/color/
                     *         Individual bubble color
                     *
                     * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                     */
                    color: void 0,
                    /**
                     * An additional class name to apply to the bubble legend's
                     * connector graphical elements. This option does not replace
                     * default class names of the graphical element.
                     *
                     * @sample {highcharts} highcharts/css/bubble-legend/
                     *         Styling by CSS
                     *
                     * @type {string}
                     */
                    connectorClassName: void 0,
                    /**
                     * The color of the connector, can be also defined
                     * for an individual range.
                     *
                     * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                     */
                    connectorColor: void 0,
                    /**
                     * The length of the connectors in pixels. If labels are
                     * centered, the distance is reduced to 0.
                     *
                     * @sample highcharts/bubble-legend/connectorandlabels/
                     *         Increased connector length
                     */
                    connectorDistance: 60,
                    /**
                     * The width of the connectors in pixels.
                     *
                     * @sample highcharts/bubble-legend/connectorandlabels/
                     *         Increased connector width
                     */
                    connectorWidth: 1,
                    /**
                     * Enable or disable the bubble legend.
                     */
                    enabled: false,
                    /**
                     * Options for the bubble legend labels.
                     */
                    labels: {
                        /**
                         * An additional class name to apply to the bubble legend
                         * label graphical elements. This option does not replace
                         * default class names of the graphical element.
                         *
                         * @sample {highcharts} highcharts/css/bubble-legend/
                         *         Styling by CSS
                         *
                         * @type {string}
                         */
                        className: void 0,
                        /**
                         * Whether to allow data labels to overlap.
                         */
                        allowOverlap: false,
                        /**
                         * A format string for the bubble legend labels. Available
                         * variables are the same as for `formatter`.
                         *
                         * @sample highcharts/bubble-legend/format/
                         *         Add a unit
                         *
                         * @type {string}
                         */
                        format: '',
                        /**
                         * Available `this` properties are:
                         *
                         * - `this.value`: The bubble value.
                         *
                         * - `this.radius`: The radius of the bubble range.
                         *
                         * - `this.center`: The center y position of the range.
                         *
                         * @type {Highcharts.FormatterCallbackFunction<Highcharts.BubbleLegendFormatterContextObject>}
                         */
                        formatter: void 0,
                        /**
                         * The alignment of the labels compared to the bubble
                         * legend. Can be one of `left`, `center` or `right`.
                         *
                         * @sample highcharts/bubble-legend/connectorandlabels/
                         *         Labels on left
                         *
                         * @type {Highcharts.AlignValue}
                         */
                        align: 'right',
                        /**
                         * CSS styles for the labels.
                         *
                         * @type {Highcharts.CSSObject}
                         */
                        style: {
                            /** @ignore-option */
                            fontSize: 10,
                            /** @ignore-option */
                            color: void 0
                        },
                        /**
                         * The x position offset of the label relative to the
                         * connector.
                         */
                        x: 0,
                        /**
                         * The y position offset of the label relative to the
                         * connector.
                         */
                        y: 0
                    },
                    /**
                     * Miximum bubble legend range size. If values for ranges are
                     * not specified, the `minSize` and the `maxSize` are calculated
                     * from bubble series.
                     */
                    maxSize: 60,
                    /**
                     * Minimum bubble legend range size. If values for ranges are
                     * not specified, the `minSize` and the `maxSize` are calculated
                     * from bubble series.
                     */
                    minSize: 10,
                    /**
                     * The position of the bubble legend in the legend.
                     * @sample highcharts/bubble-legend/connectorandlabels/
                     *         Bubble legend as last item in legend
                     */
                    legendIndex: 0,
                    /**
                     * Options for specific range. One range consists of bubble,
                     * label and connector.
                     *
                     * @sample highcharts/bubble-legend/ranges/
                     *         Manually defined ranges
                     * @sample highcharts/bubble-legend/autoranges/
                     *         Auto calculated ranges
                     *
                     * @type {Array<*>}
                     */
                    ranges: {
                        /**
                         * Range size value, similar to bubble Z data.
                         * @type {number}
                         */
                        value: void 0,
                        /**
                         * The color of the border for individual range.
                         * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                         */
                        borderColor: void 0,
                        /**
                         * The color of the bubble for individual range.
                         * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                         */
                        color: void 0,
                        /**
                         * The color of the connector for individual range.
                         * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                         */
                        connectorColor: void 0
                    },
                    /**
                     * Whether the bubble legend range value should be represented
                     * by the area or the width of the bubble. The default, area,
                     * corresponds best to the human perception of the size of each
                     * bubble.
                     *
                     * @sample highcharts/bubble-legend/ranges/
                     *         Size by width
                     *
                     * @type {Highcharts.BubbleSizeByValue}
                     */
                    sizeBy: 'area',
                    /**
                     * When this is true, the absolute value of z determines the
                     * size of the bubble. This means that with the default
                     * zThreshold of 0, a bubble of value -1 will have the same size
                     * as a bubble of value 1, while a bubble of value 0 will have a
                     * smaller size according to minSize.
                     */
                    sizeByAbsoluteValue: false,
                    /**
                     * Define the visual z index of the bubble legend.
                     */
                    zIndex: 1,
                    /**
                     * Ranges with with lower value than zThreshold, are skipped.
                     */
                    zThreshold: 0
                }
            }
        });
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * BubbleLegend class.
         *
         * @private
         * @class
         * @name Highcharts.BubbleLegend
         * @param {Highcharts.LegendBubbleLegendOptions} options
         *        Bubble legend options
         * @param {Highcharts.Legend} legend
         *        Legend
         */
        var BubbleLegend = /** @class */ (function () {
            function BubbleLegend(options, legend) {
                this.chart = void 0;
                this.fontMetrics = void 0;
                this.legend = void 0;
                this.legendGroup = void 0;
                this.legendItem = void 0;
                this.legendItemHeight = void 0;
                this.legendItemWidth = void 0;
                this.legendSymbol = void 0;
                this.maxLabel = void 0;
                this.movementX = void 0;
                this.ranges = void 0;
                this.visible = void 0;
                this.symbols = void 0;
                this.options = void 0;
                this.setState = noop;
                this.init(options, legend);
            }
            /**
             * Create basic bubbleLegend properties similar to item in legend.
             *
             * @private
             * @function Highcharts.BubbleLegend#init
             * @param {Highcharts.LegendBubbleLegendOptions} options
             *        Bubble legend options
             * @param {Highcharts.Legend} legend
             *        Legend
             * @return {void}
             */
            BubbleLegend.prototype.init = function (options, legend) {
                this.options = options;
                this.visible = true;
                this.chart = legend.chart;
                this.legend = legend;
            };
            /**
             * Depending on the position option, add bubbleLegend to legend items.
             *
             * @private
             * @function Highcharts.BubbleLegend#addToLegend
             * @param {Array<(Highcharts.Point|Highcharts.Series)>}
             *        All legend items
             * @return {void}
             */
            BubbleLegend.prototype.addToLegend = function (items) {
                // Insert bubbleLegend into legend items
                items.splice(this.options.legendIndex, 0, this);
            };
            /**
             * Calculate ranges, sizes and call the next steps of bubbleLegend
             * creation.
             *
             * @private
             * @function Highcharts.BubbleLegend#drawLegendSymbol
             * @param {Highcharts.Legend} legend
             *        Legend instance
             * @return {void}
             */
            BubbleLegend.prototype.drawLegendSymbol = function (legend) {
                var chart = this.chart, options = this.options, size, itemDistance = pick(legend.options.itemDistance, 20), connectorSpace, ranges = options.ranges, radius, maxLabel, connectorDistance = options.connectorDistance;
                // Predict label dimensions
                this.fontMetrics = chart.renderer.fontMetrics(options.labels.style.fontSize.toString() + 'px');
                // Do not create bubbleLegend now if ranges or ranges valeus are not
                // specified or if are empty array.
                if (!ranges || !ranges.length || !isNumber(ranges[0].value)) {
                    legend.options.bubbleLegend.autoRanges = true;
                    return;
                }
                // Sort ranges to right render order
                stableSort(ranges, function (a, b) {
                    return b.value - a.value;
                });
                this.ranges = ranges;
                this.setOptions();
                this.render();
                // Get max label size
                maxLabel = this.getMaxLabelSize();
                radius = this.ranges[0].radius;
                size = radius * 2;
                // Space for connectors and labels.
                connectorSpace =
                    connectorDistance - radius + maxLabel.width;
                connectorSpace = connectorSpace > 0 ? connectorSpace : 0;
                this.maxLabel = maxLabel;
                this.movementX = options.labels.align === 'left' ?
                    connectorSpace : 0;
                this.legendItemWidth = size + connectorSpace + itemDistance;
                this.legendItemHeight = size + this.fontMetrics.h / 2;
            };
            /**
             * Set style options for each bubbleLegend range.
             *
             * @private
             * @function Highcharts.BubbleLegend#setOptions
             * @return {void}
             */
            BubbleLegend.prototype.setOptions = function () {
                var ranges = this.ranges, options = this.options, series = this.chart.series[options.seriesIndex], baseline = this.legend.baseline, bubbleStyle = {
                    'z-index': options.zIndex,
                    'stroke-width': options.borderWidth
                }, connectorStyle = {
                    'z-index': options.zIndex,
                    'stroke-width': options.connectorWidth
                }, labelStyle = this.getLabelStyles(), fillOpacity = series.options.marker.fillOpacity, styledMode = this.chart.styledMode;
                // Allow to parts of styles be used individually for range
                ranges.forEach(function (range, i) {
                    if (!styledMode) {
                        bubbleStyle.stroke = pick(range.borderColor, options.borderColor, series.color);
                        bubbleStyle.fill = pick(range.color, options.color, fillOpacity !== 1 ?
                            color(series.color).setOpacity(fillOpacity)
                                .get('rgba') :
                            series.color);
                        connectorStyle.stroke = pick(range.connectorColor, options.connectorColor, series.color);
                    }
                    // Set options needed for rendering each range
                    ranges[i].radius = this.getRangeRadius(range.value);
                    ranges[i] = merge(ranges[i], {
                        center: (ranges[0].radius - ranges[i].radius +
                            baseline)
                    });
                    if (!styledMode) {
                        merge(true, ranges[i], {
                            bubbleStyle: merge(false, bubbleStyle),
                            connectorStyle: merge(false, connectorStyle),
                            labelStyle: labelStyle
                        });
                    }
                }, this);
            };
            /**
             * Merge options for bubbleLegend labels.
             *
             * @private
             * @function Highcharts.BubbleLegend#getLabelStyles
             * @return {Highcharts.CSSObject}
             */
            BubbleLegend.prototype.getLabelStyles = function () {
                var options = this.options, additionalLabelsStyle = {}, labelsOnLeft = options.labels.align === 'left', rtl = this.legend.options.rtl;
                // To separate additional style options
                objectEach(options.labels.style, function (value, key) {
                    if (key !== 'color' &&
                        key !== 'fontSize' &&
                        key !== 'z-index') {
                        additionalLabelsStyle[key] = value;
                    }
                });
                return merge(false, additionalLabelsStyle, {
                    'font-size': options.labels.style.fontSize,
                    fill: pick(options.labels.style.color, '#000000'),
                    'z-index': options.zIndex,
                    align: rtl || labelsOnLeft ? 'right' : 'left'
                });
            };
            /**
             * Calculate radius for each bubble range,
             * used code from BubbleSeries.js 'getRadius' method.
             *
             * @private
             * @function Highcharts.BubbleLegend#getRangeRadius
             * @param {number} value
             *        Range value
             * @return {number|null}
             *         Radius for one range
             */
            BubbleLegend.prototype.getRangeRadius = function (value) {
                var options = this.options, seriesIndex = this.options.seriesIndex, bubbleSeries = this.chart.series[seriesIndex], zMax = options.ranges[0].value, zMin = options.ranges[options.ranges.length - 1].value, minSize = options.minSize, maxSize = options.maxSize;
                return bubbleSeries.getRadius.call(this, zMin, zMax, minSize, maxSize, value);
            };
            /**
             * Render the legendSymbol group.
             *
             * @private
             * @function Highcharts.BubbleLegend#render
             * @return {void}
             */
            BubbleLegend.prototype.render = function () {
                var renderer = this.chart.renderer, zThreshold = this.options.zThreshold;
                if (!this.symbols) {
                    this.symbols = {
                        connectors: [],
                        bubbleItems: [],
                        labels: []
                    };
                }
                // Nesting SVG groups to enable handleOverflow
                this.legendSymbol = renderer.g('bubble-legend');
                this.legendItem = renderer.g('bubble-legend-item');
                // To enable default 'hideOverlappingLabels' method
                this.legendSymbol.translateX = 0;
                this.legendSymbol.translateY = 0;
                this.ranges.forEach(function (range) {
                    if (range.value >= zThreshold) {
                        this.renderRange(range);
                    }
                }, this);
                // To use handleOverflow method
                this.legendSymbol.add(this.legendItem);
                this.legendItem.add(this.legendGroup);
                this.hideOverlappingLabels();
            };
            /**
             * Render one range, consisting of bubble symbol, connector and label.
             *
             * @private
             * @function Highcharts.BubbleLegend#renderRange
             * @param {Highcharts.LegendBubbleLegendRangesOptions} range
             *        Range options
             * @return {void}
             */
            BubbleLegend.prototype.renderRange = function (range) {
                var mainRange = this.ranges[0], legend = this.legend, options = this.options, labelsOptions = options.labels, chart = this.chart, renderer = chart.renderer, symbols = this.symbols, labels = symbols.labels, label, elementCenter = range.center, absoluteRadius = Math.abs(range.radius), connectorDistance = options.connectorDistance || 0, labelsAlign = labelsOptions.align, rtl = legend.options.rtl, fontSize = labelsOptions.style.fontSize, connectorLength = rtl || labelsAlign === 'left' ?
                    -connectorDistance : connectorDistance, borderWidth = options.borderWidth, connectorWidth = options.connectorWidth, posX = mainRange.radius || 0, posY = elementCenter - absoluteRadius -
                    borderWidth / 2 + connectorWidth / 2, labelY, labelX, fontMetrics = this.fontMetrics, labelMovement = fontSize / 2 - (fontMetrics.h - fontSize) / 2, crispMovement = (posY % 1 ? 1 : 0.5) -
                    (connectorWidth % 2 ? 0 : 0.5), styledMode = renderer.styledMode;
                // Set options for centered labels
                if (labelsAlign === 'center') {
                    connectorLength = 0; // do not use connector
                    options.connectorDistance = 0;
                    range.labelStyle.align = 'center';
                }
                labelY = posY + options.labels.y;
                labelX = posX + connectorLength + options.labels.x;
                // Render bubble symbol
                symbols.bubbleItems.push(renderer
                    .circle(posX, elementCenter + crispMovement, absoluteRadius)
                    .attr(styledMode ? {} : range.bubbleStyle)
                    .addClass((styledMode ?
                    'highcharts-color-' +
                        this.options.seriesIndex + ' ' :
                    '') +
                    'highcharts-bubble-legend-symbol ' +
                    (options.className || '')).add(this.legendSymbol));
                // Render connector
                symbols.connectors.push(renderer
                    .path(renderer.crispLine([
                    ['M', posX, posY],
                    ['L', posX + connectorLength, posY]
                ], options.connectorWidth))
                    .attr(styledMode ? {} : range.connectorStyle)
                    .addClass((styledMode ?
                    'highcharts-color-' +
                        this.options.seriesIndex + ' ' : '') +
                    'highcharts-bubble-legend-connectors ' +
                    (options.connectorClassName || '')).add(this.legendSymbol));
                // Render label
                label = renderer
                    .text(this.formatLabel(range), labelX, labelY + labelMovement)
                    .attr(styledMode ? {} : range.labelStyle)
                    .addClass('highcharts-bubble-legend-labels ' +
                    (options.labels.className || '')).add(this.legendSymbol);
                labels.push(label);
                // To enable default 'hideOverlappingLabels' method
                label.placed = true;
                label.alignAttr = {
                    x: labelX,
                    y: labelY + labelMovement
                };
            };
            /**
             * Get the label which takes up the most space.
             *
             * @private
             * @function Highcharts.BubbleLegend#getMaxLabelSize
             * @return {Highcharts.BBoxObject}
             */
            BubbleLegend.prototype.getMaxLabelSize = function () {
                var labels = this.symbols.labels, maxLabel, labelSize;
                labels.forEach(function (label) {
                    labelSize = label.getBBox(true);
                    if (maxLabel) {
                        maxLabel = labelSize.width > maxLabel.width ?
                            labelSize : maxLabel;
                    }
                    else {
                        maxLabel = labelSize;
                    }
                });
                return maxLabel || {};
            };
            /**
             * Get formatted label for range.
             *
             * @private
             * @function Highcharts.BubbleLegend#formatLabel
             * @param {Highcharts.LegendBubbleLegendRangesOptions} range
             *        Range options
             * @return {string}
             *         Range label text
             */
            BubbleLegend.prototype.formatLabel = function (range) {
                var options = this.options, formatter = options.labels.formatter, format = options.labels.format;
                var numberFormatter = this.chart.numberFormatter;
                return format ? U.format(format, range) :
                    formatter ? formatter.call(range) :
                        numberFormatter(range.value, 1);
            };
            /**
             * By using default chart 'hideOverlappingLabels' method, hide or show
             * labels and connectors.
             *
             * @private
             * @function Highcharts.BubbleLegend#hideOverlappingLabels
             * @return {void}
             */
            BubbleLegend.prototype.hideOverlappingLabels = function () {
                var chart = this.chart, allowOverlap = this.options.labels.allowOverlap, symbols = this.symbols;
                if (!allowOverlap && symbols) {
                    chart.hideOverlappingLabels(symbols.labels);
                    // Hide or show connectors
                    symbols.labels.forEach(function (label, index) {
                        if (!label.newOpacity) {
                            symbols.connectors[index].hide();
                        }
                        else if (label.newOpacity !== label.oldOpacity) {
                            symbols.connectors[index].show();
                        }
                    });
                }
            };
            /**
             * Calculate ranges from created series.
             *
             * @private
             * @function Highcharts.BubbleLegend#getRanges
             * @return {Array<Highcharts.LegendBubbleLegendRangesOptions>}
             *         Array of range objects
             */
            BubbleLegend.prototype.getRanges = function () {
                var bubbleLegend = this.legend.bubbleLegend, series = bubbleLegend.chart.series, ranges, rangesOptions = bubbleLegend.options.ranges, zData, minZ = Number.MAX_VALUE, maxZ = -Number.MAX_VALUE;
                series.forEach(function (s) {
                    // Find the min and max Z, like in bubble series
                    if (s.isBubble && !s.ignoreSeries) {
                        zData = s.zData.filter(isNumber);
                        if (zData.length) {
                            minZ = pick(s.options.zMin, Math.min(minZ, Math.max(arrayMin(zData), s.options.displayNegative === false ?
                                s.options.zThreshold :
                                -Number.MAX_VALUE)));
                            maxZ = pick(s.options.zMax, Math.max(maxZ, arrayMax(zData)));
                        }
                    }
                });
                // Set values for ranges
                if (minZ === maxZ) {
                    // Only one range if min and max values are the same.
                    ranges = [{ value: maxZ }];
                }
                else {
                    ranges = [
                        { value: minZ },
                        { value: (minZ + maxZ) / 2 },
                        { value: maxZ, autoRanges: true }
                    ];
                }
                // Prevent reverse order of ranges after redraw
                if (rangesOptions.length && rangesOptions[0].radius) {
                    ranges.reverse();
                }
                // Merge ranges values with user options
                ranges.forEach(function (range, i) {
                    if (rangesOptions && rangesOptions[i]) {
                        ranges[i] = merge(false, rangesOptions[i], range);
                    }
                });
                return ranges;
            };
            /**
             * Calculate bubble legend sizes from rendered series.
             *
             * @private
             * @function Highcharts.BubbleLegend#predictBubbleSizes
             * @return {Array<number,number>}
             *         Calculated min and max bubble sizes
             */
            BubbleLegend.prototype.predictBubbleSizes = function () {
                var chart = this.chart, fontMetrics = this.fontMetrics, legendOptions = chart.legend.options, floating = legendOptions.floating, horizontal = legendOptions.layout === 'horizontal', lastLineHeight = horizontal ? chart.legend.lastLineHeight : 0, plotSizeX = chart.plotSizeX, plotSizeY = chart.plotSizeY, bubbleSeries = chart.series[this.options.seriesIndex], minSize = Math.ceil(bubbleSeries.minPxSize), maxPxSize = Math.ceil(bubbleSeries.maxPxSize), maxSize = bubbleSeries.options.maxSize, plotSize = Math.min(plotSizeY, plotSizeX), calculatedSize;
                // Calculate prediceted max size of bubble
                if (floating || !(/%$/.test(maxSize))) {
                    calculatedSize = maxPxSize;
                }
                else {
                    maxSize = parseFloat(maxSize);
                    calculatedSize = ((plotSize + lastLineHeight -
                        fontMetrics.h / 2) * maxSize / 100) / (maxSize / 100 + 1);
                    // Get maxPxSize from bubble series if calculated bubble legend
                    // size will not affect to bubbles series.
                    if ((horizontal && plotSizeY - calculatedSize >=
                        plotSizeX) || (!horizontal && plotSizeX -
                        calculatedSize >= plotSizeY)) {
                        calculatedSize = maxPxSize;
                    }
                }
                return [minSize, Math.ceil(calculatedSize)];
            };
            /**
             * Correct ranges with calculated sizes.
             *
             * @private
             * @function Highcharts.BubbleLegend#updateRanges
             * @param {number} min
             * @param {number} max
             * @return {void}
             */
            BubbleLegend.prototype.updateRanges = function (min, max) {
                var bubbleLegendOptions = this.legend.options.bubbleLegend;
                bubbleLegendOptions.minSize = min;
                bubbleLegendOptions.maxSize = max;
                bubbleLegendOptions.ranges = this.getRanges();
            };
            /**
             * Because of the possibility of creating another legend line, predicted
             * bubble legend sizes may differ by a few pixels, so it is necessary to
             * correct them.
             *
             * @private
             * @function Highcharts.BubbleLegend#correctSizes
             * @return {void}
             */
            BubbleLegend.prototype.correctSizes = function () {
                var legend = this.legend, chart = this.chart, bubbleSeries = chart.series[this.options.seriesIndex], bubbleSeriesSize = bubbleSeries.maxPxSize, bubbleLegendSize = this.options.maxSize;
                if (Math.abs(Math.ceil(bubbleSeriesSize) - bubbleLegendSize) >
                    1) {
                    this.updateRanges(this.options.minSize, bubbleSeries.maxPxSize);
                    legend.render();
                }
            };
            return BubbleLegend;
        }());
        // Start the bubble legend creation process.
        addEvent(Legend, 'afterGetAllItems', function (e) {
            var legend = this, bubbleLegend = legend.bubbleLegend, legendOptions = legend.options, options = legendOptions.bubbleLegend, bubbleSeriesIndex = legend.chart.getVisibleBubbleSeriesIndex();
            // Remove unnecessary element
            if (bubbleLegend && bubbleLegend.ranges && bubbleLegend.ranges.length) {
                // Allow change the way of calculating ranges in update
                if (options.ranges.length) {
                    options.autoRanges =
                        !!options.ranges[0].autoRanges;
                }
                // Update bubbleLegend dimensions in each redraw
                legend.destroyItem(bubbleLegend);
            }
            // Create bubble legend
            if (bubbleSeriesIndex >= 0 &&
                legendOptions.enabled &&
                options.enabled) {
                options.seriesIndex = bubbleSeriesIndex;
                legend.bubbleLegend = new H.BubbleLegend(options, legend);
                legend.bubbleLegend.addToLegend(e.allItems);
            }
        });
        /**
         * Check if there is at least one visible bubble series.
         *
         * @private
         * @function Highcharts.Chart#getVisibleBubbleSeriesIndex
         * @return {number}
         *         First visible bubble series index
         */
        Chart.prototype.getVisibleBubbleSeriesIndex = function () {
            var series = this.series, i = 0;
            while (i < series.length) {
                if (series[i] &&
                    series[i].isBubble &&
                    series[i].visible &&
                    series[i].zData.length) {
                    return i;
                }
                i++;
            }
            return -1;
        };
        /**
         * Calculate height for each row in legend.
         *
         * @private
         * @function Highcharts.Legend#getLinesHeights
         * @return {Array<Highcharts.Dictionary<number>>}
         *         Informations about line height and items amount
         */
        Legend.prototype.getLinesHeights = function () {
            var items = this.allItems, lines = [], lastLine, length = items.length, i = 0, j = 0;
            for (i = 0; i < length; i++) {
                if (items[i].legendItemHeight) {
                    // for bubbleLegend
                    items[i].itemHeight = items[i].legendItemHeight;
                }
                if ( // Line break
                items[i] === items[length - 1] ||
                    items[i + 1] &&
                        items[i]._legendItemPos[1] !==
                            items[i + 1]._legendItemPos[1]) {
                    lines.push({ height: 0 });
                    lastLine = lines[lines.length - 1];
                    // Find the highest item in line
                    for (j; j <= i; j++) {
                        if (items[j].itemHeight > lastLine.height) {
                            lastLine.height = items[j].itemHeight;
                        }
                    }
                    lastLine.step = i;
                }
            }
            return lines;
        };
        /**
         * Correct legend items translation in case of different elements heights.
         *
         * @private
         * @function Highcharts.Legend#retranslateItems
         * @param {Array<Highcharts.Dictionary<number>>} lines
         *        Informations about line height and items amount
         * @return {void}
         */
        Legend.prototype.retranslateItems = function (lines) {
            var items = this.allItems, orgTranslateX, orgTranslateY, movementX, rtl = this.options.rtl, actualLine = 0;
            items.forEach(function (item, index) {
                orgTranslateX = item.legendGroup.translateX;
                orgTranslateY = item._legendItemPos[1];
                movementX = item.movementX;
                if (movementX || (rtl && item.ranges)) {
                    movementX = rtl ?
                        orgTranslateX - item.options.maxSize / 2 :
                        orgTranslateX + movementX;
                    item.legendGroup.attr({ translateX: movementX });
                }
                if (index > lines[actualLine].step) {
                    actualLine++;
                }
                item.legendGroup.attr({
                    translateY: Math.round(orgTranslateY + lines[actualLine].height / 2)
                });
                item._legendItemPos[1] = orgTranslateY +
                    lines[actualLine].height / 2;
            });
        };
        // Toggle bubble legend depending on the visible status of bubble series.
        addEvent(Series, 'legendItemClick', function () {
            var series = this, chart = series.chart, visible = series.visible, legend = series.chart.legend, status;
            if (legend && legend.bubbleLegend) {
                // Temporary correct 'visible' property
                series.visible = !visible;
                // Save future status for getRanges method
                series.ignoreSeries = visible;
                // Check if at lest one bubble series is visible
                status = chart.getVisibleBubbleSeriesIndex() >= 0;
                // Hide bubble legend if all bubble series are disabled
                if (legend.bubbleLegend.visible !== status) {
                    // Show or hide bubble legend
                    legend.update({
                        bubbleLegend: { enabled: status }
                    });
                    legend.bubbleLegend.visible = status; // Restore default status
                }
                series.visible = visible;
            }
        });
        // If ranges are not specified, determine ranges from rendered bubble series
        // and render legend again.
        wrap(Chart.prototype, 'drawChartBox', function (proceed, options, callback) {
            var chart = this, legend = chart.legend, bubbleSeries = chart.getVisibleBubbleSeriesIndex() >= 0, bubbleLegendOptions, bubbleSizes;
            if (legend && legend.options.enabled && legend.bubbleLegend &&
                legend.options.bubbleLegend.autoRanges && bubbleSeries) {
                bubbleLegendOptions = legend.bubbleLegend.options;
                bubbleSizes = legend.bubbleLegend.predictBubbleSizes();
                legend.bubbleLegend.updateRanges(bubbleSizes[0], bubbleSizes[1]);
                // Disable animation on init
                if (!bubbleLegendOptions.placed) {
                    legend.group.placed = false;
                    legend.allItems.forEach(function (item) {
                        item.legendGroup.translateY = null;
                    });
                }
                // Create legend with bubbleLegend
                legend.render();
                chart.getMargins();
                chart.axes.forEach(function (axis) {
                    if (axis.visible) { // #11448
                        axis.render();
                    }
                    if (!bubbleLegendOptions.placed) {
                        axis.setScale();
                        axis.updateNames();
                        // Disable axis animation on init
                        objectEach(axis.ticks, function (tick) {
                            tick.isNew = true;
                            tick.isNewLabel = true;
                        });
                    }
                });
                bubbleLegendOptions.placed = true;
                // After recalculate axes, calculate margins again.
                chart.getMargins();
                // Call default 'drawChartBox' method.
                proceed.call(chart, options, callback);
                // Check bubble legend sizes and correct them if necessary.
                legend.bubbleLegend.correctSizes();
                // Correct items positions with different dimensions in legend.
                legend.retranslateItems(legend.getLinesHeights());
            }
            else {
                proceed.call(chart, options, callback);
                // Allow color change on static bubble legend after click on legend
                if (legend && legend.options.enabled && legend.bubbleLegend) {
                    legend.render();
                    legend.retranslateItems(legend.getLinesHeights());
                }
            }
        });
        H.BubbleLegend = BubbleLegend;

        return H.BubbleLegend;
    });
    _registerModule(_modules, 'parts-more/BubbleSeries.js', [_modules['parts/Globals.js'], _modules['parts/Color.js'], _modules['parts/Point.js'], _modules['parts/Utilities.js']], function (H, Color, Point, U) {
        /* *
         *
         *  (c) 2010-2020 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /**
         * @typedef {"area"|"width"} Highcharts.BubbleSizeByValue
         */
        var color = Color.parse;
        var arrayMax = U.arrayMax, arrayMin = U.arrayMin, clamp = U.clamp, extend = U.extend, isNumber = U.isNumber, pick = U.pick, pInt = U.pInt, seriesType = U.seriesType;
        var Axis = H.Axis, noop = H.noop, Series = H.Series, seriesTypes = H.seriesTypes;
        /**
         * A bubble series is a three dimensional series type where each point renders
         * an X, Y and Z value. Each points is drawn as a bubble where the position
         * along the X and Y axes mark the X and Y values, and the size of the bubble
         * relates to the Z value.
         *
         * @sample {highcharts} highcharts/demo/bubble/
         *         Bubble chart
         *
         * @extends      plotOptions.scatter
         * @excluding    cluster
         * @product      highcharts highstock
         * @requires     highcharts-more
         * @optionparent plotOptions.bubble
         */
        seriesType('bubble', 'scatter', {
            dataLabels: {
                formatter: function () {
                    return this.point.z;
                },
                inside: true,
                verticalAlign: 'middle'
            },
            /**
             * If there are more points in the series than the `animationLimit`, the
             * animation won't run. Animation affects overall performance and doesn't
             * work well with heavy data series.
             *
             * @since 6.1.0
             */
            animationLimit: 250,
            /**
             * Whether to display negative sized bubbles. The threshold is given
             * by the [zThreshold](#plotOptions.bubble.zThreshold) option, and negative
             * bubbles can be visualized by setting
             * [negativeColor](#plotOptions.bubble.negativeColor).
             *
             * @sample {highcharts} highcharts/plotoptions/bubble-negative/
             *         Negative bubbles
             *
             * @type      {boolean}
             * @default   true
             * @since     3.0
             * @apioption plotOptions.bubble.displayNegative
             */
            /**
             * @extends   plotOptions.series.marker
             * @excluding enabled, enabledThreshold, height, radius, width
             */
            marker: {
                lineColor: null,
                lineWidth: 1,
                /**
                 * The fill opacity of the bubble markers.
                 */
                fillOpacity: 0.5,
                /**
                 * In bubble charts, the radius is overridden and determined based on
                 * the point's data value.
                 *
                 * @ignore-option
                 */
                radius: null,
                states: {
                    hover: {
                        radiusPlus: 0
                    }
                },
                /**
                 * A predefined shape or symbol for the marker. Possible values are
                 * "circle", "square", "diamond", "triangle" and "triangle-down".
                 *
                 * Additionally, the URL to a graphic can be given on the form
                 * `url(graphic.png)`. Note that for the image to be applied to exported
                 * charts, its URL needs to be accessible by the export server.
                 *
                 * Custom callbacks for symbol path generation can also be added to
                 * `Highcharts.SVGRenderer.prototype.symbols`. The callback is then
                 * used by its method name, as shown in the demo.
                 *
                 * @sample     {highcharts} highcharts/plotoptions/bubble-symbol/
                 *             Bubble chart with various symbols
                 * @sample     {highcharts} highcharts/plotoptions/series-marker-symbol/
                 *             General chart with predefined, graphic and custom markers
                 *
                 * @type  {Highcharts.SymbolKeyValue|string}
                 * @since 5.0.11
                 */
                symbol: 'circle'
            },
            /**
             * Minimum bubble size. Bubbles will automatically size between the
             * `minSize` and `maxSize` to reflect the `z` value of each bubble.
             * Can be either pixels (when no unit is given), or a percentage of
             * the smallest one of the plot width and height.
             *
             * @sample {highcharts} highcharts/plotoptions/bubble-size/
             *         Bubble size
             *
             * @type    {number|string}
             * @since   3.0
             * @product highcharts highstock
             */
            minSize: 8,
            /**
             * Maximum bubble size. Bubbles will automatically size between the
             * `minSize` and `maxSize` to reflect the `z` value of each bubble.
             * Can be either pixels (when no unit is given), or a percentage of
             * the smallest one of the plot width and height.
             *
             * @sample {highcharts} highcharts/plotoptions/bubble-size/
             *         Bubble size
             *
             * @type    {number|string}
             * @since   3.0
             * @product highcharts highstock
             */
            maxSize: '20%',
            /**
             * When a point's Z value is below the
             * [zThreshold](#plotOptions.bubble.zThreshold) setting, this color is used.
             *
             * @sample {highcharts} highcharts/plotoptions/bubble-negative/
             *         Negative bubbles
             *
             * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @since     3.0
             * @product   highcharts
             * @apioption plotOptions.bubble.negativeColor
             */
            /**
             * Whether the bubble's value should be represented by the area or the
             * width of the bubble. The default, `area`, corresponds best to the
             * human perception of the size of each bubble.
             *
             * @sample {highcharts} highcharts/plotoptions/bubble-sizeby/
             *         Comparison of area and size
             *
             * @type       {Highcharts.BubbleSizeByValue}
             * @default    area
             * @since      3.0.7
             * @apioption  plotOptions.bubble.sizeBy
             */
            /**
             * When this is true, the absolute value of z determines the size of
             * the bubble. This means that with the default `zThreshold` of 0, a
             * bubble of value -1 will have the same size as a bubble of value 1,
             * while a bubble of value 0 will have a smaller size according to
             * `minSize`.
             *
             * @sample    {highcharts} highcharts/plotoptions/bubble-sizebyabsolutevalue/
             *            Size by absolute value, various thresholds
             *
             * @type      {boolean}
             * @default   false
             * @since     4.1.9
             * @product   highcharts
             * @apioption plotOptions.bubble.sizeByAbsoluteValue
             */
            /**
             * When this is true, the series will not cause the Y axis to cross
             * the zero plane (or [threshold](#plotOptions.series.threshold) option)
             * unless the data actually crosses the plane.
             *
             * For example, if `softThreshold` is `false`, a series of 0, 1, 2,
             * 3 will make the Y axis show negative values according to the `minPadding`
             * option. If `softThreshold` is `true`, the Y axis starts at 0.
             *
             * @since   4.1.9
             * @product highcharts
             */
            softThreshold: false,
            states: {
                hover: {
                    halo: {
                        size: 5
                    }
                }
            },
            tooltip: {
                pointFormat: '({point.x}, {point.y}), Size: {point.z}'
            },
            turboThreshold: 0,
            /**
             * The minimum for the Z value range. Defaults to the highest Z value
             * in the data.
             *
             * @see [zMin](#plotOptions.bubble.zMin)
             *
             * @sample {highcharts} highcharts/plotoptions/bubble-zmin-zmax/
             *         Z has a possible range of 0-100
             *
             * @type      {number}
             * @since     4.0.3
             * @product   highcharts
             * @apioption plotOptions.bubble.zMax
             */
            /**
             * @default   z
             * @apioption plotOptions.bubble.colorKey
             */
            /**
             * The minimum for the Z value range. Defaults to the lowest Z value
             * in the data.
             *
             * @see [zMax](#plotOptions.bubble.zMax)
             *
             * @sample {highcharts} highcharts/plotoptions/bubble-zmin-zmax/
             *         Z has a possible range of 0-100
             *
             * @type      {number}
             * @since     4.0.3
             * @product   highcharts
             * @apioption plotOptions.bubble.zMin
             */
            /**
             * When [displayNegative](#plotOptions.bubble.displayNegative) is `false`,
             * bubbles with lower Z values are skipped. When `displayNegative`
             * is `true` and a [negativeColor](#plotOptions.bubble.negativeColor)
             * is given, points with lower Z is colored.
             *
             * @sample {highcharts} highcharts/plotoptions/bubble-negative/
             *         Negative bubbles
             *
             * @since   3.0
             * @product highcharts
             */
            zThreshold: 0,
            zoneAxis: 'z'
            // Prototype members
        }, {
            pointArrayMap: ['y', 'z'],
            parallelArrays: ['x', 'y', 'z'],
            trackerGroups: ['group', 'dataLabelsGroup'],
            specialGroup: 'group',
            bubblePadding: true,
            zoneAxis: 'z',
            directTouch: true,
            isBubble: true,
            /* eslint-disable valid-jsdoc */
            /**
             * @private
             */
            pointAttribs: function (point, state) {
                var markerOptions = this.options.marker, fillOpacity = markerOptions.fillOpacity, attr = Series.prototype.pointAttribs.call(this, point, state);
                if (fillOpacity !== 1) {
                    attr.fill = color(attr.fill)
                        .setOpacity(fillOpacity)
                        .get('rgba');
                }
                return attr;
            },
            /**
             * Get the radius for each point based on the minSize, maxSize and each
             * point's Z value. This must be done prior to Series.translate because
             * the axis needs to add padding in accordance with the point sizes.
             * @private
             */
            getRadii: function (zMin, zMax, series) {
                var len, i, zData = this.zData, yData = this.yData, minSize = series.minPxSize, maxSize = series.maxPxSize, radii = [], value;
                // Set the shape type and arguments to be picked up in drawPoints
                for (i = 0, len = zData.length; i < len; i++) {
                    value = zData[i];
                    // Separate method to get individual radius for bubbleLegend
                    radii.push(this.getRadius(zMin, zMax, minSize, maxSize, value, yData[i]));
                }
                this.radii = radii;
            },
            /**
             * Get the individual radius for one point.
             * @private
             */
            getRadius: function (zMin, zMax, minSize, maxSize, value, yValue) {
                var options = this.options, sizeByArea = options.sizeBy !== 'width', zThreshold = options.zThreshold, zRange = zMax - zMin, pos = 0.5;
                // #8608 - bubble should be visible when z is undefined
                if (yValue === null || value === null) {
                    return null;
                }
                if (isNumber(value)) {
                    // When sizing by threshold, the absolute value of z determines
                    // the size of the bubble.
                    if (options.sizeByAbsoluteValue) {
                        value = Math.abs(value - zThreshold);
                        zMax = zRange = Math.max(zMax - zThreshold, Math.abs(zMin - zThreshold));
                        zMin = 0;
                    }
                    // Issue #4419 - if value is less than zMin, push a radius that's
                    // always smaller than the minimum size
                    if (value < zMin) {
                        return minSize / 2 - 1;
                    }
                    // Relative size, a number between 0 and 1
                    if (zRange > 0) {
                        pos = (value - zMin) / zRange;
                    }
                }
                if (sizeByArea && pos >= 0) {
                    pos = Math.sqrt(pos);
                }
                return Math.ceil(minSize + pos * (maxSize - minSize)) / 2;
            },
            /**
             * Perform animation on the bubbles
             * @private
             */
            animate: function (init) {
                if (!init &&
                    this.points.length < this.options.animationLimit // #8099
                ) {
                    this.points.forEach(function (point) {
                        var graphic = point.graphic;
                        if (graphic && graphic.width) { // URL symbols don't have width
                            // Start values
                            if (!this.hasRendered) {
                                graphic.attr({
                                    x: point.plotX,
                                    y: point.plotY,
                                    width: 1,
                                    height: 1
                                });
                            }
                            // Run animation
                            graphic.animate(this.markerAttribs(point), this.options.animation);
                        }
                    }, this);
                }
            },
            /**
             * Define hasData function for non-cartesian series.
             * Returns true if the series has points at all.
             * @private
             */
            hasData: function () {
                return !!this.processedXData.length; // != 0
            },
            /**
             * Extend the base translate method to handle bubble size
             * @private
             */
            translate: function () {
                var i, data = this.data, point, radius, radii = this.radii;
                // Run the parent method
                seriesTypes.scatter.prototype.translate.call(this);
                // Set the shape type and arguments to be picked up in drawPoints
                i = data.length;
                while (i--) {
                    point = data[i];
                    radius = radii ? radii[i] : 0; // #1737
                    if (isNumber(radius) && radius >= this.minPxSize / 2) {
                        // Shape arguments
                        point.marker = extend(point.marker, {
                            radius: radius,
                            width: 2 * radius,
                            height: 2 * radius
                        });
                        // Alignment box for the data label
                        point.dlBox = {
                            x: point.plotX - radius,
                            y: point.plotY - radius,
                            width: 2 * radius,
                            height: 2 * radius
                        };
                    }
                    else { // below zThreshold
                        // #1691
                        point.shapeArgs = point.plotY = point.dlBox = void 0;
                    }
                }
            },
            alignDataLabel: seriesTypes.column.prototype.alignDataLabel,
            buildKDTree: noop,
            applyZones: noop
            // Point class
        }, {
            /**
             * @private
             */
            haloPath: function (size) {
                return Point.prototype.haloPath.call(this, 
                // #6067
                size === 0 ? 0 : (this.marker ? this.marker.radius || 0 : 0) + size);
            },
            ttBelow: false
        });
        // Add logic to pad each axis with the amount of pixels necessary to avoid the
        // bubbles to overflow.
        Axis.prototype.beforePadding = function () {
            var axis = this, axisLength = this.len, chart = this.chart, pxMin = 0, pxMax = axisLength, isXAxis = this.isXAxis, dataKey = isXAxis ? 'xData' : 'yData', min = this.min, extremes = {}, smallestSize = Math.min(chart.plotWidth, chart.plotHeight), zMin = Number.MAX_VALUE, zMax = -Number.MAX_VALUE, range = this.max - min, transA = axisLength / range, activeSeries = [];
            // Handle padding on the second pass, or on redraw
            this.series.forEach(function (series) {
                var seriesOptions = series.options, zData;
                if (series.bubblePadding &&
                    (series.visible || !chart.options.chart.ignoreHiddenSeries)) {
                    // Correction for #1673
                    axis.allowZoomOutside = true;
                    // Cache it
                    activeSeries.push(series);
                    if (isXAxis) { // because X axis is evaluated first
                        // For each series, translate the size extremes to pixel values
                        ['minSize', 'maxSize'].forEach(function (prop) {
                            var length = seriesOptions[prop], isPercent = /%$/.test(length);
                            length = pInt(length);
                            extremes[prop] = isPercent ?
                                smallestSize * length / 100 :
                                length;
                        });
                        series.minPxSize = extremes.minSize;
                        // Prioritize min size if conflict to make sure bubbles are
                        // always visible. #5873
                        series.maxPxSize = Math.max(extremes.maxSize, extremes.minSize);
                        // Find the min and max Z
                        zData = series.zData.filter(isNumber);
                        if (zData.length) { // #1735
                            zMin = pick(seriesOptions.zMin, clamp(arrayMin(zData), seriesOptions.displayNegative === false ?
                                seriesOptions.zThreshold :
                                -Number.MAX_VALUE, zMin));
                            zMax = pick(seriesOptions.zMax, Math.max(zMax, arrayMax(zData)));
                        }
                    }
                }
            });
            activeSeries.forEach(function (series) {
                var data = series[dataKey], i = data.length, radius;
                if (isXAxis) {
                    series.getRadii(zMin, zMax, series);
                }
                if (range > 0) {
                    while (i--) {
                        if (isNumber(data[i]) &&
                            axis.dataMin <= data[i] &&
                            data[i] <= axis.max) {
                            radius = series.radii ? series.radii[i] : 0;
                            pxMin = Math.min(((data[i] - min) * transA) - radius, pxMin);
                            pxMax = Math.max(((data[i] - min) * transA) + radius, pxMax);
                        }
                    }
                }
            });
            // Apply the padding to the min and max properties
            if (activeSeries.length && range > 0 && !this.logarithmic) {
                pxMax -= axisLength;
                transA *= (axisLength +
                    Math.max(0, pxMin) - // #8901
                    Math.min(pxMax, axisLength)) / axisLength;
                [
                    ['min', 'userMin', pxMin],
                    ['max', 'userMax', pxMax]
                ].forEach(function (keys) {
                    if (typeof pick(axis.options[keys[0]], axis[keys[1]]) === 'undefined') {
                        axis[keys[0]] += keys[2] / transA;
                    }
                });
            }
            /* eslint-enable valid-jsdoc */
        };
        /**
         * A `bubble` series. If the [type](#series.bubble.type) option is
         * not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.bubble
         * @excluding dataParser, dataURL, stack
         * @product   highcharts highstock
         * @requires  highcharts-more
         * @apioption series.bubble
         */
        /**
         * An array of data points for the series. For the `bubble` series type,
         * points can be given in the following ways:
         *
         * 1. An array of arrays with 3 or 2 values. In this case, the values correspond
         *    to `x,y,z`. If the first value is a string, it is applied as the name of
         *    the point, and the `x` value is inferred. The `x` value can also be
         *    omitted, in which case the inner arrays should be of length 2\. Then the
         *    `x` value is automatically calculated, either starting at 0 and
         *    incremented by 1, or from `pointStart` and `pointInterval` given in the
         *    series options.
         *    ```js
         *    data: [
         *        [0, 1, 2],
         *        [1, 5, 5],
         *        [2, 0, 2]
         *    ]
         *    ```
         *
         * 2. An array of objects with named values. The following snippet shows only a
         *    few settings, see the complete options set below. If the total number of
         *    data points exceeds the series'
         *    [turboThreshold](#series.bubble.turboThreshold), this option is not
         *    available.
         *    ```js
         *    data: [{
         *        x: 1,
         *        y: 1,
         *        z: 1,
         *        name: "Point2",
         *        color: "#00FF00"
         *    }, {
         *        x: 1,
         *        y: 5,
         *        z: 4,
         *        name: "Point1",
         *        color: "#FF00FF"
         *    }]
         *    ```
         *
         * @sample {highcharts} highcharts/series/data-array-of-arrays/
         *         Arrays of numeric x and y
         * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
         *         Arrays of datetime x and y
         * @sample {highcharts} highcharts/series/data-array-of-name-value/
         *         Arrays of point.name and y
         * @sample {highcharts} highcharts/series/data-array-of-objects/
         *         Config objects
         *
         * @type      {Array<Array<(number|string),number>|Array<(number|string),number,number>|*>}
         * @extends   series.line.data
         * @product   highcharts
         * @apioption series.bubble.data
         */
        /**
         * @extends     series.line.data.marker
         * @excluding   enabledThreshold, height, radius, width
         * @product     highcharts
         * @apioption   series.bubble.data.marker
         */
        /**
         * The size value for each bubble. The bubbles' diameters are computed
         * based on the `z`, and controlled by series options like `minSize`,
         * `maxSize`, `sizeBy`, `zMin` and `zMax`.
         *
         * @type      {number|null}
         * @product   highcharts
         * @apioption series.bubble.data.z
         */
        /**
         * @excluding enabled, enabledThreshold, height, radius, width
         * @apioption series.bubble.marker
         */
        ''; // adds doclets above to transpiled file

    });
    _registerModule(_modules, 'modules/networkgraph/integrations.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  Networkgraph series
         *
         *  (c) 2010-2020 Paweł Fus
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* eslint-disable no-invalid-this, valid-jsdoc */
        H.networkgraphIntegrations = {
            verlet: {
                /**
                 * Attractive force funtion. Can be replaced by API's
                 * `layoutAlgorithm.attractiveForce`
                 *
                 * @private
                 * @param {number} d current distance between two nodes
                 * @param {number} k expected distance between two nodes
                 * @return {number} force
                 */
                attractiveForceFunction: function (d, k) {
                    // Used in API:
                    return (k - d) / d;
                },
                /**
                 * Repulsive force funtion. Can be replaced by API's
                 * `layoutAlgorithm.repulsiveForce`
                 *
                 * @private
                 * @param {number} d current distance between two nodes
                 * @param {number} k expected distance between two nodes
                 * @return {number} force
                 */
                repulsiveForceFunction: function (d, k) {
                    // Used in API:
                    return (k - d) / d * (k > d ? 1 : 0); // Force only for close nodes
                },
                /**
                 * Barycenter force. Calculate and applys barycenter forces on the
                 * nodes. Making them closer to the center of their barycenter point.
                 *
                 * In Verlet integration, force is applied on a node immidatelly to it's
                 * `plotX` and `plotY` position.
                 *
                 * @private
                 * @return {void}
                 */
                barycenter: function () {
                    var gravitationalConstant = this.options.gravitationalConstant, xFactor = this.barycenter.xFactor, yFactor = this.barycenter.yFactor;
                    // To consider:
                    xFactor = (xFactor - (this.box.left + this.box.width) / 2) *
                        gravitationalConstant;
                    yFactor = (yFactor - (this.box.top + this.box.height) / 2) *
                        gravitationalConstant;
                    this.nodes.forEach(function (node) {
                        if (!node.fixedPosition) {
                            node.plotX -=
                                xFactor / node.mass / node.degree;
                            node.plotY -=
                                yFactor / node.mass / node.degree;
                        }
                    });
                },
                /**
                 * Repulsive force.
                 *
                 * In Verlet integration, force is applied on a node immidatelly to it's
                 * `plotX` and `plotY` position.
                 *
                 * @private
                 * @param {Highcharts.Point} node
                 *        Node that should be translated by force.
                 * @param {number} force
                 *        Force calcualated in `repulsiveForceFunction`
                 * @param {Highcharts.PositionObject} distance
                 *        Distance between two nodes e.g. `{x, y}`
                 * @return {void}
                 */
                repulsive: function (node, force, distanceXY) {
                    var factor = force * this.diffTemperature / node.mass / node.degree;
                    if (!node.fixedPosition) {
                        node.plotX += distanceXY.x * factor;
                        node.plotY += distanceXY.y * factor;
                    }
                },
                /**
                 * Attractive force.
                 *
                 * In Verlet integration, force is applied on a node immidatelly to it's
                 * `plotX` and `plotY` position.
                 *
                 * @private
                 * @param {Highcharts.Point} link
                 *        Link that connects two nodes
                 * @param {number} force
                 *        Force calcualated in `repulsiveForceFunction`
                 * @param {Highcharts.PositionObject} distance
                 *        Distance between two nodes e.g. `{x, y}`
                 * @return {void}
                 */
                attractive: function (link, force, distanceXY) {
                    var massFactor = link.getMass(), translatedX = -distanceXY.x * force * this.diffTemperature, translatedY = -distanceXY.y * force * this.diffTemperature;
                    if (!link.fromNode.fixedPosition) {
                        link.fromNode.plotX -=
                            translatedX * massFactor.fromNode / link.fromNode.degree;
                        link.fromNode.plotY -=
                            translatedY * massFactor.fromNode / link.fromNode.degree;
                    }
                    if (!link.toNode.fixedPosition) {
                        link.toNode.plotX +=
                            translatedX * massFactor.toNode / link.toNode.degree;
                        link.toNode.plotY +=
                            translatedY * massFactor.toNode / link.toNode.degree;
                    }
                },
                /**
                 * Integration method.
                 *
                 * In Verlet integration, forces are applied on node immidatelly to it's
                 * `plotX` and `plotY` position.
                 *
                 * Verlet without velocity:
                 *
                 *    x(n+1) = 2 * x(n) - x(n-1) + A(T) * deltaT ^ 2
                 *
                 * where:
                 *     - x(n+1) - new position
                 *     - x(n) - current position
                 *     - x(n-1) - previous position
                 *
                 * Assuming A(t) = 0 (no acceleration) and (deltaT = 1) we get:
                 *
                 *     x(n+1) = x(n) + (x(n) - x(n-1))
                 *
                 * where:
                 *     - (x(n) - x(n-1)) - position change
                 *
                 * TO DO:
                 * Consider Verlet with velocity to support additional
                 * forces. Or even Time-Corrected Verlet by Jonathan
                 * "lonesock" Dummer
                 *
                 * @private
                 * @param {Highcharts.NetworkgraphLayout} layout layout object
                 * @param {Highcharts.Point} node node that should be translated
                 * @return {void}
                 */
                integrate: function (layout, node) {
                    var friction = -layout.options.friction, maxSpeed = layout.options.maxSpeed, prevX = node.prevX, prevY = node.prevY, 
                    // Apply friciton:
                    diffX = ((node.plotX + node.dispX -
                        prevX) * friction), diffY = ((node.plotY + node.dispY -
                        prevY) * friction), abs = Math.abs, signX = abs(diffX) / (diffX || 1), // need to deal with 0
                    signY = abs(diffY) / (diffY || 1);
                    // Apply max speed:
                    diffX = signX * Math.min(maxSpeed, Math.abs(diffX));
                    diffY = signY * Math.min(maxSpeed, Math.abs(diffY));
                    // Store for the next iteration:
                    node.prevX = node.plotX + node.dispX;
                    node.prevY = node.plotY + node.dispY;
                    // Update positions:
                    node.plotX += diffX;
                    node.plotY += diffY;
                    node.temperature = layout.vectorLength({
                        x: diffX,
                        y: diffY
                    });
                },
                /**
                 * Estiamte the best possible distance between two nodes, making graph
                 * readable.
                 *
                 * @private
                 * @param {Highcharts.NetworkgraphLayout} layout layout object
                 * @return {number}
                 */
                getK: function (layout) {
                    return Math.pow(layout.box.width * layout.box.height / layout.nodes.length, 0.5);
                }
            },
            euler: {
                /**
                 * Attractive force funtion. Can be replaced by API's
                 * `layoutAlgorithm.attractiveForce`
                 *
                 * Other forces that can be used:
                 *
                 * basic, not recommended:
                 *    `function (d, k) { return d / k }`
                 *
                 * @private
                 * @param {number} d current distance between two nodes
                 * @param {number} k expected distance between two nodes
                 * @return {number} force
                 */
                attractiveForceFunction: function (d, k) {
                    return d * d / k;
                },
                /**
                 * Repulsive force funtion. Can be replaced by API's
                 * `layoutAlgorithm.repulsiveForce`.
                 *
                 * Other forces that can be used:
                 *
                 * basic, not recommended:
                 *    `function (d, k) { return k / d }`
                 *
                 * standard:
                 *    `function (d, k) { return k * k / d }`
                 *
                 * grid-variant:
                 *    `function (d, k) { return k * k / d * (2 * k - d > 0 ? 1 : 0) }`
                 *
                 * @private
                 * @param {number} d current distance between two nodes
                 * @param {number} k expected distance between two nodes
                 * @return {number} force
                 */
                repulsiveForceFunction: function (d, k) {
                    return k * k / d;
                },
                /**
                 * Barycenter force. Calculate and applys barycenter forces on the
                 * nodes. Making them closer to the center of their barycenter point.
                 *
                 * In Euler integration, force is stored in a node, not changing it's
                 * position. Later, in `integrate()` forces are applied on nodes.
                 *
                 * @private
                 * @return {void}
                 */
                barycenter: function () {
                    var gravitationalConstant = this.options.gravitationalConstant, xFactor = this.barycenter.xFactor, yFactor = this.barycenter.yFactor;
                    this.nodes.forEach(function (node) {
                        if (!node.fixedPosition) {
                            var degree = node.getDegree(), phi = degree * (1 + degree / 2);
                            node.dispX += ((xFactor - node.plotX) *
                                gravitationalConstant *
                                phi / node.degree);
                            node.dispY += ((yFactor - node.plotY) *
                                gravitationalConstant *
                                phi / node.degree);
                        }
                    });
                },
                /**
                 * Repulsive force.
                 *
                 * @private
                 * @param {Highcharts.Point} node
                 *        Node that should be translated by force.
                 * @param {number} force
                 *        Force calcualated in `repulsiveForceFunction`
                 * @param {Highcharts.PositionObject} distanceXY
                 *        Distance between two nodes e.g. `{x, y}`
                 * @return {void}
                 */
                repulsive: function (node, force, distanceXY, distanceR) {
                    node.dispX +=
                        (distanceXY.x / distanceR) * force / node.degree;
                    node.dispY +=
                        (distanceXY.y / distanceR) * force / node.degree;
                },
                /**
                 * Attractive force.
                 *
                 * In Euler integration, force is stored in a node, not changing it's
                 * position. Later, in `integrate()` forces are applied on nodes.
                 *
                 * @private
                 * @param {Highcharts.Point} link
                 *        Link that connects two nodes
                 * @param {number} force
                 *        Force calcualated in `repulsiveForceFunction`
                 * @param {Highcharts.PositionObject} distanceXY
                 *        Distance between two nodes e.g. `{x, y}`
                 * @param {number} distanceR
                 * @return {void}
                 */
                attractive: function (link, force, distanceXY, distanceR) {
                    var massFactor = link.getMass(), translatedX = (distanceXY.x / distanceR) * force, translatedY = (distanceXY.y / distanceR) * force;
                    if (!link.fromNode.fixedPosition) {
                        link.fromNode.dispX -=
                            translatedX * massFactor.fromNode / link.fromNode.degree;
                        link.fromNode.dispY -=
                            translatedY * massFactor.fromNode / link.fromNode.degree;
                    }
                    if (!link.toNode.fixedPosition) {
                        link.toNode.dispX +=
                            translatedX * massFactor.toNode / link.toNode.degree;
                        link.toNode.dispY +=
                            translatedY * massFactor.toNode / link.toNode.degree;
                    }
                },
                /**
                 * Integration method.
                 *
                 * In Euler integration, force were stored in a node, not changing it's
                 * position. Now, in the integrator method, we apply changes.
                 *
                 * Euler:
                 *
                 * Basic form: `x(n+1) = x(n) + v(n)`
                 *
                 * With Rengoild-Fruchterman we get:
                 * `x(n+1) = x(n) + v(n) / length(v(n)) * min(v(n), temperature(n))`
                 * where:
                 * - `x(n+1)`: next position
                 * - `x(n)`: current position
                 * - `v(n)`: velocity (comes from net force)
                 * - `temperature(n)`: current temperature
                 *
                 * Known issues:
                 * Oscillations when force vector has the same magnitude but opposite
                 * direction in the next step. Potentially solved by decreasing force by
                 * `v * (1 / node.degree)`
                 *
                 * Note:
                 * Actually `min(v(n), temperature(n))` replaces simulated annealing.
                 *
                 * @private
                 * @param {Highcharts.NetworkgraphLayout} layout
                 *        Layout object
                 * @param {Highcharts.Point} node
                 *        Node that should be translated
                 * @return {void}
                 */
                integrate: function (layout, node) {
                    var distanceR;
                    node.dispX +=
                        node.dispX * layout.options.friction;
                    node.dispY +=
                        node.dispY * layout.options.friction;
                    distanceR = node.temperature = layout.vectorLength({
                        x: node.dispX,
                        y: node.dispY
                    });
                    if (distanceR !== 0) {
                        node.plotX += (node.dispX / distanceR *
                            Math.min(Math.abs(node.dispX), layout.temperature));
                        node.plotY += (node.dispY / distanceR *
                            Math.min(Math.abs(node.dispY), layout.temperature));
                    }
                },
                /**
                 * Estiamte the best possible distance between two nodes, making graph
                 * readable.
                 *
                 * @private
                 * @param {object} layout layout object
                 * @return {number}
                 */
                getK: function (layout) {
                    return Math.pow(layout.box.width * layout.box.height / layout.nodes.length, 0.3);
                }
            }
        };

    });
    _registerModule(_modules, 'modules/networkgraph/QuadTree.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js']], function (H, U) {
        /* *
         *
         *  Networkgraph series
         *
         *  (c) 2010-2020 Paweł Fus
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var extend = U.extend;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * The QuadTree node class. Used in Networkgraph chart as a base for Barnes-Hut
         * approximation.
         *
         * @private
         * @class
         * @name Highcharts.QuadTreeNode
         *
         * @param {Highcharts.Dictionary<number>} box Available space for the node
         */
        var QuadTreeNode = H.QuadTreeNode = function (box) {
            /**
             * Read only. The available space for node.
             *
             * @name Highcharts.QuadTreeNode#box
             * @type {Highcharts.Dictionary<number>}
             */
            this.box = box;
            /**
             * Read only. The minium of width and height values.
             *
             * @name Highcharts.QuadTreeNode#boxSize
             * @type {number}
             */
            this.boxSize = Math.min(box.width, box.height);
            /**
             * Read only. Array of subnodes. Empty if QuadTreeNode has just one Point.
             * When added another Point to this QuadTreeNode, array is filled with four
             * subnodes.
             *
             * @name Highcharts.QuadTreeNode#nodes
             * @type {Array<Highcharts.QuadTreeNode>}
             */
            this.nodes = [];
            /**
             * Read only. Flag to determine if QuadTreeNode is internal (and has
             * subnodes with mass and central position) or external (bound to Point).
             *
             * @name Highcharts.QuadTreeNode#isInternal
             * @type {boolean}
             */
            this.isInternal = false;
            /**
             * Read only. If QuadTreeNode is an external node, Point is stored in
             * `this.body`.
             *
             * @name Highcharts.QuadTreeNode#body
             * @type {boolean|Highcharts.Point}
             */
            this.body = false;
            /**
             * Read only. Internal nodes when created are empty to reserve the space. If
             * Point is added to this QuadTreeNode, QuadTreeNode is no longer empty.
             *
             * @name Highcharts.QuadTreeNode#isEmpty
             * @type {boolean}
             */
            this.isEmpty = true;
        };
        extend(QuadTreeNode.prototype, 
        /** @lends Highcharts.QuadTreeNode.prototype */
        {
            /**
             * Insert recursively point(node) into the QuadTree. If the given
             * quadrant is already occupied, divide it into smaller quadrants.
             *
             * @param {Highcharts.Point} point
             *        Point/node to be inserted
             * @param {number} depth
             *        Max depth of the QuadTree
             */
            insert: function (point, depth) {
                var newQuadTreeNode;
                if (this.isInternal) {
                    // Internal node:
                    this.nodes[this.getBoxPosition(point)].insert(point, depth - 1);
                }
                else {
                    this.isEmpty = false;
                    if (!this.body) {
                        // First body in a quadrant:
                        this.isInternal = false;
                        this.body = point;
                    }
                    else {
                        if (depth) {
                            // Every other body in a quadrant:
                            this.isInternal = true;
                            this.divideBox();
                            // Reinsert main body only once:
                            if (this.body !== true) {
                                this.nodes[this.getBoxPosition(this.body)]
                                    .insert(this.body, depth - 1);
                                this.body = true;
                            }
                            // Add second body:
                            this.nodes[this.getBoxPosition(point)]
                                .insert(point, depth - 1);
                        }
                        else {
                            // We are below max allowed depth. That means either:
                            // - really huge number of points
                            // - falling two points into exactly the same position
                            // In this case, create another node in the QuadTree.
                            //
                            // Alternatively we could add some noise to the
                            // position, but that could result in different
                            // rendered chart in exporting.
                            newQuadTreeNode = new QuadTreeNode({
                                top: point.plotX,
                                left: point.plotY,
                                // Width/height below 1px
                                width: 0.1,
                                height: 0.1
                            });
                            newQuadTreeNode.body = point;
                            newQuadTreeNode.isInternal = false;
                            this.nodes.push(newQuadTreeNode);
                        }
                    }
                }
            },
            /**
             * Each quad node requires it's mass and center position. That mass and
             * position is used to imitate real node in the layout by approximation.
             */
            updateMassAndCenter: function () {
                var mass = 0, plotX = 0, plotY = 0;
                if (this.isInternal) {
                    // Calcualte weightened mass of the quad node:
                    this.nodes.forEach(function (pointMass) {
                        if (!pointMass.isEmpty) {
                            mass += pointMass.mass;
                            plotX +=
                                pointMass.plotX * pointMass.mass;
                            plotY +=
                                pointMass.plotY * pointMass.mass;
                        }
                    });
                    plotX /= mass;
                    plotY /= mass;
                }
                else if (this.body) {
                    // Just one node, use coordinates directly:
                    mass = this.body.mass;
                    plotX = this.body.plotX;
                    plotY = this.body.plotY;
                }
                // Store details:
                this.mass = mass;
                this.plotX = plotX;
                this.plotY = plotY;
            },
            /**
             * When inserting another node into the box, that already hove one node,
             * divide the available space into another four quadrants.
             *
             * Indexes of quadrants are:
             * ```
             * -------------               -------------
             * |           |               |     |     |
             * |           |               |  0  |  1  |
             * |           |   divide()    |     |     |
             * |     1     | ----------->  -------------
             * |           |               |     |     |
             * |           |               |  3  |  2  |
             * |           |               |     |     |
             * -------------               -------------
             * ```
             */
            divideBox: function () {
                var halfWidth = this.box.width / 2, halfHeight = this.box.height / 2;
                // Top left
                this.nodes[0] = new QuadTreeNode({
                    left: this.box.left,
                    top: this.box.top,
                    width: halfWidth,
                    height: halfHeight
                });
                // Top right
                this.nodes[1] = new QuadTreeNode({
                    left: this.box.left + halfWidth,
                    top: this.box.top,
                    width: halfWidth,
                    height: halfHeight
                });
                // Bottom right
                this.nodes[2] = new QuadTreeNode({
                    left: this.box.left + halfWidth,
                    top: this.box.top + halfHeight,
                    width: halfWidth,
                    height: halfHeight
                });
                // Bottom left
                this.nodes[3] = new QuadTreeNode({
                    left: this.box.left,
                    top: this.box.top + halfHeight,
                    width: halfWidth,
                    height: halfHeight
                });
            },
            /**
             * Determine which of the quadrants should be used when placing node in
             * the QuadTree. Returned index is always in range `< 0 , 3 >`.
             *
             * @param {Highcharts.Point} point
             * @return {number}
             */
            getBoxPosition: function (point) {
                var left = point.plotX < this.box.left + this.box.width / 2, top = point.plotY < this.box.top + this.box.height / 2, index;
                if (left) {
                    if (top) {
                        // Top left
                        index = 0;
                    }
                    else {
                        // Bottom left
                        index = 3;
                    }
                }
                else {
                    if (top) {
                        // Top right
                        index = 1;
                    }
                    else {
                        // Bottom right
                        index = 2;
                    }
                }
                return index;
            }
        });
        /**
         * The QuadTree class. Used in Networkgraph chart as a base for Barnes-Hut
         * approximation.
         *
         * @private
         * @class
         * @name Highcharts.QuadTree
         *
         * @param {number} x left position of the plotting area
         * @param {number} y top position of the plotting area
         * @param {number} width width of the plotting area
         * @param {number} height height of the plotting area
         */
        var QuadTree = H.QuadTree = function (x, y, width, height) {
            // Boundary rectangle:
            this.box = {
                left: x,
                top: y,
                width: width,
                height: height
            };
            this.maxDepth = 25;
            this.root = new QuadTreeNode(this.box, '0');
            this.root.isInternal = true;
            this.root.isRoot = true;
            this.root.divideBox();
        };
        extend(QuadTree.prototype, 
        /** @lends Highcharts.QuadTree.prototype */
        {
            /**
             * Insert nodes into the QuadTree
             *
             * @param {Array<Highcharts.Point>} points
             */
            insertNodes: function (points) {
                points.forEach(function (point) {
                    this.root.insert(point, this.maxDepth);
                }, this);
            },
            /**
             * Depfth first treversal (DFS). Using `before` and `after` callbacks,
             * we can get two results: preorder and postorder traversals, reminder:
             *
             * ```
             *     (a)
             *     / \
             *   (b) (c)
             *   / \
             * (d) (e)
             * ```
             *
             * DFS (preorder): `a -> b -> d -> e -> c`
             *
             * DFS (postorder): `d -> e -> b -> c -> a`
             *
             * @param {Highcharts.QuadTreeNode|null} node
             * @param {Function} [beforeCallback] function to be called before
             *                      visiting children nodes
             * @param {Function} [afterCallback] function to be called after
             *                      visiting children nodes
             */
            visitNodeRecursive: function (node, beforeCallback, afterCallback) {
                var goFurther;
                if (!node) {
                    node = this.root;
                }
                if (node === this.root && beforeCallback) {
                    goFurther = beforeCallback(node);
                }
                if (goFurther === false) {
                    return;
                }
                node.nodes.forEach(function (qtNode) {
                    if (qtNode.isInternal) {
                        if (beforeCallback) {
                            goFurther = beforeCallback(qtNode);
                        }
                        if (goFurther === false) {
                            return;
                        }
                        this.visitNodeRecursive(qtNode, beforeCallback, afterCallback);
                    }
                    else if (qtNode.body) {
                        if (beforeCallback) {
                            beforeCallback(qtNode.body);
                        }
                    }
                    if (afterCallback) {
                        afterCallback(qtNode);
                    }
                }, this);
                if (node === this.root && afterCallback) {
                    afterCallback(node);
                }
            },
            /**
             * Calculate mass of the each QuadNode in the tree.
             */
            calculateMassAndCenter: function () {
                this.visitNodeRecursive(null, null, function (node) {
                    node.updateMassAndCenter();
                });
            }
        });

    });
    _registerModule(_modules, 'modules/networkgraph/layouts.js', [_modules['parts/Chart.js'], _modules['parts/Globals.js'], _modules['parts/Utilities.js']], function (Chart, H, U) {
        /* *
         *
         *  Networkgraph series
         *
         *  (c) 2010-2020 Paweł Fus
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var addEvent = U.addEvent, clamp = U.clamp, defined = U.defined, extend = U.extend, isFunction = U.isFunction, pick = U.pick, setAnimation = U.setAnimation;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        H.layouts = {
            'reingold-fruchterman': function () {
            }
        };
        extend(
        /**
         * Reingold-Fruchterman algorithm from
         * "Graph Drawing by Force-directed Placement" paper.
         * @private
         */
        H.layouts['reingold-fruchterman'].prototype, {
            init: function (options) {
                this.options = options;
                this.nodes = [];
                this.links = [];
                this.series = [];
                this.box = {
                    x: 0,
                    y: 0,
                    width: 0,
                    height: 0
                };
                this.setInitialRendering(true);
                this.integration =
                    H.networkgraphIntegrations[options.integration];
                this.enableSimulation = options.enableSimulation;
                this.attractiveForce = pick(options.attractiveForce, this.integration.attractiveForceFunction);
                this.repulsiveForce = pick(options.repulsiveForce, this.integration.repulsiveForceFunction);
                this.approximation = options.approximation;
            },
            updateSimulation: function (enable) {
                this.enableSimulation = pick(enable, this.options.enableSimulation);
            },
            start: function () {
                var layout = this, series = this.series, options = this.options;
                layout.currentStep = 0;
                layout.forces = series[0] && series[0].forces || [];
                layout.chart = series[0] && series[0].chart;
                if (layout.initialRendering) {
                    layout.initPositions();
                    // Render elements in initial positions:
                    series.forEach(function (s) {
                        s.finishedAnimating = true; // #13169
                        s.render();
                    });
                }
                layout.setK();
                layout.resetSimulation(options);
                if (layout.enableSimulation) {
                    layout.step();
                }
            },
            step: function () {
                var layout = this, series = this.series, options = this.options;
                // Algorithm:
                layout.currentStep++;
                if (layout.approximation === 'barnes-hut') {
                    layout.createQuadTree();
                    layout.quadTree.calculateMassAndCenter();
                }
                layout.forces.forEach(function (forceName) {
                    layout[forceName + 'Forces'](layout.temperature);
                });
                // Limit to the plotting area and cool down:
                layout.applyLimits(layout.temperature);
                // Cool down the system:
                layout.temperature = layout.coolDown(layout.startTemperature, layout.diffTemperature, layout.currentStep);
                layout.prevSystemTemperature = layout.systemTemperature;
                layout.systemTemperature = layout.getSystemTemperature();
                if (layout.enableSimulation) {
                    series.forEach(function (s) {
                        // Chart could be destroyed during the simulation
                        if (s.chart) {
                            s.render();
                        }
                    });
                    if (layout.maxIterations-- &&
                        isFinite(layout.temperature) &&
                        !layout.isStable()) {
                        if (layout.simulation) {
                            H.win.cancelAnimationFrame(layout.simulation);
                        }
                        layout.simulation = H.win.requestAnimationFrame(function () {
                            layout.step();
                        });
                    }
                    else {
                        layout.simulation = false;
                    }
                }
            },
            stop: function () {
                if (this.simulation) {
                    H.win.cancelAnimationFrame(this.simulation);
                }
            },
            setArea: function (x, y, w, h) {
                this.box = {
                    left: x,
                    top: y,
                    width: w,
                    height: h
                };
            },
            setK: function () {
                // Optimal distance between nodes,
                // available space around the node:
                this.k = this.options.linkLength || this.integration.getK(this);
            },
            addElementsToCollection: function (elements, collection) {
                elements.forEach(function (elem) {
                    if (collection.indexOf(elem) === -1) {
                        collection.push(elem);
                    }
                });
            },
            removeElementFromCollection: function (element, collection) {
                var index = collection.indexOf(element);
                if (index !== -1) {
                    collection.splice(index, 1);
                }
            },
            clear: function () {
                this.nodes.length = 0;
                this.links.length = 0;
                this.series.length = 0;
                this.resetSimulation();
            },
            resetSimulation: function () {
                this.forcedStop = false;
                this.systemTemperature = 0;
                this.setMaxIterations();
                this.setTemperature();
                this.setDiffTemperature();
            },
            restartSimulation: function () {
                if (!this.simulation) {
                    // When dragging nodes, we don't need to calculate
                    // initial positions and rendering nodes:
                    this.setInitialRendering(false);
                    // Start new simulation:
                    if (!this.enableSimulation) {
                        // Run only one iteration to speed things up:
                        this.setMaxIterations(1);
                    }
                    else {
                        this.start();
                    }
                    if (this.chart) {
                        this.chart.redraw();
                    }
                    // Restore defaults:
                    this.setInitialRendering(true);
                }
                else {
                    // Extend current simulation:
                    this.resetSimulation();
                }
            },
            setMaxIterations: function (maxIterations) {
                this.maxIterations = pick(maxIterations, this.options.maxIterations);
            },
            setTemperature: function () {
                this.temperature = this.startTemperature =
                    Math.sqrt(this.nodes.length);
            },
            setDiffTemperature: function () {
                this.diffTemperature = this.startTemperature /
                    (this.options.maxIterations + 1);
            },
            setInitialRendering: function (enable) {
                this.initialRendering = enable;
            },
            createQuadTree: function () {
                this.quadTree = new H.QuadTree(this.box.left, this.box.top, this.box.width, this.box.height);
                this.quadTree.insertNodes(this.nodes);
            },
            initPositions: function () {
                var initialPositions = this.options.initialPositions;
                if (isFunction(initialPositions)) {
                    initialPositions.call(this);
                    this.nodes.forEach(function (node) {
                        if (!defined(node.prevX)) {
                            node.prevX = node.plotX;
                        }
                        if (!defined(node.prevY)) {
                            node.prevY = node.plotY;
                        }
                        node.dispX = 0;
                        node.dispY = 0;
                    });
                }
                else if (initialPositions === 'circle') {
                    this.setCircularPositions();
                }
                else {
                    this.setRandomPositions();
                }
            },
            setCircularPositions: function () {
                var box = this.box, nodes = this.nodes, nodesLength = nodes.length + 1, angle = 2 * Math.PI / nodesLength, rootNodes = nodes.filter(function (node) {
                    return node.linksTo.length === 0;
                }), sortedNodes = [], visitedNodes = {}, radius = this.options.initialPositionRadius;
                /**
                 * @private
                 */
                function addToNodes(node) {
                    node.linksFrom.forEach(function (link) {
                        if (!visitedNodes[link.toNode.id]) {
                            visitedNodes[link.toNode.id] = true;
                            sortedNodes.push(link.toNode);
                            addToNodes(link.toNode);
                        }
                    });
                }
                // Start with identified root nodes an sort the nodes by their
                // hierarchy. In trees, this ensures that branches don't cross
                // eachother.
                rootNodes.forEach(function (rootNode) {
                    sortedNodes.push(rootNode);
                    addToNodes(rootNode);
                });
                // Cyclic tree, no root node found
                if (!sortedNodes.length) {
                    sortedNodes = nodes;
                    // Dangling, cyclic trees
                }
                else {
                    nodes.forEach(function (node) {
                        if (sortedNodes.indexOf(node) === -1) {
                            sortedNodes.push(node);
                        }
                    });
                }
                // Initial positions are laid out along a small circle, appearing
                // as a cluster in the middle
                sortedNodes.forEach(function (node, index) {
                    node.plotX = node.prevX = pick(node.plotX, box.width / 2 + radius * Math.cos(index * angle));
                    node.plotY = node.prevY = pick(node.plotY, box.height / 2 + radius * Math.sin(index * angle));
                    node.dispX = 0;
                    node.dispY = 0;
                });
            },
            setRandomPositions: function () {
                var box = this.box, nodes = this.nodes, nodesLength = nodes.length + 1;
                /**
                 * Return a repeatable, quasi-random number based on an integer
                 * input. For the initial positions
                 * @private
                 */
                function unrandom(n) {
                    var rand = n * n / Math.PI;
                    rand = rand - Math.floor(rand);
                    return rand;
                }
                // Initial positions:
                nodes.forEach(function (node, index) {
                    node.plotX = node.prevX = pick(node.plotX, box.width * unrandom(index));
                    node.plotY = node.prevY = pick(node.plotY, box.height * unrandom(nodesLength + index));
                    node.dispX = 0;
                    node.dispY = 0;
                });
            },
            force: function (name) {
                this.integration[name].apply(this, Array.prototype.slice.call(arguments, 1));
            },
            barycenterForces: function () {
                this.getBarycenter();
                this.force('barycenter');
            },
            getBarycenter: function () {
                var systemMass = 0, cx = 0, cy = 0;
                this.nodes.forEach(function (node) {
                    cx += node.plotX * node.mass;
                    cy += node.plotY * node.mass;
                    systemMass += node.mass;
                });
                this.barycenter = {
                    x: cx,
                    y: cy,
                    xFactor: cx / systemMass,
                    yFactor: cy / systemMass
                };
                return this.barycenter;
            },
            barnesHutApproximation: function (node, quadNode) {
                var layout = this, distanceXY = layout.getDistXY(node, quadNode), distanceR = layout.vectorLength(distanceXY), goDeeper, force;
                if (node !== quadNode && distanceR !== 0) {
                    if (quadNode.isInternal) {
                        // Internal node:
                        if (quadNode.boxSize / distanceR <
                            layout.options.theta &&
                            distanceR !== 0) {
                            // Treat as an external node:
                            force = layout.repulsiveForce(distanceR, layout.k);
                            layout.force('repulsive', node, force * quadNode.mass, distanceXY, distanceR);
                            goDeeper = false;
                        }
                        else {
                            // Go deeper:
                            goDeeper = true;
                        }
                    }
                    else {
                        // External node, direct force:
                        force = layout.repulsiveForce(distanceR, layout.k);
                        layout.force('repulsive', node, force * quadNode.mass, distanceXY, distanceR);
                    }
                }
                return goDeeper;
            },
            repulsiveForces: function () {
                var layout = this;
                if (layout.approximation === 'barnes-hut') {
                    layout.nodes.forEach(function (node) {
                        layout.quadTree.visitNodeRecursive(null, function (quadNode) {
                            return layout.barnesHutApproximation(node, quadNode);
                        });
                    });
                }
                else {
                    layout.nodes.forEach(function (node) {
                        layout.nodes.forEach(function (repNode) {
                            var force, distanceR, distanceXY;
                            if (
                            // Node can not repulse itself:
                            node !== repNode &&
                                // Only close nodes affect each other:
                                // layout.getDistR(node, repNode) < 2 * k &&
                                // Not dragged:
                                !node.fixedPosition) {
                                distanceXY = layout.getDistXY(node, repNode);
                                distanceR = layout.vectorLength(distanceXY);
                                if (distanceR !== 0) {
                                    force = layout.repulsiveForce(distanceR, layout.k);
                                    layout.force('repulsive', node, force * repNode.mass, distanceXY, distanceR);
                                }
                            }
                        });
                    });
                }
            },
            attractiveForces: function () {
                var layout = this, distanceXY, distanceR, force;
                layout.links.forEach(function (link) {
                    if (link.fromNode && link.toNode) {
                        distanceXY = layout.getDistXY(link.fromNode, link.toNode);
                        distanceR = layout.vectorLength(distanceXY);
                        if (distanceR !== 0) {
                            force = layout.attractiveForce(distanceR, layout.k);
                            layout.force('attractive', link, force, distanceXY, distanceR);
                        }
                    }
                });
            },
            applyLimits: function () {
                var layout = this, nodes = layout.nodes;
                nodes.forEach(function (node) {
                    if (node.fixedPosition) {
                        return;
                    }
                    layout.integration.integrate(layout, node);
                    layout.applyLimitBox(node, layout.box);
                    // Reset displacement:
                    node.dispX = 0;
                    node.dispY = 0;
                });
            },
            /**
             * External box that nodes should fall. When hitting an edge, node
             * should stop or bounce.
             * @private
             */
            applyLimitBox: function (node, box) {
                var radius = node.radius;
                /*
                TO DO: Consider elastic collision instead of stopping.
                o' means end position when hitting plotting area edge:

                - "inelastic":
                o
                 \
                ______
                |  o'
                |   \
                |    \

                - "elastic"/"bounced":
                o
                 \
                ______
                |  ^
                | / \
                |o'  \

                Euler sample:
                if (plotX < 0) {
                    plotX = 0;
                    dispX *= -1;
                }

                if (plotX > box.width) {
                    plotX = box.width;
                    dispX *= -1;
                }

                */
                // Limit X-coordinates:
                node.plotX = clamp(node.plotX, box.left + radius, box.width - radius);
                // Limit Y-coordinates:
                node.plotY = clamp(node.plotY, box.top + radius, box.height - radius);
            },
            /**
             * From "A comparison of simulated annealing cooling strategies" by
             * Nourani and Andresen work.
             * @private
             */
            coolDown: function (temperature, temperatureStep, currentStep) {
                // Logarithmic:
                /*
                return Math.sqrt(this.nodes.length) -
                    Math.log(
                        currentStep * layout.diffTemperature
                    );
                */
                // Exponential:
                /*
                var alpha = 0.1;
                layout.temperature = Math.sqrt(layout.nodes.length) *
                    Math.pow(alpha, layout.diffTemperature);
                */
                // Linear:
                return temperature - temperatureStep * currentStep;
            },
            isStable: function () {
                return Math.abs(this.systemTemperature -
                    this.prevSystemTemperature) < 0.00001 || this.temperature <= 0;
            },
            getSystemTemperature: function () {
                return this.nodes.reduce(function (value, node) {
                    return value + node.temperature;
                }, 0);
            },
            vectorLength: function (vector) {
                return Math.sqrt(vector.x * vector.x + vector.y * vector.y);
            },
            getDistR: function (nodeA, nodeB) {
                var distance = this.getDistXY(nodeA, nodeB);
                return this.vectorLength(distance);
            },
            getDistXY: function (nodeA, nodeB) {
                var xDist = nodeA.plotX - nodeB.plotX, yDist = nodeA.plotY - nodeB.plotY;
                return {
                    x: xDist,
                    y: yDist,
                    absX: Math.abs(xDist),
                    absY: Math.abs(yDist)
                };
            }
        });
        /* ************************************************************************** *
         * Multiple series support:
         * ************************************************************************** */
        // Clear previous layouts
        addEvent(Chart, 'predraw', function () {
            if (this.graphLayoutsLookup) {
                this.graphLayoutsLookup.forEach(function (layout) {
                    layout.stop();
                });
            }
        });
        addEvent(Chart, 'render', function () {
            var systemsStable, afterRender = false;
            /**
             * @private
             */
            function layoutStep(layout) {
                if (layout.maxIterations-- &&
                    isFinite(layout.temperature) &&
                    !layout.isStable() &&
                    !layout.enableSimulation) {
                    // Hook similar to build-in addEvent, but instead of
                    // creating whole events logic, use just a function.
                    // It's faster which is important for rAF code.
                    // Used e.g. in packed-bubble series for bubble radius
                    // calculations
                    if (layout.beforeStep) {
                        layout.beforeStep();
                    }
                    layout.step();
                    systemsStable = false;
                    afterRender = true;
                }
            }
            if (this.graphLayoutsLookup) {
                setAnimation(false, this);
                // Start simulation
                this.graphLayoutsLookup.forEach(function (layout) {
                    layout.start();
                });
                // Just one sync step, to run different layouts similar to
                // async mode.
                while (!systemsStable) {
                    systemsStable = true;
                    this.graphLayoutsLookup.forEach(layoutStep);
                }
                if (afterRender) {
                    this.series.forEach(function (s) {
                        if (s && s.layout) {
                            s.render();
                        }
                    });
                }
            }
        });
        // disable simulation before print if enabled
        addEvent(Chart, 'beforePrint', function () {
            if (this.graphLayoutsLookup) {
                this.graphLayoutsLookup.forEach(function (layout) {
                    layout.updateSimulation(false);
                });
                this.redraw();
            }
        });
        // re-enable simulation after print
        addEvent(Chart, 'afterPrint', function () {
            if (this.graphLayoutsLookup) {
                this.graphLayoutsLookup.forEach(function (layout) {
                    // return to default simulation
                    layout.updateSimulation();
                });
            }
            this.redraw();
        });

    });
    _registerModule(_modules, 'modules/networkgraph/draggable-nodes.js', [_modules['parts/Chart.js'], _modules['parts/Globals.js'], _modules['parts/Utilities.js']], function (Chart, H, U) {
        /* *
         *
         *  Networkgraph series
         *
         *  (c) 2010-2020 Paweł Fus
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var addEvent = U.addEvent;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        H.dragNodesMixin = {
            /**
             * Mouse down action, initializing drag&drop mode.
             *
             * @private
             * @param {Highcharts.Point} point The point that event occured.
             * @param {Highcharts.PointerEventObject} event Browser event, before normalization.
             * @return {void}
             */
            onMouseDown: function (point, event) {
                var normalizedEvent = this.chart.pointer.normalize(event);
                point.fixedPosition = {
                    chartX: normalizedEvent.chartX,
                    chartY: normalizedEvent.chartY,
                    plotX: point.plotX,
                    plotY: point.plotY
                };
                point.inDragMode = true;
            },
            /**
             * Mouse move action during drag&drop.
             *
             * @private
             *
             * @param {global.Event} event Browser event, before normalization.
             * @param {Highcharts.Point} point The point that event occured.
             *
             * @return {void}
             */
            onMouseMove: function (point, event) {
                if (point.fixedPosition && point.inDragMode) {
                    var series = this, chart = series.chart, normalizedEvent = chart.pointer.normalize(event), diffX = point.fixedPosition.chartX - normalizedEvent.chartX, diffY = point.fixedPosition.chartY - normalizedEvent.chartY, newPlotX, newPlotY, graphLayoutsLookup = chart.graphLayoutsLookup;
                    // At least 5px to apply change (avoids simple click):
                    if (Math.abs(diffX) > 5 || Math.abs(diffY) > 5) {
                        newPlotX = point.fixedPosition.plotX - diffX;
                        newPlotY = point.fixedPosition.plotY - diffY;
                        if (chart.isInsidePlot(newPlotX, newPlotY)) {
                            point.plotX = newPlotX;
                            point.plotY = newPlotY;
                            point.hasDragged = true;
                            this.redrawHalo(point);
                            graphLayoutsLookup.forEach(function (layout) {
                                layout.restartSimulation();
                            });
                        }
                    }
                }
            },
            /**
             * Mouse up action, finalizing drag&drop.
             *
             * @private
             * @param {Highcharts.Point} point The point that event occured.
             * @return {void}
             */
            onMouseUp: function (point, event) {
                if (point.fixedPosition && point.hasDragged) {
                    if (this.layout.enableSimulation) {
                        this.layout.start();
                    }
                    else {
                        this.chart.redraw();
                    }
                    point.inDragMode = point.hasDragged = false;
                    if (!this.options.fixedDraggable) {
                        delete point.fixedPosition;
                    }
                }
            },
            // Draggable mode:
            /**
             * Redraw halo on mousemove during the drag&drop action.
             *
             * @private
             * @param {Highcharts.Point} point The point that should show halo.
             * @return {void}
             */
            redrawHalo: function (point) {
                if (point && this.halo) {
                    this.halo.attr({
                        d: point.haloPath(this.options.states.hover.halo.size)
                    });
                }
            }
        };
        /*
         * Draggable mode:
         */
        addEvent(Chart, 'load', function () {
            var chart = this, mousedownUnbinder, mousemoveUnbinder, mouseupUnbinder;
            if (chart.container) {
                mousedownUnbinder = addEvent(chart.container, 'mousedown', function (event) {
                    var point = chart.hoverPoint;
                    if (point &&
                        point.series &&
                        point.series.hasDraggableNodes &&
                        point.series.options.draggable) {
                        point.series.onMouseDown(point, event);
                        mousemoveUnbinder = addEvent(chart.container, 'mousemove', function (e) {
                            return point &&
                                point.series &&
                                point.series.onMouseMove(point, e);
                        });
                        mouseupUnbinder = addEvent(chart.container.ownerDocument, 'mouseup', function (e) {
                            mousemoveUnbinder();
                            mouseupUnbinder();
                            return point &&
                                point.series &&
                                point.series.onMouseUp(point, e);
                        });
                    }
                });
            }
            addEvent(chart, 'destroy', function () {
                mousedownUnbinder();
            });
        });

    });
    _registerModule(_modules, 'parts-more/PackedBubbleSeries.js', [_modules['parts/Chart.js'], _modules['parts/Color.js'], _modules['parts/Globals.js'], _modules['parts/Point.js'], _modules['parts/Utilities.js']], function (Chart, Color, H, Point, U) {
        /* *
         *
         *  (c) 2010-2018 Grzegorz Blachlinski, Sebastian Bochan
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var color = Color.parse;
        var addEvent = U.addEvent, clamp = U.clamp, defined = U.defined, extend = U.extend, extendClass = U.extendClass, fireEvent = U.fireEvent, isArray = U.isArray, isNumber = U.isNumber, merge = U.merge, pick = U.pick, seriesType = U.seriesType;
        /**
         * Formatter callback function.
         *
         * @callback Highcharts.SeriesPackedBubbleDataLabelsFormatterCallbackFunction
         *
         * @param {Highcharts.SeriesPackedBubbleDataLabelsFormatterContextObject} this
         *        Data label context to format
         *
         * @return {string}
         *         Formatted data label text
         */
        /**
         * Context for the formatter function.
         *
         * @interface Highcharts.SeriesPackedBubbleDataLabelsFormatterContextObject
         * @extends Highcharts.PointLabelObject
         * @since 7.0.0
         */ /**
        * The color of the node.
        * @name Highcharts.SeriesPackedBubbleDataLabelsFormatterContextObject#color
        * @type {Highcharts.ColorString}
        * @since 7.0.0
        */ /**
        * The point (node) object. The node name, if defined, is available through
        * `this.point.name`. Arrays: `this.point.linksFrom` and `this.point.linksTo`
        * contains all nodes connected to this point.
        * @name Highcharts.SeriesPackedBubbleDataLabelsFormatterContextObject#point
        * @type {Highcharts.Point}
        * @since 7.0.0
        */ /**
        * The ID of the node.
        * @name Highcharts.SeriesPackedBubbleDataLabelsFormatterContextObject#key
        * @type {string}
        * @since 7.0.0
        */
        var Series = H.Series, Reingold = H.layouts['reingold-fruchterman'], NetworkPoint = H.seriesTypes.bubble.prototype.pointClass, dragNodesMixin = H.dragNodesMixin;
        Chart.prototype.getSelectedParentNodes = function () {
            var chart = this, series = chart.series, selectedParentsNodes = [];
            series.forEach(function (series) {
                if (series.parentNode && series.parentNode.selected) {
                    selectedParentsNodes.push(series.parentNode);
                }
            });
            return selectedParentsNodes;
        };
        H.networkgraphIntegrations.packedbubble = {
            repulsiveForceFunction: function (d, k, node, repNode) {
                return Math.min(d, (node.marker.radius + repNode.marker.radius) / 2);
            },
            barycenter: function () {
                var layout = this, gravitationalConstant = layout.options.gravitationalConstant, box = layout.box, nodes = layout.nodes, centerX, centerY;
                nodes.forEach(function (node) {
                    if (layout.options.splitSeries && !node.isParentNode) {
                        centerX = node.series.parentNode.plotX;
                        centerY = node.series.parentNode.plotY;
                    }
                    else {
                        centerX = box.width / 2;
                        centerY = box.height / 2;
                    }
                    if (!node.fixedPosition) {
                        node.plotX -=
                            (node.plotX - centerX) *
                                gravitationalConstant /
                                (node.mass * Math.sqrt(nodes.length));
                        node.plotY -=
                            (node.plotY - centerY) *
                                gravitationalConstant /
                                (node.mass * Math.sqrt(nodes.length));
                    }
                });
            },
            repulsive: function (node, force, distanceXY, repNode) {
                var factor = (force * this.diffTemperature / node.mass /
                    node.degree), x = distanceXY.x * factor, y = distanceXY.y * factor;
                if (!node.fixedPosition) {
                    node.plotX += x;
                    node.plotY += y;
                }
                if (!repNode.fixedPosition) {
                    repNode.plotX -= x;
                    repNode.plotY -= y;
                }
            },
            integrate: H.networkgraphIntegrations.verlet.integrate,
            getK: H.noop
        };
        H.layouts.packedbubble = extendClass(Reingold, {
            beforeStep: function () {
                if (this.options.marker) {
                    this.series.forEach(function (series) {
                        if (series) {
                            series.calculateParentRadius();
                        }
                    });
                }
            },
            setCircularPositions: function () {
                var layout = this, box = layout.box, nodes = layout.nodes, nodesLength = nodes.length + 1, angle = 2 * Math.PI / nodesLength, centerX, centerY, radius = layout.options.initialPositionRadius;
                nodes.forEach(function (node, index) {
                    if (layout.options.splitSeries &&
                        !node.isParentNode) {
                        centerX = node.series.parentNode.plotX;
                        centerY = node.series.parentNode.plotY;
                    }
                    else {
                        centerX = box.width / 2;
                        centerY = box.height / 2;
                    }
                    node.plotX = node.prevX = pick(node.plotX, centerX +
                        radius * Math.cos(node.index || index * angle));
                    node.plotY = node.prevY = pick(node.plotY, centerY +
                        radius * Math.sin(node.index || index * angle));
                    node.dispX = 0;
                    node.dispY = 0;
                });
            },
            repulsiveForces: function () {
                var layout = this, force, distanceR, distanceXY, bubblePadding = layout.options.bubblePadding;
                layout.nodes.forEach(function (node) {
                    node.degree = node.mass;
                    node.neighbours = 0;
                    layout.nodes.forEach(function (repNode) {
                        force = 0;
                        if (
                        // Node can not repulse itself:
                        node !== repNode &&
                            // Only close nodes affect each other:
                            // Not dragged:
                            !node.fixedPosition &&
                            (layout.options.seriesInteraction ||
                                node.series === repNode.series)) {
                            distanceXY = layout.getDistXY(node, repNode);
                            distanceR = (layout.vectorLength(distanceXY) -
                                (node.marker.radius +
                                    repNode.marker.radius +
                                    bubblePadding));
                            // TODO padding configurable
                            if (distanceR < 0) {
                                node.degree += 0.01;
                                node.neighbours++;
                                force = layout.repulsiveForce(-distanceR / Math.sqrt(node.neighbours), layout.k, node, repNode);
                            }
                            layout.force('repulsive', node, force * repNode.mass, distanceXY, repNode, distanceR);
                        }
                    });
                });
            },
            applyLimitBox: function (node) {
                var layout = this, distanceXY, distanceR, factor = 0.01;
                // parentNodeLimit should be used together
                // with seriesInteraction: false
                if (layout.options.splitSeries &&
                    !node.isParentNode &&
                    layout.options.parentNodeLimit) {
                    distanceXY = layout.getDistXY(node, node.series.parentNode);
                    distanceR = (node.series.parentNodeRadius -
                        node.marker.radius -
                        layout.vectorLength(distanceXY));
                    if (distanceR < 0 &&
                        distanceR > -2 * node.marker.radius) {
                        node.plotX -= distanceXY.x * factor;
                        node.plotY -= distanceXY.y * factor;
                    }
                }
                Reingold.prototype.applyLimitBox.apply(this, arguments);
            }
        });
        /**
         * @private
         * @class
         * @name Highcharts.seriesTypes.packedbubble
         *
         * @extends Highcharts.Series
         */
        seriesType('packedbubble', 'bubble', 
        /**
         * A packed bubble series is a two dimensional series type, where each point
         * renders a value in X, Y position. Each point is drawn as a bubble
         * where the bubbles don't overlap with each other and the radius
         * of the bubble relates to the value.
         *
         * @sample highcharts/demo/packed-bubble/
         *         Packed bubble chart
         * @sample highcharts/demo/packed-bubble-split/
         *         Split packed bubble chart

         * @extends      plotOptions.bubble
         * @excluding    connectEnds, connectNulls, dragDrop, jitter, keys,
         *               pointPlacement, sizeByAbsoluteValue, step, xAxis, yAxis,
         *               zMax, zMin, dataSorting
         * @product      highcharts
         * @since        7.0.0
         * @requires     highcharts-more
         * @optionparent plotOptions.packedbubble
         */
        {
            /**
             * Minimum bubble size. Bubbles will automatically size between the
             * `minSize` and `maxSize` to reflect the value of each bubble.
             * Can be either pixels (when no unit is given), or a percentage of
             * the smallest one of the plot width and height, divided by the square
             * root of total number of points.
             *
             * @sample highcharts/plotoptions/bubble-size/
             *         Bubble size
             *
             * @type {number|string}
             *
             * @private
             */
            minSize: '10%',
            /**
             * Maximum bubble size. Bubbles will automatically size between the
             * `minSize` and `maxSize` to reflect the value of each bubble.
             * Can be either pixels (when no unit is given), or a percentage of
             * the smallest one of the plot width and height, divided by the square
             * root of total number of points.
             *
             * @sample highcharts/plotoptions/bubble-size/
             *         Bubble size
             *
             * @type {number|string}
             *
             * @private
             */
            maxSize: '50%',
            sizeBy: 'area',
            zoneAxis: 'y',
            crisp: false,
            tooltip: {
                pointFormat: 'Value: {point.value}'
            },
            /**
             * Flag to determine if nodes are draggable or not. Available for
             * graph with useSimulation set to true only.
             *
             * @since 7.1.0
             *
             * @private
             */
            draggable: true,
            /**
             * An option is giving a possibility to choose between using simulation
             * for calculating bubble positions. These reflects in both animation
             * and final position of bubbles. Simulation is also adding options to
             * the series graph based on used layout. In case of big data sets, with
             * any performance issues, it is possible to disable animation and pack
             * bubble in a simple circular way.
             *
             * @sample highcharts/series-packedbubble/spiral/
             *         useSimulation set to false
             *
             * @since 7.1.0
             *
             * @private
             */
            useSimulation: true,
            /**
             * Series options for parent nodes.
             *
             * @since 8.1.1
             *
             * @private
             */
            parentNode: {
                /**
                 * Allow this series' parent nodes to be selected
                 * by clicking on the graph.
                 *
                 * @since 8.1.1
                 */
                allowPointSelect: false
            },
            /**
            /**
             *
             * @declare Highcharts.SeriesPackedBubbleDataLabelsOptionsObject
             *
             * @private
             */
            dataLabels: {
                /**
                 * The
                 * [format string](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting)
                 * specifying what to show for _node_ in the networkgraph. In v7.0
                 * defaults to `{key}`, since v7.1 defaults to `undefined` and
                 * `formatter` is used instead.
                 *
                 * @type      {string}
                 * @since     7.0.0
                 * @apioption plotOptions.packedbubble.dataLabels.format
                 */
                // eslint-disable-next-line valid-jsdoc
                /**
                 * Callback JavaScript function to format the data label for a node.
                 * Note that if a `format` is defined, the format takes precedence
                 * and the formatter is ignored.
                 *
                 * @type  {Highcharts.SeriesPackedBubbleDataLabelsFormatterCallbackFunction}
                 * @since 7.0.0
                 */
                formatter: function () {
                    return this.point.value;
                },
                /**
                 * @type      {string}
                 * @since     7.1.0
                 * @apioption plotOptions.packedbubble.dataLabels.parentNodeFormat
                 */
                // eslint-disable-next-line valid-jsdoc
                /**
                 * @type  {Highcharts.SeriesPackedBubbleDataLabelsFormatterCallbackFunction}
                 * @since 7.1.0
                 */
                parentNodeFormatter: function () {
                    return this.name;
                },
                /**
                 * @sample {highcharts} highcharts/series-packedbubble/packed-dashboard
                 *         Dashboard with dataLabels on parentNodes
                 *
                 * @declare Highcharts.SeriesPackedBubbleDataLabelsTextPathOptionsObject
                 * @since   7.1.0
                 */
                parentNodeTextPath: {
                    /**
                     * Presentation attributes for the text path.
                     *
                     * @type      {Highcharts.SVGAttributes}
                     * @since     7.1.0
                     * @apioption plotOptions.packedbubble.dataLabels.attributes
                     */
                    /**
                     * Enable or disable `textPath` option for link's or marker's
                     * data labels.
                     *
                     * @since 7.1.0
                     */
                    enabled: true
                },
                /**
                 * Options for a _node_ label text which should follow marker's
                 * shape.
                 *
                 * **Note:** Only SVG-based renderer supports this option.
                 *
                 * @extends   plotOptions.series.dataLabels.textPath
                 * @apioption plotOptions.packedbubble.dataLabels.textPath
                 */
                padding: 0,
                style: {
                    transition: 'opacity 2000ms'
                }
            },
            /**
             * Options for layout algorithm when simulation is enabled. Inside there
             * are options to change the speed, padding, initial bubbles positions
             * and more.
             *
             * @extends   plotOptions.networkgraph.layoutAlgorithm
             * @excluding approximation, attractiveForce, repulsiveForce, theta
             * @since     7.1.0
             *
             * @private
             */
            layoutAlgorithm: {
                /**
                 * Initial layout algorithm for positioning nodes. Can be one of
                 * the built-in options ("circle", "random") or a function where
                 * positions should be set on each node (`this.nodes`) as
                 * `node.plotX` and `node.plotY`.
                 *
                 * @sample highcharts/series-networkgraph/initial-positions/
                 *         Initial positions with callback
                 *
                 * @type {"circle"|"random"|Function}
                 */
                initialPositions: 'circle',
                /**
                 * @sample highcharts/series-packedbubble/initial-radius/
                 *         Initial radius set to 200
                 *
                 * @extends   plotOptions.networkgraph.layoutAlgorithm.initialPositionRadius
                 * @excluding states
                 */
                initialPositionRadius: 20,
                /**
                 * The distance between two bubbles, when the algorithm starts to
                 * treat two bubbles as overlapping. The `bubblePadding` is also the
                 * expected distance between all the bubbles on simulation end.
                 */
                bubblePadding: 5,
                /**
                 * Whether bubbles should interact with their parentNode to keep
                 * them inside.
                 */
                parentNodeLimit: false,
                /**
                 * Whether series should interact with each other or not. When
                 * `parentNodeLimit` is set to true, thi option should be set to
                 * false to avoid sticking points in wrong series parentNode.
                 */
                seriesInteraction: true,
                /**
                 * In case of split series, this option allows user to drag and
                 * drop points between series, for changing point related series.
                 *
                 * @sample highcharts/series-packedbubble/packed-dashboard/
                 *         Example of drag'n drop bubbles for bubble kanban
                 */
                dragBetweenSeries: false,
                /**
                 * Layout algorithm options for parent nodes.
                 *
                 * @extends   plotOptions.networkgraph.layoutAlgorithm
                 * @excluding approximation, attractiveForce, enableSimulation,
                 *            repulsiveForce, theta
                 */
                parentNodeOptions: {
                    maxIterations: 400,
                    gravitationalConstant: 0.03,
                    maxSpeed: 50,
                    initialPositionRadius: 100,
                    seriesInteraction: true,
                    /**
                     * Styling options for parentNodes markers. Similar to
                     * line.marker options.
                     *
                     * @sample highcharts/series-packedbubble/parentnode-style/
                     *         Bubble size
                     *
                     * @extends   plotOptions.series.marker
                     * @excluding states
                     */
                    marker: {
                        fillColor: null,
                        fillOpacity: 1,
                        lineWidth: 1,
                        lineColor: null,
                        symbol: 'circle'
                    }
                },
                enableSimulation: true,
                /**
                 * Type of the algorithm used when positioning bubbles.
                 * @ignore-option
                 */
                type: 'packedbubble',
                /**
                 * Integration type. Integration determines how forces are applied
                 * on particles. The `packedbubble` integration is based on
                 * the networkgraph `verlet` integration, where the new position
                 * is based on a previous position without velocity:
                 * `newPosition += previousPosition - newPosition`.
                 *
                 * @sample highcharts/series-networkgraph/forces/
                 *
                 * @ignore-option
                 */
                integration: 'packedbubble',
                maxIterations: 1000,
                /**
                 * Whether to split series into individual groups or to mix all
                 * series together.
                 *
                 * @since   7.1.0
                 * @default false
                 */
                splitSeries: false,
                /**
                 * Max speed that node can get in one iteration. In terms of
                 * simulation, it's a maximum translation (in pixels) that a node
                 * can move (in both, x and y, dimensions). While `friction` is
                 * applied on all nodes, max speed is applied only for nodes that
                 * move very fast, for example small or disconnected ones.
                 *
                 * @see [layoutAlgorithm.integration](#series.networkgraph.layoutAlgorithm.integration)
                 *
                 * @see [layoutAlgorithm.friction](#series.networkgraph.layoutAlgorithm.friction)
                 */
                maxSpeed: 5,
                gravitationalConstant: 0.01,
                friction: -0.981
            }
        }, {
            /**
             * An internal option used for allowing nodes dragging.
             * @private
             */
            hasDraggableNodes: true,
            /**
             * Array of internal forces. Each force should be later defined in
             * integrations.js.
             * @private
             */
            forces: ['barycenter', 'repulsive'],
            pointArrayMap: ['value'],
            trackerGroups: ['group', 'dataLabelsGroup', 'parentNodesGroup'],
            pointValKey: 'value',
            isCartesian: false,
            requireSorting: false,
            directTouch: true,
            axisTypes: [],
            noSharedTooltip: true,
            // solving #12287
            searchPoint: H.noop,
            /* eslint-disable no-invalid-this, valid-jsdoc */
            /**
             * Create a single array of all points from all series
             * @private
             * @param {Highcharts.Series} series Array of all series objects
             * @return {Array<Highcharts.PackedBubbleData>} Returns the array of all points.
             */
            accumulateAllPoints: function (series) {
                var chart = series.chart, allDataPoints = [], i, j;
                for (i = 0; i < chart.series.length; i++) {
                    series = chart.series[i];
                    if (series.is('packedbubble') && // #13574
                        series.visible ||
                        !chart.options.chart.ignoreHiddenSeries) {
                        // add data to array only if series is visible
                        for (j = 0; j < series.yData.length; j++) {
                            allDataPoints.push([
                                null, null,
                                series.yData[j],
                                series.index,
                                j,
                                {
                                    id: j,
                                    marker: {
                                        radius: 0
                                    }
                                }
                            ]);
                        }
                    }
                }
                return allDataPoints;
            },
            init: function () {
                Series.prototype.init.apply(this, arguments);
                // When one series is modified, the others need to be recomputed
                addEvent(this, 'updatedData', function () {
                    this.chart.series.forEach(function (s) {
                        if (s.type === this.type) {
                            s.isDirty = true;
                        }
                    }, this);
                });
                return this;
            },
            render: function () {
                var series = this, dataLabels = [];
                Series.prototype.render.apply(this, arguments);
                // #10823 - dataLabels should stay visible
                // when enabled allowOverlap.
                if (!series.options.dataLabels.allowOverlap) {
                    series.data.forEach(function (point) {
                        if (isArray(point.dataLabels)) {
                            point.dataLabels.forEach(function (dataLabel) {
                                dataLabels.push(dataLabel);
                            });
                        }
                    });
                    // Only hide overlapping dataLabels for layouts that
                    // use simulation. Spiral packedbubble don't need
                    // additional dataLabel hiding on every simulation step
                    if (series.options.useSimulation) {
                        series.chart.hideOverlappingLabels(dataLabels);
                    }
                }
            },
            // Needed because of z-indexing issue if point is added in series.group
            setVisible: function () {
                var series = this;
                Series.prototype.setVisible.apply(series, arguments);
                if (series.parentNodeLayout && series.graph) {
                    if (series.visible) {
                        series.graph.show();
                        if (series.parentNode.dataLabel) {
                            series.parentNode.dataLabel.show();
                        }
                    }
                    else {
                        series.graph.hide();
                        series.parentNodeLayout
                            .removeElementFromCollection(series.parentNode, series.parentNodeLayout.nodes);
                        if (series.parentNode.dataLabel) {
                            series.parentNode.dataLabel.hide();
                        }
                    }
                }
                else if (series.layout) {
                    if (series.visible) {
                        series.layout.addElementsToCollection(series.points, series.layout.nodes);
                    }
                    else {
                        series.points.forEach(function (node) {
                            series.layout.removeElementFromCollection(node, series.layout.nodes);
                        });
                    }
                }
            },
            // Packedbubble has two separate collecions of nodes if split, render
            // dataLabels for both sets:
            drawDataLabels: function () {
                var textPath = this.options.dataLabels.textPath, points = this.points;
                // Render node labels:
                Series.prototype.drawDataLabels.apply(this, arguments);
                // Render parentNode labels:
                if (this.parentNode) {
                    this.parentNode.formatPrefix = 'parentNode';
                    this.points = [this.parentNode];
                    this.options.dataLabels.textPath =
                        this.options.dataLabels.parentNodeTextPath;
                    Series.prototype.drawDataLabels.apply(this, arguments);
                    // Restore nodes
                    this.points = points;
                    this.options.dataLabels.textPath = textPath;
                }
            },
            /**
             * The function responsible for calculating series bubble' s bBox.
             * Needed because of exporting failure when useSimulation
             * is set to false
             * @private
             */
            seriesBox: function () {
                var series = this, chart = series.chart, data = series.data, max = Math.max, min = Math.min, radius, 
                // bBox = [xMin, xMax, yMin, yMax]
                bBox = [
                    chart.plotLeft,
                    chart.plotLeft + chart.plotWidth,
                    chart.plotTop,
                    chart.plotTop + chart.plotHeight
                ];
                data.forEach(function (p) {
                    if (defined(p.plotX) &&
                        defined(p.plotY) &&
                        p.marker.radius) {
                        radius = p.marker.radius;
                        bBox[0] = min(bBox[0], p.plotX - radius);
                        bBox[1] = max(bBox[1], p.plotX + radius);
                        bBox[2] = min(bBox[2], p.plotY - radius);
                        bBox[3] = max(bBox[3], p.plotY + radius);
                    }
                });
                return isNumber(bBox.width / bBox.height) ?
                    bBox :
                    null;
            },
            /**
             * The function responsible for calculating the parent node radius
             * based on the total surface of iniside-bubbles and the group BBox
             * @private
             */
            calculateParentRadius: function () {
                var series = this, bBox, parentPadding = 20, minParentRadius = 20;
                bBox = series.seriesBox();
                series.parentNodeRadius = clamp(Math.sqrt(2 * series.parentNodeMass / Math.PI) + parentPadding, minParentRadius, bBox ?
                    Math.max(Math.sqrt(Math.pow(bBox.width, 2) +
                        Math.pow(bBox.height, 2)) / 2 + parentPadding, minParentRadius) :
                    Math.sqrt(2 * series.parentNodeMass / Math.PI) + parentPadding);
                if (series.parentNode) {
                    series.parentNode.marker.radius =
                        series.parentNode.radius = series.parentNodeRadius;
                }
            },
            // Create Background/Parent Nodes for split series.
            drawGraph: function () {
                // if the series is not using layout, don't add parent nodes
                if (!this.layout || !this.layout.options.splitSeries) {
                    return;
                }
                var series = this, chart = series.chart, parentAttribs = {}, nodeMarker = this.layout.options.parentNodeOptions.marker, parentOptions = {
                    fill: nodeMarker.fillColor || color(series.color).brighten(0.4).get(),
                    opacity: nodeMarker.fillOpacity,
                    stroke: nodeMarker.lineColor || series.color,
                    'stroke-width': nodeMarker.lineWidth
                }, visibility = series.visible ? 'inherit' : 'hidden';
                // create the group for parent Nodes if doesn't exist
                if (!this.parentNodesGroup) {
                    series.parentNodesGroup = series.plotGroup('parentNodesGroup', 'parentNode', visibility, 0.1, chart.seriesGroup);
                    series.group.attr({
                        zIndex: 2
                    });
                }
                this.calculateParentRadius();
                parentAttribs = merge({
                    x: series.parentNode.plotX -
                        series.parentNodeRadius,
                    y: series.parentNode.plotY -
                        series.parentNodeRadius,
                    width: series.parentNodeRadius * 2,
                    height: series.parentNodeRadius * 2
                }, parentOptions);
                if (!series.parentNode.graphic) {
                    series.graph = series.parentNode.graphic =
                        chart.renderer.symbol(parentOptions.symbol)
                            .add(series.parentNodesGroup);
                }
                series.parentNode.graphic.attr(parentAttribs);
            },
            /**
             * Creating parent nodes for split series, in which all the bubbles
             * are rendered.
             * @private
             */
            createParentNodes: function () {
                var series = this, chart = series.chart, parentNodeLayout = series.parentNodeLayout, nodeAdded, parentNode = series.parentNode, PackedBubblePoint = series.pointClass;
                series.parentNodeMass = 0;
                series.points.forEach(function (p) {
                    series.parentNodeMass +=
                        Math.PI * Math.pow(p.marker.radius, 2);
                });
                series.calculateParentRadius();
                parentNodeLayout.nodes.forEach(function (node) {
                    if (node.seriesIndex === series.index) {
                        nodeAdded = true;
                    }
                });
                parentNodeLayout.setArea(0, 0, chart.plotWidth, chart.plotHeight);
                if (!nodeAdded) {
                    if (!parentNode) {
                        parentNode = (new PackedBubblePoint()).init(this, {
                            mass: series.parentNodeRadius / 2,
                            marker: {
                                radius: series.parentNodeRadius
                            },
                            dataLabels: {
                                inside: false
                            },
                            dataLabelOnNull: true,
                            degree: series.parentNodeRadius,
                            isParentNode: true,
                            seriesIndex: series.index
                        });
                    }
                    if (series.parentNode) {
                        parentNode.plotX = series.parentNode.plotX;
                        parentNode.plotY = series.parentNode.plotY;
                    }
                    series.parentNode = parentNode;
                    parentNodeLayout.addElementsToCollection([series], parentNodeLayout.series);
                    parentNodeLayout.addElementsToCollection([parentNode], parentNodeLayout.nodes);
                }
            },
            drawTracker: function () {
                var series = this, chart = series.chart, pointer = chart.pointer, onMouseOver = function (e) {
                    var point = pointer.getPointFromEvent(e);
                    // undefined on graph in scatterchart
                    if (typeof point !== 'undefined') {
                        pointer.isDirectTouch = true;
                        point.onMouseOver(e);
                    }
                }, parentNode = series.parentNode;
                var dataLabels;
                H.TrackerMixin.drawTrackerPoint.call(this);
                // Add reference to the point
                if (parentNode) {
                    dataLabels = (isArray(parentNode.dataLabels) ?
                        parentNode.dataLabels :
                        (parentNode.dataLabel ? [parentNode.dataLabel] : []));
                    if (parentNode.graphic) {
                        parentNode.graphic.element.point = parentNode;
                    }
                    dataLabels.forEach(function (dataLabel) {
                        if (dataLabel.div) {
                            dataLabel.div.point = parentNode;
                        }
                        else {
                            dataLabel.element.point = parentNode;
                        }
                    });
                }
            },
            /**
             * Function responsible for adding series layout, used for parent nodes.
             * @private
             */
            addSeriesLayout: function () {
                var series = this, layoutOptions = series.options.layoutAlgorithm, graphLayoutsStorage = series.chart.graphLayoutsStorage, graphLayoutsLookup = series.chart.graphLayoutsLookup, parentNodeOptions = merge(layoutOptions, layoutOptions.parentNodeOptions, {
                    enableSimulation: series.layout.options.enableSimulation
                }), parentNodeLayout;
                parentNodeLayout = graphLayoutsStorage[layoutOptions.type + '-series'];
                if (!parentNodeLayout) {
                    graphLayoutsStorage[layoutOptions.type + '-series'] =
                        parentNodeLayout =
                            new H.layouts[layoutOptions.type]();
                    parentNodeLayout.init(parentNodeOptions);
                    graphLayoutsLookup.splice(parentNodeLayout.index, 0, parentNodeLayout);
                }
                series.parentNodeLayout = parentNodeLayout;
                this.createParentNodes();
            },
            /**
             * Adding the basic layout to series points.
             * @private
             */
            addLayout: function () {
                var series = this, layoutOptions = series.options.layoutAlgorithm, graphLayoutsStorage = series.chart.graphLayoutsStorage, graphLayoutsLookup = series.chart.graphLayoutsLookup, chartOptions = series.chart.options.chart, layout;
                if (!graphLayoutsStorage) {
                    series.chart.graphLayoutsStorage = graphLayoutsStorage = {};
                    series.chart.graphLayoutsLookup = graphLayoutsLookup = [];
                }
                layout = graphLayoutsStorage[layoutOptions.type];
                if (!layout) {
                    layoutOptions.enableSimulation =
                        !defined(chartOptions.forExport) ?
                            layoutOptions.enableSimulation :
                            !chartOptions.forExport;
                    graphLayoutsStorage[layoutOptions.type] = layout =
                        new H.layouts[layoutOptions.type]();
                    layout.init(layoutOptions);
                    graphLayoutsLookup.splice(layout.index, 0, layout);
                }
                series.layout = layout;
                series.points.forEach(function (node) {
                    node.mass = 2;
                    node.degree = 1;
                    node.collisionNmb = 1;
                });
                layout.setArea(0, 0, series.chart.plotWidth, series.chart.plotHeight);
                layout.addElementsToCollection([series], layout.series);
                layout.addElementsToCollection(series.points, layout.nodes);
            },
            /**
             * Function responsible for adding all the layouts to the chart.
             * @private
             */
            deferLayout: function () {
                // TODO split layouts to independent methods
                var series = this, layoutOptions = series.options.layoutAlgorithm;
                if (!series.visible) {
                    return;
                }
                // layout is using nodes for position calculation
                series.addLayout();
                if (layoutOptions.splitSeries) {
                    series.addSeriesLayout();
                }
            },
            /**
             * Extend the base translate method to handle bubble size,
             * and correct positioning them.
             * @private
             */
            translate: function () {
                var series = this, chart = series.chart, data = series.data, index = series.index, point, radius, positions, i, useSimulation = series.options.useSimulation;
                series.processedXData = series.xData;
                series.generatePoints();
                // merged data is an array with all of the data from all series
                if (!defined(chart.allDataPoints)) {
                    chart.allDataPoints = series.accumulateAllPoints(series);
                    // calculate radius for all added data
                    series.getPointRadius();
                }
                // after getting initial radius, calculate bubble positions
                if (useSimulation) {
                    positions = chart.allDataPoints;
                }
                else {
                    positions = series.placeBubbles(chart.allDataPoints);
                    series.options.draggable = false;
                }
                // Set the shape and arguments to be picked up in drawPoints
                for (i = 0; i < positions.length; i++) {
                    if (positions[i][3] === index) {
                        // update the series points with the val from positions
                        // array
                        point = data[positions[i][4]];
                        radius = positions[i][2];
                        if (!useSimulation) {
                            point.plotX = (positions[i][0] - chart.plotLeft +
                                chart.diffX);
                            point.plotY = (positions[i][1] - chart.plotTop +
                                chart.diffY);
                        }
                        point.marker = extend(point.marker, {
                            radius: radius,
                            width: 2 * radius,
                            height: 2 * radius
                        });
                        point.radius = radius;
                    }
                }
                if (useSimulation) {
                    series.deferLayout();
                }
                fireEvent(series, 'afterTranslate');
            },
            /**
             * Check if two bubbles overlaps.
             * @private
             * @param {Array} first bubble
             * @param {Array} second bubble
             * @return {Boolean} overlap or not
             */
            checkOverlap: function (bubble1, bubble2) {
                var diffX = bubble1[0] - bubble2[0], // diff of X center values
                diffY = bubble1[1] - bubble2[1], // diff of Y center values
                sumRad = bubble1[2] + bubble2[2]; // sum of bubble radius
                return (Math.sqrt(diffX * diffX + diffY * diffY) -
                    Math.abs(sumRad)) < -0.001;
            },
            /**
             * Function that is adding one bubble based on positions and sizes of
             * two other bubbles, lastBubble is the last added bubble, newOrigin is
             * the bubble for positioning new bubbles. nextBubble is the curently
             * added bubble for which we are calculating positions
             * @private
             * @param {Array<number>} lastBubble The closest last bubble
             * @param {Array<number>} newOrigin New bubble
             * @param {Array<number>} nextBubble The closest next bubble
             * @return {Array<number>} Bubble with correct positions
             */
            positionBubble: function (lastBubble, newOrigin, nextBubble) {
                var sqrt = Math.sqrt, asin = Math.asin, acos = Math.acos, pow = Math.pow, abs = Math.abs, distance = sqrt(// dist between lastBubble and newOrigin
                pow((lastBubble[0] - newOrigin[0]), 2) +
                    pow((lastBubble[1] - newOrigin[1]), 2)), alfa = acos(
                // from cosinus theorem: alfa is an angle used for
                // calculating correct position
                (pow(distance, 2) +
                    pow(nextBubble[2] + newOrigin[2], 2) -
                    pow(nextBubble[2] + lastBubble[2], 2)) / (2 * (nextBubble[2] + newOrigin[2]) * distance)), beta = asin(// from sinus theorem.
                abs(lastBubble[0] - newOrigin[0]) /
                    distance), 
                // providing helping variables, related to angle between
                // lastBubble and newOrigin
                gamma = (lastBubble[1] - newOrigin[1]) < 0 ? 0 : Math.PI, 
                // if new origin y is smaller than last bubble y value
                // (2 and 3 quarter),
                // add Math.PI to final angle
                delta = (lastBubble[0] - newOrigin[0]) *
                    (lastBubble[1] - newOrigin[1]) < 0 ?
                    1 : -1, // (1st and 3rd quarter)
                finalAngle = gamma + alfa + beta * delta, cosA = Math.cos(finalAngle), sinA = Math.sin(finalAngle), posX = newOrigin[0] + (newOrigin[2] + nextBubble[2]) * sinA, 
                // center of new origin + (radius1 + radius2) * sinus A
                posY = newOrigin[1] - (newOrigin[2] + nextBubble[2]) * cosA;
                return [
                    posX,
                    posY,
                    nextBubble[2],
                    nextBubble[3],
                    nextBubble[4]
                ]; // the same as described before
            },
            /**
             * This is the main function responsible
             * for positioning all of the bubbles
             * allDataPoints - bubble array, in format [pixel x value,
             * pixel y value, radius,
             * related series index, related point index]
             * @private
             * @param {Array<Highcharts.PackedBubbleData>} allDataPoints All points from all series
             * @return {Array<Highcharts.PackedBubbleData>} Positions of all bubbles
             */
            placeBubbles: function (allDataPoints) {
                var series = this, checkOverlap = series.checkOverlap, positionBubble = series.positionBubble, bubblePos = [], stage = 1, j = 0, k = 0, calculatedBubble, sortedArr, arr = [], i;
                // sort all points
                sortedArr = allDataPoints.sort(function (a, b) {
                    return b[2] - a[2];
                });
                if (sortedArr.length) {
                    // create first bubble in the middle of the chart
                    bubblePos.push([
                        [
                            0,
                            0,
                            sortedArr[0][2],
                            sortedArr[0][3],
                            sortedArr[0][4]
                        ] // point index
                    ]); // 0 level bubble
                    if (sortedArr.length > 1) {
                        bubblePos.push([
                            [
                                0,
                                (0 - sortedArr[1][2] -
                                    sortedArr[0][2]),
                                // move bubble above first one
                                sortedArr[1][2],
                                sortedArr[1][3],
                                sortedArr[1][4]
                            ]
                        ]); // 1 level 1st bubble
                        // first two already positioned so starting from 2
                        for (i = 2; i < sortedArr.length; i++) {
                            sortedArr[i][2] = sortedArr[i][2] || 1;
                            // in case if radius is calculated as 0.
                            calculatedBubble = positionBubble(bubblePos[stage][j], bubblePos[stage - 1][k], sortedArr[i]); // calculate initial bubble position
                            if (checkOverlap(calculatedBubble, bubblePos[stage][0])) {
                                /* if new bubble is overlapping with first bubble
                                 * in current level (stage)
                                 */
                                bubblePos.push([]);
                                k = 0;
                                /* reset index of bubble, used for
                                 * positioning the bubbles around it,
                                 * we are starting from first bubble in next
                                 * stage because we are changing level to higher
                                 */
                                bubblePos[stage + 1].push(positionBubble(bubblePos[stage][j], bubblePos[stage][0], sortedArr[i]));
                                // (last bubble, 1. from curr stage, new bubble)
                                stage++; // the new level is created, above current
                                j = 0; // set the index of bubble in curr level to 0
                            }
                            else if (stage > 1 &&
                                bubblePos[stage - 1][k + 1] &&
                                checkOverlap(calculatedBubble, bubblePos[stage - 1][k + 1])) {
                                /* if new bubble is overlapping with one of the prev
                                 * stage bubbles, it means that - bubble, used for
                                 * positioning the bubbles around it has changed
                                 * so we need to recalculate it
                                 */
                                k++;
                                bubblePos[stage].push(positionBubble(bubblePos[stage][j], bubblePos[stage - 1][k], sortedArr[i]));
                                // (last bubble, prev stage bubble, new bubble)
                                j++;
                            }
                            else { // simply add calculated bubble
                                j++;
                                bubblePos[stage].push(calculatedBubble);
                            }
                        }
                    }
                    series.chart.stages = bubblePos;
                    // it may not be necessary but adding it just in case -
                    // it is containing all of the bubble levels
                    series.chart.rawPositions =
                        []
                            .concat.apply([], bubblePos);
                    // bubble positions merged into one array
                    series.resizeRadius();
                    arr = series.chart.rawPositions;
                }
                return arr;
            },
            /**
             * The function responsible for resizing the bubble radius.
             * In shortcut: it is taking the initially
             * calculated positions of bubbles. Then it is calculating the min max
             * of both dimensions, creating something in shape of bBox.
             * The comparison of bBox and the size of plotArea
             * (later it may be also the size set by customer) is giving the
             * value how to recalculate the radius so it will match the size
             * @private
             */
            resizeRadius: function () {
                var chart = this.chart, positions = chart.rawPositions, min = Math.min, max = Math.max, plotLeft = chart.plotLeft, plotTop = chart.plotTop, chartHeight = chart.plotHeight, chartWidth = chart.plotWidth, minX, maxX, minY, maxY, radius, bBox, spaceRatio, smallerDimension, i;
                minX = minY = Number.POSITIVE_INFINITY; // set initial values
                maxX = maxY = Number.NEGATIVE_INFINITY;
                for (i = 0; i < positions.length; i++) {
                    radius = positions[i][2];
                    minX = min(minX, positions[i][0] - radius);
                    // (x center-radius) is the min x value used by specific bubble
                    maxX = max(maxX, positions[i][0] + radius);
                    minY = min(minY, positions[i][1] - radius);
                    maxY = max(maxY, positions[i][1] + radius);
                }
                bBox = [maxX - minX, maxY - minY];
                spaceRatio = [
                    (chartWidth - plotLeft) / bBox[0],
                    (chartHeight - plotTop) / bBox[1]
                ];
                smallerDimension = min.apply([], spaceRatio);
                if (Math.abs(smallerDimension - 1) > 1e-10) {
                    // if bBox is considered not the same width as possible size
                    for (i = 0; i < positions.length; i++) {
                        positions[i][2] *= smallerDimension;
                    }
                    this.placeBubbles(positions);
                }
                else {
                    /** if no radius recalculation is needed, we need to position
                     * the whole bubbles in center of chart plotarea
                     * for this, we are adding two parameters,
                     * diffY and diffX, that are related to differences
                     * between the initial center and the bounding box
                     */
                    chart.diffY = chartHeight / 2 +
                        plotTop - minY - (maxY - minY) / 2;
                    chart.diffX = chartWidth / 2 +
                        plotLeft - minX - (maxX - minX) / 2;
                }
            },
            /**
             * Calculate min and max bubble value for radius calculation.
             * @private
             */
            calculateZExtremes: function () {
                var chart = this.chart, zMin = this.options.zMin, zMax = this.options.zMax, valMin = Infinity, valMax = -Infinity;
                if (zMin && zMax) {
                    return [zMin, zMax];
                }
                // it is needed to deal with null
                // and undefined values
                chart.series.forEach(function (s) {
                    s.yData.forEach(function (p) {
                        if (defined(p)) {
                            if (p > valMax) {
                                valMax = p;
                            }
                            if (p < valMin) {
                                valMin = p;
                            }
                        }
                    });
                });
                zMin = pick(zMin, valMin);
                zMax = pick(zMax, valMax);
                return [zMin, zMax];
            },
            /**
             * Calculate radius of bubbles in series.
             * @private
             */
            getPointRadius: function () {
                var series = this, chart = series.chart, plotWidth = chart.plotWidth, plotHeight = chart.plotHeight, seriesOptions = series.options, useSimulation = seriesOptions.useSimulation, smallestSize = Math.min(plotWidth, plotHeight), extremes = {}, radii = [], allDataPoints = chart.allDataPoints, minSize, maxSize, value, radius, zExtremes;
                ['minSize', 'maxSize'].forEach(function (prop) {
                    var length = parseInt(seriesOptions[prop], 10), isPercent = /%$/.test(seriesOptions[prop]);
                    extremes[prop] = isPercent ?
                        smallestSize * length / 100 :
                        length * Math.sqrt(allDataPoints.length);
                });
                chart.minRadius = minSize = extremes.minSize /
                    Math.sqrt(allDataPoints.length);
                chart.maxRadius = maxSize = extremes.maxSize /
                    Math.sqrt(allDataPoints.length);
                zExtremes = useSimulation ?
                    series.calculateZExtremes() :
                    [minSize, maxSize];
                (allDataPoints || []).forEach(function (point, i) {
                    value = useSimulation ?
                        clamp(point[2], zExtremes[0], zExtremes[1]) :
                        point[2];
                    radius = series.getRadius(zExtremes[0], zExtremes[1], minSize, maxSize, value);
                    if (radius === 0) {
                        radius = null;
                    }
                    allDataPoints[i][2] = radius;
                    radii.push(radius);
                });
                series.radii = radii;
            },
            // Draggable mode:
            /**
             * Redraw halo on mousemove during the drag&drop action.
             * @private
             * @param {Highcharts.Point} point The point that should show halo.
             */
            redrawHalo: dragNodesMixin.redrawHalo,
            /**
             * Mouse down action, initializing drag&drop mode.
             * @private
             * @param {global.Event} event Browser event, before normalization.
             * @param {Highcharts.Point} point The point that event occured.
             */
            onMouseDown: dragNodesMixin.onMouseDown,
            /**
             * Mouse move action during drag&drop.
             * @private
             * @param {global.Event} event Browser event, before normalization.
             * @param {Highcharts.Point} point The point that event occured.
             */
            onMouseMove: dragNodesMixin.onMouseMove,
            /**
             * Mouse up action, finalizing drag&drop.
             * @private
             * @param {Highcharts.Point} point The point that event occured.
             */
            onMouseUp: function (point) {
                if (point.fixedPosition && !point.removed) {
                    var distanceXY, distanceR, layout = this.layout, parentNodeLayout = this.parentNodeLayout;
                    if (parentNodeLayout && layout.options.dragBetweenSeries) {
                        parentNodeLayout.nodes.forEach(function (node) {
                            if (point && point.marker &&
                                node !== point.series.parentNode) {
                                distanceXY = layout.getDistXY(point, node);
                                distanceR = (layout.vectorLength(distanceXY) -
                                    node.marker.radius -
                                    point.marker.radius);
                                if (distanceR < 0) {
                                    node.series.addPoint(merge(point.options, {
                                        plotX: point.plotX,
                                        plotY: point.plotY
                                    }), false);
                                    layout.removeElementFromCollection(point, layout.nodes);
                                    point.remove();
                                }
                            }
                        });
                    }
                    dragNodesMixin.onMouseUp.apply(this, arguments);
                }
            },
            destroy: function () {
                // Remove the series from all layouts series collections #11469
                if (this.chart.graphLayoutsLookup) {
                    this.chart.graphLayoutsLookup.forEach(function (layout) {
                        layout.removeElementFromCollection(this, layout.series);
                    }, this);
                }
                if (this.parentNode) {
                    this.parentNodeLayout.removeElementFromCollection(this.parentNode, this.parentNodeLayout.nodes);
                    if (this.parentNode.dataLabel) {
                        this.parentNode.dataLabel =
                            this.parentNode.dataLabel.destroy();
                    }
                }
                H.Series.prototype.destroy.apply(this, arguments);
            },
            alignDataLabel: H.Series.prototype.alignDataLabel
        }, {
            /**
             * Destroy point.
             * Then remove point from the layout.
             * @private
             * @return {undefined}
             */
            destroy: function () {
                if (this.series.layout) {
                    this.series.layout.removeElementFromCollection(this, this.series.layout.nodes);
                }
                return Point.prototype.destroy.apply(this, arguments);
            },
            firePointEvent: function (eventType, eventArgs, defaultFunction) {
                var point = this, series = this.series, seriesOptions = series.options;
                if (this.isParentNode && seriesOptions.parentNode) {
                    var temp = seriesOptions.allowPointSelect;
                    seriesOptions.allowPointSelect = seriesOptions.parentNode.allowPointSelect;
                    Point.prototype.firePointEvent.apply(this, arguments);
                    seriesOptions.allowPointSelect = temp;
                }
                else {
                    Point.prototype.firePointEvent.apply(this, arguments);
                }
            },
            select: function (selected, accumulate) {
                var point = this, series = this.series, chart = series.chart;
                if (point.isParentNode) {
                    chart.getSelectedPoints = chart.getSelectedParentNodes;
                    Point.prototype.select.apply(this, arguments);
                    chart.getSelectedPoints = H.Chart.prototype.getSelectedPoints;
                }
                else {
                    Point.prototype.select.apply(this, arguments);
                }
            }
        });
        // Remove accumulated data points to redistribute all of them again
        // (i.e after hiding series by legend)
        addEvent(Chart, 'beforeRedraw', function () {
            if (this.allDataPoints) {
                delete this.allDataPoints;
            }
        });
        /* eslint-enable no-invalid-this, valid-jsdoc */
        /**
         * A `packedbubble` series. If the [type](#series.packedbubble.type) option is
         * not specified, it is inherited from [chart.type](#chart.type).
         *
         * @type      {Object}
         * @extends   series,plotOptions.packedbubble
         * @excluding dataParser, dataSorting, dataURL, dragDrop, stack
         * @product   highcharts
         * @requires  highcharts-more
         * @apioption series.packedbubble
         */
        /**
         * An array of data points for the series. For the `packedbubble` series type,
         * points can be given in the following ways:
         *
         * 1.  An array of `values`.
         *
         *  ```js
         *     data: [5, 1, 20]
         *  ```
         *
         * 2.  An array of objects with named values. The objects are point
         * configuration objects as seen below. If the total number of data points
         * exceeds the series' [turboThreshold](#series.packedbubble.turboThreshold),
         * this option is not available.
         *
         *  ```js
         *     data: [{
         *         value: 1,
         *         name: "Point2",
         *         color: "#00FF00"
         *     }, {
         *         value: 5,
         *         name: "Point1",
         *         color: "#FF00FF"
         *     }]
         *  ```
         *
         * @type      {Array<Object|Array>}
         * @extends   series.line.data
         * @excluding marker, x, y
         * @sample    {highcharts} highcharts/series/data-array-of-objects/
         *            Config objects
         * @product   highcharts
         * @apioption series.packedbubble.data
         */
        /**
         * @type      {Highcharts.SeriesPackedBubbleDataLabelsOptionsObject|Array<Highcharts.SeriesPackedBubbleDataLabelsOptionsObject>}
         * @product   highcharts
         * @apioption series.packedbubble.data.dataLabels
         */
        /**
         * @excluding enabled,enabledThreshold,height,radius,width
         * @product   highcharts
         * @apioption series.packedbubble.marker
         */
        ''; // adds doclets above to transpiled file

    });
    _registerModule(_modules, 'parts-more/Polar.js', [_modules['parts/Chart.js'], _modules['parts/Globals.js'], _modules['parts-more/Pane.js'], _modules['parts/Pointer.js'], _modules['parts/SVGRenderer.js'], _modules['parts/Utilities.js']], function (Chart, H, Pane, Pointer, SVGRenderer, U) {
        /* *
         *
         *  (c) 2010-2020 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var addEvent = U.addEvent, animObject = U.animObject, defined = U.defined, find = U.find, isNumber = U.isNumber, pick = U.pick, splat = U.splat, uniqueKey = U.uniqueKey, wrap = U.wrap;
        // Extensions for polar charts. Additionally, much of the geometry required for
        // polar charts is gathered in RadialAxes.js.
        var Series = H.Series, seriesTypes = H.seriesTypes, seriesProto = Series.prototype, pointerProto = Pointer.prototype, colProto, arearangeProto;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * Search a k-d tree by the point angle, used for shared tooltips in polar
         * charts
         * @private
         */
        seriesProto.searchPointByAngle = function (e) {
            var series = this, chart = series.chart, xAxis = series.xAxis, center = xAxis.pane.center, plotX = e.chartX - center[0] - chart.plotLeft, plotY = e.chartY - center[1] - chart.plotTop;
            return this.searchKDTree({
                clientX: 180 + (Math.atan2(plotX, plotY) * (-180 / Math.PI))
            });
        };
        /**
         * #6212 Calculate connectors for spline series in polar chart.
         * @private
         * @param {boolean} calculateNeighbours
         *        Check if connectors should be calculated for neighbour points as
         *        well allows short recurence
         */
        seriesProto.getConnectors = function (segment, index, calculateNeighbours, connectEnds) {
            var i, prevPointInd, nextPointInd, previousPoint, nextPoint, previousX, previousY, nextX, nextY, plotX, plotY, ret, 
            // 1 means control points midway between points, 2 means 1/3 from
            // the point, 3 is 1/4 etc;
            smoothing = 1.5, denom = smoothing + 1, leftContX, leftContY, rightContX, rightContY, dLControlPoint, // distance left control point
            dRControlPoint, leftContAngle, rightContAngle, jointAngle, addedNumber = connectEnds ? 1 : 0;
            // Calculate final index of points depending on the initial index value.
            // Because of calculating neighbours, index may be outisde segment
            // array.
            if (index >= 0 && index <= segment.length - 1) {
                i = index;
            }
            else if (index < 0) {
                i = segment.length - 1 + index;
            }
            else {
                i = 0;
            }
            prevPointInd = (i - 1 < 0) ? segment.length - (1 + addedNumber) : i - 1;
            nextPointInd = (i + 1 > segment.length - 1) ? addedNumber : i + 1;
            previousPoint = segment[prevPointInd];
            nextPoint = segment[nextPointInd];
            previousX = previousPoint.plotX;
            previousY = previousPoint.plotY;
            nextX = nextPoint.plotX;
            nextY = nextPoint.plotY;
            plotX = segment[i].plotX; // actual point
            plotY = segment[i].plotY;
            leftContX = (smoothing * plotX + previousX) / denom;
            leftContY = (smoothing * plotY + previousY) / denom;
            rightContX = (smoothing * plotX + nextX) / denom;
            rightContY = (smoothing * plotY + nextY) / denom;
            dLControlPoint = Math.sqrt(Math.pow(leftContX - plotX, 2) + Math.pow(leftContY - plotY, 2));
            dRControlPoint = Math.sqrt(Math.pow(rightContX - plotX, 2) + Math.pow(rightContY - plotY, 2));
            leftContAngle = Math.atan2(leftContY - plotY, leftContX - plotX);
            rightContAngle = Math.atan2(rightContY - plotY, rightContX - plotX);
            jointAngle = (Math.PI / 2) + ((leftContAngle + rightContAngle) / 2);
            // Ensure the right direction, jointAngle should be in the same quadrant
            // as leftContAngle
            if (Math.abs(leftContAngle - jointAngle) > Math.PI / 2) {
                jointAngle -= Math.PI;
            }
            // Find the corrected control points for a spline straight through the
            // point
            leftContX = plotX + Math.cos(jointAngle) * dLControlPoint;
            leftContY = plotY + Math.sin(jointAngle) * dLControlPoint;
            rightContX = plotX + Math.cos(Math.PI + jointAngle) * dRControlPoint;
            rightContY = plotY + Math.sin(Math.PI + jointAngle) * dRControlPoint;
            // push current point's connectors into returned object
            ret = {
                rightContX: rightContX,
                rightContY: rightContY,
                leftContX: leftContX,
                leftContY: leftContY,
                plotX: plotX,
                plotY: plotY
            };
            // calculate connectors for previous and next point and push them inside
            // returned object
            if (calculateNeighbours) {
                ret.prevPointCont = this.getConnectors(segment, prevPointInd, false, connectEnds);
            }
            return ret;
        };
        /**
         * Translate a point's plotX and plotY from the internal angle and radius
         * measures to true plotX, plotY coordinates
         * @private
         */
        seriesProto.toXY = function (point) {
            var xy, chart = this.chart, xAxis = this.xAxis, yAxis = this.yAxis, plotX = point.plotX, plotY = point.plotY, series = point.series, inverted = chart.inverted, pointY = point.y, radius = inverted ? plotX : yAxis.len - plotY, clientX;
            // Corrected y position of inverted series other than column
            if (inverted && series && !series.isRadialBar) {
                point.plotY = plotY =
                    typeof pointY === 'number' ? (yAxis.translate(pointY) || 0) : 0;
            }
            // Save rectangular plotX, plotY for later computation
            point.rectPlotX = plotX;
            point.rectPlotY = plotY;
            if (yAxis.center) {
                radius += yAxis.center[3] / 2;
            }
            // Find the polar plotX and plotY
            xy = inverted ? yAxis.postTranslate(plotY, radius) :
                xAxis.postTranslate(plotX, radius);
            point.plotX = point.polarPlotX = xy.x - chart.plotLeft;
            point.plotY = point.polarPlotY = xy.y - chart.plotTop;
            // If shared tooltip, record the angle in degrees in order to align X
            // points. Otherwise, use a standard k-d tree to get the nearest point
            // in two dimensions.
            if (this.kdByAngle) {
                clientX = ((plotX / Math.PI * 180) +
                    xAxis.pane.options.startAngle) % 360;
                if (clientX < 0) { // #2665
                    clientX += 360;
                }
                point.clientX = clientX;
            }
            else {
                point.clientX = point.plotX;
            }
        };
        if (seriesTypes.spline) {
            /**
             * Overridden method for calculating a spline from one point to the next
             * @private
             */
            wrap(seriesTypes.spline.prototype, 'getPointSpline', function (proceed, segment, point, i) {
                var ret, connectors;
                if (this.chart.polar) {
                    // moveTo or lineTo
                    if (!i) {
                        ret = ['M', point.plotX, point.plotY];
                    }
                    else { // curve from last point to this
                        connectors = this.getConnectors(segment, i, true, this.connectEnds);
                        ret = [
                            'C',
                            connectors.prevPointCont.rightContX,
                            connectors.prevPointCont.rightContY,
                            connectors.leftContX,
                            connectors.leftContY,
                            connectors.plotX,
                            connectors.plotY
                        ];
                    }
                }
                else {
                    ret = proceed.call(this, segment, point, i);
                }
                return ret;
            });
            // #6430 Areasplinerange series use unwrapped getPointSpline method, so
            // we need to set this method again.
            if (seriesTypes.areasplinerange) {
                seriesTypes.areasplinerange.prototype.getPointSpline =
                    seriesTypes.spline.prototype.getPointSpline;
            }
        }
        /**
         * Extend translate. The plotX and plotY values are computed as if the polar
         * chart were a cartesian plane, where plotX denotes the angle in radians
         * and (yAxis.len - plotY) is the pixel distance from center.
         * @private
         */
        addEvent(Series, 'afterTranslate', function () {
            var series = this;
            var chart = series.chart;
            if (chart.polar && series.xAxis) {
                // Prepare k-d-tree handling. It searches by angle (clientX) in
                // case of shared tooltip, and by two dimensional distance in case
                // of non-shared.
                series.kdByAngle = chart.tooltip && chart.tooltip.shared;
                if (series.kdByAngle) {
                    series.searchPoint = series.searchPointByAngle;
                }
                else {
                    series.options.findNearestPointBy = 'xy';
                }
                // Postprocess plot coordinates
                if (!series.preventPostTranslate) {
                    var points = series.points;
                    var i = points.length;
                    while (i--) {
                        // Translate plotX, plotY from angle and radius to true plot
                        // coordinates
                        series.toXY(points[i]);
                        // Treat points below Y axis min as null (#10082)
                        if (!chart.hasParallelCoordinates &&
                            !series.yAxis.reversed &&
                            points[i].y < series.yAxis.min) {
                            points[i].isNull = true;
                        }
                    }
                }
                // Perform clip after render
                if (!this.hasClipCircleSetter) {
                    this.hasClipCircleSetter = !!series.eventsToUnbind.push(addEvent(series, 'afterRender', function () {
                        var circ;
                        if (chart.polar) {
                            // For clipping purposes there is a need for
                            // coordinates from the absolute center
                            circ = this.yAxis.pane.center;
                            if (!this.clipCircle) {
                                this.clipCircle = chart.renderer.clipCircle(circ[0], circ[1], circ[2] / 2, circ[3] / 2);
                            }
                            else {
                                this.clipCircle.animate({
                                    x: circ[0],
                                    y: circ[1],
                                    r: circ[2] / 2,
                                    innerR: circ[3] / 2
                                });
                            }
                            this.group.clip(this.clipCircle);
                            this.setClip = H.noop;
                        }
                    }));
                }
            }
        }, { order: 2 }); // Run after translation of ||-coords
        /**
         * Extend getSegmentPath to allow connecting ends across 0 to provide a
         * closed circle in line-like series.
         * @private
         */
        wrap(seriesProto, 'getGraphPath', function (proceed, points) {
            var series = this, i, firstValid, popLastPoint;
            // Connect the path
            if (this.chart.polar) {
                points = points || this.points;
                // Append first valid point in order to connect the ends
                for (i = 0; i < points.length; i++) {
                    if (!points[i].isNull) {
                        firstValid = i;
                        break;
                    }
                }
                /**
                 * Polar charts only. Whether to connect the ends of a line series
                 * plot across the extremes.
                 *
                 * @sample {highcharts} highcharts/plotoptions/line-connectends-false/
                 *         Do not connect
                 *
                 * @type      {boolean}
                 * @since     2.3.0
                 * @product   highcharts
                 * @apioption plotOptions.series.connectEnds
                 */
                if (this.options.connectEnds !== false &&
                    typeof firstValid !== 'undefined') {
                    this.connectEnds = true; // re-used in splines
                    points.splice(points.length, 0, points[firstValid]);
                    popLastPoint = true;
                }
                // For area charts, pseudo points are added to the graph, now we
                // need to translate these
                points.forEach(function (point) {
                    if (typeof point.polarPlotY === 'undefined') {
                        series.toXY(point);
                    }
                });
            }
            // Run uber method
            var ret = proceed.apply(this, [].slice.call(arguments, 1));
            // #6212 points.splice method is adding points to an array. In case of
            // areaspline getGraphPath method is used two times and in both times
            // points are added to an array. That is why points.pop is used, to get
            // unmodified points.
            if (popLastPoint) {
                points.pop();
            }
            return ret;
        });
        var polarAnimate = function (proceed, init) {
            var series = this, chart = this.chart, animation = this.options.animation, group = this.group, markerGroup = this.markerGroup, center = this.xAxis.center, plotLeft = chart.plotLeft, plotTop = chart.plotTop, attribs, paneInnerR, graphic, shapeArgs, r, innerR;
            // Specific animation for polar charts
            if (chart.polar) {
                if (series.isRadialBar) {
                    if (!init) {
                        // Run the pie animation for radial bars
                        series.startAngleRad = pick(series.translatedThreshold, series.xAxis.startAngleRad);
                        H.seriesTypes.pie.prototype.animate.call(series, init);
                    }
                }
                else {
                    // Enable animation on polar charts only in SVG. In VML, the scaling
                    // is different, plus animation would be so slow it would't matter.
                    if (chart.renderer.isSVG) {
                        animation = animObject(animation);
                        // A different animation needed for column like series
                        if (series.is('column')) {
                            if (!init) {
                                paneInnerR = center[3] / 2;
                                series.points.forEach(function (point) {
                                    graphic = point.graphic;
                                    shapeArgs = point.shapeArgs;
                                    r = shapeArgs && shapeArgs.r;
                                    innerR = shapeArgs && shapeArgs.innerR;
                                    if (graphic && shapeArgs) {
                                        // start values
                                        graphic.attr({
                                            r: paneInnerR,
                                            innerR: paneInnerR
                                        });
                                        // animate
                                        graphic.animate({
                                            r: r,
                                            innerR: innerR
                                        }, series.options.animation);
                                    }
                                });
                            }
                        }
                        else {
                            // Initialize the animation
                            if (init) {
                                // Scale down the group and place it in the center
                                attribs = {
                                    translateX: center[0] + plotLeft,
                                    translateY: center[1] + plotTop,
                                    scaleX: 0.001,
                                    scaleY: 0.001
                                };
                                group.attr(attribs);
                                if (markerGroup) {
                                    markerGroup.attr(attribs);
                                }
                                // Run the animation
                            }
                            else {
                                attribs = {
                                    translateX: plotLeft,
                                    translateY: plotTop,
                                    scaleX: 1,
                                    scaleY: 1
                                };
                                group.animate(attribs, animation);
                                if (markerGroup) {
                                    markerGroup.animate(attribs, animation);
                                }
                            }
                        }
                    }
                }
                // For non-polar charts, revert to the basic animation
            }
            else {
                proceed.call(this, init);
            }
        };
        // Define the animate method for regular series
        wrap(seriesProto, 'animate', polarAnimate);
        if (seriesTypes.column) {
            arearangeProto = seriesTypes.arearange.prototype;
            colProto = seriesTypes.column.prototype;
            colProto.polarArc = function (low, high, start, end) {
                var center = this.xAxis.center, len = this.yAxis.len, paneInnerR = center[3] / 2, r = len - high + paneInnerR, innerR = len - pick(low, len) + paneInnerR;
                // Prevent columns from shooting through the pane's center
                if (this.yAxis.reversed) {
                    if (r < 0) {
                        r = paneInnerR;
                    }
                    if (innerR < 0) {
                        innerR = paneInnerR;
                    }
                }
                // Return a new shapeArgs
                return {
                    x: center[0],
                    y: center[1],
                    r: r,
                    innerR: innerR,
                    start: start,
                    end: end
                };
            };
            /**
             * Define the animate method for columnseries
             * @private
             */
            wrap(colProto, 'animate', polarAnimate);
            /**
             * Extend the column prototype's translate method
             * @private
             */
            wrap(colProto, 'translate', function (proceed) {
                var series = this, options = series.options, threshold = options.threshold, stacking = options.stacking, chart = series.chart, xAxis = series.xAxis, yAxis = series.yAxis, reversed = yAxis.reversed, center = yAxis.center, startAngleRad = xAxis.startAngleRad, endAngleRad = xAxis.endAngleRad, visibleRange = endAngleRad - startAngleRad, thresholdAngleRad, points, point, i, yMin, yMax, start, end, tooltipPos, pointX, pointY, stackValues, stack, barX, innerR, r;
                series.preventPostTranslate = true;
                // Run uber method
                proceed.call(series);
                // Postprocess plot coordinates
                if (xAxis.isRadial) {
                    points = series.points;
                    i = points.length;
                    yMin = yAxis.translate(yAxis.min);
                    yMax = yAxis.translate(yAxis.max);
                    threshold = options.threshold || 0;
                    if (chart.inverted) {
                        // Finding a correct threshold
                        if (isNumber(threshold)) {
                            thresholdAngleRad = yAxis.translate(threshold);
                            // Checks if threshold is outside the visible range
                            if (defined(thresholdAngleRad)) {
                                if (thresholdAngleRad < 0) {
                                    thresholdAngleRad = 0;
                                }
                                else if (thresholdAngleRad > visibleRange) {
                                    thresholdAngleRad = visibleRange;
                                }
                                // Adding start angle offset
                                series.translatedThreshold =
                                    thresholdAngleRad + startAngleRad;
                            }
                        }
                    }
                    while (i--) {
                        point = points[i];
                        barX = point.barX;
                        pointX = point.x;
                        pointY = point.y;
                        point.shapeType = 'arc';
                        if (chart.inverted) {
                            point.plotY = yAxis.translate(pointY);
                            if (stacking && yAxis.stacking) {
                                stack = yAxis.stacking.stacks[(pointY < 0 ? '-' : '') +
                                    series.stackKey];
                                if (series.visible && stack && stack[pointX]) {
                                    if (!point.isNull) {
                                        stackValues = stack[pointX].points[series.getStackIndicator(void 0, pointX, series.index).key];
                                        // Translating to radial values
                                        start = yAxis.translate(stackValues[0]);
                                        end = yAxis.translate(stackValues[1]);
                                        // If starting point is beyond the
                                        // range, set it to 0
                                        if (defined(start)) {
                                            start = U.clamp(start, 0, visibleRange);
                                        }
                                    }
                                }
                            }
                            else {
                                // Initial start and end angles for radial bar
                                start = thresholdAngleRad;
                                end = point.plotY;
                            }
                            if (start > end) {
                                // Swapping start and end
                                end = [start, start = end][0];
                            }
                            // Prevent from rendering point outside the
                            // acceptable circular range
                            if (!reversed) {
                                if (start < yMin) {
                                    start = yMin;
                                }
                                else if (end > yMax) {
                                    end = yMax;
                                }
                                else if (end < yMin || start > yMax) {
                                    start = end = 0;
                                }
                            }
                            else {
                                if (end > yMin) {
                                    end = yMin;
                                }
                                else if (start < yMax) {
                                    start = yMax;
                                }
                                else if (start > yMin || end < yMax) {
                                    start = end = visibleRange;
                                }
                            }
                            if (yAxis.min > yAxis.max) {
                                start = end = reversed ? visibleRange : 0;
                            }
                            start += startAngleRad;
                            end += startAngleRad;
                            if (center) {
                                point.barX = barX += center[3] / 2;
                            }
                            // In case when radius, inner radius or both are
                            // negative, a point is rendered but partially or as
                            // a center point
                            innerR = Math.max(barX, 0);
                            r = Math.max(barX + point.pointWidth, 0);
                            point.shapeArgs = {
                                x: center && center[0],
                                y: center && center[1],
                                r: r,
                                innerR: innerR,
                                start: start,
                                end: end
                            };
                            // Fade out the points if not inside the polar "plot area"
                            point.opacity = start === end ? 0 : void 0;
                            // A correct value for stacked or not fully visible
                            // point
                            point.plotY = (defined(series.translatedThreshold) &&
                                (start < series.translatedThreshold ? start : end)) -
                                startAngleRad;
                        }
                        else {
                            start = barX + startAngleRad;
                            // Changed the way polar columns are drawn in order to make
                            // it more consistent with the drawing of inverted columns
                            // (they are using the same function now). Also, it was
                            // essential to make the animation work correctly (the
                            // scaling of the group) is replaced by animating each
                            // element separately.
                            point.shapeArgs = series.polarArc(point.yBottom, point.plotY, start, start + point.pointWidth);
                        }
                        // Provided a correct coordinates for the tooltip
                        series.toXY(point);
                        if (chart.inverted) {
                            tooltipPos = yAxis.postTranslate(point.rectPlotY, barX + point.pointWidth / 2);
                            point.tooltipPos = [
                                tooltipPos.x - chart.plotLeft,
                                tooltipPos.y - chart.plotTop
                            ];
                        }
                        else {
                            point.tooltipPos = [point.plotX, point.plotY];
                        }
                        if (center) {
                            point.ttBelow = point.plotY > center[1];
                        }
                    }
                }
            });
            /**
             * Find correct align and vertical align based on an angle in polar chart
             * @private
             */
            colProto.findAlignments = function (angle, options) {
                var align, verticalAlign;
                if (options.align === null) {
                    if (angle > 20 && angle < 160) {
                        align = 'left'; // right hemisphere
                    }
                    else if (angle > 200 && angle < 340) {
                        align = 'right'; // left hemisphere
                    }
                    else {
                        align = 'center'; // top or bottom
                    }
                    options.align = align;
                }
                if (options.verticalAlign === null) {
                    if (angle < 45 || angle > 315) {
                        verticalAlign = 'bottom'; // top part
                    }
                    else if (angle > 135 && angle < 225) {
                        verticalAlign = 'top'; // bottom part
                    }
                    else {
                        verticalAlign = 'middle'; // left or right
                    }
                    options.verticalAlign = verticalAlign;
                }
                return options;
            };
            if (arearangeProto) {
                arearangeProto.findAlignments = colProto.findAlignments;
            }
            /**
             * Align column data labels outside the columns. #1199.
             * @private
             */
            wrap(colProto, 'alignDataLabel', function (proceed, point, dataLabel, options, alignTo, isNew) {
                var chart = this.chart, inside = pick(options.inside, !!this.options.stacking), angle, shapeArgs, labelPos;
                if (chart.polar) {
                    angle = point.rectPlotX / Math.PI * 180;
                    if (!chart.inverted) {
                        // Align nicely outside the perimeter of the columns
                        if (this.findAlignments) {
                            options = this.findAlignments(angle, options);
                        }
                    }
                    else { // Required corrections for data labels of inverted bars
                        // The plotX and plotY are correctly set therefore they
                        // don't need to be swapped (inverted argument is false)
                        this.forceDL = chart.isInsidePlot(point.plotX, Math.round(point.plotY), false);
                        // Checks if labels should be positioned inside
                        if (inside && point.shapeArgs) {
                            shapeArgs = point.shapeArgs;
                            // Calculates pixel positions for a data label to be
                            // inside
                            labelPos =
                                this.yAxis.postTranslate(
                                // angle
                                (shapeArgs.start + shapeArgs.end) / 2 -
                                    this
                                        .xAxis.startAngleRad, 
                                // radius
                                point.barX +
                                    point.pointWidth / 2);
                            alignTo = {
                                x: labelPos.x - chart.plotLeft,
                                y: labelPos.y - chart.plotTop
                            };
                        }
                        else if (point.tooltipPos) {
                            alignTo = {
                                x: point.tooltipPos[0],
                                y: point.tooltipPos[1]
                            };
                        }
                        options.align = pick(options.align, 'center');
                        options.verticalAlign =
                            pick(options.verticalAlign, 'middle');
                    }
                    seriesProto.alignDataLabel.call(this, point, dataLabel, options, alignTo, isNew);
                    // Hide label of a point (only inverted) that is outside the
                    // visible y range
                    if (this.isRadialBar && point.shapeArgs &&
                        point.shapeArgs.start === point.shapeArgs.end) {
                        dataLabel.hide(true);
                    }
                }
                else {
                    proceed.call(this, point, dataLabel, options, alignTo, isNew);
                }
            });
        }
        /**
         * Extend getCoordinates to prepare for polar axis values
         * @private
         */
        wrap(pointerProto, 'getCoordinates', function (proceed, e) {
            var chart = this.chart, ret = {
                xAxis: [],
                yAxis: []
            };
            if (chart.polar) {
                chart.axes.forEach(function (axis) {
                    var isXAxis = axis.isXAxis, center = axis.center, x, y;
                    // Skip colorAxis
                    if (axis.coll === 'colorAxis') {
                        return;
                    }
                    x = e.chartX - center[0] - chart.plotLeft;
                    y = e.chartY - center[1] - chart.plotTop;
                    ret[isXAxis ? 'xAxis' : 'yAxis'].push({
                        axis: axis,
                        value: axis.translate(isXAxis ?
                            Math.PI - Math.atan2(x, y) : // angle
                            // distance from center
                            Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)), true)
                    });
                });
            }
            else {
                ret = proceed.call(this, e);
            }
            return ret;
        });
        SVGRenderer.prototype.clipCircle = function (x, y, r, innerR) {
            var wrapper, id = uniqueKey(), clipPath = this.createElement('clipPath').attr({
                id: id
            }).add(this.defs);
            wrapper = innerR ?
                this.arc(x, y, r, innerR, 0, 2 * Math.PI).add(clipPath) :
                this.circle(x, y, r).add(clipPath);
            wrapper.id = id;
            wrapper.clipPath = clipPath;
            return wrapper;
        };
        addEvent(Chart, 'getAxes', function () {
            if (!this.pane) {
                this.pane = [];
            }
            splat(this.options.pane).forEach(function (paneOptions) {
                new Pane(// eslint-disable-line no-new
                paneOptions, this);
            }, this);
        });
        addEvent(Chart, 'afterDrawChartBox', function () {
            this.pane.forEach(function (pane) {
                pane.render();
            });
        });
        addEvent(H.Series, 'afterInit', function () {
            var chart = this.chart;
            // Add flags that identifies radial inverted series
            if (chart.inverted && chart.polar) {
                this.isRadialSeries = true;
                if (this.is('column')) {
                    this.isRadialBar = true;
                }
            }
        });
        /**
         * Extend chart.get to also search in panes. Used internally in
         * responsiveness and chart.update.
         * @private
         */
        wrap(Chart.prototype, 'get', function (proceed, id) {
            return find(this.pane, function (pane) {
                return pane.options.id === id;
            }) || proceed.call(this, id);
        });

    });
    _registerModule(_modules, 'masters/highcharts-more.src.js', [], function () {


    });
}));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           *
                 * @type    {Array<string>}
                 * @default ["k", "M", "G", "T", "P", "E"]
                 * @since   2.3.0
                 */
                numericSymbols: ['k', 'M', 'G', 'T', 'P', 'E'],
                /**
                 * The magnitude of [numericSymbols](#lang.numericSymbol) replacements.
                 * Use 10000 for Japanese, Korean and various Chinese locales, which
                 * use symbols for 10^4, 10^8 and 10^12.
                 *
                 * @sample highcharts/lang/numericsymbolmagnitude/
                 *         10000 magnitude for Japanese
                 *
                 * @type      {number}
                 * @default   1000
                 * @since     5.0.3
                 * @apioption lang.numericSymbolMagnitude
                 */
                /**
                 * The text for the label appearing when a chart is zoomed.
                 *
                 * @since 1.2.4
                 */
                resetZoom: 'Reset zoom',
                /**
                 * The tooltip title for the label appearing when a chart is zoomed.
                 *
                 * @since 1.2.4
                 */
                resetZoomTitle: 'Reset zoom level 1:1',
                /**
                 * The default thousands separator used in the `Highcharts.numberFormat`
                 * method unless otherwise specified in the function arguments. Defaults
                 * to a single space character, which is recommended in
                 * [ISO 31-0](https://en.wikipedia.org/wiki/ISO_31-0#Numbers) and works
                 * across Anglo-American and continental European languages.
                 *
                 * @default \u0020
                 * @since   1.2.2
                 */
                thousandsSep: ' '
            },
            /**
             * Global options that don't apply to each chart. These options, like
             * the `lang` options, must be set using the `Highcharts.setOptions`
             * method.
             *
             * ```js
             * Highcharts.setOptions({
             *     global: {
             *         useUTC: false
             *     }
             * });
             * ```
             */
            /**
             * _Canvg rendering for Android 2.x is removed as of Highcharts 5.0\.
             * Use the [libURL](#exporting.libURL) option to configure exporting._
             *
             * The URL to the additional file to lazy load for Android 2.x devices.
             * These devices don't support SVG, so we download a helper file that
             * contains [canvg](https://github.com/canvg/canvg), its dependency
             * rbcolor, and our own CanVG Renderer class. To avoid hotlinking to
             * our site, you can install canvas-tools.js on your own server and
             * change this option accordingly.
             *
             * @deprecated
             *
             * @type      {string}
             * @default   https://code.highcharts.com/{version}/modules/canvas-tools.js
             * @product   highcharts highmaps
             * @apioption global.canvasToolsURL
             */
            /**
             * This option is deprecated since v6.0.5. Instead, use
             * [time.useUTC](#time.useUTC) that supports individual time settings
             * per chart.
             *
             * @deprecated
             *
             * @type      {boolean}
             * @apioption global.useUTC
             */
            /**
             * This option is deprecated since v6.0.5. Instead, use
             * [time.Date](#time.Date) that supports individual time settings
             * per chart.
             *
             * @deprecated
             *
             * @type      {Function}
             * @product   highcharts highstock
             * @apioption global.Date
             */
            /**
             * This option is deprecated since v6.0.5. Instead, use
             * [time.getTimezoneOffset](#time.getTimezoneOffset) that supports
             * individual time settings per chart.
             *
             * @deprecated
             *
             * @type      {Function}
             * @product   highcharts highstock
             * @apioption global.getTimezoneOffset
             */
            /**
             * This option is deprecated since v6.0.5. Instead, use
             * [time.timezone](#time.timezone) that supports individual time
             * settings per chart.
             *
             * @deprecated
             *
             * @type      {string}
             * @product   highcharts highstock
             * @apioption global.timezone
             */
            /**
             * This option is deprecated since v6.0.5. Instead, use
             * [time.timezoneOffset](#time.timezoneOffset) that supports individual
             * time settings per chart.
             *
             * @deprecated
             *
             * @type      {number}
             * @product   highcharts highstock
             * @apioption global.timezoneOffset
             */
            global: {},
            /**
             * Time options that can apply globally or to individual charts. These
             * settings affect how `datetime` axes are laid out, how tooltips are
             * formatted, how series
             * [pointIntervalUnit](#plotOptions.series.pointIntervalUnit) works and how
             * the Highstock range selector handles time.
             *
             * The common use case is that all charts in the same Highcharts object
             * share the same time settings, in which case the global settings are set
             * using `setOptions`.
             *
             * ```js
             * // Apply time settings globally
             * Highcharts.setOptions({
             *     time: {
             *         timezone: 'Europe/London'
             *     }
             * });
             * // Apply time settings by instance
             * var chart = Highcharts.chart('container', {
             *     time: {
             *         timezone: 'America/New_York'
             *     },
             *     series: [{
             *         data: [1, 4, 3, 5]
             *     }]
             * });
             *
             * // Use the Time object
             * console.log(
             *        'Current time in New York',
             *        chart.time.dateFormat('%Y-%m-%d %H:%M:%S', Date.now())
             * );
             * ```
             *
             * Since v6.0.5, the time options were moved from the `global` obect to the
             * `time` object, and time options can be set on each individual chart.
             *
             * @sample {highcharts|highstock}
             *         highcharts/time/timezone/
             *         Set the timezone globally
             * @sample {highcharts}
             *         highcharts/time/individual/
             *         Set the timezone per chart instance
             * @sample {highstock}
             *         stock/time/individual/
             *         Set the timezone per chart instance
             *
             * @since     6.0.5
             * @optionparent time
             */
            time: {
                /**
                 * A custom `Date` class for advanced date handling. For example,
                 * [JDate](https://github.com/tahajahangir/jdate) can be hooked in to
                 * handle Jalali dates.
                 *
                 * @type      {*}
                 * @since     4.0.4
                 * @product   highcharts highstock gantt
                 */
                Date: void 0,
                /**
                 * A callback to return the time zone offset for a given datetime. It
                 * takes the timestamp in terms of milliseconds since January 1 1970,
                 * and returns the timezone offset in minutes. This provides a hook
                 * for drawing time based charts in specific time zones using their
                 * local DST crossover dates, with the help of external libraries.
                 *
                 * @see [global.timezoneOffset](#global.timezoneOffset)
                 *
                 * @sample {highcharts|highstock} highcharts/time/gettimezoneoffset/
                 *         Use moment.js to draw Oslo time regardless of browser locale
                 *
                 * @type      {Highcharts.TimezoneOffsetCallbackFunction}
                 * @since     4.1.0
                 * @product   highcharts highstock gantt
                 */
                getTimezoneOffset: void 0,
                /**
                 * Requires [moment.js](https://momentjs.com/). If the timezone option
                 * is specified, it creates a default
                 * [getTimezoneOffset](#time.getTimezoneOffset) function that looks
                 * up the specified timezone in moment.js. If moment.js is not included,
                 * this throws a Highcharts error in the console, but does not crash the
                 * chart.
                 *
                 * @see [getTimezoneOffset](#time.getTimezoneOffset)
                 *
                 * @sample {highcharts|highstock} highcharts/time/timezone/
                 *         Europe/Oslo
                 *
                 * @type      {string}
                 * @since     5.0.7
                 * @product   highcharts highstock gantt
                 */
                timezone: void 0,
                /**
                 * The timezone offset in minutes. Positive values are west, negative
                 * values are east of UTC, as in the ECMAScript
                 * [getTimezoneOffset](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getTimezoneOffset)
                 * method. Use this to display UTC based data in a predefined time zone.
                 *
                 * @see [time.getTimezoneOffset](#time.getTimezoneOffset)
                 *
                 * @sample {highcharts|highstock} highcharts/time/timezoneoffset/
                 *         Timezone offset
                 *
                 * @since     3.0.8
                 * @product   highcharts highstock gantt
                 */
                timezoneOffset: 0,
                /**
                 * Whether to use UTC time for axis scaling, tickmark placement and
                 * time display in `Highcharts.dateFormat`. Advantages of using UTC
                 * is that the time displays equally regardless of the user agent's
                 * time zone settings. Local time can be used when the data is loaded
                 * in real time or when correct Daylight Saving Time transitions are
                 * required.
                 *
                 * @sample {highcharts} highcharts/time/useutc-true/
                 *         True by default
                 * @sample {highcharts} highcharts/time/useutc-false/
                 *         False
                 */
                useUTC: true
            },
            /**
             * General options for the chart.
             */
            chart: {
                /**
                 * Default `mapData` for all series. If set to a string, it functions
                 * as an index into the `Highcharts.maps` array. Otherwise it is
                 * interpreted as map data.
                 *
                 * @see [mapData](#series.map.mapData)
                 *
                 * @sample    maps/demo/geojson
                 *            Loading geoJSON data
                 * @sample    maps/chart/topojson
                 *            Loading topoJSON converted to geoJSON
                 *
                 * @type      {string|Array<*>|Highcharts.GeoJSON}
                 * @since     5.0.0
                 * @product   highmaps
                 * @apioption chart.map
                 */
                /**
                 * Set lat/lon transformation definitions for the chart. If not defined,
                 * these are extracted from the map data.
                 *
                 * @type      {*}
                 * @since     5.0.0
                 * @product   highmaps
                 * @apioption chart.mapTransforms
                 */
                /**
                 * When using multiple axis, the ticks of two or more opposite axes
                 * will automatically be aligned by adding ticks to the axis or axes
                 * with the least ticks, as if `tickAmount` were specified.
                 *
                 * This can be prevented by setting `alignTicks` to false. If the grid
                 * lines look messy, it's a good idea to hide them for the secondary
                 * axis by setting `gridLineWidth` to 0.
                 *
                 * If `startOnTick` or `endOnTick` in an Axis options are set to false,
                 * then the `alignTicks ` will be disabled for the Axis.
                 *
                 * Disabled for logarithmic axes.
                 *
                 * @sample {highcharts} highcharts/chart/alignticks-true/
                 *         True by default
                 * @sample {highcharts} highcharts/chart/alignticks-false/
                 *         False
                 * @sample {highstock} stock/chart/alignticks-true/
                 *         True by default
                 * @sample {highstock} stock/chart/alignticks-false/
                 *         False
                 *
                 * @type      {boolean}
                 * @default   true
                 * @product   highcharts highstock gantt
                 * @apioption chart.alignTicks
                 */
                /**
                 * Set the overall animation for all chart updating. Animation can be
                 * disabled throughout the chart by setting it to false here. It can
                 * be overridden for each individual API method as a function parameter.
                 * The only animation not affected by this option is the initial series
                 * animation, see [plotOptions.series.animation](
                 * #plotOptions.series.animation).
                 *
                 * The animation can either be set as a boolean or a configuration
                 * object. If `true`, it will use the 'swing' jQuery easing and a
                 * duration of 500 ms. If used as a configuration object, the following
                 * properties are supported:
                 *
                 * - **duration**: The duration of the animation in milliseconds.
                 *
                 * - **easing**: A string reference to an easing function set on the
                 *   `Math` object. See
                 *   [the easing demo](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/plotoptions/series-animation-easing/).
                 *
                 * When zooming on a series with less than 100 points, the chart redraw
                 * will be done with animation, but in case of more data points, it is
                 * necessary to set this option to ensure animation on zoom.
                 *
                 * @sample {highcharts} highcharts/chart/animation-none/
                 *         Updating with no animation
                 * @sample {highcharts} highcharts/chart/animation-duration/
                 *         With a longer duration
                 * @sample {highcharts} highcharts/chart/animation-easing/
                 *         With a jQuery UI easing
                 * @sample {highmaps} maps/chart/animation-none/
                 *         Updating with no animation
                 * @sample {highmaps} maps/chart/animation-duration/
                 *         With a longer duration
                 *
                 * @type      {boolean|Highcharts.AnimationOptionsObject}
                 * @default   undefined
                 * @apioption chart.animation
                 */
                /**
                 * A CSS class name to apply to the charts container `div`, allowing
                 * unique CSS styling for each chart.
                 *
                 * @type      {string}
                 * @apioption chart.className
                 */
                /**
                 * Event listeners for the chart.
                 *
                 * @apioption chart.events
                 */
                /**
                 * Fires when a series is added to the chart after load time, using the
                 * `addSeries` method. One parameter, `event`, is passed to the
                 * function, containing common event information. Through
                 * `event.options` you can access the series options that were passed to
                 * the `addSeries` method. Returning false prevents the series from
                 * being added.
                 *
                 * @sample {highcharts} highcharts/chart/events-addseries/
                 *         Alert on add series
                 * @sample {highstock} stock/chart/events-addseries/
                 *         Alert on add series
                 *
                 * @type      {Highcharts.ChartAddSeriesCallbackFunction}
                 * @since     1.2.0
                 * @context   Highcharts.Chart
                 * @apioption chart.events.addSeries
                 */
                /**
                 * Fires when clicking on the plot background. One parameter, `event`,
                 * is passed to the function, containing common event information.
                 *
                 * Information on the clicked spot can be found through `event.xAxis`
                 * and `event.yAxis`, which are arrays containing the axes of each
                 * dimension and each axis' value at the clicked spot. The primary axes
                 * are `event.xAxis[0]` and `event.yAxis[0]`. Remember the unit of a
                 * datetime axis is milliseconds since 1970-01-01 00:00:00.
                 *
                 * ```js
                 * click: function(e) {
                 *     console.log(
                 *         Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', e.xAxis[0].value),
                 *         e.yAxis[0].value
                 *     )
                 * }
                 * ```
                 *
                 * @sample {highcharts} highcharts/chart/events-click/
                 *         Alert coordinates on click
                 * @sample {highcharts} highcharts/chart/events-container/
                 *         Alternatively, attach event to container
                 * @sample {highstock} stock/chart/events-click/
                 *         Alert coordinates on click
                 * @sample {highstock} highcharts/chart/events-container/
                 *         Alternatively, attach event to container
                 * @sample {highmaps} maps/chart/events-click/
                 *         Record coordinates on click
                 * @sample {highmaps} highcharts/chart/events-container/
                 *         Alternatively, attach event to container
                 *
                 * @type      {Highcharts.ChartClickCallbackFunction}
                 * @since     1.2.0
                 * @context   Highcharts.Chart
                 * @apioption chart.events.click
                 */
                /**
                 * Fires when the chart is finished loading. Since v4.2.2, it also waits
                 * for images to be loaded, for example from point markers. One
                 * parameter, `event`, is passed to the function, containing common
                 * event information.
                 *
                 * There is also a second parameter to the chart constructor where a
                 * callback function can be passed to be executed on chart.load.
                 *
                 * @sample {highcharts} highcharts/chart/events-load/
                 *         Alert on chart load
                 * @sample {highstock} stock/chart/events-load/
                 *         Alert on chart load
                 * @sample {highmaps} maps/chart/events-load/
                 *         Add series on chart load
                 *
                 * @type      {Highcharts.ChartLoadCallbackFunction}
                 * @context   Highcharts.Chart
                 * @apioption chart.events.load
                 */
                /**
                 * Fires when the chart is redrawn, either after a call to
                 * `chart.redraw()` or after an axis, series or point is modified with
                 * the `redraw` option set to `true`. One parameter, `event`, is passed
                 * to the function, containing common event information.
                 *
                 * @sample {highcharts} highcharts/chart/events-redraw/
                 *         Alert on chart redraw
                 * @sample {highstock} stock/chart/events-redraw/
                 *         Alert on chart redraw when adding a series or moving the
                 *         zoomed range
                 * @sample {highmaps} maps/chart/events-redraw/
                 *         Set subtitle on chart redraw
                 *
                 * @type      {Highcharts.ChartRedrawCallbackFunction}
                 * @since     1.2.0
                 * @context   Highcharts.Chart
                 * @apioption chart.events.redraw
                 */
                /**
                 * Fires after initial load of the chart (directly after the `load`
                 * event), and after each redraw (directly after the `redraw` event).
                 *
                 * @type      {Highcharts.ChartRenderCallbackFunction}
                 * @since     5.0.7
                 * @context   Highcharts.Chart
                 * @apioption chart.events.render
                 */
                /**
                 * Fires when an area of the chart has been selected. Selection is
                 * enabled by setting the chart's zoomType. One parameter, `event`, is
                 * passed to the function, containing common event information. The
                 * default action for the selection event is to zoom the chart to the
                 * selected area. It can be prevented by calling
                 * `event.preventDefault()` or return false.
                 *
                 * Information on the selected area can be found through `event.xAxis`
                 * and `event.yAxis`, which are arrays containing the axes of each
                 * dimension and each axis' min and max values. The primary axes are
                 * `event.xAxis[0]` and `event.yAxis[0]`. Remember the unit of a
                 * datetime axis is milliseconds since 1970-01-01 00:00:00.
                 *
                 * ```js
                 * selection: function(event) {
                 *     // log the min and max of the primary, datetime x-axis
                 *     console.log(
                 *         Highcharts.dateFormat(
                 *             '%Y-%m-%d %H:%M:%S',
                 *             event.xAxis[0].min
                 *         ),
                 *         Highcharts.dateFormat(
                 *             '%Y-%m-%d %H:%M:%S',
                 *             event.xAxis[0].max
                 *         )
                 *     );
                 *     // log the min and max of the y axis
                 *     console.log(event.yAxis[0].min, event.yAxis[0].max);
                 * }
                 * ```
                 *
                 * @sample {highcharts} highcharts/chart/events-selection/
                 *         Report on selection and reset
                 * @sample {highcharts} highcharts/chart/events-selection-points/
                 *         Select a range of points through a drag selection
                 * @sample {highstock} stock/chart/events-selection/
                 *         Report on selection and reset
                 * @sample {highstock} highcharts/chart/events-selection-points/
                 *         Select a range of points through a drag selection
                 *         (Highcharts)
                 *
                 * @type      {Highcharts.ChartSelectionCallbackFunction}
                 * @apioption chart.events.selection
                 */
                /**
                 * The margin between the outer edge of the chart and the plot area.
                 * The numbers in the array designate top, right, bottom and left
                 * respectively. Use the options `marginTop`, `marginRight`,
                 * `marginBottom` and `marginLeft` for shorthand setting of one option.
                 *
                 * By default there is no margin. The actual space is dynamically
                 * calculated from the offset of axis labels, axis title, title,
                 * subtitle and legend in addition to the `spacingTop`, `spacingRight`,
                 * `spacingBottom` and `spacingLeft` options.
                 *
                 * @sample {highcharts} highcharts/chart/margins-zero/
                 *         Zero margins
                 * @sample {highstock} stock/chart/margin-zero/
                 *         Zero margins
                 *
                 * @type      {number|Array<number>}
                 * @apioption chart.margin
                 */
                /**
                 * The margin between the bottom outer edge of the chart and the plot
                 * area. Use this to set a fixed pixel value for the margin as opposed
                 * to the default dynamic margin. See also `spacingBottom`.
                 *
                 * @sample {highcharts} highcharts/chart/marginbottom/
                 *         100px bottom margin
                 * @sample {highstock} stock/chart/marginbottom/
                 *         100px bottom margin
                 * @sample {highmaps} maps/chart/margin/
                 *         100px margins
                 *
                 * @type      {number}
                 * @since     2.0
                 * @apioption chart.marginBottom
                 */
                /**
                 * The margin between the left outer edge of the chart and the plot
                 * area. Use this to set a fixed pixel value for the margin as opposed
                 * to the default dynamic margin. See also `spacingLeft`.
                 *
                 * @sample {highcharts} highcharts/chart/marginleft/
                 *         150px left margin
                 * @sample {highstock} stock/chart/marginleft/
                 *         150px left margin
                 * @sample {highmaps} maps/chart/margin/
                 *         100px margins
                 *
                 * @type      {number}
                 * @since     2.0
                 * @apioption chart.marginLeft
                 */
                /**
                 * The margin between the right outer edge of the chart and the plot
                 * area. Use this to set a fixed pixel value for the margin as opposed
                 * to the default dynamic margin. See also `spacingRight`.
                 *
                 * @sample {highcharts} highcharts/chart/marginright/
                 *         100px right margin
                 * @sample {highstock} stock/chart/marginright/
                 *         100px right margin
                 * @sample {highmaps} maps/chart/margin/
                 *         100px margins
                 *
                 * @type      {number}
                 * @since     2.0
                 * @apioption chart.marginRight
                 */
                /**
                 * The margin between the top outer edge of the chart and the plot area.
                 * Use this to set a fixed pixel value for the margin as opposed to
                 * the default dynamic margin. See also `spacingTop`.
                 *
                 * @sample {highcharts} highcharts/chart/margintop/ 100px top margin
                 * @sample {highstock} stock/chart/margintop/
                 *         100px top margin
                 * @sample {highmaps} maps/chart/margin/
                 *         100px margins
                 *
                 * @type      {number}
                 * @since     2.0
                 * @apioption chart.marginTop
                 */
                /**
                 * Callback function to override the default function that formats all
                 * the numbers in the chart. Returns a string with the formatted number.
                 *
                 * @sample highcharts/members/highcharts-numberformat
                 *      Arabic digits in Highcharts
                 * @type {Highcharts.NumberFormatterCallbackFunction}
                 * @since 8.0.0
                 * @apioption chart.numberFormatter
                 */
                /**
                 * Allows setting a key to switch between zooming and panning. Can be
                 * one of `alt`, `ctrl`, `meta` (the command key on Mac and Windows
                 * key on Windows) or `shift`. The keys are mapped directly to the key
                 * properties of the click event argument (`event.altKey`,
                 * `event.ctrlKey`, `event.metaKey` and `event.shiftKey`).
                 *
                 * @type       {string}
                 * @since      4.0.3
                 * @product    highcharts gantt
                 * @validvalue ["alt", "ctrl", "meta", "shift"]
                 * @apioption  chart.panKey
                 */
                /**
                 * Allow panning in a chart. Best used with [panKey](#chart.panKey)
                 * to combine zooming and panning.
                 *
                 * On touch devices, when the [tooltip.followTouchMove](
                 * #tooltip.followTouchMove) option is `true` (default), panning
                 * requires two fingers. To allow panning with one finger, set
                 * `followTouchMove` to `false`.
                 *
                 * @sample  {highcharts} highcharts/chart/pankey/ Zooming and panning
                 * @sample  {highstock} stock/chart/panning/ Zooming and xy panning
                 *
                 * @product highcharts highstock gantt
                 * @apioption chart.panning
                 */
                /**
                 * Enable or disable chart panning.
                 *
                 * @type      {boolean}
                 * @default   {highcharts} false
                 * @default   {highstock} true
                 * @apioption chart.panning.enabled
                 */
                /**
                 * Decides in what dimensions the user can pan the chart. Can be
                 * one of `x`, `y`, or `xy`.
                 *
                 * @sample {highcharts} highcharts/chart/panning-type
                 *         Zooming and xy panning
                 *
                 * @type    {string}
                 * @validvalue ["x", "y", "xy"]
                 * @default x
                 * @apioption chart.panning.type
                 */
                /**
                 * Equivalent to [zoomType](#chart.zoomType), but for multitouch
                 * gestures only. By default, the `pinchType` is the same as the
                 * `zoomType` setting. However, pinching can be enabled separately in
                 * some cases, for example in stock charts where a mouse drag pans the
                 * chart, while pinching is enabled. When [tooltip.followTouchMove](
                 * #tooltip.followTouchMove) is true, pinchType only applies to
                 * two-finger touches.
                 *
                 * @type       {string}
                 * @default    {highcharts} undefined
                 * @default    {highstock} x
                 * @since      3.0
                 * @product    highcharts highstock gantt
                 * @validvalue ["x", "y", "xy"]
                 * @apioption  chart.pinchType
                 */
                /**
                 * Whether to apply styled mode. When in styled mode, no presentational
                 * attributes or CSS are applied to the chart SVG. Instead, CSS rules
                 * are required to style the chart. The default style sheet is
                 * available from `https://code.highcharts.com/css/highcharts.css`.
                 *
                 * @type       {boolean}
                 * @default    false
                 * @since      7.0
                 * @apioption  chart.styledMode
                 */
                styledMode: false,
                /**
                 * The corner radius of the outer chart border.
                 *
                 * @sample {highcharts} highcharts/chart/borderradius/
                 *         20px radius
                 * @sample {highstock} stock/chart/border/
                 *         10px radius
                 * @sample {highmaps} maps/chart/border/
                 *         Border options
                 *
                 */
                borderRadius: 0,
                /**
                 * In styled mode, this sets how many colors the class names
                 * should rotate between. With ten colors, series (or points) are
                 * given class names like `highcharts-color-0`, `highcharts-color-0`
                 * [...] `highcharts-color-9`. The equivalent in non-styled mode
                 * is to set colors using the [colors](#colors) setting.
                 *
                 * @since      5.0.0
                 */
                colorCount: 10,
                /**
                 * Alias of `type`.
                 *
                 * @sample {highcharts} highcharts/chart/defaultseriestype/
                 *         Bar
                 *
                 * @deprecated
                 *
                 * @product highcharts
                 */
                defaultSeriesType: 'line',
                /**
                 * If true, the axes will scale to the remaining visible series once
                 * one series is hidden. If false, hiding and showing a series will
                 * not affect the axes or the other series. For stacks, once one series
                 * within the stack is hidden, the rest of the stack will close in
                 * around it even if the axis is not affected.
                 *
                 * @sample {highcharts} highcharts/chart/ignorehiddenseries-true/
                 *         True by default
                 * @sample {highcharts} highcharts/chart/ignorehiddenseries-false/
                 *         False
                 * @sample {highcharts} highcharts/chart/ignorehiddenseries-true-stacked/
                 *         True with stack
                 * @sample {highstock} stock/chart/ignorehiddenseries-true/
                 *         True by default
                 * @sample {highstock} stock/chart/ignorehiddenseries-false/
                 *         False
                 *
                 * @since   1.2.0
                 * @product highcharts highstock gantt
                 */
                ignoreHiddenSeries: true,
                /**
                 * Whether to invert the axes so that the x axis is vertical and y axis
                 * is horizontal. When `true`, the x axis is [reversed](#xAxis.reversed)
                 * by default.
                 *
                 * @productdesc {highcharts}
                 * If a bar series is present in the chart, it will be inverted
                 * automatically. Inverting the chart doesn't have an effect if there
                 * are no cartesian series in the chart, or if the chart is
                 * [polar](#chart.polar).
                 *
                 * @sample {highcharts} highcharts/chart/inverted/
                 *         Inverted line
                 * @sample {highstock} stock/navigator/inverted/
                 *         Inverted stock chart
                 *
                 * @type      {boolean}
                 * @default   false
                 * @product   highcharts highstock gantt
                 * @apioption chart.inverted
                 */
                /**
                 * The distance between the outer edge of the chart and the content,
                 * like title or legend, or axis title and labels if present. The
                 * numbers in the array designate top, right, bottom and left
                 * respectively. Use the options spacingTop, spacingRight, spacingBottom
                 * and spacingLeft options for shorthand setting of one option.
                 *
                 * @type    {Array<number>}
                 * @see     [chart.margin](#chart.margin)
                 * @default [10, 10, 15, 10]
                 * @since   3.0.6
                 */
                spacing: [10, 10, 15, 10],
                /**
                 * The button that appears after a selection zoom, allowing the user
                 * to reset zoom.
                 */
                resetZoomButton: {
                    /**
                     * What frame the button placement should be related to. Can be
                     * either `plotBox` or `spacingBox`.
                     *
                     * @sample {highcharts} highcharts/chart/resetzoombutton-relativeto/
                     *         Relative to the chart
                     * @sample {highstock} highcharts/chart/resetzoombutton-relativeto/
                     *         Relative to the chart
                     *
                     * @type       {Highcharts.ButtonRelativeToValue}
                     * @default    plot
                     * @since      2.2
                     * @apioption  chart.resetZoomButton.relativeTo
                     */
                    /**
                     * A collection of attributes for the button. The object takes SVG
                     * attributes like `fill`, `stroke`, `stroke-width` or `r`, the
                     * border radius. The theme also supports `style`, a collection of
                     * CSS properties for the text. Equivalent attributes for the hover
                     * state are given in `theme.states.hover`.
                     *
                     * @sample {highcharts} highcharts/chart/resetzoombutton-theme/
                     *         Theming the button
                     * @sample {highstock} highcharts/chart/resetzoombutton-theme/
                     *         Theming the button
                     *
                     * @type {Highcharts.SVGAttributes}
                     * @since 2.2
                     */
                    theme: {
                        /** @internal */
                        zIndex: 6
                    },
                    /**
                     * The position of the button.
                     *
                     * @sample {highcharts} highcharts/chart/resetzoombutton-position/
                     *         Above the plot area
                     * @sample {highstock} highcharts/chart/resetzoombutton-position/
                     *         Above the plot area
                     * @sample {highmaps} highcharts/chart/resetzoombutton-position/
                     *         Above the plot area
                     *
                     * @type  {Highcharts.AlignObject}
                     * @since 2.2
                     */
                    position: {
                        /**
                         * The horizontal alignment of the button.
                         */
                        align: 'right',
                        /**
                         * The horizontal offset of the button.
                         */
                        x: -10,
                        /**
                         * The vertical alignment of the button.
                         *
                         * @type       {Highcharts.VerticalAlignValue}
                         * @default    top
                         * @apioption  chart.resetZoomButton.position.verticalAlign
                         */
                        /**
                         * The vertical offset of the button.
                         */
                        y: 10
                    }
                },
                /**
                 * The pixel width of the plot area border.
                 *
                 * @sample {highcharts} highcharts/chart/plotborderwidth/
                 *         1px border
                 * @sample {highstock} stock/chart/plotborder/
                 *         2px border
                 * @sample {highmaps} maps/chart/plotborder/
                 *         Plot border options
                 *
                 * @type      {number}
                 * @default   0
                 * @apioption chart.plotBorderWidth
                 */
                /**
                 * Whether to apply a drop shadow to the plot area. Requires that
                 * plotBackgroundColor be set. The shadow can be an object configuration
                 * containing `color`, `offsetX`, `offsetY`, `opacity` and `width`.
                 *
                 * @sample {highcharts} highcharts/chart/plotshadow/
                 *         Plot shadow
                 * @sample {highstock} stock/chart/plotshadow/
                 *         Plot shadow
                 * @sample {highmaps} maps/chart/plotborder/
                 *         Plot border options
                 *
                 * @type      {boolean|Highcharts.CSSObject}
                 * @default   false
                 * @apioption chart.plotShadow
                 */
                /**
                 * When true, cartesian charts like line, spline, area and column are
                 * transformed into the polar coordinate system. This produces _polar
                 * charts_, also known as _radar charts_.
                 *
                 * @sample {highcharts} highcharts/demo/polar/
                 *         Polar chart
                 * @sample {highcharts} highcharts/demo/polar-wind-rose/
                 *         Wind rose, stacked polar column chart
                 * @sample {highcharts} highcharts/demo/polar-spider/
                 *         Spider web chart
                 * @sample {highcharts} highcharts/parallel-coordinates/polar/
                 *         Star plot, multivariate data in a polar chart
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     2.3.0
                 * @product   highcharts
                 * @requires  highcharts-more
                 * @apioption chart.polar
                 */
                /**
                 * Whether to reflow the chart to fit the width of the container div
                 * on resizing the window.
                 *
                 * @sample {highcharts} highcharts/chart/reflow-true/
                 *         True by default
                 * @sample {highcharts} highcharts/chart/reflow-false/
                 *         False
                 * @sample {highstock} stock/chart/reflow-true/
                 *         True by default
                 * @sample {highstock} stock/chart/reflow-false/
                 *         False
                 * @sample {highmaps} maps/chart/reflow-true/
                 *         True by default
                 * @sample {highmaps} maps/chart/reflow-false/
                 *         False
                 *
                 * @type      {boolean}
                 * @default   true
                 * @since     2.1
                 * @apioption chart.reflow
                 */
                /**
                 * The HTML element where the chart will be rendered. If it is a string,
                 * the element by that id is used. The HTML element can also be passed
                 * by direct reference, or as the first argument of the chart
                 * constructor, in which case the option is not needed.
                 *
                 * @sample {highcharts} highcharts/chart/reflow-true/
                 *         String
                 * @sample {highcharts} highcharts/chart/renderto-object/
                 *         Object reference
                 * @sample {highcharts} highcharts/chart/renderto-jquery/
                 *         Object reference through jQuery
                 * @sample {highstock} stock/chart/renderto-string/
                 *         String
                 * @sample {highstock} stock/chart/renderto-object/
                 *         Object reference
                 * @sample {highstock} stock/chart/renderto-jquery/
                 *         Object reference through jQuery
                 *
                 * @type      {string|Highcharts.HTMLDOMElement}
                 * @apioption chart.renderTo
                 */
                /**
                 * The background color of the marker square when selecting (zooming
                 * in on) an area of the chart.
                 *
                 * @see In styled mode, the selection marker fill is set with the
                 *      `.highcharts-selection-marker` class.
                 *
                 * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @default   rgba(51,92,173,0.25)
                 * @since     2.1.7
                 * @apioption chart.selectionMarkerFill
                 */
                /**
                 * Whether to apply a drop shadow to the outer chart area. Requires
                 * that backgroundColor be set. The shadow can be an object
                 * configuration containing `color`, `offsetX`, `offsetY`, `opacity` and
                 * `width`.
                 *
                 * @sample {highcharts} highcharts/chart/shadow/
                 *         Shadow
                 * @sample {highstock} stock/chart/shadow/
                 *         Shadow
                 * @sample {highmaps} maps/chart/border/
                 *         Chart border and shadow
                 *
                 * @type      {boolean|Highcharts.CSSObject}
                 * @default   false
                 * @apioption chart.shadow
                 */
                /**
                 * Whether to show the axes initially. This only applies to empty charts
                 * where series are added dynamically, as axes are automatically added
                 * to cartesian series.
                 *
                 * @sample {highcharts} highcharts/chart/showaxes-false/
                 *         False by default
                 * @sample {highcharts} highcharts/chart/showaxes-true/
                 *         True
                 *
                 * @type      {boolean}
                 * @since     1.2.5
                 * @product   highcharts gantt
                 * @apioption chart.showAxes
                 */
                /**
                 * The space between the bottom edge of the chart and the content (plot
                 * area, axis title and labels, title, subtitle or legend in top
                 * position).
                 *
                 * @sample {highcharts} highcharts/chart/spacingbottom/
                 *         Spacing bottom set to 100
                 * @sample {highstock} stock/chart/spacingbottom/
                 *         Spacing bottom set to 100
                 * @sample {highmaps} maps/chart/spacing/
                 *         Spacing 100 all around
                 *
                 * @type      {number}
                 * @default   15
                 * @since     2.1
                 * @apioption chart.spacingBottom
                 */
                /**
                 * The space between the left edge of the chart and the content (plot
                 * area, axis title and labels, title, subtitle or legend in top
                 * position).
                 *
                 * @sample {highcharts} highcharts/chart/spacingleft/
                 *         Spacing left set to 100
                 * @sample {highstock} stock/chart/spacingleft/
                 *         Spacing left set to 100
                 * @sample {highmaps} maps/chart/spacing/
                 *         Spacing 100 all around
                 *
                 * @type      {number}
                 * @default   10
                 * @since     2.1
                 * @apioption chart.spacingLeft
                 */
                /**
                 * The space between the right edge of the chart and the content (plot
                 * area, axis title and labels, title, subtitle or legend in top
                 * position).
                 *
                 * @sample {highcharts} highcharts/chart/spacingright-100/
                 *         Spacing set to 100
                 * @sample {highcharts} highcharts/chart/spacingright-legend/
                 *         Legend in right position with default spacing
                 * @sample {highstock} stock/chart/spacingright/
                 *         Spacing set to 100
                 * @sample {highmaps} maps/chart/spacing/
                 *         Spacing 100 all around
                 *
                 * @type      {number}
                 * @default   10
                 * @since     2.1
                 * @apioption chart.spacingRight
                 */
                /**
                 * The space between the top edge of the chart and the content (plot
                 * area, axis title and labels, title, subtitle or legend in top
                 * position).
                 *
                 * @sample {highcharts} highcharts/chart/spacingtop-100/
                 *         A top spacing of 100
                 * @sample {highcharts} highcharts/chart/spacingtop-10/
                 *         Floating chart title makes the plot area align to the default
                 *         spacingTop of 10.
                 * @sample {highstock} stock/chart/spacingtop/
                 *         A top spacing of 100
                 * @sample {highmaps} maps/chart/spacing/
                 *         Spacing 100 all around
                 *
                 * @type      {number}
                 * @default   10
                 * @since     2.1
                 * @apioption chart.spacingTop
                 */
                /**
                 * Additional CSS styles to apply inline to the container `div`. Note
                 * that since the default font styles are applied in the renderer, it
                 * is ignorant of the individual chart options and must be set globally.
                 *
                 * @see    In styled mode, general chart styles can be set with the
                 *         `.highcharts-root` class.
                 * @sample {highcharts} highcharts/chart/style-serif-font/
                 *         Using a serif type font
                 * @sample {highcharts} highcharts/css/em/
                 *         Styled mode with relative font sizes
                 * @sample {highstock} stock/chart/style/
                 *         Using a serif type font
                 * @sample {highmaps} maps/chart/style-serif-font/
                 *         Using a serif type font
                 *
                 * @type      {Highcharts.CSSObject}
                 * @default   {"fontFamily": "\"Lucida Grande\", \"Lucida Sans Unicode\", Verdana, Arial, Helvetica, sans-serif","fontSize":"12px"}
                 * @apioption chart.style
                 */
                /**
                 * The default series type for the chart. Can be any of the chart types
                 * listed under [plotOptions](#plotOptions) and [series](#series) or can
                 * be a series provided by an additional module.
                 *
                 * In TypeScript this option has no effect in sense of typing and
                 * instead the `type` option must always be set in the series.
                 *
                 * @sample {highcharts} highcharts/chart/type-bar/
                 *         Bar
                 * @sample {highstock} stock/chart/type/
                 *         Areaspline
                 * @sample {highmaps} maps/chart/type-mapline/
                 *         Mapline
                 *
                 * @type       {string}
                 * @default    {highcharts} line
                 * @default    {highstock} line
                 * @default    {highmaps} map
                 * @since      2.1.0
                 * @apioption  chart.type
                 */
                /**
                 * Decides in what dimensions the user can zoom by dragging the mouse.
                 * Can be one of `x`, `y` or `xy`.
                 *
                 * @see [panKey](#chart.panKey)
                 *
                 * @sample {highcharts} highcharts/chart/zoomtype-none/
                 *         None by default
                 * @sample {highcharts} highcharts/chart/zoomtype-x/
                 *         X
                 * @sample {highcharts} highcharts/chart/zoomtype-y/
                 *         Y
                 * @sample {highcharts} highcharts/chart/zoomtype-xy/
                 *         Xy
                 * @sample {highstock} stock/demo/basic-line/
                 *         None by default
                 * @sample {highstock} stock/chart/zoomtype-x/
                 *         X
                 * @sample {highstock} stock/chart/zoomtype-y/
                 *         Y
                 * @sample {highstock} stock/chart/zoomtype-xy/
                 *         Xy
                 *
                 * @type       {string}
                 * @product    highcharts highstock gantt
                 * @validvalue ["x", "y", "xy"]
                 * @apioption  chart.zoomType
                 */
                /**
                 * An explicit width for the chart. By default (when `null`) the width
                 * is calculated from the offset width of the containing element.
                 *
                 * @sample {highcharts} highcharts/chart/width/
                 *         800px wide
                 * @sample {highstock} stock/chart/width/
                 *         800px wide
                 * @sample {highmaps} maps/chart/size/
                 *         Chart with explicit size
                 *
                 * @type {null|number|string}
                 */
                width: null,
                /**
                 * An explicit height for the chart. If a _number_, the height is
                 * given in pixels. If given a _percentage string_ (for example
                 * `'56%'`), the height is given as the percentage of the actual chart
                 * width. This allows for preserving the aspect ratio across responsive
                 * sizes.
                 *
                 * By default (when `null`) the height is calculated from the offset
                 * height of the containing element, or 400 pixels if the containing
                 * element's height is 0.
                 *
                 * @sample {highcharts} highcharts/chart/height/
                 *         500px height
                 * @sample {highstock} stock/chart/height/
                 *         300px height
                 * @sample {highmaps} maps/chart/size/
                 *         Chart with explicit size
                 * @sample highcharts/chart/height-percent/
                 *         Highcharts with percentage height
                 *
                 * @type {null|number|string}
                 */
                height: null,
                /**
                 * The color of the outer chart border.
                 *
                 * @see In styled mode, the stroke is set with the
                 *      `.highcharts-background` class.
                 *
                 * @sample {highcharts} highcharts/chart/bordercolor/
                 *         Brown border
                 * @sample {highstock} stock/chart/border/
                 *         Brown border
                 * @sample {highmaps} maps/chart/border/
                 *         Border options
                 *
                 * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 */
                borderColor: '#335cad',
                /**
                 * The pixel width of the outer chart border.
                 *
                 * @see In styled mode, the stroke is set with the
                 *      `.highcharts-background` class.
                 *
                 * @sample {highcharts} highcharts/chart/borderwidth/
                 *         5px border
                 * @sample {highstock} stock/chart/border/
                 *         2px border
                 * @sample {highmaps} maps/chart/border/
                 *         Border options
                 *
                 * @type      {number}
                 * @default   0
                 * @apioption chart.borderWidth
                 */
                /**
                 * The background color or gradient for the outer chart area.
                 *
                 * @see In styled mode, the background is set with the
                 *      `.highcharts-background` class.
                 *
                 * @sample {highcharts} highcharts/chart/backgroundcolor-color/
                 *         Color
                 * @sample {highcharts} highcharts/chart/backgroundcolor-gradient/
                 *         Gradient
                 * @sample {highstock} stock/chart/backgroundcolor-color/
                 *         Color
                 * @sample {highstock} stock/chart/backgroundcolor-gradient/
                 *         Gradient
                 * @sample {highmaps} maps/chart/backgroundcolor-color/
                 *         Color
                 * @sample {highmaps} maps/chart/backgroundcolor-gradient/
                 *         Gradient
                 *
                 * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 */
                backgroundColor: '#ffffff',
                /**
                 * The background color or gradient for the plot area.
                 *
                 * @see In styled mode, the plot background is set with the
                 *      `.highcharts-plot-background` class.
                 *
                 * @sample {highcharts} highcharts/chart/plotbackgroundcolor-color/
                 *         Color
                 * @sample {highcharts} highcharts/chart/plotbackgroundcolor-gradient/
                 *         Gradient
                 * @sample {highstock} stock/chart/plotbackgroundcolor-color/
                 *         Color
                 * @sample {highstock} stock/chart/plotbackgroundcolor-gradient/
                 *         Gradient
                 * @sample {highmaps} maps/chart/plotbackgroundcolor-color/
                 *         Color
                 * @sample {highmaps} maps/chart/plotbackgroundcolor-gradient/
                 *         Gradient
                 *
                 * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @apioption chart.plotBackgroundColor
                 */
                /**
                 * The URL for an image to use as the plot background. To set an image
                 * as the background for the entire chart, set a CSS background image
                 * to the container element. Note that for the image to be applied to
                 * exported charts, its URL needs to be accessible by the export server.
                 *
                 * @see In styled mode, a plot background image can be set with the
                 *      `.highcharts-plot-background` class and a [custom pattern](
                 *      https://www.highcharts.com/docs/chart-design-and-style/
                 *      gradients-shadows-and-patterns).
                 *
                 * @sample {highcharts} highcharts/chart/plotbackgroundimage/
                 *         Skies
                 * @sample {highstock} stock/chart/plotbackgroundimage/
                 *         Skies
                 *
                 * @type      {string}
                 * @apioption chart.plotBackgroundImage
                 */
                /**
                 * The color of the inner chart or plot area border.
                 *
                 * @see In styled mode, a plot border stroke can be set with the
                 *      `.highcharts-plot-border` class.
                 *
                 * @sample {highcharts} highcharts/chart/plotbordercolor/
                 *         Blue border
                 * @sample {highstock} stock/chart/plotborder/
                 *         Blue border
                 * @sample {highmaps} maps/chart/plotborder/
                 *         Plot border options
                 *
                 * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 */
                plotBorderColor: '#cccccc'
            },
            /**
             * The chart's main title.
             *
             * @sample {highmaps} maps/title/title/
             *         Title options demonstrated
             */
            title: {
                /**
                 * When the title is floating, the plot area will not move to make space
                 * for it.
                 *
                 * @sample {highcharts} highcharts/chart/zoomtype-none/
                 *         False by default
                 * @sample {highcharts} highcharts/title/floating/
                 *         True - title on top of the plot area
                 * @sample {highstock} stock/chart/title-floating/
                 *         True - title on top of the plot area
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     2.1
                 * @apioption title.floating
                 */
                /**
                 * CSS styles for the title. Use this for font styling, but use `align`,
                 * `x` and `y` for text alignment.
                 *
                 * In styled mode, the title style is given in the `.highcharts-title`
                 * class.
                 *
                 * @sample {highcharts} highcharts/title/style/
                 *         Custom color and weight
                 * @sample {highstock} stock/chart/title-style/
                 *         Custom color and weight
                 * @sample highcharts/css/titles/
                 *         Styled mode
                 *
                 * @type      {Highcharts.CSSObject}
                 * @default   {highcharts|highmaps} { "color": "#333333", "fontSize": "18px" }
                 * @default   {highstock} { "color": "#333333", "fontSize": "16px" }
                 * @apioption title.style
                 */
                /**
                 * Whether to
                 * [use HTML](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting#html)
                 * to render the text.
                 *
                 * @type      {boolean}
                 * @default   false
                 * @apioption title.useHTML
                 */
                /**
                 * The vertical alignment of the title. Can be one of `"top"`,
                 * `"middle"` and `"bottom"`. When a value is given, the title behaves
                 * as if [floating](#title.floating) were `true`.
                 *
                 * @sample {highcharts} highcharts/title/verticalalign/
                 *         Chart title in bottom right corner
                 * @sample {highstock} stock/chart/title-verticalalign/
                 *         Chart title in bottom right corner
                 *
                 * @type      {Highcharts.VerticalAlignValue}
                 * @since     2.1
                 * @apioption title.verticalAlign
                 */
                /**
                 * The x position of the title relative to the alignment within
                 * `chart.spacingLeft` and `chart.spacingRight`.
                 *
                 * @sample {highcharts} highcharts/title/align/
                 *         Aligned to the plot area (x = 70px = margin left - spacing
                 *         left)
                 * @sample {highstock} stock/chart/title-align/
                 *         Aligned to the plot area (x = 50px = margin left - spacing
                 *         left)
                 *
                 * @type      {number}
                 * @default   0
                 * @since     2.0
                 * @apioption title.x
                 */
                /**
                 * The y position of the title relative to the alignment within
                 * [chart.spacingTop](#chart.spacingTop) and [chart.spacingBottom](
                 * #chart.spacingBottom). By default it depends on the font size.
                 *
                 * @sample {highcharts} highcharts/title/y/
                 *         Title inside the plot area
                 * @sample {highstock} stock/chart/title-verticalalign/
                 *         Chart title in bottom right corner
                 *
                 * @type      {number}
                 * @since     2.0
                 * @apioption title.y
                 */
                /**
                 * The title of the chart. To disable the title, set the `text` to
                 * `undefined`.
                 *
                 * @sample {highcharts} highcharts/title/text/
                 *         Custom title
                 * @sample {highstock} stock/chart/title-text/
                 *         Custom title
                 *
                 * @default {highcharts|highmaps} Chart title
                 * @default {highstock} undefined
                 */
                text: 'Chart title',
                /**
                 * The horizontal alignment of the title. Can be one of "left", "center"
                 * and "right".
                 *
                 * @sample {highcharts} highcharts/title/align/
                 *         Aligned to the plot area (x = 70px = margin left - spacing
                 *         left)
                 * @sample {highstock} stock/chart/title-align/
                 *         Aligned to the plot area (x = 50px = margin left - spacing
                 *         left)
                 *
                 * @type  {Highcharts.AlignValue}
                 * @since 2.0
                 */
                align: 'center',
                /**
                 * The margin between the title and the plot area, or if a subtitle
                 * is present, the margin between the subtitle and the plot area.
                 *
                 * @sample {highcharts} highcharts/title/margin-50/
                 *         A chart title margin of 50
                 * @sample {highcharts} highcharts/title/margin-subtitle/
                 *         The same margin applied with a subtitle
                 * @sample {highstock} stock/chart/title-margin/
                 *         A chart title margin of 50
                 *
                 * @since 2.1
                 */
                margin: 15,
                /**
                 * Adjustment made to the title width, normally to reserve space for
                 * the exporting burger menu.
                 *
                 * @sample highcharts/title/widthadjust/
                 *         Wider menu, greater padding
                 *
                 * @since 4.2.5
                 */
                widthAdjust: -44
            },
            /**
             * The chart's subtitle. This can be used both to display a subtitle below
             * the main title, and to display random text anywhere in the chart. The
             * subtitle can be updated after chart initialization through the
             * `Chart.setTitle` method.
             *
             * @sample {highmaps} maps/title/subtitle/
             *         Subtitle options demonstrated
             */
            subtitle: {
                /**
                 * When the subtitle is floating, the plot area will not move to make
                 * space for it.
                 *
                 * @sample {highcharts} highcharts/subtitle/floating/
                 *         Floating title and subtitle
                 * @sample {highstock} stock/chart/subtitle-footnote
                 *         Footnote floating at bottom right of plot area
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     2.1
                 * @apioption subtitle.floating
                 */
                /**
                 * CSS styles for the title.
                 *
                 * In styled mode, the subtitle style is given in the
                 * `.highcharts-subtitle` class.
                 *
                 * @sample {highcharts} highcharts/subtitle/style/
                 *         Custom color and weight
                 * @sample {highcharts} highcharts/css/titles/
                 *         Styled mode
                 * @sample {highstock} stock/chart/subtitle-style
                 *         Custom color and weight
                 * @sample {highstock} highcharts/css/titles/
                 *         Styled mode
                 * @sample {highmaps} highcharts/css/titles/
                 *         Styled mode
                 *
                 * @type      {Highcharts.CSSObject}
                 * @default   {"color": "#666666"}
                 * @apioption subtitle.style
                 */
                /**
                 * Whether to
                 * [use HTML](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting#html)
                 * to render the text.
                 *
                 * @type      {boolean}
                 * @default   false
                 * @apioption subtitle.useHTML
                 */
                /**
                 * The vertical alignment of the title. Can be one of `"top"`,
                 * `"middle"` and `"bottom"`. When middle, the subtitle behaves as
                 * floating.
                 *
                 * @sample {highcharts} highcharts/subtitle/verticalalign/
                 *         Footnote at the bottom right of plot area
                 * @sample {highstock} stock/chart/subtitle-footnote
                 *         Footnote at the bottom right of plot area
                 *
                 * @type      {Highcharts.VerticalAlignValue}
                 * @since     2.1
                 * @apioption subtitle.verticalAlign
                 */
                /**
                 * The x position of the subtitle relative to the alignment within
                 * `chart.spacingLeft` and `chart.spacingRight`.
                 *
                 * @sample {highcharts} highcharts/subtitle/align/
                 *         Footnote at right of plot area
                 * @sample {highstock} stock/chart/subtitle-footnote
                 *         Footnote at the bottom right of plot area
                 *
                 * @type      {number}
                 * @default   0
                 * @since     2.0
                 * @apioption subtitle.x
                 */
                /**
                 * The y position of the subtitle relative to the alignment within
                 * `chart.spacingTop` and `chart.spacingBottom`. By default the subtitle
                 * is laid out below the title unless the title is floating.
                 *
                 * @sample {highcharts} highcharts/subtitle/verticalalign/
                 *         Footnote at the bottom right of plot area
                 * @sample {highstock} stock/chart/subtitle-footnote
                 *         Footnote at the bottom right of plot area
                 *
                 * @type      {number}
                 * @since     2.0
                 * @apioption subtitle.y
                 */
                /**
                 * The subtitle of the chart.
                 *
                 * @sample {highcharts|highstock} highcharts/subtitle/text/
                 *         Custom subtitle
                 * @sample {highcharts|highstock} highcharts/subtitle/text-formatted/
                 *         Formatted and linked text.
                 */
                text: '',
                /**
                 * The horizontal alignment of the subtitle. Can be one of "left",
                 *  "center" and "right".
                 *
                 * @sample {highcharts} highcharts/subtitle/align/
                 *         Footnote at right of plot area
                 * @sample {highstock} stock/chart/subtitle-footnote
                 *         Footnote at bottom right of plot area
                 *
                 * @type  {Highcharts.AlignValue}
                 * @since 2.0
                 */
                align: 'center',
                /**
                 * Adjustment made to the subtitle width, normally to reserve space
                 * for the exporting burger menu.
                 *
                 * @see [title.widthAdjust](#title.widthAdjust)
                 *
                 * @sample highcharts/title/widthadjust/
                 *         Wider menu, greater padding
                 *
                 * @since 4.2.5
                 */
                widthAdjust: -44
            },
            /**
             * The chart's caption, which will render below the chart and will be part
             * of exported charts. The caption can be updated after chart initialization
             * through the `Chart.update` or `Chart.caption.update` methods.
             *
             * @sample highcharts/caption/text/
             *         A chart with a caption
             * @since  7.2.0
             */
            caption: {
                /**
                 * When the caption is floating, the plot area will not move to make
                 * space for it.
                 *
                 * @type      {boolean}
                 * @default   false
                 * @apioption caption.floating
                 */
                /**
                 * The margin between the caption and the plot area.
                 */
                margin: 15,
                /**
                 * CSS styles for the caption.
                 *
                 * In styled mode, the caption style is given in the
                 * `.highcharts-caption` class.
                 *
                 * @sample {highcharts} highcharts/css/titles/
                 *         Styled mode
                 *
                 * @type      {Highcharts.CSSObject}
                 * @default   {"color": "#666666"}
                 * @apioption caption.style
                 */
                /**
                 * Whether to
                 * [use HTML](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting#html)
                 * to render the text.
                 *
                 * @type      {boolean}
                 * @default   false
                 * @apioption caption.useHTML
                 */
                /**
                 * The x position of the caption relative to the alignment within
                 * `chart.spacingLeft` and `chart.spacingRight`.
                 *
                 * @type      {number}
                 * @default   0
                 * @apioption caption.x
                 */
                /**
                 * The y position of the caption relative to the alignment within
                 * `chart.spacingTop` and `chart.spacingBottom`.
                 *
                 * @type      {number}
                 * @apioption caption.y
                 */
                /**
                 * The caption text of the chart.
                 *
                 * @sample {highcharts} highcharts/caption/text/
                 *         Custom caption
                 */
                text: '',
                /**
                 * The horizontal alignment of the caption. Can be one of "left",
                 *  "center" and "right".
                 *
                 * @type  {Highcharts.AlignValue}
                 */
                align: 'left',
                /**
                 * The vertical alignment of the caption. Can be one of `"top"`,
                 * `"middle"` and `"bottom"`. When middle, the caption behaves as
                 * floating.
                 *
                 * @type      {Highcharts.VerticalAlignValue}
                 */
                verticalAlign: 'bottom'
            },
            /**
             * The plotOptions is a wrapper object for config objects for each series
             * type. The config objects for each series can also be overridden for
             * each series item as given in the series array.
             *
             * Configuration options for the series are given in three levels. Options
             * for all series in a chart are given in the [plotOptions.series](
             * #plotOptions.series) object. Then options for all series of a specific
             * type are given in the plotOptions of that type, for example
             * `plotOptions.line`. Next, options for one single series are given in
             * [the series array](#series).
             */
            plotOptions: {},
            /**
             * HTML labels that can be positioned anywhere in the chart area.
             *
             * This option is deprecated since v7.1.2. Instead, use
             * [annotations](#annotations) that support labels.
             *
             * @deprecated
             * @product   highcharts highstock
             */
            labels: {
                /**
                 * An HTML label that can be positioned anywhere in the chart area.
                 *
                 * @deprecated
                 * @type      {Array<*>}
                 * @apioption labels.items
                 */
                /**
                 * Inner HTML or text for the label.
                 *
                 * @deprecated
                 * @type      {string}
                 * @apioption labels.items.html
                 */
                /**
                 * CSS styles for each label. To position the label, use left and top
                 * like this:
                 * ```js
                 * style: {
                 *     left: '100px',
                 *     top: '100px'
                 * }
                 * ```
                 *
                 * @deprecated
                 * @type      {Highcharts.CSSObject}
                 * @apioption labels.items.style
                 */
                /**
                 * Shared CSS styles for all labels.
                 *
                 * @deprecated
                 * @type    {Highcharts.CSSObject}
                 * @default {"color": "#333333", "position": "absolute"}
                 */
                style: {
                    /**
                     * @ignore-option
                     */
                    position: 'absolute',
                    /**
                     * @ignore-option
                     */
                    color: '#333333'
                }
            },
            /**
             * The legend is a box containing a symbol and name for each series
             * item or point item in the chart. Each series (or points in case
             * of pie charts) is represented by a symbol and its name in the legend.
             *
             * It is possible to override the symbol creator function and create
             * [custom legend symbols](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/studies/legend-custom-symbol/).
             *
             * @productdesc {highmaps}
             * A Highmaps legend by default contains one legend item per series, but if
             * a `colorAxis` is defined, the axis will be displayed in the legend.
             * Either as a gradient, or as multiple legend items for `dataClasses`.
             */
            legend: {
                /**
                 * The background color of the legend.
                 *
                 * @see In styled mode, the legend background fill can be applied with
                 *      the `.highcharts-legend-box` class.
                 *
                 * @sample {highcharts} highcharts/legend/backgroundcolor/
                 *         Yellowish background
                 * @sample {highstock} stock/legend/align/
                 *         Various legend options
                 * @sample {highmaps} maps/legend/border-background/
                 *         Border and background options
                 *
                 * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @apioption legend.backgroundColor
                 */
                /**
                 * The width of the drawn border around the legend.
                 *
                 * @see In styled mode, the legend border stroke width can be applied
                 *      with the `.highcharts-legend-box` class.
                 *
                 * @sample {highcharts} highcharts/legend/borderwidth/
                 *         2px border width
                 * @sample {highstock} stock/legend/align/
                 *         Various legend options
                 * @sample {highmaps} maps/legend/border-background/
                 *         Border and background options
                 *
                 * @type      {number}
                 * @default   0
                 * @apioption legend.borderWidth
                 */
                /**
                 * Enable or disable the legend. There is also a series-specific option,
                 * [showInLegend](#plotOptions.series.showInLegend), that can hide the
                 * series from the legend. In some series types this is `false` by
                 * default, so it must set to `true` in order to show the legend for the
                 * series.
                 *
                 * @sample {highcharts} highcharts/legend/enabled-false/ Legend disabled
                 * @sample {highstock} stock/legend/align/ Various legend options
                 * @sample {highmaps} maps/legend/enabled-false/ Legend disabled
                 *
                 * @default {highstock} false
                 * @default {highmaps} true
                 * @default {gantt} false
                 */
                enabled: true,
                /**
                 * The horizontal alignment of the legend box within the chart area.
                 * Valid values are `left`, `center` and `right`.
                 *
                 * In the case that the legend is aligned in a corner position, the
                 * `layout` option will determine whether to place it above/below
                 * or on the side of the plot area.
                 *
                 * @sample {highcharts} highcharts/legend/align/
                 *         Legend at the right of the chart
                 * @sample {highstock} stock/legend/align/
                 *         Various legend options
                 * @sample {highmaps} maps/legend/alignment/
                 *         Legend alignment
                 *
                 * @type  {Highcharts.AlignValue}
                 * @since 2.0
                 */
                align: 'center',
                /**
                 * If the [layout](legend.layout) is `horizontal` and the legend items
                 * span over two lines or more, whether to align the items into vertical
                 * columns. Setting this to `false` makes room for more items, but will
                 * look more messy.
                 *
                 * @since 6.1.0
                 */
                alignColumns: true,
                /**
                 * When the legend is floating, the plot area ignores it and is allowed
                 * to be placed below it.
                 *
                 * @sample {highcharts} highcharts/legend/floating-false/
                 *         False by default
                 * @sample {highcharts} highcharts/legend/floating-true/
                 *         True
                 * @sample {highmaps} maps/legend/alignment/
                 *         Floating legend
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     2.1
                 * @apioption legend.floating
                 */
                /**
                 * The layout of the legend items. Can be one of `horizontal` or
                 * `vertical` or `proximate`. When `proximate`, the legend items will be
                 * placed as close as possible to the graphs they're representing,
                 * except in inverted charts or when the legend position doesn't allow
                 * it.
                 *
                 * @sample {highcharts} highcharts/legend/layout-horizontal/
                 *         Horizontal by default
                 * @sample {highcharts} highcharts/legend/layout-vertical/
                 *         Vertical
                 * @sample highcharts/legend/layout-proximate
                 *         Labels proximate to the data
                 * @sample {highstock} stock/legend/layout-horizontal/
                 *         Horizontal by default
                 * @sample {highmaps} maps/legend/padding-itemmargin/
                 *         Vertical with data classes
                 * @sample {highmaps} maps/legend/layout-vertical/
                 *         Vertical with color axis gradient
                 *
                 * @validvalue ["horizontal", "vertical", "proximate"]
                 */
                layout: 'horizontal',
                /**
                 * In a legend with horizontal layout, the itemDistance defines the
                 * pixel distance between each item.
                 *
                 * @sample {highcharts} highcharts/legend/layout-horizontal/
                 *         50px item distance
                 * @sample {highstock} highcharts/legend/layout-horizontal/
                 *         50px item distance
                 *
                 * @type      {number}
                 * @default   {highcharts} 20
                 * @default   {highstock} 20
                 * @default   {highmaps} 8
                 * @since     3.0.3
                 * @apioption legend.itemDistance
                 */
                /**
                 * The pixel bottom margin for each legend item.
                 *
                 * @sample {highcharts|highstock} highcharts/legend/padding-itemmargin/
                 *         Padding and item margins demonstrated
                 * @sample {highmaps} maps/legend/padding-itemmargin/
                 *         Padding and item margins demonstrated
                 *
                 * @type      {number}
                 * @default   0
                 * @since     2.2.0
                 * @apioption legend.itemMarginBottom
                 */
                /**
                 * The pixel top margin for each legend item.
                 *
                 * @sample {highcharts|highstock} highcharts/legend/padding-itemmargin/
                 *         Padding and item margins demonstrated
                 * @sample {highmaps} maps/legend/padding-itemmargin/
                 *         Padding and item margins demonstrated
                 *
                 * @type      {number}
                 * @default   0
                 * @since     2.2.0
                 * @apioption legend.itemMarginTop
                 */
                /**
                 * The width for each legend item. By default the items are laid out
                 * successively. In a [horizontal layout](legend.layout), if the items
                 * are laid out across two rows or more, they will be vertically aligned
                 * depending on the [legend.alignColumns](legend.alignColumns) option.
                 *
                 * @sample {highcharts} highcharts/legend/itemwidth-default/
                 *         Undefined by default
                 * @sample {highcharts} highcharts/legend/itemwidth-80/
                 *         80 for aligned legend items
                 *
                 * @type      {number}
                 * @since     2.0
                 * @apioption legend.itemWidth
                 */
                /**
                 * A [format string](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting)
                 * for each legend label. Available variables relates to properties on
                 * the series, or the point in case of pies.
                 *
                 * @type      {string}
                 * @default   {name}
                 * @since     1.3
                 * @apioption legend.labelFormat
                 */
                /* eslint-disable valid-jsdoc */
                /**
                 * Callback function to format each of the series' labels. The `this`
                 * keyword refers to the series object, or the point object in case of
                 * pie charts. By default the series or point name is printed.
                 *
                 * @productdesc {highmaps}
                 * In Highmaps the context can also be a data class in case of a
                 * `colorAxis`.
                 *
                 * @sample {highcharts} highcharts/legend/labelformatter/
                 *         Add text
                 * @sample {highmaps} maps/legend/labelformatter/
                 *         Data classes with label formatter
                 *
                 * @type {Highcharts.FormatterCallbackFunction<Point|Series>}
                 */
                labelFormatter: function () {
                    /** eslint-enable valid-jsdoc */
                    return this.name;
                },
                /**
                 * Line height for the legend items. Deprecated as of 2.1\. Instead,
                 * the line height for each item can be set using
                 * `itemStyle.lineHeight`, and the padding between items using
                 * `itemMarginTop` and `itemMarginBottom`.
                 *
                 * @sample {highcharts} highcharts/legend/lineheight/
                 *         Setting padding
                 *
                 * @deprecated
                 *
                 * @type      {number}
                 * @default   16
                 * @since     2.0
                 * @product   highcharts gantt
                 * @apioption legend.lineHeight
                 */
                /**
                 * If the plot area sized is calculated automatically and the legend is
                 * not floating, the legend margin is the space between the legend and
                 * the axis labels or plot area.
                 *
                 * @sample {highcharts} highcharts/legend/margin-default/
                 *         12 pixels by default
                 * @sample {highcharts} highcharts/legend/margin-30/
                 *         30 pixels
                 *
                 * @type      {number}
                 * @default   12
                 * @since     2.1
                 * @apioption legend.margin
                 */
                /**
                 * Maximum pixel height for the legend. When the maximum height is
                 * extended, navigation will show.
                 *
                 * @type      {number}
                 * @since     2.3.0
                 * @apioption legend.maxHeight
                 */
                /**
                 * The color of the drawn border around the legend.
                 *
                 * @see In styled mode, the legend border stroke can be applied with the
                 *      `.highcharts-legend-box` class.
                 *
                 * @sample {highcharts} highcharts/legend/bordercolor/
                 *         Brown border
                 * @sample {highstock} stock/legend/align/
                 *         Various legend options
                 * @sample {highmaps} maps/legend/border-background/
                 *         Border and background options
                 *
                 * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 */
                borderColor: '#999999',
                /**
                 * The border corner radius of the legend.
                 *
                 * @sample {highcharts} highcharts/legend/borderradius-default/
                 *         Square by default
                 * @sample {highcharts} highcharts/legend/borderradius-round/
                 *         5px rounded
                 * @sample {highmaps} maps/legend/border-background/
                 *         Border and background options
                 */
                borderRadius: 0,
                /**
                 * Options for the paging or navigation appearing when the legend is
                 * overflown. Navigation works well on screen, but not in static
                 * exported images. One way of working around that is to
                 * [increase the chart height in
                 * export](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/legend/navigation-enabled-false/).
                 */
                navigation: {
                    /**
                     * How to animate the pages when navigating up or down. A value of
                     * `true` applies the default navigation given in the
                     * `chart.animation` option. Additional options can be given as an
                     * object containing values for easing and duration.
                     *
                     * @sample {highcharts} highcharts/legend/navigation/
                     *         Legend page navigation demonstrated
                     * @sample {highstock} highcharts/legend/navigation/
                     *         Legend page navigation demonstrated
                     *
                     * @type      {boolean|Highcharts.AnimationOptionsObject}
                     * @default   true
                     * @since     2.2.4
                     * @apioption legend.navigation.animation
                     */
                    /**
                     * The pixel size of the up and down arrows in the legend paging
                     * navigation.
                     *
                     * @sample {highcharts} highcharts/legend/navigation/
                     *         Legend page navigation demonstrated
                     * @sample {highstock} highcharts/legend/navigation/
                     *         Legend page navigation demonstrated
                     *
                     * @type      {number}
                     * @default   12
                     * @since     2.2.4
                     * @apioption legend.navigation.arrowSize
                     */
                    /**
                     * Whether to enable the legend navigation. In most cases, disabling
                     * the navigation results in an unwanted overflow.
                     *
                     * See also the [adapt chart to legend](
                     * https://www.highcharts.com/products/plugin-registry/single/8/Adapt-Chart-To-Legend)
                     * plugin for a solution to extend the chart height to make room for
                     * the legend, optionally in exported charts only.
                     *
                     * @type      {boolean}
                     * @default   true
                     * @since     4.2.4
                     * @apioption legend.navigation.enabled
                     */
                    /**
                     * Text styles for the legend page navigation.
                     *
                     * @see In styled mode, the navigation items are styled with the
                     *      `.highcharts-legend-navigation` class.
                     *
                     * @sample {highcharts} highcharts/legend/navigation/
                     *         Legend page navigation demonstrated
                     * @sample {highstock} highcharts/legend/navigation/
                     *         Legend page navigation demonstrated
                     *
                     * @type      {Highcharts.CSSObject}
                     * @since     2.2.4
                     * @apioption legend.navigation.style
                     */
                    /**
                     * The color for the active up or down arrow in the legend page
                     * navigation.
                     *
                     * @see In styled mode, the active arrow be styled with the
                     *      `.highcharts-legend-nav-active` class.
                     *
                     * @sample  {highcharts} highcharts/legend/navigation/
                     *          Legend page navigation demonstrated
                     * @sample  {highstock} highcharts/legend/navigation/
                     *          Legend page navigation demonstrated
                     *
                     * @type  {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                     * @since 2.2.4
                     */
                    activeColor: '#003399',
                    /**
                     * The color of the inactive up or down arrow in the legend page
                     * navigation. .
                     *
                     * @see In styled mode, the inactive arrow be styled with the
                     *      `.highcharts-legend-nav-inactive` class.
                     *
                     * @sample {highcharts} highcharts/legend/navigation/
                     *         Legend page navigation demonstrated
                     * @sample {highstock} highcharts/legend/navigation/
                     *         Legend page navigation demonstrated
                     *
                     * @type  {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                     * @since 2.2.4
                     */
                    inactiveColor: '#cccccc'
                },
                /**
                 * The inner padding of the legend box.
                 *
                 * @sample {highcharts|highstock} highcharts/legend/padding-itemmargin/
                 *         Padding and item margins demonstrated
                 * @sample {highmaps} maps/legend/padding-itemmargin/
                 *         Padding and item margins demonstrated
                 *
                 * @type      {number}
                 * @default   8
                 * @since     2.2.0
                 * @apioption legend.padding
                 */
                /**
                 * Whether to reverse the order of the legend items compared to the
                 * order of the series or points as defined in the configuration object.
                 *
                 * @see [yAxis.reversedStacks](#yAxis.reversedStacks),
                 *      [series.legendIndex](#series.legendIndex)
                 *
                 * @sample {highcharts} highcharts/legend/reversed/
                 *         Stacked bar with reversed legend
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     1.2.5
                 * @apioption legend.reversed
                 */
                /**
                 * Whether to show the symbol on the right side of the text rather than
                 * the left side. This is common in Arabic and Hebraic.
                 *
                 * @sample {highcharts} highcharts/legend/rtl/
                 *         Symbol to the right
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     2.2
                 * @apioption legend.rtl
                 */
                /**
                 * CSS styles for the legend area. In the 1.x versions the position
                 * of the legend area was determined by CSS. In 2.x, the position is
                 * determined by properties like `align`, `verticalAlign`, `x` and `y`,
                 * but the styles are still parsed for backwards compatibility.
                 *
                 * @deprecated
                 *
                 * @type      {Highcharts.CSSObject}
                 * @product   highcharts highstock
                 * @apioption legend.style
                 */
                /**
                 * CSS styles for each legend item. Only a subset of CSS is supported,
                 * notably those options related to text. The default `textOverflow`
                 * property makes long texts truncate. Set it to `undefined` to wrap
                 * text instead. A `width` property can be added to control the text
                 * width.
                 *
                 * @see In styled mode, the legend items can be styled with the
                 *      `.highcharts-legend-item` class.
                 *
                 * @sample {highcharts} highcharts/legend/itemstyle/
                 *         Bold black text
                 * @sample {highmaps} maps/legend/itemstyle/
                 *         Item text styles
                 *
                 * @type    {Highcharts.CSSObject}
                 * @default {"color": "#333333", "cursor": "pointer", "fontSize": "12px", "fontWeight": "bold", "textOverflow": "ellipsis"}
                 */
                itemStyle: {
                    /**
                     * @ignore
                     */
                    color: '#333333',
                    /**
                     * @ignore
                     */
                    cursor: 'pointer',
                    /**
                     * @ignore
                     */
                    fontSize: '12px',
                    /**
                     * @ignore
                     */
                    fontWeight: 'bold',
                    /**
                     * @ignore
                     */
                    textOverflow: 'ellipsis'
                },
                /**
                 * CSS styles for each legend item in hover mode. Only a subset of
                 * CSS is supported, notably those options related to text. Properties
                 * are inherited from `style` unless overridden here.
                 *
                 * @see In styled mode, the hovered legend items can be styled with
                 *      the `.highcharts-legend-item:hover` pesudo-class.
                 *
                 * @sample {highcharts} highcharts/legend/itemhoverstyle/
                 *         Red on hover
                 * @sample {highmaps} maps/legend/itemstyle/
                 *         Item text styles
                 *
                 * @type    {Highcharts.CSSObject}
                 * @default {"color": "#000000"}
                 */
                itemHoverStyle: {
                    /**
                     * @ignore
                     */
                    color: '#000000'
                },
                /**
                 * CSS styles for each legend item when the corresponding series or
                 * point is hidden. Only a subset of CSS is supported, notably those
                 * options related to text. Properties are inherited from `style`
                 * unless overridden here.
                 *
                 * @see In styled mode, the hidden legend items can be styled with
                 *      the `.highcharts-legend-item-hidden` class.
                 *
                 * @sample {highcharts} highcharts/legend/itemhiddenstyle/
                 *         Darker gray color
                 *
                 * @type    {Highcharts.CSSObject}
                 * @default {"color": "#cccccc"}
                 */
                itemHiddenStyle: {
                    /**
                     * @ignore
                     */
                    color: '#cccccc'
                },
                /**
                 * Whether to apply a drop shadow to the legend. A `backgroundColor`
                 * also needs to be applied for this to take effect. The shadow can be
                 * an object configuration containing `color`, `offsetX`, `offsetY`,
                 * `opacity` and `width`.
                 *
                 * @sample {highcharts} highcharts/legend/shadow/
                 *         White background and drop shadow
                 * @sample {highstock} stock/legend/align/
                 *         Various legend options
                 * @sample {highmaps} maps/legend/border-background/
                 *         Border and background options
                 *
                 * @type {boolean|Highcharts.CSSObject}
                 */
                shadow: false,
                /**
                 * Default styling for the checkbox next to a legend item when
                 * `showCheckbox` is true.
                 *
                 * @type {Highcharts.CSSObject}
                 * @default {"width": "13px", "height": "13px", "position":"absolute"}
                 */
                itemCheckboxStyle: {
                    /**
                     * @ignore
                     */
                    position: 'absolute',
                    /**
                     * @ignore
                     */
                    width: '13px',
                    /**
                     * @ignore
                     */
                    height: '13px'
                },
                // itemWidth: undefined,
                /**
                 * When this is true, the legend symbol width will be the same as
                 * the symbol height, which in turn defaults to the font size of the
                 * legend items.
                 *
                 * @since 5.0.0
                 */
                squareSymbol: true,
                /**
                 * The pixel height of the symbol for series types that use a rectangle
                 * in the legend. Defaults to the font size of legend items.
                 *
                 * @productdesc {highmaps}
                 * In Highmaps, when the symbol is the gradient of a vertical color
                 * axis, the height defaults to 200.
                 *
                 * @sample {highmaps} maps/legend/layout-vertical-sized/
                 *         Sized vertical gradient
                 * @sample {highmaps} maps/legend/padding-itemmargin/
                 *         No distance between data classes
                 *
                 * @type      {number}
                 * @since     3.0.8
                 * @apioption legend.symbolHeight
                 */
                /**
                 * The border radius of the symbol for series types that use a rectangle
                 * in the legend. Defaults to half the `symbolHeight`.
                 *
                 * @sample {highcharts} highcharts/legend/symbolradius/
                 *         Round symbols
                 * @sample {highstock} highcharts/legend/symbolradius/
                 *         Round symbols
                 * @sample {highmaps} highcharts/legend/symbolradius/
                 *         Round symbols
                 *
                 * @type      {number}
                 * @since     3.0.8
                 * @apioption legend.symbolRadius
                 */
                /**
                 * The pixel width of the legend item symbol. When the `squareSymbol`
                 * option is set, this defaults to the `symbolHeight`, otherwise 16.
                 *
                 * @productdesc {highmaps}
                 * In Highmaps, when the symbol is the gradient of a horizontal color
                 * axis, the width defaults to 200.
                 *
                 * @sample {highcharts} highcharts/legend/symbolwidth/
                 *         Greater symbol width and padding
                 * @sample {highmaps} maps/legend/padding-itemmargin/
                 *         Padding and item margins demonstrated
                 * @sample {highmaps} maps/legend/layout-vertical-sized/
                 *         Sized vertical gradient
                 *
                 * @type      {number}
                 * @apioption legend.symbolWidth
                 */
                /**
                 * Whether to [use HTML](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting#html)
                 * to render the legend item texts.
                 *
                 * Prior to 4.1.7, when using HTML, [legend.navigation](
                 * #legend.navigation) was disabled.
                 *
                 * @type      {boolean}
                 * @default   false
                 * @apioption legend.useHTML
                 */
                /**
                 * The width of the legend box. If a number is set, it translates to
                 * pixels. Since v7.0.2 it allows setting a percent string of the full
                 * chart width, for example `40%`.
                 *
                 * Defaults to the full chart width from legends below or above the
                 * chart, half the chart width for legends to the left and right.
                 *
                 * @sample {highcharts} highcharts/legend/width/
                 *         Aligned to the plot area
                 * @sample {highcharts} highcharts/legend/width-percent/
                 *         A percent of the chart width
                 *
                 * @type      {number|string}
                 * @since     2.0
                 * @apioption legend.width
                 */
                /**
                 * The pixel padding between the legend item symbol and the legend
                 * item text.
                 *
                 * @sample {highcharts} highcharts/legend/symbolpadding/
                 *         Greater symbol width and padding
                 */
                symbolPadding: 5,
                /**
                 * The vertical alignment of the legend box. Can be one of `top`,
                 * `middle` or `bottom`. Vertical position can be further determined
                 * by the `y` option.
                 *
                 * In the case that the legend is aligned in a corner position, the
                 * `layout` option will determine whether to place it above/below
                 * or on the side of the plot area.
                 *
                 * When the [layout](#legend.layout) option is `proximate`, the
                 * `verticalAlign` option doesn't apply.
                 *
                 * @sample {highcharts} highcharts/legend/verticalalign/
                 *         Legend 100px from the top of the chart
                 * @sample {highstock} stock/legend/align/
                 *         Various legend options
                 * @sample {highmaps} maps/legend/alignment/
                 *         Legend alignment
                 *
                 * @type  {Highcharts.VerticalAlignValue}
                 * @since 2.0
                 */
                verticalAlign: 'bottom',
                // width: undefined,
                /**
                 * The x offset of the legend relative to its horizontal alignment
                 * `align` within chart.spacingLeft and chart.spacingRight. Negative
                 * x moves it to the left, positive x moves it to the right.
                 *
                 * @sample {highcharts} highcharts/legend/width/
                 *         Aligned to the plot area
                 *
                 * @since 2.0
                 */
                x: 0,
                /**
                 * The vertical offset of the legend relative to it's vertical alignment
                 * `verticalAlign` within chart.spacingTop and chart.spacingBottom.
                 *  Negative y moves it up, positive y moves it down.
                 *
                 * @sample {highcharts} highcharts/legend/verticalalign/
                 *         Legend 100px from the top of the chart
                 * @sample {highstock} stock/legend/align/
                 *         Various legend options
                 * @sample {highmaps} maps/legend/alignment/
                 *         Legend alignment
                 *
                 * @since 2.0
                 */
                y: 0,
                /**
                 * A title to be added on top of the legend.
                 *
                 * @sample {highcharts} highcharts/legend/title/
                 *         Legend title
                 * @sample {highmaps} maps/legend/alignment/
                 *         Legend with title
                 *
                 * @since 3.0
                 */
                title: {
                    /**
                     * A text or HTML string for the title.
                     *
                     * @type      {string}
                     * @since     3.0
                     * @apioption legend.title.text
                     */
                    /**
                     * Generic CSS styles for the legend title.
                     *
                     * @see In styled mode, the legend title is styled with the
                     *      `.highcharts-legend-title` class.
                     *
                     * @type    {Highcharts.CSSObject}
                     * @default {"fontWeight": "bold"}
                     * @since   3.0
                     */
                    style: {
                        /**
                         * @ignore
                         */
                        fontWeight: 'bold'
                    }
                }
            },
            /**
             * The loading options control the appearance of the loading screen
             * that covers the plot area on chart operations. This screen only
             * appears after an explicit call to `chart.showLoading()`. It is a
             * utility for developers to communicate to the end user that something
             * is going on, for example while retrieving new data via an XHR connection.
             * The "Loading..." text itself is not part of this configuration
             * object, but part of the `lang` object.
             */
            loading: {
                /**
                 * The duration in milliseconds of the fade out effect.
                 *
                 * @sample highcharts/loading/hideduration/
                 *         Fade in and out over a second
                 *
                 * @type      {number}
                 * @default   100
                 * @since     1.2.0
                 * @apioption loading.hideDuration
                 */
                /**
                 * The duration in milliseconds of the fade in effect.
                 *
                 * @sample highcharts/loading/hideduration/
                 *         Fade in and out over a second
                 *
                 * @type      {number}
                 * @default   100
                 * @since     1.2.0
                 * @apioption loading.showDuration
                 */
                /**
                 * CSS styles for the loading label `span`.
                 *
                 * @see In styled mode, the loading label is styled with the
                 *      `.highcharts-loading-inner` class.
                 *
                 * @sample {highcharts|highmaps} highcharts/loading/labelstyle/
                 *         Vertically centered
                 * @sample {highstock} stock/loading/general/
                 *         Label styles
                 *
                 * @type    {Highcharts.CSSObject}
                 * @default {"fontWeight": "bold", "position": "relative", "top": "45%"}
                 * @since   1.2.0
                 */
                labelStyle: {
                    /**
                     * @ignore
                     */
                    fontWeight: 'bold',
                    /**
                     * @ignore
                     */
                    position: 'relative',
                    /**
                     * @ignore
                     */
                    top: '45%'
                },
                /**
                 * CSS styles for the loading screen that covers the plot area.
                 *
                 * In styled mode, the loading label is styled with the
                 * `.highcharts-loading` class.
                 *
                 * @sample  {highcharts|highmaps} highcharts/loading/style/
                 *          Gray plot area, white text
                 * @sample  {highstock} stock/loading/general/
                 *          Gray plot area, white text
                 *
                 * @type    {Highcharts.CSSObject}
                 * @default {"position": "absolute", "backgroundColor": "#ffffff", "opacity": 0.5, "textAlign": "center"}
                 * @since   1.2.0
                 */
                style: {
                    /**
                     * @ignore
                     */
                    position: 'absolute',
                    /**
                     * @ignore
                     */
                    backgroundColor: '#ffffff',
                    /**
                     * @ignore
                     */
                    opacity: 0.5,
                    /**
                     * @ignore
                     */
                    textAlign: 'center'
                }
            },
            /**
             * Options for the tooltip that appears when the user hovers over a
             * series or point.
             *
             * @declare Highcharts.TooltipOptions
             */
            tooltip: {
                /**
                 * The color of the tooltip border. When `undefined`, the border takes
                 * the color of the corresponding series or point.
                 *
                 * @sample {highcharts} highcharts/tooltip/bordercolor-default/
                 *         Follow series by default
                 * @sample {highcharts} highcharts/tooltip/bordercolor-black/
                 *         Black border
                 * @sample {highstock} stock/tooltip/general/
                 *         Styled tooltip
                 * @sample {highmaps} maps/tooltip/background-border/
                 *         Background and border demo
                 *
                 * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @apioption tooltip.borderColor
                 */
                /**
                 * A CSS class name to apply to the tooltip's container div,
                 * allowing unique CSS styling for each chart.
                 *
                 * @type      {string}
                 * @apioption tooltip.className
                 */
                /**
                 * Since 4.1, the crosshair definitions are moved to the Axis object
                 * in order for a better separation from the tooltip. See
                 * [xAxis.crosshair](#xAxis.crosshair).
                 *
                 * @sample {highcharts} highcharts/tooltip/crosshairs-x/
                 *         Enable a crosshair for the x value
                 *
                 * @deprecated
                 *
                 * @type      {*}
                 * @default   true
                 * @apioption tooltip.crosshairs
                 */
                /**
                 * Distance from point to tooltip in pixels.
                 *
                 * @type      {number}
                 * @default   16
                 * @apioption tooltip.distance
                 */
                /**
                 * Whether the tooltip should follow the mouse as it moves across
                 * columns, pie slices and other point types with an extent.
                 * By default it behaves this way for pie, polygon, map, sankey
                 * and wordcloud series by override in the `plotOptions`
                 * for those series types.
                 *
                 * For touch moves to behave the same way, [followTouchMove](
                 * #tooltip.followTouchMove) must be `true` also.
                 *
                 * @type      {boolean}
                 * @default   {highcharts} false
                 * @default   {highstock} false
                 * @default   {highmaps} true
                 * @since     3.0
                 * @apioption tooltip.followPointer
                 */
                /**
                 * Whether the tooltip should update as the finger moves on a touch
                 * device. If this is `true` and [chart.panning](#chart.panning) is
                 * set,`followTouchMove` will take over one-finger touches, so the user
                 * needs to use two fingers for zooming and panning.
                 *
                 * Note the difference to [followPointer](#tooltip.followPointer) that
                 * only defines the _position_ of the tooltip. If `followPointer` is
                 * false in for example a column series, the tooltip will show above or
                 * below the column, but as `followTouchMove` is true, the tooltip will
                 * jump from column to column as the user swipes across the plot area.
                 *
                 * @type      {boolean}
                 * @default   {highcharts} true
                 * @default   {highstock} true
                 * @default   {highmaps} false
                 * @since     3.0.1
                 * @apioption tooltip.followTouchMove
                 */
                /**
                 * Callback function to format the text of the tooltip from scratch. In
                 * case of single or [shared](#tooltip.shared) tooltips, a string should
                 * be returned. In case of [split](#tooltip.split) tooltips, it should
                 * return an array where the first item is the header, and subsequent
                 * items are mapped to the points. Return `false` to disable tooltip for
                 * a specific point on series.
                 *
                 * A subset of HTML is supported. Unless `useHTML` is true, the HTML of
                 * the tooltip is parsed and converted to SVG, therefore this isn't a
                 * complete HTML renderer. The following HTML tags are supported: `b`,
                 * `br`, `em`, `i`, `span`, `strong`. Spans can be styled with a `style`
                 * attribute, but only text-related CSS, that is shared with SVG, is
                 * handled.
                 *
                 * The available data in the formatter differ a bit depending on whether
                 * the tooltip is shared or split, or belongs to a single point. In a
                 * shared/split tooltip, all properties except `x`, which is common for
                 * all points, are kept in an array, `this.points`.
                 *
                 * Available data are:
                 *
                 * - **this.percentage (not shared) /**
                 *   **this.points[i].percentage (shared)**:
                 *   Stacked series and pies only. The point's percentage of the total.
                 *
                 * - **this.point (not shared) / this.points[i].point (shared)**:
                 *   The point object. The point name, if defined, is available through
                 *   `this.point.name`.
                 *
                 * - **this.points**:
                 *   In a shared tooltip, this is an array containing all other
                 *   properties for each point.
                 *
                 * - **this.series (not shared) / this.points[i].series (shared)**:
                 *   The series object. The series name is available through
                 *   `this.series.name`.
                 *
                 * - **this.total (not shared) / this.points[i].total (shared)**:
                 *   Stacked series only. The total value at this point's x value.
                 *
                 * - **this.x**:
                 *   The x value. This property is the same regardless of the tooltip
                 *   being shared or not.
                 *
                 * - **this.y (not shared) / this.points[i].y (shared)**:
                 *   The y value.
                 *
                 * @sample {highcharts} highcharts/tooltip/formatter-simple/
                 *         Simple string formatting
                 * @sample {highcharts} highcharts/tooltip/formatter-shared/
                 *         Formatting with shared tooltip
                 * @sample {highcharts|highstock} highcharts/tooltip/formatter-split/
                 *         Formatting with split tooltip
                 * @sample highcharts/tooltip/formatter-conditional-default/
                 *         Extending default formatter
                 * @sample {highstock} stock/tooltip/formatter/
                 *         Formatting with shared tooltip
                 * @sample {highmaps} maps/tooltip/formatter/
                 *         String formatting
                 *
                 * @type      {Highcharts.TooltipFormatterCallbackFunction}
                 * @apioption tooltip.formatter
                 */
                /**
                 * Callback function to format the text of the tooltip for
                 * visible null points.
                 * Works analogously to [formatter](#tooltip.formatter).
                 *
                 * @sample highcharts/plotoptions/series-nullformat
                 *         Format data label and tooltip for null point.
                 *
                 * @type      {Highcharts.TooltipFormatterCallbackFunction}
                 * @apioption tooltip.nullFormatter
                 */
                /**
                 * The number of milliseconds to wait until the tooltip is hidden when
                 * mouse out from a point or chart.
                 *
                 * @type      {number}
                 * @default   500
                 * @since     3.0
                 * @apioption tooltip.hideDelay
                 */
                /**
                 * Whether to allow the tooltip to render outside the chart's SVG
                 * element box. By default (`false`), the tooltip is rendered within the
                 * chart's SVG element, which results in the tooltip being aligned
                 * inside the chart area. For small charts, this may result in clipping
                 * or overlapping. When `true`, a separate SVG element is created and
                 * overlaid on the page, allowing the tooltip to be aligned inside the
                 * page itself.
                 *
                 * Defaults to `true` if `chart.scrollablePlotArea` is activated,
                 * otherwise `false`.
                 *
                 * @sample highcharts/tooltip/outside
                 *         Small charts with tooltips outside
                 *
                 * @type      {boolean|undefined}
                 * @default   undefined
                 * @since     6.1.1
                 * @apioption tooltip.outside
                 */
                /**
                 * A callback function for formatting the HTML output for a single point
                 * in the tooltip. Like the `pointFormat` string, but with more
                 * flexibility.
                 *
                 * @type      {Highcharts.FormatterCallbackFunction<Highcharts.Point>}
                 * @since     4.1.0
                 * @context   Highcharts.Point
                 * @apioption tooltip.pointFormatter
                 */
                /**
                 * A callback function to place the tooltip in a default position. The
                 * callback receives three parameters: `labelWidth`, `labelHeight` and
                 * `point`, where point contains values for `plotX` and `plotY` telling
                 * where the reference point is in the plot area. Add `chart.plotLeft`
                 * and `chart.plotTop` to get the full coordinates.
                 *
                 * Since v7, when [tooltip.split](#tooltip.split) option is enabled,
                 * positioner is called for each of the boxes separately, including
                 * xAxis header. xAxis header is not a point, instead `point` argument
                 * contains info:
                 * `{ plotX: Number, plotY: Number, isHeader: Boolean }`
                 *
                 *
                 * The return should be an object containing x and y values, for example
                 * `{ x: 100, y: 100 }`.
                 *
                 * @sample {highcharts} highcharts/tooltip/positioner/
                 *         A fixed tooltip position
                 * @sample {highstock} stock/tooltip/positioner/
                 *         A fixed tooltip position on top of the chart
                 * @sample {highmaps} maps/tooltip/positioner/
                 *         A fixed tooltip position
                 * @sample {highstock} stock/tooltip/split-positioner/
                 *         Split tooltip with fixed positions
                 * @sample {highstock} stock/tooltip/positioner-scrollable-plotarea/
                 *         Scrollable plot area combined with tooltip positioner
                 *
                 * @type      {Highcharts.TooltipPositionerCallbackFunction}
                 * @since     2.2.4
                 * @apioption tooltip.positioner
                 */
                /**
                 * The name of a symbol to use for the border around the tooltip. Can
                 * be one of: `"callout"`, `"circle"`, or `"square"`. When
                 * [tooltip.split](#tooltip.split)
                 * option is enabled, shape is applied to all boxes except header, which
                 * is controlled by
                 * [tooltip.headerShape](#tooltip.headerShape).
                 *
                 * Custom callbacks for symbol path generation can also be added to
                 * `Highcharts.SVGRenderer.prototype.symbols` the same way as for
                 * [series.marker.symbol](plotOptions.line.marker.symbol).
                 *
                 * @type      {Highcharts.TooltipShapeValue}
                 * @default   callout
                 * @since     4.0
                 * @apioption tooltip.shape
                 */
                /**
                 * The name of a symbol to use for the border around the tooltip
                 * header. Applies only when [tooltip.split](#tooltip.split) is
                 * enabled.
                 *
                 * Custom callbacks for symbol path generation can also be added to
                 * `Highcharts.SVGRenderer.prototype.symbols` the same way as for
                 * [series.marker.symbol](plotOptions.line.marker.symbol).
                 *
                 * @see [tooltip.shape](#tooltip.shape)
                 *
                 * @sample {highstock} stock/tooltip/split-positioner/
                 *         Different shapes for header and split boxes
                 *
                 * @type       {Highcharts.TooltipShapeValue}
                 * @default    callout
                 * @validvalue ["callout", "square"]
                 * @since      7.0
                 * @apioption  tooltip.headerShape
                 */
                /**
                 * When the tooltip is shared, the entire plot area will capture mouse
                 * movement or touch events. Tooltip texts for series types with ordered
                 * data (not pie, scatter, flags etc) will be shown in a single bubble.
                 * This is recommended for single series charts and for tablet/mobile
                 * optimized charts.
                 *
                 * See also [tooltip.split](#tooltip.split), that is better suited for
                 * charts with many series, especially line-type series. The
                 * `tooltip.split` option takes precedence over `tooltip.shared`.
                 *
                 * @sample {highcharts} highcharts/tooltip/shared-false/
                 *         False by default
                 * @sample {highcharts} highcharts/tooltip/shared-true/
                 *         True
                 * @sample {highcharts} highcharts/tooltip/shared-x-crosshair/
                 *         True with x axis crosshair
                 * @sample {highcharts} highcharts/tooltip/shared-true-mixed-types/
                 *         True with mixed series types
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     2.1
                 * @product   highcharts highstock
                 * @apioption tooltip.shared
                 */
                /**
                 * Split the tooltip into one label per series, with the header close
                 * to the axis. This is recommended over [shared](#tooltip.shared)
                 * tooltips for charts with multiple line series, generally making them
                 * easier to read. This option takes precedence over `tooltip.shared`.
                 *
                 * @productdesc {highstock} In Highstock, tooltips are split by default
                 * since v6.0.0. Stock charts typically contain multi-dimension points
                 * and multiple panes, making split tooltips the preferred layout over
                 * the previous `shared` tooltip.
                 *
                 * @sample highcharts/tooltip/split/
                 *         Split tooltip
                 * @sample {highcharts|highstock} highcharts/tooltip/formatter-split/
                 *         Split tooltip and custom formatter callback
                 *
                 * @type      {boolean}
                 * @default   {highcharts} false
                 * @default   {highstock} true
                 * @since     5.0.0
                 * @product   highcharts highstock
                 * @apioption tooltip.split
                 */
                /**
                 * Prevents the tooltip from switching or closing, when touched or
                 * pointed.
                 *
                 * @sample highcharts/tooltip/stickoncontact/
                 *         Tooltip sticks on pointer contact
                 *
                 * @type      {boolean}
                 * @since     8.0.1
                 * @apioption tooltip.stickOnContact
                 */
                /**
                 * Use HTML to render the contents of the tooltip instead of SVG. Using
                 * HTML allows advanced formatting like tables and images in the
                 * tooltip. It is also recommended for rtl languages as it works around
                 * rtl bugs in early Firefox.
                 *
                 * @sample {highcharts|highstock} highcharts/tooltip/footerformat/
                 *         A table for value alignment
                 * @sample {highcharts|highstock} highcharts/tooltip/fullhtml/
                 *         Full HTML tooltip
                 * @sample {highmaps} maps/tooltip/usehtml/
                 *         Pure HTML tooltip
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     2.2
                 * @apioption tooltip.useHTML
                 */
                /**
                 * How many decimals to show in each series' y value. This is
                 * overridable in each series' tooltip options object. The default is to
                 * preserve all decimals.
                 *
                 * @sample {highcharts|highstock} highcharts/tooltip/valuedecimals/
                 *         Set decimals, prefix and suffix for the value
                 * @sample {highmaps} maps/tooltip/valuedecimals/
                 *         Set decimals, prefix and suffix for the value
                 *
                 * @type      {number}
                 * @since     2.2
                 * @apioption tooltip.valueDecimals
                 */
                /**
                 * A string to prepend to each series' y value. Overridable in each
                 * series' tooltip options object.
                 *
                 * @sample {highcharts|highstock} highcharts/tooltip/valuedecimals/
                 *         Set decimals, prefix and suffix for the value
                 * @sample {highmaps} maps/tooltip/valuedecimals/
                 *         Set decimals, prefix and suffix for the value
                 *
                 * @type      {string}
                 * @since     2.2
                 * @apioption tooltip.valuePrefix
                 */
                /**
                 * A string to append to each series' y value. Overridable in each
                 * series' tooltip options object.
                 *
                 * @sample {highcharts|highstock} highcharts/tooltip/valuedecimals/
                 *         Set decimals, prefix and suffix for the value
                 * @sample {highmaps} maps/tooltip/valuedecimals/
                 *         Set decimals, prefix and suffix for the value
                 *
                 * @type      {string}
                 * @since     2.2
                 * @apioption tooltip.valueSuffix
                 */
                /**
                 * The format for the date in the tooltip header if the X axis is a
                 * datetime axis. The default is a best guess based on the smallest
                 * distance between points in the chart.
                 *
                 * @sample {highcharts} highcharts/tooltip/xdateformat/
                 *         A different format
                 *
                 * @type      {string}
                 * @product   highcharts highstock gantt
                 * @apioption tooltip.xDateFormat
                 */
                /**
                 * How many decimals to show for the `point.change` value when the
                 * `series.compare` option is set. This is overridable in each series'
                 * tooltip options object. The default is to preserve all decimals.
                 *
                 * @type      {number}
                 * @since     1.0.1
                 * @product   highstock
                 * @apioption tooltip.changeDecimals
                 */
                /**
                 * Enable or disable the tooltip.
                 *
                 * @sample {highcharts} highcharts/tooltip/enabled/
                 *         Disabled
                 * @sample {highcharts} highcharts/plotoptions/series-point-events-mouseover/
                 *         Disable tooltip and show values on chart instead
                 */
                enabled: true,
                /**
                 * Enable or disable animation of the tooltip.
                 *
                 * @type       {boolean}
                 * @default    true
                 * @since      2.3.0
                 */
                animation: svg,
                /**
                 * The radius of the rounded border corners.
                 *
                 * @sample {highcharts} highcharts/tooltip/bordercolor-default/
                 *         5px by default
                 * @sample {highcharts} highcharts/tooltip/borderradius-0/
                 *         Square borders
                 * @sample {highmaps} maps/tooltip/background-border/
                 *         Background and border demo
                 */
                borderRadius: 3,
                /**
                 * For series on a datetime axes, the date format in the tooltip's
                 * header will by default be guessed based on the closest data points.
                 * This member gives the default string representations used for
                 * each unit. For an overview of the replacement codes, see
                 * [dateFormat](/class-reference/Highcharts#dateFormat).
                 *
                 * @see [xAxis.dateTimeLabelFormats](#xAxis.dateTimeLabelFormats)
                 *
                 * @type    {Highcharts.Dictionary<string>}
                 * @product highcharts highstock gantt
                 */
                dateTimeLabelFormats: {
                    /** @internal */
                    millisecond: '%A, %b %e, %H:%M:%S.%L',
                    /** @internal */
                    second: '%A, %b %e, %H:%M:%S',
                    /** @internal */
                    minute: '%A, %b %e, %H:%M',
                    /** @internal */
                    hour: '%A, %b %e, %H:%M',
                    /** @internal */
                    day: '%A, %b %e, %Y',
                    /** @internal */
                    week: 'Week from %A, %b %e, %Y',
                    /** @internal */
                    month: '%B %Y',
                    /** @internal */
                    year: '%Y'
                },
                /**
                 * A string to append to the tooltip format.
                 *
                 * @sample {highcharts} highcharts/tooltip/footerformat/
                 *         A table for value alignment
                 * @sample {highmaps} maps/tooltip/format/
                 *         Format demo
                 *
                 * @since 2.2
                 */
                footerFormat: '',
                /**
                 * Padding inside the tooltip, in pixels.
                 *
                 * @since      5.0.0
                 */
                padding: 8,
                /**
                 * Proximity snap for graphs or single points. It defaults to 10 for
                 * mouse-powered devices and 25 for touch devices.
                 *
                 * Note that in most cases the whole plot area captures the mouse
                 * movement, and in these cases `tooltip.snap` doesn't make sense. This
                 * applies when [stickyTracking](#plotOptions.series.stickyTracking)
                 * is `true` (default) and when the tooltip is [shared](#tooltip.shared)
                 * or [split](#tooltip.split).
                 *
                 * @sample {highcharts} highcharts/tooltip/bordercolor-default/
                 *         10 px by default
                 * @sample {highcharts} highcharts/tooltip/snap-50/
                 *         50 px on graph
                 *
                 * @type    {number}
                 * @default 10/25
                 * @since   1.2.0
                 * @product highcharts highstock
                 */
                snap: isTouchDevice ? 25 : 10,
                /**
                 * The HTML of the tooltip header line. Variables are enclosed by
                 * curly brackets. Available variables are `point.key`, `series.name`,
                 * `series.color` and other members from the `point` and `series`
                 * objects. The `point.key` variable contains the category name, x
                 * value or datetime string depending on the type of axis. For datetime
                 * axes, the `point.key` date format can be set using
                 * `tooltip.xDateFormat`.
                 *
                 * @sample {highcharts} highcharts/tooltip/footerformat/
                 *         An HTML table in the tooltip
                 * @sample {highstock} highcharts/tooltip/footerformat/
                 *         An HTML table in the tooltip
                 * @sample {highmaps} maps/tooltip/format/
                 *         Format demo
                 *
                 * @type       {string}
                 * @apioption  tooltip.headerFormat
                 */
                headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
                /**
                 * The HTML of the null point's line in the tooltip. Works analogously
                 * to [pointFormat](#tooltip.pointFormat).
                 *
                 * @sample {highcharts} highcharts/plotoptions/series-nullformat
                 *         Format data label and tooltip for null point.
                 *
                 * @type      {string}
                 * @apioption tooltip.nullFormat
                 */
                /**
                 * The HTML of the point's line in the tooltip. Variables are enclosed
                 * by curly brackets. Available variables are point.x, point.y, series.
                 * name and series.color and other properties on the same form.
                 * Furthermore, `point.y` can be extended by the `tooltip.valuePrefix`
                 * and `tooltip.valueSuffix` variables. This can also be overridden for
                 * each series, which makes it a good hook for displaying units.
                 *
                 * In styled mode, the dot is colored by a class name rather
                 * than the point color.
                 *
                 * @sample {highcharts} highcharts/tooltip/pointformat/
                 *         A different point format with value suffix
                 * @sample {highmaps} maps/tooltip/format/
                 *         Format demo
                 *
                 * @type       {string}
                 * @since      2.2
                 * @apioption  tooltip.pointFormat
                 */
                pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y}</b><br/>',
                /**
                 * The background color or gradient for the tooltip.
                 *
                 * In styled mode, the stroke width is set in the
                 * `.highcharts-tooltip-box` class.
                 *
                 * @sample {highcharts} highcharts/tooltip/backgroundcolor-solid/
                 *         Yellowish background
                 * @sample {highcharts} highcharts/tooltip/backgroundcolor-gradient/
                 *         Gradient
                 * @sample {highcharts} highcharts/css/tooltip-border-background/
                 *         Tooltip in styled mode
                 * @sample {highstock} stock/tooltip/general/
                 *         Custom tooltip
                 * @sample {highstock} highcharts/css/tooltip-border-background/
                 *         Tooltip in styled mode
                 * @sample {highmaps} maps/tooltip/background-border/
                 *         Background and border demo
                 * @sample {highmaps} highcharts/css/tooltip-border-background/
                 *         Tooltip in styled mode
                 *
                 * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 */
                backgroundColor: color('#f7f7f7')
                    .setOpacity(0.85).get(),
                /**
                 * The pixel width of the tooltip border.
                 *
                 * In styled mode, the stroke width is set in the
                 * `.highcharts-tooltip-box` class.
                 *
                 * @sample {highcharts} highcharts/tooltip/bordercolor-default/
                 *         2px by default
                 * @sample {highcharts} highcharts/tooltip/borderwidth/
                 *         No border (shadow only)
                 * @sample {highcharts} highcharts/css/tooltip-border-background/
                 *         Tooltip in styled mode
                 * @sample {highstock} stock/tooltip/general/
                 *         Custom tooltip
                 * @sample {highstock} highcharts/css/tooltip-border-background/
                 *         Tooltip in styled mode
                 * @sample {highmaps} maps/tooltip/background-border/
                 *         Background and border demo
                 * @sample {highmaps} highcharts/css/tooltip-border-background/
                 *         Tooltip in styled mode
                 */
                borderWidth: 1,
                /**
                 * Whether to apply a drop shadow to the tooltip.
                 *
                 * @sample {highcharts} highcharts/tooltip/bordercolor-default/
                 *         True by default
                 * @sample {highcharts} highcharts/tooltip/shadow/
                 *         False
                 * @sample {highmaps} maps/tooltip/positioner/
                 *         Fixed tooltip position, border and shadow disabled
                 *
                 * @type {boolean|Highcharts.ShadowOptionsObject}
                 */
                shadow: true,
                /**
                 * CSS styles for the tooltip. The tooltip can also be styled through
                 * the CSS class `.highcharts-tooltip`.
                 *
                 * Note that the default `pointerEvents` style makes the tooltip ignore
                 * mouse events, so in order to use clickable tooltips, this value must
                 * be set to `auto`.
                 *
                 * @sample {highcharts} highcharts/tooltip/style/
                 *         Greater padding, bold text
                 *
                 * @type {Highcharts.CSSObject}
                 */
                style: {
                    /** @internal */
                    color: '#333333',
                    /** @internal */
                    cursor: 'default',
                    /** @internal */
                    fontSize: '12px',
                    /** @internal */
                    whiteSpace: 'nowrap'
                }
            },
            /**
             * Highchart by default puts a credits label in the lower right corner
             * of the chart. This can be changed using these options.
             */
            credits: {
                /**
                 * Credits for map source to be concatenated with conventional credit
                 * text. By default this is a format string that collects copyright
                 * information from the map if available.
                 *
                 * @see [mapTextFull](#credits.mapTextFull)
                 * @see [text](#credits.text)
                 *
                 * @type      {string}
                 * @default   \u00a9 <a href="{geojson.copyrightUrl}">{geojson.copyrightShort}</a>
                 * @since     4.2.2
                 * @product   highmaps
                 * @apioption credits.mapText
                 */
                /**
                 * Detailed credits for map source to be displayed on hover of credits
                 * text. By default this is a format string that collects copyright
                 * information from the map if available.
                 *
                 * @see [mapText](#credits.mapText)
                 * @see [text](#credits.text)
                 *
                 * @type      {string}
                 * @default   {geojson.copyright}
                 * @since     4.2.2
                 * @product   highmaps
                 * @apioption credits.mapTextFull
                 */
                /**
                 * Whether to show the credits text.
                 *
                 * @sample {highcharts} highcharts/credits/enabled-false/
                 *         Credits disabled
                 * @sample {highstock} stock/credits/enabled/
                 *         Credits disabled
                 * @sample {highmaps} maps/credits/enabled-false/
                 *         Credits disabled
                 */
                enabled: true,
                /**
                 * The URL for the credits label.
                 *
                 * @sample {highcharts} highcharts/credits/href/
                 *         Custom URL and text
                 * @sample {highmaps} maps/credits/customized/
                 *         Custom URL and text
                 */
                href: 'https://www.highcharts.com?credits',
                /**
                 * Position configuration for the credits label.
                 *
                 * @sample {highcharts} highcharts/credits/position-left/
                 *         Left aligned
                 * @sample {highcharts} highcharts/credits/position-left/
                 *         Left aligned
                 * @sample {highmaps} maps/credits/customized/
                 *         Left aligned
                 * @sample {highmaps} maps/credits/customized/
                 *         Left aligned
                 *
                 * @type    {Highcharts.AlignObject}
                 * @since   2.1
                 */
                position: {
                    /** @internal */
                    align: 'right',
                    /** @internal */
                    x: -10,
                    /** @internal */
                    verticalAlign: 'bottom',
                    /** @internal */
                    y: -5
                },
                /**
                 * CSS styles for the credits label.
                 *
                 * @see In styled mode, credits styles can be set with the
                 *      `.highcharts-credits` class.
                 *
                 * @type {Highcharts.CSSObject}
                 */
                style: {
                    /** @internal */
                    cursor: 'pointer',
                    /** @internal */
                    color: '#999999',
                    /** @internal */
                    fontSize: '9px'
                },
                /**
                 * The text for the credits label.
                 *
                 * @productdesc {highmaps}
                 * If a map is loaded as GeoJSON, the text defaults to
                 * `Highcharts @ {map-credits}`. Otherwise, it defaults to
                 * `Highcharts.com`.
                 *
                 * @sample {highcharts} highcharts/credits/href/
                 *         Custom URL and text
                 * @sample {highmaps} maps/credits/customized/
                 *         Custom URL and text
                 */
                text: 'Highcharts.com'
            }
        };
        /* eslint-disable spaced-comment */

        '';
        /**
         * Global `Time` object with default options. Since v6.0.5, time settings can be
         * applied individually for each chart. If no individual settings apply, this
         * `Time` object is shared by all instances.
         *
         * @name Highcharts.time
         * @type {Highcharts.Time}
         */
        H.time = new Time(merge(H.defaultOptions.global, H.defaultOptions.time));
        /**
         * Formats a JavaScript date timestamp (milliseconds since Jan 1st 1970) into a
         * human readable date string. The format is a subset of the formats for PHP's
         * [strftime](https://www.php.net/manual/en/function.strftime.php) function.
         * Additional formats can be given in the {@link Highcharts.dateFormats} hook.
         *
         * Since v6.0.5, all internal dates are formatted through the
         * {@link Highcharts.Chart#time} instance to respect chart-level time settings.
         * The `Highcharts.dateFormat` function only reflects global time settings set
         * with `setOptions`.
         *
         * Supported format keys:
         * - `%a`: Short weekday, like 'Mon'
         * - `%A`: Long weekday, like 'Monday'
         * - `%d`: Two digit day of the month, 01 to 31
         * - `%e`: Day of the month, 1 through 31
         * - `%w`: Day of the week, 0 through 6
         * - `%b`: Short month, like 'Jan'
         * - `%B`: Long month, like 'January'
         * - `%m`: Two digit month number, 01 through 12
         * - `%y`: Two digits year, like 09 for 2009
         * - `%Y`: Four digits year, like 2009
         * - `%H`: Two digits hours in 24h format, 00 through 23
         * - `%k`: Hours in 24h format, 0 through 23
         * - `%I`: Two digits hours in 12h format, 00 through 11
         * - `%l`: Hours in 12h format, 1 through 12
         * - `%M`: Two digits minutes, 00 through 59
         * - `%p`: Upper case AM or PM
         * - `%P`: Lower case AM or PM
         * - `%S`: Two digits seconds, 00 through 59
         * - `%L`: Milliseconds (naming from Ruby)
         *
         * @function Highcharts.dateFormat
         *
         * @param {string} format
         *        The desired format where various time representations are prefixed
         *        with `%`.
         *
         * @param {number} timestamp
         *        The JavaScript timestamp.
         *
         * @param {boolean} [capitalize=false]
         *        Upper case first letter in the return.
         *
         * @return {string}
         *         The formatted date.
         */
        H.dateFormat = function (format, timestamp, capitalize) {
            return H.time.dateFormat(format, timestamp, capitalize);
        };
        var optionsModule = {
            dateFormat: H.dateFormat,
            defaultOptions: H.defaultOptions,
            time: H.time
        };

        return optionsModule;
    });
    _registerModule(_modules, 'parts/Axis.js', [_modules['parts/Color.js'], _modules['parts/Globals.js'], _modules['parts/Tick.js'], _modules['parts/Utilities.js'], _modules['parts/Options.js']], function (Color, H, Tick, U, O) {
        /* *
         *
         *  (c) 2010-2020 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var addEvent = U.addEvent, animObject = U.animObject, arrayMax = U.arrayMax, arrayMin = U.arrayMin, clamp = U.clamp, correctFloat = U.correctFloat, defined = U.defined, destroyObjectProperties = U.destroyObjectProperties, error = U.error, extend = U.extend, fireEvent = U.fireEvent, format = U.format, getMagnitude = U.getMagnitude, isArray = U.isArray, isFunction = U.isFunction, isNumber = U.isNumber, isString = U.isString, merge = U.merge, normalizeTickInterval = U.normalizeTickInterval, objectEach = U.objectEach, pick = U.pick, relativeLength = U.relativeLength, removeEvent = U.removeEvent, splat = U.splat, syncTimeout = U.syncTimeout;
        /**
         * Options for the path on the Axis to be calculated.
         * @interface Highcharts.AxisPlotLinePathOptionsObject
         */ /**
        * Axis value.
        * @name Highcharts.AxisPlotLinePathOptionsObject#value
        * @type {number|undefined}
        */ /**
        * Line width used for calculation crisp line coordinates. Defaults to 1.
        * @name Highcharts.AxisPlotLinePathOptionsObject#lineWidth
        * @type {number|undefined}
        */ /**
        * If `false`, the function will return null when it falls outside the axis
        * bounds. If `true`, the function will return a path aligned to the plot area
        * sides if it falls outside. If `pass`, it will return a path outside.
        * @name Highcharts.AxisPlotLinePathOptionsObject#force
        * @type {string|boolean|undefined}
        */ /**
        * Used in Highstock. When `true`, plot paths (crosshair, plotLines, gridLines)
        * will be rendered on all axes when defined on the first axis.
        * @name Highcharts.AxisPlotLinePathOptionsObject#acrossPanes
        * @type {boolean|undefined}
        */ /**
        * Use old coordinates (for resizing and rescaling).
        * If not set, defaults to `false`.
        * @name Highcharts.AxisPlotLinePathOptionsObject#old
        * @type {boolean|undefined}
        */ /**
        * If given, return the plot line path of a pixel position on the axis.
        * @name Highcharts.AxisPlotLinePathOptionsObject#translatedValue
        * @type {number|undefined}
        */ /**
        * Used in Polar axes. Reverse the positions for concatenation of polygonal
        * plot bands
        * @name Highcharts.AxisPlotLinePathOptionsObject#reverse
        * @type {boolean|undefined}
        */
        /**
         * Options for crosshairs on axes.
         *
         * @product highstock
         *
         * @typedef {Highcharts.XAxisCrosshairOptions|Highcharts.YAxisCrosshairOptions} Highcharts.AxisCrosshairOptions
         */
        /**
         * @typedef {"navigator"|"pan"|"rangeSelectorButton"|"rangeSelectorInput"|"scrollbar"|"traverseUpButton"|"zoom"} Highcharts.AxisExtremesTriggerValue
         */
        /**
         * @callback Highcharts.AxisEventCallbackFunction
         *
         * @param {Highcharts.Axis} this
         */
        /**
         * @callback Highcharts.AxisLabelsFormatterCallbackFunction
         *
         * @param {Highcharts.AxisLabelsFormatterContextObject<number>} this
         *
         * @param {Highcharts.AxisLabelsFormatterContextObject<string>} that
         *
         * @return {string}
         */
        /**
         * @interface Highcharts.AxisLabelsFormatterContextObject<T>
         */ /**
        * @name Highcharts.AxisLabelsFormatterContextObject<T>#axis
        * @type {Highcharts.Axis}
        */ /**
        * @name Highcharts.AxisLabelsFormatterContextObject<T>#chart
        * @type {Highcharts.Chart}
        */ /**
        * @name Highcharts.AxisLabelsFormatterContextObject<T>#isFirst
        * @type {boolean}
        */ /**
        * @name Highcharts.AxisLabelsFormatterContextObject<T>#isLast
        * @type {boolean}
        */ /**
        * @name Highcharts.AxisLabelsFormatterContextObject<T>#pos
        * @type {number}
        */ /**
        * This can be either a numeric value or a category string.
        * @name Highcharts.AxisLabelsFormatterContextObject<T>#value
        * @type {T}
        */
        /**
         * Options for axes.
         *
         * @typedef {Highcharts.XAxisOptions|Highcharts.YAxisOptions|Highcharts.ZAxisOptions} Highcharts.AxisOptions
         */
        /**
         * @callback Highcharts.AxisPointBreakEventCallbackFunction
         *
         * @param {Highcharts.Axis} this
         *
         * @param {Highcharts.AxisPointBreakEventObject} evt
         */
        /**
         * @interface Highcharts.AxisPointBreakEventObject
         */ /**
        * @name Highcharts.AxisPointBreakEventObject#brk
        * @type {Highcharts.Dictionary<number>}
        */ /**
        * @name Highcharts.AxisPointBreakEventObject#point
        * @type {Highcharts.Point}
        */ /**
        * @name Highcharts.AxisPointBreakEventObject#preventDefault
        * @type {Function}
        */ /**
        * @name Highcharts.AxisPointBreakEventObject#target
        * @type {Highcharts.SVGElement}
        */ /**
        * @name Highcharts.AxisPointBreakEventObject#type
        * @type {"pointBreak"|"pointInBreak"}
        */
        /**
         * @callback Highcharts.AxisSetExtremesEventCallbackFunction
         *
         * @param {Highcharts.Axis} this
         *
         * @param {Highcharts.AxisSetExtremesEventObject} evt
         */
        /**
         * @interface Highcharts.AxisSetExtremesEventObject
         * @extends Highcharts.ExtremesObject
         */ /**
        * @name Highcharts.AxisSetExtremesEventObject#preventDefault
        * @type {Function}
        */ /**
        * @name Highcharts.AxisSetExtremesEventObject#target
        * @type {Highcharts.SVGElement}
        */ /**
        * @name Highcharts.AxisSetExtremesEventObject#trigger
        * @type {Highcharts.AxisExtremesTriggerValue|string}
        */ /**
        * @name Highcharts.AxisSetExtremesEventObject#type
        * @type {"setExtremes"}
        */
        /**
         * @callback Highcharts.AxisTickPositionerCallbackFunction
         *
         * @param {Highcharts.Axis} this
         *
         * @return {Highcharts.AxisTickPositionsArray}
         */
        /**
         * @interface Highcharts.AxisTickPositionsArray
         * @augments Array<number>
         */
        /**
         * @typedef {"high"|"low"|"middle"} Highcharts.AxisTitleAlignValue
         */
        /**
         * @typedef {Highcharts.XAxisTitleOptions|Highcharts.YAxisTitleOptions|Highcharts.ZAxisTitleOptions} Highcharts.AxisTitleOptions
         */
        /**
         * @typedef {"linear"|"logarithmic"|"datetime"|"category"|"treegrid"} Highcharts.AxisTypeValue
         */
        /**
         * The returned object literal from the {@link Highcharts.Axis#getExtremes}
         * function.
         *
         * @interface Highcharts.ExtremesObject
         */ /**
        * The maximum value of the axis' associated series.
        * @name Highcharts.ExtremesObject#dataMax
        * @type {number}
        */ /**
        * The minimum value of the axis' associated series.
        * @name Highcharts.ExtremesObject#dataMin
        * @type {number}
        */ /**
        * The maximum axis value, either automatic or set manually. If the `max` option
        * is not set, `maxPadding` is 0 and `endOnTick` is false, this value will be
        * the same as `dataMax`.
        * @name Highcharts.ExtremesObject#max
        * @type {number}
        */ /**
        * The minimum axis value, either automatic or set manually. If the `min` option
        * is not set, `minPadding` is 0 and `startOnTick` is false, this value will be
        * the same as `dataMin`.
        * @name Highcharts.ExtremesObject#min
        * @type {number}
        */ /**
        * The user defined maximum, either from the `max` option or from a zoom or
        * `setExtremes` action.
        * @name Highcharts.ExtremesObject#userMax
        * @type {number}
        */ /**
        * The user defined minimum, either from the `min` option or from a zoom or
        * `setExtremes` action.
        * @name Highcharts.ExtremesObject#userMin
        * @type {number}
        */
        /**
         * Formatter function for the text of a crosshair label.
         *
         * @callback Highcharts.XAxisCrosshairLabelFormatterCallbackFunction
         *
         * @param {Highcharts.Axis} this
         *        Axis context
         *
         * @param {number} value
         *        Y value of the data point
         *
         * @return {string}
         */
        var defaultOptions = O.defaultOptions;
        var deg2rad = H.deg2rad;
        /**
         * Create a new axis object. Called internally when instanciating a new chart or
         * adding axes by {@link Highcharts.Chart#addAxis}.
         *
         * A chart can have from 0 axes (pie chart) to multiples. In a normal, single
         * series cartesian chart, there is one X axis and one Y axis.
         *
         * The X axis or axes are referenced by {@link Highcharts.Chart.xAxis}, which is
         * an array of Axis objects. If there is only one axis, it can be referenced
         * through `chart.xAxis[0]`, and multiple axes have increasing indices. The same
         * pattern goes for Y axes.
         *
         * If you need to get the axes from a series object, use the `series.xAxis` and
         * `series.yAxis` properties. These are not arrays, as one series can only be
         * associated to one X and one Y axis.
         *
         * A third way to reference the axis programmatically is by `id`. Add an `id` in
         * the axis configuration options, and get the axis by
         * {@link Highcharts.Chart#get}.
         *
         * Configuration options for the axes are given in options.xAxis and
         * options.yAxis.
         *
         * @class
         * @name Highcharts.Axis
         *
         * @param {Highcharts.Chart} chart
         * The Chart instance to apply the axis on.
         *
         * @param {Highcharts.AxisOptions} userOptions
         * Axis options.
         */
        var Axis = /** @class */ (function () {
            /* *
             *
             *  Constructors
             *
             * */
            function Axis(chart, userOptions) {
                this.alternateBands = void 0;
                this.bottom = void 0;
                this.categories = void 0;
                this.chart = void 0;
                this.closestPointRange = void 0;
                this.coll = void 0;
                this.hasNames = void 0;
                this.hasVisibleSeries = void 0;
                this.height = void 0;
                this.isLinked = void 0;
                this.labelEdge = void 0; // @todo
                this.labelFormatter = void 0;
                this.left = void 0;
                this.len = void 0;
                this.max = void 0;
                this.maxLabelLength = void 0;
                this.min = void 0;
                this.minorTickInterval = void 0;
                this.minorTicks = void 0;
                this.minPixelPadding = void 0;
                this.names = void 0;
                this.offset = void 0;
                this.oldMax = void 0;
                this.oldMin = void 0;
                this.options = void 0;
                this.overlap = void 0;
                this.paddedTicks = void 0;
                this.plotLinesAndBands = void 0;
                this.plotLinesAndBandsGroups = void 0;
                this.pointRange = void 0;
                this.pointRangePadding = void 0;
                this.pos = void 0;
                this.positiveValuesOnly = void 0;
                this.right = void 0;
                this.series = void 0;
                this.side = void 0;
                this.tickAmount = void 0;
                this.tickInterval = void 0;
                this.tickmarkOffset = void 0;
                this.tickPositions = void 0;
                this.tickRotCorr = void 0;
                this.ticks = void 0;
                this.top = void 0;
                this.transA = void 0;
                this.transB = void 0;
                this.translationSlope = void 0;
                this.userOptions = void 0;
                this.visible = void 0;
                this.width = void 0;
                this.zoomEnabled = void 0;
                this.init(chart, userOptions);
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Overrideable function to initialize the axis.
             *
             * @see {@link Axis}
             *
             * @function Highcharts.Axis#init
             *
             * @param {Highcharts.Chart} chart
             * The Chart instance to apply the axis on.
             *
             * @param {Highcharts.AxisOptions} userOptions
             * Axis options.
             *
             * @fires Highcharts.Axis#event:afterInit
             * @fires Highcharts.Axis#event:init
             */
            Axis.prototype.init = function (chart, userOptions) {
                var isXAxis = userOptions.isX, axis = this;
                /**
                 * The Chart that the axis belongs to.
                 *
                 * @name Highcharts.Axis#chart
                 * @type {Highcharts.Chart}
                 */
                axis.chart = chart;
                /**
                 * Whether the axis is horizontal.
                 *
                 * @name Highcharts.Axis#horiz
                 * @type {boolean|undefined}
                 */
                axis.horiz = chart.inverted && !axis.isZAxis ? !isXAxis : isXAxis;
                /**
                 * Whether the axis is the x-axis.
                 *
                 * @name Highcharts.Axis#isXAxis
                 * @type {boolean|undefined}
                 */
                axis.isXAxis = isXAxis;
                /**
                 * The collection where the axis belongs, for example `xAxis`, `yAxis`
                 * or `colorAxis`. Corresponds to properties on Chart, for example
                 * {@link Chart.xAxis}.
                 *
                 * @name Highcharts.Axis#coll
                 * @type {string}
                 */
                axis.coll = axis.coll || (isXAxis ? 'xAxis' : 'yAxis');
                fireEvent(this, 'init', { userOptions: userOptions });
                axis.opposite = userOptions.opposite; // needed in setOptions
                /**
                 * The side on which the axis is rendered. 0 is top, 1 is right, 2
                 * is bottom and 3 is left.
                 *
                 * @name Highcharts.Axis#side
                 * @type {number}
                 */
                axis.side = userOptions.side || (axis.horiz ?
                    (axis.opposite ? 0 : 2) : // top : bottom
                    (axis.opposite ? 1 : 3)); // right : left
                /**
                 * Current options for the axis after merge of defaults and user's
                 * options.
                 *
                 * @name Highcharts.Axis#options
                 * @type {Highcharts.AxisOptions}
                 */
                axis.setOptions(userOptions);
                var options = this.options, type = options.type;
                axis.labelFormatter = (options.labels.formatter ||
                    // can be overwritten by dynamic format
                    axis.defaultLabelFormatter);
                /**
                 * User's options for this axis without defaults.
                 *
                 * @name Highcharts.Axis#userOptions
                 * @type {Highcharts.AxisOptions}
                 */
                axis.userOptions = userOptions;
                axis.minPixelPadding = 0;
                /**
                 * Whether the axis is reversed. Based on the `axis.reversed`,
                 * option, but inverted charts have reversed xAxis by default.
                 *
                 * @name Highcharts.Axis#reversed
                 * @type {boolean}
                 */
                axis.reversed = options.reversed;
                axis.visible = options.visible !== false;
                axis.zoomEnabled = options.zoomEnabled !== false;
                // Initial categories
                axis.hasNames =
                    type === 'category' || options.categories === true;
                /**
                 * If categories are present for the axis, names are used instead of
                 * numbers for that axis.
                 *
                 * Since Highcharts 3.0, categories can also be extracted by giving each
                 * point a name and setting axis type to `category`. However, if you
                 * have multiple series, best practice remains defining the `categories`
                 * array.
                 *
                 * @see [xAxis.categories](/highcharts/xAxis.categories)
                 *
                 * @name Highcharts.Axis#categories
                 * @type {Array<string>}
                 * @readonly
                 */
                axis.categories = options.categories || axis.hasNames;
                if (!axis.names) { // Preserve on update (#3830)
                    axis.names = [];
                    axis.names.keys = {};
                }
                // Placeholder for plotlines and plotbands groups
                axis.plotLinesAndBandsGroups = {};
                // Shorthand types
                axis.positiveValuesOnly = !!(axis.logarithmic && !options.allowNegativeLog);
                // Flag, if axis is linked to another axis
                axis.isLinked = defined(options.linkedTo);
                /**
                 * List of major ticks mapped by postition on axis.
                 *
                 * @see {@link Highcharts.Tick}
                 *
                 * @name Highcharts.Axis#ticks
                 * @type {Highcharts.Dictionary<Highcharts.Tick>}
                 */
                axis.ticks = {};
                axis.labelEdge = [];
                /**
                 * List of minor ticks mapped by position on the axis.
                 *
                 * @see {@link Highcharts.Tick}
                 *
                 * @name Highcharts.Axis#minorTicks
                 * @type {Highcharts.Dictionary<Highcharts.Tick>}
                 */
                axis.minorTicks = {};
                // List of plotLines/Bands
                axis.plotLinesAndBands = [];
                // Alternate bands
                axis.alternateBands = {};
                // Axis metrics
                axis.len = 0;
                axis.minRange = axis.userMinRange = options.minRange || options.maxZoom;
                axis.range = options.range;
                axis.offset = options.offset || 0;
                /**
                 * The maximum value of the axis. In a logarithmic axis, this is the
                 * logarithm of the real value, and the real value can be obtained from
                 * {@link Axis#getExtremes}.
                 *
                 * @name Highcharts.Axis#max
                 * @type {number|null}
                 */
                axis.max = null;
                /**
                 * The minimum value of the axis. In a logarithmic axis, this is the
                 * logarithm of the real value, and the real value can be obtained from
                 * {@link Axis#getExtremes}.
                 *
                 * @name Highcharts.Axis#min
                 * @type {number|null}
                 */
                axis.min = null;
                /**
                 * The processed crosshair options.
                 *
                 * @name Highcharts.Axis#crosshair
                 * @type {boolean|Highcharts.AxisCrosshairOptions}
                 */
                axis.crosshair = pick(options.crosshair, splat(chart.options.tooltip.crosshairs)[isXAxis ? 0 : 1], false);
                var events = axis.options.events;
                // Register. Don't add it again on Axis.update().
                if (chart.axes.indexOf(axis) === -1) { //
                    if (isXAxis) { // #2713
                        chart.axes.splice(chart.xAxis.length, 0, axis);
                    }
                    else {
                        chart.axes.push(axis);
                    }
                    chart[axis.coll].push(axis);
                }
                /**
                 * All series associated to the axis.
                 *
                 * @name Highcharts.Axis#series
                 * @type {Array<Highcharts.Series>}
                 */
                axis.series = axis.series || []; // populated by Series
                // Reversed axis
                if (chart.inverted &&
                    !axis.isZAxis &&
                    isXAxis &&
                    typeof axis.reversed === 'undefined') {
                    axis.reversed = true;
                }
                axis.labelRotation = axis.options.labels.rotation;
                // register event listeners
                objectEach(events, function (event, eventType) {
                    if (isFunction(event)) {
                        addEvent(axis, eventType, event);
                    }
                });
                fireEvent(this, 'afterInit');
            };
            /**
             * Merge and set options.
             *
             * @private
             * @function Highcharts.Axis#setOptions
             *
             * @param {Highcharts.AxisOptions} userOptions
             * Axis options.
             *
             * @fires Highcharts.Axis#event:afterSetOptions
             */
            Axis.prototype.setOptions = function (userOptions) {
                this.options = merge(Axis.defaultOptions, (this.coll === 'yAxis') && Axis.defaultYAxisOptions, [
                    Axis.defaultTopAxisOptions,
                    Axis.defaultRightAxisOptions,
                    Axis.defaultBottomAxisOptions,
                    Axis.defaultLeftAxisOptions
                ][this.side], merge(
                // if set in setOptions (#1053):
                defaultOptions[this.coll], userOptions));
                fireEvent(this, 'afterSetOptions', { userOptions: userOptions });
            };
            /**
             * The default label formatter. The context is a special config object for
             * the label. In apps, use the
             * [labels.formatter](https://api.highcharts.com/highcharts/xAxis.labels.formatter)
             * instead, except when a modification is needed.
             *
             * @function Highcharts.Axis#defaultLabelFormatter
             *
             * @param {Highcharts.AxisLabelsFormatterContextObject<number>|Highcharts.AxisLabelsFormatterContextObject<string>} this
             * Formatter context of axis label.
             *
             * @return {string}
             * The formatted label content.
             */
            Axis.prototype.defaultLabelFormatter = function () {
                var axis = this.axis, value = isNumber(this.value) ? this.value : NaN, time = axis.chart.time, categories = axis.categories, dateTimeLabelFormat = this.dateTimeLabelFormat, lang = defaultOptions.lang, numericSymbols = lang.numericSymbols, numSymMagnitude = lang.numericSymbolMagnitude || 1000, i = numericSymbols && numericSymbols.length, multi, ret, formatOption = axis.options.labels.format, 
                // make sure the same symbol is added for all labels on a linear
                // axis
                numericSymbolDetector = axis.logarithmic ?
                    Math.abs(value) :
                    axis.tickInterval;
                var chart = this.chart;
                var numberFormatter = chart.numberFormatter;
                if (formatOption) {
                    ret = format(formatOption, this, chart);
                }
                else if (categories) {
                    ret = "" + this.value;
                }
                else if (dateTimeLabelFormat) { // datetime axis
                    ret = time.dateFormat(dateTimeLabelFormat, value);
                }
                else if (i && numericSymbolDetector >= 1000) {
                    // Decide whether we should add a numeric symbol like k (thousands)
                    // or M (millions). If we are to enable this in tooltip or other
                    // places as well, we can move this logic to the numberFormatter and
                    // enable it by a parameter.
                    while (i-- && typeof ret === 'undefined') {
                        multi = Math.pow(numSymMagnitude, i + 1);
                        if (
                        // Only accept a numeric symbol when the distance is more
                        // than a full unit. So for example if the symbol is k, we
                        // don't accept numbers like 0.5k.
                        numericSymbolDetector >= multi &&
                            // Accept one decimal before the symbol. Accepts 0.5k but
                            // not 0.25k. How does this work with the previous?
                            (value * 10) % multi === 0 &&
                            numericSymbols[i] !== null &&
                            value !== 0) { // #5480
                            ret = numberFormatter(value / multi, -1) + numericSymbols[i];
                        }
                    }
                }
                if (typeof ret === 'undefined') {
                    if (Math.abs(value) >= 10000) { // add thousands separators
                        ret = numberFormatter(value, -1);
                    }
                    else { // small numbers
                        ret = numberFormatter(value, -1, void 0, ''); // #2466
                    }
                }
                return ret;
            };
            /**
             * Get the minimum and maximum for the series of each axis. The function
             * analyzes the axis series and updates `this.dataMin` and `this.dataMax`.
             *
             * @private
             * @function Highcharts.Axis#getSeriesExtremes
             *
             * @fires Highcharts.Axis#event:afterGetSeriesExtremes
             * @fires Highcharts.Axis#event:getSeriesExtremes
             */
            Axis.prototype.getSeriesExtremes = function () {
                var axis = this, chart = axis.chart, xExtremes;
                fireEvent(this, 'getSeriesExtremes', null, function () {
                    axis.hasVisibleSeries = false;
                    // Reset properties in case we're redrawing (#3353)
                    axis.dataMin = axis.dataMax = axis.threshold = null;
                    axis.softThreshold = !axis.isXAxis;
                    if (axis.stacking) {
                        axis.stacking.buildStacks();
                    }
                    // loop through this axis' series
                    axis.series.forEach(function (series) {
                        if (series.visible ||
                            !chart.options.chart.ignoreHiddenSeries) {
                            var seriesOptions = series.options, xData, threshold = seriesOptions.threshold, seriesDataMin, seriesDataMax;
                            axis.hasVisibleSeries = true;
                            // Validate threshold in logarithmic axes
                            if (axis.positiveValuesOnly && threshold <= 0) {
                                threshold = null;
                            }
                            // Get dataMin and dataMax for X axes
                            if (axis.isXAxis) {
                                xData = series.xData;
                                if (xData.length) {
                                    xExtremes = series.getXExtremes(xData);
                                    // If xData contains values which is not numbers,
                                    // then filter them out. To prevent performance hit,
                                    // we only do this after we have already found
                                    // seriesDataMin because in most cases all data is
                                    // valid. #5234.
                                    seriesDataMin = xExtremes.min;
                                    seriesDataMax = xExtremes.max;
                                    if (!isNumber(seriesDataMin) &&
                                        // #5010:
                                        !(seriesDataMin instanceof Date)) {
                                        xData = xData.filter(isNumber);
                                        xExtremes = series.getXExtremes(xData);
                                        // Do it again with valid data
                                        seriesDataMin = xExtremes.min;
                                        seriesDataMax = xExtremes.max;
                                    }
                                    if (xData.length) {
                                        axis.dataMin = Math.min(pick(axis.dataMin, seriesDataMin), seriesDataMin);
                                        axis.dataMax = Math.max(pick(axis.dataMax, seriesDataMax), seriesDataMax);
                                    }
                                }
                                // Get dataMin and dataMax for Y axes, as well as handle
                                // stacking and processed data
                            }
                            else {
                                // Get this particular series extremes
                                var dataExtremes = series.applyExtremes();
                                // Get the dataMin and dataMax so far. If percentage is
                                // used, the min and max are always 0 and 100. If
                                // seriesDataMin and seriesDataMax is null, then series
                                // doesn't have active y data, we continue with nulls
                                if (isNumber(dataExtremes.dataMin)) {
                                    seriesDataMin = dataExtremes.dataMin;
                                    axis.dataMin = Math.min(pick(axis.dataMin, seriesDataMin), seriesDataMin);
                                }
                                if (isNumber(dataExtremes.dataMax)) {
                                    seriesDataMax = dataExtremes.dataMax;
                                    axis.dataMax = Math.max(pick(axis.dataMax, seriesDataMax), seriesDataMax);
                                }
                                // Adjust to threshold
                                if (defined(threshold)) {
                                    axis.threshold = threshold;
                                }
                                // If any series has a hard threshold, it takes
                                // precedence
                                if (!seriesOptions.softThreshold ||
                                    axis.positiveValuesOnly) {
                                    axis.softThreshold = false;
                                }
                            }
                        }
                    });
                });
                fireEvent(this, 'afterGetSeriesExtremes');
            };
            /**
             * Translate from axis value to pixel position on the chart, or back. Use
             * the `toPixels` and `toValue` functions in applications.
             *
             * @private
             * @function Highcharts.Axis#translate
             *
             * @param {number} val
             * TO-DO: parameter description
             *
             * @param {boolean|null} [backwards]
             * TO-DO: parameter description
             *
             * @param {boolean|null} [cvsCoord]
             * TO-DO: parameter description
             *
             * @param {boolean|null} [old]
             * TO-DO: parameter description
             *
             * @param {boolean} [handleLog]
             * TO-DO: parameter description
             *
             * @param {number} [pointPlacement]
             * TO-DO: parameter description
             *
             * @return {number|undefined}
             */
            Axis.prototype.translate = function (val, backwards, cvsCoord, old, handleLog, pointPlacement) {
                var axis = this.linkedParent || this, // #1417
                sign = 1, cvsOffset = 0, localA = old ? axis.oldTransA : axis.transA, localMin = old ? axis.oldMin : axis.min, returnValue = 0, minPixelPadding = axis.minPixelPadding, doPostTranslate = (axis.isOrdinal ||
                    axis.brokenAxis && axis.brokenAxis.hasBreaks ||
                    (axis.logarithmic && handleLog)) && axis.lin2val;
                if (!localA) {
                    localA = axis.transA;
                }
                // In vertical axes, the canvas coordinates start from 0 at the top like
                // in SVG.
                if (cvsCoord) {
                    sign *= -1; // canvas coordinates inverts the value
                    cvsOffset = axis.len;
                }
                // Handle reversed axis
                if (axis.reversed) {
                    sign *= -1;
                    cvsOffset -= sign * (axis.sector || axis.len);
                }
                // From pixels to value
                if (backwards) { // reverse translation
                    val = val * sign + cvsOffset;
                    val -= minPixelPadding;
                    // from chart pixel to value:
                    returnValue = val / localA + localMin;
                    if (doPostTranslate) { // log and ordinal axes
                        returnValue = axis.lin2val(returnValue);
                    }
                    // From value to pixels
                }
                else {
                    if (doPostTranslate) { // log and ordinal axes
                        val = axis.val2lin(val);
                    }
                    returnValue = isNumber(localMin) ?
                        (sign * (val - localMin) * localA +
                            cvsOffset +
                            (sign * minPixelPadding) +
                            (isNumber(pointPlacement) ?
                                localA * pointPlacement :
                                0)) :
                        void 0;
                }
                return returnValue;
            };
            /**
             * Translate a value in terms of axis units into pixels within the chart.
             *
             * @function Highcharts.Axis#toPixels
             *
             * @param {number} value
             * A value in terms of axis units.
             *
             * @param {boolean} paneCoordinates
             * Whether to return the pixel coordinate relative to the chart or just the
             * axis/pane itself.
             *
             * @return {number}
             * Pixel position of the value on the chart or axis.
             */
            Axis.prototype.toPixels = function (value, paneCoordinates) {
                return this.translate(value, false, !this.horiz, null, true) +
                    (paneCoordinates ? 0 : this.pos);
            };
            /**
             * Translate a pixel position along the axis to a value in terms of axis
             * units.
             *
             * @function Highcharts.Axis#toValue
             *
             * @param {number} pixel
             * The pixel value coordinate.
             *
             * @param {boolean} [paneCoordinates=false]
             * Whether the input pixel is relative to the chart or just the axis/pane
             * itself.
             *
             * @return {number}
             * The axis value.
             */
            Axis.prototype.toValue = function (pixel, paneCoordinates) {
                return this.translate(pixel - (paneCoordinates ? 0 : this.pos), true, !this.horiz, null, true);
            };
            /**
             * Create the path for a plot line that goes from the given value on
             * this axis, across the plot to the opposite side. Also used internally for
             * grid lines and crosshairs.
             *
             * @function Highcharts.Axis#getPlotLinePath
             *
             * @param {Highcharts.AxisPlotLinePathOptionsObject} options
             * Options for the path.
             *
             * @return {Highcharts.SVGPathArray|null}
             * The SVG path definition for the plot line.
             */
            Axis.prototype.getPlotLinePath = function (options) {
                var axis = this, chart = axis.chart, axisLeft = axis.left, axisTop = axis.top, old = options.old, value = options.value, translatedValue = options.translatedValue, lineWidth = options.lineWidth, force = options.force, x1, y1, x2, y2, cHeight = (old && chart.oldChartHeight) || chart.chartHeight, cWidth = (old && chart.oldChartWidth) || chart.chartWidth, skip, transB = axis.transB, evt;
                // eslint-disable-next-line valid-jsdoc
                /**
                 * Check if x is between a and b. If not, either move to a/b
                 * or skip, depending on the force parameter.
                 * @private
                 */
                function between(x, a, b) {
                    if (force !== 'pass' && x < a || x > b) {
                        if (force) {
                            x = clamp(x, a, b);
                        }
                        else {
                            skip = true;
                        }
                    }
                    return x;
                }
                evt = {
                    value: value,
                    lineWidth: lineWidth,
                    old: old,
                    force: force,
                    acrossPanes: options.acrossPanes,
                    translatedValue: translatedValue
                };
                fireEvent(this, 'getPlotLinePath', evt, function (e) {
                    translatedValue = pick(translatedValue, axis.translate(value, null, null, old));
                    // Keep the translated value within sane bounds, and avoid Infinity
                    // to fail the isNumber test (#7709).
                    translatedValue = clamp(translatedValue, -1e5, 1e5);
                    x1 = x2 = Math.round(translatedValue + transB);
                    y1 = y2 = Math.round(cHeight - translatedValue - transB);
                    if (!isNumber(translatedValue)) { // no min or max
                        skip = true;
                        force = false; // #7175, don't force it when path is invalid
                    }
                    else if (axis.horiz) {
                        y1 = axisTop;
                        y2 = cHeight - axis.bottom;
                        x1 = x2 = between(x1, axisLeft, axisLeft + axis.width);
                    }
                    else {
                        x1 = axisLeft;
                        x2 = cWidth - axis.right;
                        y1 = y2 = between(y1, axisTop, axisTop + axis.height);
                    }
                    e.path = skip && !force ?
                        null :
                        chart.renderer.crispLine([['M', x1, y1], ['L', x2, y2]], lineWidth || 1);
                });
                return evt.path;
            };
            /**
             * Internal function to et the tick positions of a linear axis to round
             * values like whole tens or every five.
             *
             * @function Highcharts.Axis#getLinearTickPositions
             *
             * @param {number} tickInterval
             * The normalized tick interval.
             *
             * @param {number} min
             * Axis minimum.
             *
             * @param {number} max
             * Axis maximum.
             *
             * @return {Array<number>}
             * An array of axis values where ticks should be placed.
             */
            Axis.prototype.getLinearTickPositions = function (tickInterval, min, max) {
                var pos, lastPos, roundedMin = correctFloat(Math.floor(min / tickInterval) * tickInterval), roundedMax = correctFloat(Math.ceil(max / tickInterval) * tickInterval), tickPositions = [], precision;
                // When the precision is higher than what we filter out in
                // correctFloat, skip it (#6183).
                if (correctFloat(roundedMin + tickInterval) === roundedMin) {
                    precision = 20;
                }
                // For single points, add a tick regardless of the relative position
                // (#2662, #6274)
                if (this.single) {
                    return [min];
                }
                // Populate the intermediate values
                pos = roundedMin;
                while (pos <= roundedMax) {
                    // Place the tick on the rounded value
                    tickPositions.push(pos);
                    // Always add the raw tickInterval, not the corrected one.
                    pos = correctFloat(pos + tickInterval, precision);
                    // If the interval is not big enough in the current min - max range
                    // to actually increase the loop variable, we need to break out to
                    // prevent endless loop. Issue #619
                    if (pos === lastPos) {
                        break;
                    }
                    // Record the last value
                    lastPos = pos;
                }
                return tickPositions;
            };
            /**
             * Resolve the new minorTicks/minorTickInterval options into the legacy
             * loosely typed minorTickInterval option.
             *
             * @function Highcharts.Axis#getMinorTickInterval
             *
             * @return {number|"auto"|null}
             */
            Axis.prototype.getMinorTickInterval = function () {
                var options = this.options;
                if (options.minorTicks === true) {
                    return pick(options.minorTickInterval, 'auto');
                }
                if (options.minorTicks === false) {
                    return null;
                }
                return options.minorTickInterval;
            };
            /**
             * Internal function to return the minor tick positions. For logarithmic
             * axes, the same logic as for major ticks is reused.
             *
             * @function Highcharts.Axis#getMinorTickPositions
             *
             * @return {Array<number>}
             * An array of axis values where ticks should be placed.
             */
            Axis.prototype.getMinorTickPositions = function () {
                var axis = this, options = axis.options, tickPositions = axis.tickPositions, minorTickInterval = axis.minorTickInterval, minorTickPositions = [], pos, pointRangePadding = axis.pointRangePadding || 0, min = axis.min - pointRangePadding, // #1498
                max = axis.max + pointRangePadding, // #1498
                range = max - min;
                // If minor ticks get too dense, they are hard to read, and may cause
                // long running script. So we don't draw them.
                if (range && range / minorTickInterval < axis.len / 3) { // #3875
                    var logarithmic_1 = axis.logarithmic;
                    if (logarithmic_1) {
                        // For each interval in the major ticks, compute the minor ticks
                        // separately.
                        this.paddedTicks.forEach(function (_pos, i, paddedTicks) {
                            if (i) {
                                minorTickPositions.push.apply(minorTickPositions, logarithmic_1.getLogTickPositions(minorTickInterval, paddedTicks[i - 1], paddedTicks[i], true));
                            }
                        });
                    }
                    else if (axis.dateTime &&
                        this.getMinorTickInterval() === 'auto') { // #1314
                        minorTickPositions = minorTickPositions.concat(axis.getTimeTicks(axis.dateTime.normalizeTimeTickInterval(minorTickInterval), min, max, options.startOfWeek));
                    }
                    else {
                        for (pos = min + (tickPositions[0] - min) % minorTickInterval; pos <= max; pos += minorTickInterval) {
                            // Very, very, tight grid lines (#5771)
                            if (pos === minorTickPositions[0]) {
                                break;
                            }
                            minorTickPositions.push(pos);
                        }
                    }
                }
                if (minorTickPositions.length !== 0) {
                    axis.trimTicks(minorTickPositions); // #3652 #3743 #1498 #6330
                }
                return minorTickPositions;
            };
            /**
             * Adjust the min and max for the minimum range. Keep in mind that the
             * series data is not yet processed, so we don't have information on data
             * cropping and grouping, or updated `axis.pointRange` or
             * `series.pointRange`. The data can't be processed until we have finally
             * established min and max.
             *
             * @private
             * @function Highcharts.Axis#adjustForMinRange
             */
            Axis.prototype.adjustForMinRange = function () {
                var axis = this, options = axis.options, min = axis.min, max = axis.max, log = axis.logarithmic, zoomOffset, spaceAvailable, closestDataRange, i, distance, xData, loopLength, minArgs, maxArgs, minRange;
                // Set the automatic minimum range based on the closest point distance
                if (axis.isXAxis &&
                    typeof axis.minRange === 'undefined' &&
                    !log) {
                    if (defined(options.min) || defined(options.max)) {
                        axis.minRange = null; // don't do this again
                    }
                    else {
                        // Find the closest distance between raw data points, as opposed
                        // to closestPointRange that applies to processed points
                        // (cropped and grouped)
                        axis.series.forEach(function (series) {
                            xData = series.xData;
                            loopLength = series.xIncrement ? 1 : xData.length - 1;
                            for (i = loopLength; i > 0; i--) {
                                distance = xData[i] - xData[i - 1];
                                if (typeof closestDataRange === 'undefined' ||
                                    distance < closestDataRange) {
                                    closestDataRange = distance;
                                }
                            }
                        });
                        axis.minRange = Math.min(closestDataRange * 5, axis.dataMax - axis.dataMin);
                    }
                }
                // if minRange is exceeded, adjust
                if (max - min < axis.minRange) {
                    spaceAvailable =
                        axis.dataMax - axis.dataMin >=
                            axis.minRange;
                    minRange = axis.minRange;
                    zoomOffset = (minRange - max + min) / 2;
                    // if min and max options have been set, don't go beyond it
                    minArgs = [
                        min - zoomOffset,
                        pick(options.min, min - zoomOffset)
                    ];
                    // If space is available, stay within the data range
                    if (spaceAvailable) {
                        minArgs[2] = axis.logarithmic ?
                            axis.logarithmic.log2lin(axis.dataMin) :
                            axis.dataMin;
                    }
                    min = arrayMax(minArgs);
                    maxArgs = [
                        min + minRange,
                        pick(options.max, min + minRange)
                    ];
                    // If space is availabe, stay within the data range
                    if (spaceAvailable) {
                        maxArgs[2] = log ?
                            log.log2lin(axis.dataMax) :
                            axis.dataMax;
                    }
                    max = arrayMin(maxArgs);
                    // now if the max is adjusted, adjust the min back
                    if (max - min < minRange) {
                        minArgs[0] = max - minRange;
                        minArgs[1] = pick(options.min, max - minRange);
                        min = arrayMax(minArgs);
                    }
                }
                // Record modified extremes
                axis.min = min;
                axis.max = max;
            };
            // eslint-disable-next-line valid-jsdoc
            /**
             * Find the closestPointRange across all series.
             *
             * @private
             * @function Highcharts.Axis#getClosest
             */
            Axis.prototype.getClosest = function () {
                var ret;
                if (this.categories) {
                    ret = 1;
                }
                else {
                    this.series.forEach(function (series) {
                        var seriesClosest = series.closestPointRange, visible = series.visible ||
                            !series.chart.options.chart.ignoreHiddenSeries;
                        if (!series.noSharedTooltip &&
                            defined(seriesClosest) &&
                            visible) {
                            ret = defined(ret) ?
                                Math.min(ret, seriesClosest) :
                                seriesClosest;
                        }
                    });
                }
                return ret;
            };
            /**
             * When a point name is given and no x, search for the name in the existing
             * categories, or if categories aren't provided, search names or create a
             * new category (#2522).
             * @private
             * @function Highcharts.Axis#nameToX
             *
             * @param {Highcharts.Point} point
             * The point to inspect.
             *
             * @return {number}
             * The X value that the point is given.
             */
            Axis.prototype.nameToX = function (point) {
                var explicitCategories = isArray(this.categories), names = explicitCategories ? this.categories : this.names, nameX = point.options.x, x;
                point.series.requireSorting = false;
                if (!defined(nameX)) {
                    nameX = this.options.uniqueNames === false ?
                        point.series.autoIncrement() :
                        (explicitCategories ?
                            names.indexOf(point.name) :
                            pick(names.keys[point.name], -1));
                }
                if (nameX === -1) { // Not found in currenct categories
                    if (!explicitCategories) {
                        x = names.length;
                    }
                }
                else {
                    x = nameX;
                }
                // Write the last point's name to the names array
                if (typeof x !== 'undefined') {
                    this.names[x] = point.name;
                    // Backwards mapping is much faster than array searching (#7725)
                    this.names.keys[point.name] = x;
                }
                return x;
            };
            /**
             * When changes have been done to series data, update the axis.names.
             *
             * @private
             * @function Highcharts.Axis#updateNames
             */
            Axis.prototype.updateNames = function () {
                var axis = this, names = this.names, i = names.length;
                if (i > 0) {
                    Object.keys(names.keys).forEach(function (key) {
                        delete (names.keys)[key];
                    });
                    names.length = 0;
                    this.minRange = this.userMinRange; // Reset
                    (this.series || []).forEach(function (series) {
                        // Reset incrementer (#5928)
                        series.xIncrement = null;
                        // When adding a series, points are not yet generated
                        if (!series.points || series.isDirtyData) {
                            // When we're updating the series with data that is longer
                            // than it was, and cropThreshold is passed, we need to make
                            // sure that the axis.max is increased _before_ running the
                            // premature processData. Otherwise this early iteration of
                            // processData will crop the points to axis.max, and the
                            // names array will be too short (#5857).
                            axis.max = Math.max(axis.max, series.xData.length - 1);
                            series.processData();
                            series.generatePoints();
                        }
                        series.data.forEach(function (point, i) {
                            var x;
                            if (point &&
                                point.options &&
                                typeof point.name !== 'undefined' // #9562
                            ) {
                                x = axis.nameToX(point);
                                if (typeof x !== 'undefined' && x !== point.x) {
                                    point.x = x;
                                    series.xData[i] = x;
                                }
                            }
                        });
                    });
                }
            };
            /**
             * Update translation information.
             *
             * @private
             * @function Highcharts.Axis#setAxisTranslation
             *
             * @param {boolean} [saveOld]
             * TO-DO: parameter description
             *
             * @fires Highcharts.Axis#event:afterSetAxisTranslation
             */
            Axis.prototype.setAxisTranslation = function (saveOld) {
                var axis = this, range = axis.max - axis.min, pointRange = axis.axisPointRange || 0, closestPointRange, minPointOffset = 0, pointRangePadding = 0, linkedParent = axis.linkedParent, ordinalCorrection, hasCategories = !!axis.categories, transA = axis.transA, isXAxis = axis.isXAxis;
                // Adjust translation for padding. Y axis with categories need to go
                // through the same (#1784).
                if (isXAxis || hasCategories || pointRange) {
                    // Get the closest points
                    closestPointRange = axis.getClosest();
                    if (linkedParent) {
                        minPointOffset = linkedParent.minPointOffset;
                        pointRangePadding = linkedParent.pointRangePadding;
                    }
                    else {
                        axis.series.forEach(function (series) {
                            var seriesPointRange = hasCategories ?
                                1 :
                                (isXAxis ?
                                    pick(series.options.pointRange, closestPointRange, 0) :
                                    (axis.axisPointRange || 0)), // #2806
                            pointPlacement = series.options.pointPlacement;
                            pointRange = Math.max(pointRange, seriesPointRange);
                            if (!axis.single || hasCategories) {
                                // TODO: series should internally set x- and y-
                                // pointPlacement to simplify this logic.
                                var isPointPlacementAxis = series.is('xrange') ? !isXAxis : isXAxis;
                                // minPointOffset is the value padding to the left of
                                // the axis in order to make room for points with a
                                // pointRange, typically columns. When the
                                // pointPlacement option is 'between' or 'on', this
                                // padding does not apply.
                                minPointOffset = Math.max(minPointOffset, isPointPlacementAxis && isString(pointPlacement) ?
                                    0 :
                                    seriesPointRange / 2);
                                // Determine the total padding needed to the length of
                                // the axis to make room for the pointRange. If the
                                // series' pointPlacement is 'on', no padding is added.
                                pointRangePadding = Math.max(pointRangePadding, isPointPlacementAxis && pointPlacement === 'on' ?
                                    0 :
                                    seriesPointRange);
                            }
                        });
                    }
                    // Record minPointOffset and pointRangePadding
                    ordinalCorrection = axis.ordinal && axis.ordinal.slope && closestPointRange ?
                        axis.ordinal.slope / closestPointRange :
                        1; // #988, #1853
                    axis.minPointOffset = minPointOffset =
                        minPointOffset * ordinalCorrection;
                    axis.pointRangePadding =
                        pointRangePadding = pointRangePadding * ordinalCorrection;
                    // pointRange means the width reserved for each point, like in a
                    // column chart
                    axis.pointRange = Math.min(pointRange, axis.single && hasCategories ? 1 : range);
                    // closestPointRange means the closest distance between points. In
                    // columns it is mostly equal to pointRange, but in lines pointRange
                    // is 0 while closestPointRange is some other value
                    if (isXAxis) {
                        axis.closestPointRange = closestPointRange;
                    }
                }
                // Secondary values
                if (saveOld) {
                    axis.oldTransA = transA;
                }
                axis.translationSlope = axis.transA = transA =
                    axis.staticScale ||
                        axis.len / ((range + pointRangePadding) || 1);
                // Translation addend
                axis.transB = axis.horiz ? axis.left : axis.bottom;
                axis.minPixelPadding = transA * minPointOffset;
                fireEvent(this, 'afterSetAxisTranslation');
            };
            /**
             * @private
             * @function Highcharts.Axis#minFromRange
             *
             * @return {number}
             */
            Axis.prototype.minFromRange = function () {
                var axis = this;
                return axis.max - axis.range;
            };
            /**
             * Set the tick positions to round values and optionally extend the extremes
             * to the nearest tick.
             *
             * @private
             * @function Highcharts.Axis#setTickInterval
             *
             * @param {boolean} secondPass
             * TO-DO: parameter description
             *
             * @fires Highcharts.Axis#event:foundExtremes
             */
            Axis.prototype.setTickInterval = function (secondPass) {
                var axis = this, chart = axis.chart, log = axis.logarithmic, options = axis.options, isXAxis = axis.isXAxis, isLinked = axis.isLinked, maxPadding = options.maxPadding, minPadding = options.minPadding, length, linkedParentExtremes, tickIntervalOption = options.tickInterval, minTickInterval, tickPixelIntervalOption = options.tickPixelInterval, categories = axis.categories, threshold = isNumber(axis.threshold) ? axis.threshold : null, softThreshold = axis.softThreshold, thresholdMin, thresholdMax, hardMin, hardMax;
                if (!axis.dateTime && !categories && !isLinked) {
                    this.getTickAmount();
                }
                // Min or max set either by zooming/setExtremes or initial options
                hardMin = pick(axis.userMin, options.min);
                hardMax = pick(axis.userMax, options.max);
                // Linked axis gets the extremes from the parent axis
                if (isLinked) {
                    axis.linkedParent = chart[axis.coll][options.linkedTo];
                    linkedParentExtremes = axis.linkedParent.getExtremes();
                    axis.min = pick(linkedParentExtremes.min, linkedParentExtremes.dataMin);
                    axis.max = pick(linkedParentExtremes.max, linkedParentExtremes.dataMax);
                    if (options.type !== axis.linkedParent.options.type) {
                        // Can't link axes of different type
                        error(11, 1, chart);
                    }
                    // Initial min and max from the extreme data values
                }
                else {
                    // Adjust to hard threshold
                    if (!softThreshold && defined(threshold)) {
                        if (axis.dataMin >= threshold) {
                            thresholdMin = threshold;
                            minPadding = 0;
                        }
                        else if (axis.dataMax <= threshold) {
                            thresholdMax = threshold;
                            maxPadding = 0;
                        }
                    }
                    axis.min = pick(hardMin, thresholdMin, axis.dataMin);
                    axis.max = pick(hardMax, thresholdMax, axis.dataMax);
                }
                if (log) {
                    if (axis.positiveValuesOnly &&
                        !secondPass &&
                        Math.min(axis.min, pick(axis.dataMin, axis.min)) <= 0) { // #978
                        // Can't plot negative values on log axis
                        error(10, 1, chart);
                    }
                    // The correctFloat cures #934, float errors on full tens. But it
                    // was too aggressive for #4360 because of conversion back to lin,
                    // therefore use precision 15.
                    axis.min = correctFloat(log.log2lin(axis.min), 16);
                    axis.max = correctFloat(log.log2lin(axis.max), 16);
                }
                // handle zoomed range
                if (axis.range && defined(axis.max)) {
                    // #618, #6773:
                    axis.userMin = axis.min = hardMin =
                        Math.max(axis.dataMin, axis.minFromRange());
                    axis.userMax = hardMax = axis.max;
                    axis.range = null; // don't use it when running setExtremes
                }
                // Hook for Highstock Scroller. Consider combining with beforePadding.
                fireEvent(axis, 'foundExtremes');
                // Hook for adjusting this.min and this.max. Used by bubble series.
                if (axis.beforePadding) {
                    axis.beforePadding();
                }
                // adjust min and max for the minimum range
                axis.adjustForMinRange();
                // Pad the values to get clear of the chart's edges. To avoid
                // tickInterval taking the padding into account, we do this after
                // computing tick interval (#1337).
                if (!categories &&
                    !axis.axisPointRange &&
                    !(axis.stacking && axis.stacking.usePercentage) &&
                    !isLinked &&
                    defined(axis.min) &&
                    defined(axis.max)) {
                    length = axis.max - axis.min;
                    if (length) {
                        if (!defined(hardMin) && minPadding) {
                            axis.min -= length * minPadding;
                        }
                        if (!defined(hardMax) && maxPadding) {
                            axis.max += length * maxPadding;
                        }
                    }
                }
                // Handle options for floor, ceiling, softMin and softMax (#6359)
                if (!isNumber(axis.userMin)) {
                    if (isNumber(options.softMin) && options.softMin < axis.min) {
                        axis.min = hardMin = options.softMin; // #6894
                    }
                    if (isNumber(options.floor)) {
                        axis.min = Math.max(axis.min, options.floor);
                    }
                }
                if (!isNumber(axis.userMax)) {
                    if (isNumber(options.softMax) && options.softMax > axis.max) {
                        axis.max = hardMax = options.softMax; // #6894
                    }
                    if (isNumber(options.ceiling)) {
                        axis.max = Math.min(axis.max, options.ceiling);
                    }
                }
                // When the threshold is soft, adjust the extreme value only if the data
                // extreme and the padded extreme land on either side of the threshold.
                // For example, a series of [0, 1, 2, 3] would make the yAxis add a tick
                // for -1 because of the default minPadding and startOnTick options.
                // This is prevented by the softThreshold option.
                if (softThreshold && defined(axis.dataMin)) {
                    threshold = threshold || 0;
                    if (!defined(hardMin) &&
                        axis.min < threshold &&
                        axis.dataMin >= threshold) {
                        axis.min = axis.options.minRange ?
                            Math.min(threshold, axis.max -
                                axis.minRange) :
                            threshold;
                    }
                    else if (!defined(hardMax) &&
                        axis.max > threshold &&
                        axis.dataMax <= threshold) {
                        axis.max = axis.options.minRange ?
                            Math.max(threshold, axis.min +
                                axis.minRange) :
                            threshold;
                    }
                }
                // get tickInterval
                if (axis.min === axis.max ||
                    typeof axis.min === 'undefined' ||
                    typeof axis.max === 'undefined') {
                    axis.tickInterval = 1;
                }
                else if (isLinked &&
                    !tickIntervalOption &&
                    tickPixelIntervalOption ===
                        axis.linkedParent.options.tickPixelInterval) {
                    axis.tickInterval = tickIntervalOption =
                        axis.linkedParent.tickInterval;
                }
                else {
                    axis.tickInterval = pick(tickIntervalOption, this.tickAmount ?
                        ((axis.max - axis.min) /
                            Math.max(this.tickAmount - 1, 1)) :
                        void 0, 
                    // For categoried axis, 1 is default, for linear axis use
                    // tickPix
                    categories ?
                        1 :
                        // don't let it be more than the data range
                        (axis.max - axis.min) *
                            tickPixelIntervalOption /
                            Math.max(axis.len, tickPixelIntervalOption));
                }
                // Now we're finished detecting min and max, crop and group series data.
                // This is in turn needed in order to find tick positions in ordinal
                // axes.
                if (isXAxis && !secondPass) {
                    axis.series.forEach(function (series) {
                        series.processData(axis.min !== axis.oldMin || axis.max !== axis.oldMax);
                    });
                }
                // set the translation factor used in translate function
                axis.setAxisTranslation(true);
                // hook for ordinal axes and radial axes
                fireEvent(this, 'initialAxisTranslation');
                // In column-like charts, don't cramp in more ticks than there are
                // points (#1943, #4184)
                if (axis.pointRange && !tickIntervalOption) {
                    axis.tickInterval = Math.max(axis.pointRange, axis.tickInterval);
                }
                // Before normalizing the tick interval, handle minimum tick interval.
                // This applies only if tickInterval is not defined.
                minTickInterval = pick(options.minTickInterval, 
                // In datetime axes, don't go below the data interval, except when
                // there are scatter-like series involved (#13369).
                axis.dateTime &&
                    !axis.series.some(function (s) { return s.noSharedTooltip; }) ?
                    axis.closestPointRange : 0);
                if (!tickIntervalOption && axis.tickInterval < minTickInterval) {
                    axis.tickInterval = minTickInterval;
                }
                // for linear axes, get magnitude and normalize the interval
                if (!axis.dateTime && !axis.logarithmic && !tickIntervalOption) {
                    axis.tickInterval = normalizeTickInterval(axis.tickInterval, void 0, getMagnitude(axis.tickInterval), pick(options.allowDecimals, 
                    // If the tick interval is greather than 0.5, avoid
                    // decimals, as linear axes are often used to render
                    // discrete values. #3363. If a tick amount is set, allow
                    // decimals by default, as it increases the chances for a
                    // good fit.
                    axis.tickInterval < 0.5 || this.tickAmount !== void 0), !!this.tickAmount);
                }
                // Prevent ticks from getting so close that we can't draw the labels
                if (!this.tickAmount) {
                    axis.tickInterval = axis.unsquish();
                }
                this.setTickPositions();
            };
            /**
             * Now we have computed the normalized tickInterval, get the tick positions
             *
             * @function Highcharts.Axis#setTickPositions
             *
             * @fires Highcharts.Axis#event:afterSetTickPositions
             */
            Axis.prototype.setTickPositions = function () {
                var axis = this, options = this.options, tickPositions, tickPositionsOption = options.tickPositions, minorTickIntervalOption = this.getMinorTickInterval(), tickPositioner = options.tickPositioner, hasVerticalPanning = this.hasVerticalPanning(), isColorAxis = this.coll === 'colorAxis', startOnTick = (isColorAxis || !hasVerticalPanning) && options.startOnTick, endOnTick = (isColorAxis || !hasVerticalPanning) && options.endOnTick;
                // Set the tickmarkOffset
                this.tickmarkOffset = (this.categories &&
                    options.tickmarkPlacement === 'between' &&
                    this.tickInterval === 1) ? 0.5 : 0; // #3202
                // get minorTickInterval
                this.minorTickInterval =
                    minorTickIntervalOption === 'auto' &&
                        this.tickInterval ?
                        this.tickInterval / 5 :
                        minorTickIntervalOption;
                // When there is only one point, or all points have the same value on
                // this axis, then min and max are equal and tickPositions.length is 0
                // or 1. In this case, add some padding in order to center the point,
                // but leave it with one tick. #1337.
                this.single =
                    this.min === this.max &&
                        defined(this.min) &&
                        !this.tickAmount &&
                        (
                        // Data is on integer (#6563)
                        parseInt(this.min, 10) === this.min ||
                            // Between integers and decimals are not allowed (#6274)
                            options.allowDecimals !== false);
                /**
                 * Contains the current positions that are laid out on the axis. The
                 * positions are numbers in terms of axis values. In a category axis
                 * they are integers, in a datetime axis they are also integers, but
                 * designating milliseconds.
                 *
                 * This property is read only - for modifying the tick positions, use
                 * the `tickPositioner` callback or [axis.tickPositions(
                 * https://api.highcharts.com/highcharts/xAxis.tickPositions) option
                 * instead.
                 *
                 * @name Highcharts.Axis#tickPositions
                 * @type {Highcharts.AxisTickPositionsArray|undefined}
                 */
                this.tickPositions =
                    // Find the tick positions. Work on a copy (#1565)
                    tickPositions =
                        (tickPositionsOption && tickPositionsOption.slice());
                if (!tickPositions) {
                    // Too many ticks (#6405). Create a friendly warning and provide two
                    // ticks so at least we can show the data series.
                    if ((!axis.ordinal || !axis.ordinal.positions) &&
                        ((this.max - this.min) /
                            this.tickInterval >
                            Math.max(2 * this.len, 200))) {
                        tickPositions = [this.min, this.max];
                        error(19, false, this.chart);
                    }
                    else if (axis.dateTime) {
                        tickPositions = axis.getTimeTicks(axis.dateTime.normalizeTimeTickInterval(this.tickInterval, options.units), this.min, this.max, options.startOfWeek, axis.ordinal && axis.ordinal.positions, this.closestPointRange, true);
                    }
                    else if (axis.logarithmic) {
                        tickPositions = axis.logarithmic.getLogTickPositions(this.tickInterval, this.min, this.max);
                    }
                    else {
                        tickPositions = this.getLinearTickPositions(this.tickInterval, this.min, this.max);
                    }
                    // Too dense ticks, keep only the first and last (#4477)
                    if (tickPositions.length > this.len) {
                        tickPositions = [tickPositions[0], tickPositions.pop()];
                        // Reduce doubled value (#7339)
                        if (tickPositions[0] === tickPositions[1]) {
                            tickPositions.length = 1;
                        }
                    }
                    this.tickPositions = tickPositions;
                    // Run the tick positioner callback, that allows modifying auto tick
                    // positions.
                    if (tickPositioner) {
                        tickPositioner = tickPositioner.apply(axis, [this.min, this.max]);
                        if (tickPositioner) {
                            this.tickPositions = tickPositions = tickPositioner;
                        }
                    }
                }
                // Reset min/max or remove extremes based on start/end on tick
                this.paddedTicks = tickPositions.slice(0); // Used for logarithmic minor
                this.trimTicks(tickPositions, startOnTick, endOnTick);
                if (!this.isLinked) {
                    // Substract half a unit (#2619, #2846, #2515, #3390),
                    // but not in case of multiple ticks (#6897)
                    if (this.single &&
                        tickPositions.length < 2 &&
                        !this.categories &&
                        !this.series.some(function (s) {
                            return (s.is('heatmap') && s.options.pointPlacement === 'between');
                        })) {
                        this.min -= 0.5;
                        this.max += 0.5;
                    }
                    if (!tickPositionsOption && !tickPositioner) {
                        this.adjustTickAmount();
                    }
                }
                fireEvent(this, 'afterSetTickPositions');
            };
            /**
             * Handle startOnTick and endOnTick by either adapting to padding min/max or
             * rounded min/max. Also handle single data points.
             *
             * @private
             * @function Highcharts.Axis#trimTicks
             *
             * @param {Array<number>} tickPositions
             * TO-DO: parameter description
             *
             * @param {boolean} [startOnTick]
             * TO-DO: parameter description
             *
             * @param {boolean} [endOnTick]
             * TO-DO: parameter description
             */
            Axis.prototype.trimTicks = function (tickPositions, startOnTick, endOnTick) {
                var roundedMin = tickPositions[0], roundedMax = tickPositions[tickPositions.length - 1], minPointOffset = (!this.isOrdinal && this.minPointOffset) || 0; // (#12716)
                fireEvent(this, 'trimTicks');
                if (!this.isLinked) {
                    if (startOnTick && roundedMin !== -Infinity) { // #6502
                        this.min = roundedMin;
                    }
                    else {
                        while (this.min - minPointOffset > tickPositions[0]) {
                            tickPositions.shift();
                        }
                    }
                    if (endOnTick) {
                        this.max = roundedMax;
                    }
                    else {
                        while (this.max + minPointOffset <
                            tickPositions[tickPositions.length - 1]) {
                            tickPositions.pop();
                        }
                    }
                    // If no tick are left, set one tick in the middle (#3195)
                    if (tickPositions.length === 0 &&
                        defined(roundedMin) &&
                        !this.options.tickPositions) {
                        tickPositions.push((roundedMax + roundedMin) / 2);
                    }
                }
            };
            /**
             * Check if there are multiple axes in the same pane.
             *
             * @private
             * @function Highcharts.Axis#alignToOthers
             *
             * @return {boolean|undefined}
             * True if there are other axes.
             */
            Axis.prototype.alignToOthers = function () {
                var axis = this, others = // Whether there is another axis to pair with this one
                 {}, hasOther, options = axis.options;
                if (
                // Only if alignTicks is true
                this.chart.options.chart.alignTicks !== false &&
                    options.alignTicks !== false &&
                    // Disabled when startOnTick or endOnTick are false (#7604)
                    options.startOnTick !== false &&
                    options.endOnTick !== false &&
                    // Don't try to align ticks on a log axis, they are not evenly
                    // spaced (#6021)
                    !axis.logarithmic) {
                    this.chart[this.coll].forEach(function (axis) {
                        var otherOptions = axis.options, horiz = axis.horiz, key = [
                            horiz ? otherOptions.left : otherOptions.top,
                            otherOptions.width,
                            otherOptions.height,
                            otherOptions.pane
                        ].join(',');
                        if (axis.series.length) { // #4442
                            if (others[key]) {
                                hasOther = true; // #4201
                            }
                            else {
                                others[key] = 1;
                            }
                        }
                    });
                }
                return hasOther;
            };
            /**
             * Find the max ticks of either the x and y axis collection, and record it
             * in `this.tickAmount`.
             *
             * @private
             * @function Highcharts.Axis#getTickAmount
             */
            Axis.prototype.getTickAmount = function () {
                var axis = this, options = this.options, tickAmount = options.tickAmount, tickPixelInterval = options.tickPixelInterval;
                if (!defined(options.tickInterval) &&
                    !tickAmount && this.len < tickPixelInterval &&
                    !this.isRadial &&
                    !axis.logarithmic &&
                    options.startOnTick &&
                    options.endOnTick) {
                    tickAmount = 2;
                }
                if (!tickAmount && this.alignToOthers()) {
                    // Add 1 because 4 tick intervals require 5 ticks (including first
                    // and last)
                    tickAmount = Math.ceil(this.len / tickPixelInterval) + 1;
                }
                // For tick amounts of 2 and 3, compute five ticks and remove the
                // intermediate ones. This prevents the axis from adding ticks that are
                // too far away from the data extremes.
                if (tickAmount < 4) {
                    this.finalTickAmt = tickAmount;
                    tickAmount = 5;
                }
                this.tickAmount = tickAmount;
            };
            /**
             * When using multiple axes, adjust the number of ticks to match the highest
             * number of ticks in that group.
             *
             * @private
             * @function Highcharts.Axis#adjustTickAmount
             */
            Axis.prototype.adjustTickAmount = function () {
                var axis = this, axisOptions = axis.options, tickInterval = axis.tickInterval, tickPositions = axis.tickPositions, tickAmount = axis.tickAmount, finalTickAmt = axis.finalTickAmt, currentTickAmount = tickPositions && tickPositions.length, threshold = pick(axis.threshold, axis.softThreshold ? 0 : null), min, len, i;
                if (axis.hasData()) {
                    if (currentTickAmount < tickAmount) {
                        min = axis.min;
                        while (tickPositions.length < tickAmount) {
                            // Extend evenly for both sides unless we're on the
                            // threshold (#3965)
                            if (tickPositions.length % 2 ||
                                min === threshold) {
                                // to the end
                                tickPositions.push(correctFloat(tickPositions[tickPositions.length - 1] +
                                    tickInterval));
                            }
                            else {
                                // to the start
                                tickPositions.unshift(correctFloat(tickPositions[0] - tickInterval));
                            }
                        }
                        axis.transA *= (currentTickAmount - 1) / (tickAmount - 1);
                        // Do not crop when ticks are not extremes (#9841)
                        axis.min = axisOptions.startOnTick ?
                            tickPositions[0] :
                            Math.min(axis.min, tickPositions[0]);
                        axis.max = axisOptions.endOnTick ?
                            tickPositions[tickPositions.length - 1] :
                            Math.max(axis.max, tickPositions[tickPositions.length - 1]);
                        // We have too many ticks, run second pass to try to reduce ticks
                    }
                    else if (currentTickAmount > tickAmount) {
                        axis.tickInterval *= 2;
                        axis.setTickPositions();
                    }
                    // The finalTickAmt property is set in getTickAmount
                    if (defined(finalTickAmt)) {
                        i = len = tickPositions.length;
                        while (i--) {
                            if (
                            // Remove every other tick
                            (finalTickAmt === 3 && i % 2 === 1) ||
                                // Remove all but first and last
                                (finalTickAmt <= 2 && i > 0 && i < len - 1)) {
                                tickPositions.splice(i, 1);
                            }
                        }
                        axis.finalTickAmt = void 0;
                    }
                }
            };
            /**
             * Set the scale based on data min and max, user set min and max or options.
             *
             * @private
             * @function Highcharts.Axis#setScale
             *
             * @fires Highcharts.Axis#event:afterSetScale
             */
            Axis.prototype.setScale = function () {
                var axis = this, isDirtyAxisLength, isDirtyData = false, isXAxisDirty = false;
                axis.series.forEach(function (series) {
                    var _a;
                    isDirtyData = isDirtyData || series.isDirtyData || series.isDirty;
                    // When x axis is dirty, we need new data extremes for y as
                    // well:
                    isXAxisDirty = isXAxisDirty || ((_a = series.xAxis) === null || _a === void 0 ? void 0 : _a.isDirty) || false;
                });
                axis.oldMin = axis.min;
                axis.oldMax = axis.max;
                axis.oldAxisLength = axis.len;
                // set the new axisLength
                axis.setAxisSize();
                isDirtyAxisLength = axis.len !== axis.oldAxisLength;
                // do we really need to go through all this?
                if (isDirtyAxisLength ||
                    isDirtyData ||
                    isXAxisDirty ||
                    axis.isLinked ||
                    axis.forceRedraw ||
                    axis.userMin !== axis.oldUserMin ||
                    axis.userMax !== axis.oldUserMax ||
                    axis.alignToOthers()) {
                    if (axis.stacking) {
                        axis.stacking.resetStacks();
                    }
                    axis.forceRedraw = false;
                    // get data extremes if needed
                    axis.getSeriesExtremes();
                    // get fixed positions based on tickInterval
                    axis.setTickInterval();
                    // record old values to decide whether a rescale is necessary later
                    // on (#540)
                    axis.oldUserMin = axis.userMin;
                    axis.oldUserMax = axis.userMax;
                    // Mark as dirty if it is not already set to dirty and extremes have
                    // changed. #595.
                    if (!axis.isDirty) {
                        axis.isDirty =
                            isDirtyAxisLength ||
                                axis.min !== axis.oldMin ||
                                axis.max !== axis.oldMax;
                    }
                }
                else if (axis.stacking) {
                    axis.stacking.cleanStacks();
                }
                // Recalculate panning state object, when the data
                // has changed. It is required when vertical panning is enabled.
                if (isDirtyData && axis.panningState) {
                    axis.panningState.isDirty = true;
                }
                fireEvent(this, 'afterSetScale');
            };
            /**
             * Set the minimum and maximum of the axes after render time. If the
             * `startOnTick` and `endOnTick` options are true, the minimum and maximum
             * values are rounded off to the nearest tick. To prevent this, these
             * options can be set to false before calling setExtremes. Also, setExtremes
             * will not allow a range lower than the `minRange` option, which by default
             * is the range of five points.
             *
             * @sample highcharts/members/axis-setextremes/
             *         Set extremes from a button
             * @sample highcharts/members/axis-setextremes-datetime/
             *         Set extremes on a datetime axis
             * @sample highcharts/members/axis-setextremes-off-ticks/
             *         Set extremes off ticks
             * @sample stock/members/axis-setextremes/
             *         Set extremes in Highstock
             * @sample maps/members/axis-setextremes/
             *         Set extremes in Highmaps
             *
             * @function Highcharts.Axis#setExtremes
             *
             * @param {number} [newMin]
             *        The new minimum value.
             *
             * @param {number} [newMax]
             *        The new maximum value.
             *
             * @param {boolean} [redraw=true]
             *        Whether to redraw the chart or wait for an explicit call to
             *        {@link Highcharts.Chart#redraw}
             *
             * @param {boolean|Highcharts.AnimationOptionsObject} [animation=true]
             *        Enable or modify animations.
             *
             * @param {*} [eventArguments]
             *        Arguments to be accessed in event handler.
             *
             * @fires Highcharts.Axis#event:setExtremes
             */
            Axis.prototype.setExtremes = function (newMin, newMax, redraw, animation, eventArguments) {
                var axis = this, chart = axis.chart;
                redraw = pick(redraw, true); // defaults to true
                axis.series.forEach(function (serie) {
                    delete serie.kdTree;
                });
                // Extend the arguments with min and max
                eventArguments = extend(eventArguments, {
                    min: newMin,
                    max: newMax
                });
                // Fire the event
                fireEvent(axis, 'setExtremes', eventArguments, function () {
                    axis.userMin = newMin;
                    axis.userMax = newMax;
                    axis.eventArgs = eventArguments;
                    if (redraw) {
                        chart.redraw(animation);
                    }
                });
            };
            /**
             * Overridable method for zooming chart. Pulled out in a separate method to
             * allow overriding in stock charts.
             * @private
             * @function Highcharts.Axis#zoom
             *
             * @param {number} newMin
             * TO-DO: parameter description
             *
             * @param {number} newMax
             * TO-DO: parameter description
             *
             * @return {boolean}
             */
            Axis.prototype.zoom = function (newMin, newMax) {
                var axis = this, dataMin = this.dataMin, dataMax = this.dataMax, options = this.options, min = Math.min(dataMin, pick(options.min, dataMin)), max = Math.max(dataMax, pick(options.max, dataMax)), evt = {
                    newMin: newMin,
                    newMax: newMax
                };
                fireEvent(this, 'zoom', evt, function (e) {
                    // Use e.newMin and e.newMax - event handlers may have altered them
                    var newMin = e.newMin, newMax = e.newMax;
                    if (newMin !== axis.min || newMax !== axis.max) { // #5790
                        // Prevent pinch zooming out of range. Check for defined is for
                        // #1946. #1734.
                        if (!axis.allowZoomOutside) {
                            // #6014, sometimes newMax will be smaller than min (or
                            // newMin will be larger than max).
                            if (defined(dataMin)) {
                                if (newMin < min) {
                                    newMin = min;
                                }
                                if (newMin > max) {
                                    newMin = max;
                                }
                            }
                            if (defined(dataMax)) {
                                if (newMax < min) {
                                    newMax = min;
                                }
                                if (newMax > max) {
                                    newMax = max;
                                }
                            }
                        }
                        // In full view, displaying the reset zoom button is not
                        // required
                        axis.displayBtn = (typeof newMin !== 'undefined' ||
                            typeof newMax !== 'undefined');
                        // Do it
                        axis.setExtremes(newMin, newMax, false, void 0, { trigger: 'zoom' });
                    }
                    e.zoomed = true;
                });
                return evt.zoomed;
            };
            /**
             * Update the axis metrics.
             *
             * @private
             * @function Highcharts.Axis#setAxisSize
             */
            Axis.prototype.setAxisSize = function () {
                var chart = this.chart, options = this.options, 
                // [top, right, bottom, left]
                offsets = options.offsets || [0, 0, 0, 0], horiz = this.horiz, 
                // Check for percentage based input values. Rounding fixes problems
                // with column overflow and plot line filtering (#4898, #4899)
                width = this.width = Math.round(relativeLength(pick(options.width, chart.plotWidth - offsets[3] + offsets[1]), chart.plotWidth)), height = this.height = Math.round(relativeLength(pick(options.height, chart.plotHeight - offsets[0] + offsets[2]), chart.plotHeight)), top = this.top = Math.round(relativeLength(pick(options.top, chart.plotTop + offsets[0]), chart.plotHeight, chart.plotTop)), left = this.left = Math.round(relativeLength(pick(options.left, chart.plotLeft + offsets[3]), chart.plotWidth, chart.plotLeft));
                // Expose basic values to use in Series object and navigator
                this.bottom = chart.chartHeight - height - top;
                this.right = chart.chartWidth - width - left;
                // Direction agnostic properties
                this.len = Math.max(horiz ? width : height, 0); // Math.max fixes #905
                this.pos = horiz ? left : top; // distance from SVG origin
            };
            /**
             * Get the current extremes for the axis.
             *
             * @sample highcharts/members/axis-getextremes/
             *         Report extremes by click on a button
             * @sample maps/members/axis-getextremes/
             *         Get extremes in Highmaps
             *
             * @function Highcharts.Axis#getExtremes
             *
             * @return {Highcharts.ExtremesObject}
             * An object containing extremes information.
             */
            Axis.prototype.getExtremes = function () {
                var axis = this;
                var log = axis.logarithmic;
                return {
                    min: log ?
                        correctFloat(log.lin2log(axis.min)) :
                        axis.min,
                    max: log ?
                        correctFloat(log.lin2log(axis.max)) :
                        axis.max,
                    dataMin: axis.dataMin,
                    dataMax: axis.dataMax,
                    userMin: axis.userMin,
                    userMax: axis.userMax
                };
            };
            /**
             * Get the zero plane either based on zero or on the min or max value.
             * Used in bar and area plots.
             *
             * @function Highcharts.Axis#getThreshold
             *
             * @param {number} threshold
             * The threshold in axis values.
             *
             * @return {number|undefined}
             * The translated threshold position in terms of pixels, and corrected to
             * stay within the axis bounds.
             */
            Axis.prototype.getThreshold = function (threshold) {
                var axis = this, log = axis.logarithmic, realMin = log ? log.lin2log(axis.min) : axis.min, realMax = log ? log.lin2log(axis.max) : axis.max;
                if (threshold === null || threshold === -Infinity) {
                    threshold = realMin;
                }
                else if (threshold === Infinity) {
                    threshold = realMax;
                }
                else if (realMin > threshold) {
                    threshold = realMin;
                }
                else if (realMax < threshold) {
                    threshold = realMax;
                }
                return axis.translate(threshold, 0, 1, 0, 1);
            };
            /**
             * Compute auto alignment for the axis label based on which side the axis is
             * on and the given rotation for the label.
             *
             * @private
             * @function Highcharts.Axis#autoLabelAlign
             *
             * @param {number} rotation
             * The rotation in degrees as set by either the `rotation` or `autoRotation`
             * options.
             *
             * @return {Highcharts.AlignValue}
             * Can be `"center"`, `"left"` or `"right"`.
             */
            Axis.prototype.autoLabelAlign = function (rotation) {
                var angle = (pick(rotation, 0) - (this.side * 90) + 720) % 360, evt = { align: 'center' };
                fireEvent(this, 'autoLabelAlign', evt, function (e) {
                    if (angle > 15 && angle < 165) {
                        e.align = 'right';
                    }
                    else if (angle > 195 && angle < 345) {
                        e.align = 'left';
                    }
                });
                return evt.align;
            };
            /**
             * Get the tick length and width for the axis based on axis options.
             * @private
             * @function Highcharts.Axis#tickSize
             *
             * @param {string} [prefix]
             * 'tick' or 'minorTick'
             *
             * @return {Array<number,number>|undefined}
             * An array of tickLength and tickWidth
             */
            Axis.prototype.tickSize = function (prefix) {
                var options = this.options, tickLength = options[prefix === 'tick' ? 'tickLength' : 'minorTickLength'], tickWidth = pick(options[prefix === 'tick' ? 'tickWidth' : 'minorTickWidth'], 
                // Default to 1 on linear and datetime X axes
                prefix === 'tick' && this.isXAxis && !this.categories ? 1 : 0), e, tickSize;
                if (tickWidth && tickLength) {
                    // Negate the length
                    if (options[prefix + 'Position'] === 'inside') {
                        tickLength = -tickLength;
                    }
                    tickSize = [tickLength, tickWidth];
                }
                e = { tickSize: tickSize };
                fireEvent(this, 'afterTickSize', e);
                return e.tickSize;
            };
            /**
             * Return the size of the labels.
             *
             * @private
             * @function Highcharts.Axis#labelMetrics
             *
             * @return {Highcharts.FontMetricsObject}
             */
            Axis.prototype.labelMetrics = function () {
                var index = this.tickPositions && this.tickPositions[0] || 0;
                return this.chart.renderer.fontMetrics(this.options.labels.style &&
                    this.options.labels.style.fontSize, this.ticks[index] && this.ticks[index].label);
            };
            /**
             * Prevent the ticks from getting so close we can't draw the labels. On a
             * horizontal axis, this is handled by rotating the labels, removing ticks
             * and adding ellipsis. On a vertical axis remove ticks and add ellipsis.
             *
             * @private
             * @function Highcharts.Axis#unsquish
             *
             * @return {number}
             */
            Axis.prototype.unsquish = function () {
                var labelOptions = this.options.labels, horiz = this.horiz, tickInterval = this.tickInterval, newTickInterval = tickInterval, slotSize = this.len / (((this.categories ? 1 : 0) +
                    this.max -
                    this.min) /
                    tickInterval), rotation, rotationOption = labelOptions.rotation, labelMetrics = this.labelMetrics(), step, bestScore = Number.MAX_VALUE, autoRotation, range = this.max - this.min, 
                // Return the multiple of tickInterval that is needed to avoid
                // collision
                getStep = function (spaceNeeded) {
                    var step = spaceNeeded / (slotSize || 1);
                    step = step > 1 ? Math.ceil(step) : 1;
                    // Guard for very small or negative angles (#9835)
                    if (step * tickInterval > range &&
                        spaceNeeded !== Infinity &&
                        slotSize !== Infinity &&
                        range) {
                        step = Math.ceil(range / tickInterval);
                    }
                    return correctFloat(step * tickInterval);
                };
                if (horiz) {
                    autoRotation = !labelOptions.staggerLines &&
                        !labelOptions.step &&
                        ( // #3971
                        defined(rotationOption) ?
                            [rotationOption] :
                            slotSize < pick(labelOptions.autoRotationLimit, 80) && labelOptions.autoRotation);
                    if (autoRotation) {
                        // Loop over the given autoRotation options, and determine
                        // which gives the best score. The best score is that with
                        // the lowest number of steps and a rotation closest
                        // to horizontal.
                        autoRotation.forEach(function (rot) {
                            var score;
                            if (rot === rotationOption ||
                                (rot && rot >= -90 && rot <= 90)) { // #3891
                                step = getStep(Math.abs(labelMetrics.h / Math.sin(deg2rad * rot)));
                                score = step + Math.abs(rot / 360);
                                if (score < bestScore) {
                                    bestScore = score;
                                    rotation = rot;
                                    newTickInterval = step;
                                }
                            }
                        });
                    }
                }
                else if (!labelOptions.step) { // #4411
                    newTickInterval = getStep(labelMetrics.h);
                }
                this.autoRotation = autoRotation;
                this.labelRotation = pick(rotation, rotationOption);
                return newTickInterval;
            };
            /**
             * Get the general slot width for labels/categories on this axis. This may
             * change between the pre-render (from Axis.getOffset) and the final tick
             * rendering and placement.
             *
             * @private
             * @function Highcharts.Axis#getSlotWidth
             *
             * @param {Highcharts.Tick} [tick] Optionally, calculate the slot width
             * basing on tick label. It is used in highcharts-3d module, where the slots
             * has different widths depending on perspective angles.
             *
             * @return {number}
             * The pixel width allocated to each axis label.
             */
            Axis.prototype.getSlotWidth = function (tick) {
                var _a;
                // #5086, #1580, #1931
                var chart = this.chart, horiz = this.horiz, labelOptions = this.options.labels, slotCount = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1), marginLeft = chart.margin[3];
                // Used by grid axis
                if (tick && isNumber(tick.slotWidth)) { // #13221, can be 0
                    return tick.slotWidth;
                }
                if (horiz &&
                    labelOptions &&
                    (labelOptions.step || 0) < 2) {
                    if (labelOptions.rotation) { // #4415
                        return 0;
                    }
                    return ((this.staggerLines || 1) * this.len) / slotCount;
                }
                if (!horiz) {
                    // #7028
                    var cssWidth = (_a = labelOptions === null || labelOptions === void 0 ? void 0 : labelOptions.style) === null || _a === void 0 ? void 0 : _a.width;
                    if (cssWidth !== void 0) {
                        return parseInt(cssWidth, 10);
                    }
                    if (marginLeft) {
                        return marginLeft - chart.spacing[3];
                    }
                }
                // Last resort, a fraction of the available size
                return chart.chartWidth * 0.33;
            };
            /**
             * Render the axis labels and determine whether ellipsis or rotation need to
             * be applied.
             *
             * @private
             * @function Highcharts.Axis#renderUnsquish
             */
            Axis.prototype.renderUnsquish = function () {
                var chart = this.chart, renderer = chart.renderer, tickPositions = this.tickPositions, ticks = this.ticks, labelOptions = this.options.labels, labelStyleOptions = (labelOptions && labelOptions.style || {}), horiz = this.horiz, slotWidth = this.getSlotWidth(), innerWidth = Math.max(1, Math.round(slotWidth - 2 * (labelOptions.padding || 5))), attr = {}, labelMetrics = this.labelMetrics(), textOverflowOption = (labelOptions.style &&
                    labelOptions.style.textOverflow), commonWidth, commonTextOverflow, maxLabelLength = 0, label, i, pos;
                // Set rotation option unless it is "auto", like in gauges
                if (!isString(labelOptions.rotation)) {
                    // #4443:
                    attr.rotation = labelOptions.rotation || 0;
                }
                // Get the longest label length
                tickPositions.forEach(function (tick) {
                    tick = ticks[tick];
                    // Replace label - sorting animation
                    if (tick.movedLabel) {
                        tick.replaceMovedLabel();
                    }
                    if (tick &&
                        tick.label &&
                        tick.label.textPxLength > maxLabelLength) {
                        maxLabelLength = tick.label.textPxLength;
                    }
                });
                this.maxLabelLength = maxLabelLength;
                // Handle auto rotation on horizontal axis
                if (this.autoRotation) {
                    // Apply rotation only if the label is too wide for the slot, and
                    // the label is wider than its height.
                    if (maxLabelLength > innerWidth &&
                        maxLabelLength > labelMetrics.h) {
                        attr.rotation = this.labelRotation;
                    }
                    else {
                        this.labelRotation = 0;
                    }
                    // Handle word-wrap or ellipsis on vertical axis
                }
                else if (slotWidth) {
                    // For word-wrap or ellipsis
                    commonWidth = innerWidth;
                    if (!textOverflowOption) {
                        commonTextOverflow = 'clip';
                        // On vertical axis, only allow word wrap if there is room
                        // for more lines.
                        i = tickPositions.length;
                        while (!horiz && i--) {
                            pos = tickPositions[i];
                            label = ticks[pos].label;
                            if (label) {
                                // Reset ellipsis in order to get the correct
                                // bounding box (#4070)
                                if (label.styles &&
                                    label.styles.textOverflow === 'ellipsis') {
                                    label.css({ textOverflow: 'clip' });
                                    // Set the correct width in order to read
                                    // the bounding box height (#4678, #5034)
                                }
                                else if (label.textPxLength > slotWidth) {
                                    label.css({ width: slotWidth + 'px' });
                                }
                                if (label.getBBox().height > (this.len / tickPositions.length -
                                    (labelMetrics.h - labelMetrics.f))) {
                                    label.specificTextOverflow = 'ellipsis';
                                }
                            }
                        }
                    }
                }
                // Add ellipsis if the label length is significantly longer than ideal
                if (attr.rotation) {
                    commonWidth = (maxLabelLength > chart.chartHeight * 0.5 ?
                        chart.chartHeight * 0.33 :
                        maxLabelLength);
                    if (!textOverflowOption) {
                        commonTextOverflow = 'ellipsis';
                    }
                }
                // Set the explicit or automatic label alignment
                this.labelAlign = labelOptions.align ||
                    this.autoLabelAlign(this.labelRotation);
                if (this.labelAlign) {
                    attr.align = this.labelAlign;
                }
                // Apply general and specific CSS
                tickPositions.forEach(function (pos) {
                    var tick = ticks[pos], label = tick && tick.label, widthOption = labelStyleOptions.width, css = {};
                    if (label) {
                        // This needs to go before the CSS in old IE (#4502)
                        label.attr(attr);
                        if (tick.shortenLabel) {
                            tick.shortenLabel();
                        }
                        else if (commonWidth &&
                            !widthOption &&
                            // Setting width in this case messes with the bounding box
                            // (#7975)
                            labelStyleOptions.whiteSpace !== 'nowrap' &&
                            (
                            // Speed optimizing, #7656
                            commonWidth < label.textPxLength ||
                                // Resetting CSS, #4928
                                label.element.tagName === 'SPAN')) {
                            css.width = commonWidth + 'px';
                            if (!textOverflowOption) {
                                css.textOverflow = (label.specificTextOverflow ||
                                    commonTextOverflow);
                            }
                            label.css(css);
                            // Reset previously shortened label (#8210)
                        }
                        else if (label.styles &&
                            label.styles.width &&
                            !css.width &&
                            !widthOption) {
                            label.css({ width: null });
                        }
                        delete label.specificTextOverflow;
                        tick.rotation = attr.rotation;
                    }
                }, this);
                // Note: Why is this not part of getLabelPosition?
                this.tickRotCorr = renderer.rotCorr(labelMetrics.b, this.labelRotation || 0, this.side !== 0);
            };
            /**
             * Return true if the axis has associated data.
             *
             * @function Highcharts.Axis#hasData
             *
             * @return {boolean}
             * True if the axis has associated visible series and those series have
             * either valid data points or explicit `min` and `max` settings.
             */
            Axis.prototype.hasData = function () {
                return this.series.some(function (s) {
                    return s.hasData();
                }) ||
                    (this.options.showEmpty &&
                        defined(this.min) &&
                        defined(this.max));
            };
            /**
             * Adds the title defined in axis.options.title.
             *
             * @function Highcharts.Axis#addTitle
             *
             * @param {boolean} [display]
             * Whether or not to display the title.
             */
            Axis.prototype.addTitle = function (display) {
                var axis = this, renderer = axis.chart.renderer, horiz = axis.horiz, opposite = axis.opposite, options = axis.options, axisTitleOptions = options.title, textAlign, styledMode = axis.chart.styledMode;
                if (!axis.axisTitle) {
                    textAlign = axisTitleOptions.textAlign;
                    if (!textAlign) {
                        textAlign = (horiz ? {
                            low: 'left',
                            middle: 'center',
                            high: 'right'
                        } : {
                            low: opposite ? 'right' : 'left',
                            middle: 'center',
                            high: opposite ? 'left' : 'right'
                        })[axisTitleOptions.align];
                    }
                    axis.axisTitle = renderer
                        .text(axisTitleOptions.text, 0, 0, axisTitleOptions.useHTML)
                        .attr({
                        zIndex: 7,
                        rotation: axisTitleOptions.rotation || 0,
                        align: textAlign
                    })
                        .addClass('highcharts-axis-title');
                    // #7814, don't mutate style option
                    if (!styledMode) {
                        axis.axisTitle.css(merge(axisTitleOptions.style));
                    }
                    axis.axisTitle.add(axis.axisGroup);
                    axis.axisTitle.isNew = true;
                }
                // Max width defaults to the length of the axis
                if (!styledMode &&
                    !axisTitleOptions.style.width &&
                    !axis.isRadial) {
                    axis.axisTitle.css({
                        width: axis.len + 'px'
                    });
                }
                // hide or show the title depending on whether showEmpty is set
                axis.axisTitle[display ? 'show' : 'hide'](display);
            };
            /**
             * Generates a tick for initial positioning.
             *
             * @private
             * @function Highcharts.Axis#generateTick
             *
             * @param {number} pos
             * The tick position in axis values.
             *
             * @param {number} [i]
             * The index of the tick in {@link Axis.tickPositions}.
             */
            Axis.prototype.generateTick = function (pos) {
                var axis = this;
                var ticks = axis.ticks;
                if (!ticks[pos]) {
                    ticks[pos] = new Tick(axis, pos);
                }
                else {
                    ticks[pos].addLabel(); // update labels depending on tick interval
                }
            };
            /**
             * Render the tick labels to a preliminary position to get their sizes
             *
             * @private
             * @function Highcharts.Axis#getOffset
             *
             * @fires Highcharts.Axis#event:afterGetOffset
             */
            Axis.prototype.getOffset = function () {
                var axis = this, chart = axis.chart, renderer = chart.renderer, options = axis.options, tickPositions = axis.tickPositions, ticks = axis.ticks, horiz = axis.horiz, side = axis.side, invertedSide = chart.inverted &&
                    !axis.isZAxis ? [1, 0, 3, 2][side] : side, hasData, showAxis, titleOffset = 0, titleOffsetOption, titleMargin = 0, axisTitleOptions = options.title, labelOptions = options.labels, labelOffset = 0, // reset
                labelOffsetPadded, axisOffset = chart.axisOffset, clipOffset = chart.clipOffset, clip, directionFactor = [-1, 1, 1, -1][side], className = options.className, axisParent = axis.axisParent, // Used in color axis
                lineHeightCorrection;
                // For reuse in Axis.render
                hasData = axis.hasData();
                axis.showAxis = showAxis = hasData || pick(options.showEmpty, true);
                // Set/reset staggerLines
                axis.staggerLines = axis.horiz && labelOptions.staggerLines;
                // Create the axisGroup and gridGroup elements on first iteration
                if (!axis.axisGroup) {
                    axis.gridGroup = renderer.g('grid')
                        .attr({ zIndex: options.gridZIndex || 1 })
                        .addClass('highcharts-' + this.coll.toLowerCase() + '-grid ' +
                        (className || ''))
                        .add(axisParent);
                    axis.axisGroup = renderer.g('axis')
                        .attr({ zIndex: options.zIndex || 2 })
                        .addClass('highcharts-' + this.coll.toLowerCase() + ' ' +
                        (className || ''))
                        .add(axisParent);
                    axis.labelGroup = renderer.g('axis-labels')
                        .attr({ zIndex: labelOptions.zIndex || 7 })
                        .addClass('highcharts-' + axis.coll.toLowerCase() + '-labels ' +
                        (className || ''))
                        .add(axisParent);
                }
                if (hasData || axis.isLinked) {
                    // Generate ticks
                    tickPositions.forEach(function (pos, i) {
                        // i is not used here, but may be used in overrides
                        axis.generateTick(pos, i);
                    });
                    axis.renderUnsquish();
                    // Left side must be align: right and right side must
                    // have align: left for labels
                    axis.reserveSpaceDefault = (side === 0 ||
                        side === 2 ||
                        { 1: 'left', 3: 'right' }[side] === axis.labelAlign);
                    if (pick(labelOptions.reserveSpace, axis.labelAlign === 'center' ? true : null, axis.reserveSpaceDefault)) {
                        tickPositions.forEach(function (pos) {
                            // get the highest offset
                            labelOffset = Math.max(ticks[pos].getLabelSize(), labelOffset);
                        });
                    }
                    if (axis.staggerLines) {
                        labelOffset *= axis.staggerLines;
                    }
                    axis.labelOffset = labelOffset * (axis.opposite ? -1 : 1);
                }
                else { // doesn't have data
                    objectEach(ticks, function (tick, n) {
                        tick.destroy();
                        delete ticks[n];
                    });
                }
                if (axisTitleOptions &&
                    axisTitleOptions.text &&
                    axisTitleOptions.enabled !== false) {
                    axis.addTitle(showAxis);
                    if (showAxis && axisTitleOptions.reserveSpace !== false) {
                        axis.titleOffset = titleOffset =
                            axis.axisTitle.getBBox()[horiz ? 'height' : 'width'];
                        titleOffsetOption = axisTitleOptions.offset;
                        titleMargin = defined(titleOffsetOption) ?
                            0 :
                            pick(axisTitleOptions.margin, horiz ? 5 : 10);
                    }
                }
                // Render the axis line
                axis.renderLine();
                // handle automatic or user set offset
                axis.offset = directionFactor * pick(options.offset, axisOffset[side] ? axisOffset[side] + (options.margin || 0) : 0);
                axis.tickRotCorr = axis.tickRotCorr || { x: 0, y: 0 }; // polar
                if (side === 0) {
                    lineHeightCorrection = -axis.labelMetrics().h;
                }
                else if (side === 2) {
                    lineHeightCorrection = axis.tickRotCorr.y;
                }
                else {
                    lineHeightCorrection = 0;
                }
                // Find the padded label offset
                labelOffsetPadded = Math.abs(labelOffset) + titleMargin;
                if (labelOffset) {
                    labelOffsetPadded -= lineHeightCorrection;
                    labelOffsetPadded += directionFactor * (horiz ?
                        pick(labelOptions.y, axis.tickRotCorr.y + directionFactor * 8) :
                        labelOptions.x);
                }
                axis.axisTitleMargin = pick(titleOffsetOption, labelOffsetPadded);
                if (axis.getMaxLabelDimensions) {
                    axis.maxLabelDimensions = axis.getMaxLabelDimensions(ticks, tickPositions);
                }
                // Due to GridAxis.tickSize, tickSize should be calculated after ticks
                // has rendered.
                var tickSize = this.tickSize('tick');
                axisOffset[side] = Math.max(axisOffset[side], axis.axisTitleMargin + titleOffset +
                    directionFactor * axis.offset, labelOffsetPadded, // #3027
                tickPositions && tickPositions.length && tickSize ?
                    tickSize[0] + directionFactor * axis.offset :
                    0 // #4866
                );
                // Decide the clipping needed to keep the graph inside
                // the plot area and axis lines
                clip = options.offset ?
                    0 :
                    // #4308, #4371:
                    Math.floor(axis.axisLine.strokeWidth() / 2) * 2;
                clipOffset[invertedSide] =
                    Math.max(clipOffset[invertedSide], clip);
                fireEvent(this, 'afterGetOffset');
            };
            /**
             * Internal function to get the path for the axis line. Extended for polar
             * charts.
             *
             * @function Highcharts.Axis#getLinePath
             *
             * @param {number} lineWidth
             * The line width in pixels.
             *
             * @return {Highcharts.SVGPathArray}
             * The SVG path definition in array form.
             */
            Axis.prototype.getLinePath = function (lineWidth) {
                var chart = this.chart, opposite = this.opposite, offset = this.offset, horiz = this.horiz, lineLeft = this.left + (opposite ? this.width : 0) + offset, lineTop = chart.chartHeight - this.bottom -
                    (opposite ? this.height : 0) + offset;
                if (opposite) {
                    lineWidth *= -1; // crispify the other way - #1480, #1687
                }
                return chart.renderer
                    .crispLine([
                    [
                        'M',
                        horiz ?
                            this.left :
                            lineLeft,
                        horiz ?
                            lineTop :
                            this.top
                    ],
                    [
                        'L',
                        horiz ?
                            chart.chartWidth - this.right :
                            lineLeft,
                        horiz ?
                            lineTop :
                            chart.chartHeight - this.bottom
                    ]
                ], lineWidth);
            };
            /**
             * Render the axis line. Called internally when rendering and redrawing the
             * axis.
             *
             * @function Highcharts.Axis#renderLine
             */
            Axis.prototype.renderLine = function () {
                if (!this.axisLine) {
                    this.axisLine = this.chart.renderer.path()
                        .addClass('highcharts-axis-line')
                        .add(this.axisGroup);
                    if (!this.chart.styledMode) {
                        this.axisLine.attr({
                            stroke: this.options.lineColor,
                            'stroke-width': this.options.lineWidth,
                            zIndex: 7
                        });
                    }
                }
            };
            /**
             * Position the axis title.
             *
             * @private
             * @function Highcharts.Axis#getTitlePosition
             *
             * @return {Highcharts.PositionObject}
             * X and Y positions for the title.
             */
            Axis.prototype.getTitlePosition = function () {
                // compute anchor points for each of the title align options
                var horiz = this.horiz, axisLeft = this.left, axisTop = this.top, axisLength = this.len, axisTitleOptions = this.options.title, margin = horiz ? axisLeft : axisTop, opposite = this.opposite, offset = this.offset, xOption = axisTitleOptions.x || 0, yOption = axisTitleOptions.y || 0, axisTitle = this.axisTitle, fontMetrics = this.chart.renderer.fontMetrics(axisTitleOptions.style &&
                    axisTitleOptions.style.fontSize, axisTitle), 
                // The part of a multiline text that is below the baseline of the
                // first line. Subtract 1 to preserve pixel-perfectness from the
                // old behaviour (v5.0.12), where only one line was allowed.
                textHeightOvershoot = Math.max(axisTitle.getBBox(null, 0).height - fontMetrics.h - 1, 0), 
                // the position in the length direction of the axis
                alongAxis = {
                    low: margin + (horiz ? 0 : axisLength),
                    middle: margin + axisLength / 2,
                    high: margin + (horiz ? axisLength : 0)
                }[axisTitleOptions.align], 
                // the position in the perpendicular direction of the axis
                offAxis = (horiz ? axisTop + this.height : axisLeft) +
                    (horiz ? 1 : -1) * // horizontal axis reverses the margin
                        (opposite ? -1 : 1) * // so does opposite axes
                        this.axisTitleMargin +
                    [
                        -textHeightOvershoot,
                        textHeightOvershoot,
                        fontMetrics.f,
                        -textHeightOvershoot // left
                    ][this.side], titlePosition = {
                    x: horiz ?
                        alongAxis + xOption :
                        offAxis + (opposite ? this.width : 0) + offset + xOption,
                    y: horiz ?
                        offAxis + yOption - (opposite ? this.height : 0) + offset :
                        alongAxis + yOption
                };
                fireEvent(this, 'afterGetTitlePosition', { titlePosition: titlePosition });
                return titlePosition;
            };
            /**
             * Render a minor tick into the given position. If a minor tick already
             * exists in this position, move it.
             *
             * @function Highcharts.Axis#renderMinorTick
             *
             * @param {number} pos
             * The position in axis values.
             */
            Axis.prototype.renderMinorTick = function (pos) {
                var axis = this;
                var slideInTicks = axis.chart.hasRendered && isNumber(axis.oldMin);
                var minorTicks = axis.minorTicks;
                if (!minorTicks[pos]) {
                    minorTicks[pos] = new Tick(axis, pos, 'minor');
                }
                // Render new ticks in old position
                if (slideInTicks && minorTicks[pos].isNew) {
                    minorTicks[pos].render(null, true);
                }
                minorTicks[pos].render(null, false, 1);
            };
            /**
             * Render a major tick into the given position. If a tick already exists
             * in this position, move it.
             *
             * @function Highcharts.Axis#renderTick
             *
             * @param {number} pos
             * The position in axis values.
             *
             * @param {number} i
             * The tick index.
             */
            Axis.prototype.renderTick = function (pos, i) {
                var axis = this;
                var isLinked = axis.isLinked;
                var ticks = axis.ticks;
                var slideInTicks = axis.chart.hasRendered && isNumber(axis.oldMin);
                // Linked axes need an extra check to find out if
                if (!isLinked ||
                    (pos >= axis.min && pos <= axis.max)) {
                    if (!ticks[pos]) {
                        ticks[pos] = new Tick(axis, pos);
                    }
                    // NOTE this seems like overkill. Could be handled in tick.render by
                    // setting old position in attr, then set new position in animate.
                    // render new ticks in old position
                    if (slideInTicks && ticks[pos].isNew) {
                        // Start with negative opacity so that it is visible from
                        // halfway into the animation
                        ticks[pos].render(i, true, -1);
                    }
                    ticks[pos].render(i);
                }
            };
            /**
             * Render the axis.
             *
             * @private
             * @function Highcharts.Axis#render
             *
             * @fires Highcharts.Axis#event:afterRender
             */
            Axis.prototype.render = function () {
                var axis = this, chart = axis.chart, log = axis.logarithmic, renderer = chart.renderer, options = axis.options, isLinked = axis.isLinked, tickPositions = axis.tickPositions, axisTitle = axis.axisTitle, ticks = axis.ticks, minorTicks = axis.minorTicks, alternateBands = axis.alternateBands, stackLabelOptions = options.stackLabels, alternateGridColor = options.alternateGridColor, tickmarkOffset = axis.tickmarkOffset, axisLine = axis.axisLine, showAxis = axis.showAxis, animation = animObject(renderer.globalAnimation), from, to;
                // Reset
                axis.labelEdge.length = 0;
                axis.overlap = false;
                // Mark all elements inActive before we go over and mark the active ones
                [ticks, minorTicks, alternateBands].forEach(function (coll) {
                    objectEach(coll, function (tick) {
                        tick.isActive = false;
                    });
                });
                // If the series has data draw the ticks. Else only the line and title
                if (axis.hasData() || isLinked) {
                    // minor ticks
                    if (axis.minorTickInterval && !axis.categories) {
                        axis.getMinorTickPositions().forEach(function (pos) {
                            axis.renderMinorTick(pos);
                        });
                    }
                    // Major ticks. Pull out the first item and render it last so that
                    // we can get the position of the neighbour label. #808.
                    if (tickPositions.length) { // #1300
                        tickPositions.forEach(function (pos, i) {
                            axis.renderTick(pos, i);
                        });
                        // In a categorized axis, the tick marks are displayed
                        // between labels. So we need to add a tick mark and
                        // grid line at the left edge of the X axis.
                        if (tickmarkOffset && (axis.min === 0 || axis.single)) {
                            if (!ticks[-1]) {
                                ticks[-1] = new Tick(axis, -1, null, true);
                            }
                            ticks[-1].render(-1);
                        }
                    }
                    // alternate grid color
                    if (alternateGridColor) {
                        tickPositions.forEach(function (pos, i) {
                            to = typeof tickPositions[i + 1] !== 'undefined' ?
                                tickPositions[i + 1] + tickmarkOffset :
                                axis.max - tickmarkOffset;
                            if (i % 2 === 0 &&
                                pos < axis.max &&
                                to <= axis.max + (chart.polar ?
                                    -tickmarkOffset :
                                    tickmarkOffset)) { // #2248, #4660
                                if (!alternateBands[pos]) {
                                    // Should be imported from PlotLineOrBand.js, but
                                    // the dependency cycle with axis is a problem
                                    alternateBands[pos] = new H.PlotLineOrBand(axis);
                                }
                                from = pos + tickmarkOffset; // #949
                                alternateBands[pos].options = {
                                    from: log ? log.lin2log(from) : from,
                                    to: log ? log.lin2log(to) : to,
                                    color: alternateGridColor,
                                    className: 'highcharts-alternate-grid'
                                };
                                alternateBands[pos].render();
                                alternateBands[pos].isActive = true;
                            }
                        });
                    }
                    // custom plot lines and bands
                    if (!axis._addedPlotLB) { // only first time
                        (options.plotLines || [])
                            .concat(options.plotBands || [])
                            .forEach(function (plotLineOptions) {
                            axis.addPlotBandOrLine(plotLineOptions);
                        });
                        axis._addedPlotLB = true;
                    }
                } // end if hasData
                // Remove inactive ticks
                [ticks, minorTicks, alternateBands].forEach(function (coll) {
                    var i, forDestruction = [], delay = animation.duration, destroyInactiveItems = function () {
                        i = forDestruction.length;
                        while (i--) {
                            // When resizing rapidly, the same items
                            // may be destroyed in different timeouts,
                            // or the may be reactivated
                            if (coll[forDestruction[i]] &&
                                !coll[forDestruction[i]].isActive) {
                                coll[forDestruction[i]].destroy();
                                delete coll[forDestruction[i]];
                            }
                        }
                    };
                    objectEach(coll, function (tick, pos) {
                        if (!tick.isActive) {
                            // Render to zero opacity
                            tick.render(pos, false, 0);
                            tick.isActive = false;
                            forDestruction.push(pos);
                        }
                    });
                    // When the objects are finished fading out, destroy them
                    syncTimeout(destroyInactiveItems, coll === alternateBands ||
                        !chart.hasRendered ||
                        !delay ?
                        0 :
                        delay);
                });
                // Set the axis line path
                if (axisLine) {
                    axisLine[axisLine.isPlaced ? 'animate' : 'attr']({
                        d: this.getLinePath(axisLine.strokeWidth())
                    });
                    axisLine.isPlaced = true;
                    // Show or hide the line depending on options.showEmpty
                    axisLine[showAxis ? 'show' : 'hide'](showAxis);
                }
                if (axisTitle && showAxis) {
                    var titleXy = axis.getTitlePosition();
                    if (isNumber(titleXy.y)) {
                        axisTitle[axisTitle.isNew ? 'attr' : 'animate'](titleXy);
                        axisTitle.isNew = false;
                    }
                    else {
                        axisTitle.attr('y', -9999);
                        axisTitle.isNew = true;
                    }
                }
                // Stacked totals:
  