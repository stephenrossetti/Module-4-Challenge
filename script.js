let timeEl = document.getElementById("timer");
let startButton = document.querySelector("#startButton");
let image = document.querySelector(".img")
let questions = document.querySelector("#quiz")

function homePage () {
  questions.style.display = "none";
}
homePage ();

function startGame() {
  hideImg ();
  displayQuestions ();
  countDown ();
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

function hideImg () {
  image.style.display = "none";
  startButton.style.display = "none";
}

function displayQuestions () {
  questions.style.display = "";
}

startButton.addEventListener("click", startGame);





