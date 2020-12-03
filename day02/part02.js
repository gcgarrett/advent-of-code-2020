'use strict';

// require node modules
const fs = require('fs');
const path = require('path');

// assume there's a file "input" in the current directory
const inputFilePath = path.join(__dirname, 'input');

// read the input file with utf-8 encoding
const input = fs.readFileSync(inputFilePath, { encoding: 'utf-8' });

// regex for the password policy and password
const entryRegex = new RegExp(/^([1-9][0-9]*)-([1-9][0-9]*) ([a-z]): ([a-z]+)$/);

// each line is an entry; split on newline character
const entries = input.split('\n');

const count = entries.reduce((count, entry) => {
    // execute the regular expression and get the index 1, index 2, letter, and
    // password values from the matched regions
    const [, p1, p2, letter, password] = entryRegex.exec(entry);

    // get the letters at the given indices; indices are not zero-based, so
    // subtract 1
    const l1 = password[p1 - 1];
    const l2 = password[p2 - 1];

    // the letters at both position can't be the same, so if they are (even if
    // they don't match the policy letter), the password is invalid, so return
    // count. otherwise, if either of the letters matches the policy letter,
    // then the password is valid to return the incremented count. finally, if
    // return the count as the password is invalid.
    if (l1 === l2) {
        return count;
    }
    else if ((l1 === letter) || (l2 === letter)) {
        return count + 1;
    }
    else {
        return count;
    }
}, 0);

console.log(`Valid Entry Count: ${count}`);
