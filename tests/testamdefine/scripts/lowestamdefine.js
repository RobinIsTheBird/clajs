if (typeof define !== 'function') { var define = require('amdefine')(module); }

define([], function () {
    return function () {
        console.log('lowest level: amdefine was found.');
    };
});
