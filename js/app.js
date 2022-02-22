const container = document.getElementById("container");
const winMessage = document.getElementById("win-message");
const reset = document.getElementById("reset");
let player = 1;
let lastMove = "red";

// create a function that will generate all of the individual game tiles
const createBoard = () => {
  for (let i = 0; i < 42; i++) {
    // console.log ("make a tile")
    //create a square each time the loop runs
    let gameTile = document.createElement("div");
    //give tiles a class
    gameTile.className = "tile";

    gameTile.style.backgroundColor = "whitesmoke";
    //append these squares to the container
    container.appendChild(gameTile);

    // want to add a way to make tiles clickable
    gameTile.addEventListener("click", () => {
      if (winMessage === "Red wins!" || "Black Wins") {
        return;
      } else {
        placeTile(i);
      }
    });
  }

  // create array from all the divs in container
  //this will allow me to fill coloumns from bottom to top
  let gameBoard = Array.from(container.children);
  //   console.log("this is our game board: ", gameBoard);

  // need function to check for a win condition after every piece is placed

  const placeTile = (index) => {
    const column = index % 7;
    for (let i = 5; i >= 0; i--) {
      const elementToCheck = gameBoard[7 * i + column];
      //   console.log(7 * i + column);
      // console.log(elementToCheck)
      // console.log(7 * i + column)
      if (
        elementToCheck.style.backgroundColor === "red" ||
        elementToCheck.style.backgroundColor === "black"
      ) {
        // if filled, continue
        continue;
      } else if (elementToCheck.style.backgroundColor === "whitesmoke") {
        //add color on click
        // need way to drop pieces to bottom row
        elementToCheck.style.backgroundColor = lastMove;
        //if last color was red, make the next one black
        if (lastMove === "red") {
          lastMove = "black";
          // if last color was black, make the next one red
        } else if (lastMove === "black") {
          lastMove = "red";
        }
        checkWin();
        return;
        // console.log("tile was clicked")
      }
    }
    //call function to check for win after tile is placed
  };

  const checkWin = () => {
    // check for horizontal wins
    // this is allowing incorrect wins through rows - needs to be fixed
    for (let i = 0; i < gameBoard.length - 3; i++) {
      const style1 = gameBoard[i].style.backgroundColor;
      const style2 = gameBoard[i + 1].style.backgroundColor;
      const style3 = gameBoard[i + 2].style.backgroundColor;
      const style4 = gameBoard[i + 3].style.backgroundColor;

      if (
        style1 === "red" &&
        style2 === "red" &&
        style3 === "red" &&
        style4 === "red"
      ) {
        winMessage.textContent = "Red wins!";
        freezeBoard();
      } else if (
        style1 === "black" &&
        style2 === "black" &&
        style3 === "black" &&
        style4 === "black"
      ) {
        winMessage.textContent = "Black Wins";
      }
    }

    // check for vertical wins
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
        winMessage.textContent = "Red wins!";
      } else if (
        style5 === "black" &&
        style6 === "black" &&
        style7 === "black" &&
        style8 === "black"
      ) {
        winMessage.textContent = "Black Wins";
      }
    }

    // check for descending diagonals
    for (let i = 0; i < gameBoard.length - 24; i++) {
      const style9 = gameBoard[i].style.backgroundColor;
      const style10 = gameBoard[i + 8].style.backgroundColor;
      const style11 = gameBoard[i + 16].style.backgroundColor;
      const style12 = gameBoard[i + 24].style.backgroundColor;

      if (
        style9 === "red" &&
        style10 === "red" &&
        style11 === "red" &&
        style12 === "red"
      ) {
        winMessage.textContent = "Red wins!";
      } else if (
        style9 === "black" &&
        style10 === "black" &&
        style11 === "black" &&
        style12 === "black"
      ) {
        winMessage.textContent = "Black Wins";
      }
    }

    //check for ascending diagonal
    for (let i = 0; i < gameBoard.length - 18; i++) {
      const style13 = gameBoard[i].style.backgroundColor;
      const style14 = gameBoard[i + 6].style.backgroundColor;
      const style15 = gameBoard[i + 12].style.backgroundColor;
      const style16 = gameBoard[i + 18].style.backgroundColor;

      if (
        style13 === "red" &&
        style14 === "red" &&
        style15 === "red" &&
        style16 === "red"
      ) {
        winMessage.textContent = "Red wins!";
      } else if (
        style13 === "black" &&
        style14 === "black" &&
        style15 === "black" &&
        style16 === "black"
      ) {
        winMessage.textContent = "Black Wins";
      }
    }
  };

  const freezeBoard = () => {
    if (winMessage === "Red wins!" || "Black Wins") {
      console.log("we gotta freeze it");
    }
  };

  const resetBoard = () => {
    // console.log("button clicked");
    for (let i = 0; i < gameBoard.length; i++) {
      let defaultTile = gameBoard[i];
      defaultTile.style.backgroundColor = "whitesmoke";
    }
    winMessage.textContent = " ";
  };
  reset.addEventListener("click", resetBoard);
};
// console.log('this will give us our board array: ', gameBoard)

//once the DOM loads, this will run
document.addEventListener("DOMContentLoaded", () => {
  createBoard();
});
