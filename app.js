const canvas = document.getElementById("canvas");
const canvasHeight = document.documentElement.scrollHeight;
const canvasWidth = document.documentElement.scrollWidth;
const colors = ['#E5625E', '#C3BEF7', '#63E2C6', '#E5E059', '#595457', '#FFF'];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// todo: recalculate all this on resize? for responsiveness hmmmmmm
canvas.height = canvasHeight;
canvas.width = canvasWidth;
const ctx = canvas.getContext('2d');

// get 10 equal width squares...will I adjust it hmmmmmmmmmmmmm
// is canvas responsive? can i make it so hmhmhm
const numCols = 15;
const squareSideLength = canvasWidth / numCols;
const numRows = canvasHeight / squareSideLength;
for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
        ctx.fillStyle = colors[getRandomInt(colors.length)];
        ctx.fillRect(col * squareSideLength, row * squareSideLength, squareSideLength, squareSideLength);
    }
}


const lastXY = [-1, -1];
canvas.onmousemove = function(event) {
    const rect = this.getBoundingClientRect(),
    x = event.clientX - rect.left,
    y = event.clientY - rect.top; 

    const squareX = squareSideLength * Math.floor(x / squareSideLength);
    const squareY = squareSideLength * Math.floor(y / squareSideLength);

    if (!(lastXY[0] === squareX && lastXY[1] === squareY)) {
        ctx.fillStyle = colors[getRandomInt(colors.length)];
        ctx.fillRect(squareX, squareY, squareSideLength, squareSideLength);
        lastXY[0] = squareX;
        lastXY[1] = squareY;
    }
}