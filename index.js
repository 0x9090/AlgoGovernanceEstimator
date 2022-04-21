document.getElementById("priceInput").addEventListener("keyup",
    function() { updateUSD(); });
document.querySelectorAll("table td").forEach(e => e.addEventListener("keyup",
    function(e) { refreshPrices(e); }));

function refreshPrices(event) {
    let edited_row = event.target.parentElement.rowIndex;
    let price = parseFloat(document.getElementById("priceInput").value);
    let table = document.getElementById("tableData");
    for (let i = edited_row; i < table.rows.length; i++) {
        let row = table.rows[i];
        let committed = parseFloat(row.cells[2].innerText);
        let apy = parseFloat(row.cells[3].innerText);
        let rewards = parseFloat(((committed * (apy / 100)) / 4).toFixed(6));
        let balance = parseFloat((committed + rewards).toFixed(6));
        let usd_value = parseFloat(((committed + rewards) * price).toFixed(2));
        if (isNaN(usd_value)) {
            usd_value = 0;
        }
        let formatted_usd_value = "$" + usd_value.toLocaleString("en-US");
        row.cells[4].innerText = rewards.toString();
        row.cells[5].innerText = balance.toString();
        row.cells[6].innerText = formatted_usd_value;
        if (i < (table.rows.length - 1)) {
            let next_row = table.rows[i + 1];
            next_row.cells[2].innerText = balance.toString();
        }
    }
}

function updateUSD() {
    let price = parseFloat(document.getElementById("priceInput").value);
    let table = document.getElementById("tableData");
    for (let i = 1; i < table.rows.length; i++) {
        let row = table.rows[i];
        let balance = parseFloat(row.cells[5].innerText);
        let usd_value = (balance * price);
        if (isNaN(usd_value)) {
            usd_value = 0;
        }
        row.cells[6].innerText = "$" + usd_value.toLocaleString("en-US");
    }
}

function resetPrices() {
    document.getElementById("priceInput").value = "";
    let table = document.getElementById("tableData");
    setRow(1, "14.05");
    setRow(2, "10.02");
    setRow(3, "7.14");
    for (let i = 3; i < table.rows.length; i++) {
        setRow(i, "10");
    }
}

function setRow(row, price) {
    let table = document.getElementById("tableData");
    let rowObj = table.rows[row];
    rowObj.cells[2].innerText = "0";
    rowObj.cells[3].innerText = price;
    rowObj.cells[4].innerText = "0";
    rowObj.cells[5].innerText = "0";
    rowObj.cells[6].innerText = "$0";
}

function downloadCSV() {
    let csv_data = [];
    let rows = document.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
        let columns = rows[i].querySelectorAll("td,th");
        let csvrow = [];
        for (let j = 0; j < columns.length; j++) {
            csvrow.push("\"" + columns[j].innerHTML + "\"");
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

resetPrices();