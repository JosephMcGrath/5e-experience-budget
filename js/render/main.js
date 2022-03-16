import { AdventureDay } from "../calculator/adventure_day.js"
import Adv from "./adventure-day.js"

const localStorageName = "adventure_day";

/**
 * Make a default blank adventure day.
 * @returns {AdventureDay}
 */
function makeBlankAdventureDay() {
    let theDay = new AdventureDay();
    theDay.party.addPlayerGroup(1, 4);
    let theEncounter = theDay.addEncounter("");
    theEncounter.addMonster("", "1", 1);
    return theDay;
}


/**
 * Try and load the adventure day from 
 * @returns {AdventureDay}
 */
function initAdventureDay() {
    let previous = localStorage.getItem(localStorageName);
    if (previous === null) {
        return makeBlankAdventureDay();
    } else {
        try {
            return AdventureDay.fromObject(JSON.parse(previous));
        } catch (error) {
            return makeBlankAdventureDay();
        }
    }
}



export default {
    data() {
        return {
            theDay: initAdventureDay(),
            uploadButtonID: "upload-adventure-day",
            localStorageName: localStorageName,
        }
    },
    watch: {
        theDay: {
            handler() {
                let data = JSON.stringify(this.theDay.data)
                localStorage.setItem(this.localStorageName, data);
            },
            deep: true,
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
            You can read that for more guidance about how to actually use the figures this
            tool puts out. I just found it frustrating to try manually calculating all the
            stats involved.
        </p>

        <adv :calculator="theDay"></adv>

        <div class="row my-2">
            <button @click="downloadDay" class="btn btn-primary col mx-1">Download</button>

            <input v-bind:id="uploadButtonID" @change="uploadDay" type="file" class="form-control btn btn-info col mx-1" />

            <button @click="reset" class="btn btn-warning col mx-1">Clear</button>
        </div>
    </div>
    `
};