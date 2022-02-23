const container = document.getElementById("container");
const winMessage = document.getElementById("win-message");
const reset = document.getElementById("reset");
let player1Win = document.getElementById("player1-win");
let player2Win = document.getElementById("player2-win");
let turnMessage = document.getElementById("current-turn");
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
      placeTile(i);
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
      console.log(7 * i + column);
      //   console.log(elementToCheck);
      if (
        winMessage.textContent === "Red wins!" ||
        winMessage.textContent === "Black wins!"
      ) {
        return;
      }
      if (
        elementToCheck.style.backgroundColor === "red" ||
        elementToCheck.style.backgroundColor === "black"
      ) {
        // if filled, continue
        continue;
      } else if (elementToCheck.style.backgroundColor === "whitesmoke") {
        //add color on click
        elementToCheck.style.backgroundColor = lastMove;
        //if last color was red, make the next one black
        if (lastMove === "red") {
          lastMove = "black";
          turnMessage.textContent = "Player 2, it's your turn.";
          // if last color was black, make the next one red
        } else if (lastMove === "black") {
          lastMove = "red";
          turnMessage.textContent = "Player 1, it's your turn.";
        }
        checkWin();
        return;
        // console.log("tile was clicked")
      }
    }
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
    //test for a tie
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

  let countRed = 0;
  //need function to run everytime there is a win to add to counter
  const redWin = () => {
    winMessage.textContent = "Red wins!";
    // turnMessage.textContent = " ";
    countRed += 1;
    player1Win.textContent = countRed;
  };

  let countBlack = 0;
  const blackWin = () => {
    winMessage.textContent = "Black wins!";
    // turnMessage.textContent = " ";
    countBlack += 1;
    player2Win.textContent = countBlack;
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

// need to freeze board after there is a win
//can create a new function and run it every time a win condition is met
// ||
// make conditional in the create board function
