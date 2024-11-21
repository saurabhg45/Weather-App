'use strict'

// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

const API_KEY = "ab6cadfa2c566b17189d2a4ac5af4f12";
const URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".input-city");
const searchBtn = document.querySelector(".btn1");
const weatherIcon = document.querySelector(".weather-icon");
const errorMessage = document.querySelector(".error"); // Error message div

async function checkWeather(city) {
    try {
        const response = await fetch(URL + city + `&appid=${API_KEY}`);
        
        if (!response.ok) { // General check for any response error
            errorMessage.style.display = "block";
            errorMessage.innerHTML = "City not found or an error occurred.";
            return; // Exit function if there's an error
        }

        errorMessage.style.display = "none"; // Hide error message
        const data = await response.json();

        console.log(data); // For debugging

        // Update weather details in DOM
        document.querySelector(".city").innerHTML = data.name || "N/A";
        document.querySelector(".temp-heading").innerHTML = Math.round(data.main.temp) + "°C" || "N/A";
        document.querySelector(".speed").innerHTML = "Wind Speed: " + data.wind.speed + " km/h" || "N/A";
        document.querySelector(".humidity").innerHTML = "Humidity: " + data.main.humidity + "%" || "N/A";
        document.querySelector(".fahrenheit").innerHTML = "Fahrenheit: " + Math.round(((data.main.temp) * 9 / 5) + 32) + "°F" || "N/A";
        document.querySelector(".weater-info").innerHTML = data.weather[0].main || "N/A";

        // Update weather icon
        const weatherCondition = data.weather[0].main;
        if (weatherCondition === "Clouds") {
            weatherIcon.src = "img/cloud.jpg";
        } else if (weatherCondition === "Clear") {
            weatherIcon.src = "img/clear.webp";
        } else if (weatherCondition === "Rain") {
            weatherIcon.src = "img/rain1.jpeg";
        } else if (weatherCondition === "Drizzle") {
            weatherIcon.src = "imgdrizzle.png";
        } else if (weatherCondition === "Mist") {
            weatherIcon.src = "img/cloud.jpg";
        } else {
            weatherIcon.src = "img/default.png"; // Fallback icon
        }
    } catch (error) {
        // Log the error and display a generic message
        console.error("Error fetching weather data:", error);
        errorMessage.style.display = "block";
        errorMessage.innerHTML = "An error occurred. Please try again.";
    }
}


searchBtn.addEventListener("click", () => {
    console.log("City entered:", searchBox.value); // Debugging
    if (searchBox.value.trim() !== "") {
        checkWeather(searchBox.value);
    } else {
        errorMessage.style.display = "block";
        errorMessage.innerHTML = "Please enter a city name.";
    }
});
