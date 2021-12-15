const {readInFile} = require('../read_input');
const {primeFactors,isPrime,generatePrime, printMatrix, createMatrixFrame} = require('../common');

const input = parseInput(readInFile());

//printMatrix(input);
const bigInput = new Array(input.length*5).fill(0); //.fill(new Array(input[0].length*5).fill(0));
for (let i = 0; i < input.length*5; i++){
  bigInput[i] = new Array(input[0].length*5);
}

const bigMatrixIncreaseMap = [[0, 1, 2, 3, 4],
                              [1, 2, 3, 4, 5],
                              [2, 3, 4, 5, 6],
                              [3, 4, 5, 6, 7],
                              [4, 5, 6, 7, 8]
                            ];

for (let a = 0; a < 5; a++)
  for (let b = 0; b < 5; b++)
    for (let y = 0; y < input.length; y++)
      for (let x = 0; x < input[y].length; x++){
        let bigY = y + a*input.length;
        let bigX = x + b*input[y].length;
        let value = input[y][x] + bigMatrixIncreaseMap[a][b];     
        value = ((value > 9) ? (value % 9) : value);
        //console.log(bigY, bigX, value);
        bigInput[bigY][bigX] = value;
      }                          

//printMatrix(bigInput);

function calculateRoute(matrix){

  const cost = new Array(matrix.length).fill(0)
  for (let i = 0; i < matrix.length; i++){
    cost[i] = new Array(matrix[0].length).fill(0);
  }

  let i = 0;
  let lastPosition = 0;
  while (i != 10000){
      lastPosition = cost[cost.length-1][cost[0].length-1];
      for (let y = 0; y < matrix.length; y++){
          //cost[y] = [];
          for (let x = 0; x < matrix[y].length; x++){
              if (y === 0 && x === 0) {cost[y][x] = 0; continue;}
              cost[y][x] = matrix[y][x] + Math.min(y > 0 ? cost[y-1][x] : 1000000000000 , 
                                                  y < cost.length-1 ? cost[y+1][x] : 1000000000000 ,
                                                  x > 0 ? cost[y][x-1] : 1000000000000 ,
                                                  x < cost[y].length-1 ? cost[y][x+1] : 1000000000000);
          }
      }
      i++
      //console.log("-------");
      //printMatrix(cost)
      if (lastPosition != 0 && lastPosition === cost[cost.length-1][cost[0].length-1]){
          console.log("found last at iteration ", i, lastPosition);
          break;
      }
      
  }
  //printMatrix(cost);
  return cost[cost.length-1][cost[0].length-1];
}
//console.log("-----");
console.log(calculateRoute(input));
console.log(calculateRoute(bigInput)); //315

function parseInput(input_string){
    return input_string.split('\n').map(line => {
        //return line.trim();
        return line.trim().split('').map(x=>+x);
    });
}