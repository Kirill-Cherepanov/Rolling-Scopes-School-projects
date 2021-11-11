import images from './images.js';
Array.prototype.shuffle = function() {
  return this.sort(() => Math.random() - 0.5);
};


// Timer handler
const timer = document.querySelector('.timer');
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
        setQuestion(false);
      }
      timerCounter--;
    }, 1000);
  } else {
    timer.textContent = '';
  }
};



// Quiz setup
const artistsQuiz = document.querySelector('.artists-quiz');
const qImg = document.querySelector('.q-img');
let authors = Array.from(document.querySelector('.authors').children);

const artsQuiz = document.querySelector('.arts-quiz');
const author = document.querySelector('.author');
let pictures = Array.from(document.querySelector('.pictures').children);

const questions = document.querySelectorAll('p.question');
const quizType = Number(localStorage.getItem('quiz'));
const initQuestion = (Number(localStorage.getItem('category')) - 1) * 10;
let questionNum = initQuestion;
let setQuestion;
let answers = JSON.parse(localStorage.getItem('answers')) || {
  '0': Array(10).fill(Array(11).fill(0)),
  '1': Array(10).fill(Array(11).fill(0)),
};
answers[quizType][initQuestion / 10] = Array(10).fill(0);

if (!quizType) { // Artists
  artsQuiz.style.display = 'none';

  setQuestion = function(correct) {
    answers[quizType][initQuestion / 10][questionNum - initQuestion - 1] = correct ? 1 : 0;

    if (questionNum - initQuestion === 10) {
      window.location.href = 'results.html';
      answers[quizType][initQuestion / 10][10] = 1;
      localStorage.setItem('answers', JSON.stringify(answers));
      throw '';
    }

    qImg.src = `./assets/img/squared/${questionNum}.jpg`;

    // Set author answers
    authors.shuffle()[0].textContent = images[questionNum].author;
    authors.slice(1).reduce((usedImgs, author) => {
      let randomNum;
      do { randomNum = Math.floor(Math.random() * 100);
      } while (usedImgs.includes(randomNum));
      
      author.textContent = images[randomNum].author;

      usedImgs.push(randomNum);
      return usedImgs;
    }, [questionNum]);

    // Event listeners for clicks on answers
    authors.forEach(author => {
      author.addEventListener('pointerdown', function () {
        document.addEventListener('pointerup', function d(e) {
          if (authors.includes(e.target)) {
            correct = authors[0] === e.target;
            e.target.style.backgroundColor = correct ? '#4BB543' : '#FC100D';

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
              setQuestion(correct);
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

  setQuestion = function(correct) {
    answers[quizType][initQuestion / 10][questionNum - initQuestion - 1] = correct ? 1 : 0;

    if (questionNum - initQuestion === 10) {
      window.location.href = 'results.html';
      answers[quizType][initQuestion / 10][10] = 1;
      localStorage.setItem('answers', JSON.stringify(answers));
      throw '';
    }

    author.textContent = images[questionNum].author;

    // Set images answers
    pictures.shuffle()[0].style.backgroundImage = `url(./assets/img/squared/${questionNum}.jpg)`;
    pictures.slice(1).reduce((usedNums, picture) => {
      let randomNum;
      do { randomNum = Math.floor(Math.random() * 100);
      } while (usedNums.includes(randomNum));
      
      picture.style.backgroundImage = `url(./assets/img/squared/${randomNum}.jpg)`;
      
      usedNums.push(randomNum);
      return usedNums;
    }, [questionNum]);

    // Event listeners for clicks on answers
    pictures.forEach(picture => {
      picture.addEventListener('pointerdown', function () {
        document.addEventListener('pointerup', function d(e) {
          if (pictures.includes(e.target)) {
            correct = pictures[0] === e.target;

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
              setQuestion(correct);
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
