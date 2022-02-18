import { Monster } from "../calculator/monster.js"
import { EncounterRenderer } from "./encounter_renderer.js"

class MonsterRenderer {

    /**
     * @param {Monster} monster 
     * @param {EncounterRenderer} parent 
     */
    constructor(monster, parent) {
        this.monster = monster;
        this.parent = parent;

        this.element = this.buildHTML();
    }


    get name() {
        return this.monster.displayName;
    }

    set name(nameValue) {
        this.monster.displayName = nameValue;

        if (nameValue !== this.nameInput.value) {
            this.nameInput.value = nameValue;
        }
    }

    get challengeRating() {
        return this.monster.challengeRating;
    }

    set challengeRating(newRating) {
        this.monster.challengeRating = newRating;
        this.experienceText = this.monster.experience;

        if (newRating !== this.monsterCRInput.value) {
            this.monsterCRInput.value = newRating;
        }
    }

    get count() {
        return this.monster.count;
    }

    set count(newCount) {
        this.monster.count = newCount;
        this.experienceText = this.monster.experience;

        if (newCount !== this.monsterCount.value) {
            this.monsterCount.value = newCount;
        }
    }


    /**
     * Build the HTML for this monster.
     * @returns ChildNode
     */
    buildHTML() {

        let element = document.createElement("div");
        element.classList.add("monster", "row");

        let title = document.createElement("b");
        title.textContent = "Name: "
        element.appendChild(title);


        this.nameInput = document.createElement("input");
        this.nameInput.type = "text";
        this.nameInput.classList.add("form-text", "col");
        this.nameInput.value = this.monster.displayName;
        this.nameInput.addEventListener("keyup", _ => {
            this.monster.name = this.nameInput.value
        });
        element.appendChild(this.nameInput);

        this.monsterCRInput = document.createElement("select");
        this.monsterCRInput.classList.add("form-select", "col");
        for (const theCR in this.monster.challengeRatingExperience) {
            let entry = document.createElement("option");
            entry.value = theCR;
            entry.textContent = theCR;
            this.monsterCRInput.appendChild(entry);
        }
        this.monsterCRInput.addEventListener("change", (e) => {
            this.triggerUpdate();
        })
        element.insertAdjacentText("beforeend", " CR");
        element.appendChild(this.monsterCRInput);

        this.monsterCount = document.createElement("input");
        this.monsterCount.classList.add("form-number", "col");
        this.monsterCount.type = "number";
        this.monsterCount.min = 0;
        this.monsterCount.value = 1;
        this.monsterCount.step = 1;
        this.monsterCount.addEventListener("change", (e) => {
            this.triggerUpdate();
        })
        element.insertAdjacentText("beforeend", " x ");
        element.appendChild(this.monsterCount);

        let xpDescription = document.createElement("span");
        xpDescription.classList.add("col");
        element.appendChild(xpDescription);
        this.xpText = document.createElement("span");
        this.experienceText = "0";
        xpDescription.insertAdjacentText("beforeend", " total ");
        xpDescription.appendChild(this.xpText);
        xpDescription.insertAdjacentText("beforeend", "XP.");

        let removeButton = document.createElement("button");
        removeButton.textContent = "-Monster";
        removeButton.classList.add("btn", "btn-danger", "col");
        removeButton.addEventListener("click", (e) => {
            this.delete();
        });
        element.appendChild(removeButton);

        this.refreshMonster();

        return element;
    }


    delete() {
        this.element.remove();
        this.parent.removeMonster(this.monster);
    }


    refreshMonster() {
        this.monster.challengeRating = this.monsterCRInput.value;
        this.monster.count = parseInt(this.monsterCount.value);
        this.experienceText = this.monster.experience;
    }


    /**
     * @returns {String}
     */
    get experienceText() {
        return this.xpText.textContent;
    }

    /**
     * @param {String} text
     */
    set experienceText(text) {
        this.xpText.textContent = text;
    }


    triggerUpdate() {
        this.refreshMonster();
        this.parent.triggerUpdate();
    }
}

export { MonsterRenderer };
