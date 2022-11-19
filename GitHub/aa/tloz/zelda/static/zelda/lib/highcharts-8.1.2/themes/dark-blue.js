               yAxis.toPixels(maxVal, true);
                                    yBottom =
                                        yAxis.toPixels(minVal, true);
                                    addKDPoint(clientX, plotY, maxI);
                                    if (yBottom !== plotY) {
                                        addKDPoint(clientX, yBottom, minI);
                                    }
                                }
                                minI = maxI = void 0;
                                lastClientX = clientX;
                            }
                        }
                        else {
                            plotY = Math.ceil(yAxis.toPixels(y, true));
                            addKDPoint(clientX, plotY, i);
                        }
                    }
                }
                return !chartDestroyed;
            }
            /**
             * @private
             */
            function doneProcessing() {
                fireEvent(series, 'renderedCanvas');
                // Go back to prototype, ready to build
                delete series.buildKDTree;
                series.buildKDTree();
                if (boostOptions.debug.timeKDTree) {
                    console.timeEnd('kd tree building'); // eslint-disable-line no-console
                }
            }
            // Loop over the points to build the k-d tree - skip this if
            // exporting
            if (!chart.renderer.forExport) {
                if (boostOptions.debug.timeKDTree) {
                    console.time('kd tree building'); // eslint-disable-line no-console
                }
                eachAsync(isStacked ? series.data : (xData || rawData), processPoint, doneProcessing);
            }
        }
    });
    /*
     * We need to handle heatmaps separatly, since we can't perform the
     * size/color calculations in the shader easily.
     *
     * This likely needs future optimization.
     */
    ['heatmap', 'treemap'].forEach(function (t) {
        if (seriesTypes[t]) {
            wrap(seriesTypes[t].prototype, 'drawPoints', pointDrawHandler);
        }
    });
    /* eslint-disable no-invalid-this */
    if (seriesTypes.bubble) {
        // By default, the bubble series does not use the KD-tree, so force it
        // to.
        delete seriesTypes.bubble.prototype.buildKDTree;
        // seriesTypes.bubble.prototype.directTouch = false;
        // Needed for markers to work correctly
        wrap(seriesTypes.bubble.prototype, 'markerAttribs', function (proceed) {
            if (this.isSeriesBoosting) {
                return false;
            }
            return proceed.apply(this, [].slice.call(arguments, 1));
        });
    }
    seriesTypes.scatter.prototype.fill = true;
    extend(seriesTypes.area.prototype, {
        fill: true,
        fillOpacity: true,
        sampling: true
    });
    extend(seriesTypes.column.prototype, {
        fill: true,
        sampling: true
    });
    // Take care of the canvas blitting
    Chart.prototype.callbacks.push(function (chart) {
        /**
         * Convert chart-level canvas to image.
         * @private
         */
        function canvasToSVG() {
            if (chart.ogl && chart.isChartSeriesBoosting()) {
                chart.ogl.render(chart);
            }
        }
        /**
         * Clear chart-level canvas.
         * @private
         */
        