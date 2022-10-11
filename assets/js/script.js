// DEPENDENCIES
var searchInputEl = document.getElementById("city-search");
var searchButtonEl = document.getElementById("search-button");

// DATA
var APIKey = "fc22c201b21fb998ddae41f7cecb6958";
var city = "Chicago";
var queryURL = "api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;

// FUNCTIONS
    // Fetch API
function getWeather(queryURL) {
    fetch(queryURL)
        .then(function (response) {
            console.log(response);
            return response.json();
        });
};

getWeather(queryURL);
    // Search city weather data
    // Display info on dashboard/page
        // Current Weather Container:
            // City, date, weather icon in header
            // Temp, wind, humidity
        // 5-day forecast:
            // Dark grey cards with date on top, weather icon, tmep, wind, humidity
    // Save city to local storage
        // Input value becomes last city searched?


// USER INTERACTIONS
    // User inputs location into search box
    // User clicks on city in saved searches list

// INITIALIZATION


// Notes
    // Weather dashboard with FORM INPUTS
    // Search for city (API, database)
        // Presented with data + city is added to search history
        // City name, date, icon representation of weather conditions, temperature, humidity, and wind speed
        // 5-day forecast that displays date, icon representation of weather conditions, temperature, wind speed, and humidity
    // When user clicks on city in search history, presented data for same city again

    // API Call
        // api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
    // API Key
        // fc22c201b21fb998ddae41f7cecb6958