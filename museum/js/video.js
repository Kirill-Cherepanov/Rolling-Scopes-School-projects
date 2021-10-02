// Video progress bar animation
const [progress, volume] = document.querySelectorAll('.progress');
const bgChange = function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #c4c4c4 ${value}%, #c4c4c4 100%)`
}

progress.addEventListener('input', bgChange);
volume.addEventListener('input', bgChange);

// Video slider
// const vidBlock = document.querySelector('.video-block');
// const vidWrapper = document.querySelector('.video__slider-wrapper');
// const vidSlider = document.querySelector('.video__slider');
// const slideIndex = document.querySelector('.video-index');

// vidSlider.addEventListener("pointerdown", function(e) {
//   let target = e.target;
//   let currSlide = Array.from(slideIndex.children).indexOf(document.querySelector(".active-circle"));

//   if (target.closest(".video__next-iframe")) {
//     vidChangeSlide(currSlide, currSlide + 1, true);
//   } else if (target.closest(".video__prev-iframe")) {
//     vidChangeSlide(currSlide, currSlide - 1, false);
//   } else if (target.closest(".video-circle")) {
//     vidChangeSlide(currSlide, slideIndex.indexOf(target));
//   } else return;
// });

// function vidChangeSlide(from, to, direction = to - from > 0 ? true : false) {
  
// }

// function getClones(originals) {
  
// }