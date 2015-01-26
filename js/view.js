(function(window, $) {
    'use strict';

    function View(template, config) {
        this.template = template;
        this.config = config;
        this.$elm = $(this.config.targetSelector);
        this.$container = $(this.config.container);
    }

    View.prototype._itemId = function(elm) {
       return $(elm).data('id');
    }

    View.prototype._itemContent = function(elm) {
        return $(elm).text();
    }

    View.prototype.render = function(view, data) {
        var self = this;
        var viewType = {
            createDesigner: function() {
                self.$container.append(self.template.createDesigner(data));
            }
        }

        viewType[view]();
    }

    View.prototype.bind = function(event, handler) {
        var self = this;
        switch (event) {
            case 'newDesigner':
                self.$elm.on('click', function(){
                    handler({
                        id: self._itemId(this),
                        content: self._itemContent(this)
                    });
                });
            break;
        }
    }

    window.app = window.app || {};
    window.app.View = View;
})(window, jQuery);