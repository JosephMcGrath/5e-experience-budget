import { AdventureDay } from "../calculator/adventure_day.js"
import TheParty from "./party.js"
import Encounter from "./encounter.js"

export default {
    props: {
        calculator: AdventureDay,
    },
    components: {
        TheParty,
        Encounter,
    },
    methods: {
        addEncounter() {
            let theEncounter = this.calculator.addEncounter("");
            theEncounter.addMonster("", "1", 1);
        }
    },
    template: `
    <div class="container">

        <div>
        Experience budget: {{calculator.remainingBudget}} / {{calculator.experienceBudget}}.
        </div>

        <the-party :partyData="calculator.party"></the-party>
    
        <encounter
        v-for="(theEncounter, theIndex) in calculator.encounters"
        :encounterData="theEncounter"
        :adventureDayData="calculator"
        :index="theIndex"
        ></encounter>
        
        <br>
        <button @click="addEncounter()" class="btn btn-success my-2">+Encounter</button>
    </div>
    `
}

