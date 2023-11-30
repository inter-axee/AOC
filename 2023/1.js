const {readInFile} = require('../read_input');

const input = parseInput(readInFile());

const o = input.reduce((acc, cur, index, arr) => (cur > arr[index - 1] ? acc + 1 : acc), 0);
//Problem A
console.log(o);
//Problem B

function parseInput(input_string){
    return input_string.split('\n').map(x => {
        //return line.trim();
        return +x;
    });
}