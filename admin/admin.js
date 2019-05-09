const veil = document.getElementById("veil");
const modalText = document.getElementById("text");
let selected = "";
let operation = "";

database
    .ref(placesNode)
    .on("value", (s) => {

        const ol = document.getElementById('list');
        ol.innerHTML = '';

        s.forEach(e => {
            const li = document.createElement('li');
            li.innerHTML = "<p onclick=\"remove('" + e.key + "')\">" + e.key + "</p>";
            ol.appendChild(li);
        });
    });

function showModal(show) {
    veil.style.visibility = show ? "visible" : "hidden";
    veil.style.opacity = show ? "1" : "0";
}

function confirm() {

    let node;

    switch (operation) {
        case "REMOVE":
            node = database.ref(placesNode).child(selected)
            break;
        case "RESET":
            node = database.ref(votesNode)
            break;
        case "WIPE":
            node = database.ref(placesNode)
            break;
    }

    node.remove();
    showModal(false);
}


function send() {

    const input = document.getElementById("choice-input");
    const name = input.value;

    if (name.length > 0) {
        if ((/(\w| )+/g).test(name)) {

            const entry = {};
            entry[name] = 1;

            database
                .ref(placesNode)
                .update(entry);

            input.value = "";
            input.focus();

        } else {
            alert("Sólo se permiten caracteres alfanuméricos");
        }
    }
}

function keyHandler(event) {
    if (event.key === "Enter") {
        send();
    }
}

function remove(id) {
    modalText.innerHTML = "¿Eliminar opción \"" + id + "\"?";
    selected = id;
    operation = "REMOVE";
    showModal(true);
}

function reset() {
    modalText.innerHTML = "¿Eliminar todas las opciones?";
    operation = "WIPE";
    showModal(true);    
}

function obliterate() {
    modalText.innerHTML = "¿Resetear los resultados de las votaciones?";
    operation = "RESET";
    showModal(true);
}