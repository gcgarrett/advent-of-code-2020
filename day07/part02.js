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

// use a recursive function to get all of the bags contained by the named bag.
// this will multiply the number of all contained bags, so that, for instance:
//   if shiny gold bags contain 2 dark red bags
//   and dark red bags contain 2 dark orange bags
// then the 2 dark orange bags will have a multiplier of 2 from the fact that
// shiny gold bags contain 2 dark red bags. this needs to be passed down, so
// that
//   if dark orange bags contain 2 dark yellow bags
// then it gets a multiplier of 4, and so there are 8 darky yellow bags total
function findContainedBags(bagName, multiplier) {
    // get all of the bags contained by the given bag name
    const containedBags = bagRulesMap[bagName];

    if (!containedBags) {
        // this bag contains no bags! return 0 for the count!
        return 0;
    }

    // iterate over the contained bags, adding the number 
    return Object.entries(containedBags).reduce((count, [type, number]) => {
        // get the total for this type of bag, multiplying the number contained
        // by the parent bag by the given multiplier
        const totalOfType = (number * multiplier);
        return count + totalOfType + findContainedBags(type, totalOfType);
    }, 0);
}

const count = findContainedBags('shiny gold', 1);

console.log(`Total number of bag colors that a "shiny gold" bag contains: ${count}`);
