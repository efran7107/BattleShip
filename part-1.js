var readlineSync = require('readline-sync');


readlineSync.keyInPause(`Press Any Key to continue...`);
console.clear();

let gameBoard = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'];
let hasPlayed = [];

const num1 = Math.floor(Math.random() * 9);
const num2 = Math.floor(Math.random() * 8);

const boat1 = gameBoard[num1];
gameBoard.splice(gameBoard.indexOf(boat1), 1);
const boat2 = gameBoard[num2];
gameBoard.push(boat1);

let boats = 2;

let gameOver = false;



const gameLog = () => {
    console.log(
        `    1   2   3
 A |   |   |   |
 B |   |   |   |
 C |   |   |   |`
    );
}

const location = () => {
    let valid = false;
    while (!valid) {
        let loc = readlineSync.question('Enter a location to strike ie \'A2\'');
        loc = loc.charAt(0).toUpperCase() + loc.slice(1);
        if (loc.length > 2 || (gameBoard.includes(loc) === false && hasPlayed.includes(loc) === false)) {
            console.log('Please enter a valid location');
            valid = false;
        }
        return loc;
    }
}

const launch = (loc) => {
    if (loc === boat1 || loc === boat2) {
        if (hasPlayed.includes(loc) === true) {
            return 1;
        } else {
            hasPlayed.push(loc);
            gameBoard.splice(gameBoard.indexOf(loc), 1);
            return 2;
        }
    } else if (hasPlayed.includes(loc) === true) {
        return 3;
    } else {
        hasPlayed.push(loc);
        gameBoard.splice(gameBoard.indexOf(loc), 1);
        return 4
    }



}

while (!gameOver) {
    gameLog();
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
            boats = 2;
            gameBoard = gameBoard.concat(hasPlayed);
            hasPlayed = [];
            gameOver = false;
        } else {
            console.exit();
        }
    }

    const lastTarget = target;
}