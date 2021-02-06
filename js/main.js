'use strict';

const getRandomIntInclusive = (min, max) => {
  if (typeof max !== 'number' || typeof min !== 'number') return 'error';
  if (min < 0) return 'error';

  min = Math.ceil(min);
  max = Math.floor(max);

  if (min > max) return 'error';

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomFloat = (min, max, signs = 0) => {
  if (typeof max !== 'number' || typeof min !== 'number' || typeof signs !== 'number') return 'error';
  if (min < 0 || min > max) return 'error';
  if (min === max) return min;

  signs = parseInt(signs);

  if (signs === 0) {
    return getRandomIntInclusive(min, max);
  }

  return parseFloat((Math.random() * (max - min) + min).toFixed(signs));
}

const getRandomElement = arr => arr[getRandomIntInclusive(0, arr.length - 1)];

const shuffleArray = arr => {
  let j, temp;
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random()*(i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
}

const getRandomElements = arr => shuffleArray(arr).slice(0, getRandomIntInclusive(0, arr.length));

const fillArray = (arr, cb, data, count) => {
  for (let i = 0; i < count; i++) {
    arr.push(cb(data));
  }
}

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

const createApartment = data => {
  const apartmentObject = {};
  const {types, checkTimeOptions, features, photos} = data;

  apartmentObject.author = {
    avatar: `img/avatars/user0${getRandomIntInclusive(1, 8)}.png`,
  };

  apartmentObject.location = {
    x: getRandomFloat(35.65, 35.7, 5),
    y: getRandomFloat(139.7, 139.8, 5),
  }

  apartmentObject.offer = {
    title: 'Cozy Home',
    price: getRandomIntInclusive(1, 9999),
    rooms: getRandomIntInclusive(1, 5),
    guests: getRandomIntInclusive(1, 8),
    description: 'Very useful description with a lot of information.',
    type: getRandomElement(types),
    checkin: getRandomElement(checkTimeOptions),
    checkout: getRandomElement(checkTimeOptions),
    features: getRandomElements(features),
    photos: getRandomElements(photos),
    address: `${apartmentObject.location.x}, ${apartmentObject.location.y}`,
  };

  return apartmentObject;
}

let apartments = [];
fillArray(apartments, createApartment, APARTMENT_DATA, APARTMENT_COUNTER);
