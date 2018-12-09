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

const readNodeTree = (numbers) => {
    const readNode = (pointer) => {
        const childNodeCount = numbers[pointer++];
        const metadataCount = numbers[pointer++];

        const metadata = [];
        const children = [];

        for (let i = 0; i < childNodeCount; i++) {
            const read = readNode(pointer);
            pointer = read.pointer;
            children.push(read.node);
        }

        for (let m = 0; m < metadataCount; m++) {
            metadata.push(numbers[pointer++]);
        }

        return {
            pointer,

            node: {
                metadata,
                children
            }
        };
    };

    const { node } = readNode(0);

    return node;
};

const getNodeValue = (node) => {
    if (node.children.length === 0) {
        return node.metadata.reduce((acc, cur) => acc + cur, 0);
    }

    return node.metadata.reduce((acc, cur) => {
        const child = node.children[cur - 1];

        if (child === undefined) {
            return acc;
        }

        return acc + getNodeValue(child);
    }, 0);
};

const partTwo = (input) => {
    const numbers = input.split(" ").map(i => parseInt(i));

    const tree = readNodeTree(numbers);

    return getNodeValue(tree);
}

module.exports = {
    partOne: partOne,
    partTwo: partTwo
};
