(function(window, $){
    'use strict';

    function Extensions(){

        /**
         * Tiny jQuery pub/sub.
         * https://github.com/cowboy/jquery-tiny-pubsub
         */
        var object = $({});

        $.subscribe = function() {
            object.on.apply(object, arguments);
        }

        $.unsubscribe = function() {
            object.off.apply(object, arguments);
        }

        $.publish = function() {
            object.trigger.apply(object, arguments);
        }
    }

    window.app = window.app || {};
    window.app.Extensions = Extensions;
})(window, jQuery);