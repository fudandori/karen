const config = {
    apiKey: "AIzaSyBbUi9-EkMpp-HbKDYz1FdMFmo91LmkLlM",
    authDomain: "karen-c3a48.firebaseapp.com",
    databaseURL: "https://karen-c3a48.firebaseio.com",
    projectId: "karen-c3a48",
    storageBucket: "karen-c3a48.appspot.com",
    messagingSenderId: "227651580103"
};

firebase.initializeApp(config);

const database = firebase.database();
const votesNode = "data/votes/";
const placesNode = "data/places/";
const telepizza = "data/telepizza/";
const burger = telepizza + "burger";
const pizza = telepizza + "pizza";
const sandwich = telepizza + "sandwich";
const starters = telepizza + "entrantes";
const drinks = telepizza + "drink";