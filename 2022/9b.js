/**
 * This solution solves also the first part if knots array is altered to 2 knots.
 */

const { readInFile } = require('../read_input');

const input = parseInput(readInFile());
//console.log(input);
const print = (string) => console.log(string);
const abs = (a) => Math.abs(a);

let knots = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
const visited = new Set();
visited.add(`${knots[0][0]}:${knots[0][1]}`);
for (const line of input){
    [direction, steps] = line.split(' ');
    steps = +steps
    //print(line + "Direction: " + direction + " steps: " + steps);
    for (let i = 0; i < steps; i++){
        if (direction == 'U')
            knots[0] = [knots[0][0]+1, knots[0][1]];
        if (direction == 'D')
            knots[0] = [knots[0][0]-1, knots[0][1]];
        if (direction == 'L')
            knots[0] = [knots[0][0], knots[0][1]-1];
        if (direction == 'R')
            knots[0] = [knots[0][0], knots[0][1]+1];
    //tail
        for(let j = 1; j < knots.length; j++){
            if (abs(knots[j-1][0]-knots[j][0]) > 1 || abs(knots[j-1][1]-knots[j][1]) > 1){ //need to move
                if (knots[j-1][0] != knots[j][0]) //Move in row (Y)
                    knots[j] = [knots[j][0]+(knots[j-1][0]-knots[j][0])/abs(knots[j-1][0]-knots[j][0]), knots[j][1]];
                if (knots[j-1][1] != knots[j][1]) //Move in col (X)
                    knots[j] = [knots[j][0], knots[j][1]+(knots[j-1][1]-knots[j][1])/abs(knots[j-1][1]-knots[j][1])];
                    //tail = [tail[0], tail[1]+(head[1]-tail[1])/abs(head[1]-tail[1])];
                
                //print(tail);
                if (j == knots.length-1)
                    visited.add(`${knots[j][0]}:${knots[j][1]}`);
            }
        }
        
        //print(head);
        //print(tail);
    }
}

print(visited.size);


function parseInput(input_string) {
    return input_string.split('\n').map(line => {
        //return line.trim();
        return line.trim();
    });
}