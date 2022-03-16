import { Monster } from "./monster.js"
import { Party } from "./party.js"

class Encounter {

    /**Multipliers for this many or more monsters in the encounter. */
    monsterDifficultyMultiplier = {
        0: { monsterCount: 0, multiplier: 0.5 },
        1: { monsterCount: 1, multiplier: 1 },
        2: { monsterCount: 2, multiplier: 1.5 },
        3: { monsterCount: 3, multiplier: 2 },
        4: { monsterCount: 7, multiplier: 2.5 },
        5: { monsterCount: 11, multiplier: 3 },
        6: { monsterCount: 15, multiplier: 4 },
    }

    /**
     * @param {string} name
     * @param {Party} party
     */
    constructor(name, party) {
        this.displayName = name;
        this.party = party;
        /** @type {Array<Monster>} */
        this.monsters = [];
    }


    /**
     * @returns {String}
     */
    get name() {
        return this.displayName;
    }


    /**
     * @param {String}
     */
    set name(displayName) {
        this.displayName = displayName;
    }


    /**
     * @param {String} name 
     * @param {String} challengeRating 
     * @param {Number} count 
     * @returns {Monster}
     */
    addMonster(name, challengeRating, count) {
        let newMonster = new Monster(name, challengeRating, count);
        this.monsters.push(newMonster);
        return newMonster;
    }


    /**
     * @param {Number} index
     */
    removeMonster(index) {
        this.monsters.splice(index, 1);
    }


    /**
     * @returns {Number}
     */
    get totalExperience() {
        let total = 0;
        for (let theMonster of this.monsters) {
            total += theMonster.experience;
        }
        return total;
    }


    /**
     * @returns {Number}
     */
    get totalModifiedExperience() {
        return this.totalExperience * this.difficultyMultiplier;
    }


    /**
     * @returns {Number} The multiplier for number of monsters for this encounter.
     */
    get difficultyMultiplier() {
        let multiplier = 1;
        const monsterCount = this.monsterCount;
        let key = 0;
        for (key in this.monsterDifficultyMultiplier) {
            const data = this.monsterDifficultyMultiplier[key];
            if (data.monsterCount > monsterCount) {
                key = parseInt(key);
                break;
            }
        }

        if (this.party.totalPlayers < 3 & key < 6) {
            key += 1;
        } else if (this.party.totalPlayers >= 6 & key > 0) {
            key -= 1;
        }
        multiplier = this.monsterDifficultyMultiplier[key].multiplier;

        return multiplier;
    }

    /**
     * @returns {Number} Total count of monsters in this encounter .
     */
    get monsterCount() {
        let count = 0;
        let averageCR = this.averageCR;
        for (const monsterGroup of this.monsters) {
            if (monsterGroup.numericCR >= (averageCR - 2)) {
                count += monsterGroup.count;
            }
        }
        return count;
    }


    /**
     * @returns {Number} Average experience of monsters in the encounter.
     * 
     * Used to resolve this part of step 4: 'don't count any monsters whose
     * challenge rating is significantly below the average challenge rating of
     * the other monsters in the group'
     */
    get averageCR() {
        let total = 0;
        let count = 0;
        for (const monsterGroup of this.monsters) {
            total += monsterGroup.numericCR * monsterGroup.count;
            count += monsterGroup.count;
        }
        if (count == 0) {
            return 0;
        }
        return total / count;
    }


    /**
     * @returns {Object<String, String>} The difficulty description of this encounter.
     */
    get difficultyRating() {
        const experience = this.totalModifiedExperience;
        const thresholds = this.party.experienceThresholds;
        let theRating = "effortless";

        for (const difficulty in thresholds) {
            if (thresholds[difficulty] > experience) {
                break;
            }
            theRating = difficulty;
        }

        let output = {
            "difficulty": theRating,
            "%": 0,
        }

        switch (theRating) {
            case "effortless":
                output["difficulty"] = "Effortless";
                output["%"] = experience / thresholds["easy"];
                break;
            case "easy":
                output["difficulty"] = "Easy";
                output["%"] = (experience - thresholds["easy"]) / (thresholds["medium"] - thresholds["easy"]);
                break;
            case "medium":
                output["difficulty"] = "Medium";
                output["%"] = (experience - thresholds["medium"]) / (thresholds["hard"] - thresholds["medium"]);
                break;
            case "hard":
                output["difficulty"] = "Hard";
                output["%"] = (experience - thresholds["hard"]) / (thresholds["deadly"] - thresholds["hard"]);
                break;
            case "deadly":
                output["difficulty"] = "Deadly";
                output["%"] = experience / thresholds["deadly"];
                break;

        }

        return output;
    }

}

export { Encounter };
