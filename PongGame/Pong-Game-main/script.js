var keysPressed = {};
var isGameOver = false; 

var Ball = {
    x: 50,
    y: 50,
    speedX: 2,
    speedY: 2,
    radius: 10
};

var Player1 = {
    y: 150,
    height: 100,
    speed: 3,
    score: 0
};

var Player2 = {
    y: 150,
    height: 100,
    speed: 3,
    score: 0
};

var canvas = document.querySelector('canvas');
var context = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

function drawBall() {
    context.beginPath();
    context.arc(Ball.x, Ball.y, Ball.radius, 0, Math.PI * 2);
    context.fillStyle = 'black';
    context.fill();
    context.closePath();
}

function drawPlayers() {
    context.fillStyle = 'blue';
    context.fillRect(50, Player1.y, 20, Player1.height);

    context.fillStyle = 'red';
    context.fillRect(canvas.width - 70, Player2.y, 20, Player2.height);
}

function movePlayers() {
    if (keysPressed[83] && Player1.y < canvas.height - Player1.height) {
        Player1.y += Player1.speed;
    }
    if (keysPressed[87] && Player1.y > 0) {
        Player1.y -= Player1.speed;
    }
    if (keysPressed[40] && Player2.y < canvas.height - Player2.height) {
        Player2.y += Player2.speed;
    }
    if (keysPressed[38] && Player2.y > 0) {
        Player2.y -= Player2.speed;
    }
}

function moveBall() {
    Ball.x += Ball.speedX;
    Ball.y += Ball.speedY;

    if (Ball.y + Ball.radius >= canvas.height || Ball.y - Ball.radius <= 0) {
        Ball.speedY = -Ball.speedY;
    }

    if (
        Ball.x - Ball.radius <= 70 &&
        Ball.y >= Player1.y &&
        Ball.y <= Player1.y + Player1.height
    ) {
        Ball.speedX = -Ball.speedX;
    } else if (
        Ball.x + Ball.radius >= canvas.width - 70 &&
        Ball.y >= Player2.y &&
        Ball.y <= Player2.y + Player2.height
    ) {
        Ball.speedX = -Ball.speedX;
    }

    if (Ball.x + Ball.radius < 0) {
        Player2.score++;
        resetBall();
        updateScore();
        checkScore();
    } else if (Ball.x - Ball.radius > canvas.width) {
        Player1.score++;
        resetBall();
        updateScore();
        checkScore();
    }
}

function updateScore() {
    if (!isGameOver) {
        document.getElementById('score').textContent = `Player 1: ${Player1.score} - Player 2: ${Player2.score}`;
    }
}

function checkScore() {
    if (Player1.score === 3 || Player2.score === 3) {
        endGame(Player1.score === 3 ? "Player 1" : "Player 2");
        isGameOver = true; 
    }
}

function resetBall() {
    Ball.x = canvas.width / 2;
    Ball.y = canvas.height / 2;
    Ball.speedX = -Ball.speedX;
    Ball.speedY = -Ball.speedY;
}

function endGame(winner) {
    alert(`Game Over! ${winner} wins with a score of 3`);
}

function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPlayers();
}

function update() {
    movePlayers();
    moveBall();
}

function loop() {
    if (!isGameOver) {
        update();
        draw();
        requestAnimationFrame(loop);
    }
}

document.addEventListener('keydown', function (event) {
    keysPressed[event.keyCode] = true;
});

document.addEventListener('keyup', function (event) {
    delete keysPressed[event.keyCode];
});

document.getElementById('replayBtn').addEventListener('click', function () {
    resetGame(); 
});

function resetGame() {
    Player1.score = 0;
    Player2.score = 0;
    isGameOver = false;
    updateScore();
    resetBall();
    loop();
}


document.getElementById('otherGameBtn').addEventListener('click', function () {
    window.location.href = 'http://127.0.0.1:8080/GameCatalog/main.html'; 
});


loop();
