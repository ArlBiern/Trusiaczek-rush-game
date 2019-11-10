const canvas = document.getElementById('game');
const playerImg = document.getElementById('player');
const appleImg = document.getElementById('apple')

let canvasWidth = 600;
let canvasHeight = 400;
let velocity = 22;
let score = 0;
console.log(appleImg.width);
console.log(appleImg.height);

const ctx = canvas.getContext('2d');
ctx.canvas.height = canvasHeight;
ctx.canvas.width = canvasWidth;

//generating objects
//let boxCoordinates = [ 100, 300, 160, 300, 320, 360, 360, 320, 360, 360, 400, 280, 400, 320, 440, 320, 440, 360, 400, 360];

//Tworzenie owoców


let boxCoordinates = [100, 300, 200, 40, 200, 200, 100, 40];
let fruitsCoordinates = [appleImg, 120, 360, appleImg.width, appleImg.height,
                          appleImg, 320, 160, appleImg.width, appleImg.height,
                          appleImg, 580, 200, appleImg.width, appleImg.height];

function createBox(arr) {
  for(let i = 1; i <= arr.length; i+=4 ) {
    ctx.beginPath();
    ctx.rect(arr[i-1], arr[i], arr[i+1], arr[i+2]);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
  }
}
//Create fruits as a box:
/* function createFruits(arr) {
  for(let i = 1; i <= arr.length; i+=4 ) {
    ctx.beginPath();
    ctx.rect(arr[i-1], arr[i], arr[i+1], arr[i+2]);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
  }
} */


// Create fruits as an immage
function createFruitsTest(arr) {
  for(let i = 1; i <= arr.length; i+=5 ) {
    ctx.drawImage(arr[i-1], arr[i], arr[i+1], arr[i+2], arr[i+3]);
  }
}

//Collison detection
//Box detection
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
    }

    //block from the right
    if (left && top && down && (player.x < arr[i-1] + elementWidth + 5) && !right) {
      player.x = arr[i-1] + elementWidth + 5;
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
    let right = player.x <= arr[i] + elementWidth -15;

    if (top && down && left && right) {
      fruitsCoordinates.splice(i-1, 5);
      score += 1;
      console.log(score);
    }
  }
}

// GAME

const player = {
  height: playerImg.height,
  width: playerImg.width,
  x: 30,
  x_velocity: 0,
  y: 0,
  y_velocity: 0,
  jumping: false
};

const controller = {
  left: false,
  right: false,
  up: false,
  keyListener: function(e) {
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
  //ctx.clearRect(player.x, player.y, playerImg.width +20, playerImg.height+20);
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  if (controller.up && player.jumping === false) {
    player.y_velocity -= velocity;
    player.jumping = true;

  }

  if (controller.left) {
    player.x_velocity -= 0.5;
  }

  if (controller.right) {
    player.x_velocity += 0.5;
  }

  player.y_velocity += 1.0;
  player.x += player.x_velocity;
  player.y += player.y_velocity;
  player.x_velocity *= 0.9;
  player.y_velocity *= 0.9;

  // if player is falling below floor line
  if (player.y > canvasHeight - player.height) {
    player.jumping = false;
    player.y = canvasHeight - player.height;
    player.y_velocity = 0;
  }

  // player stay between the left and right wall

  if (player.x <= 0) {
    player.x = 0;
  } else if (player.x > canvasWidth - playerImg.width) {
    player.x = canvasWidth - playerImg.width;
  }

  collisionDetection(boxCoordinates);
  fruitDetection(fruitsCoordinates);

  createBox(boxCoordinates);
  //createFruits(fruitsCoordinates);
  createFruitsTest(fruitsCoordinates);

  ctx.drawImage(playerImg, player.x, player.y);
  window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller.keyListener.bind(controller))
window.addEventListener("keyup", controller.keyListener.bind(controller));
window.requestAnimationFrame(loop);


//===================================================================================

//DZIAŁAJĄCY KOD!!!!!!!!!!!!!!!!!!!!!!!!!!!!11
/*

const canvas = document.getElementById('game');
const playerImg = document.getElementById('player');

let canvasWidth = 600;
let canvasHeight = 400;
let elementSize = 40;
let velocity = 22;

const ctx = canvas.getContext('2d');
ctx.canvas.height = canvasHeight;
ctx.canvas.width = canvasWidth;

//generating objects
//let boxCoordinates = [ 100, 300, 160, 300, 320, 360, 360, 320, 360, 360, 400, 280, 400, 320, 440, 320, 440, 360, 400, 360];

let boxCoordinates = [100, 300, 200, 40, 200, 200, 100, 40]

function createBox(arr) {
  for(let i = 1; i <= arr.length; i+=4 ) {
    ctx.beginPath();
    ctx.rect(arr[i-1], arr[i], arr[i+1], arr[i+2]);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
  }
}


function collisionDetection() {
  for(let i = 1; i <= boxCoordinates.length; i+=4 ) {
    let elementWidth = boxCoordinates[i+1];
    let elementHeight = boxCoordinates[i+2];

    let top = player.y + player.height >= boxCoordinates[i];
    let down = player.y <= boxCoordinates[i] + elementHeight;
    let left = player.x + player.width >= boxCoordinates[i-1];
    let right = player.x <= boxCoordinates[i-1] + elementWidth;

    //block from the left
    if ((player.x + player.width >= boxCoordinates[i-1] - 5) && !left && top && down && right) {
      player.x = boxCoordinates[i-1] - player.width -5;
    }

    //block from the right
    if (left && top && down && (player.x < boxCoordinates[i-1] + elementWidth + 5) && !right) {
      player.x = boxCoordinates[i-1] + elementWidth + 5;
    }

    //block from the top
    if (top && down && left && right) {
      player.jumping = false;
      player.y = boxCoordinates[i] - player.height;
      player.y_velocity = 0;
    }

    //block from the bottom
    if ((player.y - 5 < boxCoordinates[i] + elementHeight) && !down && top && left && right) {
      player.y = boxCoordinates[i] + elementHeight + 5;
      player.y_velocity = 0;
    }
  }

}

// GAME

const player = {
  height: playerImg.height,
  width: playerImg.width,
  x: 30,
  x_velocity: 0,
  y: 0,
  y_velocity: 0,
  jumping: false
};

const controller = {
  left: false,
  right: false,
  up: false,
  keyListener: function(e) {
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
  //ctx.clearRect(player.x, player.y, playerImg.width +20, playerImg.height+20);
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  if (controller.up && player.jumping === false) {
    player.y_velocity -= velocity;
    player.jumping = true;

  }

  if (controller.left) {
    player.x_velocity -= 0.5;
  }

  if (controller.right) {
    player.x_velocity += 0.5;
  }

  player.y_velocity += 1.0;
  player.x += player.x_velocity;
  player.y += player.y_velocity;
  player.x_velocity *= 0.9;
  player.y_velocity *= 0.9;

  // if player is falling below floor line
  if (player.y > canvasHeight - player.height) {
    player.jumping = false;
    player.y = canvasHeight - player.height;
    player.y_velocity = 0;
  }

  // player stay between the left and right wall

  if (player.x <= 0) {
    player.x = 0;
  } else if (player.x > canvasWidth - playerImg.width) {// if player goes past right boundary
    player.x = canvasWidth - playerImg.width;
  }

  collisionDetection()
  createBox(boxCoordinates);
  ctx.drawImage(playerImg, player.x, player.y);
  window.requestAnimationFrame(loop);

};

window.addEventListener("keydown", controller.keyListener.bind(controller))
window.addEventListener("keyup", controller.keyListener.bind(controller));
window.requestAnimationFrame(loop);




*/




/// JAKIES STARE RZECZY!!!!!!!!!!!!!!!!!
/// ========================

/* const testCanvas = document.getElementById('test');
const ctxTest = testCanvas.getContext('2d');
const testImage = document.getElementById('testImage')


testCanvas.width = 200;
testCanvas.height = 200;

let testX = 50;
let testY = 50;

ctxTest.drawImage(testImage, testX, testY);

window.addEventListener("keydown", function(e) {
  let key_state = (e.type === "keydown") ? true : false;

    switch(e.keyCode) {
      case 37:
        testX -=10
        break;
      case 39:
        testX +=10
        break;
      //case 39:
      //  this.right = key_state;
        break;
      default:
        break;
    }

  ctxTest.clearRect(0, 0, canvasWidth, canvasHeight)
  ctxTest.drawImage(testImage, testX, testY);

}
)
 */


/* var coin = sprite({
  context: ctxTest,
  width: 59,
  height: 59,
  image: testImage
}); */
