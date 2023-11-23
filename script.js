let timeEl = document.getElementById("timer");
let startBtn = document.getElementById("startBtn");
let nextBtn = document.getElementById("nextBtn");
let backBtn = document.getElementById("backBtn");
let image = document.querySelector(".img")
let questionContainerEl = document.getElementById("questionContainer");
let questionEl = document.getElementById("question");
let answersEl = document.getElementById("answers");
let answerBtn = document.getElementById("btn");
let highScoreBtn = document.getElementById("highScore")
let timeLeft;
let timeInterval;
let currentQuestionIndex;
let shuffledQuestions;
let nameForm = document.getElementById("nameForm");
let nameTextEl = document.getElementById("nameText");
let nameList = document.getElementById("nameList");
let nameContainer = document.getElementById("nameContainer");
let nameFormat = document.getElementById("nameFormat");
let leaderBoard = document.getElementById("leaderboard");
let names = [];

function hideHomePage () {
  image.style.display = "none";
  startBtn.style.display = "none";
}

function startGame() {
  timeLeft = 101;
  shuffledQuestions = questionArray.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  hideHomePage ();
  showQuestion ();
  countDown ();
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
          highScore ();
        }
    }, 1000);
}

function showQuestion () {
  questionContainerEl.style.display = "block";
  hidePreviousQuestion();
  inputQuestion(shuffledQuestions[currentQuestionIndex]);
}

function inputQuestion (question) {
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
  backBtn.style.display = "none";
  nextBtn.style.display = "none";
  nameContainer.style.display = "none";
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
    timerMinus ();
  }
  nextBtn.innerText = "Next";
  nextBtn.style.display = "block";
}

function timerMinus () {
  if (timeLeft >= 15 ) {
    timeLeft -= 15;
  } else { 
    timeLeft = 1;
  }
}

function nextQuestion () {
  currentQuestionIndex++;
  if (currentQuestionIndex < questionArray.length) {
    showQuestion();
  } else {
    highScore ();
  }
}

function highScore () {
  hidePreviousQuestion ();
  if (timeLeft <= 0) {
    questionEl.innerText = "Congratulations! You scored 0 Points!";
  } else {
  questionEl.innerText = "Congratulations! You scored " + (timeLeft-1) + " Points!";
  }
  formPage ();
  backBtn.style.display = "block";
}

nextBtn.addEventListener("click", ()=>{
  if(currentQuestionIndex < questionArray.length) {
  nextQuestion();
  }
});

startBtn.addEventListener("click", startGame);

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

function renderNames () {
  nameList.innerHTML = "";
  for (let j = 0; j < names.length; j++) {
    let name = names[j];
    let li = document.createElement("li");
    li.textContent = name;
    li.setAttribute("data-index", j);
    nameList.appendChild(li);
    highScoreBtn.style.display = "block";
  }
}

function init() {
  let storedNames = JSON.parse(localStorage.getItem("names"));
  if (storedNames !== null) {
    names = storedNames;
  }
  renderNames ();
}

function storeNames () {
  localStorage.setItem("names", JSON.stringify(names));
}

function hideInputBox () {
  nameForm.style.display = "none";
}

nameForm.addEventListener("submit", function(event) {
  event.preventDefault();
  let nameText = nameTextEl.value + " - " + timeLeft + " pts";
  if (nameText === "") {
    return;
  }

  names.push(nameText);
  nameTextEl.value = "";

  storeNames ();
  renderNames ();
  hideInputBox ();
});

highScoreBtn.addEventListener("click",getScores);

function getScores () {
  clearInterval(timeInterval);
  hideHomePage ();
  formPage ();
  questionContainerEl.style.display = "none";
  nameForm.style.display = "none";
  backBtn.style.display = "block";
}

function formPage () {
  nameContainer.style.display = "block";
  nameForm.style.display = "block";
  nameFormat.style.display = "block";
  nameTextEl.style.display = "block";
}

backBtn.addEventListener("click",startGame);

