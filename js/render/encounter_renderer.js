import { Encounter } from "../calculator/encounter.js"
import { MonsterRenderer } from "./monster_renderer.js"
import { AdventureDayRenderer } from "./adventure_day_renderer.js"
import { Monster } from "../calculator/monster.js";


class EncounterRenderer {

    /**
     * @param {Encounter} encounter 
     * @param {AdventureDayRenderer} parent
     */
    constructor(encounter, parent) {
        this.encounter = encounter;
        this.parent = parent;

        this.buildHTML();
    }


    get name() {
        return this.encounter.name;
    }

    set name(newName) {
        this.encounter.name = newName;

        if (newName !== this.nameInput.value) {
            this.nameInput.value = newName;
        }
    }


    /**
     * Build the HTML for this encounter.
     * @returns ChildNode
     */
    buildHTML() {
        this.element = document.createElement("div");
        this.element.classList.add(
            "container",
            "border",
            "border-light",
            "border-2",
            "rounded-3",
            "my-2",
            "p-2",
        );
        this.element.insertAdjacentText("afterbegin", "Encounter: ");

        this.nameInput = document.createElement("input");
        this.nameInput.classList.add("form-text");
        this.nameInput.type = "text";
        this.nameInput.value = this.encounter.displayName;
        this.nameInput.addEventListener("keyup", _ => { this.name = this.nameInput.value });
        this.element.appendChild(this.nameInput);

        let newMonsterButton = document.createElement("button");
        newMonsterButton.addEventListener("click", _ => { this.addMonster() });
        newMonsterButton.textContent = "+Monster";
        newMonsterButton.classList.add("btn", "btn-success", "px");
        this.element.appendChild(newMonsterButton);

        let header = document.createElement("div");
        header.insertAdjacentText("afterbegin", "Total experience: ");
        this.totalExperience = document.createElement("span");
        this.totalExperienceText = "0";
        header.appendChild(this.totalExperience);
        header.insertAdjacentText("beforeend", " XP, modified experience: ");
        this.modifiedExperience = document.createElement("span");
        this.modifiedExperienceText = "0";
        header.appendChild(this.modifiedExperience);
        header.insertAdjacentText("beforeend", " XP.");

        header.appendChild(document.createElement("br"));
        this.difficultyRating = document.createElement("span");
        this.difficultyRatingText = "";
        header.appendChild(this.difficultyRating);
        header.insertAdjacentText("beforeend", " ");

        let removeButton = document.createElement("button");
        removeButton.textContent = "-Encounter";
        removeButton.classList.add("btn", "btn-danger");
        removeButton.addEventListener("click", (e) => {
            this.delete();
        });
        this.element.appendChild(removeButton);

        this.element.appendChild(header);

        this.monsterContainer = document.createElement("div");
        this.element.appendChild(this.monsterContainer);
        this.monsterContainer.classList.add("container", "p2");
    }


    addMonster() {
        let monsterName = `Monster ${this.encounter.monsters.length + 1}`;
        let monster = this.encounter.addMonster(monsterName, 0, 1);

        let renderer = new MonsterRenderer(monster, this);
        this.monsterContainer.appendChild(renderer.element);
        this.triggerUpdate();
        return renderer;
    }


    /**
     * @param {Monster} toRemove
     */
    removeMonster(toRemove) {
        this.encounter.removeMonster(toRemove);
        this.triggerUpdate();
    }


    update() {
        this.totalExperienceText = this.encounter.totalExperience;
        this.modifiedExperienceText = this.encounter.totalModifiedExperience;
        this.difficultyRatingText = this.encounter.difficultyRating;
    }


    triggerUpdate() {
        this.parent.update();
    }


    delete() {
        this.parent.removeEncounter(this.encounter);
        this.element.remove();
    }


    get totalExperienceText() {
        return this.totalExperience.textContent;
    }


    set totalExperienceText(text) {
        this.totalExperience.textContent = text;
    }


    get modifiedExperienceText() {
        return this.modifiedExperience.textContent;
    }


    set modifiedExperienceText(text) {
        this.modifiedExperience.textContent = text;
    }


    get difficultyRatingText() {
        return this.difficultyRating.textContent;
    }


    set difficultyRatingText(text) {
        this.difficultyRating.textContent = text;
    }
}

export { EncounterRenderer };
