(function(window, $) {
    'use strict';

    function Controller(view) {
        var self = this;
        self.view = view;

        self.view.bind('newDesigner', function(response) {
            self.view.render('createDesigner', response);
        });
    }

    window.app = window.app || {};
    window.app.Controller = Controller;
})(window, jQuery);