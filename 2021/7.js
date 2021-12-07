const {readInFile} = require('../read_input');

const input = parseInput(readInFile());
function calculate(problemA){
    let sum = 10000000000000;
    for(let hp = 0; hp < input.length; hp++){
        let tempsum = 0;
        for(let j = 0; j < input.length;j++){
            tempsum += Math.abs(input[j] - hp);
            if (!problemA)
                tempsum += ((Math.abs(input[j]-hp)*(Math.abs(input[j] -hp)-1))/2)
        }
        if (tempsum < sum){           
            sum = tempsum
        }
    }
    return sum;
}

//Problem A
console.log(calculate(true));
//Problem B
console.log(calculate(false));

function parseInput(input_string){
    return input_string.split(',').map(line => {
        return line.trim();
    });
}