(function(window, $) {
    'use strict';

    function Template(config) {
        this.definedStyles = config.definedStyles;

        // Define markup.
        this.containerTemplate
        =       '<div class="element-designer" data-id="{{id}}">'
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
        =       '<button class="element-designer__button button-close" data-id="{{close-button-id}}">'
        +           '{{close-text}}'
        +       '</button>';

        this.componentContainer
        =       '<div class="element-designer__component">'
        +           '{{component}}'
        +       '</div>';

        this.componentSelectBox
        =       '<select name="component-{{componentName}}-{{id}}">'
        +           '{{fonts}}'
        +       '</select>';
    }

    /**
     * Populate <select> element by type of content.
     * @param string    type       type of content.
     * @param string    style      css property definition.
     */
    Template.prototype._populateSelect = function(type, property) {
        switch(type) {
            case 'fonts':
                var template;
                this.definedStyles.fonts.forEach(function(font){
                    var selected = '';
                    if(font == property.replace(/['"]+/g, "")) {
                        selected = 'selected="selected"';
                    }
                    template = template + '<option value="'+ font +'" '+ selected +'>'+ font +'</option>';
                });

                return template;
            break;
        }
    }

    Template.prototype.createDesigner = function(data) {
        var template = this.containerTemplate;
        var id = data.id;

        template = template.replace('{{id}}', id);

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

    /**
     * @param string    component  css property's component name.
     * @param string    style      css property definition.
     * @param object    data       cached css properties.
     */
    Template.prototype.createComponent = function(component, style, data) {
        var template = this.componentContainer;

        switch(component){
            case 'font-family':
                var componentTemplate = this.componentSelectBox.replace('{{fonts}}', this._populateSelect('fonts', style));
            break;

            default:
                var componentTemplate = component;
            break;
        }

        template = template.replace('{{component}}', componentTemplate);
        template = template.replace('{{componentName}}', component);
        template = template.replace('{{id}}', data.id);

        return template;
    }

    window.app = window.app || {};
    window.app.Template =  Template;
})(window, jQuery);