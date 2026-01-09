import {ALERT_SHOW_TIME, FILE_TYPES} from './constants.js';

const createIdGenerator = () => {
  let id = 0;
  return () => {
    id += 1;
    return id;
  };
};

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const showMessage = ({templateId, messageClass, innerClass, buttonClass}) => {
  const template = document.querySelector(templateId).content.cloneNode(true);
  const message = template.querySelector(messageClass);

  document.body.append(message);

  const close = () => {
    message.remove();
    document.removeEventListener('keydown', onEsc);
  };

  function onEsc(evt) {
    if (evt.key === 'Escape') {
      close();
    }
  }

  message.addEventListener('click', (evt) => {
    if (evt.target.closest(innerClass)) {
      return;
    }
    close();
  });

  message.querySelector(buttonClass).addEventListener('click', close);
  document.addEventListener('keydown', onEsc);
};

const showSuccessMessage = () => {
  showMessage({
    templateId: '#success',
    messageClass: '.success',
    innerClass: '.success__inner',
    buttonClass: '.success__button',
  });
};

const showErrorMessage = () => {
  showMessage({
    templateId: '#error',
    messageClass: '.error',
    innerClass: '.error__inner',
    buttonClass: '.error__button',
  });
};

const showLoadErrorMessage = (message) => {
  const template = document.querySelector('#data-error').content.cloneNode(true);
  const alertContainer = template.querySelector('.data-error');
  const titleElement = alertContainer.querySelector('.data-error__title');
  if (titleElement) {
    titleElement.textContent = message;
  }

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const uploadPreviewImage = () => {
  const form = document.querySelector('.img-upload__form');
  const fileInput = form.querySelector('.img-upload__input');
  const previewImage = form.querySelector('.img-upload__preview img');
  const effectsPreviews = form.querySelectorAll('.effects__preview');

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((type) =>
      fileName.endsWith(type)
    );

    if (matches) {
      const imageUrl = URL.createObjectURL(file);
      previewImage.src = imageUrl;
      effectsPreviews.forEach((preview) => {
        preview.style.backgroundImage = `url(${imageUrl})`;
      });
    }
  });
};

export {createIdGenerator, getRandomInteger, getRandomArrayElement, showErrorMessage, showSuccessMessage,
  debounce, showLoadErrorMessage, uploadPreviewImage};
