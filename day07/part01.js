'use strict';

// require node modules
const fs = require('fs');
const path = require('path');

// assume there's a file "input" in the current directory
const inputFilePath = path.join(__dirname, 'input');

// read the input file with utf-8 encoding
const input = fs.readFileSync(inputFilePath, { encoding: 'utf-8' });

// each bag rule is delimited by a new line
const bagRules = input.split('\n');

// regular expressions for getting parts of the bag rule:
//   - bagRuleContainerRegex: finds the name of the bag the rule defines
//   - bagRuleSubBagRegex: finds the name and number of each bag the container
//                         bag holds
const bagRuleContainerRegex = new RegExp('^([a-z ]+) bags');
const bagRuleSubBagRegex = new RegExp('([1-9]{1}) ([a-z ]+) bags?', 'g');

// convert the human-readable bag rules into a map
const bagRulesMap = bagRules.reduce((rulesMap, bagRule) => {
    // get the container bag defined by the rule
    const [, containerBag] = bagRuleContainerRegex.exec(bagRule);
    // store the bags contained by this bag in a map where the key is the bag
    // name and the value is the number
    const subBagMap = {};
    // stores result of the bagRuleSubBagRegex execution
    let subBagResult;

    // loop through the bags contained by this bag
    while ((subBagResult = bagRuleSubBagRegex.exec(bagRule)) !== null) {
        // get the count and contained bag name
        const [, count, subBag] = subBagResult;
        // update the map of contained bags and counts for the container bag
        subBagMap[subBag] = count;
        // call this so the next call to the loop will find the next contained
        // bag
        bagRuleSubBagRegex.lastIndex;
    }

    // update the overall rules map, where the container bag name is the key
    // and the bags it contains are a map
    rulesMap[containerBag] = subBagMap;

    return rulesMap;
}, {});

// finds all bags that contain the bag with the given name
function findContainerBags(bagName) {
    const containerBags = [];

    Object.entries(bagRulesMap).forEach(([containerBag, subBags]) => {
        if (subBags[bagName]) {
            containerBags.push(containerBag);
        }
    });

    return containerBags;
}

// create a look-up array that will hold the name of all bags remaining to be
// searched for
const lookupArray = ['shiny gold'];
// the list of bags that can contain our "shiny gold" bag needs to be deduped,
// so store them in a set
const containersSet = new Set();

while (lookupArray.length > 0) {
    // get the bag name to search for
    const bagName = lookupArray.pop();
    // find all bags that can contain that bag
    const containerBags = findContainerBags(bagName);

    // add those bags that can contain the target bag in the set of possible
    // containers
    containerBags.forEach((containerBag) => {
        containersSet.add(containerBag);
    });
    // add those bags to the look up array, so we can find any bags that can
    // contain them
    lookupArray.push(...containerBags);
}

console.log(`Total number of bag colors that can contain at least one "shiny gold" bag: ${containersSet.size}`);
