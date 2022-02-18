import { Encounter } from "./encounter.js"
import { Party } from "./party.js"

class AdventureDay {
    constructor() {
        this.party = new Party();
        this.encounters = [];
    }


    /** Total XP budget per character. */
    adventuringDayExperience = {
        1: 300,
        2: 600,
        3: 1200,
        4: 1700,
        5: 3500,
        6: 4000,
        7: 5000,
        8: 6000,
        9: 7500,
        10: 9000,
        11: 10500,
        12: 11500,
        13: 13500,
        14: 15000,
        15: 18000,
        16: 20000,
        17: 25000,
        18: 27000,
        19: 30000,
        20: 40000,
    };


    addEncounter(name) {
        let newEncounter = new Encounter(name, this.party);
        this.encounters.push(newEncounter);
        return newEncounter;
    }

    /**
     * @param {Encounter} toRemove
     */
    removeEncounter(toRemove) {
        for (let theEncounter in this.encounters) {
            if (this.encounters[theEncounter] === toRemove) {
                this.encounters.splice(theEncounter, 1);
            }
        }
    }

    get experienceBudget() {
        let budget = 0;
        for (const level in this.party.players) {
            budget += this.adventuringDayExperience[level] * this.party.players[level];
        }
        return budget;
    }

    get totalExperience() {
        let total = 0;
        for (const theEncounter of this.encounters) {
            total += theEncounter.totalModifiedExperience;
        }
        return total;
    }

    get remainingBudget() {
        return this.experienceBudget - this.totalExperience;
    }
}

export { AdventureDay };
