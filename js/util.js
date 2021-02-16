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

const getRandomElements = arr => shuffleArray(arr).slice(0, getRandomIntInclusive(0, arr.length));

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

const fillArray = (arr, cb, data, count) => {
  for (let i = 0; i < count; i++) {
    arr.push(cb(data));
  }
}

const changeElementContent = (parent, selector, content, type = 'text') => {
  if (typeof content === 'undefined') return;
  switch (type) {
    case 'text':
      parent.querySelector(selector).textContent = content;
      break;
    case 'html':
      parent.querySelector(selector).innerHTML = content;
      break;
    case 'src':
      parent.querySelector(selector).src = content;
      break;
  }
}

export {
  getRandomIntInclusive,
  getRandomFloat,
  getRandomElement,
  getRandomElements,
  shuffleArray,
  fillArray,
  changeElementContent
};

