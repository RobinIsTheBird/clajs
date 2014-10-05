if (typeof define !== 'function') { var define = require('amdefine')(module); }
define([
    'clajs'
], function (clajs) {
    var Iterator = clajs('Iterator', function () {
        var private = {
            cur: 0
        };
        var protected = {
            set cur (num) {
                if (Iterator.isInteger(num)) {
                    private.cur = num;
                    return num;
                }
                return NaN;
            }
        };
        var public = {
            next: function () {
                return cur++;
            },
            get cur () {
                return cur;
            }
        };
        // Do setup based on arguments
        return this.instance({
            protected: protected,
            public: public
        });
    });

    Iterator.isInteger = function (n) {
        return 'number' === typeof n && Math.floor(n) === n);
    }

    return Iterator;
});
