import { Monster } from "./monster.js"
import { Party } from "./party.js"

class Encounter {

    /**Multipliers for this many or more monsters in the encounter. */
    monsterDifficultyMultiplier = {
        0: 0.5,
        1: 1,
        2: 1.5,
        3: 2,
        7: 2.5,
        11: 3,
        15: 4
    }

    /**
     * @param {string} name
     * @param {Party} party
     */
    constructor(name, party) {
        this.displayName = name;
        this.party = party;
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
        this.displayName = displayName.trim();
        console.log(this.displayName);
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
     * @param {Monster} toRemove
     */
    removeMonster(toRemove) {
        for (let theMonster in this.monsters) {
            if (this.monsters[theMonster] === toRemove) {
                this.monsters.splice(theMonster, 1);
            }
        }
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
        for (const key in this.monsterDifficultyMultiplier) {
            const monsterThreshold = parseInt(key);
            if (monsterThreshold > monsterCount) {
                break;
            }
            multiplier = this.monsterDifficultyMultiplier[key];
        }
        return multiplier;
    }

    /**
     * @returns {Number} Total count of monsters in this encounter.
     */
    get monsterCount() {
        let count = 0;
        for (const monsterGroup of this.monsters) {
            count += monsterGroup.count;
        }
        return count;
    }


    /**
     * @returns {String} The difficulty description of this encounter.
     */
    get difficultyRating() {
        const experience = this.totalModifiedExperience;
        const thresholds = this.party.experienceThresholds;
        let output = "Effortless";
        for (const difficulty in thresholds) {
            if (thresholds[difficulty] > experience) {
                break;
            }
            output = difficulty;
        }
        return output;
    }
}

export { Encounter };
