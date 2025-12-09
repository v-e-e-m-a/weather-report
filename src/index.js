const state = {
  city: 'Pompano Beach',
  temp: null,
};

const tempRules = [
  {
    min: 80,
    color: 'red',
    landscape: '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂'
  },
  {
    min: 70,
    color: 'orange',
    landscape: '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷'
  },
  {
    min: 60,
    color: 'yellow',
    landscape: '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃'
  },
  {
    min: 50,
    color: 'green',
    landscape: '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲'
  },
  {
    min: -Infinity,
    color: 'aqua',
    landscape: '❄️❄️☃️⛄️❄️☁️🌨❄️❄️'
  }
];

const skyOptions = [{
  sky: 'sunny',
  display: '☁️ ☁️ ☁️ ☀️ ☁️ ☁️ ☁️',
  background: 'lightskyblue',
},
{
  sky:'cloudy',
  display: '☁️☁️ ☁️ ☁️☁️ ☁️ 🌤 ☁️ ☁️☁️ ☁️ ☁️☁️',
  background: 'gray',
},
{
  sky:'rainy',
  display: '🌧🌈⛈🌧🌧💧⛈🌧🌦🌧💧🌧🌧',
  background: 'lightsteelblue',
},
{
  sky: 'snowy',
  display: '🌨❄️🌨🌨❄️❄️🌨❄️🌨❄️❄️🌨🌨',
  background:'lightcyan',
}
];

const changeTempStyling = () => {
  const landscape = document.querySelector('#landscape');
  const temperature = document.querySelector('#temperature');

  const rule = tempRules.find(rule => state.temp >= rule.min);

  temperature.style.color = rule.color;
  landscape.textContent = rule.landscape;
};

const updateTemp = () => {
  const tempContainer = document.querySelector('#temperature');
  tempContainer.textContent = `${state.temp}°`;
  changeTempStyling();
};

const increaseTemp = () => {
  state.temp += 1;
  updateTemp();
};

const decreaseTemp = () => {
  state.temp -= 1;
  updateTemp();
};

const updateCityName = () => {
  state.city = document.querySelector('#selectedCity').value;
  if (state.city === '') { // Resets city to default if you try to update the city while the input box is blank
    resetCity();
  } else {
    document.querySelector('#city').textContent = `${state.city}`;
    changeTempWithCity(state.city);
  };
};

const changeTempWithCity = () => {
  findLatitudeAndLongitude(state.city)
    .then((newTemp) => {
      state.temp = newTemp;
      updateTemp();
      return newTemp;
    })
    .catch((error) => {
      console.log('Error updating temp:', error);
    });
};

const resetCity = () => {
  state.city = 'Pompano Beach';
  document.querySelector('#city').textContent = `${state.city}`;
  changeTempWithCity(state.city);
};

const changeSky = (event) => {
  let skyDisplay = document.querySelector('#skyDisplay');
  let weatherContainer = document.querySelector('#weather-report');
  let increaseTemperatureButton = document.querySelector('#increaseTemperature');
  let decreaseTemperatureButton = document.querySelector('#decreaseTemperature');
  let rule = skyOptions.find(rule => event.target.value === rule.sky);
  skyDisplay.textContent = rule.display;
  weatherContainer.style.background = rule.background;
  increaseTemperatureButton.style.background = rule.background;
  decreaseTemperatureButton.style.background = rule.background;
};

// Wave 4 API

const findLatitudeAndLongitude = (query) => {
  return axios
    .get('https://ada-weather-report-proxy-server.onrender.com/location', {
      params: {
        q: query,
      },
    })
    .then((response) => {
      //console.log(response.data);
      const lat = response.data[0].lat;
      const lon = response.data[0].lon;
      const temp = findWeather(lat, lon);
      return temp;
    })
    .catch((error) => {
      console.log('error!', error);
    });
};

const findWeather = (lat, lon)=>{
  return axios
    .get('https://ada-weather-report-proxy-server.onrender.com/weather', {
      params: {
        lat: lat,
        lon: lon,
      },
    })
    .then((response) => {
      let tempKelvin = response.data.main.temp;
      let tempFahrenheit = Math.round((tempKelvin - 273.15) * (9 / 5) + 32);
      return tempFahrenheit;
    })
    .catch((error) => {
      console.log('error!', error);
    });
};

const registerEventHandlers = () => {
  const increaseTempButton = document.querySelector('#increaseTemperature');
  increaseTempButton.addEventListener('click', increaseTemp);

  const decreaseTempButton = document.querySelector('#decreaseTemperature');
  decreaseTempButton.addEventListener('click', decreaseTemp);

  const setCityButton = document.querySelector('#updateCity');
  setCityButton.addEventListener('click', updateCityName);

  const resetCityButton = document.querySelector('#resetCity');
  resetCityButton.addEventListener('click', resetCity);

  const skySelector = document.querySelector('#skySelector');
  skySelector.addEventListener('change', changeSky);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers, changeTempWithCity());
