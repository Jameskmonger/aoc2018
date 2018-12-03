const regex = /\#(\d+) \@ (\d+)\,(\d+)\: (\d+)\x(\d+)/;

const partOne = (input) => {
    const lines = input.split("\n");

    const claims = lines.map(line => {
        const extracted = regex.exec(line);

        return {
            id: parseInt(extracted[1]),
            x: parseInt(extracted[2]),
            y: parseInt(extracted[3]),
            width: parseInt(extracted[4]),
            height: parseInt(extracted[5])
        };
    });

    const grid = claims.reduce((acc, cur) => {
        for (let x = cur.x; x < cur.x + cur.width; x++) {
            for (let y = cur.y; y < cur.y + cur.height; y++) {
                acc[`${x},${y}`] = (acc[`${x},${y}`] || 0) + 1;
            }
        }

        return acc;
    }, []);

    return Object.values(grid).filter(x => x > 1).length;
};

module.exports = {
    partOne: partOne
};
