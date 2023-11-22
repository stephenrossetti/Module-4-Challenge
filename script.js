let timeEl = document.getElementById("timer");
let startButton = document.getElementById("startButton");
let nextButton = document.getElementById("nextButton");
let backButton = document.getElementById("backButton");
let image = document.querySelector(".img")
let questionContainerEl = document.getElementById("questionContainer");
let questionEl = document.getElementById("question");
let answersEl = document.getElementById("answers");
let answerBtn = document.getElementById("btn");
let highScoreBtn = document.getElementById("highscore")
let timeLeft;
let timeInterval;
let currentQuestionIndex;
let shuffledQuestions;
let scoreForm = document.getElementById("scoreForm");
let scoreTextEl = document.getElementById("scoreText");
let scoreList = document.getElementById("scoreList");
let scoreContainer = document.getElementById("highScoreFormat");
let scores = [];

function hideHomePage () {
  image.style.display = "none";
  startButton.style.display = "none";
}

function startGame() {
  timeLeft = 100;
  hideHomePage ();
  countDown ();
  questionContainerEl.style.display = "block";
  shuffledQuestions = questionArray.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  inputQuestion ();
}

function countDown() {
        timeInterval = setInterval(() => {
        timeLeft--;
        timeEl.textContent = "Time Remaining: " + timeLeft + "s";
        if (currentQuestionIndex === 5) {
          clearInterval(timeInterval);
        } 
        else if (timeLeft <= 0) {
          clearInterval(timeInterval);
          timeLeft = 0;
          alert("Times Up!");
          location.reload();
        }
    }, 1000);
}

function inputQuestion () {
  hidePreviousQuestion();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion (question) {
  hidePreviousQuestion();
  questionEl.innerText = question.question;
  question.answers.forEach(answer => {
    let button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    answersEl.appendChild(button);
    if(answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click",selectAnswer);
  })
}

function hidePreviousQuestion () {
  backButton.style.display = "none";
  nextButton.style.display = "none";
  scoreContainer.style.display = "none";
  while(answersEl.firstChild) {
    answersEl.removeChild(answersEl.firstChild);
  }
}

function selectAnswer (e) {
  let answerClicked = e.target;
  let answerCorrect = answerClicked.dataset.correct === "true";
  if (answerCorrect) {
    answerClicked.classList.add("correct");
  } else { 
    answerClicked.classList.add("incorrect");
    timeLeft -= 15;
  }
  nextButton.innerText = "Next";
  nextButton.style.display = "block";
}

nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questionArray.length) {
  nextQuestion();
  } else {
    startGame ();
  }
});

function nextQuestion () {
  currentQuestionIndex++;
  if (currentQuestionIndex < questionArray.length) {
    inputQuestion();
  } else {
    highScore ();
  }
}

function highScore () {
  hidePreviousQuestion ();
  questionEl.innerText = "Congratulations! You scored " + (timeLeft-1) + " Points!";
  scoreContainer.style.display = "block";
  scoreForm.style.display = "block";
  nextButton.innerText = "Play Again";
  nextButton.style.display = "block";
}

startButton.addEventListener("click", startGame);

let questionArray = [
  { question: "Who is the greatest football player?",
    answers: [
    {text: "Tom Brady", correct:true},
    {text: "Peyton Manning", correct:false},
    {text: "Jim Brown", correct:false},
    {text: "Jerry Rice", correct:false}
  ] },
  { question: "Who is the greatest basketball player?",
    answers: [
    {text: "Larry Bird", correct:false},
    {text: "Lebron James", correct:false},
    {text: "Michael Jordan", correct:true},
    {text: "Wilt Chamberlain", correct:false}
  ] },
  { question: "Who is the greatest hockey player?",
    answers: [
    {text: "Bobby Orr", correct:false},
    {text: "Mario Lemieux", correct:false},
    {text: "Gordie Howe", correct:false},
    {text: "Wayne Gretzky", correct:true}
  ] },
  { question: "Who is the greatest baseball player?",
    answers: [
    {text: "Babe Ruth", correct:true},
    {text: "Willie Mays", correct:false},
    {text: "Hank Aaron", correct:false},
    {text: "Ted Williams", correct:false}
  ] },
  { question: "Who is the greatest soccer player?",
    answers: [
    {text: "Pele", correct:false},
    {text: "Lionel Messi", correct:true},
    {text: "Diego Maradona", correct:false},
    {text: "Cristiano Ronaldo", correct:false}
  ] },
];

function renderScores() {
  scoreList.innerHTML = "";
  for (let j = 0; j < scores.length; j++) {
    let score = scores[j];
    let li = document.createElement("li");
    li.textContent = score;
    li.setAttribute("data-index", j);
    scoreList.appendChild(li);
    highScoreBtn.style.display = "block";
  }
}

function init() {
  let storedScores = JSON.parse(localStorage.getItem("scores"));
  if (storedScores !== null) {
    scores = storedScores;
  }

  renderScores();
}

function storeScores() {
  localStorage.setItem("scores", JSON.stringify(scores));
}

function hideInputBox () {
  scoreForm.style.display = "none";
}

scoreForm.addEventListener("submit", function(event) {
  event.preventDefault();
  let scoreText = scoreTextEl.value.trim();
  if (scoreText === "") {
    return;
  }

  scores.push(scoreText);
  scoreTextEl.value = "";

  storeScores();
  renderScores();
  hideInputBox ();
});

highScoreBtn.addEventListener("click",getScores);

function getScores () {
  clearInterval(timeInterval);
  questionEl.innerText = "Official Leaderboard:";
  hidePreviousQuestion ();
  hideInputBox ();
  scoreContainer.style.display = "block";
  backButton.style.display = "block";
}

backButton.addEventListener("click",startGame);