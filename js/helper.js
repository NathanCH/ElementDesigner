(function(window, $){
    'use strict';

    function Helper(){}

    Helper.prototype.readCSS = function(elm) {
        var properties;

        CSSUtilities.define('async', true);
        CSSUtilities.define('mode', 'browser');
        CSSUtilities.define('attributes', false);

        CSSUtilities.init(function() {
            properties = CSSUtilities.getCSSProperties(elm, 'screen');
        });

        return properties;
    }

    window.app = window.app || {};
    window.app.Helper = Helper;
})(window, jQuery);