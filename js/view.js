(function(window, $) {
    'use strict';

    function View(config, template, helper) {
        this.config = config;
        this.template = template;
        this.helper = helper;
        this.elm = this.config.targetSelector;
        this.$elm = $(this.config.targetSelector);
        this.$container = $(this.config.container);
        this.cachedStyles;
        this.cachedID;
    }

    View.prototype._item = function() {
        return $(this.elm+'[data-id="'+this.cachedID+'"]');
    }

    View.prototype._itemId = function(elm) {
        return this.cachedID = $(elm).data('id');
    }

    View.prototype._itemContent = function(elm) {
        return $(elm).text();
    }

    View.prototype._getStyles = function(elm) {
        return this.helper.readCSS(elm);
    }


    View.prototype.render = function(view, data) {
        var self = this;
        var viewType = {
            createDesigner: function() {
                // Allow one designer per element.
                self.unbind('createDesigner');
                self.$container.append(self.template.createDesigner(data));
                $.publish('designerCreated');
            },
            createUI: function() {
                var elm = $('.element-designer[data-id="'+self.cachedID+'"]')
                elm.prepend(self.template.createHeader(data));
                elm.append(self.template.createFooter());
            }
        }

        viewType[view]();
    }

    View.prototype.bind = function(event, handler) {
        var self = this;
        switch (event) {
            case 'createDesigner':
                self.$elm.on('click', function() {
                    handler({
                        id: self._itemId(this),
                        content: self._itemContent(this),
                        styles: self._getStyles(this)
                    });
                });
            break;

            case 'createUI':
                $.subscribe('designerCreated', function() {
                    handler({
                        title: self.config.appName
                    });
                });
            break;
        }
    }

    View.prototype.unbind = function(event) {
        var self = this;
        switch(event) {
            case 'createDesigner':
                self._item().off('click').css({
                    'cursor' : 'default'
                });
            break;
        }
    }

    window.app = window.app || {};
    window.app.View = View;
})(window, jQuery);