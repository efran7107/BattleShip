let input = require('readline-sync');

let hasPlayed = new Set();
let boat;
let size = input.questionInt('how big is the grid? i.e. 10 for 10 X 10: ');

class Ships {
    constructor(name, hits, spaces) {
        this.name = name;
        this.hits = hits;
        this.spaces = spaces;
    }
    shipSpaces = new Set();

    setShips() {
        let y;
        let x;
        let direction;
        let notSet = true;
        do {
            y = Math.floor(Math.random() * gameBoard.length);
            x = Math.floor(Math.random() * gameBoard.length);
            direction = Math.floor(Math.random() * 4);
            switch (direction) {
                case 0:
                    if (y - (this.spaces - 1) >= 0) {
                        for (y; this.shipSpaces.size < this.spaces; y--) {
                            let space = gameBoard[y][x];
                            let isOverlap = fleet.filter((boat) => boat.shipSpaces.has(space)).length;
                            if (isOverlap > 0) {
                                this.shipSpaces.clear();
                                notSet = true;
                                break;
                            } else {
                                this.shipSpaces.add(space);
                                if (this.shipSpaces.size === this.spaces) {
                                    notSet = false;
                                    break;
                                }
                            }
                        }
                    } else {
                        notSet = true;
                        break;
                    }
                    break;
                case 1:
                    if (y + (this.spaces + 1) < gameBoard.length) {
                        for (y; this.shipSpaces.size < this.spaces; y++) {
                            let space = gameBoard[y][x];
                            let isOverlap = fleet.filter((boat) => boat.shipSpaces.has(space)).length;
                            if (isOverlap > 0) {
                                this.shipSpaces.clear();
                                notSet = true;
                                break;
                            } else {
                                this.shipSpaces.add(space);
                                if (this.shipSpaces.size === this.spaces) {
                                    notSet = false;
                                    break;
                                }
                            }
                        }
                    } else {
                        notSet = true;
                        break;
                    }
                    break;
                case 2:
                    if (x - (this.spaces - 1) >= 0) {
                        for (x; this.shipSpaces.size < this.spaces; x--) {
                            let space = gameBoard[y][x];
                            let isOverlap = fleet.filter((boat) => boat.shipSpaces.has(space)).length;
                            if (isOverlap > 0) {
                                this.shipSpaces.clear();
                                notSet = true;
                                break;
                            } else {
                                this.shipSpaces.add(space);
                                if (this.shipSpaces.size === this.spaces) {
                                    notSet = false;
                                    break;
                                }
                            }
                        }
                    } else {
                        notSet = true;
                        break;
                    }
                    break;
                case 3:
                    if (x + (this.spaces + 1) < gameBoard.length) {
                        for (x; this.shipSpaces.size < this.spaces; x++) {
                            let space = gameBoard[y][x];
                            let isOverlap = fleet.filter((boat) => boat.shipSpaces.has(space)).length;
                            if (isOverlap > 0) {
                                this.shipSpaces.clear();
                                notSet = true;
                                break;
                            } else {
                                this.shipSpaces.add(space);
                                if (this.shipSpaces.size === this.spaces) {
                                    notSet = false;
                                    break;
                                }
                            }
                        }
                    } else {
                        notSet = true;
                        break;
                    }
                    break;
            }
        } while (notSet);
    }

    hasHit(loc) {
        let hit = this.shipSpaces.has(loc);
        if (hit) {
            this.shipSpaces.delete(loc);
            hasPlayed.add(loc);
            console.log(`You have hit enemy ${this.name}`);
            this.hits--;
            if (this.hits === 0) {
                console.log(`You have sunk enemy ${this.name}`);
            }
            return true;
        } else {
            return false;
        }
    }

}

class Carrier extends Ships {
    constructor(name, hits, spaces) {
        super(name = 'Carrier', hits = 5, spaces = 5);
    }
}
class Battleship extends Ships {
    constructor(name, hits, spaces) {
        super(name = 'Battleship', hits = 4, spaces = 4);
    }
}
class Destroyer extends Ships {
    constructor(name, hits, spaces) {
        super(name = 'Destroyer', hits = 3, spaces = 3);
    }
}
class Submarine extends Ships {
    constructor(name, hits, spaces) {
        super(name = 'Submarine', hits = 3, spaces = 3);
    }
}
class PatrolBoat extends Ships {
    constructor(name, hits, spaces) {
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

function generateBoats(size) {
    tempArr = [];
    if (size < 3) {
        boat = new Ships('Boat', 1, 1);
        tempArr.push(boat);
    } else if (size === 3) {
        let patrolBoat = new PatrolBoat();
        tempArr.push(patrolBoat);
    } else if (size > 3 && size < 5) {
        let patrolBoat = new PatrolBoat();
        let submarine = new Submarine();
        let destroyer = new Destroyer();
        tempArr.push(patrolBoat, submarine, destroyer);
    } else {
        let patrolBoat = new PatrolBoat();
        let submarine = new Submarine();
        let destroyer = new Destroyer();
        let battleship = new Battleship();
        let carrier = new Carrier();
        tempArr.push(patrolBoat, submarine, destroyer, battleship, carrier);
    }

    return tempArr;
}

function generateGridLayout(size) {
    let gridLayout = '';
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            gridLayout += (`|_${gameBoard[i][j]}_`);
            if (j === size - 1) {
                gridLayout += (`| \n`);
            }
        }
    }
    return gridLayout;
}


const isValid = (loc) => {
    let userInput = loc
    userInput = loc.charAt(0).toUpperCase() + loc.slice(1);
    if (gameBoard.filter(row => row.includes(userInput)).length === 0 && hasPlayed.has(userInput) === false) {
        return false;
    } else {
        return true;
    }
}

const isMark = (loc) => {
    for (let i = 0; i < gameBoard.length; i++) {
        for (let j = 0; j < gameBoard.length; j++) {
            let temp = gameBoard[i][j];
            if (temp === loc && fleet.filter(boat => boat.shipSpaces.has(temp)).length > 0) {
                gameBoard[i][j] = 'X ';
                break;
            } else if (temp === loc) {
                gameBoard[i][j] = 'O ';
                break;
            }

        }
    }

}

let gameBoard = createGrid(size);
let fleet = generateBoats(size);
fleet.forEach(boat => boat.setShips());
gameOver = false;
do {
    console.log(generateGridLayout(size));
    let userInput = input.question('Please enter a target i.e A1 ');
    while (isValid(userInput) === false) {
        console.log('please enter a valid location');
        userInput = input.question('Please enter a target i.e A1 ');
    }

    let loc = userInput;
    loc = loc.charAt(0).toUpperCase() + loc.slice(1);
    isMark(loc);
    console.clear();

    console.log(generateGridLayout(size));

    let hasHit = fleet.filter(boat => boat.hasHit(loc)).length;
    if (hasHit === 0) {
        if (hasPlayed.has(loc)) {
            console.log('You have already choose this location, Miss!');
        } else {
            console.log('You have missed');
            hasPlayed.add(loc);
        }
    }

    fleet = fleet.filter(boat => boat.hits > 0);

    if (fleet.length === 0) {
        let playAgain = input.keyInYN('The game is over, Play again?');
        if (playAgain) {
            size = input.questionInt('how big is the grid? i.e. 10 for 10 X 10: ');
            gameBoard = createGrid(size);
            fleet = generateBoats(size);
            fleet.forEach(boat => boat.setShips());
            gameOver = false;
        } else {
            gameOver = true;
        }
    }

    input.keyInPause('Press any key to continue... ')
    console.clear();

} while (!gameOver);