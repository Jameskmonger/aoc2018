const partOne = (input) => input.split("\n").reduce((acc, cur) => acc + parseInt(cur), 0);

const partTwo = (input) => {
    const instructions = input.split("\n");
    const counts = [];

    // set up initial values
    let value = 0;
    counts[0] = 1;

    while (true) {
        for (let i of instructions) {
            value += parseInt(i);

            if (counts[value] === undefined) {
                counts[value] = 0;
            }
            
            counts[value]++;

            if (counts[value] == 2) {
                return value;
            }
        }
    }
};

module.exports = {
    partOne: partOne,
    partTwo: partTwo
};
