if (typeof define !== 'function') { var define = require('amdefine')(module); }
define([
    'clajs',
    'Iterator'
], function (clajs, Iterator) {
    var StepIterator = clajs('StepIterator', Iterator, function (options) {
        var supr = this.base;
        var private = {
            step: 1
        };
        var protected = {
            set step (n) {
                if (Iterator.isInteger(n) && 0 !== n) {
                    private.step = n;
                    return private.step;
                }
                return NaN;
            }
        };
        var public = {
            next: function () {
                var old = supr.cur;
                supr.cur = old + private.step;
                return old;
            },
            get step () {
                return private.step;
            }
        };

        options = options || {};
        if (Iterator.isInteger(options.step)) {
            private.step = options.step;
        }
            
        // Do setup based on arguments
        return this.instance({
            protected: protected,
            public: public
        });
    });

    StepIterator.isInteger = Iterator.isInteger; // For convenience

    return StepIterator;
});
