var readlineSync = require('readline-sync');


readlineSync.keyInPause(`Press Any Key to continue...`);
console.clear();

const gameBoard = new Set(['A1','A2', 'A3', 'B1','B2', 'B3', 'C1','C2', 'C3']);
const hasPlayed = new Set();

const num1 = Math.floor(Math.random()* 9);
const num2 = Math.floor(Math.random()* 9);

const boat1 = gameBoard[num1];
const boat2 = gameBoard[num2];

let boats = 2;

let gameOver = false;



const gameLog = () => {console.log(
`     1    2    3
 A | ${gameBoard[0]} | ${gameBoard[1]} | ${gameBoard[2]} |
 B | ${gameBoard[3]} | ${gameBoard[4]} | ${gameBoard[5]} |
 C | ${gameBoard[6]} | ${gameBoard[7]} | ${gameBoard[8]} |`
);} 

const location = () => {
    let valid = false;
    while(!valid) {
        let loc = readlineSync.question('Enter a location to strike ie \'A2\'');
        loc = loc.charAt(0).toUpperCase() + loc.slice(1);
        if(loc.length > 2 || (gameBoard.has(loc) === false && hasPlayed.has(loc) === false)){
            console.log('Please enter a valid location');
            valid = false;
        }
        return loc;
    }
}

const launch = (loc) => {
    if(loc === boat1 || loc === boat2){
        boat--;
        console.log(`Hit you have sunk a battleship. ${boats} ship remaining`);
    }
}



while (!gameOver){
    gameLog();
    console.log(location());
    console.clear();
}



