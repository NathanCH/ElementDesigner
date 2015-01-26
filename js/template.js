(function(window, $) {
    'use strict';

    function Template() {
        this.containerTemplate
        =       '<div class="element-designer" data-id="{{id}}">'
        +           '<p>'
        +               '{{content}}'
        +           '</p>'
        +       '</div>'
    }

    /**
     * Create element on page.
     */
    Template.prototype.createDesigner = function(data) {
        var template = this.containerTemplate;
        var id = data.id;
        var content = data.content;

        template = template.replace('{{id}}', id);
        template = template.replace('{{content}}', content);

        return template;
    }

    window.app = window.app || {};
    window.app.Template =  Template;
})(window, jQuery);