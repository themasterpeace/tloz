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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M94.12 315.1c0 25.9-21.16 47.06-47.06 47.06S0 341 0 315.1c0-25.9 21.16-47.06 47.06-47.06h47.06v47.06zm23.72 0c0-25.9 21.16-47.06 47.06-47.06s47.06 21.16 47.06 47.06v117.84c0 25.9-21.16 47.06-47.06 47.06s-47.06-21.16-47.06-47.06V315.1zm47.06-188.98c-25.9 0-47.06-21.16-47.06-47.06S139 32 164.9 32s47.06 21.16 47.06 47.06v47.06H164.9zm0 23.72c25.9 0 47.06 21.16 47.06 47.06s-21.16 47.06-47.06 47.06H47.06C21.16 243.96 0 222.8 0 196.9s21.16-47.06 47.06-47.06H164.9zm188.98 47.06c0-25.9 21.16-47.06 47.06-47.06 25.9 0 47.06 21.16 47.06 47.06s-21.16 47.06-47.06 47.06h-47.06V196.9zm-23.72 0c0 25.9-21.16 47.06-47.06 47.06-25.9 0-47.06-21.16-47.06-47.06V79.06c0-25.9 21.16-47.06 47.06-47.06 25.9 0 47.06 21.16 47.06 47.06V196.9zM283.1 385.88c25.9 0 47.06 21.16 47.06 47.06 0 25.9-21.16 47.06-47.06 47.06-25.9 0-47.06-21.16-47.06-47.06v-47.06h47.06zm0-23.72c-25.9 0-47.06-21.16-47.06-47.06 0-25.9 21.16-47.06 47.06-47.06h117.84c25.9 0 47.06 21.16 47.06 47.06 0 25.9-21.16 47.06-47.06 47.06H283.1z"/></svg>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   PACK     *–xœŒÛÃ  ÿ™‚ZÙ`^RUuN©$)!û73ô>Oº]DG*¾ä&@‰b´“³ÕV‡1IH¡ŸÕÎ]Ö¡'Ï!¦$‰Œ”ŠŒ`BkbEqì¬1Î+>Ç¼u=fi|é»pıhr|Ïeˆ	îõn¼|îekO(Dğú@]¶-ãêş>¨u»P?­Dàxœ;nÃ0D{‚«Dü,¹ÚÀ0r‚K.%–¥PT“ÓGF"mÚ™yoZQ6 áè¬€M–N.¡-‘Q[‹¢MN™º-Vy4Eà²ø@X €$S²)HÆÓ I™ß}NÏş\³9c”4z4Tì0€sèØvñhÓZU›d‰{“ºIL¢®‹ìŸÇÜN…—8ß_ÓºÜ”	 hµ¼zÑAëîL—¹Ü¿İ‡ÔQ×øH“ºü8.j-jjmÛßú~œÛtğïÿôí¾~ußhy˜xœ¹nÄ E{¾‚>²Åò ¢É¤ÍO°<ÆH;ó÷q¦HúTW:º[oˆTc˜¼UR€i
ZˆŠq)´ö,NÌ+E6×°v*;“”Æ•tŒ1IÎ!f;•ğ–¸£Ïk£}ÆâömC^
î_Gî(ŒºŞ‹ËËÖòF¹0‚1®èÀ4cä¤%÷3÷ï²äŠõW>Öáıy	ãp{¼ÒÏ|ÃÊ½X.­`_şàõØ±íc=ıÛòï¹Ï‡.‘o=_´–xœŒ[Â EÿYĞÃc 1Æ­u°5ÒVJ÷/kğë$'çŞŞD´¡g‚’-Åb9CBÉaFÇÁJôX|òjç&k×£1™\É¾#,â0A¤8ñ0Î›AIñÙç­é>Kå£KÛ…'Ñ·*Ç÷\º ùÇ«òò¹N[½kœ#“‘¾@ PÃÖ¥İß*Ëúfõ`äF!2xœ}’Ko›@…÷üŠ‘ºD	¯¤¤
cÀ8àì¸cü &ö¯¯Û´‹JUïæJçÜïnÎé D±™‹”ÛT§”çZF(Y®é†ª.„ªë6ğT©N¨:$ôsbn
!04K€¦š¥7Å0ñm›”ü¹ÏUëalñ4OÏ9¦ÄÌ2C‡ôöÀÎUlÓÊ¥´ïŠSƒºÊ´í ©!Í =XÄ2,]Óå¿§¾…¦½¯NÔÇËıv×=¿ÏNåw„-Ã Ø¦ÄFwª¥ªÒM-wİDŞ®ó{~cOÿÅ¶õ¶İmÑİÏa®DhæÍĞ2ğ"'Y-Ü_º„$4´,cÃF3góÉnäQ´`!)öF|Ö›`pœìêOp˜¿’õ,ëı#ş_ÛñUBŸü°¼ì„û>1øÚÍ­×`xw2„ı¼Ù}O>ñlõbBÊ­wX„~u6WŒĞ=™nõ:ïé<A~K}8šÉL|—*+¸€®u÷éÔS}­/Öÿ¢¬Şm.Ú¨aW–´TBû¶ë'¢ßn™*¦:ÉçhFšõ!ãòT\Sã¹n{åºêeî´=úú|Í¬:²$4z§ ÏöÇØ\°¶Ÿ3—²ieÂùŒåÓbÇ“’\ÁzÛ%<‘oåÅŞÈ7²ã†I'›@äåÕ¡Š¼šÅtHJ^È²ÚÑU¶n§[yF,'¾¯y¹¯T[ëxx”Ğ#>3_úÊÌÆÿNLzf¨îGÔÀGm‡¾a$šS‰¦»
*&ÊWÛ$)‹ã0p »¢ú˜™xœ¥ÌM
Â0@á}N‘(ùm¦ "‚Qè&éŒÒTÛôşö®|‹×"	ÚŒ±G“DN£±Î‘²ÌÊÚ"’\¨6Éu£gÖ„DÎtLÆH¸‹óz¯‡ pkïy‘Ï\©^©ê OHëwË®-—2_^ærLót–ºs.hğAÉƒê”»N¹5úc!Ò0<î7ñSH‘xœ9nÃ0D{‚ÀıSaI›Kp[LJ¡¨Â·éÓó¦7€Ç¨= -²sÚgPR9§é®¢vJm­§ ØjçYŠ);oœ4ÒÄ¤üİd-&i…!+ÉGÊd‰…£Ïkã}F	{GÛø¥`ÿ:–Eöö(ayi-W.1t*­áƒpB°³-K?¹ØÇ:ü@âë.õU¿üåÛ±£íc=gÛó5>–>ñGÉ¾¥øZ<xœ;nÃ0{‚+GükiF.C,—KI€e)ÔªÉé£ H‘6íàÍ<iÌÊ@N®$&G\y[“MXJf§)Z
c»?EyM¬ƒÑÖD¬€0  Zc­“	ÎØñğ»Ïr*õ49<ëè¡1ö¦P5”ØÓá!ÓÚ”L¼à.Ü6FbõºğşqÌÂvoã‚óã…Öå®Lô>¦¨Áª«Zw']f9½ºwn#«ÜğI“ºü4.j­jÙö[ß³LGşÖû¿'½<ÖÏîd·iÃ‘xœKÃ D÷œ‚ØóQE3Û\¢iš)`Æ‹Ü~¬ÌböÙ•Jõª7".µ$\Š~2J(¡­	IéÑ`$£Oîb+4ª£‡  ­K`DCN¦„ÂFôÁÙ ’“0Øû¼4Şg*°uj+¿Ú~öÜiræö(Ÿ#.åÊ¥ÕÚz+”æƒ°B°£-¹ÜÇö½'(áuæ÷\©~Q•_şómß¨mc=fëó5>rŸ÷ğV²_ÃÁ[±‘xœÌÛÂ0@ÑÿN‘@vN,!Ä*y¸%¡¦û“ø½Ò¹£‹(ã%`p©`æ²z.„À–U{GI@<#d–OìòŠÁ0¯ÉpÌÅf“SÖ…˜"’Éš’^â9{W-CúGbukr|Ï:d¾[‹õuÍ{»+$k	­ÓN]€ –Y[ÓıÇ§/uÛ—šjCƒ“xœ‹QÂ ÿ9Ğ,–’ãU°Õ&Ò*¥÷—38ó7Éô&¢²‘¢c°wALöÅbq3Gq9ÍJ4êƒ&[×²€õQ|J0 œ‚ĞP¦2*d…³¿ö¦+.í#È¢oUï¹v±Á?ëûš÷z×†cšÙÎúBL¤F­kß»ÚP qnêÆÉE,˜xœËKÂ  Ğ=§àš†_bŒW>S›H[)ÜßÁíKŞèµÊÄ69JF²},&9tFƒñÑz@fÇ I‰ƒzİ†ÔLÌ¥0+Œ²A(!€KL1X›-(¯#@4Ç{ï²Ñ9j?*å*­ß¹ª½}-ÖÏ=ïí)•C´Ñ{ò@\ÚÖq½ÿºØv¹Lê…$ÍMü Å€FI•xœËKÂ  Ğ=§à~Ã”Ä¯2ÀLm"­R¯oÏàö%otf] )OÈ9WôBdªkÅe“Å«7u^‡.‰²§Q„*0Z‘bb-)cÌ‚´ã¹uİhÜßL…õ­ñş9–Áá17Z^×²µ»¶1Hnš’¾˜hŒ:µ-ã|ÿuµ¬sç}[ù«~ääG$‘xœMnÃ „÷œ‚ØÂøñóª(ŠÚm/d[
ØÅx‘Û×jİw7}óiZ$ÀÚŒl(Y•¼S!ú¨ŒQŞÆkÀ¸Á‹-T”&O"ÅH:$;N)h&ğd5ß™"vnJ*z6¯U¶9ìuCH—ŒıëX´3·GË³Ok¾ÊÁ‘eË,;e•g›—vîşmk÷{÷.¾ŞäçRPŞQ'/ùvì¨{_Nl{¾úÇÒæ#ş(Å7ºƒZ¨‘xœAnÃ D÷œ‚ØZEU”ls‰|b¤€]Œ¹}¬dÑ}w£Ñ¼§éˆG"%E #&«m ¼N¨HkI A)ĞnJ`ÙŠjçäâ¸Š2
‘&éAE'Ğ&g0’P÷>/÷™
nÚJˆŸ
m¿{î¤¬9ßæÇ–òÃ%h­A±| ;Ú’ûÁıÛÀ®Ëğ9AqğÏo~Ë•ê…ª´üô—ÏûFmë1[Ïñû¼û·’½ Ò»Z±xœËQÂ  ĞNÁ4…•‰1^¥ƒV—È¦ŒİßÁß—¼ÑEl„$>Tg`G¬uÖ©8¾0NZ¡ùp—uØR€QçI%(Í’©*S©ËB9bJ†ñÚºm¼éá"öÖdÿËÃãÙxy_ËÖîÖ"úìÀœÚ–q¾ÿºY7»‹ùŞšCŠ‘xœËQÂ  ĞNÁ4í Àc¼J¡e.§ŒİßÁß—¼ÑU-)ƒv¡F ™B ,1« &¬”b.Ï`>Üõ=lAsFÌ…r
P+:§PE¼Bâ0Õ™¨ác<·nïCûG¹¨½5İ¿Ç:tŠôX¯¯kÙÚİbğŞOD@öÀœÚÖq¾ÿºÉ›èÂæ D*˜xœÌÁÃ @Ñ;S°@+©ªºŠ&A*IKÈşÍ½~éıÑEtNç”Ø[_eÊ¢#àP8P„b¬úp—mèìf!r }˜m±Ä–$Æç	"JVñ9Ö½ë±JãcHÿ'Ñ&Ç÷¬C&r¯¥q}ßÓŞ<¢¥'£oÆ£®Úê¸ÜßU·¥Ë±«ÔÒF‰—xœÌÁÃ @Ñ;S°@+ˆÄRUu¦A
MJÈşÍ½~éıÑE´!ŠS0ÁÊÉBâè%	gSÁ"³ÄÔÎ]>C#ù`-aÎŠK6xr.åÈì€löQĞ(>Ç²u=i|é»pıhr|Ï:d
îõn\×{ÚÚS[¬¾oŒºj«ãr”£®›ú G’xœËnƒ0E÷ş
ï²ü6DQµÛö#ÆfH`ˆ1‹ôëë*ª¢n»›{®&'DÚ[¦MPô-8+;Î¤n&ƒ÷ÖYmë-Ù aÌ…—¨:Ğ²h‘9¥¬†À¤ÓAHÕ‚rZ9üåƒĞ’yœq¸”\ï47½Aª+«ğ¥	y\Í#.°gL‚GzYp¿SFaõmX`šk¿.WÊRÒvÊZ1Ã)×eÊ%÷oùÄ4 u	¢ééé8Ñ5Ğ1çm?7Í0åñp?ñæoI“çõ‹÷µz~}ågú1EŒo¹¥—×|;vL{¶Íú%½’o‡âÍ‘xœKÃ D÷œ‚Ø2ŸÆfEÑd›K İÄH{0^äö±’Eö³+•ê=U«D|2 ¬kUˆ6‚óäÑ "‚·•wZhÅVW©4î	•E ĞÜHqŠÊ£À #`Ğ$¥D«s{›—ÊÛLÙmêJ.?eÚşöÔHp¹g—}Xò™£µÍ4)ŞfØÑæÔîßv]ºÏ	ÂÎ?ø-*¿TÄÈOß|Ù7ª[_Ùúxö÷Ôæİ¿•ìë”[Ü—xœËQ
Â0 Ğÿ"PÚ&iˆø³_EÄdM¦ëtÖûëü}ğÚbØySñ%°P§(š}Š³·À8øB"bî)‹=¦Ø)3±d‹ª›ZâÈZÈbŒÚapòi·y*ïfËÓ¤l«½_Ÿ©YÌ¼¿V™îë2×„D„‰0¬|òŞı´Ní÷şëîp„s§KıÙ}À]E‘xœAnÃ D÷œ‚ØÃ\EQÔl{	0ã)`ãEn«]tßİhôæiZ¸Ú%Gró¨„'i•³Q:8V#HÙæ+JãN`6‚´‘4L6:Š.`tQ›€—–1´e­¼-È~o¨ü~ÉØ¿Ô0Xº=²OÏ~Zó•K£õ0’5’wÂÁÎ6§vîşm`÷µû=Ø…×ÿJåEZ~ùË·cGİûrbÛóÕ?R[ğ£doBZxœŒK
Â0 ÷9E. ä×|@DÁ.
®ZWî^’[0¶¦éıíÜÌb`¦Dšœõ>İ'paCu6DÉƒZIŞ8F(ø©”Eé²REãYH€I;)v8Ã¹‰2aàluœ­#fX+–! =e\¿ÛTQ˜æòÊ0½aÎgÊµRÂI¥=0ÍÙmêŞı} CÛw×{÷l{zk‡ù+H?xœ1NÄ0EûœÂİV±ÇvâB\€CŒí™M¤Í&8“†Ó„(hi¿Ş{_³q>@"pB®28©VŸjÄb”ìÁFÀb»?Ô Ä8æ(t:–¸øÈƒ$(~,‚`ˆ™¼üò˜$¦°Ú‚H<†Œ”Ø"£¯!‰T´¨£C§µx¡]¹mL…ÍËÂûÇ1+»!¼İšïÏe]^Ş»ñLæ	"@w®Ë¬§÷ïB÷ÎíÆ&7z”É\~³Š™T·ıÚ÷·Y§#ëıß“^ïëg÷ºid‘xœKÃ D÷œ‚Ø¢qcpEQ²KğiÇH;/rû ™Åì³+Õç©j!âr@r˜ĞÎ(8£T@%=PZZ0œF3°ÍÊ•{¯µÑ’™4­f ĞÆ³3R˜˜=ê²^Jv¯T6²ø9Ñş:b%©Õõ‘l|ö~M#¢4fšïÄ(knŠµí¾&°ûÚı Ğ¹÷‰ÿÄLùF4?ÿëë±SÙûÜjÛóİ?b]÷‹dZ–xœËKÂ Ğ9«` |cœtªFİÀåñÔ&bkK÷¯kpz’Óffi:²Ä÷”H…Â!³"%6¾tˆ9@‰	3¿›4HQdË”ïH`¯c§Ur¥@Áy!°¶ç8ËŠ¥ñ<1ˆå®òòY‡Æ&¸Ã£bxmi¬{©½µ&„µÜ(¯”øiÚïı×ÅítéÏ—şÚoâ¨^FÀ’xœËAÂ @Ñ=§à:	ÂÂq¼Jš­#V)½¿=ƒÛÿçnæC ¤k‰,¤EP¨K	Dó”Ì—Ü‡»½‡!â¬Q¡0V#SJ©Ö¹(ÓäxµûÆÛ°ş1ó—fÛw_†J·{ãåu–µ]=æC¢€äOÜQÛ2÷w£óÌÏÕı ïõEV‘xœMnÃ „÷œ‚Øzü>¨¢(j¶½†ç)`ãEn«]tßİh4ß§éˆ•Ğ%G¨"Î­‹ &ŸT2dÑ‚Gmm¡Qíœ¼7(äœÀ» ´èU’Ò«4‰ gJ
”,}Yï•°wj…HüRhÿ>r'‰æö(!?Ç¸–+Vk	Æ{É° ìlKî'÷o»¯Ãï	JÃôúà_¹Rı¤*_şòíØ©íc=gÛó5>r_éGÉŞ‡Y®‘xœAÃ E÷œ‚$ŠÁ1aTUÕtÛKâ4H…dYôöEí¢ûñêËïÉ%3KVóì,@ZÖX;±hÔàµ±³fJ‰ÍeNE¢R½¨ïUÖÖ`Èw•†N“'À‘*4	w”eÍ²,İ^8oì<ËSäıï…•é/÷èÂ£õk<K D°H¨eSe¨ÛJåşm×µù<ÁS3>ä-$N¿œÀÈÓ7_óŞ¦z¶=í=”åßJñ]§Xı‘xœ;nÃ0D{‚À?Waq›KPË¥EÀ¤Š*|{I‘>İ`0ïaz#â(&AZhEà!Î	$Cs
VYÑ"ÛB£Úy™ÀZR£t~Ò ¬Á)E¨
a “fáèËÚx_¨„½SÛ( ñK¡ıûÈ”··G	ù9âZ®\:c$8¯<„‚mÉıäşm`÷uø=Aq˜_ü+WªŸT¥ç—¿|;vjûXÏÙö|Ü—cşQ²7oO[A‘xœ;nÃ0D{‚°Ëh†a$m.±$—“R(ªğí#$EútƒÁ¼‡éYà0x–)aÒE£Ğ':&´Ú¼ˆ×.*Œµ4E" •z‚h´±³‡¤gr)	:ú²6Ù.´wnS`y-¼¹³röş(”ŸcXËMâd*À‹•L âlKî'÷oƒøX‡ßÿz“Ÿ¹r}çŠN^ÿòıØ¹íc=gÛó5>r_ÿ£ß8ÔZæ•xœÌÛÂ0@ÑÿL‘@që8±„«äáÒJ„@êîOgà÷Jçê±˜Ã"Á/è™y&‰™cIˆ•8¢€7±ù¤!oµ‰É…X¦ŠÄ”%‡
yš0ÌÀµ€,¡štèÚ‡ÕUZÚUÆGR{k²Me
şñli{]Kow„è˜Ñ£½8rÎœµmzº¿F{íæ‚+DËxœ1nÄ E{Ÿ‚n«¬¢U.C0Ø–Ök›œ>¢iÓ~ı÷ş—Æ¬( èÂ…çkô¦ø)ûŠ­©:ÆÚmÔø)
Šõ¦®mÊÑ8&„€®jí«qÆ‘CDøí{k4–Á•4ƒFÉc‚!@a"bN2­MÉÄíÂmcÊ¬^Ş?YØz÷6.4?^òºÜ•ÁóvŒ`Q]O¥îÎt™åäşmèŞ¹¬R£gÔåÇqQkU“È¶ßú~œe:Ò7Şÿéå±~v_gh8‘xœ=Ã „{NÁlaşYEQ´is‰<ÇH{1.rûXI‘~»Ñhæ›i•ˆë­™PJE&š8tHX¡õ >¨ ,*†­X©4>£`rÀ)š€d ĞAÄ8jg$¥£†áŞæ¥ò6SÆ­Q]	ñS¦íoO$˜Ë=czôaÉg>X­…sj°¼;Æ;ÜœÚÑû7]—îs‚bçŸ?ü–
•_*ğÓW_öêÖ—#¶>ı=µy÷o${KZİxœÌÛÂ0@ÑÿN‘@®ëæ!!Ä*®ã@iKšîOfà÷Jç¶ªj(^BŸÀ#Î,4Yö!ÆàdˆAGv®º6É³ô„ì(ÆØZ\`
j£Z7ğÙ^[5…¦uW5·¢Ç÷ÌMÑÍgáü¹ÊVîf´Dà'ôÎ\À½–Üºûw_«ŠämÕÃ|òú>†VïHÑxœËAÂ Ğ=§àš¡ÀPc¼Ê m"¶Rz{·/y£zò5Ñl²‹¾¸P…‘
 29ÕÄ®Úâ­Ú¤ã3tål¬8É&z–O)9‘-…) (9ÆkíºÉ>Ğ7H†¾5ìßc˜‚<›,ïk^Û]væ‰)ê1‘:µ-ã|ÿuU7y®ê‡XD°•xœÎ[
Ã „á÷¬Â´x9ñ¥t+G3¶BLRcö_×Ğ·á‡¦7@hb²Ys çMœc•d=ëœ‰
ÒgOˆZO7l]2$ÉK€‡2n	2!*Ğâ¢562(#N|õÏŞDå³£àñ¨8¿WéĞn~½+—õöúÊIGä¸I+å4j-}¸ÿøğ)•}hmìS¤µŒ÷8§Û"LlšxœKNÄ0D÷9…w³‚øßíB\€C´íîI¤É$8Î†Ó„X³¬R½W½1+’01Z´‡È!i‚(ÕDğÕe’àpØ¨ñ£«¬]–hZÄjáL„Qbq©gN{-ÖËïCp ‰$ÇlË	Q‚J}ŠÉ²óÕ–0ĞÑ§µ©…öÎmc*¬^Ş?¹³…ğv[h¾?—uyU&z¯Áb@õ¤£ÖÃÙ.s?¹ÿáÃ;·«ÜèQ&uùq\Ô*jê}Û¯ãx›ûtäo|ìÿ9û}ı¾ u·f‘xœËÁÂ0@Ñ{¦È 'ubWBˆUìÔ…"¥M÷'3p}_¿mf>4 ³ÙÑÈ©ä“‚(JŠ1ô Än•ÍŞÍÀlLJ2qÀPLXò¨…Ép²:Ï%ª“£=>›¯²7ÛV“bşRmÿK³Hév¯²¼ÎåS¯>dD ØÕŸ ¸®uiıûow*O™Äı º‘CŞ‘xœÁnÃ Dï|?`k!˜*Š¢æÚŸØÀ#ìb|ÈßÇj½÷6Í¼™Ş˜¥Q~2*èd&Œ´3l­Öp²½LZib¥ÆµK‡˜í•÷'²1ùHdBÂQy“ÔD4)A{Ÿ—&ûÌ…¶Îme
,Ï…·ï=w>†®Bù9†¥\¤²ˆ€ÚÊ,€8Ü’ûÑû7AÜ–á÷Çáşú_¹rıäªœ<ÿéë¾qÛÆzÄÖçk|ä>ï÷¤xSYî•xœQƒ ÿ9h³‚
&MÓ«¬ğ¶’HµºŞ¿œ¡¿ó2/£`eò$ÑIÎ2…”‘dzÇ„¦ì‡NFvpfçµñÜ¦†0;î¼øyŒ>"Cf¤(r˜_ºl‡Õ•OÅ±ƒì£âü^EáÂğzW.ë=mõi»±ïÉG"oo4™FkÑæıı`u_YaÓZZ:Örªù\»N'˜xœ]ƒ ß9h³ü¸@Ò4½
¬ŸÕDªE¼=C_'™Éôh±SÂÈN,›Á%¢$”§d!`‰†’sÕ>]yF%ä1o9–BœŠÄ ?‚©L“Ø¢òÙç­é>£æ££íÈı¨8¾çÒaÃğz×¼¬wÙêSöÜ|Ò7b"uÑºôËû» d]®c¨UG“xœ[Â ÿYĞ\(ÏÄ·rS%)V)İ¿¬ÁßIf2£Ò–U§¸¨µ¢@Á“…[c) €EyNI|¸ã=äâ‹ŠÊXÇL%cÁI;"æÌ&X_<\†3‚ÏñÚ»l|ô8CŞïY´·gãº]óŞîR9cˆ´×A^h¶Ä¤­éı§‹¼ÕùŠCü &"Dy˜xœËÃ ïTA‰–ßR¥•/1’‰Œû5äú43z£3K ¥Œ…à4€ÉˆqI’¬O¶ (r./êü“–À¶à)Œ±°+ˆ.à’"*A×X÷.ÇÊÎÁı`Ê,ÏïUkï^ïFu»ç½=¥Bk¢ƒ AŞ Ä\[Óû» òVçc?Y3Eı™xœÌ9Â0@ÑŞ§ğ@Ş	!Š¤‰‚~ìC$L‚ãÜŸœöKï÷FÄepÅX¢”,fá“ÕÁIJ	Z{Ê>±}:wE#FY¢®x4%*YU².@ñ‘lı57Ş_TaíÔ‚LüTiınS'åíåYazó\Ï\:££	V*~N¶×:õİı}`ñ:ŒÃíÎ~ç¿Ge™xœËÍ!@á;UĞ€fø‡Ä[†Y%weYm_jğğ._òFg–&hÂ‹Î&*•K‹ñY£gN:’!rXlØù5d™b )aT…rPÅ“·%¹Ö»¬!YËbã±vÙpÜ7Fbyi¼¿:Xw»7¬Ï3­í*•·&êä	<€˜Úê˜ß»Øë2[å§òWü (ÍG*˜xœËËÂ0 Ğ{¦È çã8„XÅMlˆDhIÓıé\Ÿôæ±Ê ‰ŠTX(1p ¥° Bf(œÅ»È5çÅl<ä3-cEV¯5×Å•
¨R]Ğ ‚¢’s%b”`ø˜¯uØÎû”±	±·.û÷hS<áãÙ¹½¯eíwëRÙg$o/ Ì©½Íóı×ÍäÑt´ÕJmÓü îH#”xœ‹m
Â0Dÿç¹€²ùÚlAÄ«lÒŒ­izsf¼ÑE´ J!O9ñS&D0ûd]2ÖÆ¸.jç.Ÿ¡ÊËjóBaõMq>ñ’ã(<“ˆ‹âs¼¶®Cú.œEßšß³±1<ëûš·v×½#H_ Ô|[ÓûOWƒ{-³›úS[FC”xœËMÂ @á=§à`†¿Ä¯Â0S%[)½¿=ƒ‹·yÉ7‡ˆ&bï‘ìl6(˜Ø¦Fã}e¢L5ImeÈgj°LQ<D.‚€ø%sJ–œAÎPˆkJE•c¾Ö¡{Ù§ŒMJ}ë²6ÅEÿxöÒŞ×ºö»¶!Y‡˜õÅcÔy{›§û«YF[ÎVõ’DE–xœËK
Â0 Ğ}N‘(3ù± kÁÏ¦ÉDÆÖ4½¿=ƒÛ¯UfidvC¶€É>CÑc
Rv˜ÅD•?MºQÛcT:+ÒŒA¹Ş‘WØ§dÁFAK{Uš×‰)²Ü¿ËĞXy{|ŞÛ8–ƒDg´w`4Ê8 ±jÚúşëâú¸wò|»w§‹øúD?”xœËAÂ @Ñ=§àš)0@c¼Ê””Dl¥ÓûÛ3¸ù‹Ÿ<"–ø\#f©¡
±À™I9°ÌÓ!°ÙhÈGíâØÕ˜cÆ]ˆX=UJP}-’¸P)Ï ¡C_ë°v•±	±·.û÷h*.áãÙ©½¯eíw;Åàâœ½½@0çíMO÷7ãP²ÂMÍÛüFË”xœŒÛ	1 ÿSEPryDle³»Ñ€ñ4·×¿g~ÌÈdÖ’ÍÎ-	É/Õ¸œ¶â5ö&CÎ³zÃä—è‚-b©ä}	Õ§Ğ˜b²L€\­c@€„QÁ.uê›ğ|šõeğöÙ»°MávĞŸg\ÇU/Ñ»ßÄ}2ÑuØÑåèşËÕÜ4Sõ}ÙF@”xœËKÂ  Ğ=§àšá7ĞÄ¯2À $b+ŞßÁíKLfÉ-X¬16.ÙøZaŒ.VŒ¶%&4ˆ¥UµÑäèÆ2»XÈ•ä¹º²„”³Ë Æ¢'n©‘UtÈkzĞ.<7¦Âú6xÿ]ØÆğxêïkYÇ]ô1¥ô@:ºœï¿®æ!¤¹vQ?àxEo’xœ‹[
Â0 ÿsŠ\@Ùl"^%Ùn´`Úš¦x}{æg`FÑµXô(LLd(‘-¥˜Âsl$‘8µå.ËĞ‚$¹œøR„ìOq‡ìä1Q$®¤ò1^k×-ïCú&™EßšìŸc‚Ñ?-Ïï+¯í®Mp6„èSÒ ê¬mç÷ß®ú1ò"_õĞEÌ’xœËÑÂ  Ğ¦`ôààc\å€C›H[)ëÛü}É]DWÀH®&I)•	uÁyB¡rœÄ ØLä@mÜeš-çR=Y“ƒ¢#q6ÄÉC1¦	8+>Ækíºñ>¤oÂYô­Éş9æ!Sğgãù}Ík»k‹=è‹AcÔ©mçû¯«~^ä«~9DŸxœËQÂ  ĞNÁ4…B‰1^¥…N—ˆ›ŒİßÁß—¼ÑU-	Rœ=¤(ŞeÄ”2dÁR'_¦«Ù¸ëgØ¹’`#ù\ ‰KÁƒ’gÀ¨‰erÁğ1^k·÷¡}S.joM÷ï±õ)>—÷µ¬ín$Šƒ½ ˜SÛ2Î÷_7ıl~ÖÑBdŸxœËQÂ  ĞNÁ4Öc¼JaE—ˆ›ŒİßÁß—¼ÑU­`9„,1FA7sRš2åêXAvŞlÒõ3l¨Šgˆ#«zQÏ—øR¡¦99Ækí¶É>´o*Eí­éş=–¡ññl²¼¯emwëh
„œ"Ú€9µ-ã|ÿuÓ!æ=ÏC šxœËÑÂ  Ğ¦`¸rWHŒq	¸+Wm"Š-Õ¸½Áß—¼¶¨ZFÉ‰<:á1FdFŸ‡¤„dòƒäÄƒ©¼è£Ù !±Ä˜Õ©÷YRô<M$I dè	ÁğÖnÏÅ^›.UyT{,º¾¶¹)x¾ïİø,'ë)ô„„èìÁ‘sf×2·ıı×Í¥fnjß³~Ö®~ÍGõG“xœËAÂ @Ñ=§à:Ã41ÆgpMaF›ˆ­”ŞßÁíÏ½‰XI¢'T/9¤@BtÄ¨È…Ø¹2˜55ùt«S5†‚28EŸÃ¨BDW¦ÀÊ\„¢I{-ÍÖ´ui«¤,öReûîs—ã½=kšßç¼Ô«õ4B‚‘íÉ‘sæ¨uî‡û ü »ù“C˜xœËQÂ €áwNÁ4
…Ä¯Ò•NgD'c÷wgğñÿ“otU©pÖ4W*%hÎŞMG@ÄR]Í$X‘ÌÊ]ßÃæXr' ˆEbÕ¤ B\ªGÂ!ŞÇãÓmãmh_•Eí¥éöİ—¡âíŞxyåÓ®Ö%	ÑQ°'H æ¸m‡û›g7?‘tAı’,xœ}‘K¢@ „ïüŠ¾›»iÉÌfAD@""ËÜ yª<l]æ×¯;Ùd/›­ã—T¥RÅhYb‚Ôª"RE!^(H^É¢Z@‘'ÍP		–¸1£eÏ ÁT„"¥ÈQU)¼ˆ•\%1#É¡šC	fD@\6±f Àmû²×ËÉàMEXåyA]ü…ß§[Io¯ı@Ëñ2¿Ö-k¦ü•İ7€$‹ª‚/ÏPÈ=i×2VR°i™5åàííûmõXßÚ¼ü–¾ŞØ>Ømv ²7¾vˆ÷ë/Î<n:Ñ5M_iZ¨‡N£"«_íõ­Üœ„à©ıĞ´Ë±5«gÚ±,TIAÎÃD­¯±$HÖ‚–ÔAƒûÄéW®rx˜[ó<š²ïú¢-üÍœR´õ±½Í¦’ÕóëÂ‘†@9 ñ"˜/UÖšÅÅË"bTNº/µÚI£³"º³YÈ#ªv2Ê¢ ô>]Í|Ÿ_½Õr™1'ò8°¦üJónâŞ-è™8Y¶ƒt½…0CËÍ‡açÙ˜˜>¦íbB‰’¶ÇVˆmñ ÆÇ³ƒXÛ8PÎÓÜ‰ºq¸Î$–w\W_á»Šš°>•wı´Çñsë–¡a7¦}ì©PÇš’M&Fİj¹›°zbéîË¡ë{“­~G°½)ÍÃ¨ûÜÅ ëoŸ‰U{ïx·‚î9è×7kßø÷cœöÎÕ––,xœ}‘Én£@ ï|Eß£dhš¦i)…Í`Ş‚Y|c5`›¥Øæë'³HsÍ;–TÒ“jdyòJ$N¥,+R’KIR(G(F™Xd‚$È2"TÂ"×Å,oF€y±P!	Ï!Ma‚±Lx(e8–	Ä)‘3sñ4–-NÕäš7€W
‘>ı…ïÓ³á¥iYŞ]/§j,§ä%m¯ß”D„©,
y‰ç¹/z­Æ1gÀ¬FkJÀëíı¿Ú©;Õ	<ÿœj˜Ë5Øš[ğ±4×ŠwØ¿88pÔTUUS”º[•Z–¶WmRÖâæ±åMQ>(¿T´•:ù¨¦—ˆ÷P¨1!·9 ­˜vı¸ê¤GKÉõ3Zúf'Ã…[,‡>Äp_kŠ'éL×E§(5»Š«§ó99ê„r vP£}¢+½3gaÁû¥t½l;Q—=t™vÜDO©ËÛÓ"4cÇÆs:jÒ~°ş²şúœ›Ñ·§ÆïEÙGd¿ylæ;®weÊ‰kb{š‡ôœì~82«­âÅwË	ë©à€ïÆb6ñ7Dçr—Ğq‹t³qjCÙYó¢½ç¹¯»éu¤škKÃÍ…¸"’\"Š'™„-?éïu<éA:-ùô´Eo«‘}µ‹»€æá"zö{(¢Ãr5Š}İ.yf>dox‘¶ã~73Öú¿‹qUÓMãœ%×ö˜xœ¥ÌË! Ğ;UĞ€føÌ ‰1Æ³M0(É~t—í_{ğúol"Úy©¹å†9ÄD–‚$´ŒE$Fª¦1F@N^½y“eh°>Ûs)®Q0˜]ö%Ôˆ”ˆ8‡ŠñZ7ıè‹,wYLĞ–ısô!…÷Ñ§i½=gîÓ¹¬óUòS„èõ	@ıtîcÈ…ÚYZU_C>G—,xœ}‘É¢@ @ï|EİM·@B%İ“.PÀW¸P¬²(â×ÏšÌe2ïø’wz}Ë H†
c8¢‘,F(
cŒfX– bA¦2”P†Ï5´eU‘Ñ˜—iÀ„ PdÆ¤ äyŠ!Ã|ˆ”€rôŞ§u6YÅ*•U‚>° ±("<ù+¿îk»÷ªnYsß“¬OïÁ{X—ß€0CPÂP” xãg<Ïı°eÖ÷¬FÖ›÷ |üÉ¾ş›%MÒe	xû‰º0–°ì—†EGwñËs€C§†*!ªFˆ£:«¿ĞUsÕµœæh÷€ír ä•K¢åây]\Uc}šŞ¥¬,%{"—#¤ÓÔqí§àÛ­ŞBö‘“%îj	=ŸÎ$s­N;°–î2Û†±áíó•x—âê:ĞÒµ¯×±Êã0+Á=˜y™ÉÊîµ}]çT­û¶½±›Íd¡«í Ö~ÓöàèîsàP7Ûu|y£U½A4Z%±î8&ã\½]ºµCy)iuÉ/	Cee
‹ßQ%&dÓqàEÊ¥ÿçnsu¯Å^ršûg–*M&5l}jiòİÜSNÙfÑs{Òn–á˜8ßÄĞì¹æ™¯›?1Ó¡|ädµÕ„®í~{šÒ»<>WR=3ª¥Óó"ÁÎr4åKÅrà³öûılaÍÿ}Œ³è# íw~%Û¿.xœ}‘I›@ E÷œ¢öV·¡(&©;
SÛ€±İX2”š±(Œñµr„\,AÊ&Ê_}=é­%6‘AJ3YæDáš (}Şkš
‰('0‹¹r– ÓÇ·$2‚©	0faœ	²¤pP†c_¡ä>E&hÑ°+[Üj¸å$ğ¢p¼!RVá×iÄd|n;‚ûzyÎKZLÉsÚ5_ '"^P $ˆà‰Y–ù¤MI)&`SÒí”€—?Ú×ÿjyŸe~N37–¼ÎÖÆUßı“ù‹3€ó¨¥šªjºªµ£](™ÓOš#:ÜxbÍªFÈR5–İGğŞ[kw½è‡]¬®Å-p÷g¾Ñœ¦¸ç7Œ®Kï!:§R—yïŞƒ«»}Í*ô#ÈÎöxÜ&!Ü
IM!_Ş”J›Û;OG·+•qÎzG{ô)MÓ=‰Mìó«Ø6ô>¢“ŞQ!FYBx¹­¢{d@+¹{i²Ïe¶çşÚ“X4Ë4ïcÄã¡«eMsƒj~¥40±¡É2ğëv«D×÷ptˆ³ß¡Pà‡œ.¬Õç5goaîh-®éøvØ¡·Šìº ÅST­Ğôéì³çìæ"…«SgŞQÍ‡OI.Áªb‹ú¶-
½1oş`.Æª|e¤2_ğºõO1ó»™éÿ.ÆXi×vàÄcF¦ñû7a@pÓ×ñ£û5~ãÚ‘-xœ}‘Ër¢@ E÷|EïS‰4]•Lƒ Šh²ƒîFğ
"_çQ5›©¹ËS÷¬h88ÍòÌàJJ¥iCœëº‚ÓF\WÄ †P*Ó†W(yŠVç².#ö8cB¨§ªÓL~hXJ;QÔğËŠW¯d¼Y%Êãşô¾w-oÚ—ªnøùxÙ•¢è²ZŸ~ #U#
Öx†BéAO¥¼“RL»¼şÑŞÿ«íÎ»¶ÜçŸ³œ‰€ÅdVŞ$0ãõÒùÅ% [kQË4-Û4#+šd¸†öÒúĞ‹=
¯jãİL3a‘gº\’i¦N¿qŠ»·Ä‚	„uÈÌ'Ó¡:ÆŒº·¶¹ÛÖy¶1*Ò9Aìijûn‘b±ZíJShïøñT	rG•€«Íg‹Ê©köcèjy/UÍÒü¼¬(Í×…İ)'Æô¥º™»!ßèx–O½şĞì568ªCxLŒyÎ’õñî+ÿBÃn]ı¥“¯…¥ğ·ÉåSŒÚ`TãÍ
±v³ŒÂEZ^ëB)ÅöÁÍIïŒƒ‘[{‡-i­+ö=%—Í¡§ûñW/`9:Öî!8ºyeëâ#v?¿}I€…c;Ñ=şğG¡ìÄ]]Ã”ÆZ‚EdÇ\uñçq±	ëÈºuV[¬^,RçMo‡q»‘~7s‚ñ¿‹IvzÊÊ0<ZWuûÒ=İôšxœ¥ÌMÂ @á=§àšş„ÄãÚKtPZj;ŞßŞÁÍ[|‹'³Ö#×# k.ˆ6‚)÷>1àÅ•I­´ñ"ÚÚ\+C”3“ŸÈ¥)äh"Ê€!W}å=6ıl/^ğ¢¯ÄûçÛ„íÒz÷×L­ŸË˜oƒ³>at^Ÿ  ¨Cç&Â,ÔÚú±«6+Gušxœ¥ÌÉÂ0 À¿«p _ëCBñ¦	k°äØ!ÙôOzà;¡‘[¡–¬©CÊ€>Ar.[§ X0%	Ø7ÄÔP¥pjq*W,%	ÆKëU¬åüªƒ¨Y<è37şjÇ‡tüqÿ0ÇZïóñ^bë×<—;—ÖhÒ«À/Â
ÁN]şQ°µõIsg?¹H%xœ¥;NÅ0Eû¬Âİ« ãOüA!jXÄx<N,%ñÃqVO( =÷{{c&bò1{I.=z™\ œWdóE†;6Ş» M@NdÊf‡¨%ò€ÙzSJù·¯œOàÅÉ*ë9ePst%I5]±1xö¥6ñ^vŞßx—N<#ŸgéLxô²®õuŞ°¬T·!­ÑS ´x 0\t+½ó?&†n3‹Øp§EÜ¶Ëáv5‹¥÷ûñ4séËôñïeìkı¾íœg‘—xœ¥ÌË! Ğ;UĞ€fø.$ÆÏ61ƒ’ìGÙÙşµ¯ïğd0kÂjÍ6"Y,ĞLæˆBb×’)œ7êƒWÑŞ1ÕFP)„'[c1•“E×(‡ê*O¨ğ×6ô£¯¼Şy5“¾ ïŸ£Ü¥Ïóv{.ØçsÙ–«6Ñ»!&¯OğkÕO—.Âj‚êT:Go-xœ}‘Ks¢@…÷üŠŞ[IxvCU2•F	`TĞXìš¦y(4ÊC„_çQ5›©¹ËïÖ9gñuc@WQB %
M(IÄ4Õ5ÙĞˆ1‰©¦1YETcD¸†ñ¨ª³8IãÇ[Ó (B$'J	Óe¢¤±¡%JÂHßåuVgÜd\BàÕC–Ucö¾÷-kÚg^7ìRÏYÑå}üLëê ªhº!J"xCÂƒVE×±ØEçô1xı{ÿo,»dm‘§ŸgZ¶ë½k{8Üï¬_\ Z“š›sŒ·æv™£Ìwæ'ÊOªSwÀØ¾b»›„ó¾)ïy¼ˆ¶ŠÇüøÆG f†\x3°¥£¬Íö8³×=u†6·ªÔO‹1tSR–‡v±Æ´:.„¶çõæı¯ÖY…‹bgJåùœ59rŠ•fÙæj³”ÑA)M=YË™32œn¨÷)7Zc{X|àÓÙõıøè×èa=eèh]”DÕÂË$;×]‡•B¾8ùV¸­øÊÒÃã‹ÉV ÔY”yï1¦ûĞòËÄĞ1¨^‹PÁu¤š39$>M‡é.|ïÏ/¾Ú+ót8àZ{DFÖè¦Ñn(Ûà3rï}eMVÛÚ Õ™e-Å¾Y¦˜±ñr½Ep5—:"iå®~ÀÛşe[
¿YŞâßÆ„9©â¢	­yı†İ‘š-xœ}‘Go£@ …ïó+æn%À”¬BcƒØ7Ê€!4SLÈ¯·H{Yí;~zåğÆRˆD$D"/²¹(Yš$kÌ
ÅhÍó„ãDtç	è¢6#ŒHLNÈ0&kaÃ’,YÓ5·&I„ï=¬ÈÇeA4—¶‡NÑĞF¦'Â'r÷!Ä“Õ_ø2´›¶§]µ<æÅx™âÇ¤­@ó÷…€0|`1Ë‚;­‹q¤=Ô‹Ñ˜bøô'öòßXŞåC‘Ã‡Ÿ’5İô ¯û00uO
{íÀyY’dE’vòÎºeš”½l‹—’ßŞÖ½9K¾µ¦dl-¿ÁçŞ[EÉ‹Âd®”Ä€Q’ÕâV]Ò6JÍ9è%.ŞùcŞ­ğÖ/ß«:¿ºï
±Ã´
_Ñ…[_Ø¨43âıVÉj	@¬í÷ğJŞs43J¥ó	»Dÿ"Ë1ôR>Pb·îüëÇÉ$zFBÅUKn3­âÛÀUeÇ­\Ûªc³·+ÇÄ™ssıiTŞ‘MË“kTÖZfÔY»,—Û®ëºÃv¼Š;Î;Ø—Îğ¥‘n¶ß6–ÿéŠşPÖñˆZQq<ã˜¯ºÕÁ¦ÕÈ¥¥¬_bm:÷Š|KK4Ù½¨Î©ìI¯§eLùEëßBYj2öû£¥ÚY=yŸaĞ$%*z½9„[cªa#=ø\çf~¦yê¿RšÂ¬¨è oE§®j£ %¾yÑŞo—xœ¥ÌAÂ  À;¯àš¥,,$ÆÏ~b¡‹’´T)ı¿şÁëft,ò,fJ‘0B°‰}‰H,Å›Ëä`&õæ.mh—%šˆìMš2dœ…l}r˜90Xè Ú¤ø¯­ëGmÒîÒéËş9êÌû¨Ë²İ+×åœ·õªGëB "} ~ºÖ1äBõc°ú“ÄFB˜xœ¥ÌKÂ  Ğ=§àš2|cŒk/1ÀŒ’ĞV[Üxz½ƒÛ·xccÖàlrÙ
¦d19Ÿ“ƒUr‘	Y=iãeè”U“³xh@;¸­eÈXÈW_BPôuÓ·¶ğråÅ}"Ş_ï6¸Ğ>Zïëå>SëÇ²Îgm¼›0úVÀ¨ŸÎmş£Pî•Ô'FŞ™xœ¥ŒQÂ Dÿ9Ğ,‹İÄã·— º(Ii•ÒûËü›Ì›7½‰hÉ~r.äLìfcœÈ#EñÑ±Æfõ	MÖ®›/10¡¡	'ÏˆÀƒ¤€¨ÂÑß[ÓÏ²ÊúÕ\ô5Èş=J|ïeY¶û«†²œÓVoÚxgi"ç½>P£­¥wùãBÕ±’¦~¼EFŠ™xœ¥ÌKÂ Fá9«`š‹\^‰1Æ±› ú£$¥UJ÷o÷àôäËĞ”ÉLŞ2¢×A©b àR(Ğ™0)°òN|bÇ2dq4y¶!bJÅƒu¡.AeòşÂÈÖ¸ìDÜÇ{íòY,,ÊÉkÄöİë@Û¨ó¼Ş_-Öùœ×v“Ê²65³<‘%Gmuü±íPèâº	Gğ—xœ¥ŒAÂ  ï¼‚h`l71Æxöl•H©¶ôÿö^g2ÓW¡â8f‰’lğ@Æz$O£—HV}x•ÖuvœP4–$fty"‹Ùağ'4 i8”â½¿–U?J“v—fQ_X¶ï^º$Şz©u¹=g.õœ–ùªmpƒGàõÉcÔAçÒ»ü±Pµ´·úÌWFt—xœ¥ÌAÂ  À;¯àš…–&ÆÏ~b­bÚR[úıƒ×9LßDtNÅ‹!a
eŒ €Ã@Ñ€C'0
xµò&K×i`ï£Á‘³‹%Øì¡5Å%²ÉK¬øè¯¶éG]d¹ËbH_XöÏQ»dŞ{¦v{Î\§snóU›àĞ“µDú@ıt®½Ë…ZåİÔ¿¿E™xœ¥Œ9n1 {½BH@Q7†ë|‚¤¨DÀöZnòúl“¤ÌÌ<T-×îQK-1ƒˆÔâ[Ë¾A(E=p3w:t›Sª™+JGlÊÍS	âbuQ›×ÎGĞsúçC”zL!¤R™½$aêJ…|hS‰EzÍïı°ŸcÓí¦›Ëöƒôùx©BÏ9–e¿~­4–wÙ×‹u)øx¶ˆö€9é:æÔ,ÌİiîæK)Vx•xœ¥KN!÷œ‚h€†¦IŒ1®½DÃ|(É<t†ÿşÎÆ¸­Tªæ	X^2(A‚¤ aièµq)ÁUfJ•}1ßzbŸ–RèØ	1–¥åâ¸wÎ9TŠøÊXş|8ïEU]«÷†JC¢Şn|‡ˆc“ Î}Ì¯ã´cÇşİgû¢¸~c¢é5ÇºoŸ›õ¹Û«õ)yW(Û'ÇÎ™›ncNü#aô2¿¼İSZ”xœ¥ÌAÂ Fá=§à†¤‰1Æµ—˜Â’´T[z{·ïK^_.ˆ¥Ğ`m.ğ™ÇÌC– p>LØ’úÈŠÖ5Q“FvÌC‚çRrHÁÛÂÁ¥X,Ä’½¿—U?kC{ ÑE_Ûw¯I¶^§i¹¿f©Ó9-óMSpìÉøÈúd‚1ê¨sí,”¨µF1Ÿxœ¥ÌANÄ0@Ñ}O‘İ¬œ:‰	!ÄáÄn'¢M!“¹?]q¶__otUãÀ*#y	}È9B@a(³Z/èØkÆ Ó7wmÃàDÈg*Å¹Q)s\%S($Køûİ,)&`9=‹FĞäÈÍÄq˜T½'™ø1nG7µi{×fÉ¼°Şuháû¨Ûv¼­;×í©û«±Á¡Ÿ™+€é¬{CÿALŸÚW5]÷cèut._µ­&wnåf.G¯kmÏûIi¿L¿DHbMá€QxœÛÏô’Q·¤(5UÁÀĞ,ÉÜ2%-Í0ÙÒ,--ÙÀ"ÍÄÀÂÀÌÄ2)Åˆ““ŒS’S'Æ¦±X˜˜M<n/¢tÌ¸¸’óss3K¸ öOÃ˜xœ¥ÌK
Â0 Ğ}N‘(“ß$ÑmAğ“dª6Õ6½¿ŞÁí[¼¾2ËœuH:B?ZÌ>Y§¢Óc