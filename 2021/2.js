const {readInFile} = require('../read_input');
const input = parseInput(readInFile());

function calculate(problemA){
    let x =0, y=0, aim = 0;
    for(let i = 0; i < input.length; i++){
        var direction = input[i].split(' ')[0];
        var weight = parseInt(input[i].split(' ')[1]);
        switch (direction){
            case 'forward' :
                    x = x + weight;
                    if (!problemA) y = y + aim*weight;
                    break;
            case 'up' :
                if (!problemA) aim = aim - weight;
                    y = y + weight;
                    break;
            case 'down' :
                if (!problemA) aim = aim + weight;
                    y = y - weight;
                    break;
        }
        //console.log("x: " + x + " y: "+ y + " aim: " + aim);  
    }
    return x*y;
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