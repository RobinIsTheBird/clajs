#!/usr/bin/env node

'use strict';

var limit = 10;
if (2 < process.argv.length) {
    limit = parseFloat(process.argv[2]);
}
console.log('limit = ' + limit);

var Iterator = require('./Iterator.js');

var anIterator = new Iterator();

console.log('Cur: ' + anIterator.cur);
for (var i = limit; 0 < i--;) {
    console.log('Next: ' + anIterator.next());
    console.log('Cur: ' + anIterator.cur);
}
