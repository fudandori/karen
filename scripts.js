var database = firebase.database();

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
    const idValue = id.toString() + col.toString();

    return '<div class="rad col-12" onclick="select(' + idValue + ')">'
        + '<input type="radio" name="' + name + '" id="' + idValue + '">'
        + '<strong> ' + id.toString() + '</strong>'
        + '</div>';
}

function select(input) {
    if (!input.disabled) {

        const id = input.id;
        const col = id.substring(id.length - 1);
        const frameId = col === "1" ? "right" : "left";

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
    return id1.substring(0, id1.length - 1) === id2.substring(0, id2.length - 1)
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