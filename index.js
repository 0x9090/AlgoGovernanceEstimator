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