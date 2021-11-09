const questions = document.querySelector('.questions-container');

Array.from(questions.children).forEach(q => 
  q.addEventListener('pointerdown', () => {
    localStorage.setItem('category', Number(q.textContent));
}));