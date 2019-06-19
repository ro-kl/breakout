let playBox = document.getElementById("playBox");
let context = playBox.getContext("2d");

let x = playBox.width / 2;
let y = playBox.height - 30;

let radius = 10;

let dy = -1;
let dx = 1;

let barHeight = 10;
let barWidth = 80;
let barX = (playBox.width - barWidth) / 2;

let rightKeyPressed = false;
let leftKeyPressed = false;

function ball() {
    context.beginPath();
    context.arc(x, y, 10, 0, Math.PI * 2);
    context.fillStyle = "red";
    context.fill();
    context.closePath();
}

function speedUp() {
    this.dy = (dy < 0) ? dy-- : dy++;
    this.dx = (dx < 0) ? dx-- : dx++;
}

function bar() {
    context.beginPath();
    context.rect(barX, playBox.height - barHeight, barWidth, barHeight);
    context.fillStyle = 'blue';
    context.fill();
    context.closePath();
}

function draw() {
    context.clearRect(0, 0, playBox.width, playBox.height)
    ball();
    bar();
    if (x + dx > playBox.width - radius || x + dx < radius) {
        dx = -dx;
    }
    if (y + dy > playBox.height - radius || y + dy < radius) {
        dy = -dy;
    }
    x += dx;
    y += dy;

    if(rightKeyPressed) {
        barX += 10;
    }
    if(leftKeyPressed) {
        barX -= 10;
    }
}

document.addEventListener("keydown", keyPressHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyPressHandler(e) {
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

setInterval(draw, 10);
setInterval(speedUp, 5000);