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
    questionEl.innerText = "You need to study more! You scored 0 Points!";
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
  { question: "How can a datatype be declared to be a constant type?",
    answers: [
    {text: "const", correct:true},
    {text: "var", correct:false},
    {text: "let", correct:false},
    {text: "constant", correct:false}
  ] },
  { question: "In which HTML element, we put the JavaScript code?",
    answers: [
    {text: "<javascript>...</javascript>", correct:false},
    {text: "<js>...</js>", correct:false},
    {text: "<script>...</script>", correct:true},
    {text: "<css>...</css>", correct:false}
  ] },
  { question: "Which JavaScript method is used to access an HTML element by id?",
    answers: [
    {text: "getElementById()", correct:false},
    {text: "getElement(id)", correct:false},
    {text: "elementById(id)", correct:false},
    {text: "getElementById(id)", correct:true}
  ] },
  { question: "Which JavaScript method is used to write on browser's console?",
    answers: [
    {text: "console.log()", correct:true},
    {text: "console.writeHTML()", correct:false},
    {text: "console.output()", correct:false},
    {text: "console.write()", correct:false}
  ] },
  { question: "Which JavaScript method is used to call a function (a callback function) once for each array element?",
    answers: [
    {text: "for()", correct:false},
    {text: "forEach()", correct:true},
    {text: "traverse()", correct:false},
    {text: "foreach()", correct:false}
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

