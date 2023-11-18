let timeEl = document.getElementById("timer");

function countDown() {
    let timeLeft = 10;
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
countDown ();

