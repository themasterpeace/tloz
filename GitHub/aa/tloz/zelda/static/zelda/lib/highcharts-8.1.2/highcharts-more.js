belType>}
         */
        this.labels = [];
        /**
         * The array of shapes which belong to the annotation.
         *
         * @private
         * @name Highcharts.Annotation#shapes
         * @type {Array<Highcharts.AnnotationShapeType>}
         */
        this.shapes = [];
        /**
         * The options for the annotations.
         *
         * @name Highcharts.Annotation#options
         * @type {Highcharts.AnnotationsOptions}
         */
        this.options = merge(this.defaultOptions, userOptions);
        /**
         * The user options for the annotations.
         *
         * @name Highcharts.Annotation#userOptions
         * @type {Highcharts.AnnotationsOptions}
         */
        this.userOptions = userOptions;
        // Handle labels and shapes - those are arrays
        // Merging does not work with arrays (stores reference)
        labelsAndShapes = this.getLabelsAndShapesOptions(this.options, userOptions);
        this.options.labels = labelsAndShapes.labels;
        this.options.shapes = labelsAndShapes.shapes;
        /**
         * The callback that reports to the overlapping-labels module which
         * labels it should account for.
         * @private
         * @name Highcharts.Annotation#labelCollector
         * @type {Function}
         */
        /**
         * The group svg element.
         *
         * @name Highcharts.Annotation#group
         * @type {Highcharts.SVGElement}
         */
        /**
         * The group svg element of the annotation's shapes.
         *
         * @name Highcharts.Annotation#shapesGroup
         * @type {Highcharts.SVGElement}
         */
        /**
         * The group svg element of the annotation's labels.
         *
         * @name Highcharts.Annotation#labelsGroup
         * @type {Highcharts.SVGElement}
         */
        this.init(chart, this.options);
    }
    /**
     * Initialize the annotation.
     * @private
     */
    Annotation.prototype.init = function () {
        this.linkPoints();
        this.addControlPoints();
        this.addShapes();
        this.addLabels();
        this.setLabelCollector();
    };
    Annotation.prototype.getLabelsAndShapesOptions = function (baseOptions, newOptions) {
        var mergedOptions = {};
        ['labels', 'shapes'].forEach(function (name) {
            if (baseOptions[name]) {
                mergedOptions[name] = splat(newOptions[name]).map(function (basicOptions, i) {
                    return merge(baseOptions[name][i], basicOptions);
                });
            }
        });
        return mergedOptions;
    };
    Annotation.prototype.addShapes = function () {
        (this.options.shapes || []).forEach(function (shapeOptions, i) {
            var shape = this.initShape(shapeOptions, i);
            merge(true, this.options.shapes[i], shape.options);
        }, this);
    };
    Annotation.prototype.addLabels = function () {
        (this.options.labels || []).forEach(function (labelsOptions, i) {
            var labels = this.initLabel(labelsOptions, i);
            merge(true, this.options.labels[i], labels.options);
        }, this);
    };
    Annotation.prototype.addClipPaths = function () {
        this.setClipAxes();
        if (this.clipXAxis && this.clipYAxis) {
            this.clipRect = this.chart.renderer.clipRect(this.getClipBox());
        }
    };
    Annotation.prototype.setClipAxes = function () {
        var xAxes = this.chart.xAxis, yAxes = this.chart.yAxis, linkedAxes = (this.options.labels || [])
            .concat(this.options.shapes || [])
            .reduce(function (axes, labelOrShape) {
            return [
                xAxes[labelOrShape &&
                    labelOrShape.point &&
                    labelOrShape.point.xAxis] || axes[0],
                yAxes[labelOrShape &&
                    labelOrShape.point &&
                    labelOrShape.point.yAxis] || axes[1]
            ];
        }, []);
        this.clipXAxis = linkedAxes[0];
        this.clipYAxis = linkedAxes[1];
    };
    Annotation.prototype.getClipBox = function () {
        if (this.clipXAxis && this.clipYAxis) {
            return {
                x: this.clipXAxis.left,
                y: this.clipYAxis.top,
                width: this.clipXAxis.width,
                height: this.clipYAxis.height
            };
        }
    };
    Annotation.prototype.setLabelCollector = function () {
        var annotation = this;
        annotation.labelCollector = function () {
            return annotation.labels.reduce(function (labels, label) {
                if (!label.options.allowOverlap) {
                    labels.push(label.graphic);
                }
                return labels;
            }, []);
        };
        annotation.chart.labelCollectors.push(annotation.labelCollector);
    };
    /**
     * Set an annotation options.
     * @private
     * @param {Highcharts.AnnotationsOptions} - user options for an annotation
     */
    Annotation.prototype.setOptions = function (userOptions) {
        this.options = merge(this.defaultOptions, userOptions);
    };
    Annotation.prototype.redraw = function (animation) {
        this.linkPoints();
        if (!this.graphic) {
            this.render();
        }
        if (this.clipRect) {
            this.clipRect.animate(this.getClipBox());
        }
        this.redrawItems(this.shapes, animation);
        this.redrawItems(this.labels, animation);
        ControllableMixin.redraw.call(this, animation);
    };
    /**
     * @private
     * @param {Array<Highcharts.AnnotationControllable>} items
     * @param {boolean} [animation]
     */
    Annotation.prototype.redrawItems = function (items, animation) {
        var i = items.length;
        // needs a backward loop
        // labels/shapes array might be modified
        // due to destruction of the item
        while (i--) {
            this.redrawItem(items[i], animation);
        }
    };
    /**
     * @private
     * @param {Array<Highcharts.AnnotationControllable>} items
     */
    Annotation.prototype.renderItems = function (items) {
        var i = items.length;
        while (i--) {
            this.renderItem(items[i]);
        }
    };
    Annotation.prototype.render = function () {
        var renderer = this.chart.renderer;
        this.graphic = renderer
            .g('annotation')
            .attr({
            zIndex: this.options.zIndex,
            visibility: this.options.visible ?
                'visible' :
                'hidden'
        })
            .add();
        this.shapesGroup = renderer
            .g('annotation-shapes')
            .add(this.graphic)
            .clip(this.chart.plotBoxClip);
        this.labelsGroup = renderer
            .g('annotation-labels')
            .attr({
            // hideOverlappingLabels requires translation
            translateX: 0,
            translateY: 0
        })
            .add(this.graphic);
        this.addClipPaths();
        if (this.clipRect) {
            this.graphic.clip(this.clipRect);
        }
        // Render shapes and labels before adding events (#13070).
        this.renderItems(this.shapes);
        this.renderItems(this.labels);
        this.addEvents();
        ControllableMixin.render.call(this);
    };
    /**
     * Set the annotation's visibility.
     * @private
     * @param {boolean} [visible]
     * Whether to show or hide an annotation. If the param is omitted, the
     * annotation's visibility is toggled.
     */
    Annotation.prototype.setVisibility = function (visible) {
        var options = this.options, visibility = pick(visible, !options.visible);
        this.graphic.attr('visibility', visibility ? 'visible' : 'hidden');
        if (!visibility) {
            this.setControlPointsVisibility(false);
        }
        options.visible = visibility;
    };
    Annotation.prototype.setControlPointsVisibility = function (visible) {
        var setItemControlPointsVisibility = function (item) {
            item.setControlPointsVisibility(visible);
        };
        ControllableMixin.setControlPointsVisibility.call(this, visible);
        this.shapes.forEach(setItemControlPointsVisibility);
        this.labels.forEach(setItemControlPointsVisibility);
    };
    /**
     * Destroy the annotation. This function does not touch the chart
     * that the annotation belongs to (all annotations are kept in
     * the chart.annotations array) - it is recommended to use
     * {@link Highcharts.Chart#removeAnnotation} instead.
     * @private
     */
    Annotation.prototype.destroy = function () {
        var chart = this.chart, destroyItem = function (item) {
            item.destroy();
        };
        this.labels.forEach(destroyItem);
        this.shapes.forEach(destroyItem);
        this.clipXAxis = null;
        this.clipYAxis = null;
        erase(chart.labelCollectors, this.labelCollector);
        EventEmitterMixin.destroy.call(this);
        ControllableMixin.destroy.call(this);
        destroyObjectProperties(this, chart);
    };
    /**
     * See {@link Highcharts.Chart#removeAnnotation}.
     * @private
     */
    Annotation.prototype.remove = function () {
        // Let chart.update() remove annoations on demand
        return this.chart.removeAnnotation(this);
    };
    /**
     * Updates an annotation.
     *
     * @function Highcharts.Annotation#update
     *
     * @param {Partial<Highcharts.AnnotationsOptions>} userOptions
     * New user options for the annotation.
     *
     * @return {void}
     */
    Annotation.prototype.update = function (userOptions, redraw) {
        var chart = this.chart, labelsAndShapes = this.getLabelsAndShapesOptions(this.userOptions, userOptions), userOptionsIndex = chart.annotations.indexOf(this), options = merge(true, this.userOptions, userOptions);
        options.labels = labelsAndShapes.labels;
        options.shapes = labelsAndShapes.shapes;
        this.destroy();
        this.constructor(chart, options);
        // Update options in chart options, used in exporting (#9767):
        chart.options.annotations[userOptionsIndex] = options;
        this.isUpdating = true;
        if (pick(redraw, true)) {
            chart.redraw();
        }
        fireEvent(this, 'afterUpdate');
        this.isUpdating = false;
    };
    /* *************************************************************
        * ITEM SECTION
        * Contains methods for handling a single item in an annotation
        **************************************************************** */
    /**
     * Initialisation of a single shape
     * @private
     * @param {Object} shapeOptions - a confg object for a single shape
     */
    Annotation.prototype.initShape = function (shapeOptions, index) {
        var options = merge(this.options.shapeOptions, {
            controlPointOptions: this.options.controlPointOptions
        }, shapeOptions), shape = new Annotation.shapesMap[options.type](this, options, index);
        shape.itemType = 'shape';
        this.shapes.push(shape);
        return shape;
    };
    /**
     * Initialisation of a single label
     * @private
     */
    Annotation.prototype.initLabel = function (labelOptions, index) {
        var options = merge(this.options.labelOptions, {
            controlPointOptions: this.options.controlPointOptions
        }, labelOptions), label = new ControllableLabel(this, options, index);
        label.itemType = 'label';
        this.labels.push(label);
        return label;
    };
    /**
     * Redraw a single item.
     * @private
     * @param {Annotation.Label|Annotation.Shape} item
     * @param {boolean} [animation]
     */
    Annotation.prototype.redrawItem = function (item, animation) {
        item.linkPoints();
        if (!item.shouldBeDrawn()) {
            this.destroyItem(item);
        }
        else {
            if (!item.graphic) {
                this.renderItem(item);
            }
            item.redraw(pick(animation, true) && item.graphic.placed);
            if (item.points.length) {
                this.adjustVisibility(item);
            }
        }
    };
    /**
     * Hide or show annotaiton attached to points.
     * @private
     * @param {Annotation.Label|Annotation.Shape} item
     */
    Annotation.prototype.adjustVisibility = function (item) {
        var hasVisiblePoints = false, label = item.graphic;
        item.points.forEach(function (point) {
            if (point.series.visible !== false &&
                point.visible !== false) {
                hasVisiblePoints = true;
            }
        });
        if (!hasVisiblePoints) {
            label.hide();
        }
        else if (label.visibility === 'hidden') {
            label.show();
        }
    };
    /**
     * Destroy a single item.
     * @private
     * @param {Annotation.Label|Annotation.Shape} item
     */
    Annotation.prototype.destroyItem = function (item) {
        // erase from shapes or labels array
        erase(this[item.itemType + 's'], item);
        item.destroy();
    };
    /**
     * @private
     */
    Annotation.prototype.renderItem = function (item) {
        item.render(item.itemType === 'label' ?
            this.labelsGroup :
            this.shapesGroup);
    };
    /**
     * @private
     */
    Annotation.ControlPoint = ControlPoint;
    /**
     * @private
     */
    Annotation.MockPoint = MockPoint;
    /**
     * An object uses for mapping between a shape type and a constructor.
     * To add a new shape type extend this object with type name as a key
     * and a constructor as its value.
     */
    Annotation.shapesMap = {
        'rect': ControllableRect,
        'circle': ControllableCircle,
        'path': ControllablePath,
        'image': ControllableImage
    };
    /**
     * @private
     */
    Annotation.types = {};
    return Annotation;
}());
merge(true, Annotation.prototype, ControllableMixin, EventEmitterMixin, 
// restore original Annotation implementation after mixin overwrite
merge(Annotation.prototype, 
/** @lends Highcharts.Annotation# */
{
    /**
     * List of events for `annotation.options.events` that should not be
     * added to `annotation.graphic` but to the `annotation`.
     *
     * @private
     * @type {Array<string>}
     */
    nonDOMEvents: ['add', 'afterUpdate', 'drag', 'remove'],
    /**
     * A basic type of an annotation. It allows to add custom labels
     * or shapes. The items  can be tied to points, axis coordinates
     * or chart pixel coordinates.
     *
     * @sample highcharts/annotations/basic/
     *         Basic annotations
     * @sample highcharts/demo/annotations/
     *         Advanced annotations
     * @sample highcharts/css/annotations
     *         Styled mode
     * @sample highcharts/annotations-advanced/controllable
     *         Controllable items
     * @sample {highstock} stock/annotations/fibonacci-retracements
     *         Custom annotation, Fibonacci retracement
     *
     * @type         {Array<*>}
     * @since        6.0.0
     * @requires     modules/annotations
     * @optionparent annotations
     *
     * @private
     */
    defaultOptions: {
        /**
         * Sets an ID for an annotation. Can be user later when
         * removing an annotation in [Chart#removeAnnotation(id)](
         * /class-reference/Highcharts.Chart#removeAnnotation) method.
         *
         * @type      {number|string}
         * @apioption annotations.id
         */
        /**
         * Whether the annotation is visible.
         *
         * @sample highcharts/annotations/visible/
         *         Set annotation visibility
         */
        visible: true,
        /**
         * Allow an annotation to be draggable by a user. Possible
         * values are `'x'`, `'xy'`, `'y'` and `''` (disabled).
         *
         * @sample highcharts/annotations/draggable/
         *         Annotations draggable: 'xy'
         *
         * @type {Highcharts.AnnotationDraggableValue}
         */
        draggable: 'xy',
        /**
         * Options for annotation's labels. Each label inherits options
         * from the labelOptions object. An option from the labelOptions
         * can be overwritten by config for a specific label.
         *
         * @requires modules/annotations
         */
        labelOptions: {
            /**
             * The alignment of the annotation's label. If right,
             * the right side of the label should be touching the point.
             *
             * @sample highcharts/annotations/label-position/
             *         Set labels position
             *
             * @type {Highcharts.AlignValue}
             */
            align: 'center',
            /**
             * Whether to allow the annotation's labels to overlap.
             * To make the labels less sensitive for overlapping,
             * the can be set to 0.
             *
             * @sample highcharts/annotations/tooltip-like/
             *         Hide overlapping labels
             */
            allowOverlap: false,
            /**
             * The background color or gradient for the annotation's
             * label.
             *
             * @sample highcharts/annotations/label-presentation/
             *         Set labels graphic options
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            /**
             * The border color for the annotation's label.
             *
             * @sample highcharts/annotations/label-presentation/
             *         Set labels graphic options
             *
             * @type {Highcharts.ColorString}
             */
            borderColor: 'black',
            /**
             * The border radius in pixels for the annotaiton's label.
             *
             * @sample highcharts/annotations/label-presentation/
             *         Set labels graphic options
             */
            borderRadius: 3,
            /**
             * The border width in pixels for the annotation's label
             *
             * @sample highcharts/annotations/label-presentation/
             *         Set labels graphic options
             */
            borderWidth: 1,
            /**
             * A class name for styling by CSS.
             *
             * @sample highcharts/css/annotations
             *         Styled mode annotations
             *
             * @since 6.0.5
             */
            className: '',
            /**
             * Whether to hide the annotation's label
             * that is outside the plot area.
             *
             * @sample highcharts/annotations/label-crop-overflow/
             *         Crop or justify labels
             */
            crop: false,
            /**
             * The label's pixel distance from the point.
             *
             * @sample highcharts/annotations/label-position/
             *         Set labels position
             *
             * @type      {number}
             * @apioption annotations.labelOptions.distance
             */
            /**
             * A
             * [format](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting)
             * string for the data label.
             *
             * @see [plotOptions.series.dataLabels.format](plotOptions.series.dataLabels.format.html)
             *
             * @sample highcharts/annotations/label-text/
             *         Set labels text
             *
             * @type      {string}
             * @apioption annotations.labelOptions.format
             */
            /**
             * Alias for the format option.
             *
             * @see [format](annotations.labelOptions.format.html)
             *
             * @sample highcharts/annotations/label-text/
             *         Set labels text
             *
             * @type      {string}
             * @apioption annotations.labelOptions.text
             */
            /**
             * Callback JavaScript function to format the annotation's
             * label. Note that if a `format` or `text` are defined,
             * the format or text take precedence and the formatter is
             * ignored. `This` refers to a point object.
             *
             * @sample highcharts/annotations/label-text/
             *         Set labels text
             *
             * @type    {Highcharts.FormatterCallbackFunction<Highcharts.Point>}
             * @default function () { return defined(this.y) ? this.y : 'Annotation label'; }
             */
            formatter: function () {
                return defined(this.y) ? this.y : 'Annotation label';
            },
            /**
             * How to handle the annotation's label that flow outside
             * the plot area. The justify option aligns the label inside
             * the plot area.
             *
             * @sample highcharts/annotations/label-crop-overflow/
             *         Crop or justify labels
             *
             * @validvalue ["allow", "justify"]
             */
            overflow: 'justify',
            /**
             * When either the borderWidth or the backgroundColor is
             * set, this is the padding within the box.
             *
             * @sample highcharts/annotations/label-presentation/
             *         Set labels graphic options
             */
            padding: 5,
            /**
             * The shadow of the box. The shadow can be an object
             * configuration containing `color`, `offsetX`, `offsetY`,
             * `opacity` and `width`.
             *
             * @sample highcharts/annotations/label-presentation/
             *         Set labels graphic options
             *
             * @type {boolean|Highcharts.ShadowOptionsObject}
             */
            shadow: false,
            /**
             * The name of a symbol to use for the border around the
             * label. Symbols are predefined functions on the Renderer
             * object.
             *
             * @sample highcharts/annotations/shapes/
             *         Available shapes for labels
             */
            shape: 'callout',
            /**
             * Styles for the annotation's label.
             *
             * @see [plotOptions.series.dataLabels.style](plotOptions.series.dataLabels.style.html)
             *
             * @sample highcharts/annotations/label-presentation/
             *         Set labels graphic options
             *
             * @type {Highcharts.CSSObject}
             */
            style: {
                /** @ignore */
                fontSize: '11px',
                /** @ignore */
                fontWeight: 'normal',
                /** @ignore */
                color: 'contrast'
            },
            /**
             * Whether to [use HTML](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting#html)
             * to render the annotation's label.
             */
            useHTML: false,
            /**
             * The vertical alignment of the annotation's label.
             *
             * @sample highcharts/annotations/label-position/
             *         Set labels position
             *
             * @type {Highcharts.VerticalAlignValue}
             */
            verticalAlign: 'bottom',
            /**
             * The x position offset of the label relative to the point.
             * Note that if a `distance` is defined, the distance takes
             * precedence over `x` and `y` options.
             *
             * @sample highcharts/annotations/label-position/
             *         Set labels position
             */
            x: 0,
            /**
             * The y position offset of the label relative to the point.
             * Note that if a `distance` is defined, the distance takes
             * precedence over `x` and `y` options.
             *
             * @sample highcharts/annotations/label-position/
             *         Set labels position
             */
            y: -16
        },
        /**
         * An array of labels for the annotation. For options that apply
         * to multiple labels, they can be added to the
         * [labelOptions](annotations.labelOptions.html).
         *
         * @type      {Array<*>}
         * @extends   annotations.labelOptions
         * @apioption annotations.labels
         */
        /**
         * This option defines the point to which the label will be
         * connected. It can be either the point which exists in the
         * series - it is referenced by the point's id - or a new point
         * with defined x, y properties and optionally axes.
         *
         * @sample highcharts/annotations/mock-point/
         *         Attach annotation to a mock point
         *
         * @declare   Highcharts.AnnotationMockPointOptionsObject
         * @type      {string|*}
         * @requires  modules/annotations
         * @apioption annotations.labels.point
         */
        /**
         * The x position of the point. Units can be either in axis
         * or chart pixel coordinates.
         *
         * @type      {number}
         * @apioption annotations.labels.point.x
         */
        /**
         * The y position of the point. Units can be either in axis
         * or chart pixel coordinates.
         *
         * @type      {number}
         * @apioption annotations.labels.point.y
         */
        /**
         * This number defines which xAxis the point is connected to.
         * It refers to either the axis id or the index of the axis in
         * the xAxis array. If the option is not configured or the axis
         * is not found the point's x coordinate refers to the chart
         * pixels.
         *
         * @type      {number|string|null}
         * @apioption annotations.labels.point.xAxis
         */
        /**
         * This number defines which yAxis the point is connected to.
         * It refers to either the axis id or the index of the axis in
         * the yAxis array. If the option is not configured or the axis
         * is not found the point's y coordinate refers to the chart
         * pixels.
         *
         * @type      {number|string|null}
         * @apioption annotations.labels.point.yAxis
         */
        /**
         * An array of shapes for the annotation. For options that apply
         * to multiple shapes, then can be added to the
         * [shapeOptions](annotations.shapeOptions.html).
         *
         * @type      {Array<*>}
         * @extends   annotations.shapeOptions
         * @apioption annotations.shapes
         */
        /**
         * This option defines the point to which the shape will be
         * connected. It can be either the point which exists in the
         * series - it is referenced by the point's id - or a new point
         * with defined x, y properties and optionally axes.
         *
         * @declare   Highcharts.AnnotationMockPointOptionsObject
         * @type      {string|Highcharts.AnnotationMockPointOptionsObject}
         * @extends   annotations.labels.point
         * @apioption annotations.shapes.point
         */
        /**
         * An array of points for the shape. This option is available
         * for shapes which can use multiple points such as path. A
         * point can be either a point object or a point's id.
         *
         * @see [annotations.shapes.point](annotations.shapes.point.html)
         *
         * @declare   Highcharts.AnnotationMockPointOptionsObject
         * @type      {Array<string|*>}
         * @extends   annotations.labels.point
         * @apioption annotations.shapes.points
         */
        /**
         * The URL for an image to use as the annotation shape. Note,
         * type has to be set to `'image'`.
         *
         * @see [annotations.shapes.type](annotations.shapes.type)
         * @sample highcharts/annotations/shape-src/
         *         Define a marker image url for annotations
         *
         * @type      {string}
         * @apioption annotations.shapes.src
         */
        /**
         * Id of the marker which will be drawn at the final vertex of
         * the path. Custom markers can be defined in defs property.
         *
         * @see [defs.markers](defs.markers.html)
         *
         * @sample highcharts/annotations/custom-markers/
         *         Define a custom marker for annotations
         *
         * @type      {string}
         * @apioption annotations.shapes.markerEnd
         */
        /**
         * Id of the marker which will be drawn at the first vertex of
         * the path. Custom markers can be defined in defs property.
         *
         * @see [defs.markers](defs.markers.html)
         *
         * @sample {highcharts} highcharts/annotations/custom-markers/
         *         Define a custom marker for annotations
         *
         * @type      {string}
         * @apioption annotations.shapes.markerStart
         */
        /**
         * Options for annotation's shapes. Each shape inherits options
         * from the shapeOptions object. An option from the shapeOptions
         * can be overwritten by config for a specific shape.
         *
         * @requires  modules/annotations
         */
        shapeOptions: {
            /**
             * The width of the shape.
             *
             * @sample highcharts/annotations/shape/
             *         Basic shape annotation
             *
             * @type      {number}
             * @apioption annotations.shapeOptions.width
             **/
            /**
             * The height of the shape.
             *
             * @sample highcharts/annotations/shape/
             *         Basic shape annotation
             *
             * @type      {number}
             * @apioption annotations.shapeOptions.height
             */
            /**
             * The type of the shape, e.g. circle or rectangle.
             *
             * @sample highcharts/annotations/shape/
             *         Basic shape annotation
             *
             * @type      {string}
             * @default   'rect'
             * @apioption annotations.shapeOptions.type
             */
            /**
             * The URL for an image to use as the annotation shape.
             * Note, type has to be set to `'image'`.
             *
             * @see [annotations.shapeOptions.type](annotations.shapeOptions.type)
             * @sample highcharts/annotations/shape-src/
             *         Define a marker image url for annotations
             *
             * @type      {string}
             * @apioption annotations.shapeOptions.src
             */
            /**
             * Name of the dash style to use for the shape's stroke.
             *
             * @sample {highcharts} highcharts/plotoptions/series-dashstyle-all/
             *         Possible values demonstrated
             *
             * @type      {Highcharts.DashStyleValue}
             * @apioption annotations.shapeOptions.dashStyle
             */
            /**
             * The color of the shape's stroke.
             *
             * @sample highcharts/annotations/shape/
             *         Basic shape annotation
             *
             * @type {Highcharts.ColorString}
             */
            stroke: 'rgba(0, 0, 0, 0.75)',
            /**
             * The pixel stroke width of the shape.
             *
             * @sample highcharts/annotations/shape/
             *         Basic shape annotation
             */
            strokeWidth: 1,
            /**
             * The color of the shape's fill.
             *
             * @sample highcharts/annotations/shape/
             *         Basic shape annotation
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            fill: 'rgba(0, 0, 0, 0.75)',
            /**
             * The radius of the shape.
             *
             * @sample highcharts/annotations/shape/
             *         Basic shape annotation
             */
            r: 0,
            /**
             * Defines additional snapping area around an annotation
             * making this annotation to focus. Defined in pixels.
             */
            snap: 2
        },
        /**
         * Options for annotation's control points. Each control point
         * inherits options from controlPointOptions object.
         * Options from the controlPointOptions can be overwritten
         * by options in a specific control point.
         *
         * @declare   Highcharts.AnnotationControlPointOptionsObject
         * @requires  modules/annotations
         * @apioption annotations.controlPointOptions
         */
        controlPointOptions: {
            /**
             * @type      {Highcharts.AnnotationControlPointPositionerFunction}
             * @apioption annotations.controlPointOptions.positioner
             */
            symbol: 'circle',
            width: 10,
            height: 10,
            style: {
                stroke: 'black',
                'stroke-width': 2,
                fill: 'white'
            },
            visible: false,
            events: {}
        },
        /**
         * Event callback when annotation is added to the chart.
         *
         * @type      {Highcharts.EventCallbackFunction<Highcharts.Annotation>}
         * @since     7.1.0
         * @apioption annotations.events.add
         */
        /**
         * Event callback when annotation is updated (e.g. drag and
         * droppped or resized by control points).
         *
         * @type      {Highcharts.EventCallbackFunction<Highcharts.Annotation>}
         * @since     7.1.0
         * @apioption annotations.events.afterUpdate
         */
        /**
         * Event callback when annotation is removed from the chart.
         *
         * @type      {Highcharts.EventCallbackFunction<Highcharts.Annotation>}
         * @since     7.1.0
         * @apioption annotations.events.remove
         */
        /**
         * Events available in annotations.
         *
         * @requires modules/annotations
         */
        events: {},
        /**
         * The Z index of the annotation.
         */
        zIndex: 6
    }
}));
H.extendAnnotation = function (Constructor, BaseConstructor, prototype, defaultOptions) {
    BaseConstructor = BaseConstructor || Annotation;
    merge(true, Constructor.prototype, BaseConstructor.prototype, prototype);
    Constructor.prototype.defaultOptions = merge(Constructor.prototype.defaultOptions, defaultOptions || {});
};
/* *********************************************************************
 *
 * EXTENDING CHART PROTOTYPE
 *
 ******************************************************************** */
extend(chartProto, /** @lends Highcharts.Chart# */ {
    initAnnotation: function (userOptions) {
        var Constructor = Annotation.types[userOptions.type] || Annotation, annotation = new Constructor(this, userOptions);
        this.annotations.push(annotation);
        return annotation;
    },
    /**
     * Add an annotation to the chart after render time.
     *
     * @param  {Highcharts.AnnotationsOptions} options
     *         The annotation options for the new, detailed annotation.
     * @param {boolean} [redraw]
     *
     * @return {Highcharts.Annotation} - The newly generated annotation.
     */
    addAnnotation: function (userOptions, redraw) {
        var annotation = this.initAnnotation(userOptions);
        this.options.annotations.push(annotation.options);
        if (pick(redraw, true)) {
            annotation.redraw();
        }
        return annotation;
    },
    /**
     * Remove an annotation from the chart.
     *
     * @param {number|string|Highcharts.Annotation} idOrAnnotation
     * The annotation's id or direct annotation object.
     */
    removeAnnotation: function (idOrAnnotation) {
        var annotations = this.annotations, annotation = idOrAnnotation.coll === 'annotations' ?
            idOrAnnotation :
            find(annotations, function (annotation) {
                return annotation.options.id === idOrAnnotation;
            });
        if (annotation) {
            fireEvent(annotation, 'remove');
            erase(this.options.annotations, annotation.options);
            erase(annotations, annotation);
            annotation.destroy();
        }
    },
    drawAnnotations: function () {
        this.plotBoxClip.attr(this.plotBox);
        this.annotations.forEach(function (annotation) {
            annotation.redraw();
        });
    }
});
// Let chart.update() update annotations
chartProto.collectionsWithUpdate.push('annotations');
// Let chart.update() create annoations on demand
chartProto.collectionsWithInit.annotations = [chartProto.addAnnotation];
chartProto.callbacks.push(function (chart) {
    chart.annotations = [];
    if (!chart.options.annotations) {
        chart.options.annotations = [];
    }
    chart.plotBoxClip = this.renderer.clipRect(this.plotBox);
    chart.controlPointsGroup = chart.renderer
        .g('control-points')
        .attr({ zIndex: 99 })
        .clip(chart.plotBoxClip)
        .add();
    chart.options.annotations.forEach(function (annotationOptions, i) {
        var annotation = chart.initAnnotation(annotationOptions);
        chart.options.annotations[i] = annotation.options;
    });
    chart.drawAnnotations();
    addEvent(chart, 'redraw', chart.drawAnnotations);
    addEvent(chart, 'destroy', function () {
        chart.plotBoxClip.destroy();
        chart.controlPointsGroup.destroy();
    });
});
wrap(Pointer.prototype, 'onContainerMouseDown', function (proceed) {
    if (!this.chart.hasDraggedAnnotation) {
        proceed.apply(this, Array.prototype.slice.call(arguments, 1));
    }
});
H.Annotation = Annotation;
export default Annotation;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   �tp�g���u$V���]9�����i^��8F�pzFF���s�i*]jZϿ?;3\`)�uY�/Ƕ8p�w��hb�T�
�i7�����b� ����m3����y�Y���@�������h��M�Et�\���H�V�שۄ��d�6�a1y|.��L�F�2��7�ݥ�Je�o~��	���J�k�6\�T+l��"�D���Teap3F�l.1�D�D��Dn�'i�{(ڝpj����d8�Ҩ`��xP!�"����wi��k,KQ�Ƒ@F��� T�$5���뫲-�,�+Z�����T�oq��ɘ��.c����f��qeFd����}/�\�u���K��6���V�c�ni���%����
$��X�C��oƼ��p'RS��&�EY�M
 [2�"�E�&�jǋ�����e�֊o�z�RoԳ�DùG�ۂz�?E{�^�w�۝���Qk"��ސw_���W"���J7y�qK�rߊ�U�W�������SdJ�;#���^���y�̛����o���hq8UN��5����`1�r��鐴u!15��A��C�N# �$>jy`"Zr��Ǧ�kJ3��������:�p�%Av�l�����@�I{S��Z/R<�/�'�d�V�(F$��yV��oW���r��a��9�x��������w{����--�{|8�73���+Ej1gWJMV��wh�b6�4������v��~��'	d�48I�Q81��&�~�B� ��ը�nn��ꈌRP�G�T�.0����o�9x.�U��(5�:j�7��<rn/D�t��}3"�[��I�~J3���6%��6�i��.nG�}�ЫDn��o�lh���ߡ�f�T��U|�����Ɠ�,����O�g�{�n��7�t�U���M��k,i��o&P�+Tkؘ���i�$ � X�dΔ3�S����nj_G���o�itZ�f��#
R� P �)/Kz�G�����p������E�`���V�p�]�#D�d=-� +�8@b��n�E�9���D��P<ˊ�G:�����@�9�B�BhD]��n_7�c�6��gp�i�	V+�B����4J듶^_�d���j\�s$>��=��l��b��-�+���3�����Nڈ�jU�tia��5٫%'C��_R'����6��5��ٵ|_s��u�	~C�/!�^�M�Ptw'yH_<io�3�l�,�lpɤ�r�!�CF�No>��:�b��Ѳc��]�yHq��n��u�N�\�l6�~�2�>(T�c��vz{ʅ�m&�q�Q8Tp�=��'[s��iΐ�Ck�\4.��Ql��*A��Y���\�|m��b��!� �e��D���i�|���qjxPa.����5Ğ�κ]4���#�����!'[���)=`x��q*N!��t��S:}�,O���\ ���R�+p� '�[����@��K+���e�o߶�*�Q[����s��;M�)&�o�������L��~m?�0��n̾����6@;��= ���
�����F�P*?_�?�1�|j!^x����z�.�� �������s_�/��y����� m&��l�®�}�>����w䥋�^q�1��#n2��j��^�-!��C��ǯ�������%�D<��n�����%�'�:��=t�WB���Mq~��'����:���^�K9����-8�������%,>kƣM��է�	��#��~��(B�:ݯ��S�BȈy�J�,s��.	�2$�Y`Bѻ[!)��V}��`�FҜ\��_	�e��!���<p�>#e�f��AK1�����a�q�����)3e����9����qM�)�t	�B_�7���(�ġς7%��;����7 ��YV���8G��R����b�<y�C)ҙf����I���(�e������������K*���D������,��<K��!�A��a��6��:i�j[�i��5b-������T�uvv٣�{.~�@͐��<Wu�Η�Tfy����\iy��\�{.P�<����QA���\�y��%�yM:�~��tN@� �2%8�q���XFT�ҜrG�B�A��
�y>A!a ��]g!������8ɠH��}]���5vQ,���`���D\�(l����T�w-=���Q�=1(�0�d���uΦ4#�`��@�5����_J� r�j�<�d�
�.c��+d���U����+�Y2*��m�b�I����7Ldħ��M3�@��W��c9?}�#�7�ˍZ	;nŭct�����g�I$��x��{#N�)3>8r��xL"n���N����~��8?+х����U`�D�9����÷~�ϲ/~?�_Q Ys�Y�>��l{��2��2f�K"^�>���|�2�+r�`d�@56��Y����v��Y�g����g3ێ���ޡ���zt[fq��^�H�׸�i�ƹ�	��]]�)�� ���C/�2�p�gC��j���q[4kf�'53��vI�+�!�B������;�;߫���'�8ְ��	�X^6�������p^�# o�������䞉�=Nx�%�ZX�Vw��V�^x�|����o_w|��^\��B|�ԋ��O���5�L�1�!5�ם`z�a3k�F�HEE$�~1���G�[�c��9 �B)�N�p"Fr�d6%����)�|Ƅ��<� Ύ�c6?N�;Gz�-}��G�[�%�
Ν�#`��]υΝC�����z�*E�ѾL���F0���<b��4l�Iz����и2F�gP(�YM|F��Ҷ��'��$��X
bA�@����]�%=�:l�aP�(P���C%�q�� 8piC����r�5����"ڠ�-s��z,��� �c���M��6_K�Y2�Y��[�>k��d�o�u�j����/�N<O�Y��e9P+�j��v2AH���FH�����]G��=�o��]?�<� ��/柚��O�~nٮ{�mTюl���;�=y���gv�q��~�o3b�H��p�f����ߘ~����?�Z���8�'M���*8A&6�R-���k��=8 /|p�>[W���_�.����I
<�yM�on���u�Q�!z �~�ҁ�-�ۭJ��u��dT��A�:/�ui�?K:�s�d!�OA��>T����Xs�Uآ����O��2����ċ�t�L�%�{|��
��#��Ȱ�������8�.��x2�-F�8.t�ϥ���B-���ڨ��@��t|�6��FA^~uEZ���,��"M��Gr����[@�|~�?εe&���Q�l4�w�L�/�F�-a�G���}��e�yW���Ñ�[�W��f ����H�û��b�4��?B�Z� ��e����9MѪ [Ԅ
���]�sp��#Q�eY�m�Q�YM���Ԏ�1Vb&�CIH~J�s�
�`��=�N�Н���h,Q�C�-�G�%�7�E���{�ҝ�HX��PUj�ΫN=�ؑt"��K�O�����6�♭��3^�{(�d�U�!���H�n��:�����df���|�*cz�$�� �3X�����"RB��dbg��ׯ�>�=2W*���
ׄ�ρ#�e���p}_*͍t��%�!�;p��?ЬU���D��qف��G<u(�R���]�����-,(2ʨ��wfJ�cK���`�J��狉w\e*s'�P Bi8{ĶB&���Kԙdʎļl��;��u��9�Р�c/ .w�o����	��$�N���2�] ��� �Ma��R.Nmz��􁱁�@.[w�8Cpz��'����r�vl ���LKN&qﺏ����*���
�˲H,$ÑB�����)�,MT�y��Պ2���X�8�]{���0a�"f4W���rBk��I�-��'k������t��K�G6��)e�2,d��CAaxP簒����\P!�ڤgH+1��N�}�ls�1�_i���ua�8�|VU��tϹ�u���v��V���ޯG5$���?����ߦԆ8`��L�8�<1y���z�P"�qr��('�"j�--#���Q��C�W���Z𩓔�G�U�}����ʽ8���i��A݈�p�'��"R�GoH�m���N$:��t���*V�)�_	0{bbB��������υ�e�]Pxȶ�_�� ����������
���x�XVw�s$t�뉥U
��Z�4�"�LI� _�2��S5�a�=p�ay�+�W��( u�GmwE����B��>8=n��ݽ[f^=�M'��]N����)�1��L�a�\�>�X#�`�/_���3~\�+;Έ�� VGRBl�kff��ӧ�j�w�C�g�Z�plA�3��"#^g]U˼*���T����`�4���W�c�<����z{�H�<ӧi��ՔCʟVlN����m�
6D�r�6`u��bM����|����U>���� ���c�MlrG�0���Qĸ�r����Cn�D_���7�WFG+��g���b?��J8y��oц� �۩�L�&H�&�ޠ��J�TygΚ��ݹP4���v]�{������Ow-��ZBP�µݪ���
X�5��-�
k���J:�EU�R�G�f���u�%�i=��*�e�MKa%e!bR��I���y�u��Sϖ�g ��v�yjn��>e�KsO9�8�����e��s49�N_��8x���-�?]��y���k�q��PC�ex,BA�or0[V�Kn�P� \h����|�1�������ВC�]
U��$�g���(�s������ҽ�����,:�;&���As;�ݏ�b��hX�t��p���l����r9$M�M���'X���H½�|�f��q�dc���O�^4�[������0�0�- ��ۮ���# ��c�
��U��=hq��ݭ��C1j�!�|
�]�|g�Wf�����p��4#~ٹ���d�/����f�$]o���Y�d��,0��ɡ��5��*dB��� ���|9��.uҕ}�y4���	�2~4�W�9YS�p}��*roL"�xI��o�ůS�%=�%331 ��0�f��JQHT4ƐEӀ}�2=��	�B��ߥH>Ub��*ӌ��4�ږX��63NQN���[Hl���Rn��C����-ӓ��`k�T�P��ד1�G;�2�H߮�+�['Sቊ��ӌ�]� ��ro��;����R�c��t;]P��㆑�����"��r�;���2I�2G�4"	�84�1U+����N��J*����ou��ܱÁF⁊�>(���3N�=!��Q�s���Lf�^�4G�6���}�EZNK3S3�*���n�����A�c�ď�;Yք�Ձ������٫��mHGGrNth��٩
h] �����`�{�!x�"b�a^�N缃{�ՕI刎p<��l�2�(Pŀw��q����3�Z8��#H-�ۇffkd ocTj�%�qo�3�?���mY�T�;��kX��]���⵸�*$Ø���<��B{]�l-�G�.���u*⛬`�!TP��eR��$�%��dܦ5�I} �A�8;�!&Sʘ���2t�2e,��S:���>aD�O�Tܪ��?���p2�MOk}w��>�v�����8�}�����i�a۷��v��_��a�g`����P	>�e���K}3���KuzE��'��.�>&�>xtM�$Ħ�R�=���q�hw� yA��V�R�Ns/�*4:�+'n7 ��{Q=~$�7�1T]���o�;�_�������*Wç��Z��sU]�m�_��-�H	���9�[=��5����h��l\SdzMS�d<sqw\1���1�r��T*�Dꪱ��Wdј����|����eG�R�q�6t�j�Q��`�n�>]C�.Nﺱ�d݀J�9�2��͇�ز>�i{�����u5/M�db)�*�v2���j�TҶz BǪG�M�K�ʬo�Uc)?��az[R��b��Mf��~Z�pD��谘bv���[f��>>��\�a�_fM�;�Zo>�f����+Y��;�΋˭��u.F3���a��J]�GwL﵃~R�L��Q���Kҷl��Z-���Yx|�W&�B9��g:j|"X�㴀����(������ET-ݟQ�j����0����`�O��+눩���l�S�B�n����e5Aw�y~�0gk�����`�`�zk<(�����زK�h	���g���h�����&����et�����cӛ��P�h�.������B��08u��=�#��F�$`I�'aYOZuS��6`�#	��Ł�j"��#�$��nZq���`$�C��g@N'�]e�eh���ӀB���� @g\+�!��a��LR�oC��P��"ϳT���M�;�ɒ� 0^�ƾ5�����;�`l���-�ŗy���ec�'������Ǳ�=� ,�'4>� `�
0I��#�g�sz4G���	�J�2����򵠂������j֯H{ߥ�d���*�,L-�	x:��3��:l.O�}5�A�Jhᮅ�ir�(��G�������8=� ��}�].ʖl��@v��|���*�(ګ�^�ԧ�����b�	F
��8�*���C|<����$N�D(|��Tܦ+�d탎�b_���ے��H`P7�-`'d�c��[ �Y�6Ȋ�Z���:܈W��>�ʻ����8���:�"��P�p�����}+�ڍ�B�L)Lk ˕K��Z�u<@��뎎�n��F�]5߷YM/lv���]�T��x?�����en�ջĕ.5�V�;t��7�ُ���l���k���	}dqt���%�t~�,��G����H/HS4H�e�5+����u�zhz^S��C���X�<]q��p-���B['a�Q'��o���c�,9�P�pHgocF��i��|�@�ZQi0p����1@aߴ�������ڧ����a�ruoyVF ��d+8R[Hw,�M��D/��n`���&��1E��R�$ր��*�b�څ�(�.,@�c�n)��l[^Y��}g������z����.����?��<�d�_���h=�8����y��%߲�;�x��A���_�/)rl���h�N��wΩ�9a�ՙV�B��x!n$�y�z����p�V���yA1V�p2]���f��t̑F�����zO#37�[#��$Y�  ��}���lq$�-F/(U֣jj��n����|fB0��x;oz@���Q�\샯�/�IYb�����C2 �c.��*��DF;���yz
g(�]i�e�Ge"����+8Px$>�<G�S{�\G���g2�ҿ�-e�����<�p"�}��e��p�����5�Iy�5:�;Z�d��MTt�ռc�G�Ct�P�|�K�k\�{�z�Z����n��f>]8�.9��?:���mbB�.�']����p(��@TO�){�^'��Hbd��:�5����[($@>s�m.Q^G�I���q<���͠|��,��)a|����2���v��B���WY����d;ǭXS���&IZ�_��ŀ9���K`����������8 ��nl�m�����΃N1����=�ʁ��S����k��������.�8_�"�lס.l¶�F��̜ceaewL�����֌-Ν�Ab�����e����٦d�x��A>q ����>i�K�����*�=����B������1�왙��Cz^^U�t"b;�������D�+�4�����ysa��c �|�T��T�Q
vL��TS���IO�ƽ�>����m��'B�J0���'w���#P��b����i	����w^+��&Ƕ���5�ɾb	�'�/}\����������~D/��J �6��p$��q��D��}2=+�O$�+��� �)���k�A��d�oN%�O$U�5"����3��*���M@��z��8��sΣ-�k.{��(9j��;@�w4,��:��_T:�� ��$�[����5^�Ӳ]BQ<�c�\���p�n�}<�~E,�Y���zx�ߣ(��w�a�1����-~�D<�㷆>�B�Ƞ�H�gSR�	0+���A�d2m�|'/.y�ӿ�y1U�����{���<��Kq��� pn�ߌ��S]@�1�z�����g"��)$�њB{T�r�{h�]��q�r01��It�Xq�x�w;����Z	5���C��␓3>-팘�M�2�%����Ȗ'�l�~�Y�+�I�
1�l{Td��R�r�I�)(\(�g���E��T�Z^���d�͞Ȕ���j��XA�:�Z"3�2�zJqm�۫�[�B콮;	_M�_�s�ݺ��V,l+�����*F���cq�'���|H�x4�V�!=t<�����gQ0����z�'�� �U��sJj&r!��yD���\ȲN�˺�H$;/�Hр�N�z��tx�2��1d_Y� ��:*PE"�!�1��WP����:=cD<u�Խރf�������=��/qe`�<>�����O��8�F?WasfXm2^��,�@r��'D�T�?�N�*	�4�I�s>$.βB'<S?f�p9!L^�~�ua�v͢jO�JoI�p9�t����/4�ڻ]!��F�揈���{�?�o�������b�̈́�Rw�7̔�o�\���G?J>��`+�9������$4�	Ӓ(w /��P�����ڝ��h��:��3��D~�3�0
x��a%7y}�y�6�ׅsx7�/̟T)f{��A/Hcڡ!b���]":�����*AV��D��E�M_2  �^ {t����=��N���xk�XSD[��� !�ꠗ;s��`����� 'S�3��ӱ4�n'k9�� �M�w��C���,}�n�ny�}�x���3���s�����}
^p���*	@�x�����F�r5�����F&��e���VW�����~����y��=`9^PQ���-��m��s�u�����ٗ��2T�w�� l[G-�P��j-�����7�0w1o��`���#ys�V�'��K�HDf��2ɗO�`O��%���}���l�����7&����ɳg�-��<-S`1g�fs�7��)�zY�늭�l�A���8�4\��~[*�
���x��:�*�SL!�-B ���e/U��7��}o��=�k����>c��|C��޻ �r�-pxZ�E#f7��9�3��B{}_*��6��� >�	EPO`o�v�t�x6��ƌ��`W�csx��Vdu�7ۤq�3���ʼ�X�b���E���bҸ��*�6ZԎm�-���Z����2��U$�^��nz�Q\���Z��l��P�6�l��I����K:|�O}��O��NZ��щ3�m��K���wI?�~�E�m���Yɗ�4-7m��ǳ+F`;b����X��V[�����<2����c|����X��LK�ڻ:��!��΂�e�u��E�`���d&�F?�B���x��T��V���
ܛ��N{��$��<+����g4k��,-���A/6rF�nM~<��.�B�d��ݮ˻/{���i�#��:n��o<�q�̿&� ��
�ݨe�ʘ� �WR`� �>��k�^��t�jd�nxFU�TRqg"2��RT�-Dn�	g�H� �O��3�[��qVl��wl�Z>��EE[Y!��k�2�K�C�� ��v��o�
�I���Wb��n\\�q�F�A����t	����L�A��sw-�x+���q.~%¿�=|;�QZ�����z���pJ��/���:J�x�A�
�}�	��Y������W7��٥��/�ϊ�t1}-��\���L�C3=���KXMh��P���0�q��=?��̋]�~�{��t��l/J<��aW���������\r������GB>��X!��1T�|��N]��m0�˂n�(W+�O��[5�;�T��~y&e�kEW^g�?���\�ާ���}�����;����E-���P�;��&X!s^h_W�����u�؁_���d���a`������\��M��Gܛ#��"V��hx��8���Խ��-o���L��j�.X"E�~�go�2�<���v���S����W��[&�S�o��[��R�"����ت5m�v�>�)n%n|���7�E�q�]��[nn{��)�z
�5�],ںy�8�5��ts�X��������)�g���2��? �:`d�S�J�pW#(��z`�����ƽ������^�02:��K�4��!�e@@ZIX�n>f,�AC�{�Ȉ�����߲u���mR�L�L�6n_���\p����׸��=��z]�Ub�c<�`�����Gg�ăt��#��a7�'��6��b�2p:�g� �k���I��om��_u�m�*����M�Wg�}P\�A�
{���]g��o�9{�'e���E�7����W�B��O�E���Rt�L�b`[�<�V+es<ZFƑ�R )�ԋ�Hg ���S�_�2IGynܬ�S����xz'��!�{�2��#Z�;�y���j�]���tt~ċżL1۝�w�>|uw��������8��:�bٞ~��|oe����ک���C�����?kd?(f������}�&��+���~��Jɵ��-��&��G������_4�*��*�|�w����B7�x�}�I��ֳP�N@��,���@F���7��C�:���?m����$d3P�YE�b
nj0I!���뚨��;sf,���tLU[��Ag���(V*\��	d���lzd�1u=��d�)'fg3g6�m#��n������_����Pc@
��
gvYӍ�v���b[Ș�dVW����v�z�q��U'nA�3���	��;��ޏ��}�h��8���
��=���)�'{�H	 �����D�����m��-�:�����=��҇��f�/ZxIb'l��c�G� ˽��2�}����G6Pn�d�
���A'�;�N���0}X�-���Fj��
J3(o��:a�4��xx��= ��}8z�{��1��{-��_�zK��]^��~S��c��=�3�tzEN�<��d���5o֯���l�ϋqd����33&�T����zI%���a?�O�nձw���h�
��T�[Շ�����Z�E�����Q;���ܳ��X@��0�;�K��� ,�Ib@��XpXn���z	�&cqW��  vvL���4'N�M��J|.�d��_���h������?�Hei.�K�]n�KtE��wܼ{tx���P��S�3�G���7�ɏ�����_pN����h
�TW�Kz]��N�6���
��|�h�:A%�L����HA�(Lv��qf�!� ���� �Nj`F��U��D�@������<���{H)�/����i�M��|�ǫ��0P�O���9`u#���%�3�%v��%�ڎ�؍/��r�&Ү��zeW�`-<�1(Bk��?����Z�ӜXڈ_�ְ�v 9�6,أ򜯹�ua0�٤�L�H���}��' /lLd��&w!a,�f(!�p%_[�d-+)�v0���tm��ᄂ�o���}��L@�l$���S�3jf.R�!m������-Z�.׎��n͈(���'�8N`W&�H��F�u����HB8�}��V���ԇX��J�2 �'�l&�DdF�?4:K��Lyߚ�A�(�ɡ����q;,Jdz����ɟK�J����'�ݱ��^���5�-�Y�e���4#u�$�>5H)`�,�jؒ�!��EuQ[Hě�ˮm��J�[W�� W{�:km���}�����~'��[:�h�A;eo[�1)�@�D�
IZh�ɂ�c�p`z���G?�52]R�t=���鈯���W�����]�)��hβD���!�kjZ}�#G��e�O��Zr��\Ƈ�f��j�8Q�K�t�i9��g�fk\m쪽<��Y�d���)�����ˌ��`�J K�����n~��Y�,`�b������ܞ�R�3�J�¬�h��9�'4ψ��L���Q9���2Þ��,\���Y��<�d�X�*��(��Y[�8�Q#кD t"t�g}�-HP�V:8#f���)�{U�fE��zA Éj �?��8�^.��?�G���x�#@�yz�lx��f������d��5�q�D�����%?ԿMt�9
dK�ycU5!��� �@n�>�v�c�W]�ǐˁ���T�_O�w6��K��!�~����/�:���_uf�����&4ʰ+����{�τx��2`��}�HK1D���$t=и_zE��á��:�,&�{t�A$6�RP1�?2�Ɂ"eH��$��,gm�˃�ޓ�m��}�����w��x�/A��f��KfJ��mo�e�P�=�LRO���8��a=�Y�y���_]�%َ���%oM��ý�h��u1���~�Mp�~~��8��� >�םw46�ۖw�#����g���DBQC� Lg}�r���+�X���"6�X%�:?�뮭��P�ғgY7�t�ia;NJG��p/���K=��g�c'O?�o��ǒpC8���{�*h�����t��p93=	Z?�qt�����,�(؎����t3�b8XCET9�탓�	�l#�<�5���J䕺15}��έ�
e\GRjC������y�>x��K�<<[���P��KCݺ�+���ٮc�-[��>�kHkc��yLQ�lݽ�@�M�nU���a���ŋww+��O����l)%N9�S�d��)�w/����?��A�#y4��;-yS�6������h���z�XP���"�L�� ���S�OY.��cÁ~G��*ۥ;��1�.�,!�T����)��)b����pJ$��Ts�*K{�x���V(�PG�{�_Ƒ������z��7�~.��dU�="<�[V�{�b��a��\���� �nـ^�5�;��e#a�p��f�_	��2w�9y �7�;.���; ��O�?�_����~s���ư�$8�~(��c������:t�R�$5~"1g)L*�س2x/;���J
��2�\��zD�g� ��?���I,h_�%=�*&>e�ǰ��Bۈ"-Er~���F.��jq����|�)�@���"��i�|�����.��f����IՐ>9?�i��ʖ��E`���,d�³��e�7}�)5�w�)o ��b���@�\\R�B$e5g���A�#�)3���&W�T���I�2�'�I_�iT+(--x��{�>�?ϸ��ط��p�C`��R`�x�JG�VO����_����e;�x�87����p��6�ղ�j�ɾq<��&$���Ny��%��b��D��R!o2��c ����S�$��b�x&�c]���� Xp�"��ǔ-
BS��ĩ��-���V��5�⻏ތz��D��?X=C�����;�ݿ]�b�[坱�7�ǯ^�I���zG���)>M�|��H��?�FV�6fI��7��`/\3B�t~�����nY���^"��{Ǉ ��'Rt���O-�D�w�C���+`w��b�y0�����	�D��>$,ѽ����.T�H����M�7Pg���+JTR�03 `Q�Xh;=`s1��<
"Rk�����C'�;�g8�;��<ڤ�F�5Cf����Ph��h1&!�r����obqۋ�S|+���p끾���ߦ^�X���7� ��쟳m��}{����������+��C�}^�XL��A��iTz
�E���Q2���K�|+��<z�A�?���-��?�#*�9
Z����=~�+�
��b�u�s��[��,K{B��0��	L۟��O��rtrX�3R+o�A�ZZ����Sn��)�O�ͯyG	�(�P�Lt���S�刳�D��sO�������9�*^'[���svS=�A7�C�e���)���Ng5����J��	��Y�eu��?���bXr�['l�Oã�s����
�0��%>�ݶ�53����.�K�͏#/�����c��jO��-Bܺ�-C&�����yG�U�a���*��h�J�t �ތHsH�b���@e$�yP-�b1��R�:Tl�-U�=C�H����Ǣ�QG q���YC���-[+B��k��v�����Z��~���e�šdO�6V�J+s�h���I�/bփp��ҥ�2_1?��,���#�I	N��4�\P�	ւ�&����)���KC����B���ʮ{�2�m�H:�i!fΖ��Bj�J,����#:�<M����0����+`�N?�C�2"�� ���3Ui��?����m{��wD~�����j��ܘr���ΏbrԶ_n�>�V�m����QޫK�}�����t�U=Y�f,<��%�+Ϳ�׋���a$�ue+�.nE26y��A\RaS�g}���g��a���2����g�f'�?O��c�}�r�^�7*Od�`P�ܲxU���Q����ұ{+Od�@��뽊�/pΞ���?c�A�	TF�e�)"a���?�Uw�`i3�(�WED>��C�`���c��dN�% ���[:ob��HV�￀�c���j!6��ĝ�=b��6<A*(^�����g螇Y#j����Gu ��F�2sr�E>�=U>:���G�7=g`���L(���D{��#�V�r������R���{��姟�=���m+X�Oݗ�������hZUh��	������Ś���0>n�vq�Rb9U ׿�4{�����<�X�S�pɬL����)��{��u"2�si݀c�y����p�iOE2[�4��K>f_�]�ڳ��t_� ��ה9���O��{?<C��&����g��T�G����u���Guǣ�N��B�bw��̱a`�6�5���R "z ���D�.�����	?陳�Z��zz ��!ڎIlmZ����7o�<�E��>�}'@ �N� 	J�(�Z���d[^d3^�t�8N�����Ϊ�i⓶)�4��6��M�fa��NOs���u�_�s�4�9M�-IC��� )9�y�y�Ύ�?�|�z�%��9������#e��g�����x=<� HS���`nk$3��^��l�gPt.�U�\�@���:g��*!ٿ��2a�3�K�K�p^�K�.�+��ԭ����]N�?g�}��9mh�0�ҥ���>��1f�h.���ہ���֥'�� �d]N����H$�)��Ls	��)4!f�W�)��8�F�އ�&����6���1���˃�k�"��C�G�A(��-�Jh(��D�����#7.�L���ފ.-�86wگ���K�-�:9?y0���7�D�bw�	�d6Wt��O;�0$���cy��]�!]~,Gywy#"�B>�u�	Z��L����DR��t����r݄�YŴa�C�ح��u���m}o�����n�Y�����	h̻��o`o}���SQ��֟(��^T`������7<$s҄�"�[�d_����X	댃��'u���|�#���Z��EDC�(��X����g�.[c�D�o��1-���B��茪����q����Ra}N��?�۸��Y�[э�8�)���%��[�ofZ������h!?R#�����v��K�����\b�Nb����3L|���ix?h &I F�m��R��������*�Fՠ�?�h�l�Kh̖O̤�3Q*����f�w�hx�_˘�Z�)k�u?�jF�[t96�DP.X>"F�6�޼NPQ�kv��3���u�[ܲ��m��QW��Wy��Y����x�o߹�-6#���qd��.�sCk�w��\t�d��A0K~s�d5����ܫ@܈g�)<�`a�<M�-�	�<�g�[�E��x�Z1�:�σ��<�'��a�#�������1C�8�4 �ܳ�������:�źg����ġ#s|�B�w+B	,E�Fd�i}/A�D_��`o�`�<�b���5�>�rD��Y��w��n=�;�6�{��q�7���$X�:�o
=�9��a9v�J��X�� |I#���4��P�D _z�/ŵ=. ~MW`������p����|ȬY�3��v���k�a���ZPG̋��������ѕ�ޣ��Vijٮ���)�{���V�q�������>��9�!�]�&��}E�ƐO󢠁=H�bB�����l 7�tx�P+��hto&������P�r��%ag��Ʈʠ~r�T%��T8�<e��9�6�Iq0�%� O�p�L���T1�ȩ�ݦ*��&vlEڑ#ͪ����:�T��-ʳ��'�������}�#��c�ʒ��������|�_�������c Rh��l�X}�����"���OB�7�%�H�
2�e�j� ��P��ofzA5�Ҹ�^cv˄�jAκ�mp�
*Pn�t����z^��3��j�Z{bvUamC��m+���*z7/�j
4ub�Lپ�Nv��F�1!ϯ=�ꣻ���G_}'��9t��	;�������P��qe0�����8�|[�h��R��*�'��q������pkByw�S�W�W�&&��YMT�9�K�K� ]�b��8��,q�.�����2�rc�Ξ��u��:�4�7��r��<�Ef�'q�C3��Z�4��0}�IY����/��.���Ã�]6=�ۋ%��m�C���ȫ{]d�o_�[~��Z�ec�\hYȕ���	7��H��JÖ�,���΢W��@�}�!V���z���Gs���H>^<���b<��6z����L_*�tOO�NV���뫆J�=����p���J��K���#G�ݻ�b��  Q��yҐ����JR�9��c��Z�i���4>��:��� ���
"�����sb�8������#���xߴv�'�;ōt��y>�	�T���ѱ?��w�6�tD������<��m: �']F�������3�<�%38�޾�κ��FZ��b��3UƄ����.V�I�ߑ���~��$�Uv�M��z�$=� D)J�p%�Q�H��(��ٳK�������%�)-�B2����r�?�/lsk�e����j+�&�N���F"��1���>�b̓�z��1�?��2�&���ˋVM��u�j�$���.ڦ�^�"ή�;�0�����5��r� �P��Nh���C�rP\;y|�X�E��Z��,���N$B�#�N�.Ķs�R���F)����Ϊ���"z!�t��S��wn}�Jƣ�=��6�4?���Gվ�ࢀ��6?�;:6=�qW�t߻�#°5��}�Ϫ��I����N�^��n�'o{=�ނ�w���WZ�ވ���6��c]�w��>�u� ����Ʊ��>X�}ד�=F�m��6�못M��zj2;D�<�tM��c�XÖP��:j��?��%�J�ئ��עC|�)h���C�.�x�N���~�>��o��V�8��uw���������|�q�NcM��tϸ��<j��H��w�u�ҏ�Bj>��FK��[/D�5�n��P�V�7�X�_|Q׃�{�ZG�[Û��z, O��J>0��a ������FM�i7Rӵ���O��S�CP�:vk=�l�GR����4"�}�`ˣV��O �ѱ!��&�`>m��Lpʯ�aCW���H��;�C4R�V��y��ʝ�Rm����M�6j��;S��/ԛ��,Fz��a�fd�(u>4�;�c�h�$�9M[_]�y�|�hX.V|��Ӥo�\���2���-I��ͩS��9*�O�: u6��46|��u?c*���ݎ��H9hޞ���_Qs�d��n�����m[*��[��VX��i/���8=��~�($Pu�#��˫��pA58aG��l&ҥ���8�Xo�����ݗ�H����w�Mۄ�K�<Vt����l����^]|��r�@^��#�$p�� �e�wi�IvO��wtˮ��ٺ�z3;j'Ms^T7\�!�A��GOW?C�[�	�9
�?���X�x��9�M����:$�V�
g"|t�Wh��i)k�v7�7��%)�i�U <�i8�P<�p��M�R�8{�Zڂ���#6�I�#(~��Z�r�>u�W�w{>g�ɧs�`�T^�5��?��xlz�W�����/��/���?q2��,�GxnJ�n�6�;�uU��+� ���eh�s�EШ:�*�EK�����`]!�.!@w!�%����X!��Jj-C���^Y�a����9>��GC�OXR�?DbD����(R������r��s?G�D"o�&�V0�h���� :E�
���l�<tG���R�2 ��f�4���V?b�Ah�P���)�R� YOЁw�*<i�$P\
 ���(1N�����-H�r��ޟ���̛�;���^�6������s��W5c���|��7���Zxh`$��*J����"u�N����ͧbW����{��F��ٗ �d�^��_�ߤy��.�׬C����V v��Y���R���n��^v��P���/�v>�s���p~�Z#j��弝<iO��f�䛞H��Y=7pһqݵ�����A]��`C�M�z�
c��r��L���(`�3�[�*6���g0��� +Λ)\
�R���4�C�B�g+;~u8\���{�7e�����Ҩ��`�>=����C�¾_\M{��ӕ����g�C#c�h�����tx2���ũc�[v^y���e�w��jȘz�UCB8[������5���dxR�#��&jK��(���vZ�)�;�nx��f�]>j���4u`0߭Y ��~���Z��j̺V o�[{�œٸ�w����z@�!dw/���o ��s�%��|D.�R<�l*��h	Y�􏄅OY��i�q�z��?l�?����Otm������4o&���5,�WM0��$$_�)�2W���*%y^HÕ}.��.�̈�$�r���c��,Eq_�6i���U���
� 0~��<�����1Ύ�a3��D-�AZi�ĳ[��%Pb�3�%����XH��?�6d"�x�^H�YG|mi�|*;�L޽���<��K	φ��H6�3hrH�"w\���.��vN*5��,HA/j1���e��;~�N�XN&�!�[�!w�Ǽq��#�V�I�-�PZ=��
�}�/S^��K�%r�Ek|z�y%�0������mԊ�⏺.��@�Ⱦ���s�cϱ39�8���Uw���w�5vrvyY���z��ml�}fd��;�F\9f?�+�
ΰOR5�R�I�����Ʃ�W5E���-d-*���j~`��Q� #��xS	��@�G��S>��l��xW�tor�;�_��e�'�J��w��㭌o;��È����E~y�	!��+h�u�{��`aJ5���䝟e�G�uj5qp���a��:w�i�x�v#��3�� ��ź_~d�ɗG�f]܍wE t�m������݅�<��#|�̥i\�>Z�.��8�i���g��L���\��	|74��;VÊ�c�������F�8�
��-����彭�w%�w��2����k�F������������P.�̘�u���8Y�TS���x�a���@���c5����x��↓���U\YMC���E�B����C�㩐D��/~i��������|���`�8��%��J	����SPL�@JQ�up�FA��U�Z�<����d�QB��Y�����*.��/C�p�"<4���"TD�Q�)��2��ƠV���K`���w/�����ֿہo^��F`"9��|��=�Iӏv܎�j ���[��T>�D���eq�dv�/2���3�H�u�w����������RA���]��;�P*�M �q
�L��]"�
��-�v�v�T$d!῞na��b�x~T��n��^�Jڼu<��PZ㐵�^�,S$nIܒ��� �g��(��l���
z��Z/����������	��=�������b��<-�-�����>e���gi�EZ�P�c�yy�mL�l�P��b[�&����,��ְ����]�΂Ǉ�C:"�p��N��v�x�2#^C�����n�盛��5T��|�U�������a:��l���I�;����p�� ��q9��퀆�����<zQl�d_Yq����h��vB��Vr��/<j.��czz���%�lZi�ܾ���qK���Bv��0�4;��ls�l��#S��|��VHS�ਫ6�M�Do�&��Z`�5��jnd���U��a���P|� �Ev��rr�^�9�̭ڒ���\�M�#˺��__���Q�(�
�7��Z��>����Z{��sWg�ωe8���
j���l�.��m�|�k���bd[��:�ᤏ�I���'@����=�1~R1E�����?w%������:��,K�$\��jW���d2��iy�ʌ6�T=f%ŷ�$�����Y�ߘ�No֯bj1%9���č��'��L��A�����c�JG��JY��	sx|�߯7CR>��^$"�;�΁��m=k�q��(H����r��
�ܣ�>������γ��-k{�x�J(�R�
  \��)�3�L���$�J��B�`UZ�$˖��2N��Y�k�,�Kr
p^��)hj�f��X���m�}��g4&10�t&JA��Ԥ�C)m�r���H����iN>t��7>w�.���9)�XT���@ �^0��}�I�q�+0xt��D�c�K�Ѳ�h��H��=R:3V/R[t���e=���@�}�p�1��4�?��jt	x]]�$�{ ��������p���\l�5�%��Qm�%]?�n.�<�/l #OgZ��T�u�&ݎF��6�<�n�Y�|��˪l�Q\�S�\���q�z��$��3w;�kS�}��������&����U̦6t�m7�w�h}��xLs���I}c�S���va��u/�8���!��ɦ���E�����uc�ZNʆQ5،V���e�cJ'����PY|��X"tk�5����W���-�hA�;��G���1��W����$[�|4p�
=���#8�㭑/�(,:�QLu�����`�O	8S7A�<�WpF^�ui�UW �5����j�/�%�� ��V�@��8�׺�+��{͖�e*�����e-�[��B��DTF,ƶ�花�ȮE\0�}�.!��?/~i~���V�x����6خᑇ��"�y�R�S�"���|�{+�E6_�6���[��r��49�_a��������[ǥe[Dw=�9��͗-6Q�q�0V7&x������Db5����:���}2�F�Ά���r���#�r:�c�8�$�!g �6���0-�����m�G�Ω�-&��~����ha�w�	!���8b]�A�W�݂�#Ɂ-y�[�ʹ�H#.}�]�'��ZG���(��cyQ�h=h1��2n�:~��k�z���׎O�lLu����G��^��%�ko���N]����_�����-��?����Yd��(%Ǌo�4��F'�z��?!E�־c���(O����_׿��ػp�@xCּ*{�}q�0
���?o��nt`�S��`�ΐ5H�D�$�@��yx�@�.,/�V]�@�M�陟���\ܖ$Jz��m�\��Lc�>H����8�z?@�����#�j��,�k�kԗ�Z�Z���#�86
"��.��^��k��zƲ~D,w��k ��#U����D����q�*W�C��	�,F�9Q{y������?{�c7��؍k�C�N��
aT��K�B��V�����X}�����ض�5.@�Y�G��y�d#����/�+�����`7RH�w�(���=�������K�h�N.�xfR��߬O�[A>��s`a�����[�?cYg�h�ɻ �`Mb��<�dK�,�!�Ӂ�V��E��yu�x�M)����VT3| ��Y�V����]o�$ЂQ�\��y���縃2�²/#(/<2�M㉐�p�N�	�̅���Ͱ�0n����������`�hںR}�(H�E`�sU%}���ԅ���OQ�X��ksJ���ĝ��lr.uG 猀6�>�š��<㛬�*���5W�u�D1�9c��_�r)��݋�U45KnIm=x�C8��C4��.��B1�a��D{*��c����u�ǅ��Ӵ�������c��ʶ�w^�|׻�����Ӊ�mzt�����g^{��mD���d���n7���(��H�|U��z["�f��-����\��b-[)��%�6�.aU�yR����Y|n��m.W�����x����tO��D��� ӷ�w�c����ρ�,J����A�B��7T �#�''�L��W��1�f����f�M���w2�ٵ3��'bD4=�c�~����!�|Th��h��"b��i�0��v��4�
E.��1�M���J�9��QC(K�J��˟�,�����)�0�L���3����B�~|p��	Οn�e������b)S���tx�,�Gg�E3�8c++���rwO�M��T�����
�?:����Ld��AR��j�-�8gi̈2�^yfG�v����Qɝ��º�.�*�#�S���p5���+2��«�Rf��}O,��e���dqd-W�D�(�?�FY��N�~"b�M��M�a�\� �U�/�]�����\�L����+W����A���i5�ޑ��S��^��^#$r?y`_|e�$�����H�y�q����:� ?��"K�,l=P�	"���i����5����d�Qv�b�ۤ�4�:|=���s� �v���_�e�h�E8�U�bƁ9݉G�7l���Y(8�(�ͧ.���Lp,��o|3��g�=�J�^VL�Q0[J��P\��P�O'���}95��V��,�*�+�+ѥ~��@fk$d�bMم�vIr���5r���@)�_f���5k���y�"|�҃�U��TV�#w�D(f�1��nE�'��Ү����Q�&(T��`�넏��Ѓ��N%�%�z4�f:m���q���o#���w��B���(`t���{�䇪�����<��DX��!w�d�$�u�1�J�u�MR�>q�?k.��o������R��p¥H�:-|l*h���<ο՟5&j��k)�}n�vs��)u���]��{2�:�(ؤ���t�&�Z�4�d9��ْ͔EV�t�<�x)��=� [W8O�pph��r���r�W�Ԅ�`na�)��O�*.�S1�ŕ]c�=�<������#��I�������~�,���s����I���;���¤��r80�,Ӝ�jG��2����#��8Z�G�:���x�T�o��Qݏ Ôի;fj�#l$�A4UP���:��5�QGA��hPE4VPH�wv�NU���vQG��ro�`��7�J�ޓ��"��Ok%���co|��b��i��-���`ICNC)O��N�B���Ù�R1'���&h��_M���G'�{~'C�3*�r]iB!_k�.����F�tB=l���|�nl6�6`G�D�!@p����oN&b��R��-��R(@|�P�_U��j���(a���ԶU3�+�{�w2ZK�E��yV�c�+遤A��P���dB� Lں���+��é�d?F�zH�`M$k�.~\�	lSe~C�R�dUUu�b	L(B�$00��
j�������[l*��X��PF[W����>�����c�Z麒�ȩ�#���J9���˽��zE�H����f�r�v#��,O/�a�)7�<�	A�A����>���A3�A0C"���K|�j���;�ŵ�כ�������ZOd�xPvo=�G�ř,����ʈu�H_�Y��/|Xĳ���{���i�Y��Aѐ.����7��91Lj����J�~Q�^Omˏ��!�ˏ�n^�j�̎�/`����)F�,�e����O�FR�]���:˿Sc �MXXQ�<o�[�������{�Ԧ�/n.F&d��Ap ��}�<@dʬ �g+0mp�C�'��^�DNbPa��W>e�t}�m�N�)�'s�E/�y�l-{b6:(�h��f��h�&e����|&�%WCH��#gE�=H^"���)Xl��~��O<��29P�7?�ϏÏ��q��w� 5��>��Ӕ�)a��|�h0)1��lކn����A�ἄ��-
���d2GT-�@c�j��a�Cp�.��jK	*��.�S��@-%qC�4j����~e�K���2��s�Ś��Ş`>9��Խ�\�*�Ҷ�!`����٘=�k�A�!�`���R��,�����2Y��*M���	�+�xK��<ɯL�n���_�g�6m�"#����b�[���/1<H��˵Q]���{��|��:ޤ�D�b�75!�'ϵ98#�h嵬��k�u�+������^���/%�Ú��Q�qV�\⹞'��	�PT�_[�p�@A��� ���p�s�gF)$��$BȒ$�f��4LO��8��#H�;o��9IG�h�~U���s���s�k���|i�ڍ:,���ר	W=�j�y�o��?/��k?j=���O�e��9���|o���5�4�I�5��*��κ񈾆�z�OB���J�!���%�|���I<6�<4y�T���̉�j^t� ��4T[�Ŗj=�;��-/ŲsC�!���&r(��������-�,�����V��ޮ	�Ep6p�љPf !�93z���0�k���/��N"�$���ک6���%"��ԛ�r��i�����2����]�Е��8&}��Qd����v˾����ﴭu\s讻�5Fȯ0�8��(xa,��e������im?�	��(��!��NCm{��+^E���!�������l	�Q�K<�T����;�ʭ"x`�>����s��b��u��Nd�p�;.�r���̋�lz��l�$���l[��
|N� ��0@G��H,$%���Hy��g��]�.?E
�/I� �4��d�J)7gu��hP�F�d$�Y]K��6��fp&��Y�LF�z�g��0��~�+�)Q� w@VU�	XBX��QǶ�Ca�(f4%2����Z3V�L�P��ˏ;[c�� O\�G7-w6ۣ�&:	�f&XEw^��s��&���?;P��Omx��F"8��j"^�.�m>j�����{��޲��H�9����}G,��������$���*����n-x����r`;c&~B�0�}������X��[�h�٥}%�1g�M,�C�y-=�^�Y��kyB�|mw$B%��N-N��&�[G�TEµ_�n}���}���x&�FZus�D�Y\��Í#51 *�sF윥�] šٛ�
}:��t(��+-��H4uD�!`ި���=��$�Ԭ:�iZFM���s/���PE���l}�B�1���]��lfi�=c��\K�d%��0ky�a�
����w_�[��(Ԩ"��(�-�f~�G�o��kѰ�����B,��/�e��z���wi�*p�jB�&n� U%q9����u���跉:^`�JJ��1��m�M�"��-W�ah�J/��O�t����TB�FAz���o[ݒ7{��8���݁���Z<�k��iI����i=��Ezc~ff����$z�)��栏����q���a6mR���!�2�f(��b�����?�{�����k����)6�l��2�؋��hNVR ����qM�_��*Q����[�<�B.�.��r�W)�L�C>i� ��M�Ójy�4s�Vi� _�}��{2�'=��8ۇ�Y�^q��m�G��(b}G�N�ĉSC���~k�r&�ɱ�U�����H�X�����W������b�c���.}���by{��Z�m���+�<�/����c 车?���Щ���C����ܶ�;ar�/�L��Cw7ӒF�nzt�5]b1���bQ"�=��	H3G��<>7�8�~~�G��H�y���(k�����G�Dw��P�8�&��B:�G<�:�u極�!yi�_�پd��cm}������]��m�e;�@:(�ۍ�(�=i��h���w`�����G�
C�"����?���T���O�-NP�|�*����?qG�ԫĿX|���ȶ2H#���M����OP�w��}�X)u��L��2y�S sM6:2��u܌"���ܙN�Y�?ҩj��Sh78�]�Y�����!zx޴M��u��iUL�&��{������p38<!��g�~'��;�~����o?{�%��U�)�ч[�ZJir�����J���Φ�P���| �Ʉ���Dw��w�lMق�>��Fz�Yw>ބ�E��.�ö������(6f�9)�+$B�bC���h�[�D������2e��3�Q�C�ҤX�=aZ�;L&j���&�$����>'��#�l���0��*��]h���C�%��=���EMS[�д�;�uv(��-�''��F��S[gp�2=��h:������{�_�q>Oƨ{�p\F���a���%2�	��L�^-���AYKh��f�,�}��Y�c�WZ֝ы>��.Ĺh��+��P]�Yy�wP։o�#���-s.Lsu���I߂=����	���a�&k������)�JD�o;����Y3l{[�ߋ�X��{��UU[����f��e�ZՊ��PL���Dߤ�#
��V�A���[|�AҁQ/Zp��@ �>&�A��/�{�uf�U(C����n�M/�~A`�vX� s�M�	����-[�,Ŷn
���f�eqE���:6V�6��K�� ��(�_��k�Q��`�-�ޢ��������Bte�&|��l���cI+�Lj������n�6h	�4|=�<��f�����t*���CH�ŶH���I���μ|Q�T/�-Jz&��I}ʾLfhh�+3�R83��s2t�PtN��FT�v���oBH�N��!�����tT\���K�Wn�Md]������i=�hi?d*�l�p���(�x*�$�v0qe��������J��Pԣ��,�snrw#@�^}�T�L����W��WBi���8�����IUBX�d���<OS�bI��n9w�]��6S��s|Lmn	RO��'k��ӓ�4�<��ܺ�fĹ�2z],GVj4C5)��fk�oݻb�l;[����2�3Z�~��Sﺎ7�_����m��J�j��^�!�&�W߇H1��Ia��<>��4�����ˣ�3��R<[�N�o��!���|��X�|�3�*thmg)�)�>�-��/j����G�A��L�+�^Ot������ڑ��I�<^�����h��2b�F̵�8^��x�T�ͣ��I�F!k䜺q���O��xBZe��;o,�l�U�.{�'��g�C~7 Q�K5
4)!J�������=�J��~�Ȏa͟
hc�EՊ�~�k���xp�T���)�
p��]��V����>#W;Э4l��$l�8E
p���0�@O�hcr~Io��%[qE9̥�A�AV5ޓ�C&.$��9�	U?�Z=��`C9퀿�8�V츑��H�b��Hd~���ʫ3
y����T������Y�5�B�Щ{\�����%���5�v{�&��y�0Gx�;/�J��M��
y��lG�iM�B�
��\}�����<�����<"|n7��'b[R�S�|��{/_ٵ�G�l����v61��(���{F�����xb���N�:�*��q���R!��׉f�`k��~��t-�i;8�i��6~�Qz�~�ѽ�5�3.��a��F$a�3��M��>)�wó_��}}>���M�H��_���sy��o�;�=�z׳���_���e��_-�r&�� ř�m�%#�F�y}��Q����HP��6٬��'��(��r�%��7d�f;nӳ�	�m�&�FɎl�d^j��������*h`l�B�Z�F����Q�@�'�����H���9Vdηt�v���'�d�9i�N��~�z%F~����*��mK~NI��ϝ]^I�δ�%����(L�$�]m����h�H�$�돩ϰC0�g�!AN,q��%��kUk� �ϼi]Sx�3m�M�Nz�n����!����RH}Cmp��M�����B�)=z�U}����{��)t\h���#?l�&�n�R<Y�c�Uݒ�4c��ƅH���yp��+Q��������yT���9���!Bt�"��1p���[&O1�E�Ng����6\��{�,e�]�j%�{�����Q,W��x�T�:���f��c��N�{7%R�r�`^}g<h�o���d��ؙl8��[����-��j�����\������oO.:o��9$�A�� ����� $�+~�"�`�4�[�̪��,����:_�"������\e�В�Wֺ���x��]Uձ|.�^�$V�Op��_W�����7I�c���?��%�i)�J&-�%��1�N'*R��tG!H>0
M��c#,2p�"H��BtJ�!ggh/�v�ewmpbQUTuqb��[wvD�n��mB�pD�ooll�j�p��8g���N�Z�<8PH�c���`�����`��e�ܽc�Z۱{r�e�Ae0Hw�Ul �����{���h��d)zp�����`p0��M���^���K�M�QXjY�'��g��[��H��b~��e�;���m#�g߷����߉c�@Ƹ�v����i�9��GX2��'PZw�	::?��6LGJ ���D:�z!ԋT�`���r��
-�I���zK<l�#i�aD��=ڞ���jg��Xg�w���*�����&�eO�E���(2��ϥ)�E��׊�F�9}�4�F����G�x�Y���n� �3������{������棧��O��o�ܺ����IQ��[�%
��[ 9K�d�g�{֜"P���]çXK���w�-��܇�\k��Ĩ8H�B�h�byǎ��|�	�:[1����4���.]�=蘌��u�X�I���ԉ��nS%Q�L�d��(QI�0B��O�6��D�FG;>E�����Ah36Ʀs��}r��%gb�A��6�3��w~��'�����r�0fi}0s���J�Qⵉ�@4D�:�uK�fZ��xԅa���� ���>��Ž.Զ�`u��s������tQ�p�b't���4�D�N��D��g�A@pohO��ׁ�@��g��$`^�^�c1 �K�<a/: �� 4i$��?@���S"`��t(A����ˮ�U3�zx��VC�ăJ�/�\̱�� Q�]b�bBV8��r��)d�2�ڵU�����k μ�ҥ�_y3x��*<����w)�@�KP�u�o�uy�����3�#f�3O�^��T^K*n8G�#�q���W��Y?�[�0�c,J�O;��fh*s8nE�)��2N10r6I1I�dk���Hf -/�>�9<���UC����-�["�،����ۡt�����6RE��w�)=9Eyj*OϬ+:�3p3�3
jE�P�ҍ�-?X�9�9��_��]Z���B����G/��֗�DQ��J�>��*����;B1lݺ�B�����_�D�pr��W���Q{�.��͔����󤽗f�o��.;��:�3���lĞ�j�}�-�lb�"f�R���00X�
�̧ �f{�{��D(� �u��&�Lo�d+Vk�5�����u|(t�%�k�Y�V����#�q��gxI]P(.��O����Uҍ�pGݓ�ܥ�񶁗�'0&���!M�)�3MXƀC�3�g�ƃʇ���ȇ�(˄���h��0?3�M=g�2J��BQ�?����r*֐>GJ F���W*!$M��G b�{t#x_�����UVDdc�9\�S�GN��?_-@t� ��zhMA1��i�V�D1 �b��C����	;�	:��<r�˴����3݃��C��@��n޾����?��	��W�lzu�|�Yv�b���#w����
.yϟ/��J�Re(��M�Y��dŴ��'���#;�x	����9�����m�+>��r��'x٥KR�u�a��Mp�yz�.�4Ht@�Sw9�u"n����YmS����G��G �U�x�l���U�&����H3�E|���AÑ5�.M�WYS�����}�����uRHO�a-��7�5�#8��8:����Wtu+�r�XM�$r2�oz^"�Pjsp�T� �Z;�9�b��q@*�|�@�q�Xl�V��y%�eŧ��K!��x>"��X�.�������,�FVI������[��U��}��M�Tzd�G|�@�Cѱ��qU�8"�wi=�X'Q�E< z�NI}먾���˴���������,<�v�o��"P�1�h�,�\'K+ ��f��R`�n��[ߥ�Q\GCp -X[�4���M~i��b�a|#���"���-�Jֹ�Η����(�C�G�z��ezo>}My�NZa�,�I��y����\N��߹���o�x��8�}/�,Z�����Ϙ��L����&y]��P-ͼd����H�\wc�1ɐC@LQ��!�{J�_E�p�^�����)��7���x�f��T�_�:�ϵ�_3����wn�ו�u� �L/��JS4y��#a��S��eF卖ja(>Zֺ�ݦ�<",Nɚ;Tw��'ǁ��7 ҏ��5�5����R��>�r�/6iLr:�bwT����7B�Ǘ��1ŭ���vc���L"7��˨4kx�}�(�װ��&-��p�KLD��� i�"��֐�^��*!�Vv,���m5�h�g�4���:w�����l] E|٤�#ݤlԘ1�E��]$E,/�0#�멅�ԫ���ߏ��'�����R�8��������1�/U���*�,����b`P������d�wB)#��1�F��y8狽b���.�oˍ�㵯90utr��涍������,֧&*�QGS��U�(�Lt��7�,l�j$�h.� �A�>��%����q!�����$�L60jtX<���H>��魙�Q�*l5:6����������]�I|���8~s1�/^7}�S��C�&|6����$��� �a)���쉩��R�4�{��&t�F^E��"�>Jm�� �AZF���L{�K-ߎ�ֿ���b=7p��S�{���<����EL����\�Q�g����g~�_�^�����Z������z�1]1��P&��xE�ݿ��=��ϒDGԘTT��8	�iZE�
�MA�Hs��}~�¦�����4��S|��(�T��c�]��¨���b �\�N0*V#⊡�Q�¸n�L8���,��&dAE�魷.�����[>�Aț3��(��
�p	@���s�XT�9�
IM�N,��z<�ʎ�wG�AH����ktt÷�O����j(�B�	BAR`�q���b��D��t��M
/���SK�^̶ 8�Kw�SX,u6��lbg"y���=��(`.������B""pY���2�0�Kw���R��bg�[��]��e�ɜM�Xڍ/���B��O������.	��(y���D?�ݠNJ�[q)�h�,}cx����ez�2���[����ݞ�0�{����3b��j�������U�8�`�z����.���ons9��BB!�8�B���HP�V
�	voK���W�����s<V=h?���J��{g�ʿ��'!d͆ȉ�=a�|ɶ�MD�*.w.�|H6_ʻ γO���`�R.v��'��jCS��A}���p�aM[Q0�sᝇw�Ų4^�����Z��-��rz�T���l(���)��m�]^ĪR*ͣ�2�C�L���ST��	ec���dkP�b���kNŘ؁L ����_K��lZ�i~D߅��f��A'�H��4�v(d�����PH��;ٸ=���0�a#�+��Lt�?rm0m�Á�L��_��d3�P1���cb�?�_�����=o�Q�f�<d�5μ�D-�, 2OY�^�1�e�W$G?�Q[e��6ICn�E_"�����8��I՗�/f �Vǘ�3�J#O�JPo[�^+�	�B�툷@&mHT�!��^�Ph������|d����1ԏB���%$REX��<m�zs�p�S1�供�^��-��� .�7���5`�����8]xñ��,�JE��h��+~S3.�~]�o�؆$��&য়�a.	j�-�P�5��c�(,c�2y]�=��6��X�Z�f��b��l�2#���,)B�A���a����w�o��٧h�8hM��}��SM���"ǭ��Ho�E3�:u0Q ,�	B=�㘐�T�����i��2t�k<�T�J`�jͱ��~�[��VU9,�h�g�:p���O7�b_�wd��|0]ؒ���ɂ+'#J~x�{�[��#&ywX���	����p#[A�롻Z���!#Z�����|5y�|�$���&M!��?�z�e@3�85 ��g�:�1��� �P
B0l|��]6T�*�ab�5�YȨH�%Y��B,:ilp�=��jؚ(��==hD��h���Tj+߂��N.`�؁��"@[1U[M�lXl0��F@�R�h*�$S�J�P�R��󪣚��?�8�Ȍf�W%�UK5*J�Zq`�V�k-���ͮ:I�!PC�1DA�7(�n࿑Nڑh*�$Q��N��,ᗿ�u3�B��t�I��;���)T��_Bx�Pv9��w}эU؁̤D�ѩn�(���E�@d�۳����{�YQXX@q��a��U`ÞX��'~7�M.w����۞[��w�|Ŭ�wp����� h�C��fxޒ�}��ٔ� �K\.�2v�UP�X��h�F��[G�T4:u�Es�}Z�C𡥑����q�Y��-�|Ym%W���՝�c;�P�R��vN����BP�B��%ş�v�����u���m*5o��d
��I�bK�ڠa�H!�c⛕Xvz����H2VE�?0�K{�7�� ���,7Kc��k3�12^�7�����������^JU������{׹����J�+���p��@�k� �U�>�Ղ�Q$�hb: O&##֑"C�(4��	o��]�5�I ��߭]����|���:�6�q9i�]�Y�i�I`Im�XF�S�c	��-hX���G>�Hk]z1v��y�a�,/W�Cԍ}�	��?�/�r	W��aNm�-��g���'@݄�[�k�1�j�s`:���X�����8"BJl����T!r#$F��6�Xb�n����	PHN������US3up�Р�`O�Q\��y�.��F��m*���TJ������H�t�ߏJi�E�hn����R���E�֔f�/��6��É�]���nK񇳪�Y
�����+�";�&d�a��W�$����jb}|������0���mA{G"F��7�l}	�O��V?s�H���^	����x
����9�Ju��WM\�������ŕ�\��Ai���N��+$/��vB��ʪ�L��|'T���O�x��-"YbY��e?��?�E�g��O��*��)Ȏ��ݬ��?(ϼ^�C�sr�$�ljt������c.`�)]�Ll�UD��}��}Ǚ*,��9G��!b��'O��K_�E�+�x�E�m�E�e�Nx�d<� �Y$E�k���ĕhf��מ�G����O;{�#G���F0������##:��0�P����gG�{�t\��5lFc�_~o�ߢcF����y�$/i��3�?���~�3@��'R�T}�\4�e��OPg��v���G*?n������{ǖ�CU�`��*�>
v#E.ޗv&|�<$%∇���i9D�L\�S|@X&�Lh}n�):�~7f&�_�,��>"w �m���.�LU���&�L�۔=�k%U�V�Օ��v�]�=o��]��J��%+4�dH�»���{f�`=���{*o�Y�RD5 �k��:R	XK�gQ�/  ��H)�;�՜0
0X��{�ѻ��R�Ԍ�ʛQ���t(=��w�@�[��B���}��]�h�=Q�z�Z���F��E�&�5��ԥ?;�y,2}H,WfT^�J�1l��Ft�R:�ϔY��ɪ��Z��(������ŗ�����㽇o�2=���n�/�U��PbO �-0]��ew��}V0gh�c�9���S離o�Q��l)�ڶ���a@��d졔,���v x��@c2h���G�8Ox#��:�^�w mL ���mp�H:B&AJ�F�$���{��B� F���$��_I9��X�S���������}�nk�j��կMV��ȳ��l�կ��I��o]�(�N���r��g��i}{qb�0�
*�~��.�{�D�8�Zص�I���壞�܄]�}�k<�� 
�*0�S%pH�"]���A��O0!��##�T�:���e6���۞���3���LL{}�Y�LV����e� ��C3딝�>s"�;�T��Ήd�DU�Ta%�T�5��p����(s�.Z�P�C~��Q�$x�_C���w]�<y۶C};�[;Ѿ��O����cb����dR[�X���������5s=1bҤGH��r��}'I���i��4!���I'E� !/p�W�&�#mj���-��I��l`�q�5�EA��^I�罘�%���,T��P�xL��m����~�h�R��t�MS���&hry�gĨ�Vtւ�&�y	y}F��u�0����={�V�y��,�j���A����Ö�G�j��������]f����%z��������E�Yɂ�D�
��1Nq��3�5�ʚ����O�bdC&�������f��e3�lBJ���'�,��><����q��I�}�i?NE3��8��aG=�0&�6�+I?��t@��=Ҕ��N�.�2B�����iQ�lck�U<=�rp֚<m�؛�q�Fw��0.���� b������#�eG%'�� ���߳��Q\G����ѺaH��'�l��q��|����n�9��,7�!�@���v����2ݳ|��t�f2N�~]�����u��I��l,�ٟ.dK\�rs �9P��]�e9���!\��/��Ä�Z��G�����bl��&��!@�f������NgL�@�P�P*�2�F���^@q,`᧕_�n��ĹN�&�)�\R�Uzݐ������К��(���q�}6e�2U���A!���t3I���]J*���F>�<�D+˲B��}�H�mnc,ЂU�e�m���3�?���{��PnO�LZ=��P��|�q�o����b������J򗉤�T4w�g���3�@��eهGi��1��M����Z�D~�K?�4�dғ��/b�;5N ��#��8:" ��� ֙��;��{U.w��lͻ�86�����X���ʐ��-�|;�k�p��p����]�����P���:i*� ����;A?n@��LCE��O���2ي"͞7�t#4�_%ğ�O=��ԗ�e�%ٖ�	
�@�&���vQ� ٿYx�2[�v�� �A^A�	��C�a���b�:� �dT-���Q�h��V��6�Qc6�ۤ���鱰_��ftA�|@��t��h��WBBl�"��-	�Χ��'�+�;p�q��XĎ�~�GČ���E��!c�I�Be(yj~�@u ���C��-���,��XҾ�ngY̏9�ٖP"���(&���Z��w��|����¼*/hlݹ��&�>h�33�q�6�!��ID���1T���i'
k�n]m%`K��R[�o=��r�I�~ࠈ�u	{K�fS,# ܃� I�@l����c+V2B쯽�94�|Ema�r�N(���p����-C7U�<ܨg����E���w����yJ����5z�/�&�Q^>:*4����+9���I�����剣l�|�������P�yd�Ө��<B�#?¯z�����Eǋ�3|1�xDg<4�������װ|o�������@��x�i;(���P�*����aV�\�q�w�Jؽ��|��a�-~�a������ 8��\j�2K����s���E���LG�����/��b��/FFF��D��纫�L�Q�h{���y-�v>���m=���s�����A�)>ҎK*�1���3rZ�S��v�md,��*|_g������I�"�M��[AHC}7%��e���LU�G(��L��e��~��v�N��@st?7Q�y65����OFzC�m��h=���.)M�h(́f�F��?,͑�ś����u:��z���� ~D�17^��{;,9��V0c*��F�R���F1P�-L0J^�܉:�j����RF�G�>U��(*�����$]�V�0���a�g1c[�Gc}�5�b�t����Ze�tw���0����:���:������P���6�؎��"
��9�P�@��j���#�����k1o��o��O�J�^�q �O[�G�f����Q�d�I�|〄:,�n �_��f|_����Qd�;�@4�z_߉W��W-%�9HD��;�Y= �7�upY�Ӈ�5�ң�U�@3�RU��l��	��;w�NU��:���j�yՉpw�8q���η����5��JP �X�Q�_7n����;���|�Zn�-�3�2!�����z4GqQ)�=��I�L��9;ZV0^d*5S��V�?YAyy'q���?��9��/1�:��h?g�FOZC�A\:��~�\�A�暨<SU�lW`�p�P؂�W�}���ך �ɧ&57�1��Ac���Y���0�p��Ȇ�N������s5���ڃ��2�C�ǰ�����F/;�H�ԟ��K��sF���P�D���9 �E"`&�;����	�k���9����m5�^�w�
�
g�#c�fR�i�;
Ta�=dU��w݁�S����y�#������4�* �+C�\�ߐƦ',�5T{
B�������@|s(7�X�H��'���8�`M��x>	*�\<�P�F:>���w�<0�&��CZ�#co�#K����2�d.?#�u�%�]�@ñ��rݘSqiC����Pd��$�h$ԃ��P�΍o'	�Z���D�J�Jf��i1���U�h�R�`�?��ѓZ.| F�7�_!Z�-Ӥ��<xә�]q�R�e9v�қ��5��]�Bf��"J�K%3d!� �Nm|9�q�����4E��!+����օ����9
��4$�y��\�M1���æa��F�Y�)�qM4��M�H�����T0�̒��I�h)2��20+�b쏄F�h����p!o,�'^��~t#Ȥ��ߜ�Wř�E�H(0��:�f&�Ǵ��c`����X���Pa�~��)P�w�ӯIg��>t�jo]o8JZI}�Q.���MM����W���;��mx�ET���y�i���ӧS�6���M9+C�!/�w�|�7骊S���,a���^C&���f����7t䩸0Al]��*�V� �\/jZ��/]����Q�������ʳ�>�WuUwuW��tO��h����}�F��,�嶑%��e��c� ���lB��pIb�X� ��\aˢ��$�	�K���E�HH�}��TuO����?W��:�t�����]�w��||���C7��w�|���{�D���dBBT�� 䘈��u��D�UQ.#?c�0�"G`�~P�3+A8�;�`�����`B��G��3!ab\�-�7߱C�� ^M����0���z�!�ᶋ~P��_�}�Z<�:�A��u�l�>s�U��}����ϱKh77���@�U0 �/	��WF��(C���|���2�U�����a�]���(�����[�ᕎ�����!#��Q�O s)���t��kґ�X�ėj�%��X$�~͡�����_(�;�C	k��VSU�����z�� κ|�����9^;N�������m�>���Z/��U��]RH���]J��o��x���ң����褻�}��G�������A2���\�K�*\��:WAď�q���Г��/���nu:���Rj]���ƅ��>��ϭ�ۡOp���hH��*ZHQ�XӮ�1r���Ԃ�<��UYF>}�[�5��'h���zU�Uѵ�4#�M� ��TD���K� y���9��8,��|7r	��ln!�����=���y�8�m�hpE�5�_�2����kl�������0Nq!�;{^1�w�{�!�<��M���۽7�Zř�/���Ջ��}���C8�����An��u/���y�5,�/Mu��"��vQA��el:�?}t!P�>pl��@f�DTk�rp� �[~���z�<Y��aoϺŗ��sn��~ډ���� Ԋ�Fy��}uO�Lـ_����YB}�f�r.��ѿ����o�_>�9J"y�[�K��+�'��.��Y���}���������c<p��ot�] (�c��h3�v3NW�٘�?�p 1Ƿo+&�>T�c#�v��bP�Ư���;��]��pH�p�g�gp�K�����ҍ#�A���_����{���� ӁF"eN���s�E@�~�6}�9���*w�:ٻ���ov@�^�+��{�ڳ�@]0ݵ�Ӵ���|� ��,P��6����0��Y|֑O��ĕ������Oo�o#�$���z�5G�(���8���z#�BM�����=k���7�jʮ���AJ����C1V��P)�~h�ݨ��0�F۸�v�� ��L ׼�W4�"C߸j��r\�]����o净��ϛ��#�E/q/��=��^�Ž��+�\����-+%�����K�H����w�F)Zco��[4����ïh�B�s����,�g�[��;U����1��_�	�;[J�}⩅��y�y;�d��[y�	����12�����J��R�g�9�ߡ�F������*��v���	@������e� �WcE��2H*�]����&/Ҧ��:������8.���b14UD%��d��8�s��c\��� @3�V,hK���rZV:���or�uU�a�\�i��:����Q�n\�BJܭ����P�r�nU�[�Q�-��	'M������طJ���|�O��H!ܕ:�c���g�+°q�av�D6F�Kd �f(A��S<��<�J�8�.4c�}i��1\�u79�˧BBWb�_�P��!�E5l�2������j��_���y_=],N�F�������m���EB�Q�8�⟂c��#f�F�V[��(�ѳc�bY(f�=�{]@z�n����jDL��V��8E�uu,��=A� vP&h��b֯��m&���'d�T7��T�����Q�~uf���M�6�����n�v�U=�"̡�9�^E@2<:���=eb�1������D'AHV*i7{��Y�"���!װ���U_]����j����Q�Z-C=y�J�ԇ���_	���n��j_��$WQ�_�QM7y��c� �Ί�O�!���V����_�Q�kf�HP�H'�P_�Vh�Ne�o?�b{ڀ��^�n��GEWG�-&l_H��ט;%��e�:��S ��eGD�g�������98!����#���X�Y�����˗;M#��y�=����ßg�ef�yX"�x��@���E��)�*�ƴ��L�E�6p}~�ڈ��3|Y�$x�ܺ�|�ν�>5�8�"Jfg4XH-�
l\��Ɛ�Ė�NozDQ�4��X��7#�Q��C?�����r�x���b�,�c�[/�`�-��^ͺ���ᝃ��`�o�W=O������U[���Y6IO��C'H�O���|�.�]���h�S���GvU����H��f�	�W����M��nh��6�ϱ�}tG丟����`�)�p	��?��;pSv�eH�Apϰ�u3�as%��~M�����sW�`/��]�w�>y��gLg�t�61S[Eg�2>��Lg���h!�i�1�q��'gd�i�^����4$�$T�*�*�ԵS��AoFw����g>v%s�ڠV�~��t�҈nooʁg�y.���r>���K�C�1Ha���2�]x�w��]'T	#u&������ϯ:QAS�7�K��S���tXv\��9g��r�&v�� �y�ԝEڲ��������ѓw���7{��}q�l�����=��]oL K����'����%ԓ� Ej~�%�����@��@H����m3��$��Ef�ټn��; LT:�+��h:����OGo��O���ø���J�<:�=}�Q��]y	��;Ӡp���2�0��˳5~ԢS�4ʌۜR"��6���7��~Ǻ,ޘp��zF�Ȑ���&V�:<������
��b���X��du�q��U��x�-(b��Xc5�� da`���ۨr.�1�r��|�y��S82�{���p.7|�a|ǌ��__ 8}��k�H�7"����?����Do�JU/�|����@�q��ї��G�� �8�A^/����җn~�G�8��f ����T��}�ft�7���e��4 �m��P����9����ǞZ i����P�c����AP5���
�.���1��T )�|��~��A��/��l�u��8�s]�����DJ9�T�(�}Ʉ�Ɖ�nF
z�w�ƀ
���yZ�Onp�:U�4��{?�&�{ww�u���w�=��0Jw)�?8�����-���R�����r��#����VDw���(ݣ(�VڍrZ�%^A8�+т�/�{���\+W�.ֹ���,����3��EO�<��Z��Hg�
���[� ˎ_жeާ�E�-����$\W�����6<� �n/�NhS"NhB�D�6p�#O@@+c
�Wj��{� U���w!q�	A+�ґ��D2>�������J�n?��aRJ�7�a� ��M��c�Z��Mu�ן�7@�IxK���K:�zY���NԴ�#�E��T�@�Xdkr�΃�������L֪6;Q:��|���w����9N�| 8��f��鏶0�Wd�4�p��
8ҋ������J�V�w�5�X��p�-M���c�6����Y��r���W/����Ųtv�݅�Sݿ�8_���wo=��+$y鸿µ����ݘ^�_ٮ���0B�+hWz���:��tI���Q���*1
�"܉����*�Jw�vW�r=H���"�6�5��d�y�3���i�9��4�G��Ň�����%���2Љam%i�u�66Ҿ�{�ࠡ,Z�'��߈:׵��y�^l���'����C+ti�J,;�?��v�Q�ڟ�ۗ��g�� L�8��|�z�������r�YT����9���ОCT�� ��I�R��������8O�1,ǖoV��u�
kV3���X���F�(<��?6c��Ȉ��!�>	)���n|���$ժ���-����쭻f��BZ8�O�U
�^˔W����
w������@���B<t�J���S�)O_�v͛�����vd�e���;(Y�063��)f�2�t�n^�2ጂ���5ni�=��D�)�䄹�18�ƴ�I�pe���fQ��ϪE �UE�w�f�e����4������&ӑ��O�p�w�7_����h�}���OgC;�9���9� :!�g�����	�X"ۊ ��d���o~~��^�?��hz¤����އ�z�F�)P���i��;G���dPr���cI�Ք`5{��G�ՠ�����3#��Hf��j�ߝT��N���`*	�h��~s������e�;K���l5]
�we�I箍