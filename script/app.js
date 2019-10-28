const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;
let blockSize = 10;
let widthInBlocks = width / blockSize;
let heightInBlocks = height / blockSize;
let score = 0;
let speed = 150;
let timeoutlId = 0;

const circle = (x, y, radius, fillCircle) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  if (fillCircle) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
}

const drawBorder = () => {
  ctx.fillStyle = 'Gray';
  ctx.fillRect(0, 0, width, blockSize);
  ctx.fillRect(0, height - blockSize, width, blockSize);
  ctx.fillRect(0, 0, blockSize, height);
  ctx.fillRect(width - blockSize, 0, blockSize, height)
}

let drawScore = () => {
  ctx.font = '20px Courier';
  ctx.fillStyle = 'Black';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillText(`Score: ${score}`, blockSize, blockSize);
}

let gameOver = () => {
  clearTimeout(timeoutlId);
  ctx.font = '60px Courier';
  ctx.fillStyle = 'Black';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('GAME OVER', width / 2, height / 2);
}

let snake = new Snake();
let apple = new Apple();

let newGame = () => {
  ctx.clearRect(0, 0, width, height);
  drawScore();
  snake.move();
  snake.draw();
  apple.draw();
  drawBorder();
  timeoutlId = setTimeout(newGame, speed);
}

newGame();

const directions = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
};

$('body').keydown(e => {
  let newDirection = directions[e.keyCode];
  if (newDirection !== undefined) {
    snake.setDirection(newDirection);
  }
});