// DEPENDENCIES
var searchInputEl = document.getElementById("city-search");
var searchButtonEl = document.getElementById("search-button");
var currentDataEl = document.querySelector(".current-data");
var currentCityDateEl = document.querySelector(".current-weather-container");
var forecastContainer = document.querySelector(".five-day-forecast-container");
var forecastDataEl = document.querySelectorAll(".forecast-data");
var newCitySaveEl = document.getElementById("saved-searches-list");
var savedSearchCitiesEl = document.querySelectorAll(".saved-search-cities");


// DATA
var APIKey = "fc22c201b21fb998ddae41f7cecb6958";
var city;
var queryURL;
var queryURLCurrent;
var savedSearches = [];

    // Date
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = mm + '/' + dd + '/' + yyyy;

currentCityDateEl.children[0].innerHTML = "(" + today + ")";

for (let i = 0; i < forecastContainer.children.length; i++) {
    newDay = new Date();
    newDate = String(newDay.getDate()+i+1).padStart(2, '0');
    forecastContainer.children[i].children[0].innerHTML = mm + "/" + newDate + "/" + yyyy;
};

// FUNCTIONS
    // Fetch API
        // Search city weather data
    // Display info on dashboard/page
        // Current Weather Container:
            // City, date, weather icon in header
            // Temp, wind, humidity
function getWeather(queryURLCurrent) {
    fetch(queryURLCurrent)
        .then(function (response) {
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
            liTemp.innerHTML = "Temp: " + temperature + " °F";
            liWind.innerHTML = "Wind: " + wind + " MPH";
            liHumidity.innerHTML = "Humidity: " + humidity + " %";
            currentDataEl.appendChild(liTemp);
            currentDataEl.appendChild(liWind);
            currentDataEl.appendChild(liHumidity);

            var currentCity = data.name;
            currentCityDateEl.children[0].innerHTML = currentCity + " (" + today + ")";

            var weatherCode = data.weather[0].icon;
            console.log(weatherCode);
            var weatherIcon = "https://openweathermap.org/img/wn/" + weatherCode + "@2x.png";
            var liWeather = document.createElement("img");
            liWeather.src = weatherIcon;
            currentCityDateEl.children[0].append(liWeather);

            if (!savedSearches.includes(currentCity)) {
                savedSearches.push(currentCity);
                localStorage.setItem("savedSearches", JSON.stringify(savedSearches));
                var liCity = document.createElement("li");
                liCity.classList.add("saved-search-cities");
                liCity.innerHTML = currentCity;
                newCitySaveEl.appendChild(liCity);
            }
        })
};

       // 5-day forecast:
            // Dark grey cards with date on top, weather icon, tmep, wind, humidity
function getForecast(queryURL) {
    fetch(queryURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var x = 0;
            for (let i = 0; i < data.list.length; i++) {
                forecastDay = new Date();
                forecastDate = String(newDay.getDate()+x+1).padStart(2, '0');
                var description = yyyy + "-" + mm + "-" + forecastDate + " 12:00:00";
                if (data.list[i].dt_txt == description) {
                    var liFTemp = document.createElement("li");
                    var liFWind = document.createElement("li");
                    var liFHumidity = document.createElement("li");
                    var liFIcon = document.createElement("img");
                    liFIcon.classList.add("forecast-icon");
                    iconCode = data.list[i].weather[0].icon;
                    iconF = "https://openweathermap.org/img/wn/" + iconCode + "@2x.png";
                    liFIcon.src = iconF;
                    liFTemp.innerHTML = "Temp: " + data.list[i].main.temp + " °F";
                    liFWind.innerHTML = "Wind: " + data.list[i].wind.speed + " MPH";
                    liFHumidity.innerHTML = "Humidity: " + data.list[i].main.humidity + " %";
                    forecastDataEl[x].appendChild(liFIcon);
                    forecastDataEl[x].appendChild(liFTemp);
                    forecastDataEl[x].appendChild(liFWind);
                    forecastDataEl[x].appendChild(liFHumidity);
                    x++;
                };
            };
        });
};

    // Save city to local storage
        // Input value becomes last city searched?
function renderSearches() {
    newCitySaveEl.innerHTML == "";
    for (let i = 0; i < savedSearches.length; i++) {
        var savedCity = savedSearches[i];
        var liSave = document.createElement("li");
        liSave.classList.add("saved-search-cities");
        liSave.innerHTML = savedCity;
        newCitySaveEl.appendChild(liSave);
    }
};

function init() {
    var storedSearches = JSON.parse(localStorage.getItem("savedSearches"));
    if (storedSearches !== null) {
        savedSearches = storedSearches;
    };
    renderSearches();
};

    
    // Clear existing displayed data
function clearPage() {
    searchButtonEl.innerHTML = "Search";
    currentCityDateEl.children[0].innerHTML = "(" + today + ")";
    while (currentDataEl.hasChildNodes()) {
        currentDataEl.removeChild(currentDataEl.firstChild);
    };
    for (let i = 0; i < forecastDataEl.length; i++) {
        while(forecastDataEl[i].hasChildNodes()) {
            forecastDataEl[i].removeChild(forecastDataEl[i].firstChild);
        };
    }
}

// USER INTERACTIONS
    // User inputs location into search box
    // User clicks on city in saved searches list

// INITIALIZATION

searchButtonEl.addEventListener("click", function() {
    city = searchInputEl.value;
    queryURLCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
    getWeather(queryURLCurrent);
    getForecast(queryURL);
    clearPage();
});

    // Click saved cities to load page as well



init();

newCitySaveEl.addEventListener("click", function(event) {
    var element = event.target;
    if (element.matches("li") === true) {
        city = element.innerHTML;
        queryURLCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
        queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
        getWeather(queryURLCurrent);
        getForecast(queryURL);
        clearPage();
    }
});