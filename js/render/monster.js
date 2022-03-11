import { Encounter } from "../calculator/encounter.js";
import { Monster } from "../calculator/monster.js";

export default {
    props: {
        monsterData: Monster,
        encounterData: Encounter,
        index: Number,
    },
    computed: {
        placeholderName() {
            return `Monster ${this.index + 1}`;
        },
        monsterCRs() {
            let crValues = Object.keys(this.monsterData.challengeRatingExperience)
            crValues = crValues.sort((e1, e2) => {
                e1 = this.monsterData.challengeRatingExperience[e1];
                e2 = this.monsterData.challengeRatingExperience[e2];

                return e1 >= e2;
            });

            return crValues;
        },
    },
    data() {
        return {
            "counts": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        }
    },
    methods: {
        removeSelf() {
            this.encounterData.removeMonster(this.index);
        },
    },
    template: `
        <div class="row">
            <b>Name: </b>
            <input v-model="monsterData.displayName" type="text" class="form-text col" v-bind:placeholder="placeholderName">

            CR
            <select v-model="monsterData.challengeRating" class="form-select col count-input">
                <option v-for="theCR in monsterCRs" v-bind:value="theCR">
                    {{theCR}}
                </option>
            </select>
            x
            <select v-model="monsterData.count" class="form-select col count-input">
                <option v-for="theCount in counts" v-bind:value="theCount">
                    {{theCount}}
                </option>
            </select>

            <span class="col">
                {{monsterData.experience}} XP
            </span>

            <button @click="removeSelf" class="col btn btn-danger">-Monster</button>
        </div>
    `,
};
