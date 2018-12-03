const regex = /\#(\d+) \@ (\d+)\,(\d+)\: (\d+)\x(\d+)/;

const getClaims = (input) => {
    const lines = input.split("\n");

    return lines.map(line => {
        const extracted = regex.exec(line);

        return {
            id: parseInt(extracted[1]),
            x: parseInt(extracted[2]),
            y: parseInt(extracted[3]),
            width: parseInt(extracted[4]),
            height: parseInt(extracted[5])
        };
    });
}; 

const partOne = (input) => {
    const claims = getClaims(input);

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

const partTwo = (input) => {
    const claims = getClaims(input);

    const grid = [];
    const claimsIntact = [];

    for (const claim of claims) {
        let intact = true;

        for (let x = claim.x; x < claim.x + claim.width; x++) {
            for (let y = claim.y; y < claim.y + claim.height; y++) {
                const occupying = grid[`${x},${y}`];

                if (occupying !== undefined) {
                    intact = false;
                    claimsIntact[occupying] = false;
                }

                grid[`${x},${y}`] = claim.id;
            }
        }

        claimsIntact[claim.id] = intact;
    }
    
    return claimsIntact.findIndex(x => x === true);
};


module.exports = {
    partOne: partOne,
    partTwo: partTwo
};
