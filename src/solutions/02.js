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

const getCommonCharacters = (a, b) => {
    const common = [];

    for (let i = 0; i < a.length; i++) {
        if (a[i] === b[i]) {
            common.push(a[i]);
        }
    }

    return common;
};

const partTwo = (input) => {
    const lines = input.split("\n");

    for (let line of lines) {
        const others = lines.filter(other => other !== line);

        const commons = others.map(other => getCommonCharacters(line, other));

        const match = commons.find(common => common.length === line.length - 1);

        if (match) {
            return match.join("");
        }
    };
};

module.exports = {
    partOne: partOne,
    partTwo: partTwo
};
