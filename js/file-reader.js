'use strict'

const avatarChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const previewAvatar = () => {
  const image = avatarChooser.files[0];
  const checkImage = () => {
    for (let type of FILE_TYPES) {
      if (image.name.match(type)) return true;
    }
    return false;
  }
  if (checkImage()) {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener('load', () => {
      avatarPreview.src = reader.result;
    });
  }
}

avatarChooser.addEventListener('change', previewAvatar);


const photoChooser = document.querySelector('#images');
const photoPreview = document.querySelector('.ad-form__photo');

const previewPhotos = () => {
  const photos = photoChooser.files;
  const photo = photoChooser.files[0];
  const checkImage = () => {
    for (let type of FILE_TYPES) {
      if (photo.name.match(type)) return true;
    }
    return false;
  }
  if (checkImage()) {
    const reader = new FileReader();
    reader.readAsDataURL(photo);
    reader.addEventListener('load', () => {
      photoPreview.style.backgroundImage = reader.result;
    });
  }
}

photoChooser.addEventListener('change', previewPhotos);










