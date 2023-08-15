let input = require('readline-sync');

const playerDisplay = (markGrid) => {
    let gameboard = `  `;
    let grid = markGrid;
    let isRepeat = false;
    for (let i = 0; i < grid.length; i++) {
        let letter = String.fromCharCode(65 + i);
        if (i >= 0 && isRepeat) {
            gameboard += ` ${letter}`;
        }
        for (let j = 0; j < grid.length; j++) {
            if (i === 0 && !isRepeat) {
                gameboard += `  ${j + 1} `
                if (j === grid.length - 1) {
                    gameboard += `  \n`;
                    i -= 1;
                    isRepeat = true;
                }
            } else {
                gameboard += `|_${grid[i][j]}_`;
                if (j === grid.length - 1) {
                    gameboard += `| \n`;
                }
            }
        }
    }
    return gameboard;
}

const isValid = (gameBoard, playerName) => {
    let name = playerName;
    let valid = false;
    do {
        let loc = input.question(`Please enter a location General ${name}: ie A1 for A1 `);
        let grid = gameBoard;
        let target = loc.charAt(0).toUpperCase() + loc.slice(1);

        if (grid.filter(row => row.includes(target)).length > 0) {
            return target;
        } else {
            console.log('please enter a valid location! ');
            valid = false;
        }
    } while (!valid);
}

const hitOrMiss = (result, boat) => {
    let numResult = result;
    let playerBoat = boat;
    let boatName;
    if (boat.length > 0) {
        boatName = playerBoat[0].name;
    }
    switch (numResult) {
        case 0:
            console.log('You have already hit this ship, Miss!');
            break;
        case 1:
            console.log('You have already chose this location, Miss!');
            break;
        case 2:
            console.log(`You have sunk enemy ship!`);
            break;
        case 3:
            console.log(`You have hit enemy ${boatName}!`);
            break;
        case 4:
            console.log('You have Missed!');
            break;
        default:
            break;
    }
}

const gameOver = (ships) => {
    let shipNum = ships;
    if (shipNum === 0) {
        let playAgain = input.keyInYN('Do you want to play again?');
        if (playAgain) {
            size = input.questionInt('Please enter a grid size ie 10 for 10 x 10: ');
            playerName = input.question('Please Enter a name: ');
            if (numPlayers === 1) {
                playerTwo = new Player('CPU', size);
            } else {
                playerName = input.question('Please Enter a name: ');
                playerTwo = new Player(playerName, size);
            }
            playerOne.addShips();
            playerOne.setShips();
            playerTwo.addShips();
            playerTwo.setShips();
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
}

class Ship {
    constructor(name, spaces) {
        this.name = name;
        this.spaces = spaces;
    }

    loc = new Set();

    setShip(gameBoard, fleet) {
        let grid = gameBoard;
        let playerFleet = fleet;
        let set = false;
        do {
            let direction = Math.floor(Math.random() * 4);
            let y = Math.floor(Math.random() * grid.length);
            let x = Math.floor(Math.random() * grid.length);
            let tile = grid[y][x];
            if (playerFleet.filter(boat => boat.loc.has(tile)).length > 0) {
                set = false;
            } else {
                this.loc.add(tile);
            }
            switch (direction) {
                case 0:
                    if (y - (this.spaces - 1) < 0) {
                        this.loc.clear();
                        set = false;
                    } else {
                        for (y -= 1; this.loc.size < this.spaces; y--) {
                            tile = grid[y][x];
                            if (playerFleet.filter(boat => boat.loc.has(tile)).length > 0) {
                                this.loc.clear();
                                set = false;
                            } else {
                                this.loc.add(tile);
                            }
                        }
                        set = true;
                    }
                    continue;
                case 1:
                    if (y + (this.spaces - 1) > grid.length - 1) {
                        this.loc.clear();
                        set = false;
                    } else {
                        for (y += 1; this.loc.size < this.spaces; y++) {
                            tile = grid[y][x];
                            if (playerFleet.filter(boat => boat.loc.has(tile)).length > 0) {
                                this.loc.clear();
                                set = false;
                            } else {
                                this.loc.add(tile);
                                if (this.loc.size === this.spaces) {
                                    set = true;
                                }
                            }
                        }
                    }
                    continue;
                case 2:
                    if (x - (this.spaces - 1) < 0) {
                        this.loc.clear();
                        set = false;
                    } else {
                        for (x -= 1; this.loc.size < this.spaces; x--) {
                            tile = grid[y][x];
                            if (playerFleet.filter(boat => boat.loc.has(tile)).length > 0) {
                                this.loc.clear();
                                set = false;
                            } else {
                                this.loc.add(tile);
                                if (this.loc.size === this.spaces) {
                                    set = true;
                                }
                            }
                        }
                    }
                    continue;
                case 3:
                    if (x + (this.spaces - 1) > grid.length - 1) {
                        this.loc.clear();
                        set = false;
                    } else {
                        for (x += 1; this.loc.size < this.spaces; x++) {
                            tile = grid[y][x];
                            if (playerFleet.filter(boat => boat.loc.has(tile)).length > 0) {
                                this.loc.clear();
                                set = false;
                            } else {
                                this.loc.add(tile);
                                if (this.loc.size === this.spaces) {
                                    set = true;
                                }
                            }
                        }
                    }
                    continue;
            }

        } while (!set)
    }

}

class Carrier extends Ship {
    constructor(name, spaces) {
        super(name = 'Carrier', spaces = 5);
    }
}
class Battleship extends Ship {
    constructor(name, spaces) {
        super(name = 'Battleship', spaces = 4);
    }
}
class Destroyer extends Ship {
    constructor(name, spaces) {
        super(name = 'Destroyer', spaces = 3);
    }
}
class Submarine extends Ship {
    constructor(name, spaces) {
        super(name = 'Submarine', spaces = 3);
    }
}
class PatrolBoat extends Ship {
    constructor(name, spaces) {
        super(name = 'Patrol Boat', spaces = 2);
    }
}

class Player {
    constructor(name, gridSize) {
        this.name = name;
        this.gridSize = gridSize;
    }

    playerFleet = [];

    hasHit = new Set();
    hasPlayed = new Set();

    ships = () => {
        return this.playerFleet.length;
    }

    generateBoard = () => {
        let grid = [];
        let size = this.gridSize;
        for (let i = 0; i < size; i++) {
            grid[i] = [];
            for (let j = 0; j < size; j++) {
                grid[i][j] = String.fromCharCode(65 + i) + (j + 1);
            }
        }
        return grid;
    }

    hasPlayInt = (filter) => {
        let play = [];
        filter.forEach(item => {
            let tile = item;
            let letter = tile[0].charCodeAt(0) - 65;
            let number = tile.substring(1) - 1;
            play.push([letter, number]);
        });
        return play;
    }

    doesExist = (i, j, filterPlay, filterHit) => {
        let played = filterPlay.filter(item => item[0] === i && item[1] === j).length;
        let hit = filterHit.filter(item => item[0] === i && item[1] === j).length;
        if (played > 0 && hit > 0) {
            return 2;
        } else if (played > 0) {
            return 1;
        } else {
            return 0
        }
    }

    generateDisplayGrid = () => {
        let grid = [];
        let play = this.hasPlayInt(this.hasPlayed);
        let hit = this.hasPlayInt(this.hasHit);
        for (let i = 0; i < this.gridSize; i++) {
            let row = []
            for (let j = 0; j < this.gridSize; j++) {
                let isPlayed = this.doesExist(i, j, play, hit);
                switch (isPlayed) {
                    case 0:
                        row.push('_');
                        break;
                    case 1:
                        row.push('O');
                        break;
                    case 2:
                        row.push('X');
                        break;
                }
                if (j === this.gridSize - 1) {
                    grid.push(row)
                }
            }
        }
        return grid;
    }

    addShips() {
        if (this.gridSize < 3) {
            let ship = new Ship('Ship', 1);
            this.playerFleet.push(ship);
        } else if (this.gridSize >= 3 && this.gridSize < 6) {
            let destroyer = new Destroyer();
            let submarine = new Submarine();
            let patrolBoat = new PatrolBoat();
            this.playerFleet.push(destroyer, submarine, patrolBoat);
        } else {
            let carrier = new Carrier();
            let battleship = new Battleship();
            let destroyer = new Destroyer();
            let submarine = new Submarine();
            let patrolBoat = new PatrolBoat();
            this.playerFleet.push(carrier, battleship, destroyer, submarine, patrolBoat);
        }
    }

    setShips() {
        this.playerFleet.forEach(boat => boat.setShip(this.generateBoard(), this.playerFleet));
    }

    playTarget = (target) => {
        const hasHit = this.hasHit.has(target);
        const hasPlayed = this.hasPlayed.has(target);
        const hit = this.playerFleet.filter(boat => boat.loc.has(target)).length;
        if (hasHit && hasPlayed) {
            return 0;
        } else if (hasPlayed) {

            return 1;
        } else if (hit > 0) {
            const boat = this.playerFleet.filter(boat => boat.loc.has(target));

            boat[0].spaces -= 1;
            if (boat[0].spaces === 0) {
                this.playerFleet = this.playerFleet.filter(boat => boat.spaces > 0);
                this.hasPlayed.add(target);
                this.hasHit.add(target);
                return 2;
            } else {
                this.hasPlayed.add(target);
                this.hasHit.add(target);
                return 3;
            }
        } else {

            this.hasPlayed.add(target);
            return 4;
        }
    }


}

let size = input.questionInt('Please enter a grid size ie 10 for 10 x 10: ');
let playerName = input.question('Please Enter a name: ');
let numPlayers = input.questionInt('How Many Players? 1 or 2: ');
let playerOne = new Player(playerName, size);
let playerTwo;
if (numPlayers === 1) {
    playerTwo = new Player('CPU', size);
} else {
    playerName = input.question('Please Enter a name: ');
    playerTwo = new Player(playerName, size);
}
playerOne.addShips();
playerOne.setShips();
playerTwo.addShips();
playerTwo.setShips();

let inGame = true;
console.clear();
do {
    console.log(playerDisplay(playerTwo.generateDisplayGrid()));
    let target = isValid(playerOne.generateBoard(), playerOne.name);

    console.clear();

    let result = playerTwo.playTarget(target);
    console.log(playerDisplay(playerTwo.generateDisplayGrid()));
    let boat = playerTwo.playerFleet.filter(boat => boat.loc.has(target));
    hitOrMiss(result, boat);
    inGame = gameOver(playerTwo.ships());

    input.keyInPause('Press any key to continue...');
    console.clear();

    if (numPlayers === 1) {
        let i = Math.floor(Math.random() * size);
        let j = Math.floor(Math.random() * size);

        let cpuLoc = String.fromCharCode(65 + i) + (j + 1);

        let cpuResult = playerOne.playTarget(cpuLoc);
        inGame = gameOver(playerOne.ships());
    } else {
        console.log(playerDisplay(playerOne.generateDisplayGrid()));
        target = isValid(playerTwo.generateBoard(), playerTwo.name);

        console.clear();

        result = playerOne.playTarget(target);
        console.log(playerDisplay(playerOne.generateDisplayGrid()));
        boat = playerOne.playerFleet.filter(boat => boat.loc.has(target));

        hitOrMiss(result, boat);

        inGame = gameOver(playerOne.ships());

        input.keyInPause('Press any key to continue...');
        console.clear();
    }

} while (inGame);