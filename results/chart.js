const ctx = document.getElementById('pieChart');
const colors = [
    'rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 206, 86)',
    'rgb(128, 128, 0)',
    'rgb(75, 192, 192)',
    'rgb(153, 102, 255)',
    'rgb(255, 159, 64)',
    'rgb(154, 205, 50)',
    'rgb(85, 107, 47)',
    'rgb(0, 0, 128)',
    'rgb(128, 128, 128)',
    'rgb(128, 0, 0)',
    'rgb(238, 232, 170)',
    'rgb(255, 0, 255)',
    'rgb(244, 164, 96)'
];
function update() {

    database
        .ref(votesNode)
        .on("value", (snap) => {
            const voters = [];
            let results = new Map();

            snap.forEach(node => {
                voters.push(node.key);

                node.forEach(entry => {

                    const option = entry.val();
                    const count = results.has(option) ? results.get(option) + 1 : 1;
                    results.set(option, count);
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
            
            results = new Map([...results.entries()].sort((a, b) => b[1] - a[1]));

            results.forEach((value, key) => {
                labels.push(key);
                values.push(value);
            });


            data = {
                datasets: [{
                    data: values,
                    backgroundColor: colors
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