const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalscore = document.getElementById('finalscore');
const mostRecentScore = localStorage.getItem('mostRecentScore');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
const MAX_HIGHSCORES = 5;
console.log(highScores);

finalscore.innerText = mostRecentScore;

username.addEventListener("keyup" , () => {
  saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) => {
  //console.log("CLicked the save button");
  e.preventDefault();

  const score = {
    score: Math.floor(Math.random() * 100),
    name: username.value,
  };
  highScores.push(score);
  highScores.sort((a,b) =>
    {
      return b.score - a.score;
    });

  highScores.splice(5);

  localStorage.setItem('highScores',JSON.stringify(highScores));
  window.location.assign("index.html");
  //console.log(highScores);
};
