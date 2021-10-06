// Randomization
const galleryImgContainer = document.querySelector('.columns');
let imgArray = [];

for (let i = 1; i < 16; i++) {
  imgArray.push(`<div class="gallery-img-container non-active"><img src="./img/galery/galery${i}.jpg" alt="gallery picture ${i}"></div>`);
}
galleryImgContainer.innerHTML = shuffle(imgArray).join('');
imgArray = galleryImgContainer.children;

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
  return array;
}

// OnScroll animation
function debounce(func, wait, immediate) {
  var timeout;

  return function executedFunction() {
    var context = this;
    var args = arguments;
	    
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
	
    clearTimeout(timeout);

    timeout = setTimeout(later, wait);
	
    if (callNow) func.apply(context, args);
  };
};

function checkSlide(e) {
  // What part of the content is visible in the window?
  // const windowTop = window.scrollY;
  const windowBottom = window.scrollY + window.innerHeight;

  Array.from(imgArray).forEach(function(image) {
    // const imageTop = image.offsetTop;
    // const imageBottom = image.offsetTop + image.height;
    // const imageMiddle = (imageTop + imageBottom) / 2;

    const slidePos = image.offsetTop + image.getBoundingClientRect().height / 3;
    console.log(`wb: ${windowBottom} == sp: ${slidePos}`);

    if (slidePos <= windowBottom) {
      image.classList.remove('non-active');
    } else if (!image.classList.contains('non-active')) {
      image.classList.add('non-active');
    }
  });
}

window.addEventListener('scroll', debounce(checkSlide));
window.addEventListener('DOMContentLoaded', setTimeout(debounce(checkSlide), 300));