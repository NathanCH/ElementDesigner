(function(window, $) {
    'use strict';

    function Template() {
        this.containerTemplate
        =       '<div class="element-designer" data-id="{{id}}">'
        +           '<p>'
        +               '{{content}}'
        +           '</p>'
        +       '</div>';

        this.header
        =       '<div class="element-designer__header">'
        +           '<span class="element-designer__title">'
        +               '{{title}}'
        +           '</span>'
        +           '<div class="element-designer__close">'
        +               '{{close-button}}'
        +           '</div>'
        +           '<hr />'
        +       '</div>';

        this.footer
        =       '<hr />'
        +       '<div class="element-designer__footer">'
        +           '{{save-button}}'
        +       '</div>';

        this.saveButton
        =       '<button class="element-designer__button">'
        +           '{{save-text}}'
        +       '</button>';

        this.closeButton
        =       '<button class="element-designer__button" data-id="{{close-button-id}}">'
        +           '{{close-text}}'
        +       '</button>';
    }

    /* Create element on page.
     */
    Template.prototype.createDesigner = function(data) {
        var template = this.containerTemplate;
        var id = data.id;
        var content = data.content;

        template = template.replace('{{id}}', id);
        template = template.replace('{{content}}', content);

        return template;
    }

    Template.prototype.createHeader = function(data) {
        var template = this.header;
        var title = data.title;
        var closeButtonID = data.id;
        var closeButton = this.closeButton;
        var closeText = 'X';

        template = template.replace('{{title}}', title);
        template = template.replace('{{close-button}}', closeButton);
        template = template.replace('{{close-button-id}}', closeButtonID);
        template = template.replace('{{close-text}}', closeText);

        return template;
    }

    Template.prototype.createFooter = function() {
        var template = this.footer;
        var saveButton = this.saveButton;
        var saveText = 'Save'; // Create language string file.

        template = template.replace('{{save-button}}', saveButton);
        template = template.replace('{{save-text}}', saveText);

        return template;
    }

    window.app = window.app || {};
    window.app.Template =  Template;
})(window, jQuery);