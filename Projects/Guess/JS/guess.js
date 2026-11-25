let secNum = Math.floor(Math.random() * 21);
let tries = 0;
let gameOver = false;

function checkGuess() {

    if (gameOver) {
        return;
    }

    let guessValue = document.getElementById("guessInput").value.trim();
    let userGuess = Number(guessValue);
    let result = document.getElementById("result");
    
    if (guessValue === "" || isNaN(userGuess)) {
        result.textContent = "Atleast try to guess!";
        return;
    }    

    if (userGuess < 0 || userGuess > 20) {
        result.textContent = "Not one keen on reading now are you!";
        return;
    }

    tries++;
    document.getElementById("tries").textContent = "Tries: " + tries;

    
    if (userGuess === secNum) {
        result.textContent = "Correct! Press Reset to play again.";
        gameOver = true;
        document.getElementById("guessInput").disabled = true;
        saveScore(tries);
    }

    else if (userGuess > secNum && userGuess <= secNum + 2) {
        result.textContent = "A bit high!";
    }
    else if (userGuess < secNum && userGuess >= secNum - 2) {
        result.textContent = "A bit low!";
    }
    else if (userGuess > secNum && userGuess <= secNum + 4) {
        result.textContent = "High";
    }
    else if (userGuess < secNum && userGuess >= secNum - 4) {
        result.textContent = "Low";
    }
    else if (userGuess > secNum) {
        result.textContent = "Too high!";
    }
    else {
        result.textContent = "Too low!";
    }


}


function getScores() {
    try {
        return JSON.parse(localStorage.getItem("guessScores")) || [];
    } catch {
        return [];
    }
}

function saveScore(score) {
    let scores = getScores();

    scores.push(score);

    scores.sort((a, b) => a - b);

    scores = scores.slice(0, 5);

    localStorage.setItem("guessScores", JSON.stringify(scores));

    displayLeaderboard();
}



function displayLeaderboard() {
    let scores = getScores();

    let scoreList = document.getElementById("scoreList");

    scoreList.innerHTML = "";

    if (scores.length === 0) {
        let row = document.createElement("div");
        row.textContent = "No scores yet. Win a game to get on the board!";
        scoreList.appendChild(row);
        return;
    }

    scores.forEach((score, index) => {
        let row = document.createElement("div");
        let word = score === 1 ? "attempt" : "attempts";

        if (index === 0) {
            row.textContent = `🥇  You completed the game in  ${score} ${word}`;
        }
        else if (index === 1) {
            row.textContent = `🥈  You completed the game in  ${score} ${word}`;
        }
        else if (index === 2) {
            row.textContent = `🥉  You completed the game in  ${score} ${word}`;
        }
        else {
            row.textContent = `${index + 1 }. You completed the game in  ${score} ${word}`;
        }

        scoreList.appendChild(row);
    });
}
displayLeaderboard();

function resetGame() {
    secNum = Math.floor(Math.random() * 21);
    tries = 0;
    gameOver = false;
    document.getElementById("tries").textContent = "Tries: 0";
    document.getElementById("result").textContent = "";
    document.getElementById("guessInput").value = "";
    document.getElementById("guessInput").disabled = false;
}

function toggleLeaderboard() {

    let leaderboard = document.getElementById("leaderboard");
    let contentWrapper = document.getElementById("contentWrapper");

    leaderboard.classList.toggle("hidden");
    contentWrapper.classList.toggle("leaderboard-open");
}