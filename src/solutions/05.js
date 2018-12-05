const ALPHABET = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const generateRegex = (char) => {
    const upper = char.toUpperCase();
    return RegExp(`(${char}${upper})|(${upper}${char})`, "g");
};

const partOne = (input) => {
    let result = input;
    let changesMade = true;

    while (changesMade) {
        const startLength = result.length;

        for (const char of ALPHABET) {
            const regex = generateRegex(char);
            
            result = result.replace(regex, "");
        }

        changesMade = startLength !== result.length;
    }

    return result.length;
};

module.exports = {
    partOne: partOne
};
