let menu
let familiar
let menuSelects
let other
let twoIng
let twoIngFamiliar
let veil
let menuMain
let menuStarters
let menuDrink
let familiarDrink
let familiarDrink2
let familiarMain
let ingOne
let ingTwo
let ingOneFamiliar
let ingTwoFamiliar
let menuPizza
let menuBurger
let menuSandwich
let saveButton
let menuButton
let familiarButton
let otherButton
let comment
let radio
let inputName
let familiarDrinkLabel

const telepizzActive = "telepizza-active";
const menuPizzaList = [];
const menuBurgerList = [];
const menuSandwichList = [];

var selectedMenu = "none";
var selectedType = "none";
var drinkQty = 1;

function initialize() {

    // Container
    menu = document.getElementById("menu");
    familiar = document.getElementById("familiar");
    menuSelects = document.getElementById("menu-selects");
    other = document.getElementById("other");
    twoIng = document.getElementById("two-ing");
    twoIngFamiliar = document.getElementById("two-ing-familiar");
    veil = document.getElementById("veil");

    // Combo
    menuMain = document.getElementById("menu-main");
    menuStarters = document.getElementById("menu-starters");
    menuDrink = document.getElementById("menu-drink");
    familiarDrink = document.getElementById("familiar-drink");
    familiarDrink2 = document.getElementById("familiar-drink-2");
    familiarMain = document.getElementById("familiar-main");
    ingOne = document.getElementById("ing-one");
    ingTwo = document.getElementById("ing-two");
    ingOneFamiliar = document.getElementById("ing-one-familiar");
    ingTwoFamiliar = document.getElementById("ing-two-familiar");

    // Button
    menuPizza = document.getElementById("menu-pizza");
    menuBurger = document.getElementById("menu-burger");
    menuSandwich = document.getElementById("menu-sandwich");
    saveButton = document.getElementById("save");
    menuButton = document.getElementById("menu-send");
    familiarButton = document.getElementById("familiar-send");
    otherButton = document.getElementById("other-send");

    // Input
    comment = document.getElementById("comment");
    radio = document.getElementById("customRadio2");
    inputName = document.getElementById("name");

    familiarDrinkLabel = document.getElementById("drink-label");
}
