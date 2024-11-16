'use strict'

// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

const API_KEY = "ab6cadfa2c566b17189d2a4ac5af4f12";
const URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".input-city");
const searchBtn = document.querySelector(".btn1");
const weatherIcon = document.querySelector(".weather-icon");
const errorMessage = document.querySelector(".error"); // Error message div

async function checkWeather(city) {
    const response = await fetch(URL + city + `&appid=${API_KEY}`);

    if (response.status == 404) {
        // Display error message if city is not found
        errorMessage.style.display = "block";
        document.querySelector(".city").innerHTML = "N/A";
        document.querySelector(".temp-heading").innerHTML = "N/A";
        document.querySelector(".speed").innerHTML = "Wind Speed: N/A";
        document.querySelector(".humidity").innerHTML = "Humidity: N/A";
        document.querySelector(".fahrenheit").innerHTML = "Fahrenheit: N/A";
        document.querySelector(".weater-info").innerHTML = "N/A";
    } else {
        // Hide the error message if data is fetched successfully
        errorMessage.style.display = "none";

        var data = await response.json();

        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp-heading").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".speed").innerHTML = "Wind Speed: " + data.wind.speed + " km/h";
        document.querySelector(".humidity").innerHTML = "Humidity: " + data.main.humidity + "%";
        document.querySelector(".fahrenheit").innerHTML = "Fahrenheit: " + Math.round(((data.main.temp) * 9 / 5) + 32) + "°F";
        document.querySelector(".weater-info").innerHTML = data.weather[0].main;

        // Change weather icon based on conditions
        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "img/cloud.jpg";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "img/clear.png";
        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "img/rain1.png";
        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "img/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "img/mist.png";
        }
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})