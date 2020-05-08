// Variables
var numSquares = 9;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
  // Mode button event listeners
  setupModeButtons();
  setUpSquareListeners();
  generateGame();
}

// Reset Button Click Listener
resetButton.addEventListener("click", function () {
  // Generates and changes the colours
  generateGame();
});

function setupModeButtons() {
  for (var i = 0; i < modeButtons.length; i++) {
    modeButtons[i].addEventListener("click", function () {
      modeButtons[0].classList.remove("selected");
      modeButtons[1].classList.remove("selected");
      this.classList.add("selected");
      if (this.textContent === "Easy") {
        numSquares = 3;
      } else if (this.textContent === "Hard") {
        numSquares = 9;
      }
      generateGame();
    });
  }
};

function setUpSquareListeners() {
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];
    // Click Listeners
    squares[i].addEventListener("click", function () {
      var clickedColor = this.style.backgroundColor;
      // If Clicked on Right
      if (clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct!";
        changeColors(pickedColor);
        // h1.style.backgroundColor = pickedColor;
        resetButton.textContent = "Play Again?";
      } else { // If Clicked on Wrong
        this.style.backgroundColor = "#232323";
        messageDisplay.textContent = "Try Again!";
      }
    });
  }
};

function generateGame() {
  colors = generateColors();
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor;
  for (var i = 0; i < squares.length; i++) {
    if (colors[i]) {
      squares[i].style.display = "block";
      squares[i].style.backgroundColor = colors[i];
    } else {
      squares[i].style.display = "none";
    }
  };
  // Resets the text and the h1 background
  messageDisplay.textContent = "";
  resetButton.textContent = "New Colours";
  h1.style.backgroundColor = "steelblue";
}

// Changing Colours to Match Correct
function changeColors(color) {
  h1.style.backgroundColor = pickedColor;
  for (var j = 0; j < squares.length; j++) {
    squares[j].style.backgroundColor = color;
  }
}

// Picking Random Colour
function pickColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

// Generate and return an array of random colours
function generateColors() {
  var retCol = [];
  for (var i = 0; i < numSquares; i++) {
    retCol.push(generateColor());
  }
  return retCol;
}

// Helper functions
function generateColor() {
  return "rgb(" + rand256() + ", " + rand256() + ", " + rand256() + ")";
}

function rand256() {
  return Math.floor(Math.random() * 256);
}