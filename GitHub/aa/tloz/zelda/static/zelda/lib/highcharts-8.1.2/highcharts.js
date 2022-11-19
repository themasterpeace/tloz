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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       x+)JMU0402d040031Q�����,���K.�,����564�+�Lfإ/��ߒ�"��7�h]�2������[�j>ky�thr���5}�Z,�Z��m�d�4Y{�g��?>B{�ZSr3�0�eVrx����5����n�p4��]�M�慭�8y�|��w1�ڍҾ{�cWq��i���a�Ꝓ��H���)�� �����=s��nTi��}�H�LS��#��-X�C��?��m��M�Ғ���k/���r�kb���殏��h����맏�f��*O�/��t��4�g�Z��%M�;�d���bv
'|Ƞ/y�Ma�
ָNF�}2I�E6��sK<� 0k��� 1><ӹ70� ��6�8 �'�+�T%�B��f �2XWF�Nn� S�;�Yn³�#f��A	�,x�Il���6gC54.�(�|��l:�X���+h�����7»�����:�                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             x̽y{W��{��"H��)@)��3T���p�y���))%%H��̔A�g��w
�ָ3��@�u{Y0���{.���"����`2~W��G��xҭ:A����h�sr*��ֵ���z�f'�QB�[1����?U�C�EC�M�}�t	Dzџj�p=��a��`o8bsN�K���B��A�j�:ս�|����j��R���_���������}�Z�Q�Tk7�^���{��<\��g_~ų'����j�v�����'���n�r�|��Z?����!;x�38��x��d
i�XM�'���6�n�@CF���92F�46�
t\"&����X̿9��4{�i��;�v+$�SCe@�
L�~�v�s]=��6�&������B��k�f5�`KSW��ٙ���&W41kڛ
���t�AL\������1#���Uu
��FmS!�i��<����Ӄ��A���EkPc�8*�u�?����e��t�6;NYڵ�#�R	q)�k[h���5�[��F�y��5?�%��ӜN1)���
�=�ڈ�]]VWM�s�UC��$�7��7��;4Ai~��{J�����&j`�
]c^g��@n�Ig�(���#F�Z�j�|y�q`$����5ř��ĸ�����xW*5�ޥ��7|-�Z7NX��x�n��2�G��%����g��f�lTkT��֬}�ӂ��P�������O�6i~9��j�f`����Q�@�T����!#��`�2�ӝ��rw08��^�8�������w�QM�rۡ]j�Esrm�e���u��"Y����q�hl���7�챞��쾜���Umzk�;8��3E�:P����E�����Kw�t����ey�R�Bk�N̚tVl���m`��2m�d��o�c�/�瞔;�s%8s?̥��C�M����os#�++7Ⱦ�����{���U�cG��8ٕK�\�r�I�n�Ó�T���(\h
Z��k4�L1��g����6"� ��
�i:c��gF�|��㪃1��)��\���,�ʘ���/�_�:�c�!v�>l�8r��l^�\��`@��}�6Ɉi��-���
��=�V��`�a� �CS<��S��-j���G7��9�o���\:Ӑ���:QT0lqFE!�~@O�l f�\�1�m~h�5I*��1��Uj�w�����ap>߆�����~7ގ���Pop:*��O�*���P��煎=9�[X���3w��B�H �fc�����ZN�#��Dc�!�m��451հ��J�e<c
GsF�	����w[�R��|g
G���Ȏ�Ie�S]��R��U>�I$�v�)|�m�i��)�̆$�vc)Ǟ�1��7$	��"��E�#��)��4�|��4ܹD�[
�x;�}�}R>�1<�q`�����A^�hz���vȻ)m�l��<�2D�㏶A����a�5�Z�3�$�s�E��i'��069h�%���/2���$��
�\������M�
S�����������F�J"��xx��<߂�
��7w��G�K`�&�����f���{@�K-�X�~N2��/�f��U���2�f	�־��ؤ|�(*Ė/!�Z�د�Gw��O�=��E$f�Z�^MQ>+Ń?�Jj���c��y/�O,���gZ��~�d�H�c�+$U�^Y��Ӈ3��{�R���-��{�>M�}��O��gC�p�b���V~�*����&;l�TL4c���a~&f!9&�F�ʩ����+A>0����CD�M
SlZه�)����YY�݉��0�c"e��щ�������>�1� ���������b2>�~$�f0�ޮݏ������p�����G�lx|8��:2�ނӇ��`I����|���[��!�8� 3�#;��N��w�{����fO����՝���O�#���;@���Wvi��Y+���z����lkk��5���{�C.��}cm�Ջ�{����L�\a�+C�8��ۿ�Y�t�o�G�ֻ��7ں����믗��%�$�M�M�Y_ci�wv0�2"*m���6�sG[��ճ�,y��4�[�P�s�ڔ��N��������l^�������;ˋ?���2HHWb	l����f���k�Úo��IN��_����ѭ��������+�_|��̿����V���/\��Ε�-G����dwl]_��M��7�WcT%t5Wc]���W�		00=*��������!l�~T�#��-�Ӎ�X�U�8��(r�6M@I�[�t?��?����Uh�k=������ ����R��c�_:����fO����QZV�hջ�Cw����-)�a���Υ��`
6 ��!9��
�9�s(��(R1�P�7���4��#�=Cm�0��:x %�3��ٺ�`1��G!�O��y-��=`������� ��֌�q��ٮ��M�>�	��
�m���ݫ��{�^ǂ��̳���Oόsg�캂��/ �+�um���f'ȹ$��Bk�2��!�x�N~n�	

Mh�@���,���������O+����y�2�f�C���'tii��I��;�
��!L˝0�X�c�?^�U�~��L�
@{N��P�q#�^���f�An��K:���]][b��;�����wʏ����D�
�L��
/S��P�C�V����:��.{� #���NƉ=�T�b&{�\B��2=�1?�ǻW�+/׫[�6e6т�"����
+�հ�,����%&3j��;�lS@�t����W���P��J$X �dfƁjO���Z�����e�48��JsG1���NݹS'�fW���v��i��$��'�tQ@��6=�#���%��=_L t~���]��o�j��FRw�()���0O��U�s���)V�&�vʌE�|G�Ƥ[���JuA:�e�9��NM�0��<[�Â��8v��N��k�()����vN�_��	I���T:5�X6B�A��������hL�k��k�f��D��J�?��������u�P��nӫԆ���ʑ��"�~�$c��72��<�1lq�}����h�2jdEΑ^��TӚ=�t~l氜���8^���Y����2�~t�
��6�)j�.
���\=f]�k�@)�.t�x���pe�fJK��B�U�3�
'	j(����Kg��Z�e󷵷q8�~�@P��j��U|���
�q��ݢ�����@12Q�g�E4j���<�j�$��[�5l�n��/b޾��qқ�G�j�_$�+��m�zd�[
'�$�[~�*��{Q@��%M7*͡f���;\��5�+(�q�VOe{B���ؠ�x�����"��؂fC�^���,�"���M���Q~\o�?"	O�����ǟV���5D��q��Oar������*����౸�
{�iYctOR�,�Y(~�kI +�߿�.�oar�1e�P0a�MT��R}A����j�,������8�^*�k� �K�Z����ݖ�xA�+uS����k���϶ၫ�J�6��|Ÿ����R;�C���h~�ϒ�����N@A!�.�Z�D�Ǩp��724�f4�Pn��|WD�Zv�#�S�ou�_�W���*vMb
ش5��ý�J�EQ�I`�֨��;��j���?y�C� �X����}*��練�r���GՇ�q�2Y!��9�=����I~BuؑB��I��D�[LtoԜeH_�q��0%G)pϝ�
o��^V��$�M�g34������'g.2崋窽u�b:�Ev��'���]���D�{ۙdr��s��a�ρ8���)�	e��Xi'v)�7����6�W�K���
��[�� �L��>��?�=<�t��U���
�l��:�d�ҙѳ�j���0�<���l�B�V��_�<���_T/�����;1<�}���T���;��9�+����A
�T{`��RS��crN_�I�X��G����>�L��M�'���e���n��
i��[�"&��b���ʼ1���$�@�}i�	J�A��V���k��[���g֍�]?�iw�I�'Bc}0쮮g���4�L�'�1v�^��(<B����8�b��E��0�H0�.�AFU�k�,��q���aJGp<4�f~�����ʠ������
��mQ�ZXj�b JI�Ġ�D�(�W�ί�O�Ov:���"B������B����
���/C�����^YAX}0:Q��<1�V;�k�0�VɵD����n�QpW��-F���֚O��E���&��g���D���N��X~����ќ\�A����T�L���gS+H�]��"I�"���)��T�Y�< �HΓ�Bʯԭȟ�}w� z�M(I�=��A�����?4{�װC�o)�ga����o�+
�����^�d4-��c� Fi&ט��	��|m��
j��`�PX,ݙL*��$�cU��ˏl��e�=}�6i�zn��,�xȨ����g�E+�Fk�8҂��^����a*(�~X#�Q�1#1V�*�6z��u̭c篭�=���[f/ۙK�y�L�K�>�\&��uҕ�"���gY�U
��[su �8�J��et*/g`��n�"�;Z�]c$+
c�Y0��%3�����ޣ���ڳ�����%0�E��Z ��!&N"�\��t |�QuJ �ʤ���Lq1�->EO�l�'����,
I�k���(5WQ���5�;��y��܀(%��e�6��픶��,}r��╒1ם.�_x�φ��P��z�F�R�
�������ǢY�������$���lX&B��Ђ��B��M�(�	�*?;��5ݒ�Ą��Y�!�I���7�=ʚ'�/ ����nE�a�4J�� Jc'�vB�1��8p"��'n�BO�;܁��U5I���V�B��ߖ��Z�ᥔ�hlċ6�h�+ω�F��g99�ln�bH��J�:�5��g�PH2�Q��r�ϓ��������Ѷ'GY��:�+���Z���,/
g����L��sv=a�2�L���g��V��h�L�e��>��f�/�_1������ԋǄܹ��ABR�y�"JhB��-�R�-���]��f�\���`�U
��L�V&���j��`*S
hQp��2�4m���b�P�r��5
}[@�N�4A�RM�1n��v���"-f�O���o���efp��17n~�c���[d��pC���{���u�+�f��_ܽ�ڿ�C��Թ�n�E-WT?��n1��[�;_|���S��S/o��C~���6�n�n�o�h D��v���u4yF�EU�(��:a	a5vS��͟�(jR}n_�=��--;R�ԝ��Z��~�
�vt+�_������&7�h�;�
ѷ`#�Qnj��+���1çC,R���R/��N$!�������ng3�﷬圲���mV�."�^���u9�}���KŃ/�U�=|巿�]��i�|#~*� �^���}k�a�nᢨ19��/�9�(��޾�鄛������V��ؐ`+��)� �dO(�g5��LI����V_>z���F��=�~��-j��Xщ��!��b�%~	,WY�O\W���������`��Z~�-��S߷�[�5�m,\�p�e��C�V��O�v�����k7���+K���>Qx�R?;TǓ�0#�y6*�[O~�9?$� ~yR��V#�J��5��}ֻ��T/PE�d�@�Aj$��X�g�`%w����r��׭�λW/d�Y�V�R-J�Yu��؀h��JQ�ș��'�D �Qq�j�k96V��#	^�Z�����+��
r�+c��E.���� �s*-��g��.a�"��m�75 h�.���p��S�&	�&rc٫άn��a�WX4��mY�O�S��!>h%���"��T4���`��n�H��wL��s�_�3�vZ�'��;�|�i�~�t�_D�LD�n�e�.��&hp��
�E�hglE�S,���F���SF���W3!����fnGm֜��jN)u������U�����=@�3e��dB6���K���ӹ��3�X�>M�9:�����G>O��h�Mȴ�8��|8/@���`����Խ�"UhF�����8��Yu,1 Q����X�R� 
��9-�	�cfm]�(9n�w�M��b`���KЏ�|��|w�YB�Fㄧ��L�9�����όg�
#��>E��l���k'c�ڑ'2�e�<�2ٟ�Q�"_)��,z#DJ]Sp�0��T_"d�~MMИ��b���=	�^7t�{<Qب����$��Qc\�D�-������1Q�o�x{p�q�"���/���_�
�Ƨ�wJ����� ������%X�.������ߧc���Ѓ��(�T���L���|��17�X�%���k�7��,}���AɊ�d�nV���g�4
f~0��-$_���x���4Z�u����[N���Sk%9��������đ�;^�J��j7��\�CӍL��0��H�1)Tkʏ/��؞�Ph9h�U�����®FB;L���FAo�Ā�i8l��cJ�]���K��iD崠�7�R���;�z�O�(��/I���(3�i��R/�7����:ϴz�\M5�A
he�(���{O����q��k7I셀+�T��X��Q,��g�
y�G�8$ B��Rr�(d�o+��iGӸ����&Ze?�G��>��������S�J��:�4Q���X/Ny�2X:/�>t� �R(Έ֡��y��'�ʸPQoW.'V�sC*Gs���#�7�c��1h﹄:�kFD��{�qd�?F�Y�W�rd�����P�
g7v��:TSA�N��_Z��]��a� �Rk�9�p�N�
ibA�b
���a�6��
Yhh=���u�e=ѡ���|���������z��W�ض�[����w� ��i���|;�-q�؆��#�x������.�#�<�=f73֌���c�p���j�9����ɡ�F��Q�Q،wt�y=��a���Qڶpݤ���������k���-������m�3��R+��VioA��>�j��	��l^Ѯ�KŮ��E�_���N�R_Ty�������
�_�x�q��k����� �zK�i���đ��n H�s7[ګ�H���R_����od�U�R�{u__V�Gʓ�T��(\���ً.��B�+\�i#|��j��F�ګ����Aݡ=��|r:������c�DV�{�������;�֟r5��_0�l�ؒ��m4��w��vWv���+�R��S��O�XJm^�s���R��3�Ę�o���� 
b�FEȒ�މoK������7�	>�&��Le>��oDH)�T�k\p�S�=�,�� ed'�5���>
痷�\�ٹ�
�����Nϒ7�`��
e��J�Z!����+i+����*Ѐ[5Y��l���9�_7XT|�"/��zH����cl�-8��2�ǹ"_氖�G��]ByХ����G<*��v�I9�y�J��B��M�F;FIM�R�Hz�3�^q1妑�w,q�ٯ��w�$rR����uHsM�󀓚k�!�'�4SR\I6�ďƦ��t� Z��2��mm�����o�95����1�� =�C�:������g���D��o�#�����P��d���ɶvCu��3dWݵ� �zf��xV��t��y(�1��M��޶�O9ե���ȗ�wؙ�3Kz�Ay߬f��oB2]h��M����Q�����Yt3}�̎�7��F�PwG��!�d]8�ҭ�{�Q��@%�p��0�Y�t%�0`���$�f~k�o
"��y��rr�Z��(�2���]!dș3c�0na����t�?��BI8nT�9�T�_����@���Wun!����h{|�|t3��C̏���`~�+���w��d���d��� 0ϧb�+�#D�	�S�]�~|�6~�������
U�Uv��W3�����p��I6,��n5'��V?�F8F���v��Q0�!vC��-�+�a����W��5pw�)��)[��h灲ϩ��� �s��	M��
�g���L�)�{`�J q�U��G�ݡ�$z�2\���cS�3���	�gv� ���<�A6��B���cM�1P�-6}�7�[[�ȉs��^.�?�����S�PHDxSGuw���{{��*���6o�vNw��EBI��s�r�L����֔k%l������8�F%rΞ��ӻ�4ó+hz#�Q[��i��4�bN0K]�`;�������Rh���(Q��Ϛ���	�b2�����q��Q9�����l��;��w᳠x4$f�{"�k��������e+�Ůx@Z�3	+����U;/�C�b���h��nmS�yQŃ�5_��]�:ڎ!Q�4r�X���yp��6Q3b�`2�����C�y��Ε+���_�*?�Q�IXᛧ��$��o>}1�r$|��g�WFK��=ӠM�Wp䨁�N'̆�ט}�P�e�e����� o
�}�-��Zcx���G�,P��X�U\T����Cʚ��U�,0\�����4x�+.kv%��)���/���~x��∢oJ�Q@�TA��B+2����9]�I�mفԨwclG�O�f¨\(Y2�Q:��C�9;|~
5��A��[���p��4����s�s(��<��pN;����Q/�u%�V���:P�4����X|#Db���y�ט�/�-���@��i��r�E$��]bs�`z�Z?����;ɝ}�kZ�=3S�L���ȴ��8��:Q>�e	�G�1)�8� ��~l��'�I!���m�Y���4߰�K����+�l����l���P\�`�<(����e����S�Vj��i����M��A53G����K���L
�:��_S=�ъ> �3ڟG�F�I������Gҍ��gM�nn\���7Ε�����������"��0�6�e��X������B�h�3���t"�%l��Ν�ph��V�2Ϋ��E�]hg�d���=iG�a�F_�@t��X�\�b��A��n���&�n_���x<2b�����`w�Աٺ��G;�c���iFP����\/��ɜA��V��^4 �VxI�
��
*	�dl⛅��0�qxİc�%�k�E=���\\c�:��"(�Wj�9���Sd�[������
���Ia+MhZ/9
��i�n<y��Q���pno(Us��Tg��s�R���z%7��P�Ieв`h�81>a5|/Z��=�9p�a�3��Z�Fb[>�+ �JU�^�S��S����W7��v�K��^}��,7�:Aq��p��+J;�+d'�
���l)�0��D��:�,ښ�f'�n.[TS�Ek��7���f�=L Nc�z�ĎQ���R�$�+��B�Caf*�zq;�17������q���1�zX�S2���ᡜ_Hq	�V�X�ɼ���D_�1�f���O�:�.\��jȎ����;�܎��3y�u�X�~���l��&������%���|�����'�ˆ���[�U��+y�K�u'�ߏ��-���&ޥ0mb��B8��沃��"3��)�ݜ$�GҺ������$QCt���P�!y����~�2������w�+�Ԕ�'P��
���a��C�ĩn~���F����n���,2/�'�7����M��bV�7���c)v�`>��q$f ��S�E�.�dBP�9w
�r砱�]�r*�a�ൿ�`�:����^
�-l���˿���My�g��(�ޝo�BF�,�k��%��[�CG%��S��/�)Ҳ1�P�a"� ُ�W���XWN9����9�`��~�Sz��]��p9�fn���,�d����xf�j�3�'Ⴕ˕�[/, ����O���v����D.)픅0Ͽ�|��(K�d��'����~��{�8�cQA^Y�y����8�nIO5�b,%�y3���6����޽��08g�n��I��6�#����~�rB�.y�G'����ڛ�ҟ柵O��
����8L�-�N�:}���s6J7I�O��4vG�G���
���(��5;��L^����f����,�)䔜�h�Z�[C��sh���;�v�I�(�x�Z1�<C=������r�ة��V�^=���W�rm]|R3�n�3O�f�KL�]�7���lCI���ڥ���a������g0
k���s�f���Ds��9̄6,��l
����N�5�J�-��5>�F�(�{�t�䈳W`��|B��_���j�=�� m$�̚��P��i� $�`��ĕu2_�œ�n1�Fp�2Mk%�YMOG;�Ԏ����G�������ס��r"+��	�5;�՛07�|e��P<�ɛ��?'�]�t�Z��C�:�kh�Ēl��Ɖ{eV���'
�a�wL2��1r���o
� �e�rS��QO|?����;rO}�}��)�� 6=W�;ף�`q�^�js�@pY���0f�=f!�8F,�!�|d(���M�R�k���~�
���E���2�V��'��,�4V�F��iewq\�+��)����[����`��T�"����D�����8�N�~����zЛ�)�G�!����b>��Ҋ����]׳H��<y���#�P��0\��Ub�7$��������T2o	D�:�������[��J�{�Q+7�h�8幉cK��î�)��.>\�nS"�B�w�k�1/��,��*CSz=)D��a`4�*}�Ċ�ik컄��/O1�����
c��ܵk**�Ǽ�� 
5�$B�%��*ըD#�J��`�����-�&^B%͡	#'�++e!�D?Xn>h(��W"i�*1y��>ٰ�����6c}e=u5�E[�{`;����:��}^6��������>�W�,R�U�p�2dȲ��n.�z��gZ* ; p�pׁh��!I`~�|A��ʄr�4��-��Ϟ�����K���c�
�+�t�R�%�5����7�][�;q>xP�OFy���pWI)��?�����鄶�V[�*����(sf2ݔ�肀���M�0�撮�ఙ�rtAxPY�xW�\�>�t�Φ�,��4(��J%E�����9�"�J�C�U�;�U�^�mkS�[��ޞ�Pˬڐ?.����8W�WtXY�&c[J�� g����K�@�<V��_����
d�'�&RP=�e�n-�۸6�~�`P�1���l<{�p�
(����dq�n��Zd�x��4M�V���"�'��D�G��v:�ʪS�,������\3�f�U��*�r�Ὀ��".�kP���&O!4h�q��~_KyҐh��vc�jEFWtX�����]lۙ�����a��[�1�Ͱ�%�5*5M{{$��m����C
�	u�H)�9RQ"Uf�:�������o���i���fW-���b6 �CE���򥆵�2T��R��~9�=!��ļ2�d0Pp�15)��]�f`���ٓ�0��
62*�p��_v�br
�`��������"��"�ˡs��=*(5�+k��[���Kn�ɨ����q�-"�{2�?�����ڽP$]�/m�&�1v�|�;l�V�@`~ޱ�V�pi�4�Y�M�dC�P�h�����2u��p>N���9|�k�e
�,�:٢�S�ZI�V�1φ��!�xMt2]��:�y�KĀca6N�ݡ\B�VI���YA���! 7���R������Oĳ�/L�L

��LLseM�5ֳ�O�W���s��Bp6�q�nF�!9a����b!>Mz!InQ2����4��B�ZoZ`
�����0<�[�^�b����P�N�$�JN .e����W��
��Y#�10�h��a(]u����N�����Gع���&�����ea�� ����|�z�2^o���c��L� zi��y�)w�$��ِ�-r���oiG�e��m�R����I��
Vi�3��5.e������g����M��
�wٲ���}4�g�pu��e�� �WXE�1DB݅=)�Р�J���?)M\��HͲ4�笛?����2Ou<UdЙ�Z�aZ�w�JD���[*���ÌP�"�e�	9��.ÅB����������׵'��P�L�r��P��&K'�ju�6�8t&�*�+":��3�!��V�&�Z���n�]5��|9��	aY5/ �����2u�%�Sբ���P�N|�4o�C��5s��_C�\��Mb�M�l��T��S6K�D�s'��6��c����9���X�Z��vw����כ?m�n]����������dk������f����{w���o�v�����W��#�Ot#�4r3E����+�J�n�Bm��C��չ�pB�	��]�
�bg��$�NC���qx^�u#����N�>�S��iN(A�ZIϗ/�a#((���TA2m�"a�mH�-��/9-՝������O��~�&����d�?=��q�HR�:|�Jt �Z�G;pgl=����M��"�(:�P.�8�Q����U0>J�����ǅ���eh骐"�
%~8:6���w4�3��պţ$�� X�T�f�%3�e���`[�-����Ȯ9�T_��.̲�U��VXA��-�	����J����#%V���v(Jc�I��
;o�E2�o�Q��;E��N��
��қ+�s�@���Ma�$�4f����7J��	)k�M�������0�=r�]�����N���sE���g!�1�8��4
��g�G_\0�a���(��嘵�&.�g�m��J�
V�ـ\ �
��t4P
'>�cٵ�9�`�X��+�ϻ��u�'q~�����]�f�2��:�#� �]ٯy7�����a����R,������~Mh���%a����ɫ�ζ��\j�>^�c��2�~���j�����_QJ�RH�,�l,.b4����mI��ZvE�7>G�b"�:Y0�]�2O���]|�8�iڸ��3�ߐ8�n���wkg���� !�8O\�`�2T��n}uc
�7L���un��j�2� �U�v���3ͳE�o�����'��Z�T8|��f�
xj�#E@���X> ,r�6q0Z*a�t��M@՘�1����`��#1�?�޽=�#I���B�ƒ���o��L����춅T��F%h����rU�����Ϝ��A�Z�2##㞑�}��S��:\\z��`�j�"�X��5o�3LV�P_�2
	B����L����4;��VC�?C�J�"�3����9��<�d���
���+���|c��|�ɔ�i�c��M��>̍�H�0l�}�d篃�f���w�g7Z�:Ԕ0���H�h�T�����bk}�8U����rR��7Ć��bi��0N[�4�P��<��o�3�v5b�1M�{R��Tݒ�rvI��W������`�Z{x®h���IZ�Q�C<<��z4C���j���4�h,�俰R�O��o$��h�~pj��xp�,Ñ�y�D ���w1Vs9UmM�Gj� �����������dc'�RK�L��y�)��Da��?�%����Q���{4_5D�&>�|��g����X8c����hm#��-}�(�;ʥ���@ΊѓD=<��#S	�ຳ$�ψ0#RD���<�z�_3��u�-s5^�V�W�x��/s�5J���0�`IN
�Y).�T�9xb�?���,[��)?IB�i+��RF�nH��H���tT'>�;�1����_2��,1�9>v�ypD4�\�lU�BC[��襞a���˛X��l3�0+瓖��lcf�$�mB�3Q��}8�6��B� �������m�q���DY�_O��C`tx�3��_7��Uh��#)���i\-��B������I���v��a�� �c�sC!����kE�2��$�)h�ژ)C#�v�a������?v��,`�c�H��A�@
Z2�=iGo��K�h�3��w;�; R4�9�s�s��1pSU��*q��Y���p�+	�i'Sr�ɺ�1�@?�l@@h�W��:a�"R��vU�/K�'"����2���Zb1����I���Q �����ȟ��Є����~�����W'-�����U
 �W!�z���1",
�~�Fߘܽé"�W}n	����������*�}��1d�N>����~�w� W2�%���#��D��K5�L�9(�=Ju��@t5�~�����򵗫�Q���NJ�Ĉ�X�Wb$1��)��j�NE��ȱè:7,�m��4!���b�Z�z����ֲk�S)ɽ(�.���W�����z�z��;�ғ���c�cj�#C��ɻ���dK����-���m	��箎�@(���#Yyv��|�)%n��y=7x=�ќ]ẳ&
�^5�X�VYx|q�����WP;��X38�wת/gDs�9��Xi�'Z:���a _v�Ԏ4^A[�Ậ��P>�
v�'P>F_r�*?�V2�8_6��|�4��h�[0��d�Xy�����:��l��3��V�Uװq�����VB��G��?��#�U[I��r �B2xV�%`45���)��sG3͎���|�ݫ(j	ʳ.P�ى���ԙt@Pp}�rHW�<�`�i0�:~� ��$j`������f�1xZK����'���B�8.��J#���sn5��4�;�h,bj`��v���(6)G���Z��|�G��	�6_���!$�]2w���pN�	"�}0�h������-�`S"Gt`���F��)	r���&�Ϊ��"�#\����sTFY!3��������GqEW������HA�υT6YRD��vЖ��r�>�Ȋ_�|b˿foȇ�$N�ūj�Ͷ��C�E��n�#@�s��
���ǩ1����$k�0�A��'�FE�貎��I�y
�8&�I�/Ԓr�ߨ�*��)�n5�}��%�(&�	ȝ�c.��
tGݧ�I�q
M�{j�J�l���qF[W5آP�_�������2�����'ќZ��o��O�U�
ź���
��
�e���ܴg޶b!��-�m�CX	�c(ȠVY�!W��C��K��p���h��?FBwꦣ��q��YK�����|d�
��ݩ�>|�b�
\21*X�CD��D����ǅ��
���'ysq�q�m{R��j!��&_�-,�"��^<Ze��./K����N�ymS��v�B��Lw��EPD�`���ֲ5�M����i��p��h7FZ1�f$Fn �sI�J.�Z<_A=� �I~pQ��aF�ySΓL������~�
�	�z�ճa��5
�S�.m�"C%�6'!�	�5�!�<���,w��BA@"�u{!{�ĳ@��脩��
���>�� k沵n��m-򳜌I�n��C��-�ud�x��ۢ"���b������{��[z��Vo��e���l2	p�O�\~�MM��1���m� ����ǖe0`�I�z�+�Ec��RR0�u��m��_�
or!M{��E���� �9A8�g���)a��V]�e�q��`5z(��zi�لZ�NBox@A��qI�����	���W��9�٬(�̑�� ��G]��ۗT��3xTq����2r�x#B�i�K�GŰRe��,6�ڧ6V=�V��Z���Q&Ǭ�����,���
VGm�Fk����1��
�j��.����@�#yjj�4\�a�����������G�t�U���u17:���<A}Bn�Y+z#�����/�H3��`��^�d��M��&\m�o?����h�I�`0�v�VN{�Ȏ
ۡue��V��g	��D�\��>׉�H�O��, ��1i�N?>�+�G��IQ�w�N�7�O6O�n�����8��k����F�T��$������ܵ�<����ƻ����?T����ֿ�X?:8s0^�%�C��2�\I����a�V1�Xh[&��q�e�vo�Ȅ�G �WG�_;�w>ڏe����P��D�_��(�}G�h�����#{�~���kVw>���:���� 1��v����ڿ?���K���Obџl��O8���6Mu9���"��#����:��@T���齅|SEl��i���gdP�fU�
&����'��9��� 1���Uo+�_���_���^���zP����~p���O���.[��R��v��~$x)
��G�S��u��sL�Ǒ�b��T6T�g�ڭ���!�������3Y2)��"k��(Ĩ�H8d{���!�r��4�n���W��G�y���
�n�M>��wh訂�v
2s�����l��eӉ�"��4Sb#�Њ�֨]D�!z>O o���R�J�[w8��`�ɜ3��2R�Ң��ڤ�}!/�t�dao莜�N�w�;�_jw�z��� ,Ff��k�S%��;�� ���/VL���	��������ν�,Φ=�&�bx�\��W��ܚE�����J[���jv��V�]V��{V�T4�{���v�^)���t'�r���&Ē�4J^�M-M��%⥃ùU{��^5�Ɔ@�OTD�n ����"ۢ���NU��u
7�.V���8��Q��\�kbn��}*JȰ�ҥ�6"������+:hF��}
ζ]��n���b�!Ma�E�ߋ�����mZ�`�^����v����	�_��Hu3�(��k��U��Ѝ\8-�r���[K:?J��3ɧ�ma�I��&Ƴd�E�I��'���epLO�cX7M�we��_}�H �:)v��I�-
X.����xX��ێ@��h��\愇` ڮ'��&=��L�w��w�`%H}]g%�U������کɌ�Y�>dOP��9�(n㫭zP������޾��%K��&�ejIN<+U��Z_8;��"��!����rEڠ�h�|i�Q*+��R3�&[��,+O?���Xۑ���zq}�A��	����-)
&���P���T�pᬂ��bS��).�E&�d}gosB���W�\�Ib�����wQ*�y�{V+���姑o��5$��x+]Ui�3_�p;<���:�c"�C�Ka�^�S�ڂf�W�_�n��WcTJ$4f�:,`����I�0�<���S�s��>B�������.41�6`�J��9n����cI��U���6����4P�dr���o&.����|J�qX�
z�+I��E�F� `M�k�FEݝ(H���(V�Z1�*:��BQ�.ff�*��0,�=�O��,"�|/N�g�%�v�XTMJ�5Q�O���k@ל��Ыv�3�Yq̱���ߎ��Ǹi:郝�2�������Sَ�'Z�c��ң�i�:�j�~�1}B���id���@J����7iיo}��JDڕ=Ő��N��U"U"_�K��.�;5����~952�i`_���i�;iq� T�� ��2-L?rN��:>z�7{?+:hίP:��*��}�X�υN�%m��L���ro)Z^u����h���:�K�IB�I�% D2n�F,0��G�8�E�m�@Zq���UW��s}��d�+K˴��y!�!�Z	�<�}�0�6*o�*�NM�)��/�/���3�o�M��6��s�-Г�Q��G_~M�Y���	�L�p�
Q���s��u�i���I	}�E�O��pO��Ĳ���'�
��E��
�W�vl��<ă8q(�tꐽ�"��7�?�������3Dn��,���$M�JzP�gjVrz��j,��Y�P�_��_�*�M��&���f({v`��k�A7��t��>D8vTĿ�-̛+��	C̑%n���B7bM�#GA�"�?v;FH�":Q�����A1fŋ�E�Q��/����R�&���h�Q���y�pP
�.��^��@#��ۋZ�<�O>H���$,�᭣�PLIj�o<z�!c��֒��P���'��ꅺ\���j�Аe�bZ*%�=aY$�	�ɊeGF�(�3X�6�V�c޸�kW��ą]ɵ�e
(���I��'ӓd�����������
0 Wϙ��,��`�������F�?B̠-Ӭ��4�1U��U]�K�1����+p|�5�w1茔:&2p�Ĝ��<H���N�S�7�O�:&ֆӃyA��_�6��pf[Zb�������{�Cq��М[s!���z���Y����^o� �מ!C�3l$[f�d�k�k4M��
��;�����\�[�B�F]cRĳId6���Z�i\�b�>H���n�O��0%~|�]�w|���g��|N}��j9� ��ʹg��_؊���?4��+�iæ��Jb
�N��B��[�ܑg�����_ߘܖ���^�=�1����@{���w��49_�> =]v��b݌�!����>���ϝ����z2����8�����?;&��v`���Ϫ?���v��;oDL��bU�v��_�E�o}�ϗ�?���-�N|��6�:5xs����Q�8�x2��7#Z�qekrW�!*[!�
[.4�N�Bk?3�/5W�y�uD�-�?>�G�RV�����wyQX��DX�����˞9���yۉq�)$�(Dt�����W�g��c�,?O��G�����BV�%#�����UQ��3����X}P���=������s@�Z��؛��0���ݵ�����]?��^���A��qҤ�lq�6d-|%�9�:�!/[)wAJ�x���Rn��_�/ڿ��^h9�˧Пǀ��CDI�~X!�u�p�3�\�_�B
"���h�f���\\_����^�e��q��%R�8�.i$�c�����h
i�ɼ�`���RAufxR�L���]��ZQ����^� �Y�z�뿠H�Bh���[��a׼:D���c�oأ}��� �d�BHE�7bq|YS����-��	:��&1���&�6�`�����Ӕ�z(,��q%8ZDT)U�!!m�_�h��tʼ �GY���;����p�
�E�%[�V�WHhDT�D�\��LO{�`�4�R����4�
1Tɜ�Y�Q��W�b-�F&��k�[0
I�b��t[Bg�|BG��I�$Ci]��)�o�C�~-A�1H>
0D�:1霥y�$�g����N���6��)��J�0m�M���v�~8'�Z�̛����'S��ɸ#$q�]��ĕ��Ȍ�gHI���t^�e��1#E"%�88JQ���CX�N y1?���2��#�E A�7w� �<%��enHy���R�*������s�wtxWӪz�� �������]� w�ɫ^
�/gU�eNF�	��������3����Q�N+A�{�m��
0 ���,L�rM�j��*ah���կ=-u�� �=�D<<��Z���<�����dV��CΠnUO\u��7��jE���Mq䙤
��\���7Kj�\��K��~
�>8Q�H(���N$�1��T�A��1�<٦Pv'�R����ٌUï�0��D��czB�J��S*Zl�V��t�d�R���F!W�C�=��#䢜�����ɵ-��A���"5P�.Y���L���$���yq��1��y_�)���_'ڥ��
����)�&�GE7H���~�FǉS�Ξ�Tmռ���^����X	ǥ�[���@�$�Od"s��+�ޢB�'�UP}$��T]r���6��iL�I5F�7����57�7̜�X�Q�A.�]�^I5T����w�*�AL�%�pQP�]Ð��~��D΅z�e���cBR'��R�C��O�/���	[Q{C>4�KK�`�+��0\f�0���B����/�pyᩐ��v�
�����jk�xj�� �{�D�֪�c�3��l��^�g��b��R^V*�����Sݞl�a�vlA�PRYXg|l�>��x��̯b��
H�D���v�ˊ3���q��V
���+?�u���v�|,�\+� ��q!�NώI����a/w���,���xlvϩ�u){e��8��e'���l Zgt��5�G�k�$���`��Y8��E���8=�x�2�>�b ,����	*�%14$��Vl�u|!+$s��T�#�v*�+�:�\�B>Ե֊^���aU���%ۍ��{Te�Y@|r�px����Q�h@�l��\\l��ln]d�i��S�����v���`�v�7K�툢*C�a�@m�m:��D�h���6i�j�7��}�A��`�m���r-������X.]8�+wKz��[���FC�b`"��@%Z��\
��O6o	�c�g�_�0�$��������W|�>9=�'�M�3u|�=�⹙+/�U��DU����X/B��Ϊ�/AV{M`$?��al����
�K��av9����x�(�D���ӡ+��QHQ�Cu���Zb�#CL#��lD�ǧ��>�oE7^l���8f������V?����v۝�������y�pٺ���V�����wT`.~_���\�F�V�'�ɧ|⹍>U�l�SW�j]�������N��d�=�X��:~|[<h��t�E>($�q��
 �\�dG~X���an��\NVC��%To���K�Qg���7�b����]	����ŏڞ�����Ph�c�O}���3�M��=��Y�O���wH��-��X7�ƅ ��g�B4���1.�VcAS�E�E�T���̣oj��38��bQ/f	�a�v ��֥v�YR���M�"%�"��h�`�Z��)9a[b��5�a���2dIS��ſ[�a���`�.��I��Fn���%�Ζ�XWVަ�HB4�����+Mm�ջ�3v Ol��w��EʾA`��7�^v���c4���DKg��݄���C���D���Y�GY��y-R��=���aM6���`Q�v`�;(�`G�2����(h.�p@���[��eB"��zQP]#7�1r��O&�� �!Ӱ5)Ħ�v1�]���c�7���)��'����/u�W+�Moo(8�)WW�QB���ײ%�pjYh@&���۱(gL����gǖj��[��?I�[��U y�+%{����O:�f��8��&���d�2�l���T)���i9�+ץ�֓���=u�D�C��
�Y��
&Ody��1��g��X��Y��T<)$���㖃�0񕅬����)#e�%�^�*�;��h��>�^d����w7��O��''X����	?\;�87:��#>��5_i�w>�"��S5	�C�ˡ�ou;�<\�y�~5E��T0��B����:����>/_�4s�=��4��W�*n��aRS�]�a��A�������&��i�&qRdœ���smF�W뮪I��氝(�؎H��'nt������H!��� �o.�z�(Cv��3|��}
��Q^<����A���&1@j����U�0��0�ҝD����"U�z���^��'
fh�B@�/.j"%
0�;����]�A�W�)�kfQ|���}*�*U��x
�uZ�+�%�6�*L�>����Y�1ˈ�O���ޢg�+���d��ٷ۵�U�\�B��C�����s�^
�>:�#G:N�l�q�/���߲R�[dEˮ�R���D�fe��Ps���a'6����dL��g�8�~��,�ͲEGZ��4��̦g�b��,����UZ�j��O#�K�_5��nS��E[�q�z�ϣ�ȥgo���*~��R��ᠽk$���-�B1��9�W`Uŕ�+��
��_i���[8�bTL�X����^~�V�@)�$�R�x7��M�����w�w��u��$�
�����C�&wo�v�orր[)�H �?!���PI1�gB���]�
f!dQ,�L��pB��h��OB�b}�����>EN�	.�jԧ�x3����-"--̑�\v�g�c�g@������F�����I�9Р�f�I�J�]�?��}��'����+J�Y���?�{��c
ˁ��R{|M�?L��G���n�(����2�2ղ�H�(3D%�r�B��#�WT�pI,��u-�PN��c�Y�*��I��b ���V���
����
Sm1�����r�J���`ő���}�'i'U�i#�`�ah<`�Y+�F�B���ȸP�ycl|؋��=�h�+{�)���l�,��ya�P�����0�"�0���є�<	����f��:ˢ	.�d!�!�
B�7�~4�Y4�h������F����V����OT\�%���B�xׄ�<�A�RD�/
5����ŋ1�iwyO��~G�/�c68{(�$��t�X�8yZ����V;�f��ϡs���?��_+���CO����h.��R�A�h{^V�Ȕ��j����7(
%���b턻&�� a�
�I��XT(*��<�DQη{!l��j�\ܕR ŨB^uP!h�t��4Θ�g�_��詤ѲBɤE])&a)sؚ1)�s��{�����t�-G3xî��[�|I��Z��_͠�m}S���X��JAk㶀�\����'b�u���]W�L�#IĬ�2��m]P@>bD� ��/&(��54�����u�����_�7�Hkh��H�o���a�}<P{\�E����H�D�
#���dB�.ЌȠ$��؜Kn5�$�`�:GHw:!4���I$��K�Q����8�����q�~��A]�rxu�.NxM0v�j�Z\�j�<`#��0#���P� 1rSNF�S�Q�qs�?�pw��<�ܞ.�8sF 8{kH�Jn�E��'��5�z���}2qC즸�6Y��-i��)�zpUY�,/�����[!�J)K��As�����s���(4����8:�z���S��lr^���Z��@�z(I/B�g���!�Ta!|f����>".Rí?©����HQb!�rN줁!{%�:<{����^0�
����P5��ڣ���ԃX�:��[�F�pG���Ƴ4��+�X
6AC�g$�T��'�܋�Y=+,x����/��('O�IU��D�~ӊ�%b@_܎MY�fx-6��jx�6X�H�i�Ƀ���k�֒h�?J�j�{�,/�S�eri�V��9?ﵳ�Ћ�K�1��3k�����ʕ�{+f:�5b���m%��)`Ɓ w�a	c��wC9�V��	7�1�B�%�,�t��^�C��]yW�uJ*�ßs/����(Er���|L4�S�W���N)�����ׯ~�G>��,Ċ�@�d	�k9��,��ȍ_fG*����4��v9��'��z|B񙺷O��3��&$�?xO������z�����뾧���-<l��l\߸#
�o�iLn����d��ܘ���o�)ƭ
"Ʀ�˷�䟔��>�߹n�+������ӮU,w���H��0@>R�'�
��e��:�
Xi�W��F5�z��A��`��6O�@8�u΄�ҥ�R^p���I�J��H�O�����Auƙ����!�Ѥ��_!_Cq�槶E��~6D<���J#n<��h,n�9����w���O�3=&!��a��y��T�m;2Ni�%
W�I*�(��:��p6ϸPjB��U����8�[��һ�k�тk�l%����p�z�!�l�ū� ������-B�HB�����(�E���������a����-2~K��3�_��]�̷��}��;�w�_
#_���'FUc���@�mP��P^-1�:8��bحb/����T(	e096ȡ�`Jh�zq9��E��p���έ/o�����_���LY��+>F�?�]������no,ǽ6�����W�T�l#��o(�7��S*Ēgp���\d��J�?�x���,n��4����܃ɽ��6���Xn|Fv���/^���/�Ug�(�Fi��cOo`���� b�0����i6o��2�0���%0)k��M��p.c�wB� �����w¼��$���z�Y�[5ɰ@ॻ�;g�_�]V�
���l��w޿r����� �	1n�I����#���c���],9�.zrK�P��:4wyçӃ�j�|�ۋ7.��jˡ�Èjo �"��	�
���0ؽ��bOPL�;�T��gA��I)����	F@�~�K`� ;/d��$|��VU�Էx��.���t$��A�#�"���=�F�E���/X��I�:�腋�N����9���" ���޾���kb�uM�q<�eՖ�:0md�+��'�U��+���06[�w1C��JT���W�%�K0���o�������Y��D@e��CYm5��f}ݗ�)���g2?]��'죢��">�	B��{�>d%Z�����+>`|��8a�gF���do�	H57dGtLx2x.���˂9?<o�{��3��G.���%|�w�p��Q��T 8�+K���Ѓ���j�n�~�sy��
H<P�c�y���|�|��V/u)����'/gO�_z��6^��yI���'���/
q�Z�A/?��%/?��b�[�I��PmNʝ+��=,���~?��7���/?��*ֶI�}d����=��*���UB���7����ˍ�K/��������[�("�N�X���S�u_t��%���E����#��]��dukf�
	aʅ��}}���3�ݶ��E�<���Y����t��]!;�3âN���u�wViUq����,���6I�q�Tf�:��8D���\i/˱ȏ�	@ؽ)[3;S�yր�d�H�|@(�d��Ї J�j'uBp�5�098V2�XS'�/���_$Yܬ��!�� ��>��%U�>fF�)y���,����!=G��-�du5�$#H?�2b��6*��~��>zy��m��ͳ�:g)�.,x��8J�9ܯ����1,�38q�L(�"�ئ�"qm�vK)Eg��3v>`,��J̹VJ��&姏��������=]ji~��� }�s���j;��� �2bp��ܰ��w;ƾP�����LT�n}X���hZ��Ƌ]C�-�:Tc���a۸U%&�&[2����@�FT"ˬY���\z���|�Q}+��;��y��@m��?2�C=^��B9�9v���gLu~��&��"E/�l7\Z�"%�UM/�u���G
��K���iF���&�Z�`pk��l����kЦ��x��3�{��Vxux�i#�1�$T���)��+��h?�R�%
W��;�ed���v׀�v��V�:@~Y�-y�*­*��Y.\��lƙ���O-k.�9oԜ4��j�( յ~)��.������\�f��+g�=�N����f�cϻ�:R�>��
��f�"�GFj�+mz#���,]�r�����,��[4�d&ߚ\��T�0��#-�G?I�d1�XY��@��X�����%� ׬��	�z�-x�D��ޑIFV�������@�K��ۋ�;4�gӰz�/��׾��7���`{���k�>d�L��sŹF�:P�����:2T��?�҉oOJ�mz�.�nn��X��[��9��ֿ&Jԭ/p{��~v#�h�6d��\EE��_������
�,oW���Td�m6���rE��-���_��MWm��$���z��!nLjV�x�djL���m:P,�#=!{-.6� ����	�@S�	��U).�"BOHwA������c�CV�a�A��p|���i�ܧ��� ��gW�� N������W�߯����6���:f�H�Bo���0q1 M�PO����@���r=��q�Fw���Pߡ���#�{�
�-�G��!X��IsE����?�����s���Y�"��LP�u�]�(k�+���G+�g)����c��.�h��µQ�[��Q "s�cQf�>��|���G;-�V���2��~��w��uTY<�[�bz�!R>g3�������[[g��d�!d��m����=l�Xn�Z�U��[��E���hJ�IYv�l�Q��N.�9~��),�B�� �q.y�t�H�$��nfc��z:��RX���}Y:����tʶ�V(�@	Y
/��7�Ƹ��[#��-����]U��.$���
����=Q�\Y7�y�:Ѻ �Ϻ�3e�h��]rN��W�����%���Ae��ǟ\�h�;�ơ#5�9��\{��y�������޺f�̾��$�]�� ��eB�U>r��_����/� �j���ϹX����j��YgRZrrQWluW���&Z���L"6���{��H?��} TQ���%�d��\���yP?q��0�� ئ���{S�
e!��x���ˆˊ�W��İ%�>��_	��_5�>h2�2"t�܆����Q�����~3-U��P)�u�;f������Ϩ���Ӗ��$0��o�ֆt� &����L,���I�'\���" ����g��d9e鈇Q��w)q0�� Q,�~q�hx��l���wR_��?P�~<;�?���a�/ mٱ�H]t�:�E?�,K|��h,J�i� C#a`�P�yJj>'�s;���^����,U}݋k_�-��'��t�5%�gU���;n͌E^���j����2c�I_Qпu+
[vW�h,z��f�d|�0 .�����T3��?�y[�+����P;a*5W�\p��7�\��k��~��,��AtW0��tu�V��
.��&�'�Z;p�h8��a;Kb9�Ex!���x���7l�)(g@�i�]qw/�u���^�˦=��3�m��}u��Q �;ҏ����t�Wʖ��f�F2��;z�agt����W�`��DΎkc0�`�F.@��]�VA�q�
-B4���2G�� �P��34�cR:�{VnF�����Y'��a�yi�،�fAú��b�8+(�Y��!i�c��a'xT�h�Cؾ�3�%�UO���N8_qy��'��\���Ϧ�.����6��ɜ���ߵ3�}��~��fϦh�c��O8YO=}nK�8۝P]
N?~������w�a]��m]y�Ǽ��.�x������������g�^�������s���@�����_�v�G�MP�����\����^���mx��.ŗ|��X���D�%W��ѱ��cي���/�ۇQ>x��<������l�1w�G��_9U+4�:zBv�t��Q�!�HGn��>�1�$-XNY�\t{��٤�9�%���8�$��L/���m	�Hgmg>g�P�ua�K�D�R��Ƃ�褰;�(m��.|L%��o�Ȱ@vM8�P���MfN�vJ!���g,�)����s���K�z�>�#�c�\�f�!�Í>$I|p�c�R#yGG���&y�EI��xQ<����iV����q�����4F�
'*��+�ė��ߦZ_�P\^�,�$�������7��)@R�(pd���~4?:�X>�i�W��񳏞�vQ��]�W8��.�=�i�nP���Zs�`o\��Eq��W�4�./_�_�}������þ����v~��g�;R��E�}����n�sN��,7��N�j�&�^`�L��#C�/��"�q���-J'�c�,"��"�,ʶ�z�µ6Bˈ ��<ƛ��I48�삫��PD�3%�%���f������w�̚���B�������߈#�d��3�Q�Ǫ�1D�1#�JZ]�7�*���&�Xf_�G�op?ܼ�]�8��BE��]��a�����(�~��]�!��p�e��\�x
�EAo@��S�"���Īɟ�T����G1���-������4 ���5z2�c�I �*-̶%6�.'�)k�C�R�+��	pfC��`�P��s�΃:U� �')e
٪ ��_������
�%$�;���4��WQ:�;�
b@�i��<��K��5Ow�HM����o�{��R�e���~���e���}/w�0������-�.+�\l8!A��[��׮E����y���.	�Z�꺀g���e|�'u�|�w�ʮ�ͽ)����H�YE#(�]�ҍ��S���Fk�j�̥��>V�Oa��T���;6P�ɂrqb��F���HPG,�i���DX��\���R}&I����P��&%s�Ld���1���xi�n�.�(��ڻ��G�u
@XǹOw"�w9���B��gk��_`d����&LP�h��&�l3�RqZ�T���ө���F�o�zr�)�w��>�|�e-�:�T��7�;��-�C'|�X�z�lr��
���`>΀��X�=(��C��U�5�h���9��@�X�
�>}�K���޲��<-R��]�G
TQ8�Anuy�!�9��a�AR��iz�g�����y6�*��~�j�qh�ƒ�o*����?b����_D.�R�![_1��z�a�
f�mwq���6���f��nz����-L���r+?�>�9� 	[�>}ih�n�<�n�pi��-����z�(������Dċ:����t2;��>'��m�C&�#+�����D�$�}�L�'ۇs��+Q/TBt�����b?��+
�?<�n���<z����=]�a�>lb�憐~�Qk����?��	W �@ޘ��f�׸0a�#UY�{�����5V�F��T�����BUf�G"��{�I{��� ����Bn�C����DC��l�<ֹ
�~7�f����L&c�[rtMZ�ŀ��l>p�����ѷ���equn: �B뤽�nM*!��#v��͍
-['�=��[�i妳WT선��孍K��1yR��w�C�����c��.9D�����r����S� ��U $!�����t��9�����!'q� �ӧ�����X!J�֮D�8R(r2��fXם�9B\�A�B�$C;�"pݵ���H,��k�ܑ�z�_��/I8���45
�-�HQ��玒~��{�I����+�`��9qT�ڑ�5Lk�|��٦+b;"'�4� �ɩL��h�&b���?���,e��w8t��1�"������@#V��m)�"��>a�]�w���'��TS`��u!���f��T���@s{A�;��dA0/���ЫO�Sd9����R��]������Ζy�}G})z����I�Y��Znop
�dw��$.��q�`1���
��`�LI�x�l|� �R�r �\�&0�~1,d�ẕj�렢y�G}ꃲ�73�H� 3n���}�����D�i���և-�Y؀yr
�G�pm���������q��K�S��Ix+�[s�n3�6�3y���g"6 ��,���t�U�Pt������ڤ]������۳��Ǻ�vġ2�*�K���*p�r���s�D���
XE�j�q����J������Ɛs���D��<��7�>��^���������c��N�63��T�7Ԓ�i��]�qn�la����������=!��pDL�>��i���;��w��B�

g�p`�7�:'et�����U��հ�4@xe*@71�6��՞��T���J�&�l�lE�{��_0�`�n�\fYaF�<�U���b��Ă~eH!P�Ӕb���\�kDQ~��	�}�7�A�|�0:m�aZc���\���|��K�F��ѽn#bۜ{��5T-<Tű���X@����+�'�0�<��mǁ�
��|z��ǚι\�fLU��>XBQ�
zXCcnV���'"Ir�)�y?�fT
��R=9�̨Q�0��[{�!�8VNO�(�`�`�,6Ys��x��ݮ/*HZ,�yҚKf� ������!����h���R��Q��f£�2��>ź�G�s/�\iR�(�o�y�|YI-�=a덾+ ��'��a���+:���kx�囨��2�����s^�4a�P`�\�3����}�g��t��:ǅZu�6�1�+��TM��,�3�n ��ό�\D2/���t.	���ު9�%�9�U�s �-�?ټ���~�z���"�����/z��޳i�z�U��*x�� ���3�o��Ǒ�Ȋ ʆ�8�$^8�I\~/M�W�v"Ê�J��<*l��8'әZ$Ύ��d���X+�,�Y-��FY�Vc4��Yy_�l��i :C<h���D��rF<�\�y���Wj� ��sx~[3��#�i;�}��e�V�%�O���+�!1��M����1�����//.q�em5Ʌ��ڄW��l��<U~Z�W���äe�R�����Z��d11 �*w��-߬�hT��Co"�p��}��B����3�c3�&�lF�f��p`Ǯ�BL���h�Ca�$���g�l�6ޤu.x��|��#��pX;1�$��k�%o�������'�Y4x�}�k^=p�VX�M�Z�ǿ��f�'Hk��	ԣ�7�<��D�sڼG� u�8���>=����
�|s�oDmrw��������Y;L��O���Xt�m��t:��:&��/䉖���I-��c�G>��-0��Cŋ�V��
 й�>����W:jL��@�{V�r����T$��[��T��Y��M�둂:,�CSH
3��@��=M<1k�9βHwk�Cـi��pr7��a���&����*�i��J��uG���=��O�O�s'�ǯ���z�A,�J�5���~��l��P����m�)w��bk3�#�$?/��~,l�B��X]+�k���${sH���L�����:g�Ȟ���r��5�c'�s�&����	��<;a�b���<��Js��^픅CC?��"� ��1Y�s�ִ^3*�I��x�K�)\&Lb��X|��&�L��:����+WQ���������*#��]�Wï[S��sq�+�� x9�i��T��H"�G��vh}#��W�n��Ȫ_gL�z#F��ۮ�t���z�ɪ��B����w�_`.`�.[iK˟Oa��+����n@�B[������,�_䯠~XF,��C��T�Ⱦ�Evn��U4"�![}ڿfM1�Q�v6u7��^W��|�'x��4�%(Y�ea!s'�8�A�~95�E4@��)o��s�������ä�0B�Dܽ�^��]�5��>��ٺP��J�MSe]��k�(>WJ�'�2JL���d�N���D쮖"��}d�L2�8�WdI��V���݌�Ҹ���g��^�̆�`���w��h����"6��y�
ίbQ>�z���O��:ue�종=&��B�kܼي�+,s(�܈G���oC"�J��;n�=<9�Eۧ�/��M��ǜKq �������kV����JAע%���F�}۰�d�Trf��` ����3-�g��=���2��� g�HWw�"OG�W{���{�'��Oě�Ws ];�mO<w�:X�3�{�fp��9z@ �r�'���<J��a�37=ڣ
�����i�۶��m�S�H5F $3$]k�a�F�ni��zo�$&�+&m���.l<��-?�pq��;�ه�O���;���jݐˌ����q0TB�)걶�D���o���k=pKT�a:ٗ�@8���<-��V��uq��,d����5� !��h�Z�^W�mu���;Rc��vH%���A��3��LLY���5�����
���.�6�%����>�j������4����۟� �2o�uc:�
�y慟{���ù���)E6��'/ur��C���k'�O1�"'�/�D�]��S���O�N����ݡ�����t�6O��t�G���Ӗ���6"�4'i���2��FN�v��Td�Ԇ���G*F)�w��ZԒ��/����A?�f�aJH�O>#�M��6E\*Y
s���1�-O�4$0�������%@�f��h��^41#��ta)0��h��({0Eu�̊)�A�0yޥ{ܑ����ww�j�������m�Q�/�"gCڸ;,��yҡlV���®�$/FF�c����B��.R+_�a%'1Jq�9�\���*`	ǾF���Nz����+fm?QK���F^�4�t\���+�tU�;�.z��ִy`gd�8I<fi{}p��E齀�c� Ļ�]C*DGz)`i��V��0���sr�v����I� n?MX
<4�ɨ��>�������~O"�^��NF:o�q�2�!l�{H����n��M7ߥ�A�廖	v)����b�Їk���9���2r�r=�CX31r�B��?���<i����	%�kf#t��s*�?ݫxZ�4� �N@��@�Lsŷu�`�l�	�$g@Ł���/=l����+
h�p�j+��y�T��e��̓V�B���Je��ٟ��B�
 $��G��:��{��3��Sw�X�I1�x�B�a��ŗ.��9�<8�#�A�ƞ��k�^~{L�:���'/%�R�f�U�hkq�)&��8���΢���eJ�x���b�����������A���
Jpi��b��S��bɗ����iG��F�ޫ��4-�E��GhG^V�av�����v�~�2�
�ٮG��~�y����_2���R*x���	��e���>������	SC���-�x5U ��:R�΁�a���_M%����B:�L�)���4���k�li��Ek/&��_�%Eh�$K�������ԋ����յ�w��n� �G��DqtS��ޫ��s����b�����4/�1'�����vT��5�����
��<Bܙ��ֵ��n
���\cS�G[�qF�U�Wf2�m�՞�:�b��f�w-�Ը���̑#��]{t/�XcwK��%�u�p�#��u��Q��̳'���KZ�P(��kX�Č�ul[����W��zw�s�1D��K�$2�&��<;K���O���!��N�S~ �r4�Ru����*d�\�B��t���t�?�6$�kM���ڐ�5[HJ�;r���3�4E�֍V��}�wNB)L}�3��d@4,J�G�և�O����S2Z�"_�\{
#���,E�1�jяX�J
�p2(�kF�j��hU�$ɉ�tEQ�B7�J�Ⱦ�ΨS`q_�.�ʝ������R��/���x�х���GH�Şk�h�}�����b�����KcKpKE`ߚ>�FN;����K��a�&�C��]�7O� 3�=���?���l����D��F����3;$�ꋎl�����3g�_�#+��OHA@8�N�I�OB�����5�MQ�b��q;j�g.M��
�Y�!X�GL���Zb�U픑fQ�N�5 ���[}�L4y#N�X�بLLT�ĸ��>�lڼJ�Yi&�F�p	ez���
�Z?q����0�f&�u��&�-I������f�\�Ƅ�C��=���}<����9*�p�k���֫
;� �f)��X
&�m���=��p2�~)g��K��u�BI?
r҆�O&�G3�:#5�g<f��Y�N�i�4ݥ��h]��s�{?w�ḾSf��2���abX9作D�%|?���_{��1~���4�i������88mЇLƜA-�-)8� �J
���|��?�Mƙ��M�<~A�+l��><䧽W��~o/�X�����v�"�ƹ(�7�F�r����`
� 	�+(f^��^�`R50i �i�=0��Ħ��[FD�`,̩��Lo�˶��CkA#�(������m�,���}9I�l�vڵ�u�	�uL��E"�EZ��fa{��&}�O�o2�}��u|J�J�mֵ�X�i����r���;��ы��)(3W�v.�ܥ73s�i�W�Ӧ���1�vi4���̂���1q �]�ץa$۪d.7a�RhևY��J^?U
T:I�I��m�}�V	�6.�)���ݢ����@�[�:��AaoO}T��Z���*�(6Bf}	��[�;�i/?_(2�EZnwל�Pȅ&%s*
8���F��]��,�Å>5���n�0��!�5��޽�=7Ϗ���� n�
'����8���qݗ��^~����ςކη���pM�����Ttb���:��qӎ��^Y���*�>V��ek,-�S5AJ7N�n���Ԋ{�:"r���;�6Y����;ff�^8�p;l<K���a��]#sƒz���敮�0^�V��qVE��[Lt�	R�X9��D����K"]�^P�o�y���1k?�5jQ��r����7�  ��ɴW��;��1'�!�K%���|�orfe�Xr^�rSTԲ�̭��_���*
ww��NպDG� ��VwR����t���ѹ�����̉��9-����.���6.
�AoIFhx6 t��J$3:3`D&�sv&>���`A��م�EQ�J�o,Q���h�<]M���:�A�<���_)wZ�(��k��O�^עۣ�ޝ��U�<��.�Jq�CC��Fp�?�C65o��X�5���gR��8��Ra�<KI	��F�P��7?�7i�<`
�P�uꉞ�������>�&
�T��r�Z}d�'.n˫s��L��%��2:i�$f�Q�P�(���ѐՂY��Y�J�l!��cY�|#Y��P���F5��-m��Qq��Z������M͂r��1�e��µ?w�{�ϸL���#�
�5�ýɻ�J�6D���q4�:�h��%.�"W�%jӊ���\����	c��7W눍b.c�T�յ��h���$T,WW��
�0h�/��3F��[�q韃�p�d�W�wK@��swm�<�'�5E�a�k��as��*e���W���/U�7�p0��!";y���B�������+BӾ���R�#+<u)I�<�7��ܓ�
�a�����vM�8[g��"y���āZ���G��(M?�r���[�
�A���7�2zOu��	#Cc�$�|�:�5.�!eru�3˯��|����Z�Vv�P��Pa*+����$[U�3��2���\��$\"%���rT_W������JB,-^w��6�=�P����d�x8@�������{
�Tr"�U��F���M����:� �X}7��8�ާ�����	�x +U�<&�����&H? ����#�K�)�4�� �t4lf0�Q�	XUa�!��_����)+ɵ�t	\�/��ZiV_iN���� ��~Ap%�V����}�"W�

�^���mS�� �	"T�ISK�ک �,�+��>zC���鳉��j�0���������W)�BК�0;v��Tg�liI���D�Lo�L�v�ٌ�*L]N�Q4��'�)�=��3־�l�]G��P�����
x� r0����#�k�N�a)��2wC_�z�j��>�?�ʒ��E]��2�~�s���Rqv����_�y���+B��{��[��n�Hn�0ϏNvj^*
�UI���KTN륏�\tk	��<Y�%b6���C��(^��>Vj���9��VMp*�h2���.�ՉK��Q�;X�>�W��.4�hX�*��q���Ś^f��<#�.{v�1��[/7�B�հ)��6J��|L��BO��7�q�ŽWp��7�p:yo�W��08&�u%o�����_pm��Eb 	��%���e���jVJ=x��P��D�Upj̔�b�#���=�G'O���AOQ(�J�(�T��:= qz�#'a�� ,8 c��B*�����XWE��`uqnY� �dpT�hȪz������|Gê�2�Tp2�n�Vp�5��&�S�Zi��J<'�U�E���H��]<�l����{�F+oڤ��
GKM�[v݉��������Cr�&�a��V�˻0F��,����I�l�Nx�8���Q[h�{W�PJ�+����{����|����{��74��xw���7����ȏ���9�
��h:c��[�s&�����h��
Ბ?Z�:[�������ǳ#X�p�G�ef�>ދ��K(��9�x�r����?mI|T�[���|���N�3��XZ��œsh�H�*yr���T�:.�)�t'�{;m�W�?�������5p�ԛb�!i�X���x�Lre�<������>eB<-��-�=g�	i]��7��ɉ�O<�I�tte3���%����
P�Sp���stj��9�u���s�e�?I5�Ĩ!�ɓ��o1!�N�>_�y8��;c7��>,U�%��~4ت1��E�>/�z
\ԕ��p#�i��s?�*'����y���q�\2����� 
S�B���>�s�髍�=�d���II���:���6�w񶾋�`'��g�\�$�����_6��^���g����SX�V�
�\���_r/ĺ;�y�K���>�{n����J�S�����vF@�}M���:�� �rS�W�o��F��)���̕�q��9��n��32d�潍)�����>�X���0�zM3���Г~S�)��Et`�xF�� g���.#�Q�׼�:�t:ltT�H��5��T�qo�dﻶnI�20�z�<����~h���u�Uʎ	�K���ҕ���	�}�>l�?�{�KnT������	:jؑP��,�� �y,.�ω�QQ6IQ��#E-/f?����b��twWm_����t@����R��)��<�Ԋ�5�+�����4�I��S.��P
иN����-c��u��c��~7,�\ב�(���;�H���M����jS�Za��ZG-R�0˰���K�I��R�4�� ��Zh�[��)��>��
����10���K���CQ���_� O)]E��1UM�G��d"[V��)Kl9*�;����<�K��{�Ȟ���-����DU���ݝV�� �iAC�Lź���axg��o3�-�qA��*�9P,W�Ԩ��S�w��b���o�+�����8�M/_v���+W,�, ,8b�(~�W��BS�:�ԑ$$Wa������jm�1
1���bS���UXJ�*
��Gq�8��f-9��Q|�͓ӱA&٨������F�9������IU�h��;��0֘_�@4����H����e�1����Tч�>�\��X�R��9���e�k��S�"B�5D�ki�b �d�.%���K�6�<�	�
���;�$�T�N'���w|�yT�0*Վ����~��Ҽվ�ۊR�T� ki��|�_-�a��}�E�;5E���Tk��s4n&jzm����+�8/�3���q8
<Ǳ�yF�*�rO�sB��tB�=�#^W�R
�M�f�7�l-=�qR�S\�ꔠz+��
�J�e	���U
��D����	��\�5^h�9W��FG��\�Q�^G*��8�n�����U[�^�y,1!G���	Q^����Z���
�����zi$�"���Ah_���p�Z6�?�����>�?=&Hv�\�o�A�=u=��c[�&@I�s
�'z�-
D�ا�n%;y�I����Q~���(X�z��e�/�Xg3\�3�P�� �%"4|r�F�!콨M��O8;�r�_e�zv�U`EJ�)a�l΃ؑ�G���O�6������x��؁��?��_$���ȋ�+�[����n�ա�J����6��Q-�n ����b�D��-�L��8�����P(��=���������w�m_�~�f�g�������_hb�����`�
 ��"B��hg��b:�xU��#����V��͘�6��VZL,��	��g���5)v���r�"P6R����x����u��]ԕ�v��iy��mTN�)��e�s�q���pR$2:qH�ެ��
�m?�4ζ�����谉H��i��8pJQ�=�������Q
j�T�S{�$����+����ar� pp��R����ҿ!䂫kϻ�]�S�'����B��hr�U2�\('l�p�~vgb��=�r��4�,�M[?�)y�T�`��B|�u�~��i��	�pl�����4�{�O�� �1�,�+�R�|R��m#�������P�O������ �������9�K �Q,9�I�+������sLř����i�j2Uْ0X�S|���V�a��	;���A����d��}�0��K�C�9U^95�Ux<����@�^	��VJ�\�Ɵt�W����9xylrlB~�a.S��҄#���i��R&66+����><��f`\C�o&rr2��+�/_?L�:��&#�`LLL��G'_0�ظ�	)g�|?t��q&�&��>Yf}%��c7��
;�	�LO��d��%𚝻#�����W$�D#yT�$*1yx�J�J����+�+Ƙ/r�V�����F�B�j�4�-?�=t��?t+qAj"
w�����.B�lW$Z D;W�B^>`����p�^�S6 
R������m�����l"v�4�3�5h�WO�-;��`X�pF�C'���ᯗjMk�0��������2q)��S�"Κ=8m��2�D�f�A�����/� p���	}��櫓�Z��}��b�,M�� ��b��K�����:&�R������\�.�9n��r(�5��Pz0�	����Y��r�ܙLRI�Z�b�!���>��f�f�K�]?�ޑ�g&cw:iYdۗ�8Mj}�/�?�b�y�W;%�E�$���	��:�@�Y����������>�ѱ~W���KTD�{�8T ��r��jUW�y��sr���ƿ��H)�?�f�������g}��ǟ|̰�M�&�>d
3��?������'��|�-�ۗ���Y�LO�E#n��f�����%�#�u�!�E �s�*������NZ~poI����o]ݺ%�\��&z���{+��D:��&�P8Rk��>�G;�s�Ҕxdw�����>���?^J�����p�^ט�y��K�V_` ��ݤa��W�K��1w�
�I�<U�� 	ɡP̸�)4�v��|���H��0U�:�����-<�.&v��TI�s�x%!�/�%��.+C+�-y�Ȏ�m*�����em,�rŝ��6��<]��T��r(�7SM��d�m���-��EB�JU�|������kD��-õL۽�y��3|�F�s����1�X.z�s���rÉ��v��|�}�rg�`�z�p|���>@$n���~y���R�0D�d� �7�O��~e�;t��z�8<8	?�ളGT��cW����2������<>\,�*����}�W��i��{*�3�Nd������y���(��**n)n0EJj��D� �߹�1�9�;e�\�s�
z�G>�[Sq��_=�=����U�z�%��9`y{BPAq���\� K������H`�v���#�I8*��w�ۙv|��W�����w;O�"ǋ�G����>@I#�W.�f5�_�����/(�{'�pG�^��o�C�����2�]u����nن�s�g]�Z�Eb6��%�*C�x��k\[����g��'�I��
|3GjPi깎�\�.�WS"�'n�n�1LE�Y`MoO̺�j9��N��밊d�`7;��*���fP-]�X����Y;0�~|Nyr�-��,��{S6Fa	�d�!�Tc���7�s|	&m>>�	
r���v�!֓�{�&)�O&"����s�, U�i׷�K�N-;��Zd0��;YkN��DYx7'�=�Q��
�K�虌�_��">_�=0�=ݶ?���Et�yP������ �?޻s�lTtF��X^`�gP�ftn]��b9xD�r�Foq�F�L��d���~MH��'E�:k�![�
��@Z� Lצ�d�m�ڪ ����=�������ff���k�����PZ��=A�Hܶfؚ��' �ڂ5�����HR|A�#����1�j��%:F�4Y<'���%��\
��,���f��P�1^�o�0�f^���/��������U��3��Jα~������n|w�����������Q�ͪ~��G^%{��W>�?^�F�U�OQ��!���EuDǦs�� o�@����/�K���Rz���Q��XS�h�Y@ǂ_^�w9�\�K98������~�����_DH�q��F�n�Vȼߕ"�t������!�g��P������r���t�/��ď��;?.�����`j{/g�%��^q�0 u,W��.:/�����n߽wi����L��`qD�Sov���[�tE�*����m�Ϭ�b&g9Q�Ǉ2�|�h^f��^�h-D���Z���࢟��)G����G��&��+X
_�Aͦ�/�Lġ����,|��sV+h�;������Q.���"#�wf�f�7u-(�h��\�;����mƁ����^�nE@_��5+.�,3�߳������h;9,ӣ��(
�{u��O�Js��"yG��b(����������g��٧=����ړ<l��f
tuX��#�:i<�C�|ߋ��/��U��۲�Mj�U��
�DoB]�Z�xE)�>���F�<�����7.(�5lwo�(;�۽��n�_��o>�Os#�}+sPʛ�8�~��O�6��3��FK
|�ؽ����N���	��%���|hU���W�p(�VK�TE|�5H�+e��K� ���Uk�^� "6��r@P
)R.`@�X`���1���>��ν��+d�A+?�un�lڼ�@��A'��^�ŉw0=�7� 6.<�۝�&S���� �,�O�kv��RL쭏.F���ѫ+�k�![���t�# �^M���,��*'���h���8�5x�8�y���ㅃ��B����	]
���u���z{9��(�-�~s�����<�F-Mr��с����O�h�7s��2��@4/��ki1X^���TN���O�E�{���b�:�a��$X{����H8��?�L5�gi~q��q\h�9��$K~DL�O#�%�fŊ�)M��h�=�
P���Cۯ<G�#�#S0��);kL��b�+� 6N��r+��V'��H�EN}�����P�5��F���{Q-x#������vAk��E>܆��oLbU՝P�A�6��{��Ts�Z�9�\�g��W�����ͽqtD$l��m�(D�HQ*Q�K+�I��6�B���WIw5
��U8,�A t��ЦI�����4�Z��
��F�vi�~j
z9LH���7s�k�?VSh9�b�Q�X}	
F�������N�G�sd�3q��QB9��7�ѣJ�����3�������5��� �45ϛh�1P���t���F��iu���)������#��)�ѕ^燆��M
��a%jpf����m�m�Ԃ�2��pkf�xg��c]z�]m�m6���J�H���O���뵩�x�N���t0_t'}kD�m1  ���8��R�
�V^l`R�H"m�7��G�3�lt�vl3I��ц�Mߍ5W<���k�N̮旾(�uBӚj%X%�?��R��}-p������0����u
�j�J��)��ԇ��=������������V��� 9�������	�0`.�%^M\�Bl�)���U�ܢ�eeq�Q��\9��R\���[_Kᙳ�����J�8�b�Tlj~��AՖh2X��4��o�e3��h��T��Bp)��o�c�拯�2e��h���H��:%��"�D}���NH��3�}��@/�;�t��ء1~ە��r�� ����o1�|�%��[gQu?���[�0W��yW��{7�ԯE�
�Jf�'c\�?Q�r����!�[2#�� 둚��tV�V��L���&�s⮉���fW�-�wЭS�#�PE�����D�.��9�-bWs;''�R+=�f�V7��C��RK�y�����w��'������G1���ZoE*�_�}r�RP���\}= 0�E.�^���w���ԄY���38�/Tx�y�U3���n\СA�R~d�1T&�5���z�ɝw�<���1�ژ�wP�0�G��*�3*S�k���6�w���Timj(�����8�ʗ,\�d,$�
݃!n��*x���F3�bK���B=��dB��=<A�'�L<�1ÅT�3��Qm�ذ�Z��g�l1a/�}�s��X1Zj��v`�.שO[�3���D�fHnC��O�֞^�Ԩ�+]&B�ڎR��j?�]��5�y��܆Q�j[ᑆe,��CxV�ॣyO4�o˳+}���(/���>m���|::�����R���k�B5Gc�ܱ���y
�+a�	h�ߦM�v���:\*��4H4���{��D���C?׵�4j�+�)�6�{���+Wߴ^R�gJ���'�ǭ��cܡ��*�:=��KӚ�����`�Ң��)^
"� #���2<�k��u���-���D:�9Og�+�3��wcN18���W���#�E�km�����+���<��^��!��L��7�Y����,��x��_a�hC���r���u0
sh+������MAQ�3�4��^����� �أ��6���Z�e�L�+�K�f_!6K����`/�V
6�tc�H=�Tۤ�o��vd��+Nu+��g
��y)�V&-VT����?��Q��mG���������HU
��wչt�m\N=����'��#$���+�1�o!h;��6B�����Sh[V�N;�d�r���(��K#M@E%{g?SeC9:̂8�m@���6ŏ��Y���[�>:7$������Y@�
����ٱ'��?'#��k9���!�*2�����W.]���3�jg������y)��y����Ok�8����C�U;��+�"�r��K:t��T�)Z)��Y.����k�{�\�դ�?��j)aX�E8�̽��7!���<\� cC09T{��Et�Ĩ��Q�&i�
��"�
j�j�)h���W<L�
�ٙe?�����4Y�fX�it�
�dv.���>��R�V=a85V�1Ԑ>s����sp?;$t�O��v��c����bS�������&pG
6�wU
�Q�D�L6�%m�;�������-�ܩ�k�OL춫�#�����j�w�?�fu��bnB0:	����D���$\*�S�Vs�9�s.U������*�?n����ˁ��W̥&"����"����X�����y/��f"�1+i;���ߠ)m}m �y�;� (!S-3>�y��̰��$��3?��&8Z�������s�^%����U�4o�qmk,����K2����·��C�'or�{�:.�[Q�[�j"�$�Z7˝6OS�D�ZB+��8��B⟥8��Yq�(rQ#�t����\�1�F������b8���g�S�e[s�= W�����������R�-7m�������O�..��G���E�b��u>WUR)����IbȘ���a-ǯ��b���wv�����1[��E-��۹�(��	O�D:���WKp�l���X-]��������zm�����ի�[aJ
�D�oA'��,���Ѓ�.}�s�(��8
S����M� #^J	�u�/9:'�队��<�/ٟ+���v��
��P���=xg�}�Վڀ%�
ʩ��y�`4����AE�sĝAfYd�X�H��b�hc���J<�F���o �fp�-� ˚��D2�:n8����$B"W��x��$Q-R���3�V��FD�^e$�ם�$
ϭ>�u�����M��Qv���
'�L�
zAU�N�oBME��o�T��p�mz�����Q ��Z�r�Ts�����p���jd���ӭh;p8�^��*;��z��G��ɯ���lˬF?�of���Mkʩ���
�Q�
�(�5��[�}?�z+�k���@�5������ڻ���g�M6ڈ4z��F��P\~�}�|8 /�ƴ��f	n�ϝ��;��A'|:�bJ��݉5�_�p-���ˎǿ-�W8_���7�/��3���,A	�͞�J<�2��X���kn�8@
e-8���yKč��Nqo�8~���z�Ȥ�)�Ҳ�؆ x�'ɰ�?�����a�l��4^?�<�ܺ�Vj�pl�~^āg 4u@��n���%Yx��V�N�4��z���m�&5�DXŒ�
w봁afq���ޟp)�D�I�M|���uO�k���/�Ytf��b�kliEY4�:�~Vd�3�������&c�~�"�
7q�E9}9�jAf�̀偳��b.�sh���t����� �
�����[�J�䥌�"����_"��˓��t>�B�ŉ���΄����8�0��ݢ>��?"�5b�7^E��8o��r�ٝwo`S�/]�q͉5ҪN�������"y��|H[�/'s�B-b1B3�\
����
�
�m�8� ����ݧ�'&B�����GSB��;+\�G���L�i�w�@Խ�t�NG��t>��iB���N�t�rgZ��n^��ge/鎉\!N��U�o�SL�����D��-� �h��
�	fUxc�X#(�}$��/�Ь/h�a�A�1��rP����{r8Ȳ���)�l	���}�.Q, f�KB8�i���\����_�/�_GO�[��5��
���[Hß<�u��僡��!_W�*
Y1�W��x��WX^�"p�
	�����ן�ܰ�tycO���H�ŲT7B$�Q�"1#��0�9�,�ExVi�Ә�zj�<�*2�?'���=�D��N�w�Duq �t�?�V�	إ(��jrƦW{)]�ڄ��b���,���ھ3�k �]�� �X����"�"���,�sxo(h&�ҥ��v����Ζ0L��
!������ C��$�3��0$W�0���I��-m�C�ă�%�Ns�$i�P$��(99ŋϹ�"��_OaϏ)�\�������S�Y�8O�I'��Y�Ϡ)�M�+�Й.�I�Nѫ6�M���)��	���m���>��U�Z��$�E%��䒨nƃm�<�WX^������M���*(�&-�lNҽ���	Idh<���𥘯V��T��S/�0�����9
�$X�X�U`P����Vi�1!��g���V���� q�R�J#��t�ӥ`�t�3� �o���$J)�L�.���>����_;>�����?��_~{��w}%R6k)EC�.�7�G�nCpHm����j܁�j^՚Y�S�>-�6�dW�8̡�D~X�g�J�*�(5 T:v�L������>�����9p".%2�6 iT�^�9�"���i@YyE�3H[޴��0��C{���4r�豛7��#
SE��b/���Y5�#{c��G-۱�-�2�G����$܈
��Q6]T�f+r�d����sp����\B]��4A�_�ԟ*�j�bh�����<�AL���\Vl�J�vU!f>Ut�k:p��YIX2R������P0�|̙������o��Hr�"-5O�8����A�ܷ�f!��s�����-=�;ۗ�XȼQ�T��ƽ$��	�~n 23s��T ��H6�=d@Z��(w�Rٹ/Ҵ:ڹVѵ���xo%8�Kץ{Xqg���J���	�ݍ)�\�=���#����K�l̞(L>egS{��ȟ:V�l�od�D].�`<_V�F�M<w�9�G'R��1G:�i-���c���dj+][�x���q�v�n��WR?�E_1�q_�Y)�G��k��e繞��z��5�Y�=m*�ʥ�®)��`�`�b���)�[��r!V!�U窾�2^��&2�[g�����"�sw��¦Z
�dy�{'�_��V����Qt"�����l0�vs#�h�\�X����0EmC�������=��'��^� 3c����.��)�P8�bϠ�l�Ct�.1Y�}��X �U����@2�˛��-��i�Go!
�h���T�l¥���*��!ҷs��E.�ANf�H�SL��
5�:sš�:qy�od��FhZC�E(�b� �h~!�����A2�2'�;�u��	(�/��We�Zݼ�.	�W�VoS����č����\>?N�=�V�W	��?%%��Bk(Z�ǚ���bunQ}���d
t6!`=ڶ�*S\Ԭ�+Q�m I��c�#o��E?���rD�z��c��{a�&&�9*Q !��k�}������B�^mO�V�E�11���I�kX�]��"A!#���F	 Q�
�U�LK���ݛ�wc����q���W�(*'5�q�qGUZ������"0
J�&)�R,�o��癙�;�n��nonwvvfv~���s�e���",��L�t�)~dp��������6n��m����R�t]%�
�T}9M|a�E����D�﵇R
���xw�F�	�\m>}59�Z�&d+� z�O�7��[�Y:����,�,�I��w	Ѹ����١��6��.I9���mAV�9}%k����X\t�^�;�I��\�����{J\ ��\W�wJ�J�,�Ou�w
$�x����6�T�ֱ�	�d��*ڠ��k"&g� �J��JJT�ed&t�|m��
,�N�$ސ_l�z�8O,�F
T�ܼ�"w"���M	�}���W�ݸKEl�
�Jʆ�8;�=A=�V@: jE�|���p���O�z�o�#K�:�$Þ�G�)8f�"^�8Jߖ�hėgg��g��3vp5�P���M�OF�{��u���@��]����a;_��
NO����t����-�T����NJQ�ڊ�D{$d�ϵE�s���X�vl��@HݻfoD8Ͳ��"�FWޗ˒�p�S_���I��Rv3u����g���0�Ձ|�	�Q�_>��������ˢ�2��@�=� �TES0� ���|Ԙ���]�It�[ˡ�lװ���B�~ߔq'����8)���S
��%�' �
�R�kFi�N�G�J�]��ēYv7qZ*��"/��<����y��Ɓ�M�qF5��/q������3o0���'�:�6_�g��H���<Mf.�y,�x#�����e(vI�A�]��?%�%�)\de}�G�}R^��d�r��`M��
�)�q\���=g�uPd��V�Yeм�P��\=_�g�P�1\����@7\�|�jy�����i��̏T�rڠhm�Li��)g�hMIW��5SO�R5t|��V�+u��?�8�CH!/w�����ޜ!x�)"G)�Zk�#��OZ�k0�	�%�o������O���p�JS�:����V�/t?���nl�l��qA�Sq������V5�D:o�v8�x&��_^ ������̮l�muº>��I���T/��#��&��9
�r(2����K�oQ�I\�f�p��7���~е����Wq��>}L����u�-�2��OG�E���@$�}��p��
�I��1.����RY��2$�j�R�n�8a��%��Zߍ �	�V��Qn��m�0 ��j3pLǒ��[�hf���>t�������g8״�c��s
/Ie�m7���`m���IE.V~k���y�Wl�+a����9~s�!]���ž���c���啦]zSm�Y3����6r���4菆~BIDϠ��">�Ew���.*ZE1���)�
�xO���S6�E�E]n��5yY'��JJ(�'�b��*�tA?%�tη�va�����Ӫ����0�D��b��)�IF�]��˄����:m>y�i<X�o��`NT$���wd�`3������]dRY�^\.ҢPi�Q*3�]�d�$@����� .c�+�o0BEw�����r�ދ-��)�e.Fe.:/Ot9,!;���ڊ¯��[%��\��_DY���N��p��N����֡�f*�A�������
3�k�E#,ܟf�4���Q�D%��b�x1YE_�*�HQ��4����f�j��sqv1רP>�˽��ҥ(,����h������2�_v��@r�"/�7B˧������
EY�c��s��w�d��2���I�q�$�$���eS�|H�#)UN�%l]z"��@OkeY���~ ��%Q9��]fu��oߢw5�c �>������4�s�		Z	�t�X6G��W�r�����J���o9t����)�n�T�cM��,��ږ�iZ�X;�>��F ��uP�ѧ_���۸�J jP�F>SHژ
�"�&�%�v�o��@FE�/�2dr�ȃ� ��E����� !�NX�Q&G�Ҙ����8��7T�&��Dc3�.x:����0I�'�Q�9�����@�	1�H.�I�v2.��g�+��?���$�Xm-K���!ܸO��J5�'bm}��?�_\W��ߞ/�&G�q%�����j뽱�BY<�W��};�S[՚3�CyeQ'��k{������#K�L�����'�r��3����
%��U����̫:Q�	���r2�r�PC`��X�v^����X��֯���p��p�#��b��d���ʽG[^oh���CT���n��۹>}$>�D�Q�@>ۡ�GE��( \+I��j�9i��d<%��T�ܛ�{�q�EN��
�B��>�0F�=�fq�E�4�&ɧ�ǥ1xh�f��N3��~��`�Gc
��4_���}������N��`ha9E���r����ш��A��k�0�8U����t�ѝ/?����˖w�Խ�%�n��:߫�{8�.��=Ɇ�\QR�|t����-���/e��Ck���9>ޯܱ�Y�:G�w���X�����AC�:���
>�x�x�Q��p��1��Cv�� ��qC�A</x�M�H�^n���d4
��x|�~\w���{˂3��G��S�-n�v9/���o���Mg������>��=�/.�{�M������c8=5�d�ON�"]k���S�l�]�6N*�j��Q���[
��q��qFbȔ�0���ꤿJT�+����P[ѼGx/
��Ğ#U����W3��ǁ���g�9��gK%z��:Y�C�ͽNX��ʹ��E!����(�Lk��Pc�:��m�LK
R"��j}�;�(f��`��⌨!��גӖ�B#
]����8_�W��dߨFV)����jݙ2^��b�������z�L4�N��J���W�2o�\s�5�&�Wt��g
�E ��3��$�&5��yp��5L����w}~9;s�!�L�A@�r,t4R���y\�Ao
!V,�cP����P�q4��d����bN/gl�8�~1C�g�!���<���z�%L.
�,��F�"��Ɔ��ܼ��Imj��g�K�<�I��&?������D4� ��2��91��ھ���{=�]|��`�������P�����V��y<��q�nϭ��Z�Ek��$hi���yZ��YG@<�~����N���qٞs�/8���nO��xp�aw�ә�Gf�c�Ç^����9O�	�vh%n�X5m<�w;gjtL�@�+i>C1�r�Ha
3bT�O��ԈP:@���e�£��Σ%��CK*BKgUg��_�@`Oc��h
�����ܹTAE��K��I�擳��2�I�>�����N��'B��"���/��� �ٛrpH�:���2y�k1�Z�9	��k�]j���	�	�]�R������9�u�R���I�Fm�ځҠЗ9į��&�ϐm"�����^���ѓ^�����]���g�/���`�P30���ɰ���џ�k�(�u��E�wX�7��< �'�����x�1Lٟ�VT�p��9��B�L8/�[���c��lsm8��ϗ�H�v�8�D[�Ibl�8(!Ƿ����<���n��M7��s[�,��]�~�"�I��J%`��:��W�CGF%4;\��[3