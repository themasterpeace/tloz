;
                y1 -= yPointPadding;
                y3 += yPointPadding;
                // Store points for halo creation
                point.tileEdges = {
                    x1: x1, x2: x2, x3: x3, y1: y1, y2: y2, y3: y3
                };
                // Set this point's shape parameters
                point.shapeType = 'path';
                point.shapeArgs = {
                    d: [
                        ['M', x2, y1],
                        ['L', x3, y2],
                        ['L', x2, y3],
                        ['L', x1, y2],
                        ['Z']
                    ]
                };
            });
            series.translateColors();
        }
    },
    // Circle shape type.
    circle: {
        alignDataLabel: H.seriesTypes.scatter.prototype.alignDataLabel,
        getSeriesPadding: function (series) {
            return tilePaddingFromTileSize(series, 2, 2);
        },
        haloPath: function (size) {
            return H.seriesTypes.scatter.prototype.pointClass.prototype.haloPath
                .call(this, size + (size && this.radius));
        },
        translate: function () {
            var series = this, options = series.options, xAxis = series.xAxis, yAxis = series.yAxis, seriesPointPadding = options.pointPadding || 0, yRadius = (options.rowsize || 1) / 2, colsize = (options.colsize || 1), colsizePx, yRadiusPx, xRadiusPx, radius, forceNextRadiusCompute = false;
            series.generatePoints();
            series.points.forEach(function (point) {
                var x = clamp(Math.round(xAxis.len -
                    xAxis.translate(point.x, 0, 1, 0, 0)), -xAxis.len, 2 * xAxis.len), y = clamp(Math.round(yAxis.translate(point.y, 0, 1, 0, 0)), -yAxis.len, 2 * yAxis.len), pointPadding = seriesPointPadding, hasPerPointPadding = false;
                // If there is point padding defined on a single point, add it
                if (typeof point.pointPadding !== 'undefined') {
                    pointPadding = point.pointPadding;
                    hasPerPointPadding = true;
                    forceNextRadiusCompute = true;
                }
                // Find radius if not found already.
                // Use the smallest one (x vs y) to avoid overlap.
                // Note that the radius will be recomputed for each series.
                // Ideal (max) x radius is dependent on y radius:
                /*
                                * (circle 2)

                                        * (circle 3)
                                        |    yRadiusPx
                    (circle 1)    *-------|
                                 colsizePx

                    The distance between circle 1 and 3 (and circle 2 and 3) is
                    2r, which is the hypotenuse of the triangle created by
                    colsizePx and yRadiusPx. If the distance between circle 2
                    and circle 1 is less than 2r, we use half of that distance
                    instead (yRadiusPx).
                */
                if (!radius || forceNextRadiusCompute) {
                    colsizePx = Math.abs(clamp(Math.floor(xAxis.len -
                        xAxis.translate(point.x + colsize, 0, 1, 0, 0)), -xAxis.len, 2 * xAxis.len) - x);
                    yRadiusPx = Math.abs(clamp(Math.floor(yAxis.translate(point.y + yRadius, 0, 1, 0, 0)), -yAxis.len, 2 * yAxis.len) - y);
                    xRadiusPx = Math.floor(Math.sqrt((colsizePx * colsizePx + yRadiusPx * yRadiusPx)) / 2);
                    radius = Math.min(colsizePx, xRadiusPx, yRadiusPx) - pointPadding;
                    // If we have per point padding we need to always compute
                    // the radius for this point and the next. If we used to
                    // have per point padding but don't anymore, don't force
                    // compute next radius.
                    if (forceNextRadiusCompute && !hasPerPointPadding) {
                        forceNextRadiusCompute = false;
                    }
                }
                // Shift y-values for every second grid column.
                // Note that we always use the optimal y axis radius for this.
                // Also note: We have to reverse the shift for reversed y-axes.
                if (point.x % 2) {
                    y += yRadiusPx * (yAxis.reversed ? -1 : 1);
                }
                // Set plotX and plotY for use in K-D-Tree and more
                point.plotX = point.clientX = x;
                point.plotY = y;
                // Save radius for halo
                point.radius = radius;
      