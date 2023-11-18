let timeEl = document.getElementById("timer");
let startButton = document.querySelector("#startButton");


function startGame() {
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

startButton.addEventListener("click", startGame);





