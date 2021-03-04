'use strict'

import { adForm, blockForm, mapFilters, pinIcon, map } from './map.js';
import { createApartmentsHTML } from './create-offers.js';

const OFFERS_AMOUNT = 10;

if (!adForm.classList.contains('ad-form--disabled')) {

  let initialJSON;
  let currentJSON;
  let markersLayer;

  const addMarkers = (json, map) => {
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
      addMarkers(json, map);
      currentJSON = json.slice();
    })

    .then(json => {

      const typesElement = mapFilters.querySelector('[name=housing-type]');
      const types = [
        'any',
        'palace',
        'flat',
        'house',
        'bungalow'
      ]
      const pricesElement = mapFilters.querySelector('[name=housing-price]');
      const prices = [
        'any',
        'middle',
        'low',
        'high'
      ];
      const roomsElement = mapFilters.querySelector('[name=housing-rooms]');
      const rooms = [
        'any',
        '1',
        '2',
        '3'
      ];
      const guestsElement = mapFilters.querySelector('[name=housing-guests]');
      const guests = [
        'any',
        '0',
        '1',
        '2'
      ];
      const featuresElement = mapFilters.querySelector('[name=housing-guests]');
      const features = [
        'any',
        'wifi',
        'dishwasher',
        'parking',
        'washer',
        'elevator',
        'conditioner'
      ];

      mapFilters.addEventListener('change', evt => {
        markersLayer.remove();

        const filterName = evt.target.name;
        const filterValue = evt.target.value;
        console.log(filterName, filterValue);

        const newJSON = [];

        const applyFilter = param => {

        }

        if (filterName === 'housing-type') {
          switch (filterValue) {
            case 'palace':
              currentJSON.forEach(elem => {
                if (elem.offer.type === 'palace') newJSON.push(elem);
              });
              addMarkers(newJSON, map);
              currentJSON = newJSON.slice();
              break;
              case 'flat':
                currentJSON.forEach(elem => {
                  if (elem.offer.type === 'flat') newJSON.push(elem);
                });
                addMarkers(newJSON, map);
                currentJSON = newJSON.slice();
                break;
          }
        }
      })
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