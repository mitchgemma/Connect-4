const container = document.getElementById ('container')
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
        
        // want to add a way to make tiles clickable
        gameTile.addEventListener('click', () =>{
            placeTile (i)
        })
    }
    // create array from all the divs in container
    //this will allow me to fill coloumns from bottom to top
    
    let gameBoard = Array.from(container.children)
    console.log ('this is our game board: ', gameBoard)
    
    // need function to check for a win condition after every piece is placed
    
    // ========================================================================================================================
    const placeTile = (index) => {
        const column = index % 7
        for (let i = 5; i >= 0; i--){ 
            const elementToCheck = gameBoard[7 * i + column];
            // console.log(elementToCheck)
            // console.log(7 * i + column)
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
        }
        //call function to check for win after tile is placed
        checkWin()
    }
    
    const checkWin = () => {
        for (let i = 0; i < gameBoard.length; i ++){
            const style1 = gameBoard[i].style.backgroundColor
            const style2 = gameBoard[i + 1].style.backgroundColor
            const style3 = gameBoard[i + 2].style.backgroundColor
            const style4 = gameBoard[i + 3].style.backgroundColor
            
            if (style1 === 'red' && style2 === 'red' && style3 === 'red' && style4 === 'red'){
                console.log('winner!')
            } else if (style1 === 'black' && style2 === 'black' && style3 === 'black' && style4 === 'black'){
                console.log('winner!')
            }
        }
    }    
}
        
    // console.log('this will give us our board array: ', gameBoard)
    
    //once the DOM loads, this will run
    document.addEventListener('DOMContentLoaded', () => {
        createBoard()
    })