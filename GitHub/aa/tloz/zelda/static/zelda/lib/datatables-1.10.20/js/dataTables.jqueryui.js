olor is the same as the point's color.
         *
         * In styled mode, the connector stroke is given in the
         * `.highcharts-data-label-connector` class.
         *
         * @sample {highcharts} highcharts/series-timeline/connector-styles
         *         Custom connector width and color
         *
         * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
         * @apioption plotOptions.timeline.dataLabels.connectorColor
         */
        /**
         * The width of the line connecting the data label to the point.
         *
         * In styled mode, the connector stroke width is given in the
         * `.highcharts-data-label-connector` class.
         *
         * @sample {highcharts} highcharts/series-timeline/connector-styles
         *         Custom connector width and color
         */
        connectorWidth: 1,
        /**
         * A pixel value defining the distance between the data label and
         * the point. Negative numbers puts the label on top of the point.
         */
        distance: 100,
        // eslint-disable-next-line valid-jsdoc
        /**
         * @type    {Highcharts.TimelineDataLabelsFormatterCallbackFunction}
         * @default function () {
         *   var format;
         *
         *   if (!this.series.chart.styledMode) {
         *       format = '<span style="color:' + this.point.color +
         *           '">● </span>';
         *   } else {
         *       format = '<span>● </span>';
         *   }
         *   format += '<span>' + (this.key || '') + '</span><br/>' +
         *       (this.point.label || '');
         *   return format;
         * }
         */
        formatter: function () {
            var format;
            if (!this.series.chart.styledMode) {
                format = '<span style="color:' + this.point.color +
                    '">● </span>';
            }
            else {
                format = '<span>● </span>';
            }
            format += '<span class="highcharts-strong">' +
                (this.key || '') + '</span><br/>' +
                (this.point.label || '');
            return format;
        },
        style: {
            /** @internal */
            textOutline: 'none',
            /** @internal */
            fontWeight: 'normal',
            /** @internal */
            fontSize: '12px'
        },
        /**
         * Shadow options for the data label.
         *
         * @type {boolean|Highcharts.CSSObject}
         */
        shadow: false,
        /**
         * @type      {number}
         * @apioption plotOptions.timeline.dataLabels.width
         */
        verticalAlign: 'middle'
    },
    marker: {
        enabledThreshold: 0,
        symbol: 'square',
        radius: 6,
        lineWidth: 2,
        height: 15
    },
    showInLegend: false,
    colorKey: 'x'
}, 
/**
 * @lends Highcharts.Series#
 */
{
    trackerGroups: ['markerGroup', 'dataLabelsGroup'],
    // Use a simple symbol from LegendSymbolMixin
    drawLegendSymbol: LegendSymbolMixin.drawRectangle,
    // Use a group of trackers from TrackerMixin
    drawTracker: TrackerMixin.drawTrackerPoint,
    init: function () {
        var series = this;
        Series.prototype.init.apply(series, arguments);
        addEvent(series, 'afterTranslate', function () {
            var lastPlotX, closestPointRangePx = Number.MAX_VALUE;
            series.points.forEach(function (point) {
                // Set the isInside parameter basing also on the real point
                // visibility, in order to avoid showing hidden points
                // in drawPoints method.
                point.isInside = point.isInside && point.visible;
                // New way of calculating closestPointRangePx value, which
                // respects the real point visibility is needed.
                if (point.visible && !point.isNull) {
                    if (defined(lastPlotX)) {
                        closestPointRangePx = Math.min(closestPointRangePx, Math.abs(point.plotX - lastPlotX));
                    }
                    lastPlotX = point.plotX;
                }
            });
            series.closestPointRangePx = closestPointRangePx;
        });
        // Distribute data labels before rendering them. Distribution is
        // based on the 'dataLabels.distance' and 'dataLabels.alternate'
        // property.
        addEvent(series, 'drawDataLabels', function () {
            // Distribute data labels bas