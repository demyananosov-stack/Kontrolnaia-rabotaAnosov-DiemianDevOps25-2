const runButton = document.getElementById("run-button");
const transactionInput = document.getElementById("transaction-count");

const totalValue = document.getElementById("total-value");
const validValue = document.getElementById("valid-value");
const invalidValue = document.getElementById("invalid-value");
const averageValue = document.getElementById("average-value");

const detectionValue = document.getElementById("detection-value");
const processingValue = document.getElementById("processing-value");
const processedValue = document.getElementById("processed-value");

const pieChart = document.getElementById("pie-chart");
const barChart = document.getElementById("bar-chart");
const linePolyline = document.getElementById("line-polyline");


function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}


function generateBars() {
    barChart.innerHTML = "";

    for (let index = 0; index < 24; index += 1) {
        const bar = document.createElement("div");
        bar.className = "bar";
        bar.style.height = `${randomNumber(35, 94)}%`;
        barChart.appendChild(bar);
    }
}


function generateLine() {
    const points = [];

    for (let index = 0; index < 100; index += 1) {
        const x = (index / 99) * 1000;
        const y = randomNumber(45, 275);
        points.push(`${x},${y}`);
    }

    linePolyline.setAttribute("points", points.join(" "));
}


function updateDashboard() {
    let total = Number(transactionInput.value);

    if (!Number.isFinite(total)) {
        total = 1000;
    }

    total = Math.max(100, Math.min(10000, Math.round(total)));

    const invalidPercent = randomNumber(0.03, 0.15);
    const invalid = Math.round(total * invalidPercent);
    const valid = total - invalid;
    const average = randomNumber(1.2, 2.8);
    const detection = randomNumber(99.1, 99.99);

    totalValue.textContent = total;
    validValue.textContent = valid;
    invalidValue.textContent = invalid;
    averageValue.textContent = average.toFixed(2);

    detectionValue.textContent = `${detection.toFixed(2)}%`;
    processingValue.textContent = `${average.toFixed(2)} мс`;
    processedValue.textContent = total;

    const validDegrees = (valid / total) * 360;

    pieChart.style.background = `
        conic-gradient(
            #51cf72 0deg ${validDegrees}deg,
            #df4278 ${validDegrees}deg 360deg
        )
    `;

    generateBars();
    generateLine();
}


runButton.addEventListener("click", updateDashboard);

updateDashboard();