import images from './images.js';

const answers = JSON.parse(localStorage.getItem('answers')) || Array(10).fill(Array(10).fill(0));
const picContainer = document.querySelector('.picture-container');
const imgWrappers = Array.from(picContainer.children);
const initPicture = (Number(localStorage.getItem('category')) - 1) * 10;
const quizType = localStorage.getItem('quiz');

for (let i = 0; i < 10; i++) {
  const tooltip = document.createElement('div');
  tooltip.classList.add('tooltip');

  let newP = document.createElement('p');
  newP.textContent = `Автор: ${images[initPicture + i].author}`;
  tooltip.append(newP);

  newP = document.createElement('p');
  newP.textContent = `Название: ${images[initPicture + i].name}`;
  tooltip.append(newP);

  newP = document.createElement('p');
  newP.textContent = `Год написания: ${images[initPicture + i].year}`;
  tooltip.append(newP);

  imgWrappers[i].append(tooltip);

  imgWrappers[i].style.backgroundImage = `url(./assets/img/squared/${initPicture + i}.jpg)`;
  if (answers[quizType][initPicture / 10][i]) imgWrappers[i].classList.add('correct');
}
