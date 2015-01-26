(function($) {
    'use strict';

    /**
     * Create instance of element designer.
     */
    function ElementDesigner(elm, config) {
        this.config = new app.Config(config);
        this.template = new app.Template();
        this.view = new app.View(this.template, this.config);
        this.controller = new app.Controller(this.view);
    }

    /**
     * Define ElementDesigner prototype.
     */
    $.fn.ElementDesigner = function(config) {
        return this.each(function() {
            new ElementDesigner(this, config);
        });
    }

})(jQuery);