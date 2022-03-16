import { Party } from "../calculator/party.js";

export default {
    props: {
        partyData: Party,
    },
    data() {
        return {
            "levels": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            "counts": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        }
    },
    methods: {
        addPlayerGroup() {
            this.partyData.addPlayerGroup(1, 1);
        },
        removePlayerGroup() {
            this.partyData.removePlayerGroup();
        },
    },
    template: `
    <h2>Party</h2>

    <div class="container">
        <div v-for="(theGroup, theIndex) in partyData.playerGroups" class="row mb-2 party-player-level-input">
            <span class="col">Players:</span>
            <select v-model="theGroup.count" class="form-select col count-input">
                <option v-for="theCount in counts" v-bind:value="theCount">
                    {{theCount}}
                </option>
            </select>
            <span class="col">Level:</span>
            <select v-model="theGroup.level" class="form-select col count-input">
                <option v-for="theLevel in levels" v-bind:value="theLevel">
                    {{theLevel}}
                </option>
            </select>
            <button @click="removePlayerGroup(theIndex)" class="btn btn-danger col mx-2">-Level</button>
        </div>
    </div>

    <button @click="addPlayerGroup" class="btn btn-success">+Level</button>
    
    <button data-bs-toggle="collapse" data-bs-target="#partyDetails" type="button" class="btn btn-secondary btn-sm mx-2">Details</button>
    <div class="collapse" id="partyDetails">
        <table class="table text-light">
            <thead>
                <th>Encounter Difficulty</th>
                <th>Experience</th>
            </thead>
            <tr v-for="(theDifficulty, theXP) in partyData.experienceThresholds">
                <td>{{theXP}}</td>
                <td>{{theDifficulty}}</td>
            </tr>
        </table>
    </div>
    `
};