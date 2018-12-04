const InstructionType = {
    NEW_GUARD: 1,
    FALL_ASLEEP: 2,
    WAKE_UP: 3
};

const mapLineToInstruction = (line) => {
    const extracted = /\[\d{4}-\d{2}-\d{2} \d{2}:(\d{2})\] (.+)/.exec(line);
    const minute = parseInt(extracted[1]);
    const message = extracted[2];

    if (message === "falls asleep") {
        return {
            type: InstructionType.FALL_ASLEEP,
            minute: minute
        };
    }

    if (message === "wakes up") {
        return {
            type: InstructionType.WAKE_UP,
            minute: minute
        };
    }

    const guardInfo = /Guard #(\d+) begins shift/.exec(message);

    return {
        type: InstructionType.NEW_GUARD,
        minute: minute,
        guardId: parseInt(guardInfo[1])
    };
};

const getInstructions = (input) => {
    const lines = input.split("\n");
    lines.sort();

    return lines.map(mapLineToInstruction);
};

const parseTimesheets = (input) => {
    let currentGuard = null;
    let sleepTime = null;
    const timesheets = {};

    for (const instruction of getInstructions(input)) {
        if (instruction.type === InstructionType.NEW_GUARD) {
            currentGuard = instruction.guardId;
            sleepTime = null;

            if (timesheets[currentGuard] === undefined) {
                timesheets[currentGuard] = {
                    guardId: currentGuard,
                    total: 0,
                    log: []
                };
            }

            continue;
        }

        if (instruction.type === InstructionType.FALL_ASLEEP) {
            sleepTime = instruction.minute;
            continue;
        }

        const guardTimesheet = timesheets[currentGuard];

        for (let i = sleepTime; i < instruction.minute; i++) {
            guardTimesheet.log[i] = (guardTimesheet.log[i] || 0) + 1;
            guardTimesheet.total++;
        }
    }

    return Object.values(timesheets);
}

const getSleepiestMinute = (log) => {
    // remove all empty minutes
    const sleptMinutes = log.filter(x => x !== undefined);
    const highestIncidence = Math.max(...sleptMinutes);

    return log.indexOf(highestIncidence);
};

const partOne = (input) => {
    const sleepiestGuard = parseTimesheets(input).sort((a, b) => b.total - a.total)[0];

    return sleepiestGuard.guardId * getSleepiestMinute(sleepiestGuard.log);
};

const partTwo = (input) => {
    const timesheets = parseTimesheets(input);

    let highestAmount = 0;
    let highestGuard = null;
    let highestMinute = null;

    for (const timesheet of timesheets) {
        const sleepiest = getSleepiestMinute(timesheet.log);
        const value = timesheet.log[sleepiest];

        if (value > highestAmount) {
            highestAmount = value;
            highestGuard = timesheet.guardId;
            highestMinute = sleepiest;
        }
    }

    return highestGuard * highestMinute;
}

module.exports = {
    partOne: partOne,
    partTwo: partTwo
};
