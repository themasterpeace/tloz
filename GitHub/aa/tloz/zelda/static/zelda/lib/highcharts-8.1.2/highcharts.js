{\n    data: [&quot;3&quot;, &quot;5&quot;, &quot;1&quot;, &quot;6&quot;]\n}]</pre><p>Highcharts expects numerical data values.</p><p>The most common reason for this error this is that data is parsed from CSV or from a XML source, and the implementer forgot to run <code>parseFloat</code> on the parsed value.</p><p>Note: For performance reasons internal type casting is not performed, and only the first value is checked (since 2.3).</p>"
    },
    "15": {
        "title": "Highcharts expects data to be sorted",
        "text": "<h1>Highcharts expects data to be sorted</h1><p>This happens when creating a line series or a stock chart where the data is not sorted in ascending X order.</p><p>For performance reasons, Highcharts does not sort the data, instead it requires that the implementer pre-sorts the data.</p>"
    },
    "16": {
        "title": "Highcharts already defined in the page",
        "text": "<h1>Highcharts already defined in the page</h1><p>This error happens if the <code>Highcharts</code> namespace already exists when loading Highcharts or Highstock.</p><p>This is caused by including Highcharts or Highstock more than once.</p><p>Keep in mind that the <code>Highcharts.Chart</code> constructor and all features of Highcharts are included in Highstock, so if using the <code>Chart</code> and <code>StockChart</code> constructors in combination, only the <code>highstock.js</code> file is required.</p>"
    },
    "17": {
        "title": "The requested series type does not exist",
        "text": "<h1>The requested series type does not exist</h1><p>This error happens when setting <code>chart.type</code> or <code>series.type</code> to a series type that isn't defined in Highcharts. A typical reason may be that the module or extension where the series type is defined isn't included.</p><p>For example in order to create an <code>arearange</code> series, the <code>highcharts-more.js</code> file must be loaded.</p>"
    },
    "18": {
        "title": "The requested axis does not exist",
        "text": "<h1>The requested axis does not exist</h1><p>This error happens when setting a series' <code>xAxis</code> or <code>yAxis</code> property to point to an axis that does not exist.</p>"
    },
    "19": {
        "title": "Too many ticks",
        "text": "<h1>Too many ticks</h1><p>This error happens when applying too many ticks to an axis, specifically when adding more ticks than the axis pixel length.</p><p>With default value this won't happen, but there are edge cases, for example when setting axis categories and <code>xAxis.labels.step</code> in combination with a long data range, when the axis is instructed to create a great number of ticks.</p>"
    },
    "20": {
        "title": "Can't add object point configuration to a long data series",
        "text": "<h1>Can't add object point configuration to a long data series</h1><p>In Highstock, when trying to add a point using the object literal configuration syntax, it will only work when the number of data points is below the series' <a href=\"https://api.highcharts.com/highstock#plotOptions.series.turboThreshold\">turboThreshold</a>. Instead of the object syntax, use the Array syntax.</p>"
    },
    "21": {
        "title": "Can't find Proj4js library",
        "text": "<h1>Can't find Proj4js library</h1><p>Using latitude/longitude functionality in Highmaps requires the <a href=\"http://proj4js.org\">Proj4js</a> library to be loaded.</p>"
    },
    "22": {
        "title": "Map does not support latitude/longitude",
        "text": "<h1>Map does not support latitude/longitude</h1><p>The loaded map does not support latitude/longitude functionality. This is only supported with maps from the <a href=\"https://code.highcharts.com/mapdata\">official Highmaps map collection</a> from version 1.1.0 onwards. If you are using a custom map, consider using the <a href=\"https://proj4js.org\">Proj4js</a> library to convert between projections.</p>"
    },
    "23": {
        "title": "Unsupported color format used for color interpolation",
        "text": "<h1>Unsupported color format used for color interpolation</h1><p>Highcharts supports three color formats primarily: hex (<code>#FFFFFF</code>), rgb (<code>rgba(255,255,255)</code>) and rgba (<code>rgba(255,255,255,1)</code>). If any other format, like 3-digit colors (<code>#FFF</code>), named colors (<code>white</code>) or gradient structures are used in for example a heatmap, Highcharts will fail to interpolate and will instead use the end-color with no interpolation applied.</p><p>We've chosen to preserve this limitation in order to keep the weight of the implementation at a minimum.</p>"
    },
    "24": {
        "title": "Cannot run Point.update on a grouped point",
        "text": "<h1>Cannot run Point.update on a grouped point</h1><p>Running <code>Point.update</code> in Highstock when a point is grouped by data grouping is not supported.</p><p>This is not supported because when data grouping is enabled, there won't be any references to the raw points, which is required by the <code>Point.update</code> function.</p>"
    },
    "25": {
        "title": "Can't find Moment.js library",
        "text": "<h1>Can't find Moment.js library</h1><p>Using the global.timezone option requires the <a href=\"https://momentjs.com/\">Moment.js</a> library to be loaded.</p>"
    },
    "26": {
        "title": "WebGL not supported, and no fallback module included",
        "text": "<h1>WebGL not supported, and no fallback module included</h1><p>This happens when the browser doesn't support WebGL,<b>and</b> the canvas fallback module (<code>boost-canvas.js</code>) hasn't been included OR if the fallback module was included<b>after</b> the boost module.</p><p>If a fallback is required, make sure to include <code>boost-canvas.js</code>, and that it's included before <code>boost.js</code>.</p><p>Please note that the fallback module is not intended as a fully-featured one. Rather, it's a minimal implementation of the WebGL counterpart.</p>"
    },
    "27": {
        "title": "This browser does not support SVG",
        "text": "<h1>This browser does not support SVG</h1><p>This happens in old IE when the <code>oldie.js</code> module isn't loaded.</p><p>If compatibility with IE versions 6, 7 and 8 is required, add the module after loading <code>highcharts.js</code>. In a website context, it's a good idea to load it in a conditional comment to avoid traffic overhead and dead code in modern browsers: </p><pre>&lt;!--[if lt IE 9]&gt;\n    &lt;script src='https://code.highcharts.com/modules/oldie.js'&gt;&lt;/script&gt;\n&lt;![endif]--&gt;</pre>"
    },
    "28": {
        "title": "Fallback to export server disabled",
        "text": "<h1>Fallback to export server disabled</h1><p>This happens when the offline export module encounters a chart that it can't export successfully, and the fallback to the online export server is disabled. The offline exporting module will fail for certain browsers, and certain features (e.g. <a href=\"https://api.highcharts.com/highcharts/exporting.allowHTML\">exporting.allowHTML</a> ), depending on the type of image exporting to. For a compatibility overview, see <a href=\"https://www.highcharts.com/docs/export-module/client-side-export\">Client Side Export</a>.</p><p>For very complex charts, it's possible that exporting fail in browsers that don't support Blob objects, due to data URL length limits. It's always recommended to define the <a href=\"https://api.highcharts.com/highcharts/exporting.error\">exporting.error</a> callback when disabling the fallback, so that details can be provided to the end-user if offline export isn't working for them.</p>"
    },
    "29": {
        "title": "Browser does not support WebAudio",
        "text": "<h1>Browser does not support WebAudio</h1><p>This happens when you attempt to use the sonification module on a chart in a browser or environment that does not support the WebAudio API. This API is supported on all modern browsers, including Microsoft Edge, Google Chrome and Mozilla Firefox.</p>"
    },
    "30": {
        "title": "Invalid instrument",
        "text": "<h1>Invalid instrument</h1><p>This happens when you try to use a sonification instrument that is not valid. If you are using a predefined instrument, make sure your spelling is correct.</p>"
    },
    "31": {
        "title": "Non-unique point or node id",
        "text": "<h1>Non-unique point or node id</h1><p>This error occurs when using the same <code>id</code> for two or more points or nodes.</p>"
    },
    "32": {
        "title": "Deprecated function or property",
        "text": "<h1>Deprecated function or property</h1><p>This error occurs when using a deprecated function or property. Consult the <a href=\"https://api.highcharts.com/\">API documentation</a> for alternatives, if no replacement is mentioned by the error itself.</p>"
    },
    "meta": {
        "files": [
            "errors/10/readme.md",
            "errors/10/enduser.md",
            "errors/11/readme.md",
            "errors/12/readme.md",
            "errors/13/readme.md",
            "errors/14/readme.md",
            "errors/15/readme.md",
            "errors/16/readme.md",
            "errors/17/readme.md",
            "errors/18/readme.md",
            "errors/19/readme.md",
            "errors/20/readme.md",
            "errors/21/readme.md",
            "errors/22/readme.md",
            "errors/23/readme.md",
            "errors/24/readme.md",
            "errors/25/readme.md",
            "errors/26/readme.md",
            "errors/27/readme.md",
            "errors/28/readme.md",
            "errors/29/readme.md",
            "errors/30/readme.md",
            "errors/31/readme.md",
            "errors/32/readme.md"
        ]
    }
};
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      renderItem(item);
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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   @import 'https://fonts.googleapis.com/css?family=Dosis:400,600';
.highcharts-title, .highcharts-subtitle, .highcharts-yaxis .highcharts-axis-title {
  text-transform: uppercase;
}

.highcharts-title {
  font-weight: bold;
}

/**
 * @license Highcharts
 *
 * (c) 2009-2016 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
.highcharts-container {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  text-align: left;
  line-height: normal;
  z-index: 0;
  /* #1072 */
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  font-family: "Dosis", Arial, Helvetica, sans-serif;
  font-size: 12px;
  user-select: none;
}

.highcharts-root {
  display: block;
}

.highcharts-root text {
  stroke-width: 0;
}

.highcharts-strong {
  font-weight: bold;
}

.highcharts-emphasized {
  font-style: italic;
}

.highcharts-anchor {
  cursor: pointer;
}

.highcharts-background {
  fill: #ffffff;
}

.highcharts-plot-border, .highcharts-plot-background {
  fill: none;
}

.highcharts-label-box {
  fill: none;
}

.highcharts-button-box {
  fill: inherit;
}

.highcharts-tracker-line {
  stroke-linejoin: round;
  stroke: rgba(192, 192, 192, 0.0001);
  stroke-width: 22;
  fill: none;
}

.highcharts-tracker-area {
  fill: rgba(192, 192, 192, 0.0001);
  stroke-width: 0;
}

/* Titles */
.highcharts-title {
  fill: #000;
  font-size: 16px;
}

.highcharts-subtitle {
  fill: #666666;
}

/* Axes */
.highcharts-axis-line {
  fill: none;
  stroke: #ccd6eb;
}

.highcharts-yaxis .highcharts-axis-line {
  stroke-width: 0;
}

.highcharts-axis-title {
  fill: #666666;
}

.highcharts-axis-labels {
  fill: #666666;
  cursor: default;
  font-size: 12px;
}

.highcharts-grid-line {
  fill: none;
  stroke: #e6e6e6;
}

.highcharts-xaxis-grid .highcharts-grid-line {
  stroke-width: 1px;
}

.highcharts-tick {
  stroke: #ccd6eb;
}

.highcharts-yaxis .highcharts-tick {
  stroke-width: 0;
}

.highcharts-minor-grid-line {
  stroke: #f2f2f2;
}

.highcharts-crosshair-thin {
  stroke-width: 1px;
  stroke: #cccccc;
}

.highcharts-crosshair-category {
  stroke: #ccd6eb;
  stroke-opacity: 0.25;
}

/* Credits */
.highcharts-credits {
  cursor: pointer;
  fill: #999999;
  font-size: 0.7em;
  transition: fill 250ms, font-size 250ms;
}

.highcharts-credits:hover {
  fill: black;
  font-size: 1em;
}

/* Tooltip */
.highcharts-tooltip {
  cursor: default;
  pointer-events: none;
  white-space: nowrap;
  transition: stroke 150ms;
}

.highcharts-tooltip text {
  fill: #000;
}

.highcharts-tooltip .highcharts-header {
  font-size: 0.85em;
}

.highcharts-tooltip-box {
  stroke-width: 0px;
  fill: rgba(219, 219, 216, 0.8);
  fill-opacity: 0.85;
}

.highcharts-tooltip-box .highcharts-label-box {
  fill: rgba(219, 219, 216, 0.8);
  fill-opacity: 0.85;
}

div.highcharts-tooltip {
  filter: none;
}

.highcharts-selection-marker {
  fill: #335cad;
  fill-opacity: 0.25;
}

.highcharts-graph {
  fill: none;
  stroke-width: 2px;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.highcharts-empty-series {
  stroke-width: 1px;
  fill: none;
  stroke: #cccccc;
}

.highcharts-state-hover .highcharts-graph {
  stroke-width: 3;
}

.highcharts-point-inactive {
  opacity: 0.2;
  transition: opacity 50ms;
  /* quick in */
}

.highcharts-series-inactive {
  opacity: 0.2;
  transition: opacity 50ms;
  /* quick in */
}

.highcharts-state-hover path {
  transition: stroke-width 50ms;
  /* quick in */
}

.highcharts-state-normal path {
  transition: stroke-width 250ms;
  /* slow out */
}

/* Legend hover affects points and series */
g.highcharts-series,
.highcharts-point,
.highcharts-markers,
.highcharts-data-labels {
  transition: opacity 250ms;
}

.highcharts-legend-series-active g.highcharts-series:not(.highcharts-series-hover),
.highcharts-legend-point-active .highcharts-point:not(.highcharts-point-hover),
.highcharts-legend-series-active .highcharts-markers:not(.highcharts-series-hover),
.highcharts-legend-series-active .highcharts-data-labels:not(.highcharts-series-hover) {
  opacity: 0.2;
}

/* Series options */
/* Default colors */
.highcharts-color-0 {
  fill: #7cb5ec;
  stroke: #7cb5ec;
}

.highcharts-color-1 {
  fill: #f7a35c;
  stroke: #f7a35c;
}

.highcharts-color-2 {
  fill: #90ee7e;
  stroke: #90ee7e;
}

.highcharts-color-3 {
  fill: #7798BF;
  stroke: #7798BF;
}

.highcharts-color-4 {
  fill: #aaeeee;
  stroke: #aaeeee;
}

.highcharts-color-5 {
  fill: #ff0066;
  stroke: #ff0066;
}

.highcharts-color-6 {
  fill: #eeaaee;
  stroke: #eeaaee;
}

.highcharts-color-7 {
  fill: #55BF3B;
  stroke: #55BF3B;
}

.highcharts-color-8 {
  fill: #DF5353;
  stroke: #DF5353;
}

.highcharts-color-9 {
  fill: #7798BF;
  stroke: #7798BF;
}

.highcharts-color-10 {
  fill: #aaeeee;
  stroke: #aaeeee;
}

.highcharts-area {
  fill-opacity: 0.75;
  stroke-width: 0;
}

.highcharts-markers {
  stroke-width: 1px;
  stroke: #ffffff;
}

.highcharts-a11y-markers-hidden .highcharts-point:not(.highcharts-point-hover):not(.highcharts-a11y-marker-visible),
.highcharts-a11y-marker-hidden {
  opacity: 0;
}

.highcharts-point {
  stroke-width: 1px;
}

.highcharts-dense-data .highcharts-point {
  stroke-width: 0;
}

.highcharts-data-label {
  font-size: 0.9em;
  font-weight: bold;
}

.highcharts-data-label-box {
  fill: none;
  stroke-width: 0;
}

.highcharts-data-label text, text.highcharts-data-label {
  fill: #000;
}

.highcharts-data-label-connector {
  fill: none;
}

.highcharts-data-label-hidden {
  pointer-events: none;
}

.highcharts-halo {
  fill-opacity: 0.25;
  stroke-width: 0;
}

.highcharts-series:not(.highcharts-pie-series) .highcharts-point-select,
.highcharts-markers .highcharts-point-select {
  fill: #cccccc;
  stroke: #404048;
}

.highcharts-column-series rect.highcharts-point {
  stroke: #ffffff;
}

.highcharts-column-series .highcharts-point {
  transition: fill-opacity 250ms;
}

.highcharts-column-series .highcharts-point-hover {
  fill-opacity: 0.75;
  transition: fill-opacity 50ms;
}

.highcharts-pie-series .highcharts-point {
  stroke-linejoin: round;
  stroke: #ffffff;
}

.highcharts-pie-series .highcharts-point-hover {
  fill-opacity: 0.75;
  transition: fill-opacity 50ms;
}

.highcharts-funnel-series .highcharts-point {
  stroke-linejoin: round;
  stroke: #ffffff;
}

.highcharts-funnel-series .highcharts-point-hover {
  fill-opacity: 0.75;
  transition: fill-opacity 50ms;
}

.highcharts-funnel-series .highcharts-point-select {
  fill: inherit;
  stroke: inherit;
}

.highcharts-pyramid-series .highcharts-point {
  stroke-linejoin: round;
  stroke: #ffffff;
}

.highcharts-pyramid-series .highcharts-point-hover {
  fill-opacity: 0.75;
  transition: fill-opacity 50ms;
}

.highcharts-pyramid-series .highcharts-point-select {
  fill: inherit;
  stroke: inherit;
}

.highcharts-solidgauge-series .highcharts-point {
  stroke-width: 0;
}

.highcharts-treemap-series .highcharts-point {
  stroke-width: 1px;
  stroke: #e6e6e6;
  transition: stroke 250ms, fill 250ms, fill-opacity 250ms;
}

.highcharts-treemap-series .highcharts-point-hover {
  stroke: #999999;
  transition: stroke 25ms, fill 25ms, fill-opacity 25ms;
}

.highcharts-treemap-series .highcharts-above-level {
  display: none;
}

.highcharts-treemap-series .highcharts-internal-node {
  fill: none;
}

.highcharts-treemap-series .highcharts-internal-node-interactive {
  fill-opacity: 0.15;
  cursor: pointer;
}

.highcharts-treemap-series .highcharts-internal-node-interactive:hover {
  fill-opacity: 0.75;
}

.highcharts-vector-series .highcharts-point {
  fill: none;
  stroke-width: 2px;
}

.highcharts-windbarb-series .highcharts-point {
  fill: none;
  stroke-width: 2px;
}

.highcharts-lollipop-stem {
  stroke: #404048;
}

.highcharts-focus-border {
  fill: none;
  stroke-width: 2px;
}

.highcharts-legend-item-hidden .highcharts-focus-border {
  fill: none !important;
}

/* Legend */
.highcharts-legend-box {
  fill: none;
  stroke-width: 0;
}

.highcharts-legend-item > text {
  fill: #000;
  font-weight: bold;
  font-size: 13px;
  cursor: pointer;
  stroke-width: 0;
}

.highcharts-legend-item:hover text {
  fill: #404048;
}

.highcharts-legend-item-hidden * {
  fill: #cccccc !important;
  stroke: #cccccc !important;
  transition: fill 250ms;
}

.highcharts-legend-nav-active {
  fill: #003399;
  cursor: pointer;
}

.highcharts-legend-nav-inactive {
  fill: #cccccc;
}

circle.highcharts-legend-nav-active, circle.highcharts-legend-nav-inactive {
  /* tracker */
  fill: rgba(192, 192, 192, 0.0001);
}

.highcharts-legend-title-box {
  fill: none;
  stroke-width: 0;
}

/* Bubble legend */
.highcharts-bubble-legend-symbol {
  stroke-width: 2;
  fill-opacity: 0.5;
}

.highcharts-bubble-legend-connectors {
  stroke-width: 1;
}

.highcharts-bubble-legend-labels {
  fill: #000;
}

/* Loading */
.highcharts-loading {
  position: absolute;
  background-color: #ffffff;
  opacity: 0.5;
  text-align: center;
  z-index: 10;
  transition: opacity 250ms;
}

.highcharts-loading-hidden {
  height: 0 !important;
  opacity: 0;
  overflow: hidden;
  transition: opacity 250ms, height 250ms step-end;
}

.highcharts-loading-inner {
  font-weight: bold;
  position: relative;
  top: 45%;
}

/* Plot bands and polar pane backgrounds */
.highcharts-plot-band, .highcharts-pane {
  fill: #404048;
  fill-opacity: 0.05;
}

.highcharts-plot-line {
  fill: none;
  stroke: #999999;
  stroke-width: 1px;
}

/* Highcharts More and modules */
.highcharts-boxplot-box {
  fill: #ffffff;
}

.highcharts-boxplot-median {
  stroke-width: 2px;
}

.highcharts-bubble-series .highcharts-point {
  fill-opacity: 0.5;
}

.highcharts-errorbar-series .highcharts-point {
  stroke: #404048;
}

.highcharts-gauge-series .highcharts-data-label-box {
  stroke: #cccccc;
  stroke-width: 1px;
}

.highcharts-gauge-series .highcharts-dial {
  fill: #404048;
  stroke-width: 0;
}

.highcharts-polygon-series .highcharts-graph {
  fill: inherit;
  stroke-width: 0;
}

.highcharts-waterfall-series .highcharts-graph {
  stroke: #000;
  stroke-dasharray: 1, 3;
}

.highcharts-sankey-series .highcharts-point {
  stroke-width: 0;
}

.highcharts-sankey-series .highcharts-link {
  transition: fill 250ms, fill-opacity 250ms;
  fill-opacity: 0.5;
}

.highcharts-sankey-series .highcharts-point-hover.highcharts-link {
  transition: fill 50ms, fill-opacity 50ms;
  fill-opacity: 1;
}

.highcharts-venn-series .highcharts-point {
  fill-opacity: 0.75;
  stroke: #cccccc;
  transition: stroke 250ms, fill-opacity 250ms;
}

.highcharts-venn-series .highcharts-point-hover {
  fill-opacity: 1;
  stroke: #cccccc;
}

/* Highstock */
.highcharts-navigator-mask-outside {
  fill-opacity: 0;
}

.highcharts-navigator-mask-inside {
  fill: #6685c2;
  /* navigator.maskFill option */
  fill-opacity: 0.25;
  cursor: ew-resize;
}

.highcharts-navigator-outline {
  stroke: #cccccc;
  fill: none;
}

.highcharts-navigator-handle {
  stroke: #cccccc;
  fill: #f2f2f2;
  cursor: ew-resize;
}

.highcharts-navigator-series {
  fill: #335cad;
  stroke: #335cad;
}

.highcharts-navigator-series .highcharts-graph {
  stroke-width: 1px;
}

.highcharts-navigator-series .highcharts-area {
  fill-opacity: 0.05;
}

.highcharts-navigator-xaxis .highcharts-axis-line {
  stroke-width: 0;
}

.highcharts-navigator-xaxis .highcharts-grid-line {
  stroke-width: 1px;
  stroke: #e6e6e6;
}

.highcharts-navigator-xaxis.highcharts-axis-labels {
  fill: #999999;
}

.highcharts-navigator-yaxis .highcharts-grid-line {
  stroke-width: 0;
}

.highcharts-scrollbar-thumb {
  fill: #cccccc;
  stroke: #cccccc;
  stroke-width: 1px;
}

.highcharts-scrollbar-button {
  fill: #e6e6e6;
  stroke: #cccccc;
  stroke-width: 1px;
}

.highcharts-scrollbar-arrow {
  fill: #666666;
}

.highcharts-scrollbar-rifles {
  stroke: #666666;
  stroke-width: 1px;
}

.highcharts-scrollbar-track {
  fill: #f2f2f2;
  stroke: #f2f2f2;
  stroke-width: 1px;
}

.highcharts-button {
  fill: #f7f7f7;
  stroke: #cccccc;
  cursor: default;
  stroke-width: 1px;
  transition: fill 250ms;
}

.highcharts-button text {
  fill: #000;
}

.highcharts-button-hover {
  transition: fill 0ms;
  fill: #e6e6e6;
  stroke: #cccccc;
}

.highcharts-button-hover text {
  fill: #000;
}

.highcharts-button-pressed {
  font-weight: bold;
  fill: #e6ebf5;
  stroke: #cccccc;
}

.highcharts-button-pressed text {
  fill: #000;
  font-weight: bold;
}

.highcharts-button-disabled text {
  fill: #000;
}

.highcharts-range-selector-buttons .highcharts-button {
  stroke-width: 0px;
}

.highcharts-range-label rect {
  fill: none;
}

.highcharts-range-label text {
  fill: #666666;
}

.highcharts-range-input rect {
  fill: none;
}

.highcharts-range-input text {
  fill: #000;
}

.highcharts-range-input {
  stroke-width: 1px;
  stroke: #cccccc;
}

input.highcharts-range-selector {
  position: absolute;
  border: 0;
  width: 1px;
  /* Chrome needs a pixel to see it */
  height: 1px;
  padding: 0;
  text-align: center;
  left: -9em;
  /* #4798 */
}

.highcharts-crosshair-label text {
  fill: #ffffff;
  font-size: 1.1em;
}

.highcharts-crosshair-label .highcharts-label-box {
  fill: inherit;
}

.highcharts-candlestick-series .highcharts-point {
  stroke: #404048;
  stroke-width: 1px;
}

.highcharts-candlestick-series .highcharts-point-up {
  fill: #ffffff;
}

.highcharts-ohlc-series .highcharts-point-hover {
  stroke-width: 3px;
}

.highcharts-flags-series .highcharts-point .highcharts-label-box {
  stroke: #999999;
  fill: #ffffff;
  transition: fill 250ms;
}

.highcharts-flags-series .highcharts-point-hover .highcharts-label-box {
  stroke: #404048;
  fill: #ccd6eb;
}

.highcharts-flags-series .highcharts-point text {
  fill: #404048;
  font-size: 0.9em;
  font-weight: bold;
}

/* Highmaps */
.highcharts-map-series .highcharts-point {
  transition: fill 500ms, fill-opacity 500ms, stroke-width 250ms;
  stroke: #cccccc;
}

.highcharts-map-series .highcharts-point-hover {
  transition: fill 0ms, fill-opacity 0ms;
  fill-opacity: 0.5;
  stroke-width: 2px;
}

.highcharts-mapline-series .highcharts-point {
  fill: none;
}

.highcharts-heatmap-series .highcharts-point {
  stroke-width: 0;
}

.highcharts-map-navigation {
  font-size: 1.3em;
  font-weight: bold;
  text-align: center;
}

.highcharts-coloraxis {
  stroke-width: 0;
}

.highcharts-coloraxis-marker {
  fill: #999999;
}

.highcharts-null-point {
  fill: #f7f7f7;
}

/* 3d charts */
.highcharts-3d-frame {
  fill: transparent;
}

/* Exporting module */
.highcharts-contextbutton {
  fill: #ffffff;
  /* needed to capture hover */
  stroke: none;
  stroke-linecap: round;
}

.highcharts-contextbutton:hover {
  fill: #e6e6e6;
  stroke: #e6e6e6;
}

.highcharts-button-symbol {
  stroke: #666666;
  stroke-width: 3px;
}

.highcharts-menu {
  border: 1px solid #999999;
  background: #ffffff;
  padding: 5px 0;
  box-shadow: 3px 3px 10px #888;
}

.highcharts-menu-item {
  padding: 0.5em 1em;
  background: none;
  color: #000;
  cursor: pointer;
  transition: background 250ms, color 250ms;
}

.highcharts-menu-item:hover {
  background: #335cad;
  color: #ffffff;
}

/* Drilldown module */
.highcharts-drilldown-point {
  cursor: pointer;
}

.highcharts-drilldown-data-label text,
text.highcharts-drilldown-data-label,
.highcharts-drilldown-axis-label {
  cursor: pointer;
  fill: #003399;
  font-weight: bold;
  text-decoration: underline;
}

/* No-data module */
.highcharts-no-data text {
  font-weight: bold;
  font-size: 12px;
  fill: #666666;
}

/* Drag-panes module */
.highcharts-axis-resizer {
  cursor: ns-resize;
  stroke: black;
  stroke-width: 2px;
}

/* Bullet type series */
.highcharts-bullet-target {
  stroke-width: 0;
}

/* Lineargauge type series */
.highcharts-lineargauge-target {
  stroke-width: 1px;
  stroke: #000;
}

.highcharts-lineargauge-target-line {
  stroke-width: 1px;
  stroke: #000;
}

/* Annotations module */
.highcharts-annotation-label-box {
  stroke-width: 1px;
  stroke: #404048;
  fill: #404048;
  fill-opacity: 0.75;
}

.highcharts-annotation-label text {
  fill: #e6e6e6;
}

/* Gantt */
.highcharts-treegrid-node-collapsed, .highcharts-treegrid-node-expanded {
  cursor: pointer;
}

.highcharts-point-connecting-path {
  fill: none;
}

.highcharts-grid-axis .highcharts-tick {
  stroke-width: 1px;
}

.highcharts-grid-axis .highcharts-axis-line {
  stroke-width: 1px;
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       x+)JMU0402d040031Q�����,���K.�,����564�+�Lfإ/��ߒ�"��7�h]�2������[�j>ky�thr���5}�Z,�Z��m�d�4Y{�g��?>B{�ZSr3�0�eVrx����5����n�p4��]�M�慭�8y�|��w1�ڍҾ{�cWq��i���a�Ꝓ��H���)�� �����=s��nTi��}�H�LS��#��-X�C��?��m��M�Ғ���k/���r�kb���殏��h����맏�f��*O�/��t��4�g�Z��%M�;�d���bv�Ȅ^X!w�ݻa��e������z��>�����`�e����tQNϟ:P���)�9�.2s9�(%Z��U�Ͼu�F��.: N����)L�lr�F���=����� q���	r�*�o��.���YS������֜��Xj��e�7�0���e�k�OX�Cܣ����k�%)����J�V�w����N><��KM�}�a��}"Oa�/�L-�����3��2;�i`~yƼ���i��GQP���<��95��.���,M���8h�ׁ���/���>gt��5�W Me�                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               x]S�n�0ݧ��Iɒ�$���K����P��b�"_�G�͆],������^�O$1�O�����_o��t��~���+_�Ͽ��cܣbG���/���.R$�����tx�v���q� �R�q��3*J�D�bJ�5��5�}Ɉ����dE5��v�6�ڳ�e	�����1F��H�X�p�$�f��t`�{?���Q��P9���$�+ C=��Nb�m�1}�\������*�HA��AP�=f�vO�_U6`鹌!���SO��;6��E�A׳9��.`�m�hoP&. �.[����c��^��u�Aoب|������uC|��H�]� �[��Ǯ����IP�\C?hi*i�݅�ŭ���, ���x���zdã�.?�$h�� t/�Mqڭ����8LUlbtO���'L�2�[A�aHPq�튐
'|Ƞ/y�Ma�
ָNF�}2I�E6��sK<� 0k��� 1><ӹ70� ��6�8 �'�+�T%�B��f �2XWF�Nn� S�;�Yn³�#f��A	�,x�Il���6gC54.�(�|��l:�X���+h�����7»�����:�                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             x̽y{W��{��"H��)@)��3T���p�y���))%%H��̔A�g��w;"R)yh�9�*��ck�y�����x�����7_��?�W._��To��d09����Kcg2<�U?�'}�r�w���6���t}u��?Զ�3>Z��<��������<��L����ʹ�Ń���d�0��m�z<>��g���v���`0�vƣ�d�}2O�����A:حh�k�TO����;��t�/�7���o��a6X�n\_�v���ʍ�־Y����˫�K�j�d��9t�}��?�V��w��Z�>\���9��)sڙu����^խf�ǃ�^u4�=9Tw�ܩ:��7�T�K�mo��x<�Mۭ���U�0�����#@"8�/+�÷�j0�e8��#�x�U�:�������/-����)�U����������Q���Y�y�?��!f�Y�;�F�Yu��E��0ջ��@��wN4��;=����z6�,k��1`�X�ց����_0���9;a��6�р��cf����qx�+~9,�>��^�K��|�V�8Nݎ�Dg��Z��W�1 4Ý�@㳵/���v4����X��g[�	���ګ{4Z
�ָ3��@�u{Y0���{.���"����`2~W��G��xҭ:A����h�sr*��ֵ���z�f'�QB�[1����?U�C�EC�M�}�t	Dzџj�p=��a��`o8bsN�K���B��A�j�:ս�|����j��R���_���������}�Z�Q�Tk7�^���{��<\��g_~ų'����j�v�����'���n�r�|��Z?����!;x�38��x��d��T]�ѵ��Ƌ޳G��/{_-bN�`e4)�?�7����gRug�����͛7�Z�Uߟ�D�m�������
i�XM�'���6�n�@CF���92F�46���a}0u��?�e/���j��>��]�cX"��do����D���t�����lL����z�D���^4���҆�{�s<���0m�ě��A<׏�T��/���l��ay����p��>�vJ�^>�F���w�v������h�7zU��-��r0<�-��_
t\"&����X̿9��4{�i��;�v+$�SCe@��f�z �8y|�M�.��q��}2��j�;�&�k)��/L�N�1���WO�n���{�����{���y�;=�˃G�n�=��\ЕA~^�՝�} 򍾘U���Y����N�+��)���Sj�n�� 8[�D`2ɛ͚���=u�J�clitr�=� «JXd�3���9jk'�Y�KK1�F�|��@������r:�Uߨ	�3Ǔ_��[ݟ�f?�a�Z��q�ߦ���������Ļ]ʅ
L�~�v�s]=��6�&������B��k�f5�`KSW��ٙ���&W41kڛ���,Y�K�ƠK��j(~t��Sܙ��7��u̻L��l�C�I��?��;�w{����h����p�[Ų�{ǰ����&���/���*���t6�46�f�[�;�So��ժ:��_�F�v'��.Dz�w��O�n3����?z�|)�j��I�n�Uv�d5�ۄ��'Ҽ��+}NRw�ݥO�V��VSm�m������b���V�]�`�h�;�x���Lh9�Xw��}tR����?FD�hW�'���B���|�� �g�t08B�����C���]Dq�L4�Ag�8Y(f�t��v�"��"Qw0<jI|i)$rM���O��5�ٵ� ��B�O|{�mc&� �O�7'S�M �L_#�O�U��`t��v��~�I��V�WtHO�E�V]�.��R�S`F�Ƥ�������5zo��QO�/\��5�� [�D;�����=�'��2<���5˄x���pמݩV�ܚn�<~�������__�8����p�29�)~Ɔ����<��;'n��ZkO����.�g��z�Ң`_�1b��<T����:��1b赟�7���%�^]׷���ɤ�^Q��L�	�3R��� �+��P���P��Q�s ��)M��4�W��ؕ��`��&F���.-��5f�:2v��ҍi�:�D�����&:_�ě�^o�j��i�b�B	�Q��Cg��Yhg�vuA�۴y_��{�I�+7��k�+agB@�Y�%5%B���>������$�, 2��>6�Y�e� ��'��X�ߢ�X��F���h0�G�h�G
���t�AL\������1#���Uu%0���j�-����<7Q°({��:0���X�Q�]b��?
��FmS!�i��<����Ӄ��A���EkPc�8*�u�?����e��t�6;NYڵ�#�R	q)�k[h���5�[��F�y��5?�%��ӜN1)���'�&q��t��.4T`�-���W���h̹�@�
�=�ڈ�]]VWM�s�UC��$�7��7��;4Ai~��{J�����&j`�
]c^g��@n�Ig�(���#F�Z�j�|y�q`$����5ř��ĸ�����xW*5�ޥ��7|-�Z7NX��x�n��2�G��%����g��f�lTkT��֬}�ӂ��P�������O�6i~9��j�f`����Q�@�T����!#��`�2�ӝ��rw08��^�8�������w�QM�rۡ]j�Esrm�e���u��"Y����q�hl���7�챞��쾜���Umzk�;8��3E�:P����E�����Kw�t����ey�R�Bk�N̚tVl���m`��2m�d��o�c�/�瞔;�s%8s?̥��C�M����os#�++7Ⱦ�����{���U�cG��8ٕK�\�r�I�n�Ó�T���(\h��X.�����?V����^8����&�ĳW_������V��1������%#�@�I}I&�@S�������n:.��[*r6��u+3�|�/}������TbIo����ɛ���g~�����2L���8�[��p�Bߺ|��u���f�.�� m a$�:���±�u��~�,�Y>-�9ʄ��Ws�HO����W��ȕ�^����[b�/�Yu�P�<Ӗa�s#�_l���E9�ڸ�
Z��k4�L1��g����6"� ��cl{D�u��3Qc�UsǇ�"H��{a����]I):=1ϙ�ܢDWL�����5/4%_^m'a���������p��zF:&�Ӹ�Z=��z59¸Y�WbFy�Z�z��G�f����wJBX)���S�c<�ӟ���4��T�tj1ٴ�^M������{%F��Gp�;�o�[(�x/�F���fi^�`�3l}��2���#�P@.bO�
�i:c��gF�|��㪃1��)��\���,�ʘ���/�_�:�c�!v�>l�8r��l^�\��`@��}�6Ɉi��-�����g�03cbe�>T`wb$Ja��*�i�g�`�3���P���7���)8<J�M��@;�2�/Ϳ���)��'��FnZO�cN��JI��$����sǵ��q�џh8�>"�r�M����n����/�b4^9�m�2N�c3$S2C��VO�-P���?Chn0]�z��W|%d�0���������;�>
��=�V��`�a� �CS<��S��-j���G7��9�o���\:Ӑ���:QT0lqFE!�~@O�l f�\�1�m~h�5I*��1��Uj�w�����ap>߆�����~7ގ���Pop:*��O�*���P��煎=9�[X���3w��B�H �fc�����ZN�#��Dc�!�m��451հ��J�e<c
GsF�	����w[�R��|ge�@�7-�37��?ύIvay6�5'�#�Ƒ�ß���܂L�tQ�����M�Hf+-�ٮEm0t0#1�L��ތ��Nc�'�7ݟs:����j/E|��s�~�°_G^Y05Ƶ��wQ��xr�z��z6>"!e-6�/d�*؂��?m-�S�˰z�i�ٶ3��������8���5�F� ޲��������b����}^��i�W��M�7|`��f���[�{���f4�	�ڻܔ}���:�IW�2�e�N5k�(�����e��FE�6_�5��
G���Ȏ�Ie�S]��R��U>�I$�v�)|�m�i��)�̆$�vc)Ǟ�1��7$	��"��E�#��)��4�|��4ܹD�[�[0�����₽'�zB�f����w0�����C�
�x;�}�}R>�1<�q`�����A^�hz���vȻ)m�l��<�2D�㏶A����a�5�Z�3�$�s�E��i'��069h�%���/2���$���	�t�؋����-�a)�.�Z mڔ>}����4��d�����c��������/�����aca��*�L:���_|�u�D�H���|:�?���+g^�}�HA��)RΒJS#A2&Q�C<[3��I�o��2TV�آ���������p*�|��N�ϲU����ц���I��a��d�F�E��k&�Q�vׂ�>+,�b||���P(�<�Q���ˢH/��݈�3K�"'�t�\X�g���J�d��Y�'�,���ì͕����U��z�U'5��B�\���+yB?�1s���5]v�/ti��|����Nyhk��n8��j�82@v�)9	R�ɲ������QD"0�l�|���Fz�G���+7�o�OܬbJʿ��,�tN�׮�6avg�Y<1��(���=��Oy�K�B�/��2�:��#d�G�Ӑif.��k�\���5���Zn1&�N�q���}ԦP�#A���kG}�Dyz�]m�܍���2��]�[t�wr��/Mh,���;dT\V�q��`c�ڀ��H�>��Bޒһ�Fi�]�'���g�Jש��J�r�l�o=G:љ\RO��=�
�\������M�
S�����������F�J"��xx��<߂�&G�Q���w�Q���O�	x��DA�D0�,�� ��T�/<�@��x�W��|��]���TYo<�l��������31�j��U�a��<4�{�GHI+S42|x;�����g����g����JB'�K��"���.���C�$`�`w8����
��7w��G�K`�&�����f���{@�K-�X�~N2��/�f��U���2�f	�־��ؤ|�(*Ė/!�Z�د�Gw��O�=��E$f�Z�^MQ>+Ń?�Jj���c��y/�O,���gZ��~�d�H�c�+$U�^Y��Ӈ3��{�R���-��{�>M�}��O��gC�p�b���V~�*����&;l�TL4c���a~&f!9&�F�ʩ����+A>0����CD�M
SlZه�)����YY�݉��0�c"e��щ�������>�1� ���������b2>�~$�f0�ޮݏ������p�����G�lx|8��:2�ނӇ��`I����|���[��!�8� 3�#;��N��w�{����fO����՝���O�#���;@���Wvi��Y+���z����lkk��5���{�C.��}cm�Ջ�{����L�\a�+C�8��ۿ�Y�t�o�G�ֻ��7ں����믗��%�$�M�M�Y_ci�wv0�2"*m���6�sG[��ճ�,y��4�[�P�s�ڔ��N��������l^�������;ˋ?���2HHWb	l����f���k�Úo��IN��_����ѭ��������+�_|��̿����V���/\��Ε�-G����dwl]_��M��7�WcT%t5Wc]���W�		00=*��������!l�~T�#��-�Ӎ�X�U�8��(r�6M@I�[�t?��?����Uh�k=������ ����R��c�_:����fO����QZV�hջ�Cw����-)�a���Υ��`
6 ��!9���F�������
�9�s(��(R1�P�7���4��#�=Cm�0��:x %�3��ٺ�`1��G!�O��y-��=`������� ��֌�q��ٮ��M�>�	��
�m���ݫ��{�^ǂ��̳���Oόsg�캂��/ �+�um���f'ȹ$��Bk�2��!�x�N~n�	OJ+�|�<y�Y���g��Cw�����g>a/�������dA���W^�n�s�ի�g>`��K��/6����¶M�1��=���r׻&����Q�dG����_�W�;ʳ���#����&��f,�!s��xwؼ�(\�nm�^Y��R�֣�<�Do|{�]�uT�a�K*�0��.�x��\~�}���6>����CԱ��0��4�4��*���9/8wfV�����. tL�c^�0p��l~���)q����g}C����@pjʒQ>v���c\�{���Ol���_b��0Ul0���Ote��j�Q� B�����f����C1F�0;b����]{�Ӣ��/�Ӈ�W�>lM�lm��w�����C2R9�1(x��%1~�@*�3v��?Fz��e�ɝ�A�6�Ϻ�R�����;��,��Հ��6i��6a|9�+.qа��ߪ��Z�Ec��7���K��gk������ڵ�?�ݞ{���wu�c��)d[�6���t���Y��>�46S�\����N^�v�?�����37|�&��=��ŕ�xh5o���_�}<y�'4��Cj4�\�SC�d����`ԥ��_��h3S��~���k,��9g�RZ[�K�#���O_�s�'��'e��� ��/�>��\6�u��kyU�?�:Ҷp��*�>�2�G�p3�s�?�p����~d���^�~�G���|��?��H�et��WB��}C7�4��)��IoFR�t�nߌ$~���g�&t�5>�Ca��

Mh�@���,���������O+����y�2�f�C���'tii��I��;�
��!L˝0�X�c�?^�U�~��L���*C=�^>z�����>z��z��/�?x��sKn��6���u����:6ه���c$qc,XܨEC���WHd���c0��СPtYG8B8�S�ux��by ���΁��%?��"�ːWgkKT�+�)���ͯ�k4�b9zڭ־��*�yɿA{%�	e�D2é;�����<i�G��J�'�4=H-�I����+@�W�A����s@%�4�k�4}��u�N�W�&:�'�ᨄ���{d�����ַ��I���+�dt8��z�q��[�<g�>��8���$��}Pt�.+�iy�+#�/gI/{1���8�@pd.l��~:����ay���[KK*\vd��G�#�#���R�����
@{N��P�q#�^���f�An��K:���]][b��;�����wʏ����D�
�L���:x�[�L�6K^��os��&�� I�{aw�6��y�'F�.�p�9���A��g*�*�t���{�gM���3�<�]����zo=S�5?�6����V��� ��p|�ȳ'�n��G�Er���iS�8n}��x��̄݈���xl�U�|�WT�c��5CH��IN����&i�@1�M�^[:��{�'��'-V5ly�tuK�E�b�A����D��Q�R����0e�Z���?�9��F��D�
/S��P�C�V����:��.{� #���NƉ=�T�b&{�\B��2=�1?�ǻW�+/׫[�6e6т�"�����a�N��ި�(d`(m�����^ra��� �����r܂Q��K�.sS�5���֙'k(a
+�հ�,����%&3j��;�lS@�t����W���P��J$X �dfƁjO���Z�����e�48��JsG1���NݹS'�fW���v��i��$��'�tQ@��6=�#���%��=_L t~���]��o�j��FRw�()���0O��U�s���)V�&�vʌE�|G�Ƥ[���JuA:�e�9��NM�0��<[�Â��8v��N��k�()����vN�_��	I���T:5�X6B�A��������hL�k��k�f��D��J�?��������u�P��nӫԆ�ʑ��"�~�$c��72��<�1lq�}����h�2jdEΑ^��TӚ=�t~l氜���8^���Y����2�~t�
��6�)j�.$���b<��_��`Rq�PX�������Mhts[c21�y�&Z�X�n[�Q��"J�ҟZ���㷤V�����~����}�I�u�'g}�%��Ҧ��t�5�ބt��3t�#[/�>������]�+_q��2�̀�X.���ڻ��Qj��{�38.��>+/����l����c�ϥ\� T����7�dL��ٮ{���%u��z���Z|�q:u�e�k���)R�i�9�Kl2	dH����:s���X�g0�yB�Xb�Ff�;y�΂��$j�"�LHf��J �1���1��ڹ�Y�;�7�eH��Ǐ�[��8�R��n�]��d�����9�[�ց�ك�I�E'Փ�R#g�;�P�y.u�n4�h�Rjп���U�����"I[C�+�Kޚ����A���sA��[��\(��Zs!�S`F�5��4���ʳ�@i�
���\=f]�k�@)�.t�x���pe�fJK��B�U�3�
'	j(����Kg��Z�e󷵷q8�~�@P��j��U|���
�q��ݢ�����@12Q�g�E4j���<�j�$��[�5l�n��/b޾��qқ�G�j�_$�+��m�zd�[
'�$�[~�*��{Q@��%M7*͡f���;\��5�+(�q�VOe{B���ؠ�x�����"��؂fC�^���,�"���M���Q~\o�?"	O�����ǟV���5D��q��Oar������*����౸�
{�iYctOR�,�Y(~�kI +�߿�.�oar�1e�P0a�MT��R}A����j�,������8�^*�k� �K�Z����ݖ�xA�+uS����k���϶ၫ�J�6��|Ÿ����R;�C���h~�ϒ�����N@A!�.�Z�D�Ǩp��724�f4�Pn��|WD�Zv�#�S�ou�_�W���*vMb
ش5��ý�J�EQ�I`�֨��;��j���?y�C� �X����}*��練�r���GՇ�q�2Y!��9�=����I~BuؑB��I��D�[LtoԜeH_�q��0%G)pϝ�
o��^V��$�M�g34������'g.2崋窽u�b:�Ev��'���]���D�{ۙdr��s��a�ρ8���)�	e��Xi'v)�7����6�W�K���
��[�� �L��>��?�=<�t��U���
�l��:�d�ҙѳ�j���0�<���l�B�V��_�<���_T/�����;1<�}���T���;��9�+����A2R���S>����!��fE )fo��v���l��ǎ���b(��=���g����o֯�r�� �����@9�rjD.���H���'���@�����	��t۞&��t�Z6�3:��.%R��aErxo�������~���i�w�d���l� �d�
�T{`��RS��crN_�I�X��G����>�L��M�'���e���n��f���KuC������oS-���0Zc�6�	�m��i�x�1|��'ۧZ�������wO1��2�ް��|%�)��-��->ضԎ�}�F�4�Ԕ�Ҝ��	5y�874��)b�i`�[���'�j{?�_Z����㸪�ȶ֘S��
i��[�"&��b���ʼ1���$�@�}i�	J�A��V���k��[���g֍�]?�iw�I�'Bc}0쮮g���4�L�'�1v�^��(<B����8�b��E��0�H0�.�AFU�k�,��q���aJGp<4�f~�����ʠ�������p\f��B50�Kl���,���L�g�I��2C�4�Օ��D���n�� O��/����QW<�9;J���)}%\����\��!m�u� ���5�.v�XR_^%KIɗ8��䮘DF0���
��mQ�ZXj�b JI�Ġ�D�(�W�ί�O�Ov:���"B������B����U��+Q�ePQ�l�?ap/�4?ٖV���1n�MM�����\|�cI��Ћw�����U��׉�(�M��d�Uu@7 �ǎc�}`����P&�cn��\���L���i�K~f_K���k��T�~m-��F��0�>L�-�����cGEH9TaS:�oi�iαѫ6�|�O�������-�[��l����{�Y�����F�	�ؕ�s�WBa��Ɛr�^.c�O5̙|f{1ޜ���\P~;t��J^y���Xpx�lkd3�6K������}��)\��/�e�_��=T1�_�=dH�P<�pm
���/C�����^YAX}0:Q��<1�V;�k�0�VɵD����n�QpW��-F���֚O��E���&��g���D���N��X~����ќ\�A����T�L���gS+H�]��"I�"���)��T�Y�< �HΓ�Bʯԭȟ�}w� z�M(I�=��A�����?4{�װC�o)�ga����o�+��5,<���V��lО%dbj��f��Vs_N�M������I���Ul<V�0>���f��A�����J�=��\��R0@���q��,�b����ݺ�'}������=�wp̺�������l��X4I��n|���Z��Ϥ�V{�I*��{��l�k�a���t��1���I;�E���sfoD{�9�u�N�Ϙ9�b�4�K���i�|y'<d���ݪ����V�����hM������B*�M*<mx� ��.��>Fph�G+�r��<��0(�;Mֽ�B��+���)�9jLQ��/�g��?��'���<��8�N�EFJES�H�jl���/��ys�ݺ�#��(������&�$���r�7&
�����^�d4-��c� Fi&ט��	��|m��
j��`�PX,ݙL*��$�cU��ˏl��e�=}�6i�zn��,�xȨ����g�E+�Fk�8҂��^����a*(�~X#�Q�1#1V�*�6z��u̭c篭�=���[f/ۙK�y�L�K�>�\&��uҕ�"���gY�UMa��xS�@��s�b�4�G��s(I �l�x�iռwA���\���?g~`>��v��W�cy#;��T�=$2��fvӶ�����ʤ{���}(ɿ����оEv<�4�2R9�-L�����A�(�����[7u,фR+���Uf�#D��Z������H��Fĺ������.�.���v�TY�O���H�8~��G�c
��[su �8�J��et*/g`��n�"�;Z�]c$+
c�Y0��%3�����ޣ���ڳ�����%0�E��Z ��!&N"�\��t |�QuJ �ʤ���Lq1�->EO�l�'����,
I�k���(5WQ���5�;��y��܀(%��e�6��픶��,}r��╒1ם.�_x�φ��P��z�F�R�
�������ǢY�������$���lX&B��Ђ��B��M�(�	�*?;��5ݒ�Ą��Y�!�I���7�=ʚ'�/ ����nE�a�4J�� Jc'�vB�1��8p"��'n�BO�;܁��U5I���V�B��ߖ��Z�ᥔ�hlċ6�h�+ω�F��g99�ln�bH��J�:�5��g�PH2�Q��r�ϓ��������Ѷ'GY��:�+���Z���,/
g����L��sv=a�2�L���g��V��h�L�e��>��f�/�_1������ԋǄܹ��ABR�y�"JhB��-�R�-���]��f�\���`�U�$օޙ���.ڍ�Cۡ����̪3;�L��Y`i{�%�OQ��]e���ac a���)t��~�9�A붃#��	����hʮ84��M]K�O�^��k�u[�@�WL)�]�5d�.�NYSCg�$�$���:���E�������=��!�Ĭ�����C�&�Cm*<uǡ��c��7�H�6!����E�Ksv��,n �����4�����Q�ގ���\��߾�s��m��O�!a���+#vW��Nx����s���b�&��y�%Xr��ֺ����;�]��y*έ�I/ܒ��S�S��m��0f��!P��0O����_=S�Ol��p�T���~6�0FVW���9�$ɲ��fG���c������?��=�*��8wt�B������˕�Î��Eb����x�Ղ,^��?�^���h��Uﺟ�\��b�(�z�w̃1|}��&��nD��z�0�z�Q�6�����X��4-�,�#�sP��.S([��?���Z��;\́yԿX̃�u������Jw��s�$P�U_����j���t�+a�O7T�4��q��8��^v�)�CE6�0~����~ُ\��'�n�Z1+�f�匟�j�=��~FC�����w׭����ͻ7��	R���p���sN]��-�x����\��kx6��ۑg�@3U�x}�zϗ\�g���{��@H���i�o�9C�s����e�1��`�E�ɫF���q�H�'O5f�Ѹ���O{~��W����W���l���E����e�ڱ=q�sM�y~X��{�mz�4uG�=R���)R�S���K�W�|�>f�^�!i}�]jZ����j.�q����Α��g
��L�V&���j��`*S
hQp��2�4m���b�P�r��5
}[@�N�4A�RM�1n��v���"-f�O���o���efp��17n~�c���[d��pC���{���u�+�f��_ܽ�ڿ�C��Թ�n�E-WT?��n1��[�;_|���S��S/o��C~���6�n�n�o�h D��v���u4yF�EU�(��:a	a5vS��͟�(jR}n_�=��--;R�ԝ��Z��~�
�vt+�_������&7�h�;�w&��xo�Wx�VN��^>�tu8X=8���n~�m�?=~�Y�?)I�w�-�L;{����O �u'��":Y���Z�녵�(���y[U�
ѷ`#�Qnj��+���1çC,R���R/��N$!�������ng3�﷬圲���mV�."�^���u9�}���KŃ/�U�=|巿�]��i�|#~*� �^���}k�a�nᢨ19��/�9�(��޾�鄛������V��ؐ`+��)� �dO(�g5��LI����V_>z���F��=�~��-j��Xщ��!��b�%~	,WY�O\W���������`��Z~�-��S߷�[�5�m,\�p�e��C�V��O�v�����k7���+K���>Qx�R?;TǓ�0#�y6*�[O~�9?$� ~yR��V#�J��5��}ֻ��T/PE�d�@�Aj$��X�g�`%w����r��׭�λW/d�Y�V�R-J�Yu��؀h��JQ�ș��'�D �Qq�j�k96V��#	^�Z�����+���	�͈�e:���d��"�`��i*v��j�a ���ӇY��X���@���G�F��U��X+GF�#�R�>��Pph1�T�;���U��`;�R�����]�k��R��gk(<u��~�L֩smm�B愐1_u�H�����hȦ��7�B0�k�!C��yL��ث�{ ��S�2Y�i|�B�8V����^ʴ�!���M*�vF�c��m�RL��G��2��}�:Pf�'C!L��@�^��}S�9�%HA�q{�\���ݺrm�}P��rҹֻ�������6"欽3Ef�"�����|����|f����lr4�����=�ν&��G'�����`��H�C�j�	�Q��3��1(,ô��X�y<�x�[F{i�5��<�Wt�C!������J�ě5���^yP>�Y�}D�j0���>9�P&�����/��9�,e4	=�e��"{��6����)x%A�[%��r 7j���퐳EYo�1K?���¾�M�?��+���e.�LW���?�<��+g�!M�-��\�?3}wA���V��e��G�ۿ{������v����Q����[�&��^e�e��`�_e\ߗ�D�&&x޴\0rt�}e��,��X��� �Rg���w��T>{E7��ct��j��n$x�Fjt�l@C./w��+���Cya��M{/�n�(�zGYK��`��c��2;�� 5�Y
r�+c��E.���� �s*-��g��.a�"��m�75 h�.���p��S�&	�&rc٫άn��a�WX4��mY�O�S��!>h%���"��T4���`��n�H��wL��s�_�3�vZ�'��;�|�i�~�t�_D�LD�n�e�.��&hp��
�E�hglE�S,���F���SF���W3!����fnGm֜��jN)u������U�����=@�3e��dB6���K���ӹ��3�X�>M�9:�����G>O��h�Mȴ�8��|8/@���`����Խ�"UhF�����8��Yu,1 Q����X�R� 
��9-�	�cfm]�(9n�w�M��b`���KЏ�|��|w�YB�Fㄧ��L�9�����όg�
#��>E��l���k'c�ڑ'2�e�<�2ٟ�Q�"_)��,z#DJ]Sp�0��T_"d�~MMИ��b���=	�^7t�{<Qب����$��Qc\�D�-������1Q�o�x{p�q�"���/���_��3���)SO���%�юD v��re4WvY��8��mv������r�b{��|����c���������]f����^���)f��-��]3>l��]�d@>o��;S�x⇘�:N�m^\Y�oE��X�pj�����"��7РP_��ǕSV��ι�������o�i{qOӿ��6�8�>c܆�ɒc_rح"z,Me�r��c+u$X�O�MT>-Pz:�}�9�8�֢�8!s�,v�%�.��F�V�@�8i�q����I���^A��60��?�9�3�j�q<�?�H��;�y~G.�	�'���ʒ�h�B�w�|Q�Őn�� c]�a��l�����C)�й$��!��
�Ƨ�wJ����� ������%X�.������ߧc���Ѓ��(�T���L���|��17�X�%���k�7��,}���AɊ�d�nV���g�4S/ ��u�|������֖��� �i���i�� �u�@���/ �!��;*��%5�-�����b�	�fK[6/�ָ/�滁�٪!��}|�(G�ʄ������{%V^k�޳�X�҃Zj[O�%v�a���D�N�V-eL��ѬMW�I[�rV� �a�Ef����X)�Q
f~0��-$_���x���4Z�u����[N���Sk%9��������đ�;^�J��j7��\�CӍL��0��H�1)Tkʏ/��؞�Ph9h�U�����®FB;L���FAo�Ā�i8l��cJ�]���K��iD崠�7�R���;�z�O�(��/I���(3�i��R/�7����:ϴz�\M5�A
he�(���{O����q��k7I셀+�T��X��Q,��g�
y�G�8$ B��Rr�(d�o+��iGӸ����&Ze?�G��>��������S�J��:�4Q���X/Ny�2X:/�>t� �R(Έ֡��y��'�ʸPQoW.'V�sC*Gs���#�7�c��1h﹄:�kFD��{�qd�?F�Y�W�rd�����P�
g7v��:TSA�N��_Z��]��a� �Rk�9�p�N�
ibA�b��:<����g�ۯ25��	�����(�兩���`f��ܮ��^����ڼBN ��c��E<�J�@��}lR���lFɚ�,0��8��gTDd�R����B�1�_��0��: ܙ�8�>��O�;��]���?���J\�}�z���6��WXGL���?�S(3)�xhP�5٤���4V����T-uӛ�'M�?>�X���G���W�����*�[���e�2!>�p�`�L�K�u񟿋Yږ_�'�� ���[}Iq����=�H������͡�L���d5�B�ʞ�
���a�6�������u�i�Y�:�#�s��l���dy�Di�M��2�&�H�`xc�/?k���ۅ��r$�]�0�%z�Ԏ:�xd>ɭZą��kk_�ܴ�W�|� h����y�#���^�m�4|����U�P)u��;M1��w���	�guW�w6�;��ר�V�|~4�6�_���3{�etK���ښ���ce�|�d	���,}����*�ɉe��4�eU�M�EM;�G��� �3��Vw�P��5��$��gkTB]��BB��r��x�:A]/So�B�c
Yhh=���u�e=ѡ���|���������z��W�ض�[����w� ��i���|;�-q�؆��#�x������.�#�<�=f73֌���c�p���j�9����ɡ�F��Q�Q،wt�y=��a���Qڶpݤ���������k���-������m�3��R+��VioA��>�j��	��l^Ѯ�KŮ��E�_���N�R_Ty�������
�_�x�q��k����� �zK�i���đ��n H�s7[ګ�H���R_����od�U�R�{u__V�Gʓ�T��(\���ً.��B�+\�i#|��j��F�ګ����Aݡ=��|r:������c�DV�{�������;�֟r5��_0�l�ؒ��m4��w��vWv���+�R��S��O�XJm^�s���R��3�Ę�o���� �T���H3T����7?��{��LmP�C8tS���,4����t�NEo��F�z���U�|��}rV�v�&��q'���F0k�H?�Ҥ/��j3�-?e����P:���Hφ����g�
b�FEȒ�މoK������7�	>�&��Le>��oDH)�T�k\p�S�=�,�� ed'�5���>��J�?�x=�~-
痷�\�ٹ�
�����Nϒ7�`��.&��͜�������cˌ!DҸF�QYq\��܎�B�����J˛p����WtAe�0���	T]�������X��5��>UYZ03<)���9NC�8R�8D��B�d�|��g�뾳GR5)p��9�2�]
e��J�Z!����+i+����*Ѐ[5Y��l���9�_7XT|�"/��zH����cl�-8��2�ǹ"_氖�G��]ByХ����G<*��v�I9�y�J��B��M�F;FIM�R�Hz�3�^q1妑�w,q�ٯ��w�$rR����uHsM�󀓚k�!�'�4SR\I6�ďƦ��t� Z��2��mm�����o�95����1�� =�C�:������g���D��o�#�����P��d���ɶvCu��3dWݵ� �zf��xV��t��y(�1��M��޶�O9ե���ȗ�wؙ�3Kz�Ay߬f��oB2]h��M����Q�����Yt3}�̎�7��F�PwG��!�d]8�ҭ�{�Q��@%�p��0�Y�t%�0`���$�f~k�oCg��a�w����rJ�(���2�������nʌ���^��'k����f������G���z�k�����~���`�\�M�h���ˑMq�ʍ�m���TG��������ϟ�G#1��d��j�њ�U;n����DV��� )�pmv%��lQ�����I��)�<��6��_N�뫶8qJ�fn��x��OT��vE~a�Ng�t����hi6�!g��Nr���h�R mrj}�`�F��(WM��[��+ݑ�#��[Ԝ�t��B8�\�x�
"��y��rr�Z��(�2���]!dș3c�0na����t�?��BI8nT�9�T�_����@���Wun!����h{|�|t3��C̏���`~�+���w��d���d��� 0ϧb�+�#D�	�S�]�~|�6~�������s0�Q�_�����+|%�����Pm�&q�I�Q����	`\�����b��v�iО}Q>p�f#�u��c�5���<��	���Qm�{~�n���.�a��>!"#J)Q�PE%��T��c�z4<c��D�.qԅ	��ނ�m�Z�c�OPd-|��i����\ǀ���g��FΗ&�jU�Shf4l�Ԯ�%�
U�Uv��W3�����p��I6,��n5'��V?�F8F���v��Q0�!vC��-�+�a����W��5pw�)��)[��h灲ϩ��� �s��	M��5	̗g\J��Wͷ>�\ݾe)�9&oR�\�����f:�p�J1�4W���?XY���P�V���n�DI�'�&�&�#.u/j77y�.�A�'n�`�.�^*[�_�ll���W��w�;��2��y��Z��SnHd���ٍF�؜V��Dòg|?�u{7�����ի�n�kFտ�\�0��1�խ�F.V-묉�2��G���H<�t�]�x|ܭ��8��:�nU��TF+C�p�A.���Ɠ��g����<�X�W��\b��:ڒT�/�a��9ڼ�ܳϚ�m.��݄j[<�V��Q���j51y?mՊN��l�S[i�3�4��Wi|���)�Ѹ1��\��T�ܛ�N濋�=TC�� �V�%����(=/C*�>�R�G���T%~�	�ù|����X�W.L)�z�o��t)�̫������^Xi�,����c���m�'���9K��������uuS-��~�=
�g���L�)�{`�J q�U��G�ݡ�$z�2\���cS�3���	�gv� ���<�A6��B���cM�1P�-6}�7�[[�ȉs��^.�?�����S�PHDxSGuw���{{��*���6o�vNw��EBI��s�r�L����֔k%l������8�F%rΞ��ӻ�4ó+hz#�Q[��i��4�bN0K]�`;�������Rh���(Q��Ϛ���	�b2�����q��Q9�����l��;��w᳠x4$f�{"�k��������e+�Ůx@Z�3	+����U;/�C�b���h��nmS�yQŃ�5_��]�:ڎ!Q�4r�X���yp��6Q3b�`2�����C�y��Ε+���_�*?�Q�IXᛧ��$��o>}1�r$|��g�WFK��=ӠM�Wp䨁�N'̆�ט}�P�e�e����� o�ί�a��,�3p�t�vƫE0��;f5�I=O(}��v�s{I��=�9��.^p9I��p�}�<���"�U�iwMjY��$��d)`������i�ǎo5��� � �NS��y�-#����,V�5$�ς�}��^���s�tc�����F@e
�}�-��Zcx���G�,P��X�U\T����Cʚ��U�,0\�����4x�+.kv%��)���/���~x��∢oJ�Q@�TA��B+2����9]�I�mفԨwclG�O�f¨\(Y2�Q:��C�9;|~�-AS �M'?FMS�U�s!��؋����Z$NF��3L,�C0h��P��~�d�yPo���Ğ*�%5�)�wv��9:��b�7�Y��sж�q3e.T�{�T�կZW!��o[g��lz�NHIOf�d��Il��J��L%',1 퐐�'w?G�r���5�����q+���J侸�.G�n^�D\��ZD+��N+I�%��Y�e�[
5��A��[���p��4����s�s(��<��pN;����Q/�u%�V���:P�4����X|#Db���y�ט�/�-���@��i��r�E$��]bs�`z�Z?����;ɝ}�kZ�=3S�L���ȴ��8��:Q>�e	�G�1)�8� ��~l��'�I!���m�Y���4߰�K����+�l����l���P\�`�<(����e����S�Vj��i����M��A53G����K���L
�:��_S=�ъ> �3ڟG�F�I������Gҍ��gM�nn\���7Ε�����������"��0�6�e��X������B�h�3���t"�%l��Ν�ph��V�2Ϋ��E�]hg�d���=iG�a�F_�@t��X�\�b��A��n���&�n_���x<2b�����`w�Աٺ��G;�c���iFP����\/��ɜA��V��^4 �VxI�`��mI���=�� �`�tp�p�گ f��#)�6jLþ���ͨ��=�#m�]5��������i��>�;�ϭH�Y�jh�բ��״�ǜ��VgʻLs*��R,j�^������_�����l���Vd�N2#���2m�í&*a��nyuө&F�����;��璹`6� �5�����ɨz��q��y-��H�c.r(�Y-��F�B���J[
��
*	�dl⛅��0�qxİc�%�k�E=���\\c�:��"(�Wj�9���Sd�[������
���Ia+MhZ/9
��i�n<y��Q���pno(Us��Tg��s�R���z%7��P�Ieв`h�81>a5|/Z��=�9p�a�3��Z�Fb[>�+ �JU�^�S��S����W7��v�K��^}��,7�:Aq��p��+J;�+d'�y�]��z��w��X����َ���Oa����mCT[��+�hU��K�^N5*A^Yir�����UD������Ŭ��֤��ۈ�����]{�;�-��j|t��aov^�j��9XukT,ѐ� �v0��q&��5��4�	�>��Ť��Q4������xt�Ԍ�.$�ȩ�~l�괂S�nM�~�Ą�M�WpC,�����H(�����D�,��p���7����T���FST!�Ao���`
���l)�0��D��:�,ښ�f'�n.[TS�Ek��7���f�=L Nc�z�ĎQ���R�$�+��B�Caf*�zq;�17������q���1�zX�S2���ᡜ_Hq	�V�X�ɼ���D_�1�f���O�:�.\��jȎ����;�܎��3y�u�X�~���l��&������%���|�����'�ˆ���[�U��+y�K�u'�ߏ��-���&ޥ0mb��B8��沃��"3��)�ݜ$�GҺ������$QCt���P�!y����~�2������w�+�Ԕ�'P��������_���y [hk:М���g�C9�?]jM�[L��hR޷�M�˯���-t�sA�QzZ��Ģ46�~Tڡ�x]J��x�k�*/u�Fя ����i.�;ߥ�C޷G��w�(OIjo<��4���U��sr�"?ç�'R�;'p����}������� �E-	�2���elg����A���cr�zF�`��Be�I��[Y6��z;l���3KQ�'V`�gn�xO���)�6v��U�VL�oE�/l�~�����sz�HS�������M�nF����1���1��E�N�8B����3���R'�C|��V�T2�0^hZ��"�A��� C<�䍖[����1[Ck���E׽�O=�g�.�D|Zl����9o�ΞiPW*��!�U '����L�Vh�$��/�C��WC���˂�-���L@L$��t�LŴP؛QgĈ�}��l�j����2N���첅���6�8%�VGw.���˧J�ܗ�I�@�{�F;�W �&�3�9Is�Aߦ��ZIo�
���a��C�ĩn~���F����n���,2/�'�7����M��bV�7���c)v�`>��q$f ��S�E�.�dBP�9w��[6���i�)6yp�-���.��$��a��%
�r砱�]�r*�a�ൿ�`�:����^�TV�B���JJ|��в�$m=I2N��A�Iש����`�}�����=WX%��[N�Z�7z�ZZ�[��B�z���*{6=
�-l���˿���My�g��(�ޝo�BF�,�k��%��[�CG%��S��/�)Ҳ1�P�a"� ُ�W���XWN9����9�`��~�Sz��]��p9�fn���,�d����xf�j�3�'Ⴕ˕�[/, ����O���v����D.)픅0Ͽ�|��(K�d��'����~��{�8�cQA^Y�y����8�nIO5�b,%�y3���6����޽��08g�n��I��6�#����~�rB�.y�G'����ڛ�ҟ柵O�����I	^���F�$�TO�����u���Z)����365��q���t���
����8L�-�N�:}���s6J7I�O��4vG�G�����_��1�[�&Mͨ,����$d�l�Bh'37tbE�9�e���q��+�`�02H7���q"K��
���(��5;��L^����f����,�)䔜�h�Z�[C��sh���;�v�I�(�x�Z1�<C=������r�ة��V�^=���W�rm]|R3�n�3O�f�KL�]�7���lCI���ڥ���a������g0
k���s�f���Ds��9̄6,��lɤ� ���HS�)"C7�&�~*+u�W�ռ셅�S*�6MU�l�P~��c����ړ�;��Sy�N�Џu X�%��Z��@*X�c�6ˤ�9���5�J�8��s؜ޢ��d�����ɂ�;�U���~�+���>b}�l��{4���� .;$���y�I>�FC�`p������\}i��3{�7���r�l�ܢ���M�K���քʐ�>���Z�7�֯�umMu�h-l�0�2PyrZ����7hz��t	?��^��,���2��(�LT�t���
����N�5�J�-��5>�F�(�{�t�䈳W`��|B��_���j�=�� m$�̚��P��i� $�`��ĕu2_�œ�n1�Fp�2Mk%�YMOG;�Ԏ����G�������ס��r"+��	�5;�՛07�|e��P<�ɛ��?'�]�t�Z��C�:�kh�Ēl��Ɖ{eV���'L�1 )����5/����Wz��R��r�[��ѱ�`�hO�� 4����.��4 P°���f��O-��n��"�%w	���ў�� ,�ex<�	yL���+E*����4 ��"Ɵ�
�a�wL2��1r���o��~�c�$��A�mv�&jt�[���(����͂r=��8Z��L�j��d/��qV�=¨���>b�'�� I�!B2iiŵ{F�H[4�N����	�,40�43�'OFg�	�C̘ޡ���I��!r湯/��	�3,��+�$�%/�]5��`�� ��%���-�J����6�N�Zu6T6�ф�b��r+H��.86ĺ�%�4OI���'g[T-̾Uj9)*z�n]/R�?���'����Gn6�B����v��S�����v��3I>�|��А4�R��&ڤ�|�X'�5D�M:��LZ?j0d]S�� �HvdH�����Z,<���*�U!�ox5�^��Q��*���j������3�T�4�<����b"��D��(4>w����A� �ɨ�+�4-�z�L�p�_�Fu��%V�9��4�`7X|��S��kǠyJM"�A��T�Yw2�P���%a�.m=<���C�9��^�� ��JjL}�W��=�6��A*1�k��J�x�����Wn�@^D��.�KQz��5���pg8k|5��͂#�#�*��1��n�Q�x�	&���0)s��Ԍ��9]�v��j�5��@���K�(g��Cʬ&��N��� �as��tf���,, ��7al2u��E�m����?6j!��y��������|B9Mۋ��ǾdY�,���	3�W�:�I���Ҙ��X����0�R�s���57@���rCG�v�-:��sMi��4vr{�e�ш��%!��81�̙����SE���[>y�WM� C�&��,�+NY� �/|��HH�4M���?/G6�K/o��)��]H�L Y�K�:���*��K�ͩ����JK�dM��;k���G����3��Mוz��X``��R�N�����e˷�<cm�n�9�ȏq 7捧i}W�)1����y�RT��!xW-��@����hL��Z�`��Z6�{�F����<eW�]�H)�#��A\��!�dL��J̤��J�W�.G���*���rġ��?IEҌ� {�o��U�P��(gFEO��t�Ob��i��n�4�����co��8+�r�xް'�3��2,��O�t��2�aa��z=e ���4�F�mH_�8���ƚ��\��N�x�=�z�q,��b�ۧƨ/S��&(Ax���+eP�\�s-9s>��h\K
� �e�rS��QO|?����;rO}�}��)�� 6=W�;ף�`q�^�js�@pY���0f�=f!�8F,�!�|d(���M�R�k���~�
���E���2�V��'��,�4V�F��iewq\�+��)����[����`��T�"����D�����8�N�~����zЛ�)�G�!����b>��Ҋ����]׳H��<y���#�P��0\��Ub�7$��������T2o	D�:�������[��J�{�Q+7�h�8幉cK��î�)��.>\�nS"�B�w�k�1/��,��*CSz=)D��a`4�*}�Ċ�ik컄��/O1�����
c��ܵk**�Ǽ�� t��쵆�XZ�ކi��M\..�bN34�XV&�n"Hko=�6E��&D�ьs%G�	h����%%H-]��?� ���4r�҈��I���ڪ��I5���zuǪ��T�ĝ$6��۲a !�
5�$B�%��*ըD#�J��`�����-�&^B%͡	#'�++e!�D?Xn>h(��W"i�*1y��>ٰ�����6c}e=u5�E[�{`;����:��}^6��������>�W�,R�U�p�2dȲ��n.�z��gZ* ; p�pׁh��!I`~�|A��ʄr�4��-��Ϟ�����K���c�
�+�t�R�%�5����7�][�;q>xP�OFy���pWI)��?�����鄶�V[�*����(sf2ݔ�肀���M�0�撮�ఙ�rtAxPY�xW�\�>�t�Φ�,��4(��J%E�����9�"�J�C�U�;�U�^�mkS�[��ޞ�Pˬڐ?.����8W�WtXY�&c[J�� g����K�@�<V��_����e� D0�W�T=�p��B�w�?�2���px�k3ja��̐��Lc��K,G�+K=����-�k\��M�b���Q�2�q�d0�ڥ��7�F*.ĩ��6Ee7%���Z��-[-æ��L����"o xD��ݐO�3����cN7X�gk�e`��Hƨ�ץ��	~x_���i�g�)�gG3p�8#w�i'��gHQT1u"l���sh�޴�M��M�z�&�P 
d�'�&RP=�e�n-�۸6�~�`P�1���l<{�p�-*��ukb�A�CskJ����By[@pFWtm�hՑ(����z���4�\����
(����dq�n��Zd�x��4M�V���"�'��D�G��v:�ʪS�,������\3�f�U��*�r�Ὀ��".�kP���&O!4h�q��~_KyҐh��vc�jEFWtX����]lۙ�����a��[�1�Ͱ�%�5*5M{{$��m����CH�j��q,B$���Ή6�Յ�_R ��-1�;á� /�Z�V�$u�����Lx�3ؠ�7��h�<`�Q|�D�~GT�6�֬���f =�����Y�.\����=��Y���k�VϠj�$(t�f�|׺MV���?>�}��߯d�V��.�ww�R��ݜ�(/@�D����Q�ᑣ倫�g���Tm|�蝸�k����*��#���U�i	�5�(�'��PT�^��g$�\��J'��S��R��N�$�E~�`r��~ :Ǵ��J�(��H��zu���"�i�_��i���YnVbKAB���<�+�
�	u�H)�9RQ"Uf�:�������o���i���fW-���b6 �CE���򥆵�2T��R��~9�=!��ļ2�d0Pp�15)��]�f`���ٓ�0��iG3�uz���]2Y��z�f�l��2}�P��X07�� �VrK]��we�d��z��V��joN)F�'e�ق�o�8)����a�=A�#�KvfN#%+Y�d��=��@��co�/QNŵR�
62*�p��_v�br
�`��������"��"�ˡs��=*(5�+k��[���Kn�ɨ����q�-"�{2�?�����ڽP$]�/m�&�1v�|�;l�V�@`~ޱ�V�pi�4�Y�M�dC�P�h�����2u��p>N���9|�k�e[�#�J��Ř6ip�DT����� j��߰�
�,�:٢�S�ZI�V�1φ��!�xMt2]��:�y�KĀca6N�ݡ\B�VI���YA���! 7���R������Oĳ�/L�L

��LLseM�5ֳ�O�W���s��Bp6�q�nF�!9a����b!>Mz!InQ2����4��B�ZoZ`��
�����0<�[�^�b����P�N�$�JN .e����W���%�	?�ʨ>
��Y#�10�h��a(]u����N�����Gع���&�����ea�� ����|�z�2^o���c��L� zi��y�)w�$��ِ�-r���oiG�e��m�R����I����!��86,�u)�w���ޛ�p�W�x��+~��9��ڗ+7��je<���4����k�R�����J�џ�ŴL{�ZwfO�o��-�|�2e����wnI!�B��9
Vi�3��5.e������g����M����=fU}ݻ޻�K��U�{/���/��7����`&CB~8U~!,�\/#�+V�޲B��%jg��$�Pyw2kR&�ňVs=�P:Pb�������)w�0%C�&E���i� >�"��P+=�=������.�f�����i+J���5M`=yD� ک�����R��8˩ʙa@�ŧb�Z��֔��G��Q�h�3O�{3Mpu0Z9���uN�_�������Ʒ�������q�ן�����\�Z�U��?�J�v�Ri�;_|���۫�����hZ���᜺�K�v�M`~�N��������#��Z~<H�|7�խi��e(D5���Ou��ٯ�����.�<��X�%��S"I�P~�<�gĹa��/�܎��y3�.�C�����3'P��,Г����2���^X��Uۃ6�A��UǇU�r[O����W~t-)�]^�a�o��߶?HWd�����:U![˄��	�߶7��W�RRo�4��1AM;��k��C.��5�(�j�W]�QЋ<�����������Q���T~�Z�ܽE�_]���m;���H�TOhcl�m�&�>�z�`�w�i]5���M�t����LQQ��/]z��'�����f�x���g&��)��.e�Ʊ$�nv��Ug�c��>�
�wٲ���}4�g�pu��e�� �WXE�1DB݅=)�Р�J���?)M\��HͲ4�笛?����2Ou<UdЙ�Z�aZ�w�JD���[*���ÌP�"�e�	9��.ÅB����������׵'��P�L�r��P��&K'�ju�6�8t&�*�+":��3�!��V�&�Z���n�]5��|9��	aY5/ �����2u�%�Sբ���P�N|�4o�C��5s��_C�\��Mb�M�l��T��S6K�D�s'��6��c����9���X�Z��vw����כ?m�n]����������dk������f����{w���o�v�����W��#�Ot#�4r3E����+�J�n�Bm��C��չ�pB�	��]�
�bg��$�NC���qx^�u#����N�>�S��iN(A�ZIϗ/�a#((���TA2m�"a�mH�-��/9-՝������O��~�&����d�?=��q�HR�:|�Jt �Z�G;pgl=����M��"�(:�P.�8�Q����U0>J�����ǅ���eh骐"�
%~8:6���w4�3��պţ$�� X�T�f�%3�e���`[�-���Ȯ9�T_��.̲�U��VXA��-�	����J����#%V���v(Jc�I���ۺ�P@h�X�*LY뤑�w8UzD�(n|��:5r��l�f�-`C��V>�<�A�K���)��q�8��h!y�o�'��I\
;o�E2�o�Q��;E��N��01%�(��O��OEĜ5{�|�)BK�L�e^um���J���
��қ+�s�@���Ma�$�4f����7J��	)k�M�������0�=r�]�����N���sE���g!�1�8��4
��g�G_\0�a���(��嘵�&.�g�m��J�
V�ـ\ �
��t4P
'>�cٵ�9�`�X��+�ϻ��u�'q~�����]�f�2��:�#� �]ٯy7�����a����R,������~Mh���%a����ɫ�ζ��\j�>^�c��2�~���j�����_QJ�RH�,�l,.b4����mI��ZvE�7>G�b"�:Y0�]�2O���]|�8�iڸ��3�ߐ8�n���wkg���� !�8O\�`�2T��n}uc�K'�0���Jڗ�oa������S�Nw��5��E�㻼C>���x�*���̓�w�>r�m�'T�����ͭw[}����Ow__��Y�+��.��	J���$+�u�g1���`ɂ�#�����.,��п�����ѷϻ�Q�b��o������~"�q��z����w��\gd��Ig:�&�Ͼ8�%�i��(:�(�h�l�&	P����U�+�o�]�N-�9��u�^:+�3���,>��s
�7L���un��j�2� �U�v���3ͳE�o�����'��Z�T8|��f�+���Z��a�^X�'�@�(]F$֯m<؃�Î"�Tј��5#v����'5�f�d�&oLG��?UN�V��u�Ӳy�ɚ�
xj�#E@���X> ,r�6q0Z*a�t��M@՘�1����`��#1�?�޽=�#I���B�ƒ���o��L����춅T��F%h����rU�����Ϝ��A�Z�2##㞑�}��S��:\\z��`�j�"�X��5o�3LV�P_�2
	B����L����4;��VC�?C�J�"�3����9��<�d���
���+���|c��|�ɔ�i�c��M��>̍�H�0l�}�d篃�f���w�g7Z�:Ԕ0���H�h�T�����bk}�8U����rR��7Ć��bi��0N[�4�P��<��o�3�v5b�1M�{R��Tݒ�rvI��W������`�Z{x®h���IZ�Q�C<<��z4C���j���4�h,�俰R�O��o$��h�~pj��xp�,Ñ�y�D ���w1Vs9UmM�Gj� �����������dc'�RK�L��y�)��Da��?�%����Q���{4_5D�&>�|��g����X8c����hm#��-}�(�;ʥ��@ΊѓD=<��#S	�ຳ$�ψ0#RD���<�z�_3��u�-s5^�V�W�x��/s�5J���0�`IN��gI��l�ju�A�����м`���M�eNbtn�VN[Ͽ���9�L	�:�#;�ʂB��~������?�&z\!���l��Q&D)
�Y).�T�9xb�?���,[��)?IB�i+��RF�nH��H���tT'>�;�1����_2��,1�9>v�ypD4�\�lU�BC[��襞a���˛X��l3�0+瓖��lcf�$�mB�3Q��}8�6��B� �������m�q���DY�_O��C`tx�3��_7��Uh��#)���i\-��B������I���v��a�� �c�sC!����kE�2��$�)h�ژ)C#�v�a������?v��,`�c�H��A�@
Z2�=iGo��K�h�3��w;�; R4�9�s�s��1pSU��*q��Y���p�+	�i'Sr�ɺ�1�@?�l@@h�W��:a�"R��vU�/K�'"����2���Zb1����I���Q �����ȟ��Є����~�����W'-�����UE�r�yJEL����2���v����#��e�U'�gvb�/�0����l�>,z?}<Ģ��%��;M�:���i2	4���e��\�|������87�V���[�]r;��Pӄ2E����ΰ�-�z9kr����9Jk�Y��b˛��=;��<��h�'3m�2�k�}XX,z��c���/�<'�^BqLAh�[��F^�k;�� �YB2�Y�'T�@ۿ(q�����֠Q�g�Ҕ�P�N!�!�r ��U��=w�&aMѷ
 �W!�z���1",T�gnPΦ��B��.��W��(.W���JA����w^��u>��UC�޺�z�t�j�)�zИ� l+$��k�	GYx�[�$c�������x���M�����ȑ0u�?2 ���~GJ�u�#	6�Q��Y4@n{��/��H�d�����k@(��/@L�(��G�E7v�jϩ���ff׉���Yx���^��gK���ԯ�Z��>]����ܤa�L#��,Ch�t#4�ߥ��?���@��;����+��ݘ�a[D�F��/���y��k�ZQ?q�����6�qK����s��`���u�6]o���}E?܄��� e��9!k3��'$<�yVm�3�������֏� ���<�+
�~�Fߘܽé"�W}n	����������*�}��1d�N>����~�w� W2�%���#��D��K5�L�9(�=Ju��@t5�~�����򵗫�Q���NJ�Ĉ�X�Wb$1��)��j�NE��ȱè:7,�m��4!���b�Z�z����ֲk�S)ɽ(�.���W�����z�z��;�ғ���c�cj�#C��ɻ���dK����-���m	��箎�@(���#Yyv��|�)%n��y=7x=�ќ]ẳ&@�5F�UbK�;��c9/���r�W<��R%����I6S�{U��T�8��x�B��k��J���/��v���8p��Y�d��X����8�4o2�w	�7�k���qE�.�&\6L��sBC�Ud��.��>5�S�8�^�)����m#�����yp�g��〤�X�蘺�z�0���Nz�d4�����N�ޒ�с�ɵ�A0v�+(�����#v����0	~��_�	0�r���&x��^����Δb���G�w�\�:���,;z���p� ƣ�jḒ�ʏ��[5c�ږ6H�Ϲ'._��Ǥd��%���W�>��;�-���[�������aiA]Udm@{N7���J�v�#ine���������9a�K1���N��n�2����R�U$C���L�������)����{�
�^5�X�VYx|q�����WP;��X38�wת/gDs�9��Xi�'Z:���a _v�Ԏ4^A[�Ậ��P>��ә���17�1s����
v�'P>F_r�*?�V2�8_6��|�4��h�[0��d�Xy�����:��l��3��V�Uװq�����VB��G��?��#�U[I��r �B2xV�%`45���)��sG3͎���|�ݫ(j	ʳ.P�ى���ԙt@Pp}�rHW�<�`�i0�:~� ��$j`������f�1xZK����'���B�8.��J#���sn5��4�;�h,bj`��v���(6)G���Z��|�G��	�6_���!$�]2w���pN�	"�}0�h������-�`S"Gt`���F��)	r���&�Ϊ��"�#\����sTFY!3��������GqEW������HA�υT6YRD��vЖ��r�>�Ȋ_�|b˿foȇ�$N�ūj�Ͷ��C�E��n�#@�s��� ��!W� �ղt2-��_��;�@;�ʂ�`4E�\s��h�	���?�G��!w�ȬC��,���˧�xi��f�a\�0�g�b��#�bM,��e�p�_���Qo�ؒ����b�t4�$��%�>��t�OT�W�3
���ǩ1����$k�0�A��'�FE�貎��I�y
�8&�I�/Ԓr�ߨ�*��)�n5�}��%�(&�	ȝ�c.��'&E�IT�N��ҦB0��B'�F��;Jd�w�{W%ւ$WJ%��>�>�s�"�I���u~��t1ױF^����.�Ə�ju�j^o��t]asm���MK:�wV6���v����rf�����ˬ�=�%:�?2�慻�&Eh&���ڀ6~�0��y� �����;�9cK�����
tGݧ�I�q
M�{j�J�l���qF[W5آP�_������2�����'ќZ��o��O�U�
ź���
��x_����f���%��~
�e���ܴg޶b!��-�m�CX	�c(ȠVY�!W��C��K��p���h��?FBwꦣ��q��YK�����|d�
��ݩ�>|�b��JDb��Q��gmW
\21*X�CD��D����ǅ��
���'ysq�q�m{R��j!��&_�-,�"��^<Ze��./K����N�ymS��v�B��Lw��EPD�`���ֲ5�M����i��p��h7FZ1�f$Fn �sI�J.�Z<_A=� �I~pQ��aF�ySΓL������~�
�	�z�ճa��5�j�R%t��R��J6��j�i��+^��]��\Z�ډYF��b�X�����Uo�z�o��1i!�B�	3"���v�Ƭ4�a�dL8���:�����"���]V�E���.��h�v��:y�B������SC�uzSS����!L�=p��|��I� ��Bb�ۇ���{��x;]a�d'.�p9�S�[-��MV�t7H���$���$��|���K��SN��O~	$g�_4��;���w�=�Ϣ�*U?�?th�5��������ӝ~H#̏T��d��P�s��Ʊ{��
�S�.m�"C%�6'!�	�5�!�<���,w��BA@"�u{!{�ĳ@��脩���̦ހ#�ՃB�~��8�!%�k-�\e�riS���&�I;^۳��װ����L�C�y9��� ���\p�p�Y@��@4ׁ�������\��Ęi�� ��~��7�����,�0�)������^�?��£�dF�~��#��Ӣ����1��)���3��w�Y�'��{��η�G���E^'���r��K?ߺyٙ��>�y1��Xa�犜.������>=�"Æ�V��� 6w��&��h	%éDDdv�o�t���ן��� 8���1�� �?Y�h�lL��)o�^�;�W��$��B�p+B�y�R��Yq6�J���V ٷ�F�ߍtsP#�1���հ�d�Pm�J֣�މ]C�)QqJ`�����9�gY�7��*u�:���B�#/�i���v5��L�Lٶ�C�Д#xJ��@�ve�1Hu�5����s~ϥ�b���]Dȟ��C�����..�v��d�!$_Vw�͂�?^9�B;�Ji���*��1%��{Ǥ��R��L1&c`c��[K�,�n)᫨�Vխ:*(��Ԙ�'�LJ}W�����!�SJ�A���ݑ
���>�� k沵n��m-򳜌I�n��C��-�ud�x��ۢ"���b������{��[z��Vo��e���l2	p�O�\~�MM��1���m� ����ǖe0`�I�z�+�Ec��RR0�u��m��_�
or!M{��E���� �9A8�g���)a��V]�e�q��`5z(��zi�لZ�NBox@A��qI�����	���W��9�٬(�̑�� ��G]��ۗT��3xTq��2r�x#B�i�K�GŰRe��,6�ڧ6V=�V��Z���Q&Ǭ�����,���
VGm�Fk����1��
�j��.����@�#yjj�4\�a�����������G�t�U���u17:���<A}Bn�Y+z#�����/�H3��`��^�d��M��&\m�o?����h�I�`0�v�VN{�Ȏ
ۡue��V��g	��D�\��>׉�H�O��, ��1i�N?>�+�G��IQ�w�N�7�O6O�n�����8��k����F�T��$������ܵ�<����ƻ����?T����ֿ�X?:8s0^�%�C��2�\I����a�V1�Xh[&��q�e�vo�Ȅ�G �WG�_;�w>ڏe����P��D�_��(�}G�h�����#{�~���kVw>���:���� 1��v����ڿ?���K���Obџl��O8���6Mu9���"��#����:��@T���齅|SEl��i���gdP�fU���/���Zh�;�?�Yc#��J��7�QX�a{T]W3Tt����k�A���7����;�D;)�`s��r���/�)ͧ������<в�,�#��}0�m�pj�JL�nC����5���_g����g$&DB_)#�l�!	U �}|t�s8ȴ����kj�{����Ԅz�m��?q�π�.~-|�B���=	�OF�oX���=�#.�y�h�$��?z���k)�Q�E~�TЪe�K�tPh�T%�S�̵߫[*l���WZ�v�Q�$&:�c��\o��m�s'�6�<d[�y:%�l�������	~-i��|'*��v&&�k�+I��0�_Rfoj.��z)F���b���lP>/�c@��y��Ӕ�U����	a�i�Ό�rA�$po��"b�n�_�(�_Q��/��^��s���gI����2�X���G�9�0�9�Mb;?�zF��) |7� x~�$S����g�W��_�9�!��Ό!v^!�0c*�˜Y��L�>c�o�I�.�,~;��"����di�^ͪ���?Z��Ejn,��
&����'��9��� 1���Uo+�_���_���^���zP����~p���O���.[��R��v��~$x)
��G�S��u��sL�Ǒ�b��T6T�g�ڭ���!�������3Y2)��"k��(Ĩ�H8d{���!�r��4�n���W��G�y���
�n�M>��wh訂�v
2s�����l��eӉ�"��4Sb#�Њ�֨]D�!z>O o���R�J�[w8��`�ɜ3��2R�Ң��ڤ�}!/�t�dao莜�N�w�;�_jw�z��� ,Ff��k�S%��;�� ���/VL���	��������ν�,Φ=�&�bx�\��W��ܚE�����J[���jv��V�]V��{V�T4�{���v�^)���t'�r���&Ē�4J^�M-M��%⥃ùU{��^5�Ɔ@�OTD�n ����"ۢ���NU��u䌱��s��`U��L�� t����E�Pd+���Vm���E8i����BT�B����*���6qܢ���vm�wb�?��	�Vj��C^�R���و�����_2N�d��W7�Pc�:���������bc�Ɩm�o3���Fh��xN�����+���Cm�U/��j����V7YH�=;�b�BI�*�&&T}�@�j���s����UXǡ�@Y��u�40�窷mA�^6�)>�W
7�.V���8��Q��\�kbn��}*JȰ�ҥ�6"������+:hF��}�xN;:���u\ٲ�S@`">��)�y�YCaس�ô�O
ζ]��n���b�!Ma�E�ߋ�����mZ�`�^����v����	�_��Hu3�(��k��U��Ѝ\8-�r���[K:?J��3ɧ�ma�I��&Ƴd�E�I��'���epLO�cX7M�we��_}�H �:)v��I�-
X.����xX��ێ@��h��\愇` ڮ'��&=��L�w��w�`%H}]g%�U������کɌ�Y�>dOP��9�(n㫭zP������޾��%K��&�ejIN<+U��Z_8;��"��!����rEڠ�h�|i�Q*+��R3�&[��,+O?���Xۑ���zq}�A��	����-)�/��Ϋ�xaMZfX�A���õif�}`�ʡ�8%���\t&o��9�o�ޫ�A�� %Q=.T�>�#z�s�jgJưH�^�K�yk
&���P���T�pᬂ��bS��).�E&�d}gosB���W�\�Ib�����wQ*�y�{V+���姑o��5$��x+]Ui�3_�p;<���:�c"�C�Ka�^�S�ڂf�W�_�n��WcTJ$4f�:,`����I�0�<���S�s��>B�������.41�6`�J��9n����cI��U���6����4P�dr���o&.����|J�qX�HZD o��ͨ�؉ʀHQ���������򞎣��'��z�/�?�@޳�ڄ|������-L�W�.{���_Q$�b&�k����؜zЯ��02�<yzD�A�M��܊G~+J��M?V� ��q#�]-�.� T�!��M#��R9�'�6�BY?�UiX�	۳(7&k�JD? ~��O�R�i�4�Hg��E�>	|��#��Bp��4	�=v���F�J�E�(s�|�=�7J���o��� ��DE�E$�����􊒮�N�����wR^�wJ;�r�6�7.<M��������|v@"Y=:��fנ�)i���m�؆s��9���&��ᠠ�!�Zƛ�<��0�G�~I�-�C��Bzα|�̟��U��vE(����lr_���6���%Wu��Z����K A�e���0w$����2(8�Z O\����>������:�l��&L'o���D���;�~oL|L�����5lw���8��a��%�|*�����f��ԩ�8[[����r�BKE=�a'�T$@1(�Q��X��k�QiH�^$&F�R���(FeUM�wu`,����=-L�H��v��+�D��aT�su���+`?��E�	��bR�r�O�m�� ���:�u�D�8u|��[��&TU�T�x`7N�]J��r(vek$��h�8,PTzŞ�RY&;:�̙�8`0��h�~��@���wT�@`+���m���h����ÝRr��|��E?C�9����rn������?�����,�j` �!Y������H��J����i�3������ݽC�,W��<u^~}��C��sg��������M�J���^�Lڨ����c�x_9�a��"/euC�������ar�uW�܉*]X����װ�<@N+zン2��M���,���#_�̡a�v�Tw�sF,���E�LZi���rK4��UtW�X��
z�+I��E�F� `M�k�FEݝ(H���(V�Z1�*:��BQ�.ff�*��0,�=�O��,"�|/N�g�%�v�XTMJ�5Q�O���k@ל��Ыv�3�Yq̱���ߎ��Ǹi:郝�2�������Sَ�'Z�c��ң�i�:�j�~�1}B���id���@J����7iיo}��JDڕ=Ő��N��U"U"_�K��.�;5����~952�i`_���i�;iq� T�� ��2-L?rN��:>z�7{?+:hίP:��*��}�X�υN�%m��L���ro)Z^u����h���:�K�IB�I�% D2n�F,0��G�8�E�m�@Zq���UW��s}��d�+K˴��y!�!�Z	�<�}�0�6*o�*�NM�)��/�/���3�o�M��6��s�-Г�Q��G_~M�Y���	�L�p��e�⠚���gI�p[�E#����Z�>o�!ō����5��F��� �/�
Q���s��u�i���I	}�E�O��pO��Ĳ���'�j�_8�w7�o��F\zik?��6&�*w��-ԭ�?���^�@�y-���L�Zc�2p&Dg�P��W�+q�鷸�'���Y/'� �Ïl� )�$�rF\0��bg:�(���Tܤ��Q���k*��Z}Y�W����@�]؆й��6'�	c����k�$H�[���hz�%ș��9�ޑ�ݻ� �c�VT��&�Oo��N/���bry�Ѐy�J�9d�����[����板����W~����w^���ַ�6�����ֹ��=����$���?tݑ���w�%���|4�06�!ƎY�#�&F=�<Q�ͳٮ�/�����e�?	�MQ����z7�G��'|�t�@�qh�f#�^�$a:ėi�Ob���`� $喰�^Ɔ��C;���b�r+I:ԝ�m�X0}�#�h/�PL�;h���B���$�����$]<"\E����c@��&?�~�]9�&����2`^c�ndp�R�",=�n�n9���0�pR0�R�afb�kpdi��=8�o�p�{�(�@m��C���<�"�([��Z�>�4B�
��E��
�W�vl��<ă8q(�tꐽ�"��7�?�������3Dn��,���$M�JzP�gjVrz��j,��Y�P�_��_�*�M��&���f({v`��k�A7��t��>D8vTĿ�-̛+��	C̑%n���B7bM�#GA�"�?v;FH�":Q�����A1fŋ�E�Q��/����R�&���h�Q���y�pP
�.��^��@#��ۋZ�<�O>H���$,�᭣�PLIj�o<z�!c��֒��P���'��ꅺ\���j�Аe�bZ*%�=aY$�	�ɊeGF�(�3X�6�V�c޸�kW��ą]ɵ�e
(���I��'ӓd�����������&�����B������\\��&��������m�J�� \�YH�6:xP{�d�� O�|y�,�Đ�88��uGG|���	�N�
0 Wϙ��,��`�������F�?B̠-Ӭ��4�1U��U]�K�1����+p|�5�w1茔:&2p�Ĝ��<H���N�S�7�O�:&ֆӃyA��_�6��pf[Zb�������{�Cq��М[s!���z���Y����^o� �מ!C�3l$[f�d�k�k4M���wO�����(��ⲍ��~)-*H���^�G����ܰ1�ܵ�u�������gI�74��È���*�1��Jf��MhA��t���F�.�U�!K� �jmB�خ��W%��i֐I	�F�6�ʙ>`"\4o��d�E��>�����b���&��s<�'Fv�U���#��`K�>1��hۚҮF������EK��� TK@E�T���f5�MO�%��2��Glɩ��?nPKu���� p���8�G�W�^�p��@�AK����=&_vU���Ə�!� �
��;�����\�[�B�F]cRĳId6���Z�i\�b�>H���n�O��0%~|�]�w|���g��|N}��j9� ��ʹg��_؊���?4��+�iæ��Jb%1����C�h	��<:��Վ���=����:ު?�f\��c�����v?����]y��WP��FbEfW��<=8{aO�o�7���c���<GH�5���2hp�n�XK�=)MV[=%^���_��|�mb�8Q��A\ޏ�w�Pt���61.�խ�rnDd=yBbo���j)��殮;&���b���C�p�{+|�hv�(����懛�p� �����a0LB�D�����xt�^�UH�lG�f��I�&������ޫD�򞼀'SUQ�͟h�����	s��0���(��Q��72�1���!�N֌A�����ǯH�8�Q
�N��B��[�ܑg�����_ߘܖ���^�=�1����@{���w��49_�> =]v��b݌�!����>���ϝ����z2����8�����?;&��v`���Ϫ?���v��;oDL��bU�v��_�E�o}�ϗ�?���-�N|��6�:5xs����Q�8�x2��7#Z�qekrW�!*[!�
[.4�N�Bk?3�/5W�y�uD�-�?>�G�RV�����wyQX��DX�����˞9���yۉq�)$�(Dt�����W�g��c�,?O��G�����BV�%#�����UQ��3����X}P���=������s@�Z��؛��0���ݵ�����]?��^���A��qҤ�lq�6d-|%�9�:�!/[)wAJ�x���Rn��_�/ڿ��^h9�˧Пǀ��CDI�~X!�u�p�3�\�_�B
"���h�f���\\_����^�e��q��%R�8�.i$�c�����h5ds�=k��{I��j`
i�ɼ�`���RAufxR�L���]��ZQ����^� �Y�z�뿠H�Bh���[��a׼:D���c�oأ}��� �d�BHE�7bq|YS����-��	:��&1���&�6�`�����Ӕ�z(,��q%8ZDT)U�!!m�_�h��tʼ �GY���;����p�&9�Q4d(���1���؂p�ikj��T���@|%I�md�,���e�i����T��}iyIfm��K���+��{N�qR�x}�g�
�E�%[�V�WHhDT�D�\��LO{�`�4�R����4���5mx� ��tXk�oqI��3t��>|�R~`�y�"(FJ@R�V���3%S���T�����=�i4o�9��2��<{�@�t���.�э��M��4H~���"3[����і���%�}�֟���C���*�xLa�񤈸��/��JԀ+;G@/xQ�����yfܠ$x��Ѵ����\ǲ��%�t�:$���k+:������RƬ��"����`$����I#M�Z�����a+�"'�I���h^�e[C������k3gb���\;VB��O�l�ZDt�#cH�*;��V�ݒd!f����$��|Z�8�x�i�(�i����B�Q��h��,�W�Ȃ�侫�G��O��o��������p���	�3��.cc�jOz_�|��v;��"C(=�������9#0�����s���}�3�f�<o|���$�+l:,���S'�в�O�0R�:x�+�&����8�&������r1ŶT+���������;�V:�s0���y¡-�Ն��l}�+}ޜX�FK��C���
1Tɜ�Y�Q��W�b-�F&��k�[0�T������%�rm)^��Z3��+������CX�����ʕ%_tW!ذ&~@k��t4�?�f;?C<@�)���5#Z�x�I�;��bt��X�s���-	��(-�'�3�[�x�#s�¨�{��V�:k�\�c��U�䁍��J���Jx���	�G)�+`��#'���t�;����k����ͼ�ʏUVC6_v��[��E�md���1<i��`-Q~��>�͸R:����ȡ�{�)ȯ'�0�c�ic�9b[�S)Ӄf���찚43`y��CO�>b5_�i&ZNi_STݶ��Yp|��d^����GSt}v�}��&'@�|�R�[=Z,��v{�ϒ��cm&8, �.�L`p@-q����ڨӌ�z�)7tt�~F�f�8֔&+�/;�)���,�.D�6[|PZ�M��i<~��qL]IB����������m�&6��q�Hd�t�J�H�b�H���8d9�*1»���B���R��3�X઩=.f�S���^�?��)=�d������<+�d��+h:둤^�����>�\����e(dt;��NK���I����w���V�P`�ԏ�iI-�6�k�y)��h�[�C�%$���+t�S���A��OUk�7�1gF�eC����ӵ���U�s�1C`�k�-�$`,w�I{�u�Tk皚��.ޕ�=��w����1�򆰽��T)����I���p����������I����j���̔����EO2�R´jiO_L*Su�~��4%a��K�r�j�,,j�^$RN�d���4�Ҥ�Pb�v��yo�AL�@�G~��z�/Y��rZ�YV>Yg�;�c�(ڝ��u �~o�#���3������K)�ڨٮlG��bG$Ҳ	�f@
I�b��t[Bg�|BG��I�$Ci]��)�o�C�~-A�1H>uU"E8i0	�e�ࢃc�%���龼��g���~���7_^�~�2<����/���%J�oΏθ�������r��7ݿ�;���Ɨ����'//�+��a@�%g\��o]��`m�qCW�Z�>wKP{��X-�޴~����C��e�G��RM�l�����#�ev���<ώ�2z6���`	���TTU�f�'��͸#���VD�(9�H�eq8#8#\o��s�ʜ�->Q Ա�0M��]FI���>g���ɱc�^P�!vc�^�j����ĥ�SAo�t��H�u��=��9�bwEI�t�n �� ��w��wT����ߖ'x�6�)[�N�4a��D
0D�:1霥y�$�g����N���6��)��J�0m�M���v�~8'�Z�̛����'S��ɸ#$q�]��ĕ��Ȍ�gHI���t^�e��1#E"%�88JQ���CX�N y1?���2��#�E A�7w� �<%��enHy���R�*������s�wtxWӪz�� �������]� w�ɫ^�0�9�j97~{W^������B�gd�|BY5Ouw����#�P��9s�P��.�Y�C�:t�4�����э��F��=��6�.,֫�}�k�L���q�V򠱚8p�j�,E�(ԭ#��T��JQ�؝��z��!�9I\y��a8�+��-�p��
�/gU�eNF�	��������3����Q�N+A�{�m��
0 ���,L�rM�j��*ah���կ=-u�� �=�D<<��Z���<�����dV��CΠnUO\u��7��jE���Mq䙤
��\���7Kj�\��K��~
�>8Q�H(���N$�1��T�A��1�<٦Pv'�R����ٌUï�0��D��czB�J��S*Zl�V��t�d�R���F!W�C�=��#䢜�����ɵ-��A���"5P�.Y���L���$���yq��1��y_�)���_'ڥ��
����)�&�GE7H���~�FǉS�Ξ�Tmռ���^����X	ǥ�[���@�$�Od"s��+�ޢB�'�UP}$��T]r���6��iL�I5F�7����57�7̜�X�Q�A.�]�^I5T����w�*�AL�%�pQP�]Ð��~��D΅z�e���cBR'��R�C��O�/���	[Q{C>4�KK�`�+��0\f�0���B����/�pyᩐ��v�
�����jk�xj�� �{�D�֪�c�3��l��^�g��b��R^V*�����Sݞl�a�vlA�PRYXg|l�>��x��̯b���oW�k��0�&����@V�l@m��CP!
H�D���v�ˊ3���q��Vj˪F����ňQ���'{��bDz��)���N�R�М#�A/�no���sh/&k�TR�;mimzthz��(�������v{�'Dr�P/#HX�q����%1�*F���0F����l eFC��zk�6o��'z���a�F�W!�]j�Jo'�}k�O=��z�v�Y� ����C"�O�*�D1n���q�^$�ۗ�e
���+?�u���v�|,�\+� ��q!�NώI����a/w���,���xlvϩ�u){e��8��e'���l Zgt��5�G�k�$���`��Y8��E���8=�x�2�>�b ,����	*�%14$��Vl�u|!+$s��T�#�v*�+�:�\�B>Ե֊^���aU���%ۍ��{Te�Y@|r�px����Q�h@�l��\\l��ln]d�i��S�����v���`�v�7K�툢*C�a�@m�m:��D�h���6i�j�7��}�A��`�m���r-�����X.]8�+wKz��[���FC�b`"��@%Z��\
��O6o	�c�g�_�0�$��������W|�>9=�'�M�3u|�=�⹙+/�U��DU����X/B��Ϊ�/AV{M`$?��al�������Y?*���A��/6�I%v���3~�?�Ou��n��g/����=���h���~�4�8�/<���[�_���g׮|��������p�R��|�dv|ڍ����?��~�!�������Γ�K�4?v�$R,�`)���v���6����C9(�n�~MU)�.NK)�n�Ђ��q!�+:۫+W?���26��O�X���S�.?ފ��Xss�qAD�M�#�����mV�^
�K��av9����x�(�D���ӡ+��QHQ�Cu���Zb�#CL#��lD�ǧ��>�oE7^l���8f������V?����v۝�������y�pٺ���V�����wT`.~_���\�F�V�'�ɧ|⹍>U�l�SW�j]�������N��d�=�X��:~|[<h��t�E>($�q��}*����	S5sdy�[!!�_��A�⬉��,�E�K�*)e!�|�B�uhW7S�a��R��c]6��8�o^}������(Ѕ]�MzN���z'm�ϟ?H�`E�6cJn"��>D�1Ml���ZCH�T�su�����fѣ����u�sG����N� �Rh�\=$hU>�Ҳ��N-�Q�5�c�s`<�X�r4`����ȚST����τ$A�W�K*XR%��w>�FG��v����OG���	���.��Z;��2��dE�*DH�B���ь�f\��o�s�L���>n����ZP�zv���w�D��_��<>}�����/���Ͼz�#�m�ԣ3��/8����6@qV"˴7?򕣻b�j��,6�cQ(чv2��\N�^��Qyx���р��ȥ��~�W-��%>F�+�M ���ւ@KJ 
 �\�dG~X���an��\NVC��%To���K�Qg���7�b����]	����ŏڞ�����Ph�c�O}���3�M��=��Y�O���wH��-��X7�ƅ ��g�B4���1.�VcAS�E�E�T���̣oj��38��bQ/f	�a�v ��֥v�YR���M�"%�"��h�`�Z��)9a[b��5�a���2dIS��ſ[�a���`�.��I��Fn���%�Ζ�XWVަ�HB4�����+Mm�ջ�3v Ol��w��EʾA`��7�^v���c4���DKg��݄���C���D���Y�GY��y-R��=���aM6���`Q�v`�;(�`G�2����(h.�p@���[��eB"��zQP]#7�1r��O&�� �!Ӱ5)Ħ�v1�]���c�7���)��'����/u�W+�Moo(8�)WW�QB���ײ%�pjYh@&���۱(gL����gǖj��[��?I�[��U y�+%{����O:�f��8��&���d�2�l���T)���i9�+ץ�֓���=u�D�C����_fg�K��u*3M4��D̰�����BdY���v�W�z=�&Co�)w&�?�XѪu�E头�\e	�o,V�m�%R�W�w����It"�����2rm�Z����az-�R,SG�i�Â[L^��U-�� �LR����4���˳���
�Y��
&Ody��1��g��X��Y��T<)$���㖃�0񕅬����)#e�%�^�*�;��h��>�^d����w7��O��''X����	?\;�87:��#>��5_i�w>�"��S5	�C�ˡ�ou;�<\�y�~5E��T0��B����:����>/_�4s�=��4��W�*n��aRS�]�a��A�������&��i�&qRdœ���smF�W뮪I��氝(�؎H��'nt������H!��� �o.�z�(Cv��3|��}�P�;<��ni��O&/���0���qrI�9�_�L���@�����H|��{?�#}BE�*N'����Ko�OO^J�1X���.+�?GǗ^�z��;����܏�x��M�눊}���y�I{@���2$j��J�����Yh�����ZfMDmϓ^�QC�Ul����^7�����p�h�c��7��^%EN��O�
��Q^<����A���&1@j����U�0��0�ҝD����"U�z���^��'?Ч��)1p��ܱrs��f���N�>��w�a������p�k��Z�.j�WA!���$��BJNq�?9�Q�׿���R�$��D@p-�RD�JG=}#�ܶB��a8�[�o������zh���(���L"�|�S�9�a�Z0��g`j �Z����g��2Ĭ��v���v?�)�Q�S ��1���n �X7On���̝�����?���D݋s�`r��
fh�B@�/.j"%WJ���U٣�+�u��}�|g1��-8H*����*��c�����`A"�D^��I2G��XH�
0�;����]�A�W�)�kfQ|���}*�*U��x����DƢS>b��mɠ�h��`'
�uZ�+�%�6�*L�>����Y�1ˈ�O���ޢg�+���d��ٷ۵�U�\�B��C�����s�^�H����yx)R�(ȳ�ξA�������梢��u��/���3Tp�1�9��]�m���t���G�Y�J?��~M�I��A�����ғ�$��	��.�����?��<�s���Ʋ`/��6�bKpǸ����tZk�� y�/�m��U�a�I
�>:�#G:N�l�q�/���߲R�[dEˮ�R���D�fe��Ps���a'6����dL��g�8�~��,�ͲEGZ��4��̦g�b��,����UZ�j��O#�K�_5��nS��E[�q�z�ϣ�ȥgo���*~��R��ᠽk$���-�B1��9�W`Uŕ�+��
��_i���[8�bTL�X����^~�V�@)�$�R�x7��M�����w�w��u��$�
�����C�&wo�v�orր[)�H �?!���PI1�gB���]�
f!dQ,�L��pB��h��OB�b}�����>EN�	.�jԧ�x3����-"--̑�\v�g�c�g@������F�����I�9Р�f�I�J�]�?��}��'����+J�Y���?�{��c
ˁ��R{|M�?L��G���n�(����2�2ղ�H�(3D%�r�B��#�WT�pI,��u-�PN��c�Y�*��I��b ���V���
����iƧC05"M�'�ܝ�5�k,O�qv~X��*��a��:nK��4)�z�N:P��&Ic3�A6���r��pț*`2yK����5����}� ��ub��P"^�鎢u!'4�ݽ$�ț�ߔP�dO�`�{�A|5���^WI0}��S2����߅���=�hb���/�+Z��Ȭm l�Dg<�(�$..<q!�u�Y����ݺ_�s�=~���#�
Sm1�����r�J���`ő���}�'i'U�i#�`�ah<`�Y+�F�B���ȸP�ycl|؋��=�h�+{�)���l�,��ya�P�����0�"�0���є�<	����f��:ˢ	.�d!�!�
B�7�~4�Y4�h������F����V����OT\�%���B�xׄ�<�A�RD�/0�Q���@k���V����rs��b_�/�u��	=j�=̨���rČ��g�k
5����ŋ1�iwyO��~G�/�c68{(�$��t�X�8yZ����V;�f��ϡs���?��_+���CO����h.��R�A�h{^V�Ȕ��j����7(d���	P0��H���V�]	�96��D�M>��@������z��Z����._~[	EmVv��0 _�	�<7�ږ����z�M{�]���p^���5��F��r�B(1���m�v$��/k��Q�|쫁=����4ۆ�%N�#��(�G��*��۫=���x�Y�p�Β�{�9r��ޘ����{�%��8���k�u\(I7�Y�1��RA�Z��ת��U��}.�g�*�EO����y���~��5����ؖ���V8d�|U�G��6��=�)0(_6�.�/�$���|9ťf
%���b턻&�� a�
�I��XT(*��<�DQη{!l��j�\ܕR ŨB^uP!h�t��4Θ�g�_��詤ѲBɤE])&a)sؚ1)�s��{�����t�-G3xî��[�|I��Z��_͠�m}S���X��JAk㶀�\����'b�u���]W�L�#IĬ�2��m]P@>bD� ��/&(��54�����u�����_�7�Hkh��H�o���a�}<P{\�E����H�D����7=�DSv�d"��P���=���:(�ŋb:�=̉����x��t�Z��ql$9�L�B5ؤ.������º�F4��ޜ���m^'�G3��8�@; m	.ˏX۬ܓ�D��3��p�Мi�q�/019TtU�B 7$X�Y�zp�!��b��FX��K�]E���ɴbq�Ș�ߊ^��Rñ!� h���eq��V��`�����o�-�3[�˒�%M ƶ	�l~������DYS�1���Z,oBg9d:�	TQ�ޞ9�S#��ЃCz��"͜�^�u4����ķ��G��s�;�vQ�s��A�@k�g�S{�Í2�����k�X���/.�GH��%	�L8��ܰQ��JÙSlcb͠�1����P�$"�J',�]�V��gr �ڭ	�����$p._�8����u�Zu����`V���S�'��v��d�Q�Ӗ��}�QL��0�f�zc�%��
#���dB�.ЌȠ$��؜Kn5�$�`�:GHw:!4���I$��K�Q����8�����q�~��A]�rxu�.NxM0v�j�Z\�j�<`#��0#���P� 1rSNF�S�Q�qs�?�pw��<�ܞ.�8sF 8{kH�Jn�E��'��5�z���}2qC즸�6Y��-i��)�zpUY�,/�����[!�J)K��As�����s���(4����8:�z���S��lr^���Z��@�z(I/B�g���!�Ta!|f����>".Rí?©����HQb!�rN줁!{%�:<{����^0�
����P5��ڣ���ԃX�:��[�F�pG���Ƴ4��+�X
6AC�g$�T��'�܋�Y=+,x����/��('O�IU��D�~ӊ�%b@_܎MY�fx-6��jx�6X�H�i�Ƀ���k�֒h�?J�j�{�,/�S�eri�V��9?ﵳ�Ћ�K�1��3k�����ʕ�{+f:�5b���m%��)`Ɓ w�a	c��wC9�V��	7�1�B�%�,�t��^�C��]yW�uJ*�ßs/����(Er���|L4�S�W���N)�����ׯ~�G>��,Ċ�@�d	�k9��,��ȍ_fG*����4��v9��'��z|B񙺷O��3��&$�?xO������z�����뾧���-<l��l\߸#
�o�iLn����d��ܘ���o�)ƭweApv��d!]��d�;��Ib�
"Ʀ�˷�䟔��>�߹n�+������ӮU,w���H��0@>R�'�
��e��:���Z�j�#���̩]���w�^���ў;Z�\!9%��r���՗�}x��o~p��w�q���8�����˻,�F�_��JD�6�>�P� ��a���S Ǧm�G��F���H�7b��	G���tQ��F\t7�����].�֭�Hxd�*(����V�nH�A���z�bh>5e'k��B,��<y٘ h�ZXBE� �������v�n#\ej�;78��I��������!UT +>b{�e�9{�G��.|�����K-@�P-�9a����d�@2	�@R#35{~aj�!��p�D~��}�+w;��,"�HR"$���0܆�$�Y�� �����)�G�^�E>��y�Zy�x�K5�^����:e�F&B�Me��,*Z'n�bX�9�N�]����#bAs^57s�f�.��bGT�v[�8;�a�Y��th����L�l[n��ǩUtEG�߸#¼+��XIK(/����<HW�Q�C�,�cte�2����9h�#$c�B�������w�=��y���c1� ��m���E��Eܧ�6z�U�<'#��!�ըQ,��=qE�e7Hoڕ���l��`G_~S��ۄI�?�T�0��?�����E��hϧH���n�n�>�Km��D�{d�a~��d/�br���$�>:8;��W��<��4S�P���@�a�ᵨ��m�U��b]P��E�~���\o�=)��*�ڑ�rv�V��Ͽ
Xi�W��F5�z��A��`��6O�@8�u΄�ҥ�R^p���I�J��H�O�����Auƙ����!�Ѥ��_!_Cq�槶E��~6D<���J#n<��h,n�9����w���O�3=&!��a��y��T�m;2Ni�%��7�f���TK9K��|�S$�%�ͯ\=���y5��|�kW.׻zT��(�H�3���E �W�Sn��/�b(Ӽڌ��UC3�I�o��-ӊ�lW�ts�Z�_t޳��8��q�b.��w��F)���b8=e�x)|��l���ޚ�F���|��9�˲�<�'7S<H�}���#X�:�F��%w{������[弰�7��N)UeГ��+t�VD��Q��ӣ"��B��\Yܵ^# w,D���1��Y �ɑh���Gpp�k��<�dG��w�	[���g�`>蔼դ����|dK#I4#9��ҍ-�\c��I�avz�.9�A�{
W�I*�(��:��p6ϸPjB��U����8�[��һ�k�тk�l%����p�z�!�l�ū� ������-B�HB�����(�E��������a����-2~K��3�_��]�̷��}��;�w�_�>V�"��A"���H����:��9�{g��^yv/A�%�X�ѳFl.pJ�LA�U6x>S�E}0*�O�-������c������:{��5�D*���)>/w�.�5dÀ���Әqz�t�}p؝#A�`�M=F	t�	��T
#_���'FUc���@�mP��P^-1�:8��bحb/����T(	e096ȡ�`Jh�zq9��E��p���έ/o�����_���LY��+>F�?�]������no,ǽ6�����W�T�l#��o(�7��S*Ēgp���\d��J�?�x���,n��4����܃ɽ��6���Xn|Fv���/^���/�Ug�(�Fi��cOo`���� b�0����i6o��2�0���%0)k��M��p.c�wB� �����w¼��$���z�Y�[5ɰ@ॻ�;g�_�]V�	�	��{ɕ�S؄h&_���{w,���IQv��>8���$�Q����� ��Py���z���G(��Pt-OO��Ȣg�ud�����{�oRR��/t��?�[�����|�Z���ٔ*���	�O�ڟ��NH{�s7C~��@vkv��x��� >�E9��}�=����w	l>y��۞!��sz���^BA/����N��[?��Eq���K�|I���%Z�@}�ƞ��n0��}/�f��H�5�ȞV �@���ɲi+j�j������b */�J�����f��+=��1���n���r�u:q�E�?��1��d�Wy�a��� ��ɒ�t25x���ev�J+s��t� ���7�5������M�Yl�2��k�H�C��,�C�M�����:��O;�s�ӓ������G�|��oU�wK��D�_oȐ���\&������S�WY��%$j|;��}����.>`H�	P4^>0���)����[����ބEMͯ]�/��t�Ȏ�7����8��:){������%dgO��w�Un��s���
���l��w޿r����� �	1n�I����#���c���],9�.zrK�P��:4wyçӃ�j�|�ۋ7.��jˡ�Èjo �"��	�
���0ؽ��bOPL�;�T��gA��I)����	F@�~�K`� ;/d��$|��VU�Էx��.���t$��A�#�"���=�F�E���/X��I�:�腋�N����9���" ���޾���kb�uM�q<�eՖ�:0md�+��'�U��+���06[�w1C��JT���W�%�K0���o�������Y��D@e��CYm5��f}ݗ�)���g2?]��'죢��">�	B��{�>d%Z�����+>`|��8a�gF���do�	H57dGtLx2x.���˂9?<o�{��3��G.���%|�w�p��Q��T 8�+K���Ѓ���j�n�~�sy����L��r&��0����]�j���������D`�6h��#)p�����mSa-��_���!vΩoī�Á�>V��h$���iȨ���ç���a����%`�hD��)�^���^5M`�@�����{�h���LeR0����K���k��W��]��#)#6�;��U��Mc�E��X���&Sv�O72M���3�=����I��T�}v����&N�V|U?R�_�v����g
H<P�c�y���|�|��V/u)����'/gO�_z��6^��yI���'���/�֥���W�o}��?S�`� �������]� S	:%���%s�������=$qh���h;��s��|s�S'�w�1�T��RDc������GE�#n>�i+C����=��W9-����������k[����j�
q�Z�A/?��%/?��b�[�I��PmNʝ+��=,���~?��7���/?��*ֶI�}d����=��*���UB���7����ˍ�K/��������[�("�N�X���S�u_t��%���E����#��]��dukf�
	aʅ��}}���3�ݶ��E�<���Y����t��]!;�3âN���u�wViUq����,���6I�q�Tf�:��8D���\i/˱ȏ�	@ؽ)[3;S�yր�d�H�|@(�d��Ї J�j'uBp�5�098V2�XS'�/���_$Yܬ��!�� ��>��%U�>fF�)y���,����!=G��-�du5�$#H?�2b��6*��~��>zy��m��ͳ�:g)�.,x��8J�9ܯ����1,�38q�L(�"�ئ�"qm�vK)Eg��3v>`,��J̹VJ��&姏��������=]ji~��� }�s���j;��� �2bp��ܰ��w;ƾP�����LT�n}X���hZ��Ƌ]C�-�:Tc���a۸U%&�&[2����@�FT"ˬY���\z���|�Q}+��;��y��@m��?2�C=^��B9�9v���gLu~��&��"E/�l7\Z�"%�UM/�u���G�n�5k�]\9L+>S��<uY��P�����vW�rbW�C�X�_t�|����V�_�tm1�&���TdZ ��gh2�&tn!rs#�S�>�-���
��K���iF���&�Z�`pk��l����kЦ��x��3�{��Vxux�i#�1�$T���)��+��h?�R�%z�Y��_��R�l�m��ɗ��<_���\��� �^X@�v	W=G[�@���*�3\�&Cq��]�-��rm�%2�Ƭ3m$AB�Y��CS�f�Ĕ9#���"~�M^v����+�d���x�ᭂ�û-���}Fa|bPYq.	"�O7+�����
W��;�ed���v׀�v��V�:@~Y�-y�*­*��Y.\��lƙ���O-k.�9oԜ4��j�( յ~)��.������\�f��+g�=�N����f�cϻ�:R�>��( ^A��$S�&�W��57f,�ҡ��E妅ź��ص�h_��=5Lg�����W��,�Ϯv�O楧ń$f��M˓<�%�8MQ�=�D@i	�U�w�9�ٌ�U<?��X|L��ULyR���%N����z<Rs(5�������X3���b�Ғ��*;-���i~�"��J�iݷX�j-�)L����0g�}c����tRg2tU��q~�h*����xW�@W�z�$%@q�/� ^�+�_�Sj|����4q�iG^�D���P�o>�j1��b3j����h;B���sR���?���0���U\��=	�<a�Ap�u��7[F�k.Y1D�fL��D	�ۍ�B��$����(fT�¤gb_��̚0�lM�XvP&YrR"�Y�Ҙ�0�
��f�"�GFj�+mz#���,]�r�����,��[4�d&ߚ\��T�0��#-�G?I�d1�XY��@��X�����%� ׬��	�z�-x�D��ޑIFV�������@�K��ۋ�;4�gӰz�/��׾��7���`{���k�>d�L��sŹF�:P�����:2T��?�҉oOJ�mz�.�nn��X��[��9��ֿ&Jԭ/p{��~v#�h�6d��\EE��_������
�,oW���Td�m6���rE��-���_��MWm��$���z��!nLjV�x�djL���m:P,�#=!{-.6� ����	�@S�	��U).�"BOHwA������c�CV�a�A��p|���i�ܧ��� ��gW�� N������W�߯����6���:f�H�Bo���0q1 M�PO����@���r=��q�Fw���Pߡ���#�{�
�-�G��!X��IsE����?�����s���Y�"��LP�u�]�(k�+���G+�g)����c��.�h��µQ�[��Q "s�cQf�>��|���G;-�V���2��~��w��uTY<�[�bz�!R>g3�������[[g��d�!d��m����=l�Xn�Z�U��[��E���hJ�IYv�l�Q��N.�9~��),�B�� �q.y�t�H�$��nfc��z:��RX���}Y:����tʶ�V(�@	Y$��?�O�Eտ���d��t��i"��u�i���:�dQ� E0B^s�h�T֋<��El�A�^�慂 jA���ߞ\Lև!���ǉy����Eĕ4K��/�X���n�Ȣ��f�0QX����ju3cb(q�'rX���&4(CUH:��%q�v����⌑�P��ih��ɦz�>�� �^>��Ù�AW�r0����+ ����I/���[��k
/��7�Ƹ��[#��-����]U��.$���
����=Q�\Y7�y�:Ѻ �Ϻ�3e�h��]rN��W�����%���Ae��ǟ\�h�;�ơ#5�9��\{��y�������޺f�̾��$�]�� ��eB�U>r��_����/� �j���ϹX����j��YgRZrrQWluW���&Z���L"6���{��H?��} TQ���%�d��\���yP?q��0�� ئ���{S�
e!��x���ˆˊ�W��İ%�>��_	��_5�>h2�2"t�܆����Q�����~3-U��P)�u�;f������Ϩ���Ӗ��$0��o�ֆt� &����L,���I�'\���" ����g��d9e鈇Q��w)q0�� Q,�~q�hx��l���wR_��?P�~<;�?���a�/ mٱ�H]t�:�E?�,K|��h,J�i� C#a`�P�yJj>'�s;���^����,U}݋k_�-��'��t�5%�gU���;n͌E^���j����2c�I_Qпu+
[vW�h,z��f�d|�0 .�����T3��?�y[�+����P;a*5W�\p��7�\��k��~��,��AtW0��tu�V����'G�����.�ViX���T�&�n�n�L������$�{j�j�t�]��x�fK��u�h�A��~z����b�����W����!�Ӆ{��K��h�>Gڈ���aFq�f�N)�����gVl�۵�����N���[�Y�@v
.��&�'�Z;p�h8��a;Kb9�Ex!���x���7l�)(g@�i�]qw/�u���^�˦=��3�m��}u��Q �;ҏ����t�Wʖ��f�F2��;z�agt����W�`��DΎkc0�`�F.@��]�VA�q��,z���֫Y}�(:�<��v-}��p����cf���Xw� ɢ]�-,v;�l�])+�$��h��cvαku.��]�,@|mQdUъ/�N��Ֆ�7rU5ϛ@�daR�V�n�g8�h���GS�&|*%�K?MSS�{#��ao/n�*���z�$0O;zY8��Z��I0����Ӕϰ�0��H=
-B4���2G�� �P��34�cR:�{VnF�����Y'��a�yi�،�fAú��b�8+(�Y��!i�c��a'xT�h�Cؾ�3�%�UO���N8_qy��'��\���Ϧ�.����6��ɜ���ߵ3�}��~��fϦh�c��O8YO=}nK�8۝P]
N?~������w�a]��m]y�Ǽ��.�x������������g�^�������s���@�����_�v�G�MP�����\����^���mx��.ŗ|��X���D�%W��ѱ��cي���/�ۇQ>x��<������l�1w�G��_9U+4�:zBv�t��Q�!�HGn��>�1�$-XNY�\t{��٤�9�%���8�$��L/���m	�Hgmg>g�P�ua�K�D�R��Ƃ�褰;�(m��.|L%��o�Ȱ@vM8�P���MfN�vJ!���g,�)����s���K�z�>�#�c�\�f�!�Í>$I|p�c�R#yGG���&y�EI��xQ<����iV����q�����4F�
'*��+�ė��ߦZ_�P\^�,�$�������7��)@R�(pd���~4?:�X>�i�W��񳏞�vQ��]�W8��.�=�i�nP���Zs�`o\��Eq��W�4�./_�_�}������þ����v~��g�;R��E�}����n�sN��,7��N�j�&�^`�L��#C�/��"�q���-J'�c�,"��"�,ʶ�z�µ6Bˈ ��<ƛ��I48�삫��PD�3%�%���f������w�̚���B�������߈#�d��3�Q�Ǫ�1D�1#�JZ]�7�*���&�Xf_�G�op?ܼ�]�8��BE��]��a�����(�~��]�!��p�e��\�x
�EAo@��S�"���Īɟ�T����G1���-������4 ���5z2�c�I �*-̶%6�.'�)k�C�R�+��	pfC��`�P��s�΃:U� �')e
٪ ��_������
�%$�;���4��WQ:�;������j������pxڦ��R|Ei���s�W�Itd�ӤUK���O����<�ɫ�C��Z9�s���ȜUn5��*��A����V*sBd�vR|/���U)��l��� 6�z]^�|�e	��È���E������NTF���������X)	�b@1�'�b3l�;a�`41{i\-���Z+PM�����_��Ė�w�)7{].X���D��/3�����Ơ���G��=7Y?RW��H�,��մ���vF�T�љ|�z��H�����b��$��#Z~0;�'SK���ԟ�� �~�/�q~��@�-�W��a1�~��@t7��#�}{�5
b@�i��<��K��5Ow�HM����o�{��R�e���~���e���}/w�0������-�.+�\l8!A��[��׮E����y���.	�Z�꺀g���e|�'u�|�w�ʮ�ͽ)����H�YE#(�]�ҍ��S���Fk�j�̥��>V�Oa��T���;6P�ɂrqb��F���HPG,�i���DX��\���R}&I����P��&%s�Ld���1���xi�n�.�(��ڻ��G�u76���/ޤ������n�E� #)�ܞ�� �?'�ͷW�
@XǹOw"�w9���B��gk��_`d����&LP�h��&�l3�RqZ�T���ө���F�o�zr�)�w��>�|�e-�:�T��7�;��-�C'|�X�z�lr��S�+������A�*{��ϩ��b@.e��g�V�_�ϟ�q��ܚ_����Ty,�pňŷ(B����x!	iJ^c[���1d��J1-��ƾ`e��4����x����6�xx�L:W�ѵČ�������
���`>΀��X�=(��C��U�5�h���9��@�X��tt�ԯ/�H(���D�E�A�
�>}�K���޲��<-R��]�G
TQ8�Anuy�!�9��a�AR��iz�g�����y6�*��~�j�qh�ƒ�o*����?b����_D.�R�![_1��z�a��r�/ ��^�C)�:@s�E�g�#�:̛Wّ�N�f6n- �t�~����S������Lw��-Oc���%�p%zEj�nq�%P�����-јUvʱ��$��<�Q���X�-C���<� �R8J8��K�FK���į+����O�����EP;�,�E��e�������wc�J�,T�A2��
f�mwq���6���f��nz����-L���r+?�>�9� 	[�>}ih�n�<�n�pi��-����z�(������Dċ:����t2;��>'��m�C&�#+�����D�$�}�L�'ۇs��+Q/TBt�����b?��+
�?<�n���<z����=]�a�>lb�憐~�Qk����?��	W �@ޘ��f�׸0a�#UY�{�����5V�F��T�����BUf�G"��{�I{��� ����Bn�C����DC��l�<ֹ1�=�#Ԙ�
�~7�f����L&c�[rtMZ�ŀ��l>p�����ѷ���equn: �B뤽�nM*!��#v��͍K��5�m��l8yp�˭s�WbO��Z�i��VKPk��ߵO!Db�i `���i���#����񶢛Ò"��9ᰴ���#����H�͗v�Z�%;�=oΡ��D8H�Ǐ�qR��G�e�ՙ쓲
-['�=��[�i妳WT선��孍K��1yR��w�C�����c��.9D�����r����S� ��U $!�����t��9�����!'q� �ӧ�����X!J�֮D�8R(r2��fXם�9B\�A�B�$C;�"pݵ���H,��k�ܑ�z�_��/I8���45
�-�HQ��玒~��{�I����+�`��9qT�ڑ�5Lk�|��٦+b;"'�4� �ɩL��h�&b���?���,e��w8t��1�"������@#V��m)�"��>a�]�w���'��TS`��u!���f��T���@s{A�;��dA0/���ЫO�Sd9����R��]������Ζy�}G})z����I�Y��Znop*�P��v�E�b����������k�2���+:���0k6�Uӆ^���8��W!�My&��ɟ�� qP���}�S2?U�U��h%�� &�0=y:�k���G��S�r�,�?�p�������$�K�o���'�l+�`,ƀ�1y��%Z�h�u'{;*i륍��6~���X����L��FI�i����<�JV(~}%|чv��\�*z2���S���=�-):)��JFxm��e�8����Eǣ �l`p����o��d�]�	%�o�޽���J��
�dw��$.��q�`1������`��@�-$��d 8����w�QUs�%p��}�yN�n�5gͺ���������ױi]Uǃ��$�H�!꠻�0Շ��ڙ���f�5k �*)F�A���8~.�o�K#Q�ף��_m�s"����|��PRV%蘿6�I���_{=���-�5��b�3d�����!�#lIԙ�ߍ��Vm.s�8 [��M�o,������f�6T��R�� '� j,�:5�C���;H˵�G	�2kz��!�c��UP��+�Lzd���V�l���g���ͽv^��:a�0G>��RՂ3=C�\��9A;p�;S��;)�
��`�LI�x�l|� �R�r �\�&0�~1,d�ẕj�렢y�G}ꃲ�73�H� 3n���}�����D�i���և-�Y؀yr
�G�pm�������q��K�S��Ix+�[s�n3�6�3y���g"6 ��,���t�U�Pt������ڤ]������۳��Ǻ�vġ2�*�K���*p�r���s�D�����鴕�G���5��bQ��??zE����UUw��D΢�=�dP����m�h ܙ�q�[�c	����L�L�R'�0�pt�UQ2@$c�d���1%�)|S�D���(eƪvc�>k9��w�gfi) .�w3#�+��1����,�����]���S�.�v�:��]�n���ST��,�!~�A��k�Ɂ͢$1���g�:���rxO0!1?[wd"�R��qhm֙0�q����t�P�%Ͷ�x�s]3���h\*�=5\b��̇z����~ l������V;Iڏ��/�~�&B�0t�z�-�@@X슬��V���8�K�����hxY�BE��o�ha2'inܖ�Zg���+�Z���j��k���[1W�L�
XE�j�q����J������Ɛs���D��<��7�>��^���������c��N�63��T�7Ԓ�i��]�qn�la����������=!��pDL�>��i���;��w��B��Q�� �&ӧkD.�aj<��|}���o� cĠ�Є;�s�,f�����B�ⶦ�1�����:\��kr�Ah�a��7��ȥJ5D���W�T]�����绬."LJׁ�Y�q�P uׅT��5�cZ��rCG���m�b�'g�7���Ͼ��ޣ�/nb;:|.��h0ŧR#d� ��p���{�����t36���B�J$�4t�Skp/�!k�E�

g�p`�7�:'et�����U��հ�4@xe*@71�6��՞��T���J�&�l�lE�{��_0�`�n�\fYaF�<�U���b��Ă~eH!P�Ӕb���\�kDQ~��	�}�7�A�|�0:m�aZc���\���|��K�F��ѽn#bۜ{��5T-<Tű���X@����+�'�0�<��mǁ�
��|z��ǚι\�fLU��>XBQ���|3�&@�y}�RY������*,�O�o�~��9�J���}G5\S2���s4[�b<g$��M�D�{'�*}B��c��:�s�KpĔ%�)�@�N{r���	���0��i{�CZ�$6�|=<m�]Op9��M�op���tФ�
zXCcnV���'"Ir�)�y?�fT
��R=9�̨Q�0��[{�!�8VNO�(�`�`�,6Ys��x��ݮ/*HZ,�yҚKf� ������!����h���R��Q��f£�2��>ź�G�s/�\iR�(�o�y�|YI-�=a덾+ ��'��a���+:���kx�囨��2�����s^�4a�P`�\�3����}�g��t��:ǅZu�6�1�+��TM��,�3�n ��ό�\D2/���t.	���ު9�%�9�U�s �-�?ټ���~�z���"�����/z��޳i�z�U��*x�� ���3�o��Ǒ�Ȋ ʆ�8�$^8�I\~/M�W�v"Ê�J��<*l��8'әZ$Ύ��d���X+�,�Y-��FY�Vc4��Yy_�l��i :C<h���D��rF<�\�y���Wj� ��sx~[3��#�i;�}��e�V�%�O���+�!1��M����1�����//.q�em5Ʌ��ڄW��l��<U~Z�W���äe�R�����Z��d11 �*w��-߬�hT��Co"�p��}��B����3�c3�&�lF�f��p`Ǯ�BL���h�Ca�$���g�l�6ޤu.x��|��#��pX;1�$��k�%o�������'�Y4x�}�k^=p�VX�M�Z�ǿ��f�'Hk��	ԣ�7�<��D�sڼG� u�8���>=����
�|s�oDmrw��������Y;L��O���Xt�m��t:��:&��/䉖���I-��c�G>��-0��Cŋ�V��
 й�>����W:jL��@�{V�r����T$��[��T��Y��M�둂:,�CSH
3��@��=M<1k�9βHwk�Cـi��pr7��a���&����*�i��J��uG���=��O�O�s'�ǯ���z�A,�J�5���~��l��P����m�)w��bk3�#�$?/��~,l�B��X]+�k���${sH���L�����:g�Ȟ���r��5�c'�s�&����	��<;a�b���<��Js��^픅CC?��"� ��1Y�s�ִ^3*�I��x�K�)\&Lb��X|��&�L��:����+WQ���������*#��]�Wï[S��sq�+�� x9�i��T��H"�G��vh}#��W�n��Ȫ_gL�z#F��ۮ�t���z�ɪ��B����w�_`.`�.[iK˟Oa��+����n@�B[������,�_䯠~XF,��C��T�Ⱦ�Evn��U4"�![}ڿfM1�Q�v6u7��^W��|�'x��4�%(Y�ea!s'�8�A�~95�E4@�)o��s�������ä�0B�Dܽ�^��]�5��>��ٺP��J�MSe]��k�(>WJ�'�2JL���d�N���D쮖"��}d�L2�8�WdI��V���݌�Ҹ���g��^�̆�`���w��h����"6��y��F�=_���]T��Ɋ�a�<5�!��Qd��XK�m9��9fg��L�yv�Yu���K�)1tlo�.���ɦH���6�����9,����
ίbQ>�z���O��:ue�종=&��B�kܼي�+,s(�܈G���oC"�J��;n�=<9�Eۧ�/��M��ǜKq �������kV����JAע%���F�}۰�d�Trf��` ����3-�g��=���2��� g�HWw�"OG�W{���{�'��Oě�Ws ];�mO<w�:X�3�{�fp��9z@ �r�'���<J��a�37=ڣ
�����i�۶��m�S�H5F $3$]k�a�F�ni��zo�$&�+&m���.l<��-?�pq��;�ه�O���;���jݐˌ����q0TB�)걶�D���o���k=pKT�a:ٗ�@8���<-��V��uq��,d����5� !��h�Z�^W�mu���;Rc��vH%���A��3��LLY���5�����s�Θ�g X��I 'm؃�䈞@ʌHy"6YKN?z��ɞI��G�qV�W�F:� '����"Ǫ�A:T]�����t��r3��#7��A��ņ-&�8���T.���ջ�K�J�H���@r-��������D��RK��Ke����qoZд�����Y᷸��W�/gV�Y�q��'ęB�9�)I��B'�1ٗ�4��6}�VTc�4�J��`���=r���Ɯ�ϟ��Z�*���XZ7/Sɉ(36��;��I�"�������D�^��u��� �9[l�<4�@��yX)T�`������6���� 7���	�0 2hPsG��G����Rm����r�&����m�-L�		��Y��"J0k�;��� 8q���(ϗړ9:��}|x�׳��)[*u&�+�XX�$�X�O����3���O^���^����S�ܐ`x�{��Fu:���r�!3�eQQ��e��!&�$�����O�W�q;"�٧6šx.!��0n�b�90�y��?����<܊��*���Oa�A4���xd���i�����%8�iŢ��aja�z`}�A��/u�ގwi�xM\�Y�v9e��>\\QZ%�|R�@GnW��j�F�p�Q7�(q��TZ�4������攥v��Pw9B�o�0ߝ
���.�6�%����>�j������4����۟� �2o�uc:�
�y慟{���ù���)E6��'/ur��C���k'�O1�"'�/�D�]��S���O�N����ݡ�����t�6O��t�G���Ӗ���6"�4'i���2��FN�v��Td�Ԇ���G*F)�w��ZԒ��/����A?�f�aJH�O>#�M��6E\*Y
s���1�-O�4$0�������%@�f��h��^41#��ta)0��h��({0Eu�̊)�A�0yޥ{ܑ����ww�j�������m�Q�/�"gCڸ;,��yҡlV���®�$/FF�c����B��.R+_�a%'1Jq�9�\���*`	ǾF���Nz����+fm?QK���F^�4�t\���+�tU�;�.z��ִy`gd�8I<fi{}p��E齀�c� Ļ�]C*DGz)`i��V��0���sr�v����I� n?MX
<4�ɨ��>�������~O"�^��NF:o�q�2�!l�{H����n��M7ߥ�A�廖	v)����b�Їk���9���2r�r=�CX31r�B��?���<i����	%�kf#t��s*�?ݫxZ�4� �N@��@�Lsŷu�`�l�	�$g@Ł���/=l����+
h�p�j+��y�T��e��̓V�B���Je��ٟ��B�
 $��G��:��{��3��Sw�X�I1�x�B�a��ŗ.��9�<8�#�A�ƞ��k�^~{L�:���'/%�R�f�U�hkq�)&��8���΢���eJ�x���b�����������A����MO`�o�k�b�XZ4�yK��DL".#�C�-1���R�A� e,��I���k��'�{N��+���2�<J������0R�]��d�ؚ�#a���7��˥)mmi��Ɣ��t*,�-{���� +��'H��O�I;�n8���!5H,	.F���4g3�R�2(����Z顪$d�.~��%���$����7�ң�w�p�Q���bI�Mi���IRB!?�3�6#��4Ŷz���;"^��:���L�^ߴ>��ro=�] X`>0�H6�I�yJ���`Q��j�]j�Xn<�`���ik��w���6��7��z�͔mI��8�&a?l��9d�) 6�c��sn7��v���0,�T���V���~TO��1�Xp��dsbK��I��*�h�p�@h�	�ӨD�N�{=p��\P3ˁDzL�ĳ1�����cw
Jpi��b��S��bɗ����iG��F�ޫ��4-�E��GhG^V�av�����v�~�2��1�U�\�g�9�+������2��������f���$�0|H�,$�%�ȍ�
�ٮG��~�y����_2���R*x���	��e���>������	SC���-�x5U ��:R�΁�a���_M%����B:�L�)���4���k�li��Ek/&��_�%Eh�$K�������ԋ����յ�w��n� �G��DqtS��ޫ��s����b�����4/�1'�����vT��5�����
��<Bܙ��ֵ��n
���\cS�G[�qF�U�Wf2�m�՞�:�b��f�w-�Ը���̑#��]{t/�XcwK��%�u�p�#��u��Q��̳'���KZ�P(��kX�Č�ul[����W��zw�s�1D��K�$2�&��<;K���O���!��N�S~ �r4�Ru����*d�\�B��t���t�?�6$�kM���ڐ�5[HJ�;r���3�4E�֍V��}�wNB)L}�3��d@4,J�G�և�O����S2Z�"_�\{
#���,E�1�jяX�J
�p2(�kF�j��hU�$ɉ�tEQ�B7�J�Ⱦ�ΨS`q_�.�ʝ������R��/���x�х���GH�Şk�h�}�����b�����KcKpKE`ߚ>�FN;����K��a�&�C��]�7O� 3�=���?���l����D��F����3;$�ꋎl�����3g�_�#+��OHA@8�N�I�OB�����5�MQ�b��q;j�g.M��
�Y�!X�GL���Zb�U픑fQ�N�5 ���[}�L4y#N�X�بLLT�ĸ��>�lڼJ�Yi&�F�p	ez���
�Z?q����0�f&�u��&�-I������f�\�Ƅ�C��=���}<����9*�p�k���֫
;� �f)��X
&�m���=��p2�~)g��K��u�BI?
r҆�O&�G3�:#5�g<f��Y�N�i�4ݥ��h]��s�{?w�ḾSf��2���abX9作D�%|?���_{��1~���4�i������88mЇLƜA-�-)8� �J��$��s�6�NF\
���|��?�Mƙ��M�<~A�+l��><䧽W��~o/�X�����v�"�ƹ(�7�F�r����`
� 	�+(f^��^�`R50i �i�=0��Ħ��[FD�`,̩��Lo�˶��CkA#�(������m�,���}9I�l�vڵ�u�	�uL��E"�EZ��fa{��&}�O�o2�}��u|J�J�mֵ�X�i����r���;��ы��)(3W�v.�ܥ73s�i�W�Ӧ���1�vi4���̂���1q �]�ץa$۪d.7a�RhևY��J^?Un��7���J#�D��E�8�_LaQ�)ʰ��e���E��]��S]���tjd�})�-��ԧ��(�u���y�tz=�G���B����z�$�uW�	�L'�mܓ����kgH-���	��2�=<�+D�V�]����H}�w�s�Gj?�T;�~����W�}[�!j��;n#�8˘��7�����8ֶ`�4$ޫh���PS͂	�.K���@���r*�k�qK�+�nӻ�9�۬��.�;�w#��>��w�v��Zt��oc-S��|<�hm,��gv_kw�;^3�0�5_+!⃖�5�M���M��in��� q��׍j<��i}���jN�F��a=�:���pm�Ϥ����Z�������8�U`j��Q�;	�#��{���IHSt�v�\)i��MH��:eRC�����#�[����Wz`SV�-K�RO
T:I�I��m�}�V	�6.�)���ݢ����@�[�:��AaoO}T��Z���*�(6Bf}	��[�;�i/?_(2�EZnwל�Pȅ&%s*��fY�!��'E)�Y�(q��������v�M�	�� t|B|���NY��T� ��%��?��{��<�rb^X�6�3����	�8������m`C1���5�G=�����kZ��BO1�bc:������X:=�V��)���u�
8���F��]��,�Å>5���n�0��!�5��޽�=7Ϗ���� n�
'����8���qݗ��^~����ςކη���pM�����Ttb���:��qӎ��^Y���*�>V��ek,-�S5AJ7N�n���Ԋ{�:"r���;�6Y����;ff�^8�p;l<K���a��]#sƒz���敮�0^�V��qVE��[Lt�	R�X9��D����K"]�^P�o�y���1k?�5jQ��r����7�  ��ɴW��;��1'�!�K%���|�orfe�Xr^�rSTԲ�̭��_���*צ	s&V�j"w�=2Zo|�Y\�̭Tɱ��<_�H�Ձ�+8mZ�dښg��m|�B�b螋R��/��@�0�g'��	��&�S�Z;�$Z�Tt�R���1=3T�ٟ7&���^��yd��3���p����}z�x6��/�{��
ww��NպDG� ��VwR����t���ѹ�����̉��9-����.���6.
�AoIFhx6 t��J$3:3`D&�sv&>���`A��م�EQ�J�o,Q���h�<]M���:�A�<���_)wZ�(��k��O�^עۣ�ޝ��U�<��.�Jq�CC��Fp�?�C65o��X�5���gR��8��Ra�<KI	��F�P��7?�7i�<`
�P�uꉞ�������>�&�T*�v��4������C;>���$�[��2�%$?6j;-�x�9D[��A�=�������a��0t���7(G'L$�*J���A!�*���Zu[�y��֪���@�`H�+��K�I�)7kW�+�r��񹳂J�7�_��A�v� -�>L?!�����g���N���-��r^ ���QL��7�C�GT��[i+�����JdI:�Q���\
�T��r�Z}d�'.n˫s��L��%��2:i�$f�Q�P�(���ѐՂY��Y�J�l!��cY�|#Y��P���F5��-m��Qq��Z������M͂r��1�e��µ?w�{�ϸL���#�
�5�ýɻ�J�6D���q4�:�h��%.�"W�%jӊ���\����	c��7W눍b.c�T�յ��h���$T,WW���ߌ^��Bҽo��$�E�%bK���,�ژ��C��D�6|,+�L����,fk{Q[c�)���H�M�{!¹�i��i�#Ɖ��b���L��:c��%}�#6d�v¥��"\4�ƌ7��KO�uN�p%����V7G��𶵉{�����s?u?��q�@���n2���y�'jR������:��خ%�m}4��&(�`�b�Er�-5.g��_�w�է|�Q�HRJ��΄ɼYE�"�8��\`�B_4M��>ۃ:b����HF��5xXL,��Ыc\4O���� *ǘ�2��V��y뼼�5=s�q^l��͙�7"�u��f���%Lr"���eP�����5>T�`3��rS�Jo��f^2��:Fu��|V^�J�<F�R��O����}_�#Iw ӥ��k1=V܌m��� �)p�de�>�p�u�$/�v}=��r�6���vB�֋HqRX-E7L+93b�)B�B)�I�=���K//�P��^���b����Ycn{�JfGS��-��N� ���?��񦿁r��_�⼖�qA*�4�M�'�Wӫ6�A|��G��Z�N�1�uՐ?��5��|P�݊�.o��ψ�U���g�Z�V��<ӱ���!��d1�oJֻ�C?-�@+*ƫ6ޛX4��LYU4���:�I�)��"=��zr��.���0	��=�"��:�꿁{$z�H�1��v�U���
�0h�/��3F��[�q韃�p�d�W�wK@��swm�<�'�5E�a�k��as��*e���W���/U�7�p0��!";y���B�������+BӾ���R�#+<u)I�<�7��ܓ�
�a�����vM�8[g��"y���āZ���G��(M?�r���[�3� A��ZVQ�L�(X��0�@�-���<>�D'�+(:��i�U�#�pw�.»VȔ9^���9�܉�ꁳ����:��tB�C���-{�T���S����c��uu>��0b��0��0�?`ǭ���q߿r;r�&bd�	ɨ�&�E��G-���0�Q��jʵ���U�,���ա��_@ � b�i!���JXD����	�:�z�	�RUc;�ظ�rH��S#�N���LMg���'��;#�GZwiw�du�q�����K���R�̗$�+=2Ո]����M�Y�����oLx�0�	̷Ӄ��y�#�!V&�h�2�	��:�����{m�V)!��ǫa��mqx^V� ƥ�(c2�-��l���"���6>��0�'��zEgb����;�*J�>o@����.�!� �^�RST�/�_&h�˽}Ф��#��"�I����NN�Wig��ޣ��S�ۇ�O�{�ʥ˗.]�����|���;jJ�Gt����F"�e�۱�}��.}�s���ǯ�p_�N#ʃm?�e܄K�3�4h��M܃iՍ�~܊��&wæ����6K��)x�� �̾N�(V�Ŀπ�7b���r�	4���k}��i����{�[�V��s�ZN���w��V4�����Ҋm�;�V����1�d&g����m㑤)������8����O�!ۖ�=�v��&;�D�!6c#�JԞ�y$+P�k�A���SZ���y����S�6�o��D�m7�+m$#�M�+�ޙT@gįU7>�%r�{�wl����|FZg:�d�c�ԭB�RXF���~d��@�أ��t�+����S�&�DY�P#b�a&1�x.X>���v�T���o�M7`3���}�M<��q���-��M�ʗ��4.� j����0Q*ؗ5@4U��Fy�F��7o�|U�<����x^�"�d�Ja%���[U}]!����͙�9�NC��X3�D
�A���7�2zOu��	#Cc�$�|�:�5.�!eru�3˯��|����Z�Vv�P��Pa*+����$[U�3��2���\��$\"%���rT_W������JB,-^w��6�=�P����d�x8@������{
�Tr"�U��F���M����:� �X}7��8�ާ�����	�x +U�<&�����&H? ����#�K�)�4�� �t4lf0�Q�	XUa�!��_����)+ɵ�t	\�/��ZiV_iN���� ��~Ap%�V����}�"W��)t�k�~��&<4	@�v���7RD���vJa�2G�5��.]����'��v7�=H ��sٮ �a\�]5<�^���)8hM9�r� �O$=Xș�UM�:�/\��f����5'��GOE��p��3>��X�㐭@#��ގ�s�M\d������3���^U���酔W r������|��(%9qآ��<S3@�9}�ꛆSt2tPl�}y�#Z۰ۛ�5n��\6,���91�Ζ����0�_�?����)b����.�ym�t�:��O4�6o7PmnC��WUg$�z��_%4�Ypܒ��ʞ�.s�J�Wd��#�_p�Ӌ���W3?�=��Q ���Z�F�'�3l]�4�[;��JL�6���%>3@��|b�+��C)��`/� �������<&�fLm�Ӱ؍���L�������[l�G}vN�Q~�wgt�Zp���`#��vkz�۽8ů�zFQ��?�k��� �#�=�%���`���X �x�>ҵ��m���S�"��;߽xo����Qi�$TLCl\�e�),j�L�K���r8�[J)�/�� ])��i�i�Z(�$���4�4J�T��^���p�:$u\VUl�J^.a��>.ݰ�4ۅ�����R��N���*	� ���E�{nſ���	�n�J��pԻ��d�:������!c�j8�O��	u6���'�<����%}��%�?�H�D˛������R�sv��1~��Əf���^wܜ^� �n��X��>�מ�ua���u'�o�������P9x����|̓�iG��B*4T~�ya�54)����O�4J&�O�L���,4F����Bi

�^���mS�� �	"T�ISK�ک �,�+��>zC���鳉��j�0���������W)�BК�0;v��Tg�liI���D�Lo�L�v�ٌ�*L]N�Q4��'�)�=��3־�l�]G��P�����
x� r0����#�k�N�a)��2wC_�z�j��>�?�ʒ��E]��2�~�s���Rqv����_�y���+B��{��[��n�Hn�0ϏNvj^*
�UI���KTN륏�\tk	��<Y�%b6���C��(^��>Vj���9��VMp*�h2���.�ՉK��Q�;X�>�W��.4�hX�*��q���Ś^f��<#�.{v�1��[/7�B�հ)��6J��|L��BO��7�q�ŽWp��7�p:yo�W��08&�u%o�����_pm��Eb 	��%���e���jVJ=x��P��D�Upj̔�b�#���=�G'O���AOQ(�J�(�T��:= qz�#'a�� ,8 c��B*�����XWE��`uqnY� �dpT�hȪz������|Gê�2�Tp2�n�Vp�5��&�S�Zi��J<'�U�E���H��]<�l����{�F+oڤ���
GKM�[v݉��������Cr�&�a��V�˻0F��,����I�l�Nx�8���Q[h�{W�PJ�+����{����|����{��74��xw���7����ȏ���9�
��h:c��[�s&�����h��
Ბ?Z�:[�������ǳ#X�p�G�ef�>ދ��K(��9�x�r����?mI|T�[���|���N�3��XZ��œsh�H�*yr���T�:.�)�t'�{;m�W�?�������5p�ԛb�!i�X���x�Lre�<������>eB<-��-�=g�	i]��7��ɉ�O<�I�tte3���%����R |6�:�O�=௡4�E�J�G����"�O����f��_������
P�Sp���stj��9�u���s�e�?I5�Ĩ!�ɓ��o1!�N�>_�y8��;c7��>,U�%��~4ت1��E�>/�zxg\2]����\�BK�ߋ
\ԕ��p#�i��s?�*'����y���q�\2����� �M|����f��*���6�s��kLM���I	�?�/�[��t�旗cw�����Ff6�p{4I�Mx� �J�a�8ְ<�}5xɒ?|�g�-@Gn��q��[���W���7`�H�;o����Gha���+�f&p~�q��Ƞ5��<%n"jG�e��?A�F]����]E�������>
S�B���>�s�髍�=�d���II���:���6�w񶾋�`'�g�\�$�����_6��^���g����SX�V�����9"<r=� xQ�H�d�>s��~�$�柛/h7ߵx���Α�0���^e����Q������|'�L)�}t�2rY|�b����"Gv����_�$�M@�!�i��zH��S&��.�C��o��M쇩gU�$�a�A�8���"�1��S��C���
�\���_r/ĺ;�y�K���>�{n����J�S�����vF@�}M���:�� �rS�W�o��F��)���̕�q��9��n��32d�潍)���>�X���0�zM3���Г~S�)��Et`�xF�� g���.#�Q�׼�:�t:ltT�H��5��T�qo�dﻶnI�20�z�<����~h���u�Uʎ	�K���ҕ���	�}�>l�?�{�KnT������	:jؑP��,�� �y,.�ω�QQ6IQ��#E-/f?����b��twWm_����t@����R��)��<�Ԋ�5�+�����4�I��S.��P��q��TACm43�r)���U@s
иN����-c��u��c��~7,�\ב�(���;�H���M����jS�Za��ZG-R�0˰���K�I��R�4�� ��Zh�[��)��>��
����10���K���CQ���_� O)]E��1UM�G��d"[V��)Kl9*�;����<�K��{�Ȟ���-����DU���ݝV�� �iAC�Lź���axg��o3�-�qA��*�9P,W�Ԩ��S�w��b���o�+�����8�M/_v���+W,�, ,8b�(~�W��BS�:�ԑ$$Wa������jm�1
1���bS���UXJ�*
��Gq�8��f-9��Q|�͓ӱA&٨������F�9������IU�h��;��0֘_�@4����H����e�1����Tч�>�\��X�R��9���e�k��S�"B�5D�ki�b �d�.%���K�6�<�	�z��,����.k�-Vm:[��l�]��z��tJ�D�}��w���%�D=�Q2�Tzf_rC�iQ&��CN�?�T��L�`䰦�L����o�	l�k BeHd�c�XB�I܈ ��"�Sی��L��<GE���"γ��-��`�|D���z�<��U����Q4��s�Ct5ߘm�/\b��˜��g������mʱG}?��(�	04A��e��':�^���4qp��~�%�/d�x��Y�o?�蓏����O>��b�Y2�,WBkU~��1�����@kX5�%�4�f�/�e�$C�x��{^f:^���|�3_��Y�b����ׄe�]���[(�r������P��`��s��ڻ�=*�b�CյdO�jbxձ��R�Mx���1t|�*�v��|f�H�'��kӡIi���Z�HY�*/Qو�5 ��f��5�@h8�Լ[�@����֧-���w�Dd�0�s	�N!�+~x9q�l�B�y�9L�@��re.&٘p��y�Y����܀�n.g�L8��ג��;���;��!��־(�G���2������J٢���F�*��5d(Fbb�\�����K�S�Oy���\����XxUx��hF�N��	^^����̗[��e4��d�^��FO�O�kEo݇�����k�l��.2e3��N�n��>E�Pd~�X	�����/�;�,O��A�h`{r+etY�7_gq�N��p��|k�C.&�?�Q��Wˠ��⋵#%/�IV}5���g	ל�� 盿Y�e��z
���;�$�T�N'���w|�yT�0*Վ����~��Ҽվ�ۊR�T� ki��|�_-�a��}�E�;5E���Tk��s4n&jzm����+�8/�3���q8
<Ǳ�yF�*�rO�sB��tB�=�#^W�R
�M�f�7�l-=�qR�S\�ꔠz+��
�J�e	���U�*c� �26�!���K�Q�8�E.�Av�q���
��D����	��\�5^h�9W��FG��\�Q�^G*��8�n�����U[�^�y,1!G���	Q^����Z���
�����zi$�"���Ah_���p�Z6�?�����>�?=&Hv�\�o�A�=u=��c[�&@I�s�������-s�����$:X�ӧ����V��r�k�qx嘤��Ҧ�N��!1��'���B��fx�!�!�}��DҡS��-PTC��<ط3_Ν�!"�+8��R%+��yD�YF�s���'a�`��� c��Ҽ�v�Zq������~��z-}���jX��+D����+�,t��e�t�d*ב6)@Քk���ֈ���ǟxkXr��\SeP���8�@���hb�x����&[�LRWH\}EK��c�|Qs�9�%�G�̽䂑4���Լ@}�s�f�cD-���E��G���u��"������f��0�C���T�\F���_���X�����ֻk��1>�(�	M|�\`��`��k���
�'z�-
D�ا�n%;y�I����Q~���(X�z��e�/�Xg3\�3�P�� �%"4|r�F�!콨M��O8;�r�_e�zv�U`EJ�)a�l΃ؑ�G���O�6������x��؁��?��_$���ȋ�+�[����n�ա�J����6��Q-�n ����b�D��-�L��8�����P(��=���������w�m_�~�f�g�������_hb�����`�
 ��"B��hg��b:�xU��#����V��͘�6��VZL,��	��g���5)v���r�"P6R����x����u��]ԕ�v��iy��mTN�)��e�s�q���pR$2:qH�ެ��ߚ��"z1��=��Х؊�5qИ?VӦ��qt���~�n�S`s6�N�"J]zT5��sC2sE�e�K���x�{'HT�rG��8����)|�Ɵ�ެuk
�m?�4ζ�����谉H��i��8pJQ�=�������Q
j�T�S{�$����+����ar� pp��R����ҿ!䂫kϻ�]�S�'����B��hr�U2�\('l�p�~vgb��=�r��4�,�M[?�)y�T�`��B|�u�~��i��	�pl�����4�{�O�� �1�,�+�R�|R��m#�������P�O������ �������9�K �Q,9�I�+������sLř����i�j2Uْ0X�S|���V�a��	;���A����d��}�0��K�C�9U^95�Ux<����@�^	��VJ�\�Ɵt�W����9xylrlB~�a.S��҄#���i��R&66+����><��f`\C�o&rr2��+�/_?L�:��&#�`LLL��G'_0�ظ�	)g�|?t��q&�&��>Yf}%��c7��
;�	�LO��d��%𚝻#�����W$�D#yT�$*1yx�J�J����+�+Ƙ/r�V�����F�B�j�4�-?�=t��?t+qAj"eF�Kr$1kt�W��k�H����{'��*F�M
w�����.B�lW$Z D;W�B^>`����p�^�S6 �fJ	A,|t��K�S��~��P�i��e��^kX�JƢܾ{79��7�p	\U(�� 1��;��9�8��f��݁��b5��+��i[�&$j�z�Ԥ�dm3C��	��ELq���Wy�UJĤ�,S�	��ڐ�0��[8�&nIہa*b���+[�t��zeng�
R������m�����l"v�4�3�5h�WO�-;��`X�pF�C'���ᯗjMk�0��������2q)��S�"Κ=8m��2�D�f�A�����/� p���	}��櫓�Z��}��b�,M�� ��b��K�����:&�R������\�.�9n��r(�5��Pz0�	����Y��r�ܙLRI�Z�b�!���>��f�f�K�]?�ޑ�g&cw:iYdۗ�8Mj}�/�?�b�y�W;%�E�$���	��:�@�Y����������>�ѱ~W���KTD�{�8T ��r��jUW�y��sr���ƿ��H)�?�f�������g}��ǟ|̰�M�&�>d
3��?������'��|�-�ۗ���Y�LO�E#n��f�����%�#�u�!�E �s�*������NZ~poI����o]ݺ%�\��&z���{+��D:��&�P8Rk��>�G;�s�Ҕxdw�����>���?^J�����p�^ט�y��K�V_` ��ݤa��W�K��1w�
�I�<U�� 	ɡP̸�)4�v��|���H��0U�:�����-<�.&v��TI�s�x%!�/�%��.+C+�-y�Ȏ�m*�����em,�rŝ��6��<]��T��r(�7SM��d�m���-��EB�JU�|������kD��-õL۽�y��3|�F�s����1�X.z�s���rÉ��v��|�}�rg�`�z�p|���>@$n���~y���R�0D�d� �7�O��~e�;t��z�8<8	?�ളGT��cW����2������<>\,�*����}�W��i��{*�3�Nd������y���(��**n)n0EJj��D� �߹�1�9�;e�\�s�3����A�p0?��Ee���)I�ʠך�n�	5x�ZֱNB�,�zoq>�H�h������`H�(A�)��AGc�
z�G>�[Sq��_=�=����U�z�%��9`y{BPAq���\� K������H`�v���#�I8*��w�ۙv|��W�����w;O�"ǋ�G����>@I#�W.�f5�_�����/(�{'�pG�^��o�C�����2�]u����nن�s�g]�Z�Eb6��%�*C�x��k\[����g��'�I��
|3GjPi깎�\�.�WS"�'n�n�1LE�Y`MoO̺�j9��N��밊d�`7;��*���fP-]�X����Y;0�~|Nyr�-��,��{S6Fa	�d�!�Tc���7�s|	&m>>�	
r���v�!֓�{�&)�O&"����s�, U�i׷�K�N-;��Zd0��;YkN��DYx7'�=�Q�����[=�8]�S�� Hdk��1!��a���:<�JD��6M�[T�l��d����W�rO�iB!]R��0d:m���'�Bڱ�^.2Nd3]{�K�W�6�e&���5.����)ɎU���Jv��-cfh����y��iD�ʜ�6��E���1	*<���6
�K�虌�_��">_�=0�=ݶ?���Et�yP������ �?޻s�lTtF��X^`�gP�ftn]��b9xD�r�Foq�F�L��d���~MH��'E�:k�![�:�@��V�DaB����E0�s�18��~�,!ڮ�2�M��EOx"��0'��x쳪�dR�{�$��k�,�����6�f��D`�����n_��ʕ���]�s1�~�}�:���/����O��^kS��?;�kt%wl4��h &락�1�m�M�x�BX��$�dqs���U�Fxb(��jE����ֈ�&t-�	�`��Q��g��s��d�"�}S���S����@2�Myz�L�%.�ɹ�CpŐ�/�/OC��n�by���WZ߰��kF�ׂ��Q_���g�̓ix��;�+�Z�a�\]�(U	6n�t�����.l�a��~����O�̽i�0a�mn��4���%��BFDK��D��,ղj��8hWl*dC`�K�4R�-!:��蔭�b
��@Z� Lצ�d�m�ڪ ����=�������ff���k�����PZ��=A�Hܶfؚ��' �ڂ5�����HR|A�#����1�j��%:F�4Y<'���%��\
��,���f��P�1^�o�0�f^���/��������U��3��Jα~������n|w�����������Q�ͪ~��G^%{��W>�?^�F�U�OQ��!���EuDǦs�� o�@����/�K���Rz���Q��XS�h�Y@ǂ_^�w9�\�K98������~�����_DH�q��F�n�Vȼߕ"�t������!�g��P������r���t�/��ď��;?.�����`j{/g�%��^q�0 u,W��.:/�����n߽wi����L��`qD�Sov���[�tE�*����m�Ϭ�b&g9Q�Ǉ2�|�h^f��^�h-D���Z���࢟��)G����G��&��+X
_�Aͦ�/�Lġ����,|��sV+h�;������Q.���"#�wf�f�7u-(�h��\�;����mƁ����^�nE@_��5+.�,3�߳������h;9,ӣ��(��=�Ԍtmo�G��M�� .����?o<�-&��u]�/�Q�3u9���r�>*.��^b�xwg�{{X5"��0��8x̭f�pT�d{	<�@���i��_��^������۪��ƕ�ȿ�HB]eD�5A� ��7��)�gPS#K����~/6����}��{�� kc�#��{���D�%܄4;�dӑ�(@״�.�V;	����I�)��0����՞-9VӖ���Dh5�i�A$����>�i"�[J�1����TX�ıd|��5�F��NM]_�(�־Ot)=]�5�9fs,�!!���^��Sp܎�����kn��vd��6���*��$dk���z6�7ܚ<�c]��}zѫVz�3���&O�c�����q�Z쇱F�:��$� �?�	�2�.�6B)M
�{u��O�Js��"yG��b(����������g��٧=����ړ<l��f{a�Q�\ �-${��w:�^#U�� �F�l!�{� H���7���4�@@a��� ��K�F*8k[���~��,�y���'S^3�{�����
tuX��#�:i<�C�|ߋ��/��U��۲�Mj�U����W�2�"���<¹BEw�^�a�U������f���fy��Y�+F�I�~��T�ROX~Pލ
�DoB]�Z�xE)�>���F�<�����7.(�5lwo�(;�۽��n�_��o>�Os#�}+sPʛ�8�~��O�6��3��FK
|�ؽ���N���	��%���|hU���W�p(�VK�TE|�5H�+e��K� ���Uk�^� "6��r@P
)R.`@�X`���1���>��ν��+d�A+?�un�lڼ�@��A'��^�ŉw0=�7� 6.<�۝�&S���� �,�O�kv��RL쭏.F���ѫ+�k�![���t�# �^M���,��*'���h���8�5x�8�y���ㅃ��B����	]�%�?\��7�p�%�f�@��yъ��@"��<�����
���u���z{9��(�-�~s�����<�F-Mr��с����O�h�7s��2��@4/�ki1X^���TN���O�E�{���b�:�a��$X{����H8��?�L5�gi~q��q\h�9��$K~DL�O#�%�fŊ�)M��h�=�w�-�\���E|uJ��baS��ߌ�60��_���7=@��f��cqjX$#���#;�����)��F`u�13��_��<��!���-O[�4�M���N���N�b��VĂ�o8�H�@@�Ȗg0�Ͳ&����w��l��N��I6�v4��鷪���s&�SR�H�)��ʒ ��^��/t&�%�'��]ɘ~j\�rJm��2�2Go�)�ݍ�ϔ,�$�	�*~�;�^��W�W�`q���n��&�O���?��Ae˭�PuQ\�s�O��6��7NM���kq̨i���*����u+%���Љ�`V�N�N �j��R�m�9�N�`������ĨBR"��
P���Cۯ<G�#�#S0��);kL��b�+� 6N��r+��V'��H�EN}�����P�5��F���{Q-x#������vAk��E>܆��oLbU՝P�A�6��{��Ts�Z�9�\�g��W�����ͽqtD$l��m�(D�HQ*Q�K+�I��6�B���WIw5
��U8,�A t��ЦI�����4�Z���T����@����w���!���T��2�
��F�vi�~j
z9LH���7s�k�?VSh9�b�Q�X}	�9����bx����u���b-�>�^��9~F�E��1kQ ���}�Ī��x7��|����k�;�� ��2���яfs_tP<obI�(I�gWR[)^S;���h�U�;���0��K!��9�n�2��e�%��4
F�������N�G�sd�3q��QB9��7�ѣJ�����3�������5��� �45ϛh�1P���t���F��iu���)������#��)�ѕ^燆��M
��a%jpf����m�m�Ԃ�2��pkf�xg��c]z�]m�m6���J�H���O���뵩�x�N���t0_t'}kD�m1  ���8��R�
�V^l`R�H"m�7��G�3�lt�vl3I��ц�Mߍ5W<���k�N̮旾(�uBӚj%X%�?��R��}-p������0����u
�j�J��)��ԇ��=������������V��� 9������	�0`.�%^M\�Bl�)���U�ܢ�eeq�Q��\9��R\���[_Kᙳ�����J�8�b�Tlj~��AՖh2X��4��o�e3��h��T��Bp)��o�c�拯�2e��h���H��:%��"�D}���NH��3�}��@/�;�t��ء1~ە��r�� ����o1�|�%��[gQu?���[�0W��yW��{7�ԯE�
�Jf�'c\�?Q�r����!�[2#�� 둚��tV�V��L���&�s⮉���fW�-�wЭS�#�PE�����D�.��9�-bWs;''�R+=�f�V7��C��RK�y�����w��'������G1���ZoE*�_�}r�RP���\}= 0�E.�^���w���ԄY���38�/Tx�y�U3���n\СA�R~d�1T&�5���z�ɝw�<���1�ژ�wP�0�G��*�3*S�k���6�w���Timj(�����8�ʗ,\�d,$�nH7A=9�-�yhq#�k)�? U� ϕVz�|/�E�w�ʷ������#~�M�7�f��ׁ(,�6�,S���������d�"�E�xux�D��Qx�QV�'WÝ�J=>�\sJ���Û�Õ���
݃!n��*x���F3�bK���B=��dB��=<A�'�L<�1ÅT�3��Qm�ذ�Z��g�l1a/�}�s��X1Zj��v`�.שO[�3���D�fHnC��O�֞^�Ԩ�+]&B�ڎR��j?�]��5�y��܆Q�j[ᑆe,��CxV�ॣyO4�o˳+}���(/���>m���|::�����R���k�B5Gc�ܱ���y�\B�N���.oȃ�p"����71$�}�	���`M>���ݲۖ��Z;e
�+a�	h�ߦM�v���:\*��4H4���{��D���C?׵�4j�+�)�6�{���+Wߴ^R�gJ���'�ǭ��cܡ��*�:=��KӚ�����`�Ң��)^�X�I�όڏ䲿'�a&�?�v[�me�y=��!Z|@��J�k��9N ��\�]@3e�\���;+_���!��SU|";���]k��Ml~l(h�o�!��)�葭��u<��HO%Hs����NAdzx3�]�b�>2k��d��h ��^ _Ɖ�j
"� #���2<�k��u���-���D:�9Og�+�3��wcN18���W���#�E�km�����+���<��^��!��L��7�Y����,��x��_a�hC���r���u0
sh+������MAQ�3�4��^����� �أ��6���Z�e�L�+�K�f_!6K����`/�VO�o��D�	\�����W�_��7^>3!��^��)Ġ�s|��)>�T�E\9��S_�)���>Z���Fv.7r;2�܍r����*�3���$����g���0=�';�</+�u[���>a�tQO��Y�aL���5�h���j�B��8 [��6���9���=�b��T<���C�C�y?�B��vߣ�1.�
6�tc�H=�Tۤ�o��vd��+Nu+��g'�3c��G�IQ�#;��>}�7��x�m��t%۹��95SK�_-C���]G`g|]k�܌�+��r�x��n���W@t��1F���B�qI��~�^�nRn:Q,�*�����l���v�o�6@c�'�Pۮ�t�(=�I�u� 0��|ˁ�:��ta9B�sz+�c-*��C� i`p�G��1z6+e3��|5�뫭�*� ���yF>=锸w�3{�yJ~�6�fٌ�N��;B��u�!3,m� �E�dK=~?&�m��*��nZtI-^��Ǹa1�:�N��Z�#�<O��^�'Q߻����	�����AU?n�4%
��y)�V&-VT����?��Q��mG���������HU
��wչt�m\N=����'��#$���+�1�o!h;��6B�����Sh[V�N;�d�r���(��K#M@E%{g?SeC9:̂8�m@���6ŏ��Y��[�>:7$������Y@�
����ٱ'��?'#��k9���!�*2�����W.]���3�jg������y)��y����Ok�8����C�U;��+�"�r��K:t��T�)Z)��Y.����k�{�\�դ�?��j)aX�E8�̽��7!���<\� cC09T{��Et�Ĩ��Q�&i�
��"��5��O�?=��g*>s����0�l\��_f�;����U%
j�j�)h���W<L�
�ٙe?�����4Y�fX�it�
�dv.���>��R�V=a85V�1Ԑ>s����sp?;$t�O��v��c����bS�������&pG�5���CK{�{���xo�ڳ����Yy�g�Ȭ�#/;{j�w|8�y�r��wG�ey�>P��q��˛%�&��{J����(�o�fGY�SX�N�1a^�i�������t �]�w�$VZ(��q>Mh�AZk���\*�����ӶM%է�XMU~B$O�Y:�Ϡ�o�qk�,��NX��v��PuNt�wP��Хs4<4�6$�P_ND��S]�N��B�rJ`.#��s,��1����!L-������	�(9R�8J8C�����S�()6����C�.}x���1-}�/�h�
6�wU
�Q�D�L6�%m�;�������-�ܩ�k�OL춫�#�����j�w�?�fu��bnB0:	����D���$\*�S�Vs�9�s.U������*�?n����ˁ��W̥&"����"����X�����y/��f"�1+i;���ߠ)m}m �y�;� (!S-3>�y��̰��$��3?��&8Z�������s�^%����U�4o�qmk,����K2����·��C�'or�{�:.�[Q�[�j"�$�Z7˝6OS�D�ZB+��8��B⟥8��Yq�(rQ#�t����\�1�F������b8���g�S�e[s�= W�����������R�-7m�������O�..��G���E�b��u>WUR)����IbȘ���a-ǯ��b���wv�����1[��E-��۹�(��	O�D:���WKp�l���X-]��������zm�����ի�[aJ
�D�oA'��,���Ѓ�.}�s�(��84/<}�u��W.���0��&�� H�z �ۿ�����~'��|-Y��x��W�Mj�@W>�[�� ��S�Ӭp2{x }\�/P�xk\��m�ksD��bؽ+�М�7ʨ�p����M\�h&Ԏ�[
S����M� #^J	�u�/9:'�队��<�/ٟ+���v��
��P���=xg�}�Վڀ%�
ʩ��y�`4����AE�sĝAfYd�X�H��b�hc���J<�F���o �fp�-� ˚��D2�:n8����$B"W��x��$Q-R���3�V��FD�^e$�ם�$
ϭ>�u�����M��Qv���
'�L���=:r_�|vi�,/���0�έ߳��6�t>�DlHz4>�i��T!]�R��M�ZGk�Ц*fb��+�.w�Us" ZtR|��U]������{�%>;K�󾡲�Q^�f�0�>$1��}�j�iW%���`H�9Y��A��C}V�Q�N���܏�
zAU�N�oBME��o�T��p�mz�����Q ��Z�r�Ts�����p���jd���ӭh;p8�^��*;��z��G��ɯ���lˬF?�of���Mkʩ���
�Q�
�(�5��[�}?�z+�k���@�5������ڻ���g�M6ڈ4z��F��P\~�}�|8 /�ƴ��f	n�ϝ��;��A'|:�bJ��݉5�_�p-���ˎǿ-�W8_���7�/��3���,A	�͞�J<�2��X���kn�8@e4L����%Mz�`��s�G_�]�"�GHc�w�k���Ώj���V�8�~�[z��,����t$�ީ�o1Y�J�&��ڻ��4�+�����M(�U��O1��|�
e-8���yKč��Nqo�8~���z�Ȥ�)�Ҳ�؆ x�'ɰ�?�����a�l��4^?�<�ܺ�Vj�pl�~^āg 4u@��n���%Yx��V�N�4��z���m�&5�DXŒ��Ovd��-����/���3Q�ً�&����#(�|HF�̯:S��L��M���j�3�E�Zb�*�J	H3j9�S�ճD��6sA���V�[?�w:���k�_l3�\���ƨ��²�sa� �hCE#�m�����gX��S��\�v��L)H�^��A�^��C�;����ƍ���p�������#�m1��B�Sˏ���_�:$�E�/:��y�U�${E\��d8� ���*,����U�0������0|��z(5v�4�<���[l�{�ں��1�Z_����O"��9�:(��U@��<Gqv� �)�us�y�WOa��s�Н�C	 ��ff*��ů\��H^&=�T!1��)��Y7�m�`���Ly�N��˟��pP��=�TC�  j�s�u��'�0y̭&T����D8���F���n�<�}�;?���X�7Q�e��7����3]:kn��l,$\G�fڅR����P���ob0 XaY�����란�Qs�|r�{n6���q�8�9W�V$�$�΢O2r*%�	��)�����*��W䇍�W�f/�J��-�_�yA}g
w봁afq���ޟp)�D�I�M|���uO�k���/�Ytf��b�kliEY4�:�~Vd�3�������&c�~�"����T���1��LTҹ\��0 �2�Z�(H�d�挅ߌXWi��'B���7����߻`/����(��%�2�A��ǯ��ƟaIN�r+��<[[_�Y�Yb�����&��R_:59��̋1R�|��)�/5��:�Ƨ�Xn���9ƭ�������p�+hn�>%FY��Xl]d� �*T76���D:a�!�˵3.&�!^\|Hb\o����vH���b�-aפ��^2!�:� 3t�F�	�V�H����:��|����$��-8�	������_Oh����l��N\���V4}����7 %!U��h�)�Ef:�u/�>��|P}-ĥ�5��3��O����?ԫ�蚗���G	�I��S��9�Rm���x��	V��p��s��������V�[��A��~��_K>ٱ@��sN�����=�����ЧO[N��x/_���\Zc�Ja�@aC{�T��D��:$[y~�y�YX@B`P�����/�gG7�YeGpg{�����R-�jxy�Wp7?/���H!K���;��)�
7q�E9}9�jAf�̀偳��b.�sh���t���� ��c](̉X�ly4�.j�����{��Qd9�0���B\c%�2�O����gқm�L�h��3��:��/�7�ҨT䩖11�֘��p4N���D��p瀋w����l���v�܎S� ��v3vq@�?��A��_&qNЦ.���NG3k��9�؀6I�r�-&��p��$(tn�5q'�]���v�L!F:/�U$�Ԃ,�� �B��E��<��^�ѯ��~[�0��er����ǹ��8=X^BD��	ǒ��7AN�v3q,p��K�}�^.�����q�r���h�����z#8 zi��{�}��;�=�A3ߥ����j����uu��ß��Ӣj�H;�l̗�a�l��������']�4�%ji?<�r����u�����= 
�����[�J�䥌�"����_"��˓��t>�B�ŉ���΄����8�0��ݢ>��?"�5b�7^E��8o��r�ٝwo`S�/]�q͉5ҪN�������"y��|H[�/'s�B-b1B3�\K3�-={���op����A�C(?3�EL��:���O�u�ʦb�Hj�T�+�qN���G�0��5��I� :�K���g8M��jWJ�J���ԧ$� ��×��[W�Kw��sj�sK5f���Z+0$@�� �����q�3$½���c���Qf�&B�,R�c�c@�F�Wqq��&���B4�&M�ly��m��jd?��3ix�QYz\�<
�����A�s7�u ���J��_c2�(?��9����J+��љ_X�H�ĺQ��c6�s�#3�,�k�V�-5l��)��f��׽mEy{�H1��|���|fowK����Do#4�Ŋ˹��'�Q�FXj^(��}�M���Ռ
�
�m�8� ����ݧ�'&B�����GSB��;+\�G���L�i�w�@Խ�t�NG��t>��iB���N�t�rgZ��n^��ge/鎉\!N��U�o�SL�����D��-� �h���d:on�Yw��ر���c�˓m/'�_��� ���/M�>��I̛�l@�bb�l�pQy_R�������Пs�Jk�gao�!�Eo�*g��@�h�GuVи�8Mlm��7|��W%)���x�J����٬�}u9�[Bk>R1}���Ǟa��������
�	fUxc�X#(�}$�/�Ь/h�a�A�1��rP����{r8Ȳ���)�l	���}�.Q, f�KB8�i���\����_�/�_GO�[��5���ʥ��Ζ�.�Ζ�\��q�e`B�4))�y_��нy2A�	��?b�,�q���?�7Q���r�>�0��Pӈ����mH�]�^�&WQiW�Rq�Nt��q�ȌB�ԉ�=޺X>
���[Hß<�u��僡��!_W�*
Y1�W��x��WX^�"p�׍:;����;�E7�G�[ZM�2m�3}��6o�o�:��4Դ� ���}h%��J6���������/Z�F�r���W  C�E���i�bFM�+.`JX�\~�ʖ��\�%>T���ݻiޞ�ɞ;<XabL3k�5o�u�q�ˉ@��X�2�>d�U���6�o�zc�%���PQ4_�� 3��s� vD�0�?�-)�)�jH�\.�צ>|&����[;	F4�-��"�� ��ej8D۠1��.ʓA��#�þ�(4����Dʀ�" �T`����XK�'�iXà���Bh���hg@hA���j�D%O5�B�_��%Rh�0
	�����ן�ܰ�tycO���H�ŲT7B$�Q�"1#��0�9�,�ExVi�Ә�zj�<�*2�?'���=�D��N�w�Duq �t�?�V�	إ(��jrƦW{)]�ڄ��b���,���ھ3�k �]�� �X����"�"���,�sxo(h&�ҥ��v����Ζ0L��Ke	G�a6�3���&���Z�4Q��"�86�`[*5۔�~�J=�hT$���щ�q�MWT�����*��	ejN*�=~>���߽��o�7'TF�(V�S����k�}q1��^~�H"�⳨���&4�9��%V$�+(�[�q<�n�J�5
!������ C��$�3��0$W�0���I��-m�C�ă�%�Ns�$i�P$��(99ŋϹ�"��_OaϏ)�\�������S�Y�8O�I'��Y�Ϡ)�M�+�Й.�I�Nѫ6�M���)��	���m���>��U�Z��$�E%��䒨nƃm�<�WX^������M���*(�&-�lNҽ���	Idh<���𥘯V��T��S/�0�����9
�$X�X�U`P����Vi�1!��g���V���� q�R�J#��t�ӥ`�t�3� �o���$J)�L�.���>����_;>�����?��_~{��w}%R6k)EC�.�7�G�nCpHm����j܁�j^՚Y�S�>-�6�dW�8̡�D~X�g�J�*�(5 T:v�L������>�����9p".%2�6 iT�^�9�"���i@YyE�3H[޴��0��C{���4r�豛7��#
SE��b/���Y5�#{c��G-۱�-�2�G����$܈
��Q6]T�f+r�d����sp����\B]��4A�_�ԟ*�j�bh�����<�AL���\Vl�J�vU!f>Ut�k:p��YIX2R������P0�|̙������o��Hr�"-5O�8����A�ܷ�f!��s�����-=�;ۗ�XȼQ�T��ƽ$��	�~n 23s��T ��H6�=d@Z��(w�Rٹ/Ҵ:ڹVѵ���xo%8�Kץ{Xqg���J���	�ݍ)�\�=���#����K�l̞(L>egS{��ȟ:V�l�od�D].�`<_V�F�M<w�9�G'R��1G:�i-���c���dj+][�x���q�v�n��WR?�E_1�q_�Y)�G��k��e繞��z��5�Y�=m*�ʥ�®)��`�`�b���)�[��r!V!�U窾�2^��&2�[g�����"�sw��¦Z
�dy�{'�_��V����Qt"�����l0�vs#�h�\�X����0EmC�������=��'��^� 3c����.��)�P8�bϠ�l�Ct�.1Y�}��X �U����@2�˛��-��i�Go!
�h���T�l¥���*��!ҷs��E.�ANf�H�SL��Z��2�u��v @&馧��>&��tu���@$�ldJO���N��|���ܓU��O�LG������gO05m|�Ӌ��9 u�Y\" c����s.o)=W%4���� �2}��믾��OII3�8��=�q9^�O��}��U�\2NV��A-lhS�m����H�����-�r����řW�o��i���*���*��p����>]l��{���d�����/~���������._���Տ��?�0.����})s�`0T�z+�8��t���,��f����c��ۿ�~'�l�>�۟�P�
5�:sš�:qy�od��FhZC�E(�b� �h~!�����A2�2'�;�u��	(�/��We�Zݼ�.	�W�VoS����č����\>?N�=�V�W	��?%%��Bk(Z�ǚ���bunQ}���d�t|�iM��>�Y�zl��΋R����%���'ٱ��	�:�4u�ܹq��?c
t6!`=ڶ�*S\Ԭ�+Q�m I��c�#o��E?���rD�z��c��{a�&&�9*Q !��k�}������B�^mO�V�E�11���I�kX�]��"A!#���F	 Q�j0
�U�LK���ݛ�wc����q���W�(*'5�q�qGUZ������"0
J�&)�R,�o��癙�;�n��nonwvvfv~���s�e���",��L�t�)~dp��������6n��m����R�t]%�
�T}9M|a�E����D�﵇R
���xw�F�	�\m>}59�Z�&d+� z�O�7��[�Y:����,�,�I��w	Ѹ����١��6��.I9���mAV�9}%k����X\t�^�;�I��\�����{J\ ��\W�wJ�J�,�Ou�w
$�x����6�T�ֱ�	�d��*ڠ��k"&g� �J��JJT�ed&t�|m��
,�N�$ސ_l�z�8O,�F�8���E��ıΟ,��S�[U(J�e���^�,"u3�C-Bk�(�ä�1��W�b����{�_f�&͂�T�xu��VuI��9A�w��п���0���{�JR��7
T�ܼ�"w"���M	�}���W�ݸKEl��	��T��	�)�H��v�\�vX��/$�wԓ��D��@�EX�+�����0#�nU>L֘����q�𬏢Xm�F�+WHaW�������]�u�S�d���ku����2%GрN�
�Jʆ�8;�=A=�V@: jE�|���p���O�z�o�#K�:�$Þ�G�)8f�"^�8Jߖ�hėgg��g��3vp5�P���M�OF�{��u���@��]����a;_��
NO����t����-�T����NJQ�ڊ�D{$d�ϵE�s���X�vl��@HݻfoD8Ͳ��"�FWޗ˒�p�S_���I��Rv3u����g���0�Ձ|�	�Q�_>��������ˢ�2��@�=� �TES0� ���|Ԙ���]�It�[ˡ�lװ���B�~ߔq'����8)���S
��%�' �
�R�kFi�N�G�J�]��ēYv7qZ*��"/��<����y��Ɓ�M�qF5��/q������3o0���'�:�6_�g��H���<Mf.�y,�x#�����e(vI�A�]��?%�%�)\de}�G�}R^��d�r��`M��
�)�q\���=g�uPd��V�Yeм�P��\=_�g�P�1\����@7\�|�jy�����i��̏T�rڠhm�Li��)g�hMIW��5SO�R5t|��V�+u��?�8�CH!/w�����ޜ!x�)"G)�Zk�#��OZ�k0�	�%�o������O���p�JS�:����V�/t?���nl�l��qA�Sq������V5�D:o�v8�x&��_^ ������̮l�muº>��I���T/��#��&��9�z�~��}\O�FL�Ike�rx�PT��n��EnF{8r����f�}�yMM2J�nu�Q���K#(:��ZS��tƠŜ�,��	�
�r(2����K�oQ�I\�f�p��7���~е����Wq��>}L����u�-�2��OG�E���@$�}��p��
�I��1.����RY��2$�j�R�n�8a��%��Zߍ �	�V��Qn��m�0 ��j3pLǒ��[�hf���>t�������g8״�c��s
/Ie�m7���`m���IE.V~k���y�Wl�+a����9~s�!]���ž���c���啦]zSm�Y3����6r���4菆~BIDϠ��">�Ew���.*ZE1���)�
�xO���S6�E�E]n��5yY'��JJ(�'�b��*�tA?%�tη�va�����Ӫ����0�D��b��)�IF�]��˄����:m>y�i<X�o��`NT$���wd�`3������]dRY�^\.ҢPi�Q*3�]�d�$@����� .c�+�o0BEw�����r�ދ-��)�e.Fe.:/Ot9,!;���ڊ¯��[%��\��_DY���N��p��N����֡�f*�A�������H����I��F��F��A>9�iz:�gP�IC�_U�id>е��h�����"ۗ����R��;	"�4�y"�&^گ�J�2g���ٱ��ZS�+̐��ldI'�`�V����j�j���|�z��6�Z+����M/�7�<ںvBs�@Ӳ�n@\__Y��� 
3�k�E#,ܟf�4���Q�D%��b�x1YE_�*�HQ��4����f�j��sqv1רP>�˽��ҥ(,����h������2�_v��@r�"/�7B˧������
EY�c��s��w�d��2���I�q�$�$���eS�|H�#)UN�%l]z"��@OkeY���~ ��%Q9��]fu��oߢw5�c �>������4�s�		Z	�t�X6G��W�r�����J���o9t����)�n�T�cM��,��ږ�iZ�X;�>��F ��uP�ѧ_���۸�J jP�F>SHژ"/�<u��;�U��Pj�������9c�LU�Ш��O���IC�M���	�^^*͈��T"_:SG���儹&1b��H�[}j�42΀�8�{�%�Y�l �{���6�!dV��r#̢�́l�����	�x��L�y����r╞��'����D1l ��q�s+�5���v4jzB�w������˷n{��B�R��c�R�M�[ޏ�f���5{�&8��m���??�֐n�LH
�"�&�%�v�o��@FE�/�2dr�ȃ� ��E����� !�NX�Q&G�Ҙ����8��7T�&��Dc3�.x:����0I�'�Q�9�����@�	1�H.�I�v2.��g�+��?���$�Xm-K���!ܸO��J5�'bm}��?�_\W��ߞ/�&G�q%�����j뽱�BY<�W��};�S[՚3�CyeQ'��k{������#K�L�����'�r��3�����xZ�m�:j+C6����Z	�W5s��e�
%��U����̫:Q�	���r2�r�PC`��X�v^����X��֯���p��p�#��b��d���ʽG[^oh���CT���n��۹>}$>�D�Q�@>ۡ�GE��( \+I��j�9i��d<%��T�ܛ�{�q�EN��
�B��>�0F�=�fq�E�4�&ɧ�ǥ1xh�f��N3��~��`�Gc
��4_���}������N��`ha9E���r����ш��A��k�0�8U����t�ѝ/?����˖w�Խ�%�n��:߫�{8�.��=Ɇ�\QR�|t����-���/e��Ck���9>ޯܱ�Y�:G�w���X�����AC�:���
>�x�x�Q��p��1��Cv�� ��qC�A</x�M�H�^n���d4
��x|�~\w���{˂3��G��S�-n�v9/���o���Mg������>��=�/.�{�M������c8=5�d�ON�"]k���S�l�]�6N*�j��Q���[�.�_eJ��Ybpݪ���|^3��>B�\0	�x7k��/7�GXb/VYXI�׿��C"!��S���0���p4�5wUɗ�����x#����CEd��o�$2ͻ�O�y�<C E�j�q@��a�@�p:�(�7�Ą��6^�e�AEP���IK^زh��'/�ΰ[1z�䷰�>#1��jn��t����ԫ:x����<�	���_�C��h�`b�b��(5	���Oupc�6A�x�:��*���>��rwT�����x��M�A�R�C(▷����{�dd캭����Bw�Hꀩ�l�pHe$����l��ң��wa��#k����/E��jZD,-�rb���F��"m��B;4A�&зATG���c}����D̏����}08�������� �)Jڸ�qܷ�D�B����N��J� Х]J�m�9t��]m����������^��-�m�r��n)t�SF�Դ�ku�U2Os��+��羋��R	��H��ꭧv�E:QV�$VN��3�/��`��� ��Шjf��G��v<�O� ��Z�=T%ȵ{>��$�H�#�4A��s�3O0o�C�����Z=k�\��:���
��q��qFbȔ�0���ꤿJT�+����P[ѼGx/T�	#������3t�j��>bru�,^���8/f����>h��x�$s�.x���َ�Q�E����͇�@�9��R���n��>oC3M1�1T��$2�C"�����PnR��K����ө���/��?�{cM��x�[�c�7y�ROE.�r|ȣ'��{!�$"c;�6��&:�A��r���x�m|Ĺ�� X�.����)����c�w�2�ͽ�^�F�z������0`1��s�|2[p�.�,;6�Q��ƙ��4I������t�S�~�#���j�9W� �ެ��o��^��`d�T��/���Y�6�1n
��Ğ#U����W3��ǁ���g�9��gK%z��:Y�C�ͽNX��ʹ��E!����(�Lk��Pc�:��m�LK
R"��j}�;�(f��`��⌨!��גӖ�B#
]����8_�W��dߨFV)����jݙ2^��b�������z�L4�N��J���W�2o�\s�5�&�Wt��g
�E ��3��$�&5��yp��5L����w}~9;s�!�L�A@�r,t4R���y\�Ao
!V,�cP����P�q4��d����bN/gl�8�~1C�g�!���<���z�%L.
�,��F�"��Ɔ��ܼ��Imj��g�K�<�I��&?������D4� ��2��91��ھ���{=�]|��`�������P�����V��y<��q�nϭ��Z�Ek��$hi���yZ��YG@<�~����N���qٞs�/8���nO��xp�aw�ә�Gf�c�Ç^����9O�	�vh%n�X5m<�w;gjtL�@�+i>C1�r�Ha
3bT�O��ԈP:@���e�£��Σ%��CK*BKgUg��_�@`Oc��h����'��o_@qp\�gȍ�����ѳ�3f�F�˜�	dwgG;1�0��:���>?]��qš8Hi�߆i��%6)Y��9�����
�����ܹTAE��K��I�擳��2�I�>�����N��'B��"���/��� �ٛrpH�:���2y�k1�Z�9	��k�]j���	�	�]�R������9�u�R���I�Fm�ځҠЗ9į��&�ϐm"�����^���ѓ^�����]���g�/���`�P30���ɰ���џ�k�(�u��E�wX�7��< �'�����x�1Lٟ�VT�p��9��B�L8/�[���c��lsm8��ϗ�H�v�8�D[�Ibl�8(!Ƿ����<���n��M7��s[�,��]�~�"�I��J%`��:��W�CGF%4;\��[3b���G9�@�T-h�3�'��Y�� 2�'�M�X ����7���B�4`e<A5�7=s��	p蕋��i��D�`E�3Z��������!��l�����������������/�����j�V���m���m���;�$��X�\c�`<9K���S*;�^q9��k�Zdi{��BZϡ�0�)L��n��y��ʧUYa�����C4���u�O�>�D�O:�ѣ���8&��'��=c&�*L�d�/�Z�3F�e� �z���x�#MH) �ip?�{p�Z� ����;x4@y"�ݏ޽s�cHE6���"��Q���^L��9[ؽZ���;W�o/�oJㄞ�VU3��`�?����U.���o,m�p�iC3Yl�W,�?Fb�l                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     