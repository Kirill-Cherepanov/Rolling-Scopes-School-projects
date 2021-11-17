const categories = document.querySelector('.categories-container');
const quizType = localStorage.getItem('quiz');
const results = JSON.parse(localStorage.getItem('answers')) || {
  '0': Array(10).fill(Array(10).fill(0)),
  '1': Array(10).fill(Array(10).fill(0)),
};

Array.from(categories.children).forEach((category, i) => {
  const categoryImg = category.querySelector('img');
  const categoryStats = category.querySelector('.category-stats');
  const categoryNum = categoryStats.childNodes[0].wholeText;

  categoryStats.addEventListener('click', e => {
    if (results[quizType][i][10]) {
      window.location.href = 'results.html';
    } else alert('Данный тест еще не пройден!');
  });
  categoryImg.addEventListener('click', e => window.location.href = 'questions.html');

  categoryImg.src = `./assets/img/squared/${(Number(categoryNum) - 1) * 10 + Number(quizType)}.jpg`;

  if (results[quizType][i][10]) category.classList.add('played');

  const result = document.createElement('span');
  result.classList.add('result');
  let correctAnswers = results[quizType][i][10] ? results[quizType][i].reduce((acc, curr) => acc + curr, 0) - 1 : 0;
  result.textContent = `${correctAnswers === 10 ? '10' : '0' + correctAnswers} / 10`;
  categoryStats.append(result);

  category.addEventListener('pointerdown', () => {
    localStorage.setItem('category', categoryNum);
  });
});
