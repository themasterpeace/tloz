es) {\n      if (Object.prototype.hasOwnProperty.call(configTypes, property)) {\n        const expectedTypes = configTypes[property]\n        const value         = config[property]\n        const valueType     = value && Util.isElement(value)\n          ? 'element' : toType(value)\n\n        if (!new RegExp(expectedTypes).test(valueType)) {\n          throw new Error(\n            `${componentName.toUpperCase()}: ` +\n            `Option \"${property}\" provided type \"${valueType}\" ` +\n            `but expected type \"${expectedTypes}\".`)\n        }\n      }\n    }\n  },\n\n  findShadowRoot(element) {\n    if (!document.documentElement.attachShadow) {\n      return null\n    }\n\n    // Can find the shadow root otherwise it'll return the document\n    if (typeof element.getRootNode === 'function') {\n      const root = element.getRootNode()\n      return root instanceof ShadowRoot ? root : null\n    }\n\n    if (element instanceof ShadowRoot) {\n      return element\n    }\n\n    // when we don't find a shadow root\n    if (!element.parentNode) {\n      return null\n    }\n\n    return Util.findShadowRoot(element.parentNode)\n  },\n\n  jQueryDetection() {\n    if (typeof $ === 'undefined') {\n      throw new TypeError('Bootstrap\\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\\'s JavaScript.')\n    }\n\n    const version = $.fn.jquery.split(' ')[0].split('.')\n    const minMajor = 1\n    const ltMajor = 2\n    const minMinor = 9\n    const minPatch = 1\n    const maxMajor = 4\n\n    if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {\n      throw new Error('Bootstrap\\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0')\n    }\n  }\n}\n\nUtil.jQueryDetection()\nsetTransitionEndSupport()\n\nexport default Util\n","/**\n * --------------------------------------------------------------------------\n * Bootstrap (v4.4.1): alert.js\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n * --------------------------------------------------------------------------\n */\n\nimport $ from 'jquery'\nimport Util from './util'\n\n/**\n * ------------------------------------------------------------------------\n * Constants\n * ------------------------------------------------------------------------\n */\n\nconst NAME                = 'alert'\nconst VERSION             = '4.4.1'\nconst DATA_KEY            = 'bs.alert'\nconst EVENT_KEY           = `.${DATA_KEY}`\nconst DATA_API_KEY        = '.data-api'\nconst JQUERY_NO_CONFLICT  = $.fn[NAME]\n\nconst Selector = {\n  DISMISS : '[data-dismiss=\"alert\"]'\n}\n\nconst Event = {\n  CLOSE          : `close${EVENT_KEY}`,\n  CLOSED         : `closed${EVENT_KEY}`,\n  CLICK_DATA_API : `click${EVENT_KEY}${DATA_API_KEY}`\n}\n\nconst ClassName = {\n  ALERT : 'alert',\n  FADE  : 'fade',\n  SHOW  : 'show'\n}\n\n/**\n * ------------------------------------------------------------------------\n * Class Definition\n * ------------------------------------------------------------------------\n */\n\nclass Alert {\n  constructor(element) {\n    this._element = element\n  }\n\n  // Getters\n\n  static get VERSION() {\n    return VERSION\n  }\n\n  // Public\n\n  close(element) {\n    let rootElement = this._element\n    if (element) {\n      rootElement = this._getRootElement(element)\n    }\n\n    const customEvent = this._triggerCloseEvent(rootElement)\n\n    if (customEvent.isDefaultPrevented()) {\n      return\n    }\n\n    this._removeElement(rootElement)\n  }\n\n  dispose() {\n    $.removeData(this._element, DATA_KEY)\n    this._element = null\n  }\n\n  // Private\n\n  _getRootElement(element) {\n    const selector = Util.getSelectorFromElement(element)\n    let parent     = false\n\n    if (selector) {\n      parent = document.querySelector(selector)\n    }\n\n    if (!parent) {\n      parent = $(element).closest(`.${ClassName.ALERT}`)[0]\n    }\n\n    return parent\n  }\n\n  _triggerCloseEvent(element) {\n    const closeEvent = $.Event(Event.CLOSE)\n\n    $(element).trigger(closeEvent)\n    return closeEvent\n  }\n\n  _removeElement(element) {\n    $(element).removeClass(ClassName.SHOW)\n\n    if (!$(element).hasClass(ClassName.FADE)) {\n      this._destroyElement(element)\n      return\n    }\n\n    const transitionDuration = Util.getTransitionDurationFromElement(element)\n\n    $(element)\n      .one(Util.TRANSITION_END, (event) => this._destroyElement(element, event))\n      .emulateTransitionEnd(transitionDuration)\n  }\n\n  _destroyElement(element) {\n    $(element)\n      .detach()\n      .trigger(Event.CLOSED)\n      .remove()\n  }\n\n  // Static\n\n  static _jQueryInterface(config) {\n    return this.each(function () {\n      const $element = $(this)\n      let data       = $element.data(DATA_KEY)\n\n      if (!data) {\n        data = new Alert(this)\n        $element.data(DATA_KEY, data)\n      }\n\n      if (config === 'close') {\n        data[config](this)\n      }\n    })\n  }\n\n  static _handleDismiss(alertInstance) {\n    return function (event) {\n      if (event) {\n        event.preventDefault()\n      }\n\n      alertInstance.close(this)\n    }\n  }\n}\n\n/**\n * ------------------------------------------------------------------------\n * Data Api implementation\n * ------------------------------------------------------------------------\n */\n\n$(document).on(\n  Event.CLICK_DATA_API,\n  Selector.DISMISS,\n  Alert._handleDismiss(new Alert())\n)\n\n/**\n * ------------------------------------------------------------------------\n * jQuery\n * ------------------------------------------------------------------------\n */\n\n$.fn[NAME]             = Alert._jQueryInterface\n$.fn[NAME].Constructor = Alert\n$.fn[NAME].noConflict  = () => {\n  $.fn[NAME] = JQUERY_NO_CONFLICT\n  return Alert._jQueryInterface\n}\n\nexport default Alert\n","/**\n * --------------------------------------------------------------------------\n * Bootstrap (v4.4.1): button.js\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n * --------------------------------------------------------------------------\n */\n\nimport $ from 'jquery'\n\n/**\n * ------------------------------------------------------------------------\n * Constants\n * ------------------------------------------------------------------------\n */\n\nconst NAME                = 'button'\nconst VERSION             = '4.4.1'\nconst DATA_KEY            = 'bs.button'\nconst EVENT_KEY           = `.${DATA_KEY}`\nconst DATA_API_KEY        = '.data-api'\nconst JQUERY_NO_CONFLICT  = $.fn[NAME]\n\nconst ClassName = {\n  ACTIVE : 'active',\n  BUTTON : 'btn',\n  FOCUS  : 'focus'\n}\n\nconst Selector = {\n  DATA_TOGGLE_CARROT   : '[data-toggle^=\"button\"]',\n  DATA_TOGGLES         : '[data-toggle=\"buttons\"]',\n  DATA_TOGGLE          : '[data-toggle=\"button\"]',\n  DATA_TOGGLES_BUTTONS : '[data-toggle=\"buttons\"] .btn',\n  INPUT                : 'input:not([type=\"hidden\"])',\n  ACTIVE               : '.active',\n  BUTTON               : '.btn'\n}\n\nconst Event = {\n  CLICK_DATA_API      : `click${EVENT_KEY}${DATA_API_KEY}`,\n  FOCUS_BLUR_DATA_API : `focus${EVENT_KEY}${DATA_API_KEY} ` +\n                          `blur${EVENT_KEY}${DATA_API_KEY}`,\n  LOAD_DATA_API       : `load${EVENT_KEY}${DATA_API_KEY}`\n}\n\n/**\n * ------------------------------------------------------------------------\n * Class Definition\n * ------------------------------------------------------------------------\n */\n\nclass Button {\n  constructor(element) {\n    this._element = element\n  }\n\n  // Getters\n\n  static get VERSION() {\n    return VERSION\n  }\n\n  // Public\n\n  toggle() {\n    let triggerChangeEvent = true\n    let addAriaPressed = true\n    const rootElement = $(this._element).closest(\n      Selector.DATA_TOGGLES\n    )[0]\n\n    if (rootElement) {\n      const input = this._element.querySelector(Selector.INPUT)\n\n      if (input) {\n        if (input.type === 'radio') {\n          if (input.checked &&\n            this._element.classList.contains(ClassName.ACTIVE)) {\n            triggerChangeEvent = false\n          } else {\n            const activeElement = rootElement.querySelector(Selector.ACTIVE)\n\n            if (activeElement) {\n              $(activeElement).removeClass(ClassName.ACTIVE)\n            }\n          }\n        } else if (input.type === 'checkbox') {\n          if (this._element.tagName === 'LABEL' && input.checked === this._element.classList.contains(ClassName.ACTIVE)) {\n            triggerChangeEvent = false\n          }\n        } else {\n          // if it's not a radio button or checkbox don't add a pointless/invalid checked property to the input\n          triggerChangeEvent = false\n        }\n\n        if (triggerChangeEvent) {\n          input.checked = !this._element.classList.contains(ClassName.ACTIVE)\n          $(input).trigger('change')\n        }\n\n        input.focus()\n        addAriaPressed = false\n      }\n    }\n\n    if (!(this._element.hasAttribute('disabled') || this._element.classList