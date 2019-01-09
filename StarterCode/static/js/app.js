// Get references to the tbody element and button for loading additional results
var $tbody = document.querySelector("tbody");
var $datetime = document.querySelector("#datetime");
var $stateInput = document.querySelector("#state")
var $cityInput = document.querySelector("#city");
var $searchBtn = document.querySelector("#filter-btn");


// Add an event listener to the $searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

// Set filteredAddresses to addressData initially
var filteredAddresses = data;

// renderTable renders the filteredAddresses to the tbody
function renderTable() {
  $tbody.innerHTML = "";
  for (var i = 0; i < filteredAddresses.length; i++) {
    // Get the current address object and its fields
    var address = filteredAddresses[i];
    var fields = Object.keys(address);
    // Create a new row in the tbody, set the index to be i + startingIndex
    var $row = $tbody.insertRow(i);
    for (var j = 0; j < fields.length; j++) {
      // For every field in the address object, create a new cell and set its inner text to be the current value at the current address's field
      var field = fields[j];
      var $cell = $row.insertCell(j);
      $cell.innerText = address[field];
    }
  }
}

function handleSearchButtonClick() {
  // Format the user's search by removing leading and trailing whitespace, lowercase the string
  var filterState = $stateInput.value.trim().toLowerCase();
  var filterCity = $cityInput.value.trim().toLowerCase();

  // Set filteredAddresses to an array of all addresses who's "state" matches the filter
  filteredAddresses = addressData.filter(function(address) {
    var addressState = address.state.substring(0, filterState.length).toLowerCase();
    var addressCity = address.city.substring(0, filterCity.length).toLowerCase();
    if (addressState === filterState && addressCity === filterCity) {
      return true;
    }
    return false;
  });
  renderTable();
}


// Render the table for the first time on page load
renderTable();

//****new stuff
// Select the submit button
let filterBtn = d3.select("#filter-btn");

// create an event handler for the filter button
filterBtn.on("click", function() {
    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Select the input element and get the raw HTML node
    let inputElementDate = d3.select("#datetime");

    // Get the value property of the input element
    let inputValueDate = inputElementDate.property("value");

    // log input value to console for debugging purposes
    console.log(inputValueDate);
    
    // create a new variable to represent the data variable from data.js
    let tableData = data;

    // apply filter on the raw data
    let filteredData = tableData.filter(sighting => {
        let ok = true;
        
        if (inputValueDate !== '') {
            ok = (sighting.datetime === inputValueDate && ok === true);
        }

        return ok;
    });

    // log filtered results to console
    console.log(filteredData);

	
    // clear any html rows from prior search
    let tbodyRows = d3.selectAll("tbody>tr");
    tbodyRows.remove();


    // display the data in the table
    let tbody = d3.select("tbody");

    filteredData.forEach((sighting) => {
        let row = tbody.append("tr");
        cnt += 1;
        Object.entries(sighting).forEach(([key, value]) => {
            let cell = row.append("td");
            cell.text(value);
        });
    });

});