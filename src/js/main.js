class ControlSystem {
    constructor() {
        this.employees = [];
        this.control_input = {
            firstname: null,
            secondname: null,
            position: null,
            salary: null,
        };
        this.control_button = {
            refresh: null,
            search: null,
            add: null,
            delete: null,
            search_responsive: null,
        };
        this.page = {
            add: null,
            background: null,
            edit: null,
            search: null,
        }
        this.addpage_input = {
            firstname: null,
            secondname: null,
            salary: null,
            position: null,
            image: null,
        };
        this.addpage_button = {
            add: null,
            back: null,
        }
        this.editpage_input = {
            firstname: null,
            secondname: null,
            salary: null,
            position: null,
            image: null,
        }
        this.editpage_button = {
            done: null,
            back: null,
        }
        this.searchpage_input = {
            firstname: null,
            secondname: null,
            salary: null,
            position: null,
            image: null,
        };
        this.searchpage_button = {
            search: null,
            back: null,
        }
    };
    addEventListeners() {
        document.addEventListener('click', (e) => {
            let temp = e.target;
            if (temp.classList.contains("card__button-delete")) {
                let newJson = [];
                for (let i = 0; i < this.employees.length; ++i) {
                    if (this.employees[i].id != temp.getAttribute('id').slice(3))
                        newJson.push(this.employees[i]);
                }
                this.employees = newJson;
                this.searchCard();
            }
            if (temp.classList.contains("card__button-edit")) {
                for (let i = 0; i < this.employees.length; ++i) {
                    if (this.employees[i].id == temp.getAttribute('id').slice(4)) {
                        this.loadCardValues(this.employees[i], i);
                    }
                }
            }
        });
        this.control_button.delete.addEventListener('click', () => {
            this.deleteAllCards();
        });
        this.control_button.refresh.addEventListener('click', () => {
            this.refreshCards();
        })
        this.control_button.search.addEventListener('click', () => {
            this.searchCard();
        });
        this.control_button.search_responsive.addEventListener('click', () => {
            this.page.search.classList.toggle("searchpage-open");
            this.page.background.classList.toggle('blackbackground');
            this.lockBody();
        })

        this.control_button.add.addEventListener('click', () => {
            this.page.add.classList.toggle("addpage-open");
            this.page.background.classList.toggle('blackbackground');
            this.lockBody();
        });


        this.addpage_button.add.addEventListener('click', () => {
            if (this.addpage_input.firstname.value &&
                this.addpage_input.secondname.value &&
                this.addpage_input.salary.value &&
                this.addpage_input.position.value &&
                this.addpage_input.image.value) {

                const obj = {
                    firstname: this.addpage_input.firstname.value.trim(),
                    secondname: this.addpage_input.secondname.value.trim(),
                    position: this.addpage_input.position.value.trim(),
                    salary: this.addpage_input.salary.value.trim(),
                    image: this.addpage_input.image.value.trim(),
                };
                if (this.employees.length) {
                    obj.id = this.employees[this.employees.length - 1].id + 1;
                } else {
                    obj.id = 0;
                }
                this.employees.push(obj);
                localStorage.setItem('employee', JSON.stringify(this.employees));
                this.resetAddPageValues();
                this.clearCards();
                this.loadAllCardsFromLocalStorage();
                this.page.add.classList.toggle("addpage-open");
                this.page.background.classList.toggle('blackbackground');
                setTimeout(() => {
                    this.lockBody();
                }, 550);
            }
        })

        this.addpage_button.back.addEventListener('click', () => {
            this.page.add.classList.toggle("addpage-open");
            setTimeout(() => {
                this.lockBody();
                this.page.background.classList.toggle('blackbackground')
            }, 550);
        });

        this.searchpage_button.search.addEventListener('click', () => {
            this.searchCard(this.searchpage_input);
            this.page.search.classList.toggle("addpage-open");
            setTimeout(() => {
                this.lockBody();
                this.page.background.classList.toggle('blackbackground')
            }, 550);
        });
        this.searchpage_button.back.addEventListener('click', () => {
            this.page.search.classList.toggle("searchpage-open");
            setTimeout(() => {
                this.lockBody();
                this.page.background.classList.toggle('blackbackground')
            }, 550);
        });

        this.editpage_button.back.addEventListener("click", () => {
            this.closeEditPage()
        });

        this.editpage_button.done.addEventListener('click', () => {
            if (this.editpage_input.firstname.value &&
                this.editpage_input.secondname.value &&
                this.editpage_input.position.value &&
                this.editpage_input.salary.value &&
                this.editpage_input.image.value) {
                let temp = this.employees[this.page.edit.getAttribute("value")];
                for (let i in this.editpage_input) {
                    temp[i] = this.editpage_input[i].value;
                }
                this.closeEditPage();
                this.refreshCards();
            }
        });
    }
    lockBody() {
        document.body.classList.toggle("disablescroll");
    }
    getElements() {
        this.cards = document.querySelector(".cards");

        this.control_input.firstname = document.getElementById("control_firstname");
        this.control_input.secondname = document.getElementById("control_secondname");
        this.control_input.position = document.getElementById("control_position");
        this.control_input.salary = document.getElementById("control_salary");

        this.searchpage_input.firstname = document.getElementById("search_firstname");
        this.searchpage_input.secondname = document.getElementById("search_secondname");
        this.searchpage_input.position = document.getElementById("search_position");
        this.searchpage_input.salary = document.getElementById("search_salary");

        this.control_button.refresh = document.getElementById("control_refresh");
        this.control_button.add = document.getElementById("control_add");
        this.control_button.search = document.getElementById("control_search");
        this.control_button.delete = document.getElementById("control_delete");
        this.control_button.search_responsive = document.getElementById("control_search-responsive");

        this.page.background = document.getElementById('background');
        this.page.add = document.getElementById('addpage');
        this.page.edit = document.getElementById("editpage");
        this.page.search = document.getElementById("searchpage");

        this.addpage_button.add = document.getElementById("addpage_add");
        this.addpage_button.back = document.getElementById("addpage_back");

        this.addpage_input.firstname = document.getElementById("addpage_firstname");
        this.addpage_input.secondname = document.getElementById("addpage_secondname");
        this.addpage_input.salary = document.getElementById("addpage_salary");
        this.addpage_input.position = document.getElementById("addpage_position");
        this.addpage_input.image = document.getElementById("addpage_image");

        this.editpage_input.firstname = document.getElementById("editpage_firstname");
        this.editpage_input.secondname = document.getElementById("editpage_secondname");
        this.editpage_input.salary = document.getElementById("editpage_salary");
        this.editpage_input.position = document.getElementById("editpage_position");
        this.editpage_input.image = document.getElementById("editpage_image");

        this.editpage_button.done = document.getElementById("editpage_edit");
        this.editpage_button.back = document.getElementById("editpage_back");

        this.searchpage_button.search = document.getElementById("searchpage__search");
        this.searchpage_button.back = document.getElementById("searchpage__back");
    }
    loadCard(par) {
        let temp = "";
        temp = `
        <div class="card" id = "card${par.id}">
            <div class="card__image" style = "background-image: url('${par.image}');"></div>
            <div class="details">
                <div class="card__field">
                    <span>Firstname</span>
                    <span id="firstname12">${par.firstname}</span>
                </div>
                <div class="card__field">
                    <span>Secondname</span>
                    <span id="secondname2">${par.secondname}</span>
                </div>
                <div class="card__field">
                    <span>Position</span>
                    <span id="position3">${par.position}</span>
                </div>
                <div class="card__field">
                    <span>Salary</span>
                    <span id="salary4">${par.salary}</span>
                </div>
            </div>
            <div class="card__buttons">
                <button type="button" class = "card__button card__button-delete" title="Delete" id = "del${par.id}"><i class="fa-solid fa-trash-can"></i></button>
                <button type="button" class = "card__button card__button-edit" title="Edit" id = "edit${par.id}"><i class="fa-solid fa-pen-to-square"></i></button>
            </div>
        </div>`
        this.cards.innerHTML += temp;
    };
    deleteAllCards() {
        if (confirm("Do you want to delete all cards ?")) {
            this.employees = [];
            this.refreshCards();
        }
    }
    createElement(par) {
        return document.createElement(par);
    }
    clearCards() {
        this.cards.innerHTML = "";
    };
    openEditPage() {
        this.lockBody();
        this.page.background.classList.toggle('blackbackground')
        this.page.edit.classList.add("editpage-open");
    };
    closeEditPage() {
        setTimeout(() => {
            this.lockBody();
            this.page.background.classList.toggle('blackbackground')
        }, 550);
        this.page.edit.classList.remove("editpage-open");
    };
    loadCardValues(data, index) {
        this.openEditPage();
        this.editpage_input.firstname.value = data.firstname;
        this.editpage_input.secondname.value = data.secondname;
        this.editpage_input.position.value = data.position;
        this.editpage_input.salary.value = data.salary;
        this.editpage_input.image.value = data.image;
        this.page.edit.setAttribute("value", index);
    }
    refreshCards() {
        localStorage.setItem('employee', JSON.stringify(this.employees));
        this.clearCards();
        this.loadAllCardsFromLocalStorage();
    }
    searchCard(par = this.control_input) {
        console.log(par);
        if (par.firstname.value ||
            par.secondname.value ||
            par.position.value ||
            par.salary.value) {
            const temp = {
                firstname: par.firstname.value.trim(),
                secondname: par.secondname.value.trim(),
                position: par.position.value.trim(),
                salary: par.salary.value.trim(),
            };
            const arr = [];
            for (let i of this.employees) {
                let add = false;
                for (let j in temp) {
                    if (temp[j]) {
                        if (temp[j] == i[j]) {
                            add = true;
                            continue;
                        }
                        add = false;
                    }
                }
                if (add)
                    arr.push(i);
            }
            if (arr.length) {
                this.clearCards();
                for (let i of arr) {
                    this.loadCard(i);
                }
            } else {
                this.clearCards();
                this.noCard();
            }
        } else {
            this.clearCards();
            this.noCard("Fill in at least one of the search inputs!");
        }
    };
    noCard(par = "No one was found!") {
        const nocard = this.createElement('p');
        nocard.innerText = par;
        this.cards.appendChild(nocard);
    }
    loadAllCardsFromLocalStorage() {
        this.employees = JSON.parse(localStorage.getItem('employee'));
        for (let i in this.employees) {
            this.loadCard(this.employees[i]);
        }
    };
    resetAddPageValues() {
        this.addpage_input.firstname.value = "";
        this.addpage_input.secondname.value = "";
        this.addpage_input.position.value = "";
        this.addpage_input.salary.value = "";
        this.addpage_input.image.value = "";
    }
    main() {
        this.getElements();
        this.addEventListeners();
        this.loadAllCardsFromLocalStorage();
    };
}

(function firsttime() {
    if (!localStorage.getItem("employee")) {
        const example = [{
            firstname: "Ali",
            id: 0,
            image: "https://assets2.rockpapershotgun.com/the-witcher-3-best-rpgs.jpg/BROK/thumbnail/1600x900/quality/100/the-witcher-3-best-rpgs.jpg",
            position: "Front",
            salary: 100,
            secondname: "Aghayev",
        }, {
            firstname: "Elon",
            id: 1,
            image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg/1200px-Elon_Musk_Royal_Society_%28crop2%29.jpg",
            position: "CEO",
            salary: 1000,
            secondname: "Musk",
        }, ];
        localStorage.setItem("employee", JSON.stringify(example));
    }
})();

const control_system = new ControlSystem;
control_system.main();