//This array holds pacman images
const pacArray = [
  ['./PacMan1.png', './PacMan2.png'],
  ['./PacMan3.png', './PacMan4.png'],
];

//Used to adjust movement
let direction = 0;
let focus = 0;

//This array holds randomly generated pacmen as objects {position: {x: , y: } , velocity: {x: , y: } , newimg: pacArray[direction][focus]}
const pacMen = [];


//This callback function randomly generates numbers for the initial velocity and position of pacmen
function setToRandom(scale) {
  return {
    x: Math.random() * scale,
    y: Math.random() * scale,
  };
}


// Callback factory function to make a pacmen returns an object
function makePac() {
  let velocity = setToRandom(10);
  let position = setToRandom(200);
  // Add image to div id = game
  let game = document.getElementById('game');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = './PacMan1.png'; //pacArray[direction][focus]
  newimg.width = 100;
  newimg.style.left = position.x;
  newimg.style.top = position.y;
  game.appendChild(newimg);

  return {
    position,
    velocity,
    newimg,
    direction: 0,
    focus: 0,
  };
}


//Function to make pacmen onclick of Add PacMan button, adds new pacman to pacMan array
function makeOne() {
  pacMen.push(makePac());
}


//Callback function for edge detection and direction adjustment
function checkCollisions(item) {
  if (item.position.x + item.velocity.x + item.newimg.width > window.innerWidth || item.position.x + item.velocity.x < 0) {
    item.velocity.x = -item.velocity.x;
  }
  if (item.position.y + item.velocity.y + item.newimg.height > window.innerHeight || item.position.y + item.velocity.y < 0) {
    item.velocity.y = -item.velocity.y;
  }
  
  /*checkDirection(item);
  item.newimg = pacArray[item.direction][item.focus];
  console.log(item);*/

  return item;
}

//Callback function to switch the direction that the pacman is facing
/*function checkDirection(item) {
  if (item.direction == 0 && item.position.x + item.velocity.x + item.newimg.width > window.innerWidth) {
    item.direction = 1;
  }
  if (item.direction == 1 && item.position.x + item.velocity.x < 0) {
    item.direction = 0;
  }
  return item.direction;
}*/


//Function to make pacmen move onclick of Start Game button
function update() {
  //Loop over pacmen array and move each one and move image in DOM
  pacMen.forEach((item) => {
    checkCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;
    
    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;
  });
  setTimeout(update, 20);
}





//Don't change this line, exports functions to HTML
if (typeof module !== 'undefined') {
  module.exports = { makeOne, checkCollisions, update, pacMen };
}