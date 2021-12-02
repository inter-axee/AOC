const {readInFile} = require('../read_input');
const input = parseInput(readInFile());
console.log(input);
function calculate(problemA){
    let x =0, y=0, aim = 0;
    for(let i = 0; i < input.length; i++){
        
    //console.log("x: " + x + " y: "+ y + " aim: " + aim);  
    }
    return x*y;
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