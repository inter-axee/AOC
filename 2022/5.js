const {readInFile} = require('../read_input');

const input = parseInput(readInFile());
//console.log(input);

/**
 *    [W]         [J]     [J]        
    [V]     [F] [F] [S] [S]        
    [S] [M] [R] [W] [M] [C]        
    [M] [G] [W] [S] [F] [G]     [C]
[W] [P] [S] [M] [H] [N] [F]     [L]
[R] [H] [T] [D] [L] [D] [D] [B] [W]
[T] [C] [L] [H] [Q] [J] [B] [T] [N]
[G] [G] [C] [J] [P] [P] [Z] [R] [H]
 1   2   3   4   5   6   7   8   9 
 */

let stacks = []

stacks[0] = ['G', 'T', 'R', 'W']; 
stacks[1] = ['G', 'C', 'H', 'P', 'M', 'S', 'V', 'W'];
stacks[2] = ['C', 'L', 'T', 'S', 'G', 'M'];
stacks[3] = ['J', 'H', 'D', 'M', 'W', 'R', 'F'];
stacks[4] = ['P', 'Q', 'L', 'H', 'S', 'W', 'F', 'J'];
stacks[5] = ['P', 'J', 'D', 'N', 'F', 'M', 'S'];
stacks[6] = ['Z', 'B', 'D', 'F', 'G', 'C', 'S', 'J'];
stacks[7] = ['R', 'T', 'B'];
stacks[8] = ['H', 'N', 'W', 'L', 'C'];

function calculate(problemA){
    let result = [];
    input.forEach(element => {
        let amount = element[1];
        let from = element[2];
        let to = element[3];
        for (let i = 0; i < amount; i++){
            let char = stacks[from-1].pop();
            if (char)
                stacks[to-1].push(char);
        } 
    });
    stacks.forEach(e => {
        result.push(e.pop());
    })
    return result.join('');
}

function calculate2(problemA){
    let result = [];let pp = 0;
    input.forEach(element => {
        pp++;
        let amount = element[1];
        let from = element[2];
        let to = element[3];
        let temp = new Array();
        for (let i = 0; i < amount; i++){
            let char = stacks[from-1].pop();
            if (char != undefined)
                temp.push(char);
        }
        
        let d = temp.length
        for (let i = 0; i < d; i++)
            stacks[to-1].push(temp.pop());
    });
    stacks.forEach(e => {
        result.push(e.pop());
    });
    return result.join('');
}


//Problem A
//console.log(calculate(true)); // A: JCMHLVGMG
//Problem B
console.log(calculate(false)); // LVMRWSSPZ

function parseInput(input_string){
    return input_string.split('\n').map(line => {
        //return line.trim();
        return line.trim().match(/move (\d*) from (\d) to (\d)/);
    });
}