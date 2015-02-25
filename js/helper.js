(function(window, $){
    'use strict';

    function Helper(){}

    /**
     * Uses library to query css styles based on element.
     * @param object    elm        element to read styles from.
     */
    Helper.prototype.readCSS = function(elm) {
        var properties;

        // Execute function calls with callback.
        CSSUtilities.define('async', true);

        // Get styles based on browser's implementation (not author).
        CSSUtilities.define('mode', 'browser');

        CSSUtilities.init(function() {
            properties = CSSUtilities.getCSSProperties(elm, 'screen');
        });

        return properties;
    }

    window.app = window.app || {};
    window.app.Helper = Helper;
})(window, jQuery);