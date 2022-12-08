/**
 * Dirty solution...
 * TODO
 * refactor this to handle all the directions more generic.
 */

const { readInFile } = require('../read_input');

const input = parseInput(readInFile());
//console.log(input);

const seen = Array(input.length).fill().map(() => Array(input[0].length).fill(0));

//X+
for (let y = 0; y < input.length; y++){
    let maxValue = input[y][0];
    seen[y][0] += 1
    for (let x = 1; x < input[y].length; x++){
        if (input[y][x] > maxValue){
            seen[y][x] += 1;
            maxValue = input[y][x];
        }
    }
}

//X-
for (let y = 0; y < input.length; y++){
    let maxValue = input[y][input[y].length-1];
    seen[y][input[y].length-1] += 1
    for (let x = input[y].length-2; x >= 0; x--){
        if (input[y][x] > maxValue){
            seen[y][x] += 1;
            maxValue = input[y][x];
        }
    }
}

//Y+
for (let x = 0; x < input[0].length; x++){
    let maxValue = input[input.length-1][x];
    seen[input.length-1][x] += 1;
    for (let y = input.length-2; y >= 0; y--){
        if (input[y][x] > maxValue){
            seen[y][x] += 1;
            maxValue = input[y][x];
        }
    }
}

//y-
for (let x = 0; x < input[0].length; x++){
    let maxValue = input[0][x];
    seen[0][x] += 1;
    for (let y = 1; y < input.length; y++){
        if (input[y][x] > maxValue){
            seen[y][x] += 1;
            maxValue = input[y][x];
        }
    }
}

let counter = 0;
for (let y = 0; y < seen.length; y++)
    for (let x = 0; x < seen[y].length; x++)
        if (seen[y][x] === 0)
            counter++;

//Problem A
console.log((input.length * input[0].length) - counter);

//Problem B
const scenicScore = Array(input.length).fill().map(() => Array(input[0].length).fill(0));
for (let y = 0; y < input.length; y++){
    for (let x = 0; x < input[y].length; x++) {
        //check right
        let dx = x;
        let dy = y;
        let nextvalue;
        let treesRight = 0
        while (dx+1 < input[y].length){
            nextvalue = input[dy][dx+1];
            //console.log("calue: " + input[dy][dx] + " next: " + nextvalue);
            if (nextvalue >= input[y][x]){
                treesRight++;
                break;
            }
            treesRight += 1;
            dx++;
        }
        //check down
        dx = x;
        dy = y;
        let treesDown = 0
        while (dy+1 < input.length){
            nextvalue = input[dy+1][dx];
            if (nextvalue >= input[y][x]){
                treesDown++;
                break;
            }
            treesDown += 1;
            dy++;
        }
        //check left
        dx = x;
        dy = y;
        let treesLeft = 0
        while (dx-1 >= 0){
            nextvalue = input[dy][dx-1];
            //console.log("calue: " + input[dy][dx] + " next: " + nextvalue);
            if (nextvalue >= input[y][x]){
                treesLeft += 1;
                break;
            }
            treesLeft += 1; 
            dx--;
        }
        //check up
        dx = x;
        dy = y;
        let treesUp = 0
        while (dy-1 >= 0){
            nextvalue = input[dy-1][dx];
            if (nextvalue >= input[y][x]){
                treesUp += 1;
                break;
            }
            treesUp += 1;
            dy--;
        }
        scenicScore[y][x] = treesUp*treesDown*treesLeft*treesRight;//' '+treesUp+' '+treesDown+' '+treesLeft+' '+treesRight;
    }
}

//console.log(scenicScore);

let max = 0;
for (let y = 0; y < scenicScore.length; y++)
    for (let x = 0; x < scenicScore[y].length; x++)
        if (scenicScore[y][x] > max)
            max = scenicScore[y][x];

console.log(max); //108 not correct //474606

function parseInput(input_string) {
    return input_string.split('\n').map(line => {
        //return line.trim();
        return line.trim().split('').map(x=>+x);
    });
}