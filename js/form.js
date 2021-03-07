'use strict'

import { setColor } from './util.js';

const type = document.querySelector('#type');
const price = document.querySelector('#price');
const priceLabel = document.querySelector('.ad-form__label[for="price"]');
const pricesList = {
  'bungalow' : 0,
  'flat' : 1000,
  'house' : 5000,
  'palace' : 10000,
}
const validatePrice = () => {
  for (let key in pricesList) {
    if (key === type.value) {
      price.placeholder = pricesList[key];
      price.min = pricesList[key];
    }
  }
  const priceValidationMessage = `Для типа '${type.selectedOptions[0].innerText}' цена от ${price.min} руб.`;
  price.setCustomValidity(priceValidationMessage);
  +price.value < +price.min ? setColor(priceLabel, 'red') : setColor(priceLabel, 'inherit');
}

if (!price.min) validatePrice();
type.addEventListener('change', () => validatePrice());
price.addEventListener('input', () => validatePrice());

const timein = document.querySelector('#timein');
const timeout = document.querySelector('#timeout');

timein.addEventListener('change', () => {
  timeout.value = timein.value;
});

timeout.addEventListener('change', () => {
  timein.value = timeout.value;
});

