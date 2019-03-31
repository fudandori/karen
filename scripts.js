const database = firebase.database();
let opt1, opt2;

function writeUserData() {

    const planet = document.getElementById("planet").value;
    const craft = document.getElementById("craft").value;

    database
        .ref("data/starcraft/" + planet)
        .set({
            option1: +new Date(),
            option2: +new Date()
        }, () => console.log("SENT!!"));
}

const row = document.getElementById("row");

function generateRadio(id, col) {
    const name = "name=color" + col.toString();
    const idValue = id.toString().replace(/ /g, "_") + col.toString();

    return '<div class="rad col-12" onclick="select(' + idValue + ')">'
        + '<input type="radio" name="' + name + '" id="' + idValue + '">'
        + '<label> ' + id.toString() + '</label>'
        + '</div>';
}

function select(input) {
    if (!input.disabled) {

        const id = input.id;
        const col = id.substring(id.length - 1);
        const left = col === "1";
        const frameId = left ? "right" : "left";
        const resultId = left ? "o1" : "o2";

        if (left) {
            opt1 = shapeName(id);
        } else {
            opt2 = shapeName(id);
        }

        document.getElementById(id).checked = true;

        const frame = document.getElementById(frameId);
        const inputs = frame.getElementsByTagName("input");

        for (const input of inputs) {
            const linked = equal(input.id, id);

            input.checked = linked ? false : input.checked;
            input.disabled = linked;
            input.parentElement.style.opacity = linked ? "0" : "1";
            input.parentElement.style.visibility = linked ? "hidden" : "visible";
        }
    }
}

function equal(id1, id2) {
    return shapeName(id1) === shapeName(id2);
}

function shapeName(name) {
    return name.substring(0, name.length - 1).replace(/_/g, " ");
}

function deselect(id) {
    console.log(id + ' deselected');
}

database
    .ref("data/colors/")
    .once("value", (s) => {
        const left = document.getElementById("left");
        const right = document.getElementById("right");

        s.forEach(e => {
            left.innerHTML += generateRadio(e.key, 1);
            right.innerHTML += generateRadio(e.key, 2);
        });

    });