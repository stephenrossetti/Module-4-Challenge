// Define all variables. getElementbyID from HTML and utilize other variables to refresh every time a function is ended//
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

//Hide the homepage after quiz starts//
function hideHomePage () {
  image.style.display = "none";
  startBtn.style.display = "none";
}

//Start the game. Starts at 100 seconds, shuffles the questions, shows the question, and hides homepage//
function startGame() {
  timeLeft = 101;
  shuffledQuestions = questionArray.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  hideHomePage ();
  showQuestion ();
  countDown ();
}

//Countdown for game/highscore. Normal time intervarl, but added an if/else statement so if it hits 0 there will be an alert and end the quiz. Also added clear interval to reset the timer//
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

//Physically shows the next question when quiz starts, or next button is clocked, by adding the Container. Also hides previous question//
function showQuestion () {
  questionContainerEl.style.display = "block";
  hidePreviousQuestion();
  inputQuestion(shuffledQuestions[currentQuestionIndex]);
}

//This function decides what is inputted into the question (i.e., grabs the answers and respective questions from array and places them within the pre-define HTML)//
//Function also includes an appended "button" that allows us to visually see if an answer was right or wrong based on colors in css (red/green)//
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

//Hides previous questions as well next/back buttons that display after questions are answered//
//This also removes the template answer data in the HTML (i.e., "Answer 1, Answer 2...". I kept the template for button functionally but can remove it visually)
function hidePreviousQuestion () {
  backBtn.style.display = "none";
  nextBtn.style.display = "none";
  nameContainer.style.display = "none";
  while(answersEl.firstChild) {
    answersEl.removeChild(answersEl.firstChild);
  }
}

//Appended answer buttons can be clicked here by clicking the "event target" (i.e., where I'm clicking on screen). This applies the class list in css for wrong/right answers//
//Also gives the next button its text//
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

//Created this function so a wrong answer that minuses 15 seconds doesn't make the time for in the negatives and skip 0. It auto goes to "0". For some reason setting the variable to 1 makes it go to 0//
function timerMinus () {
  if (timeLeft >= 15 ) {
    timeLeft -= 15;
  } else { 
    timeLeft = 1;
  }
}

//Function to go to the next question, but if all are answered in the array it will go to the score page and stop the time//
function nextQuestion () {
  currentQuestionIndex++;
  if (currentQuestionIndex < questionArray.length) {
    showQuestion();
  } else {
    highScore ();
  }
}

//Highscore page hides previous questions and determines a message based on time left. Added timeLeft variable to reflect the score (had to minus one to make them match)// 
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

//Next button clicks if there are still remaining questions. Originally had this function serve as a restart and next question but the code wasn't working. Created a new replay button instead//
nextBtn.addEventListener("click", ()=>{
  if(currentQuestionIndex < questionArray.length) {
  nextQuestion();
  }
});

startBtn.addEventListener("click", startGame);

//Created an array for questions and answers (together). This not only designates true and false answers but also allows questions to stay with answers and display over the HTML template//
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

//Everything below here is local storage code to save high scores and initials//

//Essentially a loop to keep appending new list items (i.e., high scores) everytime you play and hit submit. Similar to shopping list activity//
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

//A string to parse as JSON//
function init() {
  let storedNames = JSON.parse(localStorage.getItem("names"));
  if (storedNames !== null) {
    names = storedNames;
  }
  renderNames ();
}

//Stringifies data in local storage//
function storeNames () {
  localStorage.setItem("names", JSON.stringify(names));
}

//Hides the Initials input after submitting so you can't save you score twice//
function hideInputBox () {
  nameForm.style.display = "none";
}

//Runs the function by submitting initials. I added timeLeft here so it saves the timer locally and doesn't restart the amount every new game//
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

//Function for when HighScore button in navbar is clicked. Provides alternative to going through the whole quiz. Displays necessary areas.//
function getScores () {
  clearInterval(timeInterval);
  hideHomePage ();
  formPage ();
  questionContainerEl.style.display = "none";
  nameForm.style.display = "none";
  backBtn.style.display = "block";
}

//Late addition for efficiency to include all elements that need to be displayed at one time for the highscore pages//
function formPage () {
  nameContainer.style.display = "block";
  nameForm.style.display = "block";
  nameFormat.style.display = "block";
  nameTextEl.style.display = "block";
}

//Back buttoon because next button wouldn't work to restart game correctly//
backBtn.addEventListener("click",startGame);

