const day = parseInt(process.argv[2]);

if (isNaN(day)) {
    console.error("Usage: node run.js [day]");
    process.exit(1);
}

console.log(`Advent of Code 2018 - Day ${day}`);

const normalisedDay = day > 9 ? day.toString() : `0${day.toString()}`;

const input = require(`./inputs/${normalisedDay}`);
const solution = require(`./solutions/${normalisedDay}`);

const resultOne = solution.partOne(input);
console.log(`Part one result: ${resultOne}`);

if (solution.partTwo) {
    const resultTwo = solution.partTwo(input);
    console.log(`Part two result: ${resultTwo}`);
} else {
    console.log(`There is no solution for part two`);
}
