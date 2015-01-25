(function(window, $) {
    'use strict';

    function View(template) {
        this.template = template;
        this.render('createContainer');
    }

    View.prototype.render = function(view) {
        var that = this;
        var views = {
            createContainer: function() {
                $('body').append(that.template.create());
            }
        }

        views[view]();
    }

    window.app = window.app || {};
    window.app.View = View;
})(window, jQuery);