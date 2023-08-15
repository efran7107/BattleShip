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

const isValid = (loc, gameBoard) => {
    let grid = gameBoard;
    let target = loc.charAt(0).toUpperCase() + loc.slice(1);
    if (grid.filter(row => row.includes(target)).length > 0) {
        return true;
    } else {
        return false;
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
    constructor(name, ships, gridSize) {
        this.name = name;
        this.ships = ships;
        this.gridSize = gridSize;
    }

    playerFleet = []

    hasHit = new Set();
    hasPlayed = new Set();

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
                this.ships -= 1;
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

let playerOne = new Player('Ernie', 5, size);
let playerTwo = new Player('CPU', 5, size);
playerOne.addShips();
playerOne.setShips();
playerTwo.addShips();
playerTwo.setShips();

let inGame = true;

do {
    console.log(playerDisplay(playerTwo.generateDisplayGrid()));
    let loc = input.question(`Please enter a location General ${playerOne.name}: ie A1 for A1 `);
    let valid = isValid(loc, playerOne.generateBoard());
    if (!valid) {
        do {
            console.log('please enter a valid location! ');
            loc = input.question(`Please enter a location General ${playerOne.name}: ie A1 for A1 `);
            valid = isValid(loc, player.generateBoard());
        } while (!valid);
    }

    const target = loc.charAt(0).toUpperCase() + loc.slice(1);

    console.clear();

    let result = playerTwo.playTarget(target);
    console.log(playerDisplay(playerTwo.generateDisplayGrid()));
    let boat = playerTwo.playerFleet.filter(boat => boat.loc.has(target));
    let boatName;
    if (boat.length > 0) {
        boatName = boat[0].name;
    }
    switch (result) {
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

    if (playerTwo.ships === 0) {
        let playAgain = input.keyInYN('Do you want to play again?');
        if (playAgain) {
            size = input.questionInt('Please enter a grid size ie 10 for 10 x 10: ');
            playerOne = new Player('Ernie', 5, size);
            playerTwo = new Player('CPU', 5, size);
            playerOne.addShips();
            playerOne.setShips();
            playerTwo.addShips();
            playerTwo.setShips();
            let inGame = true;
            let turns = 2;
        } else {
            inGame = false;
        }
    }

    input.keyInPause('Press any key to continue...');
    console.clear();

    let i = Math.floor(Math.random() * size);
    let j = Math.floor(Math.random() * size);

    let cpuLoc = String.fromCharCode(65 + i) + (j + 1);

    let cpuResult = playerOne.playTarget(cpuLoc);
    let cpuBoat = playerOne.playerFleet.filter(boat => boat.loc.has(target));
    let cpuBoatName;
    if (cpuBoat.length > 0) {
        cpuBoatName = cpuBoat[0].name;
    }
    switch (cpuResult) {
        case 0:
            console.log('You have already hit this ship, Miss!');
            break;
        case 1:
            console.log('You have already chose this location, Miss!');
            break;
        case 2:
            console.log(`You have sunk enemy ${cpuBoatName}!`);
            break;
        case 3:
            console.log(`You have hit enemy ship!`);
            break;
        case 4:
            console.log('You have Missed!');
            break;
        default:
            break;
    }

    if (playerOne.ships === 0) {
        let playAgain = input.keyInYN('Do you want to play again?');
        if (playAgain) {
            size = input.questionInt('Please enter a grid size ie 10 for 10 x 10: ');
            playerOne = new Player('Ernie', 5, size);
            playerTwo = new Player('CPU', 5, size);
            playerOne.addShips();
            playerOne.setShips();
            playerTwo.addShips();
            playerTwo.setShips();
            let inGame = true;
            let turns = 2;
        } else {
            inGame = false;
        }
    }

    console.clear();

} while (inGame);