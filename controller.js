export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init() {
        console.log("Model: " + this.model);
        console.log("View: " + this.view);
    }
}