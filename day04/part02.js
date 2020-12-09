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

// use a closure to create a min-max number validator
function minMaxValidator(min, max) {
    return (valueStr) => {
        const value = Number(valueStr);

        return (value >= min) && (value <= max);
    };
}

const cmHgtValidator = minMaxValidator(150, 193);
const inHgtValidator = minMaxValidator(59, 76);

// field validators
const fieldValidators = {
    'byr': minMaxValidator(1920, 2002),
    'iyr': minMaxValidator(2010, 2020),
    'eyr': minMaxValidator(2020, 2030),
    'hgt': (value) => {
        const result = /^([0-9]+)(cm|in)$/.exec(value);

        // check that the regex returned a result
        if (!result) {
            return false;
        }

        // get the height and unit from substring matches
        const [, height, unit] = result;

        if (unit === 'cm') {
            return cmHgtValidator(height);
        }
        else if (unit === 'in') {
            return inHgtValidator(height);
        }
        else {
            return false;
        }
    },
    'hcl': (value) => {
        return /^#[a-f0-9]{6}$/.test(value);
    },
    'ecl': (value) => {
        return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value);
    },
    'pid': (value) => {
        return /^[0-9]{9}$/.test(value);
    }
};

// "optional" fields
const optionalFields = [
    'cid'
];

const passports = input.split('\n\n');

const validPassports = passports.reduce((count, passport) => {
    // convert the key-value pair strings into a map for O(1) access
    const keyValueMap = passport.split(/\s/).reduce((keyValueMap, keyPair) => {
        const [key, value] = keyPair.split(':');

        keyValueMap[key] = value;

        return keyValueMap;
    }, {});

    // check that each required field is present and has a valid value
    const valid = requiredFields.every((field) => {
        const value = keyValueMap[field];

        return fieldValidators[field](value);
    });

    if (valid) {
        count = count + 1;
    }

    return count;
}, 0);

console.log(`Number of valid passports: ${validPassports}`);
