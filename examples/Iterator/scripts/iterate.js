#!/usr/bin/env node

'use strict';

var limit = 10;
if (2 < process.argv.length) {
    limit = parseFloat(process.argv[2]);
}
console.log('limit = \n' + limit);

var Iterator = require('./Iterator.js');
var StepIterator = require('./StepIterator.js');
var RandomIterator = require('./RandomIterator.js');

var anIterator = new Iterator();

console.log('\nBase Iterator:\n');
console.log('Cur: ' + anIterator.cur);
for (var i = limit; 0 < i--;) {
    console.log('Next: ' + anIterator.next());
    console.log('Cur: ' + anIterator.cur);
}

anIterator = new StepIterator({
    step: 5
});

console.log('\nStep Iterator:\n');
console.log('Cur: ' + anIterator.cur);
for (var i = limit; 0 < i--;) {
    if (i === Math.floor(limit / 2)) {
        console.log('\nStep: ' + anIterator.step);
        anIterator.step = 2;
        console.log('New Step: ' + anIterator.step + '\n');
    }
    console.log('Next: ' + anIterator.next());
    console.log('Cur: ' + anIterator.cur);
}

anIterator = new RandomIterator({
    ceil: 25
});

console.log('\nRandom Iterator:\n');
console.log('Cur: ' + anIterator.cur);
for (var i = limit; 0 < i--;) {
    console.log('Next: ' + anIterator.next());
    console.log('Cur: ' + anIterator.cur);
}
