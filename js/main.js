'use strict';

/* Returns random integer number from min to max, incl. min and max
* min, max = numbers
* returns 'error' if false input (min > max; not numbers)
* https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/
let getRandomIntInclusive = function (min, max) {
  if (typeof max !== 'number' || typeof min !== 'number') return 'error';

  min = Math.ceil(min);
  max = Math.floor(max);

  if (min > max) return 'error';

  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/* Returns float number form min to max, incl. min and max
* min, max: numbers; signs = number of signs after comma
* return 'error' if false input (min > max; not numbers)
* https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
*/
let getRandomFloat = function(min, max, signs = 0) {
  if (typeof max !== 'number' || typeof min !== 'number' || typeof signs !== 'number') return 'error';
  if (min > max) return 'error';
  if (min === max) return min;

  signs = parseInt(signs);

  // if Integer is required, then use function for Integers
  if (signs === 0) {
    return getRandomIntInclusive(min, max);
  }

  // return Float
  return (Math.random() * (max - min) + min).toFixed(signs);
}






