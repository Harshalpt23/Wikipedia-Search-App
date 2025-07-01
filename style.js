let inputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner")
let options = {
    method: "GET"
}

function createAndAppendSearchResult(result) {
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultsEl.appendChild(resultItemEl);
    let {
        link,
        title,
        description
    } = result;
    let resultTitleEl = document.createElement("a");
    resultTitleEl.href = link;
    resultTitleEl.target = "_blank";
    resultTitleEl.textContent = title;
    resultTitleEl.classList.add("result-title");
    resultItemEl.appendChild(resultTitleEl);
    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl)
    let urlEl = document.createElement("a");
    urlEl.textContent = link;
    urlEl.href = link;
    urlEl.target = "_blank";
    urlEl.classList.add("result-url");
    resultItemEl.appendChild(urlEl);
    let urlBreakEl = document.createElement("br");
    resultItemEl.appendChild(urlBreakEl);
    let descriptionEl = document.createElement("p");
    descriptionEl.textContent = description;
    descriptionEl.classList.add("link-description");
    resultItemEl.appendChild(descriptionEl);
}

function displayResults(searchResults) {
    spinnerEl.classList.toggle("d-none")
    for (let result of searchResults) {
        createAndAppendSearchResult(result)
    }
}

function wikipediaSearch(event) {
    if (event.key === "Enter") {
        searchResultsEl.textContent = "";
        spinnerEl.classList.toggle("d-none")
        let searchInput = inputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        fetch(url, options)
            .then(function(response) {
                return response.json()
            })
            .then(function(json) {
                let {
                    search_results
                } = json;
                displayResults(search_results)
            })
    }

}
inputEl.addEventListener("keydown", wikipediaSearch)