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
console.log("Part A", (Math.abs(y_min)-1)*Math.abs(y_min) / 2);

//Part 2, Assuming target area is below y = 0
let it_x_min = Math.floor(Math.abs(-0.5 - Math.sqrt(0.25 + 2*x_min)));
let it_x_max = parseInt(x_max);
let it_y_min = parseInt(y_min);
let it_y_max = Math.abs(y_min);

//console.log("verify x min", it_x_min, "gives ", (it_x_min * (it_x_min+1)) / 2, "1 less gives", ((it_x_min-1) * (it_x_min)) / 2, "and does not reach", x_min);
//console.log(it_x_min, it_x_max, it_y_min, it_y_max);

function isInTarget(position){
    if (position[0] < x_min || position[0] > x_max)
        return false;
    if (position[1] < y_min || position[1] > y_max)
        return false;
    return true;
}

function fire(vx, vy){
    let position = [0,0];
    while (true){
        //console.log(position);
        if (isInTarget(position)){
            //console.log("Hit");
            return true;
        }else if (position[0] > x_max || position[1] < y_min){
            //console.log("Miss", x_max, y_max);
            return false;
        }
        position[0] += vx;
        vx -= 1;
        vx = vx < 0 ? 0 : vx;
        position[1] += vy;
        vy -= 1;
    }
}

//console.log(fire(6,0));

let hits = 0;
//let h = [];
for (let y = it_y_min-1; y <= it_y_max+1; y++)
    for (let x = it_x_min-1; x <= it_x_max+1; x++) {
        if (fire(x,y)){
            //h.push([x,y]); 
            //console.log([x,y]);
            hits++;
        }
    }

//console.log(h);
console.log("Part B, hits", hits);


function parseInput(input_string){
    return input_string.split('\n').map(line => {
        return line.trim();
        //return line.trim().split('').map(x=>+x);
    });
}