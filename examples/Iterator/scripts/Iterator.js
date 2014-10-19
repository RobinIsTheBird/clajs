if (typeof define !== 'function') { var define = require('amdefine')(module); }
define([
    '../../../assets/scripts/src/clajs.js'
], function (clajs) {
    'use strict';

    console.log('Iterator module');

    var Iterator = clajs('Iterator', function () {
        var privateSt = {
            cur: undefined
        };
        var protectedProps = {
            get cur () {
                return privateSt.cur;
            },
            set cur (num) {
                if (Iterator.isInteger(num)) {
                    privateSt.cur = num;
                    return num;
                }
                return NaN;
            }
        };
        var publicProps = {
            next: function () {
                return privateSt.cur = undefined === privateSt.cur ? 0 : 1 +privateSt.cur;
            },
            get cur () {
                return privateSt.cur;
            }
        };
        // Do setup based on arguments
        var inst = this.instance({
            protectedProps: protectedProps,
            publicProps: publicProps
        });
        return inst;
    });

    Iterator.isInteger = function (n) {
        return 'number' === typeof n && Math.floor(n) === n;
    };

    return Iterator;
});
