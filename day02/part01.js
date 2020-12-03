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
    // execute the regular expression and get the min, max, letter, and
    // password values from the matched regions
    const [, min, max, letter, password] = entryRegex.exec(entry);

    // convert password to an array and filter out any letters that are not the
    // policy letter, then get the count
    const occurances = Array.from(password).filter((l) => { 
        return (l === letter);
    }).length;

    // test that the number of policy letter occurances is within the policy
    // minimum and maximum range; if so, increment the count of valid entries
    if ((occurances >= min) && (occurances <= max)) {
        count++;
    }

    return count;
}, 0);

console.log(`Valid Entry Count: ${count}`);
