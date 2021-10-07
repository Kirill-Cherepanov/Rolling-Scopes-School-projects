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
  Array.from(imgArray).forEach(function(image) {
    if (image.getBoundingClientRect().y <= window.innerHeight) {
      image.classList.remove('non-active');
    } else if (!image.classList.contains('non-active')) {
      image.classList.add('non-active');
    }
  });
}

window.addEventListener('scroll', debounce(checkSlide));
// setTimeout(debounce(checkSlide), 1000);