let input = require('readline-sync');

let hasPlayed = new WeakSet();
let fleet = new WeakSet();
let boat;
const size = input.questionInt('how big is the grid? i.e. 10 for 10 X 10: ');


class Ships {
    constructor(name, hits, spaces){
        this.name = name;
        this.hits = hits;
        this.spaces = spaces;
    }
    shipSpaces = new Set();
    
    location(size) {
        const direction = Math.floor(Math.random()*4);
        // from the stern
        let x = Math.floor(Math.random() * size);
        let y = Math.floor(Math.random() * size);
        switch(direction){
            // up direction
            case 0:
                let valid = false;
                do {
                    // if()
                
                }while(!valid);
            }
        };
    }
    
    class Carrier extends Ships {
        constructor(name, hits, spaces){
        super(name = 'Carrier', hits = 5, spaces = 5);
    }
}
class Battleship extends Ships {
    constructor(name, hits, spaces){
        super(name = 'Battleship' ,hits = 4, spaces = 4);
    }
}
class Destroyer extends Ships {
    constructor(name, hits, spaces){
        super(name = 'Destroyer' ,hits = 3, spaces = 3);
    }
}
class Submarine extends Ships {
    constructor(name, hits, spaces){
        super(name = 'Submarine', hits = 3, spaces = 3);
    }
}
class PatrolBoat extends Ships {
    constructor(name, hits, spaces){
        super(name = 'Patrol Boat', hits = 2, spaces = 2);
    }
}


let createGrid = (size) => {
    let grid = [];
    for (let i = 0; i < size; i++) {
        grid[i] = [];
        for (let j = 0; j < size; j++) {
        grid[i][j] = String.fromCharCode(65 + i) + (j + 1);
    }
}
return grid;
}

function isValid(loc) {
    loc = loc.charAt(0).toUpperCase() + loc.slice(1);
    let locArr = loc.split('');
    let letter = locArr[0].charCodeAt(0) - 65;
    if(locArr.length > 4 || (letter > theGrid.length)){
        return false;
    }else if(Number(locArr[1]) === NaN){
        return false;
    }else{
        return true;
    }
}

// switch(size){
//     case size < 3:
//         boat = gameBoard[Math.floor(Math.random() * size)][Math.floor(Math.random() * size)];
//         fleet.add(boat);
//         break;
//         case size === 3:
//             patrolBoat = new PatrolBoat();
//         fleet.add(patrolBoat);
//     case size > 3 && size < 5:
//         patrolBoat = new PatrolBoat();
//         submarine = new Submarine();
//         destroyer = new Destroyer();
//         fleet.add([patrolBoat, submarine, destroyer]);
//         break;
//         case size >= 5:
//             patrolBoat = new PatrolBoat();
//             submarine = new Submarine();
//             destroyer = new Destroyer();
//             battleship = new Battleship();
//             carrier = new Carrier();
// }
       
let patrolBoat = new PatrolBoat();       
const gameBoard = createGrid(size);
patrolBoat.location(gameBoard.length);
        
        
        
