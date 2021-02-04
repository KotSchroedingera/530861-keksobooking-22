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

// Случайное перемешивание массива
// https://habr.com/ru/post/358094/
const shuffleArr = function(arr){
  let j, temp;
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random()*(i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
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

// const APARTMENT_TYPES = ['palace', 'flat', 'house', 'bungalow'];
// const APARTMENT_CHECK_TIMES = ['12:00', '13:00', '14:00'];
// const APARTMENT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
// const APARTMENT_PHOTOS = [
//   'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
//   'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
//   'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

const createApatment = function(data) {
  const apartmentObject = {};
  const {types, checkTimeOptions, features, photos} = data;

  // Функция выбора случайного элемента массива
  const getRandomElementFromArray = function (arr) {
    return arr[_.random(0, arr.length - 1)];
  }

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
    type: getRandomElementFromArray(types),
    checkin: getRandomElementFromArray(checkTimeOptions),
    checkout: getRandomElementFromArray(checkTimeOptions),
    features: _.slice(shuffleArr(features), 0, _.random(0, features.length - 1)),
    photos: _.slice(photos, 0, _.random(0, photos.length - 1)),
    address: `${apartmentObject.location.x}, ${apartmentObject.location.y}`,
  };

  console.log(apartmentObject.offer.address);
  return apartmentObject;
}

const apartments = [];
for (let i = 0; i < APARTMENT_COUNTER; i++) {
  apartments.push(createApatment(APARTMENT_DATA));
};
