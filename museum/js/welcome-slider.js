const welcome = document.querySelector('#welcome .container');
const sliderArrows = document.querySelector('.slider-arrows');
const indexBoxes = document.querySelector('.slider-index');
const sliderCounter = document.querySelector('.slider-counter-current');
const backgrounds = [];
let currBg = 0;

for (let i = 1; i < 6; i++)  {
  backgrounds.push(`linear-gradient(90deg, #000 31%, rgba(0, 0, 0, 0.5) 46.19%, rgba(0, 0, 0, 0) 60.73%), url("./img/welcome-slider/${i}.jpg")`);
}

sliderArrows.addEventListener('mousedown', e => {
  let arrow = e.target.closest('button');
  if (!arrow) return;
  if (!sliderArrows.contains(arrow)) return;

  if (Array.from(arrow.classList).includes('left-arrow')) {
    changeBg(currBg, currBg - 1, false);
  } else {
    changeBg(currBg, currBg + 1, true);
  }
});

indexBoxes.addEventListener('mousedown', e => {
  let box = e.target.closest('.slider-white-box');
  if (!box) return;
  if (!indexBoxes.contains(box)) return;
  if (currBg === Array.from(indexBoxes.children).indexOf(box)) return;

  changeBg(currBg, Array.from(indexBoxes.children).indexOf(box));
});

function changeBg(from, to, direction = to - from > 0 ? true : false) {
  if (direction && to === 5) to = 0;
  else if (!direction && to === -1) to = 4;
  currBg = to;
  welcome.style.backgroundPositionX = direction ? '400%, 400%' : '-300%, -300%';

  setTimeout(() => {
    console.log(from);
    indexBoxes.children[from].classList.remove('active-box');
    indexBoxes.children[to].classList.add('active-box');
    sliderCounter.textContent = `0${to + 1}`;

    welcome.style.backgroundImage = backgrounds[to];
    welcome.style.transitionDuration = '0s';
    welcome.style.backgroundPositionX = !direction ? '400%, 400%' : '-300%, -300%';

    setTimeout(() => {
      welcome.style.transitionDuration = '0.5s';
      welcome.style.backgroundPositionX = 'calc(100% - 20px), calc(100% - 20px)';
    }, 50)
  }, 400)
};