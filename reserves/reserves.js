const menu = document.getElementById("menu");
const menuSelects = document.getElementById("menu-selects");
const familiar = document.getElementById("familiar");
const other = document.getElementById("other");
const menuPizza = document.getElementById("menu-pizza");
const menuBurger = document.getElementById("menu-burger");
const menuSandwich = document.getElementById("menu-sandwich");
const menuStarters = document.getElementById("menu-starters");
const menuDrink = document.getElementById("menu-drink");
const familiarDrink = document.getElementById("familiar-drink");
const familiarDrink2 = document.getElementById("familiar-drink-2");
const familiarMain = document.getElementById("familiar-main");
const menuMain = document.getElementById("menu-main");
const twoIng = document.getElementById("two-ing");
const ingOne = document.getElementById("ing-one");
const ingTwo = document.getElementById("ing-two");
const twoIngFamiliar = document.getElementById("two-ing-familiar");
const ingOneFamiliar = document.getElementById("ing-one-familiar");
const ingTwoFamiliar = document.getElementById("ing-two-familiar");
const comment = document.getElementById("comment");
const menuPizzaList = [];
const menuBurgerList = [];
const menuSandwichList = [];
const telepizzActive = "telepizza-active";
let selectedMenu = "none";
let selectedType = "none";
const veil = document.getElementById("veil");
const inputName = document.getElementById("name");
const saveButton = document.getElementById("save");
const menuButton = document.getElementById("menu-send");
const familiarButton = document.getElementById("familiar-send");
const otherButton = document.getElementById("other-send");
let drinkNo = 1;
const radio = document.getElementById("customRadio2");
const familiarDrinkLabel = document.getElementById("drink-label");

saveButton.disabled = true;

database
    .ref(pizza)
    .once("value", s => {
        s.forEach(e => {
            menuPizzaList.push(e.key);
            insertOption(familiarMain, e.key);
        });
    });

database
    .ref(burger)
    .once("value", s => { s.forEach(e => { menuBurgerList.push(e.key) }) });

database
    .ref(sandwich)
    .once("value", s => { s.forEach(e => { menuSandwichList.push(e.key) }) });

database
    .ref(starters)
    .once("value", s => { s.forEach(e => { insertOption(menuStarters, e.key) }) });

database
    .ref(ingredients)
    .once("value", s => {

        const options = [];

        s.forEach(e => {
            options.push(e.key);
        });

        for (const opt of options) {
            insertOption(ingOne, opt);
            insertOption(ingTwo, opt);
            insertOption(ingOneFamiliar, opt);
            insertOption(ingTwoFamiliar, opt);
        }
    });

database
    .ref(drinks)
    .once("value", s => {

        const options = [];

        s.forEach(e => {
            options.push(e.key);
        });

        for (const opt of options) {
            insertOption(menuDrink, opt);
            insertOption(familiarDrink, opt);
            insertOption(familiarDrink2, opt);
        }
    });

function typeHandler(type) {

    if (selectedType !== type) {

        removeStyles();

        switch (type) {
            case "menu":
                showMenu();
                break;

            case "familiar":
                showFamiliar();
                selectedMenu = "none";
                break;

            case "other":
                showOtro();
                selectedMenu = "none";
                break;
        }

        selectedType = type;
    }
}

function menuHandler(type) {

    if (selectedMenu !== type) {

        activateButton("menu-pizza", false);
        activateButton("menu-burger", false);
        activateButton("menu-sandwich", false);
        activateButton("menu-" + type);

        let array;
        switch (type) {
            case "pizza":
                array = menuPizzaList;
                break;

            case "burger":
                array = menuBurgerList;
                break;

            case "sandwich":
                array = menuSandwichList;
                break;
        }

        populateMenuMain(array);
        onMenuMainChange();

        show(menuSelects);
        show(menuButton);

        selectedMenu = type;
    }
}

function activateButton(id, activate = true) {
    const button = document.getElementById(id);

    if (activate) button.classList.add(telepizzActive)
    else button.classList.remove(telepizzActive)
}

function showMenu() {

    activateButton("menu-button");
    activateButton("familiar-button", false);
    activateButton("other-button", false);

    activateButton("menu-pizza", false);
    activateButton("menu-burger", false);
    activateButton("menu-sandwich", false);

    show(menu);
}


function showFamiliar() {

    activateButton("familiar-button");
    activateButton("menu-button", false);
    activateButton("other-button", false);

    show(familiar);
    show(familiarButton);

    drinkNo = 1;
    radio.click();
    onFamiliarMainChange();
}

function showOtro() {

    activateButton("other-button");
    activateButton("menu-button", false);
    activateButton("familiar-button", false);

    show(other);
    show(otherButton);
}

function onMenuMainChange() {
    const speciality = menuMain.options[menuMain.selectedIndex].text !== "2 ingredientes";
    show(twoIng, !speciality);
}

function onFamiliarMainChange() {
    const speciality = familiarMain.options[familiarMain.selectedIndex].text !== "2 ingredientes";
    show(twoIngFamiliar, !speciality);
}

function show(element, show = true) {
    element.style.opacity = show ? "1" : "0";
    element.style.visibility = show ? "visible" : "hidden";
}

function removeStyles() {
    document.querySelectorAll("[style]")
        .forEach(el => el.removeAttribute("style"));
}

function insertOption(select, option) {
    const el = document.createElement("option");
    el.innerHTML = option;
    select.appendChild(el);
}

function populateMenuMain(array) {
    menuMain.innerHTML = "";
    for (const o of array) {
        const el = document.createElement("option");
        el.innerHTML = o;
        menuMain.appendChild(el);
    }
}

function save() {

    let data;

    if (selectedType === "menu") {


        const bebida = getComboText(menuDrink);
        const entrantes = getComboText(menuStarters);
        let principal = getComboText(menuMain);

        if (selectedMenu === "pizza" && getComboText(menuMain) === "2 ingredientes") {
            principal = "Pizza de " + getComboText(ingOne) + " y " + getComboText(ingTwo);
        }

        data = {
            menu: {
                main: principal,
                drink: bebida,
                starters: entrantes.replace(/ \(.*\)/g, '')
            }
        };

    } else if (selectedType === "familiar") {

        let bebida = getComboText(familiarDrink);

        switch (drinkNo) {
            case 0:
                bebida = "";
                break;
            case 1:
                bebida = getComboText(familiarDrink);
                break;
            case 2:
                bebida = getComboText(familiarDrink) + " y " + getComboText(familiarDrink2);
                break;
        }

        let pizza = getComboText(familiarMain);

        if (getComboText(familiarMain) === "2 ingredientes") {
            pizza = "Pizza de " + getComboText(ingOneFamiliar) + " y " + getComboText(ingTwoFamiliar);
        }

        data = {
            familiar: {
                main: pizza,
                drink: bebida
            }
        };

    } else if (selectedType === "other") {

        const text = comment.value;

        data = {
            other: text
        };
    }

    database
        .ref(reserves + inputName.value)
        .set(data);

    showModal(false);
}

function getComboText(combo) {
    return combo.options[combo.selectedIndex].text
}

function showModal(show = true) {
    if (show) veil.classList.add("veil-active")
    else veil.classList.remove("veil-active")
}

function popClick(event) {
    event.stopPropagation();
}

function validate() {
    saveButton.disabled = inputName.value.length === 0;
}

function noDrinks() {
    drinkNo = 0;
    show(familiarDrink, false);
    show(familiarDrink2, false);
    show(familiarDrinkLabel, false);
}

function oneDrink() {
    drinkNo = 1;
    show(familiarDrink);
    show(familiarDrink2, false);
    show(familiarDrinkLabel);
}

function twoDrinks() {
    drinkNo = 2;
    show(familiarDrink);
    show(familiarDrink2);
    show(familiarDrinkLabel);
}