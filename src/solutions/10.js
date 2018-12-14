const regex = /position=<(\s*-?\d+), (\s*-?\d+)> velocity=<(\s*-?\d+),(\s*-?\d+)>/;
const parseLine = (line) => {
    const parsed = regex.exec(line);

    return {
        position: {
            x: parseInt(parsed[1]),
            y: parseInt(parsed[2])
        },
        velocity: {
            x: parseInt(parsed[3]),
            y: parseInt(parsed[4])
        }
    };
};

const getBounds = (positions) => {
    const xValues = positions.map(p => p.position.x);
    const yValues = positions.map(p => p.position.y);

    return {
        minX: Math.min(...xValues),
        minY: Math.min(...yValues),
        maxX: Math.max(...xValues),
        maxY: Math.max(...yValues)
    };
};

const applyVelocities = (positions) => {
    for (const p of positions) {
        p.position.x += p.velocity.x;
        p.position.y += p.velocity.y;
    }
};

const rasterisePositions = (positions) => {
    const xValues = positions.map(p => p.position.x);
    const yValues = positions.map(p => p.position.y);

    const minRow = Math.min(...yValues);
    const minCol = Math.min(...xValues);
    const maxRow = Math.max(...yValues);
    const maxCol = Math.max(...xValues);

    const output = [];

    for (let row = minRow; row < maxRow + 1; row++) {
        const rowOutput = [];

        for (let col = minCol; col < maxCol + 1; col++) {
            const match = positions.some(p => p.position.x === col && p.position.y === row);

            if (match) {
                rowOutput.push("#");
            } else {
                rowOutput.push(" ");
            }
        }

        output.push(rowOutput.join(""));
    }

    return output.join("\n");
};

const partOne = (input) => {
    const positions = input.split("\n").map(parseLine);
    const LETTER_HEIGHT = 15;

    while (true) {
        applyVelocities(positions);

        const bounds = getBounds(positions);

        const spreadX = bounds.maxX - bounds.minX;
        const spreadY = bounds.maxY - bounds.minY;

        if (spreadX <= LETTER_HEIGHT || spreadY <= LETTER_HEIGHT) {
            break;
        }
    }

    const raster = rasterisePositions(positions);

    return "\n" + raster;
};

module.exports = {
    partOne: partOne
};
