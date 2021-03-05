'use strict'

const type = document.querySelector('#type');
const price = document.querySelector('#price');
const pricesList = {
  'bungalow' : 0,
  'flat' : 1000,
  'house' : 5000,
  'palace' : 10000,
}

const timein = document.querySelector('#timein');
const timeout = document.querySelector('#timeout');

type.addEventListener('change', () => {
  for (let key in pricesList) {
    if (key === type.value) {
      price.placeholder = pricesList[key];
      price.min = pricesList[key];
    }
  }
});

timein.addEventListener('change', () => {
  timeout.value = timein.value;
});

timeout.addEventListener('change', () => {
  timein.value = timeout.value;
});

const priceValidationMessage = `Для типа '${type.selectedOptions[0].innerText}' цена от ${price.min}`;
price.setCustomValidity(priceValidationMessage);