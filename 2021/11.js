const {readInFile} = require('../read_input');
const input = parseInput(readInFile());

/**
 * Debug function
 */
function printMatrix(array){
    out = [];
    for(i = 0; i < array.length; i ++)
        out.push(array[i].join());
    console.log(out);
}

/**
 * Check is the matrix is 0 in all positions 
 */
function allZero(array){
    let zero = true;
    for(let i = 1; i < array.length-1; i++){
        for(let j = 1; j < array[i].length-1;j++){
            if (array[i][j] != 0)
                zero = false;
        }
    }
    return zero;
}

function calculate(problemA, MAX_ITERATIONS, array){
    //Create a frame around the input matrix with 9's
    for (i = 0; i < array.length; i++){
        array[i].push(9);
        array[i].unshift(9);
    }
    array.unshift( new Array(array[0].length).fill(9) );
    array.push( new Array(array[0].length).fill(9) );
    //console.log("Before any step:");
    //printMatrix(input)
    flashes = 0;
    for (iteration = 0; iteration < MAX_ITERATIONS; iteration++){      
        //increase all with 1
        for(let i = 0; i < array.length; i++)
            for(let j = 0; j < array[i].length;j++)
                array[i][j] += 1;

        moreFlashing = true;
        hasFlashed = [];
        while(moreFlashing){
            moreFlashing = false;
            for(let i = 1; i < array.length-1; i++){
                for(let j = 1; j < array[i].length-1;j++){
                    //check if any are greater than 9 and has not already flashed
                    if (array[i][j] > 9 && !hasFlashed.includes(`${i},${j}`)){
                        hasFlashed.push(`${i},${j}`);
                        array[i][j] = 0;
                        flashes += 1;
                        //Increase surrounding if not yet flashed
                        if (!hasFlashed.includes(`${i-1},${j-1}`)) array[i-1][j-1]++;
                        if (!hasFlashed.includes(`${i-1},${j}`)) array[i-1][j]++; 
                        if (!hasFlashed.includes(`${i-1},${j+1}`)) array[i-1][j+1]++; 
                        if (!hasFlashed.includes(`${i},${j-1}`)) array[i][j-1]++;     
                        if (!hasFlashed.includes(`${i},${j+1}`)) array[i][j+1]++;
                        if (!hasFlashed.includes(`${i+1},${j-1}`)) array[i+1][j-1]++;
                        if (!hasFlashed.includes(`${i+1},${j}`)) array[i+1][j]++; 
                        if (!hasFlashed.includes(`${i+1},${j+1}`)) array[i+1][j+1]++;
                        //Need to check one more time
                        moreFlashing = true;
                    }
                }
            }       
        }
        //console.log("After step", iteration+1);
        //printMatrix(input);
        if (allZero(array) && !problemA){
            //console.log("syncronized at", iteration+1);
            return iteration+1;
        }
    }
    return flashes;
}

//Copy input matrix not the reference
var newArray = input.map(function(arr) {
    return arr.slice();
});

//Problem A
console.log(calculate(true,100, newArray));
//Problem B
newArray = input.map(function(arr) {
    return arr.slice();
});
console.log(calculate(false,500, newArray));

function parseInput(input_string){
    return input_string.split('\n').map(line => {
        return line.trim().split('').map(x=>+x);
    });
}