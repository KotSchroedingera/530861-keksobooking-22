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

// чтобы Линтер не выдавал ошибку
getRandomFloat(1, 10, 2);

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
const APARTMENT_TYPES = ['palace', 'flat', 'house', 'bungalow'];
const APARTMENT_CHECK_TIMES = ['12:00', '13:00', '14:00'];
const APARTMENT_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const createApatment = function() {
  let apartmentObject = {};

  // author, объект — описывает автора. Содержит одно поле:
  // avatar, строка — адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} — это случайное число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д.
  apartmentObject.author = {
    avatar: `img/avatars/user0${_.random(1, 8)}.png`,
  };

  // offer, объект — содержит информацию об объявлении. Состоит из полей:
  apartmentObject.offer = {

    // title, строка — заголовок предложения. Придумайте самостоятельно.
    // price, число — стоимость. Любое положительное число.
    // rooms, число — количество комнат. Любое положительное число.
    // guests, число — количество гостей, которое можно разместить. Любое положительное число.
    // description, строка — описание помещения. Придумайте самостоятельно.
    title: 'Cozy Home',
    price: _.random(1, 9999),
    rooms: _.random(1, 5),
    guests: _.random(1, 8),
    description: 'Very useful description with a lot of information.',

    // type, строка — одно из четырёх фиксированных значений: palace, flat, house или bungalow.
    type: APARTMENT_TYPES[_.random(0, APARTMENT_TYPES.length - 1)],

    // checkin, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
    // checkout, строка — одно из трёх фиксированных значений: 12:00, 13:00 или 14:00.
    checkin: APARTMENT_CHECK_TIMES[_.random(0, APARTMENT_CHECK_TIMES.length - 1)],
    checkout: APARTMENT_CHECK_TIMES[_.random(0, APARTMENT_CHECK_TIMES.length - 1)],

    // features, массив строк — массив случайной длины из значений: wifi, dishwasher, parking, washer, elevator, conditioner. Значения не должны повторяться.
    // перемешиваем массив, затем выбираем случайное количество элементов в начале
    // если выбирать только случайное количество в начале, то последний элемент будет "выпадать" редко
    features: _.slice(shuffleArr(APARTMENT_FEATURES), 0, _.random(0, APARTMENT_FEATURES.length - 1)),

  };

  // address, строка — адрес предложения. Для простоты пусть пока составляется из географических координат по маске {{location.x}}, {{location.y}}.

  // photos, массив строк — массив случайной длины из значений: http://o0.github.io/assets/images/tokyo/hotel1.jpg, http://o0.github.io/assets/images/tokyo/hotel2.jpg, http://o0.github.io/assets/images/tokyo/hotel3.jpg.

  // location, объект — местоположение в виде географических координат. Состоит из двух полей:

  // x, число с плавающей точкой — широта, случайное значение от 35.65000 до 35.70000

  // y, число с плавающей точкой — долгота, случайное значение от 139.70000 до 139.80000

  console.log(apartmentObject.offer);
  return apartmentObject;

};

const apartments = [];
for (let i = 0; i < APARTMENT_COUNTER; i++) {
  apartments.push(createApatment());
}





