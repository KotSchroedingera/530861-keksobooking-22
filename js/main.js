'use strict';


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






