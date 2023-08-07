let input = require('readline-sync');

let hasPlayed = new Set();

class Ships {
    constructor(name, hits, spaces){
        this.name = name;
        this.hits = hits;
        this.spaces = spaces;
    }
    shipSpaces = new Set();

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


function createGrid(size) {
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


let theGrid = createGrid(10);
const carrier = new Carrier();
const battleship = new Battleship();
const destroyer = new Destroyer();
const submarine = new Submarine();
const patrolBoat = new PatrolBoat();
console.log(isValid('a10'));
console.log(carrier.name);
console.log(battleship.name);
console.log(destroyer.name);
console.log(submarine.name);
console.log(patrolBoat.name);




