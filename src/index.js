const state = {
    temp: 80,
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

const increaseTemp = () => {
    state.temp += 1;
    const tempContainer = document.querySelector('#temperature');
    tempContainer.textContent = `${state.temp}°`;
    changeTempStyling();
};

const decreaseTemp = () => {
    state.temp -= 1;
    const tempContainer = document.querySelector('#temperature');
    tempContainer.textContent = `${state.temp}°`;
    changeTempStyling();
};

const updateCityName = () => {
    let city = document.querySelector('#selectedCity').value;
    document.querySelector('#city').textContent = `${city}`;
};

const registerEventHandlers = () => {
  const increaseTempButton = document.querySelector('#increaseTemperature');
  increaseTempButton.addEventListener('click', increaseTemp);

  const decreaseTempButton = document.querySelector('#decreaseTemperature');
  decreaseTempButton.addEventListener('click', decreaseTemp);

  const setCityButton = document.querySelector('#selectedCity');
  setCityButton.addEventListener('input', updateCityName);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);