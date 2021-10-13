const body = document.querySelector('body');
const sliderBtns = document.querySelector('.slider-icons');
// const prevBtn = document.querySelector('.slide-next');

function initBackgroundImage() {
  let curHour = (new Date()).toLocaleTimeString().split(':')[0];
  let timeOfDay;
  if (curHour >= 0 && curHour < 6) timeOfDay = 'night';
  if (curHour >= 6 && curHour < 12) timeOfDay = 'morning';
  if (curHour >= 12 && curHour < 18) timeOfDay = 'day';
  if (curHour >= 18) timeOfDay = 'evening';

  let randomNum = Math.floor(Math.random() * 20 + 1);
  randomNum = randomNum >= 10 ? randomNum : '0' + randomNum;
  body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${randomNum}.jpg')`;
};
initBackgroundImage();

function setBg(url) {  
  const img = new Image();
  img.src = url;
  img.onload = () => {
    console.log('here');
    body.style.backgroundImage = `url(${img.src})`;
  };
}
sliderBtns.addEventListener('pointerdown', (e) => {
  let slideNum = parseInt(body.style.backgroundImage.match(/\d\d.jpg/));
  if (e.target.classList.contains('slide-next')) {
    let nextSlide = slideNum + 1;
    if (nextSlide > 20) nextSlide = 1;

    if (nextSlide < 10) nextSlide = '0' + nextSlide + '.jpg';
    else nextSlide = nextSlide + '.jpg';

    setBg(body.style.backgroundImage.match(/url\("(.*?)"\)/)[1].replace(/\d\d.jpg/, nextSlide));
  } else {
    let nextSlide = slideNum - 1;
    if (nextSlide < 1) nextSlide = 20;

    if (nextSlide < 10) nextSlide = '0' + nextSlide + '.jpg';
    else nextSlide = nextSlide + '.jpg';

    setBg(body.style.backgroundImage.match(/url\("(.*?)"\)/)[1].replace(/\d\d.jpg/, nextSlide));
  }
});