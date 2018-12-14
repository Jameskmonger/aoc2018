const getHundredsDigit = (number) => Math.floor((number / 100) % 10);

const getPowerLevel = (x, y, serial) => {
    const rackId = x + 10;

    return getHundredsDigit(((rackId * y) + serial) * rackId) - 5
};

const partOne = (input) => {
    const GRID_SIZE = 300;

    let highestPower = 0;
    let highestCoordinates = null;

    for (let x = 1; x < GRID_SIZE - 3; x++) {
        for (let y = 1; y < GRID_SIZE - 3; y++) {
            const powers = [
                getPowerLevel(x + 0, y + 0, input), getPowerLevel(x + 1, y + 0, input), getPowerLevel(x + 2, y + 0, input),
                getPowerLevel(x + 0, y + 1, input), getPowerLevel(x + 1, y + 1, input), getPowerLevel(x + 2, y + 1, input),
                getPowerLevel(x + 0, y + 2, input), getPowerLevel(x + 1, y + 2, input), getPowerLevel(x + 2, y + 2, input)
            ];

            const totalPower = powers.reduce((acc, cur) => acc + cur, 0);

            if (totalPower > highestPower) {
                highestPower = totalPower;
                highestCoordinates = [x, y];
            }
        }
    }

    return highestCoordinates;
};

module.exports = {
    partOne: partOne
};
