'use strict';

// require node modules
const fs = require('fs');
const path = require('path');

// assume there's a file "input" in the current directory
const inputFilePath = path.join(__dirname, 'input');

// read the input file with utf-8 encoding
const input = fs.readFileSync(inputFilePath, { encoding: 'utf-8' });

// the regular expression for matching seat codes; we expect a combination of
// 7 B's and F's followed by 3 L's and R's.
const seatCodeRegex = /^([BF]{7})([LR]{3})$/;

// each line of the input corresponds to a seat code
const seats = input.split('\n');

const highestSeatId = seats.reduce((max, seat) => {
    // parse the row and columns codes with our regular expression
    const [, rowCode, columnCode] = seatCodeRegex.exec(seat);
    
    // convert our row and column codes into binary strings. for rows, 'F'
    // corresponds to '0' and 'B' to '1'. for columns, 'L' corresponds to '0'
    // and 'R' to '1'.
    const rowBinaryStr = Array.from(rowCode).map((value) => {
        return (value === 'B') ? '1' : '0';
    }).join('');
    const columnBinaryStr = Array.from(columnCode).map((value) => {
        return (value === 'R') ? '1' : '0';
    }).join('');
    // parse our binary strings
    const row = parseInt(rowBinaryStr, 2);
    const column = parseInt(columnBinaryStr, 2);

    // seat ID is calculated by multiplying the row by 8 and adding it to the
    // column
    const seatId = (row * 8) + column;

    // if seatId is above the known max, make it the new max, otherwise return
    // the current max value
    if (seatId > max) {
        return seatId;
    }
    else {
        return max;
    }
}, 0);

console.log(`Highest seat ID: ${highestSeatId}`);
