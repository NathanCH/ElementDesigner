(function(window, $) {
    'use strict';

    function View(config, template, helper) {
        this.config = config;
        this.allowedStyles = config.allowedStyles;
        this.template = template;
        this.helper = helper;
        this.elm = this.config.targetSelector;
        this.$elm = $(this.config.targetSelector);
        this.$container = $(this.config.container);
        this.cachedStyles;
        this.cachedID;

        this.subscribe('createDesigner');
    }

    /**
     * Return cached element or target object.
     */
    View.prototype._item = function() {
        if(typeof this.cachedID != "undefined") {
            return $(this.elm+'[data-id="'+this.cachedID+'"]');
        }
        return this.$elm;
    }

    View.prototype._itemId = function(elm) {
        return this.cachedID = $(elm).data('id');
    }

    /**
     * Return cached styles or read from element.
     */
    View.prototype._getStyles = function(elm) {
        if(elm === undefined) {
            return this.cachedStyles;
        }

        var styles = this.helper.readCSS(elm);
        var order = this.allowedStyles;

        // Reorder elements to match user defined settings.
        return this._applyOrder(styles, order);
    }

    /**
     * Populate <select> element by type of content.
     * @param object    styles     an element's styles/properties
     * @param array     order      user defined desired order.
     */
    View.prototype._applyOrder = function(styles, order) {

        // Get array of keys from stlyes object.
        var styleKeys = Object.keys(styles);
        var results = {}

        // Add style properties by matching keys in order.
        order.forEach(function(key){
            styleKeys = styleKeys.filter(function(style){
                if(style == key) {
                    results[key] = styles[key];
                }
                else{
                    return true;
                }
            })

            return false;
        });

        return this.cachedStyles = results;
    }

    /**
     * Handle pub/sub callback.
     * @param event
     * @param string    handler    callback's content.
     */
    View.prototype.handle = function(event, handler) {
        handler.action.render('createDesigner', handler.data);
    }

    View.prototype.subscribe = function(sub) {
        switch(sub){
            case 'createDesigner':
                $.subscribe('createDesigner', this.handle);
            break;
        }
    }

    View.prototype.bind = function(event, handler) {
        var self = this;
        switch (event) {
            case 'createDesigner':
                self._item().off().bind('click', function() {
                    $.publish('createDesigner', {
                        action: self,
                        data: {
                            id: self._itemId(this),
                            styles: self._getStyles(this)
                        }
                    });
                });
            break;

            case 'createUI':
                $.subscribe('designerCreated', function() {
                    handler({
                        title: self.config.appName,
                        id: self.cachedID,
                        styles: self._getStyles()
                    });
                });
            break;

            case 'closeDesigner':
                self.$container.on('click', '.element-designer__button.button-close', function(){
                    handler({
                        id: self._itemId(this)
                    });
                });
            break;
        }
    }

    View.prototype.unbind = function(event) {
        var self = this;
        switch(event) {
            case 'createDesigner':
                self._item().css({
                    'cursor' : 'default'
                });
                self._item().unbind('click');
            break;
        }
    }

    View.prototype.render = function(view, data) {
        var self = this;
        var elm = $('.element-designer[data-id="'+self.cachedID+'"]');
        var target = $('.target[data-id="'+self.cachedID+'"]');
        var viewType = {
            createDesigner: function() {
                // Allow one designer per element.
                self.unbind('createDesigner');
                // Create designer.
                self.$container.append(self.template.createDesigner(data));
                $.publish('designerCreated');
            },
            createUI: function() {
                // Create header.
                elm.prepend(self.template.createHeader(data));
                Object.keys(data.styles).forEach(function(key){
                    if(self.allowedStyles.indexOf(key) > -1) {
                        elm.append(self.template.createComponent(key, data.styles[key], data));
                    }
                });
                elm.append(self.template.createFooter());
            },
            closeDesigner: function() {
                // Rebind createDesigner on current target.
                self.bind('createDesigner');
                // Close and update css.
                target.css({ 'cursor' : 'pointer' });
                elm.remove();
            }
        }

        viewType[view]();
    }

    window.app = window.app || {};
    window.app.View = View;
})(window, jQuery);