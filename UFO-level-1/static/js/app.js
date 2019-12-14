/*
Homework: javascript-challenge.
Gary Schulke
12/13/2019
*/

// from data.js
var ufoData = data;

// Variables for the form widgets.
var dateField = null;
var cityField = null;
var stateField = null;
var countryField = null;
var shapeField = null;
var searchButton = null;
var clearButton = null;

// Create access to the widget and widget events.
function initialize() {

    dateField = d3.select("#datetime");
    cityField = d3.select("#cityList");
    stateField = d3.select("#stateList");
    countryField = d3.select("#countryList");
    shapeField = d3.select("#shapeList");
    searchButton = d3.select("#filter-btn");
    clearButton = d3.select("#clear-btn");
    searchForm = d3.select("#search-form");

    // Filter Button handler    
    searchButton.on("click", function () {
        searchData();
    });

    // Clear Search handler
    clearButton.on("click", function () {
        dateField.property("value", "");
        cityField.property("value" , "");
        stateField.property("value" , "");
        countryField.property("value" , "");
        shapeField.property("value", "");
    });
    
    // Stop enter key from reloading the form.
    searchForm.on("submit", function () {
        //d3.event.stopPropagation();
        d3.event.preventDefault();
        cityField.nodefocus();
    }); 
    
    // Populate the pulldowns
    initializePulldowns();

    // Display the table with data
    searchData();
}

// Searches ufoData using the search selections.
// This is an AND search.  All non empty selections must be met.
function searchData() {

    // Get the value property of the input elements
    let dateVal = dateField.property("value");
    let cityVal = cityField.property("value");
    let stateVal = stateField.property("value").toLowerCase();
    let countryVal = countryField.property("value").toLowerCase();
    let shapeVal = shapeField.property("value").toLowerCase();

    let searchResults = ufoData;

    if (dateVal != "") {
        searchResults = searchResults.filter(ufo => ufo.datetime.toLowerCase() == dateVal);
    }
    if (stateVal != "") {
        searchResults = searchResults.filter(ufo => ufo.state.toLowerCase() == stateVal);
    };
    if (shapeVal != "") {
        searchResults = searchResults.filter(ufo => ufo.shape.toLowerCase() == shapeVal);
    };
    if (cityVal != "") {
        searchResults = searchResults.filter(ufo => ufo.city.toLowerCase() == cityVal);
    };
    if (countryVal != "") {
        searchResults = searchResults.filter(ufo => ufo.country.toLowerCase() == countryVal);
    };

    // Display the data or the no results message.
    if (searchResults.length != 0){
        buildTable(searchResults);
    }
    else{
        buildNoResults();
    }
}

// Generates the rows and columns html.
// displayData - The list from search results.
//
function buildTable(displayData) {

    let ullist = d3.select("tbody");
    ullist.selectAll("tr").remove();

    for (sighting of displayData) {
        let row = ullist.append("tr");
        for (cellData in sighting) {
            let cell = row.append("td");
            cell.text(`${sighting[cellData]}`);
        };
    };
}

// Generates the no results found message.
function buildNoResults() {
    let ullist = d3.select("tbody");
    ullist.selectAll("tr").remove();
    let row = ullist.append("tr");
    let cell = row.append("td");
    cell.text("The search returned no results.  Try different search parameters.");
}

// Creates each of the pulldown selectios.
// Gets unique values from the data for each field.
// Create the pulldown.  The user sees UPPERCASE because it looks better.
function initializePulldowns() {

    let uniqueCities = getCities();
    let option = cityField.append("option");
    option.property("text", "");
    option.property("value", "");

    for (each of uniqueCities) {
        option = cityField.append("option");
        option.property("text", each.toUpperCase());
        option.property("value", each);
    }

    let uniqueStates = getStates();
    option = stateField.append("option");
    option.property("text", "");
    option.property("value", "");

    for (each of uniqueStates) {
        option = stateField.append("option");
        option.property("text", each.toUpperCase());
        option.property("value", each);
    }

    let uniqueCountries = getCountries();
    option = countryField.append("option");
    option.property("text", "");
    option.property("value", "");

    for (each of uniqueCountries) {
        option = countryField.append("option");
        option.property("text", each.toUpperCase());
        option.property("value", each);
    }

    let uniqueShapes = getShapes();
    option = shapeField.append("option");
    option.property("text", "");
    option.property("value", "");

    for (each of uniqueShapes) {
        option = shapeField.append("option");
        option.property("text", each.toUpperCase());
        option.property("value", each);
    }
}

// Searches the data and creates a list of the unique city names.
function getCities() {
    let sortedCities = ufoData.map(each => each.city).sort();
    let uniqueCities = [];

    for (let i = 0; i < sortedCities.length; i++) {
        if (sortedCities[i + 1] != sortedCities[i]) {
            uniqueCities.push(sortedCities[i]);
        }
    }
    return uniqueCities;
}

// Searches the data and creates a list of the unique state names.
function getStates() {
    let sortedStates = ufoData.map(each => each.state).sort();
    let uniqueStates = [];

    for (let i = 0; i < sortedStates.length; i++) {
        if (sortedStates[i + 1] != sortedStates[i]) {
            uniqueStates.push(sortedStates[i]);
        }
    }
    return uniqueStates;
}

// Searches the data and creates a list of the unique country names.
function getCountries() {
    let sortedCountries = ufoData.map(each => each.country).sort();
    let uniqueCountries = [];

    for (let i = 0; i < sortedCountries.length; i++) {
        if (sortedCountries[i + 1] != sortedCountries[i]) {
            uniqueCountries.push(sortedCountries[i]);
        }
    }
    return uniqueCountries;
}

// Searches the data and creates a list of the unique shape names.
function getShapes() {
    let sortedShapes = ufoData.map(each => each.shape).sort();
    let uniqueShapes = [];

    for (let i = 0; i < sortedShapes.length; i++) {
        if (sortedShapes[i + 1] != sortedShapes[i]) {
            uniqueShapes.push(sortedShapes[i]);
        }
    }
    return uniqueShapes;
}

// Start running the script.
initialize();

