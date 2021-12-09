const {readInFile} = require('../read_input');

const input = parseInput(readInFile());
//console.log(input);

/**
 * TODO: Also checking diagonals which was wrong but generates correct answer anyway
 */
function isLowerThanSurounding(y,x, array){
    result = true;
    if (array[y][x] >= array[y-1][x-1] || array[y][x] >= array[y-1][x] || array[y][x] >= array[y-1][x+1])
        return false;
    if (array[y][x] >= array[y][x-1] || array[y][x] >= array[y][x+1])
        return false;
    if (array[y][x] >= array[y+1][x-1] || array[y][x] >= array[y+1][x] || array[y][x] >= array[y+1][x+1])
        return false;
    return true;
}

function findBasin(y,x, array, foundBasins){
    //console.log("found basin", y, x, array[y][x]);
    if (foundBasins.includes(`${y},${x}`))
        return 0;
    else
        foundBasins.push(`${y},${x}`);
    if (array[y][x] == 9)
        return 0;
    let sum = 1;
    if (array[y][x] < array[y-1][x] && array[y-1][x] != 9)
        sum += findBasin(y-1,x,array, foundBasins);
    if (array[y][x] < array[y][x-1] && array[y][x-1] != 9)
        sum += findBasin(y,x-1,array, foundBasins);
    if (array[y][x] < array[y][x+1] && array[y][x+1] != 9)
        sum += findBasin(y,x+1,array, foundBasins);
    if (array[y][x] < array[y+1][x] && array[y+1][x] != 9)
        sum += findBasin(y+1,x,array, foundBasins);
    return sum;
}

function calculate(problemA){
    new_input_array = input.slice();

    for (i = 0; i < new_input_array.length; i++){
        new_input_array[i] = '9' + new_input_array[i] + '9';
    }
    new_input_array.unshift( new Array(input[0].length+2).fill(9).join('') );
    new_input_array.push( new Array(input[0].length+2).fill(9).join('') );
    //console.log(new_input_array);
    let sum = 0;
    basins = [];
    for(let i = 1; i < new_input_array.length-1; i++){
        for (let j = 1; j < new_input_array[i].length-1; j++)
            if (isLowerThanSurounding(i,j,new_input_array)){
                //console.log(i,j, new_input_array[i][j]);
                sum += parseInt(new_input_array[i][j]) + 1;
                basins.push(findBasin(i,j,new_input_array,[]));
                //console.log("Basin: ",findBasin(i,j,new_input_array,[]))
            }
    }
    //console.log(basins.sort((a,b) => b-a));
    basins = basins.sort((a,b) => b-a);
    //console.log(basins);
    if (problemA)
        return sum;
    else
        return basins[0]*basins[1]*basins[2];
}

//Problem A (not 578, 548)
console.log(calculate(true));
//Problem B
console.log(calculate(false));

function parseInput(input_string){
    return input_string.split('\n').map(line => {
        return line.trim();
    });
}