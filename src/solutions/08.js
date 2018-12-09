const partOne = (input) => {
    const numbers = input.split(" ").map(i => parseInt(i));

    const readNode = (pointer, totalMetadata) => {
        const childNodeCount = numbers[pointer++];
        const metadataCount = numbers[pointer++];

        for (let i = 0; i < childNodeCount; i++) {
            const read = readNode(pointer, totalMetadata);
            pointer = read.pointer;
            totalMetadata = read.totalMetadata;
        }

        for (let m = 0; m < metadataCount; m++) {
            totalMetadata += numbers[pointer++];
        }

        return {
            pointer,
            totalMetadata
        };
    };

    const { totalMetadata } = readNode(0, 0);

    return totalMetadata;
};

module.exports = {
    partOne: partOne
};
