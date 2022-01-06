let algoTable = document.getElementById("algoTable");

let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

let observer = new MutationObserver(function(mutations) {
     mutations.forEach(function(mutation) {
         if (mutation.type === 'childList') {
             refreshPrices();
         }
     });
});

observer.observe(list, {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true
});

function refreshPrices() {
    console.log("working!");
}

function downloadCSV() {
    let csv_data = [];
    let rows = document.getElementsByTagName("tr");
    for (let i = 0; i < rows.length; i++) {
        let columns = rows[i].querySelectorAll("td,th");
        let csvrow = [];
        for (let j = 0; j < cols.length; j++) {
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