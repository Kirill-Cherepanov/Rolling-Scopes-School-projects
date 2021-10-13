const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const username = document.getElementById('username');

setInterval(() => {
  time.innerText = (new Date()).toLocaleTimeString()
}, 1000);
date.innerText = (new Date().toLocaleDateString());