import {
  getRandomIntInclusive,
  getRandomFloat,
  getRandomElement,
  getRandomElements,
  fillArray
} from './util.js';

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

const APARTMENT_COUNTER = 10;
const apartmentsArray = [];
fillArray(apartmentsArray, createApartment, APARTMENT_DATA, APARTMENT_COUNTER);

export {
  apartmentsArray
};
