const container = document.getElementById ('container')
// let gameBoard = [
//                 "_", "_", "_", "_", "_", "_", "_",
//                 "_", "_", "_", "_", "_", "_", "_",
//                 "_", "_", "_", "_", "_", "_", "_",
//                 "_", "_", "_", "_", "_", "_", "_",
//                 "_", "_", "_", "_", "_", "_", "_",
//                 "_", "_", "_", "_", "_", "_", "_",
// ];
// const winningCombinations = [
//     [0, 1, 2, 3],
//     [1, 2, 3, 4],
//     [2, 3, 4, 5],
//     [3, 4, 5, 6],
//     [7, 8, 9, 10],
//     [8, 9, 10, 11],
//     [2, 3, 4, 5],
//     [3, 4, 5, 6],
// ]
const winMessage = document.getElementById('win-message')
let player = 1
let lastMove = "red"


// create a function that will generate all of the individual game tiles
const createBoard = () => {
    for (let i = 0; i < 42; i++){
        // console.log ("make a tile")
        //create a square each time the loop runs
        let gameTile = document.createElement ('div')
        //give tiles a class 
        gameTile.className = "tile"
        
        gameTile.style.backgroundColor = "whitesmoke"
        //append these squares to the container
        container.appendChild(gameTile)
        
        gameTile.textContent = " "
        // want to add a way to make tiles clickable
        gameTile.addEventListener('click', () =>{
            placeTile (i)
            checkWin()
        })
    }
    // create array from all the divs in container
    //this will allow me to fill coloumns from bottom to top
    
    
    // ========================================================================================================================
    const placeTile = (index) => {
        const column = index % 7
        for (let i = 5; i >= 0; i--){ 
            const elementToCheck = gameBoard[7 * i + column];
            // console.log(elementToCheck)
            console.log(7 * i + column)
            // check board[7 * i + column] is filled with black/red
            if (elementToCheck.style.backgroundColor === 'red' || elementToCheck.style.backgroundColor === 'black'){
                // if filled, continue
                continue
            } else if (elementToCheck.style.backgroundColor === "whitesmoke"){
                //add color on click
                // need way to drop pieces to bottom row
                elementToCheck.style.backgroundColor = lastMove
                //if last color was red, make the next one black
                if (lastMove === "red") {
                    lastMove = "black"
                    // if last color was black, make the next one red
                } else if (lastMove === "black"){
                    lastMove = "red"
                }
                return
                // console.log("tile was clicked")
            }
        }        }
    }
    let gameBoard = Array.from(container.children)
    
    // need function to check for a win condition after every piece is placed
    
    const checkWin = () => {
        for (let i = 0; i < gameBoard.length; i ++){
            const style1 = gameBoard[i].style.backgroundColor
            const style2 = gameBoard[i + 1].style.backgroundColor
            const style3 = gameBoard[i + 2].style.backgroundColor
            const style4 = gameBoard[i + 3].style.backgroundColor
            
            if (style1 === 'red' && style2 === 'red' && style3 === 'red' && style4 === 'red'){
                winMessage.textContent = 'Red wins!'
            }
        }
    }    
    
    // console.log('this will give us our board array: ', gameBoard)
    
    //once the DOM loads, this will run
    document.addEventListener('DOMContentLoaded', () => {
        createBoard()
    })