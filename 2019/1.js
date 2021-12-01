const {readInFile} = require('../read_input');

const input = parseInput(readInFile());
//console.log(input);

//Recursive function to calculate extra fuel needed for the fuel
function calculateExtraFuel(f){
    let neededFuel = Math.floor(f/3) - 2;
    //console.log("fuel: " + f + " needed fuel: " + neededFuel);
    if (neededFuel <= 0)
        return 0;
    return neededFuel + calculateExtraFuel(neededFuel);
}

function calculate(problemA){
    let result = 0;
    for(let i = 0; i < input.length; i++){   
        let fuel = Math.floor(input[i]/3) - 2;
        result += fuel;
        if (!problemA)
            result += calculateExtraFuel(fuel);
    }
    return result;
}

//Problem A
console.log(calculate(true));
//Problem B
console.log(calculate(false));

function parseInput(input_string){
    return input_string.split('\n').map(line => {
        return parseFloat(line.trim());
    });
}