const regex = /(\d+) players; last marble is worth (\d+) points/;
const parseInput = (input) => {
    const parsed = regex.exec(input);

    return {
        players: parseInt(parsed[1]),
        lastMarble: parseInt(parsed[2])
    };
};

const addMarble = (value, prev) => {
    const newMarble = {
        value: value,
        prev: prev,
        next: prev.next
    };

    prev.next.prev = newMarble;
    prev.next = newMarble;

    return newMarble;
};

const partOne = (input) => {
    const options = parseInput(input);

    const scores = [];
    let currentPlayer = -1;

    let currentMarble = {
        value: 0,
        prev: null,
        next: null
    };
    currentMarble.prev = currentMarble;
    currentMarble.next = currentMarble;

    for (let i = 1; i < options.lastMarble; i++) {
        if (scores[currentPlayer] === undefined) {
            scores[currentPlayer] = 0;
        }

        if (i % 23 === 0) {
            scores[currentPlayer] += i;

            currentMarble = currentMarble.prev.prev.prev.prev.prev.prev;
            scores[currentPlayer] += currentMarble.prev.value;

            currentMarble.prev.prev.next = currentMarble;
            currentMarble.prev = currentMarble.prev.prev;
        } else {
            currentMarble = addMarble(i, currentMarble.next);
        }

        currentPlayer = currentPlayer % options.players + 1;
    }

    return Math.max(...scores);
};

module.exports = {
    partOne: partOne
};
