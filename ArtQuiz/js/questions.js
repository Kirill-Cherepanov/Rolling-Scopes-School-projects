import images from './images.js';
Array.prototype.shuffle = function() {
  return this.sort(() => Math.random() - 0.5);
};

const timer = document.querySelector('.timer');
let timerHandler;
const artistsQuiz = document.querySelector('.artists-quiz');
const qImg = document.querySelector('.q-img');
const artsQuiz = document.querySelector('.arts-quiz');
const author = document.querySelector('.author');
const quizType = Number(localStorage.getItem('quiz'));
const initQuestion = (Number(localStorage.getItem('category')) - 1) * 10;
let questionNum = initQuestion;
let globalResults = JSON.parse(localStorage.getItem('answers')) || {
  '0': Array(10).fill(Array(11).fill(0)),
  '1': Array(10).fill(Array(11).fill(0)),
};
globalResults[quizType][initQuestion / 10] = Array(10).fill(0);

if (!localStorage.getItem('volume')) localStorage.setItem('volume', '100');

if (!quizType) artsQuiz.style.display = 'none';
else artistsQuiz.style.display = 'none';

setQuestion();


function setQuestion(correct) {
  // Initialization of the quizes common for both
  const initQuiz = function(correct) {
    globalResults[quizType][initQuestion / 10][questionNum - initQuestion - 1] = correct ? 1 : 0;
  
    if (questionNum - initQuestion === 10) {
      window.location.href = 'results.html';
      globalResults[quizType][initQuestion / 10][10] = 1;
      localStorage.setItem('answers', JSON.stringify(globalResults));
      throw '';
    }
  };
  // setAnswers for quizes
  const setAnswers = function(answers) {
    const setSource = function(answer, n) {
      if (quizType) answer.style.backgroundImage = `url(./assets/img/squared/${n}.jpg)`;
      else answer.textContent = images[n].author;
    }
  
    setSource(answers.shuffle()[0], questionNum);
    answers.slice(1).reduce((usedNums, answer) => {
      let randomNum;
      do { randomNum = Math.floor(Math.random() * 100);
      } while (usedNums.includes(randomNum) || images[questionNum].author === images[randomNum].author);
  
      setSource(answer, randomNum);
  
      usedNums.push(randomNum);
      return usedNums;
    }, [questionNum]);
  };
  // Event listeners for clicks on answers
  const quizClickEventsHandler = function(answers) {
    const decorateAnswers = function(answer, correct) {
      if (quizType) answers.slice(1).forEach(picture => picture.style.filter = 'grayscale(100%)');
      else answer.style.backgroundColor = correct ? '#4BB543' : '#FC100D';
    };
    // Play sound effects
    const playSounds = function(correct) {
      const audio = document.createElement('audio');
      audio.src = './assets/sounds/' + (correct ? 'success' : 'failure') + '.wav';
      audio.volume = Number(localStorage.getItem('volume')) / 100;
      audio.muted = !!Number(localStorage.getItem('muted'));
      audio.play();
      return audio;
    };
    // Delete all the Event Listeners on authors and reassign it
    const clearEventListeners = function(answers) {
      const answersContainer = document.querySelector(quizType ? '.pictures' : '.authors');
      const answersClone = answersContainer.cloneNode(true);
      answersContainer.parentNode.replaceChild(answersClone, answersContainer);
      return Array.from(answersClone.children);
    };
  
    answers.forEach(answer => {
      answer.addEventListener('click', e => {
        correct = answers[0] === e.target;
        decorateAnswers(answer, correct);

        answers = clearEventListeners(answers);
        const audio = playSounds(correct);
  
        clearInterval(timerHandler);
        audio.addEventListener('ended', () => {
          answers.forEach(answer => {
            answer.style.filter = 'none';
            answer.style.backgroundColor = '#7851a9';
          });
          setQuestion(correct);
        });
      });
    });
  };

  initQuiz(correct);
  let answers = Array.from(document.querySelector(quizType ? '.pictures' : '.authors').children);
  if (!quizType) qImg.src = `./assets/img/squared/${questionNum}.jpg`;
  setAnswers(answers);
  quizClickEventsHandler(answers);

  questionNum++;
  setTimer();
}

function setTimer() {
  const timerTime = localStorage.getItem('timer');

  if (Number(timerTime)) {
    timer.textContent = '00:' + timerTime;
    let timerCounter = Number(timerTime) - 1;
    
    timerHandler = setInterval(function () {
      timer.textContent = '00:' + (timerCounter >= 10 ? timerCounter : ('0' + timerCounter));
      if (timerCounter <= 0) {
        clearInterval(timerHandler);
        setQuestion(false);
      }
      timerCounter--;
    }, 1000);
  } else {
    timer.textContent = '';
  }
}