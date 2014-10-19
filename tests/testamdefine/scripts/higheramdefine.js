if (typeof define !== 'function') { var define = require('amdefine')(module); }

define(['./lowestamdefine.js'], function (lowest) {
    console.log('Found amdefine, required lowestamdefine.js.');
    lowest();
});
