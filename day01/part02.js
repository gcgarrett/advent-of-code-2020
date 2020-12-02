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

// indices
let i, j, k;
// values
let vi, vj, vk;
// total
let total;
// entries length
const len = entries.length;

// til that JavaScript supports labels, which can be used to break out of
// nested loops
iLoop:
for (i = 0; i < (len - 2); i++) {
    vi = entries[i];

    for (j = 1; j < (len - 1); j++) {
        vj = entries[j];

        for (k = 2; k < len; k++) {
            vk = entries[k];

            total = vi + vj + vk;

            if (total === 2020) {
                break iLoop;
            }
        }
    }
}

console.log(`Total: ${total}`);
console.log(`Values: ${vi}, ${vj}, ${vk}`);
console.log(`Multiplied: ${vi * vj * vk}`);
