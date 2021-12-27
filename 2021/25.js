const {readInFile} = require('../read_input');
const {primeFactors,isPrime,generatePrime, printMatrix, createMatrixFrame} = require('../common');

const input = parseInput(readInFile());
const maxY = input.length;
const maxX = input[0].length;
//console.log(input);

function cloneMatrix(currentArray){
    var newArray = [];
    for (var i = 0; i < currentArray.length; i++)
        newArray[i] = currentArray[i].slice();
    return newArray;
}

function move(array){
    let iteration = 0;
    let currentMap = array;
    let moved = true;
    while (moved){
        let nextMap = cloneMatrix(currentMap);
        moved = false;
        //Move east facing
        for (let y = 0; y < maxY; y++){
            for (let x = 0; x < maxX; x++){
                if (currentMap[y][x] == '>' && currentMap[y][(x+1)%maxX] == '.'){
                    nextMap[y][x] = '.';
                    nextMap[y][(x+1)%maxX] = '>';  
                    moved = true; 
                }
            }
        }
        currentMap = cloneMatrix(nextMap);
        //console.log('-----------');
        //printMatrix(nextMap,'>');
        //Move down facing
        for (let y = 0; y < maxY; y++){
            for (let x = 0; x < maxX; x++){
                if (currentMap[y][x] == 'v' && currentMap[(y+1)%maxY][x] == '.'){
                    nextMap[y][x] = '.';
                    nextMap[(y+1)%maxY][x] = 'v';
                    moved = true;
                }
            }
        }
        currentMap = cloneMatrix(nextMap);
        iteration++;
    }
    return iteration;
}

console.log(move(input));

function parseInput(input_string){
    return input_string.split('\n').map(line => {
        //return line.trim();
        return line.trim().split('').map(x=>x.trim());
    });
}