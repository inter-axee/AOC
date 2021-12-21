const {readInFile} = require('../read_input');

const input = parseInput(readInFile());

let player1Pos = +input[0].match(/:\s(\d*)/)[1];
let player2Pos = +input[1].match(/:\s(\d*)/)[1];

console.log(player1Pos, player2Pos);

/**
 * Instead of checking same sum of the different combinations 3 3-sided dices has
 * count the number of different combinations
 */
const diracDieCombinations = {};
for (let d1 = 1; d1 <=3; d1++)
    for (let d2 = 1; d2 <=3; d2++)
        for (let d3 = 1; d3 <=3; d3++){
            let total = d1 + d2 + d3;
            //console.log(total, diracDieCombinations[total]);
            if (!diracDieCombinations.hasOwnProperty(total)) diracDieCombinations[total] = 1;
            else diracDieCombinations[total] = diracDieCombinations[total] + 1;
            //console.log("after", total, diracDieCombinations[total]);
        }
//console.log((diracDieCombinations));

function roll(p1Pos, p1Score, p2Pos, p2Score, turn = 1, winner){  
    if (p1Score >= 21)
        return (winner == 1) ? 1 : 0;
    if (p2Score >= 21)
        return (winner == 1) ? 0 : 1;

    let sum = 0;
    for (const [diceSum, diceCount] of Object.entries(diracDieCombinations)){
        let pos, score;
        if (turn == 1){
            pos = (p1Pos + parseInt(diceSum)) % 10;
            if (pos == 0) pos = 10;
            score = p1Score + pos; 
            sum += diceCount * roll(pos, score, p2Pos, p2Score, 2, winner); 
        }else{
            pos = (p2Pos + parseInt(diceSum)) % 10;
            if (pos == 0) pos = 10;
            score = p2Score + pos;
            sum += diceCount * roll(p1Pos, p1Score, pos, score, 1, winner);
        }
    }
    return sum;
}
let p1Wins = roll(player1Pos, 0, player2Pos, 0, 1, 1);
let p2Wins = roll(player1Pos, 0, player2Pos, 0, 1, 2);
console.log(p1Wins, p2Wins, "Player ", p1Wins>p2Wins ? 1 : 2, "wins");

function parseInput(input_string){
    return input_string.split('\n').map(line => {
        return line.trim();
    });
}