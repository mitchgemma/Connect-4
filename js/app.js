const container = document.getElementById ('container')


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
    }
}
createBoard()