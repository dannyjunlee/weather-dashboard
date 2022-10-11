// DEPENDENCIES
var searchInputEl = document.getElementById("city-search");
var searchButtonEl = document.getElementById("search-button");
var currentDataEl = document.querySelector(".current-data");
var currentDateEl = document.querySelector(".current-weather-container");
var forecastContainer = document.querySelector(".five-day-forecast-container");


// DATA
var APIKey = "fc22c201b21fb998ddae41f7cecb6958";
var city;
var queryURL;
    // Date
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

currentDateEl.children[0].innerHTML = "(" + today + ")";
console.log(today);

for (let i = 0; i < forecastContainer.children.length; i++) {
    newDay = new Date();
    newDate = String(newDay.getDate()+i+1).padStart(2, '0');
    forecastContainer.children[i].children[0].innerHTML = mm + "/" + newDate + "/" + yyyy;
    console.log(newDate);
}


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
        // Current weather data
        .then(function (data) {
            var liTemp = document.createElement("li");
            var liWind = document.createElement("li");
            var liHumidity = document.createElement("li");
            var temperature = (data.main.temp - 273.15) * 9/5 + 32;
            temperature = temperature.toFixed(2);
            var wind = data.wind.speed;
            var humidity = data.main.humidity;
            liTemp.innerHTML = "Temp: " + temperature + "°F";
            liWind.innerHTML = "Wind: " + wind + " MPH";
            liHumidity.innerHTML = "Humidity: " + humidity + " %";
            currentDataEl.appendChild(liTemp);
            currentDataEl.appendChild(liWind);
            currentDataEl.appendChild(liHumidity);
        })
        // Forecast
        .then(function (data) {

        })
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