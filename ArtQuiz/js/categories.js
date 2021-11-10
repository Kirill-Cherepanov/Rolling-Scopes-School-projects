const questions = document.querySelector('.questions-container');
const quizType = localStorage.getItem('quiz');
const results = JSON.parse(localStorage.getItem('answers')) || {
  '0': Array(10).fill(Array(10).fill(0)),
  '1': Array(10).fill(Array(10).fill(0)),
};

Array.from(questions.children).forEach((question, i) => {
  if (results[quizType][i][10]) question.classList.add('played');

  const result = document.createElement('span');
  result.classList.add('result');
  let correctAnswers = results[quizType][i][10] ? results[quizType][i].reduce((acc, curr) => acc + curr, 0) - 1 : 0;
  result.textContent = `${correctAnswers === 10 ? '10' : '0' + correctAnswers} / 10`;
  question.append(result);

  question.addEventListener('pointerdown', () => {
    const category = question.childNodes[0].wholeText;
    localStorage.setItem('category', category);
  })
});
