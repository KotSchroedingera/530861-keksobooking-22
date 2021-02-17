'use strict';

import {apartmentsArray} from './data.js';
import { changeElementContent, removeNodeIfEmpty } from './util.js';

const apartmentsHTML = document.createDocumentFragment();
const cardTemplate = document.querySelector('#card').content;

apartmentsArray.forEach(apartment => {

  const offer = cardTemplate.cloneNode(true);

  changeElementContent(offer, '.popup__title', apartment.offer.title);
  changeElementContent(offer, '.popup__text--address', apartment.offer.address);
  changeElementContent(offer, '.popup__text--price', `${apartment.offer.price} <span>₽/ночь</span>`, 'html');
  changeElementContent(offer, '.popup__text--capacity', `${apartment.offer.rooms} комнаты для ${apartment.offer.guests} гостей`);
  changeElementContent(offer, '.popup__text--time', `Заезд после ${apartment.offer.checkin}, выезд до ${apartment.offer.checkout}`);
  changeElementContent(offer, '.popup__description', apartment.offer.description);
  changeElementContent(offer, '.popup__avatar', apartment.author.avatar, 'src');

  const typeElement = offer.querySelector('.popup__type');
  switch (apartment.offer.type) {
    case 'flat':
      typeElement.textContent = 'Квартира';
      break;
    case 'bungalow':
      typeElement.textContent = 'Бунгало';
      break;
    case 'house':
      typeElement.textContent = 'Дом';
      break;
    case 'palace':
      typeElement.textContent = 'Дворец';
      break;
  }

  removeNodeIfEmpty(offer, '.popup__features', apartment.offer.features);
  if (offer.querySelector('.popup__features')) {
    const featuresList = offer.querySelector('.popup__features');
    featuresList.textContent = '';
    apartment.offer.features.forEach(feature => {
      const featuresItem = document.createElement('li');
      featuresItem.classList.add('popup__feature');
      switch (feature) {
        case 'wifi':
          featuresItem.classList.add('popup__feature--wifi');
          featuresList.appendChild(featuresItem);
          break;
        case 'dishwasher':
          featuresItem.classList.add('popup__feature--dishwasher');
          featuresList.appendChild(featuresItem);
          break;
        case 'parking':
          featuresItem.classList.add('popup__feature--parking');
          featuresList.appendChild(featuresItem);
          break;
        case 'washer':
          featuresItem.classList.add('popup__feature--washer');
          featuresList.appendChild(featuresItem);
          break;
        case 'elevator':
          featuresItem.classList.add('popup__feature--elevator');
          featuresList.appendChild(featuresItem);
          break;
        case 'conditioner':
          featuresItem.classList.add('popup__feature--conditioner');
          featuresList.appendChild(featuresItem);
          break;
      }
    });
  }

  removeNodeIfEmpty(offer, '.popup__photos', apartment.offer.photos);
  if (offer.querySelector('.popup__photos')) {
    const photos = offer.querySelector('.popup__photos');
    photos.innerHTML = '';
    apartment.offer.photos.forEach(photo => {
      const photoItem = document.createElement('img');
      photoItem.classList.add('popup__photo');
      photoItem.width = '45';
      photoItem.height = '40';
      photoItem.alt = 'Фотография жилья';
      photoItem.src = photo;
      photos.appendChild(photoItem);
    });
  }

  apartmentsHTML.appendChild(offer);

});

export {apartmentsHTML};
