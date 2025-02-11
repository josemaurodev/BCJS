const api = "75fbfa01bb0b765a9aa2f3ddbc5e5912";
const apiCountryURLBeg = "https://flagsapi.com/";
const apiCountryURLEnd = "/flat/64.png";

const cityInput = document.querySelector("#city-input");
const searchButton = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");
const errorMessage = document.querySelector("#error-message"); //

searchButton.addEventListener("click", (e) => {
  e.preventDefault();

  const city = cityInput.value;
  console.log(city);

  if (city) {
    showWeatherData(city);
  } else {
    console.log("Digite o nome de uma cidade");
  }
});

const getWeatherData = async (city) => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api}&lang=pt_br`;

  const res = await fetch(apiWeatherURL);
  const data = await res.json();
  console.log(data);

  return data;
};

const showWeatherData = async (city) => {
  const data = await getWeatherData(city);

  if (data.cod === "404") {
    weatherContainer.classList.add("hide");
    errorMessage.classList.remove("hide");
    errorMessage.innerText = `A cidade "${city}" não consta na nossa base de dados.`;
  } else {
    weatherContainer.classList.remove("hide");
    errorMessage.classList.add("hide");

    const getCountry = data.sys.country;
    console.log(getCountry);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    );
    countryElement.setAttribute(
      "src",
      `${apiCountryURLBeg}${getCountry}${apiCountryURLEnd}`
    );
    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;
  }
};

cityInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    const city = e.target.value;
    showWeatherData(city);
  }
});
