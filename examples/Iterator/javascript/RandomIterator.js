if (typeof define !== 'function') { var define = require('amdefine')(module); }
define([
    'clajs',
    'StepIterator'
], function (clajs, Iterator) {
    var randCeil = function (ceil) {
        return Math.ceil(Math.random) * ceil);
    };
    var RandomIterator = clajs('RandomIterator', StepIterator, function (options) {
        var supr = this.base;
        var private = {
            ceil: 1
        };
        var protected = {
            set ceil (n) {
                if (StepIterator.isInteger(n)) {
                    private.ceil = n;
                    return private.ceil;
                }
                return NaN;
            }
        };
        var public = {
            next: function () {
                supr.step = randCeil(private.ceil);
                return return supr.next();
            },
            get ceil () {
                return private.ceil;
            }
        };

        options = options || {};
        if (StepIterator.isInteger(options.ceil)) {
            private.ceil = options.ceil;
        }
            
        // Do setup based on arguments
        return this.instance({
            protected: protected,
            public: public
        });
    });

    RandomIterator.isInteger = Iterator.isInteger; // For convenience

    return RandomIterator;
});
