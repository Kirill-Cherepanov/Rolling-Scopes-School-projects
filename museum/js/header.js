// Burger menu
const burger = document.querySelector('.header__burger');
const header = document.querySelector('header');
const nav = document.querySelector('header .container nav');
const bait = document.querySelector('.louvre-bait .welcome__text');
const body = document.querySelector('body');
const navUl = document.querySelector('header nav .navigation');

burger.addEventListener('click', toggleMenu);

navUl.addEventListener('click', (e) => {
  if (!Array.from(burger.classList).includes('active-burger')) {
    return;
  }
  toggleMenu();
});

document.addEventListener('click', (e) => {
  if (!Array.from(burger.classList).includes('active-burger')) {
    return;
  }
  if (isChildOf(header, e.target)) return;
  toggleMenu();
});

function toggleMenu(e) {
  [bait.style.left, nav.style.left] = [nav.style.left, bait.style.left];
  burger.classList.toggle('active-burger');
}

function isChildOf(parent, child) {
  let node = child.parentNode;
  while (node) {
    if (node === parent) return true;
    node = node.parentNode;
  }
  return false;
}