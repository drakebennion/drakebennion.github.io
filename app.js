const canvas = document.getElementById("canvas");
const colors = ['#E5625E', '#C3BEF7', '#63E2C6', '#E5E059', '#595457', '#FFF'];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

window.onload = function() {
    initCanvas();
}

window.onresize = function() {
    // todo: this works :) but if you shrink screen then expand, more space continually added
    // below...figure that out soon :) 

    // also might be nice to wait for resize to be done before recalculating hmm
    initCanvas();
}

function initCanvas() {
    const canvasHeight = document.documentElement.scrollHeight;
    const canvasWidth = document.documentElement.scrollWidth;
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;
    const ctx = canvas.getContext('2d');

    const numCols = 15; // todo: higher number for wider screens
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
}