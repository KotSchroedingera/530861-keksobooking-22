'use strict';

/*
* Модуль 2, утилитарные фнукции
* Как вариант, заменить на lodash
*/

const getRandomIntInclusive = function (min, max) {
  if (typeof max !== 'number' || typeof min !== 'number') return 'error';
  if (min < 0) return 'error';

  min = Math.ceil(min);
  max = Math.floor(max);

  if (min > max) return 'error';

  return Math.floor(Math.random() * (max - min + 1)) + min;
}


const getRandomFloat = function(min, max, signs = 0) {
  if (typeof max !== 'number' || typeof min !== 'number' || typeof signs !== 'number') return 'error';
  if (min < 0 || min > max) return 'error';
  if (min === max) return min;

  signs = parseInt(signs);

  // если надо целое, то отдельная функция
  if (signs === 0) {
    return getRandomIntInclusive(min, max);
  }

  return parseFloat((Math.random() * (max - min) + min).toFixed(signs));
}

/*
* Модуль 3, Генерация данных
*/

const APARTMENT_COUNTER = 10;
const APARTMENT_DATA = {
  types: ['palace', 'flat', 'house', 'bungalow'],
  checkTimeOptions: ['12:00', '13:00', '14:00'],
  features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  photos: [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
}

const createApatment = function(data) {
  const apartmentObject = {};
  const {types, checkTimeOptions, features, photos} = data;

  apartmentObject.author = {
    avatar: `img/avatars/user0${_.random(1, 8)}.png`,
  };

  apartmentObject.location = {
    x: getRandomFloat(35.65, 35.7, 5),
    y: getRandomFloat(139.7, 139.8, 5),
  }

  apartmentObject.offer = {
    title: 'Cozy Home',
    price: _.random(1, 9999),
    rooms: _.random(1, 5),
    guests: _.random(1, 8),
    description: 'Very useful description with a lot of information.',
    type: _.sample(types),
    checkin: _.sample(checkTimeOptions),
    checkout: _.sample(checkTimeOptions),
    features: _.sampleSize(features, _.random(0, _.size(features))),
    photos: _.sampleSize(photos, _.random(0, _.size(photos))),
    address: `${apartmentObject.location.x}, ${apartmentObject.location.y}`,
  };

  return apartmentObject;
}

const apartments = [];
for (let i = 0; i < APARTMENT_COUNTER; i++) {
  apartments.push(createApatment(APARTMENT_DATA));
}
