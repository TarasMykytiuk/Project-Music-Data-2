export default class View {
    #elements
    #questions
    constructor() {
        this.#elements = {
            usrSelect: document.getElementById("user_select"),
            usrNameDisplay: document.getElementById("usr_name_display"),
            usrTableHead: document.getElementById("usr_info_head"),
            usrTableBody: document.getElementById("usr_info_body")
        };
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

    resetTable(listenEvents, usrId) {
        this.#elements.usrTableHead.innerHTML = "";
        this.#elements.usrTableBody.innerHTML = "";
        this.#elements.usrNameDisplay.textContent = "User " + usrId;
        if (!listenEvents.length) {
            this.#elements.usrTableBody.textContent = "This user did not listened to any songs";
        } else {
            this.#elements.usrTableHead.innerHTML = "<tr><th>Questions:</th><th>Answers:</th></tr>";
        }
    }

    addQuestionRow(question, answer) {
        const row = document.createElement("tr")
        const questionCol = document.createElement("td");
        const answerCol = document.createElement("td");
        questionCol.textContent = question;
        answerCol.textContent = answer;
        row.appendChild(questionCol);
        row.appendChild(answerCol);
        this.#elements.usrTableBody.appendChild(row);
    }
}