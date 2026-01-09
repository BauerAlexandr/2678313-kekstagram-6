const NAMES = [
  'Ваня',
  'Гриша',
  'Мария',
  'Кристофор Колумб',
  'Роналдо',
  'Майкл Джексон',
  'Михаил Круг',
  'Алехандро',
];

const DESCRIPTIONS = [
  'Просто крутая фотка',
  'Здесь был Вася)',
  'Великолепные пейзажи',
  'Это что за чудо дивное',
  'Позвольте представить - Виктор',
  'Яблоки зеленые',
  'Небоскребы',
  'Великолепные виды',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const SIMILAR_PHOTOS_COUNT = 25;

const AVATAR_MIN = 1;
const AVATAR_MAX = 6;

const COMMENT_MESSAGES_MIN = 1;
const COMMENT_MESSAGES_MAX = 2;

const LIKES_MIN = 15;
const LIKES_MAX = 200;

const COMMENTS_MIN = 0;
const COMMENTS_MAX = 30;

const COMMENTS_BATCH = 5;

const HASHTAG_MAX_COUNT = 5;
const HASHTAG_MAX_LENGTH = 20;
const COMMENT_MAX_LENGTH = 140;
const HASHTAGREGEX = /^#[A-Za-zА-Яа-яЁё0-9]+$/;

const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const Method = {
  GET: 'GET',
  POST: 'POST',
};
const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

const ALERT_SHOW_TIME = 5000;

const RANDOM_COUNT = 10;

const FILTER = {
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

export {NAMES, DESCRIPTIONS, MESSAGES, SIMILAR_PHOTOS_COUNT, AVATAR_MIN,
  AVATAR_MAX, COMMENT_MESSAGES_MIN, COMMENT_MESSAGES_MAX, LIKES_MIN, LIKES_MAX, COMMENTS_MIN, COMMENTS_MAX, COMMENTS_BATCH,
  HASHTAG_MAX_COUNT, HASHTAG_MAX_LENGTH, COMMENT_MAX_LENGTH, HASHTAGREGEX, BASE_URL, Route, Method, ErrorText, ALERT_SHOW_TIME,
  RANDOM_COUNT, FILTER, FILE_TYPES, SCALE_STEP, MIN_SCALE, MAX_SCALE, DEFAULT_SCALE};
