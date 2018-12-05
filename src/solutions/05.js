const ALPHABET = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const generatePairRegex = (char) => {
    const upper = char.toUpperCase();
    return RegExp(`(${char}${upper})|(${upper}${char})`, "g");
};
const generateSingleRegex = (char) => RegExp(`${char}|${char.toUpperCase()}`, "g");

const reactPolymers = (input) => {
    let result = input;
    let changesMade = true;

    while (changesMade) {
        const startLength = result.length;

        for (const char of ALPHABET) {
            const regex = generatePairRegex(char);
            
            result = result.replace(regex, "");
        }

        changesMade = startLength !== result.length;
    }

    return result;
};

const partOne = (input) => reactPolymers(input).length;

const partTwo = (input) => {
    let lowest = Number.MAX_SAFE_INTEGER;

    for (const char of ALPHABET) {
        const regex = generateSingleRegex(char);
        const stripped = input.replace(regex, "");

        const reacted = reactPolymers(stripped);

        if (reacted.length < lowest) {
            lowest = reacted.length;
        }
    }

    return lowest;
};

module.exports = {
    partOne: partOne,
    partTwo: partTwo
};
