let input = require('readline-sync');

let gameBoard = generateGrid(10);
let displayArr = girdDisplay(10);
let gameDisplay = generateDisplay(10);

class Player {
    constructor(name, ships, gridLen){
        this.name = name;
        this.ships = ships;
        this.gridLen = gridLen;
    }
    
    playerFleet = [];
    
    playerBoard = gameBoard;
    markBoard = displayArr;
    
    addShips(){
        let boats = [];
        let patrolBoat = new PatrolBoat();
        boats.push(patrolBoat);
        return boats;
    }
    
}

class Ship {
    constructor(name, hits, spaces){
        this.name = name;
        this.hits = hits;
        this.spaces = spaces;
    }

    loc = new Set();

    setShips(mapArr, fleet){

    }

}

class Carrier extends Ship {
    constructor(name, hits, spaces){
        super(name = 'Carrier', hits = 5, spaces = 5);
    };
}
class Battleship extends Ship {
    constructor(name, hits, spaces){
        super(name = 'Battleship', hits = 4, spaces = 4)
    };
}
class Destroyer extends Ship {
    constructor(name, hits, spaces){
        super(name = 'Destroyer', hits = 3, spaces = 3)
    };
}
class Submarine extends Ship {
    constructor(name, hits, spaces){
        super(name = 'Submarine', hits = 3, spaces = 3)
    };
}
class PatrolBoat extends Ship {
    constructor(name, hits, spaces){
        super(name = 'Patrol Boat', hits = 2, spaces = 2)
    };
}

    

    function generateGrid(size) {
        let grid = []
        for(let i = 0; i < size; i++){
            let letter = String.fromCharCode(65 + i);
            let arr = [];
            for(let j = 0; j < size; j++){
                arr.push(letter + (j + 1));
                if(j == size - 1){
                    grid.push(arr);
                }
            }
        }
        return grid;
    }

    function girdDisplay(size) {
        let grid = [];
        for(let i = 0; i < size; i++){
            let row = [];
            for(let j = 0; j < size; j++){
                row.push('_');
                if(j === size - 1){
                    grid.push(row);
                }
            }
        }
        return grid;
    }

    function generateDisplay(size) {
        let grid = girdDisplay(size);
        let board = ``;
        for(let i = 0; i < size; i++){
            board += ` ${String.fromCharCode(65 + i)}   `;
            for(let j = 0; j < size; j++){
                let item = grid[i][j];
                board += (`|_${item}_`);
                if(j === size - 1){
                    board += (`|    \n`);
                }
            }
        }

        return board;
    }

const playerOne = new Player('Ernie', 5,  10);

console.log(gameBoard);
console.log(displayArr);
console.log(gameDisplay);

let fleet1 = playerOne.addShips();
fleet1.forEach(boat => boat.setShips(gameBoard, fleet1))


