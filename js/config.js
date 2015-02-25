(function(window, $){
    'use strict';

    function Config(config){
        this.appName = 'Element Designer';
        this.path = '/2015/element-designer/';
        this.container = config.container;
        this.targetSelector = config.targetSelector;
        this.allowedStyles = config.allowedStyles;
        this.definedStyles = this.defineStyles();
    }
    /**
     * Define element designer's possible styles.
     */
    Config.prototype.defineStyles = function() {
        return {
            fonts: [
                'Roboto', 'Cabin', 'Open Sans',
                'Slabo', 'Lato', 'Oswald',
                'Arial', 'sans-serif'
            ],
            colors: [
                '#C6000A', '#EEEEE', '#B77A55'
            ],
            fontSize: {
                min: 8,
                max: 36
            },
            lineHeight: {
                min: 1,
                max: 4
            }
        };
    }

    window.app = window.app || {};
    window.app.Config = Config;
})(window, jQuery);