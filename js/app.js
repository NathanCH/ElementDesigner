(function($) {
    'use strict';

    function ElementDesigner(elm, config) {
        this.config = new app.Config(config);
        this.extensions = new app.Extensions();
        this.helper = new app.Helper();
        this.template = new app.Template();
        this.view = new app.View(this.config, this.template, this.helper);
        this.controller = new app.Controller(this.view);
    }

    $.fn.ElementDesigner = function(config) {
        return this.each(function() {
            new ElementDesigner(this, config);
        });
    }

})(jQuery);