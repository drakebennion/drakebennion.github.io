const canvas = document.getElementById("canvas");
const colors = ['#E5625E', '#C3BEF7', '#63E2C6', '#E5E059', '#595457', '#DDD'];
const darkerColors = ['#bf433f',
    '#8d87ca',
    '#49c0a6',
    '#c3bf3f',
    '#3e383c', '#aaa']

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

    const numCols = canvasWidth <= 600 ? 10 : 15; 
    const squareSideLength = canvasWidth / numCols;
    const numRows = canvasHeight / squareSideLength;
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            const rand = getRandomInt(colors.length);
            const grad = ctx.createLinearGradient(col * squareSideLength, row * squareSideLength, col * squareSideLength + squareSideLength, row * squareSideLength + squareSideLength);
            grad.addColorStop(0, colors[rand]);
            grad.addColorStop(1, darkerColors[rand]);
            ctx.fillStyle = grad;
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
            const rand = getRandomInt(colors.length);
            const grad = ctx.createLinearGradient(squareX, squareY, squareX + squareSideLength, squareY + squareSideLength);
            grad.addColorStop(0, colors[rand]);
            grad.addColorStop(1, darkerColors[rand]);
            ctx.fillStyle = grad;
            ctx.fillRect(squareX, squareY, squareSideLength, squareSideLength);
            lastXY[0] = squareX;
            lastXY[1] = squareY;
        }
    }
}