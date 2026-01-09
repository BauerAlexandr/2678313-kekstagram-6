import {HASHTAG_MAX_COUNT, HASHTAG_MAX_LENGTH, COMMENT_MAX_LENGTH, HASHTAGREGEX,
  SCALE_STEP, MIN_SCALE, MAX_SCALE, DEFAULT_SCALE
} from './constants.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './util.js';

function initImageForm() {
  const form = document.querySelector('.img-upload__form');
  const fileInput = form.querySelector('.img-upload__input');
  const overlay = form.querySelector('.img-upload__overlay');
  const cancelButton = form.querySelector('#upload-cancel');
  const hashtagsInput = form.querySelector('.text__hashtags');
  const commentInput = form.querySelector('.text__description');
  const submitButton = form.querySelector('.img-upload__submit');

  const scaleControlSmaller = form.querySelector('.scale__control--smaller');
  const scaleControlBigger = form.querySelector('.scale__control--bigger');
  const scaleControlValue = form.querySelector('.scale__control--value');
  const previewImage = form.querySelector('.img-upload__preview img');

  const setScale = (value) => {
    scaleControlValue.value = `${value}%`;
    scaleControlValue.setAttribute('value', `${value}%`);
    previewImage.style.transform = `scale(${value / 100})`;
  };

  const onSmallerButtonClick = () => {
    const currentValue = parseInt(scaleControlValue.value, 10);
    const newValue = Math.max(currentValue - SCALE_STEP, MIN_SCALE);
    setScale(newValue);
  };

  const onBiggerButtonClick = () => {
    const currentValue = parseInt(scaleControlValue.value, 10);
    const newValue = Math.min(currentValue + SCALE_STEP, MAX_SCALE);
    setScale(newValue);
  };

  const pristine = new window.Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextClass: 'pristine-error',
  });

  const normalizeHashtags = (value) => {
    if (!value || !value.trim()) {
      return [];
    }
    return value
      .trim()
      .split(/\s+/)
      .filter((tag) => tag.length > 0);
  };

  const validateHashtagCount = (value) => {
    const tags = normalizeHashtags(value);
    if (tags.length === 0) {
      return true;
    }
    return tags.length <= HASHTAG_MAX_COUNT;
  };

  const validateHashtagFormat = (value) => {
    const tags = normalizeHashtags(value);
    if (tags.length === 0) {
      return true;
    }
    return tags.every((t) => {
      if (t.length < 2) {
        return false;
      }
      if (t.length > HASHTAG_MAX_LENGTH) {
        return false;
      }
      if (!t.startsWith('#')) {
        return false;
      }
      if (t === '#') {
        return false;
      }
      return HASHTAGREGEX.test(t);
    });
  };

  const validateHashtagUnique = (value) => {
    const tags = normalizeHashtags(value);
    if (tags.length === 0) {
      return true;
    }
    const lowerTags = tags.map((t) => t.toLowerCase());
    const unique = new Set(lowerTags);
    return unique.size === lowerTags.length;
  };

  pristine.addValidator(hashtagsInput, validateHashtagCount, `Нельзя указать больше ${HASHTAG_MAX_COUNT} хэш-тегов`, 3, true);
  pristine.addValidator(hashtagsInput, validateHashtagFormat, 'Хэш-тег должен начинаться с # и содержать только буквы и цифры, длиной от 2 до 20 символов', 2, true);
  pristine.addValidator(hashtagsInput, validateHashtagUnique, 'Один и тот же хэш-тег не может быть использован дважды', 1, true);

  const validateCommentLength = (value) => value.length <= COMMENT_MAX_LENGTH;
  pristine.addValidator(commentInput, validateCommentLength, `Длина комментария не может составлять больше ${COMMENT_MAX_LENGTH} символов`);

  const stopEscPropagation = (evt) => {
    evt.stopPropagation();
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    const valid = pristine.validate();
    if (!valid) {
      const firstError = form.querySelector('.pristine-error');
      if (firstError) {
        firstError.scrollIntoView({block: 'center', behavior: 'smooth'});
      }
      return;
    }

    submitButton.disabled = true;

    sendData(new FormData(form))
      .then(() => {
        closeOverlay();
        showSuccessMessage();
      })
      .catch(() => {
        showErrorMessage();
      })
      .finally(() => {
        submitButton.disabled = false;
      });
  };

  const openOverlay = () => {
    overlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    setScale(DEFAULT_SCALE);
    document.addEventListener('keydown', onModalCloseKeydown);
    cancelButton.addEventListener('click', onCancelClick);
    hashtagsInput.addEventListener('keydown', stopEscPropagation);
    commentInput.addEventListener('keydown', stopEscPropagation);
    form.addEventListener('submit', onFormSubmit);
    scaleControlSmaller.addEventListener('click', onSmallerButtonClick);
    scaleControlBigger.addEventListener('click', onBiggerButtonClick);
  };

  function closeOverlay(){
    overlay.classList.add('hidden');
    document.body.classList.remove('modal-open');

    document.removeEventListener('keydown', onModalCloseKeydown);
    cancelButton.removeEventListener('click', onCancelClick);
    hashtagsInput.removeEventListener('keydown', stopEscPropagation);
    commentInput.removeEventListener('keydown', stopEscPropagation);
    form.removeEventListener('submit', onFormSubmit);
    scaleControlSmaller.removeEventListener('click', onSmallerButtonClick);
    scaleControlBigger.removeEventListener('click', onBiggerButtonClick);

    form.reset();
    fileInput.value = '';
    setScale(DEFAULT_SCALE);

    pristine.reset();
    submitButton.disabled = false;
  }

  function onModalCloseKeydown(evt) {
    if (evt.key === 'Escape') {
      if (document.querySelector('.error')) {
        return;
      }
      evt.preventDefault();
      closeOverlay();
    }
  }

  function onCancelClick(evt) {
    evt.preventDefault();
    closeOverlay();
  }

  fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
      openOverlay();
    }
  });

  hashtagsInput.addEventListener('input', () => {
    pristine.validate(hashtagsInput);
  });

  commentInput.addEventListener('input', () => {
    pristine.validate(commentInput);
  });
}

export {initImageForm};
