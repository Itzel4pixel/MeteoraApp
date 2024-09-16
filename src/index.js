// Date Function to display current date and time
function formatDate() {
    const now = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = days[now.getDay()];
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    document.querySelector("#current-date").innerHTML = `${day} ${hours}:${minutes}`;
}

// Call formatDate to set the current date on page load
formatDate();

// Handle searched city submission
function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission
    const city = document.querySelector("#enter-city-input").value.trim(); // Get input value
    if (city) {
        searchCity(city); // Call searchCity function
    } else {
        alert("Please enter a valid city name.");
    }
}

// Function to search for the weather of a city using SheCodes API
function searchCity(city) {
    const apiKey = "aba98af04e880bo6fed8t13fe5103430"; // Use your actual API key
    const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiUrl)
        .then(showWeather) // Call showWeather if the request is successful
        .catch(err => {
            console.error("Error fetching weather data:", err);
            alert("Could not find the city. Please try again."); // Alert for not finding city
        });
}

// Update weather display
function showWeather(response) {
    // Access and set the weather data from the API response
    const celsiusTemperature = Math.round(response.data.temperature.current);

    // Update HTML elements with API response data
    document.querySelector("#searched-city").innerHTML = response.data.city; // Display city name
    document.querySelector("#temperature").innerHTML = celsiusTemperature; // Display temperature
    document.querySelector("#weather-description").innerHTML = response.data.condition.description; // Weather description
    document.querySelector("#humidity").innerHTML = response.data.temperature.humidity; // Display humidity
    document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed); // Display wind speed

    // Set the weather icon using the icon URL from the API response
    const iconUrl = response.data.condition.icon_url; // Get the icon URL
    document.querySelector("#main-icon").setAttribute("src", iconUrl);
    document.querySelector("#main-icon").setAttribute("alt", response.data.condition.description); // Set alt text for the icon
}

// Event listener for the city search form submission
document.querySelector("#city-form").addEventListener("submit", handleSubmit);

// Optional: You can add logic to handle current location if needed
// ...
