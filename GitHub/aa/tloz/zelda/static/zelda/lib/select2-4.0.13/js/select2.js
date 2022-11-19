utton', { button: navigation.selectedButtonElement });
            if (navigation.nextEvent) {
                // Remove in-progress annotations adders:
                if (navigation.currentUserDetails &&
                    navigation.currentUserDetails.coll === 'annotations') {
                    chart.removeAnnotation(navigation.currentUserDetails);
                }
                navigation.mouseMoveEvent = navigation.nextEvent = false;
            }
        }
        navigation.selectedButton = events;
        navigation.selectedButtonElement = button;
        fireEvent(navigation, 'selectButton', { button: button });
        // Call "init" event, for example to open modal window
        if (events.init) {
            events.init.call(navigation, button, clickEvent);
        }
        if (events.start || events.steps) {
            chart.renderer.boxWrapper.addClass(PREFIX + 'draw-mode');
        }
    };
    /**
     * Hook for click on a chart, first click on a chart calls `start` event,
     * then on all subsequent clicks iterate over `steps` array.
     * When finished, calls `end` event.
     *
     * @private
     * @function Highcharts.NavigationBindings#bindingsChartClick
     *
     * @param {Highcharts.Chart} chart
     *        Chart that click was performed on.
     *
     * @param {Highcharts.PointerEventObject} clickEvent
     *        Browser's click event.
     */
    NavigationBindings.prototype.bindingsChartClick = function (chart, clickEvent) {
        var navigation = this, chart = navigation.chart, selectedButton = navigation.selectedButton, svgContainer = chart.renderer.boxWrapper;
        // Click outside popups, should close them and deselect the annotation
        if (navigation.activeAnnotation &&
            !clickEvent.activeAnnotation &&
            // Element could be removed in the child action, e.g. button
            clickEvent.target.parentNode &&
            // TO DO: Polyfill for IE11?
            !closestPolyfill(clickEvent.target, '.' + PREFIX + 'popup')) {
            fireEvent(navigation, 'closePopup');
            navigation.deselectAnnotation();
        }
        if (!selectedButton || !selectedButton.start) {
            return;
        }
        if (!navigation.nextEvent) {
            // Call init method:
            navigation.currentUserDetails = selectedButton.start.call(navigation, clickEvent);
            // If steps exists (e.g. Annotations), bind them:
            if (selectedButton.steps) {
                navigation.stepIndex = 0;
                navigation.steps = true;
                navigation.mouseMoveEvent = navigation.nextEvent =
                    selectedButton.steps[navigation.stepIndex];
            }
            else {
                fireEvent(navigation, 'deselectButton', { button: navigation.selectedButtonElement });
                svgContainer.removeClass(PREFIX + 'draw-mode');
                navigation.steps = false;
                navigation.selectedButton = null;
                // First click is also the last one:
                if (selectedButton.end) {
                    selectedButton.end.call(navigation, clickEvent, navigation.currentUserDetails);
                }
            }
        }
        else {
            navigation.nextEvent(clickEvent, navigation.currentUserDetails);
            if (navigation.steps) {
                navigation.stepIndex++;
                if (selectedButton.steps[navigation.stepIndex]) {
                    // If we have more steps, bind them one by one:
                    navigation.mouseMoveEvent = navigation.nextEvent =
                        selectedButton.steps[navigation.stepIndex];
                }
                else {
                    fireEvent(navigation, 'deselectButton', { button: navigation.selectedButtonElement });
                    svgContainer.removeClass(PREFIX + 'draw-mode');
                    // That was the last step, call end():
                    if (selectedButton.end) {
                        selectedButton.end.call(navigation, clickEvent, navigation.currentUserDetails);
                    }
                    navigation.nextEvent = false;
                    navigation.mouseMoveEvent = false;
                    navigation.selectedButton = null;
                }
            }
        }
    };
    /**
     * Hook for mouse move on a chart's container. It calls current step.
     *
     * @private
     * @function Highcharts.NavigationBindings#bindingsContainerMouseMove
     *
     * @param {Highcharts.HTMLDOMElement} container
     *        Chart's container.
     *
     * @param {global.Event} moveEvent
     *        Browser's move event.
     */
    NavigationBindings.prototype.bindingsContainerMouseMove = function (_container, moveEvent) {
        if (this.mouseMoveEvent) {
            this.mouseMoveEvent(moveEvent, this.currentUserDetails);
        }
    };
    /**
     * Translate fields (e.g. `params.period` or `marker.styles.color`) to
     * Highcharts options object (e.g. `{ params: { period } }`).
     *
     * @private
     * @function Highcharts.NavigationBindings#fieldsToOptions<T>
     *
     * @param {Highcharts.Dictionary<string>} fields
     *        Fields from popup form.
     *
     * @param {T} config
     *        Default config to be modified.
     *
     * @return {T}
     *         Modified config
     */
    NavigationBindings.prototype.fieldsToOptions = function (fields, config) {
        objectEach(fields, function (value, field) {
            var parsedValue = parseFloat(value), path = field.split('.'), parent = config, pathLength = path.length - 1;
            // If it's a number (not "format" options), parse it:
            if (isNumber(parsedValue) &&
                !value.match(/px/g) &&
                !field.match(/format/g)) {
                value = parsedValue;
            }
            // Remove empty strings or values like 0
            if (value !== '' && value !== 'undefined') {
                path.forEach(function (name, index) {
                    var nextName = pick(path[index + 1], '');
                    if (pathLength === index) {
                        // Last index, put value:
                        parent[name] = value;
                    }
                    else if (!parent[name]) {
                        // Create middle property:
                        parent[name] = nextName.match(/\d/g) ? [] : {};
                        parent = parent[name];
                    }
                    else {
                        // Jump into next property
                        parent = parent[name];
                    }
                });
            }
        });
        return config;
    };
    /**
     * Shorthand method to deselect an annotation.
     *
     * @function Highcharts.NavigationBindings#deselectAnnotation
     */
    NavigationBindings.prototype.deselectAnnotation = function () {
        if (this.activeAnnotation) {
            this.activeAnnotation.setControlPointsVisibility(false);
            this.activeAnnotation = false;
        }
    };
    /**
     * Generates API config for popup in the same format as options for
     * Annotation object.
     *
     * @function Highcharts.NavigationBindings#annotationToFields
     *
     * @param {Highcharts.Annotation} annotation
     *        Annotations object
     *
     * @return {Highcharts.Dictionary<string>}
     *         Annotation options to be displayed in popup box
     */
    NavigationBindings.prototype.annotationToFields = function (annotation) {
        var options = annotation.options, editables = NavigationBindings.annotationsEditable, nestedEditables = editables.nestedOptions, getFieldType = this.utils.getFieldType, type = pick(options.type, options.shapes && options.shapes[0] &&
            options.shapes[0].type, options.labels && options.labels[0] &&
            options.labels[0].itemType, 'label'), nonEditables = NavigationBindings.annotationsNonEditable[options.langKey] || [], visualOptions = {
            langKey: options.langKey,
            type: type
        };
        /**
         * Nested options traversing. Method goes down to the options and copies
         * allowed options (with values) to new object, which is last parameter:
         * "parent".
         *
         * @private
         *
         * @param {*} option
         *        Atomic type or object/array
         *
         * @param {string} key
         *        Option name, for example "visible" or "x", "y"
         *
         * @param {object} parentEditables
         *        Editables from NavigationBindings.annotationsEditable
         *
         * @param {object} parent
         *        Where new options will be assigned
         */
        function traverse(option, key, parentEditables, parent) {
            var nextParent;
            if (parentEditables &&
                nonEditables.indexOf(key) === -1 &&
                ((parentEditables.indexOf &&
                    parentEditables.indexOf(key)) >= 0 ||
                    parentEditables[key] || // nested array
                    parentEditables === true // simple array
                )) {
                // Roots:
                if (isArray(option)) {
                    parent[key] = [];
                    option.forEach(function (arrayOption, i) {
                        if (!isObject(arrayOption)) {
                            // Simple arrays, e.g. [String, Number, Boolean]
                            traverse(arrayOption, 0, nestedEditables[key], parent[key]);
                        }
                        else {
                            // Advanced arrays, e.g. [Object, Object]
                            parent[key][i] = {};
                            objectEach(arrayOption, function (nestedOption, nestedKey) {
                                traverse(nestedOption, nestedKey, nestedEditables[key], parent[key][i]);
                            });
                        }
                    });
                }
                else if (isObject(option)) {
                    nextParent = {};
                    if (isArray(parent)) {
                        parent.push(nextParent);
                        nextParent[key] = {};
                        nextParent = nextParent[key];
                    }
                    else {
                        parent[key] = nextParent;
                    }
                    objectEach(option, function (nestedOption, nestedKey) {
                        traverse(nestedOption, nestedKey, key === 0 ? parentEditables : nestedEditables[key], nextParent);
                    });
                }
                else {
                    // Leaf:
                    if (key === 'format') {
                        parent[key] = [
                            format(option, annotation.labels[0].points[0]).toString(),
                            'text'
                        ];
                    }
                    else if (isArray(parent)) {
                        parent.push([option, getFieldType(option)]);
                    }
                    else {
                        parent[key] = [option, getFieldType(option)];
                    }
                }
            }
        }
        objectEach(options, function (option, key) {
            if (key === 'typeOptions') {
                visualOptions[key] = {};
                objectEach(options[key], function (typeOption, typeKey) {
                    traverse(typeOption, typeKey, nestedEditables, visualOptions[key], true);
                });
            }
            else {
                traverse(option, key, editables[type], visualOptions);
            }
        });
        return visualOptions;
    };
    /**
     * Get all class names for all parents in the element. Iterates until finds
     * main container.
     *
     * @function Highcharts.NavigationBindings#getClickedClassNames
     *
     * @param {Highcharts.HTMLDOMElement}
     *        Container that event is bound to.
     *
     * @param {global.Event} event
     *        Browser's event.
     *
     * @return {Array<Array<string, Highcharts.HTMLDOMElement>>}
     *         Array of class names with corresponding elements
     */
    NavigationBindings.prototype.getClickedClassNames = function (container, event) {
        var element = event.target, classNames = [], elemClassName;
        while (element) {
            elemClassName = attr(element, 'class');
            if (elemClassName) {
                classNames = classNames.concat(elemClassName
                    .split(' ')
                    .map(function (name) {
                    return [
                        name,
                        element
                    ];
                }));
            }
            element = element.parentNode;
            if (element === container) {
                return classNames;
            }
        }
        return classNames;
    };
    /**
     * Get events bound to a button. It's a custom event delegation to find all
     * events connected to the element.
     *
     * @private
     * @function Highcharts.NavigationBindings#getButtonEvents
     *
     * @param {Highcharts.HTMLDOMElement} container
     *        Container that event is bound to.
     *
     * @param {global.Event} event
     *        Browser's event.
     *
     * @return {object}
     *         Object with events (init, start, steps, and end)
     */
    NavigationBindings.prototype.getButtonEvents = function (container, event) {
        var navigation = this, classNames = this.getClickedClassNames(container, event), bindings;
        classNames.forEach(function (className) {
            if (navigation.boundClassNames[className[0]] && !bindings) {
                bindings = {
                    events: navigation.boundClassNames[className[0]],
                    button: className[1]
                };
            }
        });
        return bindings;
    };
    /**
     * Bindings are just events, so the whole update process is simply
     * removing old events and adding new ones.
     *
     * @private
     * @function Highcharts.NavigationBindings#update
     */
    NavigationBindings.prototype.update = function (options) {
        this.options = merge(true, this.options, options);
        this.removeEvents();
        this.initEvents();
    };
    /**
     * Remove all events created in the navigation.
     *
     * @private
     * @function Highcharts.NavigationBindings#removeEvents
     */
    NavigationBindings.prototype.removeEvents = function () {
        this.eventsToUnbind.forEach(function (unbinder) {
            unbinder();
        });
    };
    NavigationBindings.prototype.destroy = function () {
        this.removeEvents();
    };
    /* *
     *
     *  Static Properties
     *
     * */
    // Define which options from annotations should show up in edit box:
    NavigationBindings.annotationsEditable = {
        // `typeOptions` are always available
        // Nested and shared options:
        nestedOptions: {
            labelOptions: ['style', 'format', 'backgroundColor'],
            labels: ['style'],
            label: ['style'],
            style: ['fontSize', 'color'],
            background: ['fill', 'strokeWidth', 'stroke'],
            innerBackground: ['fill', 'strokeWidth', 'stroke'],
            outerBackground: ['fill', 'strokeWidth', 'stroke'],
            shapeOptions: ['fill', 'strokeWidth', 'stroke'],
            shapes: ['fill', 'strokeWidth', 'stroke'],
            line: ['strokeWidth', 'stroke'],
            backgroundColors: [true],
            connector: ['fill', 'strokeWidth', 'stroke'],
            crosshairX: ['strokeWidth', 'stroke'],
            crosshairY: ['strokeWidth', 'stroke']
        },
        // Simple shapes:
        circle: ['shapes'],
        verticalLine: [],
        label: ['labelOptions'],
        // Measure
        measure: ['background', 'crosshairY', 'crosshairX'],
        // Others:
        fibonacci: [],
        tunnel: ['background', 'line', 'height'],
        pitchfork: ['innerBackground', 'outerBackground'],
        rect: ['shapes'],
        // Crooked lines, elliots, arrows etc:
        crookedLine: [],
        basicAnnotation: []
    };
    // Define non editable fields per annotation, for example Rectangle inherits
    // options from Measure, but crosshairs are not available
    NavigationBindings.annotationsNonEditable = {
        rectangle: ['crosshairX', 'crosshairY', 'label']
    };
    return NavigationBindings;
}());
/**
 * General utils for bindings
 *
 * @private
 * @name Highcharts.NavigationBindings.utils
 * @type {bindingsUtils}
 */
NavigationBindings.prototype.utils = bindingsUtils;
H.Chart.prototype.initNavigationBindings = function () {
    var chart = this, options = chart.options;
    if (options && options.navigation && options.navigation.bindings) {
        chart.navigationBindings = new NavigationBindings(chart, options.navigation);
        chart.navigationBindings.initEvents();
        chart.navigationBindings.initUpdate();
    }
};
addEvent(H.Chart, 'load', function () {
    this.initNavigationBindings();
});
addEvent(H.Chart, 'destroy', function () {
    if (this.navigationBindings) {
        this.navigationBindings.destroy();
    }
});
addEvent(NavigationBindings, 'deselectButton', function () {
    this.selectedButtonElement = null;
});
addEvent(Annotation, 'remove', function () {
    if (this.chart.navigationBindings) {
        this.chart.navigationBindings.deselectAnnotation();
    }
});
/**
 * Show edit-annotation form:
 * @private
 */
function selectableAnnotation(annotationType) {
    var originalClick = annotationType.prototype.defaultOptions.events &&
        annotationType.prototype.defaultOptions.events.click;
    /**
     * @private
     */
    function selectAndshowPopup(event) {
        var annotation = this, navigation = annotation.chart.navigationBindings, prevAnnotation = navigation.activeAnnotation;
        if (originalClick) {
            originalClick.call(annotation, event);
        }
        if (prevAnnotation !== annotation) {
            // Select current:
            navigation.deselectAnnotation();
            navigation.activeAnnotation = annotation;
            annotation.setControlPointsVisibility(true);
            fireEvent(navigation, 'showPopup', {
                annotation: annotation,
                formType: 'annotation-toolbar',
                options: navigation.annotationToFields(annotation),
                onSubmit: function (data) {
                    var config = {}, typeOptions;
                    if (data.actionType === 'remove') {
                        navigation.activeAnnotation = false;
                        navigation.chart.removeAnnotation(annotation);
                    }
                    else {
                        navigation.fieldsToOptions(data.fields, config);
                        navigation.deselectAnnotation();
                        typeOptions = config.typeOptions;
                        if (annotation.options.type === 'measure') {
                            // Manually disable crooshars according to
                            // stroke width of the shape:
                            typeOptions.crosshairY.enabled =
                                typeOptions.crosshairY.strokeWidth !== 0;
                            typeOptions.crosshairX.enabled =
                                typeOptions.crosshairX.strokeWidth !== 0;
                        }
                        annotation.update(config);
                    }
                }
            });
        }
        else {
            // Deselect current:
            navigation.deselectAnnotation();
            fireEvent(navigation, 'closePopup');
        }
        // Let bubble event to chart.click:
        event.activeAnnotation = true;
    }
    merge(true, annotationType.prototype.defaultOptions.events, {
        click: selectAndshowPopup
    });
}
if (H.Annotation) {
    // Basic shapes:
    selectableAnnotation(Annotation);
    // Advanced annotations:
    objectEach(Annotation.types, function (annotationType) {
        selectableAnnotation(annotationType);
    });
}
setOptions({
    /**
     * @optionparent lang
     *
     * @private
     */
    lang: {
        /**
         * Configure the Popup strings in the chart. Requires the
         * `annotations.js` or `annotations-advanced.src.js` module to be
         * loaded.
         *
         * @since   7.0.0
         * @product highcharts highstock
         */
        navigation: {
            /**
             * Translations for all field names used in popup.
             *
             * @product highcharts highstock
             */
            popup: {
                simpleShapes: 'Simple shapes',
                lines: 'Lines',
                circle: 'Circle',
                rectangle: 'Rectangle',
                label: 'Label',
                shapeOptions: 'Shape options',
                typeOptions: 'Details',
                fill: 'Fill',
                format: 'Text',
                strokeWidth: 'Line width',
                stroke: 'Line color',
                title: 'Title',
                name: 'Name',
                labelOptions: 'Label options',
                labels: 'Labels',
                backgroundColor: 'Background color',
                backgroundColors: 'Background colors',
                borderColor: 'Border color',
                borderRadius: 'Border radius',
                borderWidth: 'Border width',
                style: 'Style',
                padding: 'Padding',
                fontSize: 'Font size',
                color: 'Color',
                height: 'Height',
                shapes: 'Shape options'
            }
        }
    },
    /**
     * @optionparent navigation
     * @product      highcharts highstock
     *
     * @private
     */
    navigation: {
        /**
         * A CSS class name where all bindings will be attached to. Multiple
         * charts on the same page should have separate class names to prevent
         * duplicating events.
         *
         * Default value of versions < 7.0.4 `highcharts-bindings-wrapper`
         *
         * @since     7.0.0
         * @type      {string}
         */
        bindingsClassName: 'highcharts-bindings-container',
        /**
         * Bindings definitions for custom HTML buttons. Each binding implements
         * simple event-driven interface:
         *
         * - `className`: classname used to bind event to
         *
         * - `init`: initial event, fired on button click
         *
         * - `start`: fired on first click on a chart
         *
         * - `steps`: array of sequential events fired one after another on each
         *   of users clicks
         *
         * - `end`: last event to be called after last step event
         *
         * @type         {Highcharts.Dictionary<Highcharts.NavigationBindingsOptionsObject>|*}
         * @sample       stock/stocktools/stocktools-thresholds
         *               Custom bindings in Highstock
         * @since        7.0.0
         * @product      highcharts highstock
         */
        bindings: {
            /**
             * A circle annotation bindings. Includes `start` and one event in
             * `steps` array.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @default {"className": "highcharts-circle-annotation", "start": function() {}, "steps": [function() {}], "annotationsOptions": {}}
             */
            circleAnnotation: {
                /** @ignore-option */
                className: 'highcharts-circle-annotation',
                /** @ignore-option */
                start: function (e) {
                    var coords = this.chart.pointer.getCoordinates(e), navigation = this.chart.options.navigation;
                    return this.chart.addAnnotation(merge({
                        langKey: 'circle',
                        type: 'basicAnnotation',
                        shapes: [{
                                type: 'circle',
                                point: {
                                    xAxis: 0,
                                    yAxis: 0,
                                    x: coords.xAxis[0].value,
                                    y: coords.yAxis[0].value
                                },
                                r: 5
                            }]
                    }, navigation
                        .annotationsOptions, navigation
                        .bindings
                        .circleAnnotation
                        .annotationsOptions));
                },
                /** @ignore-option */
                steps: [
                    function (e, annotation) {
                        var point = annotation.options.shapes[0].point, x = this.chart.xAxis[0].toPixels(point.x), y = this.chart.yAxis[0].toPixels(point.y), inverted = this.chart.inverted, distance = Math.max(Math.sqrt(Math.pow(inverted ? y - e.chartX : x - e.chartX, 2) +
                            Math.pow(inverted ? x - e.chartY : y - e.chartY, 2)), 5);
                        annotation.update({
                            shapes: [{
                                    r: distance
                                }]
                        });
                    }
                ]
            },
            /**
             * A rectangle annotation bindings. Includes `start` and one event
             * in `steps` array.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @default {"className": "highcharts-rectangle-annotation", "start": function() {}, "steps": [function() {}], "annotationsOptions": {}}
             */
            rectangleAnnotation: {
                /** @ignore-option */
                className: 'highcharts-rectangle-annotation',
                /** @ignore-option */
                start: function (e) {
                    var coords = this.chart.pointer.getCoordinates(e), navigation = this.chart.options.navigation, x = coords.xAxis[0].value, y = coords.yAxis[0].value;
                    return this.chart.addAnnotation(merge({
                        langKey: 'rectangle',
                        type: 'basicAnnotation',
                        shapes: [{
                                type: 'path',
                                points: [{
                                        xAxis: 0,
                                        yAxis: 0,
                                        x: x,
                                        y: y
                                    }, {
                                        xAxis: 0,
                                        yAxis: 0,
                                        x: x,
                                        y: y
                                    }, {
                                        xAxis: 0,
                                        yAxis: 0,
                                        x: x,
                                        y: y
                                    }, {
                                        xAxis: 0,
                                        yAxis: 0,
                                        x: x,
                                        y: y
                                    }]
                            }]
                    }, navigation
                        .annotationsOptions, navigation
                        .bindings
                        .rectangleAnnotation
                        .annotationsOptions));
                },
                /** @ignore-option */
                steps: [
                    function (e, annotation) {
                        var points = annotation.options.shapes[0].points, coords = this.chart.pointer.getCoordinates(e), x = coords.xAxis[0].value, y = coords.yAxis[0].value;
                        // Top right point
                        points[1].x = x;
                        // Bottom right point (cursor position)
                        points[2].x = x;
                        points[2].y = y;
                        // Bottom left
                        points[3].y = y;
                        annotation.update({
                            shapes: [{
                                    points: points
                                }]
                        });
                    }
                ]
            },
            /**
             * A label annotation bindings. Includes `start` event only.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @default {"className": "highcharts-label-annotation", "start": function() {}, "steps": [function() {}], "annotationsOptions": {}}
             */
            labelAnnotation: {
                /** @ignore-option */
                className: 'highcharts-label-annotation',
                /** @ignore-option */
                start: function (e) {
                    var coords = this.chart.pointer.getCoordinates(e), navigation = this.chart.options.navigation;
                    return this.chart.addAnnotation(merge({
                        langKey: 'label',
                        type: 'basicAnnotation',
                        labelOptions: {
                            format: '{y:.2f}'
                        },
                        labels: [{
                                point: {
                                    xAxis: 0,
                                    yAxis: 0,
                                    x: coords.xAxis[0].value,
                                    y: coords.yAxis[0].value
                                },
                                overflow: 'none',
                                crop: true
                            }]
                    }, navigation
                        .annotationsOptions, navigation
                        .bindings
                        .labelAnnotation
                        .annotationsOptions));
                }
            }
        },
        /**
         * Path where Highcharts will look for icons. Change this to use icons
         * from a different server.
         *
         * @type      {string}
         * @default   https://code.highcharts.com/8.1.2/gfx/stock-icons/
         * @since     7.1.3
         * @apioption navigation.iconsURL
         */
        /**
         * A `showPopup` event. Fired when selecting for example an annotation.
         *
         * @type      {Function}
         * @apioption navigation.events.showPopup
         */
        /**
         * A `closePopup` event. Fired when Popup should be hidden, for example
         * when clicking on an annotation again.
         *
         * @type      {Function}
         * @apioption navigation.events.closePopup
         */
        /**
         * Event fired on a button click.
         *
         * @type      {Function}
         * @sample    highcharts/annotations/gui/
         *            Change icon in a dropddown on event
         * @sample    highcharts/annotations/gui-buttons/
         *            Change button class on event
         * @apioption navigation.events.selectButton
         */
        /**
         * Event fired when button state should change, for example after
         * adding an annotation.
         *
         * @type      {Function}
         * @sample    highcharts/annotations/gui/
         *            Change icon in a dropddown on event
         * @sample    highcharts/annotations/gui-buttons/
         *            Change button class on event
         * @apioption navigation.events.deselectButton
         */
        /**
         * Events to communicate between Stock Tools and custom GUI.
         *
         * @since        7.0.0
         * @product      highcharts highstock
         * @optionparent navigation.events
         */
        events: {},
        /**
         * Additional options to be merged into all annotations.
         *
         * @sample stock/stocktools/navigation-annotation-options
         *         Set red color of all line annotations
         *
         * @type      {Highcharts.AnnotationsOptions}
         * @extends   annotations
         * @exclude   crookedLine, elliottWave, fibonacci, infinityLine,
         *            measure, pitchfork, tunnel, verticalLine, basicAnnotation
         * @apioption navigation.annotationsOptions
         */
        annotationsOptions: {}
    }
});
export default NavigationBindings;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /**
         * Calculates the center between a list of points.
         * @private
         * @param {Array<Highcharts.PositionObject>} points
         *        A list of points to calculate the center of.
         * @return {Highcharts.PositionObject}
         *         Calculated center
         */
        var getCenterOfPoints = function getCenterOfPoints(points) {
            var sum = points.reduce(function (sum, point) {
                sum.x += point.x;
                sum.y += point.y;
                return sum;
            }, { x: 0, y: 0 });
            return {
                x: sum.x / points.length,
                y: sum.y / points.length
            };
        };
        /**
         * Calculates the distance between two points based on their x and y
         * coordinates.
         * @private
         * @param {Highcharts.PositionObject} p1
         *        The x and y coordinates of the first point.
         * @param {Highcharts.PositionObject} p2
         *        The x and y coordinates of the second point.
         * @return {number}
         *         Returns the distance between the points.
         */
        var getDistanceBetweenPoints = function getDistanceBetweenPoints(p1, p2) {
            return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
        };
        /**
         * Calculates the angle between two points.
         * @todo add unit tests.
         * @private
         * @param {Highcharts.PositionObject} p1 The first point.
         * @param {Highcharts.PositionObject} p2 The second point.
         * @return {number} Returns the angle in radians.
         */
        var getAngleBetweenPoints = function getAngleBetweenPoints(p1, p2) {
            return Math.atan2(p2.x - p1.x, p2.y - p1.y);
        };
        var geometry = {
            getAngleBetweenPoints: getAngleBetweenPoints,
            getCenterOfPoints: getCenterOfPoints,
            getDistanceBetweenPoints: getDistanceBetweenPoints
        };

        return geometry;
    });
    _registerModule(_modules, 'mixins/geometry-circles.js', [_modules['mixins/geometry.js']], function (geometry) {
        /* *
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var getAngleBetweenPoints = geometry.getAngleBetweenPoints, getCenterOfPoints = geometry.getCenterOfPoints, getDistanceBetweenPoints = geometry.getDistanceBetweenPoints;
        /**
         * @private
         * @param {number} x
         *        Number to round
         * @param {number} decimals
         *        Number of decimals to round to
         * @return {number}
         *         Rounded number
         */
        function round(x, decimals) {
            var a = Math.pow(10, decimals);
            return Math.round(x * a) / a;
        }
        /**
         * Calculates the area of a circle based on its radius.
         * @private
         * @param {number} r
         *        The radius of the circle.
         * @return {number}
         *         Returns the area of the circle.
         */
        function getAreaOfCircle(r) {
            if (r <= 0) {
                throw new Error('radius of circle must be a positive number.');
            }
            return Math.PI * r * r;
        }
        /**
         * Calculates the area of a circular segment based on the radius of the circle
         * and the height of the segment.
         * See http://mathworld.wolfram.com/CircularSegment.html
         * @private
         * @param {number} r
         *        The radius of the circle.
         * @param {number} h
         *        The height of the circular segment.
         * @return {number}
         *         Returns the area of the circular segment.
         */
        function getCircularSegmentArea(r, h) {
            return r * r * Math.acos(1 - h / r) - (r - h) * Math.sqrt(h * (2 * r - h));
        }
        /**
         * Calculates the area of overlap between two circles based on their radiuses
         * and the distance between them.
         * See http://mathworld.wolfram.com/Circle-CircleIntersection.html
         * @private
         * @param {number} r1
         *        Radius of the first circle.
         * @param {number} r2
         *        Radius of the second circle.
         * @param {number} d
         *        The distance between the two circles.
         * @return {number}
         *         Returns the area of overlap between the two circles.
         */
        function getOverlapBetweenCircles(r1, r2, d) {
            var overlap = 0;
            // If the distance is larger than the sum of the radiuses then the circles
            // does not overlap.
            if (d < r1 + r2) {
                if (d <= Math.abs(r2 - r1)) {
                    // If the circles are completely overlapping, then the overlap
                    // equals the area of the smallest circle.
                    overlap = getAreaOfCircle(r1 < r2 ? r1 : r2);
                }
                else {
                    // Height of first triangle segment.
                    var d1 = (r1 * r1 - r2 * r2 + d * d) / (2 * d), 
                    // Height of second triangle segment.
                    d2 = d - d1;
                    overlap = (getCircularSegmentArea(r1, r1 - d1) +
                        getCircularSegmentArea(r2, r2 - d2));
                }
                // Round the result to two decimals.
                overlap = round(overlap, 14);
            }
            return overlap;
        }
        /**
         * Calculates the intersection points of two circles.
         *
         * NOTE: does not handle floating errors well.
         * @private
         * @param {Highcharts.CircleObject} c1
         *        The first circle.
         * @param {Highcharts.CircleObject} c2
         *        The second sircle.
         * @return {Array<Highcharts.PositionObject>}
         *         Returns the resulting intersection points.
         */
        function getCircleCircleIntersection(c1, c2) {
            var d = getDistanceBetweenPoints(c1, c2), r1 = c1.r, r2 = c2.r;
            var points = [];
            if (d < r1 + r2 && d > Math.abs(r1 - r2)) {
                // If the circles are overlapping, but not completely overlapping, then
                // it exists intersecting points.
                var r1Square = r1 * r1, r2Square = r2 * r2, 
                // d^2 - r^2 + R^2 / 2d
                x = (r1Square - r2Square + d * d) / (2 * d), 
                // y^2 = R^2 - x^2
                y = Math.sqrt(r1Square - x * x), x1 = c1.x, x2 = c2.x, y1 = c1.y, y2 = c2.y, x0 = x1 + x * (x2 - x1) / d, y0 = y1 + x * (y2 - y1) / d, rx = -(y2 - y1) * (y / d), ry = -(x2 - x1) * (y / d);
                points = [
                    { x: round(x0 + rx, 14), y: round(y0 - ry, 14) },
                    { x: round(x0 - rx, 14), y: round(y0 + ry, 14) }
                ];
            }
            return points;
        }
        /**
         * Calculates all the intersection points for between a list of circles.
         * @private
         * @param {Array<Highcharts.CircleObject>} circles
         *        The circles to calculate the points from.
         * @return {Array<Highcharts.GeometryObject>}
         *         Returns a list of intersection points.
         */
        function getCirclesIntersectionPoints(circles) {
            return circles.reduce(function (points, c1, i, arr) {
                var additional = arr.slice(i + 1)
                    .reduce(function (points, c2, j) {
                    var indexes = [i, j + i + 1];
                    return points.concat(getCircleCircleIntersection(c1, c2)
                        .map(function (p) {
                        p.indexes = indexes;
                        return p;
                    }));
                }, []);
                return points.concat(additional);
            }, []);
        }
        /**
         * Tests wether the first circle is completely overlapping the second circle.
         *
         * @private
         * @param {Highcharts.CircleObject} circle1 The first circle.
         * @param {Highcharts.CircleObject} circle2 The The second circle.
         * @return {boolean} Returns true if circle1 is completely overlapping circle2,
         * false if not.
         */
        function isCircle1CompletelyOverlappingCircle2(circle1, circle2) {
            return getDistanceBetweenPoints(circle1, circle2) + circle2.r <
                circle1.r + 1e-10;
        }
        /**
         * Tests wether a point lies within a given circle.
         * @private
         * @param {Highcharts.PositionObject} point
         *        The point to test for.
         * @param {Highcharts.CircleObject} circle
         *        The circle to test if the point is within.
         * @return {boolean}
         *         Returns true if the point is inside, false if outside.
         */
        function isPointInsideCircle(point, circle) {
            return getDistanceBetweenPoints(point, circle) <= circle.r + 1e-10;
        }
        /**
         * Tests wether a point lies within a set of circles.
         * @private
         * @param {Highcharts.PositionObject} point
         *        The point to test.
         * @param {Array<Highcharts.CircleObject>} circles
         *        The list of circles to test against.
         * @return {boolean}
         *         Returns true if the point is inside all the circles, false if not.
         */
        function isPointInsideAllCircles(point, circles) {
            return !circles.some(function (circle) {
                return !isPointInsideCircle(point, circle);
            });
        }
        /**
         * Tests wether a point lies outside a set of circles.
         *
         * TODO: add unit tests.
         * @private
         * @param {Highcharts.PositionObject} point
         *        The point to test.
         * @param {Array<Highcharts.CircleObject>} circles
         *        The list of circles to test against.
         * @return {boolean}
         *         Returns true if the point is outside all the circles, false if not.
         */
        function isPointOutsideAllCircles(point, circles) {
            return !circles.some(function (circle) {
                return isPointInsideCircle(point, circle);
            });
        }
        /**
         * Calculates the points for the polygon of the intersection area between a set
         * of circles.
         *
         * @private
         * @param {Array<Highcharts.CircleObject>} circles
         *        List of circles to calculate polygon of.
         * @return {Array<Highcharts.GeometryObject>} Return list of points in the
         * intersection polygon.
         */
        function getCirclesIntersectionPolygon(circles) {
            return getCirclesIntersectionPoints(circles)
                .filter(function (p) {
                return isPointInsideAllCircles(p, circles);
            });
        }
        /**
         * Calculate the path for the area of overlap between a set of circles.
         * @todo handle cases with only 1 or 0 arcs.
         * @private
         * @param {Array<Highcharts.CircleObject>} circles
         *        List of circles to calculate area of.
         * @return {Highcharts.GeometryIntersectionObject|undefined}
         *         Returns the path for the area of overlap. Returns an empty string if
         *         there are no intersection between all the circles.
         */
        function getAreaOfIntersectionBetweenCircles(circles) {
            var intersectionPoints = getCirclesIntersectionPolygon(circles), result;
            if (intersectionPoints.length > 1) {
                // Calculate the center of the intersection points.
                var center_1 = getCenterOfPoints(intersectionPoints);
                intersectionPoints = intersectionPoints
                    // Calculate the angle between the center and the points.
                    .map(function (p) {
                    p.angle = getAngleBetweenPoints(center_1, p);
                    return p;
                })
                    // Sort the points by the angle to the center.
                    .sort(function (a, b) {
                    return b.angle - a.angle;
                });
                var startPoint = intersectionPoints[intersectionPoints.length - 1];
                var arcs = intersectionPoints
                    .reduce(function (data, p1) {
                    var startPoint = data.startPoint, midPoint = getCenterOfPoints([startPoint, p1]);
                    // Calculate the arc from the intersection points and their
                    // circles.
                    var arc = p1.indexes
                        // Filter out circles that are not included in both
                        // intersection points.
                        .filter(function (index) {
                        return startPoint.indexes.indexOf(index) > -1;
                    })
                        // Iterate the circles of the intersection points and
                        // calculate arcs.
                        .reduce(function (arc, index) {
                        var circle = circles[index], angle1 = getAngleBetweenPoints(circle, p1), angle2 = getAngleBetweenPoints(circle, startPoint), angleDiff = angle2 - angle1 +
                            (angle2 < angle1 ? 2 * Math.PI : 0), angle = angle2 - angleDiff / 2;
                        var width = getDistanceBetweenPoints(midPoint, {
                            x: circle.x + circle.r * Math.sin(angle),
                            y: circle.y + circle.r * Math.cos(angle)
                        });
                        var r = circle.r;
                        // Width can sometimes become to large due to floating
                        // point errors
                        if (width > r * 2) {
                            width = r * 2;
                        }
                        // Get the arc with the smallest width.
                        if (!arc || arc.width > width) {
                            arc = {
                                r: r,
                                largeArc: width > r ? 1 : 0,
                                width: width,
                                x: p1.x,
                                y: p1.y
                            };
                        }
                        // Return the chosen arc.
                        return arc;
                    }, null);
                    // If we find an arc then add it to the list and update p2.
                    if (arc) {
                        var r = arc.r;
                        data.arcs.push(['A', r, r, 0, arc.largeArc, 1, arc.x, arc.y]);
                        data.startPoint = p1;
                    }
                    return data;
                }, {
                    startPoint: startPoint,
                    arcs: []
                }).arcs;
                if (arcs.length === 0) {
                    // empty
                }
                else if (arcs.length === 1) {
                    // empty
                }
                else {
                    arcs.unshift(['M', startPoint.x, startPoint.y]);
                    result = {
                        center: center_1,
                        d: arcs
                    };
                }
            }
            return result;
        }
        var geometryCircles = {
            getAreaOfCircle: getAreaOfCircle,
            getAreaOfIntersectionBetweenCircles: getAreaOfIntersectionBetweenCircles,
            getCircleCircleIntersection: getCircleCircleIntersection,
            getCirclesIntersectionPoints: getCirclesIntersectionPoints,
            getCirclesIntersectionPolygon: getCirclesIntersectionPolygon,
            getCircularSegmentArea: getCircularSegmentArea,
            getOverlapBetweenCircles: getOverlapBetweenCircles,
            isCircle1CompletelyOverlappingCircle2: isCircle1CompletelyOverlappingCircle2,
            isPointInsideCircle: isPointInsideCircle,
            isPointInsideAllCircles: isPointInsideAllCircles,
            isPointOutsideAllCircles: isPointOutsideAllCircles,
            round: round
        };

        return geometryCircles;
    });
    _registerModule(_modules, 'mixins/nelder-mead.js', [], function () {
        /* *
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* eslint-disable valid-jsdoc */
        var getCentroid = function (simplex) {
            var arr = simplex.slice(0, -1), length = arr.length, result = [], sum = function (data, point) {
                data.sum += point[data.i];
                return data;
            };
            for (var i = 0; i < length; i++) {
                result[i] = arr.reduce(sum, { sum: 0, i: i }).sum / length;
            }
            return result;
        };
        /**
         * Finds an optimal position for a given point.
         * @todo add unit tests.
         * @todo add constraints to optimize the algorithm.
         * @private
         * @param {Highcharts.NelderMeadTestFunction} fn
         *        The function to test a point.
         * @param {Highcharts.NelderMeadPointArray} initial
         *        The initial point to optimize.
         * @return {Highcharts.NelderMeadPointArray}
         *         Returns the opimized position of a point.
         */
        var nelderMead = function nelderMead(fn, initial) {
            var maxIterations = 100, sortByFx = function (a, b) {
                return a.fx - b.fx;
            }, pRef = 1, // Reflection parameter
            pExp = 2, // Expansion parameter
            pCon = -0.5, // Contraction parameter
            pOCon = pCon * pRef, // Outwards contraction parameter
            pShrink = 0.5; // Shrink parameter
            /**
             * @private
             */
            var weightedSum = function weightedSum(weight1, v1, weight2, v2) {
                return v1.map(function (x, i) {
                    return weight1 * x + weight2 * v2[i];
                });
            };
            /**
             * @private
             */
            var getSimplex = function getSimplex(initial) {
                var n = initial.length, simplex = new Array(n + 1);
                // Initial point to the simplex.
                simplex[0] = initial;
                simplex[0].fx = fn(initial);
                // Create a set of extra points based on the initial.
                for (var i = 0; i < n; ++i) {
                    var point = initial.slice();
                    point[i] = point[i] ? point[i] * 1.05 : 0.001;
                    point.fx = fn(point);
                    simplex[i + 1] = point;
                }
                return simplex;
            };
            var updateSimplex = function (simplex, point) {
                point.fx = fn(point);
                simplex[simplex.length - 1] = point;
                return simplex;
            };
            var shrinkSimplex = function (simplex) {
                var best = simplex[0];
                return simplex.map(function (point) {
                    var p = weightedSum(1 - pShrink, best, pShrink, point);
                    p.fx = fn(p);
                    return p;
                });
            };
            var getPoint = function (centroid, worst, a, b) {
                var point = weightedSum(a, centroid, b, worst);
                point.fx = fn(point);
                return point;
            };
            // Create a simplex
            var simplex = getSimplex(initial);
            // Iterate from 0 to max iterations
            for (var i = 0; i < maxIterations; i++) {
                // Sort the simplex
                simplex.sort(sortByFx);
                // Create a centroid from the simplex
                var worst = simplex[simplex.length - 1];
                var centroid = getCentroid(simplex);
                // Calculate the reflected point.
                var reflected = getPoint(centroid, worst, 1 + pRef, -pRef);
                if (reflected.fx < simplex[0].fx) {
                    // If reflected point is the best, then possibly expand.
                    var expanded = getPoint(centroid, worst, 1 + pExp, -pExp);
                    simplex = updateSimplex(simplex, (expanded.fx < reflected.fx) ? expanded : reflected);
                }
                else if (reflected.fx >= simplex[simplex.length - 2].fx) {
                    // If the reflected point is worse than the second worse, then
                    // contract.
                    var contracted;
                    if (reflected.fx > worst.fx) {
                        // If the reflected is worse than the worst point, do a
                        // contraction
                        contracted = getPoint(centroid, worst, 1 + pCon, -pCon);
                        if (contracted.fx < worst.fx) {
                            simplex = updateSimplex(simplex, contracted);
                        }
                        else {
                            simplex = shrinkSimplex(simplex);
                        }
                    }
                    else {
                        // Otherwise do an outwards contraction
                        contracted = getPoint(centroid, worst, 1 - pOCon, pOCon);
                        if (contracted.fx < reflected.fx) {
                            simplex = updateSimplex(simplex, contracted);
                        }
                        else {
                            simplex = shrinkSimplex(simplex);
                        }
                    }
                }
                else {
                    simplex = updateSimplex(simplex, reflected);
                }
            }
            return simplex[0];
        };
        var content = {
            getCentroid: getCentroid,
            nelderMead: nelderMead
        };

        return content;
    });
    _registerModule(_modules, 'modules/venn.src.js', [_modules['parts/Color.js'], _modules['parts/Globals.js'], _modules['parts/Utilities.js'], _modules['mixins/draw-point.js'], _modules['mixins/geometry.js'], _modules['mixins/geometry-circles.js'], _modules['mixins/nelder-mead.js']], function (Color, H, U, draw, geometry, geometryCirclesModule, nelderMeadModule) {
        /* *
         *
         *  Experimental Highcharts module which enables visualization of a Venn
         *  diagram.
         *
         *  (c) 2016-2020 Highsoft AS
         *  Authors: Jon Arild Nygard
         *
         *  Layout algorithm by Ben Frederickson:
         *  https://www.benfrederickson.com/better-venn-diagrams/
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var color = Color.parse;
        var addEvent = U.addEvent, animObject = U.animObject, extend = U.extend, isArray = U.isArray, isNumber = U.isNumber, isObject = U.isObject, isString = U.isString, merge = U.merge, seriesType = U.seriesType;
        var getAreaOfCircle = geometryCirclesModule.getAreaOfCircle, getAreaOfIntersectionBetweenCircles = geometryCirclesModule.getAreaOfIntersectionBetweenCircles, getCircleCircleIntersection = geometryCirclesModule.getCircleCircleIntersection, getCirclesIntersectionPolygon = geometryCirclesModule.getCirclesIntersectionPolygon, getOverlapBetweenCirclesByDistance = geometryCirclesModule.getOverlapBetweenCircles, isCircle1CompletelyOverlappingCircle2 = geometryCirclesModule.isCircle1CompletelyOverlappingCircle2, isPointInsideAllCircles = geometryCirclesModule.isPointInsideAllCircles, isPointInsideCircle = geometryCirclesModule.isPointInsideCircle, isPointOutsideAllCircles = geometryCirclesModule.isPointOutsideAllCircles;
        // TODO: replace with individual imports
        var nelderMead = nelderMeadModule.nelderMead;
        var getCenterOfPoints = geometry.getCenterOfPoints, getDistanceBetweenPoints = geometry.getDistanceBetweenPoints, seriesTypes = H.seriesTypes;
        var objectValues = function objectValues(obj) {
            return Object.keys(obj).map(function (x) {
                return obj[x];
            });
        };
        /**
         * Calculates the area of overlap between a list of circles.
         * @private
         * @todo add support for calculating overlap between more than 2 circles.
         * @param {Array<Highcharts.CircleObject>} circles
         * List of circles with their given positions.
         * @return {number}
         * Returns the area of overlap between all the circles.
         */
        var getOverlapBetweenCircles = function getOverlapBetweenCircles(circles) {
            var overlap = 0;
            // When there is only two circles we can find the overlap by using their
            // radiuses and the distance between them.
            if (circles.length === 2) {
                var circle1 = circles[0];
                var circle2 = circles[1];
                overlap = getOverlapBetweenCirclesByDistance(circle1.r, circle2.r, getDistanceBetweenPoints(circle1, circle2));
            }
            return overlap;
        };
        /**
         * Calculates the difference between the desired overlap and the actual overlap
         * between two circles.
         * @private
         * @param {Dictionary<Highcharts.CircleObject>} mapOfIdToCircle
         * Map from id to circle.
         * @param {Array<Highcharts.VennRelationObject>} relations
         * List of relations to calculate the loss of.
         * @return {number}
         * Returns the loss between positions of the circles for the given relations.
         */
        var loss = function loss(mapOfIdToCircle, relations) {
            var precision = 10e10;
            // Iterate all the relations and calculate their individual loss.
            return relations.reduce(function (totalLoss, relation) {
                var loss = 0;
                if (relation.sets.length > 1) {
                    var wantedOverlap = relation.value;
                    // Calculate the actual overlap between the sets.
                    var actualOverlap = getOverlapBetweenCircles(
                    // Get the circles for the given sets.
                    relation.sets.map(function (set) {
                        return mapOfIdToCircle[set];
                    }));
                    var diff = wantedOverlap - actualOverlap;
                    loss = Math.round((diff * diff) * precision) / precision;
                }
                // Add calculated loss to the sum.
                return totalLoss + loss;
            }, 0);
        };
        /**
         * Finds the root of a given function. The root is the input value needed for
         * a function to return 0.
         *
         * See https://en.wikipedia.org/wiki/Bisection_method#Algorithm
         *
         * TODO: Add unit tests.
         *
         * @param {Function} f
         * The function to find the root of.
         * @param {number} a
         * The lowest number in the search range.
         * @param {number} b
         * The highest number in the search range.
         * @param {number} [tolerance=1e-10]
         * The allowed difference between the returned value and root.
         * @param {number} [maxIterations=100]
         * The maximum iterations allowed.
         * @return {number}
         * Root number.
         */
        var bisect = function bisect(f, a, b, tolerance, maxIterations) {
            var fA = f(a), fB = f(b), nMax = maxIterations || 100, tol = tolerance || 1e-10, delta = b - a, n = 1, x, fX;
            if (a >= b) {
                throw new Error('a must be smaller than b.');
            }
            else if (fA * fB > 0) {
                throw new Error('f(a) and f(b) must have opposite signs.');
            }
            if (fA === 0) {
                x = a;
            }
            else if (fB === 0) {
                x = b;
            }
            else {
                while (n++ <= nMax && fX !== 0 && delta > tol) {
                    delta = (b - a) / 2;
                    x = a + delta;
                    fX = f(x);
                    // Update low and high for next search interval.
                    if (fA * fX > 0) {
                        a = x;
                    }
                    else {
                        b = x;
                    }
                }
            }
            return x;
        };
        /**
         * Uses the bisection method to make a best guess of the ideal distance between
         * two circles too get the desired overlap.
         * Currently there is no known formula to calculate the distance from the area
         * of overlap, which makes the bisection method preferred.
         * @private
         * @param {number} r1
         * Radius of the first circle.
         * @param {number} r2
         * Radiues of the second circle.
         * @param {number} overlap
         * The wanted overlap between the two circles.
         * @return {number}
         * Returns the distance needed to get the wanted overlap between the two
         * circles.
         */
        var getDistanceBetweenCirclesByOverlap = function getDistanceBetweenCirclesByOverlap(r1, r2, overlap) {
            var maxDistance = r1 + r2, distance;
            if (overlap <= 0) {
                // If overlap is below or equal to zero, then there is no overlap.
                distance = maxDistance;
            }
            else if (getAreaOfCircle(r1 < r2 ? r1 : r2) <= overlap) {
                // When area of overlap is larger than the area of the smallest circle,
                // then it is completely overlapping.
                distance = 0;
            }
            else {
                distance = bisect(function (x) {
                    var actualOverlap = getOverlapBetweenCirclesByDistance(r1, r2, x);
                    // Return the differance between wanted and actual overlap.
                    return overlap - actualOverlap;
                }, 0, maxDistance);
            }
            return distance;
        };
        var isSet = function (x) {
            return isArray(x.sets) && x.sets.length === 1;
        };
        /**
         * Calculates a margin for a point based on the iternal and external circles.
         * The margin describes if the point is well placed within the internal circles,
         * and away from the external
         * @private
         * @todo add unit tests.
         * @param {Highcharts.PositionObject} point
         * The point to evaluate.
         * @param {Array<Highcharts.CircleObject>} internal
         * The internal circles.
         * @param {Array<Highcharts.CircleObject>} external
         * The external circles.
         * @return {number}
         * Returns the margin.
         */
        var getMarginFromCircles = function getMarginFromCircles(point, internal, external) {
            var margin = internal.reduce(function (margin, circle) {
                var m = circle.r - getDistanceBetweenPoints(point, circle);
                return (m <= margin) ? m : margin;
            }, Number.MAX_VALUE);
            margin = external.reduce(function (margin, circle) {
                var m = getDistanceBetweenPoints(point, circle) - circle.r;
                return (m <= margin) ? m : margin;
            }, margin);
            return margin;
        };
        /**
         * Finds the optimal label position by looking for a position that has a low
         * distance from the internal circles, and as large possible distane to the
         * external circles.
         * @private
         * @todo Optimize the intial position.
         * @todo Add unit tests.
         * @param {Array<Highcharts.CircleObject>} internal
         * Internal circles.
         * @param {Array<Highcharts.CircleObject>} external
         * External circles.
         * @return {Highcharts.PositionObject}
         * Returns the found position.
         */
        var getLabelPosition = function getLabelPosition(internal, external) {
            // Get the best label position within the internal circles.
            var best = internal.reduce(function (best, circle) {
                var d = circle.r / 2;
                // Give a set of points with the circle to evaluate as the best label
                // position.
                return [
                    { x: circle.x, y: circle.y },
                    { x: circle.x + d, y: circle.y },
                    { x: circle.x - d, y: circle.y },
                    { x: circle.x, y: circle.y + d },
                    { x: circle.x, y: circle.y - d }
                ]
                    // Iterate the given points and return the one with the largest
                    // margin.
                    .reduce(function (best, point) {
                    var margin = getMarginFromCircles(point, internal, external);
                    // If the margin better than the current best, then update best.
                    if (best.margin < margin) {
                        best.point = point;
                        best.margin = margin;
                    }
                    return best;
                }, best);
            }, {
                point: void 0,
                margin: -Number.MAX_VALUE
            }).point;
            // Use nelder mead to optimize the initial label position.
            var optimal = nelderMead(function (p) {
                return -(getMarginFromCircles({ x: p[0], y: p[1] }, internal, external));
            }, [best.x, best.y]);
            // Update best to be the point which was found to have the best margin.
            best = {
                x: optimal[0],
                y: optimal[1]
            };
            if (!(isPointInsideAllCircles(best, internal) &&
                isPointOutsideAllCircles(best, external))) {
                // If point was either outside one of the internal, or inside one of the
                // external, then it was invalid and should use a fallback.
                if (internal.length > 1) {
                    best = getCenterOfPoints(getCirclesIntersectionPolygon(internal));
                }
                else {
                    best = {
                        x: internal[0].x,
                        y: internal[0].y
                    };
                }
            }
            // Return the best point.
            return best;
        };
        /**
         * Finds the available width for a label, by taking the label position and
         * finding the largest distance, which is inside all internal circles, and
         * outside all external circles.
         *
         * @private
         * @param {Highcharts.PositionObject} pos
         * The x and y coordinate of the label.
         * @param {Array<Highcharts.CircleObject>} internal
         * Internal circles.
         * @param {Array<Highcharts.CircleObject>} external
         * External circles.
         * @return {number}
         * Returns available width for the label.
         */
        var getLabelWidth = function getLabelWidth(pos, internal, external) {
            var radius = internal.reduce(function (min, circle) {
                return Math.min(circle.r, min);
            }, Infinity), 
            // Filter out external circles that are completely overlapping.
            filteredExternals = external.filter(function (circle) {
                return !isPointInsideCircle(pos, circle);
            });
            var findDistance = function (maxDistance, direction) {
                return bisect(function (x) {
                    var testPos = {
                        x: pos.x + (direction * x),
                        y: pos.y
                    }, isValid = (isPointInsideAllCircles(testPos, internal) &&
                        isPointOutsideAllCircles(testPos, filteredExternals));
                    // If the position is valid, then we want to move towards the max
                    // distance. If not, then we want to  away from the max distance.
                    return -(maxDistance - x) + (isValid ? 0 : Number.MAX_VALUE);
                }, 0, maxDistance);
            };
            // Find the smallest distance of left and right.
            return Math.min(findDistance(radius, -1), findDistance(radius, 1)) * 2;
        };
        /**
         * Calulates data label values for a given relations object.
         *
         * @private
         * @todo add unit tests
         * @param {Highcharts.VennRelationObject} relation A relations object.
         * @param {Array<Highcharts.VennRelationObject>} setRelations The list of
         * relations that is a set.
         * @return {Highcharts.VennLabelValuesObject}
         * Returns an object containing position and width of the label.
         */
        function getLabelValues(relation, setRelations) {
            var sets = relation.sets;
            // Create a list of internal and external circles.
            var data = setRelations.reduce(function (data, set) {
                // If the set exists in this relation, then it is internal,
                // otherwise it will be external.
                var isInternal = sets.indexOf(set.sets[0]) > -1;
                var property = isInternal ? 'internal' : 'external';
                // Add the circle to the list.
                data[property].push(set.circle);
                return data;
            }, {
                internal: [],
                external: []
            });
            // Filter out external circles that are completely overlapping all internal
            data.external = data.external.filter(function (externalCircle) {
                return data.internal.some(function (internalCircle) {
                    return !isCircle1CompletelyOverlappingCircle2(externalCircle, internalCircle);
                });
            });
            // Calulate the label position.
            var position = getLabelPosition(data.internal, data.external);
            // Calculate the label width
            var width = getLabelWidth(position, data.internal, data.external);
            return {
                position: position,
                width: width
            };
        }
        /**
         * Takes an array of relations and adds the properties `totalOverlap` and
         * `overlapping` to each set. The property `totalOverlap` is the sum of value
         * for each relation where this set is included. The property `overlapping` is
         * a map of how much this set is overlapping another set.
         * NOTE: This algorithm ignores relations consisting of more than 2 sets.
         * @private
         * @param {Array<Highcharts.VennRelationObject>} relations
         * The list of relations that should be sorted.
         * @return {Array<Highcharts.VennRelationObject>}
         * Returns the modified input relations with added properties `totalOverlap` and
         * `overlapping`.
         */
        var addOverlapToSets = function addOverlapToSets(relations) {
            // Calculate the amount of overlap per set.
            var mapOfIdToProps = relations
                // Filter out relations consisting of 2 sets.
                .filter(function (relation) {
                return relation.sets.length === 2;
            })
                // Sum up the amount of overlap for each set.
                .reduce(function (map, relation) {
                var sets = relation.sets;
                sets.forEach(function (set, i, arr) {
                    if (!isObject(map[set])) {
                        map[set] = {
                            overlapping: {},
                            totalOverlap: 0
                        };
                    }
                    map[set].totalOverlap += relation.value;
                    map[set].overlapping[arr[1 - i]] = relation.value;
                });
                return map;
            }, {});
            relations
                // Filter out single sets
                .filter(isSet)
                // Extend the set with the calculated properties.
                .forEach(function (set) {
                var properties = mapOfIdToProps[set.sets[0]];
                extend(set, properties);
            });
            // Returns the modified relations.
            return relations;
        };
        /**
         * Takes two sets and finds the one with the largest total overlap.
         * @private
         * @param {object} a The first set to compare.
         * @param {object} b The second set to compare.
         * @return {number} Returns 0 if a and b are equal, <0 if a is greater, >0 if b
         * is greater.
         */
        var sortByTotalOverlap = function sortByTotalOverlap(a, b) {
            return b.totalOverlap - a.totalOverlap;
        };
        /**
         * Uses a greedy approach to position all the sets. Works well with a small
         * number of sets, and are in these cases a good choice aesthetically.
         * @private
         * @param {Array<object>} relations List of the overlap between two or more
         * sets, or the size of a single set.
         * @return {Array<object>} List of circles and their calculated positions.
         */
        var layoutGreedyVenn = function layoutGreedyVenn(relations) {
            var positionedSets = [], mapOfIdToCircles = {};
            // Define a circle for each set.
            relations
                .filter(function (relation) {
                return relation.sets.length === 1;
            }).forEach(function (relation) {
                mapOfIdToCircles[relation.sets[0]] = relation.circle = {
                    x: Number.MAX_VALUE,
                    y: Number.MAX_VALUE,
                    r: Math.sqrt(relation.value / Math.PI)
                };
            });
            /**
             * Takes a set and updates the position, and add the set to the list of
             * positioned sets.
             * @private
             * @param {object} set
             * The set to add to its final position.
             * @param {object} coordinates
             * The coordinates to position the set at.
             * @return {void}
             */
            var positionSet = function positionSet(set, coordinates) {
                var circle = set.circle;
                circle.x = coordinates.x;
                circle.y = coordinates.y;
                positionedSets.push(set);
            };
            // Find overlap between sets. Ignore relations with more then 2 sets.
            addOverlapToSets(relations);
            // Sort sets by the sum of their size from large to small.
            var sortedByOverlap = relations
                .filter(isSet)
                .sort(sortByTotalOverlap);
            // Position the most overlapped set at 0,0.
            positionSet(sortedByOverlap.shift(), { x: 0, y: 0 });
            var relationsWithTwoSets = relations.filter(function (x) {
                return x.sets.length === 2;
            });
            // Iterate and position the remaining sets.
            sortedByOverlap.forEach(function (set) {
                var circle = set.circle, radius = circle.r, overlapping = set.overlapping;
                var bestPosition = positionedSets
                    .reduce(function (best, positionedSet, i) {
                    var positionedCircle = positionedSet.circle, overlap = overlapping[positionedSet.sets[0]];
                    // Calculate the distance between the sets to get the correct
                    // overlap
                    var distance = getDistanceBetweenCirclesByOverlap(radius, positionedCircle.r, overlap);
                    // Create a list of possible coordinates calculated from
                    // distance.
                    var possibleCoordinates = [
                        { x: positionedCircle.x + distance, y: positionedCircle.y },
                        { x: positionedCircle.x - distance, y: positionedCircle.y },
                        { x: positionedCircle.x, y: positionedCircle.y + distance },
                        { x: positionedCircle.x, y: positionedCircle.y - distance }
                    ];
                    // If there are more circles overlapping, then add the
                    // intersection points as possible positions.
                    positionedSets.slice(i + 1).forEach(function (positionedSet2) {
                        var positionedCircle2 = positionedSet2.circle, overlap2 = overlapping[positionedSet2.sets[0]], distance2 = getDistanceBetweenCirclesByOverlap(radius, positionedCircle2.r, overlap2);
                        // Add intersections to list of coordinates.
                        possibleCoordinates = possibleCoordinates.concat(getCircleCircleIntersection({
                            x: positionedCircle.x,
                            y: positionedCircle.y,
                            r: distance
                        }, {
                            x: positionedCircle2.x,
                            y: positionedCircle2.y,
                            r: distance2
                        }));
                    });
                    // Iterate all suggested coordinates and find the best one.
                    possibleCoordinates.forEach(function (coordinates) {
                        circle.x = coordinates.x;
                        circle.y = coordinates.y;
                        // Calculate loss for the suggested coordinates.
                        var currentLoss = loss(mapOfIdToCircles, relationsWithTwoSets);
                        // If the loss is better, then use these new coordinates.
                        if (currentLoss < best.loss) {
                            best.loss = currentLoss;
                            best.coordinates = coordinates;
                        }
                    });
                    // Return resulting coordinates.
                    return best;
                }, {
                    loss: Number.MAX_VALUE,
                    coordinates: void 0
                });
                // Add the set to its final position.
                positionSet(set, bestPosition.coordinates);
            });
            // Return the positions of each set.
            return mapOfIdToCircles;
        };
        /**
         * Calculates the positions, and the label values of all the sets in the venn
         * diagram.
         *
         * @private
         * @todo Add support for constrained MDS.
         * @param {Array<Highchats.VennRelationObject>} relations
         * List of the overlap between two or more sets, or the size of a single set.
         * @return {Highcharts.Dictionary<*>}
         * List of circles and their calculated positions.
         */
        function layout(relations) {
            var mapOfIdToShape = {};
            var mapOfIdToLabelValues = {};
            // Calculate best initial positions by using greedy layout.
            if (relations.length > 0) {
                var mapOfIdToCircles_1 = layoutGreedyVenn(relations);
                var setRelations_1 = relations.filter(isSet);
                relations
                    .forEach(function (relation) {
                    var sets = relation.sets;
                    var id = sets.join();
                    // Get shape from map of circles, or calculate intersection.
                    var shape = isSet(relation) ?
                        mapOfIdToCircles_1[id] :
                        getAreaOfIntersectionBetweenCircles(sets.map(function (set) {
                            return mapOfIdToCircles_1[set];
                        }));
                    // Calculate label values if the set has a shape
                    if (shape) {
                        mapOfIdToShape[id] = shape;
                        mapOfIdToLabelValues[id] = getLabelValues(relation, setRelations_1);
                    }
                });
            }
            return { mapOfIdToShape: mapOfIdToShape, mapOfIdToLabelValues: mapOfIdToLabelValues };
        }
        var isValidRelation = function (x) {
            var map = {};
            return (isObject(x) &&
                (isNumber(x.value) && x.value > -1) &&
                (isArray(x.sets) && x.sets.length > 0) &&
                !x.sets.some(function (set) {
                    var invalid = false;
                    if (!map[set] && isString(set)) {
                        map[set] = true;
                    }
                    else {
                        invalid = true;
                    }
                    return invalid;
                }));
        };
        var isValidSet = function (x) {
            return (isValidRelation(x) && isSet(x) && x.value > 0);
        };
        /**
         * Prepares the venn data so that it is usable for the layout function. Filter
         * out sets, or intersections that includes sets, that are missing in the data
         * or has (value < 1). Adds missing relations between sets in the data as
         * value = 0.
         * @private
         * @param {Array<object>} data The raw input data.
         * @return {Array<object>} Returns an array of valid venn data.
         */
        var processVennData = function processVennData(data) {
            var d = isArray(data) ? data : [];
            var validSets = d
                .reduce(function (arr, x) {
                // Check if x is a valid set, and that it is not an duplicate.
                if (isValidSet(x) && arr.indexOf(x.sets[0]) === -1) {
                    arr.push(x.sets[0]);
                }
                return arr;
            }, [])
                .sort();
            var mapOfIdToRelation = d.reduce(function (mapOfIdToRelation, relation) {
                if (isValidRelation(relation) &&
                    !relation.sets.some(function (set) {
                        return validSets.indexOf(set) === -1;
                    })) {
                    mapOfIdToRelation[relation.sets.sort().join()] =
                        relation;
                }
                return mapOfIdToRelation;
            }, {});
            validSets.reduce(function (combinations, set, i, arr) {
                var remaining = arr.slice(i + 1);
                remaining.forEach(function (set2) {
                    combinations.push(set + ',' + set2);
                });
                return combinations;
            }, []).forEach(function (combination) {
                if (!mapOfIdToRelation[combination]) {
                    var obj = {
                        sets: combination.split(','),
                        value: 0
                    };
                    mapOfIdToRelation[combination] = obj;
                }
            });
            // Transform map into array.
            return objectValues(mapOfIdToRelation);
        };
        /**
         * Calculates the proper scale to fit the cloud inside the plotting area.
         * @private
         * @todo add unit test
         * @param {number} targetWidth
         * Width of target area.
         * @param {number} targetHeight
         * Height of target area.
         * @param {Highcharts.PolygonBoxObject} field
         * The playing field.
         * @return {Highcharts.Dictionary<number>}
         * Returns the value to scale the playing field up to the size of the target
         * area, and center of x and y.
         */
        var getScale = function getScale(targetWidth, targetHeight, field) {
            var height = field.bottom - field.top, // top is smaller than bottom
            width = field.right - field.left, scaleX = width > 0 ? 1 / width * targetWidth : 1, scaleY = height > 0 ? 1 / height * targetHeight : 1, adjustX = (field.right + field.left) / 2, adjustY = (field.top + field.bottom) / 2, scale = Math.min(scaleX, scaleY);
            return {
                scale: scale,
                centerX: targetWidth / 2 - adjustX * scale,
                centerY: targetHeight / 2 - adjustY * scale
            };
        };
        /**
         * If a circle is outside a give field, then the boundaries of the field is
         * adjusted accordingly. Modifies the field object which is passed as the first
         * parameter.
         * @private
         * @todo NOTE: Copied from wordcloud, can probably be unified.
         * @param {Highcharts.PolygonBoxObject} field
         * The bounding box of a playing field.
         * @param {Highcharts.CircleObject} circle
         * The bounding box for a placed point.
         * @return {Highcharts.PolygonBoxObject}
         * Returns a modified field object.
         */
        var updateFieldBoundaries = function updateFieldBoundaries(field, circle) {
            var left = circle.x - circle.r, right = circle.x + circle.r, bottom = circle.y + circle.r, top = circle.y - circle.r;
            // TODO improve type checking.
            if (!isNumber(field.left) || field.left > left) {
                field.left = left;
            }
            if (!isNumber(field.right) || field.right < right) {
                field.right = right;
            }
            if (!isNumber(field.top) || field.top > top) {
                field.top = top;
            }
            if (!isNumber(field.bottom) || field.bottom < bottom) {
                field.bottom = bottom;
            }
            return field;
        };
        /**
         * A Venn diagram displays all possible logical relations between a collection
         * of different sets. The sets are represented by circles, and the relation
         * between the sets are displayed by the overlap or lack of overlap between
         * them. The venn diagram is a special case of Euler diagrams, which can also
         * be displayed by this series type.
         *
         * @sample {highcharts} highcharts/demo/venn-diagram/
         *         Venn diagram
         * @sample {highcharts} highcharts/demo/euler-diagram/
         *         Euler diagram
         *
         * @extends      plotOptions.scatter
         * @excluding    connectEnds, connectNulls, cropThreshold, dragDrop,
         *               findNearestPointBy, getExtremesFromAll, jitter, label, linecap,
         *               lineWidth, linkedTo, marker, negativeColor, pointInterval,
         *               pointIntervalUnit, pointPlacement, pointStart, softThreshold,
         *               stacking, steps, threshold, xAxis, yAxis, zoneAxis, zones,
         *               dataSorting
         * @product      highcharts
         * @requires     modules/venn
         * @optionparent plotOptions.venn
         */
        var vennOptions = {
            borderColor: '#cccccc',
            borderDashStyle: 'solid',
            borderWidth: 1,
            brighten: 0,
            clip: false,
            colorByPoint: true,
            dataLabels: {
                enabled: true,
                verticalAlign: 'middle',
                formatter: function () {
                    return this.point.name;
                }
            },
            /**
             * @ignore-option
             * @private
             */
            inactiveOtherPoints: true,
            marker: false,
            opacity: 0.75,
            showInLegend: false,
            states: {
                /**
                 * @excluding halo
                 */
                hover: {
                    opacity: 1,
                    borderColor: '#333333'
                },
                /**
                 * @excluding halo
                 */
                select: {
                    color: '#cccccc',
                    borderColor: '#000000',
                    animation: false
                },
                inactive: {
                    opacity: 0.075
                }
            },
            tooltip: {
                pointFormat: '{point.name}: {point.value}'
            }
        };
        var vennSeries = {
            isCartesian: false,
            axisTypes: [],
            directTouch: true,
            pointArrayMap: ['value'],
            init: function () {
                seriesTypes.scatter.prototype.init.apply(this, arguments);
                // Venn's opacity is a different option from other series
                delete this.opacity;
            },
            translate: function () {
                var chart = this.chart;
                this.processedXData = this.xData;
                this.generatePoints();
                // Process the data before passing it into the layout function.
                var relations = processVennData(this.options.data);
                // Calculate the positions of each circle.
                var _a = layout(relations), mapOfIdToShape = _a.mapOfIdToShape, mapOfIdToLabelValues = _a.mapOfIdToLabelValues;
                // Calculate the scale, and center of the plot area.
                var field = Object.keys(mapOfIdToShape)
                    .filter(function (key) {
                    var shape = mapOfIdToShape[key];
                    return shape && isNumber(shape.r);
                })
                    .reduce(function (field, key) {
                    return updateFieldBoundaries(field, mapOfIdToShape[key]);
                }, { top: 0, bottom: 0, left: 0, right: 0 }), scaling = getScale(chart.plotWidth, chart.plotHeight, field), scale = scaling.scale, centerX = scaling.centerX, centerY = scaling.centerY;
                // Iterate all points and calculate and draw their graphics.
                this.points.forEach(function (point) {
                    var sets = isArray(point.sets) ? point.sets : [], id = sets.join(), shape = mapOfIdToShape[id], shapeArgs, dataLabelValues = mapOfIdToLabelValues[id] || {}, dataLabelWidth = dataLabelValues.width, dataLabelPosition = dataLabelValues.position, dlOptions = point.options && point.options.dataLabels;
                    if (shape) {
                        if (shape.r) {
                            shapeArgs = {
                                x: centerX + shape.x * scale,
                                y: centerY + shape.y * scale,
                                r: shape.r * scale
                            };
                        }
                        else if (shape.d) {
                            var d = shape.d;
                            d.forEach(function (seg) {
                                if (seg[0] === 'M') {
                                    seg[1] = centerX + seg[1] * scale;
                                    seg[2] = centerY + seg[2] * scale;
                                }
                                else if (seg[0] === 'A') {
                                    seg[1] = seg[1] * scale;
                                    seg[2] = seg[2] * scale;
                                    seg[6] = centerX + seg[6] * scale;
                                    seg[7] = centerY + seg[7] * scale;
                                }
                            });
                            shapeArgs = { d: d };
                        }
                        // Scale the position for the data label.
                        if (dataLabelPosition) {
                            dataLabelPosition.x = centerX + dataLabelPosition.x * scale;
                            dataLabelPosition.y = centerY + dataLabelPosition.y * scale;
                        }
                        else {
                            dataLabelPosition = {};
                        }
                        if (isNumber(dataLabelWidth)) {
                            dataLabelWidth = Math.round(dataLabelWidth * scale);
                        }
                    }
                    point.shapeArgs = shapeArgs;
                    // Placement for the data labels
                    if (dataLabelPosition && shapeArgs) {
                        point.plotX = dataLabelPosition.x;
                        point.plotY = dataLabelPosition.y;
                    }
                    // Add width for the data label
                    if (dataLabelWidth && shapeArgs) {
                        point.dlOptions = merge(true, {
                            style: {
                                width: dataLabelWidth
                            }
                        }, isObject(dlOptions) && dlOptions);
                    }
                    // Set name for usage in tooltip and in data label.
                    point.name = point.options.name || sets.join('âˆ©');
                });
            },
            /* eslint-disable valid-jsdoc */
            /**
             * Draw the graphics for each point.
             * @private
             */
            drawPoints: function () {
                var series = this, 
                // Series properties
                chart = series.chart, group = series.group, points = series.points || [], 
                // Chart properties
                renderer = chart.renderer;
                // Iterate all points and calculate and draw their graphics.
                points.forEach(function (point) {
                    var attribs = {
                        zIndex: isArray(point.sets) ? point.sets.length : 0
                    }, shapeArgs = point.shapeArgs;
                    // Add point attribs
                    if (!chart.styledMode) {
                        extend(attribs, series.pointAttribs(point, point.state));
                    }
                    // Draw the point graphic.
                    point.draw({
                        isNew: !point.graphic,
                        animatableAttribs: shapeArgs,
                        attribs: attribs,
                        group: group,
                        renderer: renderer,
                        shapeType: shapeArgs && shapeArgs.d ? 'path' : 'circle'
                    });
                });
            },
            /**
             * Calculates the style attributes for a point. The attributes can vary
             * depending on the state of the point.
             * @private
             * @param {Highcharts.Point} point
             * The point which will get the resulting attributes.
             * @param {string} [state]
             * The state of the point.
             * @return {Highcharts.SVGAttributes}
             * Returns the calculated attributes.
             */
            pointAttribs: function (point, state) {
                var series = this, seriesOptions = series.options || {}, pointOptions = point && point.options || {}, stateOptions = (state && seriesOptions.states[state]) || {}, options = merge(seriesOptions, { color: point && point.color }, pointOptions, stateOptions);
                // Return resulting values for the attributes.
                return {
                    'fill': color(options.color)
                        .setOpacity(options.opacity)
                        .brighten(options.brightness)
                        .get(),
                    'stroke': options.borderColor,
                    'stroke-width': options.borderWidth,
                    'dashstyle': options.borderDashStyle
                };
            },
            /* eslint-enable valid-jsdoc */
            animate: function (init) {
                if (!init) {
                    var series = this, animOptions = animObject(series.options.animation);
                    series.points.forEach(function (point) {
                        var args = point.shapeArgs;
                        if (point.graphic && args) {
                            var attr = {}, animate = {};
                            if (args.d) {
                                // If shape is a path, then animate opacity.
                                attr.opacity = 0.001;
                            }
                            else {
                                // If shape is a circle, then animate radius.
                                attr.r = 0;
                                animate.r = args.r;
                            }
                            point.graphic
                                .attr(attr)
                                .animate(animate, animOptions);
                            // If shape is path, then fade it in after the circles
                            // animation
                            if (args.d) {
                                setTimeout(function () {
                                    if (point && point.graphic) {
                                        point.graphic.animate({
                                            opacity: 1
                                        });
                                    }
                                }, animOptions.duration);
                            }
                        }
                    }, series);
                }
            },
            utils: {
                addOverlapToSets: addOverlapToSets,
                geometry: geometry,
                geometryCircles: geometryCirclesModule,
                getLabelWidth: getLabelWidth,
                getMarginFromCircles: getMarginFromCircles,
                getDistanceBetweenCirclesByOverlap: getDistanceBetweenCirclesByOverlap,
                layoutGreedyVenn: layoutGreedyVenn,
                loss: loss,
                nelderMead: nelderMeadModule,
                processVennData: processVennData,
                sortByTotalOverlap: sortByTotalOverlap
            }
        };
        var vennPoint = {
            draw: draw,
            shouldDraw: function () {
                var point = this;
                // Only draw points with single sets.
                return !!point.shapeArgs;
            },
            isValid: function () {
                return isNumber(this.value);
            }
        };
        /**
         * A `venn` series. If the [type](#series.venn.type) option is
         * not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.venn
         * @excluding connectEnds, connectNulls, cropThreshold, dataParser, dataURL,
         *            findNearestPointBy, getExtremesFromAll, label, linecap, lineWidth,
         *            linkedTo, marker, negativeColor, pointInterval, pointIntervalUnit,
         *            pointPlacement, pointStart, softThreshold, stack, stacking, steps,
         *            threshold, xAxis, yAxis, zoneAxis, zones, dataSorting
         * @product   highcharts
         * @requires  modules/venn
         * @apioption series.venn
         */
        /**
         * @type      {Array<*>}
         * @extends   series.scatter.data
         * @excluding marker, x, y
         * @product   highcharts
         * @apioption series.venn.data
         */
        /**
         * The name of the point. Used in data labels and tooltip. If name is not
         * defined then it will default to the joined values in
         * [sets](#series.venn.sets).
         *
         * @sample {highcharts} highcharts/demo/venn-diagram/
         *         Venn diagram
         * @sample {highcharts} highcharts/demo/euler-diagram/
         *         Euler diagram
         *
         * @type      {number}
         * @since     7.0.0
         * @product   highcharts
         * @apioption series.venn.data.name
         */
        /**
         * The value of the point, resulting in a relative area of the circle, or area
         * of overlap between two sets in the venn or euler diagram.
         *
         * @sample {highcharts} highcharts/demo/venn-diagram/
         *         Venn diagram
         * @sample {highcharts} highcharts/demo/euler-diagram/
         *         Euler diagram
         *
         * @type      {number}
         * @since     7.0.0
         * @product   highcharts
         * @apioption series.venn.data.value
         */
        /**
         * The set or sets the options will be applied to. If a single entry is defined,
         * then it will create a new set. If more than one entry is defined, then it
         * will define the overlap between the sets in the array.
         *
         * @sample {highcharts} highcharts/demo/venn-diagram/
         *         Venn diagram
         * @sample {highcharts} highcharts/demo/euler-diagram/
         *         Euler diagram
         *
         * @type      {Array<string>}
         * @since     7.0.0
         * @product   highcharts
         * @apioption series.venn.data.sets
         */
        /**
         * @excluding halo
         * @apioption series.venn.states.hover
         */
        /**
         * @excluding halo
         * @apioption series.venn.states.select
         */
        /**
         * @private
         * @class
         * @name Highcharts.seriesTypes.venn
         *
         * @augments Highcharts.Series
         */
        seriesType('venn', 'scatter', vennOptions, vennSeries, vennPoint);
        /* eslint-disable no-invalid-this */
        // Modify final series options.
        addEvent(seriesTypes.venn, 'afterSetOptions', function (e) {
            var options = e.options, states = options.states;
            if (this.is('venn')) {
                // Explicitly disable all halo options.
                Object.keys(states).forEach(function (state) {
                    states[state].halo = false;
                });
            }
        });

    });
    _registerModule(_modules, 'masters/modules/venn.src.js', [], function () {


    });
}));                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          ,!A$A&?. " .@  % 1 ! s !   +K2M!0M  M!  	&?:   % 2 ! s !    (5@0#  5M/58M%>*?,!?&?( O n e D r i v e   $>>  5F0M7(M A  (5@0?,!?&?. 3 .G.A  .@  O n e D r i v e   +K2M!0M  8M%>(>(M(?  (AJ(2G*K/>.AÎ &/G8?    8M%>(2K    +K2M!0M  *M*?@  	(M(M2A  (?0M'>0?AK!?  .0?/A  .@  O n e D r i v e   +K2M!0M (?  .3M2@  8F*M  G/!>(??  " .3M2@  *M0/$M(?A" (?  M2?M  G/!?  2G&>  " O n e D r i v e (?  $?0??  (?0M.?$@0?A" (?  M2?M  G/!?. 2 .@  O n e D r i v e   +K2M!0M 2K  >2>  MA5  +H2M 2A  	(M(>/?[ &/G8?  .@  O n e D r i v e   +K2M!0M  (A!?  +H2M 2(A  $@8?5G/!?  2G&>  O n e D r i v e (A  .3M2@  (M+?0M  G/!?.   O n e D r i v e (A  .3M2@  (M+?0M  G/!? .@  % 1 ! s !   +K2M!0M  M!  	&? .3M2@  *M0/$M(?!? O n e D r i v e   (A!?  (?7MM0.?!?z *M*A!A  .@  O n e D r i v e 2K  (M(??(@  8.>2@0?>2M8?(  580  2G&A.     P C 2K  &G(?(?  8.>2@0?>2K  .>0MG&AA  .0M*A2(A  $F05!?.   .@  O n e D r i v e   8M%>(>(M(?  AK!?( O n e D r i v e (A  (FMM  G/!2K    8.8M/  	&?B .@  0M(FM  (A8'>(>(M(?  $(?@  G8?,   $0M5>$  .3M2@  *M0/$M(?!?.   .?.M.2M(?  8H(M  (M  G/!2K  8.8M/- &/G8?  J(M(?  (?.?7>2M2K  .3M2@  *M0/$M(?!?. S M7.?!?,   O n e D r i v e $K    8.8M/  	&?.   &/G8?  J(M(?  (?.?7>2M2K  .3M2@  *M0/$M(?!?. ¤ .@  >$>$K    8.8M/  	&?.     8.8M/(A  2>  *0?7M0?>2K  $F2A8AK5!>(??,   O n e D r i v e . c o m A  5F3M2?,   8H(M  (M  G/!?.   .@0A  8.8M/(A  *0?7M0??(  $0M5>$,   .3M2@  *M0/$M(?!?. PAU (M 2H(M 2K  *(?  G/!>(??  .@  ,M0L0M  8FM?M (A  .>0M!?  .0?/A  .3M2@  *M0/$M(?!?.  &/G8?  .3M2@  *M0/$M(?!?. & J(M(?  (?.?7>2M2K  .3M2@  *M0/$M(?!?. $ M7.?!?,   O n e D r i v e $K    8.8M/  	&?* .G.A  % 1 ! s ! (?  (AJ(2G.A  % 2 ! s ! 2K(?  +K2M!0M.  O n e D r i v e   .2A  5A$K&?\ .@0A  M!??  5F3M2?(>  $M/$  $>>  >*@2(A  2??  	!>(??  +H2M 2(A  .@  O n e D r i v e A  K!?!?. < O n e D r i v e   8*B0M#  (?0M5>9A(?  9MA2(A  	*/K??  .2A  G/2G0AB (?0M5>9A(?  9MA2A  2GA!>  &/G8?  O n e D r i v e (A  .3M2@  *M0>0-?!?. -   P C 2K  O n e D r i v e   +K2M!0M  *M*?G  	(??2K  	&?¶ .@0A  .A&A  	*/K??(  &G  O n e D r i v e   $>$K  (A8'>(?8M$AG,   "   +K2M!0M (A  	*/K?A" (A  AK!?.   2GAG,   0F!A  >$>2  (A!?  +H2M 2A  2?*?*KA!>  	!>2G  J$M$  8M%>(>(M(?  AK!?.    J$M$  +K2M!0M (A  AK!?   +K2M!0M (A  	*/K?Al .@0A    P C 2K  	*/K?8M$A(M(  M i c r o s o f t   LM $K  O n e D r i v e A  8H(M  (M  G/!>(??  ' .3M2@  *M0/$M(?!?'   AK!?. - .G.A  .@  O n e D r i v e   +K2M!0M (?  8C7M?2G*K/>.Af &?  .@  (?0M5>9A!??  580.H(  8M%>(2K  8C7M?,!&A:   % 1 ! s ! . 
 
 89>/  K8,   .@  I T   5?->>(M(?  8*M0&?!?. 6 .@  O n e D r i v e   +K2M!0M (?    8M%>(2K  8C7M?2G0A:   % 1 ! s !   w .@  " % 1 ! s ! "   +K2M!0M (?  .@  (?0M5>9A!??  580.H(  8M%>(2K  8C7M?2G0A:   % 2 ! s !   
 89>/  K8,   .@  I T   5?->>(M(?  8*M0&?!?.  8M%>(>(M(?  .>0M!?J .G.A  % 1 ! s ! 2K  	9??(  &>(?  G  5G0A>  	(M(  O n e D r i v e   +K2M!0M (?  A0M$?>.Aà &/G8?    >$>$K  5>8M$5>  >(M+?0M  G/,!?(  &G  +K2M!0M  &?  (?  (?0M'>0?AK!?  .0?/A  .3M2@  .@  O n e D r i v e   +K2M!0M (?  8F*M  G/!>(??  " .3M2@  *M0/$M(?A" (?  M2?M  G/!?  2G&>  " O n e D r i v e (?  $?0??  (?0M.?$@0?A" (?  M2?M  G/!?. \ &/G8?  " O n e D r i v e (?  8F*M  G/?" (?  M2?M  G/!  &M5>0>  .@  O n e D r i v e   +K2M!0M  .3M2@  8F*M  G/!?.  +K2M!0M (?  AK!?  2 O n e D r i v e   (A!?  (?7MM0.?!>(??  80G  M2?M  G/!?2 O n e D r i v e (A  .F0AA*0M!>(??    8.8M/(A  (?5G&?!?0M7.?!?  .@0A  O n e D r i v e $K    8.8M/  &A0MJ(M(>0A.   .@0A  -5?7M/$M$A2K  8.8M/2(A  &A0MJG,   O n e D r i v e   +K0.M 2A  5F3M2!>(??  " +K0.M 2A  5F3M2A"   M2?M  G8?,   8M5/>2>  2>M  +H3M2A  **!?.   +K0.M 2M2K,   8H(M  (M  G8?,     *M06M((A  !!?.     .K!0G0M  *M0$M/A$M$0  8M$>0A  .0?/A  .@0A  $0M5>$  .?  G/>2K  F,A$>0A.  +K0.M  2A  5F3M2A 2>M 2(A  5@M7?!?* .@0A  *M*?G    >$>(?  8.>2@0?8M$A(M(>0AP .@  < a > O n e D r i v e   -   % 1 ! s !   +K2M!0M (?< / a >   $F05!?  2G&>  5G0J  >$>$K  8H(M  (M  G/!?. ] 2>?(M A  $0>/  2??&?  2G&>  5?/5$  >2G&A.   &/G8?  .3M2@  2>?(M  G/!>(??  *M0/$M(?!?. F   8G52K  .@A  />M8F8M  2G&A.   89>/  K8,   .@  I T   5?->>(M(?  8*M0&?!?. B .@  >$>  (?0K'?,!?&?.   89>/  K8,   .@  I T   5?->>(M(?  8*M0&?!?. M 8G5A  (A8'>(?!  8>'M/  >2G&A.   89>/  K8,   .@  I T   5?->>(M(?  8*M0&?!?. b   8G5(A  *M0>*M$?  G/>2G  .@  5&M&  5G0G  2H8F(M8M  	!>2?.   89>/  K8,   .@  I T   5?->>(M(?  8*M0&?!?. i *M08M$A$>(??  8G5A  >2>  MA5  -M/0M%(2A  58M$A(M(>/?.   &/G8?  J(M(?  (?.?7>2  $0M5>$  .3M2@  *M0/$M(?!?. o 8G5  (A!?  *M0$?8M*&((A  *J&!>(??  >2>  MA5  8./  *!A$K&?.   &/G8?  J(M(?  (?.?7>2  $0M5>$  .3M2@  *M0/$M(?!?. S 8G5  $>$M>2?>  &A,>A2K  2G&A.   &/G8?  J(M(?  (?.?7>2  $0M5>$  .3M2@  *M0/$M(?!?. @ .@  >$>2K  8.8M/  	&?.   89>/  K8,   .@  I T   5?->>(M(?  8*M0&?!?.  80M50M  &K7:   % 1 ! s ! S .@A    S h a r e P o i n t   8HM A  />M8F8M  2G&A.   89>/  K8,   .@  I T   5?->>(M(?  8*M0&?!?. $ .@0A  .0J  >$>(?  8.>2@0?8M$A(M(>0A(.@0A  8H(M  (M  G8?(  >$>  .0?/A  .@0A  8.>2@0?8M$A(M(  >$>  80?*K22G&A.   &/G8?  " % 1 ! s ! "   /JM  *>8M 50M!M (?  &?!?. 
 .0J  >$>(?  K!?>2G,   (K?+?G7(M  *M0>$2K  O n e D r i v e   M2L!M  ?9M(>(M(?  A!?  M2?M  G8?,   8FM?M 2(A  M2?M  G/!?.   >$>  M/>,M (?  M2?M  G8?,   >$>(?  K!?A(?  M2?M  G/!?.        2K!M  5A$K&?. . . PA 8H(M  (M  G8M$K&? 8H(M  5AM  G8M$K&? O n e D r i v e (?  *M !GM  G8M$K&? 8H(M  (M  G8M$K&?. . .     H   6  /JM  *%  >2>  *F&M&&?>  	(M(  >0#>  .G.A  &@(M(?  8.>2@0?2G.A‰ % 1 ! s !   M70>2  &M5>0>  *%>(M(?  ?(M(&?>  G8?,   *M0/$M(?!?  2G&>  % 2 ! s ! ?(M(  *%$K  8M%>(2K  8.>2@0?!>(??  O n e D r i v e % 3 ! s ! (?  8F*M  G/!?.  8M%>(>(M(?  $F0A5A .3M2@  *M0/$M(?A (?7MM0.?A‰ 1   M70  &M5>0>  *%>(M(?  A&??,   .3M2@  *M0/$M(?!?  2G&>  A&??(  *%$K  8M%>(>(M(?  8.>2@0?!>(??  % 1 ! s !   O n e D r i v e % 2 ! s ! (?  8F*M  G/!?.                2K!M  5A$K&?. . .             U +K2M!0M  *G0A  " % 1 ! s ! "   *M*?G  % 2 ! s ! 2K  	(??2K  	&?.   &/G8?  .0J  8M%>(>(M(?  AK!?.           PA                               P C 2K  $?($  (?2M5  8M%2  2G&Am .@  (M(?  O n e D r i v e   +H2M 2A    P C ?  (AB2>  	!5A.   /G  +K2M!0M 2(A  8.>2@0?>2K  AK5!>(??  M2?M  G/!?. PA‘ .@0A  $?($  !?8MM  (?2M5  8M%2  2??  2G(&A(  .@  O n e D r i v e (A  !L(M 2K!M  G/!  8>'M/*!&A.   /G  +K2M!0M 2(A  8.>2@0?>2K  AK5!>(??  M2?M  G/!?.  .@  O n e D r i v e   (AB2>  2G&A/ O n e D r i v e % 1 ! s ! 
 .@  O n e D r i v e     P C ?  (AB2>  2G&A O n e D r i v e (A  8F*M  G/!?>   P C 2K  8.>2@0?,!G  +K2M!0M 2(A  AK5!>(??  M2?M  G/!?. 6 O n e D r i v e % 1 ! s ! 
 O n e D r i v e (A  8F*M  G/!>(M(?  *B0M$?  G/!?    , 8.>2@0#  ?9M(>2  5M/58M%>*((A  *B0M$?  G/!?A .@  8.>2@0#  ?9M(>2(A  (5@0?>2G,   O n e D r i v e A  .@  (A.$?  580. * .G.A  +H2M 2K  .>0M*A2(A  5?2@(  G/2G*K/>.A) % 1 ! s ! (?  O f f i c e 2K  $F05!>(??  M2?M  G/!?8 .G.A  % 1 ! s !   O f f i c e   +H2M 22K  .>0M*A2(A  5?2@(  G/2G*K/>.A .0?$  8.>>0  K8  M2?M  G/!?                            (.@0A  8H(M  (M  G8?(  >$>  .0?/A  .@0A  8.>2@0?8M$A(M(  >$>  80?*K22G&A.   &/G8?  " % 1 ! s ! "   K8  *>8M 50M!M (?  &?!?. 
   .0K  >$>(A  K!?!  K8,   (K?+?G7(M  *M0>$2K  O n e D r i v e   M2L!M  ?9M(>(M(?  A!?  M2?M  G8?,   8FM?M 2A  M2?M  G/!?.   >$>  M/>,M (?  M2?M  G8?,   >$>(?  K!?A(?  M2?M  G/!?. . M7.?!?,   .G.A  O n e D r i v e (?  8F*M  G/2G*K/>.AÊ .@  O n e D r i v e   +H2M 2(A  *M*?G  O n e D r i v e   /JM  *>$  88M0#  ( G r o o v e . e x e )   8.>2@0?8M$K&?.   O n e D r i v e   /JM    88M0#(?  	*/K?>2G,   *>$  88M0#$K  .@  +H2M 2  8.>2@0#(A  *?5G8?(  $0M5>$  .3M2@  *M0/$M(?!?. \ .@  O n e D r i v e   (?0M.?$@0#  *&M'$?  >0#>  .G.A  &>(?(?  8.>2@0?2G.A.   < a > .0?$  $F2A8AK!?< / a > a .@  < a   h r e f = " s c : / / R o o t " > O n e D r i v e   -   % 1 ! s !   +K2M!0M (?< / a >   $F05!?  2G&>  5G0J  >$>$K  8H(M  (M  G/!?.                               PA *G0A &K7 0?A2M/B7(M& *M 2K!M  G/!>(??    +H2M  >2>  *F&M&&?E O n e D r i v e A    +H2M (A  *M 2K!M  G/!>(??,   &@(?  *0?.>#>(M(?  $M?!?. .   +H2M  *G0A2K  (A.$?  2G(?  M70>2(A  2??  	&? &/G8?  +H2M  *G0A(?  .>0M!?.   	&>90#A,   >3@$K  *M0>0-  >2G&(?  2G&>  .A?/2G&(?,   ,?&A5A$K  .A?/2G&(?  2G&>  0F!A  ,?&A5A2$K  *M0>0-  >2G&(?  (?0M'>0?AK!?. *   +H2M  .@  O n e D r i v e 2K  80?*K($  *F&M&>  	&?F .0?$  (?2M5(A  J(AK2A  G/!?  2G&>  .@A  580  2G(?  +H3M2(A  $J2?!?. "   O f f i c e   +H2M A  .@  >M0$  580. .0?$  8.>>0  K8  *$M0>(M(?  O f f i c e 2K  $F05!?. -   *K2M!0M  *G0A2K  (A.$?  2G(?  M70>2A  	(M(>/?-   *K2M!0M  .@  O n e D r i v e 2K  80?*K($  *F&M&>  	&?  &/G8?  +K2M!0M  *G0A(?  .>0M!?.   	&>90#A,   >3@$K  *M0>0-  >2G&(?  2G&>  .A?/2G&(?,   ,?&A5A$K  .A?/2G&(?  2G&>  0F!A  ,?&A5A2$K  *M0>0-  >2G&(?  (?0M'>0?AK!?. +   +H2M  K8  .@  O n e D r i v e 2K  $?($  >3@  2G&A. l .0?$  (?2M5(A  *J&!>(??  M2?M  G/!?  2G&>  *H  .@A  580  2G(?  +H2M 2(A  $@8?5G/!  &M5>0>  J$  >3@  G/!?.   f *H  .@A  580  2G(?  +H2M 2(A  $@8?5G/!?  2G&>  &?  MA5  >3@(?  M0.?8M$A&K  B8G&AA  M2?M  G/!?. [   +H2M (?  *M 2K!M  G/2G0A  &AG  +K2M!0M  /JM  /.>(??  5>0?  O n e D r i v e 2K  $?($  >3@  2G&Ad /.>(?(?  5>0?  O n e D r i v e   (?2M5  A0??  8*M0&?!?  2G&>  ->8M5>.M/  +K2M!0M  (A!?  +H2M 2(A  $@8?5G/!?.    +H2M +H3M2A? .@A  &G  *M0&G62K    *G0A$K  *M*?G    +H2M  2G&>  +K2M!0M  	&?. ² 6  /JM  0F!A  5F0M7(M 2(A  	!>(??    P C   2G&>  (M 2H(M 2K  &>(?  *G0A  .>0M!?.   6>2A  G  /?$G,   (M 2H(M  5F0M7(M (A  !L(M 2K!M  G/!>(??  .@0A    P C 2K(?  5F0M7(M (?  $J2?5MA. ˆ M7.?!?,   .G.A  O n e D r i v e (?  7M !L(M  G/2G*K/>.A.   &/G8?  O n e D r i v e (?  .>(M/A52M >  7M !L(M  G8?,   .@  0M/  G/!  K8  .3M2@  *M0/$M(?!?. f M7.?!?,   .G.A  O n e D r i v e (?  7M !L(M  G/2G*K/>.A.   &/G8?  1   (?.?7  5G?  	!?,   *H  .3M2@  *M0/$M(?!?. ™ M7.?!?,   .G.A  8M%>(?  *M2?G7(M  !G>  +K2M!0M (A  *M0>*M/$  G/2G*K/>.A.   &/G8?  .@0A    +K2M!0M A  5M0>/!>(??  (A.$?(?  2??  	(M(>0(?  (?0M'>0?AK!?. s M7.?!?,   .@0A  F2M2(?  *0M/>/  !?(?  &?>0A.   &/G8?  .@0A  F2M2A,>/M/G  *0M/>/  !?(?  &?(M2A  (?0M'>0?AK!?.      +H2M  &5!>(??  .>$M0.G. H &@(M(?  8.>2@0?!>(??  .@0A    +H2M ?  850#  (A.$A2A  5M5>2M8?  	A&?. PA    +H2M  .0J0?G  $(?@  G/,!?&?.  $0M5>$  .3M2@  *M0/$M(?!?. ;   *G0A$K  	(M(    &>,!?(  6  *M*?G    (M 2H(M 2K  	&?. i .@  P C 2K  	(M(  6  /JM  *G0A(A  .>0M!?  2G&>  &@(?(?  *M 2K!M  G/!  K8  &@(?(?  5G0G  +K2M!0M A  $02?!?. # 1   +H2M  O n e D r i v e $K  8.>2@0?,!2G&A* % 1 ! s !   +H2M 2A  O n e D r i v e $K  8.>2@0?,!2G&AK   +H2M 22K  .@0A  8G5M  G/2  .H(0M  88M0#2  0?7M  8M/(A  .@0A  G0AA(M(>0A. ¨ .@  S h a r e P o i n t   8HM 2K  +H2M (?  *M0A0?!?:   +H2M (?  A!?- M2?M  G8?,   .0?(M(?  >   *M0A0?A(?  AK!?.   *H,   .@0A  .3M2@  .H(0M  88M0#2(A  8G5M  G/!>(M(?  *M0>0-?5MA.                 PA      # .@  O n e D r i v e % 1 ! s !   +K2M!0M (?  $F05!?] (M 2H(M  5F0M7(M  .0?/A  .@  *M/B0M 2K(?  5F0M7(M  .G.A  5?2@(  G/2G(?  .>0M*A2(A  2??  	(M(>/?. + *0?7M0?!>(??  0F!A- 8>0M2A  M2?M  G/!? *M !GM  5A$K&?. . .  *0?7M0?!>(??  M2?M  G/!?,   P C 2K  " % 1 ! s ! "   +K2M!0M  *M*?G  	(??2K  	&?¥ .@0A    +K2M!0M (A  .J&?8>0?>  8.>2@0?8M$AG  2G&>  .@A  M?$>  $F2?/AG,   0F!A  5G0M5G0A  +K2M!0M 2(A  +H2M 2A  2?8?*KA!>  	!  K8  J$M$  +K2M!0M (A  AK!?.  J$M$  +K2M!0M (A  8C7M?A4 M7.?!?,   .G.A  8.>2@0#  M2/?M (?  $F052G*K/>.AN .G.A  U R L (?  *M0>8F8M  G/2G*K/>.A.   89>/  >5>2G,   &/G8?  .&M&$A(A  8*M0&?!?| .@0A    8M%>(>(M(?  .@  " % 1 ! s ! "   +K2M!0M  K8  	*/K?8M$G,     +K2M!0M 2K(?  +H2M 2A  .0?/A  .@  O n e D r i v e 2K(?  +H2M 2A  5?2@(  G/,!$>/?. $ .G.A    +H2M (?  8.>2@0?2G*K/>.A. X &/G8?    0M7?$  +H2M  *M0>*M/$(A  -M/0M%?!  K8  S h a r e P o i n t     (?0M5>9A2(A  8*M0&?!?.             ' .G.A  .@  % 1 ! s !   2H,M00@(?  8.>2@0?2G.A) .0?$  $F2A8AK5!>(??  M!  M2?M  G/!?? ?  2G&>  $G  MA5  2H,M00@2(A  8.>2@0?!  8>'M/  >2G&AC .@  P C (?    .K&  	(M(  !J.H(M ?  G0M>2(?  .@  I T   5?->  K0AAK&?N .@  P C (?    !J.H(M 2K  G0M!2K  89>/  >5>2G,   .@  I T   5?->>(M(?  8*M0&?!?.   3   +K2M!0M (?  8.>2@0?!>(??  .@  88M%  (A.$?&A. - .0?$  8.>>0  >5>2G,   8HM  /.>(?(?  !!?. 3   +K2M!0M 2K(?  6>2(A  850?>2G  FM5AM  G/>2?Y   +K2M!0M (?  8.>2@0?>2G,   " FM5AM  580"   *?(A  +M  G/.(?  8HM  /.>(?(?  !!?. O +K2M!0M 2K    580.H(  8.>>0  (?2A5A  50A8  	&?,   &@(?(?  8.>2@0?!  8>'M/  >&APAv (?2A5A  50A82  56M/$(A  $@8?5G8?,   &H(>  !G>  *M0.>#@0#(A  $@8?5G/2?G2>  (?2A5A  50A82(A  850?.(?  8HM  /.>(?(?  !!?. \ .@0A  8.>2@0?!>(??  *M0/$M(?8M$A(M(  +K2M!0M 2K  8.>>0  9MA2  (?0M59#  (?0M.?$@0?,!?&?. V   +K2M!0M 2K  8.>>0  9MA2  (?0M59#(A  (?2?*?5G/>2G  .@  8HM  (?0M5>9A2(A  8*M0&?!?. 8 6>2(A  +K2M!0M A  K!?>2G  5>??  $*M*  .K&  	!>2?W   +K2M!0M (?  8.>2@0?>2G,   " FM  .K&"   *?(A  +M  G/.(?  8HM  /.>(?(?  !!?. > @52  .>0M?(  8FM?M  >0#>    +K2M!0M  8.>2@0?,!  2G&A1 .0?$  8.>>0  K8  .@  I T   5?->>(M(?  8*M0&?!?. 2 M7.?!?,   .G.A    +K2M!0M (?  8.>2@0?2G*K/>.A@ S h a r e P o i n t   (M- *M0F.?8F8M  +K2M!0M 2  8.>2@0#A  .G.A  .&M&$?5M5.Ay S h a r e P o i n t   (M- *M0F.?8F8M  +K2M!0M 2(A  8.>2@0?G  5?'>  O n e D r i v e (?  (?0M.?$@0?!  K8  .@  I T   (?0M5>9A2(A  8*M0&?!?0   2H,M00@(?  8.>2@0?!  K8  .@A  (A.$?  2G&A. ‡ />M8F8M (?  -M/0M%?!  K8    2H,M00@(?  (M 2H(M 2K  5@M7?!?  2G&>    2H,M00@  8.>2@0#(A  *?5G/!  K8  M2?M  G/!?  2G&>  (JM!?. `   2H,M00@  $@8?5G/,!?&?.     *0?02K  5H(>  +H2M 2A  8G5M  G/,!?(M2/?$G  5?  *M*?@  2>G  	>/?. c   2H,M00@  8.>2@0#(A  *?5G/!  K8  M2?M  G/!?  2G&>  (JM!?  2G&>  2H,M00@  /.>(?(?  8*M0&?!?. &   2H,M00@(?  8.>2@0?!  8>'M/  >&A. k   2H,M00@  8.>2@0#(A  *?5G/!  K8  M2?M  G/!?  2G&>  2H,M00@(?  (M 2H(M 2K  5@M7?!  K8  *M0/$M(?!?. 5 8G52K  8.8M/  	(M(  >0#>  .G.A    2H,M00@(?  G0AK2G.A. 5 .3M2@  *M0/$M(?!  K8  O n e D r i v e (?  *A(*M0>0-?!?. ! .G.A  .@  2H,M00@(?  8.>2@0?2G.A 2H,M00@  8.>2@0#  *?5G/,!?&?† " % 1 ! s ! "   (A!?  8M%>(?>  &A,>A2K  	(M(  +H2M 2A    *0?02K(G  	>/?,   >(@  (M 2H(M 2K  .>$M0.G  &A,>A2K  	!G  +H2M 2A  $@8?5G/,!M!>/?. /   +H2M  *G0A2K  (A.$?  2G(?  M70>2(A  2??  	&?. 5 .G.A  6>(M(?  8.>2@0?!  K8  &@(?(?  J(8>?!?.  *G0A  2G&>  0  (A.$?,!&A. : .@  O n e D r i v e 2K  6>(M(?  $@8?5G/!?  2G&>  &>(?  *G0A  .>0M!?. 0 .0K  62K  8.8M/  	&?  (A  6  8.>2@0?,!&A. = .0K  6  80?  G/,!?&?  (A  .G.A  &@(?(?  B!>  8.>2@0?2.A.           PA                 +H2M  5H0A'M/>(M(?  *0?7M0?!?% O f f i c e   +H2M  5H0A'M/>2(A  *0?7M0?!?] (M 2H(M  5F0M7(M  .0?/A  .@  *M/B0M 2K(?  5F0M7(M  .G.A  5?2@(  G/2G(?  .>0M*A2(A  2??  	(M(>/?. + .>0M*A2(A  5?2@(  G/!>(??  O f f i c e 2K  $F05!?r O f f i c e   0F!A  5F0M7(M 2  (A!?  .>0M*A2(A  5?2@(  G8M$A&?  2G&>  .@0A  	>2(AA(G  +H2M (A  AK5!>(??  (A.$?8M$A&?.  0F!A  +H2M 2(B  	Ad .@  *M/B0M 2K(?  +H2M A  &>(?  *G0AA  " - % 1 ! s ! "   G0M,!A$A&?  .0?/A  (M 2H(M  +H2M  !L(M 2K!M  5A$A&?. / (M(?  % 1 ! s !   5H0A'M/>2A  K8  0F!B  +H2M 2(A  	Ah .@  *M/B0M 2K(?  +H2M 2A  5>?  *G0M2A  " - % 1 ! s ! "   G0M,!A$A&?  .0?/A  (M 2H(M  +H2M 2A  !L(M 2K!M  5A$>/?.                                                        & -?*M0>/>(M(?  **!? -?*M0>/>(M(?  **!?3 < a   h r e f = " # " > .@  K*M/$A  .G.A  *M0>'>(M/$  8M$>.A< / a > o < a   h r e f = " # " > M i c r o s o f t < / a >   .@  -?*M0>/>(M(?  8G0??,   .@A  &?8M$A(M(  (A-5>(M(?  .F0AA*0!>(??  	*/K?8M$A&?. PA (>A  J$  (M?&?I .G.A  80H(  5?'>(G  *(?  G8M$A(M(>.K  2G&K  .@  -?*M0>/  5?(>2(AAA(M(>.A. % .@0A  &G(M(?  7M*!M!>0K  .>A  F*M*!?$ .@0A  &G(M(?  7M*!2G&K  .>A  F*M*!? (>A  J$  (M2G&A: &H(>  @>0  >*K$G,   .G.A  &>(?  A0??  $F2A8AK&2?>.A.  (>  5&M&    8B(  	&?) 2K(  2G&>  .F0AA&2(A  ->8M5>.M/  G/!?. & 5?6M2G7#2A  .0?/A  5?(?/K  !G>(A  G0MA	 8.0M*?A .3M2@  *M0/$M(?!?
 0&M&A  G/? .B8?5G/?Ö M7.?!?,   .@  -?*M0>/>(M(?  **!2K  8.8M/  0M*!?&?.   &/G8?  .@  0M(FM  (FM7(M (A  80?B8AA(?,   *H  .3M2@  *M0/$M(?!?.   2>G,   .@0A  .&M&$A  5?->>(M(?  < a   h r e f = " # " > 8*M0&?!< / a >   &M5>0>  .@  8.8M/(A  (?5G&?5MA.  **A$K&?. . . [ .G.A  .@  -?*M0>/>(M(?  -?(&?8M$A(M(>.A!   .@  5M/>M/2A  .G.A  .0?$  .F0AA  >5!2K  89>/*!$>/?. 	 C$M$2A 5F(AA! % 1 ! s ! (?  8.>2@0?!  8>'M/  >&A. š +H2M  *J!??*A2  *G0A  .>0M!>(??  .@  88M%  5?'>(  (A.$?&A  (A    6>(M(?  8.>2@0?!  8>'M/  >&A.   &/G8?  +H2M  *J!??*A(?  $?0??  *>$  *G0A?  .>0M!?. -   *G0A  .>0M?(  6>(M(?  .G.A  8.>2@0?2G.A. 4   *G0A  .>0M?(  6>(M(?  .G.A  8.>2@0?2G.A:   % 1 ! s ! . Ý +H2M  *J!??*A2  *G0A  .>0M!>(??  .@  88M%  5?'>(  (A.$?&A  (A    6>(M(?  8.>2@0?!  8>'M/  >&A.   &/G8?  (M 2H(M 2K?  5F3M2?,   +H2M  *J!??*A  *G0A(?  $?0??  82A  *G0A?  .>0M!?  2G&>  .@  8HM  (?0M5>9A2(A  8*M0&?!?. /   *G0A  .>0M?(  6>(M(?  .G.A  !L(M 2K!M  G/2G.A.                    O n e D r i v e (?  0@8FM  G/!?.@  O n e D r i v e ?  8.>2@0?!2K  8.8M/2A  	G,   0@8FM  G/!  &M5>0>  *0?7M>0  >5MA.   0@8FM  0M/  >0#>  8.>2@0#  8G5  $>$M>2?>  A$A&?;   +H2M 2  M0.>(A$,   FM  M2L!M  (A!?  .@  8M%>(?  .F7@(M 2K?  $?0??  8.>2@0?,!$>/?.   < a   h r e f = " # " > .0?$  $F2A8AK!?. < / a > E (>  +H2M  8FM?M 2A  .0?/A  >(M+?0G7(M 2(A  	A  ( 8?+>0M8A  G/,!?&?) 
 0&M&A  G/? 0@8FM  G/?   .G.A  0@8FM  G8M$A(M(>.Aª J(8>?!?,   .G.A  0@8FM  G8G  8./2K  .@0A  .@  +H2M 22K  *(?  G/!?.   .@  +H2M 2A  .@  8M%>(?  !?8MM 2K  8G5M  G/,!$>/?  .0?/A  0@8FM  G8?(  $0M5>$  O n e D r i v e A  *M 2K!M  G/,!$>/?.  0@8FM  *B0M$/?&?* .@  O n e D r i v e   *M*A!A  J$M$&?2>  .>0?*K/?&?.  0@8FM  *B0M$/?&?,   >(@. . . v 0@8F  G8>  B!>  *0?7M>0  >(?  2K*>2A  .@  O n e D r i v e 2K  *M*?@  	!5MA.   5>?(?  B!  K8  (JM!?  2G&>  M2?M  G/!?.  0@8FM  G/!  8>'M/  >2G&A &K  $*M*A  0??&?.  0@8FM  *B0M$/?&?* .@  O n e D r i v e   *M*A!A  J$M$&?2>  .>0?*K/?&?.  0@8FM  *B0M$/?&?* *M*?@  .@0A  J(M(?  2K*>2A  2??  	(M(>0A.  0@8FM  G/!  8>'M/  >2G&A &K  $*M*A  0??&?.  O n e D r i v e   0@8FM  *B0M$/?&?> .@  +H2M  8M%?$?(?  B!  K8  M!  (JM!?  2G&>  M2?M  G/!?.  O n e D r i v e   0@8FM  >2G&A: $&A*0?  &62(A  B!  K8  M!  (JM!?  2G&>  M2?M  G/!?.                                        < a > (?2M5(A  (?0M59?!?< / a > ÷ M i c r o s o f t   LM $K  .@0A    P C ?  8H(M  (M  G8?(  >0#>    *?  &A,>A2K  2G&A.   .@0A  O n e D r i v e $K  5G0J  >$>(A  	*/K?>2(AAG,   5G0J  M i c r o s o f t   LM $K    P C ?  8H(M  (M  G/!?  2G&>  .@0A  	*/K?>2(AA(G  .F/?2M  ?0A(>.>$K    P C 2K  >$>(A  K!?!?.                    O n e D r i v e % 1 ! s !   ( % 2 ! s ! ) 5 M2L!M  (?2M5  % 3 ! s !   % 4 ! s ! 2K  % 1 ! s !   % 2 ! s !   	*/K?,!?&? < a > .0?$  (?2M5  *J&!?< / a >  O n e D r i v e % 1 ! s !           PA        , O f f i c e $K  O n e D r i v e (A  	*/K?!  .F0AA*!?&?! d .@  O f f i c e   +H3M2A  (M(??(@  O n e D r i v e 2K  	AK!?  .0?/A  5>??    *0?0  (A?  /?(>  *M0>*M$?  *J&!?. º 5G5$.H(  O n e D r i v e   .0M*A2(A  	*/K?!?
 O n e D r i v e *H  	(M(  .@  +H3M2(M(??(@  !L(M 2K!M  G8?,     P C *H  5>?(?  8.>2@0#2K  	!?.     P C *H  .@  +H3M22K  &G(?(H(>  *J&G&AA  O n e D r i v e (A  	*/K?!?. r O n e D r i v e (A  .@A  >5>2M8?(  5?'>  8M%>*?!?
   P C *H  .@A  >5>2M8?(  +K2M!0M 2(A,   .@A  >5>2M8?(  K  8.>2@0?!?.                                         $ % 1 ! s ! 2K  % 2 ! s !   % 3 ! s !   >3@  .??2?  	&? AA(M(&?:   % 1 ! s !   % 2 ! s !   © .@0A  8.>2@0?G  +H2M 2A    P C 2K  J$  8M%2>(M(?  5?(?/K?8M$>/?.   .@0A  J(M(?  +K2M!0M 2(A  .>$M0.G  !L(M 2K!M  G/5MA  2G&>    P C 2K  .0K  !M0H5M 2K(?  +H2M 2(A  8.>2@0?5MA. PA( O n e D r i v e (A  8F*M  G/!>(M(?  *B0M$?  G/!? 2FM?8M$K&?. . . B (>  O n e D r i v e % 1 ! s ! 2K  (M(?  +H2M 2(A  .0?/A  +K2M!0M 2(A  8.>2@0?!?                                                       " % 1 ! s ! "   2K(?  +H3M2A +K2M!0M 2K  2G(?  +H2M 2A                )   P C 2K(?  J(M(?  6>2(A  8.>2@0?B!&>? Œ .@0A  +H3M2A  .0?/A  +K2M!0M 2(A  8.>2@0?!  (?2?*?5G8M$G,   5?  O n e D r i v e *H  	>/?,   >(@    P C 2K  	!5A.   5?  *M*?G    P C *H  	G,   $J2?,!$>/?. O M7.?!?,     P C *H  /G  +K2M!0M 2A  8.>2@0#2K  	!>2K  .>0M!2K  8.8M/  0M*!?&?. X .3M2@  *M0/$M(?!  K8,   &/G8?  8FM?M 2(A  $F0??,   *H  " >$>"   M/>,M (?  M2?M  G/!?$ M7.?!?,   .@  .>0M*A2(A  -&M0*02G.AÙ .@0A  8.>2@0#(A  *?5G/!>(??  *M0/$M(??(  J(M(?  6>2A  O n e D r i v e 2K  *M*?  50A  2G5A.   &/G8?  5?  *M 2K!M  >5!  *B0M$/M/G  50A  5G?5A!?,   8.>2@0#  8.8M/2(A  *0?7M0?!?,   *H  $?0??  .>0M*A2(A  G8G&AA  *M0/$M(?!?. x .@  >$>$K  8.8M/  	(M(&A(,   .@  +K2M!0M 2  >,?$>  *M0&0M6?,!&A.   &/G8?  O n e D r i v e   (A?  ,/?  5M?,   $?0??  8H(M  (M  G/!?. É M7.?!?,   .@  >$>(A  *M*?@  .G.A  8M%>*?8M$A(M(  >0#>,   .@  +K2M!0M 2  >,?$>(A  .G.A  *M0&0M6?2G.A.   .G.A  (M(?  +H3M2A  .0?/A  +K2M!0M 2(A  8.>2@0?8M$>.A,   >(@  .@0A  &@(?(?  $0A5>$  .0M*A2M2K  .>0M5MA.  .G.A  O n e D r i v e A  (A8'>(?2G(&A(,   .@  +K2M!0M 2  >,?$>(A  *M0&0M6?2G.A.   .@  0M(FM  (A8'>(>(M(?  $(?@  G8?,   *M0/$M(?!?.   ³ .@  +K2M!0M 2  >,?$>(A  *M0&0M6?!2K  8.8M/  	&?.   .@0A  J(8>?(M2/?$G,   *M*??  .G.A  (M(?  +H3M2A  .0?/A  +K2M!0M 2(A  8.>2@0?8M$>.A,   >(@  &@(?(?  .@0A  $0A5>$  .0M*A2M2K  .>0M5MA.   M .@  +K2M!0M 2  >,?$>(A  *M0&0M6?!2K  8.8M/  	&?.   &/G8?  $?0??  *M0/$M(?!?.            &/G8?  .3M2@  *M0/$M(?!?.  &/G8?  .&M&$A(A  8*M0&?!?. . .@0A  *M*?G    5?7/>(M(?  8.>2@0?8M$A(M(>0A. j % 1 ! s ! 2K  .@  +K2M!0M 2  >,?$>(A  *M0&0M6?!2K  8.8M/  	&?.   &/G8?    !H2>M (?  .B8?5G8?,   .3M2@  *M0/$M(?!?. 3 M7.?!?,   .@  .>0M*A2(A  50M$?*G/!2K  8.8M/  	&?. p .@0A  % 1 ! s ! A  8.>2@0?!  K8  AA(M(  +K2M!0M 2  >,?$>(A  .G.A  8G5M  G/2G*K/>.A.   &/G8?  .3M2@  *M0/$M(?!?.       E M7.?!?,   O n e D r i v e   *M08M$A$>(??  .@  +K2M!0M (?  K!?!  8>'M/  >&AW M7.?!?,     +K2M!0M 2K  .@A  (A.$A2A  2G*K5MA  2G&>  &?  .0J  88M%A  F&?  	!5MA.   C .@  >$>2K  8.8M/  	(M(  >0#>  .G.A  .@  O n e D r i v e (?  8F*M  G/2G*K/>.A. : &/G8?  O n e D r i v e   (A!?  (?7MM0.??,   .3M2@  8H(M  (M  G/!?. j   8HM  &5!>(??  .>$M0.G  &A,>A2K  	&?.     8HM 2K  	(M(  +H2M 2A  2G&>  +K2M!0M 2A  .@0A    .>0M*A2A  G/2G0A.               PA                           *M0>8F8?M  .>0M*A2A" % 1 ! s !   .>0M*A2(A  *M0>8F8M  G8M$K&? .>0M*A(?  *M0>8F8M  G8M$K&?PA                           2A  (?.?7>2A (?.A7 8F(M2A M7#>2      ( O n e D r i v e   *M08M$A$  +H3M2(A  ,&?2@  G/2G&A" &/G8?  $0M5>$  .3M2@  *M0/$M(?!?. 7 O n e D r i v e % 1 ! s ! 
 O n e D r i v e   *M08M$A$  +H2M 2(A  ,&?2@  G/2G&A  O n e D r i v e   *M*A!A  8.>2@0?2G&A$ O n e D r i v e % 1 ! s ! 
 .>0M*A2  K8  B8M$K&? .>0M*A2A  K8  B8M$A&?D O n e D r i v e % 1 ! s ! 
 +H2M  2G&>  +K2M!0M  *G0A2K  (A.$?,!(?  M70>2A  	(M(>/?  6 O n e D r i v e % 1 ! s ! 
 % 2 ! s !   +H2M 2A  O n e D r i v e ?  *M 2K!M  >2G&A % 1 ! s !   +H3M2A  *M 2K!M  >2G&APA: O n e D r i v e % 1 ! s ! 
 .G.A  O f f i c e   +H2M 2K  .>0M*A2(A  5?2@(  G/2G.A8 .@  " % 1 ! s ! " 2K(?    O f f i c e   +H2M  *M2  .@0A  8>5'>($  59?>2?  .0?$  8.>>0  K8  M2?M  G/!?.    +H2M  2G&>  +K2M!0M  *G0A  8.8M/2A +H2M  *0?.>#  8.8M/2A' +H2M  *G0A2K  (A.$?(?  M70>2A  	(M(>/?* +K2M!0M  *G0A2K  (A.$?(?  M70>2A  	(M(>/? 6  *M 2K!M  G/,!2G&A. 0 .G.A  O f f i c e   +H2M2K  .>0M*A2(A  5?2@(  G/2G*K/>.AY .@  +H2M 22K    &>(?  K8  .@0A  8G5M  G/2  .H(0M  88M0#2  0?7M  8M/(A  .@0A  G0AA(M(>0A. F " % 1 ! s ! "   *G0A  .>0M!?  2G&>  .@  " % 2 ! s ! "   +K2M!0M  (A!?  &@(?(?  $@8?5G/!?. " 6  *G0AA  M2L!M 2K  (A.$?  2G&A.   % 1 ! s ! A  6  *M 2K!M  G/,!2G&A.   .0?$  8.>>0  K8  M2?M  G/!?.   PA                         O n e D r i v e 2K  1   8.8M/  	&?  O n e D r i v e 2K  % 1 ! s !   8.8M/2A  	(M(>/?    PA                          c .@0A  8.>2@0?>2(AAA(M(  +K2M!0M 2  >,?$>(A  .G.A  8G5M  G/2G*K/>.A.   &/G8?  .3M2@  *M0/$M(?!?.     PA       5 5                            S e g o e   U I   L i g h t  % 1 ! s ! 2K  *2A  +H3M2A  	(M(>/?2 &/G8?  .@A    5802G(?  5H(>  +H3M2(A  $@8?5G/!?.  +H2M  (AJ(,!2G&Am .@  O n e D r i v e   +K2M!0M 2K  &?  *M*?@  	&(?  .0?/A  &>(?(?  *M0>*M$?  G/!>(??  .@A  (A.$?  	&(?  (?0M'>0?AK!?.  +K2M!0M  (AJ(,!&Am .@  O n e D r i v e   +K2M!0M 2K  &?  *M*?@  	&(?  .0?/A  &>(?(?  *M0>*M$?  G/!>(??  .@A  (A.$?  	&(?  (?0M'>0?AK!?. 3 .G.A  % 1 ! s ! 2K  .@  O n e D r i v e   +K2M!0M (A  (AJ(2G*K/>.A  D O n e D r i v e     P C ?    M i c r o s o f t   LM  (A8'>(?,!?(M2A  A0M$??&?`   P C 2K  .@0A  	*/K?8M$A(M(  M i c r o s o f t   LM $K  O n e D r i v e A  8H(M  (M  G/!>(??  ' 80G'   M2?M  G/!?. 0 .@0A  M i c r o s o f t   LM $K    P C 2K  8H(M  (M  G/2G&AR &/G8?  O n e D r i v e   	*/K?!>(M(?  J(8>?!>(??  M i c r o s o f t   LM $K  8H(M  (M  G/!?     (M(?  +H2M 2A  $>>>  	(M(>/?$ & .0?(M(?  O n e D r i v e   ->8M5>.M/  *?2A (M 2H(M 2K  & 5@M7?!? 8.>2@0#  & 8.8M/2(A  5@M7?!?"   P C     .@0M!M  (FM 50MM *H  	&?? !G>  >0M@2(A  (?5>0?G&AA  O n e D r i v e   8.>2@#  *>M  G/,!?&?.  & ->8M5>.M/  G/? &G.H(>  8.>2@0?A       P C   ,M/>0@  8G50M  .K!M 2K  	&?P ,M/>0@  @5?$>2>(M(?  >*>!2K  89>/*!  K8  O n e D r i v e   8.>2@0#  *>M  G/,!?&?.     $ O n e D r i v e   2?M (?  ->8M5>.M/  G/!?0 8.>2@0?!>(??  O n e D r i v e   +K2M!0M 2(A  AK!? 8.>2@0#  8.8M/2(A  *0?7M0?A  5?2@(  G/!>(??  O f f i c e 2K  $F0A5A 0F!A  +H2M 2(B  	A$ (M(?  8.>2@0#  8.8M/2(A  5@M7?!? (?2M5(A  >3@  G/!? 2M2*M*A!B    *0?02K  	A 8FM?M 2A % 1 (?  2>M  G/? % 1 (?  (M 2>M  G/? & O n e D r i v e $K  *0?&C6M/  B!!? & 88M0#  0?$M0(A  5@M7?!? & O n e D r i v e A  $02?!? O n e D r i v e   -   5M/M$?$  O n e D r i v e   ,M/>*M (?  (?0M59?!?    PA            # +KK2A  .0?/A  5@!?/K2(A  &?A.$?  G/? +KK2A F.F0>  &?A.$A2A 8MM0@(M 7>M 2A      / &?A.$?  G/!>(??  +KK2A  2G&>  5@!?/K2A  5@  2G5A" +KK2A  .0?/A  5@!?/K2(A  6K'?8M$K&?( +KK2A  .0?/A  5@!?/K2(A  &?A.$?  G8M$K&?1 &?A.$?  G/!>(??  J$M$  +KK2A  2G&>  5@!?/K2A  2G5A &?A.$?  G8?(  .M 2A:   % d   /   % d : .@0A  +H2M  M8M *M2K00M 2K  *0?0>(M(?  $F05>2(AAA(M(>0>? 
 0&M&A  G/? .B8?5G/? +H2M  M8M *M2K00M  $F0A5AJ M7.?!?,   .@  +KK2A  .0?/A  5@!?/K2A  K8  +K2M!0M  8C7M?!2K  8.8M/  	&?. Ô  % 1 ! s !    +K2M!0M (A    P C 2K  8.>2@0?!  2G&A.   +KK2A  .0?/A  5@!?/K2(A  O n e D r i v e A  &?A.$?  G/!>(??,    +K2M!0M 2(A  AK!?   M2?M  G8?,    % 2 ! s !    +K2M!0M (?  AK!?.   *H  .@  *0?0>(M(?    P C ?  .3M2@  (FMM  G/!?. - J$M$  6>2  K8  6K'?8M$K&?:   % d % %   *B0M$/?&?: +H2M  M8M *M2K00M 2K  *0?0>(M(?  $F05!>(??  M2?M  G/!?. O .@0A  J$M$  +KK2A  2G&>  5@!?/K2(A  $@8?(*M*A!A    *0?0>(M(?  .3M2@  (FMM  G/!?. p .G.A  &?A.$?  G/!>(??  +KK2A  2G&>  5@!?/K2A  5@  (AJ(2G*K/>.A.   &/G8?  *0?0  2>M  G/,!2G&(?  (?0M'>0?AK!?.  8MM0@(M 7>M  -&M0*0,!?&?) 8MM0@(M 7>M  .@  O n e D r i v e A  K!?,!?&?.    +K2M!0M 2(A  AK!?PAÉ  % 1 ! s !    +K2M!0M (A    P C 2K  8.>2@0?!  2G&A.   8MM0@(M 7>M 2(A  O n e D r i v e 2K  -&M0*0!>(??,    +K2M!0M 2(A  AK!?   M2?M  G8?,    % 2 ! s !    +K2M!0M (?  AK!?.   *H  .3M2@  8MM0@(M 7>M (A  M/>*M0M  G/!?. E M7.?!?,   .@  8MM0@(M 7>M 2A  K8  +K2M!0M  8C7M?!2K  8.8M/  	&?. ¹ .@  ?$M0>2(A  O n e D r i v e ?  8G5M  G/!>(??   % 1 ! s !      P C 2K  8.>2@0?,!>2?.   O n e D r i v e ?  +KK2A  .0?/A  5@!?/K2(A  8G5M  G/!>(??   % 2 ! s !  (?  AK5!>(??   +K2M!0M 2(A  AK!? (?  M2?M  G/!?. ¼ .@  8MM0@(M 7>M 2(A  O n e D r i v e ?  8G5M  G/!>(??   % 1 ! s !      P C 2K  8.>2@0?,!>2?.   O n e D r i v e ?  8MM0@(M 7>M 2(A  8G5M  G/!>(??   % 2 ! s !  (?  AK5!>(??   +K2M!0M 2(A  AK!? (?  M2?M  G/!?.    +KK2A  .0?/A  5@!?/K2A   8MM0@(M 7>M 2A  C (G(A  8M09?G  8MM0@(M 7>M 2(A  8M5/>2>  O n e D r i v e A  8G5M  G/?| (G(A  (>  P C ?  F.F0>,   +K(M  2G&>  $0  *0?0>(M(?  (FMM  G8?(*M*A!A  O n e D r i v e ?  8M5/>2>  +KK2A  .0?/A  5@!?/K2(A  8G5M  G/!?                              * .G.A  .@  +H2M 2(A  O n e D r i v e ?  