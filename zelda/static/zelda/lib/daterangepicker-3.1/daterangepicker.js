tion.split('.'), optionName = optionParamList[optionParamList.length - 1], lang = this.lang, inputName = PREFIX + type + '-' + optionName;
        if (!inputName.match(indexFilter)) {
            // add label
            createElement(LABEL, {
                innerHTML: lang[optionName] || optionName,
                htmlFor: inputName
            }, null, parentDiv);
        }
        // add input
        createElement(INPUT, {
            name: inputName,
            value: value[0],
            type: value[1],
            className: PREFIX + 'popup-field'
        }, null, parentDiv).setAttribute(PREFIX + 'data-name', option);
    },
    /**
     * Create button.
     * @private
     * @param {Highcharts.HTMLDOMElement} parentDiv
     * Container where elements should be added
     * @param {string} label
     * Text placed as button label
     * @param {string} type
     * add | edit | remove
     * @param {Function} callback
     * On click callback
     * @param {Highcharts.HTMLDOMElement} fieldsDiv
     * Container where inputs are generated
     * @return {Highcharts.HTMLDOMElement}
     * HTML button
     */
    addButton: function (parentDiv, label, type, callback, fieldsDiv) {
        var _self = this, closePopup = this.closePopup, getFields = this.getFields, button;
        button = createElement(BUTTON, {
            innerHTML: label
        }, null, parentDiv);
        ['click', 'touchstart'].forEach(function (eventName) {
            addEvent(button, eventName, function () {
                closePopup.call(_self);
                return callback(getFields(fieldsDiv, type));
            });
        });
        return button;
    },
    /**
     * Get values from all inputs and create JSON.
     * @private
     * @param {Highcharts.HTMLDOMElement} - container where inputs are created
     * @param {string} - add | edit | remove
     * @return {Highcharts.PopupFieldsObject} - fields
     */
    getFields: function (parentDiv, type) {
        var inputList = parentDiv.querySelectorAll('input'), optionSeries = '#' + PREFIX + 'select-series > option:checked', optionVolume = '#' + PREFIX + 'select-volume > option:checked', linkedTo = parentDiv.querySelectorAll(optionSeries)[0], volumeTo = parentDiv.querySelectorAll(optionVolume)[0], seriesId, param, fieldsOutput;
        fieldsOutput = {
            actionType: type,
            linkedTo: linkedTo && linkedTo.getAttribute('value'),
            fields: {}
        };
        [].forEach.call(inputList, function (input) {
            param = input.getAttribute(PREFIX + 'data-name');
            seriesId = input.getAttribute(PREFIX + 'data-series-id');
            // params
            if (seriesId) {
                fieldsOutput.seriesId = input.value;
            }
            else if (param) {
                fieldsOutput.fields[param] = input.value;
            }
            else {
                // type like sma / ema
                fieldsOutput.type = input.value;
            }
        });
        if (volumeTo) {
            fieldsOutput.fields['params.volumeSeriesID'] = volumeTo.getAttribute('value');
        }
        return fieldsOutput;
    },
    /**
     * Reset content of the current popup and show.
     * @private
     */
    showPopup: function () {
        var popupDiv = this.container, toolbarClass = PREFIX + 'annotation-toolbar', popupCloseBtn = popupDiv
            .querySelectorAll('.' + PREFIX + 'popup-close')[0];
        // reset content
        popupDiv.innerHTML = '';
        // reset toolbar styles if exists
        if (popupDiv.className.indexOf(toolbarClass) >= 0) {
            popupDiv.classList.remove(toolbarClass);
            // reset toolbar inline styles
            popupDiv.removeAttribute('style');
        }
        // add close button
        popupDiv.appendChild(popupCloseBtn);
        popupDiv.style.display = 'block';
    },
    /**
     * Hide popup.
     * @private
     */
    closePopup: function () {
        this.popup.container.style.display = 'none';
    },
    /**
     * Create content and show popup.
     * @private
     * @param {string} - type of popup i.e indicators
     * @param {Highcharts.Chart} - chart
     * @param {Highcharts.AnnotationsOptions} - options
     * @param {Function} - on click callback
     */
    showForm: function (type, chart, options, callback) {
        this.popup = chart.navigationBindings.popup;
        // show blank popup
        this.showPopup();
        // indicator form
        if (type === 'indicators') {
            this.indicators.addForm.call(this, chart, options, callback);
        }
        // annotation small toolbar
        if (type === 'annotation-toolbar') {
            this.annotations.addToolbar.call(this, chart, options, callback);
        }
        // annotation edit form
        if (type === 'annotation-edit') {
            this.annotations.addForm.call(this, chart, options, callback);
        }
        // flags form - add / edit
        if (type === 'flag') {
            this.annotations.addForm.call(this, chart, options, callback, true);
        }
    },
    /**
     * Return lang definitions for popup.
     * @private
     * @return {Highcharts.Dictionary<string>} - elements translations.
     */
    getLangpack: function () {
        return getOptions().lang.navigation.popup;
    },
    annotations: {
        /**
         * Create annotation simple form. It contains two buttons
         * (edit / remove) and text label.
         * @private
         * @param {Highcharts.Chart} - chart
         * @param {Highcharts.AnnotationsOptions} - options
         * @param {Function} - on click callback
         */
        addToolbar: function (chart, options, callback) {
            var _self = this, lang = this.lang, popupDiv = this.popup.container, showForm = this.showForm, toolbarClass = PREFIX + 'annotation-toolbar', button;
            // set small size
            if (popupDiv.className.indexOf(toolbarClass) === -1) {
                popupDiv.className += ' ' + toolbarClass;
            }
            // set position
            popupDiv.style.top = chart.plotTop + 10 + 'px';
            // create label
            createElement(SPAN, {
                innerHTML: pick(
                // Advanced annotations:
                lang[options.langKey] || options.langKey, 
                // Basic shapes:
                options.shapes && options.shapes[0].type)
            }, null, popupDiv);
            // add buttons
            button = this.addButton(popupDiv, lang.removeButton || 'remove', 'remove', callback, popupDiv);
            button.className += ' ' + PREFIX + 'annotation-remove-button';
            button.style['background-image'] = 'url(' +
                this.iconsURL + 'destroy.svg)';
            button = this.addButton(popupDiv, lang.editButton || 'edit', 'edit', function () {
                showForm.call(_self, 'annotation-edit', chart, options, callback);
            }, popupDiv);
            button.className += ' ' + PREFIX + 'annotation-edit-button';
            button.style['background-image'] = 'url(' +
                this.iconsURL + 'edit.svg)';
        },
        /**
         * Create annotation simple form.
         * It contains fields with param names.
         * @private
         * @param {Highcharts.Chart} chart
         * Chart
         * @param {Object} options
         * Options
         * @param {Function} callback
         * On click callback
         * @param {boolean} [isInit]
         * If it is a form declared for init annotation
         */
        addForm: function (chart, options, callback, isInit) {
            var popupDiv = this.popup.container, lang = this.lang, bottomRow, lhsCol;
            // create title of annotations
            lhsCol = createElement('h2', {
                innerHTML: lang[options.langKey] || options.langKey,
                className: PREFIX + 'popup-main-title'
            }, null, popupDiv);
            // left column
            lhsCol = createElement(DIV, {
                className: PREFIX + 'popup-lhs-col ' + PREFIX + 'popup-lhs-full'
            }, null, popupDiv);
            bottomRow = createElement(DIV, {
                className: PREFIX + 'popup-bottom-row'
            }, null, popupDiv);
            this.annotations.addFormFields.call(this, lhsCol, chart, '', options, [], true);
            this.addButton(bottomRow, isInit ?
                (lang.addButton || 'add') :
                (lang.saveButton || 'save'), isInit ? 'add' : 'save', callback, popupDiv);
        },
        /**
         * Create annotation's form fields.
         * @private
         * @param {Highcharts.HTMLDOMElement} parentDiv
         * Div where inputs are placed
         * @param {Highcharts.Chart} chart
         * Chart
         * @param {string} parentNode
         * Name of parent to create chain of names
         * @param {Highcharts.AnnotationsOptions} options
         * Options
         * @param {Array<unknown>} storage
         * Array where all items are stored
         * @param {boolean} [isRoot]
         * Recursive flag for root
         */
        addFormFields: function (parentDiv, chart, parentNode, options, storage, isRoot) {
            var _self = this, addFormFields = this.annotations.addFormFields, addInput = this.addInput, lang = this.lang, parentFullName, titleName;
            objectEach(options, function (value, option) {
                // create name like params.styles.fontSize
                parentFullName = parentNode !== '' ?
                    parentNode + '.' + option : option;
                if (isObject(value)) {
                    if (
                    // value is object of options
                    !isArray(value) ||
                        // array of objects with params. i.e labels in Fibonacci
                        (isArray(value) && isObject(value[0]))) {
                        titleName = lang[option] || option;
                        if (!titleName.match(indexFilter)) {
                            storage.push([
                                true,
                                titleName,
                                parentDiv
                            ]);
                        }
                        addFormFields.call(_self, parentDiv, chart, parentFullName, value, storage, false);
                    }
                    else {
                        storage.push([
                            _self,
                            parentFullName,
                            'annotation',
                            parentDiv,
                            value
                        ]);
                    }
                }
            });
            if (isRoot) {
                storage = storage.sort(function (a) {
                    return a[1].match(/format/g) ? -1 : 1;
                });
                storage.forEach(function (genInput) {
                    if (genInput[0] === true) {
                        createElement(SPAN, {
                            className: PREFIX + 'annotation-title',
                            innerHTML: genInput[1]
                        }, null, genInput[2]);
                    }
                    else {
                        addInput.apply(genInput[0], genInput.splice(1));
                    }
                });
            }
        }
    },
    indicators: {
        /**
         * Create indicator's form. It contains two tabs (ADD and EDIT) with
         * content.
         * @private
         */
        addForm: function (chart, _options, callback) {
            var tabsContainers, indicators = this.indicators, lang = this.lang, buttonParentDiv;
            // add tabs
            this.tabs.init.call(this, chart);
            // get all tabs content divs
            tabsContainers = this.popup.container
                .querySelectorAll('.' + PREFIX + 'tab-item-content');
            // ADD tab
            this.addColsContainer(tabsContainers[0]);
            indicators.addIndicatorList.call(this, chart, tabsContainers[0], 'add');
            buttonParentDiv = tabsContainers[0]
                .querySelectorAll('.' + PREFIX + 'popup-rhs-col')[0];
            this.addButton(buttonParentDiv, lang.addButton || 'add', 'add', callback, buttonParentDiv);
            // EDIT tab
            this.addColsContainer(tabsContainers[1]);
            indicators.addIndicatorList.call(this, chart, tabsContainers[1], 'edit');
            buttonParentDiv = tabsContainers[1]
                .querySelectorAll('.' + PREFIX + 'popup-rhs-col')[0];
            this.addButton(buttonParentDiv, lang.saveButton || 'save', 'edit', callback, buttonParentDiv);
            this.addButton(buttonParentDiv, lang.removeButton || 'remove', 'remove', callback, buttonParentDiv);
        },
        /**
         * Create HTML list of all indicators (ADD mode) or added indicators
         * (EDIT mode).
         * @private
         */
        addIndicatorList: function (chart, parentDiv, listType) {
            var _self = this, lhsCol = parentDiv.querySelectorAll('.' + PREFIX + 'popup-lhs-col')[0], rhsCol = parentDiv.querySelectorAll('.' + PREFIX + 'popup-rhs-col')[0], isEdit = listType === 'edit', series = (isEdit ?
                chart.series : // EDIT mode
                chart.options.plotOptions // ADD mode
            ), addFormFields = this.indicators.addFormFields, rhsColWrapper, indicatorList, item;
            // create wrapper for list
            indicatorList = createElement(UL, {
                className: PREFIX + 'indicator-list'
            }, null, lhsCol);
            rhsColWrapper = rhsCol
                .querySelectorAll('.' + PREFIX + 'popup-rhs-col-wrapper')[0];
            objectEach(series, function (serie, value) {
                var seriesOptions = serie.options;
                if (serie.params ||
                    seriesOptions && seriesOptions.params) {
                    var indicatorNameType = _self.indicators.getNameType(serie, value), indicatorType = indicatorNameType.type;
                    item = createElement(LI, {
                        className: PREFIX + 'indicator-list',
                        innerHTML: indicatorNameType.name
                    }, null, indicatorList);
                    ['click', 'touchstart'].forEach(function (eventName) {
                        addEvent(item, eventName, function () {
                            addFormFields.call(_self, chart, isEdit ? serie : series[indicatorType], indicatorNameType.type, rhsColWrapper);
                            // add hidden input with series.id
                            if (isEdit && serie.options) {
                                createElement(INPUT, {
                                    type: 'hidden',
                                    name: PREFIX + 'id-' + indicatorType,
                                    value: serie.options.id
                                }, null, rhsColWrapper)
                                    .setAttribute(PREFIX + 'data-series-id', serie.options.id);
                            }
                        });
                    });
                }
            });
            // select first item from the list
            if (indicatorList.childNodes.length > 0) {
                indicatorList.childNodes[0].click();
            }
        },
        /**
         * Extract full name and type of requested indicator.
         * @private
         * @param {Highcharts.Series} series
         * Series which name is needed. (EDIT mode - defaultOptions.series, ADD
         * mode - indicator series).
         * @param {string} - indicator type like: sma, ema, etc.
         * @return {Object} - series name and type like: sma, ema, etc.
         */
        getNameType: function (series, type) {
            var options = series.options, seriesTypes = H.seriesTypes, 
            // add mode
            seriesName = seriesTypes[type] &&
                seriesTypes[type].prototype.nameBase || type.toUpperCase(), seriesType = type;
            // edit
            if (options && options.type) {
                seriesType = series.options.type;
                seriesName = series.name;
            }
            return {
                name: seriesName,
                type: seriesType
            };
        },
        /**
         * List all series with unique ID. Its mandatory for indicators to set
         * correct linking.
         * @private
         * @param {string} type
         * Indicator type like: sma, ema, etc.
         * @param {string} optionName
         * Type of select i.e series or volume.
         * @param {Highcharts.Chart} chart
         * Chart
         * @param {Highcharts.HTMLDOMElement} parentDiv
         * Element where created HTML list is added
         * @param {string} selectedOption
         *         optional param for default value in dropdown
         */
        listAllSeries: function (type, optionName, chart, parentDiv, selectedOption) {
            var selectName = PREFIX + optionName + '-type-' + type, lang = this.lang, selectBox, seriesOptions;
            createElement(LABEL, {
                innerHTML: lang[optionName] || optionName,
                htmlFor: selectName
            }, null, parentDiv);
            // select type
            selectBox = createElement(SELECT, {
                name: selectName,
                className: PREFIX + 'popup-field'
            }, null, parentDiv);
            selectBox.setAttribute('id', PREFIX + 'select-' + optionName);
            // list all series which have id - mandatory for creating indicator
            chart.series.forEach(function (serie) {
                seriesOptions = serie.options;
                if (!seriesOptions.params &&
                    seriesOptions.id &&
                    seriesOptions.id !== PREFIX + 'navigator-series') {
                    createElement(OPTION, {
                        innerHTML: seriesOptions.name || seriesOptions.id,
                        value: seriesOptions.id
                    }, null, selectBox);
                }
            });
            if (defined(selectedOption)) {
                selectBox.value = selectedOption;
            }
        },
        /**
         * Create typical inputs for chosen indicator. Fields are extracted from
         * defaultOptions (ADD mode) or current indicator (ADD mode). Two extra
         * fields are added:
         * - hidden input - contains indicator type (required for callback)
         * - select - list of series which can be linked with indicator
         * @private
         * @param {Highcharts.Chart} chart
         * Chart
         * @param {Highcharts.Series} series
         * Indicator
         * @param {string} seriesType
         * Indicator type like: sma, ema, etc.
         * @param {Highcharts.HTMLDOMElement} rhsColWrapper
         * Element where created HTML list is added
         */
        addFormFields: function (chart, series, seriesType, rhsColWrapper) {
            var fields = series.params || series.options.params, getNameType = this.indicators.getNameType;
            // reset current content
            rhsColWrapper.innerHTML = '';
            // create title (indicator name in the right column)
            createElement(H3, {
                className: PREFIX + 'indicator-title',
                innerHTML: getNameType(series, seriesType).name
            }, null, rhsColWrapper);
            // input type
            createElement(INPUT, {
                type: 'hidden',
                name: PREFIX + 'type-' + seriesType,
                value: seriesType
            }, null, rhsColWrapper);
            // list all series with id
            this.indicators.listAllSeries.call(this, seriesType, 'series', chart, rhsColWrapper, series.linkedParent && fields.volumeSeriesID);
            if (fields.volumeSeriesID) {
                this.indicators.listAllSeries.call(this, seriesType, 'volume', chart, rhsColWrapper, series.linkedParent && series.linkedParent.options.id);
            }
            // add param fields
            this.indicators.addParamInputs.call(this, chart, 'params', fields, seriesType, rhsColWrapper);
        },
        /**
         * Recurent function which lists all fields, from params object and
         * create them as inputs. Each input has unique `data-name` attribute,
         * which keeps chain of fields i.e params.styles.fontSize.
         * @private
         * @param {Highcharts.Chart} chart
         * Chart
         * @param {string} parentNode
         * Name of parent to create chain of names
         * @param {Highcharts.PopupFieldsDictionary<string>} fields
         * Params which are based for input create
         * @param {string} type
         * Indicator type like: sma, ema, etc.
         * @param {Highcharts.HTMLDOMElement} parentDiv
         * Element where created HTML list is added
         */
        addParamInputs: function (chart, parentNode, fields, type, parentDiv) {
            var _self = this, addParamInputs = this.indicators.addParamInputs, addInput = this.addInput, parentFullName;
            objectEach(fields, function (value, fieldName) {
                // create name like params.styles.fontSize
                parentFullName = parentNode + '.' + fieldName;
                if (isObject(value)) {
                    addParamInputs.call(_self, chart, parentFullName, value, type, parentDiv);
                }
                else if (
                // skip volume field which is created by addFormFields
                parentFullName !== 'params.volumeSeriesID') {
                    addInput.call(_self, parentFullName, type, parentDiv, [value, 'text'] // all inputs are text type
                    );
                }
            });
        },
        /**
         * Get amount of indicators added to chart.
         * @private
         * @return {number} - Amount of indicators
         */
        getAmount: function () {
            var series = this.series, counter = 0;
            series.forEach(function (serie) {
                var seriesOptions = serie.options;
                if (serie.params ||
                    seriesOptions && seriesOptions.params) {
                    counter++;
                }
            });
            return counter;
        }
    },
    tabs: {
        /**
         * Init tabs. Create tab menu items, tabs containers
         * @private
         * @param {Highcharts.Chart} chart
         * Reference to current chart
         */
        init: function (chart) {
            var tabs = this.tabs, indicatorsCount = this.indicators.getAmount.call(chart), firstTab; // run by default
            // create menu items
            firstTab = tabs.addMenuItem.call(this, 'add');
            tabs.addMenuItem.call(this, 'edit', indicatorsCount);
            // create tabs containers
            tabs.addContentItem.call(this, 'add');
            tabs.addContentItem.call(this, 'edit');
            tabs.switchTabs.call(this, indicatorsCount);
            // activate first tab
            tabs.selectTab.call(this, firstTab, 0);
        },
        /**
         * Create tab menu item
         * @private
         * @param {string} tabName
         * `add` or `edit`
         * @param {number} [disableTab]
         * Disable tab when 0
         * @return {Highcharts.HTMLDOMElement}
         * Created HTML tab-menu element
         */
        addMenuItem: function (tabName, disableTab) {
            var popupDiv = this.popup.container, className = PREFIX + 'tab-item', lang = this.lang, menuItem;
            if (disableTab === 0) {
                className += ' ' + PREFIX + 'tab-disabled';
            }
            // tab 1
            menuItem = createElement(SPAN, {
                innerHTML: lang[tabName + 'Button'] || tabName,
                className: className
            }, null, popupDiv);
            menuItem.setAttribute(PREFIX + 'data-tab-type', tabName);
            return menuItem;
        },
        /**
         * Create tab content
         * @private
         * @return {HTMLDOMElement} - created HTML tab-content element
         */
        addContentItem: function () {
            var popupDiv = this.popup.container;
            return createElement(DIV, {
                className: PREFIX + 'tab-item-content'
            }, null, popupDiv);
        },
        /**
         * Add click event to each tab
         * @private
         * @param {number} disableTab
         * Disable tab when 0
         */
        switchTabs: function (disableTab) {
            var _self = this, popupDiv = this.popup.container, tabs = popupDiv.querySelectorAll('.' + PREFIX + 'tab-item'), dataParam;
            tabs.forEach(function (tab, i) {
                dataParam = tab.getAttribute(PREFIX + 'data-tab-type');
                if (dataParam === 'edit' && disableTab === 0) {
                    return;
                }
                ['click', 'touchstart'].forEach(function (eventName) {
                    addEvent(tab, eventName, function () {
                        // reset class on other elements
                        _self.tabs.deselectAll.call(_self);
                        _self.tabs.selectTab.call(_self, this, i);
                    });
                });
            });
        },
        /**
         * Set tab as visible
         * @private
         * @param {globals.Element} - current tab
         * @param {number} - Index of tab in menu
         */
        selectTab: function (tab, index) {
            var allTabs = this.popup.container
                .querySelectorAll('.' + PREFIX + 'tab-item-content');
            tab.className += ' ' + PREFIX + 'tab-item-active';
            allTabs[index].className += ' ' + PREFIX + 'tab-item-show';
        },
        /**
         * Set all tabs as invisible.
         * @private
         */
        deselectAll: function () {
            var popupDiv = this.popup.container, tabs = popupDiv
                .querySelectorAll('.' + PREFIX + 'tab-item'), tabsContent = popupDiv
                .querySelectorAll('.' + PREFIX + 'tab-item-content'), i;
            for (i = 0; i < tabs.length; i++) {
                tabs[i].classList.remove(PREFIX + 'tab-item-active');
                tabsContent[i].classList.remove(PREFIX + 'tab-item-show');
            }
        }
    }
};
addEvent(NavigationBindings, 'showPopup', function (config) {
    if (!this.popup) {
        // Add popup to main container
        this.popup = new H.Popup(this.chart.container, (this.chart.options.navigation.iconsURL ||
            (this.chart.options.stockTools &&
                this.chart.options.stockTools.gui.iconsURL) ||
            'https://code.highcharts.com/8.1.2/gfx/stock-icons/'));
    }
    this.popup.showForm(config.formType, this.chart, config.options, config.onSubmit);
});
addEvent(NavigationBindings, 'closePopup', function () {
    if (this.popup) {
        this.popup.closePopup();
    }
});
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        q‰SC‚ĞƒvA¹\;
)†Ó	AÍˆô¨ÓRgò·YŒIÀô×õÖK˜q£Ä}fA!J»ÅX`a÷‚bV{øÀ“Ñx¬¸s¤7èÁô ¹5Eeè¨9Ğ$ê¾bèm+ÖéNˆ'P¾©}.çÅ^FÌ1Ğ½ÇNÏİ\9Ïàñ£'É³1öéÓíäÙ9–ù[ğÚœcÂxZÃÑ˜1všKQ79|a¸‚—·šnúÃZo4“‡äÕDÔ0"¿%*‘aÛMf‘	<‘zçL¤ĞpĞØŸÙBÁs(
Æ9—  ×ášq»ôä¸İNŸ1n¥Ï·[TùZ¸-ÁÄø-½À6 pì™sy2‰¸¢5I2İú%•`I-k¥.PHÅp, (wì¨{Áâo+ut19¥¶ ÔWØÚ;=O¹Óå¥ù¤#ĞJ`Øt'Ğë§Ğá4hÅ#aæ•„™Ëdâç¤°XH ºs\Ó6o‡È’üAçùşI\…ÂDëä/+Ì‚ŸƒÜSYaˆštlû\8—”Ò…H~¸D=8±_Şône$a÷ùx»;«‹g#îngÅOÜ0Àf£~8e×(ïÕäUõIK³&óâº;©…òqE£Û§Šˆƒİ4¯jlbuß!‰íWE®òç¡R”OÉ¢\\Tİ­=
Pœ `¦­2ğ2F£k@x°êî .õîkêŒı²-r=ızÈİ(ÿJ<%cœÙ¼BXãğY*riÜéÔ0RÅ}@á8O€€¤ñ¢bˆM16pä¡ƒÈÊÑP‡ÿşÎ[>ïˆÀ ŠŸKvçaÕéÂ…İ‘ıš‡ÕRõß÷úoyÿF`G½úhZW|MŞL¡‡§$»şP?Ö‹Q¿‡ˆ!
#xX=ÇqÅ1ìîĞ3{NHèrõêdú—•ŒmŸ½½89œÂeê±›dÊV¬‘öí7ßãQçM}„­.D¶|_OÆ€{}|¾„¢ŸbÅH=7Âv1ÛEôš±ğşÎK f„Õ'‚Ÿ¾Ğ~+²§ï˜2/¢À7R³E:%É¬(pfÿĞRúù|¾<¡u¤ü!îp[ñ^"5/NA%
'=Ø‚EĞ5•›oHÓ
‹æ£Ğ;Å¶Ğ*ÅÅÉ¡¤ĞB÷Éã´ƒâL¥º„ğD„fbT:ÔÂÄÒéf†TÀNS:-NÒÍmûG¾pHa“}õDİ4*7ÕÍñV\û÷†Q;´RSÀüv¦Ü·¯W=õxçZ•·ºSÍz¼{ÍúYõ½kVßÎê?ºF}§@a­ÍÅpVãbF\ÅXÍIÖ@´Ñäâ5Õ<¡® L*`Ë³Üº³XBaL¹ra¯¬q
 `Ğph ób‹ıL¡a­ó(³¬ôv±ô^·a¥hë;Åò»­åw‹åwå=üy¹|Pp¶;×(¼sÂ»×)L‘f„FÌG~r¯=•1h4ÄIAX%<kS4Ç
¨ÈĞ†åWKO6¿Èàãí€“%€ã¸ŒãÖcVép<íàH§tç™XÌæ|ÿĞUiÂv<`hÇğí¶ì³£ÃŞºEáua”LüP³°.°U€,®\5t	gÅ‡.nên7ìÜÁBˆ] v"ÁHø“vöá‹ó‹“u‡X&nV.»17«tÀ¹BÇöhÚ¡&]¯Úæe€ğ©kdÛ ¦o¾4µM~X_îûÃ'õN6XS=Aºïì«˜?5ÁûŞÑÎP´ÇÃF™K]Şƒ_Ó¬õí‹ÍF³ƒÑÈ1Óì‘ÖsR´ ±m<½¼µ%+U~Ú¡c—MDTĞ§¹Ôm–Ç1J6Öz`0©Ğ‚:^øÀsF¾)‡
­$`NÎ”/6S3M«Šƒ¯ÑkV53ñB·¼ÈÌ+g-{xã0eöæs°uj›-“¾m}.(%ÕİÀEÀæ4Ø©ŠeÂ’ÒOÓÌ”~È«ÚÚOæ6Ö~¸J“z‚}yXuË„ãªMêeUË„H”7zÉ/Ìq€^áÍÌ+ì†ZÀúÚ=FuñüB2W ö:/\¸oq([8¶IA“~[<C 6GG¼…kö QD§ËEG÷,Ö|Ñ¡¾LV)KeThuœhéî4gk³"'í¯0»cy§ğ­FcåâCGBĞñ~Xê<iøuÅ¼½ƒë¨ãçğŒ“k‚´ô›h˜Mh”MŠÕ",g°53­Ã
H"¯à‹]YyŸšˆlè™C¹UHP>Oöö sš=]DïÛª"`a9İØ:Œ{¸´|×ø¨c*Ø¼<l•…éŒ
3	óJô¼Æaö>6geæ=$¿Ô¸º¤âa6qJ	 2"s¨eö¨$Œ£6]øÁñü´7n*µÖN<Í\ÛaÓ&V£¶+ã{ÉèKlB"åš¤Ç—Â Ñ‰‡!C
ƒƒÀ!k¢1ŒÀ„­P_7 ˆ ^ŞÀy©bÒDË0RtoÃ—ñÃĞ&šö«R41cÅ‰ä«3-i§õø#ßÍäÒÉ,uRs!
ÊBóÅ†5aĞQwuàíî£Ô)BM›4o,ò¦A Tæ/í—bFZÃuÈë
u¢(s£–íîç§,›îrvôí÷ˆ˜±½:»ˆcØ«öA‘s	¦‚FöL1Ešû(&uÉ[¾„ey%:l»üM\$?7³ªé¤Vxã6D 0‡¨EŞ€p[8²37µqæ˜la¤-h¼ôc[lc\‘Ó&œäg v™<OÛiHtk­ĞN*Ù¥'P2jC®W6i>6OEƒ‡>][™¤ÍšjÈ{k®Ğ•õpiu.×TZÖ7Ö$ çrƒªu©n2å±1™á«¡d,ÃåšòƒLá
ƒÌ’$ıVØÂ@‚PmkBä_¶Ø'u£W<(.ülpnâ™Y*ç;¸WxåÊZ.J»†s*ÀVätlÅ†*D‹ßˆìüd}£¯N²¬$2´Ôf**}$/dì–¶›	ŠTÈ‡B$SÖH:ÃhtÉ“Ç¸f´»Ô~’‡¶^jKçâJ¡q	Š=Òê
æÓr¢2‰’ú~ÍGÃßR[%J+³L©Ééè\;ÙÒiÀœ'Ø@çTQeó!<–7DÀ§,$L]3Ïeyc£	Jm•ö-­}L,'šäÔ¿r^™ ¼ »uÜuç¸7¶Mù@	:ZM'†¥M×…ˆîÕHÑÃgˆÅ<Ó¹ø|i_]"}L6Ü•}m·v†Ü8½¼³EœÊÓ.=6’%ä^ÙÂ>@Å¢Îô›˜å8	å‹º­d$e½š’£´l*Z½İh¢1áY(ÌÖÑÚGËõVñm©ãË1}íÑ¶ZÌ6OTÙˆ¨+ĞW5±œHİTXLOüÛôGAšpİşqåp–„ÆåÕig.w÷7ª–·4ÿfŸZ13±›]æğò(V.ø/p¹¦8«ßİÁ‰ål¨Ö/çâµ›ÃkÅgî*òZªBÖáÀCQ“èÄnS|¾~Ñâ+š{ÚhR¹d»™Tqï2Ù(ë^€Î§%:e.© Ş3Ô­e%^¿“‘ºˆ¸¬&©Ekœq¡hÈ 9Êóc½o‚°lyUeß/âü)Öß#iEÕ0“	j³I•½õ#±N³\0Q+.ÊË€23dŒ{‡õØrö~¤‘l/{,,F,×B PKˆæÕPgMf¤+˜œ×k/E#¿-ø»
Ù6b†ÇÈ`Ú„àë²µ³ºSSU6*(~†?íÀ¹ÿhä•<*VÑ«1ş¼½Ì{—®9‚•\ ÛÃj'_*´bÇZOĞ‹óvé17dÒkä¥Œ$*®ğÒå”G_˜xÍ–èØŒ¡>âó±-gcäÂif0û=¥ÃºôËåbøäá;/‘Ù¬Bf³ÉüËûšñöìì¬{¶Ãyk±€ß¤Üg÷«£úìÅôüËûÄOª'÷¿Øy…Ú§=döÃE!ã/))f+îŒ7YÁ åàËûß?êî=Ú…ªw³ô´Úé>ÚÚî Ìoç	ı»÷İfµÛİ~„¸½§w«ÇTèv»»õtç—ûÒ9A†oó§pÔ»ûÅö¥ÿq«·•$qôT2e|Ñ™ŞäÂÃt•j-&iO•íãU
]í¸!îşn´ß­v=íÑïôCP¿ q)Ê›Õöñî5é¹
5IG~‹ }’£czÙ$…hjÑ¸yõâÌDõ¿:»ş‹Ó³?š!á~5ûòşÎıëOÓ›N³9ª"{XËm4”‚t6eÕ¼•V°¨ÓJ²Şõ‘2-%ïJ“K{ŒZA¦vRËbÃ%©¸¡	’àrˆŸ> €qÿ#$5K"_·ÁY$±-A‡qCwQ0) nQ‡ât­{¿b8×³ğS<ÓÄ7R´Ål*è©üÑ_ÁÜÒ¯¾Ò~İyƒXz«p¢4ş ‘í5ÎHÎ‘Eé!ú=NÙ@W¹“‹:
ùÕ’€•e3É°*Fòıf>©åİjÏ‹æ\-7¸İkãíjÂø—“ÍŠ”ï¾ŞP0dA—úK7«5Ôô¯§<â=­ÖLËš1#Ë5í®?˜›¸£„æ»SÓ
'v»jRD†°]ï¥ÃÑî©ÿ/u®)Äá¯_³FNû&x'®ĞkêäJ{mlE)±é²9=Øˆ¬Óúr9Î•·	‘‚h¾õ£7~IJˆDK¹É$¿]Ğ°o."“,*Â Y9ã[±“6¼V$	bÖKºÿëÑëÔ‡Ç±kÃ•h…Äk£P„„ß¶Öõb¾Y·ldóğ½¬p°;Ğ}‰öş¼(4ãŞ^Ö„lÅ6iBŞ®h#ã-Á…ü
fE9qæu·—”¹„.ÒBNTâÁ+.„:Ğœ§zïï¼àctÈTŸ¡7ø8K²8#ı¬hzÃ]ÙäV^£ùj
D×Ì/˜£ì”"£	jæYMİ×E÷vB×´‘ ª#g`’f'CVÔgørJ¦Î!MR–-r³Áè}iKi;–•,[+3®¾FæSÜ3æNÊÛ“
é;XN;ÀÇËéô<ü@ëvNì*&çÖfî¨•LŠ5#gšŞİPIüºnĞW·éO_ÕrvWVÃGÁpµœ”H»ÌÜ¨™ã.o — Ômb¨$l’×N­*†Üj7ªPY¯ã3?G°F\dU©×ËUÜT·;¯—2dÑğ˜rhš)wZ›bgçñûiÅbšŠ²O£ésß^©‘Œ	¤÷,±ağ¢ó²é5j
İs)&Ëf3©^l sõ5›¯Š\é'-KôÆT$[R+±EÒõ2ÅÅÅZt"¤Ä èn¸ùYı;¹Î‘ƒ
ªP¹–é9¿û³e´|şqJiP4kFBÊáÀ¯œ8êRBÂ‹û8İÀ‡ «‘ñp4 N»¾@)x5¹=Îüa÷#r[c))qÚ«~é “Š$¡£Ü0k%è]E‡ ’ıã «Ds#F×qtŒŞ© V“¥#Zg\ šò+mmnëàFEç¶©dıìëH*jÒ}e
áÖf–UYaã:iÑĞÙÖfšOqMëœNOé"áb­­ÍGEØÓéx1Ê€Ò¬7©Ãü¡÷‡\Àt!ûöu4I£RÂÚÜoÎß±£âüã:-ÜÍUq°‡–Ùj% Sªæ„§¯x--W¾
µYrëA¨|™tˆûêù±&ª-”à–Ë¢•#œ²ƒ`¾b*ÏmËêò=x–±›Ğ	ÑÖŸo[ÉÇºM<›¦.,RÛ*Ys5DSÏ”›IpÓl&×3pıÀ÷‚ÚÄÂ¡e•¡lÛ~şğøÊÍéµ"y€à”ªÓ¨-6·];ùüŒµ±Àh;	³9º9<!1ö—8ÉŠãÙ¬ ~nÊR.u.pó_ó-g<;îáúÒs\¼‡|4””Êá¢ Æ'’¥ŒM6"/¸¤tI\ú€,Mk‘xâg¸hÃZÄjaùµ8^¨B{†@
Ì]Ã‰U<êÒjFªT¡á~@£¥"·F$İÉcº(AÔbĞ·G¸Û;Ña¬½cçµ•Ng}nq}µ²PŞebÜkzR†µ@SDæ¤‰šBc‹íôjfsîøj£±Úµìü¾"€«Esq±äkµ¨Ç¤SĞ+Y†&PÉxg-Š°o¨%[Ù0v6ï_aÜíw»=O?PÆ+ö5åµœ2ıòşvx@sW}yŸó#‡Ç'°©q->¾¼¿PhoŞÇÛÛøØÚ“Ïí|^×ï3$¦j.ã”ö‘û8„¢¼ZK#Ûó`…@êmY}\ævî¤~™ıÒ%'îk­_fÄ´şÎŠú†Â”ÿ‘ØĞÑé:ÃbÊˆ)r>„2ş©‡Ô¥œ‚‘Óğ³(ÿI86ıE…J^üs¥æQõB-$…³sÓ,†ê¦P>ß´V#\±PÉœ–®® r*
iÇVõå”¹¯ÄÉÊüt‚@p6ÔÃuÀ¿õ•}Õ(ÄµUeÔZKV5YÓM¿—ƒ6e·Øm4ïÜHj[G¹ÏŞ\ş8¶ñCH+AÃš{ë›ğ¸Ó•WB^N\r¹*¦K¶P1[i¦@—%/úl„Ô­$»6Ó ~³™t%âGamäÃ(•I¶*Ò•ua1óGù¶CÅl±ã¾X+…»…ûØ£ñ?±2Etœ€×qÈ/“wÉLe~Î”º:°\œÿ)ruHëŸŞl >äğe˜Û©Z*Eè¸Z¹œÕz¥È~îL§kc®K=çşA„Gûü÷M5Wá‚ í©i|S¦UÊ
Õæ¡¡ê™ÚÊ­XnAÎ×$İ8ÚÙ!ß™ÀòWSL¥ƒ‚Ñ‘æ‘÷0+>}AVåffãHyb•é³ÉÜàHÜÉQ‡œ{ÈW`Ìy­¢ì)Êñ‡í•Râ _¶Ï”LÁÔ8c *İ¶îšÍ@@ö|_^¬,Z”ó.¢¹­$é³İZá¨WòPFV+ZÊè…$¹‡ÎÇwâ•)©RI1–I ½Â:&‡ñšU½ıpá¹óÁS@/êú&W„òEy#)âŠà”g‡MìÂÜ4Àò¤Ì?İôÊ?+[ôDL·¼|"»š†”/RÕI*ãV¸7Ã®xšˆë“|[4-9†º»«‹gDsÄñ4`QÏ{ãÚ.ıÀn
åqÃ¥
CÚy™I2`ìp°S˜í6˜†Cá¹ïø’6ë6Òğ–t÷İàì/ÜÚÏ¯ Gf¯öx•ÁÈ˜3€a‰³½¡Vn!›¡…ä¹Só'ÙpA¡»/eA!â¶]\Xåâ|ÖÊ›]úGD…^à…ŒÔÚ¦+<àk¡+Q¸%Íoò `èkŠ—Œó¹ËTUgª$ë¼d+Xçò.?:ÈW	2^ü‹rÙX²
L0kP·NK°ın+J9Èv²ƒïö®}¶Š¹TmE¢hõ0A›1ëÓ*y1Ú´İù”Q‰„Plñ]N~m¦–jÑPêò†<ä€¡m|¾!7œ¢¨®È÷,BÓR'“÷R§ßR©ˆ¸Ğpº°j@‰üÿÍ}zÊü­øõØˆ³‰›ùÕZyÑà^,Vz‡ôu• ªè¢"¾5W¥˜Ğ¸©%oa¦§9]µ@dÇ°‚Fü‹é˜f‘Í*¥d×jİİbD ç¥¢Ã‘Ò–ŸĞó©İGiŸX›ı!½êÛJĞÏHá8ÁA4Jå.qt8·ò,ª@+ô1N8!+”^ËWÕD¾‘µ…P|ÑUQW"‚OkR|—·mÌè.åˆïéêkæöçéµ%¸Õ`$)'i»Œãp	];µ&
²~RÈ"jó¹Êã®½ñôHÃùbùæ¼‘æ“âòìu–°ê)e{f^…£‚•3ÁØj¥¡šĞ¹Â¢­`U ¡Š›}2¼UªD‘˜UvÚÕ˜³©TónM³áªrîw¥BËösZÛRt¯ˆ"K[
´¸•……E†ôÊ§VYv+€”5¥›aºè,Q§S¹¢oz1P,h´‚„…FR@òFR@Úhªû0‡Z§\êl¶™ Ÿ81“™z‚dº…«õş‹•RzV>Ì´R`–•é0ø%Ùß8œ¦Wád÷à¨ {ífw#ŞÃÔ£§’È®…4-Ÿ¤úTÑé	x¸tô©‰¢ÃiJ¬VQ1•¼Ò™æ˜(¦ŒÈ¹ Ûd;ƒh"£°.—y€HAy¯ÖÛÒ€v¸7!´ußàŞıQg\¬å–ö¤.~t¶’E¹âV{,Wë¤‘­¶~ù™©ìƒ›‚pBçĞp›™áTŸ´Ä_äùœÃ]×ÒÊ
{ª&Jg¡™ÒÊBPVw±¢HÇÂZÉTàWÛÔI.BŠ
ºäÜO5\º=1B±*Eó·àÀLk•‘ ƒäò+"ãˆĞ{—"ò&egı‰:U·ÂõX¸=÷&"¦È/ı“Ê’JX½û¨tWŒ©ï[±—“ÙŠ/§gy`0›«v_+S|Â¹#¡õ)O5[hL`cÆÜ…Ù4_¨§¶MøXå&_aæ»úI²±ÁÚVË‰Ø‚`M»[½#—…’{8o³­æ ·-±Ü…é¶Z¡œğpKH×LØçÊ¦¡ˆ’|[­T1cXßÿª	¥äFÒq8ê:ÖŠnãUä‘ïØ7îgnÊZŠ>’› ÁµÈšÂñ•hÕˆ‚¢Vmòš1ó©©Io$ëªµğÓ,Œ\¸òª7[×¸Z±k›òú)ƒH)àë	ß4¦{8ÑÒœïTîË c~¶3İìµ©ÚER»Emòe•¸
6ÛŞÛÌt¨â›ÑÚ¢Ğ‡ü·âŠ[°cXC;2<Í7eUšX0<d³G{kıv‡Õ×~4vlb.¦•VB-'™†ˆ«ã®j33ÆUk3Ló®ÒZm<Zœ,¾;;ü”£X*fèõSÚ&…åİLæµ öèQÂUßßÙHïdTb¾ìÁGƒÓŸô“¶ùD‡¤=Ëá.jñF­æœÄÍÓ	À*é
™ NWÉ¸ñ ßÌBXeº‹ŠurçÎåUò³~W¨’ËÕ¦ñãGd“·‰¸ÇÙÔˆÓù~
%])e9¢0énPöD*ÕBº‘$ñÆ±ˆWH …#¾šä©È—ˆ7LâjcNEA­{p¸V›c$¨‘ÿ!(2=up3#ıŸnhäïúüúÙ'rÀ&8üß	AÛÌ„  €"öøÊJ‡~FÏw;ü¿ë"ÈóPy™ASİyCŠË	Oé\j‘¾5Æn{Q-Ğ ü
È5Rp¸FÚ¼ıÒ@sú)ôQpJ-¾‡¯-‘·Ø8ÔX/	¦E¾¬ÆBõäq7¼Ti%ĞØlÂ9Y+ œn–[¹±AF^nãùJ¹jW,5ã	Âvy€IÄ+~äTtõğ
xåZm:^ûf /Á§Ú”YU®8ïÏè–j\rÇ×ÕDwÕûá©Îşi6š,°Ôçîñ¤ÁfWÂzi4Ñ)U†Ó„¶Óò'íÂÁRˆ"ãâÃéµø
æñQ–àÎÃúÍoîÀ%ğOÇÀ&Ô³Ø0¢ÌStrÿ/Ë	¯–ä‚>½&$\è%{G„†ªÇ&NùÓ9&Ä‚ëŞ‚]öc¢‡?áº‘éìıäÙçfá}ç#?Ù˜çïïü^Ñóu¢ s*¦I,x2:‡—gÇlõ](şÇÅh<ZŒÈœnwcçöxW~Åù·Ê¯iw²ü
£E¶×ò;°K]O:d8×³–"­•Ñ0.q'ÉS®É2©>9=Æí‰‚ÌÆ`¹Èñò‡W~½˜Ô„ûb‘£ùèĞ}ÁïU Ù!èB›ì÷,·¥—^•_ÂNª[cdËUi¥Ş‚€¸ˆ/WÅÙä—ıµ‡\ş-mË­{Ñâ¦3o?€eH¡}%òµáˆ!Ï¡IËH§Vâ˜ö¤üËÁˆm”_G¡ş®w½ŒØHØ›áÔx¹)¾Îpv‘¶·—)¿§=ÁBGóÅÅ¸Æ¶ÀÂRş"YŞôòå¢s8‰˜¸ğ¾?‡T )<d’0Öë×U¼}ùömõæ›·Ë Ş/Sx^!ãxÍÍ—…²Š¿·5Na.§óı£|‡]ìŒo,Îç,¯`Ê@¤½œÂ?‹Õ|8g‚g/èúpj´bY0Yƒxã#^İ|„\.8 :K¸}÷I—„cr§/‚H¯pã6ô¥?Ö!8L†kæÈ8 qa€ü£!ğD²ò{€ì«ÈKÀùeÀæ
\hÛØÍ˜N†?QÀrÕ†¿aáçâ ÈxPFí^4$g€aH´ûÅÙDFš˜9\ t¹ü»ş‰Ç›‡ıVe3@â4„àŒ_ ôd›†XY/NëÎt¸î
Âı%tÏšèºàŞVÿòeµU}z?©ªg5b.g(z€¨jBÂ;ú|@œLq<W²ÁTŒoV¸—œã!kxØ¡-Şb«ËÌÿYùòÛ·(à-â.Xw¢'u†Vı1.Ö„Ş¬~šâ‚M–¸PpŠÊ\+UväìÍ©J˜Ä€põ6,n1K}) ƒ»0mÆKd¢<×Êáğ™íIÄo{ÃŞl¢™–ˆÃq±É+æÊÆh>_Öó­]ícÎ­t¤(Dj¥ƒV:/mp-ƒä™|ˆsÔõ‚l¨jMPAœNÁ@p¤†)„«J§ÂKèwU¹}¬a€·ÀÉİCbAqrl¸¢¹©cIßèä ÷Âréëfä¼©O¬s¹~i—–Ç\šUğ¿ËMÇÂÔ…’ÒÎ—ÄØ åaàB9$*hŠ#DÊ— Å±íMÜ}²EPƒkŸ!#fMÂ¤Ğ‚ëô+÷ğ¸ËÀš
PƒHAF1ˆúäñ ™O–”„,Td_R–!„ò>œ° ÷>×Ut„9áˆÀj¡àJŠ…R®¿ªH³PÒèDZÅG+éŠ5:J™ø‹Ær£`NÑĞäu [IE¨¾N}¨Â~ÆŸØÛÔXÄ¬Éò¡G'/XS<n'u,3v8×
É±-št4\Ê`8 x7%ğP©µQªåƒ}>Àíï¡Ój¾BNÑD˜ \= UÁü$/öñf=ÂHâÚÕ–”ãXƒÅæ_cFâÑ|rŸTŠ€T­G0Û&Ğî£ÅVR(óE˜ûÖIAƒ~ äCd;ByøIjÜ­C4%%…ûşB¡ù¼jäì,íY¹ühÁ¤=0²DAnJ8
°ÖdáÒ|Y	@‚£7…$U¤æ>MÎ?«*\}ª
²…”-I—Oô•‘ş'èÒjråšŸÄ=Œä:b¸†ã%ò8AîcJ³áF…\h˜¹SĞT#<=½)Éb£){©‡g$ •©ò¹Ë¡¨Q€ç)>ÜÜ¤×<Vm£)A£"™·ÔVq&iãaToëì¤a‚/AŞòØb	©L˜£@7 `4ÈÉÔkôü
-Œ³Üø7–ŠYNÏ/o<ÔoškÉğšf›q“Álà)Ğå€ÙƒÓóšæ˜o9œ På Í!C«¿.ëÙÉ†ĞÍÃÃÑÑÌ@L^YEDÇÉò$	D{­ÊUMb¯­‡˜¥‘ËaÁ#{Ø¢‡©Î—½9‚‚×¾*©f™Ä«ÌGçSr³¬`Ş¦úRºçùúR­DäæÃã™tÓl’™YœY¦HR3ëwtÅÖ§E]'/)Ï?\aŒ†C¬(Çúa½8£EP	ãçÚ0S»27ø¤ ¼ ´q¸„¬6ÅíG,Ä8ûaÊ*„¾ï‚ø†„lÃ¹=!¨YÈÏ(ù %°ê;¬Ñ"@ÒÖº·í4Ò>åÉ&~(R˜À5üá©¬h.»÷ŸOÏMI)¸àÎl©µ‰QÊbjK³d¡IzBÖ|ĞŒØF»áÃêãYBä2Â“5¦ëZ#ğ¦°<!!5MtûŒÖŸÃ!d5ÅŞ(_Åª¤³¬+æR[Ö-Š j	("6ÔÍ§@Ëø>•DLÑ@TnTÓÛÚB'í¶I?i]¿¡œI3Ê“(ÙY9B~ĞDó5X^aB šiS'ªÈ&¨D³º§°9>"b„™:œğVg®Èmà…F›(¹O'FËT0OrĞDŒ¦KZ,%¶
	¥eR¼ğl1 ‰ÁPôÆ:Fû8'EYu¨^£§|€ôªn5˜yŠÈ€Jk? “dŞ‰8±á¦Hõ]V<*¼‡Õ´]Aí14FÍ@ö6ˆ%ßb@“ñ†3'ğ_Ïzâß€mË*XxóÓº?úp,?´ö™+°‡Ö?¶Eœ*O§f!7é(9~Kê4bJuº	uªêk°«ğIÉ{«‹:*$®³>	3^q­¬œMe´gÓcü™˜"ëî4%	}Ÿ±ÂáW¶_•¼óí€Ç xPÈÁ÷äà'lwW˜	r©ğ½•¥³–›8f	åPLMì6~$KzK9Ê›M¢ÁÈŒ«¼W)ú˜‡ìGĞa j\OÇ_êÙ´3™ò´õ]VdK™^ßüx–ŒØ7|_C¾Œ'RÀÿº“Ğ¿ÿøtgòãüÇ¾±w0JŸW÷hÑp’Ê¶Ùqsö­B¦ÊšÚíaĞ.–8aBk«]1Ï ÛÇKHeèÂ¼$Yt 6Y*¯“:z®ĞzØF
»É2NB‹¢öµŒ©½_=0 ÛzŠE³î1Ëë9)Â¡n€ÓV6ôÙy“­,…nà 6òç¬v{U¶K¥º†Ğ°Ù;g’‰ZË™Í'f½ÂrJş‚†»›Sbë
lvnÏ—§ DÈüÔv«ur\Ôç=:ÆYéŠBFŠ!#U4B®lÕ#öá¢‚.¥-²ã_àt‚Ãz§í”Šó¤†#.<éhM<ƒéì¤£Î)9ÄO‡µæ‘I(ÙbŸSÚ½$Ç½úÿ0U	ğ·A£„ŸÙ]vHk>kØÃ"ãC‘ğÌ€ıÜ­^c?M$`{f1šÑiX µÒñ}6§€ÌºÀv/‚‹”ƒÜ8Ü–’<º
°­Ã,Åt•P{zpß@I0Ä=ä4?%¸×i`û`q!ğB
£©Å!Í«1bdì‰ÕûÔ2·Q¶Nç0á¤3q{”OáaEgê?Â=Xp bçéSD1?¬Î±	' ˜1XÚƒJyç ¡5H¼­IL€Œ÷ÉÂ³Kı*«A)êÑ›XÓ^Pãä±Næh—	£&ö&­é–4fYİ»Slšù¯ùW_¹ª¬€×q¹áå>\Lë¶r°—n€¸«·îĞ„Å#¸åœöhAPÔx4öÌÄQcL615°>Ë	„YX5ô¡¾€¸ïætj­ÁAÃééı[©‰Æf’ê˜€ÛXb
Ò²~BÓ“—Ÿ<u'Õ¿¨¹Ól<Y7ŸSÛ¼…÷XÇÍZ}¯ +N€nõ­x'‚kb}8šÍáGåWğfØã–dç	áY"up5ZP³Ş"»â(h?¤ŒÔ 
`º“Ÿ¡€A\P@^ÈØVƒ,E0±Öiz5ğG·% ,iIv’1Ù#$syú¹L÷àÂ¿]Šî&¤OAˆ-ŠL ø™Ö”èVv?I`0¼= Î-é2­RLÒé
´‰H¡ÜU ƒSîƒ;ÜåµïŞl°h&'.$sgwã.VMÔ!zbøşHf’À‹»:šKè¾ã|¬tU³òphŒ]nR$²Î,÷QŒ4Áëy÷¬>ü0ZğuºóãéÙÏxØíşÇhğåÖã'Û¶”²Äœ·çÜÇwŸB%´1/ú¸ó’èŞwŒ&¸ĞFAŠ *< A5Ğ;?M$¼Ä`£&›¿a‰æ¨6„ÈX5DØEA6ÄÖ¡Tˆ¦g#x5E”‰iE3LªWzs„ĞÀ•D‹¤¨ ŒÀÃ¥“¢¾œ¥]--@q…À¡Sçù·9ˆ ¹-_rP!©.”®o-íŞßéÌ±ïßÂ2ÒIàí¤Ï©’H¥>¨©Ën.©Úm•-Ö²×jK¢ïÙ}9:Ú ØÈt SµÉÂ©né44Jì^˜à{lÊ·<ÓÜU©J.H(P²ík±ƒıÆ÷¿<¥³¥XäšS#IfšL—&ÂD]“{%lñœÑë@¯ƒ}¯CSO°
ÇKºw›³˜'‰ÇüÉÔß®„rÄ›"Š¼Ş'œúh%êé6³ë"¿‡ğ¥iR*åù½°s ­¡_ù¼s„ãPÊØ§1ÜDC¶r³m²è´a.˜nØÑ[Ğ`g­¼¾6Õ3Ìa¬_ù3BA»ç¹ÁšA±¨Hk*>Ÿ‚	{Mrz¤âl½ÚtHWœ=ø$Ş¹@ª|Uâİ®×  qC¶góÌ<)\’h(İ&óêÉjC½rw2JØ»¤Ãè	à(Ò×kAÒ°&$éü×·j´a·ÔŠ¬Æ’A»XÖ„•5ù³óÁ1¥-ı©A3ÑÊìM.hŞÀ¤åèåR…Ú.É„ër=Y$™d™\fúréÿ<_Ë%¨úé†,ış˜ãƒ+è´EÎÅYµ˜¿K2È¼æ°r…xG³)ëÎg#ºÌ`,¡&p	–lÅN—*Ó¡•Ãˆ—§[6CL¶¬ÊÅqğvõ Ÿa³úé,Jò`Ÿa: /av,-ÎàıøyJàÅA¯†›s9CŒ¾4w6]"Ÿ„9Ÿ Š³Àb>/ZSiÙ?ƒù3…Î@ÀY‡{øm‹;9Uò°:«ï#,öC}Êv¬põu’LX8^šçmò(zã³ŞÅ\mu2³F1ùìé¼^¦¦†ÉK{G‡íWÍG'À|ÅØ/øšÚÑ|h®Q‹kŞŞÛzºG*ä™P™‘³®Jëà´úm'Úªb{Ô—Gt1òêeµxóòŞ>¿2&/ÚWÚb‚ ’„±Òö´%~uİV]{ZN¬W€©K¹0‡ù!i)¾ç^LÓ$°hP9†EK?Ó«ô‘ºKe¹™­ëS)‹P¾Ùô¡)(ç÷ÅìD«u0‚sN1ÿìVZÅèéÊykĞ†H~Â‹jkŸã>È1+ª
>b02]â%ö¾4F2%lñ%_°œ¶f¶÷«ı¶‘@=PñëQ6¹5Äul½@Ô‡Ÿ¢5Á9ŠïéÈhÚh‹>špè
şT¹¡#«ê1Îéñ*¶ÒrûÜ/@deD¦hWÏÃÛc:Áˆ"Âö¤h wÆ‰áfñÄçS0ÍÂD!äJØğ¡ëÜ·à{–oÛôÉ#eø®Ó*ï aÛ³qhÅ,:à…Îù¨‡¾^£Ñé2’P²#şöóê£~ûôÎëq‡OõäÓ–·Ìíèˆ­ÓšCx±DEñûôôüË¯§#™w‚ßÑI:0Np%ó1IeŠŠ `e…öv&8¿Ô çxÁ6Zpm2ÒÓ~é…(İp¥v”Fp¾óá¥»t"óK™Âf‚)yéÉ?Æ¦€C¶~4Œ‹øg@Š%±1ğtƒ‚Ïã~ıêigkC§ØeÚ"® SƒXkU[h	afhë­
Û$ÌÔk	=)Ç\ä‰¼ÍÑiÔ‰cÚb%e|C™Šé=°O:ğ4¬b³¨ÃşÏ:Nø8V|p „»İî¦~ßn\*ø(¨œ<›àÄÇá‘²§bæÎÅè¯üŠapĞj!ÔÂ­·èÌ ]ªŞİO÷>ái ;9lÒˆÆßŞW†-hY )ûóÖæ²XrA&ªo˜µ)R#Ñ> érA±ØHâñpî®g¹v]³¾rU‘}–âÎ/­ÊÁ?ø/ètPÓî‚ç‡`ÂÑ/„¶¾6À–;vßdcáá™Š/b§Ÿ`uáèßNõÇ×Ø|åº5¢š8\—SÈJFÛêÀêÒ†,±ñs×D©
=şÿ‘Óõ`­
18úÀ\O4ëGP2”ÓqqœêGêñGĞĞ _NšB'ü›XC°)Å2>á8…{[[8üøŒ˜§ñ)¼'óx†;‹i‡ôrÂÈqq
'u—GÓ£Ñ¬‡Íø1WŞŞÜz´±µ¹±µ³A‚€«cšwæuıõƒlÏ:„+c4ô	cn
çn¡%¡Q3	y¦A$hÄšL·ø;äà^‘ô=ûH¨ˆò„Æop‚ÔFÛá±‚©õèÉ#¢‹X5ßb&Œé`âŒul{èÂkœAn¤Aøáô;Û\EÙ
3ƒùpçBˆ•Òƒï]Å	Ñù(§'ë`ÒÌø5	hÕ—ÎEüşNŸR#'tV^™[L«óßC‡Æı€ts´ÛÙøáÇw¯:~ùüÛíÍÎ»W/ÿğ¶C7Ÿnîm|w^Î áátÿÃ»ï¿ÛÃn>´ë¼G§ês‹åÉóJgÓ½}1ßJ†bd„$äSŒÛÆîQ$šN1-*ts3jQj.š‰Š·#\C!d‹ô—”h52d]	ƒEè(dyÆÍ‡bò…Ÿ•Õ‰¨õë(
È=¿o3ŠCi†½“Ñ	%ã‰üâ³ÂÜ7fÈŸiA8á¤*hG"dZH,!è8Dãóûfƒñ5˜ÎÂÛh}FìÈ5,cJ’WÕ"ñŒ"ë\ø!ã\0§ Æõp!³TRo<¥åXò˜d¶àPò›¨… úİ·ÁÅxÌü|§l}¡ù	6ñ¥]IŸ†4®8r˜S~eÊş&I°À¨bßSóq±ü1ò•Eá°É¨Ñv”{½&kDş”XÊÀ(Ş/œ)SÁóîâ©Z{§ÇÈe8™b™¢©!Ëğ6ku|¦±1iœöB¤|0*ÌöàOw>1A„Íí™\£,&ˆX¬öûĞ:zâf³W`¼ä½9««Åˆ	fŒY'6¬+B€Cİ›<²Kxú¡cÒ¸´Äö+cØÍî]o6PM
Æ“òÈ¢gVó!Zb¥ä$­‹3‚I<XJ1Lıû¸ÀQ'<ˆ‘Nà›“#íÎ”ú8¨Nb…â9ˆÕM@Ëmàl£GéÏGXƒ3*s¬i³æõ¼æiE4İ!wëZÈ}GQ@!K	ùŞÔ]ÂÄÊ‰ÌÇñ"ˆ|Lü…ÌÉÁ–ò¹e­™`ZÊ™Œ˜ø¦ÃÔ€«‹‘–i+µ-<K4Hy™$øSÌ´%Áh¢js}¿p&Ufñ”Iü‘ÏŠ²6‹;º\ºö‘¤Ö¿ÈkŸÖ3DøÁ¤“Â˜ÈÆ\ Ç• 7?–J¡%±İ4ŠU—Ÿ¨OŒv<3±£¥°Ú·ŒN&J˜=]ë€2Tµ+ Ó|°6´«È?İ"	=U_,8SÑx…´PÕ§Ë„ì‘c@aŠ»Xy€èSœƒ+qñá3^àlZ}ë‘¸-eÅÁºz–<èÜ›<ò$jˆˆFO‘¿ñİ>fjluÆg+Ê<†şš–æğBW’bPH`†q`ym\Éğ¬Qº­Mä¯ûÂâÎ”ü¡ËèĞ ğÆí8Èé¥˜J˜À­ñ7u”È4FŠI‹ ¸9T×YÂîm¥3¶÷¤àÉ£lì—ëÙb½‰¾¶¾Êhl+}dìízşqŠÃŠKÎ@#Â9‚»è”ÜVì,È52`h|ßÃ£Jê1ìÒßb‚pz”˜ÛL…ÛÇ92ŠaíÇÿãÇ€YwÄŠlKo²)OñÓy*Ò ‡´û_¿7¿Ò‚àkÉ}Â»%PtÊX›êdgŒrr$HhB²ú©pŠi ¹ L>	~›üáÁ<–x×´¸V†ç²‰]Å¡¾cÍÉNÈ.2Æ‡¶æ¨Ş‹ûpÅJü·úü<Íci8G]‚a%=ü>ëû6äüÓuDA<­.Ú2:ƒòpÎ¨ÂiO>˜£#Ú+„M”6¤£Iƒˆë€¹FYEâÍB–7’Ü€6;›¬BèœÎtÌ`CÙˆÖóz¢¬Gó/›çSI¡l{ê×šûåÙO*‘gu€ÅRrsŒ…”VIçh¹Öß@R€sY‘Bò«KeüÈÿ,9ÌCÍvBG½¶Ñ:`F…ÀãOÙ2ÜW²(Z~NÑ0/L«lïT—ËóVk/c'nDÙ(èV9İê¡Ô)qÙ“õ› Í­]®I½²YE?ÃŒ)k9Õ’Xª·0_uYë«å×/Qw	±şŸ—99‘¾…@)6'H÷°È`.‚ªĞå¹6±¬HÅû;áÕáÓÎÄ‚}ç[ìgğæ.;w!~)5åÂaS ´qášcæâ x8±µkˆştı@ ¹_Ü †ó}o²äˆqºñ¾<”Ş++wp\¶ë‘»s-#]¬nÉ(°<sGB ‰ÉÆ g0ípĞœ[ka}J[ĞİÃvÊhÀP[Ã´gY*$©¶»F+ØE]²Ë¢É-{…F˜úJl
…“¶t3WüÆ 3<%¨›ıµáP‡”ÓğzõVÚF f• š
ÿ*@7áóìtåQ4XÁí³bIcWùÂ›£<3ºîíïKè×'1•myÒñ1£ì”cèH°É† ®Ds¬ªøPÆvU;ºİ ƒM‡Òº›¶Ïç ÂS8ìàR²
AM„¹.¤‘‰ê› &—xÒÌòtE#4‘.o‚oE+ÊÛ±¡ ½åKsl„ÎØ`“&*nñÄºÀÈ†J’a(¶ãji¨©3Ié”“³
ÛäW#(ùWx·<#iƒd2›ZÑto;	‹‹ƒ&,(³?1¤C\ÂO=
Á”`™0‘c6jÖ¸ñøWQ‘]N		<“WPš#AW6ÔfE»Ìåİ=FË ¬s º¥Ç Ë<:AÙéèùÉ¥	i2›œ.B8Õ ‘H™út$ğ5µpoŸÎŞ¬7fÀët‡Aã¿@éï8…8–·°"şˆ`+¸SˆI­OéV>D·ZÓ·øúGÍ²(GÃ)õ²¤İ3“BiÇş\ÎA®Õºüh©ı˜>0>Ñ(|ë†mÎìê[œ4<õ^a®$Wûñ¥KÁ_ÏË}2ÑÂÂ?dÕ'äíæU±¯Ç•Ê›ˆ:óbsÁ«¡ŒPù^£qZ•Á™+dqB²ÏCü®Éš‰Çî‚’‡Û6¨†2=}½§ŞHìˆ÷yt˜T¶ÙQ–Ô3fK^ª­R¦,lşÂŠ A9#}Ü^øZTëHLñFğúÁ ==@Ô'ÅLUæ›’¨p¤µg¾õ\áRİ¯Ğ0İCÁBÅ#…(ø×ö%VíbZ@…ğ¯TBKV[CÈâ¶šÛpSÉÁæ2­e+Y”iÄïå"Ä²:p€"F£bçsé»Ş^.bÕOXá¦óT‹›LãzBo:ë‹,¥'X=QJyöiSIõ´	I'EF“SìñÉdrÀiŞ+T‡
KpbCU†p–*Šì!TWbu’K£B¼nˆ6BÔİôÆ@æC -z¤õ§˜#
Ãr´‰+>¾Ø5@h±òe˜øü *#bïƒ Ë'Àv½9¶¥).¦6D»8³=x¡ÜGbÃŞ½ã¥¶¦lğÜâŸëÃåH)ëİ6Ç¨{:7	ÆF¤AÌÁÌX™Í¸!„ï«\E_¯åreì2ôäc»×ïÃ±©g
(:ˆ& å	EÿâÃ„Úì-H9Á¤ Ê˜ƒ¯4
ZFQÂ >¤´éÂ¥Ü«î` q–ìeÅñÄ ğ€ÉŠ™ÑyÓŞ¢¾è“7ŞÈ+{á$	 Pµ 9Á4”›ÜDü­œk™–9
sÍ³?áå‹rL*	)‡¥æü+‹àP¨Ğ¿ëFŒ!ºëH@%ÇüÅ
°YöŸÌ ‰U3äÅV•ª@u8»«!Š
D¼™Dbâ©%{i˜™$İ«¤Ú@‹‹º<áM°º«Ábÿš,¼Å®·ƒÑRÈåï7øKØÿäñÎ]şö(Š¥³µ·½ıtç1®e#‘v‚tF˜8rD9Õ=ßræR6–9£/‚§pÔ€®oXÂ-$õ‰däz…DãRP#@«¿]]¤„êâœÙx;@bàáş¾'’E?ïƒEc™‹¥º£9O-ĞT—	±SÇş­›c³s5â;fš;0EC7ÀİBÓ”6ü`ß‹Bƒ¡HSÙ‚uíJX±‰OŠyÕÚÁÙåÖ;Øİ:U}›,. £B•ğÂŒzQî¨¥å _L§tÙàá¥Iœ1n™#¿Y8>SU¿t8!)|¥ç'ohGì%D*Åİb¢ˆ'MÎ c¨Ù8­ğ†=)VÚx›Úe,“gDç~Å7”_«Öe»éB®§+£*MøÃïôèë¦Z›Ô¹<¸¯ÜŞÿit¬¢ÂV~åÊI!iBÙ$´Ã¯(Sªê?+Ç_Æ*’wï9‡wS±ˆ7ÆeHT+ÏŞÌ†nµibªÈ»ÙÜàI ¸8ˆÀ¬s¼ˆÂÛ³!J\Öça¹‡ğS¶m(ƒ>.É™Dè—ri3âô	œ¢¯åbq38¦~=4¿.¡`ÑQôhp´ã4pRû¸7†®9È½@)ÁhÈ™eÄXXµ.#Â˜™€˜I	%ñVR=Ğ¢7•÷7vDO¶p1!ÃV.ÓÔ#s;ãÑğ‚â9éÂ
ªMÑ‡Ø1èá,N4
oÍ~kşŠ¬ á]¤˜1Â¥¬âÉJôKæ¤,gÔÄ¸5V¼Uüµ&edÔ™|¯9{a¨ŞÁ@€ğòRGé‚íV	Ü(|gmşÎä£\{k$£DØi‡i9šĞ°©¦“ä¸î€ô£÷'‘¨7–ÓP2ñ¸MäA¯]Nõè2V!e5A(C¤*¤L]5TR‹R*
™®’LõÓ¯7ú¬İK1`'Ù[ØHhÕ|‚¹0¶‰÷öùûJN*Ì–`»J§8¼r¼ ¸W•àî(¤€ØÅ§(8¹T+
ş6ÈÅts¸o¥,E80N‘ùà6(Â±D7zæÅ44 
ñ‹bféøè÷¯6S•¸Ñ£¶wµ‹¬VnúR¦¾µY‘r—Ç/ »ïÈoæ}½ájÒüUôın`àQªM™d a}ÜÒå;¼x5Ù"Ê”]pÂdrßr
şƒ®tE)öNë$iÔÜ"$ĞšŞgÕ£ÓìX€!Ã­Ş¹eùÁÆ“4¶6Ù-ÿWpYªäÄW'š·³¡ª*˜-oÛ	Æ–u€¯9K¨†ëÉCü;º„ÙIüéævÆcòS!$ÌfÆ‰°áÌ‹§—¼ûÁ'‘½¦ØÄìŒ…?•<¹á^öÇôqª€óUS,;~°Î=`Èqò×-†8]‹Œ"¢¹}C²…û‡%B9_¶NDÆ·ÑË9Å¸‹të¦@,.åÌ Lz ä©ƒ¾äŸÇ3½ö–’íù4Æ(h¾1ü4jXëpt­<¼G~˜é0Ş;×ÏÃÃ£8Åóà½:+Î‚a2Hù°ñVÀk±ü¸ÌÇcÊ9‘f£Aß	);nÍNm_ÍiĞÅ1:h¸I#jn´]\hh'(ë°Ñ™âZ%[søqxfõóV9.¶&×·lj$0 ˆÃì”C!|d@~=€„¤5r¹ãÒs‰ÀÄj6k^s,>[¬áÍSøšJq«Ğ<Q×kò·@ñ†;F“<''Ôµ}$+èoSô‹CÎ^¯¤94/Õy~	ÃE¡åHäJR÷O2ÅóËÕ¬ô‘ëË°ß/Ğ(™/U¥Mv­Ÿ'ètî€Æb1¡i¯æn–o .‰íÏÏ5@³j‘qM”YíV|´iÉVü–çŠÿÊä¼\«üº°•Q‘óİúlç£r§ú^»ßB)¯ìú6p5Ú&ÁºÑİ‡í>ˆÖív,—AÃ]s¤QE¶~ZŠ(#³.×úX[|Õì–6GÆ
,9lĞ‡spA/:8(0ïÁïÙğ£*¡+…e!tkº!ÅM3“oÖuOàéŞ™­[ ¯9ÛŠvAÈAìT6‹pPáô$Ìîˆ0<ƒ^<I¦¶3jáè8$õä¸a’	ˆûä(±¿¼ƒæÙåë¶ùTşÓİ±ıûéÀrŒ^dÜÌš m>ÚìIN&©Œ¹ğF¯ŠH“`Pn:H=
´WC0µ!¬Xß’¸„çÚÛvf"ğùe6‡
ìc…‚óşodr0ìkÄ®‚Ì`JYİˆcºÀ#"Sú<š“ÄU,MÈ$a³yfxÍ‚ëÈ$.‹˜é)RNb-ƒ-g:¯Z"ªyÀø–7òk#öAÌUz\Ä^5.pvítƒN5`:°¼¸é0¼¹è<Ş¤{ĞSúø	?–òš­ı/´hxBÛŠJ/‡'İ¡-4o
ĞˆÄ~h›K_ˆ¯ÈõbÛ*f/‚ à7ÆíŸ4ŸT8¹§” ‚‰"èşë(<¶îÿ”üI¡Öu`ÁŞCÆÁë¢ ˆıjwWæ8ÜTDË×“g¯+rT>ˆóxM©ÃÆÓ¢r]ë %7¡“ÜìÃğèt‰Rô ¬ƒ6ä÷Âd²bÈ;uå•§’ï×÷v¥AûİIÌ£|Ôÿ £ö¨ş[•Ôq(ï 2ºIŠ`-$H2ÂñÌVêI{q5ÜÍúÌ®ŒÇµÚÊš—PIˆ!2UB8¬gò·öøX*-‡¯=“By¸ÚŞƒ*p‡*›„¿EÊëòıq^3@Cÿ£¡éN*­ó•]$N··¾¿—mÒø>˜dñ˜	_³ºM®ø“;şˆ9¾
æe,–Ôa#Bí.V^buY¢kJnŠä†,ûÈ$u2¥PoÍA*¦R[MR®—kPj?jA9”Œ;;Ë R³M~íÍèªm"?bˆ|üWÂEÈé¨¥ı5€îD
:ôÔşf†ôì|‘]ePqZ&=:óR,,"ta…ËöH­kaøÇlŠ4h”Î>ù¤€£¤µÜ å´æ;EØV VÄˆ  eôN6°êòd2'o„¸Ÿ¦Æ¹Noy’ÑPÔ?ÇL>ÂÑñzfÏå—œYÄË˜º?Ôt¿0(‘›öqıÊí¶úà6áRXÒUõ…ëİ¸ÔlC¢¼dWV
4CÙ’=t‚™Ç>ö¶V±dÇ6ßÛ²ê‡œR+]f0B¾‚£’‹&ôº›ˆ_$„ßŸçcÚOQRı5±3îœD–‰4‘=ğrTÇFk˜iåe©i"«‰­<Û“ûL!£àOæuœ×0 :(êtj‡¤%õË'Ï:”/öü¬½iÅ;	Í&©‰ã0ùœø3Ceì¸üI÷ò¹ˆê€@ê|:<ı| 7NÛÊ—lôìíp\Ÿcõgøªd¨Š] ­"Ê“„éí°!Ÿã”Ğn¤Q|e3ó7£n'Ï4Hú9¥#ÀÓçóätµÒ0D#˜	4«¨èZd)BØ%:ûCÆØíã*Ï®6ë#hS—‰c½b’>ç6Är—’ÑşŞÓ×®áq,Í·J†ÂÖ'İJ˜TKfáfp„òŸŒµ@½¬ê3ÑàYqÃFVü}šëT[ØŠí÷‰?y×qq	Ô†ˆºé W®óı¥˜@óC¨ºH×ŒRô yß{¯ˆàÖÁæ#™–}¢o'gÑO2"ÉÍ%¡ÿ5.ğCø#º”/üë
ÄMVFÌ+^|™J[­áøÜ}Å¤>ùÿà?³Ô6p„*{~é“°¸Ç|æõIí«Ö¹i'zÂ…•K&¢kÀ·«UÕš¹r3ÍÅ—¦ê²×eÅ¦ÇZ7äØÕÇR'æ.UÏÃ7æŠñr_0 æ/»ó ğ™Ø*:DÒ™¸€oZcó.µ>*è~,‘Ã°BâwŒ°T$ü„²b"€¸'Ù³\…³¤PĞb—¤ëÔ„ü­ÕPGyªã¥ÈÁ4½‡;•ô7É
ˆ2OîW!·uJúNn%,½|)\$ì)I9œ>—òo‹ÕÆ
ºşydêV‹c86ñ€Ø7½BIBòqEŸÜÑ8“Ùßõ(œéİ/&úü´9ĞshdƒSÌŠJdŸ#yy@È¢cs0—ÙˆBc”ö5-i¡·Øpó˜×Ís6o0?Kx†/Ñ•Q¿«›ºV¥1Hp²zË-59vS“¨FÄ\#-¦ò8ÈÒ¬'ó%ğèjÆâEÌ£Y`3‘¨ÇzèŒrYÒğÑ\¢cdî“‘Ò­kf}´şúÕÖæïX'|ƒô¬Ãéy·z‰-\¤IzB.@ÕæÔšƒYà÷ïñÎ…†¡œ(¤BnV]2ÜFÕLÉ„¡rNøízã'4ä7œqğÁ…Õ]«L3P:¦•®BÊ5¬î@d*êhÇÓ:™£|«2nì%Ëéí=*ĞÆ"7Ÿà«Š ÅŞŠØ¼g‡_ô
˜õº{Ô…sòçñtá]’4ÂÔÀHûÇí8›xûÃ¼è”U)ÌeÍnõV® AğDÑ©LjDyq(vètg`*½‡4=óéd†9˜ÙIÂ¸Ñ£ ˆL`^§âÄ¦
ù{ØÁùg“Ùq*µ…(ª¢6#fúØÂ¦û ¢¿2èG!Ä½ô Mjn~"‰Ñóğ _10±™<¦”‰7é›OÖ9?»nï\éÚİ“ã%ë]·sªs•¾ZÌ2/qq¿úSo6Ò°Gò¯È›¿ûñÍ[şÚ¹áßû	;Â÷«»››wW¿ÕÃ¿`-¤œB8ùÉñz§ÿdpØO^ã:Nß¡âÖpg˜¼Á-dcªó´¿äA}äæOŸ>ŞL^G'ô­³7H”Öx7>ÙÛ:LjqÍĞ|Ô£—›[Û8ê }¼{´¹×ï=IŞAîLé²»ƒ'[‡RPx[¯¶pñoÈçÈÏ¹¡î¶«äJ i˜ÉØm›ÌOêTÖ:‰÷ªºĞy¢0üPçÂ}Â&½ O{ÆØ¢‡üÅ¢¤	\¨m+è±~µ72Nz!ßğœœË&‰SæŸïÿû|wKVÂèÃ>¾å®dI!ø^‡=‡Bàob"ïÃ9½‰My‡ÏPÀ2º{Y£R`Ë„ <®ÓsxáÄ(”<iÛxû& ‡„. à—Ñ‚ü¸­?ÓUdĞœ+•¬³âÆÓ£)«'\SÇwŞp÷pWŸ»Ş>·ìq‡M%7rñ·q'µZ>ÂWŠ‹Dİµ*¾ ¹[q6Hƒ­‡G4+v‡†O-¿ÿ®Eµ‘â¹Ï‡ 1+ê$´ã¼şşù·¯ª·¯ÿãÕ­åİ_Ená]ºO7Ø ”8ìW;İÆ@Í#hË)´pºœãë£FÕ÷Ï_ÿPıáÕó¯_½áß7¾£”ò‰Æõh¬ šlÚÈ?=…ÈÅª<¹A–W;›É\h¯Æ"|SlRº×%Ì^ÅbÜs+”°;>fÑ„+.®Vó2ÎK‡å1(uz˜¾hí:-w­¾ı¡NÄPq~Æ¼€‹¼å)~`şm#M¼
Iai‰;zãş:<I¾!ßñgt“½.0Úç´#Ll¹e~âq×İiL_Ò@r9¹0[1Ÿ½’üNríğx}(ºÕ}üd/¦02Tâ=Ù«xøë!–ÅÌ
Ü7A¯*İïIŠË4ªæ¸Œ+õ„Š|t8ñ<,‹ôãù¸·e ]7@±	òïfw»iÍ†8ôtD[ƒnÒ`"z°×ŞÊ¾M˜DîåjÇ¿Y'ŒC]İ—ôÇ—ÕOÇğ[TÀÕFŸQ†­·&i>:oÇr—I´¨«¶	\h$d‘V¶W pEW&C¡ËéP¨ ¿”R¹´ìSóÿ»)FÕûÍ¸!î×Q½t\Ì öeÓ`•	™–bÑPzñÕ}²µİ¤¸ÖWÍN!Ïªİ)µÁÍÒ	9‹
½QÇ´yã…îzUŞ,Ó¢Çµ W/À^Üóå™ÀÇn""‚²ÓFåmZ.é*ÓrÉ;Q^ëëÛ™ŠcÁ’¶d2=SS…­‘¨¼¢êÎ»[9.ƒævC#	¿&ùº£ñ\zûúëW/¿©Şşëënksƒ_CşñùtuÇb›á o	¿Û‹è¹*	»tnaİÇµuÜ}¹ıòñ×©(ôb3ª™´QÍ¤ÅÒóå!rH-Y«rÜ¦ßi…Ù*\v+/˜º&T½éíy;j­Û	Z®\•Ññt…uÅÑ:læÁïÈ9S`BQ;åÙğ!…!ˆÉ9:ìá °¼2lRÉ ² Ã"6|ûI…§™š7ÔJ…ïÏŠö\4ØËØP:°
ÓİÇSO`
•N¸~Àò¤K{ˆ¸mAúÆ•¡#Îuõ¦˜-ÒvÒA¶p·Ò3¸y¦K†pıÌôMäí÷¯xÍná70`±­82cÂ-0ƒ¿Œ–ZVÖ?ì>ïã)ß"–hUÇ‰[ÌamÄş4ÍoÏ}ÛqrOåéƒıÊ™$j²q„FS(Ø‚ËÍĞ4¶;Ò¥£öå?¼{óãwp=±»-ºÉ;†©p@%Ë iÃ;#@à{,êàò¼¥‘®ë46«mÍ	í¸ èÚ¤43iX–@ÒÈEuÍºr†‰`›|:Š¥ŸìÃáß.|¡ğË«Ø­Ùë””}ĞYŒãë$½<ƒüv¹G¸X-ìKK®¸å·9¸ãÀ¼‚ª»›û ğRi¸~xÖ4Û6·!,-ûJF SûÌ?½ùñÛ7¯pGŒ®ÛÚ[k7=ÂY¯9bõfÆrÊXÎVIYŒ[¹éJÅÏÑƒ°SKqÚ×¯ß¼zù®zù‡ç·İDĞÛ[æPjxá“RºeÕ9™±é%ÓC÷i<Šµ˜;Mñíîî^Z»IfXk‡"€”êÏ¯¿şöÕ­qÓ[,p|Œó”fD¡	™óÛt^ÿğõ«»­ ÂäÄ„:Gø\"8›*¿«R¬ù*1›Uxx­=·(kÖHU•v’Iæf­tOk™guFnHŠvİJ-º˜"§1E€F…‘'@1ªß½yşÃÛ×ï^ÿøÃÛêí«wï^ÿğímg»´‡õœÏLTGãé!²pè©pNÅS¸Ä‰R1šîÎ<Á°+2Ä¾gE9–Îtmš/&=½ú·[³jús Ï»hñL’Ç™›×ÕÀîq¡FªaÔ‰úâïŞı(Á·P²’1¤c’$î¹­V¹Yµ6)’K•ùİ"—’©»¦åÍÄ¹`’şÍuUVğ\
¶–£ÛÅ\2wË;(G”+’QaJä“ ‡Ÿ6¯™á^}÷êOÏiÆğ¯[Ğ±>ù
K»Ûkş	sHöä·ö«åä¯K¸ ×ïGÃæ>¦u²òÛîÉußÌŸmHÛB©íİtß};i™¤ó£r-89µå¥¶wBË;IË[´c¾MÿàÙÂjZÛ¦Ş[ pmï¦mïRÛOÊmÃ´¶ş§ Ã6aŠ“½´õ§hx§¥õÄW¾÷Pn«ãÒ:E4DBKL ³Ò›×/^Ü«f£ÃCçR–¦Mhì/*?_´Œ›b°Ã(X«PH'6ìÉÙ¤N6¦^ÉîÔ2º<{šÇMØkŠQÃòJ@~ÜRŠÏ¹2ı
°jÈg‡Px=>êp \èd‹™±¥äh°À¶úÖ£@ĞÃ²MœZnBÁiià§^’!#ŸQ¹)*)Ğlï¶ahv·6¡ĞĞ<qà&á[W…öıèœ·ø$|ë™äLªîs²ûù­:æ÷!°òj©”^a‘ã¿ô†î‡˜,Jo,w v‹İEÍW|-ÃÙ8/µ.¶RéÍÉhN¹Ûz“zºä–$	nö«—„‰u›,h“’×@@ÆPÌ/6ÁùC‹cÒÉ./İ°×MïÂÉ/É)ï`ìĞÕò•õÑJU·a?I<½‰˜6 ëw™¢ôgIûè{Ï¢5éGÈ™Êu
iÈ©G²Òúëîå)µÂkqR­$_B«÷’AGèT1s“k\<ã KÛè w¡;o×¼÷öÙ-A€[ ¡Å7ud×Ğ.•èß0Dyt¯ˆº£iÕ@¥€B=0£}„í¯‹ìkÆ^¬Óè¾œ,%{“ğ¢\ÍÍrì.è\¾xOÍH6Aì¤ûDâötğMÜjº`İd¼<lA× =mŒÒÀíb':aZÑE'ú  _êšÇŸ8ñ¥ÏshO’T‡ÂÉµ	Áµš°ğn'w¶A¹0Ÿ©½ÃÓrÃÎ ;ÀE-¯pyÎ¬í–‡È Ğövc“¼5t~£äˆÙ%™«'_ø™{:ÉÂPSL!ç°Î&î¹QÛâYo¢O¯ip3êP³lÃW‡g<ÉlYTo-|4BëœÄFìmP¶Æç5Ó‚i
1úT ıL®´‡äh—Hß†f ”„6Ã`¤·!i¹k…„¿ë£^ÿÂú¿P©GŠ;Ôùnı1Jcü-,’É¨záÏ¨«ª5Ì±w$?³x4ñ)Ïé'îç«†İFCÑ•VÁSAç#8·’!›šäÓtö[æxÑZ ‘(éækAœ»K’u$<!½>,õÉ4œ«¤{õ„QÄˆ‘¬eØK½Âdt«PÉá»¤§ Pïu?öÆ&v·Úáa³¥	dj6q¦HµÒAÄiã^šp/¹ÄÂ	&:X$AR§™9Qƒ™½:u»Î–<ÊÍéË®§µq1İuK#Ííé$1àş©ø¤”aKšÇ–ÍÏÚò#ï}%^šÕi2VápJÍN©+Ñ±Óå½¥ScšP8Ë;5lxîŠìsj¯%è“²İmé„ß$J;´^
úTo‡×-<ú8²ûÙVsìR°xçÜ)şÛ4ãÌ²€Öâ-¶¡“xŒßÃÊßÇvõAÀ)Q{:À¥	½9~Fd¡ßH#ã¨º§U'¬L”˜*aZØ­ˆì¬„Ù(5¼e]L°x¾Nî/ª#±:ë]ü¶úŸ¸=ùµ‘Ñ,'ğNØÀ‹,(ÆrŒÀÇcN 9„¸^OF¹™NOÑ}8êSšúÔ"‰rEƒé|ÃºXğòo€jíáY$ÆæP­ª ”€Ô:R˜R˜vŸ1M¤ï2*2´¼uèĞ±¢÷tÂRİ6‰ “–‹Ä‰ëŸ6f•]=M¨D2ã=÷@@·ŒpÙr’7?»YŸÎ$jÏqF#@¹yKEB»iw¾İ0U¨<ı¥Í

œ©£QŸŸ¢¥‰¬‘’l'ÆÂùF
pÂß;@Ç{0òUàSS¨I:Š³PUrS±3“ĞBë	åæ™ÒßOG3¹›8Ë<mcéœÕ‡F‹Û!@­q0tú?Ö7Í£â)î¼Vğf¡~ç¹õÒ<"éD2ÅŠ¬”Ÿè¼$H 0œSB‹qM{|ÂM°§8‹Ò™&&CÙ¾ [Hq§ğG¾@	¥g†m›Ò‚º€	Ü\,ç ds/TŒ
… ¹¸ü	¨1ii,—‚e©­heâbTÅEÄì;3p/¢ïIMapm°‡TëlWÃïÄÎYş¡QbÛ{{q€Íş¡E:Š±„·UÂ]ÅÂÿÂcŠ:Jƒ(°Ñ€Œñ‹BÉBØ4ãş	Î…ÇÇ\)›Tqº'}î–€éVJ<WùywŠ¶ÔyáQŞx(»Ÿ5‚y%ıùQÄ‘cÓUîjµ:¼ú!‚”€KÑ*ƒæ©%¿˜QzyÙb*+ÃûÂo”Ñ­‹Haô |™jìÆ¥k« ‹BÏ:³éJ^}ÎŞ\Ç«ò Á«âõ¼Zr‘jób™£ÀÆ§r8T“7ßŸÆV¼h·8`é"·¢
a% ƒqjÊ”×®‚tvxª'zâL³Àyİş@‘+¦§şÂá3Lö’Ï{QCú pÔRÀ°‰Ñˆï2ó06b¥¬šÃ•YIÌ:¨üØÔ½}7ÿH•\›	ŸyÔRe_ş(ºUqowY _Sn¢úÏòõSâ’+Êİ¯’pA¨~*”ÖÜUÛÈSì±&è"cy¿7¤&Ÿì	Òicµü’\>£§âp½;Îîƒ„»’nxDX/ŠØíZtó¥ÉF´næÆE¾ ©·HQºçX	ÓÇªi``¬¥d2}~Xİ¿‹mãû_lïÜ‡BÈ±¤ÅÆ"­üi0¦Âù¸áW³ +sãÁYo6Á,>à6m3ÖÈ.÷9ÁİÒ®˜s½s\z³–ÎXk/Ş‚%¹‹¹JN¥|’»‘ÙÔğ¤­3‹§µ÷›a@aª{öQt¢¯Èx¦¡DÑ9Âœ,·§g¨‘w:ËgDIˆ:éêÙšÍó›P2ğÁNæ8îÏ‚®äIŞdHÖ"d}èrÕ bù++Ti,™ÿ›Ó†şó—ïï˜nçxØ÷wşO$¼­=âì½İ^§øæ‚ËõxB%`(Ê±Uš…†gdNÆTÒ2Šú ?áK`ƒ&š$ı¿O‡ùæ(’vn†#Æãª¸rxÉ·”VßĞº³Éôñ[$ÊC‚N×B[Ø¶y­W›òÛ•6\“²H³vÇî•E´“§¦Ìy™ŞÜ,Š"
)" ËH{~œ™
Şvø©†”¿ªÆÄÈ¯¡’{Š)E¢³l¦Ç‹‰/ƒ¨C™qá”# S<Úgƒn“«’ÍÔi;p‡H.†4fŸl>xèş†äSKæŒ—cl9sCb'Zœ eœüXKêœ~Cé‡Ú¦4VXFÿ@aÍ8CŠæK¯Æ2R#Â¸Q&°9¶æc,jgÈô¤Ù‘-Hçæ÷¨^wñø}'Ó_píQz#ÅñoÓãÜuEİáï×ï‘Zââ2ÔÆlº\IÙÒ-5¬ƒ¬Zƒû¢4ax`åø˜ø/Éô_‹ÍÒ¢‚~îõs|Ú˜É“«æ±1"»ªÌN¦î_™R.æ|vÁ¼ãú~	›629EZ7<+ux94Cõ\‡ÕãnÆ¥Q@ «åú¾YçºÔŒ?sg›Ù­Åu¥—%×s†ØËô5¶‰JBçjm'ƒ.©Ğ­HıT6^%[±r\ø­Æ­bÇuu_†‚¹v	Ù}¤šµvÿ\bıäÊÅ&ø}ğf¬Ö“lÆ îÑß’Oºœ†í+ZÛÎ¦§ƒéÔy—.;Hó•28&³¬8±.GhÆ<y½—³]´F¨¬’ã¿çÔ¼6ªhª^S¿ö-*“¯‘Ù·“¼ÄiD·ØsOÓ×…HG³³IiÓ2ó‡Æ[²ØÁ\¢Şäì£>‰j["Ö¦d“ò·ÍùlÕ	Ñª•Ô·ªÓµo¡’’öñMÊæ9Û¹ˆÈw|ŒÎá4°ÇäoEs#ÈÅœGPº8¤„y_˜Øq”uxíbô×‡:°¡Æ2e×í§8¹Œ0;-)eˆ:ÜV<XMæø&åLÛûŒ8VÒQWPÇJµéÒB‡Mró+àˆÔ²/ú½ÓwÔzõîepfğ¶:í¥¯¯ƒ¡/”K»íV ²±øõI,‘gyQÉb¹‘|[¡e7yÏÛÙHŒ(nSCô•ç¾k¸+±füÅ/m#UœŒÒ¦µãšIZ	?¸Üü8”lÎ^ãTÍâÖç¸É	·ML'Ú8Ó^é}b±ÏDÆ…69›.•œ¬½‰ÊôuV·7Aœ]5µ¾¾já7†¾[u!˜‘±şÍšĞ Y«oöè/_¢‡¯^½â_tEŞİo¾ùÆ´,ºeÖC—°´Üc[Ã†N°×†`1„”€„tÕbz¢?@ª‡ºµC—ñ­# €™tüxK!Qİ‘tv2§->´âô×­iÊê6á¤•W^—Õ`*m‚³•¡5\ZI'¾d²%PLqñ0£K"9Âõ¢ûÕ«sÌ+ºcêÉ£ùJÖì Q·»ÁÙgqZâ<9yƒñXzNQú4´¼<8×-Ò£?hÇé¥¼
Eìçéq#‚jÚÇí|z yæ'i¿z{B·e½˜›Àé†‰¸–„ŸÌtC=]e£×‚Ş]Qó…€éˆ^ß\KÂFÅ ¸âEh %ÄE6b‹ğ,Şö@m`iü­dƒ¯|ÎGŠ87¥iŠpÚ/„Œòôç‚aœˆ„¢DtVÇsè3MBD"ÌªAûÈkxgCHóXY¾_9¾h:¨8¾ ¼zĞ„8/.œ¯]³VàøÃŒ¥OpUQ¥_h•nnØ¢ö	!;zÕøšêLò—iß¦Ã¨åãCX {85¹¾İİ¦7ZŸ[ÆC¤€ÔçBtMzB'Vzƒ¶OcLo[P¹R3@PºŞklw¡Òî*òÈàøáv8<ÆOpö1{r2 '6@?XBiè.x«ûÈØ¯A…
ÖóN£çì	zÆ“_¥ç`ØxKè9«şø[¢'å‡¿'zÚ{è	aíœ˜@ f˜B;d)ùIh¦È¤üÜ2ñ‹³ğlvŸJÓÄH!Ìú×İ†¨ötñÚ  æø÷ª3 â®(ê“€ìÒc"V×YB5È²0×C‹Qh|U¬v=vƒ²q%ÌÂ"×+¹ÆXŒC‚9NcLŸÀ¹-Y5öqßÎ8¹(”SiğÅ½z4ÌßëıŞù°7¼š%¿İ¯£ñÅé1aÅ=ƒñG™Œ“k‡q*èA'İ˜Bƒ"DÂ¨Ä-›mÁ1¢™Ÿ°MŠË8AÍçl^
Eçt§Š°`hY

[©%èÿ{ãÎ=â‰‘ÅˆjGä?ZŸ#7Ú'‚Xøw÷ ¥
Ÿv’ˆf`âc=Ã}ï<#õÇQ_b s»%›*Ôã{!j}í(M¡·#¸yLY”CxŒøÿ%F¤³²^ÃŒFoğ2¥ñ€<Qc©a99½“Ø^SŒéÕ¼Sâa¨t¯ 3½(QÎ"½áš!Î|Gô8~CR(:ÚÏ•ƒcÚ£Xp×ªD]Ë…e šg#±·8ë™â8d£
X7ãÜÆvƒÖú Ü\ÖG†õäP¢³Y	(Ã1hÖ¹-ìÆáÙt	+k`¯‚3;,sòD&Ù¦ãÈIäI	l™pa M"“ìŞmğ/UÀ™ ŒG¯NÚbùR25Œ[œ€ùqr‡“İiä]Ä‘ön•å²$;İ˜ƒh”[à±½~ø“ 4.fAJŒµüÂRsÒÈ`Pã*Ñ)-ÑYæÇ	9q±;;åÎF©ñr*ŒNqY«"è2Unô^µŠn	„Ú>©…+Ãy” ªA‰Éã<oA…ÑC[Ë7ür±ª~Y°Ã¿¦^šĞ‚m*æe:gèUs†–š¢’ô$_ø·ÑÅÖÃ¸ ;ÆS°oåKt4tØÜ7ƒEë)Z²sé’e13Æ3£ÿòe@Ä”c.k•†ÆãIÀ‹B	„‰´ÉLôŸ=É·î?Ìà•¨ú5VL—‚ Ju]®±Uc‚O/şıu ¼Ú•ØMĞNkt¤_FF9f\›EöNİpÁíe~9™ÎAÂ`Ë`×Ú ÏÄOQ4tØl}‡¥ùøH6¶tK%fBÁŠ£	0œºõ\A 
Çœeö;X÷ÉQHµÉ­v>ôA–şCø¿å]YS[’~îş„'fæ¹‘À`h"&æÔ¢»ÁxzØ’@€ óßçËÌ“g)U	lÜtÇŒã^ªÎ’{æÉÌª*áø°¦Û˜¯Zâi *c™Ë£rôÛÀòİ«!t[?…ß=aÒ¿½ûÛ;J`<ù}ö²3š:ü=%©£ƒ¤½Ã5ÜĞĞ‘û•.ƒH”è‚“±È‚!´B	PE zEvO	ÎiİŸbm¹>8ZXÇ-,ÿèXîÂYz™—›R ƒ
-ÁeoEL’Êç)s4#ñc¦R$Úq>•ïü¡\ìñ/+++FDrô=K$#èUñáeŸ!	NV»Sº€±Î0Xm~¸nò±XÈs¡º“"¦ú
&ÊS[•dêĞUr#Ğñê´` w`ÂË—ƒ[ÂŸŞ¬Æ“ÜÀƒS3î{EŠ(İ=~H+Âä¥@j‚±öÒ`(A_!GA_º+¾ÜÂq”± !.è	gÎiÕJv)ØátŞú½C{FZOIq?@‡&k3Wøÿ.xŸC8×Ëw0Ñ–ÕIŒ&¨¬Òkl¼4mo)m¤/ğÕiu¼¯Ëf,>™Å¿h.‹ÑT~)f²p)JdMºŒÅ@"§ƒœcı_\º@,²®H~“n.„ÖFPïtó#{C\p3I¢ÍºyŞY/,Ìæ¿ˆÆd˜¸çä	D!{„ÏJã$VÄŠW˜kø9yj–f¯UúÆ¦©\Ctzâí´¢ƒ‘ "ğ™¢x¸iÛü9Z‹¤Œ"Uvª`æ\IÊğÒÀõSÇJ‘È·Ağ¡
îÿŒ©uÄ–.3ÖVYğ3ş«
Ù¶m…Ô…l8"rÉ”K ‚<Cßó—ƒÂ˜ÚÁÏQ~µ²>³æhw2DíâÛaäŞ§$Ü´HÃ*Â:f1áïÅlŠƒ’Ÿ-ŒÙYãŞh¦sYëVI+¸Ám¯Äô™WÇf«RÁ5lÁ¼ ü>”½üC¸nC‰BüQ„Œ?> SJu 8£ä@­v–EÆë;c‡gBŸ•‰^ÑñËÏ€¥
éOªe“iñâRÁuû+
/Œ6ˆÀÿö×!^y¼¿?\ÃS´¾<U¤€â¿*•	šåDk(õt‹ä]•¡3VrF¯"yub©¶Â›ö(Æ¶ìÅóô-zÔ{~i•¢Î`¢[Ùe¿‚8Ú·;Ñ·0Ôzaq+¤L26•(´\ I‰¿@T¶	™S£RéT},€ÅMšÀhòÑ«5~sp+ØšúDuí½ê'[KİÆt6Á#Ùº/S6Ú ˆİâyzK?'‘e´SWÎu`„”Ó¨Àİ¯ø’ã±¹Jv¼í!Œ€ğ9Õ	ı,/¤rÀ¶Vc>Ô“U²ŒE¼ë¼@1øİıöU4ô ÷Ì_oÃ÷ğñÉõ=NS,¿Cašİ”Ó–7)˜ı@İ[ğå{<EÖ|qåŒâC½jBË&°Yæ¼:IÊÕÓÓ~Î)8q ;./Õ{RÇ¹¹¯5ËËé¾ŞÜ\ı»&9 >E¸ê‹¢(G1f˜|¾!s§6>4ºH¢§â÷Aì|—oø÷M¨&x;6 ö²÷ßî©Ó+ÂCq!zuDkÜÖÁ:S’"F^­º­§å%ßëe+?ÔEüA4ZD/ÛEşÂğûf“Èµ+]ìE‹ª
Bƒ3[œ×±'Ã	˜ß(Xø¶¹"ÆOŠ‡&º¨ĞrÜµ 8«…˜ãå"¥
eÆ)IÔ7³|TEï1ç5U&¿ŠTH€€ÌÈœRµÄô	{%¤f?ÎÎ XiĞ!uêÉ¨%"XŸM/x1kX¬“4™ô&&/07—I?œmc«LÑ@j±ƒ !"‡ŞWq|*srØ{şx…’ùzƒ>~+|ÂrB’)«$İPÛê£vµ)Ó½«KJFÖ$ÈÍY²Ò\JíD sDˆYüq>$½÷\wñOœcäí¸D%>T¦Ñë¥•öŠw–—Oƒ9.ÌŠ1}Za	^Dı7Åİø~·X5 ·Ú*J3È‰‰˜)•0Ç8 ñÒßáÍ™x‡¥¿Óë1nn`™8‹¤¢àÈQë}œEFƒŸësîÔºRµ¥eqÿÄvj•A(¶gL0”C^ı²1‹mWéÒî ¨Bà…?ò¶dR¶À¡ş1ĞÔ'uWeğª––Vš¯êxŠ|˜£h?ËöòÒ¯h³ì°	“€K—_‡à}ÙBNì:‘6`9§<I­”Ş1cŸÄ#µÿùâ&‚È|ÙqÂÆPúdbøP"à`Pªöe<,Û~çUçÙOÔñ>³³à’@¾	ş'5¼èËƒÃ­‹r§ä'­¶ÀßYë1'¯ãs%(‚R‡)d04fÍA:ºøÈ±>Ú³í©™zšhe.ªÇ`UºÅÿà/Ş¤¸®‚e½2L&¥Ó…+vóØ×LQÃŠ·…OËç°)šxñøL~S¤„Ã¸po¢*…åªdsŸ¹˜9äO/¿Û¯ĞÌ@`è›ìqÈşQ½É^cŸ£‡ ±ñ¥ç+Ffn´Àî3³Gl¦e­÷Ä*¢9qÖe§ÏÖ%)~N"\øşÊ”£n˜±B¨Å>ò\¢SE½± G™Pß|K4sx²q1"ü"4ñ0¼	¤kŞïk_K/Íêgíå 8³!~¬¢€rÿÃ}‹èÜ¢„ıLğœ@…î‰Şhü g°â5åmÃÕÜŞF,i[_ô‰œö{×è0åÌË¤°íŸb<
E;ãàë6>H c£’=/}*è/–6ÉGÑ()K\š³q”Æ%+0‹ÉS¦$ó±’à	W©ÉåÉğî/5•œË³šàã>ö˜$º‚ğ;eÚë@(Õz5æ·
j©–rÒ ºS"ô"®Ëaü)Á/é¤ïŸ.—K
Bä+ßıùOÿ]ûóŸŞënßıuæ¿ø74P çtáÁŸUşÓ2İÖªéeÍv.Ö>ó©–“®æ£$İ®}5æk-o$½Í¯µ-cº«ù|rÓ]Id`¾uÕiòğâ_-cZrí*1æ"©åÆäÁ ßÿt‘ƒd5?ZìŒrÚmKf­³¾š›ôÔBC+uŒéĞµË¤¶cÌ¤ŸVS³Ü¾LVWu2 µ—ÖıZËìmÖº@¡ ¹ÛÁ¼^Š=hâg"ÆWšwLó¾nÖš›9TüWÒV»Fp˜å´ù¹F°Öò•t7¯ıÀå-º¼wlä‘)C°€€t[Ö>A‹ßŒù&X+)n’`"7HÑıBø,$„Ğ]ÒF÷I7B	üî'1]6-sWÒíÚ…"·³ï&†·ZM—Ó‹ä˜¶h$Øb)!¢}Lv@©¥d×3}5_L—›imüÀÕqÊ¸@È>¤ãì´vhÌaŒÌ™…‰Å†„Ò¢í‰&BjÒƒ`6Ó\ÿéu’
f¼ŠİdÔAÆ‡P·rÀÕŞÌãôXpOÍcºÆaßæšÀšûÒû™»ÿ0y_d¦³˜CÅŠè·>¤ô3¶€…p¬øuX™Â1WzßÃÑÏ:ßÁQÏKá&Úz»”f"zõÔ<Å${ğ[Í—úTzßƒÚ˜¼ï@í•ƒú”¬Ÿ;”/ò’•Ş÷p'ï;8~d¥$ë’ı›|Ü{ÄãïŸÌSN²ÿ˜ïòdY
k”õjºR³Óg#5dËû!'İ\ÌÉ8¹É-Ój‰Î©¬o:¼É­
Â¾Üæ_Í÷Æ¼ÚhxÖ2¼0©ÀqÖ$¾j£&!qÕ†#¨€õ×¸Jà¨tK‚.ÆÜ3fu^±Á+Ö1—¤â³æği€zÎÔÌçŸ„x0À!jÓo“ª,7‰^+M¢—[µe`ğ#ØšE²ƒß‹Cì)ÃÅtQ{úvN,º¶_ _-ırÑl²7ª¥G—Í˜-õğ)%pWZDÖëVoZrpá'ŒnvÓ:PR— gd7ÑÖç©#÷ÜÈûgF~r#yh#„Ü<µT˜J9`Ì‘]ÔóÚË£’ø»bíÕ"= ²}l‘J]´I/Û;üóvÑK}‹]`j¾Y¥.;ìîÚìîÚİxrgCdÎ‡
ànQXRrÍ“Œ©c©O¦e	2Íä‚šME¬Ñ¶ì|vNgS»Ğ¶Œ}vÎº›³øâ9]7çã‹çliH`VÚÊögÛ±)}­—ôú¤¶§‘.ÂÀ’eórÂ]^O/òäu¢ø´cÒPÙÄ!ÆCè—›
üàÖ?ÈNjZ¡ÙÁ¼µÀº°(¶(ğËÍÉÍMÛ¦i[¡¥Ã´	#i$ «&=[#	|»`<J¬Õüû„É»sa^û: Ï¦»ÃH ’ÏçÒV&±Z>›6éyc­Jxl×˜Kg!·ru6]QKàùC-à=M!lõ!ø=‡à‡`}¦ ëp;¤Iwk=Ä—=æÒõıIÏ¦kŸy`G…ÍÃk¼wjÖ9^¿äø¶‡øvÏô“õhŸu{†Q)üìx nf5MYÑ9Š½F»gnø:Ù®s‚éLdà™„âsi}ã¨‰€|6½ßè§Å8ãtRFï¢€ó@oÍX”1û>ôÖz¡ÁU
åRßAJT8K‰
ø–9:‹¤d¨TFs™’(ß"BßC<L4¸ÅI©p ‚ ˆ¾êšáyÊÅb]Ÿ´y^s×œÇš–õ:ı{@+/Zr4˜KÏ»ßbÖ ´ì
/ÛËÔ~F ö²íÚ5„è:Áí~
Z…àÆIÀGĞ3~7/ÈJo`*§ó—Ø#æŒ?²ğH=t˜1L|EÖÅÎŒÎÀÙ†B¤i`kd°£¶` "IÒ«óp€ƒŒ”ßè_Éš4‘ q4tÆ¡çr¶ƒµV2
Ê‚Åìn¸ØÙg$ˆd‰Ó÷mAÄeeL¨2™°‰`xÌö‰ı|*Æ´cm(İùß2Ææõ[È;¢§S1vû¶@äß‰ñÿ?³bTŸ–³Ø›Îä¼N¨YI!Ô›ÏµÛ·õıŸ…ÃKIËiñCb_o­ÆõäÀñ”°}N9	C,†E,Uc:¾!Ñ«Ñz½ÛÓfg÷y»}éDò;Õ˜°dÃõ½aÊû3ÂœŠ„úWxliÚ‘xeªár·Ô;•™ê_àñÿM5¾Fnñ\Îñ4ídj OşÜÚ=’O’ÕÙCV‡æ>b®$ä’wîºs_LMN'ØÜš–|œOïŠÉÇ9d ¬P®Ğ†1Hûù(¦ß,:geC^a ¯{Â£O!yïW©WÀòP1$€å©lÈs°ñÙyÂ2Uø"‘Ú|ú˜2·g-G™+àRF¼aÅ àË²!ààØØš>É`ƒ’éjg)Xc*Ñ0ƒˆ“áwÈGª¿üRC Ë†8 OÊaTcP„‘©ıPqü& à“.e…¤ïMÛQûòqeÔW	¹/âiÅˆ@X™Ø×Hø{Bì¿ú 	¡2ç*†0ö;S¿Šƒq³Æå
AìtoğGU]ìÈn ízÈ€m÷ˆªÁ9(f/a–ZRîZÄIÕ'²u[ôÓ¦Œ•©ãdM|i\Íëe.®’,ègJÚs5GEğ4€I·ß@"…$ø98
Jö€Š2^{ı\ÜXG5|’Uj–›N\|ö×Œòw>àòéü§óª…2ßNİZ«q À{(,8v!)’¯±qšÔÜåBÈ3VÛsN'‘Nö6uâ0±¢İÏåŒ&"ê„‡bO1ÏX–`õ9cÎ?|àã[æ0=×BÇï–o—*lUz©—7\ı·Ÿ= d™Çä‹MNô3W#„(]àº?/+­•òEd‘˜¯ÕõZ™" ß3+9e0îR:‚ß§­ŠøÉ«+†b§0jA— ßcÒ/¢º‘Œ…¹rT½@¹‚aA±¸
–sP¨Ñ`–÷ñÙj‚¢–ö³•y›/ëe³HSñ”‡ˆ*G. ‰Ş{*VßnhrÖ¦Le½ Z´$ãö„t
íœw#ï¨@Hâ ­–Ù9e†:®6‹P€fgÌÀ‡Œ2
óœCY@¥bõYí±X¾©%®ÛÛ&	<0m…± ”‡LZ^‰İÖ¤ı~r,"›¸Såá˜dó’“%W¼ôèEKw¾ˆåÊÍu>ffœmí&³/%uSÇ¡0áÊZqyf,)Æ¢QÅ’':eØ‹ìW¡^Ë›ö²ëœsJ‹¼AU>döš‘	n™Ù,cjƒœıæ~	r½<“<¶1gM« Í~À°tÀ¹pY:àì‰xDiõI
_Ù%57œ—mÀ@©†Îƒ©Şg©6Â=•©­×PUå/¥Î·ÔØü¤»xcKk“è>ë’U9éÜçúæ*›{fÔ"F]à
ï–ïtbaÇÉ%ªz‚ëmrÕ:&bËF¢º	ó5‡.%N¯V¶É[„0|A¥X-ñE+«ïP_G.¨ù{"õËºŠŸ
u„,‘ä:¹n}Â†8kÈå~Ö v
İ< óá5	S1Ä0ÑOúUÈõr‹a9 Ï´Õ%X¶Kai!›¯Ôº‘UäÚ8uQõ³E:ô«º,µ(œŞ£‰˜Ò„áé¹«ò‚¹d]?ŒêøJRÃ ‰8¦<1Ä¯õ‹Eãù}²&9¸8¦d7>¦<ËPUŠ²nØ	Å&I
ì±ê8yíä"aÑĞ­puw“WpšÆTê•O­ÿ#O­È†]{a7’Ú‹„“ô=D’'(aá|	G#J“Ğó[‰—fª{.6] F;hÔ,ÌEñŞÉ‰j3 ¶B¥1’ƒÔBe$ú{d¨*
¨Xaª‰8
s¥Ä"=^Ô€u‚,BiÉºGG¶ã¢Ú`²8Ü9Æi€úÌ	JG4y Óí+œë@-û5éÏ[ÍÙm2Õ³Ã›f4ˆÙí'Ìõ€ä†Wf	îß’Ó3„ZnBX†@¨qŸ<‘å%ï’zJ5[9NAaıN!VtÏ²DÎ:¥ƒ¬'>›½“ÓfkP4Ä›áªî¢Ë;u$Lø*HyO±Ô) ä‘ÉH8€±êÜ‰š5“K"~^–¸6¾å2õN;ìRgÄÖ¾4b¯S¥•,²¹	Bx?òÛ+ÓîÎAjØ}£e¾Ó2'ûŞì IÆG„¢°¹Â|ÂÀşH¹u(£…ÎlÕ”–ºAïÕ¯B˜Yê–—Záv¶Õå§y«"yw>Y­™ŠŞ±ĞKŠ¨Õfa;œ´Á‹:!)uUÁİÚÛ uRs0­â—ÛZƒ?!`¼ˆtÛ’Ä£—\AdOäW{ÀQÖ¿Ö¾]%ó\u„$¼ÀA«HºˆêÄ#’Ù	1uÌœPÔ"Z ^‘in# '‹ŠÎy¶¸væ²ĞK[âÈ{À1Ê‘•±bØèƒçi°ÈY?©·êReF6"yj]†éT0Ükš¸Ko|ø"Õ°ålØGìÈ½½ÀëøıèDãø@e8•%”Ta~F(BÖY1›ŠG=Â¡Aü\/¹Æñ7 Œ¦ña¸ +ïÃäâáeã€U1^Õ—”÷¨ùq¼xÊAõ[ù:l7Ph$„}]·‚³Ö\‰‚zz9QíÇñ‘—œ•%çxÉY,ÉĞë’»?·¤
ùhÔ="N¯ÒM¢£TÑcsyìba¤^ HşgkÙ»fúï‚ÉŒ¹ sÍæ¬
#1¢€<_AŸ§ò|–Z*d%É­´sa¯„2ÎÆQí`Ôj£ÃêCBÉkqi?’‹u¥‹HÁ5ynëâá¹M¯•DÒ6ÒNÅZzoº–toµıôÙf9MãÊQb.!.^'yˆ`ëÂù0›oÃ½‚¢?Ğ¨u5Ú£Ì"F4c´°¾pNEÁñßÙc2è‘GñœËaC'M$œ5…A®'&ûAÕ<
÷#K¹¹ØÖìóë›õ£Ëí0¥C<é¬5öN‹ˆD7t/:ğZ¢OÃl‡ tİµ!@ÌŞEÕGÛî‡Y¿Óqƒh°’¹Ü÷•"\¬B	0•I¥ê<p˜ç‚'„=Åã}^ŒGz]¯	/NIïĞ„‡YíGšÕ‚½tÅZa%Ì¤×0»Ağ¥KÜvØ½j?VØæ¶¦®ĞV˜—ö)CûVøÌ+z›­†¼
6´¹„ƒ;I!â'd£eÂJÒ_?Œ.£GGZEĞròa]HqlIqbÚtŠÂ)!d1
ÕÑê0úŒ	Q7Ônİ<<ÁÉæ¶5î0J.Q8¹J.ÖÃİq}ŒfÖU]çõ‘Çì‘|NGûŸ\aÍ­¢ë^jĞˆ`|â&äR–‡de]«Éìú³6Ğ3ÕRD¬
sµ$Î­{=ëm@Ï¼µÑ•äÌ/EAÎH‘`_Îf†³šÍ(xœÄïWnİ&·;3Ìîğ<5®ĞÄ1ZÆÈÆpZ96tìPåû¸áQ^Q&‹D&_X]*bg(<¹o¤Cp0»ıMƒ#×No“ZÛğl#›:¶Bû»ÒH—ëé"ê-œ4Ò‰¤VÑ¼€ë²9âjµ!õ”ÀÎ¤Îì.tsÚ}¾Kí»Ã³á,*¼ÂÈwü­ßÅøŠĞ bñ±5gõtœkßùÑ…j0%n‰Ôò†ßàZ^B‰OšE©§ûë4Ò=ÍFÕÓ]Í€L¥vïZ”í<Aõ¤B8¦QÉk¢èjZOÛ34øi¸rG…zz‰ô–JÃEê¥aˆëÿ|Ò°HÃÇ¢4H"0õ/‘†Û€7%®JŒ^F	ì>ŞZÅ²Í'B•µrüTè(•ˆ¹"!~A$.BëU$ÎBœ„¸jn¹ıWğˆ+Éä?ÌF,R±X$ÆI¬91nå%R1ˆÑˆÑˆ1÷2k‰İç»V&ËvŸõbĞ>c'æJ4Š”8'JXËŸõJØ¸†ÜÃš·–ˆ+Xöpµí­åt‘Àæóİ°¡ló	B¨g!ÊÇOÕÌÌ¼`0ÁLy§ñÙ“áĞ“áÀ“aŠë|[Ñõ$Ø`,³ß#‚€÷º¿9~™ßÜ5ZßANSŒÃ.ú1ØA¦®ÒW,qäp¶™Ó®‰[ÊwD`°yàr§»Uã§ˆÀî¦>”²³E;{°áVüÄ¸ÔTk`íâ§]Û}²šï˜ÅŞÈY×š~öØu°Iş¡|Ó	ä¨?y
=Å=ìt)g`E¼+0.U¬Iìñ4“å3JŠ–÷.a³“i…§$^ò¼Ç®ƒMVÿò]'Ğwê_5~úmé#YMw:Tg°ÿyŞ£ÏÌbG-ö-Ç{µ•÷eöÏàMÙ¯¨ ­ûÜª¾èğ°Ûuj¾¡qÁ.zâ,QÖ¦„‰{ì:P¡+Ûu‚ıZ3ƒ¶”ŸÆ~£±ÑUöÃßJ00~Y0°»£F~gÛV6óİ-'›šœ*üØu çÙ €ŸÊ¡œìæ’‰ïùÙ¦ ûŸşßppô2ğ–Pznôà§Å ‘.'èˆ²4@^
NĞt²Vk0xB¼©84ÒALx/1á«(1Pb% Är@	¢Ğ?%J<)ñÊÑÎ	tP™˜(Az%ŞV9ê!Š„è‘´®Z“ãÏ¤—^}`òÊİ›ÈÃğ—m>á(´¾S9~Š£h¤%ç¥WéÆy t\V‰'G:QªDLŞØP|¤b¡(¿`2GNÁÆ£$§à%ã§cèFúêœ›§Ä›ÆÒäù4œª§6çæ)ñVó:ĞÊ­© (mƒJÉJªLñ¤ok5gB¬õãñêä£‰·%DIòÑKÄ/èªƒršà|’Êƒë­§x†F¥aºÅ|cÕhú÷¥¾.Ö~Uiâ%•	/	?ej¤¯J´y¼i¦©‘3m{Üˆr7 %¡2—¸Ô‘+Ô¢Ÿc²Ú=›\'R¾'¶Ü}hÚ{TŞÊİhM¥p•r¬¶êr‘×ƒ¶#JúR3Š«YÒd[=áWaÜp+
Ï‡fŸó»v›<ÒÖ=Ÿ’]}Jì1Ù‹šĞ9³Ì…ZaâYB¥_ù˜:¹{x™â!¿rÆï‡w­Ş
÷AJÜ˜ï¶ùvê8LÃ#Æ¢œLkŠÒQ p§ŞlÃ;Èxª>#ğœ˜LJÈOD§BnT|/¬¹ÄSşZ¾ÈxÖÌ¶²\fº®Äœ_d]ôïøşeÆû–ºM˜LiõÕ²r8„;AUËàUP¾­FòÌ”ôÛÕAu¶Åš,o˜ğ@3| Œ4q?ÚVL›úwÑ«¡YfH#1A[Å‹QïºL'g=SÛûšdîĞ©ßHn»Ü‰[WÙnyùb^ ‰P„?*sbï@ã÷’h§ÚÉAI³A4,@…~\‹ø£tÂEßç§Ã¦qº&¢Íç*şU~eûßmJz•}bù±BŞ¡7ğo%€ïğ ´¦‡­tOî	lùÉ¹'ş§/òô˜®éU;K"›ÍÛ6”ĞàYáˆ‹¾Wy¼ô‹pºçşÙs¼KéÈ¹±<ØïÌ=-Jü¸—'«R:Ê.m“!É=£åÅ@Y®Ù¸	óË˜Ñv„—(‘µ/H·g¯jƒ´§pó$™» É_Š’<GøiQ¯A”½YÑ=™i›ÜüC[îÓS{_~„*g®—P¾iñÏ ÁŸ`àÇxüáÅÂ&o£ …@¿Æté³e½I`»N¤ì¶tİ*HÏ-=Ñ{bDŠç1ßJ1?çä…l›¾Ó	®…ækªÀ¼ûóÿü/r&à5                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    -panes module */
.highcharts-axis-resizer {
  cursor: ns-resize;
  stroke: black;
  stroke-width: 2px;
}

/* Bullet type series */
.highcharts-bullet-target {
  stroke-width: 0;
}

/* Lineargauge type series */
.highcharts-lineargauge-target {
  stroke-width: 1px;
  stroke: #000;
}

.highcharts-lineargauge-target-line {
  stroke-width: 1px;
  stroke: #000;
}

/* Annotations module */
.highcharts-annotation-label-box {
  stroke-width: 1px;
  stroke: #fff;
  fill: #fff;
  fill-opacity: 0.75;
}

.highcharts-annotation-label text {
  fill: #e6e6e6;
}

/* Gantt */
.highcharts-treegrid-node-collapsed, .highcharts-treegrid-node-expanded {
  cursor: pointer;
}

.highcharts-point-connecting-path {
  fill: none;
}

.highcharts-grid-axis .highcharts-tick {
  stroke-width: 1px;
}

.highcharts-grid-axis .highcharts-axis-line {
  stroke-width: 1px;
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             