const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const size = 40;
const cellSize = 10;
let cells = [];
let intervalId = null;

function init() {
    for (let i = 0; i < size; i++) {
        cells[i] = [];
        for (let j = 0; j < size; j++) {
            cells[i][j] = Math.random() > 0.7 ? 1 : 0;
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            ctx.fillStyle = cells[i][j] ? 'black' : 'white';
            ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
        }
    }
}

function update() {
    let newCells = cells.map(row => [...row]);
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const neighbors = countNeighbors(i, j);
            if (cells[i][j] === 1 && (neighbors < 2 || neighbors > 3)) {
                newCells[i][j] = 0;
            } else if (cells[i][j] === 0 && neighbors === 3) {
                newCells[i][j] = 1;
            }
        }
    }
    cells = newCells;
    draw();
}

function countNeighbors(x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const nx = x + i;
            const ny = y + j;
            if (nx >= 0 && nx < size && ny >= 0 && ny < size && cells[nx][ny] === 1) {
                count++;
            }
        }
    }
    return count;
}

function startGame() {
    intervalId = setInterval(update, 100);
}

function stopGame() {
    clearInterval(intervalId);
}

function resetGame() {
    init();
    draw();
}

function toggleCell(event) {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / cellSize);
    const y = Math.floor((event.clientY - rect.top) / cellSize);
    cells[y][x] = cells[y][x] === 1 ? 0 : 1;
    draw();
}

canvas.addEventListener('click', toggleCell);
document.getElementById('start').addEventListener('click', startGame);
document.getElementById('stop').addEventListener('click', stopGame);
document.getElementById('reset').addEventListener('click', resetGame);

init();
draw();
