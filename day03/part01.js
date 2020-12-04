'use strict';

// require node modules
const fs = require('fs');
const path = require('path');

let [,, rightValue, downValue] = process.argv.map(Number);

// convert parameters to numbers (process.argv returns them as strings)
// set default values in case we're passed junk values (or none at all)
let right = 0;
let down = 1;

if (!isNaN(rightValue)) {
    // if rightValue is a number (isNaN does the conversion from a string),
    // use it, but only if it's non-negative; otherwise use the default value
    right = Number(rightValue);
    right = (right >= 0) ? right : 0;
}

if (!isNaN(downValue)) {
    // likewise if downValue is a number use it, but only if it's greater than
    // zero; otherwise use the default value
    down = Number(downValue);
    down = (down > 0) ? down : 1;
}

// assume there's a file "input" in the current directory
const inputFilePath = path.join(__dirname, 'input');

// read the input file with utf-8 encoding
const input = fs.readFileSync(inputFilePath, { encoding: 'utf-8' });

// each line is an row; split on newline character
const rows = input.split('\n');

let x = 0, y = 0;
let treeCount = 0;

// loop through the rows, step down customized amount
for (; y < rows.length; y += down) {
    const row = rows[y];
    // the x coordinate needs to be moded with the row length, to support
    // looping
    const square = row[x % row.length];

    // if the square contains a #, it's a tree (watch out!)
    if (square === '#') {
        treeCount = treeCount + 1;
    }

    // steps right customized amount
    x = x + right;
}

console.log(`Trees encountered: ${treeCount}`);
