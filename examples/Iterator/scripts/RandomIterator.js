if (typeof define !== 'function') { var define = require('amdefine')(module); }
define([
    '../../../assets/scripts/src/clajs.js',
    './StepIterator.js'
], function (clajs, StepIterator) {
    'use strict';

    var randCeil = function (ceil) {
        return Math.ceil(Math.random() * ceil);
    };
    var RandomIterator = clajs('RandomIterator', function (options) {
        var supr = this.supr;
        var privateProps = {
            ceil: 1
        };
        var protectedProps = {
            get ceil () {
                return privateProps.ceil;
            },
            set ceil (n) {
                if (RandomIterator.isInteger(n)) {
                    privateProps.ceil = n;
                    return privateProps.ceil;
                }
                return NaN;
            }
        };
        var publicProps = {
            next: function () {
                supr.step = randCeil(privateProps.ceil);
                return supr.next();
            },
            get ceil () {
                return privateProps.ceil;
            }
        };

        options = options || {};
        if (StepIterator.isInteger(options.ceil)) {
            privateProps.ceil = options.ceil;
        }
            
        // Do setup based on arguments
        return this.instance({
            protectedProps: protectedProps,
            publicProps: publicProps
        });
    }, StepIterator);

    RandomIterator.isInteger = StepIterator.isInteger; // For convenience

    return RandomIterator;
});
