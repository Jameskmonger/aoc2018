const regex = /(\d+), (\d+)/;
const parseCoordinate = (line) => {
    const parsed = regex.exec(line);

    return {
        closestCounts: [ 0, 0 ],
        x: parseInt(parsed[1]),
        y: parseInt(parsed[2])
    };
};

const distanceBetween = (x1, y1, x2, y2) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

const getMax = (coordinates) => {
    const xValues = coordinates.map(c => c.x);
    const yValues = coordinates.map(c => c.y);

    return {
        x: Math.max(...xValues),
        y: Math.max(...yValues)
    };
};

const getClosestPosition = (positions, x, y) => {
    const distances = positions.map((p, index) => ({
        index,
        distance: distanceBetween(x, y, p.x, p.y)
    }));

    distances.sort((a, b) => a.distance - b.distance);

    const closest = distances[0];
    const next = distances[1];

    if (closest.distance === next.distance) {
        return null;
    }

    return positions[closest.index];
};

const calculateClosestPoints = (pass, positions, minX, minY, maxX, maxY) => {
    for (let x = minX; x < maxX; x++) {
        for (let y = minY; y < maxY; y++) {
            const closestPosition = getClosestPosition(positions, x, y);

            if (closestPosition === null) {
                continue;
            }

            closestPosition.closestCounts[pass]++;
        }
    }
};

const partOne = (input) => {
    const positions = input.split("\n").map(parseCoordinate);
    const bounds = getMax(positions);

    calculateClosestPoints(0, positions, 0, 0, bounds.x, bounds.y);

    // run again with an expanded area so we can filter out infinite ones
    calculateClosestPoints(1, positions, -100, -100, bounds.x + 100, bounds.y + 100);

    const eligible = positions.filter(p => p.closestCounts[0] === p.closestCounts[1]);

    const closests = eligible.map(p => p.closestCounts[1]);

    return Math.max(...closests);
};

const partTwo = (input) => {
    const PERMISSIBLE_DISTANCE = 10000;
    const positions = input.split("\n").map(parseCoordinate);
    const bounds = getMax(positions);

    let pointsWithinRange = 0;

    for (let x = 0; x < bounds.x; x++) {
        for (let y = 0; y < bounds.y; y++) {
            const totalDistance = positions.reduce((acc, cur) => {
                return acc + distanceBetween(x, y, cur.x, cur.y);
            }, 0);

            if (totalDistance < PERMISSIBLE_DISTANCE) {
                pointsWithinRange++;
            }
        }
    }

    return pointsWithinRange;
};

module.exports = {
    partOne: partOne,
    partTwo: partTwo
};
