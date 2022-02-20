const container = document.getElementById ('container')
let gameBoard = [
                ["_", "_", "_", "_", "_", "_", "_",],
                ["_", "_", "_", "_", "_", "_", "_",],
                ["_", "_", "_", "_", "_", "_", "_",],
                ["_", "_", "_", "_", "_", "_", "_",],
                ["_", "_", "_", "_", "_", "_", "_",],
                ["_", "_", "_", "_", "_", "_", "_",],
];
let player = 1
let lastMove = "red"
let currentBlack = "black"
let currentRed = "red"


// create a function that will generate all of the individual game tiles
const createBoard = () => {
    for (let i = 0; i < 42; i++){
        // console.log ("make a tile")
        //create a square each time the loop runs
        let gameTile = document.createElement ('div')
        //give tiles a class 
        gameTile.className = "tile"
        //append these squares to the container
        container.appendChild(gameTile)
        // want to add a way to make tiles clickable
    
        gameTile.addEventListener('click', click =>{
            // alternate which color a tile will turn
            gameTile.style.backgroundColor = lastMove
            //if last color was red, make the next one black
            if (lastMove === "red") {
                lastMove = "black"
            // if last color was black, make the next one red
            } else if (lastMove === "black"){
                lastMove = "red"
            }
            // console.log("tile was clicked")
            if (gameTile.style.backgroundColor !== "red" || "black"){
                
            }
        })
    }
}
// create a function to alternate between 2 colors






console.log('this will give us our board array: ', gameBoard)

//once the DOM loads, this will run
document.addEventListener('DOMContentLoaded', () => {
    createBoard()
})