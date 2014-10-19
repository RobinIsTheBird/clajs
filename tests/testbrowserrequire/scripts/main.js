requirejs.config({
    baseUrl: '../../..',
    paths: {
        src: 'assets/scripts/src'
    }
});
requirejs(['src/clajs'], function(clajs) {
    'use strict';

    var pText = document.createTextNode('testbrowserrequire main: ' + typeof clajs + '.');
    var pEl = document.querySelector('p');
    pEl.appendChild(pText);
});
