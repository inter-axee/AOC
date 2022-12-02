const {readInFile} = require('../read_input');

const input = parseInput(readInFile());

console.log(input);

function calculate(){
    let result = 0;
    input.forEach(element => {
        if(element[0] == 'A'){
            if(element[1] == 'X') //draw
                result += 1+3;
            if(element[1] == 'Y') // win
                result += 6+2;
            if(element[1] == 'Z') // loose
                result += 3;   
        }else if(element[0] == 'B'){
            if(element[1] == 'X') //loose
                result += 1;
            if(element[1] == 'Y') // draw
                result += 2+3;
            if(element[1] == 'Z') // win
                result += 3+6;   
        }else if(element[0] == 'C'){
            if(element[1] == 'X') //win
                result += 1+6;
            if(element[1] == 'Y') // loose
                result += 2;
            if(element[1] == 'Z') // draw
                result += 3+3;
            
        }
    });
    return result
}

function calculate2(){
    let result = 0;
    input.forEach(element => {
        if(element[0] == 'A'){ // ROCK
            if(element[1] == 'X') //LOOSE = Sissor
                result += 3;
            if(element[1] == 'Y') // DRAW = ROCK
                result += 1+3;
            if(element[1] == 'Z') // WIN = paper
                result += 2+6;   
        }else if(element[0] == 'B'){ //PAPER
            if(element[1] == 'X') //LOOSE = rock
                result += 1; //rock
            if(element[1] == 'Y') // DRAW = PAPER
                result += 2+3; //paper
            if(element[1] == 'Z') // WIN = SISSOR
                result += 3+6;   
        }else if(element[0] == 'C'){ //sissor
            if(element[1] == 'X') //LOOSE = paper
                result += 2; //paper
            if(element[1] == 'Y') // DRAW = sissor
                result += 3+3;
            if(element[1] == 'Z') // WIN = ROCK
                result += 1+6;
        }
    });
    return result
}

//Problem A
console.log(calculate());
//Problem B
console.log(calculate2());

function parseInput(input_string){
    return input_string.split('\n').map(line => {
        //return line.trim();
        return line.trim().split(' ');
    });
}