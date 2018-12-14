const getHundredsDigit = (number) => Math.floor((number / 100) % 10);

const getPowerLevel = (x, y, serial) => {
    const rackId = x + 10;

    return getHundredsDigit(((rackId * y) + serial) * rackId) - 5
};

const getSquarePower = (serial, x, y, size) => {
    let totalPower = 0;

    for (let _x = x; _x < x + size; _x++) {
        for (let _y = y; _y < y + size; _y++) {
            totalPower += getPowerLevel(_x, _y, serial)
        }
    }

    return totalPower;
};

const partOne = (input) => {
    const GRID_SIZE = 300;

    let highestPower = 0;
    let highestCoordinates = null;

    for (let x = 1; x < GRID_SIZE - 3; x++) {
        for (let y = 1; y < GRID_SIZE - 3; y++) {
            const totalPower = getSquarePower(input, x, y, 3);

            if (totalPower > highestPower) {
                highestPower = totalPower;
                highestCoordinates = [x, y];
            }
        }
    }

    return highestCoordinates;
};

const partTwo = (input) => {
    const GRID_SIZE = 300;

    let highestPower = 0;
    let highestCoordinates = null;
    let highestSize = null;

    for (let size = 1; size <= GRID_SIZE; size++) {
        for (let x = 1; x < GRID_SIZE - size; x++) {
            for (let y = 1; y < GRID_SIZE - size; y++) {
                const totalPower = getSquarePower(input, x, y, size);

                if (totalPower > highestPower) {
                    highestPower = totalPower;
                    highestCoordinates = [x, y];
                    highestSize = size;
                }
            }
        }
    }

    return [ highestCoordinates, highestSize ];
};

module.exports = {
    partOne: partOne,
    partTwo: partTwo
};
