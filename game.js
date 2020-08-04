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

let questions = [
  {
    question: "Which of the following is incorrect?",
    choice1: "List is a built-in data structure in Python",
    choice2: "List can only have elements of same data type.",
    choice3: "List is mutable.",
    choice4: "Index of lists can be positive as well as negative.",
    answer: 2
  },
  {
    question: "Which of the following two will give the same result? \n 1. 42//2 \n 2. 21%6 \n 3. 12/4 \n 4. 11*2 ",
    choice1: "2,3",
    choice2: "1,3",
    choice3: "2,4",
    choice4: "3,4",
    answer: 1
  },
  {
    question: "Which of the following would give 'Harry' as output? Given str1='Mary,Harry,John,Sam' ",
    choice1: "str1[4:9] ",
    choice2: "str1[5:10]",
    choice3: "str1[4:10]",
    choice4: "str1[5:9]",
    answer: 2
  },
  {
    question: "What will be the output of the following code : \n print type(type(int)) ",
    choice1: " type 'int' ",
    choice2: "type'type'",
    choice3: "Error",
    choice4: "0",
    answer: 2
  },
  {
    question: 'What is the output of the following program : \n print "Hello World"[::-1]',
    choice1: "dlroW olleH",
    choice2: "Hello Worl",
    choice3: "d",
    choice4: "Error",
    answer: 2
  },
  {
    question: "Given a function that does not return any value, what value is shown when executed at the shell?",
    choice1: "int",
    choice2: "bool",
    choice3: "void",
    choice4: "None",
    answer: 4
  },
  {
    question: "What does ~~~~~~5 evaluate to?",
    choice1: "+5",
    choice2: "-11",
    choice3: "+11",
    choice4: "-5",
    answer: 1
  },
  {
    question: "________ is a simple but incomplete version of a function.",
    choice1: "Stub",
    choice2: "Function",
    choice3: "A function developed using bottom-up approach",
    choice4: "A function developed using top-down approach",
    answer: 1
  },
  {
    question: "To start Python from the command prompt, use the command ________",
    choice1: "execute python",
    choice2: "go python",
    choice3: "python",
    choice4: "run python",
    answer: 3
  },
  {
    question: "Which of the following is correct about Python?",
    choice1: "It supports automatic garbage collection.",
    choice2: "It can be easily integrated with C, C++, COM, ActiveX, CORBA, and Java",
    choice3: "Both of the above",
    choice4: "None of the above",
    answer: 3
  }
]

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
    //go to the end page
    return window.location.assign("/end.html");
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

startGame();
