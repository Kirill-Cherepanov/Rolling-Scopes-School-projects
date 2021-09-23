const galleryImgContainer = document.querySelector('.columns');
let imgArray = [];

for (let i = 1; i < 16; i++) {
  imgArray.push(`<div class="gallery-img-container"><img src="./img/galery/galery${i}.jpg" alt="gallery picture ${i}"></div>`);
}
galleryImgContainer.innerHTML = shuffle(imgArray).join('');

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
  return array;
}