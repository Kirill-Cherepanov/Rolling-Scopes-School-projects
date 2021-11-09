const questions = document.querySelector('.questions-container');

Array.from(questions.children).forEach(question => 
  question.addEventListener('pointerdown', () => {
    const category = question.childNodes[0].wholeText;
    localStorage.setItem('category', category);
}));