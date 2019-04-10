database
    .ref(placesNode)
    .on("value", (s) => {

        const ol = document.getElementById('list');
        ol.innerHTML = '';

        s.forEach(e => {
            const li = document.createElement('li');
            li.innerHTML = "<p>" + e.key + "</p>";
            ol.appendChild(li);
        });
    });

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

function reset() {
    database
        .ref(placesNode)
        .remove();
}

function keyHandler(event) {
    if (event.key === "Enter") {
        send();
    }
}