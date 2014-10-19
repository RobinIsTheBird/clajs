if (typeof define !== 'function') { var define = require('amdefine')(module); }
define([], function () {
    'use strict';

    /**
     * OOP for JavaScript with class inheritance and private and protected encapsulation
     *
     * @module clajs
     * @author Robin Schaufler <robin@likethebird.com>
    **/

    function propertyExtend (dest, src) {
        var srcNames = Object.getOwnPropertyNames(src);
        srcNames.forEach(function (name) {
            Object.defineProperty(dest, name, Object.getOwnPropertyDescriptor(src, name));
        });
        return dest;
    }

    function assert (assertion, message) {
        if (!assertion) {
            throw new Error(message);
        }
    }

    /**
     * clajs - Declare a constructor to be a class
     *
     * Factory function, not used with new.
     *
     * Returns a constructor which supports inheritance with private and protected enapsulation,
     * in contrast to the typical JavaScript constructor which exposes all its state
     * in public properties of the returned object.
     *
     * @class clajs
     *
     * @param[in] name The name of the clajs
     * @param[in] xtor The original constructor function
     * @param[in] base Optional - the constructor of the base clajs
    **/
    return function clajs (name, xtor, base) {
        var actualXtor = function actualXtor () {
            assert(this instanceof actualXtor, name + ' must be called with new.');
            this.instance = function (options) {
                options = options || {};
                var protectedProperties = options.protectedProps || {};
                var publicProperties = options.publicProps || {};
                var rebase = isExtension && base.prototype || actualXtor.prototype;
                var Replacement = function () {};
                var rp = Replacement.prototype = Object.create(rebase, {
                    constructor: {
                        value: Replacement,
                        writeable: false,
                        configurable: false,
                        enumerable: true
                    },
                    originalName: {
                        value: name,
                        writeable: false,
                        configurable: false,
                        enumerable: true
                    },
                    name: {
                        value: name + ' Replacement',
                        writeable: false,
                        configurable: false,
                        enumerable: true
                    }
                });
                propertyExtend(rp, publicProperties);
                return new Replacement();
            };
            return xtor.apply(this, arguments);
        };
        actualXtor.prototype = {
            constructor: actualXtor,
            name: name,
            baseConstructor: base
        };
        var isExtension = !!base && base.prototype instanceof actualXtor;
        return actualXtor;
    };
});
