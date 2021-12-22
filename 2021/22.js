const {readInFile} = require('../read_input');
const input = parseInput(readInFile());

/**
 * This solution is naive and works for part 1 since we are only considring ranges from -50 to 50 in x,y,z
 * Part 2 will need to be solved with representing cudoids and check for intersections.
 */

let on_positions = new Map();
for (let step = 0; step < input.length; step++){
    let instruction = input[step][0];
    let x_dim = input[step][1][0];
    let y_dim = input[step][1][1];
    let z_dim = input[step][1][2];
    //console.log("Instruction", instruction, "Coordinates", x_dim,y_dim,z_dim);
    
    for (let z = Math.max(z_dim[0], -50); z <= Math.min(z_dim[1], 50); z++)
        for (let y = Math.max(y_dim[0],-50); y <= Math.min(y_dim[1],50); y++)
            for (let x = Math.max(x_dim[0],-50); x <= Math.min(x_dim[1],50); x++)
                if (instruction == 'on'){
                    if (on_positions.has(`${x},${y},${z}`))
                        on_positions.set(`${x},${y},${z}`, on_positions.get(`${x},${y},${z}`) + 1);
                    else
                    on_positions.set(`${x},${y},${z}`, 1);
                }else {
                    if (on_positions.has(`${x},${y},${z}`))
                        on_positions.delete(`${x},${y},${z}`);
                }
}
console.log(on_positions.size);

function parseInput(input_string){
    return input_string.split('\n').map(line => {
        /* First split each new line then split each line on space
         for the second line: first match 2 number (assuming xyz is the order) then extract the numbers as numbers from the strings*/
        return [line.trim().split(' ')[0], line.trim().split(' ')[1].match(/(-?\d*)\.\.(-?\d*)/g).map(x => x.split('..').map(y => parseInt(y)))];
    });
}