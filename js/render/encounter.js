import { Encounter } from "../calculator/encounter.js";
import { AdventureDay } from "../calculator/adventure_day.js"
import Monster from "./monster.js";

export default {
    props: {
        encounterData: Encounter,
        adventureDayData: AdventureDay,
        index: Number,
    },
    computed: {
        placeholderName() {
            return `Encounter ${this.index + 1}`;
        },
        detailsID() {
            return `encounter-${this.index}-details`
        },
        detailsIDRef() {
            return `#${this.detailsID}`
        },
        displayAverageCR() {
            return Math.round(10 * this.encounterData.averageCR) / 10;
        },
    },
    methods: {
        addMonster() {
            this.encounterData.addMonster("", "1", 1);
        },
        removeSelf() {
            this.adventureDayData.removeEncounter(this.index);
        }
    },
    components: { Monster },
    template: `
    <div class="container border border-light border-2 rounded-3 my-2 p-2">
        Encounter: <input v-model=encounterData.name v-bind:placeholder="placeholderName" class="form-text">
        <div>
        Total experience: {{encounterData.totalModifiedExperience}} modified XP (<b>{{encounterData.difficultyRating}}</b>).
        </div>

        <div class="container">
            <button @click="addMonster()" class="btn btn-success px">+Monster</button>
            <monster
                v-for="(theMonster, theIndex) in encounterData.monsters"
                :monsterData="theMonster" :encounterData="encounterData" :index="theIndex"
            ></monster>
        </div>

        <button @click="removeSelf" class="btn btn-danger">-Encounter</button>

        <button data-bs-toggle="collapse" v-bind:data-bs-target="detailsIDRef" type="button" class="btn btn-info mx-2">Details</button>
        <div class="collapse" v-bind:id="detailsID">
            <ul>
                <li>Unmodified experience: {{encounterData.totalExperience}}xp</li>
                <li>Average CR: {{displayAverageCR}}</li>
                <li>Total monsters: {{encounterData.monsterCount}}</li>
                <li>Difficulty multiplier: x{{encounterData.difficultyMultiplier}}</li>
                <li>Modified experience: {{encounterData.totalModifiedExperience}}xp</li>
            </ul>
        </div>
    </div>
    `,
}
