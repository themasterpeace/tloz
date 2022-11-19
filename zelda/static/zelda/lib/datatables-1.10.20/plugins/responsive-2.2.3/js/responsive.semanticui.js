'bottom';
        }
        else {
            options.y = chart.plotHeight - off;
        }
    }
    return options;
};
/**
 * A map object which allows to map options attributes to element attributes
 *
 * @type {Highcharts.Dictionary<string>}
 */
ControllableLabel.attrsMap = {
    backgroundColor: 'fill',
    borderColor: 'stroke',
    borderWidth: 'stroke-width',
    zIndex: 'zIndex',
    borderRadius: 'r',
    padding: 'padding'
};
merge(true, ControllableLabel.prototype, controllableMixin, 
/** @lends Annotation.ControllableLabel# */ {
    /**
     * Translate the point of the label by deltaX and deltaY translations.
     * The point is the label's anchor.
     *
     * @param {number} dx translation for x coordinate
     * @param {number} dy translation for y coordinate
     **/
    translatePoint: function (dx, dy) {
        controllableMixin.translatePoint.call(this, dx, dy, 0);
    },
    /**
     * Translate x and y position relative to the label's anchor.
     *
     * @param {number} dx translation for x coordinate
     * @param {number} dy translation for y coordinate
     **/
    translate: function (dx, dy) {
        var chart = this.annotation.chart, 
        // Annotation.options
        labelOptions = this.annotation.userOptions, 
        // Chart.options.annotations
        annotationIndex = chart.annotations.indexOf(this.annotation), chartAnnotations = chart.options.annotations, chartOptions = chartAnnotations[annotationIndex], temp;
        if (chart.inverted) {
            temp = dx;
            dx = dy;
            dy = temp;
        }
        // Local options:
        this.options.x += dx;
        this.options.y += dy;
        // Options stored in chart:
        chartOptions[this.collection][this.index].x = this