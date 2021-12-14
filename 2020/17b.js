const fs = require('fs');

const readInFile = () => {
    const input_filename = '17.txt';
    let input = fs.readFileSync(input_filename, 'utf-8');
    return input.trim();
}

const input = readInFile().split('\n');
//console.log(input);

let x_min = -1; let x_max = input[0].length+1;
let y_min = -1; let y_max = input[0].length+1;
let z_min = -1; let z_max = 1;
let w_min = -1; let w_max = 1;

let active = new Set();
for (let i = 0; i<input.length;i++)
    for (j = 0; j<input[i].length;j++){
        if (input[i][j] === '#')
            active.add(`${j},${i},0,0`);
    }
//console.log(active);

for (let iterations = 0; iterations < 6; iterations++) {
    const temporaryActive = new Set();
    for (let x = x_min; x <= x_max; x++)
        for (let y = y_min; y <= y_max; y++)
            for (let z = z_min; z <= z_max; z++)
                for (let w = w_min; w <= w_max; w++){
                    let count = countActiveNeghbours(active,x,y,z,w);
                    //console.log(count);
                    if ((active.has(`${x},${y},${z},${w}`) && (count === 2 || count === 3)) ||
                        (!active.has(`${x},${y},${z},${w}`) && (count === 3))){
                        //console.log("New active at",x,y,z);
                        temporaryActive.add(`${x},${y},${z},${w}`);                   
                        if ((x-1) < x_min) x_min = x-1; if ((x+1) > x_max) x_max = x+1;
                        if ((y-1) < y_min) y_min = y-1; if ((y+1) > y_max) y_max = y+1;
                        if ((z-1) < z_min) z_min = z-1; if ((z+1) > z_max) z_max = z+1;               
                        if ((w-1) < w_min) w_min = w-1; if ((w+1) > w_max) w_max = w+1;  
                    }
                }
    active = temporaryActive;
}

console.log(active.size);

function countActiveNeghbours(cube, x,y,z,w){
    let c = 0;
    for (let dx = -1; dx <= 1; dx++)
        for (let dy = -1; dy <= 1; dy++) 
            for (let dz = -1; dz <= 1; dz++) 
                for (let dw = -1; dw <= 1; dw++){
                    if (dx === 0 && dy === 0 && dz === 0 && dw ===0)
                        continue;
                    if (cube.has(`${x+dx},${y+dy},${z+dz},${w+dw}`))
                        c++;
                }
    return c;
}