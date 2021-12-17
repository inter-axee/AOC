const {readInFile} = require('../read_input');

const input = parseInput(readInFile());
console.log(input[0]);

let [x_min, x_max, y_min, y_max] = input[0].match(/(\d+)|(-\d+)/gi);

/**
 * Math solution for part 1. 
 * We want to hit y_min in the last step to maximize the steps of y.
 * This mens that last step is abs(y_min) when standing on y = 0.
 * Then it is just to calculate the sum of all steps of y_min-1 to 0 which
 * is a gauss formula [sum of all integers up to X] = x*(x+1) / 2
 */
console.log((Math.abs(y_min)-1)*Math.abs(y_min) / 2);

function parseInput(input_string){
    return input_string.split('\n').map(line => {
        return line.trim();
        //return line.trim().split('').map(x=>+x);
    });
}