const grid = document.getElementById("grid");
const gridHeight = document.documentElement.scrollHeight;
const colors = ['#E5625E', '#C3BEF7', '#63E2C6', '#E5E059', '#595457'];

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

for (let i = 0; i < 480; i++) {
    const square = document.createElement("div");
    square.className = "square";

    square.addEventListener('mouseover', () => {
        const color = colors[getRandomInt(colors.length)];
        square.style.backgroundColor = color;
    });

    grid.appendChild(square);
}