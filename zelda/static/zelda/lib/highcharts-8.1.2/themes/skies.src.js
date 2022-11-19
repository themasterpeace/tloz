: 'underline'
    },
    /**
     * Set the animation for all drilldown animations. Animation of a drilldown
     * occurs when drilling between a column point and a column series,
     * or a pie slice and a full pie series. Drilldown can still be used
     * between series and points of different types, but animation will
     * not occur.
     *
     * The animation can either be set as a boolean or a configuration
     * object. If `true`, it will use the 'swing' jQuery easing and a duration
     * of 500 ms. If used as a configuration object, the following properties
     * are supported:
     *
     * - `duration`: The duration of the animation in milliseconds.
     *
     * - `easing`: A string reference to an easing function set on the `Math`
     *   object. See
     *   [the easing demo](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/plotoptions/series-animation-easing/).
     *
     * @type    {boolean|Highcharts.AnimationOptionsObject}
     * @since   3.0.8
     * @product highcharts highmaps
     */
    animation: {
        /** @internal */
        duration: 500
    },
    /**
     * Options for the drill up button that appears when drilling down on a
     * series. The text for the button is defined in
     * [lang.drillUpText](#lang.drillUpText).
     *
     * @sample {highcharts} highcharts/drilldown/drillupbutton/
     *         Drill up button
     * @sample {highmaps} highcharts/drilldown/drillupbutton/
     *         Drill up button
     *
     * @since   3.0.8
     * @product highcharts highmaps
     */
    drillUpButton: {
        /**
         * What box to align the button to. Can be either `plotBox` or
         * `spacingBox`.
         *
         * @type       {Highcharts.ButtonRelativeToValue}
         * @default    plotBox
         * @since      3.0.8
         * @product    highcharts highmaps
         * @apioption  drilldown.drillUpButton.relativeTo
         */
        /**
         * A collection of attributes for the button. The object takes SVG
         * attributes like `fill`, `stroke`, `stroke-width` or `r`, the border
         * radius. The theme also supports `style`, a collection of CSS
         * properties for the text. Equivalent attributes for the hover state
         * are given in `theme.states.hover`.
         *
         * In styled mode, drill-up button styles can be applied with the
         * `.highcharts-drillup-button` class.
         *
         * @sample {highcharts} highcharts/drilldown/drillupbutton/
         *         Button theming
         * @sample {highmaps} highcharts/drilldown/drillupbutton/
         *         Button theming
         *
         * @type      {object}
         * @since     3.0.8
         * @product   highcharts highmaps
         * @apioption drilldown.drillUpButton.theme
         */
        /**
         * Positioning options for the button within the `relativeTo` box.
         * Available properties are `x`, `y`, `align` and `verticalAlign`.
         *
         * @type    {Highcharts.AlignObject}
         * @since   3.0.8
         * @product highcharts highmaps
         */
        position: {
            /**
             * Vertical alignment of the button.
             *
             * @type      {Highcharts.VerticalAlignValue}
             * @default   top
             * @product   highcharts highmaps
             * @apioption drilldown.drillUpButton.position.verticalAlign
             */
            /**
             * Horizontal alignment.
             *
             * @type {Highcharts.AlignValue}
             */
            align: 'right',
            /**
             * The X offset of the button.
             */
            x: -10,
            /**
             * The Y offset of the button.
             */
            y: 10
        }
    }
};
/**
 * Fires when a drilldown point is clicked, before the new series is added. This
 * event is also utilized for async drilldown, where the seriesOptions are not
 * added by option, but rather loaded async. Note that when clicking a category
 * label to trigger multiple series drilldown, one `drilldown` event is
 * triggered per point in the category.
 *
 * Event arguments:
 *
 * - `category`: If a category label was clicked, which index.
 *
 * - `originalEvent`: The original browser event (usually click) that triggered
 *   the drilldown.
 *
 * - `point`: The originating point.
 *
 * - `points`: If a category label was clicked, this array holds all points
 *   corr