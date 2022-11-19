,
    /**
     * @private
     * @function Highcharts.Series#translatePoint
     *
     * @param {Highcharts.Point} point
     */
    translatePoint: function (point) {
        var series = this, xAxis = series.xAxis, yAxis = series.yAxis, metrics = series.columnMetrics, options = series.options, minPointLength = options.minPointLength || 0, plotX = point.plotX, posX = pick(point.x2, point.x + (point.len || 0)), plotX2 = xAxis.translate(posX, 0, 0, 0, 1), length = Math.abs(plotX2 - plotX), widthDifference, shapeArgs, partialFill, inverted = this.chart.inverted, borderWidth = pick(options.borderWidth, 1), crisper = borderWidth % 2 / 2, yOffset = metrics.offset, pointHeight = Math.round(metrics.width), dlLeft, dlRight, dlWidth, clipRectWidth, tooltipYOffset;
        if (minPointLength) {
            widthDifference = minPointLength - length;
            if (widthDifference < 0) {
                widthDifference = 0;
            }
            plotX -= widthDifference / 2;
            plotX2 += widthDifference / 2;
        }
        plotX = Math.max(plotX, -10);
        plotX2 = clamp(plotX2, -10, xAxis.len + 10);
        // Handle individual pointWidth
        if (defined(point.options.pointWidth)) {
            yOffset -= ((Math.ceil(point.options.pointWidth) - pointHeight) / 2);
            pointHeight = Math.ceil(point.options.pointWidth);
        }
        // Apply pointPlacement to the Y axis
        if (options.pointPlacement &&
            isNumber(p