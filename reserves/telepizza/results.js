let menus
let familiars
let otherTable

function load() {
    menus = document.getElementById("menus")
    familiars = document.getElementById("familiars")
    otherTable = document.getElementById("other-table")

    database
        .ref(telepizzaReserves)
        .once("value", data => {

            const menus = []
            const familiars = []
            const other = []

            data.forEach(person => {

                const name = person.key

                person.forEach(v => {

                    switch (v.key) {
                        case 'menu':
                            menus.push({
                                name: name,
                                ...addEntry(v)
                            })
                            break

                        case 'familiar':
                            familiars.push({
                                name: name,
                                ...addEntry(v, false)
                            })
                            break

                        case 'other':
                            other.push({ name: name, other: v.val() })
                            break

                    }
                })
            })


            addMenuRows(menus)
            addFamiliarRows(familiars)
            addOtherRows(other)

            if(menus.length === 0) document.getElementById("menu-table").style.display = 'none'
            if(familiars.length === 0) document.getElementById("familiar-table").style.display = 'none'
            if(other.length === 0) document.getElementById("o-table").style.display = 'none'

        })
}

function addMenuRows(data) {
    menus.innerHTML = ""

    const fragment = document.createDocumentFragment();

    for (const row of data) {

        const tr = document.createElement("tr")

        const name = document.createElement("td")
        name.innerHTML = row.name
        const drink = document.createElement("td")
        drink.innerHTML = row.drink
        const starters = document.createElement("td")
        starters.innerHTML = row.starters.replace(/\(.*\)$/g, "")
        const main = document.createElement("td")
        main.innerHTML = row.main

        tr.appendChild(name)
        tr.appendChild(main)
        tr.appendChild(starters)
        tr.appendChild(drink)

        fragment.appendChild(tr)
    }

    menus.appendChild(fragment)
}

function addFamiliarRows(data) {
    familiars.innerHTML = ""

    const fragment = document.createDocumentFragment();

    for (const row of data) {

        const tr = document.createElement("tr")

        const name = document.createElement("td")
        name.innerHTML = row.name
        const drink = document.createElement("td")
        drink.innerHTML = row.drink.replace(/^$/g, "Sin bebida")
        const main = document.createElement("td")
        main.innerHTML = row.main

        tr.appendChild(name)
        tr.appendChild(main)
        tr.appendChild(drink)

        fragment.appendChild(tr)
    }

    familiars.appendChild(fragment)
}

function addOtherRows(data) {
    otherTable.innerHTML = ""

    const fragment = document.createDocumentFragment();

    for (const row of data) {

        const tr = document.createElement("tr")

        const name = document.createElement("td")
        name.innerHTML = row.name
        const text = document.createElement("td")
        text.innerHTML = row.other

        tr.appendChild(name)
        tr.appendChild(text)

        fragment.appendChild(tr)
    }

    otherTable.appendChild(fragment)
}

function addEntry(input, menu = true) {

    let entry = {
        main: parseIngredients(input.child("main").val()),
        drink: input.child("drink").val()
    }

    return menu
        ? { ...entry, starters: input.child("starters").val() }
        : entry
}

function parseIngredients(input) {
    const split = input.split("|")

    return split.length > 1
        ? split.slice(1).join(" y ")
        : input
}