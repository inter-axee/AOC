const {readInFile} = require('../read_input');
const {primeFactors,isPrime,generatePrime, printMatrix, createMatrixFrame} = require('../common');
var Graph = require("graph-data-structure");

const input = parseInput(readInFile());

/**
 * First attempt that works inefficiently on part A so decided to rebuild with dynamic programming, 
 * building up the risk cost in each position instead, see 15.js
 */
graph = new Graph();

function calculate(problemA){
    let m = input; 
    for (let y = 0; y < m.length; y++)
        for (let x = 0; x < m[y].length;x++){
            if (x != m[y].length-1)
                graph.addEdge(`${y},${x}`,`${y},${x+1}`, m[y][x+1]);
            if (y != m.length-1)
                graph.addEdge(`${y},${x}`,`${y+1},${x}`, m[y+1][x]);
            if (x != 0)
                graph.addEdge(`${y},${x}`,`${y},${x-1}`, m[y][x-1]);
            if (y != 0)
                graph.addEdge(`${y},${x}`,`${y-1},${x}`, m[y-1][x]);
        }
    let end = `${input.length-1},${input[input.length-1].length-1}`;
    return graph.shortestPath('0,0', end).weight
}

//Problem A
console.log(calculate(true)); //678
//Problem B
//console.log(calculate(false));

function parseInput(input_string){
    return input_string.split('\n').map(line => {
        //return line.trim();
        return line.trim().split('').map(x=>+x);
    });
}