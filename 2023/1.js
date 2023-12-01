const { log } = require('console');
const {readInFile} = require('../read_input');

const input = parseInput(readInFile());
//console.log(input);

var acc = 0;
for (i = 0; i< input.length; i++){
    var first = +input[i][0];
    var second = +input[i][input[i].length-1]
    acc += first*10 + second;
}
console.log(acc);

function parseInput(input_string){
    return input_string.split('\n').map(x => {
        //return line.trim();
        return x.trim().split('').filter( y =>  !isNaN(y));
    });
}