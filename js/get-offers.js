'use strict'

import { adForm, blockForm, mapFilters, pinIcon, map } from './map.js';
import { createApartmentsHTML } from './create-offers.js';

const OFFERS_AMOUNT = 10;

if (!adForm.classList.contains('ad-form--disabled')) {

  let markersLayer;

  const addMarkers = json => {
    let i = 0;
    const markers = [];
    const apartmentsHTML = createApartmentsHTML(json.slice(0, OFFERS_AMOUNT));
    json.slice(0, OFFERS_AMOUNT).forEach(apartment => {
      const marker = L.marker([apartment.location.lat, apartment.location.lng], {
        icon: pinIcon,
      }).bindPopup(apartmentsHTML.querySelectorAll('.popup')[i]);
      markers.push(marker);
      i++;
    });
    markersLayer = L.layerGroup(markers).addTo(map);
  }

  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      blockForm(mapFilters);
      throw new Error(`Ошибка ${res.status}: не удалось загрузить объявления. Однако, можно попробовать отправить своё.`);
    })

    .then(json => {
      addMarkers(json);
      return json;
    })

    .then(json => {

      const type = mapFilters.querySelector('[name=housing-type]');
      const price = mapFilters.querySelector('[name=housing-price]');
      const prices = {
        'middle' : {
          'min' : 10000,
          'max' : 49999,
        },
        'low' : {
          'min': 0,
          'max': 9999,
        },
        'high' : {
          'min' : 50000,
          'max' : Infinity,
        },
      };
      const rooms = mapFilters.querySelector('[name=housing-rooms]');
      const guests = mapFilters.querySelector('[name=housing-guests]');
      const features = [
        'wifi',
        'dishwasher',
        'elevator',
        'parking',
        'conditioner',
        'washer',
      ]

      mapFilters.addEventListener('change', evt => {
        markersLayer.remove();

        const newJSON = json.slice();
        newJSON.forEach(elem => {
          elem.isAppropriate = true;
        });

        if (type.value !== 'any') {
          newJSON.forEach(elem => {
            if (elem.offer.type !== type.value) {
              elem.isAppropriate = false;
            }
          });
        }

        if (price.value !== 'any') {
          newJSON.forEach(elem => {
            switch (price.value) {
              case 'low':
                if (elem.offer.price > prices.low.max) elem.isAppropriate = false;
                break;
              case 'middle':
                if ((elem.offer.price < prices.middle.min) || (elem.offer.price > prices.middle.max)) elem.isAppropriate = false;
                break;
              case 'high':
                if (elem.offer.price < prices.high.min) elem.isAppropriate = false;
                break;
            }
          });
        }

        if (rooms.value !== 'any') {
          newJSON.forEach(elem => {
            if (elem.offer.rooms.toString() !== rooms.value) elem.isAppropriate = false;
          });
        }

        if (guests.value !== 'any') {
          newJSON.forEach(elem => {
            if (elem.offer.guests.toString() !== guests.value) elem.isAppropriate = false;
          });
        }

        if (document.querySelector('#filter-wifi').checked) {
          newJSON.forEach(elem => {
            if (!elem.offer.features.some(feature => feature === 'wifi')) elem.isAppropriate = false;
          });
        }

        features.forEach(filterValue => {
          if (document.querySelector(`#filter-${filterValue}`).checked) {
            newJSON.forEach(elem => {
              if (!elem.offer.features.some(feature => feature === filterValue)) elem.isAppropriate = false;
            });
          }
        });

        addMarkers(newJSON.filter(elem => elem.isAppropriate === true));
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