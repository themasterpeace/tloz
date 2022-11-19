       this.boundClassNames = void 0;
        this.selectedButton = void 0;
        this.chart = chart;
        this.options = options;
        this.eventsToUnbind = [];
        this.container = doc.getElementsByClassName(this.options.bindingsClassName || '');
    }
    // Private properties added by bindings:
    // Active (selected) annotation that is editted through popup/forms
    // activeAnnotation: Annotation
    // Holder for current step, used on mouse move to update bound object
    // mouseMoveEvent: function () {}
    // Next event in `step` array to be called on chart's click
    // nextEvent: function () {}
    // Index in the `step` array of the current event
    // stepIndex: 0
    // Flag to determine if current binding has steps
    // steps: true|false
    // Bindings holder for all events
    // selectedButton: {}
    // Holder for user options, returned from `start` event, and passed on to
    // `step`'s' and `end`.
    // currentUserDetails: {}
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Initi all events conencted to NavigationBindings.
     *
     * @private
     * @function Highcharts.NavigationBindings#initEvents
     */
    NavigationBindings.prototype.initEvents = function () {
        var navigation = this, chart = navigation.chart, bindingsContainer = navigation.container, options = navigation.options;
        // Shorthand object for getting events for buttons:
        navigation.boundClassNames = {};
        objectEach((options.bindings || {}), function (value) {
            navigation.boundClassNames[value.className] = value;
        });
        // Handle multiple containers with the same class names:
        [].forEach.call(bindingsContainer, function (subContainer) {
            navigation.eventsToUnbind.push(addEvent(subContainer, 'click', function (event) {
                var bindings = navigation.getButtonEvents(subContainer, event);
                if (bindings) {
                    navigation.bindingsButtonClick(bindings.button, bindings.events, event);
                }
            }));
        });
        objectEach(options.events || {}, function (callback, eventName) {
            if (isFunction(callback)) {
                navigation.eventsToUnbind.push(addEvent(navigation, eventName, callback));
            }
        });
        navigation.eventsToUnbind.push(addEvent(chart.container, 'click', function (e) {
            if (!chart.cancelClick &&
                chart.isInsidePlot(e.chartX - chart.plotLeft, e.chartY - chart.plotTop)) {
                navigation.bindingsChartClick(this, e);
            }
        }));
        navigation.eventsToUnbind.push(addEvent(chart.container, H.isTouchDevice ? 'touchmove' : 'mousemove', function (e) {
            navigation.bindingsContainerMouseMove(this, e);
        }));
    };
    /**
     * Common chart.update() delegation,