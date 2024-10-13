document.addEventListener("DOMContentLoaded", () => {
    const locationElement = document.getElementById("location");
    const temperatureElement = document.getElementById("temperature");
    const descriptionElement = document.getElementById("description");
    const humidityElement = document.getElementById("humidity");
    const windSpeedElement = document.getElementById("wind-speed");
    const weatherIconElement = document.getElementById("weather-icon");
    const cityInput = document.getElementById("city-input");
    const searchButton = document.getElementById("search-button");

    const apiKey = "ae9eee691a14d73a87998782c815304a";  // OpenWeatherMap API key

    function fetchWeather(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                locationElement.textContent = `${data.name}, ${data.sys.country}`;
                temperatureElement.textContent = `${data.main.temp} °C`;
                descriptionElement.textContent = capitalizeFirstLetter(data.weather[0].description);
                humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
                windSpeedElement.textContent = `Wind Speed: ${data.wind.speed} m/s`;
                weatherIconElement.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            })
            .catch(error => {
                locationElement.textContent = "Unable to retrieve weather data";
                console.error("Error fetching weather data:", error);
            });
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
            fetchWeather(url);
        }, error => {
            locationElement.textContent = "Geolocation is not enabled";
            console.error("Error retrieving location:", error);
        });
    } else {
        locationElement.textContent = "Geolocation is not supported by this browser";
    }

    searchButton.addEventListener("click", () => {
        const city = cityInput.value;
        if (city) {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
            fetchWeather(url);
        }
    });

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});

