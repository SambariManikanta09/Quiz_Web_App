const question  = document.getElementById("question");
const choices = Array.from (document.getElementsByClassName('choice-text'));
//const questionCounterText = document.getElementById('questionCounter');
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progressBarFull');
//console.log(choice);

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let avaliableQuestions = [];
let questions = [];

fetch("questions.json")
  .then(res => {
    return res.json();
  })
  .then(loadedQuestions => {
    console.log(loadedQuestions);
    questions = loadedQuestions;
    startGame();
  })
  .catch(err => {
    console.error(err);
  });
//CONSTANTS

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;
const PENALTY = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  avaliableQuestions = [...questions]
  // console.log(avaliableQuestions);
  getNewQuestion();
};

getNewQuestion = () => {

  if (avaliableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    // save the score in the local storage
    localStorage.setItem("mostRecentScore" , score);
    //go to the end page
    return window.location.assign("end.html");
  }
  questionCounter++;
  progressText.innerText =  "Question : " + questionCounter + "/" + MAX_QUESTIONS;

  //console.log((questionCounter/MAX_QUESTIONS) * 100);
  //const x = "(questionCounter/MAX_QUESTIONS) * 100}px";
  //console.log(x);

  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  //questionCounterText.innerText = '${questionCounter}/${MAX_QUESTIONS}';//not working
  //questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;
  const questionIndex = Math.floor(Math.random() * avaliableQuestions.length);
  currentQuestion = avaliableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice, i) => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion["choice"+ number];
  });
  avaliableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true ;
};

choices.forEach(choice  => {
  choice.addEventListener("click" , e => {
    //console.log(e.target);
  if (!acceptingAnswers) return;

  acceptingAnswers = false;
  const selectedCoice = e.target;
  const selectedAnswer = selectedCoice.dataset["number"];

/*  const classToApply = 'incorrect' ;
    if (selectedAnswer == currentQuestion.answer) {
      classToApply = 'correct';
    }
*/

const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
//console.log(classToApply);

  //console.log(selectedAnswer == currentQuestion.answer);

  if (classToApply == "correct") {
    incrementScore(CORRECT_BONUS);
  }

  if (classToApply == "incorrect") {
    decrementScore(PENALTY);
  }

  selectedCoice.parentElement.classList.add(classToApply);
  setTimeout( () =>  {
    selectedCoice.parentElement.classList.remove(classToApply);
    getNewQuestion();
  }, 500);
  });
});

incrementScore = num  => {
  score+=num;
  scoreText.innerText = score;
}

decrementScore = p => {
  score-=p;
  scoreText.innerText = score;
}

