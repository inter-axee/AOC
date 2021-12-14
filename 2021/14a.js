const {readInFile} = require('../read_input');

/**
 * Solution that works for part 1 not for part 2
 * Re wrote the problem in 14b
 */

const input = parseInput(readInFile());
//console.log(input);
let original = input[0].trim();
let rules_string = input[1].split('\r\n')

let rules = new Map();
for (let i = 0; i<rules_string.length;i++){
    [a,b] = rules_string[i].split('->').map(x=>x.trim());
    rules.set(a,b);
}

function getMostAndLeastCommon(s){
    const charMap = {};
    let max = 0; min=1000000;
    let maxChar = ''; minChar = '';
    for (let char of s){
        if (charMap[char])
            charMap[char]++;
            else
        charMap[char] = 1;
    }

    for (let char in charMap){
        if (charMap[char] > max){
            max = charMap[char];
            maxChar = char;
        }
        if (charMap[char] < min){
            min = charMap[char];
            minChar = char;
        }
    }
    return {min,minChar,max,maxChar};
}

function run(iterations){
    for (let it = 0; it < iterations; it++){
        let nextString = '';
        for (let i = 0; i < original.length-1; i++){
            if (rules.has(original[i]+original[i+1])){
                nextString += original[i] + rules.get(original[i]+original[i+1]);         
            }else
                nextString += original[i];
        }
        nextString += original[original.length-1];
        original = nextString;
    }
    return original;
}

minmax = getMostAndLeastCommon(run(10));
console.log(minmax.max - minmax.min);

function parseInput(input_string){
    return input_string.split('\n\r\n').map(line => {
        return line.trim();
        //return line.trim().split('').map(x=>+x);
    });
}