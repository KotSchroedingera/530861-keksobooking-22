'use strict'

import { adForm, blockForm, mapFilters, pinIcon, map } from './map.js';
import { createApartmentsHTML } from './create-offers.js';

if (!adForm.classList.contains('ad-form--disabled')) {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      }
      blockForm(mapFilters);
      throw new Error(`Ошибка ${resp.status}: не удалось загрузить объявления. Однако, можно попробовать отправить своё.`);
    })
    .then(json => {
      let i = 0;
      const apartmentsHTML = createApartmentsHTML(json);
      json.forEach(apartment => {
        L.marker([apartment.location.lat, apartment.location.lng], {
          icon: pinIcon,
        }).addTo(map)
          .bindPopup(apartmentsHTML.querySelectorAll('.popup')[i]);
        i++;
      });
    })
    .catch(err => {
      const errorHTML = `<div style="
      position: fixed;
      z-index: 100;
      background-color: red;
      left: 0;
      width: 100vw;
      text-align: center;
      padding: 15px 0;
      " id="message-error-load-offers">${err.message}</div>`
      document.querySelector('main').insertAdjacentHTML('beforebegin', errorHTML);
      setTimeout(() => {
        document.querySelector('#message-error-load-offers').remove();
      }, 5000);
    })
}