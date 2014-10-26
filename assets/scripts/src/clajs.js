if (typeof define !== 'function') { var define = require('amdefine')(module); }
define([], function () {
    'use strict';

    /**
     * OOP for JavaScript with class inheritance and private and protected encapsulation
     *
     * @module clajs
     * @author Robin Schaufler <robin@likethebird.com>
    **/

    // Extend object dest with own properties of src, with the same property definitions
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
     * @param clajsName (String) The clajsName of the clajs
     * @param xtor (Function) The original constructor function
     * @param base Optional - the base clajs:
     *        (Function) - the constructor of the base clajs, assumes same arguments as xtor
     *        (Object)   - options describing the base clajs
     *
     *      base.base (Function) Required: The base clajs
     *      base.factory (Function) params are the same as xtor, returns new instance of base.base
    **/
    return function clajs (clajsName, xtor, base) {
        var baseInstanceFactory;
        if (base instanceof Object && !(base instanceof Function)) {
            baseInstanceFactory = base.factory;
            base = base.base;
        }
        // When a client makes a clajs, say, var A = clajs('A',...);
        // A is an instance of actualXtor.
        // There is a distinct actualXtor for each clajs.
        // new A() invokes actualXtor with "this" = the object created by new.
        var actualXtor = function actualXtor () {
            assert(this instanceof actualXtor, clajsName + ' must be called with new.');

            this.base = base || this.rebase || Object;
            var suprFactory = baseInstanceFactory &&
                function baseFactory () {
                    var baseInstance = Object.create(base.prototype);
                    return baseInstanceFactory.apply(baseInstance, arguments).prototype;
                } ||
                !!base &&
                    function baseInstanceFactory () {
                        var baseInstance = Object.create(base.prototype);
                        // this.rebase tells the base xtor the outermost clajs that extends it.
                        baseInstance.rebase = this.rebase || actualXtor;
                        base.apply(baseInstance, arguments);
                        return Object.getPrototypeOf(baseInstance);
                    }.bind(this) ||
                    function rebaseInstanceFactory () {
                        // This clajs is the ultimate base class.
                        // If it is not being called in the context of an extension,
                        // its replacement prototype can extend its own prototype.
                        this.rebase = this.rebase || actualXtor;
                        return this.rebase.prototype;
                    }.bind(this);

            this.supr = suprFactory(arguments);

            // TODO Is there any way to assign a name to the function itself?
            var Replacement = function () {};
            var rp = Replacement.prototype = Object.create(this.supr, {
                constructor: {
                    value: Replacement,
                    writeable: false,
                    configurable: false,
                    enumerable: true
                },
                originalName: {
                    value: clajsName,
                    writeable: false,
                    configurable: false,
                    enumerable: true
                },
                name: {
                    value: clajsName + ' Replacement',
                    writeable: false,
                    configurable: false,
                    enumerable: true
                }
            });

            this.instance = function (options) {
                options = options || {};
                var protectedProperties = options.protectedProps || {};
                var publicProperties = options.publicProps || {};
                propertyExtend(rp, publicProperties);
                if (this.rebase !== actualXtor.prototype) {
                    propertyExtend(rp, protectedProperties);
                }
                return new Replacement();
            };
            return xtor.apply(this, arguments);
        };
        actualXtor.prototype = Object.create((base || Object).prototype, {
            constructor: {
                value: actualXtor
            },
            clajsName: {
                value: clajsName
            }
        });
        return actualXtor;
    };
});
