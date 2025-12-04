const state = {
    temp: 80,
};

const changeTempStyling = () => {
    let landscape = document.querySelector('#landscape');
    let temperature = document.querySelector('#temperature');

    if (state.temp >= 80) {
        temperature.style.color = 'red';
        landscape.textContent = '🌵__🐍_🦂_🌵🌵__🐍_🏜_🦂';
    } else if (state.temp >= 70) {
        temperature.style.color = 'orange';
        landscape.textContent = '🌸🌿🌼__🌷🌻🌿_☘️🌱_🌻🌷';
    } else if (state.temp >= 60) {
        temperature.style.color = 'yellow';
        landscape.textContent = '🌾🌾_🍃_🪨__🛤_🌾🌾🌾_🍃';
    } else if (state.temp >= 50) {
        temperature.style.color = 'green';
        landscape.textContent = '🌲🌲⛄️🌲⛄️🍂🌲🍁🌲🌲⛄️🍂🌲';
    } else {
        temperature.style.color = 'aqua';
    };
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
