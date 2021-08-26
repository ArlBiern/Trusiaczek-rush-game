// === CHECKING MOBILE TYPE (return true = mobile)
window.mobileAndTabletCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

// === Language handle
let currentLanguage = localStorage.getItem('language') || 'pl';
const enText = [...document.querySelectorAll('[data-lang="en"')];
const plText = [...document.querySelectorAll('[data-lang="pl"')];
let langBtn;

const changeLang = () => {
  if (currentLanguage === 'pl') {
    enText.map( el => el.classList.add('hide')); 
    plText.map( el => el.classList.remove('hide'));
  } else {
    enText.map( el => el.classList.remove('hide')); 
    plText.map( el => el.classList.add('hide'));
  } 
}

const langButtonHandle = element => { 
  element.addEventListener('click', e => {
    console.log('click');
    if (e.target.dataset.lang === 'en') {
      localStorage.setItem('language', 'pl');
      location.reload();
    } else {;
      localStorage.setItem('language', 'en');
      location.reload();
    }
  });
} 

changeLang();
langBtn = document.querySelector('.lang_btn:not(.hide)');
langButtonHandle(langBtn);

// === GAME APP === 
const gameApp = () => {
  // HTML ELEMENTS
  const canvas = document.getElementById('game');
  const scoreOutput = document.querySelector('.score:not(.hide) span');
  const overlay = document.querySelector('.game_overlay');
  const startGameBtn = document.querySelector('.start_game:not(.hide)');
  const resetGameBtn = document.querySelector('.reset_game:not(.hide)');
  const resultsListEasy = document.querySelector('[data-results="easy"]');
  const resultsListMedium = document.querySelector('[data-results="medium"]');
  const resultsListHard = document.querySelector('[data-results="hard"]');
  const levelBtns = [...document.querySelectorAll('.levels button:not(.hide)')];

  // PROPORTION FOR RESPONSIVE PURPOSES
  const proportionFactor = 1;

  // CREATING ELEMENTS IMG
  const playerImg = new Image(45/proportionFactor, 57/proportionFactor);
  playerImg.src = './img/trus_m.png';
  const arrowImg = new Image(40/proportionFactor, 40/proportionFactor);
  arrowImg.src = './img/arrow.png';
  const appleImg = new Image(43/proportionFactor, 45/proportionFactor);
  appleImg.src = './img/apple.png';
  const bananaImg = new Image(35/proportionFactor, 44/proportionFactor);
  bananaImg.src = './img/banana.png';
  const orangeImg = new Image(38/proportionFactor, 42/proportionFactor);
  orangeImg.src = './img/orange.png';
  const strawberryImg = new Image(37/proportionFactor, 50/proportionFactor);
  strawberryImg.src = './img/strawberry.png';
  const pearImg = new Image(37/proportionFactor, 48/proportionFactor);
  pearImg.src = './img/pear.png';
  const watermelonImg = new Image(43/proportionFactor, 45/proportionFactor);
  watermelonImg.src = './img/watermelon.png';
  let possibleFruits = [appleImg, bananaImg, strawberryImg, orangeImg, pearImg, watermelonImg];
  let fruitsArray = [];

  // Global variables
  let chosenLevel = '';
  let gameData; 
  const ctx = canvas.getContext('2d');
  const canvasWidth = 700/proportionFactor;
  const canvasHeight = 500/proportionFactor;
  const gameSize = 2;           // game area  = canvasWidth * gameSize
  const velocity = 22;          // determines how high can player jump
  let score = 0;                // fruits collected by the player
  let transform_x = 0;          // current position of canvas elements (whole game area)
  let transform_x_speed = 0;    // velocity of transform_x change
  let startTime;                // time at the beginning of the game
  let endTime;                  // time at which player collect last fruit
  let cleanResultList = {easy: [], medium: [], hard: []};
  let results = JSON.parse(localStorage.getItem('results')) || cleanResultList;  // relating to local storage
  let fruitsCoordinates, jumpBoxesCoordinates, terrainBoxes, boxCoordinates;

  ctx.canvas.height = canvasHeight;
  ctx.canvas.width = canvasWidth;

  // Fetching data and generating arrays of canvas coordinates
  async function fetchData() {
    let promise = await fetch('data.json');
    let rawData = await promise.text();
    gameData = await JSON.parse(rawData);
  }
  fetchData();

  const useData = () => {
    let filterItems = gameData.filter(el => el.level === chosenLevel); 
    let [terrain, jump, fruits ] = filterItems[0].data;

    terrainBoxes = [-(canvasWidth/gameSize), -100, (canvasWidth/gameSize), canvasHeight + 100]
                    .concat(terrain.values, gameSize*canvasWidth, -100, (canvasWidth/gameSize), canvasHeight + 100);
    jumpBoxesCoordinates = jump.values;
    boxCoordinates = terrainBoxes.concat(jumpBoxesCoordinates);
    fruitsCoordinates = fruits.values;
    createFruitsArray(fruitsCoordinates);

    startGameBtn.classList.add('visible');
  }

  // GAME LEVEL INTERACTION
  const handleLevelSelection = (e) => {
    levelBtns.map(e =>  {
      e.classList.add('inactive');
      e.removeEventListener('click', handleLevelSelection);
    });
    e.target.classList.remove('inactive');
    e.target.classList.add('chosen');

    chosenLevel = e.target.dataset.level;
    useData();
  }

  levelBtns.map((btn) => {
    btn.addEventListener('click', handleLevelSelection);
  })


  // Setting results list
  function updateList(results = [], element) {

    let sortedResults = results.sort((a, b) => a[1] - b[1]);
    element.innerHTML = sortedResults.map((result, i) => {
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
  updateList(results.easy, resultsListEasy);
  updateList(results.medium, resultsListMedium);
  updateList(results.hard, resultsListHard);

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
          clearInterval(Interval);

          let name = prompt(`Twój czas to: ${resultTime}s. Podaj swoje imię:`);
          results[`${chosenLevel}`].push([name, resultTime])
          /* results.push([name, resultTime]); */
          let elementToUpdate;
          if (chosenLevel === 'easy') {
            elementToUpdate = resultsListEasy;
          } else if (chosenLevel === 'medium') {
            elementToUpdate = resultsListMedium;
          } else {
            elementToUpdate = resultsListHard;
          }
          updateList(results[`${chosenLevel}`], elementToUpdate);

          localStorage.setItem('results', JSON.stringify(results));
          setTimeout(() => {
            location.reload();
          }, 3000)
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
    // Game start time
    console.time('test');
    startTime = new Date();

    // Starting with stoper
    clearInterval(Interval);
    Interval = setInterval(startTimer, 10);
    startTimer();
    console.timeEnd('test')
    // HTML elements style change
    canvas.scrollIntoView();
    window.scrollBy(0, -50);
    overlay.classList.toggle('visible');
    startGameBtn.classList.toggle('visible');
    resetGameBtn.classList.toggle('visible');

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

  document.addEventListener('keypress', function(e) {
    if (startGameBtn.classList.contains('visible') && e.key === 'Enter') {
      e.preventDefault();
      startGame();
    }
  });

  resetGameBtn.addEventListener('click', function(e) {
    e.preventDefault();
    location.reload();
  });

  // ====== STOPER FUNCTION 

  let seconds = 00; 
  let tens = 00; 
  let appendTens = document.querySelector(".tens");
  let appendSeconds = document.querySelector(".seconds");
  let Interval;

  function startTimer () {
    tens++; 
    
    if(tens < 9){
      appendTens.innerHTML = "0" + tens;
    }
    
    if (tens > 9){
      appendTens.innerHTML = tens;
      
    } 
    
    if (tens > 99) {
      seconds++;
      appendSeconds.innerHTML = "0" + seconds;
      tens = 0;
      appendTens.innerHTML = "0" + 0;
    }
    
    if (seconds > 9){
      appendSeconds.innerHTML = seconds;
    }
  }
}

const mobileInfo = () => {
  const container = document.querySelector('.mobile_check');
  container.classList.add('mobile_true');
  if (currentLanguage === 'pl') {
    container.innerHTML = '<h1>Zagraj proszę na laptopie lub komputerze, bez klawiatury jeszcze nie pośmigasz :(</h1>'
  } else {
    container.innerHTML = '<h1>Please use laptop or PC, without keyboard you are not able to play :(</h1>'
  }
}

mobileAndTabletCheck() ? mobileInfo() : gameApp();
