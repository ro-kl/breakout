let playBox = document.getElementById("playBox");
let context = playBox.getContext("2d");

let x = playBox.width / 2;
let y = playBox.height - 30;

function ball(){
    context.beginPath();
    context.arc(x, y, 10, 0, Math.PI * 2);
    context.fillStyle = "red";
    context.fill();
    context.closePath();
}


function draw() {
    context.clearRect(0,0,playBox.width, playBox.height)
    ball();
    x += 2;
    y -= 2;
}

setInterval(draw, 10);



