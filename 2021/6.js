const {readInFile} = require('../read_input');

const input = parseInput(readInFile());
//console.log(input);
const DAYS = 256;

function calculate(problemA){
    
    let result = 0;
    for(let d = 0; d < DAYS; d++){
        let iterate = input.length;
        for (let i = 0; i < iterate; i++){
            if (input[i] == 0){
                input[i] = 6;
                input.push(8);
            }else
            input[i] -= 1;
        }
        //console.log(d, input.join());
    }
    return input.length;
    //console.log(result);
}

//Problem A
console.log(calculate(true));
//Problem B
//console.log(calculate(false));

function parseInput(input_string){
    return input_string.split(',').map(line => {
        return parseInt(line.trim());
    });
}