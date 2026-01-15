export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init() {
        this.view.addOptions(this.model.getUserIds());
        this.view.bindUsrSelection((usrId) => this.handleUsrSelection(usrId));
    }

    handleUsrSelection(usrId) {
        this.model.setCurrentUsrId(usrId);
    }
}