const {readInFile} = require('../read_input');

const input = parseInput(readInFile());

let player1Pos = +input[0].match(/:\s(\d*)/)[1];
let player2Pos = +input[1].match(/:\s(\d*)/)[1];

console.log(player1Pos, player2Pos);

function getDiceMoves(current, times, max){
    let next = 0;
    for (let i = current; i < current+times; i++){
        if (i % max == 0)
            next += max;
        else
            next += i%max;
    }
    return next;
}

//console.log(getDiceMoves(99,3,100));
//console.log(100%100);

function calculate(problemA){
    let rollNbr = 0;
    let winner = false;
    let dice = 1;
    let player1Score = 0, player2Score = 0;
    while (!winner) {
        let t = getDiceMoves(dice,3,100);
        dice = (dice + 3) % 100 == 0 ? 100 : ((dice + 3) %100);  
        rollNbr += 3;
       // console.log("Before Player 1", dice, t, player1Pos, player1Score);
        player1Pos = (player1Pos + t)%10;
        if (player1Pos == 0)
            player1Pos = 10;
        player1Score += player1Pos;
        if (player1Score >= 1000){
            looser = player2Score;
            break;
        }
       // console.log("After Player 1", dice, t, player1Pos, player1Score);

        t = getDiceMoves(dice,3,100);
        dice = (dice + 3) % 100 == 0 ? 100 : ((dice + 3) %100);
        rollNbr += 3;
        player2Pos = (player2Pos + t)%10;
        if (player2Pos == 0)
            player2Pos = 10;
        player2Score += player2Pos;
        if (player2Score >= 1000){
            looser = player1Score;
            break;
        }
    }
    return looser * rollNbr;
    //console.log(result);
}

//Problem A
console.log(calculate(true)); //989352
//Problem B
//console.log(calculate(false));

function parseInput(input_string){
    return input_string.split('\n').map(line => {
        return line.trim();
        //return line.trim().split('').map(x=>+x);
    });
}