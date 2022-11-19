.push('visibility: ', isDiv ? 'hidden' : 'visible');
            markup.push(' style="', style.join(''), '"/>');
            // create element with default attributes and style
            if (nodeName) {
                markup = isDiv || nodeName === 'span' || nodeName === 'img' ?
                    markup.join('') :
                    renderer.prepVML(markup);
                wrapper.element = createElement(markup);
            }
            wrapper.renderer = renderer;
        },
        /**
         * Add the node to the given parent
         *
         * @function Highcharts.VMLElement
         * @param {Highcharts.VMLElement} parent
         * @return {Highcharts.VMLElement}
         */
        add: function (parent) {
            var wrapper = this, renderer = wrapper.renderer, element = wrapper.element, box = renderer.box, inverted = parent && parent.inverted, 
            // get the parent node
            parentNode = parent ?
                parent.element || parent :
                box;
            if (parent) {
                this.parentGroup = parent;
            }
            // if the parent group is inverted, apply inversion on all children
            if (inverted) { // only on groups
                renderer.invertChild(element, parentNode);
            }
            // append it
            parentNode.appendChild(element);
            // align text after adding to be able to read offset
            wrapper.added = true;
            if (wrapper.alignOnAdd && !wrapper.deferUpdateTransform) {
                wrapper.updateTransform();
            }
            // fire an event for internal hooks
            if (wrapper.onAdd) {
                wrapper.onAdd();
            }
            // IE8 Standards can't set the class name before the element is
            // appended
            if (this.className) {
                this.attr('class', this.className);
            }
            return wrapper;
        },
        /**
         * VML always uses htmlUpdateTransform
         *
         * @function Highcharts.VMLElement#updateTransform
         */
        updateTransform: SVGElement.prototype.htmlUpdateTransform,
        /**
         * Set the rotation of a span with oldIE's filter
         *
         * @function Highcharts.VMLElement#setSpanRotation
 