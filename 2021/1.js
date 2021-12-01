const {readInFile} = require('../read_input');

const input = parseInput(readInFile());
//console.log(input);
function calculate(problemA){
    let first = parseInt(input[0]);
    if (!problemA) 
        first = parseInt(input[0]) + parseInt(input[1]) + parseInt(input[2]);
    let result = 0;
    for(let i = 1; i < input.length-2; i++){
        let second = parseInt(input[i])
        if (!problemA) 
            second = parseInt(input[i]) + parseInt(input[i+1]) + parseInt(input[i+2]);
        if (second > first)
            result++;
        first = second;
        //console.log(input[i]);
    }
    return result;
    //console.log(result);
    }

//Problem A
console.log(calculate(true));
//Problem B
console.log(calculate(false));

function parseInput(input_string){
    return input_string.split('\n').map(line => {
        return line.trim();
    });
}