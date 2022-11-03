iner,
        // because resizer.grabbed flag is stored in mousedown events.
        eventsToUnbind.push(addEvent(container, 'mousemove', mouseMoveHandler), addEvent(container.ownerDocument, 'mouseup', mouseUpHandler), addEvent(ctrlLineElem, 'mousedown', mouseDownHandler));
        // Touch events.
        if (hasTouch) {
            eventsToUnbind.push(addEvent(container, 'touchmove', mouseMoveHandler), addEvent(container.ownerDocument, 'touchend', mouseUpHandler), addEvent(ctrlLineElem, 'touchstart', mouseDownHandler));
        }
        resizer.eventsToUnbind = eventsToUnbind;
    };
    /**
     * Mouse move event based on x/y mouse position.
     *
     * @function Highcharts.AxisResizer#onMouseMove
     *
     * @param {Highcharts.PointerEventObject} e
     *        Mouse event.
     */
    AxisResizer.prototype.onMouseMove = function (e) {
        /*
         * In iOS, a mousemove event with e.pageX === 0 is fired when holding
         * the finger down in the center of the scrollbar. This should
         * be ignored. Borrowed from Navigator.
         */
        if (!e.touches || e.touches[0].pageX !== 0) {
            // Drag the control line
            if (this.grabbed) {
                this.hasDragged = true;
                this.updateAxes(this.axis.chart.pointer.normalize(e).chartY -
                    this.options.y);
            }
        }
    };
    /**
     * Mouse up event based on x/y mouse position.
     *
     * @function Highcharts.AxisResizer#onMouseUp
     *
     * @param {Highcharts.PointerEventObject} e
     *        Mouse event.
     */
    AxisResizer.prototype.onMouseUp = function (e) {
        if (this.hasDragged) {
            this.updateAxes(this.axis.chart.pointer.normalize(e).chartY -
                this.options.y);
        }
        // Restore runPointActions.
        this.grabbed = this.hasDragged = this.axis.chart.activeResizer =
            null;
    };
    /**
     * Mousedown on a control line.
     * Will store necessary information for drag&drop.
     *
     * @function Highcharts.AxisResizer#onMouseDown
     */
    AxisResizer.prototype.onMouseDown = function (e) {
        // Clear all hover effects.
        this.axis.chart.pointer.reset(false, 0);
        // Disable runPointActions.
        this.grabbed = this.axis.chart.activeResizer = true;
    };
    /**
     * Update all connected axes after a change of control line position
     *
     * @function Highcharts.AxisResizer#updateAxes
     *
     * @param {number} chartY
     */
    AxisResizer.prototype.updateAxes = function (chartY) {
        var resizer = this, chart = resizer.axis.chart, axes = resizer.options.controlledAxis, nextAxes = axes.next.length === 0 ?
            [chart.yAxis.indexOf(resizer.axis) + 1] : axes.next, 
        // Main axis is included in the prev array by default
        prevAxes = [resizer.axis].concat(axes.prev), 
        // prev and next configs
        axesConfigs = [], stopDrag = false, plotTop = chart.plotTop, plotHeight = chart.plotHeight, plotBottom = plotTop + plotHeight, yDelta, calculatePercent = function (value) {
            return value * 100 / plotHeight + '%';
        }, normalize = function (val, min, max) {
            return Math.round(clamp(val, min, max));
        };
        // Normalize chartY to plot area limits
        chartY = clamp(chartY, plotTop, plotBottom);
        yDelta = chartY - resizer.lastPos;
        // Update on changes of at least 1 pixel in the desired direction
        if (yDelta * yDelta < 1) {
            return;
        }
        // First gather info how axes should behave
        [prevAxes, nextAxes].forEach(function (axesGroup, isNext) {
            axesGroup.forEach(function (axisInfo, i) {
                // Axes given as array index, axis object or axis id
                var axis = isNumber(axisInfo) ?
                    // If it's a number - it's an index
                    chart.yAxis[axisInfo] :
                    (
                    // If it's first elem. in first group
                    (!isNext && !i) ?
                        // then it's an Axis object
                        axisInfo :
                        // else it should be an id
                        chart.get(axisInfo)), axisOptions = axis && axis.options, optionsToUpdate = {}, hDelta = 0, height, top, minLength, maxLength;
                // Skip if axis is not found
                // or it is navigator's yAxis (#7732)
                if (!axisOptions ||
                    axisOptions.id === 'navigator-y-axis') {
                    return;
                }
                top = axis.top;
                minLength = Math.round(relativeLength(axisOptions.minLength, plotHeight));
                maxLength = Math.round(relativeLength(axisOptions.maxLength, plotHeight));
                if (isNext) {
                    // Try to change height first. yDelta could had changed
                    yDelta = chartY - resizer.lastPos;
                    // Normalize height to option limits
                    height = normalize(axis.len - yDelta, minLength, maxLength);
                    // Adjust top, so the axis looks like shrinked from top
                    top = axis.top + yDelta;
                    // Check for plot area limits
                    if (top + height > plotBottom) {
                        hDelta = plotBottom - height - top;
                        chartY += hDelta;
                        top += hDelta;
              