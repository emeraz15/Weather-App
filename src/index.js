let now = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
let currentDay = days[now.getDay()];
let currentDate = now.getDate();
let months = [
  "Jan",
  "Feb",
  "March",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let currentMonth = months[now.getMonth()];

let currentYear = now.getFullYear();
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let date = document.querySelector(".date");
console.log(date);
date.innerHTML = `${currentDay} ${currentMonth} ${currentDate} ${currentYear} ${hours}:${minutes}`;

function updateCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city");
  let cityname = document.querySelector(".location");
  cityname.innerHTML = `${city.value}`;
  let apiKey = "5d8667ee7b2450bd924cdffccf269c9a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=imperial`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemp);
}

let cityform = document.querySelector("#city-form");
cityform.addEventListener("submit", updateCity);

function Celsius() {
  let degree = document.querySelector(".current-temp");
  let temperature = degree.innerHTML;
  degree.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", Celsius);

function Fahrenheit() {
  let degree = document.querySelector(".current-temp");
  let temperature = degree.innerHTML;
  degree.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", Fahrenheit);

function displayTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  console.log(response);
  console.log(temperature);
  let degree = document.querySelector(".current-temp");
  degree.innerHTML = `${temperature}`;
  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector(".humidity");
  humidityElement.innerHTML = `${humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  let windSpeed = document.querySelector(".wind");
  windSpeed.innerHTML = `${wind}mph`;
}

function displayCurrentcity(response) {
  let cityName = response.data.name;
  let displayCity = document.querySelector(".location");
  displayCity.innerHTML = `${cityName}`;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  console.log(latitude);
  let longitude = position.coords.longitude;
  console.log(longitude);
  let apiKey = "5d8667ee7b2450bd924cdffccf269c9a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(`${apiUrl}`).then(displayTemp);
  axios.get(`${apiUrl}`).then(displayCurrentcity);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-btn");
currentButton.addEventListener("click", getCurrentPosition);
