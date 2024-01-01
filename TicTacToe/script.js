var playGround = document.getElementById("playGround")
var players = document.getElementById("players")
var gameTurn = document.getElementById("gameTurn")
var replay = document.getElementById("replay")
var introduction = document.getElementById("introduction");
first = document.getElementById("first")
second = document.getElementById("second")

var playGroundCell = [0, 0, 0, 0, 0, 0, 0, 0, 0];
var turn = 1;
var playing = 0;
var replayGame = 0;



function playGame() {
    players.remove()
    playGround.style.display = "block";
    replay.style.display = "block";
    createCellButton()
    introduction.textContent = "X: " + first.value + " O: " + second.value;
    gameTurn.textContent = first.value + "'s Turn"
    var otherGameBtn = document.getElementById("otherGameBtn");
    otherGameBtn.style.display = "block";
    document.getElementById('gameRules').style.display = 'block';
}

function click(e) {

    if (playing == 0) {
        var insideCell = document.createElement("div")

        var id = e.target.id;
        if (playGroundCell[id] == 0) {
            if (turn == 1) {
                write = "cross";
                turn++;
                gameTurn.textContent = second.value + "'s Turn"
            }
            else {
                write = "circle";
                turn--;
                gameTurn.textContent = first.value + "'s Turn"
            }

            insideCell.classList.add(write)
            e.target.append(insideCell)
            playGroundCell[id]++;

        }
        else {
            alert("That case is already occupied. Please select another case.");
        }
        CountScore(e);
    }
    else {
        alert("Game has already ended. Click the Reset replay to play a new game");
    }


}

function CountScore() {
    var allCases = document.querySelectorAll(".case")

    var possibilities = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ]

    var circleNum = 0;
    var crossNum = 0;

    var countNonFill = 0;
    var tiedRows = 0;

    for (var i = 0; i < possibilities.length; i++) {
        circleNum = 0;
        crossNum = 0;
        countNonFill = 0;

        var part = [0, 0, 0];

        for (var j = 0; j < possibilities[i].length; j++) {
            if (allCases[possibilities[i][j]].firstChild && allCases[possibilities[i][j]].firstChild.classList.contains("circle")) {
                circleNum++;
                part[j] = possibilities[i][j];
            }

            else if (allCases[possibilities[i][j]].firstChild && allCases[possibilities[i][j]].firstChild.classList.contains("cross")) {
                crossNum++;
                part[j] = possibilities[i][j];
            }
            else {
                countNonFill++;
            }

        }

        if (circleNum == 3) {
            gameTurn.textContent = second.value + " Wins!"
            playing = 1;

            winningDesign(part)
            break;
        }
        else if (crossNum == 3) {
            gameTurn.textContent = first.value + " Wins!"
            playing = 1;
            winningDesign(part);
            break;
        }
        if (countNonFill == 0) {
            tiedRows++;

        }
    }
    if (tiedRows == 8) {
        playing = 1;
        gameTurn.textContent = "Nobody Wins!"

    }
}


function replayButton() {
    replayGame++;
    alert("This will restart the game and clear all the current scores. OK?");
    playing = 0;
    playGroundCell = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    if (replayGame %2==0) {
        turn = 1;
        gameTurn.textContent = first.value + "'s Turn";
    } else {
        turn = 2;
        gameTurn.textContent = second.value + "'s Turn";
    }
    var cells = document.querySelectorAll(".case");
    cells.forEach((cell) => {
        cell.remove();
    });
    createCellButton();


}

function createCellButton() {
    playGroundCell.forEach((cell, index) => {
        var cells = document.createElement("div")
        cells.classList.add("case")
        cells.id = index;
        cells.addEventListener("click", click)
        playGround.append(cells)
    })
}
function winningDesign(part) {
    var a = part[0];
    var b = part[1];
    var c = part[2];

    const caseA = document.getElementById(a);
    const caseB = document.getElementById(b);
    const caseC = document.getElementById(c);

    caseA.classList.add("design");
    caseB.classList.add("design");
    caseC.classList.add("design");
}

document.getElementById('otherGameBtn').addEventListener('click', function () {
    window.location.href = 'http://127.0.0.1:8080/GameCatalog/main.html'; 
});