dd the text size for alignment calculation
        extend(options, {
            width: bBox.width,
            height: bBox.height
        });
        // Allow a hook for changing alignment in the last moment, then do the
        // alignment
        if (rotation) {
            justify = false; // Not supported for rotated text
            rotCorr = chart.renderer.rotCorr(baseline, rotation); // #3723
            alignAttr = {
                x: (alignTo.x +
                    (options.x || 0) +
                    alignTo.width / 2 +
                    rotCorr.x),
                y: (alignTo.y +
                    (options.y || 0) +
                    { top: 0, middle: 0.5, bottom: 1 }[options.verticalAlign] *
                        alignTo.height)
            };
            setStartPos(alignAttr); // data sorting
            dataLabel[isNew ? 'attr' : 'animate'](alignAttr)
                .attr({
                align: align
            });
            // Compensate for the rotated label sticking out on the sides
            normRotation = (rotation + 720) % 360;
            negRotation = normRotation > 180 && normRotation < 360;
            if (align === 'left') {
                alignAttr.y -= negRotation ? bBox.height : 0;
            }
            else if (align === 'center') {
                alignAttr.x -= bBox.width / 2;
                alignAttr.y -= bBox.height / 2;
            }
            else if (align === 'right') {
                alignAttr.x -= bBox.width;
                alignAttr.y -= negRotation ? 0 : bBox.height;
            }
            dataLabel.placed = true;
            dataLabel.alignAttr = alignAttr;
        }
        else {
            setStartPos(alignTo); // data sorting
            dataLabel.align(options, null, alignTo);
            alignAttr = dataLabel.alignAttr;
        }
        // Handle justify or crop
        if (justify && alignTo.height >= 0) { // #8830
            this.justifyDataLabel(dataLabel, options, alignAttr, bBox, alignTo, isNew);
            // Now check that the data label is within the plot area
        }
        else if (pick(options.crop, true)) {
            visible =
                chart.isInsidePlot(alignAttr.x, alignAttr.y) &&
                    chart.isInsidePlot(alignAttr.x + bBox.width, alignAttr.y + bBox.height);
        }
        // When we're using a shape, make it possible with a connector or an
        // arrow pointing to thie point
        if (options.shape && !rotation) {
            dataLabel[isNew ? 'attr' : 'animate']({
                anchorX: inverted ?
                    chart.plotWidth - point.plotY :
                    point.plotX,
                anchorY: inverted ?
                    chart.plotHeight - point.plotX :
                    point.plotY
            });
        }
    }
    // To use alignAttr property in hideOverlappingLabels
    if (isNew && enabledDataSorting) {
        dataLabel.placed = false;
    }
    // Show or hide based on the final aligned position
    if (!visible && (!enabledDataSorting || justify)) {
        dataLabel.hide(true);
        dataLabel.placed = false; // don't animate back in
    }
};
/**
 * Set starting position for data label sorting animation.
 *
 * @private
 * @function Highcharts.Series#setDataLabelStartPos
 * @param {Highcharts.SVGElement} dataLabel
 * @param {Highcharts.ColumnPoint} point
 * @param {boolean | undefined} [isNew]
 * @param {boolean} [isInside]
 * @param {Highcharts.AlignObject} [alignOptions]
 *
 * @return {void}
 */
Series.prototype.setDataLabelStartPos = function (point, dataLabel, isNew, isInside, alignOptions) {
    var chart = this.chart, inverted = chart.inverted, xAxis = this.xAxis, reversed = xAxis.reversed, labelCenter = inverted ? dataLabel.height / 2 : dataLabel.width / 2, pointWidth = point.pointWidth, halfWidth = pointWidth ? pointWidth / 2 : 0, startXPos, startYPos;
    startXPos = inverted ?
        alignOptions.x :
        (reversed ?
            -labelCenter - halfWidth :
            xAxis.width - labelCenter + halfWidth);
    startYPos = inverted ?
        (reversed ?
            this.yAxis.height - labelCenter + halfWidth :
            -labelCenter - halfWidth) : alignOptions.y;
    dataLabel.startXPos = startXPos;
    dataLabel.startYPos = startYPos;
    // We need to handle visibility in case of sorting point outside plot area
    if (!isInside) {
        dataLabel
            .attr({ opacity: 1 })
            .animate({ opacity: 0 }, void 0, dataLabel.hide);
    }
    else if (dataLabel.visibility === 'hidden') {
        dataLabel.show();
        dataLabel
            .attr({ opacity: 0 })
            .animate({ opacity: 1 });
    }
    // Save start position on first render, but do not change position
    if (!chart.hasRendered) {
        return;
    }
    // Set start position
    if (isNew) {
        dataLabel.attr({ x: dataLabel.startXPos, y: dataLabel.startYPos });
    }
    dataLabel.placed = true;
};
/**
 * If data labels fall partly outside the plot area, align them back in, in a
 * way that doesn't hide the point.
 *
 * @private
 * @function Highcharts.Series#justifyDataLabel
 * @param {Highcharts.SVGElement} dataLabel
 * @param {Highcharts.DataLabelsOptions} options
 * @param {Highcharts.SVGAttributes} alignAttr
 * @param {Highcharts.BBoxObject} bBox
 * @param {Highcharts.BBoxObject} [alignTo]
 * @param {boolean} [isNew]
 * @return {boolean|undefined}
 */
Series.prototype.justifyDataLabel = function (dataLabel, options, alignAttr, bBox, alignTo, isNew) {
    var chart = this.chart, align = options.align, verticalAlign = options.verticalAlign, off, justified, padding = dataLabel.box ? 0 : (dataLabel.padding || 0);
    var _a = options.x, x = _a === void 0 ? 0 : _a, _b = options.y, y = _b === void 0 ? 0 : _b;
    // Off left
    off = alignAttr.x + padding;
    if (off < 0) {
        if (align === 'right' && x >= 0) {
            options.align = 'left';
            options.inside = true;
        }
        else {
            x -= off;
        }
        justified = true;
    }
    // Off right
    off = alignAttr.x + bBox.width - padding;
    if (off > chart.plotWidth) {
        if (align === 'left' && x <= 0) {
            options.align = 'right';
            options.inside = true;
        }
        else {
            x += chart.plotWidth - off;
        }
        justified = true;
    }
    // Off top
    off = alignAttr.y + padding;
    if (off < 0) {
        if (verticalAlign === 'bottom' && y >= 0) {
            options.verticalAlign = 'top';
            options.inside = true;
        }
        else {
            y -= off;
        }
        justified = true;
    }
    // Off bottom
    off = alignAttr.y + bBox.height - padding;
    if (off > chart.plotHeight) {
        if (verticalAlign === 'top' && y <= 0) {
            options.verticalAlign = 'bottom';
            options.inside = true;
        }
        else {
            y += chart.plotHeight - off;
        }
        justified = true;
    }
    if (justified) {
        options.x = x;
        options.y = y;
        dataLabel.placed = !isNew;
        dataLabel.align(options, void 0, alignTo);
    }
    return justified;
};
if (seriesTypes.pie) {
    seriesTypes.pie.prototype.dataLabelPositioners = {
        // Based on the value computed in Highcharts' distribute algorithm.
        radialDistributionY: function (point) {
            return point.top + point.distributeBox.pos;
        },
        // get the x - use the natural x position for labels near the
        // top and bottom, to prevent the top and botton slice
        // connectors from touching each other on either side
        // Based on the value computed in Highcharts' distribute algorithm.
        radialDistributionX: function (series, point, y, naturalY) {
            return series.getX(y < point.top + 2 || y > point.bottom - 2 ?
                naturalY :
                y, point.half, point);
        },
        // dataLabels.distance determines the x position of the label
        justify: function (point, radius, seriesCenter) {
            return seriesCenter[0] + (point.half ? -1 : 1) *
                (radius + point.labelDistance);
        },
        // Left edges of the left-half labels touch the left edge of the plot
        // area. Right edges of the right-half labels touch the right edge of
        // the plot area.
        alignToPlotEdges: function (dataLabel, half, plotWidth, plotLeft) {
            var dataLabelWidth = dataLabel.getBBox().width;
            return half ? dataLabelWidth + plotLeft :
                plotWidth - dataLabelWidth - plotLeft;
        },
        // Connectors of each side end in the same x position. Labels are
        // aligned to them. Left edge of the widest left-half label touches the
        // left edge of the plot area. Right edge of the widest right-half label
        // touches the right edge of the plot area.
        alignToConnectors: function (points, half, plotWidth, plotLeft) {
            var maxDataLabelWidth = 0, dataLabelWidth;
            // find widest data label
            points.forEach(function (point) {
                dataLabelWidth = point.dataLabel.getBBox().width;
                if (dataLabelWidth > maxDataLabelWidth) {
                    maxDataLabelWidth = dataLabelWidth;
                }
            });
            return half ? maxDataLabelWidth + plotLeft :
                plotWidth - maxDataLabelWidth - plotLeft;
        }
    };
    /**
     * Override the base drawDataLabels method by pie specific functionality
     *
     * @private
     * @function Highcharts.seriesTypes.pie#drawDataLabels
     * @return {void}
     */
    seriesTypes.pie.prototype.drawDataLabels = function () {
        var series = this, data = series.data, point, chart = series.chart, options = series.options.dataLabels || {}, connectorPadding = options.connectorPadding, connectorWidth, plotWidth = chart.plotWidth, plotHeight = chart.plotHeight, plotLeft = chart.plotLeft, maxWidth = Math.round(chart.chartWidth / 3), connector, seriesCenter = series.center, radius = seriesCenter[2] / 2, centerY = seriesCenter[1], dataLabel, dataLabelWidth, 
        // labelPos,
        labelPosition, labelHeight, 
        // divide the points into right and left halves for anti collision
        halves = [
            [],
            [] // left
        ], x, y, visibility, j, overflow = [0, 0, 0, 0], // top, right, bottom, left
        dataLabelPositioners = series.dataLabelPositioners, pointDataLabelsOptions;
        // get out if not enabled
        if (!series.visible ||
            (!options.enabled &&
                !series._hasPointLabels)) {
            return;
        }
        // Reset all labels that have been shortened
        data.forEach(function (point) {
            if (point.dataLabel && point.visible && point.dataLabel.shortened) {
                point.dataLabel
                    .attr({
                    width: 'auto'
                }).css({
                    width: 'auto',
                    textOverflow: 'clip'
                });
                point.dataLabel.shortened = false;
            }
        });
        // run parent method
        Series.prototype.drawDataLabels.apply(series);
        data.forEach(function (point) {
            if (point.dataLabel) {
                if (point.visible) { // #407, #2510
                    // Arrange points for detection collision
                    halves[point.half].push(point);
                    // Reset positions (#4905)
                    point.dataLabel._pos = null;
                    // Avoid long labels squeezing the pie size too far down
                    if (!defined(options.style.width) &&
                        !defined(point.options.dataLabels &&
                            point.options.dataLabels.style &&
                            point.options.dataLabels.style.width)) {
                        if (point.dataLabel.getBBox().width > maxWidth) {
                            point.dataLabel.css({
                                // Use a fraction of the maxWidth to avoid
                                // wrapping close to the end of the string.
                                width: Math.round(maxWidth * 0.7) + 'px'
                            });
                            point.dataLabel.shortened = true;
                        }
                    }
                }
                else {
                    point.dataLabel = point.dataLabel.destroy();
                    // Workaround to make pies destroy multiple datalabels
                    // correctly. This logic needs rewriting to support multiple
                    // datalabels fully.
                    if (point.dataLabels && point.dataLabels.length === 1) {
                        delete point.dataLabels;
                    }
                }
            }
        });
        /* Loop over the points in each half, starting from the top and bottom
         * of the pie to detect overlapping labels.
         */
        halves.forEach(function (points, i) {
            var top, bottom, length = points.length, positions = [], naturalY, sideOverflow, size, distributionLength;
            if (!length) {
                return;
            }
            // Sort by angle
            series.sortByAngle(points, i - 0.5);
            // Only do anti-collision when we have dataLabels outside the pie
            // and have connectors. (#856)
            if (series.maxLabelDistance > 0) {
                top = Math.max(0, centerY - radius - series.maxLabelDistance);
                bottom = Math.min(centerY + radius + series.maxLabelDistance, chart.plotHeight);
                points.forEach(function (point) {
                    // check if specific points' label is outside the pie
                    if (point.labelDistance > 0 && point.dataLabel) {
                        // point.top depends on point.labelDistance value
                        // Used for calculation of y value in getX method
                        point.top = Math.max(0, centerY - radius - point.labelDistance);
                        point.bottom = Math.min(centerY + radius + point.labelDistance, chart.plotHeight);
                        size = point.dataLabel.getBBox().height || 21;
                        // point.positionsIndex is needed for getting index of
                        // parameter related to specific point inside positions
                        // array - not every point is in positions array.
                        point.distributeBox = {
                            target: point.labelPosition.natural.y -
                                point.top + size / 2,
                            size: size,
                            rank: point.y
                        };
                        positions.push(point.distributeBox);
                    }
                });
                distributionLength = bottom + size - top;
                H.distribute(positions, distributionLength, distributionLength / 5);
            }
            // Now the used slots are sorted, fill them up sequentially
            for (j = 0; j < length; j++) {
                point = points[j];
                // labelPos = point.labelPos;
                labelPosition = point.labelPosition;
                dataLabel = point.dataLabel;
                visibility = point.visible === false ? 'hidden' : 'inherit';
                naturalY = labelPosition.natural.y;
                y = naturalY;
                if (positions && defined(point.distributeBox)) {
                    if (typeof point.distributeBox.pos === 'undefined') {
                        visibility = 'hidden';
                    }
                    else {
                        labelHeight = point.distributeBox.size;
                        // Find label's y position
                        y = dataLabelPositioners
                            .radialDistributionY(point);
                    }
                }
                // It is needed to delete point.positionIndex for
                // dynamically added points etc.
                delete point.positionIndex; // @todo unused
                // Find label's x position
                // justify is undocumented in the API - preserve support for it
                if (options.justify) {
                    x = dataLabelPositioners.justify(point, radius, seriesCenter);
                }
                else {
                    switch (options.alignTo) {
                        case 'connectors':
                            x = dataLabelPositioners.alignToConnectors(points, i, plotWidth, plotLeft);
                            break;
                        case 'plotEdges':
                            x = dataLabelPositioners.alignToPlotEdges(dataLabel, i, plotWidth, plotLeft);
                            break;
                        default:
                            x = dataLabelPositioners.radialDistributionX(series, point, y, naturalY);
                    }
                }
                // Record the placement and visibility
                dataLabel._attr = {
                    visibility: visibility,
                    align: labelPosition.alignment
                };
                pointDataLabelsOptions = point.options.dataLabels || {};
                dataLabel._pos = {
                    x: (x +
                        pick(pointDataLabelsOptions.x, options.x) + // (#12985)
                        ({
                            left: connectorPadding,
                            right: -connectorPadding
                        }[labelPosition.alignment] || 0)),
                    // 10 is for the baseline (label vs text)
                    y: (y +
                        pick(pointDataLabelsOptions.y, options.y) - // (#12985)
                        10)
                };
                // labelPos.x = x;
                // labelPos.y = y;
                labelPosition.final.x = x;
                labelPosition.final.y = y;
                // Detect overflowing data labels
                if (pick(options.crop, true)) {
                    dataLabelWidth = dataLabel.getBBox().width;
                    sideOverflow = null;
                    // Overflow left
                    if (x - dataLabelWidth < connectorPadding &&
                        i === 1 // left half
                    ) {
                        sideOverflow = Math.round(dataLabelWidth - x + connectorPadding);
                        overflow[3] = Math.max(sideOverflow, overflow[3]);
                        // Overflow right
                    }
                    else if (x + dataLabelWidth > plotWidth - connectorPadding &&
                        i === 0 // right half
                    ) {
                        sideOverflow = Math.round(x + dataLabelWidth - plotWidth + connectorPadding);
                        overflow[1] = Math.max(sideOverflow, overflow[1]);
                    }
                    // Overflow top
                    if (y - labelHeight / 2 < 0) {
                        overflow[0] = Math.max(Math.round(-y + labelHeight / 2), overflow[0]);
                        // Overflow left
                    }
                    else if (y + labelHeight / 2 > plotHeight) {
                        overflow[2] = Math.max(Math.round(y + labelHeight / 2 - plotHeight), overflow[2]);
                    }
                    dataLabel.sideOverflow = sideOverflow;
                }
            } // for each point
        }); // for each half
        // Do not apply the final placement and draw the connectors until we
        // have verified that labels are not spilling over.
        if (arrayMax(overflow) === 0 ||
            this.verifyDataLabelOverflow(overflow)) {
            // Place the labels in the final position
            this.placeDataLabels();
            this.points.forEach(function (point) {
                // #8864: every connector can have individual options
                pointDataLabelsOptions =
                    merge(options, point.options.dataLabels);
                connectorWidth =
                    pick(pointDataLabelsOptions.connectorWidth, 1);
                // Draw the connector
                if (connectorWidth) {
                    var isNew;
                    connector = point.connector;
                    dataLabel = point.dataLabel;
                    if (dataLabel &&
                        dataLabel._pos &&
                        point.visible &&
                        point.labelDistance > 0) {
                        visibility = dataLabel._attr.visibility;
                        isNew = !connector;
                        if (isNew) {
                            point.connector = connector = chart.renderer
                                .path()
                                .addClass('highcharts-data-label-connector ' +
                                ' highcharts-color-' + point.colorIndex +
                                (point.className ?
                                    ' ' + point.className :
                                    ''))
                                .add(series.dataLabelsGroup);
                            if (!chart.styledMode) {
                                connector.attr({
                                    'stroke-width': connectorWidth,
                                    'stroke': (pointDataLabelsOptions.connectorColor ||
                                        point.color ||
                                        '#666666')
                                });
                            }
                        }
                        connector[isNew ? 'attr' : 'animate']({
                            d: point.getConnectorPath()
                        });
                        connector.attr('visibility', visibility);
                    }
                    else if (connector) {
                        point.connector = connector.destroy();
                    }
                }
            });
        }
    };
    /**
     * Extendable method for getting the path of the connector between the data
     * label and the pie slice.
     *
     * @private
     * @function Highcharts.seriesTypes.pie#connectorPath
     *
     * @param {*} labelPos
     *
     * @return {Highcharts.SVGPathArray}
     */
    // TODO: depracated - remove it
    /*
    seriesTypes.pie.prototype.connectorPath = function (labelPos) {
        var x = labelPos.x,
            y = labelPos.y;
        return pick(this.options.dataLabels.softConnector, true) ? [
            'M',
            // end of the string at the label
            x + (labelPos[6] === 'left' ? 5 : -5), y,
            'C',
            x, y, // first break, next to the label
            2 * labelPos[2] - labelPos[4], 2 * labelPos[3] - labelPos[5],
            labelPos[2], labelPos[3], // second break
            'L',
            labelPos[4], labelPos[5] // base
        ] : [
            'M',
            // end of the string at the label
            x + (labelPos[6] === 'left' ? 5 : -5), y,
            'L',
            labelPos[2], labelPos[3], // second break
            'L',
            labelPos[4], labelPos[5] // base
        ];
    };
    */
    /**
     * Perform the final placement of the data labels after we have verified
     * that they fall within the plot area.
     *
     * @private
     * @function Highcharts.seriesTypes.pie#placeDataLabels
     * @return {void}
     */
    seriesTypes.pie.prototype.placeDataLabels = function () {
        this.points.forEach(function (point) {
            var dataLabel = point.dataLabel, _pos;
            if (dataLabel && point.visible) {
                _pos = dataLabel._pos;
                if (_pos) {
                    // Shorten data labels with ellipsis if they still overflow
                    // after the pie has reached minSize (#223).
                    if (dataLabel.sideOverflow) {
                        dataLabel._attr.width =
                            Math.max(dataLabel.getBBox().width -
                                dataLabel.sideOverflow, 0);
                        dataLabel.css({
                            width: dataLabel._attr.width + 'px',
                            textOverflow: ((this.options.dataLabels.style || {})
                                .textOverflow ||
                                'ellipsis')
                        });
                        dataLabel.shortened = true;
                    }
                    dataLabel.attr(dataLabel._attr);
                    dataLabel[dataLabel.moved ? 'animate' : 'attr'](_pos);
                    dataLabel.moved = true;
                }
                else if (dataLabel) {
                    dataLabel.attr({ y: -9999 });
                }
            }
            // Clear for update
            delete point.distributeBox;
        }, this);
    };
    seriesTypes.pie.prototype.alignDataLabel = noop;
    /**
     * Verify whether the data labels are allowed to draw, or we should run more
     * translation and data label positioning to keep them inside the plot area.
     * Returns true when data labels are ready to draw.
     *
     * @private
     * @function Highcharts.seriesTypes.pie#verifyDataLabelOverflow
     * @param {Array<number>} overflow
     * @return {boolean}
     */
    seriesTypes.pie.prototype.verifyDataLabelOverflow = function (overflow) {
        var center = this.center, options = this.options, centerOption = options.center, minSize = options.minSize || 80, newSize = minSize, 
        // If a size is set, return true and don't try to shrink the pie
        // to fit the labels.
        ret = options.size !== null;
        if (!ret) {
            // Handle horizontal size and center
            if (centerOption[0] !== null) { // Fixed center
                newSize = Math.max(center[2] -
                    Math.max(overflow[1], overflow[3]), minSize);
            }
            else { // Auto center
                newSize = Math.max(
                // horizontal overflow
                center[2] - overflow[1] - overflow[3], minSize);
                // horizontal center
                center[0] += (overflow[3] - overflow[1]) / 2;
            }
            // Handle vertical size and center
            if (centerOption[1] !== null) { // Fixed center
                newSize = clamp(newSize, minSize, center[2] - Math.max(overflow[0], overflow[2]));
            }
            else { // Auto center
                newSize = clamp(newSize, minSize, 
                // vertical overflow
                center[2] - overflow[0] - overflow[2]);
                // vertical center
                center[1] += (overflow[0] - overflow[2]) / 2;
            }
            // If the size must be decreased, we need to run translate and
            // drawDataLabels again
            if (newSize < center[2]) {
                center[2] = newSize;
                center[3] = Math.min(// #3632
                relativeLength(options.innerSize || 0, newSize), newSize);
                this.translate(center);
                if (this.drawDataLabels) {
                    this.drawDataLabels();
                }
                // Else, return true to indicate that the pie and its labels is
                // within the plot area
            }
            else {
                ret = true;
            }
        }
        return ret;
    };
}
if (seriesTypes.column) {
    /**
     * Override the basic data label alignment by adjusting for the position of
     * the column.
     *
     * @private
     * @function Highcharts.seriesTypes.column#alignDataLabel
     * @param {Highcharts.Point} point
     * @param {Highcharts.SVGElement} dataLabel
     * @param {Highcharts.DataLabelsOptions} options
     * @param {Highcharts.BBoxObject} alignTo
     * @param {boolean} [isNew]
     * @return {void}
     */
    seriesTypes.column.prototype.alignDataLabel = function (point, dataLabel, options, alignTo, isNew) {
        var inverted = this.chart.inverted, series = point.series, 
        // data label box for alignment
        dlBox = point.dlBox || point.shapeArgs, below = pick(point.below, // range series
        point.plotY >
            pick(this.translatedThreshold, series.yAxis.len)), 
        // draw it inside the box?
        inside = pick(options.inside, !!this.options.stacking), overshoot;
        // Align to the column itself, or the top of it
        if (dlBox) { // Area range uses this method but not alignTo
            alignTo = merge(dlBox);
            if (alignTo.y < 0) {
                alignTo.height += alignTo.y;
                alignTo.y = 0;
            }
            // If parts of the box overshoots outside the plot area, modify the
            // box to center the label inside
            overshoot = alignTo.y + alignTo.height - series.yAxis.len;
            if (overshoot > 0 && overshoot < alignTo.height) {
                alignTo.height -= overshoot;
            }
            if (inverted) {
                alignTo = {
                    x: series.yAxis.len - alignTo.y - alignTo.height,
                    y: series.xAxis.len - alignTo.x - alignTo.width,
                    width: alignTo.height,
                    height: alignTo.width
                };
            }
            // Compute the alignment box
            if (!inside) {
                if (inverted) {
                    alignTo.x += below ? 0 : alignTo.width;
                    alignTo.width = 0;
                }
                else {
                    alignTo.y += below ? alignTo.height : 0;
                    alignTo.height = 0;
                }
            }
        }
        // When alignment is undefined (typically columns and bars), display the
        // individual point below or above the point depending on the threshold
        options.align = pick(options.align, !inverted || inside ? 'center' : below ? 'right' : 'left');
        options.verticalAlign = pick(options.verticalAlign, inverted || inside ? 'middle' : below ? 'top' : 'bottom');
        // Call the parent method
        Series.prototype.alignDataLabel.call(this, point, dataLabel, options, alignTo, isNew);
        // If label was justified and we have contrast, set it:
        if (options.inside && point.contrastColor) {
            dataLabel.css({
                color: point.contrastColor
            });
        }
    };
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M94.12 315.1c0 25.9-21.16 47.06-47.06 47.06S0 341 0 315.1c0-25.9 21.16-47.06 47.06-47.06h47.06v47.06zm23.72 0c0-25.9 21.16-47.06 47.06-47.06s47.06 21.16 47.06 47.06v117.84c0 25.9-21.16 47.06-47.06 47.06s-47.06-21.16-47.06-47.06V315.1zm47.06-188.98c-25.9 0-47.06-21.16-47.06-47.06S139 32 164.9 32s47.06 21.16 47.06 47.06v47.06H164.9zm0 23.72c25.9 0 47.06 21.16 47.06 47.06s-21.16 47.06-47.06 47.06H47.06C21.16 243.96 0 222.8 0 196.9s21.16-47.06 47.06-47.06H164.9zm188.98 47.06c0-25.9 21.16-47.06 47.06-47.06 25.9 0 47.06 21.16 47.06 47.06s-21.16 47.06-47.06 47.06h-47.06V196.9zm-23.72 0c0 25.9-21.16 47.06-47.06 47.06-25.9 0-47.06-21.16-47.06-47.06V79.06c0-25.9 21.16-47.06 47.06-47.06 25.9 0 47.06 21.16 47.06 47.06V196.9zM283.1 385.88c25.9 0 47.06 21.16 47.06 47.06 0 25.9-21.16 47.06-47.06 47.06-25.9 0-47.06-21.16-47.06-47.06v-47.06h47.06zm0-23.72c-25.9 0-47.06-21.16-47.06-47.06 0-25.9 21.16-47.06 47.06-47.06h117.84c25.9 0 47.06 21.16 47.06 47.06 0 25.9-21.16 47.06-47.06 47.06H283.1z"/></svg>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   PACK     *�x����
Z���q)����,N�+E6װv*�;�����t�1I�!f�;�𖸣�k�}����mC�^
�_G�(��ދ����F�0�1���4c�%�3�����W>���y	�p{���|��
c�8�����c� &���۴�JU��J���n�� D�����T���ZF(Y���.���6�T�N�:$�sbn
�!04K����7�0�m�����U�al�4O�9���2C�����Ul�ʥ��S��ʴ���!� =X�2,]�忍������N
*&�W�$)��0p �����x���M
�0@�}N�(�m� "�Q�&��T�����|��"	ڏ��G�DN��Α���ڞ"�\�6�u��gքD�tL�H���z�� pk�y��\�^�� OH�wˍ�-�2_^�rL�t��s.h�AɃ��N�5�c!�0<�7�SH�x���9n�0D{�����S�aI�Kp[LJ��·����
�c�
��x���j�w7}�iZ$���l(Y��S!���Qގ�k����-T�&O"�H:$;N)h&�d5ߙ"vnJ*z�6�U�9�
�&�AE'�&g0�P�>/���
n��J��
m�{9������%h�A��| ;ڒ��������9Aq��o~˕ꅪ������Fm�1[�������� һZ��x���Q�  �N�4���1^��V�Ȧ��ߝ�ߗ��El�$>T��g`G�u֩8�0NZ��p�u�R�Q�I%(͒�*S���B9bJ���ںm���"��d�����xy_����"�����ږq���Y7���ޚC��x���Q�  �N�4���c�J�e.���ߝ�ߗ��U-)�v�F �B ,1� &��b.�`>��=lA�sF̅r
P+:�PE�B�0ՙ����c<�n�C�G���5ݿ�:t��X��k���b��OD@�����q���ɛ��� D*�x����
MJ����~���E�!�S0���B��%	gS�"����]>C#�`-a��K6xr.���l�Q�(>ǲu=i|�p�hr|�:d
��n\�{��S[�����o��j��r����� G�x����n�0E��
��6DQ���#�fH`�1����*��n���{�&'D�[�MP�-8+;��n&���Y�m�-� a̅��:в
�0 ���"P�&i���_E�dM��t����}��b�yS�%�P�(�}����8�B"b�)�=��)3�d���
�0 �9E.���|@D�.
�ZW�^�[0�������b`�D���>�'paC�u6DɃZI�8F(���E鍲RE�YH�I;)v8ù�2a�lu��#fX+�! =e\��TQ����0��a�gʵR�I�=0��m����} C�w�{�l{zk��+H?�x���1N�0E����V���v�B\�C��M��&8����(hi��{_�q>@"pB�28�V�j�b���F�b��?� �8�(t:���ȃ$(~,�`�����$��ڂH<����"��!�T����C���x�]�mL������1+�!�����e]^��޻�L�	"@w�ˬ���B����&7z��\~���T�����Y�#��ߓ^��g��
�,}Y���wj�H�Rh�>r'���(!?Ǹ�+Vk	�{�� �lK�'�o����	J����_�R��*�_���ة�c=g��5>r_��G���Y��x���A�� E���$��1aTU�t�K�4H�dY��E��������%3KV��,@Z�X;�h�൱�fJ��eNE�R����U��`�w��N�'��*4	w�eͲ,�^8o�<�S������/��£�k<K D�H�eSe���J��m׵�<�S3>�-$N�����7_���ަz�=��=���J�]�X��x���;n�0D{����?W�aq�KP˥E���*|{I�>�`0�az#�(&A�ZhE�!�	
VY�"�B��y��ZR�t~� ��)E
a �f����x_���S�( �K���ȝ���G	�9�Z�\:c$8�<���m����m`�u�=Aq�_�+W��T�痿|;vj�X���|��ܗc�Q�7oO[A�x���;n�0D{����ˏh�a$m.�$��R(���#$E�t�����Y�0x��)a�E��':&������.*��4E" �
y�0����,��t�ڇ�UZ�U�GR{k��Me
��li{]Kow��ѣ�8rΜ�mz��F{���+Dːx���1n� E{��n����U.�C0ؖ�k���>��i�~����Ƭ( ��
����m��8&���j��qƑCD��{k4���4�F��c�!@a"bN2�M����mcʬ^�?�Y�z�6.4?^�ܕ��v�`Q]O���t����m�޹��R�g����qQkU�ȶ��~�e:�7����~v_gh8�x���=�� �{N�la��YEQ�is�<�H{1.r�XI�~��h�i��뭙PJE&�8tHX�� >��,*
�_*��W_���֗#�>��=�y�o${KZݝx����
j�Z7��^[5���uW5�����M�͏g����V�f�D�'��\���ܺ��w_���m��|��>�V�Hѐx���A� �=�����Pc�� m"�Rz{�/y�z�5�l�����P��
 29�Į��ڤ�3t�l�8�&z��O)9�
� �����
�gO�ZO7l]2$�K��2n	2!*��562(#N|���D峣��8�W��n~�+������IG䝸I+�4j-}����
,υ��=w>���B�9��\������,�8ܒ���7Aܖ�������_�r�䪜<���q��z���k|�>���xSY�x���Q� �9h��
&Mӫ��H��޿����2/�`e�$�I�2���dzǄ���NFvpf���ܦ�0;��y�>"Cf�(r�_�l���Oű����^E���zW.�=m�i����G"oo4�Fk����`u_Ya�ZZ:�r��\�N'�x���]� �9h���@�4�
���D�E�=C_'���h�S��N,��%�$��d!`���s՞>]yF%�1o9�B��� ?��L�آ����>�棣����8���a��z׼�w��S���|�7b"uѺ�����d]�c�UG��x���[� �Y�\(���r�S%)V)ݿ���If2�ҖU�����@���[c)��Ey�NI|��=�⋊�X�L%c�I;"��&X_<\�3���ڻl|�8C���Y���g�]���R9c���A^h�Ĥ����������C� &"Dy�x����
�R]Р����s%b�`���u�����	��.��hS<��ٹ��e�w�R�g$o/� ̩��������t��Jm�� �H#�x���m
�0D�������lAīlҍ��izsf��E� J!O9�S&D0�d]2�Ƹ.j�.�����j�Ba�Mq>��(<����s���C�.�Eߚ߳�1<������v��#H_ �|[��OW�{-���S[FC�x���M� @�=��`�����0S%[)��=���y�7��&b��l6(�ئF�}e�L5Ime�gj�LQ<D.���%sJ��A�P�kJE�c�֡{٧�MJ}��6�E�x���׺���!Y����c�y{�����YF[�V��DE�x���K
�0 �}N�(3���k����D��4��=���Ufid�vC���>C�c
Rv��D�?M�Q�cT:+ҌA�ޑWؐ�d�FAK{�U�׉)������Xy{|��8��Dg�w`4�
���I9���!��h�G���՘c�]�X=UJP}-��P)Ϡ�C_밝v��	��.��h*.��٩��e�w;��✽�@0��MO�7�P��M���F˔x����	1 �SEPryDle��р�4�׿g~
�0 �s�\@�l�"^%�n�`ښ�x}{�g`FѵX�(LLd(�-���s�l$�8��.�Ђ$���R���Oq���1Q$���1^k�-�C�&�Eߚ�c��?�-��+���Mp6��S� �m��߮�1�"_��E̒x����
��"��9�-�|�uӏ!�=�C �x����
���ҕNgD'c�wg����otU�p�4W*%h��MG@�R]�$X���]���Xr�' ��Ebդ �B�\�G�!����m�mh_�E����ݗ�����xy��Ӯ�%	�Q�'H �m����g7?�tA��,x�}�K��@ �������i���fAD@""�ܠy�<l]�ׯ;�d/���T�R�hYb�Ԫ"RE!^(H^ɢZ@��'�P		��1�e� �T�"��QU)���\�%1#ɡ�C	fD@\6�f��m������MEX�yA]��ߧ[Io��@��2��-k����7�$���/�P�=i�2VR�i�5�����m�X��������>�mv �7�v���/�<n:�5M_iZ��N�"�_���ܜ�����д��5�gڱ,TIA�
�>���Ӑ��iY�]/�j,��%m���D��,
�y��/z��1g��FkJ�����ک;
c8��,F(
c�fX� bA�2�P��5�eU�ј�i�� PdƤ �y�!�|���r�ާu6Y�*�U�>� �("<�+��k���nYsߓ�O��{X�߀0CP�P� x�g<���e���F֛� |�ɾ��%M�e	x���0��
��Q%&d�q�Eʥ��nsu��^r��g�*M&5l}j
Sۀ���X2���(��r�\,�A�&�_}=�%6�AJ3Y�D� (}�k�
�('0��r� ���$2���	0fa�	��pP�c_���>E&�h��+[�j��$�p�!RV��i�d|n;��zy�KZL�s�5_ '"^P�$���Y���MI)&`S�픀�?���jy��e�~N37������U�����3�󨥚�j����](���O�#:�xbͪF�R5��G��[kw��]��Ł-p�g�ќ���7��K�!:�R�y�ލ���}�*�#���x��&!�
IM!_��J��;OG�+�q�zG{�)M�=�M���6�>��ޝ
�1o�`.Ɲ�|e�2_��O1���.�Xi�v���cF���7�a@p����5~�ڑ-x�}��r�@ E�|E�S�
�"_�Q5����S���h88����JJ�i�C�뺂�F\W
�x�B�AO���RL��������λ�܁石����dV�$0�����% �[kQ�4-�4#+�d�����Ћ=
�j��L3a�g��\�i�N�q��
�v��
�N]�Q���Isg?��H%�x���;N�0E���ݫ �O�A!jX�x<N,%��qVO(�=��{{c&b�1{I.=z�\ �Wd�E�;6޻ M@Nd�f���%��z�SJ����O����*�9ePst%I5]��1x��6�^v��x�N<#�g�Lx����uް��T�!��S �x 0\t+��?&�n3��p�Eܶ��v5�����4�s�����e�k���g��x����
M(I�4�5���1���1YETcD�������8I��[Ӡ(B$'�J	�e����%J�H��uVg�d\B�ՐC�Uc���-k�g^7�R��Y��}�L�����h�!J"xCVEױ�E��1x�{�o,�dm����gZ�끍��k{8��_\ Z���s���v���w�'�O�Sw�ؾb�����)�y��������G�f�\x
��Y���Ƅ9��	�y�
�h���Dt�	袞6#�HLN�0&kaÒ,Y�5�&�I��=���eA4����N��F�
{��y�Y�dE�v�κ�e���l�����ֽ9K���dl-����[Eɋ�d����Q���V]�6J�9�%.��cޭ��/߫:���
�ô
_х
�d19���Ur�	Y=i�e�U��xh@;��e�X�W_BP��uӷ��r��}"�_�6��>Z���>S�ǲ�gm��0�V����m��P��'Fޙx���Q� D�9�,���㷗 �(Ii������̛7��h�~r.�L�fc���#E�ѱ�f�	M֮�/10��	'ψ���������[�ϲ����\�5��=J|�eY�������Vo�xgi"�>�P���w��Bձ��~�EF��x���K� F�9�`��\^�1Ʊ� ��$�UJ�o���������L�2��A�b��R(Й0)��N|b�2dq4y�!�bJŃu�.Ae����ָ�D��{��Y,,��k����@�ۨ��_-����v�ʲ6�5�<�%Gmu���P���	G�x���A�  ＂h`l71�x�l�H�����^g2�W���8f��l�@�z$O��HV}x��uv�P4��$fty"��a��'4 i8�⽿�U?J�v�fQ_X��^�$�z�u�=g.�����mp�G���c�A�һ��P�����WFt�x���A�  �;�����&��~b��b�R[����9L�DtNŁ�!a
e� ��@рC'0
x��&K�i`�����%���5�%��K��诶�G]d��bH_X��Q�d�{��v{�\�sn�U��Г�D�@�t����Z�����E�x���9n1 {�BH@Q7��|���D��Zn��l����<T-��QK-1����[˾A(E=p3w:t�S��+JGl��S	�buQ�׎�G�s��C��zL!�R��$a�J�|h�S�Ez�����c���������x��B�9�e�~�4�w�׋u)�x���
�0 �}N�(��$�mA��d��6�6�����[��2˜uH:B?Z�>Y���c