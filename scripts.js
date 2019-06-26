let playBox = document.getElementById("playBox");
let context = playBox.getContext("2d");

let x = playBox.width / 2;
let y = playBox.height - 30;

const RADIUS = 10;
const BALL_DIRECTION = Math.random() < 0.5;

let dy = -1;
let dx = BALL_DIRECTION ? 1 : -1;

const BAR_HEIGHT = 15;
const BAR_WIDTH = 200;
let barX = (playBox.width - BAR_WIDTH) / 2;

let rightKeyPressed = false;
let leftKeyPressed = false;

const BRICK_ROWS = 5;
const BRICK_COLS = 10;
const BRICK_WIDTH = 80;
const BRICK_HEIGHT = 20;
const BRICK_MARGIN = 10;
const BRICK_OFFSET_TOP = 50;
const BRICK_OFFSET_LEFT = 30;
const COUNT_BRICKS = BRICK_ROWS * BRICK_COLS;

const INSTRUCTION_MESSAGE = `Instructions\n\nUse the arrow keys or the mouse to move the bar.\nThe speed increase every 5 seconds.\nPress 's' to slow down the ball, 'p' to pause the game and 'i' for instructions.\nThe game ends if you hit all ${COUNT_BRICKS} bricks.\n\nGood luck :)`;
const HIGHLIGHT_COLOR= "#497CB3";

let points = 0;
let speed = 1;
let pause = false;

let bricks = [];
for (let i = 0; i < BRICK_COLS; i++) {
    bricks[i] = [];
    for (let j = 0; j < BRICK_ROWS; j++) {
        bricks[i][j] = {
            x: 0,
            y: 0,
            hit: 0
        };
    }
}

const renderBricks = () => {
    for (let i = 0; i < BRICK_COLS; i++) {
        for (let j = 0; j < BRICK_ROWS; j++) {
            if (bricks[i][j].hit == 0) {
                let x = (i * (BRICK_WIDTH + BRICK_MARGIN)) + BRICK_OFFSET_LEFT;
                let y = (j * (BRICK_HEIGHT + BRICK_MARGIN)) + BRICK_OFFSET_TOP;
                bricks[i][j] = { x, y, hit: 0 };
                context.beginPath();
                context.rect(x, y, BRICK_WIDTH, BRICK_HEIGHT);
                context.fillStyle = HIGHLIGHT_COLOR;
                context.fill();
                context.closePath();
            }
        }
    }
}

const renderBall = () => {
    context.beginPath();
    context.arc(x, y, 10, 0, Math.PI * 2);
    context.fillStyle = HIGHLIGHT_COLOR;
    context.fill();
    context.closePath();
}

const speedUp = () => {
    if(!pause){
        dy = (dy < 0) ? dy-- : dy++;
        dx = (dx < 0) ? dx-- : dx++;
        speed++;
    }
}

const speedDown = () => {
    dy = (dy < 0) ? dy++ : dy--;
    dx = (dx < 0) ? dx++ : dx--;
    speed--;
}

const pauseGame = () => {
    pause = !pause;
}

const showInstructions = () => {
    alert(INSTRUCTION_MESSAGE);
}

const renderBar= () => {
    context.beginPath();
    context.rect(barX, playBox.height - BAR_HEIGHT, BAR_WIDTH, BAR_HEIGHT);
    context.fillStyle = HIGHLIGHT_COLOR;
    context.fill();
    context.closePath();
}

const renderPoints= () => {
    context.font = "15px Arial";
    context.fillStyle = "#497CB3";
    context.fillText(`destroyed: ${points} / ${COUNT_BRICKS}   |   speed: ${speed}`, 30, 30);
}

const render = () => {
    if(!pause) {
        context.clearRect(0, 0, playBox.width, playBox.height);
        renderBall();
        renderBar();
        detectCollision();
        renderBricks();
        renderPoints();
        
        if (x + dx > playBox.width - RADIUS || x + dx < RADIUS) {
            dx = -dx;
        }
        if (y + dy < RADIUS) {
            dy = -dy;
        } else if (y + dy > playBox.height - RADIUS) {
            if (x > barX && x < barX + BAR_WIDTH) {
                if(y = y - BAR_HEIGHT) {
                    dy = -dy;
                }
            } else {
                gameOver();
            }
        }
    
        x += dx;
        y += dy;
    
        if (rightKeyPressed && barX < playBox.width - BAR_WIDTH) {
            barX += 10;
        }
    
        if (leftKeyPressed && barX > 0) {
            barX -= 10;
        }
    }
}



const keyDownHandler = (e) => {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightKeyPressed = true;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftKeyPressed = true;
    } else if (e.key == "s" && speed > 1) {
        speedDown();
    }else if (e.key == "p") {
        pauseGame();
    } else if (e.key == "i") {
        showInstructions();
    }
}

const keyUpHandler = (e) => {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightKeyPressed = false;
    } else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftKeyPressed = false;
    }
}

const mouseMoveHandler = (e) => {
    let relativePosition = e.clientX - playBox.offsetLeft;
    if(relativePosition > BAR_WIDTH / 2 && relativePosition < playBox.width - BAR_WIDTH / 2) {
        barX = relativePosition - BAR_WIDTH / 2;
    }
}

 const detectCollision = () => {
    for (let i = 0; i < BRICK_COLS; i++) {
        for (let j = 0; j < BRICK_ROWS; j++) {
            let b = bricks[i][j];
            if (b.hit == 0) {
                if (x > b.x && x < b.x + BRICK_WIDTH && y > b.y && y < b.y + BRICK_HEIGHT) {
                    dy = -dy
                    b.hit = 1;
                    points++
                    if(points == COUNT_BRICKS) {
                        gameWon();
                    }
                }
            }
        }
    }
}

renderBricks();

let drawInterval = setInterval(render, 10);
setInterval(speedUp, 5000);

showInstructions();

const gameOver = () => {
    alert("GAME OVER");
    document.location.reload();
    clearInterval(drawInterval);
}

const gameWon = () => {
    alert("WON");
    document.location.reload();
    clearInterval(drawInterval);
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);