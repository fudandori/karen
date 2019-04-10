const ctx = document.getElementById('pieChart');

function update() {

    database
        .ref(votesNode)
        .on("value", (snap) => {
            const voters = [];
            const results = new Map();

            snap.forEach(node => {
                voters.push(node.key);

                node.forEach(entry => {

                    const option = entry.val();
                    let value = results.has(option) ? results.get(option) + 1 : 1;
                    results.set(option, value);
                });
            });

            const list = document.getElementById("list");
            list.innerHTML = "";

            voters.forEach(v => {
                const li = document.createElement("li");
                li.innerHTML = v;
                list.appendChild(li);
            });

            const labels = [];
            const values = [];

            results.forEach((value, key) => {
                labels.push(key);
                values.push(value);
            });

            data = {
                datasets: [{
                    data: values,
                    backgroundColor: [
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(255, 206, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(153, 102, 255)',
                        'rgb(255, 159, 64)'
                    ]
                }],
                labels: labels
            };


            Chart.defaults.global.defaultFontColor = '#FFF';
            new Chart(ctx, {
                type: 'doughnut',
                data: data
            });
        });
}

update();