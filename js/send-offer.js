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

const showMessage = (id, closeButton) => {
  const messageTemplate = document.querySelector(`#${id}`).content;
  const message = messageTemplate.cloneNode(true);
  document.querySelector('main').append(message);
  
  const messageShown = document.querySelector(`.${id}`);
  document.addEventListener('keyup', evt => {
    if (evt.key === 'Escape') messageShown.remove();
  });
  document.addEventListener('click', () => {
    messageShown.remove();
  });
  if (closeButton) {
    document.querySelector(`.${id}__button`).addEventListener('click', () => {
      messageShown.remove();
    });
  }
}

adForm.addEventListener('submit', evt => {
  evt.preventDefault();
  fetch('https://22.javascript.pages.academy/keksobooking', {
    method: 'post',
    body: new FormData(evt.target),
  })
    .then(res => {
      if (res.ok) {
        resetApp();
        showMessage('success');
      } else {
        throw new Error;
      }
    })
    .catch(() => {
      showMessage('error', true);
    });
});