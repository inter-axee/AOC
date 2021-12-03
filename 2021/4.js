const {readInFile} = require('../read_input');

const input = parseInput(readInFile());
//console.log(input);
function calculate(problemA){
   
    let result = 0;
    for(let i = 0; i < input.length; i++){
        result++;
    }
    return result;
    //console.log(result);
}

//Problem A
console.log(calculate(true));
//Problem B
//console.log(calculate(false));

function parseInput(input_string){
    return input_string.split('\n').map(line => {
        return line.trim();
    });
}