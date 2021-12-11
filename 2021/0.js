const {readInFile} = require('../read_input');
const {primeFactors,isPrime,generatePrime, printMatrix, createMatrixFrame} = require('../common');

const input = parseInput(readInFile());
//console.log(input);
function calculate(problemA){
    let result = 0;
    printMatrix(input,8,4);
    let m = createMatrixFrame(input,'#');
    printMatrix(m,'#');
    printMatrix(input);
    /*for(let i = 1; i < input.length; i++){
    }*/
    return 0;
    //console.log(result);
}

//Problem A
console.log(calculate(true));
//Problem B
//console.log(calculate(false));

function parseInput(input_string){
    return input_string.split('\n').map(line => {
        //return line.trim();
        return line.trim().split('').map(x=>+x);
    });
}