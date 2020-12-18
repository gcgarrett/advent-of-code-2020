'use strict';

// require node modules
const fs = require('fs');
const path = require('path');

// assume there's a file "input" in the current directory
const inputFilePath = path.join(__dirname, 'input');

// read the input file with utf-8 encoding
const input = fs.readFileSync(inputFilePath, { encoding: 'utf-8' });

// each group is delimited by a blank line
const groups = input.split('\n\n');

// iterate through the groups, adding the total unique answers for the group to
// the total sum across all groups
const sum = groups.reduce((sum, group) => {
    // convert the group individual person answers into a string of all answers
    // for the group
    const allAnswers = group.split('\n').join('');

    // convert that string of all answers into an Array of characters
    // representing each answer, then pass it to the constructor for a Set,
    // which will only stores unique values.
    const answerSet = new Set(Array.from(allAnswers));

    // add the size of the Set (the number of unique answers for the group) to
    // the total sum.
    return sum + answerSet.size;
}, 0);

console.log(`Sum is: ${sum}`);
