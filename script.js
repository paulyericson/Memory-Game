const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}
//----------------NEW CODE-------------------------------------

let firstChoice = null;
let secondChoice = null;
let bothChosen = 0;
let noAction = false;

// TODO: Implement this function!
function handleCardClick(event) {
if (noAction) return;
if (event.target.classList.contains("flipped")) return;

let currentChoice = event.target;
currentChoice.style.backgroundColor = currentChoice.classList[0];

if (!firstChoice || !secondChoice) {
  currentChoice.classList.add("flipped");
  firstChoice = firstChoice || currentChoice;
  secondChoice = currentChoice === firstChoice ? null : currentChoice;
}

if (firstChoice && secondChoice) {
  noAction = true;
  let firstColor = firstChoice.className;
  let secondColor = secondChoice.className;

  if (firstColor === secondColor) {
    bothChosen += 2;
    firstChoice.removeEventListener("click", handleCardClick);
    secondChoice.removeEventListener("click", handleCardClick);
    firstChoice = null;
    secondChoice = null;
    noAction = false;
} else {
  setTimeout(function() {
    firstChoice.style.backgroundColor = "";
    secondChoice.style.backgroundColor = "";
    firstChoice.classList.remove("flipped");
    secondChoice.classList.remove("flipped");
    firstChoice = null;
    secondChoice = null;
    noAction = false;
  }, 1000)
}
}

if (bothChosen === COLORS.length) alert("GAME OVER! YOU DID IT!!!");
}
// when the DOM loads
createDivsForColors(shuffledColors);
