const { readInFile } = require('../read_input');

const input = parseInput(readInFile());
//console.log(input);
const print = (string) => console.log(string);
const abs = (a) => Math.abs(a);

let tail = [0,0];
let head = [0,0];
const visited = new Set();
visited.add(`${tail[0]}:${tail[1]}`);
for (const line of input){
    [direction, steps] = line.split(' ');
    steps = +steps
    //print(line + "Direction: " + direction + " steps: " + steps);
    for (let i = 0; i < steps; i++){
        if (direction == 'U')
            head = [head[0]+1, head[1]];
        if (direction == 'D')
            head = [head[0]-1, head[1]];
        if (direction == 'L')
            head = [head[0], head[1]-1];
        if (direction == 'R')
            head = [head[0], head[1]+1];
    //tail
        if (abs(tail[0]-head[0]) > 1 || abs(tail[1]-head[1]) > 1){ //need to move, if head moves perpendicular to the tail, tail will not move since distance is still 1
            if (tail[0] != head[0]) //Move in row (Y)
                tail = [tail[0]+(head[0]-tail[0])/abs(head[0]-tail[0]), tail[1]];
            if (tail[1] != head[1]) //Move in col (X)
                tail = [tail[0], tail[1]+(head[1]-tail[1])/abs(head[1]-tail[1])];   
            //print(tail);
            visited.add(`${tail[0]}:${tail[1]}`);
        }
        //print(head);
        //print(tail);
    }
}

print(visited.size); //not 8841 //correct: 6037

function parseInput(input_string) {
    return input_string.split('\n').map(line => {
        //return line.trim();
        return line.trim();
    });
}