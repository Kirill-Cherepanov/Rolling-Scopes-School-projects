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
  const DAYS = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ]
  const MONTHS = [
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
    'December'
  ]
  let curDate = new Date();
  date.innerText = `${DAYS[curDate.getDay() - 1]}, ${MONTHS[curDate.getMonth()]} ${curDate.getDate()}`;
};

// Setting Greetings message
function setGreetings() {
  let curHour = (new Date()).toLocaleTimeString().split(':')[0];
  if (curHour >= 0 && curHour < 6) greeting.innerText = "What a Nice Night, ";
  if (curHour >= 6 && curHour < 12) greeting.innerText = 'Good Morning, ';
  if (curHour >= 12 && curHour < 18) greeting.innerText = 'Good Afternoon, ';
  if (curHour >= 18) greeting.innerText = 'Good Evening, ';
}

setDate();
setGreetings();
setInterval(() => {
  setDate();
  setGreetings();
}, 30000);

// Savign/Accessing Username in local storage
if (localStorage.getItem('username')) {
  username.value = localStorage.getItem('username');
}
username.addEventListener('change', (e) => {
  localStorage.setItem('username', username.value);
});