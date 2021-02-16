'use strict';

import {apartmentsArray} from './data.js';

const apartmentsHTML = document.createDocumentFragment();
const cardTemplate = document.querySelector('#card').content;

apartmentsArray.forEach(apartment => {

  const offer = cardTemplate.cloneNode(true);

  offer.querySelector('.popup__title').textContent = apartment.offer.title;

  offer.querySelector('.popup__text--address').textContent = apartment.offer.address;

  offer.querySelector('.popup__text--price').innerHTML = `${apartment.offer.price} <span>₽/ночь</span>`;

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

  offer.querySelector('.popup__text--capacity').textContent = `${apartment.offer.rooms} комнаты для ${apartment.offer.guests} гостей`;

  offer.querySelector('.popup__text--time').textContent = `Заезд после ${apartment.offer.checkin}, выезд до ${apartment.offer.checkout}`;

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
    };

    offer.querySelector('.popup__description').textContent = apartment.offer.description;

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

    offer.querySelector('.popup__avatar').src = apartment.author.avatar;

  });




  apartmentsHTML.appendChild(offer);

});

export {apartmentsHTML};
