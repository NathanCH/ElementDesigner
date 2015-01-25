(function(window, $) {
    'use strict';

    function Template() {
        this.containerTemplate
        =       '<div class="element-designer">'
        +           '<p>'
        +               'Example Element'
        +           '</p>'
        +       '</div>'
    }

    /**
     * Create element on page.
     */
    Template.prototype.create = function() {
        return this.containerTemplate;
    };

    window.app = window.app || {};
    window.app.Template =  Template;
})(window, jQuery);