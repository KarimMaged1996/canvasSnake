const canvas = document.querySelector('[data-canvas]');
const ctx = canvas.getContext('2d');
const block = 15;

const canvasDims = {
  width: 30 * block,
  height: 30 * block,
};

// set the width and height of the canvas
canvas.width = canvasDims.width;
canvas.height = canvasDims.height;

// make the color of the canvas black
ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvasDims.width, canvasDims.height);

// make our snake
const snakeHead = {
  color: 'green',
  snakeX: block,
  snakeY: block,
};

const food = {
  color: 'red',
  width: block,
  height: block,
  X: 25 * block,
  Y: 14 * block,
};

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // make the color of the canvas black
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvasDims.width, canvasDims.height);

  // render the snake on the canvas initially
  ctx.fillStyle = snakeHead.color;
  ctx.fillRect(5 * block, 14 * block, block, block);

  // render the food on the canvas initially
  (ctx.fillStyle = food.color),
    ctx.fillRect(food.X, food.Y, food.width, food.height);

  //sets an interval to allow animation
  requestAnimationFrame(animate);
}

animate();
