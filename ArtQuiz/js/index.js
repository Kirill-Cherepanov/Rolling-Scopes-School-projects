const artistsBtn = document.querySelector('.Artists');
const artsBtn = document.querySelector('.Arts');

artistsBtn.addEventListener('pointerdown', () => localStorage.setItem('quiz', '0'));
artsBtn.addEventListener('pointerdown', () => localStorage.setItem('quiz', '1'));