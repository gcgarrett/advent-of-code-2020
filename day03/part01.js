'use strict';

// require node modules
const fs = require('fs');
const path = require('path');

let [,, rightValue, downValue] = process.argv.map(Number);

// convert parameters to numbers (process.argv returns them as strings)
const right = Number(rightValue);
const down = Number(downValue);

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
