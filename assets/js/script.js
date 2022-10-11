// DEPENDENCIES
var searchInputEl = document.getElementById("city-search");
var searchButtonEl = document.getElementById("search-button");
var currentDataEl = document.getElementsByClassName("current-data");

// DATA
var APIKey = "fc22c201b21fb998ddae41f7cecb6958";
var city;
var queryURL;

// FUNCTIONS
    // Fetch API
        // Search city weather data
    // Display info on dashboard/page
        // Current Weather Container:
            // City, date, weather icon in header
            // Temp, wind, humidity
        // 5-day forecast:
            // Dark grey cards with date on top, weather icon, tmep, wind, humidity
function getWeather(queryURL) {
    fetch(queryURL)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var temperature = (data.main.temp - 273.15) * 9/5 + 32;
            temperature = temperature.toFixed(2);
            console.log(temperature);
            currentDataEl.value = "Temp: " + temperature + "°F";
        });
};

    // Save city to local storage
        // Input value becomes last city searched?

// USER INTERACTIONS
    // User inputs location into search box
    // User clicks on city in saved searches list

// INITIALIZATION
searchButtonEl.addEventListener("click", function() {
    city = searchInputEl.value;
    queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    getWeather(queryURL);
});