let timeEl = document.getElementById("timer");
let startButton = document.getElementById("startButton");
let image = document.querySelector(".img")
let questionContainerEl = document.getElementById("questionContainer");
let questionEl = document.getElementById("question");
let answersEl = document.getElementById("answers");
let shuffledQuestions, currentQuestionIndex


function homePage () {
  questionContainerEl.style.display = "none";
}
homePage ();

function startGame() {
  hideHomePage ();
  countDown ();
  questionContainerEl.style.display = "";
  shuffledQuestions = questionArray.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  inputNextQuestion ();
}

function countDown() {
    let timeLeft = 100;
    var timerInterval = setInterval(function() {
        timeLeft--;
        timeEl.textContent = "Time Remaining: " + timeLeft + "s";
        if(timeLeft === 0) {
          clearInterval(timerInterval);
          sendMessage();
        }
    }, 1000);
}

function sendMessage() {
        timeEl.textContent = "Times Up!";
}

function hideHomePage () {
  image.style.display = "none";
  startButton.style.display = "none";
}

function inputNextQuestion () {
  hidePreviousQuestion();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion (question) {
  questionEl.innerText = question.question;
  question.answers.forEach(answer => {
    let button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    answersEl.appendChild(button);
  })
}

function hidePreviousQuestion () {
  while(answersEl.firstChild) {
    answersEl.removeChild(answersEl.firstChild);
  }
}

function selectAnswer () {

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
]



