"use strict";
const api = {
  key: "02bfcc096cc100935f639542c1143638",
  baseUrl: "https://api.openweathermap.org/data/2.5/",
};

const searchBox = document.querySelector(".search-box"),
  city = document.querySelector(".city"),
  temp = document.querySelector(".temp"),
  weatherEl = document.querySelector(".weather"),
  hiLow = document.querySelector(".hi-low");

searchBox.addEventListener("keyup", setQuery);

function setQuery(e) {
  if (e.keyCode == 13) {
    getResults(searchBox.value);
    console.log(searchBox.value);
    searchBox.value = "";
  }
}

function getResults(query) {
  fetch(`${api.baseUrl}weather?q=${query}&units=metric&appid=${api.key}`)
    .then((weather) => weather.json())
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  city.textContent = `${weather.name}, ${weather.sys.country}`;
  temp.innerHTML = `${Math.round(weather.main.temp)} <span>°C</span>`;
  hiLow.textContent = `${Math.round(weather.main.temp_min)} °C / ${Math.round(weather.main.temp_max)} °C`;
  let now = new Date();
  let date = document.querySelector(".date");
  date.innerHTML = dateBuilder(now);
  weatherEl.innerHTML = weather.weather[0].main;
}
function dateBuilder(s) {
  let months = [
      "January",
      "Fabruary",
      "March",
      "Aprel",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    weekDays = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Sunday",
      "Saturday",
    ];
  let day = weekDays[s.getDay()],
    date = s.getDate(),
    month = months[s.getMonth()],
    year = s.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

