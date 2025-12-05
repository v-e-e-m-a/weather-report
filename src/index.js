

const state = {
    temp: 80,
    city: 'Pompano Beach'
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
}

const increaseTemp = () => {
    state.temp += 1;
    updateTemp();
    changeTempStyling();
};

const decreaseTemp = () => {
    state.temp -= 1;
    updateTemp();
    changeTempStyling();
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

const changeTempWithCity = (city) => {
  findLatitudeAndLongitude(city)
    .then((newTemp) => {
      console.log(`New temp: ${newTemp}`);
      state.temp = newTemp;
      updateTemp();
    })
    .catch((error) => {
      console.log("Error updating temp:", error);
    });
};

const resetCity = () => {
    state.city = 'Pompano Beach';
    document.querySelector('#city').textContent = `${state.city}`;
    changeTempWithCity(state.city);
}

const registerEventHandlers = () => {
  const increaseTempButton = document.querySelector('#increaseTemperature');
  increaseTempButton.addEventListener('click', increaseTemp);

  const decreaseTempButton = document.querySelector('#decreaseTemperature');
  decreaseTempButton.addEventListener('click', decreaseTemp);

  const setCityButton = document.querySelector('#updateCity');
  setCityButton.addEventListener('click', updateCityName);

  const resetCityButton = document.querySelector('#resetCity');
  resetCityButton.addEventListener('click', resetCity);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);

// Wave 4 API

const findLatitudeAndLongitude = (query) => {
    return axios
    .get('http://localhost:5000/location', {
      params: {
        q: query,
      },
    })
    .then((response) => {
      //console.log(response.data);
      const lat = response.data[0].lat;
      const lon = response.data[0].lon;
      console.log(lat, lon);
      const temp = findWeather(lat, lon);
      return temp;
    })
    .catch((error) => {
      console.log('error!', error);
    });
  };
  
const findWeather = (lat, lon)=>{
  return axios
    .get('http://localhost:5000/weather', {
      params: {
        lat: lat,
        lon: lon,
      },
    })
    .then((response) => {
      let tempKelvin = response.data.main.temp;
      let tempFahrenheit = Math.round((tempKelvin - 273.15) * (9 / 5) + 32);
      console.log(tempFahrenheit);
      return tempFahrenheit;
    })
    .catch((error) => {
      console.log('error!', error);
    });
};