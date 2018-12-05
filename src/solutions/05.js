const partOne = (input) => {
    let parts = input.split("");
    let changesMade = true;

    while (changesMade) {
        changesMade = false;
        
        for (let i = 1; i < parts.length; i++) {
            const current = parts[i - 1];
            const next = parts[i];

            const matches = current.toUpperCase() === next.toUpperCase() && current !== next;

            if (matches) {
                parts[i - 1] = parts[i] = "_";
                changesMade = true;
            }
        }

        parts = parts.filter(x => x !== "_");
    }

    return parts.length;
};

module.exports = {
    partOne: partOne
};
