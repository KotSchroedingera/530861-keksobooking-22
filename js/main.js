'use strict';

import {apartmentsHTML} from './offers.js';

// const offersList = document.querySelector('#map-canvas');
// offersList.appendChild(apartmentsHTML);

const container = document.querySelector('body');
container.style.display = 'inline-flex';
container.prepend(apartmentsHTML);

document.querySelector('main').style.display = 'none';
document.querySelector('footer').style.display = 'none';




