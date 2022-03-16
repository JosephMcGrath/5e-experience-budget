
class Party {

    constructor() {
        this.playerGroups = [];
    }

    /**
     * @param {Number} level 
     */
    validateLevel(level) {
        let parsedValue = parseInt(level);
        if (isNaN(parsedValue)) {
            throw new Error("Input wasn't a number:", level)
        }
        if (level < 1) {
            throw new Error("Level cannot be less than 1.");
        }
        if (level > 20) {
            throw new Error("Level cannot be more than 20.");
        }
    }

    /**
     * @param {Number} level
     * @param {Number} count
     */
    addPlayerGroup(level = 1, count = 1) {
        level = parseInt(level);
        count = parseInt(count);
        this.validateLevel(level);

        this.playerGroups.push({
            level,
            count,
        });
    }

    /**
     * @param {Number} index
     */
    removePlayerGroup(index) {
        this.playerGroups.splice(index, 1)
    }


    clearPlayers() {
        this.playerGroups = [];
    }


    /**
     * A lookup of the number of players at each level.
     */
    get playersAtLevel() {
        let output = {};
        for (let theGroup of this.playerGroups) {
            if (theGroup.level in output) {
                output[theGroup.level] += theGroup.count;
            } else {
                output[theGroup.level] = theGroup.count;
            }
        }
        return output;
    }


    get experienceThresholds() {
        let output = {
            'easy': 0,
            'medium': 0,
            'hard': 0,
            'deadly': 0,
        };

        for (const theGroup of this.playerGroups) {
            const thresholds = this.levelDifficultyThresholds[theGroup.level];
            const playerCount = theGroup.count;

            for (const theDifficulty in output) {
                output[theDifficulty] += thresholds[theDifficulty] * playerCount;
            }
        }
        return output;
    }


    get totalPlayers() {
        let count = 0;
        for (const theGroup of this.playerGroups) {
            count += theGroup.count;
        }
        return count;
    }


    /** Experience thresholds for each character. */
    levelDifficultyThresholds = {
        1: {
            'easy': 25,
            'medium': 50,
            'hard': 75,
            'deadly': 100
        },
        2: {
            'easy': 50,
            'medium': 100,
            'hard': 150,
            'deadly': 200
        },
        3: {
            'easy': 75,
            'medium': 150,
            'hard': 225,
            'deadly': 400
        },
        4: {
            'easy': 125,
            'medium': 250,
            'hard': 375,
            'deadly': 500
        },
        5: {
            'easy': 250,
            'medium': 500,
            'hard': 750,
            'deadly': 1100
        },
        6: {
            'easy': 300,
            'medium': 600,
            'hard': 900,
            'deadly': 1400
        },
        7: {
            'easy': 350,
            'medium': 750,
            'hard': 1100,
            'deadly': 1700
        },
        8: {
            'easy': 450,
            'medium': 900,
            'hard': 1400,
            'deadly': 2100
        },
        9: {
            'easy': 550,
            'medium': 1100,
            'hard': 1600,
            'deadly': 2400
        },
        10: {
            'easy': 600,
            'medium': 1200,
            'hard': 1900,
            'deadly': 2800
        },
        11: {
            'easy': 800,
            'medium': 1600,
            'hard': 2400,
            'deadly': 3600
        },
        12: {
            'easy': 1000,
            'medium': 2000,
            'hard': 3000,
            'deadly': 4500
        },
        13: {
            'easy': 1100,
            'medium': 2200,
            'hard': 3400,
            'deadly': 5100
        },
        14: {
            'easy': 1250,
            'medium': 2500,
            'hard': 3800,
            'deadly': 5700
        },
        15: {
            'easy': 1400,
            'medium': 2800,
            'hard': 4300,
            'deadly': 6400
        },
        16: {
            'easy': 1600,
            'medium': 3200,
            'hard': 4800,
            'deadly': 7200
        },
        17: {
            'easy': 2000,
            'medium': 3900,
            'hard': 5900,
            'deadly': 8800
        },
        18: {
            'easy': 2100,
            'medium': 4200,
            'hard': 6300,
            'deadly': 9500
        },
        19: {
            'easy': 2400,
            'medium': 4900,
            'hard': 7300,
            'deadly': 10900
        },
        20: {
            'easy': 2800,
            'medium': 5700,
            'hard': 8500,
            'deadly': 12700
        }
    }

}

export { Party };
