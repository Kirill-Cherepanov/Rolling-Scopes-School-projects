Array.prototype.shuffle = function() {
  return this.sort(() => Math.random() - 0.5);
};

import images from './images.js';

const timer = document.querySelector('.timer');
const questions = document.querySelectorAll('p.question');

// Timer handler
const timerTime = localStorage.getItem('timer');
let timerHandler;

const setTimer = function() {
  if (Number(timerTime)) {
    timer.textContent = '00:' + timerTime;
    let timerCounter = Number(timerTime) - 1;
    
    timerHandler = setInterval(function () {
      timer.textContent = '00:' + (timerCounter >= 10 ? timerCounter : ('0' + timerCounter));
      if (timerCounter <= 0) {
        clearInterval(timerHandler);
        setQuestion();
      }
      timerCounter--;
    }, 1000);
  } else {
    timer.textContent = '';
  }
};


// Quiz setup

// Artists quiz
const artistsQuiz = document.querySelector('.artists-quiz');
const qImg = document.querySelector('.q-img');
let authors = Array.from(document.querySelector('.authors').children);

// Arts quiz
const artsQuiz = document.querySelector('.arts-quiz');
const author = document.querySelector('.author');
let pictures = Array.from(document.querySelector('.pictures').children);

// Common values
let setQuestion;
const quizType = Number(localStorage.getItem('quiz'));
const initQuestion = (Number(localStorage.getItem('category')) - 1) * 10;
let questionNum = initQuestion;

if (!quizType) { // Artists
  artsQuiz.style.display = 'none';

  setQuestion = function() {
    if (questionNum - initQuestion === 10) {
      window.location.href = 'results.html';
      throw '';
    }

    qImg.src = `assets/img/full/${questionNum}full.jpg`;

    // Set author answers
    authors.shuffle()[0].textContent = images[questionNum].author;
    authors.slice(1).forEach(author => {
      let randomNum;
      do { randomNum = Math.floor(Math.random() * 100);
      } while (randomNum === questionNum);
      
      author.textContent = images[randomNum].author;
    });

    // Event listeners for clicks on answers
    authors.forEach(author => {
      author.addEventListener('pointerdown', function () {
        document.addEventListener('pointerup', function d(e) {
          if (authors.includes(e.target)) {
            if (authors[0] === e.target) e.target.style.backgroundColor = '#4BB543';
            else e.target.style.backgroundColor = '#FC100D';

            // Delete all the Event Listeners on authors and reassign it
            const authorsContainer = document.querySelector('.authors');
            const authorsClone = authorsContainer.cloneNode(true);
            authorsContainer.parentNode.replaceChild(authorsClone, authorsContainer);
            authors = Array.from(authorsClone.children);

            clearInterval(timerHandler);
            setTimeout(() => {
              authors.forEach(author => {
                author.style.backgroundColor = '#7851a9';
              });
              setQuestion();
            }, 1000);
          }

          document.removeEventListener('pointerup', d);
        });
      });
    });

    questionNum++;
    setTimer();
  }
} else { // Arts
  artistsQuiz.style.display = 'none';

  setQuestion = function() {
    if (questionNum - initQuestion === 10) {
      window.location.href = 'results.html';
      throw '';
    }

    author.textContent = images[questionNum].author;

    // Set images answers
    pictures.shuffle()[0].style.backgroundImage = `url(./assets/img/full/${questionNum}full.jpg)`;
    pictures.slice(1).forEach(picture => {
      let randomNum;
      do { randomNum = Math.floor(Math.random() * 100);
      } while (randomNum === questionNum);

      picture.style.backgroundImage = `url(./assets/img/full/${randomNum}full.jpg)`;
    });

    // Event listeners for clicks on answers
    pictures.forEach(picture => {
      picture.addEventListener('pointerdown', function () {
        document.addEventListener('pointerup', function d(e) {
          console.log('fd');
          if (pictures.includes(e.target)) {
            pictures.slice(1).forEach(picture => {
              picture.style.filter = 'grayscale(100%)';
            });

            // Delete all the Event Listeners on pictures and reassign it
            const picturesContainer = document.querySelector('.pictures');
            const picturesClone = picturesContainer.cloneNode(true);
            picturesContainer.parentNode.replaceChild(picturesClone, picturesContainer);
            pictures = Array.from(picturesClone.children);

            clearInterval(timerHandler);
            setTimeout(() => {
              pictures.forEach(picture => {
                picture.style.filter = 'none';
              });
              setQuestion();
            }, 1000);
          }

          document.removeEventListener('pointerup', d);
        });
      });
    });

    questionNum++;
    setTimer();
  };
}
setQuestion();
