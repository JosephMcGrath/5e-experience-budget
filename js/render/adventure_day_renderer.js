import { AdventureDay } from "../calculator/adventure_day.js"
import { EncounterRenderer } from "./encounter_renderer.js"
import { PartyRenderer } from "./party_renderer.js"


class AdventureDayRenderer {

    constructor() {
        this.adventureDay = new AdventureDay();

        this.encounters = [];

        this.callbacks = [];

        this.element = document.createElement("div");
        this.element.id = "my-adventure-day";
        this.element.classList.add("container");

        let header = document.createElement("div");
        header.insertAdjacentText("afterbegin", "Experience budget: ");
        this.element.appendChild(header);

        this.remainingBudget = document.createElement("span");
        this.remainingBudget.textContent = 0;
        header.appendChild(this.remainingBudget);
        header.insertAdjacentText("beforeend", " / ");

        this.totalBudget = document.createElement("span");
        this.totalBudget.textContent = 0;
        header.appendChild(this.totalBudget);
        header.insertAdjacentText("beforeend", ".");

        this.party = new PartyRenderer(this);
        this.element.appendChild(this.party.element);

        this.encounterContainer = document.createElement("div");
        this.encounterContainer.classList.add(
            "container",
            "my-2",
            "p-2",
        );

        this.element.appendChild(this.encounterContainer);
        let encounterTitle = document.createElement("h2");
        encounterTitle.textContent = "Encounters"
        this.encounterContainer.append(encounterTitle);

        let newEncounterButton = document.createElement("button");
        newEncounterButton.textContent = "+Encounter";
        newEncounterButton.classList.add("btn", "btn-success");
        newEncounterButton.addEventListener("click", () => {
            let theEncounter = this.addEncounter();
            theEncounter.addMonster();
        });
        this.encounterContainer.appendChild(newEncounterButton);

        this.update();
    }

    /**
     * Add a callback function to be called after updates.
     * @type {Function}
     */
    registerCallback(callback) {
        this.callbacks.push(callback);
    }


    addEncounter() {
        let encounterNumber = this.adventureDay.encounters.length + 1;
        let encounter = this.adventureDay.addEncounter(`Encounter ${encounterNumber}`);
        let renderer = new EncounterRenderer(encounter, this);

        this.encounterContainer.appendChild(renderer.element);
        this.encounters.push(renderer);

        return renderer;
    }


    removeEncounter(toRemove) {
        this.adventureDay.removeEncounter(toRemove);
        this.update();
    }


    update() {
        console.log("Updating UI.");

        this.party.update();

        for (let theEncounter of this.encounters) {
            theEncounter.update();
        }

        this.totalBudget.textContent = this.adventureDay.experienceBudget;
        this.remainingBudget.textContent = this.adventureDay.remainingBudget;

        for (let theCallback of this.callbacks) {
            theCallback();
        }
    }
}

export { AdventureDayRenderer };
