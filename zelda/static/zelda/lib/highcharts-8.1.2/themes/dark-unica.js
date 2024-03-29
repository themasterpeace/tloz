ionLabelDescription(label)));
        return desc ? "<li>" + desc + "</li>" : '';
    });
}
/**
 * Return the annotation info for a chart as string.
 *
 * @private
 * @param {Highcharts.Chart} chart The chart to get annotation info on.
 * @return {string} String with HTML content or empty string if no annotations.
 */
function getAnnotationsInfoHTML(chart) {
    var annotations = chart.annotations;
    if (!(annotations && annotations.length)) {
        return '';
    }
    var annotationItems = getAnnotationListItems(chart);
    return "<ul>" + annotationItems.join(' ') + "</ul>";
}
/**
 * Return the texts for the annotation(s) connected to a point, or empty array
 * if none.
 *
 * @private
 * @param {Highcharts.Point} point The data point to get the annotation info from.
 * @return {Array<string>} Annotation texts
 */
function getPointAnnotationTexts(point) {
    var labels = getChartAnnotationLabels(point.series.chart);
    var pointLabels = labels
        .filter(function (label) { return inArray(point, label.points) > -1; });
    if (!pointLabels.length) {
        return [];
    }
    return pointLabels.map(function (label) { return "" + getLabelText(label); });
}
var AnnotationsA11y = {
    getAnnotationsInfoHTML: getAnnotationsInfoHTML,
    getAnnotationLabelDescription: getAnnotationLabelDescription,
    getAnnotationListItems: getAnnotationListItems,
    getPointAnnotationTexts: getPointAnnotationTexts
};
export default AnnotationsA11y;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                