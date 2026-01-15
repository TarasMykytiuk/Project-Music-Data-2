export default class View {
    #elements
    constructor() {
        this.#elements = {
            usrSelect: document.getElementById("user_select")
        }
    }

    addOptions(values) {
        const select = this.#elements.usrSelect;
        values.forEach(value => {
            const option = document.createElement("option");
            option.value = value;
            option.innerText = value;
            select.appendChild(option);
        });
    }

    bindUsrSelection(handler) {
        this.#elements.usrSelect.addEventListener("change", () => {
            this.#elements.usrSelect.options[0].disabled = true;
            this.#elements.usrSelect.options[0].hidden = true;
            const usrId = this.#elements.usrSelect.value;
            handler(usrId);
        });
    }
}