const {readInFile} = require('../read_input');

const input = parseInput(readInFile());
//console.log(input);

function calculate(problemA){
    input.forEach(e => {
        console.log(e);
    });
    return 0;
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