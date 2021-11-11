const artistsBtn = document.querySelector('.Artists');
const artsBtn = document.querySelector('.Arts');
const image = document.querySelector('img');

artistsBtn.addEventListener('pointerdown', () => localStorage.setItem('quiz', '0'));
artsBtn.addEventListener('pointerdown', () => localStorage.setItem('quiz', '1'));
image.src = `assets//img/squared/${Math.floor(Math.random() * 100)}.jpg`;