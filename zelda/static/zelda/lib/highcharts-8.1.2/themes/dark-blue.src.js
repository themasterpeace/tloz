oint = function () {
    var curPoint = this.chart.highlightedPoint, start = (curPoint && curPoint.series) === this ?
        getPointIndex(curPoint) :
        0, points = this.points, len = points.length;
    if (points && len) {
        for (var i = start; i < len; ++i) {
            if (!isSkipPoint(points[i])) {
                return points[i].highlight();
            }
        }
        for (var j = start; j >= 0; --j) {
            if (!isSkipPoint(points[j])) {
                return points[j].highlight();
            }
        }
    }
    return false;
};
/**
 * Highlight next/previous series in chart. Returns false if no adjacent series
 * in the direction, otherwise returns new highlighted point.
 *
 * @private
 * @function Highcharts.Chart#highlightAdjacentSeries
 *
 * @param {boolean} down
 *
 * @return {Highcharts.Point|boolean}
 */
Chart.prototype.highlightAdjacentSeries = function (down) {
    var chart = this, newSeries, newPoint, adjacentNewPoint, curPoint = chart.highlightedPoint, lastSeries = chart.series && chart.series[chart.series.length - 1], lastPoint = lastSeries && lastSeries.points &&
        lastSeries.points[lastSeries.points.length - 1];
    // If no point is highlighted, highlight the first/last point
    if (!chart.highlightedPoint) {
        newSeries = down ? (chart.series && chart.series[0]) : lastSeries;
        newPoint = down ?
            (newSeries && newSeries.points && newSeries.points[0]) : lastPoint;
        return newPoint ? newPoint.highlight() : false;
    }
    newSeries = chart.series[curPoint.series.index + (down ? -1 : 1)];
    if (!newSeries) {
        return false;
    }
    // We have a new series in this direction, find the right point
    // Weigh xDistance as counting much higher than Y distance
    newPoint = getClosestPoint(curPoint, newSeries, 4);
    if (!newPoint) {
        return false;
    }
    // New series and point exists, but we might want to skip it
    if (isSkipSeries(newSeries)) {
        // Skip the series
        newPoint.highlight();
        adjacentNewPoint = chart.highlightAdjacentSeries(down); // Try recurse
        if (!adjacentNewPoint) {
            // Recurse failed
            curPoint.highlight();
            return false;
        }
        // Recurse succeeded
        return adjacentNewPoint;
    }
    // Highlight the new point or any first valid point back or forwards from it
    newPoint.highlight();
    return newPoint.series.highlightFirstValidPoint();
};
/**
 * Highlight the closest point vertically.
 *
 * @private
 * @function Highcharts.Chart#highlightAdjacentPointVertical
 *
 * @param {boolean} down
 *
 * @return {Highcharts.Point|boolean}
 */
Chart.prototype.highlightAdjacentPointVertical = function (down) {
    var curPoint = this.highlightedPoint, minDistance = Infinity, bestPoint;
    if (!defined(curPoint.plotX) || !defined(curPoint.plotY)) {
        return false;
    }
    this.series.forEach(function (series) {
        if (isSkipSeries(series)) {
            return;
        }
        series.points.forEach(function (point) {
            if (!defined(point.plotY) || !defined(point.plotX) ||
                point === curPoint) {
                return;
            }
            var yDistance = point.plotY - curPoint.plotY, width = Math.abs(point.plotX - curPoint.plotX), distance = Math.abs(yDistance) * Math.abs(yDistance) +
                width * width * 4; // Weigh horizontal distance highly
            // Reverse distance number if axis is reversed
            if (series.yAxis && series.yAxis.reversed) {
                yDistance *= -1;
            }
            if (yDistance <= 0 && down || yDistance >= 0 && !down || // Chk dir
                distance < 5 || // Points in same spot => infinite loop
                isSkipPoint(point)) {
                return;
            }
            if (distance < minDistance) {
                minDistance = distance;
                bestPoint = point;
            }
        });
    });
    return bestPoint ? bestPoint.highlight() : false;
};
/**
 * @private
 * @param {Highcharts.Chart} chart
 * @return {Highcharts.Point|boolean}
 */
function highlightFirstValidPointInChart(chart) {
    var res = false;
    delete chart.highlightedPoint;
    res = chart.series.reduce(function (acc, cur) {
        return acc || cur.highlightFirstValidPoint();
    }, false);
    return res;
}
/**
 * @private
 * @param {Highcharts.Chart} chart
 * @return {Highcharts.Point|boolean}
 */
function highlightLastValidPointInChart(chart) {
    var numSeries = chart.series.length, i = numSeries, res = false;
    while (i--) {
        chart.highlightedPoint = chart.series[i].points[chart.series[i].points.length - 1];
        // Highlight first valid point in the series will also
        // look backwards. It always starts from currently
        // highlighted point.
        res = chart.series[i].highlightFirstValidPoint();
        if (res) {
            break;
        }
    }
    return res;
}
/**
 * @private
 * @param {Highcharts.Chart} chart
 */
function updateChartFocusAfterDrilling(chart) {
    highlightFirstValidPointInChart(chart);
    if (chart.focusElement) {
        chart.focusElement.removeFocusBorder();
    }
}
/**
 * @private
 * @class
 * @name Highcharts.SeriesKeyboardNavigation
 */
function SeriesKeyboardNavigation(chart, keyCodes) {
    this.keyCodes = keyCodes;
    this.chart = chart;
}
extend(SeriesKeyboardNavigation.prototype, /** @lends Highcharts.SeriesKeyboardNavigation */ {
    /**
     * Init the keyboard navigation
     */
    init: function () {
        var keyboardNavigation = this, chart = this.chart, e = this.eventProvider = new EventProvider();
        e.addEvent(H.Series, 'destroy', function () {
            return keyboardNavigation.onSeriesDestroy(this);
        });
        e.addEvent(chart, 'afterDrilldown', function () {
            updateChartFocusAfterDrilling(this);
        });
        e.addEvent(chart, 'drilldown', function (e) {
            var point = e.point, series = point.series;
            keyboardNavigation.lastDrilledDownPoint = {
                x: point.x,
                y: point.y,
                seriesName: series ? series.name : ''
            };
        });
        e.addEvent(chart, 'drillupall', function () {
            setTimeout(function () {
                keyboardNavigation.onDrillupAll();
            }, 10);
        });
    },
    onDrillupAll: function () {
        // After drillup we want to find the point that was drilled down to and
        // highlight it.
        var last = this.lastDrilledDownPoint, chart = this.chart, series = last && getSeriesFromName(chart, last.seriesName), point;
        if (last && series && defined(last.x) && defined(last.y)) {
            point = getPointFromXY(series, last.x, last.y);
        }
        // Container focus can be lost on drillup due to deleted elements.
        if (chart.container) {
            chart.container.focus();
        }
        if (point && point.highlight) {
            point.highlight();
        }
        if (chart.focusElement) {
            chart.focusElement.removeFocusBorder();
        }
    },
    /**
     * @return {Highcharts.KeyboardNavigationHandler}
     */
    getKeyboardNavigationHandler: function () {
        var keyboardNavigation = this, keys = this.keyCodes, chart = this.chart, inverted = chart.inverted;
        return new KeyboardNavigationHandler(chart, {
            keyCodeMap: [
                [inverted ? [keys.up, keys.down] : [keys.left, keys.right], function (keyCode) {
                        return keyboardNavigation.onKbdSideways(this, keyCode);
                    }],
                [inverted ? [keys.left, keys.right] : [keys.up, keys.down], function (keyCode) {
                        return keyboardNavigation.onKbdVertical(this, keyCode);
                    }],
                [[keys.enter, keys.space], function () {
                        if (chart.highlightedPoint) {
                            chart.highlightedPoint.firePointEvent('click');
                        }
                        return this.response.success;
                    }]
            ],
            init: function (dir) {
                return keyboardNavigation.onHandlerInit(this, dir);
            },
            terminate: function () {
                return keyboardNavigation.onHandlerTerminate();
            }
        });
    },
    /**
     * @private
     * @param {Highcharts.KeyboardNavigationHandler} handler
     * @param {number} keyCode
     * @return {number}
     * response
     */
    onKbdSideways: function (handler, keyCode) {
        var keys = this.keyCodes, isNext = keyCode === keys.right || keyCode === keys.down;
        return this.attemptHighlightAdjacentPoint(handler, isNext);
    },
    /**
     * @private
     * @param {Highcharts.KeyboardNavigationHandler} handler
     * @param {number} keyCode
     * @return {number}
     * response
     */
    onKbdVertical: function (handler, keyCode) {
        var chart = this.chart, keys = this.keyCodes, isNext = keyCode === keys.down || keyCode === keys.right, navOptions = chart.options.accessibility.keyboardNavigation
            .seriesNavigation;
        // Handle serialized mode, act like left/right
        if (navOptions.mode && navOptions.mode === 'serialize') {
            return this.attemptHighlightAdjacentPoint(handler, isNext);
        }
        // Normal mode, move between series
        var highlightMethod = (chart.highlightedPoint &&
            chart.