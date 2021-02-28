'use strict'

import { mainPin, mapInitialState, address, adForm, mapFilters } from './map.js';

const resetApp = () => {
  adForm.reset();
  mapFilters.reset();
  mainPin.setLatLng([mapInitialState.x, mapInitialState.y]);
  address.value = `${mapInitialState.x.toFixed(5)}, ${mapInitialState.y.toFixed(5)}`;
}

document.querySelector('.ad-form__reset').addEventListener('click', evt => {
  evt.preventDefault();
  resetApp();
});

offerForm.addEventListener('submit', evt => {
  evt.preventDefault();
  fetch('https://22.javascript.pages.academy/keksobooking', {
    method: 'post',
    body: new FormData(offerForm),
  })
    .then(resp => {
      if (resp.ok) {
        resetApp();
      } else {
        
      }
    });
});