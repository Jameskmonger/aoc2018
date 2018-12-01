const partOne = (input) => input.split("\n").reduce((acc, cur) => acc + parseInt(cur), 0);

module.exports = {
    partOne: partOne
};
