let playBox = document.getElementById("playBox");
let context = playBox.getContext("2d");

let x = playBox.width / 2;
let y = playBox.height - 30;

let radius = 10;

let dy = -1;
let dx = 1;

let barHeight = 15;
let barWidth = 120;
let barX = (playBox.width - barWidth) / 2;

let rightKeyPressed = false;
let leftKeyPressed = false;

const BRICK_ROWS = 5;
const BRICK_COLS = 8;
const BRICK_WIDTH = 80;
const BRICK_HEIGHT = 20;
const BRICK_MARGIN = 10;
const BRICK_OFFSET_TOP = 30;
const BRICK_OFFSET_LEFT = 30;

let bricks = [];
for (let i = 0; i < BRICK_COLS; i++) {
    bricks[i] = [];
    for (let j = 0; j < BRICK_ROWS; j++) {
        bricks[i][j] = {
            x: 0,
            y: 0
        };
    }
}

function renderBricks() {
    for (let i = 0; i < BRICK_COLS; i++) {
        for (let j = 0; j < BRICK_ROWS; j++) {
            let x = (i * (BRICK_WIDTH + BRICK_MARGIN)) + BRICK_OFFSET_LEFT;
            let y = (j * (BRICK_HEIGHT + BRICK_MARGIN)) + BRICK_OFFSET_TOP;
            bricks[i][j] = { x, y };
            context.beginPath();
            context.rect(x, y, BRICK_WIDTH, BRICK_HEIGHT);
            context.fillStyle = 'red'; // '#163D35';
            context.fill();
            context.closePath();
        }
    }
}

function renderBall() {
    context.beginPath();
    context.arc(x, y, 10, 0, Math.PI * 2);
    context.fillStyle = "#163D35";
    context.fill();
    context.closePath();
}

function speedUp() {
    this.dy = (dy < 0) ? dy-- : dy++;
    this.dx = (dx < 0) ? dx-- : dx++;
}

function renderBar() {
    context.beginPath();
    context.rect(barX, playBox.height - barHeight, barWidth, barHeight);
    context.fillStyle = '#163D35';
    context.fill();
    context.closePath();
}

function draw() {
    context.clearRect(0, 0, playBox.width, playBox.height)
    renderBall();
    renderBar();
    if (x + dx > playBox.width - radius || x + dx < radius) {
        dx = -dx;
    }
    if (y + dy < radius) {
        dy = -dy;
    } else if (y + dy > playBox.height - radius) {

        if (x > barX && x < barX + barWidth) {
            dy = -dy;
        } else {
            endGame();
        }
    }

    x += dx;
    y += dy;

    if (rightKeyPressed && barX < playBox.width - barWidth) {
        barX += 10;
    }

    if (leftKeyPressed && barX > 0) {
        barX -= 10;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightKeyPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftKeyPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightKeyPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftKeyPressed = false;
    }
}

let drawInterval = setInterval(draw, 10);
setInterval(speedUp, 5000);

renderBricks();

function endGame() {
    alert("GAME OVER");
    document.location.reload();
    clearInterval(drawInterval);
}