     chart.plotTop);
                }
                else {
                    point.plotX = chart.yAxis[i].left - chart.plotLeft;
                }
                point.clientX = point.plotX;
                point.plotY = chart.yAxis[i]
                    .translate(point.y, false, true, null, true);
                if (typeof lastPlotX !== 'undefined') {
                    closestPointRangePx = Math.min(closestPointRangePx, Math.abs(point.plotX - lastPlotX));
                }
                lastPlotX = point.plotX;
                point.isInside = chart.isInsidePlot(point.plotX, point.plotY, chart.inverted);
            }
            else {
                point.isNull = true;
            }
        }
        this.closestPointRangePx = closestPointRangePx;
    }
}, { order: 1 });
// On destroy, we need to remove series from each axis.series
addEvent(H.Series, 'de