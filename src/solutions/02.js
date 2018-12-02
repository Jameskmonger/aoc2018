// get the character counts in a given string
// getCharCounts("abb") => { a: 1, b: 2 }
const getCharCounts = 
    (str) => str.split("")
        .reduce((acc, cur) => {
            return {
                ...acc,

                [cur]: (acc[cur] || 0) + 1
            };
        }, {});

const partOne = (input) => {
    const lineCharCounts = input.split("\n").map(getCharCounts);

    const twos = lineCharCounts.filter(line => Object.values(line).some(x => x === 2)).length;
    const threes = lineCharCounts.filter(line => Object.values(line).some(x => x === 3)).length;

    return twos * threes;
};

module.exports = {
    partOne: partOne
};
