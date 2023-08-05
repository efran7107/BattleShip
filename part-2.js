let input = require('readline-sync');

let arr = new Map();

for(let i = 65; i <= 74; i++){
    let tempArr = [];
    for(let j = 1; j <= 10; j++){
        tempArr.push(String.fromCharCode(i)+j);
        if(j === 10){
            arr.set(tempArr);
        }
    }
}

console.log(arr.get('A'));




