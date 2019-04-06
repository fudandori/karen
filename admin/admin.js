const places = "data/places/";

database
    .ref(places)
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

        const entry = {};
        entry[name] = 1;

        database
            .ref(places)
            .update(entry);
    }

    input.value = "";
    input.focus();
}

function reset() {
    database
        .ref(places)
        .remove()
}

function keyHandler(event) {
    if (event.key === "Enter") {
        send();
    }
}