on () {
        this.center = null;
        pieProto.redraw.call(this, arguments);
    },
    // For arrayMin and arrayMax calculations array shouldn't have
    // null/undefined/string values. In this case it is needed to check if
    // points Z value is a Number.
    zValEval: function (zVal) {
        if (typeof zVal === 'number' && !isNaN(zVal)) {
            return true;
        }
        return null;
    },
    // Before standard translate method for pie chart it is needed to
    // calculate min/max radius of each pie slice based on its Z value.
    calculateExtremes: function () {
        var series = this, chart = series.chart, plotWidth = chart.plotWidth, plotHeight = chart.plotHeight, seriesOptions = series.options, slicingRoom = 2 * (seriesOptions.slicedOffset || 0), zMin, zMax, zData = series.zData, smallestSize = Math.min(plotWidth, plotHeight) - slicingRoom, 
        // Min and max size of pie slice:
        extremes = {}, 
        // In pie charts size of a pie is changed to make space for
        // dataLabels, then series.center is changing.
        positions = series.center || series.getCenter();
        ['minPointSize', 'maxPointSize'].forEach(function (prop) {
            var length = seriesOptions[prop], isPercent = /%$/.test(length);
            length = parseInt(length, 10);
            extremes[prop] = isPercent ?
                smallestSize * length / 100 :
                length * 2; // Because it should be radius, not diameter.
        });
        series.minPxSize = positions[3] + extremes.minPointSize;
        series.maxPxSize = clamp(positions[2], positions[3] + extremes.minPointSize, extremes.maxPointSize);
        if (zData.length) {
            zMin = pick(seriesOptions.zMin, arrayMin(zData.filter(series.zValEval)));
            zMax = pick(seriesOptions.zMax, arrayMax(zData.filter(series.zValEval)));
            this.getRadii(zMin, zMax, series.minPxSize, series.maxPxSize);
        }
    },
    /* eslint-disable valid-jsdoc */
    /**
     * Finding radius of series points based on their Z value and min/max Z
     * value for all series.
     *
     * @private
     * @function Highcharts.Series#getRadii
     *
     * @param {number} zMin
     *        Min threshold for Z value. If point's Z value is smaller that
     *        zMin, point will have the smallest possible radius.
     *
     * @param {number} zMax
     *        Max threshold for Z value. If point's Z value is bigger that
     *        zMax, point will have the biggest possible radius.
     *
     * @param {number} minSize
     *        Minimal pixel size possible for radius.
     *
     * @param {numbner} maxSize
     *        Minimal pixel size possible for radius.
     *
     * @return {void}
     */
    getRadii: function (zMin, zMax, minSize, maxSize) {
        var i = 0, pos, zData = this.zData, len = zData.length, radii = [], options = this.options, sizeByArea = options.sizeBy !== 'radius', zRange = zMax - zMin, value, radius;
        // Calculate radius for all pie slice's based on their Z values
        for (i; i < len; i++) {
            // if zData[i] is null/undefined/string we need to take zMin for
            // smallest radius.
            value = this.zValEval(zData[i]) ? zData[i] : zMin;
            if (value <= zMin) {
                radius = minSize / 2;
            }
            else if (value >= zMax) {
                radius = maxSize / 2;
            }
            else {
                // Relative size, a number between 0 and 1
                pos = zRange > 0 ? (value - zMin) / zRange : 0.5;
                if (sizeByArea) {
                    pos = Math.sqrt(pos);
                }
                radius = Math.ceil(minSize + pos * (maxSize - minSize)) / 2;
            }
            radii.push(radius);
        }
        this.radii = radii;
    },
    /* eslint-enable valid-jsdoc */
    // Extend translate by updating radius for each pie slice instead of
    // using one global radius.
    translate: function (positions) {
        this.generatePoints();
        var series = this, cumulative = 0, precision = 1000, // issue #172
        options = series.options, slicedOffset = options.slicedOffset, connectorOffset = slicedOffset + (options.borderWidth || 0), finalConnectorOffset, start, end, angle, startAngle = options.startAngle || 0, startAngleRad = Math.PI / 180 * (startAngle - 90), endAngleRad = Math.PI / 180 * (pick(options.endAngle, startAngle 