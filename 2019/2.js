const {readInFile} = require('../read_input');
const input = parseInput(readInFile());
//console.log(input);
function calculate(program, noun, verb){    
    program[1] = noun;
    program[2] = verb;
    for(let i = 0; i < input.length; i += 4){
        //99 = End program
        if (program[i] == 99)
            return program[0];
        else if (program[i] == 1)
            program[program[i+3]] = program[program[i+1]] + program[program[i+2]];
        else if (program[i] == 2)
            program[program[i+3]] = program[program[i+1]] * program[program[i+2]];
        //Anything else that 1,2 or 99 is an error
        else
            return -1;
    }
    //Program never ended, error
    return -1;
}
//copy array
var memory = input.slice();
//Problem A
console.log(calculate(memory, 12, 2));
//Problem B
for (a = 0; a < 99; a++){
    for (b = 0; b < 99; b++){
        memory = input.slice();
        //console.log("a: " + a + " b: " + b);
        if (calculate(memory, a, b) == 19690720){
            console.log(100*a + b);
            //console.log(memory);
        }
    }
}
function parseInput(input_string){
    return input_string.split(',').map(line => {
        return parseInt(line.trim());
    });
}