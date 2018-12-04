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

const partOne = (input) => {
    const lines = input.split("\n");
    lines.sort();

    let currentGuard = null;
    let sleepTime = null;
    const timesheets = {};
    for (const instruction of lines.map(mapLineToInstruction)) {
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

    const sleepiestGuard = Object.values(timesheets).sort((a, b) => b.total - a.total)[0];

    // remove all empty minutes
    const sleptMinutes = sleepiestGuard.log.filter(x => x !== undefined);

    const highestIncidence = Math.max(...sleptMinutes);

    const sleepiestMinute = sleepiestGuard.log.indexOf(highestIncidence);

    return sleepiestGuard.guardId * sleepiestMinute;
};

module.exports = {
    partOne: partOne
};
