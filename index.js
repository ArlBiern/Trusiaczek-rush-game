// HTML ELEMENTS
const canvas = document.getElementById('game');
const scoreOutput = document.querySelector('.score span')
const timeOutput = document.querySelector('.time span')
const form = document.querySelector('.form');
const overlay = document.querySelector('.game_overlay');
const newGameBtn = document.querySelector('.new_game');
const resetGameBtn = document.querySelector('.reset_game');

// IMG

const playerImg = document.getElementById('player');
const arrowImg = document.getElementById('arrow');
const appleImg = document.getElementById('apple');
const bananaImg = document.getElementById('banana');
const orangeImg = document.getElementById('orange');
const strawberryImg = document.getElementById('strawberry');
const pearImg = document.getElementById('pear');
const watermelonImg = document.getElementById('watermelon');
let possibleFruits = [appleImg, bananaImg, strawberryImg, orangeImg, pearImg, watermelonImg];
let fruitsArray = [];

// Global variables

const ctx = canvas.getContext('2d');
let canvasWidth = 700;
let canvasHeight = 500;
let velocity = 22;
let score = 0;
let transform_x = 0 ;
let transform_x_speed = 0;
let startTime;
let endTime;

ctx.canvas.height = canvasHeight;
ctx.canvas.width = canvasWidth;

// Creating game elements

const player = {
  height: playerImg.height,
  width: playerImg.width,
  x: canvasWidth/2 - playerImg.width/2,
  x_velocity: 0,
  y: 0,
  y_velocity: 0,
  jumping: false
};

let terrainBoxes =
[
  -(canvasWidth/2), -100, (canvasWidth/2), canvasHeight + 100,
  0, 380, 40, 120,
  40, 460, 80, 40,
  100, 280, 100, 100,
  100, 380, 160, 40,
  100, 180, 60, 100,
  100, 80, 40, 80,
  380, 460, 100, 100,
  420, 320, 40, 40,
  440, 400, 60, 100,
  560, 460, 80, 40,
  640, 200, 40, 300,
  740, 200, 40, 300,
  780, 400, 40, 100,
  860, 80, 40, 40,
  820, 460, 40, 40,
  980, 400, 40, 140,
  980, 360, 120, 40,
  1100, 120, 100, 40,
  1200, 360, 120, 40,
  1300, 240, 40, 300,
  1300, 400, 120, 100,
  2*canvasWidth, -100, (canvasWidth/2), canvasHeight + 100
];


let jumpBoxes =
[
  0, 180, 40, 40,
  0, 220, 40, 40,
  470, 270, 40, 40,
  510, 310, 40, 40,
  470, 310, 40, 40,
  510, 350, 40, 40,
   780, 240, 40, 40,
  780, 140, 40, 40,
  1100, 240, 40, 40,
  1100, 280, 40, 40,
  1100, 320, 40, 40,
]

let boxCoordinates = terrainBoxes.concat(jumpBoxes);

let fruitsCoordinates =
[
  220, 140,
  360, 160,
  580, 240,
  50, 400,
  5, 300,
  580, 400,
  690, 450,
  690, 400,
  690, 350,
  690, 300,
  690, 250,
  690, 200,
  790, 340,
  790, 180,
  920, 100,
  1030, 0,
  1030, 420,
  1030, 280,
  1200, 420,
  1250, 420,
  1360, 40,
  1080, 180,
  1140, 180
];

function createTerrainBoxes(arr) {
  for(let i = 1; i <= arr.length; i+=4 ) {
    ctx.beginPath();
    ctx.rect(arr[i-1], arr[i], arr[i+1], arr[i+2]);
    ctx.fillStyle = "#36180c";
    ctx.fill();
    ctx.closePath();
  }
}

function createJumpBoxes(arr) {
  for(let i = 1; i <= arr.length; i+=4 ) {
    ctx.drawImage(arrowImg, arr[i-1], arr[i], 40, 40);
  }
}

// Create fruits as an immage
function createFruits(arr) {
  for(let i = 1; i <= arr.length; i+=5 ) {
    ctx.drawImage(arr[i-1], arr[i], arr[i+1], arr[i+2], arr[i+3]);
  }
}

function createFruitsArray(arr) {
  for(let i = 1; i <= arr.length; i+=2 ) {
    let index = Math.floor(Math.random() * possibleFruits.length);
    fruitsArray.push(possibleFruits[index], arr[i-1], arr[i], possibleFruits[index].width, possibleFruits[index].height);
  }
}
createFruitsArray(fruitsCoordinates);

//Collison detection

function collisionDetection(arr) {
  for (let i = 1; i <= arr.length; i+=4 ) {
    let elementWidth = arr[i+1];
    let elementHeight = arr[i+2];

    let top = player.y + player.height >= arr[i];
    let down = player.y <= arr[i] + elementHeight;
    let left = player.x + player.width >= arr[i-1];
    let right = player.x <= arr[i-1] + elementWidth;

    //block from the left
    if ((player.x + player.width >= arr[i-1] - 5) && !left && top && down && right) {
      player.x = arr[i-1] - player.width -5;
      transform_x = (-player.x) + canvasWidth/2 - playerImg.width/2;
    }

    //block from the right
    if (left && top && down && (player.x < arr[i-1] + elementWidth + 5) && !right) {
      player.x = arr[i-1] + elementWidth + 5;
      transform_x = (-player.x) + canvasWidth/2 - playerImg.width/2;
    }

    //block from the top
    if (top && down && left && right) {
      player.jumping = false;
      player.y = arr[i] - player.height;
      player.y_velocity = 0;
    }

    //block from the bottom
    if ((player.y - 5 < arr[i] + elementHeight) && !down && top && left && right) {
      player.y = arr[i] + elementHeight + 5;
      player.y_velocity = 0;
    }
  }
}

//fruit detection
function fruitDetection(arr) {
  for (let i = 1; i <= arr.length; i+=5 ) {
    let elementWidth = arr[i+2];
    let elementHeight = arr[i+3];

    let top = player.y + player.height >= arr[i + 1] + 15;
    let down = player.y <= arr[i + 1] + elementHeight - 15;
    let left = player.x + player.width >= arr[i] + 15;
    let right = player.x <= arr[i] + elementWidth - 15;

    if (top && down && left && right) {
      fruitsArray.splice(i-1, 5);
      score += 1;
      if (score === fruitsCoordinates.length / 2) {
        endTime = new Date();
        timeOutput.innerText = ((endTime - startTime) / 1000) + ' s';
      }
      scoreOutput.innerText = score;
    }
  }
}


// GAME CONTROLLER


const controller = {
  left: false,
  right: false,
  up: false,
  keyListener: function(e) {
    e.preventDefault();
    let key_state = (e.type === "keydown") ? true : false;
    switch(e.keyCode) {
      case 37:
        this.left = key_state;
        break;
      case 38:
        this.up = key_state;
        break;
      case 39:
        this.right = key_state;
        break;
      default:
        break;
    }
  }
};

const loop = function() {
  ctx.clearRect((transform_x)*(-1), 0, canvasWidth, canvasHeight);
  createTerrainBoxes(terrainBoxes);
  createJumpBoxes(jumpBoxes);
  createFruits(fruitsArray);

  if (controller.up && player.jumping === false) {
    player.y_velocity -= velocity;
    player.jumping = true;
  }

  if (controller.left) {
    player.x_velocity -= 0.5;
    transform_x_speed += 0.5
  }

  if (controller.right) {
    transform_x_speed -= 0.5
    player.x_velocity += 0.5;
  }

  // Player coordinates
  player.y_velocity += 1.0;
  player.x += player.x_velocity;
  player.y += player.y_velocity;
  player.x_velocity *= 0.9;
  player.y_velocity *= 0.9;

  // Elements coordinates
  transform_x_speed *= 0.909;
  transform_x += transform_x_speed;

  // Borders  blocking
  if (player.y > canvasHeight - player.height) {
    player.jumping = false;
    player.y = canvasHeight - player.height;
    player.y_velocity = 0;
  }

  fruitDetection(fruitsArray);
  collisionDetection(boxCoordinates);

  ctx.drawImage(playerImg, player.x, player.y);
  ctx.setTransform(1, 0, 0, 1, transform_x, 0);

  window.requestAnimationFrame(loop);
};

function startGame() {
  startTime = new Date();
  window.addEventListener("keydown", controller.keyListener.bind(controller))
  window.addEventListener("keyup", controller.keyListener.bind(controller));
  window.requestAnimationFrame(loop);
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  //overlay.style.display = "none";
  //form.classList.toggle('visible');
  //newGameBtn.classList.toggle('visible');
  //resetGameBtn.classList.toggle('visible');

  startGame();
});
