const regex = /Step (\w) must be finished before step (\w) can begin\./;

const parseLine = (line) => {
    const parsed = regex.exec(line);

    return {
        dependencyId: parsed[1],
        stepId: parsed[2]
    };
};

const getStep = (steps, id) => {
    if (steps[id] === undefined) {
        steps[id] = {
            id: id,
            completed: false,
            dependencies: []
        };
    }

    return steps[id];
};

const getNextAvailableStep = (steps) => {
    const uncompletedSteps = Object.values(steps).filter(s => s.completed === false);

    if (uncompletedSteps.length === 0) {
        return null;
    }

    const available = uncompletedSteps.filter(s => {
        // if no dependencies, it's available
        if (s.dependencies.length === 0) {
            return true;
        }

        // if all dependencies completed, it's available
        return s.dependencies.every(depId => steps[depId].completed === true);
    });

    available.sort((a, b) => a.id.localeCompare(b.id));

    if (available.length !== 0) {
        return available[0];
    }

    return null;
};

const partOne = (input) => {
    const lines = input.split("\n").map(parseLine);

    const steps = lines.reduce((acc, { dependencyId, stepId }) => {
        const step = getStep(acc, stepId);
        getStep(acc, dependencyId); // make the dependency too

        step.dependencies.push(dependencyId);

        return acc;
    }, []);

    const result = [];

    while (true) {
        const next = getNextAvailableStep(steps);

        if (next === null) {
            break;
        }

        result.push(next.id);
        next.completed = true;
    }

    return result.join("");
};

module.exports = {
    partOne: partOne
};
