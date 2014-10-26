if (typeof define !== 'function') { var define = require('amdefine')(module); }
define([
    '../../../assets/scripts/src/clajs.js',
    './Iterator.js'
], function (clajs, Iterator) {
    'use strict';

    var StepIterator = clajs('StepIterator', function (options) {
        var supr = this.supr;
        var privateProps = {
            step: 1
        };
        var protectedProps = {
            get step () {
                return privateProps.step;
            },
            set step (n) {
                if (StepIterator.isInteger(n) && 0 !== n) {
                    privateProps.step = n;
                    return privateProps.step;
                }
                return NaN;
            }
        };
        var publicProps = {
            next: function () {
                var old = supr.cur;
                supr.cur = undefined === old ? 0 : old + privateProps.step;
                return supr.cur;
            },
            get step () {
                return privateProps.step;
            }
        };

        options = options || {};
        if (Iterator.isInteger(options.step)) {
            privateProps.step = options.step;
        }
            
        // Do setup based on arguments
        return this.instance({
            protectedProps: protectedProps,
            publicProps: publicProps
        });
    }, Iterator);

    StepIterator.isInteger = Iterator.isInteger; // For convenience

    return StepIterator;
});
