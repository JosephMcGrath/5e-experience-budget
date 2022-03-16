import { createApp } from "../vue/vue.esm-browser.prod.js";

import Calculator from "./render/main.js"

function makeAdventureDayCalculator(target) {

    let test = createApp({
        components: {
            Calculator
        }
    });

    test.mount(target);
}

export { makeAdventureDayCalculator };