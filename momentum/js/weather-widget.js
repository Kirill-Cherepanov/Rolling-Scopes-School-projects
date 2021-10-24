const cityInput = document.querySelector('input.city');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const weatherError = document.querySelector('.weather-error');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

async function setWeather() {
  weatherError.textContent = '';
  temperature.textContent = '';
  weatherDescription.textContent = '';
  wind.textContent = '';
  humidity.textContent = '';
  weatherIcon.className = 'weather-icon owf';

  const city = cityInput.value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=${globalSettings.language}&appid=5d756035dd854660fcb22f425be201e3&units=metric`;
  const result = await fetch(url);

  if (result.ok) {
    localStorage.setItem('city', cityInput.value);
    const data = await result.json();
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    if (globalSettings.language === 'en') {
      wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
      humidity.textContent = `Humidity: ${data.main.humidity}%`;
    } else {
      wind.textContent = `Скорость ветра: ${Math.round(data.wind.speed)} м/с`;
      humidity.textContent = `Влажнось: ${data.main.humidity}%`;
    }
  } else {
    if (globalSettings.language == 'en') {
      weatherError.textContent = `Error! City not found for '${city}'!`;
    } else {
      weatherError.textContent = `Ошибка! Город '${city}' не обнаружен!`;
    }
  }
}
cityInput.addEventListener('change', setWeather);
if (localStorage.getItem('city')) cityInput.value = localStorage.getItem('city');
setWeather();