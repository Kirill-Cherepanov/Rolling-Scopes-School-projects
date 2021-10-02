const container = document.querySelector('#welcome .container .louvre-bait');
const sliderArrows = document.querySelector('.slider-arrows');
const indexBoxes = document.querySelector('.slider-index');
const sliderCounter = document.querySelector('.slider-counter-current');
const bgContainer = document.querySelector('.louvre-bait');
const backgrounds = [];
let currBg = 0;

for (let i = 1; i < 6; i++) {
  backgrounds.push(['linear-gradient(90deg, #000 30.555%, rgba(0, 0, 0, 0.5) 41.745%, rgba(0, 0, 0, 0) 52.285%)', `url("./img/welcome-slider/${i}.jpg")`]);
}

bgContainer.addEventListener('pointerdown', e => {
  e.preventDefault();
  let prevPosX = e.clientX;
  let prevPosY = e.clientY;

  const isSwipe = function (e) {
    e.preventDefault();
    if (!e.isPrimary) return;

    if (Math.abs(e.clientX - prevPosX) > 150) {
      console.log(e.clientX - prevPosX);
      if (e.clientX - prevPosX > 0) {
        changeBg(currBg, currBg - 1, false);
      } else changeBg(currBg, currBg + 1, true);

      bgContainer.removeEventListener('pointermove', isSwipe);
    }
    if (Math.abs(e.clientY - prevPosY > 50)) {
      bgContainer.removeEventListener('pointermove', isSwipe);
      return;
    }
  };

  bgContainer.addEventListener('pointermove', isSwipe);

  bgContainer.addEventListener('pointerup', function del(e) {
    bgContainer.removeEventListener('pointermove', isSwipe);
    bgContainer.removeEventListener('pointerup', del);
  });
});

sliderArrows.addEventListener('mousedown', e => {
  let arrow = e.target.closest('button');
  if (!arrow) return;
  if (!sliderArrows.contains(arrow)) return;

  if (arrow.classList.contains('left-arrow')) {
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
  if (window.screen.width > 768) {
    container.style.backgroundPositionX = !direction ? '100%, 100vw' : '100%, -80vw'; 
  } else {
    container.style.backgroundPositionX = !direction ? '100vw' : '-100vw';
  }

  setTimeout(() => {
    indexBoxes.children[from].classList.remove('active-box');
    indexBoxes.children[to].classList.add('active-box');
    sliderCounter.textContent = `0${to + 1}`;

    container.style.transitionDuration = '0s';
    if (window.screen.width > 768) {
      container.style.backgroundPositionX = direction ? '100%, 100vw' : '100%, -80vw';
      container.style.backgroundImage = backgrounds[to].join(', ');
    } else {
      container.style.backgroundPositionX = direction ? '100vw' : '-100vw';
      container.style.backgroundImage = backgrounds[to][1];
    }

    setTimeout(() => {
      container.style.transitionDuration = '0.5s';
      container.style.backgroundPositionX = '100%, 100%';
    }, 50)
  }, 400)
};