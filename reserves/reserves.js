const menu = document.getElementById("menu");
const familiar = document.getElementById("familiar");
const other = document.getElementById("other");
const menuPizza = document.getElementById("menu-pizza");
const menuBurger = document.getElementById("menu-burger");
const menuSandwich = document.getElementById("menu-sandwich");
const menuMain = document.getElementById("menu-main");
const menuPizzaList = [];
const menuBurgerList = [];
const menuSandwichList = [];

database
    .ref(pizza)
    .once("value", s => { s.forEach(e => { menuPizzaList.push(e.key) }) });

database
    .ref(burger)
    .once("value", s => { s.forEach(e => { menuBurgerList.push(e.key) }) });

database
    .ref(sandwich)
    .once("value", s => { s.forEach(e => { menuSandwichList.push(e.key) }) });

database
    .ref(starters)
    .once("value", s => {
        const select = document.getElementById("menu-starters");
        s.forEach(e => {
            const el = document.createElement('option');
            el.innerHTML = e.key;
            select.appendChild(el);
        })
    });

database
    .ref(drinks)
    .once("value", s => {
        const select = document.getElementById("menu-drink");
        s.forEach(e => {
            const el = document.createElement('option');
            el.innerHTML = e.key;
            select.appendChild(el);
        })
    });

function typeHandler(type) {
    switch (type) {
        case 'menu':
            showMenu();
            break;
        case 'familiar':
            showFamiliar();
            break;
        case 'other':
            showOtro();
            break;
    }
}

function menuHandler(type) {

    menuMain.innerHTML = '';

    let array;
    switch (type) {
        case 'pizza':
            array = menuPizzaList;
            break;

        case 'burger':
            array = menuBurgerList;
            break;

        case 'sandwich':
            array = menuSandwichList;
            break;
    }

    for (const o of array) {
        const el = document.createElement('option');
        el.innerHTML = o;
        menuMain.appendChild(el);
    }

    onMenumainChange();
}

function showMenu() {
    menu.style.opacity = "1";
    menu.style.height = "300px";

    familiar.style.opacity = "0";
    familiar.style.height = "0";

    other.style.opacity = "0";
    other.style.height = "0"
}

function showFamiliar() {
    menu.style.opacity = "0";
    menu.style.height = "0";

    familiar.style.opacity = "1";
    familiar.style.height = "300px";

    other.style.opacity = "0";
    other.style.height = "0"

}

function showOtro() {
    menu.style.opacity = "0";
    menu.style.height = "0";

    familiar.style.opacity = "0";
    familiar.style.height = "0";

    other.style.opacity = "1";
    other.style.height = "300px"
}

function onMenumainChange() {
    console.log(menuMain.options[menuMain.selectedIndex].text);
}
