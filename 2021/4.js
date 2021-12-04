const {readInFile} = require('../read_input');
const input = parseInput(readInFile());
const drawNumbers = input[0].split(',').map(x=>parseInt(x.trim()));

let tiles = [];
for (let i = 1; i < input.length; i++)
    tiles[i-1] = input[i].split(/\s+/).map(x=> parseInt(x.trim()));

/**
 * Used an array to simulate the bingo board. if the number was drawn the number in board is put to negative.
 * Thought this was smart but special logic needed to handle 0
 * TODO: Rewrite and not manipulate original boards with negative values
 * */

let probelmA = true;
let zeroPicked = false;
let hasWon = [];
for (let j = 0; j < drawNumbers.length; j++){
    let picked = drawNumbers[j];
    if (picked == 0) zeroPicked = true;
    for(let b = 0; b < tiles.length; b++){
        for (let t = 0; t < tiles[b].length; t++){
            if(tiles[b][t] == picked)
                tiles[b][t] = -tiles[b][t];
        }
    }
    while((winner = checkWinner(tiles,zeroPicked, hasWon)) != -1){
        let tileSum = calculateSum(tiles[winner]);
        if(probelmA){
            probelmA = false;
            console.log("A:",winner, tileSum*picked);
        }
        hasWon.push(winner);
        if (hasWon.length == tiles.length)
            console.log("B:", winner, tileSum*picked);
    }
}

function calculateSum(array){
    let s = 0;
    for(let i = 0; i<array.length;i++){
        if(array[i] >= 0)
            s += Math.abs(array[i]);
    }
    return s;
}

function checkWinner(array, zp, hasW){
    for (let i = 0; i < array.length; i++){
        if(hasW.includes(i))
            continue;
        //Row
        for (let y = 0; y < array[i].length/5; y++){
            let sum = 0;
            let abssum = 0;
            let z = false;
            for (let x = 0; x < 5; x++){
                sum += array[i][y*5+x];
                abssum += Math.abs(array[i][y*5+x]);
                if (Math.sign(array[i][y*5+x]) == -0)
                    z = true;
            }
            if (sum == -abssum)
                if (!z)
                    return i;
                else if (zp) return i;
        }
        //Column
        for (let y = 0; y < array[i].length/5; y++){
            let sum = 0;
            let abssum = 0;
            let z = false;
            let allminus = true;
            for (let x = 0; x < 5; x++){
                sum += array[i][y+x*5];
                abssum += Math.abs(array[i][y+x*5]);
                if (Math.sign(array[i][y+x*5]) == -0)
                    z = true;
            }
            
            if (sum == -abssum)
                if (!z)
                    return i;
                else if (zp) return i;
        }
    }
    return -1;
}

function parseInput(input_string){
    return input_string.split('\n\r\n').map(line => {
        return line.trim();
    });
}