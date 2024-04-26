const grid = document.getElementById("grid");
const gridHeight = document.documentElement.scrollHeight;
const gridWidth = document.documentElement.scrollWidth;
const colors = ['#E5625E', '#C3BEF7', '#63E2C6', '#E5E059', '#595457', '#FFF', '#FFF',];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const numSquares = gridHeight * gridWidth / 10000;
for (let i = 0; i <= numSquares; i++) {
    const square = document.createElement("div");
    square.className = "square";

    const color = colors[getRandomInt(colors.length)];
    square.style.backgroundColor = color;

    square.addEventListener('mouseover', () => {
        const color = colors[getRandomInt(colors.length)];
        square.style.backgroundColor = color;
    });

    grid.appendChild(square);
}