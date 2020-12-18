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

// iterate through the groups, adding the totals for the group to he total sum
// across all groups
const sum = groups.reduce((sum, group) => {
    // split the group into individuals
    const individuals = group.split('\n');
    // how many individuals are there in the group
    const count = individuals.length;
    // store the counts for each answer in a map
    const answerMap = new Map();

    // loop over the individuals, adding there answers to the answer map
    individuals.forEach((answersStr) => {
        // convert individual answer string into an array to iterate over
        const answers = Array.from(answersStr);

        // loop through answers
        answers.forEach((answer) => {
            // get the value for the answer in the answer map, defaulting to 0
            const answerCount = answerMap.get(answer) ?? 0;

            // add 1 to the count in the answer map
            answerMap.set(answer, answerCount + 1);
        });
    });

    let total = 0;

    // now find how many answers there were that are true for every individual
    for (let answerCount of answerMap.values()) {
        total += (answerCount === count) ? 1 : 0;
    }

    // add the size of the Set (the number of unique answers for the group) to
    // the total sum.
    return sum + total;
}, 0);

console.log(`Sum is: ${sum}`);
