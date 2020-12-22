'use strict';

// require node modules
const fs = require('fs');
const path = require('path');

// assume there's a file "input" in the current directory
const inputFilePath = path.join(__dirname, 'input');

// read the input file with utf-8 encoding
const input = fs.readFileSync(inputFilePath, { encoding: 'utf-8' });

// each instruction is delimited by a new line
const instructions = input.split('\n');

// store a set of unique instructions already executed
const visited = new Set();
// accumulator initialized to 0
let accumulator = 0;
// start at the first instruction
let index = 0;

while(true) {
    // have we already executed this instruction?
    const alreadyExecuted = visited.has(index);

    // if so, break out of the loop at print the value stored in the
    // accumulator
    if (alreadyExecuted) {
        console.log(`Value of accumulator before revisiting instruction: ${accumulator}`);
        break;
    }

    // add this index to the visited list
    visited.add(index);

    // get the instruction
    const instruction = instructions[index];

    // parse out the operator and argument
    const [operator, argumentStr] = instruction.split(' ');
    // convert the argument from a string to a number
    const argument = parseInt(argumentStr);

    // this instruction code works as follows:
    //   acc: increment the accumulator by the argument value
    //   jmp: increment the index by the argument value
    //   nop: skip to the next instruction
    switch(operator) {
        case 'acc':
            accumulator += argument;
            index++;
            break;
        case 'jmp':
            index += argument;
            break;
        default:
            index++;
    }
}
