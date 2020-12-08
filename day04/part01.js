'use strict';

// require node modules
const fs = require('fs');
const path = require('path');

// assume there's a file "input" in the current directory
const inputFilePath = path.join(__dirname, 'input');

// read the input file with utf-8 encoding
const input = fs.readFileSync(inputFilePath, { encoding: 'utf-8' });

// required fields
const requiredFields = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid'
];

// "optional" fields
const optionalFields = [
    'cid'
];

const passports = input.split('\n\n');

const validPassports = passports.reduce((count, passport) => {
    const fields = passport.split(/\s/).map((pair) => {
        const [key] = pair.split(':');

        return key;
    });

    const valid = requiredFields.every((field) => {
        return fields.includes(field);
    });

    if (valid) {
        count = count + 1;
    }

    return count;
}, 0);

console.log(`Number of valid passports: ${validPassports}`);
