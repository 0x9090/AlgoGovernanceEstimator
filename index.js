//document.getElementById("priceInput").addEventListener("keyup", refreshPrices);
document.querySelectorAll("table td").forEach(e => e.addEventListener("keyup", refreshPrices));

function refreshPrices() {
    let price = parseFloat(document.getElementById("priceInput").value);
    let table = document.getElementById("tableData");
    for (let i = 1; i < table.rows.length; i++) {
        // row iteration
        let row = table.rows[i];
        console.log(row);
        let committed = parseFloat(row.cells[2].innerText);
        let apy = parseInt(row.cells[3].innerText);
        let rewards = parseFloat(((committed * (apy / 100)) / 4).toFixed(6));
        let balance = parseFloat((committed + rewards).toFixed(6));
        let usd_value = parseFloat(((committed + rewards) * price).toFixed(2));
        let formatted_usd_value = "$" + usd_value.toLocaleString("en-US");
        row.cells[4].innerText = rewards;
        row.cells[5].innerText = balance
        row.cells[6].innerText = formatted_usd_value;
        if (i >= table.rows.length) {
            return;
        }
        console.log(i);
        if (i !== row.rowIndex) {
            let next_row = table.rows[i + 1];
            next_row.cells[2].innerText = balance;
        }
    }
}

function resetPrices() {
    let table = document.getElementById("tableData");
    for (let i = 1; i < table.rows.length; i++) {
        let row = table.rows[i];

    }
}

function downloadCSV() {
    console.log("downloading CSV");
    let csv_data = [];
    let rows = document.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
        let columns = rows[i].querySelectorAll("td,th");
        let csvrow = [];
        for (let j = 0; j < columns.length; j++) {
            csvrow.push(columns[j].innerHTML);
        }
        csv_data.push(csvrow.join(","));
    }
    csv_data = csv_data.join("\n");
    let CSVFile = new Blob([csv_data], { type: "text/csv" });
    let temp_link = document.createElement("a");
    temp_link.download = "AlgoEstimate.csv";
    let url = window.URL.createObjectURL(CSVFile);
    temp_link.href = url;
    temp_link.style.display = "none";
    document.body.appendChild(temp_link);
    temp_link.click();
    document.body.removeChild(temp_link);
}