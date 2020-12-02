'use strict';

// require node modules
const fs = require('fs');
const path = require('path');

// assume there's a file "input" in the current directory
const inputFilePath = path.join(__dirname, 'input');

// read the input file with utf-8 encoding
const input = fs.readFileSync(inputFilePath, { encoding: 'utf-8' });
// split the input file by newlines, then convert each line into a number,
// and then finally sort the entries
const entries = input.split('\n').map(Number).sort((a, b) => { return a - b; });

let i = 0;
let j = entries.length - 1;
let vi;
let vj;
let total;

// this of course assumes that there are two values which will sum to 2020
// if input did not include two such values, then I would do a solution
// more like what was done for part02.js.
do {
    vi = entries[i];

    for (j = (entries.length - 1); j > i; j--) {
        vj = entries[j];

        total = vi + vj;

        if (total <= 2020) {
            break;
        }
    }

    i++;
} while (total != 2020);

console.log(`Total: ${total}`);
console.log(`Values: ${vi}, ${vj}`);
console.log(`Multiplied: ${vi * vj}`);
