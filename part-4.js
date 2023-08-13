let input = require('readline-sync');

function generateGrid(size) {
    let grid = []
    for (let i = 0; i < size; i++) {
        let letter = String.fromCharCode(65 + i);
        let arr = [];
        for (let j = 0; j < size; j++) {
            arr.push(letter + (j + 1));
            if (j == size - 1) {
                grid.push(arr);
            }
        }
    }
    return grid;
}

function girdDisplay(size) {
    let grid = [];
    for (let i = 0; i < size; i++) {
        let row = [];
        for (let j = 0; j < size; j++) {
            row.push('_');
            if (j === size - 1) {
                grid.push(row);
            }
        }
    }
    return grid;
}

function generateDisplay(size) {
    let grid = girdDisplay(size);
    let board = ``;
    for (let i = 0; i < size; i++) {
        board += ` ${String.fromCharCode(65 + i)}   `;
        for (let j = 0; j < size; j++) {
            let item = grid[i][j];
            board += (`|_${item}_`);
            if (j === size - 1) {
                board += (`|    \n`);
            }
        }
    }
    return board;
}

const checkInput = (loc, playerGrid) => {
    const location = loc;
    const grid = playerGrid;
    if (grid.filter(row => row.includes(location)).length === 0) {
        return false;
    } else {
        return true;
    }
}

class Player {
    constructor(name, ships, gridLen) {
        this.name = name;
        this.ships = ships;
        this.gridLen = gridLen;
    }

    hasPlayed = new WeakSet();


    addShips() {
        let boats = [];
        let patrolBoat = new PatrolBoat();
        let submarine = new Submarine();
        let destroyer = new Destroyer();
        let battleship = new Battleship();
        let carrier = new Carrier();

        boats.push(patrolBoat, submarine, destroyer, battleship, carrier);
        return boats;
    }

    setShips() {
        this.playerFleet.forEach(boat => boat.setShips(generateGrid(this.gridLen), this.playerFleet));
    }

    getPlayerBoard = () => {
        return this.playerDisplay;
    }

    getMarkBoard = () => {
        return this.markBoard;
    }

    getPlayerDisplay = () => {
        return this.playerDisplay;
    }

    playerBoard = generateGrid(this.gridLen);
    markBoard = girdDisplay(this.gridLen);
    playerDisplay = generateDisplay(this.gridLen);
    playerFleet = this.addShips();

}

class Ship {
    constructor(name, hits, spaces) {
        this.name = name;
        this.hits = hits;
        this.spaces = spaces;
    }

    loc = new Set();

    setShips(playerBoard, playerFleet) {
        const board = playerBoard;
        let fleet = playerFleet;
        let set = false;
        do {
            let y = Math.floor(Math.random() * board.length);
            let x = Math.floor(Math.random() * board.length);
            let point = Math.floor(Math.random() * 4);
            let tile = board[y][x];
            if (fleet.filter(boat => boat.loc.has(tile)).length > 0) {
                continue;
            } else {
                this.loc.add(tile);
            }
            switch (point) {
                case 0:
                    if (y - (this.spaces - 1) >= 0) {
                        for (y -= 1; this.loc.size < this.spaces; y--) {
                            tile = board[y][x]
                            if (fleet.filter(boat => boat.loc.has(tile)).length > 0) {
                                this.loc.clear();
                                continue;
                            }

                            this.loc.add(board[y][x]);

                        }
                        set = true;
                    }
                    break;
                case 1:
                    if (y + (this.spaces - 1) < board.length) {
                        for (y += 1; this.loc.size < this.spaces; y++) {
                            tile = board[y][x]
                            if (fleet.filter(boat => boat.loc.has(tile)).length > 0) {
                                this.loc.clear();
                                continue;
                            }

                            this.loc.add(board[y][x]);

                        }
                        set = true;
                    }
                    break;
                case 2:
                    if (x - (this.spaces - 1) >= 0) {
                        for (x -= 1; this.loc.size < this.spaces; x--) {
                            tile = board[y][x]
                            if (fleet.filter(boat => boat.loc.has(tile)).length > 0) {
                                this.loc.clear();
                                continue;
                            }

                            this.loc.add(board[y][x]);

                        }
                        set = true;
                    }
                    break;
                case 3:
                    if (x + (this.spaces - 1) < board.length) {
                        for (x += 1; this.loc.size < this.spaces; x++) {
                            tile = board[y][x]
                            if (fleet.filter(boat => boat.loc.has(tile)).length > 0) {
                                this.loc.clear();
                                continue;
                            }

                            this.loc.add(board[y][x]);

                        }
                        set = true;
                    }
                    break;

            }

        } while (!set);
    }

}

class Carrier extends Ship {
    constructor(name, hits, spaces) {
        super(name = 'Carrier', hits = 5, spaces = 5);
    };
}
class Battleship extends Ship {
    constructor(name, hits, spaces) {
        super(name = 'Battleship', hits = 4, spaces = 4)
    };
}
class Destroyer extends Ship {
    constructor(name, hits, spaces) {
        super(name = 'Destroyer', hits = 3, spaces = 3)
    };
}
class Submarine extends Ship {
    constructor(name, hits, spaces) {
        super(name = 'Submarine', hits = 3, spaces = 3)
    };
}
class PatrolBoat extends Ship {
    constructor(name, hits, spaces) {
        super(name = 'Patrol Boat', hits = 2, spaces = 2)
    };
}


let playerOne = new Player('Ernie', 5, 10);
let playerTwo = new Player('CPU', 5, 10);

playerOne.setShips();
playerTwo.setShips();
let turns = 2;
inGame = true;
do {
    let girdDisplay = playerOne.getPlayerDisplay();
    console.log(girdDisplay);
    let confirmed = false;
    do {
        let loc = input.question('Please enter a location ie \'A1\': ');
        confirmed = checkInput(loc, playerTwo.playerBoard);
        if (!confirmed) {
            console.log('Please enter a valid input');
        }
    } while (!confirm)

} while (inGame);