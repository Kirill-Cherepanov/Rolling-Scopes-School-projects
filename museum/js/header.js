const burger = document.querySelector('.header__burger');
const nav = document.querySelector('header .container nav');
const bait = document.querySelector('.louvre-bait .welcome__text');

document.addEventListener('click', (e) => {
  if (e.target.closest('.header__burger')) toggleMenu();
  else if (!Array.from(burger.classList).includes('active-burger')) {}
  else if (e.target.closest('header nav .navigation a')) toggleMenu();
  else if (e.target.closest('header')) {}
  else toggleMenu();
});

function toggleMenu(e) {
  [bait.style.left, nav.style.left] = [nav.style.left, bait.style.left];
  burger.classList.toggle('active-burger');
}