// HTML ELEMENTS
const canvas = document.getElementById('game');
const scoreOutput = document.querySelector('.score span');
const timeOutput = document.querySelector('.time span');
const overlay = document.querySelector('.game_overlay');
const startGameBtn = document.querySelector('.start_game');
const resetGameBtn = document.querySelector('.reset_game');
const resultsList = document.querySelector('.results');

// CREATING ELEMENTS IMG
const playerImg = new Image(45, 57);
playerImg.src = './img/trus_m.png';
const arrowImg = new Image(40, 40);
arrowImg.src = './img/arrow.png';
const appleImg = new Image(43, 45);
appleImg.src = './img/apple.png';
const bananaImg = new Image(35, 44);
bananaImg.src = './img/banana.png';
const orangeImg = new Image(38, 42);
orangeImg.src = './img/orange.png';
const strawberryImg = new Image(37, 50);
strawberryImg.src = './img/strawberry.png';
const pearImg = new Image(37, 48);
pearImg.src = './img/pear.png';
const watermelonImg = new Image(43, 45);
watermelonImg.src = './img/watermelon.png';
let possibleFruits = [appleImg, bananaImg, strawberryImg, orangeImg, pearImg, watermelonImg];
let fruitsArray = [];

// Global variables
const ctx = canvas.getContext('2d');
const canvasWidth = 700;
const canvasHeight = 500;
const gameSize = 2;           // game area  = canvasWidth * gameSize
const velocity = 22;          // determines how high can player jump
let score = 0;                // fruits collected by the player
let transform_x = 0;          // current position of canvas elements (whole game area)
let transform_x_speed = 0;    // velocity of transform_x change
let startTime;                // time at the beginning of the game
let endTime;                  // time at which player collect last fruit
let results = JSON.parse(localStorage.getItem('results')) || [];  // relating to local storage
let fruitsCoordinates, jumpBoxesCoordinates, terrainBoxes, boxCoordinates;

ctx.canvas.height = canvasHeight;
ctx.canvas.width = canvasWidth;

// Setting results list
function updateList(results = []) {
  let sortedResults = results.sort((a, b) => a[1] - b[1]);
  resultsList.innerHTML = sortedResults.map((result, i) => {
    if (i < 10) {
      return `
        <li>
          <p>${result[0]}:</p>
          <p>${result[1]}</p>
        </li>
      `;
    }
  }).join('');
}
updateList(results);

// Creating player object
const player = {
  height: playerImg.height,
  width: playerImg.width,
  x: canvasWidth/2 - playerImg.width/2, // base x position of the player
  x_velocity: 0,                        // velocity of x position change
  y: 0,                                 // y position of the player
  y_velocity: 0,                        // velocity of y position change
  jumping: true                         // jumping status of the player
};

// Creating movement controller object
const controller = {
  left: false,
  right: false,
  up: false,
  keyListener: function(e) {
    e.preventDefault();
    let key_state = (e.type === 'keydown') ? true : false;
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

// Creating random fruits array
function createFruitsArray(arr) {
  for(let i = 1; i <= arr.length; i+=2 ) {
    let index = Math.floor(Math.random() * possibleFruits.length);
    fruitsArray.push(possibleFruits[index], arr[i-1], arr[i],
      possibleFruits[index].width, possibleFruits[index].height);
  }
}

// Creating game elements functions
function createTerrainBoxes(arr) {
  for(let i = 1; i <= arr.length; i+=4 ) {
    ctx.beginPath();
    ctx.rect(arr[i-1], arr[i], arr[i+1], arr[i+2]);
    ctx.fillStyle = '#36180c';
    ctx.fill();
    ctx.closePath();
  }
}

function createJumpBoxes(arr) {
  for(let i = 1; i <= arr.length; i+=4 ) {
    ctx.drawImage(arrowImg, arr[i-1], arr[i], 40, 40);
  }
}

function createFruits(arr) {
  for(let i = 1; i <= arr.length; i+=5 ) {
    ctx.drawImage(arr[i-1], arr[i], arr[i+1], arr[i+2], arr[i+3]);
  }
}

// Fetching data and generating arrays of canvas coordinates
async function fetchData() {
  let promise = await fetch('data.json');
  let rawData = await promise.text();
  let [terrain, jump, fruits ] = await JSON.parse(rawData);

  terrainBoxes = [-(canvasWidth/gameSize), -100, (canvasWidth/gameSize), canvasHeight + 100]
                  .concat(terrain.values, gameSize*canvasWidth, -100, (canvasWidth/gameSize), canvasHeight + 100);
  jumpBoxesCoordinates = jump.values;
  boxCoordinates = terrainBoxes.concat(jumpBoxesCoordinates);
  fruitsCoordinates = fruits.values;
  createFruitsArray(fruitsCoordinates);

  startGameBtn.classList.add('visible');
}
fetchData();

// Elements (box, jumpbox) collision detection (launched on each frame)
function collisionDetection(arr) {
  for (let i = 1; i <= arr.length; i+=4 ) {
    let elementWidth = arr[i+1];
    let elementHeight = arr[i+2];

    let top = player.y + player.height >= arr[i];
    let down = player.y <= arr[i] + elementHeight;
    let left = player.x + player.width >= arr[i-1];
    let right = player.x <= arr[i-1] + elementWidth;

    // Collison from the left
    if ((player.x + player.width >= arr[i-1] - 5) && !left && top && down && right) {
      player.x = arr[i-1] - player.width -5 ;
      transform_x = (-player.x) + canvasWidth/2 - playerImg.width/2;
    }

    // Collison from the right
    if (left && top && down && (player.x < arr[i-1] + elementWidth + 5) && !right) {
      player.x = arr[i-1] + elementWidth + 5;
      transform_x = (-player.x) + canvasWidth/2 - playerImg.width/2;
    }

    // Collison from the top
    if (top && down && left && right) {
      player.jumping = false;
      player.y = arr[i] - player.height;
      player.y_velocity = 0;
    }

    // Collison from the bottom
    if ((player.y - 5 < arr[i] + elementHeight) && !down && top && left && right) {
      player.y = arr[i] + elementHeight + 5;
      player.y_velocity = 0;
    }

    // Bottom border blocking
    if (player.y > canvasHeight - player.height) {
      player.jumping = false;
      player.y = canvasHeight - player.height;
      player.y_velocity = 0;
    }
  }
}

// Fruit collision detection
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

      // All fruits collected condition
      if (score == fruitsCoordinates.length / 2) {
        endTime = new Date();

        let resultTime =  ((endTime - startTime) / 1000);
        timeOutput.innerText = resultTime + ' s';

        let name = prompt('Please write your name:');
        results.push([name, resultTime]);
        updateList(results);
        localStorage.setItem('results', JSON.stringify(results));
      }

      scoreOutput.innerText = `${score} / ${fruitsCoordinates.length/2}`;
    }
  }
}

// Loop mechanism
const loop = function() {
  // Clear viewed canvas area and generate canvas elements
  ctx.clearRect((transform_x)*(-1), 0, canvasWidth, canvasHeight);
  createTerrainBoxes(terrainBoxes);
  createJumpBoxes(jumpBoxesCoordinates);
  createFruits(fruitsArray);

  // Movement "engine"
  if (controller.up && player.jumping === false) {
    player.y_velocity -= velocity;
    player.jumping = true;
  }

  if (controller.left) {
    player.x_velocity -= 0.5;
    transform_x_speed += 0.5;
  }

  if (controller.right) {
    transform_x_speed -= 0.5;
    player.x_velocity += 0.5;
  }

  // Player coordinates
  player.y_velocity += 1.0;
  player.x += player.x_velocity;
  player.y += player.y_velocity;
  player.x_velocity *= 0.9;
  player.y_velocity *= 0.9;

  // Elements coordinates (elements movemnt in the canvas area)
  transform_x_speed *= 0.909;
  transform_x += transform_x_speed;

  // Launching collison detection
  fruitDetection(fruitsArray);
  collisionDetection(boxCoordinates);

  // New player and elements position
  ctx.drawImage(playerImg, player.x, player.y);
  ctx.setTransform(1, 0, 0, 1, transform_x, 0);

  window.requestAnimationFrame(loop);
};

// Start of the game function
function startGame() {
  // HTML elements style change
  canvas.scrollIntoView();
  window.scrollBy(0, -100);
  overlay.classList.toggle('visible');
  startGameBtn.classList.toggle('visible');
  resetGameBtn.classList.toggle('visible');

  // Game start time
  startTime = new Date();

  // Hooking up listeners
  window.addEventListener('keydown', controller.keyListener.bind(controller));
  window.addEventListener('keyup', controller.keyListener.bind(controller));

  window.requestAnimationFrame(loop);
}

// Trigering start and reset
startGameBtn.addEventListener('click', function(e) {
  e.preventDefault();
  startGame();
});

resetGameBtn.addEventListener('click', function(e) {
  e.preventDefault();
  location.reload();
});
