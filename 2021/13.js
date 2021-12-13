const {readInFile} = require('../read_input');
//const {primeFactors,isPrime,generatePrime, printMatrix, createMatrixFrame} = require('../common');
const colors = require('colors');
/**
 * Debug function
 * Print part of a matrix (MAX: m_y and m_x) and highlight 2 different numbers 
 */
 const printMatrix = (m, m_y, m_x, highlight1, highlight2) => {
    for (let i = 0; i <= m_y; i++){
        for (let j = 0; j <= m_x; j++){
            //console.log(i,j,m[i][j]);
            if (m[i][j]){
                if (m[i][j] == highlight1)
                    process.stdout.write(m[i][j].toString().blue);
                else if (m[i][j] == highlight2)
                process.stdout.write(m[i][j].toString().red);
                else
                    process.stdout.write(m[i][j].toString());
            }else
                process.stdout.write('.');
        }
        process.stdout.write('\n');
    }
}

const input = parseInput(readInFile());
//console.log(input);
const coordinates = input[0].split('\n').map(x=> x.split(',').map(y=> +y.trim()));
//console.log(coordinates);
const fold_instructions = input[1].split('\n').map(x=>x.split('fold along ')[1].trim()).map(y=>{ a = y.split('='); return [a[0],+a[1]];});
//console.log(fold_instructions);

//Find max values of matrix
let MAX_X = 0,MAX_Y = 0;
coordinates.forEach((value, index) => {
    if (value[0] > MAX_X) MAX_X = value[0];
    if (value[1] > MAX_Y) MAX_Y = value[1];
});
//console.log(MAX_Y, MAX_X);

//Create matrix with max values
let matrix = [];
for (let i = 0; i < MAX_Y+1; i++)
    matrix[i] = new Array(MAX_X+1).fill('.');

//Fill matrix
for (let i = 0; i < coordinates.length; i++){
    let x =coordinates[i][0];
    let y =coordinates[i][1];
    matrix[y][x] = '#';
}
//printMatrix(matrix, MAX_Y, MAX_X, '#');

for (let i = 0; i < fold_instructions.length; i++){
    let coor = fold_instructions[i][0];
    let pos = fold_instructions[i][1];
    //console.log("fold", coor, "pos", pos);
    let NEW_MAX_Y = MAX_Y;
    let NEW_MAX_X = MAX_X;
    if (coor == 'y'){
        //matrix[pos] = new Array(MAX_X).fill('-'.red);
        for (let y = pos+1; y <= MAX_Y; y++){
            for (let x = 0; x <= MAX_X; x++){
                if (matrix[y][x] == '#'){
                    let a = matrix[y][x];
                    matrix[pos - (y-pos)][x] = '#';
                    matrix[y][x] = '.';
                }
            }
        }
        NEW_MAX_Y = pos;
    }
    if (coor == 'x'){
        for (let y = 0; y <= MAX_Y; y++){
            for (let x = pos+1; x <= MAX_X; x++){
                if (matrix[y][x] == '#'){
                    let a = matrix[y][x];
                    matrix[y][pos - (x-pos)] = '#';
                    matrix[y][x] = '.';
                }
            }
        }
        //matrix.forEach(x => x[pos] = '|'.red);
        NEW_MAX_X = pos;
        //MAX_X = 2*pos;
    }
   
    MAX_X = NEW_MAX_X;
    MAX_Y = NEW_MAX_Y;
    //Remove folding row/column
    if (coor == 'x')
        MAX_X -= 1;
    else
        MAX_Y -= 1;

    let sum = calculate(matrix, MAX_Y, MAX_X);
    if (i == 0){
        console.log("Sum after 1st fold: ", sum);
       // break;
    }
}

printMatrix(matrix, MAX_Y, MAX_X, '#');

function calculate(m,m_y,m_x){
    let r = 0;
    for (let i = 0; i <= m_y; i++)
        for (let j = 0; j <= m_x; j++){
            if (m[i][j] == '#')
                r++;
        }
    return r;
}

function parseInput(input_string){
    return input_string.split('\n\n').map(line => {
        return line.trim();
        //return line.trim().split('').map(x=>+x);
    });
}

