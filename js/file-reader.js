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
  const checkImage = image => {
    for (let type of FILE_TYPES) {
      if (image.name.match(type)) return true;
    }
    return false;
  }
  for (let photo of photos) {
    if (checkImage(photo)) {
      const reader = new FileReader();
      reader.readAsDataURL(photo);
      reader.addEventListener('load', () => {
        photoPreview.style.width = 'inherit';
        photoPreview.style.display = 'contents';
        photoPreview.insertAdjacentHTML('beforeend', `<img style='margin-right: 10px; margin-bottom: 10px; display: inline-block; background-color: #e4e4de' src='${reader.result}' width='70' height='70'>`);
      });
    }
  }
}

photoChooser.addEventListener('change', previewPhotos);