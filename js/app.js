const container = document.getElementById("container");
const winMessage = document.getElementById("win-message");
const reset = document.getElementById("reset");
let player1Win = document.getElementById("player1-win");
let player2Win = document.getElementById("player2-win");
let turnMessage = document.getElementById("current-turn");
let player = 1;
let lastMove = "red";
const startButton = document.getElementById("start-gameBtn");
const popUpDiv = document.getElementById("start");
const formatGame = document.getElementById("format");

// =================== CREATE GAME BOARD ===========================================================
let gameBoard = [];
// create a function that will generate all of the individual game tiles
const createBoard = () => {
  for (let i = 0; i < 7; i++) {
    // Create 7 divs - 1 for each column
    let column = document.createElement("div");
    column.className = "column";
    container.appendChild(column);
    // add event listener - when column is hovered the background will change
    column.addEventListener("mouseover", () => {
      //conditional for when event listener should highlight or become the original color
      if (
        winMessage.textContent === "Red wins!" ||
        winMessage.textContent === "Black wins!"
      ) {
        // if win is determined, hide the messaged displaying the turn
        turnMessage.style.display = "none";
        // change background color back to the normal color
        column.style.backgroundColor = "rgb(43, 92, 99)";
      } else {
        //if there is no win, turn the column this cover while hovering
        column.style.backgroundColor = "rgb(230, 190, 137)";
      }
    });
    // add event listener - when column is hovered the background will change back to the original color
    column.addEventListener("mouseout", () => {
      column.style.backgroundColor = "rgb(43, 92, 99)";
    });
  }

  // ========================= CREATE GAME TILES AND APPEND TO COLUMNS =========================================================
  for (let i = 0; i < 42; i++) {
    //create a square each time the loop runs
    let gameTile = document.createElement("div");
    //give tiles a class
    gameTile.className = "tile";
    // add each individual div to the game board array
    gameBoard.push(gameTile);

    gameTile.style.backgroundColor = "whitesmoke";
    //append these squares to the container
    //depending on i, this will assign tiles to their respective column
    if (i % 7 === 0) {
      container.children[0].appendChild(gameTile);
    } else if (i % 7 === 1) {
      container.children[1].appendChild(gameTile);
    } else if (i % 7 === 2) {
      container.children[2].appendChild(gameTile);
    } else if (i % 7 === 3) {
      container.children[3].appendChild(gameTile);
    } else if (i % 7 === 4) {
      container.children[4].appendChild(gameTile);
    } else if (i % 7 === 5) {
      container.children[5].appendChild(gameTile);
    } else if (i % 7 === 6) {
      container.children[6].appendChild(gameTile);
    }
    // want to add a way to make tiles clickable
    gameTile.addEventListener("click", () => {
      // Everytime a tile div is clicked, the place tile function will be called
      placeTile(i);
    });
  }
  // ========================= FUNCTION FOR DETERMINING WHERE TO PLACE TILE ========================================================
  const placeTile = (index) => {
    // This will return a number betwee 0 and 6 - representing the column the tile is in
    const column = index % 7;
    for (let i = 5; i >= 0; i--) {
      // When a tile is clicked it will start at the bottom row. If bottom row is filled, the loop will run again until a game piece is placed
      const elementToCheck = gameBoard[7 * i + column];

      if (
        // conditional to stop the board from being clicked after a win is determined
        winMessage.textContent === "Red wins!" ||
        winMessage.textContent === "Black wins!"
      ) {
        return;
      }
      // If the background color of the bottom most tile is red or black, run through the loop again
      if (
        elementToCheck.style.backgroundColor === "red" ||
        elementToCheck.style.backgroundColor === "black"
      ) {
        // if filled, continue
        continue;
        // If the bottom most background color is white, this is where the game piece should be placed
      } else if (elementToCheck.style.backgroundColor === "whitesmoke") {
        // this class adds the animation of the pieces falling once a piece is dropped
        elementToCheck.classList.add("fall");
        elementToCheck.style.backgroundColor = lastMove;
        //if last color was red, make the next one black
        if (lastMove === "red") {
          lastMove = "black";
          // Message displaying who's turn it is
          turnMessage.textContent = "Player 2, it's your turn.";
          // if last color was black, make the next one red
        } else if (lastMove === "black") {
          lastMove = "red";
          // Message displaying who's turn it is
          turnMessage.textContent = "Player 1, it's your turn.";
        }
        checkWin();
        return;
      }
    }
  };

  // counter will increase every time red wins
  let countRed = 0;
  // counter will increase every time black wins
  let countBlack = 0;

  //=================== CHECK WIN CONDITIONS ============================================================================
  // need function to check for a win condition after every piece is placed
  const checkWin = () => {
    const blackWin = () => {
      winMessage.textContent = "Black wins!";
      // turnMessage.textContent = " ";
      countBlack += 1;
      player2Win.textContent = countBlack;
    };
    //need function to run everytime there is a win to add to counter
    const redWin = () => {
      winMessage.textContent = "Red wins!";
      countRed += 1;
      player1Win.textContent = countRed;
    };
    // ************************ HORIZONTAL WINS ********************************************************
    for (let i = 0; i < gameBoard.length - 3; i++) {
      let style1 = gameBoard[i].style.backgroundColor;
      let style2 = gameBoard[i + 1].style.backgroundColor;
      let style3 = gameBoard[i + 2].style.backgroundColor;
      let style4 = gameBoard[i + 3].style.backgroundColor;

      // This array will return which columns the pieces are in
      const checkWrapAroundHorizontal = [
        i % 7,
        (i + 1) % 7,
        (i + 2) % 7,
        (i + 3) % 7,
      ];
      // If the above array contains a 0 or 6, it will not be counted as win
      if (
        checkWrapAroundHorizontal.includes(0) &&
        checkWrapAroundHorizontal.includes(6)
      ) {
        continue;
      } else if (
        style1 === "red" &&
        style2 === "red" &&
        style3 === "red" &&
        style4 === "red"
      ) {
        redWin();
      } else if (
        style1 === "black" &&
        style2 === "black" &&
        style3 === "black" &&
        style4 === "black"
      ) {
        blackWin();
      }
    }

    // ************************** VERTICAL WINS ****************************************************************
    for (let i = 0; i < gameBoard.length - 21; i++) {
      const style5 = gameBoard[i].style.backgroundColor;
      const style6 = gameBoard[i + 7].style.backgroundColor;
      const style7 = gameBoard[i + 14].style.backgroundColor;
      const style8 = gameBoard[i + 21].style.backgroundColor;

      if (
        style5 === "red" &&
        style6 === "red" &&
        style7 === "red" &&
        style8 === "red"
      ) {
        redWin();
      } else if (
        style5 === "black" &&
        style6 === "black" &&
        style7 === "black" &&
        style8 === "black"
      ) {
        blackWin();
      }
    }

    // ************************** DESCENDING DIAGONAL WINS ****************************************************************

    for (let i = 0; i < gameBoard.length - 24; i++) {
      const style9 = gameBoard[i].style.backgroundColor;
      const style10 = gameBoard[i + 8].style.backgroundColor;
      const style11 = gameBoard[i + 16].style.backgroundColor;
      const style12 = gameBoard[i + 24].style.backgroundColor;
      const checkWrapAroundDescending = [
        i % 7,
        (i + 8) % 7,
        (i + 16) % 7,
        (i + 24) % 7,
      ];
      if (
        checkWrapAroundDescending.includes(0) &&
        checkWrapAroundDescending.includes(6)
      ) {
        continue;
      } else if (
        style9 === "red" &&
        style10 === "red" &&
        style11 === "red" &&
        style12 === "red"
      ) {
        redWin();
      } else if (
        style9 === "black" &&
        style10 === "black" &&
        style11 === "black" &&
        style12 === "black"
      ) {
        blackWin();
      }
    }

    // ************************** ASCENDING DIAGONAL WINS ****************************************************************
    for (let i = 0; i < gameBoard.length - 18; i++) {
      const style13 = gameBoard[i].style.backgroundColor;
      const style14 = gameBoard[i + 6].style.backgroundColor;
      const style15 = gameBoard[i + 12].style.backgroundColor;
      const style16 = gameBoard[i + 18].style.backgroundColor;
      const checkWrapAroundAscending = [
        i % 7,
        (i + 6) % 7,
        (i + 12) % 7,
        (i + 18) % 7,
      ];
      if (
        checkWrapAroundAscending.includes(0) &&
        checkWrapAroundAscending.includes(6)
      ) {
        continue;
      } else if (
        style13 === "red" &&
        style14 === "red" &&
        style15 === "red" &&
        style16 === "red"
      ) {
        winMessage.textContent = "Red wins!";
        redWin();
      } else if (
        style13 === "black" &&
        style14 === "black" &&
        style15 === "black" &&
        style16 === "black"
      ) {
        winMessage.textContent = "Black Wins";
        blackWin();
      }
    }
    // if every game tile is red or black return true
    const allTilesPlayed = gameBoard.every((gameBoard) => {
      return (
        //this will only return true if all of the tiles are red or black
        gameBoard.style.backgroundColor === "red" ||
        gameBoard.style.backgroundColor === "black"
      );
    });
    // if the above function is true, change the message to a tie
    if (allTilesPlayed === true) {
      winMessage.textContent = "It's a tie!";
    }
  };
  // =================================== RESET BOARD ======================================================================
  const resetBoard = () => {
    for (let i = 0; i < gameBoard.length; i++) {
      let defaultTile = gameBoard[i];
      // loop through the entire game board and set each tile back to whitesmoke
      defaultTile.style.backgroundColor = "whitesmoke";
      // reset the fall animation so that it plays every time a tile is clicked
      defaultTile.classList.remove("fall");
    }
    // erase the win message
    winMessage.textContent = " ";
    // message displaying the turn is shut off when there is a winner
    //this will make it show again
    turnMessage.style.display = "block";
  };
  reset.addEventListener("click", resetBoard);
};

// =================================== TRANSITION FROM INSTRUCTION TO GAME BOARD ======================================================================

const startWindow = () => {
  // grab instuctions - DOM element
  const instructions = document.getElementById("instructions");
  // change div display so that it will now show up
  popUpDiv.style.display = "block";
  // check the text content of the instructions
  instructions.textContent =
    "Welcome to connect 4! Players will alternate taking turns in placing a game piece. Each player will be assigned a color. Game pieces will fall to the bottom of the game board and stack on top of each other. The objective is to get 4 of your own colors in a row, while defending against your opponent so they do not get 4 in a row. Player 1 will go first and will be assigned the color red.";
};

const hideStart = () => {
  // div style will be changed so that it now disappears
  popUpDiv.style.display = "none";
  // div will then show up that contains the contents on the main page
  formatGame.style.display = "block";
};

//once the DOM loads, this will run
document.addEventListener("DOMContentLoaded", () => {
  startWindow();
  startButton.addEventListener("click", createBoard);
  startButton.addEventListener("click", hideStart);
});
