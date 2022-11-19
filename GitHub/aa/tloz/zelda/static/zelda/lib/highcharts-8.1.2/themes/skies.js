l-table
         *         Multiple table headers
         *
         * @since    6.0.4
         * @requires modules/export-data
         */
        useRowspanHeaders: true
    },
    /**
     * @optionparent lang
     *
     * @private
     */
    lang: {
        /**
         * The text for the menu item.
         *
         * @since    6.0.0
         * @requires modules/export-data
         */
        downloadCSV: 'Download CSV',
        /**
         * The text for the menu item.
         *
         * @since    6.0.0
         * @requires modules/export-data
         */
        downloadXLS: 'Download XLS',
        /**
         * The text for exported table.
         *
         * @since 8.1.0
         * @requires modules/export-data
         */
        exportData: {
            /**
             * The category column title.
             */
            categoryHeader: 'Category',
            /**
             * The category column title when axis type set to "datetime".
             */
            categoryDatetimeHeader: 'DateTime'
        },
        /**
         * The text for the menu item.
         *
         * @since    6.0.0
         * @requires modules/export-data
         */
        viewData: 'View data table'
    }
});
/* eslint-disable no-invalid-this */
// Add an event listener to handle the showTable option
addEvent(Chart, 'render', function () {
    if (this.options &&
        this.options.exporting &&
        this.options.exporting.showTable &&
        !this.options.chart.forExport) {
        this.viewData();
    }
});
/* eslint-enable no-invalid-this */
/**
 * Set up key-to-axis bindings. This is used when the Y axis is datetime or
 * categorized. For example in an arearange series, the low and high values
 * should be formatted according to the Y axis type, and in order to link them
 * we need this map.
 *
 * @private
 * @function Highcharts.Chart