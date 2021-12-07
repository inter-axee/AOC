const {readInFile} = require('../read_input');

const input = parseInput(readInFile());
//console.log(input);

/**
 * NOT USED- worked for part 1
 * works on smaller number of days, but when days increase too much memory is allocated
 * Not every fish needs to be accounted for
 */
function calculate(problemA){
    const DAYS = 80;
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
    }
    return input.length;
}

/**
 * Instead of keeping track of every fish keep track of the amount each day and update
 * 
 */
function calculateDays(numberOfDays){
    let days = Array(9).fill(0);
    for (let i = 0; i < input.length; i++){
        days[input[i]] += 1;
    }
    while(numberOfDays-- != 0){
        let newFish = days.shift();
        days.push(newFish);
        days[6] += newFish;
        //console.log(numberOfDays, days, days.reduce((a,b) => a+b));
    }
    return days.reduce((a,b) => a+b);
}

//Problem A
console.log(calculateDays(80));
//Problem B
console.log(calculateDays(256));

function parseInput(input_string){
    return input_string.split(',').map(line => {
        return parseInt(line.trim());
    });
}