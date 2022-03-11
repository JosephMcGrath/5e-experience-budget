import { AdventureDay } from "../calculator/adventure_day.js"
import Adv from "./adventure-day.js"

function makeBlankAdventureDay() {
    let theDay = new AdventureDay();
    theDay.party.addPlayerGroup(1, 4);
    let theEncounter = theDay.addEncounter("");
    theEncounter.addMonster("", "1", 1);
    return theDay;
}

export default {
    data() {
        return {
            theDay: makeBlankAdventureDay(),
            uploadButtonID: "upload-adventure-day",
        }
    },
    components: {
        Adv
    },
    methods: {
        downloadDay() {
            let downloader = document.createElement("a");
            downloader.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(this.theDay.data))}`);
            downloader.setAttribute("download", "adventure_day.json");
            downloader.click();
        },
        async uploadDay() {
            let uploadButton = document.getElementById(this.uploadButtonID);

            if (uploadButton.files.length != 1) {
                throw "Invalid upload data.";
            }

            let reader = new FileReader();
            reader.onload = (e) => {
                let data = JSON.parse(e.target.result)

                this.theDay = AdventureDay.fromObject(data);

                uploadButton.value = null;
            };
            reader.readAsText(uploadButton.files[0]);

        },
        reset() {
            this.theDay = makeBlankAdventureDay();
        },
    },
    template: `
    <div class = "container border border-light border-3 rounded-3">
        <h1>
            Adventure Day Experience Calculator
        </h1>

        <p>
            This is based off of the guidance on pages 82 to 84 of the 5th edition Dungeons
            & Dragons <a href="https://dnd.wizards.com/products/dungeon-masters-guide">Dungeon Master's Guide</a>.
        </p>

        <adv :calculator="theDay"></adv>

        <div class="row my-2">
            <button @click="downloadDay" class="btn btn-secondary col mx-1">Download</button>

            <input v-bind:id="uploadButtonID" @change="uploadDay" type="file" class="form-control btn btn-info col mx-1" />

            <button @click="reset" class="btn btn-warning col mx-1">Clear</button>
        </div>
    </div>
    `
};