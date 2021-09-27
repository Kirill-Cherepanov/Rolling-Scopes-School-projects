// Burger menu
const burger = document.querySelector('.header__burger');
const nav = document.querySelector('header .container nav');
const bait = document.querySelector('.louvre-bait');

burger.addEventListener('click', (e) => {
  [bait.style.left, nav.style.left] = [window.getComputedStyle(nav).left, window.getComputedStyle(bait).left];
  burger.classList.toggle('active-burger');
});