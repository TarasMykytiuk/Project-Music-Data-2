import Controller from "./controller.js";
import View from "./view.js";
import DataModel from "./dataModel.js";
import Model from "./model.js";

document.addEventListener("DOMContentLoaded", () => {
    const controller = new Controller(new View(), new DataModel(), new Model());
    controller.init();
});