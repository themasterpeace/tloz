* The vertical alignment of the buttons. Can be one of `"top"`,
         * `"middle"` or `"bottom"`.
         *
         * @sample highcharts/navigation/buttonoptions-verticalalign/
         *         Buttons at lower right
         *
         * @type  {Highcharts.VerticalAlignValue}
         * @since 2.0
         */
        verticalAlign: 'top',
        /**
         * The pixel width of the button.
         *
         * @sample highcharts/navigation/buttonoptions-height/
         *         Bigger buttons
         *
         * @since 2.0
         */
        width: 24
    }
});
// Presentational attributes
merge(true, defaultOptions.navigation
/**
 * A collection of options for buttons and menus appearing in the exporting
 * module.
 *
 * @optionparent navigation
 */
, {
    /**
     * CSS styles for the popup menu appearing by default when the export
     * icon is clicked. This menu is rendered in HTML.
     *
     * @see In styled mode, the menu is styled with the `.highcharts-menu`
     *      class.
     *
     * @sample highcharts/navigation/menustyle/
     *         Light gray menu background
     *
     * @type    {Highcharts.CSSObject}
     * @default {"border": "1px solid #999999", "background": "#ffffff", "padding": "5px 0"}
     * @since   2.0
     *
     * @private
     */
    menuStyle: {
        /** @ignore-option */
        border: '1px solid #999999',
        /** @ignore-option */
        background: '#ffffff',
        /** @ignore-option */
        padding: '5px 0'
    },
    /**
     * CSS styles for the individual items within the popup menu appearing
     * by default when the export icon is clicked. The menu items are
     * rendered in HTML. Font size defaults to `11px` on desktop and `14px`
     * on touch devices.
     *
     * @see In styled mode, the menu items are styled with the
     *      `.highcharts-menu-item` class.
     *
     * @sample {highcharts} highcharts/navigation/menuitemstyle/
     *         Add a grey stripe to the left
     *
     * @type    {Highcharts.CSSObject}
     * @default {"padding": "0.5em 1em", "color": "#333333", "background": "none", "fontSize": "11px/14px", "transition": "background 250ms, color 250ms"}
     * @since   2.0
     *
     * @private
     */
    menuItemStyle: {
        /** @ignore-option */
        padding: '0.5em 1em',
        /** @ignore-option */
        color: '#333333',
        /** @ignore-option */
        background: 'none',
        /** @ignore-option */
        fontSize: isTouchDevice ? '14px' : '11px',
        /** @ignore-option */
        transition: 'background 250ms, color 250ms'
    },
    /**
     * CSS styles for the hover state of the individual items within the
     * popup menu appearing by default when the export icon is clicked. The
     * menu items are rendered in HTML.
     *
     * @see In styled mode, the menu items are styled with the
     *      `.highcharts-menu-item` class.
     *
     * @sample highcharts/navigation/menuitemhoverstyle/
     *         Bold text on hover
     *
     * @type    {Highcharts.CSSObject}
     * @default {"background": "#335cad", "color": "#ffffff"}
     * @since   2.0
     *
     * @private
     */
    menuItemHoverStyle: {
        /** @ignore-option */
        background: '#335cad',
        /** @ignore-option */
        color: '#ffffff'
    },
    /**
     * A collection of options for buttons appearing in the exporting
     * module.
     *
     * In styled mode, the buttons are styled with the
     * `.highcharts-contextbutton` and `.highcharts-button-symbol` classes.
     *
     * @requires modules/exporting
     *
     * @private
     */
    buttonOptions: {
        /**
         * Fill color for the symbol within the button.
         *
         * @sample highcharts/navigation/buttonoptions-symbolfill/
         *         Blue symbol stroke for one of the buttons
         *
         * @type  {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
         * @since 2.0
         */
        symbolFill: '#666666',
        /**
         * The color of the symbol's stroke or line.
         *
         * @sample highcharts/navigation/buttonoptions-symbolstroke/
         *         Blue symbol stroke
         *
         * @type  {Highcharts.ColorString}
         * @since 2.0
         */
        symbolStroke: '#666666',
        /**
         * The pixel stroke width of the symbol on the button.
         *
         * @sample highcharts/navigation/buttonoptions-height/