const canvas = document.querySelector('[data-canvas]');
const ctx = canvas.getContext('2d');
const block = 15;
let gameOver = false;
let paused = false;
let score = 0;
let scoreUI = document.querySelector('[data-score]');
const pasueBtn = document.querySelector('[data-pauseBtn]')
const dialog = document.querySelector('[data-modal]')
const againBtn = document.querySelector('[data-again]')


const canvasDims = {
  width: 30 * block,
  height: 30 * block,
};

// set the width and height of the canvas
canvas.width = canvasDims.width;
canvas.height = canvasDims.height;

// make our snake
const snakeHead = {
  color: 'green',
  snakeX: 5 * block,
  snakeY: 14 * block,
  speedX: 0,
  speedY: 0,
};
snakeBody = [];
const food = {
  color: 'red',
  width: block,
  height: block,
  X: 25 * block,
  Y: 14 * block,
};

function animate() {
  
  if (paused === false) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // make the color of the canvas black
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvasDims.width, canvasDims.height);

    // render the snake on the canvas initially
    ctx.fillStyle = snakeHead.color;
    ctx.fillRect(snakeHead.snakeX, snakeHead.snakeY, block, block);
    snakeHead.snakeX += snakeHead.speedX;
    snakeHead.snakeY += snakeHead.speedY;
    document.addEventListener('keydown', control);

    //loop over the snake body in reverse and equalize
    // every piece of the body by the piece in front of it
    // so that each piece will follow the coordinates of its perciding piece
    // hence the movement of the snake
    for (let i = snakeBody.length - 1; i > 0; i--) {
      snakeBody[i] = snakeBody[i - 1];
    }

    // equalize the top piece of the body with the head so it will follow the head
    if (snakeBody.length) {
      snakeBody[0] = [snakeHead.snakeX, snakeHead.snakeY];
    }

    // fill all the pieces with snake color
    for (let i = 0; i < snakeBody.length; i++) {
      ctx.fillStyle = snakeHead.color;
      ctx.fillRect(snakeBody[i][0], snakeBody[i][1], block, block);
    }

    // render the food on the canvas initially
    ctx.fillStyle = food.color;
    ctx.fillRect(food.X, food.Y, food.width, food.height);
  }

  if (snakeHead.snakeX === food.X && snakeHead.snakeY === food.Y) {
    snakeBody.push([food.X - block, food.Y - block]); // push to the snake the food coordinates to grow
    placeFood();
    score += 10;
    scoreUI.textContent = score;
  }

  if (
    snakeHead.snakeX > canvasDims.width ||
    snakeHead.snakeX < -block ||
    snakeHead.snakeY > canvasDims.height ||
    snakeHead.snakeY < -block
  ) {
    gameOver = true;
    
  }
  for (let i = 1; i < snakeBody.length; i++) {
    if (
      snakeHead.snakeX == snakeBody[i][0] &&
      snakeHead.snakeY == snakeBody[i][1]
    ) {
      gameOver = true;
      

    }
  }

  //sets an interval to allow animation
  requestAnimationFrame(function () {
    if (gameOver) {
      dialog.showModal()
      return;
    }
    setTimeout(animate, 100);
  });
}

// the control function that controls the movement
function control(e) {
  if (e.code == 'ArrowUp' && snakeHead.speedY !== block) {
    snakeHead.speedX = 0;
    snakeHead.speedY = -block;
  } else if (e.code == 'ArrowDown' && snakeHead.speedY !== -block) {
    snakeHead.speedX = 0;
    snakeHead.speedY = block;
  } else if (e.code == 'ArrowRight' && snakeHead.snakeX !== -block) {
    snakeHead.speedX = block;
    snakeHead.speedY = 0;
  } else if (e.code == 'ArrowLeft' && snakeHead.snakeX !== block) {
    snakeHead.speedX = -block;
    snakeHead.speedY = 0;
  }
}

// set the food in random place on canvas
function placeFood() {
  let randomX = Math.floor(Math.random() * 30);
  let randomY = Math.floor(Math.random() * 30);
  food.X = randomX * block;
  food.Y = randomY * block;
}



pasueBtn.addEventListener('click', pauseGame)
addEventListener('keydown', pauseGame)

function pauseGame(e){
  if(gameOver) return

  if(e.type == 'keydown' && e.code == 'Escape'){
    paused = !paused
  }
  if(e.type == 'click'){
    paused = !paused
  }

  

  pasueBtn.innerText = paused? 'Resume' : 'Pause';

}


dialog.addEventListener('keydown', handleDialog)
againBtn.addEventListener('click', playAgain)


function playAgain() {
    location.reload()
}


function handleDialog(e){
  e.preventDefault()
}

animate();
