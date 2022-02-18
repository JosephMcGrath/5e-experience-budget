import { AdventureDayRenderer } from "./adventure_day_renderer.js"

class PartyRenderer {

    /**
     * @param {AdventureDayRenderer} parent
     */
    constructor(parent) {
        this.parent = parent;
        this.party = parent.adventureDay.party;

        this.element;
        this.playerContainer;

        this.buildHTML();
    }

    /**
     * Build the HTML for this encounter.
     * @returns ChildNode
     */
    buildHTML() {

        this.element = document.createElement("div");
        this.element.classList.add(
            "my-2",
            "p-2",
        );

        let title = document.createElement("h2");
        title.textContent = "Party";
        this.element.appendChild(title);

        this.playerContainer = document.createElement("div");
        this.playerContainer.classList.add("container");
        this.element.appendChild(this.playerContainer);

        let newLevelButton = document.createElement("button");
        newLevelButton.textContent = "+Level";
        newLevelButton.addEventListener("click", (e) => {
            this.addPlayerLevel();
            this.triggerUpdate();
        });
        newLevelButton.classList.add("btn", "btn-success");
        this.element.appendChild(newLevelButton);
    }

    /**
     * Add an input for another player level.
     */
    addPlayerLevel(level = 1, count = 1) {

        var playerLevel = document.createElement("div");
        playerLevel.classList.add("row", "mb-2", "party-player-level-input");

        let label = document.createElement("span");
        label.classList.add("col");
        label.textContent = "Players:";
        playerLevel.appendChild(label);

        let countInput = document.createElement("select");
        countInput.classList.add("form-select", "col", "count-input");
        for (let i = 1; i <= 10; i++) {
            let entry = document.createElement("option");
            entry.value = i;
            entry.textContent = i;
            countInput.appendChild(entry);
        }
        countInput.value = count;
        countInput.addEventListener("change", (e) => {
            this.triggerUpdate();
        });
        playerLevel.appendChild(countInput);

        label = document.createElement("span");
        label.classList.add("col");
        label.textContent = "Level:";
        playerLevel.appendChild(label);

        let levelInput = document.createElement("select");
        levelInput.classList.add("form-select", "col", "level-input");
        for (let i = 1; i <= 20; i++) {
            let entry = document.createElement("option");
            entry.value = i;
            entry.textContent = i;
            levelInput.appendChild(entry);
        }
        levelInput.value = level;
        levelInput.addEventListener("change", (e) => {
            this.triggerUpdate();
        });
        playerLevel.appendChild(levelInput);

        let removeButton = document.createElement("button");
        removeButton.classList.add("col", "mx-3");
        removeButton.textContent = "-Level";
        removeButton.addEventListener("click", (e) => {
            playerLevel.remove();
            this.triggerUpdate();
        });
        removeButton.classList.add("btn", "btn-danger");
        playerLevel.appendChild(removeButton);

        let padding = document.createElement("span");
        padding.classList.add("col-6");
        playerLevel.appendChild(padding);

        this.playerContainer.appendChild(playerLevel);
        this.refreshPlayerCount();
    }

    /**
     * Update the underlying data structure to match the user input.
     */
    refreshPlayerCount() {
        this.party.clearPlayers();

        let players = this.element.getElementsByClassName("party-player-level-input");
        for (let thePlayer of players) {
            const playerCount = thePlayer.getElementsByClassName("count-input")[0].value;
            const playerLevel = thePlayer.getElementsByClassName("level-input")[0].value;
            this.party.addPlayer(playerLevel, playerCount);
        }
    }

    /**
     * Trigger an update of the whole UI.
     */
    triggerUpdate() {
        console.info("Update from PartyRenderer");
        this.refreshPlayerCount();
        this.parent.update();
    }

    update() {
        this.refreshPlayerCount();
    }
}

export { PartyRenderer };