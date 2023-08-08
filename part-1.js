var readlineSync = require('readline-sync');

let gameBoard = [];
let hasPlayed = [];
let num1;
let num2;
let boat1;
let boat2;
let boats;


function createGame() {
    gameBoard = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'];
    hasPlayed = [];
    
    num1 = Math.floor(Math.random() * gameBoard.length);
    num2 = Math.floor(Math.random() * gameBoard.length - 1);
    
    boat1 = gameBoard[num1];
    gameBoard.splice(gameBoard.indexOf(boat1), 1);
    boat2 = gameBoard[num2];
    gameBoard.push(boat1);
    
    boats = 2;
    
}

let gameOver = false;



const launch = (loc) => {
    if (loc === boat1 || loc === boat2) {
        if (hasPlayed.includes(loc) === true) {
            return 1;
        } else {
            hasPlayed.push(loc);
            gameBoard.pop(gameBoard.indexOf(loc));
            return 2;
        }
    } else if (hasPlayed.includes(loc) === true) {
        return 3;
    } else {
        hasPlayed.push(loc);
        gameBoard.pop(gameBoard.indexOf(loc));
        return 4
    }

    
    
}

const location = () => {
    let valid = false;
    let loc = readlineSync.question('Enter a location to strike ie \'A2\'');
    while (!valid) {
        loc = loc.charAt(0).toUpperCase() + loc.slice(1);
        if (loc.length > 2 && (gameBoard.includes(loc) === false && hasPlayed.includes(loc) === false)) {
            console.log('Please enter a valid location');
            valid = false;
        }

        valid = true;
    }
    return loc;
}

readlineSync.keyInPause(`Press Any Key to continue...`);
console.clear();
createGame();

while (!gameOver) {
    const target = location();
    const hasHit = launch(target);
    
    switch (hasHit) {
        case 1:
            console.log('you have already hit this target. Miss.');
            break;
        case 2:
            boats--;
            console.log(`Hit. You have sunk a battleship. ${boats} remaining.`);
            break;
        case 3:
            console.log(`You have already picked this location. Miss!`);
            break;
        case 4:
            console.log('You have missed!')
            break;
    }

    gameOver = boats === 0 ? true : false;
    if (gameOver) {
        playAgain = readlineSync.keyInYN('You have destroyed all battleships. Would you like to play again? ');
        if (playAgain) {
            createGame();
            gameOver = false;
            console.clear();

        } else {
            process.exit();
        }
    }

    readlineSync.keyInPause('press any key to continue...');
    console.clear();
    
}