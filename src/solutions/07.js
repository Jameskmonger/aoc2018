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
            dependencies: [],
            locked: false
        };
    }

    return steps[id];
};

const getNextAvailableStep = (steps) => {
    const uncompletedSteps = Object.values(steps).filter(s => s.completed === false && s.locked === false);

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

const getSteps = (input) => {
    const lines = input.split("\n").map(parseLine);

    return lines.reduce((acc, { dependencyId, stepId }) => {
        const step = getStep(acc, stepId);
        getStep(acc, dependencyId); // make the dependency too

        step.dependencies.push(dependencyId);

        return acc;
    }, []);
}

const partOne = (input) => {
    const steps = getSteps(input);

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

const getStepLength = (step) => step.id.charCodeAt(0) - 64;

const createWorkers = (count) => {
    const workers = [];

    for (let i = 0; i < count; i++) {
        workers.push({
            currentStep: null,
            finishesAt: null
        });
    }

    return workers;
};

const getAvailableWorker = (workers, step) => {
    return workers.find(w => w.currentStep === null) || null;
};

const partTwo = (input) => {
    const steps = getSteps(input);
    const workers = createWorkers(5);
    const BASE_STEP_LENGTH = 60;
    let stepCount = 0;

    while (true) {
        if (Object.values(steps).every(s => s.completed === true)) {
            break;
        }

        const finishingWorkers = workers.filter(w => w.currentStep !== null && w.finishesAt === stepCount);

        finishingWorkers.forEach(w => {
            w.currentStep.completed = true;
            w.currentStep = null;
            w.finishesAt = null;
        });

        const availableWorkers = workers.filter(w => w.currentStep === null);

        if (availableWorkers.length === 0) {
            stepCount++;
            continue;
        }

        availableWorkers.forEach(w => {
            const step = getNextAvailableStep(steps);

            if (step === null) {
                return;
            }

            step.locked = true;
            w.currentStep = step;
            w.finishesAt = stepCount + BASE_STEP_LENGTH + getStepLength(step);
        });

        stepCount++;
    }

    return stepCount - 1;
};

module.exports = {
    partOne: partOne,
    partTwo: partTwo
};
