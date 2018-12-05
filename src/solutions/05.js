const ALPHABET = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const generatePairRegex = (char) => {
    const upper = char.toUpperCase();
    return RegExp(`(${char}${upper})|(${upper}${char})`, "g");
};

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

module.exports = {
    partOne: partOne
};
