// Burger menu
const burger = document.querySelector('.header__burger');
const nav = document.querySelector('header .container nav');
const bait = document.querySelector('.louvre-bait .welcome__text');

burger.addEventListener('click', (e) => {
  [bait.style.left, nav.style.left] = [nav.style.left, bait.style.left];
  burger.classList.toggle('active-burger');
});