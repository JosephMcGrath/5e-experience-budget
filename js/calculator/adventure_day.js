import { Encounter } from "./encounter.js"
import { Party } from "./party.js"

class AdventureDay {
    constructor() {
        this.party = new Party();
        /** @type {Array<Encounter>} */
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
     * @param {Number} index
     */
    removeEncounter(index) {
        this.encounters.splice(index, 1);
    }

    get experienceBudget() {
        let budget = 0;
        const players = this.party.playersAtLevel;
        for (const level in players) {
            budget += this.adventuringDayExperience[level] * players[level];
        }
        return budget;
    }

    get totalExperience() {
        let total = 0;
        for (const theEncounter of this.encounters) {
            total += theEncounter.totalExperience;
        }
        return total;
    }

    get remainingBudget() {
        return this.experienceBudget - this.totalExperience;
    }

    get data() {
        let output = {
            "meta": {
                "version": "2.0",
                "exported": new Date().toISOString(),
            },
            "party": this.party.playerGroups,
            "encounters": [],
        };

        for (let theEncounter of this.encounters) {
            let encounterData = {
                "name": theEncounter.name,
                "monsters": [],
            };

            for (let theMonster of theEncounter.monsters) {
                encounterData["monsters"].push({
                    "name": theMonster.displayName,
                    "cr": theMonster.challengeRating,
                    "count": theMonster.count,
                });
            }

            output["encounters"].push(encounterData);
        }

        return output;
    }

    static fromObject(data) {
        let theDay = new AdventureDay();

        for (const theGroup of data.party) {
            theDay.party.addPlayerGroup(theGroup.level, theGroup.count);
        }

        for (const encounterData of data.encounters) {
            let theEncounter = theDay.addEncounter(name = encounterData.name);
            for (const monsterData of encounterData.monsters) {
                let theMonster = theEncounter.addMonster(
                    monsterData.name,
                    monsterData.cr,
                    monsterData.count,
                );
            }
        }

        return theDay;
    }
}

export { AdventureDay };
