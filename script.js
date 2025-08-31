const apiKey = "d1a2bfc1594841d1a5255708253008";
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city !== "") {
    fetchWeather(city);
  } else {
    alert("Please enter a city name!");
  }
});

async function fetchWeather(city) {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    document.getElementById("cityName").innerText = `${data.location.name}, ${data.location.country}`;
    document.getElementById("temperature").innerText = data.current.temp_c;
    document.getElementById("feelsLike").innerText = data.current.feelslike_c;
    document.getElementById("humidity").innerText = data.current.humidity;
    document.getElementById("condition").innerText = data.current.condition.text;
    document.getElementById("weatherIcon").src = `https:${data.current.condition.icon}`;

    document.getElementById("weatherResult").classList.remove("hidden");
  } catch (error) {
    alert("❌ Could not fetch weather data. Try again!");
  }
}

// Auto-detect user location
window.onload = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert("Geolocation is not supported by your browser.");
  }
};

function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  fetchWeather(`${latitude},${longitude}`);
}

function error() {
  alert("⚠️ Location access denied. Please enter your city manually.");
}
