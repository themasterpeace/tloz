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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        q��SC�ЃvA�\;
)��	A͈���Rg�Y�I�����K�q��}fA!J��X`a��bV�{����x��s�7��� �5Ee�9�$�b��m+֝�N�'P���}.��^F�1нǏN��\9����'ɳ1������9��[�ڜ�c�xZ�я��1v�KQ79|a�����n��Zo4����D�0"�%*�a�Mf�	<�z�L��p�؟�B�s(
�9�� ��q����N�1n���[T�Z�-���-��6 p�sy2���5I2���%�`I-k�.PHŏp, (w�{��o+ut19�� �W��;=O�����#�J`�t'����4�h�#a敄��d�礰XH��s\�6o�Ȓ�A���I\��D��/+̂���SYa��tl��\8��҅H~�D=8�_��ne$a��x�;��g#�ng�O�0�f�~8e�(���U�IK�&��;����qE�ۧ������4�jl�bu�!��WE���R�Oɢ\\Tݭ=
P� `��2�2F�k@x���.��k���-r=�z��(�J<%c���BX��Y*ri܏��0R�}@�8O�����b�M�16p䡃���P����[>�� ��Kv�a��ݑ����R����oy�F`G��hZW|M�L���$��P�?֋Q���!
#xX=�q�1���3{NH�r��d����m���89��e걛d�V����7��Q�M}��.D�|_Oƀ{}|����b�H=7�v1�E������K�f��'����~+���2�/��7�R�E:%ɬ(pf��R��|�<�u��!���p[�^"5/NA%
'=؂E��5���oH�
���;Ŷ�*������B�����L����D�fbT:�����f�T�NS:-N��m�G�pHa��}�D�4*7���V\���Q;�RS��v�܎��W=�x�Z����S�z�{��Y��kV���?�F}�@a���pV�bF\�X�I�@����5�<�� L*`˳ܺ�XBaL�ra���q
�`�ph �b��L�a��(���v��^�a�h�;���w��w�=�y�|Pp�;�(�s�»�)L�f�F�G~r�=�1h4�IAX%<kS4�
��І�WK�O6����퀓%�㸌��cV�p<��H��t�X��|��Ui�v<`h���쳣�޺E�ua�L�P��.�U�,�\5t	gŇ�.n�n7���B�] v"��H��v������u�X&nV�.�17�t��B��hڡ&]���e��kd� �o�4�M~X_���'�N6XS=A��쫘?5�����P���F�K]ލ�_�����F����1���sR� �m<���%+U~ڡc�MDTЧ��m��1J6�z`0�Ђ:^��sF�)�
�$`NΔ/6S3M�����kV53�B����+g-{x�0e��s�uj�-��m}.(%����E���4ة�e�O�̔~ȫ��O�6�~�J�z�}�yXu˄�M�eU˄H�7z�/�q�^���+�Z����=Fu��B2W �:/\�oq([8�IA�~[<C 6GG��k� QD��EG�,�|���LV)KeThu�h��4gk�"'�0�cy��Fc��CGB��~X�<i�u�����������k����h�Mh�M��",g�53��
H�"���]Yy���l��C�UHP>O�� s�=]D�۪�"`a9��:��{��|���c*ؼ<l���
3	�J���a��>6ge�=$�Ը���a6qJ	 2"s�e��$��6]�����7n*��N<�\�a�&V��+�{��KlB"嚤Ǘ� щ�!C
����!k�1����P_7�� ^��y�b�D�0Rto×���&���R41cŉ�3-i���#�����,uRs!
�B�ņ5a�Qwu����)BM�4o,�A T�/��bFZ�u��
u�(s������,��rv�������:��c�ث�A�s	��F�L1E��(&u�[��ey%:l��M�\$?7���Vx�6D��0��Eހp[8�37�q�la�-h��c[lc\��&��g v�<O�iHtk��N*٥'P2jC�W6i>6OE��>][��͚j�{k����piu.�TZ�7�$��r��u��n2�1�᫡d,���L�
���$�V��@�PmkB�_��'u�W<(.�lpn��Y*�;�Wx��Z.J��s*�V�tlņ*D�߈��d}���N��$2��f**}$/d얶��	�TȇB$S�H:�htɓ��f���~���^j�K��J�q	�=��
��r�2���~�G��R[%J+�L����\;��i��'�@�TQe��!<�7D��,$L�]3�eyc�	�Jm��-�}L,'��Կr^� ���u�u�7�M�@	:ZM'��M�����H��g��<ӹ�|i_]"}L6ܕ}m�v��8���E���.=6��%�^��>@Ţ�����8	����d$e�����l*Z��h�1�Y(��ю��G��V�m���1}�ѶZ�6OTو�+�W5���H�TXLO���GA�p��q��p�����ig.w�7���4��f�Z13��]���(V.�/p��8������l��/�ⵝ��k�g�*�Z�B���CQ���nS|�~��+�{�hR�d��Tq�2�(�^�Χ%:e.� �3ԭe%^�������&�Ek�q�h�Ƞ9��c�o��lyUe�/��)��#iE�0�	j�I���#�N�\0Q+.�ˀ23d��{���r�~��l/{,,F,�B PK���PgMf�+���k/E#�-��
�6b���`ڄ�벵��SSU6*(~�?����h�<*Vѫ1����{��9��\���j'_*�b�ZOЋ�v�17d�k䥌$*����G_�x͖����>��-gc��if0�=�ú���b���;/�٬Bf����������{��yk��ߤ�g������������O�'���y�ڧ=d��E!�/))f+�7Y� ������?��=څ�w�����>��� �o�	����f���~�����w�ǐT�v���t���9A�o�pԻ�����q���$q�T2e|љ����t�j-&iO���U
]��!��n�߭v=����C�P� q)������5�
5IG~��}���cz�$�hjѸy���D���:���ӳ?�!�~5������OӛN�9�"{X�m4��t6eռ�V���J����2-%�J�K{�ZA�vRˎb�%���	��r��>��q��#$5K"_��Y$�-A�qCwQ0) nQ��t�{�b8׳�S<��7R��l*詍��_��ҝ���~�y�Xz�p�4����5�H�ΑE�!�=N�@W���:
�Ւ��e3ɰ*F���f>���jϋ�\-7��k��j����͊����P0�dA��K7�5����<�=��L˚1#�5�?�������S�
'v�jRD��]������/u�)�ᝯ_�FN��&x'��k��J{mlE)��9=�����r9Ε�	��h���7~IJ�DK��$�]аo."�,*� Y9�[��6�V$	b�K�����ԇǱkÕh��k�P��߶��b�Y�ld��p�;�}�����(4��^քl��6iBޮh#�-���
fE9q�u�����.�BNT��+.�:А��z���ct�T���7�8K�8#��hz�]��V^����j
D��/���"�	j�YM��E�vB״� �#g`�f'CV�g�rJ��!MR�-r���}iKi;��,[+3��F�S�3�N�ۓ
��;�XN;������<�@�vN�*�&��f��L�5#g���PI���n�W��O_�rvWV�G�p����H��ܨ��.o � �mb�$l��N�*��j7�PY��3?G�F\dU���U�T�;��2d��rh�)wZ�bg���i�b���O��s�^���	��,�a���5j
�s)&�f3�^l s�5���\�'-K��T$[R+�E��2���Zt"�� �n��Y�;�Α�
��P���9���e�|�qJiP4kFB�����8�RB�8���� ���p4 N��@)x5�=��a�#r[c))qګ~� ��$���0k%�]E� ��� �Ds#F�qt�ީ�V��#Zg�\ ��+mmn��FE���d���H*j�}e
��f�UYa�:i����f�OqM�NO�"�b���GE���x1ʀҞ��7������\�t!��u4I�R���o�߱����:-��Uq����j% S�����x--�W��
�Yr�A�|��t�����&�-���ˢ�#���`��b*�m���=x����	�֟o[�ǁ�M<��.,R�*Ys5DSϔ�Ip�l&�3p���������e��l�~������"y����Ө-6�];������h;	�9�9<!1��8Ɋ�٬ ~n�R.u.p�_�-g<;����s\��|4���� �'���M6"/��tI\��,Mk�x�g�h�Z��ja��8^�B{�@
��]ÉU<��jF�T��~@��"�F$��c�(�A�bзG��;��a��c���Ng}nq}��P�eb�kzR��@SD����Bc���jfs��j��ڵ����"��Esq��k��ǤS�+Y�&P�xg-��o�%[�0�v6�_a��w�=O?P�+�5嵜2���vx@sW�}y��#��'��q->���Pho������ړ��|^��3$�j.㝔���8���ZK#��`�@�mY}\�v��~���%'�k�_fĴ�Ί���������:�bʈ)r>�2���ԥ������(�I86�E�J^�s��Q�B-$��s�,��P>ߴV#\�P����� �r*
i�V�唹�����t�@p6��u����}�(ĵ�Ue�ZKV�5�Y�M���6e��m4��Hj[G���\�8���CH+AÚ{��ӕWB^N\r��*�K�P1[i�@�%/�l�ԭ$�6Ӡ~��t%�Gam��(�I�*��u�a1�G��C�l���X+����أ�?�2Et���q�/�w�Le~���:�\��)ruH��l >���e�۩Z*E�Z���z��~�L�kc�K=��A�G���M5W� �i|S�U�
�桡��ʭXnA��$�8��!ߙ��WSL���ё���0+>}AV�ff�Hyb�����H��Q��{ȎW`�y���)����R� _�ϔL��8c �*ݶ��@@�|_^�,Z��.���$��Z�W�PF�V+�Z���$����w��)�RI1��I ��:&��U��p���S@�/��&W��Ey#)���g�M���4���?���?+[�DL��|"����/R�I*�V�7îx���|[4-�9�����gDs��4`Q�{��.��n
�qå
C�y�I2`�p�S��6��C�����6�6��t����/��ϯ Gf��x��Ș3�a����Vn!����S�'�pA��/eA!�]\X��|���]�GD�^����ڦ+<�k�+Q�%�o�`�k������TUg�$�d+X��.?:�W	2^���r�X�
L0kP�NK��n+J9�v�����}���TmE�h�0�A�1��*y1ڴݐ��Q��Pl�]N~m��j��P��<䀡m|�!7������,B�R'��R��R����p��j@����}z������؈�����Zy��^,Vz��u� ��"��5W�����%oa��9]��@dǰ�F���f��*�d�j��b�D 睥�Ï��Җ�Ѝ��Gi�X��!���J��H�8�A4J�.qt8��,�@+�1N8!+�^�W�D�������P|�U�QW"�OkR|��m̍�.����k����%��`$)'i���p�	];�&
�~R�"j��㮽��H��b�漑����u���)e{f^����3��j���А�¢�`U����}2�U�D��Uv�՘��T�nM��r�w�B��sZ�Rt��"K[
�����E��ʧVYv+��5��a��,Q�S���oz1P,h����FR@�FR@�h���0�Z�\�l����81��z�d�������RzV>̴R`���0�%��8��W�d�� {��fw#���ԣ�����4-���T��	x�t������iJ��VQ1��ҙ�(��Ȏ� �d;�h"��.�y�HAy���Ҁv�7!�u����Qg\����.~t��E��V{,W�����~���샛��pB��p���T���_����]���
{�&�J�g����BPVw��H��Z�T�W��I.B�
���O5\�=1B�*E���Lk�� ���+"��{�"�&eg���:U���X�=�&"��/��ʒJX���tW���[���ي/�gy`0���v_+S|��#��)O5[hL`c��܅�4_���M�X�&_a��I�����Vˉ؂`M�[�#���{8o��� �-�܅�Z����pKH�L��ʦ���|[�T1cX����	��F�q8�:֊n�U���7�gn�Z�>�� ��Ț��hՈ��Vm�1�Io$몵��,�\��7[׸Z�k���)�H)��	�4�{8�Ҝ�T��ˠc~�3�쵩��ER�Em�e��
6����t���ڢЇ���[�cXC;2<�7eU�X0<d�G{�k�v���~4vlb�.��VB-'������j33�Uk3L��Zm<Z�,�;;���X*f��S�&���L����Q�U���H�dTb���G�ӟ����D��=��.j�F�����	��*�
� NW���� ��BXe���ur���U�~W���զ��Gd������ԍ���~
%])e9�0�nP�D*�B����$�Ʊ�WH �#���ȗ�7L�jcNEA�{p�V�c$���!(�2=up3#��nh������'r�&8���	Aې̄  �"���J�~F�w;���"��Py�AS�yC��	O�\j��5�n{Q-� �
�5Rp�Fڼ��@s�)�QpJ-���-���8�X/	�E���B��q7�Ti%��l�9Y�+��n�[��AF^n��J�jW,5�	�vy�I�+~�Tt��
x�Zm:^���f /��ڔYU�8���j\r���Dw�����i6�,�������fW�zi4�)U������'���R��"������
��Q������o��%��O��&���0��Str�/�	���>�&$\�%{G����&N��9&Ă�ނ]�c��?ẑ������f�}�#?٘����^��u� s*�I,x2:��g�l�](���h<Z�Ȝnwc��xW~���ʯiw��
�E���;�K]O:d8׳�"���0.q'�S��2�>9=�퉂��`����W~���Ԅ�b������}��U��!�B���,���^�_�N�[cd�Ui�ނ���/W�������\�-m˭{��3o?�eH�}%��!ϡI�H�V����ˍ��m�_G����w����H؛��x�)���pv�����)���=�BG��Ÿƶ��R�"Y����s8����?�T )<d�0���U��}��m�曷ː ޞ/Sx^!�x��������5Na.������|�]�o,��,�`�@����?��|8g�g/��pj�bY0Y�x�#�^�|�\.8 :K�}�I��cr�/�H�p�6��?�!8L�k��8 qa���!�D��{���K��e��
\h��͘N�?Q�rՆ��a��� �xPF�^4$g�aH����DF��9\ t�����Ǜ��Ve3@�4���_ �d��XY/N��t��
��%t������V��e�U}z?��g5b.g(z��jB;�|@�Lq<W��T�oV����!kxء-�b����Y����(�-�.Xw�'u�V�1.քެ~��M��Pp��\+Uv��ͩJ�Āp�6,n1K}) ��0m�Kd�<�����I��o{��l�������q��+���h>_��]�cέt�(Dj��V:/mp-��|�s���l�jMPA��N�@p��)��J��K�wU�}�a������CbAqrl����cI�����r��f伩O�s�~�i���\�U��M��ԅ��Η�� �a�B9$*h�#Dʗ�ű�M�}�EP�k�!#fM¤Ђ��+�����
P�HAF1������O���,Td_�R�!��>����>�Ut�9���j��J��R���H�P��DZ�G+��5:J����r�`N���u�[IE���N}��~Ɵ���XĬ��G'/XS<n'u,3v8�
��-�t4\�`8 x7%�P���Q���}>����j�BN�D� \= U��$/��f=�H��Ֆ��X���_cF��|r�T��T��G0�&���VR(�E���IA�~ �Cd;By�IjܭC4%%����B���j��,�Y��h��=0�DAnJ8
��d��|Y	@��7�$U��>M�?�*\}�
���-I�O����'��jr�����=��:b���%�8A�cJ��F�\h���S�T#<=�)�b�){��g$ ������Q��)>�ܤ�<Vm�)A�"����Vq&i�aTo��a�/A���b	�L��@7 `4Ȑ��k��
-����7�����YN�/o<�o�k��f�q��l�)��ك���恘o9�� P� �!C��.��Ɇ�������@L^YED���$	D{��UMb�������a�#{آ��Η�9��׾*�f�ī�G�Sr��`���R����R�D����t�l��Y�Y�HR3�wt���E]'/)�?\a����C��(��a�8�EP	���0S�27�� � �q���6��G,�8�a�*������lù=!�Y��(� %��;��"@�����4�>��&~(R��5�ᩬh.���O�MI)���l���Q�bjK�d�IzB�|Ќ��F�����YB�25��Z#�<!!5Mt��֟�!d5��(_Ū���+�R[�-� j	("6�ͧ@��>�DL�@T�nT���B'��I?i]���I3ʓ(�Y9B~�D��5X^aB��iS'��&�D����9>"b��:��Vg��m��F�(�O'F�T0Or�D��KZ,%�
	�eR��l1 ��P��:F�8'EYu�^��|���n5�y�ȀJk? �dމ8���H�]V<*����]A�14F�@�6�%�b@��3'�_�z�߀m�*Xx�Ӻ?��p,?���+���?�E�*O�f!7�(9~K�4bJu�	u��k����I�{��:*$��>	3^q���Me�g�c���"��4%	�}����W�_����Ǡ�xP������'lwW�	r�𽕥���8f	�PLM�6~$KzK9ʛM��Ȍ��W)�����G�a�j\O�ǝ_�ٴ3���]VdK�^��x��؍7|_C��'R����п��tg���Ǿ�w0J�W�h�p�ʶ�qs��B�ʚ��a�.�8aBk�]1� ��KHe�¼$Yt�6Y*��:z��z�F
��2NB�������_=0 �z�E��1��9)¡n��V6�فy��,�n��6��v{U�K���а�;g��Z˙�'f��rJ�����Sb�
�lvnϗ� D���v�ur\��=:�Y�BF�!#U4B�l�#�ᢂ.�-��_�t��z�����#.<�hM<�������)9�O���I�(�b�S��$ǽ��0U	�A����]vHk>k��"�C��̀�ܭ^c?M$`{f1��iX ���}6��̺�v/�����8܁��<�
���,�t��P{zp�@I0�=�4?%��i`�`q!�B
����!ͫ1bd����2�Q�N�0��3q{�O�aEg�?�=Xp b��SD1?�α	'� �1X��Jy� �5H��IL����³K�*�A)���X�^P��N�h�	�&�&��4fY��Sl����W_�����q���>\L�r��n�����Ё�Ő#���hAP�x�4���QcL615�>�	�YX�5��������tj��A����[���f�ꘀ�Xb
Ҳ~Bӓ��<u'տ���l<Y7�Sۼ��X��Z}� +N�n��x�'�kb}8���G��W�f��d�	�Y"up5ZP��"��(h?��� 
`�����A\P@^��V�,E0��iz5�G�% ,iIv�1ٝ#$sy��L��¿�]��&�OA�-��L���֔�Vv?I`0�=��-�2�RL��
��H��U �S�;����l�h&'.$sgw�.VM�!zb��Hf�����:�K���|�tU��ph�]nR$���,�Q�4��y��>�0Z�u������x�����h����'ۏ��������Ǐw�B%�1/�����w�&��FA��*<�A�5�;?M$��`�&��a��6��X5D�EA6�֡T��g#x5E��iE3L�Wzs�����D��� ��å�������]--@q���S����9� �-_rP!�.��o-����̱���2�I���ϩ�H�>���n.��m�-֎���jK���}9:� ��t S��©n�44J�^��{l��<��U�J.H(P��k������<������X�S#If�L�&�D]�{%l����@��}�CSO�
�K�w���'�����߮�rě"���'��h%��6��"���i�R*�����s����_��s��P�ا1�DC�r�m��a.�n��[�`g���6���3�a�_�3BA����A��Hk*>��	{Mrz��l��tHW�=�$޹@�|��U�ݮ� �qC�g��<)\�h(��&���jC�rw2Jػ���	�(��kAҰ&$���׷j�a�Ԋ�ƒA�Xք�5����1�-��A3���M.h������R��.Ʉ�r=Y$�d�\f�r���<_�%���,����+��E��Y���K2ȼ�r�xG�)��g#��`,�&p	�l�N�*ӡ�È��[6CL����q�v�� �a���,J�`�a: /av,-����yJ��A���s9C��4w6]"��9�� ����b>/�ZSi�?���3��@�Y�{��m�;9U�:��#,�C}�v�p�u�LX�8^��m�(z���\mu2�F1���^���ɎK{G��W͏G'�|��/����|h�Q�k���z�G*�P����J���m'ڪb{ԗGt1��e�x���>�2&/�W�b��������%~u�V]{ZN�W���K�0��!i)��^L�$�hP9�EK�?ӫ���Ke����S)�P����)(����D�u0�sN1��VZ����ykІH~��jk��>�1+�
>b02]�%��4F2%l�%_���f������@=P��Q6�5��ul�@����5�9�����h�h�>��p�
�T��#��1���*��r��/@deD�hW���c:��"���h wƉ�f���S0��D!�J���ܷ�{�o���#e���*� a۳qh�,:�������^���2�P�#���ꏣ~�����q�O��Ӗ������ӚCx�DE�����˯�#�w���I:0Np%�1Ie���`e���v&8�� �x�6Zpm2��~�(�p�v�Fp��᥻t"�K��f�)y��?Ʀ�C�~4���g�@�%�1�t����~��igkC��eڍ"���S�XkU[h	af�h뭎
�$��k	=)�\䉼��iԉc�b�%e|C���=�O:�4�b�����:N�8V|p ���ݝ�~�n\*�(��<����ᑲ�b������ap�j!�����̠]���O�>�i ;9l҈���W�-hY�)�����XrA&�o��)R#�>��rA��H��p�g�v]��rU�}����/���?�/�tP���`��/���6��;v�dc�ᙊ/b��`u���N����|�5��8\�S�JF����҆,��s�D��
=������`�
18���\O4�GP2��qq���G��G���_N�B'��XC�)�2>�8�{[[8������)�'�x�;�i��r��qq
'u��GӣѬ���1W���z�������A���c�w�u���l��:�+c4�	cn
�n�%�Q3	y�A$hĚL��;��^��=�H����op���F�᱂����#��X5�b&��`�ul{��k��An�A���;�\E�
3��p�B��҃�]�	э�(�'�`���5	h՗�E��N�R#'tV^��[L���C����ts������w�:~�����λW/��C�7�n�m|w^� ��t�û���n>���G��s����Jgӽ}1�J�bd�$�S������Q$�N1-*ts3jQ�j.����#\�C!d����h5�2d]	�E�(dy�͇b򅟕�����(
�=�o3�Ci����	%�����7fȟiA8�*hG"dZ�H,!�8D���f��5����h}F��5,cJ�W�"��"�\�!�\0�� ��p!�TRo<��X��d��P򛨅 �ݷ��x��|�l}��	6�]I��4�8r�S~e��&I���b�S�q��1�E��ɨ�v�{�&kD���X���(�/�)S�����Z{���e8�b���!��6ku|��1i��B�|0*���Ow>�1�A������\�,&�X����:z�f�W`��9��ň	f�Y'6�+B�C��<�Kx��cҸ���+c���]o6PM
Ɠ��ȢgV�!Zb��$��3�I<XJ1L����Q'<��N���#�Δ��8�Nb��9��M@�m�l�G��GX�3*s�i�����iE4��!w�Z�}GQ@!K	���]��ʉ���"�|L�������e��`�Zʙ�����Ԁ����i+�-<K4Hy�$�S̴%�h�js}��p&Uf��I��ϊ�6�;�\�������k���3D������\ �� 7?�J�%��4�U���O�v<3����ڷ�N&J�=]�2T�+ �|�6���?�"	=U_,8S�x��Pէ���c@�a��Xy���S��+q��3^�lZ}��-e���z�<�ܛ<�$j��FO����>fjlu�g+�<������BW�bPH`�q`ym\��Q��M����Δ����Р���8�饘J����7u��4F�I����9�T�Y��m�3����ɣl���b������hl+}d��z�q�ÊK�@#�9�����V�,�52`h|����J�1���b�pz����L���92�a������YwĊlKo�)O��y*� ���_�7����k�}»%Pt�X��dg�rr$HhB����p�i�� L>	~����<�x״�V�粉]š�c��N�.2Ƈ��ދ�p�J����<�ci8G]�a%=�>��6��ӎuDA<�.�2:��p���iO>��#�+�M�6��I��뀹FYE�͐B�7�܀6;��B���t�`Cو��z��G�/��S�I�l{�ך���O*�gu��Rrs���VI�h���@R�sY�B�Ke���,9�C�vBG���:`F���O�2�W�(Z~N�0/L�l�T���Vk/c'nD�(�V9���)q�ٓ�� ͭ]�I��YE?Ì)k9�ՒX���0_uY���/Qw	����99���@)6'H���`.�����6��H��;�����Ă}�[�g��.�;w!~)5��aS �q�c�� x8��k���t�@ �_� ��}o��q��<��++wp\����s�-#]�n�(�<sGB ��� g0�pМ[ka}J[���v�h�P[ôgY*$����F+�E]�ˢ�-{�F��Jl�
������t3W�� 3<%�����P����z�V�F f� �
�*@7���t�Q4X��bIcW��<3����K��'1�my��1���c�H�Ɇ �Ds���P�vU;�ݠ�M�Һ���� �S8��R�
�AM���.���� &�x���tE#4�.o�oE+�۱� ��Ksl���`�&�*n�ĺ�ȆJ�a(��ji��3I锓�
��W#(�Wx�<#i�d2�Z�to;	���&,(�?1�C\�O=
��`�0�c6j����WQ�]N	�	<�WP�#AW6�fE����=F� �s ��� �<:A�������	i2��.B8� �H��t$�5�po��ެ7f��t�A�@��8�8���"��`+�S�I�O�V>D�Z�Ӎ���GͲ(G�)����3�Bi��\�A�պ�h���>0>�(|�m���[�4<�^a�$W��K�_��}2���?d�'���U��Ǖʛ�:�bs����P�^�qZ���+dqB�ϐC��ɚ��������6��2=}��ޞH��yt�T��Q��3fK^��R�,l��A9#}�^�ZT�HL�F����=�=@�'�LU曒�p��g��\�Rݯ�0�C�B�#�(���%V�bZ@��TBKV[C�⶚�pS���2�e+Y�i���"Ĳ:p�"F�b�s��^.b�OX��T��L�zBo:�,�'X=QJy�iSI���	I'EF�S���dr�i�+T�
KpbCU�p�*��!TWbu�K�B�n�6B����@�C�-z����#
��r��+>���5@h��e��� *#�b� �'�v�9��).�6D�8��=x���Gb�������l������H)��6Ǩ{:7	�F�A���X�͸!��\E_��re�2��c���ñ�g
(:��& �	E��Ä��-H9�� ����4
ZFQ� >���¥ܫ�`�q��e��Ġ��Ɋ��y�����7��+{�$	 P� �9�4���D���k��9
sͳ�?��rL*	)�����+���P�п�F��!��H@%���
�Y��̠�U3��V��@u8��!�
D��Db�%{i��$ݫ��@���<�M����b���,�Ů���R���7�K�����]���(�������t�1�e#�v�tF�8rD9�=�r�R6�9�/��pԀ�oX�-$��d�z�D�RP#@��]]������x;@b�����'�E?��Ec�����9�O-�T�	�S����c�s5�;f�;0EC7��BӔ6�`ߋB���HSقu�JX��O�y������;��:U}�,. �B��zQ� _L�t����I�1n�#�Y8>SU�t8!)|��'ohG�%D*��b��'M�Πc��8���=�)V�x��e,�gD�~�7�_��e��B��+�*M������Z��Թ<��܍��it���V~��I!iB�$���(S��?+�_Ɲ*�w�9�wS��7�eHT+��̆n�ib�Ȼ���I �8���s�����!�J\��a���S�m(�>.əD��ri3��	����bq38�~=4��.��`�Q�hp��4pR��7��9��@)�hșe�XX�.#���I	%�VR=Т7��7vDO�p1!ÍV.���#s;�����9��
�Mч�1��,N4
o�~k��� �]��1¥���J�K�,g�ĸ5V�U��&edԙ|�9{a���@���RG��V�	�(|gm���\{k$�D�i�i9�������������'��7��P2�M�A�]N��2V!e5A�(C�*�L]5TR�R*
���L�ӯ7���K1`'�[�Hh�|��0�������JN*̖`�J�8�r���W���(�����(8�T+
�6��ts�o��,E80N���6(±D7z��44��
�bf�����6S�����w����Vn�R���Y�r��/ ���o�}��j��U��n`�Q�M�d�a}���;�x5��"ʔ]p�dr�r
���tE)�N�$i��"$К�gգ��X�!��޹e��Ɠ4�6�-��WpY���W'�����*�-o��	Ɩu��9K����C�;���I���v�c�S!$�f����̐������'������쌅?�<��^���q���US,;~��=`�q��-�8]���"��}C����%B9�_�NDƷ��9Ÿ�t�@,.�� Lz ������3������4�(h�1�4jX�pt�<�G~��0ޝ;���ã8���:+΂a2H���V�k���̝�c�9�f�A�	);n�Nm_�i��1:h�I#jn�]\hh'(�љ�Z%[s�qxf��V9.�&׷�lj$0����C!|d@~=���5r���s���j6k^s,>[��͝S��Jq��<Q�k��@�;F�<''�Ե}$+�oS�C�^��94/�y~	��E��H�JR�O2���լ����˰�/�(�/U�Mv��'�t��b1�i��n�o�.����5@�j�qM�Y�V|�i�V������\�����Q��ݍ�l�r��^��B)���6p5�&���݇�>���v,��A�]s�QE�~Z�(#��.��X[|��6G�
,9lЇspA/:8(0�����*�+��e!tk�!�M3�o�u�O��ޙ�[ �9ۊvA�A�T6�pP��$���0<�^<I��3j��8$��a�	���(����������T���������r�^d�̚�m>ڐ�IN&����F��H�`Pn:H=
�WC0�!�Xߒ�����vf"��e6�
�c����odr0�kĮ���`JY݈c��#"S�<���U,M�$a�yfx͂��$.���)RNb-�-g:�Z"�y���7�k#�A�Uz\��^5.pv�t�N5`:����0���<ޤ{�S��	?���/�hxBۊJ/�'��-4o
Ј�~h��K_����b�*f/� �7��4�T8��� ��"���(�<�������I��u`��C��� ��jwW�8�TD�דg�+rT>��xM�����r]� %7�������t�R�� ��6���d�b�;u偕�����v�A��Ị|�� ����[���q(� 2�I�`-$H2���V�I{q5������ǵ�ʚ�PI�!2UB8�g���X*-��=�By��ރ*p�*���E����q^3@C����N*��]$N�����m��>�d�	_��M���;��9�
�e,��a#B�.V^buY�kJn��,��$u2�Po�A*�R[MR���kPj?jA9��;�;� R�M~���m"?b�|�W�E����5��D
:���f���|�]ePqZ&=:�R,,"ta���H�ka��l�4h��>������ܠ��;E�V�VĈ  e�N6���d2'o�������Noy��P�?�L>���zf�嗜Y�˘�?�t��0(���q�����6�RX�U���ݸ�lC��dWV
4Cْ=t����>��V�d�6�۲���R+]�f0B�����&�����_$�߁��c�OQR�5�3�D��4�=�rT�Fk�i�e�i"����<�ۓ��L!���O�u��0�:(�tj���%��'�:�/����i�;	�&���0���3Ce���I����@�|:<�| 7N�ʗl���p\�c�g��d��] �"ʓ����!����n�Q|e3�7�n'�4H�9�#�����t��0D#��	4���Zd)B�%:�C�����*Ϯ6�#hS���c�b�>�6Đr������׮�q,ͷJ���'�J�TKf�fp��򟌵@���3��YqÁFV�}��T[؊���?y�qq	Ԇ��� W�����@�C��H׌R���y�{������#��}�o'g�O2"��%��5.�C��#��/��
ĝMVF�+^|�J[����}��>���?��6p�*{~��铰��|��I�ֹi'z�K&��k���U՚�r3�Ş����eŦ��Z7����R'�.U��7��r_0 �/�� ��*:Dҙ��oZc�.�>*�~,�ðB�w��T$���b"���'ٳ\���P�b���Ԅ���PGy����4��;��7�
�2O�W!�uJ�Nn%,��|)\$�)I9�>��o���
��yd�V�c86��7�BIB�qE���8����(����/&���9�shd�S̊Jd�#yy@Ȣcs0�وBc��5-i���p���s6o0?Kx�/ѕQ����V�1Hp�z�-59vS��F�\#-��8�Ҭ'�%��j��E��Y`3���z�rY���\�cdҭ�kf}�������X'|�����y�z�-\�IzB.@��Ԛ�Y����΅���(�BnV]2�F�L���rN��z�'4�7�q������]�L3P:���B�5��@d*�h��:��|�2n�%���=*��"7��������ފ�ؼg�_�
���{ԅs���t�]�4���H���8�x����U)�e�n�V� A�DѩLjDy�q(v�tg`*���4=��d�9��I¸�� �L`^��Ħ
�{���g��q*��(��6#f����� ��2�G!Ľ� Mjn~"������_10��<���7�O�9?�n�\��ݓ�%�]�s�s���Z�2/qq��So6ҰG�ț����[�ڹ���	;�������wW��ÿ`-��B8���z��dp�O^�:Nߡ��pg���-dc�󴏿�A}��O�>�L^�G'���7H���x7>��:Ljq��|ԣ��[�8� }�{����=I�A�L鲏��'[��RPx[��p�o����Ϲ������J i���m���O�T�:�����y�0�P��}�&��O{�آ��Ş��	\��m+�~�72Nz!���&�S�����|wKV���>���dI!�^�=�B�ob"��9��My��P�2�{Y��R`˄�<��sx��(�<i�x�& ���. ��т����?�Ud��+�����ӣ)����'\S�wސp�pW���>��q�M%7r�q'�Z>�W��Dݵ*� �[q6H����G4+v���O-����E������ 1+�$�������������խ��_En�]�O7� �8�W;��@�#h�)�p����F���_�P����_���7������h���l��?=��Ū<�A�W;��\h��"|SlR��%�^�b�s+��;>fф+�.�V�2�K��1(uz��h�:-w����N�Pq~Ɓ������)~`�m#M�
Iai�;z��:<I�!��gt��.0��#Ll�e~�q��iL_�@r9�0[1�����Nr��x}(��}�d/�02T�=��x��!���
�7A�*��I��4�渌+���|�t8�<,�������e ]7@�	��fw�i͆8��tD[��n�`"z���ʾM�D��j��Y'�C]ݗ�Ǘ�O��[T��F�Q���&i>:o�r�I�����	\h$d�V�W�pEW&C����P� ��R����S���)F��͏�!��Q�t\̠�e�`�	��b�Pz��}��ݤ��W�N!Ϫ�)����	9�
�QǴy��zU�,Ӣǵ�W/��^��垙��n""���F�mZ.�*�r�;Q^��ۙ�c���d2=SS�������λ[9.��vC#	�&����\z���W/�������nk�s�_C����tu�b��o	������*	�tna�ǵu��}����ש(�b3����Qͤ����!rH-Y�r܎��i��*\v+/��&T���y;j��	Z��\���t�u��:l����9S`BQ;���!�!��9:������2lRɠ� �"6|�I����7�J��ϊ��\4���P:�
��ǏSO`
��N�~��K{��mA�ƕ�#�u���-�v�A�p��3�y�K�p���M����x�n�70`��82c�-0����ZV�?�>���)�"�hUǉ[�am��4�o�}�q��rO���ʙ$j�q�FS(؂���4�;ҥ���?�{��wp=���-��;��p@%� i�;#@�{,�������46�m�	��ڤ43iX�@��Euͺr��`�|:�������.|��˫ح���}�Y���$�<��v�G�X�-�KK���9��������� �Ri�~x�4�6�!,-�JF�S��?����7�pG����[k7=�Y�9b�f�r�X�VIY�[��J��у�SKq�ׯ߼z��z����D���[��Pjx�R�e�9���%�C�i<���;M����^Z��IfXk�"���ϯ���խq�[,p|��fD�	���t^������ ��Ą:G�\"8�*��R��*1�U�xx�=�(k�HU�v�I�f�tOk�guFnH�v�J-��"�1E�F��'@1�߽y�����^������w�^���mg������LTG��!�p荩pN�S���R1���<��+2ľg�E9��tm�/&=���[�j��s ϻh�L��Ǚ�����q�F�aԉ�����(��P��1�c�$V�Y�6)�K���"�������Ĺ`���uUV�\
�����\2w�;(G�+�QaJ� ��6���^}��O�i��[��>�
K��k�	sH������K� ��G��>�u����Ɂu�̟mH�B���t�};i���r�-89����wB�;I�[�c�M����jZۦ�[ pm�m�R�O�m����� �6a������hx����W��Pn���:E4DBKL �қ�/^ܞ�f��C�R��Mh�/*?_���b��(X�PH'6��٤N�6�^���2�<{��M�k�Q��J@~�R�Ϲ2�
�j�g�Px=>�p \�d�����h����֣@�òM�ZnB�ii��^�!#�Q�)*)�l�ahv�6���<q�&�[W���蜷�$|��L��s����:��!��j��^a���,Jo,w v��E�W|-��8/�.�R���hN��z�z��$	n�����u�,h���@@�P�/6��C�cҐ�./ݰ�M���/�)�`��������JU�a?I<���6 �w���gI��{Ϣ5�Gș�u
iȩG������)��kqR�$_B���AG�T�1s�k\<� K�� w�;o׎����-A�[ ��7ud��.���0Dyt�����i�@���B=0�}���k�^�����,%{��\�͏r�.�\�xO�H6A���D��t�M�j��`�d�<lA��=m����b':aZ�E'���� _�ꐚǟ8��shO�T��ɵ	�����n'w�A�0������r�Π;�E-�pyά���� ��v�c���5t~���%��'_��{:��PSL!��&�Q��Yo�O��ip3�P�l�W���g<�lYTo-|4B���F�mP���5ӂi
1��T �L����h�H߆f���6�`��!i�k�����^����P�G�;��n�1Jc�-,�ɨz�Ϩ��5̱w$�?�x4�)���'�竆�FCѕV�SA�#8��!����t�[�x�Z �(��kA��K�u$<!�>,��4���{��QĈ��e�K��dt�P���� P�u?��&v���a���	dj6q�H���A�i�^�p/���	&:X$AR��9Q���:u�Ώ�<���ˮ��q1�uK#���$1������aK�ǖ����#�}%^��i2V��pJ�N�+ѱ��彥S�c�P8�;5lx��sj�%蓲�m��$J;�^
�To���-<�8���Vs�R�x��)��4�̲���-���x������v�A�)Q{:��	�9~Fd��H#���U'�L����*aZح�쬄�(5�e]L�x��N�/�#�:�]�����=�����,'�N���,(��r���cN�9��^OF��NO�}8�S���"�rE��|úX��o�j��Y�$��P�� ���:R�R�v�1M���2*2��u�б��t�R�6�����ĉ�6f�]=M�D2�=�@�@��p�r�7?�Y��$j�qF#@�yKEB�iw��0U�<���

���Q��������l'���F
p��;@�{0�U�SS�I:��PUr�S��3��B�	����OG3��8�<mc�ՇF��!@�q0t�?�7���)�V�f�~���<"�D2Ŋ����$H 0�SB�qM{|�M��8���&&Cپ�[Hq��G�@	�g�m�҂��	�\,�ds/T�
������	�1ii,��e��he�bT�E��;3p/��IMapm��T�lW����Y��Qb�{{q����E:����U�]����c�:J�(�р���B�B�4��	����\)�Tq�'}�VJ<W�yw���y�Q�x(��5�y%��Qđc�U�j�:��!����K�*���%��Qzyٞb*+���o�ѭ�Ha� |�j�ƥk� �B�:��J^}��\ǫ�������Zr�j�b����Ƨr8T��7���V�h�8`�"��
a% �qjʔ׮�tv�x�'z�L��y��@��+�����3L���{QC� p�R������2�06b���ÕYI�:���Խ}7�H��\�	�y�Re_�(��UqowY _Sn�����S�+�ݯ�pA�~*���U��S�&�"cy�7�&��	�ic���\>����p�;���nxDX/���Zt���F�n��E� ��HQ��X	�Ǫi``��d2}~Xݿ�m��_l�܇B�����"��i0�����W��+s��Yo6�,>�6m3��.�9�����s�s\z���Xk/ނ%����JN�|�������3�����a@a�{�Qt���x��D�9,��g��w:�gDI�:������P2��N�8�ς���I�dH�"d}�rՠb�++Ti,���ӆ����n�x��w�O$��=���^�����xB%`(ʱU���gdN�T�2���?��K`�&�$���O���(�vn�#�㪸rxɷ�V�������[$�C�N�B[ضy�W��ە6\��H�v���E�����y���,�"
)"��H{~��
�v�������Ɲ�����{�)E��l�ǋ�/��C�q��# S<�g�n�����i;p�H.�4f�l>x����SK����cl9sCb'Z� e��XK�~C�ڦ4VXF�@a�8C��K��2R#��Q&�9��c,jg��ّ-H����^w��}�'�_p��Qz#��o���uE�����Z���2��l�\I��-�5���Z���4ax`����/��_��Ң�~���s|ژ�����1"���N���_�R.�|v����~	�6�29EZ7<+ux94C�\����nƥQ@ ����Y�Ԍ?sg�٭�u��%�s����5��JB�jm'�.��Џ�H�T6^%[�r\��ƍ�b�uu_���v	�}���v�\b����&�}��f�֓�l� ��ߒO����+Z�Φ����y�.;H��28&��8�.Gh�<y���]�F�����Լ6�h�^S��-*��������iD��sO�ׅHG���IiӍ2����[���\����>�j["��d�����l�	Ѫ�Է�ӵo�����M��9۹��w|���4���oEs#�ŜGP�8��y_��q�ux�b���:���2e�폧8���0;-)e�:�V<XM��&�L����8V�QWP��J����B�Mr�+��Բ/����w�z��epf�:�����/��K��V ����I,�gyQɁb��|[�e7y���H��(n�SC�����k�+�f��/m#U�������IZ	?���8�l��^�T�����	�ML'�8�^��}b��Dƅ69�.�������uV�7A�]5���j�7��[u�!����͚РY�o��/_���^��_tE��o��Ɛ�,�e�C����c[ÆN�׆`1����t�bz�?@����C��#� ���t�xK!Qݑtv2�->���׭i��6ᤕW^���`*m����5\ZI'�d�%PLq�0�K"9����իs�+�c�ɣ�J�� Q����gqZ�<9y��XzNQ�4��<8׏-ң?h�饼
E����q#�j���|z�y�'i�z{B�e�������������tC=]e�ׂ�]Q󅀍鈏^�\K�F� ��Eh %�E6b��,��@m`i��d��|�G�87�i�p�/�����a����DtV�s��3MBD"̪A��k�xgCH�XY�_9�h:�8���zЄ8/.��]�V��Ì�OpUQ�_h�nnآ�	!;z����L�iߦè��CX {85���ݦ7Z��[ƐC����BtMzB'Vz��OcLo[P�R3@P��klw���*�����v8<�Op�1{r2�'6@?XBi�.x���دA�
��N���	zƓ_��`�xK�9���[�'凿'z�{�	a큜�@�f�B;d)�Ih�����2����lv�J��H!���݆��t���  ����3 ��(꓀��c"V�YB5Ȳ0�C�Qh|U��v=v���q%��"�+��X�C�9NcL���-Y5�q��8�(�Si���z4�������7����%�ݯ����1a�=��G����k�q*�A'ݘB��"D����-�m�1����M��8A��l^
E�t���`hY

�[�%��{��=≑ňjG�?Z�#7�'�X�w� �
�v��f`�c=�}�<#��Q_b�s�%�*��{!j}�(M��#��yLY�Cx���%F���^��Fo��2��<Qc�a99���^S��ռS�a�t� 3�(QΎ"��!�|G�8~CR(:�ϕ��cڣXpתD]˅e� �g#��8��8d�
X7���v�����\֏G���P��Y	(�1h��-����t	+k`��3;,s�D&٦��I�I	l�pa M"���m�/U�� �G�N�b�R25�[���qr���i�]đ�n��$;���h�[��~�� 4.fAJ����Rs��`P�*��)-�Y��	9q�;;��F���r*�NqY�"�2Un�^��n	��>��+�y� �A���<oA��C[�7�r��~Y�ÿ�^�Ђm*�e:g�Us������$_�����ø�;�S�o�Kt4t��7�E�)Z�s�e13�3���e@Ĕc.k����I��B	����L��=���?�����5VL�� Ju]���Uc�O/���u������M�Nk�t�_FF9f\�E�N�p��e~9��A�`�`�ڠ��OQ4t�l}����H6�tK%fB���	0���\A�
ǜe�;X��QH�ɭv>�A���C���]YS[�~���'f����`h"&�Ԣ��xzؒ@� ������̓g)U	l�tǌ�^�Β{��̪*����ۘ�Z�i�*c�ˣr����ݫ!t[?��=aҿ���;J`<�}��3�:�=%������5�������.�H�肓�Ȃ!�B	PE zEvO	�iݟbm��>8ZX�-,��X��Yz���R �
-�eoEL���)s4#�c�R$�q>����\��/+++FDr�=K$#�U��e�!	NV�S����0Xm~�n�X�s���"��
&�S[�d��Ur#���` w`�˗�[��ެƓ���S3�{E�(�=~H+��@j����`(A_!GA_�+���q���!.�	g�i�Jv)��t���C{FZOIq?@�&�k3W��.x�C8��w0���I�&���kl�4mo)m���/��iu���f�,>�ſh.��T~)f�p)JdM���@"���c�_�\�@,��H~��n.��FP�t�#��{C\p3I��ͺy�Y/,�濈�d����	D!{��J�$VĊ��W�k�9yj�f�U����\C�tz���� "�x�i��9Z���"Uv�`�\I�����S�J�ȁ��A�
����u��.3�VY�3��
ٶm�ԅl8"rɔK��<C�󗞃���Q�~��>��hw2D���a�ާ$�ܴH�*�:f1���l����-��Y��h�sY�VI+��m����W�f�R�5l����>���C�nC�B�Q��?>�SJu�8��@�v�E��;c�gB���^������
�O�e�i��R�u��+
/�6�����!^y���?�\�S���<U���*�	��Dk(�t��]��3VrF�"yub���(ƶ����-z�{~i����`�[�e��8ڷ;ѷ0�zaq+�L26�(�\�I��@T�	�S�R�T},��M���h���5~sp+ؚ�Du���'[K��t�6�#ٺ/S6� ���yzK?'�e�SW�u`��Ө�ݍ���㱍�Jv��!���9�	�,�/�r��Vc>��U��E���@1����U4� ��_o������=NS,�Ca����Ӗ7)��@�[��{<E֍|q��C�jB�&�Y���:I����~�)8q�;./�{Rǹ��5�����\��&9 >E��ꋢ(G1f�|��!s�6>4�H����A�|�o��M��&x;6�������+�Cq!zuDk���:S�"F^�����%��e+?�E�A4ZD/�E����f�ȵ+]�E��
B�3[�ױ'�	��(X���"�O��&���rܵ 8�����"�
e�)I�7�|TE�1�5U&���T�H��̐ȜR���	{%�f?�� X�i�!u���%"X�M/x1kX��4���&&/07�I?�mc�L�@�j�� !"��W�q|*sr�{�x����z�>~+|��rB�)�$�P��v�)ӽ�KJF�$��Y��\�J�D sD�Y�q>$��\w�O�c��D%>T��륕��w��O�9.̊1}Za	^D�7���~�X5���*J3ȉ��)�0�8 �����͙�x�����1nn`�8�����Q�}�EF���s�ԺR��eq��vj�A(�gL0�C^��1�mW��� �B��?��dR����1��'uWe��V���x�|��h?���үh���	��K�_��}�BN�:�6`9�<I���1c��#����&��|�q��P�db�P"�`P��e<,�~�U��O��>����@�	�'5��˃í�r��'����Y�1'���s�%(�R�)d04�f�A:��ȱ>����z�he.��`U����/ޤ����e�2L&�Ӆ+v���LQÊ��O��)�x��L~S��øpo�*��ds����9�O/��ۯ��@`��q��Q��^c��� ���+Ffn����3�Gl��e���*�9q�e���%)~N"\��ʔ�n���B���>�\�SE���G�P�|K4sx�q�1�"�"4�0�	�k��k_K/��g�� 8�!~����r��}��ܢ��L��@���h� g��5�m��܍�F,i[_��{��0��ˤ��b<
E;���6>H c��=/}�*�/�6�G�()K\��q��%+0��S�$��	�W������/5��˳���>���$���;e��@(�z5�
j��r� �S"�"��a�)�/��.�K
B�+���O�]����n��u��74P���t���U��2�֪�e�v�.�>����$ݮ}5�k-o$�ͯ�-c���|r�]Id`�u�i���_-cZr�*1�"����� ��t���d5?Z�r�mKf�������BC+u��еˤ�c̎��VS�ܾLVW�u2 �����Z��mֺ@�������^�=h�g"�W�wL�n���9T�W�V�Fp����F���t7����-��wl�)C���t[�>A��ߌ�&X+)n�`"7H��B�,$��]�F�I7B	��'1]6-sW��څ"���&��ZM�Ӌ䘶h$�b)!�}Lv@��d�3}5_L��im���qʸ@�>���vh�a�̙��ņ�Ң�&Bj҃`6�\��u�
f���d�AƇP�r������XpO�c��a�����������0y_d����CŊ�>���3���p��uX���1Wz����:��Q�K�&�z��f"z��<�${�[͗��Tz߃ژ��@핃������;�/������p'�;8~d�$����|�{����SN�����dY
k��j�R��g#5d��!'�\��8��-�j�Ω�o:�ɭ
¾��_�����hx�2�0��q�$�j�&!q��#���׸J��tK�.��3fu^��+�1�����i�z�����x0�!j�o��,7�^+M��[�e`�#ؚE��ߋC�)��tQ{�vN,��_�_-�r�l�7��G�́�-���)%pWZD��VoZ�rp�'�nv�:PR� gd7���#����gF~r#�yh#��<�T�J9`̑]���ˣ���b��"= �}l�J]�I/�;��v�K}�]`j��Y�.;�������xrgCd·
�nQXRr�����c�O��e	2�䂐�ME�Ѷ�|vNgS�ж�}vκ����9]7���liH`V���g�۱)}��������.����e�r�]^O/��u���c�P��!�C藛
���?�NjZ��������(�(�����Mۦi[��ô	#�i$ �&=[#	|�`<J������ɻs�a^�:�Ϧ��H ����V&�Z>�6�yc�JxlטKg!�ru6]QK��C-�=M!l�!�=���`}� �p;��Iwk=ė=�����IϦk�y`G���k�wj�9^������v����h�u{�Q)��x nf5�M�Y�9��F�gn�:ٮ�s��Ld����si}㐨��|6����8�tRF�@o�X�1�>��z��U�
�R�AJT8K�
��9:��d�TFs��(�"B�C<L4��I�p �������y��b]��y^s�לǚ��:�{@+/Zr4�Kϻ�b����
/���~F�����5��:��~
Z���I�GО3~7/�Jo`*���#�?��H=t�1L|E��΍����نB�i`kd���` "Iҁ��p������_ɚ4���q4tơ�r���V2
ʂ��n���g$�d����mA�eeL�2���`x����|*ƴcm(���2���[�;��S1v��@�߉��?�b�T���؛��N�YI!ԛ��۷�����KI�i�Cb_o������}N�9	C,�E,Uc:�!���z���fg�y�}�D�;՘�d���a���3���Wxliڑxe��r��;���_���M5�Fn�\��4�dj O����=�O���CV��>b�$��w�s_LMN'�ܚ�|�O���9d��P�І1H��(��,:geC^a �{£O!y�W�W��P1$��l�s���y�2U�"��|��2�g-G�+�RF�aŐ �˲!����ؚ>�`���jg)Xc*�0����w�G����R�C ˆ8 O�aTcP����Pq�&���.e���M�Q��qe�W	�/�iň@X���H�{�B��� 	�2�*�0�;S���q���
A�to�GU]��n �zȀm����9(f/a�ZR�Z�I�'�u[�Ӧ����dM|i\��e�.���,�g�J�s5GE�4�I��@"�$�98
J���2^{�\�X�G5|�Uj��N\|�׌�w>��������2�N�Z�q �{(,8v!)���q����B�3V�sN'�N��6u�0�����&"ꄇbO1�X�`�9c�?|���[�0=�B��o�*lUz��7\���= d���MN�3W#�(]�?/+���Ed������Z�" �3+9e0�R:�ߧ�������+�b�0jA���c�/��������rT�@��aA��
�sP���`����j������y�/�e�HS����*G.���{*V�nhr֦Le��Z�$���t
�w#��@H� ���9e�:�6�P�fg����2
�CY@�b�Y��X���%���&	<��0m�����LZ^��֤�~r,"��S��d�%W���EKw�����u>ff���m�&��/�%uSǡ0��Zqyf,)ƢQ�Œ':e؋�W��^�����sJ��AU>d���	n��,cj����~	r�<�<�1gM� �~��t��pY:��xDi�I
_�%57��m�@��΃��g�6�=����PU�/�η�����xcKk��>�U�9�����*�{f�"F]�
���tba��%�z��mr�:&b�F��	�5�.%N�V��[�0|A�X-�E+��P_G.��{"�˺��
u�,��:�n}8k��~� v
�<���5	S1�0�O�U��r�a9 ϴ�%X�Kai!�����U��8uQ��E:���,�(�ޣ��҄�鹫�d]?���JR� �8�<1į��E��}�&9�8�d7>�<�PU��n�	�&I
���8y��"a�Эpuw�Wp��T�O��#O�Ȇ]{a7�ڋ���=D�'(a�|	G#J���[��f�{.6] F;h�,�E����j3��B�1���Be$�{d��*
�Xa��8
s��"=^Ԁu�,BiɺGG���`�8�9�i���	JG4y ��+��@-�5��[��m2ճÛf4���'����Wf	�ߒ�3�Z�nBX�@�q�<��%�zJ5[9NAa�N�!VtϲD�:���'>����fkP4�ě���;u$L�*HyO�Ԟ)���H8���܉�5�K"~^��6��2�N;�Rg�־4b�S��,��	Bx?��+���Aj�}�e��2'���I�G�����|���H�u(���lՔ��A�կB��YꖗZ�v�՞���y�"yw>Y���ޱ�K���fa;����:�!)uU���� uRs�0����Z�?!`��tۍ�ģ�\AdO�W{�Qֿ־]%�\u�$��A�H����#�ُ	1u̜P�"Z�^�in#�'���y��v��K[��{�1ʑ��b����i��Y?���ReF6"yj]��T0�k���Ko|�"հ�l�G�Ƚ������D��@e8�%�Ta~F(B�Y1��G�=¡A�\/���7 ����a��+�����e�U1^՗����q�x�A�[�:l7Ph$�}]�����\��zz9Q��񑗜�%�x�Y,��뒻?��
�h�="N��M��T�csy�ba�^ H�gkٻf���Ɍ� s��
#1���<_A���|�Z*d%ɭ�sa��2��Q��`�j���CB�kqi?��u��H�5yn���M��D�6�N�Zzo��t�o����f9M��Qb.!.^'y�`���0�oý��?Шu�5ڣ�"F4c���pNE����c2��G���aC'M$�5�A�'&�A�<
�#K�����������0�C<�5�N��D7t/:�Z�O�l� t�ݵ!@��E�G��Y��q��h������"\�B	0�I��<p��'��=��}^�Gz�]�	/NI�Є�Y�G�Ղ�t�Za%̤�0�A�K�vؽj?V������V���)C�V��+z����
6����;I!�'d�e�J�_?��.�GGZE�r�a]HqlIqb�t��)!d1
����0����	Q7�n�<<���5�0J.Q8�J.���q}�f�U]������|�NG��\aͭ��^jЈ`|�&�R��de]�����6�3�RD�
s�$έ{=�m@ϼ�ѕ��/EA�H�`_�f����(x���Wn�&�;3���<�5���1Z���pZ96t�P����Q^�Q&�D&_X]*bg(<��o�Cp0��M�#�No�Z��l#�:�B���H���"�-�4���V����9�j�!�������.ts�}�K��ó�,*���w������Р�b�5g�t��k��хj0%n�����Z^B�O�E����4�=�F��]̀L�v��Z��<A���B8�Q�k��jZO�34�i�rG�zz���J�E�a���|ҰH�Ǣ4H"0�/��ۀ7%�J�^F	�>��ZŲ�'B��r�T��(���"!~A$.B�U$�B���jn��W��+��?�F,R�X$�I�91n�%R1�����1�2k���V&�v��b�>c'�J4��8'JX���Jظ��Ú���+X�p���t����ݞ��l�	B�g!��OՏ�̼`0�Ly��ٓ�Г���a��|[��$�`,��#�����9~���5Z�ANS��.�1�A���W,q�p��Ӯ�[�w�D`�y�r��U㧈��>���E;{��V�ĸ�Tk`��]�}������Yא�~��u�I��|�	��?y
=�=�t)g`E�+0.U�I��4��3J���.a��i��$^�Ǯ�MV��]'�w�_5~�m�#YMw:Tg��yޣ��b�G-�-�{���e���Mٯ�� ��ܪ����uj��q�.z�,Q֦��{�:P�+�u��Z3������~���U���J00~Y0���F~g�V6��-'���*��u��� ��ʡ��撉��٦ ����pp�2�Pzn��Š�.'菈�4@^
N�t�Vk0xB��84�ALx/1�(1Pb%��r@	��?%J<)����	tP��(Az%�V9�!���葍��Z��Ϥ�^}`�ʁ�����m>�(��S9~��h�%�W��y t\V�'G:Q�DL���P|�b�(�`2GN���$��%�c�F�ꜛ�ě����4���6��)�V�:�ʭ���(m�J�J��L�ok5gB��������%DI��K�/���r��|�ʃ���x�F�a��|c�h����.�~Ui�%�	/	?�ej��J�y�i���3m{��r7 %�2��ԑ+Ԣ�c��=�\'R�'��}h�{Tގ��hM�p�r���r�׎��#J�R3��Y�d[=�Wa�p+
χf���v�<��=��]}J�1ً��9�̅Za�YB�_��:�{x��!�r��w��
�AJܘ��v�8L�#���Lk��Q p��l�;�x�>#�LJ�OD�BnT|�/���S�Z��x�̶�\f��Ĝ_d]����e����M�Li�ղr8�;AU��UP��F�̔����Au�Ś,o��@3| �4q?�V�L��wѫ�YfH#1�A[ŋQ�L'g=S���d�Щ�Hn���[Wِny�b^ �P�?*sb�@����h���AI�A�4,@�~\���t�E��æq�&���*�U~e��m�Jz�}b��Bޡ7�o%��𠴦��tO�	l�ɹ'����/�����U;K"�����6���Y�����Wy��p����s�K����<���=-J���'�R:�.m�!�=���@Y�ٸ	�˘ўv��(��/H�g�j���p�$��� �_��<G�iQ�A��Y�=�i���C[��S{_~��*g��P�i�Ϗ����`��x����&o�����@��t鳁e�I`�N��t�*H�-=�{bD��1�J1?��l���	���k�������/r&�5                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    -panes module */
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