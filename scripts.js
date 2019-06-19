let playBox = document.getElementById("playBox");
let context = playBox.getContext("2d");

let x = playBox.width / 2;
let y = playBox.height - 30;

let radius = 10;

let dy = -2;
let dx = 2;

function ball() {
    context.beginPath();
    context.arc(x, y, 10, 0, Math.PI * 2);
    context.fillStyle = "red";
    context.fill();
    context.closePath();
}


function draw() {
    context.clearRect(0, 0, radius, playBox.width, playBox.height)
    ball();
    x += dx;
    y += dy;
    if (x + dx > playBox.width - radius || x + dx < radius) {
        dx = -dx;
    }
    if (y + dy > playBox.height - radius || y + dy < radius) {
        dy = -dy;
    }

    x += dx;
    y += dy;

}

setInterval(draw, 10);



