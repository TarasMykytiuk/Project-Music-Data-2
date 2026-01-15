export default class Model {
    #userIds
    #currentUsrId
    constructor() {
        this.#userIds = ["1", "2", "3", "4"];
        this.#currentUsrId = "";
    }

    setCurrentUsrId(usrId) {
        this.#currentUsrId = usrId;
        console.log("Current user is: " + usrId);
    }

    getCurrentUsrId() {
        return this.#currentUsrId;
    }

    getUserIds() { return this.#userIds }
}