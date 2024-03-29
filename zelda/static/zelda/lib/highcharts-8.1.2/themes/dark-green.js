m {Highcharts.Point} [newPoint]
     *          If a single point was added, a reference to this point.
     *
     * @return {string|null}
     * The announcement message to give to user.
     */
    buildAnnouncementMessage: function (dirtySeries, newSeries, newPoint) {
        var chart = this.chart, annOptions = chart.options.accessibility.announceNewData;
        // User supplied formatter?
        if (annOptions.announcementFormatter) {
            var formatterRes = annOptions.announcementFormatter(dirtySeries, newSeries, newPoint);
            if (formatterRes !== false) {
                return formatterRes.length ? formatterRes : null;
            }
        }
        // Default formatter - use lang options
        var multiple = H.charts && H.charts.length > 1 ? 'Multiple' : 'Single', langKey = newSeries ? 'newSeriesAnnounce' + multiple :
            newPoint ? 'newPointAnnounce' + multiple : 'newDataAnnounce', chartTitle = getChartTitle(chart);
        return chart.langFormat('accessibility.announceNewData.' + langKey, {
            chartTitle: chartTitle,
            seriesDesc: newSeries ?
                defaultSeriesDescriptionFormatter(newSeries) :
                null,
            pointDesc: newPoint ?
                defaultPointDescriptionFormatter(newPoint) :
                null,
            point: newPoint,
            series: newSeries
        });
    }
});
export default NewDataAnnouncer;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            