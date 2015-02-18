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

        this.subscribe('createDesigner');
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
                self.$elm.off().bind('click', function() {
                    $.publish('createDesigner', {
                        action: self,
                        data: {
                            id: self._itemId(this),
                            content: self._itemContent(this),
                            styles: self._getStyles(this)
                        }
                    });
                });
            break;

            case 'createUI':
                $.subscribe('designerCreated', function() {
                    handler({
                        title: self.config.appName,
                        id: self.cachedID
                    });
                });
            break;

            case 'closeDesigner':
                self.$container.on('click', '.element-designer__button', function(){
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
        var viewType = {
            createDesigner: function() {
                // Allow one designer per element.
                self.unbind('createDesigner');
                // Create designer.
                self.$container.append(self.template.createDesigner(data));
                $.publish('designerCreated');
            },
            createUI: function() {
                var elm = $('.element-designer[data-id="'+self.cachedID+'"]');
                // Create header and footer.
                elm.prepend(self.template.createHeader(data));
                elm.append(self.template.createFooter());
            },
            closeDesigner: function() {
                // Rebind createDesigner on current target.
                self.bind('createDesigner');
                // Close and update css.
                $('.element-designer[data-id="'+self.cachedID+'"]').remove();
                $('.target[data-id="'+self.cachedID+'"]').css({
                    'cursor' : 'pointer'
                });
            }
        }

        viewType[view]();
    }

    window.app = window.app || {};
    window.app.View = View;
})(window, jQuery);