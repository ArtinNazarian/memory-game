const gameContainer = document.getElementById("game");
let startBtn = document.getElementById("start");
let startGame = false;
let resetBtn = document.getElementById("restart");
let score = 0;
let highScore = 0;
let hasFlipped = false;
let lockCard = false;
let firstCard, secondCard;
let numCardFlipped = 0;

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
  "purple",
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
    //newDiv.classList.add()

    // call a function handleCardClick when a div is clicked on

    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// when the DOM loads
createDivsForColors(shuffledColors);

/* */

function handleCardClick(event) {
  //lockCard will be set to true if two cards have been flipped
  if (lockCard) return;

  let currentCard = event.target;

  //add color to the selected card
  currentCard.style.backgroundColor = currentCard.className;
  //add class to the flipped card
  currentCard.classList.add("flipped");

  //check if this is the first card the user has selected
  if (!hasFlipped) {
    hasFlipped = true;
    firstCard = currentCard;
  } else {
    //if this is the second card selected, then has flipped will be set to false
    hasFlipped = false;
    secondCard = event.target;
    //lock the cards so the user is not able to select a third card
    lockCard = true;
    //check if the two cards have the same color
    if (firstCard.className === secondCard.className) {
      firstCard.removeEventListener("click", handleCardClick);
      secondCard.removeEventListener("click", handleCardClick);
      numCardFlipped += 2;
      lockCard = false;
    } else {
      //if the two cards are different then unlock the screen
      setTimeout(function () {
        lockCard = true;
        //remove the color from each card
        firstCard.style.backgroundColor = "";
        secondCard.style.backgroundColor = "";
        //remove the flipped class
        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");
        hasFlipped = false;
        lockCard = false;
        //keep score when the user selects a square that the colors doesn't match
        score++;
        document.getElementById("score").innerText = score;
      }, 1000);
    }
  }

  if (numCardFlipped === COLORS.length) {
    if (score > highScore) {
      //update highest score
      document.getElementById("high-score").innerText = score;
    }
    //show an alert
    alert("Game Over");
  }
}

resetBtn.addEventListener("click", function (e) {
  //get any div that has a class='flipped
});

/*function resetColors() {
  const flipped = document.querySelectorAll(".flipped");
  console.log("clicked");
}*/
