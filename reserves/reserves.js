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
const familiarMain = document.getElementById("familiar-main");
const menuMain = document.getElementById("menu-main");
const twoIng = document.getElementById("two-ing");
const ingOne = document.getElementById("ing-one");
const ingTwo = document.getElementById("ing-two");
const menuPizzaList = [];
const menuBurgerList = [];
const menuSandwichList = [];
const telepizzActive = "telepizza-active";

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
        }
    });

function insertOption(select, option) {
    const el = document.createElement("option");
    el.innerHTML = option;
    select.appendChild(el);
}

function typeHandler(type) {

    switch (type) {
        case "menu":
            showMenu();
            break;
        case "familiar":
            showFamiliar();
            break;
        case "other":
            showOtro();
            break;
    }
}

function menuHandler(type) {

    menuMain.innerHTML = "";

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

    for (const o of array) {
        const el = document.createElement("option");
        el.innerHTML = o;
        menuMain.appendChild(el);
    }

    onMenumainChange();

    menuSelects.style.visibility = "visible";
    menuSelects.style.opacity = "1";
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

    familiar.style.opacity = "0";
    familiar.style.height = "0";
    familiar.style.visibility = "hidden";

    other.style.opacity = "0";
    other.style.height = "0";
    other.style.visibility = "hidden";

    menu.style.opacity = "1";
    menu.style.height = "auto";
    menu.style.visibility = "visible";
}


function showFamiliar() {

    activateButton("menu-button", false);
    activateButton("familiar-button");
    activateButton("other-button", false);

    menu.style.opacity = "0";
    menu.style.height = "0";
    menu.style.visibility = "hidden";

    other.style.opacity = "0";
    other.style.height = "0";
    other.style.visibility = "hidden";

    familiar.style.opacity = "1";
    familiar.style.height = "auto";
    familiar.style.visibility = "visible";
}

function showOtro() {

    activateButton("menu-button", false);
    activateButton("familiar-button", false);
    activateButton("other-button");

    menu.style.opacity = "0";
    menu.style.height = "0";
    menu.style.visibility = "hidden";

    familiar.style.opacity = "0";
    familiar.style.height = "0";
    familiar.style.visibility = "hidden";

    other.style.opacity = "1";
    other.style.height = "auto";
    other.style.visibility = "visible";
}

function onMenumainChange() {
    const speciality = menuMain.options[menuMain.selectedIndex].text !== "2 ingredientes";
    twoIng.style.opacity = speciality ? "0" : "1";
    twoIng.style.visibility = speciality ? "hidden" : "visible";
}
