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
�i7�����b� ����m3����y�Y���@�������h��M�Et�\���H�V�שۄ��d�6�a1y|.��L�F�2��7�ݥ�Je�o~��	���J�k�6\�T+l��"�D���Teap3F�l.1�D�D��Dn�'i�{(ڝpj����d8�Ҩ`��xP!�"����w
$��X�C��oƼ��p'RS��&�EY�M
 [2�"�E�&�jǋ�����e�֊o�z�RoԳ�D
R� P �)/Kz�G�����p������E�`���V�p�]�#D�d=-� +�8@b��n�E�9���D��P<ˊ�G:�����@�9�B�BhD]��n_7�c�6��gp�i�	V+�B����4J듶^_�d���j\�s$>��=��l��b��-�+���3
�����F�P*?_�?�1�|j!^x����z�.�� �������s_�/��y����� m&��l�®�}�>����w䥋�^q�1��#n2��j��^�-!��C��ǯ�������%
�y>A!a ��]g!������8ɠH��}]���5vQ,���`���D\�(l����T�w-=���Q�=1(�0�d���uΦ4#�`��@�5����_J� r�j�<�d�
�.c��+d���U����+�Y2*��m�b�I����7Ldħ��M3�@��W��c9?}�#�7�ˍZ	;nŭct�����g�I$��x��{#N�)3>8r��xL"n���N������~��8?+х����U`�D�9����÷~�ϲ/~?�_Q Ys�Y�>��l{��2��2f�K"^�>���|�2�+r�`d�@56��Y����v��Y�g����g3ێ���ޡ���zt[fq��^�H�׸�i�ƹ�	��]]�)�� ���C/
Ν�#`��]υΝC�����z�*E�ѾL���F0���<b��4l�Iz����и2F�gP(�YM|F��Ҷ��'��$��X
bA�@����]�%=�:l�aP�(P���C%�q�� 8piC����r�5����"ڠ�-s��z,��� �c���M��6_K�Y2�Y��[�>k��d�o�u�j����/�N<O�Y��e9P+�j��v2AH���FH�����]G��=�o��]?�<� ��/柚��O�~
<�yM�on���u�Q�!z �~�ҁ�-�ۭJ��u��dT��A�:/�ui�?K:�s�d!�OA��>T����Xs�Uآ����O��2����ċ�t�L�%�{|��
��#��Ȱ�������8�.��x2�-F�8.t�ϥ���B-���ڨ��@��t|�6��FA^~uEZ���,��"M��Gr����[@�|~�?εe&���Q�l4�w�L�/�F�-a�G���}��e�yW���Ñ�[�W��f ����H�û���b�4��?B�Z� ��e����9MѪ [Ԅ
���]�sp��#Q�eY�m�Q�YM���Ԏ�1Vb&�CIH~J�s�
�`��=�N�Н���h,Q�C�-�G�%�7�E���{�ҝ�HX��PUj�ΫN=�ؑt"��K�O�����6�♭��3^�{(�d�U�!���H�n��:�����df���|�*cz�$�� �3X�����"RB��dbg��ׯ�>�=2W*���
ׄ�ρ#�e���p}_*͍t��%�!�;p��?ЬU���D��qف��G<u(�R���]�����-,(2ʨ��wfJ�cK���`�J��狉w\e*s'�P Bi8{ĶB&���Kԙdʎļl��;��u��9�Р�c/ .w�o����	��$�N���2�] ��� �Ma��R.Nmz��􁱁�@.[w�8Cpz��'����r�vl ���LKN&qﺏ����*���
�˲H,$ÑB�����)�,MT�y��Պ2���X�8�]{���0a�"f4W���rB
���x�XVw�s$t�뉥U
��Z�4�"�LI� _�2��S5�a�=p�ay�+�W��( u�GmwE����B��>8=n��ݽ[f^=�M'��]N����)�1��L�a��\�>�X#�
6D�r�6`u��bM����|����U>���� ���c�MlrG�0���Qĸ�r����Cn�D_���7�WFG+��g���b?��J8y��oц� �۩�L�&H�&�ޠ��J�TygΚ��ݹP4���v]�{������Ow-��ZBP�µݪ���
X�5��-�
k���J:�EU�R�G�f���u�%�i=��*�e�MKa%e!bR��I���y�u��Sϖ�g ��v�yjn��>e�KsO9�8�����e��s49�N_��8x���-�?]��y���k�q��PC�ex,BA�or0[V�Kn�P� \h����|�1�������ВC�]
U��$�g���(�s������ҽ�����,:�;&���As;�ݏ�b��hX�t��p���l����r9$M�M���'X���H½�|�f��q�dc���O�^4�[������0�0�- ��ۮ���# ��c�
��U��=hq��ݭ��C1j�!�|
�]�|g�Wf�����p��4#~ٹ���d�/����f�$]o���Y�d��,0��ɡ��5��*dB��� ���|9��.uҕ}�y4���	�2~4�W�9YS�p}��*roL"�xI��o�ůS�%=�%331 ��0�f��JQHT4ƐEӀ}�2=��	�B��ߥH>Ub��*ӌ��4�ږX��63NQN���[Hl���Rn��C����-ӓ��`k�T�P��ד1�G;�2�H߮�+�['Sቊ��ӌ�]� ��ro��;����R�c��t;]P��㆑�����"��r�;���2I�2G�4"	�84�1U+����N��J*����ou��ܱÁF⁊�>(���3N�=!��Q�s���Lf�^�4G�6���}�EZNK3S3�*���n�����A�c�ď�;Yք�Ձ������٫��mHGGrNth��٩
h] �����`�{�!x�"b�a^�N缃{�ՕI刎p<��l�2�(Pŀw��q����3�Z8��#H-�ۇffkd ocTj�%�qo�3�?���mY�T�;��kX��]���⵸�*$Ø���<��B{]�l-�G�.���u*⛬`�!TP��eR��$�%��dܦ5�I} �A�8;�!&S
0I��#�g�sz4G���	�J�2����򵠂������j֯H{ߥ�d���*�,L-�	x:��3��:l.O�}5�
��8�*���C|<����$N�D(|��Tܦ+�d탎�b_���ے��H`P7�-`'d�c��[ �Y�6Ȋ�Z���:܈W��>�ʻ����8���:�"��P�p�����}+�ڍ�B�L)Lk ˕K��Z�u<@��뎎�n��F�]5߷YM/lv���]�T��x?�����en�ջĕ.5�V�;t��7�ُ���l���k���	}dqt���%�t~�,��G�
g(�]i�e�Ge"����+8Px$>�<G�S{�\G���g2�ҿ�-e�����<�p"�}��e��p�����5�I
vL��TS���IO�ƽ�>����m��'B�J0���'w���#P��b����i	����w^+��&Ƕ���5�ɾb	�'�/}\����������~D/��J �6��p$��q��D��}2=+�O$�+��� �)���k�A��d�oN%�O$U�5"����3��*���M@��z��8��sΣ-�k.{��(9j��;@
1�l{Td��R�r�I�)(\(�g���E��T�Z^���d�͞Ȕ���j��XA�:�Z"3�2�zJqm�۫�[�B콮;	_M�_�s�ݺ��V,l+�����*F���cq�'���|H�x4�V�!=t<�����gQ0����z�'�� �U��sJj&r!��yD���\ȲN�˺�H$;/�Hр�N�z��tx�2��1d_Y� ��:*PE"�!�1��WP����:=cD<u�Խރf�������=��/qe`�<>�����O��8�F?WasfXm2^��,�@r��'D�T�?�N�*	�4�I�s>$.βB'<S?f�p9!L^�~�ua�v͢jO�JoI�p9�t����/4�ڻ]!��F�揈���{�?
x��a%7y}�y�6�ׅsx7�/̟T)f{��A/Hcڡ!b���]":�����*AV��D��E�M_2  �^ {t����=��N���xk�XSD[��� !�ꠗ;s��`����� 'S�3��ӱ4�n'k9�� �M�w��C���,}�n�ny�}�x���3���s�����}
^p���*	@�x�����F�r5�����F&��e���VW�����~����y��=`9^PQ���-��m�
���x��:�*�SL!�-B ���e/U��7��}o��=�k����>c��|C��޻ �r�-pxZ�E#f7��9�3��B{}_*��6��� >�	EPO`o�v�t�x6��ƌ��`W�csx��Vdu�7ۤq�3���ʼ�X�b���E���bҸ��*�6ZԎm�-���Z����2��U$�^��nz�Q\���Z��l��P�6�l��I����K:|�O}��O��NZ��щ3�m��K���wI?�~�E�m���Yɗ�4-7m��ǳ+F`;b����X��V[�����<2����c|����X��LK�ڻ:��!��΂�e�u��E�`���d&�F?�B���x��T��V���
ܛ��N{��$��<+����g4k��,-���A/6rF�nM~<
�ݨe�ʘ� �WR`� �>��k�^��t�jd�nxFU�TRqg"2��RT�-Dn�	g�H� �O��3�[��qVl��wl�Z>��EE[Y!��k�2�K�C�� ��v��o�
�I���Wb��n\\�q�F�A����t	����L�A��s
�}�	��Y������W7��٥��/�ϊ�t1}-��\���L�C3=���KXMh��P���0�q��=?��̋]�~�{��t��l/J<��aW���������\r������GB>��X!��1T�|��N]��m0�˂n�(W+�O��[5�;�T��~y&e�kEW^g�?���\�ާ���}�����;����E-���P�;��&X!s^h_W�����u�؁_���d���a`������\��M��Gܛ#��"V��hx��8���Խ��-o���L��j�.X"E�~�go�2�<���v���S����W��[&�S�o��[��R�"����ت5m�v�>�)n%n|���7�E�q�]��[nn{��)�z
�5�],ںy�8�5��ts�X��������)�g���2��? �:`d�S�J�pW#(��z`�����ƽ������^�02:��K�4��!�e@@ZIX�n>f,�AC�{�Ȉ�����߲u���mR�L�L�6n_���\p����׸��=��z]�Ub�c<�`�����Gg�ăt��#��a7�'��6��b�2
{���]g��o�9{�'e���E�7����W�B��O�E���Rt�L�b`[�<�V+es<ZFƑ�R )�ԋ�Hg ���S�_�2IGynܬ�S����xz'��!�{�2��#Z�;�y���j�]���tt~ċżL1۝�w�>|uw��������8��:�bٞ~��|oe����ک���C�����?kd?(f������}�&��+���~��Jɵ��-��&��G������_4�*��*�|�w����B7�x�}�I��ֳP�N@��,���@F���7��C�:���?m����$d3
nj0I!���뚨��;sf,���tLU[��Ag���(V*\��	d���lzd�1u=��d�)'fg3g6�m#��n������_����Pc@
��
gvYӍ�v���b[Ș�dVW����v�z�q��U'nA�3���	��;��ޏ��}�h��8���
��=���)�'{�H	 �����D�����m��-�:�����=��҇��f�/ZxIb'l��c�G� ˽��2�}����G6Pn�d�
���A'�;�N���0}X�-���Fj��
J3(o��:a�4��xx��= ��}8z�{��1��{-��_�zK��]^��~S��c��=�3�tzEN�<��d���5o֯���l�ϋqd����33&�T����zI%���a?�O�nձw���h�
��T�[Շ�����Z�E�����Q;���ܳ��X@��0�;�K��� ,�Ib@��XpXn���z	�&cqW��  vvL���4'N�M��J|.�d��_���h������?�Hei.�K�]n�KtE��wܼ{tx���P��S�3�G���7�ɏ�����_pN����h
�TW�Kz]��N�6���
��|�h�:A%�L
IZh�ɂ�c�p`z���G?�52]R�t=���鈯���W�����]�)��hβD���!�kjZ}�#G��e�O��Zr��\Ƈ�f��j�8Q�K�t�i9��g�fk\m쪽<��Y�d���)�����ˌ��`�J K�����n~��Y�,`�b������ܞ�R�3�J�¬�h��9�'4ψ��L���Q9���2Þ��,\�����Y��<�d�X�*��(��Y[�8�Q#кD t"t�g}�-HP�V:8#f���)�{U�fE��zA Éj �?��8�^.��?�G���x�#@�yz�lx�
dK�ycU5!���
e\GRjC������y�>x��K�<<[���P��KCݺ�+���ٮc�-[��>�kHkc��yLQ�lݽ�@�M�nU���a���ŋww+��O����l)%N9�S�d��)�w/����?��A�#y4��;-yS�6������h���z�XP���"�L�� ���S�OY.��cÁ~G��*ۥ;��1�.�,!�T����)��)b����pJ$��Ts�*K{�x���V(�PG�{�_Ƒ���
��2�\��zD�g�
BS��ĩ��-���V��5�⻏ތz��D��?X=C�����;�ݿ]�b�[坱�7�ǯ^�I���zG���)>M�|��H��?�FV�6fI��7��`/\3B�t~�����nY���^"��{Ǉ ��'Rt���O-�D�w�C���+`w��b�y0�����	�D��>$,ѽ����.T�H����M�7Pg���+JTR�03 `Q�Xh;=`s1��<
"Rk�����C'�;�g8�;��<ڤ�F�5Cf����Ph��h1&!�r����obqۋ�S|+���p끾���ߦ^�X���7� ��쟳m��}{����������+��C�}^�XL��A��iTz
�E���Q2���K�|+��<z�A�?���-��?�#*�9
Z����=~�+�
��b�u�s��[��,K{B��0��	L۟��O��rtrX�3R+o�A�ZZ����Sn��)�O�ͯyG	�(�P�Lt���S�刳�D��sO�������9�*^
�0��%>�ݶ�53����.�K�͏#/�����c��jO��-Bܺ�-C&�����yG�U�a���*��h�J�t �ތHsH�b���@e$�yP-�b1��R�:Tl�-U�=C�H����Ǣ�QG q���YC���-[+B��k��v�����Z��~���e�šdO�6V�J+s�h���I�/bփp��ҥ�2_1?��,���#�I	N��4�\P�	ւ�&����)���KC����B���ʮ
=�9��a9v�J��X�� |I#���4��P�D _z�/ŵ=. ~MW`������p����|ȬY�3��v���k�a���ZPG̋��������ѕ�ޣ��Vijٮ���)�{���V�q�������>��9�!�]�&��}E�ƐO󢠁=H�bB�����l 7�tx�P+��hto&������P�r��%ag��Ʈʠ~r�T%��T8�<e��9�6�Iq0�%� O�p�L���T1�ȩ�ݦ*��&vlEڑ#ͪ����:�T��-ʳ��'�������}�#�
2�e�j� ��P��ofzA5�Ҹ�^cv˄�jAκ�mp�
*Pn�t����z^��3��j�Z{bvUamC��m+���*z7/�j
4ub�Lپ�Nv��F�1!ϯ=�ꣻ���G_}'��9t��	;�������P��qe0
"�����sb�8������#���xߴv�'�;ōt��y>�	�T���ѱ?��w�6�tD������<��m: �']F�������3�<�%38�޾�κ��FZ��b��3UƄ����.V�I�ߑ���~��$�Uv�M��z�$=� D)J�p%�Q�H��(��ٳK�������%�)-�B2����r�?�/lsk�e����j+�&�N���F"��1���>�b̓�z��1�?��2�&���ˋVM��u�j�$���.ڦ�^�"ή�;�0�����5��r� �P��Nh���C�rP\;y|�X�E��Z��,���N$B�#�N�.Ķs�R���F)����Ϊ���"z!�t��S��wn}�Jƣ�=��6�4?���Gվ�ࢀ��6?�;:6=�qW�t߻�#°5��}�Ϫ��I����N�^��n�'o{=�ނ�w���WZ�ވ���6��c]�w��>�u� ����Ʊ��>X�}ד�=F�m��6�못M��zj2;D�<�tM��c�XÖP��:j��?��%�J�ئ��עC|�)h���C�.�x�N���~�>��o��V�8��uw���������|�q�NcM��tϸ��<j��H��w�u�ҏ�Bj>��FK��[/D�5�n��P
�?���X�x��9�M����:$�
g"|t�Wh��i)k�v7�7��%)�i�U <�i8�P<�p��M�R�8{�Zڂ���#6�I�#(~��Z�r�>u�W�w{>g�
���l�<tG���R�2 ��f�4���V?b�Ah�P���)�R� YOЁw�*<i�$
 ���(1N�����-H�r��ޟ���̛�;���^�6������s��W5c���|��7����Zxh`$��*J����"u�N����ͧbW����{��F��ٗ �d�^��_�ߤy��.�׬C����
c��r��L���(`�3�[�*6���g0��� +Λ)\
�R���4�C�B�g+;~u8\���{�7e�����Ҩ��`�>=����C�¾_\M{��ӕ����g�C#c�h�����tx2���ũc�[v^y���e�w��jȘz�UCB8[������5���dxR�#��&jK��(���vZ�)�;�nx��f�]>j���4u`0߭Y ��~���Z��j̺V o�[{�œٸ�w����z@�!dw/���o ��s�%��|D.�R<�l*��h	Y�􏄅OY��i�q�z��?l�?����Otm������4o&���5,�WM0��$$_�)�2W���*%y^HÕ}.��.�̈�$�r���c��,Eq_�6i���U���
� 0~��<�����1Ύ�a3��D-

ΰO
��-����彭�w%�w��2����k�F������������P.�̘�u���8Y�TS���x�a���@���c5����x��↓���U\YMC���E�B����C�㩐D��/~i��������|���`�8��%��J	����SPL�@J
�L��]"�
��-�v�v�T$d!῞na��b�x~T��n��^�Jڼu<��PZ㐵�^�,S$nIܒ��� �g��(��l���

�7��Z��>����Z{��sWg�ωe8���
j���l�.��m�|�k���bd[��:�ᤏ�I���'@����=�1~R1E�����?w%������:��,K�$\��jW���d2��iy�ʌ6�T=f%ŷ�$�����Y�ߘ�No֯bj1%9���č��'��L��A�����c�JG��JY��	sx|�߯7CR>��^$"�;�΁��m=k�q��(H����
�ܣ�>������γ��-k{�x�J(�R�
  \��)�3�L���$�J��B�`UZ�$˖��2N��Y�k�,�Kr
p^��)hj�f��X���m�}��g4&10�t&JA��Ԥ�C)m�r���H����iN>t��7>w�.���9)�XT���@ �^0��}�I�q�+0xt��D�c�K�Ѳ�h��H��=R:3V/R[t���e=���@�}�p�1��4�?��jt	x]]�$�{
=���#8�㭑/�(,:�QLu�����`�O	8S7A�<�WpF^�ui�UW �5����j�/�%�� ��V�@��8�׺�+��{͖�e*�����e-�[��B��DTF,ƶ�花�ȮE\0�}�.!��?/~i~���V�x��
���?o��nt`�S��`�ΐ5H�D�$�@��yx�@�.,/�V]���@�M�陟���\ܖ$Jz��m�\��Lc�>H����8�z?@�����#�j��,�k�kԗ�Z�Z���#�86
"��.��^��k��zƲ~D,w��k ��#U����D����q�*W�C��	�,F�9Q{y������?{�c7��؍k�C�N��
aT��K�B��V�����X}�����ض�5.@�Y�G��y�d#����/�+�����`7RH�w�(���=�������K�h�N.�xfR��߬O�[A>��s`a�����[�?cYg�h�ɻ �`Mb��<�dK�,�!�Ӂ�V��E��yu�x�M)����VT3| ��Y�V����]o�$ЂQ�\��y���縃2�²/#(/<2�M㉐�p�N�	�̅���Ͱ�0n����������`�hںR}�(H�E`�sU%}���ԅ���OQ�X��ksJ���ĝ��l
E.��1�M���J�9��QC(K�J��˟�,�����)�0�L���3����B�~|p��	Οn�e������b)S���tx�,�Gg�E3�8c++���rwO�M��T�����
�?:����Ld��AR��j�-�8gi̈2�^yfG�v����Qɝ��º�.�*�#�S���p5���+2��«�Rf��}O,��e���dqd-W�D�(�?�FY��N�~
j�������[l*��X��PF[W����>�����c�Z麒�ȩ�#���J9���˽��zE�H����f�r�v#��,O/�a�)7�<�	A�A����>���A3�A0C"���K|�j���;�ŵ�כ�������ZOd�xPvo=�G�ř,����ʈu�H_�Y��/|Xĳ���{���i�Y��Aѐ.����7��91Lj����J�~Q�^
���d2GT-�@c�j��a�Cp�.��jK	*��.�S��@-%qC�4j����~e�K���2��s�Ś��Ş`>9��Խ�\�*�Ҷ�!`����٘=�k�A�!�`���R��,�����2Y��*M���	�+�xK��<ɯL�n�
|N� ��0@G��H,$%���Hy��g��]�.?E
�/I� �4��d�J)7gu��hP�F�d$�Y]K��6��fp&��Y�LF�z�g��0��~�+�)Q� w@VU�	XBX��QǶ�Ca�(f4%2����Z3V�L�P��ˏ;[c�� O\�G7-w6ۣ�&:	�f&XEw^
}:��t(��+-��H4uD�!`ި���=��$�Ԭ:�iZFM���s/���PE���l}�B�1���]��lfi�=c��
����w_�[��(Ԩ"��(�-�f~�G�o��kѰ�����B,��/�e��z���wi�*p�jB�&n� U%q9����u����跉:^`�JJ��1��m�M�"��-W�ah�J/��O�t����TB�FAz���o[ݒ7{��8���݁���Z<�k��iI����i=��Ezc~ff����$z�)��栏����q���a6mR���!�2�f(��b�����?�{�����k����)6�l��2�؋��hNVR ����qM�_��*Q����[�<�B.�.��r�W)�L�C>i� ��M�Ójy�4s�Vi� _�}��{2�'=��8ۇ�Y�^q��m�G��(b}G�N�ĉSC���~k�r&�ɱ�U�����H�X�����W��
C�"����?���T���O�-NP�|�*����?qG�ԫĿX|���ȶ2H#���M�����OP�w��}�X)u��L��2y�S sM6:2��u܌"���ܙN�Y�?ҩj��Sh78�]�Y�����!zx޴M��u��iUL�&��{������p38<!��g�~'��;�~����o?{�%��U�)�ч[�ZJir�����J���Φ�P���| �Ʉ���Dw��w
��V�A���[|
���f�eqE���:6V�6��K�� ��(�_��k�Q��`�-�ޢ��������Bte�&|��l���cI+�Lj������n�6h	�4|=�<��f�����t*���CH�ŶH���I���μ|Q�T/�-Jz&��I}ʾLfhh�+3�R83��s2t�PtN��FT�v���oBH�N��!�����tT\���K�Wn�Md]������i=�hi?d*�l�p���(�x*�$�v0qe��������J��Pԣ��,�snrw#@�^}�T�L����W��WBi���8�����IUBX�d���<OS�bI��n9w�]��6S��
4)!J����
hc�EՊ�~�k���xp�T���)�
p��]��V����>#W;Э4l��$l�8E
p���0�@O�hcr~Io��%[qE9̥�A�AV5ޓ�C&.$��9�	U?�Z=��`C9퀿�8�V츑
y����T������Y�5�B�Щ{\�����%���5�v{�&��y�0Gx�;/�J��M��
y��lG�iM�B�
��\}�����<�����<"|n7��'b[R�S�|��{/_ٵ�G�l����v61��(���{F�����xb���N�:�*��q���R!��׉f�`k��~��t-�i;8�i��6~�Qz�~�ѽ�5�3.��a��F$a�3��M��>)�wó_��}}>���M�H��_���sy��o�;�=�z׳���_���e��_-�r&�� ř�m�%#�F�y}��Q����HP��6٬��'��(��r�%��7d�f;nӳ�	�m�&�FɎl�d^j��������*h`l�B�Z�F����Q�@�'�����H���9Vdηt�v���'�d�9i�N��~�z%F~����*��mK~NI��ϝ]^I�δ�%����(L�$�]m����h�H�$�돩ϰC0�g�!AN,q��%��kUk� �ϼi]Sx�3m�M�Nz�n����!����RH}Cmp��M�����B�)=z�U}����{��)t\h���#?l�&�n�R<Y�c�Uݒ��4c��ƅH���yp��+Q��������yT���9���!Bt�"��1p���[&O1�E�Ng����6\��{�,e�]�j%�{�����Q,W��x�T�:���f��c��N�{7%R�r�`^}g<h�o���d��ؙl8��[����-��j�����\������oO.:o��9$�A�� ����� $�+~�"�`�4�[�̪��,����:_�"������\e�В�Wֺ���x��]Uձ|.�^�$V�Op��_W�����7I�c���?��%�i)�J&-�%��1�N'*R��tG!H>0
M��c#,2p�"H��BtJ�!ggh/�v�ewmpbQUTuqb��[wvD�n��mB�pD�ooll�j�p��8g���N�Z�<8PH�c���`�����`��e�ܽc�Z۱{r�e�Ae0Hw�Ul �����{���h��d)zp�����`p0��M���^���K�M�QXjY�'��g��[��H��b~��e�;���m#�g߷����߉c�@Ƹ�v����i�9��GX2��'PZw�	::?��6LGJ ���D:�z!ԋT�`���r��
-�I���zK<l�#i�aD��=ڞ���jg��Xg�w���*������&�eO�E���(2��
��[ 9K�d�g�{֜"P���]çXK���w�-��܇�\k��Ĩ8H�B�h�byǎ��|�	�:[1����4���.]�=蘌��u�X�I���ԉ��nS%Q�L�d��(QI�0B��O�6��D�FG;>E�����Ah36Ʀs��}r��%gb�A��6�3��w~��'�����r�0fi}0s���J�Qⵉ�@4D�:�uK�fZ��xԅa���� ���>��Ž.Զ�`u��s������tQ�p�b't��
jE�P�ҍ�-?X�9�9��_��]Z���B����G/��֗�DQ��J�>��*����;B1lݺ�B�����_�D�pr��W���Q{�.��͔����󤽗f�o��.;��:�3���lĞ�j�}�-�lb�"f�R���00X�
�̧ �f{�{��D(� �u��&�Lo�d+Vk�5�����u|(t�%�k�Y�V����#�q��gxI]P(.��O����Uҍ�pGݓ�ܥ�񶁗�'0&���!M�)�3MXƀC�3�g�ƃʇ���ȇ�(˄���h��0?3�M=g�2J��BQ�?����r*֐>GJ F���W*!$M��G b�{t#x_�����UVDdc�9\�S�GN��?_-@t� ��zhMA1��i�V�D1 �b��C����	;�	:��<r�˴����3݃��C��@��n޾����?��	��W�lzu�|�Yv�b���#w����
.yϟ/��J�Re(��M�Y��dŴ��'���#;�x	�����9�����m�+>��r��'x٥KR�u�a��Mp�yz�.�4Ht@�Sw9�u"n����YmS����G��G �U�x�l���U�&����H3�E|���AÑ5
�MA�Hs��}~�¦�����4��S|��(�T��c�]��¨���b �\�N0*V#⊡�Q�¸n�L8���,��&dAE�魷.�����[>�Aț3��(��
�p	@���s�XT�9�
IM�N,��z<�ʎ�wG�AH����ktt÷�O����j(�B�	BAR`�q���b��D��t��M
/���SK�^̶ 8�Kw�SX,u6��lbg"y���=��(`.������B""pY���2�0�Kw���R��bg�[��]��e�ɜM�Xڍ/���B��O������.	��(y���D?�ݠNJ�[q)�h�,}cx����ez�2���[����ݞ�0�{����3b��j�������U�8�`�z����.���ons9��BB!�8�B���HP�V
�	voK���W�����s<V=h?���J��{g�ʿ��'!d͆ȉ�=a�|ɶ�MD�*.w.�|H6_ʻ γO���`�R.v��'��jCS��A}���p�aM[Q0�sᝇw�Ų4^�����Z��-��rz�T���l(���)��m�]^ĪR*ͣ�2�C�L���ST��	ec���dkP�b���kNŘ؁L ����_K��lZ�i~D߅��f��A'�H��4�v(d�����PH��;ٸ=��
B0l|��]6T�*�ab�5�YȨH�%Y��B,:
��I�bK�ڠa�H!�c⛕Xvz����H2VE
�����+�";�&d�a��W�$����jb}|������0���mA{G"F��7�l}	�O��V?s�H���^	����x
����9�Ju��WM\�������ŕ�\��Ai���N��+$/��vB��ʪ�L��|'T���O�x��-"YbY��e?��?�E�g��O��*��)Ȏ��ݬ��?(ϼ^�C�sr�$�ljt������
v#E.ޗv&|�<$%∇���i9D�L\�S|@X&�Lh}n�):�~
0X��{�ѻ��R�Ԍ�ʛQ���t(=��w�@�[��B���}��]�h�=Q�z�Z���F��E�&�5��ԥ?;�y,2}H,WfT^�J�1l��Ft�R:�ϔY��ɪ��Z��(������ŗ�����㽇o�2=���n�/�U��PbO �-0]��ew��}V0gh�c�9��
*�~��.�{�D�8�Zص�I���壞�܄]�}�k<�� 
�*0�S%pH�"]���A��O0!��##�T�:���e6���۞���3���LL{}�Y�LV����e� ��C3딝�>s"�;�T��Ήd�DU�Ta%�T�5��p����(s�.Z�P�C~��Q�$x�_C���w]�<y۶C};�[;Ѿ��O�����cb����dR[�X���������5s=1bҤGH��r��}'I���i��4!���I'E� !/p�W�&�#mj���-��I��l`�q�5�EA��^I�罘�%���,T��P�xL��m����~�h�R��t�MS���&hry�gĨ�Vtւ�&�y	y}F��u�0����={�V�y��,�j���A����Ö�G�j��������]f����%z��������E�Yɂ�D�
��1Nq��3�5�ʚ����O�bdC&�������f��e3�lBJ���'�,��><����q��I�}�i?NE3�
�@�&���vQ� ٿYx�2[�v�� �A^A�	��C�a���b�:� �dT-���Q�h��V��6�Qc6�ۤ���鱰_��ftA�|@��t��h��WBBl�"��-	�Χ��'�+�;p�q��XĎ�~�GČ���E��!c�I�Be(yj~�@u ���C��-���,��XҾ�ngY̏9�ٖP"���(&���Z��w��|����¼*/hlݹ��&�>h�33�q�6�!��ID���1T���i'
k�n]m%`K��R[�o=��r�I�~ࠈ�u	{K�fS,# ܃� I�@l����c+V2B쯽�94�|Ema�r�N(���p����-C7U�<ܨg����E���w����yJ����5z�/�&�Q^>:*4����+9���I�����剣l�|�������P�yd�Ө��<B�#?¯z�����Eǋ�3|1�xDg<4�������װ|o�������@��x�i;(���P�*����aV�\�q�w�J
��9�P�@��j���#�����k1o��o��O�J�^�q �O[�G�f����Q�d�I�|〄:,�n �_��f|_����Qd�;�@4�z_߉W��W-%�9HD��;�Y= �7�upY�Ӈ�5�ң�U�@3�RU��l��	��;w�NU��:���j�yՉpw�8q���η����5��JP �X�Q�_7n����
�
g�#c�fR�i�;
Ta�=dU��w݁�S����y�#������4�* �+C�\�ߐƦ',�5T{
B�������@|s(7�X�H��'���8�`M��x>	*�\<�P�F:>���w�<0�&��CZ�#co�#K����2�d.?#�u�%�]�@ñ��rݘSqiC����Pd��$�h$ԃ��P�΍o'	�Z���D�J�Jf��i1���U�h�R�`�?��ѓZ.| F�7�_!Z�-Ӥ��<xә�]q�R�e9v�қ��5��]�Bf��"J�K%3d!� �Nm|9�q�����4E��!+����օ����9
��4$�y��\�M1���æa��F�Y�)�qM4��M�H�����T0�̒��I�h)2��20+�b쏄F�h����p!o,�'^��~t#Ȥ��ߜ�Wř�E�H(0��:�f&�Ǵ��c`����X���Pa�~��)P�w�ӯIg��>t�jo]o8JZI}�Q.���MM����W���;
l\��Ɛ�Ė�NozDQ�4��X��7#�Q��C?�����r��x���b�,�c�[/�`�-��^ͺ���ᝃ��`�o�W=O������U[���Y6IO��C'H�O���|�.�]���h�S��
��b���X��du�q��U��x�-(b��Xc5�� da`���ۨr.�1�r��|�y��S82�{���p.7|�a|ǌ��__ 8}��k�H�7"����?����Do�JU/�|����@�q��ї��G�� �8�A^/���
�.�
z�w�ƀ
���yZ�Onp�:U�4��{?�&�{ww�u���w�=��0Jw)�?8�����-���R�����r��#����VDw���(ݣ(�VڍrZ�%^A
���[� ˎ_жeާ�E�-����$\W��
�Wj��{� U���w!q�	A+�ґ��D2>�������J�n?��aRJ�7�a� ��M��c�Z��Mu�ן�7@�IxK���K:�zY���NԴ�#�E��T�@�Xdkr�΃�������L֪6;Q:��|���w����9N�| 8��f��鏶0�Wd�4�p��
8ҋ������J�V�w�5�X��p�-M���c�6����Y��r���W/����Ųtv�݅�Sݿ�8_���wo=��+$y鸿µ����ݘ^�_ٮ���0B�+hWz���:��tI���Q���*1
�"܉����*�Jw�vW�r=H���"�6�5��d�y�3���i�9��4�G��Ň�����%���2Љam%i�u�66Ҿ�{�ࠡ,Z�'��߈:׵��y�^l���'����C+ti�J,;�?��v�Q�ڟ�ۗ��g�� L�8��|�z�������r�YT����9���ОCT�� ��I�R
kV3���X���F�(<��?6c��Ȉ��!�>	)���n|���$ժ���-����쭻f��BZ8�O�U
�^˔W����
w������@���B<t�J���S�)O_�v͛�����vd�e���;(Y�063��)f�2�t�n^�2ጂ���5ni�=��D�)�䄹�18�ƴ�I�pe���fQ��ϪE �UE�w�f
�we�I箍