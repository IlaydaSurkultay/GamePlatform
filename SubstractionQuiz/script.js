var questions = [];
var answers = [];
var index = 0;
var turn = 0;
var scores = {}; 
var players = ['', '']; 

var quiz = [];

function startGame() {
    players[0] = document.getElementById("player1").value;
    players[1] = document.getElementById("player2").value;

    scores[players[0]] = 0;
    scores[players[1]] = 0;

    document.getElementById("playerNames").style.display = 'none';
    document.getElementById("game").style.display = 'block';

    displayPlayers();
    generateQuestions();
    displayQuestion();
}

function restartGame() {
    questions = [];
    answers = [];
    index = 0;
    turn = 0;
    quiz = [];
    scores = {};

    scores[players[0]] = 0;
    scores[players[1]] = 0;

    displayPlayers();
    generateQuestions();
    displayQuestion();

    document.getElementById("final").innerHTML = "";
    document.getElementById("result").innerHTML = ""; 
    document.getElementById("scoreboard").innerHTML = ""; 

    document.getElementById("scoreboard").style.display = "none";
    document.getElementById("result").style.display = "none";

    if (index === questions.length) {
        endGame();
    }
}


function displayPlayers() {
    document.getElementById("playerNames").innerHTML = "Player 1: " + players[0] + "<br>Player 2: " + players[1];
}

function generateQuestions() {
    for (var i = 0; i < 10; i++) {
        var num1 = Math.floor(Math.random() * 10);
        var num2 = Math.floor(Math.random() * 10);

        var max = Math.max(num1, num2);
        var min = Math.min(num1, num2);

        questions[i] = max + " - " + min + " = ";
        answers[i] = max - min;
    }
}

function displayQuestion() {
    document.getElementById("Questions").innerHTML = ("Question " + (index + 1) + ": ").bold() + questions[index] + " ? <br>" + players[turn] + "'s turn";

}

function checkAnswer() {
    
    var studentSol = document.getElementById("StudentSol").value;

    var quizQuestion = { question: questions[index], answer: answers[index], studentAnswer: studentSol };
    quiz[index] = quizQuestion;

    var currentPlayer = index % 2; 
    var currentPlayerName = players[currentPlayer];

    if (studentSol == answers[index]) {
        alert("Your Answer is TRUE!");
        scores[currentPlayerName]++;
        document.getElementById("scoreboard").innerHTML = showScores();
    } else {
        alert("Your answer is WRONG!");
    }

    index++;

    if(index%2==0){
        turn=0;
    }else{
        turn=1;
    }
    if (index < questions.length) {
        displayQuestion();
        document.getElementById("StudentSol").value = "";
    } else if (index === questions.length) {
        endGame();
    }
}

function endGame() {
    document.getElementById("Questions").innerHTML = ("Quiz Completed");

    document.getElementById("final").innerHTML = summary();
    document.getElementById("scoreboard").innerHTML = showScores();

    document.getElementById("result").innerHTML = showResult();
}

function summary() {
    var message = " ";
    for (var i = 0; i < quiz.length; i++) {
        if (quiz[i].answer == quiz[i].studentAnswer) {
            message += quiz[i].question + " " + quiz[i].studentAnswer + " "+ players[(i%2)] +" gives correct answer <br>";
        } else {
            message += quiz[i].question + " " + quiz[i].studentAnswer + " " +players[(i%2)] +" gives wrong answer. Should be " + quiz[i].answer + "<br>";
        }
    }
    return message;
}

function showScores() {
    var scoreboard = "<h2>Scores</h2>";
    for (var i = 0; i < players.length; i++) {
        scoreboard += players[i] + ": " + scores[players[i]] + "<br>";
    }

    var maxScore = Math.max(...Object.values(scores));
    var winners = Object.keys(scores).filter(player => scores[player] === maxScore);

    if (winners.length === 1) {
        scoreboard += "<h2>Winner</h2>";
        scoreboard += winners[0] + " wins with " + scores[winners[0]] + " correct answers!";
    } else {
        scoreboard += "<h2>Result</h2>";
        scoreboard += "It's a tie!";
    }

    return scoreboard;
}

function showResult() {
    var maxScore = Math.max(...Object.values(scores));
    var winners = Object.keys(scores).filter(player => scores[player] === maxScore);

    if (winners.length === 1) {
        return "<h2>Result</h2>" + winners[0] + " wins with " + scores[winners[0]] + " correct answers!";
    } else {
        return "<h2>Result</h2>It's a tie!";
    }
}

document.getElementById('otherGameBtn').addEventListener('click', function () {
    window.location.href = 'http://127.0.0.1:8080/GameCatalog/main.html'; 
});
