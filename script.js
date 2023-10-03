"use strict";
let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;
let startTime;
let timerInterval;

window.onload = function () {
  setGame();
};

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 1000);
}
function updateTimer() {
  const currentTime = Math.floor((Date.now() - startTime) / 1000);
  const remainingTime = 60 - currentTime;

  document.getElementById("timer").textContent = remainingTime;

  if (remainingTime <= 0) {
    stopTimer();
    gameOver = true;
    document.getElementById("score").innerText =
      "GAME OVER BECOUSE OF YOU RUNNING OUT OF TIME: " + score.toString();
  }
}
function stopTimer() {
  clearInterval(timerInterval);
  // document.body.removeEventListener("click", stopTimer);
  "GAME OVER: " + score.toString();
}

function setGame() {
  //set up the grid in html
  for (let i = 0; i < 9; i++) {
    //i goes from 0 to 8, stops at 9
    //<div id="0-8"></div>
    let tile = document.createElement("div");
    tile.id = i.toString();
    tile.addEventListener("click", selectTile);
    document.getElementById("board").appendChild(tile);
  }

  setInterval(setMole, 750); // 1000 miliseconds = 1 second, every 1 second call setMole
  setInterval(setPlant, 2000); // 2000 miliseconds = 2 seconds, every 2 second call setPlant

  startTimer();
}

function getRandomTile() {
  //math.random --> 0-1 --> (0-1) * 9 = (0-9) --> round down to (0-8) integers
  let num = Math.floor(Math.random() * 9);
  return num.toString();
}

function setMole() {
  if (gameOver) {
    return;
  }
  if (currMoleTile) {
    currMoleTile.innerHTML = "";
  }
  let mole = document.createElement("img");
  mole.src = "./monty-mole.png";

  let num = getRandomTile();
  if (currPlantTile && currPlantTile.id == num) {
    return;
  }
  currMoleTile = document.getElementById(num);
  currMoleTile.appendChild(mole);
}

function setPlant() {
  if (gameOver) {
    return;
  }
  if (currPlantTile) {
    currPlantTile.innerHTML = "";
  }
  let plant = document.createElement("img");
  plant.src = "./piranha.png";

  let num = getRandomTile();
  if (currMoleTile && currMoleTile.id == num) {
    return;
  }
  currPlantTile = document.getElementById(num);
  currPlantTile.appendChild(plant);
}

function selectTile() {
  if (gameOver) {
    return;
  }
  if (this == currMoleTile) {
    score += 10;

    document.getElementById("score").innerText = score.toString(); //update score html
  } else if (this == currPlantTile) {
    document.getElementById("score").innerText =
      "GAME OVER: " + score.toString(); //update score html
    stopTimer();
    gameOver = true;
  }
}
