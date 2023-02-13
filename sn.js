const gameBoard = document.getElementById("game-board");
const snake = [];
let food = null;

const directions = {
  37: "left",
  38: "up",
  39: "right",
  40: "down"
};

// Creates the initial snake and food units
for (let i = 0; i < 3; i++) {
  snake.push(createSnakeUnit(300 + i * 10, 300));
}

food = createFoodUnit();

// Adds the snake and food units to the game board
snake.forEach(unit => gameBoard.appendChild(unit));
gameBoard.appendChild(food);

// Handles arrow key presses for changing the direction of the snake
document.onkeydown = function(event) {
  const direction = directions[event.keyCode];

  if (direction) {
    moveSnake(direction);
  }
};

// Creates a snake unit element
function createSnakeUnit(x, y) {
  const unit = document.createElement("div");
  unit.className = "snake-unit";
  unit.style.left = x + "px";
  unit.style.top = y + "px";
  return unit;
}

// Creates a food unit element
function createFoodUnit() {
  const x = Math.floor(Math.random() * 39) * 10;
  const y = Math.floor(Math.random() * 39) * 10;
  const unit = document.createElement("div");
  unit.className = "food-unit";
  unit.style.left = x + "px";
  unit.style.top = y + "px";
  return unit;
}

// Moves
// Moves the snake in the specified direction
function moveSnake(direction) {
    const oldX = snake[0].style.left;
    const oldY = snake[0].style.top;
    let newX = oldX;
    let newY = oldY;
    
    switch (direction) {
    case "left":
    newX = (parseInt(oldX) - 10) + "px";
    break;
    case "up":
    newY = (parseInt(oldY) - 10) + "px";
    break;
    case "right":
    newX = (parseInt(oldX) + 10) + "px";
    break;
    case "down":
    newY = (parseInt(oldY) + 10) + "px";
    break;
    }
    
    const newHead = createSnakeUnit(newX, newY);
    snake.unshift(newHead);
    gameBoard.appendChild(newHead);
    
    if (newX === food.style.left && newY === food.style.top) {
    gameBoard.removeChild(food);
    food = createFoodUnit();
    gameBoard.appendChild(food);
    } else {
    const oldTail = snake.pop();
    gameBoard.removeChild(oldTail);
    }
    }