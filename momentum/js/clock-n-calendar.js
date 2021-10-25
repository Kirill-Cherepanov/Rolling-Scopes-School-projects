const time = document.querySelector('time.time');
const date = document.querySelector('date.date');
const greeting = document.querySelector('.greeting');
const username = document.getElementById('username');

// Setting Time clock
setInterval(() => {
  time.innerText = (new Date()).toLocaleTimeString()
}, 1000);

// Setting Date
function setDate() {
  const DATE_INT = {
    en: {
      DAYS: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ],
      MONTHS: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'Septembe',
        'October',
        'November',
        'December',
      ],
    },
    ru: {
      DAYS: [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота',
      ],
      MONTHS: [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь',
      ],
    },
  };
  const DAYS = DATE_INT[globalSettings.language].DAYS;
  const MONTHS = DATE_INT[globalSettings.language].MONTHS;
  let curDate = new Date();
  date.innerText = `${DAYS[curDate.getDay()]}, ${MONTHS[curDate.getMonth()]} ${curDate.getDate()}`;
};

// Setting Greetings message
function setGreetings() {
  let curHour = (new Date()).toLocaleTimeString().split(':')[0];
  if (globalSettings.language === 'en') {
    if (curHour >= 0 && curHour < 6) greeting.innerText = "What a Nice Night, ";
    if (curHour >= 6 && curHour < 12) greeting.innerText = 'Good Morning, ';
    if (curHour >= 12 && curHour < 18) greeting.innerText = 'Good Afternoon, ';
    if (curHour >= 18) greeting.innerText = 'Good Evening, ';
  } else {
    if (curHour >= 0 && curHour < 6) greeting.innerText = "Доброй ночи, ";
    if (curHour >= 6 && curHour < 12) greeting.innerText = 'Доброе утро, ';
    if (curHour >= 12 && curHour < 18) greeting.innerText = 'Добрый день, ';
    if (curHour >= 18) greeting.innerText = 'Добрый вечер, ';
  }
}

setDate();
setGreetings();
setInterval(() => {
  setDate();
  setGreetings();
}, 30000);

// Translating Username
if (globalSettings.language == 'en') username.placeholder = '[Enter name]';
else username.placeholder = '[Введите имя]';

// Savign/Accessing Username in local storage
if (localStorage.getItem('username')) {
  username.value = localStorage.getItem('username');
}
username.addEventListener('change', (e) => {
  localStorage.setItem('username', username.value);
});