import Controller from "./controller.js";
import View from "./view.js";
import Model from "./model.js";

document.addEventListener("DOMContentLoaded", () => {
    const controller = new Controller(new View(), new Model());
    controller.init();
});