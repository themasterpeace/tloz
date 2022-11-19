te
     */
    downloadJPEG: 'Download JPEG image',
    /**
     * Exporting module only. The text for the PDF download menu item.
     *
     * @since    2.0
     * @requires modules/exporting
     *
     * @private
     */
    downloadPDF: 'Download PDF document',
    /**
     * Exporting module only. The text for the SVG download menu item.
     *
     * @since    2.0
     * @requires modules/exporting
     *
     * @private
     */
    downloadSVG: 'Download SVG vector image',
    /**
     * Exporting module menu. The tooltip title for the context menu holding
     * print and export menu items.
     *
     * @since    3.0
     * @requires modules/exporting
     *
     * @private
     */
    contextButtonTitle: 'Chart context menu'
});
if (!defaultOptions.navigation) {
    // Buttons and menus are collected in a separate config option set called
    // 'navigation'. This can be extended later to add control buttons like
    // zoom and pan right click menus.
    /**
     * A collection of options for buttons and menus appearing in the exporting
     * module.
     *
     * @requires     modules/exporting
     * @optionparent navigation
     */
    defaultOptions.navigation = {};
}
merge(true, defaultOptions.navigation, {
    /**
     * @optionparent navigation.buttonOptions
     *
     * @private
     */
    buttonOptions: {
        theme: {},
        /**
         * Whether to enable buttons.
         *
         *