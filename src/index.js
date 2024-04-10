const apiKey = '4dd1b405ded1d46a88a5e704605e9dcc';

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
  let temperatureElement = document.querySelector("#current-temperature");
  
  let city = searchInputElement.value.trim(); // Get the value entered by the user and remove leading/trailing spaces
  cityElement.innerHTML = city;

  // Fetch weather data for the searched city
  fetchWeatherData(city)
    .then(data => {
      // Extract temperature from the data
      let temperature = data.main.temp;
      temperatureElement.innerHTML = `${temperature}°C`;
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      temperatureElement.innerHTML = "N/A"; // Display N/A if there's an error fetching data
    });
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function fetchWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    });
}
