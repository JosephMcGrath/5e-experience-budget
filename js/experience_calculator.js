import { AdventureDayRenderer } from "./render/adventure_day_renderer.js"

/**
 * 5th Edition Dungeons & Dragons experience calculator.
 */
class ExperienceCalculator {

    /** @type{AdventureDayRenderer} */
    adventureDay;

    storageName = "experience-calculator-save";

    button_spacing = "mx-1";
    section_spacing = "my-2";

    /**
     * @param {String} target_id The ID of the HTML element to overwrite with the calculator.
     */
    constructor(target_id) {
        this.id = target_id;
        this.adventureDay = new AdventureDayRenderer();

        this.element = this.makeParentElement();
        this.header = this.makeHeader();
        this.element.appendChild(this.header);

        this.main = document.createElement("div");
        this.main.classList.add(this.section_spacing);
        this.element.appendChild(this.main);

        this.footer = this.makeFooter();
        this.element.appendChild(this.footer);
    }


    /**
     * Clear and create the target div.
     * @returns {HTMLElement}
     */
    makeParentElement() {
        let element = document.getElementById(this.id);
        element.innerHTML = "";
        element.className = "";
        element.classList.add("container");
        element.classList.add("border");
        element.classList.add("border-light");
        element.classList.add("border-3");
        element.classList.add("rounded-3");
        return element;
    }


    /**
     * Create DOM elements for the header (title).
     * @returns {HTMLElement}
     */
    makeHeader() {
        let element = document.createElement("div");
        element.classList.add(this.section_spacing);
        let title = document.createElement("h1");
        title.textContent = "Adventure Day Experience Calculator";
        element.appendChild(title);
        return element;
    }


    /**
     * Create DOM elements for the footer (buttons).
     * @returns {HTMLElement}
     */
    makeFooter() {
        let element = document.createElement("div");
        element.classList.add(this.section_spacing, "row");

        let downloadButton = document.createElement("button");
        downloadButton.textContent = "Download";
        downloadButton.addEventListener("click", () => this.download());
        downloadButton.classList.add("btn", "btn-secondary", "col", this.button_spacing);
        element.appendChild(downloadButton);

        this.uploadButton = document.createElement("input");
        this.uploadButton.type = "file";
        this.uploadButton.addEventListener("change", () => this.upload());
        this.uploadButton.classList.add("form-control", "btn-info", "col", this.button_spacing);
        element.appendChild(this.uploadButton);

        let resetButton = document.createElement("button");
        resetButton.textContent = "Clear";
        resetButton.addEventListener("click", () => this.makeBlank());
        resetButton.classList.add("btn", "btn-warning", "col", this.button_spacing);
        element.appendChild(resetButton);

        return element;
    }


    /**
     * Start up the calculator.
     */
    init() {
        let previous = localStorage.getItem(this.storageName);
        if (previous === null) {
            this.makeBlank();
        } else {
            this.data = JSON.parse(previous);
        }
    }


    /**
     * Empty the calculator and create a blank copy.
     */
    makeBlank() {
        this.adventureDay = new AdventureDayRenderer();
        this.adventureDay.registerCallback(() => this.save())

        this.adventureDay.party.addPlayerLevel();
        let theEncounter = this.adventureDay.addEncounter();
        theEncounter.addMonster();

        this.main.innerHTML = "";
        this.main.appendChild(this.adventureDay.element);

        this.save();
    }


    /**
     * Download a JSON copy of the current adventure day.
     */
    download() {
        let downloader = document.createElement("a");
        downloader.setAttribute("href", `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(this.data))}`);
        downloader.setAttribute("download", "adventure_day.json");
        downloader.click();
    }


    /**
     * Load an adventure day from the file upload input.
     */
    async upload() {
        if (this.uploadButton.files.length != 1) {
            throw "Invalid upload data.";
        }

        let reader = new FileReader();
        reader.onload = (e) => {
            this.data = JSON.parse(e.target.result);
            this.uploadButton.value = null;
        };
        reader.readAsText(this.uploadButton.files[0]);

    }


    save() {
        let currentData = JSON.stringify(this.data);
        localStorage.setItem(this.storageName, currentData);
    }


    /**
     * Get the contents of the calculator as a simple object.
     * @returns {Object}
     */
    get data() {
        let output = {
            "meta": {
                "version": "1.0",
                "exported": new Date().toISOString(),
            },
            "party": this.adventureDay.party.party.players,
            "encounters": [],
        };

        for (let theEncounter of this.adventureDay.encounters) {
            console.log(theEncounter.encounter);
            let encounterData = {
                "name": theEncounter.encounter.name,
                "monsters": [],
            };

            for (let theMonster of theEncounter.encounter.monsters) {
                encounterData["monsters"].push({
                    "name": theMonster.displayName,
                    "cr": theMonster.challengeRating,
                    "count": theMonster.count,
                });
            }

            output["encounters"].push(encounterData);
        }

        console.debug("Adventure Day Export:", output);
        return output;
    }


    /**
     * Set the contents of the calculator from a simple object.
     * @param {Object} dataIn
     */
    set data(dataIn) {
        let loaded = new AdventureDayRenderer();
        loaded.registerCallback(() => this.save())

        for (const [level, count] of Object.entries(dataIn["party"])) {
            loaded.party.addPlayerLevel(level, count);
        }

        for (const encounterData of dataIn["encounters"]) {
            let theEncounter = loaded.addEncounter();
            theEncounter.name = encounterData["name"];
            for (const monsterData of encounterData["monsters"]) {
                let theMonster = theEncounter.addMonster();
                theMonster.name = monsterData["name"];
                theMonster.challengeRating = monsterData["cr"];
                theMonster.count = monsterData["count"];
            }
        }

        loaded.update();

        this.main.innerHTML = "";
        this.adventureDay = loaded;
        this.main.appendChild(this.adventureDay.element);
    }

}

export { ExperienceCalculator };
